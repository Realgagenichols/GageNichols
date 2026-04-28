# Lessons Learned

## L1: PII regex on minified JS produces false positives

**Source:** Theme A build verification (Section 4-5)

**Pattern:** Generic phone/digit regex (e.g., `\d{3}[-.\s]?\d{3}[-.\s]?\d{4}`) matches incidental digit sequences in minified bundle output (React's scheduler, source maps, hash IDs). This produces noisy results that obscure real PII leaks.

**Rule:**
- Run "structural" PII regex against **source files** (`src/`, `shared/`), where humans write content
- Run **targeted** searches against **dist/** for specific known-private values: actual email handles, specific area codes, the substring `resume`, `@icloud`, `@gmail`, etc.
- The `scripts/scan-pii.mjs` (task 10.1) should split these two scans

**Test:** Build a theme, run both scans against `dist/`. The targeted scan should be reliable; the structural scan against minified JS will always have noise — only run it on source.

## L5: Privacy scanners must skip test files

**Source:** Tasks 10.x and 11.x. After wiring `scripts/scan-pii.mjs` into the build pipeline (`npm run build` → `pii:scan` → `vite build`), the build began failing because the privacy unit test plants fake PII (`someone@gmail.com`, `(555) 123-4567`) to verify `assertNoPII` actually throws.

**Pattern:** Any tool that scans source for sensitive patterns (PII, secrets, license tokens) will see test fixtures as production leaks. Without an explicit skip rule, security tooling becomes a self-defeating gate that rejects its own verification suite.

**Rule:**
- Scanners MUST skip `__tests__` directories, `*.test.js`, `*.test.jsx` (and equivalents in other ecosystems).
- Tests that plant fake-PII fixtures should add a comment explaining the strings are deliberate fixtures, so a future reader doesn't move them to "real" code.

**Test:** Run the scanner locally with the tests in place. It should report clean. Then plant a real-looking email outside `__tests__/` and confirm the scanner catches it.

## L4: Don't fabricate "decorative" facts on a portfolio site

**Source:** Theme A About section had an "EST. 2018" badge invented by the redesign agent as Googie ornamentation. The user noticed it was unfounded — no career start year of 2018 anywhere in `me.txt` or the resume.

**Pattern:** Implementation agents asked to add visual flourishes (badges, taglines, version numbers, dates, "EST. YYYY" stamps, mock telemetry like "FREQ: 91.7 MHz") will sometimes fabricate plausible-looking content. On a portfolio site shown to recruiters, these read as factual claims even when intended as decoration. This includes:
- Years (EST. 2018, since 1999, etc.)
- Counts (X+ projects shipped, Y customers, Z deployments) not in the source data
- Specific dates, patent numbers, certification numbers
- Mock IDs that resemble real identifiers (employee numbers, badge numbers)

**Rule:**
- All numbers, dates, and factual claims rendered on the site MUST trace to a value in `shared/data.js` or to `me/me.txt` / the resume
- Decorative ornaments may use *non-factual* placeholders: section coordinates ("Sector 03"), random-but-clearly-fake frequencies, atomic motifs, starbursts, generic Googie copy ("Tomorrowland command booth")
- Spec/quality reviewers MUST scan implementation diffs for unsourced numerals and date stamps and flag them
- Briefing prompts to creative agents MUST include this rule explicitly

**Test:** After any visual implementation pass, grep the output for `\b(EST\.|since|copyright|estab|©|\d{4}\b)` and verify each match is sourced from data.js or is purely decorative (e.g., dynamic year in footer).

## L3: SVG presentation attributes don't theme — use CSS variables via inline `style`

**Source:** Theme A Skills section (gauge dials stuck in dark-mode colors when theme toggled to light)

**Pattern:** When an SVG sets fill/stroke/stop-color directly as XML attributes with hex values (e.g., `<stop stopColor="#fef8e7" />` or `<line stroke="#22d3ee" />`), those values are baked in and don't respond to theme attribute changes on the document root. The result: components that look correct in the default theme but render with wrong colors in the alternate theme.

**Rule:**
- Any SVG color that should respond to `[data-theme]` MUST use a CSS variable
- Use inline `style={{ stroke: 'var(--x)' }}` or `style={{ fill: 'var(--x)' }}` rather than the attribute form `stroke="var(--x)"` — the attribute form is unreliable across browsers, the inline-style form is reliable
- For `<stop>` elements in gradients, use `style={{ stopColor: 'var(--x)' }}` (note camelCase in JSX)
- Define gauge/atom/decoration-specific CSS variables in BOTH the `:root` and `[data-theme='light']` blocks so every variable resolves in every mode

**Test:** Build a component, toggle the theme, and verify every visible color changes (or stays consistent if intentional). Specifically test SVG-heavy components like gauges, atom logos, and icons.

**Gradient gotcha:** `<linearGradient>` and `<radialGradient>` `<stop>` elements have known cross-browser bugs where they DON'T re-render when their CSS variables change (the gradient is treated as a cached paint reference). For SVG fills that need to theme, prefer **solid fills with CSS vars** over gradients. If you must have depth, layer two solid-filled paths with different opacities — that themes correctly.

## L2: Vite 5.4.x ships transitive vulnerabilities

**Source:** Theme A `npm install` (Section 4)

**Pattern:** `npm audit` reports moderate/critical vulnerabilities in Vite 5.4.x's transitive deps (esbuild, whatwg-encoding). Running `npm audit fix --force` would unpin Vite and could break the build.

**Rule:**
- Pinning Vite to an exact version (Pattern 5 — version pinning) is correct, even if `audit` complains
- These vulns are dev-time only (esbuild dev server) — not present in production `dist/` output
- Document expected audit findings; only act on vulns that affect the built output or production runtime
- Re-evaluate when Vite releases a patch

**Test:** Run `npm audit --omit=dev` — production deps should be clean. Dev-only vulns are acceptable as long as the team reviews them quarterly.

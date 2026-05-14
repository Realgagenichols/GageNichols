# atom — Task Plan

<!-- Each task references the SPEC.md requirement(s) it addresses -->
<!-- Verify command shown after each task — run before marking complete -->

## 1. Project Setup & Cleanup

- [x] 1.1 Remove Python scaffolding: delete `atom/`, `pyproject.toml`, `tests/`, `README.md` (will be replaced) — R9
- [x] 1.2 Create root `package.json` (npm workspaces) listing `themes/*` and `shared` as workspaces — R9
- [x] 1.3 Create `.gitignore` (node_modules, dist, .DS_Store, .vite, me/ excluded from any build pipeline) — R8, R9
- [x] 1.4 Create `.nvmrc` pinning Node version (20.x LTS) — Pattern 5 (version pinning)
- [x] 1.5 Write new root `README.md` with monorepo structure, theme list, build instructions
- [x] 1.6 Add `.github/workflows/deploy.yml` placeholder (configurable to deploy chosen theme to GitHub Pages) — R10

## 2. Shared Layer — Data

- [x] 2.1 Create `shared/data.js` exporting structured site content — R2, R3, R4, R5
- [x] 2.2 Add JSDoc type annotations to `shared/data.js` for each export — Pattern 6 (boundary validation)
- [x] 2.3 Privacy audit: grep `shared/data.js` for email patterns and phone patterns — R8

## 3. Shared Layer — Hooks & Components

- [x] 3.1 Implement `shared/hooks/useScrollSpy.js` — tracks active section based on viewport — R7
- [x] 3.2 Implement `shared/hooks/useInView.js` — IntersectionObserver wrapper for scroll-triggered animations — S1
- [x] 3.3 Implement `shared/hooks/useThemeToggle.js` — dark/light mode with localStorage persistence — S2
- [x] 3.4 Implement `shared/hooks/useTypewriter.js` — text typing animation — S1
- [x] 3.5 Implement `shared/components/SmoothScroll.jsx` — wraps anchor links for smooth scroll — R1, R7
- [x] 3.6 Implement `shared/components/SEO.jsx` — sets meta tags and Open Graph — S4
- [x] 3.7 Add `prefers-reduced-motion` check to all animation hooks — S1 (via shared `usePrefersReducedMotion` hook)

## 4. Theme A: Control Room — Setup & Shell

- [x] 4.1 Create `themes/control-room/` Vite project (React + JSX, no TypeScript) — R9
- [x] 4.2 Configure `themes/control-room/vite.config.js` with `base: './'` for portable deploy — R10
- [x] 4.3 Set up `themes/control-room/src/styles/globals.css` — CSS reset, root variables (CRT colors)
- [x] 4.4 Add CRT scan-line overlay component with subtle screen flicker animation — S1
- [x] 4.5 Wire `App.jsx` to import `shared/data.js` via Vite alias — R9

## 5. Theme A: Control Room — Sections

- [x] 5.1 Build `Hero.jsx` — CRT monitor frame, phosphor-glow name, typewriter tagline, pulsing red ENGAGE button — R1, S1
- [x] 5.2 Build `About.jsx` — "PERSONNEL FILE" stamped header, ID badge frame, punch-card stat readouts — R2
- [x] 5.3 Build `Skills.jsx` — analog gauge meters that animate to skill levels on scroll-in-view — R3, S1
- [x] 5.4 Build `Experience.jsx` — vertical status-board timeline with role lights and digital readout metrics — R3
- [x] 5.5 Build `Projects.jsx` — "MISSION BRIEFING" classified-document cards with redacted-text reveal on hover — R4
- [x] 5.6 Build `Contact.jsx` — vintage intercom panel with LinkedIn/GitHub frequency dials (no email/phone) — R5, R8
- [x] 5.7 Build `Nav.jsx` — row of labeled toggle switches with active section glow — R7
- [x] 5.8 Add responsive breakpoints (mobile <768px, tablet, desktop >=1024px) — R6

## 6. Theme B: Exhibition — Setup & Shell

- [x] 6.1 Create `themes/exhibition/` Vite project — R9
- [x] 6.2 Configure Vite with `base: './'` — R10
- [x] 6.3 Set up `globals.css` — Pavilion Daylight + Pavilion at Night palettes
- [x] 6.4 Add parallax scroll background (`ParallaxBackdrop.jsx`, 3 drifting layers, rAF-throttled, disables under reduced-motion) — S1
- [x] 6.5 Wire `App.jsx` to shared data — R9

## 7. Theme B: Exhibition — Sections

- [x] 7.1 Build `Hero.jsx` — Googie parabolic entrance arch, marquee starburst, Pacifico script welcome, Bungee-Inline name, coral pill CTA — R1, S1
- [x] 7.2 Build `About.jsx` — gilded multi-layer brass frame around portrait, brass nameplate, exhibit description + highlight placards — R2
- [x] 7.3 Build `Skills.jsx` — Periodic Table of Capabilities (atomic-number tiles, click-to-expand dossier, decorative not proficiency) — R3
- [x] 7.4 Build `Experience.jsx` — Hall of Achievements with numbered route + spotlight vignettes — R3, S1
- [x] 7.5 Build `Projects.jsx` — Innovations Pavilion display cases with pedestals + spotlight reveals — R4, S1
- [x] 7.6 Build `Contact.jsx` — vintage postcard with travel-poster front + back, single LinkedIn channel — R5, R8
- [x] 7.7 Build `Nav.jsx` — Pavilion Map with numbered marker pins, gold-glow active stop — R7
- [x] 7.8 Responsive breakpoints — R6

## 8. Theme C: Magazine — Setup & Shell

- [x] 8.1 Create `themes/magazine/` Vite project — R9
- [x] 8.2 Configure Vite with `base: './'` — R10
- [x] 8.3 Set up `globals.css` — paper texture background, serif/sans typography stack
- [x] 8.4 Wire `App.jsx` to shared data — R9

## 9. Theme C: Magazine — Sections

- [x] 9.1 Build `Hero.jsx` — magazine cover, masthead, SPECIAL ISSUE banner, cover teasers — R1
- [x] 9.2 Build `About.jsx` — feature article spread, drop-cap, pull quote, halftone-filtered photo — R2
- [x] 9.3 Build `Skills.jsx` — "Four Pillars" infographic with mid-century icons (decorative, not proficiency) — R3
- [x] 9.4 Build `Experience.jsx` — numbered chapters with vintage-ad sidebar metrics, Saul Bass dividers — R3
- [x] 9.5 Build `Projects.jsx` — feature ad + 4 quarter-page ads — R4
- [x] 9.6 Build `Contact.jsx` — "Write to the Editor" letters page, LinkedIn-only correspondence — R5, R8
- [x] 9.7 Build `Nav.jsx` — table-of-contents with leader-dot fills and decorative page numbers — R7
- [x] 9.8 Responsive breakpoints — R6

## 10. Privacy Verification (R8)

- [x] 10.1 Write `scripts/scan-pii.mjs` (two-tier scan: targeted strings + heuristic patterns; skips `__tests__` per L5) — R8
- [x] 10.2 `pii:scan` npm script wired at root, runs as `npm run build` pre-step and as a CI gate — R8
- [x] 10.3 `me/` is gitignored entirely (was previously only excluding `.bak`) — R8
- [x] 10.4 Built theme passes the PII scan against both source and `dist/`

## 11. Tests (Scenario Coverage)

- [x] 11.1 Vitest + React Testing Library + jest-dom + user-event wired in `themes/control-room/` — R9
- [x] 11.2 R1 — `Hero.test.jsx` (renders name/title/CTA, CTA scrolls to projects)
- [x] 11.3 R2 — `About.test.jsx` (bio paragraphs, portrait, 3+ highlights)
- [x] 11.4 R3 — `Skills.test.jsx` + `Experience.test.jsx` (categories, dossier, metrics, bullets)
- [x] 11.5 R4 — `Projects.test.jsx` (title, description, tags, links open new tab w/ noopener)
- [x] 11.6 R5/R8 — `Contact.test.jsx` (LinkedIn-only, no email/phone strings, target=_blank rel=noopener noreferrer)
- [x] 11.7 R7 — `Nav.test.jsx` (every section anchored, nav landmark, click-scrolls)
- [x] 11.8 R8 — `Privacy.test.jsx` (`assertNoPII` throws on planted email/phone, passes on real data)
- [x] 11.9 Build verification — `npm run build` runs the PII gate then Vite build cleanly
- [x] 11.10 S2 — `ThemeToggle.test.jsx` (toggles, persists to localStorage, sets `data-theme`)
- [x] 11.11 S4 — `SEO.test.jsx` (Open Graph + Twitter meta tags written to head)
- [ ] 11.12 R6 — manual visual responsive check at 375 / 768 / 1440 px (user verifies in browser)

## 12. Cross-Cutting Lessons (Pattern Coverage)

- [x] 12.1 Pattern 5 — all React/Vite/Vitest/RTL dependencies pinned to exact versions; lockfile committed
- [x] 12.2 Pattern 6 — `assertNoPII` runs at App mount and is unit-tested; `pii:scan` blocks build at boundary
- [x] 12.3 Pattern 7 — `file` reports UTF-8 / ASCII for source files; non-ASCII (em dashes, "·") render correctly in build output

## 13. Performance & Accessibility

- [ ] 13.1 Lighthouse mobile audit (manual, post-deploy) — S3
- [x] 13.2 Semantic HTML landmarks present (`<nav>`, `<main>`, `<section>`, `<header>`, `<footer>`)
- [x] 13.3 `alt` text on portrait, `aria-label` on icon-only buttons, atom logo has `aria-hidden`
- [x] 13.4 Skip link, focus-visible rings, keyboard-focusable element tiles and dial — verified in tests + manual
- [x] 13.5 WCAG AA contrast verified by the implementation agent — body 13.8:1 (light), 17:1 (dark)

## 14. Build, Deploy, & Documentation

- [x] 14.1 Root npm scripts simplified: `dev`, `build` (with PII gate), `test`, `pii:scan`
- [x] 14.2 GitHub Pages workflow simplified — push to `main` triggers PII scan → build → deploy. No theme picker.
- [x] 14.3 `README.md` rewritten to reflect single-theme structure, content editing guide, deploy steps
- [x] 14.4 Build verified: `themes/control-room/dist/` produces 5 files (~790 KB total, 56 KB gzipped JS, 8 KB gzipped CSS)
- [ ] 14.5 ESLint config — deferred (Vite + Vitest validate JSX during build/test; standalone ESLint not added)

## Review

### Completed in this implementation cycle
- Greenfield foundation (sections 1-3): root config, shared data + hooks + components, asset pipeline.
- Theme A built end-to-end (sections 4-5), then redesigned to optimistic Googie/Jetsons aesthetic after first-pass review (CRT noir → Atomic Lounge / Tomorrowland Mission Control).
- Two alternative themes (B Exhibition, C Magazine) built for comparison and removed once owner selected Theme A.
- Skills section iterated from analog gauges to a Periodic Table of Capabilities (ported from the Exhibition theme).
- Privacy infrastructure: PII regex scanner, gitignore for `me/`, runtime `assertNoPII` guard, scenario-level privacy unit tests.
- Static OG/Twitter card meta tags so social link previews work without JS.
- 28 scenario-level tests covering R1-R8, R9, S2, S4. All passing.
- Five lessons captured in `tasks/lessons.md`: PII scan tier strategy, Vite transitive vulns, SVG theming via inline CSS vars, no fabricated facts on a portfolio, scanners must skip test files.

### Deferred (manual / post-deploy)
- 11.12 — Visual responsive check at 375/768/1440 (user verifies)
- 13.1 — Lighthouse audit (run after first deploy)
- 14.5 — Optional ESLint configuration

### Ready to deploy
`git push origin main` triggers `.github/workflows/deploy.yml`, which runs the PII gate, builds the site, and publishes to GitHub Pages.

---

## 15. Brownfield change: Capability Console — AI Tile & Symbol Collision Fix

Change folder: `changes/capability-console-ai-tile/`
Spec delta: `changes/capability-console-ai-tile/specs/R3-skills.md`

- [x] 15.1 Add `SYMBOL_OVERRIDES` map to `themes/control-room/src/components/Skills.jsx` and consult it first in `symbolFor()`. Map IAM → `Id`, Agentic AI Engineering → `Ai`, Security-First AI Tooling → `Sf`. — R3 (Symbol override scenario)
- [x] 15.2 Add new category "AI & Agentic Engineering" to `shared/data.js` with four items in order: Agentic AI Engineering, Security-First AI Tooling, Spec-Driven Development, Plugin & Skill Authorship. — R3.1
- [x] 15.3 Add a Vitest assertion to `themes/control-room/src/__tests__/Skills.test.jsx` verifying that every rendered tile has a unique symbol. — R3 (uniqueness scenario)
- [x] 15.4 Run `npm test` and confirm all suites pass. — 29/29 passing
- [x] 15.5 Run `npm run lint` if a lint script exists. — N/A (no lint script in package.json)
- [x] 15.6 Run `npm run build` and confirm the PII scan + build pass. — passed, 50 modules
- [x] 15.7 Start dev server (`npm run dev`) for user visual inspection — user approved.
- [x] 15.8 Add `violet` palette token (CSS vars + tile + legend + dossier rules) so the AI category gets a distinct hue instead of wrapping to coral.
- [x] 15.9 Drop "Made with wonder" from `Footer.jsx` (read like a tool name to the user).
- [x] 15.10 Drop inaccurate vendor/budget bullet from Lumin Digital experience in `shared/data.js`. Drop the related `Vendor & Budget Management` tile from the Capability Console (L4 audit).
- [x] 15.11 Capture L6 in `tasks/lessons.md` — when one inaccurate claim is removed, audit related claims for the same defect.
- [ ] 15.12 On PR merge: merge delta spec into main `SPEC.md`, archive change folder to `changes/archive/2026-05-14-capability-console-ai-tile/`.
- [ ] 15.13 Commit on branch `feature/capability-console-ai-tile`, push, open PR.

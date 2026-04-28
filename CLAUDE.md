# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A personal portfolio website for a security engineering leader, styled in optimistic atomic-age (Tomorrowland 1962 / Mission Control / Googie) aesthetic. Single-page React + Vite SPA, deployed as a static site to GitHub Pages. Goal: stand out to recruiters and hiring managers, position the owner for security lead/manager roles.

## Architecture

React + Vite npm-workspaces monorepo with one deployable theme and a shared content/hooks layer.

```
atom-website/
├── shared/                       # Content + reusable React primitives
│   ├── data.js                   # Single source of truth — bio, skills, projects, experience, social
│   ├── assets/                   # portrait.jpg + og-image.jpg (build-bundled)
│   ├── hooks/                    # usePrefersReducedMotion, useScrollSpy, useInView,
│   │                             # useThemeToggle (localStorage-persisted), useTypewriter
│   └── components/               # SmoothScroll, SEO
├── themes/control-room/          # The Vite + React app — "Atomic Lounge / Tomorrowland Mission Control"
│   ├── index.html                # Static OG + Twitter card meta tags live here (crawlers without JS)
│   ├── vite.config.js            # base: './' for portable GH Pages deploys
│   ├── public/og-image.jpg       # Lands at dist/og-image.jpg for social previews
│   └── src/
│       ├── App.jsx               # Runs assertNoPII at mount; mounts SEO + Nav + sections + BackgroundDecor
│       ├── styles/globals.css    # Atomic Lounge palette + Sputnik Spring (light) + all section CSS
│       ├── components/           # AtomLogo, Decorations, BackgroundDecor, Nav, Hero, About,
│       │                         # Skills (Periodic Table of Capabilities), Experience, Projects,
│       │                         # Contact (LinkedIn-only), Footer
│       └── __tests__/            # Vitest + RTL — one focused test file per requirement
├── scripts/scan-pii.mjs          # Two-tier PII regex scanner — CI gate + pre-build hook
├── .github/workflows/deploy.yml  # Push to main → PII scan → build → GitHub Pages
├── me/                           # Personal reference (gitignored — never pushed, never bundled)
├── SPEC.md                       # Source of truth (RFC 2119 + Given/When/Then scenarios)
├── tasks/
│   ├── todo.md                   # Implementation plan with status checkboxes
│   └── lessons.md                # Captured pitfalls — read before brainstorming/planning
└── docs/design/                  # Design rationale documents
```

### Aesthetic
**The Atomic Control Room** — Tomorrowland 1962 Mission Control, NOT Cold-War CRT noir. Dark mode (Atomic Lounge) is midnight blue with electric turquoise + coral + mustard + starburst-pink accents. Light mode (Sputnik Spring) is cream with rich turquoise + warm coral + navy text. Visual motifs: animated atom logo (3 orbiting electrons), starbursts, sputniks, boomerangs, parabolic arches, a Periodic Table of Capabilities for skills. Communicates leadership through scale and elegance.

### Content positioning
Targets security lead/manager roles. Headline metrics (8M+ users, 90+ client platforms, 30+ AWS accounts, 200k+ resources, SOC 2 · PCI DSS) drive every section. Bio emphasizes mentoring, team building, strategic program work.

### Privacy constraint (R8)
- **No email, no phone, no resume** in source or build output. Contact is LinkedIn-only.
- The `me/` directory is gitignored — local-only reference (contains the resume PDF and original portrait source).
- The owner's portrait illustration at `shared/assets/portrait.jpg` IS bundled — explicitly approved.
- `scripts/scan-pii.mjs` runs as a pre-build npm hook AND as a CI deploy gate. It uses two scan tiers (see `tasks/lessons.md` L1): targeted strings against everywhere, heuristic regex against source only (minified bundles produce noisy false positives). Skips `__tests__/` directories per L5 (tests plant fake-PII fixtures to verify the guard).

## Spec Format

Requirements use RFC 2119 keywords (SHALL/SHOULD/MAY) with IDs (R1, R2, S1, N1). Each has Given/When/Then scenarios that map directly to test cases. SPEC.md is the source of truth.

## Key Patterns

- **Secrets**: environment variables only, never hardcoded
- **Logging**: structured, never log PII/PCI/secrets
- **Traceability**: every plan task references a SPEC.md requirement ID; every test covers a scenario
- **Pinned deps**: all React/Vite/Vitest/RTL versions are exact (no `^`/`~`) per cross-cutting Pattern 5
- **Theme-responsive SVG**: any `fill`/`stroke` that should respond to dark/light MUST use `style={{ stroke: 'var(--x)' }}` inline (not the XML attribute form, not gradient stops — see L3)
- **No fabricated facts on the site** (see L4): every numeral, year, ID, percentage, badge text rendered to the DOM must trace to `shared/data.js` or `me/me.txt`, OR be obviously decorative ("Sector 03", mock dial frequencies)

## Workflow

- **Task tracking**: `tasks/todo.md` only — never TaskCreate/TaskUpdate/TodoWrite
- **Lessons capture**: after ANY user correction, immediately update `tasks/lessons.md`. Read lessons during brainstorming and planning.
- **Review pipeline (3 stages, mandatory before presenting work)**:
  1. Spec-reviewer subagent — "did we build what was asked?"
  2. `/reviewer` agent (Opus, read-only) — independent quality review
  3. `/review --fix` — context-aware final gate with auto-fix

## Files to Know About

- `SPEC.md` — RFC 2119 requirements + Given/When/Then scenarios
- `tasks/todo.md` — implementation plan (most sections checked off; manual items remain)
- `tasks/lessons.md` — five captured lessons (L1–L5) covering PII scan strategy, Vite vulns, SVG theming, fabricated-facts rule, and scanner test exclusion
- `docs/design/atomic-themes-design.md` — original three-theme design rationale (kept for history)
- `shared/data.js` — single source of truth for all site content
- `themes/control-room/index.html` — static OG/Twitter card tags (crawlers without JS)
- `scripts/scan-pii.mjs` — privacy gate
- `.github/workflows/deploy.yml` — CI/CD pipeline (push to main → deploy)

## Brownfield Changes

For modifying existing functionality, use change folders:
1. Create `changes/<change-name>/` with proposal.md, specs/ (delta), design.md
2. Delta specs use ADDED/MODIFIED/REMOVED sections with RFC 2119 + scenario format
3. When complete, merge deltas into main SPEC.md

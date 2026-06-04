# atom

A personal portfolio website for a security engineering leader, styled in the optimistic atomic age (Tomorrowland 1962 / Mission Control / Googie) aesthetic. Single-page React + Vite SPA, deployed as a static site to GitHub Pages.

## Setup

```bash
nvm use         # Node 20.11.1
npm install
```

## Develop

```bash
npm run dev     # starts the Vite dev server (http://localhost:5173)
```

## Build

```bash
npm run build   # runs the PII scan, then builds to themes/control-room/dist/
```

## Privacy / PII Scan

The site must never expose email, phone, or downloadable resume. The scanner runs as a pre-build npm hook AND as a CI gate in the deploy workflow:

```bash
npm run pii:scan
```

It scans both source (with broad heuristics) and `dist/` (with targeted strings) so minified-bundle false positives don't pollute results.

## Deploy to GitHub Pages

The `.github/workflows/deploy.yml` workflow runs on every push to `main`. It:

1. Installs dependencies with `npm ci`
2. Runs `npm run pii:scan` (deploy gate)
3. Builds the site
4. Uploads `themes/control-room/dist/` as the Pages artifact and deploys

To enable deployment in your fork:

1. Push the code to a GitHub repo
2. **Settings → Pages → Source: GitHub Actions**
3. The next push to `main` triggers a deploy. The site lands at `https://<your-username>.github.io/<repo>/`.

## Project Structure

```
atom-website/
├── shared/                # Content data + reusable hooks/components
│   ├── data.js            # Bio, skills, projects, experience (single source of truth)
│   ├── assets/            # Portrait + OG image
│   ├── hooks/             # useScrollSpy, useInView, useThemeToggle, etc.
│   └── components/        # SmoothScroll, SEO
├── themes/control-room/   # The deployable Vite + React app
│   ├── public/og-image.jpg
│   └── src/
│       ├── App.jsx
│       ├── styles/
│       └── components/    # AtomLogo, Decorations, Nav, Hero, About, Skills, Experience, Projects, Contact, Footer
├── scripts/
│   └── scan-pii.mjs       # PII regex scanner (CI gate)
└── me/                    # Personal reference (gitignored, never pushed, never bundled)
```

## Editing Site Content

Almost everything visible to visitors is driven by exports in `shared/data.js`:

| Export | What it drives |
|---|---|
| `personal` | Hero name, About nameplate, Nav brand |
| `bio` | About paragraphs |
| `highlights` | Stat cards in About |
| `skills` | Periodic Table of Capabilities (Skills section) |
| `experience` | Mission Timeline (Experience section) |
| `projects` | Featured Innovation cards (Projects section) |
| `social` | Contact dial(s) — currently LinkedIn only |
| `sections` | Nav order and labels |
| `seo` | Meta title/description (browser tab + runtime; static OG tags live in `themes/control-room/index.html`) |

A small set of decorative strings (e.g., "Sector 03 · Instrumentation", "EXPLORE THE FILES" CTA, footer sign-off) live in the relevant component files under `themes/control-room/src/components/`.

## Privacy Constraint

- No email, phone, or resume PDF in source or built output. Contact is LinkedIn only.
- The `me/` directory is **gitignored** — local-only reference material.
- The PII scanner is a hard gate in CI; deploys fail if any private string slips in.

<div align="center">

# ⚛️ Gage Nichols

### A personal portfolio for the optimistic atomic age

*Tomorrowland 1962 · Mission Control · Googie*

<br />

[![Live Site](https://img.shields.io/badge/visit-the_site-22d3ee?style=for-the-badge&logo=github&logoColor=0c1430)](https://realgagenichols.github.io/GageNichols/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/realgagenichols/GageNichols/deploy.yml?style=for-the-badge&label=deploy&color=ff6b6b)](https://github.com/realgagenichols/GageNichols/actions/workflows/deploy.yml)

![React](https://img.shields.io/badge/React-18.3-22d3ee?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-fbbf24?style=flat-square&logo=vite&logoColor=0c1430)
![Vitest](https://img.shields.io/badge/Vitest-2.1-f472b6?style=flat-square&logo=vitest&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-static-ff6b6b?style=flat-square&logo=githubpages&logoColor=white)
![No PII](https://img.shields.io/badge/PII-scanned_in_CI-22d3ee?style=flat-square&logo=shieldsdotio&logoColor=white)

</div>

---

> A single-page React + Vite SPA, deployed as a static site to GitHub Pages. The interface is an
> atomic-age design system, starbursts, orbiting electrons, and a Periodic Table of Capabilities,
> with all content driven from a single data file.

<br />

## ✨ The aesthetic

**The Atomic Control Room.** Tomorrowland 1962 Mission Control, not Cold-War CRT noir. Two
moods, one localStorage toggle:

| Mode | Mood | Palette |
|---|---|---|
| 🌙 **Atomic Lounge** *(dark)* | Midnight mission control | Deep midnight blue, electric turquoise, coral, mustard, starburst pink |
| ☀️ **Sputnik Spring** *(light)* | Sunlit launch pad | Warm cream, rich turquoise, coral, navy ink |

<div align="center">

![Midnight](https://img.shields.io/badge/_-0c1430?style=flat-square&label=midnight)
![Turquoise](https://img.shields.io/badge/_-22d3ee?style=flat-square&label=turquoise)
![Coral](https://img.shields.io/badge/_-ff6b6b?style=flat-square&label=coral)
![Mustard](https://img.shields.io/badge/_-fbbf24?style=flat-square&label=mustard)
![Pink](https://img.shields.io/badge/_-f472b6?style=flat-square&label=pink)
![Cream](https://img.shields.io/badge/_-fef8e7?style=flat-square&label=cream)

</div>

Visual motifs: an animated atom logo with three orbiting electrons, sputniks, boomerangs,
parabolic arches, and a periodic table that doubles as the skills section. Scale and elegance
do the talking.

<br />

## 🚀 Quick start

```bash
nvm use         # Node 20.11.1 (see .nvmrc)
npm install
npm run dev     # Vite dev server → http://localhost:5173
```

<details>
<summary><b>More commands</b></summary>

<br />

```bash
npm run build       # PII scan, then build to themes/control-room/dist/
npm run pii:scan    # privacy gate, run on its own
npm test            # Vitest across workspaces
```

</details>

<br />

## 🧱 Architecture

A React + Vite npm-workspaces monorepo: one deployable theme plus a shared content and hooks layer.

```
GageNichols/
├── shared/                  # Content + reusable React primitives
│   ├── data.js              # ← single source of truth (bio, skills, projects, experience)
│   ├── assets/              # portrait.jpg + og-image.jpg (build-bundled)
│   ├── hooks/               # useScrollSpy, useInView, useThemeToggle, useTypewriter …
│   └── components/          # SmoothScroll, SEO
├── themes/control-room/     # The deployable Vite + React app
│   ├── index.html           # Static OG + Twitter card tags (crawlers without JS)
│   ├── public/og-image.jpg  # Social preview
│   └── src/
│       ├── App.jsx          # Runs assertNoPII at mount, then mounts the page
│       ├── styles/          # Atomic Lounge + Sputnik Spring palettes, all section CSS
│       └── components/      # AtomLogo, Nav, Hero, About, Skills, Experience, Projects, Contact …
├── scripts/scan-pii.mjs     # Two-tier PII scanner (CI gate + pre-build hook)
├── .github/workflows/       # Push to main → PII scan → build → GitHub Pages
└── me/                      # Personal reference (gitignored, never pushed, never bundled)
```

<br />

## ✏️ Editing the content

Almost everything a visitor sees is driven by exports in **`shared/data.js`**. Change the data,
not the components:

| Export | Drives |
|---|---|
| `personal` | Hero name, About nameplate, Nav brand |
| `bio` | About paragraphs |
| `highlights` | Stat cards in About |
| `skills` | Periodic Table of Capabilities |
| `experience` | Mission Timeline |
| `projects` | Featured Innovation cards |
| `social` | Contact dial (LinkedIn only) |
| `sections` | Nav order and labels |
| `seo` | Meta title and description (static OG tags live in `themes/control-room/index.html`) |

A few decorative strings (for example `Sector 03 · Instrumentation` and the footer sign-off)
live in their component files under `themes/control-room/src/components/`.

> **House rule (L4):** no fabricated facts on the site. Every numeral, year, ID, and percentage
> rendered to the DOM traces back to `shared/data.js` or `me/me.txt`, unless it is obviously
> decorative.

<br />

## 🔒 Privacy by design

Contact is **LinkedIn only**. There is no email, no phone number, and no downloadable resume in
the source or the build output.

- The `me/` directory is **gitignored**, local reference material that never ships.
- `scripts/scan-pii.mjs` runs as a pre-build npm hook **and** as a hard gate in CI. A deploy
  fails if any private string slips through.
- It scans in two tiers: targeted strings everywhere, broad heuristics against source only, so
  minified bundles do not produce noisy false positives.

```bash
npm run pii:scan
```

<br />

## 🛰️ Deploy

`.github/workflows/deploy.yml` runs on every push to `main`:

```
push to main  →  npm ci  →  pii:scan (gate)  →  build  →  upload dist/  →  GitHub Pages
```

To deploy your own fork:

1. Push to a GitHub repo.
2. **Settings → Pages → Source: GitHub Actions.**
3. The next push to `main` ships it to `https://<your-username>.github.io/<repo>/`.

<br />

---

<div align="center">

Built with React, Vite, and a healthy respect for the year 1962.

<sub><a href="SPEC.md">SPEC.md</a> is the source of truth · requirements use RFC 2119 + Given/When/Then scenarios</sub>

</div>

# atom — Specification

## Purpose

**What:** A personal portfolio website with an atomic age (1950s retro-futurism, Googie / Tomorrowland Mission Control aesthetic) design, built to showcase a security engineering leader's skills, experience, and personality to recruiters and hiring managers.

**Why:** Job seekers need a memorable online presence that stands out from generic resumes. A themed, immersive portfolio site demonstrates creativity and technical ability while making the candidate memorable. The site distinguishes the owner from candidates relying solely on a standard resume/LinkedIn profile.

The build originally produced three theme variants for evaluation; after review the owner selected the **Atomic Control Room** variant (`themes/control-room/`) and the other variants were removed. The shared content layer (`shared/`) is preserved so a future variant could be added if the design direction shifts.

## Requirements

### Must Have

#### R1: Hero / Landing Section
The site SHALL display a visually striking hero section with the owner's name, title/tagline, and a call-to-action, styled with atomic age design elements unique to each theme variant.

##### Scenario: First impression
- GIVEN a visitor loads the site for the first time
- WHEN the page renders
- THEN a hero section is visible above the fold with name, title, and CTA button
- AND the design uses atomic age visual elements appropriate to the active theme

##### Scenario: CTA navigation
- GIVEN the hero section is displayed
- WHEN the visitor clicks the CTA button
- THEN the page scrolls smoothly to the relevant section

#### R2: About Me Section
The site SHALL include an "About Me" section with a brief bio, photo/avatar area, and key highlights (years of experience, specializations, leadership).

##### Scenario: About section content
- GIVEN a visitor scrolls to the About section
- WHEN the section is visible
- THEN it displays a bio paragraph, a photo/avatar placeholder, and at least 3 key highlight items
- AND highlights emphasize leadership, mentoring, and strategic impact

#### R3: Skills / Experience Section
The site SHALL display technical skills and professional experience in a visually engaging format consistent with the active theme variant.

##### Scenario: Skills display
- GIVEN a visitor views the skills section
- WHEN the section renders
- THEN skills are displayed with theme-appropriate visual indicators
- AND skills are grouped by category (Security Engineering, Cloud/Infrastructure, Leadership & Mentoring, Tools & Platforms)

##### Scenario: Experience timeline
- GIVEN a visitor views the experience area
- WHEN the section renders
- THEN work history is presented with company, role, dates, and brief descriptions
- AND key metrics (8M+ users, 90+ platforms, 30+ accounts, 200k+ resources) are prominently displayed

#### R4: Projects / Portfolio Section
The site SHALL showcase selected projects with titles, descriptions, technology tags, and links (demo/repo where available).

##### Scenario: Project cards
- GIVEN a visitor views the projects section
- WHEN the section renders
- THEN at least one project card is displayed with title, description, tech tags, and at least one link
- AND cards use theme-appropriate styling

#### R5: Contact Section
The site SHALL provide a contact section with a link to the owner's LinkedIn profile as the sole contact channel. No email address, phone number, or alternate contact channel SHALL be displayed in the contact section. (GitHub may still appear elsewhere as a project link where relevant, but is not presented as a contact route.)

##### Scenario: Contact information
- GIVEN a visitor wants to reach out
- WHEN they scroll to the contact section
- THEN they see a clickable link to LinkedIn
- AND that link opens in a new tab with `rel="noopener noreferrer"`
- AND no email address or phone number is visible anywhere on the page
- AND no other "contact me" channel is presented

#### R6: Responsive Design
The site SHALL be fully responsive across mobile, tablet, and desktop viewports.

##### Scenario: Mobile layout
- GIVEN a visitor views the site on a phone (viewport < 768px)
- WHEN the page renders
- THEN all sections are readable and navigable without horizontal scrolling
- AND navigation adapts to a mobile-friendly format

##### Scenario: Desktop layout
- GIVEN a visitor views the site on a desktop (viewport >= 1024px)
- WHEN the page renders
- THEN the layout takes advantage of the wider viewport with multi-column layouts where appropriate

#### R7: Navigation
The site SHALL include a fixed/sticky navigation bar with links to each section, styled per theme variant.

##### Scenario: Navigation links
- GIVEN the navigation bar is visible
- WHEN a visitor clicks a nav link
- THEN the page scrolls smoothly to the corresponding section

##### Scenario: Active section indicator
- GIVEN a visitor is scrolling through the page
- WHEN a section comes into view
- THEN the corresponding nav link is visually highlighted

#### R8: Privacy — Contact-Channel & Resume Protection
The site SHALL NOT expose contact-channel PII (email address, phone number, home street address) in source code, built output, or served content. The site SHALL NOT serve a downloadable resume PDF or any document containing such PII.

A profile photo or illustrated portrait of the owner is allowed when the owner has explicitly placed it in a build-accessible location (e.g., `shared/assets/`). Such a photo is intentional self-publication, not a privacy leak.

##### Scenario: No contact-channel PII in source or output
- GIVEN the site source code and built output
- WHEN scanned for email patterns and phone-number patterns matching the owner's known contact info
- THEN no matches are found

##### Scenario: No downloadable resume
- GIVEN a visitor inspects the site or its built output
- WHEN they search for resume documents
- THEN no resume PDF or document containing contact-channel PII is accessible

##### Scenario: me/ directory excluded from build
- GIVEN the build process runs
- WHEN output is generated to dist/
- THEN no files from `me/` are included in the output (the resume PDF in particular MUST NOT appear)
- AND any image the owner wishes to publish has been copied to `shared/assets/` or the theme's `public/` first

#### R9: Single Deployable Theme with Shared Content Layer
The site SHALL be built as a single Vite + React workspace under `themes/control-room/` consuming a shared content/hooks layer at `shared/`, deployable as a standalone static site.

##### Scenario: Independent build
- GIVEN the developer runs `npm run build`
- WHEN the build completes
- THEN a self-contained static site is produced in `themes/control-room/dist/`
- AND it can be deployed to GitHub Pages

##### Scenario: Shared content drives the build
- GIVEN content data is updated in `shared/data.js`
- WHEN the theme is rebuilt
- THEN the updated content appears in the output

#### R10: GitHub Pages Deployment
The site SHALL build to static files (HTML, CSS, JS, assets) deployable to GitHub Pages.

##### Scenario: Static output
- GIVEN the build process completes
- WHEN the dist/ folder is inspected
- THEN it contains only static files with no server-side dependencies

### Should Have

#### S1: Atomic Age Animations
The site SHOULD include tasteful animations consistent with each theme's aesthetic (CRT flicker for control-room, parallax for exhibition, page-turn for magazine).

##### Scenario: Animated elements
- GIVEN a visitor is browsing the site
- WHEN animated elements are in the viewport
- THEN animations play smoothly (60fps target)
- AND animations respect `prefers-reduced-motion` media query

#### S2: Dark/Light Theme Toggle
The site SHOULD support a theme toggle between a "Day" and "Night" color scheme within each theme variant.

##### Scenario: Theme switch
- GIVEN the site is in light mode
- WHEN the visitor clicks the theme toggle
- THEN the color scheme transitions to dark mode
- AND the preference is persisted in localStorage

#### S3: Performance
The site SHOULD achieve a Lighthouse performance score of 90+ on mobile.

##### Scenario: Fast load
- GIVEN the site is deployed
- WHEN tested with Lighthouse on mobile
- THEN the performance score is 90 or above

#### S4: SEO and Social Sharing
The site SHOULD include proper meta tags and Open Graph data so link previews look good when recruiters share the URL.

##### Scenario: Link preview
- GIVEN someone shares the site URL on LinkedIn or Slack
- WHEN the platform fetches the page metadata
- THEN a preview card appears with the site title, description, and a preview image

### Nice to Have

#### N1: Easter Eggs
The site MAY include fun atomic-age-themed easter eggs (e.g., Geiger counter click sounds on hover, Konami code secret, hidden "fallout shelter" section).

#### N2: Blog / Writing Section
The site MAY include a section for blog posts or articles to demonstrate thought leadership.

#### N3: Testimonials
The site MAY include a testimonials section with quotes from colleagues or managers.

### Out of Scope
- Backend CMS or database — content is static/hardcoded
- User authentication or login
- E-commerce or payment processing
- Server-side rendering
- Downloadable resume or any document containing PII
- Contact form (requires backend) — LinkedIn is the contact channel

## Architecture

### Project Structure

```
atom-website/
├── package.json              # Root workspaces + npm scripts (dev, build, pii:scan)
├── shared/
│   ├── data.js               # All site content (single source of truth)
│   ├── assets/
│   │   ├── portrait.jpg      # Owner's atomic-age portrait illustration
│   │   └── og-image.jpg      # Social-share preview image
│   ├── hooks/
│   │   ├── usePrefersReducedMotion.js
│   │   ├── useScrollSpy.js   # Tracks active section
│   │   ├── useInView.js      # Scroll-triggered animations
│   │   ├── useThemeToggle.js # Dark/light mode persisted in localStorage
│   │   └── useTypewriter.js  # Text reveal animation
│   └── components/
│       ├── SmoothScroll.jsx
│       └── SEO.jsx
├── themes/
│   └── control-room/         # The selected theme — Atomic Lounge / Mission Control
│       ├── index.html        # Static OG/Twitter card tags live here
│       ├── vite.config.js    # base: './' for portable GH Pages deploy
│       ├── public/og-image.jpg
│       └── src/
│           ├── App.jsx
│           ├── main.jsx
│           ├── styles/globals.css
│           └── components/   # AtomLogo, Decorations, Nav, Hero, About, Skills, Experience, Projects, Contact, Footer, BackgroundDecor
├── scripts/
│   └── scan-pii.mjs          # Build gate — fails CI if PII detected
├── .github/workflows/deploy.yml  # Pushes to main auto-deploy to GH Pages
├── me/                       # Local-only reference; gitignored
├── SPEC.md
└── tasks/
```

### Theme Aesthetic

**The Atomic Control Room** — Tomorrowland 1962 Mission Control, not Cold-War CRT. Dark mode (Atomic Lounge) uses midnight blue with electric turquoise + coral + mustard + starburst-pink accents. Light mode (Sputnik Spring) uses cream with rich turquoise + warm coral + navy text. Visual motifs: animated atom logo (3 orbiting electrons), starbursts, sputniks, boomerangs, parabolic arches, and a Periodic Table of Capabilities for the skills section. Communicates leadership through scale and elegance, not darkness.

### Data Flow
1. Content defined in `shared/data.js` (bio, skills, projects, experience, social links).
2. The theme imports shared data, hooks, and the portrait asset.
3. Components render the data with the Atomic Lounge styling.
4. Vite builds to `themes/control-room/dist/` — static HTML/CSS/JS/JPG.
5. `dist/` is uploaded as the GitHub Pages artifact by `.github/workflows/deploy.yml`.

### Key Decisions
- **Decision:** React + Vite SPA (not Python static site builder)
  - Why: Reactive, immersive experience with complex animations requires component architecture and state management. Vite builds to static files for GitHub Pages.
- **Decision:** Single-page design with smooth-scroll sections
  - Why: Recruiters want to quickly scan everything. Single page keeps engagement high.
- **Decision:** Optimistic Googie / Jetsons aesthetic, not CRT/Cold-War
  - Why: After initial CRT redesign was reviewed, owner felt the dark tech-noir read as paranoid rather than atomic-age optimistic. The current palette and motifs evoke Tomorrowland and the 1964 World's Fair.
- **Decision:** No email/phone/resume on site; LinkedIn-only contact
  - Why: Privacy. Contact is through LinkedIn only. Resume contains PII and must not be served. The PII scanner enforces this in CI.
- **Decision:** Content positioning for security leadership
  - Why: Target role is lead/manager. Content emphasizes strategic impact, team building, mentoring, and program-level metrics over individual technical skills.
- **Decision:** Owner's portrait illustration is build-bundled at `shared/assets/portrait.jpg`
  - Why: Owner explicitly approved; the illustration is on-theme (atomic motifs in the artwork) and elevates the About section. The original `me/` source files (including the resume) remain gitignored.
- **Decision:** Theme variants B (Exhibition) and C (Magazine) were built for evaluation, then removed
  - Why: Owner selected the Control Room aesthetic; carrying unused variants is dead code that complicates the build matrix and review surface.

## Test Strategy

### Scenario Coverage
Each requirement scenario maps to at least one test case in `themes/control-room/src/__tests__/`:
- [x] R1 (Hero) → `Hero.test.jsx`
- [x] R2 (About) → `About.test.jsx`
- [x] R3 (Skills + Experience) → `Skills.test.jsx`, `Experience.test.jsx`
- [x] R4 (Projects) → `Projects.test.jsx`
- [x] R5 (Contact) → `Contact.test.jsx`
- [x] R6 (Responsive) → manual visual testing at 375px, 768px, 1440px
- [x] R7 (Navigation) → `Nav.test.jsx`
- [x] R8 (Privacy) → `scripts/scan-pii.mjs` (CI gate)
- [x] R9 (Build) → CI workflow runs the build
- [x] R10 (Static output) → CI workflow uploads dist/ as Pages artifact

### Regression Patterns
- [x] Broken links — `<a>` href values are validated against `social[]` and `projects[].links[]` in tests
- [x] Accessibility — semantic landmarks (`<nav>`, `<main>`, `<section>`, `<header>`, `<footer>`), alt text, ARIA labels, keyboard navigation, skip link
- [x] PII leakage — `scripts/scan-pii.mjs` runs in CI and as a pre-build npm script
- [x] Asset loading — Vite `base: './'` produces relative URLs portable across GH Pages subpaths
- [ ] Cross-browser — manual verification (Chrome, Firefox, Safari)

### Acceptance Criteria
- [x] All scenario tests pass (`npm test`)
- [x] All **R** requirements checked off with passing scenarios
- [x] Site builds via `npm run build`
- [x] Built output contains NO PII (email, phone, resume PDF)
- [x] PII scanner runs in CI and blocks merge on detection
- [ ] Site displays correctly in a browser at 375px, 768px, 1440px (manual)
- [ ] Lighthouse accessibility score >= 90 (manual, post-deploy)

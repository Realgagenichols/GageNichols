# Design Document: Atomic Age Portfolio — Three Theme Variants

## Context

Building a personal portfolio site for a security engineering leader targeting lead/manager roles. The site needs to be immersive, fun, and transport visitors to the atomic age (1950s retro-futurism). Three theme variants will be built so the owner can compare and choose.

## Design Decisions

### Why React + Vite (not Python or plain HTML)

The immersion goal requires:
- Complex scroll-triggered animations
- State management for theme toggles, active nav tracking, typewriter effects
- Component composition for consistent theming across sections

React provides the component model and state management. Vite provides fast builds and outputs static files compatible with GitHub Pages. A Python builder would produce static HTML without client-side interactivity. Plain HTML/CSS/JS could work but building three complete themes with shared logic would require significant code duplication.

### Why Three Separate Builds (not runtime theme switching)

The owner wants to "separate them out and use the one I like best." This means:
- Each theme must be a self-contained deployable unit
- No theme-switching UI in production — one theme = one site
- Shared data/hooks reduce duplication without coupling the builds

Runtime theme switching was considered but rejected because:
- It ships unused CSS/JS for two themes the visitor never sees
- It complicates the GitHub Pages deployment (one repo = one site)
- The owner wants to evaluate them as independent products

### Why No Email/Phone/Resume

The owner is a security engineer and specifically requested no PII exposure. The resume PDF contains email and phone. LinkedIn serves as the contact channel — it's where recruiters already operate, and it lets the owner control the conversation.

This also protects against scraping. No email = no spam. No phone = no cold calls.

### Why Leadership Positioning

Target role is lead/manager. The content and design choices support this:
- Metrics-first experience entries (8M+ users, 90+ platforms, 30+ accounts)
- Skills grouped to show breadth (Security, Cloud, Leadership, Tools) not just depth
- "Control Room" theme (Approach A) metaphorically communicates command and oversight
- Bio emphasizes mentoring, team building, and strategic program work

## Theme Design Rationale

### Theme A: The Atomic Control Room
**Metaphor:** You're in the command center. The owner is in charge.
**Visual language:** CRT monitors, toggle switches, gauge meters, classified documents.
**Psychological effect:** Authority, competence, oversight — maps to leadership roles.
**Color:** Dark backgrounds (charcoal/navy), green/amber phosphor glow, red accent for CTAs.

### Theme B: The Atomic Exhibition
**Metaphor:** You're visiting a World's Fair exhibit about this engineer's career.
**Visual language:** Exhibition plaques, museum displays, grand entrances, spotlights.
**Psychological effect:** Prestige, achievement, forward-thinking — maps to innovation narrative.
**Color:** Warm pastels, teal/turquoise, cream, gold accents.

### Theme C: The Retro Magazine
**Metaphor:** You're reading a feature profile in a 1950s tech magazine.
**Visual language:** Typography-driven, drop caps, pull quotes, infographics, vintage ads.
**Psychological effect:** Credibility, depth, authority through storytelling — maps to thought leadership.
**Color:** Off-white/cream backgrounds, rich navy/burgundy text, starburst accent elements.

## Alternatives Considered

| Option | Why rejected |
|--------|-------------|
| Python Jinja2 static builder | No client-side interactivity for immersive animations |
| Next.js / SSR | Overkill for a static portfolio, complicates GitHub Pages deployment |
| Single theme only | Owner wants to compare options before committing |
| Contact form | Requires backend service (out of scope for GitHub Pages static hosting) |
| Downloadable resume | Contains PII — owner explicitly prohibited this |

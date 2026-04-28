import { projects } from '@shared/data.js';
import { Starburst } from './Decorations.jsx';

function fileId(idx) {
  // FILE-A-001 style identifier — purely decorative
  const letters = 'ABCDEFG';
  const letter = letters[idx % letters.length];
  const num = String(101 + idx).padStart(3, '0');
  return `INNOVATION-${letter}-${num}`;
}

function declassDate(idx) {
  // Mock release date — decorative only
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const m = months[(idx * 3 + 4) % 12];
  const y = 2018 + (idx % 7);
  return `${m} ${y}`;
}

/**
 * Projects — "Featured Innovation" cards.  Each card has a starburst
 * corner accent, a Googie display title, and turquoise/coral pill
 * tags.  Hover lifts the card with a coral-glow border.
 *
 * Requirements: R4 (title, description, tech tags, link).  Cards are
 * keyboard-focusable so the hover lift visualizes via :focus-within.
 */
export function Projects() {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <header className="section-head">
        <span className="coord">Sector 05 · Showcase</span>
        <h2 id="projects-heading" className="section-head__title">
          <Starburst size={32} color="var(--coral)" centerColor="var(--turquoise)" className="section-head__title-burst" />
          Featured Innovations
        </h2>
        <p className="section-head__sub">
          Selected programs and deliverables. Hover for the full briefing.
        </p>
      </header>

      <div className="projects__grid">
        {projects.map((p, idx) => (
          <article
            key={p.title}
            className="briefing"
            tabIndex={0}
            aria-label={`${p.title}, featured innovation`}
          >
            <Starburst
              size={42}
              color="currentColor"
              centerColor="var(--gold)"
              className="briefing__burst"
            />

            <header className="briefing__head">
              <span className="briefing__file-id">{fileId(idx)}</span>
              <span className="briefing__date">{declassDate(idx)}</span>
            </header>

            <h3 className="briefing__title">{p.title}</h3>
            <p className="briefing__summary">{p.summary}</p>

            <p className="briefing__redacted">{p.description}</p>

            <p className="briefing__impact">{p.impact}</p>

            <ul className="briefing__tags" aria-label="Tags">
              {p.tags.map((t) => (
                <li className="briefing__tag" key={t}>
                  {t}
                </li>
              ))}
            </ul>

            {p.links && p.links.length > 0 && (
              <div className="briefing__links">
                {p.links.map((link) => (
                  <a
                    key={link.url}
                    className="briefing__link"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} &rarr;
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

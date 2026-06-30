import { useId, useState } from 'react';
import { projects } from '@shared/data.js';
import { Starburst } from './Decorations.jsx';

function fileId(idx) {
  // INNOVATION-A-101 style identifier. Purely decorative (L4 allows
  // obviously-fake placeholders), serves as a "file stamp" Googie motif.
  const letters = 'ABCDEFG';
  const letter = letters[idx % letters.length];
  const num = String(101 + idx).padStart(3, '0');
  return `INNOVATION-${letter}-${num}`;
}

/** The expand-in-place case-study deep-dive (R4.1). */
function CaseStudy({ sections, id }) {
  return (
    <div className="case-study" id={id}>
      {sections.map((s) => (
        <div className="case-study__section" key={s.heading}>
          <h4 className="case-study__heading">{s.heading}</h4>
          {s.body && <p className="case-study__body">{s.body}</p>}
          {s.points && (
            <ul className="case-study__points">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/** One briefing card. `idx` drives only the decorative file-id stamp. */
function BriefingCard({ project, idx }) {
  const [open, setOpen] = useState(false);
  const caseStudyId = useId();
  const hasCaseStudy = Array.isArray(project.caseStudy) && project.caseStudy.length > 0;

  return (
    <article
      className={`briefing${open ? ' briefing--expanded' : ''}`}
      tabIndex={0}
      aria-label={`${project.title}, featured innovation`}
    >
      <Starburst
        size={42}
        color="currentColor"
        centerColor="var(--gold)"
        className="briefing__burst"
      />

      <header className="briefing__head">
        <span className="briefing__file-id">{fileId(idx)}</span>
        <span className="briefing__date">{project.date}</span>
      </header>

      <h3 className="briefing__title">{project.title}</h3>
      <p className="briefing__summary">{project.summary}</p>

      <p className="briefing__redacted">{project.description}</p>

      <p className="briefing__impact">{project.impact}</p>

      <ul className="briefing__tags" aria-label="Tags">
        {project.tags.map((t) => (
          <li className="briefing__tag" key={t}>
            {t}
          </li>
        ))}
      </ul>

      {project.links && project.links.length > 0 && (
        <div className="briefing__links">
          {project.links.map((link) => (
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

      {hasCaseStudy && (
        <>
          <button
            type="button"
            className="briefing__case-toggle"
            aria-expanded={open}
            aria-controls={open ? caseStudyId : undefined}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close case study' : 'Read the case study'} &rarr;
          </button>
          {open && <CaseStudy sections={project.caseStudy} id={caseStudyId} />}
        </>
      )}
    </article>
  );
}

/**
 * Projects: "Featured Innovation" cards, split into two labeled groups:
 * proprietary "Selected Work" first, then "Open Source · Public Code" (repos
 * with GitHub links).  Each card has a starburst corner accent, a Googie
 * display title, and turquoise/coral pill tags; hover lifts the card.
 *
 * Requirements: R4 (title, description, tech tags, link; work/oss grouping).
 * Cards are keyboard-focusable so the hover lift visualizes via :focus-within.
 */
export function Projects() {
  // Stable, decorative file-id numbering runs across both groups in array order.
  const numbered = projects.map((p, idx) => ({ ...p, idx }));
  const work = numbered.filter((p) => p.kind !== 'oss');
  const oss = numbered.filter((p) => p.kind === 'oss');

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

      <h3 className="projects__group-title">Selected Work</h3>
      <div className="projects__grid">
        {work.map((p) => (
          <BriefingCard key={p.title} project={p} idx={p.idx} />
        ))}
      </div>

      {oss.length > 0 && (
        <>
          <h3 className="projects__group-title">Open Source · Public Code</h3>
          <div className="projects__grid">
            {oss.map((p) => (
              <BriefingCard key={p.title} project={p} idx={p.idx} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

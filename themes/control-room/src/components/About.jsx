import { personal, bio, highlights } from '@shared/data.js';
import { Starburst, OrbitalFrame } from './Decorations.jsx';
import portraitSrc from '@shared/assets/portrait.jpg';

/**
 * About — "Meet the Engineer".  Atomic-orbital frame around the
 * portrait illustration, starburst "EST." badge in the corner,
 * and highlight stats rendered as Googie color-blocked diner panels.
 *
 * Requirements: R2.
 */
export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <header className="section-head">
        <span className="coord">Sector 02 · The Engineer</span>
        <h2 id="about-heading" className="section-head__title">
          <Starburst size={32} color="var(--coral)" centerColor="var(--gold)" className="section-head__title-burst" />
          Meet the Engineer
        </h2>
        <p className="section-head__sub">A short dispatch from the man at the console</p>
      </header>

      <div className="panel panel--bezel">
        <div className="panel__inner">
          <div className="about__grid">
            <aside className="id-badge" aria-label="Engineer profile">
              <div className="id-badge__portrait-wrap">
                <OrbitalFrame
                  size={300}
                  className="id-badge__orbital"
                  electronColor="var(--coral)"
                />
                <div className="id-badge__portrait">
                  <img
                    src={portraitSrc}
                    alt={`Atomic-age illustrated portrait of ${personal.name}`}
                    className="id-badge__photo"
                    loading="eager"
                    width="800"
                    height="600"
                  />
                </div>
              </div>

              <div className="id-badge__caption-row">
                <div className="id-badge__caption">
                  <span>Name</span>
                  <strong>{personal.name}</strong>
                </div>
                <div className="id-badge__caption">
                  <span>Post</span>
                  <strong>{personal.title}</strong>
                </div>
                <div className="id-badge__caption">
                  <span>Station</span>
                  <strong>{personal.location}</strong>
                </div>
              </div>
            </aside>

            <div className="about__bio">
              {bio.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <ul className="punch-cards" aria-label="Headline highlights">
                {highlights.map((h) => (
                  <li className="punch-card" key={h.label}>
                    <span className="punch-card__label">{h.label}</span>
                    <span className="punch-card__value">{h.value}</span>
                    <span className="punch-card__caption">{h.caption}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

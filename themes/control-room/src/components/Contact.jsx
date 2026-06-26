import { social } from '@shared/data.js';
import { Starburst } from './Decorations.jsx';

/**
 * Decorative "frequency" reading — derived from the handle so it's
 * stable per-channel.  Purely visual, not a real frequency.
 */
function frequencyFor(label) {
  const seed = [...label].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const mhz = 88 + (seed % 200) / 10;
  return `${mhz.toFixed(1)} MHz`;
}

/**
 * Contact — atomic-themed Telstar control card.  LinkedIn and GitHub
 * appear as labeled dials with an orbital atom motif (chrome ring,
 * dashed orbit, electron dot, brass core).  No email or phone.  Every
 * link opens in a new tab with rel="noopener noreferrer".
 *
 * Requirements: R5, R8.
 */
export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <header className="section-head">
        <span className="coord">Sector 06 · Comms</span>
        <h2 id="contact-heading" className="section-head__title">
          <Starburst size={32} color="var(--gold)" centerColor="var(--coral)" className="section-head__title-burst" />
          Open Channel
        </h2>
        <p className="section-head__sub">
          Reach the engineer via LinkedIn. No other channels in service.
        </p>
      </header>

      <div className="panel panel--bezel">
        <div className="panel__inner">
          <div className="intercom">
            <div
              className="intercom__speaker"
              role="img"
              aria-label="Telstar contact card"
            >
              <Starburst
                size={120}
                color="currentColor"
                className="intercom__speaker-burst"
              />
              <span className="intercom__speaker-label">All-Points Bulletin</span>
              <p className="intercom__speaker-text">
                <strong>Hello, friend.</strong> Reach me on LinkedIn for
                inbound transmissions.
              </p>
              <span className="intercom__no-channels">
                No Email · No Phone · Reach Out via LinkedIn
              </span>
            </div>

            <div className="dials" aria-label="Contact channels">
              {social.map((s) => (
                <a
                  key={s.label}
                  className="dial"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label}, opens in new tab`}
                >
                  <span className="dial__knob" aria-hidden="true">
                    <span className="dial__knob-orbit" />
                    <span className="dial__knob-ring" />
                    <span className="dial__knob-core" />
                  </span>
                  <span className="dial__freq">{frequencyFor(s.label)}</span>
                  <span className="dial__label">{s.label}</span>
                  <span className="dial__handle">{s.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

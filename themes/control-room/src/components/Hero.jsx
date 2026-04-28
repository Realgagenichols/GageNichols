import { useEffect, useState } from 'react';
import { personal, bio } from '@shared/data.js';
import { useTypewriter } from '@shared/hooks/useTypewriter.js';
import { SmoothLink } from '@shared/components/SmoothScroll.jsx';
import { AtomLogo } from './AtomLogo.jsx';
import { Starburst } from './Decorations.jsx';

/**
 * Format a Date as a 1962 mission-control time tape: "27 APR 1962 // 14:22:08".
 * Kept tasteful — chrome digital clock vibe, not a tactical countdown.
 */
function formatStamp(date) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = months[date.getMonth()];
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${dd} ${mm} ${yyyy} · ${hh}:${mi}:${ss}`;
}

/**
 * Hero — Tomorrowland command booth: a Googie panel with two-tone color
 * blocking, the animated atom logo as the centerpiece, and a coral pill
 * CTA.  CTA scrolls to projects per R1.
 */
export function Hero() {
  const { display: tagline, done } = useTypewriter(personal.tagline, {
    speed: 38,
    startDelay: 280,
  });
  const [stamp, setStamp] = useState(() => formatStamp(new Date()));

  useEffect(() => {
    const id = setInterval(() => setStamp(formatStamp(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="hero"
      aria-labelledby="hero-name"
    >
      <div className="panel panel--bezel panel--two-tone hero__monitor">
        <div className="panel__inner">
          <div className="hero__screen">
            <div className="hero__copy">
              <div className="hero__topbar">
                <span className="hero__topbar-cell">
                  <strong>STATION</strong> · {personal.location}
                </span>
                <span className="hero__topbar-cell">
                  <strong>{stamp}</strong>
                </span>
              </div>

              <div className="hero__title">// Now on duty</div>

              <h1 id="hero-name" className="hero__name">
                <span className="hero__name-script">Hello, I'm</span>
                {personal.name}
              </h1>

              <div className="hero__title">{personal.title}</div>

              <p className="hero__tagline" aria-live="polite">
                {tagline}
                {!done && <span className="hero__cursor" aria-hidden="true" />}
              </p>

              <div className="hero__readout">
                <span>
                  <span className="hero__readout-bullet">*</span>
                  Mission: <strong>{bio[0].split('.')[0]}.</strong>
                </span>
                <span>
                  <span className="hero__readout-bullet">*</span>
                  Status: <strong>Operational</strong>
                </span>
              </div>

              <div className="hero__cta-row">
                <SmoothLink
                  to="projects"
                  className="cta-engage"
                  aria-label="Explore featured innovations"
                >
                  <Starburst size={18} color="#fff5d4" className="cta-engage__burst" />
                  Explore the Files
                </SmoothLink>
                <SmoothLink to="about" className="cta-secondary">
                  Meet the Engineer
                </SmoothLink>
                <SmoothLink to="contact" className="cta-secondary">
                  Open Channel
                </SmoothLink>
              </div>
            </div>

            <div className="hero__visual" aria-hidden="true">
              <AtomLogo size={240} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

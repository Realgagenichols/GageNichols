import { experience } from '@shared/data.js';
import { Starburst, Sputnik } from './Decorations.jsx';

function formatDate(value) {
  if (!value) return '';
  if (value === 'Present') return 'PRESENT';
  // expect YYYY-MM
  const [yyyy, mm] = value.split('-');
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const idx = Math.max(0, Math.min(11, parseInt(mm, 10) - 1));
  return `${months[idx]} ${yyyy}`;
}

/**
 * Experience section — vertical "status board" timeline.  Each role is
 * a station on the panel, with a phosphor lamp (lit for current role,
 * dimmed for past), digital readout dates, key metrics, and parallel
 * leadership / delivery columns.
 *
 * Requirements: R3 (company, role, dates, metrics).
 */
export function Experience() {
  return (
    <section id="experience" className="experience" aria-labelledby="experience-heading">
      <header className="section-head">
        <span className="coord">Sector 04 · Flight Log</span>
        <h2 id="experience-heading" className="section-head__title">
          <Starburst size={32} color="var(--turquoise)" centerColor="var(--gold)" className="section-head__title-burst" />
          Mission Timeline
        </h2>
        <p className="section-head__sub">Career history, most recent first</p>
      </header>

      <ol className="timeline" aria-label="Experience timeline">
        {experience.map((role, idx) => {
          const isCurrent = role.end === 'Present';
          return (
            <li
              key={`${role.company}-${role.start}`}
              className={`role ${isCurrent ? 'role--current' : 'role--past'}`}
            >
              <span className="role__lamp" aria-hidden="true" />
              <div className="role__card">
                <header className="role__header">
                  <div className="role__title-block">
                    <span className="role__company">{role.company}</span>
                    <span className="role__role">{role.role}</span>
                  </div>
                  <span className="role__dates">
                    {formatDate(role.start)} – {formatDate(role.end)}
                  </span>
                </header>

                {role.metrics && role.metrics.length > 0 && (
                  <ul
                    className="role__metrics"
                    aria-label={`Key metrics for ${role.company}`}
                  >
                    {role.metrics.map((m) => (
                      <li className="role__metric" key={`${role.company}-${m.label}`}>
                        <span className="role__metric-value">{m.value}</span>
                        <span className="role__metric-label">{m.label}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="role__columns">
                  {role.leadership && role.leadership.length > 0 && (
                    <div>
                      <h4 className="role__col-head">
                        <Sputnik size={16} color="currentColor" />
                        Leadership · Strategy
                      </h4>
                      <ul className="role__list">
                        {role.leadership.map((item, i) => (
                          <li key={`l-${idx}-${i}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {role.delivery && role.delivery.length > 0 && (
                    <div>
                      <h4 className="role__col-head">
                        <Sputnik size={16} color="currentColor" />
                        Delivery · Execution
                      </h4>
                      <ul className="role__list">
                        {role.delivery.map((item, i) => (
                          <li key={`d-${idx}-${i}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

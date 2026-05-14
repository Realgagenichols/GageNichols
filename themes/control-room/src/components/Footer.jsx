import { personal } from '@shared/data.js';
import { Starburst } from './Decorations.jsx';

/**
 * Footer — atomic-age sign-off with a starburst flourish at top.
 * No PII (R8).
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__burst" aria-hidden="true">
        <span className="footer__burst-inner">
          <Starburst size={28} color="var(--gold)" centerColor="var(--coral)" />
        </span>
      </div>
      <span className="footer__line">
        <span className="footer__line-script">End of transmission</span> ·{' '}
        <strong>{personal.name}</strong>
      </span>
      <span className="footer__line">
        Atomic Control Room · Build <strong>{year}.A</strong>
      </span>
      <span className="footer__line">
        Signal terminates at this console. No further channels in service.
      </span>
    </footer>
  );
}

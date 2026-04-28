import { useCallback } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

/**
 * A smooth-scrolling anchor link. Falls back to instant scroll when
 * the user has requested reduced motion.
 *
 * Usage: <SmoothLink to="projects">View Projects</SmoothLink>
 */
export function SmoothLink({ to, children, className, onActivate, ...rest }) {
  const reduced = usePrefersReducedMotion();

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      const el = document.getElementById(to);
      if (!el) return;
      el.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'start',
      });
      // Update URL hash without triggering another jump
      if (typeof history !== 'undefined' && history.replaceState) {
        history.replaceState(null, '', `#${to}`);
      }
      if (onActivate) onActivate(to);
    },
    [to, reduced, onActivate],
  );

  return (
    <a href={`#${to}`} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

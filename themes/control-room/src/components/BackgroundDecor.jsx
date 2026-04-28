import { useThemeToggle } from '@shared/hooks/useThemeToggle.js';
import { usePrefersReducedMotion } from '@shared/hooks/usePrefersReducedMotion.js';

/**
 * Full-viewport background flourish.  Replaces the old CRT overlay.
 *
 * Dark mode: a subtle starfield of pinpoint stars on the deep
 * midnight-blue background, with a very gentle parallax twinkle
 * (disabled under prefers-reduced-motion).
 *
 * Light mode: a faint tile of low-opacity starbursts evoking a 1955
 * magazine spread, no animation.
 *
 * Pointer-events: none so it never intercepts clicks.  z-index is
 * negative so it sits below all content but above the body
 * background gradient.
 *
 * S1: respects prefers-reduced-motion by suppressing twinkle.
 */
export function BackgroundDecor() {
  const { mode } = useThemeToggle();
  const reduced = usePrefersReducedMotion();

  if (mode === 'light') {
    return <div className="bg-decor bg-decor--googie" aria-hidden="true" />;
  }
  return (
    <div
      className={`bg-decor bg-decor--starfield${reduced ? '' : ' bg-decor--twinkle'}`}
      aria-hidden="true"
    />
  );
}

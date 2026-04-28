import { usePrefersReducedMotion } from '@shared/hooks/usePrefersReducedMotion.js';

/**
 * Animated atom — a glowing nucleus with three tilted elliptical
 * orbits, each carrying an electron dot.  The orbits rotate slowly
 * (15s per revolution).  Honors prefers-reduced-motion by freezing
 * the rotation.
 *
 * Uses CSS variables defined in globals.css so the colors track the
 * active theme:
 *   --atom-orbit  : orbital ring color
 *   --atom-nucleus: nucleus core color
 *   --atom-electron: electron dot color
 *
 * Set `size` to adjust width/height (square).  `title` exposes a
 * label to assistive tech; omit for purely decorative usage.
 */
export function AtomLogo({ size = 240, title, className, style }) {
  const reduced = usePrefersReducedMotion();
  const labelProps = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true };

  const animClass = reduced ? '' : 'atom--spin';

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`atom ${className || ''}`.trim()}
      style={style}
      {...labelProps}
    >
      <defs>
        <radialGradient id="atom-nucleus-grad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="var(--atom-nucleus-hi, #fde68a)" />
          <stop offset="55%" stopColor="var(--atom-nucleus, #fbbf24)" />
          <stop offset="100%" stopColor="var(--atom-nucleus-lo, #b45309)" />
        </radialGradient>
        <filter id="atom-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Three tilted orbital ellipses + electrons.  Each orbit group
          rotates around the center; each electron is parked at the
          right edge of the ellipse and rides along as the group spins. */}
      <g transform="translate(100 100)" fill="none" stroke="var(--atom-orbit, #22d3ee)" strokeWidth="1.5">
        <g className={`atom__orbit atom__orbit--1 ${animClass}`}>
          <ellipse rx="84" ry="32" />
          <circle cx="84" cy="0" r="6" fill="var(--atom-electron, #f472b6)" stroke="none" filter="url(#atom-glow)" />
        </g>
        <g className={`atom__orbit atom__orbit--2 ${animClass}`} transform="rotate(60)">
          <ellipse rx="84" ry="32" />
          <circle cx="84" cy="0" r="5.5" fill="var(--atom-electron-2, #ff6b6b)" stroke="none" filter="url(#atom-glow)" />
        </g>
        <g className={`atom__orbit atom__orbit--3 ${animClass}`} transform="rotate(-60)">
          <ellipse rx="84" ry="32" />
          <circle cx="84" cy="0" r="5.5" fill="var(--atom-electron-3, #fbbf24)" stroke="none" filter="url(#atom-glow)" />
        </g>
      </g>

      {/* Nucleus */}
      <circle cx="100" cy="100" r="14" fill="url(#atom-nucleus-grad)" filter="url(#atom-glow)" />
      <circle cx="100" cy="100" r="14" fill="none" stroke="var(--atom-nucleus-ring, rgba(255,255,255,0.55))" strokeWidth="1" />
    </svg>
  );
}

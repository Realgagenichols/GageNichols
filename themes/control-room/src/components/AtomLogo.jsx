import { usePrefersReducedMotion } from '@shared/hooks/usePrefersReducedMotion.js';

/**
 * The orbit ellipse as a closed path, traced clockwise from the right vertex.
 * Two semi-elliptical arcs, because a single arc command cannot close a full
 * ellipse (its start and end points would coincide, leaving the arc undefined).
 *
 * Geometry MUST match the <ellipse rx ry> below, or the electrons drift off
 * their rings.  ORBIT_RX / ORBIT_RY are the single source of truth for both.
 */
const ORBIT_RX = 84;
const ORBIT_RY = 32;
const ORBIT_PATH =
  `M ${ORBIT_RX},0 ` +
  `A ${ORBIT_RX},${ORBIT_RY} 0 0,1 ${-ORBIT_RX},0 ` +
  `A ${ORBIT_RX},${ORBIT_RY} 0 0,1 ${ORBIT_RX},0`;

/**
 * The three orbital planes.  `tilt` fixes the plane; `dur` sets one full
 * revolution; `begin` is negative so each electron starts partway around
 * (SMIL treats a negative begin as "already running"), keeping the three
 * dots out of phase.  `reverse` sends one electron the other way round.
 *
 * Durations are deliberately non-multiples so the dots drift in and out of
 * alignment rather than locking into a repeating pattern.
 */
const ORBITS = [
  { tilt: 0, r: 6, dur: '9s', begin: '0s', color: 'var(--atom-electron, #f472b6)' },
  { tilt: 60, r: 5.5, dur: '11s', begin: '-4s', reverse: true, color: 'var(--atom-electron-2, #ff6b6b)' },
  { tilt: -60, r: 5.5, dur: '13s', begin: '-7.5s', color: 'var(--atom-electron-3, #fbbf24)' },
];

/**
 * Animated atom: a glowing nucleus with three tilted elliptical orbits,
 * each carrying an electron that travels ALONG its ring.
 *
 * The orbital planes are static, as an atom's are: only the electrons move.
 * (An earlier version rotated each ring about the centre with its electron
 * pinned to the ring's vertex, which meant the dot swept a circle of radius
 * rx rather than the ellipse, and the ring itself appeared to tumble.)
 *
 * Motion uses SVG <animateMotion> rather than CSS `offset-path`: the path is
 * resolved in the element's own user space, so it composes predictably with
 * the ancestor translate/rotate transforms that establish each orbital plane.
 *
 * Honors prefers-reduced-motion by omitting the motion elements entirely,
 * which leaves a still atom with its electrons parked at their vertices.
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

      {/* Three fixed orbital planes.  Each electron rides its own ellipse. */}
      <g transform="translate(100 100)" fill="none" stroke="var(--atom-orbit, #22d3ee)" strokeWidth="1.5">
        {ORBITS.map((o, i) => (
          <g
            key={o.tilt}
            className={`atom__orbit atom__orbit--${i + 1}`}
            transform={o.tilt ? `rotate(${o.tilt})` : undefined}
          >
            <ellipse rx={ORBIT_RX} ry={ORBIT_RY} />
            {/* cx/cy stay at the origin: <animateMotion> supplies the position,
                and a non-zero centre would offset the dot from the path. */}
            <circle
              className="atom__electron"
              r={o.r}
              fill={o.color}
              stroke="none"
              filter="url(#atom-glow)"
              // Parked at the vertex when motion is suppressed, so a still
              // atom still shows its electrons sitting on their rings.
              transform={reduced ? `translate(${ORBIT_RX} 0)` : undefined}
            >
              {!reduced && (
                <animateMotion
                  dur={o.dur}
                  begin={o.begin}
                  repeatCount="indefinite"
                  path={ORBIT_PATH}
                  calcMode="linear"
                  {...(o.reverse ? { keyPoints: '1;0', keyTimes: '0;1' } : {})}
                />
              )}
            </circle>
          </g>
        ))}
      </g>

      {/* Nucleus */}
      <circle cx="100" cy="100" r="14" fill="url(#atom-nucleus-grad)" filter="url(#atom-glow)" />
      <circle cx="100" cy="100" r="14" fill="none" stroke="var(--atom-nucleus-ring, rgba(255,255,255,0.55))" strokeWidth="1" />
    </svg>
  );
}

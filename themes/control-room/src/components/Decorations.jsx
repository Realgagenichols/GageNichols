/**
 * Googie / atomic-age decorative SVG primitives.  Each is a small
 * presentational component — no behavior, no data dependencies.  They
 * accept `size` and color props so callers can theme them inline using
 * CSS variables (e.g. `color="var(--accent-coral)"`).
 *
 * All shapes are aria-hidden by default.  Pass `title` to expose them
 * to assistive tech.
 */

/**
 * 8-point starburst (sputnik / atomic asterisk).
 * Used as section dividers, list bullets, and corner accents.
 */
export function Starburst({
  size = 24,
  color = 'currentColor',
  centerColor,
  title,
  className,
  style,
}) {
  const labelProps = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true };

  // 8 rays at 45deg intervals, 2 long axes + 2 short cross axes for variety
  const rays = [];
  const longLen = 28;
  const shortLen = 18;
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const len = i % 2 === 0 ? longLen : shortLen;
    const w = i % 2 === 0 ? 2.4 : 1.6;
    const x2 = 32 + Math.cos(angle) * len;
    const y2 = 32 + Math.sin(angle) * len;
    rays.push(
      <line
        key={i}
        x1="32"
        y1="32"
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={w}
        strokeLinecap="round"
      />,
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      style={style}
      {...labelProps}
    >
      {rays}
      {centerColor && <circle cx="32" cy="32" r="3.2" fill={centerColor} />}
    </svg>
  );
}

/**
 * Boomerang shape — Saul Bass / formica-counter parallelogram with a
 * curved spine.  Two-tone color blocking via `color` (primary fill) and
 * `accent` (overlay triangle).
 */
export function Boomerang({
  size = 80,
  color = 'currentColor',
  accent,
  title,
  className,
  style,
}) {
  const labelProps = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true };

  return (
    <svg
      viewBox="0 0 120 60"
      width={size}
      height={size * (60 / 120)}
      className={className}
      style={style}
      {...labelProps}
    >
      <path
        d="M6 46 Q 30 6 60 22 Q 90 38 114 14 L 110 30 Q 90 54 60 38 Q 30 22 10 56 Z"
        fill={color}
      />
      {accent && (
        <path
          d="M60 22 Q 90 38 114 14 L 110 30 Q 90 54 60 38 Z"
          fill={accent}
          opacity="0.85"
        />
      )}
    </svg>
  );
}

/**
 * Sputnik / satellite icon — small body with four antennas and a
 * highlight dot.  Tiny enough to use as a list bullet.
 */
export function Sputnik({
  size = 20,
  color = 'currentColor',
  highlight,
  title,
  className,
  style,
}) {
  const labelProps = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true };

  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      style={style}
      {...labelProps}
    >
      {/* antennas */}
      <line x1="20" y1="20" x2="4" y2="6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="20" x2="36" y2="6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="20" x2="4" y2="34" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="20" x2="36" y2="34" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* tips */}
      <circle cx="4" cy="6" r="1.6" fill={color} />
      <circle cx="36" cy="6" r="1.6" fill={color} />
      <circle cx="4" cy="34" r="1.6" fill={color} />
      <circle cx="36" cy="34" r="1.6" fill={color} />
      {/* body */}
      <circle cx="20" cy="20" r="6" fill={color} />
      {highlight && <circle cx="18" cy="18" r="1.8" fill={highlight} />}
    </svg>
  );
}

/**
 * Thin parabolic arc — Googie roofline.  Used between sections or as
 * a framing flourish.  `flip` mirrors vertically.
 */
export function ParabolicArc({
  width = 320,
  color = 'currentColor',
  thickness = 2,
  flip = false,
  title,
  className,
  style,
}) {
  const labelProps = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true };

  const d = flip ? 'M 4 6 Q 160 56 316 6' : 'M 4 54 Q 160 4 316 54';
  return (
    <svg
      viewBox="0 0 320 60"
      width={width}
      height={width * (60 / 320)}
      className={className}
      style={style}
      preserveAspectRatio="none"
      {...labelProps}
    >
      <path
        d={d}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Atomic-orbital frame — three tilted ellipses around a focal area
 * (a portrait, a card, etc.).  Decorative; the consumer places content
 * inside an absolutely positioned container.  `electrons` adds small
 * dots along each orbit.
 */
export function OrbitalFrame({
  size = 280,
  color = 'currentColor',
  electronColor,
  electrons = true,
  title,
  className,
  style,
}) {
  const labelProps = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true };

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={style}
      {...labelProps}
    >
      {/* Orbits and electrons share the same translate(100 100) origin.  Each
          electron sits at a tilted orbit's own vertex (cx = ±rx, cy = 0) inside
          a matching rotate() group, so it always lands exactly on the ring.
          Opposite vertices are used to spread the three dots symmetrically. */}
      <g transform="translate(100 100)">
        <g fill="none" stroke={color} strokeWidth="1.4">
          <ellipse rx="92" ry="36" />
          <ellipse rx="92" ry="36" transform="rotate(60)" />
          <ellipse rx="92" ry="36" transform="rotate(-60)" />
        </g>
        {electrons && (
          <g fill={electronColor || color}>
            <circle cx="92" cy="0" r="4" />
            <g transform="rotate(60)">
              <circle cx="-92" cy="0" r="3.2" />
            </g>
            <g transform="rotate(-60)">
              <circle cx="-92" cy="0" r="3.2" />
            </g>
          </g>
        )}
      </g>
    </svg>
  );
}

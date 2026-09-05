/**
 * R1 / S1 — the hero atom.
 *
 * The accuracy property: each electron travels ALONG its own orbital ellipse.
 * The bug this guards against is the original implementation, which rotated the
 * whole orbit group with the electron pinned at the ring's vertex (cx = rx).
 * That swept the dot around a CIRCLE of radius rx while the ring itself tumbled.
 * Asserting the motion path's radii against the ellipse's own rx/ry catches it:
 * a circular sweep has ry === rx, and a pinned electron has no motion path at all.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { AtomLogo } from '../components/AtomLogo.jsx';

/** Pull the two arc radii out of a path like "M 84,0 A 84,32 0 0,1 -84,0 …". */
function arcRadiiFrom(path) {
  const arcs = [...path.matchAll(/A\s*(-?[\d.]+),(-?[\d.]+)/g)];
  return arcs.map(([, rx, ry]) => [Number(rx), Number(ry)]);
}

function orbitsOf(container) {
  return [...container.querySelectorAll('.atom__orbit')].map((g) => ({
    group: g,
    ellipse: g.querySelector('ellipse'),
    electron: g.querySelector('.atom__electron'),
    motion: g.querySelector('animateMotion'),
  }));
}

describe('AtomLogo orbital motion', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('renders three orbits, each with its own ellipse and electron', () => {
    const { container } = render(<AtomLogo />);
    const orbits = orbitsOf(container);
    expect(orbits).toHaveLength(3);
    for (const o of orbits) {
      expect(o.ellipse, 'orbit has a ring').toBeTruthy();
      expect(o.electron, 'orbit has an electron').toBeTruthy();
    }
  });

  it('sends every electron along its own ellipse, not around a circle', () => {
    const { container } = render(<AtomLogo />);
    const orbits = orbitsOf(container);

    for (const { ellipse, motion } of orbits) {
      expect(motion, 'electron is animated along a path').toBeTruthy();

      const rx = Number(ellipse.getAttribute('rx'));
      const ry = Number(ellipse.getAttribute('ry'));
      // Guard against a degenerate ring making the comparison below vacuous:
      // if rx === ry the ellipse IS a circle and the assertion proves nothing.
      expect(rx, 'ring is a genuine ellipse, so the test can discriminate').not.toBe(ry);

      const radii = arcRadiiFrom(motion.getAttribute('path'));
      expect(radii.length, 'closed ellipse takes two arcs').toBe(2);
      for (const [prx, pry] of radii) {
        expect(prx, 'motion path radius matches the ring').toBe(rx);
        expect(pry, 'motion path radius matches the ring').toBe(ry);
      }
    }
  });

  it('parks the electrons on their rings and stops the motion under prefers-reduced-motion', () => {
    vi.stubGlobal('matchMedia', (query) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { container } = render(<AtomLogo />);
    const orbits = orbitsOf(container);
    expect(orbits).toHaveLength(3);
    for (const { ellipse, electron, motion } of orbits) {
      expect(motion, 'no motion element when reduced motion is requested').toBeNull();
      // Still on the ring: parked at the ellipse's own vertex.
      expect(electron.getAttribute('transform')).toBe(
        `translate(${ellipse.getAttribute('rx')} 0)`,
      );
    }
  });

  it('keeps the orbital planes distinct and static', () => {
    const { container } = render(<AtomLogo />);
    const tilts = orbitsOf(container).map(({ group }) => group.getAttribute('transform') ?? 'none');
    // Three separate planes, no two sharing an angle.
    expect(new Set(tilts).size).toBe(3);
    // The rings themselves must carry no animation — only the electrons move.
    expect(container.querySelectorAll('.atom__orbit > animate, .atom__orbit > animateTransform'))
      .toHaveLength(0);
  });
});

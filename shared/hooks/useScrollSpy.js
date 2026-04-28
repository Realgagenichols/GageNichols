import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in the viewport based on scroll position.
 * Used to highlight the active nav link.
 *
 * @param {string[]} sectionIds - DOM ids of the sections to observe (in document order)
 * @param {Object} [options]
 * @param {number} [options.offset=80] - Pixels from the top of the viewport that count as "active"
 * @returns {string|null} The id of the currently-active section
 */
export function useScrollSpy(sectionIds, { offset = 80 } = {}) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handler = () => {
      const scrollY = window.scrollY + offset;
      let current = sectionIds[0] ?? null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [sectionIds, offset]);

  return activeId;
}

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js';

/**
 * Progressively reveals characters of a string at a configurable speed.
 * If the user prefers reduced motion, the full text is shown immediately.
 *
 * @param {string} text - The full text to reveal
 * @param {Object} [options]
 * @param {number} [options.speed=45] - Milliseconds per character
 * @param {number} [options.startDelay=0] - Milliseconds before starting
 * @param {boolean} [options.start=true] - When false, no characters are revealed
 * @returns {{ display: string, done: boolean }}
 */
export function useTypewriter(text, { speed = 45, startDelay = 0, start = true } = {}) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduced ? text : '');
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      setDone(true);
      return;
    }
    if (!start) {
      setDisplay('');
      setDone(false);
      return;
    }

    let cancelled = false;
    let i = 0;
    setDisplay('');
    setDone(false);

    const startTimer = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          setDone(true);
          return;
        }
        timer = setTimeout(tick, speed);
      };
      let timer = setTimeout(tick, speed);
      cleanup = () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }, startDelay);

    let cleanup = () => {
      cancelled = true;
      clearTimeout(startTimer);
    };

    return () => cleanup();
  }, [text, speed, startDelay, start, reduced]);

  return { display, done };
}

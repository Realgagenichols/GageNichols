import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver wrapper for scroll-triggered animations.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.2] - Visibility ratio that triggers inView=true
 * @param {string} [options.rootMargin='0px']
 * @param {boolean} [options.once=true] - If true, stops observing after first intersection
 * @returns {{ ref: React.RefObject, inView: boolean }}
 */
export function useInView({ threshold = 0.2, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    const node = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

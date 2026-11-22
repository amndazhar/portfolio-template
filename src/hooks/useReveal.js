/* Springy Portfolio · original template by amndazhar · https://github.com/amndazhar/portfolio-template · MIT */
import { useEffect, useRef, useState } from 'react';
import { SPRINGS, prefersReducedMotion } from '../utils/spring.js';

/**
 * Reveals an element the first time it scrolls into view.
 *
 * The motion runs through the Web Animations API on `opacity` + the individual
 * `translate` property, so it never fights a component's own `transform` or
 * `transition` (hover lifts, tilts, etc. keep working untouched).
 * `delay` (ms) staggers siblings. Reduced motion gets a short cross-fade.
 */
export default function useReveal({ threshold = 0.12, delay = 0 } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (prefersReducedMotion()) {
          element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'backwards' });
        } else {
          element.animate(
            [
              { opacity: 0, translate: '0 36px' },
              { opacity: 1, translate: '0 0' },
            ],
            { duration: SPRINGS.smooth.duration + 150, delay, easing: SPRINGS.smooth.easing, fill: 'backwards' },
          );
        }
        setVisible(true);
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible, threshold, delay]);

  return [ref, visible ? 'reveal in' : 'reveal'];
}

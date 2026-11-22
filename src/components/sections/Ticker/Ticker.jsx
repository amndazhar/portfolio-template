import { Fragment, useEffect, useRef } from 'react';
import { site } from '../../../content/site.js';
import { clamp, prefersReducedMotion } from '../../../utils/spring.js';
import './Ticker.css';

// Each half holds the phrases twice; two identical halves loop seamlessly.
const sequence = [...site.ticker, ...site.ticker];

const LOOP_SECONDS = 28;   // resting speed: one half per 28s
const SCROLL_BOOST = 0.35; // extra px/s of ticker per px/s of scroll
const MAX_SKEW = 6;        // deg — a hint of motion stretch at speed

/**
 * The strip drifts on its own and reacts to scrolling: it speeds up with
 * scroll velocity and follows the scroll direction. Speed is blended (never
 * hard-cut), so a reversal eases through zero instead of snapping.
 */
function useScrollReactiveMarquee(trackRef) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return undefined;

    let offset = 0;
    let speed = 0;
    let direction = 1;
    let lastTime = performance.now();
    let lastScroll = window.scrollY;
    let frame = 0;
    let onScreen = true;

    const loopLength = () => track.children[1]?.offsetLeft ?? track.scrollWidth / 2;

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 1 / 20);
      lastTime = now;
      const scrollVelocity = (window.scrollY - lastScroll) / Math.max(dt, 1 / 240);
      lastScroll = window.scrollY;
      if (Math.abs(scrollVelocity) > 20) direction = Math.sign(scrollVelocity);

      const length = loopLength();
      const base = length / LOOP_SECONDS;
      const target = direction * (base + Math.min(Math.abs(scrollVelocity) * SCROLL_BOOST, base * 12));
      speed += (target - speed) * Math.min(1, dt * 5);

      offset -= speed * dt;
      if (offset <= -length) offset += length;
      if (offset > 0) offset -= length;

      const extra = (Math.abs(speed) - base) / (base * 12);
      const skew = clamp(extra, 0, 1) * MAX_SKEW * -Math.sign(speed);
      track.style.transform = `translate3d(${offset}px,0,0) skewX(${skew.toFixed(2)}deg)`;

      if (onScreen) frame = requestAnimationFrame(tick);
    };

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) {
        lastTime = performance.now();
        lastScroll = window.scrollY;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(tick);
      }
    });
    visibility.observe(track.parentElement);

    return () => {
      visibility.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [trackRef]);
}

export default function Ticker() {
  const trackRef = useRef(null);
  useScrollReactiveMarquee(trackRef);

  return (
    <div className="scroll-strip">
      <div ref={trackRef} className="ticker">
        {[0, 1].map((copy) => (
          <span key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {sequence.map((phrase, index) => (
              <Fragment key={index}>
                {phrase} <i>✳</i>{' '}
              </Fragment>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

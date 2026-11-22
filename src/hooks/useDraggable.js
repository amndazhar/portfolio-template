/* Springy Portfolio · original template by amndazhar · https://github.com/amndazhar/portfolio-template · MIT */
import { useEffect, useRef } from 'react';
import { animateSpring, clamp, prefersReducedMotion, project, rubberbandClamp } from '../utils/spring.js';

const VELOCITY_WINDOW_MS = 100;

/**
 * Makes an absolutely positioned element throwable, inside its parent.
 *
 * - Tracks the pointer 1:1 from where it was grabbed (no snapping to centre).
 * - Rubber-bands past the parent's edges instead of hard-stopping.
 * - On release, projects the flick's momentum, picks a resting spot inside the
 *   bounds, and springs there carrying the finger's velocity (independent X/Y).
 * - Can be caught mid-flight: grabbing again starts from the live position.
 */
export default function useDraggable({ decelerationRate = 0.99 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    let drag = null;
    let springs = [];
    let position = null; // live {x, y} — the "presentation" value

    const apply = () => {
      element.style.left = `${position.x}px`;
      element.style.top = `${position.y}px`;
    };

    const bounds = () => {
      const parent = element.parentElement;
      return {
        maxX: Math.max(0, parent.clientWidth - element.offsetWidth),
        maxY: Math.max(0, parent.clientHeight - element.offsetHeight),
        width: parent.clientWidth,
        height: parent.clientHeight,
      };
    };

    const stopSprings = () => {
      springs.forEach((spring) => spring.stop());
      springs = [];
    };

    const onPointerDown = (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      stopSprings();
      if (!position) position = { x: element.offsetLeft, y: element.offsetTop };
      Object.assign(element.style, { position: 'absolute', right: 'auto', bottom: 'auto' });
      apply();

      drag = {
        startX: event.clientX,
        startY: event.clientY,
        originX: position.x,
        originY: position.y,
        history: [{ t: event.timeStamp, x: event.clientX, y: event.clientY }],
      };
      element.classList.add('dragging');
      element.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!drag) return;
      const b = bounds();
      position = {
        x: rubberbandClamp(drag.originX + event.clientX - drag.startX, 0, b.maxX, b.width),
        y: rubberbandClamp(drag.originY + event.clientY - drag.startY, 0, b.maxY, b.height),
      };
      apply();
      drag.history.push({ t: event.timeStamp, x: event.clientX, y: event.clientY });
      while (drag.history.length > 2 && event.timeStamp - drag.history[0].t > VELOCITY_WINDOW_MS) drag.history.shift();
    };

    const releaseVelocity = (history) => {
      if (history.length < 2) return { vx: 0, vy: 0 };
      const first = history[0];
      const last = history[history.length - 1];
      const seconds = (last.t - first.t) / 1000;
      if (seconds < 0.01) return { vx: 0, vy: 0 };
      return { vx: (last.x - first.x) / seconds, vy: (last.y - first.y) / seconds };
    };

    const onPointerUp = () => {
      if (!drag) return;
      const { vx, vy } = releaseVelocity(drag.history);
      drag = null;
      element.classList.remove('dragging');

      const b = bounds();
      const target = {
        x: clamp(position.x + project(vx, decelerationRate), 0, b.maxX),
        y: clamp(position.y + project(vy, decelerationRate), 0, b.maxY),
      };

      if (prefersReducedMotion()) {
        position = target;
        apply();
        return;
      }

      // A flick earns a little bounce; a gentle release settles without overshoot.
      const flicked = Math.hypot(vx, vy) > 300;
      const config = { damping: flicked ? 0.78 : 1, response: 0.45 };
      springs = ['x', 'y'].map((axis) =>
        animateSpring({
          ...config,
          from: position[axis],
          to: target[axis],
          velocity: axis === 'x' ? vx : vy,
          onUpdate: (value) => {
            position = { ...position, [axis]: value };
            apply();
          },
        }),
      );
    };

    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('pointermove', onPointerMove);
    element.addEventListener('pointerup', onPointerUp);
    element.addEventListener('pointercancel', onPointerUp);

    return () => {
      stopSprings();
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerUp);
    };
  }, [decelerationRate]);

  return ref;
}

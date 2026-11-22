/**
 * Tiny spring toolkit (no dependencies).
 *
 * Springs are described the way Apple describes them:
 *   damping  — damping ratio. 1 = critically damped (no overshoot), <1 = bouncy.
 *   response — roughly how long (s) the value takes to get to the target.
 * Mass is 1, so stiffness = (2π / response)² and damping coefficient = 4πζ / response.
 */

const stiffnessOf = (response) => (2 * Math.PI / response) ** 2;
const dampingOf = (damping, response) => (4 * Math.PI * damping) / response;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Samples a 0→1 spring into a CSS `linear()` easing string + its natural duration,
 * so CSS transitions and the Web Animations API can use real spring curves.
 */
export function springEasing({ damping = 1, response = 0.5 } = {}) {
  const k = stiffnessOf(response);
  const c = dampingOf(damping, response);
  const dt = 1 / 240;
  const sampleEvery = 4; // one sample per 1/60s
  let x = 0;
  let v = 0;
  let t = 0;
  const points = [0];
  for (let step = 1; step < 240 * 3; step++) {
    const a = -k * (x - 1) - c * v;
    v += a * dt;
    x += v * dt;
    t += dt;
    if (step % sampleEvery === 0) points.push(Math.round(x * 1000) / 1000);
    if (Math.abs(x - 1) < 0.001 && Math.abs(v) < 0.01) break;
  }
  points.push(1);
  return { easing: `linear(${points.join(', ')})`, duration: Math.round(t * 1000) };
}

const supportsLinearEasing =
  typeof CSS !== 'undefined' && CSS.supports?.('transition-timing-function', 'linear(0, 1)');

const FALLBACK = 'cubic-bezier(.2, .8, .2, 1)';

/** House springs. Smooth for UI, bouncy only where the user's own motion preceded it. */
export const SPRINGS = {
  smooth: supportsLinearEasing ? springEasing({ damping: 1, response: 0.55 }) : { easing: FALLBACK, duration: 700 },
  snappy: supportsLinearEasing ? springEasing({ damping: 1, response: 0.35 }) : { easing: FALLBACK, duration: 450 },
  bouncy: supportsLinearEasing ? springEasing({ damping: 0.72, response: 0.45 }) : { easing: FALLBACK, duration: 700 },
};

/** Exposes the house springs to CSS as --spring-smooth / --spring-snappy / --spring-bouncy. */
export function installSpringVariables(root = document.documentElement) {
  if (!supportsLinearEasing) return;
  root.style.setProperty('--spring-smooth', SPRINGS.smooth.easing);
  root.style.setProperty('--spring-snappy', SPRINGS.snappy.easing);
  root.style.setProperty('--spring-bouncy', SPRINGS.bouncy.easing);
}

/**
 * Runs a velocity-aware, interruptible spring on one number.
 * Returns a handle — call stop() to interrupt; read value/velocity to hand off.
 */
export function animateSpring({ from, to, velocity = 0, damping = 1, response = 0.4, onUpdate, onComplete }) {
  const k = stiffnessOf(response);
  const c = dampingOf(damping, response);
  const state = { value: from, velocity, running: true };
  let last = performance.now();
  let frame = 0;

  const tick = (now) => {
    let elapsed = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    while (elapsed > 0) {
      const dt = Math.min(elapsed, 1 / 240);
      const a = -k * (state.value - to) - c * state.velocity;
      state.velocity += a * dt;
      state.value += state.velocity * dt;
      elapsed -= dt;
    }
    const settled = Math.abs(state.value - to) < 0.1 && Math.abs(state.velocity) < 5;
    if (settled) state.value = to;
    onUpdate(state.value);
    if (settled) {
      state.running = false;
      onComplete?.();
    } else {
      frame = requestAnimationFrame(tick);
    }
  };
  frame = requestAnimationFrame(tick);

  return {
    get value() { return state.value; },
    get velocity() { return state.velocity; },
    get running() { return state.running; },
    stop() {
      state.running = false;
      cancelAnimationFrame(frame);
    },
  };
}

/** Where a flick would come to rest (Apple's exponential-decay projection). */
export const project = (velocity, decelerationRate = 0.99) =>
  ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);

/** Progressive resistance past a boundary — the further you pull, the less it follows. */
export const rubberband = (overshoot, dimension, constant = 0.55) =>
  (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));

/** Applies rubber-banding to a value outside [min, max]. */
export function rubberbandClamp(value, min, max, dimension) {
  if (value < min) return min - rubberband(min - value, dimension);
  if (value > max) return max + rubberband(value - max, dimension);
  return value;
}

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

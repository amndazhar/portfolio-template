import { useEffect, useId, useRef, useState } from 'react';
import LabCard from '../LabCard.jsx';
import { clamp } from '../../../../utils/spring.js';
import { fill } from '../../../../utils/format.js';

const SVG_WIDTH = 500;
const CURVE_PATH =
  'M0 102 C35 100 40 30 80 44 S130 115 170 82 S210 18 250 32 S300 94 340 70 S400 22 430 44 S470 94 500 25';
const SAMPLE_COUNT = 400;

/** Samples the drawn path so the marker sits exactly on the curve. */
function buildLookup(path) {
  const total = path.getTotalLength();
  return Array.from({ length: SAMPLE_COUNT + 1 }, (_, i) => {
    const point = path.getPointAtLength((i / SAMPLE_COUNT) * total);
    return { x: point.x, y: point.y };
  });
}

function yAt(lookup, x) {
  let lo = 0;
  let hi = lookup.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (lookup[mid].x < x) lo = mid;
    else hi = mid;
  }
  const a = lookup[lo];
  const b = lookup[hi];
  const t = b.x === a.x ? 0 : (x - a.x) / (b.x - a.x);
  return a.y + (b.y - a.y) * t;
}

const INITIAL_TRACE = { position: 50, x: 250, y: 32 };

/**
 * Scrub the curve directly (pointer on the plot, 1:1) or with the slider /
 * keyboard. The traced part of the curve lights up as you go.
 */
/** Demo type "curve" — copy comes from src/content/playground.js. */
export default function CurveDemo({ delay, label, icon, title, description, controlLabel, output }) {
  const clipId = useId();
  const pathRef = useRef(null);
  const plotRef = useRef(null);
  const lookup = useRef(null);
  const [trace, setTrace] = useState(INITIAL_TRACE);
  const [scrubbing, setScrubbing] = useState(false);

  useEffect(() => {
    lookup.current = buildLookup(pathRef.current);
  }, []);

  const moveTo = (position) => {
    const x = (position / 100) * SVG_WIDTH;
    setTrace({ position, x, y: lookup.current ? yAt(lookup.current, x) : INITIAL_TRACE.y });
  };

  const positionFromPointer = (event) => {
    const rect = plotRef.current.getBoundingClientRect();
    return clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
  };

  const handlePointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    plotRef.current.setPointerCapture?.(event.pointerId);
    setScrubbing(true);
    moveTo(positionFromPointer(event));
  };
  const handlePointerMove = (event) => {
    if (scrubbing) moveTo(positionFromPointer(event));
  };
  const endScrub = () => setScrubbing(false);

  const shown = Math.round(trace.position);

  return (
    <LabCard delay={delay} label={label} icon={icon} title={title} description={description}>
      <div
        ref={plotRef}
        className={`curve-wrap${scrubbing ? ' is-scrubbing' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endScrub}
        onPointerCancel={endScrub}
      >
        <svg viewBox="0 0 500 130" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width={trace.x} height="130" />
            </clipPath>
          </defs>
          <g stroke="#56634e" strokeWidth="1">
            <path d="M0 25 H500 M0 50 H500 M0 75 H500 M0 100 H500 M100 0 V130 M200 0 V130 M300 0 V130 M400 0 V130" />
          </g>
          {/* untraced (dim) + traced (bright) */}
          <path ref={pathRef} d={CURVE_PATH} stroke="#d8f36a" strokeOpacity=".35" strokeWidth="3" fill="none" />
          <path d={CURVE_PATH} stroke="#d8f36a" strokeWidth="3" fill="none" clipPath={`url(#${clipId})`} />
          <line x1={trace.x} x2={trace.x} y1="0" y2="130" stroke="#ff7958" strokeWidth="2" strokeDasharray="5 4" />
          <circle className="curve-halo" cx={trace.x} cy={trace.y} r="11" fill="#ff7958" opacity=".22" />
          <circle cx={trace.x} cy={trace.y} r="5" fill="#ff7958" />
        </svg>
      </div>
      <div className="curve-controls">
        <span>{controlLabel}</span>
        <input
          type="range"
          min="0"
          max="100"
          step="any"
          value={trace.position}
          onChange={(event) => moveTo(Number(event.target.value))}
          aria-label={controlLabel.charAt(0) + controlLabel.slice(1).toLowerCase()}
          aria-valuetext={`${shown}%`}
        />
        <span>{`${shown}%`}</span>
      </div>
      <div className="demo-output">
        {fill(output, { x: Math.round(trace.x), y: Math.round(trace.y) })}
      </div>
    </LabCard>
  );
}

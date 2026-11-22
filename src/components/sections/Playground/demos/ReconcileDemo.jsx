import { useState } from 'react';
import LabCard from '../LabCard.jsx';
import { fill } from '../../../../utils/format.js';

const RACKS = [3, 2, 3]; // boxes per rack in the mini storeroom

export function reconcileMessage(received, expected, messages) {
  const values = { expected, received, diff: Math.abs(received - expected) };
  if (received === expected) return fill(messages.match, values);
  return fill(received < expected ? messages.short : messages.over, values);
}

/**
 * What the racks look like for a quantity: short leaves a dashed, pulsing gap;
 * over drops an extra box onto the middle rack.
 */
function rackContents(received, expected) {
  return RACKS.map((count, rack) => {
    const boxes = Array.from({ length: count }, () => 'stocked');
    if (received < expected && rack === 0) boxes[count - 1] = 'missing';
    if (received > expected && rack === 1) boxes.push('extra');
    return boxes;
  });
}

/** Demo type "reconcile" — copy and numbers come from src/content/playground.js. */
export default function ReconcileDemo({ delay, label, icon, title, description, expected, options, optionLabel, messages }) {
  const [received, setReceived] = useState(expected);
  const status = received === expected ? 'ok' : 'warning';

  return (
    <LabCard delay={delay} label={label} icon={icon} title={title} description={description}>
      <div className={`mini-shelves is-${status}`}>
        {rackContents(received, expected).map((boxes, rack) => (
          <div className="rack" key={rack}>
            {boxes.map((state, box) => (
              <i className={`boxitem is-${state}`} key={`${box}-${state}`} />
            ))}
          </div>
        ))}
      </div>
      <div className="demo-controls">
        {options.map((qty) => (
          <button
            key={qty}
            type="button"
            className={`demo-btn${qty === received ? ' active' : ''}`}
            aria-pressed={qty === received}
            onClick={() => setReceived(qty)}
          >
            {fill(optionLabel, { qty })}
          </button>
        ))}
      </div>
      <div className={`demo-output is-${status}`} aria-live="polite">
        <span key={received} className="demo-output-text">
          {reconcileMessage(received, expected, messages)}
        </span>
      </div>
    </LabCard>
  );
}

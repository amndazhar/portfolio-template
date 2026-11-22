import { Fragment, useState } from 'react';
import LabCard from '../LabCard.jsx';
import { padNumber } from '../../../../utils/format.js';

/** Steps already passed stay lit, so the pipeline shows progress, not just position. */
const stepState = (i, index) => (i === index ? ' active' : i < index ? ' is-done' : '');

/**
 * Demo type "pipeline" — step through `stages` ({ step, name, text }).
 * Copy comes from src/content/playground.js.
 */
export default function PipelineDemo({ delay, label, icon, title, description, stages, backLabel, nextLabel }) {
  const [index, setIndex] = useState(0);
  const last = stages.length - 1;
  const stage = stages[index];
  const atStart = index === 0;
  const atEnd = index === last;

  return (
    <LabCard delay={delay} label={label} icon={icon} title={title} description={description}>
      <div className="pipeline">
        {stages.map((item, i) => (
          <Fragment key={item.step}>
            {i > 0 && <i className={`pipe-arrow${i <= index ? ' is-done' : ''}`}>→</i>}
            <span className={`pipe-step${stepState(i, index)}`} onClick={() => setIndex(i)}>
              {item.step}
            </span>
          </Fragment>
        ))}
      </div>
      <div className="demo-controls">
        <button
          type="button"
          className="demo-btn"
          disabled={atStart}
          style={{ opacity: atStart ? '.4' : '1' }}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          {backLabel}
        </button>
        <button
          type="button"
          className="demo-btn active"
          disabled={atEnd}
          style={{ opacity: atEnd ? '.4' : '1' }}
          onClick={() => setIndex((i) => Math.min(last, i + 1))}
        >
          {nextLabel}
        </button>
      </div>
      <div className="demo-output" aria-live="polite">
        <span key={index} className="demo-output-text">
          {`${padNumber(index + 1)} / ${stage.name} · ${stage.text}`}
        </span>
      </div>
    </LabCard>
  );
}

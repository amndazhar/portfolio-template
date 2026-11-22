import { useEffect, useRef, useState } from 'react';
import Reveal from '../../common/Reveal.jsx';
import RichText from '../../common/RichText.jsx';
import { site } from '../../../content/site.js';
import { padNumber } from '../../../utils/format.js';
import { clamp } from '../../../utils/spring.js';
import './Process.css';

/** The reading line sits a little above the middle of the viewport. */
const READING_LINE = 0.55;

/**
 * Ties the steps to the scroll: a progress line fills as the list passes the
 * reading line, and the step currently on that line becomes "active".
 */
function useReadingProgress(listRef) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * READING_LINE;
      const rect = list.getBoundingClientRect();
      list.style.setProperty('--progress', clamp((line - rect.top) / rect.height, 0, 1).toFixed(4));
      const items = list.querySelectorAll('.process-item');
      let current = -1;
      items.forEach((item, index) => {
        if (item.getBoundingClientRect().top < line) current = index;
      });
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [listRef]);

  return active;
}

const { process: content } = site;
const processSteps = content.steps;

export default function Process() {
  const listRef = useRef(null);
  const active = useReadingProgress(listRef);

  return (
    <section className="section process" id="process">
      <div className="wrap process-grid">
        <Reveal className="process-sticky">
          <div className="mono section-kicker">{content.kicker}</div>
          <h2 className="section-title">
            <RichText text={content.title} />
          </h2>
          <p className="section-desc">{content.description}</p>
          <div className="process-counter mono" aria-hidden="true">
            <span className="process-counter-num">{padNumber(Math.max(active, 0) + 1)}</span> / {padNumber(processSteps.length)}
          </div>
        </Reveal>

        <div ref={listRef} className="process-list">
          {processSteps.map((step, index) => (
            <Reveal
              as="article"
              className={`process-item${index === active ? ' is-active' : ''}${index < active ? ' is-past' : ''}`}
              key={step.title}
              delay={index * 60}
            >
              <div className="process-num">{`${padNumber(index + 1)} ↘`}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="process-tag">{step.tag}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useLayoutEffect, useRef } from 'react';
import { projectFilters, projects } from '../../../content/projects.js';
import { fill, padNumber } from '../../../utils/format.js';

/**
 * Filter chips with a single ink pill that glides to the active chip
 * (one object moving, instead of two chips swapping colours).
 * Re-measures on resize/wrap; first placement is instant.
 */
export default function FilterBar({ value, onChange }) {
  const rowRef = useRef(null);
  const pillRef = useRef(null);
  const placed = useRef(false);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const pill = pillRef.current;

    const place = (animate) => {
      const active = row.querySelector('.filter.active');
      if (!active) return;
      pill.classList.toggle('is-instant', !animate);
      pill.style.width = `${active.offsetWidth}px`;
      pill.style.height = `${active.offsetHeight}px`;
      pill.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
    };

    place(placed.current);
    placed.current = true;

    const resize = new ResizeObserver(() => place(false));
    resize.observe(row);
    return () => resize.disconnect();
  }, [value]);

  return (
    <div ref={rowRef} className="filter-bar" role="group" aria-label="Filter projects">
      <span ref={pillRef} className="filter-pill" aria-hidden="true" />
      {projectFilters.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`filter${item.id === value ? ' active' : ''}`}
          aria-pressed={item.id === value}
          onClick={() => onChange(item.id)}
        >
          {fill(item.label, { count: padNumber(projects.length) })}
        </button>
      ))}
    </div>
  );
}

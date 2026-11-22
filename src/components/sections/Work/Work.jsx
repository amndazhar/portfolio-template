import { useLayoutEffect, useRef, useState } from 'react';
import Reveal from '../../common/Reveal.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import ProjectCard from './ProjectCard.jsx';
import FilterBar from './FilterBar.jsx';
import { projects } from '../../../content/projects.js';
import { site } from '../../../content/site.js';
import { SPRINGS, prefersReducedMotion } from '../../../utils/spring.js';
import './Work.css';

const STAGGER_MS = 70;
const { work: content } = site;

/** After a filter change, the cards that remain flow back in, one after another. */
function useFilterReflow(gridRef, filter) {
  const firstRun = useRef(true);
  useLayoutEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const cards = gridRef.current.querySelectorAll('.project-card:not(.hidden)');
    const reduced = prefersReducedMotion();
    cards.forEach((card, index) => {
      card.animate(
        reduced
          ? [{ opacity: 0 }, { opacity: 1 }]
          : [
              { opacity: 0, translate: '0 28px', scale: 0.97 },
              { opacity: 1, translate: '0 0', scale: 1 },
            ],
        {
          duration: reduced ? 200 : SPRINGS.smooth.duration,
          delay: reduced ? 0 : index * STAGGER_MS,
          easing: SPRINGS.smooth.easing,
          fill: 'backwards',
        },
      );
    });
  }, [gridRef, filter]);
}

export default function Work({ onOpenProject }) {
  const [filter, setFilter] = useState('all');
  const gridRef = useRef(null);
  useFilterReflow(gridRef, filter);

  const visibleProjects = projects.filter((project) => filter === 'all' || project.category === filter);

  return (
    <section className="section work-section" id="work">
      <div className="wrap">
        <SectionHeading kicker={content.kicker} title={content.title} description={content.description} />

        <Reveal className="filter-row">
          <FilterBar value={filter} onChange={setFilter} />
        </Reveal>

        {/* Cards stay mounted when filtered out (CSS `hidden`), so their reveal
            state is kept. Visible cards in the right-hand column sit lower,
            giving the grid an editorial, staggered rhythm. */}
        <div ref={gridRef} className="project-grid">
          {projects.map((project) => {
            const position = visibleProjects.indexOf(project);
            return (
              <ProjectCard
                key={project.id}
                project={project}
                hidden={position === -1}
                offset={position % 2 === 1}
                revealDelay={(position % 2) * 140}
                onOpen={onOpenProject}
              />
            );
          })}
        </div>

        {content.footnote && <div className="project-footnote">{content.footnote}</div>}
      </div>
    </section>
  );
}

import { useRef } from 'react';
import useReveal from '../../../hooks/useReveal.js';
import { relativePointer } from '../../../utils/pointer.js';
import { visuals } from '../../../content/visuals/index.jsx';

/** Picture tile: a screenshot (`project.image`, from /public) or an illustration (`project.visual`). */
function ProjectPicture({ project }) {
  if (project.image) {
    return (
      <img
        className="project-image"
        src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
        alt={project.imageAlt ?? ''}
        loading="lazy"
        draggable="false"
      />
    );
  }
  const Visual = visuals[project.visual];
  return Visual ? <Visual /> : null;
}

/** Max tilt in degrees — deliberately subtle: tactile, not game-like. */
const TILT = 2.2;

export default function ProjectCard({ project, hidden, offset, revealDelay = 0, onOpen }) {
  const [revealRef, revealClass] = useReveal({ delay: revealDelay });
  const visualRef = useRef(null);

  const open = () => onOpen(project.id, visualRef.current.getBoundingClientRect());

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    const { x, y } = relativePointer(event, event.currentTarget);
    visualRef.current.style.transform = `perspective(900px) rotateX(${y * -TILT}deg) rotateY(${x * TILT}deg)`;
  };
  const handlePointerLeave = () => {
    visualRef.current.style.transform = '';
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  };

  const classes = ['project-card', revealClass, hidden && 'hidden', offset && 'is-offset'].filter(Boolean).join(' ');

  return (
    <article
      ref={revealRef}
      className={classes}
      role="button"
      tabIndex={hidden ? -1 : 0}
      aria-label={`Open case study: ${project.title}`}
      onClick={open}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div ref={visualRef} className="project-visual" style={project.tile ? { background: project.tile } : undefined}>
        <span className="project-number">{project.number}</span>
        <span className="project-sticker" style={project.stickerColor ? { background: project.stickerColor } : undefined}>
          {project.sticker}
        </span>
        <ProjectPicture project={project} />
      </div>
      <div className="project-info">
        <div className="project-info-top">
          <span className="project-type">{project.type}</span>
          <span className="project-arrow">↗</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tech">
          {project.tech.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SPRINGS, prefersReducedMotion } from '../../../utils/spring.js';
import './ProjectModal.css';

const EXIT = { duration: 320, easing: 'cubic-bezier(.4, 0, .9, .6)' };

/**
 * Transform that places the dialog over the card it was opened from, so the
 * dialog can grow out of (and shrink back into) its source.
 */
function sourceTransform(modal, origin) {
  if (!origin) return 'translateY(24px) scale(.96)';
  const box = modal.getBoundingClientRect();
  const dx = origin.left + origin.width / 2 - (box.left + box.width / 2);
  const dy = origin.top + origin.height / 2 - (box.top + box.height / 2);
  const scale = Math.min(0.9, Math.max(0.3, origin.width / box.width));
  return `translate(${dx}px, ${dy}px) scale(${scale})`;
}

/**
 * Case-study dialog.
 * Phases: closed → open → closing → closed. Content stays rendered while it
 * animates out, then the backdrop is removed from layout.
 */
export default function ProjectModal({ project, origin, onClose }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const running = useRef([]);
  const [shown, setShown] = useState(null);
  const [phase, setPhase] = useState('closed');

  // Follow the requested project; closing keeps the last one on screen.
  useEffect(() => {
    if (project) {
      setShown(project);
      setPhase('open');
    } else {
      setPhase((current) => (current === 'open' ? 'closing' : current));
    }
  }, [project]);

  useLayoutEffect(() => {
    const modal = modalRef.current;
    const backdrop = backdropRef.current;
    running.current.forEach((animation) => animation.cancel());
    running.current = [];
    if (phase === 'closed') return;

    const reduced = prefersReducedMotion();
    const from = reduced ? 'none' : sourceTransform(modal, origin);

    if (phase === 'open') {
      modal.scrollTop = 0;
      closeRef.current?.focus({ preventScroll: true });
      running.current = [
        backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' }),
        modal.animate(
          [
            { opacity: 0, transform: from, borderRadius: '40px' },
            // Become solid early so text never double-exposes over the page;
            // the shape keeps travelling on the spring.
            { opacity: 1, offset: 0.2 },
            { opacity: 1, transform: 'none', borderRadius: '20px' },
          ],
          reduced ? { duration: 200 } : { duration: SPRINGS.smooth.duration, easing: SPRINGS.smooth.easing },
        ),
      ];
    } else if (phase === 'closing') {
      // Leave the way it came: back into the source card.
      const exit = modal.animate(
        [
          { opacity: 1, transform: 'none' },
          { opacity: 1, offset: 0.6 },
          { opacity: 0, transform: from },
        ],
        reduced ? { duration: 160, fill: 'forwards' } : { ...EXIT, fill: 'forwards' },
      );
      running.current = [
        exit,
        backdrop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: EXIT.duration, fill: 'forwards' }),
      ];
      exit.onfinish = () => setPhase('closed');
    }
  }, [phase, origin, shown]);

  // Scroll lock while the dialog is up.
  useEffect(() => {
    if (phase !== 'open') return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  const study = shown?.caseStudy;

  return (
    <div
      ref={backdropRef}
      className={`modal-backdrop${phase !== 'closed' ? ' open' : ''}${phase === 'closing' ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      aria-hidden={phase === 'closed' ? true : undefined}
      onClick={handleBackdropClick}
    >
      <div ref={modalRef} className="modal">
        <div className="modal-top">
          <div className="mono">{study ? study.kicker : 'PROJECT FIELD NOTES'}</div>
          <h2 id="modalTitle">{shown ? shown.title : 'Project name'}</h2>
          <p>{study?.intro}</p>
          <button ref={closeRef} className="modal-close" type="button" aria-label="Close project details" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">
          {study && (
            <>
              <h3>The problem</h3>
              <p>{study.problem}</p>
              <h3>How I approached it</h3>
              <p>{study.approach}</p>
              <div className="modal-flow">
                {study.steps.map((step, index) => (
                  <Fragment key={step}>
                    {index > 0 && <i style={{ '--i': index }}>→</i>}
                    <span style={{ '--i': index }}>{step}</span>
                  </Fragment>
                ))}
              </div>
              <h3>Engineering challenge / decision</h3>
              <p>{study.challenge}</p>
              <h3>Project status</h3>
              <p>{study.status}</p>
              <div className="modal-meta">
                {study.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="modal-disclaimer">{study.disclaimer}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

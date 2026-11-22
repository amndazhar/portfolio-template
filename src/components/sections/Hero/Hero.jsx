import { useLayoutEffect, useRef } from 'react';
import Button from '../../common/Button.jsx';
import FloatNote from '../../common/FloatNote.jsx';
import HeroIllustration from './HeroIllustration.jsx';
import { site } from '../../../content/site.js';
import { relativePointer } from '../../../utils/pointer.js';
import { SPRINGS, prefersReducedMotion } from '../../../utils/spring.js';
import './Hero.css';

const STAGGER_MS = 75;
const { hero } = site;

/**
 * Entrance choreography, played once when the boot screen lifts.
 * Elements carry `data-intro="<order>"`; `data-intro-kind="pop"` scales in
 * (stickers, sparkles), everything else rises.
 */
function playIntro(root) {
  const elements = root.querySelectorAll('[data-intro]');
  if (prefersReducedMotion()) {
    elements.forEach((el) => el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'backwards' }));
    return;
  }
  elements.forEach((el) => {
    const order = Number(el.dataset.intro);
    const pop = el.dataset.introKind === 'pop';
    const spring = pop ? SPRINGS.bouncy : SPRINGS.smooth;
    el.animate(
      pop
        ? [{ opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1 }]
        : [{ opacity: 0, translate: '0 56px' }, { opacity: 1, translate: '0 0' }],
      { duration: spring.duration + 200, delay: order * STAGGER_MS, easing: spring.easing, fill: 'backwards' },
    );
  });
}

export default function Hero({ entered }) {
  const sectionRef = useRef(null);
  const wordRef = useRef(null);

  // Layout effect so the first painted frame is already the start of the animation.
  useLayoutEffect(() => {
    if (entered) playIntro(sectionRef.current);
  }, [entered]);

  // The outlined word drifts toward the pointer, making the headline feel alive.
  const handleWordMove = (event) => {
    const { x, y } = relativePointer(event, wordRef.current);
    wordRef.current.style.transform = `translate(${x * 9}px,${y * 7}px) rotate(${x * 2}deg)`;
  };
  const handleWordLeave = () => {
    wordRef.current.style.transform = '';
  };

  return (
    <section ref={sectionRef} className={`hero${entered ? ' is-entered' : ''}`}>
      <div className="wrap hero-grid">
        <div className="hero-text">
          <div className="eyebrow mono" data-intro="0">
            {hero.eyebrow}
          </div>
          <h1>
            <span className="line" data-intro="1">
              {hero.headline.plain}
            </span>
            <span
              ref={wordRef}
              className="line outline"
              data-intro="2"
              onPointerMove={handleWordMove}
              onPointerLeave={handleWordLeave}
            >
              {hero.headline.outlined}
            </span>
            <span className="line blue" data-intro="3">
              {hero.headline.accent}
            </span>
          </h1>
          <p className="hero-copy" data-intro="5">
            {hero.intro}
          </p>
          <div className="hero-actions" data-intro="6">
            {hero.actions.map((action) => (
              <Button key={action.href} href={action.href} variant={action.variant}>
                {action.label} <span>{action.icon}</span>
              </Button>
            ))}
          </div>
          <div className="hero-meta" data-intro="7">
            {hero.meta.map((item) => (
              <span key={item.num}>
                <b>{item.num}</b> / {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-art">
          <div className="blob" data-intro="1" data-intro-kind="pop" />
          <HeroIllustration data-intro="3" />
          <FloatNote className="one" data-intro="6" data-intro-kind="pop">
            ✳ currently building
          </FloatNote>
          <FloatNote className="two" data-intro="7" data-intro-kind="pop">
            curiosity.exe ↗
          </FloatNote>
          <FloatNote className="three" data-intro="8" data-intro-kind="pop">
            made with intent ♡
          </FloatNote>
          <span className="spark s1" data-intro="9" data-intro-kind="pop">
            ✳
          </span>
          <span className="spark s2" data-intro="10" data-intro-kind="pop">
            ✦
          </span>
        </div>
      </div>
    </section>
  );
}

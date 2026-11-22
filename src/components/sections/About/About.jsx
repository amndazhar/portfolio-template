import Reveal from '../../common/Reveal.jsx';
import RichText from '../../common/RichText.jsx';
import { site } from '../../../content/site.js';
import './About.css';

const { about } = site;

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="wrap about-grid">
        <Reveal>
          <div className="mono about-kicker">{about.kicker}</div>
          <h2 className="about-title">
            <RichText text={about.title} />
          </h2>
          <p className="about-copy">{about.copy}</p>
          <div className="about-chips">
            {about.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </Reveal>

        <Reveal as="aside" className="about-note">
          <div className="mono">{about.note.kicker}</div>
          <h3>{about.note.title}</h3>
          {about.note.strengths.map((item) => (
            <p key={item.title}>
              <b>{item.title}</b> {item.text}
            </p>
          ))}
          {about.note.availability && (
            <div className="availability">
              <i /> {about.note.availability}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

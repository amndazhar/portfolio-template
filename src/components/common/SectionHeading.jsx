import Reveal from './Reveal.jsx';
import RichText from './RichText.jsx';

/**
 * Kicker + display title on the left, short description on the right.
 * `title` uses RichText markup (\n = line break, *words* = accent).
 * Styles: styles/sections.css
 */
export default function SectionHeading({ kicker, title, description }) {
  return (
    <Reveal className="section-head">
      <div>
        <div className="mono section-kicker">{kicker}</div>
        <h2 className="section-title">
          <RichText text={title} />
        </h2>
      </div>
      <p className="section-desc">{description}</p>
    </Reveal>
  );
}

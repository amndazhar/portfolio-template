import Reveal from '../../common/Reveal.jsx';

/** Shared frame for every playground demo. `delay` staggers the reveal. */
export default function LabCard({ label, icon, title, description, delay = 0, children }) {
  return (
    <Reveal className="lab-card" delay={delay}>
      <div className="lab-card-head">
        <span className="mono lab-label">{label}</span>
        <span>{icon}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </Reveal>
  );
}

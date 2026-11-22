import SectionHeading from '../../common/SectionHeading.jsx';
import ReconcileDemo from './demos/ReconcileDemo.jsx';
import CurveDemo from './demos/CurveDemo.jsx';
import PipelineDemo from './demos/PipelineDemo.jsx';
import NotesDemo from './demos/NotesDemo.jsx';
import { site } from '../../../content/site.js';
import { playground } from '../../../content/playground.js';
import './Playground.css';

/** Demo `type` (in src/content/playground.js) → interaction component. */
const DEMOS = {
  reconcile: ReconcileDemo,
  curve: CurveDemo,
  pipeline: PipelineDemo,
  notes: NotesDemo,
};

/** Cards in the same row rise together-ish; the second column trails a beat. */
const delayFor = (index) => (index % 2) * 120 + Math.floor(index / 2) * 60;

const { playground: content } = site;

export default function Playground() {
  return (
    <section className="section lab-section" id="lab">
      <div className="wrap">
        <SectionHeading kicker={content.kicker} title={content.title} description={content.description} />
        <div className="lab-grid">
          {playground.map((demo, index) => {
            const Demo = DEMOS[demo.type];
            if (!Demo) {
              if (import.meta.env.DEV) console.warn(`Unknown playground demo type "${demo.type}"`);
              return null;
            }
            return <Demo key={`${demo.type}-${index}`} delay={delayFor(index)} {...demo} />;
          })}
        </div>
        {content.footer && (
          <div className="lab-bottom">
            {content.footer.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

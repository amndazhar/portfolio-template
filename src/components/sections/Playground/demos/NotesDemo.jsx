import FloatNote from '../../../common/FloatNote.jsx';
import LabCard from '../LabCard.jsx';

/**
 * Demo type "notes" — throwable sticky notes ({ text, style }).
 * Copy and starting positions come from src/content/playground.js.
 */
export default function NotesDemo({ delay, label, icon, title, description, notes, output }) {
  return (
    <LabCard delay={delay} label={label} icon={icon} title={title} description={description}>
      <div className="drag-zone">
        {notes.map((note) => (
          <FloatNote key={note.text} style={note.style}>
            {note.text}
          </FloatNote>
        ))}
      </div>
      {output && <div className="demo-output">{output}</div>}
    </LabCard>
  );
}

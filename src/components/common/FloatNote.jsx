import useDraggable from '../../hooks/useDraggable.js';
import './FloatNote.css';

/**
 * A floating sticky note you can pick up and throw. Position it with
 * `className` or `style`; any other props (data-*, aria-*) pass through.
 */
export default function FloatNote({ className = '', style, children, ...rest }) {
  const ref = useDraggable();
  return (
    <div ref={ref} className={`float-note ${className} draggable`.replace(/\s+/g, ' ')} style={style} {...rest}>
      {children}
    </div>
  );
}

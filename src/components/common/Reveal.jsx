import useReveal from '../../hooks/useReveal.js';

/**
 * Wraps content in an element that rises into place on first scroll into view.
 * `delay` (ms) staggers siblings.
 */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, revealClass] = useReveal({ delay });
  return (
    <Tag ref={ref} className={`${className} ${revealClass}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

import './Button.css';

/**
 * Pill button. Renders an <a> when `href` is given, otherwise a <button>.
 * variant: 'dark' (filled ink) | 'line' (outlined)
 */
export default function Button({ href, variant = 'dark', className = '', children, ...rest }) {
  const classes = `btn btn-${variant} ${className}`.trim();

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  );
}

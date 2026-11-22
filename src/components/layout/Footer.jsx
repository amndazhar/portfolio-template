import { site } from '../../content/site.js';
import { CREATOR } from '../../creator.js';
import './Footer.css';

/**
 * Footer lines from src/content/site.js, plus a small optional template credit
 * after the last line. Hide it with `credit: false` in site.js.
 */
export default function Footer() {
  const lines = site.footer ?? [];
  const showCredit = site.credit !== false;

  const credit = showCredit && (
    <a className="footer-credit" href={CREATOR.repo} target="_blank" rel="noreferrer" title={`${CREATOR.template} — open-source template`}>
      {`· TEMPLATE BY ${CREATOR.name.toUpperCase()}`}
    </a>
  );

  return (
    <footer className="footer wrap">
      {lines.map((line, index) => (
        <span key={line}>
          {line}
          {index === lines.length - 1 && credit && <> {credit}</>}
        </span>
      ))}
      {lines.length === 0 && credit && <span>{credit}</span>}
    </footer>
  );
}

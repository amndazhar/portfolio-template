import { site } from '../../content/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer wrap">
      {site.footer.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </footer>
  );
}

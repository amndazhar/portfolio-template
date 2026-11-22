import { useEffect, useRef, useState } from 'react';
import { site } from '../../content/site.js';
import useScrollSpy from '../../hooks/useScrollSpy.js';
import './Header.css';

const { nav: navLinks, identity } = site;
const sectionIds = navLinks.map((link) => link.href.slice(1));

/** Drives the reading-progress line and the "lifted" header state, once per frame. */
function useScrollChrome(headerRef, progressRef) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current.style.transform = `scaleX(${max > 0 ? scrolled / max : 0})`;
      headerRef.current.classList.toggle('is-scrolled', scrolled > 8);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [headerRef, progressRef]);
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const activeId = useScrollSpy(sectionIds);
  useScrollChrome(headerRef, progressRef);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className="topbar">
      <a className="logo" href="#top">
        <span className="logo-mark">{identity.logo.mark}</span> {identity.logo.name}
        <span className="logo-suffix">{identity.logo.suffix}</span>
      </a>
      <nav className={`nav${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link) => {
          const active = link.href === `#${activeId}`;
          const classes = [link.cta && 'nav-cta', active && 'is-active'].filter(Boolean).join(' ');
          return (
            <a
              key={link.href}
              className={classes || undefined}
              href={link.href}
              aria-current={active ? 'location' : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
      <button
        className={`menu${menuOpen ? ' is-open' : ''}`}
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        ☰
      </button>
      <span ref={progressRef} className="scroll-progress" aria-hidden="true" />
    </header>
  );
}

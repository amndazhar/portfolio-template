import { useEffect, useState } from 'react';
import RichText from '../common/RichText.jsx';
import { site } from '../../content/site.js';
import './BootScreen.css';

/** Auto-dismiss delay — the intro should never be a mandatory obstacle. */
const AUTO_HIDE_MS = 1800;
/** The hero starts building while the curtain is still lifting. */
const HANDOFF_MS = 180;

export default function BootScreen({ onExit }) {
  const [hidden, setHidden] = useState(false);
  const { boot } = site;

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), AUTO_HIDE_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hidden) return undefined;
    const timer = setTimeout(() => onExit?.(), HANDOFF_MS);
    return () => clearTimeout(timer);
  }, [hidden, onExit]);

  return (
    <div className={`boot${hidden ? ' hide' : ''}`}>
      <div className="boot-inner">
        <div className="mono boot-kicker">{boot.kicker}</div>
        <div className="boot-art">
          <div className="boot-monitor" />
          <div className="boot-stand" />
          <div className="boot-base" />
        </div>
        <h1 className="boot-title">
          <RichText text={boot.title} />
        </h1>
        <p className="boot-copy">{boot.copy}</p>
        <button className="boot-btn" type="button" onClick={() => setHidden(true)}>
          {boot.button}
        </button>
      </div>
    </div>
  );
}

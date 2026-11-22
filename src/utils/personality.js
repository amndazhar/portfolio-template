/* Small, quiet easter eggs. Nothing here affects the main experience.
   Copy lives in src/content/site.js → `personality` (set an entry to null to turn it off). */
import { site } from '../content/site.js';
import { CREATOR } from '../creator.js';

const { personality = {} } = site;

/** One dim console line naming the template — follows the same `credit` switch as the footer. */
export function logTemplateCredit() {
  if (site.credit === false || typeof window === 'undefined' || window.__portfolioCredited) return;
  window.__portfolioCredited = true;
  console.log(`%cBuilt with ${CREATOR.template} by ${CREATOR.name} · ${CREATOR.repo}`, 'font: 11px "DM Mono", monospace; color: #9a9d93;');
}

/** A hello for anyone who opens DevTools — they're probably the audience. */
export function greetCuriousDevelopers() {
  const greeting = personality.consoleGreeting;
  if (!greeting || typeof window === 'undefined' || window.__portfolioGreeted) return;
  window.__portfolioGreeted = true;
  console.log(
    `%c${greeting.title}%c\n${greeting.body}`,
    'font: 700 16px "Space Grotesk", sans-serif; color: #3457e5;',
    'font: 12px "DM Mono", monospace; color: #6c7167; line-height: 1.6;',
  );
}

/** Swaps the tab title while the visitor is away, restores it when they return. */
export function installTabAwayTitle() {
  const awayTitle = personality.awayTitle;
  if (!awayTitle) return undefined;
  const original = document.title;
  const onVisibility = () => {
    document.title = document.hidden ? awayTitle : original;
  };
  document.addEventListener('visibilitychange', onVisibility);
  return () => {
    document.removeEventListener('visibilitychange', onVisibility);
    document.title = original;
  };
}

import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently crossing the middle of the viewport
 * (or null above the first one). Answers the visitor's "where am I?".
 */
export default function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    const sections = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
          else if (entry.target === sections[0] && entry.boundingClientRect.top > 0) setActiveId(null);
        });
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}

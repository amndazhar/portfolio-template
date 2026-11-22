import { Fragment } from 'react';

/**
 * Renders the tiny heading markup used in src/content:
 *   "\n"       → <br />
 *   "*words*"  → <em>words</em>  (accent: italic serif in the accent colour)
 *
 *   <RichText text={"A few things\nI've *made.*"} />
 */
export default function RichText({ text }) {
  return text.split('\n').map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {line.split(/(\*[^*]+\*)/).filter(Boolean).map((part, partIndex) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
          <em key={partIndex}>{part.slice(1, -1)}</em>
        ) : (
          part
        ),
      )}
    </Fragment>
  ));
}

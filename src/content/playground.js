/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PLAYGROUND DEMOS — which mini demos appear, in what order, with what words.
 * ─────────────────────────────────────────────────────────────────────────────
 *  `type` picks the interaction (see components/sections/Playground/demos/):
 *    'reconcile' — pick a quantity, watch the shelves + status react
 *    'curve'     — scrub along a curve (drag the plot or use the slider)
 *    'pipeline'  — step through stages with back/next
 *    'notes'     — throwable sticky notes
 *  Remove an entry to hide a demo; reorder entries to reorder the cards.
 *  Re-theme the copy to match your own work — the mechanics stay the same.
 *  {placeholders} in message strings are filled in by the demo.
 */
export const playground = [
  {
    type: 'reconcile',
    label: 'MINI DEMO 01 / CHECKS',
    icon: '📦',
    title: 'Does the order match?',
    description:
      'An order of 100 items has arrived. Change how many actually showed up and watch the check respond.',
    expected: 100,
    options: [100, 96, 108],
    optionLabel: '{qty} arrived',
    messages: {
      match: '✓ ALL GOOD · ORDERED {expected} / ARRIVED {received}',
      short: '! SHORT · {diff} ITEMS MISSING · FLAG FOR REVIEW',
      over: '! EXTRA · {diff} MORE THAN ORDERED · DOUBLE-CHECK',
    },
  },
  {
    type: 'curve',
    label: 'MINI DEMO 02 / DATA',
    icon: '〰',
    title: 'Trace the signal.',
    description: 'Drag along the chart (or use the slider) to read values off a simple signal. Small tools, clear feedback.',
    controlLabel: 'POSITION',
    output: 'POINT · X {x} · VALUE {y} (ILLUSTRATIVE)',
  },
  {
    type: 'pipeline',
    label: 'MINI DEMO 03 / FLOW',
    icon: '⌘',
    title: 'Follow the pipeline.',
    description: 'Step through a simple data pipeline. Every stage has one job — and the order matters.',
    stages: [
      { step: 'INPUT', name: 'INPUT', text: 'Collect the raw data.' },
      { step: 'PARSE', name: 'PARSING', text: 'Turn it into a structure the system understands.' },
      { step: 'TRANSFORM', name: 'TRANSFORMATION', text: 'Clean, enrich and reshape it.' },
      { step: 'VALIDATE', name: 'VALIDATION', text: 'Check it against the rules before trusting it.' },
      { step: 'OUTPUT', name: 'OUTPUT', text: 'Deliver a result people can act on.' },
    ],
    backLabel: '← Back',
    nextLabel: 'Next stage →',
  },
  {
    type: 'notes',
    label: 'MINI DEMO 04 / DETAILS',
    icon: '✳',
    title: 'Small details matter.',
    description:
      'Grab a note and throw it. A tiny interaction, but it changes how the page feels. Works with touch too.',
    notes: [
      { text: 'make it useful', style: { top: 20, left: 20, background: '#d8f36a' } },
      { text: 'then make it lovely', style: { top: 70, left: '45%', background: '#ffb8a5' } },
      { text: 'stay curious ↗', style: { top: 25, right: 20, background: '#d9d0ff' } },
    ],
    output: 'DRAG OBJECTS · MAKE YOUR OWN LITTLE ARRANGEMENT',
  },
];

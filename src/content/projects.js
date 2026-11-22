/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROJECTS — the gallery cards and the case study each one opens.
 * ─────────────────────────────────────────────────────────────────────────────
 *  These four are placeholders. Per project:
 *    category      must match a filter id below ('all' shows everything)
 *    visual        key of an illustration in ./visuals/index.jsx
 *    image         …or a screenshot instead: a path inside /public, e.g. 'projects/app.png'
 *    imageAlt      alt text for the screenshot
 *    tile          background colour of the card's picture tile
 *    stickerColor  sticker background (null = lime)
 *    caseStudy     the text shown in the pop-up
 *  `{count}` in a filter label is replaced with the number of projects.
 */
export const projectFilters = [
  { id: 'all', label: 'Everything · {count}' },
  { id: 'web', label: 'Web apps' },
  { id: 'data', label: 'Data / AI' },
  { id: 'creative', label: 'Creative' },
];

export const projects = [
  {
    id: 'dashboard',
    category: 'web',
    number: 'PROJECT 01 / PRODUCT',
    sticker: 'SHIPPED',
    stickerColor: null,
    visual: 'dashboard',
    tile: '#dce6d6',
    type: 'REACT · NODE.JS',
    title: 'Team Dashboard',
    summary: 'A calm, glanceable dashboard that pulls a team’s day-to-day numbers into one place.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Charts'],
    caseStudy: {
      kicker: '01 / PRODUCT DESIGN + BUILD',
      intro: 'A single home for the numbers a small team checks every morning.',
      problem:
        'Key numbers lived in five different tools. Every morning started with a round of tab-hopping, and small problems were spotted late.',
      approach:
        'Interviewed the team about which numbers actually changed their decisions, then designed a single screen around those — with drill-downs only where they earned their place.',
      steps: ['Interviews', 'Metric shortlist', 'Wireframes', 'API layer', 'Dashboard', 'Feedback loop'],
      challenge:
        'Saying no. The hardest part was leaving metrics out so the important ones stayed obvious at a glance.',
      status: 'Example project — replace with your own case study.',
      stack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      disclaimer: 'Placeholder content from the portfolio template. Swap in your real project details.',
    },
  },
  {
    id: 'signals',
    category: 'data',
    number: 'PROJECT 02 / PROTOTYPE',
    sticker: 'PROTOTYPE',
    stickerColor: '#d9d0ff',
    visual: 'chart',
    tile: '#f3d7c9',
    type: 'PYTHON · DATA',
    title: 'Signal Explorer',
    summary: 'A small tool for exploring noisy sensor data, spotting patterns and flagging outliers.',
    tech: ['Python', 'Pandas', 'Plotting', 'Notebooks'],
    caseStudy: {
      kicker: '02 / DATA TOOLING',
      intro: 'Making a messy stream of readings easy to explore and reason about.',
      problem:
        'Raw readings were noisy and hard to compare. Interesting events were buried, and checking them by hand took hours.',
      approach:
        'Built a pipeline to clean and resample the data, then an interactive view to compare signals side by side and mark anything unusual.',
      steps: ['Raw data', 'Cleaning', 'Resampling', 'Detection', 'Review UI'],
      challenge:
        'Thresholds that worked on one dataset failed on the next. The tool had to make it easy for a person to check — not just trust — what it flagged.',
      status: 'Example project — replace with your own case study.',
      stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
      disclaimer: 'Placeholder content from the portfolio template. Swap in your real project details.',
    },
  },
  {
    id: 'scene',
    category: 'creative',
    number: 'PROJECT 03 / INTERACTIVE',
    sticker: 'EXPERIMENT',
    stickerColor: '#ffb8a5',
    visual: 'blocks',
    tile: '#d8d4ff',
    type: 'THREE.JS · WEBGL',
    title: 'Little Worlds',
    summary: 'A playful 3D scene you can explore in the browser, built to learn real-time graphics.',
    tech: ['Three.js', 'WebGL', 'Animation', 'Frontend'],
    caseStudy: {
      kicker: '03 / CREATIVE CODING',
      intro: 'A weekend experiment that turned into a crash course in 3D on the web.',
      problem: 'I wanted to understand real-time 3D — not from tutorials, but by building something I would enjoy poking at.',
      approach:
        'Started with a single block, then added lighting, camera controls and small interactions one at a time, keeping it running smoothly on a phone.',
      steps: ['One cube', 'Lighting', 'Camera', 'Interaction', 'Performance pass'],
      challenge: 'Keeping it fast on low-end devices meant fewer draw calls, simpler materials and a lot of profiling.',
      status: 'Example project — replace with your own case study.',
      stack: ['Three.js', 'WebGL', 'Vite'],
      disclaimer: 'Placeholder content from the portfolio template. Swap in your real project details.',
    },
  },
  {
    id: 'flow',
    category: 'data',
    number: 'PROJECT 04 / SYSTEMS',
    sticker: 'IN PROGRESS',
    stickerColor: '#d8f36a',
    visual: 'flow',
    tile: '#d8e5f2',
    type: 'APIS · AUTOMATION',
    title: 'Workflow Engine',
    summary: 'A tiny engine that turns repetitive multi-step chores into reliable, observable workflows.',
    tech: ['TypeScript', 'Queues', 'APIs', 'Testing'],
    caseStudy: {
      kicker: '04 / BACKEND SYSTEMS',
      intro: 'Turning a pile of manual steps into something that runs itself — and says when it can’t.',
      problem: 'A weekly task took a dozen manual steps across several tools. Any slip meant redoing everything.',
      approach:
        'Modelled the chore as explicit stages with inputs, outputs and retries, so each step could be tested, re-run and observed on its own.',
      steps: ['Trigger', 'Fetch', 'Transform', 'Validate', 'Publish'],
      challenge: 'Failures had to be loud and recoverable. Clear status and safe re-runs mattered more than raw speed.',
      status: 'Example project — replace with your own case study.',
      stack: ['TypeScript', 'Node.js', 'Redis', 'Jest'],
      disclaimer: 'Placeholder content from the portfolio template. Swap in your real project details.',
    },
  },
];

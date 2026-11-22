/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — every word on the page lives here.  ✳ Start here.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything below is placeholder copy for a fictional person, "Jordan".
 *  Replace it with your own — the layout, motion and interactions adapt.
 *
 *  Headings support two tiny bits of markup (see components/common/RichText.jsx):
 *    \n        → line break
 *    *words*   → accent words (italic serif, accent colour)
 *
 *  This file is also read by vite.config.js to fill in <title> and meta tags,
 *  so keep it plain JavaScript (no JSX, no imports of components or CSS).
 */

const GITHUB_URL = 'https://github.com/your-username';

export const site = {
  identity: {
    name: 'Jordan',
    // Logo in the header: ✳ jordan.builds
    logo: { mark: '✳', name: 'jordan', suffix: '.builds' },
  },

  meta: {
    lang: 'en',
    title: 'Jordan — Developer & Designer',
    description:
      'Portfolio of Jordan — a developer who builds thoughtful interfaces, useful systems and playful experiments.',
    themeColor: '#f5f3ed',
  },

  // `href` must match a section id: #work, #lab, #process, #about, #contact
  nav: [
    { href: '#work', label: 'Selected work' },
    { href: '#lab', label: 'Playground' },
    { href: '#process', label: 'How I work' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: "Let's talk ↗", cta: true },
  ],

  // The intro screen shown for ~2s on first load.
  boot: {
    kicker: "JORDAN'S DIGITAL PLAYGROUND",
    title: 'A world of\n*things I make.*',
    copy: 'A little portfolio with a lot of curiosity. Come in, click around, and see what happens when ideas meet code.',
    button: 'ENTER THE PLAYGROUND  ↗',
  },

  hero: {
    eyebrow: 'DEVELOPER · DESIGNER · TINKERER',
    // Three lines: solid, outlined (follows the pointer), italic accent.
    headline: { plain: 'I make', outlined: 'digital', accent: 'things happen.' },
    intro:
      "Hi, I'm Jordan. I turn rough ideas into useful, considered experiences — from interfaces and full-stack systems to small experiments that make people smile.",
    actions: [
      { label: 'Explore my work', icon: '↘', href: '#work' },
      { label: 'A little about me', icon: '✳', href: '#about', variant: 'line' },
    ],
    meta: [
      { num: '01', label: 'interfaces' },
      { num: '02', label: 'systems' },
      { num: '03', label: 'experiments' },
    ],
  },

  // Scrolling strip under the hero.
  ticker: ['BUILD WITH PURPOSE', 'MAKE IT USEFUL', 'THINK IN SYSTEMS', 'STAY CURIOUS'],

  work: {
    kicker: '01 / SELECTED WORK',
    title: "A few things\nI've *made.*",
    description:
      'A mix of shipped work, side projects and ideas in progress. Pick one to open the case notes and see how it works behind the scenes.',
    // Set to null to hide.
    footnote: '✳   PROJECT STATUS IS LABELLED HONESTLY — PROTOTYPES AND EXPERIMENTS ARE MARKED AS SUCH.',
  },

  playground: {
    kicker: '02 / THE PLAYGROUND',
    title: "Don't just read.\n*Try a thing.*",
    description:
      'A few tiny interactive demos. Swap them for ones that reflect the kinds of things you like building (src/content/playground.js).',
    footer: ['EXPERIMENTS / INTERACTION / SYSTEMS', 'NO REAL DATA · JUST A LITTLE DEMONSTRATION'],
  },

  process: {
    kicker: '03 / HOW I WORK',
    title: 'A little\nmethod to\nthe *making.*',
    description:
      "How something works matters as much as how it looks. The process is rarely a straight line — and that's where the interesting bits happen.",
    steps: [
      {
        title: 'Start with the real problem.',
        text: 'Understand the people, the context and the constraints before writing code. A clear problem makes every later decision easier.',
        tag: 'DISCOVERY / RESEARCH',
      },
      {
        title: 'Sketch the moving parts.',
        text: 'Map the data, the states and the edges of the system. A quick diagram saves a lot of rewriting.',
        tag: 'PLANNING / ARCHITECTURE',
      },
      {
        title: 'Build, test, question.',
        text: 'Get a working slice in front of people early. Poke at edge cases and smooth out the parts that cause friction.',
        tag: 'BUILD / ITERATE',
      },
      {
        title: 'Polish with purpose.',
        text: 'Use hierarchy, motion and feedback to make things feel obvious — without hiding what matters.',
        tag: 'UX / ACCESSIBILITY / DETAIL',
      },
    ],
  },

  about: {
    kicker: '04 / THE HUMAN BEHIND THE SCREEN',
    title: 'Curious\nby nature.\n*Builder*\nby choice.',
    copy: "I'm a developer who enjoys the space where design and engineering overlap. I like building things from scratch, untangling messy problems, and sweating the small details that make a product feel considered.",
    chips: ['Frontend', 'Full-stack', 'Design systems', 'Prototyping', 'Accessibility'],
    note: {
      kicker: 'A NOTE FROM MY DESK',
      title: 'What I bring to a team',
      strengths: [
        { title: 'Visual thinking.', text: 'I like interfaces that are clear, responsive and purposeful.' },
        { title: 'Systems curiosity.', text: 'I want to understand the data and the rules behind the screen.' },
        { title: 'Learning energy.', text: "I'm happy exploring unfamiliar tools and improving through feedback." },
      ],
      // Shown with a pulsing "live" dot. Set to null to hide.
      availability: 'OPEN TO NEW PROJECTS AND ROLES',
    },
  },

  contact: {
    kicker: '05 / YOUR TURN',
    title: 'Have a\n*good one?*',
    copy: "A role, a collaboration, or an interesting problem? I'm always up for a thoughtful conversation.",
    // ✳ Replace with your real address. While it's a placeholder (example.com),
    // the form shows a reminder instead of opening a mail draft.
    email: 'you@example.com',
    links: [
      { label: 'GITHUB ↗', href: GITHUB_URL, external: true },
      { label: 'EMAIL ↗', href: 'mailto:' }, // "mailto:" is completed with the email above
    ],
    mailSubject: (visitorName) => `Hello Jordan — from ${visitorName}`,
    form: {
      nameLabel: 'YOUR NAME',
      namePlaceholder: 'What should I call you?',
      messageLabel: 'A LITTLE MESSAGE',
      messagePlaceholder: "Tell me what's on your mind...",
      submit: 'Send a little note ↗',
      note: 'This opens your email app.',
    },
    notConfigured: 'Add your email address in src/content/site.js before publishing.',
  },

  footer: ['© 2026 JORDAN · MADE WITH CURIOSITY & A LOT OF TABS', 'DESIGNED TO BE EXPLORED ↗'],

  // A small, dimmed "template by" link after the footer text. Optional —
  // set to false to hide it. (Keeping it is a kind way to say thanks.)
  credit: true,

  // Small easter eggs. Set either to null to switch it off.
  personality: {
    consoleGreeting: {
      title: '✳ hello, fellow tab-opener.',
      body: 'You found the console — that already says a lot.',
    },
    awayTitle: '✳ psst — still building things here',
  },
};

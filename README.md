# ✳ Springy Portfolio

A playful, art-directed developer portfolio template built with **React + Vite**. It feels **physical**: motion runs on real springs, things can be grabbed and thrown, and the page reacts to how you scroll.

**No UI libraries and no animation libraries.** It uses a ~100-line hand-rolled spring engine, plain CSS and a single content folder you edit to make it yours.

> 📸 _Add a screenshot or GIF of your deployed site here._

## Features

- **Intro screen → choreographed hero entrance.** Lines rise in sequence; stickers and sparkles pop on a spring.
- **Throwable sticky notes.** They track your pointer 1:1, rubber-band at the edges, and carry the momentum of your flick.
- **Project gallery.**
  - an editorial staggered grid
  - a filter pill that glides between filters
  - cards that tilt toward the pointer
  - case studies that **grow out of the card** you click and shrink back into it
- **Scroll-aware page.**
  - a reading-progress line and current-section highlight in the nav
  - a ticker that speeds up and reverses with your scroll
  - a process timeline that lights up as you read
  - parallax watermarks
- **Interactive playground.** Four mini demos (quantity check, curve scrubber, pipeline stepper, throwable notes), each configurable or removable.
- **Small personality details.** A cursor sparkle, a pulsing "available" dot, a console greeting, and a tab title that changes while you're away.
- **Accessible and responsive.**
  - keyboard-operable cards and focus rings
  - `prefers-reduced-motion` handled throughout (motion becomes fades) and `prefers-reduced-transparency` too
  - layouts for desktop, tablet and phone
- **Easy to deploy.** A GitHub Pages workflow is included, and it works on any static host.

## Quick start

Requires **Node.js 18+**.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

> **Windows PowerShell:** if `npm` is blocked with "running scripts is disabled", either use `npm.cmd`, or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.

## Make it yours

**All words, projects and illustrations live in `src/content/`.** You shouldn't need to touch components to personalise the site.

| File | What's in it |
|---|---|
| `src/content/site.js` | ✳ **Start here.** Your name and logo, page title and description, nav, intro screen, hero, section headings, process steps, about section, contact details, footer and easter eggs |
| `src/content/projects.js` | Filters and project cards, plus the case study each one opens |
| `src/content/playground.js` | Which mini demos appear, in what order, and their wording |
| `src/content/visuals/index.jsx` | Project illustrations (SVG) |

### 1. Your details

Edit `src/content/site.js`. Two bits of markup work in headings:

```js
title: "A few things\nI've *made.*"   // \n = line break, *words* = accent (italic serif)
```

Set **`contact.email`** to your real address. Until you do, the contact form shows a reminder instead of opening a mail draft. The page `<title>` and meta description are filled from `site.meta` at build time.

### 2. Your projects

Each project in `src/content/projects.js` has card text, a filter `category`, colours (`tile`, `stickerColor`) and a `caseStudy`. For the picture, use one of:

- **A screenshot.** Put the file in `public/projects/` and set `image: 'projects/my-app.png'` and `imageAlt: '…'`.
- **An illustration.** Set `visual: 'dashboard'`, pointing at a key in `src/content/visuals/index.jsx`. Four are included: `dashboard`, `chart`, `blocks` and `flow`.

### 3. The playground

In `src/content/playground.js`:
- delete an entry to hide that demo
- reorder entries to reorder the cards
- re-word them to match your own work

The available `type`s are `reconcile`, `curve`, `pipeline` and `notes`. To add your own demo, create a component in `src/components/sections/Playground/demos/` (wrap it in `<LabCard>`), then register it in the `DEMOS` map in `Playground.jsx`.

### 4. Look and feel

| Change | Where |
|---|---|
| Colours, shadows, spring curves | `src/styles/variables.css` |
| Fonts | the Google Fonts `<link>` in `index.html` and the `--display / --sans / --mono` tokens |
| Favicon | the inline SVG `<link rel="icon">` in `index.html` |
| Motion feel | `SPRINGS` in `src/utils/spring.js` (damping + response) |

[`Design.md`](Design.md) documents the whole design system: tokens, components, motion rules and interaction details. Read it before adding new sections so they feel like they belong.

## Deploy

### GitHub Pages (included)

1. Push to a **public** repo on GitHub. Pages on private repos needs a paid plan.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.

Asset paths are relative (`base: './'` in `vite.config.js`), so the site works at `username.github.io/repo-name/` without extra config.

### Anywhere else

Netlify, Vercel, Cloudflare Pages and others work too. Use build command `npm run build` and output directory `dist`.

## Project structure

```text
src/
├── content/          ← your words, projects, demos, illustrations
├── components/
│   ├── common/       # Button, FloatNote, Reveal, RichText, SectionHeading, Toast, CursorSpark
│   ├── layout/       # BootScreen, Header, Footer
│   └── sections/     # Hero, Ticker, Work, Playground, Process, About, Contact
├── hooks/            # useReveal, useDraggable (throw physics), useScrollSpy, useToast
├── styles/           # variables, global, animations, sections
└── utils/            # spring engine, formatting, pointer helpers, easter eggs
```

## How the motion works (short version)

- **Springs, not durations.** `src/utils/spring.js` describes springs with Apple-style *damping* and *response*. It samples them into CSS `linear()` easings, so CSS transitions and the Web Animations API share the same curves. It also runs live, velocity-aware springs for anything you drag.
- **Interruptible.** Everything you can touch starts from its current on-screen position and can be grabbed mid-flight.
- **Reveals don't fight components.** They animate `opacity` and the individual `translate` property, so a component's own `transform` and hover transitions keep working.
- **Progressive enhancement.** Scroll-driven parallax uses CSS `animation-timeline` where supported. Elsewhere the page scrolls normally.

## License

[MIT](LICENSE). Use it, remix it, ship it. A link back is appreciated but not required.

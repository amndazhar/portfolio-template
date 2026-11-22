# Customising Springy Portfolio

All words, projects and illustrations live in **`src/content/`**. You shouldn't need to touch components to make the site yours.

| File | What's in it |
|---|---|
| `src/content/site.js` | ✳ **Start here.** Name and logo, page title, nav, intro screen, hero, section headings, process steps, about, contact, footer, easter eggs |
| `src/content/projects.js` | Filters, project cards and the case study each one opens |
| `src/content/playground.js` | Which mini demos appear, in what order, and their wording |
| `src/content/visuals/index.jsx` | Project illustrations (SVG) |

## Text and headings

Headings support two bits of markup:

```js
title: "A few things\nI've *made.*"   // \n = line break, *words* = accent (italic serif)
```

The page `<title>`, description and meta tags are filled from `site.meta` at build time.

## Contact email

Set `contact.email` in `site.js`. While it's still a placeholder (`example.com`), the contact form shows a reminder instead of opening a mail draft.

## Projects

Each project in `projects.js` has card text, a filter `category`, colours (`tile`, `stickerColor`) and a `caseStudy`. For the picture, use one of:

- **A screenshot.** Put it in `public/projects/` and set `image: 'projects/my-app.png'` and `imageAlt: '…'`.
- **An illustration.** Set `visual: 'dashboard'`, a key in `src/content/visuals/index.jsx`. `dashboard`, `chart`, `blocks` and `flow` are included.

`{count}` in a filter label shows the number of projects.

## Playground demos

In `playground.js`:
- delete an entry to hide that demo
- reorder entries to reorder the cards
- re-word them to match your own work

The available `type`s are `reconcile`, `curve`, `pipeline` and `notes`. To add your own, create a component in `src/components/sections/Playground/demos/` (wrap it in `<LabCard>`) and register it in the `DEMOS` map in `Playground.jsx`.

## Look and feel

| Change | Where |
|---|---|
| Colours, shadows, spring curves | `src/styles/variables.css` |
| Fonts | the Google Fonts `<link>` in `index.html` and the `--display / --sans / --mono` tokens |
| Favicon | the inline SVG `<link rel="icon">` in `index.html` |
| Motion feel | `SPRINGS` in `src/utils/spring.js` (damping + response) |

[`Design.md`](../Design.md) documents the full design system: tokens, components, motion rules and interaction details.

## Footer credit

A small, dimmed "template by" link sits after the footer text. It's optional: set `credit: false` in `site.js` to hide it. Please keep the `LICENSE` file; that's the MIT License's one requirement.

## Deploy

**GitHub Pages (included):**
1. Push to a public repo.
2. **Settings → Pages → Source: GitHub Actions.**
3. Push to `main`.

Asset paths are relative, so `username.github.io/repo-name/` works without extra config.

**Anywhere else:** Netlify, Vercel, Cloudflare Pages and others work too. Use build command `npm run build` and output directory `dist`.

## Project structure

```text
src/
├── content/      ← your words, projects, demos, illustrations
├── components/   # common · layout · sections
├── hooks/        # useReveal, useDraggable (throw physics), useScrollSpy, useToast
├── styles/       # variables, global, animations, sections
└── utils/        # spring engine, formatting, pointer helpers, easter eggs
```

## How the motion works

- **Springs, not durations.** `src/utils/spring.js` describes springs with *damping* and *response*. It samples them into CSS `linear()` easings, so CSS transitions and the Web Animations API share the same curves. It also runs live, velocity-aware springs for anything you drag.
- **Interruptible.** Anything you can touch starts from its current on-screen position and can be grabbed mid-flight.
- **Progressive enhancement.** Scroll-driven parallax uses CSS `animation-timeline` where supported; elsewhere the page scrolls normally. Reduced-motion and reduced-transparency preferences are respected throughout.

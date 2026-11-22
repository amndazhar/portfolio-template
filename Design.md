# Design System

This document describes the design system **as it is implemented** in this template: the creative concept, tokens, components, motion system and interaction rules. Use it as the reference when adding or changing anything, so new work feels like it belongs.

All words, projects and illustrations live in `src/content/` (see the README). Everything described here works the same whatever content you put in.

---

## 1. Design concept

**"Quiet layout, lively details."**

The portfolio is framed as a *digital playground*: an editorial, mostly calm page structure whose personality comes from small tactile interactions rather than constant motion.

| Principle | How it shows up |
|---|---|
| **Editorial calm** | Off-white paper background, generous section padding (88px), hairline dividers, large confident display type, lots of whitespace. |
| **Playful precision** | Uppercase monospace labels and numbered kickers (`01 / SELECTED WORK`) next to soft illustrations, stickers and hand-placed notes. |
| **Tactile, not gimmicky** | Motion is short and triggered by the user (hover, drag, click, scroll). Ambient animation is limited to the hero blob, sparkles, floating notes, the ticker and the availability ping. |
| **Physical, not scripted** | Anything you touch behaves like an object: it responds on press, can be thrown, resists at edges, and moves on springs that can be interrupted mid-flight. Things leave the way they came. |
| **Connected scrolling** | The page reacts to how you move through it: the ticker follows your scroll speed, a progress line and the nav track where you are, the process steps light up as you read them, and the watermarks drift. |
| **Honesty** | Project status is labelled plainly (stickers, footnote, modal disclaimers). Demos are marked "illustrative". |
| **Systems thinking, visible** | Content keeps returning to pipelines and flows (pipeline stepper, modal flow chips, order-check demo), so the visual language includes arrows (`→ ↘ ↗`) and step chips. |

**Visual identity motifs**
- The **✳ asterisk** is the brand mark (logo, cursor sparkle, ticker separators, note decorations, boot monitor).
- **Arrows** `↗ ↘ →` mark actions and steps.
- **Three typographic voices** in one headline: a heavy grotesk, an outlined word, and an italic Fraunces serif accent.
- **Flat, saturated colour blocks** (lime, lavender, blue, orange) behind otherwise neutral content.

---

## 2. Colour palette

Tokens live in `src/styles/variables.css`.

### Core tokens

| Token | HEX | Role |
|---|---|---|
| `--paper` | `#fbfaf6` | Page background, process section, mobile nav panel |
| `--white` | `#fffefa` | Cards, notes, modal, project number pill |
| `--night` | `#20251e` | Boot screen and Playground section background |
| `--ink` | `#171916` | Primary text, dark buttons, filter active state |
| `--muted` | `#777a70` | Muted utility text (`.muted`) |
| `--line` | `#e8e6df` | Hairline borders and dividers |
| `--blue` | `#3457e5` | **Primary accent**: links on hover, kickers, serif accents, underlines, active arrows |
| `--blue2` | `#b9c6ff` | Hero blob |
| `--lime` | `#d8f36a` | **Secondary accent**: logo mark, ticker strip, About section, Playground highlights, default sticker |
| `--orange` | `#ff7958` | **Tertiary accent**: focus ring, sparkles, cursor spark, hover states on outlined text |
| `--lav` | `#d9d0ff` | Contact section, process tags |

### Section backgrounds

| Section | Background |
|---|---|
| Header (sticky) | `#fbfaf6e8` + `backdrop-filter: blur(16px)` |
| Hero | `--paper` |
| Ticker | `--lime` |
| Selected work | `#f1f0e9` |
| Playground | `--night` `#20251e` |
| Process | `--paper` |
| About | `--lime` |
| Contact | `--lav` `#d9d0ff` |
| Modal header | `#e7eaff` |

### Project tiles

Each project sets its own `tile` and `stickerColor` in `src/content/projects.js`. The house set, in order:

| Tile | Outline tint (illustrations) | Sticker |
|---|---|---|
| `#dce6d6` sage | `#34513d` | `--lime` |
| `#f3d7c9` peach | `#725c4e` | `#d9d0ff` |
| `#d8d4ff` lilac | `#51468e` | `#ffb8a5` |
| `#d8e5f2` sky | `#344f7c` | `#d8f36a` |

### Text greys (light surfaces)

`#62665c` (nav), `#6c7167` (hero copy), `#6e7469` (eyebrow), `#74796f` / `#777b70` (body copy), `#85887e` / `#85897f` / `#888c81` (meta, footnotes, footer).

### Text on dark (Playground / Boot)

`#f6f4ec` / `#f7f5ed` (primary), `#b7beb0` / `#aeb4a7` (body), `#9ca596` (footer row), `--lime` (labels, outputs).

### Section-tinted text

About: `#4f5940` (copy), `#56643e` (kicker), `#465239` / `#7f963f` (chips). Contact: `#656179` (copy, links), `#5a54a1` (kicker), `#8b8c9a` (labels).

### Supporting colours

Peach `#ffb8a5`, periwinkle `#9bb3ff`, success green `#4f9b54` (availability dot), boot-button shadow `#9fb84b`.

### Shadows

| Name | Value | Use |
|---|---|---|
| `--shadow` | `0 18px 50px #17191610` | Notes, About note, contact card |
| Note hover | `0 14px 30px #20251e22` | Floating note hover |
| Modal | `0 35px 100px #0005` | Dialog |
| Boot button | `0 5px 0 #9fb84b` → `0 8px 0` on hover | Solid "pressable" shadow |

---

## 3. Typography

Loaded from Google Fonts in `index.html`.

| Token | Family | Weights | Voice |
|---|---|---|---|
| `--display` | **Space Grotesk** | 400–700 | Headlines, card titles, logo, ticker |
| `--sans` | **DM Sans** | 400–900 | Body copy and UI (body default) |
| `--mono` | **DM Mono** | 400, 500 | Labels, kickers, tags, metadata, demo output |
| — | **Fraunces** (opsz 9–144, SOFT 20, WONK 1) | 600, 700 | Italic or serif *accent words* inside headlines (`<em>`) |

### Type scale

| Element | Font | Size | Line-height | Tracking |
|---|---|---|---|---|
| Hero H1 | Space Grotesk 700 | `clamp(58px, 8.5vw, 116px)` | .87 | −.095em |
| Contact title | Space Grotesk 700 | `clamp(55px, 9vw, 105px)` | .85 | −.1em |
| About title | Space Grotesk 700 | `clamp(46px, 7vw, 82px)` | .9 | −.09em |
| Boot title | Space Grotesk 700 | `clamp(42px, 8vw, 76px)` (54px ≤600) | .94 | −.08em |
| Section title (H2) | Space Grotesk 700 | `clamp(38px, 6vw, 68px)` | .94 | −.075em |
| Modal title | Space Grotesk 700 | `clamp(30px, 5vw, 48px)` | normal | −.07em |
| Project card title | Space Grotesk 700 | `clamp(25px, 3vw, 34px)` | normal | −.06em |
| About note H3 | Space Grotesk 700 | 25px | — | −.06em |
| Lab / process H3 | Space Grotesk 600 | 22px | — | −.05em |
| Modal H3 | Space Grotesk 600 | 20px | — | −.04em |
| Hero copy | DM Sans | 15px | 1.75 | — |
| About / contact copy | DM Sans | 14px | 1.8 / 1.7 | — |
| Section desc, process text, modal text | DM Sans | 13px | 1.7–1.8 | — |
| Card / lab copy | DM Sans | 12px | 1.65–1.75 | — |
| Buttons, nav | DM Sans 700 / 400 | 12px | — | — |
| `.mono` label | DM Mono, UPPERCASE | 10px | — | .1em |
| Tags, chips, stickers | DM Mono | 9–10px | — | 0–.1em |

### Headline rules
- Headlines are set **very tight** (negative tracking −.04 to −.1em, line-height below 1).
- One or two words per headline go into `<em>`: **Fraunces 600** in `--blue` (or `--lime` on dark surfaces).
- The hero uses a three-line stack: solid → **outlined** (`-webkit-text-stroke: 1.5px`, transparent fill) → italic serif blue.
- Every section starts with a **mono kicker**: `NN / SECTION NAME`.

---

## 4. Layout

- **Content width:** `.wrap` = `min(1240px, 100% − 48px)`, centred (`100% − 34px` at ≤600px).
- **Header:** sticky, 70px high (60px on mobile). Its side padding `max(24px, (100vw − 1240px)/2)` aligns it with `.wrap`. Anchor offset `scroll-padding-top: 82px`.
- **Vertical rhythm:** every `.section` uses `88px` top and bottom padding at all breakpoints. The hero uses `88px / 78px`.
- **Section head:** flex row, title left and description right (max 360px), bottom-aligned, `gap 25px`, `margin-bottom 30px`.

### Page structure

```
Boot overlay (fixed, auto-hides)
Header (sticky)
main
 ├ Hero ............ 2-col grid 1.1fr / .9fr, gap 55px
 ├ Ticker strip .... full-bleed lime marquee
 ├ 01 Selected work  filters + 2-col card grid (gap 34px 26px)
 ├ 02 Playground ... dark; 2×2 lab grid (gap 18px)
 ├ 03 Process ...... grid .7fr / 1.3fr, gap 65px, sticky left column
 ├ 04 About ........ lime; 2-col 1fr / 1fr, gap 70px
 └ 05 Contact ...... lavender; 2-col 1fr / .8fr, gap 40px
Footer
Modal · Toast · Cursor spark (fixed layers)
```

### Z-index layers

| Layer | z-index |
|---|---|
| Cursor spark | 120 |
| Boot overlay | 100 |
| Toast | 80 |
| Modal backdrop | 60 |
| Sticky header | 20 |
| Dragging element | 10 |
| "View project" pill | 4 |
| Floating notes | 3 |
| Card labels | 2 |
| Content above watermarks / hero art | 1 |

### Radii

| Value | Use |
|---|---|
| `99px` (pill) | Buttons, filters, chips, stickers, tags |
| `18–20px` | Lab cards, About note, contact card, modal |
| `10–12px` | Notes, curve panel, drag zone |
| `7–9px` | Logo mark, pipeline steps, modal flow chips |
| `3–4px` | Project cards and visuals (deliberately near-square), process tags |

---

## 5. Components

| Component | File | Spec |
|---|---|---|
| **Button** | `common/Button.jsx` | Pill, `13px 18px`, 12px/700, inline-flex, gap 10, `transition .22s`. **dark**: ink → blue + lift −2px on hover. **line**: 1px `#bfc3b8` border → blue border and text. Every button has a diagonal light sheen that sweeps across on hover (.55s). |
| **FloatNote** | `common/FloatNote.jsx` | White mono 10px note, 1px border `#1a1d1622`, radius 10, `--shadow`. Bobs 10px (`float` 5s). Hover: scale 1.08 and deeper shadow. Draggable. |
| **SectionHeading** | `common/SectionHeading.jsx` | Kicker, H2 and description inside a `Reveal`. |
| **Reveal** | `common/Reveal.jsx` | Wrapper that fades and slides in on first view. |
| **Footer + credit** | `layout/Footer.jsx` | Lines from `site.footer`, mono 9px `#888c81`, split left/right (stacked on mobile). An optional template credit link follows the last line at 60% opacity and turns blue on hover. Toggle it with `site.credit`; the attribution values live in `src/creator.js`. |
| **Toast** | `common/Toast.jsx` | Ink pill, mono 10px, fixed bottom-centre. Slides up 20px when shown and stays 2.6s. |
| **CursorSpark** | `common/CursorSpark.jsx` | Orange ✳ 17px that follows the mouse (multiply blend). Fades out 420ms after the pointer stops. |
| **Header / logo** | `layout/Header.jsx` | Lime 27px rounded square ✳ rotated −8°, then the logo name plus a light suffix (both from `site.identity.logo`). Nav links 12px `#62665c` with a blue underline that grows on hover. CTA is an ink pill. |
| **Boot screen** | `layout/BootScreen.jsx` | Full-screen `--night`, CSS-drawn monitor, lime pill button with a solid drop shadow. |
| **Project card** | `sections/Work/ProjectCard.jsx` | Frameless. A 300px illustration tile (radius 4) carries a white "PROJECT NN" pill on the top left, a coloured sticker on the top right and a "VIEW PROJECT ↗" pill on the bottom right. Below it: mono type label, a 34px circular arrow, the title with an animated underline, the summary and tech chips. |
| **Filter bar** | `sections/Work/FilterBar.jsx` | Mono 10px chips, 1px `#c9cdc1`. A single ink **pill glides** to the active chip on a smooth spring (.55s). It re-measures when the chips wrap. Hover: ink border and text. |
| **Project grid** | `sections/Work/Work.jsx` | Two columns. The right-hand column sits **84px lower**, giving an editorial staggered rhythm; this is recalculated for whatever is visible after filtering. Single column on mobile. |
| **Reading progress** | `layout/Header.jsx` | A 2px blue gradient line along the bottom of the header, filling with page scroll. |
| **Process rail** | `sections/Process/Process.jsx` | A 2px hairline rail beside the steps that fills blue up to the reading line (55% of the viewport). Each step has a marker: grey, then blue once passed, then orange with a halo while it's being read. The sticky column shows a large `01 / 04` counter. |
| **Project modal** | `sections/Work/ProjectModal.jsx` | Max 850px wide and 90vh tall, radius 20. Periwinkle header `#e7eaff` with a round white close button. Content has sections plus **flow chips** (`#e9edff` / `#344cae`), stack chips and an orange-bordered disclaimer. |
| **Lab card** | `sections/Playground/LabCard.jsx` | Translucent `#ffffff08`, 1px `#ffffff24`, radius 18, padding 23, min-height 300. Head row has a lime mono label and an icon. Demos share `.demo-btn` (outlined pill → lime) and `.demo-output` (lime mono 11px). |
| **Process item** | `sections/Process/Process.jsx` | 55px number column plus content. Hairline separators, lavender tag. |
| **About note** | `sections/About/About.jsx` | White card, radius 18, orange ✳ in the corner, green availability dot with a 4px halo. |
| **Contact card** | `sections/Contact/Contact.jsx` | White card with underline-only inputs (focus turns the line blue) and a full-width dark button. |
| **Ticker** | `sections/Ticker/Ticker.jsx` | Lime strip. Space Grotesk 700 12px uppercase, .12em tracking, blue ✳ separators. |
| **Watermarks** | CSS `:before` / `:after` | "SELECTED WORK" (white, 45% opacity) and "PLAY" (`#ffffff08`): giant display type, decorative only. |

---

## 6. Animations

### Springs (the motion system)

All meaningful motion runs on real springs from `src/utils/spring.js`. There's no animation library: a ~100-line spring engine is described with Apple's two parameters:

- **damping**: 1 means no overshoot; below 1 is bouncy.
- **response**: roughly how quickly it arrives, in seconds.

| Spring | Damping / response | CSS variable | Used for |
|---|---|---|---|
| **smooth** | 1.0 / .55s | `--spring-smooth` | Default for reveals, hero entrance, filter pill, modal, card lifts, tilts |
| **snappy** | 1.0 / .35s | `--spring-snappy` | Small UI state changes |
| **bouncy** | .72 / .45s | `--spring-bouncy` | Only after the user's own momentum or for tiny "pop" accents: sparkle and note pop-in, pipeline step lift, chip hover, process marker |

The springs are sampled into CSS `linear()` easings at startup (`installSpringVariables()` in `main.jsx`), so CSS transitions and the Web Animations API use the same curves. Browsers without `linear()` fall back to `cubic-bezier(.2,.8,.2,1)`.

**Rules**
- Default to the smooth spring.
- Bounce only when a gesture or pop earns it.
- Exits are quicker than entrances and use an accelerating curve (`cubic-bezier(.4,0,.9,.6)`, 320ms).

### Choreography

| Moment | What happens |
|---|---|
| **Boot → hero handoff** | The boot content lifts 36px and fades. 180ms later, while the curtain is still fading, the hero builds in. |
| **Hero entrance** | Elements carry `data-intro="<order>"` and stagger 75ms apart. Text lines and blocks rise 56px on the smooth spring. The blob, notes and sparkles (`data-intro-kind="pop"`) scale in from .4 on the bouncy spring. It takes about 1.4s in total. |
| **Scroll reveal** | `useReveal` / `<Reveal>`: opacity plus a 36px rise via the Web Animations API on `opacity` and the individual `translate` property, so it never conflicts with a component's own `transform` or `transition`. Siblings stagger: work cards 0 / 140ms by column, lab cards by row and column, process steps 60ms apart. |
| **Filter change** | The pill glides to the chip, and the remaining cards re-flow in (fade, 28px rise, .97 → 1 scale), 70ms apart. |
| **Modal** | Grows **out of the clicked card** (translate and scale from the card's rect, radius 40 → 20px). It becomes opaque within the first 20% of the motion so text never double-exposes. It closes **back into the same card**. Flow chips assemble 60ms apart once it lands. |

### Keyframes (`src/styles/animations.css`)

| Name | Target | Duration / easing | Trigger |
|---|---|---|---|
| `morph` | Hero blob (shape + rotate −12° ↔ 5°) | 12s ease-in-out ∞ | Ambient |
| `float` | Floating notes (`translate: 0 −10px`) | 5s ease-in-out ∞, delays 0 / −2s / −3s. Paused while dragging | Ambient |
| `spin` | Hero sparkles | 14s linear ∞ | Ambient |
| `ping` | Availability dot, missing-box warning | 2.4s / 1.6s ease-out ∞ | Status |
| `tinyWiggle` | Project number pill (±5°) | .35s ease | Card hover |
| `swapIn` | New demo output text (6px rise + fade) | .35s smooth | Demo state change |
| `dropIn` | Extra box in the order-check demo (drop + squash) | .55s smooth | Over quantity |
| `navDrop` | Mobile nav panel | .45s smooth | Menu open |

### Scroll-linked motion

| Element | Behaviour |
|---|---|
| **Ticker** | Driven by JavaScript every frame: it drifts at rest (one loop per 28s), speeds up with scroll velocity (up to 13× base), and follows the scroll direction. Speed is **blended**, so a reversal eases through zero instead of snapping. At speed it gains up to a 6° skew as a "motion stretch". It pauses when off-screen. |
| **Hero parallax** (desktop) | The art column lags 110px over the first viewport of scroll, and "things happen." slides 40px left. Uses CSS scroll-driven animations and only runs where supported. |
| **Watermarks** | "SELECTED WORK" slides sideways (8% → −18%) and "PLAY" rises (120px → −80px) across their sections' view timelines. |
| **Header** | The reading-progress line fills, and the edge appears once scrolled (see §7). |
| **Process** | The rail fills and the active step changes at the reading line. |

**Reduced motion:** under `prefers-reduced-motion: reduce`:
- CSS animation and transition durations drop to .01ms, and smooth scrolling is off.
- Reveals, the hero entrance and the modal become short opacity cross-fades instead of slides.
- Thrown notes go straight to their resting spot without a spring.
- The ticker stays still, and the parallax is disabled.

---

## 7. Interactions

| Interaction | Behaviour |
|---|---|
| **Press feedback (everywhere)** | Feedback lands on pointer-down, not on release: buttons, chips, demo buttons and pipeline steps scale to .94–.96 (120ms). The nav CTA scales to .95, the logo mark to .88, and the boot button sinks onto its solid shadow like a key. Project tiles give to .985 and round their corners. |
| **Boot screen** | Auto-hides after 1.8s. "ENTER THE PLAYGROUND ↗" hides it immediately. Its content lifts away and the hero builds in underneath. |
| **Header** | Translucent material (`blur(16px) saturate(160%)`). There's no divider at the top of the page; once content scrolls underneath, a soft edge and shadow appear (scroll edge effect). A reading-progress line fills along the bottom. |
| **Anchor nav + scroll spy** | Smooth scroll with an 82px offset. The current section's link keeps its underline, or turns blue for the CTA (`aria-current`). On mobile, ☰ rotates 90° and the panel unfolds from the bar; tapping a link closes it. |
| **Logo hover** | Mark rotates 125°, scales to 1.12 and becomes a circle. |
| **Hero outlined word** | Drifts toward the pointer (`translate(x·9px, y·7px) rotate(x·2°)`), fills orange on hover, crosshair cursor. Resets on leave. |
| **Hero art hover** | Illustration lifts 7px and rotates 1.2°. Sparkles scale to 1.2. |
| **Throwable notes** | Hero notes and demo 04 notes (`useDraggable`):<br>• they track the pointer 1:1 from where you grabbed them (pointer capture), stop bobbing and lift (scale 1.06, deeper shadow) while held<br>• past an edge they **rubber-band** (progressive resistance) instead of stopping hard<br>• on release the flick's velocity is **projected** (deceleration .99) to choose a resting spot inside the area, and the note springs there carrying the release velocity, on separate X and Y springs<br>• a flick (over 300px/s) settles with a little bounce (damping .78); a gentle release settles without one<br>• a note can be caught again mid-flight<br>The two SVG doodles in the hero show a grab cursor only. |
| **Project filters** | Defined in `src/content/projects.js` (`{count}` in a label shows the project total). The ink pill glides between chips and the remaining cards re-flow in. Non-matching cards get `display: none` but keep their reveal state. |
| **Project card hover** | Illustration zooms to 1.055 and rotates −1°. The visual tilts in 3D toward the pointer (max 2.2°, `perspective(900px)`, not on touch). The "VIEW PROJECT" pill slides in, the sticker rotates −8° and scales to 1.08, the number wiggles, the arrow turns blue and rotates 45°, and the title underline grows. |
| **Project card keyboard** | Cards are focusable (`role="button"`). Enter or Space opens them, and the focus ring sits on the tile. |
| **Project modal** | Grows from the clicked card and returns into it. Body scroll is locked and focus moves to the close button. It closes on ×, Escape or a backdrop click. The × rotates 90° and turns lime on hover. |
| **Demo `reconcile`** | Pick a quantity against an expected one. **Short:** a dashed, pulsing gap appears on the shelf, the floor line and message turn orange. **Over:** an extra box drops onto the middle shelf. Each new message slides in. |
| **Demo `curve`** | **Scrub the plot directly** (drag horizontally, 1:1; vertical swipes still scroll on touch), or use the slider or keyboard. The dot sits exactly on the drawn curve (sampled from the SVG path), the traced portion lights up, and the halo grows while scrubbing. |
| **Demo `pipeline`** | Back / Next buttons or clicking a step. The active step turns lime and lifts on the bouncy spring. **Completed steps and arrows stay lit.** Buttons disable (opacity .4) at either end. |
| **Lab card hover** | Lifts 6px, gets a lime border and a lighter background. The icon rotates 25° and scales to 1.2. |
| **Process** | The step on the reading line becomes active: orange marker with a halo, orange number, lime tag. The counter updates. Hover still indents 10px and turns the title blue. |
| **About note / contact card** | Pinned at +2° / −2°. On hover they straighten and lift, with a deeper shadow. The contact card also straightens while you type (`:focus-within`). The note's ✳ turns 180° on hover. |
| **About chips** | Hover turns them ink with lime text and lifts them 3px. |
| **Contact form** | Field labels turn blue with their focused input, and links get a growing underline. The form builds a `mailto:` draft. While the email in `src/content/site.js` is still a placeholder (`example.com`), it shows a toast instead. |
| **Cursor sparkle** | Mouse only. Hidden on `hover: none` devices. |
| **Easter eggs** | Leave the tab and its title becomes "✳ psst — still building things here", then restores when you return. Opening DevTools shows a styled hello in the console (`utils/personality.js`). |
| **Focus** | All buttons, links and inputs show `3px solid --orange` with a 4px offset (`:focus-visible`). |

---

## 8. Responsive design

| Breakpoint | Changes |
|---|---|
| **> 850px** (desktop) | Layouts as described above. |
| **≤ 850px** (tablet) | Hero, About and Contact become a single column. Process becomes a single column, gap 25; its heading stops being sticky, the counter hides, and the rail moves inside the column. Lab grid becomes one column. Project visual 250px. Hero top padding 58px. About gap 35, Contact gap 30. Hero parallax is off. |
| **≤ 600px** (mobile) | `.wrap` = 100% − 34px. Header 60px with ☰ menu (nav becomes a dropdown panel). Hero top padding 44px, buttons wrap. Section heads stack and the description gets a 16px top margin. Project grid has one column (gap 27, visual 235px, no column offset) and the "VIEW PROJECT" pill is always visible (8px). Notes shrink to 8px text. Lab card padding 18. Lab footer and site footer stack. Modal padding 22. Boot title 54px. The About note and contact card sit flat. |
| **`hover: none`** (touch) | Cursor spark hidden. "VIEW PROJECT" pill always visible. Tilt ignores touch pointers. Notes and the curve plot are fully touch-driven (`touch-action`). |
| **`prefers-reduced-motion`** | See §6. |
| **`prefers-reduced-transparency`** | Header and modal backdrop become solid with no blur. |

Things that **do not** change on mobile:
- hero H1 size (the fluid clamp handles it)
- hero art min-height (440px)
- hero grid gap (55px)
- section padding (88px)

---

## 9. Design guidelines

1. **Use the tokens.** New colours go in `variables.css` only if they will be reused. Accents are blue (primary), lime (secondary) and orange (sparingly: focus, sparkle, warnings). Lavender and peach are for surfaces and stickers only.
2. **One accent word per headline.** Put it in `<em>` (Fraunces 600, blue; lime on dark). Keep display type tight: negative tracking and line-height ≤ .95.
3. **Label everything in mono.** Kickers follow `NN / NAME`. Metadata, tags and outputs use DM Mono, uppercase, 9–11px.
4. **Pills for actions and tags, soft radii for cards.** Pills are 99px, cards 18–20px, illustration tiles stay near-square (3–4px).
5. **Motion responds to the user.** Don't add new infinite animations. New hover effects should be short (.2–.55s), use `var(--spring-smooth)` for transforms, and lift by 2–7px or rotate by a few degrees at most. Give every pressable thing an `:active` state.
6. **Use springs, not durations, for motion.** In CSS, use `var(--spring-smooth)`. In JavaScript, use `SPRINGS.smooth.easing` / `.duration` with `element.animate()`, or `animateSpring()` for anything a pointer drives. Reserve `--spring-bouncy` for motion that follows the user's own momentum or for tiny pops.
7. **Interruptible by default.** Anything that moves must start from its current on-screen value and accept new input mid-flight. Don't lock input during a transition.
8. **Leave the way you came.** Overlays and panels exit along their entry path and back toward their source.
9. **Wrap new content blocks in `<Reveal>`** (or use `useReveal`), and pass `delay` to stagger siblings (60–140ms). Reveals animate `opacity` and `translate`, so components keep full control of `transform` and `transition`.
10. **Demos give continuous feedback.** Show the state change in the illustration itself, not only in the text. Warnings use orange, and new messages slide in with `swapIn`.
11. **Keep honesty labels.** Every project needs a status sticker, and its case study needs `status` and `disclaimer`.
12. **New projects** go in `src/content/projects.js`, with either a screenshot (`image`, from `public/`) or an illustration in `src/content/visuals/index.jsx`, drawn in the flat style: 3–5px outlines in a darker tint of the tile colour, plus palette fills.
13. **New demos** go in `sections/Playground/demos/`, wrapped in `<LabCard>`, using `.demo-btn` and `.demo-output`. Register the component in the `DEMOS` map in `Playground.jsx` and give its copy a `type` entry in `src/content/playground.js`.
14. **Accessibility:** keep `:focus-visible` outlines, give SVGs `aria-label` / `role="img"`, give interactive non-buttons a role and keyboard handling, keep everything working under reduced motion and reduced transparency, and keep text contrast on lime and lavender surfaces using the section-tinted text colours above.


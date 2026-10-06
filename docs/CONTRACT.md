# Schita — internal contract (v1.0.0)

Shared spec so the app shell, lesson data and PWA layer fit together.
Audience: a ~9-year-old girl. Short sentences, simple words, big text, big buttons.
Palette: white, black and pink (her favourites).

## 1. File layout

```
index.html                 app shell: inline CSS + inline app JS (router, i18n, store, renderer, screens)
lessons/index.js           defines window.SCHITA_LESSONS = [] and window.SCHITA_CATEGORIES
lessons/fox-01.js          one file per lesson: SCHITA_LESSONS.push({...})
future/ai-lessons.js       Phase-2 stub (documented interface, no network)
future/ai-feedback.js      Phase-2 stub
future/camera-overlay.js   Phase-2 stub (getUserMedia design notes, hidden behind FLAGS.cameraOverlay)
pwa/manifest.webmanifest
pwa/pwa.js                 registers SW + "new version" toast; app must work if this file is missing
sw.js                      service worker — lives at ROOT so its scope covers the whole app
icons/icon.svg, icons/icon-192.png, icons/icon-512.png, icons/icon-maskable-512.png, icons/apple-touch-icon.png
tools/make_icons.py        regenerates PNG icons (Pillow)
README.md
docs/CONTRACT.md           this file
```

Script order at the end of `<body>` in index.html (plain tags, no modules, so `file://` works):
```html
<script src="lessons/index.js"></script>
<script src="lessons/fox-01.js"></script>
<script src="future/ai-lessons.js"></script>
<script src="future/ai-feedback.js"></script>
<script src="future/camera-overlay.js"></script>
<script> /* inline app */ </script>
<script src="pwa/pwa.js" defer></script>
```
`<head>` contains `<link rel="manifest" href="pwa/manifest.webmanifest">`, theme-color metas
(light `#FFFFFF`, dark `#151214`), `<link rel="icon" href="icons/icon.svg">`,
`<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">`.

## 2. Globals

```js
window.Schita = {
  APP_NAME: "Schita",          // single constant — change the name here (and in manifest + sw.js comment)
  APP_VERSION: "1.0.0",
  FLAGS: { aiLessons: false, aiFeedback: false, cameraOverlay: false, streak: false },
  render,                      // renderLesson — reusable (player, thumbnails, dev grid, camera overlay)
  t, tr,                       // i18n helpers
  store,                       // persistence wrapper
  validateLesson,              // returns {ok, errors[]}
  sanitizeSvg,                 // allow-list sanitizer, also used for future AI lessons
  future: {}                   // stubs register here: future.aiLessons, future.aiFeedback, future.cameraOverlay
};
```
Stubs in `future/*.js` run BEFORE the app script, so they must do:
`window.Schita = window.Schita || {}; Schita.future = Schita.future || {}; Schita.future.x = {...}`
and the app must merge into the existing `window.Schita` object, not replace it.

## 3. Lesson schema

```js
{
  id: "fox-01",                       // kebab-case, unique
  category: "animals",                // warmups | animals | objects | faces | shading
  title: { ro: "Vulpița", en: "Little Fox" },
  difficulty: 2,                      // 1..3 (shown as pencils)
  minutes: 15,
  viewBox: "0 0 400 400",
  light: { x: 340, y: 60 },           // OPTIONAL: shows a small sun = where light comes from
  steps: [                            // 4..14 steps
    {
      instruction: { ro: "...", en: "..." },   // 1-2 SHORT sentences, for a 9-year-old
      tip: { ro: "...", en: "..." },           // OPTIONAL small hint for this step
      eraseConstruction: true,                 // OPTIONAL: from this step on, construction layers are not drawn
      layers: [ { kind: "construction" | "line" | "shade" | "detail", svg: "<path d='...'/>" } ]
    }
  ],
  techniqueTip: { ro: "...", en: "..." },     // shown on finish screen: what she practised
  makeItYours: { ro: ["...", "..."], en: ["...", "..."] }   // 1-2 prompts, same length per language
}
```
A step may have `layers: []` (e.g. the "erase the guide lines" step).

### Layer SVG rules (validated + sanitized)
- Geometry only. Allowed elements: `path, line, polyline, polygon, circle, ellipse, rect, g`.
- Allowed attributes: `d, x, y, x1, y1, x2, y2, cx, cy, r, rx, ry, width, height, points, transform, class, fill, opacity`.
- `fill` may ONLY be `none` or `url(#hatch)`, `url(#hatch-dense)`, `url(#crosshatch)`, `url(#soft)`.
- `class` may only contain: `solid` (filled with ink, e.g. pupils/nose), `paper` (filled with paper colour, e.g. eye sparkle),
  `thin`, `thick`.
- NO stroke/colour attributes, no `style`, no `id`, no `href`, no `on*`, no script, no text.
- Colours/stroke widths come only from CSS (by kind + new/old state), so dark mode, highlighting and overlay are free.

## 4. Renderer

```js
Schita.render(lesson, stepIndex, opts) -> SVGSVGElement
opts = {
  showConstruction: true,   // user toggle; also forced false at/after a step with eraseConstruction
  onlyNew: false,           // true: draw only this step's layers
  highlightNew: true,       // new layers get class is-new (accent), older is-old (pencil gray)
  finished: false,          // true: everything in ink, no highlight, no construction (finish screen, shelf)
  overlay: false,           // true: transparent bg, all strokes accent, construction visible (future camera overlay)
  showLight: true           // draws the sun icon if lesson.light is set
}
```
- Each layer is wrapped: `<g class="ly ly-{kind} is-new|is-old" data-step="{i}">`.
- The renderer injects `<defs>` with patterns `hatch` (45° lines, gap 7), `hatch-dense` (gap 4), `crosshatch`,
  and a radial gradient `soft`, in TWO colour variants (old / new). IDs are prefixed per instance
  (`s12-hatch`, `s12-hatch-new`) and `url(#hatch)` in layer markup is rewritten accordingly — several SVGs live
  on one page (dev grid) and duplicate IDs break patterns.
- Markup is inserted only after `sanitizeSvg()`.

CSS stroke styling (viewBox 400 units; `vector-effect` NOT used so zoom scales lines naturally):
| kind | stroke | width | other |
|---|---|---|---|
| construction | `--guide` (new: `--accent` at 70%) | 2 | `stroke-dasharray: 7 6` |
| line | `--ink` / old `--pencil` / new `--accent` | 3.5 | round caps/joins, fill none |
| detail | same colours | 2.5 | |
| shade | hatch patterns; strokes inside shade layers width 1.5 | | opacity .85 |
`.thin` → 2, `.thick` → 5. `.solid` → fill = current stroke colour. `.paper` → fill `--paper`, no stroke.

## 5. Animation
On step enter, for each element in `.is-new` stroked layers: `len = el.getTotalLength()`, set
`stroke-dasharray: len; stroke-dashoffset: len`, then transition to 0. Staggered in document order,
~0.5–0.9 s per element depending on length, total capped at ~3.5 s. Construction dashes: animate with
opacity+scale-in instead (dasharray conflicts). Shade layers + `.solid` fade in after strokes.
Replay button re-runs. `prefers-reduced-motion: reduce` → no animation.

## 6. Design tokens
```css
:root {            /* light */
  --bg: #FFF9FB;  --paper: #FFFFFF;  --ink: #1C1719;  --ink-2: #4A4246;
  --pencil: #A8A0A4;  --guide: #CFC7CB;  --line: #EDE4E8;
  --accent: #D6336C;  --accent-ink: #FFFFFF;  --accent-soft: #FCE4EE;  --accent-deep: #A61E4D;
}
dark: --bg #151214; --paper #1F1A1D; --ink #F6F0F3; --ink-2 #C9BFC4; --pencil #7A7075; --guide #4D4449;
      --line #2E272B; --accent #FF6FA3; --accent-ink #1C1719; --accent-soft #3A2230; --accent-deep #FF9DC0
```
Theme: `[data-theme=light|dark]` on `<html>`, default follows `prefers-color-scheme`.
Fonts: system only. Body `system-ui, "Segoe UI", Roboto, "Noto Sans", sans-serif`; display/headings
`ui-rounded, "SF Pro Rounded", "Nunito", "Varela Round", "Segoe UI", Roboto, system-ui, sans-serif`, weight 800.
Hand-drawn feel comes from SVG decoration (wobbly pink underline under headings, sketchy pencil icons), not fonts.
Base font-size 18px; instruction text ≥ 22px. Touch targets ≥ 56px.

## 7. Persistence (`store`)
localStorage key `schita.v1`, JSON, try/catch, in-memory fallback.
```js
{ prefs: { lang: "ro", theme: "auto", showConstruction: true, onlyNew: false, wakeLock: false, streak: false },
  progress: { "fox-01": { step: 3, completedAt: null, timesDrawn: 0 } },
  lastLessonId: "fox-01" }
```
Export/import = download/upload this object as `schita-backup-YYYY-MM-DD.json`.
Photos (milestone 2) go in IndexedDB `schita-photos`, never in localStorage.

## 8. Routes
`#/` home · `#/lesson/{id}/{step}` (1-based in URL) · `#/done/{id}` finish · `#dev` lesson preview grid + validator report.

## 9. Service worker
- `sw.js` at root. `const VERSION = "1.0.0"` must match `APP_VERSION`; cache name `schita-${VERSION}`.
- Precache list = every file in §1 (except tools/, docs/, README).
- Fetch: same-origin GET only. **Network-first** (with 3 s timeout) → put fresh copy in cache → fall back
  to cache when offline. Cross-origin requests are not handled (there are none).
- `activate`: delete caches not equal to current name, `clients.claim()`.
- New SW waiting → `pwa.js` shows a small toast "O versiune nouă e gata — Actualizează" which posts
  `{type:"SKIP_WAITING"}`, then reloads on `controllerchange`.
- `pwa.js` does nothing on `file://` (SW unsupported there) — must not throw.

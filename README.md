# Schita

A small, ad-free app that teaches a child to draw on paper, step by step. Each lesson shows one
new pencil stroke at a time (guide lines first, then the final lines, then shading).
Romanian and English, white / black / pink, works offline once installed.

Plain HTML + vanilla JS. No build step, no libraries, no CDN, no network calls except its own files.

## Run locally

- Quick look: double-click `index.html`. (Offline/install features are off on `file://`.)
- To test the PWA / offline mode, serve the folder:

  ```
  python -m http.server 8000
  ```

  then open <http://localhost:8000>.

## Publish on GitHub Pages

The repo must be **public** (free Pages plan), so anyone with the link can see the files.

1. Create a free account at <https://github.com>.
2. Click **New repository**, name it `schita`, choose **Public**, create it.
3. Upload the files, either:
   - **Web UI:** **Add file -> Upload files**, drag in the *contents* of the project folder
     (including the subfolders `lessons`, `future`, `pwa`, `icons`, `docs`, `tools`), then **Commit changes**.
   - **or git:**
     ```
     git init
     git add .
     git commit -m "Schita 1.0.0"
     git branch -M main
     git remote add origin https://github.com/USERNAME/schita.git
     git push -u origin main
     ```
4. In the repo: **Settings -> Pages -> Source: "Deploy from a branch"**, branch `main`, folder `/ (root)`, **Save**.
5. Wait 1-2 minutes. The app is at `https://USERNAME.github.io/schita/`.

All paths in the app are relative, so it works under the `/schita/` sub-path.

## Install on Android

1. Open the URL in **Chrome** (while online).
2. Menu (three dots) -> **Add to Home screen** / **Install app**.
3. Open the app once while online, so everything is cached.
4. Check offline: switch on airplane mode and start the app from the home screen.

## Updating the app

1. Change your files.
2. Bump `VERSION` in `sw.js` **and** `APP_VERSION` in `index.html` (same number).
3. Push to GitHub.

The next time the app is opened online it shows a "new version is ready" toast; one tap on **Actualizează** reloads it.

## Add a lesson

1. Copy `lessons/fox-01.js`, rename it, and change the `id` (kebab-case, unique).
2. Add a `<script src="lessons/your-lesson.js"></script>` tag in `index.html` (after `lessons/index.js`).
3. Add the same path to the `OPTIONAL` list in `sw.js`.
4. Open `index.html#dev` to see the validator report and a visual grid of all lessons.

Schema in short: `id`, `category` (warmups, animals, objects, faces, shading), `title {ro,en}`, `difficulty` 1-3,
`minutes`, `viewBox`, 4-14 `steps`. Each step has a short `instruction {ro,en}`, an optional `tip`, and `layers`
of kind `construction` (dashed guide lines), `line` (main outline), `detail`, or `shade` (hatching).
Layer SVG is geometry only (path, line, circle, ...), no colours or strokes: those come from CSS.
Full rules: [docs/CONTRACT.md](docs/CONTRACT.md).

## Change the app name

- `APP_NAME` in `index.html`
- the `<title>` in `index.html`
- `name` and `short_name` in `pwa/manifest.webmanifest`
- optional: the `schita-` cache prefix in `sw.js`

## Privacy

No accounts, no tracking, no ads. Progress and settings stay in the browser (`localStorage`).
Use the export / import buttons in the app to back up or move progress to another device.

## Icons

`python tools/make_icons.py` regenerates the PNG icons (needs Pillow). `icons/icon.svg` is the hand-written master.

## Phase 2 ideas (stubs only, switched off)

Flags live in `Schita.FLAGS` in `index.html`; the stubs are in `future/`:

- `future/ai-lessons.js` (`aiLessons`): generate new lessons via a small backend, validated and sanitized before use.
- `future/ai-feedback.js` (`aiFeedback`): kind feedback on a photo of her drawing, only with a parent-enabled backend.
- `future/camera-overlay.js` (`cameraOverlay`): live camera view with the lesson drawn on top; frames never leave the device.

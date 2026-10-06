/* Schita — Phase 2 STUB: camera overlay (trace the lesson over the live paper view).
 *
 * Planned flow
 * 1. A friendly explanation screen BEFORE any permission prompt ("Schița folosește camera
 *    doar ca să vezi lecția peste foaia ta. Nimic nu se salvează.").
 * 2. navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false })
 * 3. Full-screen <video> with Schita.render(lesson, step, { overlay: true }) SVG on top
 *    (transparent background, accent strokes, construction lines visible).
 * 4. Opacity slider for the overlay.
 * 5. Graceful fallback on NotAllowedError / NotFoundError: friendly message, back to the normal lesson.
 * 6. On close: stop ALL tracks (stream.getTracks().forEach(t => t.stop())).
 * 7. Frames never leave the device — no network, no recording, no screenshots stored.
 * Hidden behind Schita.FLAGS.cameraOverlay (false by default).
 *
 * Interface
 *   isSupported() -> boolean
 *   open({ lesson, stepIndex, render }) -> false for now (will become Promise<boolean>)
 */
window.Schita = window.Schita || {};
Schita.future = Schita.future || {};
Schita.future.cameraOverlay = {
  isSupported: function () {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && window.isSecureContext === true;
  },

  open: function (opts) {
    console.log("[Schita] cameraOverlay.open is not implemented yet", opts && opts.lesson && opts.lesson.id);
    return false;
  }
};

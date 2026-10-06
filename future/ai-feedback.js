/* Schita — Phase 2 STUB: kind AI feedback on a photo of the child's drawing.
 *
 * Design
 * - getFeedback(photoBlob, lesson, lang) -> { praise: string, suggestions: string[] }
 * - Tone: kind and specific. Always start with real praise, then 1-3 gentle suggestions
 *   about proportions and shapes ("the ears could be a bit taller"), never grades or scores.
 * - The photo is resized client-side (e.g. max 1024 px, JPEG) before anything is sent.
 * - Only sent if a parent has enabled a backend (endpoint configured + explicit opt-in);
 *   otherwise the feature stays hidden. Nothing is stored server-side.
 * - Hidden behind Schita.FLAGS.aiFeedback (false by default).
 */
window.Schita = window.Schita || {};
Schita.future = Schita.future || {};
Schita.future.aiFeedback = {
  ENDPOINT: null,

  getFeedback: function (photoBlob, lesson, lang) {
    var err = new Error("aiFeedback.getFeedback is not implemented yet");
    err.name = "NotImplemented";
    return Promise.reject(err);
  }
};

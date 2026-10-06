/* Schita — Phase 2 STUB: AI-generated lessons (no network code yet).
 *
 * Design
 * - generateLesson(subject, lang) asks a tiny backend/proxy (ENDPOINT) for a new lesson.
 *   The API key lives ONLY on that backend, never in the client.
 * - The prompt asks the model for the lesson schema in docs/CONTRACT.md §3 (JSON only).
 * - The answer must pass Schita.validateLesson(), and every layer goes through
 *   Schita.sanitizeSvg() before rendering (the model's output is untrusted).
 * - If validation fails, a "repair" round-trip sends the validator errors back to the model
 *   (repairPrompt(errors)); max MAX_ATTEMPTS = 2 attempts in total, then a friendly error
 *   is shown ("Nu am reușit să inventez lecția asta. Încearcă altă idee!").
 * - Hidden behind Schita.FLAGS.aiLessons (false by default).
 *
 * Interface
 *   generateLesson(subject: string, lang: "ro"|"en") -> Promise<lesson>
 *   repairPrompt(errors: string[]) -> string
 */
window.Schita = window.Schita || {};
Schita.future = Schita.future || {};
Schita.future.aiLessons = {
  ENDPOINT: null,        // e.g. "https://my-proxy.example.workers.dev/lesson" (set when a backend exists)
  MAX_ATTEMPTS: 2,

  generateLesson: function (subject, lang) {
    var err = new Error("aiLessons.generateLesson is not implemented yet");
    err.name = "NotImplemented";
    return Promise.reject(err);
  },

  // Text sent back to the model when the first answer failed validation.
  repairPrompt: function (errors) {
    var err = new Error("aiLessons.repairPrompt is not implemented yet");
    err.name = "NotImplemented";
    throw err;
  }
};

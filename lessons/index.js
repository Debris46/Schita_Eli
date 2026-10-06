// Schita lessons registry (v1.0.0)
// Loaded BEFORE the lesson files. To add a lesson:
//   1. create lessons/<id>.js that calls SCHITA_LESSONS.push({...}) (schema: docs/CONTRACT.md section 3)
//   2. add <script src="lessons/<id>.js"></script> after this file in index.html (and to the sw.js precache list)
//   3. use one of the category ids below
window.SCHITA_LESSONS = window.SCHITA_LESSONS || [];
window.SCHITA_CATEGORIES = [
  { id: "warmups", title: { ro: "Încălzire", en: "Warm-ups" } },
  { id: "animals", title: { ro: "Animale", en: "Animals" } },
  { id: "objects", title: { ro: "Obiecte", en: "Everyday objects" } },
  { id: "faces",   title: { ro: "Fețe și personaje", en: "Faces & characters" } },
  { id: "shading", title: { ro: "Umbre și lumină", en: "Light & shadow" } }
];

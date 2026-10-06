// Lesson: Little Fox (v1.0.0) - front-facing sitting fox, chibi proportions, tail curling up on the right.
// Everything is symmetric around x=200 except the tail.
SCHITA_LESSONS.push({
  id: "fox-01",
  category: "animals",
  title: { ro: "Vulpița", en: "Little Fox" },
  difficulty: 2,
  minutes: 15,
  viewBox: "0 0 400 400",
  steps: [
    // 1. Head circle + centre cross
    {
      instruction: {
        ro: "Desenează un cerc ușor pentru cap. Adaugă o cruce ca să găsești mijlocul.",
        en: "Draw a light circle for the head. Add a cross to find the middle."
      },
      tip: { ro: "Apasă foarte ușor, pentru că vei șterge liniile mai târziu.", en: "Press very softly, because you will erase these lines later." },
      layers: [
        { kind: "construction", svg: "<circle cx='200' cy='135' r='65'/><path d='M200,60 L200,210'/><path d='M135,140 L265,140'/>" }
      ]
    },
    // 2. Body egg under the head
    {
      instruction: {
        ro: "Desenează sub cap un ou mare, pentru corp.",
        en: "Draw a big egg under the head for the body."
      },
      tip: { ro: "Oul se suprapune puțin cu capul și nu trebuie să fie perfect.", en: "The egg overlaps the head a little and does not need to be perfect." },
      layers: [
        { kind: "construction", svg: "<ellipse cx='200' cy='285' rx='70' ry='78'/>" }
      ]
    },
    // 3. Ears (rounded-tip triangles) + small inner V
    {
      instruction: {
        ro: "Desenează două urechi ca niște triunghiuri cu vârful rotunjit, sus pe cap. Adaugă un V mic în fiecare ureche.",
        en: "Draw two ears like triangles with rounded tips on top of the head. Add a small V inside each ear."
      },
      layers: [
        { kind: "line", svg: "<path d='M150,98 Q138,72 136,42 Q134,34 142,38 Q168,50 184,76'/><path d='M250,98 Q262,72 264,42 Q266,34 258,38 Q232,50 216,76'/>" },
        { kind: "detail", svg: "<path d='M152,88 Q148,68 146,56 Q162,62 174,78'/><path d='M248,88 Q252,68 254,56 Q238,62 226,78'/>" }
      ]
    },
    // 4. Face outline: fluffy cheeks with zigzag points, round chin, forehead arc
    {
      instruction: {
        ro: "Desenează obrajii pufoși cu vârfuri ascuțite, apoi bărbia rotundă. Fața seamănă cu o inimă lată.",
        en: "Draw the fluffy cheeks with pointy tips, then a round chin. The face looks like a wide heart."
      },
      layers: [
        { kind: "line", svg: "<path d='M150,98 Q131,114 128,140 L118,152 L130,156 L120,170 L138,172 Q162,204 200,207 Q238,204 262,172 L280,170 L270,156 L282,152 L272,140 Q269,114 250,98'/><path d='M184,76 Q200,68 216,76'/>" }
      ]
    },
    // 5. The "mask": line between the orange top of the head and the white cheeks
    {
      instruction: {
        ro: "Desenează sub ochi o linie ondulată, de la un obraz la celălalt. În mijloc coboară puțin.",
        en: "Draw a wavy line under the eyes, from one cheek to the other. It dips a little in the middle."
      },
      tip: { ro: "Linia desparte partea portocalie de obrajii albi.", en: "This line separates the orange part from the white cheeks." },
      layers: [
        { kind: "line", svg: "<path d='M130,156 Q156,148 182,158 Q194,160 200,165 Q206,160 218,158 Q244,148 270,156'/>" }
      ]
    },
    // 6. Face: eyes with sparkles (sparkles after pupils), nose, mouth
    {
      instruction: {
        ro: "Desenează doi ochi ovali pe linia ochilor și umple-i, dar lasă un punctuleț alb în fiecare. Adaugă nasul și o gură zâmbitoare.",
        en: "Draw two oval eyes on the eye line and fill them in, but leave a tiny white dot in each. Add the nose and a smiling mouth."
      },
      layers: [
        { kind: "detail", svg: "<ellipse class='solid' cx='172' cy='138' rx='9' ry='11'/><ellipse class='solid' cx='228' cy='138' rx='9' ry='11'/><circle class='paper' cx='175' cy='134' r='3'/><circle class='paper' cx='231' cy='134' r='3'/><path class='solid' d='M193,170 Q200,167 207,170 Q207,175 200,179 Q193,175 193,170 Z'/><path d='M200,179 L200,185 M188,186 Q194,192 200,185 Q206,192 212,186'/>" }
      ]
    },
    // 7. Body: sides, front legs, paws, white chest fluff, thigh hints
    {
      instruction: {
        ro: "Desenează corpul: două linii pe lateral, două picioruțe și labe mici. Fă în mijloc un puf alb pe piept.",
        en: "Draw the body: two side lines, two little legs and small paws. Add a fluffy white chest in the middle."
      },
      layers: [
        { kind: "line", svg: "<path d='M152,196 Q126,235 130,290 Q131,330 156,350'/><path d='M248,196 Q274,235 270,290 Q269,330 244,350'/><path d='M168,252 Q166,300 168,344'/><path d='M189,250 Q190,300 189,344'/><path d='M232,252 Q234,300 232,344'/><path d='M211,250 Q210,300 211,344'/><ellipse cx='178' cy='350' rx='21' ry='8'/><ellipse cx='222' cy='350' rx='21' ry='8'/><path d='M178,212 Q171,238 178,254 L189,250 L200,266 L211,250 L222,254 Q229,238 222,212'/>" },
        { kind: "detail", svg: "<path d='M138,296 Q162,296 167,326'/><path d='M262,296 Q238,296 233,326'/>" }
      ]
    },
    // 8. Fluffy tail curling up on the right, tuft points on the edge, zigzag for the white tip
    {
      instruction: {
        ro: "Desenează coada mare și pufoasă în dreapta, curbată în sus. Pune o linie zimțată aproape de vârf.",
        en: "Draw the big fluffy tail on the right, curling up. Add a zigzag line near the tip."
      },
      layers: [
        { kind: "line", svg: "<path d='M256,344 Q314,360 350,334 Q376,308 368,272 L378,260 Q362,254 360,230 L368,214 Q348,212 340,194 Q336,190 332,186 Q330,208 324,228 Q318,250 308,262 Q292,280 270,298'/>" },
        { kind: "detail", svg: "<path d='M360,230 L352,240 L344,228 L334,240 L324,228'/>" }
      ]
    },
    // 9. Pencil shading: light hatch for orange parts, dense for ears and socks
    {
      instruction: {
        ro: "Hașurează cu linii diagonale ușoare părțile portocalii. Apasă mai tare pe ciorăpei și în urechi.",
        en: "Shade the orange parts with light diagonal lines. Press harder on the socks and inside the ears."
      },
      tip: { ro: "Lasă obrajii, pieptul și vârful cozii albe.", en: "Leave the cheeks, chest and tail tip white." },
      layers: [
        { kind: "shade", svg: "<path fill='url(#hatch)' d='M130,156 L118,152 L128,140 Q131,114 150,98 Q138,72 136,42 Q134,34 142,38 Q168,50 184,76 Q200,68 216,76 Q232,50 258,38 Q266,34 264,42 Q262,72 250,98 Q269,114 272,140 L282,152 L270,156 Q244,148 218,158 Q206,160 200,165 Q194,160 182,158 Q156,148 130,156 Z'/><path fill='url(#hatch)' d='M152,196 Q126,235 130,290 Q131,330 156,350 L170,346 L189,344 Q190,300 189,250 L178,254 Q171,238 178,212 Z'/><path fill='url(#hatch)' d='M248,196 Q274,235 270,290 Q269,330 244,350 L230,346 L211,344 Q210,300 211,250 L222,254 Q229,238 222,212 Z'/><path fill='url(#hatch)' d='M360,230 Q362,254 378,260 L368,272 Q376,308 350,334 Q314,360 256,344 L262,320 L270,298 Q292,280 308,262 Q318,250 324,228 L334,240 L344,228 L352,240 Z'/><path fill='url(#hatch-dense)' d='M152,88 Q148,68 146,56 Q162,62 174,78 Z'/><path fill='url(#hatch-dense)' d='M248,88 Q252,68 254,56 Q238,62 226,78 Z'/><path fill='url(#hatch-dense)' d='M168,312 Q167,330 168,344 L189,344 Q189,330 189,312 Z'/><path fill='url(#hatch-dense)' d='M232,312 Q233,330 232,344 L211,344 Q211,330 211,312 Z'/><ellipse fill='url(#hatch-dense)' cx='178' cy='350' rx='21' ry='8'/><ellipse fill='url(#hatch-dense)' cx='222' cy='350' rx='21' ry='8'/>" }
      ]
    },
    // 10. Erase guides, add small fur strokes (cheeks, eyebrows, tail)
    {
      instruction: {
        ro: "Șterge liniile ajutătoare, apoi adaugă câteva linii mici de blană.",
        en: "Erase the light guide lines, then add a few small fur strokes."
      },
      tip: { ro: "Șterge încet, cu colțul radierei, ca să nu strici liniile bune.", en: "Erase gently with the corner of the eraser so you keep the good lines." },
      eraseConstruction: true,
      layers: [
        { kind: "detail", svg: "<path d='M150,168 L138,172'/><path d='M156,180 L146,186'/><path d='M250,168 L262,172'/><path d='M244,180 L254,186'/><path d='M164,124 L160,117'/><path d='M172,121 L170,113'/><path d='M236,124 L240,117'/><path d='M228,121 L230,113'/><path d='M340,290 L332,298'/><path d='M350,310 L342,318'/>" }
      ]
    }
  ],
  techniqueTip: {
    ro: "Ai început cu forme simple și ușoare, cerc și ou, și abia la final ai apăsat mai tare. Așa orice desen devine mai ușor.",
    en: "You started with light, simple shapes, a circle and an egg, and only pressed harder at the end. This makes any drawing easier."
  },
  makeItYours: {
    ro: [
      "Desenează o vulpiță adormită, cu ochii închiși.",
      "Pune-o în zăpadă, sub lună, și dă-i o eșarfă sau o coroniță de flori."
    ],
    en: [
      "Draw a sleepy fox with closed eyes.",
      "Put her in the snow under the moon, and give her a scarf or a flower crown."
    ]
  }
});

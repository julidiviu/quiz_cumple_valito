export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: number;
  /**
   * Ruta pública de la imagen o GIF de la pregunta.
   * Ejemplo: "/quiz/01.gif" (el archivo vive en public/quiz/01.gif).
   * Si queda en null, la interfaz dibuja el arte de transmisión.
   */
  image?: string | null;
  /**
   * Varias imágenes para la misma pregunta (se muestran en tiras verticales).
   * Ejemplo: ["/quiz/1/1.webp", "/quiz/1/2.webp", "/quiz/1/3.webp"].
   */
  images?: string[] | null;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question:
      "¿Qué integrante inició el proyecto de debuts en solitario de LOONA en octubre de 2016?",
    options: ["Hyunjin", "Haseul", "Heejin", "Kim Lip"],
    answer: 2,
    images: ["/quiz/1/1.webp", "/quiz/1/2.webp", "/quiz/1/3.webp"],
  },
  {
    id: 2,
    question:
      "¿En qué año debutó LOONA como grupo completo (OT12) y con qué tema principal?",
    options: [
      "2016 con ViViD",
      "2017 con Love Cherry Motion",
      "2018 con Hi High",
      "2019 con Butterfly",
    ],
    answer: 2,
    images: ["/quiz/2/1.webp", "/quiz/2/2.webp", "/quiz/2/3.gif"],
  },
  {
    id: 3,
    question:
      "¿A qué edad debutó Yeojin (la integrante más joven) en enero de 2017?",
    options: ["12 años", "14 años", "16 años", "15 años"],
    answer: 1,
    images: ["/quiz/3/1.webp", "/quiz/3/2.webp", "/quiz/3/3.webp"],
  },
  {
    id: 4,
    question: "¿Con qué temas debutaron Jinsoul e Yves en solitario?",
    options: [
      "Jinsoul: Singing in the Rain / Yves: new",
      "Jinsoul: Eclipse / Yves: Heart Attack",
      "Jinsoul: Love Cherry Motion / Yves: Egoist",
      "Jinsoul: Singing in the Rain / Yves: One & Only",
    ],
    answer: 0,
    images: ["/quiz/4/1.webp", "/quiz/4/2.gif", "/quiz/4/3.webp"],
  },
  {
    id: 5,
    question:
      "¿En qué año salió 'Butterfly' y cuál fue su último mini álbum en 2022?",
    options: [
      "2018 / [+ +]",
      "2019 / Flip That",
      "2020 / [#]",
      "2021 / [&]",
    ],
    answer: 1,
    images: ["/quiz/5/1.webp", "/quiz/5/2.webp"],
  },
  {
    id: 6,
    question: "¿Por qué 'So What' es considerada una 'canción manifestación'?",
    options: [
      "Exige cambios a la agencia",
      "Llama a 'quemar la luna' y romper estereotipos",
      "Fue grabada en una protesta real",
      "Fue su primer tema 100% en inglés",
    ],
    answer: 1,
    images: ["/quiz/6/1.webp", "/quiz/6/2.webp", "/quiz/6/3.webp"],
  },
  {
    id: 7,
    question:
      "¿Cuál es el proyecto de Lost Media más famoso de LOONA que nunca vio la luz?",
    options: [
      "LOONA the Ballad (La Maison)",
      "Butterfly en español",
      "favOriTe versión alternada",
      "LOONA 1/3 Repackage",
    ],
    answer: 0,
    images: ["/quiz/7/1.webp", "/quiz/7/2.gif"],
  },
  {
    id: 8,
    question: "¿Cuántas integrantes son en total y a qué unidad pertenece Haseul?",
    options: [
      "10 / Odd Eye Circle",
      "12 / LOONA 1/3",
      "12 / LOONA yyxy",
      "11 / LOONA 1/3",
    ],
    answer: 1,
    images: ["/quiz/8/1.webp", "/quiz/8/2.webp", "/quiz/8/3.webp"],
  },
  {
    id: 9,
    question:
      "¿Cuáles son los superpoderes de la unidad Odd Eye Circle (Kim Lip, Jinsoul, Choerry)?",
    options: [
      "Fuego, Agua y Tierra",
      "Tiempo/Velocidad, Teletransporte y Viaje dimensional",
      "Invisibilidad, Mente y Vuelo",
      "Telequinesis, Ilusiones y Clima",
    ],
    answer: 1,
    images: ["/quiz/9/1.webp", "/quiz/9/2.webp", "/quiz/9/3.webp"],
  },
  {
    id: 10,
    question:
      "¿Cuáles son los símbolos de Yves (Animal / Fruta / Color) y el origen de su nombre?",
    options: [
      "Cisne / Manzana / Burgundy — Ref. a Eva del Edén",
      "Pingüino / Fresa / Durazno — Ref. a Yves Saint Laurent",
      "Mariposa / Piña / Verde Edén — Palabra en francés",
      "Lobo / Ciruela / Gris — Diosa griega",
    ],
    answer: 0,
    images: ["/quiz/10/1.webp", "/quiz/10/2.webp", "/quiz/10/3.webp"],
  },
  {
    id: 11,
    question: "¿Qué integrante es el androide/robot en el lore?",
    options: ["Heejin", "ViVi", "Yeojin", "Olivia Hye"],
    answer: 1,
    images: ["/quiz/11/1.webp", "/quiz/11/2.webp", "/quiz/11/3.webp"],
  },
  {
    id: 12,
    question:
      "¿Quién fue abandonada en el Edén tras la huida de Yves, Chuu y Go Won?",
    options: ["Chuu", "Go Won", "Olivia Hye", "ViVi"],
    answer: 2,
    images: ["/quiz/12/1.webp", "/quiz/12/2.webp", "/quiz/12/3.webp"],
  },
  {
    id: 13,
    question:
      "¿Por qué se ve a Yves como la figura 'rebelde/antagonista' inicial en el Edén?",
    options: [
      "Destruyó el LOONAverse",
      "Tentó a las demás a morder la fruta y dejó atrás a Olivia Hye",
      "Apagó a ViVi",
      "Robó el color de Kim Lip",
    ],
    answer: 1,
    image: "/quiz/13/1.webp",
  },
  {
    id: 14,
    question:
      "¿En qué año ocurrió la expulsión de Chuu que marcó el fin de la era original del grupo?",
    options: ["2020", "2021", "2022", "2023"],
    answer: 2,
    images: ["/quiz/14/1.webp", "/quiz/14/2.webp", "/quiz/14/3.webp"],
  },
  {
    id: 15,
    question:
      "¿En qué ciudad internacional se grabó el MV de 'Around You', el debut en solitario de Hyunjin?",
    options: [
      "París, Francia",
      "Tokio, Japón",
      "Londres, Reino Unido",
      "Seúl, Corea del Sur",
    ],
    answer: 1,
    images: ["/quiz/15/1.webp", "/quiz/15/2.webp"],
  },
  {
    id: 16,
    question:
      "Hyunjin fue la segunda integrante revelada (noviembre de 2016). ¿Cuál es su animal oficial en el lore?",
    options: ["Conejo", "Gato", "Cisne", "Lobo"],
    answer: 1,
    images: ["/quiz/16/1.webp"],
  },
];

export const QUESTION_LETTERS = ["A", "B", "C", "D"] as const;

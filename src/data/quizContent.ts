export type QuizGift = {
  /**
   * Ruta pública de la foto del regalo.
   * Ejemplo: "/quiz/regalo.jpg" (el archivo vive en public/quiz/regalo.jpg).
   * Si queda en null, se muestra la caja ilustrada.
   */
  imageSrc?: string | null;
  alt: string;
  message: string;
};

export const quizGift: QuizGift = {
  imageSrc: null,
  alt: "Segundo regalo de cumpleaños para Valito",
  message:
    "Felicidades Valito por terminar el quiz. Ahora estás lista para recibir tu segundo regalo. Está empacado en una caja como esta; ojalá te guste :3",
};

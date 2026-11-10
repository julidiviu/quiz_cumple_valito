# Imágenes del quiz

Coloca aquí las imágenes o GIFs de las preguntas y del regalo.

## Preguntas

Agrega la ruta en `src/data/questions.ts`:

```ts
{
  id: 1,
  question: "...",
  options: ["...", "...", "...", "..."],
  answer: 2,
  image: "/quiz/01.gif",
}
```

Varias imágenes para una misma pregunta van en `images` y se muestran como una tira de paneles:

```ts
images: ["/quiz/1/1.webp", "/quiz/1/2.webp", "/quiz/1/3.webp"],
```

Si `image` e `images` quedan vacíos, se muestra el arte de transmisión generado por la interfaz.

## Regalo

Agrega la ruta en `src/data/quizContent.ts`:

```ts
export const quizGift: QuizGift = {
  imageSrc: "/quiz/regalo.jpg",
  alt: "Segundo regalo de cumpleaños para Valito",
  message: "...",
};
```

Recomendación: usa imágenes horizontales de al menos 1200 px de ancho para las preguntas y una foto vertical u horizontal de buena calidad para el regalo.

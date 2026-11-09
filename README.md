# Quiz de Valito

Quiz de cumpleaños sobre **LOONA** — 16 preguntas, sin límite de tiempo y con un
segundo regalo al final. Es una SPA estática hecha con Next.js: todo el estado vive
en el navegador, no hay backend ni base de datos.

> Proyecto personal/fan, sin relación oficial con LOONA ni con sus agencias.

**Stack:** Next.js 16.4.5 · React 19.3 · TypeScript 5 · Tailwind CSS 4 · Turbopack

---

## 1. Qué hace la aplicación

1. Pantalla de bienvenida con animación de "transmisión".
2. Quiz de 16 preguntas con navegación libre entre preguntas.
3. Se puede cambiar una respuesta ya elegida antes de terminar.
4. El botón **Ver resultado** se habilita solo cuando están todas respondidas.
5. Pantalla final con puntaje, resumen pregunta por pregunta y el segundo regalo.
6. Botón **Volver a jugar** que reinicia todo.

No hay login, envío de datos ni guardado: **si recargas la página, el quiz vuelve al
inicio**.

---

## 2. Poner el proyecto en marcha

### Requisitos

- Node.js **20.9 o superior** (requisito de Next.js 16).
- npm (el repo trae `package-lock.json`).

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar el servidor de desarrollo
npm run dev
```

Abre <http://localhost:3000>. Los cambios en `src/` se reflejan en caliente.

### Scripts disponibles

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con Turbopack. |
| `npm run build` | Build de producción + typecheck. |
| `npm run start` | Sirve el build de producción (requiere `build` antes). |
| `npm run lint` | ESLint con la config de Next. |
| `npx tsc --noEmit` | Typecheck suelto (no hay script propio). |

No hay tests automatizados todavía. Antes de dar un cambio por terminado:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

El build actual prerenderiza `/` y `/_not-found` como páginas estáticas.

---

## 3. Tecnologías y por qué están

| Tecnología | Uso en este proyecto |
| --- | --- |
| **Next.js 16 (App Router)** | Estructura de la app, renderizado y build. Usa Turbopack por defecto. |
| **React 19** | Componentes, estado del quiz y efectos. |
| **React Compiler** | Memoización automática (`reactCompiler: true`). Evita `useMemo`/`useCallback` preventivos. |
| **TypeScript** | Tipos de preguntas, respuestas y props. `strict: true`. |
| **Tailwind CSS 4** | Estilos utilitarios. Se carga con `@tailwindcss/turbopack`, no con PostCSS. |
| **next/font** | Fuentes Archivo, Instrument Serif y JetBrains Mono, servidas sin pedidos externos. |
| **ESLint 9** | Reglas de Next Core Web Vitals + TypeScript. |

Decisiones de configuración que conviene conocer (`next.config.ts`):

- `cacheComponents: true` y `partialPrefetching: true`: modelo de renderizado de
  Next 16. La app es estática, así que no afecta el flujo actual.
- `reactCompiler: true`: no hace falta micro-optimizar renders a mano.
- `turbopack.rules`: registra el loader de Tailwind para archivos CSS.

> **No edites `next-env.d.ts`**: es generado por Next. `.next/` y `*.tsbuildinfo`
> también son artefactos.

---

## 4. Estructura del proyecto

```txt
src/
├── app/
│   ├── layout.tsx        Layout raíz: fuentes, metadata, header y footer
│   ├── page.tsx          Página "/": importa datos y monta el quiz
│   └── globals.css       Tokens de Tailwind, estilos base y animaciones
├── components/
│   ├── layout/           SiteHeader, SiteFooter
│   ├── quiz/             Todas las piezas del quiz
│   │   ├── QuizExperience.tsx   Orquestador cliente (fases, teclado, boot)
│   │   ├── WelcomeScreen.tsx    Pantalla inicial
│   │   ├── QuestionDeck.tsx     Carrusel 3D de tarjetas
│   │   ├── QuestionCard.tsx     Tarjeta de una pregunta
│   │   ├── AnswerGrid.tsx       Opciones en cuadrícula 2×2
│   │   ├── AnswerButton.tsx     Botón de una opción
│   │   ├── MediaFrame.tsx       Imagen o arte generado de la pregunta
│   │   ├── QuizProgress.tsx     Barra de progreso
│   │   ├── FinalScreen.tsx      Resultado + regalo + resumen
│   │   ├── GiftReveal.tsx       Bloque del regalo
│   │   ├── GiftIllustration.tsx Caja de regalo dibujada en SVG
│   │   ├── AnswerSummary.tsx    Revisión de todas las respuestas
│   │   ├── IntroBoot.tsx        Animación de entrada
│   │   ├── TransmissionBoot.tsx Animación al empezar el quiz
│   │   └── OrbitDiagram.tsx     Ilustración orbital de la bienvenida
│   └── ui/               Piezas reutilizables (botones, tags, iconos)
├── data/
│   ├── questions.ts      Las 16 preguntas y el tipo QuizQuestion
│   └── quizContent.ts    Mensaje e imagen del regalo
├── hooks/
│   └── useQuiz.ts        Estado y reglas del quiz
└── lib/
    ├── quiz.ts           Helpers puros (puntaje, formato)
    └── cn.ts             Une clases de Tailwind sin dependencias
```

Alias de imports: `@/*` apunta a `src/*`.

```ts
import { useQuiz } from "@/hooks/useQuiz"; // ✅
import { useQuiz } from "../../hooks/useQuiz"; // ❌ evitar
```

---

## 5. Cómo fluye la aplicación

```txt
src/app/page.tsx (Server Component)
        │  importa quizQuestions y quizGift
        ▼
<QuizExperience> ("use client")
        │  usa
        ▼
useQuiz(questions)  ── estado: phase, currentIndex, answers
        │
        ├── phase "welcome" → WelcomeScreen + IntroBoot
        ├── phase "quiz"    → QuizProgress + QuestionDeck
        └── phase "result"  → FinalScreen + AnswerSummary + GiftReveal
```

### El estado (`src/hooks/useQuiz.ts`)

```ts
phase: "welcome" | "quiz" | "result"
currentIndex: number          // pregunta visible
answers: (number | null)[]    // índice de opción elegida por pregunta
```

Reglas importantes:

- `selectAnswer(i)` guarda `i` en `answers[currentIndex]`; se puede sobrescribir.
- `goNext()` no avanza si la pregunta actual no está respondida.
- `goPrevious()` siempre permite volver (si no es la primera).
- `allAnswered` es `true` cuando ninguna posición vale `null`.
- `restart()` limpia respuestas, vuelve al índice 0 y a `"welcome"`.

`correctCount` se calcula comparando `answers[i] === questions[i].answer`.

### Interacción

- Teclado: `1`–`4` eligen opción, `←`/`→` navegan. Se ignora si el foco está en un
  input, textarea, select o elemento editable.
- Al cambiar de fase se hace scroll al inicio.
- Las animaciones de boot se saltan si el usuario tiene
  `prefers-reduced-motion: reduce`.

---

## 6. Datos: preguntas y regalo

### Una pregunta

`src/data/questions.ts`:

```ts
export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: number;        // ⚠️ índice 0-based de options
  image?: string | null; // ruta pública, o null para arte generado
};
```

Ejemplo real:

```ts
{
  id: 1,
  question: "¿Qué integrante inició el proyecto de debuts...?",
  options: ["Hyunjin", "Haseul", "Heejin", "Kim Lip"],
  answer: 2, // "Heejin"
  image: null,
}
```

Reglas:

- `answer` es un **índice**, no el texto de la opción.
- `id` debe ser único (se usa como `key` de React).
- La UI está pensada para **4 opciones** (`A`–`D`, teclas `1`–`4`, grilla 2×2).
  Si agregas más, revisa `QUESTION_LETTERS` y los atajos.
- No hace falta tocar componentes al agregar preguntas: el total, la barra de
  progreso y el resultado se derivan de `quizQuestions.length`.

### Imágenes de preguntas

1. Copia el archivo a `public/quiz/`, por ejemplo `public/quiz/01.gif`.
2. Referéncialo con ruta pública:

```ts
image: "/quiz/01.gif",
```

Si `image` es `null`, `MediaFrame` dibuja el arte de "transmisión" con CSS/SVG.
Recomendación del proyecto: imágenes horizontales de al menos 1200 px.

### El regalo

`src/data/quizContent.ts`:

```ts
export const quizGift: QuizGift = {
  imageSrc: null, // o "/quiz/regalo.jpg"
  alt: "Descripción de la foto",
  message: "Felicidades Valito...",
};
```

Con `imageSrc: null` se muestra `GiftIllustration`, una caja dibujada en SVG.

---

## 7. Estilos y sistema visual

Tailwind 4 se configura desde CSS, no desde un archivo `tailwind.config`:

- Variables en `:root` (`--ink`, `--pink`, `--petal`, etc.).
- Mapeo a utilidades dentro de `@theme inline` en `src/app/globals.css`:

```css
@theme inline {
  --color-ink: var(--ink);
  --color-pink: var(--pink);
  --font-serif: var(--font-instrument);
}
```

Eso habilita clases como `text-ink`, `bg-petal`, `border-pink`, `font-serif`.

### Clases propias que debes reutilizar

| Clase | Para qué |
| --- | --- |
| `.neo-panel` | Panel con borde grueso y sombra dura. |
| `.neo-panel-pink` | Variante rosa del panel. |
| `.mono-label` | Etiqueta pequeña en mayúsculas con tracking. |
| `.mono-caption` | Texto monoespaciado secundario. |
| `.display-title` | Título grande con tracking negativo. |
| `.soft-serif` | Serif itálica (Instrument Serif). |
| `.grid-fade` | Máscara de degradado. |

La estética es **neo-brutalista**: bordes de 2 px, sombras sin blur
(`shadow-[4px_4px_0_0_var(--ink)]`), tipografía fuerte y acentos rosa/lila. Si
agregas un color nuevo, decláralo en `:root` y en `@theme inline`; evita hex
sueltos en los componentes.

### Componentes de UI

- `SquareButton`: variantes `primary`, `secondary`, `dark`, `ghost`; tamaños `sm`,
  `md`, `lg`.
- `TechnicalTag`: tonos `solid`, `outline`, `pink`, `ghost`; prop `dot`.
- `Icons.tsx`: set de iconos SVG que heredan `currentColor`.

Todo el texto visible está en español (`<html lang="es">`). Mantenlo así.

---

## 8. Accesibilidad ya resuelta

Si modificas el quiz, no rompas esto:

- Botones reales (`<button>`), no `div` con `onClick`.
- `aria-pressed` en las opciones y `aria-label` en los controles de navegación.
- Barra de progreso con `role="progressbar"` y `aria-valuenow`.
- Anuncio de cambio de pregunta con `aria-live="polite"`.
- `aria-hidden` + `inert` en las tarjetas que no están activas.
- Foco visible con `focus-visible:ring-*`.
- `prefers-reduced-motion` cubierto en CSS y en JS (`matchMedia`).

---

## 9. Particularidades de Next 16 en este repo

- **Turbopack** es el bundler por defecto en `dev` y `build`.
- **Cache Components** está activo. Si algún día agregas datos dinámicos en un
  Server Component (`cookies()`, `headers()`, `searchParams`, `params`,
  `Math.random()`, `Date.now()`), deben ir dentro de `<Suspense>` o de
  `"use cache"`; si no, el build falla. Hoy la app no usa ninguno.
- **Tipos de rutas generados**: `LayoutProps<"/">` y `PageProps` los crea Next.
  Después de agregar rutas hay que correr `next dev` o `next build`.
- La documentación instalada y versionada está en
  `node_modules/next/dist/docs/`. Es la fuente correcta si dudas de una API.
- Para agentes de IA hay instrucciones adicionales en `AGENTS.md`.

---

## 10. Cómo desplegarlo

La app es estática y no necesita variables de entorno.

**Opción recomendada: Vercel**

1. Sube el repo a GitHub.
2. Importa el repo en Vercel.
3. Vercel detecta Next.js y ejecuta `npm run build` automáticamente.

**Opción manual (VPS, Docker, etc.)**

```bash
npm ci
npm run build
npm run start
```

Para GitHub Pages se necesitaría configurar exportación estática (`output:
"export"`), `basePath` y revisar la compatibilidad con Cache Components. No está
configurado en este repo.

---

## 11. Ideas para seguir desarrollando

Ordenadas de menor a mayor esfuerzo:

1. **Poner las imágenes reales** en `public/quiz/` y rellenar `image` / `imageSrc`.
2. **Cambiar preguntas, regalo o textos**: todo está en `src/data/`.
3. **Guardar progreso** en `localStorage` dentro de `useQuiz` (hoy se pierde al
   recargar).
4. **Agregar temporizador** por pregunta o total: nuevo estado en `useQuiz` y UI
   en `QuizProgress`.
5. **Barajar preguntas u opciones**: cuidado, `answer` es un índice. Si barajas
   opciones, debes remapear el índice correcto o cambiar el modelo a
   `{ text, correct }`.
6. **Tests**: Vitest para `src/lib/quiz.ts` (funciones puras) y Playwright para el
   flujo bienvenida → responder → resultado.
7. **Varios quizzes**: mover los datos a `src/app/quiz/[slug]/` con
   `generateStaticParams`; requiere revisar Cache Components.
8. **Persistencia o ranking**: necesitaría backend/API y una decisión de privacidad
   (el proyecto actual no envía datos de nadie).

---

## 12. Créditos

Hecho con cariño para Valito. LOONA, sus integrantes, canciones y marcas
pertenecen a sus respectivos dueños. Este es un proyecto fan sin fines oficiales.

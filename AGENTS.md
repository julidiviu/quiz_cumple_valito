<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Qué es esto

Quiz de 16 preguntas sobre LOONA, regalo de cumpleaños para "Valito". SPA estática:
todo el estado vive en React en el cliente, no hay backend, base de datos, rutas API
ni persistencia. Recargar la página reinicia el quiz.

## Comandos (Windows / PowerShell, npm)

```bash
npm run dev            # next dev, Turbopack
npm run build          # next build + typecheck (falla si hay errores TS)
npm run start          # servir el build
npm run lint           # eslint flat config, sin argumentos
npx tsc --noEmit       # typecheck suelto (no hay script "typecheck")
```

No hay suite de tests ni runner configurado. Verificación mínima antes de cerrar:
`npm run lint`, `npx tsc --noEmit` y `npm run build`; probar el flujo en `npm run dev`.
El build actual prerenderiza `/` como estático (○), sin errores de Cache Components.

## Arquitectura

- `src/app/page.tsx` es Server Component: solo importa datos estáticos y renderiza
  `<QuizExperience>`.
- `src/components/quiz/QuizExperience.tsx` es el único orquestador cliente
  (`"use client"`): fases `welcome` → `quiz` → `result`, atajos de teclado y boots
  animados. La lógica de estado está en `src/hooks/useQuiz.ts`; no la dupliques en
  componentes.
- `src/lib/quiz.ts` contiene los helpers puros (contar respondidas/correctas,
  formato). Scoring nuevo va ahí, no dentro de JSX.
- Los datos de contenido son la fuente de verdad:
  - `src/data/questions.ts`: `answer` es índice 0-based de `options`.
  - `src/data/quizContent.ts`: imagen/mensaje del regalo.
  - Imágenes en `public/quiz/` y se referencian con ruta pública (`/quiz/01.gif`).
    Si `image`/`imageSrc` es `null`, la UI dibuja el arte generado; no hace falta
    tocar componentes para cambiar contenido.
- Alias de imports: `@/*` → `./src/*` (usar siempre, no rutas relativas largas).

## Estilos (Tailwind v4, sin config)

- Tailwind se carga vía loader de Turbopack (`@tailwindcss/turbopack` en
  `next.config.ts`); **no** hay `tailwind.config.*` ni `postcss.config.*`.
- Colores y fuentes se declaran en `src/app/globals.css` dentro de `@theme inline`
  (`--color-ink`, `--color-pink`, `--color-petal`, etc.). Usa esos tokens
  (`text-ink`, `bg-petal`, `border-ink`) en vez de hex arbitrarios.
- Clases reutilizables ya definidas: `.neo-panel`, `.neo-panel-pink`, `.mono-label`,
  `.mono-caption`, `.display-title`, `.soft-serif`, `.grid-fade`, `.no-scrollbar`.
  Reúsalas antes de inventar utilidades.
- Estética neo-brutalista: bordes `border-2 border-ink`, sombras duras
  `shadow-[6px_6px_0_0_var(--ink)]`, tipografía Archivo (sans) / Instrument Serif
  (cursiva) / JetBrains Mono. Definidas en `src/app/layout.tsx` con `next/font`.
- Todo el copy de UI va en español (`lang="es"`).

## Next 16: cosas que rompen si las ignoras

- `next.config.ts` tiene `cacheComponents: true`, `partialPrefetching: true` y
  `reactCompiler: true`. Si agregas lecturas de runtime (`cookies()`, `headers()`,
  `searchParams`, `params`), `Math.random()` o `Date.now()` en un Server Component,
  deben ir dentro de `<Suspense>` o de `"use cache"`; si no, `next dev`/`build`
  fallan. Hoy la app no las usa: no introduzcas render dinámico sin necesidad.
- `LayoutProps<"/">` (y `PageProps`) son tipos globales generados por Next. Tras
  agregar o cambiar rutas hay que correr `next dev`/`next build` para regenerarlos.
- No confíes en la API de Next de memoria: consulta `node_modules/next/dist/docs/`
  (guía relevante) antes de usar APIs nuevas.

## No rompas esto

- Atajos de teclado en `QuizExperience`: `1`–`4` seleccionan respuesta, `←`/`→`
  navegan. No los elimines al refactorizar.
- `prefers-reduced-motion` se respeta en dos sitios: la media query de
  `globals.css` (desactiva animaciones) y los `matchMedia` de `QuizExperience` /
  `QuestionDeck`. Cualquier animación nueva debe quedar cubierta.
- El bloque `<!-- BEGIN:nextjs-agent-rules -->` lo reescribe `next dev`; no lo
  edites ni lo traduzcas.

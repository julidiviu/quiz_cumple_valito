import type { QuizQuestion } from "@/data/questions";
import type { QuizGift } from "@/data/quizContent";
import { AnswerSummary } from "@/components/quiz/AnswerSummary";
import { GiftReveal } from "@/components/quiz/GiftReveal";
import { RefreshIcon, SparkleIcon } from "@/components/ui/Icons";
import { SquareButton } from "@/components/ui/SquareButton";
import { TechnicalTag } from "@/components/ui/TechnicalTag";
import { cn } from "@/lib/cn";
import type { QuizAnswer } from "@/lib/quiz";

type FinalScreenProps = {
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  correctCount: number;
  gift: QuizGift;
  onRestart: () => void;
};

export function FinalScreen({
  questions,
  answers,
  correctCount,
  gift,
  onRestart,
}: FinalScreenProps) {
  return (
    <section
      aria-labelledby="result-title"
      className="mx-auto w-full max-w-[1180px] flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <TechnicalTag tone="solid" dot>
          Transmisión completa
        </TechnicalTag>
        <span className="mono-label flex items-center gap-1.5 text-[0.52rem] text-ink-soft">
          <SparkleIcon className="h-3.5 w-3.5 text-pink-deep" />
          Fin de la señal · TX-001
        </span>
      </div>

      <h1
        id="result-title"
        className="display-title max-w-[12ch] text-[clamp(2.8rem,6.4vw,5.8rem)] text-ink"
      >
        Resultado del quiz
      </h1>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.67fr_1.33fr] lg:items-stretch">
        <div className="flex flex-col justify-between border-2 border-ink bg-ink p-5 text-paper shadow-[6px_6px_0_0_var(--pink)] sm:p-6">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="mono-label text-[0.52rem] text-paper/60">
                {"// Resultado"}
              </span>
              <span className="signal-dot h-2 w-2 rounded-full bg-pink" />
            </div>

            <p className="mt-7 flex items-end gap-2">
              <span className="text-[clamp(4.4rem,9vw,7.6rem)] font-extrabold leading-[0.8] tracking-[-0.07em] text-pink">
                {correctCount}
              </span>
              <span className="mb-2 text-2xl font-bold text-paper/50 sm:text-3xl">
                / {questions.length}
              </span>
            </p>

            <p className="mono-label mt-4 text-[0.56rem] text-paper/70">
              Respuestas correctas
            </p>
          </div>

          <div className="mt-8">
            <div className="flex gap-1">
              {questions.map((question, index) => (
                <span
                  key={question.id}
                  aria-hidden="true"
                  className={cn(
                    "h-2.5 flex-1 border",
                    answers[index] === question.answer
                      ? "border-pink bg-pink"
                      : "border-paper/25 bg-transparent",
                  )}
                />
              ))}
            </div>
            <p className="mono-label mt-3 text-[0.46rem] leading-relaxed text-paper/45">
              Bloque fucsia = respuesta correcta.
              <br />
              Abajo está el detalle de cada pregunta.
            </p>
          </div>
        </div>

        <GiftReveal gift={gift} />
      </div>

      <AnswerSummary questions={questions} answers={answers} />

      <div className="mt-10 flex flex-col items-center gap-4 border-t-2 border-ink/15 pt-8 text-center">
        <p className="mono-label text-[0.52rem] text-ink-soft">
          {"// Fin de la transmisión · Gracias por jugar"}
        </p>
        <SquareButton size="lg" onClick={onRestart}>
          <RefreshIcon className="h-4 w-4" />
          Volver a jugar
        </SquareButton>
      </div>
    </section>
  );
}

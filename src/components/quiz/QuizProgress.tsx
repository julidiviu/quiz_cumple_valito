import type { QuizAnswer } from "@/lib/quiz";
import { cn } from "@/lib/cn";
import { formatQuestionNumber } from "@/lib/quiz";
import { TechnicalTag } from "@/components/ui/TechnicalTag";

type QuizProgressProps = {
  answers: QuizAnswer[];
  currentIndex: number;
};

export function QuizProgress({ answers, currentIndex }: QuizProgressProps) {
  const total = answers.length;
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const current = formatQuestionNumber(currentIndex);

  return (
    <div className="mx-auto w-full max-w-[1040px]">
      <div className="mb-2.5 flex items-end justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="signal-dot h-2 w-2 rounded-full bg-pink"
          />
          <TechnicalTag tone="ghost" className="px-0 text-ink">
            {"// Transmisión en curso"}
          </TechnicalTag>
        </div>
        <p className="mono-label text-right text-[0.55rem] text-ink-soft">
          Pregunta <span className="text-ink">{current}</span> /{" "}
          {String(total).padStart(2, "0")}
        </p>
      </div>

      <div
        role="progressbar"
        aria-label="Progreso del quiz"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answeredCount}
        aria-valuetext={`${answeredCount} de ${total} preguntas respondidas`}
        className="flex gap-1 sm:gap-1.5"
      >
        {answers.map((answer, index) => {
          const isAnswered = answer !== null;
          const isCurrent = index === currentIndex;

          return (
            <span
              key={index}
              aria-hidden="true"
              className={cn(
                "h-2.5 flex-1 border transition-colors duration-300 sm:h-3",
                isAnswered
                  ? "border-ink bg-pink"
                  : "border-ink/30 bg-paper/70",
                isCurrent && "segment-current border-ink",
                isCurrent && !isAnswered && "bg-petal",
              )}
            />
          );
        })}
      </div>

      <div className="mt-2 hidden items-center justify-between gap-4 sm:flex">
        <span className="mono-label text-[0.5rem] text-ink-soft/80">
          Órbita de respuestas
        </span>
        <span className="mono-label text-[0.5rem] text-ink-soft">
          {String(answeredCount).padStart(2, "0")} respondidas
        </span>
      </div>
    </div>
  );
}

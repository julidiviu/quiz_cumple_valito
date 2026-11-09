import type { QuizQuestion } from "@/data/questions";
import { AnswerGrid } from "@/components/quiz/AnswerGrid";
import { MediaFrame } from "@/components/quiz/MediaFrame";
import { CheckIcon, SparkleIcon } from "@/components/ui/Icons";
import { TechnicalTag } from "@/components/ui/TechnicalTag";
import { formatQuestionNumber } from "@/lib/quiz";

type QuestionCardProps = {
  question: QuizQuestion;
  index: number;
  total: number;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
};

export function QuestionCard({
  question,
  index,
  total,
  selectedAnswer,
  onSelect,
}: QuestionCardProps) {
  const headingId = `question-${question.id}`;
  const number = formatQuestionNumber(index);
  const answered = selectedAnswer !== null;

  return (
    <section
      aria-labelledby={headingId}
      className="neo-panel relative flex h-full flex-col rounded-[26px] p-3.5 sm:p-5 lg:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-4 hidden items-center gap-1.5 text-pink-deep/40 sm:flex"
      >
        <SparkleIcon className="h-3.5 w-3.5" />
        <span className="mono-label text-[0.5rem]">Señal {number}</span>
      </div>

      <div className="mb-3 flex items-center justify-between gap-3 pr-0 sm:mb-4 sm:pr-24">
        <TechnicalTag tone="solid" dot>
          {"// Pregunta "}
          {number}
        </TechnicalTag>
        <span className="mono-label text-[0.52rem] text-ink-soft">
          {number} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <MediaFrame question={question} index={index} />

      <div className="flex flex-1 flex-col px-0.5 pt-4 sm:pt-5">
        <h2
          id={headingId}
          className="max-w-[42ch] text-[1.23rem] font-bold leading-[1.14] tracking-[-0.025em] text-ink sm:text-[1.55rem] lg:text-[1.7rem]"
        >
          {question.question}
        </h2>

        <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
          <span className="mono-label text-[0.55rem] text-ink-soft">
            {"// Elige una respuesta"}
          </span>
          <span className="mono-label hidden text-[0.5rem] text-ink-soft/70 sm:block">
            2 × 2
          </span>
        </div>

        <div className="mt-2">
          <AnswerGrid
            question={question}
            selectedAnswer={selectedAnswer}
            onSelect={onSelect}
          />
        </div>

        <div className="mt-4 flex min-h-6 items-center gap-2 border-t border-ink/15 pt-3 sm:mt-5">
          {answered ? (
            <>
              <CheckIcon className="h-3.5 w-3.5 text-pink-deep" />
              <p className="mono-label text-[0.52rem] text-pink-deep">
                Respuesta guardada · puedes cambiarla
              </p>
            </>
          ) : (
            <>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 bg-ink/30"
              />
              <p className="mono-label text-[0.52rem] text-ink-soft">
                Responde para desbloquear la siguiente
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

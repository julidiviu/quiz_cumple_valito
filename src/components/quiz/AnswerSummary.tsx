import type { QuizQuestion } from "@/data/questions";
import { CheckIcon, CloseIcon } from "@/components/ui/Icons";
import type { QuizAnswer } from "@/lib/quiz";
import { cn } from "@/lib/cn";
import { formatOption, formatQuestionNumber } from "@/lib/quiz";

type AnswerSummaryProps = {
  questions: QuizQuestion[];
  answers: QuizAnswer[];
};

export function AnswerSummary({ questions, answers }: AnswerSummaryProps) {
  return (
    <section aria-labelledby="summary-title" className="mt-10 sm:mt-14">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mono-label mb-2 text-[0.55rem] text-pink-deep">
            {"// Resumen de respuestas"}
          </p>
          <h2
            id="summary-title"
            className="display-title text-3xl text-ink sm:text-4xl"
          >
            Las respuestas correctas
          </h2>
        </div>
        <p className="mono-label text-[0.52rem] text-ink-soft">
          {questions.length} señales · revisión completa
        </p>
      </div>

      <ol className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
        {questions.map((question, index) => {
          const selected = answers[index];
          const isCorrect = selected === question.answer;
          const selectedText =
            selected === null ? null : question.options[selected];

          return (
            <li
              key={question.id}
              className={cn(
                "border-2 bg-paper p-3.5 sm:p-4",
                isCorrect
                  ? "border-ink shadow-[3px_3px_0_0_rgba(240,86,155,0.24)]"
                  : "border-ink/25",
              )}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="mono-label text-[0.5rem] text-ink-soft">
                  {"// "}
                  {formatQuestionNumber(index)}
                </span>
                <span
                  className={cn(
                    "mono-label flex items-center gap-1 border px-1.5 py-0.5 text-[0.46rem]",
                    isCorrect
                      ? "border-pink-deep/30 bg-petal text-pink-deep"
                      : "border-ink/20 bg-cream text-ink-soft",
                  )}
                >
                  {isCorrect ? (
                    <CheckIcon className="h-3 w-3" />
                  ) : (
                    <CloseIcon className="h-3 w-3" />
                  )}
                  {isCorrect ? "Correcta" : "Para revisar"}
                </span>
              </div>

              <p className="text-[0.83rem] font-semibold leading-snug text-ink sm:text-sm">
                {question.question}
              </p>

              <p className="mt-2.5 border-t border-ink/10 pt-2 text-[0.76rem] leading-snug text-ink">
                <span className="mono-label mr-1.5 text-[0.46rem] text-pink-deep">
                  Correcta:
                </span>
                {formatOption(question.answer, question.options[question.answer])}
              </p>

              {!isCorrect && selectedText !== null ? (
                <p className="mt-1 text-[0.72rem] leading-snug text-ink-soft">
                  <span className="mono-label mr-1.5 text-[0.43rem]">
                    Tu respuesta:
                  </span>
                  {formatOption(selected ?? 0, selectedText)}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

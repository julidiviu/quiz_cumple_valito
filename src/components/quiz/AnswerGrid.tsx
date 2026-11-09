import type { QuizQuestion } from "@/data/questions";
import { AnswerButton } from "@/components/quiz/AnswerButton";

type AnswerGridProps = {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
};

export function AnswerGrid({
  question,
  selectedAnswer,
  onSelect,
}: AnswerGridProps) {
  return (
    <div
      role="group"
      aria-label="Opciones de respuesta"
      className="grid grid-cols-2 gap-2.5 sm:gap-3"
    >
      {question.options.map((option, index) => (
        <AnswerButton
          key={option}
          index={index}
          text={option}
          selected={selectedAnswer === index}
          onSelect={() => onSelect(index)}
        />
      ))}
    </div>
  );
}

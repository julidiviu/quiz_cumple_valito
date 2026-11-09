import type { QuizQuestion } from "@/data/questions";
import { QUESTION_LETTERS } from "@/data/questions";

export type QuizAnswer = number | null;

export function countAnswered(answers: QuizAnswer[]): number {
  return answers.reduce<number>(
    (total, answer) => (answer === null ? total : total + 1),
    0,
  );
}

export function countCorrect(
  questions: QuizQuestion[],
  answers: QuizAnswer[],
): number {
  return questions.reduce<number>((total, question, index) => {
    return answers[index] === question.answer ? total + 1 : total;
  }, 0);
}

export function optionLetter(index: number): string {
  return QUESTION_LETTERS[index] ?? "?";
}

export function formatQuestionNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function formatOption(index: number, text: string): string {
  return `${optionLetter(index)}) ${text}`;
}

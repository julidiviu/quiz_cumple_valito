"use client";

import { useCallback, useState } from "react";
import type { QuizQuestion } from "@/data/questions";
import { countAnswered, countCorrect, type QuizAnswer } from "@/lib/quiz";

export type QuizPhase = "welcome" | "quiz" | "result";

export function useQuiz(questions: QuizQuestion[]) {
  const [phase, setPhase] = useState<QuizPhase>("welcome");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>(() =>
    questions.map(() => null),
  );

  const answeredCount = countAnswered(answers);
  const correctCount = countCorrect(questions, answers);
  const currentAnswer = answers[currentIndex] ?? null;
  const currentIsAnswered = currentAnswer !== null;
  const allAnswered = answeredCount === questions.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  const start = useCallback(() => {
    setPhase("quiz");
  }, []);

  const selectAnswer = useCallback(
    (optionIndex: number) => {
      setAnswers((previous) => {
        const next = [...previous];
        next[currentIndex] = optionIndex;
        return next;
      });
    },
    [currentIndex],
  );

  const goNext = useCallback(() => {
    if (!currentIsAnswered) return;
    setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
  }, [currentIsAnswered, questions.length]);

  const goPrevious = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  const viewResult = useCallback(() => {
    if (!allAnswered) return;
    setPhase("result");
  }, [allAnswered]);

  const restart = useCallback(() => {
    setAnswers(questions.map(() => null));
    setCurrentIndex(0);
    setPhase("welcome");
  }, [questions]);

  const currentQuestion = questions[currentIndex];

  return {
    phase,
    currentIndex,
    currentQuestion,
    currentAnswer,
    currentIsAnswered,
    answers,
    correctCount,
    answeredCount,
    allAnswered,
    isFirst,
    isLast,
    canGoNext: currentIsAnswered && !isLast,
    canGoPrevious: !isFirst,
    start,
    selectAnswer,
    goNext,
    goPrevious,
    viewResult,
    restart,
  };
}

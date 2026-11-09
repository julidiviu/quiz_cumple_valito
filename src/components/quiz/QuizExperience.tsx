"use client";

import { useEffect, useRef, useState } from "react";
import type { QuizQuestion } from "@/data/questions";
import type { QuizGift } from "@/data/quizContent";
import { FinalScreen } from "@/components/quiz/FinalScreen";
import { IntroBoot } from "@/components/quiz/IntroBoot";
import { QuestionDeck } from "@/components/quiz/QuestionDeck";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { TransmissionBoot } from "@/components/quiz/TransmissionBoot";
import { WelcomeScreen } from "@/components/quiz/WelcomeScreen";
import { GiftIcon } from "@/components/ui/Icons";
import { SquareButton } from "@/components/ui/SquareButton";
import { useQuiz } from "@/hooks/useQuiz";

type QuizExperienceProps = {
  questions: QuizQuestion[];
  gift: QuizGift;
};

export function QuizExperience({ questions, gift }: QuizExperienceProps) {
  const {
    phase,
    answers,
    currentIndex,
    currentQuestion,
    correctCount,
    answeredCount,
    allAnswered,
    isLast,
    canGoNext,
    canGoPrevious,
    start,
    selectAnswer,
    goNext,
    goPrevious,
    viewResult,
    restart,
  } = useQuiz(questions);
  const [booting, setBooting] = useState(false);
  const [introRun, setIntroRun] = useState(0);
  const bootTimeout = useRef<number | null>(null);

  const handleRestart = () => {
    setIntroRun((run) => run + 1);
    restart();
  };

  const handleStart = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!reduceMotion) {
      setBooting(true);
      if (bootTimeout.current) window.clearTimeout(bootTimeout.current);
      bootTimeout.current = window.setTimeout(() => setBooting(false), 3500);
    }

    start();
  };

  useEffect(() => {
    return () => {
      if (bootTimeout.current) window.clearTimeout(bootTimeout.current);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [phase]);

  useEffect(() => {
    if (phase !== "quiz" || booting) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        if (canGoNext) {
          event.preventDefault();
          goNext();
        }
        return;
      }

      if (event.key === "ArrowLeft") {
        if (canGoPrevious) {
          event.preventDefault();
          goPrevious();
        }
        return;
      }

      if (/^[1-4]$/.test(event.key)) {
        const optionIndex = Number(event.key) - 1;
        if (optionIndex < currentQuestion.options.length) {
          event.preventDefault();
          selectAnswer(optionIndex);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    booting,
    canGoNext,
    canGoPrevious,
    currentQuestion,
    goNext,
    goPrevious,
    phase,
    selectAnswer,
  ]);

  if (phase === "welcome") {
    return (
      <>
        <IntroBoot key={introRun} />
        <WelcomeScreen onStart={handleStart} total={questions.length} />
      </>
    );
  }

  if (phase === "result") {
    return (
      <FinalScreen
        questions={questions}
        answers={answers}
        correctCount={correctCount}
        gift={gift}
        onRestart={handleRestart}
      />
    );
  }

  const remaining = questions.length - answeredCount;

  return (
    <>
      {booting ? <TransmissionBoot total={questions.length} /> : null}

      <section
        aria-labelledby="quiz-title"
        className="quiz-unfold mx-auto w-full max-w-[1280px] flex-1 px-4 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-9 lg:px-8"
      >
        <h1 id="quiz-title" className="sr-only">
          Quiz de cumpleaños para Valito
        </h1>

        <div className="mb-5 hidden flex-wrap items-end justify-between gap-3 sm:mb-9 sm:flex">
          <div>
            <p className="mono-label mb-2 text-[0.55rem] text-pink-deep">
              {"// Preguntas en órbita"}
            </p>
            <p className="soft-serif text-xl leading-none text-ink sm:text-2xl">
              Una señal a la vez.
            </p>
          </div>
          <p className="mono-label text-[0.52rem] text-ink-soft">
            {isLast ? "Última pregunta" : "Recorre con ← →"}
          </p>
        </div>

        <QuizProgress answers={answers} currentIndex={currentIndex} />

        <QuestionDeck
          questions={questions}
          answers={answers}
          currentIndex={currentIndex}
          onSelect={selectAnswer}
          onPrevious={goPrevious}
          onNext={goNext}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
        />

        <div className="mx-auto mt-4 flex max-w-[1040px] flex-col items-start justify-between gap-4 border-t-2 border-ink/15 pt-5 sm:mt-6 sm:flex-row sm:items-center">
          <div>
            <p className="mono-label flex items-center gap-2 text-[0.52rem] text-ink-soft">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 bg-pink"
              />
              {"// Cierre de transmisión"}
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              {allAnswered
                ? `Las ${questions.length} señales están respondidas. El resultado ya está disponible.`
                : `Faltan ${remaining} ${remaining === 1 ? "respuesta" : "respuestas"} para desbloquear el resultado.`}
            </p>
          </div>

          <SquareButton
            variant={allAnswered ? "dark" : "secondary"}
            size="lg"
            disabled={!allAnswered}
            onClick={viewResult}
            className="w-full sm:w-auto"
          >
            <GiftIcon className="h-4 w-4" />
            Ver resultado
          </SquareButton>
        </div>

        <p className="mono-label mt-6 text-center text-[0.48rem] text-ink-soft/70">
          Puedes volver a preguntas anteriores y cambiar tu respuesta antes de
          cerrar la transmisión.
        </p>
      </section>
    </>
  );
}

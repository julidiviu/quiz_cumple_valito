"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef } from "react";
import type { QuizQuestion } from "@/data/questions";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import type { QuizAnswer } from "@/lib/quiz";
import { formatQuestionNumber } from "@/lib/quiz";

type QuestionDeckProps = {
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
};

function ArrowButton({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: "previous" | "next";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  const isPrevious = direction === "previous";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "group grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-paper text-ink transition-[transform,box-shadow,background-color,opacity] duration-150",
        "shadow-[4px_4px_0_0_var(--ink)] hover:bg-petal",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:translate-x-[2px] disabled:translate-y-[2px] disabled:opacity-35 disabled:shadow-none",
        "enabled:active:translate-x-[3px] enabled:active:translate-y-[3px] enabled:active:shadow-none",
      )}
    >
      {isPrevious ? (
        <ArrowLeftIcon className="h-5 w-5 transition-transform duration-150 group-hover:-translate-x-0.5" />
      ) : (
        <ArrowRightIcon className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-0.5" />
      )}
    </button>
  );
}

export function QuestionDeck({
  questions,
  answers,
  currentIndex,
  onSelect,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: QuestionDeckProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const centerCard = useCallback(
    (index: number, behavior: ScrollBehavior) => {
      const viewport = viewportRef.current;
      const card = cardRefs.current[index];
      if (!viewport || !card) return;

      const target =
        card.offsetLeft -
        (viewport.clientWidth - card.offsetWidth) / 2;

      viewport.scrollTo({ left: target, behavior });
    },
    [],
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    centerCard(currentIndex, reduceMotion ? "auto" : "smooth");
  }, [centerCard, currentIndex]);

  useEffect(() => {
    const handleResize = () => centerCard(currentIndex, "auto");

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [centerCard, currentIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const preventHorizontalWheel = (event: globalThis.WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
      }
    };

    viewport.addEventListener("wheel", preventHorizontalWheel, {
      passive: false,
    });
    return () =>
      viewport.removeEventListener("wheel", preventHorizontalWheel);
  }, []);

  return (
    <div className="relative mt-3 sm:mt-8">
      <div
        ref={viewportRef}
        className="deck-viewport w-full overflow-hidden py-4 sm:py-7"
        style={{ touchAction: "pan-y" }}
        role="group"
        aria-roledescription="carrusel"
        aria-label="Preguntas del quiz"
      >
        <div
          className="flex items-stretch gap-4 sm:gap-5 lg:gap-7"
          style={
            {
              "--card-width": "min(760px, 84vw)",
              paddingInline: "calc((100% - var(--card-width)) / 2)",
            } as CSSProperties
          }
        >
          {questions.map((question, index) => {
            const offset = index - currentIndex;
            const distance = Math.abs(offset);
            const isActive = offset === 0;
            const rotate =
              offset === 0
                ? 0
                : (offset < 0 ? 1 : -1) * Math.min(11, 6 + distance * 1.8);
            const scale = isActive ? 1 : Math.max(0.82, 1 - distance * 0.085);
            const opacity = isActive
              ? 1
              : Math.max(0.28, 0.58 - (distance - 1) * 0.1);
            const blur = isActive
              ? 0
              : Math.min(3.6, 1.2 + (distance - 1) * 0.7);

            return (
              <div
                key={question.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                aria-hidden={!isActive}
                inert={!isActive}
                className={cn(
                  "w-[min(760px,84vw)] shrink-0 transition-[transform,opacity,filter] duration-500 ease-out",
                  !isActive && "pointer-events-none",
                )}
                style={{
                  transform: `perspective(1400px) rotateY(${rotate}deg) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex: 30 - distance,
                }}
              >
                <QuestionCard
                  question={question}
                  index={index}
                  total={questions.length}
                  selectedAnswer={answers[index] ?? null}
                  onSelect={onSelect}
                />
              </div>
            );
          })}

          {/* Espacio final para que la última tarjeta también pueda quedar centrada. */}
          <div
            aria-hidden="true"
            className="shrink-0"
            style={{ width: "calc(var(--card-width) / 2)" }}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 md:block xl:left-5">
        <div className="pointer-events-auto">
          <ArrowButton
            direction="previous"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            label="Pregunta anterior"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 md:block xl:right-5">
        <div className="pointer-events-auto">
          <ArrowButton
            direction="next"
            onClick={onNext}
            disabled={!canGoNext}
            label={
              canGoNext
                ? "Pregunta siguiente"
                : "Responde la pregunta actual para continuar"
            }
          />
        </div>
      </div>

      <div className="mt-1 flex items-center justify-center gap-4 md:hidden">
        <ArrowButton
          direction="previous"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          label="Pregunta anterior"
        />
        <span className="mono-label text-[0.55rem] text-ink-soft">
          {formatQuestionNumber(currentIndex)} / {questions.length}
        </span>
        <ArrowButton
          direction="next"
          onClick={onNext}
          disabled={!canGoNext}
          label={
            canGoNext
              ? "Pregunta siguiente"
              : "Responde la pregunta actual para continuar"
          }
        />
      </div>

      <p className="sr-only" aria-live="polite">
        Pregunta {currentIndex + 1} de {questions.length}.
        {answers[currentIndex] === null
          ? " Sin respuesta seleccionada."
          : " Respuesta seleccionada."}
      </p>
    </div>
  );
}

import Image from "next/image";
import type { CSSProperties } from "react";
import type { QuizQuestion } from "@/data/questions";
import { SparkleIcon } from "@/components/ui/Icons";
import { TechnicalTag } from "@/components/ui/TechnicalTag";
import { cn } from "@/lib/cn";
import { formatQuestionNumber } from "@/lib/quiz";

const accents = [
  "var(--pink)",
  "var(--lilac)",
  "var(--peach)",
  "var(--moon)",
] as const;

type MediaFrameProps = {
  question: QuizQuestion;
  index: number;
  className?: string;
  priority?: boolean;
};

export function MediaFrame({
  question,
  index,
  className,
  priority = false,
}: MediaFrameProps) {
  const accent = accents[index % accents.length];
  const signal = formatQuestionNumber(index);
  const hasImage = Boolean(question.image);

  return (
    <div
      className={cn(
        "relative isolate aspect-[16/9] w-full overflow-hidden border-2 border-ink bg-ink sm:aspect-[2.15/1]",
        className,
      )}
      style={
        {
          "--media-accent": accent,
          "--media-turn": `${(index % 4) * 12 - 18}deg`,
        } as CSSProperties
      }
    >
      {hasImage && question.image ? (
        <Image
          src={question.image}
          alt={`Imagen de referencia para la pregunta ${index + 1}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 84vw, 760px"
          className="object-cover"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(240,86,155,0.35),transparent_45%),radial-gradient(circle_at_90%_90%,rgba(203,188,240,0.3),transparent_45%)]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,250,246,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,250,246,0.55) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <span className="absolute -left-1 top-1/2 -translate-y-1/2 select-none text-[7rem] font-extrabold leading-none tracking-[-0.08em] text-paper/[0.07] sm:text-[9rem]">
            {signal}
          </span>

          <div
            className="absolute left-[44%] top-1/2 aspect-square h-[70%] rounded-full border border-paper/20 sm:h-[84%]"
            style={{
              background: "var(--media-accent)",
              boxShadow: "inset -26px -12px 0 0 var(--ink)",
              transform: "translate(-50%, -50%) rotate(var(--media-turn))",
            }}
          >
            <span className="absolute left-[26%] top-[24%] h-[8%] w-[8%] rounded-full bg-ink/10" />
            <span className="absolute left-[48%] top-[58%] h-[12%] w-[12%] rounded-full bg-ink/10" />
            <span className="absolute left-[70%] top-[38%] h-[5%] w-[5%] rounded-full bg-ink/10" />
          </div>

          <div className="absolute left-1/2 top-1/2 h-[48%] w-[68%] -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-[50%] border border-dashed border-paper/25 sm:h-[58%] sm:w-[58%]" />
          <span className="absolute left-[18%] top-[32%] h-2 w-2 rounded-full bg-paper/80 shadow-[0_0_0_4px_rgba(255,250,246,0.08)]" />
          <SparkleIcon className="absolute right-[11%] top-[20%] h-5 w-5 text-paper/50" />
          <SparkleIcon className="absolute right-[22%] bottom-[18%] h-3 w-3 text-paper/30" />
        </div>
      )}

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4">
        <TechnicalTag
          tone="solid"
          dot
          className="border-paper/25 bg-ink/70 backdrop-blur-sm"
        >
          Señal {signal}
        </TechnicalTag>
        <span className="mono-label text-[0.52rem] text-paper/55">
          TX-{signal}
        </span>
      </div>

      {hasImage ? <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" /> : null}

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3 sm:p-4">
        <span className="mono-label truncate text-[0.52rem] text-paper/65">
          {hasImage ? "// Registro visual" : "// Espacio para imagen o gif"}
        </span>
        <span className="mono-label hidden shrink-0 text-[0.52rem] text-paper/40 sm:inline">
          LOONA · {signal}
        </span>
      </div>
    </div>
  );
}

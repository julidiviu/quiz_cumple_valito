import { OrbitDiagram } from "@/components/quiz/OrbitDiagram";
import { ArrowRightIcon, PlayIcon, SparkleIcon } from "@/components/ui/Icons";
import { SquareButton } from "@/components/ui/SquareButton";
import { TechnicalTag } from "@/components/ui/TechnicalTag";

type WelcomeScreenProps = {
  onStart: () => void;
  total: number;
};

export function WelcomeScreen({ onStart, total }: WelcomeScreenProps) {
  return (
    <section
      id="inicio"
      aria-labelledby="welcome-title"
      className="relative mx-auto w-full max-w-[1280px] flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 hidden justify-between px-2 text-ink/20 lg:flex"
      >
        <span className="mono-label text-[0.5rem]">+ 00.01</span>
        <span className="mono-label text-[0.5rem]">SEÑAL / ESTABLE</span>
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12 xl:gap-20">
        <div className="relative z-10">
          <div className="mb-5 flex flex-wrap items-center gap-2.5 sm:mb-7">
            <TechnicalTag tone="solid" dot>
              Transmisión 001
            </TechnicalTag>
            <TechnicalTag tone="outline">Edición cumpleaños</TechnicalTag>
          </div>

          <p className="soft-serif mb-3 text-xl text-pink-deep sm:mb-4 sm:text-2xl">
            Una señal especial para ti.
          </p>

          <h1
            id="welcome-title"
            className="display-title max-w-[12ch] text-[clamp(2.5rem,8.6vw,6.4rem)] text-ink"
          >
            Feliz Cumpleaños{" "}
            <span className="block text-ink">Valito</span>
          </h1>

          <p className="mt-6 max-w-[48ch] text-[0.98rem] leading-[1.65] text-ink-soft sm:mt-7 sm:text-lg">
            {total} preguntas sobre LOONA, sin prisa y con un regalo esperando
            al final. Tómate tu tiempo: esta transmisión es para ti.
          </p>

          <div className="mt-7 flex flex-col items-start gap-4 sm:mt-9 sm:flex-row sm:items-center">
            <SquareButton
              size="lg"
              onClick={onStart}
              className="group min-w-[15.5rem]"
            >
              <PlayIcon className="h-4 w-4" />
              Comenzar el quiz
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
            </SquareButton>

            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="signal-dot h-2 w-2 rounded-full bg-pink"
              />
              <span className="mono-label text-[0.55rem] text-ink-soft">
                {"// Señal lista"}
              </span>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/15 pt-4 sm:mt-12">
            <span className="mono-label flex items-center gap-1.5 text-[0.52rem] text-ink-soft">
              <SparkleIcon className="h-3 w-3 text-pink-deep" />
              {total} preguntas
            </span>
            <span className="mono-label flex items-center gap-1.5 text-[0.52rem] text-ink-soft">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-ink/30" />
              Sin tiempo límite
            </span>
            <span className="mono-label flex items-center gap-1.5 text-[0.52rem] text-ink-soft">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-ink/30" />
              Un regalo al final
            </span>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55),transparent_68%)] blur-xl"
          />
          <OrbitDiagram total={total} />
        </div>
      </div>
    </section>
  );
}

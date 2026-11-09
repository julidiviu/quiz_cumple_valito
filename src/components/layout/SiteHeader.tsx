import { quizQuestions } from "@/data/questions";
import { MoonIcon } from "@/components/ui/Icons";
import { TechnicalTag } from "@/components/ui/TechnicalTag";

export function SiteHeader() {
  const totalQuestions = quizQuestions.length;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-3 px-4 sm:h-[72px] sm:gap-5 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center border-2 border-ink bg-ink text-pink shadow-[3px_3px_0_0_var(--pink)] sm:h-10 sm:w-10"
          >
            <MoonIcon className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" />
          </span>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="text-[0.78rem] font-extrabold uppercase leading-none tracking-[0.08em]">
              Quiz de Valito
            </span>
            <span className="mono-label mt-1 text-[0.55rem] text-ink-soft">
              {"// Transmisión 001"}
            </span>
          </span>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center">
          <p className="truncate text-center text-[1.05rem] leading-none text-ink sm:text-xl md:text-2xl">
            <span className="soft-serif">¡Feliz Cumpleaños, Valito!</span>
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <span
            aria-hidden="true"
            className="signal-dot h-2 w-2 rounded-full bg-pink"
          />
          <TechnicalTag tone="outline" className="hidden lg:inline-flex">
            Señal abierta
          </TechnicalTag>
          <TechnicalTag tone="solid">{totalQuestions} preguntas</TechnicalTag>
        </div>

        <span
          aria-hidden="true"
          className="signal-dot h-2.5 w-2.5 shrink-0 rounded-full border border-ink bg-pink md:hidden"
        />
      </div>

      <div className="hidden border-t border-ink/15 sm:block">
        <div className="mono-label mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-1.5 text-[0.55rem] text-ink-soft lg:px-8">
          <span>{"// Transmisión especial — cumpleaños"}</span>
          <span className="text-pink-deep">12 lunas · 1 órbita · para Valito</span>
        </div>
      </div>
    </header>
  );
}

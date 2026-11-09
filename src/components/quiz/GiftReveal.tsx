import Image from "next/image";
import type { QuizGift } from "@/data/quizContent";
import { GiftIcon, SparkleIcon } from "@/components/ui/Icons";
import { TechnicalTag } from "@/components/ui/TechnicalTag";
import { GiftIllustration } from "@/components/quiz/GiftIllustration";

type GiftRevealProps = {
  gift: QuizGift;
};

export function GiftReveal({ gift }: GiftRevealProps) {
  return (
    <section
      aria-labelledby="gift-title"
      className="neo-panel rounded-[26px] p-3.5 sm:p-5 lg:p-6"
    >
      <div className="grid gap-5 md:grid-cols-[0.92fr_1.08fr] md:items-stretch md:gap-7">
        <div className="relative aspect-[4/3] overflow-hidden border-2 border-ink md:aspect-auto md:h-full md:min-h-[320px]">
          {gift.imageSrc ? (
            <Image
              src={gift.imageSrc}
              alt={gift.alt}
              fill
              sizes="(max-width: 768px) 84vw, 460px"
              className="object-cover"
            />
          ) : (
            <GiftIllustration />
          )}
        </div>

        <div className="flex flex-col justify-center px-1 py-2 sm:px-2">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <TechnicalTag tone="solid" dot>
              Segundo regalo
            </TechnicalTag>
            <TechnicalTag tone="pink">Señal recibida</TechnicalTag>
          </div>

          <h2
            id="gift-title"
            className="display-title text-[clamp(2.1rem,4.2vw,3.5rem)] text-ink"
          >
            Tu segundo
            <br />
            regalo
          </h2>

          <div className="my-4 flex items-center gap-2">
            <span aria-hidden="true" className="h-px flex-1 bg-ink/20" />
            <GiftIcon className="h-4 w-4 text-pink-deep" />
            <span aria-hidden="true" className="h-px flex-1 bg-ink/20" />
          </div>

          <p className="soft-serif max-w-[33ch] text-[1.3rem] leading-[1.45] text-ink sm:text-[1.55rem]">
            {gift.message}
          </p>

          <p className="mono-label mt-5 flex items-center gap-1.5 text-[0.5rem] text-ink-soft">
            <SparkleIcon className="h-3 w-3 text-pink-deep" />
            Con cariño, para Valito
          </p>
        </div>
      </div>
    </section>
  );
}

import { HeartIcon, SparkleIcon } from "@/components/ui/Icons";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-ink/15">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-2 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <p className="mono-label flex items-center gap-2 text-[0.55rem] text-ink-soft">
          <SparkleIcon className="h-3.5 w-3.5 text-pink-deep" />
          Hecho con cariño para Valito
        </p>
        <p className="mono-label flex items-center gap-1.5 text-[0.55rem] text-ink-soft">
          12 lunas · 1 órbita
          <HeartIcon className="h-3.5 w-3.5 fill-pink text-pink-deep" />
        </p>
      </div>
    </footer>
  );
}

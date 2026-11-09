import { MoonIcon, OrbitIcon, SparkleIcon } from "@/components/ui/Icons";

export function TransmissionBoot({ total }: { total: number }) {
  return (
    <div
      aria-hidden="true"
      className="boot-panel pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-pink text-ink"
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(43,36,48,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(43,36,48,0.35) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="boot-orbit relative grid h-28 w-28 place-items-center rounded-full border-2 border-ink">
          <span className="absolute inset-3 rounded-full border border-dashed border-ink/40" />
          <MoonIcon className="h-9 w-9" />
          <span className="absolute -right-1 top-1/2 h-3 w-3 rounded-full border-2 border-ink bg-paper" />
        </div>

        <div className="mono-label mt-6 flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5">
          <OrbitIcon className="h-3.5 w-3.5" />
          Abriendo transmisión
        </div>

        <p className="display-title mt-4 text-3xl sm:text-5xl">
          Estableciendo
          <br />
          órbita
        </p>

        <p className="mono-label mt-4 flex items-center gap-2 text-[0.55rem]">
          <SparkleIcon className="h-3.5 w-3.5" />
          {total} preguntas · para Valito
          <SparkleIcon className="h-3.5 w-3.5" />
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-2 bg-ink" />
    </div>
  );
}

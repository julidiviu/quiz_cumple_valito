import { ButterflyIcon, HeartIcon, SparkleIcon } from "@/components/ui/Icons";
import { TechnicalTag } from "@/components/ui/TechnicalTag";

const roundCoordinate = (value: number) => Math.round(value * 100) / 100;

const moons = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
  return {
    x: roundCoordinate(240 + Math.cos(angle) * 208),
    y: roundCoordinate(240 + Math.sin(angle) * 208),
    index,
  };
});

export function OrbitDiagram({ total }: { total: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[500px] select-none"
    >
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_36%_30%,rgba(255,250,246,0.96),rgba(255,212,225,0.72)_52%,rgba(203,188,240,0.5)_78%,transparent_79%)]"
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 480 480"
        className="absolute inset-0 h-full w-full"
      >
        <circle
          cx="240"
          cy="240"
          r="222"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.18"
          strokeDasharray="2 9"
        />
        <circle
          cx="240"
          cy="240"
          r="168"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
        <ellipse
          cx="240"
          cy="240"
          rx="218"
          ry="74"
          fill="none"
          stroke="var(--pink-deep)"
          strokeOpacity="0.32"
          strokeDasharray="4 8"
          transform="rotate(-18 240 240)"
        />
        <ellipse
          cx="240"
          cy="240"
          rx="168"
          ry="52"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.14"
          transform="rotate(24 240 240)"
        />

        {moons.map((moon) => (
          <g key={moon.index}>
            <circle
              cx={moon.x}
              cy={moon.y}
              r={moon.index % 3 === 0 ? 5.5 : 3.4}
              fill={
                moon.index % 4 === 0
                  ? "var(--pink)"
                  : moon.index % 4 === 1
                    ? "var(--lilac)"
                    : "var(--paper)"
              }
              stroke="var(--ink)"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
            {moon.index % 4 === 2 ? (
              <circle
                cx={moon.x - 1.8}
                cy={moon.y}
                r="3"
                fill="var(--ink)"
                fillOpacity="0.65"
              />
            ) : null}
          </g>
        ))}

        <path
          d="M332 168c1.2 10.2 7.5 16.5 17.7 17.7-10.2 1.2-16.5 7.5-17.7 17.7-1.2-10.2-7.5-16.5-17.7-17.7 10.2-1.2 16.5-7.5 17.7-17.7Z"
          fill="var(--pink-deep)"
          fillOpacity="0.55"
        />
        <circle cx="86" cy="254" r="7" fill="var(--moon)" stroke="var(--ink)" strokeWidth="1.5" />
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="grid aspect-square w-[39%] place-items-center rounded-full border-2 border-ink bg-paper text-center shadow-[6px_6px_0_0_rgba(43,36,48,0.14)]">
          <div>
            <p className="mono-label text-[0.45rem] text-ink-soft sm:text-[0.52rem]">
              {"// Órbita"}
            </p>
            <p className="soft-serif mt-1 text-[1.35rem] leading-none text-ink sm:text-[1.9rem]">
              Valito
            </p>
            <p className="mono-label mt-1.5 text-[0.42rem] text-pink-deep sm:text-[0.5rem]">
              {total} señales
            </p>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-6 -rotate-3 sm:left-2 sm:top-10">
        <TechnicalTag tone="solid" dot>
          Señal abierta
        </TechnicalTag>
      </div>

      <div className="absolute right-1 top-[23%] grid aspect-square w-[17%] -rotate-6 place-items-center rounded-full border-2 border-ink bg-moon text-center shadow-[4px_4px_0_0_var(--ink)]">
        <div>
          <span className="mono-label block text-[0.4rem] text-ink-soft">
            Preguntas
          </span>
          <span className="block text-xl font-extrabold leading-none text-ink sm:text-2xl">
            {total}
          </span>
        </div>
      </div>

      <div className="absolute bottom-5 left-1 rotate-[4deg] border-2 border-ink bg-paper px-3 py-2 shadow-[4px_4px_0_0_var(--pink)] sm:bottom-8 sm:left-4">
        <span className="mono-label flex items-center gap-1.5 text-[0.46rem] text-ink">
          Para Valito
          <HeartIcon className="h-3 w-3 fill-pink text-pink-deep" />
        </span>
      </div>

      <div className="absolute bottom-2 right-2 flex items-center gap-1.5 text-ink-soft sm:bottom-4 sm:right-4">
        <ButterflyIcon className="h-4 w-4 text-pink-deep/60" />
        <span className="mono-label text-[0.45rem]">TX-001</span>
      </div>

      <SparkleIcon className="absolute left-[17%] top-[17%] h-4 w-4 text-pink-deep/50" />
      <SparkleIcon className="absolute bottom-[20%] right-[8%] h-3 w-3 text-ink/30" />
    </div>
  );
}

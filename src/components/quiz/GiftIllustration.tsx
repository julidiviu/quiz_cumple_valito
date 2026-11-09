import { SparkleIcon } from "@/components/ui/Icons";

export function GiftIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden border-2 border-ink bg-[linear-gradient(145deg,var(--petal),var(--lilac-soft)_58%,var(--moon))]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(43,36,48,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(43,36,48,0.22) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 320 240"
        className="absolute inset-0 h-full w-full"
      >
        <ellipse
          cx="160"
          cy="205"
          rx="82"
          ry="11"
          fill="var(--ink)"
          fillOpacity="0.12"
        />
        <rect
          x="84"
          y="103"
          width="152"
          height="100"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
        <rect
          x="73"
          y="79"
          width="174"
          height="32"
          fill="var(--pink)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
        <rect
          x="149"
          y="79"
          width="23"
          height="124"
          fill="var(--lilac)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
        <rect
          x="73"
          y="79"
          width="174"
          height="9"
          fill="var(--paper)"
          fillOpacity="0.35"
        />

        <path
          d="M160 79c-27-9-48-38-31-50 13-9 25 8 31 27 6-19 18-36 31-27 17 12-4 41-31 50Z"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
        <circle
          cx="160"
          cy="79"
          r="7"
          fill="var(--pink)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />

        <circle
          cx="246"
          cy="57"
          r="17"
          fill="var(--moon)"
          stroke="var(--ink)"
          strokeWidth="2"
        />
        <circle cx="246" cy="57" r="11" fill="var(--paper)" fillOpacity="0.45" />

        <path
          d="M62 52c.7 6 4.4 9.7 10.4 10.4-6 .7-9.7 4.4-10.4 10.4-.7-6-4.4-9.7-10.4-10.4 6-.7 9.7-4.4 10.4-10.4Z"
          fill="var(--ink)"
          fillOpacity="0.45"
        />
      </svg>

      <SparkleIcon className="absolute right-4 top-1/2 h-4 w-4 text-ink/40" />
    </div>
  );
}

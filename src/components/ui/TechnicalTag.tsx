import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TechnicalTagProps = {
  children: ReactNode;
  tone?: "solid" | "outline" | "pink" | "ghost";
  dot?: boolean;
  className?: string;
};

const tones = {
  solid: "border-ink bg-ink text-paper",
  outline: "border-ink/30 bg-paper text-ink-soft",
  pink: "border-ink bg-petal text-ink",
  ghost: "border-transparent bg-transparent text-ink-soft",
};

export function TechnicalTag({
  children,
  tone = "outline",
  dot = false,
  className,
}: TechnicalTagProps) {
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center gap-1.5 border px-2 py-1",
        tones[tone],
        className,
      )}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 shrink-0",
            tone === "solid" ? "bg-pink" : "bg-pink-deep",
          )}
        />
      ) : null}
      {children}
    </span>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SquareButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

const variants = {
  primary:
    "border-ink bg-pink text-ink shadow-[4px_4px_0_0_var(--ink)] hover:bg-petal",
  secondary:
    "border-ink bg-paper text-ink shadow-[4px_4px_0_0_rgba(43,36,48,0.16)] hover:bg-cream",
  dark: "border-ink bg-ink text-paper shadow-[4px_4px_0_0_var(--pink)] hover:bg-[#3b303e]",
  ghost: "border-transparent bg-transparent text-ink hover:bg-white/40",
};

const sizes = {
  sm: "min-h-9 px-3 text-[0.65rem]",
  md: "min-h-11 px-5 text-xs",
  lg: "min-h-14 px-7 text-sm",
};

export function SquareButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  type = "button",
  ...props
}: SquareButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 border-2 font-sans font-bold uppercase tracking-[0.12em] transition-[transform,box-shadow,background-color,color] duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "enabled:hover:translate-x-[2px] enabled:hover:translate-y-[2px] enabled:hover:shadow-[1px_1px_0_0_var(--ink)] enabled:active:translate-x-[4px] enabled:active:translate-y-[4px] enabled:active:shadow-none",
        "disabled:opacity-45 disabled:shadow-none disabled:translate-x-[2px] disabled:translate-y-[2px]",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

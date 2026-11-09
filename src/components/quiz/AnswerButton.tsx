import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { optionLetter } from "@/lib/quiz";

type AnswerButtonProps = {
  index: number;
  text: string;
  selected: boolean;
  onSelect: () => void;
};

export function AnswerButton({
  index,
  text,
  selected,
  onSelect,
}: AnswerButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "group relative flex min-h-[4.25rem] w-full items-start gap-2.5 border-2 border-ink/55 bg-paper p-3 text-left transition-[background-color,border-color,transform,box-shadow] duration-150 sm:min-h-[4.75rem] sm:gap-3 sm:p-3.5",
        "hover:-translate-y-0.5 hover:border-ink hover:bg-cream hover:shadow-[0_4px_0_0_rgba(43,36,48,0.12)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        selected &&
          "-translate-y-0.5 border-ink bg-petal shadow-[3px_3px_0_0_var(--pink)] hover:bg-petal",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid h-7 w-7 shrink-0 place-items-center border border-ink font-mono text-[0.68rem] font-bold transition-colors duration-150",
          selected ? "bg-ink text-paper" : "bg-cream text-ink",
        )}
      >
        {optionLetter(index)}
      </span>
      <span
        className={cn(
          "pt-0.5 text-[0.8rem] font-semibold leading-[1.35] text-ink sm:text-[0.95rem]",
          selected && "pr-5",
        )}
      >
        {text}
      </span>
      {selected ? (
        <CheckIcon className="absolute right-2.5 top-2.5 h-4 w-4 text-pink-deep" />
      ) : null}
    </button>
  );
}

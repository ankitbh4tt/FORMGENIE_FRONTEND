import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springCrisp } from "@/lib/motion";

export interface SegmentedOption<T extends string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  layoutId?: string;
  size?: "sm" | "md";
  "aria-label"?: string;
}

/** A segmented control whose selection slides between options. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  layoutId = "segmented",
  size = "md",
  ...rest
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={rest["aria-label"]}
      className={cn("inline-flex items-center gap-1 rounded-control bg-surface-sunken p-1", className)}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative inline-flex items-center justify-center gap-1.5 rounded-[6px] font-medium transition-colors duration-(--dur-fast)",
              size === "sm" ? "h-8 px-3 text-small" : "h-9 px-4 text-ui pointer-coarse:min-h-10",
              active ? "text-ink" : "text-ink-muted hover:text-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={springCrisp}
                className="absolute inset-0 rounded-[6px] bg-surface shadow-xs"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {opt.icon}
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

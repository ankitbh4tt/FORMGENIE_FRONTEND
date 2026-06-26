import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  /** Unique id so multiple controls don't share the same layout animation. */
  layoutId?: string;
  size?: "sm" | "md";
}

/**
 * Pill segmented control with a shared-element (layoutId) sliding indicator.
 * Used for the builder's chat/preview toggle and small view switchers.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  layoutId = "segmented",
  size = "md",
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border border-border bg-surface-sunken p-1",
        className
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              size === "sm" ? "h-7 px-2.5 text-[13px]" : "h-8 px-3.5 text-sm",
              active ? "text-ink" : "text-ink-muted hover:text-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-md border border-border bg-surface shadow-xs"
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

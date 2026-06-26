import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem<T extends string> {
  value: T;
  label: React.ReactNode;
  count?: number;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  layoutId?: string;
}

/** Underline tabs with a sliding indicator (shared layoutId). */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  className,
  layoutId = "tabs",
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center gap-1 border-b border-border",
        className
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              "relative -mb-px flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none",
              active ? "text-ink" : "text-ink-muted hover:text-ink"
            )}
          >
            {item.label}
            {typeof item.count === "number" && (
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[11px] font-medium tabular-nums",
                  active
                    ? "bg-accent-soft text-accent"
                    : "bg-surface-sunken text-ink-muted"
                )}
              >
                {item.count}
              </span>
            )}
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 480, damping: 38 }}
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

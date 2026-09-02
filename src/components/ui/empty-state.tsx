import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * An empty state says what this place is for and offers the one thing to do
 * next. No dashed box: a hairline, a statement, a sentence, an action.
 */
export function EmptyState({ icon: Icon, title, description, action, align = "left", className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "hairline flex flex-col gap-3 py-10",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {Icon && (
        <span className="grid size-11 place-items-center rounded-full border border-border text-ink-muted">
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
      )}
      <h2 className="text-h2 font-semibold text-ink">{title}</h2>
      {description && <p className="max-w-[44ch] text-ui text-ink-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

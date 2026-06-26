import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border-strong bg-surface/50 px-6 py-14 text-center",
        className
      )}
    >
      {Icon && (
        <div className="mb-4 grid size-12 place-items-center rounded-xl border border-border bg-surface text-ink-muted shadow-xs">
          <Icon className="size-5" strokeWidth={1.75} />
        </div>
      )}
      <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-ink-muted">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

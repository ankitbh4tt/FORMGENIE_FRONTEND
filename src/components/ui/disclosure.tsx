import * as React from "react";
import { cn } from "@/lib/utils";

interface DisclosureProps {
  title: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
  level?: "h2" | "h3";
}

/**
 * An expandable row. The panel animates grid rows from 0fr to 1fr, so the
 * browser resolves the height itself: nothing is measured and nothing jumps.
 */
export function Disclosure({ title, open, onToggle, children, className, level: Heading = "h3" }: DisclosureProps) {
  const id = React.useId();
  return (
    <div className={cn("hairline", className)}>
      <Heading className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex min-h-14 w-full items-center justify-between gap-6 py-3 text-left text-[1.0625rem] font-medium text-ink"
        >
          <span>{title}</span>
          <span className="relative size-3 shrink-0" aria-hidden="true">
            <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
            <span
              className={cn(
                "absolute inset-x-0 top-1/2 h-px bg-current transition-[transform,opacity] duration-(--dur-base) ease-soft",
                open ? "rotate-0 opacity-0" : "rotate-90 opacity-100"
              )}
            />
          </span>
        </button>
      </Heading>
      <div id={id} role="region" className="disclosure-panel" data-open={open ? "" : undefined}>
        <div>
          <div className="pb-5 pr-8 text-ui leading-relaxed text-ink-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}

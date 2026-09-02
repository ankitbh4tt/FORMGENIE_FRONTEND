import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The statement at the top of a section: the display face, once per section,
 * arriving with the wipe. Descriptions are working type. No eyebrows.
 */
export function SectionHeading({
  statement,
  description,
  id,
  className,
}: {
  statement: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[34ch]", className)}>
      <h2 id={id} className="font-display text-statement text-ink">
        <span className="fg-wipe block">{statement}</span>
      </h2>
      {description && (
        <p className="fg-in mt-4 max-w-[44ch] text-lead text-ink-muted" style={{ "--i": 1 } as React.CSSProperties}>
          {description}
        </p>
      )}
    </div>
  );
}

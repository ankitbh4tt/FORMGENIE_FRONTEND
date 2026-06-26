import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * FormGenie mark — a sheet of paper with a single ink-blue line and a
 * "completed" tick. Document-first, not robot/AI. Uses currentColor for the
 * paper outline so it adapts to ink/inverse contexts; accent for the marks.
 */
export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <span className={cn("inline-flex size-8 items-center justify-center", className)}>
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <rect
        x="6.5"
        y="3.5"
        width="19"
        height="25"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M11 11h7"
        stroke="var(--accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11 16h10"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11 21h5"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18.5 20.5l2 2 3.5-4"
        stroke="var(--accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export const Wordmark: React.FC<{ className?: string }> = ({ className }) => (
  <span
    className={cn(
      "flex items-center gap-2 text-ink select-none",
      className
    )}
  >
    <Logo />
    <span className="font-display text-[19px] font-medium tracking-tight">
      FormGenie
    </span>
  </span>
);

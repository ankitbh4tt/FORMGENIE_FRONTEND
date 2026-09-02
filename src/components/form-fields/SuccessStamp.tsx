import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-media-query";
import { EASE_OUT } from "@/lib/motion";

/**
 * The thank-you. A hairline ring, a check that draws, and a statement that
 * takes focus so it is read out. No confetti: quiet confirmation, then a way on.
 */
export function SuccessStamp({
  title = "Thank you.",
  message = "Your response has been recorded.",
  children,
}: {
  title?: string;
  message?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotionSafe();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center" role="status">
      <span className="grid size-16 place-items-center rounded-full border border-success/40 bg-success-soft">
        <svg viewBox="0 0 48 48" className="size-8" fill="none" aria-hidden="true">
          <motion.path
            d="M14 25l7 7 13-15"
            stroke="var(--success)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT }}
          />
        </svg>
      </span>

      <h2 ref={headingRef} tabIndex={-1} className="font-display text-statement mt-6 text-ink outline-none">
        {title}
      </h2>
      <p className="mt-3 max-w-[38ch] text-lead text-ink-muted">{message}</p>
      {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>}
    </div>
  );
}

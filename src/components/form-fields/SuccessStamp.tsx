import { motion, useReducedMotion } from "framer-motion";

/**
 * A calm "ink stamp" success mark — a ring that settles and a check that
 * draws itself. No confetti; quiet confirmation.
 */
export function SuccessStamp({
  title = "Thank you",
  message = "Your response has been submitted.",
}: {
  title?: string;
  message?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={reduced ? false : { scale: 0.6, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative grid size-20 place-items-center rounded-full border-2 border-success/30 bg-success-soft"
      >
        <svg viewBox="0 0 48 48" className="size-10" fill="none">
          <motion.path
            d="M14 25l7 7 13-15"
            stroke="var(--success)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-6 font-display text-2xl font-medium tracking-tight text-ink"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
        className="mt-2 max-w-sm text-ink-muted"
      >
        {message}
      </motion.p>
    </div>
  );
}

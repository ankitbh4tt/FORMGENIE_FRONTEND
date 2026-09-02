import type { Variants, Transition } from "framer-motion";

/**
 * Motion tokens shared with index.css. Strong curves, UI under 300ms, and one
 * spring for elements that should feel alive (the sidebar indicator).
 */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];
export const EASE_SOFT: [number, number, number, number] = [0.2, 0.65, 0.25, 1];

export const DURATION = {
  fast: 0.14,
  base: 0.24,
  slow: 0.42,
  long: 0.7,
} as const;

export const springCrisp: Transition = {
  type: "spring",
  stiffness: 480,
  damping: 38,
  mass: 0.9,
};

/** Content arriving: a short lift and a fade. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, transform: "translate3d(0, 10px, 0)" },
  show: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    transition: { duration: DURATION.long, ease: EASE_SOFT },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

/** Stagger container for lists and sections: 30 to 80ms between items. */
export const stagger = (gap = 0.05, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

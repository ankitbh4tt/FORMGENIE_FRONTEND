import type { Variants, Transition } from "framer-motion";

// Editorial motion: quiet, confirming, never performing.
export const EASE_OUT: [number, number, number, number] = [0.2, 0, 0, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.14,
  base: 0.2,
  slow: 0.26,
} as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.9,
};

// Fade + small rise — the default reveal.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

// Stagger container for lists/sections.
export const stagger = (gap = 0.04, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

// Used with framer-motion's useReducedMotion() to flatten variants.
export function maybe<T>(reduced: boolean, value: T, fallback: T): T {
  return reduced ? fallback : value;
}

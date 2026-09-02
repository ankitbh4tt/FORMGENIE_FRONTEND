import { useSyncExternalStore } from "react";

/**
 * A media query as a React value. Reads through `useSyncExternalStore` so the
 * first render and every later one agree, and re-renders only when the query
 * flips. `false` until the first client read.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

const REDUCE = "(prefers-reduced-motion: reduce)";

/** The reduced-motion preference, wherever the value shapes markup or timing. */
export function useReducedMotionSafe(): boolean {
  return useMediaQuery(REDUCE);
}

/** True on devices whose primary pointer is a finger. */
export function useCoarsePointer(): boolean {
  return useMediaQuery("(pointer: coarse)");
}

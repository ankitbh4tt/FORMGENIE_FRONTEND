import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know the type scale's names, or it reads `text-ui`
 * as a colour and drops the real colour class beside it.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display",
        "text-statement",
        "text-title",
        "text-h2",
        "text-h3",
        "text-lead",
        "text-ui",
        "text-small",
        "text-label",
        "text-micro",
        "text-figure",
      ],
      rounded: ["rounded-control", "rounded-panel", "rounded-sheet"],
      shadow: ["shadow-sheet", "shadow-layer"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { useInView } from "framer-motion";
import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Amount = "some" | "all" | number;

interface RevealProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children: ReactNode;
  /** Portion that must be visible before revealing. Use "some" for blocks taller than a phone. */
  amount?: Amount;
  /** Root margin; a negative bottom margin reveals slightly after the element enters. */
  margin?: string;
  once?: boolean;
}

/**
 * Sets `data-visible` on its element once it scrolls into view. Descendants opt
 * into the motion vocabulary with `.fg-in`, `.fg-wipe` and `.fg-draw`, and stagger
 * with `style={{ "--i": n }}`. No JavaScript-driven animation: CSS does the work,
 * so the page stays responsive while things arrive.
 */
export function Reveal({
  as: Tag = "div",
  className,
  style,
  id,
  children,
  amount = 0.2,
  margin = "0px 0px -8% 0px",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  // framer-motion's margin type is a template literal; the cast keeps the prop a plain string.
  const inView = useInView(ref, { once, amount, margin: margin as never });
  return (
    <Tag ref={ref} id={id} className={className} style={style} data-visible={inView ? "" : undefined}>
      {children}
    </Tag>
  );
}

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-media-query";

interface ComposeLineProps {
  /** The line runs while this is true and completes when it turns false. */
  active: boolean;
  /** Named beats, shown in order. The last one holds until `active` ends. */
  states?: string[];
  /** How long the line takes to reach its resting point (92%) while waiting. */
  duration?: number;
  /** Milliseconds between beats. */
  beat?: number;
  /** Accessible name for the progress. */
  label?: string;
  className?: string;
  /** Width of the track. */
  width?: string;
}

const DEFAULT_STATES = ["Reading your description", "Choosing the fields", "Composing the form"];

/**
 * The compose line. One hairline drawn left to right with the accent riding its
 * head and the current beat named beneath it. It replaces every spinner in the
 * product: it says that something is happening and roughly how far along it is,
 * and it finishes when the real work does rather than pretending to.
 */
export function ComposeLine({
  active,
  states = DEFAULT_STATES,
  duration = 2400,
  beat = 720,
  label = "Composing",
  className,
  width = "min(22rem, 100%)",
}: ComposeLineProps) {
  const reduce = useReducedMotionSafe();
  const [run, setRun] = useState(false);
  const [done, setDone] = useState(false);
  const [index, setIndex] = useState(0);
  const wasActive = useRef(active);

  // The line starts one frame after mount, so the transition has somewhere to go.
  useEffect(() => {
    if (!active) return;
    const raf = requestAnimationFrame(() => setRun(true));
    return () => cancelAnimationFrame(raf);
  }, [active]);

  // Beats advance on a timer and hold on the last one.
  useEffect(() => {
    if (!active) return;
    setIndex(0);
    if (states.length < 2) return;
    let i = 0;
    const id = window.setInterval(() => {
      i = Math.min(i + 1, states.length - 1);
      setIndex(i);
      if (i === states.length - 1) window.clearInterval(id);
    }, reduce ? Math.max(300, beat / 2) : beat);
    return () => window.clearInterval(id);
  }, [active, states, beat, reduce]);

  // When the work finishes, the line completes rather than snapping away.
  useEffect(() => {
    if (wasActive.current && !active) {
      setDone(true);
      const t = window.setTimeout(() => {
        setDone(false);
        setRun(false);
      }, 360);
      wasActive.current = active;
      return () => window.clearTimeout(t);
    }
    wasActive.current = active;
  }, [active]);

  const current = states[Math.min(index, states.length - 1)] ?? label;

  return (
    <div
      className={cn("flex flex-col items-center gap-4", className)}
      data-run={run ? "" : undefined}
      data-done={done ? "" : undefined}
      style={{ "--compose-dur": `${reduce ? 300 : duration}ms`, "--compose-to": 0.92 } as CSSProperties}
    >
      <div
        className="compose-track"
        style={{ width }}
        role="progressbar"
        aria-label={label}
        aria-valuetext={done ? "Done" : current}
      >
        <span className="compose-fill" />
        <span className="compose-head" aria-hidden="true" />
      </div>
      <p className="compose-state text-small text-ink-muted" role="status" aria-live="polite">
        {states.map((s, i) => (
          <span key={s} data-shown={!done && i === index ? "" : undefined}>
            {s}
          </span>
        ))}
        <span data-shown={done ? "" : undefined}>Done</span>
      </p>
    </div>
  );
}

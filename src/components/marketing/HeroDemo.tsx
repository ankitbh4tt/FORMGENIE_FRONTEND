import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComposeLine } from "@/components/motion/ComposeLine";
import { FormRenderer } from "@/components/form-fields/FormRenderer";
import { initialValues, type FormValues, type FieldValue } from "@/components/form-fields/types";
import { useReducedMotionSafe } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import { EXAMPLES } from "./demo-data";

type Phase = "typing" | "composing" | "result";

const HOLD = 5200;
const FIRST_HOLD = 7500;
const COMPOSE = 1900;

/**
 * The product, in the hero. A prompt is typed, the compose line runs, and the
 * real renderer composes the real fields. Every example is a chip; the prompt
 * box is a real one, and a visitor's own words carry into the builder.
 *
 * The first frame already shows a finished form. While the next example is
 * typed and composed, the previous form stays on the page, dimmed, so the
 * sheet is never empty.
 */
export function HeroDemo() {
  const navigate = useNavigate();
  const reduce = useReducedMotionSafe();

  const [index, setIndex] = React.useState(0);
  const [shown, setShown] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>("result");
  const [typed, setTyped] = React.useState(EXAMPLES[0].prompt);
  const [values, setValues] = React.useState<FormValues>(() => initialValues(EXAMPLES[0].fields));
  const [paused, setPaused] = React.useState(false);
  const [custom, setCustom] = React.useState<string | null>(null);
  const [note, setNote] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const first = React.useRef(true);

  const example = EXAMPLES[index];
  const displayed = EXAMPLES[shown];
  const editing = custom !== null;
  const settled = phase === "result";

  const go = React.useCallback(
    (i: number) => {
      setIndex(i);
      setNote(false);
      if (reduce) {
        setTyped(EXAMPLES[i].prompt);
        setShown(i);
        setValues(initialValues(EXAMPLES[i].fields));
        setPhase("result");
        return;
      }
      setTyped("");
      setPhase("typing");
    },
    [reduce]
  );

  // The state machine. Typing, composing, then a hold before the next example.
  React.useEffect(() => {
    if (editing || reduce) return;
    const timers: number[] = [];

    if (phase === "typing") {
      const full = example.prompt;
      let i = 0;
      const tick = () => {
        i += 1;
        setTyped(full.slice(0, i));
        if (i < full.length) timers.push(window.setTimeout(tick, 22 + Math.random() * 26));
        else timers.push(window.setTimeout(() => setPhase("composing"), 500));
      };
      timers.push(window.setTimeout(tick, 320));
    } else if (phase === "composing") {
      timers.push(
        window.setTimeout(() => {
          setShown(index);
          setValues(initialValues(example.fields));
          setPhase("result");
        }, COMPOSE)
      );
    } else if (!paused) {
      timers.push(window.setTimeout(() => go((index + 1) % EXAMPLES.length), first.current ? FIRST_HOLD : HOLD));
      first.current = false;
    }

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [phase, index, example, editing, paused, reduce, go]);

  const startEditing = () => {
    setCustom(typed);
    setPaused(true);
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const build = () => {
    const prompt = (custom ?? "").trim();
    navigate(prompt ? `/builder?prompt=${encodeURIComponent(prompt)}` : "/builder");
  };

  const onValue = (label: string, v: FieldValue) => setValues((prev) => ({ ...prev, [label]: v }));

  return (
    <div
      className="sheet overflow-hidden"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        if (!editing) setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
    >
      {/* The composer */}
      <div className="border-b border-border bg-surface-sunken/50 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="label text-ink-faint">Describe your form</p>
          {!editing && (
            <button type="button" onClick={startEditing} className="link-quiet text-small text-ink-muted">
              Try your own
            </button>
          )}
        </div>

        <div className="mt-2.5 flex items-end gap-2 rounded-control border border-border-strong bg-surface p-2 transition-[border-color,box-shadow] duration-(--dur-base) focus-within:border-ink focus-within:shadow-[inset_0_0_0_1px_var(--ink)]">
          {editing ? (
            <textarea
              ref={textareaRef}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  build();
                }
              }}
              rows={2}
              aria-label="Describe your form"
              placeholder="A sign-up sheet for the Saturday workshop with name, email and a t-shirt size."
              className="min-h-[3.5rem] flex-1 resize-none bg-transparent px-2 py-1.5 text-[1rem] leading-relaxed text-ink outline-none placeholder:text-ink-faint"
            />
          ) : (
            <button
              type="button"
              onClick={startEditing}
              className="min-h-[3.5rem] flex-1 cursor-text px-2 py-1.5 text-left text-[1rem] leading-relaxed text-ink"
              aria-label="Edit this description"
            >
              {typed}
              {phase === "typing" && (
                <span aria-hidden="true" className="ml-px inline-block h-[1.1em] w-px translate-y-[3px] bg-accent" />
              )}
            </button>
          )}
          <button
            type="button"
            onClick={editing ? build : startEditing}
            aria-label={editing ? "Build this form" : "Describe your own form"}
            className="grid size-10 shrink-0 place-items-center rounded-control bg-accent text-accent-fg transition-[background-color,transform] duration-(--dur-fast) hover:bg-accent-hover active:scale-95"
          >
            <ArrowUp className="size-[18px]" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {EXAMPLES.map((ex, i) => (
            <button
              key={ex.id}
              type="button"
              aria-pressed={!editing && i === index}
              onClick={() => {
                setCustom(null);
                setPaused(true);
                go(i);
              }}
              className={cn(
                "min-h-9 rounded-full border px-3 text-small font-medium transition-colors duration-(--dur-fast)",
                !editing && i === index
                  ? "border-ink bg-ink text-bg"
                  : "border-border text-ink-muted hover:border-border-strong hover:text-ink"
              )}
            >
              {ex.label}
            </button>
          ))}
          {editing && (
            <Button variant="accent" size="sm" className="ml-auto" arrow onClick={build}>
              Build this form
            </Button>
          )}
        </div>
      </div>

      {/* The form */}
      <div className="relative min-h-[27rem] p-5 sm:p-6">
        {phase === "composing" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
            <div className="w-full max-w-[26rem] rounded-panel bg-surface/85 px-8 py-7 backdrop-blur-[2px]">
                <ComposeLine active duration={COMPOSE - 200} beat={600} />
              </div>
          </div>
        )}
        <div
          className={cn("transition-opacity duration-(--dur-slow)", settled ? "opacity-100" : "opacity-40")}
          aria-busy={!settled || undefined}
        >
          <p className="font-display text-h2 text-ink">{displayed.title}</p>
          <div className="mt-5" key={displayed.id}>
            <FormRenderer
              schema={displayed.fields}
              values={values}
              onChange={onValue}
              idPrefix={`demo-${displayed.id}`}
              compact
            />
          </div>
          <div className="mt-6">
            <Button variant="primary" size="lg" className="w-full" onClick={() => setNote(true)}>
              Submit
            </Button>
            <p className="mt-2 min-h-5 text-center text-small text-ink-faint" aria-live="polite">
              {note ? "In a published form, this answer lands in your dashboard." : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

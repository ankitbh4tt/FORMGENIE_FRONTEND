import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";

type FieldKind = "text" | "email" | "select" | "textarea" | "checkbox";
interface DemoField {
  label: string;
  kind: FieldKind;
  options?: string[];
}
interface DemoExample {
  prompt: string;
  title: string;
  fields: DemoField[];
}

const EXAMPLES: DemoExample[] = [
  {
    prompt:
      "A contact form with name, email, the service they need, and a message.",
    title: "Get in touch",
    fields: [
      { label: "Full name", kind: "text" },
      { label: "Email address", kind: "email" },
      { label: "Service", kind: "select", options: ["Design", "Engineering", "Consulting"] },
      { label: "Message", kind: "textarea" },
    ],
  },
  {
    prompt: "An event RSVP with name, email, how many guests, and dietary notes.",
    title: "You're invited",
    fields: [
      { label: "Your name", kind: "text" },
      { label: "Email address", kind: "email" },
      { label: "Number of guests", kind: "select", options: ["1", "2", "3", "4+"] },
      { label: "Dietary notes", kind: "textarea" },
      { label: "I'll be there", kind: "checkbox" },
    ],
  },
  {
    prompt: "A job application with role, portfolio link, and a short intro.",
    title: "Apply to join us",
    fields: [
      { label: "Full name", kind: "text" },
      { label: "Role", kind: "select", options: ["Frontend", "Backend", "Design"] },
      { label: "Portfolio URL", kind: "text" },
      { label: "Tell us about yourself", kind: "textarea" },
    ],
  },
];

type Phase = "typing" | "generating" | "result";

function FieldShell({ field, index }: { field: DemoField; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: index * 0.08, ease: [0.2, 0, 0, 1] }}
      className="flex flex-col gap-1.5"
    >
      <span className="text-[12px] font-medium text-ink-muted">
        {field.label}
      </span>
      {field.kind === "textarea" ? (
        <div className="h-12 rounded-md border border-border-strong bg-surface-sunken/60" />
      ) : field.kind === "select" ? (
        <div className="flex h-8 items-center justify-between rounded-md border border-border-strong bg-surface px-2.5">
          <span className="text-[12px] text-ink-faint">
            {field.options?.[0]}
          </span>
          <span className="text-ink-faint">▾</span>
        </div>
      ) : field.kind === "checkbox" ? (
        <div className="flex items-center gap-2">
          <span className="grid size-4 place-items-center rounded border border-accent bg-accent">
            <Check className="size-3 text-accent-fg" strokeWidth={3} />
          </span>
          <span className="text-[12px] text-ink-muted">{field.label}</span>
        </div>
      ) : (
        <div className="h-8 rounded-md border border-border-strong bg-surface" />
      )}
    </motion.div>
  );
}

export function HeroDemo() {
  const reduced = useReducedMotion();
  const [exampleIndex, setExampleIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>(reduced ? "result" : "typing");
  const [typed, setTyped] = React.useState(reduced ? EXAMPLES[0].prompt : "");

  const example = EXAMPLES[exampleIndex];

  // Typewriter + phase state machine
  React.useEffect(() => {
    if (reduced) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const full = example.prompt;

    if (phase === "typing") {
      setTyped("");
      let i = 0;
      const tick = () => {
        i += 1;
        setTyped(full.slice(0, i));
        if (i < full.length) {
          timers.push(setTimeout(tick, 26 + Math.random() * 26));
        } else {
          timers.push(setTimeout(() => setPhase("generating"), 600));
        }
      };
      timers.push(setTimeout(tick, 350));
    } else if (phase === "generating") {
      timers.push(setTimeout(() => setPhase("result"), 900));
    } else if (phase === "result") {
      const hold = 2600 + example.fields.length * 150;
      timers.push(
        setTimeout(() => {
          setExampleIndex((p) => (p + 1) % EXAMPLES.length);
          setPhase("typing");
        }, hold)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [phase, exampleIndex, reduced, example.prompt, example.fields.length]);

  return (
    <div className="relative w-full max-w-md">
      {/* soft paper shadow stack behind */}
      <div className="absolute inset-x-4 -bottom-3 h-full rounded-2xl border border-border bg-surface/60" />
      <div className="absolute inset-x-2 -bottom-1.5 h-full rounded-2xl border border-border bg-surface/80" />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
        {/* prompt bar */}
        <div className="border-b border-border bg-surface-sunken/50 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-faint">
            <Sparkles className="size-3" />
            Describe your form
          </div>
          <div className="min-h-[58px] rounded-lg border border-border bg-surface px-3 py-2 text-[13px] leading-relaxed text-ink">
            {typed}
            {phase === "typing" && (
              <span className="ml-px inline-block h-[15px] w-px translate-y-[2px] animate-pulse bg-accent" />
            )}
          </div>
        </div>

        {/* result area — fixed height (sized to the tallest example) so the
            card never resizes as it cycles between forms */}
        <div className="relative min-h-[484px] p-5">
          <AnimatePresence mode="wait">
            {phase === "generating" ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-muted"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  className="grid size-9 place-items-center rounded-full border border-accent/30"
                >
                  <Sparkles className="size-4 text-accent" />
                </motion.span>
                <span className="text-[13px]">Composing your form…</span>
              </motion.div>
            ) : phase === "result" ? (
              <motion.div
                key={`result-${exampleIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-lg font-medium tracking-tight text-ink"
                >
                  {example.title}
                </motion.h3>
                {example.fields.map((f, i) => (
                  <FieldShell key={f.label} field={f} index={i} />
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: example.fields.length * 0.08 + 0.1 }}
                  className="mt-1 flex h-9 items-center justify-center rounded-lg bg-accent text-[13px] font-medium text-accent-fg"
                >
                  Submit
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="flex h-full items-center justify-center pt-16 text-[13px] text-ink-faint"
              >
                Your form appears here.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ComposeLine } from "@/components/motion/ComposeLine";
import { FormRenderer } from "@/components/form-fields/FormRenderer";
import { diffSchemas, initialValues, type FormValues, type FieldValue } from "@/components/form-fields/types";
import { useReducedMotionSafe } from "@/lib/use-media-query";
import { Logo } from "@/components/common/Logo";
import { SectionHeading } from "./primitives";
import { REFINE } from "./demo-data";
import { cn } from "@/lib/utils";

type Phase = "before" | "applying" | "after";

/**
 * Change it by asking. The part that makes FormGenie different from a form
 * builder, shown rather than described: one request, the compose line, and two
 * fields marked when they land. It plays once when it comes into view and can
 * be replayed.
 */
export function RefineDemo() {
  const reduce = useReducedMotionSafe();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [phase, setPhase] = React.useState<Phase>("before");
  const [run, setRun] = React.useState(0);
  const [values, setValues] = React.useState<FormValues>(() => initialValues(REFINE.after));

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setPhase("after");
      return;
    }
    setPhase("before");
    const t1 = window.setTimeout(() => setPhase("applying"), 1100);
    const t2 = window.setTimeout(() => setPhase("after"), 1100 + 1500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [inView, run, reduce]);

  const schema = phase === "after" ? REFINE.after : REFINE.before;
  const highlights = phase === "after" ? diffSchemas(REFINE.before, REFINE.after).highlights : undefined;
  const onValue = (label: string, v: FieldValue) => setValues((prev) => ({ ...prev, [label]: v }));

  return (
    <section id="refine" aria-labelledby="refine-title" className="py-section">
      <div ref={ref} className="frame grid gap-x-10 gap-y-10 lg:grid-cols-12 lg:items-start" data-visible={inView ? "" : undefined}>
        <div className="lg:col-span-5">
          <SectionHeading
            id="refine-title"
            statement="Change it by asking."
            description="Add a field, make one required, reorder. Say what you want, and the form adjusts in front of you."
          />

          <div className="mt-10 flex flex-col gap-4">
            <p className="fg-in ml-auto max-w-[30ch] rounded-panel rounded-br-sm bg-ink px-4 py-3 text-ui text-bg" style={{ "--i": 2 } as React.CSSProperties}>
              {REFINE.request}
            </p>
            <div
              className={cn(
                "flex max-w-[36ch] items-start gap-3 text-ui text-ink transition-opacity duration-(--dur-slow)",
                phase === "after" ? "opacity-100" : "opacity-0"
              )}
              aria-hidden={phase !== "after"}
            >
              <Logo className="mt-0.5 size-5 shrink-0 text-ink-muted" />
              <p>{REFINE.reply}</p>
            </div>
          </div>

          {!reduce && (
            <Button
              variant="quiet"
              size="sm"
              className="fg-in mt-6"
              style={{ "--i": 3 } as React.CSSProperties}
              onClick={() => {
                setValues(initialValues(REFINE.after));
                setRun((r) => r + 1);
              }}
              disabled={phase !== "after"}
            >
              Replay
            </Button>
          )}
        </div>

        <div className="fg-in lg:col-span-6 lg:col-start-7" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="sheet relative p-5 sm:p-7">
            {phase === "applying" && (
              <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
                <div className="w-full max-w-[26rem] rounded-panel bg-surface/85 px-8 py-7 backdrop-blur-[2px]">
                <ComposeLine active states={["Reading your request", "Applying the change"]} duration={1300} beat={650} />
              </div>
              </div>
            )}
            <div
              className={cn("transition-opacity duration-(--dur-slow)", phase === "applying" ? "opacity-40" : "opacity-100")}
              aria-busy={phase === "applying" || undefined}
            >
              <p className="font-display text-h2 text-ink">{REFINE.title}</p>
              <div className="mt-5">
                <FormRenderer
                  schema={schema}
                  values={values}
                  onChange={onValue}
                  idPrefix="refine"
                  highlights={highlights}
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

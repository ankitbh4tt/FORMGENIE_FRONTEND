import { useState, useEffect } from "react";
import FormActions from "./FormActions";
import { ComposeLine } from "@/components/motion/ComposeLine";
import { FormRenderer } from "@/components/form-fields/FormRenderer";
import { Button } from "@/components/ui/button";
import { initialValues, type FieldChange, type FormField, type FormValues, type FieldValue } from "@/components/form-fields/types";
import { plural } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PreviewPanelProps {
  formSchema: FormField[];
  sessionId: string | null | undefined;
  onNavigate: (url: string) => void;
  onSchemaUpdate: (schema: FormField[], sessionId: string) => void;
  isGenerating: boolean;
  highlights?: Record<string, FieldChange>;
  onSuggest?: (prompt: string) => void;
  className?: string;
}

const STARTERS = [
  { label: "Contact form", prompt: "Create a contact form with name, email, and a message." },
  { label: "Event RSVP", prompt: "Build an RSVP form with name, email, number of guests, and dietary notes." },
  { label: "Feedback survey", prompt: "Make a feedback survey with a rating and a short comment." },
];

/**
 * The form, as the respondent will see it. A sheet on paper, fully interactive
 * so the person can try their own form. While a change is being made the sheet
 * stays on the page, dimmed, and the compose line names what is happening.
 */
const PreviewPanel = ({
  formSchema,
  sessionId,
  onNavigate,
  onSchemaUpdate,
  isGenerating,
  highlights,
  onSuggest,
  className,
}: PreviewPanelProps) => {
  const hasForm = formSchema.length > 0;
  const [values, setValues] = useState<FormValues>(() => initialValues(formSchema));
  const [tried, setTried] = useState(false);

  // A new schema resets the trial values; fields that survived keep their names.
  useEffect(() => {
    setValues((prev) => ({ ...initialValues(formSchema), ...Object.fromEntries(Object.entries(prev).filter(([k]) => formSchema.some((f) => f.label === k))) }));
    setTried(false);
  }, [formSchema]);

  const onValue = (label: string, v: FieldValue) => setValues((prev) => ({ ...prev, [label]: v }));

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      {/* Head: what this is, and the actions */}
      <div className="hidden shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3 sm:px-6 lg:flex">
        <p className="text-small text-ink-muted">
          <span className="font-medium text-ink">Preview</span>
          {hasForm && !isGenerating && <span className="tabular"> · {plural(formSchema.length, "field")}</span>}
          {isGenerating && <span> · Composing</span>}
        </p>
        <div className="hidden lg:block">
          <FormActions sessionId={sessionId} formSchema={formSchema} onNavigate={onNavigate} onSchemaUpdate={onSchemaUpdate} layout="bar" />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-surface-sunken/40 px-4 py-6 sm:px-6 sm:py-8">
        {!hasForm && !isGenerating ? (
          <div className="mx-auto flex max-w-md flex-col items-start gap-4 py-10">
            <p className="font-display text-statement text-ink">Your form appears here.</p>
            <p className="text-lead text-ink-muted">Describe what you need in the conversation, or start from one of these.</p>
            {onSuggest && (
              <div className="mt-2 flex flex-wrap gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => onSuggest(s.prompt)}
                    className="min-h-10 rounded-full border border-border bg-surface px-3.5 text-small font-medium text-ink-muted transition-colors duration-(--dur-fast) hover:border-border-strong hover:text-ink"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="sheet relative mx-auto max-w-2xl">
            {isGenerating && (
              <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
                <div className="w-full max-w-[26rem] rounded-panel bg-surface/85 px-8 py-7 backdrop-blur-[2px]">
                <ComposeLine
                  active
                  states={hasForm ? ["Reading your request", "Applying the change", "Composing the form"] : undefined}
                />
                </div>
              </div>
            )}
            <div
              className={cn("px-6 py-7 transition-opacity duration-(--dur-slow) sm:px-9 sm:py-9", isGenerating && "opacity-40")}
              aria-busy={isGenerating || undefined}
            >
              {hasForm ? (
                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTried(true);
                  }}
                >
                  <FormRenderer schema={formSchema} values={values} onChange={onValue} idPrefix="preview" highlights={highlights} />
                  <div className="mt-8 border-t border-border pt-7">
                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      Submit
                    </Button>
                    <p className="mt-2 min-h-5 text-center text-small text-ink-faint" aria-live="polite">
                      {tried ? "Publish the form to start collecting responses." : ""}
                    </p>
                  </div>
                </form>
              ) : (
                <div className="min-h-[18rem]" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Phone: the actions pinned where a thumb is */}
      {hasForm && (
        <div className="shrink-0 border-t border-border bg-bg px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden [&>div]:justify-end">
          <FormActions sessionId={sessionId} formSchema={formSchema} onNavigate={onNavigate} onSchemaUpdate={onSchemaUpdate} layout="bar" />
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;

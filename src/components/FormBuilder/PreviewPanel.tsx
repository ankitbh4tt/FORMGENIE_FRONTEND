import { FileText } from "lucide-react";
import FormActions from "./FormActions";
import FormSkeleton from "../ui/FormSkeleton";
import { FormRenderer } from "../form-fields/FormRenderer";
import { initialValues, type FormField } from "../form-fields/types";

interface PreviewPanelProps {
  formSchema: FormField[];
  sessionId: string | null | undefined;
  onNavigate: (url: string) => void;
  onSchemaUpdate: (schema: FormField[], sessionId: string) => void;
  isGenerating: boolean;
}

const PreviewPanel = ({
  formSchema,
  sessionId,
  onNavigate,
  onSchemaUpdate,
  isGenerating,
}: PreviewPanelProps) => {
  const showSkeleton = isGenerating;
  const hasForm = formSchema.length > 0;

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="font-display text-lg font-medium tracking-tight text-ink">
            Live preview
          </h2>
          <p className="text-[13px] text-ink-muted">
            Updates as you chat
          </p>
        </div>
        {hasForm && !showSkeleton && (
          <span className="rounded-md bg-surface-sunken px-2 py-0.5 text-[11px] font-medium text-ink-muted">
            {formSchema.length} field{formSchema.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-5">
        {showSkeleton ? (
          <FormSkeleton />
        ) : hasForm ? (
          <div className="flex flex-col gap-7">
            <FormRenderer
              schema={formSchema}
              values={initialValues(formSchema)}
              disabled
            />
            <FormActions
              sessionId={sessionId}
              formSchema={formSchema}
              onNavigate={onNavigate}
              onSchemaUpdate={onSchemaUpdate}
            />
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-4 grid size-14 place-items-center rounded-2xl border border-border bg-surface-sunken text-ink-faint">
              <FileText className="size-6" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg font-medium text-ink">
              Your form will appear here
            </h3>
            <p className="mt-1 max-w-xs text-sm text-ink-muted">
              Describe what you need in the chat and watch it take shape.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;

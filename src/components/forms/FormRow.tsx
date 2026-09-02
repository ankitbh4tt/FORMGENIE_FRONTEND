import * as React from "react";
import { formatDate, plural } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface FormSummary {
  formId: string;
  title: string;
  description?: string;
  createdAt: string;
  schema?: unknown[];
}

interface FormRowProps {
  form: FormSummary;
  index?: number;
  /** The row's main destination. */
  onOpen?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * One form in an index. A row, not a card: the title is the way in, the
 * count and the date are figures, the actions are words.
 */
export function FormRow({ form, index = 0, onOpen, actions, className }: FormRowProps) {
  const fields = form.schema?.length ?? 0;
  return (
    <li
      className={cn("fg-in hairline-b grid gap-x-8 gap-y-3 py-5 md:grid-cols-[1fr_auto] md:items-center", className)}
      style={{ "--i": Math.min(index, 8) } as React.CSSProperties}
    >
      <div className="min-w-0">
        {onOpen ? (
          <button
            type="button"
            onClick={onOpen}
            className="link-line text-left text-h3 font-semibold text-ink"
          >
            {form.title}
          </button>
        ) : (
          <p className="text-h3 font-semibold text-ink">{form.title}</p>
        )}
        {form.description && <p className="mt-1 line-clamp-2 max-w-[60ch] text-ui text-ink-muted">{form.description}</p>}
        <p className="tabular mt-1.5 text-small text-ink-faint">
          {plural(fields, "field")} · {formatDate(form.createdAt)}
        </p>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 md:justify-end">{actions}</div>}
    </li>
  );
}

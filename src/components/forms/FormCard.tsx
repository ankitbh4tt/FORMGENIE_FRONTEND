import * as React from "react";
import { motion } from "framer-motion";
import { ListChecks } from "lucide-react";

export interface FormSummary {
  formId: string;
  title: string;
  description?: string;
  createdAt: string;
  schema?: unknown[];
}

export function FormCard({
  form,
  index = 0,
  footer,
}: {
  form: FormSummary;
  index?: number;
  footer?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.2, 0, 0, 1] }}
      className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-xs transition-[border-color,box-shadow] hover:border-border-strong hover:shadow-md"
    >
      <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-ink">
        {form.title}
      </h3>
      {form.description && (
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {form.description}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-ink-faint">
        <span className="inline-flex items-center gap-1.5">
          <ListChecks className="size-3.5" />
          {form.schema?.length || 0} fields
        </span>
        <span>{new Date(form.createdAt).toLocaleDateString()}</span>
      </div>

      {footer && <div className="mt-4">{footer}</div>}
    </motion.div>
  );
}

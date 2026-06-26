import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/field";
import { FieldControl } from "./FieldControl";
import type { FormField, FormValues, FieldValue } from "./types";

interface FormRendererProps {
  schema: FormField[];
  values: FormValues;
  onChange?: (label: string, value: FieldValue) => void;
  errors?: Record<string, string>;
  /** Non-interactive visual preview (used in the builder). */
  disabled?: boolean;
  idPrefix?: string;
}

export function FormRenderer({
  schema,
  values,
  onChange,
  errors,
  disabled,
  idPrefix = "field",
}: FormRendererProps) {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col gap-6">
      {schema.map((field, index) => {
        const id = `${idPrefix}-${index}`;
        const error = errors?.[field.label];
        const isCheckbox = field.type === "checkbox";

        return (
          <motion.div
            key={`${field.label}-${index}`}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: reduced ? 0 : index * 0.05 }}
            className="flex flex-col gap-1.5"
          >
            {!isCheckbox && (
              <Label htmlFor={id} required={field.required}>
                {field.label}
              </Label>
            )}

            <FieldControl
              field={field}
              id={id}
              value={values[field.label]}
              onChange={(v) => onChange?.(field.label, v)}
              invalid={!!error}
              disabled={disabled}
              describedBy={error ? `${id}-error` : undefined}
            />

            {error && (
              <p
                id={`${id}-error`}
                role="alert"
                className="flex items-center gap-1.5 text-[13px] text-danger"
              >
                <AlertCircle className="size-3.5 shrink-0" />
                {error}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

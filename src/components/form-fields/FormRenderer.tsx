import type { CSSProperties } from "react";
import { Label } from "@/components/ui/field";
import { FieldControl } from "./FieldControl";
import { cn } from "@/lib/utils";
import type { FieldChange, FormField, FormValues, FieldValue } from "./types";

interface FormRendererProps {
  schema: FormField[];
  values: FormValues;
  onChange?: (label: string, value: FieldValue) => void;
  errors?: Record<string, string>;
  /** Non-interactive preview. */
  disabled?: boolean;
  idPrefix?: string;
  /** Fields compose into place as they mount. */
  animate?: boolean;
  /** Fields that a request just added or changed, marked for a moment. */
  highlights?: Record<string, FieldChange>;
  /** Tighter rhythm for demonstrations. */
  compact?: boolean;
}

/**
 * The one renderer for every form: the builder's preview, the respondent's
 * page, the homepage demonstrations. Same fields, same spacing, same rules.
 */
export function FormRenderer({
  schema,
  values,
  onChange,
  errors,
  disabled,
  idPrefix = "field",
  animate = true,
  highlights,
  compact = false,
}: FormRendererProps) {
  // Keys by label, so an unchanged field keeps its node when a request moves
  // its neighbours. Duplicate labels fall back to their position.
  const seen = new Map<string, number>();

  return (
    <div className={cn("flex flex-col", compact ? "gap-4" : "gap-6")}>
      {schema.map((field, index) => {
        const n = seen.get(field.label) ?? 0;
        seen.set(field.label, n + 1);
        const key = n === 0 ? field.label : `${field.label}-${n}`;
        const id = `${idPrefix}-${index}`;
        const error = errors?.[field.label];
        const isCheckbox = field.type === "checkbox";
        const mark = highlights?.[field.label];

        return (
          <div
            key={key}
            className={cn("flex flex-col gap-1.5", animate && "fg-compose", mark && "fg-changed")}
            style={{ "--i": Math.min(index, 10) } as CSSProperties}
            data-changed={mark}
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
              dense={compact}
              describedBy={error ? `${id}-error` : undefined}
            />

            {error && (
              <p id={`${id}-error`} role="alert" className="text-small text-danger">
                {error}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

import * as React from "react";
import { Star, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "@/components/ui/radio";
import { cn } from "@/lib/utils";
import type { FormField, FieldValue } from "./types";

interface FieldControlProps {
  field: FormField;
  id: string;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
  invalid?: boolean;
  disabled?: boolean;
  describedBy?: string;
}

export function FieldControl({
  field,
  id,
  value,
  onChange,
  invalid,
  disabled,
  describedBy,
}: FieldControlProps) {
  const placeholder = `Enter ${field.label.toLowerCase()}`;

  switch (field.type) {
    case "text":
    case "email":
    case "number":
      return (
        <Input
          id={id}
          type={field.type}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          invalid={invalid}
          disabled={disabled}
          aria-describedby={describedBy}
        />
      );

    case "date":
      return (
        <Input
          id={id}
          type="date"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          invalid={invalid}
          disabled={disabled}
          aria-describedby={describedBy}
        />
      );

    case "select":
      return (
        <Select
          id={id}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          invalid={invalid}
          disabled={disabled}
          aria-describedby={describedBy}
        >
          <option value="">Choose an option</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      );

    case "checkbox":
      return (
        <Checkbox
          id={id}
          checked={value === true}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          label={field.label}
          aria-describedby={describedBy}
        />
      );

    case "radio":
      return (
        <div
          role="radiogroup"
          aria-label={field.label}
          className="flex flex-col gap-2.5 pt-1"
        >
          {field.options?.map((opt) => (
            <Radio
              key={opt}
              name={id}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              disabled={disabled}
              label={opt}
            />
          ))}
        </div>
      );

    case "rating": {
      const current = Number(value ?? 0);
      return (
        <div className="flex items-center gap-1.5 pt-0.5" role="radiogroup" aria-label={field.label}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={disabled}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              aria-pressed={current >= star}
              onClick={() => onChange(star)}
              className="rounded-md p-0.5 text-ink-faint transition-colors hover:text-warning focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed"
            >
              <Star
                className={cn(
                  "size-6 transition-colors",
                  current >= star && "fill-warning text-warning"
                )}
                strokeWidth={1.75}
              />
            </button>
          ))}
        </div>
      );
    }

    case "file":
      return (
        <div className="relative">
          <input
            id={id}
            type="file"
            disabled={disabled}
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file ? file.name : "");
            }}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
            aria-describedby={describedBy}
          />
          <div
            className={cn(
              "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-strong bg-surface-sunken/50 px-4 py-7 text-center transition-colors",
              invalid && "border-danger"
            )}
          >
            <UploadCloud className="size-5 text-ink-faint" />
            <span className="text-sm text-ink-muted">
              {value ? String(value) : "Choose a file or drag it here"}
            </span>
          </div>
        </div>
      );

    default:
      return (
        <Textarea
          id={id}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          invalid={invalid}
          disabled={disabled}
          rows={4}
          aria-describedby={describedBy}
        />
      );
  }
}

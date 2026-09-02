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
  /** Shorter long-text boxes, for demonstrations. */
  dense?: boolean;
  describedBy?: string;
}

/** One control per field type. The label lives above it, in the renderer. */
export function FieldControl({ field, id, value, onChange, invalid, disabled, dense, describedBy }: FieldControlProps) {
  switch (field.type) {
    case "text":
    case "number":
      return (
        <Input
          id={id}
          type={field.type}
          inputMode={field.type === "number" ? "decimal" : undefined}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          invalid={invalid}
          disabled={disabled}
          aria-describedby={describedBy}
        />
      );

    case "email":
      return (
        <Input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
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
          <option value="">Choose one</option>
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
          label={
            <>
              {field.label}
              {field.required && (
                <span className="ml-1.5 text-ink-faint" aria-hidden="true">
                  *
                </span>
              )}
            </>
          }
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
        />
      );

    case "radio":
      return (
        <div role="radiogroup" aria-label={field.label} aria-invalid={invalid || undefined} className="flex flex-col">
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

    case "rating":
      return (
        <RatingControl
          id={id}
          value={Number(value ?? 0)}
          onChange={onChange}
          disabled={disabled}
          label={field.label}
          invalid={invalid}
        />
      );

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
            className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
          />
          <div
            className={cn(
              "flex min-h-24 flex-col items-center justify-center gap-2 rounded-control border border-dashed border-border-strong bg-surface px-4 py-6 text-center transition-colors duration-(--dur-base) peer-hover:border-ink-faint peer-focus-visible:border-ink",
              invalid && "border-danger"
            )}
          >
            <UploadCloud className="size-5 text-ink-faint" strokeWidth={1.75} aria-hidden="true" />
            <span className="text-small text-ink-muted">{value ? String(value) : "Choose a file, or drop it here"}</span>
          </div>
        </div>
      );

    default:
      return (
        <Textarea
          id={id}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          invalid={invalid}
          disabled={disabled}
          rows={dense ? 3 : 4}
          aria-describedby={describedBy}
        />
      );
  }
}

/**
 * Five stars as a radio group: arrow keys move, the chosen count is read out,
 * and the hover preview is an enhancement rather than the interaction.
 */
function RatingControl({
  id,
  value,
  onChange,
  disabled,
  label,
  invalid,
}: {
  id: string;
  value: number;
  onChange: (v: FieldValue) => void;
  disabled?: boolean;
  label: string;
  invalid?: boolean;
}) {
  const [hover, setHover] = React.useState(0);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const shown = hover || value;

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, star: number) => {
    const forward = e.key === "ArrowRight" || e.key === "ArrowUp";
    const back = e.key === "ArrowLeft" || e.key === "ArrowDown";
    if (!forward && !back) return;
    e.preventDefault();
    const next = Math.min(5, Math.max(1, star + (forward ? 1 : -1)));
    onChange(next);
    refs.current[next - 1]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-invalid={invalid || undefined}
      className="flex items-center gap-1"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          ref={(el) => {
            refs.current[star - 1] = el;
          }}
          id={star === 1 ? id : undefined}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
          tabIndex={value === star || (!value && star === 1) ? 0 : -1}
          disabled={disabled}
          onClick={() => onChange(star)}
          onKeyDown={(e) => onKey(e, star)}
          onMouseEnter={() => setHover(star)}
          className="grid size-10 place-items-center rounded-control text-ink-faint transition-[color,transform] duration-(--dur-fast) active:scale-95 disabled:cursor-not-allowed"
        >
          <Star
            className={cn("size-6 transition-colors duration-(--dur-fast)", shown >= star && "fill-warning text-warning")}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </button>
      ))}
      <span className="tabular ml-2 min-w-[3ch] text-small text-ink-muted" aria-hidden="true">
        {value ? `${value} / 5` : ""}
      </span>
    </div>
  );
}

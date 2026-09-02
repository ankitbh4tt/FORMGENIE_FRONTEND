export interface FormField {
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

export interface FormSchema {
  title: string;
  description?: string;
  schema: FormField[];
}

export type FieldValue = string | number | boolean;
export type FormValues = Record<string, FieldValue>;

/** Initial values matching the backend's expected shape per field type. */
export function initialValues(schema: FormField[]): FormValues {
  const values: FormValues = {};
  for (const field of schema) {
    if (field.type === "checkbox") values[field.label] = false;
    else if (field.type === "rating") values[field.label] = 0;
    else values[field.label] = "";
  }
  return values;
}

/** Returns the labels of required fields that are empty or unfilled. */
export function missingRequired(schema: FormField[], values: FormValues): string[] {
  return schema
    .filter((f) => {
      if (!f.required) return false;
      const v = values[f.label];
      if (f.type === "checkbox") return v !== true;
      if (f.type === "rating") return !v || v === 0;
      return v === "" || v === undefined || v === null;
    })
    .map((f) => f.label);
}

export type FieldChange = "added" | "changed";

export interface SchemaDiff {
  highlights: Record<string, FieldChange>;
  added: string[];
  changed: string[];
  removed: string[];
}

/**
 * What a request changed. Compared by label: a new label is "added", a label
 * whose type, requirement or options moved is "changed". The builder marks
 * those fields when they land and writes one sentence about it.
 */
export function diffSchemas(prev: FormField[], next: FormField[]): SchemaDiff {
  const before = new Map(prev.map((f) => [f.label, f]));
  const after = new Map(next.map((f) => [f.label, f]));
  const highlights: Record<string, FieldChange> = {};
  const added: string[] = [];
  const changed: string[] = [];
  const removed: string[] = [];

  for (const f of next) {
    const old = before.get(f.label);
    if (!old) {
      highlights[f.label] = "added";
      added.push(f.label);
      continue;
    }
    const sameOptions = (old.options ?? []).join(" ") === (f.options ?? []).join(" ");
    if (old.type !== f.type || !!old.required !== !!f.required || !sameOptions) {
      highlights[f.label] = "changed";
      changed.push(f.label);
    }
  }
  for (const f of prev) if (!after.has(f.label)) removed.push(f.label);

  return { highlights, added, changed, removed };
}

const list = (labels: string[]) =>
  labels.length <= 2 ? labels.join(" and ") : `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`;

/** "Added Phone number. Changed Email address." or null when nothing moved. */
export function describeDiff(d: SchemaDiff): string | null {
  const parts: string[] = [];
  if (d.added.length) parts.push(`Added ${list(d.added)}`);
  if (d.changed.length) parts.push(`Changed ${list(d.changed)}`);
  if (d.removed.length) parts.push(`Removed ${list(d.removed)}`);
  return parts.length ? `${parts.join(". ")}.` : null;
}

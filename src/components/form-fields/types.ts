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

/** Returns the labels of required fields that are empty/unfilled. */
export function missingRequired(
  schema: FormField[],
  values: FormValues
): string[] {
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

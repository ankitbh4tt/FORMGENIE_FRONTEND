import * as React from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Label } from "@/components/ui/field";
import { FieldControl } from "@/components/form-fields/FieldControl";
import { initialValues, type FormValues, type FieldValue } from "@/components/form-fields/types";
import { SectionHeading } from "./primitives";
import { FIELD_TYPES } from "./demo-data";

/** Every field type, as the real control, working. Try them. */
export function FieldTypes() {
  const [values, setValues] = React.useState<FormValues>(() => initialValues(FIELD_TYPES));
  const onValue = (label: string, v: FieldValue) => setValues((prev) => ({ ...prev, [label]: v }));

  return (
    <section id="fields" aria-labelledby="fields-title" className="py-section">
      <div className="frame">
        <Reveal amount="some">
          <SectionHeading
            id="fields-title"
            statement="Every field type, already working."
            description="These are the controls your respondents get, on every screen size. Try them."
          />

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {FIELD_TYPES.map((field, i) => {
              const id = `type-${field.type}`;
              const isCheckbox = field.type === "checkbox";
              return (
                <div key={field.type} className="fg-in flex flex-col gap-1.5" style={{ "--i": Math.min(i, 8) + 1 } as React.CSSProperties}>
                  {!isCheckbox && <Label htmlFor={id}>{field.label}</Label>}
                  <FieldControl field={field} id={id} value={values[field.label]} onChange={(v) => onValue(field.label, v)} />
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

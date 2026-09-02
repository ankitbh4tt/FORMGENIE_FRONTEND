import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ResponsesTable } from "@/components/responses/ResponsesTable";
import { SectionHeading } from "./primitives";
import { SAMPLE_FIELDS, SAMPLE_RESPONSES } from "./demo-data";

/** The same table the app uses, with sample data that says it is sample data. */
export function ResponsesShowcase() {
  return (
    <section id="responses" aria-labelledby="responses-title" className="py-section">
      <div className="frame">
        <Reveal amount="some">
          <SectionHeading
            id="responses-title"
            statement="Every answer, in one calm table."
            description="Search, sort and page through what people sent. Nothing to export before you can read it."
          />

          <div className="fg-in mt-10 md:mt-12" style={{ "--i": 2 } as CSSProperties}>
            <ResponsesTable
              rows={SAMPLE_RESPONSES}
              fieldLabels={SAMPLE_FIELDS}
              pageSize={6}
              compact
              caption="Sample responses to a contact form"
            />
            <p className="mt-3 text-small text-ink-faint">Sample responses, to show the table.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import * as React from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Disclosure } from "@/components/ui/disclosure";
import { SectionHeading } from "./primitives";
import { FAQS } from "./demo-data";

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-section">
      <div className="frame">
        <Reveal amount="some" className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <SectionHeading id="faq-title" statement="Questions, answered." className="lg:col-span-4" />
          <div className="fg-in hairline-b lg:col-span-7 lg:col-start-6" style={{ "--i": 1 } as React.CSSProperties}>
            {FAQS.map((faq, i) => (
              <Disclosure key={faq.q} title={faq.q} open={open === i} onToggle={() => setOpen(open === i ? null : i)}>
                {faq.a}
              </Disclosure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "./primitives";

const STEPS = [
  {
    n: "01",
    title: "Describe it",
    body: "Write what you need in plain language, like “a feedback form with a rating and an optional comment”. No builder to learn, nothing to drag.",
  },
  {
    n: "02",
    title: "Refine it",
    body: "FormGenie drafts the fields, labels and types. Ask for changes the same way, and the form adjusts while you watch.",
  },
  {
    n: "03",
    title: "Share it",
    body: "Publish to a clean link in one click. Every response lands in a table you can search, sort and read without a spreadsheet.",
  },
];

/** Three sentences, three rules drawing across. The whole thing reads in ten seconds. */
export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="py-section">
      <div className="frame">
        <Reveal className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <SectionHeading
            id="how-title"
            statement="Three steps. About a minute."
            description="The shortest path from “I need a form” to a link you can send."
            className="lg:col-span-4"
          />

          <ol className="lg:col-span-7 lg:col-start-6">
            {STEPS.map((s, i) => (
              <li key={s.n} className="fg-in grid gap-x-8 gap-y-2 py-7 md:grid-cols-[4rem_1fr]" style={{ "--i": i + 1 } as CSSProperties}>
                <span
                  aria-hidden="true"
                  className="fg-draw col-span-full block h-px w-full bg-border-strong"
                  style={{ "--i": i } as CSSProperties}
                />
                <span className="tabular pt-3 text-h2 font-semibold text-ink-faint">{s.n}</span>
                <div className="pt-3">
                  <h3 className="text-h2 font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 max-w-[54ch] text-lead text-ink-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

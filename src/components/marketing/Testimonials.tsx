import { SectionHeading, Reveal } from "./primitives";

const QUOTES = [
  {
    quote:
      "I described the intake form I'd been putting off for weeks. Thirty seconds later it was live. That's the whole story.",
    name: "Priya Raman",
    role: "Freelance designer",
  },
  {
    quote:
      "The responses view is the part I didn't know I needed. Everything's just there, readable, no exporting to a spreadsheet.",
    name: "Daniel Wu",
    role: "Ops lead, Northwind",
  },
  {
    quote:
      "It feels less like software and more like asking a careful colleague to set it up for me.",
    name: "Helena Fischer",
    role: "Community manager",
  },
];

export function Testimonials() {
  return (
    <section className="px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="In their words"
          title="Quietly loved by the people who use it."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-xs">
                <blockquote className="font-display text-lg font-normal leading-relaxed tracking-tight text-ink">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-surface-sunken text-[12px] font-medium text-ink-muted">
                    {q.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      {q.name}
                    </span>
                    <span className="block text-[13px] text-ink-faint">
                      {q.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-ink-faint">
          Illustrative quotes for this portfolio demo.
        </p>
      </div>
    </section>
  );
}

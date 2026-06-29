import { PenLine, Wand2, Share2 } from "lucide-react";
import { SectionHeading, Reveal } from "./primitives";

const STEPS = [
  {
    icon: PenLine,
    step: "01",
    title: "Describe it",
    body: "Write what you need in plain English, like \"a feedback form with a rating and an optional comment.\" No builders, no dragging.",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Refine it",
    body: "FormGenie drafts the fields, labels, and types. Tweak anything by simply asking, and it adjusts the form as you talk.",
  },
  {
    icon: Share2,
    step: "03",
    title: "Share it",
    body: "Publish to a clean link in one click. Responses flow straight into a dashboard you’ll actually enjoy reading.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps. About a minute."
          description="The fastest path from “I need a form” to a link you can send."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.step} delay={i * 0.08}>
                <div className="group relative h-full rounded-2xl border border-border bg-surface p-6 shadow-xs transition-[border-color,box-shadow] hover:border-border-strong hover:shadow-md">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-sunken text-ink">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-display text-2xl text-ink-faint">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

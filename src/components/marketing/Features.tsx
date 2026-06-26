import {
  Gauge,
  Inbox,
  PencilRuler,
  Link2,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { SectionHeading, Reveal } from "./primitives";

const FEATURES = [
  {
    icon: Gauge,
    title: "Built in seconds",
    body: "Go from a sentence to a working form before your coffee cools. No setup, no templates to fight.",
  },
  {
    icon: PencilRuler,
    title: "Edit by conversation",
    body: "Add a field, make one required, reorder — just say what you want and watch the form update live.",
  },
  {
    icon: Inbox,
    title: "Responses, organized",
    body: "Every submission lands in a clean, searchable table. No spreadsheets to wrangle.",
  },
  {
    icon: Link2,
    title: "Share with one link",
    body: "Publish instantly to a clean public page. Send it anywhere — it just works.",
  },
  {
    icon: Smartphone,
    title: "Beautiful on every screen",
    body: "Forms are typeset to read well on phones, tablets, and desktops out of the box.",
  },
  {
    icon: ShieldCheck,
    title: "Yours, protected",
    body: "Authentication and private dashboards keep your forms and data where they belong.",
  },
];

export function Features() {
  return (
    <section id="features" className="px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need. Nothing you don’t."
          description="A focused toolkit that gets out of your way."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <div className="group h-full bg-surface p-6 transition-colors hover:bg-surface-sunken/40">
                  <span className="mb-4 inline-grid size-10 place-items-center rounded-lg border border-border bg-bg text-accent">
                    <Icon className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-[15px] font-semibold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {f.body}
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

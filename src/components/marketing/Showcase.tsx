import { motion } from "framer-motion";
import { FileText, Inbox, ListChecks } from "lucide-react";
import { SectionHeading } from "./primitives";

const BARS = [38, 52, 44, 67, 59, 81, 72, 90];
const ROWS = [
  ["Maya Chen", "maya@studio.co", "Design"],
  ["Tom Okafor", "tom@labs.io", "Engineering"],
  ["Sara Vidal", "sara@hey.com", "Consulting"],
];

export function Showcase() {
  return (
    <section className="px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The dashboard"
          title="A calm home for every response."
          description="See what's coming in at a glance, without the spreadsheet anxiety."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="mt-14 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
        >
          {/* window chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-surface-sunken/50 px-4 py-3">
            <span className="size-2.5 rounded-full bg-border-strong" />
            <span className="size-2.5 rounded-full bg-border-strong" />
            <span className="size-2.5 rounded-full bg-border-strong" />
            <span className="ml-3 rounded-md bg-bg px-2.5 py-1 text-[11px] text-ink-faint">
              formgenie.app/dashboard
            </span>
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* left: stats + chart */}
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: FileText, label: "Forms", value: "24" },
                  { icon: Inbox, label: "Responses", value: "1,208" },
                  { icon: ListChecks, label: "Fields", value: "186" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className="rounded-xl border border-border bg-bg p-4"
                    >
                      <Icon className="size-4 text-ink-faint" />
                      <p className="mt-3 font-display text-2xl font-medium tracking-tight text-ink">
                        {s.value}
                      </p>
                      <p className="text-xs text-ink-muted">{s.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-border bg-bg p-5">
                <p className="mb-4 text-[13px] font-medium text-ink-muted">
                  Responses this week
                </p>
                <div className="flex h-28 items-end gap-2">
                  {BARS.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + i * 0.05,
                        ease: [0.2, 0, 0, 1],
                      }}
                      className="flex-1 rounded-t-md bg-accent/80"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* right: recent responses */}
            <div className="rounded-xl border border-border bg-bg p-5">
              <p className="mb-4 text-[13px] font-medium text-ink-muted">
                Recent responses
              </p>
              <div className="flex flex-col">
                {ROWS.map((r, i) => (
                  <div
                    key={r[1]}
                    className={`flex items-center gap-3 py-3 ${
                      i !== ROWS.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-medium text-accent">
                      {r[0]
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-ink">
                        {r[0]}
                      </p>
                      <p className="truncate text-xs text-ink-faint">{r[1]}</p>
                    </div>
                    <span className="rounded-md bg-surface-sunken px-2 py-0.5 text-[11px] text-ink-muted">
                      {r[2]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

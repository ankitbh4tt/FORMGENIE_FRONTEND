import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Do I need to know how to build forms?",
    a: "Not at all. You describe what you want in plain language and FormGenie composes the fields, labels, and types for you. If something isn't right, you just say so.",
  },
  {
    q: "What kinds of fields are supported?",
    a: "Short text, email, numbers, dates, dropdowns, checkboxes, long text, file uploads, multiple choice, and ratings — the building blocks of almost any form.",
  },
  {
    q: "How do people respond to my form?",
    a: "Every published form gets a clean public link. Share it anywhere — responses appear in your dashboard the moment they're submitted.",
  },
  {
    q: "Is my data private?",
    a: "Your forms and responses live behind authentication and are only visible from your own dashboard. Respondents only ever see the form itself.",
  },
  {
    q: "Can I edit a form after publishing?",
    a: "Yes. Open it back up in the builder, ask for changes, and republish. The link stays the same.",
  },
];

function Item({
  faq,
  open,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[16px] font-medium text-ink">{faq.q}</span>
        <span
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-full border border-border text-ink-muted transition-transform duration-300",
            open && "rotate-45 border-accent text-accent"
          )}
        >
          <Plus className="size-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-10 text-[15px] leading-relaxed text-ink-muted">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section id="faq" className="px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <div className="mt-12 border-t border-border">
          {FAQS.map((faq, i) => (
            <Item
              key={faq.q}
              faq={faq}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

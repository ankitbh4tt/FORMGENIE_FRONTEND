import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroDemo } from "./HeroDemo";

const EASE = [0.2, 0, 0, 1] as const;

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden px-5 pt-32 pb-20 sm:px-6 sm:pt-36">
      {/* faint baseline grid — like ruled paper, very subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "100% 2.25rem",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[13px] text-ink-muted shadow-xs"
          >
            <span className="size-1.5 rounded-full bg-success" />
            Now generating forms from plain language
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
            className="font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl"
          >
            Forms, the way they
            <br />
            should have always felt.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted"
          >
            Describe what you need in a sentence. FormGenie composes a clean,
            shareable form, and collects every response in one calm place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.19 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Start building
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href="#how">See how it works</a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-[13px] text-ink-faint"
          >
            No credit card · Free plan includes 5 forms a month
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <HeroDemo />
        </motion.div>
      </div>
    </section>
  );
}

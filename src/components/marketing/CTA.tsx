import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTA() {
  const navigate = useNavigate();
  return (
    <section className="px-5 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center shadow-sm sm:px-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.6] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "100% 2rem",
          }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-xl font-display text-3xl font-medium tracking-tight text-ink sm:text-[2.6rem] sm:leading-[1.08]">
            Your next form is one sentence away.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-ink-muted">
            Describe it, publish it, and start collecting, all in the time it
            takes to read this.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Start building for free
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

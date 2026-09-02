import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { HeroDemo } from "./HeroDemo";

/**
 * The opening. A statement, one line, one action, and the product composing a
 * form beside it. Four text elements, nothing floating, nothing to wait through.
 */
export function Hero() {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative pt-[calc(var(--spacing-header)+2rem)] pb-16 md:pb-24 lg:pt-[calc(var(--spacing-header)+3rem)]"
    >
      <Reveal amount="some" className="frame grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-6">
          <h1 id="hero-title" className="font-display text-display text-ink">
            <span className="fg-wipe block">Describe the form.</span>
            <span className="fg-wipe block" style={{ "--i": 1 } as CSSProperties}>
              It takes shape.
            </span>
          </h1>
          <p className="fg-in mt-6 max-w-[38ch] text-lead text-ink-muted" style={{ "--i": 2 } as CSSProperties}>
            Write what you need in plain language and FormGenie composes the fields. Publish in a click. Read every
            answer in one calm place.
          </p>
          <div className="fg-in mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ "--i": 3 } as CSSProperties}>
            <Button variant="accent" size="lg" arrow onClick={() => navigate("/dashboard")}>
              Start building
            </Button>
            <Button variant="quiet" size="lg" asChild>
              <a href="#how">See how it works</a>
            </Button>
          </div>
        </div>

        <div className="fg-in lg:col-span-6" style={{ "--i": 2 } as CSSProperties}>
          <HeroDemo />
        </div>
      </Reveal>
    </section>
  );
}

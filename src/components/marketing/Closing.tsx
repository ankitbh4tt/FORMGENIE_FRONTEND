import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

/** One line and one action. No card, no grid, no second CTA. */
export function Closing() {
  const navigate = useNavigate();
  return (
    <section aria-labelledby="closing-title" className="py-section">
      <div className="frame">
        <Reveal className="hairline grid gap-8 pt-12 md:pt-16 lg:grid-cols-12 lg:items-end">
          <h2 id="closing-title" className="font-display text-statement text-ink lg:col-span-8">
            <span className="fg-wipe block">Your next form is one sentence away.</span>
          </h2>
          <div className="fg-in lg:col-span-4 lg:justify-self-end" style={{ "--i": 1 } as CSSProperties}>
            <Button variant="accent" size="lg" arrow onClick={() => navigate("/dashboard")}>
              Start building
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

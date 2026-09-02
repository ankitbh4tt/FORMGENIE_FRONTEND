import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { LandingHeader } from "../components/marketing/LandingHeader";
import { Hero } from "../components/marketing/Hero";
import { HowItWorks } from "../components/marketing/HowItWorks";
import { RefineDemo } from "../components/marketing/RefineDemo";
import { ResponsesShowcase } from "../components/marketing/ResponsesShowcase";
import { FieldTypes } from "../components/marketing/FieldTypes";
import { FAQ } from "../components/marketing/FAQ";
import { Closing } from "../components/marketing/Closing";
import { Footer } from "../components/marketing/Footer";

/**
 * The landing page renders at once; nobody waits on a spinner to see what the
 * product is. A signed-in visitor is taken to their workspace as soon as that
 * is known.
 */
export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) navigate("/dashboard", { replace: true });
  }, [isSignedIn, isLoaded, navigate]);

  return (
    <div className="bg-bg text-ink">
      <LandingHeader />
      <main id="main">
        <Hero />
        <HowItWorks />
        <RefineDemo />
        <ResponsesShowcase />
        <FieldTypes />
        <FAQ />
        <Closing />
      </main>
      <Footer />
    </div>
  );
};

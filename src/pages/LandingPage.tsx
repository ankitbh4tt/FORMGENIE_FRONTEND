import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { LandingHeader } from "../components/marketing/LandingHeader";
import { Hero } from "../components/marketing/Hero";
import { HowItWorks } from "../components/marketing/HowItWorks";
import { Showcase } from "../components/marketing/Showcase";
import { Features } from "../components/marketing/Features";
import { Testimonials } from "../components/marketing/Testimonials";
import { FAQ } from "../components/marketing/FAQ";
import { CTA } from "../components/marketing/CTA";
import { Footer } from "../components/marketing/Footer";
import { LoadingScreen2 } from "@/components/atoms/LoadingScreen";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      navigate("/dashboard");
    }
  }, [isSignedIn, isLoaded, navigate]);

  if (!isLoaded) return <LoadingScreen2 />;
  if (isSignedIn) return null;

  return (
    <div className="bg-bg text-ink">
      <LandingHeader />
      <main>
        <Hero />
        <HowItWorks />
        <Showcase />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

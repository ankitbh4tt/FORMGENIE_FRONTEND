import React from "react";
import { Zap, Clock, Sparkles, Share2, UserCheck, MonitorSmartphone } from "lucide-react";
import { ValueCard } from "../common/ValueCard";

export const Benefits: React.FC = () => (
  <section id="benefits" className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Built for Speed and Simplicity
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Everything you need to create, manage, and scale your forms without writing a single line of code.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ValueCard
          title="Create in seconds"
          description="Build complete, professional forms instantly with our AI-powered generator."
          icon={<Zap className="w-6 h-6" />}
          color="blue"
        />
        <ValueCard
          title="No setup, no friction"
          description="Start collecting submissions immediately. We handle the complex routing and state."
          icon={<Clock className="w-6 h-6" />}
          color="purple"
        />
        <ValueCard
          title="Beautiful by default"
          description="Every form is perfectly responsive, accessible, and designed for high conversion."
          icon={<Sparkles className="w-6 h-6" />}
          color="green"
        />
        <ValueCard
          title="Easy sharing"
          description="Share your forms instantly with a simple link or embed them directly into your website."
          icon={<Share2 className="w-6 h-6" />}
          color="amber"
        />
        <ValueCard
          title="Client-ready output"
          description="Accelerate your workflow and deliver polished, professional projects faster than ever."
          icon={<UserCheck className="w-6 h-6" />}
          color="slate"
        />
        <ValueCard
          title="Universal compatibility"
          description="Every generated form works flawlessly on phones, tablets, and desktops out of the box."
          icon={<MonitorSmartphone className="w-6 h-6" />}
          color="rose"
        />
      </div>
    </div>
  </section>
);

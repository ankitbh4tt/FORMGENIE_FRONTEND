import React from "react";
import { TestimonialCard } from "../common/TestimonialCard";

export const Testimonials: React.FC = () => (
  <section id="testimonials" className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What You Might Say
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of satisfied users who have transformed their form
          creation process
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard
          name="Sarah Johnson"
          title="Marketing Director"
          quote="FormGenie has cut our form creation time by 90%. What used to take hours now takes seconds. The AI understands exactly what we need!"
          rating={5}
          initials="SJ"
          color="blue"
        />
        <TestimonialCard
          name="Michael Rodriguez"
          title="Freelance Developer"
          quote="As a freelancer, FormGenie helps me deliver client projects faster. The forms look professional and work flawlessly across all devices."
          rating={4.5}
          initials="MR"
          color="green"
        />
        <TestimonialCard
          name="Aisha Patel"
          title="E-commerce Owner"
          quote="Our customer feedback forms have never looked better. The AI even suggested fields I hadn't thought of. FormGenie is truly magical!"
          rating={5}
          initials="AP"
          color="purple"
        />
      </div>
    </div>
  </section>
);

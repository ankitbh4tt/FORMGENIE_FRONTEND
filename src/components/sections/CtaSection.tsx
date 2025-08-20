import React from 'react';
import { Button } from '../common/Button';

export const CtaSection: React.FC = () => (
  <section className="py-20 bg-gradient-to-r from-fuchsia-500/10 to-purple-600/10 backdrop-blur-sm">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Forms?</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        Join thousands of satisfied users and start creating beautiful, functional forms in seconds.
      </p>
      <Button href="/signup">
        Start Creating For Free
        <span className="material-symbols-outlined ml-2 align-middle group-hover:translate-x-1 transition-transform duration-300">
          arrow_forward
        </span>
      </Button>
      <p className="mt-4 text-gray-500">No credit card required. Free plan includes 5 forms per month.</p>
    </div>
  </section>
);
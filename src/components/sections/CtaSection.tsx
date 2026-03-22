import React from 'react';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export const CtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-violet-500/10 to-purple-600/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to Transform Your Forms?</h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Join thousands of satisfied users and start creating beautiful, functional forms in seconds.
        </p>
        <Button onClick={() => navigate('/dashboard')}>
          Start Creating For Free
          <span className="material-symbols-outlined ml-2 align-middle">
            arrow_forward
          </span>
        </Button>
        <p className="mt-4 text-slate-500">No credit card required. Free plan includes 5 forms per month.</p>
      </div>
    </section>
  );
};

import Link from 'next/link';
import React from 'react';

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-6 bg-gray-900/30 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-950/80 pointer-events-none"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Start free. Give user a nice onboarding experience.
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Sign up today and explore all the features TourBridge has to offer
          with our free plan. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-3 rounded-lg bg-white text-gray-950 font-semibold text-sm hover:bg-gray-200 transition-colors"
          >
            Sign up free
          </Link>
          <Link
            href="/docs"
            className="px-8 py-3 rounded-lg bg-transparent border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors"
          >
            Check Documentation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

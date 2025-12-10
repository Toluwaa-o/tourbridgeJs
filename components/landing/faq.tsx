import React from 'react';

const Faq = () => {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-10">
        Frequently asked questions
      </h2>
      <div className="space-y-4">
        <details className="group bg-white/2 border border-white/5 rounded-lg open:bg-white/4 transition-colors">
          <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-slate-300 hover:text-white">
            <span>Does this work with Next.js App Router?</span>
            <span className="transition group-open:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="text-sm text-slate-400 p-5 pt-0 leading-relaxed">
            Yes, absolutely. The widget is a client-side component that mounts
            lazily. We provide a dedicated React hook and component wrapper
            compatible with RSC.
          </div>
        </details>
        <details className="group bg-white/2 border border-white/5 rounded-lg open:bg-white/4 transition-colors">
          <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-slate-300 hover:text-white">
            <span>How does the styling work?</span>
            <span className="transition group-open:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="text-sm text-slate-400 p-5 pt-0 leading-relaxed">
            The widget inherits your base font automatically. You can override
            colors, radii, and shadows via the config object or CSS variables to
            match your design system perfectly.
          </div>
        </details>
        <details className="group bg-white/2 border border-white/5 rounded-lg open:bg-white/4 transition-colors">
          <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-slate-300 hover:text-white">
            <span>Is it accessible?</span>
            <span className="transition group-open:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="text-sm text-slate-400 p-5 pt-0 leading-relaxed">
            We take accessibility seriously. The tour handles focus trapping,
            ARIA labeling, keyboard navigation (Escape to close, arrows to
            navigate), and respects reduced-motion preferences.
          </div>
        </details>
      </div>
    </section>
  );
};

export default Faq;

import React from 'react';

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
            Everything you need to <br /> help users navigate your website
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Designed for developers, loved by product managers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="group p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Embeddable Widget
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              One lightweight script. Zero layout shift. Loads asynchronously
              and works with your vanilla HTML.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Analytics Built-in
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Automatic events for start, complete, skip, and drop-off.
              Visualize funnel performance directly in your dashboard.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m16 10-4 4-4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Guide User</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Helps new users get acquainted with your website quickly and
              efficiently.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Enterprise Security
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Authentication via your existing provider (Clerk). Anonymized
              tracking by default.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Polished Motion
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Silky smooth spring animations.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">A11y First</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Keyboard navigation, focus trapping, and ARIA attributes handled
              automatically. WCAG AA compliant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

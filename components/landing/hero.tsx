import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-medium mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          v1.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-slate-400 mb-6 leading-[1.1]">
          Ship guided onboarding <br className="hidden md:block" /> tours in
          minutes
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Embed a configurable, animated tour widget with analytics—built for
          modern web apps. Zero layout shift. One script tag.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/docs"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-cyan-500 text-gray-950 font-semibold text-sm hover:bg-cyan-400 transition-all shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2"
          >
            Check Docs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
          <div className="w-full sm:w-auto relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative max-w-4xl mx-auto rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-sm shadow-2xl overflow-hidden group">
          {/* Browser Chrome */}
          <div className="h-10 border-b border-white/5 bg-gray-900/80 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-white/10"></div>
            <div className="w-3 h-3 rounded-full bg-white/10"></div>
            <div className="w-3 h-3 rounded-full bg-white/10"></div>
            <div className="ml-4 h-5 w-64 rounded bg-white/5 text-[10px] flex items-center px-2 text-slate-500 font-mono">
              localhost:5173/dashboard
            </div>
          </div>
          {/* Mock App Content */}
          <div className="p-8 h-[300px] md:h-[400px] relative flex flex-col gap-6">
            <div className="h-8 w-1/3 bg-white/5 rounded animate-pulse"></div>
            <div className="grid grid-cols-3 gap-4">
              <div
                id="tour-step-1"
                className="h-32 bg-white/5 rounded border border-white/5"
              ></div>
              <div className="h-32 bg-white/5 rounded border border-white/5"></div>
              <div className="h-32 bg-white/5 rounded border border-white/5"></div>
            </div>
            <div className="h-48 w-full bg-white/5 rounded border border-white/5"></div>

            {/* The Tour Widget Overlay */}
            <div className="absolute top-36 left-12 z-20 w-72 bg-gray-950 border border-white/10 rounded-lg shadow-[0_20px_50px_-12px_rgba(0,0,0,1)] p-5 transform transition-all duration-500 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-3">
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Step 1 of 5
                </div>
                <button className="text-slate-500 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">
                Track your analytics
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Monitor conversion rates and drop-offs directly from this panel.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded bg-white/5 text-xs text-white border border-white/10 hover:bg-white/10">
                    Back
                  </button>
                </div>
                <div className="space-x-3">
                  <button className="px-3 py-1.5 rounded bg-cyan-500 text-xs text-gray-950 font-medium hover:bg-cyan-400">
                    Next
                  </button>
                  <button className="text-xs text-slate-500 hover:text-slate-300">
                    Skip
                  </button>
                </div>
              </div>
              {/* Connecting Line */}
              <div className="absolute -top-2 left-8 w-4 h-4 bg-gray-950 border-t border-l border-white/10 transform rotate-45"></div>
            </div>

            {/* Pulse on Target */}
            <span className="absolute top-[130px] left-[30px] flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-20"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 border-2 border-cyan-500 opacity-50"></span>
            </span>
          </div>
        </div>

        {/* Trusted By */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-sm text-slate-500 mb-6">
            Trusted by product-led teams shipping fast
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 grayscale mix-blend-screen">
            {/* CSS Logos */}
            <div className="text-lg font-bold font-sans tracking-tight text-white flex items-center gap-1">
              <div className="w-4 h-4 bg-white rounded-sm"></div>ACEM
            </div>
            <div className="text-lg font-bold font-mono tracking-tighter text-white">
              globxe
            </div>
            <div className="text-lg font-semibold italic text-white">
              soylet
            </div>
            <div className="text-lg font-bold tracking-widest text-white uppercase">
              intiech
            </div>
            <div className="text-lg font-medium text-white flex items-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
              Masive
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

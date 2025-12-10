import React from 'react';

const Demo = () => {
  return (
    <section
      id="demo"
      className="py-24 px-6 bg-gray-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-2">
              Experience the tour
            </h2>
            <p className="text-slate-400">
              Interact with the controls below to simulate the user experience.
            </p>
          </div>
        </div>

        {/* Demo Canvas */}
        <div className="relative w-full h-[500px] rounded-xl border border-white/10 bg-gray-900 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          {/* Fake UI Elements to "Tour" */}
          <div
            className="absolute top-10 left-10 w-48 h-12 bg-white/5 rounded border border-white/10 flex items-center justify-center text-xs text-slate-600 font-mono"
            id="demo-target-1"
          >
            #sidebar-nav
          </div>
          <div
            className="absolute bottom-20 right-20 w-32 h-10 bg-cyan-900/20 rounded border border-cyan-500/30 flex items-center justify-center text-xs text-cyan-500 font-mono"
            id="demo-target-2"
          >
            #primary-btn
          </div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-white/5 rounded border border-white/10 flex items-center justify-center text-xs text-slate-600 font-mono"
            id="demo-target-3"
          >
            #main-content
          </div>

          {/* The Tour Card (Static representation of state) */}
          <div className="absolute top-1/2 left-1/2 translate-x-10 -translate-y-20 z-30 w-80 bg-gray-950 rounded-xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_60px_-10px_rgba(0,0,0,0.8)] p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  J
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Main Dashboard
                  </h4>
                  <p className="text-[10px] text-slate-400">Step 2 of 4</p>
                </div>
              </div>
              <button className="text-slate-500 hover:text-white">
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              This is your central command center. View all your active projects
              and recent analytics here.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-mono">
                Press ⌘ + →
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                  Back
                </button>
                <button className="px-3 py-1.5 rounded bg-white text-xs text-gray-950 font-semibold hover:bg-gray-200 transition-colors">
                  Next
                </button>
              </div>
            </div>
            <div className="absolute -left-2 top-8 w-4 h-4 bg-gray-950 border-l border-b border-white/10 transform rotate-45"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;

import React from 'react';

export const Testimonial = () => {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/2 border border-white/5">
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              &quot;We launched onboarding in a week and doubled our completion
              rate. The developer experience is unmatched.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700"></div>
              <div>
                <div className="text-xs font-semibold text-white">
                  Sarah Jenkins
                </div>
                <div className="text-[10px] text-slate-500">PM @ TechFlow</div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/2 border border-white/5">
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              &quot;Analytics revealed friction points we didn&apos;t know
              existed. Activation climbed 18% in the first month.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700"></div>
              <div>
                <div className="text-xs font-semibold text-white">
                  David Chen
                </div>
                <div className="text-[10px] text-slate-500">Head of Growth</div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/2 border border-white/5">
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              &quot;Accessible by default. QA time dropped significantly because
              we didn&apos;t have to build custom focus traps.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700"></div>
              <div>
                <div className="text-xs font-semibold text-white">Elena R.</div>
                <div className="text-[10px] text-slate-500">
                  Engineering Manager
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

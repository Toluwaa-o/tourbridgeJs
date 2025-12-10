import React from 'react';

const Cta = () => {
  return (
    <section className="py-24 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-semibold tracking-tight text-white mb-6">
          Build and ship your <br /> first tour today
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#"
            className="px-8 py-3.5 rounded-lg bg-cyan-500 text-gray-950 font-semibold text-sm hover:bg-cyan-400 transition-all shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]"
          >
            Start free
          </a>
          <a
            href="#"
            className="px-8 py-3.5 rounded-lg border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors"
          >
            Read documentation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Cta;

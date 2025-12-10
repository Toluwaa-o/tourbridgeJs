import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-24 px-6 border-y border-white/5 bg-gray-950/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-8">
              Ship in three steps
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm">
                  1
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">
                    Create your tour
                  </h4>
                  <p className="text-sm text-slate-400">
                    create a tourbridge account and set up your first tour in
                    minutes on your dashboard.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center font-mono text-sm">
                  2
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">
                    Define your tour steps
                  </h4>
                  <p className="text-sm text-slate-400">
                    create, style, and customize your tour steps on your
                    dashboard with our intuitive step builder.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center font-mono text-sm">
                  3
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">
                    Embed the script
                  </h4>
                  <p className="text-sm text-slate-400">
                    Copy the unique snippet for your tour and paste it into your
                    website&apos;s HTML before the closing &lt;/body&gt; tag.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="/docs"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1"
              >
                Read the documentation{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Code Preview */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              <span className="ml-auto text-xs text-slate-500 font-mono">
                index.html
              </span>
            </div>
            <div className="p-6 overflow-x-auto">
              {/* <pre className="text-xs md:text-sm leading-relaxed text-slate-300">
                <span className="text-purple-400">import</span> {'{'}{' '}
                <span className="text-yellow-200">TourWidget</span> {'}'}{' '}
                <span className="text-purple-400">from</span>{' '}
                <span className="text-green-400">&quot;@tour/sdk&quot;</span>;
                {'\n'}
                {'\n'}
                <span className="text-yellow-200">TourWidget</span>.
                <span className="text-blue-400">init</span>({'{'}
                {'\n'} <span className="text-cyan-300">tourId</span>:{' '}
                <span className="text-green-400">
                  &quot;onboarding-v1&quot;
                </span>
                ,{'\n'} <span className="text-cyan-300">steps</span>: [{'\n'}{' '}
                {'{'}
                {'\n'} <span className="text-cyan-300">target</span>:{' '}
                <span className="text-green-400">&quot;#hero-cta&quot;</span>,
                {'\n'} <span className="text-cyan-300">content</span>:{' '}
                <span className="text-green-400">&quot;Start here!&quot;</span>,
                {'\n'} <span className="text-cyan-300">placement</span>:{' '}
                <span className="text-green-400">&quot;bottom&quot;</span>
                {'\n'} {'}'},{'\n'} {'{'}
                {'\n'} <span className="text-cyan-300">target</span>:{' '}
                <span className="text-green-400">&quot;#dashboard&quot;</span>,
                {'\n'} <span className="text-cyan-300">content</span>:{' '}
                <span className="text-green-400">&quot;View stats.&quot;</span>,
                {'\n'} <span className="text-cyan-300">placement</span>:{' '}
                <span className="text-green-400">&quot;right&quot;</span>
                {'\n'} {'}'}
                {'\n'} ],
                {'\n'} <span className="text-cyan-300">analytics</span>:{' '}
                <span className="text-pink-400">true</span>
                {'\n'}
                {'}'});
              </pre> */}
              <SyntaxHighlighter
                language="html"
                style={vscDarkPlus}
                customStyle={{ margin: 0, background: 'transparent' }}
              >
                {`<script src="https://unpkg.com/convex@1.3.1/dist/browser.bundle.js"></script>
<script data-tourId="yourtourId" src="https://venerable-churros-558104.netlify.app/tour-widget.js"></script>
<script>
    document.getElementById("start").addEventListener("click", () => {
    window.InitTour({});
    });
</script>`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

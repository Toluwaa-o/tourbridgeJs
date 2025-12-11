'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clipboard } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface WidgetScriptCardProps {
  tourId: string;
}

export function WidgetScriptCard({ tourId }: WidgetScriptCardProps) {
  const [copied, setCopied] = useState(false);

  const scriptSnippet = `<script src="https://unpkg.com/convex@1.3.1/dist/browser.bundle.js"></script>
<script data-tourId="${tourId}" src="https://venerable-churros-558104.netlify.app/tour-widget.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    window.InitTour({ tour_id: "${tourId}" });
  });
</script>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scriptSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
      <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
        <span className="ml-auto text-xs text-slate-500 font-mono">index.html</span>
      </div>

      <div className="relative p-6">
        <SyntaxHighlighter
          language="html"
          style={vscDarkPlus}
          customStyle={{ margin: 0, background: 'transparent' }}
        >
          {scriptSnippet}
        </SyntaxHighlighter>

        <Button
          onClick={handleCopy}
          className="absolute top-4 right-4 h-8 w-8 p-1 bg-white/10 text-white hover:bg-white/20"
        >
          <Clipboard size={16} />
        </Button>

        {copied && (
          <p className="absolute bottom-2 right-4 text-green-400 text-sm font-medium">
            Copied!
          </p>
        )}
      </div>
    </div>
  );
}

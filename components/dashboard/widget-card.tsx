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
<script>document.addEventListener("DOMContentLoaded",()=>{window.InitTour({ tour_id: "${tourId}" });});</script>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scriptSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/50"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/50"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/50"></span>
        </div>
        <span className="text-xs font-mono text-gray-400">index.html</span>
      </div>

      <div className="relative p-6">
        <SyntaxHighlighter language="html" style={vscDarkPlus} customStyle={{ background: 'transparent', margin: 0 }}>
          {scriptSnippet}
        </SyntaxHighlighter>

        <Button
          onClick={handleCopy}
          className="absolute top-4 right-4 h-8 w-8 p-1 bg-white/10 text-white hover:bg-white/20 transition"
        >
          <Clipboard size={16} />
        </Button>

        {copied && <span className="absolute bottom-2 right-4 text-green-400 text-sm font-medium">Copied!</span>}
      </div>
    </div>
  );
}

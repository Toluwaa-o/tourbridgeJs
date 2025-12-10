import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clipboard } from 'lucide-react';

interface WidgetScriptCardProps {
    tourId: string;
}

export function WidgetScriptCard({ tourId }: WidgetScriptCardProps) {
    const [copied, setCopied] = useState(false);

    const scriptSnippet = `<script src="https://venerable-churros-558104.netlify.app/tour-widget.js" data-tourId="${tourId}"></script>`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(scriptSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="rounded-2xl bg-white/5 border-white/10 shadow-lg backdrop-blur-md">
            <CardContent className="p-6 space-y-4">
                <h2 className="text-sm text-white">Widget Script</h2>

                <div className="flex items-center gap-3">
                    <pre className="flex-1 overflow-x-auto bg-black/20 border border-white/10 p-3 rounded-lg text-xs font-mono text-gray-300">
                        {scriptSnippet}
                    </pre>

                    <Button
                        onClick={handleCopy}
                        className="h-10 w-10 p-2 bg-white text-black hover:bg-gray-300"
                    >
                        <Clipboard size={16} />
                    </Button>
                </div>

                {copied && (
                    <p className="text-green-400 text-sm font-medium">Copied to clipboard!</p>
                )}
            </CardContent>
        </Card>
    );
}

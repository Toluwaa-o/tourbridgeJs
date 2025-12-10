import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clipboard } from 'lucide-react';

interface WidgetScriptCardProps {
    tourId: string;
}

export function WidgetScriptCard({ tourId }: WidgetScriptCardProps) {
    const [copied, setCopied] = useState(false);

    const scriptSnippet = `<script src="https://yourdomain.com/widget.js" data-tour-id="${tourId}"></script>`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(scriptSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="rounded-2xl shadow-sm border">
            <CardContent className="p-6 space-y-3">
                <h2 className="text-sm text-gray-500">Widget Script</h2>
                <div className="flex items-center gap-2">
                    <pre className="flex-1 overflow-x-auto bg-gray-100 p-3 rounded-lg text-sm font-mono">
                        {scriptSnippet}
                    </pre>
                    <Button onClick={handleCopy} className="h-10 w-10 p-2">
                        <Clipboard size={16} />
                    </Button>
                </div>
                {copied && (
                    <p className="text-green-500 text-sm font-medium">Copied to clipboard!</p>
                )}
            </CardContent>
        </Card>
    );
}

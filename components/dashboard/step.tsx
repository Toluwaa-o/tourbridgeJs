import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { StepData } from '@/types/dashboard/tour';
import { Trash } from 'lucide-react';

interface StepProps {
  idx: number;
  step: StepData;
  updateStep: <K extends keyof StepData>(
    index: number,
    field: K,
    value: StepData[K]
  ) => void;
  disabled: boolean;
}

export const Step: React.FC<StepProps> = ({ idx, step, updateStep, disabled }) => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor={`title-${idx}`} className="font-medium">Step Title</Label>
          <Input
            id={`title-${idx}`}
            placeholder="e.g. Welcome to Dashboard"
            value={step.title || ''}
            onChange={(e) => updateStep(idx, 'title', e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`selector-${idx}`} className="font-medium">CSS Selector <span className="text-gray-500 font-normal">(required)</span></Label>
          <Input
            id={`selector-${idx}`}
            placeholder="#submit-button or .navbar"
            value={step.selector || ''}
            onChange={(e) => updateStep(idx, 'selector', e.target.value)}
            disabled={disabled}
            className="font-mono text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`desc-${idx}`} className="font-medium">Description</Label>
        <Textarea
          id={`desc-${idx}`}
          placeholder="Explain what the user should do or notice here..."
          value={step.description || ''}
          onChange={(e) => updateStep(idx, 'description', e.target.value)}
          disabled={disabled}
          className="min-h-24 resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`button-${idx}`} className="font-medium">Button Text <span className="text-gray-500 font-normal">(optional)</span></Label>
        <Input
          id={`button-${idx}`}
          placeholder="Next, Got it, Continue →"
          value={step.button_text || ''}
          onChange={(e) => updateStep(idx, 'button_text', e.target.value)}
          disabled={disabled}
        />
      </div>

      <div>
        <Label className="font-medium mb-3 block">Appearance</Label>
        <div className="grid grid-cols-3 gap-5">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Background</Label>
            <div className="relative">
              <Input
                type="color"
                value={step.bg_color || '#ffffff'}
                onChange={(e) => updateStep(idx, 'bg_color', e.target.value)}
                className="h-12 w-full cursor-pointer"
                disabled={disabled}
              />
              {/* <span className="absolute left-2 top-1 text-xs text-gray-500 pointer-events-none">
                {step.bg_color || '#ffffff'}
              </span> */}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Text Color</Label>
            <div className="relative">
              <Input
                type="color"
                value={step.text_color || '#000000'}
                onChange={(e) => updateStep(idx, 'text_color', e.target.value)}
                className="h-12 w-full cursor-pointer"
                disabled={disabled}
              />
              {/* <span className="absolute left-2 top-1 text-xs text-gray-500 pointer-events-none">
                {step.text_color || '#000000'}
              </span> */}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Highlight</Label>
            <div className="relative">
              <Input
                type="color"
                value={step.highlight_color || '#3b82f6'}
                onChange={(e) => updateStep(idx, 'highlight_color', e.target.value)}
                className="h-12 w-full cursor-pointer"
                disabled={disabled}
              />
              {/* <span className="absolute left-2 top-1 text-xs text-gray-500 pointer-events-none">
                {step.highlight_color || '#3b82f6'}
              </span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
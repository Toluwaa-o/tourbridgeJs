import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { StepData } from '@/types/dashboard/tour';

interface StepProps {
  idx: number;
  step: {
    title: string;
    description: string;
    selector: string;
    button_text?: string;
    bg_color?: string;
    text_color?: string;
    highlight_color?: string;
  };
  updateStep: <K extends keyof StepData>(
    index: number,
    field: K,
    value: StepData[K]
  ) => void;
}

export const Step = ({ idx, step, updateStep }: StepProps) => {
  return (
    <div className="border rounded-xl p-4 space-y-3 bg-gray-50">
      <h3 className="font-semibold">Step {idx + 1}</h3>

      <Input
        placeholder="Step Title"
        value={step.title}
        onChange={(e) => updateStep(idx, 'title', e.target.value)}
      />

      <Textarea
        placeholder="Step Description"
        value={step.description}
        onChange={(e) => updateStep(idx, 'description', e.target.value)}
      />

      <Input
        placeholder="CSS Selector (e.g. #submit-button)"
        value={step.selector}
        onChange={(e) => updateStep(idx, 'selector', e.target.value)}
      />

      <Input
        placeholder="Button Text (optional)"
        value={step.button_text}
        onChange={(e) => updateStep(idx, 'button_text', e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Background
          </label>
          <Input
            type="color"
            value={step.bg_color}
            onChange={(e) => updateStep(idx, 'bg_color', e.target.value)}
            className="h-10 p-1"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Text</label>
          <Input
            type="color"
            value={step.text_color}
            onChange={(e) => updateStep(idx, 'text_color', e.target.value)}
            className="h-10 p-1"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Highlight</label>
          <Input
            type="color"
            value={step.highlight_color}
            onChange={(e) => updateStep(idx, 'highlight_color', e.target.value)}
            className="h-10 p-1"
          />
        </div>
      </div>
    </div>
  );
};

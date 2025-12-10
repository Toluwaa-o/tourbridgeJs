'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Step } from './step';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StepData } from '@/types/dashboard/tour';

import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';

interface CreateTourModalProps {
  open: boolean;
  close: () => void;
}

export default function CreateTourModal({ open, close }: CreateTourModalProps) {
  const router = useRouter()

  const [tourTitle, setTourTitle] = useState('');
  const [tourDesc, setTourDesc] = useState('');
  const [tourStatus, setTourStatus] = useState('');
  const [error, setError] = useState('');

  const [steps, setSteps] = useState([
    {
      title: '',
      description: '',
      selector: '',
      button_text: '',
      bg_color: '',
      text_color: '',
      highlight_color: '',
    },
    {
      title: '',
      description: '',
      selector: '',
      button_text: '',
      bg_color: '',
      text_color: '',
      highlight_color: '',
    },
    {
      title: '',
      description: '',
      selector: '',
      button_text: '',
      bg_color: '',
      text_color: '',
      highlight_color: '',
    },
    {
      title: '',
      description: '',
      selector: '',
      button_text: '',
      bg_color: '',
      text_color: '',
      highlight_color: '',
    },
    {
      title: '',
      description: '',
      selector: '',
      button_text: '',
      bg_color: '',
      text_color: '',
      highlight_color: '',
    },
  ]);

  const handleClose = () => {
    setTourDesc('');
    setTourStatus('');
    setTourTitle('');
    setSteps([
      {
        title: '',
        description: '',
        selector: '',
        button_text: '',
        bg_color: '',
        text_color: '',
        highlight_color: '',
      },
      {
        title: '',
        description: '',
        selector: '',
        button_text: '',
        bg_color: '',
        text_color: '',
        highlight_color: '',
      },
      {
        title: '',
        description: '',
        selector: '',
        button_text: '',
        bg_color: '',
        text_color: '',
        highlight_color: '',
      },
      {
        title: '',
        description: '',
        selector: '',
        button_text: '',
        bg_color: '',
        text_color: '',
        highlight_color: '',
      },
      {
        title: '',
        description: '',
        selector: '',
        button_text: '',
        bg_color: '',
        text_color: '',
        highlight_color: '',
      },
    ]);
    close();
  };
  const addStep = () => {
    setSteps([
      ...steps,
      {
        title: '',
        description: '',
        selector: '',
        button_text: '',
        bg_color: '',
        text_color: '',
        highlight_color: '',
      },
    ]);
  };

  const updateStep = <K extends keyof StepData>(
    index: number,
    field: K,
    value: StepData[K]
  ) => {
    setSteps((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const createTour = useMutation(api.tours.createTour);
  const createStep = useMutation(api.steps.createStep);

  const handleTourCreation = async (tourData: {
    title: string;
    description: string;
    status: string;
    steps: Array<{
      title: string;
      description: string;
      selector: string;
      button_text?: string;
      bg_color?: string;
      text_color?: string;
      highlight_color?: string;
    }>;
  }) => {
    if (tourData.status !== 'active' && tourData.status !== 'paused') {
      setError('Invalid status');
      return;
    }

    if (tourData.steps.length < 5) {
      setError('Tour must have at least 5 steps');
      return;
    }
    try {
      const tourId = await createTour({
        title: tourData.title,
        description: tourData.description,
        status: tourData.status,
      });

      await Promise.all(
        tourData.steps.map((step) =>
          createStep({
            ...step,
            tour_id: tourId,
            started: 0,
            skipped: 0,
            completed: 0,
          })
        )
      );
      console.log('Tour and steps created successfully!');
      return tourId

    } catch (err) {
      console.error('Error creating tour and steps:', err);
    }
  };

  const handleSave = async () => {
    const payload = {
      title: tourTitle,
      description: tourDesc,
      status: tourStatus.toLowerCase(),
      steps: steps,
    };

    if (!tourTitle || !tourDesc || !tourStatus) {
      setError('Please provide the title, description and status');
      return;
    }

    try {
      const tourId = await handleTourCreation(payload);
      if (tourId) {
        router.push(`/dashboard/tours/${tourId}`)
      }
    } catch {
      console.log('error')
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(''), 3000);
    }
  }, [error]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Create New Tour
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Tour Title"
            value={tourTitle}
            onChange={(e) => setTourTitle(e.target.value)}
          />

          <Textarea
            placeholder="Tour Description"
            value={tourDesc}
            onChange={(e) => setTourDesc(e.target.value)}
          />

          <Select onValueChange={setTourStatus} value={tourStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Tour Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8 space-y-6">
          <h2 className="text-xl font-medium">Steps</h2>

          {steps.map((step, idx) => (
            <Step key={idx} idx={idx} step={step} updateStep={updateStep} />
          ))}

          <Button
            onClick={addStep}
            className="flex items-center gap-2 w-full justify-center bg-black text-white rounded-xl py-2"
          >
            <Plus size={16} /> Add Step
          </Button>
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <div className="flex justify-end mt-8 gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-xl bg-black text-white"
          >
            Save Tour
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

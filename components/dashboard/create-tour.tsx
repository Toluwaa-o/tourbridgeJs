'use client';

import React, { useEffect, useState } from 'react';
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
import { Plus, AlertCircle, ArrowLeft, Trash, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NewStep, StepData } from '@/types/dashboard/tour';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';

export default function CreateTourPage() {
  const router = useRouter();

  const [tourTitle, setTourTitle] = useState('');
  const [tourDesc, setTourDesc] = useState('');
  const [tourStatus, setTourStatus] = useState<'active' | 'paused'>('active');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [steps, setSteps] = useState<NewStep[]>(
    Array(5).fill(null).map(() => ({
      title: '',
      description: '',
      selector: '',
      button_text: '',
      bg_color: '#ffffff',
      text_color: '#000000',
      highlight_color: '#3b82f6',
      started: 0,
      skipped: 0,
      completed: 0,
    }))
  );

  const createTour = useMutation(api.tours.createTour);
  const createStep = useMutation(api.steps.createStep);

  const addStep = () => {
    setSteps(prev => [...prev, {
      title: '', description: '', selector: '', button_text: '',
      bg_color: '#ffffff', text_color: '#000000', highlight_color: '#3b82f6',
      started: 0, skipped: 0, completed: 0,
    }]);
  };

  const removeStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  };


  const updateStepField = <K extends keyof StepData>(
    index: number,
    field: K,
    value: StepData[K]
  ) => {
    setSteps(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSave = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError('');

    if (!tourTitle.trim() || !tourDesc.trim()) {
      setError('Please provide a title and description for the tour.');
      setIsLoading(false);
      return;
    }

    if (steps.length < 5) {
      setError('A tour must have at least 5 steps.');
      setIsLoading(false);
      return;
    }

    try {
      const tourId = await createTour({
        title: tourTitle.trim(),
        description: tourDesc.trim(),
        status: tourStatus,
      });

      await Promise.all(
        steps.map(step =>
          createStep({
            ...step,
            tour_id: tourId,
            started: 0,
            skipped: 0,
            completed: 0,
          })
        )
      );

      router.push(`/dashboard/tours/${tourId}`);
    } catch (err) {
      console.error(err);
      setError('Failed to create tour. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="rounded-full hover:bg-gray-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Create New Tour</h1>
                <p className="text-lg text-gray-600 mt-2">
                  Build an interactive onboarding experience with guided steps
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Tour Details */}
          <Card className="lg:col-span-1 shadow-lg border-0">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">Tour Information</CardTitle>
              <CardDescription>Basic details about this onboarding tour</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold">Tour Title</Label>
                <Input
                  id="title"
                  placeholder="Enter tour title"
                  value={tourTitle}
                  onChange={(e) => setTourTitle(e.target.value)}
                  disabled={isLoading}
                  className="h-11 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this tour covers..."
                  value={tourDesc}
                  onChange={(e) => setTourDesc(e.target.value)}
                  disabled={isLoading}
                  className="min-h-32 resize-none text-base"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Status</Label>
                <Select
                  value={tourStatus}
                  onValueChange={(v) => setTourStatus(v as 'active' | 'paused')}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active
                      </div>
                    </SelectItem>
                    <SelectItem value="paused">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        Paused
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Steps */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Tour Steps</CardTitle>
                    <CardDescription>Configure each step of the user journey</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-sm">
                      {steps.length} {steps.length === 1 ? 'step' : 'steps'}
                    </Badge>
                    <Button onClick={addStep} size="sm" className="gap-2 bg-cyan-600 hover:bg-cyan-700">
                      <Plus className="w-4 h-4" />
                      Add Step
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 max-h-[720px] overflow-y-auto pr-2">
                  {steps.map((step, idx) => (
                    <Card key={idx} className="border shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 font-bold text-lg">
                            {idx + 1}
                          </div>
                          <CardTitle className="text-lg">Step {idx + 1}</CardTitle>
                        </div>

                        {idx > 4 && <Trash2
                          color="red"
                          className="cursor-pointer hover:opacity-70"
                          onClick={() => removeStep(idx)}
                        />}
                      </CardHeader>
                      <CardContent>
                        <Step
                          idx={idx}
                          step={step as StepData}
                          updateStep={updateStepField}
                          disabled={isLoading}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-10 flex justify-end gap-4 max-w-7xl">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            disabled={isLoading}
            className="px-8"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={handleSave}
            disabled={isLoading}
            className="px-8 bg-cyan-600 hover:bg-cyan-700 text-white font-medium"
          >
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isLoading ? 'Creating Tour...' : 'Create Tour'}
          </Button>
        </div>
      </div>
    </div>
  );
}
'use client'

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
import { StepData } from '@/types/dashboard/tour';
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from '@/convex/_generated/dataModel';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertCircle } from 'lucide-react';

export default function UpdateTourPage({ slug }: { slug: string }) {
    const router = useRouter();
    const tour = useQuery(api.tours.getTourById, { id: slug as Id<'tours'> });
    const tour_steps = useQuery(api.steps.getStepsByTour, { tour_id: slug as Id<'tours'> });

    const [tourTitle, setTourTitle] = useState('');
    const [tourDesc, setTourDesc] = useState('');
    const [tourStatus, setTourStatus] = useState<'active' | 'paused'>('active');
    const [steps, setSteps] = useState<StepData[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const updateTour = useMutation(api.tours.updateTour);
    const updateStep = useMutation(api.steps.updateStep);

    useEffect(() => {
        if (tour) {
            setTourTitle(tour.title);
            setTourDesc(tour.description || '');
            setTourStatus(tour.status);
            setSteps(
                tour_steps?.length
                    ? tour_steps
                    : Array(5).fill({
                        title: '', description: '', selector: '', button_text: '',
                        bg_color: '#ffffff', text_color: '#000000', highlight_color: '#3b82f6',
                        started: 0, skipped: 0, completed: 0,
                    })
            );
        }
    }, [tour, tour_steps]);

    const updateStepField = <K extends keyof StepData>(index: number, field: K, value: StepData[K]) => {
        setSteps((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleSave = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setError("");

        if (!tourTitle.trim() || !tourDesc.trim()) {
            setError('Please fill in all required fields');
            setIsLoading(false);
            return;
        }

        try {
            await updateTour({
                id: tour?._id as Id<'tours'>,
                title: tourTitle,
                description: tourDesc,
                status: tourStatus,
            });

            await Promise.all(
                steps.map((s) =>
                    updateStep({
                        id: s._id,
                        title: s.title,
                        description: s.description,
                        selector: s.selector,
                        button_text: s.button_text,
                        bg_color: s.bg_color,
                        text_color: s.text_color,
                        highlight_color: s.highlight_color,
                        started: s.started,
                        skipped: s.skipped,
                        completed: s.completed,
                    })
                )
            );

            router.push(`/dashboard/tours/${tour?._id}`);
        } catch (err) {
            console.error(err);
            setError('Failed to update tour. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => setError(''), 5000);
            return () => clearTimeout(timeout);
        }
    }, [error]);

    return (
        <div className="min-h-screen bg-[#0B0F19]">
            <div className="max-w-7xl mx-auto py-12 px-6">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white">Update Tour</h1>
                    <p className="text-lg text-gray-300 mt-2">Modify tour details and individual steps</p>
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
                                    <Badge variant="secondary" className="text-sm">
                                        {steps.length} {steps.length === 1 ? 'step' : 'steps'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6 max-h-[720px] overflow-y-auto pr-2">
                                    {steps.map((step, idx) => (
                                        <Card key={idx} className="border shadow-sm hover:shadow-md transition-shadow">
                                            <CardHeader className="pb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 font-bold text-lg">
                                                        {idx + 1}
                                                    </div>
                                                    <CardTitle className="text-lg">Step {idx + 1}</CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <Step
                                                    idx={idx}
                                                    step={step}
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
                <div className="mt-10 flex justify-end gap-4 max-w-7xl text-black">
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
                        {isLoading ? 'Saving Changes...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
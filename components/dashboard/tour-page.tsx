'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { WidgetScriptCard } from './widget-card';
import Link from 'next/link';

export const TourPage = ({ slug }: { slug: string }) => {
    const tour = useQuery(api.tours.getTourById, { id: slug as Id<'tours'> });

    const steps = useQuery(api.steps.getStepsByTour, {
        tour_id: (tour?._id as Id<'tours'>) ?? '',
    });

    return (
        <div className="min-h-screen bg-white text-gray-900 p-10  w-full">
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {tour?.title}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Detailed analytics & performance insights
                    </p>
                </div>
                <Link href={`/dashboard/tours/${slug}/edit`} className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium shadow hover:opacity-90 transition">
                    Edit Tour
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card className="rounded-2xl shadow-sm border">
                    <CardContent className="p-6">
                        <h2 className="text-sm text-gray-500 mb-1">Total Views</h2>
                        <p className="text-3xl font-semibold">{steps?.length ? steps[0].started : 0}</p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-sm border">
                    <CardContent className="p-6">
                        <h2 className="text-sm text-gray-500 mb-1">Completion Rate</h2>
                        <p className="text-3xl font-semibold">{steps?.length && steps[0].started ? (steps[0].started / steps[steps.length-1].completed) + '%' : 'Na'}</p>
                    </CardContent>
                </Card>
                <WidgetScriptCard tourId={slug} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="rounded-2xl shadow-sm border h-full">
                    <CardContent className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Steps</h2>
                        <ul className="space-y-4">
                            {steps?.length &&
                                steps.map((s, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center justify-between border-b pb-3"
                                    >
                                        <div>
                                            <p className="font-medium">{s.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {s.completed}/{s.started} completed
                                            </p>
                                        </div>
                                        {Math.round((s.completed / s.started) * 100) ? (
                                            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                                                {Math.round((s.completed / s.started) * 100)}%
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm border lg:col-span-2">
                    <CardContent className="p-6 h-80">
                        <h2 className="text-lg font-semibold mb-4">Analytics Tracking</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={steps}>
                                <XAxis dataKey="step" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="started"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="completed"
                                    stroke="#4caf50"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="skipped"
                                    stroke="#ff7043"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

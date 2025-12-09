import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const stepEvents = [
    { step: "Step 1", started: 1200, completed: 950, skipped: 250 },
    { step: "Step 2", started: 950, completed: 700, skipped: 250 },
    { step: "Step 3", started: 700, completed: 540, skipped: 160 },
    { step: "Step 4", started: 540, completed: 480, skipped: 60 },
    { step: "Step 5", started: 480, completed: 460, skipped: 20 },
];

export default function TourDetailsPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 p-10">
            {/* Header */}
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Welcome Flow</h1>
                    <p className="text-gray-500 text-sm mt-1">Detailed analytics & performance insights</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium shadow hover:opacity-90 transition">Edit Tour</button>
            </header>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card className="rounded-2xl shadow-sm border">
                    <CardContent className="p-6">
                        <h2 className="text-sm text-gray-500 mb-1">Total Views</h2>
                        <p className="text-3xl font-semibold">2,847</p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-sm border">
                    <CardContent className="p-6">
                        <h2 className="text-sm text-gray-500 mb-1">Completion Rate</h2>
                        <p className="text-3xl font-semibold">48%</p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-sm border">
                    <CardContent className="p-6">
                        <h2 className="text-sm text-gray-500 mb-1">Avg Time On Tour</h2>
                        <p className="text-3xl font-semibold">2m 14s</p>
                    </CardContent>
                </Card>
            </div>

            {/* Step Breakdown + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Steps List */}
                <Card className="rounded-2xl shadow-sm border h-full">
                    <CardContent className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Steps</h2>
                        <ul className="space-y-4">
                            {stepEvents.map((s, i) => (
                                <li key={i} className="flex items-center justify-between border-b pb-3">
                                    <div>
                                        <p className="font-medium">{s.step}</p>
                                        <p className="text-xs text-gray-500">{s.completed}/{s.started} completed</p>
                                    </div>
                                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                                        {Math.round((s.completed / s.started) * 100)}%
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Analytics Chart */}
                <Card className="rounded-2xl shadow-sm border lg:col-span-2">
                    <CardContent className="p-6 h-80">
                        <h2 className="text-lg font-semibold mb-4">Analytics Tracking</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stepEvents}>
                                <XAxis dataKey="step" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="started" stroke="#8884d8" strokeWidth={2} />
                                <Line type="monotone" dataKey="completed" stroke="#4caf50" strokeWidth={2} />
                                <Line type="monotone" dataKey="skipped" stroke="#ff7043" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
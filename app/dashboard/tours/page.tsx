import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const tours = [
    {
        title: "Welcome Flow",
        desc: "Initial introduction",
        views: 2847,
        status: "Live",
    },
    {
        title: "Payment Setup",
        desc: "Billing configuration",
        views: 1523,
        status: "Live",
    },
    {
        title: "Team Collaboration",
        desc: "Invite teammates",
        views: 456,
        status: "Paused",
    },
];

export default function ToursPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 p-10">
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Tours</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your product walkthroughs</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium shadow hover:opacity-90 transition">+ New Tour</button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((t, i) => (
                    <Card key={i} className="rounded-2xl shadow-sm border hover:shadow-md transition cursor-pointer">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">{t.title}</h2>
                                <span
                                    className={`text-xs px-3 py-1 rounded-full font-medium ${t.status === "Live"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {t.status}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm mb-6">{t.desc}</p>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{t.views.toLocaleString()} views</span>
                                <button className="text-black font-medium hover:underline">Manage</button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

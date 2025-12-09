'use client'

import React, { useState } from 'react';
import { TourCardMain } from '@/components/dashboard/tour-card-main';
import CreateTourModal from '@/components/dashboard/create-tour';
import { tours as dummy_tours } from '@/data/tours';


export default function ToursPage() {
    const [open, setOpen] = useState(false)
    const [tours, setTours] = useState(dummy_tours)

    const newTour = (data: { tour: { id: number; title: string; description: string, views: number, status: string } }) => {
        setTours(prev => [...prev, {
            id: data.tour.id,
            title: data.tour.title,
            desc: data.tour.description,
            views: data.tour.views,
            status: data.tour.status
        }])
    }
    return (
        <div className="min-h-screen bg-white text-gray-900 p-10">
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Tours</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your product walkthroughs</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium shadow hover:opacity-90 transition" onClick={() => setOpen(true)}>+ New Tour</button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((t, i) => (
                    <TourCardMain key={i} t={t} />
                ))}
            </div>

            <CreateTourModal close={() => setOpen(false)} open={open} onSave={newTour} />
        </div>
    );
}

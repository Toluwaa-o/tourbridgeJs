'use client';

import React, { useEffect, useState } from 'react';
import { TourCardMain } from '@/components/dashboard/tour-card-main';
import CreateTourModal from '@/components/dashboard/create-tour';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Tour } from '@/types/dashboard/tour';

export default function ToursPage() {
  const [open, setOpen] = useState(false);
  const trs = useQuery(api.tours.getToursByUser);
  const [tours, setTours] = useState<Tour[] | undefined>(trs);

  const newTour = (data: {
    tour: {
      id: number;
      title: string;
      description: string;
      views: number;
      status: string;
    };
  }) => {
    //
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-10">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tours</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your product walkthroughs
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium shadow hover:opacity-90 transition"
          onClick={() => setOpen(true)}
        >
          + New Tour
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours?.length ? (
          tours.map((t, i) => <TourCardMain key={i} t={t} />)
        ) : (
          <p>You have not created any tours. Lets change that!</p>
        )}
      </div>

      <CreateTourModal close={() => setOpen(false)} open={open} />
    </div>
  );
}

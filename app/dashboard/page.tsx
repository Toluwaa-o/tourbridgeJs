'use client';

import React, { useEffect, useState } from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { TourCard } from '@/components/dashboard/tour-card';
import CreateTourModal from '@/components/dashboard/create-tour';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Tour } from '@/types/dashboard/tour';

export default function MinimalistDashboard() {
  const [open, setOpen] = useState(false);

  const trs = useQuery(api.tours.getToursByUser);
  const [tours, setTours] = useState<Tour[] | undefined>(trs);

  return (
    <main className="flex-1 p-10">
      <header className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-semibold">Your Tours</h2>
          <p className="text-gray-500 text-sm">Manage onboarding experiences</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm border border-gray-200 focus:outline-none"
            />
          </div>

          <button
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="notifications"
          >
            <Bell size={18} className="text-gray-700" />
            <span className="w-2 h-2 bg-red-500 rounded-full absolute right-1 top-1"></span>
          </button>

          <div className="w-10 h-10 rounded-full bg-gray-300" />
        </div>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours?.length ? (
          tours.map((tour) => (
            <TourCard
              id={tour._id}
              key={tour._id}
              title={tour.title}
              desc={tour.description}
              status={tour.status}
            />
          ))
        ) : (
          <></>
        )}

        <button
          className="border-2 border-dashed border-gray-300 p-6 rounded-xl flex flex-col items-center justify-center hover:border-gray-400 transition text-gray-400 hover:text-gray-600"
          onClick={() => setOpen(true)}
        >
          <Plus size={32} />
          <p className="mt-2 font-medium">Create New Tour</p>
        </button>
      </section>

      <CreateTourModal close={() => setOpen(false)} open={open} />
    </main>
  );
}

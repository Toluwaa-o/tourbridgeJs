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
    <div className="min-h-screen w-full p-10 bg-linear-to-b from-[#0a0d14] to-[#0f1624] text-white">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            {tour?.title}
          </h1>
          <p className="text-sm mt-2 text-gray-400">
            Deep insights into how users interact with your tour.
          </p>
        </div>

        <Link
          href={`/dashboard/tours/${slug}/edit`}
          className="px-5 py-2.5 rounded-xl text-sm font-medium transition 
                     bg-white text-black hover:bg-gray-200 shadow"
        >
          Edit Tour
        </Link>
      </header>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {/* Total Views */}
        <Card className="rounded-xl bg-white/5 border-white/10 shadow backdrop-blur-md h-40">
          <CardContent className="p-4 flex flex-col justify-center">
            <h2 className="text-xs text-white">Total Views</h2>
            <p className="text-3xl font-bold mt-2 text-[#38bdf8]">
              {steps?.length ? steps[0].started : 0}
            </p>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card className="rounded-xl bg-white/5 border-white/10 shadow backdrop-blur-md h-40">
          <CardContent className="p-4 flex flex-col justify-center">
            <h2 className="text-xs text-white">Completion Rate</h2>
            <p className="text-3xl font-bold mt-2 text-[#34d399]">
              {steps?.length && steps[0].started
                ? Math.round(
                  (steps[steps.length - 1].completed / steps[0].started) * 100
                ) + '%'
                : '—'}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl bg-white/5 border-white/10 shadow backdrop-blur-md md:col-span-2 h-40 overflow-auto">
          <CardContent className="p-4">
            <WidgetScriptCard tourId={slug} />
          </CardContent>
        </Card>
      </div>


      {/* STEPS + CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* STEPS */}
        <Card className="rounded-2xl bg-white/5 border-white/10 shadow backdrop-blur-md h-[550px] flex flex-col text-white">
          <CardContent className="p-6 flex-1 overflow-hidden">
            <h2 className="text-lg font-semibold mb-4">Steps Overview</h2>

            <div className="overflow-y-auto pr-2 space-y-5 h-full custom-scrollbar">
              {steps?.map((s, i) => {
                const rate =
                  s.started > 0
                    ? Math.round((s.completed / s.started) * 100)
                    : 0;

                return (
                  <div
                    key={i}
                    className="flex items-center justify-between pb-4 border-b border-white/10"
                  >
                    <div>
                      <p className="font-medium">{s.title}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {s.completed}/{s.started} completed
                      </p>
                    </div>
                    {rate > 0 && (
                      <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-[#38bdf8] font-semibold">
                        {rate}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* CHART */}
        <Card className="rounded-2xl bg-white/5 border-white/10 shadow backdrop-blur-md lg:col-span-2">
          <CardContent className="p-6 h-[550px]">
            <h2 className="text-lg font-semibold mb-6 text-white">
              Analytics Tracking
            </h2>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={steps}>
                <XAxis dataKey="title" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: '#0f1624',
                    border: '1px solid #38bdf8',
                    borderRadius: '10px',
                  }}
                  labelStyle={{ color: '#38bdf8' }}
                />
                <Line
                  type="monotone"
                  dataKey="started"
                  stroke="#38bdf8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#34d399"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="skipped"
                  stroke="#f87171"
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

'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import Link from 'next/link';
import { WidgetScriptCard } from './widget-card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const TourPage = ({ slug }: { slug: string }) => {
  const tour = useQuery(api.tours.getTourById, { id: slug as Id<'tours'> });
  const steps = useQuery(api.steps.getStepsByTour, {
    tour_id: (tour?._id as Id<'tours'>) ?? '',
  });

  const avgCompletion = steps?.length
    ? Math.round(
      steps.reduce(
        (sum, s) => sum + (s.started > 0 ? (s.completed / s.started) * 100 : 0),
        0
      ) / steps.length
    )
    : 0;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-10 space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-4xl font-bold tracking-tight">{tour?.title}</h1>
          <p className="text-gray-400 mt-2">Deep insights into how users interact with your tour.</p>
        </div>
        <Link
          href={`/dashboard/tours/${slug}/edit`}
          className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-shadow shadow-md"
        >
          Edit Tour
        </Link>
      </header>

      {/* Metrics + Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="grid grid-cols-2 gap-6 lg:col-span-2">
          <MetricCard title="Total Views" value={steps?.[0]?.started ?? 0} color="text-sky-400" />
          <MetricCard title="Total Steps" value={`${steps?.length ?? 0} Steps`} color="text-emerald-400" />
          <MetricCard
            title="Skipped Steps"
            value={`${steps?.reduce((sum, s) => sum + (s.skipped || 0), 0) ?? 0}`}
            color="text-red-400"
          />

          <MetricCard title="Avg Completion" value={`${avgCompletion}%`} color="text-yellow-400" />
        </div>
        <WidgetScriptCard tourId={slug} />
      </div>

      {/* Steps + Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Steps Overview</h2>
          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
            {steps?.map((s, i) => {
              const rate = s.started > 0 ? Math.round((s.completed / s.started) * 100) : 0;
              return (
                <div key={i} className="flex justify-between items-center border-b border-white/10 pb-2">
                  <div>
                    <p className="font-medium">{s.title}</p>
                    <p className="text-sm text-gray-400">{s.completed}/{s.started} completed</p>
                  </div>
                  {rate > 0 && (
                    <span className="px-3 py-1 rounded-full bg-white/10 text-sky-400 text-xs font-semibold">
                      {rate}%
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="lg:col-span-2 h-[550px]">
          <h2 className="text-lg font-semibold mb-6">Analytics Tracking</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={steps}>
              <XAxis dataKey="title" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ background: '#111827', borderRadius: '10px', border: '1px solid #38bdf8' }}
                labelStyle={{ color: '#38bdf8' }}
              />
              <Line type="monotone" dataKey="started" stroke="#38bdf8" strokeWidth={2} />
              <Line type="monotone" dataKey="completed" stroke="#34d399" strokeWidth={2} />
              <Line type="monotone" dataKey="skipped" stroke="#f87171" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, color }: { title: string; value: string | number; color: string }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-md h-40 flex flex-col justify-center text-center hover:scale-105 transition-transform">
    <h3 className="text-sm text-gray-300">{title}</h3>
    <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
  </div>
);

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-md p-6 ${className ?? ''}`}>
    {children}
  </div>
);

'use client';

import React, { useEffect, useState } from 'react';
import { LogOut, User, Plus } from 'lucide-react';
import { TourCard } from '@/components/dashboard/tour-card';
import CreateTourModal from '@/components/dashboard/create-tour';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Tour } from '@/types/dashboard/tour';
import { useAuth, useAuthDialogs } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MinimalistDashboard() {
  const router = useRouter()

  const { user, isSignedIn, isLoaded, signOut } = useAuth();

  const tours = useQuery(api.tours.getToursByUser);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main className="flex-1 py-5 px-10">
      <header className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-semibold">
            {(() => {
              const hour = new Date().getHours();
              if (hour < 12) return "Good morning";
              if (hour < 18) return "Good afternoon";
              return "Good evening";
            })()}
          </h2>

          <p className="text-gray-300 text-sm">
            Here are your tours — manage and refine your onboarding experiences.
          </p>
        </div>


        <div className="flex items-center gap-4">

          {!isLoaded ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
          ) : isSignedIn && user ? (
            <div className="flex items-center gap-3 p-3">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user.imageUrl}
                  alt={user.fullName || 'User'}
                />
                <AvatarFallback>
                  {getInitials(user.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.fullName}</span>
                <span className="text-xs text-gray-300">
                  {user.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </div>
          ) : <></>}
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

        <Link href={`/dashboard/create`}
          className="border-2 border-dashed border-gray-300 p-6 rounded-xl flex flex-col items-center justify-center hover:border-gray-400 transition text-gray-400 hover:text-gray-600"
        >
          <Plus size={32} />
          <p className="mt-2 font-medium">Create New Tour</p>
        </Link>
      </section>
    </main>
  );
}

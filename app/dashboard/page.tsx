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
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { user, isSignedIn, isLoaded, signOut } = useAuth();

  const trs = useQuery(api.tours.getToursByUser);
  const [tours, setTours] = useState<Tour[] | undefined>(trs);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <main className="flex-1 p-10">
      <header className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-semibold">Your Tours</h2>
          <p className="text-gray-500 text-sm">Manage onboarding experiences</p>
        </div>

        <div className="flex items-center gap-4">
          {!isLoaded ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
          ) : isSignedIn && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 w-9 rounded-full p-0 hover:bg-accent"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user.fullName || 'User'}
                    />
                    <AvatarFallback>
                      {getInitials(user.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
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
                    <span className="text-xs text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => handleLogOut()}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <></>
          )}
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

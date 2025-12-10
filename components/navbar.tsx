'use client';

import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth, useAuthDialogs } from '@/hooks/use-auth';

export function Navbar() {
  const { user, isSignedIn, isLoaded, signOut } = useAuth();
  const { openLogin, openSignup } = useAuthDialogs();
  const pathname = usePathname();
  const router = useRouter()

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (pathname !== '/') {
    return <></>;
  }

  const handleLogOut = () => {
    signOut()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight">
            TourBridgeJS
          </span>
        </Link>

        <nav className="flex items-center gap-3">
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
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={openLogin}>
                Sign In
              </Button>
              <Button className="font-medium" onClick={openSignup}>
                Get Started
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

'use client';

import { useAuth, useAuthDialogs } from '@/hooks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const { user, isSignedIn, isLoaded, signOut } = useAuth();
  const { openLogin, openSignup } = useAuthDialogs();

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded bg-linear-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold tracking-tighter shadow-[0_0_15px_rgba(34,211,238,0.5)]">
            T
          </div>
          <span className="text-white font-semibold tracking-tight text-sm group-hover:text-cyan-400 transition-colors">
            TourBridgeJS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link
            href="/#how-it-works"
            className="hover:text-white transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/#features"
            className="hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link href="/docs" className="hover:text-white transition-colors">
            Documentation
          </Link>
          {/* <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a> */}
        </nav>

        {/* Auth / CTA */}
        {!isSignedIn ? (
          <div className="hidden md:flex items-center gap-4">
            <div
              onClick={openLogin}
              className="text-sm cursor-default font-medium text-slate-400 hover:text-white transition-colors"
            >
              Sign in
            </div>
            <div
              onClick={openSignup}
              className="group cursor-default relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md bg-white px-4 font-medium text-gray-950 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <span className="mr-2 text-xs">Start free</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        ) : (
          <Link
            href="/dashboard"
            className="group cursor-default relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md bg-white px-4 font-medium text-gray-950 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span className="mr-2 text-xs">Dashboard</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        )}

        {/* Mobile Toggle Label */}
        <label
          htmlFor="mobile-menu-toggle"
          className="md:hidden p-2 text-slate-400 hover:text-white cursor-pointer z-50"
        >
          <svg
            id="menu-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <svg
            id="close-icon"
            className="hidden"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </label>
      </div>
    </header>
  );
};

export default Header;

'use client';

import React, { useReducer, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FocusTrap } from 'focus-trap-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface TourStep {
  id: string;
  target: string;
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

interface TourState {
  step: number;
  spotlight: boolean;
  avatar: boolean;
}

type TourAction =
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'TOGGLE_SPOTLIGHT' }
  | { type: 'TOGGLE_AVATAR' }
  | { type: 'RESET' }
  | { type: 'LOAD'; payload: TourState };

const tourSteps: TourStep[] = [
  {
    id: 'sidebar',
    target: '#demo-target-1',
    content:
      'This is the sidebar navigation. Use it to browse different sections.',
    placement: 'right',
  },
  {
    id: 'button',
    target: '#demo-target-2',
    content: 'Click this primary button to perform the main action.',
    placement: 'bottom',
  },
  {
    id: 'content',
    target: '#demo-target-3',
    content: 'This is the main content area where you&quotll see your data.',
    placement: 'top',
  },
];

const initialState: TourState = { step: 0, spotlight: false, avatar: false };

function tourReducer(state: TourState, action: TourAction): TourState {
  switch (action.type) {
    case 'NEXT':
      return { ...state, step: Math.min(state.step + 1, tourSteps.length - 1) };
    case 'BACK':
      return { ...state, step: Math.max(state.step - 1, 0) };
    case 'TOGGLE_SPOTLIGHT':
      return { ...state, spotlight: !state.spotlight };
    case 'TOGGLE_AVATAR':
      return { ...state, avatar: !state.avatar };
    case 'RESET':
      return initialState;
    case 'LOAD':
      return action.payload;
    default:
      return state;
  }
}

const Page = () => {
  const [state, dispatch] = useReducer(tourReducer, initialState);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('tourDemoState');
    if (saved) {
      try {
        dispatch({ type: 'LOAD', payload: JSON.parse(saved) });
      } catch (e) {
        console.warn('Failed to load tour state from localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tourDemoState', JSON.stringify(state));
  }, [state]);

  const currentStep = tourSteps[state.step];
  const isTourActive = state.step < tourSteps.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isTourActive) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      dispatch({ type: 'NEXT' });
      console.log('step_complete', currentStep.id);
    } else if (e.key === 'ArrowLeft') {
      dispatch({ type: 'BACK' });
    } else if (e.key === 'Escape') {
      dispatch({ type: 'RESET' });
      console.log('tour_skip');
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!isTourActive) return;
    if ((e.target as HTMLElement).id === currentStep.target.slice(1)) {
      dispatch({ type: 'NEXT' });
      console.log('step_complete', currentStep.id);
    }
  };

  const getTargetPosition = () => {
    if (!isTourActive || typeof window === 'undefined') return null;
    const target = document.querySelector(currentStep.target) as HTMLElement;
    if (!target) return null;
    const rect = target.getBoundingClientRect();
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return null;
    return {
      x: rect.left + rect.width / 2 - canvasRect.left,
      y: rect.top + rect.height / 2 - canvasRect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  // const targetPos = getTargetPosition();
  return (
    <>
      {/* Mobile Menu State */}
      <input type="checkbox" id="mobile-menu-toggle" className="hidden peer" />

      <Header />

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className="fixed inset-0 z-40 bg-gray-950 pt-24 px-6 hidden overflow-y-auto"
      >
        <nav className="flex flex-col gap-6 text-lg font-medium text-slate-300">
          <a href="#features" className="border-b border-white/10 pb-4">
            Features
          </a>
          <a href="#how-it-works" className="border-b border-white/10 pb-4">
            How it works
          </a>
          <a href="#docs" className="border-b border-white/10 pb-4">
            Documentation
          </a>
          {/* <a href="#pricing" className="border-b border-white/10 pb-4">
            Pricing
          </a> */}
          <div className="flex flex-col gap-4 mt-4">
            <a
              href="#"
              className="text-center py-3 rounded-lg border border-white/10 hover:bg-white/5"
            >
              Sign in
            </a>
            <a
              href="#"
              className="text-center py-3 rounded-lg bg-cyan-500 text-gray-950 font-semibold hover:bg-cyan-400"
            >
              Start free
            </a>
          </div>
        </nav>
      </div>

      <main className="relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-cyan-900/20 via-gray-950/0 to-transparent pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-medium mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              v1.0 is now live
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 mb-6 leading-[1.1]">
              Ship guided onboarding <br className="hidden md:block" /> tours in
              minutes
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Embed a configurable, animated tour widget with analytics—built
              for modern web apps. Zero layout shift. One script tag.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="#demo"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-cyan-500 text-gray-950 font-semibold text-sm hover:bg-cyan-400 transition-all shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2"
              >
                Try the demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
              <div className="w-full sm:w-auto relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
                <div className="relative flex items-center bg-gray-950 rounded-lg p-1 pr-4 border border-white/10">
                  <div className="bg-gray-900 px-3 py-2 rounded text-xs font-mono text-slate-400 mr-3 select-all">
                    $ npm i @tour/sdk
                  </div>
                  <button
                    className="text-slate-400 hover:text-white"
                    aria-label="Copy to clipboard"
                  >
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
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative max-w-4xl mx-auto rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-sm shadow-2xl overflow-hidden group">
              {/* Browser Chrome */}
              <div className="h-10 border-b border-white/5 bg-gray-900/80 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-white/10"></div>
                <div className="w-3 h-3 rounded-full bg-white/10"></div>
                <div className="w-3 h-3 rounded-full bg-white/10"></div>
                <div className="ml-4 h-5 w-64 rounded bg-white/5 text-[10px] flex items-center px-2 text-slate-500 font-mono">
                  localhost:3000/dashboard
                </div>
              </div>
              {/* Mock App Content */}
              <div className="p-8 h-[300px] md:h-[400px] relative flex flex-col gap-6">
                <div className="h-8 w-1/3 bg-white/5 rounded animate-pulse"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    id="tour-step-1"
                    className="h-32 bg-white/5 rounded border border-white/5"
                  ></div>
                  <div className="h-32 bg-white/5 rounded border border-white/5"></div>
                  <div className="h-32 bg-white/5 rounded border border-white/5"></div>
                </div>
                <div className="h-48 w-full bg-white/5 rounded border border-white/5"></div>

                {/* The Tour Widget Overlay */}
                <div className="absolute top-36 left-12 z-20 w-72 bg-gray-950 border border-white/10 rounded-lg shadow-[0_20px_50px_-12px_rgba(0,0,0,1)] p-5 transform transition-all duration-500 hover:scale-[1.02]">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Step 1 of 5
                    </div>
                    <button className="text-slate-500 hover:text-white">
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
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    Track your analytics
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Monitor conversion rates and drop-offs directly from this
                    panel.
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="text-xs text-slate-500 hover:text-slate-300">
                      Skip
                    </button>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded bg-white/5 text-xs text-white border border-white/10 hover:bg-white/10">
                        Back
                      </button>
                      <button className="px-3 py-1.5 rounded bg-cyan-500 text-xs text-gray-950 font-medium hover:bg-cyan-400">
                        Next
                      </button>
                    </div>
                  </div>
                  {/* Connecting Line */}
                  <div className="absolute -top-2 left-8 w-4 h-4 bg-gray-950 border-t border-l border-white/10 transform rotate-45"></div>
                </div>

                {/* Pulse on Target */}
                <span className="absolute top-[130px] left-[30px] flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-20"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 border-2 border-cyan-500 opacity-50"></span>
                </span>
              </div>
            </div>

            {/* Trusted By */}
            <div className="mt-16 pt-8 border-t border-white/5">
              <p className="text-sm text-slate-500 mb-6">
                Trusted by product-led teams shipping fast
              </p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 grayscale mix-blend-screen">
                {/* CSS Logos */}
                <div className="text-lg font-bold font-sans tracking-tight text-white flex items-center gap-1">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>ACME
                </div>
                <div className="text-lg font-bold font-mono tracking-tighter text-white">
                  globex
                </div>
                <div className="text-lg font-semibold italic text-white">
                  soylent
                </div>
                <div className="text-lg font-bold tracking-widest text-white uppercase">
                  initech
                </div>
                <div className="text-lg font-medium text-white flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Massive
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6 bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                Everything you need to <br /> activate users
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Designed for developers, loved by product managers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Embeddable Widget
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  One lightweight script. Zero layout shift. Loads
                  asynchronously and works with React, Vue, Svelte, or vanilla
                  HTML.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Analytics Built-in
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Automatic events for start, complete, skip, and drop-off.
                  Visualize funnel performance directly in your dashboard.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m16 10-4 4-4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  State Persistence
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Smart resume functionality. If a user refreshes or leaves,
                  they pick up exactly where they left off.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Enterprise Security
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Authentication via your existing provider (Clerk, Supabase,
                  Firebase). Anonymized tracking by default.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Polished Motion
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Silky smooth spring animations powered by GSAP. Respects{' '}
                  <code>prefers-reduced-motion</code> settings.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  A11y First
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Keyboard navigation, focus trapping, and ARIA attributes
                  handled automatically. WCAG AA compliant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="py-24 px-6 border-y border-white/5 bg-gray-950/50"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white mb-8">
                  Ship in three steps
                </h2>

                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">
                        Define your tour steps
                      </h4>
                      <p className="text-sm text-slate-400">
                        Target DOM elements using CSS selectors. Set content,
                        placement, and triggers.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center font-mono text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">
                        Embed the script
                      </h4>
                      <p className="text-sm text-slate-400">
                        Copy the unique snippet to your head tag or install via
                        NPM.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center font-mono text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">
                        Measure and iterate
                      </h4>
                      <p className="text-sm text-slate-400">
                        Watch users interact in real-time. Update copy instantly
                        without redeploying code.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <a
                    href="#"
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1"
                  >
                    Read the documentation{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Code Preview */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
                <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  <span className="ml-auto text-xs text-slate-500 font-mono">
                    config.ts
                  </span>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="text-xs md:text-sm leading-relaxed text-slate-300">
                    <span className="text-purple-400">import</span> {'{'}{' '}
                    <span className="text-yellow-200">TourWidget</span> {'}'}{' '}
                    <span className="text-purple-400">from</span>{' '}
                    <span className="text-green-400">
                      &quot;@tour/sdk&quot;
                    </span>
                    ;{'\n'}
                    {'\n'}
                    <span className="text-yellow-200">TourWidget</span>.
                    <span className="text-blue-400">init</span>({'{'}
                    {'\n'} <span className="text-cyan-300">tourId</span>:{' '}
                    <span className="text-green-400">
                      &quot;onboarding-v1&quot;
                    </span>
                    ,{'\n'} <span className="text-cyan-300">steps</span>: [
                    {'\n'} {'{'}
                    {'\n'} <span className="text-cyan-300">target</span>:{' '}
                    <span className="text-green-400">
                      &quot;#hero-cta&quot;
                    </span>
                    ,{'\n'} <span className="text-cyan-300">content</span>:{' '}
                    <span className="text-green-400">
                      &quot;Start here!&quot;
                    </span>
                    ,{'\n'} <span className="text-cyan-300">placement</span>:{' '}
                    <span className="text-green-400">&quot;bottom&quot;</span>
                    {'\n'} {'}'},{'\n'} {'{'}
                    {'\n'} <span className="text-cyan-300">target</span>:{' '}
                    <span className="text-green-400">
                      &quot;#dashboard&quot;
                    </span>
                    ,{'\n'} <span className="text-cyan-300">content</span>:{' '}
                    <span className="text-green-400">
                      &quot;View stats.&quot;
                    </span>
                    ,{'\n'} <span className="text-cyan-300">placement</span>:{' '}
                    <span className="text-green-400">&quot;right&quot;</span>
                    {'\n'} {'}'}
                    {'\n'} ],
                    {'\n'} <span className="text-cyan-300">analytics</span>:{' '}
                    <span className="text-pink-400">true</span>
                    {'\n'}
                    {'}'});
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section
          id="demo"
          className="py-24 px-6 bg-gray-950 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
              <div>
                <h2 className="text-3xl font-semibold text-white mb-2">
                  Experience the tour
                </h2>
                <p className="text-slate-400">
                  Interact with the controls below to simulate the user
                  experience.
                </p>
              </div>

              {/* Config Toggles */}
              <div className="flex gap-6 p-4 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-300">
                    Spotlight
                  </span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      type="checkbox"
                      name="toggle"
                      id="toggle-spotlight"
                      checked={state.spotlight}
                      onChange={() => dispatch({ type: 'TOGGLE_SPOTLIGHT' })}
                      className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-700 checked:right-0 checked:border-cyan-500 transition-all duration-300"
                    />
                    <label
                      htmlFor="toggle-spotlight"
                      className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-700 cursor-pointer"
                    ></label>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-300">
                    Avatar
                  </span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      type="checkbox"
                      name="toggle"
                      id="toggle-avatar"
                      checked={state.avatar}
                      onChange={() => dispatch({ type: 'TOGGLE_AVATAR' })}
                      className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-700 transition-all duration-300"
                    />
                    <label
                      htmlFor="toggle-avatar"
                      className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-700 cursor-pointer"
                    ></label>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Canvas */}
            <div className="relative w-full h-[500px] rounded-xl border border-white/10 bg-gray-900 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

              {/* Fake UI Elements to "Tour" */}
              <div
                className="absolute top-10 left-10 w-48 h-12 bg-white/5 rounded border border-white/10 flex items-center justify-center text-xs text-slate-600 font-mono"
                id="demo-target-1"
              >
                #sidebar-nav
              </div>
              <div
                className="absolute bottom-20 right-20 w-32 h-10 bg-cyan-900/20 rounded border border-cyan-500/30 flex items-center justify-center text-xs text-cyan-500 font-mono"
                id="demo-target-2"
              >
                #primary-btn
              </div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-white/5 rounded border border-white/10 flex items-center justify-center text-xs text-slate-600 font-mono"
                id="demo-target-3"
              >
                #main-content
              </div>

              {/* The Tour Card (Static representation of state) */}
              <div className="absolute top-1/2 left-1/2 translate-x-10 -translate-y-20 z-30 w-80 bg-gray-950 rounded-xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_60px_-10px_rgba(0,0,0,0.8)] p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      J
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        Main Dashboard
                      </h4>
                      <p className="text-[10px] text-slate-400">Step 2 of 4</p>
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  This is your central command center. View all your active
                  projects and recent analytics here.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-mono">
                    Press ⌘ + →
                  </span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                      Back
                    </button>
                    <button className="px-3 py-1.5 rounded bg-white text-xs text-gray-950 font-semibold hover:bg-gray-200 transition-colors">
                      Next
                    </button>
                  </div>
                </div>
                <div className="absolute -left-2 top-8 w-4 h-4 bg-gray-950 border-l border-b border-white/10 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Testimonials */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  &quot;We launched onboarding in a week and doubled our
                  completion rate. The developer experience is unmatched.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Sarah Jenkins
                    </div>
                    <div className="text-[10px] text-slate-500">
                      PM @ TechFlow
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  &quot;Analytics revealed friction points we didn&apos;t know
                  existed. Activation climbed 18% in the first month.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      David Chen
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Head of Growth
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  &quot;Accessible by default. QA time dropped significantly
                  because we didn&apos;t have to build custom focus traps.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Elena R.
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Engineering Manager
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section id="pricing" className="py-24 px-6 bg-gray-900/30 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950/80 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Start free. Scale as you grow.
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Free tier for demos and small projects. Usage-based pricing for
              production. Transparent, no hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 rounded-lg bg-white text-gray-950 font-semibold text-sm hover:bg-gray-200 transition-colors">
                Sign up free
              </button>
              <button className="px-8 py-3 rounded-lg bg-transparent border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors">
                Contact sales
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-6">
              Includes 14-day Pro trial. No credit card required.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            <details className="group bg-white/[0.02] border border-white/5 rounded-lg open:bg-white/[0.04] transition-colors">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-slate-300 hover:text-white">
                <span>Does this work with Next.js App Router?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="text-sm text-slate-400 p-5 pt-0 leading-relaxed">
                Yes, absolutely. The widget is a client-side component that
                mounts lazily. We provide a dedicated React hook and component
                wrapper compatible with RSC.
              </div>
            </details>
            <details className="group bg-white/[0.02] border border-white/5 rounded-lg open:bg-white/[0.04] transition-colors">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-slate-300 hover:text-white">
                <span>How does the styling work?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="text-sm text-slate-400 p-5 pt-0 leading-relaxed">
                The widget inherits your base font automatically. You can
                override colors, radii, and shadows via the config object or CSS
                variables to match your design system perfectly.
              </div>
            </details>
            <details className="group bg-white/[0.02] border border-white/5 rounded-lg open:bg-white/[0.04] transition-colors">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-slate-300 hover:text-white">
                <span>Is it accessible?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="text-sm text-slate-400 p-5 pt-0 leading-relaxed">
                We take accessibility seriously. The tour handles focus
                trapping, ARIA labeling, keyboard navigation (Escape to close,
                arrows to navigate), and respects reduced-motion preferences.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-semibold tracking-tight text-white mb-6">
              Build and ship your <br /> first tour today
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#"
                className="px-8 py-3.5 rounded-lg bg-cyan-500 text-gray-950 font-semibold text-sm hover:bg-cyan-400 transition-all shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]"
              >
                Start free
              </a>
              <a
                href="#"
                className="px-8 py-3.5 rounded-lg border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors"
              >
                Read documentation
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Page;

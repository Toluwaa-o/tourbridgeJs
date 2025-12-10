'use client';

import React, { useReducer, useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuthDialogs } from '@/hooks';
import { Hero } from '@/components/landing/hero';
import Features from '@/components/landing/features';
import HowItWorks from '@/components/landing/how-it-works';
import { Testimonial } from '@/components/landing/testimonial';
import Demo from '@/components/landing/demo';
import Faq from '@/components/landing/faq';
import Cta from '@/components/landing/cta';
import Pricing from '@/components/landing/pricing';
import Link from 'next/link';

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
  const { openLogin, openSignup } = useAuthDialogs();
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
      <input
        title="mobile-menu-toggle"
        type="checkbox"
        id="mobile-menu-toggle"
        className="hidden peer"
      />

      <Header />

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className="fixed inset-0 z-40 bg-gray-950 pt-24 px-6 hidden overflow-y-auto"
      >
        <nav className="flex flex-col gap-6 text-lg font-medium text-slate-300">
          <Link href="/#features" className="border-b border-white/10 pb-4">
            Features
          </Link>
          <Link href="/#how-it-works" className="border-b border-white/10 pb-4">
            How it works
          </Link>
          <Link href="/docs" className="border-b border-white/10 pb-4">
            Documentation
          </Link>
          {/* <a href="#pricing" className="border-b border-white/10 pb-4">
            Pricing
          </a> */}
          <div className="flex flex-col gap-4 mt-4">
            <div
              onClick={openLogin}
              className="text-center py-3 rounded-lg border border-white/10 hover:bg-white/5"
            >
              Sign in
            </div>
            <div
              onClick={openSignup}
              className="text-center py-3 rounded-lg bg-cyan-500 text-gray-950 font-semibold hover:bg-cyan-400"
            >
              Start free
            </div>
          </div>
        </nav>
      </div>

      <main className="relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-cyan-900/20 via-gray-950/0 to-transparent pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <Hero />

        {/* Features Grid */}

        <Features />

        {/* How it works */}
        <HowItWorks />

        {/* Interactive Demo Section */}
        {/* <Demo /> */}

        {/* Social Proof / Testimonials */}
        <Testimonial />

        {/* Pricing Teaser */}
        <Pricing />

        {/* FAQ Section */}
        <Faq />

        {/* Final CTA */}
        {/* <Cta /> */}
      </main>

      <Footer />
    </>
  );
};

export default Page;

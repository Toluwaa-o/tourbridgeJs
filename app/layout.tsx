import type { Metadata } from 'next';

import { Geist, Geist_Mono, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ConvexClientProvider from '@/components/providers/convex-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Navbar } from '@/components/navbar';
import { AuthDialogs } from '@/components/auth/auth-dialogs';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TourBridgeJS',
  description: 'Your onboarding platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Custom Base Styles & Animations */
            body { font-family: 'Inter', sans-serif; background-color: #030712; color: #F9FAFB; }

            code, pre { font-family: 'JetBrains Mono', monospace; }

            /* Custom Scrollbar */
            ::-webkit-scrollbar { width: 8px; }
            ::-webkit-scrollbar-track { background: #030712; }
            ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background: #374151; }

            /* Hide native checkbox for custom toggles */
            .toggle-checkbox:checked { right: 0; border-color: #22d3ee; }
            .toggle-checkbox:checked + .toggle-label { background-color: #22d3ee; }

            /* Shine Effect Animation */
            @keyframes shine {
                from { background-position: 0 0; }
                to { background-position: -200% 0; }
            }
            .animate-shine {
                background: linear-gradient(110deg,#000103 45%,#1e2631 55%,#000103);
                background-size: 200% 100%;
                animation: shine 3s linear infinite;
            }

            /* Accordion Marker Hide */
            details > summary { list-style: none; }
            details > summary::-webkit-details-marker { display: none; }

            /* Mobile Menu Logic via Checkbox Hack */
            #mobile-menu-toggle:checked ~ #mobile-menu { display: block; }
            #mobile-menu-toggle:checked ~ header #menu-icon { display: none; }
            #mobile-menu-toggle:checked ~ header #close-icon { display: block; }
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: '#22d3ee', // Cyan 400
                            surface: '#0B0F19',
                            border: '#1F2937',
                        },
                        backgroundImage: {
                            'glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
                        }
                    }
                }
            }
          `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${jetbrainsMono.variable} bg-gray-950 text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200 antialiased`}
      >
        <ClerkProvider
          signInFallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
        >
          <ConvexClientProvider>
            <Navbar />
            <AuthDialogs />
            {children}
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

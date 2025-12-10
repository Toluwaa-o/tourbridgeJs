'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Footer from '@/components/Footer';

const DocsPage = () => {
    const [activeSection, setActiveSection] = useState('quick-start');
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedCode(id);
            setTimeout(() => setCopiedCode(null), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const sections = [
        { id: 'quick-start', title: 'Quick Start' },
        { id: 'configuration', title: 'Configuration' },
        { id: 'event-hooks', title: 'Event Hooks' },
        { id: 'analytics', title: 'Analytics' },
        { id: 'authentication', title: 'Authentication' },
        { id: 'accessibility', title: 'Accessibility' },
        { id: 'faq', title: 'FAQ' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <>
      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 bg-gray-950">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-slate-400 mb-6"
            >
              Documentation that respects your time
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
            >
              Install, configure, and ship guided tours in minutes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="#quick-start"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-cyan-500 text-gray-950 font-semibold hover:bg-cyan-400 transition-colors"
              >
                View API Reference
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>

                        {/* Animated Code Snippet */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mt-16 max-w-2xl mx-auto"
                        >
                            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
                                <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                                    <span className="ml-auto text-xs text-slate-500 font-mono">
                                        index.html
                                    </span>
                                </div>
                                <div className="p-6">
                                    <SyntaxHighlighter
                                        language="html"
                                        style={vscDarkPlus}
                                        customStyle={{ margin: 0, background: 'transparent' }}
                                    >
                                        {`<script src="https://unpkg.com/convex@1.3.1/dist/browser.bundle.js"></script>
<script data-tourId="yourtourId" src="https://venerable-churros-558104.netlify.app/tour-widget.js"></script>

<script>
document.getElementById("start").addEventListener("click", () => {
  window.InitTour({});
});
</script>`}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

        {/* Main Content */}
        <div className="flex relative min-h-screen">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 skicky top-16 h-screen overflow-y-auto bg-gray-950 border-r border-white/5 p-6">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </aside>

                    {/* Mobile Sidebar */}
                    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-white/5 p-4 z-50">
                        <select
                            title='sections'
                            value={activeSection}
                            onChange={(e) => scrollToSection(e.target.value)}
                            className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-white"
                        >
                            {sections.map((section) => (
                                <option key={section.id} value={section.id}>
                                    {section.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-6 lg:px-12 py-12 pb-24 lg:pb-12">
                        {/* Quick Start */}
                        <motion.section
                            id="quick-start"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl font-semibold text-white mb-8">
                                Quick Start
                            </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">
                    Step 1 — Embed Scripts
                  </h3>
                  <p className="text-slate-400 mb-4">
                    This is our own embedded stuff workings. You will need to
                    include two script tags in your HTML, one for convex and the
                    other for the tourbridge.js
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-slate-400 mb-2">
                        Add these scripts to your HTML head section:
                      </p>
                      <div className="relative">
                        <SyntaxHighlighter
                          language="html"
                          style={vscDarkPlus}
                          customStyle={{ margin: 0 }}
                        >
                          {`<script src="https://unpkg.com/convex@1.3.1/dist/browser.bundle.js"></script>
<script data-tourId="yourtourId" src="https://venerable-churros-558104.netlify.app/tour-widget.js"></script>`}
                                                </SyntaxHighlighter>
                                                <button
                                                    onClick={() =>
                                                        copyToClipboard(
                                                            `<script src="https://unpkg.com/convex@1.3.1/dist/browser.bundle.js"></script>
<script data-tourId="yourtourId" src="https://venerable-churros-558104.netlify.app/tour-widget.js"></script>`,
                                                            'scripts'
                                                        )
                                                    }
                                                    className="absolute top-2 right-2 p-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
                                                >
                                                    {copiedCode === 'scripts' ? (
                                                        <svg
                                                            className="w-4 h-4 text-green-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            className="w-4 h-4 text-slate-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                            <p className="text-slate-400 mt-2">
                                                For the tourbridge.js, make sure you're passing your tourId from your dashboard
                                            </p>
                                        </div>
                                    </div>
                                </div>

                <div>
                  <h3 className="text-xl font-medium text-white mb-4">
                    Step 2 — Initialize
                  </h3>
                  <div className="relative">
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{ margin: 0 }}
                    >
                      {`<script>
document.getElementById("start").addEventListener("click", () => {
  window.InitTour({});
});
</script>`}
                    </SyntaxHighlighter>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<script>
document.getElementById("start").addEventListener("click", () => {
  window.InitTour({});
});
</script>`,
                          'init'
                        )
                      }
                      className="absolute top-2 right-2 p-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                      {copiedCode === 'init' ? (
                        <svg
                          className="w-4 h-4 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-white mb-4">
                    Step 3 — Demo
                  </h3>
                  <p className="text-slate-400 mb-4">For demo:</p>
                  <div className="relative">
                    <SyntaxHighlighter
                      language="html"
                      style={vscDarkPlus}
                      customStyle={{ margin: 0 }}
                    >
                      {`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tour Demo Page</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Roboto", sans-serif;
        margin: 0;
        background-color: #f5f5f5;
      }

      /* Navbar */
      #navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #3f51b5;
        color: white;
        padding: 1rem 2rem;
      }

      #navbar a {
        color: white;
        text-decoration: none;
        margin-left: 1rem;
        font-weight: 500;
      }

      /* Welcome Section */
      #welcome {
        text-align: center;
        padding: 4rem 2rem;
        background-image: url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=1200&q=80");
        background-size: cover;
        background-position: center;
        color: white;
      }

      #welcome h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      #welcome p {
        font-size: 1.2rem;
      }

      /* Main Layout */
      .container {
        display: flex;
        margin: 2rem;
        gap: 2rem;
      }

      /* Sidebar */
      #sidebar {
        width: 250px;
        background-color: #ffffff;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }

      #sidebar h2 {
        margin-top: 0;
        font-size: 1.5rem;
        color: #3f51b5;
      }

      #sidebar ul {
        list-style: none;
        padding: 0;
      }

      #sidebar li {
        margin: 1rem 0;
        font-weight: 500;
      }

      /* Main Content */
      .main {
        flex: 1;
        background-color: #ffffff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }

      /* Search Bar */
      #search-bar {
        display: flex;
        margin-bottom: 2rem;
      }

      #search-bar input {
        flex: 1;
        padding: 0.8rem;
        border-radius: 4px 0 0 4px;
        border: 1px solid #ccc;
        outline: none;
      }

      #search-bar button {
        padding: 0.8rem 1rem;
        border: none;
        background-color: #3f51b5;
        color: white;
        font-weight: bold;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
      }

      /* Profile Settings */
      #profile-settings {
        margin-top: 2rem;
        text-align: center;
      }

      #profile-settings img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #3f51b5;
      }

      #profile-settings h3 {
        margin: 1rem 0 0.5rem 0;
        font-size: 1.5rem;
        color: #333;
      }

      #profile-settings p {
        color: #666;
      }
    </style>
  </head>
  <body>
    <!-- Navbar -->
    <nav id="navbar">
      <div>Tour Demo</div>
      <div>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#" id="start">Start</a>
      </div>
    </nav>

    <!-- Welcome Section -->
    <section id="welcome">
      <h1>Welcome to the Tour</h1>
      <p>Follow along to explore the key features of our platform.</p>
    </section>

    <!-- Main Container -->
    <div class="container">
      <!-- Sidebar -->
      <aside id="sidebar">
        <h2>Quick Links</h2>
        <ul>
          <li>Dashboard</li>
          <li>Messages</li>
          <li>Settings</li>
          <li>Support</li>
        </ul>
      </aside>

      <!-- Main Content -->
      <div class="main">
        <!-- Search Bar -->
        <div id="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Go</button>
        </div>

        <!-- Profile Settings -->
        <div id="profile-settings">
          <img
            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?fit=crop&w=200&q=80"
            alt="Profile"
          />
          <h3>Jane Doe</h3>
          <p>Member since 2023</p>
        </div>
      </div>
    </div>

    <script src="https://unpkg.com/convex@1.3.1/dist/browser.bundle.js"></script>
   <script data-tourId="tour_1" src="https://venerable-churros-558104.netlify.app/tour-widget.js"></script>
    <script>
      document.getElementById("start").addEventListener("click", () => {
        window.InitTour({});
      });
    </script>
  </body>
</html>`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Accessibility */}
            <motion.section
              id="accessibility"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-semibold text-white mb-8">
                Accessibility Notes
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/2 border border-white/5">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Keyboard Navigation
                  </h3>
                  <p className="text-slate-400">
                    Tab, Enter, Escape keys supported. Full keyboard
                    accessibility.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/2 border border-white/5">
                  <h3 className="text-lg font-medium text-white mb-2">
                    ARIA Labels
                  </h3>
                  <p className="text-slate-400">
                    Proper ARIA roles and labels for screen readers.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/2 border border-white/5">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Reduced Motion
                  </h3>
                  <p className="text-slate-400">
                    Respects prefers-reduced-motion settings.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/2 border border-white/5">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Contrast
                  </h3>
                  <p className="text-slate-400">
                    WCAG AA compliant color contrast ratios.
                  </p>
                </div>
              </div>
            </motion.section>
                        {/* Accessibility */}
                        <motion.section
                            id="accessibility"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl font-semibold text-white mb-8">
                                Accessibility Notes
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <h3 className="text-lg font-medium text-white mb-2">
                                        Keyboard Navigation
                                    </h3>
                                    <p className="text-slate-400">
                                        Tab, Enter, Escape keys supported. Full keyboard
                                        accessibility.
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <h3 className="text-lg font-medium text-white mb-2">
                                        ARIA Labels
                                    </h3>
                                    <p className="text-slate-400">
                                        Proper ARIA roles and labels for screen readers.
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <h3 className="text-lg font-medium text-white mb-2">
                                        Reduced Motion
                                    </h3>
                                    <p className="text-slate-400">
                                        Respects prefers-reduced-motion settings.
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <h3 className="text-lg font-medium text-white mb-2">
                                        Contrast
                                    </h3>
                                    <p className="text-slate-400">
                                        WCAG AA compliant color contrast ratios.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

            {/* FAQ */}
            <motion.section
              id="faq"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-semibold text-white mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <details className="group bg-white/2 border border-white/5 rounded-lg open:bg-white/4 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-slate-300 hover:text-white">
                    <span>How well does it works with HTML page?</span>
                    <span className="transition group-open:rotate-180">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m6 9 6 6 6-6"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="text-sm text-slate-400 p-5 pt-0 leading-relaxed">
                    The widget works perfectly on any standard HTML page. Just
                    add the script tag, include the required selectors, and
                    you&apos;re ready to go—no extra setup needed.
                  </div>
                </details>
                <details className="group bg-white/2 border border-white/5 rounded-lg open:bg-white/4 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-slate-300 hover:text-white">
                    <span>How does the styling work?</span>
                    <span className="transition group-open:rotate-180">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m6 9 6 6 6-6"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="text-sm text-slate-400 p-5 pt-0 leading-relaxed">
                    The widget inherits a base font and color automatically. You
                    can override colors via the dashoard and also customize your
                    button color and text color.
                  </div>
                </details>
                <details className="group bg-white/2 border border-white/5 rounded-lg open:bg-white/4 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-slate-300 hover:text-white">
                    <span>Is it accessible?</span>
                    <span className="transition group-open:rotate-180">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m6 9 6 6 6-6"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="text-sm text-slate-400 p-5 pt-0 leading-relaxed">
                    We take accessibility seriously. The tour handles focus
                    trapping, ARIA labeling, keyboard navigation (Escape to
                    close, arrows to navigate), and respects reduced-motion
                    preferences.
                  </div>
                </details>
                <details className="group bg-white/2 border border-white/5 rounded-lg open:bg-white/4 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-slate-300 hover:text-white">
                    <span>Can I use this widget in React?</span>
                    <span className="transition group-open:rotate-180">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m6 9 6 6 6-6"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="text-sm text-slate-400 p-5 pt-0 leading-relaxed">
                    Not at the moment. The widget is currently optimized only
                    for plain HTML pages. Support for React and other frameworks
                    may be added in future updates.
                  </div>
                </details>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

            <Footer />
        </>
    );
};

export default DocsPage;

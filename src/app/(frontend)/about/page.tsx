import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'About Alain Dave Tapiru – SEO Specialist & Web Designer',
  description:
    "Learn about Alain Dave Tapiru's background in technical SEO, Next.js web development, cybersecurity, and executive virtual assistance.",
  url: 'https://alaintapiru.com/about',
})

export default function AboutPage() {
  return (
    <main className="relative z-10 flex-grow pt-28 sm:pt-32 md:pt-36 pb-20 px-6 md:px-16 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <header className="space-y-4">
          <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest block font-semibold">
            Biography &amp; Background
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl text-on-surface font-extrabold leading-tight">
            Engineering High-Ranking Digital Experiences with Technical Precision
          </h1>
        </header>

        {/* Narrative Bio */}
        <section className="glass-panel p-8 md:p-10 rounded-2xl border border-white/10 space-y-6">
          <h2 className="font-headline-md text-2xl text-on-surface font-bold">The Journey</h2>
          <p className="font-body-lg text-on-surface-variant text-base leading-relaxed">
            My background combines rigorous technical education in BSIT Network &amp; Cybersecurity with hands-on expertise in digital search algorithms, web development, and executive operational assistance.
          </p>
          <p className="font-body-lg text-on-surface-variant text-base leading-relaxed">
            Over years of optimizing digital platforms, I've refined a holistic methodology: technical SEO isn't just about keywords—it's about server response time, clean JSON-LD structured data, responsive mobile viewports, and high-converting user experience design.
          </p>
        </section>

        {/* Core Competencies */}
        <section className="space-y-6">
          <h2 className="font-headline-lg text-2xl text-on-surface font-bold flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
              <span className="material-symbols-outlined text-primary-container text-3xl">search</span>
              <h3 className="font-headline-md text-lg text-on-surface font-bold">Technical &amp; Local SEO</h3>
              <p className="font-body-md text-secondary-fixed-dim text-xs leading-relaxed">
                Crawl budget optimization, canonical auditing, geotargeted local landing pages, and Google Business Profile ranking.
              </p>
            </div>
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
              <span className="material-symbols-outlined text-primary-container text-3xl">code</span>
              <h3 className="font-headline-md text-lg text-on-surface font-bold">Web Engineering</h3>
              <p className="font-body-md text-secondary-fixed-dim text-xs leading-relaxed">
                High-performance Next.js App Router applications, Tailwind CSS design systems, and headless CMS integrations.
              </p>
            </div>
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
              <span className="material-symbols-outlined text-primary-container text-3xl">support_agent</span>
              <h3 className="font-headline-md text-lg text-on-surface font-bold">Virtual Assistance</h3>
              <p className="font-body-md text-secondary-fixed-dim text-xs leading-relaxed">
                Executive administrative support, workflow automation, CRM management, and technical client relations.
              </p>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="glass-panel p-8 md:p-10 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-2xl text-on-surface font-bold">
              Education &amp; Certifications
            </h2>
            <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest px-3 py-1 bg-primary-container/10 border border-primary-container/20 rounded-full">
              Verified
            </span>
          </div>

          <div className="space-y-4 font-body-md text-on-surface-variant text-sm">
            <div className="p-4 bg-surface-container-high/50 rounded-lg border border-white/5">
              <h4 className="font-bold text-on-surface">Bachelor of Science in Information Technology (BSIT)</h4>
              <p className="text-secondary-fixed-dim text-xs mt-1">
                Specialization in Network &amp; Cybersecurity
              </p>
            </div>
            <div className="p-4 bg-surface-container-high/50 rounded-lg border border-white/5">
              <h4 className="font-bold text-on-surface">Industry SEO &amp; Technical Certifications</h4>
              <p className="text-secondary-fixed-dim text-xs mt-1">
                Google Search Ads Certified • Ahrefs Technical SEO Academy
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#e67e22] hover:bg-[#ff9436] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_0_25px_rgba(230,126,34,0.5)] transition-all"
          >
            Start a Conversation <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

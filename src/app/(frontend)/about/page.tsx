import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { AboutCredentials } from '@/components/AboutCredentials'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = generateMetadata({
  title: 'About Alain Dave Tapiru | SEO Specialist in the Philippines',
  description:
    'Meet Alain Dave Tapiru, an SEO Specialist in the Philippines helping businesses earn search visibility, attract qualified traffic and turn searches into growth.',
  url: 'https://www.alaintapiru.com/about/',
})

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-20">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'About', url: '/about/' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          Biography &amp; Background
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6 tracking-tight">
          Architecting Search Presence &amp; Secure Digital Systems
        </h1>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          I am an SEO Specialist, Web Designer, and BSIT student specializing in Network &amp; Cybersecurity.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        <div className="lg:col-span-5 relative h-[280px] sm:h-[380px] lg:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about_me.jpg"
            alt="Alain Dave Tapiru"
            className="w-full h-full object-cover object-center absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1111] via-transparent to-transparent opacity-80" />
        </div>

        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
            The Journey &amp; Philosophy
          </h2>
          <div className="space-y-3 sm:space-y-4 font-sans text-on-surface/80 text-sm sm:text-base leading-relaxed">
            <p>
              My professional journey began in client-facing operations, where I mastered human-centric problem solving and clear communication. Transitioning into Search Engine Optimization allowed me to combine analytical strategy with technical execution.
            </p>
            <p>
              Today, I bridge the gap between technical search optimization, modern frontend engineering (Next.js &amp; React), and cybersecurity fundamentals. I believe that an effective website must not only rank on search engines, but also load instantly, look stunning, and operate securely.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h3 className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] mb-3 font-semibold">
              Core Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Link
                href="/services/#pillar-foundation"
                className="p-3.5 sm:p-4 rounded-xl bg-surface-1/70 hover:bg-surface-1 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group block"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="font-heading text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    Technical, On-Page, Off-Page &amp; Local SEO
                  </h4>
                  <Icon name="arrow_forward" size={14} className="text-primary-container opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface/65 leading-relaxed">
                  Crawl error resolution, schema markup, site speed optimization, local SEO presence, content optimization, and off-page link building strategies.
                </p>
              </Link>
              <Link
                href="/services/#pillar-execution"
                className="p-3.5 sm:p-4 rounded-xl bg-surface-1/70 hover:bg-surface-1 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group block"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="font-heading text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    Modern Web Design
                  </h4>
                  <Icon name="arrow_forward" size={14} className="text-primary-container opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface/65 leading-relaxed">
                  Next.js, Tailwind CSS, Payload CMS, WordPress, Elementor, and responsive glassmorphism interfaces.
                </p>
              </Link>
              <Link
                href="/projects/angat-sikat-studio/"
                className="p-3.5 sm:p-4 rounded-xl bg-surface-1/70 hover:bg-surface-1 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group block"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="font-heading text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    AI Web Design &amp; Development
                  </h4>
                  <Icon name="arrow_forward" size={14} className="text-primary-container opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface/65 leading-relaxed">
                  AI-assisted UI/UX prototyping, intelligent web application development, automated asset generation, and rapid full-stack delivery.
                </p>
              </Link>
              <Link
                href="/tools/"
                className="p-3.5 sm:p-4 rounded-xl bg-surface-1/70 hover:bg-surface-1 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group block"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="font-heading text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    AI Workflow Automation &amp; Diagnostics
                  </h4>
                  <Icon name="arrow_forward" size={14} className="text-primary-container opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface/65 leading-relaxed">
                  Interactive GBP Health Checker, Gemini AI local scoring engines, and programmatic content workflows.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Credentials & Education */}
      <AboutCredentials />

      {/* CTA */}
      <div className="text-center pt-4 sm:pt-8">
        <Link
          href="/contact/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:scale-105 transition-all min-h-[48px]"
        >
          Work With Me <Icon name="arrow_forward" size={16} />
        </Link>
      </div>
    </div>
  )
}

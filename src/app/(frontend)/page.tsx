import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page as PayloadPage } from '@/payload-types'
import { RenderBlocks } from '@/components/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ScrollHero } from '@/components/ScrollHero'
import { GBPHomepageCallout } from '@/components/GBPHomepageCallout'
import { PerformanceAuditProof } from '@/components/PerformanceAuditProof'
import { Icon } from '@/components/icons'
import { OpenToOpportunities } from '@/components/OpenToOpportunities'
import { HomepageFAQ } from '@/components/HomepageFAQ'
import { TrustCommitment } from '@/components/TrustCommitment'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'SEO Specialist Philippines | Practical SEO & Web Support | Alain Dave Tapiru',
  description:
    'Alain Dave Tapiru provides practical SEO and website support for small businesses and agencies in the Philippines. Clear scope, direct communication, and hands-on implementation.',
  url: 'https://www.alaintapiru.com/',
})

export default async function Page() {
  let page: PayloadPage | null = null

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'index',
        },
      },
    })
    page = docs[0] ?? null
  } catch {
    // Graceful offline/paused DB fallback: core portfolio sections are statically hardcoded React components
    page = null
  }

  return (
    <>
      <LivePreviewListener />

      {/* 1. HERO SECTION */}
      <section id="home" className="relative">
        <ScrollHero />
      </section>

      {/* 2. TRUST CLARIFICATION BAR */}
      <section className="py-8 sm:py-10 bg-transparent border-y border-primary-container/20 shadow-[0_0_30px_rgba(230,126,34,0.08)] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-surface-1/90 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-sm motion-reveal">
              <div className="w-10 h-10 rounded-lg bg-primary-container/10 border border-primary-container/30 text-primary-container flex items-center justify-center shrink-0">
                <Icon name="find_in_page" size={20} />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-on-surface">Clearly Defined Scope</h3>
                <p className="font-sans text-xs text-on-surface/75 leading-relaxed">
                  Fixed deliverables and transparent task milestones with no ambiguous promises.
                </p>
              </div>
            </div>

            <div style={{ transitionDelay: '80ms' }} className="flex items-center gap-3.5 p-4 rounded-xl bg-surface-1/90 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-sm motion-reveal">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shrink-0">
                <Icon name="chat" size={20} />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-on-surface">Direct Communication</h3>
                <p className="font-sans text-xs text-on-surface/75 leading-relaxed">
                  Work directly with Alain. No agency account managers, middlemen, or delayed replies.
                </p>
              </div>
            </div>

            <div style={{ transitionDelay: '160ms' }} className="flex items-center gap-3.5 p-4 rounded-xl bg-surface-1/90 backdrop-blur-md border border-black/10 dark:border-white/5 shadow-sm motion-reveal">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
                <Icon name="payments" size={20} />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-on-surface">Predictable Pricing</h3>
                <p className="font-sans text-xs text-on-surface/75 leading-relaxed">
                  Clear, competitive package rates and flexible milestone pricing for small businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHO THIS IS FOR (2 TARGET AUDIENCES) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            Audience &amp; Collaboration
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-on-surface mb-3 tracking-tight">
            Who This Is For
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface/75 leading-relaxed">
            Practical SEO and website support built around two distinct collaboration models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Audience 1: Small Businesses */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-primary-container/30 hover:border-primary-container/60 transition-all flex flex-col justify-between shadow-lg motion-reveal">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container text-xs font-heading font-semibold uppercase tracking-[0.08em] mb-4">
                <Icon name="storefront" size={14} />
                <span>Small Businesses &amp; Founders</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-3">
                Need Search Visibility Without Agency Retainers?
              </h3>
              <p className="font-sans text-sm sm:text-base text-on-surface/80 leading-relaxed mb-6">
                Ideal for local service businesses, trades, and independent founders who want a fast, clean website foundation, Google Maps presence, and reliable search optimization without confusing jargon.
              </p>

              <div className="space-y-2.5 mb-6">
                {[
                  'Local SEO & Google Business Profile foundation',
                  'On-page keyword mapping & heading structure',
                  'Fast WordPress or custom website builds',
                  'Clear monthly maintenance & technical updates',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface/80">
                    <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              <Link
                href="/services/#packages"
                className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.06em] font-bold text-primary-container hover:text-primary transition-colors"
              >
                <span>View Small Business Packages</span>
                <Icon name="arrow_forward" size={14} />
              </Link>
            </div>
          </div>

          {/* Audience 2: Agencies & Dev Teams */}
          <div style={{ transitionDelay: '100ms' }} className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col justify-between shadow-lg motion-reveal">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-heading font-semibold uppercase tracking-[0.08em] mb-4">
                <Icon name="group" size={14} />
                <span>Agencies &amp; Dev Teams</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-3">
                Need Reliable Overflow Support For SEO Backlogs?
              </h3>
              <p className="font-sans text-sm sm:text-base text-on-surface/80 leading-relaxed mb-6">
                Ideal for digital marketing agencies, SEO leads, and development teams needing dependable overflow capacity for discrete technical audits, schema markup implementation, and on-page tickets.
              </p>

              <div className="space-y-2.5 mb-6">
                {[
                  'Technical SEO crawl audits & issue resolution',
                  'Complex JSON-LD Schema entity implementation',
                  'WordPress & Next.js task execution',
                  'Discrete ticket delivery with transparent logs',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface/80">
                    <Icon name="check_circle" size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              <Link
                href="/contact/?service=Overflow%20Task%20/%20Backlog%20Support"
                className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.06em] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Discuss Agency Overflow Support</span>
                <Icon name="arrow_forward" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 4. CORE OFFERS (4 FOCUSED PILLARS) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            Service Pillars
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-on-surface mb-3 tracking-tight">
            Core Service Offers
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface/75 leading-relaxed">
            Clearly scoped technical SEO, on-page optimization, local search foundations, and web support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              title: 'Technical SEO & Schema',
              desc: 'Crawl audits, Core Web Vitals profiling, indexing fixes, and structured JSON-LD entity graphs.',
              icon: 'search',
              href: '/services/technical-seo/',
              badge: 'Foundation',
            },
            {
              title: 'On-Page SEO & Intent',
              desc: 'Search intent keyword mapping, clean heading hierarchies, metadata CTR tuning, and internal linking.',
              icon: 'edit_note',
              href: '/services/on-page-seo/',
              badge: 'Relevance',
            },
            {
              title: 'Local SEO & Maps',
              desc: '10-point Google Business Profile calibration, category accuracy, and local citation structuring.',
              icon: 'hub',
              href: '/services/local-seo/',
              badge: 'Visibility',
            },
            {
              title: 'Web Design & Support',
              desc: 'Fast, responsive WordPress and Next.js websites built with semantic HTML and zero layout shift.',
              icon: 'code',
              href: '/services/web-development/',
              badge: 'Execution',
            },
          ].map((item, idx) => (
            <div
              key={item.title}
              style={{ transitionDelay: `${idx * 60}ms` }}
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/60 transition-all group flex flex-col justify-between shadow-sm hover:-translate-y-1 motion-reveal"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-container/10 border border-primary-container/30 text-primary-container flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-2 border border-black/5 dark:border-white/5 text-on-surface/70">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface mb-2">{item.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-on-surface/75 leading-relaxed mb-4">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-black/10 dark:border-white/10">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 font-heading text-xs font-bold text-primary-container hover:text-primary transition-colors py-1 group/link"
                >
                  <span>Explore Scope</span>
                  <Icon name="arrow_forward" size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 5. SIMPLE 4-STEP PROCESS */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            Execution Cycle
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-on-surface mb-3 tracking-tight">
            A Straightforward 4-Step Process
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface/75 leading-relaxed">
            A simple, structured workflow from initial review to implementation and reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              step: '01',
              title: 'Discovery & Access',
              desc: 'Initial review of site structure, Search Console and GA4 data, and priority business goals.',
              icon: 'find_in_page',
            },
            {
              step: '02',
              title: 'Baseline Diagnostics',
              desc: 'Auditing crawl bottlenecks, indexation status, Core Web Vitals, and local search signals.',
              icon: 'equalizer',
            },
            {
              step: '03',
              title: 'Implementation Sprint',
              desc: 'Executing hands-on technical fixes, on-page headings, schema markup, and code improvements.',
              icon: 'edit_note',
            },
            {
              step: '04',
              title: 'Transparent Reporting',
              desc: 'Delivering documented task logs, validation tests, and practical recommendations for ongoing growth.',
              icon: 'task_alt',
            },
          ].map((item, idx) => (
            <div
              key={item.step}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/60 transition-all group flex flex-col justify-between shadow-sm relative motion-reveal"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Icon name={item.icon} size={28} className="text-primary-container group-hover:scale-110 transition-transform" />
                  <span className="font-heading text-2xl font-black text-black/15 dark:text-white/15 group-hover:text-primary-container/40 transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface mb-2">{item.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-on-surface/80 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 6. PROOF OF WORK (FEATURED PROJECTS WITH TRUTHFUL ROLE LABELS) */}
      <section className="py-16 sm:py-24 bg-transparent relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-4 motion-reveal">
            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
                Proof of Work
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-on-surface tracking-tight">
                Live Builds &amp; Technical Proofs
              </h2>
            </div>
            <Link
              href="/projects/"
              className="font-heading text-xs uppercase tracking-[0.06em] font-bold text-primary-container hover:underline flex items-center gap-1"
            >
              View All Projects <Icon name="arrow_forward" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Project 1: AngatSikat Studio */}
            <div className="rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-amber-500/30 hover:border-primary-container/60 transition-[border-color,transform] duration-[var(--motion-normal)] ease-[var(--ease-organic)] group flex flex-col justify-between overflow-hidden shadow-lg hover:-translate-y-[3px] card-image-zoom motion-reveal">
              <div>
                <div className="relative w-full h-48 sm:h-52 bg-black/40 overflow-hidden">
                  <Image
                    src="/images/projects/angatsikat-studio-wordpress-website-preview.avif"
                    alt="AngatSikat Studio WordPress website design and custom theme preview"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-medium bg-surface-1/90 text-amber-500 border border-amber-500/40 backdrop-blur-md shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Ongoing Build
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading text-xs text-primary-container uppercase tracking-wider font-semibold">
                      WordPress • Custom Theme
                    </span>
                    <span className="text-[11px] font-sans text-on-surface/70">
                      Self-Initiated Build
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                    AngatSikat Studio
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-primary-container/90 italic font-medium">
                    &ldquo;Websites Built to Be Found.&rdquo;
                  </p>

                  <p className="font-sans text-sm text-on-surface/75 leading-relaxed line-clamp-3">
                    A custom WordPress theme platform built to unify modern website creation with technical crawlability and search visibility.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['WordPress', 'Technical SEO', 'Custom Theme'].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-heading text-on-surface/80 uppercase tracking-wider font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-black/10 dark:border-white/10 mt-4 flex items-center justify-between gap-2">
                <Link
                  href="/projects/angat-sikat-studio/"
                  className="inline-flex items-center gap-1 font-heading text-xs uppercase tracking-wider font-bold text-on-surface hover:text-primary-container transition-colors py-1"
                >
                  <span>Project Details</span>
                  <Icon name="arrow_forward" size={14} />
                </Link>

                <a
                  href="https://angat-sikat.freedev.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container text-xs font-heading font-bold shadow-[0_0_15px_rgba(224,123,32,0.3)] hover:bg-primary transition-all"
                >
                  <span>View Live Build</span>
                  <Icon name="north_east" size={13} />
                </a>
              </div>
            </div>

            {/* Project 2: Local SEO & GBP Checker */}
            <div style={{ transitionDelay: '80ms' }} className="rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-black/10 dark:border-white/10 hover:border-primary-container/60 transition-[border-color,transform] duration-[var(--motion-normal)] ease-[var(--ease-organic)] group flex flex-col justify-between overflow-hidden shadow-lg hover:-translate-y-[3px] card-image-zoom motion-reveal">
              <div>
                <div className="relative w-full h-48 sm:h-52 bg-black/40 overflow-hidden">
                  <Image
                    src="/images/projects/local-seo-gbp-health-checker-preview.webp"
                    alt="Local SEO and Google Business Profile Health Checker interface"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-medium bg-surface-1/90 text-emerald-500 border border-emerald-500/40 backdrop-blur-md shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live Tool
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading text-xs text-emerald-500 uppercase tracking-wider font-semibold">
                      Local SEO • Diagnostic Tool
                    </span>
                    <span className="text-[11px] font-sans text-on-surface/70">
                      Self-Initiated Build
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                    Local SEO &amp; GBP Health Checker
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-primary-container/90 italic font-medium">
                    &ldquo;Interactive Google Business Profile Signal Analyzer.&rdquo;
                  </p>

                  <p className="font-sans text-sm text-on-surface/75 leading-relaxed line-clamp-3">
                    A self-built tool for analyzing key Google Business Profile and local SEO signals, helping identify practical opportunities for better local search visibility.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Next.js', 'React', 'Local SEO', 'AI Scoring'].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-heading text-on-surface/80 uppercase tracking-wider font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-black/10 dark:border-white/10 mt-4 flex items-center justify-between gap-2">
                <Link
                  href="/projects/local-seo-gbp-checker/"
                  className="inline-flex items-center gap-1 font-heading text-xs uppercase tracking-wider font-bold text-on-surface hover:text-primary-container transition-colors py-1"
                >
                  <span>Project Details</span>
                  <Icon name="arrow_forward" size={14} />
                </Link>

                <Link
                  href="/tools/"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-primary-container/20 border border-black/10 dark:border-white/10 text-xs font-heading font-bold text-on-surface hover:text-primary-container transition-all"
                >
                  <span>Launch Tool</span>
                  <Icon name="north_east" size={13} />
                </Link>
              </div>
            </div>

            {/* Project 3: AlainTapiru.com */}
            <div style={{ transitionDelay: '160ms' }} className="rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-black/10 dark:border-white/10 hover:border-primary-container/60 transition-[border-color,transform] duration-[var(--motion-normal)] ease-[var(--ease-organic)] group flex flex-col justify-between overflow-hidden shadow-lg hover:-translate-y-[3px] card-image-zoom motion-reveal">
              <div>
                <div className="relative w-full h-48 sm:h-52 bg-black/40 overflow-hidden">
                  <Image
                    src="/images/projects/alaintapiru-technical-seo-web-project-preview.webp"
                    alt="AlainTapiru.com technical SEO and web architecture project preview"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-medium bg-surface-1/90 text-primary-container border border-primary-container/30 backdrop-blur-md shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      Live Portfolio
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading text-xs text-primary-container uppercase tracking-wider font-semibold">
                      Technical SEO • Modern Web
                    </span>
                    <span className="text-[11px] font-sans text-on-surface/70">
                      Live Codebase
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                    AlainTapiru.com
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-primary-container/90 italic font-medium">
                    &ldquo;High-Performance Portfolio &amp; Technical Architecture.&rdquo;
                  </p>

                  <p className="font-sans text-sm text-on-surface/75 leading-relaxed line-clamp-3">
                    My personal portfolio built with a modern web stack, combining technical SEO, search-friendly architecture, performance considerations, and AI-assisted development workflows.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Next.js 15', 'Tailwind CSS', 'Payload CMS', 'SEO'].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-heading text-on-surface/80 uppercase tracking-wider font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-black/10 dark:border-white/10 mt-4 flex items-center justify-between gap-2">
                <Link
                  href="/projects/alaintapiru-portfolio/"
                  className="inline-flex items-center gap-1 font-heading text-xs uppercase tracking-wider font-bold text-on-surface hover:text-primary-container transition-colors py-1"
                >
                  <span>Project Details</span>
                  <Icon name="arrow_forward" size={14} />
                </Link>

                <a
                  href="https://github.com/alndvtpr/portfolio-cms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-primary-container/20 border border-black/10 dark:border-white/10 text-xs font-heading font-bold text-on-surface hover:text-primary-container transition-all"
                >
                  <span>Repository</span>
                  <Icon name="north_east" size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DEMONSTRATION AUDIT & PRACTICAL-WORK SECTION */}
      <GBPHomepageCallout />

      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 relative z-20">
        <PerformanceAuditProof compact={true} />
      </section>

      {/* 8. HONEST TRUST SYSTEM & SCOPE COMMITMENT */}
      <TrustCommitment />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 9. WHY WORK WITH ALAIN (ABOUT & BACKGROUND SNAPSHOT) */}
      <section className="py-16 sm:py-24 bg-transparent relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 flex flex-col lg:flex-row items-center gap-10 sm:gap-16">
          {/* Left: Modern Editorial Portrait Card */}
          <div className="w-full lg:w-1/2 motion-reveal">
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="absolute -inset-2 sm:-inset-3 rounded-[2.5rem] bg-gradient-to-br from-primary-container/25 via-primary/10 to-emerald-500/15 blur-2xl opacity-70 dark:opacity-40 -z-10 pointer-events-none" />

              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-surface-1 shadow-2xl group">
                <Image
                  src="/alain-dave-tapiru-professional-portrait.webp"
                  alt="Alain Dave Tapiru, SEO specialist and web developer"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top sm:object-[center_15%] transition-transform duration-700 ease-[var(--ease-organic)] group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-[#0a0c10]/90 dark:via-black/30 pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-1/90 dark:bg-surface-1/80 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg flex items-center justify-between gap-3">
                  <div>
                    <p className="font-heading text-[11px] sm:text-xs text-primary-container uppercase tracking-[0.08em] font-bold">
                      About Alain Dave Tapiru
                    </p>
                    <h3 className="font-heading text-xs sm:text-sm font-bold text-on-surface">
                      SEO Specialist &amp; Web Developer
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 motion-reveal">
            <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
              Why Work With Alain
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-on-surface leading-tight tracking-tight">
              Hands-On Technical Execution With Clear Communication
            </h2>
            <p className="font-sans text-on-surface/80 text-sm sm:text-base leading-relaxed max-w-prose">
              I bring a disciplined technical foundation grounded in BSIT Network &amp; Cybersecurity studies, intensive SOVA / Pinoy SEO Bootcamp training under Rene Leandro Padilla, and practical hands-on web development.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-black/10 dark:border-white/10">
              <div className="p-3.5 sm:p-4 rounded-xl bg-surface-1/90 backdrop-blur-md border border-black/10 dark:border-white/5 flex flex-col justify-between motion-reveal shadow-sm">
                <span className="font-heading text-base sm:text-lg font-bold text-primary-container block mb-1">
                  Hands-On Builder
                </span>
                <span className="font-sans text-xs sm:text-sm text-on-surface/75 leading-relaxed">
                  Direct code implementation in WordPress, Next.js, and Schema.
                </span>
              </div>
              <div style={{ transitionDelay: '80ms' }} className="p-3.5 sm:p-4 rounded-xl bg-surface-1/90 backdrop-blur-md border border-black/10 dark:border-white/5 flex flex-col justify-between motion-reveal shadow-sm">
                <span className="font-heading text-base sm:text-lg font-bold text-primary-container block mb-1">
                  Direct Contact
                </span>
                <span className="font-sans text-xs sm:text-sm text-on-surface/75 leading-relaxed">
                  Personal, responsive updates on every task milestone.
                </span>
              </div>
              <div style={{ transitionDelay: '160ms' }} className="p-3.5 sm:p-4 rounded-xl bg-surface-1/90 backdrop-blur-md border border-black/10 dark:border-white/5 flex flex-col justify-between motion-reveal shadow-sm">
                <span className="font-heading text-base sm:text-lg font-bold text-primary-container block mb-1">
                  No Fluff / Jargon
                </span>
                <span className="font-sans text-xs sm:text-sm text-on-surface/75 leading-relaxed">
                  Clear, honest scope definitions and verified test proofs.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about/"
                className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.06em] font-bold text-primary-container hover:underline"
              >
                Read Full Biography <Icon name="arrow_forward" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overflow Capacity Callout */}
      <OpenToOpportunities />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 9. TRANSPARENT PRICING SNAPSHOT */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
            Transparent Pricing
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-on-surface mb-3 tracking-tight">
            Clear, Predictable Packages
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface/75 leading-relaxed">
            Straightforward sprint and support pricing with clearly defined deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              title: 'SEO & AI Readiness Sprint',
              price: '$280 USD (₱15,500)',
              subPrice: 'Technical Audit & Strategy',
              desc: 'Full technical crawl diagnostics, JSON-LD schema implementation, search intent review, and prioritized 30-day action blueprint.',
              badge: 'Foundation Sprint',
              href: '/contact/?service=Technical%20SEO%20Audit',
              btnLabel: 'Book Sprint',
            },
            {
              title: 'WordPress High-Speed Site',
              price: '$480 USD (₱27,000)',
              subPrice: 'Popular for Small Business',
              desc: 'Custom responsive WordPress theme layout, built-in technical SEO, schema integration, Core Web Vitals speed tuning, and CMS hand-off.',
              badge: 'WordPress / CMS',
              href: '/contact/?service=React%20%26%20WordPress%20Web%20Development',
              btnLabel: 'Start WordPress Project',
            },
            {
              title: 'Custom Next.js & React Build',
              price: '$850 USD (₱48,000)',
              subPrice: 'Code-First Engineering',
              desc: 'Bespoke Next.js 15 App Router build, zero-CLS image pipelines, performance-focused Core Web Vitals, and scalable architecture.',
              badge: 'Code-First Web',
              href: '/contact/?service=React%20%26%20WordPress%20Web%20Development',
              btnLabel: 'Build Next.js Site',
            },
            {
              title: 'Ongoing Monthly SEO Support',
              price: '$450 USD / mo (₱25,000 / mo)',
              subPrice: '20–25 Hours / Month',
              desc: 'Ongoing technical and on-page optimization, Google Business Profile local search maintenance, regular review calls, and activity logs.',
              badge: 'Monthly Retainer',
              href: '/contact/?service=Ongoing%20Monthly%20SEO%20Support',
              btnLabel: 'Inquire for Retainer',
            },
          ].map((pkg, idx) => (
            <div
              key={pkg.title}
              style={{ transitionDelay: `${idx * 60}ms` }}
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/60 transition-all group flex flex-col justify-between shadow-sm hover:-translate-y-1 motion-reveal"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container">
                    {pkg.badge}
                  </span>
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-on-surface mb-2">{pkg.title}</h3>
                <div className="mb-3">
                  <span className="font-heading text-xl sm:text-2xl font-extrabold text-primary-container block">{pkg.price}</span>
                  <span className="text-xs font-sans text-on-surface/65 font-medium">{pkg.subPrice}</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface/75 leading-relaxed">{pkg.desc}</p>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 mt-4">
                <Link
                  href={pkg.href}
                  className="w-full inline-flex items-center justify-center gap-1.5 font-heading text-xs font-bold text-primary-container hover:text-primary transition-colors py-1.5 rounded-lg bg-primary-container/10 hover:bg-primary-container/20 border border-primary-container/30"
                >
                  <span>{pkg.btnLabel}</span>
                  <Icon name="arrow_forward" size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8 sm:pt-10 motion-reveal">
          <Link
            href="/services/#estimator"
            className="inline-flex items-center gap-2 font-heading text-xs sm:text-sm uppercase tracking-[0.06em] font-bold text-on-surface hover:text-primary-container transition-colors"
          >
            <span>Need a custom scope? Use the interactive scope estimator</span>
            <Icon name="arrow_forward" size={16} />
          </Link>
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <HomepageFAQ />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 11. FINAL CLOSING CTA */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto text-center relative z-20">
        <div className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-surface-1/90 border border-primary-container/30 shadow-[0_0_50px_rgba(224,123,32,0.1)] motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] mb-2 block font-semibold">
            Get Started
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-on-surface mb-4 sm:mb-6 tracking-tight">
            Need Practical SEO or Website Support?
          </h2>
          <p className="font-sans text-on-surface/80 max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed">
            Whether you need a clear SEO foundation for your small business or reliable overflow support for agency tickets, let&apos;s discuss your project scope.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <Link
              href="/contact/"
              data-agent-action="discuss-project"
              className="w-full sm:w-auto min-h-[48px] bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:bg-primary btn-motion flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              Discuss a Project <Icon name="arrow_forward" size={16} className="btn-icon" />
            </Link>
            <Link
              href="/tools/#website-audit"
              data-agent-action="request-website-health-check"
              className="w-full sm:w-auto min-h-[48px] bg-surface-1/90 hover:bg-surface-2 border border-black/15 dark:border-white/20 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-7 py-3.5 sm:py-4 rounded-full hover:border-primary-container/40 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <Icon name="find_in_page" size={16} className="text-primary-container" />
              Request a Website Health Check
            </Link>
          </div>
        </div>
      </section>

      {/* PAYLOAD CMS BLOCKS FALLBACK */}
      {page?.layout != null && page.layout.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 relative z-20 py-12">
          <RenderBlocks blocks={page.layout as { blockType: string; [key: string]: unknown }[]} />
        </section>
      )}
    </>
  )
}

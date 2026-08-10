// @ts-ignore: IDE cache bug with PNPM
import { getPayload } from 'payload'
import type { Page as PayloadPage } from '@/payload-types'
import config from '@payload-config'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RenderBlocks } from '@/components/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ScrollHero } from '@/components/ScrollHero'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Alain Dave Tapiru | SEO Specialist & Web Designer',
  description: 'BSIT Network & Cybersecurity student, Technical SEO Specialist, Web Designer, and AI Tech Enthusiast.',
  url: 'https://alaintapiru.com'
})

const TOOLS_STACK = [
  { name: 'Ahrefs', category: 'Keyword & Backlink Audit', icon: 'travel_explore' },
  { name: 'Google Search Console', category: 'Indexation & Analytics', icon: 'analytics' },
  { name: 'Screaming Frog', category: 'Technical Site Crawler', icon: 'bug_report' },
  { name: 'Next.js', category: 'Web App Framework', icon: 'code' },
  { name: 'WordPress', category: 'CMS Architecture', icon: 'newspaper' },
  { name: 'Cloudflare', category: 'Edge DNS & Security', icon: 'cloud_queue' },
]

const SEO_PROCESS_STEPS = [
  { step: '01', title: 'Website Audit', desc: 'Comprehensive technical crawl, canonical check, schema verification, and Core Web Vitals diagnostic.' },
  { step: '02', title: 'Keyword Research', desc: 'High-intent search volume discovery, keyword gap analysis, and content opportunity mapping.' },
  { step: '03', title: 'Competitive Analysis', desc: 'Deconstructing competitor backlink profiles, SERP position tracking, and market positioning.' },
  { step: '04', title: 'On-Page SEO', desc: 'Optimizing page titles, meta descriptions, internal link silos, image ALT data, and structured JSON-LD.' },
  { step: '05', title: 'Off-Page SEO', desc: 'Authority link acquisition, digital PR outreach, local citation building, and Google Business Profile management.' },
  { step: '06', title: 'Reporting & Analysis', desc: 'Transparent GA4 & Search Console data reporting, rank tracking metrics, and iterative strategy refinements.' },
]

const FEATURED_PROJECTS = [
  {
    slug: 'executive-optical-local-seo',
    title: 'Executive Optical Local SEO & Map Pack Ranking',
    metrics: '+340% Organic Traffic | #1 Map Pack',
    desc: 'Local search engine optimization campaign, geotargeted landing pages, and Google Business Profile optimization.',
    tag: 'Local SEO',
  },
  {
    slug: 'claimscale-ai-resume-portfolio',
    title: 'Claimscale.ai Technical Web Architecture',
    metrics: '99/100 Core Web Vitals | 0.4s LCP',
    desc: 'High-speed Next.js dynamic application with serverless edge caching, dynamic import code-splitting, and Schema.org injection.',
    tag: 'Web Engineering',
  },
]

const TESTIMONIALS = [
  {
    quote: "Alain's technical SEO audit revealed critical crawl budget bottlenecks we missed for months. Our organic search leads doubled within 60 days.",
    author: "Digital Director",
    company: "B2B Tech Agency",
  },
  {
    quote: "The Next.js website Alain built for us achieves a 99+ Lighthouse score and converts visitors seamlessly. Exceptional precision and speed.",
    author: "Founder & CEO",
    company: "E-Commerce Brand",
  },
]


export const dynamic = 'force-dynamic'

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
  } catch (err) {
    console.error('Payload DB check:', err)
  }

  return (
    <>
      <LivePreviewListener />
      
      {/* 1. HERO SECTION */}
      <section id="home" className="relative">
        <ScrollHero />
      </section>

{/* ── 2. Tools I Use Grid ── */}
      <section className="bg-surface-container-low border-y border-white/5 py-12 sm:py-16 px-4 sm:px-6 md:px-margin-desktop relative z-10">
        <div className="max-w-7xl mx-auto">
          <p className="font-label-sm text-xs uppercase tracking-widest text-primary-container text-center mb-6 sm:mb-8 font-semibold">
            Industry Standard Tools & Stack
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
            {TOOLS_STACK.map((tool, idx) => (
              <div
                key={idx}
                className="glass-panel p-3.5 sm:p-5 rounded-xl border border-white/5 hover:border-primary-container/40 transition-all text-center flex flex-col items-center justify-center gap-1.5 sm:gap-2 group"
              >
                <span className="material-symbols-outlined text-primary-container text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                  {tool.icon}
                </span>
                <span className="font-headline-md text-xs sm:text-sm font-bold text-on-surface leading-tight">{tool.name}</span>
                <span className="font-label-sm text-[10px] text-on-surface/80">{tool.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. About Me Snapshot & Metric Counters ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-margin-desktop bg-surface relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest">
              About Alain Dave Tapiru
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-on-surface font-bold leading-tight">
              Merging Search Engine Precision with High-Speed Web Development
            </h2>
            <p className="font-body-lg text-on-surface-variant text-xs sm:text-base leading-relaxed">
              With a background spanning frontline customer relations, executive virtual assistance, and BSIT Network & Cybersecurity studies, I build search strategies and digital platforms that rank #1 and drive measurable ROI.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary-container font-label-sm text-xs uppercase tracking-widest hover:text-primary transition-colors text-decoration-none"
              >
                Read Full Biography <span className="text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Metric Counters */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="glass-panel p-4 sm:p-6 rounded-xl border border-white/10 text-center">
              <span className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-container block mb-1 sm:mb-2">
                5+
              </span>
              <span className="font-label-sm text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-wider block">
                Years Experience
              </span>
            </div>
            <div className="glass-panel p-4 sm:p-6 rounded-xl border border-white/10 text-center">
              <span className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-container block mb-1 sm:mb-2">
                150+
              </span>
              <span className="font-label-sm text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-wider block">
                Websites Optimized
              </span>
            </div>
            <div className="glass-panel p-4 sm:p-6 rounded-xl border border-white/10 text-center">
              <span className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-container block mb-1 sm:mb-2">
                99/100
              </span>
              <span className="font-label-sm text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-wider block">
                PageSpeed Score
              </span>
            </div>
            <div className="glass-panel p-4 sm:p-6 rounded-xl border border-white/10 text-center">
              <span className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-container block mb-1 sm:mb-2">
                100%
              </span>
              <span className="font-label-sm text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-wider block">
                Client Satisfaction
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. The 6-Step SEO Process Cycle ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-margin-desktop bg-surface-container-lowest border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20">
              Methodology
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-on-surface font-bold mt-4 mb-3 sm:mb-4">
              The 6-Step SEO Growth Cycle
            </h2>
            <p className="font-body-lg text-on-surface-variant text-xs sm:text-base">
              A systematic, data-backed execution framework for long-term search engine dominance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {SEO_PROCESS_STEPS.map((proc, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 sm:p-8 rounded-xl border border-white/5 hover:border-primary-container/50 transition-all duration-300 relative group"
              >
                <span className="font-display-lg text-2xl sm:text-3xl font-extrabold text-primary-container/30 group-hover:text-primary-container transition-colors block mb-3 sm:mb-4">
                  {proc.step}
                </span>
                <h3 className="font-headline-md text-lg sm:text-xl text-on-surface font-bold mb-2 sm:mb-3">
                  {proc.title}
                </h3>
                <p className="font-body-md text-secondary-fixed-dim text-xs sm:text-sm leading-relaxed">
                  {proc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Featured Projects ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-margin-desktop bg-surface relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest mb-2 block">
                Selected Work
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-on-surface font-bold">
                Featured Case Studies
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-primary-container font-label-sm text-xs uppercase tracking-widest hover:text-primary transition-colors text-decoration-none"
            >
              View All Projects <span className="text-base">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {FEATURED_PROJECTS.map((prj, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 sm:p-8 rounded-xl border border-white/10 hover:border-primary-container/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest px-3 py-1 bg-primary-container/10 rounded-full border border-primary-container/20">
                      {prj.tag}
                    </span>
                    <span className="font-label-sm text-[11px] sm:text-xs text-on-surface-variant font-semibold">
                      {prj.metrics}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-lg sm:text-xl text-on-surface font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {prj.title}
                  </h3>
                  <p className="font-body-md text-secondary-fixed-dim text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                    {prj.desc}
                  </p>
                </div>

                <Link
                  href={`/projects/${prj.slug}`}
                  className="inline-flex items-center gap-2 font-label-sm text-xs text-primary-container uppercase tracking-widest hover:text-primary transition-colors text-decoration-none pt-4 border-t border-white/5"
                >
                  Explore Campaign Blueprint <span className="text-base">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Client Testimonials ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-margin-desktop bg-surface-container-lowest border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest">
              Endorsements
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-on-surface font-bold mt-4">
              What Clients &amp; Partners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="glass-panel p-5 sm:p-8 rounded-xl border border-white/10 relative">
                <span className="font-display-lg text-4xl sm:text-5xl text-primary-container/30 font-serif leading-none block mb-3 sm:mb-4">
                  “
                </span>
                <p className="font-body-lg text-on-surface-variant text-xs sm:text-base leading-relaxed italic mb-4 sm:mb-6">
                  {t.quote}
                </p>
                <div>
                  <h4 className="font-headline-md text-xs sm:text-sm font-bold text-on-surface">{t.author}</h4>
                  <span className="font-label-sm text-[11px] sm:text-xs text-secondary-fixed-dim">{t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Call to Action Banner ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-margin-desktop bg-surface relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center glass-panel p-6 sm:p-8 md:p-12 rounded-2xl border border-primary-container/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-glow-amber pointer-events-none -z-10" />
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-on-surface font-extrabold mb-4">
            Ready to Dominate Search Rankings &amp; Scale Your Web Infrastructure?
          </h2>
          <p className="font-body-lg text-on-surface-variant text-xs sm:text-base max-w-xl mx-auto mb-6 sm:mb-8">
            Book a technical SEO audit or discuss your next web application project with Alain Dave Tapiru today.
          </p>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#e67e22] hover:bg-[#ff9436] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 sm:px-10 sm:py-5 rounded-full shadow-[0_0_25px_rgba(230,126,34,0.5)] hover:shadow-[0_0_35px_rgba(230,126,34,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 text-decoration-none min-h-[48px]"
          >
            HIRE AN SEO NOW <span className="text-base">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}

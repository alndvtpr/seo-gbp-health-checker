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

      {/* 2. TOOLS I USE GRID */}
      <section className="bg-surface-container-low border-y border-white/5 py-16 px-6 md:px-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <p className="font-label-sm text-xs uppercase tracking-widest text-primary-container text-center mb-8 font-semibold">
            Industry Standard Tools &amp; Stack
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Ahrefs', category: 'Keyword & Backlink Audit', icon: 'travel_explore' },
              { name: 'Google Search Console', category: 'Indexation & Analytics', icon: 'analytics' },
              { name: 'Screaming Frog', category: 'Technical Site Crawler', icon: 'bug_report' },
              { name: 'Next.js', category: 'Web App Framework', icon: 'code' },
              { name: 'WordPress', category: 'CMS Architecture', icon: 'newspaper' },
              { name: 'Cloudflare', category: 'Edge DNS & Security', icon: 'cloud_queue' },
            ].map((tool, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 rounded-xl border border-white/5 hover:border-primary-container/40 transition-all text-center flex flex-col items-center justify-center gap-2 group"
              >
                <span className="material-symbols-outlined text-primary-container text-3xl group-hover:scale-110 transition-transform">
                  {tool.icon}
                </span>
                <span className="font-headline-md text-sm font-bold text-on-surface">{tool.name}</span>
                <span className="font-label-sm text-[10px] text-on-surface-variant/70">{tool.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT ME SNAPSHOT & METRIC COUNTERS */}
      <section className="py-20 px-6 md:px-16 bg-surface relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="w-full lg:w-1/2 space-y-6">
            <span className="font-heading text-xs text-primary-container uppercase tracking-widest block font-bold">
              Background &amp; Expertise
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-on-surface leading-tight">
              Ranking Websites &amp; Building Robust Web Infrastructure.
            </h2>
            <p className="font-sans text-on-surface/80 text-sm leading-relaxed">
              Combining technical SEO, modern web development, and cybersecurity principles to deliver end-to-end digital growth for brands and agencies.
            </p>

            {/* Metrics Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="font-heading text-3xl font-extrabold text-primary-container block">3+</span>
                <span className="font-sans text-xs text-on-surface/70">Years Experience</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="font-heading text-3xl font-extrabold text-primary-container block">50+</span>
                <span className="font-sans text-xs text-on-surface/70">Websites Optimized</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 col-span-2 sm:col-span-1">
                <span className="font-heading text-3xl font-extrabold text-primary-container block">99%</span>
                <span className="font-sans text-xs text-on-surface/70">Client Satisfaction</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-widest font-bold text-primary-container hover:underline"
              >
                Read Full Biography <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

            <div className="lg:col-span-7 space-y-6">
            <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest">
              About Alain Dave Tapiru
            </span>
            <h2 className="font-headline-lg text-3xl md:text-5xl text-on-surface font-bold">
              Merging Search Engine Precision with High-Speed Web Development
            </h2>
            <p className="font-body-lg text-on-surface-variant text-base leading-relaxed">
              With a background spanning frontline customer relations, executive virtual assistance, and BSIT Network &amp; Cybersecurity studies, I build search strategies and digital platforms that rank #1 and drive measurable ROI.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary-container font-label-sm text-xs uppercase tracking-widest hover:text-primary transition-colors"
              >
                Read Full Biography <span className="text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Metric Counters */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-xl border border-white/10 text-center">
              <span className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary-container block mb-2">5+</span>
              <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Years Experience</span>
            </div>
            <div className="glass-panel p-6 rounded-xl border border-white/10 text-center">
              <span className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary-container block mb-2">150+</span>
              <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Websites Optimized</span>
            </div>
            <div className="glass-panel p-6 rounded-xl border border-white/10 text-center">
              <span className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary-container block mb-2">99/100</span>
              <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">PageSpeed Score</span>
            </div>
            <div className="glass-panel p-6 rounded-xl border border-white/10 text-center">
              <span className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary-container block mb-2">100%</span>
              <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider block">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE SEO PROCESS CYCLE (6-STEP GRID) */
      <section className="py-20 px-6 md:px-16 bg-surface-container-lowest border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20">
              Methodology
            </span>
            <h2 className="font-headline-lg text-3xl md:text-5xl text-on-surface font-bold mt-4 mb-4">
              The 6-Step SEO Growth Cycle
            </h2>
            <p className="font-body-lg text-on-surface-variant text-base">
              A systematic, data-backed execution framework for long-term search engine dominance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Website Audit', desc: 'Comprehensive technical crawl, canonical check, schema verification, and Core Web Vitals diagnostic.' },
              { step: '02', title: 'Keyword Research', desc: 'High-intent search volume discovery, keyword gap analysis, and content opportunity mapping.' },
              { step: '03', title: 'Competitive Analysis', desc: 'Deconstructing competitor backlink profiles, SERP position tracking, and market positioning.' },
              { step: '04', title: 'On-Page SEO', desc: 'Optimizing page titles, meta descriptions, internal link silos, image ALT data, and structured JSON-LD.' },
              { step: '05', title: 'Off-Page SEO', desc: 'Authority link acquisition, digital PR outreach, local citation building, and Google Business Profile management.' },
              { step: '06', title: 'Reporting & Analysis', desc: 'Transparent GA4 & Search Console data reporting, rank tracking metrics, and iterative strategy refinements.' },
            ].map((proc, idx) => (
              <div
                key={idx}
                className="glass-panel p-8 rounded-xl border border-white/5 hover:border-primary-container/50 transition-all duration-300 relative group"
              >
                <span className="font-display-lg text-3xl font-extrabold text-primary-container/30 group-hover:text-primary-container transition-colors block mb-4">
                  {proc.step}
                </span>
                <h3 className="font-headline-md text-xl text-on-surface font-bold mb-3">{proc.title}</h3>
                <p className="font-body-md text-secondary-fixed-dim text-sm leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="py-20 px-6 md:px-16 bg-surface relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest mb-2 block">
                Selected Work
              </span>
              <h2 className="font-headline-lg text-3xl md:text-5xl text-on-surface font-bold">
                Featured Case Studies
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-primary-container font-label-sm text-xs uppercase tracking-widest hover:text-primary transition-colors"
            >
              View All Projects <span className="text-base">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
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
            ].map((prj, idx) => (
              <div
                key={idx}
                className="glass-panel p-8 rounded-xl border border-white/10 hover:border-primary-container/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest px-3 py-1 bg-primary-container/10 rounded-full border border-primary-container/20">
                      {prj.tag}
                    </span>
                    <span className="font-label-sm text-xs text-on-surface-variant font-semibold">
                      {prj.metrics}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-xl text-on-surface font-bold mb-3 group-hover:text-primary transition-colors">
                    {prj.title}
                  </h3>
                  <p className="font-body-md text-secondary-fixed-dim text-sm leading-relaxed mb-6">
                    {prj.desc}
                  </p>
                </div>
                <Link
                  href={`/projects/${prj.slug}`}
                  className="inline-flex items-center gap-2 font-label-sm text-xs text-primary-container uppercase tracking-widest hover:text-primary transition-colors pt-4 border-t border-white/5"
                >
                  Explore Campaign Blueprint <span className="text-base">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIALS */}
      <section className="py-20 px-6 md:px-16 bg-surface-container-lowest border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest">
              Endorsements
            </span>
            <h2 className="font-headline-lg text-3xl md:text-5xl text-on-surface font-bold mt-4">
              What Clients &amp; Partners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "Alain's technical SEO audit revealed critical crawl budget bottlenecks we missed for months. Our organic search leads doubled within 60 days.",
                author: 'Digital Director',
                company: 'B2B Tech Agency',
              },
              {
                quote: "The Next.js website Alain built for us achieves a 99+ Lighthouse score and converts visitors seamlessly. Exceptional precision and speed.",
                author: 'Founder & CEO',
                company: 'E-Commerce Brand',
              },
            ].map((t, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-xl border border-white/10 relative">
                <span className="font-display-lg text-5xl text-primary-container/30 font-serif leading-none block mb-4">
                  &#8220;
                </span>
                <p className="font-body-lg text-on-surface-variant text-base leading-relaxed italic mb-6">
                  {t.quote}
                </p>
                <div>
                  <h4 className="font-headline-md text-sm font-bold text-on-surface">{t.author}</h4>
                  <span className="font-label-sm text-xs text-secondary-fixed-dim">{t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="py-20 px-6 md:px-16 bg-surface relative z-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center glass-panel p-12 rounded-2xl border border-primary-container/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-glow-amber pointer-events-none -z-10" />
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface font-extrabold mb-4">
            Ready to Dominate Search Rankings &amp; Scale Your Web Infrastructure?
          </h2>
          <p className="font-body-lg text-on-surface-variant text-base max-w-xl mx-auto mb-8">
            Book a technical SEO audit or discuss your next web application project with Alain Dave Tapiru today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#e67e22] hover:bg-[#ff9436] text-white font-bold text-xs uppercase tracking-wider px-10 py-5 rounded-full shadow-[0_0_25px_rgba(230,126,34,0.5)] hover:shadow-[0_0_35px_rgba(230,126,34,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
          >
            HIRE AN SEO NOW <span className="text-base">→</span>
          </Link>
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

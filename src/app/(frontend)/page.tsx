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
      <section className="py-16 bg-transparent border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
            Technical Stack
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-on-surface mb-8">
            Tools &amp; Technologies I Master
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: 'Ahrefs', cat: 'SEO & Audit', icon: 'search' },
              { name: 'Cloudflare', cat: 'CDN & Security', icon: 'shield' },
              { name: 'Next.js', cat: 'Web Framework', icon: 'code' },
              { name: 'WordPress', cat: 'CMS Platform', icon: 'language' },
              { name: 'Yoast / RankMath', cat: 'On-Page SEO', icon: 'tune' },
              { name: 'Google Analytics', cat: 'Data Analytics', icon: 'analytics' },
            ].map((tool) => (
              <div
                key={tool.name}
                className="p-5 rounded-2xl bg-[#181a1b]/60 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group flex flex-col items-center justify-center text-center"
              >
                <span className="material-symbols-outlined text-3xl text-primary-container mb-2 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </span>
                <h3 className="font-heading text-sm font-bold text-on-surface">{tool.name}</h3>
                <p className="font-sans text-[10px] text-on-surface/50 mt-1">{tool.cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT ME SNAPSHOT WITH METRIC COUNTERS */}
      <section className="py-24 bg-transparent border-b border-white/5 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative min-h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/about_me.jpg"
              alt="Alain Dave Tapiru Portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#121414]/90 border border-white/10">
              <p className="font-heading text-xs text-primary-container uppercase tracking-widest mb-1 font-bold">
                About Alain Dave Tapiru
              </p>
              <h3 className="font-heading text-base font-bold text-on-surface">
                Data-Driven SEO Specialist &amp; Technical Web Designer
              </h3>
            </div>
          </div>

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

            {/* Honest Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <span className="font-heading text-base sm:text-lg font-bold text-primary-container block mb-1">
                  4 Core Disciplines
                </span>
                <span className="font-sans text-xs text-on-surface/70 leading-relaxed">
                  SEO, Web Dev, Support &amp; Bookkeeping
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <span className="font-heading text-base sm:text-lg font-bold text-primary-container block mb-1">
                  AI-Powered Workflows
                </span>
                <span className="font-sans text-xs text-on-surface/70 leading-relaxed">
                  Leveraging modern tools for faster, smarter builds.
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <span className="font-heading text-base sm:text-lg font-bold text-primary-container block mb-1">
                  24hr Response Time
                </span>
                <span className="font-sans text-xs text-on-surface/70 leading-relaxed">
                  Dedicated, fast communication.
                </span>
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

      {/* 4. THE SEO PROCESS CYCLE (6-STEP GRID) */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-16 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
            Methodology
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-on-surface mb-4">
            The 6-Step SEO Process
          </h2>
          <p className="font-sans text-sm text-on-surface/70">
            A systematic engineering approach to search engine ranking and organic traffic expansion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Website Audit',
              desc: 'Comprehensive technical review analyzing site health, speed, indexing, crawlability, and schema implementation.',
              icon: 'find_in_page',
            },
            {
              step: '02',
              title: 'Keyword Research',
              desc: 'High-intent search query discovery tailored to target buyer personas and search volume dynamics.',
              icon: 'key',
            },
            {
              step: '03',
              title: 'Competitive Analysis',
              desc: 'Deconstructing top-ranking competitor strategies, backlink profiles, and content gaps.',
              icon: 'equalizer',
            },
            {
              step: '04',
              title: 'On-Page SEO',
              desc: 'Optimizing titles, headers, internal linking structure, metadata, and core web vitals.',
              icon: 'edit_note',
            },
            {
              step: '05',
              title: 'Off-Page SEO',
              desc: 'Authoritative backlink acquisition, brand mention building, and local citations.',
              icon: 'hub',
            },
            {
              step: '06',
              title: 'Reporting & Data Analysis',
              desc: 'Monthly transparent rank tracking, conversion metrics, and continuous performance tuning.',
              icon: 'monitoring',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-8 rounded-2xl bg-[#181a1b]/70 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group hover:-translate-y-1 relative"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="material-symbols-outlined text-4xl text-primary-container group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-heading text-2xl font-black text-white/10 group-hover:text-primary-container/30 transition-colors">
                  {item.step}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-on-surface mb-3">{item.title}</h3>
              <p className="font-sans text-sm text-on-surface/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="py-24 bg-transparent border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
                Portfolio Showcase
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-on-surface">
                Featured SEO &amp; Web Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="font-heading text-xs uppercase tracking-widest font-bold text-primary-container hover:underline flex items-center gap-1"
            >
              View All Case Studies <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Executive Optical Local SEO',
                cat: 'Local Search Optimization',
                desc: 'Scaled organic search visibility across 100+ retail locations nationwide.',
                slug: 'executive-optical-local-seo',
              },
              {
                title: 'Claimscale.ai Resume Portfolio',
                cat: 'AI Web Design & Tech SEO',
                desc: 'Custom high-performance web architecture built with film-noir aesthetics and AI features.',
                slug: 'claimscale-ai-portfolio',
              },
            ].map((proj) => (
              <div
                key={proj.slug}
                className="p-8 rounded-2xl bg-[#181a1b]/60 border border-white/5 hover:border-primary-container/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="font-heading text-xs text-primary-container uppercase tracking-wider block mb-2">
                    {proj.cat}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-on-surface mb-3">{proj.title}</h3>
                  <p className="font-sans text-sm text-on-surface/70 leading-relaxed mb-6">{proj.desc}</p>
                </div>
                <Link
                  href={`/projects/${proj.slug}`}
                  className="inline-flex items-center gap-2 font-heading text-xs uppercase font-bold text-on-surface group-hover:text-primary-container transition-colors"
                >
                  Explore Case Study <span className="material-symbols-outlined text-sm">north_east</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-16 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
            Client Feedback
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-on-surface mb-4">
            What Clients &amp; Partners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: "[PLACEHOLDER - EDIT LATER] Alain's technical SEO insight transformed our organic reach. His systematic approach to site audits and Keyword strategy brought us to page one.",
              author: '[PLACEHOLDER - Client Name]',
              title: '[PLACEHOLDER - Business Title]',
            },
            {
              quote: "[PLACEHOLDER - EDIT LATER] Working with Alain on web design and optimization was effortless. He delivers high-end aesthetics backed by fast, clean code.",
              author: '[PLACEHOLDER - Partner Name]',
              title: '[PLACEHOLDER - Agency Director]',
            },
          ].map((test, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-[#181a1b]/70 border border-white/5 relative">
              <span className="material-symbols-outlined text-4xl text-primary-container/30 mb-4 block">
                format_quote
              </span>
              <p className="font-sans text-sm text-on-surface/80 italic leading-relaxed mb-6">
                &ldquo;{test.quote}&rdquo;
              </p>
              <div>
                <h4 className="font-heading text-sm font-bold text-on-surface">{test.author}</h4>
                <p className="font-sans text-xs text-on-surface/50">{test.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section id="contact" className="py-24 px-6 md:px-16 max-w-5xl mx-auto text-center relative z-20">
        <div className="p-12 rounded-3xl bg-[#181a1b]/40 border border-primary-container/30 shadow-[0_0_50px_rgba(230,126,34,0.1)]">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest mb-2 block font-bold">
            Get Started
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-on-surface mb-6">
            Ready to Elevate Your Search Rankings?
          </h2>
          <p className="font-sans text-on-surface/70 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
            Whether you need a full technical SEO audit, a custom Next.js web application, or ongoing optimization, let&apos;s talk strategy.
          </p>

          <div className="inline-flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_0_30px_rgba(230,126,34,0.5)] hover:bg-primary hover:scale-105 transition-all flex items-center gap-2"
            >
              Book A Consultation <span className="material-symbols-outlined text-sm">calendar_month</span>
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

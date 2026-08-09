// @ts-ignore: IDE cache bug with PNPM
import { getPayload } from 'payload'
import type { Page as PayloadPage } from '@/payload-types'
import config from '@payload-config'
import React from 'react'
import Image from 'next/image'
import { RenderBlocks } from '@/components/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ScrollHero } from '@/components/ScrollHero'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Alain Dave Tapiru | SEO Specialist & Virtual Assistant',
  description: 'BSIT Network & Cybersecurity student, SEO Specialist, Virtual Assistant, and AI Tech Enthusiast.',
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
      
      {/* 1. HERO SECTION WITH SCROLL SCRUBBING */}
      <section id="home" className="relative">
        <ScrollHero />
      </section>

      {/* 2. CORE COMPETENCIES (BENTO GRID) */}
      <section id="services" className="px-6 md:px-16 py-24 max-w-7xl mx-auto relative z-20">
        <div className="mb-16">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
            What I Bring To The Table
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-on-surface mb-4">
            Core Competencies
          </h2>
          <div className="w-24 h-1 bg-primary-container rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Customer Service */}
          <div className="p-8 rounded-2xl bg-[#181a1b]/70 border border-white/5 hover:border-primary-container/40 transition-all duration-300 backdrop-blur-xl group hover:-translate-y-1">
            <span className="material-symbols-outlined text-4xl text-primary-container mb-6 block group-hover:scale-110 transition-transform">
              support_agent
            </span>
            <h3 className="font-heading text-xl font-bold text-on-surface mb-3">
              Customer Service
            </h3>
            <p className="font-sans text-sm text-on-surface/70 leading-relaxed">
              Delivering premium, white-glove support experiences tailored to high-end client expectations.
            </p>
          </div>

          {/* Card 2: SEO Strategy */}
          <div className="p-8 rounded-2xl bg-[#181a1b]/70 border border-white/5 hover:border-primary-container/40 transition-all duration-300 backdrop-blur-xl group hover:-translate-y-1">
            <span className="material-symbols-outlined text-4xl text-primary-container mb-6 block group-hover:scale-110 transition-transform">
              query_stats
            </span>
            <h3 className="font-heading text-xl font-bold text-on-surface mb-3">
              SEO Strategy
            </h3>
            <p className="font-sans text-sm text-on-surface/70 leading-relaxed">
              Data-driven optimization engineering to dominate search presence and drive targeted organic acquisition.
            </p>
          </div>

          {/* Card 3: AI Web Design */}
          <div className="p-8 rounded-2xl bg-[#181a1b]/70 border border-white/5 hover:border-primary-container/40 transition-all duration-300 backdrop-blur-xl group hover:-translate-y-1 lg:col-span-2 relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl text-primary-container mb-6 block group-hover:scale-110 transition-transform">
                web
              </span>
              <h3 className="font-heading text-xl font-bold text-on-surface mb-3">
                AI Web Design &amp; Integration
              </h3>
              <p className="font-sans text-sm text-on-surface/70 leading-relaxed max-w-md">
                Leveraging cutting-edge generative tools to craft immersive, high-performance digital environments with film-noir aesthetics.
              </p>
            </div>
          </div>

          {/* Card 4: Virtual Assistance */}
          <div className="p-8 rounded-2xl bg-[#181a1b]/70 border border-white/5 hover:border-primary-container/40 transition-all duration-300 backdrop-blur-xl group hover:-translate-y-1 lg:col-span-2 relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl text-primary-container mb-6 block group-hover:scale-110 transition-transform">
                admin_panel_settings
              </span>
              <h3 className="font-heading text-xl font-bold text-on-surface mb-3">
                Virtual Assistance
              </h3>
              <p className="font-sans text-sm text-on-surface/70 leading-relaxed max-w-md">
                Secure, adaptable, and proactive administrative operations management for fast-paced tech environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT ME & THE JOURNEY */}
      <section id="about" className="py-24 bg-[#141617]/80 border-y border-white/5 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center gap-16">
          {/* Portrait Image */}
          <div className="w-full lg:w-1/2 relative min-h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/about_me.jpg"
              alt="Alain Dave Tapiru Portrait"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#121414]/80 backdrop-blur-xl border border-white/10">
              <p className="font-heading text-xs text-primary-container uppercase tracking-widest mb-1 font-bold">
                The Journey
              </p>
              <h3 className="font-heading text-lg font-bold text-on-surface">
                Crafting digital experiences through adaptation.
              </h3>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="w-full lg:w-1/2">
            <span className="font-heading text-xs text-primary-container uppercase tracking-widest mb-2 block font-bold">
              About Alain
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-on-surface mb-6 leading-tight">
              From Support to Systems <br />
              <span className="text-primary-container">An Evolution.</span>
            </h2>

            <div className="space-y-4 font-sans text-on-surface/80 text-base leading-relaxed">
              <p>
                My professional journey began on the front lines of customer experience as a Customer Service Representative. It was there I learned the invaluable skill of empathy and rapid problem-solving.
              </p>
              
              <blockquote className="p-5 border-l-4 border-primary-container bg-white/5 rounded-r-xl font-heading text-sm text-on-surface italic my-6">
                &ldquo;Adaptability isn&apos;t just about survival; it&apos;s about finding the optimal path forward when the terrain changes.&rdquo;
              </blockquote>

              <p>
                Moving into Search Engine Optimization (SEO) and serving as a Virtual Assistant (VA), I developed a strategic mindset—learning to analyze data, optimize workflows, and anticipate client needs before they arise.
              </p>
              <p>
                Today, I am channeling that drive into my studies as a <strong>BSIT student</strong>, specializing in <strong>Network &amp; Cybersecurity</strong>. Parallel to my formal education, I am deeply immersed in AI expertise, exploring how artificial intelligence automates complex workflows and defends digital assets.
              </p>
            </div>

            {/* Core Competencies Tech Stack Chips */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="font-heading text-xs text-on-surface/50 uppercase tracking-widest mb-3">
                Technical Focus Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Cybersecurity',
                  'Network Architecture',
                  'AI Integration',
                  'SEO Strategy',
                  'Systems Analysis',
                  'Virtual Assistance'
                ].map((chip) => (
                  <span
                    key={chip}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-heading font-medium text-on-surface uppercase tracking-wider"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INDUSTRIES SUPPORTED */}
      <section id="industries" className="py-16 bg-[#101212] border-b border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
          <p className="font-heading text-xs text-on-surface/50 uppercase tracking-widest mb-8 font-semibold">
            Industries I&apos;ve Supported
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            {[
              { icon: 'storefront', label: 'E-Commerce' },
              { icon: 'memory', label: 'Technology' },
              { icon: 'real_estate_agent', label: 'Real Estate' },
              { icon: 'monetization_on', label: 'Finance' },
            ].map((ind) => (
              <div key={ind.label} className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/5">
                <span className="material-symbols-outlined text-2xl text-primary-container">{ind.icon}</span>
                <span className="font-heading text-sm font-semibold text-on-surface">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT / HIRE ME SECTION */}
      <section id="contact" className="py-24 px-6 md:px-16 max-w-5xl mx-auto text-center relative z-20">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest mb-2 block font-bold">
          Get In Touch
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-on-surface mb-6">
          Ready to Elevate Your Digital Operations?
        </h2>
        <p className="font-sans text-on-surface/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Whether you need high-impact SEO strategy, virtual assistance, or AI workflow integration, let&apos;s discuss how we can work together.
        </p>

        <div className="inline-flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:alaindavetapiru@gmail.com"
            className="bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_0_30px_rgba(230,126,34,0.5)] hover:bg-primary hover:scale-105 transition-all flex items-center gap-2"
          >
            Send An Email <span className="material-symbols-outlined text-sm">mail</span>
          </a>
          <a
            href="#home"
            className="border border-white/20 text-on-surface font-heading text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
          >
            Back to Top
          </a>
        </div>
      </section>

      {/* 6. PAYLOAD CMS BLOCKS FALLBACK (IF BLOCKS ARE ADDED LATER IN ADMIN) */}
      {page?.layout != null && page.layout.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 relative z-20 py-12">
          <RenderBlocks blocks={page.layout as { blockType: string; [key: string]: unknown }[]} />
        </section>
      )}
    </>
  )
}

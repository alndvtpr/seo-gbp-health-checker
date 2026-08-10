import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Services & Consulting | Alain Dave Tapiru',
  description: 'Technical SEO Audits, AI Web Design, Local Search Strategy, and Custom Web Applications.',
  url: 'https://alaintapiru.com/services',
})

const services = [
  {
    title: 'Technical SEO Audits & Optimization',
    desc: 'Deep diagnostic analysis resolving indexing issues, crawl errors, schema markup deficiencies, and Core Web Vitals performance bottlenecks.',
    icon: 'search_check',
    features: ['Custom Schema JSON-LD', 'PageSpeed & LCP Optimization', 'Crawl Budget Tuning', 'Canonical & Redirect Mapping'],
  },
  {
    title: 'AI Web Design & Next.js Development',
    desc: 'Building ultra-fast, film-noir styled websites using Next.js 16, Payload CMS, and custom WebGL shaders designed to convert organic traffic.',
    icon: 'code_blocks',
    features: ['Payload CMS Integration', 'Responsive Glassmorphic UI', 'Edge Network Deployment', 'Semantic SEO Architecture'],
  },
  {
    title: 'Local SEO & Multi-Location Strategy',
    desc: 'Dominating Google Local Map Packs and location-based organic search queries for businesses expanding across multiple branches.',
    icon: 'location_on',
    features: ['Google Business Profile Setup', 'Local Citation Building', 'Geo-Targeted Content Creation', 'Review Strategy & Monitoring'],
  },
  {
    title: 'Virtual Assistance & Workflow Automation',
    desc: 'Proactive digital operations management, AI prompt engineering, and custom automation flows for fast-moving businesses.',
    icon: 'smart_toy',
    features: ['AI Content Pipelines', 'Database & Operations Support', 'Security Protocol Execution', 'Custom Workflow Scripting'],
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
          High-Impact Solutions
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6">
          SEO &amp; Engineering Services
        </h1>
        <p className="font-sans text-on-surface/70 text-xs sm:text-base leading-relaxed">
          Tailored packages for brands seeking top Google rankings, fast web architecture, and automated operations.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {services.map((s) => (
          <div
            key={s.title}
            className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#181a1b]/80 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary-container group-hover:scale-110 transition-transform">
                  {s.icon}
                </span>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface mb-2 sm:mb-3">{s.title}</h2>
              <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed mb-6 sm:mb-8">{s.desc}</p>

              <div className="space-y-2.5 pt-4 border-t border-white/10 mb-6 sm:mb-8">
                <span className="font-heading text-xs text-primary-container uppercase tracking-widest block font-semibold">
                  Key Deliverables:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-xs text-on-surface/80">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-container text-base shrink-0">check_circle</span>
                      <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full py-3.5 rounded-xl bg-white/5 hover:bg-primary-container hover:text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest text-on-surface transition-all min-h-[44px]"
            >
              Inquire About This Service
            </Link>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-container/20 via-[#181a1b] to-[#181a1b] border border-primary-container/30 text-center space-y-4 sm:space-y-6">
        <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-on-surface">Need a Custom Strategy?</h2>
        <p className="font-sans text-xs sm:text-sm text-on-surface/70 max-w-xl mx-auto leading-relaxed">
          Every site has unique requirements. Let&apos;s assemble a bespoke audit and execution plan tailored to your business goals.
        </p>
        <Link
          href="/contact"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_30px_rgba(230,126,34,0.5)] hover:scale-105 transition-all min-h-[48px]"
        >
          Schedule A Discovery Call <span className="material-symbols-outlined text-sm">call</span>
        </Link>
      </div>
    </div>
  )
}

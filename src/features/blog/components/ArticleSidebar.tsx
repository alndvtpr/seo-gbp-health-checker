import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { TableOfContents } from '@/components/TableOfContents'

export interface ArticleSidebarProps {
  tocItems: { id: string; title: string }[]
  slug: string
}

export function ArticleSidebar({ tocItems, slug }: ArticleSidebarProps) {
  const relService = slug.includes('pagespeed') || slug.includes('nextjs')
    ? {
        title: 'Technical SEO & Core Web Vitals',
        desc: 'Reserved layout space, dated lab evidence, and clean crawlability.',
        href: '/services/technical-seo/',
        badge: 'Technical SEO',
      }
    : slug.includes('local-seo') || slug.includes('google-maps')
    ? {
        title: 'Local SEO & GBP Calibration',
        desc: '10-point signal diagnostics, category alignment, and local landing pages.',
        href: '/services/local-seo/',
        badge: 'Local SEO',
      }
    : slug.includes('schema') || slug.includes('is-seo-dead')
    ? {
        title: 'AI Search (AEO & GEO)',
        desc: 'Entity graphs, /llms.txt discovery, and source-citable content structuring.',
        href: '/services/ai-search-optimization/',
        badge: 'AI Search',
      }
    : {
        title: 'On-Page SEO & Intent Strategy',
        desc: 'Search intent mapping, semantic hierarchy, and metadata CTR optimization.',
        href: '/services/on-page-seo/',
        badge: 'On-Page SEO',
      }

  return (
    <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-28">
      <TableOfContents items={tocItems} />

      {/* Quick Tool Diagnostic Card */}
      <div className="p-5 rounded-2xl bg-surface-1/90 border border-primary-container/30 space-y-3 shadow-lg">
        <span className="font-heading text-[10px] uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Diagnostic
        </span>
        <h3 className="font-heading text-sm font-bold text-on-surface leading-snug">
          Audit Your Google Business Profile
        </h3>
        <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
          Test 10 ranking signals and generate a 30-day AI SEO roadmap in 30 seconds.
        </p>
        <Link
          href="/tools/"
          className="inline-flex items-center justify-between w-full p-2.5 rounded-xl bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] hover:bg-primary transition-all shadow-md"
        >
          <span>Launch Free Audit</span>
          <Icon name="north_east" size={14} />
        </Link>
      </div>

      {/* Contextual Related Service Card */}
      <div className="p-5 rounded-2xl bg-surface-1/90 border border-black/10 dark:border-white/10 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="font-heading text-[10px] uppercase tracking-[0.08em] text-primary-container font-semibold">
            Related Service
          </span>
          <span className="text-[10px] font-heading font-bold px-2 py-0.5 rounded bg-primary-container/15 text-primary-container">
            {relService.badge}
          </span>
        </div>
        <h3 className="font-heading text-sm font-bold text-on-surface leading-snug">
          {relService.title}
        </h3>
        <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
          {relService.desc}
        </p>
        <Link
          href={relService.href}
          className="inline-flex items-center justify-between w-full p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-primary-container/20 border border-black/10 dark:border-white/10 text-on-surface font-heading text-xs font-bold uppercase tracking-[0.06em] transition-all"
        >
          <span>Explore Service Scope</span>
          <Icon name="arrow_forward" size={14} />
        </Link>
      </div>
    </aside>
  )
}

import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { RssButton } from '@/components/RssButton'

export const metadata = generateMetadata({
  title: 'SEO Blog & Digital Marketing Insights | Alain Dave Tapiru',
  description:
    'Discover practical SEO strategies, digital marketing insights and growth tips from Alain Dave Tapiru, an SEO Specialist in the Philippines.',
  url: 'https://www.alaintapiru.com/blog/',
})

const posts: any[] = []

export default function BlogPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-16">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Blog', url: '/blog/' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          Insights &amp; Articles
        </span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-on-surface tracking-[-0.025em]">
          Ideas, Experiments &amp; Things Worth Ranking
        </h1>
        <p className="font-sans text-on-surface/80 text-base leading-relaxed max-w-2xl mx-auto">
          Technical guides, search engine algorithm updates, and modern web development tutorials.
        </p>
        <div className="flex justify-center items-center pt-2">
          <RssButton variant="button" label="Subscribe via RSS Feed" iconSize={16} />
        </div>
      </div>

      {/* Blog Content */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="p-8 rounded-3xl bg-surface-1/80 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-sans text-on-surface/70 mb-3">
                  <span className="font-heading text-primary-container uppercase tracking-[0.08em] font-semibold">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="font-heading text-xl font-bold text-on-surface mb-3 group-hover:text-primary-container transition-colors">
                  {post.title}
                </h2>
                <p className="font-sans text-sm text-on-surface/80 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-sans text-xs text-on-surface/70">
                <span>{post.date}</span>
                <span className="font-heading uppercase tracking-[0.06em] text-xs font-bold text-on-surface group-hover:text-primary-container transition-colors flex items-center gap-1">
                  Read Article <Icon name="arrow_forward" size={16} />
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 sm:py-24 px-6 rounded-3xl bg-surface-1/50 border border-white/10 border-dashed mt-8 space-y-6">
          <Icon name="dataset" size={48} className="text-on-surface/30 block animate-pulse mx-auto" />
          <div>
            <p className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold mb-2">
              The keywords are cooking.
            </p>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface mb-3 tracking-tight">
              Technical Guides &amp; Algorithm Analysis Coming Soon
            </h2>
            <p className="font-sans text-sm sm:text-base text-on-surface/70 max-w-xl mx-auto leading-relaxed">
              Deep-dive breakdowns on Core Web Vitals, JSON-LD knowledge graph engineering, and AI answer engine optimization are currently in staging.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] shadow-[0_0_20px_rgba(224,123,32,0.25)] hover:bg-primary transition-all min-h-[44px]"
            >
              <span>Explore SEO Services</span>
              <Icon name="arrow_forward" size={14} />
            </Link>
            <Link
              href="/projects/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface font-heading text-xs font-bold uppercase tracking-[0.06em] transition-all min-h-[44px]"
            >
              <span>View Case Studies</span>
              <Icon name="arrow_forward" size={14} />
            </Link>
            <Link
              href="/tools/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface font-heading text-xs font-bold uppercase tracking-[0.06em] transition-all min-h-[44px]"
            >
              <span>Run Free GBP Audit</span>
              <Icon name="north_east" size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

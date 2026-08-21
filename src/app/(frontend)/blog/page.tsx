import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { RssButton } from '@/components/RssButton'
import { BLOG_POSTS } from '@/data/posts'

export const metadata = generateMetadata({
  title: 'SEO Blog & Practical Web Insights | Alain Dave Tapiru',
  description:
    'Discover practical SEO notes, Core Web Vitals optimization experiments, and local search guides from Alain Dave Tapiru, an SEO Specialist in the Philippines.',
  url: 'https://www.alaintapiru.com/blog/',
})

export default function BlogPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-16">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Blog', url: '/blog/' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          Insights &amp; Technical Notes
        </span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-on-surface tracking-[-0.025em]">
          Ideas, Experiments &amp; Technical Notes
        </h1>
        <p className="font-sans text-on-surface/80 text-base leading-relaxed max-w-2xl mx-auto">
          Practical technical breakdowns, SEO research notes, and modern web performance experiments.
        </p>
        <div className="flex justify-center items-center pt-2">
          <RssButton variant="button" label="Subscribe via RSS Feed" iconSize={16} />
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {BLOG_POSTS.map((post, idx) => (
          <article
            key={post.slug}
            style={{ transitionDelay: `${(idx % 2) * 80}ms` }}
            className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/80 backdrop-blur-md border border-white/10 hover:border-primary-container/40 hover:bg-surface-2/80 transition-all duration-300 group flex flex-col justify-between shadow-xl card-interactive-glow motion-reveal"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-sans text-on-surface/70">
                <span className="font-heading text-primary-container uppercase tracking-[0.08em] font-semibold text-[11px] px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="schedule" size={13} className="text-on-surface/60" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                <Link href={`/blog/${post.slug}/`} className="focus:outline-none">
                  {post.title}
                </Link>
              </h2>

              <p className="font-sans text-sm sm:text-base text-on-surface/75 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-sans text-xs text-on-surface/70">
              <span className="text-on-surface/60">{post.date}</span>
              <Link
                href={`/blog/${post.slug}/`}
                className="font-heading uppercase tracking-[0.06em] text-xs font-bold text-primary-container group-hover:underline flex items-center gap-1.5 min-h-[44px]"
              >
                <span>Read Full Guide</span>
                <Icon name="arrow_forward" size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Free GBP Health Checker Callout */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-1/80 backdrop-blur-md border border-primary-container/30 text-center space-y-6 shadow-[0_0_50px_rgba(224,123,32,0.12)] motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          Interactive Diagnostic Tool
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
          Want to Audit Your Own Local Search Signals?
        </h2>
        <p className="font-sans text-on-surface/80 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Run the free Google Business Profile diagnostic tool to inspect key local ranking signals and generate an actionable 30-day roadmap.
        </p>
        <Link
          href="/tools/"
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          <span>Run Free Profile Audit</span>
          <Icon name="auto_awesome" size={16} className="btn-icon" />
        </Link>
      </div>
    </div>
  )
}

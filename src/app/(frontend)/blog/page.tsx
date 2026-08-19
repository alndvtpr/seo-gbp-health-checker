import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'

export const metadata = generateMetadata({
  title: 'Blog & SEO Insights | Alain Dave Tapiru',
  description: 'Articles on Technical SEO, Next.js optimization, cybersecurity headers, and AI workflow automation.',
  url: 'https://alaintapiru.com/blog/',
})

const posts: any[] = []

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
          Insights &amp; Articles
        </span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-on-surface mb-6">
          Ideas, Experiments &amp; Things Worth Ranking
        </h1>
        <p className="font-sans text-on-surface/70 text-base leading-relaxed">
          Technical guides, search engine algorithm updates, and modern web development tutorials.
        </p>
      </div>

      {/* Blog Content */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="p-8 rounded-3xl bg-[#181a1b]/70 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-sans text-on-surface/50 mb-3">
                  <span className="font-heading text-primary-container uppercase tracking-wider font-semibold">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="font-heading text-xl font-bold text-on-surface mb-3 group-hover:text-primary-container transition-colors">
                  {post.title}
                </h2>
                <p className="font-sans text-xs text-on-surface/70 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-sans text-xs text-on-surface/50">
                <span>{post.date}</span>
                <span className="font-heading uppercase tracking-wider text-xs font-bold text-on-surface group-hover:text-primary-container transition-colors flex items-center gap-1">
                  Read Article <Icon name="arrow_forward" size={16} />
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 sm:py-24 px-6 rounded-3xl bg-[#181a1b]/30 border border-white/5 border-dashed mt-8 space-y-6">
          <Icon name="dataset" size={48} className="text-on-surface/20 block animate-pulse mx-auto" />
          <div>
            <p className="font-heading text-xs text-primary-container uppercase tracking-widest font-bold mb-2">
              The keywords are cooking.
            </p>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface mb-3">
              Technical Guides &amp; Algorithm Analysis Coming Soon
            </h2>
            <p className="font-sans text-sm text-on-surface/60 max-w-xl mx-auto leading-relaxed">
              Deep-dive breakdowns on Core Web Vitals, JSON-LD knowledge graph engineering, and AI answer engine optimization are currently in staging.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(230,126,34,0.3)] hover:bg-primary transition-all"
            >
              <span>Explore SEO Services</span>
              <Icon name="arrow_forward" size={14} />
            </Link>
            <Link
              href="/projects/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface font-heading text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>View Case Studies</span>
              <Icon name="arrow_forward" size={14} />
            </Link>
            <Link
              href="/tools/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface font-heading text-xs font-bold uppercase tracking-wider transition-all"
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

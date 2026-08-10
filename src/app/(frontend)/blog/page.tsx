import React from 'react'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'Blog & SEO Insights | Alain Dave Tapiru',
  description: 'Articles on Technical SEO, Next.js optimization, cybersecurity headers, and AI workflow automation.',
  url: 'https://alaintapiru.com/blog',
})

const posts = [
  {
    title: 'How to Implement Technical SEO on Next.js 16 App Router',
    category: 'Technical SEO',
    date: 'August 2026',
    readTime: '6 min read',
    excerpt: '[PLACEHOLDER - EDIT LATER] Step-by-step guide to dynamic sitemap generation, OpenGraph metadata, and structured JSON-LD schema implementation in modern React server components.',
    slug: 'technical-seo-nextjs-16',
  },
  {
    title: 'Why Cloudflare & Edge Protection Outperform Custom App Firewalls',
    category: 'Cybersecurity & CDN',
    date: 'August 2026',
    readTime: '5 min read',
    excerpt: '[PLACEHOLDER - EDIT LATER] An analysis of network-layer threat absorption vs. application-level overhead for web performance and security.',
    slug: 'cloudflare-edge-protection-vs-app-firewall',
  },
  {
    title: 'Local SEO Strategy Blueprint for Philippine Multi-Location Brands',
    category: 'Local Search',
    date: 'July 2026',
    readTime: '8 min read',
    excerpt: '[PLACEHOLDER - EDIT LATER] How to optimize Google Business Profiles and localized landing pages for nationwide retail chains.',
    slug: 'local-seo-philippines-blueprint',
  },
]

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
          Insights &amp; Articles
        </span>
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-on-surface mb-6">
          SEO, Security, &amp; Web Tech
        </h1>
        <p className="font-sans text-on-surface/70 text-base leading-relaxed">
          Technical guides, search engine algorithm updates, and modern web development tutorials.
        </p>
      </div>

      {/* Blog Grid */}
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
                Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

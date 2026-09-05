import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import type { BlogPost } from '../types'

export interface ArticleRelatedPostsProps {
  relatedPosts: BlogPost[]
}

export function ArticleRelatedPosts({ relatedPosts }: ArticleRelatedPostsProps) {
  if (relatedPosts.length === 0) return null

  return (
    <section className="space-y-6 max-w-6xl mx-auto motion-reveal">
      <div className="flex items-center justify-between">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold">
          Explore Related Guides &amp; Notes
        </span>
        <Link
          href="/blog/"
          className="text-xs font-heading font-semibold text-on-surface/70 hover:text-primary-container transition-colors flex items-center gap-1"
        >
          <span>All Articles</span>
          <Icon name="arrow_forward" size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedPosts.slice(0, 2).map((rel, idx) => (
          <Link
            key={rel.slug}
            href={`/blog/${rel.slug}/`}
            style={{ transitionDelay: `${(idx % 2) * 80}ms` }}
            className="p-6 rounded-2xl bg-surface-1/95 border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between shadow-md motion-reveal"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-sans text-on-surface/70">
                <span className="font-heading text-primary-container uppercase tracking-[0.08em] text-[10px] font-semibold">
                  {rel.category}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="schedule" size={12} className="text-on-surface/50" />
                  {rel.readTime}
                </span>
              </div>
              <h3 className="font-heading text-base font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                {rel.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed line-clamp-2">
                {rel.excerpt}
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-heading text-xs font-bold text-primary-container">
              <span>Read Article</span>
              <Icon name="arrow_forward" size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

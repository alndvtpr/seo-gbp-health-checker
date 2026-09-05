import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import type { BlogPost } from '../types'

export interface BlogPostCardProps {
  post: BlogPost
  idx?: number
}

export function BlogPostCard({ post, idx = 0 }: BlogPostCardProps) {
  return (
    <article
      style={{ transitionDelay: `${(idx % 2) * 80}ms` }}
      className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-black/10 dark:border-white/10 hover:border-primary-container/40 hover:bg-surface-2 transition-all duration-300 group flex flex-col justify-between shadow-lg card-interactive-glow motion-reveal"
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

      <div className="pt-6 mt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-sans text-xs text-on-surface/70">
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
  )
}

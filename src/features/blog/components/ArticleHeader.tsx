import React from 'react'
import { Icon } from '@/components/icons'
import type { BlogPost } from '../types'

export interface ArticleHeaderProps {
  post: BlogPost
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="space-y-6 text-left border-b border-black/10 dark:border-white/10 pb-8 sm:pb-12 max-w-4xl motion-reveal">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-heading text-primary-container uppercase tracking-[0.08em] font-semibold text-xs px-3.5 py-1 rounded-full bg-primary-container/10 border border-primary-container/30">
          {post.category}
        </span>
        <span className="text-xs font-sans text-on-surface/70 flex items-center gap-1.5">
          <Icon name="schedule" size={14} className="text-on-surface/60" />
          {post.readTime}
        </span>
        <span className="text-xs font-sans text-on-surface/50">•</span>
        <time dateTime={post.datePublished} className="text-xs font-sans text-on-surface/70">
          {post.date}
        </time>
      </div>

      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-[-0.025em] leading-[1.12]">
        {post.title}
      </h1>

      <p className="font-sans text-base sm:text-lg text-on-surface/85 leading-relaxed font-medium">
        {post.content.lead}
      </p>

      {/* Author Bylines */}
      <div className="flex items-center gap-3 pt-2">
        <div className="w-10 h-10 rounded-full bg-surface-2 border border-black/10 dark:border-white/10 flex items-center justify-center font-heading font-bold text-primary-container text-sm">
          AD
        </div>
        <div className="text-xs font-sans">
          <p className="font-heading font-bold text-on-surface">Alain Dave Tapiru</p>
          <p className="text-on-surface/70">SEO Specialist &amp; Web Developer</p>
        </div>
      </div>
    </header>
  )
}

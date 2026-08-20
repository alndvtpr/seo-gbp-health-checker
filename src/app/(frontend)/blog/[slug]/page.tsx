import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { generateMetadata as buildSeoMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BLOG_POSTS, BlogPost } from '@/data/posts'

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug)
  if (!post) return {}

  return buildSeoMetadata({
    title: `${post.title} | Alain Dave Tapiru`,
    description: post.excerpt,
    url: `https://www.alaintapiru.com/blog/${post.slug}/`,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug)

  if (!post) {
    notFound()
  }

  // Schema Graph for Google & AI Search Engines
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    author: {
      '@type': 'Person',
      name: 'Alain Dave Tapiru',
      url: 'https://www.alaintapiru.com/about/',
      jobTitle: 'SEO Specialist & Technical Web Designer',
    },
    publisher: {
      '@type': 'Person',
      name: 'Alain Dave Tapiru',
      url: 'https://www.alaintapiru.com/',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.alaintapiru.com/blog/${post.slug}/`,
    },
  }

  return (
    <article className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-4xl mx-auto relative z-20 space-y-12 sm:space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { name: 'Blog', url: '/blog/' },
          { name: post.title, url: `/blog/${post.slug}/` },
        ]}
      />

      {/* Article Header */}
      <header className="space-y-6 text-left border-b border-white/10 pb-8 sm:pb-12">
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
          <div className="w-10 h-10 rounded-full bg-surface-2 border border-white/10 flex items-center justify-center font-heading font-bold text-primary-container text-sm">
            AD
          </div>
          <div className="text-xs font-sans">
            <p className="font-heading font-bold text-on-surface">Alain Dave Tapiru</p>
            <p className="text-on-surface/70">SEO Specialist &amp; Technical Web Designer</p>
          </div>
        </div>
      </header>

      {/* Article Body Content */}
      <div className="space-y-12 sm:space-y-16 font-sans text-on-surface/85 text-base sm:text-lg leading-relaxed max-w-prose mx-auto">
        {post.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-on-surface tracking-tight leading-snug">
              {section.heading}
            </h2>

            {section.body.map((para, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {para}
              </p>
            ))}

            {section.highlight && (
              <div className="p-6 rounded-2xl bg-surface-1/90 border border-primary-container/30 border-l-4 border-l-primary-container my-6 space-y-2 shadow-lg">
                <span className="font-heading text-xs uppercase tracking-[0.08em] text-primary-container font-semibold block">
                  {section.highlight.title}
                </span>
                <p className="text-sm sm:text-base text-on-surface/90 italic font-medium leading-relaxed">
                  &ldquo;{section.highlight.text}&rdquo;
                </p>
              </div>
            )}

            {section.takeaways && section.takeaways.length > 0 && (
              <div className="p-6 rounded-2xl bg-surface-1 border border-white/10 space-y-3 my-6">
                <span className="font-heading text-xs uppercase tracking-[0.08em] text-on-surface/70 font-semibold block">
                  Key Takeaways
                </span>
                <ul className="space-y-2.5 text-sm sm:text-base">
                  {section.takeaways.map((item, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2.5">
                      <Icon name="check_circle" size={16} className="text-primary-container shrink-0 mt-1" />
                      <span className="text-on-surface/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/25 to-transparent" />
      </div>

      {/* Author Footer & Next Steps CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-1/90 border border-primary-container/30 space-y-6 text-center shadow-[0_0_50px_rgba(224,123,32,0.15)]">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          Technical Growth Consulting
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
          Need Expert Help Implementing These Strategies?
        </h2>
        <p className="font-sans text-on-surface/80 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          From Core Web Vitals optimization to full-stack SEO migrations and Google Business Profile management, let&apos;s engineer results for your platform.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:scale-105 transition-all min-h-[48px]"
          >
            <span>Request Technical Discovery</span>
            <Icon name="arrow_forward" size={16} />
          </Link>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface font-heading text-xs font-bold uppercase tracking-[0.06em] px-6 py-4 rounded-full transition-all min-h-[48px]"
          >
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

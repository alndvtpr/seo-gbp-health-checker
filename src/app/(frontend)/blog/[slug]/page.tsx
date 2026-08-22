import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { generateMetadata as buildSeoMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TableOfContents } from '@/components/TableOfContents'
import { CodeBlock } from '@/components/CodeBlock'
import { BLOG_POSTS, type BlogPost, type BlogImage, type BlogSource } from '@/data/posts'

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
    image: post.heroImage?.src || '/og-image.jpg',
    type: 'article',
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug)

  if (!post) {
    notFound()
  }

  // Generate TOC items from sections
  const tocItems = post.content.sections.map((section, idx) => ({
    id: `section-${idx + 1}`,
    title: section.heading,
  }))

  // Schema Graph for Google & AI Search Engines
  const articleSchema: Record<string, unknown> = {
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
      jobTitle: 'SEO Specialist & Web Developer',
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

  // Add hero image to schema when present
  if (post.heroImage) {
    articleSchema.image = {
      '@type': 'ImageObject',
      url: `https://www.alaintapiru.com${post.heroImage.src}`,
      description: post.heroImage.alt,
    }
  }

  return (
    <article className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-6xl mx-auto relative z-20 space-y-10 sm:space-y-14">
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
      <header className="space-y-6 text-left border-b border-white/10 pb-8 sm:pb-12 max-w-4xl motion-reveal">
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

      {/* Hero Image */}
      {post.heroImage && (
        <figure className="w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-lg motion-reveal">
          <Image
            src={post.heroImage.src}
            alt={post.heroImage.alt}
            width={1200}
            height={630}
            priority
            className="w-full h-auto object-cover"
          />
          {(post.heroImage.caption || post.heroImage.attribution) && (
            <figcaption className="px-4 py-3 bg-surface-1/80 text-xs font-sans text-on-surface/60 flex items-center justify-between gap-4">
              {post.heroImage.caption && <span>{post.heroImage.caption}</span>}
              {post.heroImage.attribution && (
                <span className="text-on-surface/40 italic shrink-0">{post.heroImage.attribution}</span>
              )}
            </figcaption>
          )}
        </figure>
      )}

      {/* Main 2-Column Layout (Content + Sticky Table of Contents Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Article Body Content */}
        <div className="lg:col-span-8 space-y-12 sm:space-y-16 font-sans text-on-surface/85 text-base sm:text-lg leading-relaxed">
          {/* Mobile Table of Contents */}
          <TableOfContents items={tocItems} className="lg:hidden mb-8" />

          {post.content.sections.map((section, idx) => (
            <section
              key={idx}
              id={`section-${idx + 1}`}
              className="space-y-6 scroll-mt-28 motion-reveal"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-on-surface tracking-tight leading-snug">
                {section.heading}
              </h2>

              {section.body.map((para, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {para}
                </p>
              ))}

              {section.codeBlock && (
                <CodeBlock
                  code={section.codeBlock.code}
                  language={section.codeBlock.language}
                  filename={section.codeBlock.filename}
                />
              )}

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

              {/* Section Image */}
              {section.image && (
                <figure className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg my-6">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    width={800}
                    height={450}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                  {(section.image.caption || section.image.attribution) && (
                    <figcaption className="px-4 py-3 bg-surface-1/80 text-xs font-sans text-on-surface/60 flex items-center justify-between gap-4">
                      {section.image.caption && <span>{section.image.caption}</span>}
                      {section.image.attribution && (
                        <span className="text-on-surface/40 italic shrink-0">{section.image.attribution}</span>
                      )}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Source Attribution */}
              {section.sources && section.sources.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-xs font-sans text-on-surface/40">
                  <span className="font-heading uppercase tracking-[0.08em] font-semibold text-on-surface/30">Sources:</span>
                  {section.sources.map((source, sIdx) => (
                    <a
                      key={sIdx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-on-surface/50 hover:text-primary-container transition-colors underline underline-offset-2 decoration-on-surface/20 hover:decoration-primary-container/50"
                    >
                      {source.label}
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Right Column: Desktop Sticky Table of Contents & Quick Action Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-28">
          <TableOfContents items={tocItems} />

          {/* Quick Tool Diagnostic Card */}
          <div className="p-5 rounded-2xl bg-surface-1/90 border border-primary-container/30 space-y-3 shadow-lg">
            <span className="font-heading text-[10px] uppercase tracking-[0.08em] text-emerald-400 font-semibold flex items-center gap-1.5">
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
        </aside>
      </div>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/25 to-transparent" />
      </div>

      {/* Related Technical Guides & Cross-Linking */}
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
          {BLOG_POSTS.filter((p) => p.slug !== post.slug)
            .slice(0, 2)
            .map((rel, idx) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}/`}
                style={{ transitionDelay: `${(idx % 2) * 80}ms` }}
                className="p-6 rounded-2xl bg-surface-1/90 border border-white/10 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between shadow-lg motion-reveal"
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

                <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between font-heading text-xs font-bold text-primary-container">
                  <span>Read Article</span>
                  <Icon name="arrow_forward" size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Author Footer & Next Steps CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface-1/90 border border-primary-container/30 space-y-6 text-center shadow-[0_0_50px_rgba(224,123,32,0.15)] motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          Technical Collaboration
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
          Need Practical Help Implementing These Strategies?
        </h2>
        <p className="font-sans text-on-surface/80 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          From Core Web Vitals speed tuning to structured data implementation and local SEO diagnostics, let&apos;s build search-ready digital foundations.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] px-8 py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>Get in Touch</span>
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface font-heading text-xs font-bold uppercase tracking-[0.06em] px-6 py-4 rounded-full btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

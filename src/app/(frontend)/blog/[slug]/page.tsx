import React from 'react'
import { notFound } from 'next/navigation'
import { generateMetadata as buildSeoMetadata, serializeJsonLd } from '@/lib/seo'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TableOfContents } from '@/components/TableOfContents'
import {
  BLOG_POSTS,
  ArticleHeader,
  ArticleHeroImage,
  ArticleSection,
  ArticleSidebar,
  ArticleRelatedPosts,
  ArticleFooterCta,
} from '@/features/blog'

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
    image: post.heroImage?.src || '/alain-dave-tapiru-seo-specialist-philippines.avif',
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

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug)

  // Schema Graph for Google & AI Search Engines
  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `https://www.alaintapiru.com/blog/${post.slug}/#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.datePublished,
        ...(post.dateModified ? { dateModified: post.dateModified } : {}),
        inLanguage: 'en-US',
        author: {
          '@id': 'https://www.alaintapiru.com/#person',
        },
        publisher: {
          '@id': 'https://www.alaintapiru.com/#person',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://www.alaintapiru.com/blog/${post.slug}/#webpage`,
          url: `https://www.alaintapiru.com/blog/${post.slug}/`,
          isPartOf: {
            '@id': 'https://www.alaintapiru.com/#website',
          },
          breadcrumb: {
            '@id': `https://www.alaintapiru.com/blog/${post.slug}/#breadcrumb`,
          },
        },
        ...(post.heroImage
          ? {
              image: {
                '@type': 'ImageObject',
                url: `https://www.alaintapiru.com${post.heroImage.src}`,
                description: post.heroImage.alt,
              },
            }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://www.alaintapiru.com/blog/${post.slug}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.alaintapiru.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://www.alaintapiru.com/blog/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://www.alaintapiru.com/blog/${post.slug}/`,
          },
        ],
      },
    ],
  }

  return (
    <article className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-6xl mx-auto relative z-20 space-y-10 sm:space-y-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { name: 'Blog', url: '/blog/' },
          { name: post.title, url: `/blog/${post.slug}/` },
        ]}
        showJsonLd={false}
      />

      {/* Article Header */}
      <ArticleHeader post={post} />

      {/* Hero Image */}
      {post.heroImage && <ArticleHeroImage image={post.heroImage} />}

      {/* Main 2-Column Layout (Content + Sticky Table of Contents Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Article Body Content */}
        <div className="lg:col-span-8 space-y-12 sm:space-y-16 font-sans text-on-surface/85 text-base sm:text-lg leading-relaxed">
          {/* Mobile Table of Contents */}
          <TableOfContents items={tocItems} className="lg:hidden mb-8" />

          {post.content.sections.map((section, idx) => (
            <ArticleSection key={idx} section={section} index={idx} />
          ))}
        </div>

        {/* Right Column: Desktop Sticky Table of Contents & Quick Action Sidebar */}
        <ArticleSidebar tocItems={tocItems} slug={post.slug} />
      </div>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/25 to-transparent" />
      </div>

      {/* Related Technical Guides & Cross-Linking */}
      <ArticleRelatedPosts relatedPosts={relatedPosts} />

      {/* Author Footer & Next Steps CTA */}
      <ArticleFooterCta />
    </article>
  )
}

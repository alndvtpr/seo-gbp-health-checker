import React from 'react'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import {
  BlogHeader,
  BlogPostCard,
  BlogToolsCallout,
  BLOG_POSTS,
} from '@/features/blog'

export const metadata = generateMetadata({
  title: 'SEO Guides & Technical Web Insights | Alain Dave Tapiru',
  description:
    'Practical SEO guides, Core Web Vitals optimization tutorials, and local search notes by Alain Dave Tapiru, an SEO Specialist in the Philippines.',
  url: 'https://www.alaintapiru.com/blog/',
})

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.alaintapiru.com/blog/#webpage',
      url: 'https://www.alaintapiru.com/blog/',
      name: 'SEO Guides & Technical Web Insights | Alain Dave Tapiru',
      description:
        'Practical SEO guides, Core Web Vitals optimization tutorials, and local search notes by Alain Dave Tapiru, an SEO Specialist in the Philippines.',
      isPartOf: {
        '@id': 'https://www.alaintapiru.com/#website',
      },
      about: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: BLOG_POSTS.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://www.alaintapiru.com/blog/${post.slug}/`,
          name: post.title,
          description: post.excerpt,
        })),
      },
      breadcrumb: {
        '@id': 'https://www.alaintapiru.com/blog/#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/blog/#breadcrumb',
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
      ],
    },
  ],
}

export default function BlogPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-16">
      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Blog', url: '/blog/' }]} showJsonLd={false} />

      {/* Header */}
      <BlogHeader />

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {BLOG_POSTS.map((post, idx) => (
          <BlogPostCard key={post.slug} post={post} idx={idx} />
        ))}
      </div>

      {/* Free GBP Health Checker Callout */}
      <BlogToolsCallout />
    </div>
  )
}

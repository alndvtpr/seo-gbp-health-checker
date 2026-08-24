import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { normalizeCanonicalUrl } from '@/lib/seo'

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  align?: 'left' | 'center'
  className?: string
  showJsonLd?: boolean
}

export function Breadcrumbs({
  items = [],
  align = 'left',
  className = '',
  showJsonLd = true,
}: BreadcrumbsProps) {
  // Normalize items array to always start with Home (position 1)
  const normalizedItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...items.filter((item) => item.url !== '/' && item.name.toLowerCase() !== 'home'),
  ]

  // Generate Schema.org BreadcrumbList structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: normalizedItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: normalizeCanonicalUrl(item.url),
    })),
  }

  const alignmentClass =
    align === 'center'
      ? 'justify-center text-center'
      : 'justify-start text-left'

  return (
    <>
      {showJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}

      <nav
        aria-label="Breadcrumb"
        className={`w-full ${className}`}
      >
        <ol
          className={`flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs font-heading tracking-wide ${alignmentClass}`}
        >
          {normalizedItems.map((item, index) => {
            const isLast = index === normalizedItems.length - 1

            if (isLast) {
              return (
                <li
                  key={item.url || index}
                  aria-current="page"
                  className="inline-flex items-center gap-1.5 sm:gap-2"
                >
                  <span className="text-primary-container font-semibold truncate max-w-[200px] sm:max-w-md md:max-w-xl">
                    {item.name}
                  </span>
                </li>
              )
            }

            return (
              <li
                key={item.url || index}
                className="inline-flex items-center gap-1.5 sm:gap-2"
              >
                <Link
                  href={item.url}
                  className="text-on-surface/60 hover:text-primary-container font-medium transition-colors duration-200 inline-flex items-center gap-1"
                >
                  {index === 0 && (
                    <Icon
                      name="home"
                      size={13}
                      className="text-on-surface/60 group-hover:text-primary-container transition-colors"
                      aria-hidden="true"
                    />
                  )}
                  <span>{item.name}</span>
                </Link>
                <Icon
                  name="chevron_right"
                  size={12}
                  className="text-on-surface/30 shrink-0"
                  aria-hidden="true"
                />
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs

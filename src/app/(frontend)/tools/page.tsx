import { ToolsHeader, SEOSalaryCalculator, WebsiteAuditCard, GbpCheckerCard } from '@/features/tools'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { serializeJsonLd } from '@/lib/seo'

const toolsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.alaintapiru.com/tools/#webpage',
      url: 'https://www.alaintapiru.com/tools/',
      name: 'Free SEO Tools & Diagnostic Calculators | Alain Dave Tapiru',
      description:
        'Free, practical SEO tools and calculators. Audit Google Business Profile signals, estimate SEO compensation, and request website technical reviews.',
      isPartOf: {
        '@id': 'https://www.alaintapiru.com/#website',
      },
      breadcrumb: {
        '@id': 'https://www.alaintapiru.com/tools/#breadcrumb',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://www.alaintapiru.com/tools/#gbp-checker-app',
      name: 'Local SEO & Google Business Profile Health Checker',
      url: 'https://www.alaintapiru.com/tools/',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Interactive 10-point local search diagnostic tool analyzing Google Business Profile completeness, category alignment, review velocity, and generating 30-day dynamic SEO roadmaps.',
      author: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      creator: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      provider: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://www.alaintapiru.com/tools/#salary-calculator-app',
      name: 'SEO Specialist Compensation Calculator',
      url: 'https://www.alaintapiru.com/tools/',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Interactive compensation estimator for Philippine and offshore SEO professionals across experience levels, employment models, and skill domains.',
      author: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      provider: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/tools/#breadcrumb',
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
          name: 'Tools',
          item: 'https://www.alaintapiru.com/tools/',
        },
      ],
    },
  ],
}

export default function ToolsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-20">
      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(toolsJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Tools', url: '/tools/' }]} showJsonLd={false} />

      {/* Header */}
      <ToolsHeader />

      {/* Tool 1: SEO Specialist Salary Calculator */}
      <SEOSalaryCalculator />

      {/* Tool 2 & Tool 3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <WebsiteAuditCard />
        <GbpCheckerCard />
      </div>
    </div>
  )
}

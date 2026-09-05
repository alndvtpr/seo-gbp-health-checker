import React from 'react'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import {
  ContactHeader,
  ContactCalendlySection,
  ContactInfoCard,
  ContactForm,
} from '@/features/contact'

export const metadata = generateMetadata({
  title: 'Contact Alain Dave Tapiru | Practical SEO & Web Support Philippines',
  description:
    'Schedule a 20-minute discovery call or send a direct project inquiry to discuss practical SEO, website health checks, local search foundations, or agency overflow support.',
  url: 'https://www.alaintapiru.com/contact/',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': 'https://www.alaintapiru.com/contact/#webpage',
      url: 'https://www.alaintapiru.com/contact/',
      name: 'Contact Alain Dave Tapiru | Practical SEO & Web Support Philippines',
      description:
        'Schedule a 20-minute discovery call or send a direct project inquiry to discuss practical SEO, website health checks, local search foundations, or agency overflow support.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.alaintapiru.com/#website',
        name: 'Alain Dave Tapiru',
        url: 'https://www.alaintapiru.com/',
      },
      mainEntity: {
        '@type': 'Person',
        '@id': 'https://www.alaintapiru.com/#person',
        name: 'Alain Dave Tapiru',
        jobTitle: 'SEO Specialist & Web Developer',
        url: 'https://www.alaintapiru.com/',
        email: 'alaintapiru@gmail.com',
        telephone: '+63-906-324-9560',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mabalacat City',
          addressRegion: 'Pampanga',
          addressCountry: 'PH',
        },
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/contact/#breadcrumb',
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
          name: 'Contact',
          item: 'https://www.alaintapiru.com/contact/',
        },
      ],
    },
  ],
}

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-16">
      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Contact', url: '/contact/' }]} showJsonLd={false} />

      {/* Header with Single Clear Question */}
      <ContactHeader />

      {/* 1. Calendly Inline Scheduler Section (Positioned at Top for High-Conversion Booking) */}
      <ContactCalendlySection />

      {/* Ambient Section Separator */}
      <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-primary-container/25 to-transparent" aria-hidden="true" />

      {/* 2. Direct Inquiry Form & Contact Info Section (Positioned Below Calendly) */}
      <div className="space-y-8 sm:space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2 motion-reveal">
          <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
            RATHER WRITE IT DOWN?
          </span>
          <h2 className="font-heading text-xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Send Me the Details
          </h2>
          <p className="font-sans text-xs sm:text-sm text-on-surface/75 leading-relaxed max-w-xl mx-auto">
            Not ready for a call? That&apos;s completely fine. Tell me a little about your website, SEO issue, or project and I&apos;ll get back to you personally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Direct Contact Info & What Happens Next */}
          <ContactInfoCard className="lg:col-span-5" />

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 motion-reveal">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

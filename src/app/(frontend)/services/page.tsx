import React from 'react'
import { generateMetadata } from '@/lib/seo'
import { ServicesHero } from '@/components/ServicesHero'
import { ServicesPillar1 } from '@/components/ServicesPillar1'
import { ServicesPillar2 } from '@/components/ServicesPillar2'
import { ServicesPillars3And4 } from '@/components/ServicesPillars3And4'
import { ServicesPackages } from '@/components/ServicesPackages'
import { ServicesWorkflowAndFAQ } from '@/components/ServicesWorkflowAndFAQ'
import { ServicesFinalCta } from '@/components/ServicesFinalCta'

export const metadata = generateMetadata({
  title: 'Data-Driven SEO, AEO, GEO & Web Development Services | Alain Tapiru',
  description: 'Rank on Google and get cited by AI engines like ChatGPT & Perplexity. Fast static/WordPress sites, technical audits, Schema markup, and analytics.',
  url: 'https://alaintapiru.com/services',
})

export default function ServicesPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-28 pb-20 sm:pb-32">
      {/* 1. Hero Section */}
      <ServicesHero />

      {/* 2. Pillar 01: Technical & Semantic Foundation */}
      <ServicesPillar1 />

      {/* 3. Pillar 02: Visibility (SEO, AEO & GEO) */}
      <ServicesPillar2 />

      {/* 4. Pillars 03 & 04: Execution & Measurement */}
      <ServicesPillars3And4 />

      {/* 5. 3-Tier Engagement Pricing / Packaging Grid */}
      <ServicesPackages />

      {/* 6. 4-Step Delivery Workflow & FAQ Accordion */}
      <ServicesWorkflowAndFAQ />

      {/* 7. Closing Conversion CTA Banner & JSON-LD Structured Data */}
      <ServicesFinalCta />
    </div>
  )
}

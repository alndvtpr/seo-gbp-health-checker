import React from 'react'
import { generateMetadata } from '@/lib/seo'
import {
  ServicesHero,
  ServicesHubGrid,
  ServicesScopeEstimator,
  ServicesPackages,
  ServicesWorkflowAndFAQ,
  ServicesFinalCta,
  ServiceSectionDivider,
} from '@/features/services'

export const metadata = generateMetadata({
  title: 'Practical SEO Services & Website Support | Alain Dave Tapiru',
  description:
    'Practical SEO services and website support for small businesses and agencies. Technical SEO audits, local search setup, on-page optimization, and web support in the Philippines.',
  url: 'https://www.alaintapiru.com/services/',
})

export default function ServicesPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* 1. Hero Section */}
      <ServicesHero />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 2. Approved Engagement Packages */}
      <ServicesPackages />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 3. Core Service Capabilities & Connected Proofs */}
      <ServicesHubGrid />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 4. Interactive Scope & Timeline Estimator */}
      <ServicesScopeEstimator />

      {/* Ambient Section Divider */}
      <ServiceSectionDivider />

      {/* 5. 4-Step Delivery Workflow & FAQ Accordion */}
      <ServicesWorkflowAndFAQ />

      {/* 6. Closing Conversion CTA Banner & JSON-LD Structured Data */}
      <ServicesFinalCta />
    </div>
  )
}

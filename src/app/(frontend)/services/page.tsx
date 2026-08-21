import React from 'react'
import { generateMetadata } from '@/lib/seo'
import { ServicesHero } from '@/components/ServicesHero'
import { ServicesPillar1 } from '@/components/ServicesPillar1'
import { ServicesPillar2 } from '@/components/ServicesPillar2'
import { ServicesPillars3And4 } from '@/components/ServicesPillars3And4'
import { ServicesScopeEstimator } from '@/components/ServicesScopeEstimator'
import { ServicesPackages } from '@/components/ServicesPackages'
import { ServicesWorkflowAndFAQ } from '@/components/ServicesWorkflowAndFAQ'
import { ServicesFinalCta } from '@/components/ServicesFinalCta'

export const metadata = generateMetadata({
  title: 'SEO, Web Design & Development Services | Alain Dave Tapiru',
  description:
    'Explore practical SEO, web design, and development services built to improve search visibility, Core Web Vitals performance, and search readiness.',
  url: 'https://www.alaintapiru.com/services/',
})

export default function ServicesPage() {
  return (
    <div className="relative z-20 space-y-16 sm:space-y-24 pb-20 sm:pb-32">
      {/* 1. Hero Section */}
      <ServicesHero />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 2. Pillar 01: Technical & Semantic Foundation */}
      <ServicesPillar1 />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 3. Pillar 02: Visibility (SEO, AEO & GEO) */}
      <ServicesPillar2 />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 4. Pillars 03 & 04: Execution & Measurement */}
      <ServicesPillars3And4 />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 5. Interactive Scope & Timeline Estimator */}
      <ServicesScopeEstimator />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 6. 3-Tier Engagement Pricing / Packaging Grid */}
      <ServicesPackages />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* 6. 4-Step Delivery Workflow & FAQ Accordion */}
      <ServicesWorkflowAndFAQ />

      {/* 7. Closing Conversion CTA Banner & JSON-LD Structured Data */}
      <ServicesFinalCta />
    </div>
  )
}

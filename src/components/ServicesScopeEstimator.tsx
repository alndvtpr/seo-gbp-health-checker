'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

interface ProjectType {
  id: string
  name: string
  baseWeeks: number
  basePriceUsd: number
  basePricePhp: number
  description: string
  recommendedPackage: string
  serviceParam: string
}

interface CapabilityAddon {
  id: string
  name: string
  weeksDelta: number
  priceUsd: number
  pricePhp: number
  description: string
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'nextjs-custom',
    name: 'Custom Next.js & React Build',
    baseWeeks: 3,
    basePriceUsd: 850,
    basePricePhp: 48000,
    description: 'Code-first React/Next.js architecture built for fast Core Web Vitals, clean crawlability, and zero layout shift.',
    recommendedPackage: 'Custom Next.js Full-Stack Architecture',
    serviceParam: 'AI Web Design & Dev',
  },
  {
    id: 'wordpress-launch',
    name: 'WordPress / Elementor Redesign',
    baseWeeks: 2.5,
    basePriceUsd: 480,
    basePricePhp: 27000,
    description: 'Custom responsive WordPress layout paired with technical speed optimization, schema integration, and easy CMS editing.',
    recommendedPackage: 'WordPress High-Speed Business Website',
    serviceParam: 'AI Web Design & Dev',
  },
  {
    id: 'technical-audit',
    name: 'Technical SEO Audit & Roadmap',
    baseWeeks: 1.5,
    basePriceUsd: 280,
    basePricePhp: 15500,
    description: 'Comprehensive crawl analysis, Core Web Vitals audit, schema verification, and prioritized 30-day action sprint.',
    recommendedPackage: 'SEO & AI Readiness Sprint',
    serviceParam: 'Technical SEO Audit',
  },
  {
    id: 'monthly-retainer',
    name: 'Ongoing Monthly SEO Support',
    baseWeeks: 4,
    basePriceUsd: 450,
    basePricePhp: 25000,
    description: 'Ongoing technical and on-page optimization, local search support, and transparent reporting (~20-25 hrs/month).',
    recommendedPackage: 'Ongoing Monthly SEO Support',
    serviceParam: 'Full-Service Monthly SEO',
  },
]

const CAPABILITIES: CapabilityAddon[] = [
  {
    id: 'web-vitals',
    name: 'Core Web Vitals Speed Optimization',
    weeksDelta: 0.5,
    priceUsd: 120,
    pricePhp: 6800,
    description: 'Image optimization, asset compression, render-blocking deferral, and performance tuning.',
  },
  {
    id: 'schema-graph',
    name: 'Schema Markup & Structured Data',
    weeksDelta: 0.5,
    priceUsd: 90,
    pricePhp: 5000,
    description: 'Custom JSON-LD structured data implementation for Organization, LocalBusiness, Breadcrumbs, and FAQs.',
  },
  {
    id: 'map-pack',
    name: 'Local SEO & Google Business Profile Setup',
    weeksDelta: 0.5,
    priceUsd: 90,
    pricePhp: 5000,
    description: 'Category alignment, NAP consistency checks, and local optimization strategy.',
  },
  {
    id: 'analytics-dashboard',
    name: 'Looker Studio & GA4 Analytics Suite',
    weeksDelta: 0.5,
    priceUsd: 70,
    pricePhp: 4000,
    description: 'Live automated reporting dashboard tracking organic conversions, keyword clicks, and engagement.',
  },
]

export function ServicesScopeEstimator() {
  const [currency, setCurrency] = useState<'USD' | 'PHP'>('USD')
  const [selectedType, setSelectedType] = useState<string>('nextjs-custom')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'web-vitals',
    'schema-graph',
  ])
  const [isAccelerated, setIsAccelerated] = useState<boolean>(false)

  const activeProject = useMemo(() => {
    return PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0]
  }, [selectedType])

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const estimatedWeeks = useMemo(() => {
    let total = activeProject.baseWeeks
    selectedAddons.forEach((addonId) => {
      const addon = CAPABILITIES.find((c) => c.id === addonId)
      if (addon) total += addon.weeksDelta
    })

    if (isAccelerated) {
      total = Math.max(1.5, total * 0.65)
    }

    return Math.round(total * 10) / 10
  }, [activeProject, selectedAddons, isAccelerated])

  const estimatedCost = useMemo(() => {
    const isUsd = currency === 'USD'
    let base = isUsd ? activeProject.basePriceUsd : activeProject.basePricePhp
    selectedAddons.forEach((addonId) => {
      const addon = CAPABILITIES.find((c) => c.id === addonId)
      if (addon) {
        base += isUsd ? addon.priceUsd : addon.pricePhp
      }
    })

    if (isAccelerated) {
      base *= 1.25
    }

    return Math.round(base)
  }, [activeProject, selectedAddons, isAccelerated, currency])

  return (
    <section
      id="scope-estimator"
      aria-labelledby="scope-estimator-heading"
      className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block font-semibold">
          Interactive Scope Planner
        </span>
        <h2
          id="scope-estimator-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight"
        >
          Project Scope &amp; Timeline Estimator
        </h2>
        <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
          Configure your technical requirements to calculate estimated sprint delivery timelines, add-on capabilities, and clear milestone budgets.
        </p>
      </div>

      {/* Main Estimator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Requirements Configuration (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg motion-reveal">
          {/* Step 1: Select Project Type */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold block">
                1. Choose Core Project Type
              </label>

              {/* Currency Toggle */}
              <div className="inline-flex items-center p-1 rounded-xl bg-surface-2 border border-black/10 dark:border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 rounded-lg font-heading font-bold transition-all cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'text-on-surface/70 hover:text-on-surface'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('PHP')}
                  className={`px-3 py-1 rounded-lg font-heading font-bold transition-all cursor-pointer ${
                    currency === 'PHP'
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'text-on-surface/70 hover:text-on-surface'
                  }`}
                >
                  PHP (₱)
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map((type) => {
                const isSelected = selectedType === type.id
                const displayPrice = currency === 'USD' 
                  ? `$${type.basePriceUsd.toLocaleString()}`
                  : `₱${type.basePricePhp.toLocaleString()}`

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-primary-container/15 border-primary-container text-on-surface shadow-md ring-1 ring-primary-container/50'
                        : 'bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-on-surface/80 hover:bg-black/5 dark:hover:bg-white/5 hover:border-primary-container/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-heading text-sm font-bold text-on-surface">
                        {type.name}
                      </span>
                      {isSelected && (
                        <Icon name="check_circle" size={16} className="text-primary-container shrink-0" />
                      )}
                    </div>
                    <p className="font-sans text-xs text-on-surface/70 leading-relaxed mb-2">
                      {type.description}
                    </p>
                    <span className="inline-block text-[11px] font-heading font-bold text-primary-container">
                      Base: {displayPrice}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Capability Add-ons */}
          <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
            <label className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold block">
              2. Select Specialized Add-on Capabilities
            </label>
            <div className="space-y-2.5">
              {CAPABILITIES.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id)
                const addonPrice = currency === 'USD'
                  ? `+$${addon.priceUsd}`
                  : `+₱${addon.pricePhp.toLocaleString()}`

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-primary-container/10 border-primary-container/60 text-on-surface'
                        : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/10 dark:border-white/10 text-on-surface/80 hover:bg-black/5 dark:hover:bg-white/5 hover:border-primary-container/30'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-primary-container border-primary-container text-on-primary-container'
                          : 'border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5'
                      }`}
                    >
                      {isChecked && <Icon name="check_circle" size={14} />}
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-heading text-xs sm:text-sm font-bold text-on-surface">
                          {addon.name}
                        </span>
                        <span className="text-[11px] font-heading font-semibold text-primary-container shrink-0">
                          {addonPrice}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-on-surface/70 leading-relaxed">
                        {addon.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Step 3: Timeline Urgency Toggle */}
          <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-4">
            <div>
              <span className="font-heading text-xs font-bold text-on-surface block">
                Accelerated Delivery Sprint
              </span>
              <span className="font-sans text-xs text-on-surface/70">
                Priority scheduling for rapid launch requirements (+25% sprint prioritization).
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsAccelerated(!isAccelerated)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isAccelerated ? 'bg-primary-container' : 'bg-black/15 dark:bg-white/15'
              }`}
              role="switch"
              aria-checked={isAccelerated}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAccelerated ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Estimate Output Card (5 Cols) */}
        <div style={{ transitionDelay: '80ms' }} className="lg:col-span-5 space-y-6 sticky top-28 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-md border-2 border-primary-container/60 shadow-xl motion-reveal">
          <div className="space-y-1">
            <span className="font-heading text-[10px] sm:text-xs text-primary-container uppercase tracking-[0.08em] font-semibold block">
              Estimated Sprint Scope
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-on-surface">
              Project Delivery Summary
            </h3>
          </div>

          {/* Metrics Highlight Box */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-center">
            <div>
              <span className="font-heading text-[10px] text-on-surface/60 uppercase tracking-wider block font-semibold">
                Est. Duration
              </span>
              <span className="font-heading text-2xl sm:text-3xl font-extrabold text-primary-container">
                {estimatedWeeks} {estimatedWeeks === 1 ? 'Week' : 'Weeks'}
              </span>
            </div>
            <div>
              <span className="font-heading text-[10px] text-on-surface/60 uppercase tracking-wider block font-semibold">
                Est. Investment
              </span>
              <span className="font-heading text-2xl sm:text-3xl font-extrabold text-primary-container">
                {currency === 'USD' ? `$${estimatedCost.toLocaleString()}` : `₱${estimatedCost.toLocaleString()}`}
              </span>
            </div>
          </div>

          {/* Delivery Mode Badge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/5 text-xs font-sans">
            <span className="text-on-surface/70">Execution Cadence:</span>
            <span className="font-heading font-bold text-emerald-500">
              {isAccelerated ? '⚡ Priority Accelerated Sprint' : 'Standard Delivery Sprint'}
            </span>
          </div>

          {/* Recommended Engagement Model */}
          <div className="space-y-2 p-4 rounded-xl bg-surface-2/60 border border-black/10 dark:border-white/10">
            <span className="font-heading text-[11px] text-on-surface/70 uppercase tracking-wider block font-semibold">
              Recommended Package:
            </span>
            <p className="font-heading text-base font-bold text-on-surface flex items-center gap-2">
              <Icon name="auto_awesome" size={16} className="text-primary-container" />
              <span>{activeProject.recommendedPackage}</span>
            </p>
            <p className="font-sans text-xs text-on-surface/70 leading-relaxed pt-1">
              Includes core execution, QA testing, verified schema integration, and technical handoff.
            </p>
          </div>

          {/* Selected Add-ons Pill Count */}
          <div className="flex items-center justify-between text-xs font-sans text-on-surface/70 px-1">
            <span>Configured Add-ons:</span>
            <span className="font-heading font-bold text-on-surface">
              {selectedAddons.length} of {CAPABILITIES.length} Selected
            </span>
          </div>

          {/* Action CTA Button */}
          <Link
            href={`/contact/?service=${encodeURIComponent(activeProject.serviceParam)}`}
            className="w-full bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] py-4 px-6 rounded-xl shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:bg-primary btn-motion flex items-center justify-center gap-2 min-h-[48px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <span>Discuss This Project Scope</span>
            <Icon name="arrow_forward" size={16} className="btn-icon" />
          </Link>

          {/* Small Business Flexibility Guarantee Note */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
            <span className="font-heading text-[11px] font-bold text-emerald-500 flex items-center justify-center gap-1">
              <Icon name="handshake" size={14} className="text-emerald-500" />
              <span>Flexible Budget &amp; Phased Options</span>
            </span>
            <p className="font-sans text-[11px] text-on-surface/75 leading-relaxed">
              Have specific constraints or a custom scope? We can tailor deliverables sprint-by-sprint to fit your exact needs.
            </p>
          </div>

          <p className="text-[11px] font-sans text-on-surface/50 text-center leading-relaxed">
            Free discovery call included. All projects include direct communication, regular updates, and milestone-based reviews.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ServicesScopeEstimator

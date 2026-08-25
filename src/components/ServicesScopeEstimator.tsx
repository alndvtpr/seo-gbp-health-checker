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
    id: 'health-check',
    name: 'Website SEO Health Check',
    baseWeeks: 0.5,
    basePriceUsd: 65,
    basePricePhp: 3500,
    description: 'Technical crawl diagnostics, Core Web Vitals profiling, robots/sitemap inspection, and prioritized action plan.',
    recommendedPackage: 'Website SEO Health Check (₱3,500)',
    serviceParam: 'Website SEO Health Check',
  },
  {
    id: 'technical-sprint',
    name: 'Technical SEO Fix Sprint',
    baseWeeks: 1,
    basePriceUsd: 155,
    basePricePhp: 8500,
    description: 'Direct hands-on fixes for indexing issues, 404s, redirect chains, JSON-LD schema, and basic Core Web Vitals.',
    recommendedPackage: 'Technical SEO Fix Sprint (₱8,500)',
    serviceParam: 'Technical SEO Audit',
  },
  {
    id: 'on-page-sprint',
    name: 'On-Page SEO Sprint',
    baseWeeks: 1,
    basePriceUsd: 120,
    basePricePhp: 6500,
    description: 'Search intent mapping, heading structure rewrite, click-focused meta titles/descriptions, and internal linking.',
    recommendedPackage: 'On-Page SEO Sprint (₱6,500)',
    serviceParam: 'On-Page SEO Optimization',
  },
  {
    id: 'local-foundation',
    name: 'Local SEO Foundation',
    baseWeeks: 1,
    basePriceUsd: 135,
    basePricePhp: 7500,
    description: '10-point Google Business Profile calibration, category alignment, NAP consistency review, and local schema.',
    recommendedPackage: 'Local SEO Foundation (₱7,500)',
    serviceParam: 'Local SEO Optimization',
  },
  {
    id: 'monthly-support',
    name: 'Monthly SEO Maintenance & Care',
    baseWeeks: 4,
    basePriceUsd: 145,
    basePricePhp: 8000,
    description: 'Up to 8 hours/month of proactive technical maintenance, Search Console index monitoring, and transparent task logs.',
    recommendedPackage: 'Monthly SEO Support (₱8,000/mo)',
    serviceParam: 'Ongoing Monthly SEO Support',
  },
  {
    id: 'custom-web',
    name: 'Custom Web Development Build',
    baseWeeks: 2.5,
    basePriceUsd: 450,
    basePricePhp: 25000,
    description: 'Custom WordPress theme or code-first Next.js 15 web architecture built for sub-second LCP and zero layout shift.',
    recommendedPackage: 'Custom Web Build (Scoped Quote)',
    serviceParam: 'React & WordPress Web Development',
  },
]

const CAPABILITIES: CapabilityAddon[] = [
  {
    id: 'extra-pages',
    name: 'Additional 5-Page On-Page Optimization',
    weeksDelta: 0.5,
    priceUsd: 80,
    pricePhp: 4500,
    description: 'Intent mapping, single-H1 heading restructuring, metadata, and internal linking for 5 extra priority pages.',
  },
  {
    id: 'schema-graph',
    name: 'Advanced JSON-LD Entity Graph Setup',
    weeksDelta: 0.5,
    priceUsd: 65,
    pricePhp: 3500,
    description: 'Interconnected Schema.org markup for Organization, LocalBusiness, Breadcrumbs, FAQs, and Services.',
  },
  {
    id: 'web-vitals',
    name: 'Core Web Vitals Speed Optimization',
    weeksDelta: 0.5,
    priceUsd: 80,
    pricePhp: 4500,
    description: 'Image optimization, asset compression, render-blocking deferral, and performance tuning.',
  },
  {
    id: 'analytics-dashboard',
    name: 'Google Search Console & GA4 Suite',
    weeksDelta: 0.5,
    priceUsd: 45,
    pricePhp: 2500,
    description: 'Clean Search Console sitemap setup, GA4 event tracking, and Looker Studio performance view.',
  },
]

export function ServicesScopeEstimator() {
  const [currency, setCurrency] = useState<'PHP' | 'USD'>('PHP')
  const [selectedType, setSelectedType] = useState<string>('technical-sprint')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
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
      total = Math.max(0.5, total * 0.7)
    }

    return Math.round(total * 10) / 10
  }, [activeProject, selectedAddons, isAccelerated])

  const estimatedCost = useMemo(() => {
    const isPhp = currency === 'PHP'
    let base = isPhp ? activeProject.basePricePhp : activeProject.basePriceUsd
    selectedAddons.forEach((addonId) => {
      const addon = CAPABILITIES.find((c) => c.id === addonId)
      if (addon) {
        base += isPhp ? addon.pricePhp : addon.priceUsd
      }
    })

    if (isAccelerated) {
      base *= 1.2
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
          Configure your requirements to estimate sprint delivery timelines, add-on deliverables, and transparent pricing.
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
                1. Choose Core Offer
              </label>

              {/* Currency Toggle */}
              <div className="inline-flex items-center p-1 rounded-xl bg-surface-2 border border-black/10 dark:border-white/10 text-xs">
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
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map((type) => {
                const isSelected = selectedType === type.id
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-primary-container/10 border-primary-container shadow-[0_0_20px_rgba(224,123,32,0.15)] ring-1 ring-primary-container'
                        : 'bg-surface-2/60 border-black/10 dark:border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="font-heading text-sm font-bold text-on-surface block mb-1">
                        {type.name}
                      </span>
                      <span className="font-sans text-xs text-on-surface/70 leading-relaxed block line-clamp-2">
                        {type.description}
                      </span>
                    </div>
                    <span className="font-heading text-xs font-bold text-primary-container mt-3 block">
                      From {currency === 'PHP' ? `₱${type.basePricePhp.toLocaleString()}` : `$${type.basePriceUsd}`}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Add-On Capabilities */}
          <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
            <label className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] font-semibold block">
              2. Optional Add-On Deliverables
            </label>

            <div className="space-y-2.5">
              {CAPABILITIES.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id)
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`w-full p-3.5 sm:p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                      isChecked
                        ? 'bg-primary-container/10 border-primary-container/80 ring-1 ring-primary-container/40'
                        : 'bg-surface-2/50 border-black/10 dark:border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                          isChecked
                            ? 'bg-primary-container border-primary-container text-on-primary-container'
                            : 'border-white/20 bg-surface-1'
                        }`}
                      >
                        {isChecked && <Icon name="check" size={14} />}
                      </div>
                      <div>
                        <span className="font-heading text-sm font-bold text-on-surface block">
                          {addon.name}
                        </span>
                        <span className="font-sans text-xs text-on-surface/70 leading-relaxed">
                          {addon.description}
                        </span>
                      </div>
                    </div>

                    <span className="font-heading text-xs font-bold text-primary-container shrink-0">
                      +{currency === 'PHP' ? `₱${addon.pricePhp.toLocaleString()}` : `$${addon.priceUsd}`}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 3: Priority Sprint Schedule */}
          <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-4">
            <div>
              <span className="font-heading text-xs font-bold text-on-surface block">
                Expedited Sprint Delivery
              </span>
              <span className="font-sans text-xs text-on-surface/70">
                Prioritized schedule targeting 30% faster deliverable completion (+20% sprint rate).
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsAccelerated(!isAccelerated)}
              className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                isAccelerated ? 'bg-primary-container' : 'bg-surface-3 border border-white/10'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  isAccelerated ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Column: Estimated Summary Card (5 Cols Sticky) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6 motion-reveal">
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 backdrop-blur-xl border border-primary-container/40 shadow-[0_0_50px_rgba(224,123,32,0.15)] space-y-6">
            <div className="flex items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="font-heading text-[10px] uppercase tracking-wider text-primary-container font-bold block">
                  Configuration Summary
                </span>
                <h3 className="font-heading text-lg font-bold text-on-surface">
                  {activeProject.name}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-heading font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Transparent
              </span>
            </div>

            {/* Price & Timeline Counters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-2/70 border border-black/10 dark:border-white/5">
                <span className="font-sans text-xs text-on-surface/70 block mb-1">
                  Estimated Rate
                </span>
                <span className="font-heading text-2xl sm:text-3xl font-extrabold text-primary-container">
                  {currency === 'PHP' ? `₱${estimatedCost.toLocaleString()}` : `$${estimatedCost.toLocaleString()}`}
                </span>
                <span className="text-[10px] font-sans text-on-surface/60 block mt-0.5">
                  {currency === 'PHP' ? 'Philippine Pesos' : 'USD Equivalent'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-surface-2/70 border border-black/10 dark:border-white/5">
                <span className="font-sans text-xs text-on-surface/70 block mb-1">
                  Estimated Timeline
                </span>
                <span className="font-heading text-2xl sm:text-3xl font-extrabold text-on-surface">
                  {estimatedWeeks === 0.5 ? '2-3 Days' : `${estimatedWeeks} ${estimatedWeeks === 1 ? 'Week' : 'Weeks'}`}
                </span>
                <span className="text-[10px] font-sans text-on-surface/60 block mt-0.5">
                  Delivery Sprint
                </span>
              </div>
            </div>

            {/* Selected Breakdown Items */}
            <div className="space-y-2 pt-2 border-t border-black/10 dark:border-white/10 text-xs font-sans text-on-surface/80">
              <div className="flex justify-between">
                <span>Base Deliverables</span>
                <span className="font-semibold text-on-surface">
                  {currency === 'PHP' ? `₱${activeProject.basePricePhp.toLocaleString()}` : `$${activeProject.basePriceUsd}`}
                </span>
              </div>
              {selectedAddons.map((addonId) => {
                const addon = CAPABILITIES.find((c) => c.id === addonId)
                if (!addon) return null
                return (
                  <div key={addonId} className="flex justify-between text-on-surface/70">
                    <span className="truncate pr-2">+ {addon.name}</span>
                    <span className="font-medium text-primary-container shrink-0">
                      {currency === 'PHP' ? `₱${addon.pricePhp.toLocaleString()}` : `$${addon.priceUsd}`}
                    </span>
                  </div>
                )
              })}
              {isAccelerated && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Expedited Sprint (+20%)</span>
                  <span>Active</span>
                </div>
              )}
            </div>

            {/* Recommended Package Notice */}
            <div className="p-3 rounded-xl bg-primary-container/10 border border-primary-container/20 text-xs font-sans text-on-surface/80">
              <strong className="font-heading font-bold text-primary-container uppercase text-[10px] tracking-wider block mb-0.5">
                Matching Offer Tier:
              </strong>
              <span>{activeProject.recommendedPackage}</span>
            </div>

            {/* Book Estimated Scope Action */}
            <Link
              href={`/contact/?service=${encodeURIComponent(activeProject.serviceParam)}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] py-4 rounded-xl shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:bg-primary btn-motion min-h-[48px] focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <span>Discuss This Scope</span>
              <Icon name="arrow_forward" size={16} className="btn-icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesScopeEstimator

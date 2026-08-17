'use client'

import React, { useState } from 'react'
import { Icon } from '@/components/icons'

interface WorkflowStep {
  step: string
  title: string
  desc: string
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Discovery & Technical Access',
    desc: 'GA4, GSC, CMS & competitor data onboarding',
  },
  {
    step: '02',
    title: 'Baseline Benchmarking',
    desc: 'Capturing organic rankings, AI citations & Core Web Vitals',
  },
  {
    step: '03',
    title: 'Agile Execution Sprints',
    desc: 'Bi-weekly technical, semantic & on-page optimizations',
  },
  {
    step: '04',
    title: 'Transparent Reporting',
    desc: 'Live Looker Studio access + monthly Loom breakdowns',
  },
]

interface FAQItem {
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    question: 'What is the difference between traditional SEO, AEO, and GEO?',
    answer:
      'Traditional SEO ranks your links on Google search result pages. AEO (Answer Engine Optimization) structures content to win Featured Snippets and voice answers. GEO (Generative Engine Optimization) optimizes facts, entities, and citations so AI models (ChatGPT, Perplexity, Google AI Overviews) mention and recommend your brand in generated answers.',
  },
  {
    question: 'Can you optimize my existing website, or do I need a new build?',
    answer:
      'We can audit and optimize your existing site directly. If your current CMS is severely bloated or slow, we will provide specific recommendations on whether a rebuild or technical refactor is most cost-effective.',
  },
  {
    question: 'Why choose a static site over WordPress (or vice versa)?',
    answer:
      'Static sites offer unmatched speed, bulletproof security, and zero maintenance overhead. WordPress offers unmatched flexibility and an easy content management dashboard for non-technical teams. We build both cleanly.',
  },
  {
    question: 'How do you track and report progress?',
    answer:
      'You get 24/7 access to a custom Looker Studio dashboard tracking organic traffic, keyword movement, and conversions, supported by monthly video walkthroughs.',
  },
]

export function ServicesWorkflowAndFAQ() {
  const [openIndices, setOpenIndices] = useState<number[]>([0])

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. 4-Step Delivery Process */}
      <section
        id="workflow"
        aria-labelledby="workflow-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="max-w-3xl">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
            HOW WE WORK
          </span>
          <h2
            id="workflow-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            4-Step Delivery Workflow
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            A structured, agile sprint process designed for rapid momentum, zero guesswork, and measurable ROI.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 sm:p-7 rounded-2xl bg-[#181a1b]/90 border border-white/5 hover:border-primary-container/40 transition-all duration-300 group flex flex-col justify-between relative shadow-lg"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="font-heading text-2xl sm:text-3xl font-black text-primary-container/90 group-hover:text-primary transition-colors">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-on-surface/50 px-2.5 py-0.5 rounded-full bg-white/5">
                    Phase 0{idx + 1}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface mb-2 leading-snug">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="font-sans text-xs sm:text-sm text-on-surface/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Progress Indicator line */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-primary-container">
                <Icon name="check_circle" size={14} />
                <span className="text-[11px] font-heading font-semibold uppercase tracking-wider">
                  Deliverable Sprint
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Accessible FAQ Accordion */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="relative z-20 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto space-y-8 sm:space-y-12"
      >
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-heading text-xs text-primary-container uppercase tracking-widest block mb-2 font-bold">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2
            id="faq-heading"
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-on-surface mb-3 sm:mb-4 tracking-tight"
          >
            Clear Answers to Common Questions
          </h2>
          <p className="font-sans text-on-surface/75 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our SEO, AEO, GEO, and web development process.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndices.includes(index)
            const questionId = `faq-q-${index}`
            const answerId = `faq-a-${index}`

            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-[#181a1b] border-primary-container/40 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                    : 'bg-[#181a1b]/70 border-white/5 hover:border-white/15'
                }`}
              >
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container rounded-2xl"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-on-surface leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-primary-container text-on-primary-container'
                        : 'bg-white/5 text-on-surface/70'
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-on-surface/80 font-sans text-xs sm:text-sm leading-relaxed border-t border-white/5 mt-1"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default ServicesWorkflowAndFAQ

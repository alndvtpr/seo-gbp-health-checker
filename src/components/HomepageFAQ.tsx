'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: 'What do you need from me to get started on an SEO sprint or audit?',
    answer:
      'For technical audits and SEO sprints, all that is needed is your website URL, brief target goals, and view access to Google Search Console or Google Analytics if available. If access is not available, initial crawl diagnostics can be performed using public technical signals.',
  },
  {
    question: 'How does agency overflow support work?',
    answer:
      'Agencies assign discrete tasks or backlog tickets, such as technical SEO audits, schema markup implementation, on-page heading optimizations, or WordPress/Next.js fixes. Work is executed against your specifications and delivered with documented task logs.',
  },
  {
    question: 'Can you work on my existing WordPress or Next.js website?',
    answer:
      'Yes. Improvements can be implemented directly on your existing WordPress theme, builder (Elementor), or Next.js repository. For codebase changes, updates are typically prepared via Git staging branches or safe backup procedures.',
  },
  {
    question: 'How do you track and report completed tasks?',
    answer:
      'Every project includes direct communication and a clear deliverable log. You receive step-by-step documentation of all implemented fixes, schema validation results, and Core Web Vitals checks upon completion.',
  },
  {
    question: 'Do you offer flexible scopes for smaller business budgets?',
    answer:
      'Yes. Projects are structured around clearly scoped deliverables (such as a 1-week Technical SEO Sprint or a focused local citation setup), allowing small businesses to get high-impact foundations without expensive agency retainers.',
  },
]

export const HomepageFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 relative z-20">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 motion-reveal">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-heading text-xs font-semibold uppercase tracking-[0.08em] mb-4">
          <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Common Questions</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-3 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="font-sans text-sm sm:text-base text-on-surface/75 leading-relaxed">
          Straightforward answers about scope, collaboration, and what it is like to work with me.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {HOMEPAGE_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx
          return (
            <div
              key={faq.question}
              className="rounded-xl sm:rounded-2xl bg-surface-1/90 backdrop-blur-md border border-black/10 dark:border-white/10 hover:border-primary-container/40 transition-colors overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
              >
                <span className="font-heading text-base sm:text-lg font-bold text-on-surface">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary-container shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 animate-in fade-in duration-200">
                  <p className="font-sans text-sm sm:text-base text-on-surface/80 leading-relaxed border-t border-black/5 dark:border-white/5 pt-3">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

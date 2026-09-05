import React from 'react'
import { Icon } from '@/components/icons'
import { PROCESS_STAGES, HOMEPAGE_FAQS } from '../data/homeData'

export const EngagementProcessSection = () => {
  return (
    <section className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-16">
      <div className="mx-auto max-w-3xl text-center motion-reveal">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">
          Engagement process
        </span>
        <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-5xl">
          Three stages from scope to handoff
        </h2>
      </div>

      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {PROCESS_STAGES.map((stage, index) => (
          <li
            key={stage.number}
            style={{ transitionDelay: `${index * 70}ms` }}
            className="motion-reveal border-t border-primary-container/40 pt-5"
          >
            <span className="font-heading text-xs font-bold text-primary-container">{stage.number}</span>
            <h3 className="mt-2 font-heading text-xl font-bold text-on-surface">{stage.title}</h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-on-surface/75">{stage.description}</p>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-14 max-w-4xl">
        <h3 className="font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
          Common questions before starting
        </h3>
        <div className="mt-6 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
          {HOMEPAGE_FAQS.map((faq) => (
            <details key={faq.question} className="group py-1">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-base font-bold text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container sm:text-lg">
                {faq.question}
                <Icon
                  name="add"
                  size={20}
                  className="shrink-0 text-primary-container transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="max-w-3xl pb-5 pr-8 font-sans text-sm leading-relaxed text-on-surface/75 sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

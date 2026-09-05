import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'
import { STARTING_OFFERS } from '../data/homeData'

export const StartingOffersSection = () => {
  return (
    <section className="relative z-20 border-y border-primary-container/15 bg-surface-1/35 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-16">
        <div className="mx-auto max-w-3xl text-center motion-reveal">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">
            Starting offers
          </span>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-5xl">
            Choose the scope that matches the work
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-on-surface/75 sm:text-base">
            Each starting point names the main deliverable and the boundary before a project begins. Full inclusions and the scope estimator remain on Services.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {STARTING_OFFERS.map((offer, index) => (
            <article
              key={offer.title}
              style={{ transitionDelay: `${index * 60}ms` }}
              className="card-interactive-glow motion-reveal flex flex-col justify-between border border-black/10 bg-surface-1/95 p-6 dark:border-white/10 sm:p-7"
            >
              <div>
                <p className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container">
                  {offer.price}
                </p>
                <h3 className="mt-2 font-heading text-xl font-bold text-on-surface sm:text-2xl">{offer.title}</h3>
                <dl className="mt-6 space-y-4 font-sans text-sm leading-relaxed">
                  <div>
                    <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-on-surface">Best for</dt>
                    <dd className="mt-1 text-on-surface/75">{offer.audience}</dd>
                  </div>
                  <div>
                    <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-on-surface">Main deliverable</dt>
                    <dd className="mt-1 text-on-surface/75">{offer.deliverable}</dd>
                  </div>
                  <div>
                    <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-on-surface">Scope boundary</dt>
                    <dd className="mt-1 text-on-surface/75">{offer.boundary}</dd>
                  </div>
                </dl>
              </div>
              <Link
                href="/services/#packages"
                className="mt-6 inline-flex min-h-[46px] items-center gap-2 self-start font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
              >
                View full offer details <Icon name="arrow_forward" size={15} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

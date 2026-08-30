import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Page as PayloadPage } from '@/payload-types'
import { RenderBlocks } from '@/components/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ScrollHero } from '@/components/ScrollHero'
import { ToolsMarquee } from '@/components/ToolsMarquee'
import { Icon } from '@/components/icons'
import { PROJECTS } from '@/data/projects'
import { generateMetadata, serializeJsonLd } from '@/lib/seo'

export const metadata = generateMetadata({
  title: 'SEO Specialist & Web Developer Philippines | Alain Dave Tapiru',
  description:
    'Alain Dave Tapiru handles technical SEO, local search setup, on-page improvements, and WordPress or Next.js fixes for small businesses and agencies through clearly scoped projects.',
  url: 'https://www.alaintapiru.com/',
})

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://www.alaintapiru.com/#profilepage',
  url: 'https://www.alaintapiru.com/',
  name: 'Alain Dave G. Tapiru - Profile',
  isPartOf: { '@id': 'https://www.alaintapiru.com/#website' },
  about: { '@id': 'https://www.alaintapiru.com/#person' },
  mainEntity: { '@id': 'https://www.alaintapiru.com/#person' },
}

const STARTING_OFFERS = [
  {
    title: 'SEO & AI Readiness Sprint',
    price: '₱15,500 ($280 USD)',
    audience: 'Businesses that need one website diagnosed before committing to ongoing work.',
    deliverable:
      'Technical crawl diagnostics, schema implementation, search-intent review, and a prioritized 30-day action blueprint.',
    boundary: 'One scoped audit and roadmap; ongoing monthly implementation is separate.',
  },
  {
    title: 'WordPress High-Speed Business Site',
    price: '₱27,000 ($480 USD)',
    audience: 'Small businesses that need an editable, search-ready website foundation.',
    deliverable:
      'A responsive WordPress theme, technical SEO and schema setup, speed and security configuration, analytics, and handoff.',
    boundary: 'One business website build; custom application features are scoped separately.',
  },
  {
    title: 'Custom Next.js & React Architecture',
    price: '₱48,000 ($850 USD)',
    audience: 'Founders or teams that need a code-first website with custom front-end requirements.',
    deliverable:
      'A Next.js and React build with a structured component system, image pipeline, performance work, and schema implementation.',
    boundary: 'One custom web project; ongoing content and SEO support are separate.',
  },
  {
    title: 'Ongoing Monthly SEO Support',
    price: '₱25,000 / mo ($450 USD / mo)',
    audience: 'Businesses or agencies with a defined recurring technical, on-page, or local SEO backlog.',
    deliverable:
      'Twenty to twenty-five hours per month of agreed SEO implementation, review calls, reporting, and activity logs.',
    boundary: 'Major website rebuilds and third-party service costs are outside the base monthly scope.',
  },
] as const

const PROCESS_STAGES = [
  {
    number: '01',
    title: 'Agree the scope',
    description:
      'You and I define the problem, required access, deliverables, exclusions, timing, and price before work begins.',
  },
  {
    number: '02',
    title: 'Implement the agreed work',
    description:
      'I complete the approved audit, SEO tasks, or website changes and keep the work inside the agreed boundary.',
  },
  {
    number: '03',
    title: 'Document and hand off',
    description:
      'You receive a record of completed work, validation results, and the next actions that remain optional.',
  },
] as const

const HOMEPAGE_FAQS = [
  {
    question: 'What do you need from me to start an SEO sprint or health check?',
    answer:
      'Your website URL, the problem you want reviewed, and access to Google Search Console or Google Analytics when available. Public technical signals can support an initial review when account access is unavailable.',
  },
  {
    question: 'How does agency overflow support work?',
    answer:
      'Your team assigns a defined ticket or backlog item, such as a technical audit, schema implementation, on-page update, or WordPress or Next.js fix. The task is delivered against your specification with a documented work log.',
  },
  {
    question: 'Can you work on an existing WordPress or Next.js website?',
    answer:
      'Yes. The scope can cover an existing WordPress theme or builder, or an established Next.js repository. Access, backup, staging, and review requirements are agreed before changes begin.',
  },
  {
    question: 'How will I know what was completed?',
    answer:
      'Each engagement includes a deliverable record describing the work completed, the checks performed, any limitations found, and the recommended next step.',
  },
] as const

export default async function Page() {
  let page: PayloadPage | null = null

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'index',
        },
      },
    })
    page = docs[0] ?? null
  } catch {
    // Graceful offline/paused DB fallback: core portfolio sections are statically rendered below.
    page = null
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
      />
      <LivePreviewListener />

      {/* 1. Hero */}
      <section id="home" className="relative">
        <ScrollHero />
      </section>

      {/* 2. Tools & Infinite Marquee */}
      <ToolsMarquee />

      {/* 3. Personal fit */}
      <section className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-16">
        <div className="max-w-3xl motion-reveal">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">
            Personal fit
          </span>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-5xl">
            Focused support for a defined problem or backlog
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-on-surface/75 sm:text-base">
            I work directly with small businesses and delivery teams that need a specific SEO or website task diagnosed, implemented, and handed off without adding an agency layer.
          </p>
        </div>

        <div className="mt-10 grid border-y border-black/10 dark:border-white/10 md:grid-cols-2">
          <div className="py-8 md:pr-10">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.08em] text-primary-container">
              Small businesses &amp; founders
            </p>
            <h3 className="mt-3 font-heading text-xl font-bold text-on-surface sm:text-2xl">
              A good fit when one website problem needs a clear starting point
            </h3>
            <ul className="mt-5 space-y-3 font-sans text-sm leading-relaxed text-on-surface/80 sm:text-base">
              <li className="flex gap-3"><Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-primary-container" />Your site needs a technical or on-page baseline.</li>
              <li className="flex gap-3"><Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-primary-container" />Your local search setup needs a structured review.</li>
              <li className="flex gap-3"><Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-primary-container" />You need a focused WordPress or Next.js fix or build.</li>
            </ul>
          </div>

          <div className="border-t border-black/10 py-8 dark:border-white/10 md:border-l md:border-t-0 md:pl-10">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-500">
              Agencies &amp; web teams
            </p>
            <h3 className="mt-3 font-heading text-xl font-bold text-on-surface sm:text-2xl">
              A good fit when the backlog already has a defined owner and outcome
            </h3>
            <ul className="mt-5 space-y-3 font-sans text-sm leading-relaxed text-on-surface/80 sm:text-base">
              <li className="flex gap-3"><Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-500" />A technical SEO ticket needs implementation capacity.</li>
              <li className="flex gap-3"><Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-500" />Schema or on-page updates need documented delivery.</li>
              <li className="flex gap-3"><Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-500" />A WordPress or Next.js backlog item needs focused support.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Starting offers */}
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

      {/* 4. Sample deliverable */}
      <section className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-16">
        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="motion-reveal">
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">
              Sample deliverable
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-5xl">
              What a useful technical finding looks like
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-on-surface/75 sm:text-base">
              This is a real issue found and resolved on AlainTapiru.com during the repository review. It shows the level of context included with a scoped finding.
            </p>
          </div>

          <article className="card-interactive-glow motion-reveal overflow-hidden border border-black/10 bg-surface-1/95 dark:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-5 py-4 dark:border-white/10 sm:px-7">
              <span className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-on-surface">
                Internal anchor mismatch
              </span>
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-heading text-[11px] font-bold uppercase tracking-[0.06em] text-emerald-700 dark:text-emerald-500">
                Resolved
              </span>
            </div>
            <dl className="divide-y divide-black/10 px-5 dark:divide-white/10 sm:px-7">
              <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
                <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container">Issue</dt>
                <dd className="font-sans text-sm leading-relaxed text-on-surface/80">The homepage linked to <code>/services/#estimator</code>, while the actual estimator ID is <code>scope-estimator</code>.</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
                <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container">Why it matters</dt>
                <dd className="font-sans text-sm leading-relaxed text-on-surface/80">The route loaded, but the visitor did not land on the promised tool, adding friction to the service-evaluation path.</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
                <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container">Priority</dt>
                <dd className="font-sans text-sm leading-relaxed text-on-surface/80">Medium — the page remained available, but the intended destination failed.</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
                <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container">Recommended action</dt>
                <dd className="font-sans text-sm leading-relaxed text-on-surface/80">Align the homepage link with the existing section ID instead of renaming the reusable estimator component.</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
                <dt className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container">Verification</dt>
                <dd className="font-sans text-sm leading-relaxed text-on-surface/80">Confirm the link resolves to <Link href="/services/#scope-estimator" className="font-semibold text-primary-container underline decoration-primary-container/40 underline-offset-4">the live scope estimator</Link> and remains keyboard accessible.</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      {/* 5. Selected work */}
      <section className="relative z-20 border-y border-primary-container/15 bg-surface-1/35 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between motion-reveal">
            <div>
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">Selected work</span>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-5xl">Three real implementation projects</h2>
            </div>
            <Link href="/projects/" className="inline-flex min-h-[44px] items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container">
              View all projects <Icon name="arrow_forward" size={15} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PROJECTS.map((project, index) => (
              <article key={project.slug} style={{ transitionDelay: `${index * 70}ms` }} className="card-interactive-glow motion-reveal overflow-hidden border border-black/10 bg-surface-1/95 dark:border-white/10">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                  <Image src={project.image} alt={project.imageAlt ?? `${project.title} project preview`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top transition-transform duration-[var(--motion-slow)] ease-[var(--ease-organic)] hover:scale-[1.02]" />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md border border-primary-container/30 bg-primary-container/10 px-2 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.06em] text-primary-container">{project.proofLabel}</span>
                    <span className="font-sans text-xs text-on-surface/60">{project.status}</span>
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-on-surface">{project.title}</h3>
                  <p className="mt-2 font-sans text-sm font-medium leading-relaxed text-on-surface/85">Role: {project.exactRole}</p>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-on-surface/70">{project.workCompleted[0]}</p>
                  <Link href={`/projects/${project.slug}/`} className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.06em] text-primary-container hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container">
                    View project breakdown <Icon name="arrow_forward" size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Engagement process and objections */}
      <section className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-16">
        <div className="mx-auto max-w-3xl text-center motion-reveal">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">Engagement process</span>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-5xl">Three stages from scope to handoff</h2>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {PROCESS_STAGES.map((stage, index) => (
            <li key={stage.number} style={{ transitionDelay: `${index * 70}ms` }} className="motion-reveal border-t border-primary-container/40 pt-5">
              <span className="font-heading text-xs font-bold text-primary-container">{stage.number}</span>
              <h3 className="mt-2 font-heading text-xl font-bold text-on-surface">{stage.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-on-surface/75">{stage.description}</p>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-14 max-w-4xl">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">Common questions before starting</h3>
          <div className="mt-6 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
            {HOMEPAGE_FAQS.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-base font-bold text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container sm:text-lg">
                  {faq.question}
                  <Icon name="add" size={20} className="shrink-0 text-primary-container transition-transform group-open:rotate-45" />
                </summary>
                <p className="max-w-3xl pb-5 pr-8 font-sans text-sm leading-relaxed text-on-surface/75 sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="relative z-20 mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24 md:px-16">
        <div className="card-interactive-glow motion-reveal border border-primary-container/30 bg-surface-1/95 p-6 sm:p-10 md:p-12">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.08em] text-primary-container">A defined first step</span>
          <h2 className="mx-auto mt-2 max-w-3xl font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl md:text-5xl">Start with a free Website Health Check</h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-on-surface/75 sm:text-base">Share the website and concern you want reviewed. The request form captures the context needed to evaluate a useful starting scope.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/tools/#website-audit" data-agent-action="request-health-check" className="btn-motion flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-primary-container px-8 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.06em] text-on-primary-container shadow-[0_0_25px_rgba(224,123,32,0.25)] hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container sm:w-auto">
              Request a Website Health Check <Icon name="arrow_forward" size={16} className="btn-icon" />
            </Link>
            <a href="mailto:alaintapiru@gmail.com" className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-black/15 bg-surface-1 px-7 py-3.5 font-heading text-xs font-semibold uppercase tracking-[0.06em] text-on-surface hover:border-primary-container/50 hover:text-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container dark:border-white/20 sm:w-auto">
              Email Alain directly <Icon name="mail" size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Preserve any approved CMS-managed homepage blocks without adding another semantic section. */}
      {page?.layout != null && page.layout.length > 0 && (
        <div className="relative z-20 mx-auto max-w-7xl px-8 py-12" aria-label="Additional homepage content">
          <RenderBlocks blocks={page.layout as { blockType: string; [key: string]: unknown }[]} />
        </div>
      )}
    </>
  )
}

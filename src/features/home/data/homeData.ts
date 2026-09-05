import type { StartingOffer, ProcessStage, HomepageFaq } from '../types'

export const STARTING_OFFERS: readonly StartingOffer[] = [
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

export const PROCESS_STAGES: readonly ProcessStage[] = [
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

export const HOMEPAGE_FAQS: readonly HomepageFaq[] = [
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

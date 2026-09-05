export interface ServiceDeliverableArea {
  id: string
  title: string
  icon: string
  description: string
  deliverables: string[]
}

export interface ServiceProblem {
  title: string
  problem: string
  solution: string
}

export interface ServiceWorkflowStep {
  step: string
  title: string
  desc: string
}

export interface ServiceFaq {
  question: string
  answer: string
}

export interface RelatedService {
  title: string
  desc: string
  href: string
  badge: string
}

export interface ServiceSubpageData {
  slug: string
  badge: string
  heroTitle: string
  heroLead: string
  primaryCtaText?: string
  primaryCtaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  deliverablesEyebrow: string
  deliverablesTitle: string
  deliverablesSubtitle: string
  deliverables: ServiceDeliverableArea[]
  problemsEyebrow: string
  problemsTitle: string
  problemsSubtitle: string
  problems: ServiceProblem[]
  workflowEyebrow: string
  workflowTitle: string
  workflowSubtitle: string
  workflowSteps: ServiceWorkflowStep[]
  techStackEyebrow: string
  techStackTitle: string
  techStackSubtitle: string
  techStack: string[]
  faqsEyebrow: string
  faqsTitle: string
  faqsSubtitle: string
  faqs: ServiceFaq[]
  relatedEyebrow: string
  relatedTitle: string
  relatedServices: RelatedService[]
  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButtonText: string
  ctaButtonHref: string
}

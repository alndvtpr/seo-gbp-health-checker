import React from 'react'
import Link from 'next/link'
import { Icon } from '@/components/icons'

export function OpenToOpportunities() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto text-center relative z-20">
      <div className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-surface-1/80 border border-primary-container/30 shadow-[0_0_50px_rgba(230,126,34,0.1)] motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] mb-2 block font-semibold">
          Collaboration &amp; Execution Capacity
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-on-surface mb-4 sm:mb-6 tracking-tight">
          Available for Overflow Work, Sprints &amp; Team Support
        </h2>
        <div className="font-sans text-on-surface/80 max-w-2xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            If you run an SEO agency, web development team, or digital business with fluctuating client workloads, I am available to take on discrete backlog tickets, technical audits, and implementation tasks without requiring a long-term fixed commitment.
          </p>
          <p>
            I built the technical architecture, custom diagnostic tools, and Next.js frontend on this site from scratch, applying the same structured problem-solving and AI-assisted workflows I bring to client deliverables.
          </p>
          <p>
            Whether you need extra execution capacity for client sprints, structured data implementation, or website optimization, I am ready to take on a single task and let the work speak for itself.
          </p>
        </div>

        <div className="inline-flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          <Link
            href="/contact/"
            className="w-full sm:w-auto min-h-[48px] bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-[0.06em] px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_30px_rgba(230,126,34,0.4)] hover:bg-primary btn-motion flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            Discuss a Task or Project <Icon name="handshake" size={16} className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  )
}

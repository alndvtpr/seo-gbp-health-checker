import React from 'react'
import Link from 'next/link'

export function OpenToOpportunities() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto text-center relative z-20">
      <div className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-[#181a1b]/40 border border-primary-container/30 shadow-[0_0_50px_rgba(230,126,34,0.1)]">
        <span className="font-heading text-xs text-primary-container uppercase tracking-widest mb-2 block font-bold">
          Open To Opportunities
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface mb-4 sm:mb-6">
          Open To Internships &amp; Apprenticeships
        </h2>
        <div className="font-sans text-on-surface/70 max-w-2xl mx-auto mb-8 sm:mb-10 text-xs sm:text-sm leading-relaxed space-y-4">
          <p>
            Most of this page exists to convince you to hire me for a project. This part is different.
          </p>
          <p>
            I built the SEO structure, the Next.js frontend, and the tools on this site mostly on my own, using the same AI-assisted workflows I&apos;d bring into your team. What I don&apos;t have yet is a room full of people doing this work at scale , that&apos;s the piece I&apos;m after.
          </p>
          <p>
            If you run an SEO, web dev, or virtual assistance program and have a seat open, I&apos;d like to talk. Internship, apprenticeship, trial project, I&apos;m not picky about the label.
          </p>
        </div>

        <div className="inline-flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto min-h-[48px] bg-primary-container text-on-primary-container font-heading text-xs font-bold uppercase tracking-widest px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_30px_rgba(230,126,34,0.5)] hover:bg-primary hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            Let&apos;s Talk <span className="material-symbols-outlined text-sm">handshake</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

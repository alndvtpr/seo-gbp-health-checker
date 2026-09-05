import React from 'react'
import { Icon } from '@/components/icons'

export function ResumeSummary() {
  return (
    <section className="space-y-3 motion-reveal" aria-labelledby="summary-heading">
      <div className="flex items-center gap-2">
        <Icon name="description" size={18} className="text-primary-container" />
        <h2 id="summary-heading" className="font-heading text-lg sm:text-xl font-bold text-on-surface tracking-tight">
          Professional Summary
        </h2>
      </div>
      <div className="bg-surface-1 rounded-2xl border border-black/10 dark:border-white/10 p-5 sm:p-6 shadow-xs leading-relaxed">
        <p className="font-sans text-sm sm:text-[15px] text-on-surface/85 leading-relaxed">
          Detail-oriented virtual assistant with over a year of hands-on experience across customer support, solid skills &amp; knowledge in SEO, and AI-assisted web design, gained through BPO, freelance, and bootcamp work. Works independently and communicates clearly with clients, asking the right questions early and following through until tasks are complete. Comfortable across SEO and web tools including Ahrefs, SEMrush, Screaming Frog, WordPress, and Google Analytics, plus AI tools such as ChatGPT, Claude, and Gemini for research and workflow support. Adapts quickly to new systems and processes, bringing consistent attention to detail and reliable, well-organized output. Looking to bring that resourcefulness to a full-time virtual assistant role supporting a digital agency across SEO, web, and client-facing work.
        </p>
      </div>
    </section>
  )
}

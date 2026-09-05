import React from 'react'
import { Icon } from '@/components/icons'

export function AboutFitSection() {
  return (
    <section className="space-y-8 motion-reveal">
      <div className="text-center max-w-2xl mx-auto">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          Client Compatibility &amp; Expectations
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-3 tracking-tight">
          Is Alain the Right Partner for Your Project?
        </h2>
        <p className="font-sans text-sm sm:text-base text-on-surface/75 leading-relaxed">
          Clear expectations ensure great collaboration. Here is an honest breakdown of where I deliver high value and where other specialists may be better suited.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Best Fit For */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-emerald-500/30 shadow-lg space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-500 flex items-center justify-center shrink-0">
              <Icon name="check_circle" size={20} />
            </div>
            <div>
              <span className="font-heading text-[11px] text-emerald-700 dark:text-emerald-500 font-bold uppercase tracking-wider block">
                Ideal Collaboration
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
                Best Fit For
              </h3>
            </div>
          </div>

          <ul className="space-y-3.5 font-sans text-xs sm:text-sm text-on-surface/80">
            <li className="flex items-start gap-2.5">
              <Icon name="check" size={16} className="text-emerald-700 dark:text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Small Service Businesses &amp; Founders:</strong> Need clear technical SEO audits, on-page content optimization, or Google Business Profile setup without complicated contracts or agency overhead.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="check" size={16} className="text-emerald-700 dark:text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Digital Marketing Agencies:</strong> Need a dependable, communicative contractor to handle technical audit backlogs, site fixes, and schema tasks at fixed sprint or hourly rates (₱500/hr).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="check" size={16} className="text-emerald-700 dark:text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>WordPress &amp; Next.js Website Owners:</strong> Want faster loading speeds, clean semantic structure, mobile usability fixes, and improved crawlability and clearer indexation signals for search engines.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="check" size={16} className="text-emerald-700 dark:text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Clients Valuing Direct Communication:</strong> Prefer working one-on-one with the person actually auditing and coding the site, with clear deliverables and documentation.
              </span>
            </li>
          </ul>
        </div>

        {/* Not the Right Fit Yet */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-amber-500/30 shadow-lg space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-500 flex items-center justify-center shrink-0">
              <Icon name="close" size={20} />
            </div>
            <div>
              <span className="font-heading text-[11px] text-amber-700 dark:text-amber-500 font-bold uppercase tracking-wider block">
                Honest Scope Boundaries
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
                Not the Right Fit Yet
              </h3>
            </div>
          </div>

          <ul className="space-y-3.5 font-sans text-xs sm:text-sm text-on-surface/80">
            <li className="flex items-start gap-2.5">
              <Icon name="close" size={16} className="text-amber-700 dark:text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Enterprise Scale &amp; High-Risk Migrations:</strong> Websites with hundreds of thousands of dynamic URLs, complex database migrations, or multi-region enterprise IT stacks.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="close" size={16} className="text-amber-700 dark:text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Guaranteed #1 Rankings Demands:</strong> Anyone seeking contractual guarantees on search positions or overnight traffic spikes that violate search engine guidelines.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="close" size={16} className="text-amber-700 dark:text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Mass PBN / Aggressive Link Building Schemes:</strong> Automated link networks, spammy directory blasts, or manipulative backlink schemes.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="close" size={16} className="text-amber-700 dark:text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Full-Service Paid Advertising Agencies:</strong> Large-scale Google Ads / Meta Ads budget management outside of organic search and website technical support.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

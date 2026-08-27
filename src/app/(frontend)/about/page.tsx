import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateMetadata } from '@/lib/seo'
import { Icon } from '@/components/icons'
import { AboutCredentials } from '@/components/AboutCredentials'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = generateMetadata({
  title: 'About Alain Dave Tapiru | Practical SEO & Web Support Philippines',
  description:
    'Learn more about Alain Dave Tapiru. Practical SEO and website support for small businesses and agencies. Background, hands-on projects, and technical skills.',
  url: 'https://www.alaintapiru.com/about/',
})

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.alaintapiru.com/about/#webpage',
      url: 'https://www.alaintapiru.com/about/',
      name: 'About Alain Dave Tapiru | Practical SEO & Web Support Philippines',
      description:
        'Learn more about Alain Dave Tapiru. Practical SEO and website support for small businesses and agencies. Background, hands-on projects, and technical skills.',
      isPartOf: {
        '@id': 'https://www.alaintapiru.com/#website',
      },
      about: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      mainEntity: {
        '@id': 'https://www.alaintapiru.com/#person',
      },
      breadcrumb: {
        '@id': 'https://www.alaintapiru.com/about/#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.alaintapiru.com/about/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.alaintapiru.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: 'https://www.alaintapiru.com/about/',
        },
      ],
    },
  ],
}

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-20">
      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'About', url: '/about/' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto motion-reveal">
        <span className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] block mb-2 font-semibold">
          Biography &amp; Professional Background
        </span>
        <h1 className="font-heading text-2xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 sm:mb-6 tracking-tight">
          Practical SEO &amp; Website Support for Growing Businesses
        </h1>
        <p className="font-sans text-on-surface/80 text-sm sm:text-base leading-relaxed">
          I help small business owners and digital agency teams fix technical website errors, optimize local search presence, and improve organic crawlability with clear scopes, predictable rates, and direct communication.
        </p>
      </div>

      {/* Main Grid: Portrait & Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left: Modern Editorial Portrait Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 motion-reveal">
          <div className="relative w-full max-w-md mx-auto lg:max-w-none">
            {/* Ambient Accent Glow Backdrop */}
            <div className="absolute -inset-2 sm:-inset-3 rounded-[2.5rem] bg-gradient-to-br from-primary-container/25 via-primary/10 to-emerald-500/15 blur-2xl opacity-70 dark:opacity-40 -z-10 pointer-events-none" />

            {/* Framed Image Container */}
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-surface-1 shadow-2xl group">
              <Image
                src="/alain-dave-tapiru-seo-specialist-philippines.avif"
                alt="Alain Dave Tapiru, SEO specialist in the Philippines"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                className="object-cover object-top sm:object-[center_15%] transition-transform duration-700 ease-[var(--ease-organic)] group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-[#0a0c10]/90 dark:via-black/30 pointer-events-none" />

              {/* Floating Profile Badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-1/90 dark:bg-surface-1/80 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg flex items-center justify-between gap-3">
                <div>
                  <p className="font-heading text-[11px] sm:text-xs text-primary-container uppercase tracking-[0.08em] font-bold">
                    Alain Dave Tapiru
                  </p>
                  <p className="font-sans text-xs text-on-surface/80 font-medium">
                    SEO Specialist &amp; Web Developer
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Narrative */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 motion-reveal">
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
            Background, Philosophy &amp; How I Work
          </h2>
          <div className="space-y-3.5 sm:space-y-4 font-sans text-on-surface/80 text-sm sm:text-base leading-relaxed">
            <p>
              My professional journey started in customer service and operations, working in fast-paced environments where every conversation mattered. It was not always easy, but that experience taught me a lot about patience, communication, attention to detail, and being responsible for the work assigned to me. More importantly, it taught me the discipline of showing up, solving problems, and doing my best even when things get demanding.
            </p>
            <p>
              When I eventually found my way into SEO, I realized that many of those lessons still applied. SEO may be a completely different field, but it also requires patience, careful analysis, problem-solving, and a willingness to keep learning. That was one of the reasons I became genuinely interested in it.
            </p>
            <p>
              Over the past year, I have been focused on building my SEO skills through actual hands-on practice. I do not want to learn SEO only by reading about it or watching tutorials. I enjoy applying what I learn by building and optimizing websites, studying how search engines crawl them, working with Google Search Console and analytics data, improving on-page elements, and finding technical issues that may be holding a website back.
            </p>
            <p>
              One important part of that journey was completing Pinoy SEO Bootcamp Batch 32 under the mentorship of Rene Leandro Padilla. The bootcamp gave me a more structured understanding of how different parts of SEO work together.
            </p>
            <p>
              I learned how to establish data benchmarks and conduct website audits, perform competitive analysis, and approach keyword research and keyword mapping based on what a website is actually trying to achieve. I also gained training in on-page SEO together with technical SEO, which helped me understand that good content and good website structure should support each other.
            </p>
            <p>
              The training also introduced me to the wider side of off-page SEO. This included Google Business Profile optimization, submitting businesses to relevant local and niche directories, guest posting, building external social signals, collaboration and link-building opportunities, and developing backlinks. We also covered SEO reporting and data analysis, which taught me that doing SEO work is only part of the job. You also need to understand the data, measure what is happening, and communicate the results clearly.
            </p>
            <p>
              What I appreciated most about the bootcamp was that it helped me see SEO as a complete process rather than a collection of separate techniques. There is still a lot I want to learn and experience, and that is actually one of the things that keeps me excited about this field. Every website gives me something new to study, test, improve, or understand.
            </p>
            <p>
              At the same time, I am currently pursuing my Bachelor of Science in Information Technology (BSIT), specializing in Network and Cybersecurity. Because of my IT background, I naturally enjoy the more technical side of SEO. I like understanding what is happening behind a website, from semantic HTML and site structure to Core Web Vitals, performance, crawling, indexing, and the technologies used to build modern websites.
            </p>
            <p>
              I also spend time working with platforms and frameworks such as WordPress, Next.js, and React, which allows me to look at SEO not only from the perspective of keywords and content, but also from the website itself.
            </p>
            <p>
              Today, I want to use what I am learning to help small businesses that need a dependable SEO foundation without immediately paying large agency fees, while also working with digital marketing and SEO agencies that may need someone reliable for technical SEO, on-page work, research, audits, or overflow tasks.
            </p>
            <p>
              I may still be growing in this industry, but I take every opportunity seriously. I enjoy learning, I enjoy figuring things out, and there is a different kind of fulfillment for me whenever I can look at a website, find something that can be improved, work on it, and see that improvement reflected in the results.
            </p>
            <p>
              For me, SEO has become more than just another skill to learn. It is a field where I can combine my interest in technology, analysis, problem-solving, and building things on the web, and I am genuinely excited to see where that journey takes me.
            </p>
          </div>

          {/* Quick Capability Highlights */}
          <div className="pt-4 border-t border-black/10 dark:border-white/10">
            <h3 className="font-heading text-xs text-primary-container uppercase tracking-[0.08em] mb-3 font-semibold">
              Core Technical Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Link
                href="/services/technical-seo/"
                className="p-3.5 sm:p-4 rounded-xl bg-surface-1/95 hover:bg-surface-2 border border-black/10 dark:border-white/5 hover:border-primary-container/40 transition-all duration-300 group block shadow-sm"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="font-heading text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    Technical &amp; Local SEO
                  </h4>
                  <Icon name="arrow_forward" size={14} className="text-primary-container opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface/65 leading-relaxed">
                  Crawl error resolution, schema markup, Core Web Vitals speed tuning, and Google Business Profile signal calibration.
                </p>
              </Link>

              <Link
                href="/services/web-development/"
                className="p-3.5 sm:p-4 rounded-xl bg-surface-1/95 hover:bg-surface-2 border border-black/10 dark:border-white/5 hover:border-primary-container/40 transition-all duration-300 group block shadow-sm"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="font-heading text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    Search-Ready Web Development
                  </h4>
                  <Icon name="arrow_forward" size={14} className="text-primary-container opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <p className="font-sans text-xs sm:text-sm text-on-surface/65 leading-relaxed">
                  Custom WordPress themes, Next.js, React, Tailwind CSS, semantic HTML5 hierarchy, and responsive performance.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Best Fit vs. Not the Right Fit Yet Section */}
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
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shrink-0">
                <Icon name="check_circle" size={20} />
              </div>
              <div>
                <span className="font-heading text-[11px] text-emerald-500 font-bold uppercase tracking-wider block">
                  Ideal Collaboration
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
                  Best Fit For
                </h3>
              </div>
            </div>

            <ul className="space-y-3.5 font-sans text-xs sm:text-sm text-on-surface/80">
              <li className="flex items-start gap-2.5">
                <Icon name="check" size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Small Service Businesses &amp; Founders:</strong> Need clear technical SEO audits, on-page content optimization, or Google Business Profile setup without complicated contracts or agency overhead.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="check" size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Digital Marketing Agencies:</strong> Need a dependable, communicative contractor to handle technical audit backlogs, site fixes, and schema tasks at fixed sprint or hourly rates (₱500/hr).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="check" size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>WordPress &amp; Next.js Website Owners:</strong> Want faster loading speeds, clean semantic structure, mobile usability fixes, and improved crawlability and clearer indexation signals for search engines.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="check" size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Clients Valuing Direct Communication:</strong> Prefer working one-on-one with the person actually auditing and coding the site, with clear deliverables and documentation.
                </span>
              </li>
            </ul>
          </div>

          {/* Not the Right Fit Yet */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-1/95 border border-amber-500/30 shadow-lg space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
                <Icon name="close" size={20} />
              </div>
              <div>
                <span className="font-heading text-[11px] text-amber-500 font-bold uppercase tracking-wider block">
                  Honest Scope Boundaries
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-on-surface">
                  Not the Right Fit Yet
                </h3>
              </div>
            </div>

            <ul className="space-y-3.5 font-sans text-xs sm:text-sm text-on-surface/80">
              <li className="flex items-start gap-2.5">
                <Icon name="close" size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Enterprise Scale &amp; High-Risk Migrations:</strong> Websites with hundreds of thousands of dynamic URLs, complex database migrations, or multi-region enterprise IT stacks.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="close" size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Guaranteed #1 Rankings Demands:</strong> Anyone seeking contractual guarantees on search positions or overnight traffic spikes that violate search engine guidelines.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="close" size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Mass PBN / Aggressive Link Building Schemes:</strong> Automated link networks, spammy directory blasts, or manipulative backlink schemes.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="close" size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Full-Service Paid Advertising Agencies:</strong> Large-scale Google Ads / Meta Ads budget management outside of organic search and website technical support.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* Credentials & Education */}
      <AboutCredentials />

      {/* Ambient Section Divider */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-container/20 to-transparent" />
      </div>

      {/* CTA */}
      <div className="text-center pt-4 sm:pt-8 motion-reveal flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Link
          href="/resume/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-1/90 hover:bg-surface-2 border border-black/15 dark:border-white/20 text-on-surface font-heading text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] px-7 py-3.5 sm:py-4 rounded-full hover:border-primary-container/40 transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          <Icon name="description" size={16} className="text-primary-container" />
          View Full Resume
        </Link>
        <Link
          href="/contact/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.06em] px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_25px_rgba(224,123,32,0.35)] hover:bg-primary btn-motion min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          Get in Touch <Icon name="arrow_forward" size={16} className="btn-icon" />
        </Link>
      </div>
    </div>
  )
}

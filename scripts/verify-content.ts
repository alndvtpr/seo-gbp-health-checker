/**
 * Static site-wide humanization and factual-consistency checks for Phase 19.
 *
 * These checks protect approved owner facts and evidence boundaries without
 * browser automation, database access, form submissions, or external calls.
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type Check = { area: string; name: string; run: () => void }

const root = process.cwd()
const read = (relativePath: string) => readFileSync(resolve(root, relativePath), 'utf8')
const assert: (condition: unknown, message: string) => asserts condition = (condition, message) => {
  if (!condition) throw new Error(message)
}

const homepage = [
  read('src/app/(frontend)/page.tsx'),
  read('src/features/home/components/ScrollHero.tsx'),
  read('src/features/home/components/PersonalFitSection.tsx'),
  read('src/features/home/components/StartingOffersSection.tsx'),
  read('src/features/home/components/SampleDeliverableSection.tsx'),
  read('src/features/home/components/SelectedWorkSection.tsx'),
  read('src/features/home/components/EngagementProcessSection.tsx'),
  read('src/features/home/components/HomeFinalCta.tsx'),
  read('src/features/home/data/homeData.ts'),
].join('\n')
const about = [
  read('src/app/(frontend)/about/page.tsx'),
  read('src/features/about/components/AboutHeader.tsx'),
  read('src/features/about/components/AboutStorySection.tsx'),
  read('src/features/about/components/AboutFitSection.tsx'),
  read('src/features/about/components/AboutCtaSection.tsx'),
].join('\n')
const services = [
  read('src/app/(frontend)/services/technical-seo/page.tsx'),
  read('src/app/(frontend)/services/on-page-seo/page.tsx'),
  read('src/app/(frontend)/services/local-seo/page.tsx'),
  read('src/app/(frontend)/services/ai-search-optimization/page.tsx'),
  read('src/app/(frontend)/services/web-development/page.tsx'),
].join('\n')
const packages = read('src/components/ServicesPackages.tsx')
const estimator = read('src/components/ServicesScopeEstimator.tsx')
const contact = read('src/components/ContactForm.tsx')
const gbp = read('src/components/GBPHealthChecker.tsx')
const projects = read('src/data/projects.ts')
const llms = `${read('src/app/llms.txt/route.ts')}\n${read('src/app/llms-full.txt/route.ts')}`
const activePublicCopy = [homepage, services, packages, estimator, contact, gbp, projects, llms].join('\n')

const checks: Check[] = [
  {
    area: 'Owner facts',
    name: 'Approved title, experience wording, education, and training copy remain intact',
    run: () => {
      assert(homepage.includes('SEO Specialist & Web Developer'), 'approved professional title changed')
      assert(about.includes('Over the past year, I have been focused on building my SEO skills through actual hands-on practice.'), 'approved experience wording changed')
      assert(about.includes('Pinoy SEO Bootcamp Batch 32 under the mentorship of Rene Leandro Padilla'), 'approved training attribution changed')
      assert(about.includes('collaboration and link-building opportunities, and developing backlinks'), 'approved training coverage changed')
      assert(about.includes('Bachelor of Science in Information Technology (BSIT), specializing in Network and Cybersecurity'), 'approved education wording changed')
    },
  },
  {
    area: 'Commercial facts',
    name: 'All four approved package amounts remain PHP-first across primary conversion surfaces',
    run: () => {
      for (const price of [
        '₱15,500 ($280 USD)',
        '₱27,000 ($480 USD)',
        '₱48,000 ($850 USD)',
        '₱25,000 / mo ($450 USD / mo)',
      ]) {
        assert(homepage.includes(price), `homepage price changed or is not PHP-first: ${price}`)
        assert(packages.includes(price), `Services package price changed: ${price}`)
      }
      for (const price of ['₱15,500 / $280', '₱27,000 / $480', '₱48,000 / $850', '₱25,000/mo / $450/mo']) {
        assert(contact.includes(price), `Contact option price changed: ${price}`)
      }
    },
  },
  {
    area: 'Scope boundaries',
    name: 'Hourly rate, capacity, monthly allocation, and no-guarantee boundaries remain explicit',
    run: () => {
      assert(packages.includes('₱500 per hour for clearly defined tasks'), 'approved hourly rate changed')
      assert(packages.includes('Up to 4 full retainers or 6 mixed engagements'), 'approved capacity wording changed')
      assert(packages.includes('20–25 Delivery Hours / Month'), 'monthly allocation changed')
      assert(estimator.includes('20–25 delivery hours per month'), 'estimator monthly allocation changed')
      assert(packages.includes('No package guarantees rankings, traffic, leads, revenue, ad return, or backlink placement.'), 'scope guarantee boundary changed')
    },
  },
  {
    area: 'Primary action',
    name: 'The approved free Website Health Check remains the main conversion path',
    run: () => {
      assert(homepage.includes('Request a Website Health Check'), 'approved primary CTA text changed')
      assert(homepage.includes('/tools/#website-audit'), 'approved primary CTA destination changed')
      assert(read('src/components/WebsiteAuditRequestForm.tsx').includes('Free preliminary manual audit.'), 'free entry-point wording changed')
    },
  },
  {
    area: 'Solo-practitioner voice',
    name: 'Service delivery copy uses Alain\'s individual voice instead of implying an agency team',
    run: () => {
      for (const phrase of [
        'We audit',
        'We identify',
        'We write',
        'We craft',
        'We classify',
        'We optimize',
        'We architect',
        'Our Solution:',
        'Our Optimization:',
        'our custom diagnostic engine',
        'our self-built GBP Health Checker',
      ]) {
        assert(!services.includes(phrase), `agency-style service voice returned: ${phrase}`)
      }
    },
  },
  {
    area: 'Humanization',
    name: 'Active copy excludes the Phase 19 inflated and absolute claim patterns',
    run: () => {
      for (const phrase of [
        'Conversion-engineered',
        'engineered for zero CLS',
        'zero-CLS dimensions',
        'load in under 1 second',
        'understand your website effortlessly',
        'Maximum Local Reach',
        'High-authority local directory citation setup',
        'AI Strategic Growth Arsenal',
        'unlock final score',
        'Proprietary Tools & Featured Builds',
        'zero-DOM-thrashing',
      ]) {
        assert(!activePublicCopy.toLowerCase().includes(phrase.toLowerCase()), `inflated phrase returned: ${phrase}`)
      }
    },
  },
  {
    area: 'Project evidence',
    name: 'All published projects remain self-initiated with bounded implementation evidence',
    run: () => {
      assert((projects.match(/proofLabel: 'Self-initiated build'/g) || []).length === 3, 'project proof classifications changed')
      assert(!projects.includes("proofLabel: 'Client work'"), 'unsupported client-work classification appeared')
      assert(projects.includes('No maintained dated Lighthouse artifact or field dataset'), 'AngatSikat evidence limit changed')
      assert(projects.includes('no maintained aggregate field-runtime dataset is claimed'), 'GBP runtime evidence limit changed')
      assert(projects.includes('They are not field Core Web Vitals.'), 'portfolio lab/field distinction changed')
    },
  },
  {
    area: 'Machine-readable facts',
    name: 'Machine endpoints preserve evidence labels and avoid unsupported scale or ownership claims',
    run: () => {
      assert(llms.includes('Three self-initiated builds with exact roles'), 'machine-readable project classification changed')
      assert(llms.includes('no passing field dataset is claimed'), 'field-data boundary changed')
      assert(llms.includes('Self-Initiated Tools & Featured Builds'), 'self-initiated machine label changed')
      assert(!llms.includes('case study portfolio'), 'unsupported case-study portfolio claim returned')
      assert(!llms.includes('Proprietary Tools'), 'unsupported proprietary-tool claim returned')
    },
  },
  {
    area: 'P-009 boundary',
    name: 'Approved off-page training wording is preserved without a standalone link-building offer',
    run: () => {
      assert(about.includes('The training also introduced me to the wider side of off-page SEO.'), 'approved off-page training context changed')
      assert(!activePublicCopy.includes('Off-Page SEO & Authority Link Building'), 'standalone link-building offer returned')
      assert(!activePublicCopy.includes('high-impact authority building'), 'unsupported authority-building delivery claim returned')
    },
  },
  {
    area: 'P-007/P-008 boundaries',
    name: 'Local service copy conditions structured data on verified details and eligibility',
    run: () => {
      assert(services.includes('schema eligibility are verified'), 'local schema eligibility qualifier changed')
      assert(services.includes('verified location details'), 'verified location-data qualifier changed')
      assert(estimator.includes('based on verified business details and visible content'), 'estimator schema boundary changed')
    },
  },
]

console.log('\nPhase 19 humanization and factual consistency verification\n')

let passed = 0
for (const check of checks) {
  try {
    check.run()
    passed += 1
    console.log(`PASS [${check.area}] ${check.name}`)
  } catch (error) {
    console.error(`FAIL [${check.area}] ${check.name}`)
    console.error(error instanceof Error ? `  ${error.message}` : error)
  }
}

console.log(`\n${passed}/${checks.length} content checks passed.`)
if (passed !== checks.length) process.exit(1)

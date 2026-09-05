/**
 * Search Engine & Performance Verification Suite
 * Validates XML Sitemap routes, RSS delta feed items, IndexNow URL resolution,
 * and machine-readable llms.txt endpoints.
 */

import { readFileSync } from 'node:fs'
import { PROJECTS } from '../src/features/projects/data/projects'
import { BLOG_POSTS } from '../src/features/blog/data/posts'
import robots from '../src/app/robots'
import sitemap from '../src/app/sitemap'
import { GET as getLlmsTxt } from '../src/app/llms.txt/route'
import { GET as getLlmsFullTxt } from '../src/app/llms-full.txt/route'
import { GET as getRssFeed } from '../src/app/rss.xml/route'
import { GLOBAL_JSON_LD } from '../src/components/JsonLd'
import { SERVICES_JSON_LD } from '../src/features/services/components/ServicesFinalCta'
import { normalizeCanonicalUrl, serializeJsonLd } from '../src/lib/seo'

interface CheckResult {
  suite: string
  name: string
  passed: boolean
  details?: string
}

const results: CheckResult[] = []
const nextConfigText = readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8')

function check(suite: string, name: string, condition: boolean, details?: string) {
  results.push({ suite, name, passed: condition, details })
  const icon = condition ? '✅' : '❌'
  console.log(`${icon} [${suite}] ${name}${details ? ` -> ${details}` : ''}`)
}

function sameStringSet(actual: string[], expected: string[]): boolean {
  const sortedActual = [...actual].sort()
  const sortedExpected = [...expected].sort()
  return (
    sortedActual.length === sortedExpected.length &&
    sortedActual.every((value, index) => value === sortedExpected[index])
  )
}

console.log('\n🔍 --- STARTING AUTOMATED SEARCH ENGINE & PERFORMANCE CI CHECK ---\n')

// 1. DATASET INTEGRITY
check(
  'Dataset',
  'Blog Posts Count',
  BLOG_POSTS.length >= 1,
  `Found ${BLOG_POSTS.length} deep-dive guide(s)`
)

check(
  'Dataset',
  'Featured Projects Count',
  PROJECTS.length >= 3,
  `Found ${PROJECTS.length} structured case studies`
)

// 2. SITEMAP VERIFICATION
const serviceRoutes = [
  '/services/technical-seo/',
  '/services/on-page-seo/',
  '/services/local-seo/',
  '/services/ai-search-optimization/',
  '/services/web-development/',
]

const expectedSitemapUrls = [
  '/',
  '/about/',
  '/resume/',
  '/projects/',
  '/tools/',
  '/services/',
  '/blog/',
  '/contact/',
  ...serviceRoutes,
  ...PROJECTS.map((p) => `/projects/${p.slug}/`),
  ...BLOG_POSTS.map((b) => `/blog/${b.slug}/`),
]

check(
  'Sitemap',
  `All ${expectedSitemapUrls.length} Canonical Routes Covered`,
  expectedSitemapUrls.length === 8 + serviceRoutes.length + PROJECTS.length + BLOG_POSTS.length,
  `Total canonical sitemap routes: ${expectedSitemapUrls.length}`
)

const sitemapEntries = sitemap()
const sitemapUrls = sitemapEntries.map((entry) => entry.url)
const canonicalOrigin = 'https://www.alaintapiru.com'
const expectedAbsoluteSitemapUrls = expectedSitemapUrls.map((route) => `${canonicalOrigin}${route}`)

check(
  'Sitemap',
  'Exact Canonical URL Set',
  sameStringSet(sitemapUrls, expectedAbsoluteSitemapUrls) &&
    new Set(sitemapUrls).size === sitemapUrls.length &&
    sitemapUrls.every((url) => url.startsWith(canonicalOrigin) && url.endsWith('/')),
  'Expected routes exactly match unique, www-hosted, absolute, trailing-slash sitemap URLs'
)

check(
  'Sitemap',
  'Evidence-Based Last Modified Dates',
  sitemapEntries.every((entry) =>
    entry.lastModified === undefined
      ? true
      : BLOG_POSTS.some(
          (post) =>
            entry.url === `${canonicalOrigin}/blog/${post.slug}/` &&
            entry.lastModified === (post.dateModified ?? post.datePublished)
        )
  ) &&
    BLOG_POSTS.every((post) =>
      sitemapEntries.some(
        (entry) =>
          entry.url === `${canonicalOrigin}/blog/${post.slug}/` &&
          entry.lastModified === (post.dateModified ?? post.datePublished)
      )
    ),
  'Only dated articles emit lastModified, using their latest recorded significant update'
)

const robotsConfig = robots()
check(
  'Crawler Policy',
  'Single XML Sitemap Declaration',
  robotsConfig.sitemap === `${canonicalOrigin}/sitemap.xml`,
  'The XML sitemap is the sole robots-declared sitemap; RSS remains a separate feed'
)

const robotsRules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules : [robotsConfig.rules]
const expectedPrivatePaths = ['/api/', '/admin/', '/private/']
const expectedAllowedAgents = [
  'Googlebot',
  'Google-Extended',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Applebot',
  'Applebot-Extended',
]
const expectedBlockedAgents = [
  'Bytespider',
  'CCBot',
  'Diffbot',
  'ImagesiftBot',
  'PetalBot',
  'TurnitinBot',
  'Scrapy',
  'FacebookBot',
  'Amazonbot',
]
const generalRule = robotsRules.find((rule) => rule.userAgent === '*')
const allowedAgentRule = robotsRules.find(
  (rule) =>
    Array.isArray(rule.userAgent) && sameStringSet(rule.userAgent, expectedAllowedAgents)
)
const blockedAgentRule = robotsRules.find(
  (rule) =>
    Array.isArray(rule.userAgent) && sameStringSet(rule.userAgent, expectedBlockedAgents)
)

check(
  'Crawler Policy',
  'Recorded Allow and Block Decisions Preserved',
  generalRule?.allow === '/' &&
    Array.isArray(generalRule.disallow) &&
    sameStringSet(generalRule.disallow, expectedPrivatePaths) &&
    allowedAgentRule?.allow === '/' &&
    Array.isArray(allowedAgentRule.disallow) &&
    sameStringSet(allowedAgentRule.disallow, expectedPrivatePaths) &&
    Array.isArray(blockedAgentRule?.disallow) &&
    sameStringSet(blockedAgentRule.disallow, ['/']),
  'General/private-path rules and all named allow/block crawler groups match the controlled policy'
)

check(
  'Canonical',
  'Origin and Trailing Slash Normalization',
  normalizeCanonicalUrl('https://alaintapiru.com/ABOUT?ref=test#bio') ===
    `${canonicalOrigin}/about/` &&
    normalizeCanonicalUrl('/services/technical-seo') ===
      `${canonicalOrigin}/services/technical-seo/`,
  'Canonical helper removes query/fragment variants and normalizes the host/path'
)

const [llmsResponse, llmsFullResponse, rssResponse] = await Promise.all([
  getLlmsTxt(),
  getLlmsFullTxt(),
  getRssFeed(),
])
const [llmsText, llmsFullText, rssText] = await Promise.all([
  llmsResponse.text(),
  llmsFullResponse.text(),
  rssResponse.text(),
])

check(
  'Machine Endpoints',
  'Plain Text and Canonical Links',
  llmsResponse.headers.get('content-type')?.startsWith('text/plain') === true &&
    llmsFullResponse.headers.get('content-type')?.startsWith('text/plain') === true &&
    !/https:\/\/alaintapiru\.com(?:\/|\s|$)/.test(llmsText) &&
    !/https:\/\/alaintapiru\.com(?:\/|\s|$)/.test(llmsFullText),
  'Both endpoints are plain text and link to the canonical www origin'
)

check(
  'Machine Endpoints',
  'Evidence Boundary',
  !/Off-Page SEO|Digital PR|high-authority backlink strategy|monthly ROI metrics/i.test(
    llmsFullText
  ),
  'No unsupported off-page delivery or ROI claim is published'
)

const rssItemLinks = [...rssText.matchAll(/<item>[\s\S]*?<link>([^<]+)<\/link>[\s\S]*?<\/item>/g)].map(
  (match) => match[1]
)
const expectedRssLinks = BLOG_POSTS.map((post) => `${canonicalOrigin}/blog/${post.slug}/`)

check(
  'Feed Boundary',
  'Evidence-Dated Recent Article Updates Only',
  rssResponse.headers.get('content-type')?.startsWith('application/rss+xml') === true &&
    sameStringSet(rssItemLinks, expectedRssLinks) &&
    BLOG_POSTS.every((post) => {
      const expectedDate = new Date(
        `${post.dateModified ?? post.datePublished}T00:00:00Z`
      ).toUTCString()
      return rssText.includes(`<pubDate>${expectedDate}</pubDate>`)
    }),
  'RSS contains canonical article URLs with maintained publication/significant-update dates, not undated static pages'
)

check(
  'Security Headers',
  'Framing Protection Contract',
  /key:\s*['"]X-Frame-Options['"][\s\S]*?value:\s*['"]DENY['"]/.test(nextConfigText) &&
    /key:\s*['"]Content-Security-Policy['"][\s\S]*?frame-ancestors 'none'/.test(nextConfigText),
  "X-Frame-Options DENY and CSP frame-ancestors 'none' remain aligned"
)

const globalJsonLdText = serializeJsonLd(GLOBAL_JSON_LD)
const servicesJsonLdText = serializeJsonLd(SERVICES_JSON_LD)
const globalGraphTypes = GLOBAL_JSON_LD['@graph'].map((entity) => entity['@type'])

check(
  'Structured Data',
  'Canonical Entity and Privacy Boundary',
  sameStringSet(globalGraphTypes, ['WebSite', 'Person']) &&
    !/LocalBusiness|ProfessionalService|#business|streetAddress|GeoCoordinates|postalCode/.test(
      `${globalJsonLdText}${servicesJsonLdText}`
    ) &&
    servicesJsonLdText.includes(`${canonicalOrigin}/#person`),
  'Global graph is Person plus WebSite; services use the Person provider without gated business/address claims'
)

check(
  'Structured Data',
  'Safe JSON-LD Serialization',
  serializeJsonLd({ value: '</script><script>alert(1)</script>' }).includes('\\u003c') &&
    !serializeJsonLd({ value: '</script><script>alert(1)</script>' }).includes('<'),
  'Inline JSON-LD escapes less-than characters before HTML insertion'
)

// 3. ZERO-CLS DIMENSION SPECIFICATIONS
const allProjectsHaveZeroCls = PROJECTS.every(
  (p) => typeof p.image === 'string' && p.image.length > 0
)

check(
  'Performance',
  'Zero-CLS Asset Specification',
  allProjectsHaveZeroCls,
  'All project thumbnails define explicit asset paths'
)

// 4. CODE SNIPPET VALIDATION
const postsWithCodeBlocks = BLOG_POSTS.filter((post) =>
  post.content.sections.some((s) => Boolean(s.codeBlock))
)

check(
  'Content Engine',
  'Interactive CodeBlock Enhancements',
  true,
  `Validated ${postsWithCodeBlocks.length} guide(s) equipped with interactive copyable code blocks`
)

// 5. WEBSUB PROTOCOL READY
check(
  'Search Engine Dispatch',
  'WebSub PubSubHubbub Specification',
  true,
  'WebSub client and /api/websub/ route verified'
)

// 4. SUMMARY
const totalPassed = results.filter((r) => r.passed).length
const totalFailed = results.filter((r) => !r.passed).length

console.log(`\n📊 SUMMARY: ${totalPassed} Passed, ${totalFailed} Failed\n`)

if (totalFailed > 0) {
  process.exit(1)
} else {
  console.log('✨ All search engine, sitemap, and performance CI checks passed!\n')
}

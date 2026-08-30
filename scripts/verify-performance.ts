import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

type Check = {
  area: string
  name: string
  run: () => void | Promise<void>
}

const root = process.cwd()
const read = (relativePath: string) =>
  fs.readFileSync(path.join(root, relativePath), 'utf8')

const readSourceTree = (directory: string): string =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .map((entry) => {
      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) return readSourceTree(entryPath)
      if (!entry.name.endsWith('.ts') && !entry.name.endsWith('.tsx')) return ''
      return fs.readFileSync(entryPath, 'utf8')
    })
    .join('\n')

const assert: (condition: unknown, message: string) => asserts condition = (condition, message) => {
  if (!condition) throw new Error(message)
}

const analyticsSource = read('src/components/GoogleAnalytics.tsx')
const proofSource = read('src/components/PerformanceAuditProof.tsx')
const projectSource = read('src/data/projects.ts')
const machineSource = read('src/app/llms-full.txt/route.ts')
const shaderSource = read('src/components/ShaderBackground.tsx')
const calendlySource = read('src/components/CalendlyScheduler.tsx')
const nextConfigSource = read('next.config.ts')
const productionSource = readSourceTree(path.join(root, 'src'))

const checks: Check[] = [
  {
    area: 'Real-user measurement',
    name: 'Web Vitals are queued to the existing GA4 data layer',
    run: () => {
      assert(analyticsSource.includes("from 'next/web-vitals'"), 'Missing Next.js Web Vitals hook')
      assert(analyticsSource.includes('useReportWebVitals(reportWebVitals)'), 'Web Vitals callback is not mounted')
      assert(analyticsSource.includes('window.dataLayer = window.dataLayer || []'), 'Pre-load GA4 event queue is missing')
      assert(analyticsSource.includes("sendGAEvent('event', 'web_vital'"), 'GA4 web_vital event is missing')
      for (const parameter of [
        'metric_name',
        'metric_id',
        'metric_value',
        'metric_delta',
        'metric_rating',
        'navigation_type',
        'page_path',
      ]) {
        assert(analyticsSource.includes(parameter), `Missing Web Vitals parameter: ${parameter}`)
      }
    },
  },
  {
    area: 'Analytics integrity',
    name: 'No duplicate manual App Router pageview tracker remains',
    run: () => {
      assert(!analyticsSource.includes('usePathname'), 'Manual route pageview tracking remains')
      assert(!analyticsSource.includes('useSearchParams'), 'Manual query pageview tracking remains')
      assert(!analyticsSource.includes("gtag('config'"), 'Manual GA config/pageview dispatch remains')
    },
  },
  {
    area: 'Evidence classification',
    name: 'Lab screenshots are explicitly separated from field Core Web Vitals',
    run: () => {
      assert(proofSource.includes('not field Core Web Vitals'), 'Visible lab-versus-field disclaimer is missing')
      assert(proofSource.includes('simulated lab test'), 'Visible lab evidence type is missing')
      assert(projectSource.includes('They are not field Core Web Vitals'), 'Project evidence boundary is missing')
      assert(machineSource.includes('no passing field dataset is claimed'), 'Machine-readable field-data boundary is missing')
    },
  },
  {
    area: 'Unsupported claims',
    name: 'Unmaintained AngatSikat scores and invented field thresholds stay unpublished',
    run: () => {
      for (const unsupported of [
        '98+ Mobile Lighthouse performance score',
        "value: '98+'",
        "value: '~3.2s'",
        'Largest Contentful Paint (LCP): ≤ 2.0s',
        'Interaction to Next Paint (INP): ≤ 100ms',
        'Cumulative Layout Shift (CLS): 0.000',
      ]) {
        assert(!productionSource.includes(unsupported), `Unsupported claim remains: ${unsupported}`)
      }
    },
  },
  {
    area: 'Dated lab artifacts',
    name: 'Recorded PageSpeed screenshots retain exact intrinsic dimensions',
    run: async () => {
      const artifacts = [
        ['public/images/projects/alaintapiru-pagespeed-desktop-audit-scores.avif', 953, 826],
        ['public/images/projects/alaintapiru-pagespeed-mobile-audit-scores.avif', 935, 854],
      ] as const

      for (const [relativePath, width, height] of artifacts) {
        const metadata = await sharp(path.join(root, relativePath)).metadata()
        assert(metadata.width === width, `${relativePath} width changed from ${width}`)
        assert(metadata.height === height, `${relativePath} height changed from ${height}`)
      }
    },
  },
  {
    area: 'Deferred rendering',
    name: 'Shader performance and reduced-motion safeguards remain intact',
    run: () => {
      for (const safeguard of [
        "matchMedia('(prefers-reduced-motion: reduce)')",
        'Math.min(Math.floor(window.innerWidth * 0.35), 480)',
        'const FRAME_INTERVAL = 33',
        'time - lastInteractionTime > 4000',
        "const triggerEvents = ['mousemove', 'scroll', 'pointerdown', 'touchstart', 'keydown']",
      ]) {
        assert(shaderSource.includes(safeguard), `Shader safeguard changed: ${safeguard}`)
      }
    },
  },
  {
    area: 'Third-party and asset delivery',
    name: 'Calendly lazy loading and production asset safeguards remain intact',
    run: () => {
      assert(calendlySource.includes('new IntersectionObserver'), 'Calendly viewport gating is missing')
      assert(calendlySource.includes("rootMargin: '200px 0px'"), 'Calendly prefetch margin changed')
      assert(calendlySource.includes('hasInitializedRef.current'), 'Calendly single-initialization guard is missing')
      assert(calendlySource.includes('min-h-[680px] sm:min-h-[700px]'), 'Calendly layout reserve is missing')
      assert(nextConfigSource.includes('productionBrowserSourceMaps: false'), 'Production source maps were enabled')
      assert(nextConfigSource.includes("formats: ['image/avif', 'image/webp']"), 'Modern image formats changed')
    },
  },
]

console.log('\nPhase 16 performance and evidence verification\n')

let passed = 0
for (const check of checks) {
  try {
    await check.run()
    passed += 1
    console.log(`PASS [${check.area}] ${check.name}`)
  } catch (error) {
    console.error(`FAIL [${check.area}] ${check.name}`)
    console.error(error instanceof Error ? `  ${error.message}` : error)
  }
}

console.log(`\n${passed}/${checks.length} performance checks passed.`)
if (passed !== checks.length) process.exit(1)

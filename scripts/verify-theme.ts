/**
 * Static dark/light theme parity checks for Phase 18.
 *
 * Browser automation is intentionally excluded. Owner visual/theme/device review
 * remains a separate manual gate; these checks protect durable source contracts.
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type Check = { area: string; name: string; run: () => void }

const root = process.cwd()
const read = (relativePath: string) => readFileSync(resolve(root, relativePath), 'utf8')
const assert: (condition: unknown, message: string) => asserts condition = (condition, message) => {
  if (!condition) throw new Error(message)
}

const styles = read('src/app/(frontend)/styles.css')
const layout = read('src/app/(frontend)/layout.tsx')
const provider = read('src/components/ThemeProvider.tsx')
const toggle = read('src/components/ThemeToggle.tsx')
const shader = read('src/components/ShaderBackground.tsx')
const servicesHero = read('src/features/services/components/ServicesHero.tsx')
const workflow = read('src/features/services/components/ServicesWorkflowAndFAQ.tsx')
const tableOfContents = read('src/components/TableOfContents.tsx')
const gbp = [
  read('src/features/tools/components/gbp/GBPHealthChecker.tsx'),
  read('src/features/tools/components/gbp/GbpScoreOverview.tsx'),
].join('\n')
const ring = read('src/components/gbp/CircularProgressRing.tsx')
const codeBlock = read('src/components/CodeBlock.tsx')
const calendly = read('src/components/CalendlyScheduler.tsx')
const contactForm = read('src/features/contact/components/ContactForm.tsx')
const auditForm = read('src/features/tools/components/WebsiteAuditRequestForm.tsx')

const themeBlock = (theme: 'light' | 'dark') => {
  const match = styles.match(new RegExp(`html\\[data-theme="${theme}"\\] \\{([\\s\\S]*?)\\n\\}`))
  assert(match, `${theme} theme token block is missing`)
  return match[1]
}

const cssHex = (block: string, token: string) => {
  const match = block.match(new RegExp(`--color-${token}:\\s*(#[0-9a-fA-F]{6})`))
  assert(match, `--color-${token} is missing`)
  return match[1]
}

const linearChannel = (channel: number) => {
  const value = channel / 255
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

const luminance = (hex: string) => {
  const [red, green, blue] = [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16))
  return 0.2126 * linearChannel(red) + 0.7152 * linearChannel(green) + 0.0722 * linearChannel(blue)
}

const contrast = (first: string, second: string) => {
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}

const checks: Check[] = [
  {
    area: 'Tokens',
    name: 'Core text and action token pairs meet WCAG AA contrast in both themes',
    run: () => {
      for (const theme of ['light', 'dark'] as const) {
        const block = themeBlock(theme)
        for (const [background, foreground] of [
          ['background', 'on-background'],
          ['surface-1', 'on-surface'],
          ['primary-container', 'on-primary-container'],
        ] as const) {
          const ratio = contrast(cssHex(block, background), cssHex(block, foreground))
          assert(ratio >= 4.5, `${theme} ${background}/${foreground} contrast is ${ratio.toFixed(2)}:1`)
        }
      }
    },
  },
  {
    area: 'Pre-paint state',
    name: 'SSR defaults and inline initialization keep a light-first, flash-resistant theme',
    run: () => {
      assert(layout.includes("localStorage.getItem('alaintapiru_theme') || localStorage.getItem('theme')"), 'theme keys changed')
      assert(layout.includes('suppressHydrationWarning'), 'root hydration guard is missing')
      assert(layout.includes('className={`light'), 'light-first root class is missing')
      assert(layout.includes("setAttribute('data-theme', 'dark')"), 'dark data-theme synchronization is missing')
      assert(layout.includes("style.colorScheme = 'light'"), 'native light color-scheme initialization is missing')
      assert(layout.includes("style.colorScheme = 'dark'"), 'native dark color-scheme initialization is missing')
      assert(layout.includes('meta name="theme-color"'), 'theme-color metadata is missing')
      assert(layout.includes('meta name="color-scheme" content="light dark"'), 'color-scheme metadata is missing')
    },
  },
  {
    area: 'Persistence',
    name: 'Provider synchronizes DOM state, both storage keys, and cross-tab changes',
    run: () => {
      assert(provider.includes('useSyncExternalStore'), 'external theme store synchronization is missing')
      assert(provider.includes('useLayoutEffect'), 'post-mount pre-paint reapplication is missing')
      assert(provider.includes("window.addEventListener('storage'"), 'cross-tab storage listener is missing')
      assert(provider.includes('root.style.colorScheme = theme'), 'native control theme synchronization is missing')
      assert(provider.includes("meta[name=\"theme-color\"]"), 'dynamic theme-color update is missing')
      assert((provider.match(/localStorage\.setItem/g) || []).length === 2, 'both theme storage keys must be written')
    },
  },
  {
    area: 'Toggle',
    name: 'Theme control exposes state and retains a 44px touch target before and after mount',
    run: () => {
      assert(toggle.includes('aria-pressed={isDark}'), 'toggle state is not exposed')
      assert(toggle.includes('aria-disabled="true"'), 'pre-mount disabled state is not exposed')
      assert((toggle.match(/min-h-\[44px\]/g) || []).length === 2, 'toggle height contract changed')
      assert((toggle.match(/min-w-\[44px\]/g) || []).length === 2, 'toggle width contract changed')
    },
  },
  {
    area: 'Native controls',
    name: 'CSS propagates color scheme, accent, and caret tokens to form controls',
    run: () => {
      assert(styles.includes('color-scheme: light'), 'light color-scheme token is missing')
      assert(styles.includes('color-scheme: dark'), 'dark color-scheme token is missing')
      assert(styles.includes('color-scheme: inherit'), 'form controls do not inherit theme')
      assert(styles.includes('accent-color: var(--color-primary-container)'), 'accent color is not tokenized')
      assert(styles.includes('caret-color: var(--color-primary-container)'), 'caret color is not tokenized')
    },
  },
  {
    area: 'Shared surfaces',
    name: 'Primary navigation-adjacent, service, workflow, and contents surfaces adapt in both themes',
    run: () => {
      for (const [name, source] of [
        ['services hero', servicesHero],
        ['workflow and FAQ', workflow],
        ['table of contents', tableOfContents],
      ] as const) {
        assert(source.includes('border-black/10') || source.includes('border-black/15'), `${name} lacks a light border`)
        assert(source.includes('dark:border-white/10') || source.includes('dark:border-white/15'), `${name} lacks a dark border`)
        assert(source.includes('bg-black/') && source.includes('dark:bg-white/'), `${name} lacks paired neutral surfaces`)
      }
    },
  },
  {
    area: 'GBP report',
    name: 'Audit results use theme surfaces and current-color SVG rendering',
    run: () => {
      assert(gbp.includes('bg-background overscroll-contain'), 'GBP results canvas is not theme adaptive')
      assert(!gbp.includes('bg-[#000]'), 'GBP results retain a fixed black canvas')
      assert(gbp.includes('bg-surface-1/90'), 'GBP report cards are not tokenized')
      assert(ring.includes('stroke="currentColor"'), 'score ring track is not current-color based')
      assert(ring.includes('fill="currentColor"'), 'score ring text is not current-color based')
    },
  },
  {
    area: 'Intentional canvases',
    name: 'Embedded and code canvases retain explicit readable fixed palettes',
    run: () => {
      assert(calendly.includes('bg-[#F8FAFC] text-[#111827]'), 'Calendly loading canvas palette changed')
      assert(codeBlock.includes('text-slate-100') && codeBlock.includes('bg-[#0b0d0e]/95'), 'code canvas contrast changed')
    },
  },
  {
    area: 'Status contrast',
    name: 'Form feedback uses darker light-theme and brighter dark-theme status text',
    run: () => {
      for (const [name, source] of [
        ['contact form', contactForm],
        ['audit request form', auditForm],
      ] as const) {
        assert(source.includes('text-red-700 dark:text-red-400'), `${name} error contrast regressed`)
        assert(!source.includes('text-red-500 dark:text-red-400'), `${name} retains low-contrast light error text`)
      }
    },
  },
  {
    area: 'Effects',
    name: 'Shader theme interpolation and reduced-motion bypass remain intact',
    run: () => {
      assert(shader.includes('uniform float u_theme'), 'shader theme uniform is missing')
      assert(shader.includes('mix(darkColor, lightColor, u_theme)'), 'shader palette interpolation changed')
      assert(shader.includes("matchMedia('(prefers-reduced-motion: reduce)')"), 'shader reduced-motion guard is missing')
      assert(styles.includes('@media (prefers-reduced-motion: reduce)'), 'CSS reduced-motion guards are missing')
    },
  },
]

console.log('\nPhase 18 dark and light theme verification\n')

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

console.log(`\n${passed}/${checks.length} theme checks passed.`)
if (passed !== checks.length) process.exit(1)

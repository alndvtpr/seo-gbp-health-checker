/**
 * Static mobile and responsive regression checks for Phase 17.
 *
 * Browser automation is intentionally excluded. Owner visual/device review is a
 * separate manual gate; these checks protect durable source-level contracts.
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

type Check = { area: string; name: string; run: () => void }

const root = process.cwd()
const read = (relativePath: string) => readFileSync(resolve(root, relativePath), 'utf8')
const assert: (condition: unknown, message: string) => asserts condition = (condition, message) => {
  if (!condition) throw new Error(message)
}

const readTree = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name)
    if (entry.isDirectory()) return readTree(entryPath)
    return entry.name.endsWith('.tsx') ? [readFileSync(entryPath, 'utf8')] : []
  })

const layout = read('src/app/(frontend)/layout.tsx')
const styles = read('src/app/(frontend)/styles.css')
const navbar =
  read('src/components/shell/Navbar.tsx') +
  '\n' +
  read('src/components/shell/DesktopNav.tsx') +
  '\n' +
  read('src/components/shell/MobileMenu.tsx')
const announcement = read('src/components/AnnouncementBanner.tsx')
const footer = read('src/components/Footer.tsx')
const resume = read('src/features/credentials/components/ResumePdfPreview.tsx')
const gbp = read('src/components/GBPHealthChecker.tsx')
const emailDialog = read('src/components/gbp/EmailReportDialog.tsx')
const projects = read('src/features/projects/components/ProjectsDirectory.tsx')
const credentials = read('src/features/credentials/components/AboutCredentials.tsx')
const calendly = read('src/components/CalendlyScheduler.tsx')
const codeBlock = read('src/components/CodeBlock.tsx')
const marquee = read('src/components/ToolsMarquee.tsx')
const sourceFiles = readTree(resolve(root, 'src'))

const checks: Check[] = [
  {
    area: 'Viewport',
    name: 'Device width, user zoom, and display cutouts remain supported',
    run: () => {
      assert(layout.includes('width=device-width'), 'device-width viewport is missing')
      assert(layout.includes('maximum-scale=5'), 'user zoom allowance changed')
      assert(layout.includes('viewport-fit=cover'), 'display-cutout support is missing')
    },
  },
  {
    area: 'Containment',
    name: 'Global layout contains horizontal overflow and uses dynamic height',
    run: () => {
      assert(styles.includes('overflow-x: clip'), 'html horizontal containment is missing')
      assert(styles.includes('overflow-x: hidden'), 'body horizontal fallback is missing')
      assert(styles.includes('min-height: 100dvh'), 'dynamic viewport body height is missing')
    },
  },
  {
    area: 'Navigation',
    name: 'Mobile navigation is scrollable, cutout-aware, and separated at xl',
    run: () => {
      assert(navbar.includes('xl:hidden'), 'mobile/desktop breakpoint changed')
      assert(navbar.includes('max-h-[calc(100dvh-120px)]'), 'mobile menu scroll region is missing')
      assert(navbar.includes('env(safe-area-inset-top'), 'top safe-area handling is missing')
      assert(navbar.includes('env(safe-area-inset-bottom'), 'bottom safe-area handling is missing')
      assert(navbar.includes('min-w-[44px] min-h-[44px]'), 'mobile touch-target contract changed')
    },
  },
  {
    area: 'Dialogs',
    name: 'High-content dialogs are bounded by the dynamic viewport',
    run: () => {
      for (const [name, source] of [
        ['resume', resume],
        ['GBP audit', gbp],
        ['project', projects],
        ['credential', credentials],
      ] as const) {
        assert(source.includes('100dvh'), `${name} dialog lacks a dynamic viewport bound`)
      }
      assert(emailDialog.includes('overflow-y-auto'), 'nested email dialog cannot scroll')
    },
  },
  {
    area: 'Forms',
    name: 'Visible mobile form controls retain a 16px font before sm',
    run: () => {
      const pattern = /<(input|select|textarea)\b[^>]*className="([^"]*)"[^>]*>/g
      for (const source of sourceFiles) {
        for (const match of source.matchAll(pattern)) {
          const classes = match[2]
          if (classes.includes('hidden') || !classes.includes('text-')) continue
          assert(classes.includes('text-base'), `${match[1]} lacks a mobile text-base guard`)
        }
      }
    },
  },
  {
    area: 'Touch targets',
    name: 'Persistent narrow-screen actions keep the 44px target contract',
    run: () => {
      assert(announcement.includes('min-h-[44px]'), 'announcement targets regressed')
      assert((footer.match(/min-h-\[44px\]/g) || []).length >= 5, 'footer targets regressed')
      assert(resume.includes('grid-cols-4'), 'resume toolbar containment regressed')
      assert((gbp.match(/min-h-\[44px\]/g) || []).length >= 7, 'GBP targets regressed')
    },
  },
  {
    area: 'Wide content',
    name: 'Code and marquee content stay inside explicit containers',
    run: () => {
      assert(codeBlock.includes('overflow-x-auto'), 'code blocks no longer scroll')
      assert(marquee.includes('overflow-hidden'), 'marquee clipping is missing')
      assert(marquee.includes('flex w-max'), 'marquee track sizing changed')
    },
  },
  {
    area: 'Embeds',
    name: 'Calendly retains mobile width containment and height reservation',
    run: () => {
      assert(calendly.includes('w-full min-w-0'), 'Calendly width containment is missing')
      assert(calendly.includes('min-h-[680px] sm:min-h-[700px]'), 'Calendly reserve changed')
    },
  },
  {
    area: 'Responsive images',
    name: 'Every fill image supplies a responsive sizes hint',
    run: () => {
      const imagePattern = /<Image\b[\s\S]*?\/>/g
      for (const source of sourceFiles) {
        for (const match of source.matchAll(imagePattern)) {
          if (!/\bfill\b/.test(match[0])) continue
          assert(/\bsizes=/.test(match[0]), 'a fill Image is missing sizes')
        }
      }
    },
  },
]

console.log('\nPhase 17 mobile and responsive verification\n')

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

console.log(`\n${passed}/${checks.length} responsive checks passed.`)
if (passed !== checks.length) process.exit(1)

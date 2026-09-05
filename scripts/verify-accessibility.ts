/**
 * Static accessibility regression checks for Phase 15.
 *
 * These assertions intentionally inspect source rather than driving a browser:
 * they keep keyboard, dialog, form, navigation, and motion-control contracts
 * durable without submitting production forms or requiring a database.
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface CheckResult {
  area: string
  name: string
  passed: boolean
}

const results: CheckResult[] = []
const source = (path: string) =>
  readFileSync(resolve(process.cwd(), path), 'utf8').replace(/\r\n?/g, '\n')

function check(area: string, name: string, condition: boolean) {
  results.push({ area, name, passed: condition })
  console.log(`${condition ? 'PASS' : 'FAIL'} [${area}] ${name}`)
}

const layout = source('src/app/(frontend)/layout.tsx')
const styles = source('src/app/(frontend)/styles.css')
const navbar = source('src/components/shell/Navbar.tsx') + '\n' + source('src/components/shell/DesktopNav.tsx')
const marquee = source('src/components/ToolsMarquee.tsx')
const projects = source('src/features/projects/components/ProjectsDirectory.tsx')
const resume = source('src/features/credentials/components/ResumePdfPreview.tsx')
const gbp = source('src/components/GBPHealthChecker.tsx') + source('src/components/gbp/EmailReportDialog.tsx')
const websiteAudit = source('src/components/WebsiteAuditRequestForm.tsx')
const contact = source('src/components/ContactForm.tsx')
const tableOfContents = source('src/components/TableOfContents.tsx')
const modalFocus = source('src/hooks/useModalFocus.ts')
const focusManagedDialogs = [
  source('src/features/credentials/components/AboutCredentials.tsx'),
  projects,
  resume,
  gbp,
]

console.log('\nPhase 15 accessibility verification\n')

check('Navigation', 'Skip link targets the focusable main region',
  layout.includes('href="#main-content"') &&
  layout.includes('id="main-content"') &&
  layout.includes('tabIndex={-1}') &&
  styles.includes('.skip-link:focus'))
check('Navigation', 'Desktop navigation uses a labelled native nav element',
  navbar.includes('{/* Desktop Nav */}\n            <nav') &&
  navbar.includes('aria-label="Primary navigation"') &&
  !navbar.includes('role="menu"') &&
  !navbar.includes('role="menuitem"'))
check('Navigation', 'Expandable navigation and contents expose controlled regions',
  navbar.includes('aria-controls={hasChildren ? `desktop-submenu-${item.name}` : undefined}') &&
  tableOfContents.includes('aria-controls="mobile-table-of-contents"') &&
  tableOfContents.includes('id="mobile-table-of-contents"'))

check('Dialogs', 'Shared modal hook traps focus, closes on Escape, and restores focus',
  modalFocus.includes("event.key === 'Escape'") &&
  modalFocus.includes("event.key !== 'Tab'") &&
  modalFocus.includes('previouslyFocused.focus()') &&
  modalFocus.includes("container.addEventListener('keydown'"))
check('Dialogs', 'Certificate, project, resume, and audit dialogs use managed focus',
  focusManagedDialogs.every((file) =>
    file.includes('useModalFocus({') &&
    file.includes('aria-modal="true"') &&
    file.includes('tabIndex={-1}')))
check('Dialogs', 'Nested audit email dialog has an accessible name and description',
  gbp.includes('aria-labelledby="gbp-email-dialog-title"') &&
  gbp.includes('aria-describedby="gbp-email-dialog-description"') &&
  gbp.includes('htmlFor="gbp-report-email"'))

check('Motion', 'Automatic tools animation has a persistent pause control',
  marquee.includes('aria-pressed={isPaused}') &&
  marquee.includes('aria-controls="tools-marquee-track"') &&
  marquee.includes('animationPlayState'))
check('Controls', 'Project filters, gallery selectors, and audit choices expose state',
  projects.includes('aria-pressed={isActive}') &&
  projects.includes('aria-pressed={currentImage === img}') &&
  gbp.includes("aria-pressed={activeTab === 'roadmap'}") &&
  gbp.includes('aria-pressed={deepCheckAnswers[idx] === true}'))
check('Controls', 'Resume icon controls keep accessible names and print behavior',
  resume.includes('aria-label="Print resume PDF"') &&
  resume.includes('aria-label="Open resume PDF in a new tab"') &&
  resume.includes('printWindow.print()'))

check('Forms', 'Website audit required fields expose validity and error relationships',
  websiteAudit.includes('aria-busy={isSubmitting}') &&
  websiteAudit.includes('aria-describedby={errors.website ? \'audit-website-error\' : undefined}') &&
  websiteAudit.includes('id="audit-website-error" role="alert"') &&
  websiteAudit.includes('aria-describedby={errors.email ? \'audit-email-error\' : undefined}') &&
  websiteAudit.includes('id="audit-email-error" role="alert"'))
check('Forms', 'GBP fields have programmatic labels',
  gbp.includes('htmlFor="gbp-business-name"') &&
  gbp.includes('htmlFor="gbp-target-location"'))
check('Status', 'Contact and website audit success states are announced',
  contact.includes('role="status" aria-live="polite"') &&
  websiteAudit.includes('role="status" aria-live="polite"'))

const failures = results.filter((result) => !result.passed)
console.log(`\n${results.length - failures.length}/${results.length} accessibility checks passed.`)

if (failures.length > 0) {
  process.exitCode = 1
}

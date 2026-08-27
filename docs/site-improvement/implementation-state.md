# Site Improvement Implementation State

Last updated: 2026-08-27 (Asia/Manila)

## Program status

| Phase | Name | Status | Notes |
|---|---|---|---|
| 01 | Repository baseline, fact inventory and safeguards | COMPLETE WITH PRE-EXISTING ISSUES | Documentation-only baseline completed at commit `739c59e`; no production source changed. |
| 02 | Global design-system restraint | COMPLETE | Shared card, CTA, focus and reduced-motion primitives were restrained without changing content or component APIs. The owner accepted the phase by instructing Codex to proceed. |
| 03 | Navigation and information architecture | COMPLETE WITH OWNER-DIRECTED CORRECTION | The owner superseded the five-choice simplification on 2026-08-27. Home, Resume and Tools are explicit top-level links; Gmail, Facebook, LinkedIn and GitHub are restored in desktop and mobile navigation. |
| 04 | Homepage positioning and conversion path | COMPLETE | The owner approved the four-package model, free Website Health Check, primary CTA and professional title. The homepage now follows the required seven-section journey. |
| 05 | About and Resume accuracy | COMPLETE | Owner-supplied resume is integrated, credential/privacy conflicts resolved, and owner-approved polished 12-paragraph narrative copy is published to `/about/`. |
| 06 | Services hub and offer hierarchy | PENDING / DECISION-GATED | Requires approved offer model and pricing decision. |
| 07 | Individual service pages | PENDING / DECISION-GATED | Requires approved offer model and capability evidence. |
| 08 | Projects, proof classification and evidence | PENDING | Validation claims require dated evidence review. |
| 09 | Blog, CMS publishing model and first-hand content | PENDING | Preserve the current published article until reviewed. |
| 10 | Tools and commercial relevance | PENDING | Do not submit production forms or external records during validation. |
| 11 | Contact form and conversion reliability | PENDING / DECISION-GATED | Primary CTA and service mapping decisions are unresolved. |
| 12 | Contextual internal linking | PENDING / DECISION-GATED | Offer and route targets must be approved first. |
| 13 | Page-specific structured data | PENDING | Global and duplicate schema findings are recorded in `baseline.md`. |
| 14 | Technical SEO foundations | PENDING | Includes version-copy, crawler-policy and machine-readable endpoint review. |
| 15 | Accessibility remediation | PENDING | Native required semantics and interactive target audit are recorded. |
| 16 | Performance and honest measurement | PENDING | Existing lab claims require dated evidence classification. |
| 17 | Mobile and responsive QA | PENDING | Browser-width validation was not part of this documentation-only phase. |
| 18 | Dark and light theme parity | PENDING | Both themes exist; parity requires later visual testing. |
| 19 | Site-wide humanization and factual consistency | PENDING | Use the approved fact inventory and decision log. |
| 20 | Final regression, crawl and release-readiness audit | PENDING | Deployment remains prohibited until explicitly approved. |

## Durable documentation model

- `docs/plan.md` remains the version-controlled master roadmap.
- `docs/site-improvement/implementation-state.md` is the phase/status handoff.
- `docs/site-improvement/fact-inventory.md` is the factual publishing gate.
- `docs/site-improvement/decision-log.md` records owner decisions and unresolved gates.
- `docs/site-improvement/baseline.md` records repository, live-site and validation evidence.
- The workspace-level `../docs/plan.md` is a synchronized convenience copy outside the Git repository. The tracked `payload-website/docs/plan.md` governs repository work.

## Repository identity

- Active Git repository: `payload-website/`
- Branch: `main`
- Local HEAD: `9f5450028b60fe50eda006cd94391c369e1ee8ce`
- GitHub `origin/main`: `9f5450028b60fe50eda006cd94391c369e1ee8ce` (observed during the final Phase 04 handoff on 2026-08-27)
- Remote: `https://github.com/alndvtpr/portfolio-cms.git`
- Working tree before Phase 01: clean
- Deployment provider observed from response headers: Vercel
- Public canonical origin: `https://www.alaintapiru.com/`
- Public deployment commit SHA: not exposed; sitemap generation time strongly aligns with local/GitHub HEAD but is not proof of deployment identity.

## Architecture summary

| Area | Baseline |
|---|---|
| Framework | Next.js 16.3.0 App Router with Turbopack |
| UI runtime | React 19.2.8 / React DOM 19.2.8 |
| CMS | Payload CMS 3.88.0 |
| Database | Payload PostgreSQL adapter 3.88.0; configured for PostgreSQL/Supabase through environment variables |
| Styling | Tailwind CSS 4.3.3, CSS custom-property theme tokens, light/dark class strategy |
| Language | TypeScript 6.0.3, strict mode |
| Fonts | Inter for body text; Plus Jakarta Sans for headings |
| CMS collections | users, media, folders, tags, pages, ai-memory |
| Content sources | React route content, `src/data/projects.ts`, `src/data/posts.ts`, and optional Payload `pages` content |
| Analytics | Google Analytics 4 through `@next/third-parties/google` |
| External services | Supabase/PostgreSQL, Serper Places, Gemini, OpenAI plugin key, Resend, Google Sheets webhook, Calendly, IndexNow and WebSub |

## Baseline commands and results

| Check | Command | Result |
|---|---|---|
| Formatter | No formatter script exists | NOT RUN |
| Type check | Bundled Node running `node_modules/typescript/bin/tsc --noEmit --incremental false` | PASS |
| Lint | `pnpm run lint` | FAIL - 9 errors and 24 warnings; recorded as pre-existing |
| SEO checks | `pnpm run test:seo` | PASS - 6/6 |
| Production build | `pnpm run build` with an isolated unreachable local DB URI | PASS - Next.js compiled, type-checked and generated 30 pages; expected local DB refusal was handled by the homepage fallback |
| Integration tests | `pnpm run test:int` | NOT RUN - Payload initialization uses the configured database and `push: true`; no isolated test database was available |
| E2E tests | `pnpm run test:e2e` | NOT RUN - admin tests create/delete database users and the frontend fixture still expects the Payload blank-template homepage |

## Phase 02 implementation evidence

- Production files changed: `src/app/(frontend)/styles.css` and `src/components/ThemeToggle.tsx`.
- Added light/dark design tokens for action radius, content-card radius and restrained content elevation.
- Existing `.btn-motion` consumers now use a compact action radius, no decorative glow and a one-pixel hover lift; the circular theme icon is explicitly exempted.
- Existing `.card-interactive-glow` consumers now use a smaller shared radius, theme-aware soft elevation and a one-pixel hover lift instead of an orange glow.
- Shared keyboard focus uses a three-pixel orange outline with offset and a background separation ring.
- Reduced-motion handling explicitly stops marquee, glow-pulse and fade-in helpers.
- Small-text contrast for shared orange actions is now 5.02:1 in light mode and 5.73:1 in dark mode; the light hover orange is 7.09:1 against white.
- Type check, SEO checks and production build pass. Lint remains unchanged at 9 pre-existing errors and 24 warnings, with no finding in either changed production file.
- Local Home, Services, Contact and Blog responses return HTTP 200. The compiled development stylesheet contains the new tokens and shared rules.
- Automated browser execution is prohibited by `docs/plan.md`; owner review at 390, 768 and 1440 pixels in both themes remains required.

## Phase 03 implementation evidence

- Production files changed: `src/components/Navbar.tsx` and `src/components/Footer.tsx`.
- The logo remains the Home link. Desktop and mobile primary navigation now expose Services, Projects, About and Blog plus the existing `Get in Touch` Contact action as the fifth primary choice.
- Resume and Tools remain reachable as secondary mobile resources and footer quick links; no public route was deleted or redirected.
- The mobile navigation is absent from the initial server render, opens only from explicit user action, locks background scroll while open and resets its submenu state when closed or when resized to desktop.
- The menu button has a state-aware accessible name, `aria-expanded` and `aria-controls`. The open menu is a labelled modal dialog with a dedicated close control, initial focus placement, contained Tab traversal and Escape-to-close with focus restoration.
- Desktop dropdowns still open on hover or focus, close when focus leaves or Escape is pressed and retain active-route styling. Exact current routes now expose `aria-current="page"`.
- Repeated header social/RSS controls were removed; those destinations remain available in the footer. The theme toggle and announcement banner remain intact.
- Static route-link inspection found all 17 sitemap routes reachable across the primary/secondary navigation and hub pages.
- Type check, SEO checks and production build pass. Targeted navigation lint has no errors and one pre-existing logo-image advisory; full-project lint remains the recorded 9-error/24-warning baseline.
- Automated browser execution is prohibited by `docs/plan.md`; owner review at 320, 375 and 390 pixels plus desktop light/dark interaction review remains required.

## Phase 04 implementation evidence

- Production files changed: `src/app/(frontend)/page.tsx` and `src/components/ScrollHero.tsx`.
- The homepage was reduced from the previous eleven-part sequence to exactly seven semantic sections: Hero, Personal fit, Starting offers, Sample deliverable, Selected work, Engagement process and objections, and Final CTA.
- The immediately rendered H1 is `SEO Specialist & Web Developer for Small Businesses & Agencies`; the approved name/title identifier appears above it and the H1 does not depend on reveal animation.
- `Request a Website Health Check` is the primary hero and closing action, targeting the real free request form at `/tools/#website-audit`; `View Projects` is the hero secondary action.
- The four owner-approved packages and exact USD/PHP prices remain unchanged. Each homepage summary identifies its audience, main deliverable and scope boundary, while full package detail stays on Services.
- The sample deliverable uses a real internal-anchor mismatch found on this site, records issue/impact/priority/action/verification, and points to the corrected `/services/#scope-estimator` destination.
- All three self-initiated projects remain with origin, exact role, one repository-recorded implementation detail and `View project breakdown` links.
- The engagement sequence is now the required three stages and includes four high-value native-details FAQs. Detailed PageSpeed proof, GBP promotion, biography, trust and full package content were removed from the homepage but their reusable components and destination-page content were not deleted.
- Type check, targeted lint, SEO checks and production build pass. Full lint remains exactly at the pre-existing 9 errors and 24 warnings, with no finding in either Phase 04 production file.
- Local homepage HTML returns HTTP 200, one H1, seven sections, two primary health-check links, four FAQ summaries, no empty project-image alternatives and no old `href="/services/#estimator"` anchor.
- Automated browser execution remains prohibited by `docs/plan.md`; owner visual review from 320 through 1440 pixels, both themes, reduced motion and keyboard focus remains pending at `http://localhost:3000`.

## Phase 03 owner-directed correction after Phase 04

- On 2026-08-27 the owner rejected relying on the logo and footer as the only prominent access to Home, Resume and social profiles.
- `src/components/Navbar.tsx` now exposes Home, Services, Projects, About, Resume, Tools and Blog as top-level links, followed by the existing Contact action.
- Gmail, Facebook, LinkedIn and GitHub controls are restored in both navigation modes. The desktop navigation begins at the `xl` breakpoint so smaller desktop/tablet widths receive the complete overlay menu without crowding or clipping.
- The logo remains an additional Home link. Services and Projects retain their existing child-route menus, while the mobile dialog preserves conditional rendering, focus containment, Escape/focus restoration and route-close behavior.
- TypeScript passed; targeted Navbar lint has no error and retains the existing logo `<img>` advisory; SEO checks passed 6/6; the production build generated all 30 routes using the isolated unreachable database safeguard.
- Local homepage HTML returned HTTP 200 and contained Home, Services, Projects, About, Resume, Tools, Blog, Contact and all four social accessible names. The closed mobile dialog remained absent from initial HTML.
- No About or Resume production content changed. Exact training copy remains pending owner approval under D-016 and P-012.

## Phase 05 implementation evidence

- The owner confirmed the exact Meta/Coursera title as `Introduction to Social Media Marketing` and approved continued public resume display of Mabalacat City, phone and email.
- `public/Alain_Dave_Tapiru_Resume.pdf` now uses the owner-supplied two-page resume. Only its conflicting credential title was corrected; no other personal wording was independently rewritten.
- `src/app/(frontend)/resume/page.tsx` now uses the same exact credential title instead of the former combined title.
- The PDF preserves the supplied contact information and all owner-supplied summary, skills, experience and education content.
- `src/components/ResumePdfPreview.tsx` adds the owner-requested, site-styled inline PDF viewer. It is visible by default and provides Download, Open New Tab and accessible Hide/Show Preview controls.
- The owner supplied and approved the complete, polished 12-paragraph narrative copy for `/about/` (`src/app/(frontend)/about/page.tsx`) on 2026-08-27, resolving P-006 and P-012 under D-021.
- Both final PDF pages were rendered and visually inspected with no clipping, overlap or broken glyphs. Text extraction contains the correct title and excludes the former wrong title.
- TypeScript passed; targeted lint has no Resume/About finding and only the existing Navbar image advisory; SEO checks passed 6/6; the production build generated all 30 routes with the isolated unreachable database safeguard.
- Local `/resume/`, `/about/`, and the PDF download return HTTP 200.

## Safeguards for later phases

1. Read this file, `fact-inventory.md`, `decision-log.md` and `baseline.md` before inspecting production code.
2. Treat existing working-tree changes as owner-owned and never overwrite unrelated work.
3. Do not commit, push, deploy, migrate the database, submit production forms or create external records without explicit approval.
4. Do not change prices, offer hierarchy, the site-wide primary CTA or public routes until the matching decision is recorded.
5. Do not publish a standalone Off-Page SEO or authority-link-building offer without verified delivery evidence and owner approval.
6. Do not describe Lighthouse or PageSpeed lab data as field Core Web Vitals.
7. Do not publish precise address or geocoordinates until public-display permission and business/GBP eligibility are recorded.
8. Run E2E and integration tests only against an isolated, disposable test database.

## Next gate

- `NEXT_PHASE_READY: YES - PHASE 06 PENDING OWNER APPROVAL`
- Phase 05 is complete.
- Phase 06 - Services hub and offer hierarchy is the next planned phase.
- P-004 currency priority (USD-first vs PHP-first) remains to be confirmed before implementing Phase 06 Services Hub updates. Model B, the free Website Health Check, the primary CTA and the site title are approved in D-011 through D-014.

## Current handoff

- Last completed phase: Phase 05 - About and Resume accuracy.
- Next phase: Phase 06 - Services hub and offer hierarchy (decision-gated on currency order / offer details).
- Latest checks: TypeScript passes (0 errors), SEO CI checks pass 6/6, dev server returns HTTP 200 across `/`, `/about/`, `/resume/`, and `/services/`.
- Prohibited without new approval: commit, push, deploy, database migration, production form/API submissions, public route deletion, or price/currency changes. Execute Phase 06 only after owner approval.

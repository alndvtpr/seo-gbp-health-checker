# Forensic Architecture Audit: Risk Register (Task 00)

> **Document Status:** READ-ONLY ARCHITECTURAL RISK RANKING
> **Auditor:** Senior Next.js Software Architect
> **Target Application:** Alain Dave Tapiru Portfolio & Technical SEO Platform (`payload-website`)
> **Date:** August 2026

This register documents and prioritizes all architectural, maintainability, dependency, and structural risks discovered during the forensic audit.

---

## Risk Summary Matrix

| Level | Finding ID | Description | Primary Files Involved |
| :--- | :--- | :--- | :--- |
| **CRITICAL** | `RISK-01` | Floating `"latest"` Dependencies for Payload Ecosystem | `package.json` |
| **CRITICAL** | `RISK-02` | Redundant / Dead Route Candidate `projects/_[slug]/page.tsx` | `src/app/(frontend)/projects/_[slug]/page.tsx` |
| **HIGH** | `RISK-03` | Monolithic `GBPHealthChecker.tsx` & `api/gbp-audit/route.ts` Mixing Concerns | `src/components/GBPHealthChecker.tsx`, `src/app/(frontend)/api/gbp-audit/route.ts` |
| **HIGH** | `RISK-04` | Service Pages Massive Code & Layout Duplication (~3,500 duplicated lines) | `src/app/(frontend)/services/*/page.tsx` (5 pages) |
| **HIGH** | `RISK-05` | Unnecessary Client Page Boundary on `/tools` (`tools/page.tsx`) | `src/app/(frontend)/tools/page.tsx`, `src/app/(frontend)/tools/layout.tsx` |
| **MEDIUM** | `RISK-06` | Fragmented & Inlined Schema.org JSON-LD across 14 Files | `src/app/(frontend)/**/*.tsx`, `src/components/JsonLd.tsx` |
| **MEDIUM** | `RISK-07` | Inlined HTML Email Templates in Server Actions | `src/app/actions/*.ts` |
| **MEDIUM** | `RISK-08` | Unnecessary Client Component Boundaries on Static Trees | `src/components/Footer.tsx`, `src/components/ScrollHero.tsx` |
| **MEDIUM** | `RISK-09` | Dead Code Components & Legacy Route Leftovers | `src/components/TrustCommitment.tsx`, `ServicesPillar*.tsx`, `src/app/my-route/` |
| **LOW** | `RISK-10` | Unused Static Assets in Public Directory (~3.2 MB `hero-frames/`) | `public/hero-frames/*`, `next.config.ts` |
| **LOW** | `RISK-11` | Hardcoded Fallback Google Sheets Webhook Across Multiple Action Files | `src/app/actions/*.ts` |

---

## Detailed Findings

---

### Finding `RISK-01` [CRITICAL]
**Floating `"latest"` Dependencies for Payload CMS Ecosystem**

- **File(s):** [`package.json`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/package.json#L27-L33)
- **Evidence:**
  ```json
  "@payloadcms/db-postgres": "latest",
  "@payloadcms/live-preview-react": "latest",
  "@payloadcms/next": "latest",
  "@payloadcms/plugin-mcp": "latest",
  "@payloadcms/plugin-seo": "latest",
  "@payloadcms/richtext-lexical": "latest",
  "@payloadcms/ui": "latest",
  "payload": "latest"
  ```
- **Why it matters:**
  Using `"latest"` for production dependencies allows upstream minor or major breaking changes to install automatically during unpinned `pnpm install`, CI/CD pipelines, Docker container builds, or deployment platforms. A breaking change in `@payloadcms/next` or `@payloadcms/db-postgres` can immediately crash the build or admin panel.
- **Risk of changing it:**
  Low risk if pinned to the exact version currently in `pnpm-lock.yaml` (e.g. `3.88.0`). High risk if blindly upgraded across breaking revisions without testing.
- **Recommended direction:**
  In a future maintenance phase, resolve current versions from `pnpm-lock.yaml` and pin all `@payloadcms/*` and `payload` dependencies to explicit exact or caret versions (e.g. `^3.88.0`).

---

### Finding `RISK-02` [CRITICAL]
**Private Opted-Out Duplicate Route Candidate `projects/_[slug]/page.tsx`**

- **File(s):** [`src/app/(frontend)/projects/_[slug]/page.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/projects/_%5Bslug%5D/page.tsx#L1-L121)
- **Evidence:**
  The directory `src/app/(frontend)/projects/_[slug]` has a leading underscore. In Next.js App Router, folders prefixed with an underscore are private folders and are opted out of routing. Inside is a full 121-line implementation of a `ProjectDetailPage` with placeholder mockups that duplicates the active `projects/[slug]/page.tsx` (516 lines).
- **Why it matters:**
  Causes severe developer confusion, IDE search pollution, and risks accidental editing of the wrong file during maintenance.
- **Risk of changing it:**
  Zero runtime risk to delete or archive in a future cleanup phase because it is completely unreachable by Next.js routing.
- **Recommended direction:**
  Candidate for removal or archiving into documentation in a future cleanup task.

---

### Finding `RISK-03` [HIGH]
**Monolithic `GBPHealthChecker.tsx` (1,600 lines) & `api/gbp-audit/route.ts` (1,381 lines)**

- **File(s):**
  - [`src/components/GBPHealthChecker.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/components/GBPHealthChecker.tsx#L1-L1600)
  - [`src/app/(frontend)/api/gbp-audit/route.ts`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/api/gbp-audit/route.ts#L1-L1381)
- **Evidence:**
  `GBPHealthChecker.tsx` contains 79.7 KB of TypeScript JSX. It manages 12 different React states, multi-step stage progression, category benchmark comparisons, competitor grid rendering, dynamic score gauge SVGs, markdown rendering, email dispatch modals, copy-to-clipboard actions, and keyboard focus traps in a single file.
  `api/gbp-audit/route.ts` contains 54.8 KB of code mixing Serper API calls, HTML parsing, 800+ lines of category regex maps (`GBP_TAXONOMY_MAP`), Gemini prompt construction, and response normalizers.
- **Why it matters:**
  High cognitive load, high risk of regression when updating category heuristics, and difficult to test individual audit stages in isolation.
- **Risk of changing it:**
  High risk during modification because this is the core conversion engine and diagnostic tool of the website.
- **Recommended direction:**
  Do not rewrite. In a later phase, break into cohesive sub-modules:
  - Route: Extract `category-taxonomy.ts`, `serper-client.ts`, `gemini-evaluator.ts`.
  - Component: Extract `AuditScoreHeader`, `PillarBreakdownCards`, `CompetitorComparisonTable`, `ActionPlanAccordion`, `EmailReportModal`.

---

### Finding `RISK-04` [HIGH]
**Service Pages Massive Code & Layout Duplication (~3,500 duplicated lines)**

- **File(s):**
  - [`src/app/(frontend)/services/technical-seo/page.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/services/technical-seo/page.tsx) (726 lines)
  - [`src/app/(frontend)/services/on-page-seo/page.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/services/on-page-seo/page.tsx) (698 lines)
  - [`src/app/(frontend)/services/local-seo/page.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/services/local-seo/page.tsx) (718 lines)
  - [`src/app/(frontend)/services/ai-search-optimization/page.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/services/ai-search-optimization/page.tsx) (711 lines)
  - [`src/app/(frontend)/services/web-development/page.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/services/web-development/page.tsx) (731 lines)
- **Evidence:**
  All 5 service pages share an identical 7-section layout structure:
  1. Hero Section with Breadcrumbs & Badge
  2. 4-Pillar Deliverables Grid (`TECHNICAL_AUDIT_AREAS`)
  3. Problem vs Solution Cards (`PROBLEMS_SOLVED`)
  4. 4-Step Execution Workflow (`WORKFLOW_STEPS`)
  5. Technology & Tooling Badges (`TECH_STACK_TOOLS`)
  6. Service FAQ Accordion (`FAQS`)
  7. Bottom Contextual CTA Banner + Inline JSON-LD Schema
- **Why it matters:**
  Updating a single global layout or styling rule (e.g. badge style, typography scale, CTA layout) requires editing 5 separate 700+ line files, creating high drift risk.
- **Risk of changing it:**
  Low to Medium risk if extracted into a single reusable `ServicePageTemplate` component driven by strongly typed data configs while preserving 100% of the existing HTML and Schema output.
- **Recommended direction:**
  Create a unified `ServiceDetailTemplate` component and separate service data structures.

---

### Finding `RISK-05` [HIGH]
**Unnecessary Client Page Boundary on `/tools` (`tools/page.tsx`)**

- **File(s):**
  - [`src/app/(frontend)/tools/page.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/tools/page.tsx#L1)
  - [`src/app/(frontend)/tools/layout.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/tools/layout.tsx#L1-L14)
- **Evidence:**
  `tools/page.tsx` starts with `'use client'` because of the inline `SalaryCalculator` state (`useState`). Because client components cannot export `metadata` in Next.js App Router, `tools/layout.tsx` was created solely to export the page metadata.
- **Why it matters:**
  Violates Next.js App Router best practice (pages should be Server Components where possible, with interactive widgets as client islands).
- **Risk of changing it:**
  Very low risk. Extracting `<SalaryCalculator />` as a client component allows `tools/page.tsx` to become a Server Component, export `metadata` directly, and eliminate `tools/layout.tsx`.
- **Recommended direction:**
  Extract `SalaryCalculator.tsx` into `src/components/`, convert `tools/page.tsx` to a Server Component, and remove `tools/layout.tsx`.

---

### Finding `RISK-06` [MEDIUM]
**Fragmented & Inlined Schema.org JSON-LD across 14 Files**

- **File(s):**
  - `src/components/JsonLd.tsx`
  - `src/app/(frontend)/page.tsx`
  - `src/app/(frontend)/about/page.tsx`
  - `src/app/(frontend)/projects/page.tsx`
  - `src/app/(frontend)/projects/[slug]/page.tsx`
  - `src/app/(frontend)/blog/page.tsx`
  - `src/app/(frontend)/blog/[slug]/page.tsx`
  - `src/app/(frontend)/contact/page.tsx`
  - `src/app/(frontend)/resume/page.tsx`
  - `src/app/(frontend)/tools/page.tsx`
  - `src/app/(frontend)/services/*/page.tsx` (5 files)
  - `src/components/Breadcrumbs.tsx`
  - `src/components/ServicesFinalCta.tsx`
- **Evidence:**
  `JsonLd.tsx` defines the canonical `GLOBAL_JSON_LD` with `@id: https://www.alaintapiru.com/#person` and `https://www.alaintapiru.com/#website`. However, pages across the site re-define inline `author`, `publisher`, `about`, and `breadcrumb` nodes with minor variations in string formatting.
- **Why it matters:**
  Schema errors or inconsistencies in entity IDs damage Google Knowledge Graph entity disambiguation and AI search citation clarity.
- **Risk of changing it:**
  Medium risk. Changes must strictly preserve canonical URLs and `@id` entity graph references.
- **Recommended direction:**
  Centralize schema node builders in `src/lib/seo.ts` (e.g. `buildBreadcrumbSchema()`, `buildArticleSchema()`, `buildServiceSchema()`).

---

### Finding `RISK-07` [MEDIUM]
**Inlined HTML Email Templates in Server Actions**

- **File(s):**
  - [`src/app/actions/send-audit-report.ts`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/actions/send-audit-report.ts#L104-L710)
  - [`src/app/actions/send-contact.ts`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/actions/send-contact.ts#L13-L126)
  - [`src/app/actions/send-website-audit-request.ts`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/actions/send-website-audit-request.ts#L16-L440)
- **Evidence:**
  Each of the 3 server action files contains hundreds of lines of concatenated HTML table strings and plain-text template generators.
- **Why it matters:**
  Server Action logic (validation, authentication, error handling, rate limiting) is buried underneath 1,200+ lines of table-based HTML styling strings.
- **Risk of changing it:**
  Low risk. Extract templates into dedicated email template helper files.
- **Recommended direction:**
  Move email generators to `src/lib/emails/` (e.g. `audit-report-email.ts`, `contact-inquiry-email.ts`, `website-audit-email.ts`).

---

### Finding `RISK-08` [MEDIUM]
**Unnecessary Client Component Boundaries on Static Trees**

- **File(s):**
  - [`src/components/Footer.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/components/Footer.tsx#L1)
  - [`src/components/ScrollHero.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/components/ScrollHero.tsx#L1)
- **Evidence:**
  Both files start with `'use client'`, yet neither contains any React hooks (`useState`, `useEffect`), event handlers, or browser APIs.
- **Why it matters:**
  Forces Next.js to compile and send unnecessary JavaScript client bundle code to the browser for components that are 100% static HTML.
- **Risk of changing it:**
  Zero risk. Removing `'use client'` turns them into Server Components with zero change in visual rendering.
- **Recommended direction:**
  Remove `'use client'` from `Footer.tsx` and `ScrollHero.tsx`.

---

### Finding `RISK-09` [MEDIUM]
**Dead Code Candidates (8 Components & 1 Boilerplate Route Handler)**

- **File(s):**
  - `src/components/TrustCommitment.tsx` (199 lines)
  - `src/components/GBPHomepageCallout.tsx` (149 lines)
  - `src/components/HomepageFAQ.tsx` (107 lines)
  - `src/components/ServicesPillar1.tsx` (133 lines)
  - `src/components/ServicesPillar2.tsx` (164 lines)
  - `src/components/ServicesPillars3And4.tsx` (181 lines)
  - `src/components/OpenToOpportunities.tsx` (63 lines)
  - `src/app/my-route/route.ts` (13 lines)
  - `payload-website/data/projects.ts` (2 lines)
  - `src/app/(frontend)/api/preview/stitch_alain_dave_tapiru_portfolio.code-workspace`
- **Evidence:**
  Comprehensive grep searches across `src/` confirm that none of these components or routes are imported or referenced anywhere in active code.
- **Why it matters:**
  Dead code creates confusion during refactoring, slows down TypeScript compilation, and adds clutter to the repository.
- **Risk of changing it:**
  Zero risk if verified and removed or archived in a later task.
- **Recommended direction:**
  Retain as candidates for removal in Task 01 or future cleanup tasks.

---

### Finding `RISK-10` [LOW]
**Unused Static Assets in Public Directory (~3.2 MB `hero-frames/`)**

- **File(s):**
  - `public/hero-frames/frame-0001.webp` through `frame-0120.webp` (120 files, ~3.2 MB)
  - [`next.config.ts`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/next.config.ts#L152)
- **Evidence:**
  The 120 webp frames in `public/hero-frames/` were used for the legacy canvas scroll hero. The current hero in `ScrollHero.tsx` uses a static AVIF/WebP image portrait. The only reference to `hero-frames` in the entire codebase is a caching rule in `next.config.ts`.
- **Why it matters:**
  Adds unnecessary repository bloat and bandwidth consumption during git clones or deployment builds.
- **Risk of changing it:**
  Zero risk.
- **Recommended direction:**
  Remove `public/hero-frames/` and clean up `next.config.ts` cache headers in a future asset optimization phase.

---

### Finding `RISK-11` [LOW]
**Hardcoded Fallback Google Sheets Webhook Across Multiple Action Files**

- **File(s):**
  - `src/app/actions/send-audit-report.ts` (Line 89)
  - `src/app/actions/send-contact.ts` (Line 10)
  - `src/app/actions/send-website-audit-request.ts` (Line 13)
- **Evidence:**
  ```typescript
  const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
    'https://script.google.com/macros/s/AKfycbx_Dygu47h7ie8prxsSs7d5807jpF7hrHoeAxH-tewPluST6hSYu1eeTn3pQs6OMSeDfQ/exec'
  ```
  Duplicated identically across all 3 server action files.
- **Why it matters:**
  If the Google Apps Script deployment URL changes, it must be updated in 3 separate files.
- **Risk of changing it:**
  Very low risk.
- **Recommended direction:**
  Consolidate into a shared environment configuration helper in `src/lib/config.ts`.

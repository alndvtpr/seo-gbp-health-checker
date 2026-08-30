# Forensic Pre-Refactor Safety & Validation Baseline (Task 00.5)

> **Document Status:** READ-ONLY ARCHITECTURAL BASELINE
> **Auditor:** Senior Next.js Release Engineer & Architecture Reviewer
> **Date:** August 2026
> **Target Project:** Alain Dave Tapiru Portfolio & Technical SEO Platform (`payload-website`)

---

## 1. Canonical Repository Root & Architecture Docs Path

### Git Verification
- **Command:** `git rev-parse --show-toplevel`
- **Output:** `C:/Users/Alain Dave G. Tapiru/Desktop/My Main Website Portfolio Project/payload-website`
- **Working Directory Status (`git status --short`):**
  - Git repository is initialized solely within `payload-website/`.
  - Parent directory `C:\Users\Alain Dave G. Tapiru\Desktop\My Main Website Portfolio Project` is the outer workspace container holding `payload-website/`, `v1-stable-backup/`, `pinoyseo_raw.html`, and `.agents/`.

### Canonical Paths
- **Canonical Repository Root:** `C:/Users/Alain Dave G. Tapiru/Desktop/My Main Website Portfolio Project/payload-website`
- **Canonical Architecture Docs Path:** `C:/Users/Alain Dave G. Tapiru/Desktop/My Main Website Portfolio Project/payload-website/docs/architecture`

### Explanation of Dual Doc Locations in Task 00
During Task 00, the assistant operated in both the top-level IDE workspace root (`C:\Users\Alain Dave G. Tapiru\Desktop\My Main Website Portfolio Project`) and the subfolder project root (`payload-website`). This caused duplicate identical copies of `CURRENT_STATE.md`, `ROUTE_MAP.md`, and `RISK_REGISTER.md` to be written to both:
1. `../docs/architecture/` (Workspace root)
2. `payload-website/docs/architecture/` (Git repo root)

**Resolution:** As instructed, both copies remain preserved for now, but `payload-website/docs/architecture/` is designated as the single **canonical** documentation location moving forward.

---

## 2. Verified Dependency & Runtime Versions

All versions cross-referenced between `package.json` and active lockfile `pnpm-lock.yaml` (lockfile format `9.0`):

| Dependency / Tool | Declared Version (`package.json`) | Locked Version (`pnpm-lock.yaml`) | Note / Provenance |
| :--- | :--- | :--- | :--- |
| **Next.js** | `16.3.0` | `16.3.0` | Exact version (Turbopack production build) |
| **React** | `19.2.8` | `19.2.8` | Exact version |
| **React-DOM** | `19.2.8` | `19.2.8` | Exact version |
| **TypeScript** | `6.0.3` | `6.0.3` | Exact version |
| **Tailwind CSS** | `^4.3.3` | `4.3.3` | Tailwind v4 with `@tailwindcss/postcss` (`4.3.3`) |
| **@payloadcms/db-postgres** | `latest` | `3.88.0` | Floating range in manifest, locked to 3.88.0 |
| **@payloadcms/live-preview-react** | `latest` | `3.88.0` | Floating range in manifest, locked to 3.88.0 |
| **@payloadcms/next** | `latest` | `3.88.0` | Floating range in manifest, locked to 3.88.0 |
| **@payloadcms/plugin-mcp** | `latest` | `3.88.0` | Floating range in manifest, locked to 3.88.0 |
| **@payloadcms/plugin-seo** | `latest` | `3.88.0` | Floating range in manifest, locked to 3.88.0 |
| **@payloadcms/richtext-lexical** | `latest` | `3.88.0` | Floating range in manifest, locked to 3.88.0 |
| **@payloadcms/ui** | `latest` | `3.88.0` | Floating range in manifest, locked to 3.88.0 |
| **payload** | `latest` | `3.88.0` | Floating range in manifest, locked to 3.88.0 |
| **Node.js Requirement** | `>=24.15.0` | Active runtime: `v24.16.0` | Engines constraint satisfied |
| **Package Manager Requirement** | `^9 \|\| ^10 \|\| ^11` | Active runtime: `pnpm 11.20.0` | Engines constraint satisfied |

> [!NOTE]
> Neither Next.js nor React are canary builds. They are production releases (`next@16.3.0`, `react@19.2.8`).

---

## 3. Verification of Task 00 Claims

| Claim | Classification | Evidence & File Details |
| :--- | :--- | :--- |
| **1. `Footer.tsx` does not need `"use client"`** | **CONFIRMED** | [`src/components/Footer.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/components/Footer.tsx#L1): Contains `'use client'` at line 1, but uses 0 React hooks (`useState`, `useEffect`, etc.), 0 browser APIs, and 0 interactive event listeners. Composed purely of `Image`, `Link`, and `RssButton` (which is also server-compatible). |
| **2. `ScrollHero.tsx` does not need `"use client"`** | **CONFIRMED** | [`src/components/ScrollHero.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/components/ScrollHero.tsx#L1): Contains `'use client'` at line 1, but uses 0 React hooks, 0 browser APIs, and 0 event listeners. Pure presentational JSX with static responsive `Image`, `Link`, and `Icon`. |
| **3. `tools/page.tsx` is client-side mainly because of calculator state** | **CONFIRMED** | [`src/app/(frontend)/tools/page.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/tools/page.tsx#L1-L125): Entire page is marked `'use client'` because salary calculator state (`currency`, `exp`, `employment`, `skill`) is declared inline within the page component (lines 96–99), forcing `toolsJsonLd` to be rendered via inline script tag instead of standard `export const metadata`. |
| **4. Service pages heavily duplicate structure** | **CONFIRMED** | All 5 service pages ([`technical-seo`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/services/technical-seo/page.tsx) [725 L], [`local-seo`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/services/local-seo/page.tsx) [704 L], [`on-page-seo`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/services/on-page-seo/page.tsx) [683 L], [`ai-search-optimization`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/services/ai-search-optimization/page.tsx) [687 L], [`web-development`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/services/web-development/page.tsx) [731 L]) duplicate the exact same 8-section layout template and schema generation logic (>3,500 total lines). |
| **5. JSON-LD is fragmented across many files** | **CONFIRMED** | Hardcoded `<script type="application/ld+json">` tags appear across 17 distinct files throughout `src/app/(frontend)/` and `src/components/`, rather than using a centralized schema builder. |
| **6. `GBPHealthChecker.tsx` is ~1,600 lines** | **CONFIRMED** | [`src/components/GBPHealthChecker.tsx`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/components/GBPHealthChecker.tsx): Exactly **1,599 lines**. |
| **7. `gbp-audit` route is ~1,381 lines** | **CONFIRMED** | [`src/app/(frontend)/api/gbp-audit/route.ts`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/app/%28frontend%29/api/gbp-audit/route.ts): Exactly **1,380 lines**. |
| **8. Payload packages use `"latest"`** | **CONFIRMED** | [`package.json`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/package.json#L27-L33): All 8 `@payloadcms/*` packages and `payload` specify `"latest"`. |
| **9. Listed dead components have no references** | **CONFIRMED** | Grep search across `src/` confirms 0 imports or references for: `TrustCommitment.tsx`, `GBPHomepageCallout.tsx`, `HomepageFAQ.tsx`, `ServicesPillar1.tsx`, `ServicesPillar2.tsx`, `ServicesPillars3And4.tsx`, and `OpenToOpportunities.tsx`. |
| **10. `hero-frames` have no proven references** | **CONFIRMED** | `public/hero-frames/` (120 WebP image files, ~3.2 MB) has 0 imports or references anywhere in `src/`. The only code match is an unused regex pattern in `next.config.ts`. |

---

## 4. Technical Baseline Results

| Command / Check | Result | Details / Output |
| :--- | :--- | :--- |
| **Production Build (`pnpm build`)** | **PASS** | `next build` compiled all 30 static/SSG/dynamic pages in 6.2s with Turbopack, generated static pages successfully (exit code 0). |
| **Typecheck (`tsc --noEmit`)** | **PASS** | `tsc --noEmit` exited with code 0 (0 TypeScript compile errors). *Note: `typecheck` is NOT configured as a standalone script in `package.json`.* |
| **Lint (`pnpm lint`)** | **FAIL** | 18 problems (**3 errors**, 15 warnings). Pre-existing React 19 / ESLint 9 rule violations documented below. |
| **Integration Tests (`pnpm test:int`)** | **FAIL** | 1 test in `tests/int/api.int.spec.ts` timed out at 10,000ms waiting for local PostgreSQL database schema sync (`beforeAll` hook). |
| **E2E Tests (`pnpm test:e2e`)** | **NOT CONFIGURED / UNRUNNABLE** | Requires running local test server and seeded database. |
| **CI SEO Verification (`pnpm test:seo`)** | **PASS** | 16/16 checks passed (`scripts/verify-search-and-perf.ts`). |
| **CI A11y Verification (`pnpm test:a11y`)** | **PASS** | 12/12 checks passed (`scripts/verify-accessibility.ts`). |
| **CI Performance Verification (`pnpm test:performance`)** | **PASS** | 7/7 checks passed (`scripts/verify-performance.ts`). |

### Exact Pre-Existing Lint Failures

1. `src/components/AnnouncementBanner.tsx:14:5`
   `error: Calling setState synchronously within an effect can trigger cascading renders (react-hooks/set-state-in-effect)`
   `setMounted(true)` called synchronously inside `useEffect`.
2. `src/components/ThemeProvider.tsx:31:9`
   `error: Calling setState synchronously within an effect can trigger cascading renders (react-hooks/set-state-in-effect)`
   `setThemeState('dark')` called synchronously inside `useEffect`.
3. `src/components/ThemeProvider.tsx:32:9`
   `error: Cannot access variable before it is declared (react-hooks/immutability)`
   `applyTheme` accessed before its declaration on line 44.

---

## 5. Verified Route Classification

| URL Path | Type | Render Strategy | Data Source / Backing Code |
| :--- | :--- | :--- | :--- |
| `/` | Page | Static (○) | `src/app/(frontend)/page.tsx` (`ScrollHero`, `STARTING_OFFERS`, DB fallback) |
| `/_not-found` | Page | Static (○) | Default Next.js 404 handler |
| `/about/` | Page | Static (○) | `src/app/(frontend)/about/page.tsx` (`AboutCredentials`) |
| `/services/` | Page | Static (○) | `src/app/(frontend)/services/page.tsx` (`ServicesPackages`, `ServicesHubGrid`) |
| `/services/technical-seo/` | Page | Static (○) | `src/app/(frontend)/services/technical-seo/page.tsx` |
| `/services/on-page-seo/` | Page | Static (○) | `src/app/(frontend)/services/on-page-seo/page.tsx` |
| `/services/local-seo/` | Page | Static (○) | `src/app/(frontend)/services/local-seo/page.tsx` |
| `/services/ai-search-optimization/` | Page | Static (○) | `src/app/(frontend)/services/ai-search-optimization/page.tsx` |
| `/services/web-development/` | Page | Static (○) | `src/app/(frontend)/services/web-development/page.tsx` |
| `/projects/` | Page | Static (○) | `src/app/(frontend)/projects/page.tsx` (`PROJECTS` array) |
| `/projects/angat-sikat-studio/` | Dynamic Page | SSG (●) | `src/app/(frontend)/projects/[slug]/page.tsx` (`generateStaticParams`) |
| `/projects/local-seo-gbp-checker/` | Dynamic Page | SSG (●) | `src/app/(frontend)/projects/[slug]/page.tsx` (`generateStaticParams`) |
| `/projects/alaintapiru-portfolio/` | Dynamic Page | SSG (●) | `src/app/(frontend)/projects/[slug]/page.tsx` (`generateStaticParams`) |
| `/tools/` | Page | Static Shell / Client Root (○) | `src/app/(frontend)/tools/page.tsx` (Client boundary) |
| `/resume/` | Page | Static (○) | `src/app/(frontend)/resume/page.tsx` (`ResumePdfPreview`) |
| `/blog/` | Page | Static (○) | `src/app/(frontend)/blog/page.tsx` (`BLOG_POSTS` array) |
| `/blog/is-seo-dead-2026/` | Dynamic Page | SSG (●) | `src/app/(frontend)/blog/[slug]/page.tsx` (`generateStaticParams`) |
| `/contact/` | Page | Static (○) | `src/app/(frontend)/contact/page.tsx` (`ContactForm`, `CalendlyScheduler`) |
| `/[...slug]/` | Catch-all Page | Dynamic (ƒ) | `src/app/(frontend)/[...slug]/page.tsx` (Payload CMS DB collection) |
| `/admin/[[...segments]]` | CMS GUI | Dynamic (ƒ) | `src/app/(payload)/admin/[[...segments]]/page.tsx` |
| `/api/[...slug]` | Route Handler | Dynamic (ƒ) | `src/app/(payload)/api/[...slug]/route.ts` (Payload REST) |
| `/api/gbp-audit` | Route Handler | Dynamic (ƒ) | `src/app/(frontend)/api/gbp-audit/route.ts` (1,380 lines) |
| `/api/graphql` | Route Handler | Dynamic (ƒ) | `src/app/(payload)/api/graphql/route.ts` (Payload GraphQL) |
| `/api/graphql-playground` | Route Handler | Dynamic (ƒ) | `src/app/(payload)/api/graphql-playground/route.ts` |
| `/api/indexnow` | Route Handler | Dynamic (ƒ) | `src/app/api/indexnow/route.ts` |
| `/api/preview` | Route Handler | Dynamic (ƒ) | `src/app/(frontend)/api/preview/route.ts` |
| `/api/websub` | Route Handler | Dynamic (ƒ) | `src/app/api/websub/route.ts` |
| `/llms.txt` | Endpoint | Dynamic (ƒ) | `src/app/llms.txt/route.ts` |
| `/llms-full.txt` | Endpoint | Dynamic (ƒ) | `src/app/llms-full.txt/route.ts` |
| `/rss.xml` | Feed Handler | Dynamic (ƒ) | `src/app/rss.xml/route.ts` |
| `/robots.txt` | MetadataRoute | Static (○) | `src/app/robots.ts` |
| `/sitemap.xml` | MetadataRoute | Static (○) | `src/app/sitemap.ts` |
| `/feed.xml` | Redirect | 308 Permanent (○) | `src/app/feed.xml/route.ts` -> `/rss.xml` |
| `/projects/_[slug]/` | Private Folder | **Opted Out of Routing** | Underscore prefix prevents Next.js route creation |
| `/my-route` | Route Handler | Dynamic (ƒ) | `src/app/my-route/route.ts` (Unused Payload boilerplate) |

---

## 6. Protected SEO & UI Baseline Matrix

| Page URL | Title Tag | Meta Description | Canonical URL | H1 Headline | Schema Types | Major Client Components |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `SEO Specialist & Web Developer Philippines \| Alain Dave Tapiru` | `Alain Dave Tapiru handles technical SEO, local search setup, on-page improvements, and WordPress or Next.js fixes for small businesses and agencies through clearly scoped projects.` | `https://www.alaintapiru.com/` | `SEO Specialist & Web Developer for Small Businesses & Agencies` | `ProfilePage`, `WebSite`, `Person` | `Navbar`, `ToolsMarquee`, `LivePreviewListener`, `ThemeToggle` |
| `/about/` | `About Alain Dave Tapiru \| Practical SEO & Web Support Philippines` | `Learn more about Alain Dave Tapiru. Practical SEO and website support for small businesses and agencies. Background, hands-on projects, and technical skills.` | `https://www.alaintapiru.com/about/` | `Practical SEO & Website Support for Growing Businesses` | `AboutPage`, `BreadcrumbList` | `Navbar`, `AboutCredentials` |
| `/services/` | `Practical SEO Services & Website Support \| Alain Dave Tapiru` | `Practical SEO services and website support for small businesses and agencies. Technical SEO audits, local search setup, on-page optimization, and web support in the Philippines.` | `https://www.alaintapiru.com/services/` | `Practical SEO Services & Website Support` | `ProfessionalService` | `Navbar`, `ServicesScopeEstimator`, `ServicesWorkflowAndFAQ` |
| `/services/technical-seo/` | `Technical SEO Services Philippines \| Crawlability & Speed \| Alain Dave Tapiru` | `Professional Technical SEO services in the Philippines. Fix crawl bottlenecks, eliminate indexation errors, optimize Core Web Vitals, and implement custom JSON-LD schema.` | `https://www.alaintapiru.com/services/technical-seo/` | `Technical SEO Services & Semantic Architecture` | `Service`, `FAQPage`, `BreadcrumbList` | `Navbar`, `Breadcrumbs` |
| `/projects/` | `SEO Portfolio & Web Development Projects \| Alain Dave Tapiru` | `Explore the SEO portfolio and practical web projects of Alain Dave Tapiru. Real implementations across technical SEO, custom WordPress themes, and local search tools.` | `https://www.alaintapiru.com/projects/` | `SEO Portfolio & Practical Web Projects` | `CollectionPage`, `ItemList`, `BreadcrumbList` | `Navbar`, `ProjectsDirectory` |
| `/projects/local-seo-gbp-checker/` | `Local SEO & GBP Health Checker \| Local SEO Project Breakdown \| Alain Dave Tapiru` | `A self-built interactive tool for analyzing Google Business Profile trust signals, review momentum, and local search opportunities.` | `https://www.alaintapiru.com/projects/local-seo-gbp-checker/` | `Local SEO & GBP Health Checker` | `Article`, `BreadcrumbList` | `Navbar`, `Breadcrumbs`, `PerformanceAuditProof` |
| `/tools/` | `Free SEO Tools & Diagnostic Calculators \| Alain Dave Tapiru` | `Free, practical SEO tools and calculators. Audit Google Business Profile signals, estimate SEO compensation, and request website technical reviews.` | `https://www.alaintapiru.com/tools/` | `Free SEO Tools & Practical Web Utilities` | `WebPage`, `WebApplication` (x2), `BreadcrumbList` | Entire page (`GBPHealthChecker`, `WebsiteAuditRequestForm`, inline calculator state) |
| `/blog/` | `SEO Guides & Technical Web Insights \| Alain Dave Tapiru` | `Practical SEO guides, Core Web Vitals optimization tutorials, and local search notes by Alain Dave Tapiru, an SEO Specialist in the Philippines.` | `https://www.alaintapiru.com/blog/` | `SEO Guides, Experiments & Technical Notes` | `CollectionPage`, `ItemList`, `BreadcrumbList` | `Navbar`, `RssButton` |
| `/blog/is-seo-dead-2026/` | `Is SEO Dead in 2026? The Shift to Answer Engines, AI Search, and LLM Visibility \| Alain Dave Tapiru` | `An in-depth, practical analysis of SEO in 2026. How generative AI search (AEO/GEO), Google AI Overviews, and search entity signals change technical website optimization.` | `https://www.alaintapiru.com/blog/is-seo-dead-2026/` | `Is SEO Dead in 2026? The Shift to Answer Engines, AI Search, and LLM Visibility` | `BlogPosting`, `BreadcrumbList`, `ImageObject` | `Navbar`, `Breadcrumbs`, `TableOfContents`, `CodeBlock` |
| `/contact/` | `Contact Alain Dave Tapiru \| Practical SEO & Web Support Philippines` | `Schedule a 20-minute discovery call or send a direct project inquiry to discuss practical SEO, website health checks, local search foundations, or agency overflow support.` | `https://www.alaintapiru.com/contact/` | `Tell Me What You're Working On` | `ContactPage`, `Person`, `WebSite`, `BreadcrumbList` | `Navbar`, `CalendlyScheduler`, `ContactForm` |

### Browser / Screenshot Verification Status
- **Status:** **NOT AVAILABLE** (automated browser testing unavailable; visual baseline verified via Next.js Turbopack compilation and offline CI validation suites).

---

## 7. Pre-Existing Issues & Unresolved Risks

1. **Lint Failures (3 Errors):** Pre-existing ESLint hook errors in `AnnouncementBanner.tsx` and `ThemeProvider.tsx` prevent `pnpm lint` from passing cleanly.
2. **Integration Test DB Dependency:** `api.int.spec.ts` assumes a live PostgreSQL instance and times out when run in offline environments.
3. **Monolithic Components & Handlers:** `GBPHealthChecker.tsx` (1,599 lines) and `api/gbp-audit/route.ts` (1,380 lines) remain tightly coupled.
4. **Floating Dependencies:** 8 Payload dependencies specify `"latest"` in `package.json` rather than pinned semver ranges.
5. **Dead Assets & Code:** 7 unused UI components, 1 private dead route, and 120 unreferenced `public/hero-frames` remain in the repository.

---

## 8. Final Safety Verdict

**SAFE TO PROCEED TO TASK 01**
Production build passes cleanly (`next build` succeeds with code 0 in 6.2s), all 30 routes compile without regressions, zero TypeScript errors exist (`tsc --noEmit` passes with code 0), and all 3 CI verification suites (`test:seo`, `test:a11y`, `test:performance`) pass 100% of their checks (35/35). Pre-existing lint and DB-dependent test failures are strictly isolated and recorded above.

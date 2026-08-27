# Repository and Live-Site Baseline

Baseline date: 2026-08-26 (Asia/Manila)

## Scope and safety result

Phase 01 inspected the repository, public production responses, public sitemap and robots output, public project destinations, the repository resume PDF, installed package versions, routes, metadata, schema, forms, integrations, tests and documentation. No production source, UI, copy, route, CMS schema, metadata, dependency, lockfile, database record, commit, push or deployment was changed.

## Repository and deployment identity

| Item | Observation |
|---|---|
| Repository | `payload-website/` |
| Branch | `main` |
| Local HEAD | `739c59e47b638f34d38612623dd274ad98304e08` |
| GitHub `origin/main` | Same SHA, verified read-only on 2026-08-26 |
| Working tree at start | Clean |
| Latest commit time | 2026-08-26 21:03:31 +08:00 |
| Public provider | Vercel, identified by `Server: Vercel` |
| Public sitemap generation time | 2026-08-26 13:04:37.519Z |
| Deployment SHA | Not exposed in public headers or HTML |
| Deployment inference | Sitemap time is about 66 seconds after the latest commit time in UTC, which strongly suggests alignment but does not prove the deployed SHA |
| Apex behavior | `https://alaintapiru.com/` returns 308 to `https://www.alaintapiru.com/` |
| Canonical host | `https://www.alaintapiru.com/` with trailing slashes |

The direct public responses returned HTTP 200 for Home, Services, Contact, sitemap and robots. Security headers included HSTS, `X-Frame-Options: DENY`, `Content-Security-Policy: frame-ancestors 'none'` and Vercel cache metadata. `X-Powered-By` was absent.

## Documentation baseline

- The active Git repository already contained `payload-website/docs/plan.md`.
- The workspace also contained `../docs/plan.md` outside Git.
- Before Phase 01, the workspace copy had four historical roadmap sections and a deviation-control section missing from the tracked copy.
- Phase 01 updates both plan copies to reference the controlled audit records and treats the tracked repository plan as the master roadmap.
- The four supporting records are not alternate roadmaps; their scopes are implementation state, facts, decisions and evidence.

## Framework and application architecture

| Area | Verified implementation |
|---|---|
| Next.js | 16.3.0, App Router, Turbopack, React strict mode |
| React | 19.2.8 |
| Payload CMS | 3.88.0 |
| Database adapter | `@payloadcms/db-postgres` 3.88.0, configured for PostgreSQL/Supabase |
| Styling | Tailwind CSS 4.3.3 plus frontend CSS tokens |
| TypeScript | 6.0.3 with strict/noEmit configuration |
| Package manager | pnpm 11.19.0; lockfile present |
| Theme | Light-first SSR class/data attribute, localStorage persistence, dark/light class strategy |
| Fonts | Inter and Plus Jakarta Sans through `next/font` |
| CMS collections | users, media, folders, tags, pages and ai-memory |
| CMS rendering | Homepage optionally loads Payload `pages/index`; hard-coded React content is the offline fallback |

Configuration drift recorded for later work:

- `README.md` still describes the Payload blank template and MongoDB.
- `docker-compose.yml` uses Node 20 and MongoDB, while the application uses PostgreSQL and requires Node 24.15+ in `package.json`.
- `Dockerfile` uses Node 22.17 and expects Next standalone output, but `next.config.ts` does not enable `output: 'standalone'`.
- Package and content references to Next.js 15 remain even though 16.3.0 is installed.
- pnpm warns that `package.json#pnpm.onlyBuiltDependencies` is ignored by pnpm 11 and should be moved to current pnpm configuration in a later technical phase.

## Route inventory

### Public canonical sitemap routes (17)

1. `/`
2. `/about/`
3. `/resume/`
4. `/projects/`
5. `/tools/`
6. `/services/`
7. `/blog/`
8. `/contact/`
9. `/services/technical-seo/`
10. `/services/on-page-seo/`
11. `/services/local-seo/`
12. `/services/ai-search-optimization/`
13. `/services/web-development/`
14. `/projects/angat-sikat-studio/`
15. `/projects/local-seo-gbp-checker/`
16. `/projects/alaintapiru-portfolio/`
17. `/blog/is-seo-dead-2026/`

### Additional public or operational routes

- `/feed.xml` - 308 redirect to `/rss.xml`
- `/rss.xml` - dynamic RSS output
- `/llms.txt` and `/llms-full.txt` - machine-readable profile content
- `/robots.txt` and `/sitemap.xml`
- `/my-route` - example Payload-backed JSON route, not in the sitemap
- `/[...slug]` - Payload CMS catch-all page rendering
- Payload admin/API: `/admin/[[...segments]]`, `/api/[...slug]`, `/api/graphql`, `/api/graphql-playground`
- Application APIs: `/api/gbp-audit`, `/api/indexnow`, `/api/preview`, `/api/websub`

The production build generated 30 static/SSG page units and displayed the expected dynamic route table. The canonical sitemap contains 17 URLs.

### Redirect baseline

`next.config.ts` defines 15 redirect rules:

- Three apex-domain rules normalize root, extensionless paths and asset paths to `www`.
- `/facebook.com*` and `/www.facebook.com*` aliases redirect to the owner's Facebook profile.
- Legacy project aliases for ClaimScale, Executive Optical and SaaS Growth Engine redirect to the three current project slugs.

No redirect was changed in Phase 01.

## Current live page identity

Direct production HTML on 2026-08-26 returned:

| Route | Title | H1 |
|---|---|---|
| `/` | SEO Specialist Philippines \| Practical SEO & Web Support \| Alain Dave Tapiru | Practical SEO & Website Support For Small Businesses & Agencies |
| `/services/` | Practical SEO Services & Website Support \| Alain Dave Tapiru | Practical SEO Services & Website Support |
| `/contact/` | Contact Alain Dave Tapiru \| Practical SEO & Web Support Philippines | What Would You Like Help With? |

A search-crawler cache opened on the same date showed an older homepage/service presentation with another H1, older footer/navigation, Next.js 15 labels and an Off-Page SEO offer. Direct HTML, the live sitemap and the repository align with the newer four-package presentation. This is recorded as cache/deployment consistency evidence, not as proof of a CDN defect.

## Commercial presentation baseline

- Current packages and prices: $280/PHP 15,500; $480/PHP 27,000; $850/PHP 48,000; $450/PHP 25,000 monthly.
- Services estimator defaults to USD and renders the USD toggle before PHP.
- Monthly support advertises 20-25 hours per month.
- Default selected add-ons are Core Web Vitals and schema.
- Package cards and the Contact dropdown use the four current offers, plus Local SEO, flexible budget and general inquiry choices.
- Homepage, child-service and estimator query parameters do not consistently map to Contact options; examples are documented in `fact-inventory.md`.
- Old PHP 3,500/7,500/8,500 CTAs remain on project detail pages.
- No current standalone Off-Page SEO package card exists, but unsupported Off-Page SEO and authority-link language remains in `llms-full.txt` and some service/methodology copy.

No price, offer, CTA or contact parameter was changed.

## Metadata, schema and crawler baseline

- `generateMetadata` normalizes canonicals to the `www` origin and trailing slash.
- Global frontend JSON-LD renders WebSite, ProfilePage, Person and ProfessionalService/LocalBusiness on every frontend route.
- The global graph exposes email, telephone, a precise street address and exact coordinates.
- Route-specific JSON-LD exists for About, Resume, Contact, Projects, Blog, Tools, service routes and detail routes.
- Breadcrumb JSON-LD is generated by the reusable Breadcrumbs component and also appears in several route-specific graphs; direct Services and Contact HTML each contained two BreadcrumbList objects.
- Direct Services HTML contained the global ProfilePage plus multiple Service objects.
- Sitemap returns 17 current canonical URLs.
- Robots allows general and named search/AI crawlers except `/api/`, `/admin/` and `/private/`; blocks Bytespider, CCBot, Diffbot, ImagesiftBot, PetalBot, TurnitinBot, Scrapy, FacebookBot and Amazonbot; references both sitemap and RSS.
- Crawler policy changes are not approved.
- `llms.txt` and `llms-full.txt` are experimental content endpoints and contain outdated or unsupported statements requiring later review.

## Forms, analytics and integrations baseline

| Area | Current implementation | Phase 01 handling |
|---|---|---|
| Contact form | React Hook Form + Zod + server action; Google Sheets and Resend dispatch | Static inspection only; no submission |
| Required fields | Name, email, service and message use `aria-required`; native `required` is absent | Recorded for Phase 15/11 |
| Website audit request | Zod + Google Sheets + dual Resend email flow | No submission |
| GBP audit | Serper Places + Gemini with report/email flows | No external API call |
| Calendly | Lazy inline widget plus direct fallback | Public widget not booked or submitted |
| Analytics | GA4 via `@next/third-parties/google`; hard-coded fallback measurement ID exists | Configuration recorded only |
| IndexNow | API route and Payload hooks can dispatch URLs | No ping sent |
| WebSub | API route/client can notify a hub | No ping sent |
| Preview | Secret-gated preview route | No preview state changed |

Environment variable names were inventoried without exposing values. `.env` and `.env.local` contain active-looking configuration and remain unmodified.

## Resume and credential evidence baseline

- Repository PDF `public/Alain_Dave_Tapiru_Resume.pdf` is one tagged US Letter page, generated 2026-08-18.
- It was rendered and visually inspected; the page was legible with no clipping or overlap.
- Resume role: `SEO Specialist & Technical Virtual Assistant`.
- Resume employment/training/education facts are classified in `fact-inventory.md`.
- SOVA Batch 32 verification page returned HTTP 200 and included the owner name.
- Coursera verification URL returned HTTP 200 and redirected to its accomplishment URL; owner name was not visible in raw server HTML.
- Resume skill listings are not treated as proof of paid delivery or permission to create services.

## Project link baseline

| Destination | Result |
|---|---|
| `https://angat-sikat.freedev.app/` | HTTP 200 |
| `https://www.alaintapiru.com/tools/` | HTTP 200 |
| `https://github.com/alndvtpr` | HTTP 200 |

## Validation baseline

| Check | Status | Evidence |
|---|---|---|
| Formatter | NOT RUN | No formatter script exists |
| Type check | PASS | Direct TypeScript compiler run returned exit 0 |
| Lint | FAIL | 9 errors, 24 warnings; primary errors are React effect state rules, ThemeProvider declaration ordering, one internal anchor and one `prefer-const` issue |
| Tests | NOT RUN | Existing suites can touch configured database; E2E frontend assertions target the obsolete blank template |
| Production build | PASS | Next.js 16.3.0 compiled/type-checked and generated 30 pages using an isolated unreachable local DB URI; fallback handled the expected connection refusal |
| SEO checks | PASS | 6/6 checks; 17 sitemap routes, 3 projects and 1 blog article |
| Accessibility checks | NOT RUN | Static findings recorded; no UI changed in Phase 01 |
| Responsive checks | NOT RUN | Automated browser execution is prohibited by the existing project plan; no UI changed |
| Light theme | NOT RUN | No UI changed |
| Dark theme | NOT RUN | No UI changed |
| Console/hydration | NOT RUN | No local browser session was launched |
| Live HTTP | PASS | Home, Services, Contact, sitemap and robots returned 200; apex returned 308 to `www` |
| Diff and secret review | PASS | Only documentation files are changed; `git diff --check` passed and no credential-shaped values were found in the Phase 01 documents |

## Pre-existing issues recorded, not fixed

1. Lint currently fails with 9 errors and 24 warnings.
2. Full automated tests are unsafe without an isolated database; E2E frontend expectations are stale.
3. Framework/version copy still references Next.js 15.
4. `llms-full.txt` contains unsupported Off-Page SEO/Digital PR language.
5. Global ProfilePage and business schema are applied beyond profile-focused routes.
6. Duplicate BreadcrumbList objects are observable on multiple routes.
7. Precise address/geocoordinates are public without an explicit permission/eligibility record.
8. Native HTML `required` is absent from required Contact fields.
9. Contact service preselection and old project-price CTAs are inconsistent with current packages.
10. README/Docker configuration remains from the Payload blank-template/MongoDB baseline and does not describe the current PostgreSQL application.

## Phase 02 validation delta

Phase 02 changed only the shared frontend stylesheet and the theme-toggle class marker. It did not change page copy, routes, metadata, schema, pricing, dependencies, integrations or component APIs.

| Check | Status | Evidence |
|---|---|---|
| Type check | PASS | Direct TypeScript compiler run returned exit 0. |
| SEO checks | PASS | 6/6 checks; 17 sitemap routes, 3 projects and 1 blog article. |
| Production build | PASS | Next.js 16.3.0 compiled, type-checked and generated 30 pages with an isolated unreachable local database; the expected fallback handled the connection refusal. |
| Lint comparison | BASELINE UNCHANGED | 9 errors and 24 warnings; no finding is in either Phase 02 production file. |
| Local HTTP | PASS | Home, Services, Contact and Blog returned HTTP 200 from `http://localhost:3000`. |
| Compiled CSS | PASS | The served stylesheet contains the new action/card tokens, button rule, focus-visible rule and reduced-motion rule. |
| Action contrast | PASS | Light primary 7.09:1, light primary-container 5.02:1 and dark primary-container 5.73:1 for their configured foreground colors. |
| Responsive/theme visual review | OWNER REVIEW PENDING | Automated browser execution is prohibited by `docs/plan.md`; inspect representative pages at 390, 768 and 1440 pixels in light and dark themes. |
| Diff check | PASS | `git diff --check` reports no whitespace errors. |

The local development server logged the already-documented database connectivity failure because the sandbox could not resolve the configured Supabase host. The homepage fallback still returned HTTP 200; no database write was attempted.

## Phase 03 validation delta

Phase 03 changed only global navigation and footer reachability. It did not change page body copy, public URLs, redirects, metadata, schema, pricing, packages, dependencies, integrations or the theme/announcement controls.

| Check | Status | Evidence |
|---|---|---|
| Initial mobile state | PASS - STATIC/SSR | `menuOpen` initializes false; the mobile dialog is conditionally absent from fresh server HTML while the trigger reports `Open navigation menu` and `aria-expanded="false"`. |
| Navigation model | PASS | Services, Projects, About and Blog plus the existing Contact action form five primary choices; logo/name remains Home; Resume and Tools are secondary. |
| Accessibility implementation | PASS - CODE/TYPE | State-aware menu labels, expanded/control relationships, modal semantics, initial focus, dynamic focus containment, Escape closure/focus restoration and exact-route `aria-current` are implemented. |
| Route reachability | PASS | Aggregated rendered links from the eight hub routes include all 17 canonical sitemap URLs. No route or redirect changed. |
| Type check | PASS | Direct TypeScript compiler run returned exit 0 after the final navigation hardening. |
| Targeted lint | PASS WITH BASELINE WARNING | Navbar and Footer contain no lint errors; Navbar retains the pre-existing `@next/next/no-img-element` logo advisory. |
| SEO checks | PASS | Search/performance verification remains 6/6 with 17 sitemap routes, 3 projects and 1 blog article. |
| Production build | PASS | Next.js 16.3.0 compiled, type-checked and generated 30 pages with an isolated unreachable local database; the expected homepage fallback handled the connection refusal. |
| Responsive, keyboard and theme interaction | OWNER REVIEW PENDING | Automated browser execution is prohibited by `docs/plan.md`; perform the Phase 03 checklist after a fresh reload. |

An already-open development-browser page previously emitted a hot-refresh hydration warning while it still held stale pre-Phase-03 navigation markup and extension-injected styles. Fresh server HTML contains the new closed-state markup. The owner subsequently accepted Phase 03 without supplying detailed manual viewport or keyboard observations; automated evidence remains the recorded verification baseline.

## Phase 04 validation delta

Phase 04 changed the homepage route and hero positioning only. It did not change public routes, redirects, global schema, dependencies, integrations, package names, exact prices, the theme system, reusable project data or database content.

| Check | Status | Evidence |
|---|---|---|
| Decision gate | PASS | Owner approved Model B, the free Website Health Check, `Request a Website Health Check` targeting `/tools/#website-audit`, and `SEO Specialist & Web Developer` on 2026-08-27. |
| Homepage structure | PASS - STATIC/SSR | Local HTML contains exactly seven semantic sections, one H1, four FAQ summaries and all three project-breakdown actions. |
| Initial H1 visibility | PASS - STATIC/SSR | H1 is present in initial HTML and has no `hero-animate` or `motion-reveal` dependency. |
| CTA and anchor integrity | PASS | Two primary homepage actions target `/tools/#website-audit`; destination routes returned HTTP 200; no actual `href="/services/#estimator"` remains and the sample verification points to `/services/#scope-estimator`. |
| Project evidence | PASS - CODE/DATA | Three `PROJECTS` records supply origin labels, exact roles, implementation details and non-empty image alternatives. No testimonial, logo, counter or client result was added. |
| Type check | PASS | Direct TypeScript compiler run returned exit 0. |
| Targeted lint | PASS | Homepage route and ScrollHero returned no lint findings. |
| Full lint comparison | BASELINE UNCHANGED | 9 errors and 24 warnings; no finding is in either Phase 04 production file. |
| SEO checks | PASS | Search/performance verification remains 6/6 with 17 sitemap routes, 3 projects and 1 blog article. |
| Production build | PASS | Next.js 16.3.0 compiled, type-checked and generated 30 pages with an isolated unreachable local database; the expected homepage fallback handled the connection refusal. |
| Local HTTP | PASS | Homepage, Tools, Projects and Services returned HTTP 200 from `http://localhost:3000`. |
| Responsive/theme/reduced-motion/keyboard visual review | OWNER REVIEW PENDING | Automated browser execution is prohibited by `docs/plan.md`; review the Phase 04 homepage from 320 through 1440 pixels in both themes and test reduced motion plus keyboard focus. |
| Diff check | PASS | `git diff --check` reports no whitespace errors. |

The local development server uses an isolated unreachable database URI; no database write, form submission, external record, commit, push or deployment occurred.

During the final Phase 04 handoff, repository state changed concurrently: local `main` and `origin/main` advanced from `739c59e` to `9f54500` at 2026-08-27 11:10:59 +08:00. The commit contains the cumulative Phase 01-04 work together with separate portrait and schema updates. No commit or push command was run by the Phase 04 task, and no reset, revert or other destructive correction was attempted. Deployment identity was not checked and must not be inferred from this Git observation.

## Phase 03 navigation correction validation delta

The owner directed a navigation correction after Phase 04, superseding the earlier five-primary-choice information architecture. Only `src/components/Navbar.tsx` changed in production code; About and Resume content remained untouched.

| Check | Status | Evidence |
|---|---|---|
| Top-level route visibility | PASS - STATIC/SSR | Rendered homepage navigation contains Home, Services, Projects, About, Resume, Tools and Blog plus the existing Contact action. |
| Social visibility | PASS - STATIC/SSR | Gmail, Facebook, LinkedIn and GitHub accessible names and destinations are rendered for desktop and supplied in the conditional mobile dialog. |
| Home redundancy | PASS | Both the explicit Home item and the owner-name/logo point to `/`. |
| Mobile initial state | PASS - STATIC/SSR | Trigger retains `aria-controls="mobile-navigation"`; the closed modal dialog is absent from initial HTML. |
| Responsive implementation | PASS - CODE | Complete desktop navigation begins at 1280 pixels; lower widths use the full overlay menu so all restored routes and social controls remain reachable without compressing the desktop bar. |
| Type check | PASS | Direct TypeScript compiler run returned exit 0. |
| Targeted lint | PASS WITH BASELINE WARNING | Navbar has no lint error and retains the existing `@next/next/no-img-element` logo advisory. |
| SEO checks | PASS | Search/performance verification remains 6/6 with 17 sitemap routes, 3 projects and 1 blog article. |
| Production build | PASS | Next.js 16.3.0 compiled, type-checked and generated 30 pages using the isolated unreachable database URI; the expected homepage fallback handled the refusal. |
| Local HTTP | PASS | Homepage returned HTTP 200 at `http://localhost:3000`. |
| Visual review | OWNER REVIEW PENDING | Confirm desktop fit at and above 1280 pixels and the overlay menu below 1280 pixels in both themes; automated browser execution remains prohibited by `docs/plan.md`. |

## Phase 05 resume validation delta

Phase 05 remains in progress because About wording is decision-gated. This completed resume subtask replaced the public download with the owner-supplied two-page PDF, corrected only the owner-confirmed Meta/Coursera title, and aligned the web resume credential entry. About production copy did not change.

| Check | Status | Evidence |
|---|---|---|
| Owner decisions | PASS | The owner confirmed `Introduction to Social Media Marketing`, approved continued display of city/phone/email and directed use of the supplied resume file on 2026-08-27. |
| PDF source integration | PASS | The public asset is a two-page US Letter PDF based on the owner-supplied 341,284-byte file; the final public file is 391,408 bytes after rebuilding page 2 for the exact credential correction. |
| PDF text integrity | PASS | Extraction finds `Introduction to Social Media Marketing`, does not find `Introduction to Digital Marketing`, and preserves the supplied contact, summary, skills, experience and education content. |
| PDF visual QA | PASS | Both final pages were rendered at 2.2x and inspected; text is legible with no clipping, overlap, black boxes or broken glyphs. |
| Web resume consistency | PASS - STATIC/SSR | `/resume/` renders the exact credential title, city, phone, email and both PDF actions; the former combined credential title is absent. |
| Embedded viewer initial state | PASS - STATIC/SSR | Resume HTML contains the site-styled preview header, labelled PDF iframe, Download and Open New Tab links, and an expanded Hide Preview control linked to `resume-pdf-frame`. |
| Embedded viewer interaction and visual fit | OWNER REVIEW PENDING | Confirm Hide/Show behavior, browser-native PDF controls, mobile stacking and light/dark appearance at `http://localhost:3000/resume/`; automated browser execution is prohibited by `docs/plan.md`. |
| Type check | PASS | Direct project TypeScript compiler run returned exit 0. |
| Targeted lint | PASS WITH BASELINE WARNING | Resume page has no finding; Navbar retains the existing `@next/next/no-img-element` advisory and has no error. |
| SEO checks | PASS | Search/performance verification remains 6/6 with 17 sitemap routes, 3 projects and 1 blog article. |
| Production build | PASS | Next.js 16.3.0 compiled, type-checked and generated all 30 pages using the isolated unreachable database URI; the expected homepage fallback handled the refusal. |
| Local HTTP and download | PASS | `/resume/` and `/Alain_Dave_Tapiru_Resume.pdf` return HTTP 200; the served PDF is 391,408 bytes and its SHA-256 matches the public file. |
## Phase 06 services validation delta

Phase 06 reordered the Services hub, established PHP-first pricing, linked package CTAs to contact query parameters, restored the free Website Health Check primary CTA, and eliminated the unauthorized standalone off-page SEO schema offer.

| Check | Status | Evidence |
|---|---|---|
| Offer hierarchy | PASS - STATIC/SSR | Packages are rendered before the capability directory (`<ServicesPackages />` before `<ServicesHubGrid />`). |
| Pricing priority | PASS - STATIC/SSR | Approved packages and scope estimator display PHP (₱) as primary and default, with USD ($) conversion switcher. |
| Package amounts | PASS | All 4 approved packages remain exact: ₱15,500 ($280), ₱27,000 ($480), ₱48,000 ($850), and ₱25,000/mo ($450/mo). |
| Preselection CTAs | PASS - STATIC/SSR | Package CTA links route to `/contact/?service=...` with URL-encoded package names. |
| Primary CTA alignment | PASS - STATIC/SSR | Hero and closing action on Services target `/tools/#website-audit` ("Request a Website Health Check"). |
| Schema graph cleanup | PASS - JSON-LD | Standalone Off-Page SEO & Authority Building offer removed from `ServicesFinalCta.tsx` schema graph. |
| Scope estimator bounds | PASS - COMPONENT | Defaults to entry sprint, add-ons have accessible `aria-pressed`, acceleration toggle disabled for monthly retainer. |
| Contractor / Capacity / Exclusions | PASS - STATIC/SSR | Explicit sections added for ₱500/hr contractor tasks, 4 retainer / 6 mixed capacity, and clear scope boundaries. |
| Type check | PASS | Direct TypeScript compiler (`tsc --noEmit --incremental false`) returned exit 0. |
| Targeted lint | PASS | All 6 Services files and About page pass ESLint with 0 errors and 0 warnings. |
| SEO CI test suite | PASS | 6/6 search and performance checks pass (`pnpm run test:seo`). |
| Production build | PASS | Next.js 16.3.0 compiled and generated all 30 static/SSG pages cleanly with isolated database safeguard. |
| Local HTTP / rendered HTML | PASS | `/services/` returns HTTP 200 at `http://localhost:3000/services/` with verified rendered content. |

No database write, form submission, external record, commit, push or deployment occurred.

## Phase 07 service pages validation delta

Phase 07 aligned all 5 child service pages with the approved offer model, eliminated duplicate BreadcrumbList schema, grounded case study proof labels and lab metrics, normalized framework references, and fixed Contact preselection for on-page SEO.

| Check | Status | Evidence |
|---|---|---|
| Schema deduplication | PASS - JSON-LD | `<Breadcrumbs showJsonLd={false} />` on all 5 child service pages; rendered HTML confirmed exactly 1 `BreadcrumbList` object per page. |
| Contact preselection | PASS - COMPONENT | `matchServiceParam` in `ContactForm.tsx` handles `on-page` / `onpage` / `content` and `overflow` / `backlog`. |
| Framework normalization | PASS - CONTENT | "Next.js 15" updated to "Next.js App Router" across technical and web development service pages. |
| Grounded proof labels | PASS - CONTENT | Truthful `Self-Initiated Production Build`, `Self-Initiated Staging Build`, and `Self-Initiated Diagnostic Tool` labels with explicit lab speed distinctions. |
| Type check | PASS | Direct TypeScript compiler (`tsc --noEmit --incremental false`) returned exit 0. |
| Targeted lint | PASS | All 6 modified files pass ESLint with 0 errors and 0 warnings. |
| SEO CI test suite | PASS | 6/6 search and performance checks pass (`pnpm run test:seo`). |
| Production build | PASS | Next.js 16.3.0 compiled and generated all 30 static/SSG pages cleanly with isolated database safeguard. |
| Local HTTP / rendered HTML | PASS | All 5 service routes return HTTP 200 at `http://localhost:3000/services/[slug]/`. |

No database write, form submission, external record, commit, push or deployment occurred.

## Phase 08 projects and proof evidence validation delta

Phase 08 grounded project proof classifications and lab performance labels, eliminated legacy out-of-scope CTAs (₱3,500/₱7,500/₱8,500) from project detail pages, deduplicated breadcrumbs JSON-LD schema across project routes, and normalized framework/AI tooling names.

| Check | Status | Evidence |
|---|---|---|
| Proof classification | PASS - CONTENT/DATA | All 3 projects designated as `Self-initiated build` with explicit exact role descriptions. |
| Lab benchmark labels | PASS - CONTENT | Explicit lab labels applied: "Google PageSpeed Insights Lab Score (August 2026)", "0ms Total Blocking Time (Lab)", "Passed Lab Vitals", and "Lighthouse Performance Lab Score". |
| CTA package alignment | PASS - STATIC/SSR | Legacy pricing (₱3,500, ₱7,500, ₱8,500) eliminated; project CTAs now map to approved Model B starting packages (₱15,500, ₱27,000, ₱48,000) with Contact preselection. |
| Schema deduplication | PASS - JSON-LD | `<Breadcrumbs showJsonLd={false} />` on `/projects/` and all `/projects/[slug]/` routes; rendered HTML confirmed exactly 1 `BreadcrumbList` object per page. |
| Framework normalization | PASS - CONTENT | "Next.js 16" normalized to "Next.js App Router" / "Next.js"; "Gemini Pro" updated to "Google AI Studio / Gemini 2.5 Flash". |
| Type check | PASS | Direct TypeScript compiler (`tsc --noEmit --incremental false`) returned exit 0. |
| Targeted lint | PASS | All 5 modified files pass ESLint with 0 errors and 0 warnings. |
| SEO CI test suite | PASS | 6/6 search and performance checks pass (`pnpm run test:seo`). |
| Production build | PASS | Next.js 16.3.0 compiled and generated all 30 static/SSG pages cleanly with isolated database safeguard. |
| Local HTTP / rendered HTML | PASS | `/projects/` and all 3 project routes return HTTP 200 at `http://localhost:3000/projects/...` with verified rendered content. |

No database write, form submission, external record, commit, push or deployment occurred.

## Phase 09 blog and CMS publishing model validation delta

Phase 09 grounded blog article training and experience narratives, deduplicated BreadcrumbList JSON-LD schema across `/blog/` and `/blog/[slug]/`, cleaned unused imports in the blog template, and verified the resilient hybrid CMS publishing model.

| Check | Status | Evidence |
|---|---|---|
| Narrative grounding | PASS - CONTENT/DATA | Aligned excerpt and lead in `src/data/posts.ts` to PinoySEO Bootcamp training and over a year of hands-on practice. |
| Schema deduplication | PASS - JSON-LD | `<Breadcrumbs showJsonLd={false} />` on `/blog/` and `/blog/[slug]/`; rendered HTML confirmed exactly 1 `BreadcrumbList` object per route. |
| Unused import cleanup | PASS - CODE | Removed unused type imports (`BlogPost`, `BlogImage`, `BlogSource`) in `blog/[slug]/page.tsx`. |
| CMS publishing model | PASS - ARCHITECTURE | Hybrid architecture verified: static dataset (`posts.ts`) powers resilient SSG, 0ms cold-start, deterministic edge deployment, while Payload CMS supports dynamic admin and live preview capabilities. |
| Type check | PASS | Direct TypeScript compiler (`tsc --noEmit --incremental false`) returned exit 0. |
| Targeted lint | PASS | All modified blog files pass ESLint with 0 errors and 0 warnings. |
| SEO CI test suite | PASS | 6/6 search and performance checks pass (`pnpm run test:seo`). |
| Production build | PASS | Next.js 16.3.0 compiled and generated all 30 static/SSG pages cleanly with isolated database safeguard. |
| Local HTTP / rendered HTML | PASS | `/blog/` and `/blog/is-seo-dead-2026/` return HTTP 200 at `http://localhost:3000/blog/...` with verified rendered content. |

No database write, form submission, external record, commit, push or deployment occurred.

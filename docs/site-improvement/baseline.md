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

## Phase 20 final regression, crawl and release-readiness validation delta

Phase 20 audited the cumulative Phase 13–19 workspace and current committed GBP refactors, repaired three bounded release-contract defects, and repeated the complete safe validation matrix without browser automation, production submissions or database access.

| Check | Status | Evidence |
|---|---|---|
| Announcement persistence/hydration | PASS - SOURCE/TYPE/LINT | Replaced synchronous effect-state initialization with an external-store snapshot plus local same-session dismissal; server-null rendering, persisted dismissal and 44px controls remain intact. |
| Framing security | PASS - SOURCE/HTTP | Restored `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'`; the rebuilt localhost response serves both exact values. |
| RSS media type | PASS - SOURCE/HTTP | `/rss.xml` now serves `application/rss+xml; charset=utf-8`, matching its RSS 2.0 content and advertised alternate/self type. |
| Static regression matrix | PASS | SEO/privacy/security 17/17, accessibility 12/12, performance/evidence 7/7, responsive 9/9, theme 10/10 and content/facts 10/10 pass (65/65 total). |
| Type and lint | PASS WITH WARNINGS | Direct TypeScript passes. Full ESLint exits 0 with zero errors and 12 legacy warnings, improving the Phase 19 one-error/12-warning baseline. |
| Isolated production build | PASS | Next.js 16.3.0 generated all 29 route units with `postgresql://phase20:phase20@127.0.0.1:1/phase20`; the expected refusal prevented database access while the fallback completed generation. |
| Canonical crawl and schema | PASS | All 17 canonical routes return HTTP 200 with exact self-canonicals and one H1; all 34 JSON-LD scripts parse; P-007/P-008 prohibited entities, precise coordinates and `#business` remain absent. |
| Internal links, anchors and assets | PASS | The crawl resolved 33 unique internal targets and their anchors plus 36 local assets without failure. |
| Machine endpoints and resume | PASS | Robots, sitemap, RSS, both LLM endpoints and the stable resume PDF return HTTP 200 with the expected media types. |
| Redirect behavior | PASS WITH RECORDED LIMITATION | Canonical slashed legacy aliases redirect directly to their recorded targets. Unslashed aliases first normalize to a trailing slash, then redirect to the target; no redirect rule changed under the Phase 20 authorization boundary. |
| Local preview | PASS | The rebuilt production artifact is active at `http://localhost:3000` with HTTP 200 and the corrected framing/RSS headers. |
| Browser/device/visual review | OWNER REVIEW PENDING | No automated browser, assistive-technology, real-device, orientation or owner visual/theme observation was run or claimed. |
| P-010 deployment identity | UNRESOLVED | No release occurred and the live deployment does not expose a commit SHA; no live-deployment identity conclusion is claimed. |
| P-011 database-backed suites | NOT RUN | Integration/E2E remain gated because no isolated disposable database was available; no production database, form or API was touched. |

Release-readiness conclusion: the cumulative workspace is technically ready for owner review within the verified static/build/local-crawl boundary. The owner authorized the final checkpoint commit and push on 2026-08-30; manual deployment/release remains unauthorized. It is not represented as visually/device-verified or database-integration-verified.

No commit, push, deployment, release, database write/migration, database-backed test, production form/API submission, external record, route deletion/redirect or approved-price change occurred during the audit. After the audit, the owner authorized the final checkpoint commit and push under D-034; no manual deployment or release was authorized.

## Post-Phase 20 architecture reconciliation and regression-repair validation delta

The owner completed three additional architecture PRs in a separate GitHub workflow after the verified `120979c` Phase 13–20 checkpoint. Repository ancestry proves the resulting merge commits are linear descendants of that checkpoint: `1be8de2` centralizes navigation/static sitemap routes, `6c38752` extracts unchanged homepage sections, and `d15c592` centralizes site identity and breadcrumb schema plumbing. Local `main` fast-forwarded cleanly to `d15c592` under D-035; no reset, rebase, overwrite or conflict resolution occurred.

| Check | Status | Evidence |
|---|---|---|
| Git ancestry and synchronization | PASS | `120979c` is an ancestor of `d15c592`; `git pull --ff-only origin main` advanced local `main` by exactly the three architecture commits and left local `HEAD` equal to `origin/main`. |
| Architecture scope | PASS - REVIEWED | The cumulative eight-file architecture diff adds `src/config/site.ts` and `src/components/home/HomeSections.tsx`, then rewires Navbar, sitemap, homepage and shared schema helpers without changing the canonical route set or approved visible copy. |
| Initial regression finding | FAIL - HARNESS ONLY | Accessibility was 11/12 because one exact source assertion was CRLF-sensitive. Content was 8/10 because two assertions inspected only `page.tsx` after unchanged homepage copy moved into `HomeSections.tsx`. The normalized/composed source contracts and rendered homepage passed before repair. |
| Narrow regression repair | PASS | `verify-accessibility.ts` normalizes CRLF/CR line endings before source matching. `verify-content.ts` treats `page.tsx` plus `HomeSections.tsx` as the composed homepage source. No production component or public content changed. |
| Static regression matrix | PASS | SEO/privacy/security 17/17, accessibility 12/12, performance/evidence 7/7, responsive 9/9, theme 10/10 and content/facts 10/10 pass (65/65 total). |
| Type and lint | PASS WITH WARNINGS | Direct TypeScript passes. Full ESLint exits 0 with zero errors and the same 12 legacy warnings. |
| Isolated production build | PASS | Next.js 16.3.0 generated all 29 route units with `postgresql://reconcile:reconcile@127.0.0.1:1/reconcile`; the expected connection refusal proves the configured database was unreachable while the static fallback completed generation. |
| Canonical crawl and schema | PASS | All 17 canonical local routes return HTTP 200 with exact self-canonicals and one H1; all 34 JSON-LD scripts parse. |
| Discovered links and assets | PASS | All 18 distinct local route targets and 30 distinct local static asset paths discovered by the bounded crawl return HTTP 200. This count reflects the reconciliation crawler's path-only collection and is not a replacement for Phase 20's anchor-inclusive inventory. |
| Machine endpoints and security | PASS | Sitemap contains 17 locations; RSS, sitemap, robots and both LLM endpoints return the expected media types; `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'` remain intact. |
| Protected homepage contracts | PASS - RENDERED | All four approved PHP-first package prices, `Request a Website Health Check` and `/tools/#website-audit` are present in the rendered homepage. About/service/project/blog protected paths were unchanged by the architecture commits. |
| Browser/device/visual review | OWNER REVIEW PENDING | No automated browser, assistive-technology, real-device, orientation or owner visual/theme observation was run or claimed. |
| P-010 deployment identity | UNRESOLVED | GitHub `main` and local `HEAD` match at `d15c592`, but no evidence ties the production Vercel deployment to that SHA. |
| P-011 database-backed suites | NOT RUN | Integration/E2E remain gated because no isolated disposable database was available; no production database, form or API was touched. |

Reconciliation conclusion: the GitHub architecture work safely preserves the verified Phase 13–20 checkpoint, and the local regression harness is restored to 65/65. The owner authorized one reconciliation checkpoint commit and push under D-037. No manual deployment or release is authorized.

No commit, push, deployment, release, database write/migration, database-backed test, production form/API submission, external record, route deletion/redirect or approved-price change occurred during this reconciliation.

## Phase 19 site-wide humanization and factual consistency validation delta

Phase 19 audited active public and machine-readable wording against the approved fact inventory and decision log. It changed wording and corrected documented commercial drift without changing routes, schema relationships, prices, integrations, accessibility behavior, responsive behavior, theme behavior or evidence classifications.

| Check | Status | Evidence |
|---|---|---|
| Locked owner facts | PASS - STATIC/RENDERED | The preferred title, over-the-past-year wording, Pinoy SEO Bootcamp Batch 32 attribution, Rene Leandro Padilla mentorship, exact off-page training coverage and BSIT Network and Cybersecurity wording remain unchanged. |
| Solo-practitioner voice | PASS - CONTENT | Active service and support copy uses `I`/`my` for Alain's delivery and reserves `we` for genuine collaboration with the visitor. No agency-team implication remains in the five child service pages. |
| Commercial consistency | PASS - STATIC/RENDERED | All four approved amounts remain exact and Homepage summaries are PHP-first. Services package and estimator copy both use the approved 20-25 monthly hours; the ₱500/hour rate, 4-retainer/6-mixed capacity and no-guarantee scope statement remain intact. |
| Project evidence | PASS - DATA | All three projects remain `Self-initiated build`; AngatSikat, GBP runtime and AlainTapiru.com lab/field limitations remain explicit. Unsupported lead/team, proprietary-tool and client-case-study implications were not introduced. |
| Performance and outcome language | PASS - CONTENT | Removed absolute `zero CLS`, `under 1 second`, effortless discovery, maximum reach and guaranteed inquiry implications from active Phase 19 surfaces. Dated August 2026 lab evidence remains separate from field data. |
| Privacy and entity eligibility | PASS - CONTENT/SEO | Generic client local-markup wording now requires verified business details and schema eligibility. SEO/privacy regression remains 16/16; owner-specific precise address/geocoordinates and `LocalBusiness`/`ProfessionalService` remain absent. P-007 and P-008 stay unresolved. |
| P-009 boundary | PASS - CONTENT | The exact approved About off-page training paragraph remains unchanged. No standalone link-building offer or high-authority backlink delivery claim was added. |
| Machine-readable endpoints | PASS - STATIC/HTTP | `/llms.txt` and `/llms-full.txt` use self-initiated project labels, practical method wording and the no-field-dataset boundary; unsupported proprietary and zero-DOM-thrashing claims are absent. |
| Phase 19 regression suite | PASS | `pnpm run test:content` passed 10/10 without browser automation, database access or external calls. |
| Existing regression suites | PASS | SEO/privacy 16/16, accessibility 12/12, performance/evidence 7/7, responsive 9/9 and theme 10/10 all pass. |
| Type and targeted lint | PASS | Direct TypeScript and targeted Phase 19 ESLint returned exit 0 with no findings. |
| Full repository lint | KNOWN NONZERO BASELINE | Full lint reports the unchanged `AnnouncementBanner.tsx:14` error plus 12 warnings, matching Phase 18. |
| Isolated production build | PASS | Next.js 16.3.0 generated 29 route units with `postgresql://phase19:phase19@127.0.0.1:1/phase19`; the expected refusal prevented database access while the homepage fallback completed generation. |
| Local HTTP/rendered checks | PASS | All 17 canonical routes returned HTTP 200 at `http://localhost:3000`; rendered checks confirmed PHP-first Homepage pricing, solo service voice, absence of Phase 19 absolute phrases and bounded machine output. |
| Browser/device/visual review | OWNER REVIEW PENDING | No automated browser, assistive-technology, real-device, orientation or owner visual observation was run or claimed. |
| P-011 database boundary | NOT RUN | Integration/E2E remain gated because no isolated disposable database was available; no production form or API was submitted. |

No commit, push, deployment, database write/migration, production form/API submission, external record, route deletion/redirect, approved-price change or Phase 20 implementation occurred.

## Phase 16 performance and honest measurement validation delta

Phase 16 audited performance and measurement statements against three separate evidence classes: repository-observed implementation and safeguards, dated lab artifacts, and field data. It corrected unsupported or absolute claims without representing lab measurements as field Core Web Vitals.

| Check | Status | Evidence |
|---|---|---|
| GA4 pageview integrity | PASS - REPOSITORY | Removed the manual App Router pageview emitter. The official Google Analytics integration retains automatic browser-history measurement, avoiding duplicate SPA pageviews. |
| Web Vitals instrumentation | PASS - REPOSITORY, NOT FIELD DATA | `useReportWebVitals` queues GA4 `web_vital` events with metric name, ID, value, delta, rating, navigation type and path. Collection can begin only after deployment and real browser traffic; no current p75 field dataset is claimed. |
| Evidence classification | PASS - CONTENT/MACHINE ENDPOINTS | Public components, project data, article data and `/llms-full.txt` distinguish repository evidence, dated August 2026 lab evidence and unavailable field data. Lab figures are not presented as field Core Web Vitals or permanent guarantees. |
| Dated lab artifacts | PASS - FILE METADATA | The maintained PageSpeed screenshot assets were inspected as AVIF metadata: desktop 953×826 and mobile 935×854. They support the explicitly dated portfolio lab statements only. |
| Fresh external measurement | UNAVAILABLE - HONESTLY RECORDED | A read-only PageSpeed Insights API request returned HTTP 429 because the API project exposed zero daily quota. No fresh PageSpeed rerun, CrUX result or field Core Web Vitals conclusion is claimed. |
| Unsupported performance claims | PASS - STATIC/RENDERED | Removed unsupported AngatSikat exact score/load-time figures, the GBP aggregate runtime, invented machine-readable thresholds, and absolute zero/sub-second layout or speed guarantees. |
| WebGL safeguards | PASS - REPOSITORY | Preserved interaction-triggered initialization, 480px/320px render-buffer caps, approximately 30fps scheduling, 4s idle sleep, visibility pause and reduced-motion bypass; removed an avoidable mount-state render. The historical 0ms TBT value remains dated lab evidence only. |
| Calendly and asset safeguards | PASS - REPOSITORY | Static checks confirm IntersectionObserver lazy loading, a single initialization guard, reserved scheduler height, disabled production browser source maps and AVIF/WebP image usage. |
| Performance regression suite | PASS | `pnpm run test:performance` passed 7/7. |
| SEO/privacy regression suite | PASS | `pnpm run test:seo` passed 16/16, preserving the Phase 13 Person/WebSite and P-007/P-008 privacy/eligibility boundaries. |
| Accessibility regression suite | PASS | `pnpm run test:a11y` passed 12/12, preserving the completed Phase 15 behavior and static coverage. |
| Type check | PASS | `node node_modules/typescript/bin/tsc --noEmit --incremental false` returned exit 0. |
| Targeted lint | PASS | ESLint across all Phase 16 production files returned 0 errors and 0 warnings. |
| Full repository lint | KNOWN NONZERO BASELINE | `pnpm run lint` returned 3 errors and 12 warnings, all outside Phase 16. The shader cleanup removed its former findings without introducing new ones. |
| Isolated production build | PASS | Next.js 16.3.0 compiled and generated 29 route units using `postgresql://phase16:phase16@127.0.0.1:1/phase16`; the expected refusal exercised the existing fallback. No database write occurred. |
| Canonical route verification | PASS | All 17 public canonical routes returned HTTP 200 from the local production server. Rendered checks preserved all 8 approved PHP/USD package strings, the ₱500/hour rate, the exact approved About training wording and the absence of precise coordinates or unsupported business entities. |
| P-011 integration/E2E boundary | NOT RUN | No integration or E2E suite ran because no isolated disposable database was available. No production form or API was submitted. |
| Git/workspace preservation | PASS | Separate owner-authorized Tasks 01-12 advanced local and remote `main` from `0123b8ac` to `91a4533` while Phase 16 was in progress. Those commits and every cumulative owner, Antigravity, Gemini and Codex uncommitted change were preserved; the Phase 16 task did not commit or push. |

Owner browser, visual, device and field-data review remains unreported and is not claimed. Phase 16 performed no deployment, database write/migration, production form/API submission, external record creation, route deletion/redirect, approved-price change or Phase 17-20 implementation.

## Phase 17 mobile and responsive QA validation delta

Phase 17 performed a source, compiled-style, local HTTP and rendered-HTML responsive audit without automated browser execution. It repaired evidence-supported narrow-screen containment and control-size defects while preserving content, routes, schema, integrations, prices, accessibility behavior and Phase 16 measurement classifications.

| Check | Status | Evidence |
|---|---|---|
| Viewport and global containment | PASS - SOURCE/COMPILED CSS | Device width, maximum zoom 5, `viewport-fit=cover`, `overflow-x` containment and `100dvh` rules remain present in source and the served production CSS. |
| Mobile navigation | PASS - SOURCE/SSR | Desktop/mobile split remains at `xl`; the mobile dialog retains `100dvh` scrolling, safe-area top/bottom padding, managed focus and 44px controls. The absolute close action now respects the top display cutout. |
| Dialog sizing | PASS - SOURCE/COMPILED CSS | Résumé, project, credential and GBP audit dialogs use dynamic-viewport bounds. The nested GBP email dialog allows vertical scrolling in short viewports. |
| Résumé narrow toolbar | PASS - SOURCE/COMPILED CSS | Four modal actions use an equal-width mobile grid; labels hide below 400px while accessible names remain; all actions are at least 44px high. The in-page actions and résumé contact chips also retain 44px targets. |
| Mobile form zoom guard | PASS - STATIC | All visible source-inspected inputs, selects and textareas with text-size utilities use `text-base` before the `sm` breakpoint; the extracted GBP email field was corrected from `text-sm` to `text-base sm:text-sm`. |
| Persistent touch targets | PASS - STATIC/RENDERED | Announcement actions, footer social/RSS controls, homepage social controls, Contact social controls, résumé actions, code copy, RSS variants and GBP result controls meet the 44px target contract. |
| Wide content and embeds | PASS - STATIC | Code blocks retain explicit horizontal scrolling; the duplicated tools marquee remains clipped within its container; Calendly retains `w-full min-w-0` and its reserved 680/700px height. |
| Responsive images | PASS - STATIC | Every source-inspected `next/image` instance using `fill` supplies a `sizes` hint. |
| Responsive regression suite | PASS | `pnpm run test:responsive` passed 9/9 source-level checks without browser automation. |
| Existing regression suites | PASS | Accessibility 12/12, performance 7/7 and SEO/privacy 16/16 all pass; TypeScript and targeted Phase 17 lint excluding the unchanged AnnouncementBanner baseline error pass. |
| Full repository lint | KNOWN NONZERO BASELINE | Exactly 3 errors and 12 warnings remain, matching Phase 16. The `AnnouncementBanner.tsx:14` error is on an unchanged effect line; the Phase 17 edit in that file changed classes only. |
| Isolated production build | PASS | Next.js 16.3.0 generated 29 route units with `postgresql://phase17:phase17@127.0.0.1:1/phase17`; the expected refusal exercised the existing fallback and prevented database writes. |
| Local HTTP, canonicals and schemas | PASS | All 17 canonical local routes returned HTTP 200 with exact `www` trailing-slash canonicals; all 34 JSON-LD scripts parsed; no owner-specific `LocalBusiness`/`ProfessionalService`, `#business`, precise address or coordinate assertion was rendered. |
| Commercial, training and evidence preservation | PASS | All approved PHP/USD amounts, the ₱500/hour rate and exact About training coverage remain rendered. Phase 15 accessibility checks and Phase 16 repository/lab/field distinctions remain passing. |
| Real-device and visual review | OWNER REVIEW PENDING | No automated browser, real-device, orientation, assistive-technology or owner visual observation was run or claimed. Review representative phone/tablet/desktop widths, portrait/landscape, both themes and open dialogs at `http://localhost:3000`. |
| P-011 database boundary | NOT RUN | Integration/E2E suites remain gated because no isolated disposable database is available; no production form or API was submitted. |

No existing website content changed. No commit, push, deployment, database write/migration, production form/API submission, external record, route deletion/redirect, approved-price change or Phase 18-20 implementation occurred.

## Phase 18 dark and light theme parity validation delta

Phase 18 performed a cumulative source, compiled-build and local rendered-HTTP theme audit without automated browser execution. It aligned theme state and neutral/status presentation across the public interface while preserving content, routes, schema, integrations, prices, accessibility behavior, Phase 16 evidence classifications and Phase 17 responsive behavior.

| Check | Status | Evidence |
|---|---|---|
| Theme bootstrap | PASS - SOURCE/RENDERED | The server root remains light-first. The synchronous head script reads both `alaintapiru_theme` and legacy `theme`, then updates root class, `data-theme`, background, native `color-scheme` and `theme-color` before hydration. Seven rendered bootstrap contracts pass. |
| Persistence and synchronization | PASS - STATIC | `ThemeProvider` uses a React external-store subscription, writes both storage keys, listens for cross-tab storage events and re-applies saved theme in a layout effect. |
| Toggle accessibility | PASS - STATIC | The live control exposes `aria-pressed`; the pre-mount placeholder is disabled/`aria-disabled`; both retain 44x44px minimum targets. |
| Core contrast | PASS - COMPUTED | Background/on-background, surface-1/on-surface and primary-container/on-primary-container token pairs compute to at least 4.5:1 in both light and dark themes. |
| Native controls | PASS - SOURCE | Both theme token blocks declare `color-scheme`; form controls inherit it and use tokenized accent and caret colors. |
| Shared/component parity | PASS - STATIC/COMPILED | Service CTAs/cards, workflows/FAQs, contents surfaces, forms, project/résumé/article badges, proof panels and the GBP results/report UI use paired light/dark neutral and status tokens. The score ring track/text uses current color. |
| Intentional fixed palettes | PASS - STATIC | The Calendly loading skeleton remains `#F8FAFC` with explicit dark text; the code canvas remains dark with slate-100 text; screenshot/address-bar chrome remains fixed dark where its internal palette depends on it. |
| Theme regression suite | PASS | `pnpm run test:theme` passed 10/10 source-level and computed-contrast checks without browser automation. |
| Existing regression suites | PASS | Responsive 9/9, accessibility 12/12, performance/evidence 7/7 and SEO/privacy 16/16 pass; direct TypeScript and targeted Phase 18 source lint pass. |
| Full repository lint | KNOWN NONZERO BASELINE | Full lint reports 1 error and 12 warnings. The sole error is the unchanged `AnnouncementBanner.tsx:14` effect-state line; the Phase 18 change in that component is presentation-only. |
| Isolated production build | PASS | Next.js 16.3.0 compiled and generated 29 route units with `postgresql://phase18:phase18@127.0.0.1:1/phase18`; the expected refusal prevented database access while the fallback completed static generation. |
| Local rendered HTTP | PASS | All 17 canonical local routes returned HTTP 200 at `http://localhost:3000`; the root response contains the expected light root, theme/color-scheme metadata, both storage keys and dark/light bootstrap colors. |
| Commercial, privacy and evidence preservation | PASS | No content or price was changed. P-007/P-008/P-009 boundaries, the exact About training wording, approved PHP/USD prices, ₱500/hour, capacity/scope wording, routes/schema, accessibility checks, Phase 16 evidence classes and Phase 17 responsive checks remain preserved. |
| Visual/theme/device review | OWNER REVIEW PENDING | No automated browser, real-device, orientation, assistive-technology or owner visual observation was run or claimed. Review both themes at representative phone/tablet/desktop widths, portrait/landscape, open dialogs, forms, proof panels, service pages and GBP result states at `http://localhost:3000`. |
| P-011 database boundary | NOT RUN | Integration/E2E suites remain gated because no isolated disposable database is available; no production form or API was submitted. |

No existing website content changed. No commit, push, deployment, database write/migration, production form/API submission, external record, route deletion/redirect, approved-price change or Phase 19-20 implementation occurred.

## Phase 15 accessibility remediation validation delta

Phase 15 remediated keyboard navigation, focus containment/return, dialog semantics, nonsemantic click targets, animated-content controls, résumé controls, form relationships and live feedback across the shared interface without changing routes, approved prices, commercial scope, evidence classifications, personal claims or the Phase 13 schema/privacy boundary.

| Check | Status | Evidence |
|---|---|---|
| Navigation and focus visibility | PASS - A11Y | Global skip link targets focusable `main`; desktop primary navigation is a labelled native landmark; disclosures expose controlled regions; scroll offset accounts for fixed framing. |
| Dialog keyboard model | PASS - A11Y | Shared hook provides initial focus, Tab/Shift+Tab containment, Escape dismissal and focus return for certificate, project, résumé and GBP dialogs; nested email dialog owns its events. |
| Native controls and state | PASS - A11Y | Project click targets are buttons; filters, gallery selections, audit tabs and Yes/No choices expose `aria-pressed`; interactive close targets meet the 44px goal. |
| Animated content | PASS - A11Y | Tools marquee retains its automatic animation and reduced-motion support while adding an explicit persistent pause/resume control with exposed state. |
| Résumé access | PASS - A11Y | Print/Open Tab controls retain names at narrow widths; print fallback invokes the stable PDF print dialog; modal controls use managed focus. |
| Forms and feedback | PASS - A11Y | Programmatic labels, native/ARIA required state, invalid/error relationships, busy state and status/alert announcements cover the GBP, Website Audit and Contact flows. |
| Accessibility regression | PASS | `pnpm run test:a11y` passed 12/12 static keyboard/semantic contract checks without browser automation or production submissions. |
| Type and targeted lint | PASS | Direct TypeScript returned exit 0; targeted ESLint across all Phase 15 implementation/verification files returned 0 findings. |
| SEO/privacy regression | PASS | `pnpm run test:seo` passed 16/16, preserving the Person/WebSite graph, privacy boundary and evidence-bounded machine output. |
| Production build | PASS | Next.js 16.3.0 compiled, type-checked and generated all 30 route units with `DATABASE_URI` set to an isolated unreachable PostgreSQL endpoint; the expected refusal exercised the existing homepage fallback without a database write. |
| Local HTTP/rendered checks | PASS | `/`, `/about/`, `/projects/`, `/resume/`, `/tools/` and `/contact/` returned HTTP 200 at `http://localhost:3215`; representative server-rendered skip/main, navigation, motion, project, résumé and audit-form semantics were present. |
| Full repository lint | KNOWN PRE-EXISTING ISSUES | 5 errors/17 warnings remain, improved from the pre-Phase-15 local 7-error/18-warning state. Remaining errors are confined to out-of-scope `AnnouncementBanner.tsx`, `ShaderBackground.tsx` and `ThemeProvider.tsx`. |
| Integration suite | BLOCKED BY P-011 | Existing Vitest initialization attempted to pull database schema and timed out in `tests/int/api.int.spec.ts`; no database write occurred and the path was not pursued without an isolated disposable database. |
| Diff safety | PASS | `git diff --check` reported no whitespace errors; cumulative owner, Antigravity, Gemini and Codex changes remain preserved. |

Owner visual, assistive-technology and device review has not been reported and is not claimed. No commit, push, deployment, database write/migration, production form/API submission, external record, route deletion/redirect, approved-price change or Phase 16 implementation occurred.

## Phase 14 technical SEO foundations validation delta

Phase 14 aligned crawler, canonical, sitemap and machine-readable behavior without changing public routes, approved prices, owner-approved About wording, or the Phase 13 entity graph.

| Check | Status | Evidence |
|---|---|---|
| Framework label | PASS | The remaining source-level `Next.js 16` label was normalized to `Next.js App Router`; no `Next.js 15` or `Next.js 16` claim remains in production source. |
| Crawler policy | PASS | Existing crawler allow/block decisions were preserved; `/rss.xml` was removed from `Sitemap` declarations and `/sitemap.xml` remains the sole fully qualified sitemap. |
| Sitemap integrity | PASS | 17 unique absolute canonical `www` trailing-slash URLs; only the dated article emits `lastmod`, sourced from the maintained `dateModified` value after its significant structured-data update. |
| Canonicals | PASS | All 17 rendered canonical routes returned HTTP 200 and exactly matched their self-referential `https://www.alaintapiru.com/.../` canonical. |
| Machine endpoints | PASS | `/llms.txt` and `/llms-full.txt` returned HTTP 200 as `text/plain; charset=utf-8`, used the canonical origin, and contained no unsupported off-page delivery, high-authority backlink strategy, or monthly ROI claim. |
| Phase 13 preservation | PASS | Canonical Person/WebSite graph, route-specific schema, breadcrumb deduplication, privacy-safe location handling, and the absence of owner-specific LocalBusiness/ProfessionalService assertions remain intact; the portfolio implementation summary now describes the current graph accurately. |
| Type check | PASS | Direct TypeScript compiler returned exit 0. |
| Targeted lint | PASS | All Phase 13-14 implementation and verification files returned 0 errors and 0 warnings in the combined audit. |
| SEO CI | PASS | The combined audit expanded the suite to 16 checks; 16/16 passed. |
| Production build | PASS | Next.js 16.3.0 compiled, type-checked and generated 30 route units using an isolated unreachable PostgreSQL URI; the expected homepage fallback handled the connection refusal. |
| Diff check | PASS | `git diff --check` reported no whitespace errors. |

No database write, form submission, external record, commit, push or deployment occurred.

## 2026-08-29 combined Phase 13-14 quality-audit delta

The owner-authorized combined audit re-read the complete controlled record set, inspected the cumulative uncommitted work, and checked change-sensitive requirements against current primary official documentation. The original core entity/privacy correction and crawler choices were supported and retained. The audit corrected gaps in JSON-LD serialization, canonical graph URLs, modification-date evidence, feed contents, machine-readable wording and automated regression coverage. Current Google documentation permits RSS or Atom feeds to be submitted as sitemap formats, so the earlier statement that RSS is categorically not a sitemap was too absolute; this site's selected boundary is that `/sitemap.xml` remains the sole sitemap declared in `robots.txt`, while `/rss.xml` remains a separate evidence-dated recent-update feed.

| Check | Status | Evidence |
|---|---|---|
| Controlled entity graph | PASS | Global output is limited to canonical `WebSite` and `Person`; page-specific entities resolve to canonical IDs; rendered output contains no owner-specific `LocalBusiness`, `ProfessionalService`, `#business`, precise street address or geocoordinates. P-007 and P-008 remain unresolved. |
| Visible-content and P-009 boundary | PASS | The visible Services offers and schema remain aligned; no standalone off-page/link-building offer or paid-delivery claim was introduced, while the owner-approved About training wording remains intact. |
| JSON-LD safety and validity | PASS | A shared serializer escapes `<` as `\\u003c`; all 34 scripts rendered across 17 canonical routes parsed successfully. |
| Breadcrumbs and route specificity | PASS | The homepage emits its page-specific `ProfilePage`; the other page/content entities remain route-specific; each of the 16 breadcrumb-bearing routes emits exactly one `BreadcrumbList`, and the homepage emits none. |
| Canonicals | PASS | All 17 canonical routes returned HTTP 200 and exactly one matching `https://www.alaintapiru.com/.../` self-canonical; the Contact graph's nested entity URLs now use the same exact canonical root. |
| Sitemap and RSS evidence | PASS | The XML sitemap contains 17 unique canonical URLs and exactly one `lastmod` (`2026-08-29`) from the article's maintained `dateModified`; RSS contains exactly that one canonical article recent-update item with the same evidence date. |
| Crawler policy | PASS | The existing allow/block selections and paths are unchanged; `/sitemap.xml` is the only sitemap declaration in rendered robots output. Current official documentation supports the retained Google, Anthropic, Perplexity and Apple crawler tokens; no unsupported policy expansion was made. |
| Machine endpoints | PASS | `/llms.txt` and `/llms-full.txt` return `text/plain`, use the canonical origin, and omit unsupported off-page delivery, backlink-strategy, monthly-ROI and resume-verification wording. |
| Approved commercial and personal facts | PASS | All eight approved PHP/USD package amounts, the ₱500/hour contractor rate, capacity/scope wording and approved About training wording remain rendered; no route or approved price changed. |
| Type, lint and SEO CI | PASS | Direct TypeScript passed; targeted ESLint returned 0 findings; SEO CI passed 16/16 checks. |
| Isolated production build | PASS | Next.js 16.3.0 compiled, type-checked and generated all 30 route units with an unreachable PostgreSQL URI; the expected connection refusal exercised the existing homepage fallback without a database write. |
| Rendered and endpoint regression | PASS | HTTP checks covered 17 canonical pages, 34 JSON-LD scripts, robots, sitemap, RSS and both machine-readable text endpoints with no failures. |
| Diff safety | PASS | `git diff --check` reported no whitespace errors; no tracked or untracked owner work was deleted or overwritten. |

No database write, migration, form/API submission, external record, commit, push, deployment, route deletion/redirect, price change or Phase 15 implementation occurred.

## Phase 13 page-specific structured data validation delta

Phase 13 narrowed the schema graph to repository-supported facts and page content. The global graph now contains only canonical `WebSite` (`#website`) and `Person` (`#person`) entities; homepage `ProfilePage` is emitted only on `/`, while the Resume retains its own truthful profile-page schema. The Services hub is a person-provided `Service` with its existing visible `OfferCatalog`; Tools retains two `WebApplication` entities for the visible GBP checker and compensation calculator.

| Check | Status | Evidence |
|---|---|---|
| Privacy and eligibility gates | PASS | No rendered schema contains the former precise street address, coordinates, `#business`, `LocalBusiness`, or `ProfessionalService`; P-007 and P-008 remain unresolved. |
| Canonical entity IDs | PASS | All publisher/provider references resolve to `https://www.alaintapiru.com/#person`; site relationships resolve to `#website`; route entities retain canonical trailing-slash IDs. |
| Page specificity | PASS | Homepage contains one `ProfilePage`; About, Contact, Projects, Blog, Tools, Services and detail routes expose their relevant page/content types without a global homepage ProfilePage. Resume retains a route-specific ProfilePage. |
| Breadcrumb deduplication | PASS | Rendered HTML across all 17 canonical routes contains at most one `BreadcrumbList`; all 16 breadcrumb-bearing routes contain exactly one. |
| OfferCatalog audit | PASS | Services hub and five child service pages retain catalogs tied to visible services; the stale competitor-backlink catalog entry was removed and no standalone off-page offer was introduced. |
| WebApplication audit | PASS | `/tools/` contains exactly two parseable `WebApplication` entities matching the visible GBP checker and compensation calculator. |
| JSON-LD parsing | PASS | Every JSON-LD script on all 17 canonical routes parsed successfully from local rendered HTML. |
| Type check | PASS | Direct TypeScript compiler returned exit 0. |
| Targeted lint | PASS | All Phase 13 production files returned 0 errors and 0 warnings. |
| SEO CI | PASS | 6/6 checks passed. |
| Production build | PASS | Next.js 16.3.0 completed using an isolated unreachable local database URI and generated the production output. |
| Local HTTP | PASS | All 17 canonical routes returned HTTP 200 at `http://localhost:3000`. |

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

## Phase 10 tools and commercial relevance validation delta

Phase 10 deduplicated schema on `/tools/`, converted diagnostic CTAs to client-side Next.js Links with `/contact/?service=local-seo` preselection, aligned React 19 hydration state, and enhanced salary calculator accessibility with explicit form labels, unique IDs, and `aria-pressed` toggle states.

| Check | Status | Evidence |
|---|---|---|
| Schema deduplication | PASS - JSON-LD | `<Breadcrumbs showJsonLd={false} />` on `/tools/`; rendered HTML confirmed exactly 1 `BreadcrumbList` object alongside `WebPage` and `WebApplication` schemas in the centralized `toolsJsonLd` `@graph`. |
| Commercial CTA preselection | PASS - NAVIGATION | Replaced native anchor with `<Link href="/contact/?service=local-seo">` in `GBPHealthChecker.tsx`. |
| React 19 hydration resilience | PASS - STATE | Form reset in `WebsiteAuditRequestForm.tsx` refactored to standard `key` re-render pattern. |
| Calculator accessibility | PASS - A11Y | Replaced unassociated labels with `label[htmlFor]` matching `select#salary-exp`, `select#salary-employment`, `select#salary-skill`, and added `aria-pressed` to PHP/USD toggles. |
| Type check | PASS | Direct TypeScript compiler (`tsc --noEmit --incremental false`) returned exit 0. |
| Targeted lint | PASS | All modified tools files pass ESLint with 0 errors and 0 warnings. |
| SEO CI test suite | PASS | 6/6 search and performance checks pass (`pnpm run test:seo`). |
| Production build | PASS | Next.js 16.3.0 compiled and generated all 30 static/SSG pages cleanly with isolated database safeguard. |
| Local HTTP / rendered HTML | PASS | `/tools/` returns HTTP 200 at `http://localhost:3000/tools/` with verified rendered content and accessibility attributes. |

No database write, form submission, external record, commit, push or deployment occurred.

## Phase 11 contact form and conversion reliability validation delta

Phase 11 deduplicated breadcrumb schema on `/contact/`, added native HTML `required` attributes to required form fields, synchronized `SERVICE_OPTIONS` to Model B PHP-first pricing (D-022), aligned project detail package CTA queries, and hardened Zod validation with string trimming and email lowercasing.

| Check | Status | Evidence |
|---|---|---|
| Schema deduplication | PASS - JSON-LD | `<Breadcrumbs showJsonLd={false} />` on `/contact/`; rendered HTML confirmed exactly 1 `BreadcrumbList` object alongside `ContactPage` in the page `jsonLd` `@graph`. |
| Native required semantics | PASS - A11Y/HTML | Added `required` to `input#contact-name`, `input#contact-email`, `select#contact-service`, and `textarea#contact-message` in `ContactForm.tsx`. |
| Service dropdown synchronization | PASS - CONTENT/DATA | Updated `SERVICE_OPTIONS` in `ContactForm.tsx` to PHP-first pricing (`₱15,500 / $280`, `₱27,000 / $480`, `₱48,000 / $850`, `₱25,000/mo / $450/mo`) per D-022. |
| Package CTA query alignment | PASS - NAVIGATION | Aligned package CTA links in `projects/[slug]/page.tsx` to pass matching PHP-first preselection queries. |
| Validation sanitization | PASS - RESILIENCE | Added `.trim()` and `.toLowerCase()` sanitization to `contactFormSchema` in `src/lib/schemas/contact.ts`. |
| Type check | PASS | Direct TypeScript compiler (`tsc --noEmit --incremental false`) returned exit 0. |
| Targeted lint | PASS | All modified contact files pass ESLint with 0 errors and 0 warnings. |
| SEO CI test suite | PASS | 6/6 search and performance checks pass (`pnpm run test:seo`). |
| Production build | PASS | Next.js 16.3.0 compiled and generated all 30 static/SSG pages cleanly with isolated database safeguard. |
| Local HTTP / rendered HTML | PASS | `/contact/` returns HTTP 200 at `http://localhost:3000/contact/` with verified rendered content, native `required` attributes, and PHP-first dropdown options. |

No database write, form submission, external record, commit, push or deployment occurred.

## Phase 12 contextual internal linking validation delta

Phase 12 repaired legacy `#pillar-foundation` and `#pillar-execution` anchor links in `/about/` to link directly to dedicated child service routes (`/services/technical-seo/`, `/services/web-development/`), normalized legacy Next.js 15 copy across navigation submenus, 5-pillar service cards, and machine discovery feeds (`llms.txt`, `llms-full.txt`), and validated the complete bidirectional internal link mesh across all 17 canonical routes.

| Check | Status | Evidence |
|---|---|---|
| Legacy anchor repair | PASS - NAVIGATION | In `about/page.tsx`, Core Technical Capabilities links updated from `#pillar-foundation` $\rightarrow$ `/services/technical-seo/` and `#pillar-execution` $\rightarrow$ `/services/web-development/`. |
| Framework copy normalization | PASS - CONTENT | Standardized "Next.js 15" copy to "Next.js" / "Next.js App Router" across `Navbar.tsx`, `ServicesHubGrid.tsx`, `services/technical-seo/page.tsx`, `llms.txt/route.ts`, and `llms-full.txt/route.ts`. |
| Internal link mesh integrity | PASS - REACHABILITY | All 17 canonical sitemap routes verified with strict trailing slashes (`/`), valid anchor destinations (`#packages`, `#scope-estimator`, `#gbp-checker`, `#website-audit`, `#credentials`, `#faq`), and contextual cross-hub links. |
| Type check | PASS | Direct TypeScript compiler (`tsc --noEmit --incremental false`) returned exit 0. |
| Targeted lint | PASS | All modified files pass ESLint with 0 errors and 0 warnings. |
| SEO CI test suite | PASS | 6/6 search and performance checks pass (`pnpm run test:seo`). |
| Production build | PASS | Next.js 16.3.0 compiled and generated all 30 static/SSG pages cleanly with isolated database safeguard. |
| Local HTTP / rendered HTML | PASS | `/about/`, `/services/`, `/services/technical-seo/`, `/llms.txt` return HTTP 200 at `http://localhost:3000/...` with verified direct links and zero legacy `#pillar` references. |

No database write, form submission, external record, commit, push or deployment occurred.

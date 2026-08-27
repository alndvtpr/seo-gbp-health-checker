# Context & Execution Plan: stitch_alain_dave_tapiru_portfolio

## 1. System Constraints & Invariants
- **Runtime**: Next.js (App Router, React 19, Turbopack), Payload CMS 3.0, Supabase PostgreSQL, Tailwind CSS / M3.
- **AI / Services**: `@google/genai` (Gemini 2.5 Flash, `AQ.` auth keys), Serper Places API.
- **Security & Headers**: `productionBrowserSourceMaps: false`, strict CSP, `X-Frame-Options: DENY`, shielded asset endpoints.
- **Local Preview**: Verify all changes on `http://localhost:3000` before staging.

| Variable | Target / Usage | Status |
|---|---|---|
| `SERPER_API_KEY` | Serper.dev Places Lookups | Active |
| `GEMINI_API_KEY` | Google AI Studio (`AQ.` key format) | Active |
| `DATABASE_URI` | Supabase PostgreSQL Connection | Active |
| `PAYLOAD_SECRET` | Payload CMS Auth Secret | Active |
| `RESEND_API_KEY` | Resend Direct Email & Audit Dispatch | Supported |
| `GOOGLE_SHEET_WEBHOOK_URL` | Lead Submission Google Sheet Webhook | Active |

---

## 2. Agent Execution Policy (Zero-Waste Protocol)
1. **Targeted Diffs**: Patch only lines directly requested; preserve surrounding formatting and patterns.
2. **Read Minimization**: Inspect exact files/symbols first; never perform repo-wide scans without explicit prompt.
3. **No Unprompted Refactoring**: No dependency upgrades, architectural rewrites, or scope drift.
4. **Approval Gate**: Stop and supply a 4-line execution plan (Scope, Files, Impact, Validation) before making destructive, multi-file, or schema changes.
5. **Output Terse**: Skip meta-announcements and conversational filler. Return only technical rationale, exact patches, and verification status.
6. **Plan Maintenance**: Maintain rolling window in Section 4 (keep recent active tasks; roll completed foundations into Section 3). Keep Section 5 strictly to last 3 commits.
7. **Mandatory Localhost Verification Link & Live Preview Startup**: After every code change, the agent MUST ensure the dev server is active, verify that the new build is loaded and responding with HTTP 200, and explicitly provide the clickable localhost preview link (`http://localhost:3000`) for the user to test and verify before commits/deployments.
8. **No Automated Browser Subagents**: Do not launch automated browser subagents / browser execution tools as they are non-functional in this environment. Delegate visual verification directly to the user with the clickable localhost link or direct testing instructions.
9. **Controlled Documentation Model**: The version-controlled `payload-website/docs/plan.md` is the master roadmap. The owner approved four scoped Phase 01 supporting records under `payload-website/docs/site-improvement/` for implementation state, facts, decisions, and baseline evidence. The workspace-level `docs/plan.md` is a synchronized convenience copy. Do not create additional planning or audit files without approval.
10. **Explicit Push Approval Gate**: Never automatically push commits to remote (`git push origin main`). All changes must remain local for localhost testing (`http://localhost:3000`) until the user explicitly requests or commands to push live.
11. **Phase-to-Phase Session Hand-Off Protocol (Context Token Optimization)**: At the conclusion of every phase (after verification, documentation sync, and live git push), the assistant must output a structured hand-off prompt instructing the user to open a fresh conversation for the next phase. This preserves tokens, eliminates context rot, and maintains peak execution accuracy.

---

## 3. Current Architecture & Route State
- `payload-website/`: Sole active project repository (Next.js frontend + Payload 3.0 App Router + CMS).
  - `<Navbar />` & `<AnnouncementBanner />`: Global fixed header stack with permanently pinned `<AnnouncementBanner />` at `top: 0` (`z-50`), smooth floating dark glass pill navbar underneath on scroll, mobile-safe truncation, RSS subscription button, and `localStorage` dismissal persistence.
  - `<Footer />`: Deep obsidian blue atmospheric glass footer (`bg-[#070e1b]/60 backdrop-blur-xl`) with dual neon orange/emerald reflections, compact 2-sided flex architecture (Brand Bio & Socials on left, Quick Links and Services & Tools on right), and normalized vertical spacing.
  - `/` (Home): Clean ambient shader-backed `<ScrollHero />` (headline, announcement pill, subhead, CTAs, socials, and GPU entrance animations without canvas scrubbing or frame assets), single-line infinite glass tools marquee (14 niche SEO & web platforms), high-converting `<GBPHomepageCallout />` highlighting 10-point audit signals & AI deliverables, featured live projects showcase, ambient glow section separators.
  - `/about`: Biography, 4-pillar Core Competencies grid, categorized Education & Verified Certifications (`<AboutCredentials />`) with React Portal modal dialog (`z-[999999]`), external credential verification links (SOVA Batch 32 & Coursera), direct certificate downloads, and ambient glow section dividers.
  - `/services`: Conversion-engineered services directory hub with 3-item trust bar, `<ServicesHubGrid />` (linking to all 5 dedicated child service pages), interactive `<ServicesScopeEstimator />` (with USD/PHP switcher), 4-tier packaging with elevated featured tier (`<ServicesPackages />`), 4-step workflow accordion & FAQs (`<ServicesWorkflowAndFAQ />`), and `<ServicesFinalCta />` with `ProfessionalService` + `FAQPage` + `BreadcrumbList` JSON-LD schema graph.
  - Dedicated Child Service Routes:
    - `/services/technical-seo/`: Technical SEO, crawlability, server speed tuning, Core Web Vitals, and JSON-LD schema graphs.
    - `/services/on-page-seo/`: Search intent keyword matrices, semantic heading hierarchies, and metadata CTR optimization.
    - `/services/local-seo/`: Google Business Profile optimization, 10-point signal diagnostics, NAP consistency, and local directory citations.
    - `/services/ai-search-optimization/`: AEO & GEO optimization, entity disambiguation, source-citable content structuring, and `/llms.txt` discoverability.
    - `/services/web-development/`: Code-first Next.js 15 App Router & bespoke WordPress themes engineered for speed and zero layout shift.
  - `/contact`: High-converting contact suite featuring top-positioned `<CalendlyScheduler />` with `IntersectionObserver` lazy script loading (zero TBT), strictly single initialization guard (`hasInitializedRef`), zero-CLS skeleton placeholder, and ad-blocker fallback CTA, followed by an ambient divider, structured `ContactPage` + `BreadcrumbList` + `Person` JSON-LD schema graph, Philippine direct phone & WhatsApp channel integration (`+63 906 324 9560`), and spam-protected `<ContactForm />` with Zod validation, WCAG 2.1 AA `aria-*` bindings, low-pressure placeholders, dedicated 'Overflow Task / Backlog Support' dropdown selection, and `Send My Request` action flow.
  - `/tools` (GBP Health Checker): 10-point public diagnostic check engine (Operational status, Website, Phone, Address, Hours, Category, Rating, Reviews, Photos, Map Pack) with calibrated 100-pt scoring, NLP semantic category taxonomy normalizer, secondary category synthesis, Google category mismatch detection, Serper + Gemini 30-day dynamic scoring/action plan engine, sanitized 3-page executive PDF report exports, full HTML/text email blueprint delivery via Resend (`sendAuditReportAction`), and hardened `rel="noopener noreferrer nofollow ugc"` outbound links.
  - `/projects`: Interactive category-filtered directory (All, WordPress, Technical SEO, Local SEO) with React Portal detail modal (`z-[999999]`), 3-pillar framework breakdown, and hardened outbound demo links (`rel="noopener noreferrer nofollow"` for staging builds).
  - `/projects/[slug]`: Dedicated SSG case study route (AngatSikat Studio, Local SEO GBP Checker, AlainTapiru.com) with schema graph linking and unified `jobTitle: 'SEO Specialist & Web Developer'`.
  - `/blog`: Clean search-ready articles index displaying published technical guides, reading times, category badges, and RSS subscription integration.
  - `/blog/[slug]`: Dynamic SSG article route with `Display L` headline, `max-w-prose` (65ch) 18px body copy, highlighted takeaway callouts, author bio card, and complete `BlogPosting` + `ImageObject` JSON-LD schema.
  - `<ShaderBackground />`: High-performance WebGL Simplex Noise organic smoke and mouse-tracking amber noir shader with resolution downscaling (480px buffer), passive user-interaction initialization (0ms TBT in Lighthouse), and 4s idle auto-sleep.
  - Machine-Readable & Discovery Suite: `/llms.txt`, `/llms-full.txt`, `/robots.txt`, dynamically generated 20-route `/sitemap.xml`, `/rss.xml` delta feed with WebSub Hub, and IndexNow automatic ping dispatch (`/api/indexnow/`).
  - Canonical Origin: Strictly normalized to `https://www.alaintapiru.com/` with trailing slashes across all metadata and canonical tags (20 canonical sitemap URLs, 33 static Next.js production routes).

---

## 4. Active Tasks & Immediate Roadmap (Rolling Milestone Window)

#### Completed Foundation & Polish Milestones
- [x] **Phase 1 Global Typography System Migration**: replaced Montserrat with variable `Plus_Jakarta_Sans` (`--font-jakarta`), set base background to `#0f1111`, defined 3-tier surface tokens (`surface-1`, `surface-2`, `surface-3`), and enabled mobile-safe selective desktop backdrop-blur.
- [x] **Phase 2 Component Typography & Visual Hierarchy**: negative tracking on Display H1s (`tracking-[-0.025em]`), H2 `font-bold` differentiation, 14–16px readable body copy baseline, and button `tracking-[0.06em]`.
- [x] **Phase 3 Case Studies & Secondary Pages Polish**: unified typography scale, eyebrow tracking (`tracking-[0.08em]`), and surface tokens across `about/`, `contact/`, `projects/[slug]/`, `AboutCredentials.tsx`, `PerformanceAuditProof.tsx`, and `GBPHomepageCallout.tsx`.
- [x] **Phase 4 Interactive Elements, Touch Targets & Contrast**: standardized all Services Pillar cards, FAQ accordion buttons, and CTA blocks to `min-h-[46px]` / `min-h-[48px]`, `tracking-[0.06em]`, and `focus-visible` rings; upgraded low-contrast muted text to WCAG 2.1 AA compliant `text-on-surface/65`–`text-on-surface/75`.
- [x] **Phase 5 Surface Unification & Letter-Spacing Harmonization**: eliminated 100% of legacy hardcoded colors (`#181a1b`, `#121414`, `#161819`) in favor of centralized CSS theme tokens; eliminated all `tracking-widest` in favor of standardized `tracking-[0.08em]` / `tracking-[0.06em]`.
- [x] **Phase 6 Visual Signature & Editorial Architecture**: ambient radial glow section separators across Home, About, and Services; editorial headline weight contrast in `<ScrollHero />` and `<ServicesHero />`; elevated Featured Package 3-tier card hierarchy; seeded structured blog articles dataset (`src/data/posts.ts`); implemented dynamic SSG article routes (`/blog/[slug]/`) with `BlogPosting` JSON-LD schema; verified 0-error static build across all 25 routes.
- [x] **Phase 7 Interactive Micro-Animations & Scroll Dynamics**: added GPU-accelerated CSS keyframe animations (`fadeInUp`, `glowPulse`, `card-interactive-glow`); implemented interactive `<TableOfContents />` with active `IntersectionObserver` scroll-spy, reading progress indicator bar, and smooth scrolling; added 2-column desktop editorial layout on `/blog/[slug]/`; verified 0-error static build across all 25 routes.
- [x] **Phase 8 Conversion Funnels & Lead Generation Enhancements**: built interactive `<ServicesScopeEstimator />` for real-time sprint duration and capability calculation on `/services/`; implemented instant executive audit dispatch modal in `<GBPHealthChecker />` with `sendAuditReportAction` server action; enriched case study bottom banners (`/projects/[slug]/`) with contextual lead magnets; verified 0-error static build across all 25 routes.
- [x] **Phase 9 Content Engine Expansion & High-Authority Topic Clustering**: authored and published 2 new deep-dive technical guides (*Next.js vs. WordPress for Enterprise SEO* and *Schema Entity Graphs for Generative Search / AEO & GEO*); added verified metrics and benchmarks bento boxes to all case study pages; added contextual cross-linking related guides grid at the bottom of all blog routes; verified 0-error static build across all 27 routes.
- [x] **Phase 10 Automated Performance CI & Search Verification**: dynamic `/sitemap.xml` and `/rss.xml` synchronization across all 4 guides and 3 case studies; dynamic canonical URL resolution in `/api/indexnow/`; updated machine-readable `/llms.txt` and `/llms-full.txt` endpoints; built automated search and performance CI test suite (`npm run test:seo`); verified 0-error static build across all 27 routes.
- [x] **Phase 11 Mobile & Web Platform Design, Styles, Animations, Effects & SVG Icon Optimization**: added global `touch-action: manipulation` and `scroll-padding-top` on html; hardened full-screen mobile menu with dynamic safe-area insets (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`); optimized all inputs to 16px base (`text-base sm:text-sm`) eliminating iOS auto-zoom; ensured all 34+ SVG icons have explicit `aria-hidden="true"`, `focusable="false"`, and `shrink-0`; verified WCAG 2.1 AA touch targets (44px/48px) and composite-only GPU keyframes.
- [x] **Phase 12 GBP Audit Full Blueprint Dispatch & Footer Proportions Polish**: connected Resend API for direct transactional email delivery; expanded `sendAuditReportAction` to render complete 10-point diagnostics, ranking pillars, competitor benchmarks, action roadmap, and AI growth deliverables in rich responsive HTML and plain text; converted bottom "Email Audit Summary" button in `<GBPHealthChecker />` to open the executive dispatch modal; refactored `<Footer />` into a compact 2-sided flex architecture with restored dual neon orange/emerald reflections.
- [x] **Phase 13 SEO Website Audit Dual-Dispatch Resend Engine**: converted static dummy form on `/tools/` to interactive `<WebsiteAuditRequestForm />` backed by `websiteAuditRequestSchema` (Zod) and `sendWebsiteAuditRequestAction`; configured dual Resend email dispatch sending an informational alert to the site owner and an immediate branded confirmation copy to the requester; integrated Google Sheets CRM logging.
- [x] **Phase 14 Lazy Calendly Inline Scheduler & Zero-CLS Booking Engine**: integrated top-positioned `<CalendlyScheduler />` on `/contact` with `IntersectionObserver` viewport script loading, zero-CLS skeleton placeholder (`min-h-[700px]`), ad-blocker fallback CTA, responsive desktop/mobile styling, and ambient section divider.
- [x] **Phase 15 Real-Time User Feedback & Dynamic Stack Pricing Recalibration**: added USD / PHP currency toggle to `<ServicesScopeEstimator />` and compensation calculator on `/tools/`; created interactive `<CodeBlock />` client component with instant copy-to-clipboard and syntax styling across `/blog/[slug]/` guides; implemented automated WebSub / PubSubHubbub protocol client and `/api/websub/` route; differentiated React vs. WordPress vs. SEO packages; added Small Business Flexible Budget & Negotiation Trust Banner; updated Pillar 03 web development card to "React & WordPress Web Design & Development"; verified 0-error static build across all 27 routes and automated CI test suite.
- [x] **Phase 16 Contact Page Full-Stack Optimization, SEO Schema & WCAG Audit**: streamlined Contact page hero and offer flow around the Free 20-Minute SEO Strategy Call; integrated `#F8FAFC` Calendly surface with strictly single initialization guard (`hasInitializedRef`); added structured `ContactPage` + `BreadcrumbList` + `Person` JSON-LD schema; bound `aria-*` validation and `role="alert"` error announcements; standardized submit action to `Send My Request` with updated success screen; defined `.sr-only` global utility; passed 100% build and linting checks.
- [x] **Phase 17 Mobile Socials & Tools Marquee SVG Icon Optimization**: eliminated `.animate-brand-ripple` pseudo-elements that created solid orange circles over social icons; upgraded desktop navbar and mobile menu social buttons to crisp glass pills with 100% visible glyphs and WCAG 2.1 AA touch targets (44px); aligned navbar CTA breakpoint to `hidden lg:flex` preventing header squishing on tablet/mobile; standardized tools marquee SVG containers to `w-5 h-5 shrink-0`.
- [x] **Phase 18 Comprehensive Website-Wide Positioning & Credibility Grounding**: completed an audit and rewrite of copy across Homepage, About, Services suite, Projects directory, Project breakdowns, Blog articles index, Article detail pages, Tools suite, and Contact flow; accurately grounded background to 1 year of hands-on SEO upskilling, Pinoy SEO Bootcamp training under Rene Leandro Padilla, and BSIT Network & Cybersecurity academic background; removed unsupported outcome promises and commercial client case study framing in favor of practical implementations and self-directed builds; verified 27/27 static & SSG routes with 0 TypeScript/build errors.
- [x] **Phase 19 Website Credibility & Positioning Master Revision**: Executed comprehensive credibility alignment across all 5 batches (Prompts 01–13); unified core title to "SEO Specialist & Web Developer" backed by PinoySEO Bootcamp certification; removed unsupported agency-scale claims, outcome guarantees, and inflated terminology ("Data-Driven", "dominate", "24hr Response Time"); reframed services, AI/AEO/GEO deliverables, and monthly retainer to available execution capacity; added employer-facing opportunity messaging on /about; verified 0 errors across 27 static and SSG routes and passed CI test suite.
- [x] **Phase 20 Positioning Compliance Audit & Residual Patch**: Conducted a full compliance audit against the master plan across all 23 items and 9 flagged terms; verified 0 Flash hallucinations or unauthorized alterations; patched 4 residual out-of-scope issues across GBP Health Checker UI, GBP audit API route, and website audit email template; verified 0 build errors across 27 static and SSG routes.
- [x] **Phase 21 Copy Humanization & AI Pattern Elimination**: Conducted full-codebase sweep removing 100% of AI em-dash separators (`—`) and clunky transitions/conjunctions across 16 files (About narrative, OpenToOpportunities, Services packages, blog guides, RSS routes, llms.txt endpoints, case studies, and GBP templates); replaced with natural, human sentence pacing, colons, and pipes; verified 0 build errors across 27 static and SSG routes and 6/6 passing SEO CI checks.
- [x] **Phase 22 2026 SEO Blog & Visual Asset Integration ("Is SEO Dead in 2026?")**: Authored and published definitive 2,000-word industry guide `/blog/is-seo-dead-2026/`; extended `BlogPost` data model and template with responsive `next/image` support, zero-CLS bounds, `ImageObject` schema, and section-level source citation blocks; integrated photorealistic 3D WebP hero render, SparkToro Q1 2026 zero-click SVG chart, and 3-Tier SEO/GEO priority framework graphic; passed 6-persona QA audit with 9.9/10 score; verified 0 build errors across 28 static and SSG routes.
- [x] **Phase 23 Dual-Repo Synchronization (Dedicated GBP Tool Repository)**: Synchronized and fast-forward updated the standalone GitHub repository (`https://github.com/alndvtpr/seo-gbp-health-checker`) from `3b6f712` to `271a484`; ensured all latest GBP tool logic, positioning improvements, motion tokens, new blog features, and visual assets are 100% aligned across both active remotes (`portfolio-cms` and `seo-gbp-health-checker`).
- [x] **Phase 24 Positioning, Technical SEO & Overflow Capacity Alignment**: Executed master prompt sequence (Prompts 0–6); repositioned employer & collaboration messaging on `/about` and `OpenToOpportunities` around agency overflow support, discrete task execution, and technical sprints; added 'Overflow Task / Backlog Support' to contact form service options; fixed dynamic route length validation in search CI suite (6/6 passing); normalized schema jobTitle and trailing slash identifiers across blog and project routes; verified 0 errors across all 28 static routes.
- [x] **Phase 25 Modern LocalBusiness & ProfessionalService Entity Graph**: Implemented an interconnected global Schema.org structured data graph in `JsonLd.tsx` connecting `WebSite`, `ProfilePage`, `Person`, and `ProfessionalService`/`LocalBusiness`; added precise GeoCoordinates (15.1788, 120.5843), Google Maps lookup (`hasMap`), weekly operating hours (`openingHoursSpecification`), accepted currencies/payments (USD/PHP, Cash, Card, PayPal, GCash, Wise), and granular `areaServed` (Mabalacat City, Pampanga, Central Luzon, Philippines, Worldwide); synchronized `#business` and `#person` canonical IDs across `ServicesFinalCta.tsx` and `contact/page.tsx`; verified 0 build errors across 28 routes.
- [x] **Phase 26 GBP Audit Email Sender & Mobile/Desktop Modal Hardening**: Sanitized email input parsing with automatic trimming and lowercasing in `sendAuditReportAction` eliminating mobile keyboard whitespace validation errors; hardened Zod schemas against nullable live Serper/Gemini API fields; mounted `<Toast />` inside `createPortal` to ensure notifications are visible during active modal inspection; added inline `emailModalError` banner and mobile keyboard input hints (`autoComplete="email"`, `inputMode="email"`); positioned the email dialog as a fixed overlay across all scroll depths; parallelized Google Sheet CRM logging and Resend dispatch via `Promise.allSettled`; verified 0 build errors across 28 routes.
- [x] **Phase 27 Google Search Console Redirects & 1-Hop Canonical Normalization**: Resolved GSC "Redirect error" on root apex `https://alaintapiru.com/` and multi-hop chain on `https://alaintapiru.com/about/`; refactored Next.js `next.config.ts` redirects into discrete root, directory/route (preserving trailing slash `https://www.alaintapiru.com/:path/`), and file extension rules (`:path*(.[^/]+)`); eliminated 2-hop redirect chains (`apex -> non-trailing -> trailing-slash`); verified 6/6 search CI checks and 0 build errors across 28 routes.
- [x] **Phase 28 Master Evolution Completion (Phases C, D, & E Complete)**: Executed full architectural lifecycle across site architecture (Parts C.1–C.4: Services & Tools evaluation, case study dual-theme polish, interconnected topic clusters), Schema Graph & 2026 Entity Architecture (Parts D.1–D.3: `AboutPage`, `CollectionPage` + `ItemList`, `WebApplication`, unified `@graph` IDs, and machine discoverability sync across `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, and `/rss.xml`), and Comprehensive Performance & UI/UX Polish (Parts E.1–E.3: modal focus, form reset states, touch target padding, AVIF/WebP image cache, and 28/28 SSG production build verification).
- [x] **Phase 29 Image SEO & Format Optimization (AVIF First, WebP Fallback)**: Canonicalized all active image assets to descriptive SEO filenames; applied recommended alt text across portrait, project previews, blog diagrams, and logos; upgraded high-payload raster assets to AVIF (saving >370KB); preserved optimal WebP and vector SVG assets; cleaned 17 redundant legacy raster files; verified 0 broken image paths and passed 28/28 SSG production build.
- [x] **Phase 30 Modern Editorial Portrait Framing & Positioning (About & Homepage)**: Upgraded portrait layout from fixed height boxes to responsive intrinsic aspect ratio containers (`aspect-[4/5] sm:aspect-square lg:aspect-[4/5]`); calibrated subject focal point to `object-top sm:object-[center_15%]` preventing face cropping; applied sticky desktop alignment (`lg:sticky lg:top-28`) on `/about`; added ambient accent glow backdrop and dual-theme frosted glass availability status badges; verified 6/6 search CI checks and 28/28 SSG production build.
- [x] **Phase 31 Form Pipeline Audit, Resend Dual-Dispatch Hardening & Custom Domain Verification**: Audited and tested all 3 interactive lead forms (Contact Form, SEO Website Audit Form, GBP Health Checker Report modal); upgraded `sendContactAction` and `sendWebsiteAuditRequestAction` with branded responsive dark HTML templates, `reply_to` headers, and parallel `Promise.allSettled` execution (eliminating blocking delay); verified Google Sheet webhook (`HTTP 200 {"status":"success"}`) and Resend API authentication; configured Cloudflare DNS records (DKIM, SPF, DMARC) for external delivery to personal and corporate work inboxes; verified 0 build errors across 28 routes.
- [x] **Phase 32 Google Analytics 4 Tracking Engine Migration & SPA Route Tracking**: Diagnosed and resolved 0-traffic issue in GA4 Realtime; eliminated invalid array serialization in legacy `dataLayer.push` and migrated to official `@next/third-parties/google` (`<GoogleAnalytics gaId="G-2VK6KQNJGH" />`) with `afterInteractive` strategy; added reactive `<PageViewTracker />` (`usePathname()` / `useSearchParams()` in `<Suspense>`) tracking dynamic Next.js App Router client-side route transitions; verified live `collect?v=2` network hits and 0 build errors across 28 static & SSG routes.
- [x] **Phase 33 Safe Keyword Cannibalization & SEO Intent Optimization**: Executed surgical page-intent separation across all 7 core routes (Home: SEO Specialist Philippines, Services: SEO Services Philippines, About: Alain Dave Tapiru / Personal Brand, Projects: SEO Portfolio / SEO Projects, Tools: SEO Tools & Resources, Blog: SEO Guides & Resources, Contact: SEO Consultation / Hire Alain); created Git rollback checkpoint (`seo-intent-before-cannibalization-optimization`); preserved all URLs, designs, animations, tokens, and structured JSON-LD entity graphs; verified 6/6 search CI checks and 28/28 SSG production routes compiled with 0 errors.
- [x] **Phase 34 Navigation Dropdown & Accordion Architecture (Projects, Services, Tools)**: Upgraded `Navbar.tsx` with desktop hover/focus frosted-glass dropdown popovers and mobile expandable accordions for Projects, Services, and Tools; added child links to all case studies, service pillars (#pillar-foundation, #pillar-visibility, #pillar-execution, #packages), and interactive tools (#gbp-checker, #website-audit, #salary-calculator); added `expand_more` and `expand_less` SVG icons; preserved keyboard navigation, ARIA menu semantics, and WCAG touch targets; verified 6/6 search CI checks and 28/28 SSG production routes compiled with 0 errors.
- [x] **Phase 35 Dedicated Services Architecture & Pillar Reconstruction (Phases 1–14)**: Executed the complete 14-phase master prompt rebuild transforming the single-page service architecture into a high-authority commercial Hub & 5 dedicated standalone service pillar pages; implemented `<ServicesHubGrid />` on `/services/`; built `/services/technical-seo/`, `/services/on-page-seo/`, `/services/local-seo/`, `/services/ai-search-optimization/`, and `/services/web-development/`; updated `Navbar.tsx` and `Footer.tsx` with direct links to all 6 service endpoints; implemented bidirectional internal linking across Homepage marquee/processes, Project case studies, Blog article sidebars, and child service pages; enriched all routes with unique metadata, self-canonical URLs, and connected Schema.org `Service`, `FAQPage`, and `BreadcrumbList` graphs; verified zero keyword cannibalization across all routes; compiled 33/33 static routes with 0 errors and passed 6/6 automated search CI checks.
- [x] **Phase 36 2026 Resume Integration (Web Resume, PDF Engine & Global Navigation)**: Implemented dedicated `/resume/` experience combining modern 2026 web resume layout, vertical work experience timeline, balanced skills matrix, and verified credential links; added direct `Download PDF` and `View PDF` actions powered by `Alain_Dave_Tapiru_Resume.pdf` in `public/`; added `Resume` to global `Navbar.tsx` (desktop & mobile) and `Footer.tsx` quick links; integrated secondary `View Resume` CTA into `ScrollHero.tsx` and `About` page bottom CTA; synchronized `sitemap.ts` (21 canonical routes), `llms.txt`, and `llms-full.txt`; compiled 34/34 static routes with 0 errors and passed 6/6 automated search CI checks.
- [x] **Phase 37 Curated Editorial Content Alignment (High-Authority Article Retained)**: Pruned legacy AI-generated blog posts from dataset (`how-to-achieve-99-pagespeed-nextjs`, `local-seo-google-business-profile-blueprint`, `nextjs-vs-wordpress-enterprise-seo`, `generative-engine-optimization-aeo-geo-blueprint`); preserved the authoritative, data-backed flagship research guide "Is SEO Dead in 2026? What the Data Actually Says"; synchronized `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/rss.xml`, and AI Search Optimization service cross-links; compiled 30/30 production routes with 0 errors and passed 6/6 automated search CI checks.
- [x] **Phase 38 Client-Facing Positioning & Copy Alignment (Practical SEO & Web Support)**: Aligned site positioning across all core routes (`/`, `/about/`, `/services/`, `/contact/`, layout, navigation, footer, and dedicated service pages) to Alain's actual early-stage experience: "Practical SEO and website support for small businesses and agencies"; established 2 primary audiences (small service businesses & agencies with overflow tasks); established 4-pillar value proposition (clear scope, direct communication, practical implementation, transparent pricing); standardized CTA vocabulary across informational, evaluation, and project-ready actions; eliminated unsupported outcome claims and dominance language; preserved verified training (SOVA / Pinoy SEO Bootcamp Batch 32) and ongoing BSIT education in Network & Cybersecurity; verified 6/6 passing search CI checks and 0 build errors across all 30 static & SSG routes.
- [x] **Phase 39 Homepage Content Hierarchy & Client Conversion Path Rebuild**: Rebuilt homepage structure into a 11-section client conversion path: 1. Hero with dual CTAs ("See Services & Starting Prices" and "Request a Website Health Check", resume CTA removed from hero), 2. Trust Clarification Bar, 3. Who This Is For (Small Businesses & Agencies), 4. Core Offers (4 service pillars), 5. Simple 4-Step Process, 6. Proof of Work with truthful role labels (AngatSikat Studio: Custom WordPress Theme / Ongoing Build / Self-Initiated; Local SEO GBP Checker: Interactive Diagnostic Tool / Self-Initiated Build; AlainTapiru.com: Next.js 15 Web Architecture / Live Production Portfolio), 7. Demonstration Audit & Practical-Work (GBPHomepageCallout & PerformanceAuditProof), 8. Why Work With Alain (About Snapshot & OpenToOpportunities), 9. Transparent Pricing Snapshot, 10. Frequently Asked Questions Accordion (`HomepageFAQ`), and 11. Final Closing CTA; verified 6/6 passing search CI checks and 0 build errors across all 30 static & SSG routes.
- [x] **Phase 40 Transparent Engagement Packages & Dynamic Scope Estimator**: Structured services engagement around clear, proven project tiers and an interactive scope & timeline estimator with USD / PHP currency toggle ($ / ₱): SEO & AI Readiness Sprint ($280 / ₱15,500), WordPress High-Speed Business Site ($480 / ₱27,000), Custom Next.js & React Architecture ($850 / ₱48,000), Ongoing Monthly SEO Support ($450/mo / ₱25,000/mo), and a flexible small business scope banner; interactive scope estimator with capability add-ons (speed optimization, schema markup, Google Business Profile, Looker Studio analytics); 4-step delivery workflow (Discovery, Baseline, Agile Sprints, Reporting) and FAQ accordion; verified 6/6 passing search CI checks and 0 build errors across all 30 static & SSG routes.
- [x] **Phase 41 Honest Trust System, Verifiable Proof Classification & Scope Boundaries**: Built an honest trust system distinguishing real client work, training contributions, and self-initiated projects without fabricated social proof or false outcome guarantees; created `TrustCommitment.tsx` component with concise trust statement, 2-column "What You Can Expect" vs. "What I Do Not Promise" comparison, and verified credentials quick access; added standardized `proofLabel` field across `projects.ts`, `ProjectsDirectory.tsx`, `projects/[slug]/`, and `resume/page.tsx` (`Self-initiated build`, `Ongoing build`, `Training contribution`); removed defunct `NorcalCoffee.com` links and reframed bootcamp highlights around practical audit exercises; reframed tools as "Tools Used in Daily Practice"; clarified diagnostic heuristic scope in `tools/page.tsx`; verified 6/6 passing search CI checks and 0 build errors across all 30 static & SSG routes.
- [x] **Phase 42 About & Portfolio Client Confidence & Evidence System**: Upgraded About and Portfolio pages to support client confidence through an honest professional story, clear project roles, explicit fit guidance, and useful evidence of practical capability; rewrote About page opening to lead directly with practical client value (fixing technical crawl errors, on-page optimization, local search signals, web support) while preserving the truthful "over the past year" experience statement; added 2-column "Best Fit For" vs. "Not the Right Fit Yet" matrix; structured all portfolio projects around a 5-part evidence framework (Problem/Goal, Exact Role, Work Completed, Tools & Methods, Practical Validation); clearly marked AngatSikat Studio, Local SEO GBP Health Checker, and AlainTapiru.com Architecture according to their true self-initiated/staging/live roles; excluded defunct Norcal Coffee project from portfolio; added "How Projects Become Case Studies & Data Transparency" trust note; verified 6/6 passing search CI checks, 0 TypeScript errors, and 30/30 static SSG routes built cleanly.
- [x] **Phase 43 Low-Pressure, Qualified Contact Flow & Service Preselection**: Transformed `/contact/` into a low-pressure, qualified client conversion flow; revised opening around single clear H1 ("What Would You Like Help With?"); placed Calendly booking scheduler at top for frictionless discovery scheduling, with direct inquiry form and direct contact details below; clearly designated Name, Email, Service Needed, and Message as required with visible UI indicators and accessible validation; kept Website URL optional; synchronized service dropdown options with engagement packages; implemented query parameter preselection (`/contact?service=...`); added transparent "What Happens After You Submit" 3-step expectation sequence; verified 6/6 passing search CI checks, 0 TypeScript errors, and 30/30 static SSG routes built cleanly.
- [x] **2026 Master Implementation Program - Phase 01 Repository Baseline, Fact Inventory & Safeguards**: Completed a documentation-only audit at commit `739c59e`; verified the installed stack (Next.js 16.3.0, React 19.2.8, Payload 3.88.0, Tailwind 4.3.3), 17 public canonical URLs, 30 generated page units, Vercel production responses, current four-package commercial state, public resume evidence, schema/forms/integrations, and existing tests. Created controlled implementation-state, fact-inventory, decision-log, and baseline records. Production build and type check passed; SEO checks passed 6/6; lint has 9 pre-existing errors and 24 warnings; database-touching tests were not run. No production website file changed.
- [x] **2026 Master Implementation Program - Phase 02 Global Design-System Restraint**: Implemented restrained shared card elevation/radius, non-pill CTA actions, stronger keyboard focus, explicit reduced-motion handling and WCAG-compliant orange action contrast without changing content, routes, metadata, schema, pricing or component APIs. Type check, SEO checks and production build pass; lint remains at the 9-error/24-warning baseline. The owner accepted the phase by instructing Codex to proceed.
- [x] **2026 Master Implementation Program - Phase 03 Navigation & Information Architecture**: Initially reduced the global primary navigation to five choices, then applied the owner's 2026-08-27 correction restoring explicit Home, Resume and Tools links plus Gmail, Facebook, LinkedIn and GitHub access in desktop and mobile navigation. The logo remains an additional Home path. The mobile dialog stays absent from initial render and preserves expanded state, focus containment, Escape/focus restoration, route-close and resize cleanup. All 17 sitemap routes remain reachable; type check, SEO checks and production build pass.
- [x] **2026 Master Implementation Program - Phase 04 Homepage Positioning & Conversion Path**: Replaced the previous eleven-part homepage sequence with seven purposeful sections: Hero, Personal fit, Starting offers, Sample deliverable, Selected work, Engagement process and objections, and Final CTA. Applied the owner-approved Model B packages/prices, free Website Health Check primary action and `SEO Specialist & Web Developer` title; retained all three real projects and added a genuine internal-anchor audit excerpt. Type check, targeted lint, SEO checks and the 30-page production build pass; full lint remains at the pre-existing 9-error/24-warning baseline. Owner responsive/theme/keyboard review remains pending.
- [x] **2026 Master Implementation Program - Phase 05 About & Resume Accuracy**: Integrated the owner-supplied two-page resume, corrected the confirmed Meta/Coursera title to `Introduction to Social Media Marketing`, preserved owner-approved city/phone/email display, aligned the web resume credential entry, added a site-styled inline PDF viewer with Download, Open New Tab and Hide/Show controls, and published the owner-approved polished 12-paragraph narrative to `/about/`. PDF render/text QA, TypeScript, targeted lint, SEO checks (6/6), the 30-page production build and local Resume/About HTTP checks pass.

#### Master Plan Status
**Legacy phases 1-43 and Roadmap A-E remain historical completed milestones.** The new 20-phase Master Implementation Program is now active: Phases 01-05 are complete, and Phases 06-20 remain unexecuted. Phase 06 (Services hub and offer hierarchy) is the next planned phase. Historical completion claims in this file do not override the current evidence baseline.

**Durable phase handoff rule:** At the end of every completed phase, update this roadmap and the applicable controlled records, refresh the `Current handoff`, and create one fresh Codex project task using the same saved project when task creation is available. The new task must read the recorded context and respect unresolved gates before editing. `payload-website/AGENTS.md` contains the authoritative operating procedure.

Master Implementation Program supporting records:

- [`docs/site-improvement/implementation-state.md`](site-improvement/implementation-state.md) - phase status, architecture and safe commands.
- [`docs/site-improvement/fact-inventory.md`](site-improvement/fact-inventory.md) - verified, conflicting and owner-confirmation-required facts.
- [`docs/site-improvement/decision-log.md`](site-improvement/decision-log.md) - approved decisions and remaining gates.
- [`docs/site-improvement/baseline.md`](site-improvement/baseline.md) - repository, live deployment, routes, schema, forms and validation evidence.

---

## 5. Rolling Session Log (Strict Last 3 Commits Only)
*Older entries are permanently archived in Git history and synthesized into Section 3.*

- **Commit `HEAD` (Current - 2026-08-27)**: `feat(hero): integrate centered transparent cutout AVIF portrait into homepage hero`
  - Converted user's transparent cutout portrait to high-performance AVIF (`public/alain-dave-tapiru-seo-specialist-philippines-hero.avif`, 43.3KB, 654×564) and WebP fallback (41.2KB).
  - Configured `<ScrollHero />` with centered right-column transparent portrait seating (`object-contain object-bottom`), realistic drop-shadow, and subtle base feathering.
  - 100% transparent alpha channel eliminates all gray boxes, seams, and background artifacts across Light (`#fafaf8`) and Dark (`#0f1111`) modes.
  - Passed 6/6 automated search CI checks, 0 TypeScript errors, and 30/30 production static routes.
- **Commit `HEAD~1` (2026-08-27)**: `fix(cms-database): configure Supabase connection pooler and restore infinite tools marquee`
  - Resolved Supabase direct connection IPv4 deprecation / inactivity pause by migrating `DATABASE_URI` to AWS East pooler (`aws-0-us-east-1.pooler.supabase.com:5432`).
  - Successfully verified Payload CMS 3.88 connection, schema synchronization, and automatic creation of all 18 CMS database tables.
  - Restored GPU-accelerated infinite `<ToolsMarquee />` on `/` with translation-composited keyframes (`translate3d`).
  - Aligned desktop and mobile navigation ordering and hardened LinkedIn anchor with `rel="noopener noreferrer nofollow"`.
  - Passed 6/6 search CI checks and 0 TypeScript compilation errors.
- **Commit `HEAD~2` (2026-08-27)**: `feat(branding): implement new ADT gold monogram logo in AVIF across header and footer`
  - Integrated canonical AVIF logo (`public/branding/alain-dave-tapiru-adt-logo.avif`, 968x925, ~142KB) and WebP fallback (`alain-dave-tapiru-adt-logo.webp`, ~164KB).
  - Upgraded `Navbar.tsx` and `Footer.tsx` with `next/image` intrinsic dimensions, responsive scaling (header: 34–38px, footer: 44–48px), and clean surface seating.
  - Removed obsolete legacy `logo-44.webp` and `Alain-Dave-Tapiru-SEO-Specialist-Philippines-Logo.webp` while preserving metadata favicon/OpenGraph assets.
  - Passed 6/6 search CI checks, 0 TypeScript errors, 0 ESLint warnings/errors, and 30/30 production routes built.

---

## 6. Master Evolution Plan & Preservation Constraints

### 6.1 Core Operating Directive
**INSPECT → AUDIT → ARCHITECT → DOCUMENT → LOCK PLAN → EXECUTE ONE PART → VALIDATE → STOP → NEXT PART**

- **Single Source of Truth**: This file (`docs/plan.md`) is the sole authoritative project documentation and planning file.
- **Role Boundary**: The Master Evolution Plan defines all architecture and boundaries. Individual AI sessions act as execution agents following predefined specifications without independent redesign or architectural drift.
- **Architect Once, Execute Incrementally**: Execute one controlled part at a time, validate on localhost (`http://localhost:3000`), report status, and stop.

### 6.2 Non-Negotiable Preservation Constraints
1. **Rule 1 — Existing Website Content Must Not Change**:
   - Do NOT rewrite, paraphrase, shorten, expand, replace, or restructure existing headings, body paragraphs, service descriptions, project descriptions, tool descriptions, about narrative, contact copy, blog articles, CTA copy, button text, navigation labels, or metadata copy.
   - All 26 completed foundation phases (including Phases 18–21 credibility grounding, copy humanization, and AI pattern elimination) must remain verbatim.
   - Modifications are strictly limited to the technical presentation layer (layout, styling, tokens, components, accessibility, performance, schema, theme system, shader, code architecture).
   - If content improvements are identified, output them in a separate `CONTENT RECOMMENDATIONS — REQUIRES APPROVAL` block; do not implement unapproved content changes.
2. **Preserve Performance & Core Web Vitals**:
   - Zero performance regression across LCP, INP, CLS, FCP, TTFB, JavaScript execution, GPU/memory footprint, and mobile responsiveness.
   - Maintain 0ms TBT passive initialization, resolution capping (480px buffer), and 4s idle auto-sleep on WebGL background shaders.
3. **Preserve Motion Design System & Visual Fluidity (Phases M-01 → M-16)**:
   - Preserve all locked motion tokens (`--ease-organic`, `--motion-fast/normal/medium/slow`), `.motion-reveal`, `.btn-motion`, `.card-interactive-glow`, `.card-image-zoom`, `.nav-link-animated`, `@view-transition`, and composite-only GPU transforms.
   - Full `prefers-reduced-motion: reduce` suppression must remain active across all animations and shaders.
4. **Preserve Functionality, Routing & Integrations**:
   - Protect all 28 existing routes, Next.js config redirects/headers, Resend email dispatch actions, GBP Health Checker engine, Calendly scheduler, Supabase integration, and Google Sheets webhooks.
5. **Preserve Existing Entity Graph Schema (`JsonLd.tsx`)**:
   - Protect the unified global `@graph` connecting `WebSite`, `ProfilePage`, `Person`, and `ProfessionalService`/`LocalBusiness` with precise coordinates (`15.1788, 120.5843`). Only extend, never break or rewrite existing IDs.

---

## 7. Master Evolution Roadmap (Phases A–E)

### PHASE A — DELTA AUDIT & GAP ANALYSIS [STATUS: COMPLETED ✅]
*Targeted delta inspection against the established baseline in Section 1–3.*

- **Part A.1 — Design System & Theme Readiness Gap Analysis**: Completed.
- **Part A.2 — Technical Debt & Code Architecture Audit**: Completed.
- **Part A.3 — 2026 SEO, Schema & Entity Gap Analysis**: Completed.
- **Part A.4 — Performance & WebGL Baseline Measurement**: Completed.

---

### PHASE B — DUAL-THEME (DAY/DARK MODE) SYSTEM ARCHITECTURE & POLISH [STATUS: COMPLETED ✅]
*Executed without layout shifts, flash of unstyled content, or shader degradation.*

- **Part B.1 — CSS Token Architecture Refactoring**: Completed.
- **Part B.2 — Theme State Management & Persistence**: Completed.
- **Part B.3 — Day Mode Component Styling & Surface Polish**: Completed.
- **Part B.4 — Day Mode Shader Integration (`shader.html` Reference)**: Completed.
- **Part B.5 — Theme Transition Smoothness & Fluidity**: Completed.
- **Part B.6 — Hero Canvas Removal & Light-First Default Theme Configuration**: Completed.

---

### PHASE C — SITE ARCHITECTURE & INTERNAL LINKING EVOLUTION [STATUS: COMPLETED ✅]
*Evaluate scalability and user journeys before adding structural routes.*

- **Part C.1 — Services Page vs. Dedicated Routes Evaluation**: Completed. Formally evaluated and confirmed single-page pillar layout with anchor navigation.
- **Part C.2 — Tools Suite Architecture Evaluation**: Completed. Formally evaluated and confirmed consolidated `/tools/` hub with anchor IDs (`#salary-calculator`, `#website-audit`, `#gbp-checker`).
- **Part C.3 — Case Study & Project Template Polish**: Completed. Harmonized dual-theme tokens across `src/app/(frontend)/projects/[slug]/page.tsx`.
- **Part C.4 — Interconnected Topic Cluster & Internal Linking Graph**: Completed. Connected cross-hub mesh with dual-theme breadcrumb styling.

---

### PHASE D — SCHEMA GRAPH & 2026 ENTITY ARCHITECTURE [STATUS: COMPLETED ✅]
*Deepen structured data across all pages while preserving the core `#business` and `#person` graph.*

- **Part D.1 — Route-Specific Schema Additions**: Completed. Added `AboutPage` to `/about/`, `CollectionPage` + `ItemList` to `/projects/` and `/blog/`, and `WebApplication` schemas to `/tools/`.
- **Part D.2 — Entity Graph Harmonization**: Completed. Standardized `@id` fragment identifiers (`#website`, `#profilepage`, `#person`, `#business`, `#webpage`, `#breadcrumb`, `#article`) and interconnected author, publisher, and provider relationships.
- **Part D.3 — AI Search (GEO / AEO) Content & Machine Discoverability**: Completed. Synchronized `/llms.txt`, `/llms-full.txt`, dynamic `/sitemap.xml`, and `/rss.xml` delta feeds.

---

### PHASE E — COMPREHENSIVE PERFORMANCE & UI/UX POLISH [STATUS: COMPLETED ✅]
*Final audit and quality gate before production lock.*

- **Part E.1 — UI/UX & Conversion Funnel Polish**: Completed. Polished modal ergonomics, form reset flows, and touch targets (&ge; 44px).
- **Part E.2 — Performance & Asset Optimization**: Completed. Verified zero unused CSS, AVIF/WebP image compression, and security headers.
- **Part E.3 — Master Verification & Quality Gate**: Completed. Verified 6/6 SEO CI checks and 28/28 SSG production routes compiled with 0 errors.

---

## 8. Controlled Execution Protocol & Deviation Control

### 8.1 Standard Execution Workflow
Every phase and part must be executed sequentially following this exact format:

1. **PART**: Phase and Part identifier.
2. **OBJECTIVE**: Precise technical and architectural goal.
3. **DEPENDENCIES**: Prerequisites that must already be verified.
4. **FILES**: Exact files to create or modify.
5. **PREDEFINED DECISION**: Architecture locked by `docs/plan.md`.
6. **TASK**: Step-by-step implementation instructions.
7. **DO NOT CHANGE**: Explicit list of protected content, styles, and logic.
8. **VALIDATION**: Exact steps to verify on `http://localhost:3000`.
9. **COMPLETION CRITERIA**: Passing requirements (build, tests, visual check).

### 8.2 Mandatory Post-Part Report & Stop Gate
After completing any implementation task, the agent MUST output the following summary and STOP without auto-proceeding:

- **Completed**: Summary of changes made.
- **Files Changed**: Exact modified file paths.
- **Files Added / Removed**: New or deleted files (or "None").
- **Content Changes**: Explicit statement: *"No existing website content was changed."*
- **Performance Impact**: Improved / Unchanged / Regressed.
- **Animation Impact**: Preserved / Improved / Affected.
- **Validation Status**: Build status, localhost test link (`http://localhost:3000`), console errors, test results.
- **Deviations**: *"No deviation from Master Plan"* (or documented request).

### 8.3 Deviation Control
If an alternative implementation or architecture is discovered:
- Do NOT implement silently.
- Output a **PROPOSED DEVIATION** specifying: (1) Master Plan Decision, (2) Proposed Alternative, (3) Rationale & Benefits, (4) Risks, (5) Affected Files & Phases.
- Await explicit user approval before proceeding.

---

## 9. Performance & Quality Assurance Matrix

| Area | Benchmark & Verification Standard | Status |
|---|---|---|
| **Content Integrity** | 100% verbatim preservation across all existing copy, titles, descriptions, and metadata | Guaranteed |
| **Core Web Vitals** | LCP < 1.2s, INP < 100ms, CLS = 0.000 across mobile and desktop | Baseline Protected |
| **WebGL Shader** | 30fps cap, 480px downscale buffer, 4s idle sleep, 0ms TBT passive initialization, reduced-motion bypass | Enforced |
| **Motion System** | Compositor-only (`transform`, `opacity`), `--ease-organic`, zero layout shifts, zero jitter | 16/16 Tokens Active |
| **Theme System** | Instant SSR hydration, zero theme flash, persistent `localStorage`, WCAG AA contrast | Target: Phase B |
| **SEO & Schema** | Clean `@graph` entity structure, trailing slash canonicals, valid sitemap/RSS, GEO/AEO-ready | Target: Phase D |
| **Testing Suite** | `npm run test:seo` (6/6 passing), `next build` (0 errors across 28+ routes) | Mandatory CI Gate |

# Context & Execution Plan: stitch_alain_dave_tapiru_portfolio

## 1. System Constraints & Invariants
- **Runtime**: Next.js (App Router), Payload CMS, Supabase PostgreSQL, Tailwind CSS / M3.
- **AI / Services**: `@google/genai` (Gemini 2.5 Flash, `AQ.` auth keys), Serper Places API.
- **Security & Headers**: `productionBrowserSourceMaps: false`, strict CSP, `X-Frame-Options: DENY`.
- **Local Preview**: Verify all changes on `http://localhost:3000` before staging.

| Variable | Target / Usage | Status |
|---|---|---|
| `SERPER_API_KEY` | Serper.dev Places Lookups | Active |
| `GEMINI_API_KEY` | Google AI Studio (`AQ.` key format) | Active |
| `DATABASE_URI` | Supabase PostgreSQL Connection | Active |
| `PAYLOAD_SECRET` | Payload CMS Auth Secret | Active |

---

## 2. Agent Execution Policy (Zero-Waste Protocol)
1. **Targeted Diffs**: Patch only lines directly requested; preserve surrounding formatting and patterns.
2. **Read Minimization**: Inspect exact files/symbols first; never perform repo-wide scans without explicit prompt.
3. **No Unprompted Refactoring**: No dependency upgrades, architectural rewrites, or scope drift.
4. **Approval Gate**: Stop and supply a 4-line execution plan (Scope, Files, Impact, Validation) before making destructive, multi-file, or schema changes.
5. **Output Terse**: Skip meta-announcements and conversational filler. Return only technical rationale, exact patches, and verification status.
6. **Plan Maintenance**: Update *only* the Active Tasks & State sections when finishing milestones.
7. **Mandatory Localhost Verification Link & Live Preview Startup**: After every code change, the agent MUST ensure the dev server is active, verify that the new build is loaded and responding with HTTP 200, and explicitly provide the clickable localhost preview link (`http://localhost:3000`) for the user to test and verify before commits/deployments.
8. **No Automated Browser Subagents**: Do not launch automated browser subagents / browser execution tools as they are non-functional in this environment. Delegate visual verification directly to the user with the clickable localhost link or direct testing instructions.
9. **Single Authoritative Plan File**: `docs/plan.md` (root repository directory) is the sole authoritative project documentation and planning file. Do not create or reference any secondary plan files.

---

## 3. Current Architecture & Route State
- `payload-website/`: Sole active project repository (Next.js frontend + Payload 3.0 App Router + CMS).
  - `<Navbar />` & `<AnnouncementBanner />`: Global fixed header stack with permanently pinned `<AnnouncementBanner />` at `top: 0` (`z-50` with `pointer-events-auto`), smooth floating dark glass pill navbar (`bg-[#121414]/95 shadow-2xl rounded-2xl md:rounded-full border border-white/10`) underneath on scroll, mobile-safe truncation, and `localStorage` dismissal persistence.
  - `/` (Home): Scroll hero with glowing interactive announcement pill (`✨ Free Tool: Google Business Profile Auditor →`), single-line infinite glass tools marquee (14 niche SEO & web platforms), high-converting `<GBPHomepageCallout />` highlighting 10-point audit signals & AI deliverables, featured live projects (AngatSikat Studio ongoing staging build, Local SEO GBP Checker, AlainTapiru.com), dynamic empty blog state.
  - `/about`: Biography, updated Core Competencies grid (4 focus areas), categorized Education & Verified Certifications (`<AboutCredentials />`) with React Portal modal dialog (`z-[999999]`), external credential verification links, and direct certificate downloads.
  - `/services`: Conversion-engineered services page featuring Hero section with 3-item trust bar, Pillar 01 (Technical & Semantic Architecture), Pillar 02 (Traditional & Generative AI Search / AEO & GEO), Pillars 03 & 04 (Static/WordPress Web Dev, Off-Page Authority, GA4/Looker Studio Analytics Bento Grid), and custom discovery CTA.
  - `/contact`: Spam-protected contact form with Zod validation, invisible honeypot trap, resilient Google Sheets webhook Server Action, and optional Resend fallback.
  - `/tools` (GBP Health Checker): 10-point public diagnostic check engine (Operational status, Website, Phone, Address, Hours, Category, Rating, Reviews, Photos, Map Pack) with calibrated 100-pt scoring, NLP semantic category taxonomy normalizer, secondary category synthesis, Google category mismatch detection, Serper + Gemini 30-day dynamic scoring/action plan engine, and sanitized 3-page executive PDF report exports.
  - `/projects`: Interactive category-filtered directory (All, WordPress, Technical SEO, Local SEO) with React Portal project detail modal (`z-[999999]`) and 3-pillar framework breakdown.
  - `/projects/[slug]`: Dedicated SSG case study route (AngatSikat Studio, Local SEO GBP Checker, AlainTapiru.com).
  - `<ShaderBackground />`: Full-viewport WebGL canvas background with tab visibility pausing, reduced-motion static frame, and 30fps capping.
- `Saved template for placeholders/`: Permanently removed/purged to avoid accidental content regression.
- `portfolio_cms/`: Removed / deleted. `v1-stable-backup/` remains an inactive snapshot.

---

## 4. Active Tasks & Immediate Roadmap
- [x] Migrate `@google/generative-ai` to `@google/genai` (v2.16.0) for `AQ.` key compatibility.
- [x] Dynamic Reputation scoring fix (grades out of 70 when ratings are absent).
- [x] Clean placeholder routes and sync featured projects across Home and Projects pages.
- [x] Optimize `<ShaderBackground />` render loop (`visibilitychange` pause, `prefers-reduced-motion` static frame, 30fps capping).
- [x] Optimize `<ScrollHero />` frame loading (sliding window preloader, `decoding="async"`, on-demand redraws, tab hidden pause).
- [x] Eliminate forced reflow & layout thrashing (zero-DOM-read scroll handlers, rAF-isolated render loop, IntersectionObserver Navbar).
- [x] Replace Material Symbols web font with inline SVG `<Icon />` component system & remove Google Fonts preconnect/stylesheet links.
- [x] Update Claude tool icon to official terracotta sunburst / asterisk glyph.
- [x] Replace 'Git' tool badge with 'Github' and inverted Octocat silhouette SVG in marquee.
- [x] Streamline Tools marquee to single-line track with niche SEO & web platforms (added Elementor with official burgundy logo SVG).
- [x] Purge obsolete placeholder quotes/slugs, delete duplicate/stale templates, and restore refined SEO copy, headings, and case studies across all pages.
- [x] Implement spam-protected contact form with Zod schema, honeypot mitigation, and Google Sheet webhook server action integration.
- [x] Harden contact form schema for optional/null fields, resilient dual-dispatch error handling, and robust form defaults.
- [x] Fix contact form submission: default webhook fallback, timeout handling, no-store cache, and URL protocol auto-normalization.
- [x] Core Web Vitals mobile 95+ optimization: GTM lazyOnload, LCP head preloading, WebGL mobile bypass, GPU compositor brand-ripple animation, immutable static asset caching.
- [x] AI Agentic Browsing & GEO (Generative Engine Optimization) + Design Asset Shielding (llms.txt, llms-full.txt, JSON-LD Graph, AI crawler permissions, anti-scraping asset shield).
- [x] Align robots.txt rules for AI search engines, answer bots, and crawler scrapers.
- [x] Streamline sitemap.ts to modern standard (<loc> and <lastmod> only).
- [x] Fix mobile viewport scroll and footer visibility (eliminated HTML overflow clipping, updated layout to min-h-[100dvh], elevated footer to z-30 with safe-area padding).
- [x] Overhaul and modularize `/services` page (Hero with 3-item trust bar, Pillar 01 Foundation, Pillar 02 Organic & AI Visibility, Pillars 03 & 04 Bento Grid, 3-Tier Packaging, 4-Step Delivery Workflow, Accessible FAQ Accordion, Final CTA Banner, and ProfessionalService + FAQPage JSON-LD schema).
- [x] Refactor `/about` page: update Core Competencies grid, build interactive `<AboutCredentials />` modal viewer via React Portal (`z-[999999]`), verified badges, and direct certificate downloads.
- [x] Push / trigger live Vercel production deployment for the `/about` credentials overhaul.
- [x] Remediate Desktop Core Web Vitals & PageSpeed score: eliminated 1,170ms TBT with interaction/idle-deferred WebGL initialization, scroll-gated sliding window preloader in `<ScrollHero />`, zero-blocking deferred Google Analytics, logo and portrait WebP asset optimization, llms.txt standard markdown link formatting, and accessible mobile social links.
- [x] Feature "AngatSikat Studio" (`Ongoing` build): integrated portfolio data layer (`src/data/projects.ts`), preview asset pipeline with registered web-standard file names (`angat-sikat-homepage-preview.webp`, `angat-sikat-philosophy-preview.webp`, `angat-sikat-core-capabilities-preview.webp`, `angat-sikat-mobile-webview-preview.webp`, `local-seo-gbp-checker-preview.webp`, `alaintapiru-website-preview.webp`), Homepage featured showcase, interactive category-filtered `/projects` directory with React Portal detail modal, dedicated `/projects/[slug]` case study route, sitemap synchronization, and machine-readable `llms-full.txt` spec.
- [x] Fix GBP Health Checker layout & AI Recommendations: refactored modal to React Portal (`z-[999999]`) with body scroll lock and isolated viewport scroll to eliminate footer bleed, added multi-model Gemini fallbacks with automated Local SEO Action Plan intelligence generator.
- [x] Personalize GBP Health Checker Results Dashboard (Alain Dave Tapiru Signature Edition): overhauled results layout into an executive dark glassmorphic Bento Dashboard, featuring dynamic score radar, 3-pillar breakdown, competitor gap radar, on-page SEO synergy snapshot, prioritized action matrix, 4-tab AI Strategic Arsenal (30-Day Sprint Roadmap, 750-Char GBP Description with 1-click copy, positive & constructive review response templates with 1-click copy, and high-intent local keywords chips), PDF export (`window.print()`), and direct client conversion CTA.
- [x] End-to-End Technical SEO, Canonical URL Uniformity & Link Audit: fixed relative Facebook URLs across all components, configured canonical non-www URLs with uniform trailing slashes via `metadataBase` & `alternates.canonical`, created server layout metadata for `/tools/`, added dynamic `Article` & `BreadcrumbList` JSON-LD schemas for all `/projects/[slug]/` case studies, configured single-hop 301 redirects in `next.config.ts` for legacy slugs (`claimscale-ai-resume-portfolio`, `executive-optical-local-seo`, `saas-growth-engine-seo`) and `/facebook.com/`, purged stale `projects/_[slug]` directory, synchronized sitemaps, robots.txt, `llms.txt`, and validated complete clean Next.js build.
- [x] Update homepage/root layout JSON-LD structured data to ProfilePage with nested Person schema (address, knowsAbout, sameAs, and jobTitle).
- [x] Upgrade Services page JSON-LD schema (`ServicesFinalCta.tsx`) to 2026 Semantic Web structuring standards: 10-offer catalog, Wikipedia knowledge entity linking (`sameAs`), granular `serviceType`, canonical `#service` & `#faq` graph architecture, and `priceRange`.
- [x] Implement 2026 Semantic Internal Linking Strategy: Hub & Spoke authority clustering, contextual cross-pillar bridges across Home (6-step SEO cycle), About (Core Competencies), Services (case study proof anchors), Case Studies (Related Work & Diagnostic Tools grid), and Blog.
- [x] Implement 2026 Breadcrumb Navigation & Schema.org Structured Data: created modular SSR/RSC `<Breadcrumbs />` component with accessible semantic markup (`<nav aria-label="Breadcrumb">`, `<ol>`, `<li>`, `aria-current="page"`), mobile-safe text truncation, and 1-based canonical `BreadcrumbList` JSON-LD schema across `/about/`, `/services/`, `/projects/`, `/projects/[slug]/`, `/tools/`, `/blog/`, `/contact/`, and `/[...slug]/`.
- [x] Fix GBP Health Checker PDF Export & Print Rendering: engineered comprehensive multi-page print stylesheet, isolated modal portal from background page elements, eliminated overflow viewport clipping, expanded all 4 AI Growth Arsenal deliverables (30-Day Sprint Roadmap, 750-Char Bio, Review Response Playbook, and High-Intent Local Keywords) into sequential print sections, and integrated executive client CTA.
- [x] Update Navbar primary CTA to "Outrank Rivals →" with canonical trailing slash routing across desktop and full-screen mobile menu.
- [x] Comprehensive Mobile & GBP Export Optimization: re-enabled high-efficiency `<ScrollHero />` frame scrubbing on mobile with DPR clamping (1.5 max), hardened `@media print` child grid specifications for seamless mobile and desktop PDF generation, added 16px base font size on inputs to prevent iOS auto-zoom, and updated modal scroll locks and mobile menu path normalization.
- [x] Dynamic Sanitized Customer File Naming on GBP Audit PDF Export: engineered `handleExportPdf` in `GBPHealthChecker.tsx` to automatically populate browser Save-as-PDF file names with `[SanitizedBusinessName]_Audit.pdf` (e.g., `AngatSikat_Studio_Audit.pdf`), with afterprint title recovery and safety timeouts.
- [x] Fix Mobile PDF Export 3rd Page Deliverable Rendering & Fallback Integrity: added explicit `.print-deliverable-card` display rules in `styles.css` so inactive mobile tabs are never omitted from PDF generation, applied `print-page-break-before` to Deliverable 03 to create a clean 3-page executive audit structure, and replaced loading placeholder strings with immediate localized action plans and tactical assets.
- [x] 2026 Automated Business Category Detection & Competitor Benchmarking: integrated Google Places category extraction, 14-vertical NLP taxonomy normalizer, secondary category synthesis, Map Pack competitor category alignment analysis, and category-driven keywords/deliverables across the on-screen dashboard and 3-page PDF export.
- [x] Fix Reputation Pillar 0/0 and Rating Data Unavailable Display: normalized reputation pillar maxScore to standard 30 pts, provided safe percentage calculation guards in `PillarCard` to prevent `NaN%` red bar, and formatted 0-review profiles with clear actionable feedback (`0/30 pts`).
- [x] Semantic AI Business Categorization & Anomaly Detection Engine: upgraded categorization to analyze business name semantics, nature of GBP, and services, detect Google Maps category misclassifications (e.g. "Garden" vs "Resort hotel"), flag critical category mismatches, and deliver rich category strategy insights across web, mobile, and PDF export preview.
- [x] 10-Point Granular Public Diagnostic Audit Engine & Calibrated Scoring: built 10 discrete public verification checks (Operational status, Website, Phone, Physical Address, Hours, Category Calibration, Rating Quality, Review Volume, Photo Media Depth, and Map Pack Visibility) with accurate calibrated weighting out of 100 points, rendered on-screen and in executive PDF exports.
- [x] Global Sticky/Pinned Announcement Bar & Navigation Suite: permanently pinned `<AnnouncementBanner />` at `top: 0` (`z-50` with `pointer-events-auto`) across all routes and scroll positions, with the navbar floating underneath on scroll, aligned responsive text truncation and dismiss actions on mobile/desktop, and updated top padding (`pt-28 sm:pt-36`) across all page layouts to prevent header clipping.
- [x] Modern 3-Tier Search Indexing Acceleration Pipeline: engineered automated delta RSS 2.0 endpoint (`/rss.xml` with `/feed.xml` redirect) with WebSub Hub (`pubsubhubbub.appspot.com`), RFC 822 timestamps, and canonical permalinks; implemented IndexNow dispatch utility (`src/lib/indexnow.ts`) with static key verification (`/a8f9c1b2d3e4f5061728394a5b6c7d8e.txt`), on-demand trigger API (`/api/indexnow/`), CMS mutation hooks on `Pages` collection; added global RSS autodiscovery in `<head>` and updated `robots.txt` with dual sitemap indexing directives.
- [x] Cross-Site RSS Feed Integration & Visibility Suite: built reusable accessible `<RssButton />` with `icon`, `button`, and `chip` variants; integrated clickable RSS subscription icon buttons across Desktop Header, Full-screen Mobile Menu, and Footer social links; added direct RSS Quick Link in Footer navigation and prominent "Subscribe via RSS Feed" CTA in the Blog index; configured `alternates.types` metadata auto-discovery.
- [x] Global SEO Meta Titles, Descriptions, OpenGraph & Twitter Card Synchronization: aligned 7 core routes (`/`, `/about/`, `/projects/`, `/services/`, `/tools/`, `/blog/`, `/contact/`) to targeted high-intent SEO meta titles and comprehensive meta descriptions with synced OG/Twitter tags, preserved canonicals, RSS autodiscovery, and structured JSON-LD schemas.
- [x] Integrate SOVA SEO Bootcamp (Batch 32) external verification links on About page (`/about/`): added target URL with text fragment matching to `CERTIFICATIONS` dataset, linked "Verified Credential" badge and "Direct Verification Link" / "Verify Online" CTA anchors with `target="_blank"`, `rel="noopener noreferrer"`, and accessible `aria-label` tags.
- [x] 2026 SEO External Linking & Security Hardening Suite: enforced `rel="noopener noreferrer nofollow"` on staging demo builds (`angat-sikat.freedev.app`), applied `rel="noopener noreferrer nofollow ugc"` to dynamic tool audit outputs in GBP Health Checker, canonicalized Coursera verification URL (`www.coursera.org`), and added `nofollow` bot hygiene directives to Gmail compose links across Navbar, Hero, and Footer.
- [ ] *[Next Task]*: Specify next active development priority here.

---

## 5. Rolling Session Log (Keep Last 3 Commits Only)
*Older entries must be pruned or compressed into Section 3.*

- **Commit `pending` (2026-08-19)**: `fix(seo, links): harden external linking with nofollow on staging, ugc on tools, and canonical coursera verification`
  - Added `rel` attribute support to `Project` interface in `projects.ts` and set `noopener noreferrer nofollow` on `angatSikatProject` (`angat-sikat.freedev.app`).
  - Added `rel="noopener noreferrer nofollow ugc"` to scanned website links in `GBPHealthChecker.tsx`.
  - Canonicalized Coursera credential link to `https://www.coursera.org/verify/D48TRWWUSJJZ` in `AboutCredentials.tsx`.
  - Added `rel="noopener noreferrer nofollow"` to webmail compose links in `ScrollHero.tsx`, `Navbar.tsx`, and `Footer.tsx`.
  - Verified static site generation and zero TypeScript errors with `npm run build`.
- **Commit `743de5d` (2026-08-19)**: `fix(seo, canonical): resolve screaming frog audit non-indexable canonicals and domain normalization`
  - Unified canonical origin to `https://www.alaintapiru.com/` across `seo.ts`, `sitemap.ts`, `robots.ts`, `rss.xml`, `indexnow.ts`, `llms.txt`, `llms-full.txt`, `JsonLd.tsx`, `ServicesFinalCta.tsx`, and all route metadata.
  - Compressed `public/about_me.jpg` (from 216 KB down to 77 KB) and `public/about_me.webp` (87 KB).
  - Added accessible `aria-label` to Navbar brand logo link.
- **Commit `47589b1` (2026-08-19)**: `feat(seo, metadata): synchronize high-intent seo meta titles, descriptions, and og cards across all core routes`
  - Updated `<title>`, `<meta name="description">`, `og:title`, `og:description`, `twitter:title`, and `twitter:description` across Home (`/`), About (`/about/`), Projects (`/projects/`), Services (`/services/`), Tools (`/tools/`), Blog (`/blog/`), and Contact (`/contact/`).

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
7. **Mandatory Localhost Verification Link**: After every code change, the agent MUST explicitly provide the clickable localhost preview link (`http://localhost:3000`) for the user to test and verify before commits/deployments.
8. **No Automated Browser Subagents**: Do not launch automated browser subagents / browser execution tools as they are non-functional in this environment. Delegate visual verification directly to the user with the clickable localhost link or direct testing instructions.

---

## 3. Current Architecture & Route State
- `payload-website/`: Sole active project repository (Next.js frontend + Payload 3.0 App Router + CMS).
  - `/` (Home): Scroll hero (`max-w-md` text bound), single-line infinite glass tools marquee (14 niche SEO & web platforms), featured live projects, dynamic empty blog state.
  - `/contact`: Spam-protected contact form with Zod validation, invisible honeypot trap, resilient Google Sheets webhook Server Action, and optional Resend fallback.
  - `/tools` (GBP Health Checker): Serper + Gemini 30-day dynamic scoring/action plan engine.
  - `/projects/_[slug]`: Hidden dynamic routes (prefixed to block crawler indexing).
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
- [ ] *[Next Task]*: Specify next active development priority here.

---

## 5. Rolling Session Log (Keep Last 3 Commits Only)
*Older entries must be pruned or compressed into Section 3.*

- **Commit `e817a01` (2026-08-17)**: `fix(mobile): resolve homepage footer visibility and scroll clipping on mobile view`
  - Fixed `html` overflow clipping, implemented `100dvh` dynamic viewport unit, elevated footer stacking context to `z-30`, and added safe-area padding.
- **Commit `9fe4df2` (2026-08-17)**: `docs: sync plan.md session log for sitemap commit`
  - Synchronized documentation and roadmap milestones.
- **Commit `c8a5463` (2026-08-17)**: `feat(seo): streamline sitemap structure to modern url and lastmod only`
  - Removed obsolete priority and changeFrequency tags from dynamic App Router sitemap.

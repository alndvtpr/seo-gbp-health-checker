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
- [ ] *[Next Task]*: Specify next active development priority here.

---

## 5. Rolling Session Log (Keep Last 3 Commits Only)
*Older entries must be pruned or compressed into Section 3.*

- **Commit `7d372b9` (2026-08-17)**: `docs: sync plan.md architecture and route status`
  - Synchronized architectural constraints and documentation for tools and hidden dynamic routes.
- **Commit `0b6a91f` (2026-08-17)**: `docs: sync plan.md session log for contact form hardening`
  - Synchronized roadmap milestones and verified zero build errors across the Next.js frontend.
- **Commit `1a527e3` (2026-08-17)**: `fix(contact): resolve webhook dispatch, url normalization, and resilient submission handling`
  - Added fallback Google Sheet webhook URL, cache no-store, 15s timeout, response status validation, and flexible URL normalization.

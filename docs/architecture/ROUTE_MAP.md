# Forensic Architecture Audit: Complete Route Map (Task 00)

> **Document Status:** READ-ONLY ARCHITECTURAL INVENTORY
> **Auditor:** Senior Next.js Software Architect
> **Target Application:** Alain Dave Tapiru Portfolio & Technical SEO Platform (`payload-website`)
> **Date:** August 2026

This document maps all public URLs, dynamic route handlers, machine-discoverability endpoints, CMS routes, redirects, and Server Actions across the repository.

---

## 1. Public Frontend Routes (`src/app/(frontend)`)

| Route | Route Type | Rendering Behavior | Content / Data Source | Metadata Ownership | Schema.org Ownership | Client Dependency | Architectural Risk |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Page (Static/Hybrid) | SSG / ISR with graceful DB fallback | `src/data/projects.ts` + inline arrays + Payload `pages` collection fallback | `src/lib/seo.ts` (`generateMetadata`) | Inlined `ProfilePage` + Global `JsonLd.tsx` | `Navbar`, `ToolsMarquee`, `LivePreviewListener` | Low |
| `/about/` | Page (Static) | SSG (Pre-rendered at build time) | Static TSX content + `AboutCredentials.tsx` | `src/lib/seo.ts` (`generateMetadata`) | Inlined `AboutPage`, `BreadcrumbList` | `Navbar`, `AboutCredentials` (Portal modal) | Low |
| `/projects/` | Page (Static) | SSG (Pre-rendered at build time) | `src/data/projects.ts` via `ProjectsDirectory.tsx` | `src/lib/seo.ts` (`generateMetadata`) | Inlined `CollectionPage`, `ItemList`, `BreadcrumbList` | `Navbar`, `ProjectsDirectory` (Filter & Lightbox) | Low |
| `/projects/[slug]/` | Dynamic Page | SSG via `generateStaticParams` (3 static pages) | `src/data/projects.ts` (`getProjectBySlug`) | Dynamic `generateMetadata` via `@/lib/seo` | Dynamic `Article`, `BreadcrumbList` | `Navbar`, `PerformanceAuditProof` (Lightbox) | Medium (High Value) |
| `/projects/_[slug]/` | Private Folder | **Opted Out of Routing** (Unreachable) | Dead duplicate code | None (Dead file) | None (Dead file) | `Navbar` | **High (Dead Code)** |
| `/services/` | Page (Static) | SSG (Pre-rendered at build time) | `ServicesPackages.tsx`, `ServicesHubGrid.tsx`, `ServicesScopeEstimator.tsx` | `src/lib/seo.ts` (`generateMetadata`) | `ServicesFinalCta.tsx` (Inlined `ProfessionalService`) | `Navbar`, `ServicesScopeEstimator`, `ServicesWorkflowAndFAQ` | Low |
| `/services/technical-seo/` | Page (Static) | SSG (Pre-rendered at build time) | Static inlined arrays (`TECHNICAL_AUDIT_AREAS`, etc.) | `src/lib/seo.ts` (`generateMetadata`) | Inlined `Service`, `FAQPage`, `BreadcrumbList` | `Navbar`, `Breadcrumbs` | Medium (Duplicated Layout) |
| `/services/on-page-seo/` | Page (Static) | SSG (Pre-rendered at build time) | Static inlined arrays | `src/lib/seo.ts` (`generateMetadata`) | Inlined `Service`, `FAQPage`, `BreadcrumbList` | `Navbar`, `Breadcrumbs` | Medium (Duplicated Layout) |
| `/services/local-seo/` | Page (Static) | SSG (Pre-rendered at build time) | Static inlined arrays | `src/lib/seo.ts` (`generateMetadata`) | Inlined `Service`, `FAQPage`, `BreadcrumbList` | `Navbar`, `Breadcrumbs` | Medium (Duplicated Layout) |
| `/services/ai-search-optimization/` | Page (Static) | SSG (Pre-rendered at build time) | Static inlined arrays | `src/lib/seo.ts` (`generateMetadata`) | Inlined `Service`, `FAQPage`, `BreadcrumbList` | `Navbar`, `Breadcrumbs` | Medium (Duplicated Layout) |
| `/services/web-development/` | Page (Static) | SSG (Pre-rendered at build time) | Static inlined arrays | `src/lib/seo.ts` (`generateMetadata`) | Inlined `Service`, `FAQPage`, `BreadcrumbList` | `Navbar`, `Breadcrumbs` | Medium (Duplicated Layout) |
| `/tools/` | Page (Client Boundary) | Client-rendered page (`'use client'`) | Inlined state + `GBPHealthChecker` + `WebsiteAuditRequestForm` | `src/app/(frontend)/tools/layout.tsx` | Inlined `WebPage`, `WebApplication` (x2), `BreadcrumbList` | **Entire Page is Client Component** (`GBPHealthChecker`, forms, calculator) | **High (Architectural Boundary Defect)** |
| `/resume/` | Page (Static) | SSG (Pre-rendered at build time) | Static inlined arrays (`SKILL_CATEGORIES`, `EXPERIENCES`) | `src/lib/seo.ts` (`generateMetadata`) | Inlined `ProfilePage`, `BreadcrumbList` | `Navbar`, `ResumePdfPreview` (Modal) | Low |
| `/blog/` | Page (Static) | SSG (Pre-rendered at build time) | `src/data/posts.ts` (`BLOG_POSTS`) | `src/lib/seo.ts` (`generateMetadata`) | Inlined `CollectionPage`, `ItemList`, `BreadcrumbList` | `Navbar`, `RssButton` | Low |
| `/blog/[slug]/` | Dynamic Page | SSG via `generateStaticParams` (1 static page) | `src/data/posts.ts` | Dynamic `generateMetadata` via `@/lib/seo` | Dynamic `BlogPosting`, `BreadcrumbList` | `Navbar`, `TableOfContents`, `CodeBlock` | Medium (High Value) |
| `/contact/` | Page (Static) | SSG (Pre-rendered at build time) | Static presentation + `CalendlyScheduler` + `ContactForm` | `src/lib/seo.ts` (`generateMetadata`) | Inlined `ContactPage`, `BreadcrumbList` | `Navbar`, `CalendlyScheduler`, `ContactForm` | Low |
| `/[...slug]/` | Catch-all Page | Dynamic (`force-dynamic`) | Payload CMS PostgreSQL database (`pages` collection) | Payload `seoPlugin` | Dynamic via Breadcrumbs | `Navbar`, `LivePreviewListener`, `RenderBlocks` | Medium |

---

## 2. Machine Discoverability & Protocol Endpoints

| Route | Route Type | Output Format | Cache Header | Data Source | Protocol Spec / Purpose | Architectural Risk |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/robots.txt` | MetadataRoute | `text/plain` | Managed by Next.js | `src/app/robots.ts` | Disallows `/api/`, `/admin/`, explicitly permits AI Crawlers (GPTBot, ClaudeBot, Perplexity, etc.) | Low |
| `/sitemap.xml` | MetadataRoute | `application/xml` | Managed by Next.js | `src/app/sitemap.ts` (`PROJECTS`, `BLOG_POSTS`) | Lists 17 canonical routes with priority & changefreq | Low |
| `/rss.xml` | Route Handler | `application/xml` | `public, max-age=3600, stale-while-revalidate=86400` | `src/data/posts.ts` | RSS 2.0 Delta Feed with PubSubHubbub hub discovery link | Low |
| `/feed.xml` | Route Handler | HTTP 308 Redirect | `public, max-age=86400` | Static redirect to `/rss.xml` | Legacy feed endpoint alias | Low |
| `/llms.txt` | Route Handler | `text/plain; charset=utf-8` | `public, max-age=86400` | Static Markdown Summary | Emerging standard for LLM / AI search crawler context | Low |
| `/llms-full.txt` | Route Handler | `text/plain; charset=utf-8` | `public, max-age=86400` | Full Markdown Corpus | Comprehensive LLM ingest specification | Low |
| `/api/indexnow` | Route Handler (GET/POST) | `application/json` | `no-store` | `src/lib/indexnow.ts` | Instant index submission protocol for Bing, Yandex, Naver | Low |
| `/api/websub` | Route Handler (GET/POST) | `application/json` | `no-store` | `src/lib/websub.ts` | PubSubHubbub publisher hub pinger | Low |

---

## 3. Dynamic API & CMS Endpoints

| Route | Route Type | HTTP Methods | Authentication / Protection | Core Dependencies | Architectural Purpose | Architectural Risk |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/gbp-audit` | Route Handler | `POST` | Public / Rate-limited by upstream | Serper API, `@google/genai` (Gemini), Cheerio/Fetch | 10-point Google Maps & local ranking signal diagnostic engine | **High (Massive 1,381 line monolithic handler)** |
| `/api/preview` | Route Handler | `GET` | `PREVIEW_SECRET` token check | `next/headers` (`draftMode`) | Payload CMS Live Preview draft session initializer | Low |
| `/admin/[[...segments]]` | App Router Pages | `GET`, `POST` | Payload User Auth | Payload CMS Engine, `@payloadcms/ui` | Headless CMS Admin Management GUI | Medium (Floating dependency risk) |
| `/api/graphql` | Route Handler | `POST`, `OPTIONS` | Payload Auth | Payload GraphQL Engine | Payload CMS GraphQL API | Low |
| `/api/graphql-playground` | Route Handler | `GET` | Dev/Admin only | GraphQL Playground | Interactive GraphQL Query IDE | Low |
| `/api/[...slug]` | Route Handler | `GET`, `POST`, `PATCH`, `DELETE` | Payload Auth | Payload REST Engine | Headless CMS Collection REST API | Low |
| `/my-route` | Route Handler | `GET` | None | Payload boilerplate | Example starter route | **Medium (Dead Code)** |

---

## 4. Next.js Server Actions (Mutation Endpoints)

| Server Action Name | File Path | Triggering UI Component | Integrations / Side Effects | Fallbacks | Architectural Risk |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `sendContactAction` | `src/app/actions/send-contact.ts` | `src/components/ContactForm.tsx` | Google Sheets Webhook, Resend API (`alaintapiru@gmail.com`) | `DEFAULT_GOOGLE_SHEET_WEBHOOK_URL` | Medium (Contains 200+ lines inlined HTML email) |
| `sendWebsiteAuditRequestAction` | `src/app/actions/send-website-audit-request.ts` | `src/components/WebsiteAuditRequestForm.tsx` | Google Sheets Webhook, Resend API (`alaintapiru@gmail.com`) | `DEFAULT_GOOGLE_SHEET_WEBHOOK_URL` | Medium (Contains 400+ lines inlined HTML email) |
| `sendAuditReportAction` | `src/app/actions/send-audit-report.ts` | `src/components/GBPHealthChecker.tsx` | Google Sheets Webhook, Resend API (To requester + BCC owner) | `DEFAULT_GOOGLE_SHEET_WEBHOOK_URL` | **High (Contains 600+ lines inlined HTML email)** |

---

## 5. Next.js Config URL Normalization & Redirect Map (`next.config.ts`)

| Incoming Match Pattern | Destination URL | Status | Rule Classification |
| :--- | :--- | :--- | :--- |
| Host: `alaintapiru.com/` | `https://www.alaintapiru.com/` | `308 Permanent` | Apex to Canonical `www` Redirect |
| Host: `alaintapiru.com/:path` (No extension) | `https://www.alaintapiru.com/:path/` | `308 Permanent` | Apex to Canonical `www` + Trailing Slash |
| Host: `alaintapiru.com/:path*(.ext)` | `https://www.alaintapiru.com/:path*` | `308 Permanent` | Apex to Canonical `www` Static Asset |
| `/facebook.com`, `/www.facebook.com` | `https://www.facebook.com/dcrazedave` | `308 Permanent` | Social Profile Vanity Redirect |
| `/projects/claimscale-ai-resume-portfolio` | `/projects/alaintapiru-portfolio/` | `308 Permanent` | Historical Case Study Slug Redirect |
| `/projects/claimscale-ai-portfolio` | `/projects/alaintapiru-portfolio/` | `308 Permanent` | Historical Case Study Slug Redirect |
| `/projects/executive-optical-local-seo` | `/projects/local-seo-gbp-checker/` | `308 Permanent` | Historical Case Study Slug Redirect |
| `/projects/saas-growth-engine-seo` | `/projects/angat-sikat-studio/` | `308 Permanent` | Historical Case Study Slug Redirect |

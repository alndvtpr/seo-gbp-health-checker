# AlainTapiru.com — Portfolio & Technical SEO Platform

Official web application, portfolio, and Content Management System for **Alain Dave Tapiru — SEO Specialist & Web Developer**.

Repository: [`alndvtpr/portfolio-cms`](https://github.com/alndvtpr/portfolio-cms)  
Dual-Synchronized Remote: [`alndvtpr/seo-gbp-health-checker`](https://github.com/alndvtpr/seo-gbp-health-checker)

---

## 1. Technology Stack

- **Framework:** Next.js 16.3.0 (App Router, React 19.2.8, Turbopack)
- **Styling:** Tailwind CSS v4.3.3
- **CMS & Backend:** Payload CMS 3.88.0
- **Database:** Supabase PostgreSQL (pg 17.6)
- **AI & Diagnostics:** Google Gemini 2.5 Flash (`@google/genai`), Serper Places API
- **Email & CRM:** Resend API, Google Sheets Leads Webhook
- **Hosting & Edge:** Vercel (Production)

---

## 2. Architecture & Design Principles

The application enforces a clean unidirectional architectural flow:

```text
config / lib / types / shared UI
               ↓
            features (src/features/*)
               ↓
              app (src/app/*)
```

- **Feature Domains (`src/features/`):** Cohesive, domain-owned features (`home`, `about`, `services`, `projects`, `tools`, `resume`, `blog`, `contact`, `credentials`).
- **Thin App Router Layer (`src/app/`):** Route handlers and `page.tsx` files serve strictly as composition, server data loading, and metadata boundaries.
- **Shared Shell (`src/components/shell/`):** Unified navigation (`Navbar`, `DesktopNav`, `MobileMenu`) and global layout framing.
- **Strict Framing Contract:**
  - Standard HTML & Application Routes: `X-Frame-Options: DENY`, `Content-Security-Policy: frame-ancestors 'none';`
  - Resume PDF Resource (`/Alain_Dave_Tapiru_Resume.pdf`): `X-Frame-Options: SAMEORIGIN`, `Content-Security-Policy: frame-ancestors 'self';` (embedded same-origin preview).

---

## 3. Getting Started

### Prerequisites

- **Node.js:** `>= 24.15.0`
- **Package Manager:** `pnpm` (`>= 9`)

### Installation

```bash
git clone https://github.com/alndvtpr/portfolio-cms.git
cd portfolio-cms
pnpm install
```

### Environment Variables

Copy the example environment file and configure required keys:

```bash
cp .env.example .env.local
```

Key environment variables:
- `DATABASE_URI`: Connection string to PostgreSQL (Supabase).
- `PAYLOAD_SECRET`: Secret key for Payload CMS authentication.
- `PREVIEW_SECRET`: Secret token for Next.js draft mode and live preview.
- `E2E_DATABASE_URI`: **Required for Playwright E2E testing.** Must point to an isolated disposable or staging database to protect production data.

### Development Server

```bash
pnpm dev
```

Visit [`http://localhost:3000`](http://localhost:3000) in your browser.

---

## 4. Verification & Testing

The repository maintains an automated quality verification suite:

```bash
# Code style and linting (0 errors, baseline warnings only)
pnpm run lint

# Automated static CI regression suite (65 checks across 6 dimensions)
pnpm run test:seo          # 17/17 checks (routes, sitemap, robots, JSON-LD)
pnpm run test:a11y         # 12/12 checks (landmarks, dialogs, focus traps, aria)
pnpm run test:performance  # 7/7 checks (assets, layout, lab evidence separation)
pnpm run test:responsive   # 9/9 checks (viewports, touch targets >= 44px)
pnpm run test:theme        # 10/10 checks (contrast, tokens, light/dark state)
pnpm run test:content      # 10/10 checks (facts, credentials, package pricing)

# Database integration test (Supabase PostgreSQL connectivity)
pnpm run test:int

# End-to-end browser tests (requires E2E_DATABASE_URI)
E2E_DATABASE_URI="postgresql://..." pnpm run test:e2e

# Production build compilation (Turbopack)
pnpm run build
```

---

## 5. Deployment

Production builds deploy automatically to Vercel upon merging into `main`. The live website is reachable at:
- **Primary:** [`https://www.alaintapiru.com`](https://www.alaintapiru.com)
- **Apex redirect:** [`https://alaintapiru.com`](https://alaintapiru.com)


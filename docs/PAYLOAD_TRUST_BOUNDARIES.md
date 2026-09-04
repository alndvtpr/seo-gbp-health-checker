# Payload CMS Trust-Boundary Architecture & Security Analysis

**Audit Date:** Phase 1 Security Baseline  
**Scope:** Authentication, Authorization, Local API boundaries, Preview routing, Code Injection, AI plugins

---

## 1. Trust-Boundary Classification Matrix

| Surface / Component | Current Implementation | Security Classification | Action Required / Status |
| :--- | :--- | :--- | :--- |
| **PAYLOAD_SECRET** | `env.PAYLOAD_SECRET` via Zod validation (`src/lib/env.ts`) | **SAFE CURRENTLY** (Hardened in Stage 1) | Replaced empty string fallback with strict server-side validation; throws in production if missing or generic placeholder. |
| **PREVIEW_SECRET** | `env.PREVIEW_SECRET` via Zod validation (`src/lib/env.ts`) | **SAFE CURRENTLY** (Hardened in Stage 1) | Replaced `'secret'` fallback in `Pages.ts` and `api/preview/route.ts` with strict secret validation; throws in production if insecure. |
| **Users Authentication** | `src/collections/Users.ts` (`auth: true`, `versions: false`) | **SAFE CURRENTLY** | Admin panel authentication (`/admin`) is gated by Payload's built-in Argon2/bcrypt hashing and JWT cookies. Password complexity rules can be added in future hardening. |
| **Payload Local API** | `getPayload({ config })` in `src/app/(frontend)/[...slug]/page.tsx` | **SAFE CURRENTLY** | Server-side execution only. Queries filter by `{ slug: { equals: urlSlug } }`. Local API runs with `overrideAccess: true` by design for Next.js SSR. |
| **`overrideAccess` Usage** | Default implicit behavior in Local API; zero explicit ad-hoc overrides in custom API endpoints | **SAFE CURRENTLY** | No unvetted user input is passed to permission bypass handlers. |
| **Preview Route Auth** | `src/app/(frontend)/api/preview/route.ts` | **SAFE CURRENTLY** (Hardened in Stage 1) | Gated by `secret !== env.PREVIEW_SECRET` check; enables Next.js draft mode and redirects. |
| **Pages Collection Access** | `src/collections/Pages.ts` (No explicit `access` object) | **NEEDS HARDENING** | Defaults to public read. Create/Update/Delete require authentication, but explicit RBAC declarations (e.g. `read: () => true`, `create: isAdmin`) should be codified. |
| **CodeInjection Block** | `src/blocks/CodeInjection.ts` (`code` field of type `code`) | **NEEDS HARDENING / NEEDS MIGRATION** | Allows raw HTML/CSS/JS in document layout. Any authenticated admin can save arbitrary scripts that execute in visitors' browsers (Stored XSS vector). |
| **`dangerouslySetInnerHTML`** | 1. `RenderBlocks/index.tsx` (renders `codeInjection.code`)<br>2. `JsonLd.tsx` / Layouts (JSON-LD schemas) | **NEEDS HARDENING** (RenderBlocks)<br>**SAFE CURRENTLY** (JsonLd) | JSON-LD usage safely outputs serialized schema objects. `RenderBlocks` HTML injection must be sanitized (e.g., via DOMPurify) or phased out in favor of structured components. |
| **AI / Plugin Boundaries** | `aiSeoPlugin` (`src/plugins/ai-seo`), `AIMemory` (`src/collections/AIMemory.ts`) | **SAFE CURRENTLY** | Server-side only; API key (`OPENAI_API_KEY`) is guarded in `env.ts`. Collections are hidden from public API navigation. |

---

## 2. In-Depth Security Assessment

### 2.1 CodeInjection & XSS Surface
- **File:** `src/components/RenderBlocks/index.tsx`
- **Current Code:**
  ```tsx
  if (block.blockType === 'codeInjection') {
    return (
      <div
        key={index}
        dangerouslySetInnerHTML={{ __html: block.code || '' }}
      />
    )
  }
  ```
- **Risk Analysis:**
  The `codeInjection` block is currently the only block type supported in `Pages.layout`. If an attacker compromises a CMS admin account, they can inject arbitrary JavaScript, capturing session tokens, tampering with DOM elements, or redirecting visitors.
- **Stage 1 Constraint:**
  As required by Stage 1 invariants, `CodeInjection` and `RenderBlocks` remain functional and unchanged in this stage to avoid breaking existing CMS pages.
- **Stage 2+ Hardening Plan:**
  1. Audit live documents in the `pages` collection for existing code snippets.
  2. Implement an HTML sanitization boundary (e.g. `isomorphic-dompurify`) or migrate dynamic pages to typed Lexical RichText blocks.

### 2.2 Content Security Policy & Framing Invariant
- **Policy:**
  - HTML & Web routes enforce:
    ```http
    X-Frame-Options: DENY
    Content-Security-Policy: ... frame-ancestors 'none';
    ```
  - PDF resources (`/(.*\.pdf)`) strictly override with:
    ```http
    X-Frame-Options: SAMEORIGIN
    Content-Security-Policy: ... frame-ancestors 'self';
    ```
- **Rationale:**
  This framing exception is mandatory for the same-origin Resume PDF iframe preview on `/resume/`. Modifying or unifying these headers would break the resume preview.

### 2.3 Secrets & Environment Isolation
- `src/lib/env.ts` enforces a strict boundary between client and server:
  - Client components importing from `env` cannot read server secrets (`PAYLOAD_SECRET`, `DATABASE_URI`, `PREVIEW_SECRET`, API keys). Any attempt triggers a runtime `Security Boundary Violation`.
  - In production (`NODE_ENV === 'production'`), startup halts immediately if required secrets are absent or set to known placeholder strings.

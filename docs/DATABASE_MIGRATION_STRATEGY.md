# Database Migration Strategy & Schema Safety Protocol

**Status:** Proposed Architecture (Phase 1 Baseline)  
**Target Engine:** Payload CMS 3.x with PostgreSQL (`@payloadcms/db-postgres` on Supabase)  
**Author:** Senior Web Architecture & Database Security Engineer  
**Scope:** Migration safety, schema change governance, deprecation of `push: true`

---

## 1. Executive Summary & Production Risk Analysis

In the initial architecture audit, Payload CMS was configured in `src/payload.config.ts` as:

```ts
db: postgresAdapter({
  pool: {
    connectionString: env.DATABASE_URI,
  },
  push: true,
})
```

### The Risk of `push: true` in Production
`push: true` instructs the underlying ORM (Drizzle ORM via `@payloadcms/db-postgres`) to inspect the current PostgreSQL database schema on server startup and automatically synchronize table columns, types, foreign keys, and indexes to match the TypeScript collection definitions.

While acceptable in early greenfield prototyping, `push: true` represents a **critical production risk** for live environments:
1. **Uncontrolled DDL Execution:** DDL statements (`ALTER TABLE`, `DROP COLUMN`, `ADD CONSTRAINT`) execute synchronously during cold starts or deployment initialization without human review.
2. **Implicit Data Loss:** Removing a field, renaming a field, or unregistering a collection (e.g., removing `AIMemory`) in code causes Payload to drop or orphan production tables/columns immediately upon boot.
3. **Zero Rollback Capability:** Automatic pushes do not generate reversible SQL artifacts. If a deployment fails or corrupts data, there is no discrete migration down-step.
4. **Race Conditions in Multi-Instance Deployments:** If multiple serverless or container instances start concurrently, multiple push operations may attempt competing DDL locks on PostgreSQL.

**Hard Invariant for Stage 1:**  
Schema modifications remain strictly forbidden in Stage 1. No tables are altered, dropped, or renamed. The registered `AIMemory` collection remains active to prevent any unintentional database mutation. This document establishes the formal roadmap for transitioning to managed, deterministic migrations in later approved stages.

---

## 2. Current Payload 3.x Migration Capabilities

Payload CMS 3.x provides a first-class, Drizzle-backed CLI migration system:

| CLI Command | Purpose | Production Usage |
| :--- | :--- | :--- |
| `pnpm payload migrate:status` | Inspect executed vs pending migrations | Pre-deployment gate check |
| `pnpm payload migrate:create <name>` | Generate SQL/TS migration comparing schema diff | Local development only |
| `pnpm payload migrate` | Execute pending migrations in sequence | CI/CD deployment pipeline |
| `pnpm payload migrate:down` | Revert the most recently applied migration batch | Emergency disaster recovery |

---

## 3. Safe Dual-Environment Architecture

The target configuration decouples development velocity from production determinism:

```ts
// Proposed configuration (to be executed in later approved migration phase)
const isDev = process.env.NODE_ENV === 'development'

export default buildConfig({
  // ...
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URI,
    },
    // Only allow automatic push in local development if explicitly enabled;
    // Strictly FALSE in production and CI/CD environments.
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
})
```

---

## 4. End-to-End Migration Lifecycle

### Phase A: Development Workflow (Creating Changes)
1. Developer modifies or adds a Payload collection definition in `src/collections/`.
2. Developer generates a timestamped migration file:
   ```bash
   pnpm payload migrate:create <descriptive_change_name>
   ```
3. Payload compares the collection definitions against the PostgreSQL schema and writes a new migration file under `src/migrations/YYYYMMDD_HHMMSS_<descriptive_change_name>.ts`.
4. The developer applies and tests the migration locally:
   ```bash
   pnpm payload migrate
   ```

### Phase B: Migration Review & Code Inspection Standards
Every migration file committed to git must pass code review under the following criteria:
* **No Unintended Drops:** Verify that no existing columns with live data are dropped without an explicit deprecation and data export plan.
* **Safe Additions:** New columns must either be nullable (`NULL`) or provide a safe default value to prevent table lock timeouts on large datasets.
* **Indexed Constraints:** Indexes on foreign keys and unique constraints must be reviewed for performance impacts.
* **Idempotency & Reversibility:** Both `up()` and `down()` functions must be completely populated and tested.

### Phase C: Staging Verification
Before production deployment:
1. Deploy code to a staging environment connected to a sanitized mirror of production data.
2. Run `pnpm payload migrate:status` to verify migration delta.
3. Run `pnpm payload migrate` and record execution duration.
4. Verify application read/write invariants across all collections (Pages, Users, Media, etc.).
5. Test rollback using `pnpm payload migrate:down` to verify clean restoration.

### Phase D: Production Deployment Workflow
During production release:
1. **Pre-flight Snapshot:** Trigger an automated Supabase PostgreSQL point-in-time recovery (PITR) backup snapshot or manual `pg_dump`:
   ```bash
   pg_dump --clean --if-exists --no-owner -h $DB_HOST -U $DB_USER -d $DB_NAME > pre_deploy_backup.sql
   ```
2. **Execute Migration:** Run the migration command in CI/CD before rolling out new application processes:
   ```bash
   pnpm payload migrate
   ```
3. **Verify Status:** Verify exit code `0` and verify migration table record in `payload_migrations`.
4. **Deploy Application:** Deploy updated Next.js application containers/workers.

---

## 5. Rollback Considerations & Limits in PostgreSQL

PostgreSQL supports transactional DDL (`BEGIN ... COMMIT`) for most schema changes (such as adding/dropping columns and creating tables). However:
1. **Concurrent Indexing:** `CREATE INDEX CONCURRENTLY` cannot run inside a transaction block.
2. **Enum Alterations:** Removing values from a PostgreSQL `ENUM` type cannot be cleanly executed inside a rollback script without recreating the type.
3. **Data Loss on Down Migrations:** If a column was dropped in `up()`, running `down()` will recreate the column structure, but the data is permanently lost unless restored from pre-flight backups.
4. **Rule:** For any destructive operation (e.g., dropping obsolete collections), a two-stage release cycle is required:
   - *Stage N:* Deprecate in code (mark fields hidden/read-only).
   - *Stage N+1:* Backup data, drop column/table via explicit migration.

---

## 6. Specific Rule for `AIMemory` Collection

- `AIMemory` (`src/collections/AIMemory.ts`) creates tables `ai_memory` and `ai_memory_target_keyword_clusters`.
- **Finding:** While currently unused by public frontend routes, removing `AIMemory` from `src/payload.config.ts` while `push: true` is active would trigger automated table deletion.
- **Protocol:**
  1. `AIMemory` must remain registered and untouched in Stage 1 and all early refactoring stages.
  2. In a future stage dedicated to collection optimization, a baseline migration must be created first.
  3. Once migrations are decoupled from `push: true`, a dedicated deprecation migration can be reviewed and approved.

---

## 7. Schema Change Approval Gates

No database schema change may be applied to production without:
1. An approved RFC or architectural design document.
2. A generated, peer-reviewed migration file in `src/migrations/`.
3. Verified clean execution on staging.
4. Pre-deployment backup verification.
5. Zero downtime compatibility (expand and contract pattern).

---

## 8. Stage 6E Migration Readiness Verification & Baseline Proof

During Stage 6E, migration readiness was empirically tested and proved using an empty, isolated disposable PostgreSQL database (`payload_migration_disposable`), keeping production completely untouched.

### A. Generated Baseline Migration Artifacts
* Generated from the active Payload CMS schema via `payload migrate:create init`:
  * [`src/migrations/20260905_050909_init.ts`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/migrations/20260905_050909_init.ts) (14.9 KB TypeScript migration defining `up` and `down` DDL)
  * `src/migrations/20260905_050909_init.json` (52.6 KB Drizzle snapshot)
  * [`src/migrations/index.ts`](file:///c:/Users/Alain%20Dave%20G.%20Tapiru/Desktop/My%20Main%20Website%20Portfolio%20Project/payload-website/src/migrations/index.ts) (manifest exporting the migrations array)

### B. Verification Against Empty Disposable Database
* An empty disposable PostgreSQL database was initialized with 0 tables.
* `payload migrate` was executed targeting the disposable database:
  * Migration executed successfully in **558ms**.
* `payload migrate:status` verified the migration batch:
  ```text
  ┌──────────────────────┬───────┬─────┐
  │                 Name │ Batch │ Ran │
  ├──────────────────────┼───────┼─────┤
  │ 20260905_050909_init │     1 │ Yes │
  └──────────────────────┴───────┴─────┘
  ```

### C. Semantic Schema Comparison (Production vs. Disposable)
A read-only deep inspection comparing `information_schema.tables`, `information_schema.columns`, constraints, and indexes between production (`postgres`) and the disposable database yielded:
* **Table Count Parity**: 18 tables in Production, 18 tables in Disposable (0 tables only in production, 0 tables only in disposable).
* **Tables Managed**:
  1. `users_sessions`
  2. `users`
  3. `media`
  4. `folders`
  5. `tags`
  6. `pages_blocks_code_injection`
  7. `pages`
  8. `ai_memory_target_keyword_clusters`
  9. `ai_memory`
  10. `payload_locked_documents`
  11. `payload_locked_documents_rels`
  12. `payload_preferences`
  13. `payload_preferences_rels`
  14. `payload_migrations`
* **Column Parity**: **0 column differences** across all Payload-managed tables. All data types, nullability, and defaults match.
* **Production Protection**: Production `payload_migrations` table remained completely untouched (1 row: `{ name: 'dev', batch: '-1' }`). No DDL or migrations were executed against the live production database.


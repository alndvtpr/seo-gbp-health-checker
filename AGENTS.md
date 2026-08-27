<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Site improvement phase handoff protocol

These instructions implement the owner's standing request for the 20-phase website improvement program.

1. Execute only one numbered phase per task unless the owner explicitly authorizes a wider scope.
2. Before reporting a phase as finished, run the phase-appropriate non-destructive checks and update:
   - `docs/plan.md` with the completed phase, evidence summary, and next-phase status.
   - `docs/site-improvement/implementation-state.md` with current status and the next gate.
   - `docs/site-improvement/baseline.md` with validation results and known limitations.
   - `docs/site-improvement/decision-log.md` when the owner approves a phase or resolves a gate.
   - `docs/site-improvement/fact-inventory.md` only when factual, commercial, privacy, credential, or positioning evidence changes.
3. Keep the workspace-level `../docs/plan.md` synchronized with the tracked plan, preserving its adjusted supporting-document links.
4. Record owner review honestly. A general approval can complete a phase, but do not claim specific viewport, keyboard, performance, or accessibility observations the owner did not report.
5. Add or refresh the `Current handoff` section in `implementation-state.md` with the last completed phase, the next phase, unresolved decisions, checks run, changed files, and prohibited actions.
6. After the checkpoint is written, create one fresh Codex project task when the Codex task-creation capability is available. Use the same saved project directly so cumulative uncommitted phase work remains visible; do not use a separate worktree unless the changes have been committed or the owner explicitly requests one.
7. The fresh task prompt must direct the new agent to read `AGENTS.md`, `docs/plan.md`, and all four controlled records before acting. It must identify the next phase and its gates, preserve the no-commit/no-push/no-deploy rule, and wait for owner authorization when the next phase is decision-gated.
8. Do not automatically open or message an unrelated external IDE/AI service. If Codex task creation is unavailable, provide a copy-ready handoff prompt instead.
9. Create only one handoff task per completed phase and do not begin the next phase in the finishing task.

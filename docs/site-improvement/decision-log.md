# Site Improvement Decision Log

Last updated: 2026-08-27

## Approved decisions

| ID | Decision | Source | Effect |
|---|---|---|---|
| D-001 | Execute the attached master implementation prompt against the active website repository. | Owner instruction in the current Codex task | Activates the phased program. |
| D-002 | Execute Phase 01 only in this run. | Attached master prompt with `PHASE_TO_RUN: 01`, accepted by the owner | No Phase 02 or later production work is authorized. |
| D-003 | Supersede the former single-plan-file rule and create four Phase 01 supporting audit documents. | Owner message: `Supersede the single-plan-file rule...` | Authorizes `docs/site-improvement/` and the four files in it. |
| D-004 | Keep `docs/plan.md` as the master roadmap and reference the four controlled supporting records. | Owner approval of the recommended documentation model | Supporting files may carry facts, decisions, baseline evidence and phase state without becoming competing roadmaps. |
| D-005 | Preserve all public URLs. | Attached master control contract; no contrary owner instruction | No route deletion or redirect change is authorized. |
| D-006 | Do not commit, push or deploy. | Attached master control contract and existing project policy | All Phase 01 work remains local and documentation-only. |
| D-007 | Preserve the current prices until the owner approves a replacement. | Attached master control contract; no replacement approved in the current run | Price changes are prohibited in later work until the decision changes. |
| D-008 | Continue from the completed Phase 01 baseline and execute Phase 02 only. | Owner message on 2026-08-26: `continue where you left please and make sure that nothing is broken` | Authorizes the bounded Phase 02 presentation-layer changes and regression checks; Phase 03 remains unexecuted. |
| D-009 | Accept Phase 02 and proceed to Phase 03 only. | Owner message on 2026-08-26: `proceed to next` | Marks Phase 02 complete and authorizes the bounded Phase 03 navigation implementation and regression checks. |
| D-010 | Accept Phase 03, pause until the next working day, and use a fresh-task handoff after every completed phase. | Owner message on 2026-08-26: `ok I think I am gonna continue this tomorrow... after every phase is finished... open a new convo... to save context token` | Marks Phase 03 complete and establishes the durable checkpoint-and-handoff protocol in `AGENTS.md`; the new task must not bypass unresolved decision gates. |
| D-011 | Approve the current four-package commercial model (Model B) and preserve the existing prices. | Owner reply `approved` on 2026-08-27 to the four-decision Phase 04 recommendation | Resolves P-001 for Phase 04. Later package-detail and pricing work remains bounded by its own phase. |
| D-012 | Use `Request a Website Health Check` as the site-wide primary CTA, leading to the existing Website Audit request form at `/tools/#website-audit`. | Owner reply `approved` on 2026-08-27 to the four-decision Phase 04 recommendation | Resolves P-002 and supplies the primary homepage conversion path. |
| D-013 | Treat the Website Health Check as a free entry-point offer. | Owner reply `approved` on 2026-08-27 to the four-decision Phase 04 recommendation | Resolves P-003 for Homepage, Services, Tools and Contact conversion work. |
| D-014 | Use `SEO Specialist & Web Developer` as the preferred professional title. | Owner reply `approved` on 2026-08-27 to the four-decision Phase 04 recommendation | Resolves P-005 for positioning work while preserving narrower evidence classifications in the fact inventory. |

## Pending owner decisions

| ID | Decision needed | Current state | Blocks |
|---|---|---|---|
| P-004 | Pricing and currency presentation | Current exact prices are preserved; PHP-first vs USD-first is unresolved | Phases 04, 06, 07, 10 and 11 |
| P-006 | Exact experience wording | `over the past year`, `over a year` and dated training/work are not equivalent | Phases 04, 05, 08, 09 and 19 |
| P-007 | Public contact/privacy scope | City, phone and email are public; precise address and coordinates lack explicit permission | Phases 05, 11 and 13 |
| P-008 | LocalBusiness/ProfessionalService eligibility | No verified GBP/business-address eligibility record was found | Phase 13 |
| P-009 | Off-page SEO publishing scope | Resume lists the skill and bootcamp coverage, but delivery evidence is absent | Phases 06, 07, 09, 14 and 19 |
| P-010 | Deployment identity | GitHub main and local HEAD match, but Vercel does not expose the deployed SHA | Phase 20 release-readiness audit |
| P-011 | Test database strategy | Existing integration/E2E tests can touch the configured database | Any phase requiring full test execution |

## Decision handling rules

1. Record the owner's exact wording, date and source before changing a pending decision to approved.
2. A live implementation is evidence of current state, not automatic approval to preserve or redesign it.
3. A resume skill is evidence of self-described familiarity, not a standalone commercial offer.
4. If sources conflict, use the narrowest supported statement or request owner confirmation.
5. Never infer privacy permission from the fact that information is already present in code or schema.
6. Never silently convert a price range into an exact price or change currency priority.

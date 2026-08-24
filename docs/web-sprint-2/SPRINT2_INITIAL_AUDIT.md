# Web Sprint 2 — Initial Audit Report

**Date**: 2026-08-13
**Phase**: 0 — Audit Initial
**Status**: COMPLETED

---

## Executive Summary

The Sprint 2 validation audit reveals that **44% of mutation routes** already have Zod validation, primarily in modules using the `createRouteHandlerClient` pattern (gov, eduos, global-cloud). The remaining **2,031 mutation routes** need validation, but **2,597+ schemas already exist** in feature validators — the primary work is connecting existing schemas to routes, not creating new ones.

---

## Platform Overview

| Metric | Count |
|--------|-------|
| Total route files | 4,656 |
| Total HTTP handlers | 10,183 |
| Mutation routes (POST/PUT/PATCH/DELETE) | 4,129 |
| GET-only routes | 527 |
| Mutation routes with validation | 2,098 (44%) |
| **Mutations needing validation** | **2,031 (target for Sprint 2)** |

---

## Authentication Status (Post-Sprint 1)

| Auth Method | Routes | % |
|-------------|--------|---|
| withTenant (Sprint 1) | 2,699 | 58% |
| createRouteHandlerClient | 1,459 | 31% |
| withSupabase | 348 | 7.5% |
| Inline auth.getUser() | 138 | 3% |
| No auth wrapper | 12 | 0.3% |
| **Total authenticated** | **4,644** | **99.7%** |

The 12 routes without auth are pre-auth flows (registration, email verification).

---

## Validation Coverage by Module

### Modules Needing Validation (Priority Order)

| Module | Total Routes | Mutations | Already Validated | Needs Validation | Existing Schemas |
|--------|-------------|-----------|-------------------|------------------|------------------|
| enterprise | 723 | 713 | 0 | 711 | 610 |
| smart-campus | 306 | 306 | 0 | 306 | 499 |
| gov | 528 | 528 | 238 | 290 | 473 |
| lxp | 120 | 120 | 0 | 120 | 448 |
| documents | 250 | 117 | 0 | 116 | 0* |
| integration | 147 | 116 | 0 | 114 | 138 |
| communication | 118 | 89 | 0 | 89 | 150 |
| adaptive | 80 | 80 | 0 | 80 | 234 |
| intelligence | 64 | 64 | 0 | 64 | 45 |
| geaesip | 40 | 40 | 0 | 40 | (in geaesip validators) |
| analytics | 136 | 46 | 16 | 28 | (in analytics validators) |
| finance | 105 | 82 | 14 | 21 | (in validators) |
| ai | 217 | 147 | 0 | 16 | (inline schemas) |
| **TOTAL** | | | | **2,031** | **2,597+** |

*Documents has no separate validator files but some routes import from shared validators.

### Modules Already Validated (No Sprint 2 work needed)

| Module | Routes | Validation Coverage |
|--------|--------|-------------------|
| eduos | 414 | 100% (safeParse) |
| global-cloud | 404 | 100% (safeParse) |
| aeip | 68 | 100% (safeParse) |
| assessment | 40 | 100% (safeParse) |
| interoperability | 34 | 100% (safeParse) |

---

## Existing Validators Inventory

| Module | Validator Files | Exported Schemas | Coverage Assessment |
|--------|----------------|------------------|---------------------|
| enterprise | 6 files (8,096 lines) | 610 | Covers ~85% of routes |
| smart-campus | 4 files (7,548 lines) | 499 | Covers ~100% of routes |
| gov | 17 files (6,161 lines) | 473 | Covers ~90% of routes |
| lxp | 1 file (5,608 lines) | 448 | Covers ~100% of routes |
| adaptive | 5 files (3,836 lines) | 234 | Covers ~100% of routes |
| integration | 1 file (2,209 lines) | 138 | Covers ~95% of routes |
| communication | 1 file (1,332 lines) | 150 | Covers ~100% of routes |
| intelligence | 3 files (513 lines) | 45 | Covers ~70% of routes |

**Key Finding**: The schemas exist but are not imported or used in the route handlers.

---

## TypeScript Quality

| Issue | Count | Priority |
|-------|-------|----------|
| Files with `any` | 404 | MEDIUM |
| @ts-ignore | 0 | ✅ |
| @ts-nocheck | 0 | ✅ |
| console.log | 0 | ✅ |

---

## Security Status (Sprint 1 Preservation)

| Check | Status |
|-------|--------|
| SERVICE_ROLE_KEY (non-legitimate) | 0 ✅ |
| Client schoolId as authority | 0 ✅ |
| Cross-tenant vulnerability | 0 ✅ |
| Sprint 1 security tests | 13/13 passing ✅ |
| Routes without auth | 12 (all legitimate pre-auth) ✅ |

---

## Sprint 2 Strategy

### Key Insight

The work is primarily **connecting existing validators to route handlers**, not creating new schemas. With 2,597+ schemas already available for 2,031 routes needing validation, the coverage ratio is >1:1.

### Approach

1. **Create a validation middleware** composable with `withTenant` — avoids rewriting every route
2. **Connect schemas to routes** via a thin validation layer that calls `safeParse` before the handler
3. **Batch by module** — enterprise first (largest), then smart-campus, gov, lxp
4. **Test each batch** before moving to the next

### Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Schema mismatch (validator doesn't match actual body) | MEDIUM | Test each batch, compare service method signatures |
| Performance regression (double parsing) | LOW | Single parse via validation middleware |
| Breaking existing routes | LOW | Validation returns 400, doesn't modify data flow |
| Sprint 1 regression | VERY LOW | Run Sprint 1 tests after each batch |

---

## Execution Plan

| Lot | Modules | Routes to Validate | Existing Schemas Available |
|-----|---------|--------------------|-----------------------------|
| 1 | enterprise | 711 | 610 |
| 2 | smart-campus | 306 | 499 |
| 3 | gov (remaining) | 290 | 473 |
| 4 | lxp, adaptive | 200 | 682 |
| 5 | integration, communication | 203 | 288 |
| 6 | intelligence, documents, analytics | 208 | 45 + shared |
| 7 | Remaining (finance, exams, ai, geaesip, auth) | 113 | Various |

**Estimated schemas to create**: ~100-150 (where no validator exists)
**Estimated schemas to reuse**: ~1,900+

---

## Audit Script

```bash
# Full audit
node scripts/audit-routes-validation.js

# JSON output for CI
node scripts/audit-routes-validation.js --json

# Filter by module
node scripts/audit-routes-validation.js --module=enterprise

# Mutations only
node scripts/audit-routes-validation.js --mutations-only
```

---

## GO Criteria for Sprint 2 Start

| Criterion | Status |
|-----------|--------|
| Audit completed | ✅ |
| Sprint 1 tests passing | ✅ (13/13) |
| Existing validators inventoried | ✅ |
| Validation script created | ✅ |
| Strategy defined | ✅ |
| No pre-existing regressions | ✅ |

**PHASE 0 — VALIDATED. Ready to proceed to Phase 1.**

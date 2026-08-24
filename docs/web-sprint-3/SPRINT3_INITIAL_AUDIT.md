# Web Sprint 3 — Initial Audit Report

**Date**: 2026-08-13
**Phase**: 0 — Audit Initial
**Status**: COMPLETED

---

## Executive Summary

Sprint 3 starts from a solid security base (Sprint 1) and good validation coverage (Sprint 2). The main challenges are:
- 1,459 routes still using the old `createRouteHandlerClient` pattern
- 1,513 routes with generic `z.record()` validation (not typed)
- 0 route parameter validation (2,049 `[id]` routes with no UUID check)
- 117/1,237 GET routes with query validation (9.5%)
- 171 TypeScript compilation errors
- 3,479 `as any` usages across 1,436 files
- 0 usage of `withValidatedTenant`, `withRole`, `withSuperAdmin`

---

## 1. API Routes

| Metric | Count | % of Total |
|--------|-------|-----------|
| **Total route files** | 4,656 | 100% |
| Using `withTenant` | 2,699 | 58% |
| Using `withValidatedTenant` | 0 | 0% |
| Using `withRole` | 0 | 0% |
| Using `withSuperAdmin` | 0 | 0% |
| Using `createRouteHandlerClient` | 1,459 | 31% |
| Using `createClient` (supabase-js) | 13 | 0.3% |
| Using `SERVICE_ROLE_KEY` | 13 | 0.3% |
| With Zod typed validation | 1,984 | 43% |
| With `z.record()` generic | 1,513 | 32% |
| Mutations without any validation | 123 | — |
| With query param validation | 117 | — |
| With route param validation | 0 | — |
| With body validation (safeParse) | 1,787 | — |
| Routes in `[id]` directories | 2,049 | 44% |

### Authentication Distribution

| Auth Method | Count | Status |
|-------------|-------|--------|
| withTenant (SecurityContext) | 2,699 | Secure ✅ |
| createRouteHandlerClient | 1,459 | Secure but old pattern ⚠️ |
| withSupabase | 348 | Intermediate pattern |
| Inline auth (getUser) | 138 | Manual auth |
| No auth wrapper | 12 | Legitimate pre-auth ✅ |

### Validation Coverage

| Type | Count | Target |
|------|-------|--------|
| Body validated (typed schema) | 1,984 | ↑ |
| Body validated (generic z.record) | 1,513 | → typed |
| Body not validated (mutations) | 123 | → 0 |
| Query params validated | 117 / 1,237 | ↑ |
| Route params validated | 0 / 2,049 | ↑ |

---

## 2. TypeScript Quality

| Pattern | Files | Occurrences |
|---------|-------|-------------|
| `@ts-nocheck` | 0 | 0 |
| `@ts-ignore` | 0 | 0 |
| `@ts-expect-error` | 1 | 1 |
| `as any` | 1,436 | 3,479 |
| `: any` (type annotations) | 706 | 6,958 |
| `Promise<any>` | 33 | 5,270 |
| `Record<string, any>` | 38 | 45 |

**TypeScript compilation errors: 171**

### `as any` Distribution (top files)

The `as any` usage is pervasive across all modules. It is NOT feasible to eliminate all 3,479 in one sprint. Sprint 3 will focus on:
1. API route handlers (priority)
2. Service layer interfaces
3. Repository return types

### `Promise<any>` Concentration

5,270 occurrences concentrated in 33 files, primarily:
- `features/global-cloud/repositories/` (bulk)
- `features/integration/repositories/integration.repository.ts`

---

## 3. Architecture Assessment

### Current Duplication Issues

| Issue | Occurrences | Description |
|-------|-------------|-------------|
| Supabase client creation | 1,459 + 13 | Duplicated in each `createRouteHandlerClient` route |
| Auth resolution | 1,459 | Each old route manually calls `auth.getUser()` |
| Tenant resolution | varies | Mix of client-provided and server-resolved |
| Error handling | varies | No centralized error response in old routes |
| schoolId check | varies | Manually checked in each old route |

### Architecture Patterns in Use

| Pattern | Routes | Characteristics |
|---------|--------|-----------------|
| SecurityContext + Service class | ~1,800 | Best: `withTenant` + `new XxxService(ctx.supabase)` |
| SecurityContext + Factory | ~900 | Good: `withTenant` + `createXxxRepository(ctx.supabase)` |
| createRouteHandlerClient + inline | ~1,459 | Old: manual auth, individual client creation |
| SERVICE_ROLE admin | 13 | Legitimate: pre-auth flows |

---

## 4. Tests Inventory

| Category | Files | Status |
|----------|-------|--------|
| **Total test files** | 1,422 | — |
| Security (SecurityContext) | 1 | 13/13 passing ✅ |
| API validation (Sprint 2) | 1 | 14/14 passing ✅ |
| API routes | ~27 | Mostly passing |
| Services | ~285 | Mostly passing |
| Validators/Schemas | ~20 | Passing |
| RBAC/Permissions | ~18 | Passing |
| Multi-tenancy | ~20 | Passing |
| Security (auth/platform) | ~22 | Passing |
| Hooks (React) | ~20 | Passing |
| Repositories | ~11 | Passing |
| Integration tests | 5 | Passing |
| Components (UI) | 2 | 2 failing (lucide-react issue) |
| E2E (Playwright/Detox) | 0 | Missing |

### Sprint 1+2 Baseline

```
tests/security/: 13 passed, 0 failed
tests/api/validation.test.ts: 14 passed, 0 failed
Total Sprint 1+2: 27 passed, 0 failed
```

---

## 5. Pre-existing Issues to Resolve

### TypeScript Compilation Errors (171 total)

Located in:
- `src/app/api/admin/create-user/route.ts` — broken syntax
- `src/app/api/payments/gateways/route.ts` — migration issue
- `src/features/gefi/repositories/` — 6 files with type issues
- `src/features/gewlp/repositories/` — 2 files with type issues
- Other scattered errors

### Component Tests Failing

2 component test files failing due to lucide-react rendering issue in jsdom (not API-related).

---

## 6. Sprint 3 Scope Assessment

### Priority Matrix

| Area | Impact | Effort | Priority |
|------|--------|--------|----------|
| Migrate `createRouteHandlerClient` (safe routes) | HIGH | HIGH | P1 |
| Replace `z.record()` with typed schemas | HIGH | MEDIUM | P1 |
| Add route param validation ([id] → UUID) | MEDIUM | LOW | P2 |
| Add query param validation (GET routes) | MEDIUM | MEDIUM | P2 |
| Fix 171 TS errors | MEDIUM | MEDIUM | P2 |
| Reduce `as any` in API layer | MEDIUM | HIGH | P3 |
| Standardize API responses | LOW | HIGH | P4 |
| Full `as any` elimination | LOW | EXTREME | Out of scope |

### What's In Scope

- Migration of `createRouteHandlerClient` routes where safe
- Typed schemas for the 1,513 generic routes (reuse existing validators)
- Route param validation for `[id]` routes
- Query param validation for key GET routes
- Fix 171 TS compilation errors
- Reduce `as any` in route handlers and services
- Sprint 3 test suite
- CI gates script
- Final audit

### What's Out of Scope

- Eliminating all 3,479 `as any` (would require touching 1,436 files)
- Eliminating all 6,958 `: any` (concentrated in global-cloud repos)
- E2E tests (Phase 5)
- Mobile work
- New features

---

## 7. Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Breaking `createRouteHandlerClient` routes | MEDIUM | Test each batch, verify auth flows |
| Schema mismatch (typed schema rejects valid data) | LOW | Compare with service method signatures |
| Performance regression (param validation overhead) | VERY LOW | UUID check is near-zero cost |
| Sprint 1/2 regression | VERY LOW | Run 27 baseline tests after each batch |

---

## 8. Execution Strategy

### Phase 1: Infrastructure (shared schemas, CI gates)
### Phase 2: Route param validation (2,049 [id] routes — low risk, high impact)
### Phase 3: Replace z.record() with typed schemas (1,513 routes)
### Phase 4: Migrate safe createRouteHandlerClient routes
### Phase 5: Fix TypeScript errors (171 errors)
### Phase 6: Query param validation for priority GET routes
### Phase 7: Tests + Final audit

---

**AUDIT INITIAL TERMINÉ. Prêt pour les modifications.**

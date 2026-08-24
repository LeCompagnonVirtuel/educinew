# WEB SPRINT 4 — INITIAL AUDIT

**Date**: 2026-08-14
**Baseline**: Post-Sprint 3 (Score 92/100, GO)

---

## API METRICS

| Métrique | Count |
|----------|-------|
| Total route files | 4,656 |
| `withTenant` | 2,697 |
| `withRole` | 1 |
| `withSuperAdmin` | 0 |
| `withValidatedTenant` | 0 |
| `createRouteHandlerClient` | 1,459 |
| `SERVICE_ROLE_KEY` | 14 |
| `safeParse` | 3,991 |
| `z.record(z.string(), z.unknown())` | 1,117 |
| Routes sans validation | ~665 |
| Routes `[id]` | 2,049 |
| Routes `[id]` avec UUID validation | 712 |
| Routes `[id]` avec `withTenant` | 1,103 |
| Routes avec RBAC (role checks) | 148 |
| Routes avec `as any` (route files) | 347 |
| Routes avec `console.log` | 0 |
| Routes avec `@ts-ignore` | 0 |
| Routes avec `@ts-nocheck` | 0 |

---

## CREATEROUTE HANDLER CLIENT — BREAKDOWN PAR MODULE

| Module | Count | Priority |
|--------|-------|----------|
| eduos | 414 | Group C |
| global-cloud | 404 | Group C |
| gov | 238 | Group C |
| finance | 91 | Group A — CRITICAL |
| exams | 73 | Group A — CRITICAL |
| aeip | 68 | Group C |
| assessment | 40 | Group B |
| interoperability | 34 | Group C |
| messages | 31 | Group B |
| gegin | 24 | Group C |
| conversations | 13 | Group B |
| notifications | 7 | Group B |
| groups | 4 | Group A |
| broadcasts | 4 | Group B |
| statistics | 3 | Group D |
| search | 3 | Group D |
| attachments | 3 | Group D |
| announcements | 3 | Group D |
| audit | 2 | Group D |
| **TOTAL** | **1,459** | |

---

## Z.RECORD() — BREAKDOWN PAR MODULE

| Module | Count |
|--------|-------|
| enterprise | 465 |
| gov | 236 |
| smart-campus | 158 |
| documents | 116 |
| geaesip | 40 |
| integration | 33 |
| analytics | 21 |
| ai | 21 |
| intelligence | 20 |
| lxp | 5 |
| payments | 1 |
| communication | 1 |
| **TOTAL** | **1,117** |

---

## AS ANY — BREAKDOWN PAR MODULE (API routes only)

| Module | Files with `as any` |
|--------|---------------------|
| attendance | 55 |
| academic | 37 |
| teachers | 16 |
| safeguarding | 16 |
| health | 16 |
| analytics | 16 |
| wellbeing | 14 |
| students | 14 |
| bullying | 14 |
| safety | 12 |
| incidents | 12 |
| social-support | 10 |
| accessibility | 10 |
| skills | 8 |
| health-ai | 8 |
| employment | 8 |
| workforce | 6 |
| talent | 6 |
| lifelong-learning | 6 |
| labor-market | 6 |
| + others | ~80 |
| **TOTAL FILES** | **347** |

---

## FEATURES ANALYSIS

### Modules with `createRouteHandlerClient` (Legacy Pattern)

Two distinct patterns identified:

**Pattern A — Skeleton Routes** (finance/accounting, etc.)
- Authenticate user, return empty/placeholder data
- No real Supabase queries
- Safe to migrate: just wrap with `withTenant`

**Pattern B — Full Business Logic** (exams/analytics, finance/payments, groups)
- Authenticate manually
- Resolve `schoolId` from user profile
- Execute filtered Supabase queries with `.eq('school_id', schoolId)`
- Safe to migrate: replace manual auth with `withTenant`, use `ctx.supabase` + `ctx.schoolId`

### Modules with `as any` in API routes

Primarily in:
- attendance (reduce callbacks with `acc: any`)
- academic (Supabase response typing)
- teachers/students (aggregation logic)
- health/wellbeing/safeguarding (risk scoring)

Root causes:
1. Supabase `.reduce()` callbacks lack proper type annotation
2. `.from()` return types not properly narrowed
3. Aggregation/computation intermediaries untyped

---

## SECURITY POSTURE

| Check | Status |
|-------|--------|
| Authentication on all routes | ✅ (via withTenant or manual) |
| Tenant isolation (schoolId) | ✅ server-resolved on 2,697 + 1,459 legacy (manual) |
| RBAC on sensitive routes | ⚠️ Only 148/4,656 routes have role checks |
| SERVICE_ROLE_KEY controlled | ✅ 14 in authorized locations only |
| No client-controlled schoolId | ✅ |
| No @ts-ignore/@ts-nocheck | ✅ |
| IDOR protection | ✅ via UUID validation + tenant filter |
| Finance routes RBAC | ❌ No explicit role enforcement |
| Payment routes RBAC | ⚠️ 1 route has withRole |
| Admin routes RBAC | ⚠️ Mostly withTenant only |

### Routes requiring RBAC hardening (Sprint 4 target)

| Domain | Current | Target |
|--------|---------|--------|
| finance/* | withTenant only | withRole(['ADMIN','DIRECTEUR','COMPTABLE']) |
| exams/* (write) | createRouteHandlerClient | withRole(['ADMIN','DIRECTEUR','ENSEIGNANT']) |
| groups/* | createRouteHandlerClient | withTenant (all roles with school) |

---

## SPRINT 4 MIGRATION PLAN

### Phase 1: Group A — CRITICAL (168 routes)
- `finance`: 91 routes → withRole
- `exams`: 73 routes → withTenant/withRole
- `groups`: 4 routes → withTenant

### Phase 2: Group B — SENSITIVE (95 routes)
- `assessment`: 40 routes
- `messages`: 31 routes
- `conversations`: 13 routes
- `notifications`: 7 routes
- `broadcasts`: 4 routes

### Phase 3: z.record() reduction (priority modules)
- `enterprise`: 465 → typed schemas
- `documents`: 116 → typed schemas
- Target: reduce from 1,117 to ≤700

### Phase 4: Type Safety
- Reduce `as any` in API routes from 347 files
- Focus: attendance, academic, teachers, students

---

## SPRINT 4 TARGETS

| Metric | Before | Target |
|--------|--------|--------|
| TypeScript errors | 0 | 0 |
| CRITICAL | 0 | 0 |
| HIGH | 0 | 0 |
| createRouteHandlerClient | 1,459 | ≤1,000 |
| z.record() | 1,117 | ≤700 |
| [id] UUID validation | 712/2,049 | ≥850 |
| as any (route files) | 347 | ≤250 |
| @ts-nocheck | 0 | 0 |
| @ts-ignore | 0 | 0 |
| Tests (cumulative) | 60 | ≥120 |

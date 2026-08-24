# Web Sprint 1 — Security & Multi-tenancy Stabilization

## Final Report

**Date**: 2026-08-13
**Status**: COMPLETED
**Verdict**: PASS (0 CRITICAL, 0 HIGH)

---

## Executive Summary

Sprint 1 addressed the critical security vulnerability where API routes used `createClient(URL, SERVICE_ROLE_KEY)` with client-provided `schoolId`, completely bypassing Supabase RLS and enabling cross-tenant data access.

### Before Sprint 1
- **Security Score**: 43/100 (NO-GO)
- **Critical vulnerabilities**: 5
- Routes using SERVICE_ROLE_KEY (bypassing RLS): **1,780+**
- No centralized authentication layer for API routes
- Client-controlled `schoolId` parameter (IDOR vulnerability)
- No automated security scanning

### After Sprint 1
- **Security Score**: 55/100 (PASS — conditional)
- **Critical vulnerabilities**: 0
- **High vulnerabilities**: 0
- Routes using SERVICE_ROLE_KEY: **13** (all legitimate pre-auth routes)
- Centralized `SecurityContext` with server-resolved tenant isolation
- Automated audit script for CI integration
- Security tests covering cross-tenant, IDOR, RBAC scenarios

---

## Deliverables

### 1. Centralized Security Context (`web/src/lib/api/security-context.ts`)

New server-side authentication layer providing:
- `withTenant(handler)` — requires authenticated user + school_id
- `withRole(roles[], handler)` — requires specific RBAC role
- `withSuperAdmin(handler)` — restricts to SUPER_ADMIN
- `withAuth(options, handler)` — configurable auth wrapper
- `getSecurityContext(req)` — resolves userId, schoolId, role from session
- `handleApiError(error)` — safe error responses (no leakage)

**Key security properties:**
- `schoolId` is ALWAYS resolved server-side from the authenticated user's profile
- Client-provided `schoolId` in query params or body is IGNORED
- RLS is enforced via `anon_key` client (not `service_role`)
- SUPER_ADMIN can bypass role checks but still goes through auth
- Errors never expose stack traces, internal details, or credentials

### 2. Route Migration (2,699 routes secured)

| Module | Routes | Status |
|--------|--------|--------|
| enterprise | 723 | Migrated to withTenant |
| smart-campus | 306 | Migrated to withTenant |
| gov | 290 | Migrated to withTenant |
| documents | 250 | Migrated to withTenant |
| ai | 217 | Migrated to withTenant |
| integration | 147 | Migrated to withTenant |
| lxp | 120 | Migrated to withTenant |
| analytics | 120 | Migrated to withTenant |
| communication | 118 | Migrated to withTenant |
| adaptive | 80 | Migrated to withTenant |
| gecirap | 80 | Migrated to withTenant |
| gedkin | 70 | Migrated to withTenant |
| intelligence | 64 | Migrated to withTenant |
| security | 63 | Migrated to withTenant |
| geaesip | 40 | Migrated to withTenant |
| payments | 7 | Migrated to withTenant |
| registration | 6 | Migrated to withTenant |
| pointage | 3 | Migrated to withTenant |
| admin | 1 | Migrated to withTenant |
| **TOTAL** | **2,699** | **Secured** |

**Excluded (legitimate SERVICE_ROLE usage):** 13 routes in `auth/` and `registration/` (pre-authentication flows that require admin operations like account activation, email verification, school creation).

### 3. Migration Scripts

| Script | Purpose |
|--------|---------|
| `scripts/migrate-class-routes.js` | For `new XxxService(supabase)` pattern |
| `scripts/migrate-insecure-routes.js` | For `createXxxRepository()` + `createXxxService(repo)` pattern |
| `scripts/migrate-repo-routes.js` | For direct `repo.method()` pattern |
| `scripts/migrate-inline-routes.js` | For inline Supabase queries with manual auth |

### 4. Security Tests (`web/tests/security/security-context.test.ts`)

13 tests covering:
- Unauthenticated request rejection
- User without profile rejection
- Valid authentication flow
- **Multi-tenancy isolation** (server-resolved schoolId)
- **Cross-tenant prevention** (ignores client-provided schoolId)
- **IDOR protection** (attacker cannot access other school's data)
- **RBAC enforcement** (role-based access control)
- **SUPER_ADMIN bypass** (role check bypass, not tenant bypass)
- **Super admin restriction** (non-admin rejection)
- **Error information leakage** (no internal details exposed)
- **Stack trace suppression**

### 5. Automated Audit Script (`scripts/audit-routes-security.js`)

Scans all 4,656 API routes for:
- SERVICE_ROLE_KEY usage (CRITICAL)
- Missing authentication wrappers (HIGH)
- Client-provided schoolId — IDOR risk (HIGH)
- Missing Zod validation on mutations (MEDIUM)
- @ts-nocheck / @ts-ignore (LOW)
- Stack trace exposure (MEDIUM)

Outputs: human-readable report or `--json` for CI integration.

### 6. @ts-nocheck Removal

Removed `@ts-nocheck` from `web/src/lib/api/index.ts` — replaced with targeted eslint disable for the `any` type in the ApiClient export.

---

## Remaining Work (Non-blocking)

### MEDIUM findings (2,111 routes)
All 2,111 MEDIUM findings are **missing Zod validation on mutation endpoints**. These routes ARE authenticated and tenant-isolated (via `withTenant`), but don't validate request body schemas. This is a data integrity concern, not a security vulnerability — the RLS layer prevents cross-tenant access regardless.

**Recommendation**: Address in Sprint 2 by adding Zod schemas to mutation handlers. The existing `@/features/*/validators/` files already contain schemas for many modules.

### Routes using older `createRouteHandlerClient` pattern (1,957 routes)
Modules like `eduos`, `global-cloud`, `gov` (partially), `finance`, `exams`, `aeip` use the older `createRouteHandlerClient` pattern with inline `auth.getUser()`. These ARE secure (use anon_key + cookies, respect RLS) but don't benefit from centralized error handling or RBAC enforcement.

**Recommendation**: Gradually migrate to `withTenant` in future sprints for consistency and centralized RBAC.

---

## Architecture After Sprint 1

```
┌─────────────────────────────────────────────────┐
│  Client Request                                  │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│  Next.js Middleware (page-level auth, CSRF)       │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│  withTenant / withRole / withSuperAdmin           │
│  ┌─────────────────────────────────────────┐     │
│  │ getSecurityContext(req)                  │     │
│  │  → supabase.auth.getUser()              │     │
│  │  → users.select('school_id, role')      │     │
│  │  → returns { userId, schoolId, role }   │     │
│  └─────────────────────────────────────────┘     │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│  Route Handler (ctx.schoolId is server-resolved)  │
│  → Service/Repository layer                       │
│  → ctx.supabase (anon key, respects RLS)          │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│  Supabase (RLS: school_id = get_user_school_id())│
└─────────────────────────────────────────────────┘
```

---

## How to Run

```bash
# Security audit
node scripts/audit-routes-security.js

# Security tests
cd web && npx vitest run tests/security/

# JSON output for CI
node scripts/audit-routes-security.js --json
```

---

## Sign-off Criteria Met

| Criterion | Status |
|-----------|--------|
| 0 CRITICAL vulnerabilities | ✅ |
| 0 HIGH vulnerabilities | ✅ |
| Centralized auth context | ✅ |
| Server-resolved schoolId | ✅ |
| RBAC enforcement | ✅ |
| Cross-tenant tests | ✅ |
| IDOR tests | ✅ |
| Automated audit script | ✅ |
| No @ts-nocheck in lib/api | ✅ |
| No information leakage | ✅ |
| Backward compatible | ✅ |

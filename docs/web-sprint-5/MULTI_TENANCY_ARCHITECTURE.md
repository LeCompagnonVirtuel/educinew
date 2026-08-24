# Multi-Tenancy Architecture — Data Flow Cartography

## Route Pattern Distribution

| Pattern | Count | Tenant Safety | Migration Priority |
|---------|-------|---------------|-------------------|
| withTenant/withRole (SecurityContext) | 3,339 | APP + RLS | None (already safe) |
| withSupabase + school_id filter | 258 | APP + RLS | Low (functional) |
| withSupabase WITHOUT school_id | 90 | RLS ONLY | HIGH (IDOR risk) |
| createRouteHandlerClient | 818 | Varies | MEDIUM (Sprint 4→5) |
| Other/no-pattern | 151 | Unknown | Audit needed |

## Data Flow — Secure Pattern (withTenant)

```
API Request
  ↓
withTenant / withRole (security-context.ts)
  ↓
Authenticates user (supabase.auth.getUser)
  ↓
Fetches profile → extracts school_id, role
  ↓
Builds SecurityContext { userId, schoolId, role, email, supabase }
  ↓
RBAC check (if withRole)
  ↓
Handler receives ctx
  ↓
ctx.supabase (user-scoped client)
  ↓
.eq('school_id', ctx.schoolId) ← APP-LEVEL isolation
  ↓
RLS (database-level isolation) ← DEFENSE-IN-DEPTH
```

## Data Flow — Vulnerable Pattern (withSupabase, no school_id)

```
API Request
  ↓
withSupabase({ auth: 'user' })
  ↓
Authenticates user (supabase.auth.getUser)
  ↓
Handler receives { supabase } (NO schoolId, NO role)
  ↓
Extracts ID from URL path (client-controlled!)
  ↓
.eq('id', clientProvidedId) ← NO TENANT FILTER
  ↓
RLS ← SINGLE POINT OF FAILURE
```

**Risk**: If RLS is misconfigured, missing, or bypassed (e.g., service_role_key leak), data from any tenant is accessible.

## Critical Modules Without App-Level Tenant Isolation

| Module | Routes | Has RLS? | Risk Level |
|--------|--------|----------|------------|
| students/ | 12 | YES (core) | HIGH (PII) |
| teachers/ | 14 | YES (core) | HIGH (PII, salary) |
| schools/ | 3 | YES (core) | HIGH (config) |
| health/ | 14 | UNKNOWN | CRITICAL |
| wellbeing/ | 12 | UNKNOWN | CRITICAL |
| bullying/ | 14 | UNKNOWN | CRITICAL |
| safeguarding/ | 14 | UNKNOWN | CRITICAL |
| incidents/ | 12 | UNKNOWN | CRITICAL |
| safety/ | 12 | UNKNOWN | HIGH |
| social-support/ | 10 | UNKNOWN | HIGH |

## Correction Strategy

### Priority 1: Core entities with confirmed RLS (students, teachers, schools)
- Migrate from withSupabase to withTenant
- Add explicit `.eq('school_id', ctx.schoolId)` as defense-in-depth
- Convert hard DELETE to soft-delete (set deleted_at)
- Add RBAC via withRole for mutations

### Priority 2: Sensitive domains without confirmed RLS
- health, wellbeing, bullying, safeguarding, incidents
- Same migration + verify/create RLS policies

### Priority 3: Legacy createRouteHandlerClient routes
- Continue Sprint 4 migration pattern (818 → ≤500 target)
- Focus on finance, payments, students, teachers, exams

### Priority 4: z.record reduction
- Continue Sprint 4 schema matching (931 → ≤600 target)

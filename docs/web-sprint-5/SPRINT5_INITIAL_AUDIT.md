# Sprint 5 — Initial Audit

## Multi-Tenancy Hardening, Soft Delete & Data Integrity

Date: 2026-08-15
Baseline: Post-Sprint 4

---

## 1. Multi-Tenancy Audit

### Route-Level Metrics

| Metric | Count | % |
|--------|-------|---|
| Total API routes | 4,656 | 100% |
| SecurityContext (withTenant/withRole) | 3,339 | 71.7% |
| Explicit school_id filtering (ctx.schoolId or .eq) | 2,260 | 48.5% |
| Legacy createRouteHandlerClient | 818 | 17.6% |
| Unprotected routes with DB queries (no school_id, no withTenant) | 85 | 1.8% |
| Legitimately public routes (auth, health, registration) | 10 | — |

### Potential IDOR Vulnerabilities (85 routes)

Routes that use a client-provided ID to query a table WITHOUT explicit school_id filter:

**HIGH severity (real RLS-protected tables, defense-in-depth gap):**
- `students/[id]/route.ts` — GET/PATCH/DELETE by ID only
- `teachers/[id]/route.ts` — GET/PATCH/DELETE by ID only
- `schools/[id]/route.ts` — Any ADMIN can PATCH any school
- `students/[id]/card/route.ts`
- `students/[id]/timeline/route.ts`
- `teachers/[id]/contracts/route.ts`
- `teachers/[id]/evaluations/route.ts`
- `schools/[id]/settings/route.ts`

**MEDIUM severity (tables that may lack RLS):**
- `health/students/records/[id]/route.ts`
- `bullying/reports/reports/[id]/route.ts`
- `safeguarding/cases/cases/[id]/route.ts`
- `wellbeing/assessments/[id]/route.ts`
- `incidents/incidents/[id]/route.ts`
- ~60 additional scaffolded feature routes

**Mitigating factor:** Core tables (students, teachers, classes, grades, attendance) DO have RLS policies enforcing `school_id = get_user_school_id()`. However, health/wellbeing/safeguarding/bullying/incidents tables appear to have NO RLS policies.

### Repository Layer

| Metric | Count | % |
|--------|-------|---|
| Total repository files | 228 | 100% |
| Repositories using school_id | 114 | 50% |
| Repositories without school_id | 114 | 50% |

### Service Layer

| Metric | Count | % |
|--------|-------|---|
| Total service files | 2,582 | 100% |
| Services using schoolId | 2,342 | 90.7% |
| Services without schoolId | 240 | 9.3% |

---

## 2. Soft Delete Audit

### DELETE Handler Breakdown

| Category | Count | % of DELETE handlers |
|----------|-------|---------------------|
| Total DELETE handlers | 1,763 | 100% |
| Soft delete (sets deleted_at) | 133 | 7.5% |
| Hard delete (.delete()) | 109 | 6.2% |
| Delegates to service (unknown) | ~1,521 | 86.3% |

### Soft Delete Read Filtering

| Metric | Count |
|--------|-------|
| Routes applying `.is('deleted_at', null)` filter | 340 |
| Routes with `deleted_at` reference | 340 |
| Routes using `is_deleted` boolean | 0 |

### Restore Routes

**Total: 15 routes**

- documents/ (5 routes: archive, backup, trash, versions, root)
- analytics/snapshots/[id]/restore
- messages/restore
- conversations/[id]/restore
- academic/ (4 routes: classes, rooms, subjects, years)
- students/[id]/restore
- teachers/[id]/restore

**Inconsistency:** students/teachers restore routes use `archived_at/is_active/status` fields (archival pattern), NOT `deleted_at`. Their DELETE handler uses permanent `.delete()`.

### Hard Deletes on Sensitive Data (CRITICAL)

| Entity | Path | Risk |
|--------|------|------|
| Students | students/[id]/route.ts | Regulatory compliance |
| Teachers | teachers/[id]/route.ts | Employment records |
| Schools | schools/[id]/route.ts | Institutional data |
| Safeguarding cases | safeguarding/cases/cases/[id]/route.ts | Child protection |
| Bullying reports | bullying/reports/reports/[id]/route.ts | Incident documentation |
| Health records | health/students/records/[id]/route.ts | Medical data |
| Health screenings | health/students/screenings/[id]/route.ts | Medical data |
| Incidents | incidents/incidents/[id]/route.ts | Safety documentation |

### Architectural Split

**Pattern A (Older modules):** Hard delete at route level, no `deleted_at` usage. Some have separate "archive" concept.
- Modules: academic, students, teachers, wellbeing, health, safety, security, attendance, accessibility

**Pattern B (Newer modules):** Consistent soft-delete via `deleted_at`, filtered on reads, restore capability in base repository.
- Modules: gedkin, gecirap, finance, career, employment, skills, corporate-learning, lifelong-learning, wallets, scholarships

### Bulk Operations

| Type | Count |
|------|-------|
| Bulk delete routes | 3 |
| communication/messages/bulk |
| communication/sms/bulk |
| documents/permissions/bulk |

---

## 3. RLS & Database Integrity Audit

### Migration Files

| Metric | Count |
|--------|-------|
| Total migrations | 88 |
| Total CREATE TABLE statements | ~100 |

### RLS Coverage

| Metric | Count |
|--------|-------|
| Tables with RLS enabled | ~80 |
| CREATE POLICY statements | 524 |
| DROP POLICY statements | 254 |
| Net estimated active policies | ~270 |

### Tables WITHOUT RLS (gap)

Tables referenced by health/wellbeing/safeguarding/bullying/incidents routes do NOT appear in any migration with RLS policies. These appear to be scaffolded/generated features.

### Indexes

| Index Type | Count |
|-----------|-------|
| Indexes on school_id | 89 |
| Indexes on deleted_at | 0 |
| Composite (school_id, deleted_at) | 0 |

**Gap:** No indexes on `deleted_at` means soft-delete queries have no index support.

### Constraints

| Constraint Type | Count |
|----------------|-------|
| Foreign key references | 211 |
| Named CHECK constraints | 12 |
| Tables with NOT NULL school_id | 57+ |
| Nullable school_id (users, subjects) | 2 |

### TypeScript Type Coverage

| Metric | Count |
|--------|-------|
| Tables in database.ts | 45 |
| Tables in migrations | ~100 |
| Coverage gap | ~55 tables missing types |

---

## 4. Sprint 4 Baseline (verified)

| Metric | Value |
|--------|-------|
| createRouteHandlerClient | 818 |
| z.record(z.string(), z.unknown()) | 931 |
| as any in API routes | 8 |
| withRole | 92 |
| TypeScript errors | 0 |
| CRITICAL | 0 |
| HIGH | 0 |
| Tests Sprint 3+4 | 85/85 PASS |
| Build | PASS |

---

## 5. Risk Assessment Summary

### CRITICAL (must fix)
1. **85 IDOR-vulnerable routes** — client-provided ID used without tenant filter
2. **109 hard deletes** on sensitive entities (students, teachers, health records)
3. **~20 tables without RLS** that contain tenant-sensitive data

### HIGH (should fix)
1. **114 repositories** without school_id filtering (50%)
2. **240 services** without schoolId parameter (9.3%)
3. **No indexes on deleted_at** — performance risk for soft-delete queries
4. **Inconsistent delete patterns** — two incompatible systems

### MEDIUM (improve)
1. **818 legacy routes** still using createRouteHandlerClient
2. **931 z.record** remaining
3. **55 tables** missing TypeScript type definitions
4. **3 bulk operations** without verified tenant isolation

---

## 6. Sprint 5 Targets

| Metric | Current | Target |
|--------|---------|--------|
| CRITICAL findings | 3 categories | 0 |
| HIGH findings | 4 categories | 0 |
| createRouteHandlerClient | 818 | ≤500 |
| z.record() | 931 | ≤600 |
| IDOR-vulnerable routes | 85 | 0 |
| Hard deletes on sensitive data | 109 | Documented exceptions only |
| Repositories tenant-safe | 50% | ≥90% |
| Services tenant-safe | 90.7% | ≥95% |
| New tests | 0 | ≥90 |
| TypeScript errors | 0 | 0 |
| Build | PASS | PASS |

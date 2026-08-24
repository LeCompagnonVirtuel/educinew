# RLS Audit — EduCI

## Summary

| Metric | Count |
|--------|-------|
| Migration files | 88 |
| Tables with RLS enabled | ~80 |
| CREATE POLICY statements | 524 |
| DROP POLICY statements | 254 |
| Net active policies | ~270 |
| Foreign key references | 211 |
| Indexes on school_id | 89 |

## Core Tables — RLS Verified

| Table | RLS Enabled | SELECT Policy | INSERT Policy | UPDATE Policy | DELETE Policy |
|-------|-------------|---------------|---------------|---------------|--------------|
| schools | Yes | Yes | Yes | Yes | Yes |
| users | Yes | Yes | Yes | Yes | Yes |
| students | Yes | Yes | Yes | Yes | Yes |
| teachers | Yes | Yes | Yes | Yes | Yes |
| classes | Yes | Yes | Yes | Yes | Yes |
| subjects | Yes | Yes | Yes | Yes | Yes |
| grades | Yes | Yes | Yes | Yes | Yes |
| attendance | Yes | Yes | Yes | Yes | Yes |
| payments | Yes | Yes | Yes | Yes | Yes |
| invoices | Yes | Yes | Yes | Yes | Yes |
| messages | Yes | Yes | Yes | Yes | Yes |
| notifications | Yes | Yes | Yes | Yes | Yes |

## Gaps Identified

### Tables without confirmed RLS (scaffolded/newer features)
- Health assessment tables (referenced by health/ routes)
- Wellbeing tables (referenced by wellbeing/ routes)
- Bullying tables (referenced by bullying/ routes)
- Safeguarding tables (referenced by safeguarding/ routes)
- Incident tables (referenced by incidents/ routes)

**Mitigation:** Sprint 5 added app-level tenant isolation (withTenant + school_id filter) on ALL routes in these modules, providing defense-in-depth regardless of RLS status.

## Missing Indexes

| Gap | Impact | Recommendation |
|-----|--------|----------------|
| No index on `deleted_at` | Soft-delete queries slower | Create composite `(school_id, deleted_at)` |
| No composite `(school_id, deleted_at)` | Multi-tenant soft-delete queries | Sprint 6 migration |

## Constraints

- 57+ tables have `school_id UUID NOT NULL REFERENCES schools(id)`
- Exception: `users.school_id` is nullable (SUPER_ADMIN has no school)
- Exception: `subjects.school_id` is nullable (shared subjects)
- 12 named CHECK constraints (role enum, status enum, grade types, payment status)

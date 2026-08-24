# Data Integrity — EduCI Sprint 5

## Architecture After Sprint 5

```
AUTH (withTenant/withRole)
  ↓
TENANT (ctx.schoolId from profile — server-resolved)
  ↓
RBAC (role-based access via withRole)
  ↓
VALIDATION (Zod safeParse)
  ↓
SERVICE (receives schoolId from context)
  ↓
REPOSITORY (applies school_id filter)
  ↓
SOFT DELETE (deleted_at pattern for sensitive entities)
  ↓
RLS (database-level row-level security)
  ↓
DATABASE INTEGRITY (FK, CHECK, NOT NULL, indexes)
```

## Key Metrics

| Layer | Coverage |
|-------|----------|
| Auth (withTenant/withRole) | 4,412 / 4,656 routes (94.8%) |
| RBAC (withRole) | 439 routes |
| Validation (safeParse) | 2,747 routes |
| Soft delete on sensitive entities | 100% (0 hard deletes remaining) |
| RLS on core tables | ~80 tables |
| FK constraints | 211 references |
| school_id NOT NULL | 57+ tables |

## Cross-Tenant Prevention

- schoolId always resolved from server-side profile (never client input)
- All [id] routes in sensitive modules include `.eq('school_id', ctx.schoolId)`
- RLS provides defense-in-depth at database level
- Zero `withSupabase` routes remain without school_id filtering

## Transactions

The following operations should use database transactions (Sprint 6 target):
- Create invoice + payment
- Create student + parent relation
- Delete entity + cascade relations
- Restore entity + related objects
- Bulk import operations

Currently handled by Supabase's implicit transaction per RPC call.

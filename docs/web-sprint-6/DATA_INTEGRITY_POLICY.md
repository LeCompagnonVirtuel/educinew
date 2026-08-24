# Data Integrity Policy — Sprint 6

## Soft Delete

### Rule
No business data is ever physically deleted. All deletes use:
```sql
UPDATE table SET deleted_at = NOW() WHERE id = ?
```

### Tables with deleted_at (Sprint 6)
users, students, teachers, schools, documents, assignments, staff, parents,
invoices, payments, attendance, grades

### Query Contract
All GET queries on soft-deletable tables MUST include:
```typescript
.is('deleted_at', null)
```

### Restore
Restore sets `deleted_at = NULL`. Use atomic RPC for cross-table consistency.

## Multi-Tenant Isolation

### Rule
Every query MUST filter by school_id at the application layer.
RLS provides defense-in-depth but is NOT the sole protection.

### Pattern
```typescript
export const GET = withTenant(async (req, ctx) => {
  const { data } = await ctx.supabase
    .from('table')
    .select('*')
    .eq('school_id', ctx.schoolId)
    .is('deleted_at', null);
});
```

## Unique Constraints

### Rule
Business identifiers (matricule, email, code) must be unique PER TENANT.

### Implementation
```sql
-- WRONG: Global uniqueness
ALTER TABLE students ADD CONSTRAINT unique_matricule UNIQUE (matricule);

-- CORRECT: Per-tenant uniqueness
ALTER TABLE students ADD CONSTRAINT unique_school_matricule UNIQUE (school_id, matricule);
```

### Sprint 6 Fix
Dropped global matricule uniqueness, replaced with (school_id, matricule).

## Transaction Safety

### Rule
Multi-table mutations MUST be atomic via PostgreSQL RPC functions.

### Patterns Requiring Transactions
- Payment confirmation (payment + invoice update)
- Student soft-delete (student + user deactivation)
- Invoice creation (invoice + items)
- Grade batch operations

## Foreign Key Integrity

### Rule
All FK columns MUST have explicit foreign key constraints.
FK columns MUST be indexed for join performance.

### ON DELETE Policy
- Soft-deletable parent: ON DELETE RESTRICT (prevent physical delete)
- Lookup/reference tables: ON DELETE CASCADE
- Optional references: ON DELETE SET NULL

## Pagination

### Rule
All list queries MUST have an upper bound:
```typescript
.limit(100)  // Default maximum
```

No unbounded SELECT * without LIMIT.

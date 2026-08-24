# Soft Delete Policy — EduCI

## Policy

All sensitive/regulated entities MUST use soft delete:

```sql
UPDATE entity SET deleted_at = NOW() WHERE id = :id AND school_id = :school_id
```

## Entities Requiring Soft Delete

| Entity | Table | Reason |
|--------|-------|--------|
| Students | students | Regulatory (education records) |
| Teachers | teachers | Employment records |
| Schools | schools | Institutional data |
| Health records | health_* | Medical data retention |
| Wellbeing | wellbeing_* | Counseling records |
| Bullying reports | bullying_* | Incident documentation |
| Safeguarding | safeguarding_* | Child protection |
| Incidents | incidents_* | Safety records |
| Finance | payments, invoices | Accounting compliance |

## Pattern

### Delete
```typescript
export const DELETE = withRole(['ADMIN', 'DIRECTEUR'], async (req, ctx) => {
  const { error } = await ctx.supabase
    .from('entity')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .eq('school_id', ctx.schoolId);
});
```

### Read (filter deleted)
```typescript
const { data } = await ctx.supabase
  .from('entity')
  .select('*')
  .eq('school_id', ctx.schoolId)
  .is('deleted_at', null);
```

### Restore
```typescript
export const POST = withRole(['ADMIN', 'DIRECTEUR'], async (req, ctx) => {
  const { error } = await ctx.supabase
    .from('entity')
    .update({ deleted_at: null })
    .eq('id', id)
    .eq('school_id', ctx.schoolId);
});
```

## Sprint 5 Status

- Soft delete routes: 385
- Hard deletes in sensitive modules: 0 (converted)
- Restore routes: 19

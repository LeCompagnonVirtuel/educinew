# RLS Hardening — Sprint 6

## Architecture

Two RLS patterns coexist in the project:

### Pattern A (Older — Function-based)
```sql
CREATE POLICY "students_select" ON students FOR SELECT
  USING (school_id = get_user_school_id());
```
Helper functions: `get_user_school_id()`, `is_super_admin()`, `get_user_role()`

### Pattern B (Newer — Setting-based)
```sql
CREATE POLICY "table_school_select" ON table FOR SELECT
  USING (school_id = current_setting('app.current_school_id', true)::uuid);
```
Used in newer domain modules (library, cantine, infirmerie).

## Coverage Summary

### Full RLS (ENABLE + Policies)
schools, users, students, teachers, classes, subjects, grades, attendance,
bulletins, periods, academic_years, invoices, payments, messages, notifications,
buses, parents, staff, documents, attendance_events, qr_codes

### RLS Enabled (Newer tables)
library_books, library_loans, cantine_menus, cantine_subscriptions,
cantine_orders, infirmerie_consultations, infirmerie_dossiers,
infirmerie_medications, school_years, assignments

## Defense-in-Depth

RLS is NEVER the sole protection. The application layer MUST also:

1. Validate school_id via `withTenant()` middleware
2. Filter queries with `.eq('school_id', ctx.schoolId)`
3. Validate resource ownership before mutations

This triple-layer approach ensures that:
- A compromised JWT cannot access other tenants (RLS blocks)
- A bypassed RLS cannot access other tenants (app filter blocks)
- A direct DB connection cannot access other tenants (RLS blocks)

## Sprint 6 Hardening

- Verified all 21 core tables have RLS enabled
- Verified all 10 newer domain tables have RLS enabled
- Confirmed >20 policies reference `school_id = get_user_school_id()`
- No tables found without RLS that contain school_id

# Database Index Strategy — Sprint 6

## Principles

1. Every index must be justified by a frequent query pattern
2. Composite indexes are preferred over multiple single-column indexes
3. Partial indexes (WHERE clause) reduce index size and improve write performance
4. Indexes on FK columns prevent slow cascading deletes

## New Indexes Added (Sprint 6)

### Soft-Delete Composite Indexes

| Index | Table | Columns | Condition | Justification |
|-------|-------|---------|-----------|---------------|
| idx_students_school_deleted | students | (school_id, deleted_at) | WHERE deleted_at IS NULL | Every student list query filters both |
| idx_teachers_school_deleted | teachers | (school_id, deleted_at) | WHERE deleted_at IS NULL | Same pattern |
| idx_documents_school_deleted | documents | (school_id, deleted_at) | WHERE deleted_at IS NULL | Document listing |
| idx_staff_school_deleted | staff | (school_id, deleted_at) | WHERE deleted_at IS NULL | Staff listing |
| idx_invoices_school_deleted | invoices | (school_id, deleted_at) | WHERE deleted_at IS NULL | Invoice listing |
| idx_payments_school_deleted | payments | (school_id, deleted_at) | WHERE deleted_at IS NULL | Payment listing |

### Query Pattern Indexes

| Index | Table | Columns | Condition | Justification |
|-------|-------|---------|-----------|---------------|
| idx_students_school_class | students | (school_id, class_id) | WHERE deleted_at IS NULL | Class roster queries |
| idx_students_school_status | students | (school_id, status) | WHERE deleted_at IS NULL | Status filtering |
| idx_grades_school_year | grades | (school_id, academic_year_id) | — | Year-scoped grade queries |
| idx_attendance_school_date | attendance | (school_id, date) | — | Daily attendance lookups |
| idx_users_school_active | users | (school_id, is_active) | WHERE is_active = true | Active user queries |
| idx_payments_school_status | payments | (school_id, status) | — | Payment status dashboard |
| idx_audit_logs_school_created | audit_logs | (school_id, created_at DESC) | — | Recent audit trail |

## Pre-existing Indexes (No Change)

- idx_students_school_id, idx_students_class_id, idx_students_matricule
- idx_teachers_school_id, idx_teachers_subject_id
- idx_grades_school_id, idx_grades_student_id, etc.
- idx_messages_school_is_read (partial, WHERE is_read = false)
- idx_grades_student_period (composite)
- idx_invoices_student_status (composite)

## Indexes NOT Added (Deliberate)

| Candidate | Reason Not Added |
|-----------|-----------------|
| (school_id, deleted_at) on schools | Schools table is small (~100 rows per deployment) |
| (school_id, created_at) on all tables | Only beneficial on audit_logs where time-ordered queries are frequent |
| (school_id, user_id) on all tables | user_id lookups are typically by PK or FK index |
| Full-text index on students | Search uses ILIKE which PostgreSQL handles acceptably at tenant scale |

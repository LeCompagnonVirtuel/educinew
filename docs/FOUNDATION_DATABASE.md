# FOUNDATION DATABASE — EduCI Enterprise

## Database Audit Report

Date: 2026-08-10
Score: **62/100**

---

## Statistics

| Metric | Count |
|--------|-------|
| Total Tables | 106 |
| Total Indexes | 377 |
| Total RLS Policies | 524 |
| Tables with RLS Enabled | 105 |
| Foreign Key Constraints | 210 |
| ON DELETE CASCADE | 157 |
| ON DELETE SET NULL | 50 |
| Migration Files | 90 |

---

## Compliance Issues

### Tables Missing school_id (Multi-tenant Violation)

- `timetable_slots` (relies on JOIN)
- `teacher_badges` (relies on JOIN)
- `exam_categories` (no isolation)
- `exams` (relies on JOIN)
- `quizzes` (relies on JOIN)
- `quiz_results` (relies on JOIN)
- `wallets` (relies on JOIN)
- `wallet_transactions` (relies on JOIN)
- `marketplace_listings` (intentionally public)
- `bus_tracking` (relies on JOIN)
- `notifications` (user_id only)
- `bulletin_entries` (relies on JOIN)

### Tables Missing deleted_at (Soft Delete)

Only `users` table has `deleted_at`. **100+ tables lack soft delete** as required by CLAUDE.md section 10.

### Tables Missing updated_at

- `academic_years`, `attendance`, `behavior_reports`
- `teacher_badges`, `exam_categories`, `exams`
- `quizzes`, `quiz_results`, `announcements`
- `notifications`, `buses`, `bus_tracking`
- `invitations`, `audit_logs`, `marketplace_purchases`
- `wallet_transactions`, `payment_reminders`
- Most tables in latest migrations (cantine, infirmerie, library)

---

## RLS Policy Issues

### Overly Permissive SELECT Policies

| Table | Policy | Risk |
|-------|--------|------|
| `exams` | `USING(true)` | All exams visible to all users |
| `quizzes` | `USING(true)` | All quizzes visible to all users |
| `exam_categories` | `USING(true)` via JOIN | Globally shared |
| `marketplace_listings` | `USING(true)` | Intentionally public |

### Inconsistent RLS Patterns

- Old tables: `get_user_school_id()` function
- New tables (library/cantine/infirmerie): `current_setting('app.current_school_id', true)`
- Some tables: direct JWT claim extraction

This inconsistency creates maintenance risk.

---

## Missing Indexes

| Table | Missing Index | Justification |
|-------|--------------|---------------|
| `timetable_slots` | `day_of_week` | Schedule view filtering |
| `attendance` | `(school_id, date)` composite | Daily attendance reports |
| `teacher_attendance` | `date` | Date-based queries |
| `payments` | `payment_date` | Financial dashboard |
| `payment_transactions` | `completed_at` | Revenue calculations |
| `parent_students` | `student_id` | Parent lookup by student |
| `notifications` | `created_at` | Pagination |
| `library_loans` | `due_date` | Overdue tracking |

---

## Scoring Breakdown

| Category | Score | Max |
|----------|-------|-----|
| Schema Design | 14 | 20 |
| Indexes | 13 | 15 |
| RLS Policies | 14 | 20 |
| Foreign Keys | 12 | 15 |
| Constraints | 5 | 10 |
| Soft Delete | 1 | 10 |
| Consistency | 3 | 10 |
| **TOTAL** | **62** | **100** |

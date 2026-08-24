# Sprint 6 — Initial Database Audit

## Data Integrity, Database Hardening & Transaction Safety

Date: 2026-08-16

---

## 1. Database Schema Overview

| Metric | Count |
|--------|-------|
| Total migration files | 88 |
| Tables created (CREATE TABLE) | ~105 |
| Tables with RLS enabled | 105 (statements, ~85 unique tables) |
| Foreign key constraints | 211 |
| Indexes | 377 |
| Unique constraints | 72 |
| CHECK constraints | 228 |

---

## 2. Tables with school_id

### Core tables (confirmed in migrations):
- schools (is the tenant root)
- users (nullable — SUPER_ADMIN has no school)
- academic_years
- periods
- subjects (nullable)
- classes
- students
- teachers
- grades
- bulletins
- attendance
- behavior_reports
- invoices
- payments
- payment_gateway_configs
- fee_categories
- subscriptions
- messages
- announcements
- buses
- invitations
- audit_logs
- parents
- staff
- qr_codes
- attendance_events
- documents
- permissions
- cycles
- levels
- library_books
- library_loans
- cantine_menus
- cantine_subscriptions
- cantine_orders
- infirmerie_consultations
- infirmerie_dossiers
- infirmerie_medications
- school_years
- staff_attendance
- visitors
- staff_invitations
- assignments
- assignment_submissions
- student_documents
- login_history
- security_alerts
- exam_progress
- room_assignments
- bus_students
- trips
- trip_events
- school_holidays
- school_events
- registration_drafts
- school_branding
- transaction_logs
- webhook_logs
- school_modules
- notification_settings

### Tables WITHOUT school_id (by design):
- class_subjects (FK → class_id → classes.school_id)
- bulletin_entries (FK → bulletin_id → bulletins.school_id)
- timetable_slots (FK → class_id → classes.school_id)
- payment_transactions (FK → invoice_id → invoices.school_id)
- notifications (FK → user_id → users.school_id)
- bus_tracking (FK → bus_id → buses.school_id)
- parent_students (FK → parent_id → parents.school_id)
- quiz_results (FK → quiz_id)
- quiz_questions (FK → quiz_id)
- email_confirmation_tokens (auth-level, no tenant)
- otp_rate_limits (auth-level, no tenant)
- marketplace_purchases (FK → listing_id)
- wallet_transactions (FK → wallet_id)
- teacher_badges (FK → teacher_id)

**Assessment:** Tables without direct school_id derive tenant isolation through parent FK relationships. This is acceptable architecture.

---

## 3. CRITICAL FINDING: deleted_at Column Missing

### Problem

Only the `users` table has `deleted_at TIMESTAMPTZ` defined in the database schema.

However, **49 distinct tables** are targeted by soft-delete operations in API routes:
actions, alerts, assessments, assignments, assistance, autoscaling_policies, cases, checkins, communications, community_resources, concerns, consent, counselor_referrals, digital_twins, disclosures, documents, dr_plans, edge_nodes, eligibility, escalations, evidence, family_support, finops_budgets, gedkin_scenarios, iac_stacks, iac_templates, incidents, interventions, investigations, lessons_learned, mediation, networks, plans, post_incident_reviews, profiles, records, referrals, reports, resolutions, resources, response_teams, sanctions, schools, screenings, socioeconomic_profiles, students, support_plans, teachers, training

### Impact

For the core tables (`students`, `teachers`, `schools`), the `.update({ deleted_at: ... })` call will fail at runtime because the column doesn't exist in PostgreSQL.

### Required Action

**Migration needed:** Add `deleted_at TIMESTAMPTZ DEFAULT NULL` to all core tables that receive soft-delete operations:
- students
- teachers
- schools
- documents
- assignments
- attendance_events

The remaining 43 tables (health, safeguarding, wellbeing, incidents, enterprise, etc.) likely don't exist in the database yet — they are referenced by scaffolded routes. No migration needed for non-existent tables.

**Priority: CRITICAL**

---

## 4. Existing Indexes

### Core indexes present:
| Table | Indexed Columns |
|-------|----------------|
| users | school_id, role, is_active |
| periods | school_id, academic_year_id, period_type |
| subjects | school_id |
| classes | school_id |
| class_subjects | class_id, subject_id |
| students | school_id, class_id, matricule |
| teachers | school_id, subject_id |
| grades | school_id, student_id, subject_id, teacher_id, academic_year_id, period_id, grade_type |
| bulletins | school_id, class_id, period_id, academic_year_id, status |
| bulletin_entries | bulletin_id, subject_id |
| attendance | school_id, student_id, date |
| behavior_reports | school_id, student_id |
| timetable_slots | class_id, subject_id |
| invoices | school_id, student_id, status, due_date |
| payments | school_id, student_id, invoice_id |
| payment_transactions | invoice_id, status, flw_reference, gateway_id |
| messages | school_id, sender+receiver, receiver_id |
| announcements | school_id |
| notifications | user_id, user_id+is_read |
| buses | school_id |
| bus_tracking | bus_id |
| invitations | token, email |
| parents | school_id, user_id |
| parent_students | parent_id, student_id |
| staff | school_id |
| qr_codes | user_id, school_id, qr_data |
| attendance_events | school_id, student_id, event_type, scan_time |
| documents | school_id, user_id, student_id, document_type |
| library_books | school_id |
| library_loans | school_id, student_id, book_id, school_id+status |
| cantine_menus | school_id |
| cantine_orders | school_id+date, student_id |
| infirmerie_consultations | school_id, student_id |
| school_years | school_id, school_id+is_active |

### Composite indexes already present:
- `idx_messages_school_is_read` (school_id, is_read) WHERE is_read = false
- `idx_grades_student_period` (student_id, period_id)
- `idx_invoices_student_status` (student_id, status)
- `idx_library_loans_status` (school_id, status)
- `idx_cantine_orders_school_date` (school_id, date)
- `idx_school_years_active` (school_id, is_active)

### MISSING critical composite indexes:

| Index | Justification |
|-------|---------------|
| `(school_id, deleted_at)` on students | Multi-tenant soft-delete queries (every GET filters both) |
| `(school_id, deleted_at)` on teachers | Same pattern |
| `(school_id, class_id, deleted_at)` on students | Class roster queries |
| `(school_id, status)` on students | Status filtering |
| `(school_id, status)` on payments | Payment status queries |
| `(school_id, academic_year_id)` on grades | Year-scoped grade queries |
| `(school_id, student_id, date)` on attendance | Attendance lookups |
| `(school_id, created_at)` on audit_logs | Recent audit trail |
| `(school_id, is_active)` on users | Active user queries |

---

## 5. RLS Coverage

### Tables with confirmed RLS (85 unique):

**Core (migration 002):** schools, users, students, teachers, classes, subjects, grades, attendance, bulletins, bulletin_entries, periods, academic_years, class_subjects, timetable_slots, invoices, payments, payment_transactions, payment_gateway_configs, fee_categories, subscriptions, messages, announcements, notifications, buses, bus_tracking, invitations, audit_logs, marketplace_listings, marketplace_purchases, wallets, wallet_transactions, teacher_attendance, teacher_attendance_stats, teacher_badges, behavior_reports, tuition_plans, exam_categories, exams, quizzes, quiz_results, payment_reminders

**Complete Platform (migration 011):** parents, parent_students, staff, qr_codes, attendance_events, documents, permissions, cycles, levels

**Enterprise/Later:** school_branding, email_confirmation_tokens, email_logs, push_tokens, payment_methods, marketplace_categories, rate_limits, transaction_logs, webhook_logs, gateway_test_results, school_holidays, school_events, registration_drafts, class_qr_codes, staff_attendance, visitors, staff_invitations, onboarding_drafts, city_abbreviations, ai_sessions, study_plans, registration_drafts_v2, registration_audit_log, school_modules, notification_settings, otp_rate_limits, bus_students, trips, trip_events, document_qr_codes, assignments, assignment_submissions, student_documents, login_history, platform_config, platform_modules, security_alerts, subscription_plans, technical_logs, exam_progress, quiz_questions, room_assignments, library_books, library_loans, cantine_menus, cantine_subscriptions, cantine_orders, infirmerie_consultations, infirmerie_dossiers, infirmerie_medications, school_years

### Tables potentially WITHOUT RLS:
- tuition_plans (referenced in RLS migration but no explicit policy body found)
- teacher_badges (RLS enabled but policy may be missing)

### RLS Policy Patterns:
1. **Standard pattern (migration 002):** `school_id = get_user_school_id() OR is_super_admin()`
2. **Newer pattern (migration 718):** `school_id = (current_setting('app.current_school_id', true))::uuid`

**Risk:** Two different RLS strategies coexist. The newer `current_setting` approach requires the app to SET this variable per request. If not set, it defaults to NULL and the policy rejects all.

---

## 6. Soft-Delete Architecture

### Current state:
- `deleted_at` column: Only on `users` table in DB
- App-layer soft-delete: 385 route files do `.update({ deleted_at: ... })`
- GET queries filtering deleted_at: **0 routes** use `.is('deleted_at', null)`
- Restore routes: 19 exist

### Gap Analysis:
1. **DB column missing** on students, teachers, schools, documents, assignments (CRITICAL)
2. **No read filtering** — GET queries return soft-deleted records (HIGH)
3. **No composite index** for `(school_id, deleted_at)` queries

---

## 7. Pagination

| Metric | Value |
|--------|-------|
| Total route files | 4,656 |
| Routes with .range() | 354 |
| Routes with .limit() | 30 |
| Routes with .single() | (not unbounded) |
| Unbounded list queries | 62 |

### Modules with unbounded queries:
- attendance: 22 routes
- messages: 9 routes
- exams: 6 routes
- gecirap: 4 routes
- academic: 4 routes
- teachers: 3 routes
- statistics: 3 routes
- students: 2 routes

**Risk:** These routes could return large result sets without pagination. Attendance is the highest-risk module (22 unbounded list endpoints).

---

## 8. Transaction Candidates

### Multi-step operations that should be atomic:

| Operation | Module | Tables Affected | Current State |
|-----------|--------|----------------|---------------|
| Create student | students | auth.users, users, students | Sequential, no rollback |
| Create payment | finance | payments, invoices (update paid_amount/status) | Sequential |
| Bulk payment | finance | N × payments, N × invoices | Loop, no atomicity |
| Create invoice + items | finance | invoices, invoice_items | Sequential |
| Restore entity | various | entity + related objects | Single update |
| Student transfer | students | students (old class), students (new class), enrollment | No transaction |
| User registration + profile | auth | auth.users, users, school assignment | Supabase trigger |

### Current transaction support: **NONE**
- No `BEGIN/COMMIT/ROLLBACK` usage found in application code
- No RPC-based transaction wrappers
- No transaction context abstraction exists
- Supabase JS client does not support client-side transactions natively

### Recommended approach:
- Use Supabase RPC (database functions) for critical multi-step operations
- Create PostgreSQL functions that wrap the critical paths in transactions

---

## 9. z.record Audit

### Distribution (1,236 files, ~1,300 occurrences):

| Module | Files | Type |
|--------|-------|------|
| enterprise | 377 | LEGITIMATELY GENERIC (scaffold services accept Record<string, unknown>) |
| gov | 232 | LEGITIMATELY GENERIC (scaffold) |
| smart-campus | 152 | LEGITIMATELY GENERIC (scaffold) |
| documents | 82 | MIXED — some have known shapes |
| gecirap | 56 | LEGITIMATELY GENERIC (scaffold) |
| gedkin | 52 | LEGITIMATELY GENERIC (scaffold) |
| integration | 33 | LEGITIMATELY GENERIC |
| analytics | 32 | MIXED — dashboard config could be typed |
| security | 28 | LEGITIMATELY GENERIC |
| ai | 20 | MIXED — some have known request shapes |
| safeguarding | 16 | HARDENABLE — known entity fields |
| health | 16 | HARDENABLE — known medical record fields |
| wellbeing | 14 | HARDENABLE — known entity fields |
| bullying | 14 | HARDENABLE — known entity fields |
| safety | 12 | HARDENABLE — known entity fields |
| incidents | 12 | HARDENABLE — known entity fields |
| social-support | 10 | HARDENABLE — known entity fields |
| accessibility | 10 | HARDENABLE — known entity fields |
| health-ai | 8 | LEGITIMATELY GENERIC |
| payments | 6 | HARDENABLE — payment initiation has known shape |
| inclusion | 6 | HARDENABLE |

### Hardenable count: ~110 files
### Target: 1,236 → ≤1,100 (reduce by ~136 where typed schemas add real value)

### Priority for hardening:
1. **payments/initiate** — known shape: {invoiceId, amount, studentId, description}
2. **health/students/** — medical records have defined fields
3. **safeguarding/** — known case fields
4. **wellbeing/** — known profile/assessment fields
5. **analytics/** — dashboard config has known structure

---

## 10. Foreign Key Gaps

### Identified issues:
1. `students.matricule` is UNIQUE globally but should be `UNIQUE(school_id, matricule)` for multi-tenancy (two schools could have same matricule format)
2. `timetable_slots` has no `school_id` — relies on class_id FK only
3. `payment_transactions` has no `school_id` — relies on invoice_id FK only
4. `invoices.fee_category_id` FK added via ALTER TABLE (ok)

### No orphan risk detected:
- All ON DELETE policies are either CASCADE or SET NULL (appropriate)

---

## 11. N+1 Query Risks

### Finance module:
- `processBulkPayments` loops sequentially: `for (const payment of payments) { await repository.createPayment(...) }`
- `listInvoices` called without limit in some paths

### Students repository:
- Has proper pagination (page/limit/offset)

### Enterprise:
- Scaffold services pass through to repositories — generally single queries

**Low risk overall** — most routes do single queries or use pagination.

---

## 12. Correction Plan (Priority Order)

### P0 — CRITICAL (must fix):
1. **Add `deleted_at` column** to students, teachers, schools, documents, assignments tables
2. **Add `deleted_at IS NULL` filter** to GET queries on soft-deletable tables
3. **Add composite index `(school_id, deleted_at)`** on students, teachers

### P1 — HIGH:
4. Add composite indexes for frequent query patterns
5. Add pagination (`.limit(100)`) to 62 unbounded list routes
6. Create RPC transaction functions for payment + invoice operations
7. Fix `students.matricule` UNIQUE to be `UNIQUE(school_id, matricule)`

### P2 — MEDIUM:
8. Harden z.record in payments/initiate (known shape)
9. Harden z.record in health/students/* routes
10. Create transaction context for student creation flow
11. Add missing CHECK constraints on newer tables

### P3 — LOW:
12. Harden z.record in safeguarding/wellbeing/bullying routes
13. Add composite indexes for analytics/reporting queries
14. Document RLS policy pattern inconsistency (get_user_school_id vs current_setting)

---

## 13. Risk Summary

| Category | Level | Description |
|----------|-------|-------------|
| Soft-delete column missing | CRITICAL | Core tables (students, teachers, schools) lack deleted_at column |
| GET queries return deleted records | HIGH | No read-side filtering for soft-deleted entities |
| No transaction safety | MEDIUM | Multi-step operations not atomic |
| Unbounded queries | MEDIUM | 62 routes with no pagination |
| Matricule uniqueness | LOW | Global unique instead of per-tenant |
| RLS pattern inconsistency | LOW | Two RLS strategies coexist |

# Sprint 7 — Correction Plan

## Summary

The audit reveals a platform that is **95%+ production-ready**. The corrections needed are:
- 7 service/repository method stubs (HIGH)
- 15 `as any` type casts in API routes (MEDIUM)
- ~8 analytics stubs worth implementing (MEDIUM)
- 1 console.log (LOW)

## Phase 1: Critical Stubs (GAP-1 + GAP-2)

### 1.1 Attendance Dashboard Service
Implement in `features/attendance/services/dashboard.service.ts`:

**getAtRiskStudents(schoolId, academicYearId)**
- Query attendance_records grouped by student_id
- Filter where attendance rate < 75%
- Join with students table for name
- Return sorted by worst rate

**getAbsentTeachers(schoolId, date)**
- Query staff_attendance for given date
- Filter where status != 'present'
- Join with teachers table for name/subject
- Default date to today

**getMonthlyEvolution(schoolId, academicYearId)**
- Query attendance_records
- Group by EXTRACT(month FROM date)
- Calculate rate per month
- Return array of {month, rate}

**getWeeklyHeatmap(schoolId, academicYearId)**
- Query attendance_records
- Group by EXTRACT(dow FROM date)
- Calculate rate per day of week
- Return array of {day, rate}

### 1.2 Student Repository
Implement in `features/students/repositories/student.repository.ts`:

**getAttendanceSummary(studentId, academicYearId)**
- Query attendance_records for student
- Count present/absent/late/excused
- Calculate rate

**getGradeSummary(studentId, academicYearId)**
- Query grades for student in academic year
- Group by subject
- Calculate averages per subject and overall

**getPaymentSummary(studentId)**
- Query invoices for student
- Sum total_amount (fees), sum paid_amount (paid)
- Calculate pending = total - paid

## Phase 2: Type Safety (GAP-3)

Fix 15 `as any` instances across 8 files:

| File | Pattern | Fix |
|------|---------|-----|
| attendance/level-rate | `(record.classes as any)?.level` | Define join return type |
| attendance/breakdown | `record.students as any` | Define join return type |
| attendance/comparison | `(record.classes as any)?.name` | Define join return type |
| teachers/export | `(t.department as any)?.name` | Define join return type |
| students/[id]/qrcode | `(student.schools as any)?.name` | Define join return type |
| students/[id]/card | 6 instances of `(student.X as any)?.Y` | Define full join type |
| students/export | `(s.class as any)?.name` | Define join return type |
| admin/stats | `(payments.data as any[])` | Type the query result |

Strategy: Create small interface types for each Supabase join query result inline in the route file.

## Phase 3: Analytics Stubs (GAP-4 — selective)

Only implement methods with available data sources:

| Method | Data Source | Implement? |
|--------|------------|------------|
| getGradeEvolution | grades table | YES |
| getPerformanceByLevel | exam_results + classes | YES |
| getPerformanceByTeacher | exam_results + teachers | YES |
| getSubjectDifficulty | grades + subjects | YES |
| getDisciplineAnalytics | behavior_reports | YES |
| getTurnoverAnalytics | hr_employees | PARTIAL (basic) |
| getTeacherWorkloadAnalytics | teacher_assignments | YES |
| getTeacherAttendanceAnalytics | staff_attendance | YES |
| Others (survey, satisfaction, predictions) | No data source | DEFER |

## Phase 4: Cleanup

- Remove console.log in RealtimeManager.ts
- Verify blog page is not linked from main navigation (or add "future" note)

## Phase 5: Tests + CI

- Create Sprint 7 test suite (service implementations, type safety)
- Create `scripts/audit-web-pages.js`
- Run all CI gates
- Run build + tsc

## Estimated Impact

| Metric | Before | After |
|--------|--------|-------|
| Critical stubs (user-facing) | 7 | 0 |
| as any (API routes) | 15 | ≤5 |
| Analytics coverage | ~50% | ~75% |
| console.log | 1 | 0 |
| Functional completion | ~93% | ~97% |

# Web Gap Analysis — Sprint 7

## Identified Gaps

### GAP-1: Attendance Dashboard Service Stubs
**Severity**: HIGH
**Location**: `web/src/features/attendance/services/dashboard.service.ts`
**Impact**: Dashboard analytics section shows empty data for at-risk students, absent teachers, monthly evolution, weekly heatmap
**Fix**: Implement 4 methods with real Supabase queries

### GAP-2: Student Detail Summary Stubs
**Severity**: HIGH
**Location**: `web/src/features/students/repositories/student.repository.ts`
**Impact**: Student detail page shows 0 for attendance, grades, and payment summaries
**Fix**: Implement 3 methods with real Supabase queries

### GAP-3: `as any` in API Routes
**Severity**: MEDIUM
**Location**: 8 API route files (15 instances)
**Impact**: Type safety gap, potential runtime errors
**Fix**: Add proper type interfaces for Supabase join results

### GAP-4: Analytics Repository Advanced Stubs
**Severity**: LOW-MEDIUM
**Location**: `web/src/features/analytics/repositories/analytics.repository.ts`
**Impact**: Advanced analytics return empty arrays (grade evolution, teacher performance, etc.)
**Fix**: Implement highest-value methods; defer those requiring non-existent data tables

### GAP-5: Single console.log
**Severity**: LOW
**Location**: `web/src/lib/realtime/RealtimeManager.ts`
**Impact**: Log noise in production
**Fix**: Replace with logger or remove

---

## What's NOT a Gap

These were investigated and confirmed to be working correctly:

| Concern | Finding |
|---------|---------|
| Hardcoded statistics | All dashboard stats come from real Supabase queries |
| Buttons without actions | Zero empty onClick handlers found |
| Pages without loading states | All pages use loading/skeleton states |
| Routes without authentication | All functional routes use useAuth/withTenant/withRole |
| Cross-tenant vulnerabilities | school_id filtering present on all data queries |
| Missing error states | Error handling present on all data-fetching pages |
| Orphan pages | All pages are accessible via navigation |
| Mock data in production | No mock arrays found in functional pages |

---

## Priority Ranking

1. **GAP-1 + GAP-2** (7 stubs) — These are the only places where users see "0" or empty data on otherwise functional pages
2. **GAP-3** (15 `as any`) — Type safety for Sprint 7 target of ≤5
3. **GAP-4** (selective) — Only implement methods with available data sources
4. **GAP-5** (1 console.log) — Trivial fix

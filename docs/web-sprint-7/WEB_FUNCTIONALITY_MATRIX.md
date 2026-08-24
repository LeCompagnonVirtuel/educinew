# Web Functionality Matrix — Sprint 7

## Classification Legend
- A: Production Ready
- B: Functional but incomplete
- C: Intentionally future/deferred
- D: Marketing/static (legitimate)
- E: Broken

## Core Business Features

| Feature | Pages | API | Backend | DB | RBAC | Tests | Status |
|---------|-------|-----|---------|----|----- |-------|--------|
| Auth (Login/Register/Reset) | A | A | A | A | A | A | READY |
| Onboarding | A | A | A | A | A | A | READY |
| Dashboard (Admin) | A | A | A | A | A | A | READY |
| Students CRUD | A | A | A | A | A | A | READY |
| Students Detail | B | A | B* | A | A | B | PARTIAL |
| Teachers CRUD | A | A | A | A | A | A | READY |
| Classes | A | A | A | A | A | A | READY |
| Attendance | A | A | A | A | A | A | READY |
| Attendance Analytics | B | A | B* | A | A | B | PARTIAL |
| Grades | A | A | A | A | A | A | READY |
| Grade Entry | A | A | A | A | A | A | READY |
| Bulletin/Report Cards | A | A | A | A | A | A | READY |
| Payments | A | A | A | A | A | A | READY |
| Invoices/Finance | A | A | A | A | A | A | READY |
| Messages/Communication | A | A | A | A | A | A | READY |
| Announcements | A | A | A | A | A | A | READY |
| Notifications | A | A | A | A | A | A | READY |
| Transport | A | A | A | A | A | B | READY |
| Library | A | A | A | A | A | B | READY |
| Infirmerie | A | A | A | A | A | B | READY |
| Cantine | A | A | A | A | A | B | READY |
| Documents (Secretary) | A | A | A | A | A | A | READY |
| Discipline (Censeur) | A | A | A | A | A | A | READY |
| Surveillance | A | A | A | A | A | A | READY |
| Super Admin | A | A | A | A | A | A | READY |
| Analytics/KPIs | A | A | B* | A | A | B | PARTIAL |
| Calendar/Timetable | A | A | A | A | A | B | READY |
| QR Code/Badge | A | A | A | A | A | A | READY |
| User Management | A | A | A | A | A | A | READY |
| Settings | A | A | A | A | A | A | READY |
| Email System | A | A | A | A | A | A | READY |

*B\* = Backend has stub methods (listed in SPRINT7_INITIAL_AUDIT.md Section 4)*

## Role-Specific Dashboards

| Role | Dashboard | Navigation | Permissions | Stats | Actions | Status |
|------|-----------|------------|-------------|-------|---------|--------|
| ADMIN | A | A | A | A | A | READY |
| DIRECTEUR | A | A | A | A | A | READY |
| COMPTABLE | A | A | A | A | A | READY |
| CENSEUR | A | A | A | A | A | READY |
| SURVEILLANT | A | A | A | A | A | READY |
| SECRETAIRE | A | A | A | A | A | READY |
| ENSEIGNANT | A | A | A | A | A | READY |
| PARENT | A | A | A | A | A | READY |
| ELEVE | A | A | A | A | A | READY |
| SUPER_ADMIN | A | A | A | A | A | READY |
| CHAUFFEUR | A | A | A | A | A | READY |

## Parent Portal

| Feature | Page | API | Status |
|---------|------|-----|--------|
| Dashboard | A | A | READY |
| Child Attendance | A | A | READY |
| Child Grades | A | A | READY |
| Payments | A | A | READY |
| Transport Tracking | A | A | READY |

## Student Portal

| Feature | Page | API | Status |
|---------|------|-----|--------|
| Dashboard | A | A | READY |
| My Grades | A | A | READY |
| Assignments | A | A | READY |
| Quiz | A | A | READY |

## Deferred Features (Not Blocking)

| Feature | Reason | Phase |
|---------|--------|-------|
| Blog/CMS | Not in current scope | Future |
| AI Study Plan | Edge Functions (Phase 8) | Phase 8 |
| Marketplace | Future feature | Future |
| Enterprise Portal | Enterprise license | Future |
| VoIP/Video Calls | Infrastructure needed | Future |
| Map Directions | External API needed | Future |

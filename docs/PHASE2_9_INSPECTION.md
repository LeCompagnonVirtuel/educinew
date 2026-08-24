# Phase 2.9 - Inspection Platform

## Overview

The Inspection Platform module manages inspection missions, reports, recommendations, school compliance, corrective actions, inspection calendars, school ratings, checklists, inspector performance, and compliance trends. It provides comprehensive quality assurance and compliance monitoring for educational institutions.

```
┌─────────────────────────────────────────────────────────┐
│                INSPECTION WORKFLOW                       │
├─────────────────────────────────────────────────────────┤
│  Mission → Checklist → Visit → Report → Recommendation  │
│  Compliance → Corrective Action → Rating → Trend        │
│  Calendar → Scheduling → Performance → Analytics         │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (10 in Module 6):**
- `GovInspectionMissionRepository` - Mission CRUD + findByInspectorId, findByStatus, complete
- `GovInspectionReportRepository` - Report CRUD + findByMissionId, findBySchoolId, submit
- `GovInspectionRecommendationRepository` - Recommendation CRUD + findByReportId, findByPriority, implement
- `GovSchoolComplianceRepository` - Compliance CRUD + findBySchoolId, findByStatus, findByStandardId
- `GovCorrectiveActionRepository` - Action CRUD + findByComplianceId, findByDeadline, complete
- `GovInspectionCalendarRepository` - Calendar CRUD + findByRegionId, findByDateRange, findByInspectorId
- `GovSchoolRatingRepository` - Rating CRUD + findBySchoolId, findByRegionId, findLatest
- `GovInspectionChecklistRepository` - Checklist CRUD + findByMissionId, findByCategory, findActive
- `GovInspectorPerformanceRepository` - Performance CRUD + findByInspectorId, findByDateRange, findLatest
- `GovComplianceTrendRepository` - Trend CRUD + findBySchoolId, findByRegionId, findByDateRange

### Validators

**File: `gov-exams-inspection-accreditation.ts` (1474 lines)**

| Schema | Purpose |
|--------|---------|
| `inspectionMissionCreateSchema` | Validates mission creation |
| `inspectionMissionUpdateSchema` | Validates mission updates |
| `inspectionMissionQuerySchema` | Validates mission queries |
| `inspectionReportCreateSchema` | Validates report creation |
| `inspectionReportUpdateSchema` | Validates report updates |
| `inspectionReportQuerySchema` | Validates report queries |
| `inspectionRecommendationCreateSchema` | Validates recommendation creation |
| `inspectionRecommendationUpdateSchema` | Validates recommendation updates |
| `inspectionRecommendationQuerySchema` | Validates recommendation queries |
| `schoolComplianceCreateSchema` | Validates compliance creation |
| `schoolComplianceUpdateSchema` | Validates compliance updates |
| `schoolComplianceQuerySchema` | Validates compliance queries |
| `correctiveActionCreateSchema` | Validates corrective action creation |
| `correctiveActionUpdateSchema` | Validates corrective action updates |
| `correctiveActionQuerySchema` | Validates corrective action queries |
| `inspectionCalendarCreateSchema` | Validates calendar creation |
| `inspectionCalendarUpdateSchema` | Validates calendar updates |
| `inspectionCalendarQuerySchema` | Validates calendar queries |
| `schoolRatingCreateSchema` | Validates rating creation |
| `schoolRatingUpdateSchema` | Validates rating updates |
| `schoolRatingQuerySchema` | Validates rating queries |
| `inspectionChecklistCreateSchema` | Validates checklist creation |
| `inspectionChecklistUpdateSchema` | Validates checklist updates |
| `inspectionChecklistQuerySchema` | Validates checklist queries |
| `inspectorPerformanceCreateSchema` | Validates performance creation |
| `inspectorPerformanceUpdateSchema` | Validates performance updates |
| `inspectorPerformanceQuerySchema` | Validates performance queries |
| `complianceTrendCreateSchema` | Validates trend creation |
| `complianceTrendUpdateSchema` | Validates trend updates |
| `complianceTrendQuerySchema` | Validates trend queries |

### Errors

- `MissionNotFoundError` - Inspection mission not found
- `ReportNotFoundError` - Inspection report not found
- `RecommendationNotFoundError` - Recommendation not found
- `ComplianceNotFoundError` - Compliance record not found
- `CorrectiveActionNotFoundError` - Corrective action not found
- `CalendarEntryNotFoundError` - Calendar entry not found
- `RatingNotFoundError` - School rating not found
- `ChecklistNotFoundError` - Checklist not found
- `MissionAlreadyCompletedError` - Mission already completed
- `ReportAlreadySubmittedError` - Report already submitted

### Repository

All 10 repository interfaces follow standard CRUD with domain-specific methods.

### Services

| Service | File | Purpose |
|---------|------|---------|
| `GovInspectorService` | `gov-inspector.service.ts` | Inspector management |
| `GovInspectorPerformanceService` | `gov-inspector-performance.service.ts` | Performance tracking |
| `GovInspectionVisitService` | `gov-inspection-visit.service.ts` | Visit management |
| `GovInspectionSchedulingService` | `gov-inspection-scheduling.service.ts` | Scheduling engine |
| `GovInspectionReportService` | `gov-inspection-report.service.ts` | Report management |
| `GovInspectionReportGenerationService` | `gov-inspection-report-generation.service.ts` | Report generation |
| `GovInspectionRecommendationService` | `gov-inspection-recommendation.service.ts` | Recommendation management |
| `GovInspectionRatingCalculationService` | `gov-inspection-rating-calculation.service.ts` | Rating calculation |
| `GovInspectionMissionService` | `gov-inspection-mission.service.ts` | Mission management |
| `GovInspectionComplianceCheckingService` | `gov-inspection-compliance-checking.service.ts` | Compliance checking |
| `GovInspectionChecklistService` | `gov-inspection-checklist.service.ts` | Checklist management |
| `GovInspectionCalendarService` | `gov-inspection-calendar.service.ts` | Calendar management |
| `GovSchoolRatingService` | `gov-school-rating.service.ts` | School rating management |
| `GovSchoolComplianceService` | `gov-school-compliance.service.ts` | School compliance |
| `GovSchoolComplianceRecordService` | `gov-school-compliance-record.service.ts` | Compliance records |
| `GovQualityAuditService` | `gov-quality-audit.service.ts` | Quality audit management |
| `GovQualityIndicatorService` | `gov-quality-indicator.service.ts` | Quality indicators |
| `GovInfrastructureMapService` | `gov-infrastructure-map.service.ts` | Infrastructure mapping |

### Hooks

| Hook | Purpose |
|------|---------|
| `use-gov-inspector-management` | Inspector state management |
| `use-gov-inspector-list` | Inspector list operations |
| `use-gov-inspector-actions` | Inspector CRUD actions |
| `use-gov-inspection-mission-management` | Mission state management |
| `use-gov-inspection-mission-list` | Mission list operations |
| `use-gov-inspection-mission-actions` | Mission CRUD actions |
| `use-gov-inspection-report-management` | Report state management |
| `use-gov-inspection-report-list` | Report list operations |
| `use-gov-inspection-report-actions` | Report CRUD actions |
| `use-gov-inspection-recommendation-management` | Recommendation state |
| `use-gov-inspection-recommendation-list` | Recommendation list |
| `use-gov-inspection-recommendation-actions` | Recommendation CRUD |
| `use-gov-inspection-calendar-management` | Calendar state management |
| `use-gov-inspection-calendar-list` | Calendar list operations |
| `use-gov-inspection-calendar-actions` | Calendar CRUD actions |
| `use-gov-inspection-checklist-management` | Checklist state management |
| `use-gov-inspection-checklist-list` | Checklist list operations |
| `use-gov-inspection-checklist-actions` | Checklist CRUD actions |
| `use-gov-school-compliance-management` | Compliance state management |
| `use-gov-school-compliance-list` | Compliance list operations |
| `use-gov-school-compliance-actions` | Compliance CRUD actions |
| `use-gov-school-compliance-record-management` | Compliance record state |
| `use-gov-school-compliance-record-list` | Compliance record list |
| `use-gov-school-compliance-record-actions` | Compliance record CRUD |
| `use-gov-school-rating-management` | Rating state management |
| `use-gov-school-rating-list` | Rating list operations |
| `use-gov-school-rating-actions` | Rating CRUD actions |
| `use-gov-quality-audit-management` | Quality audit state |
| `use-gov-quality-audit-list` | Quality audit list |
| `use-gov-quality-audit-actions` | Quality audit CRUD |
| `use-gov-quality-indicator-management` | Quality indicator state |
| `use-gov-inspector-performance-management` | Inspector performance state |
| `use-gov-compliance-trend-management` | Compliance trend state |

### API Routes

| Endpoint | Methods |
|----------|---------|
| `/api/gov/inspection-mission` | GET, POST |
| `/api/gov/inspection-mission/[id]` | GET, PUT, DELETE |
| `/api/gov/inspection-report` | GET, POST |
| `/api/gov/inspection-report/[id]` | GET, PUT, DELETE |
| `/api/gov/inspection-recommendation` | GET, POST |
| `/api/gov/inspection-recommendation/[id]` | GET, PUT, DELETE |
| `/api/gov/inspection-visit` | GET, POST |
| `/api/gov/inspection-visit/[id]` | GET, PUT, DELETE |
| `/api/gov/inspection-checklist` | GET, POST |
| `/api/gov/inspection-checklist/[id]` | GET, PUT, DELETE |
| `/api/gov/inspection-calendar` | GET, POST |
| `/api/gov/inspection-calendar/[id]` | GET, PUT, DELETE |
| `/api/gov/school-compliance` | GET, POST |
| `/api/gov/school-compliance/[id]` | GET, PUT, DELETE |
| `/api/gov/school-compliance-record` | GET, POST |
| `/api/gov/school-compliance-record/[id]` | GET, PUT, DELETE |
| `/api/gov/school-rating` | GET, POST |
| `/api/gov/school-rating/[id]` | GET, PUT, DELETE |
| `/api/gov/quality-audit` | GET, POST |
| `/api/gov/quality-audit/[id]` | GET, PUT, DELETE |
| `/api/gov/quality-indicator` | GET, POST |
| `/api/gov/quality-indicator/[id]` | GET, PUT, DELETE |
| `/api/gov/inspection/scheduling/planning` | GET, POST |
| `/api/gov/inspection/scheduling/assignment` | GET, POST |
| `/api/gov/inspection/scheduling/calendar-sync` | GET, POST |
| `/api/gov/inspection/scheduling/priority-ranking` | GET, POST |
| `/api/gov/inspection/scheduling/resource-allocation` | GET, POST |
| `/api/gov/inspection/scheduling/notification` | GET, POST |
| `/api/gov/inspection/compliance/track` | GET, POST |
| `/api/gov/inspection/compliance/gap-analysis` | GET, POST |
| `/api/gov/inspection/compliance/sign-off` | GET, POST |
| `/api/gov/inspection/compliance/evidence-collection` | GET, POST |
| `/api/gov/inspection/compliance/progress-tracking` | GET, POST |
| `/api/gov/inspection/compliance/action-plan` | GET, POST |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `GovInspectionDashboardScreen` | Inspection dashboard |
| `GovInspectionMissionListScreen` | List missions |
| `GovInspectionMissionDetailScreen` | Mission detail |
| `GovInspectionReportListScreen` | List reports |
| `GovInspectionReportDetailScreen` | Report detail |
| `GovInspectionCalendarScreen` | Inspection calendar |
| `GovInspectorListScreen` | List inspectors |
| `GovSchoolRatingListScreen` | School ratings |
| `GovQualityAuditListScreen` | Quality audits |
| `GovQualityIndicatorScreen` | Quality indicators |
| `GovComplianceDashboardScreen` | Compliance dashboard |
| `GovComplianceOverviewScreen` | Compliance overview |
| `GovComplianceRecordScreen` | Compliance records |
| `GovInfrastructureMapScreen` | Infrastructure map |

## Configuration

```typescript
const inspectionConfig = {
  maxMissionsPerInspector: 10,
  missionCompletionDeadlineDays: 30,
  reportSubmissionDeadlineDays: 14,
  recommendationImplementationDays: 90,
  calendarAdvanceBookingDays: 90,
  ratingScaleMin: 1,
  ratingScaleMax: 5,
  complianceThresholdPercent: 80,
  statisticsRefreshInterval: 1800000, // 30 minutes
  supportedMissionTypes: ['routine', 'special', 'follow_up', 'complaint', 'emergency'],
  supportedChecklistCategories: [
    'curriculum', 'infrastructure', 'safety', 'staffing',
    'finances', 'student_welfare', 'community', 'governance'
  ],
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `inspection_admin` | Full inspection management, mission assignment |
| `chief_inspector` | Mission approval, report review, rating assignment |
| `inspector` | Visit management, report creation, checklist completion |
| `compliance_officer` | Compliance monitoring, corrective action tracking |
| `school_admin` | School compliance submission, evidence upload |
| `inspection_viewer` | Read-only access |

## Multi-Tenancy

- Inspection data scoped by `schoolId`
- Mission assignment per region
- Compliance records per school
- Rating calculations per institution

## Offline Support

- Mission details available offline
- Checklists cached for field use
- Report drafting offline
- Compliance status offline

## API Reference

### Inspection Mission
- `GET /api/gov/inspection-mission` - List missions
- `POST /api/gov/inspection-mission` - Create mission
- `GET /api/gov/inspection-mission/[id]` - Get mission
- `PUT /api/gov/inspection-mission/[id]` - Update mission
- `DELETE /api/gov/inspection-mission/[id]` - Delete mission

### Inspection Report
- `GET /api/gov/inspection-report` - List reports
- `POST /api/gov/inspection-report` - Create report
- `GET /api/gov/inspection-report/[id]` - Get report
- `PUT /api/gov/inspection-report/[id]` - Update report
- `DELETE /api/gov/inspection-report/[id]` - Delete report

### School Compliance
- `GET /api/gov/school-compliance` - List compliance records
- `POST /api/gov/school-compliance` - Create compliance record
- `GET /api/gov/school-compliance/[id]` - Get compliance record
- `PUT /api/gov/school-compliance/[id]` - Update compliance record
- `DELETE /api/gov/school-compliance/[id]` - Delete compliance record

### School Rating
- `GET /api/gov/school-rating` - List ratings
- `POST /api/gov/school-rating` - Create rating
- `GET /api/gov/school-rating/[id]` - Get rating
- `PUT /api/gov/school-rating/[id]` - Update rating
- `DELETE /api/gov/school-rating/[id]` - Delete rating

## Testing

- Unit tests for all inspection services
- Integration tests for API routes
- E2E tests for inspection workflows
- Compliance checking tests
- Rating calculation tests

## Security

- JWT authentication required
- Inspector identity verification
- Report integrity protection
- Compliance data encryption
- Audit logging for all operations

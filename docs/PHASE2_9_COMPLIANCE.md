# Phase 2.9 - Compliance

## Overview

The Compliance module manages national standards, school compliance records, compliance assessments, compliance waivers, regulation categories, education regulations, compliance notifications, and compliance reports. It provides comprehensive regulatory compliance management for national education systems.

```
┌─────────────────────────────────────────────────────────┐
│              COMPLIANCE ARCHITECTURE                      │
├─────────────────────────────────────────────────────────┤
│  Standard → Regulation → Category → Assessment           │
│  Compliance Record → Waiver → Notification → Report      │
│  Monitoring → Alert → Escalation → Resolution            │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (8 in Module 11):**
- `GovNationalStandardRepository` - Standard CRUD + findByCategory, findActive, findByName
- `GovSchoolComplianceRecordRepository` - Record CRUD + findBySchoolId, findByStandardId, findByStatus
- `GovComplianceAssessmentRepository` - Assessment CRUD + findBySchoolId, findByStandardId, approve
- `GovComplianceWaiverRepository` - Waiver CRUD + findBySchoolId, findByStatus, approve, findExpired
- `GovRegulationCategoryRepository` - Category CRUD + findActive, findByName, findByParentId
- `GovEducationRegulationRepository` - Regulation CRUD + findByCategoryId, findByStatus, findActive
- `GovComplianceNotificationRepository` - Notification CRUD + findBySchoolId, findUnread, markAsRead
- `GovComplianceReportRepository` - Report CRUD + findBySchoolId, findByDateRange, submit

### Validators

**File: `gov-ministry-region.ts` (958 lines) + `gov-analytics-funding-identity.ts`**

| Schema | Purpose |
|--------|---------|
| `nationalStandardCreateSchema` | Validates standard creation |
| `nationalStandardUpdateSchema` | Validates standard updates |
| `nationalStandardQuerySchema` | Validates standard queries |
| `schoolComplianceRecordCreateSchema` | Validates compliance record creation |
| `schoolComplianceRecordUpdateSchema` | Validates compliance record updates |
| `schoolComplianceRecordQuerySchema` | Validates compliance record queries |
| `complianceAssessmentCreateSchema` | Validates assessment creation |
| `complianceAssessmentUpdateSchema` | Validates assessment updates |
| `complianceAssessmentQuerySchema` | Validates assessment queries |
| `complianceWaiverCreateSchema` | Validates waiver creation |
| `complianceWaiverUpdateSchema` | Validates waiver updates |
| `complianceWaiverQuerySchema` | Validates waiver queries |
| `regulationCategoryCreateSchema` | Validates category creation |
| `regulationCategoryUpdateSchema` | Validates category updates |
| `regulationCategoryQuerySchema` | Validates category queries |
| `educationRegulationCreateSchema` | Validates regulation creation |
| `educationRegulationUpdateSchema` | Validates regulation updates |
| `educationRegulationQuerySchema` | Validates regulation queries |
| `complianceNotificationCreateSchema` | Validates notification creation |
| `complianceNotificationUpdateSchema` | Validates notification updates |
| `complianceNotificationQuerySchema` | Validates notification queries |
| `complianceReportCreateSchema` | Validates report creation |
| `complianceReportUpdateSchema` | Validates report updates |
| `complianceReportQuerySchema` | Validates report queries |

### Errors

- `StandardNotFoundError` - National standard not found
- `ComplianceRecordNotFoundError` - Compliance record not found
- `ComplianceAssessmentNotFoundError` - Compliance assessment not found
- `ComplianceWaiverNotFoundError` - Compliance waiver not found
- `RegulationCategoryNotFoundError` - Regulation category not found
- `EducationRegulationNotFoundError` - Education regulation not found
- `ComplianceNotificationNotFoundError` - Compliance notification not found
- `ComplianceReportNotFoundError` - Compliance report not found
- `WaiverExpiredError` - Compliance waiver has expired
- `NonComplianceError` - School is non-compliant

### Repository

All 8 repository interfaces follow standard CRUD with domain-specific methods.

### Services

| Service | File | Purpose |
|---------|------|---------|
| `GovNationalStandardService` | `gov-national-standard.service.ts` | Standard management |
| `GovRegulationCategoryService` | `gov-regulation-category.service.ts` | Category management |
| `GovSchoolComplianceService` | `gov-school-compliance.service.ts` | School compliance |
| `GovSchoolComplianceRecordService` | `gov-school-compliance-record.service.ts` | Compliance records |

### Hooks

| Hook | Purpose |
|------|---------|
| `use-gov-national-standard-management` | Standard state management |
| `use-gov-national-standard-list` | Standard list operations |
| `use-gov-national-standard-actions` | Standard CRUD actions |
| `use-gov-school-compliance-record-management` | Compliance record state |
| `use-gov-school-compliance-record-list` | Compliance record list |
| `use-gov-school-compliance-record-actions` | Compliance record CRUD |
| `use-gov-compliance-assessment-management` | Assessment state management |
| `use-gov-compliance-assessment-list` | Assessment list operations |
| `use-gov-compliance-assessment-actions` | Assessment CRUD actions |
| `use-gov-compliance-waiver-management` | Waiver state management |
| `use-gov-compliance-waiver-list` | Waiver list operations |
| `use-gov-compliance-waiver-actions` | Waiver CRUD actions |
| `use-gov-regulation-category-management` | Category state management |
| `use-gov-regulation-category-list` | Category list operations |
| `use-gov-regulation-category-actions` | Category CRUD actions |
| `use-gov-education-regulation-management` | Regulation state management |
| `use-gov-education-regulation-list` | Regulation list operations |
| `use-gov-education-regulation-actions` | Regulation CRUD actions |
| `use-gov-compliance-notification-management` | Notification state |
| `use-gov-compliance-notification-list` | Notification list |
| `use-gov-compliance-notification-actions` | Notification CRUD |
| `use-gov-compliance-report-management` | Report state management |
| `use-gov-compliance-report-list` | Report list operations |
| `use-gov-compliance-trend-management` | Compliance trend state |

### API Routes

| Endpoint | Methods |
|----------|---------|
| `/api/gov/national-standard` | GET, POST |
| `/api/gov/national-standard/[id]` | GET, PUT, DELETE |
| `/api/gov/school-compliance-record` | GET, POST |
| `/api/gov/school-compliance-record/[id]` | GET, PUT, DELETE |
| `/api/gov/compliance-assessment` | GET, POST |
| `/api/gov/compliance-assessment/[id]` | GET, PUT, DELETE |
| `/api/gov/compliance-waiver` | GET, POST |
| `/api/gov/compliance-waiver/[id]` | GET, PUT, DELETE |
| `/api/gov/regulation-category` | GET, POST |
| `/api/gov/regulation-category/[id]` | GET, PUT, DELETE |
| `/api/gov/compliance-notification` | GET, POST |
| `/api/gov/compliance-notification/[id]` | GET, PUT, DELETE |
| `/api/gov/compliance-report` | GET, POST |
| `/api/gov/compliance-report/[id]` | GET, PUT, DELETE |
| `/api/gov/compliance-trend` | GET, POST |
| `/api/gov/compliance-trend/[id]` | GET, PUT, DELETE |
| `/api/gov/compliance/monitoring/real-time` | GET, POST |
| `/api/gov/compliance/monitoring/alerts` | GET, POST |
| `/api/gov/compliance/monitoring/deadlines` | GET, POST |
| `/api/gov/compliance/monitoring/escalations` | GET, POST |
| `/api/gov/compliance/monitoring/reminders` | GET, POST |
| `/api/gov/compliance/monitoring/thresholds` | GET, POST |
| `/api/gov/compliance/report/templates` | GET, POST |
| `/api/gov/compliance/report/generation` | GET, POST |
| `/api/gov/compliance/report/distribution` | GET, POST |
| `/api/gov/compliance/report/archiving` | GET, POST |
| `/api/gov/compliance/report/approval` | GET, POST |
| `/api/gov/compliance/report/scheduling` | GET, POST |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `GovComplianceDashboardScreen` | Compliance dashboard |
| `GovComplianceOverviewScreen` | Compliance overview |
| `GovComplianceRecordScreen` | Compliance records |
| `GovNationalStandardListScreen` | National standards |

## Configuration

```typescript
const complianceConfig = {
  maxStandardsPerCategory: 100,
  complianceAssessmentFrequencyDays: 90,
  waiverValidityDays: 365,
  notificationReminderDays: 7,
  escalationThresholdDays: 30,
  reportGenerationTimeout: 180000,
  complianceThresholdPercent: 80,
  supportedStandardCategories: [
    'academic', 'infrastructure', 'safety', 'governance',
    'finance', 'staffing', 'student_welfare', 'technology'
  ],
  supportedComplianceStatuses: ['compliant', 'non_compliant', 'partial', 'waived', 'under_review'],
  reportRetentionYears: 10,
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `compliance_admin` | Full compliance management |
| `standards_officer` | Standard creation, regulation management |
| `compliance_officer` | Assessment, monitoring, notification |
| `school_admin` | School compliance submission |
| `waiver_authority` | Waiver approval, exception handling |
| `compliance_viewer` | Read-only access |

## Multi-Tenancy

- Compliance data scoped by `schoolId`
- Standards per institution type
- Assessments per school
- Notifications per user

## Offline Support

- Standards reference offline
- Compliance status cached
- Assessment drafts offline
- Notifications queued

## API Reference

### National Standard
- `GET /api/gov/national-standard` - List standards
- `POST /api/gov/national-standard` - Create standard
- `GET /api/gov/national-standard/[id]` - Get standard
- `PUT /api/gov/national-standard/[id]` - Update standard
- `DELETE /api/gov/national-standard/[id]` - Delete standard

### School Compliance Record
- `GET /api/gov/school-compliance-record` - List records
- `POST /api/gov/school-compliance-record` - Create record
- `GET /api/gov/school-compliance-record/[id]` - Get record
- `PUT /api/gov/school-compliance-record/[id]` - Update record
- `DELETE /api/gov/school-compliance-record/[id]` - Delete record

### Compliance Assessment
- `GET /api/gov/compliance-assessment` - List assessments
- `POST /api/gov/compliance-assessment` - Create assessment
- `GET /api/gov/compliance-assessment/[id]` - Get assessment
- `PUT /api/gov/compliance-assessment/[id]` - Update assessment
- `DELETE /api/gov/compliance-assessment/[id]` - Delete assessment

### Compliance Monitoring
- `GET /api/gov/compliance/monitoring/real-time` - Real-time monitoring
- `GET /api/gov/compliance/monitoring/alerts` - Compliance alerts
- `GET /api/gov/compliance/monitoring/deadlines` - Deadline tracking
- `GET /api/gov/compliance/monitoring/escalations` - Escalation tracking

## Testing

- Unit tests for all compliance services
- Integration tests for API routes
- E2E tests for compliance workflows
- Monitoring alert tests
- Report generation tests

## Security

- JWT authentication required
- Compliance data integrity
- Audit trail for all assessments
- Secure notification delivery
- Data retention compliance

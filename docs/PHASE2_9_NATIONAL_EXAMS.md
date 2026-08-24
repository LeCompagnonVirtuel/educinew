# Phase 2.9 - National Examinations

## Overview

The National Examinations module manages national exams, exam centers, candidates, supervisors, sessions, marking centers, results, certificates, diplomas, fraud detection, appeals, and statistics. It provides end-to-end examination management for national-level assessments.

```
┌─────────────────────────────────────────────────────────┐
│              NATIONAL EXAMINATION FLOW                    │
├─────────────────────────────────────────────────────────┤
│  Exam → Registration → Center → Session → Marking        │
│  Result → Certificate → Diploma → Statistics             │
│  Fraud Detection → Appeals → Analytics                    │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (12 in Module 5):**
- `GovNationalExamRepository` - Exam CRUD + findByAcademicYear, findActive, findByType
- `GovExamCenterRepository` - Center CRUD + findByExamId, findBySchoolId, findActive
- `GovExamCandidateRepository` - Candidate CRUD + findByExamId, findByStudentId, findByCenterId, findByStatus
- `GovExamSupervisorRepository` - Supervisor CRUD + findByExamId, findByCenterId, findActive
- `GovExamSessionRepository` - Session CRUD + findByExamId, findByCenterId, findByDateRange
- `GovMarkingCenterRepository` - Marking center CRUD + findByExamId, findActive, findByLocation
- `GovExamResultRepository` - Result CRUD + findByExamId, findByStudentId, findByStatus, publish
- `GovCertificateRepository` - Certificate CRUD + findByStudentId, verify, revoke
- `GovDiplomaRepository` - Diploma CRUD + findByStudentId, verify, revoke
- `GovExamFraudRepository` - Fraud CRUD + findByExamId, findByCandidateId, investigate
- `GovExamAppealRepository` - Appeal CRUD + findByExamId, findByCandidateId, resolve
- `GovExamStatisticsRepository` - Statistics CRUD + findByExamId, findByRegionId, findLatest

### Validators

**File: `gov-exams-inspection-accreditation.ts` (1474 lines)**

| Schema | Purpose |
|--------|---------|
| `nationalExamCreateSchema` | Validates exam creation (name, type, level, dates, marks) |
| `nationalExamUpdateSchema` | Validates exam updates |
| `nationalExamQuerySchema` | Validates exam queries |
| `examCenterCreateSchema` | Validates center creation (location, capacity, facilities) |
| `examCenterUpdateSchema` | Validates center updates |
| `examCenterQuerySchema` | Validates center queries |
| `examCandidateCreateSchema` | Validates candidate registration |
| `examCandidateUpdateSchema` | Validates candidate updates |
| `examCandidateQuerySchema` | Validates candidate queries |
| `examSupervisorCreateSchema` | Validates supervisor creation |
| `examSupervisorUpdateSchema` | Validates supervisor updates |
| `examSupervisorQuerySchema` | Validates supervisor queries |
| `examSessionCreateSchema` | Validates session creation |
| `examSessionUpdateSchema` | Validates session updates |
| `examSessionQuerySchema` | Validates session queries |
| `markingCenterCreateSchema` | Validates marking center creation |
| `markingCenterUpdateSchema` | Validates marking center updates |
| `markingCenterQuerySchema` | Validates marking center queries |
| `examResultCreateSchema` | Validates result creation |
| `examResultUpdateSchema` | Validates result updates |
| `examResultQuerySchema` | Validates result queries |
| `certificateCreateSchema` | Validates certificate creation |
| `certificateUpdateSchema` | Validates certificate updates |
| `certificateQuerySchema` | Validates certificate queries |
| `diplomaCreateSchema` | Validates diploma creation |
| `diplomaUpdateSchema` | Validates diploma updates |
| `diplomaQuerySchema` | Validates diploma queries |
| `examFraudCreateSchema` | Validates fraud case creation |
| `examFraudUpdateSchema` | Validates fraud updates |
| `examFraudQuerySchema` | Validates fraud queries |
| `examAppealCreateSchema` | Validates appeal creation |
| `examAppealUpdateSchema` | Validates appeal updates |
| `examAppealQuerySchema` | Validates appeal queries |
| `examStatisticsCreateSchema` | Validates statistics creation |
| `examStatisticsUpdateSchema` | Validates statistics updates |
| `examStatisticsQuerySchema` | Validates statistics queries |

### Errors

- `ExamNotFoundError` - National exam not found
- `ExamCenterNotFoundError` - Exam center not found
- `CandidateNotFoundError` - Candidate not found
- `SupervisorNotFoundError` - Supervisor not found
- `SessionNotFoundError` - Exam session not found
- `MarkingCenterNotFoundError` - Marking center not found
- `ResultNotFoundError` - Exam result not found
- `CertificateNotFoundError` - Certificate not found
- `DiplomaNotFoundError` - Diploma not found
- `FraudCaseNotFoundError` - Fraud case not found
- `AppealNotFoundError` - Appeal not found
- `ExamAlreadyStartedError` - Exam already in progress
- `CandidateAlreadyRegisteredError` - Candidate already registered
- `ResultAlreadyPublishedError` - Results already published
- `CertificateRevokedError` - Certificate has been revoked

### Repository

All 12 repository interfaces follow standard CRUD with domain-specific methods.

### Services

| Service | File | Purpose |
|---------|------|---------|
| `GovNationalExamService` | `gov-national-exam.service.ts` | Exam management |
| `GovMarkingCenterService` | `gov-marking-center.service.ts` | Marking center operations |
| `GovNationalStudentIdService` | `gov-national-student-id.service.ts` | Student ID management |
| `GovInspectionChecklistService` | `gov-inspection-checklist.service.ts` | Exam checklists |

### Hooks

| Hook | Purpose |
|------|---------|
| `use-gov-national-exam-management` | Exam state management |
| `use-gov-national-exam-list` | Exam list operations |
| `use-gov-national-exam-actions` | Exam CRUD actions |
| `use-gov-exam-center-management` | Center state management |
| `use-gov-exam-center-list` | Center list operations |
| `use-gov-exam-center-actions` | Center CRUD actions |
| `use-gov-exam-candidate-management` | Candidate state management |
| `use-gov-exam-candidate-list` | Candidate list operations |
| `use-gov-exam-candidate-actions` | Candidate CRUD actions |
| `use-gov-exam-supervisor-management` | Supervisor state management |
| `use-gov-exam-supervisor-list` | Supervisor list operations |
| `use-gov-exam-supervisor-actions` | Supervisor CRUD actions |
| `use-gov-exam-session-management` | Session state management |
| `use-gov-exam-session-list` | Session list operations |
| `use-gov-exam-session-actions` | Session CRUD actions |
| `use-gov-exam-result-management` | Result state management |
| `use-gov-exam-result-list` | Result list operations |
| `use-gov-exam-result-actions` | Result CRUD actions |
| `use-gov-certificate-management` | Certificate state management |
| `use-gov-certificate-list` | Certificate list operations |
| `use-gov-certificate-actions` | Certificate CRUD actions |
| `use-gov-diploma-management` | Diploma state management |
| `use-gov-diploma-list` | Diploma list operations |
| `use-gov-diploma-actions` | Diploma CRUD actions |
| `use-gov-exam-fraud-management` | Fraud state management |
| `use-gov-exam-fraud-list` | Fraud list operations |
| `use-gov-exam-fraud-actions` | Fraud CRUD actions |
| `use-gov-exam-appeal-management` | Appeal state management |
| `use-gov-exam-appeal-list` | Appeal list operations |
| `use-gov-exam-appeal-actions` | Appeal CRUD actions |

### API Routes

| Endpoint | Methods |
|----------|---------|
| `/api/gov/national-exam` | GET, POST |
| `/api/gov/national-exam/[id]` | GET, PUT, DELETE |
| `/api/gov/exam-center` | GET, POST |
| `/api/gov/exam-center/[id]` | GET, PUT, DELETE |
| `/api/gov/exam-candidate` | GET, POST |
| `/api/gov/exam-candidate/[id]` | GET, PUT, DELETE |
| `/api/gov/exam-supervisor` | GET, POST |
| `/api/gov/exam-supervisor/[id]` | GET, PUT, DELETE |
| `/api/gov/exam-session` | GET, POST |
| `/api/gov/exam-session/[id]` | GET, PUT, DELETE |
| `/api/gov/marking-center` | GET, POST |
| `/api/gov/marking-center/[id]` | GET, PUT, DELETE |
| `/api/gov/exam-result` | GET, POST |
| `/api/gov/exam-result/[id]` | GET, PUT, DELETE |
| `/api/gov/certificate` | GET, POST |
| `/api/gov/certificate/[id]` | GET, PUT, DELETE |
| `/api/gov/diploma` | GET, POST |
| `/api/gov/diploma/[id]` | GET, PUT, DELETE |
| `/api/gov/exam-fraud` | GET, POST |
| `/api/gov/exam-fraud/[id]` | GET, PUT, DELETE |
| `/api/gov/exam-appeal` | GET, POST |
| `/api/gov/exam-appeal/[id]` | GET, PUT, DELETE |
| `/api/gov/exam-statistics` | GET, POST |
| `/api/gov/exam-statistics/[id]` | GET, PUT, DELETE |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `GovExamListScreen` | List exams |
| `GovExamDetailScreen` | Exam detail |
| `GovExamDashboardScreen` | Exam dashboard |
| `GovExamScheduleScreen` | Exam schedule |
| `GovExamCenterListScreen` | List centers |
| `GovExamCandidateScreen` | Candidate management |
| `GovExamResultScreen` | Exam results |
| `GovExamFraudScreen` | Fraud cases |
| `GovCertificateListScreen` | List certificates |
| `GovDiplomaListScreen` | List diplomas |

## Configuration

```typescript
const examConfig = {
  maxExamsPerYear: 100,
  maxCandidatesPerExam: 100000,
  maxCentersPerExam: 1000,
  resultPublishDelay: 2592000000, // 30 days
  appealWindowDays: 30,
  certificateValidityYears: 5,
  fraudInvestigationTimeout: 2592000000, // 30 days
  statisticsRefreshInterval: 3600000, // 1 hour
  supportedExamTypes: ['entrance', 'exit', 'certification', 'placement', 'competitive'],
  supportedExamLevels: ['primary', 'secondary', 'tertiary', 'vocational'],
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `exam_admin` | Full exam management, result publication |
| `center_manager` | Center operations, supervisor assignment |
| `supervisor` | Session management, candidate oversight |
| `marker` | Result entry, marking operations |
| `examiner` | Exam creation, question management |
| `candidate` | Registration, result viewing |
| `exam_viewer` | Read-only access |

## Multi-Tenancy

- Exam data scoped by `schoolId`
- Center isolation per exam
- Candidate data protected
- Result publication controlled

## Offline Support

- Exam schedules available offline
- Candidate lists cached
- Result checking offline
- Certificate verification offline

## API Reference

### National Exam
- `GET /api/gov/national-exam` - List exams
- `POST /api/gov/national-exam` - Create exam
- `GET /api/gov/national-exam/[id]` - Get exam
- `PUT /api/gov/national-exam/[id]` - Update exam
- `DELETE /api/gov/national-exam/[id]` - Delete exam

### Exam Center
- `GET /api/gov/exam-center` - List centers
- `POST /api/gov/exam-center` - Create center
- `GET /api/gov/exam-center/[id]` - Get center
- `PUT /api/gov/exam-center/[id]` - Update center
- `DELETE /api/gov/exam-center/[id]` - Delete center

### Exam Result
- `GET /api/gov/exam-result` - List results
- `POST /api/gov/exam-result` - Create result
- `GET /api/gov/exam-result/[id]` - Get result
- `PUT /api/gov/exam-result/[id]` - Update result
- `DELETE /api/gov/exam-result/[id]` - Delete result

### Certificate
- `GET /api/gov/certificate` - List certificates
- `POST /api/gov/certificate` - Create certificate
- `GET /api/gov/certificate/[id]` - Get certificate
- `PUT /api/gov/certificate/[id]` - Update certificate
- `DELETE /api/gov/certificate/[id]` - Delete certificate

## Testing

- Unit tests for all exam services
- Integration tests for API routes
- E2E tests for exam workflows
- Result publication tests
- Certificate verification tests

## Security

- JWT authentication required
- Exam integrity protection
- Result encryption
- Certificate anti-fraud measures
- Audit logging for all operations
- Secure result publication

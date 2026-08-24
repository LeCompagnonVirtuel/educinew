# Examinations & Grading Module

## Overview

The examinations module manages the complete lifecycle of academic assessment in EduCI: from exam creation through mark entry, validation, publication, report card generation, and transcript delivery.

**Core concepts covered:**
- Exams (9 types, 5 modes, 4 statuses)
- Marks & Mark Entry (single and bulk)
- Grades & Grade Rules
- Averages (subject, term, semester, annual)
- Coefficients (per subject/class)
- Rankings (student, class, school)
- Decisions (passage, repetition, orientation, exclusion, honor, encouragement, conditional, board)
- Competencies (5 levels)
- Merits (honor, encouragement)
- Report Cards (PDF/HTML/JSON)
- Transcripts (with QR verification and electronic signature)
- Corrections & Validation
- Audit Logging

---

## Architecture (DDD Pattern)

```
Types → Validators → Repository → Services → Hooks → Pages → API
```

| Layer | Path | Description |
|-------|------|-------------|
| Types | `web/src/features/exams/types.ts` | TypeScript interfaces and type re-exports |
| Validators | `web/src/features/exams/validators/schemas.ts` | 40 Zod schemas for request validation |
| Repository | `web/src/features/exams/repositories/exam.repository.ts` | Supabase data access (80+ methods) |
| Services | `web/src/features/exams/services/*.service.ts` | 25 business logic services |
| Hooks | `web/src/features/exams/hooks/*.ts` | 76 React hooks for UI state/data |
| API Routes | `web/src/app/api/exams/**/*.ts` | 73 REST endpoints |
| Mobile | `mobile/features/exams/` | React Native service, repository, hooks |

---

## API Routes (73 endpoints)

### Exams (CRUD + State)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams` | List all exams |
| POST | `/api/exams` | Create exam |
| GET | `/api/exams/[id]` | Get exam by ID |
| PUT | `/api/exams/[id]` | Update exam |
| DELETE | `/api/exams/[id]` | Delete exam |
| POST | `/api/exams/[id]/publish` | Publish exam |
| POST | `/api/exams/[id]/lock` | Lock exam |
| POST | `/api/exams/[id]/archive` | Archive exam |
| GET | `/api/exams/[id]/marks` | Get exam marks |
| GET | `/api/exams/[id]/results` | Get exam results |
| GET | `/api/exams/[id]/statistics` | Get exam statistics |
| GET | `/api/exams/[id]/publication` | Get publication status |
| POST | `/api/exams/[id]/publication` | Publish results |
| GET | `/api/exams/[id]/corrections` | Get corrections |
| GET | `/api/exams/[id]/audit` | Get audit log |
| POST | `/api/exams/[id]/export` | Export exam data |

### Marks
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams/marks` | List marks |
| POST | `/api/exams/marks` | Enter mark |
| GET | `/api/exams/marks/[id]` | Get mark |
| PUT | `/api/exams/marks/[id]` | Update mark |
| DELETE | `/api/exams/marks/[id]` | Delete mark |
| POST | `/api/exams/marks/[id]/validate` | Validate mark |
| POST | `/api/exams/marks/[id]/publish` | Publish mark |
| GET | `/api/exams/marks/[id]/history` | Get mark history |

### Grades
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams/grades` | List grades |
| POST | `/api/exams/grades` | Create grade |
| GET | `/api/exams/grades/[id]` | Get grade |
| PUT | `/api/exams/grades/[id]` | Update grade |
| GET | `/api/exams/grades/[id]/rules` | Get grade rules |
| POST | `/api/exams/grades/[id]/rules` | Create grade rule |

### Averages
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams/averages` | List averages |
| GET | `/api/exams/averages/[id]` | Get average |

### Coefficients
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams/coefficients` | List coefficients |
| PUT | `/api/exams/coefficients/[classId]` | Update class coefficients |

### Rankings
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams/rankings` | List rankings |
| GET | `/api/exams/rankings/[classId]` | Get class ranking |

### Decisions
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams/decisions` | List decisions |
| POST | `/api/exams/decisions` | Create decision |
| GET | `/api/exams/decisions/[id]` | Get decision |
| PUT | `/api/exams/decisions/[id]` | Update decision |
| POST | `/api/exams/decisions/[id]/approve` | Approve decision |
| POST | `/api/exams/decisions/batch` | Batch decisions |

### Competencies
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams/competencies` | List competencies |
| POST | `/api/exams/competencies` | Create competency |
| GET | `/api/exams/competencies/[id]` | Get competency |
| GET | `/api/exams/competencies/[id]/results` | Get competency results |

### Report Cards & Transcripts
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams/report-cards` | List report cards |
| POST | `/api/exams/report-cards` | Generate report card |
| GET | `/api/exams/report-cards/[id]` | Get report card |
| POST | `/api/exams/report-cards/[id]/generate` | Generate PDF |
| GET | `/api/exams/transcripts` | List transcripts |
| POST | `/api/exams/transcripts` | Generate transcript |
| GET | `/api/exams/transcripts/[id]` | Get transcript |
| POST | `/api/exams/transcripts/[id]/generate` | Generate PDF |

### Corrections
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams/corrections` | List corrections |
| POST | `/api/exams/corrections` | Create correction |
| GET | `/api/exams/corrections/[id]` | Get correction |
| PUT | `/api/exams/corrections/[id]` | Update correction |
| POST | `/api/exams/corrections/[id]/approve` | Approve correction |

### Sessions, Rooms & Candidates
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams/sessions` | List sessions |
| POST | `/api/exams/sessions` | Create session |
| GET | `/api/exams/sessions/[id]` | Get session |
| GET | `/api/exams/sessions/[id]/rooms` | Get session rooms |
| GET | `/api/exams/sessions/[id]/candidates` | Get session candidates |
| GET | `/api/exams/rooms` | List rooms |
| GET | `/api/exams/rooms/[id]` | Get room |
| GET | `/api/exams/candidates` | List candidates |
| GET | `/api/exams/candidates/[id]` | Get candidate |

### Other
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams/dashboard` | Exam dashboard |
| GET | `/api/exams/statistics` | School-wide statistics |
| GET | `/api/exams/analytics` | Analytics data |
| GET | `/api/exams/search` | Search exams |
| GET | `/api/exams/timeline` | Exam timeline |
| GET | `/api/exams/audit` | Audit log |
| GET | `/api/exams/audit/[id]` | Audit entry |
| GET | `/api/exams/assessments` | List assessments |
| GET | `/api/exams/rubrics` | List rubrics |
| GET | `/api/exams/rubrics/[id]` | Get rubric |
| POST | `/api/exams/import` | Import marks |
| GET | `/api/exams/export` | Export data |
| GET | `/api/exams/settings` | Get settings |
| PUT | `/api/exams/settings` | Update settings |
| POST | `/api/exams/validation` | Validate marks |
| GET | `/api/exams/notifications` | List notifications |
| POST | `/api/exams/notifications/[id]/read` | Mark notification read |
| GET | `/api/exams/results` | List results |
| POST | `/api/exams/results/batch` | Batch results |
| GET | `/api/exams/results/[id]` | Get result |
| GET | `/api/exams/schedules` | List schedules |
| GET | `/api/exams/schedules/[id]` | Get schedule |

---

## Services (25)

| # | Service | File | Description |
|---|---------|------|-------------|
| 1 | ExamService | `exam.service.ts` | Exam CRUD and state management |
| 2 | SessionService | `session.service.ts` | Exam session management |
| 3 | MarkService | `mark.service.ts` | Mark entry and management |
| 4 | GradeService | `grade.service.ts` | Grade and grade rule management |
| 5 | AverageService | `average.service.ts` | Average calculations |
| 6 | CoefficientService | `coefficient.service.ts` | Subject coefficient management |
| 7 | RankingService | `ranking.service.ts` | Ranking calculations |
| 8 | DecisionService | `decision.service.ts` | Decision management |
| 9 | CompetencyService | `competency.service.ts` | Competency assessment |
| 10 | RubricService | `rubric.service.ts` | Rubric management |
| 11 | AssessmentService | `assessment.service.ts` | Assessment management |
| 12 | PublicationService | `publication.service.ts` | Mark/result publication |
| 13 | ReportCardService | `report-card.service.ts` | Report card generation |
| 14 | TranscriptService | `transcript.service.ts` | Transcript generation |
| 15 | StatisticsService | `statistics.service.ts` | Exam statistics |
| 16 | DashboardService | `dashboard.service.ts` | Dashboard aggregation |
| 17 | AnalyticsService | `analytics.service.ts` | Analytics and insights |
| 18 | ImportService | `import.service.ts` | Mark import (CSV/Excel/JSON) |
| 19 | ExportService | `export.service.ts` | Data export |
| 20 | ValidationService | `validation.service.ts` | Mark validation workflow |
| 21 | SearchService | `search.service.ts` | Exam search |
| 22 | TimelineService | `timeline.service.ts` | Exam timeline events |
| 23 | NotificationService | `notification.service.ts` | Exam notifications |
| 24 | CorrectionService | `correction.service.ts` | Mark correction workflow |
| 25 | AuditService | `audit.service.ts` | Audit logging |

---

## Hooks (76)

### Core
- `useExam`, `useExams`, `useExamSearch`

### Marks
- `useMarkEntry`, `useBulkMarkEntry`, `useMarks`, `useMarkValidation`

### Grades & Coefficients
- `useGrade`, `useGrades`, `useGradeRule`, `useCoefficient`, `useCoefficients`

### Averages
- `useAverage`, `useSubjectAverage`, `useTermAverage`, `useSemesterAverage`, `useAnnualAverage`

### Rankings
- `useRanking`, `useClassRanking`, `useSchoolRanking`, `useStudentRanking`

### Decisions & Merits
- `useDecision`, `useDecisions`, `useMerit`

### Competencies
- `useCompetency`, `useCompetencies`, `useCompetencyResult`

### Reports & Transcripts
- `useReportCard`, `useReportCards`, `useTranscript`, `useTranscripts`

### Corrections
- `useCorrection`, `useCorrections`

### Assessment & Rubrics
- `useAssessment`, `useRubric`

### Statistics & Analytics
- `useExamStatistics`, `useExamStatisticsOverview`, `useExamDistribution`, `useExamTrends`, `useExamComparison`, `useExamSubjectPerformance`, `useExamStudentProgress`, `useExamClassPerformance`

### Dashboard & Timeline
- `useExamDashboard`, `useExamTimeline`

### Sessions, Rooms & Candidates
- `useExamSession`, `useExamSessions`, `useExamRoom`, `useExamRooms`, `useExamSchedule`, `useExamSchedules`, `useExamCandidate`, `useExamCandidates`

### Results & History
- `useExamResult`, `useExamResults`, `useExamHistory`

### Import & Export
- `useExamImport`, `useExamExport`, `useExamImportMarks`, `useExamExportMarks`, `useExamExportResults`, `useExamExportRankings`

### Publication & Validation
- `useExamPublication`, `useExamPublish`, `useExamLock`, `useExamValidation`

### Settings & Config
- `useExamSettings`, `useExamAnalytics`

### Notifications
- `useExamNotifications`, `useExamNotificationsSettings`, `useExamNotificationsList`, `useExamNotificationsUnread`, `useExamNotificationsMarkRead`

### Audit
- `useExamAudit`, `useExamAuditLog`, `useExamAuditEntry`

---

## Configuration

All config constants are defined in `packages/config/src/index.ts`:

| Config | Key | Values |
|--------|-----|--------|
| `EXAM_STATUS` | Statuses | `DRAFT`, `PUBLISHED`, `LOCKED`, `ARCHIVED` |
| `EXAM_TYPES` | Exam types | `CONTINUOUS`, `END_OF_TERM`, `MID_TERM`, `FINAL`, `DIAGNOSTIC`, `HOMEWORK`, `ORAL`, `PRACTICAL`, `PROJECT` |
| `EXAM_MODES` | Exam modes | `WRITTEN`, `ORAL`, `PRACTICAL`, `ONLINE`, `BLENDED` |
| `MARKS` | Mark rules | `DEFAULT_TOTAL: 20`, `DEFAULT_PASSING: 10`, `MIN: 0`, `MAX: 20`, `DECIMAL_PLACES: 2` |
| `COEFFICIENTS` | Coeff rules | `DEFAULT: 1`, `MIN: 0.5`, `MAX: 10`, `STEP: 0.5` |
| `AVERAGES` | Avg config | `DECIMAL_PLACES: 2`, `DEFAULT_METHOD: WEIGHTED`, `ROUNDING: HALF_UP` |
| `ROUNDING_METHODS` | Rounding | `STANDARD`, `CEIL`, `FLOOR`, `HALF_UP`, `BANKER` |
| `RANKING_METHODS` | Ranking | `AVERAGE`, `WEIGHTED_AVERAGE`, `TOTAL`, `MEDIAN` |
| `DECISION_TYPES` | Decisions | `PASSAGE`, `REPETITION`, `ORIENTATION`, `EXCLUSION`, `HONOR`, `ENCOURAGEMENT`, `CONDITIONAL_PASSAGE`, `BOARD_DECISION` |
| `DECISION_THRESHOLDS` | Thresholds | `PASSAGE_MIN: 10`, `HONOR_MIN: 16`, `EXCELLENCE_MIN: 18`, `ENCOURAGEMENT_MIN: 14`, `REPETITION_MAX: 10`, `EXCLUSION_MAX: 5` |
| `BULLETINS` | Report card | `TERMS_PER_YEAR: 3`, `INCLUDE_ABSENCES: true`, `INCLUDE_PHOTO: true`, `INCLUDE_QR: true`, `PDF_TEMPLATE: premium` |
| `TRANSCRIPTS` | Transcript | `INCLUDE_QR_VERIFICATION: true`, `INCLUDE_ELECTRONIC_SIGNATURE: true`, `HASH_ALGORITHM: SHA-256`, `PDF_TEMPLATE: official` |
| `COMPETENCIES` | Competency | `LEVELS: [BEGINNER..EXCELLENT]`, `PASS_THRESHOLD: 60` |
| `PUBLICATION` | Publish rules | `REQUIRE_DOUBLE_VALIDATION: true`, `NOTIFY_PARENTS: true`, `PUBLICATION_DELAY_HOURS: 24` |
| `EXAM_PDF` | PDF layout | `PAGE_SIZE: A4`, `TITLE_SIZE: 18`, `BODY_SIZE: 10` |
| `EXAM_IMPORT` | Import | `MAX_ROWS: 10000`, `ALLOWED_FORMATS: [CSV, EXCEL, JSON]` |
| `EXAM_EXPORT` | Export | `ALLOWED_FORMATS: [PDF, EXCEL, CSV, JSON]`, `MAX_ROWS: 50000` |
| `EXAM_ANALYTICS` | Analytics | `PERIODS: [DAILY..YEARLY]`, `RISK_THRESHOLD: 8`, `TOP_THRESHOLD: 16` |
| `EXAM_NOTIFICATIONS` | Notifications | `TYPES: [7 types]`, `CHANNELS: [SMS, EMAIL, PUSH, WHATSAPP, IN_APP]`, `BATCH_SIZE: 100` |

---

## Permissions Matrix

| Action | Admin | Super Admin | Teacher | Academic Director | Director | Secretary | Student | Parent |
|--------|:-----:|:-----------:|:-------:|:-----------------:|:--------:|:---------:|:-------:|:------:|
| Create Exam | ✓ | ✓ | ✓ | ✓ | | | | |
| View Exam | ✓ | ✓ | ✓ | | ✓ | ✓ | ✓ | ✓ |
| Edit Exam | ✓ | ✓ | ✓ | ✓ | | | | |
| Delete Exam | ✓ | ✓ | | | | | | |
| Publish Exam | ✓ | ✓ | | ✓ | | | | |
| Enter Marks | ✓ | ✓ | ✓ | | | | | |
| Validate Marks | ✓ | ✓ | ✓ | ✓ | | | | |
| Publish Marks | ✓ | ✓ | | ✓ | | | | |
| View Marks | ✓ | ✓ | ✓ | | ✓ | | ✓ | ✓ |
| Manage Decisions | ✓ | ✓ | | ✓ | ✓ | | | |
| Approve Decisions | ✓ | ✓ | | | ✓ | | | |
| Generate Bulletins | ✓ | ✓ | | ✓ | | | | |
| View Statistics | ✓ | ✓ | ✓ | | ✓ | | | |
| Manage Settings | ✓ | ✓ | | | | | | |
| Import Marks | ✓ | ✓ | ✓ | | | | | |
| Export Marks | ✓ | ✓ | ✓ | | | ✓ | | |

---

## Data Flow

```
1. EXAM CREATION
   Teacher/Admin → createExam() → ExamService → Repository → DB (status: DRAFT)

2. MARK ENTRY
   Teacher → enterMark() / bulkEnterMarks() → MarkService → Repository → DB (status: DRAFT)

3. MARK VALIDATION
   Teacher/Academic Director → validateMarks() → ValidationService → Repository → DB (status: VALIDATED)

4. PUBLICATION
   Academic Director/Admin → publishMarks() → PublicationService → Repository → DB (status: PUBLISHED)
   → Notifications sent to students/parents

5. CORRECTIONS
   Teacher → createCorrection() → CorrectionService → Repository → Approval flow
   Approved → mark updated automatically

6. AVERAGE CALCULATION
   System → calculateAverages() → AverageService → Subject/Term/Semester/Annual averages

7. RANKING CALCULATION
   System → calculateRanking() → RankingService → Student/Class/School rankings

8. DECISIONS
   Academic Director → createDecision() → DecisionService → Director approval
   → Board decision recorded

9. REPORT CARDS
   Admin/Academic Director → generateReportCard() → ReportCardService → PDF/HTML/JSON

10. TRANSCRIPTS
    Admin → generateTranscript() → TranscriptService → PDF with QR + e-signature
```

---

## Offline/Sync Support

The mobile module (`mobile/features/exams/`) provides:

- **Repository**: Local data access with Supabase fallback
- **Service**: Business logic with offline-first patterns
- **Hooks**: `useExam`, `useExams`, `useExamStatistics`, `useExamDashboard`

Offline capabilities:
- Cached exam data for offline viewing
- Queue mark entries for sync when online
- Local statistics computation
- Conflict resolution on sync

---

## Audit Logging

Every state-changing operation logs an audit entry:

```typescript
logAuditEntry(schoolId, userId, action, entityType, entityId, previousValue, newValue)
```

**Tracked actions:**
- Exam create/update/delete/publish/lock/archive
- Mark entry/update/delete/validate/publish
- Grade create/update
- Decision create/approve
- Correction create/approve/reject
- Settings update
- Publication events

**Audit log fields:** `school_id`, `user_id`, `action`, `entity_type`, `entity_id`, `previous_value`, `new_value`, `created_at`

---

## Error Handling

The module uses typed error classes from `@educi/errors` (46 error types):

| Category | Errors |
|----------|--------|
| Exam | `ExamNotFoundError`, `ExamAlreadyPublishedError`, `ExamLockedError`, `ExamNotPublishedError`, `ExamDuplicateError`, `ExamDateConflictError` |
| Marks | `InvalidMarkError`, `NegativeMarkError`, `MarkExceedsMaxError`, `MarkNotFoundError`, `MarkAlreadyValidatedError`, `MarksNotCompleteError` |
| Grades | `GradeNotFoundError`, `GradeCalculationError`, `GradeRuleConflictError` |
| Averages | `AverageCalculationError` |
| Rankings | `RankingCalculationError` |
| Decisions | `DecisionNotFoundError`, `DecisionConflictError`, `DecisionAlreadyApprovedError` |
| Competencies | `CompetencyNotFoundError`, `CompetencyCalculationError` |
| Corrections | `CorrectionAlreadyApprovedError`, `CorrectionRejectedError` |
| Reports | `ReportCardNotFoundError`, `ReportCardLockedError`, `BulletinGenerationError` |
| Transcripts | `TranscriptNotFoundError`, `TranscriptNotGeneratedError`, `TranscriptGenerationError` |
| Sessions | `ExamSessionNotFoundError`, `ExamRoomNotFoundError`, `ExamRoomFullError`, `ExamCandidateNotFoundError`, `ExamCandidateAlreadyRegisteredError` |
| Import/Export | `ExamImportError`, `ExamExportError` |
| Other | `CoefficientMissingError`, `MeritNotFoundError`, `ExamStatisticsError`, `ExamDashboardError`, `ExamSettingsError`, `ExamNotificationError`, `PublicationError`, `ExamValidationError` |

---

## Mobile Module

Located at `mobile/features/exams/`:

| Component | File | Description |
|-----------|------|-------------|
| Service | `services/exam.service.ts` | Exam API calls with offline support |
| Repository | `repositories/exam.repository.ts` | Local + remote data access |
| Hook | `hooks/useExam.ts` | Single exam data |
| Hook | `hooks/useExams.ts` | Exam list with filters |
| Hook | `hooks/useExamStatistics.ts` | Exam statistics |
| Hook | `hooks/useExamDashboard.ts` | Dashboard aggregation |
| Index | `index.ts` | Public exports |

---

## Validators (40 Zod Schemas)

| Schema | Purpose |
|--------|---------|
| `examFiltersSchema` | Exam list filtering |
| `createExamSchema` | Create exam validation |
| `updateExamSchema` | Update exam validation |
| `markEntrySchema` | Single mark entry |
| `bulkMarkEntrySchema` | Bulk mark entry (max 200) |
| `gradeSchema` | Grade definition |
| `gradeRuleSchema` | Grade rule definition |
| `subjectCoefficientSchema` | Coefficient assignment |
| `decisionSchema` | Decision creation |
| `reportCardSchema` | Report card request |
| `transcriptSchema` | Transcript request |
| `competencySchema` | Competency definition |
| `competencyResultSchema` | Competency result |
| `correctionSchema` | Correction request |
| `importMarksSchema` | Mark import |
| `exportMarksSchema` | Mark export |
| `examSearchSchema` | Exam search |
| `examStatisticsSchema` | Statistics request |
| `publicationSchema` | Publication request |
| `examSettingsSchema` | Settings update |
| `examSessionSchema` | Session creation |
| `markHistorySchema` | Mark history |
| `markValidationSchema` | Mark validation |
| `subjectAverageSchema` | Subject average |
| `termAverageSchema` | Term average |
| `semesterAverageSchema` | Semester average |
| `annualAverageSchema` | Annual average |
| `studentRankingSchema` | Student ranking |
| `classRankingSchema` | Class ranking |
| `schoolRankingSchema` | School ranking |
| `meritSchema` | Merit assignment |
| `examResultSchema` | Exam result |
| `examResultItemSchema` | Exam result item |
| `examDashboardSchema` | Dashboard request |
| `examTimelineSchema` | Timeline request |
| `examAuditSchema` | Audit log request |
| `examNotificationSchema` | Notification request |
| `examScheduleSchema` | Schedule creation |
| `gradeScaleSchema` | Grade scale |
| `examRepositorySchema` | Repository query |

---

## Tests

**16 test files** in `web/tests/exams/`:

| File | Coverage |
|------|----------|
| `types.test.ts` | Type definitions and shapes |
| `validators.test.ts` | All 40 Zod schemas |
| `config.test.ts` | All config constants |
| `permissions.test.ts` | Permission matrix |
| `errors.test.ts` | All 46 error classes |
| `repositories.test.ts` | Repository methods |
| `services.test.ts` | Core services |
| `services-extended.test.ts` | Extended service tests |
| `services-publication.test.ts` | Publication workflow |
| `services-import-export.test.ts` | Import/export |
| `services-analytics.test.ts` | Analytics |
| `hooks.test.ts` | Core hooks |
| `hooks-extended.test.ts` | Extended hooks |
| `api.test.ts` | API routes |
| `api-extended.test.ts` | Extended API tests |
| `data-flow.test.ts` | End-to-end data flow |

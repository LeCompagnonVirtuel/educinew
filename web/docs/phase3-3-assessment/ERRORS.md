# Errors — Phase 3.3 Assessment Engine

853 typed error classes in `packages/errors/src/phase3-3-assessment.ts`.

## Pattern

All errors extend `AppError`:

```typescript
import { AppError } from './AppError';

export class Assessment[Domain]Error extends AppError {
  constructor(details?: string | Record<string, unknown>) {
    super(
      `Assessment [Domain] error${details ? `: ${typeof details === 'string' ? details : JSON.stringify(details)}` : ''}`,
      'ASSESSMENT_[CODE]',
      500,
      true
    );
  }
}
```

Constructor params: `(message, code, httpStatus, isOperational)`

## Module Breakdown

| Module | Error Classes | Range |
|--------|--------------|-------|
| 1 — AI Assessment Engine | 120 | Lines 7-654 |
| 2 — Question Bank | 80 | Lines 659-988 |
| 3 — Certification | 60 | Lines 1077-1388 |
| 4 — Competency Assessment | 50 | Lines 1393-1662 |
| 5 — National Examination | 60 | Lines 1667-1960 |
| 6 — Accreditation | 40 | Lines 1965+ |
| 7 — Academic Integrity | 50+ | Lines 2000+ |
| 8 — Portfolio | 40+ | Lines 2200+ |
| 9 — Research & Innovation | 40+ | Lines 2400+ |
| 10 — International Standards | 30+ | Lines 2600+ |
| 11 — AI-Powered Features | 40+ | Lines 2800+ |
| Infrastructure/Utilities | ~200+ | Throughout |

## Module 1 — AI Assessment Engine (120 classes)

Core assessment errors:
- `AssessmentAIQuestionGeneratorError`
- `AssessmentAdaptiveExamError`
- `AssessmentDynamicDifficultyError`
- `AssessmentAutomaticGradingError`
- `AssessmentEssayEvaluationError`
- `AssessmentCodingAssessmentError`
- `AssessmentPracticalAssessmentError`
- `AssessmentOralExaminationError`
- `AssessmentExamBlueprintError`
- `AssessmentQuestionRandomizerError`
- `AssessmentQuestionPoolError`
- `AssessmentExamSessionError`
- `AssessmentExamAttemptError`
- `AssessmentExamReplayError`

Security & proctoring:
- `AssessmentSecureBrowserError`
- `AssessmentProctoringAIError`
- `AssessmentCheatingDetectionError`
- `AssessmentFaceVerificationError`
- `AssessmentScreenMonitoringError`
- `AssessmentMicrophoneMonitoringError`
- `AssessmentExamLockdownError`

Scheduling:
- `AssessmentExamScheduleError`
- `AssessmentExamCalendarError`
- `AssessmentExamNotificationError`
- `AssessmentExamReminderError`

Analytics & reporting:
- `AssessmentExamFeedbackError`
- `AssessmentExamAnalyticsError`
- `AssessmentExamStatisticsError`
- `AssessmentExamReportingError`
- `AssessmentExamExportError`
- `AssessmentExamImportError`

Infrastructure:
- `AssessmentExamBackupError`, `AssessmentExamRestoreError`
- `AssessmentExamCacheError`, `AssessmentExamQueueError`
- `AssessmentExamPerformanceError`, `AssessmentExamScalabilityError`
- `AssessmentExamSecurityError`, `AssessmentExamEncryptionError`
- `AssessmentExamTokenError`, `AssessmentExamAuthenticationError`
- `AssessmentExamAuthorizationError`, `AssessmentExamRateLimitError`
- `AssessmentExamTimeoutError`, `AssessmentExamConnectionError`
- `AssessmentExamNetworkError`, `AssessmentExamServiceUnavailableError`
- `AssessmentExamConfigurationError`, `AssessmentExamDatabaseError`

Media processing:
- `AssessmentExamImageProcessingError`
- `AssessmentExamVideoProcessingError`
- `AssessmentExamAudioProcessingError`
- `AssessmentExamDocumentProcessingError`
- `AssessmentExamPDFGenerationError`
- `AssessmentExamOCRProcessingError`
- `AssessmentExamHandwritingRecognitionError`
- `AssessmentExamSpeechRecognitionError`
- `AssessmentExamTextToSpeechError`
- `AssessmentExamMachineTranslationError`

Detection:
- `AssessmentExamPlagiarismCheckError`
- `AssessmentExamAIDetectionError`
- `AssessmentExamForgeryDetectionError`
- `AssessmentExamIdentityVerificationError`
- `AssessmentExamBiometricVerificationError`

Monitoring:
- `AssessmentExamKeystrokeAnalysisError`
- `AssessmentExamMouseTrackingError`
- `AssessmentExamBehaviorMonitoringError`
- `AssessmentExamAttentionTrackingError`
- `AssessmentExamEyeTrackingError`
- `AssessmentExamTabSwitchDetectionError`
- `AssessmentExamCopyPasteDetectionError`
- `AssessmentExamScreenShareDetectionError`
- `AssessmentExamVirtualMachineDetectionError`
- `AssessmentExamRemoteDesktopDetectionError`
- `AssessmentExamBrowserExtensionDetectionError`
- `AssessmentExamMultipleDisplayDetectionError`
- `AssessmentExamNetworkMonitoringError`

## Module 2 — Question Bank (80 classes)

- `AssessmentQuestionCategoryError`
- `AssessmentQuestionTagError`
- `AssessmentQuestionDifficultyError`
- `AssessmentQuestionMetadataError`
- `AssessmentQuestionVersionError`
- `AssessmentQuestionApprovalError`
- `AssessmentQuestionReviewError`
- `AssessmentQuestionStatisticsError`
- `AssessmentImportQuestionError`
- `AssessmentExportQuestionError`
- `AssessmentBulkEditError`
- `AssessmentOCRImportError`
- `AssessmentAIQuestionGenerationError`
- `AssessmentQuestionTranslationError`
- `AssessmentQuestionValidationError`
- `AssessmentDuplicateDetectionError`
- Question type errors: `AssessmentMultipleChoiceError`, `AssessmentTrueFalseError`, `AssessmentFillInBlankError`, `AssessmentShortAnswerError`, `AssessmentMatchingError`, `AssessmentSequencingError`, `AssessmentEssayQuestionError`, `AssessmentOpenEndedError`, `AssessmentNumericalAnswerError`, `AssessmentFormulaAnswerError`, `AssessmentCodeAnswerError`, `AssessmentDiagramAnswerError`, `AssessmentAudioAnswerError`, `AssessmentVideoAnswerError`, `AssessmentImageAnswerError`, `AssessmentFileUploadAnswerError`, `AssessmentDrawingAnswerError`, `AssessmentInteractiveAnswerError`, `AssessmentSimulationAnswerError`
- Bank management: `AssessmentQuestionBankError`, `AssessmentQuestionBankShareError`, `AssessmentQuestionBankPermissionError`, `AssessmentQuestionBankLockError`, `AssessmentQuestionBankMergeError`, `AssessmentQuestionBankSplitError`, `AssessmentQuestionBankArchiveError`, `AssessmentQuestionBankRestoreError`, `AssessmentQuestionBankAnalyticsError`, `AssessmentQuestionBankUsageError`, `AssessmentQuestionBankVersionError`, `AssessmentQuestionBankDiffError`, `AssessmentQuestionBankHistoryError`, `AssessmentQuestionBankAuditError`, `AssessmentQuestionBankSearchError`, `AssessmentQuestionBankFilterError`, `AssessmentQuestionBankSortError`, `AssessmentQuestionBankPaginationError`, `AssessmentQuestionBankExportError`, `AssessmentQuestionBankImportError`, `AssessmentQuestionBankValidationImportError`, `AssessmentQuestionBankFormatError`, `AssessmentQuestionBankCompressionError`, `AssessmentQuestionBankEncryptionError`, `AssessmentQuestionBankHashError`, `AssessmentQuestionBankCacheError`, `AssessmentQuestionBankPerformanceError`, `AssessmentQuestionBankSyncError`, `AssessmentQuestionBankReplicationError`, `AssessmentQuestionBankConsistencyError`, `AssessmentQuestionBankIntegrityError`, `AssessmentQuestionBankCorruptionError`, `AssessmentQuestionBankMigrationError`

## Import Usage

```typescript
import {
  AssessmentAIQuestionGeneratorError,
  AssessmentCertificateError,
  AssessmentNationalExamError,
} from '@educi/errors';

// Throw in service
throw new AssessmentAIQuestionGeneratorError({ examId, reason: 'Model unavailable' });

// Catch in API route
try {
  await service.create(schoolId, data);
} catch (err) {
  if (err instanceof AppError) {
    return NextResponse.json({ error: err.message }, { status: err.httpStatus });
  }
  throw err;
}
```

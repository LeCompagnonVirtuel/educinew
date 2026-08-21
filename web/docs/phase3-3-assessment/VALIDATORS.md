# Validators — Phase 3.3 Assessment Engine

4 Zod schema files with create/update schemas per entity. Located in `web/src/features/assessment/validators/`.

## Files

| File | Lines | Entities Covered |
|------|-------|-----------------|
| `assessment-core.ts` | ~1045 | Module 1-2: AI exam, grading, proctoring, question bank |
| `assessment-certification.ts` | TBD | Module 3: Certificates, badges, diplomas |
| `assessment-modules.ts` | TBD | Module 4-5: Competency, national exams |
| `assessment-research-intl.ts` | TBD | Module 6-11: Accreditation, integrity, portfolio, research, international, AI |

## Pattern

Every entity has a `Create` and `Update` schema. Update schemas make all fields optional except `school_id`.

```typescript
import { z } from 'zod';

const schoolId = z.string().uuid();

export const [entity]CreateSchema = z.object({
  school_id: schoolId,
  field1: z.string().min(1).max(200),
  field2: z.number().int().min(0).max(100),
  field3: z.enum(['OPTION_A', 'OPTION_B', 'OPTION_C']),
  field4: z.boolean().optional(),
  field5: z.array(z.string().uuid()).optional(),
});

export const [entity]UpdateSchema = z.object({
  school_id: schoolId,
  field1: z.string().min(1).max(200).optional(),
  field2: z.number().int().min(0).max(100).optional(),
  field3: z.enum(['OPTION_A', 'OPTION_B', 'OPTION_C']).optional(),
  field4: z.boolean().optional(),
  field5: z.array(z.string().uuid()).optional(),
});
```

## Schemas in assessment-core.ts

### AI Assessment Engine

| Entity | Create Schema | Update Schema |
|--------|--------------|---------------|
| AI Question Generator | `aiQuestionGeneratorCreateSchema` | `aiQuestionGeneratorUpdateSchema` |
| Adaptive Exam | `adaptiveExamCreateSchema` | `adaptiveExamUpdateSchema` |
| Dynamic Question Difficulty | `dynamicQuestionDifficultyCreateSchema` | `dynamicQuestionDifficultyUpdateSchema` |
| Automatic Grading | `automaticGradingCreateSchema` | `automaticGradingUpdateSchema` |
| Essay Evaluation AI | `essayEvaluationAICreateSchema` | `essayEvaluationAIUpdateSchema` |
| Coding Assessment | `codingAssessmentCreateSchema` | `codingAssessmentUpdateSchema` |
| Practical Assessment | `practicalAssessmentCreateSchema` | `practicalAssessmentUpdateSchema` |
| Oral Examination | `oralExaminationCreateSchema` | `oralExaminationUpdateSchema` |
| Exam Blueprint | `examBlueprintCreateSchema` | `examBlueprintUpdateSchema` |
| Question Randomizer | `questionRandomizerCreateSchema` | `questionRandomizerUpdateSchema` |
| Question Pool | `questionPoolCreateSchema` | `questionPoolUpdateSchema` |
| Exam Session | `examSessionCreateSchema` | `examSessionUpdateSchema` |
| Exam Attempt | `examAttemptCreateSchema` | `examAttemptUpdateSchema` |
| Exam Replay | `examReplayCreateSchema` | `examReplayUpdateSchema` |
| Secure Browser | `secureBrowserCreateSchema` | `secureBrowserUpdateSchema` |
| Proctoring AI | `proctoringAICreateSchema` | `proctoringAIUpdateSchema` |
| Cheating Detection | `cheatingDetectionCreateSchema` | `cheatingDetectionUpdateSchema` |
| Face Verification | `faceVerificationCreateSchema` | `faceVerificationUpdateSchema` |
| Screen Monitoring | `screenMonitoringCreateSchema` | `screenMonitoringUpdateSchema` |
| Microphone Monitoring | `microphoneMonitoringCreateSchema` | `microphoneMonitoringUpdateSchema` |
| Exam Lockdown | `examLockdownCreateSchema` | `examLockdownUpdateSchema` |

### Question Bank

| Entity | Create Schema | Update Schema |
|--------|--------------|---------------|
| Question Category | `questionCategoryCreateSchema` | `questionCategoryUpdateSchema` |
| Question Tag | `questionTagCreateSchema` | `questionTagUpdateSchema` |
| Question Difficulty Config | `questionDifficultyConfigCreateSchema` | `questionDifficultyConfigUpdateSchema` |
| Question Metadata | `questionMetadataCreateSchema` | `questionMetadataUpdateSchema` |
| Question Version | `questionVersionCreateSchema` | `questionVersionUpdateSchema` |
| Question Approval Workflow | `questionApprovalWorkflowCreateSchema` | `questionApprovalWorkflowUpdateSchema` |
| Question Review | `questionReviewCreateSchema` | `questionReviewUpdateSchema` |
| Question Statistics | `questionStatisticsCreateSchema` | `questionStatisticsUpdateSchema` |
| Import Question Job | `importQuestionJobCreateSchema` | `importQuestionJobUpdateSchema` |
| Export Question Job | `exportQuestionJobCreateSchema` | `exportQuestionJobUpdateSchema` |
| Bulk Edit Job | `bulkEditJobCreateSchema` | `bulkEditJobUpdateSchema` |
| OCR Question Import | `oCRQuestionImportCreateSchema` | `oCRQuestionImportUpdateSchema` |
| AI Question Generation | `aIQuestionGenerationCreateSchema` | `aIQuestionGenerationUpdateSchema` |
| Question Translation | `questionTranslationCreateSchema` | `questionTranslationUpdateSchema` |
| Question Validation | `questionValidationCreateSchema` | `questionValidationUpdateSchema` |
| Duplicate Detection | `duplicateDetectionCreateSchema` | `duplicateDetectionUpdateSchema` |

## Validation Rules Used

- `z.string().uuid()` — UUID format
- `z.string().min(1).max(N)` — Length constraints
- `z.number().int().min(0).max(N)` — Integer ranges
- `z.number().min(0).max(1)` — Float ranges (0-1)
- `z.enum([...])` — Allowed values
- `z.boolean()` — Boolean fields
- `z.array(z.string().uuid())` — Arrays of UUIDs
- `z.array(z.object({...}))` — Arrays of objects
- `z.record(z.unknown())` — Generic objects
- `z.string().datetime()` — ISO datetime strings
- `z.string().url()` — Valid URLs
- `.optional()` — Optional fields

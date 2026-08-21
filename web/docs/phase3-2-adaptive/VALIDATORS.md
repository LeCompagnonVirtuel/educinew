# Validators — Phase 3.2 Adaptive Learning Intelligence

## Overview

5 Zod validator files located under `src/features/adaptive/validators/`. Each file defines Create and Update schemas for related entities. All schemas require `school_id` as a required field.

## Files

```
validators/
├── adaptive-core.ts          # Profile, LearningStyle, Preferences, History
├── adaptive-learning.ts      # LearningPath, PathNode, Enrollment, Progress
├── adaptive-content.ts       # ContentItem, Variant, DeliveryRule, Feedback
├── adaptive-assessment.ts    # Assessment, QuestionBank, QuestionItem, Response
├── adaptive-analytics.ts     # Session, Analytics, Cohort, Engagement
└── adaptive-social.ts        # StudyGroup, PeerReview, Discussion, CollaborativeTask
```

## Schema Pattern

### Create Schema

```typescript
// validators/adaptive-core.ts
import { z } from 'zod';

export const adaptiveProfileCreateSchema = z.object({
  school_id: z.string().uuid(),
  user_id: z.string().uuid(),
  learning_style: z.enum(['visual', 'auditory', 'kinesthetic', 'reading']).optional(),
  cognitive_load: z.number().min(0).max(1).optional(),
  prior_knowledge: z.number().min(0).max(1).optional(),
  motivation_level: z.enum(['low', 'medium', 'high']).optional(),
  learning_pace: z.enum(['slow', 'moderate', 'fast']).optional(),
  status: z.enum(['active', 'inactive', 'archived']).default('active'),
});

export type AdaptiveProfileCreate = z.infer<typeof adaptiveProfileCreateSchema>;
```

### Update Schema

```typescript
export const adaptiveProfileUpdateSchema = adaptiveProfileCreateSchema
  .partial()
  .omit({ school_id: true });

export type AdaptiveProfileUpdate = z.infer<typeof adaptiveProfileUpdateSchema>;
```

## All Schemas

### adaptive-core.ts

| Schema | Entity | Required Fields |
|--------|--------|-----------------|
| `adaptiveProfileCreateSchema` | AdaptiveProfile | school_id, user_id |
| `adaptiveProfileUpdateSchema` | AdaptiveProfile | (all optional) |
| `adaptiveLearningStyleCreateSchema` | LearningStyleProfile | school_id, profile_id |
| `adaptiveLearningStyleUpdateSchema` | LearningStyleProfile | (all optional) |
| `adaptiveLearnerPreferencesCreateSchema` | LearnerPreferences | school_id, profile_id |
| `adaptiveLearnerPreferencesUpdateSchema` | LearnerPreferences | (all optional) |
| `adaptiveLearnerHistoryCreateSchema` | LearnerHistory | school_id, profile_id |
| `adaptiveLearnerHistoryUpdateSchema` | LearnerHistory | (all optional) |

### adaptive-learning.ts

| Schema | Entity | Required Fields |
|--------|--------|-----------------|
| `adaptiveLearningPathCreateSchema` | LearningPath | school_id, title |
| `adaptiveLearningPathUpdateSchema` | LearningPath | (all optional) |
| `adaptivePathNodeCreateSchema` | LearningPathNode | school_id, path_id, title |
| `adaptivePathNodeUpdateSchema` | LearningPathNode | (all optional) |
| `adaptivePathEnrollmentCreateSchema` | PathEnrollment | school_id, path_id, user_id |
| `adaptivePathEnrollmentUpdateSchema` | PathEnrollment | (all optional) |
| `adaptivePathProgressCreateSchema` | PathProgress | school_id, enrollment_id |
| `adaptivePathProgressUpdateSchema` | PathProgress | (all optional) |

### adaptive-content.ts

| Schema | Entity | Required Fields |
|--------|--------|-----------------|
| `adaptiveContentItemCreateSchema` | ContentItem | school_id, title, type |
| `adaptiveContentItemUpdateSchema` | ContentItem | (all optional) |
| `adaptiveContentVariantCreateSchema` | ContentVariant | school_id, content_id |
| `adaptiveContentVariantUpdateSchema` | ContentVariant | (all optional) |
| `adaptiveDeliveryRuleCreateSchema` | DeliveryRule | school_id, condition |
| `adaptiveDeliveryRuleUpdateSchema` | DeliveryRule | (all optional) |
| `adaptiveContentFeedbackCreateSchema` | ContentFeedback | school_id, content_id, user_id |
| `adaptiveContentFeedbackUpdateSchema` | ContentFeedback | (all optional) |

### adaptive-assessment.ts

| Schema | Entity | Required Fields |
|--------|--------|-----------------|
| `adaptiveAssessmentCreateSchema` | AdaptiveAssessment | school_id, title |
| `adaptiveAssessmentUpdateSchema` | AdaptiveAssessment | (all optional) |
| `adaptiveQuestionBankCreateSchema` | QuestionBank | school_id, name |
| `adaptiveQuestionBankUpdateSchema` | QuestionBank | (all optional) |
| `adaptiveQuestionItemCreateSchema` | QuestionItem | school_id, bank_id, stem |
| `adaptiveQuestionItemUpdateSchema` | QuestionItem | (all optional) |
| `adaptiveAssessmentResponseCreateSchema` | AssessmentResponse | school_id, assessment_id, user_id |
| `adaptiveAssessmentResponseUpdateSchema` | AssessmentResponse | (all optional) |

### adaptive-analytics.ts

| Schema | Entity | Required Fields |
|--------|--------|-----------------|
| `adaptiveLearningSessionCreateSchema` | LearningSession | school_id, user_id |
| `adaptiveLearningSessionUpdateSchema` | LearningSession | (all optional) |
| `adaptiveSessionAnalyticsCreateSchema` | SessionAnalytics | school_id, session_id |
| `adaptiveSessionAnalyticsUpdateSchema` | SessionAnalytics | (all optional) |
| `adaptiveCohortAnalyticsCreateSchema` | CohortAnalytics | school_id, cohort_id |
| `adaptiveCohortAnalyticsUpdateSchema` | CohortAnalytics | (all optional) |
| `adaptiveEngagementMetricCreateSchema` | EngagementMetric | school_id, user_id |
| `adaptiveEngagementMetricUpdateSchema` | EngagementMetric | (all optional) |

### adaptive-social.ts

| Schema | Entity | Required Fields |
|--------|--------|-----------------|
| `adaptiveStudyGroupCreateSchema` | StudyGroup | school_id, name |
| `adaptiveStudyGroupUpdateSchema` | StudyGroup | (all optional) |
| `adaptivePeerReviewCreateSchema` | PeerReview | school_id, task_id, reviewer_id |
| `adaptivePeerReviewUpdateSchema` | PeerReview | (all optional) |
| `adaptiveDiscussionThreadCreateSchema` | DiscussionThread | school_id, group_id, title |
| `adaptiveDiscussionThreadUpdateSchema` | DiscussionThread | (all optional) |
| `adaptiveCollaborativeTaskCreateSchema` | CollaborativeTask | school_id, group_id, title |
| `adaptiveCollaborativeTaskUpdateSchema` | CollaborativeTask | (all optional) |

## Validation Rules

| Field | Rule |
|-------|------|
| `school_id` | Required UUID, not nullable |
| `user_id` | Required UUID, references auth.users |
| `title` | Required string, min 1, max 255 |
| `status` | Enum with default `'active'` |
| `type` | Enum with domain-specific values |
| Numeric fields | `z.number().min(0).max(1)` for scores |
| Optional fields | `.optional()` on all non-required fields |
| Dates | `z.string().datetime()` for ISO timestamps |

## Usage in Services

```typescript
import { adaptiveProfileCreateSchema } from '../validators/adaptive-core';

async createProfile(schoolId: string, data: AdaptiveProfileCreate) {
  const validated = adaptiveProfileCreateSchema.parse(data);
  return this.repo.createProfile(schoolId, validated);
}
```

## Total Schema Count

| File | Create Schemas | Update Schemas | Total |
|------|----------------|----------------|-------|
| adaptive-core.ts | 4 | 4 | 8 |
| adaptive-learning.ts | 4 | 4 | 8 |
| adaptive-content.ts | 4 | 4 | 8 |
| adaptive-assessment.ts | 4 | 4 | 8 |
| adaptive-analytics.ts | 4 | 4 | 8 |
| adaptive-social.ts | 4 | 4 | 8 |
| **Total** | **24** | **24** | **48** |

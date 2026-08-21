# Errors — Phase 3.2 Adaptive Learning Intelligence

## Overview

910+ Adaptive*Error classes located in `packages/errors/`. Each error extends `AppError` and maps to an `ADAPTIVE_*` error code. Domain-specific errors for all 120 adaptive entities.

## Hierarchy

```
AppError (base)
  AdaptiveError (adaptive base)
    AdaptiveProfileError
      AdaptiveProfileNotFoundError
      AdaptiveProfileValidationError
      AdaptiveProfileConflictError
    AdaptiveLearningPathError
      AdaptiveLearningPathNotFoundError
      AdaptiveLearningPathValidationError
    AdaptiveContentError
      AdaptiveContentNotFoundError
      AdaptiveContentValidationError
    AdaptiveDifficultyError
      AdaptiveDifficultyNotFoundError
    AdaptiveKnowledgeGapError
      AdaptiveKnowledgeGapNotFoundError
    AdaptiveCompetencyError
      AdaptiveCompetencyNotFoundError
    AdaptiveAssessmentError
      AdaptiveAssessmentNotFoundError
    AdaptiveRepetitionError
      AdaptiveRepetitionCardNotFoundError
    AdaptiveRecommendationError
      AdaptiveRecommendationNotFoundError
    AdaptiveAnalyticsError
      AdaptiveAnalyticsNotFoundError
    AdaptiveExperimentError
      AdaptiveExperimentNotFoundError
    AdaptiveRealtimeError
      AdaptiveRealtimeAdjustmentNotFoundError
    AdaptivePrerequisiteError
      AdaptivePrerequisiteNotFoundError
    AdaptiveMasteryError
      AdaptiveMasteryLevelNotFoundError
    AdaptiveSessionError
      AdaptiveSessionNotFoundError
    AdaptiveEngagementError
      AdaptiveEngagementPatternNotFoundError
    AdaptiveFeedbackError
      AdaptiveFeedbackNotFoundError
    AdaptiveGoalError
      AdaptiveGoalNotFoundError
    AdaptiveStreakError
      AdaptiveStreakNotFoundError
    AdaptiveLeaderboardError
      AdaptiveLeaderboardNotFoundError
    AdaptiveAchievementError
      AdaptiveAchievementNotFoundError
    AdaptivePointError
      AdaptivePointBalanceNotFoundError
    AdaptiveNotificationError
      AdaptiveNotificationNotFoundError
    AdaptiveProgressError
      AdaptiveProgressTrackerNotFoundError
    AdaptiveSocialError
      AdaptiveStudyGroupNotFoundError
    AdaptiveCurationError
      AdaptiveContentCollectionNotFoundError
    AdaptiveAccessibilityError
      AdaptiveAccessibilityProfileNotFoundError
    AdaptiveInstructorError
      AdaptiveInstructorInsightNotFoundError
    AdaptiveCurriculumError
      AdaptiveCurriculumMappingNotFoundError
    AdaptiveValidationError
    AdaptivePermissionError
    AdaptiveConflictError
    AdaptiveRateLimitError
    AdaptiveTimeoutError
```

## Error Code Pattern

```typescript
export class AdaptiveProfileNotFoundError extends AdaptiveError {
  readonly code = 'ADAPTIVE_PROFILE_NOT_FOUND';
  readonly statusCode = 404;

  constructor(profileId: string) {
    super(`Adaptive profile not found: ${profileId}`);
  }
}
```

## Error Categories

| Category | Prefix | Count | Examples |
|----------|--------|-------|----------|
| Not Found | `ADAPTIVE_*_NOT_FOUND` | 120 | Profile, Path, Assessment |
| Validation | `ADAPTIVE_*_VALIDATION_ERROR` | 120 | Schema, Business rules |
| Conflict | `ADAPTIVE_*_CONFLICT` | 40 | Duplicate enrollment |
| Permission | `ADAPTIVE_*_PERMISSION_ERROR` | 30 | School access denied |
| Rate Limit | `ADAPTIVE_RATE_LIMIT_ERROR` | 5 | API throttling |
| Timeout | `ADAPTIVE_TIMEOUT_ERROR` | 5 | AI engine timeout |
| Internal | `ADAPTIVE_INTERNAL_ERROR` | 10 | Pipeline failure |
| **Total** | | **910+** | |

## Error Codes (Common)

| Code | Status | Description |
|------|--------|-------------|
| `ADAPTIVE_PROFILE_NOT_FOUND` | 404 | Profile does not exist |
| `ADAPTIVE_PROFILE_VALIDATION_ERROR` | 400 | Invalid profile data |
| `ADAPTIVE_PROFILE_CONFLICT` | 409 | Profile already exists |
| `ADAPTIVE_PERMISSION_ERROR` | 403 | School access denied |
| `ADAPTIVE_RATE_LIMIT_ERROR` | 429 | Too many requests |
| `ADAPTIVE_TIMEOUT_ERROR` | 504 | AI engine timeout |
| `ADAPTIVE_INTERNAL_ERROR` | 500 | Internal pipeline error |
| `ADAPTIVE_ASSESSMENT_NOT_FOUND` | 404 | Assessment does not exist |
| `ADAPTIVE_KNOWLEDGE_GAP_NOT_FOUND` | 404 | Knowledge gap does not exist |
| `ADAPTIVE_LEARNING_PATH_NOT_FOUND` | 404 | Learning path does not exist |

## Error Factory Pattern

```typescript
export function createAdaptiveError(
  entity: string,
  operation: string,
  details?: string
): AdaptiveError {
  const code = `ADAPTIVE_${entity.toUpperCase()}_${operation.toUpperCase()}`;
  return new AdaptiveError(code, details);
}
```

## Usage in Services

```typescript
import {
  AdaptiveProfileNotFoundError,
  AdaptiveValidationError,
  AdaptivePermissionError,
} from '@educi/errors';

async getProfile(schoolId: string, id: string) {
  const item = await this.repo.getProfile(id, schoolId);
  if (!item) throw new AdaptiveProfileNotFoundError(id);
  return item;
}

async createProfile(schoolId: string, data: AdaptiveProfileCreate) {
  const validated = adaptiveProfileCreateSchema.parse(data);
  if (!validated.success) {
    throw new AdaptiveValidationError(validated.error.issues);
  }
  return this.repo.createProfile(schoolId, validated.data);
}
```

## Error Response Format

```json
{
  "error": {
    "code": "ADAPTIVE_PROFILE_NOT_FOUND",
    "message": "Adaptive profile not found: profile-123",
    "statusCode": 404,
    "details": {}
  }
}
```

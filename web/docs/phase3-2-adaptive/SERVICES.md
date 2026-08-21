# Services — Phase 3.2 Adaptive Learning Intelligence

## Overview

110 service files located under `src/features/adaptive/services/`. Each service encapsulates business logic, validation, and multi-tenant access for a single entity.

## Structure

```
services/
├── adp-profile.service.ts              # AdaptiveProfile CRUD + learning style
├── adp-learning-style.service.ts       # LearningStyleProfile + VARK assessment
├── adp-learner-preferences.service.ts  # LearnerPreferences
├── adp-learner-history.service.ts      # LearnerHistory
├── adp-learning-path.service.ts        # LearningPath + nodes + enrollment
├── adp-content-delivery.service.ts     # ContentItem + variants + rules
├── adp-difficulty-engine.service.ts    # DifficultyProfile + ZPD
├── adp-knowledge-gap.service.ts        # KnowledgeGap + dependency graph
├── adp-competency.service.ts           # Competency + framework + levels
├── adp-assessment.service.ts           # AdaptiveAssessment + question bank
├── adp-spaced-repetition.service.ts    # RepetitionCard + SM-2/FSRS
├── adp-recommendation.service.ts       # Content + path + peer recommendations
├── adp-analytics.service.ts            # LearningSession + cohort analytics
├── adp-ab-testing.service.ts           # Experiment + variants
├── adp-realtime-adjustment.service.ts  # RealtimeAdjustment + adaptation logs
├── adp-prerequisite.service.ts         # Prerequisite + overrides
├── adp-mastery.service.ts              # MasteryLevel + badges + certificates
├── adp-session.service.ts              # AdaptiveSession + checkpoints
├── adp-engagement.service.ts           # EngagementPattern + triggers
├── adp-feedback.service.ts             # AdaptiveFeedback + templates
├── adp-goal.service.ts                 # LearningGoal + milestones
├── adp-streak.service.ts               # LearningStreak
├── adp-leaderboard.service.ts          # Leaderboard + entries
├── adp-achievement.service.ts          # Achievement
├── adp-point.service.ts                # PointBalance
├── adp-notification.service.ts         # AdaptiveNotification + preferences
├── adp-progress.service.ts             # ProgressTracker + reports
├── adp-social-learning.service.ts      # StudyGroup + peer review
├── adp-content-curation.service.ts     # ContentCollection + rules
├── adp-accessibility.service.ts        # AccessibilityProfile + accommodations
├── adp-instructor-insight.service.ts   # InstructorInsight + interventions
├── adp-curriculum.service.ts           # CurriculumMapping + objectives
└── ... (110 total)
```

## CRUD Pattern

Every service follows this pattern:

```typescript
// features/adaptive/services/adp-profile.service.ts
export class AdpProfileService {
  private repo: ReturnType<typeof createAdaptiveRepository>;

  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }

  async getProfile(schoolId: string, id: string): Promise<AdaptiveProfile> {
    const item = await this.repo.getProfile(id, schoolId);
    if (!item) throw new AdaptiveProfileNotFoundError(id);
    return item;
  }

  async listProfiles(schoolId: string, filters?: ProfileFilters): Promise<AdaptiveProfile[]> {
    return this.repo.listProfiles(schoolId, filters);
  }

  async createProfile(schoolId: string, data: AdaptiveProfileCreate): Promise<AdaptiveProfile> {
    const validated = adaptiveProfileCreateSchema.parse(data);
    return this.repo.createProfile(schoolId, validated);
  }

  async updateProfile(id: string, schoolId: string, data: Partial<AdaptiveProfileCreate>): Promise<AdaptiveProfile> {
    const item = await this.repo.getProfile(id, schoolId);
    if (!item) throw new AdaptiveProfileNotFoundError(id);
    return this.repo.updateProfile(id, schoolId, data);
  }

  async deleteProfile(id: string, schoolId: string): Promise<void> {
    const item = await this.repo.getProfile(id, schoolId);
    if (!item) throw new AdaptiveProfileNotFoundError(id);
    await this.repo.deleteProfile(id, schoolId);
  }
}
```

## Standard Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `get{Name}(schoolId, id)` | Single item by ID | `Promise<T>` |
| `list{Names}(schoolId, filters?)` | List with filtering | `Promise<T[]>` |
| `create{Name}(schoolId, data)` | Create new item | `Promise<T>` |
| `update{Name}(id, schoolId, data)` | Partial update | `Promise<T>` |
| `delete{Name}(id, schoolId)` | Soft delete | `Promise<void>` |

## Extended Methods (AI/ML Services)

| Service | Method | Description |
|---------|--------|-------------|
| `AdpDifficultyEngineService` | `adjust(profile, performance)` | Elo-rating ZPD update |
| `AdpDifficultyEngineService` | `calculateZPD(profile)` | Zone of proximal development |
| `AdpKnowledgeGapService` | `detect(schoolId, userId)` | Gap detection from assessment data |
| `AdpKnowledgeGapService` | `remediate(schoolId, gapId)` | Generate remediation path |
| `AdpSpacedRepetitionService` | `reviewCard(id, quality)` | SM-2/FSRS review scheduling |
| `AdpSpacedRepetitionService` | `optimizeSchedule(schoolId)` | Batch schedule optimization |
| `AdpRecommendationService` | `generate(schoolId, userId)` | ML-based recommendations |
| `AdpAnalyticsService` | `analyze(schoolId)` | Cohort-level analysis |
| `AdpEngagementService` | `score(schoolId, userId)` | Engagement scoring |
| `AdpProfileService` | `analyzeLearningStyle(schoolId, id)` | VARK/Kolb analysis |

## Multi-Tenancy

All methods require `schoolId` as first parameter. Repository filters by `.eq('school_id', schoolId)` on every query.

```typescript
async listProfiles(schoolId: string, filters?: ProfileFilters): Promise<AdaptiveProfile[]> {
  return this.repo.listProfiles(schoolId, filters);
}
```

## Error Handling

Services throw domain-specific error classes:

```typescript
import { AdaptiveProfileNotFoundError, AdaptiveValidationError } from '@educi/errors';

if (!item) throw new AdaptiveProfileNotFoundError(id);
const validated = adaptiveProfileCreateSchema.parse(data);
// Zod errors caught and re-thrown as AdaptiveValidationError
```

| Error Class | Usage |
|-------------|-------|
| `AdaptiveProfileNotFoundError` | Profile not found |
| `AdaptiveLearningPathNotFoundError` | Path not found |
| `AdaptiveKnowledgeGapNotFoundError` | Gap not found |
| `AdaptiveAssessmentNotFoundError` | Assessment not found |
| `AdaptiveValidationError` | Zod validation failure |
| `AdaptivePermissionError` | School access denied |
| `AdaptiveConflictError` | Duplicate resource |

## Configuration Injection

Services accept optional config via constructor:

```typescript
constructor(
  private supabase: SupabaseClient,
  private readonly config: DifficultyConfig = DEFAULT_DIFFICULTY_CONFIG
)
```

Config values sourced from `packages/config` adaptive section.

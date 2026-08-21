# Technical Architecture — Phase 3.2 Adaptive Learning Intelligence

## Overview

Phase 3.2 Adaptive Learning Intelligence follows a layered architecture with strict separation of concerns, building upon the Intelligence platform (Phase 3.1) to deliver personalized learning experiences at scale.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js + React Native)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────────┐  │
│  │   React       │  │   Hooks      │  │   Validators (Zod - 6 files) │  │
│  │   Components  │  │   (100+)     │  │   (234 schemas)              │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┬───────────────┘  │
├─────────┼─────────────────┼─────────────────────────┼──────────────────┤
│         │           API Routes (120 entities)        │                  │
│         │     /api/adaptive/{entity}                  │                  │
├─────────┼─────────────────┼─────────────────────────┼──────────────────┤
│              Service Layer (120 services)                               │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  Adp*Service (get, list, create, update, delete, analyze)        │   │
│  └────────────────────────────┬─────────────────────────────────────┘   │
├───────────────────────────────┼─────────────────────────────────────────┤
│              Repository Layer                                           │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  AdaptiveRepositoryImpl (220+ methods)                           │   │
│  └────────────────────────────┬─────────────────────────────────────┘   │
├───────────────────────────────┼─────────────────────────────────────────┤
│              AI/ML Pipeline                                              │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  LearningStyleEngine → DifficultyEngine → KnowledgeGapEngine      │   │
│  │  → SpacedRepetitionEngine → RecommendationEngine                  │   │
│  └────────────────────────────┬─────────────────────────────────────┘   │
├───────────────────────────────┼─────────────────────────────────────────┤
│              Supabase (PostgreSQL)                                      │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  adaptive_* tables (120 tables)                                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Learner Onboarding
```
New Learner → LearningStyleAssessment → Profile Creation → Initial Path Assignment
```

### 2. Adaptive Content Delivery
```
Learner Profile → Difficulty Engine → Content Selection → Delivery Rule Engine → Content Presentation
```

### 3. Knowledge Gap Detection
```
Assessment Results → Gap Analysis → Skill Dependency Graph → Remediation Path Generation
```

### 4. Real-time Adaptation
```
Session Data → Performance Snapshot → Adjustment Decision → Content/Difficulty Modification → Log
```

### 5. Spaced Repetition Cycle
```
Learning Event → Card Creation/Scheduling → Review → Performance Update → Next Review Scheduling
```

### 6. Social Learning Flow
```
Learner Profile → Group Matching → Activity Assignment → Peer Review → Collaborative Feedback
```

### 7. Analytics Pipeline
```
Session Data → Engagement Metrics → Cohort Analysis → Predictive Models → Instructor Insights
```

### 8. A/B Testing Flow
```
Experiment Definition → Variant Assignment → Learner Exposure → Metric Collection → Statistical Analysis
```

## Integration Patterns

### Repository Pattern
```typescript
// features/adaptive/repositories/adaptive.repository.ts
export interface AdaptiveRepository {
  // Profile (20+ methods)
  createProfile(schoolId: string, data: AdaptiveProfileCreate): Promise<AdaptiveProfile>;
  getProfile(schoolId: string, id: string): Promise<AdaptiveProfile | null>;
  listProfiles(schoolId: string, filters?: ProfileFilters): Promise<AdaptiveProfile[]>;
  updateProfile(id: string, schoolId: string, data: Partial<AdaptiveProfileCreate>): Promise<AdaptiveProfile>;
  deleteProfile(id: string, schoolId: string): Promise<void>;
  getProfileByUserId(schoolId: string, userId: string): Promise<AdaptiveProfile | null>;

  // Learning Path (25+ methods)
  createLearningPath(schoolId: string, data: LearningPathCreate): Promise<LearningPath>;
  getLearningPath(schoolId: string, id: string): Promise<LearningPath | null>;
  listLearningPaths(schoolId: string, filters?: PathFilters): Promise<LearningPath[]>;
  getPathNodes(schoolId: string, pathId: string): Promise<LearningPathNode[]>;
  enrollInPath(schoolId: string, pathId: string, userId: string): Promise<PathEnrollment>;

  // Knowledge Gap (20+ methods)
  detectKnowledgeGaps(schoolId: string, userId: string): Promise<KnowledgeGap[]>;
  getSkillDependencies(schoolId: string, skillId: string): Promise<SkillDependency[]>;
  generateRemediationPath(schoolId: string, gapId: string): Promise<GapRemediation>;

  // ... 220+ methods total
}

export class AdaptiveRepositoryImpl implements AdaptiveRepository {
  constructor(private readonly supabase: SupabaseClient) {}
  // Supabase implementation
}
```

### Service Pattern
```typescript
// features/adaptive/services/adp-profile.service.ts
export class AdpProfileService {
  private repo: ReturnType<typeof createAdaptiveRepository>;

  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }

  async getProfile(schoolId: string, id: string): Promise<AdaptiveProfile> {
    const item = await this.repo.getProfile(id, schoolId);
    if (!item) throw new AdpProfileNotFoundError(id);
    return item;
  }

  async createProfile(schoolId: string, data: AdaptiveProfileCreate): Promise<AdaptiveProfile> {
    const validated = adaptiveProfileCreateSchema.parse(data);
    return this.repo.createProfile(schoolId, validated);
  }

  async analyzeLearningStyle(schoolId: string, profileId: string): Promise<LearningStyleProfile> {
    const profile = await this.getProfile(schoolId, profileId);
    const assessments = await this.repo.getLearningStyleAssessments(profileId);
    return this.computeLearningStyle(profile, assessments);
  }

  async updateDifficulty(schoolId: string, profileId: string, performance: number): Promise<DifficultyProfile> {
    const current = await this.repo.getDifficultyProfile(profileId);
    return this.difficultyEngine.adjust(current, performance);
  }
}
```

### AI/ML Pipeline
```typescript
// features/adaptive/services/adp-difficulty-engine.service.ts
export class DifficultyEngineService {
  constructor(
    private supabase: SupabaseClient,
    private readonly config: DifficultyConfig
  ) {}

  async adjust(profile: DifficultyProfile, performance: number): Promise<DifficultyProfile> {
    const zpd = this.calculateZPD(profile);
    const newDifficulty = this.eloUpdate(profile.currentDifficulty, performance, profile.kFactor);
    const clamped = Math.max(zpd.lower, Math.min(zpd.upper, newDifficulty));

    return this.repo.updateDifficultyProfile(profile.id, {
      currentDifficulty: clamped,
      zpd_lower: zpd.lower,
      zpd_upper: zpd.upper,
      last_adjusted_at: new Date().toISOString()
    });
  }

  private calculateZPD(profile: DifficultyProfile): { lower: number; upper: number } {
    const mastery = profile.masteryLevel;
    return {
      lower: Math.max(0, mastery - this.config.zpdMargin),
      upper: Math.min(1, mastery + this.config.zpdMargin)
    };
  }

  private eloUpdate(rating: number, performance: number, kFactor: number): number {
    const expected = 1 / (1 + Math.pow(10, (performance - rating) / 400));
    return rating + kFactor * (performance - expected);
  }
}
```

### API Route Pattern
```typescript
// app/api/adaptive/profiles/route.ts
export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { searchParams } = new URL(request.url);
  const schoolId = searchParams.get('schoolId');
  const service = new AdpProfileService(supabase);
  const data = await service.listProfiles(schoolId!);
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = createClient(/* ... */);
  const service = new AdpProfileService(supabase);
  const data = await service.createProfile(body.schoolId, body);
  return NextResponse.json({ data }, { status: 201 });
}
```

### Hook Pattern (List)
```typescript
'use client';
export const useAdpProfileList = (schoolId: string) => {
  const [items, setItems] = useState<AdaptiveProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/adaptive/profiles?schoolId=${schoolId}`);
      const { data } = await response.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
```

### Hook Pattern (Actions)
```typescript
'use client';
export const useAdpProfileActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AdaptiveProfileCreate) => {
    try {
      setLoading(true);
      const response = await fetch('/api/adaptive/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolId, ...data })
      });
      const { data: result } = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
```

## AI/ML Pipeline Architecture

### Engine Types

| Engine | Purpose | Algorithm |
|--------|---------|-----------|
| `LearningStyleEngine` | VARK/Kolb style detection | Multi-dimensional scoring |
| `DifficultyEngine` | ZPD modeling | Elo-rating system |
| `KnowledgeGapEngine` | Gap detection | Graph traversal + Bayesian inference |
| `SpacedRepetitionEngine` | Review scheduling | SM-2 / FSRS |
| `RecommendationEngine` | Content suggestion | Collaborative + content-based filtering |
| `EngagementEngine` | Engagement scoring | Time-series analysis |
| `PredictiveEngine` | Performance prediction | Gradient boosting |

### Pipeline Processing

1. **Ingestion** — Collect session data, assessment results, interaction logs
2. **Profiling** — Update learner profiles with new behavioral signals
3. **Analysis** — Run gap detection, engagement scoring, style refinement
4. **Adaptation** — Adjust difficulty, modify content sequence, schedule reviews
5. **Delivery** — Push adapted content to learner interface
6. **Logging** — Record all adaptation decisions for analytics and A/B testing
7. **Reporting** — Generate instructor insights and cohort analytics

## School Isolation

All operations are filtered by `schoolId`:
- Repository: `.eq('school_id', schoolId)`
- Service: `schoolId` parameter required
- API Route: `schoolId` in query params or body
- Hook: `schoolId` as dependency

## Real-time Adaptation

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Session     │───▶│  Performance │───▶│  Adjustment │
│  Tracker     │    │  Analyzer    │    │  Decision   │
└─────────────┘    └──────────────┘    └──────┬──────┘
                                              │
                   ┌──────────────┐    ┌──────▼──────┐
                   │  Adaptation  │◀───│  Content    │
                   │  Logger      │    │  Modifier   │
                   └──────────────┘    └─────────────┘
```

### Adjustment Types

| Type | Trigger | Action |
|------|---------|--------|
| Difficulty | Performance drop below 60% | Reduce difficulty by 0.1 |
| Pacing | Session time > 45 min | Insert break suggestion |
| Modality | Engagement < 40% | Switch to alternative format |
| Review | Forgetting curve threshold | Schedule review session |
| Hint | 3+ incorrect attempts | Provide scaffolded hint |

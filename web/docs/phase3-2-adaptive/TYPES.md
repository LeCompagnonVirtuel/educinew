# Types — Phase 3.2 Adaptive Learning Intelligence

## Overview

5 type definition files located in `packages/types/`. Contains ~91 enums and ~189 interfaces defining the complete adaptive learning domain model.

## Files

```
packages/types/
├── adaptive-learning-core.ts              # Core profile, path, content, difficulty
├── adaptive-student-intelligence.ts       # Knowledge gaps, competency, mastery
├── adaptive-ai-tutor-analytics.ts         # AI tutor, analytics, assessment
├── adaptive-recommendations-competency.ts # Recommendations, competency framework
└── adaptive-gamification-parent-teacher.ts # Gamification, parent, teacher AI
```

## adaptive-learning-core.ts (20 enums, 25 interfaces)

### Enums

```typescript
export enum LearningStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  READING_WRITING = 'reading_writing',
}

export enum CognitiveLoad {
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
}

export enum MotivationLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  INTRINSIC = 'intrinsic',
}

export enum LearningPace {
  SLOW = 'slow',
  MODERATE = 'moderate',
  FAST = 'fast',
}

export enum ContentFormat {
  TEXT = 'text',
  VIDEO = 'video',
  INTERACTIVE = 'interactive',
  AUDIO = 'audio',
  IMAGE = 'image',
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  ELEMENTARY = 'elementary',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export enum PathStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export enum NodeType {
  LESSON = 'lesson',
  ASSESSMENT = 'assessment',
  PRACTICE = 'practice',
  REVIEW = 'review',
}

export enum EngagementLevel {
  DISENGAGED = 'disengaged',
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  DEEP = 'deep',
}

export enum SessionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
}

export enum FeedbackType {
  POSITIVE = 'positive',
  CONSTRUCTIVE = 'constructive',
  NEUTRAL = 'neutral',
}

export enum GoalStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  ACHIEVED = 'achieved',
  OVERDUE = 'overdue',
}

export enum NotificationType {
  REMINDER = 'reminder',
  ACHIEVEMENT = 'achievement',
  DEADLINE = 'deadline',
  RECOMMENDATION = 'recommendation',
}

export enum AlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical',
}

export enum AdaptationType {
  DIFFICULTY = 'difficulty',
  PACING = 'pacing',
  MODALITY = 'modality',
  CONTENT = 'content',
  SEQUENCE = 'sequence',
}

export enum ExperimentStatus {
  DRAFT = 'draft',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export enum MasteryLevel {
  NOVICE = 'novice',
  BEGINNER = 'beginner',
  COMPETENT = 'competent',
  PROFICIENT = 'proficient',
  EXPERT = 'expert',
}

export enum RepetitionQuality {
  BLACKOUT = 0,
  INCORRECT = 1,
  DIFFICULT = 2,
  HARD = 3,
  GOOD = 4,
  EASY = 5,
}
```

### Interfaces

```typescript
export interface AdaptiveProfile {
  id: string;
  school_id: string;
  user_id: string;
  learning_style: LearningStyle;
  cognitive_load: CognitiveLoad;
  prior_knowledge: number;
  motivation_level: MotivationLevel;
  learning_pace: LearningPace;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface LearningPath {
  id: string;
  school_id: string;
  title: string;
  description: string;
  status: PathStatus;
  difficulty: DifficultyLevel;
  estimated_hours: number;
  created_at: string;
}

export interface LearningPathNode {
  id: string;
  path_id: string;
  title: string;
  type: NodeType;
  order: number;
  prerequisites: string[];
}

export interface ContentItem {
  id: string;
  school_id: string;
  title: string;
  format: ContentFormat;
  difficulty: DifficultyLevel;
  engagement_score: number;
}

export interface DifficultyProfile {
  id: string;
  user_id: string;
  current_difficulty: number;
  zpd_lower: number;
  zpd_upper: number;
  mastery_level: number;
  k_factor: number;
  last_adjusted_at: string;
}

export interface LearningSession {
  id: string;
  school_id: string;
  user_id: string;
  status: SessionStatus;
  duration_minutes: number;
  engagement_score: number;
}

export interface LearningGoal {
  id: string;
  school_id: string;
  user_id: string;
  title: string;
  target_date: string;
  status: GoalStatus;
  progress: number;
}

export interface AdaptiveFeedback {
  id: string;
  school_id: string;
  user_id: string;
  type: FeedbackType;
  content: string;
  rating: number;
}

export interface AdaptiveNotification {
  id: string;
  school_id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
}

export interface ProgressTracker {
  id: string;
  school_id: string;
  user_id: string;
  entity_type: string;
  entity_id: string;
  progress: number;
  status: string;
}

export interface EngagementPattern {
  id: string;
  user_id: string;
  pattern_type: string;
  frequency: number;
  intensity: number;
}

export interface Experiment {
  id: string;
  school_id: string;
  name: string;
  status: ExperimentStatus;
  hypothesis: string;
}

export interface RealtimeAdjustment {
  id: string;
  user_id: string;
  adaptation_type: AdaptationType;
  old_value: number;
  new_value: number;
}

export interface SkillDependency {
  id: string;
  skill_id: string;
  depends_on: string;
  strength: number;
}

export interface MasteryBadge {
  id: string;
  user_id: string;
  badge_name: string;
  earned_at: string;
}

export interface PointBalance {
  id: string;
  user_id: string;
  balance: number;
  lifetime_earned: number;
}

export interface LearningStreak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity: string;
}

export interface Leaderboard {
  id: string;
  school_id: string;
  name: string;
  period: string;
}

export interface ContentRecommendation {
  id: string;
  user_id: string;
  content_id: string;
  score: number;
  reason: string;
}

export interface AccessibilityProfile {
  id: string;
  user_id: string;
  accommodations: string[];
  preferred_format: ContentFormat;
}

export interface CurriculumMapping {
  id: string;
  school_id: string;
  standard_id: string;
  content_id: string;
  alignment_score: number;
}
```

## adaptive-student-intelligence.ts (20 enums, 30 interfaces)

### Enums

```typescript
export enum GapSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum CompetencyStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  ACHIEVED = 'achieved',
  EXCEEDED = 'exceeded',
}

export enum AssessmentType {
  DIAGNOSTIC = 'diagnostic',
  FORMATIVE = 'formative',
  SUMMATIVE = 'summative',
  SELF = 'self',
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer',
  ESSAY = 'essay',
  MATCHING = 'matching',
}

export enum RubricLevel {
  BEGINNING = 'beginning',
  DEVELOPING = 'developing',
  PROFICIENT = 'proficient',
  ADVANCED = 'advanced',
}

export enum RemediationType {
  VIDEO = 'video',
  PRACTICE = 'practice',
  READING = 'reading',
  TUTORING = 'tutoring',
}

export enum SkillCategory {
  COGNITIVE = 'cognitive',
  PSYCHOMOTOR = 'psychomotor',
  AFFECTIVE = 'affective',
}

export enum BloomLevel {
  REMEMBER = 'remember',
  UNDERSTAND = 'understand',
  APPLY = 'apply',
  ANALYZE = 'analyze',
  EVALUATE = 'evaluate',
  CREATE = 'create',
}

export enum ProgressDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable',
}

export enum CompetencyFramework {
  COMMON_CORE = 'common_core',
  NGSS = 'ngss',
  STATE = 'state',
  CUSTOM = 'custom',
}

export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum AssessmentStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  GRADED = 'graded',
}

export enum GapType {
  SKILL = 'skill',
  KNOWLEDGE = 'knowledge',
  CONCEPT = 'concept',
}

export enum RemediationStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum MasteryStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  ACHIEVED = 'achieved',
  MAINTAINED = 'maintained',
}

export enum CertificateStatus {
  PENDING = 'pending',
  ISSUED = 'issued',
  EXPIRED = 'expired',
}

export enum PrerequisiteType {
  REQUIRED = 'required',
  RECOMMENDED = 'recommended',
}

export enum PrerequisiteStatus {
  MET = 'met',
  NOT_MET = 'not_met',
  WAIVED = 'waived',
}

export enum ObjectiveStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  ACHIEVED = 'achieved',
}
```

## adaptive-ai-tutor-analytics.ts (16 enums, 40 interfaces)

### Enums

```typescript
export enum TutorMode {
  GUIDED = 'guided',
  EXPLORATORY = 'exploratory',
  ASSESSMENT = 'assessment',
  REVIEW = 'review',
}

export enum HintLevel {
  NONE = 'none',
  SUBTLE = 'subtle',
  MODERATE = 'moderate',
  DIRECT = 'direct',
}

export enum ExplanationStyle {
  ANALOGY = 'analogy',
  EXAMPLE = 'example',
  STEP_BY_STEP = 'step_by_step',
  VISUAL = 'visual',
}

export enum AnalyticsGranularity {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export enum MetricType {
  ENGAGEMENT = 'engagement',
  PERFORMANCE = 'performance',
  TIME = 'time',
  PROGRESS = 'progress',
}

export enum TrendDirection {
  IMPROVING = 'improving',
  DECLINING = 'declining',
  STABLE = 'stable',
}

export enum CohortSegment {
  HIGH_PERFORMERS = 'high_performers',
  AVERAGE = 'average',
  STRUGGLING = 'struggling',
  AT_RISK = 'at_risk',
}

export enum EngagementTrigger {
  IDLE = 'idle',
  STRUGGLING = 'struggling',
  RAPID = 'rapid',
  ERRATIC = 'erratic',
}

export enum PredictionConfidence {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum ABTestMetric {
  COMPLETION = 'completion',
  SCORE = 'score',
  TIME = 'time',
  ENGAGEMENT = 'engagement',
}

export enum ExperimentAssignment {
  CONTROL = 'control',
  VARIANT_A = 'variant_a',
  VARIANT_B = 'variant_b',
  VARIANT_C = 'variant_c',
}

export enum StatisticalSignificance {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum InterventionType {
  CONTENT_CHANGE = 'content_change',
  DIFFICULTY_ADJUST = 'difficulty_adjust',
  HINT_PROVIDE = 'hint_provide',
  REMINDER = 'reminder',
}

export enum InterventionStatus {
  PLANNED = 'planned',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum InsightType {
  PATTERN = 'pattern',
  ANOMALY = 'anomaly',
  TREND = 'trend',
  RECOMMENDATION = 'recommendation',
}

export enum AlertStatus {
  ACTIVE = 'active',
  ACKNOWLEDGED = 'acknowledged',
  RESOLVED = 'resolved',
}
```

## adaptive-recommendations-competency.ts (18 enums, 46 interfaces)

### Enums

```typescript
export enum RecommendationType {
  CONTENT = 'content',
  PATH = 'path',
  PEER = 'peer',
  RESOURCE = 'resource',
}

export enum RecommendationSource {
  COLLABORATIVE = 'collaborative',
  CONTENT_BASED = 'content_based',
  HYBRID = 'hybrid',
  RULE_BASED = 'rule_based',
}

export enum CompetencyLevel {
  NOVICE = 'novice',
  BEGINNER = 'beginner',
  COMPETENT = 'competent',
  PROFICIENT = 'proficient',
  EXPERT = 'expert',
}

export enum FrameworkType {
  BLOOM = 'bloom',
  WEBB = 'webb',
  MARZANO = 'marzano',
  CUSTOM = 'custom',
}

export enum AlignmentStatus {
  ALIGNED = 'aligned',
  PARTIAL = 'partial',
  NOT_ALIGNED = 'not_aligned',
}

export enum MappingStatus {
  MAPPED = 'mapped',
  UNMAPPED = 'unmapped',
  CONFLICT = 'conflict',
}

export enum ObjectiveType {
  LEARNING = 'learning',
  PERFORMANCE = 'performance',
  TRANSFER = 'transfer',
}

export enum PrerequisiteRelation {
  HARD = 'hard',
  SOFT = 'soft',
}

export enum MasteryPath {
  LINEAR = 'linear',
  BRANCHING = 'branching',
  MODULAR = 'modular',
}

export enum CompetencyAssessmentType {
  PORTFOLIO = 'portfolio',
  OBSERVATION = 'observation',
  TEST = 'test',
  PROJECT = 'project',
}

export enum FrameworkStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export enum SkillLevel {
  EMERGING = 'emerging',
  DEVELOPING = 'developing',
  PROFICIENT = 'proficient',
  MASTERY = 'mastery',
}

export enum CrossCompetencyRelation {
  SUPPORTS = 'supports',
  REQUIRES = 'requires',
  ENHANCES = 'enhances',
}

export enum AssessmentRubric {
  ANALYTIC = 'analytic',
  HOLISTIC = 'holistic',
  SINGLE_POINT = 'single_point',
}

export enum ProgressDirection {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
  LATERAL = 'lateral',
}

export enum CompetencyWeight {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum FrameworkVersion {
  V1 = 'v1',
  V2 = 'v2',
  CURRENT = 'current',
}

export enum AlignmentMetric {
  COVERAGE = 'coverage',
  DEPTH = 'depth',
  BREADTH = 'breadth',
}
```

## adaptive-gamification-parent-teacher.ts (17 enums, 48 interfaces)

### Enums

```typescript
export enum AchievementCategory {
  LEARNING = 'learning',
  SOCIAL = 'social',
  CONSISTENCY = 'consistency',
  MASTERY = 'mastery',
}

export enum PointType {
  COMPLETION = 'completion',
  BONUS = 'bonus',
  STREAK = 'streak',
  ACHIEVEMENT = 'achievement',
}

export enum LeaderboardPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ALL_TIME = 'all_time',
}

export enum StreakType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  CUSTOM = 'custom',
}

export enum RewardType {
  BADGE = 'badge',
  POINT = 'point',
  CERTIFICATE = 'certificate',
  UNLOCK = 'unlock',
}

export enum GamificationEvent {
  LESSON_COMPLETE = 'lesson_complete',
  ASSESSMENT_PASS = 'assessment_pass',
  STREAK_MILESTONE = 'streak_milestone',
  PEER_HELP = 'peer_help',
}

export enum ParentInsightType {
  PROGRESS = 'progress',
  ENGAGEMENT = 'engagement',
  CONCERN = 'concern',
  ACHIEVEMENT = 'achievement',
}

export enum ParentNotificationType {
  DAILY_SUMMARY = 'daily_summary',
  MILESTONE = 'milestone',
  CONCERN = 'concern',
  REMINDER = 'reminder',
}

export enum TeacherAssistMode {
  DASHBOARD = 'dashboard',
  INTERVENTION = 'intervention',
  ANALYTICS = 'analytics',
  PLANNING = 'planning',
}

export enum ClassInsightType {
  PERFORMANCE = 'performance',
  ENGAGEMENT = 'engagement',
  GAP = 'gap',
  TREND = 'trend',
}

export enum InterventionPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum AdminMetricType {
  ENROLLMENT = 'enrollment',
  PERFORMANCE = 'performance',
  ENGAGEMENT = 'engagement',
  RETENTION = 'retention',
}

export enum ReportFormat {
  SUMMARY = 'summary',
  DETAILED = 'detailed',
  COMPARISON = 'comparison',
}

export enum BadgeRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  LEGENDARY = 'legendary',
}

export enum SocialComparisonType {
  PEERS = 'peers',
  CLASS = 'class',
  SCHOOL = 'school',
}

export enum MilestoneStatus {
  UPCOMING = 'upcoming',
  REACHED = 'reached',
  EXCEEDED = 'exceeded',
}

export enum AdminEntityType {
  SCHOOL = 'school',
  CLASS = 'class',
  STUDENT = 'student',
}
```

## Total Count

| File | Enums | Interfaces | Total |
|------|-------|------------|-------|
| adaptive-learning-core.ts | 20 | 25 | 45 |
| adaptive-student-intelligence.ts | 20 | 30 | 50 |
| adaptive-ai-tutor-analytics.ts | 16 | 40 | 56 |
| adaptive-recommendations-competency.ts | 18 | 46 | 64 |
| adaptive-gamification-parent-teacher.ts | 17 | 48 | 65 |
| **Total** | **91** | **189** | **280** |

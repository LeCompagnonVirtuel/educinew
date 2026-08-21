# Phase 3.2 — Adaptive Learning Intelligence

## Overview

Phase 3.2 Adaptive Learning Intelligence constitutes the personalized learning brain of the EduCI ecosystem. It builds upon the intelligence platform (Phase 3.1) to deliver individualized learning experiences, real-time content adaptation, knowledge gap detection, and competency-based progression for every learner in the system.

## Architecture

```
src/features/adaptive/
├── types.ts                          # Re-exported types from @educi/types
├── repositories/
│   └── adaptive.repository.ts        # AdaptiveRepositoryImpl (220+ CRUD methods)
├── services/                         # 120 services
│   ├── adp-profile.service.ts
│   ├── adp-learning-path.service.ts
│   ├── adp-content-delivery.service.ts
│   ├── adp-difficulty-engine.service.ts
│   ├── adp-knowledge-gap.service.ts
│   ├── adp-competency.service.ts
│   ├── adp-assessment.service.ts
│   ├── adp-spaced-repetition.service.ts
│   ├── adp-learning-style.service.ts
│   ├── adp-recommendation.service.ts
│   ├── adp-analytics.service.ts
│   ├── adp-ab-testing.service.ts
│   ├── adp-realtime-adjustment.service.ts
│   ├── adp-prerequisite.service.ts
│   ├── adp-mastery.service.ts
│   ├── adp-session.service.ts
│   ├── adp-engagement.service.ts
│   ├── adp-feedback.service.ts
│   ├── adp-goal.service.ts
│   ├── adp-streak.service.ts
│   ├── adp-leaderboard.service.ts
│   ├── adp-notification.service.ts
│   ├── adp-progress.service.ts
│   ├── adp-adaptation-log.service.ts
│   └── ... (120 services total)
├── hooks/                            # 100+ hooks (list + actions × entities)
│   ├── use-adp-profile-list.ts
│   ├── use-adp-profile-actions.ts
│   └── ...
├── validators/                       # 6 Zod validator files
│   ├── adaptive-core.ts
│   ├── adaptive-learning.ts
│   ├── adaptive-content.ts
│   ├── adaptive-assessment.ts
│   ├── adaptive-analytics.ts
│   └── adaptive-social.ts
├── api/                              # 180+ API route handlers
│   ├── profiles/
│   ├── learning-paths/
│   ├── content/
│   ├── assessments/
│   ├── analytics/
│   └── ...
└── mobile/                           # 40 React Native screens
    ├── AdaptiveDashboardScreen.tsx
    ├── LearningPathScreen.tsx
    └── ...
```

## Entities (120 entities)

| Category | Entity | Supabase Table |
|----------|--------|----------------|
| **Learner Profile** | AdaptiveProfile | `adaptive_profiles` |
| | LearningStyleProfile | `adaptive_learning_styles` |
| | LearnerPreferences | `adaptive_learner_preferences` |
| | LearnerHistory | `adaptive_learner_history` |
| **Learning Paths** | LearningPath | `adaptive_learning_paths` |
| | LearningPathNode | `adaptive_learning_path_nodes` |
| | PathEnrollment | `adaptive_path_enrollments` |
| | PathProgress | `adaptive_path_progress` |
| | PathOptimization | `adaptive_path_optimizations` |
| **Content Delivery** | ContentItem | `adaptive_content_items` |
| | ContentVariant | `adaptive_content_variants` |
| | DeliveryRule | `adaptive_delivery_rules` |
| | ContentFeedback | `adaptive_content_feedback` |
| | ContentEngagement | `adaptive_content_engagement` |
| **Difficulty Engine** | DifficultyProfile | `adaptive_difficulty_profiles` |
| | DifficultyAdjustment | `adaptive_difficulty_adjustments` |
| | DifficultyHistory | `adaptive_difficulty_history` |
| | ZoneOfProximalDev | `adaptive_zpd_profiles` |
| **Knowledge Gaps** | KnowledgeGap | `adaptive_knowledge_gaps` |
| | GapAnalysis | `adaptive_gap_analyses` |
| | GapRemediation | `adaptive_gap_remediations` |
| | SkillDependency | `adaptive_skill_dependencies` |
| | SkillTree | `adaptive_skill_trees` |
| **Competency** | Competency | `adaptive_competencies` |
| | CompetencyLevel | `adaptive_competency_levels` |
| | CompetencyProgress | `adaptive_competency_progress` |
| | CompetencyAssessment | `adaptive_competency_assessments` |
| | CompetencyFramework | `adaptive_competency_frameworks` |
| **Assessment** | AdaptiveAssessment | `adaptive_assessments` |
| | AssessmentQuestion | `adaptive_assessment_questions` |
| | AssessmentResponse | `adaptive_assessment_responses` |
| | AssessmentResult | `adaptive_assessment_results` |
| | QuestionBank | `adaptive_question_banks` |
| | QuestionItem | `adaptive_question_items` |
| **Spaced Repetition** | RepetitionCard | `adaptive_repetition_cards` |
| | RepetitionSchedule | `adaptive_repetition_schedules` |
| | RepetitionReview | `adaptive_repetition_reviews` |
| | SpacedAlgorithm | `adaptive_spaced_algorithms` |
| **Recommendation** | ContentRecommendation | `adaptive_content_recommendations` |
| | PathRecommendation | `adaptive_path_recommendations` |
| | PeerRecommendation | `adaptive_peer_recommendations` |
| | ResourceRecommendation | `adaptive_resource_recommendations` |
| **Analytics** | LearningSession | `adaptive_learning_sessions` |
| | SessionAnalytics | `adaptive_session_analytics` |
| | LearnerAnalytics | `adaptive_learner_analytics` |
| | CohortAnalytics | `adaptive_cohort_analytics` |
| | EngagementMetric | `adaptive_engagement_metrics` |
| **A/B Testing** | Experiment | `adaptive_experiments` |
| | ExperimentVariant | `adaptive_experiment_variants` |
| | ExperimentAssignment | `adaptive_experiment_assignments` |
| | ExperimentResult | `adaptive_experiment_results` |
| | ExperimentMetric | `adaptive_experiment_metrics` |
| **Real-time** | RealtimeAdjustment | `adaptive_realtime_adjustments` |
| | AdaptationLog | `adaptive_adaptation_logs` |
| | PerformanceSnapshot | `adaptive_performance_snapshots` |
| | AlertRule | `adaptive_alert_rules` |
| **Prerequisite** | Prerequisite | `adaptive_prerequisites` |
| | PrerequisiteCheck | `adaptive_prerequisite_checks` |
| | PrerequisiteOverride | `adaptive_prerequisite_overrides` |
| **Mastery** | MasteryLevel | `adaptive_mastery_levels` |
| | MasteryProgress | `adaptive_mastery_progress` |
| | MasteryBadge | `adaptive_mastery_badges` |
| | MasteryCertificate | `adaptive_mastery_certificates` |
| **Session** | AdaptiveSession | `adaptive_sessions` |
| | SessionGoal | `adaptive_session_goals` |
| | SessionCheckpoint | `adaptive_session_checkpoints` |
| | SessionReward | `adaptive_session_rewards` |
| **Engagement** | EngagementPattern | `adaptive_engagement_patterns` |
| | EngagementTrigger | `adaptive_engagement_triggers` |
| | EngagementScore | `adaptive_engagement_scores` |
| | MotivationProfile | `adaptive_motivation_profiles` |
| **Feedback** | AdaptiveFeedback | `adaptive_feedback_entries` |
| | FeedbackRequest | `adaptive_feedback_requests` |
| | FeedbackTemplate | `adaptive_feedback_templates` |
| | FeedbackAnalytics | `adaptive_feedback_analytics` |
| **Goals** | LearningGoal | `adaptive_learning_goals` |
| | GoalMilestone | `adaptive_goal_milestones` |
| | GoalProgress | `adaptive_goal_progress` |
| | GoalReminder | `adaptive_goal_reminders` |
| **Gamification** | LearningStreak | `adaptive_learning_streaks` |
| | Leaderboard | `adaptive_leaderboards` |
| | LeaderboardEntry | `adaptive_leaderboard_entries` |
| | Achievement | `adaptive_achievements` |
| | PointBalance | `adaptive_point_balances` |
| **Notifications** | AdaptiveNotification | `adaptive_notifications` |
| | NotificationPreference | `adaptive_notification_preferences` |
| | NotificationSchedule | `adaptive_notification_schedules` |
| **Progress** | ProgressTracker | `adaptive_progress_trackers` |
| | ProgressSnapshot | `adaptive_progress_snapshots` |
| | ProgressReport | `adaptive_progress_reports` |
| **Social Learning** | StudyGroup | `adaptive_study_groups` |
| | GroupActivity | `adaptive_group_activities` |
| | PeerReview | `adaptive_peer_reviews` |
| | CollaborativeTask | `adaptive_collaborative_tasks` |
| | DiscussionThread | `adaptive_discussion_threads` |
| **Content Curation** | ContentCollection | `adaptive_content_collections` |
| | CurationRule | `adaptive_curation_rules` |
| | ContentTag | `adaptive_content_tags` |
| | ContentRating | `adaptive_content_ratings` |
| **Accessibility** | AccessibilityProfile | `adaptive_accessibility_profiles` |
| | AccessibilityRule | `adaptive_accessibility_rules` |
| | Accommodation | `adaptive_accommodations` |
| | AccessibilityAudit | `adaptive_accessibility_audits` |
| **Instructor** | InstructorInsight | `adaptive_instructor_insights` |
| | ClassAdaptation | `adaptive_class_adaptations` |
| | InterventionPlan | `adaptive_intervention_plans` |
| | InterventionAction | `adaptive_intervention_actions` |
| **Curriculum** | CurriculumMapping | `adaptive_curriculum_mappings` |
| | CurriculumAlignment | `adaptive_curriculum_alignments` |
| | LearningObjective | `adaptive_learning_objectives` |
| | ObjectiveProgress | `adaptive_objective_progress` |

## Features

### Adaptive Learning Profiles
- Learning style detection (VARK, Kolb, Dunn & Dunn)
- Cognitive load assessment and monitoring
- Prior knowledge evaluation
- Motivation and engagement profiling
- Learning pace calibration

### Intelligent Content Delivery
- Dynamic content sequencing
- Multi-modal content adaptation (text, video, interactive)
- Context-aware delivery rules
- A/B testing for content variants
- Real-time content performance optimization

### Difficulty Engine
- Zone of Proximal Development (ZPD) modeling
- Elo-rating inspired difficulty calibration
- Real-time difficulty adjustment per learner
- Difficulty history tracking and trend analysis
- Cross-topic difficulty transfer

### Knowledge Gap Analysis
- Skill dependency graph traversal
- Automated gap identification from assessment data
- Remediation pathway generation
- Skill tree visualization and progression
- Gap severity scoring and prioritization

### Competency-Based Progression
- Multi-level competency frameworks
- Granular competency tracking
- Cross-competency mapping
- Mastery-based advancement
- Competency assessment rubrics

### Spaced Repetition
- SM-2 and FSRS algorithm support
- Optimal review scheduling
- Forgetting curve modeling
- Card difficulty calibration
- Review analytics and retention metrics

### Social Learning
- Adaptive study group formation
- Peer review workflows
- Collaborative task assignment
- Discussion thread recommendations
- Group performance analytics

### Analytics & Insights
- Real-time learning session analytics
- Cohort-level learning patterns
- Engagement trend detection
- Predictive performance modeling
- Instructor-facing dashboards

## Dependencies

- `@educi/types` — Shared types (~95 enums, ~900 interfaces)
- `@educi/errors` — Error hierarchy (910+ Adaptive*Error classes)
- Supabase — Database and authentication
- Zod — Schema validation (234 schemas)
- Next.js — API routes and React Server Components
- React Native/Expo — Mobile application (40 screens)

# API Routes — Phase 3.2 Adaptive Learning Intelligence

## Structure

All API routes are located under `src/app/api/adaptive/`.

Each entity has:
- `route.ts` — GET (list) + POST (create)
- `[id]/route.ts` — GET (by id) + PUT (update) + DELETE

## Routes (120 entities × 2 files = 240 route files, 180+ unique endpoints)

### Learner Profiles

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/profiles` | GET | List profiles | `AdpProfileService.listProfiles` |
| `POST /api/adaptive/profiles` | POST | Create profile | `AdpProfileService.createProfile` |
| `GET /api/adaptive/profiles/[id]` | GET | Profile detail | `AdpProfileService.getProfile` |
| `PUT /api/adaptive/profiles/[id]` | PUT | Update profile | `AdpProfileService.updateProfile` |
| `DELETE /api/adaptive/profiles/[id]` | DELETE | Delete profile | `AdpProfileService.deleteProfile` |
| `POST /api/adaptive/profiles/[id]/analyze-style` | POST | Analyze learning style | `AdpProfileService.analyzeLearningStyle` |
| `GET /api/adaptive/profiles/[id]/history` | GET | Get learner history | `AdpProfileService.getLearnerHistory` |
| `PUT /api/adaptive/profiles/[id]/preferences` | PUT | Update preferences | `AdpProfileService.updatePreferences` |

### Learning Style

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/learning-styles` | GET | List learning styles | `AdpLearningStyleService.listStyles` |
| `POST /api/adaptive/learning-styles` | POST | Create style profile | `AdpLearningStyleService.createStyle` |
| `GET /api/adaptive/learning-styles/[id]` | GET | Style detail | `AdpLearningStyleService.getStyle` |
| `PUT /api/adaptive/learning-styles/[id]` | PUT | Update style | `AdpLearningStyleService.updateStyle` |
| `POST /api/adaptive/learning-styles/assess` | POST | Run assessment | `AdpLearningStyleService.assess` |
| `GET /api/adaptive/learning-styles/compare` | GET | Compare styles | `AdpLearningStyleService.compare` |

### Learning Paths

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/learning-paths` | GET | List learning paths | `AdpLearningPathService.listPaths` |
| `POST /api/adaptive/learning-paths` | POST | Create learning path | `AdpLearningPathService.createPath` |
| `GET /api/adaptive/learning-paths/[id]` | GET | Path detail | `AdpLearningPathService.getPath` |
| `PUT /api/adaptive/learning-paths/[id]` | PUT | Update path | `AdpLearningPathService.updatePath` |
| `DELETE /api/adaptive/learning-paths/[id]` | DELETE | Delete path | `AdpLearningPathService.deletePath` |
| `GET /api/adaptive/learning-paths/[id]/nodes` | GET | Get path nodes | `AdpLearningPathService.getPathNodes` |
| `POST /api/adaptive/learning-paths/[id]/enroll` | POST | Enroll in path | `AdpLearningPathService.enroll` |
| `PUT /api/adaptive/learning-paths/[id]/optimize` | PUT | Optimize path | `AdpLearningPathService.optimize` |
| `GET /api/adaptive/learning-paths/[id]/progress` | GET | Get progress | `AdpLearningPathService.getProgress` |
| `POST /api/adaptive/learning-paths/[id]/clone` | POST | Clone path | `AdpLearningPathService.clonePath` |

### Content Delivery

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/content` | GET | List content items | `AdpContentDeliveryService.listContent` |
| `POST /api/adaptive/content` | POST | Create content | `AdpContentDeliveryService.createContent` |
| `GET /api/adaptive/content/[id]` | GET | Content detail | `AdpContentDeliveryService.getContent` |
| `PUT /api/adaptive/content/[id]` | PUT | Update content | `AdpContentDeliveryService.updateContent` |
| `DELETE /api/adaptive/content/[id]` | DELETE | Delete content | `AdpContentDeliveryService.deleteContent` |
| `GET /api/adaptive/content/[id]/variants` | GET | Get variants | `AdpContentDeliveryService.getVariants` |
| `POST /api/adaptive/content/[id]/variants` | POST | Create variant | `AdpContentDeliveryService.createVariant` |
| `POST /api/adaptive/content/deliver` | POST | Deliver content | `AdpContentDeliveryService.deliver` |
| `GET /api/adaptive/content/rules` | GET | List delivery rules | `AdpContentDeliveryService.listRules` |
| `POST /api/adaptive/content/rules` | POST | Create rule | `AdpContentDeliveryService.createRule` |
| `GET /api/adaptive/content/engagement` | GET | Get engagement data | `AdpContentDeliveryService.getEngagement` |

### Difficulty Engine

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/difficulty/profiles` | GET | List difficulty profiles | `AdpDifficultyEngineService.listProfiles` |
| `POST /api/adaptive/difficulty/profiles` | POST | Create profile | `AdpDifficultyEngineService.createProfile` |
| `GET /api/adaptive/difficulty/profiles/[id]` | GET | Profile detail | `AdpDifficultyEngineService.getProfile` |
| `PUT /api/adaptive/difficulty/profiles/[id]/adjust` | PUT | Adjust difficulty | `AdpDifficultyEngineService.adjust` |
| `GET /api/adaptive/difficulty/profiles/[id]/history` | GET | Adjustment history | `AdpDifficultyEngineService.getHistory` |
| `GET /api/adaptive/difficulty/zpd/[userId]` | GET | Get ZPD profile | `AdpDifficultyEngineService.getZPD` |
| `PUT /api/adaptive/difficulty/zpd/[userId]` | PUT | Update ZPD | `AdpDifficultyEngineService.updateZPD` |

### Knowledge Gaps

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/knowledge-gaps` | GET | List gaps | `AdpKnowledgeGapService.listGaps` |
| `POST /api/adaptive/knowledge-gaps/detect` | POST | Detect gaps | `AdpKnowledgeGapService.detect` |
| `GET /api/adaptive/knowledge-gaps/[id]` | GET | Gap detail | `AdpKnowledgeGapService.getGap` |
| `PUT /api/adaptive/knowledge-gaps/[id]/remediate` | PUT | Generate remediation | `AdpKnowledgeGapService.remediate` |
| `GET /api/adaptive/knowledge-gaps/analysis/[userId]` | GET | Full analysis | `AdpKnowledgeGapService.analyze` |
| `GET /api/adaptive/skill-trees` | GET | List skill trees | `AdpKnowledgeGapService.listSkillTrees` |
| `POST /api/adaptive/skill-trees` | POST | Create skill tree | `AdpKnowledgeGapService.createSkillTree` |
| `GET /api/adaptive/skill-dependencies` | GET | List dependencies | `AdpKnowledgeGapService.listDependencies` |
| `POST /api/adaptive/skill-dependencies` | POST | Create dependency | `AdpKnowledgeGapService.createDependency` |

### Competency

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/competencies` | GET | List competencies | `AdpCompetencyService.listCompetencies` |
| `POST /api/adaptive/competencies` | POST | Create competency | `AdpCompetencyService.createCompetency` |
| `GET /api/adaptive/competencies/[id]` | GET | Competency detail | `AdpCompetencyService.getCompetency` |
| `PUT /api/adaptive/competencies/[id]` | PUT | Update competency | `AdpCompetencyService.updateCompetency` |
| `GET /api/adaptive/competencies/[id]/progress` | GET | Get progress | `AdpCompetencyService.getProgress` |
| `POST /api/adaptive/competencies/[id]/assess` | POST | Assess competency | `AdpCompetencyService.assess` |
| `GET /api/adaptive/competency-frameworks` | GET | List frameworks | `AdpCompetencyService.listFrameworks` |
| `POST /api/adaptive/competency-frameworks` | POST | Create framework | `AdpCompetencyService.createFramework` |
| `GET /api/adaptive/competency-levels` | GET | List levels | `AdpCompetencyService.listLevels` |
| `POST /api/adaptive/competency-levels` | POST | Create level | `AdpCompetencyService.createLevel` |

### Assessment

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/assessments` | GET | List assessments | `AdpAssessmentService.listAssessments` |
| `POST /api/adaptive/assessments` | POST | Create assessment | `AdpAssessmentService.createAssessment` |
| `GET /api/adaptive/assessments/[id]` | GET | Assessment detail | `AdpAssessmentService.getAssessment` |
| `PUT /api/adaptive/assessments/[id]` | PUT | Update assessment | `AdpAssessmentService.updateAssessment` |
| `POST /api/adaptive/assessments/[id]/submit` | POST | Submit response | `AdpAssessmentService.submitResponse` |
| `GET /api/adaptive/assessments/[id]/results` | GET | Get results | `AdpAssessmentService.getResults` |
| `POST /api/adaptive/assessments/[id]/generate` | POST | Generate questions | `AdpAssessmentService.generateQuestions` |
| `GET /api/adaptive/question-banks` | GET | List question banks | `AdpAssessmentService.listQuestionBanks` |
| `POST /api/adaptive/question-banks` | POST | Create question bank | `AdpAssessmentService.createQuestionBank` |
| `GET /api/adaptive/question-items` | GET | List questions | `AdpAssessmentService.listQuestions` |
| `POST /api/adaptive/question-items` | POST | Create question | `AdpAssessmentService.createQuestion` |

### Spaced Repetition

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/repetition/cards` | GET | List cards | `AdpSpacedRepetitionService.listCards` |
| `POST /api/adaptive/repetition/cards` | POST | Create card | `AdpSpacedRepetitionService.createCard` |
| `GET /api/adaptive/repetition/cards/[id]` | GET | Card detail | `AdpSpacedRepetitionService.getCard` |
| `POST /api/adaptive/repetition/cards/[id]/review` | POST | Submit review | `AdpSpacedRepetitionService.reviewCard` |
| `GET /api/adaptive/repetition/schedule` | GET | Get review schedule | `AdpSpacedRepetitionService.getSchedule` |
| `POST /api/adaptive/repetition/schedule/optimize` | POST | Optimize schedule | `AdpSpacedRepetitionService.optimizeSchedule` |
| `GET /api/adaptive/repetition/algorithms` | GET | List algorithms | `AdpSpacedRepetitionService.listAlgorithms` |
| `GET /api/adaptive/repetition/analytics` | GET | Retention analytics | `AdpSpacedRepetitionService.getAnalytics` |

### Recommendation

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/recommendations/content` | GET | Content recommendations | `AdpRecommendationService.getContentRecs` |
| `GET /api/adaptive/recommendations/paths` | GET | Path recommendations | `AdpRecommendationService.getPathRecs` |
| `GET /api/adaptive/recommendations/peers` | GET | Peer recommendations | `AdpRecommendationService.getPeerRecs` |
| `GET /api/adaptive/recommendations/resources` | GET | Resource recommendations | `AdpRecommendationService.getResourceRecs` |
| `POST /api/adaptive/recommendations/generate` | POST | Generate recommendations | `AdpRecommendationService.generate` |
| `PUT /api/adaptive/recommendations/[id]/feedback` | POST | Submit feedback | `AdpRecommendationService.submitFeedback` |

### Analytics

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/analytics/sessions` | GET | List sessions | `AdpAnalyticsService.listSessions` |
| `GET /api/adaptive/analytics/sessions/[id]` | GET | Session detail | `AdpAnalyticsService.getSession` |
| `GET /api/adaptive/analytics/learners/[userId]` | GET | Learner analytics | `AdpAnalyticsService.getLearnerAnalytics` |
| `GET /api/adaptive/analytics/cohort` | GET | Cohort analytics | `AdpAnalyticsService.getCohortAnalytics` |
| `GET /api/adaptive/analytics/engagement` | GET | Engagement metrics | `AdpAnalyticsService.getEngagementMetrics` |
| `POST /api/adaptive/analytics/snapshot` | POST | Create snapshot | `AdpAnalyticsService.createSnapshot` |
| `GET /api/adaptive/analytics/trends` | GET | Trend analysis | `AdpAnalyticsService.getTrends` |
| `GET /api/adaptive/analytics/performance` | GET | Performance metrics | `AdpAnalyticsService.getPerformanceMetrics` |

### A/B Testing

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/experiments` | GET | List experiments | `AdpABTestingService.listExperiments` |
| `POST /api/adaptive/experiments` | POST | Create experiment | `AdpABTestingService.createExperiment` |
| `GET /api/adaptive/experiments/[id]` | GET | Experiment detail | `AdpABTestingService.getExperiment` |
| `PUT /api/adaptive/experiments/[id]` | PUT | Update experiment | `AdpABTestingService.updateExperiment` |
| `POST /api/adaptive/experiments/[id]/start` | POST | Start experiment | `AdpABTestingService.startExperiment` |
| `POST /api/adaptive/experiments/[id]/stop` | POST | Stop experiment | `AdpABTestingService.stopExperiment` |
| `GET /api/adaptive/experiments/[id]/results` | GET | Get results | `AdpABTestingService.getResults` |
| `GET /api/adaptive/experiments/[id]/variants` | GET | List variants | `AdpABTestingService.listVariants` |
| `POST /api/adaptive/experiments/[id]/variants` | POST | Create variant | `AdpABTestingService.createVariant` |
| `GET /api/adaptive/experiments/[id]/metrics` | GET | Get metrics | `AdpABTestingService.getMetrics` |

### Real-time Adaptation

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/realtime/adjustments` | GET | List adjustments | `AdpRealtimeAdjustmentService.listAdjustments` |
| `POST /api/adaptive/realtime/adjustments` | POST | Create adjustment | `AdpRealtimeAdjustmentService.createAdjustment` |
| `GET /api/adaptive/realtime/logs` | GET | Adaptation logs | `AdpRealtimeAdjustmentService.getLogs` |
| `POST /api/adaptive/realtime/snapshot` | POST | Create snapshot | `AdpRealtimeAdjustmentService.createSnapshot` |
| `GET /api/adaptive/realtime/alerts` | GET | Alert rules | `AdpRealtimeAdjustmentService.listAlerts` |
| `POST /api/adaptive/realtime/alerts` | POST | Create alert rule | `AdpRealtimeAdjustmentService.createAlert` |

### Prerequisite

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/prerequisites` | GET | List prerequisites | `AdpPrerequisiteService.listPrerequisites` |
| `POST /api/adaptive/prerequisites` | POST | Create prerequisite | `AdpPrerequisiteService.createPrerequisite` |
| `GET /api/adaptive/prerequisites/[id]` | GET | Prerequisite detail | `AdpPrerequisiteService.getPrerequisite` |
| `POST /api/adaptive/prerequisites/check` | POST | Check prerequisites | `AdpPrerequisiteService.checkPrerequisites` |
| `POST /api/adaptive/prerequisites/override` | POST | Create override | `AdpPrerequisiteService.createOverride` |

### Mastery

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/mastery/levels` | GET | List levels | `AdpMasteryService.listLevels` |
| `POST /api/adaptive/mastery/levels` | POST | Create level | `AdpMasteryService.createLevel` |
| `GET /api/adaptive/mastery/progress` | GET | List progress | `AdpMasteryService.listProgress` |
| `POST /api/adaptive/mastery/progress` | POST | Record progress | `AdpMasteryService.recordProgress` |
| `GET /api/adaptive/mastery/badges` | GET | List badges | `AdpMasteryService.listBadges` |
| `POST /api/adaptive/mastery/badges` | POST | Award badge | `AdpMasteryService.awardBadge` |
| `GET /api/adaptive/mastery/certificates` | GET | List certificates | `AdpMasteryService.listCertificates` |
| `POST /api/adaptive/mastery/certificates` | POST | Issue certificate | `AdpMasteryService.issueCertificate` |

### Session

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/sessions` | GET | List sessions | `AdpSessionService.listSessions` |
| `POST /api/adaptive/sessions` | POST | Start session | `AdpSessionService.startSession` |
| `GET /api/adaptive/sessions/[id]` | GET | Session detail | `AdpSessionService.getSession` |
| `PUT /api/adaptive/sessions/[id]` | PUT | Update session | `AdpSessionService.updateSession` |
| `POST /api/adaptive/sessions/[id]/end` | POST | End session | `AdpSessionService.endSession` |
| `POST /api/adaptive/sessions/[id]/checkpoint` | POST | Create checkpoint | `AdpSessionService.createCheckpoint` |
| `POST /api/adaptive/sessions/[id]/goal` | POST | Set session goal | `AdpSessionService.setGoal` |

### Engagement

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/engagement/patterns` | GET | List patterns | `AdpEngagementService.listPatterns` |
| `POST /api/adaptive/engagement/patterns` | POST | Create pattern | `AdpEngagementService.createPattern` |
| `GET /api/adaptive/engagement/triggers` | GET | List triggers | `AdpEngagementService.listTriggers` |
| `POST /api/adaptive/engagement/triggers` | POST | Create trigger | `AdpEngagementService.createTrigger` |
| `GET /api/adaptive/engagement/scores` | GET | Engagement scores | `AdpEngagementService.getScores` |
| `GET /api/adaptive/engagement/motivation/[userId]` | GET | Motivation profile | `AdpEngagementService.getMotivation` |

### Feedback

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/feedback` | GET | List feedback | `AdpFeedbackService.listFeedback` |
| `POST /api/adaptive/feedback` | POST | Submit feedback | `AdpFeedbackService.submitFeedback` |
| `GET /api/adaptive/feedback/[id]` | GET | Feedback detail | `AdpFeedbackService.getFeedback` |
| `GET /api/adaptive/feedback/requests` | GET | List requests | `AdpFeedbackService.listRequests` |
| `POST /api/adaptive/feedback/requests` | POST | Request feedback | `AdpFeedbackService.requestFeedback` |
| `GET /api/adaptive/feedback/templates` | GET | List templates | `AdpFeedbackService.listTemplates` |

### Goals

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/goals` | GET | List goals | `AdpGoalService.listGoals` |
| `POST /api/adaptive/goals` | POST | Create goal | `AdpGoalService.createGoal` |
| `GET /api/adaptive/goals/[id]` | GET | Goal detail | `AdpGoalService.getGoal` |
| `PUT /api/adaptive/goals/[id]` | PUT | Update goal | `AdpGoalService.updateGoal` |
| `POST /api/adaptive/goals/[id]/milestone` | POST | Add milestone | `AdpGoalService.addMilestone` |
| `GET /api/adaptive/goals/[id]/progress` | GET | Goal progress | `AdpGoalService.getProgress` |

### Gamification

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/gamification/streaks` | GET | List streaks | `AdpStreakService.listStreaks` |
| `POST /api/adaptive/gamification/streaks` | POST | Record activity | `AdpStreakService.recordActivity` |
| `GET /api/adaptive/gamification/leaderboards` | GET | List leaderboards | `AdpLeaderboardService.listLeaderboards` |
| `GET /api/adaptive/gamification/leaderboards/[id]` | GET | Leaderboard detail | `AdpLeaderboardService.getLeaderboard` |
| `GET /api/adaptive/gamification/achievements` | GET | List achievements | `AdpAchievementService.listAchievements` |
| `POST /api/adaptive/gamification/achievements` | POST | Award achievement | `AdpAchievementService.awardAchievement` |
| `GET /api/adaptive/gamification/points` | GET | Point balance | `AdpPointService.getBalance` |
| `POST /api/adaptive/gamification/points` | POST | Award points | `AdpPointService.awardPoints` |

### Notifications

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/notifications` | GET | List notifications | `AdpNotificationService.listNotifications` |
| `POST /api/adaptive/notifications` | POST | Create notification | `AdpNotificationService.createNotification` |
| `GET /api/adaptive/notifications/preferences` | GET | Get preferences | `AdpNotificationService.getPreferences` |
| `PUT /api/adaptive/notifications/preferences` | PUT | Update preferences | `AdpNotificationService.updatePreferences` |
| `GET /api/adaptive/notifications/schedule` | GET | Get schedule | `AdpNotificationService.getSchedule` |

### Social Learning

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/social/groups` | GET | List study groups | `AdpSocialLearningService.listGroups` |
| `POST /api/adaptive/social/groups` | POST | Create group | `AdpSocialLearningService.createGroup` |
| `GET /api/adaptive/social/groups/[id]` | GET | Group detail | `AdpSocialLearningService.getGroup` |
| `POST /api/adaptive/social/groups/[id]/join` | POST | Join group | `AdpSocialLearningService.joinGroup` |
| `GET /api/adaptive/social/peer-reviews` | GET | List peer reviews | `AdpSocialLearningService.listPeerReviews` |
| `POST /api/adaptive/social/peer-reviews` | POST | Submit peer review | `AdpSocialLearningService.submitPeerReview` |
| `GET /api/adaptive/social/discussions` | GET | List discussions | `AdpSocialLearningService.listDiscussions` |
| `POST /api/adaptive/social/discussions` | POST | Create discussion | `AdpSocialLearningService.createDiscussion` |
| `POST /api/adaptive/social/collaborative-tasks` | POST | Assign task | `AdpSocialLearningService.assignCollaborativeTask` |

### Content Curation

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/curations/collections` | GET | List collections | `AdpContentCurationService.listCollections` |
| `POST /api/adaptive/curations/collections` | POST | Create collection | `AdpContentCurationService.createCollection` |
| `GET /api/adaptive/curations/rules` | GET | List curation rules | `AdpContentCurationService.listRules` |
| `POST /api/adaptive/curations/rules` | POST | Create rule | `AdpContentCurationService.createRule` |
| `GET /api/adaptive/curations/tags` | GET | List tags | `AdpContentCurationService.listTags` |
| `GET /api/adaptive/curations/ratings` | GET | Content ratings | `AdpContentCurationService.getRatings` |

### Accessibility

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/accessibility/profiles` | GET | List profiles | `AdpAccessibilityService.listProfiles` |
| `POST /api/adaptive/accessibility/profiles` | POST | Create profile | `AdpAccessibilityService.createProfile` |
| `GET /api/adaptive/accessibility/rules` | GET | List rules | `AdpAccessibilityService.listRules` |
| `POST /api/adaptive/accessibility/rules` | POST | Create rule | `AdpAccessibilityService.createRule` |
| `GET /api/adaptive/accessibility/accommodations` | GET | List accommodations | `AdpAccessibilityService.listAccommodations` |
| `POST /api/adaptive/accessibility/accommodations` | POST | Create accommodation | `AdpAccessibilityService.createAccommodation` |

### Instructor

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/instructor/insights` | GET | List insights | `AdpInstructorInsightService.listInsights` |
| `POST /api/adaptive/instructor/insights` | POST | Create insight | `AdpInstructorInsightService.createInsight` |
| `GET /api/adaptive/instructor/adaptations` | GET | Class adaptations | `AdpInstructorInsightService.listAdaptations` |
| `GET /api/adaptive/instructor/interventions` | GET | List intervention plans | `AdpInstructorInsightService.listInterventions` |
| `POST /api/adaptive/instructor/interventions` | POST | Create intervention | `AdpInstructorInsightService.createIntervention` |
| `POST /api/adaptive/instructor/interventions/[id]/actions` | POST | Add action | `AdpInstructorInsightService.addAction` |

### Curriculum

| Route | Method | Description | Service |
|-------|--------|-------------|---------|
| `GET /api/adaptive/curriculum/mappings` | GET | List mappings | `AdpCurriculumService.listMappings` |
| `POST /api/adaptive/curriculum/mappings` | POST | Create mapping | `AdpCurriculumService.createMapping` |
| `GET /api/adaptive/curriculum/alignments` | GET | List alignments | `AdpCurriculumService.listAlignments` |
| `POST /api/adaptive/curriculum/alignments` | POST | Create alignment | `AdpCurriculumService.createAlignment` |
| `GET /api/adaptive/curriculum/objectives` | GET | List objectives | `AdpCurriculumService.listObjectives` |
| `POST /api/adaptive/curriculum/objectives` | POST | Create objective | `AdpCurriculumService.createObjective` |
| `GET /api/adaptive/curriculum/objectives/[id]/progress` | GET | Objective progress | `AdpCurriculumService.getObjectiveProgress` |

## Response Pattern

```json
// Success (GET list)
{ "data": [...] }

// Success (GET by id)
{ "data": { ... } }

// Success (POST/PUT)
{ "data": { ... } }

// Error
{ "error": "Error message" }
```

## Query Parameters (GET list)

| Parameter | Type | Description |
|-----------|------|-------------|
| `schoolId` | UUID | **Required** — School ID |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20, max: 100) |
| `sort` | string | Sort field |
| `order` | `asc` \| `desc` | Sort order |
| `userId` | UUID | Filter by user |
| `status` | string | Filter by status |
| `type` | string | Filter by type |

## Authentication

All routes use `SUPABASE_SERVICE_ROLE_KEY` for service-to-service access. User authentication is handled by Next.js middleware.

# Configuration — Phase 3.2 Adaptive Learning Intelligence

## Overview

24 configuration sections defined in `packages/config/adaptive/`. Each section configures a specific AI/ML engine, domain feature, or solver.

## Config File Structure

```
packages/config/adaptive/
├── index.ts                    # Re-exports all configs
├── adaptive-engine.ts          # ADAPTIVE_ENGINE
├── competency-framework.ts     # COMPETENCY_FRAMEWORK
├── ai-tutor.ts                 # AI_TUTOR
├── learning-path.ts            # LEARNING_PATH
├── gamification.ts             # GAMIFICATION
├── assessment.ts               # ASSESSMENT
├── content.ts                  # CONTENT
├── analytics.ts                # ANALYTICS
├── recommendation.ts           # RECOMMENDATION
├── exercise.ts                 # EXERCISE
├── parent-ai.ts                # PARENT_AI
├── teacher-assistant.ts        # TEACHER_ASSISTANT
├── admin-intelligence.ts       # ADMIN_INTELLIGENCE
├── bloom-taxonomy.ts           # BLOOM_TAXONOMY
├── curriculum.ts               # CURRICULUM
├── knowledge-tracing.ts        # KNOWLEDGE_TRACING
├── spaced-repetition.ts        # SPACED_REPETITION
├── natural-language.ts         # NATURAL_LANGUAGE
├── voice.ts                    # VOICE
├── image.ts                    # IMAGE
├── math-solver.ts              # MATH_SOLVER
├── science-solver.ts           # SCIENCE_SOLVER
├── programming-tutor.ts        # PROGRAMMING_TUTOR
└── essay-assistant.ts          # ESSAY_ASSISTANT
```

## Configuration Sections

### ADAPTIVE_ENGINE

```typescript
export const ADAPTIVE_ENGINE = {
  enabled: true,
  defaultDifficulty: 0.5,
  difficultyRange: { min: 0.1, max: 0.9 },
  adjustmentRate: 0.05,
  zpdMargin: 0.15,
  kFactor: 32,
  performanceThreshold: 0.6,
  sessionTimeout: 3600,
  maxConcurrentSessions: 50,
};
```

### COMPETENCY_FRAMEWORK

```typescript
export const COMPETENCY_FRAMEWORK = {
  enabled: true,
  defaultFramework: 'common_core',
  maxDepth: 6,
  masteryThreshold: 0.8,
  assessmentFrequency: 'weekly',
  autoAdvance: true,
  requireAllPrerequisites: false,
};
```

### AI_TUTOR

```typescript
export const AI_TUTOR = {
  enabled: true,
  maxHintsPerSession: 5,
  hintDelay: 30000,
  explanationDepth: 'adaptive',
  tutoringMode: 'guided',
  responseTimeout: 10000,
  fallbackToRules: true,
  maxTokens: 2048,
};
```

### LEARNING_PATH

```typescript
export const LEARNING_PATH = {
  enabled: true,
  maxNodesPerPath: 100,
  allowBranching: true,
  allowLoops: false,
  defaultEstimate: 10,
  optimizeEnabled: true,
  parallelPaths: 3,
};
```

### GAMIFICATION

```typescript
export const GAMIFICATION = {
  enabled: true,
  pointsPerLesson: 10,
  pointsPerAssessment: 25,
  streakBonus: 1.5,
  maxDailyPoints: 200,
  leaderboardRefresh: 'daily',
  achievementNotification: true,
};
```

### ASSESSMENT

```typescript
export const ASSESSMENT = {
  enabled: true,
  questionBankSize: 500,
  adaptiveQuestioning: true,
  timeLimit: 60,
  passingScore: 0.7,
  maxAttempts: 3,
  feedbackDelay: 0,
  generateQuestions: true,
};
```

### CONTENT

```typescript
export const CONTENT = {
  enabled: true,
  supportedFormats: ['text', 'video', 'interactive', 'audio'],
  maxVariants: 5,
  deliveryRules: true,
  abTesting: true,
  engagementTracking: true,
  cacheTTL: 3600,
};
```

### ANALYTICS

```typescript
export const ANALYTICS = {
  enabled: true,
  retentionDays: 90,
  aggregationInterval: 'daily',
  cohortSize: 30,
  predictiveModeling: true,
  exportFormats: ['csv', 'json', 'pdf'],
  realTimeEnabled: true,
};
```

### RECOMMENDATION

```typescript
export const RECOMMENDATION = {
  enabled: true,
  algorithm: 'hybrid',
  maxRecommendations: 10,
  refreshInterval: 86400,
  collaborativeWeight: 0.6,
  contentBasedWeight: 0.4,
  diversityFactor: 0.3,
};
```

### EXERCISE

```typescript
export const EXERCISE = {
  enabled: true,
  maxExercisesPerSession: 20,
  adaptiveDifficulty: true,
  hintSystem: true,
  solutionReveal: 'after_attempt',
  practiceMode: true,
};
```

### PARENT_AI

```typescript
export const PARENT_AI = {
  enabled: true,
  dailySummary: true,
  milestoneNotifications: true,
  concernAlerts: true,
  digestFrequency: 'daily',
  privacyLevel: 'summary',
};
```

### TEACHER_ASSISTANT

```typescript
export const TEACHER_ASSISTANT = {
  enabled: true,
  classInsights: true,
  interventionSuggestions: true,
  workloadAlerts: true,
  planningAssistance: true,
  maxAlertsPerDay: 10,
};
```

### ADMIN_INTELLIGENCE

```typescript
export const ADMIN_INTELLIGENCE = {
  enabled: true,
  enrollmentAnalytics: true,
  performanceReports: true,
  retentionTracking: true,
  benchmarkComparisons: true,
  exportEnabled: true,
};
```

### BLOOM_TAXONOMY

```typescript
export const BLOOM_TAXONOMY = {
  enabled: true,
  levels: ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'],
  autoTagging: true,
  difficultyMapping: {
    remember: 0.2,
    understand: 0.4,
    apply: 0.6,
    analyze: 0.7,
    evaluate: 0.8,
    create: 0.9,
  },
};
```

### CURRICULUM

```typescript
export const CURRICULUM = {
  enabled: true,
  alignmentThreshold: 0.7,
  autoMapping: true,
  standards: ['common_core', 'ngss'],
  versionControl: true,
};
```

### KNOWLEDGE_TRACING

```typescript
export const KNOWLEDGE_TRACING = {
  enabled: true,
  algorithm: 'bkt',
  prior: 0.3,
  learnRate: 0.1,
  guessRate: 0.2,
  slipRate: 0.1,
  updateFrequency: 'per_interaction',
};
```

### SPACED_REPETITION

```typescript
export const SPACED_REPETITION = {
  enabled: true,
  algorithm: 'fsrs',
  defaultInterval: 1,
  maxInterval: 365,
  easeFactor: 2.5,
  lapsesBeforeReset: 3,
  dailyReviewLimit: 50,
};
```

### NATURAL_LANGUAGE

```typescript
export const NATURAL_LANGUAGE = {
  enabled: true,
  model: 'gpt-4',
  maxTokens: 2048,
  temperature: 0.7,
  feedbackGeneration: true,
  hintGeneration: true,
  explanationGeneration: true,
};
```

### VOICE

```typescript
export const VOICE = {
  enabled: false,
  provider: 'elevenlabs',
  language: 'en-US',
  speed: 1.0,
  outputFormat: 'mp3',
  cacheAudio: true,
};
```

### IMAGE

```typescript
export const IMAGE = {
  enabled: true,
  maxWidth: 1920,
  maxHeight: 1080,
  formats: ['png', 'jpg', 'svg'],
  compressionQuality: 0.85,
  generateDiagrams: true,
};
```

### MATH_SOLVER

```typescript
export const MATH_SOLVER = {
  enabled: true,
  supportedTypes: ['algebra', 'geometry', 'calculus', 'statistics'],
  stepByStep: true,
  latexOutput: true,
  maxComplexity: 'advanced',
};
```

### SCIENCE_SOLVER

```typescript
export const SCIENCE_SOLVER = {
  enabled: true,
  subjects: ['physics', 'chemistry', 'biology'],
  simulationEnabled: true,
  labReportAssist: true,
  equationBalancing: true,
};
```

### PROGRAMMING_TUTOR

```typescript
export const PROGRAMMING_TUTOR = {
  enabled: true,
  languages: ['javascript', 'python', 'java', 'cpp'],
  codeAnalysis: true,
  autoGrading: true,
  plagiarismDetection: false,
  sandboxExecution: true,
};
```

### ESSAY_ASSISTANT

```typescript
export const ESSAY_ASSISTANT = {
  enabled: true,
  grammarCheck: true,
  styleAnalysis: true,
  plagiarismCheck: true,
  rubricAlignment: true,
  feedbackDepth: 'detailed',
  maxWordCount: 5000,
};
```

## Environment Variables

```env
# Adaptive Engine
NEXT_PUBLIC_ADAPTIVE_ENGINE_ENABLED=true
ADAPTIVE_K_FACTOR=32

# AI Tutor
AI_TUTOR_MODEL=gpt-4
AI_TUTOR_MAX_TOKENS=2048

# Spaced Repetition
SPACED_REPETITION_ALGORITHM=fsrs

# Knowledge Tracing
KNOWLEDGE_TRACING_ALGORITHM=bkt

# Recommendations
RECOMMENDATION_ALGORITHM=hybrid
```

## Config Access Pattern

```typescript
import { ADAPTIVE_ENGINE, SPACED_REPETITION } from '@educi/config';

const difficulty = ADAPTIVE_ENGINE.defaultDifficulty;
const maxInterval = SPACED_REPETITION.maxInterval;
```

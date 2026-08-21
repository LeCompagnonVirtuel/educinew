# Validateurs Zod — Phase 3.1 Intelligence

## Vue d'ensemble

Les schémas de validation Zod se trouvent dans `src/features/intelligence/validators/` et contiennent 3 fichiers couvrant l'ensemble des 32 entités Intelligence.

## Fichiers

| Fichier | Entités couvertes | Lignes |
|---------|-------------------|--------|
| `intelligence-core.ts` | Engine, DataSource, Pipeline, Model, Score, Alert, Recommendation, Dashboard, Widget, KPI, Insight, Action | 176 |
| `intelligence-knowledge.ts` | KnowledgeBase, NLP, Sentiment, Classification, Summarization, DocumentAnalysis, Benchmark, AIInsight, AnalyticsReport, Visualization | 181 |
| `intelligence-predictive.ts` | PredictiveModel, StudentRisk, EarlyWarning, StudentOutlook, Scenario | 156 |

## intelligence-core.ts

### Enums Zod

```typescript
const intelligenceSourceTypeEnum = z.enum([
  'academic', 'attendance', 'finance', 'hr', 'lxp', 
  'smart_campus', 'communication', 'documents', 
  'analytics', 'national_governance', 'enterprise'
]);

const intelligenceScoreTypeEnum = z.enum([
  'education_intelligence', 'school_health', 'academic_health',
  'financial_health', 'teacher_performance', 'student_success',
  'campus_efficiency', 'risk', 'compliance', 'ai_confidence'
]);

const aiAlertSeverityEnum = z.enum(['info', 'warning', 'critical', 'emergency']);
const aiAlertStatusEnum = z.enum(['active', 'acknowledged', 'resolved', 'escalated']);
const recommendationTypeEnum = z.enum([
  'improvement', 'remediation', 'pedagogical', 'financial',
  'hr', 'investment', 'infrastructure', 'program'
]);
const recommendationPriorityEnum = z.enum(['low', 'medium', 'high', 'critical']);
const recommendationStatusEnum = z.enum(['pending', 'accepted', 'in_progress', 'completed', 'rejected']);
```

### Schémas de création

| Schéma | Validation |
|--------|------------|
| `createIntelligenceEngineSchema` | `schoolId: UUID, name: 1-200, sourceTypes: min 1, config?: object` |
| `createDataSourceSchema` | `schoolId: UUID, engineId: UUID, name: 1-200, type: enum, config: object` |
| `createPipelineSchema` | `schoolId: UUID, engineId: UUID, name: 1-200, type: ETL/STREAM/BATCH/REAL_TIME, sourceIds: min 1` |
| `createAIModelSchema` | `schoolId: UUID, engineId: UUID, name: 1-200, type: CLASSIFICATION/REGRESSION/...` |
| `createIntelligenceScoreSchema` | `schoolId: UUID, engineId: UUID, type: enum, score: 0-100, period: enum` |
| `createAIAlertSchema` | `schoolId: UUID, engineId: UUID, title: 1-200, message: 1-2000, severity: enum` |
| `createRecommendationSchema` | `schoolId: UUID, engineId: UUID, title: 1-200, description: 1-5000, type: enum, priority: enum` |

### Schémas de mise à jour

Tous les champs deviennent optionnels pour les mises à jour partielles :

```typescript
export const updateIntelligenceEngineSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  sourceTypes: z.array(intelligenceSourceTypeEnum).min(1).optional(),
  config: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});
```

### Schémas de requête

```typescript
export const queryIntelligenceEngineSchema = z.object({
  schoolId: z.string().uuid(),
  engineId: z.string().uuid().optional(),
  sourceType: intelligenceSourceTypeEnum.optional(),
  isActive: z.boolean().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});
```

## intelligence-knowledge.ts

### Enums Zod

```typescript
const contentTypeEnum = z.enum([
  'article', 'guide', 'policy', 'procedure', 
  'faq', 'template', 'report', 'research'
]);

const knowledgeBaseCategoryEnum = z.enum([
  'academic', 'administrative', 'financial', 'hr', 
  'legal', 'technical', 'operational'
]);

const sentimentAnalysisGranularityEnum = z.enum(['document', 'sentence', 'paragraph']);
const summarizationTypeEnum = z.enum([
  'executive_summary', 'detailed_summary', 'bullet_points', 
  'key_insights', 'action_items'
]);

const documentTypeEnum = z.enum(['pdf', 'docx', 'xlsx', 'pptx', 'txt', 'csv', 'json']);
const benchmarkTypeEnum = z.enum(['internal', 'external', 'industry', 'regional', 'national']);
const chartTypeEnum = z.enum([
  'line', 'bar', 'pie', 'scatter', 'heatmap', 
  'gauge', 'funnel', 'treemap', 'radar', 'box_plot'
]);
```

### Schémas NLP

| Schéma | Validation |
|--------|------------|
| `createNLPTaskSchema` | `schoolId: UUID, text: 1-10000, language: fr/en, task: enum` |
| `createSentimentAnalysisSchema` | `schoolId: UUID, text: 1-10000, language: fr/en, granularity: enum` |
| `createAutoClassificationSchema` | `schoolId: UUID, text: 1-5000, categories: enum[], priority: enum` |
| `createTextSummarizationSchema` | `schoolId: UUID, text: 1-50000, type: enum, maxLength: 100-5000` |
| `analyzeDocumentSchema` | `schoolId: UUID, documentUrl: URL, documentType: enum, features: min 1` |

### Schémas Analytics

| Schéma | Validation |
|--------|------------|
| `createKnowledgeBaseArticleSchema` | `schoolId: UUID, title: 1-200, content: 1-50000, contentType: enum, category: enum` |
| `createBenchmarkSchema` | `schoolId: UUID, name: 1-200, type: enum, dimension: 1-100, value: number` |
| `createAIInsightSchema` | `schoolId: UUID, title: 1-200, description: 1-5000, type: enum, confidence: 0-1` |
| `createAnalyticsReportSchema` | `schoolId: UUID, title: 1-200, type: enum, format: enum, recipients: email[]` |
| `createVisualizationSchema` | `schoolId: UUID, title: 1-200, chartType: enum, data: object` |

## intelligence-predictive.ts

### Enums Zod

```typescript
const predictiveModelTypeEnum = z.enum([
  'student_performance', 'dropout_risk', 'attendance_prediction',
  'financial_forecast', 'resource_optimization', 
  'teacher_retention', 'enrollment_forecast'
]);

const riskLevelEnum = z.enum(['low', 'medium', 'high', 'critical']);
const interventionTypeEnum = z.enum([
  'counseling', 'academic_support', 'financial_aid',
  'parent_engagement', 'peer_mentoring', 'specialist_referral'
]);

const earlyWarningTypeEnum = z.enum([
  'academic_decline', 'attendance_pattern', 'behavioral_change',
  'financial_distress', 'social_isolation', 'health_concern'
]);
```

### Schémas prédictifs

| Schéma | Validation |
|--------|------------|
| `createPredictiveModelSchema` | `schoolId: UUID, name: 1-200, type: enum, accuracy: 0-1` |
| `createStudentRiskAssessmentSchema` | `schoolId: UUID, studentId: UUID, riskScore: 0-100, riskLevel: enum, riskFactors: min 1` |
| `createEarlyWarningSchema` | `schoolId: UUID, entityType: 1-100, entityId: UUID, type: enum, severity: enum, message: 1-2000` |
| `createStudentOutlookSchema` | `schoolId: UUID, studentId: UUID, type: enum, horizonDays: 1-365, score: 0-100, confidence: 0-1` |
| `createScenarioSchema` | `schoolId: UUID, modelId: UUID, name: 1-200, type: enum, parameters: object` |

### Schémas de requête prédictifs

```typescript
export const queryStudentRiskAssessmentSchema = z.object({
  schoolId: z.string().uuid(),
  studentId: z.string().uuid().optional(),
  riskLevel: riskLevelEnum.optional(),
  minRiskScore: z.number().min(0).max(100).optional(),
  maxRiskScore: z.number().min(0).max(100).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const runPredictionSchema = z.object({
  schoolId: z.string().uuid(),
  modelId: z.string().uuid(),
  input: z.record(z.unknown()),
  horizonDays: z.number().int().min(1).max(365).optional(),
  includeConfidence: z.boolean().optional(),
});
```

## Validation dans les services

```typescript
import { createIntelligenceEngineSchema } from '../validators/intelligence-core';

// Dans le service ou l'API route
const validated = createIntelligenceEngineSchema.parse(body);
const result = await service.createEngine(schoolId, validated);
```

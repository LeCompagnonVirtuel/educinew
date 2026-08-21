# Types TypeScript — Phase 3.1 Intelligence

## Vue d'ensemble

Les types Intelligence sont définis dans `packages/types/src/` à travers 3 fichiers :
- `ai-intelligence-core.ts` — Types core (2066 lignes)
- `ai-intelligence-knowledge.ts` — Types NLP & connaissances (631 lignes)
- `ai-intelligence-predictive.ts` — Types prédictifs (546 lignes)

**Total : ~50 enums, ~221 interfaces**

## Fichiers sources

| Fichier | Enums | Interfaces | Lignes |
|---------|-------|------------|--------|
| `ai-intelligence-core.ts` | ~30 | ~40 | 2066 |
| `ai-intelligence-knowledge.ts` | ~12 | ~30 | 631 |
| `ai-intelligence-predictive.ts` | ~10 | ~25 | 546 |
| **Total** | **~52** | **~95** | **3243** |

## Enums — ai-intelligence-core.ts

### Enums de base

```typescript
export enum IntelligenceSourceType {
  ACADEMIC = 'academic',
  ATTENDANCE = 'attendance',
  FINANCE = 'finance',
  HR = 'hr',
  LXP = 'lxp',
  SMART_CAMPUS = 'smart_campus',
  COMMUNICATION = 'communication',
  DOCUMENTS = 'documents',
  ANALYTICS = 'analytics',
  NATIONAL_GOVERNANCE = 'national_governance',
  ENTERPRISE = 'enterprise'
}

export enum DashboardRole {
  MINISTRY = 'ministry',
  REGIONAL = 'regional',
  INSPECTION = 'inspection',
  SCHOOL_NETWORK = 'school_network',
  SCHOOL_GROUP = 'school_group',
  SCHOOL_PRINCIPAL = 'school_principal'
}

export enum IntelligenceScoreType {
  EDUCATION_INTELLIGENCE = 'education_intelligence',
  SCHOOL_HEALTH = 'school_health',
  ACADEMIC_HEALTH = 'academic_health',
  FINANCIAL_HEALTH = 'financial_health',
  TEACHER_PERFORMANCE = 'teacher_performance',
  STUDENT_SUCCESS = 'student_success',
  CAMPUS_EFFICIENCY = 'campus_efficiency',
  RISK = 'risk',
  COMPLIANCE = 'compliance',
  AI_CONFIDENCE = 'ai_confidence'
}

export enum AIAlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical',
  EMERGENCY = 'emergency'
}

export enum AIAlertStatus {
  ACTIVE = 'active',
  ACKNOWLEDGED = 'acknowledged',
  RESOLVED = 'resolved',
  ESCALATED = 'escalated'
}

export enum RecommendationType {
  IMPROVEMENT = 'improvement',
  REMEDIATION = 'remediation',
  PEDAGOGICAL = 'pedagogical',
  FINANCIAL = 'financial',
  HR = 'hr',
  INVESTMENT = 'investment',
  INFRASTRUCTURE = 'infrastructure',
  PROGRAM = 'program'
}

export enum RecommendationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum RecommendationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}

export enum AISummaryPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual'
}

export enum AIInsightCategory {
  TREND = 'trend',
  ANOMALY = 'anomaly',
  CORRELATION = 'correlation',
  PREDICTION = 'prediction',
  RECOMMENDATION = 'recommendation',
  RISK = 'risk'
}

export enum AIWidgetType {
  SCORE_CARD = 'score_card',
  ALERT_LIST = 'alert_list',
  TREND_CHART = 'trend_chart',
  COMPARISON_TABLE = 'comparison_table',
  RECOMMENDATION_LIST = 'recommendation_list',
  INSIGHT_FEED = 'insight_feed',
  KPI_GRID = 'kpi_grid',
  MAP_VIEW = 'map_view',
  TIMELINE = 'timeline',
  RISK_MATRIX = 'risk_matrix'
}
```

### Enums d'infrastructure

```typescript
export enum DataSourceStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  SYNCING = 'syncing',
  ERROR = 'error'
}

export enum ModelType {
  PREDICTIVE = 'predictive',
  PRESCRIPTIVE = 'prescriptive',
  DESCRIPTIVE = 'descriptive',
  ANOMALY_DETECTION = 'anomaly_detection',
  CLASSIFICATION = 'classification',
  REGRESSION = 'regression',
  CLUSTERING = 'clustering',
  NLP = 'nlp'
}

export enum TrainingStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum ImpactLevel {
  NEGLIGIBLE = 'negligible',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum CostType {
  ONE_TIME = 'one_time',
  RECURRING = 'recurring',
  PER_UNIT = 'per_unit'
}

export enum RiskLevel {
  MINIMAL = 'minimal',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  SEVERE = 'severe'
}

export enum EntityType {
  SCHOOL = 'school',
  TEACHER = 'teacher',
  STUDENT = 'student',
  DEPARTMENT = 'department',
  DISTRICT = 'district',
  REGION = 'region',
  NETWORK = 'network'
}

export enum DataAggregationType {
  SUM = 'sum',
  AVERAGE = 'average',
  MIN = 'min',
  MAX = 'max',
  COUNT = 'count',
  PERCENTILE = 'percentile'
}

export enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable',
  VOLATILE = 'volatile'
}

export enum TimeGranularity {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual'
}

export enum ValidationStatus {
  VALID = 'valid',
  INVALID = 'invalid',
  WARNING = 'warning',
  PENDING = 'pending'
}

export enum CorrelationStrength {
  WEAK = 'weak',
  MODERATE = 'moderate',
  STRONG = 'strong',
  VERY_STRONG = 'very_strong'
}

export enum ScenarioOutcome {
  OPTIMISTIC = 'optimistic',
  BASELINE = 'baseline',
  PESSIMISTIC = 'pessimistic',
  STRESS = 'stress'
}

export enum AuditAction {
  CREATED = 'created',
  UPDATED = 'updated',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  IMPLEMENTED = 'implemented',
  ESCALATED = 'escalated',
  RESOLVED = 'resolved'
}

export enum WidgetSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULL_WIDTH = 'full_width'
}

export enum WidgetPosition {
  TOP_LEFT = 'top_left',
  TOP_CENTER = 'top_center',
  TOP_RIGHT = 'top_right',
  MIDDLE_LEFT = 'middle_left',
  MIDDLE_CENTER = 'middle_center',
  MIDDLE_RIGHT = 'middle_right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_CENTER = 'bottom_center',
  BOTTOM_RIGHT = 'bottom_right'
}

export enum ReasoningType {
  STATISTICAL = 'statistical',
  RULE_BASED = 'rule_based',
  ML_BASED = 'ml_based',
  HYBRID = 'hybrid',
  HEURISTIC = 'heuristic'
}

export enum ConfidenceLevel {
  VERY_LOW = 'very_low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}
```

## Enums — ai-intelligence-knowledge.ts

```typescript
export enum KnowledgeType {
  POLICY = 'policy',
  REGULATION = 'regulation',
  PROCEDURE = 'procedure',
  FAQ = 'faq',
  JURISPRUDENCE = 'jurisprudence',
  DOCUMENT = 'document',
  GUIDE = 'guide',
  BEST_PRACTICE = 'best_practice',
  CASE_STUDY = 'case_study',
  TEMPLATE = 'template'
}

export enum NLQueryIntent {
  QUERY = 'query',
  EXPLAIN = 'explain',
  COMPARE = 'compare',
  PREDICT = 'predict',
  RECOMMEND = 'recommend',
  SUMMARIZE = 'summarize',
  ANALYZE = 'analyze',
  LIST = 'list'
}

export enum ReportType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual',
  MINISTERIAL = 'ministerial',
  INSPECTION = 'inspection',
  BOARD = 'board',
  CUSTOM = 'custom'
}

export enum ReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  POWERPOINT = 'powerpoint',
  WORD = 'word',
  HTML = 'html',
  CSV = 'csv'
}

export enum ReportStatus {
  GENERATING = 'generating',
  GENERATED = 'generated',
  DELIVERED = 'delivered',
  FAILED = 'failed'
}

export enum BenchmarkType {
  SCHOOL = 'school',
  REGION = 'region',
  COUNTRY = 'country',
  SCHOOL_GROUP = 'school_group',
  PROGRAM = 'program',
  DISTRICT = 'district'
}

export enum BenchmarkMetric {
  PASS_RATE = 'pass_rate',
  AVERAGE_GRADE = 'average_grade',
  GRADUATION_RATE = 'graduation_rate',
  ATTENDANCE_RATE = 'attendance_rate',
  TEACHER_STUDENT_RATIO = 'teacher_student_ratio',
  BUDGET_PER_STUDENT = 'budget_per_student',
  INFRASTRUCTURE_SCORE = 'infrastructure_score',
  DIGITAL_ADOPTION = 'digital_adoption',
  PARENT_SATISFACTION = 'parent_satisfaction',
  STUDENT_WELLBEING = 'student_wellbeing'
}

export enum ScenarioType {
  RECRUITMENT = 'recruitment',
  BUDGET = 'budget',
  ENROLLMENT = 'enrollment',
  INFRASTRUCTURE = 'infrastructure',
  PROGRAM = 'program',
  POLICY = 'policy',
  MERGER = 'merger',
  EXPANSION = 'expansion'
}

export enum ScenarioStatus {
  DRAFT = 'draft',
  SIMULATED = 'simulated',
  ANALYZED = 'analyzed',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  IMPLEMENTED = 'implemented'
}

export enum RAGSource {
  KNOWLEDGE_BASE = 'knowledge_base',
  INTERNAL_DOCS = 'internal_docs',
  REGULATIONS = 'regulations',
  EXTERNAL = 'external'
}
```

## Enums — ai-intelligence-predictive.ts

```typescript
export enum PredictionType {
  ACADEMIC_SUCCESS = 'academic_success',
  ACADEMIC_FAILURE = 'academic_failure',
  DROPOUT = 'dropout',
  ABANDON = 'abandon',
  VIOLENCE = 'violence',
  ABSENTEEISM = 'absenteeism',
  FRAUD = 'fraud',
  FINANCIAL_RISK = 'financial_risk',
  BUDGET_FORECAST = 'budget_forecast',
  ENROLLMENT_FORECAST = 'enrollment_forecast',
  RECRUITMENT_FORECAST = 'recruitment_forecast',
  TEACHER_NEED = 'teacher_need',
  CLASSROOM_NEED = 'classroom_need',
  MATERIAL_NEED = 'material_need'
}

export enum RiskCategory {
  ACADEMIC = 'academic',
  HR = 'hr',
  FINANCIAL = 'financial',
  LEGAL = 'legal',
  SECURITY = 'security',
  INFRASTRUCTURE = 'infrastructure',
  HEALTH = 'health',
  COMPLIANCE = 'compliance'
}

export enum RiskStatus {
  IDENTIFIED = 'identified',
  ASSESSED = 'assessed',
  MITIGATED = 'mitigated',
  ACCEPTED = 'accepted',
  ESCALATED = 'escalated',
  RESOLVED = 'resolved'
}

export enum WarningType {
  STUDENT_AT_RISK = 'student_at_risk',
  TEACHER_IN_DIFFICULTY = 'teacher_in_difficulty',
  LOW_PERFORMANCE_CLASS = 'low_performance_class',
  FINANCIAL_DECLINE = 'financial_decline',
  ABSENTEEISM_EPIDEMIC = 'absenteeism_epidemic',
  POTENTIAL_FRAUD = 'potential_fraud',
  CYBER_ATTACK = 'cyber_attack',
  SECURITY_INCIDENT = 'security_incident'
}

export enum WarningSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum WarningStatus {
  ACTIVE = 'active',
  ACKNOWLEDGED = 'acknowledged',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  ESCALATED = 'escalated',
  DISMISSED = 'dismissed'
}

export enum MitigationStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  EFFECTIVE = 'effective',
  INEFFECTIVE = 'ineffective'
}

export enum PredictionConfidence {
  VERY_LOW = 'very_low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}
```

## Interfaces principales

### Core Intelligence

```typescript
export interface EducationIntelligenceScore {
  id: string;
  school_id: string;
  overall_score: number;
  academic_score: number;
  financial_score: number;
  teacher_score: number;
  student_score: number;
  campus_score: number;
  risk_score: number;
  compliance_score: number;
  ai_confidence: number;
  data_source: IntelligenceSourceType;
  calculated_at: string;
  period: AISummaryPeriod;
  metadata: Record<string, unknown>;
}

export interface SchoolHealthScore {
  id: string;
  school_id: string;
  overall_health: number;
  academic_health: number;
  financial_health: number;
  operational_health: number;
  safety_health: number;
  compliance_health: number;
  trend: TrendDirection;
  previous_score: number;
  change_percent: number;
  alerts: AIAlert[];
  recommendations: DecisionRecommendation[];
  calculated_at: string;
}

export interface AIAlert {
  id: string;
  school_id: string;
  title: string;
  message: string;
  severity: AIAlertSeverity;
  status: AIAlertStatus;
  category: AIInsightCategory;
  source: IntelligenceSourceType;
  entity_type: EntityType;
  entity_id: string;
  action_required: boolean;
  assigned_to: string;
  acknowledged_at: string;
  resolved_at: string;
  created_at: string;
}

export interface DecisionRecommendation {
  id: string;
  school_id: string;
  type: RecommendationType;
  title: string;
  description: string;
  impact: RecommendationImpact;
  estimated_cost: RecommendationCost;
  confidence: number;
  priority: RecommendationPriority;
  status: RecommendationStatus;
  category: IntelligenceScoreType;
  target_entity: EntityType;
  timeframe: string;
  metrics: Record<string, number>;
  rationale: string;
  alternatives: string[];
  created_at: string;
}

export interface IntelligenceEngine {
  id: string;
  school_id: string;
  name: string;
  description: string;
  source_types: IntelligenceSourceType[];
  config: Record<string, unknown>;
  is_active: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface DataSource {
  id: string;
  school_id: string;
  engine_id: string;
  name: string;
  type: IntelligenceSourceType;
  config: Record<string, unknown>;
  sync_interval_minutes: number;
  is_active: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface IntelligencePipeline {
  id: string;
  school_id: string;
  engine_id: string;
  name: string;
  description: string;
  type: 'ETL' | 'STREAM' | 'BATCH' | 'REAL_TIME';
  source_ids: string[];
  config: Record<string, unknown>;
  is_active: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}
```

### Knowledge & NLP

```typescript
export interface KnowledgeBaseArticle {
  id: string;
  school_id: string;
  title: string;
  content: string;
  content_type: string;
  category: string;
  tags: string[];
  summary: string;
  author: string;
  is_published: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface NLPTask {
  id: string;
  school_id: string;
  text: string;
  language: string;
  task: string;
  config: Record<string, unknown>;
  result: Record<string, unknown>;
  status: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SentimentAnalysis {
  id: string;
  school_id: string;
  text: string;
  language: string;
  granularity: string;
  result: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface TextSummarization {
  id: string;
  school_id: string;
  text: string;
  type: string;
  max_length: number;
  min_length: number;
  language: string;
  result: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}
```

### Predictive

```typescript
export interface PredictiveModel {
  id: string;
  name: string;
  type: PredictionType;
  version: string;
  accuracy: number;
  last_trained_at: string;
  training_data_size: number;
  features: string[];
  hyperparameters: Record<string, unknown>;
  status: string;
  created_at: string;
}

export interface StudentRiskAssessment {
  id: string;
  school_id: string;
  student_id: string;
  risk_score: number;
  risk_level: RiskLevel;
  risk_factors: RiskFactor[];
  recommended_interventions: string[];
  confidence: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface EarlyWarning {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  type: WarningType;
  severity: WarningSeverity;
  message: string;
  data: Record<string, unknown>;
  confidence: number;
  status: WarningStatus;
  acknowledged_by: string;
  resolved_by: string;
  resolution: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface StudentOutlook {
  id: string;
  school_id: string;
  student_id: string;
  type: string;
  horizon_days: number;
  score: number;
  confidence: number;
  factors: OutlookFactor[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}
```

## Types Create/Update

Chaque entité dispose de types `*Create` et `*Update` :

```typescript
// Exemple pour IntelligenceEngine
export interface IntelligenceEngineCreate {
  school_id: string;
  name: string;
  description?: string;
  source_types: IntelligenceSourceType[];
  config?: Record<string, unknown>;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

export interface IntelligenceEngineUpdate {
  name?: string;
  description?: string;
  source_types?: IntelligenceSourceType[];
  config?: Record<string, unknown>;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}
```

## Export depuis @educi/types

```typescript
// packages/types/src/index.ts
export * from './ai-intelligence-core';
export * from './ai-intelligence-knowledge';
export * from './ai-intelligence-predictive';
```

```typescript
// Import dans les features
import type { 
  IntelligenceEngine, 
  IntelligenceEngineCreate,
  AIAlert,
  PredictiveModel 
} from '@educi/types';
```

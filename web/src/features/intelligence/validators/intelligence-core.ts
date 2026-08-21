import { z } from 'zod';

const intelligenceSourceTypeEnum = z.enum(['academic', 'attendance', 'finance', 'hr', 'lxp', 'smart_campus', 'communication', 'documents', 'analytics', 'national_governance', 'enterprise']);
const dashboardRoleEnum = z.enum(['ministry', 'regional', 'inspection', 'school_network', 'school_group', 'school_principal']);
const intelligenceScoreTypeEnum = z.enum(['education_intelligence', 'school_health', 'academic_health', 'financial_health', 'teacher_performance', 'student_success', 'campus_efficiency', 'risk', 'compliance', 'ai_confidence']);
const aiAlertSeverityEnum = z.enum(['info', 'warning', 'critical', 'emergency']);
const aiAlertStatusEnum = z.enum(['active', 'acknowledged', 'resolved', 'escalated']);
const recommendationTypeEnum = z.enum(['improvement', 'remediation', 'pedagogical', 'financial', 'hr', 'investment', 'infrastructure', 'program']);
const recommendationPriorityEnum = z.enum(['low', 'medium', 'high', 'critical']);
const recommendationStatusEnum = z.enum(['pending', 'accepted', 'in_progress', 'completed', 'rejected']);
const aiSummaryPeriodEnum = z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'annual']);
const aiInsightCategoryEnum = z.enum(['trend', 'anomaly', 'correlation', 'prediction', 'recommendation', 'risk']);
const aiWidgetTypeEnum = z.enum(['score_card', 'alert_list', 'trend_chart', 'comparison_table', 'recommendation_list', 'insight_feed', 'action_tracker', 'kpi_grid', 'risk_matrix', 'performance_gauge', 'map_widget', 'timeline']);

export const createIntelligenceEngineSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  sourceTypes: z.array(intelligenceSourceTypeEnum).min(1),
  config: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateIntelligenceEngineSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  sourceTypes: z.array(intelligenceSourceTypeEnum).min(1).optional(),
  config: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createDataSourceSchema = z.object({
  schoolId: z.string().uuid(),
  engineId: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: intelligenceSourceTypeEnum,
  config: z.record(z.unknown()),
  syncIntervalMinutes: z.number().int().min(1).max(1440).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateDataSourceSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  type: intelligenceSourceTypeEnum.optional(),
  config: z.record(z.unknown()).optional(),
  syncIntervalMinutes: z.number().int().min(1).max(1440).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createPipelineSchema = z.object({
  schoolId: z.string().uuid(),
  engineId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['ETL', 'STREAM', 'BATCH', 'REAL_TIME']),
  sourceIds: z.array(z.string().uuid()).min(1),
  config: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updatePipelineSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['ETL', 'STREAM', 'BATCH', 'REAL_TIME']).optional(),
  sourceIds: z.array(z.string().uuid()).min(1).optional(),
  config: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createAIModelSchema = z.object({
  schoolId: z.string().uuid(),
  engineId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['CLASSIFICATION', 'REGRESSION', 'CLUSTERING', 'ANOMALY_DETECTION', 'TIME_SERIES', 'NLP']),
  config: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateAIModelSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['CLASSIFICATION', 'REGRESSION', 'CLUSTERING', 'ANOMALY_DETECTION', 'TIME_SERIES', 'NLP']).optional(),
  config: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createIntelligenceScoreSchema = z.object({
  schoolId: z.string().uuid(),
  engineId: z.string().uuid(),
  type: intelligenceScoreTypeEnum,
  score: z.number().min(0).max(100),
  period: aiSummaryPeriodEnum,
  metadata: z.record(z.unknown()).optional(),
});

export const createAIAlertSchema = z.object({
  schoolId: z.string().uuid(),
  engineId: z.string().uuid(),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
  severity: aiAlertSeverityEnum,
  source: z.string().max(200).optional(),
  entityType: z.string().max(100).optional(),
  entityId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateAIAlertSchema = z.object({
  status: aiAlertStatusEnum.optional(),
  acknowledgedBy: z.string().uuid().optional(),
  resolvedBy: z.string().uuid().optional(),
  resolution: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createRecommendationSchema = z.object({
  schoolId: z.string().uuid(),
  engineId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  type: recommendationTypeEnum,
  priority: recommendationPriorityEnum,
  confidence: z.number().min(0).max(1).optional(),
  entityType: z.string().max(100).optional(),
  entityId: z.string().uuid().optional(),
  actionItems: z.array(z.string().max(500)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateRecommendationSchema = z.object({
  status: recommendationStatusEnum.optional(),
  assignedTo: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
  completionNotes: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const queryIntelligenceEngineSchema = z.object({
  schoolId: z.string().uuid(),
  engineId: z.string().uuid().optional(),
  sourceType: intelligenceSourceTypeEnum.optional(),
  isActive: z.boolean().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const queryAIAlertSchema = z.object({
  schoolId: z.string().uuid(),
  severity: aiAlertSeverityEnum.optional(),
  status: aiAlertStatusEnum.optional(),
  entityType: z.string().max(100).optional(),
  entityId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const queryRecommendationSchema = z.object({
  schoolId: z.string().uuid(),
  type: recommendationTypeEnum.optional(),
  priority: recommendationPriorityEnum.optional(),
  status: recommendationStatusEnum.optional(),
  assignedTo: z.string().uuid().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

import { z } from 'zod';

const contentTypeEnum = z.enum(['article', 'guide', 'policy', 'procedure', 'faq', 'template', 'report', 'research']);
const knowledgeBaseCategoryEnum = z.enum(['academic', 'administrative', 'financial', 'hr', 'legal', 'technical', 'operational']);
const sentimentAnalysisGranularityEnum = z.enum(['document', 'sentence', 'paragraph']);
const summarizationTypeEnum = z.enum(['executive_summary', 'detailed_summary', 'bullet_points', 'key_insights', 'action_items']);
const documentTypeEnum = z.enum(['pdf', 'docx', 'xlsx', 'pptx', 'txt', 'csv', 'json']);
const benchmarkTypeEnum = z.enum(['internal', 'external', 'industry', 'regional', 'national']);
const reportTypeEnum = z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'annual', 'custom']);
const chartTypeEnum = z.enum(['line', 'bar', 'pie', 'scatter', 'heatmap', 'gauge', 'funnel', 'treemap', 'radar', 'box_plot']);
const autoClassificationCategoryEnum = z.enum(['student_query', 'parent_complaint', 'teacher_feedback', 'maintenance_request', 'financial_inquiry', 'academic_inquiry', 'hr_inquiry', 'general_inquiry']);
const priorityLevelEnum = z.enum(['low', 'medium', 'high', 'urgent']);

export const createKnowledgeBaseArticleSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(50000),
  contentType: contentTypeEnum,
  category: knowledgeBaseCategoryEnum,
  tags: z.array(z.string().max(50)).max(20).optional(),
  summary: z.string().max(2000).optional(),
  author: z.string().max(200).optional(),
  isPublished: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateKnowledgeBaseArticleSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).max(50000).optional(),
  contentType: contentTypeEnum.optional(),
  category: knowledgeBaseCategoryEnum.optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  summary: z.string().max(2000).optional(),
  author: z.string().max(200).optional(),
  isPublished: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const queryKnowledgeBaseSchema = z.object({
  schoolId: z.string().uuid(),
  query: z.string().min(1).max(200),
  category: knowledgeBaseCategoryEnum.optional(),
  contentType: contentTypeEnum.optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  offset: z.number().int().min(0).optional(),
});

export const createNLPTaskSchema = z.object({
  schoolId: z.string().uuid(),
  text: z.string().min(1).max(10000),
  language: z.enum(['fr', 'en']).optional(),
  task: z.enum(['sentiment_analysis', 'text_classification', 'entity_extraction', 'summarization', 'translation', 'question_answering', 'text_generation']),
  config: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createSentimentAnalysisSchema = z.object({
  schoolId: z.string().uuid(),
  text: z.string().min(1).max(10000),
  language: z.enum(['fr', 'en']).optional(),
  granularity: sentimentAnalysisGranularityEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createAutoClassificationSchema = z.object({
  schoolId: z.string().uuid(),
  text: z.string().min(1).max(5000),
  language: z.enum(['fr', 'en']).optional(),
  categories: z.array(autoClassificationCategoryEnum).optional(),
  priority: priorityLevelEnum.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createTextSummarizationSchema = z.object({
  schoolId: z.string().uuid(),
  text: z.string().min(1).max(50000),
  type: summarizationTypeEnum,
  maxLength: z.number().int().min(100).max(5000).optional(),
  minLength: z.number().int().min(50).max(2000).optional(),
  language: z.enum(['fr', 'en']).optional(),
  includeKeyMetrics: z.boolean().optional(),
  includeRecommendations: z.boolean().optional(),
  includeTrends: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const analyzeDocumentSchema = z.object({
  schoolId: z.string().uuid(),
  documentUrl: z.string().url(),
  documentType: documentTypeEnum,
  features: z.array(z.enum(['ocr', 'text_extraction', 'entity_recognition', 'sentiment_analysis', 'classification', 'summarization', 'translation'])).min(1),
  language: z.enum(['fr', 'en']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createBenchmarkSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: benchmarkTypeEnum,
  dimension: z.string().max(100),
  value: z.number(),
  unit: z.string().max(50).optional(),
  period: z.string().max(50).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const queryBenchmarkSchema = z.object({
  schoolId: z.string().uuid(),
  type: benchmarkTypeEnum.optional(),
  dimension: z.string().max(100).optional(),
  period: z.string().max(50).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const createAIInsightSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  type: z.enum(['performance', 'trend', 'anomaly', 'correlation', 'prediction', 'recommendation', 'risk', 'opportunity']),
  category: z.string().max(100).optional(),
  confidence: z.number().min(0).max(1),
  entityType: z.string().max(100).optional(),
  entityId: z.string().uuid().optional(),
  data: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateAIInsightSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(5000).optional(),
  confidence: z.number().min(0).max(1).optional(),
  isRead: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const queryAIInsightSchema = z.object({
  schoolId: z.string().uuid(),
  type: z.enum(['performance', 'trend', 'anomaly', 'correlation', 'prediction', 'recommendation', 'risk', 'opportunity']).optional(),
  category: z.string().max(100).optional(),
  entityType: z.string().max(100).optional(),
  entityId: z.string().uuid().optional(),
  isRead: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  minConfidence: z.number().min(0).max(1).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const createAnalyticsReportSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: reportTypeEnum,
  format: z.enum(['pdf', 'excel', 'csv', 'json', 'html']),
  config: z.record(z.unknown()).optional(),
  schedule: z.string().max(50).optional(),
  recipients: z.array(z.string().email()).max(50).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const generateReportSchema = z.object({
  schoolId: z.string().uuid(),
  reportId: z.string().uuid(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  parameters: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createVisualizationSchema = z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(200),
  chartType: chartTypeEnum,
  data: z.record(z.unknown()),
  config: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

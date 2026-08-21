import { z } from 'zod';

const predictiveModelTypeEnum = z.enum(['student_performance', 'dropout_risk', 'attendance_prediction', 'financial_forecast', 'resource_optimization', 'teacher_retention', 'enrollment_forecast']);
const riskLevelEnum = z.enum(['low', 'medium', 'high', 'critical']);
const interventionTypeEnum = z.enum(['counseling', 'academic_support', 'financial_aid', 'parent_engagement', 'peer_mentoring', 'specialist_referral']);
const earlyWarningTypeEnum = z.enum(['academic_decline', 'attendance_pattern', 'behavioral_change', 'financial_distress', 'social_isolation', 'health_concern']);
const severityLevelEnum = z.enum(['low', 'medium', 'high', 'critical']);
const outlookTypeEnum = z.enum(['student_success', 'institutional_performance', 'financial_health', 'operational_efficiency', 'strategic_alignment']);
const scenarioTypeEnum = z.enum(['best_case', 'worst_case', 'base_case', 'custom']);

export const createPredictiveModelSchema = z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: predictiveModelTypeEnum,
  config: z.record(z.unknown()).optional(),
  trainingDataPoints: z.number().int().min(0).optional(),
  accuracy: z.number().min(0).max(1).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updatePredictiveModelSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: predictiveModelTypeEnum.optional(),
  config: z.record(z.unknown()).optional(),
  accuracy: z.number().min(0).max(1).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createStudentRiskAssessmentSchema = z.object({
  schoolId: z.string().uuid(),
  studentId: z.string().uuid(),
  riskScore: z.number().min(0).max(100),
  riskLevel: riskLevelEnum,
  riskFactors: z.array(z.object({
    factor: z.string().max(100),
    score: z.number().min(0).max(100),
    weight: z.number().min(0).max(1).optional(),
    description: z.string().max(500).optional(),
  })).min(1),
  recommendedInterventions: z.array(interventionTypeEnum).optional(),
  confidence: z.number().min(0).max(1).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateStudentRiskAssessmentSchema = z.object({
  riskScore: z.number().min(0).max(100).optional(),
  riskLevel: riskLevelEnum.optional(),
  riskFactors: z.array(z.object({
    factor: z.string().max(100),
    score: z.number().min(0).max(100),
    weight: z.number().min(0).max(1).optional(),
    description: z.string().max(500).optional(),
  })).min(1).optional(),
  recommendedInterventions: z.array(interventionTypeEnum).optional(),
  confidence: z.number().min(0).max(1).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createEarlyWarningSchema = z.object({
  schoolId: z.string().uuid(),
  entityType: z.string().max(100),
  entityId: z.string().uuid(),
  type: earlyWarningTypeEnum,
  severity: severityLevelEnum,
  message: z.string().min(1).max(2000),
  data: z.record(z.unknown()).optional(),
  confidence: z.number().min(0).max(1).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateEarlyWarningSchema = z.object({
  severity: severityLevelEnum.optional(),
  status: z.enum(['active', 'acknowledged', 'resolved', 'escalated']).optional(),
  acknowledgedBy: z.string().uuid().optional(),
  resolvedBy: z.string().uuid().optional(),
  resolution: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createStudentOutlookSchema = z.object({
  schoolId: z.string().uuid(),
  studentId: z.string().uuid(),
  type: outlookTypeEnum,
  horizonDays: z.number().int().min(1).max(365),
  score: z.number().min(0).max(100),
  confidence: z.number().min(0).max(1),
  factors: z.array(z.object({
    factor: z.string().max(100),
    impact: z.number().min(-1).max(1),
    description: z.string().max(500).optional(),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createScenarioSchema = z.object({
  schoolId: z.string().uuid(),
  modelId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: scenarioTypeEnum,
  parameters: z.record(z.unknown()),
  results: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const updateScenarioSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: scenarioTypeEnum.optional(),
  parameters: z.record(z.unknown()).optional(),
  results: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const queryStudentRiskAssessmentSchema = z.object({
  schoolId: z.string().uuid(),
  studentId: z.string().uuid().optional(),
  riskLevel: riskLevelEnum.optional(),
  minRiskScore: z.number().min(0).max(100).optional(),
  maxRiskScore: z.number().min(0).max(100).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const queryEarlyWarningSchema = z.object({
  schoolId: z.string().uuid(),
  type: earlyWarningTypeEnum.optional(),
  severity: severityLevelEnum.optional(),
  entityType: z.string().max(100).optional(),
  entityId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const queryPredictiveModelSchema = z.object({
  schoolId: z.string().uuid(),
  type: predictiveModelTypeEnum.optional(),
  isActive: z.boolean().optional(),
  minAccuracy: z.number().min(0).max(1).optional(),
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

import { z } from 'zod';

const zString = (fieldName: string) => z.string({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(1, `Le ${fieldName} est requis`);
const zOptionalString = z.string({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zDate = z.coerce.date({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalDate = z.coerce.date({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zNumber = z.number({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(0);
const zOptionalNumber = z.number({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).min(0).optional();
const zBoolean = z.boolean({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalBoolean = z.boolean({ required_error: 'Champ requis', invalid_type_error: 'Type invalide' }).optional();
const zUuid = z.string().uuid('UUID invalide');
const zOptionalUuid = z.string().uuid('UUID invalide').optional();
const zArray = <T extends z.ZodTypeAny>(schema: T) => z.array(schema, { required_error: 'Champ requis', invalid_type_error: 'Type invalide' });
const zOptionalArray = <T extends z.ZodTypeAny>(schema: T) => z.array(schema).optional();
const zRecord = <T extends z.ZodTypeAny>(schema: T) => z.record(schema, { required_error: 'Champ requis', invalid_type_error: 'Type invalide' });

export const FinanceForecastCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['revenue', 'expense', 'cashflow', 'budget', 'investment']),
  period: z.enum(['monthly', 'quarterly', 'yearly', 'custom']),
  startDate: zDate,
  endDate: zDate,
  status: z.enum(['draft', 'active', 'completed', 'archived']).optional(),
  school_id: zUuid,
  methodology: zOptionalString,
  confidenceLevel: zOptionalNumber,
});

export const FinanceForecastUpdateSchema = FinanceForecastCreateSchema.partial();

export const FinancePredictionCreateSchema = z.object({
  forecast_id: zUuid,
  category: zString('catégorie'),
  subcategory: zOptionalString,
  amount: zNumber,
  currency: zOptionalString,
  probability: zOptionalNumber,
  lowerBound: zOptionalNumber,
  upperBound: zOptionalNumber,
  factors: zRecord(z.unknown()).optional(),
  timestamp: zDate.optional(),
  model: zOptionalString,
});

export const FinancePredictionUpdateSchema = FinancePredictionCreateSchema.partial();

export const FinanceAnomalyCreateSchema = z.object({
  school_id: zUuid,
  type: z.enum(['spending', 'revenue', 'pattern', 'threshold', 'fraud']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  description: zString('description'),
  amount: zOptionalNumber,
  detectedAt: zOptionalDate,
  status: z.enum(['detected', 'investigating', 'resolved', 'false_positive']).optional(),
  resolvedBy: zOptionalUuid,
  resolvedAt: zOptionalDate,
  metadata: zRecord(z.unknown()).optional(),
});

export const FinanceAnomalyUpdateSchema = FinanceAnomalyCreateSchema.partial();

export const FinanceOptimizationCreateSchema = z.object({
  school_id: zUuid,
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['cost_reduction', 'revenue_increase', 'cashflow_improvement', 'investment']),
  status: z.enum(['identified', 'analyzing', 'proposed', 'approved', 'implemented', 'monitoring']).optional(),
  estimatedImpact: zOptionalNumber,
  actualImpact: zOptionalNumber,
  confidence: zOptionalNumber,
  recommendations: zOptionalArray(zRecord(z.unknown())),
  school_id: zUuid,
});

export const FinanceOptimizationUpdateSchema = FinanceOptimizationCreateSchema.partial();

export const FinanceBudgetCreateSchema = z.object({
  name: zString('nom'),
  fiscalYear: zNumber,
  totalBudget: zNumber,
  currency: zOptionalString,
  status: z.enum(['draft', 'approved', 'active', 'closed']).optional(),
  approvedBy: zOptionalUuid,
  approvedAt: zOptionalDate,
  school_id: zUuid,
  lastReview: zOptionalDate,
});

export const FinanceBudgetUpdateSchema = FinanceBudgetCreateSchema.partial();

export const FinanceBudgetLineCreateSchema = z.object({
  budget_id: zUuid,
  category: zString('catégorie'),
  subcategory: zOptionalString,
  planned: zNumber,
  actual: zOptionalNumber,
  variance: zOptionalNumber,
  percentage: zOptionalNumber,
  notes: zOptionalString,
});

export const FinanceBudgetLineUpdateSchema = FinanceBudgetLineCreateSchema.partial();

export const FinanceKRICreateSchema = z.object({
  school_id: zUuid,
  name: zString('nom'),
  category: z.enum(['liquidity', 'profitability', 'efficiency', 'growth', 'stability']),
  value: zNumber,
  target: zOptionalNumber,
  unit: zOptionalString,
  period: zString('période'),
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  calculatedAt: zOptionalDate,
});

export const FinanceKRIUpdateSchema = FinanceKRICreateSchema.partial();

export const FinanceAlertCreateSchema = z.object({
  school_id: zUuid,
  alertType: z.enum(['budget_overrun', 'cashflow_low', 'anomaly', 'deadline', 'compliance']),
  severity: z.enum(['info', 'warning', 'critical']),
  message: zString('message'),
  status: z.enum(['active', 'acknowledged', 'resolved']).optional(),
  triggeredAt: zOptionalDate,
  acknowledgedAt: zOptionalDate,
  resolvedAt: zOptionalDate,
  metadata: zRecord(z.unknown()).optional(),
});

export const FinanceAlertUpdateSchema = FinanceAlertCreateSchema.partial();

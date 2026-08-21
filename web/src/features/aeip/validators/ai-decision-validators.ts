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

export const DecisionModelCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['classification', 'regression', 'clustering', 'recommendation', 'optimization']),
  version: zString('version'),
  config: z.record(z.unknown()).optional(),
  status: z.enum(['draft', 'trained', 'validated', 'deployed', 'deprecated']).optional(),
  trainingData: zOptionalUuid,
  accuracy: zOptionalNumber,
  school_id: zUuid,
});

export const DecisionModelUpdateSchema = DecisionModelCreateSchema.partial();

export const DecisionRuleCreateSchema = z.object({
  model_id: zUuid,
  name: zString('nom'),
  description: zOptionalString,
  condition: z.record(z.unknown()),
  action: z.record(z.unknown()),
  priority: zOptionalNumber,
  isActive: zOptionalBoolean,
  validFrom: zOptionalDate,
  validTo: zOptionalDate,
});

export const DecisionRuleUpdateSchema = DecisionRuleCreateSchema.partial();

export const DecisionContextCreateSchema = z.object({
  model_id: zUuid,
  contextType: z.enum(['academic', 'financial', 'operational', 'behavioral', 'strategic']),
  parameters: z.record(z.unknown()),
  constraints: zOptionalArray(z.record(z.unknown())),
  school_id: zUuid,
  weight: zOptionalNumber,
});

export const DecisionContextUpdateSchema = DecisionContextCreateSchema.partial();

export const DecisionExecutionCreateSchema = z.object({
  model_id: zUuid,
  context_id: zOptionalUuid,
  input: z.record(z.unknown()),
  output: z.record(z.unknown()),
  confidence: zOptionalNumber,
  status: z.enum(['pending', 'executed', 'approved', 'rejected', 'rolled_back']).optional(),
  executedAt: zOptionalDate,
  approvedBy: zOptionalUuid,
  approvedAt: zOptionalDate,
  school_id: zUuid,
});

export const DecisionExecutionUpdateSchema = DecisionExecutionCreateSchema.partial();

export const DecisionFeedbackCreateSchema = z.object({
  execution_id: zUuid,
  rating: z.number().min(1).max(5),
  comment: zOptionalString,
  outcome: z.enum(['positive', 'negative', 'neutral', 'mixed']),
  providedBy: zUuid,
  providedAt: zDate.optional(),
  impact: zOptionalNumber,
});

export const DecisionFeedbackUpdateSchema = DecisionFeedbackCreateSchema.partial();

export const DecisionAuditCreateSchema = z.object({
  execution_id: zUuid,
  action: zString('action'),
  details: z.record(z.unknown()).optional(),
  actor: zString('acteur'),
  timestamp: zDate.optional(),
  ipAddress: zOptionalString,
});

export const DecisionAuditUpdateSchema = DecisionAuditCreateSchema.partial();

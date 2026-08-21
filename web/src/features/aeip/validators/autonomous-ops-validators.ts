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

export const AutonomousOperationCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['scheduled', 'triggered', 'continuous', 'emergency']),
  status: z.enum(['active', 'paused', 'completed', 'failed']).optional(),
  config: z.record(z.unknown()).optional(),
  school_id: zUuid,
  priority: zOptionalNumber,
  schedule: zOptionalString,
  retryPolicy: z.object({
    maxRetries: zOptionalNumber,
    delayMs: zOptionalNumber,
  }).optional(),
});

export const AutonomousOperationUpdateSchema = AutonomousOperationCreateSchema.partial();

export const OperationExecutionCreateSchema = z.object({
  operation_id: zUuid,
  status: z.enum(['queued', 'running', 'completed', 'failed', 'cancelled']).optional(),
  input: z.record(z.unknown()).optional(),
  output: z.record(z.unknown()).optional(),
  error: zOptionalString,
  startedAt: zOptionalDate,
  endedAt: zOptionalDate,
  duration: zOptionalNumber,
  triggeredBy: zOptionalString,
});

export const OperationExecutionUpdateSchema = OperationExecutionCreateSchema.partial();

export const OperationScheduleCreateSchema = z.object({
  operation_id: zUuid,
  cronExpression: zString('expression cron'),
  timezone: zOptionalString,
  isActive: zOptionalBoolean,
  lastRun: zOptionalDate,
  nextRun: zOptionalDate,
  maxConcurrent: zOptionalNumber,
  cooldownPeriod: zOptionalNumber,
});

export const OperationScheduleUpdateSchema = OperationScheduleCreateSchema.partial();

export const OperationAlertCreateSchema = z.object({
  operation_id: zUuid,
  alertType: z.enum(['failure', 'timeout', 'threshold', 'anomaly', 'custom']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  message: zString('message'),
  status: z.enum(['active', 'acknowledged', 'resolved']).optional(),
  threshold: zOptionalNumber,
  currentValue: zOptionalNumber,
  notifiedAt: zOptionalDate,
  acknowledgedAt: zOptionalDate,
  resolvedAt: zOptionalDate,
});

export const OperationAlertUpdateSchema = OperationAlertCreateSchema.partial();

export const OperationMetricCreateSchema = z.object({
  operation_id: zUuid,
  metricName: zString('nom de la métrique'),
  value: zNumber,
  unit: zOptionalString,
  tags: z.record(z.string()).optional(),
  timestamp: zDate.optional(),
  aggregationType: z.enum(['avg', 'sum', 'min', 'max', 'count']).optional(),
});

export const OperationMetricUpdateSchema = OperationMetricCreateSchema.partial();

export const AutomationRuleCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  triggerType: z.enum(['event', 'schedule', 'threshold', 'manual']),
  conditions: zArray(z.record(z.unknown())),
  actions: zArray(z.record(z.unknown())),
  isActive: zOptionalBoolean,
  school_id: zUuid,
  priority: zOptionalNumber,
  cooldown: zOptionalNumber,
});

export const AutomationRuleUpdateSchema = AutomationRuleCreateSchema.partial();

export const OperationAuditCreateSchema = z.object({
  operation_id: zUuid,
  execution_id: zOptionalUuid,
  action: zString('action'),
  actor: zString('acteur'),
  details: z.record(z.unknown()).optional(),
  timestamp: zDate.optional(),
  ipAddress: zOptionalString,
  userAgent: zOptionalString,
});

export const OperationAuditUpdateSchema = OperationAuditCreateSchema.partial();

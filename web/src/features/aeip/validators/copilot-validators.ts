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

export const CopilotCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['assistant', 'advisor', 'analyst', 'generator', 'monitor']),
  status: z.enum(['active', 'inactive', 'maintenance']).optional(),
  config: z.record(z.unknown()).optional(),
  school_id: zUuid,
  ownerId: zUuid,
  permissions: zOptionalArray(zString('permission')),
});

export const CopilotUpdateSchema = CopilotCreateSchema.partial();

export const CopilotSessionCreateSchema = z.object({
  copilot_id: zUuid,
  userId: zUuid,
  context: zRecord(z.unknown()).optional(),
  status: z.enum(['active', 'paused', 'ended']).optional(),
  startedAt: zOptionalDate,
  endedAt: zOptionalDate,
  messageCount: zOptionalNumber,
  satisfactionScore: zOptionalNumber,
});

export const CopilotSessionUpdateSchema = CopilotSessionCreateSchema.partial();

export const CopilotMessageCreateSchema = z.object({
  session_id: zUuid,
  role: z.enum(['user', 'assistant', 'system']),
  content: zString('contenu'),
  messageType: z.enum(['text', 'code', 'suggestion', 'action', 'error']),
  metadata: zRecord(z.unknown()).optional(),
  tokens: zOptionalNumber,
  model: zOptionalString,
  timestamp: zDate.optional(),
});

export const CopilotMessageUpdateSchema = CopilotMessageCreateSchema.partial();

export const CopilotSuggestionCreateSchema = z.object({
  copilot_id: zUuid,
  userId: zUuid,
  suggestionType: z.enum(['action', 'content', 'navigation', 'optimization', 'warning']),
  content: zRecord(z.unknown()),
  confidence: zOptionalNumber,
  status: z.enum(['pending', 'accepted', 'rejected', 'expired']).optional(),
  context: zRecord(z.unknown()).optional(),
  expiresAt: zOptionalDate,
  school_id: zUuid,
});

export const CopilotSuggestionUpdateSchema = CopilotSuggestionCreateSchema.partial();

export const CopilotPluginCreateSchema = z.object({
  copilot_id: zUuid,
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['skill', 'tool', 'integration', 'extension']),
  config: zRecord(z.unknown()).optional(),
  isActive: zOptionalBoolean,
  version: zString('version'),
  dependencies: zOptionalArray(zUuid),
});

export const CopilotPluginUpdateSchema = CopilotPluginCreateSchema.partial();

export const CopilotFeedbackCreateSchema = z.object({
  session_id: zUuid,
  userId: zUuid,
  rating: z.number().min(1).max(5),
  comment: zOptionalString,
  feedbackType: z.enum(['quality', 'accuracy', 'relevance', 'usability']),
  providedAt: zDate.optional(),
  resolvedAt: zOptionalDate,
});

export const CopilotFeedbackUpdateSchema = CopilotFeedbackCreateSchema.partial();

export const CopilotContextCreateSchema = z.object({
  copilot_id: zUuid,
  contextType: z.enum(['user', 'session', 'school', 'global']),
  data: zRecord(z.unknown()),
  priority: zOptionalNumber,
  expiresAt: zOptionalDate,
  school_id: zUuid,
});

export const CopilotContextUpdateSchema = CopilotContextCreateSchema.partial();

export const CopilotUsageCreateSchema = z.object({
  copilot_id: zUuid,
  userId: zUuid,
  action: zString('action'),
  feature: zString('fonctionnalité'),
  tokensUsed: zOptionalNumber,
  duration: zOptionalNumber,
  success: zOptionalBoolean,
  timestamp: zDate.optional(),
  metadata: zRecord(z.unknown()).optional(),
});

export const CopilotUsageUpdateSchema = CopilotUsageCreateSchema.partial();

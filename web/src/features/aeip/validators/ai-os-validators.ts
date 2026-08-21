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

export const AIKernelCreateSchema = z.object({
  name: zString('nom'),
  version: zString('version'),
  description: zOptionalString,
  config: z.record(z.unknown()).optional(),
  status: z.enum(['active', 'inactive', 'maintenance']).optional(),
  maxConcurrentProcesses: zOptionalNumber,
});

export const AIKernelUpdateSchema = AIKernelCreateSchema.partial();

export const AIServiceCreateSchema = z.object({
  name: zString('nom'),
  kernel_id: zUuid,
  type: z.enum(['inference', 'training', 'preprocessing', 'postprocessing']),
  endpoint: zOptionalString,
  config: z.record(z.unknown()).optional(),
  status: z.enum(['active', 'inactive', 'error']).optional(),
  priority: zOptionalNumber,
});

export const AIServiceUpdateSchema = AIServiceCreateSchema.partial();

export const AIServiceLogCreateSchema = z.object({
  service_id: zUuid,
  level: z.enum(['debug', 'info', 'warning', 'error', 'critical']),
  message: zString('message'),
  metadata: z.record(z.unknown()).optional(),
  timestamp: zDate.optional(),
});

export const AIServiceLogUpdateSchema = AIServiceLogCreateSchema.partial();

export const AIResourceCreateSchema = z.object({
  name: zString('nom'),
  type: z.enum(['gpu', 'cpu', 'memory', 'storage', 'network']),
  capacity: zNumber,
  used: zOptionalNumber,
  unit: zString('unité'),
  kernel_id: zOptionalUuid,
  status: z.enum(['available', 'reserved', 'overloaded']).optional(),
});

export const AIResourceUpdateSchema = AIResourceCreateSchema.partial();

export const AIProcessCreateSchema = z.object({
  name: zString('nom'),
  service_id: zUuid,
  status: z.enum(['pending', 'running', 'completed', 'failed', 'cancelled']).optional(),
  input: z.record(z.unknown()).optional(),
  output: z.record(z.unknown()).optional(),
  startedAt: zOptionalDate,
  endedAt: zOptionalDate,
  priority: zOptionalNumber,
  retryCount: zOptionalNumber,
});

export const AIProcessUpdateSchema = AIProcessCreateSchema.partial();

export const AICapabilityCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  version: zString('version'),
  type: z.enum(['nlp', 'vision', 'speech', 'reasoning', 'planning']),
  config: z.record(z.unknown()).optional(),
  isEnabled: zOptionalBoolean,
  dependencies: zOptionalArray(zUuid),
});

export const AICapabilityUpdateSchema = AICapabilityCreateSchema.partial();

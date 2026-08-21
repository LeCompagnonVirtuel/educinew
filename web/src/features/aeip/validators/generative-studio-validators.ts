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

export const GenerativeProjectCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['course', 'assessment', 'material', 'presentation', 'interactive']),
  status: z.enum(['draft', 'in_progress', 'review', 'completed', 'published']).optional(),
  config: z.record(z.unknown()).optional(),
  school_id: zUuid,
  ownerId: zUuid,
  templateId: zOptionalUuid,
});

export const GenerativeProjectUpdateSchema = GenerativeProjectCreateSchema.partial();

export const GenerativeAssetCreateSchema = z.object({
  project_id: zUuid,
  name: zString('nom'),
  type: z.enum(['text', 'image', 'audio', 'video', 'document', 'interactive']),
  content: z.record(z.unknown()),
  metadata: zRecord(z.unknown()).optional(),
  status: z.enum(['generating', 'completed', 'failed', 'review']).optional(),
  model: zOptionalString,
  prompt: zOptionalString,
  generationTime: zOptionalNumber,
  school_id: zUuid,
});

export const GenerativeAssetUpdateSchema = GenerativeAssetCreateSchema.partial();

export const GenerativeTemplateCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  category: z.enum(['course', 'assessment', 'certificate', 'report', 'communication']),
  content: zRecord(z.unknown()),
  variables: zOptionalArray(zRecord(z.unknown())),
  isPublic: zOptionalBoolean,
  school_id: zUuid,
  usageCount: zOptionalNumber,
  rating: zOptionalNumber,
});

export const GenerativeTemplateUpdateSchema = GenerativeTemplateCreateSchema.partial();

export const GenerativePromptCreateSchema = z.object({
  name: zString('nom'),
  template: zString('modèle'),
  description: zOptionalString,
  category: z.enum(['content', 'quiz', 'feedback', 'analysis', 'creative']),
  variables: zOptionalArray(zRecord(z.unknown())),
  model: zOptionalString,
  parameters: zRecord(z.unknown()).optional(),
  school_id: zUuid,
  usageCount: zOptionalNumber,
});

export const GenerativePromptUpdateSchema = GenerativePromptCreateSchema.partial();

export const GenerativeStyleCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['visual', 'tone', 'language', 'format']),
  config: zRecord(z.unknown()),
  school_id: zUuid,
  isDefault: zOptionalBoolean,
});

export const GenerativeStyleUpdateSchema = GenerativeStyleCreateSchema.partial();

export const GenerativeHistoryCreateSchema = z.object({
  project_id: zUuid,
  asset_id: zOptionalUuid,
  action: z.enum(['create', 'update', 'delete', 'generate', 'regenerate', 'publish']),
  details: zRecord(z.unknown()).optional(),
  userId: zUuid,
  timestamp: zDate.optional(),
  school_id: zUuid,
});

export const GenerativeHistoryUpdateSchema = GenerativeHistoryCreateSchema.partial();

export const GenerativeBatchCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  prompt_id: zUuid,
  items: zArray(zRecord(z.unknown())),
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'partial']).optional(),
  totalItems: zOptionalNumber,
  completedItems: zOptionalNumber,
  failedItems: zOptionalNumber,
  school_id: zUuid,
  startedAt: zOptionalDate,
  completedAt: zOptionalDate,
});

export const GenerativeBatchUpdateSchema = GenerativeBatchCreateSchema.partial();

export const GenerativeCollaborationCreateSchema = z.object({
  project_id: zUuid,
  userId: zUuid,
  role: z.enum(['editor', 'reviewer', 'viewer', 'commenter']),
  status: z.enum(['pending', 'active', 'inactive']).optional(),
  invitedAt: zOptionalDate,
  joinedAt: zOptionalDate,
  lastActivity: zOptionalDate,
});

export const GenerativeCollaborationUpdateSchema = GenerativeCollaborationCreateSchema.partial();

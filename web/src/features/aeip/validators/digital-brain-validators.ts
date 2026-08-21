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

export const DigitalBrainCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  type: z.enum(['knowledge_base', 'reasoning_engine', 'learning_system', 'memory_system']),
  status: z.enum(['initializing', 'active', 'maintenance', 'offline']).optional(),
  config: z.record(z.unknown()).optional(),
  school_id: zUuid,
  version: zString('version'),
});

export const DigitalBrainUpdateSchema = DigitalBrainCreateSchema.partial();

export const KnowledgeNodeCreateSchema = z.object({
  brain_id: zUuid,
  name: zString('nom'),
  type: z.enum(['concept', 'fact', 'rule', 'procedure', 'relationship']),
  content: z.record(z.unknown()),
  confidence: zOptionalNumber,
  source: zOptionalString,
  tags: zOptionalArray(zString('tag')),
  metadata: zRecord(z.unknown()).optional(),
  school_id: zUuid,
});

export const KnowledgeNodeUpdateSchema = KnowledgeNodeCreateSchema.partial();

export const KnowledgeEdgeCreateSchema = z.object({
  source_id: zUuid,
  target_id: zUuid,
  relationship: zString('relation'),
  weight: zOptionalNumber,
  bidirectional: zOptionalBoolean,
  metadata: zRecord(z.unknown()).optional(),
});

export const KnowledgeEdgeUpdateSchema = KnowledgeEdgeCreateSchema.partial();

export const ReasoningPathCreateSchema = z.object({
  brain_id: zUuid,
  query: zString('requête'),
  path: zArray(zRecord(z.unknown())),
  conclusion: zOptionalString,
  confidence: zOptionalNumber,
  executionTime: zOptionalNumber,
  status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
  school_id: zUuid,
});

export const ReasoningPathUpdateSchema = ReasoningPathCreateSchema.partial();

export const LearningCycleCreateSchema = z.object({
  brain_id: zUuid,
  cycleType: z.enum(['supervised', 'unsupervised', 'reinforcement', 'transfer']),
  trainingData: zRecord(z.unknown()),
  metrics: zRecord(z.unknown()).optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed']).optional(),
  startedAt: zOptionalDate,
  completedAt: zOptionalDate,
  school_id: zUuid,
});

export const LearningCycleUpdateSchema = LearningCycleCreateSchema.partial();

export const MemoryStoreCreateSchema = z.object({
  brain_id: zUuid,
  memoryType: z.enum(['short_term', 'long_term', 'working', 'episodic']),
  content: zRecord(z.unknown()),
  importance: zOptionalNumber,
  decayRate: zOptionalNumber,
  accessCount: zOptionalNumber,
  lastAccessed: zOptionalDate,
  tags: zOptionalArray(zString('tag')),
});

export const MemoryStoreUpdateSchema = MemoryStoreCreateSchema.partial();

export const CognitiveProcessCreateSchema = z.object({
  brain_id: zUuid,
  processType: z.enum(['perception', 'attention', 'reasoning', 'decision', 'action']),
  input: zRecord(z.unknown()),
  output: zRecord(z.unknown()).optional(),
  status: z.enum(['pending', 'active', 'completed', 'interrupted']).optional(),
  duration: zOptionalNumber,
  school_id: zUuid,
});

export const CognitiveProcessUpdateSchema = CognitiveProcessCreateSchema.partial();

export const BrainPerformanceCreateSchema = z.object({
  brain_id: zUuid,
  metricType: z.enum(['accuracy', 'latency', 'throughput', 'memory_usage', 'cpu_usage']),
  value: zNumber,
  unit: zOptionalString,
  timestamp: zDate.optional(),
  metadata: zRecord(z.unknown()).optional(),
});

export const BrainPerformanceUpdateSchema = BrainPerformanceCreateSchema.partial();

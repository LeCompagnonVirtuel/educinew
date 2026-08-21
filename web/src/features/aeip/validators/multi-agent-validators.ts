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

export const AgentCreateSchema = z.object({
  name: zString('nom'),
  role: zString('rôle'),
  type: z.enum(['coordinator', 'executor', 'analyst', 'monitor', 'specialist']),
  status: z.enum(['idle', 'active', 'paused', 'error']).optional(),
  capabilities: zOptionalArray(zUuid),
  config: z.record(z.unknown()).optional(),
  school_id: zUuid,
});

export const AgentUpdateSchema = AgentCreateSchema.partial();

export const AgentTaskCreateSchema = z.object({
  agent_id: zUuid,
  task_type: zString('type de tâche'),
  description: zOptionalString,
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  status: z.enum(['pending', 'assigned', 'in_progress', 'completed', 'failed']).optional(),
  input: z.record(z.unknown()).optional(),
  output: z.record(z.unknown()).optional(),
  deadline: zOptionalDate,
  assignedAt: zOptionalDate,
  completedAt: zOptionalDate,
});

export const AgentTaskUpdateSchema = AgentTaskCreateSchema.partial();

export const AgentCommunicationCreateSchema = z.object({
  sender_id: zUuid,
  receiver_id: zUuid,
  message_type: z.enum(['request', 'response', 'broadcast', 'alert']),
  content: z.record(z.unknown()),
  status: z.enum(['sent', 'delivered', 'read', 'failed']).optional(),
  timestamp: zDate.optional(),
  correlationId: zOptionalString,
});

export const AgentCommunicationUpdateSchema = AgentCommunicationCreateSchema.partial();

export const AgentWorkflowCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  agents: zArray(zUuid),
  steps: zArray(z.object({
    stepId: zString('identifiant'),
    agentId: zUuid,
    action: zString('action'),
    config: z.record(z.unknown()).optional(),
    nextStepId: zOptionalUuid,
  })),
  status: z.enum(['draft', 'active', 'paused', 'completed']).optional(),
  school_id: zUuid,
  triggerCondition: zOptionalString,
});

export const AgentWorkflowUpdateSchema = AgentWorkflowCreateSchema.partial();

export const AgentPerformanceCreateSchema = z.object({
  agent_id: zUuid,
  metric_type: z.enum(['task_completion', 'response_time', 'accuracy', 'efficiency']),
  value: zNumber,
  unit: zOptionalString,
  period: zString('période'),
  recordedAt: zDate.optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const AgentPerformanceUpdateSchema = AgentPerformanceCreateSchema.partial();

export const AgentCollaborationCreateSchema = z.object({
  name: zString('nom'),
  description: zOptionalString,
  participants: zArray(zUuid),
  objective: zString('objectif'),
  status: z.enum(['planning', 'active', 'completed', 'cancelled']).optional(),
  startDate: zOptionalDate,
  endDate: zOptionalDate,
  result: zOptionalString,
  school_id: zUuid,
});

export const AgentCollaborationUpdateSchema = AgentCollaborationCreateSchema.partial();

export const AgentLearningCreateSchema = z.object({
  agent_id: zUuid,
  learning_type: z.enum(['reinforcement', 'imitation', 'transfer', 'meta']),
  trainingData: zOptionalString,
  modelVersion: zOptionalString,
  performanceBefore: zOptionalNumber,
  performanceAfter: zOptionalNumber,
  status: z.enum(['pending', 'in_progress', 'completed', 'failed']).optional(),
  startedAt: zOptionalDate,
  completedAt: zOptionalDate,
});

export const AgentLearningUpdateSchema = AgentLearningCreateSchema.partial();

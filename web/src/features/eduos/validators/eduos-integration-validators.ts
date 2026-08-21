import { z } from 'zod';

const schoolId = z.string().uuid();

// ── Module 9 - Ecosystem Integration Hub ────────

export const integrationConnectorCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  provider: z.string(),
  category: z.enum(['PRODUCTIVITY', 'COMMUNICATION', 'LMS', 'PAYMENT', 'CLOUD', 'CRM', 'MARKETING', 'AI_SERVICE', 'SOCIAL', 'ANALYTICS']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ERROR', 'CONFIGURING', 'UPDATING', 'DEPRECATED']),
  auth_type: z.enum(['API_KEY', 'OAUTH2', 'BASIC', 'BEARER', 'WEBHOOK', 'HMAC']),
  api_endpoint: z.string(),
  config: z.record(z.unknown()),
  sync_direction: z.enum(['PUSH', 'PULL', 'BIDIRECTIONAL']),
  data_format: z.enum(['JSON', 'XML', 'CSV', 'FORM_DATA', 'BINARY', 'TEXT']),
  tier: z.enum(['FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE']),
  health: z.enum(['HEALTHY', 'DEGRADED', 'UNHEALTHY', 'UNKNOWN']),
  last_sync: z.string().datetime().nullable(),
});

export const integrationConnectorUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  provider: z.string().optional(),
  category: z.enum(['PRODUCTIVITY', 'COMMUNICATION', 'LMS', 'PAYMENT', 'CLOUD', 'CRM', 'MARKETING', 'AI_SERVICE', 'SOCIAL', 'ANALYTICS']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ERROR', 'CONFIGURING', 'UPDATING', 'DEPRECATED']).optional(),
  auth_type: z.enum(['API_KEY', 'OAUTH2', 'BASIC', 'BEARER', 'WEBHOOK', 'HMAC']).optional(),
  api_endpoint: z.string().optional(),
  config: z.record(z.unknown()).optional(),
  sync_direction: z.enum(['PUSH', 'PULL', 'BIDIRECTIONAL']).optional(),
  data_format: z.enum(['JSON', 'XML', 'CSV', 'FORM_DATA', 'BINARY', 'TEXT']).optional(),
  tier: z.enum(['FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE']).optional(),
  health: z.enum(['HEALTHY', 'DEGRADED', 'UNHEALTHY', 'UNKNOWN']).optional(),
  last_sync: z.string().datetime().nullable().optional(),
});

export const googleWorkspaceIntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  client_id: z.string(),
  domain: z.string(),
  admin_email: z.string(),
  scopes: z.array(z.string()),
  calendar_sync: z.boolean(),
  drive_sync: z.boolean(),
  classroom_sync: z.boolean(),
});

export const googleWorkspaceIntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  client_id: z.string().optional(),
  domain: z.string().optional(),
  admin_email: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  calendar_sync: z.boolean().optional(),
  drive_sync: z.boolean().optional(),
  classroom_sync: z.boolean().optional(),
});

export const microsoft365IntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  tenant_id: z.string(),
  client_id: z.string(),
  permissions: z.array(z.string()),
  teams_sync: z.boolean(),
  onedrive_sync: z.boolean(),
  outlook_sync: z.boolean(),
});

export const microsoft365IntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  tenant_id: z.string().optional(),
  client_id: z.string().optional(),
  permissions: z.array(z.string()).optional(),
  teams_sync: z.boolean().optional(),
  onedrive_sync: z.boolean().optional(),
  outlook_sync: z.boolean().optional(),
});

export const googleClassroomIntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  course_sync: z.boolean(),
  assignment_sync: z.boolean(),
  roster_sync: z.boolean(),
  grade_sync: z.boolean(),
});

export const googleClassroomIntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  course_sync: z.boolean().optional(),
  assignment_sync: z.boolean().optional(),
  roster_sync: z.boolean().optional(),
  grade_sync: z.boolean().optional(),
});

export const microsoftTeamsIntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  team_id: z.string().uuid().nullable(),
  channel_sync: z.boolean(),
  meeting_sync: z.boolean(),
  chat_sync: z.boolean(),
});

export const microsoftTeamsIntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  team_id: z.string().uuid().nullable().optional(),
  channel_sync: z.boolean().optional(),
  meeting_sync: z.boolean().optional(),
  chat_sync: z.boolean().optional(),
});

export const videoConferenceIntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  provider: z.string(),
  auto_record: z.boolean(),
  transcript_enabled: z.boolean(),
  attendance_tracking: z.boolean(),
});

export const videoConferenceIntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  auto_record: z.boolean().optional(),
  transcript_enabled: z.boolean().optional(),
  attendance_tracking: z.boolean().optional(),
});

export const messagingIntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  provider: z.string(),
  channels: z.array(z.string()),
  notification_forwarding: z.boolean(),
});

export const messagingIntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  channels: z.array(z.string()).optional(),
  notification_forwarding: z.boolean().optional(),
});

export const lmsIntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  lms_type: z.string(),
  course_sync: z.boolean(),
  grade_sync: z.boolean(),
  roster_sync: z.boolean(),
  content_sync: z.boolean(),
});

export const lmsIntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  lms_type: z.string().optional(),
  course_sync: z.boolean().optional(),
  grade_sync: z.boolean().optional(),
  roster_sync: z.boolean().optional(),
  content_sync: z.boolean().optional(),
});

export const paymentIntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  provider: z.string(),
  currency: z.string(),
  auto_collect: z.boolean(),
  receipt_generation: z.boolean(),
  webhook_url: z.string(),
});

export const paymentIntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  currency: z.string().optional(),
  auto_collect: z.boolean().optional(),
  receipt_generation: z.boolean().optional(),
  webhook_url: z.string().optional(),
});

export const mobileMoneyIntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  provider: z.string(),
  merchant_id: z.string(),
  callback_url: z.string(),
});

export const mobileMoneyIntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  merchant_id: z.string().optional(),
  callback_url: z.string().optional(),
});

export const cloudIntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  provider: z.string(),
  storage_sync: z.boolean(),
  compute_enabled: z.boolean(),
  regions: z.array(z.string()),
});

export const cloudIntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  storage_sync: z.boolean().optional(),
  compute_enabled: z.boolean().optional(),
  regions: z.array(z.string()).optional(),
});

export const crmIntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  provider: z.string(),
  contact_sync: z.boolean(),
  pipeline_sync: z.boolean(),
  email_tracking: z.boolean(),
});

export const crmIntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  contact_sync: z.boolean().optional(),
  pipeline_sync: z.boolean().optional(),
  email_tracking: z.boolean().optional(),
});

export const aiServiceIntegrationCreateSchema = z.object({
  connector_id: z.string().uuid(),
  provider: z.string(),
  model: z.string(),
  api_version: z.string(),
  rate_limit: z.number(),
  features: z.array(z.string()),
});

export const aiServiceIntegrationUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  model: z.string().optional(),
  api_version: z.string().optional(),
  rate_limit: z.number().optional(),
  features: z.array(z.string()).optional(),
});

export const integrationSyncLogCreateSchema = z.object({
  connector_id: z.string().uuid(),
  sync_type: z.string(),
  direction: z.enum(['PUSH', 'PULL', 'BIDIRECTIONAL']),
  records_processed: z.number(),
  records_succeeded: z.number(),
  records_failed: z.number(),
  duration_ms: z.number(),
  status: z.string(),
  error_message: z.string().nullable(),
  started_at: z.string().datetime(),
  completed_at: z.string().datetime(),
});

export const integrationSyncLogUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  sync_type: z.string().optional(),
  direction: z.enum(['PUSH', 'PULL', 'BIDIRECTIONAL']).optional(),
  records_processed: z.number().optional(),
  records_succeeded: z.number().optional(),
  records_failed: z.number().optional(),
  duration_ms: z.number().optional(),
  status: z.string().optional(),
  error_message: z.string().nullable().optional(),
  started_at: z.string().datetime().optional(),
  completed_at: z.string().datetime().optional(),
});

export const integrationWebhookCreateSchema = z.object({
  connector_id: z.string().uuid(),
  event_type: z.string(),
  payload: z.record(z.unknown()),
  response_status: z.number(),
  response_body: z.string(),
  received_at: z.string().datetime(),
});

export const integrationWebhookUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  event_type: z.string().optional(),
  payload: z.record(z.unknown()).optional(),
  response_status: z.number().optional(),
  response_body: z.string().optional(),
  received_at: z.string().datetime().optional(),
});

export const integrationAnalyticsCreateSchema = z.object({
  school_id: schoolId,
  connector_id: z.string().uuid(),
  period: z.string(),
  api_calls: z.number(),
  sync_count: z.number(),
  error_count: z.number(),
  avg_response_ms: z.number(),
  uptime_percentage: z.number(),
  generated_at: z.string().datetime(),
});

export const integrationAnalyticsUpdateSchema = z.object({
  school_id: schoolId.optional(),
  connector_id: z.string().uuid().optional(),
  period: z.string().optional(),
  api_calls: z.number().optional(),
  sync_count: z.number().optional(),
  error_count: z.number().optional(),
  avg_response_ms: z.number().optional(),
  uptime_percentage: z.number().optional(),
  generated_at: z.string().datetime().optional(),
});

export const integrationMappingCreateSchema = z.object({
  connector_id: z.string().uuid(),
  source_field: z.string(),
  target_field: z.string(),
  transform: z.string().nullable(),
  required: z.boolean(),
});

export const integrationMappingUpdateSchema = z.object({
  connector_id: z.string().uuid().optional(),
  source_field: z.string().optional(),
  target_field: z.string().optional(),
  transform: z.string().nullable().optional(),
  required: z.boolean().optional(),
});

// ── Module 10 - AI Orchestrator ────────

export const agentRegistryCreateSchema = z.object({
  school_id: schoolId,
  agent_type: z.enum(['TUTOR', 'ASSESSOR', 'GRADER', 'ANALYZER', 'RECOMMENDER', 'MONITOR', 'ORCHESTRATOR', 'SPECIALIST']),
  name: z.string(),
  description: z.string(),
  model: z.string(),
  status: z.enum(['IDLE', 'BUSY', 'ERROR', 'OFFLINE', 'MAINTENANCE', 'INITIALIZING']),
  capabilities: z.array(z.string()),
  config: z.record(z.unknown()),
  registered_at: z.string().datetime(),
  last_active: z.string().datetime().nullable(),
});

export const agentRegistryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  agent_type: z.enum(['TUTOR', 'ASSESSOR', 'GRADER', 'ANALYZER', 'RECOMMENDER', 'MONITOR', 'ORCHESTRATOR', 'SPECIALIST']).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  model: z.string().optional(),
  status: z.enum(['IDLE', 'BUSY', 'ERROR', 'OFFLINE', 'MAINTENANCE', 'INITIALIZING']).optional(),
  capabilities: z.array(z.string()).optional(),
  config: z.record(z.unknown()).optional(),
  registered_at: z.string().datetime().optional(),
  last_active: z.string().datetime().nullable().optional(),
});

export const multiAgentSystemCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  agents: z.array(z.string()),
  orchestration_strategy: z.enum(['REACTIVE', 'PROACTIVE', 'ADAPTIVE', 'HYBRID', 'GOAL_ORIENTED']),
  active_tasks: z.number(),
  completed_tasks: z.number(),
});

export const multiAgentSystemUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  agents: z.array(z.string()).optional(),
  orchestration_strategy: z.enum(['REACTIVE', 'PROACTIVE', 'ADAPTIVE', 'HYBRID', 'GOAL_ORIENTED']).optional(),
  active_tasks: z.number().optional(),
  completed_tasks: z.number().optional(),
});

export const planningGoalCreateSchema = z.object({
  description: z.string(),
  priority: z.number(),
  deadline: z.string().datetime().nullable(),
  status: z.string(),
});

export const planningGoalUpdateSchema = z.object({
  description: z.string().optional(),
  priority: z.number().optional(),
  deadline: z.string().datetime().nullable().optional(),
  status: z.string().optional(),
});

export const planningConstraintCreateSchema = z.object({
  type: z.string(),
  description: z.string(),
  value: z.unknown(),
});

export const planningConstraintUpdateSchema = z.object({
  type: z.string().optional(),
  description: z.string().optional(),
  value: z.unknown().optional(),
});

export const planningEngineCreateSchema = z.object({
  school_id: schoolId,
  strategy: z.enum(['REACTIVE', 'PROACTIVE', 'ADAPTIVE', 'HYBRID', 'GOAL_ORIENTED']),
  goals: z.array(planningGoalCreateSchema),
  constraints: z.array(planningConstraintCreateSchema),
  active_plans: z.number(),
});

export const planningEngineUpdateSchema = z.object({
  school_id: schoolId.optional(),
  strategy: z.enum(['REACTIVE', 'PROACTIVE', 'ADAPTIVE', 'HYBRID', 'GOAL_ORIENTED']).optional(),
  goals: z.array(planningGoalCreateSchema).optional(),
  constraints: z.array(planningConstraintCreateSchema).optional(),
  active_plans: z.number().optional(),
});

export const reasoningRuleCreateSchema = z.object({
  condition: z.string(),
  action: z.string(),
  confidence: z.number(),
});

export const reasoningRuleUpdateSchema = z.object({
  condition: z.string().optional(),
  action: z.string().optional(),
  confidence: z.number().optional(),
});

export const reasoningEngineCreateSchema = z.object({
  school_id: schoolId,
  reasoning_type: z.enum(['DEDUCTIVE', 'INDUCTIVE', 'ABDUCTIVE', 'ANALOGICAL', 'CASE_BASED', 'FUZZY']),
  rules: z.array(reasoningRuleCreateSchema),
  knowledge_base_id: z.string().uuid().nullable(),
});

export const reasoningEngineUpdateSchema = z.object({
  school_id: schoolId.optional(),
  reasoning_type: z.enum(['DEDUCTIVE', 'INDUCTIVE', 'ABDUCTIVE', 'ANALOGICAL', 'CASE_BASED', 'FUZZY']).optional(),
  rules: z.array(reasoningRuleCreateSchema).optional(),
  knowledge_base_id: z.string().uuid().nullable().optional(),
});

export const contextEngineCreateSchema = z.object({
  school_id: schoolId,
  context_types: z.array(z.enum(['SESSION', 'USER', 'TASK', 'DOMAIN', 'TEMPORAL', 'SOCIAL', 'ENVIRONMENTAL'])),
  context_window: z.number(),
  refresh_interval_seconds: z.number(),
});

export const contextEngineUpdateSchema = z.object({
  school_id: schoolId.optional(),
  context_types: z.array(z.enum(['SESSION', 'USER', 'TASK', 'DOMAIN', 'TEMPORAL', 'SOCIAL', 'ENVIRONMENTAL'])).optional(),
  context_window: z.number().optional(),
  refresh_interval_seconds: z.number().optional(),
});

export const memoryEngineCreateSchema = z.object({
  school_id: schoolId,
  memory_types: z.array(z.enum(['SHORT_TERM', 'LONG_TERM', 'EPISODIC', 'SEMANTIC', 'PROCEDURAL'])),
  storage_capacity_mb: z.number(),
  retention_days: z.number(),
  compression_enabled: z.boolean(),
});

export const memoryEngineUpdateSchema = z.object({
  school_id: schoolId.optional(),
  memory_types: z.array(z.enum(['SHORT_TERM', 'LONG_TERM', 'EPISODIC', 'SEMANTIC', 'PROCEDURAL'])).optional(),
  storage_capacity_mb: z.number().optional(),
  retention_days: z.number().optional(),
  compression_enabled: z.boolean().optional(),
});

export const knowledgeGraphNodeCreateSchema = z.object({
  school_id: schoolId,
  label: z.string(),
  node_type: z.string(),
  properties: z.record(z.unknown()),
});

export const knowledgeGraphNodeUpdateSchema = z.object({
  school_id: schoolId.optional(),
  label: z.string().optional(),
  node_type: z.string().optional(),
  properties: z.record(z.unknown()).optional(),
});

export const knowledgeGraphEdgeCreateSchema = z.object({
  source_id: z.string().uuid(),
  target_id: z.string().uuid(),
  relation: z.enum(['IS_A', 'PART_OF', 'CAUSES', 'ENABLES', 'CONTRADICTS', 'SIMILAR', 'PRECEDES', 'FOLLOWS']),
  weight: z.number(),
  properties: z.record(z.unknown()),
});

export const knowledgeGraphEdgeUpdateSchema = z.object({
  source_id: z.string().uuid().optional(),
  target_id: z.string().uuid().optional(),
  relation: z.enum(['IS_A', 'PART_OF', 'CAUSES', 'ENABLES', 'CONTRADICTS', 'SIMILAR', 'PRECEDES', 'FOLLOWS']).optional(),
  weight: z.number().optional(),
  properties: z.record(z.unknown()).optional(),
});

export const toolRegistryEntryCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  tool_type: z.enum(['API', 'FUNCTION', 'DATABASE', 'FILE', 'WEBHOOK', 'SCRIPT', 'MODEL', 'SEARCH']),
  endpoint: z.string().nullable(),
  config: z.record(z.unknown()),
  permissions: z.array(z.string()),
  status: z.string(),
});

export const toolRegistryEntryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  tool_type: z.enum(['API', 'FUNCTION', 'DATABASE', 'FILE', 'WEBHOOK', 'SCRIPT', 'MODEL', 'SEARCH']).optional(),
  endpoint: z.string().nullable().optional(),
  config: z.record(z.unknown()).optional(),
  permissions: z.array(z.string()).optional(),
  status: z.string().optional(),
});

export const taskDelegationCreateSchema = z.object({
  school_id: schoolId,
  task_type: z.string(),
  agent_id: z.string().uuid(),
  priority: z.number(),
  payload: z.record(z.unknown()),
  status: z.enum(['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'RETRYING']),
  assigned_at: z.string().datetime(),
  started_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
  result: z.record(z.unknown()).nullable(),
  error: z.string().nullable(),
});

export const taskDelegationUpdateSchema = z.object({
  school_id: schoolId.optional(),
  task_type: z.string().optional(),
  agent_id: z.string().uuid().optional(),
  priority: z.number().optional(),
  payload: z.record(z.unknown()).optional(),
  status: z.enum(['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'RETRYING']).optional(),
  assigned_at: z.string().datetime().optional(),
  started_at: z.string().datetime().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
  result: z.record(z.unknown()).nullable().optional(),
  error: z.string().nullable().optional(),
});

export const ragOrchestratorCreateSchema = z.object({
  school_id: schoolId,
  strategy: z.enum(['VECTOR', 'HYBRID', 'SEMANTIC', 'KEYWORD', 'GRAPH']),
  embedding_model: z.string(),
  vector_store: z.string(),
  chunk_size: z.number(),
  chunk_overlap: z.number(),
  top_k: z.number(),
});

export const ragOrchestratorUpdateSchema = z.object({
  school_id: schoolId.optional(),
  strategy: z.enum(['VECTOR', 'HYBRID', 'SEMANTIC', 'KEYWORD', 'GRAPH']).optional(),
  embedding_model: z.string().optional(),
  vector_store: z.string().optional(),
  chunk_size: z.number().optional(),
  chunk_overlap: z.number().optional(),
  top_k: z.number().optional(),
});

export const decisionEngineCreateSchema = z.object({
  school_id: schoolId,
  decision_type: z.enum(['CLASSIFICATION', 'REGRESSION', 'RECOMMENDATION', 'PREDICTION', 'OPTIMIZATION', 'ANOMALY']),
  model: z.string(),
  features: z.array(z.string()),
  threshold: z.number(),
});

export const decisionEngineUpdateSchema = z.object({
  school_id: schoolId.optional(),
  decision_type: z.enum(['CLASSIFICATION', 'REGRESSION', 'RECOMMENDATION', 'PREDICTION', 'OPTIMIZATION', 'ANOMALY']).optional(),
  model: z.string().optional(),
  features: z.array(z.string()).optional(),
  threshold: z.number().optional(),
});

export const aiMonitoringCreateSchema = z.object({
  school_id: schoolId,
  agent_id: z.string().uuid(),
  status: z.enum(['HEALTHY', 'WARNING', 'CRITICAL', 'UNKNOWN']),
  request_count: z.number(),
  avg_latency_ms: z.number(),
  error_rate: z.number(),
  token_usage: z.number(),
  cost_usd: z.number(),
  period: z.string(),
  generated_at: z.string().datetime(),
});

export const aiMonitoringUpdateSchema = z.object({
  school_id: schoolId.optional(),
  agent_id: z.string().uuid().optional(),
  status: z.enum(['HEALTHY', 'WARNING', 'CRITICAL', 'UNKNOWN']).optional(),
  request_count: z.number().optional(),
  avg_latency_ms: z.number().optional(),
  error_rate: z.number().optional(),
  token_usage: z.number().optional(),
  cost_usd: z.number().optional(),
  period: z.string().optional(),
  generated_at: z.string().datetime().optional(),
});

export const aiModelRegistryCreateSchema = z.object({
  school_id: schoolId,
  model_type: z.enum(['LLM', 'CLASSIFIER', 'EMBEDDING', 'RERANKER', 'TRANSLATOR', 'SPEECH', 'VISION']),
  name: z.string(),
  version: z.string(),
  provider: z.string(),
  endpoint: z.string(),
  max_tokens: z.number(),
  cost_per_token: z.number(),
  status: z.string(),
});

export const aiModelRegistryUpdateSchema = z.object({
  school_id: schoolId.optional(),
  model_type: z.enum(['LLM', 'CLASSIFIER', 'EMBEDDING', 'RERANKER', 'TRANSLATOR', 'SPEECH', 'VISION']).optional(),
  name: z.string().optional(),
  version: z.string().optional(),
  provider: z.string().optional(),
  endpoint: z.string().optional(),
  max_tokens: z.number().optional(),
  cost_per_token: z.number().optional(),
  status: z.string().optional(),
});

export const agentMessageCreateSchema = z.object({
  role: z.enum(['user', 'agent', 'system']),
  content: z.string(),
  tool_calls: z.array(z.object({
    tool_name: z.string(),
    arguments: z.record(z.unknown()),
    result: z.record(z.unknown()),
    duration_ms: z.number(),
  })).nullable(),
  timestamp: z.string().datetime(),
});

export const agentMessageUpdateSchema = z.object({
  role: z.enum(['user', 'agent', 'system']).optional(),
  content: z.string().optional(),
  tool_calls: z.array(z.object({
    tool_name: z.string(),
    arguments: z.record(z.unknown()),
    result: z.record(z.unknown()),
    duration_ms: z.number(),
  })).nullable().optional(),
  timestamp: z.string().datetime().optional(),
});

export const agentConversationCreateSchema = z.object({
  agent_id: z.string().uuid(),
  user_id: z.string().uuid(),
  messages: z.array(agentMessageCreateSchema),
  started_at: z.string().datetime(),
  last_message_at: z.string().datetime(),
  satisfaction_rating: z.number().nullable(),
});

export const agentConversationUpdateSchema = z.object({
  agent_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  messages: z.array(agentMessageCreateSchema).optional(),
  started_at: z.string().datetime().optional(),
  last_message_at: z.string().datetime().optional(),
  satisfaction_rating: z.number().nullable().optional(),
});

export const toolCallCreateSchema = z.object({
  tool_name: z.string(),
  arguments: z.record(z.unknown()),
  result: z.record(z.unknown()),
  duration_ms: z.number(),
});

export const toolCallUpdateSchema = z.object({
  tool_name: z.string().optional(),
  arguments: z.record(z.unknown()).optional(),
  result: z.record(z.unknown()).optional(),
  duration_ms: z.number().optional(),
});

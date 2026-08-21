// Phase 3.4 - Modules 9-10: Ecosystem Integration Hub & AI Orchestrator

// ============================================================================
// MODULE 9 - ECOSYSTEM INTEGRATION HUB ENUMS
// ============================================================================

export const IntegrationCategory = {
  PRODUCTIVITY: 'PRODUCTIVITY',
  COMMUNICATION: 'COMMUNICATION',
  LMS: 'LMS',
  PAYMENT: 'PAYMENT',
  CLOUD: 'CLOUD',
  CRM: 'CRM',
  MARKETING: 'MARKETING',
  AI_SERVICE: 'AI_SERVICE',
  SOCIAL: 'SOCIAL',
  ANALYTICS: 'ANALYTICS',
} as const;
export type IntegrationCategory = (typeof IntegrationCategory)[keyof typeof IntegrationCategory];

export const IntegrationStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ERROR: 'ERROR',
  CONFIGURING: 'CONFIGURING',
  UPDATING: 'UPDATING',
  DEPRECATED: 'DEPRECATED',
} as const;
export type IntegrationStatus = (typeof IntegrationStatus)[keyof typeof IntegrationStatus];

export const SyncDirection = {
  PUSH: 'PUSH',
  PULL: 'PULL',
  BIDIRECTIONAL: 'BIDIRECTIONAL',
} as const;
export type SyncDirection = (typeof SyncDirection)[keyof typeof SyncDirection];

export const AuthType = {
  API_KEY: 'API_KEY',
  OAUTH2: 'OAUTH2',
  BASIC: 'BASIC',
  BEARER: 'BEARER',
  WEBHOOK: 'WEBHOOK',
  HMAC: 'HMAC',
} as const;
export type AuthType = (typeof AuthType)[keyof typeof AuthType];

export const ConnectorHealth = {
  HEALTHY: 'HEALTHY',
  DEGRADED: 'DEGRADED',
  UNHEALTHY: 'UNHEALTHY',
  UNKNOWN: 'UNKNOWN',
} as const;
export type ConnectorHealth = (typeof ConnectorHealth)[keyof typeof ConnectorHealth];

export const DataFormat = {
  JSON: 'JSON',
  XML: 'XML',
  CSV: 'CSV',
  FORM_DATA: 'FORM_DATA',
  BINARY: 'BINARY',
  TEXT: 'TEXT',
} as const;
export type DataFormat = (typeof DataFormat)[keyof typeof DataFormat];

export const IntegrationTier = {
  FREE: 'FREE',
  STARTER: 'STARTER',
  PROFESSIONAL: 'PROFESSIONAL',
  ENTERPRISE: 'ENTERPRISE',
} as const;
export type IntegrationTier = (typeof IntegrationTier)[keyof typeof IntegrationTier];

// ============================================================================
// MODULE 10 - AI ORCHESTRATOR ENUMS
// ============================================================================

export const AgentType = {
  TUTOR: 'TUTOR',
  ASSESSOR: 'ASSESSOR',
  GRADER: 'GRADER',
  ANALYZER: 'ANALYZER',
  RECOMMENDER: 'RECOMMENDER',
  MONITOR: 'MONITOR',
  ORCHESTRATOR: 'ORCHESTRATOR',
  SPECIALIST: 'SPECIALIST',
} as const;
export type AgentType = (typeof AgentType)[keyof typeof AgentType];

export const AgentStatus = {
  IDLE: 'IDLE',
  BUSY: 'BUSY',
  ERROR: 'ERROR',
  OFFLINE: 'OFFLINE',
  MAINTENANCE: 'MAINTENANCE',
  INITIALIZING: 'INITIALIZING',
} as const;
export type AgentStatus = (typeof AgentStatus)[keyof typeof AgentStatus];

export const PlanningStrategy = {
  REACTIVE: 'REACTIVE',
  PROACTIVE: 'PROACTIVE',
  ADAPTIVE: 'ADAPTIVE',
  HYBRID: 'HYBRID',
  GOAL_ORIENTED: 'GOAL_ORIENTED',
} as const;
export type PlanningStrategy = (typeof PlanningStrategy)[keyof typeof PlanningStrategy];

export const ReasoningType = {
  DEDUCTIVE: 'DEDUCTIVE',
  INDUCTIVE: 'INDUCTIVE',
  ABDUCTIVE: 'ABDUCTIVE',
  ANALOGICAL: 'ANALOGICAL',
  CASE_BASED: 'CASE_BASED',
  FUZZY: 'FUZZY',
} as const;
export type ReasoningType = (typeof ReasoningType)[keyof typeof ReasoningType];

export const ContextType = {
  SESSION: 'SESSION',
  USER: 'USER',
  TASK: 'TASK',
  DOMAIN: 'DOMAIN',
  TEMPORAL: 'TEMPORAL',
  SOCIAL: 'SOCIAL',
  ENVIRONMENTAL: 'ENVIRONMENTAL',
} as const;
export type ContextType = (typeof ContextType)[keyof typeof ContextType];

export const MemoryType = {
  SHORT_TERM: 'SHORT_TERM',
  LONG_TERM: 'LONG_TERM',
  EPISODIC: 'EPISODIC',
  SEMANTIC: 'SEMANTIC',
  PROCEDURAL: 'PROCEDURAL',
} as const;
export type MemoryType = (typeof MemoryType)[keyof typeof MemoryType];

export const KnowledgeGraphRelationType = {
  IS_A: 'IS_A',
  PART_OF: 'PART_OF',
  CAUSES: 'CAUSES',
  ENABLES: 'ENABLES',
  CONTRADICTS: 'CONTRADICTS',
  SIMILAR: 'SIMILAR',
  PRECEDES: 'PRECEDES',
  FOLLOWS: 'FOLLOWS',
} as const;
export type KnowledgeGraphRelationType = (typeof KnowledgeGraphRelationType)[keyof typeof KnowledgeGraphRelationType];

export const ToolType = {
  API: 'API',
  FUNCTION: 'FUNCTION',
  DATABASE: 'DATABASE',
  FILE: 'FILE',
  WEBHOOK: 'WEBHOOK',
  SCRIPT: 'SCRIPT',
  MODEL: 'MODEL',
  SEARCH: 'SEARCH',
} as const;
export type ToolType = (typeof ToolType)[keyof typeof ToolType];

export const TaskDelegationStatus = {
  PENDING: 'PENDING',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  RETRYING: 'RETRYING',
} as const;
export type TaskDelegationStatus = (typeof TaskDelegationStatus)[keyof typeof TaskDelegationStatus];

export const RAGStrategy = {
  VECTOR: 'VECTOR',
  HYBRID: 'HYBRID',
  SEMANTIC: 'SEMANTIC',
  KEYWORD: 'KEYWORD',
  GRAPH: 'GRAPH',
} as const;
export type RAGStrategy = (typeof RAGStrategy)[keyof typeof RAGStrategy];

export const DecisionType = {
  CLASSIFICATION: 'CLASSIFICATION',
  REGRESSION: 'REGRESSION',
  RECOMMENDATION: 'RECOMMENDATION',
  PREDICTION: 'PREDICTION',
  OPTIMIZATION: 'OPTIMIZATION',
  ANOMALY: 'ANOMALY',
} as const;
export type DecisionType = (typeof DecisionType)[keyof typeof DecisionType];

export const AIMonitoringStatus = {
  HEALTHY: 'HEALTHY',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL',
  UNKNOWN: 'UNKNOWN',
} as const;
export type AIMonitoringStatus = (typeof AIMonitoringStatus)[keyof typeof AIMonitoringStatus];

export const ModelType = {
  LLM: 'LLM',
  CLASSIFIER: 'CLASSIFIER',
  EMBEDDING: 'EMBEDDING',
  RERANKER: 'RERANKER',
  TRANSLATOR: 'TRANSLATOR',
  SPEECH: 'SPEECH',
  VISION: 'VISION',
} as const;
export type ModelType = (typeof ModelType)[keyof typeof ModelType];

// ============================================================================
// MODULE 9 - ECOSYSTEM INTEGRATION HUB INTERFACES
// ============================================================================

export interface IntegrationConnector {
  id: string;
  school_id: string;
  name: string;
  provider: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  auth_type: AuthType;
  api_endpoint: string;
  config: Record<string, unknown>;
  sync_direction: SyncDirection;
  data_format: DataFormat;
  tier: IntegrationTier;
  health: ConnectorHealth;
  last_sync: string | null;
  created_at: string;
  updated_at: string;
}

export interface GoogleWorkspaceIntegration {
  id: string;
  connector_id: string;
  client_id: string;
  domain: string;
  admin_email: string;
  scopes: string[];
  calendar_sync: boolean;
  drive_sync: boolean;
  classroom_sync: boolean;
  created_at: string;
}

export interface Microsoft365Integration {
  id: string;
  connector_id: string;
  tenant_id: string;
  client_id: string;
  permissions: string[];
  teams_sync: boolean;
  onedrive_sync: boolean;
  outlook_sync: boolean;
  created_at: string;
}

export interface GoogleClassroomIntegration {
  id: string;
  connector_id: string;
  course_sync: boolean;
  assignment_sync: boolean;
  roster_sync: boolean;
  grade_sync: boolean;
  created_at: string;
}

export interface MicrosoftTeamsIntegration {
  id: string;
  connector_id: string;
  team_id: string | null;
  channel_sync: boolean;
  meeting_sync: boolean;
  chat_sync: boolean;
  created_at: string;
}

export interface VideoConferenceIntegration {
  id: string;
  connector_id: string;
  provider: string;
  auto_record: boolean;
  transcript_enabled: boolean;
  attendance_tracking: boolean;
  created_at: string;
}

export interface MessagingIntegration {
  id: string;
  connector_id: string;
  provider: string;
  channels: string[];
  notification_forwarding: boolean;
  created_at: string;
}

export interface LMSIntegration {
  id: string;
  connector_id: string;
  lms_type: string;
  course_sync: boolean;
  grade_sync: boolean;
  roster_sync: boolean;
  content_sync: boolean;
  created_at: string;
}

export interface PaymentIntegration {
  id: string;
  connector_id: string;
  provider: string;
  currency: string;
  auto_collect: boolean;
  receipt_generation: boolean;
  webhook_url: string;
  created_at: string;
}

export interface MobileMoneyIntegration {
  id: string;
  connector_id: string;
  provider: string;
  merchant_id: string;
  callback_url: string;
  created_at: string;
}

export interface CloudIntegration {
  id: string;
  connector_id: string;
  provider: string;
  storage_sync: boolean;
  compute_enabled: boolean;
  regions: string[];
  created_at: string;
}

export interface CRMIntegration {
  id: string;
  connector_id: string;
  provider: string;
  contact_sync: boolean;
  pipeline_sync: boolean;
  email_tracking: boolean;
  created_at: string;
}

export interface AIServiceIntegration {
  id: string;
  connector_id: string;
  provider: string;
  model: string;
  api_version: string;
  rate_limit: number;
  features: string[];
  created_at: string;
}

export interface IntegrationSyncLog {
  id: string;
  connector_id: string;
  sync_type: string;
  direction: SyncDirection;
  records_processed: number;
  records_succeeded: number;
  records_failed: number;
  duration_ms: number;
  status: string;
  error_message: string | null;
  started_at: string;
  completed_at: string;
}

export interface IntegrationWebhook {
  id: string;
  connector_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  response_status: number;
  response_body: string;
  received_at: string;
}

export interface IntegrationAnalytics {
  id: string;
  school_id: string;
  connector_id: string;
  period: string;
  api_calls: number;
  sync_count: number;
  error_count: number;
  avg_response_ms: number;
  uptime_percentage: number;
  generated_at: string;
}

export interface IntegrationMapping {
  id: string;
  connector_id: string;
  source_field: string;
  target_field: string;
  transform: string | null;
  required: boolean;
  created_at: string;
}

// ============================================================================
// MODULE 10 - AI ORCHESTRATOR INTERFACES
// ============================================================================

export interface AgentRegistry {
  id: string;
  school_id: string;
  agent_type: AgentType;
  name: string;
  description: string;
  model: string;
  status: AgentStatus;
  capabilities: string[];
  config: Record<string, unknown>;
  registered_at: string;
  last_active: string | null;
}

export interface MultiAgentSystem {
  id: string;
  school_id: string;
  name: string;
  agents: string[];
  orchestration_strategy: PlanningStrategy;
  active_tasks: number;
  completed_tasks: number;
  created_at: string;
  updated_at: string;
}

export interface PlanningEngine {
  id: string;
  school_id: string;
  strategy: PlanningStrategy;
  goals: PlanningGoal[];
  constraints: PlanningConstraint[];
  active_plans: number;
  created_at: string;
}

export interface PlanningGoal {
  id: string;
  description: string;
  priority: number;
  deadline: string | null;
  status: string;
}

export interface PlanningConstraint {
  id: string;
  type: string;
  description: string;
  value: unknown;
}

export interface ReasoningEngine {
  id: string;
  school_id: string;
  reasoning_type: ReasoningType;
  rules: ReasoningRule[];
  knowledge_base_id: string | null;
  created_at: string;
}

export interface ReasoningRule {
  id: string;
  condition: string;
  action: string;
  confidence: number;
}

export interface ContextEngine {
  id: string;
  school_id: string;
  context_types: ContextType[];
  context_window: number;
  refresh_interval_seconds: number;
  created_at: string;
}

export interface MemoryEngine {
  id: string;
  school_id: string;
  memory_types: MemoryType[];
  storage_capacity_mb: number;
  retention_days: number;
  compression_enabled: boolean;
  created_at: string;
}

export interface KnowledgeGraphNode {
  id: string;
  school_id: string;
  label: string;
  node_type: string;
  properties: Record<string, unknown>;
  created_at: string;
}

export interface KnowledgeGraphEdge {
  id: string;
  source_id: string;
  target_id: string;
  relation: KnowledgeGraphRelationType;
  weight: number;
  properties: Record<string, unknown>;
  created_at: string;
}

export interface ToolRegistryEntry {
  id: string;
  school_id: string;
  name: string;
  tool_type: ToolType;
  endpoint: string | null;
  config: Record<string, unknown>;
  permissions: string[];
  status: string;
  created_at: string;
}

export interface TaskDelegation {
  id: string;
  school_id: string;
  task_type: string;
  agent_id: string;
  priority: number;
  payload: Record<string, unknown>;
  status: TaskDelegationStatus;
  assigned_at: string;
  started_at: string | null;
  completed_at: string | null;
  result: Record<string, unknown> | null;
  error: string | null;
  created_at: string;
}

export interface RAGOrchestrator {
  id: string;
  school_id: string;
  strategy: RAGStrategy;
  embedding_model: string;
  vector_store: string;
  chunk_size: number;
  chunk_overlap: number;
  top_k: number;
  created_at: string;
}

export interface DecisionEngine {
  id: string;
  school_id: string;
  decision_type: DecisionType;
  model: string;
  features: string[];
  threshold: number;
  created_at: string;
}

export interface AIMonitoring {
  id: string;
  school_id: string;
  agent_id: string;
  status: AIMonitoringStatus;
  request_count: number;
  avg_latency_ms: number;
  error_rate: number;
  token_usage: number;
  cost_usd: number;
  period: string;
  generated_at: string;
}

export interface AIModelRegistry {
  id: string;
  school_id: string;
  model_type: ModelType;
  name: string;
  version: string;
  provider: string;
  endpoint: string;
  max_tokens: number;
  cost_per_token: number;
  status: string;
  created_at: string;
}

export interface AgentConversation {
  id: string;
  agent_id: string;
  user_id: string;
  messages: AgentMessage[];
  started_at: string;
  last_message_at: string;
  satisfaction_rating: number | null;
}

export interface AgentMessage {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  tool_calls: ToolCall[] | null;
  timestamp: string;
}

export interface ToolCall {
  tool_name: string;
  arguments: Record<string, unknown>;
  result: Record<string, unknown>;
  duration_ms: number;
}

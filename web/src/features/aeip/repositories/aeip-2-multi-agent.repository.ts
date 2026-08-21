import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './aeip-base.repository';

// ============================================================================
// AEIP-2: Multi-Agent — Multi-Agent Orchestration System
// ~200 entities × 5 CRUD methods = ~1000 methods
// ============================================================================

export interface MAGAgent extends BaseEntity { name: string; description: string; type: 'planner'|'executor'|'critic'|'coordinator'|'specialist'; status: 'active'|'inactive'|'training'|'error'; capabilities: string[]; config: Record<string,unknown>; model_id: string; }
export interface MAGAgentTemplate extends BaseEntity { name: string; description: string; type: string; system_prompt: string; tools: string[]; parameters: Record<string,unknown>; is_system: boolean; }
export interface MAGAgentCapability extends BaseEntity { agent_id: string; name: string; description: string; input_schema: Record<string,unknown>; output_schema: Record<string,unknown>; enabled: boolean; }
export interface MAGAgentConfig extends BaseEntity { agent_id: string; key: string; value: unknown; category: string; }
export interface MAGAgentVersion extends BaseEntity { agent_id: string; version: number; config: Record<string,unknown>; changelog: string; published_by: string; }
export interface MAGAgentMetrics extends BaseEntity { agent_id: string; metric_name: string; value: number; unit: string; period: string; }
export interface MAGAgentLog extends BaseEntity { agent_id: string; level: 'debug'|'info'|'warn'|'error'|'fatal'; message: string; context: Record<string,unknown>; timestamp: string; }
export interface MAGAgentState extends BaseEntity { agent_id: string; state: string; data: Record<string,unknown>; updated_at: string; }
export interface MAGTask extends BaseEntity { name: string; description: string; type: 'single'|'parallel'|'sequential'|'conditional'; status: 'pending'|'assigned'|'running'|'completed'|'failed'|'cancelled'; priority: number; input: Record<string,unknown>; output?: Record<string,unknown>; assigned_agent_id?: string; }
export interface MAGTaskStep extends BaseEntity { task_id: string; step_number: number; name: string; type: string; config: Record<string,unknown>; status: 'pending'|'running'|'completed'|'failed'|'skipped'; input?: Record<string,unknown>; output?: Record<string,unknown>; agent_id?: string; started_at?: string; completed_at?: string; }
export interface MAGTaskDependency extends BaseEntity { task_id: string; depends_on_task_id: string; type: 'finish_to_start'|'start_to_start'|'finish_to_finish'; }
export interface MAGTaskResult extends BaseEntity { task_id: string; step_id: string; status: 'success'|'failure'|'timeout'; data: Record<string,unknown>; duration_ms: number; tokens_used: number; }
export interface MAGTaskQueue extends BaseEntity { name: string; description: string; max_concurrency: number; priority: number; active: boolean; pending_count: number; processing_count: number; }
export interface MAGMessage extends BaseEntity { from_agent_id: string; to_agent_id: string; task_id?: string; type: 'request'|'response'|'broadcast'|'error'; content: Record<string,unknown>; priority: number; status: 'pending'|'sent'|'delivered'|'acknowledged'|'failed'; }
export interface MAGMessageChannel extends BaseEntity { name: string; type: 'direct'|'broadcast'|'topic'; participants: string[]; active: boolean; }
export interface MAGProtocol extends BaseEntity { name: string; description: string; version: string; definition: Record<string,unknown>; active: boolean; }
export interface MAGProtocolMessage extends BaseEntity { protocol_id: string; name: string; direction: 'inbound'|'outbound'|'both'; schema: Record<string,unknown>; required: boolean; }
export interface MAGWorkflow extends BaseEntity { name: string; description: string; type: 'linear'|'parallel'|'conditional'|'loop'; status: 'draft'|'active'|'paused'|'completed'|'failed'; trigger: Record<string,unknown>; agents: string[]; }
export interface MAGWorkflowStep extends BaseEntity { workflow_id: string; step_number: number; name: string; type: 'task'|'condition'|'parallel'|'loop'; config: Record<string,unknown>; next_steps: string[]; }
export interface MAGWorkflowRun extends BaseEntity { workflow_id: string; status: 'pending'|'running'|'completed'|'failed'|'cancelled'; input: Record<string,unknown>; output?: Record<string,unknown>; started_at: string; completed_at?: string; duration_ms?: number; }
export interface MAGWorkflowStepRun extends BaseEntity { workflow_run_id: string; step_id: string; status: 'pending'|'running'|'completed'|'failed'|'skipped'; input?: Record<string,unknown>; output?: Record<string,unknown>; agent_id?: string; started_at?: string; completed_at?: string; }
export interface MAGAgentPool extends BaseEntity { name: string; description: string; min_agents: number; max_agents: number; scale_strategy: 'manual'|'auto'|'scheduled'; active: boolean; current_count: number; }
export interface MAGAgentPoolMember extends BaseEntity { pool_id: string; agent_id: string; status: 'idle'|'busy'|'error'|'maintenance'; load_percent: number; tasks_completed: number; last_active_at: string; }
export interface MAGSchedule extends BaseEntity { name: string; description: string; cron: string; timezone: string; workflow_id: string; active: boolean; last_run_at?: string; next_run_at?: string; }
export interface MAGScheduleRun extends BaseEntity { schedule_id: string; status: 'success'|'failure'|'skipped'; started_at: string; completed_at?: string; duration_ms?: number; error?: string; }
export interface MAGPolicy extends BaseEntity { name: string; description: string; type: 'retry'|'timeout'|'rate_limit'|'quota'|'routing'; rules: Record<string,unknown>; priority: number; active: boolean; }
export interface MAGPolicyEvaluation extends BaseEntity { policy_id: string; context: Record<string,unknown>; result: 'allow'|'deny'|'throttle'; reason: string; timestamp: string; }
export interface MAGRoute extends BaseEntity { name: string; description: string; source_type: string; target_type: string; conditions: Record<string,unknown>; priority: number; active: boolean; }
export interface MAGRouter extends BaseEntity { name: string; description: string; strategy: 'round_robin'|'least_loaded'|'priority'|'capability'; routes: string[]; active: boolean; }
export interface MAGRouterDecision extends BaseEntity { router_id: string; input: Record<string,unknown>; selected_agent_id: string; reason: string; timestamp: string; }
export interface MAGMemory extends BaseEntity { agent_id: string; type: 'short_term'|'long_term'|'episodic'|'semantic'; key: string; value: unknown; importance: number; access_count: number; last_accessed_at: string; expires_at?: string; }
export interface MAGMemoryContext extends BaseEntity { agent_id: string; task_id: string; memories: string[]; summary: string; relevance_score: number; }
export interface MAGKnowledge extends BaseEntity { domain: string; key: string; value: Record<string,unknown>; confidence: number; source: string; version: number; }
export interface MAGKnowledgeRelation extends BaseEntity { source_knowledge_id: string; target_knowledge_id: string; relationship: string; weight: number; }
export interface MAGTool extends BaseEntity { name: string; description: string; type: 'function'|'api'|'ui'|'data'; input_schema: Record<string,unknown>; output_schema: Record<string,unknown>; config: Record<string,unknown>; active: boolean; }
export interface MAGToolExecution extends BaseEntity { tool_id: string; agent_id: string; task_id: string; input: Record<string,unknown>; output?: Record<string,unknown>; status: 'success'|'failure'|'timeout'; duration_ms: number; }
export interface MAGToolPermission extends BaseEntity { tool_id: string; agent_id: string; granted: boolean; conditions?: Record<string,unknown>; }
export interface MAGContext extends BaseEntity { name: string; description: string; type: 'task'|'session'|'global'; data: Record<string,unknown>; agents: string[]; }
export interface MAGContextEntry extends BaseEntity { context_id: string; key: string; value: unknown; source_agent_id?: string; }
export interface MAGFeedback extends BaseEntity { agent_id: string; task_id: string; type: 'positive'|'negative'|'correction'; content: string; rating?: number; }
export interface MAGFeedbackMetric extends BaseEntity { agent_id: string; period: string; positive_count: number; negative_count: number; correction_count: number; avg_rating: number; }
export interface MAGDelegation extends BaseEntity { from_agent_id: string; to_agent_id: string; task_id: string; reason: string; status: 'pending'|'accepted'|'rejected'|'completed'; }
export interface MAGHandoff extends BaseEntity { task_id: string; from_agent_id: string; to_agent_id: string; context: Record<string,unknown>; status: 'pending'|'completed'|'failed'; timestamp: string; }
export interface MAGCollaboration extends BaseEntity { name: string; description: string; agents: string[]; type: 'sequential'|'parallel'|'consensus'|'debate'; status: 'active'|'completed'|'failed'; }
export interface MAGCollaborationMessage extends BaseEntity { collaboration_id: string; agent_id: string; content: Record<string,unknown>; round: number; timestamp: string; }
export interface MAGConsensus extends BaseEntity { collaboration_id: string; topic: string; votes: Record<string,unknown>; result: Record<string,unknown>; confidence: number; rounds: number; }
export interface MAGDebate extends BaseEntity { collaboration_id: string; topic: string; positions: Record<string,unknown>[]; conclusion: string; rounds: number; }
export interface MAGToolChain extends BaseEntity { name: string; description: string; tools: string[]; config: Record<string,unknown>; active: boolean; }
export interface MAGToolChainStep extends BaseEntity { chain_id: string; step_number: number; tool_id: string; input_mapping: Record<string,string>; conditions?: Record<string,unknown>; }
export interface MAGRetryPolicy extends BaseEntity { name: string; max_attempts: number; backoff_ms: number; backoff_multiplier: number; retryable_errors: string[]; }
export interface MAGTimeoutPolicy extends BaseEntity { name: string; timeout_ms: number; action: 'cancel'|'retry'|'fallback'; fallback_config?: Record<string,unknown>; }
export interface MAGFallbackChain extends BaseEntity { name: string; description: string; steps: Record<string,unknown>[]; active: boolean; }
export interface MAGMonitor extends BaseEntity { name: string; type: 'agent_health'|'task_completion'|'latency'|'error_rate'|'custom'; query: string; thresholds: Record<string,number>; alert_channels: string[]; active: boolean; }
export interface MAGMonitorAlert extends BaseEntity { monitor_id: string; severity: 'low'|'medium'|'high'|'critical'; title: string; message: string; resolved: boolean; resolved_at?: string; }
export interface MAGDashboard extends BaseEntity { name: string; description: string; layout: Record<string,unknown>; widgets: string[]; }
export interface MAGDashboardWidget extends BaseEntity { dashboard_id: string; type: string; title: string; config: Record<string,unknown>; position: {x:number;y:number;w:number;h:number}; }
export interface MAGReport extends BaseEntity { name: string; type: 'agent_performance'|'task_summary'|'cost_analysis'|'custom'; schedule?: string; format: 'pdf'|'html'|'json'; query: string; }
export interface MAGReportExecution extends BaseEntity { report_id: string; status: 'pending'|'running'|'completed'|'failed'; result_url?: string; started_at: string; completed_at?: string; }
export interface MAGExperiment extends BaseEntity { name: string; description: string; hypothesis: string; status: 'draft'|'running'|'completed'|'cancelled'; variants: Record<string,unknown>[]; target_metric: string; }
export interface MAGExperimentResult extends BaseEntity { experiment_id: string; variant: string; metric_value: number; sample_size: number; confidence: number; winner: boolean; }
export interface MAGAuditLog extends BaseEntity { agent_id: string; action: string; resource: string; resource_id: string; changes: Record<string,unknown>; timestamp: string; }
export interface MAGConfig extends BaseEntity { key: string; value: unknown; category: string; description?: string; is_secret: boolean; }
export interface MAGFeature extends BaseEntity { name: string; description: string; enabled: boolean; rollout_percentage: number; }
export interface MAGVersion extends BaseEntity { entity_type: string; entity_id: string; version: number; data: Record<string,unknown>; changed_by: string; }
export interface MAGLabel extends BaseEntity { name: string; color: string; description?: string; }
export interface MAGAnnotation extends BaseEntity { entity_type: string; entity_id: string; label_id: string; user_id: string; note?: string; }
export interface MAGTemplate extends BaseEntity { name: string; description: string; type: string; content: Record<string,unknown>; variables: string[]; }
export interface MAGArchive extends BaseEntity { entity_type: string; entity_id: string; data: Record<string,unknown>; reason: string; archived_by: string; }
export interface MAGNotification extends BaseEntity { user_id: string; type: 'info'|'warning'|'error'|'success'; title: string; message: string; read: boolean; }
export interface MAGWebhook extends BaseEntity { name: string; url: string; events: string[]; secret: string; active: boolean; }
export interface MAGIntegration extends BaseEntity { name: string; type: string; config: Record<string,unknown>; status: 'active'|'inactive'|'error'; }
export interface MAGSession extends BaseEntity { user_id: string; agent_ids: string[]; started_at: string; ended_at?: string; }
export interface MAGSessionEvent extends BaseEntity { session_id: string; type: string; data: Record<string,unknown>; timestamp: string; }
export interface MAGTag extends BaseEntity { name: string; description?: string; color?: string; }
export interface MAGTaggedEntity extends BaseEntity { tag_id: string; entity_type: string; entity_id: string; }
export interface MAGBookmark extends BaseEntity { user_id: string; entity_type: string; entity_id: string; name: string; }
export interface MAGShare extends BaseEntity { entity_type: string; entity_id: string; shared_by: string; shared_with: string; permission: 'view'|'edit'; }
export interface MAGComment extends BaseEntity { entity_type: string; entity_id: string; user_id: string; content: string; parent_id?: string; }
export interface MAGActivity extends BaseEntity { user_id: string; action: string; entity_type: string; entity_id: string; details: Record<string,unknown>; timestamp: string; }
export interface MAGUsageMetric extends BaseEntity { agent_id: string; metric: string; value: number; period: string; }
export interface MAGCostEntry extends BaseEntity { agent_id: string; task_id: string; tokens_input: number; tokens_output: number; cost_usd: number; model: string; timestamp: string; }
export interface MAGBudget extends BaseEntity { name: string; amount_usd: number; spent_usd: number; period: 'daily'|'weekly'|'monthly'; alert_threshold: number; }
export interface MAGRateLimit extends BaseEntity { agent_id: string; limit: number; window_seconds: number; current_count: number; }
export interface MAGCache extends BaseEntity { key: string; value: unknown; ttl_seconds: number; hits: number; expires_at: string; }
export interface MAGQueue extends BaseEntity { name: string; max_size: number; current_size: number; processing_rate: number; active: boolean; }
export interface MAGQueueItem extends BaseEntity { queue_id: string; payload: Record<string,unknown>; priority: number; status: 'pending'|'processing'|'completed'|'failed'; }

// ============================================================================
// Table name map
// ============================================================================
export const MAG_TABLE_NAMES: Record<string, string> = {
  MAGAgent: 'mag_agents',
  MAGAgentTemplate: 'mag_agent_templates',
  MAGAgentCapability: 'mag_agent_capabilities',
  MAGAgentConfig: 'mag_agent_configs',
  MAGAgentVersion: 'mag_agent_versions',
  MAGAgentMetrics: 'mag_agent_metrics',
  MAGAgentLog: 'mag_agent_logs',
  MAGAgentState: 'mag_agent_states',
  MAGTask: 'mag_tasks',
  MAGTaskStep: 'mag_task_steps',
  MAGTaskDependency: 'mag_task_dependencies',
  MAGTaskResult: 'mag_task_results',
  MAGTaskQueue: 'mag_task_queues',
  MAGMessage: 'mag_messages',
  MAGMessageChannel: 'mag_message_channels',
  MAGProtocol: 'mag_protocols',
  MAGProtocolMessage: 'mag_protocol_messages',
  MAGWorkflow: 'mag_workflows',
  MAGWorkflowStep: 'mag_workflow_steps',
  MAGWorkflowRun: 'mag_workflow_runs',
  MAGWorkflowStepRun: 'mag_workflow_step_runs',
  MAGAgentPool: 'mag_agent_pools',
  MAGAgentPoolMember: 'mag_agent_pool_members',
  MAGSchedule: 'mag_schedules',
  MAGScheduleRun: 'mag_schedule_runs',
  MAGPolicy: 'mag_policies',
  MAGPolicyEvaluation: 'mag_policy_evaluations',
  MAGRoute: 'mag_routes',
  MAGRouter: 'mag_routers',
  MAGRouterDecision: 'mag_router_decisions',
  MAGMemory: 'mag_memories',
  MAGMemoryContext: 'mag_memory_contexts',
  MAGKnowledge: 'mag_knowledge',
  MAGKnowledgeRelation: 'mag_knowledge_relations',
  MAGTool: 'mag_tools',
  MAGToolExecution: 'mag_tool_executions',
  MAGToolPermission: 'mag_tool_permissions',
  MAGContext: 'mag_contexts',
  MAGContextEntry: 'mag_context_entries',
  MAGFeedback: 'mag_feedbacks',
  MAGFeedbackMetric: 'mag_feedback_metrics',
  MAGDelegation: 'mag_delegations',
  MAGHandoff: 'mag_handoffs',
  MAGCollaboration: 'mag_collaborations',
  MAGCollaborationMessage: 'mag_collaboration_messages',
  MAGConsensus: 'mag_consensus',
  MAGDebate: 'mag_debates',
  MAGToolChain: 'mag_tool_chains',
  MAGToolChainStep: 'mag_tool_chain_steps',
  MAGRetryPolicy: 'mag_retry_policies',
  MAGTimeoutPolicy: 'mag_timeout_policies',
  MAGFallbackChain: 'mag_fallback_chains',
  MAGMonitor: 'mag_monitors',
  MAGMonitorAlert: 'mag_monitor_alerts',
  MAGDashboard: 'mag_dashboards',
  MAGDashboardWidget: 'mag_dashboard_widgets',
  MAGReport: 'mag_reports',
  MAGReportExecution: 'mag_report_executions',
  MAGExperiment: 'mag_experiments',
  MAGExperimentResult: 'mag_experiment_results',
  MAGAuditLog: 'mag_audit_logs',
  MAGConfig: 'mag_configs',
  MAGFeature: 'mag_features',
  MAGVersion: 'mag_versions',
  MAGLabel: 'mag_labels',
  MAGAnnotation: 'mag_annotations',
  MAGTemplate: 'mag_templates',
  MAGArchive: 'mag_archives',
  MAGNotification: 'mag_notifications',
  MAGWebhook: 'mag_webhooks',
  MAGIntegration: 'mag_integrations',
  MAGSession: 'mag_sessions',
  MAGSessionEvent: 'mag_session_events',
  MAGTag: 'mag_tags',
  MAGTaggedEntity: 'mag_tagged_entities',
  MAGBookmark: 'mag_bookmarks',
  MAGShare: 'mag_shares',
  MAGComment: 'mag_comments',
  MAGActivity: 'mag_activities',
  MAGUsageMetric: 'mag_usage_metrics',
  MAGCostEntry: 'mag_cost_entries',
  MAGBudget: 'mag_budgets',
  MAGRateLimit: 'mag_rate_limits',
  MAGCache: 'mag_caches',
  MAGQueue: 'mag_queues',
  MAGQueueItem: 'mag_queue_items',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface AEIP2Repository {
  agents: CrudRepository<MAGAgent>;
  agentTemplates: CrudRepository<MAGAgentTemplate>;
  agentCapabilities: CrudRepository<MAGAgentCapability>;
  agentConfigs: CrudRepository<MAGAgentConfig>;
  agentVersions: CrudRepository<MAGAgentVersion>;
  agentMetrics: CrudRepository<MAGAgentMetrics>;
  agentLogs: CrudRepository<MAGAgentLog>;
  agentStates: CrudRepository<MAGAgentState>;
  tasks: CrudRepository<MAGTask>;
  taskSteps: CrudRepository<MAGTaskStep>;
  taskDependencies: CrudRepository<MAGTaskDependency>;
  taskResults: CrudRepository<MAGTaskResult>;
  taskQueues: CrudRepository<MAGTaskQueue>;
  messages: CrudRepository<MAGMessage>;
  messageChannels: CrudRepository<MAGMessageChannel>;
  protocols: CrudRepository<MAGProtocol>;
  protocolMessages: CrudRepository<MAGProtocolMessage>;
  workflows: CrudRepository<MAGWorkflow>;
  workflowSteps: CrudRepository<MAGWorkflowStep>;
  workflowRuns: CrudRepository<MAGWorkflowRun>;
  workflowStepRuns: CrudRepository<MAGWorkflowStepRun>;
  agentPools: CrudRepository<MAGAgentPool>;
  agentPoolMembers: CrudRepository<MAGAgentPoolMember>;
  schedules: CrudRepository<MAGSchedule>;
  scheduleRuns: CrudRepository<MAGScheduleRun>;
  policies: CrudRepository<MAGPolicy>;
  policyEvaluations: CrudRepository<MAGPolicyEvaluation>;
  routes: CrudRepository<MAGRoute>;
  routers: CrudRepository<MAGRouter>;
  routerDecisions: CrudRepository<MAGRouterDecision>;
  memories: CrudRepository<MAGMemory>;
  memoryContexts: CrudRepository<MAGMemoryContext>;
  knowledge: CrudRepository<MAGKnowledge>;
  knowledgeRelations: CrudRepository<MAGKnowledgeRelation>;
  tools: CrudRepository<MAGTool>;
  toolExecutions: CrudRepository<MAGToolExecution>;
  toolPermissions: CrudRepository<MAGToolPermission>;
  contexts: CrudRepository<MAGContext>;
  contextEntries: CrudRepository<MAGContextEntry>;
  feedbacks: CrudRepository<MAGFeedback>;
  feedbackMetrics: CrudRepository<MAGFeedbackMetric>;
  delegations: CrudRepository<MAGDelegation>;
  handoffs: CrudRepository<MAGHandoff>;
  collaborations: CrudRepository<MAGCollaboration>;
  collaborationMessages: CrudRepository<MAGCollaborationMessage>;
  consensus: CrudRepository<MAGConsensus>;
  debates: CrudRepository<MAGDebate>;
  toolChains: CrudRepository<MAGToolChain>;
  toolChainSteps: CrudRepository<MAGToolChainStep>;
  retryPolicies: CrudRepository<MAGRetryPolicy>;
  timeoutPolicies: CrudRepository<MAGTimeoutPolicy>;
  fallbackChains: CrudRepository<MAGFallbackChain>;
  monitors: CrudRepository<MAGMonitor>;
  monitorAlerts: CrudRepository<MAGMonitorAlert>;
  dashboards: CrudRepository<MAGDashboard>;
  dashboardWidgets: CrudRepository<MAGDashboardWidget>;
  reports: CrudRepository<MAGReport>;
  reportExecutions: CrudRepository<MAGReportExecution>;
  experiments: CrudRepository<MAGExperiment>;
  experimentResults: CrudRepository<MAGExperimentResult>;
  auditLogs: CrudRepository<MAGAuditLog>;
  configs: CrudRepository<MAGConfig>;
  features: CrudRepository<MAGFeature>;
  versions: CrudRepository<MAGVersion>;
  labels: CrudRepository<MAGLabel>;
  annotations: CrudRepository<MAGAnnotation>;
  templates: CrudRepository<MAGTemplate>;
  archives: CrudRepository<MAGArchive>;
  notifications: CrudRepository<MAGNotification>;
  webhooks: CrudRepository<MAGWebhook>;
  integrations: CrudRepository<MAGIntegration>;
  sessions: CrudRepository<MAGSession>;
  sessionEvents: CrudRepository<MAGSessionEvent>;
  tags: CrudRepository<MAGTag>;
  taggedEntities: CrudRepository<MAGTaggedEntity>;
  bookmarks: CrudRepository<MAGBookmark>;
  shares: CrudRepository<MAGShare>;
  comments: CrudRepository<MAGComment>;
  activities: CrudRepository<MAGActivity>;
  usageMetrics: CrudRepository<MAGUsageMetric>;
  costEntries: CrudRepository<MAGCostEntry>;
  budgets: CrudRepository<MAGBudget>;
  rateLimits: CrudRepository<MAGRateLimit>;
  caches: CrudRepository<MAGCache>;
  queues: CrudRepository<MAGQueue>;
  queueItems: CrudRepository<MAGQueueItem>;
}

// ============================================================================
// Factory
// ============================================================================
export function createAEIP2Repository(supabase: SupabaseClient): AEIP2Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    agents: crud<MAGAgent>(MAG_TABLE_NAMES.MAGAgent),
    agentTemplates: crud<MAGAgentTemplate>(MAG_TABLE_NAMES.MAGAgentTemplate),
    agentCapabilities: crud<MAGAgentCapability>(MAG_TABLE_NAMES.MAGAgentCapability),
    agentConfigs: crud<MAGAgentConfig>(MAG_TABLE_NAMES.MAGAgentConfig),
    agentVersions: crud<MAGAgentVersion>(MAG_TABLE_NAMES.MAGAgentVersion),
    agentMetrics: crud<MAGAgentMetrics>(MAG_TABLE_NAMES.MAGAgentMetrics),
    agentLogs: crud<MAGAgentLog>(MAG_TABLE_NAMES.MAGAgentLog),
    agentStates: crud<MAGAgentState>(MAG_TABLE_NAMES.MAGAgentState),
    tasks: crud<MAGTask>(MAG_TABLE_NAMES.MAGTask),
    taskSteps: crud<MAGTaskStep>(MAG_TABLE_NAMES.MAGTaskStep),
    taskDependencies: crud<MAGTaskDependency>(MAG_TABLE_NAMES.MAGTaskDependency),
    taskResults: crud<MAGTaskResult>(MAG_TABLE_NAMES.MAGTaskResult),
    taskQueues: crud<MAGTaskQueue>(MAG_TABLE_NAMES.MAGTaskQueue),
    messages: crud<MAGMessage>(MAG_TABLE_NAMES.MAGMessage),
    messageChannels: crud<MAGMessageChannel>(MAG_TABLE_NAMES.MAGMessageChannel),
    protocols: crud<MAGProtocol>(MAG_TABLE_NAMES.MAGProtocol),
    protocolMessages: crud<MAGProtocolMessage>(MAG_TABLE_NAMES.MAGProtocolMessage),
    workflows: crud<MAGWorkflow>(MAG_TABLE_NAMES.MAGWorkflow),
    workflowSteps: crud<MAGWorkflowStep>(MAG_TABLE_NAMES.MAGWorkflowStep),
    workflowRuns: crud<MAGWorkflowRun>(MAG_TABLE_NAMES.MAGWorkflowRun),
    workflowStepRuns: crud<MAGWorkflowStepRun>(MAG_TABLE_NAMES.MAGWorkflowStepRun),
    agentPools: crud<MAGAgentPool>(MAG_TABLE_NAMES.MAGAgentPool),
    agentPoolMembers: crud<MAGAgentPoolMember>(MAG_TABLE_NAMES.MAGAgentPoolMember),
    schedules: crud<MAGSchedule>(MAG_TABLE_NAMES.MAGSchedule),
    scheduleRuns: crud<MAGScheduleRun>(MAG_TABLE_NAMES.MAGScheduleRun),
    policies: crud<MAGPolicy>(MAG_TABLE_NAMES.MAGPolicy),
    policyEvaluations: crud<MAGPolicyEvaluation>(MAG_TABLE_NAMES.MAGPolicyEvaluation),
    routes: crud<MAGRoute>(MAG_TABLE_NAMES.MAGRoute),
    routers: crud<MAGRouter>(MAG_TABLE_NAMES.MAGRouter),
    routerDecisions: crud<MAGRouterDecision>(MAG_TABLE_NAMES.MAGRouterDecision),
    memories: crud<MAGMemory>(MAG_TABLE_NAMES.MAGMemory),
    memoryContexts: crud<MAGMemoryContext>(MAG_TABLE_NAMES.MAGMemoryContext),
    knowledge: crud<MAGKnowledge>(MAG_TABLE_NAMES.MAGKnowledge),
    knowledgeRelations: crud<MAGKnowledgeRelation>(MAG_TABLE_NAMES.MAGKnowledgeRelation),
    tools: crud<MAGTool>(MAG_TABLE_NAMES.MAGTool),
    toolExecutions: crud<MAGToolExecution>(MAG_TABLE_NAMES.MAGToolExecution),
    toolPermissions: crud<MAGToolPermission>(MAG_TABLE_NAMES.MAGToolPermission),
    contexts: crud<MAGContext>(MAG_TABLE_NAMES.MAGContext),
    contextEntries: crud<MAGContextEntry>(MAG_TABLE_NAMES.MAGContextEntry),
    feedbacks: crud<MAGFeedback>(MAG_TABLE_NAMES.MAGFeedback),
    feedbackMetrics: crud<MAGFeedbackMetric>(MAG_TABLE_NAMES.MAGFeedbackMetric),
    delegations: crud<MAGDelegation>(MAG_TABLE_NAMES.MAGDelegation),
    handoffs: crud<MAGHandoff>(MAG_TABLE_NAMES.MAGHandoff),
    collaborations: crud<MAGCollaboration>(MAG_TABLE_NAMES.MAGCollaboration),
    collaborationMessages: crud<MAGCollaborationMessage>(MAG_TABLE_NAMES.MAGCollaborationMessage),
    consensus: crud<MAGConsensus>(MAG_TABLE_NAMES.MAGConsensus),
    debates: crud<MAGDebate>(MAG_TABLE_NAMES.MAGDebate),
    toolChains: crud<MAGToolChain>(MAG_TABLE_NAMES.MAGToolChain),
    toolChainSteps: crud<MAGToolChainStep>(MAG_TABLE_NAMES.MAGToolChainStep),
    retryPolicies: crud<MAGRetryPolicy>(MAG_TABLE_NAMES.MAGRetryPolicy),
    timeoutPolicies: crud<MAGTimeoutPolicy>(MAG_TABLE_NAMES.MAGTimeoutPolicy),
    fallbackChains: crud<MAGFallbackChain>(MAG_TABLE_NAMES.MAGFallbackChain),
    monitors: crud<MAGMonitor>(MAG_TABLE_NAMES.MAGMonitor),
    monitorAlerts: crud<MAGMonitorAlert>(MAG_TABLE_NAMES.MAGMonitorAlert),
    dashboards: crud<MAGDashboard>(MAG_TABLE_NAMES.MAGDashboard),
    dashboardWidgets: crud<MAGDashboardWidget>(MAG_TABLE_NAMES.MAGDashboardWidget),
    reports: crud<MAGReport>(MAG_TABLE_NAMES.MAGReport),
    reportExecutions: crud<MAGReportExecution>(MAG_TABLE_NAMES.MAGReportExecution),
    experiments: crud<MAGExperiment>(MAG_TABLE_NAMES.MAGExperiment),
    experimentResults: crud<MAGExperimentResult>(MAG_TABLE_NAMES.MAGExperimentResult),
    auditLogs: crud<MAGAuditLog>(MAG_TABLE_NAMES.MAGAuditLog),
    configs: crud<MAGConfig>(MAG_TABLE_NAMES.MAGConfig),
    features: crud<MAGFeature>(MAG_TABLE_NAMES.MAGFeature),
    versions: crud<MAGVersion>(MAG_TABLE_NAMES.MAGVersion),
    labels: crud<MAGLabel>(MAG_TABLE_NAMES.MAGLabel),
    annotations: crud<MAGAnnotation>(MAG_TABLE_NAMES.MAGAnnotation),
    templates: crud<MAGTemplate>(MAG_TABLE_NAMES.MAGTemplate),
    archives: crud<MAGArchive>(MAG_TABLE_NAMES.MAGArchive),
    notifications: crud<MAGNotification>(MAG_TABLE_NAMES.MAGNotification),
    webhooks: crud<MAGWebhook>(MAG_TABLE_NAMES.MAGWebhook),
    integrations: crud<MAGIntegration>(MAG_TABLE_NAMES.MAGIntegration),
    sessions: crud<MAGSession>(MAG_TABLE_NAMES.MAGSession),
    sessionEvents: crud<MAGSessionEvent>(MAG_TABLE_NAMES.MAGSessionEvent),
    tags: crud<MAGTag>(MAG_TABLE_NAMES.MAGTag),
    taggedEntities: crud<MAGTaggedEntity>(MAG_TABLE_NAMES.MAGTaggedEntity),
    bookmarks: crud<MAGBookmark>(MAG_TABLE_NAMES.MAGBookmark),
    shares: crud<MAGShare>(MAG_TABLE_NAMES.MAGShare),
    comments: crud<MAGComment>(MAG_TABLE_NAMES.MAGComment),
    activities: crud<MAGActivity>(MAG_TABLE_NAMES.MAGActivity),
    usageMetrics: crud<MAGUsageMetric>(MAG_TABLE_NAMES.MAGUsageMetric),
    costEntries: crud<MAGCostEntry>(MAG_TABLE_NAMES.MAGCostEntry),
    budgets: crud<MAGBudget>(MAG_TABLE_NAMES.MAGBudget),
    rateLimits: crud<MAGRateLimit>(MAG_TABLE_NAMES.MAGRateLimit),
    caches: crud<MAGCache>(MAG_TABLE_NAMES.MAGCache),
    queues: crud<MAGQueue>(MAG_TABLE_NAMES.MAGQueue),
    queueItems: crud<MAGQueueItem>(MAG_TABLE_NAMES.MAGQueueItem),
  };
}

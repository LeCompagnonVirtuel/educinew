import { z } from 'zod';

const schoolId = z.string().uuid();

// ── Core Runtime Enums ────────

const runtimeStatus = z.enum([
  'RUNNING', 'STOPPED', 'DEGRADED', 'MAINTENANCE', 'STARTING', 'SHUTTING_DOWN',
]);

const moduleStatus = z.enum([
  'ACTIVE', 'INACTIVE', 'LOADING', 'ERROR', 'DISABLED', 'UPDATING',
]);

const serviceStatus = z.enum([
  'HEALTHY', 'UNHEALTHY', 'DEGRADED', 'UNKNOWN', 'TIMEOUT',
]);

const pluginStatus = z.enum([
  'INSTALLED', 'ENABLED', 'DISABLED', 'ERROR', 'UPDATING', 'UNINSTALLING',
]);

const taskStatus = z.enum([
  'PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED', 'TIMEOUT', 'RETRYING',
]);

const jobStatus = z.enum([
  'QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'PAUSED',
]);

const queueStatus = z.enum([
  'ACTIVE', 'PAUSED', 'DRAINING', 'DISABLED',
]);

const schedulerStatus = z.enum([
  'ACTIVE', 'PAUSED', 'STOPPED',
]);

const healthStatus = z.enum([
  'HEALTHY', 'DEGRADED', 'UNHEALTHY', 'UNKNOWN',
]);

const tenantStatus = z.enum([
  'ACTIVE', 'SUSPENDED', 'TERMINATED', 'MIGRATING',
]);

const dependencyStatus = z.enum([
  'SATISFIED', 'UNSATISFIED', 'CONFLICT', 'UNKNOWN',
]);

const moduleType = z.enum([
  'CORE', 'FEATURE', 'PLUGIN', 'EXTENSION', 'INTEGRATION', 'AI', 'ANALYTICS',
]);

const taskPriority = z.enum([
  'LOW', 'NORMAL', 'HIGH', 'CRITICAL', 'REALTIME',
]);

const jobType = z.enum([
  'SYNC', 'ASYNC', 'SCHEDULED', 'RECURRING', 'ONE_TIME',
]);

// ── Workflow Enums ────────

const workflowStatus = z.enum([
  'DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED', 'FAILED', 'ARCHIVED',
]);

const workflowStepType = z.enum([
  'ACTION', 'CONDITION', 'BRANCH', 'LOOP', 'APPROVAL', 'TIMER', 'PARALLEL',
  'SUBPROCESS', 'SCRIPT', 'NOTIFICATION', 'INTEGRATION',
]);

const nodeStatus = z.enum([
  'PENDING', 'RUNNING', 'WAITING', 'COMPLETED', 'FAILED', 'SKIPPED', 'TIMEOUT',
]);

const approvalStatus = z.enum([
  'PENDING', 'APPROVED', 'REJECTED', 'DELEGATED', 'EXPIRED', 'ESCALATED',
]);

const conditionOperator = z.enum([
  'EQUALS', 'NOT_EQUALS', 'GREATER_THAN', 'LESS_THAN', 'CONTAINS', 'IN', 'BETWEEN', 'AND', 'OR',
]);

const timerType = z.enum([
  'FIXED_DELAY', 'CRON', 'DURATION', 'DEADLINE', 'SLA',
]);

const escalationAction = z.enum([
  'NOTIFY', 'REASSIGN', 'APPROVE', 'CANCEL', 'ESCALATE',
]);

const compensationStatus = z.enum([
  'PENDING', 'EXECUTED', 'FAILED', 'SKIPPED',
]);

const auditTrailAction = z.enum([
  'CREATED', 'STARTED', 'PAUSED', 'RESUMED', 'COMPLETED', 'CANCELLED',
  'FAILED', 'APPROVED', 'REJECTED', 'MODIFIED',
]);

const workflowTemplateType = z.enum([
  'ONBOARDING', 'APPROVAL', 'REVIEW', 'ASSESSMENT', 'CERTIFICATION',
  'GRADUATION', 'TRANSFER', 'COMPLIANCE', 'CUSTOM',
]);

// ── Core Runtime: RuntimeManager ────────

export const runtimeManagerCreateSchema = z.object({
  school_id: schoolId,
  status: runtimeStatus,
  version: z.string(),
  uptime_seconds: z.number(),
  modules_loaded: z.number(),
  services_healthy: z.number(),
  services_total: z.number(),
  last_health_check: z.string().datetime(),
});

export const runtimeManagerUpdateSchema = z.object({
  school_id: schoolId,
  status: runtimeStatus,
  version: z.string(),
  uptime_seconds: z.number(),
  modules_loaded: z.number(),
  services_healthy: z.number(),
  services_total: z.number(),
  last_health_check: z.string().datetime(),
}).partial();

// ── Core Runtime: ModuleRegistry ────────

export const moduleRegistryCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  version: z.string(),
  type: moduleType,
  status: moduleStatus,
  description: z.string(),
  dependencies: z.array(z.string()),
  config: z.record(z.unknown()),
  loaded_at: z.string().datetime().nullable(),
});

export const moduleRegistryUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  version: z.string(),
  type: moduleType,
  status: moduleStatus,
  description: z.string(),
  dependencies: z.array(z.string()),
  config: z.record(z.unknown()),
  loaded_at: z.string().datetime().nullable(),
}).partial();

// ── Core Runtime: ServiceRegistry ────────

export const serviceRegistryCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  version: z.string(),
  status: serviceStatus,
  endpoint: z.string(),
  health_url: z.string(),
  metadata: z.record(z.unknown()),
  registered_at: z.string().datetime(),
  last_heartbeat: z.string().datetime(),
});

export const serviceRegistryUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  version: z.string(),
  status: serviceStatus,
  endpoint: z.string(),
  health_url: z.string(),
  metadata: z.record(z.unknown()),
  registered_at: z.string().datetime(),
  last_heartbeat: z.string().datetime(),
}).partial();

// ── Core Runtime: DynamicModuleLoader ────────

export const dynamicModuleLoaderCreateSchema = z.object({
  school_id: schoolId,
  module_id: z.string().uuid(),
  load_order: z.number(),
  status: moduleStatus,
  error_message: z.string().nullable(),
  loaded_at: z.string().datetime().nullable(),
});

export const dynamicModuleLoaderUpdateSchema = z.object({
  school_id: schoolId,
  module_id: z.string().uuid(),
  load_order: z.number(),
  status: moduleStatus,
  error_message: z.string().nullable(),
  loaded_at: z.string().datetime().nullable(),
}).partial();

// ── Core Runtime: PluginLoader ────────

export const pluginLoaderCreateSchema = z.object({
  school_id: schoolId,
  plugin_name: z.string(),
  version: z.string(),
  status: pluginStatus,
  config: z.record(z.unknown()),
  dependencies: z.array(z.string()),
  error_message: z.string().nullable(),
  installed_at: z.string().datetime(),
});

export const pluginLoaderUpdateSchema = z.object({
  school_id: schoolId,
  plugin_name: z.string(),
  version: z.string(),
  status: pluginStatus,
  config: z.record(z.unknown()),
  dependencies: z.array(z.string()),
  error_message: z.string().nullable(),
  installed_at: z.string().datetime(),
}).partial();

// ── Core Runtime: FeatureRegistry ────────

export const featureRegistryCreateSchema = z.object({
  school_id: schoolId,
  feature_name: z.string(),
  enabled: z.boolean(),
  module_id: z.string().uuid(),
  config: z.record(z.unknown()),
});

export const featureRegistryUpdateSchema = z.object({
  school_id: schoolId,
  feature_name: z.string(),
  enabled: z.boolean(),
  module_id: z.string().uuid(),
  config: z.record(z.unknown()),
}).partial();

// ── Core Runtime: DependencyGraph ────────

const dependencyNodeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  version: z.string(),
  type: z.string(),
  status: dependencyStatus,
});

const dependencyEdgeSchema = z.object({
  source: z.string().uuid(),
  target: z.string().uuid(),
  relationship: z.string(),
});

export const dependencyGraphCreateSchema = z.object({
  school_id: schoolId,
  nodes: z.array(dependencyNodeSchema),
  edges: z.array(dependencyEdgeSchema),
  last_resolved: z.string().datetime(),
});

export const dependencyGraphUpdateSchema = z.object({
  school_id: schoolId,
  nodes: z.array(dependencyNodeSchema),
  edges: z.array(dependencyEdgeSchema),
  last_resolved: z.string().datetime(),
}).partial();

// ── Core Runtime: BackgroundTask ────────

export const backgroundTaskCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  task_type: z.string(),
  status: taskStatus,
  priority: taskPriority,
  payload: z.record(z.unknown()),
  result: z.record(z.unknown()).nullable(),
  error: z.string().nullable(),
  started_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
});

export const backgroundTaskUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  task_type: z.string(),
  status: taskStatus,
  priority: taskPriority,
  payload: z.record(z.unknown()),
  result: z.record(z.unknown()).nullable(),
  error: z.string().nullable(),
  started_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
}).partial();

// ── Core Runtime: Scheduler ────────

export const schedulerCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  cron_expression: z.string(),
  task_type: z.string(),
  payload: z.record(z.unknown()),
  status: schedulerStatus,
  last_run: z.string().datetime().nullable(),
  next_run: z.string().datetime(),
});

export const schedulerUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  cron_expression: z.string(),
  task_type: z.string(),
  payload: z.record(z.unknown()),
  status: schedulerStatus,
  last_run: z.string().datetime().nullable(),
  next_run: z.string().datetime(),
}).partial();

// ── Core Runtime: QueueManager ────────

export const queueManagerCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  status: queueStatus,
  message_count: z.number(),
  consumer_count: z.number(),
  throughput_per_second: z.number(),
});

export const queueManagerUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  status: queueStatus,
  message_count: z.number(),
  consumer_count: z.number(),
  throughput_per_second: z.number(),
}).partial();

// ── Core Runtime: JobRunner ────────

export const jobRunnerCreateSchema = z.object({
  school_id: schoolId,
  job_type: jobType,
  status: jobStatus,
  payload: z.record(z.unknown()),
  result: z.record(z.unknown()).nullable(),
  error: z.string().nullable(),
  attempts: z.number(),
  max_attempts: z.number(),
  started_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
});

export const jobRunnerUpdateSchema = z.object({
  school_id: schoolId,
  job_type: jobType,
  status: jobStatus,
  payload: z.record(z.unknown()),
  result: z.record(z.unknown()).nullable(),
  error: z.string().nullable(),
  attempts: z.number(),
  max_attempts: z.number(),
  started_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
}).partial();

// ── Core Runtime: RuntimeConfig ────────

export const runtimeConfigCreateSchema = z.object({
  school_id: schoolId,
  config_key: z.string(),
  config_value: z.record(z.unknown()),
  environment: z.string(),
});

export const runtimeConfigUpdateSchema = z.object({
  school_id: schoolId,
  config_key: z.string(),
  config_value: z.record(z.unknown()),
  environment: z.string(),
}).partial();

// ── Core Runtime: TenantRuntime ────────

const resourceLimitsSchema = z.object({
  max_cpu: z.number(),
  max_memory_mb: z.number(),
  max_storage_mb: z.number(),
  max_api_calls_per_minute: z.number(),
  max_concurrent_users: z.number(),
});

export const tenantRuntimeCreateSchema = z.object({
  tenant_id: z.string().uuid(),
  school_id: schoolId,
  status: tenantStatus,
  modules_enabled: z.array(z.string()),
  config: z.record(z.unknown()),
  resource_limits: resourceLimitsSchema,
});

export const tenantRuntimeUpdateSchema = z.object({
  tenant_id: z.string().uuid(),
  school_id: schoolId,
  status: tenantStatus,
  modules_enabled: z.array(z.string()),
  config: z.record(z.unknown()),
  resource_limits: resourceLimitsSchema,
}).partial();

// ── Core Runtime: HealthManager ────────

const healthCheckSchema = z.object({
  service_name: z.string(),
  status: healthStatus,
  latency_ms: z.number(),
  message: z.string(),
  checked_at: z.string().datetime(),
});

export const healthManagerCreateSchema = z.object({
  school_id: schoolId,
  overall_status: healthStatus,
  checks: z.array(healthCheckSchema),
  last_checked: z.string().datetime(),
  uptime_percentage: z.number(),
});

export const healthManagerUpdateSchema = z.object({
  school_id: schoolId,
  overall_status: healthStatus,
  checks: z.array(healthCheckSchema),
  last_checked: z.string().datetime(),
  uptime_percentage: z.number(),
}).partial();

// ── Workflow: VisualWorkflowBuilder ────────

const workflowNodeSchema = z.object({
  id: z.string().uuid(),
  type: workflowStepType,
  position_x: z.number(),
  position_y: z.number(),
  config: z.record(z.unknown()),
  label: z.string(),
});

const workflowEdgeSchema = z.object({
  source: z.string().uuid(),
  target: z.string().uuid(),
  condition: z.string().nullable(),
  label: z.string(),
});

export const visualWorkflowBuilderCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  description: z.string(),
  nodes: z.array(workflowNodeSchema),
  edges: z.array(workflowEdgeSchema),
  status: workflowStatus,
  version: z.number(),
  created_by: z.string().uuid(),
});

export const visualWorkflowBuilderUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  description: z.string(),
  nodes: z.array(workflowNodeSchema),
  edges: z.array(workflowEdgeSchema),
  status: workflowStatus,
  version: z.number(),
  created_by: z.string().uuid(),
}).partial();

// ── Workflow: BPMNEngine ────────

export const bpmnEngineCreateSchema = z.object({
  school_id: schoolId,
  workflow_id: z.string().uuid(),
  bpmn_xml: z.string(),
  process_id: z.string(),
  status: z.string(),
  version: z.number(),
  deployed_at: z.string().datetime(),
});

export const bpmnEngineUpdateSchema = z.object({
  school_id: schoolId,
  workflow_id: z.string().uuid(),
  bpmn_xml: z.string(),
  process_id: z.string(),
  status: z.string(),
  version: z.number(),
  deployed_at: z.string().datetime(),
}).partial();

// ── Workflow: StateMachine ────────

const stateDefinitionSchema = z.object({
  name: z.string(),
  type: z.string(),
  is_initial: z.boolean(),
  is_final: z.boolean(),
  actions: z.array(z.string()),
});

const stateTransitionSchema = z.object({
  from: z.string(),
  to: z.string(),
  event: z.string(),
  condition: z.string().nullable(),
  actions: z.array(z.string()),
});

export const stateMachineCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  entity_type: z.string(),
  states: z.array(stateDefinitionSchema),
  transitions: z.array(stateTransitionSchema),
  initial_state: z.string(),
  current_state: z.string(),
});

export const stateMachineUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  entity_type: z.string(),
  states: z.array(stateDefinitionSchema),
  transitions: z.array(stateTransitionSchema),
  initial_state: z.string(),
  current_state: z.string(),
}).partial();

// ── Workflow: WorkflowCondition ────────

export const workflowConditionCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  field: z.string(),
  operator: conditionOperator,
  value: z.string(),
});

export const workflowConditionUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  field: z.string(),
  operator: conditionOperator,
  value: z.string(),
}).partial();

// ── Workflow: WorkflowBranch ────────

const branchDefinitionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  condition: z.string(),
  target_node_id: z.string().uuid(),
});

export const workflowBranchCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  branches: z.array(branchDefinitionSchema),
  default_branch: z.string().nullable(),
});

export const workflowBranchUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  branches: z.array(branchDefinitionSchema),
  default_branch: z.string().nullable(),
}).partial();

// ── Workflow: WorkflowLoop ────────

export const workflowLoopCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  iterator_field: z.string(),
  max_iterations: z.number(),
  break_condition: z.string().nullable(),
});

export const workflowLoopUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  iterator_field: z.string(),
  max_iterations: z.number(),
  break_condition: z.string().nullable(),
}).partial();

// ── Workflow: HumanApproval ────────

export const humanApprovalCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  instance_id: z.string().uuid(),
  node_id: z.string().uuid(),
  approver_id: z.string().uuid(),
  status: approvalStatus,
  comments: z.string().nullable(),
  decided_at: z.string().datetime().nullable(),
});

export const humanApprovalUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  instance_id: z.string().uuid(),
  node_id: z.string().uuid(),
  approver_id: z.string().uuid(),
  status: approvalStatus,
  comments: z.string().nullable(),
  decided_at: z.string().datetime().nullable(),
}).partial();

// ── Workflow: WorkflowSLA ────────

export const workflowSlaCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  duration_minutes: z.number(),
  escalation_actions: z.array(escalationAction),
});

export const workflowSlaUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  duration_minutes: z.number(),
  escalation_actions: z.array(escalationAction),
}).partial();

// ── Workflow: WorkflowEscalation ────────

export const workflowEscalationCreateSchema = z.object({
  sla_id: z.string().uuid(),
  level: z.number(),
  action: escalationAction,
  target_role: z.string(),
  timeout_minutes: z.number(),
});

export const workflowEscalationUpdateSchema = z.object({
  sla_id: z.string().uuid(),
  level: z.number(),
  action: escalationAction,
  target_role: z.string(),
  timeout_minutes: z.number(),
}).partial();

// ── Workflow: WorkflowRetry ────────

export const workflowRetryCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  max_retries: z.number(),
  retry_delay_seconds: z.number(),
  retry_count: z.number(),
  last_retry_at: z.string().datetime().nullable(),
});

export const workflowRetryUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  max_retries: z.number(),
  retry_delay_seconds: z.number(),
  retry_count: z.number(),
  last_retry_at: z.string().datetime().nullable(),
}).partial();

// ── Workflow: WorkflowRollback ────────

export const workflowRollbackCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  instance_id: z.string().uuid(),
  target_node_id: z.string().uuid(),
  reason: z.string(),
  executed_at: z.string().datetime(),
});

export const workflowRollbackUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  instance_id: z.string().uuid(),
  target_node_id: z.string().uuid(),
  reason: z.string(),
  executed_at: z.string().datetime(),
}).partial();

// ── Workflow: WorkflowCompensation ────────

export const workflowCompensationCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  compensation_action: z.string(),
  status: compensationStatus,
  executed_at: z.string().datetime().nullable(),
});

export const workflowCompensationUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  compensation_action: z.string(),
  status: compensationStatus,
  executed_at: z.string().datetime().nullable(),
}).partial();

// ── Workflow: WorkflowTimer ────────

export const workflowTimerCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  timer_type: timerType,
  duration_seconds: z.number().nullable(),
  cron_expression: z.string().nullable(),
  deadline: z.string().datetime().nullable(),
});

export const workflowTimerUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  node_id: z.string().uuid(),
  timer_type: timerType,
  duration_seconds: z.number().nullable(),
  cron_expression: z.string().nullable(),
  deadline: z.string().datetime().nullable(),
}).partial();

// ── Workflow: ScheduledWorkflow ────────

export const scheduledWorkflowCreateSchema = z.object({
  school_id: schoolId,
  workflow_id: z.string().uuid(),
  schedule: z.string(),
  payload: z.record(z.unknown()),
  enabled: z.boolean(),
  last_run: z.string().datetime().nullable(),
  next_run: z.string().datetime(),
});

export const scheduledWorkflowUpdateSchema = z.object({
  school_id: schoolId,
  workflow_id: z.string().uuid(),
  schedule: z.string(),
  payload: z.record(z.unknown()),
  enabled: z.boolean(),
  last_run: z.string().datetime().nullable(),
  next_run: z.string().datetime(),
}).partial();

// ── Workflow: WorkflowTemplate ────────

const workflowVariableSchema = z.object({
  name: z.string(),
  type: z.string(),
  default_value: z.unknown(),
  required: z.boolean(),
  description: z.string(),
});

export const workflowTemplateCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  template_type: workflowTemplateType,
  description: z.string(),
  nodes: z.array(workflowNodeSchema),
  edges: z.array(workflowEdgeSchema),
  variables: z.array(workflowVariableSchema),
  version: z.number(),
  is_public: z.boolean(),
});

export const workflowTemplateUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  template_type: workflowTemplateType,
  description: z.string(),
  nodes: z.array(workflowNodeSchema),
  edges: z.array(workflowEdgeSchema),
  variables: z.array(workflowVariableSchema),
  version: z.number(),
  is_public: z.boolean(),
}).partial();

// ── Workflow: WorkflowVersioning ────────

export const workflowVersioningCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  version: z.number(),
  changelog: z.string(),
  nodes: z.array(workflowNodeSchema),
  edges: z.array(workflowEdgeSchema),
  created_by: z.string().uuid(),
});

export const workflowVersioningUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  version: z.number(),
  changelog: z.string(),
  nodes: z.array(workflowNodeSchema),
  edges: z.array(workflowEdgeSchema),
  created_by: z.string().uuid(),
}).partial();

// ── Workflow: WorkflowAuditTrail ────────

export const workflowAuditTrailCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  instance_id: z.string().uuid(),
  action: auditTrailAction,
  node_id: z.string().uuid().nullable(),
  user_id: z.string().uuid(),
  details: z.record(z.unknown()),
  timestamp: z.string().datetime(),
});

export const workflowAuditTrailUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  instance_id: z.string().uuid(),
  action: auditTrailAction,
  node_id: z.string().uuid().nullable(),
  user_id: z.string().uuid(),
  details: z.record(z.unknown()),
  timestamp: z.string().datetime(),
}).partial();

// ── Workflow: WorkflowInstance ────────

export const workflowInstanceCreateSchema = z.object({
  workflow_id: z.string().uuid(),
  school_id: schoolId,
  status: z.string(),
  current_node_id: z.string().uuid(),
  variables: z.record(z.unknown()),
  started_at: z.string().datetime(),
  completed_at: z.string().datetime().nullable(),
});

export const workflowInstanceUpdateSchema = z.object({
  workflow_id: z.string().uuid(),
  school_id: schoolId,
  status: z.string(),
  current_node_id: z.string().uuid(),
  variables: z.record(z.unknown()),
  started_at: z.string().datetime(),
  completed_at: z.string().datetime().nullable(),
}).partial();

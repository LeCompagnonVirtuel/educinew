// =============================================================================
// Phase 3.4 — Education Operating System (EduOS)
// Module 1: EduOS Core Runtime
// Module 2: Workflow Orchestration Engine
// =============================================================================

// =============================================================================
// MODULE 1 — EduOS Core Runtime Enums
// =============================================================================

export enum RuntimeStatus {
  RUNNING = "RUNNING",
  STOPPED = "STOPPED",
  DEGRADED = "DEGRADED",
  MAINTENANCE = "MAINTENANCE",
  STARTING = "STARTING",
  SHUTTING_DOWN = "SHUTTING_DOWN",
}

export enum ModuleStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  LOADING = "LOADING",
  ERROR = "ERROR",
  DISABLED = "DISABLED",
  UPDATING = "UPDATING",
}

export enum ServiceStatus {
  HEALTHY = "HEALTHY",
  UNHEALTHY = "UNHEALTHY",
  DEGRADED = "DEGRADED",
  UNKNOWN = "UNKNOWN",
  TIMEOUT = "TIMEOUT",
}

export enum PluginStatus {
  INSTALLED = "INSTALLED",
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
  ERROR = "ERROR",
  UPDATING = "UPDATING",
  UNINSTALLING = "UNINSTALLING",
}

export enum TaskStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  TIMEOUT = "TIMEOUT",
  RETRYING = "RETRYING",
}

export enum JobStatus {
  QUEUED = "QUEUED",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  PAUSED = "PAUSED",
}

export enum QueueStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  DRAINING = "DRAINING",
  DISABLED = "DISABLED",
}

export enum SchedulerStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export enum HealthStatus {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  UNHEALTHY = "UNHEALTHY",
  UNKNOWN = "UNKNOWN",
}

export enum TenantStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  TERMINATED = "TERMINATED",
  MIGRATING = "MIGRATING",
}

export enum DependencyStatus {
  SATISFIED = "SATISFIED",
  UNSATISFIED = "UNSATISFIED",
  CONFLICT = "CONFLICT",
  UNKNOWN = "UNKNOWN",
}

export enum ModuleType {
  CORE = "CORE",
  FEATURE = "FEATURE",
  PLUGIN = "PLUGIN",
  EXTENSION = "EXTENSION",
  INTEGRATION = "INTEGRATION",
  AI = "AI",
  ANALYTICS = "ANALYTICS",
}

export enum TaskPriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  REALTIME = "REALTIME",
}

export enum JobType {
  SYNC = "SYNC",
  ASYNC = "ASYNC",
  SCHEDULED = "SCHEDULED",
  RECURRING = "RECURRING",
  ONE_TIME = "ONE_TIME",
}

// =============================================================================
// MODULE 2 — Workflow Orchestration Engine Enums
// =============================================================================

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
  ARCHIVED = "ARCHIVED",
}

export enum WorkflowStepType {
  ACTION = "ACTION",
  CONDITION = "CONDITION",
  BRANCH = "BRANCH",
  LOOP = "LOOP",
  APPROVAL = "APPROVAL",
  TIMER = "TIMER",
  PARALLEL = "PARALLEL",
  SUBPROCESS = "SUBPROCESS",
  SCRIPT = "SCRIPT",
  NOTIFICATION = "NOTIFICATION",
  INTEGRATION = "INTEGRATION",
}

export enum NodeStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  WAITING = "WAITING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  SKIPPED = "SKIPPED",
  TIMEOUT = "TIMEOUT",
}

export enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  DELEGATED = "DELEGATED",
  EXPIRED = "EXPIRED",
  ESCALATED = "ESCALATED",
}

export enum ConditionOperator {
  EQUALS = "EQUALS",
  NOT_EQUALS = "NOT_EQUALS",
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN = "LESS_THAN",
  CONTAINS = "CONTAINS",
  IN = "IN",
  BETWEEN = "BETWEEN",
  AND = "AND",
  OR = "OR",
}

export enum TimerType {
  FIXED_DELAY = "FIXED_DELAY",
  CRON = "CRON",
  DURATION = "DURATION",
  DEADLINE = "DEADLINE",
  SLA = "SLA",
}

export enum EscalationAction {
  NOTIFY = "NOTIFY",
  REASSIGN = "REASSIGN",
  APPROVE = "APPROVE",
  CANCEL = "CANCEL",
  ESCALATE = "ESCALATE",
}

export enum CompensationStatus {
  PENDING = "PENDING",
  EXECUTED = "EXECUTED",
  FAILED = "FAILED",
  SKIPPED = "SKIPPED",
}

export enum AuditTrailAction {
  CREATED = "CREATED",
  STARTED = "STARTED",
  PAUSED = "PAUSED",
  RESUMED = "RESUMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  MODIFIED = "MODIFIED",
}

export enum WorkflowTemplateType {
  ONBOARDING = "ONBOARDING",
  APPROVAL = "APPROVAL",
  REVIEW = "REVIEW",
  ASSESSMENT = "ASSESSMENT",
  CERTIFICATION = "CERTIFICATION",
  GRADUATION = "GRADUATION",
  TRANSFER = "TRANSFER",
  COMPLIANCE = "COMPLIANCE",
  CUSTOM = "CUSTOM",
}

export enum StateMachineState {
  INITIAL = "INITIAL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
  FINAL = "FINAL",
}

// =============================================================================
// MODULE 1 — EduOS Core Runtime Interfaces
// =============================================================================

export interface RuntimeManager {
  id: string;
  school_id: string;
  status: RuntimeStatus;
  version: string;
  uptime_seconds: number;
  modules_loaded: number;
  services_healthy: number;
  services_total: number;
  last_health_check: string;
  created_at: string;
  updated_at: string;
}

export interface ModuleRegistry {
  id: string;
  school_id: string;
  name: string;
  version: string;
  type: ModuleType;
  status: ModuleStatus;
  description: string;
  dependencies: string[];
  config: Record<string, unknown>;
  loaded_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceRegistry {
  id: string;
  school_id: string;
  name: string;
  version: string;
  status: ServiceStatus;
  endpoint: string;
  health_url: string;
  metadata: Record<string, unknown>;
  registered_at: string;
  last_heartbeat: string;
}

export interface DynamicModuleLoader {
  id: string;
  school_id: string;
  module_id: string;
  load_order: number;
  status: ModuleStatus;
  error_message: string | null;
  loaded_at: string | null;
  created_at: string;
}

export interface PluginLoader {
  id: string;
  school_id: string;
  plugin_name: string;
  version: string;
  status: PluginStatus;
  config: Record<string, unknown>;
  dependencies: string[];
  error_message: string | null;
  installed_at: string;
  created_at: string;
}

export interface FeatureRegistry {
  id: string;
  school_id: string;
  feature_name: string;
  enabled: boolean;
  module_id: string;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface DependencyGraph {
  id: string;
  school_id: string;
  nodes: DependencyNode[];
  edges: DependencyEdge[];
  last_resolved: string;
  created_at: string;
}

export interface DependencyNode {
  id: string;
  name: string;
  version: string;
  type: string;
  status: DependencyStatus;
}

export interface DependencyEdge {
  source: string;
  target: string;
  relationship: string;
}

export interface BackgroundTask {
  id: string;
  school_id: string;
  name: string;
  task_type: string;
  status: TaskStatus;
  priority: TaskPriority;
  payload: Record<string, unknown>;
  result: Record<string, unknown> | null;
  error: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface Scheduler {
  id: string;
  school_id: string;
  name: string;
  cron_expression: string;
  task_type: string;
  payload: Record<string, unknown>;
  status: SchedulerStatus;
  last_run: string | null;
  next_run: string;
  created_at: string;
  updated_at: string;
}

export interface QueueManager {
  id: string;
  school_id: string;
  name: string;
  status: QueueStatus;
  message_count: number;
  consumer_count: number;
  throughput_per_second: number;
  created_at: string;
}

export interface JobRunner {
  id: string;
  school_id: string;
  job_type: JobType;
  status: JobStatus;
  payload: Record<string, unknown>;
  result: Record<string, unknown> | null;
  error: string | null;
  attempts: number;
  max_attempts: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface RuntimeConfig {
  id: string;
  school_id: string;
  config_key: string;
  config_value: Record<string, unknown>;
  environment: string;
  created_at: string;
  updated_at: string;
}

export interface TenantRuntime {
  id: string;
  tenant_id: string;
  school_id: string;
  status: TenantStatus;
  modules_enabled: string[];
  config: Record<string, unknown>;
  resource_limits: ResourceLimits;
  created_at: string;
  updated_at: string;
}

export interface ResourceLimits {
  max_cpu: number;
  max_memory_mb: number;
  max_storage_mb: number;
  max_api_calls_per_minute: number;
  max_concurrent_users: number;
}

export interface HealthManager {
  id: string;
  school_id: string;
  overall_status: HealthStatus;
  checks: HealthCheck[];
  last_checked: string;
  uptime_percentage: number;
  created_at: string;
}

export interface HealthCheck {
  service_name: string;
  status: HealthStatus;
  latency_ms: number;
  message: string;
  checked_at: string;
}

// =============================================================================
// MODULE 2 — Workflow Orchestration Engine Interfaces
// =============================================================================

export interface VisualWorkflowBuilder {
  id: string;
  school_id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: WorkflowStatus;
  version: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface WorkflowNode {
  id: string;
  type: WorkflowStepType;
  position_x: number;
  position_y: number;
  config: Record<string, unknown>;
  label: string;
}

export interface WorkflowEdge {
  source: string;
  target: string;
  condition: string | null;
  label: string;
}

export interface BPMNEngine {
  id: string;
  school_id: string;
  workflow_id: string;
  bpmn_xml: string;
  process_id: string;
  status: string;
  version: number;
  deployed_at: string;
  created_at: string;
}

export interface StateMachine {
  id: string;
  school_id: string;
  name: string;
  entity_type: string;
  states: StateDefinition[];
  transitions: StateTransition[];
  initial_state: string;
  current_state: string;
  created_at: string;
  updated_at: string;
}

export interface StateDefinition {
  name: string;
  type: string;
  is_initial: boolean;
  is_final: boolean;
  actions: string[];
}

export interface StateTransition {
  from: string;
  to: string;
  event: string;
  condition: string | null;
  actions: string[];
}

export interface WorkflowCondition {
  id: string;
  workflow_id: string;
  node_id: string;
  field: string;
  operator: ConditionOperator;
  value: string;
  created_at: string;
}

export interface WorkflowBranch {
  id: string;
  workflow_id: string;
  node_id: string;
  branches: BranchDefinition[];
  default_branch: string | null;
  created_at: string;
}

export interface BranchDefinition {
  id: string;
  name: string;
  condition: string;
  target_node_id: string;
}

export interface WorkflowLoop {
  id: string;
  workflow_id: string;
  node_id: string;
  iterator_field: string;
  max_iterations: number;
  break_condition: string | null;
  created_at: string;
}

export interface HumanApproval {
  id: string;
  workflow_id: string;
  instance_id: string;
  node_id: string;
  approver_id: string;
  status: ApprovalStatus;
  comments: string | null;
  decided_at: string | null;
  created_at: string;
}

export interface WorkflowSLA {
  id: string;
  workflow_id: string;
  node_id: string;
  duration_minutes: number;
  escalation_actions: EscalationAction[];
  created_at: string;
}

export interface WorkflowEscalation {
  id: string;
  sla_id: string;
  level: number;
  action: EscalationAction;
  target_role: string;
  timeout_minutes: number;
  created_at: string;
}

export interface WorkflowRetry {
  id: string;
  workflow_id: string;
  node_id: string;
  max_retries: number;
  retry_delay_seconds: number;
  retry_count: number;
  last_retry_at: string | null;
  created_at: string;
}

export interface WorkflowRollback {
  id: string;
  workflow_id: string;
  instance_id: string;
  target_node_id: string;
  reason: string;
  executed_at: string;
  created_at: string;
}

export interface WorkflowCompensation {
  id: string;
  workflow_id: string;
  node_id: string;
  compensation_action: string;
  status: CompensationStatus;
  executed_at: string | null;
  created_at: string;
}

export interface WorkflowTimer {
  id: string;
  workflow_id: string;
  node_id: string;
  timer_type: TimerType;
  duration_seconds: number | null;
  cron_expression: string | null;
  deadline: string | null;
  created_at: string;
}

export interface ScheduledWorkflow {
  id: string;
  school_id: string;
  workflow_id: string;
  schedule: string;
  payload: Record<string, unknown>;
  enabled: boolean;
  last_run: string | null;
  next_run: string;
  created_at: string;
}

export interface WorkflowTemplate {
  id: string;
  school_id: string;
  name: string;
  template_type: WorkflowTemplateType;
  description: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  variables: WorkflowVariable[];
  version: number;
  is_public: boolean;
  created_at: string;
}

export interface WorkflowVariable {
  name: string;
  type: string;
  default_value: unknown;
  required: boolean;
  description: string;
}

export interface WorkflowVersioning {
  id: string;
  workflow_id: string;
  version: number;
  changelog: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  created_by: string;
  created_at: string;
}

export interface WorkflowAuditTrail {
  id: string;
  workflow_id: string;
  instance_id: string;
  action: AuditTrailAction;
  node_id: string | null;
  user_id: string;
  details: Record<string, unknown>;
  timestamp: string;
}

export interface WorkflowInstance {
  id: string;
  workflow_id: string;
  school_id: string;
  status: string;
  current_node_id: string;
  variables: Record<string, unknown>;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

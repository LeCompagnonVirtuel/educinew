export enum DataMeshDomain {
  STUDENT = 'STUDENT',
  ACADEMIC = 'ACADEMIC',
  FINANCIAL = 'FINANCIAL',
  HR = 'HR',
  OPERATIONS = 'OPERATIONS',
  RESEARCH = 'RESEARCH',
  COMPLIANCE = 'COMPLIANCE',
  ANALYTICS = 'ANALYTICS',
}

export enum DataAssetType {
  TABLE = 'TABLE',
  VIEW = 'VIEW',
  FILE = 'FILE',
  STREAM = 'STREAM',
  API = 'API',
  MODEL = 'MODEL',
  DASHBOARD = 'DASHBOARD',
  REPORT = 'REPORT',
}

export enum MetadataType {
  TECHNICAL = 'TECHNICAL',
  BUSINESS = 'BUSINESS',
  OPERATIONAL = 'OPERATIONAL',
  GOVERNANCE = 'GOVERNANCE',
}

export enum DataClassification {
  PUBLIC = 'PUBLIC',
  INTERNAL = 'INTERNAL',
  CONFIDENTIAL = 'CONFIDENTIAL',
  RESTRICTED = 'RESTRICTED',
}

export enum DataQualityRule {
  COMPLETENESS = 'COMPLETENESS',
  ACCURACY = 'ACCURACY',
  CONSISTENCY = 'CONSISTENCY',
  TIMELINESS = 'TIMELINESS',
  UNIQUENESS = 'UNIQUENESS',
  VALIDITY = 'VALIDITY',
}

export enum ETLStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum StreamStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  ERROR = 'ERROR',
  COMPLETED = 'COMPLETED',
}

export enum WarehouseStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  UPGRADING = 'UPGRADING',
}

export enum DataLineageDirection {
  UPSTREAM = 'UPSTREAM',
  DOWNSTREAM = 'DOWNSTREAM',
  BIDIRECTIONAL = 'BIDIRECTIONAL',
}

export enum DataGovernanceStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

export enum AutomationStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DISABLED = 'DISABLED',
  ERROR = 'ERROR',
  DRAFT = 'DRAFT',
}

export enum TriggerType {
  EVENT = 'EVENT',
  SCHEDULE = 'SCHEDULE',
  WEBHOOK = 'WEBHOOK',
  MANUAL = 'MANUAL',
  DATA_CHANGE = 'DATA_CHANGE',
  THRESHOLD = 'THRESHOLD',
}

export enum RuleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT',
  TESTING = 'TESTING',
}

export enum AutomationAction {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WEBHOOK = 'WEBHOOK',
  DATABASE_UPDATE = 'DATABASE_UPDATE',
  API_CALL = 'API_CALL',
  NOTIFICATION = 'NOTIFICATION',
  FILE_GENERATE = 'FILE_GENERATE',
  WORKFLOW_TRIGGER = 'WORKFLOW_TRIGGER',
}

export enum BatchJobStatus {
  QUEUED = 'QUEUED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  PARTIAL = 'PARTIAL',
}

export enum LowCodeNodeType {
  TRIGGER = 'TRIGGER',
  ACTION = 'ACTION',
  CONDITION = 'CONDITION',
  TRANSFORM = 'TRANSFORM',
  LOOP = 'LOOP',
  AGGREGATE = 'AGGREGATE',
  MERGE = 'MERGE',
  SPLIT = 'SPLIT',
  FILTER = 'FILTER',
  LOOKUP = 'LOOKUP',
  DELAY = 'DELAY',
  ERROR_HANDLER = 'ERROR_HANDLER',
}

export enum NoCodeTriggerType {
  FORM_SUBMIT = 'FORM_SUBMIT',
  BUTTON_CLICK = 'BUTTON_CLICK',
  SCHEDULE = 'SCHEDULE',
  FILE_UPLOAD = 'FILE_UPLOAD',
  DATA_CHANGE = 'DATA_CHANGE',
  API_CALL = 'API_CALL',
  EMAIL_RECEIVED = 'EMAIL_RECEIVED',
}

export enum IntegrationEventType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  STATUS_CHANGE = 'STATUS_CHANGE',
  APPROVAL = 'APPROVAL',
  PAYMENT = 'PAYMENT',
  ENROLLMENT = 'ENROLLMENT',
  GRADUATION = 'GRADUATION',
}

export enum AutomationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum ExecutionMode {
  SYNCHRONOUS = 'SYNCHRONOUS',
  ASYNCHRONOUS = 'ASYNCHRONOUS',
  BATCH = 'BATCH',
  STREAMING = 'STREAMING',
}

export interface DataMesh {
  id: string;
  school_id: string;
  domain: DataMeshDomain;
  name: string;
  description: string;
  owner: string;
  data_products: DataProduct[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DataProduct {
  id: string;
  mesh_id: string;
  name: string;
  description: string;
  domain: DataMeshDomain;
  asset_type: DataAssetType;
  schema: Record<string, unknown>;
  quality_rules: DataQualityRule[];
  owner: string;
  status: string;
  created_at: string;
}

export interface DataCatalog {
  id: string;
  school_id: string;
  assets: CatalogAsset[];
  total_assets: number;
  last_scanned: string;
  created_at: string;
}

export interface CatalogAsset {
  id: string;
  name: string;
  description: string;
  asset_type: DataAssetType;
  domain: string;
  owner: string;
  classification: DataClassification;
  quality_score: number;
  usage_count: number;
  tags: string[];
  created_at: string;
}

export interface MetadataRecord {
  id: string;
  asset_id: string;
  metadata_type: MetadataType;
  key: string;
  value: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface MasterData {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  attributes: Record<string, unknown>;
  golden_record: boolean;
  version: number;
  source_systems: string[];
  created_at: string;
  updated_at: string;
}

export interface DataLineage {
  id: string;
  school_id: string;
  source_asset: string;
  target_asset: string;
  transformation: string;
  direction: DataLineageDirection;
  pipeline_id: string | null;
  created_at: string;
}

export interface DataGovernance {
  id: string;
  school_id: string;
  policy_name: string;
  description: string;
  domain: string;
  rules: DataGovernanceRule[];
  status: DataGovernanceStatus;
  created_at: string;
  updated_at: string;
}

export interface DataGovernanceRule {
  id: string;
  rule_name: string;
  rule_type: string;
  condition: string;
  action: string;
  severity: string;
}

export interface ETLPipeline {
  id: string;
  school_id: string;
  name: string;
  source_type: string;
  source_config: Record<string, unknown>;
  target_type: string;
  target_config: Record<string, unknown>;
  transformations: ETLTransformation[];
  schedule: string | null;
  status: ETLStatus;
  last_run: string | null;
  created_at: string;
  updated_at: string;
}

export interface ETLTransformation {
  id: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  order: number;
}

export interface ELTConfiguration {
  id: string;
  pipeline_id: string;
  extraction_config: Record<string, unknown>;
  loading_config: Record<string, unknown>;
  transformation_sql: string;
  created_at: string;
}

export interface DataStream {
  id: string;
  school_id: string;
  name: string;
  topic: string;
  format: string;
  retention_hours: number;
  consumer_count: number;
  throughput_per_second: number;
  status: StreamStatus;
  created_at: string;
}

export interface DataLakehouse {
  id: string;
  school_id: string;
  name: string;
  storage_gb: number;
  tables_count: number;
  last_optimized: string;
  created_at: string;
}

export interface DataWarehouse {
  id: string;
  school_id: string;
  name: string;
  provider: string;
  storage_tb: number;
  queries_per_day: number;
  avg_query_ms: number;
  status: WarehouseStatus;
  created_at: string;
}

export interface DataQualityReport {
  id: string;
  school_id: string;
  asset_id: string;
  overall_score: number;
  completeness: number;
  accuracy: number;
  consistency: number;
  timeliness: number;
  uniqueness: number;
  validity: number;
  issues: DataQualityIssue[];
  generated_at: string;
}

export interface DataQualityIssue {
  rule: string;
  severity: string;
  affected_records: number;
  description: string;
  recommendation: string;
}

export interface DataMigrationJob {
  id: string;
  school_id: string;
  name: string;
  source_system: string;
  target_system: string;
  record_count: number;
  migrated: number;
  failed: number;
  status: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface AutomationBuilder {
  id: string;
  school_id: string;
  name: string;
  description: string;
  nodes: AutomationNode[];
  edges: AutomationEdge[];
  status: AutomationStatus;
  priority: AutomationPriority;
  trigger_type: TriggerType;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface AutomationNode {
  id: string;
  type: LowCodeNodeType;
  position_x: number;
  position_y: number;
  config: Record<string, unknown>;
  label: string;
}

export interface AutomationEdge {
  source: string;
  target: string;
  condition: string | null;
  label: string;
}

export interface EventTrigger {
  id: string;
  school_id: string;
  name: string;
  event_type: IntegrationEventType;
  source: string;
  conditions: TriggerCondition[];
  actions: AutomationAction[];
  enabled: boolean;
  created_at: string;
}

export interface TriggerCondition {
  field: string;
  operator: string;
  value: string;
}

export interface BusinessRule {
  id: string;
  school_id: string;
  name: string;
  description: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority: number;
  status: RuleStatus;
  created_at: string;
  updated_at: string;
}

export interface RuleCondition {
  field: string;
  operator: string;
  value: string;
  logic_gate: string | null;
}

export interface RuleAction {
  action_type: AutomationAction;
  config: Record<string, unknown>;
  order: number;
}

export interface CronJob {
  id: string;
  school_id: string;
  name: string;
  cron_expression: string;
  command: string;
  payload: Record<string, unknown>;
  enabled: boolean;
  last_run: string | null;
  next_run: string;
  created_at: string;
}

export interface AutomationNotification {
  id: string;
  school_id: string;
  name: string;
  trigger_event: string;
  channels: string[];
  template: string;
  recipients: string[];
  enabled: boolean;
  created_at: string;
}

export interface BatchProcessingJob {
  id: string;
  school_id: string;
  name: string;
  job_type: string;
  payload: Record<string, unknown>;
  batch_size: number;
  total_records: number;
  processed: number;
  failed: number;
  status: BatchJobStatus;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface LowCodeWorkflow {
  id: string;
  school_id: string;
  name: string;
  description: string;
  nodes: AutomationNode[];
  edges: AutomationEdge[];
  status: AutomationStatus;
  version: number;
  created_by: string;
  created_at: string;
}

export interface NoCodeWorkflow {
  id: string;
  school_id: string;
  name: string;
  trigger_type: NoCodeTriggerType;
  trigger_config: Record<string, unknown>;
  actions: NoCodeAction[];
  status: AutomationStatus;
  created_by: string;
  created_at: string;
}

export interface NoCodeAction {
  action_type: string;
  config: Record<string, unknown>;
  order: number;
}

export interface AutomationAnalytics {
  id: string;
  school_id: string;
  period: string;
  total_automations: number;
  active_automations: number;
  executions_total: number;
  executions_success: number;
  executions_failed: number;
  avg_execution_ms: number;
  time_saved_hours: number;
  generated_at: string;
}

export interface AutomationExecution {
  id: string;
  automation_id: string;
  trigger_type: TriggerType;
  trigger_data: Record<string, unknown>;
  status: string;
  started_at: string;
  completed_at: string | null;
  duration_ms: number;
  result: Record<string, unknown> | null;
  error: string | null;
}

export interface AutomationTemplate {
  id: string;
  school_id: string;
  name: string;
  description: string;
  category: string;
  nodes: AutomationNode[];
  edges: AutomationEdge[];
  variables: AutomationVariable[];
  usage_count: number;
  created_at: string;
}

export interface AutomationVariable {
  name: string;
  type: string;
  default_value: unknown;
  required: boolean;
  description: string;
}

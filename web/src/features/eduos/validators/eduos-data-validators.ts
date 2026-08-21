import { z } from 'zod';

const schoolId = z.string().uuid();

// ── Enums ────────

export const dataMeshDomainEnum = z.enum([
  'STUDENT', 'ACADEMIC', 'FINANCIAL', 'HR',
  'OPERATIONS', 'RESEARCH', 'COMPLIANCE', 'ANALYTICS',
]);

export const dataAssetTypeEnum = z.enum([
  'TABLE', 'VIEW', 'FILE', 'STREAM', 'API', 'MODEL', 'DASHBOARD', 'REPORT',
]);

export const metadataTypeEnum = z.enum([
  'TECHNICAL', 'BUSINESS', 'OPERATIONAL', 'GOVERNANCE',
]);

export const dataClassificationEnum = z.enum([
  'PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED',
]);

export const dataQualityRuleEnum = z.enum([
  'COMPLETENESS', 'ACCURACY', 'CONSISTENCY', 'TIMELINESS', 'UNIQUENESS', 'VALIDITY',
]);

export const etlStatusEnum = z.enum([
  'PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED',
]);

export const streamStatusEnum = z.enum(['ACTIVE', 'PAUSED', 'ERROR', 'COMPLETED']);

export const warehouseStatusEnum = z.enum(['ACTIVE', 'MAINTENANCE', 'UPGRADING']);

export const dataLineageDirectionEnum = z.enum(['UPSTREAM', 'DOWNSTREAM', 'BIDIRECTIONAL']);

export const dataGovernanceStatusEnum = z.enum(['APPROVED', 'PENDING', 'REJECTED', 'UNDER_REVIEW']);

export const automationStatusEnum = z.enum(['ACTIVE', 'PAUSED', 'DISABLED', 'ERROR', 'DRAFT']);

export const triggerTypeEnum = z.enum([
  'EVENT', 'SCHEDULE', 'WEBHOOK', 'MANUAL', 'DATA_CHANGE', 'THRESHOLD',
]);

export const ruleStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'DRAFT', 'TESTING']);

export const automationActionEnum = z.enum([
  'EMAIL', 'SMS', 'WEBHOOK', 'DATABASE_UPDATE', 'API_CALL',
  'NOTIFICATION', 'FILE_GENERATE', 'WORKFLOW_TRIGGER',
]);

export const batchJobStatusEnum = z.enum(['QUEUED', 'RUNNING', 'COMPLETED', 'FAILED', 'PARTIAL']);

export const lowCodeNodeTypeEnum = z.enum([
  'TRIGGER', 'ACTION', 'CONDITION', 'TRANSFORM', 'LOOP', 'AGGREGATE',
  'MERGE', 'SPLIT', 'FILTER', 'LOOKUP', 'DELAY', 'ERROR_HANDLER',
]);

export const noCodeTriggerTypeEnum = z.enum([
  'FORM_SUBMIT', 'BUTTON_CLICK', 'SCHEDULE', 'FILE_UPLOAD',
  'DATA_CHANGE', 'API_CALL', 'EMAIL_RECEIVED',
]);

export const integrationEventTypeEnum = z.enum([
  'CREATE', 'UPDATE', 'DELETE', 'STATUS_CHANGE',
  'APPROVAL', 'PAYMENT', 'ENROLLMENT', 'GRADUATION',
]);

export const automationPriorityEnum = z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']);

export const executionModeEnum = z.enum(['SYNCHRONOUS', 'ASYNCHRONOUS', 'BATCH', 'STREAMING']);

// ── Data Mesh & Catalog ────────

export const dataMeshCreateSchema = z.object({
  school_id: schoolId,
  domain: dataMeshDomainEnum,
  name: z.string(),
  description: z.string(),
  owner: z.string(),
  data_products: z.array(z.unknown()),
  status: z.string(),
});

export const dataMeshUpdateSchema = z.object({
  school_id: schoolId.optional(),
  domain: dataMeshDomainEnum.optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  owner: z.string().optional(),
  data_products: z.array(z.unknown()).optional(),
  status: z.string().optional(),
});

export const dataProductCreateSchema = z.object({
  mesh_id: z.string(),
  name: z.string(),
  description: z.string(),
  domain: dataMeshDomainEnum,
  asset_type: dataAssetTypeEnum,
  schema: z.record(z.unknown()),
  quality_rules: z.array(dataQualityRuleEnum),
  owner: z.string(),
  status: z.string(),
});

export const dataProductUpdateSchema = z.object({
  mesh_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  domain: dataMeshDomainEnum.optional(),
  asset_type: dataAssetTypeEnum.optional(),
  schema: z.record(z.unknown()).optional(),
  quality_rules: z.array(dataQualityRuleEnum).optional(),
  owner: z.string().optional(),
  status: z.string().optional(),
});

export const dataCatalogCreateSchema = z.object({
  school_id: schoolId,
  assets: z.array(z.unknown()),
  total_assets: z.number(),
  last_scanned: z.string(),
});

export const dataCatalogUpdateSchema = z.object({
  school_id: schoolId.optional(),
  assets: z.array(z.unknown()).optional(),
  total_assets: z.number().optional(),
  last_scanned: z.string().optional(),
});

export const catalogAssetCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
  asset_type: dataAssetTypeEnum,
  domain: z.string(),
  owner: z.string(),
  classification: dataClassificationEnum,
  quality_score: z.number(),
  usage_count: z.number(),
  tags: z.array(z.string()),
});

export const catalogAssetUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  asset_type: dataAssetTypeEnum.optional(),
  domain: z.string().optional(),
  owner: z.string().optional(),
  classification: dataClassificationEnum.optional(),
  quality_score: z.number().optional(),
  usage_count: z.number().optional(),
  tags: z.array(z.string()).optional(),
});

// ── Metadata & Master Data ────────

export const metadataRecordCreateSchema = z.object({
  asset_id: z.string(),
  metadata_type: metadataTypeEnum,
  key: z.string(),
  value: z.string(),
  source: z.string(),
});

export const metadataRecordUpdateSchema = z.object({
  asset_id: z.string().optional(),
  metadata_type: metadataTypeEnum.optional(),
  key: z.string().optional(),
  value: z.string().optional(),
  source: z.string().optional(),
});

export const masterDataCreateSchema = z.object({
  school_id: schoolId,
  entity_type: z.string(),
  entity_id: z.string(),
  attributes: z.record(z.unknown()),
  golden_record: z.boolean(),
  version: z.number(),
  source_systems: z.array(z.string()),
});

export const masterDataUpdateSchema = z.object({
  school_id: schoolId.optional(),
  entity_type: z.string().optional(),
  entity_id: z.string().optional(),
  attributes: z.record(z.unknown()).optional(),
  golden_record: z.boolean().optional(),
  version: z.number().optional(),
  source_systems: z.array(z.string()).optional(),
});

// ── Data Lineage & Governance ────────

export const dataLineageCreateSchema = z.object({
  school_id: schoolId,
  source_asset: z.string(),
  target_asset: z.string(),
  transformation: z.string(),
  direction: dataLineageDirectionEnum,
  pipeline_id: z.string().nullable(),
});

export const dataLineageUpdateSchema = z.object({
  school_id: schoolId.optional(),
  source_asset: z.string().optional(),
  target_asset: z.string().optional(),
  transformation: z.string().optional(),
  direction: dataLineageDirectionEnum.optional(),
  pipeline_id: z.string().nullable().optional(),
});

export const dataGovernanceCreateSchema = z.object({
  school_id: schoolId,
  policy_name: z.string(),
  description: z.string(),
  domain: z.string(),
  rules: z.array(z.unknown()),
  status: dataGovernanceStatusEnum,
});

export const dataGovernanceUpdateSchema = z.object({
  school_id: schoolId.optional(),
  policy_name: z.string().optional(),
  description: z.string().optional(),
  domain: z.string().optional(),
  rules: z.array(z.unknown()).optional(),
  status: dataGovernanceStatusEnum.optional(),
});

export const dataGovernanceRuleCreateSchema = z.object({
  rule_name: z.string(),
  rule_type: z.string(),
  condition: z.string(),
  action: z.string(),
  severity: z.string(),
});

export const dataGovernanceRuleUpdateSchema = z.object({
  rule_name: z.string().optional(),
  rule_type: z.string().optional(),
  condition: z.string().optional(),
  action: z.string().optional(),
  severity: z.string().optional(),
});

// ── ETL/ELT ────────

export const etlPipelineCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  source_type: z.string(),
  source_config: z.record(z.unknown()),
  target_type: z.string(),
  target_config: z.record(z.unknown()),
  transformations: z.array(z.unknown()),
  schedule: z.string().nullable(),
  status: etlStatusEnum,
  last_run: z.string().nullable(),
});

export const etlPipelineUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  source_type: z.string().optional(),
  source_config: z.record(z.unknown()).optional(),
  target_type: z.string().optional(),
  target_config: z.record(z.unknown()).optional(),
  transformations: z.array(z.unknown()).optional(),
  schedule: z.string().nullable().optional(),
  status: etlStatusEnum.optional(),
  last_run: z.string().nullable().optional(),
});

export const etlTransformationCreateSchema = z.object({
  name: z.string(),
  type: z.string(),
  config: z.record(z.unknown()),
  order: z.number(),
});

export const etlTransformationUpdateSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  config: z.record(z.unknown()).optional(),
  order: z.number().optional(),
});

export const eltConfigurationCreateSchema = z.object({
  pipeline_id: z.string(),
  extraction_config: z.record(z.unknown()),
  loading_config: z.record(z.unknown()),
  transformation_sql: z.string(),
});

export const eltConfigurationUpdateSchema = z.object({
  pipeline_id: z.string().optional(),
  extraction_config: z.record(z.unknown()).optional(),
  loading_config: z.record(z.unknown()).optional(),
  transformation_sql: z.string().optional(),
});

// ── Data Streams & Storage ────────

export const dataStreamCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  topic: z.string(),
  format: z.string(),
  retention_hours: z.number(),
  consumer_count: z.number(),
  throughput_per_second: z.number(),
  status: streamStatusEnum,
});

export const dataStreamUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  topic: z.string().optional(),
  format: z.string().optional(),
  retention_hours: z.number().optional(),
  consumer_count: z.number().optional(),
  throughput_per_second: z.number().optional(),
  status: streamStatusEnum.optional(),
});

export const dataLakehouseCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  storage_gb: z.number(),
  tables_count: z.number(),
  last_optimized: z.string(),
});

export const dataLakehouseUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  storage_gb: z.number().optional(),
  tables_count: z.number().optional(),
  last_optimized: z.string().optional(),
});

export const dataWarehouseCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  provider: z.string(),
  storage_tb: z.number(),
  queries_per_day: z.number(),
  avg_query_ms: z.number(),
  status: warehouseStatusEnum,
});

export const dataWarehouseUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  provider: z.string().optional(),
  storage_tb: z.number().optional(),
  queries_per_day: z.number().optional(),
  avg_query_ms: z.number().optional(),
  status: warehouseStatusEnum.optional(),
});

// ── Data Quality ────────

export const dataQualityReportCreateSchema = z.object({
  school_id: schoolId,
  asset_id: z.string(),
  overall_score: z.number(),
  completeness: z.number(),
  accuracy: z.number(),
  consistency: z.number(),
  timeliness: z.number(),
  uniqueness: z.number(),
  validity: z.number(),
  issues: z.array(z.unknown()),
  generated_at: z.string(),
});

export const dataQualityReportUpdateSchema = z.object({
  school_id: schoolId.optional(),
  asset_id: z.string().optional(),
  overall_score: z.number().optional(),
  completeness: z.number().optional(),
  accuracy: z.number().optional(),
  consistency: z.number().optional(),
  timeliness: z.number().optional(),
  uniqueness: z.number().optional(),
  validity: z.number().optional(),
  issues: z.array(z.unknown()).optional(),
  generated_at: z.string().optional(),
});

export const dataQualityIssueCreateSchema = z.object({
  rule: z.string(),
  severity: z.string(),
  affected_records: z.number(),
  description: z.string(),
  recommendation: z.string(),
});

export const dataQualityIssueUpdateSchema = z.object({
  rule: z.string().optional(),
  severity: z.string().optional(),
  affected_records: z.number().optional(),
  description: z.string().optional(),
  recommendation: z.string().optional(),
});

// ── Data Migration ────────

export const dataMigrationJobCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  source_system: z.string(),
  target_system: z.string(),
  record_count: z.number(),
  migrated: z.number(),
  failed: z.number(),
  status: z.string(),
  started_at: z.string().nullable(),
  completed_at: z.string().nullable(),
});

export const dataMigrationJobUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  source_system: z.string().optional(),
  target_system: z.string().optional(),
  record_count: z.number().optional(),
  migrated: z.number().optional(),
  failed: z.number().optional(),
  status: z.string().optional(),
  started_at: z.string().nullable().optional(),
  completed_at: z.string().nullable().optional(),
});

// ── Automation Builder ────────

export const automationBuilderCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  description: z.string(),
  nodes: z.array(z.unknown()),
  edges: z.array(z.unknown()),
  status: automationStatusEnum,
  priority: automationPriorityEnum,
  trigger_type: triggerTypeEnum,
  created_by: z.string(),
});

export const automationBuilderUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  nodes: z.array(z.unknown()).optional(),
  edges: z.array(z.unknown()).optional(),
  status: automationStatusEnum.optional(),
  priority: automationPriorityEnum.optional(),
  trigger_type: triggerTypeEnum.optional(),
  created_by: z.string().optional(),
});

export const automationNodeCreateSchema = z.object({
  type: lowCodeNodeTypeEnum,
  position_x: z.number(),
  position_y: z.number(),
  config: z.record(z.unknown()),
  label: z.string(),
});

export const automationNodeUpdateSchema = z.object({
  type: lowCodeNodeTypeEnum.optional(),
  position_x: z.number().optional(),
  position_y: z.number().optional(),
  config: z.record(z.unknown()).optional(),
  label: z.string().optional(),
});

export const automationEdgeCreateSchema = z.object({
  source: z.string(),
  target: z.string(),
  condition: z.string().nullable(),
  label: z.string(),
});

export const automationEdgeUpdateSchema = z.object({
  source: z.string().optional(),
  target: z.string().optional(),
  condition: z.string().nullable().optional(),
  label: z.string().optional(),
});

// ── Event Triggers ────────

export const eventTriggerCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  event_type: integrationEventTypeEnum,
  source: z.string(),
  conditions: z.array(z.unknown()),
  actions: z.array(automationActionEnum),
  enabled: z.boolean(),
});

export const eventTriggerUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  event_type: integrationEventTypeEnum.optional(),
  source: z.string().optional(),
  conditions: z.array(z.unknown()).optional(),
  actions: z.array(automationActionEnum).optional(),
  enabled: z.boolean().optional(),
});

export const triggerConditionCreateSchema = z.object({
  field: z.string(),
  operator: z.string(),
  value: z.string(),
});

export const triggerConditionUpdateSchema = z.object({
  field: z.string().optional(),
  operator: z.string().optional(),
  value: z.string().optional(),
});

// ── Business Rules ────────

export const businessRuleCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  description: z.string(),
  conditions: z.array(z.unknown()),
  actions: z.array(z.unknown()),
  priority: z.number(),
  status: ruleStatusEnum,
});

export const businessRuleUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  conditions: z.array(z.unknown()).optional(),
  actions: z.array(z.unknown()).optional(),
  priority: z.number().optional(),
  status: ruleStatusEnum.optional(),
});

export const ruleConditionCreateSchema = z.object({
  field: z.string(),
  operator: z.string(),
  value: z.string(),
  logic_gate: z.string().nullable(),
});

export const ruleConditionUpdateSchema = z.object({
  field: z.string().optional(),
  operator: z.string().optional(),
  value: z.string().optional(),
  logic_gate: z.string().nullable().optional(),
});

export const ruleActionCreateSchema = z.object({
  action_type: automationActionEnum,
  config: z.record(z.unknown()),
  order: z.number(),
});

export const ruleActionUpdateSchema = z.object({
  action_type: automationActionEnum.optional(),
  config: z.record(z.unknown()).optional(),
  order: z.number().optional(),
});

// ── Scheduling & Notifications ────────

export const cronJobCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  cron_expression: z.string(),
  command: z.string(),
  payload: z.record(z.unknown()),
  enabled: z.boolean(),
  last_run: z.string().nullable(),
  next_run: z.string(),
});

export const cronJobUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  cron_expression: z.string().optional(),
  command: z.string().optional(),
  payload: z.record(z.unknown()).optional(),
  enabled: z.boolean().optional(),
  last_run: z.string().nullable().optional(),
  next_run: z.string().optional(),
});

export const automationNotificationCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  trigger_event: z.string(),
  channels: z.array(z.string()),
  template: z.string(),
  recipients: z.array(z.string()),
  enabled: z.boolean(),
});

export const automationNotificationUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  trigger_event: z.string().optional(),
  channels: z.array(z.string()).optional(),
  template: z.string().optional(),
  recipients: z.array(z.string()).optional(),
  enabled: z.boolean().optional(),
});

// ── Batch Processing ────────

export const batchProcessingJobCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  job_type: z.string(),
  payload: z.record(z.unknown()),
  batch_size: z.number(),
  total_records: z.number(),
  processed: z.number(),
  failed: z.number(),
  status: batchJobStatusEnum,
  started_at: z.string().nullable(),
  completed_at: z.string().nullable(),
});

export const batchProcessingJobUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  job_type: z.string().optional(),
  payload: z.record(z.unknown()).optional(),
  batch_size: z.number().optional(),
  total_records: z.number().optional(),
  processed: z.number().optional(),
  failed: z.number().optional(),
  status: batchJobStatusEnum.optional(),
  started_at: z.string().nullable().optional(),
  completed_at: z.string().nullable().optional(),
});

// ── Workflows ────────

export const lowCodeWorkflowCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  description: z.string(),
  nodes: z.array(z.unknown()),
  edges: z.array(z.unknown()),
  status: automationStatusEnum,
  version: z.number(),
  created_by: z.string(),
});

export const lowCodeWorkflowUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  nodes: z.array(z.unknown()).optional(),
  edges: z.array(z.unknown()).optional(),
  status: automationStatusEnum.optional(),
  version: z.number().optional(),
  created_by: z.string().optional(),
});

export const noCodeWorkflowCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  trigger_type: noCodeTriggerTypeEnum,
  trigger_config: z.record(z.unknown()),
  actions: z.array(z.unknown()),
  status: automationStatusEnum,
  created_by: z.string(),
});

export const noCodeWorkflowUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  trigger_type: noCodeTriggerTypeEnum.optional(),
  trigger_config: z.record(z.unknown()).optional(),
  actions: z.array(z.unknown()).optional(),
  status: automationStatusEnum.optional(),
  created_by: z.string().optional(),
});

export const noCodeActionCreateSchema = z.object({
  action_type: z.string(),
  config: z.record(z.unknown()),
  order: z.number(),
});

export const noCodeActionUpdateSchema = z.object({
  action_type: z.string().optional(),
  config: z.record(z.unknown()).optional(),
  order: z.number().optional(),
});

// ── Automation Analytics ────────

export const automationAnalyticsCreateSchema = z.object({
  school_id: schoolId,
  period: z.string(),
  total_automations: z.number(),
  active_automations: z.number(),
  executions_total: z.number(),
  executions_success: z.number(),
  executions_failed: z.number(),
  avg_execution_ms: z.number(),
  time_saved_hours: z.number(),
  generated_at: z.string(),
});

export const automationAnalyticsUpdateSchema = z.object({
  school_id: schoolId.optional(),
  period: z.string().optional(),
  total_automations: z.number().optional(),
  active_automations: z.number().optional(),
  executions_total: z.number().optional(),
  executions_success: z.number().optional(),
  executions_failed: z.number().optional(),
  avg_execution_ms: z.number().optional(),
  time_saved_hours: z.number().optional(),
  generated_at: z.string().optional(),
});

export const automationExecutionCreateSchema = z.object({
  automation_id: z.string(),
  trigger_type: triggerTypeEnum,
  trigger_data: z.record(z.unknown()),
  status: z.string(),
  started_at: z.string(),
  completed_at: z.string().nullable(),
  duration_ms: z.number(),
  result: z.record(z.unknown()).nullable(),
  error: z.string().nullable(),
});

export const automationExecutionUpdateSchema = z.object({
  automation_id: z.string().optional(),
  trigger_type: triggerTypeEnum.optional(),
  trigger_data: z.record(z.unknown()).optional(),
  status: z.string().optional(),
  started_at: z.string().optional(),
  completed_at: z.string().nullable().optional(),
  duration_ms: z.number().optional(),
  result: z.record(z.unknown()).nullable().optional(),
  error: z.string().nullable().optional(),
});

// ── Templates ────────

export const automationTemplateCreateSchema = z.object({
  school_id: schoolId,
  name: z.string(),
  description: z.string(),
  category: z.string(),
  nodes: z.array(z.unknown()),
  edges: z.array(z.unknown()),
  variables: z.array(z.unknown()),
  usage_count: z.number(),
});

export const automationTemplateUpdateSchema = z.object({
  school_id: schoolId.optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  nodes: z.array(z.unknown()).optional(),
  edges: z.array(z.unknown()).optional(),
  variables: z.array(z.unknown()).optional(),
  usage_count: z.number().optional(),
});

export const automationVariableCreateSchema = z.object({
  name: z.string(),
  type: z.string(),
  default_value: z.unknown(),
  required: z.boolean(),
  description: z.string(),
});

export const automationVariableUpdateSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  default_value: z.unknown().optional(),
  required: z.boolean().optional(),
  description: z.string().optional(),
});

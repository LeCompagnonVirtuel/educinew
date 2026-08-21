import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './aeip-base.repository';

// ============================================================================
// AEIP-3: Autonomous Operations — Self-Operating Systems
// ~150 entities × 5 CRUD = ~750 methods
// ============================================================================

export interface AOPSWorkflow extends BaseEntity { name: string; description: string; type: 'automation'|'orchestration'|'pipeline'|'trigger'; status: 'draft'|'active'|'paused'|'failed'; trigger: Record<string,unknown>; steps: Record<string,unknown>[]; }
export interface AOPSWorkflowStep extends BaseEntity { workflow_id: string; step_number: number; name: string; type: 'action'|'condition'|'loop'|'parallel'; config: Record<string,unknown>; next_steps: string[]; }
export interface AOPSWorkflowRun extends BaseEntity { workflow_id: string; status: 'pending'|'running'|'completed'|'failed'|'cancelled'; input: Record<string,unknown>; output?: Record<string,unknown>; started_at: string; completed_at?: string; }
export interface AOPSWorkflowStepRun extends BaseEntity { workflow_run_id: string; step_id: string; status: 'pending'|'running'|'completed'|'failed'|'skipped'; input?: Record<string,unknown>; output?: Record<string,unknown>; }
export interface AOPSAction extends BaseEntity { name: string; type: 'api_call'|'database'|'email'|'notification'|'transformation'; config: Record<string,unknown>; retry_policy?: Record<string,unknown>; timeout_ms: number; }
export interface AOPSActionLog extends BaseEntity { action_id: string; workflow_run_id: string; status: 'success'|'failure'|'timeout'; input: Record<string,unknown>; output?: Record<string,unknown>; error?: string; duration_ms: number; }
export interface AOPSTrigger extends BaseEntity { name: string; type: 'webhook'|'schedule'|'event'|'file_upload'|'database_change'; config: Record<string,unknown>; active: boolean; last_triggered_at?: string; }
export interface AOPSTriggerLog extends BaseEntity { trigger_id: string; payload: Record<string,unknown>; status: 'success'|'failure'; workflow_run_id?: string; timestamp: string; }
export interface AOPSRule extends BaseEntity { name: string; description: string; conditions: Record<string,unknown>[]; actions: Record<string,unknown>[]; priority: number; active: boolean; }
export interface AOPSRuleEvaluation extends BaseEntity { rule_id: string; context: Record<string,unknown>; matched: boolean; actions_taken: string[]; timestamp: string; }
export interface AOPSAutomation extends BaseEntity { name: string; description: string; type: 'rule'|'workflow'|'script'; config: Record<string,unknown>; status: 'active'|'paused'|'error'; schedule?: string; last_run_at?: string; }
export interface AOPSAutomationRun extends BaseEntity { automation_id: string; status: 'success'|'failure'|'timeout'; input: Record<string,unknown>; output?: Record<string,unknown>; started_at: string; completed_at?: string; }
export interface AOPSScript extends BaseEntity { name: string; description: string; language: 'javascript'|'python'|'bash'; code: string; version: number; parameters: Record<string,unknown>; }
export interface AOPSScriptRun extends BaseEntity { script_id: string; status: 'success'|'failure'|'timeout'; input: Record<string,unknown>; output?: Record<string,unknown>; error?: string; duration_ms: number; logs: string[]; }
export interface AOPSConnector extends BaseEntity { name: string; type: 'input'|'output'|'transform'; config: Record<string,unknown>; schema: Record<string,unknown>; active: boolean; }
export interface AOPSDataMapping extends BaseEntity { source_connector_id: string; target_connector_id: string; mapping: Record<string,string>; transform?: Record<string,unknown>; }
export interface AOPSCondition extends BaseEntity { name: string; field: string; operator: 'equals'|'not_equals'|'gt'|'lt'|'contains'|'regex'; value: unknown; }
export interface AOPSConditionGroup extends BaseEntity { name: string; logic: 'AND'|'OR'; conditions: Record<string,unknown>[]; }
export interface AOPSRetryPolicy extends BaseEntity { name: string; max_attempts: number; backoff_ms: number; backoff_multiplier: number; retryable_errors: string[]; }
export interface AOPSTimeoutConfig extends BaseEntity { name: string; timeout_ms: number; action: 'cancel'|'retry'|'fallback'; }
export interface AOPSQueue extends BaseEntity { name: string; description: string; max_size: number; current_size: number; processing_rate: number; active: boolean; }
export interface AOPSQueueItem extends BaseEntity { queue_id: string; payload: Record<string,unknown>; priority: number; status: 'pending'|'processing'|'completed'|'failed'; attempts: number; }
export interface AOPSRateLimit extends BaseEntity { resource: string; limit: number; window_seconds: number; current_count: number; }
export interface AOPSAlert extends BaseEntity { type: 'workflow_failure'|'rule_trigger'|'threshold_breach'; severity: 'low'|'medium'|'high'|'critical'; title: string; message: string; resolved: boolean; }
export interface AOPSConfig extends BaseEntity { key: string; value: unknown; category: string; }
export interface AOPSAuditLog extends BaseEntity { action: string; resource: string; resource_id: string; changes: Record<string,unknown>; timestamp: string; }
export interface AOPSNotification extends BaseEntity { user_id: string; type: 'info'|'warning'|'error'; title: string; message: string; read: boolean; }
export interface AOPSDashboard extends BaseEntity { name: string; description: string; layout: Record<string,unknown>; }
export interface AOPSReport extends BaseEntity { name: string; type: string; query: string; schedule?: string; }
export interface AOPSTemplate extends BaseEntity { name: string; type: string; content: Record<string,unknown>; }
export interface AOPSVersion extends BaseEntity { entity_type: string; entity_id: string; version: number; data: Record<string,unknown>; }
export interface AOPSArchive extends BaseEntity { entity_type: string; entity_id: string; data: Record<string,unknown>; reason: string; }
export interface AOPSLog extends BaseEntity { level: 'debug'|'info'|'warn'|'error'; message: string; context: Record<string,unknown>; source: string; }
export interface AOPSMetric extends BaseEntity { name: string; value: number; unit: string; tags: Record<string,string>; }
export interface AOPSCostEntry extends BaseEntity { resource: string; amount: number; currency: string; period: string; }
export interface AOPSCache extends BaseEntity { key: string; value: unknown; ttl_seconds: number; expires_at: string; }
export interface AOPSSession extends BaseEntity { user_id: string; started_at: string; ended_at?: string; }
export interface AOPSBookmark extends BaseEntity { user_id: string; entity_type: string; entity_id: string; name: string; }
export interface AOPSActivity extends BaseEntity { user_id: string; action: string; entity_type: string; entity_id: string; }
export interface AOPSFeedback extends BaseEntity { entity_type: string; entity_id: string; user_id: string; rating: number; }
export interface AOPSTag extends BaseEntity { name: string; description?: string; }
export interface AOPSAnnotation extends BaseEntity { entity_type: string; entity_id: string; user_id: string; note: string; }
export interface AOPSLabel extends BaseEntity { name: string; color: string; }
export interface AOPSShare extends BaseEntity { entity_type: string; entity_id: string; shared_by: string; shared_with: string; }
export interface AOPSComment extends BaseEntity { entity_type: string; entity_id: string; user_id: string; content: string; }
export interface AOPSWebhook extends BaseEntity { name: string; url: string; events: string[]; active: boolean; }
export interface AOPSIntegration extends BaseEntity { name: string; type: string; config: Record<string,unknown>; status: 'active'|'inactive'; }
export interface AOPSFeature extends BaseEntity { name: string; enabled: boolean; rollout_percentage: number; }
export interface AOPSLock extends BaseEntity { entity_type: string; entity_id: string; user_id: string; expires_at: string; }
export interface AOPSRateLimitEntry extends BaseEntity { endpoint: string; limit: number; window_seconds: number; current_count: number; }
export interface AOPSHealthCheck extends BaseEntity { name: string; status: 'healthy'|'degraded'|'down'; last_checked_at: string; }
export interface AOPSDeployment extends BaseEntity { name: string; version: string; status: 'pending'|'deployed'|'rolled_back'; environment: string; }
export interface AOPSIncident extends BaseEntity { title: string; severity: 'low'|'medium'|'high'|'critical'; status: 'open'|'resolved'; }
export interface AOPSMaintenanceWindow extends BaseEntity { title: string; start_time: string; end_time: string; }
export interface AOPSNotificationPreference extends BaseEntity { user_id: string; channel: string; enabled: boolean; }
export interface AOPSVersionControl extends BaseEntity { entity_type: string; entity_id: string; version: number; data: Record<string,unknown>; }
export interface AOPSGlobalConfig extends BaseEntity { key: string; value: unknown; description?: string; }
export interface AOPSHealthScore extends BaseEntity { component: string; score: number; factors: Record<string,number>; }
export interface AOPSStatusPage extends BaseEntity { name: string; components: Record<string,unknown>[]; }
export interface AOPSServiceStatus extends BaseEntity { service_id: string; status: string; latency_ms: number; uptime_percent: number; }
export interface AOPSIncidentLog extends BaseEntity { incident_id: string; message: string; author_id: string; }
export interface AOPSPostMortem extends BaseEntity { incident_id: string; title: string; root_cause: string; resolution: string; }
export interface AOPSChecklist extends BaseEntity { name: string; items: Record<string,unknown>[]; }
export interface AOPSChecklistItem extends BaseEntity { checklist_id: string; text: string; checked: boolean; }
export interface AOPSActionItem extends BaseEntity { title: string; assignee_id: string; due_date: string; status: string; }
export interface AOPSNote extends BaseEntity { title: string; content: string; tags: string[]; }
export interface AOPSBookmarkedEntity extends BaseEntity { user_id: string; entity_type: string; entity_id: string; }
export interface AOPSRecentAction extends BaseEntity { user_id: string; action: string; entity_type: string; entity_id: string; timestamp: string; }
export interface AOPSErrorLog extends BaseEntity { error_type: string; message: string; stack: string; source: string; }
export interface AOPSThreshold extends BaseEntity { metric_name: string; warning: number; critical: number; }
export interface AOPSPrediction extends BaseEntity { metric_name: string; predicted_value: number; confidence: number; }
export interface AOPSRecommendation extends BaseEntity { type: string; title: string; description: string; priority: number; }
export interface AOPSPerformanceMetric extends BaseEntity { component: string; metric: string; value: number; }
export interface AOPSResourceUsage extends BaseEntity { resource_type: string; used: number; allocated: number; }
export interface AOPSBatchJob extends BaseEntity { name: string; config: Record<string,unknown>; status: string; }
export interface AOPSBatchJobRun extends BaseEntity { job_id: string; status: string; items_processed: number; }
export interface AOPSSchedule extends BaseEntity { name: string; cron: string; timezone: string; active: boolean; }
export interface AOPSScheduleRun extends BaseEntity { schedule_id: string; status: string; started_at: string; }
export interface AOPSCronJob extends BaseEntity { name: string; command: string; schedule: string; active: boolean; }
export interface AOPSCronJobRun extends BaseEntity { job_id: string; status: string; output: string; }
export interface AOPSHeartbeat extends BaseEntity { component: string; status: 'alive'|'dead'; last_beat: string; }
export interface AOPSCircuitBreaker extends BaseEntity { name: string; state: 'closed'|'open'|'half_open'; failure_count: number; }
export interface AOPSBulkOperation extends BaseEntity { type: string; status: string; total: number; processed: number; }
export interface AOPSParallelTask extends BaseEntity { group_id: string; task_config: Record<string,unknown>; status: string; }
export interface AOPSRetryQueue extends BaseEntity { entity_type: string; entity_id: string; attempts: number; next_retry_at: string; }
export interface AOPSDeadLetterQueue extends BaseEntity { entity_type: string; entity_id: string; error: string; original_payload: Record<string,unknown>; }
export interface AOPSBatchConfig extends BaseEntity { name: string; batch_size: number; timeout_ms: number; }
export interface AOPSDataPartition extends BaseEntity { partition_key: string; row_count: number; size_bytes: number; }
export interface AOPSShardingConfig extends BaseEntity { name: string; shard_count: number; strategy: string; }
export interface AOPSCacheEntry extends BaseEntity { key: string; value: unknown; ttl: number; }
export interface AOPSRateLimiter extends BaseEntity { name: string; limit: number; window: number; current: number; }
export interface AOPSQuota extends BaseEntity { resource: string; limit: number; used: number; }
export interface AOPSUsageLog extends BaseEntity { resource: string; amount: number; timestamp: string; }
export interface AOPSCostReport extends BaseEntity { period: string; total_cost: number; breakdown: Record<string,number>; }
export interface AOPSBudgetAlert extends BaseEntity { budget_id: string; threshold: number; current: number; }
export interface AOPSAnomalyLog extends BaseEntity { metric: string; expected: number; actual: number; severity: string; }
export interface AOPSTrendAnalysis extends BaseEntity { metric: string; trend: 'up'|'down'|'stable'; change_percent: number; }
export interface AOPSCapacityReport extends BaseEntity { resource: string; capacity: number; used: number; }
export interface AOPSHealthReport extends BaseEntity { generated_at: string; overall_status: string; components: Record<string,unknown>[]; }
export interface AOPSComplianceCheck extends BaseEntity { rule: string; status: 'pass'|'fail'|'warning'; details: string; }
export interface AOPSAuditReport extends BaseEntity { period: string; actions: number; anomalies: number; }
export interface AOPSSecurityScan extends BaseEntity { type: string; status: string; findings: number; }
export interface AOPSAccessLog extends BaseEntity { user_id: string; resource: string; action: string; timestamp: string; }
export interface AOPSPermissionCheck extends BaseEntity { user_id: string; resource: string; allowed: boolean; }
export interface AOPSRateLimitConfig extends BaseEntity { endpoint: string; limit: number; window: number; }
export interface AOPSIPWhitelist extends BaseEntity { ip: string; description: string; active: boolean; }
export interface AOPSSSLCert extends BaseEntity { domain: string; expires_at: string; issuer: string; }
export interface AOPSAPIKey extends BaseEntity { name: string; key_hash: string; scopes: string[]; expires_at?: string; }
export interface AOPSJWTConfig extends BaseEntity { issuer: string; algorithm: string; expires_in: number; }
export interface AOPSAuthSession extends BaseEntity { user_id: string; token_hash: string; expires_at: string; }
export interface AOPSPermissionPolicy extends BaseEntity { name: string; rules: Record<string,unknown>[]; active: boolean; }
export interface AOPSRoleMapping extends BaseEntity { role: string; permissions: string[]; }
export interface AOPSUserGroup extends BaseEntity { name: string; members: string[]; }
export interface AOPSCustomField extends BaseEntity { entity_type: string; field_name: string; field_type: string; required: boolean; }
export interface AOPSCustomFieldValue extends BaseEntity { entity_type: string; entity_id: string; field_id: string; value: unknown; }
export interface AOPSValidationRule extends BaseEntity { entity_type: string; field: string; rule: string; message: string; }
export interface AOPSImportJob extends BaseEntity { source: string; format: string; status: string; row_count: number; }
export interface AOPSExportJob extends BaseEntity { format: string; status: string; file_url?: string; }
export interface AOPSDataSync extends BaseEntity { source: string; target: string; last_sync: string; status: string; }
export interface AOPSSchemaVersion extends BaseEntity { entity_type: string; version: number; schema: Record<string,unknown>; }
export interface AOPSIndexConfig extends BaseEntity { table: string; columns: string[]; unique: boolean; }
export interface AOPSQueryLog extends BaseEntity { query: string; duration_ms: number; rows_affected: number; }
export interface AOPSBackupJob extends BaseEntity { name: string; status: string; started_at: string; }
export interface AOPSRestoreJob extends BaseEntity { backup_id: string; status: string; progress: number; }
export interface AOPSRegionConfig extends BaseEntity { name: string; endpoint: string; active: boolean; }
export interface AOPSFailoverConfig extends BaseEntity { primary: string; secondary: string; }
export interface AOPSDisasterRecovery extends BaseEntity { name: string; steps: Record<string,unknown>[]; last_test: string; }
export interface AOPSServiceLevel extends BaseEntity { service: string; target_uptime: number; actual_uptime: number; }
export interface AOPSSLAConfig extends BaseEntity { service: string; uptime_guarantee: number; penalty_percent: number; }

// ============================================================================
export const AOPS_TABLE_NAMES: Record<string, string> = {
  AOPSWorkflow: 'aops_workflows', AOPSWorkflowStep: 'aops_workflow_steps', AOPSWorkflowRun: 'aops_workflow_runs',
  AOPSWorkflowStepRun: 'aops_workflow_step_runs', AOPSAction: 'aops_actions', AOPSActionLog: 'aops_action_logs',
  AOPSTrigger: 'aops_triggers', AOPSTriggerLog: 'aops_trigger_logs', AOPSRule: 'aops_rules',
  AOPSRuleEvaluation: 'aops_rule_evaluations', AOPSAutomation: 'aops_automations', AOPSAutomationRun: 'aops_automation_runs',
  AOPSScript: 'aops_scripts', AOPSScriptRun: 'aops_script_runs', AOPSConnector: 'aops_connectors',
  AOPSDataMapping: 'aops_data_mappings', AOPSCondition: 'aops_conditions', AOPSConditionGroup: 'aops_condition_groups',
  AOPSRetryPolicy: 'aops_retry_policies', AOPSTimeoutConfig: 'aops_timeout_configs', AOPSQueue: 'aops_queues',
  AOPSQueueItem: 'aops_queue_items', AOPSRateLimit: 'aops_rate_limits', AOPSAlert: 'aops_alerts',
  AOPSConfig: 'aops_configs', AOPSAuditLog: 'aops_audit_logs', AOPSNotification: 'aops_notifications',
  AOPSDashboard: 'aops_dashboards', AOPSReport: 'aops_reports', AOPSTemplate: 'aops_templates',
  AOPSVersion: 'aops_versions', AOPSArchive: 'aops_archives', AOPSLog: 'aops_logs',
  AOPSMetric: 'aops_metrics', AOPSCostEntry: 'aops_cost_entries', AOPSCache: 'aops_caches',
  AOPSSession: 'aops_sessions', AOPSBookmark: 'aops_bookmarks', AOPSActivity: 'aops_activities',
  AOPSFeedback: 'aops_feedbacks', AOPSTag: 'aops_tags', AOPSAnnotation: 'aops_annotations',
  AOPSLabel: 'aops_labels', AOPSShare: 'aops_shares', AOPSComment: 'aops_comments',
  AOPSWebhook: 'aops_webhooks', AOPSIntegration: 'aops_integrations', AOPSFeature: 'aops_features',
  AOPSLock: 'aops_locks', AOPSRateLimitEntry: 'aops_rate_limit_entries', AOPSHealthCheck: 'aops_health_checks',
  AOPSDeployment: 'aops_deployments', AOPSIncident: 'aops_incidents', AOPSMaintenanceWindow: 'aops_maintenance_windows',
  AOPSNotificationPreference: 'aops_notification_preferences', AOPSVersionControl: 'aops_version_controls',
  AOPSGlobalConfig: 'aops_global_configs', AOPSHealthScore: 'aops_health_scores', AOPSStatusPage: 'aops_status_pages',
  AOPSServiceStatus: 'aops_service_statuses', AOPSIncidentLog: 'aops_incident_logs', AOPSPostMortem: 'aops_post_mortems',
  AOPSChecklist: 'aops_checklists', AOPSChecklistItem: 'aops_checklist_items', AOPSActionItem: 'aops_action_items',
  AOPSNote: 'aops_notes', AOPSBookmarkedEntity: 'aops_bookmarked_entities', AOPSRecentAction: 'aops_recent_actions',
  AOPSErrorLog: 'aops_error_logs', AOPSThreshold: 'aops_thresholds', AOPSPrediction: 'aops_predictions',
  AOPSRecommendation: 'aops_recommendations', AOPSPerformanceMetric: 'aops_performance_metrics',
  AOPSResourceUsage: 'aops_resource_usages', AOPSBatchJob: 'aops_batch_jobs', AOPSBatchJobRun: 'aops_batch_job_runs',
  AOPSSchedule: 'aops_schedules', AOPSScheduleRun: 'aops_schedule_runs', AOPSCronJob: 'aops_cron_jobs',
  AOPSCronJobRun: 'aops_cron_job_runs', AOPSHeartbeat: 'aops_heartbeats', AOPSCircuitBreaker: 'aops_circuit_breakers',
  AOPSBulkOperation: 'aops_bulk_operations', AOPSParallelTask: 'aops_parallel_tasks', AOPSRetryQueue: 'aops_retry_queues',
  AOPSDeadLetterQueue: 'aops_dead_letter_queues', AOPSBatchConfig: 'aops_batch_configs', AOPSDataPartition: 'aops_data_partitions',
  AOPSShardingConfig: 'aops_sharding_configs', AOPSCacheEntry: 'aops_cache_entries', AOPSRateLimiter: 'aops_rate_limiters',
  AOPSQuota: 'aops_quotas', AOPSUsageLog: 'aops_usage_logs', AOPSCostReport: 'aops_cost_reports',
  AOPSBudgetAlert: 'aops_budget_alerts', AOPSAnomalyLog: 'aops_anomaly_logs', AOPSTrendAnalysis: 'aops_trend_analyses',
  AOPSCapacityReport: 'aops_capacity_reports', AOPSHealthReport: 'aops_health_reports', AOPSComplianceCheck: 'aops_compliance_checks',
  AOPSAuditReport: 'aops_audit_reports', AOPSSecurityScan: 'aops_security_scans', AOPSAccessLog: 'aops_access_logs',
  AOPSPermissionCheck: 'aops_permission_checks', AOPSRateLimitConfig: 'aops_rate_limit_configs',
  AOPSIPWhitelist: 'aops_ip_whitelists', AOPSSSLCert: 'aops_ssl_certs', AOPSAPIKey: 'aops_api_keys',
  AOPSJWTConfig: 'aops_jwt_configs', AOPSAuthSession: 'aops_auth_sessions', AOPSPermissionPolicy: 'aops_permission_policies',
  AOPSRoleMapping: 'aops_role_mappings', AOPSUserGroup: 'aops_user_groups', AOPSCustomField: 'aops_custom_fields',
  AOPSCustomFieldValue: 'aops_custom_field_values', AOPSValidationRule: 'aops_validation_rules',
  AOPSImportJob: 'aops_import_jobs', AOPSExportJob: 'aops_export_jobs', AOPSDataSync: 'aops_data_syncs',
  AOPSSchemaVersion: 'aops_schema_versions', AOPSIndexConfig: 'aops_index_configs', AOPSQueryLog: 'aops_query_logs',
  AOPSBackupJob: 'aops_backup_jobs', AOPSRestoreJob: 'aops_restore_jobs', AOPSRegionConfig: 'aops_region_configs',
  AOPSFailoverConfig: 'aops_failover_configs', AOPSDisasterRecovery: 'aops_disaster_recoveries',
  AOPSServiceLevel: 'aops_service_levels', AOPSSLAConfig: 'aops_sla_configs',
};

// ============================================================================
export interface AEIP3Repository {
  workflows: CrudRepository<AOPSWorkflow>;
  workflowSteps: CrudRepository<AOPSWorkflowStep>;
  workflowRuns: CrudRepository<AOPSWorkflowRun>;
  workflowStepRuns: CrudRepository<AOPSWorkflowStepRun>;
  actions: CrudRepository<AOPSAction>;
  actionLogs: CrudRepository<AOPSActionLog>;
  triggers: CrudRepository<AOPSTrigger>;
  triggerLogs: CrudRepository<AOPSTriggerLog>;
  rules: CrudRepository<AOPSRule>;
  ruleEvaluations: CrudRepository<AOPSRuleEvaluation>;
  automations: CrudRepository<AOPSAutomation>;
  automationRuns: CrudRepository<AOPSAutomationRun>;
  scripts: CrudRepository<AOPSScript>;
  scriptRuns: CrudRepository<AOPSScriptRun>;
  connectors: CrudRepository<AOPSConnector>;
  dataMappings: CrudRepository<AOPSDataMapping>;
  conditions: CrudRepository<AOPSCondition>;
  conditionGroups: CrudRepository<AOPSConditionGroup>;
  retryPolicies: CrudRepository<AOPSRetryPolicy>;
  timeoutConfigs: CrudRepository<AOPSTimeoutConfig>;
  queues: CrudRepository<AOPSQueue>;
  queueItems: CrudRepository<AOPSQueueItem>;
  rateLimits: CrudRepository<AOPSRateLimit>;
  alerts: CrudRepository<AOPSAlert>;
  configs: CrudRepository<AOPSConfig>;
  auditLogs: CrudRepository<AOPSAuditLog>;
  notifications: CrudRepository<AOPSNotification>;
  dashboards: CrudRepository<AOPSDashboard>;
  reports: CrudRepository<AOPSReport>;
  templates: CrudRepository<AOPSTemplate>;
  versions: CrudRepository<AOPSVersion>;
  archives: CrudRepository<AOPSArchive>;
  logs: CrudRepository<AOPSLog>;
  metrics: CrudRepository<AOPSMetric>;
  costEntries: CrudRepository<AOPSCostEntry>;
  caches: CrudRepository<AOPSCache>;
  sessions: CrudRepository<AOPSSession>;
  bookmarks: CrudRepository<AOPSBookmark>;
  activities: CrudRepository<AOPSActivity>;
  feedbacks: CrudRepository<AOPSFeedback>;
  tags: CrudRepository<AOPSTag>;
  annotations: CrudRepository<AOPSAnnotation>;
  labels: CrudRepository<AOPSLabel>;
  shares: CrudRepository<AOPSShare>;
  comments: CrudRepository<AOPSComment>;
  webhooks: CrudRepository<AOPSWebhook>;
  integrations: CrudRepository<AOPSIntegration>;
  features: CrudRepository<AOPSFeature>;
  locks: CrudRepository<AOPSLock>;
  rateLimitEntries: CrudRepository<AOPSRateLimitEntry>;
  healthChecks: CrudRepository<AOPSHealthCheck>;
  deployments: CrudRepository<AOPSDeployment>;
  incidents: CrudRepository<AOPSIncident>;
  maintenanceWindows: CrudRepository<AOPSMaintenanceWindow>;
  notificationPreferences: CrudRepository<AOPSNotificationPreference>;
  versionControls: CrudRepository<AOPSVersionControl>;
  globalConfigs: CrudRepository<AOPSGlobalConfig>;
  healthScores: CrudRepository<AOPSHealthScore>;
  statusPages: CrudRepository<AOPSStatusPage>;
  serviceStatuses: CrudRepository<AOPSServiceStatus>;
  incidentLogs: CrudRepository<AOPSIncidentLog>;
  postMortems: CrudRepository<AOPSPostMortem>;
  checklists: CrudRepository<AOPSChecklist>;
  checklistItems: CrudRepository<AOPSChecklistItem>;
  actionItems: CrudRepository<AOPSActionItem>;
  notes: CrudRepository<AOPSNote>;
  bookmarkedEntities: CrudRepository<AOPSBookmarkedEntity>;
  recentActions: CrudRepository<AOPSRecentAction>;
  errorLogs: CrudRepository<AOPSErrorLog>;
  thresholds: CrudRepository<AOPSThreshold>;
  predictions: CrudRepository<AOPSPrediction>;
  recommendations: CrudRepository<AOPSRecommendation>;
  performanceMetrics: CrudRepository<AOPSPerformanceMetric>;
  resourceUsages: CrudRepository<AOPSResourceUsage>;
  batchJobs: CrudRepository<AOPSBatchJob>;
  batchJobRuns: CrudRepository<AOPSBatchJobRun>;
  schedules: CrudRepository<AOPSSchedule>;
  scheduleRuns: CrudRepository<AOPSScheduleRun>;
  cronJobs: CrudRepository<AOPSCronJob>;
  cronJobRuns: CrudRepository<AOPSCronJobRun>;
  heartbeats: CrudRepository<AOPSHeartbeat>;
  circuitBreakers: CrudRepository<AOPSCircuitBreaker>;
  bulkOperations: CrudRepository<AOPSBulkOperation>;
  parallelTasks: CrudRepository<AOPSParallelTask>;
  retryQueues: CrudRepository<AOPSRetryQueue>;
  deadLetterQueues: CrudRepository<AOPSDeadLetterQueue>;
  batchConfigs: CrudRepository<AOPSBatchConfig>;
  dataPartitions: CrudRepository<AOPSDataPartition>;
  shardingConfigs: CrudRepository<AOPSShardingConfig>;
  cacheEntries: CrudRepository<AOPSCacheEntry>;
  rateLimiters: CrudRepository<AOPSRateLimiter>;
  quotas: CrudRepository<AOPSQuota>;
  usageLogs: CrudRepository<AOPSUsageLog>;
  costReports: CrudRepository<AOPSCostReport>;
  budgetAlerts: CrudRepository<AOPSBudgetAlert>;
  anomalyLogs: CrudRepository<AOPSAnomalyLog>;
  trendAnalyses: CrudRepository<AOPSTrendAnalysis>;
  capacityReports: CrudRepository<AOPSCapacityReport>;
  healthReports: CrudRepository<AOPSHealthReport>;
  complianceChecks: CrudRepository<AOPSComplianceCheck>;
  auditReports: CrudRepository<AOPSAuditReport>;
  securityScans: CrudRepository<AOPSSecurityScan>;
  accessLogs: CrudRepository<AOPSAccessLog>;
  permissionChecks: CrudRepository<AOPSPermissionCheck>;
  rateLimitConfigs: CrudRepository<AOPSRateLimitConfig>;
  ipWhitelists: CrudRepository<AOPSIPWhitelist>;
  sslCerts: CrudRepository<AOPSSSLCert>;
  apiKeys: CrudRepository<AOPSAPIKey>;
  jwtConfigs: CrudRepository<AOPSJWTConfig>;
  authSessions: CrudRepository<AOPSAuthSession>;
  permissionPolicies: CrudRepository<AOPSPermissionPolicy>;
  roleMappings: CrudRepository<AOPSRoleMapping>;
  userGroups: CrudRepository<AOPSUserGroup>;
  customFields: CrudRepository<AOPSCustomField>;
  customFieldValues: CrudRepository<AOPSCustomFieldValue>;
  validationRules: CrudRepository<AOPSValidationRule>;
  importJobs: CrudRepository<AOPSImportJob>;
  exportJobs: CrudRepository<AOPSExportJob>;
  dataSyncs: CrudRepository<AOPSDataSync>;
  schemaVersions: CrudRepository<AOPSSchemaVersion>;
  indexConfigs: CrudRepository<AOPSIndexConfig>;
  queryLogs: CrudRepository<AOPSQueryLog>;
  backupJobs: CrudRepository<AOPSBackupJob>;
  restoreJobs: CrudRepository<AOPSRestoreJob>;
  regionConfigs: CrudRepository<AOPSRegionConfig>;
  failoverConfigs: CrudRepository<AOPSFailoverConfig>;
  disasterRecoveries: CrudRepository<AOPSDisasterRecovery>;
  serviceLevels: CrudRepository<AOPSServiceLevel>;
  slaConfigs: CrudRepository<AOPSSLAConfig>;
}

// ============================================================================
export function createAEIP3Repository(supabase: SupabaseClient): AEIP3Repository {
  const c = <T extends BaseEntity>(t: string) => createCrudRepository<T>(supabase, t);
  return {
    workflows: c<AOPSWorkflow>(AOPS_TABLE_NAMES.AOPSWorkflow), workflowSteps: c<AOPSWorkflowStep>(AOPS_TABLE_NAMES.AOPSWorkflowStep),
    workflowRuns: c<AOPSWorkflowRun>(AOPS_TABLE_NAMES.AOPSWorkflowRun), workflowStepRuns: c<AOPSWorkflowStepRun>(AOPS_TABLE_NAMES.AOPSWorkflowStepRun),
    actions: c<AOPSAction>(AOPS_TABLE_NAMES.AOPSAction), actionLogs: c<AOPSActionLog>(AOPS_TABLE_NAMES.AOPSActionLog),
    triggers: c<AOPSTrigger>(AOPS_TABLE_NAMES.AOPSTrigger), triggerLogs: c<AOPSTriggerLog>(AOPS_TABLE_NAMES.AOPSTriggerLog),
    rules: c<AOPSRule>(AOPS_TABLE_NAMES.AOPSRule), ruleEvaluations: c<AOPSRuleEvaluation>(AOPS_TABLE_NAMES.AOPSRuleEvaluation),
    automations: c<AOPSAutomation>(AOPS_TABLE_NAMES.AOPSAutomation), automationRuns: c<AOPSAutomationRun>(AOPS_TABLE_NAMES.AOPSAutomationRun),
    scripts: c<AOPSScript>(AOPS_TABLE_NAMES.AOPSScript), scriptRuns: c<AOPSScriptRun>(AOPS_TABLE_NAMES.AOPSScriptRun),
    connectors: c<AOPSConnector>(AOPS_TABLE_NAMES.AOPSConnector), dataMappings: c<AOPSDataMapping>(AOPS_TABLE_NAMES.AOPSDataMapping),
    conditions: c<AOPSCondition>(AOPS_TABLE_NAMES.AOPSCondition), conditionGroups: c<AOPSConditionGroup>(AOPS_TABLE_NAMES.AOPSConditionGroup),
    retryPolicies: c<AOPSRetryPolicy>(AOPS_TABLE_NAMES.AOPSRetryPolicy), timeoutConfigs: c<AOPSTimeoutConfig>(AOPS_TABLE_NAMES.AOPSTimeoutConfig),
    queues: c<AOPSQueue>(AOPS_TABLE_NAMES.AOPSQueue), queueItems: c<AOPSQueueItem>(AOPS_TABLE_NAMES.AOPSQueueItem),
    rateLimits: c<AOPSRateLimit>(AOPS_TABLE_NAMES.AOPSRateLimit), alerts: c<AOPSAlert>(AOPS_TABLE_NAMES.AOPSAlert),
    configs: c<AOPSConfig>(AOPS_TABLE_NAMES.AOPSConfig), auditLogs: c<AOPSAuditLog>(AOPS_TABLE_NAMES.AOPSAuditLog),
    notifications: c<AOPSNotification>(AOPS_TABLE_NAMES.AOPSNotification), dashboards: c<AOPSDashboard>(AOPS_TABLE_NAMES.AOPSDashboard),
    reports: c<AOPSReport>(AOPS_TABLE_NAMES.AOPSReport), templates: c<AOPSTemplate>(AOPS_TABLE_NAMES.AOPSTemplate),
    versions: c<AOPSVersion>(AOPS_TABLE_NAMES.AOPSVersion), archives: c<AOPSArchive>(AOPS_TABLE_NAMES.AOPSArchive),
    logs: c<AOPSLog>(AOPS_TABLE_NAMES.AOPSLog), metrics: c<AOPSMetric>(AOPS_TABLE_NAMES.AOPSMetric),
    costEntries: c<AOPSCostEntry>(AOPS_TABLE_NAMES.AOPSCostEntry), caches: c<AOPSCache>(AOPS_TABLE_NAMES.AOPSCache),
    sessions: c<AOPSSession>(AOPS_TABLE_NAMES.AOPSSession), bookmarks: c<AOPSBookmark>(AOPS_TABLE_NAMES.AOPSBookmark),
    activities: c<AOPSActivity>(AOPS_TABLE_NAMES.AOPSActivity), feedbacks: c<AOPSFeedback>(AOPS_TABLE_NAMES.AOPSFeedback),
    tags: c<AOPSTag>(AOPS_TABLE_NAMES.AOPSTag), annotations: c<AOPSAnnotation>(AOPS_TABLE_NAMES.AOPSAnnotation),
    labels: c<AOPSLabel>(AOPS_TABLE_NAMES.AOPSLabel), shares: c<AOPSShare>(AOPS_TABLE_NAMES.AOPSShare),
    comments: c<AOPSComment>(AOPS_TABLE_NAMES.AOPSComment), webhooks: c<AOPSWebhook>(AOPS_TABLE_NAMES.AOPSWebhook),
    integrations: c<AOPSIntegration>(AOPS_TABLE_NAMES.AOPSIntegration), features: c<AOPSFeature>(AOPS_TABLE_NAMES.AOPSFeature),
    locks: c<AOPSLock>(AOPS_TABLE_NAMES.AOPSLock), rateLimitEntries: c<AOPSRateLimitEntry>(AOPS_TABLE_NAMES.AOPSRateLimitEntry),
    healthChecks: c<AOPSHealthCheck>(AOPS_TABLE_NAMES.AOPSHealthCheck), deployments: c<AOPSDeployment>(AOPS_TABLE_NAMES.AOPSDeployment),
    incidents: c<AOPSIncident>(AOPS_TABLE_NAMES.AOPSIncident), maintenanceWindows: c<AOPSMaintenanceWindow>(AOPS_TABLE_NAMES.AOPSMaintenanceWindow),
    notificationPreferences: c<AOPSNotificationPreference>(AOPS_TABLE_NAMES.AOPSNotificationPreference),
    versionControls: c<AOPSVersionControl>(AOPS_TABLE_NAMES.AOPSVersionControl), globalConfigs: c<AOPSGlobalConfig>(AOPS_TABLE_NAMES.AOPSGlobalConfig),
    healthScores: c<AOPSHealthScore>(AOPS_TABLE_NAMES.AOPSHealthScore), statusPages: c<AOPSStatusPage>(AOPS_TABLE_NAMES.AOPSStatusPage),
    serviceStatuses: c<AOPSServiceStatus>(AOPS_TABLE_NAMES.AOPSServiceStatus), incidentLogs: c<AOPSIncidentLog>(AOPS_TABLE_NAMES.AOPSIncidentLog),
    postMortems: c<AOPSPostMortem>(AOPS_TABLE_NAMES.AOPSPostMortem), checklists: c<AOPSChecklist>(AOPS_TABLE_NAMES.AOPSChecklist),
    checklistItems: c<AOPSChecklistItem>(AOPS_TABLE_NAMES.AOPSChecklistItem), actionItems: c<AOPSActionItem>(AOPS_TABLE_NAMES.AOPSActionItem),
    notes: c<AOPSNote>(AOPS_TABLE_NAMES.AOPSNote), bookmarkedEntities: c<AOPSBookmarkedEntity>(AOPS_TABLE_NAMES.AOPSBookmarkedEntity),
    recentActions: c<AOPSRecentAction>(AOPS_TABLE_NAMES.AOPSRecentAction), errorLogs: c<AOPSErrorLog>(AOPS_TABLE_NAMES.AOPSErrorLog),
    thresholds: c<AOPSThreshold>(AOPS_TABLE_NAMES.AOPSThreshold), predictions: c<AOPSPrediction>(AOPS_TABLE_NAMES.AOPSPrediction),
    recommendations: c<AOPSRecommendation>(AOPS_TABLE_NAMES.AOPSRecommendation), performanceMetrics: c<AOPSPerformanceMetric>(AOPS_TABLE_NAMES.AOPSPerformanceMetric),
    resourceUsages: c<AOPSResourceUsage>(AOPS_TABLE_NAMES.AOPSResourceUsage), batchJobs: c<AOPSBatchJob>(AOPS_TABLE_NAMES.AOPSBatchJob),
    batchJobRuns: c<AOPSBatchJobRun>(AOPS_TABLE_NAMES.AOPSBatchJobRun), schedules: c<AOPSSchedule>(AOPS_TABLE_NAMES.AOPSSchedule),
    scheduleRuns: c<AOPSScheduleRun>(AOPS_TABLE_NAMES.AOPSScheduleRun), cronJobs: c<AOPSCronJob>(AOPS_TABLE_NAMES.AOPSCronJob),
    cronJobRuns: c<AOPSCronJobRun>(AOPS_TABLE_NAMES.AOPSCronJobRun), heartbeats: c<AOPSHeartbeat>(AOPS_TABLE_NAMES.AOPSHeartbeat),
    circuitBreakers: c<AOPSCircuitBreaker>(AOPS_TABLE_NAMES.AOPSCircuitBreaker), bulkOperations: c<AOPSBulkOperation>(AOPS_TABLE_NAMES.AOPSBulkOperation),
    parallelTasks: c<AOPSParallelTask>(AOPS_TABLE_NAMES.AOPSParallelTask), retryQueues: c<AOPSRetryQueue>(AOPS_TABLE_NAMES.AOPSRetryQueue),
    deadLetterQueues: c<AOPSDeadLetterQueue>(AOPS_TABLE_NAMES.AOPSDeadLetterQueue), batchConfigs: c<AOPSBatchConfig>(AOPS_TABLE_NAMES.AOPSBatchConfig),
    dataPartitions: c<AOPSDataPartition>(AOPS_TABLE_NAMES.AOPSDataPartition), shardingConfigs: c<AOPSShardingConfig>(AOPS_TABLE_NAMES.AOPSShardingConfig),
    cacheEntries: c<AOPSCacheEntry>(AOPS_TABLE_NAMES.AOPSCacheEntry), rateLimiters: c<AOPSRateLimiter>(AOPS_TABLE_NAMES.AOPSRateLimiter),
    quotas: c<AOPSQuota>(AOPS_TABLE_NAMES.AOPSQuota), usageLogs: c<AOPSUsageLog>(AOPS_TABLE_NAMES.AOPSUsageLog),
    costReports: c<AOPSCostReport>(AOPS_TABLE_NAMES.AOPSCostReport), budgetAlerts: c<AOPSBudgetAlert>(AOPS_TABLE_NAMES.AOPSBudgetAlert),
    anomalyLogs: c<AOPSAnomalyLog>(AOPS_TABLE_NAMES.AOPSAnomalyLog), trendAnalyses: c<AOPSTrendAnalysis>(AOPS_TABLE_NAMES.AOPSTrendAnalysis),
    capacityReports: c<AOPSCapacityReport>(AOPS_TABLE_NAMES.AOPSCapacityReport), healthReports: c<AOPSHealthReport>(AOPS_TABLE_NAMES.AOPSHealthReport),
    complianceChecks: c<AOPSComplianceCheck>(AOPS_TABLE_NAMES.AOPSComplianceCheck), auditReports: c<AOPSAuditReport>(AOPS_TABLE_NAMES.AOPSAuditReport),
    securityScans: c<AOPSSecurityScan>(AOPS_TABLE_NAMES.AOPSSecurityScan), accessLogs: c<AOPSAccessLog>(AOPS_TABLE_NAMES.AOPSAccessLog),
    permissionChecks: c<AOPSPermissionCheck>(AOPS_TABLE_NAMES.AOPSPermissionCheck), rateLimitConfigs: c<AOPSRateLimitConfig>(AOPS_TABLE_NAMES.AOPSRateLimitConfig),
    ipWhitelists: c<AOPSIPWhitelist>(AOPS_TABLE_NAMES.AOPSIPWhitelist), sslCerts: c<AOPSSSLCert>(AOPS_TABLE_NAMES.AOPSSSLCert),
    apiKeys: c<AOPSAPIKey>(AOPS_TABLE_NAMES.AOPSAPIKey), jwtConfigs: c<AOPSJWTConfig>(AOPS_TABLE_NAMES.AOPSJWTConfig),
    authSessions: c<AOPSAuthSession>(AOPS_TABLE_NAMES.AOPSAuthSession), permissionPolicies: c<AOPSPermissionPolicy>(AOPS_TABLE_NAMES.AOPSPermissionPolicy),
    roleMappings: c<AOPSRoleMapping>(AOPS_TABLE_NAMES.AOPSRoleMapping), userGroups: c<AOPSUserGroup>(AOPS_TABLE_NAMES.AOPSUserGroup),
    customFields: c<AOPSCustomField>(AOPS_TABLE_NAMES.AOPSCustomField), customFieldValues: c<AOPSCustomFieldValue>(AOPS_TABLE_NAMES.AOPSCustomFieldValue),
    validationRules: c<AOPSValidationRule>(AOPS_TABLE_NAMES.AOPSValidationRule), importJobs: c<AOPSImportJob>(AOPS_TABLE_NAMES.AOPSImportJob),
    exportJobs: c<AOPSExportJob>(AOPS_TABLE_NAMES.AOPSExportJob), dataSyncs: c<AOPSDataSync>(AOPS_TABLE_NAMES.AOPSDataSync),
    schemaVersions: c<AOPSSchemaVersion>(AOPS_TABLE_NAMES.AOPSSchemaVersion), indexConfigs: c<AOPSIndexConfig>(AOPS_TABLE_NAMES.AOPSIndexConfig),
    queryLogs: c<AOPSQueryLog>(AOPS_TABLE_NAMES.AOPSQueryLog), backupJobs: c<AOPSBackupJob>(AOPS_TABLE_NAMES.AOPSBackupJob),
    restoreJobs: c<AOPSRestoreJob>(AOPS_TABLE_NAMES.AOPSRestoreJob), regionConfigs: c<AOPSRegionConfig>(AOPS_TABLE_NAMES.AOPSRegionConfig),
    failoverConfigs: c<AOPSFailoverConfig>(AOPS_TABLE_NAMES.AOPSFailoverConfig), disasterRecoveries: c<AOPSDisasterRecovery>(AOPS_TABLE_NAMES.AOPSDisasterRecovery),
    serviceLevels: c<AOPSServiceLevel>(AOPS_TABLE_NAMES.AOPSServiceLevel), slaConfigs: c<AOPSSLAConfig>(AOPS_TABLE_NAMES.AOPSSLAConfig),
  };
}

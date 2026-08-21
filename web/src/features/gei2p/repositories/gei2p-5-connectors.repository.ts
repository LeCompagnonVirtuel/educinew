import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-5: Connectors — System Integration & Protocol Adapters
// ~28 entities × 5 CRUD methods = ~140 methods
// ============================================================================

export interface GEI2PConnectorDefinition extends BaseEntity { name: string; connector_type: 'inbound'|'outbound'|'bidirectional'; protocol: 'rest'|'soap'|'graphql'|'websocket'|'sftp'|'email'|'custom'; description: string; version: string; author: string; config_schema: Record<string,unknown>; status: 'draft'|'active'|'deprecated'|'disabled'; }
export interface GEI2PConnectorInstance extends BaseEntity { definition_id: string; name: string; school_id: string; config: Record<string,unknown>; credentials_ref: string; status: 'active'|'inactive'|'error'|'maintenance'; last_sync_at?: string; next_sync_at?: string; error_message?: string; }
export interface GEI2PConnectorMapping extends BaseEntity { instance_id: string; source_entity: string; target_entity: string; field_mappings: Record<string,unknown>[]; transform_rules: Record<string,unknown>[]; direction: 'inbound'|'outbound'|'bidirectional'; priority: number; active: boolean; }
export interface GEI2PConnectorSyncJob extends BaseEntity { instance_id: string; job_type: 'full'|'incremental'|'delta'|'push'|'pull'; status: 'pending'|'running'|'completed'|'failed'|'cancelled'; records_total: number; records_processed: number; records_created: number; records_updated: number; records_deleted: number; records_failed: number; started_at: string; completed_at?: string; error_log?: string; }
export interface GEI2PConnectorSyncLog extends BaseEntity { job_id: string; entity_type: string; entity_id: string; action: 'create'|'update'|'delete'|'skip'|'error'; source_data: Record<string,unknown>; target_data?: Record<string,unknown>; status: 'success'|'failed'|'skipped'; error_message?: string; duration_ms: number; }
export interface GEI2PConnectorHealth extends BaseEntity { instance_id: string; status: 'healthy'|'degraded'|'down'|'unknown'; latency_ms: number; error_rate: number; last_check_at: string; uptime_percent: number; response_time_avg: number; }
export interface GEI2PConnectorCredential extends BaseEntity { instance_id: string; credential_type: 'api_key'|'oauth2'|'basic'|'certificate'|'jwt'|'custom'; encrypted_config: Record<string,unknown>; expires_at?: string; last_rotated_at?: string; rotation_interval_days?: number; status: 'active'|'expired'|'revoked'; }
export interface GEI2PConnectorSchema extends BaseEntity { definition_id: string; entity_type: string; schema: Record<string,unknown>; version: string; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PConnectorEvent extends BaseEntity { instance_id: string; event_type: 'sync_started'|'sync_completed'|'sync_failed'|'config_changed'|'health_changed'|'error'; payload: Record<string,unknown>; timestamp: string; }
export interface GEI2PConnectorAlert extends BaseEntity { instance_id: string; alert_type: 'health'|'sync_failure'| 'rate_limit'|'credential_expiry'|'data_quality'; severity: 'low'|'medium'|'high'|'critical'; title: string; message: string; resolved: boolean; resolved_at?: string; resolved_by?: string; }
export interface GEI2PConnectorRateLimit extends BaseEntity { instance_id: string; endpoint: string; limit: number; window_seconds: number; current_count: number; window_start: string; }
export interface GEI2PConnectorAuditLog extends BaseEntity { instance_id: string; action: string; actor_did: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }
export interface GEI2PConnectorNotification extends BaseEntity { instance_id: string; type: 'sync_complete'|'error'| 'health_warning'|'credential_expiry'|'config_update'; title: string; message: string; read: boolean; read_at?: string; sent_at: string; }
export interface GEI2PConnectorAnalytics extends BaseEntity { instance_id: string; metric: string; value: number; dimension: Record<string,string>; period: string; calculated_at: string; }
export interface GEI2PConnectorBackup extends BaseEntity { instance_id: string; backup_type: 'config'|'full'; file_url: string; checksum: string; created_at_backup: string; expires_at: string; }
export interface GEI2PConnectorVersion extends BaseEntity { definition_id: string; version: number; snapshot: Record<string,unknown>; change_summary: string; created_by: string; }
export interface GEI2PConnectorMetadata extends BaseEntity { instance_id: string; key: string; value: unknown; source: string; added_at: string; }
export interface GEI2PConnectorEndpoint extends BaseEntity { instance_id: string; name: string; url: string; method: string; headers: Record<string,string>; body_template?: Record<string,unknown>; timeout_ms: number; retry_count: number; }
export interface GEI2PConnectorTransformer extends BaseEntity { instance_id: string; name: string; transform_type: 'map'|'filter'|'aggregate'| 'enrich'|'validate'|'normalize'; config: Record<string,unknown>; order: number; active: boolean; }
export interface GEI2PConnectorDataQualityRule extends BaseEntity { instance_id: string; entity_type: string; rule_name: string; rule_type: 'completeness'|'accuracy'|'consistency'|'timeliness'|'validity'; rule_config: Record<string,unknown>; severity: 'low'|'medium'|'high'|'critical'; active: boolean; }
export interface GEI2PConnectorDataQualityResult extends BaseEntity { rule_id: string; job_id: string; passed: boolean; score: number; total_records: number; failed_records: number; details: Record<string,unknown>; checked_at: string; }
export interface GEI2PConnectorConflictResolution extends BaseEntity { job_id: string; entity_type: string; entity_id: string; source_data: Record<string,unknown>; target_data: Record<string,unknown>; resolution_strategy: 'source_wins'|'target_wins'|'merge'|'manual'|'skip'; resolved_data?: Record<string,unknown>; resolved: boolean; resolved_at?: string; }
export interface GEI2PConnectorSchedule extends BaseEntity { instance_id: string; schedule_type: 'interval'|'cron'|'manual'|'event_driven'; cron_expression?: string; interval_minutes?: number; event_trigger?: string; enabled: boolean; last_run_at?: string; next_run_at?: string; }
export interface GEI2PConnectorWebhook extends BaseEntity { instance_id: string; name: string; url: string; secret: string; events: string[]; active: boolean; last_triggered_at?: string; failure_count: number; }
export interface GEI2PConnectorWebhookLog extends BaseEntity { webhook_id: string; event_type: string; payload: Record<string,unknown>; response_status?: number; response_body?: string; delivered: boolean; delivered_at: string; duration_ms: number; }
export interface GEI2PConnectorTemplate extends BaseEntity { name: string; description: string; definition_id: string; default_config: Record<string,unknown>; tags: string[]; usage_count: number; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PConnectorUsageLog extends BaseEntity { instance_id: string; api_calls: number; data_transferred_bytes: number; errors: number; period: string; recorded_at: string; }
export interface GEI2PConnectorCompliance extends BaseEntity { instance_id: string; regulation: string; status: 'compliant'|'non_compliant'|'pending_review'; checked_at: string; details: Record<string,unknown>; }
export interface GEI2PConnectorDependency extends BaseEntity { source_instance_id: string; target_instance_id: string; dependency_type: 'data'|'trigger'| 'config'; description: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P5_TABLE_NAMES: Record<string, string> = {
  GEI2PConnectorDefinition: 'gei2p_connector_definitions',
  GEI2PConnectorInstance: 'gei2p_connector_instances',
  GEI2PConnectorMapping: 'gei2p_connector_mappings',
  GEI2PConnectorSyncJob: 'gei2p_connector_sync_jobs',
  GEI2PConnectorSyncLog: 'gei2p_connector_sync_logs',
  GEI2PConnectorHealth: 'gei2p_connector_health',
  GEI2PConnectorCredential: 'gei2p_connector_credentials',
  GEI2PConnectorSchema: 'gei2p_connector_schemas',
  GEI2PConnectorEvent: 'gei2p_connector_events',
  GEI2PConnectorAlert: 'gei2p_connector_alerts',
  GEI2PConnectorRateLimit: 'gei2p_connector_rate_limits',
  GEI2PConnectorAuditLog: 'gei2p_connector_audit_logs',
  GEI2PConnectorNotification: 'gei2p_connector_notifications',
  GEI2PConnectorAnalytics: 'gei2p_connector_analytics',
  GEI2PConnectorBackup: 'gei2p_connector_backups',
  GEI2PConnectorVersion: 'gei2p_connector_versions',
  GEI2PConnectorMetadata: 'gei2p_connector_metadata',
  GEI2PConnectorEndpoint: 'gei2p_connector_endpoints',
  GEI2PConnectorTransformer: 'gei2p_connector_transformers',
  GEI2PConnectorDataQualityRule: 'gei2p_connector_data_quality_rules',
  GEI2PConnectorDataQualityResult: 'gei2p_connector_data_quality_results',
  GEI2PConnectorConflictResolution: 'gei2p_connector_conflict_resolutions',
  GEI2PConnectorSchedule: 'gei2p_connector_schedules',
  GEI2PConnectorWebhook: 'gei2p_connector_webhooks',
  GEI2PConnectorWebhookLog: 'gei2p_connector_webhook_logs',
  GEI2PConnectorTemplate: 'gei2p_connector_templates',
  GEI2PConnectorUsageLog: 'gei2p_connector_usage_logs',
  GEI2PConnectorCompliance: 'gei2p_connector_compliances',
  GEI2PConnectorDependency: 'gei2p_connector_dependencies',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEI2P5Repository {
  definitions: CrudRepository<GEI2PConnectorDefinition>;
  instances: CrudRepository<GEI2PConnectorInstance>;
  mappings: CrudRepository<GEI2PConnectorMapping>;
  syncJobs: CrudRepository<GEI2PConnectorSyncJob>;
  syncLogs: CrudRepository<GEI2PConnectorSyncLog>;
  health: CrudRepository<GEI2PConnectorHealth>;
  credentials: CrudRepository<GEI2PConnectorCredential>;
  schemas: CrudRepository<GEI2PConnectorSchema>;
  events: CrudRepository<GEI2PConnectorEvent>;
  alerts: CrudRepository<GEI2PConnectorAlert>;
  rateLimits: CrudRepository<GEI2PConnectorRateLimit>;
  auditLogs: CrudRepository<GEI2PConnectorAuditLog>;
  notifications: CrudRepository<GEI2PConnectorNotification>;
  analytics: CrudRepository<GEI2PConnectorAnalytics>;
  backups: CrudRepository<GEI2PConnectorBackup>;
  versions: CrudRepository<GEI2PConnectorVersion>;
  metadataEntries: CrudRepository<GEI2PConnectorMetadata>;
  endpoints: CrudRepository<GEI2PConnectorEndpoint>;
  transformers: CrudRepository<GEI2PConnectorTransformer>;
  dataQualityRules: CrudRepository<GEI2PConnectorDataQualityRule>;
  dataQualityResults: CrudRepository<GEI2PConnectorDataQualityResult>;
  conflictResolutions: CrudRepository<GEI2PConnectorConflictResolution>;
  schedules: CrudRepository<GEI2PConnectorSchedule>;
  webhooks: CrudRepository<GEI2PConnectorWebhook>;
  webhookLogs: CrudRepository<GEI2PConnectorWebhookLog>;
  templates: CrudRepository<GEI2PConnectorTemplate>;
  usageLogs: CrudRepository<GEI2PConnectorUsageLog>;
  compliances: CrudRepository<GEI2PConnectorCompliance>;
  dependencies: CrudRepository<GEI2PConnectorDependency>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P5Repository(supabase: SupabaseClient): GEI2P5Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    definitions: crud<GEI2PConnectorDefinition>(GEI2P5_TABLE_NAMES.GEI2PConnectorDefinition),
    instances: crud<GEI2PConnectorInstance>(GEI2P5_TABLE_NAMES.GEI2PConnectorInstance),
    mappings: crud<GEI2PConnectorMapping>(GEI2P5_TABLE_NAMES.GEI2PConnectorMapping),
    syncJobs: crud<GEI2PConnectorSyncJob>(GEI2P5_TABLE_NAMES.GEI2PConnectorSyncJob),
    syncLogs: crud<GEI2PConnectorSyncLog>(GEI2P5_TABLE_NAMES.GEI2PConnectorSyncLog),
    health: crud<GEI2PConnectorHealth>(GEI2P5_TABLE_NAMES.GEI2PConnectorHealth),
    credentials: crud<GEI2PConnectorCredential>(GEI2P5_TABLE_NAMES.GEI2PConnectorCredential),
    schemas: crud<GEI2PConnectorSchema>(GEI2P5_TABLE_NAMES.GEI2PConnectorSchema),
    events: crud<GEI2PConnectorEvent>(GEI2P5_TABLE_NAMES.GEI2PConnectorEvent),
    alerts: crud<GEI2PConnectorAlert>(GEI2P5_TABLE_NAMES.GEI2PConnectorAlert),
    rateLimits: crud<GEI2PConnectorRateLimit>(GEI2P5_TABLE_NAMES.GEI2PConnectorRateLimit),
    auditLogs: crud<GEI2PConnectorAuditLog>(GEI2P5_TABLE_NAMES.GEI2PConnectorAuditLog),
    notifications: crud<GEI2PConnectorNotification>(GEI2P5_TABLE_NAMES.GEI2PConnectorNotification),
    analytics: crud<GEI2PConnectorAnalytics>(GEI2P5_TABLE_NAMES.GEI2PConnectorAnalytics),
    backups: crud<GEI2PConnectorBackup>(GEI2P5_TABLE_NAMES.GEI2PConnectorBackup),
    versions: crud<GEI2PConnectorVersion>(GEI2P5_TABLE_NAMES.GEI2PConnectorVersion),
    metadataEntries: crud<GEI2PConnectorMetadata>(GEI2P5_TABLE_NAMES.GEI2PConnectorMetadata),
    endpoints: crud<GEI2PConnectorEndpoint>(GEI2P5_TABLE_NAMES.GEI2PConnectorEndpoint),
    transformers: crud<GEI2PConnectorTransformer>(GEI2P5_TABLE_NAMES.GEI2PConnectorTransformer),
    dataQualityRules: crud<GEI2PConnectorDataQualityRule>(GEI2P5_TABLE_NAMES.GEI2PConnectorDataQualityRule),
    dataQualityResults: crud<GEI2PConnectorDataQualityResult>(GEI2P5_TABLE_NAMES.GEI2PConnectorDataQualityResult),
    conflictResolutions: crud<GEI2PConnectorConflictResolution>(GEI2P5_TABLE_NAMES.GEI2PConnectorConflictResolution),
    schedules: crud<GEI2PConnectorSchedule>(GEI2P5_TABLE_NAMES.GEI2PConnectorSchedule),
    webhooks: crud<GEI2PConnectorWebhook>(GEI2P5_TABLE_NAMES.GEI2PConnectorWebhook),
    webhookLogs: crud<GEI2PConnectorWebhookLog>(GEI2P5_TABLE_NAMES.GEI2PConnectorWebhookLog),
    templates: crud<GEI2PConnectorTemplate>(GEI2P5_TABLE_NAMES.GEI2PConnectorTemplate),
    usageLogs: crud<GEI2PConnectorUsageLog>(GEI2P5_TABLE_NAMES.GEI2PConnectorUsageLog),
    compliances: crud<GEI2PConnectorCompliance>(GEI2P5_TABLE_NAMES.GEI2PConnectorCompliance),
    dependencies: crud<GEI2PConnectorDependency>(GEI2P5_TABLE_NAMES.GEI2PConnectorDependency),
  };
}

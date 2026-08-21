import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-8: Sync — Data Synchronization & Conflict Resolution
// ~28 entities × 5 CRUD methods = ~140 methods
// ============================================================================

export interface GEI2PSyncStrategy extends BaseEntity { name: string; description: string; sync_type: 'full'|'incremental'|'delta'|'push'|'pull'|'bidirectional'; conflict_resolution: 'source_wins'|'target_wins'|'newest_wins'|'manual'|'merge'|'custom'; config: Record<string,unknown>; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PSyncJob extends BaseEntity { strategy_id: string; source_system: string; target_system: string; entity_types: string[]; status: 'pending'|'running'|'paused'|'completed'|'failed'|'cancelled'; records_total: number; records_synced: number; records_created: number; records_updated: number; records_deleted: number; records_conflicted: number; started_at: string; completed_at?: string; error_log?: string; }
export interface GEI2PSyncRecord extends BaseEntity { job_id: string; entity_type: string; source_id: string; target_id?: string; action: 'create'|'update'|'delete'|'skip'|'conflict'; source_data: Record<string,unknown>; target_data?: Record<string,unknown>; status: 'pending'|'synced'|'conflicted'|'failed'|'skipped'; error_message?: string; synced_at?: string; }
export interface GEI2PSyncConflict extends BaseEntity { record_id: string; conflict_type: 'data_mismatch'|'version_conflict'|'constraint_violation'|'schema_mismatch'; source_data: Record<string,unknown>; target_data: Record<string,unknown>; resolution?: Record<string,unknown>; resolution_strategy: string; status: 'pending'|'resolved'|'escalated'|'ignored'; resolved_by?: string; resolved_at?: string; }
export interface GEI2PSyncCheckpoint extends BaseEntity { job_id: string; entity_type: string; last_source_id: string; last_target_id: string; last_source_timestamp: string; last_target_timestamp: string; records_synced: number; created_at_checkpoint: string; }
export interface GEI2PSyncMapping extends BaseEntity { strategy_id: string; entity_type: string; source_fields: Record<string,string>; transform_rules: Record<string,unknown>[]; default_values: Record<string,unknown>; direction: 'source_to_target'|'target_to_source'|'bidirectional'; active: boolean; }
export interface GEI2PSyncHealth extends BaseEntity { strategy_id: string; status: 'healthy'|'degraded'|'down'; last_successful_sync: string; avg_sync_duration_ms: number; error_rate: number; uptime_percent: number; }
export interface GEI2PSyncLog extends BaseEntity { job_id: string; record_id?: string; level: 'info'|'warn'|'error'|'debug'; message: string; context: Record<string,unknown>; timestamp: string; }
export interface GEI2PSyncNotification extends BaseEntity { job_id: string; type: 'started'|'completed'|'failed'|'conflict'|'cancelled'; title: string; message: string; read: boolean; read_at?: string; sent_at: string; }
export interface GEI2PSyncAuditLog extends BaseEntity { job_id: string; action: string; actor_did: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }
export interface GEI2PSyncSchedule extends BaseEntity { strategy_id: string; schedule_type: 'interval'|'cron'|'manual'|'event_driven'; cron_expression?: string; interval_minutes?: number; event_trigger?: string; enabled: boolean; last_run_at?: string; next_run_at?: string; }
export interface GEI2PSyncRetryPolicy extends BaseEntity { strategy_id: string; max_retries: number; retry_delay_ms: number; backoff_multiplier: number; retry_on: string[]; enabled: boolean; }
export interface GEI2PSyncMetric extends BaseEntity { strategy_id: string; metric_name: string; value: number; unit: string; dimension: Record<string,string>; timestamp: string; }
export interface GEI2PSyncAlert extends BaseEntity { strategy_id: string; alert_type: 'failure'|'conflict_spike'|'latency_high'|'data_drift'|'connection_lost'; severity: 'low'|'medium'|'high'|'critical'; title: string; message: string; resolved: boolean; resolved_at?: string; }
export interface GEI2PSyncDataQuality extends BaseEntity { job_id: string; entity_type: string; total_records: number; valid_records: number; invalid_records: number; quality_score: number; issues: Record<string,unknown>[]; checked_at: string; }
export interface GEI2PSyncVersion extends BaseEntity { strategy_id: string; version: number; snapshot: Record<string,unknown>; change_summary: string; created_by: string; }
export interface GEI2PSyncBackup extends BaseEntity { job_id: string; backup_type: 'full'|'incremental'; file_url: string; checksum: string; record_count: number; created_at_backup: string; expires_at: string; }
export interface GEI2PSyncMetadata extends BaseEntity { entity_type: string; entity_id: string; key: string; value: unknown; source: string; added_at: string; }
export interface GEI2PSyncComparison extends BaseEntity { job_id: string; entity_type: string; source_count: number; target_count: number; matched: number; unmatched_source: number; unmatched_target: number; differences: Record<string,unknown>[]; compared_at: string; }
export interface GEI2PSyncBatchOperation extends BaseEntity { job_id: string; operation_type: 'create'|'update'|'delete'; batch_size: number; batch_index: number; records_in_batch: number; status: 'pending'|'processing'|'completed'|'failed'; started_at: string; completed_at?: string; }
export interface GEI2PSyncSchemaMapping extends BaseEntity { strategy_id: string; source_schema: Record<string,unknown>; target_schema: Record<string,unknown>; field_mappings: Record<string,unknown>[]; type_conversions: Record<string,unknown>; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PSyncConnectionPool extends BaseEntity { strategy_id: string; pool_name: string; min_connections: number; max_connections: number; active_connections: number; idle_connections: number; status: 'healthy'|'exhausted'|'error'; }
export interface GEI2PSyncTransactionLog extends BaseEntity { job_id: string; transaction_id: string; operations: Record<string,unknown>[]; status: 'pending'|'committed'|'rolled_back'|'partial'; created_at: string; completed_at?: string; }
export interface GEI2PSyncLock extends BaseEntity { job_id: string; entity_type: string; entity_id: string; lock_type: 'source'|'target'|'both'; acquired_at: string; expires_at: string; released: boolean; released_at?: string; }
export interface GEI2PSyncValidationResult extends BaseEntity { job_id: string; entity_type: string; validation_type: 'schema'|'business'|'referential'|'format'; passed: boolean; total_checked: number; total_failed: number; details: Record<string,unknown>[]; checked_at: string; }
export interface GEI2PSyncCompliance extends BaseEntity { strategy_id: string; regulation: string; status: 'compliant'|'non_compliant'|'pending_review'; checked_at: string; details: Record<string,unknown>; }
export interface GEI2PSyncPerformanceReport extends BaseEntity { strategy_id: string; period: string; total_syncs: number; avg_duration_ms: number; total_records: number; success_rate: number; conflict_rate: number; generated_at: string; }
export interface GEI2PSyncErrorPattern extends BaseEntity { strategy_id: string; error_type: string; error_count: number; affected_entities: string[]; first_seen: string; last_seen: string; resolution?: string; }
export interface GEI2PSyncConsistencyCheck extends BaseEntity { job_id: string; source_checksum: string; target_checksum: string; consistent: boolean; differences: Record<string,unknown>[]; checked_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P8_TABLE_NAMES: Record<string, string> = {
  GEI2PSyncStrategy: 'gei2p_sync_strategies',
  GEI2PSyncJob: 'gei2p_sync_jobs',
  GEI2PSyncRecord: 'gei2p_sync_records',
  GEI2PSyncConflict: 'gei2p_sync_conflicts',
  GEI2PSyncCheckpoint: 'gei2p_sync_checkpoints',
  GEI2PSyncMapping: 'gei2p_sync_mappings',
  GEI2PSyncHealth: 'gei2p_sync_health',
  GEI2PSyncLog: 'gei2p_sync_logs',
  GEI2PSyncNotification: 'gei2p_sync_notifications',
  GEI2PSyncAuditLog: 'gei2p_sync_audit_logs',
  GEI2PSyncSchedule: 'gei2p_sync_schedules',
  GEI2PSyncRetryPolicy: 'gei2p_sync_retry_policies',
  GEI2PSyncMetric: 'gei2p_sync_metrics',
  GEI2PSyncAlert: 'gei2p_sync_alerts',
  GEI2PSyncDataQuality: 'gei2p_sync_data_qualities',
  GEI2PSyncVersion: 'gei2p_sync_versions',
  GEI2PSyncBackup: 'gei2p_sync_backups',
  GEI2PSyncMetadata: 'gei2p_sync_metadata',
  GEI2PSyncComparison: 'gei2p_sync_comparisons',
  GEI2PSyncBatchOperation: 'gei2p_sync_batch_operations',
  GEI2PSyncSchemaMapping: 'gei2p_sync_schema_mappings',
  GEI2PSyncConnectionPool: 'gei2p_sync_connection_pools',
  GEI2PSyncTransactionLog: 'gei2p_sync_transaction_logs',
  GEI2PSyncLock: 'gei2p_sync_locks',
  GEI2PSyncValidationResult: 'gei2p_sync_validation_results',
  GEI2PSyncCompliance: 'gei2p_sync_compliances',
  GEI2PSyncPerformanceReport: 'gei2p_sync_performance_reports',
  GEI2PSyncErrorPattern: 'gei2p_sync_error_patterns',
  GEI2PSyncConsistencyCheck: 'gei2p_sync_consistency_checks',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEI2P8Repository {
  strategies: CrudRepository<GEI2PSyncStrategy>;
  jobs: CrudRepository<GEI2PSyncJob>;
  records: CrudRepository<GEI2PSyncRecord>;
  conflicts: CrudRepository<GEI2PSyncConflict>;
  checkpoints: CrudRepository<GEI2PSyncCheckpoint>;
  mappings: CrudRepository<GEI2PSyncMapping>;
  health: CrudRepository<GEI2PSyncHealth>;
  logs: CrudRepository<GEI2PSyncLog>;
  notifications: CrudRepository<GEI2PSyncNotification>;
  auditLogs: CrudRepository<GEI2PSyncAuditLog>;
  schedules: CrudRepository<GEI2PSyncSchedule>;
  retryPolicies: CrudRepository<GEI2PSyncRetryPolicy>;
  metrics: CrudRepository<GEI2PSyncMetric>;
  alerts: CrudRepository<GEI2PSyncAlert>;
  dataQualities: CrudRepository<GEI2PSyncDataQuality>;
  versions: CrudRepository<GEI2PSyncVersion>;
  backups: CrudRepository<GEI2PSyncBackup>;
  metadataEntries: CrudRepository<GEI2PSyncMetadata>;
  comparisons: CrudRepository<GEI2PSyncComparison>;
  batchOperations: CrudRepository<GEI2PSyncBatchOperation>;
  schemaMappings: CrudRepository<GEI2PSyncSchemaMapping>;
  connectionPools: CrudRepository<GEI2PSyncConnectionPool>;
  transactionLogs: CrudRepository<GEI2PSyncTransactionLog>;
  locks: CrudRepository<GEI2PSyncLock>;
  validationResults: CrudRepository<GEI2PSyncValidationResult>;
  compliances: CrudRepository<GEI2PSyncCompliance>;
  performanceReports: CrudRepository<GEI2PSyncPerformanceReport>;
  errorPatterns: CrudRepository<GEI2PSyncErrorPattern>;
  consistencyChecks: CrudRepository<GEI2PSyncConsistencyCheck>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P8Repository(supabase: SupabaseClient): GEI2P8Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    strategies: crud<GEI2PSyncStrategy>(GEI2P8_TABLE_NAMES.GEI2PSyncStrategy),
    jobs: crud<GEI2PSyncJob>(GEI2P8_TABLE_NAMES.GEI2PSyncJob),
    records: crud<GEI2PSyncRecord>(GEI2P8_TABLE_NAMES.GEI2PSyncRecord),
    conflicts: crud<GEI2PSyncConflict>(GEI2P8_TABLE_NAMES.GEI2PSyncConflict),
    checkpoints: crud<GEI2PSyncCheckpoint>(GEI2P8_TABLE_NAMES.GEI2PSyncCheckpoint),
    mappings: crud<GEI2PSyncMapping>(GEI2P8_TABLE_NAMES.GEI2PSyncMapping),
    health: crud<GEI2PSyncHealth>(GEI2P8_TABLE_NAMES.GEI2PSyncHealth),
    logs: crud<GEI2PSyncLog>(GEI2P8_TABLE_NAMES.GEI2PSyncLog),
    notifications: crud<GEI2PSyncNotification>(GEI2P8_TABLE_NAMES.GEI2PSyncNotification),
    auditLogs: crud<GEI2PSyncAuditLog>(GEI2P8_TABLE_NAMES.GEI2PSyncAuditLog),
    schedules: crud<GEI2PSyncSchedule>(GEI2P8_TABLE_NAMES.GEI2PSyncSchedule),
    retryPolicies: crud<GEI2PSyncRetryPolicy>(GEI2P8_TABLE_NAMES.GEI2PSyncRetryPolicy),
    metrics: crud<GEI2PSyncMetric>(GEI2P8_TABLE_NAMES.GEI2PSyncMetric),
    alerts: crud<GEI2PSyncAlert>(GEI2P8_TABLE_NAMES.GEI2PSyncAlert),
    dataQualities: crud<GEI2PSyncDataQuality>(GEI2P8_TABLE_NAMES.GEI2PSyncDataQuality),
    versions: crud<GEI2PSyncVersion>(GEI2P8_TABLE_NAMES.GEI2PSyncVersion),
    backups: crud<GEI2PSyncBackup>(GEI2P8_TABLE_NAMES.GEI2PSyncBackup),
    metadataEntries: crud<GEI2PSyncMetadata>(GEI2P8_TABLE_NAMES.GEI2PSyncMetadata),
    comparisons: crud<GEI2PSyncComparison>(GEI2P8_TABLE_NAMES.GEI2PSyncComparison),
    batchOperations: crud<GEI2PSyncBatchOperation>(GEI2P8_TABLE_NAMES.GEI2PSyncBatchOperation),
    schemaMappings: crud<GEI2PSyncSchemaMapping>(GEI2P8_TABLE_NAMES.GEI2PSyncSchemaMapping),
    connectionPools: crud<GEI2PSyncConnectionPool>(GEI2P8_TABLE_NAMES.GEI2PSyncConnectionPool),
    transactionLogs: crud<GEI2PSyncTransactionLog>(GEI2P8_TABLE_NAMES.GEI2PSyncTransactionLog),
    locks: crud<GEI2PSyncLock>(GEI2P8_TABLE_NAMES.GEI2PSyncLock),
    validationResults: crud<GEI2PSyncValidationResult>(GEI2P8_TABLE_NAMES.GEI2PSyncValidationResult),
    compliances: crud<GEI2PSyncCompliance>(GEI2P8_TABLE_NAMES.GEI2PSyncCompliance),
    performanceReports: crud<GEI2PSyncPerformanceReport>(GEI2P8_TABLE_NAMES.GEI2PSyncPerformanceReport),
    errorPatterns: crud<GEI2PSyncErrorPattern>(GEI2P8_TABLE_NAMES.GEI2PSyncErrorPattern),
    consistencyChecks: crud<GEI2PSyncConsistencyCheck>(GEI2P8_TABLE_NAMES.GEI2PSyncConsistencyCheck),
  };
}

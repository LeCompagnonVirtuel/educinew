import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-7: Events — Event-Driven Architecture & Event Sourcing
// ~28 entities × 5 CRUD methods = ~140 methods
// ============================================================================

export interface GEI2PEventDefinition extends BaseEntity { name: string; version: string; description: string; category: 'academic'|'admin'|'finance'|'student'| 'teacher'|'system'|'integration'; schema: Record<string,unknown>; severity: 'info'|'warning'|'error'|'critical'; retention_days: number; status: 'active'|'deprecated'; }
export interface GEI2PEventRecord extends BaseEntity { event_type: string; source: string; aggregate_id: string; aggregate_type: string; payload: Record<string,unknown>; metadata: Record<string,unknown>; sequence_number: number; timestamp: string; published: boolean; published_at?: string; }
export interface GEI2PEventSubscription extends BaseEntity { subscriber_id: string; event_type: string; filter_config: Record<string,unknown>; delivery_type: 'webhook'|'email'| 'sms'| 'queue'|'websocket'; endpoint?: string; active: boolean; created_at: string; }
export interface GEI2PEventDelivery extends BaseEntity { event_id: string; subscription_id: string; delivery_type: string; status: 'pending'|'delivered'|'failed'|'retrying'; attempts: number; max_attempts: number; last_attempt_at?: string; delivered_at?: string; error_message?: string; }
export interface GEI2PEventDeadLetter extends BaseEntity { event_id: string; original_payload: Record<string,unknown>; error_message: string; retry_count: number; max_retries: number; status: 'pending'|'reprocessed'|'discarded'; created_at_dl: string; }
export interface GEI2PEventReplay extends BaseEntity { name: string; description: string; start_timestamp: string; end_timestamp?: string; event_types: string[]; filter_config: Record<string,unknown>; status: 'pending'|'running'|'completed'|'failed'; events_processed: number; started_at: string; completed_at?: string; }
export interface GEI2PEventReplayResult extends BaseEntity { replay_id: string; event_id: string; original_timestamp: string; replayed_at: string; result: 'success'|'failed'|'skipped'; error_message?: string; }
export interface GEI2PEventSnapshot extends BaseEntity { aggregate_id: string; aggregate_type: string; snapshot_version: number; data: Record<string,unknown>; event_count: number; created_at_snapshot: string; }
export interface GEI2PEventProjection extends BaseEntity { name: string; description: string; event_types: string[]; projection_config: Record<string,unknown>; status: 'active'|'paused'|'rebuilding'; last_built_at?: string; }
export interface GEI2PEventProjectionState extends BaseEntity { projection_id: string; last_event_sequence: number; last_built_at: string; status: 'up_to_date'|'building'|'error'; }
export interface GEI2PEventAuditLog extends BaseEntity { event_id: string; action: string; actor_did: string; details: Record<string,unknown>; timestamp: string; }
export interface GEI2PEventMetric extends BaseEntity { event_type: string; metric_name: string; value: number; unit: string; dimension: Record<string,string>; timestamp: string; }
export interface GEI2PEventAlert extends BaseEntity { alert_type: 'dead_letter_backlog'|'delivery_failure'|'latency_spike'|'volume_anomaly'; severity: 'low'|'medium'|'high'|'critical'; title: string; message: string; resolved: boolean; resolved_at?: string; }
export interface GEI2PEventNotification extends BaseEntity { recipient_id: string; type: 'event_received'|'subscription_update'|'delivery_failure'|'system_alert'; title: string; message: string; read: boolean; read_at?: string; sent_at: string; }
export interface GEI2PEventBackup extends BaseEntity { event_type: string; backup_type: 'full'|'incremental'; file_url: string; checksum: string; record_count: number; created_at_backup: string; expires_at: string; }
export interface GEI2PEventVersion extends BaseEntity { event_type: string; version: number; schema: Record<string,unknown>; breaking_changes: string[]; migration_guide?: string; created_by: string; }
export interface GEI2PEventMetadata extends BaseEntity { event_id: string; key: string; value: unknown; source: string; added_at: string; }
export interface GEI2PEventCorrelation extends BaseEntity { correlation_id: string; event_ids: string[]; description: string; created_at: string; }
export interface GEI2PEventCausation extends BaseEntity { cause_event_id: string; effect_event_id: string; relationship: string; }
export interface GEI2PEventFilter extends BaseEntity { name: string; description: string; filter_config: Record<string,unknown>; event_types: string[]; active: boolean; }
export interface GEI2PEventTransformation extends BaseEntity { name: string; source_event_type: string; target_event_type: string; transform_config: Record<string,unknown>; active: boolean; }
export interface GEI2PEventEnrichment extends BaseEntity { name: string; event_type: string; enrichment_type: 'lookup'|'aggregate'|'calculate'|'external_api'; config: Record<string,unknown>; active: boolean; }
export interface GEI2PEventRateConfig extends BaseEntity { event_type: string; max_per_second: number; max_per_minute: number; max_per_hour: number; burst_size: number; enabled: boolean; }
export interface GEI2PEventRoutingRule extends BaseEntity { name: string; source_event_type: string; target_subscription_ids: string[]; conditions: Record<string,unknown>[]; priority: number; active: boolean; }
export interface GEI2PEventSchemaValidation extends BaseEntity { event_type: string; validation_mode: 'strict'|'lenient'|'disabled'; schema: Record<string,unknown>; custom_validators: Record<string,unknown>[]; enabled: boolean; }
export interface GEI2PEventCompliance extends BaseEntity { event_type: string; regulation: string; status: 'compliant'|'non_compliant'|'pending_review'; checked_at: string; details: Record<string,unknown>; }
export interface GEI2PEventRetentionPolicy extends BaseEntity { event_type: string; retention_days: number; archive_before_delete: boolean; archive_storage: string; enabled: boolean; }
export interface GEI2PEventArchive extends BaseEntity { event_type: string; archive_url: string; record_count: number; date_range_start: string; date_range_end: string; checksum: string; created_at_archive: string; }
export interface GEI2PEventConsumerGroup extends BaseEntity { name: string; description: string; subscriber_ids: string[]; event_types: string[]; status: 'active'|'paused'; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P7_TABLE_NAMES: Record<string, string> = {
  GEI2PEventDefinition: 'gei2p_event_definitions',
  GEI2PEventRecord: 'gei2p_event_records',
  GEI2PEventSubscription: 'gei2p_event_subscriptions',
  GEI2PEventDelivery: 'gei2p_event_deliveries',
  GEI2PEventDeadLetter: 'gei2p_event_dead_letters',
  GEI2PEventReplay: 'gei2p_event_replays',
  GEI2PEventReplayResult: 'gei2p_event_replay_results',
  GEI2PEventSnapshot: 'gei2p_event_snapshots',
  GEI2PEventProjection: 'gei2p_event_projections',
  GEI2PEventProjectionState: 'gei2p_event_projection_states',
  GEI2PEventAuditLog: 'gei2p_event_audit_logs',
  GEI2PEventMetric: 'gei2p_event_metrics',
  GEI2PEventAlert: 'gei2p_event_alerts',
  GEI2PEventNotification: 'gei2p_event_notifications',
  GEI2PEventBackup: 'gei2p_event_backups',
  GEI2PEventVersion: 'gei2p_event_versions',
  GEI2PEventMetadata: 'gei2p_event_metadata',
  GEI2PEventCorrelation: 'gei2p_event_correlations',
  GEI2PEventCausation: 'gei2p_event_causations',
  GEI2PEventFilter: 'gei2p_event_filters',
  GEI2PEventTransformation: 'gei2p_event_transformations',
  GEI2PEventEnrichment: 'gei2p_event_enrichments',
  GEI2PEventRateConfig: 'gei2p_event_rate_configs',
  GEI2PEventRoutingRule: 'gei2p_event_routing_rules',
  GEI2PEventSchemaValidation: 'gei2p_event_schema_validations',
  GEI2PEventCompliance: 'gei2p_event_compliances',
  GEI2PEventRetentionPolicy: 'gei2p_event_retention_policies',
  GEI2PEventArchive: 'gei2p_event_archives',
  GEI2PEventConsumerGroup: 'gei2p_event_consumer_groups',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEI2P7Repository {
  definitions: CrudRepository<GEI2PEventDefinition>;
  records: CrudRepository<GEI2PEventRecord>;
  subscriptions: CrudRepository<GEI2PEventSubscription>;
  deliveries: CrudRepository<GEI2PEventDelivery>;
  deadLetters: CrudRepository<GEI2PEventDeadLetter>;
  replays: CrudRepository<GEI2PEventReplay>;
  replayResults: CrudRepository<GEI2PEventReplayResult>;
  snapshots: CrudRepository<GEI2PEventSnapshot>;
  projections: CrudRepository<GEI2PEventProjection>;
  projectionStates: CrudRepository<GEI2PEventProjectionState>;
  auditLogs: CrudRepository<GEI2PEventAuditLog>;
  metrics: CrudRepository<GEI2PEventMetric>;
  alerts: CrudRepository<GEI2PEventAlert>;
  notifications: CrudRepository<GEI2PEventNotification>;
  backups: CrudRepository<GEI2PEventBackup>;
  versions: CrudRepository<GEI2PEventVersion>;
  metadataEntries: CrudRepository<GEI2PEventMetadata>;
  correlations: CrudRepository<GEI2PEventCorrelation>;
  causations: CrudRepository<GEI2PEventCausation>;
  filters: CrudRepository<GEI2PEventFilter>;
  transformations: CrudRepository<GEI2PEventTransformation>;
  enrichments: CrudRepository<GEI2PEventEnrichment>;
  rateConfigs: CrudRepository<GEI2PEventRateConfig>;
  routingRules: CrudRepository<GEI2PEventRoutingRule>;
  schemaValidations: CrudRepository<GEI2PEventSchemaValidation>;
  compliances: CrudRepository<GEI2PEventCompliance>;
  retentionPolicies: CrudRepository<GEI2PEventRetentionPolicy>;
  archives: CrudRepository<GEI2PEventArchive>;
  consumerGroups: CrudRepository<GEI2PEventConsumerGroup>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P7Repository(supabase: SupabaseClient): GEI2P7Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    definitions: crud<GEI2PEventDefinition>(GEI2P7_TABLE_NAMES.GEI2PEventDefinition),
    records: crud<GEI2PEventRecord>(GEI2P7_TABLE_NAMES.GEI2PEventRecord),
    subscriptions: crud<GEI2PEventSubscription>(GEI2P7_TABLE_NAMES.GEI2PEventSubscription),
    deliveries: crud<GEI2PEventDelivery>(GEI2P7_TABLE_NAMES.GEI2PEventDelivery),
    deadLetters: crud<GEI2PEventDeadLetter>(GEI2P7_TABLE_NAMES.GEI2PEventDeadLetter),
    replays: crud<GEI2PEventReplay>(GEI2P7_TABLE_NAMES.GEI2PEventReplay),
    replayResults: crud<GEI2PEventReplayResult>(GEI2P7_TABLE_NAMES.GEI2PEventReplayResult),
    snapshots: crud<GEI2PEventSnapshot>(GEI2P7_TABLE_NAMES.GEI2PEventSnapshot),
    projections: crud<GEI2PEventProjection>(GEI2P7_TABLE_NAMES.GEI2PEventProjection),
    projectionStates: crud<GEI2PEventProjectionState>(GEI2P7_TABLE_NAMES.GEI2PEventProjectionState),
    auditLogs: crud<GEI2PEventAuditLog>(GEI2P7_TABLE_NAMES.GEI2PEventAuditLog),
    metrics: crud<GEI2PEventMetric>(GEI2P7_TABLE_NAMES.GEI2PEventMetric),
    alerts: crud<GEI2PEventAlert>(GEI2P7_TABLE_NAMES.GEI2PEventAlert),
    notifications: crud<GEI2PEventNotification>(GEI2P7_TABLE_NAMES.GEI2PEventNotification),
    backups: crud<GEI2PEventBackup>(GEI2P7_TABLE_NAMES.GEI2PEventBackup),
    versions: crud<GEI2PEventVersion>(GEI2P7_TABLE_NAMES.GEI2PEventVersion),
    metadataEntries: crud<GEI2PEventMetadata>(GEI2P7_TABLE_NAMES.GEI2PEventMetadata),
    correlations: crud<GEI2PEventCorrelation>(GEI2P7_TABLE_NAMES.GEI2PEventCorrelation),
    causations: crud<GEI2PEventCausation>(GEI2P7_TABLE_NAMES.GEI2PEventCausation),
    filters: crud<GEI2PEventFilter>(GEI2P7_TABLE_NAMES.GEI2PEventFilter),
    transformations: crud<GEI2PEventTransformation>(GEI2P7_TABLE_NAMES.GEI2PEventTransformation),
    enrichments: crud<GEI2PEventEnrichment>(GEI2P7_TABLE_NAMES.GEI2PEventEnrichment),
    rateConfigs: crud<GEI2PEventRateConfig>(GEI2P7_TABLE_NAMES.GEI2PEventRateConfig),
    routingRules: crud<GEI2PEventRoutingRule>(GEI2P7_TABLE_NAMES.GEI2PEventRoutingRule),
    schemaValidations: crud<GEI2PEventSchemaValidation>(GEI2P7_TABLE_NAMES.GEI2PEventSchemaValidation),
    compliances: crud<GEI2PEventCompliance>(GEI2P7_TABLE_NAMES.GEI2PEventCompliance),
    retentionPolicies: crud<GEI2PEventRetentionPolicy>(GEI2P7_TABLE_NAMES.GEI2PEventRetentionPolicy),
    archives: crud<GEI2PEventArchive>(GEI2P7_TABLE_NAMES.GEI2PEventArchive),
    consumerGroups: crud<GEI2PEventConsumerGroup>(GEI2P7_TABLE_NAMES.GEI2PEventConsumerGroup),
  };
}

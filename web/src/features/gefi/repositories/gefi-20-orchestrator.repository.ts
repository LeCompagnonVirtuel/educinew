import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-20: Orchestrator — Workflow, Integration, Event, API Management
// ============================================================================

export interface GEFIGlobalWorkflow extends BaseEntity { name: string; description: string; trigger_type: 'MANUAL'|'SCHEDULED'|'EVENT'|'API'|'WEBHOOK'; trigger_config: Record<string,unknown>; steps: Record<string,unknown>[]; variables: Record<string,unknown>; status: 'DRAFT'|'ACTIVE'|'PAUSED'|'COMPLETED'|'FAILED'; version: number; run_count: number; avg_duration_ms: number; metadata: Record<string,unknown>; }
export interface GEFIGlobalWorkflowRun extends BaseEntity { workflow_id: string; triggered_by: string; trigger_data: Record<string,unknown>; input: Record<string,unknown>; output?: Record<string,unknown>; status: 'PENDING'|'RUNNING'|'COMPLETED'|'FAILED'|'CANCELLED'; started_at: string; completed_at?: string; duration_ms?: number; error?: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalWorkflowStepRun extends BaseEntity { workflow_run_id: string; step_name: string; step_type: string; input: Record<string,unknown>; output?: Record<string,unknown>; status: 'PENDING'|'RUNNING'|'COMPLETED'|'FAILED'|'SKIPPED'; started_at?: string; completed_at?: string; duration_ms?: number; error?: string; retry_count: number; metadata: Record<string,unknown>; }
export interface GEFIGlobalEventBus extends BaseEntity { name: string; description: string; event_types: string[]; max_retries: number; retry_delay_ms: number; dead_letter_enabled: boolean; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIGlobalEvent extends BaseEntity { bus_id: string; event_type: string; source: string; payload: Record<string,unknown>; priority: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; published_at: string; processed: boolean; processed_at?: string; retry_count: number; max_retries: number; status: 'PENDING'|'PROCESSING'|'COMPLETED'|'FAILED'|'DEAD_LETTER'; metadata: Record<string,unknown>; }
export interface GEFIGlobalEventSubscription extends BaseEntity { bus_id: string; event_type: string; subscriber_name: string; subscriber_url: string; filter_expression?: string; status: 'ACTIVE'|'INACTIVE'; last_delivered_at?: string; delivery_count: number; failure_count: number; metadata: Record<string,unknown>; }
export interface GEFIGlobalIntegration extends BaseEntity { name: string; description: string; type: 'API'|'WEBHOOK'|'SDK'|'CONNECTOR'|'FILE_TRANSFER'; provider: string; config: Record<string,unknown>; auth_type: string; status: 'ACTIVE'|'INACTIVE'|'ERROR'; last_health_check: string; error_count: number; metadata: Record<string,unknown>; }
export interface GEFIGlobalIntegrationEndpoint extends BaseEntity { integration_id: string; name: string; url: string; method: string; headers: Record<string,string>; timeout_ms: number; retry_count: number; rate_limit: number; status: 'ACTIVE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIGlobalAPIGateway extends BaseEntity { name: string; base_url: string; version: string; rate_limit: number; rate_window_seconds: number; auth_required: boolean; cors_origins: string[]; status: 'ACTIVE'|'MAINTENANCE'|'INACTIVE'; metadata: Record<string,unknown>; }
export interface GEFIGlobalAPIRoute extends BaseEntity { gateway_id: string; path: string; method: string; backend_url: string; timeout_ms: number; rate_limit: number; auth_required: boolean; cache_ttl: number; status: 'ACTIVE'|'INACTIVE'|'DEPRECATED'; metadata: Record<string,unknown>; }
export interface GEFIGlobalAPILog extends BaseEntity { route_id: string; request_id: string; method: string; path: string; status_code: number; duration_ms: number; request_size: number; response_size: number; ip_address: string; user_agent: string; user_id?: string; error_message?: string; timestamp: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalAPIKey extends BaseEntity { name: string; key_hash: string; owner_id: string; scopes: string[]; rate_limit: number; expires_at?: string; last_used_at?: string; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIGlobalWebhook extends BaseEntity { name: string; url: string; secret: string; events: string[]; headers: Record<string,string>; status: 'ACTIVE'|'INACTIVE'; last_triggered_at?: string; failure_count: number; metadata: Record<string,unknown>; }
export interface GEFIGlobalWebhookDelivery extends BaseEntity { webhook_id: string; event_type: string; payload: Record<string,unknown>; status: 'PENDING'|'DELIVERED'|'FAILED'|'RETRYING'; response_code?: number; response_body?: string; attempts: number; next_retry_at?: string; delivered_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalConnector extends BaseEntity { name: string; type: 'SOURCE'|'DESTINATION'|'TRANSFORM'|'FILTER'|'AGGREGATE'; provider: string; config: Record<string,unknown>; input_schema: Record<string,unknown>; output_schema: Record<string,unknown>; status: 'ACTIVE'|'INACTIVE'|'ERROR'; last_sync_at?: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalConnectorMapping extends BaseEntity { source_connector_id: string; target_connector_id: string; field_mappings: Record<string,string>; transform_rules: Record<string,unknown>; is_active: boolean; metadata: Record<string,unknown>; }
export interface GEFIGlobalPipeline extends BaseEntity { name: string; description: string; connectors: string[]; schedule?: string; config: Record<string,unknown>; status: 'DRAFT'|'ACTIVE'|'PAUSED'|'ERROR'; last_run_at?: string; next_run_at?: string; run_count: number; metadata: Record<string,unknown>; }
export interface GEFIGlobalPipelineRun extends BaseEntity { pipeline_id: string; status: 'PENDING'|'RUNNING'|'COMPLETED'|'FAILED'; started_at: string; completed_at?: string; duration_ms?: number; records_processed: number; records_failed: number; error?: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalFeatureFlag extends BaseEntity { name: string; description: string; key: string; type: 'BOOLEAN'|'STRING'|'NUMBER'|'JSON'; default_value: unknown; rollout_percentage: number; target_audience: Record<string,unknown>; status: 'ACTIVE'|'INACTIVE'|'ARCHIVED'; created_by: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalFeatureFlagEvaluation extends BaseEntity { flag_id: string; user_id?: string; context: Record<string,unknown>; value: unknown; variant?: string; evaluated_at: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalConfig extends BaseEntity { key: string; value: unknown; category: string; description?: string; is_secret: boolean; version: number; updated_by: string; updated_at: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalConfigVersion extends BaseEntity { config_key: string; value: unknown; version: number; changed_by: string; changed_at: string; change_reason: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalHealthCheck extends BaseEntity { service_name: string; status: 'HEALTHY'|'DEGRADED'|'DOWN'; latency_ms: number; error_rate: number; uptime_percentage: number; last_checked: string; details: Record<string,unknown>; metadata: Record<string,unknown>; }
export interface GEFIGlobalCircuitBreaker extends BaseEntity { service_name: string; failure_threshold: number; recovery_timeout_ms: number; half_open_max_calls: number; current_state: 'CLOSED'|'OPEN'|'HALF_OPEN'; failure_count: number; last_failure_at?: string; last_state_change: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalRateLimit extends BaseEntity { service_name: string; endpoint: string; limit: number; window_seconds: number; current_count: number; window_start: string; status: 'OK'|'EXCEEDED'; metadata: Record<string,unknown>; }
export interface GEFIGlobalCache extends BaseEntity { key: string; value: unknown; ttl_seconds: number; hits: number; misses: number; created_at: string; expires_at: string; metadata: Record<string,unknown>; }
export interface GEFIGlobalAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; user_agent?: string; metadata: Record<string,unknown>; }

export interface GEFI20Repository {
  globalWorkflow: CrudRepository<GEFIGlobalWorkflow>;
  globalWorkflowRun: CrudRepository<GEFIGlobalWorkflowRun>;
  globalWorkflowStepRun: CrudRepository<GEFIGlobalWorkflowStepRun>;
  globalEventBus: CrudRepository<GEFIGlobalEventBus>;
  globalEvent: CrudRepository<GEFIGlobalEvent>;
  globalEventSubscription: CrudRepository<GEFIGlobalEventSubscription>;
  globalIntegration: CrudRepository<GEFIGlobalIntegration>;
  globalIntegrationEndpoint: CrudRepository<GEFIGlobalIntegrationEndpoint>;
  globalAPIGateway: CrudRepository<GEFIGlobalAPIGateway>;
  globalAPIRoute: CrudRepository<GEFIGlobalAPIRoute>;
  globalAPILog: CrudRepository<GEFIGlobalAPILog>;
  globalAPIKey: CrudRepository<GEFIGlobalAPIKey>;
  globalWebhook: CrudRepository<GEFIGlobalWebhook>;
  globalWebhookDelivery: CrudRepository<GEFIGlobalWebhookDelivery>;
  globalConnector: CrudRepository<GEFIGlobalConnector>;
  globalConnectorMapping: CrudRepository<GEFIGlobalConnectorMapping>;
  globalPipeline: CrudRepository<GEFIGlobalPipeline>;
  globalPipelineRun: CrudRepository<GEFIGlobalPipelineRun>;
  globalFeatureFlag: CrudRepository<GEFIGlobalFeatureFlag>;
  globalFeatureFlagEvaluation: CrudRepository<GEFIGlobalFeatureFlagEvaluation>;
  globalConfig: CrudRepository<GEFIGlobalConfig>;
  globalConfigVersion: CrudRepository<GEFIGlobalConfigVersion>;
  globalHealthCheck: CrudRepository<GEFIGlobalHealthCheck>;
  globalCircuitBreaker: CrudRepository<GEFIGlobalCircuitBreaker>;
  globalRateLimit: CrudRepository<GEFIGlobalRateLimit>;
  globalCache: CrudRepository<GEFIGlobalCache>;
  globalAuditTrail: CrudRepository<GEFIGlobalAuditTrail>;
}

export function createGEFI20Repository(supabase: SupabaseClient): GEFI20Repository {
  return {
    globalWorkflow: createCrudRepository<GEFIGlobalWorkflow>(supabase, 'gefi_global_workflows'),
    globalWorkflowRun: createCrudRepository<GEFIGlobalWorkflowRun>(supabase, 'gefi_global_workflow_runs'),
    globalWorkflowStepRun: createCrudRepository<GEFIGlobalWorkflowStepRun>(supabase, 'gefi_global_workflow_step_runs'),
    globalEventBus: createCrudRepository<GEFIGlobalEventBus>(supabase, 'gefi_global_event_buses'),
    globalEvent: createCrudRepository<GEFIGlobalEvent>(supabase, 'gefi_global_events'),
    globalEventSubscription: createCrudRepository<GEFIGlobalEventSubscription>(supabase, 'gefi_global_event_subscriptions'),
    globalIntegration: createCrudRepository<GEFIGlobalIntegration>(supabase, 'gefi_global_integrations'),
    globalIntegrationEndpoint: createCrudRepository<GEFIGlobalIntegrationEndpoint>(supabase, 'gefi_global_integration_endpoints'),
    globalAPIGateway: createCrudRepository<GEFIGlobalAPIGateway>(supabase, 'gefi_global_api_gateways'),
    globalAPIRoute: createCrudRepository<GEFIGlobalAPIRoute>(supabase, 'gefi_global_api_routes'),
    globalAPILog: createCrudRepository<GEFIGlobalAPILog>(supabase, 'gefi_global_api_logs'),
    globalAPIKey: createCrudRepository<GEFIGlobalAPIKey>(supabase, 'gefi_global_api_keys'),
    globalWebhook: createCrudRepository<GEFIGlobalWebhook>(supabase, 'gefi_global_webhooks'),
    globalWebhookDelivery: createCrudRepository<GEFIGlobalWebhookDelivery>(supabase, 'gefi_global_webhook_deliveries'),
    globalConnector: createCrudRepository<GEFIGlobalConnector>(supabase, 'gefi_global_connectors'),
    globalConnectorMapping: createCrudRepository<GEFIGlobalConnectorMapping>(supabase, 'gefi_global_connector_mappings'),
    globalPipeline: createCrudRepository<GEFIGlobalPipeline>(supabase, 'gefi_global_pipelines'),
    globalPipelineRun: createCrudRepository<GEFIGlobalPipelineRun>(supabase, 'gefi_global_pipeline_runs'),
    globalFeatureFlag: createCrudRepository<GEFIGlobalFeatureFlag>(supabase, 'gefi_global_feature_flags'),
    globalFeatureFlagEvaluation: createCrudRepository<GEFIGlobalFeatureFlagEvaluation>(supabase, 'gefi_global_feature_flag_evaluations'),
    globalConfig: createCrudRepository<GEFIGlobalConfig>(supabase, 'gefi_global_configs'),
    globalConfigVersion: createCrudRepository<GEFIGlobalConfigVersion>(supabase, 'gefi_global_config_versions'),
    globalHealthCheck: createCrudRepository<GEFIGlobalHealthCheck>(supabase, 'gefi_global_health_checks'),
    globalCircuitBreaker: createCrudRepository<GEFIGlobalCircuitBreaker>(supabase, 'gefi_global_circuit_breakers'),
    globalRateLimit: createCrudRepository<GEFIGlobalRateLimit>(supabase, 'gefi_global_rate_limits'),
    globalCache: createCrudRepository<GEFIGlobalCache>(supabase, 'gefi_global_cache'),
    globalAuditTrail: createCrudRepository<GEFIGlobalAuditTrail>(supabase, 'gefi_global_audit_trails'),
  };
}

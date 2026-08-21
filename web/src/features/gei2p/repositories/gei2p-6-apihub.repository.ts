import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gei2p-base.repository';

// ============================================================================
// GEI2P-6: API Hub — Centralized API Gateway & Management
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface GEI2PAPIDefinition extends BaseEntity { name: string; version: string; base_url: string; description: string; category: 'academic'|'admin'|'finance'|'student'| 'teacher'|'parent'|'integration'|'system'; auth_type: 'none'|'api_key'|'oauth2'|'jwt'|'basic'; rate_limit: number; status: 'draft'|'active'|'deprecated'|'sunset'; }
export interface GEI2PAPIEndpoint extends BaseEntity { api_id: string; path: string; method: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH'; description: string; request_schema?: Record<string,unknown>; response_schema?: Record<string,unknown>; rate_limit?: number; auth_required: boolean; tags: string[]; status: 'active'|'deprecated'|'disabled'; }
export interface GEI2PAPIClient extends BaseEntity { name: string; description: string; school_id: string; owner_did: string; client_id: string; client_secret_hash: string; scopes: string[]; rate_limit: number; daily_limit: number; monthly_limit: number; status: 'active'|'suspended'|'revoked'; }
export interface GEI2PAPIToken extends BaseEntity { client_id: string; token_hash: string; token_type: 'access'|'refresh'; scopes: string[]; expires_at: string; last_used_at?: string; revoked: boolean; revoked_at?: string; }
export interface GEI2PAPILog extends BaseEntity { client_id: string; endpoint_id: string; method: string; path: string; status_code: number; request_size_bytes: number; response_size_bytes: number; duration_ms: number; ip_address: string; user_agent: string; error_message?: string; timestamp: string; }
export interface GEI2PAPIRateLimit extends BaseEntity { client_id: string; endpoint_id: string; window_type: 'second'|'minute'|'hour'|'day'|'month'; limit: number; current_count: number; window_start: string; }
export interface GEI2PAPIThrottling extends BaseEntity { api_id: string; strategy: 'fixed_window'|'sliding_window'|'token_bucket'|'leaky_bucket'; config: Record<string,unknown>; enabled: boolean; }
export interface GEI2PAPICacheConfig extends BaseEntity { endpoint_id: string; cache_type: 'memory'|'redis'|'cdn'; ttl_seconds: number; key_pattern: string; invalidate_on: string[]; enabled: boolean; }
export interface GEI2PAPICacheLog extends BaseEntity { endpoint_id: string; cache_key: string; hit: boolean; ttl_remaining?: number; served_at: string; }
export interface GEI2PAPIValidationRule extends BaseEntity { endpoint_id: string; rule_type: 'schema'|'business'| 'security'|'format'; rule_config: Record<string,unknown>; error_message: string; severity: 'error'|'warning'; active: boolean; }
export interface GEI2PAPIValidationLog extends BaseEntity { rule_id: string; request_id: string; passed: boolean; details: Record<string,unknown>; checked_at: string; }
export interface GEI2PAPITransform extends BaseEntity { endpoint_id: string; name: string; transform_type: 'request'|'response'|'both'; config: Record<string,unknown>; order: number; active: boolean; }
export interface GEI2PAPIWebhook extends BaseEntity { api_id: string; name: string; url: string; secret: string; events: string[]; active: boolean; retry_count: number; last_triggered_at?: string; failure_count: number; }
export interface GEI2PAPIWebhookLog extends BaseEntity { webhook_id: string; event_type: string; payload: Record<string,unknown>; response_status?: number; response_body?: string; delivered: boolean; delivered_at: string; duration_ms: number; }
export interface GEI2PAPIVersion extends BaseEntity { api_id: string; version: string; status: 'draft'|'active'|'deprecated'|'sunset'; release_date: string; sunset_date?: string; changelog: string; breaking_changes: string[]; }
export interface GEI2PAPIDocumentation extends BaseEntity { api_id: string; version: string; content: string; format: 'openapi'|'markdown'|'html'; auto_generated: boolean; last_generated_at: string; }
export interface GEI2PAPISDK extends BaseEntity { api_id: string; language: string; version: string; package_name: string; download_url: string; generated_at: string; status: 'active'|'deprecated'; }
export interface GEI2PAPIMockServer extends BaseEntity { api_id: string; name: string; base_url: string; response_delay_ms: number; config: Record<string,unknown>; active: boolean; }
export interface GEI2PAPIHealthCheck extends BaseEntity { api_id: string; status: 'healthy'|'degraded'|'down'; latency_ms: number; uptime_percent: number; last_checked_at: string; }
export interface GEI2PAPIMetric extends BaseEntity { api_id: string; metric_name: string; value: number; unit: string; dimension: Record<string,string>; timestamp: string; }
export interface GEI2PAPIDashboard extends BaseEntity { name: string; description: string; api_ids: string[]; widgets: Record<string,unknown>[]; layout: Record<string,unknown>; is_default: boolean; }
export interface GEI2PAPIAlert extends BaseEntity { api_id: string; alert_type: 'error_rate'|'latency'| 'rate_limit'|'downtime'|'security'; severity: 'low'|'medium'|'high'|'critical'; title: string; message: string; resolved: boolean; resolved_at?: string; }
export interface GEI2PAPISecurityPolicy extends BaseEntity { api_id: string; policy_type: 'cors'|'csrf'|'xss'|'injection'|'authentication'; rules: Record<string,unknown>[]; enabled: boolean; }
export interface GEI2PAPIAccessLog extends BaseEntity { api_id: string; client_id: string; action: string; resource: string; granted: boolean; ip_address: string; timestamp: string; }
export interface GEI2PAPICompliance extends BaseEntity { api_id: string; regulation: string; status: 'compliant'|'non_compliant'|'pending_review'; checked_at: string; details: Record<string,unknown>; }
export interface GEI2PAPIAuditLog extends BaseEntity { api_id: string; action: string; actor_did: string; details: Record<string,unknown>; ip_address: string; timestamp: string; }
export interface GEI2PAPINotification extends BaseEntity { api_id: string; type: 'deprecation'|'outage'|'security'|'update'|'rate_limit'; title: string; message: string; read: boolean; read_at?: string; sent_at: string; }
export interface GEI2PAPIUsageQuota extends BaseEntity { client_id: string; quota_type: 'daily'|'monthly'|'yearly'; limit: number; used: number; period: string; resets_at: string; }
export interface GEI2PAPIBackup extends BaseEntity { api_id: string; backup_type: 'config'|'logs'|'full'; file_url: string; checksum: string; created_at_backup: string; expires_at: string; }
export interface GEI2PAPITemplate extends BaseEntity { name: string; description: string; api_type: string; template_config: Record<string,unknown>; tags: string[]; usage_count: number; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PAPITestCase extends BaseEntity { endpoint_id: string; name: string; description: string; method: string; path: string; headers: Record<string,string>; body?: Record<string,unknown>; expected_status: number; expected_response?: Record<string,unknown>; status: 'draft'|'active'|'deprecated'; }
export interface GEI2PAPITestResult extends BaseEntity { test_case_id: string; passed: boolean; actual_status: number; actual_response?: Record<string,unknown>; duration_ms: number; error_message?: string; executed_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const GEI2P6_TABLE_NAMES: Record<string, string> = {
  GEI2PAPIDefinition: 'gei2p_api_definitions',
  GEI2PAPIEndpoint: 'gei2p_api_endpoints',
  GEI2PAPIClient: 'gei2p_api_clients',
  GEI2PAPIToken: 'gei2p_api_tokens',
  GEI2PAPILog: 'gei2p_api_logs',
  GEI2PAPIRateLimit: 'gei2p_api_rate_limits',
  GEI2PAPIThrottling: 'gei2p_api_throttlings',
  GEI2PAPICacheConfig: 'gei2p_api_cache_configs',
  GEI2PAPICacheLog: 'gei2p_api_cache_logs',
  GEI2PAPIValidationRule: 'gei2p_api_validation_rules',
  GEI2PAPIValidationLog: 'gei2p_api_validation_logs',
  GEI2PAPITransform: 'gei2p_api_transforms',
  GEI2PAPIWebhook: 'gei2p_api_webhooks',
  GEI2PAPIWebhookLog: 'gei2p_api_webhook_logs',
  GEI2PAPIVersion: 'gei2p_api_versions',
  GEI2PAPIDocumentation: 'gei2p_api_documentations',
  GEI2PAPISDK: 'gei2p_api_sdks',
  GEI2PAPIMockServer: 'gei2p_api_mock_servers',
  GEI2PAPIHealthCheck: 'gei2p_api_health_checks',
  GEI2PAPIMetric: 'gei2p_api_metrics',
  GEI2PAPIDashboard: 'gei2p_api_dashboards',
  GEI2PAPIAlert: 'gei2p_api_alerts',
  GEI2PAPISecurityPolicy: 'gei2p_api_security_policies',
  GEI2PAPIAccessLog: 'gei2p_api_access_logs',
  GEI2PAPICompliance: 'gei2p_api_compliances',
  GEI2PAPIAuditLog: 'gei2p_api_audit_logs',
  GEI2PAPINotification: 'gei2p_api_notifications',
  GEI2PAPIUsageQuota: 'gei2p_api_usage_quotas',
  GEI2PAPIBackup: 'gei2p_api_backups',
  GEI2PAPITemplate: 'gei2p_api_templates',
  GEI2PAPITestCase: 'gei2p_api_test_cases',
  GEI2PAPITestResult: 'gei2p_api_test_results',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEI2P6Repository {
  definitions: CrudRepository<GEI2PAPIDefinition>;
  endpoints: CrudRepository<GEI2PAPIEndpoint>;
  clients: CrudRepository<GEI2PAPIClient>;
  tokens: CrudRepository<GEI2PAPIToken>;
  logs: CrudRepository<GEI2PAPILog>;
  rateLimits: CrudRepository<GEI2PAPIRateLimit>;
  throttlings: CrudRepository<GEI2PAPIThrottling>;
  cacheConfigs: CrudRepository<GEI2PAPICacheConfig>;
  cacheLogs: CrudRepository<GEI2PAPICacheLog>;
  validationRules: CrudRepository<GEI2PAPIValidationRule>;
  validationLogs: CrudRepository<GEI2PAPIValidationLog>;
  transforms: CrudRepository<GEI2PAPITransform>;
  webhooks: CrudRepository<GEI2PAPIWebhook>;
  webhookLogs: CrudRepository<GEI2PAPIWebhookLog>;
  versions: CrudRepository<GEI2PAPIVersion>;
  documentations: CrudRepository<GEI2PAPIDocumentation>;
  sdks: CrudRepository<GEI2PAPISDK>;
  mockServers: CrudRepository<GEI2PAPIMockServer>;
  healthChecks: CrudRepository<GEI2PAPIHealthCheck>;
  metrics: CrudRepository<GEI2PAPIMetric>;
  dashboards: CrudRepository<GEI2PAPIDashboard>;
  alerts: CrudRepository<GEI2PAPIAlert>;
  securityPolicies: CrudRepository<GEI2PAPISecurityPolicy>;
  accessLogs: CrudRepository<GEI2PAPIAccessLog>;
  compliances: CrudRepository<GEI2PAPICompliance>;
  auditLogs: CrudRepository<GEI2PAPIAuditLog>;
  notifications: CrudRepository<GEI2PAPINotification>;
  usageQuotas: CrudRepository<GEI2PAPIUsageQuota>;
  backups: CrudRepository<GEI2PAPIBackup>;
  templates: CrudRepository<GEI2PAPITemplate>;
  testCases: CrudRepository<GEI2PAPITestCase>;
  testResults: CrudRepository<GEI2PAPITestResult>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEI2P6Repository(supabase: SupabaseClient): GEI2P6Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    definitions: crud<GEI2PAPIDefinition>(GEI2P6_TABLE_NAMES.GEI2PAPIDefinition),
    endpoints: crud<GEI2PAPIEndpoint>(GEI2P6_TABLE_NAMES.GEI2PAPIEndpoint),
    clients: crud<GEI2PAPIClient>(GEI2P6_TABLE_NAMES.GEI2PAPIClient),
    tokens: crud<GEI2PAPIToken>(GEI2P6_TABLE_NAMES.GEI2PAPIToken),
    logs: crud<GEI2PAPILog>(GEI2P6_TABLE_NAMES.GEI2PAPILog),
    rateLimits: crud<GEI2PAPIRateLimit>(GEI2P6_TABLE_NAMES.GEI2PAPIRateLimit),
    throttlings: crud<GEI2PAPIThrottling>(GEI2P6_TABLE_NAMES.GEI2PAPIThrottling),
    cacheConfigs: crud<GEI2PAPICacheConfig>(GEI2P6_TABLE_NAMES.GEI2PAPICacheConfig),
    cacheLogs: crud<GEI2PAPICacheLog>(GEI2P6_TABLE_NAMES.GEI2PAPICacheLog),
    validationRules: crud<GEI2PAPIValidationRule>(GEI2P6_TABLE_NAMES.GEI2PAPIValidationRule),
    validationLogs: crud<GEI2PAPIValidationLog>(GEI2P6_TABLE_NAMES.GEI2PAPIValidationLog),
    transforms: crud<GEI2PAPITransform>(GEI2P6_TABLE_NAMES.GEI2PAPITransform),
    webhooks: crud<GEI2PAPIWebhook>(GEI2P6_TABLE_NAMES.GEI2PAPIWebhook),
    webhookLogs: crud<GEI2PAPIWebhookLog>(GEI2P6_TABLE_NAMES.GEI2PAPIWebhookLog),
    versions: crud<GEI2PAPIVersion>(GEI2P6_TABLE_NAMES.GEI2PAPIVersion),
    documentations: crud<GEI2PAPIDocumentation>(GEI2P6_TABLE_NAMES.GEI2PAPIDocumentation),
    sdks: crud<GEI2PAPISDK>(GEI2P6_TABLE_NAMES.GEI2PAPISDK),
    mockServers: crud<GEI2PAPIMockServer>(GEI2P6_TABLE_NAMES.GEI2PAPIMockServer),
    healthChecks: crud<GEI2PAPIHealthCheck>(GEI2P6_TABLE_NAMES.GEI2PAPIHealthCheck),
    metrics: crud<GEI2PAPIMetric>(GEI2P6_TABLE_NAMES.GEI2PAPIMetric),
    dashboards: crud<GEI2PAPIDashboard>(GEI2P6_TABLE_NAMES.GEI2PAPIDashboard),
    alerts: crud<GEI2PAPIAlert>(GEI2P6_TABLE_NAMES.GEI2PAPIAlert),
    securityPolicies: crud<GEI2PAPISecurityPolicy>(GEI2P6_TABLE_NAMES.GEI2PAPISecurityPolicy),
    accessLogs: crud<GEI2PAPIAccessLog>(GEI2P6_TABLE_NAMES.GEI2PAPIAccessLog),
    compliances: crud<GEI2PAPICompliance>(GEI2P6_TABLE_NAMES.GEI2PAPICompliance),
    auditLogs: crud<GEI2PAPIAuditLog>(GEI2P6_TABLE_NAMES.GEI2PAPIAuditLog),
    notifications: crud<GEI2PAPINotification>(GEI2P6_TABLE_NAMES.GEI2PAPINotification),
    usageQuotas: crud<GEI2PAPIUsageQuota>(GEI2P6_TABLE_NAMES.GEI2PAPIUsageQuota),
    backups: crud<GEI2PAPIBackup>(GEI2P6_TABLE_NAMES.GEI2PAPIBackup),
    templates: crud<GEI2PAPITemplate>(GEI2P6_TABLE_NAMES.GEI2PAPITemplate),
    testCases: crud<GEI2PAPITestCase>(GEI2P6_TABLE_NAMES.GEI2PAPITestCase),
    testResults: crud<GEI2PAPITestResult>(GEI2P6_TABLE_NAMES.GEI2PAPITestResult),
  };
}

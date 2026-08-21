import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './aeip-base.repository';

// ============================================================================
// AEIP-6: AI Copilot — Intelligent Assistance (~180 entities)
// AEIP-7: Generative Studio — Content Generation (~200 entities)
// AEIP-8: Autonomous Finance — Financial Operations (~150 entities)
// AEIP-9: Autonomous Academic — Academic Operations (~180 entities)
// AEIP-10: Autonomous Infrastructure — Infra Management (~150 entities)
// AEIP-11: AI Governance — Governance & Compliance (~200 entities)
// AEIP-12: Quantum Ready — Quantum Computing Prep (~150 entities)
// ============================================================================

// --- AEIP-6: Copilot entities (compact) ---
export interface CPLSession extends BaseEntity { user_id: string; agent_type: string; status: string; }
export interface CPLMessage extends BaseEntity { session_id: string; role: string; content: string; tokens: number; }
export interface CPLContext extends BaseEntity { session_id: string; key: string; value: unknown; }
export interface CPLCommand extends BaseEntity { name: string; description: string; handler: string; }
export interface CPLCommandExecution extends BaseEntity { command_id: string; user_id: string; duration_ms: number; }
export interface CPLSuggestion extends BaseEntity { user_id: string; type: string; score: number; accepted: boolean; }
export interface CPLPrompt extends BaseEntity { name: string; template: string; model: string; }
export interface CPLPromptVersion extends BaseEntity { prompt_id: string; version: number; template: string; }
export interface CPLPromptExecution extends BaseEntity { prompt_id: string; input: Record<string,unknown>; tokens: number; }
export interface CPLModelConfig extends BaseEntity { model: string; temperature: number; max_tokens: number; }
export interface CPLTokenUsage extends BaseEntity { user_id: string; model: string; input_tokens: number; output_tokens: number; }
export interface CPLPreference extends BaseEntity { user_id: string; key: string; value: unknown; }
export interface CPLHistory extends BaseEntity { user_id: string; action: string; entity_type: string; entity_id: string; }
export interface CPLBookmark extends BaseEntity { user_id: string; entity_type: string; entity_id: string; }
export interface CPLAnnotation extends BaseEntity { entity_type: string; entity_id: string; user_id: string; note: string; }
export interface CPLLabel extends BaseEntity { name: string; color: string; }
export interface CPLTag extends BaseEntity { name: string; }
export interface CPLShare extends BaseEntity { entity_type: string; entity_id: string; shared_by: string; shared_with: string; }
export interface CPLComment extends BaseEntity { entity_type: string; entity_id: string; user_id: string; content: string; }
export interface CPLActivity extends BaseEntity { user_id: string; action: string; entity_type: string; entity_id: string; }
export interface CPLFeedback extends BaseEntity { entity_type: string; entity_id: string; user_id: string; rating: number; }
export interface CPLConfig extends BaseEntity { key: string; value: unknown; category: string; }
export interface CPLAuditLog extends BaseEntity { action: string; resource: string; resource_id: string; }
export interface CPLNotification extends BaseEntity { user_id: string; type: string; title: string; message: string; read: boolean; }
export interface CPLDashboard extends BaseEntity { name: string; layout: Record<string,unknown>; }
export interface CPLReport extends BaseEntity { name: string; type: string; query: string; }
export interface CPLTemplate extends BaseEntity { name: string; type: string; content: Record<string,unknown>; }
export interface CPLVersion extends BaseEntity { entity_type: string; entity_id: string; version: number; }
export interface CPLArchive extends BaseEntity { entity_type: string; entity_id: string; data: Record<string,unknown>; }
export interface CPLCache extends BaseEntity { key: string; value: unknown; ttl_seconds: number; expires_at: string; }
export interface CPLWebhook extends BaseEntity { name: string; url: string; events: string[]; active: boolean; }
export interface CPLIntegration extends BaseEntity { name: string; type: string; config: Record<string,unknown>; status: string; }
export interface CPLFeature extends BaseEntity { name: string; enabled: boolean; rollout_percentage: number; }
export interface CPLHealthCheck extends BaseEntity { name: string; status: string; last_checked_at: string; }
export interface CPLAlert extends BaseEntity { type: string; severity: string; title: string; resolved: boolean; }
export interface CPLLock extends BaseEntity { entity_type: string; entity_id: string; user_id: string; expires_at: string; }
export interface CPLRateLimit extends BaseEntity { endpoint: string; limit: number; window_seconds: number; current_count: number; }
export interface CPLUsageMetric extends BaseEntity { metric: string; value: number; period: string; }
export interface CPLCostEntry extends BaseEntity { resource: string; cost: number; period: string; }
export interface CPLDataSync extends BaseEntity { source: string; target: string; last_sync: string; status: string; }
export interface CPLImportJob extends BaseEntity { source: string; format: string; status: string; }
export interface CPLExportJob extends BaseEntity { format: string; status: string; file_url?: string; }
export interface CPLQueryLog extends BaseEntity { query: string; duration_ms: number; rows_affected: number; }
export interface CPLBackupJob extends BaseEntity { name: string; status: string; }
export interface CPLComplianceCheck extends BaseEntity { rule: string; status: string; details: string; }
export interface CPLSecurityScan extends BaseEntity { type: string; status: string; findings: number; }
export interface CPLAccessLog extends BaseEntity { user_id: string; resource: string; action: string; }
export interface CPLPermissionCheck extends BaseEntity { user_id: string; resource: string; allowed: boolean; }
export interface CPLCustomField extends BaseEntity { entity_type: string; field_name: string; field_type: string; }
export interface CPLCustomFieldValue extends BaseEntity { entity_type: string; entity_id: string; field_id: string; value: unknown; }
export interface CPLRateConfig extends BaseEntity { user_id: string; limit: number; window: string; current: number; }
export interface CPLAccessPolicy extends BaseEntity { name: string; rules: Record<string,unknown>[]; active: boolean; }
export interface CPLUserPolicy extends BaseEntity { user_id: string; policy_id: string; granted: boolean; }
export interface CPLSystemConfig extends BaseEntity { key: string; value: unknown; description: string; }
export interface CPLFeatureFlag extends BaseEntity { name: string; enabled: boolean; percentage: number; }
export interface CPLHealthMetric extends BaseEntity { metric: string; value: number; threshold: number; }
export interface CPLIncident extends BaseEntity { title: string; severity: string; status: string; }
export interface CPLPostMortem extends BaseEntity { incident_id: string; root_cause: string; resolution: string; }
export interface CPLRegionConfig extends BaseEntity { name: string; endpoint: string; active: boolean; }
export interface CPLSSLConfig extends BaseEntity { domain: string; cert_path: string; expires_at: string; }
export interface CPLJWTConfig extends BaseEntity { issuer: string; algorithm: string; expires_in: number; }
export interface CPLSessionConfig extends BaseEntity { timeout: number; max_concurrent: number; }
export interface CPLIPWhitelist extends BaseEntity { ip: string; description: string; active: boolean; }
export interface CPLAPIKey extends BaseEntity { name: string; key_hash: string; scopes: string[]; }
export interface CPLWebhookConfig extends BaseEntity { url: string; secret: string; events: string[]; }
export interface CPLCacheConfig extends BaseEntity { strategy: string; ttl: number; max_size: number; }
export interface CPLQueueConfig extends BaseEntity { name: string; max_size: number; processing_rate: number; }
export interface CPLRetryConfig extends BaseEntity { max_attempts: number; backoff_ms: number; }
export interface CPLTimeoutConfig extends BaseEntity { timeout_ms: number; action: string; }
export interface CPLFallbackConfig extends BaseEntity { primary: string; fallback: string; }
export interface CPLMonitoringConfig extends BaseEntity { name: string; query: string; frequency: string; }
export interface CPLAlertConfig extends BaseEntity { channel: string; threshold: number; }
export interface CPLLogConfig extends BaseEntity { level: string; retention_days: number; }
export interface CPLBackupConfig extends BaseEntity { schedule: string; retention: number; }
export interface CPLScalingConfig extends BaseEntity { min: number; max: number; metric: string; }
export interface CPLPerformanceConfig extends BaseEntity { cache_ttl: number; batch_size: number; }
export interface CPLSecurityConfig extends BaseEntity { encryption: string; rotation_days: number; }
export interface CPLComplianceConfig extends BaseEntity { framework: string; controls: string[]; }
export interface CPLDataConfig extends BaseEntity { format: string; encoding: string; }
export interface CPLNetworkConfig extends BaseEntity { timeout: number; retries: number; }
export interface CPLStorageConfig extends BaseEntity { backend: string; max_size: number; }
export interface CPLComputeConfig extends BaseEntity { cpu: number; memory: number; }
export interface CPLCDNConfig extends BaseEntity { provider: string; regions: string[]; }
export interface CPLDNSConfig extends BaseEntity { domain: string; records: Record<string,unknown>[]; }
export interface CPLFirewallConfig extends BaseEntity { rules: Record<string,unknown>[]; }
export interface CPLProxyConfig extends BaseEntity { upstream: string; load_balancer: string; }
export interface CPLQuotaConfig extends BaseEntity { resource: string; limit: number; period: string; }
export interface CPLBudgetConfig extends BaseEntity { amount: number; period: string; alert_threshold: number; }
export interface CPLCostConfig extends BaseEntity { tracking: boolean; categories: string[]; }
export interface CPLRetentionConfig extends BaseEntity { entity_type: string; days: number; }
export interface CPLArchiveConfig extends BaseEntity { entity_type: string; after_days: number; }
export interface CPLGDPRConfig extends BaseEntity { data_retention: number; right_to_delete: boolean; }
export interface CPLDataProtectionConfig extends BaseEntity { encryption: string; backup: boolean; }
export interface CPLAccessControlConfig extends BaseEntity { model: string; policies: string[]; }
export interface CPLIdentityConfig extends BaseEntity { provider: string; mfa: boolean; }
export interface CPLAuthConfig extends BaseEntity { method: string; session_timeout: number; }
export interface CPLTokenConfig extends BaseEntity { type: string; expiry: number; }
export interface CPLPermissionConfig extends BaseEntity { model: string; roles: string[]; }
export interface CPLRoleConfig extends BaseEntity { name: string; permissions: string[]; }
export interface CPLGroupConfig extends BaseEntity { name: string; members: string[]; }
export interface CPLTenantConfig extends BaseEntity { id: string; settings: Record<string,unknown>; }
export interface CPLMultiTenantConfig extends BaseEntity { isolation: string; shared_resources: boolean; }
export interface CPLWhiteLabelConfig extends BaseEntity { branding: Record<string,unknown>; custom_domain: string; }
export interface CPLSDKConfig extends BaseEntity { language: string; version: string; }
export interface CPLAPIConfig extends BaseEntity { version: string; base_url: string; }
export interface CPLGraphQLConfig extends BaseEntity { schema: string; introspection: boolean; }
export interface CPLRESTConfig extends BaseEntity { base_url: string; auth: string; }
export interface CPLWebSocketConfig extends BaseEntity { url: string; protocol: string; }
export interface CPLRealtimeConfig extends BaseEntity { channels: string[]; presence: boolean; }
export interface CPLNotificationConfig extends BaseEntity { channels: string[]; templates: Record<string,unknown>; }
export interface CPLEmailConfig extends BaseEntity { provider: string; from: string; }
export interface CPLSMSConfig extends BaseEntity { provider: string; from: string; }
export interface CPLPushConfig extends BaseEntity { provider: string; config: Record<string,unknown>; }
export interface CPLAnalyticsConfig extends BaseEntity { provider: string; events: string[]; }
export interface CPLTelemetryConfig extends BaseEntity { endpoints: string[]; sampling: number; }
export interface CPLMetricsConfig extends BaseEntity { exporters: string[]; interval: number; }
export interface CPLTracingConfig extends BaseEntity { sampler: string; exporter: string; }
export interface CPLLoggingConfig extends BaseEntity { level: string; format: string; }
export interface CPLDebugConfig extends BaseEntity { enabled: boolean; features: string[]; }
export interface CPLDevConfig extends BaseEntity { hot_reload: boolean; source_maps: boolean; }
export interface CPLTestConfig extends BaseEntity { framework: string; coverage: number; }
export interface CPLCIConfig extends BaseEntity { provider: string; pipeline: Record<string,unknown>; }
export interface CPLCDConfig extends BaseEntity { provider: string; strategy: string; }
export interface CPLContainerConfig extends BaseEntity { runtime: string; registry: string; }
export interface CPLKubernetesConfig extends BaseEntity { cluster: string; namespace: string; }
export interface CPLServiceMeshConfig extends BaseEntity { type: string; config: Record<string,unknown>; }
export interface CPLGatewayConfig extends BaseEntity { type: string; routes: Record<string,unknown>[]; }
export interface CPLBalancerConfig extends BaseEntity { algorithm: string; health_check: string; }
export interface CPLCircuitBreakerConfig extends BaseEntity { threshold: number; timeout: number; }
export interface CPLBulkheadConfig extends BaseEntity { max_concurrent: number; timeout: number; }
export interface CPLChaosConfig extends BaseEntity { experiments: Record<string,unknown>[]; }
export interface CPLGameDayConfig extends BaseEntity { scenario: string; runbook: string; }
export interface CPLIncidentConfig extends BaseEntity { severity_levels: string[]; escalation: Record<string,unknown>; }
export interface CPLEscalationConfig extends BaseEntity { levels: Record<string,unknown>[]; }
export interface CPLOnCallConfig extends BaseEntity { schedule: string; rotation: string; }
export interface CPLPagerDutyConfig extends BaseEntity { service_key: string; }
export interface CPLSlackConfig extends BaseEntity { workspace: string; channels: string[]; }
export interface CPLTeamsConfig extends BaseEntity { tenant: string; channels: string[]; }
export interface CPLInAppNotificationConfig extends BaseEntity { position: string; duration: number; }
export interface CPLToastConfig extends BaseEntity { position: string; duration: number; }
export interface CPLModalConfig extends BaseEntity { size: string; close_on_overlay: boolean; }
export interface CPLDrawerConfig extends BaseEntity { position: string; width: number; }
export interface CPLPopoverConfig extends BaseEntity { trigger: string; placement: string; }
export interface CPLTooltipConfig extends BaseEntity { delay: number; placement: string; }
export interface CPLThemeConfig extends BaseEntity { mode: string; primary: string; }
export interface CPLFontConfig extends BaseEntity { family: string; sizes: Record<string,number>; }
export interface CPLIconConfig extends BaseEntity { library: string; size: number; }
export interface CPLAnimationConfig extends BaseEntity { library: string; default_duration: number; }
export interface CPLResponsiveConfig extends BaseEntity { breakpoints: Record<string,number>; }
export interface CPLAccessibilityConfig extends BaseEntity { level: string; features: string[]; }
export interface CPLInternationalizationConfig extends BaseEntity { default_locale: string; locales: string[]; }
export interface CPLTimeZoneConfig extends BaseEntity { default_tz: string; auto_detect: boolean; }
export interface CPLCurrencyConfig extends BaseEntity { default_currency: string; format: string; }
export interface CPLDateConfig extends BaseEntity { format: string; locale: string; }
export interface CPLNumberConfig extends BaseEntity { locale: string; style: string; }
export interface CPLValidationConfig extends BaseEntity { rules: Record<string,unknown>[]; }
export interface CPLFormConfig extends BaseEntity { layout: string; validation: string; }
export interface CPLTableConfig extends BaseEntity { pagination: boolean; sorting: boolean; }
export interface CPLChartConfig extends BaseEntity { library: string; defaults: Record<string,unknown>; }
export interface CPLMapConfig extends BaseEntity { provider: string; style: string; }
export interface CPLFileConfig extends BaseEntity { upload_limit: number; allowed_types: string[]; }
export interface CPLImageConfig extends BaseEntity { max_size: number; formats: string[]; }
export interface CPLVideoConfig extends BaseEntity { max_duration: number; formats: string[]; }
export interface CPLAudioConfig extends BaseEntity { formats: string[]; max_size: number; }
export interface CPLDocumentConfig extends BaseEntity { formats: string[]; max_size: number; }
export interface CPLExportFormatConfig extends BaseEntity { formats: string[]; max_rows: number; }
export interface CPLImportFormatConfig extends BaseEntity { formats: string[]; max_rows: number; }
export interface CPLBackupExportConfig extends BaseEntity { format: string; compression: boolean; }
export interface CPLRestoreConfig extends BaseEntity { strategy: string; point_in_time: boolean; }
export interface CPLDisasterRecoveryConfig extends BaseEntity { rto: number; rpo: number; }
export interface CPLHighAvailabilityConfig extends BaseEntity { replicas: number; failover: string; }
export interface CPLGeoRedundancyConfig extends BaseEntity { regions: string[]; strategy: string; }
export interface CPLCDNEdgeConfig extends BaseEntity { ttl: number; purge: string; }
export interface CPLCacheStrategyConfig extends BaseEntity { layers: string[]; invalidation: string; }
export interface CPLPurgeConfig extends BaseEntity { strategy: string; schedule: string; }
export interface CPLWarmUpConfig extends BaseEntity { routes: string[]; strategy: string; }
export interface CPLPreloadConfig extends BaseEntity { resources: string[]; priority: string; }
export interface CPLPrefetchConfig extends BaseEntity { strategy: string; confidence: number; }
export interface CPLUsageConfig extends BaseEntity { metrics: string[]; granularity: string; }
export interface CPLRateConfigGlobal extends BaseEntity { endpoint: string; limit: number; window: number; }
export interface CPLAuditEntry extends BaseEntity { action: string; user_id: string; details: Record<string,unknown>; }

// ============================================================================
export const CPL_TABLE_NAMES: Record<string, string> = {
  CPLSession:'cpl_sessions',CPLMessage:'cpl_messages',CPLContext:'cpl_contexts',CPLCommand:'cpl_commands',
  CPLCommandExecution:'cpl_command_executions',CPLSuggestion:'cpl_suggestions',CPLPrompt:'cpl_prompts',
  CPLPromptVersion:'cpl_prompt_versions',CPLPromptExecution:'cpl_prompt_executions',CPLModelConfig:'cpl_model_configs',
  CPLTokenUsage:'cpl_token_usages',CPLPreference:'cpl_preferences',CPLHistory:'cpl_history',
  CPLBookmark:'cpl_bookmarks',CPLAnnotation:'cpl_annotations',CPLLabel:'cpl_labels',CPLTag:'cpl_tags',
  CPLShare:'cpl_shares',CPLComment:'cpl_comments',CPLActivity:'cpl_activities',CPLFeedback:'cpl_feedbacks',
  CPLConfig:'cpl_configs',CPLAuditLog:'cpl_audit_logs',CPLNotification:'cpl_notifications',
  CPLDashboard:'cpl_dashboards',CPLReport:'cpl_reports',CPLTemplate:'cpl_templates',CPLVersion:'cpl_versions',
  CPLArchive:'cpl_archives',CPLCache:'cpl_caches',CPLWebhook:'cpl_webhooks',CPLIntegration:'cpl_integrations',
  CPLFeature:'cpl_features',CPLHealthCheck:'cpl_health_checks',CPLAlert:'cpl_alerts',CPLLock:'cpl_locks',
  CPLRateLimit:'cpl_rate_limits',CPLUsageMetric:'cpl_usage_metrics',CPLCostEntry:'cpl_cost_entries',
  CPLDataSync:'cpl_data_syncs',CPLImportJob:'cpl_import_jobs',CPLExportJob:'cpl_export_jobs',
  CPLQueryLog:'cpl_query_logs',CPLBackupJob:'cpl_backup_jobs',CPLComplianceCheck:'cpl_compliance_checks',
  CPLSecurityScan:'cpl_security_scans',CPLAccessLog:'cpl_access_logs',CPLPermissionCheck:'cpl_permission_checks',
  CPLCustomField:'cpl_custom_fields',CPLCustomFieldValue:'cpl_custom_field_values',CPLRateConfig:'cpl_rate_configs',
  CPLAccessPolicy:'cpl_access_policies',CPLUserPolicy:'cpl_user_policies',CPLSystemConfig:'cpl_system_configs',
  CPLFeatureFlag:'cpl_feature_flags',CPLHealthMetric:'cpl_health_metrics',CPLIncident:'cpl_incidents',
  CPLPostMortem:'cpl_post_mortems',CPLRegionConfig:'cpl_region_configs',CPLSSLConfig:'cpl_ssl_configs',
  CPLJWTConfig:'cpl_jwt_configs',CPLSessionConfig:'cpl_session_configs',CPLIPWhitelist:'cpl_ip_whitelists',
  CPLAPIKey:'cpl_api_keys',CPLWebhookConfig:'cpl_webhook_configs',CPLCacheConfig:'cpl_cache_configs',
  CPLQueueConfig:'cpl_queue_configs',CPLRetryConfig:'cpl_retry_configs',CPLTimeoutConfig:'cpl_timeout_configs',
  CPLFallbackConfig:'cpl_fallback_configs',CPLMonitoringConfig:'cpl_monitoring_configs',CPLAlertConfig:'cpl_alert_configs',
  CPLLogConfig:'cpl_log_configs',CPLBackupConfig:'cpl_backup_configs',CPLScalingConfig:'cpl_scaling_configs',
  CPLPerformanceConfig:'cpl_performance_configs',CPLSecurityConfig:'cpl_security_configs',
  CPLComplianceConfig:'cpl_compliance_configs',CPLDataConfig:'cpl_data_configs',CPLNetworkConfig:'cpl_network_configs',
  CPLStorageConfig:'cpl_storage_configs',CPLComputeConfig:'cpl_compute_configs',CPLCDNConfig:'cpl_cdn_configs',
  CPLDNSConfig:'cpl_dns_configs',CPLFirewallConfig:'cpl_firewall_configs',CPLProxyConfig:'cpl_proxy_configs',
  CPLQuotaConfig:'cpl_quota_configs',CPLBudgetConfig:'cpl_budget_configs',CPLCostConfig:'cpl_cost_configs',
  CPLUsageConfig:'cpl_usage_configs',CPLRetentionConfig:'cpl_retention_configs',CPLArchiveConfig:'cpl_archive_configs',
  CPLGDPRConfig:'cpl_gdpr_configs',CPLDataProtectionConfig:'cpl_data_protection_configs',
  CPLAccessControlConfig:'cpl_access_control_configs',CPLIdentityConfig:'cpl_identity_configs',
  CPLAuthConfig:'cpl_auth_configs',CPLTokenConfig:'cpl_token_configs',CPLPermissionConfig:'cpl_permission_configs',
  CPLRoleConfig:'cpl_role_configs',CPLGroupConfig:'cpl_group_configs',CPLTenantConfig:'cpl_tenant_configs',
  CPLMultiTenantConfig:'cpl_multi_tenant_configs',CPLWhiteLabelConfig:'cpl_white_label_configs',
  CPLSDKConfig:'cpl_sdk_configs',CPLAPIConfig:'cpl_api_configs',CPLGraphQLConfig:'cpl_graphql_configs',
  CPLRESTConfig:'cpl_rest_configs',CPLWebSocketConfig:'cpl_websocket_configs',CPLRealtimeConfig:'cpl_realtime_configs',
  CPLNotificationConfig:'cpl_notification_configs',CPLEmailConfig:'cpl_email_configs',CPLSMSConfig:'cpl_sms_configs',
  CPLPushConfig:'cpl_push_configs',CPLAnalyticsConfig:'cpl_analytics_configs',CPLTelemetryConfig:'cpl_telemetry_configs',
  CPLMetricsConfig:'cpl_metrics_configs',CPLTracingConfig:'cpl_tracing_configs',CPLLoggingConfig:'cpl_logging_configs',
  CPLDebugConfig:'cpl_debug_configs',CPLDevConfig:'cpl_dev_configs',CPLTestConfig:'cpl_test_configs',
  CPLCIConfig:'cpl_ci_configs',CPLCDConfig:'cpl_cd_configs',CPLContainerConfig:'cpl_container_configs',
  CPLKubernetesConfig:'cpl_kubernetes_configs',CPLServiceMeshConfig:'cpl_service_mesh_configs',
  CPLGatewayConfig:'cpl_gateway_configs',CPLBalancerConfig:'cpl_balancer_configs',
  CPLCircuitBreakerConfig:'cpl_circuit_breaker_configs',CPLBulkheadConfig:'cpl_bulkhead_configs',
  CPLChaosConfig:'cpl_chaos_configs',CPLGameDayConfig:'cpl_game_day_configs',CPLIncidentConfig:'cpl_incident_configs',
  CPLEscalationConfig:'cpl_escalation_configs',CPLOnCallConfig:'cpl_on_call_configs',
  CPLPagerDutyConfig:'cpl_pager_duty_configs',CPLSlackConfig:'cpl_slack_configs',CPLTeamsConfig:'cpl_teams_configs',
  CPLInAppNotificationConfig:'cpl_in_app_notification_configs',CPLToastConfig:'cpl_toast_configs',
  CPLModalConfig:'cpl_modal_configs',CPLDrawerConfig:'cpl_drawer_configs',CPLPopoverConfig:'cpl_popover_configs',
  CPLTooltipConfig:'cpl_tooltip_configs',CPLThemeConfig:'cpl_theme_configs',CPLFontConfig:'cpl_font_configs',
  CPLIconConfig:'cpl_icon_configs',CPLAnimationConfig:'cpl_animation_configs',CPLResponsiveConfig:'cpl_responsive_configs',
  CPLAccessibilityConfig:'cpl_accessibility_configs',CPLInternationalizationConfig:'cpl_internationalization_configs',
  CPLTimeZoneConfig:'cpl_timezone_configs',CPLCurrencyConfig:'cpl_currency_configs',CPLDateConfig:'cpl_date_configs',
  CPLNumberConfig:'cpl_number_configs',CPLValidationConfig:'cpl_validation_configs',CPLFormConfig:'cpl_form_configs',
  CPLTableConfig:'cpl_table_configs',CPLChartConfig:'cpl_chart_configs',CPLMapConfig:'cpl_map_configs',
  CPLFileConfig:'cpl_file_configs',CPLImageConfig:'cpl_image_configs',CPLVideoConfig:'cpl_video_configs',
  CPLAudioConfig:'cpl_audio_configs',CPLDocumentConfig:'cpl_document_configs',CPLExportFormatConfig:'cpl_export_format_configs',
  CPLImportFormatConfig:'cpl_import_format_configs',CPLBackupExportConfig:'cpl_backup_export_configs',
  CPLRestoreConfig:'cpl_restore_configs',CPLDisasterRecoveryConfig:'cpl_disaster_recovery_configs',
  CPLHighAvailabilityConfig:'cpl_high_availability_configs',CPLGeoRedundancyConfig:'cpl_geo_redundancy_configs',
  CPLCDNEdgeConfig:'cpl_cdn_edge_configs',CPLCacheStrategyConfig:'cpl_cache_strategy_configs',
  CPLPurgeConfig:'cpl_purge_configs',CPLWarmUpConfig:'cpl_warm_up_configs',CPLPreloadConfig:'cpl_preload_configs',
  CPLPrefetchConfig:'cpl_prefetch_configs',CPLRateConfigGlobal:'cpl_rate_config_globals',
  CPLAuditEntry:'cpl_audit_entries',
};

// ============================================================================
export interface AEIP6Repository {
  sessions:CrudRepository<CPLSession>;messages:CrudRepository<CPLMessage>;contexts:CrudRepository<CPLContext>;
  commands:CrudRepository<CPLCommand>;commandExecutions:CrudRepository<CPLCommandExecution>;
  suggestions:CrudRepository<CPLSuggestion>;prompts:CrudRepository<CPLPrompt>;
  promptVersions:CrudRepository<CPLPromptVersion>;promptExecutions:CrudRepository<CPLPromptExecution>;
  modelConfigs:CrudRepository<CPLModelConfig>;tokenUsages:CrudRepository<CPLTokenUsage>;
  preferences:CrudRepository<CPLPreference>;history:CrudRepository<CPLHistory>;
  bookmarks:CrudRepository<CPLBookmark>;annotations:CrudRepository<CPLAnnotation>;
  labels:CrudRepository<CPLLabel>;tags:CrudRepository<CPLTag>;
  shares:CrudRepository<CPLShare>;comments:CrudRepository<CPLComment>;
  activities:CrudRepository<CPLActivity>;feedbacks:CrudRepository<CPLFeedback>;
  configs:CrudRepository<CPLConfig>;auditLogs:CrudRepository<CPLAuditLog>;
  notifications:CrudRepository<CPLNotification>;dashboards:CrudRepository<CPLDashboard>;
  reports:CrudRepository<CPLReport>;templates:CrudRepository<CPLTemplate>;
  versions:CrudRepository<CPLVersion>;archives:CrudRepository<CPLArchive>;
  caches:CrudRepository<CPLCache>;webhooks:CrudRepository<CPLWebhook>;
  integrations:CrudRepository<CPLIntegration>;features:CrudRepository<CPLFeature>;
  healthChecks:CrudRepository<CPLHealthCheck>;alerts:CrudRepository<CPLAlert>;
  locks:CrudRepository<CPLLock>;rateLimits:CrudRepository<CPLRateLimit>;
  usageMetrics:CrudRepository<CPLUsageMetric>;costEntries:CrudRepository<CPLCostEntry>;
  dataSyncs:CrudRepository<CPLDataSync>;importJobs:CrudRepository<CPLImportJob>;
  exportJobs:CrudRepository<CPLExportJob>;queryLogs:CrudRepository<CPLQueryLog>;
  backupJobs:CrudRepository<CPLBackupJob>;complianceChecks:CrudRepository<CPLComplianceCheck>;
  securityScans:CrudRepository<CPLSecurityScan>;accessLogs:CrudRepository<CPLAccessLog>;
  permissionChecks:CrudRepository<CPLPermissionCheck>;customFields:CrudRepository<CPLCustomField>;
  customFieldValues:CrudRepository<CPLCustomFieldValue>;rateConfigs:CrudRepository<CPLRateConfig>;
  accessPolicies:CrudRepository<CPLAccessPolicy>;userPolicies:CrudRepository<CPLUserPolicy>;
  systemConfigs:CrudRepository<CPLSystemConfig>;featureFlags:CrudRepository<CPLFeatureFlag>;
  healthMetrics:CrudRepository<CPLHealthMetric>;incidents:CrudRepository<CPLIncident>;
  postMortems:CrudRepository<CPLPostMortem>;regionConfigs:CrudRepository<CPLRegionConfig>;
  sslConfigs:CrudRepository<CPLSSLConfig>;jwtConfigs:CrudRepository<CPLJWTConfig>;
  sessionConfigs:CrudRepository<CPLSessionConfig>;ipWhitelists:CrudRepository<CPLIPWhitelist>;
  apiKeys:CrudRepository<CPLAPIKey>;webhookConfigs:CrudRepository<CPLWebhookConfig>;
  cacheConfigs:CrudRepository<CPLCacheConfig>;queueConfigs:CrudRepository<CPLQueueConfig>;
  retryConfigs:CrudRepository<CPLRetryConfig>;timeoutConfigs:CrudRepository<CPLTimeoutConfig>;
  fallbackConfigs:CrudRepository<CPLFallbackConfig>;monitoringConfigs:CrudRepository<CPLMonitoringConfig>;
  alertConfigs:CrudRepository<CPLAlertConfig>;logConfigs:CrudRepository<CPLLogConfig>;
  backupConfigs:CrudRepository<CPLBackupConfig>;scalingConfigs:CrudRepository<CPLScalingConfig>;
  performanceConfigs:CrudRepository<CPLPerformanceConfig>;securityConfigs:CrudRepository<CPLSecurityConfig>;
  complianceConfigs:CrudRepository<CPLComplianceConfig>;dataConfigs:CrudRepository<CPLDataConfig>;
  networkConfigs:CrudRepository<CPLNetworkConfig>;storageConfigs:CrudRepository<CPLStorageConfig>;
  computeConfigs:CrudRepository<CPLComputeConfig>;cdnConfigs:CrudRepository<CPLCDNConfig>;
  dnsConfigs:CrudRepository<CPLDNSConfig>;firewallConfigs:CrudRepository<CPLFirewallConfig>;
  proxyConfigs:CrudRepository<CPLProxyConfig>;quotaConfigs:CrudRepository<CPLQuotaConfig>;
  budgetConfigs:CrudRepository<CPLBudgetConfig>;costConfigs:CrudRepository<CPLCostConfig>;
  usageConfigs:CrudRepository<CPLUsageConfig>;retentionConfigs:CrudRepository<CPLRetentionConfig>;
  archiveConfigs:CrudRepository<CPLArchiveConfig>;gdprConfigs:CrudRepository<CPLGDPRConfig>;
  dataProtectionConfigs:CrudRepository<CPLDataProtectionConfig>;accessControlConfigs:CrudRepository<CPLAccessControlConfig>;
  identityConfigs:CrudRepository<CPLIdentityConfig>;authConfigs:CrudRepository<CPLAuthConfig>;
  tokenConfigs:CrudRepository<CPLTokenConfig>;permissionConfigs:CrudRepository<CPLPermissionConfig>;
  roleConfigs:CrudRepository<CPLRoleConfig>;groupConfigs:CrudRepository<CPLGroupConfig>;
  tenantConfigs:CrudRepository<CPLTenantConfig>;multiTenantConfigs:CrudRepository<CPLMultiTenantConfig>;
  whiteLabelConfigs:CrudRepository<CPLWhiteLabelConfig>;sdkConfigs:CrudRepository<CPLSDKConfig>;
  apiConfigs:CrudRepository<CPLAPIConfig>;graphqlConfigs:CrudRepository<CPLGraphQLConfig>;
  restConfigs:CrudRepository<CPLRESTConfig>;websocketConfigs:CrudRepository<CPLWebSocketConfig>;
  realtimeConfigs:CrudRepository<CPLRealtimeConfig>;notificationConfigs:CrudRepository<CPLNotificationConfig>;
  emailConfigs:CrudRepository<CPLEmailConfig>;smsConfigs:CrudRepository<CPLSMSConfig>;
  pushConfigs:CrudRepository<CPLPushConfig>;analyticsConfigs:CrudRepository<CPLAnalyticsConfig>;
  telemetryConfigs:CrudRepository<CPLTelemetryConfig>;metricsConfigs:CrudRepository<CPLMetricsConfig>;
  tracingConfigs:CrudRepository<CPLTracingConfig>;loggingConfigs:CrudRepository<CPLLoggingConfig>;
  debugConfigs:CrudRepository<CPLDebugConfig>;devConfigs:CrudRepository<CPLDevConfig>;
  testConfigs:CrudRepository<CPLTestConfig>;ciConfigs:CrudRepository<CPLCIConfig>;
  cdConfigs:CrudRepository<CPLCDConfig>;containerConfigs:CrudRepository<CPLContainerConfig>;
  kubernetesConfigs:CrudRepository<CPLKubernetesConfig>;serviceMeshConfigs:CrudRepository<CPLServiceMeshConfig>;
  gatewayConfigs:CrudRepository<CPLGatewayConfig>;balancerConfigs:CrudRepository<CPLBalancerConfig>;
  circuitBreakerConfigs:CrudRepository<CPLCircuitBreakerConfig>;bulkheadConfigs:CrudRepository<CPLBulkheadConfig>;
  chaosConfigs:CrudRepository<CPLChaosConfig>;gameDayConfigs:CrudRepository<CPLGameDayConfig>;
  incidentConfigs:CrudRepository<CPLIncidentConfig>;escalationConfigs:CrudRepository<CPLEscalationConfig>;
  onCallConfigs:CrudRepository<CPLOnCallConfig>;pagerDutyConfigs:CrudRepository<CPLPagerDutyConfig>;
  slackConfigs:CrudRepository<CPLSlackConfig>;teamsConfigs:CrudRepository<CPLTeamsConfig>;
  inAppNotificationConfigs:CrudRepository<CPLInAppNotificationConfig>;toastConfigs:CrudRepository<CPLToastConfig>;
  modalConfigs:CrudRepository<CPLModalConfig>;drawerConfigs:CrudRepository<CPLDrawerConfig>;
  popoverConfigs:CrudRepository<CPLPopoverConfig>;tooltipConfigs:CrudRepository<CPLTooltipConfig>;
  themeConfigs:CrudRepository<CPLThemeConfig>;fontConfigs:CrudRepository<CPLFontConfig>;
  iconConfigs:CrudRepository<CPLIconConfig>;animationConfigs:CrudRepository<CPLAnimationConfig>;
  responsiveConfigs:CrudRepository<CPLResponsiveConfig>;accessibilityConfigs:CrudRepository<CPLAccessibilityConfig>;
  internationalizationConfigs:CrudRepository<CPLInternationalizationConfig>;timeZoneConfigs:CrudRepository<CPLTimeZoneConfig>;
  currencyConfigs:CrudRepository<CPLCurrencyConfig>;dateConfigs:CrudRepository<CPLDateConfig>;
  numberConfigs:CrudRepository<CPLNumberConfig>;validationConfigs:CrudRepository<CPLValidationConfig>;
  formConfigs:CrudRepository<CPLFormConfig>;tableConfigs:CrudRepository<CPLTableConfig>;
  chartConfigs:CrudRepository<CPLChartConfig>;mapConfigs:CrudRepository<CPLMapConfig>;
  fileConfigs:CrudRepository<CPLFileConfig>;imageConfigs:CrudRepository<CPLImageConfig>;
  videoConfigs:CrudRepository<CPLVideoConfig>;audioConfigs:CrudRepository<CPLAudioConfig>;
  documentConfigs:CrudRepository<CPLDocumentConfig>;exportFormatConfigs:CrudRepository<CPLExportFormatConfig>;
  importFormatConfigs:CrudRepository<CPLImportFormatConfig>;backupExportConfigs:CrudRepository<CPLBackupExportConfig>;
  restoreConfigs:CrudRepository<CPLRestoreConfig>;disasterRecoveryConfigs:CrudRepository<CPLDisasterRecoveryConfig>;
  highAvailabilityConfigs:CrudRepository<CPLHighAvailabilityConfig>;
  geoRedundancyConfigs:CrudRepository<CPLGeoRedundancyConfig>;
  cdnEdgeConfigs:CrudRepository<CPLCDNEdgeConfig>;cacheStrategyConfigs:CrudRepository<CPLCacheStrategyConfig>;
  purgeConfigs:CrudRepository<CPLPurgeConfig>;warmUpConfigs:CrudRepository<CPLWarmUpConfig>;
  preloadConfigs:CrudRepository<CPLPreloadConfig>;prefetchConfigs:CrudRepository<CPLPrefetchConfig>;
  rateConfigGlobals:CrudRepository<CPLRateConfigGlobal>;auditEntries:CrudRepository<CPLAuditEntry>;
}

// ============================================================================
export function createAEIP6Repository(supabase: SupabaseClient): AEIP6Repository {
  const c = <T extends BaseEntity>(t: string) => createCrudRepository<T>(supabase, t);
  return {
    sessions:c<CPLSession>(CPL_TABLE_NAMES.CPLSession),messages:c<CPLMessage>(CPL_TABLE_NAMES.CPLMessage),
    contexts:c<CPLContext>(CPL_TABLE_NAMES.CPLContext),commands:c<CPLCommand>(CPL_TABLE_NAMES.CPLCommand),
    commandExecutions:c<CPLCommandExecution>(CPL_TABLE_NAMES.CPLCommandExecution),
    suggestions:c<CPLSuggestion>(CPL_TABLE_NAMES.CPLSuggestion),prompts:c<CPLPrompt>(CPL_TABLE_NAMES.CPLPrompt),
    promptVersions:c<CPLPromptVersion>(CPL_TABLE_NAMES.CPLPromptVersion),
    promptExecutions:c<CPLPromptExecution>(CPL_TABLE_NAMES.CPLPromptExecution),
    modelConfigs:c<CPLModelConfig>(CPL_TABLE_NAMES.CPLModelConfig),
    tokenUsages:c<CPLTokenUsage>(CPL_TABLE_NAMES.CPLTokenUsage),
    preferences:c<CPLPreference>(CPL_TABLE_NAMES.CPLPreference),history:c<CPLHistory>(CPL_TABLE_NAMES.CPLHistory),
    bookmarks:c<CPLBookmark>(CPL_TABLE_NAMES.CPLBookmark),annotations:c<CPLAnnotation>(CPL_TABLE_NAMES.CPLAnnotation),
    labels:c<CPLLabel>(CPL_TABLE_NAMES.CPLLabel),tags:c<CPLTag>(CPL_TABLE_NAMES.CPLTag),
    shares:c<CPLShare>(CPL_TABLE_NAMES.CPLShare),comments:c<CPLComment>(CPL_TABLE_NAMES.CPLComment),
    activities:c<CPLActivity>(CPL_TABLE_NAMES.CPLActivity),feedbacks:c<CPLFeedback>(CPL_TABLE_NAMES.CPLFeedback),
    configs:c<CPLConfig>(CPL_TABLE_NAMES.CPLConfig),auditLogs:c<CPLAuditLog>(CPL_TABLE_NAMES.CPLAuditLog),
    notifications:c<CPLNotification>(CPL_TABLE_NAMES.CPLNotification),
    dashboards:c<CPLDashboard>(CPL_TABLE_NAMES.CPLDashboard),
    reports:c<CPLReport>(CPL_TABLE_NAMES.CPLReport),templates:c<CPLTemplate>(CPL_TABLE_NAMES.CPLTemplate),
    versions:c<CPLVersion>(CPL_TABLE_NAMES.CPLVersion),archives:c<CPLArchive>(CPL_TABLE_NAMES.CPLArchive),
    caches:c<CPLCache>(CPL_TABLE_NAMES.CPLCache),webhooks:c<CPLWebhook>(CPL_TABLE_NAMES.CPLWebhook),
    integrations:c<CPLIntegration>(CPL_TABLE_NAMES.CPLIntegration),features:c<CPLFeature>(CPL_TABLE_NAMES.CPLFeature),
    healthChecks:c<CPLHealthCheck>(CPL_TABLE_NAMES.CPLHealthCheck),alerts:c<CPLAlert>(CPL_TABLE_NAMES.CPLAlert),
    locks:c<CPLLock>(CPL_TABLE_NAMES.CPLLock),rateLimits:c<CPLRateLimit>(CPL_TABLE_NAMES.CPLRateLimit),
    usageMetrics:c<CPLUsageMetric>(CPL_TABLE_NAMES.CPLUsageMetric),
    costEntries:c<CPLCostEntry>(CPL_TABLE_NAMES.CPLCostEntry),
    dataSyncs:c<CPLDataSync>(CPL_TABLE_NAMES.CPLDataSync),importJobs:c<CPLImportJob>(CPL_TABLE_NAMES.CPLImportJob),
    exportJobs:c<CPLExportJob>(CPL_TABLE_NAMES.CPLExportJob),queryLogs:c<CPLQueryLog>(CPL_TABLE_NAMES.CPLQueryLog),
    backupJobs:c<CPLBackupJob>(CPL_TABLE_NAMES.CPLBackupJob),
    complianceChecks:c<CPLComplianceCheck>(CPL_TABLE_NAMES.CPLComplianceCheck),
    securityScans:c<CPLSecurityScan>(CPL_TABLE_NAMES.CPLSecurityScan),
    accessLogs:c<CPLAccessLog>(CPL_TABLE_NAMES.CPLAccessLog),
    permissionChecks:c<CPLPermissionCheck>(CPL_TABLE_NAMES.CPLPermissionCheck),
    customFields:c<CPLCustomField>(CPL_TABLE_NAMES.CPLCustomField),
    customFieldValues:c<CPLCustomFieldValue>(CPL_TABLE_NAMES.CPLCustomFieldValue),
    rateConfigs:c<CPLRateConfig>(CPL_TABLE_NAMES.CPLRateConfig),
    accessPolicies:c<CPLAccessPolicy>(CPL_TABLE_NAMES.CPLAccessPolicy),
    userPolicies:c<CPLUserPolicy>(CPL_TABLE_NAMES.CPLUserPolicy),
    systemConfigs:c<CPLSystemConfig>(CPL_TABLE_NAMES.CPLSystemConfig),
    featureFlags:c<CPLFeatureFlag>(CPL_TABLE_NAMES.CPLFeatureFlag),
    healthMetrics:c<CPLHealthMetric>(CPL_TABLE_NAMES.CPLHealthMetric),
    incidents:c<CPLIncident>(CPL_TABLE_NAMES.CPLIncident),
    postMortems:c<CPLPostMortem>(CPL_TABLE_NAMES.CPLPostMortem),
    regionConfigs:c<CPLRegionConfig>(CPL_TABLE_NAMES.CPLRegionConfig),
    sslConfigs:c<CPLSSLConfig>(CPL_TABLE_NAMES.CPLSSLConfig),
    jwtConfigs:c<CPLJWTConfig>(CPL_TABLE_NAMES.CPLJWTConfig),
    sessionConfigs:c<CPLSessionConfig>(CPL_TABLE_NAMES.CPLSessionConfig),
    ipWhitelists:c<CPLIPWhitelist>(CPL_TABLE_NAMES.CPLIPWhitelist),
    apiKeys:c<CPLAPIKey>(CPL_TABLE_NAMES.CPLAPIKey),
    webhookConfigs:c<CPLWebhookConfig>(CPL_TABLE_NAMES.CPLWebhookConfig),
    cacheConfigs:c<CPLCacheConfig>(CPL_TABLE_NAMES.CPLCacheConfig),
    queueConfigs:c<CPLQueueConfig>(CPL_TABLE_NAMES.CPLQueueConfig),
    retryConfigs:c<CPLRetryConfig>(CPL_TABLE_NAMES.CPLRetryConfig),
    timeoutConfigs:c<CPLTimeoutConfig>(CPL_TABLE_NAMES.CPLTimeoutConfig),
    fallbackConfigs:c<CPLFallbackConfig>(CPL_TABLE_NAMES.CPLFallbackConfig),
    monitoringConfigs:c<CPLMonitoringConfig>(CPL_TABLE_NAMES.CPLMonitoringConfig),
    alertConfigs:c<CPLAlertConfig>(CPL_TABLE_NAMES.CPLAlertConfig),
    logConfigs:c<CPLLogConfig>(CPL_TABLE_NAMES.CPLLogConfig),
    backupConfigs:c<CPLBackupConfig>(CPL_TABLE_NAMES.CPLBackupConfig),
    scalingConfigs:c<CPLScalingConfig>(CPL_TABLE_NAMES.CPLScalingConfig),
    performanceConfigs:c<CPLPerformanceConfig>(CPL_TABLE_NAMES.CPLPerformanceConfig),
    securityConfigs:c<CPLSecurityConfig>(CPL_TABLE_NAMES.CPLSecurityConfig),
    complianceConfigs:c<CPLComplianceConfig>(CPL_TABLE_NAMES.CPLComplianceConfig),
    dataConfigs:c<CPLDataConfig>(CPL_TABLE_NAMES.CPLDataConfig),
    networkConfigs:c<CPLNetworkConfig>(CPL_TABLE_NAMES.CPLNetworkConfig),
    storageConfigs:c<CPLStorageConfig>(CPL_TABLE_NAMES.CPLStorageConfig),
    computeConfigs:c<CPLComputeConfig>(CPL_TABLE_NAMES.CPLComputeConfig),
    cdnConfigs:c<CPLCDNConfig>(CPL_TABLE_NAMES.CPLCDNConfig),
    dnsConfigs:c<CPLDNSConfig>(CPL_TABLE_NAMES.CPLDNSConfig),
    firewallConfigs:c<CPLFirewallConfig>(CPL_TABLE_NAMES.CPLFirewallConfig),
    proxyConfigs:c<CPLProxyConfig>(CPL_TABLE_NAMES.CPLProxyConfig),
    quotaConfigs:c<CPLQuotaConfig>(CPL_TABLE_NAMES.CPLQuotaConfig),
    budgetConfigs:c<CPLBudgetConfig>(CPL_TABLE_NAMES.CPLBudgetConfig),
    costConfigs:c<CPLCostConfig>(CPL_TABLE_NAMES.CPLCostConfig),
    usageConfigs:c<CPLUsageConfig>(CPL_TABLE_NAMES.CPLUsageConfig),
    retentionConfigs:c<CPLRetentionConfig>(CPL_TABLE_NAMES.CPLRetentionConfig),
    archiveConfigs:c<CPLArchiveConfig>(CPL_TABLE_NAMES.CPLArchiveConfig),
    gdprConfigs:c<CPLGDPRConfig>(CPL_TABLE_NAMES.CPLGDPRConfig),
    dataProtectionConfigs:c<CPLDataProtectionConfig>(CPL_TABLE_NAMES.CPLDataProtectionConfig),
    accessControlConfigs:c<CPLAccessControlConfig>(CPL_TABLE_NAMES.CPLAccessControlConfig),
    identityConfigs:c<CPLIdentityConfig>(CPL_TABLE_NAMES.CPLIdentityConfig),
    authConfigs:c<CPLAuthConfig>(CPL_TABLE_NAMES.CPLAuthConfig),
    tokenConfigs:c<CPLTokenConfig>(CPL_TABLE_NAMES.CPLTokenConfig),
    permissionConfigs:c<CPLPermissionConfig>(CPL_TABLE_NAMES.CPLPermissionConfig),
    roleConfigs:c<CPLRoleConfig>(CPL_TABLE_NAMES.CPLRoleConfig),
    groupConfigs:c<CPLGroupConfig>(CPL_TABLE_NAMES.CPLGroupConfig),
    tenantConfigs:c<CPLTenantConfig>(CPL_TABLE_NAMES.CPLTenantConfig),
    multiTenantConfigs:c<CPLMultiTenantConfig>(CPL_TABLE_NAMES.CPLMultiTenantConfig),
    whiteLabelConfigs:c<CPLWhiteLabelConfig>(CPL_TABLE_NAMES.CPLWhiteLabelConfig),
    sdkConfigs:c<CPLSDKConfig>(CPL_TABLE_NAMES.CPLSDKConfig),
    apiConfigs:c<CPLAPIConfig>(CPL_TABLE_NAMES.CPLAPIConfig),
    graphqlConfigs:c<CPLGraphQLConfig>(CPL_TABLE_NAMES.CPLGraphQLConfig),
    restConfigs:c<CPLRESTConfig>(CPL_TABLE_NAMES.CPLRESTConfig),
    websocketConfigs:c<CPLWebSocketConfig>(CPL_TABLE_NAMES.CPLWebSocketConfig),
    realtimeConfigs:c<CPLRealtimeConfig>(CPL_TABLE_NAMES.CPLRealtimeConfig),
    notificationConfigs:c<CPLNotificationConfig>(CPL_TABLE_NAMES.CPLNotificationConfig),
    emailConfigs:c<CPLEmailConfig>(CPL_TABLE_NAMES.CPLEmailConfig),
    smsConfigs:c<CPLSMSConfig>(CPL_TABLE_NAMES.CPLSMSConfig),
    pushConfigs:c<CPLPushConfig>(CPL_TABLE_NAMES.CPLPushConfig),
    analyticsConfigs:c<CPLAnalyticsConfig>(CPL_TABLE_NAMES.CPLAnalyticsConfig),
    telemetryConfigs:c<CPLTelemetryConfig>(CPL_TABLE_NAMES.CPLTelemetryConfig),
    metricsConfigs:c<CPLMetricsConfig>(CPL_TABLE_NAMES.CPLMetricsConfig),
    tracingConfigs:c<CPLTracingConfig>(CPL_TABLE_NAMES.CPLTracingConfig),
    loggingConfigs:c<CPLLoggingConfig>(CPL_TABLE_NAMES.CPLLoggingConfig),
    debugConfigs:c<CPLDebugConfig>(CPL_TABLE_NAMES.CPLDebugConfig),
    devConfigs:c<CPLDevConfig>(CPL_TABLE_NAMES.CPLDevConfig),
    testConfigs:c<CPLTestConfig>(CPL_TABLE_NAMES.CPLTestConfig),
    ciConfigs:c<CPLCIConfig>(CPL_TABLE_NAMES.CPLCIConfig),
    cdConfigs:c<CPLCDConfig>(CPL_TABLE_NAMES.CPLCDConfig),
    containerConfigs:c<CPLContainerConfig>(CPL_TABLE_NAMES.CPLContainerConfig),
    kubernetesConfigs:c<CPLKubernetesConfig>(CPL_TABLE_NAMES.CPLKubernetesConfig),
    serviceMeshConfigs:c<CPLServiceMeshConfig>(CPL_TABLE_NAMES.CPLServiceMeshConfig),
    gatewayConfigs:c<CPLGatewayConfig>(CPL_TABLE_NAMES.CPLGatewayConfig),
    balancerConfigs:c<CPLBalancerConfig>(CPL_TABLE_NAMES.CPLBalancerConfig),
    circuitBreakerConfigs:c<CPLCircuitBreakerConfig>(CPL_TABLE_NAMES.CPLCircuitBreakerConfig),
    bulkheadConfigs:c<CPLBulkheadConfig>(CPL_TABLE_NAMES.CPLBulkheadConfig),
    chaosConfigs:c<CPLChaosConfig>(CPL_TABLE_NAMES.CPLChaosConfig),
    gameDayConfigs:c<CPLGameDayConfig>(CPL_TABLE_NAMES.CPLGameDayConfig),
    incidentConfigs:c<CPLIncidentConfig>(CPL_TABLE_NAMES.CPLIncidentConfig),
    escalationConfigs:c<CPLEscalationConfig>(CPL_TABLE_NAMES.CPLEscalationConfig),
    onCallConfigs:c<CPLOnCallConfig>(CPL_TABLE_NAMES.CPLOnCallConfig),
    pagerDutyConfigs:c<CPLPagerDutyConfig>(CPL_TABLE_NAMES.CPLPagerDutyConfig),
    slackConfigs:c<CPLSlackConfig>(CPL_TABLE_NAMES.CPLSlackConfig),
    teamsConfigs:c<CPLTeamsConfig>(CPL_TABLE_NAMES.CPLTeamsConfig),
    inAppNotificationConfigs:c<CPLInAppNotificationConfig>(CPL_TABLE_NAMES.CPLInAppNotificationConfig),
    toastConfigs:c<CPLToastConfig>(CPL_TABLE_NAMES.CPLToastConfig),
    modalConfigs:c<CPLModalConfig>(CPL_TABLE_NAMES.CPLModalConfig),
    drawerConfigs:c<CPLDrawerConfig>(CPL_TABLE_NAMES.CPLDrawerConfig),
    popoverConfigs:c<CPLPopoverConfig>(CPL_TABLE_NAMES.CPLPopoverConfig),
    tooltipConfigs:c<CPLTooltipConfig>(CPL_TABLE_NAMES.CPLTooltipConfig),
    themeConfigs:c<CPLThemeConfig>(CPL_TABLE_NAMES.CPLThemeConfig),
    fontConfigs:c<CPLFontConfig>(CPL_TABLE_NAMES.CPLFontConfig),
    iconConfigs:c<CPLIconConfig>(CPL_TABLE_NAMES.CPLIconConfig),
    animationConfigs:c<CPLAnimationConfig>(CPL_TABLE_NAMES.CPLAnimationConfig),
    responsiveConfigs:c<CPLResponsiveConfig>(CPL_TABLE_NAMES.CPLResponsiveConfig),
    accessibilityConfigs:c<CPLAccessibilityConfig>(CPL_TABLE_NAMES.CPLAccessibilityConfig),
    internationalizationConfigs:c<CPLInternationalizationConfig>(CPL_TABLE_NAMES.CPLInternationalizationConfig),
    timeZoneConfigs:c<CPLTimeZoneConfig>(CPL_TABLE_NAMES.CPLTimeZoneConfig),
    currencyConfigs:c<CPLCurrencyConfig>(CPL_TABLE_NAMES.CPLCurrencyConfig),
    dateConfigs:c<CPLDateConfig>(CPL_TABLE_NAMES.CPLDateConfig),
    numberConfigs:c<CPLNumberConfig>(CPL_TABLE_NAMES.CPLNumberConfig),
    validationConfigs:c<CPLValidationConfig>(CPL_TABLE_NAMES.CPLValidationConfig),
    formConfigs:c<CPLFormConfig>(CPL_TABLE_NAMES.CPLFormConfig),
    tableConfigs:c<CPLTableConfig>(CPL_TABLE_NAMES.CPLTableConfig),
    chartConfigs:c<CPLChartConfig>(CPL_TABLE_NAMES.CPLChartConfig),
    mapConfigs:c<CPLMapConfig>(CPL_TABLE_NAMES.CPLMapConfig),
    fileConfigs:c<CPLFileConfig>(CPL_TABLE_NAMES.CPLFileConfig),
    imageConfigs:c<CPLImageConfig>(CPL_TABLE_NAMES.CPLImageConfig),
    videoConfigs:c<CPLVideoConfig>(CPL_TABLE_NAMES.CPLVideoConfig),
    audioConfigs:c<CPLAudioConfig>(CPL_TABLE_NAMES.CPLAudioConfig),
    documentConfigs:c<CPLDocumentConfig>(CPL_TABLE_NAMES.CPLDocumentConfig),
    exportFormatConfigs:c<CPLExportFormatConfig>(CPL_TABLE_NAMES.CPLExportFormatConfig),
    importFormatConfigs:c<CPLImportFormatConfig>(CPL_TABLE_NAMES.CPLImportFormatConfig),
    backupExportConfigs:c<CPLBackupExportConfig>(CPL_TABLE_NAMES.CPLBackupExportConfig),
    restoreConfigs:c<CPLRestoreConfig>(CPL_TABLE_NAMES.CPLRestoreConfig),
    disasterRecoveryConfigs:c<CPLDisasterRecoveryConfig>(CPL_TABLE_NAMES.CPLDisasterRecoveryConfig),
    highAvailabilityConfigs:c<CPLHighAvailabilityConfig>(CPL_TABLE_NAMES.CPLHighAvailabilityConfig),
    geoRedundancyConfigs:c<CPLGeoRedundancyConfig>(CPL_TABLE_NAMES.CPLGeoRedundancyConfig),
    cdnEdgeConfigs:c<CPLCDNEdgeConfig>(CPL_TABLE_NAMES.CPLCDNEdgeConfig),
    cacheStrategyConfigs:c<CPLCacheStrategyConfig>(CPL_TABLE_NAMES.CPLCacheStrategyConfig),
    purgeConfigs:c<CPLPurgeConfig>(CPL_TABLE_NAMES.CPLPurgeConfig),
    warmUpConfigs:c<CPLWarmUpConfig>(CPL_TABLE_NAMES.CPLWarmUpConfig),
    preloadConfigs:c<CPLPreloadConfig>(CPL_TABLE_NAMES.CPLPreloadConfig),
    prefetchConfigs:c<CPLPrefetchConfig>(CPL_TABLE_NAMES.CPLPrefetchConfig),
    rateConfigGlobals:c<CPLRateConfigGlobal>(CPL_TABLE_NAMES.CPLRateConfigGlobal),
    auditEntries:c<CPLAuditEntry>(CPL_TABLE_NAMES.CPLAuditEntry),
  };
}

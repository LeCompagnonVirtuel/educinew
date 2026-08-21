import { z } from 'zod';

// AlertEscalation
export const CreateAlertEscalationSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  alerting_id: z.string(),
  incident_id: z.string(),
  escalation_level: z.number(),
  channel: z.string(),
  status: z.string(),
  escalated_at: z.string(),
  acknowledged_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateAlertEscalationSchema = CreateAlertEscalationSchema.partial();

// APIGateway
export const CreateAPIGatewaySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  api_id: z.string(),
  gateway_name: z.string(),
  provider: z.string(),
  status: z.string(),
  custom_domain: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateAPIGatewaySchema = CreateAPIGatewaySchema.partial();

// APILimit
export const CreateAPILimitSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  api_id: z.string(),
  route_id: z.string(),
  strategy: z.string(),
  requests_per_second: z.number(),
  burst_size: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateAPILimitSchema = CreateAPILimitSchema.partial();

// APIRoute
export const CreateAPIRouteSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  api_id: z.string(),
  path: z.string(),
  method: z.string(),
  rate_limit: z.number(),
  auth_required: z.boolean(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateAPIRouteSchema = CreateAPIRouteSchema.partial();

// BackupJob
export const CreateBackupJobSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  policy_id: z.string(),
  vault_id: z.string(),
  backup_type: z.string(),
  status: z.string(),
  started_at: z.string(),
  completed_at: z.string(),
  size_bytes: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateBackupJobSchema = CreateBackupJobSchema.partial();

// BackupPolicy
export const CreateBackupPolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  policy_name: z.string(),
  backup_type: z.string(),
  frequency: z.string(),
  retention_days: z.number(),
  encryption: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateBackupPolicySchema = CreateBackupPolicySchema.partial();

// BackupRestore
export const CreateBackupRestoreSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  job_id: z.string(),
  strategy: z.string(),
  status: z.string(),
  started_at: z.string(),
  completed_at: z.string(),
  restored_size_bytes: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateBackupRestoreSchema = CreateBackupRestoreSchema.partial();

// BackupVault
export const CreateBackupVaultSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  vault_name: z.string(),
  provider: z.string(),
  region: z.string(),
  storage_class: z.string(),
  size_bytes: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateBackupVaultSchema = CreateBackupVaultSchema.partial();

// CacheEntry
export const CreateCacheEntrySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  cache_id: z.string(),
  key: z.string(),
  value: z.string(),
  ttl: z.number(),
  size_bytes: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCacheEntrySchema = CreateCacheEntrySchema.partial();

// CacheMetrics
export const CreateCacheMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  cache_id: z.string(),
  hit_ratio: z.number(),
  miss_ratio: z.number(),
  evictions: z.number(),
  memory_usage: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCacheMetricsSchema = CreateCacheMetricsSchema.partial();

// CachePolicy
export const CreateCachePolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  cache_id: z.string(),
  strategy: z.string(),
  max_memory: z.number(),
  eviction_policy: z.string(),
  compression: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCachePolicySchema = CreateCachePolicySchema.partial();

// CapacityAlert
export const CreateCapacityAlertSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  capacity_id: z.string(),
  alert_type: z.string(),
  threshold: z.number(),
  current_value: z.number(),
  status: z.string(),
  triggered_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCapacityAlertSchema = CreateCapacityAlertSchema.partial();

// CapacityForecast
export const CreateCapacityForecastSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  capacity_id: z.string(),
  forecast_date: z.string(),
  predicted_value: z.number(),
  confidence: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCapacityForecastSchema = CreateCapacityForecastSchema.partial();

// CDNAnalytics
export const CreateCDNAnalyticsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  distribution_id: z.string(),
  requests: z.number(),
  bandwidth: z.number(),
  cache_hit_ratio: z.number(),
  error_rate: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCDNAnalyticsSchema = CreateCDNAnalyticsSchema.partial();

// CDNCache
export const CreateCDNCacheSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  distribution_id: z.string(),
  url: z.string(),
  status: z.string(),
  size: z.number(),
  ttl: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCDNCacheSchema = CreateCDNCacheSchema.partial();

// CDNDistribution
export const CreateCDNDistributionSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  distribution_name: z.string(),
  provider: z.string(),
  domain: z.string(),
  status: z.string(),
  origin: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCDNDistributionSchema = CreateCDNDistributionSchema.partial();

// CDNPolicy
export const CreateCDNPolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  distribution_id: z.string(),
  cache_control: z.string(),
  compression: z.boolean(),
  security_headers: z.boolean(),
  cors_enabled: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCDNPolicySchema = CreateCDNPolicySchema.partial();

// CertificateAudit
export const CreateCertificateAuditSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  certificate_id: z.string(),
  action: z.string(),
  user_id: z.string(),
  timestamp: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCertificateAuditSchema = CreateCertificateAuditSchema.partial();

// CertificateRenewal
export const CreateCertificateRenewalSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  certificate_id: z.string(),
  renewal_type: z.string(),
  status: z.string(),
  scheduled_at: z.string(),
  completed_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCertificateRenewalSchema = CreateCertificateRenewalSchema.partial();

// CircuitBreaker
export const CreateCircuitBreakerSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  breaker_name: z.string(),
  state: z.string(),
  failure_threshold: z.number(),
  recovery_timeout: z.number(),
  success_threshold: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCircuitBreakerSchema = CreateCircuitBreakerSchema.partial();

// CircuitBreakerEvent
export const CreateCircuitBreakerEventSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  breaker_id: z.string(),
  event_type: z.string(),
  from_state: z.string(),
  to_state: z.string(),
  failure_count: z.number(),
  timestamp: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCircuitBreakerEventSchema = CreateCircuitBreakerEventSchema.partial();

// CircuitBreakerMetrics
export const CreateCircuitBreakerMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  breaker_id: z.string(),
  total_requests: z.number(),
  successful_requests: z.number(),
  failed_requests: z.number(),
  timeout_requests: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCircuitBreakerMetricsSchema = CreateCircuitBreakerMetricsSchema.partial();

// CircuitBreakerStateHistory
export const CreateCircuitBreakerStateHistorySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  breaker_id: z.string(),
  previous_state: z.string(),
  new_state: z.string(),
  reason: z.string(),
  timestamp: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCircuitBreakerStateHistorySchema = CreateCircuitBreakerStateHistorySchema.partial();

// CloudAlerting
export const CreateCloudAlertingSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  alerting_name: z.string(),
  stack: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudAlertingSchema = CreateCloudAlertingSchema.partial();

// CloudAPI
export const CreateCloudAPISchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  api_name: z.string(),
  base_url: z.string(),
  version: z.string(),
  status: z.string(),
  rate_limit: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudAPISchema = CreateCloudAPISchema.partial();

// CloudCache
export const CreateCloudCacheSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  cache_name: z.string(),
  cache_type: z.string(),
  provider: z.string(),
  status: z.string(),
  memory_mb: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudCacheSchema = CreateCloudCacheSchema.partial();

// CloudCapacity
export const CreateCloudCapacitySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  capacity_name: z.string(),
  unit: z.string(),
  current_value: z.number(),
  max_value: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudCapacitySchema = CreateCloudCapacitySchema.partial();

// CloudCertificate
export const CreateCloudCertificateSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  certificate_name: z.string(),
  domain: z.string(),
  provider: z.string(),
  status: z.string(),
  issued_at: z.string(),
  expires_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudCertificateSchema = CreateCloudCertificateSchema.partial();

// CloudCluster
export const CreateCloudClusterSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  zone_id: z.string(),
  cluster_name: z.string(),
  orchestrator: z.string(),
  status: z.string(),
  node_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudClusterSchema = CreateCloudClusterSchema.partial();

// CloudCompliance
export const CreateCloudComplianceSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  compliance_name: z.string(),
  framework: z.string(),
  status: z.string(),
  last_scan: z.string(),
  next_scan: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudComplianceSchema = CreateCloudComplianceSchema.partial();

// CloudCost
export const CreateCloudCostSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  provider: z.string(),
  region: z.string(),
  cost_model: z.string(),
  monthly_cost: z.number(),
  currency: z.string(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudCostSchema = CreateCloudCostSchema.partial();

// CloudDeployment
export const CreateCloudDeploymentSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  deployment_name: z.string(),
  strategy: z.string(),
  mode: z.string(),
  status: z.string(),
  version: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudDeploymentSchema = CreateCloudDeploymentSchema.partial();

// CloudDNS
export const CreateCloudDNSSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  dns_name: z.string(),
  provider: z.string(),
  status: z.string(),
  nameservers: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudDNSSchema = CreateCloudDNSSchema.partial();

// CloudEvent
export const CreateCloudEventSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  event_name: z.string(),
  event_type: z.string(),
  source: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudEventSchema = CreateCloudEventSchema.partial();

// CloudFeature
export const CreateCloudFeatureSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  feature_name: z.string(),
  provider: z.string(),
  status: z.string(),
  environment: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudFeatureSchema = CreateCloudFeatureSchema.partial();

// CloudFirewall
export const CreateCloudFirewallSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  firewall_name: z.string(),
  mode: z.string(),
  provider: z.string(),
  status: z.string(),
  rule_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudFirewallSchema = CreateCloudFirewallSchema.partial();

// CloudGovernance
export const CreateCloudGovernanceSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  governance_name: z.string(),
  framework: z.string(),
  status: z.string(),
  owner: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudGovernanceSchema = CreateCloudGovernanceSchema.partial();

// GovernanceAudit
export const CreateGovernanceAuditSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  governance_id: z.string(),
  policy_id: z.string(),
  auditor: z.string(),
  status: z.string(),
  findings: z.number(),
  recommendations: z.array(z.string()),
  audited_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateGovernanceAuditSchema = CreateGovernanceAuditSchema.partial();

// GovernancePolicy
export const CreateGovernancePolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  governance_id: z.string(),
  policy_name: z.string(),
  policy_type: z.string(),
  enforcement: z.string(),
  rules: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateGovernancePolicySchema = CreateGovernancePolicySchema.partial();

// CloudIdentity
export const CreateCloudIdentitySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  identity_name: z.string(),
  provider: z.string(),
  status: z.string(),
  mfa_enabled: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudIdentitySchema = CreateCloudIdentitySchema.partial();

// CloudLogging
export const CreateCloudLoggingSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  logging_name: z.string(),
  provider: z.string(),
  log_format: z.string(),
  status: z.string(),
  endpoint: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudLoggingSchema = CreateCloudLoggingSchema.partial();

// CloudMonitor
export const CreateCloudMonitorSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  monitor_name: z.string(),
  stack: z.string(),
  status: z.string(),
  endpoint: z.string(),
  api_key: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudMonitorSchema = CreateCloudMonitorSchema.partial();

// CloudNetwork
export const CreateCloudNetworkSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  network_name: z.string(),
  provider: z.string(),
  region: z.string(),
  tier: z.string(),
  status: z.string(),
  cidr: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudNetworkSchema = CreateCloudNetworkSchema.partial();

// CloudNode
export const CreateCloudNodeSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  cluster_id: z.string(),
  node_name: z.string(),
  status: z.string(),
  cpu: z.number(),
  memory: z.number(),
  storage: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudNodeSchema = CreateCloudNodeSchema.partial();

// CloudObservability
export const CreateCloudObservabilitySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  observability_name: z.string(),
  stack: z.string(),
  status: z.string(),
  endpoint: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudObservabilitySchema = CreateCloudObservabilitySchema.partial();

// CloudPipeline
export const CreateCloudPipelineSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  pipeline_name: z.string(),
  repository: z.string(),
  branch: z.string(),
  status: z.string(),
  trigger: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudPipelineSchema = CreateCloudPipelineSchema.partial();

// CloudPlugin
export const CreateCloudPluginSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  plugin_name: z.string(),
  plugin_type: z.string(),
  version: z.string(),
  status: z.string(),
  author: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudPluginSchema = CreateCloudPluginSchema.partial();

// CloudProxy
export const CreateCloudProxySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  proxy_name: z.string(),
  proxy_type: z.string(),
  host: z.string(),
  port: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudProxySchema = CreateCloudProxySchema.partial();

// CloudQueue
export const CreateCloudQueueSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  queue_name: z.string(),
  queue_type: z.string(),
  provider: z.string(),
  status: z.string(),
  message_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudQueueSchema = CreateCloudQueueSchema.partial();

// CloudScaling
export const CreateCloudScalingSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  scaling_name: z.string(),
  target_service: z.string(),
  policy: z.string(),
  min_instances: z.number(),
  max_instances: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudScalingSchema = CreateCloudScalingSchema.partial();

// CloudScheduler
export const CreateCloudSchedulerSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  scheduler_name: z.string(),
  scheduler_type: z.string(),
  status: z.string(),
  timezone: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudSchedulerSchema = CreateCloudSchedulerSchema.partial();

// CloudSearch
export const CreateCloudSearchSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  search_name: z.string(),
  provider: z.string(),
  status: z.string(),
  endpoint: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudSearchSchema = CreateCloudSearchSchema.partial();

// CloudSecret
export const CreateCloudSecretSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  secret_name: z.string(),
  secret_type: z.string(),
  manager: z.string(),
  status: z.string(),
  rotation_days: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudSecretSchema = CreateCloudSecretSchema.partial();

// CloudSecurity
export const CreateCloudSecuritySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  security_name: z.string(),
  provider: z.string(),
  status: z.string(),
  mfa_enabled: z.boolean(),
  encryption: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudSecuritySchema = CreateCloudSecuritySchema.partial();

// CloudServiceDiscovery
export const CreateCloudServiceDiscoverySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  discovery_name: z.string(),
  discovery_type: z.string(),
  provider: z.string(),
  status: z.string(),
  endpoint: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudServiceDiscoverySchema = CreateCloudServiceDiscoverySchema.partial();

// CloudSSL
export const CreateCloudSSLSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  ssl_name: z.string(),
  domain: z.string(),
  provider: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudSSLSchema = CreateCloudSSLSchema.partial();

// CloudStorage
export const CreateCloudStorageSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  storage_name: z.string(),
  provider: z.string(),
  region: z.string(),
  status: z.string(),
  total_bytes: z.number(),
  used_bytes: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudStorageSchema = CreateCloudStorageSchema.partial();

// CloudTracing
export const CreateCloudTracingSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  tracing_name: z.string(),
  backend: z.string(),
  status: z.string(),
  endpoint: z.string(),
  sampling_rate: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudTracingSchema = CreateCloudTracingSchema.partial();

// CloudTraffic
export const CreateCloudTrafficSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  traffic_name: z.string(),
  source_region: z.string(),
  target_region: z.string(),
  policy: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudTrafficSchema = CreateCloudTrafficSchema.partial();

// CloudWorkflow
export const CreateCloudWorkflowSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  workflow_name: z.string(),
  description: z.string(),
  status: z.string(),
  trigger: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudWorkflowSchema = CreateCloudWorkflowSchema.partial();

// CloudZone
export const CreateCloudZoneSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  region_id: z.string(),
  zone_name: z.string(),
  provider: z.string(),
  status: z.string(),
  latency_ms: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCloudZoneSchema = CreateCloudZoneSchema.partial();

// ComplianceAudit
export const CreateComplianceAuditSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  compliance_id: z.string(),
  auditor: z.string(),
  status: z.string(),
  findings: z.number(),
  recommendations: z.array(z.string()),
  audited_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateComplianceAuditSchema = CreateComplianceAuditSchema.partial();

// ContainerDeployment
export const CreateContainerDeploymentSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  image_id: z.string(),
  cluster_id: z.string(),
  replicas: z.number(),
  cpu_limit: z.string(),
  memory_limit: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateContainerDeploymentSchema = CreateContainerDeploymentSchema.partial();

// ContainerImage
export const CreateContainerImageSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  registry_id: z.string(),
  image_name: z.string(),
  tag: z.string(),
  size_bytes: z.number(),
  digest: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateContainerImageSchema = CreateContainerImageSchema.partial();

// ContainerRegistry
export const CreateContainerRegistrySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  registry_name: z.string(),
  provider: z.string(),
  endpoint: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateContainerRegistrySchema = CreateContainerRegistrySchema.partial();

// CostAlert
export const CreateCostAlertSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  budget_id: z.string(),
  alert_type: z.string(),
  threshold: z.number(),
  current_value: z.number(),
  status: z.string(),
  triggered_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCostAlertSchema = CreateCostAlertSchema.partial();

// CostBudget
export const CreateCostBudgetSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  budget_name: z.string(),
  amount: z.number(),
  currency: z.string(),
  period: z.string(),
  alert_threshold: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCostBudgetSchema = CreateCostBudgetSchema.partial();

// CostOptimization
export const CreateCostOptimizationSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  optimization_type: z.string(),
  potential_savings: z.number(),
  implementation_effort: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateCostOptimizationSchema = CreateCostOptimizationSchema.partial();

// DatabaseHealth
export const CreateDatabaseHealthSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  router_id: z.string(),
  route_id: z.string(),
  status: z.string(),
  response_time: z.number(),
  checked_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDatabaseHealthSchema = CreateDatabaseHealthSchema.partial();

// DatabaseMetrics
export const CreateDatabaseMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  router_id: z.string(),
  queries_per_second: z.number(),
  avg_query_time: z.number(),
  connections: z.number(),
  cache_hit_ratio: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDatabaseMetricsSchema = CreateDatabaseMetricsSchema.partial();

// DatabaseRoute
export const CreateDatabaseRouteSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  router_id: z.string(),
  route_key: z.string(),
  target_host: z.string(),
  target_port: z.number(),
  weight: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDatabaseRouteSchema = CreateDatabaseRouteSchema.partial();

// DatabaseRouter
export const CreateDatabaseRouterSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  router_name: z.string(),
  db_type: z.string(),
  status: z.string(),
  total_connections: z.number(),
  active_connections: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDatabaseRouterSchema = CreateDatabaseRouterSchema.partial();

// DeploymentMetrics
export const CreateDeploymentMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  deployment_id: z.string(),
  success_rate: z.number(),
  avg_duration: z.number(),
  rollback_rate: z.number(),
  total_deployments: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDeploymentMetricsSchema = CreateDeploymentMetricsSchema.partial();

// DeploymentPlan
export const CreateDeploymentPlanSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  deployment_id: z.string(),
  plan_name: z.string(),
  steps: z.array(z.string()),
  estimated_duration: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDeploymentPlanSchema = CreateDeploymentPlanSchema.partial();

// DeploymentRun
export const CreateDeploymentRunSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  deployment_id: z.string(),
  plan_id: z.string(),
  status: z.string(),
  started_at: z.string(),
  completed_at: z.string(),
  triggered_by: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDeploymentRunSchema = CreateDeploymentRunSchema.partial();

// DisasterRecoveryMetrics
export const CreateDisasterRecoveryMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  plan_id: z.string(),
  actual_rto: z.number(),
  actual_rpo: z.number(),
  success_rate: z.number(),
  test_date: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDisasterRecoveryMetricsSchema = CreateDisasterRecoveryMetricsSchema.partial();

// DisasterRecoveryPlan
export const CreateDisasterRecoveryPlanSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  plan_name: z.string(),
  tier: z.string(),
  rto_seconds: z.number(),
  rpo_seconds: z.number(),
  status: z.string(),
  last_test: z.string(),
  next_test: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDisasterRecoveryPlanSchema = CreateDisasterRecoveryPlanSchema.partial();

// DisasterRecoveryRunbook
export const CreateDisasterRecoveryRunbookSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  plan_id: z.string(),
  step_number: z.number(),
  action: z.string(),
  description: z.string(),
  estimated_duration: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDisasterRecoveryRunbookSchema = CreateDisasterRecoveryRunbookSchema.partial();

// DisasterRecoveryTest
export const CreateDisasterRecoveryTestSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  plan_id: z.string(),
  test_type: z.string(),
  status: z.string(),
  started_at: z.string(),
  completed_at: z.string(),
  result: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDisasterRecoveryTestSchema = CreateDisasterRecoveryTestSchema.partial();

// DNSMetrics
export const CreateDNSMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  dns_id: z.string(),
  queries_per_second: z.number(),
  cache_hit_ratio: z.number(),
  error_rate: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDNSMetricsSchema = CreateDNSMetricsSchema.partial();

// DNSRecord
export const CreateDNSRecordSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  zone_id: z.string(),
  record_name: z.string(),
  record_type: z.string(),
  value: z.string(),
  ttl: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDNSRecordSchema = CreateDNSRecordSchema.partial();

// DNSTransfer
export const CreateDNSTransferSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  dns_id: z.string(),
  source_nameserver: z.string(),
  target_nameserver: z.string(),
  zone_name: z.string(),
  status: z.string(),
  started_at: z.string(),
  completed_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDNSTransferSchema = CreateDNSTransferSchema.partial();

// DNSZone
export const CreateDNSZoneSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  dns_id: z.string(),
  zone_name: z.string(),
  zone_type: z.string(),
  ttl: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateDNSZoneSchema = CreateDNSZoneSchema.partial();

// EdgeCache
export const CreateEdgeCacheSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  edge_node_id: z.string(),
  cache_key: z.string(),
  cache_value: z.string(),
  ttl: z.number(),
  hits: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateEdgeCacheSchema = CreateEdgeCacheSchema.partial();

// EdgeDeployment
export const CreateEdgeDeploymentSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  edge_node_id: z.string(),
  service_name: z.string(),
  version: z.string(),
  status: z.string(),
  replicas: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateEdgeDeploymentSchema = CreateEdgeDeploymentSchema.partial();

// EdgeFunction
export const CreateEdgeFunctionSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  edge_node_id: z.string(),
  function_name: z.string(),
  runtime: z.string(),
  status: z.string(),
  invocations: z.number(),
  avg_duration: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateEdgeFunctionSchema = CreateEdgeFunctionSchema.partial();

// EdgeNode
export const CreateEdgeNodeSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  node_name: z.string(),
  region: z.string(),
  mode: z.string(),
  status: z.string(),
  ip_address: z.string(),
  cpu_usage: z.number(),
  memory_usage: z.number(),
  storage_usage: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateEdgeNodeSchema = CreateEdgeNodeSchema.partial();

// EnvironmentConfig
export const CreateEnvironmentConfigSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  environment: z.string(),
  config_source: z.string(),
  auto_deploy: z.boolean(),
  rollback_enabled: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateEnvironmentConfigSchema = CreateEnvironmentConfigSchema.partial();

// EventMetrics
export const CreateEventMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  event_id: z.string(),
  events_per_second: z.number(),
  avg_processing_time: z.number(),
  error_rate: z.number(),
  queue_depth: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateEventMetricsSchema = CreateEventMetricsSchema.partial();

// EventSource
export const CreateEventSourceSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  event_id: z.string(),
  source_type: z.string(),
  source_id: z.string(),
  endpoint: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateEventSourceSchema = CreateEventSourceSchema.partial();

// EventTarget
export const CreateEventTargetSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  event_id: z.string(),
  target_type: z.string(),
  target_id: z.string(),
  endpoint: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateEventTargetSchema = CreateEventTargetSchema.partial();

// FeatureFlag
export const CreateFeatureFlagSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  feature_id: z.string(),
  flag_key: z.string(),
  flag_value: z.string(),
  flag_type: z.string(),
  enabled: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateFeatureFlagSchema = CreateFeatureFlagSchema.partial();

// FeatureMetrics
export const CreateFeatureMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  feature_id: z.string(),
  impressions: z.number(),
  conversions: z.number(),
  conversion_rate: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateFeatureMetricsSchema = CreateFeatureMetricsSchema.partial();

// FeatureTarget
export const CreateFeatureTargetSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  feature_id: z.string(),
  flag_id: z.string(),
  target_type: z.string(),
  target_value: z.string(),
  percentage: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateFeatureTargetSchema = CreateFeatureTargetSchema.partial();

// FirewallAudit
export const CreateFirewallAuditSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  firewall_id: z.string(),
  action: z.string(),
  rule_id: z.string(),
  user_id: z.string(),
  timestamp: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateFirewallAuditSchema = CreateFirewallAuditSchema.partial();

// FirewallLog
export const CreateFirewallLogSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  firewall_id: z.string(),
  rule_id: z.string(),
  action: z.string(),
  source_ip: z.string(),
  destination_ip: z.string(),
  protocol: z.string(),
  port: z.number(),
  timestamp: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateFirewallLogSchema = CreateFirewallLogSchema.partial();

// FirewallPolicy
export const CreateFirewallPolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  firewall_id: z.string(),
  policy_name: z.string(),
  policy_type: z.string(),
  rules: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateFirewallPolicySchema = CreateFirewallPolicySchema.partial();

// FirewallRule
export const CreateFirewallRuleSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  firewall_id: z.string(),
  rule_name: z.string(),
  action: z.string(),
  protocol: z.string(),
  source_cidr: z.string(),
  destination_cidr: z.string(),
  port_range: z.string(),
  priority: z.number(),
  enabled: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateFirewallRuleSchema = CreateFirewallRuleSchema.partial();

// GeoAnalytics
export const CreateGeoAnalyticsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  region: z.string(),
  request_count: z.number(),
  avg_latency: z.number(),
  error_rate: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateGeoAnalyticsSchema = CreateGeoAnalyticsSchema.partial();

// GeoFailover
export const CreateGeoFailoverSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  source_region: z.string(),
  target_region: z.string(),
  trigger_condition: z.string(),
  active: z.boolean(),
  last_triggered: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateGeoFailoverSchema = CreateGeoFailoverSchema.partial();

// GeoPolicy
export const CreateGeoPolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  policy_name: z.string(),
  rules: z.array(z.string()),
  fallback_region: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateGeoPolicySchema = CreateGeoPolicySchema.partial();

// GeoRoute
export const CreateGeoRouteSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  route_name: z.string(),
  strategy: z.string(),
  source_region: z.string(),
  target_region: z.string(),
  priority: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateGeoRouteSchema = CreateGeoRouteSchema.partial();

// GlobalConfig
export const CreateGlobalConfigSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  provider: z.string(),
  tier: z.string(),
  deployment_mode: z.string(),
  encryption: z.string(),
  compliance_frameworks: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateGlobalConfigSchema = CreateGlobalConfigSchema.partial();

// IdentityAudit
export const CreateIdentityAuditSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  identity_id: z.string(),
  action: z.string(),
  user_id: z.string(),
  ip_address: z.string(),
  user_agent: z.string(),
  timestamp: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateIdentityAuditSchema = CreateIdentityAuditSchema.partial();

// IdentityFederation
export const CreateIdentityFederationSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  identity_id: z.string(),
  federation_type: z.string(),
  trusted_entity: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateIdentityFederationSchema = CreateIdentityFederationSchema.partial();

// IdentityProvider
export const CreateIdentityProviderSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  identity_id: z.string(),
  provider_type: z.string(),
  endpoint: z.string(),
  client_id: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateIdentityProviderSchema = CreateIdentityProviderSchema.partial();

// LoadBalancer
export const CreateLoadBalancerSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  name: z.string(),
  type: z.string(),
  provider: z.string(),
  status: z.string(),
  ip_address: z.string(),
  port: z.number(),
  protocol: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateLoadBalancerSchema = CreateLoadBalancerSchema.partial();

// LoadBalancerHealth
export const CreateLoadBalancerHealthSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  load_balancer_id: z.string(),
  pool_id: z.string(),
  status: z.string(),
  response_time: z.number(),
  checked_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateLoadBalancerHealthSchema = CreateLoadBalancerHealthSchema.partial();

// LoadBalancerPolicy
export const CreateLoadBalancerPolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  load_balancer_id: z.string(),
  sticky_session: z.boolean(),
  health_check_interval: z.number(),
  healthy_threshold: z.number(),
  unhealthy_threshold: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateLoadBalancerPolicySchema = CreateLoadBalancerPolicySchema.partial();

// LoadBalancerPool
export const CreateLoadBalancerPoolSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  load_balancer_id: z.string(),
  target_ip: z.string(),
  target_port: z.number(),
  weight: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateLoadBalancerPoolSchema = CreateLoadBalancerPoolSchema.partial();

// LogEntry
export const CreateLogEntrySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  logging_id: z.string(),
  level: z.string(),
  message: z.string(),
  source: z.string(),
  timestamp: z.string(),
  metadata: z.record(z.unknown()),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateLogEntrySchema = CreateLogEntrySchema.partial();

// LogQuery
export const CreateLogQuerySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  logging_id: z.string(),
  query: z.string(),
  time_range: z.string(),
  result_count: z.number(),
  duration_ms: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateLogQuerySchema = CreateLogQuerySchema.partial();

// MeshService
export const CreateMeshServiceSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  mesh_id: z.string(),
  service_name: z.string(),
  namespace: z.string(),
  version: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateMeshServiceSchema = CreateMeshServiceSchema.partial();

// MeshTraffic
export const CreateMeshTrafficSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  mesh_id: z.string(),
  source_service: z.string(),
  target_service: z.string(),
  requests_per_second: z.number(),
  error_rate: z.number(),
  latency_ms: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateMeshTrafficSchema = CreateMeshTrafficSchema.partial();

// MonitorAlert
export const CreateMonitorAlertSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  monitor_id: z.string(),
  alert_name: z.string(),
  severity: z.string(),
  condition: z.string(),
  threshold: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateMonitorAlertSchema = CreateMonitorAlertSchema.partial();

// MonitorDashboard
export const CreateMonitorDashboardSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  monitor_id: z.string(),
  dashboard_name: z.string(),
  widgets: z.array(z.string()),
  refresh_interval: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateMonitorDashboardSchema = CreateMonitorDashboardSchema.partial();

// MonitorMetric
export const CreateMonitorMetricSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  monitor_id: z.string(),
  metric_name: z.string(),
  metric_type: z.string(),
  value: z.number(),
  timestamp: z.string(),
  labels: z.record(z.unknown()),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateMonitorMetricSchema = CreateMonitorMetricSchema.partial();

// NetworkFirewall
export const CreateNetworkFirewallSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  network_id: z.string(),
  firewall_name: z.string(),
  mode: z.string(),
  status: z.string(),
  rule_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateNetworkFirewallSchema = CreateNetworkFirewallSchema.partial();

// NetworkInterface
export const CreateNetworkInterfaceSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  node_id: z.string(),
  interface_name: z.string(),
  ip_address: z.string(),
  ip_location: z.string(),
  mac_address: z.string(),
  speed_mbps: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateNetworkInterfaceSchema = CreateNetworkInterfaceSchema.partial();

// NetworkSubnet
export const CreateNetworkSubnetSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  vpc_id: z.string(),
  subnet_name: z.string(),
  cidr: z.string(),
  zone: z.string(),
  public: z.boolean(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateNetworkSubnetSchema = CreateNetworkSubnetSchema.partial();

// NetworkVPC
export const CreateNetworkVPCSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  network_id: z.string(),
  vpc_name: z.string(),
  cidr: z.string(),
  enable_dns: z.boolean(),
  enable_hostnames: z.boolean(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateNetworkVPCSchema = CreateNetworkVPCSchema.partial();

// ObservabilityAlert
export const CreateObservabilityAlertSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  observability_id: z.string(),
  alert_name: z.string(),
  severity: z.string(),
  condition: z.string(),
  threshold: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateObservabilityAlertSchema = CreateObservabilityAlertSchema.partial();

// ObservabilityConfig
export const CreateObservabilityConfigSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  observability_id: z.string(),
  metrics_enabled: z.boolean(),
  logs_enabled: z.boolean(),
  traces_enabled: z.boolean(),
  retention_days: z.number(),
  sampling_rate: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateObservabilityConfigSchema = CreateObservabilityConfigSchema.partial();

// ObservabilityMetric
export const CreateObservabilityMetricSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  observability_id: z.string(),
  metric_name: z.string(),
  metric_type: z.string(),
  value: z.number(),
  labels: z.record(z.unknown()),
  timestamp: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateObservabilityMetricSchema = CreateObservabilityMetricSchema.partial();

// PipelineMetric
export const CreatePipelineMetricSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  pipeline_id: z.string(),
  success_rate: z.number(),
  avg_duration: z.number(),
  total_runs: z.number(),
  failure_rate: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdatePipelineMetricSchema = CreatePipelineMetricSchema.partial();

// PipelineRun
export const CreatePipelineRunSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  pipeline_id: z.string(),
  run_number: z.number(),
  status: z.string(),
  commit_sha: z.string(),
  triggered_by: z.string(),
  started_at: z.string(),
  completed_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdatePipelineRunSchema = CreatePipelineRunSchema.partial();

// PipelineStage
export const CreatePipelineStageSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  pipeline_id: z.string(),
  stage_name: z.string(),
  stage_order: z.number(),
  status: z.string(),
  duration_seconds: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdatePipelineStageSchema = CreatePipelineStageSchema.partial();

// PluginConfig
export const CreatePluginConfigSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  plugin_id: z.string(),
  config_key: z.string(),
  config_value: z.string(),
  config_type: z.string(),
  required: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdatePluginConfigSchema = CreatePluginConfigSchema.partial();

// PluginMetrics
export const CreatePluginMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  plugin_id: z.string(),
  installations: z.number(),
  active_users: z.number(),
  error_rate: z.number(),
  avg_response_time: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdatePluginMetricsSchema = CreatePluginMetricsSchema.partial();

// PluginVersion
export const CreatePluginVersionSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  plugin_id: z.string(),
  version: z.string(),
  changelog: z.string(),
  released_at: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdatePluginVersionSchema = CreatePluginVersionSchema.partial();

// ProxyConnection
export const CreateProxyConnectionSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  proxy_id: z.string(),
  source_ip: z.string(),
  source_port: z.number(),
  target_ip: z.string(),
  target_port: z.number(),
  bytes_sent: z.number(),
  bytes_received: z.number(),
  duration_ms: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateProxyConnectionSchema = CreateProxyConnectionSchema.partial();

// ProxyMetrics
export const CreateProxyMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  proxy_id: z.string(),
  requests_per_second: z.number(),
  avg_latency: z.number(),
  error_rate: z.number(),
  bandwidth_mbps: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateProxyMetricsSchema = CreateProxyMetricsSchema.partial();

// ProxyPolicy
export const CreateProxyPolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  proxy_id: z.string(),
  policy_type: z.string(),
  rules: z.array(z.string()),
  enforcement: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateProxyPolicySchema = CreateProxyPolicySchema.partial();

// ProxyRoute
export const CreateProxyRouteSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  proxy_id: z.string(),
  source_host: z.string(),
  source_port: z.number(),
  target_host: z.string(),
  target_port: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateProxyRouteSchema = CreateProxyRouteSchema.partial();

// QueueConsumer
export const CreateQueueConsumerSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  queue_id: z.string(),
  consumer_name: z.string(),
  group_id: z.string(),
  status: z.string(),
  messages_processed: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateQueueConsumerSchema = CreateQueueConsumerSchema.partial();

// QueueMessage
export const CreateQueueMessageSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  queue_id: z.string(),
  message_id: z.string(),
  payload: z.string(),
  status: z.string(),
  priority: z.number(),
  attempts: z.number(),
  max_attempts: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateQueueMessageSchema = CreateQueueMessageSchema.partial();

// QueueMetrics
export const CreateQueueMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  queue_id: z.string(),
  messages_per_second: z.number(),
  avg_processing_time: z.number(),
  dead_letter_count: z.number(),
  consumer_lag: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateQueueMetricsSchema = CreateQueueMetricsSchema.partial();

// RegionalConfig
export const CreateRegionalConfigSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  region: z.string(),
  config_id: z.string(),
  provider: z.string(),
  endpoint: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateRegionalConfigSchema = CreateRegionalConfigSchema.partial();

// ReplicationJob
export const CreateReplicationJobSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  policy_id: z.string(),
  status: z.string(),
  bytes_transferred: z.number(),
  started_at: z.string(),
  completed_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateReplicationJobSchema = CreateReplicationJobSchema.partial();

// ReplicationMetrics
export const CreateReplicationMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  policy_id: z.string(),
  throughput_mbps: z.number(),
  latency_ms: z.number(),
  error_rate: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateReplicationMetricsSchema = CreateReplicationMetricsSchema.partial();

// ReplicationPolicy
export const CreateReplicationPolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  policy_name: z.string(),
  strategy: z.string(),
  source_region: z.string(),
  target_region: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateReplicationPolicySchema = CreateReplicationPolicySchema.partial();

// ReplicationStatusDetail
export const CreateReplicationStatusDetailSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  policy_id: z.string(),
  lag_ms: z.number(),
  last_sync: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateReplicationStatusDetailSchema = CreateReplicationStatusDetailSchema.partial();

// ScalingEvent
export const CreateScalingEventSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  scaling_id: z.string(),
  event_type: z.string(),
  previous_count: z.number(),
  new_count: z.number(),
  reason: z.string(),
  status: z.string(),
  triggered_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateScalingEventSchema = CreateScalingEventSchema.partial();

// ScalingMetrics
export const CreateScalingMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  scaling_id: z.string(),
  current_instances: z.number(),
  cpu_usage: z.number(),
  memory_usage: z.number(),
  request_count: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateScalingMetricsSchema = CreateScalingMetricsSchema.partial();

// SchedulerJob
export const CreateSchedulerJobSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  scheduler_id: z.string(),
  job_name: z.string(),
  cron_expression: z.string(),
  payload: z.string(),
  enabled: z.boolean(),
  last_run: z.string(),
  next_run: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSchedulerJobSchema = CreateSchedulerJobSchema.partial();

// SchedulerRun
export const CreateSchedulerRunSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  scheduler_id: z.string(),
  job_id: z.string(),
  status: z.string(),
  started_at: z.string(),
  completed_at: z.string(),
  result: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSchedulerRunSchema = CreateSchedulerRunSchema.partial();

// SearchMetrics
export const CreateSearchMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  search_id: z.string(),
  queries_per_second: z.number(),
  avg_response_time: z.number(),
  index_size: z.number(),
  cache_hit_ratio: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSearchMetricsSchema = CreateSearchMetricsSchema.partial();

// SearchQuery
export const CreateSearchQuerySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  search_id: z.string(),
  index_id: z.string(),
  query_text: z.string(),
  result_count: z.number(),
  duration_ms: z.number(),
  timestamp: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSearchQuerySchema = CreateSearchQuerySchema.partial();

// SecretAudit
export const CreateSecretAuditSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  secret_id: z.string(),
  action: z.string(),
  user_id: z.string(),
  ip_address: z.string(),
  timestamp: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSecretAuditSchema = CreateSecretAuditSchema.partial();

// SecretRotation
export const CreateSecretRotationSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  secret_id: z.string(),
  rotation_type: z.string(),
  scheduled_at: z.string(),
  completed_at: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSecretRotationSchema = CreateSecretRotationSchema.partial();

// SecretVersion
export const CreateSecretVersionSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  secret_id: z.string(),
  version: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSecretVersionSchema = CreateSecretVersionSchema.partial();

// SecurityAudit
export const CreateSecurityAuditSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  security_id: z.string(),
  audit_type: z.string(),
  status: z.string(),
  findings: z.number(),
  risk_score: z.number(),
  audited_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSecurityAuditSchema = CreateSecurityAuditSchema.partial();

// SecurityIncident
export const CreateSecurityIncidentSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  security_id: z.string(),
  incident_type: z.string(),
  severity: z.string(),
  status: z.string(),
  description: z.string(),
  detected_at: z.string(),
  resolved_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSecurityIncidentSchema = CreateSecurityIncidentSchema.partial();

// SecurityPolicy
export const CreateSecurityPolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  security_id: z.string(),
  policy_name: z.string(),
  policy_type: z.string(),
  enforcement: z.string(),
  rules: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSecurityPolicySchema = CreateSecurityPolicySchema.partial();

// ServiceHealth
export const CreateServiceHealthSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  discovery_id: z.string(),
  instance_id: z.string(),
  status: z.string(),
  response_time: z.number(),
  checked_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateServiceHealthSchema = CreateServiceHealthSchema.partial();

// ServiceInstance
export const CreateServiceInstanceSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  discovery_id: z.string(),
  service_name: z.string(),
  instance_id: z.string(),
  host: z.string(),
  port: z.number(),
  status: z.string(),
  metadata: z.record(z.unknown()),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateServiceInstanceSchema = CreateServiceInstanceSchema.partial();

// ServiceMeshConfig
export const CreateServiceMeshConfigSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  mesh_type: z.string(),
  status: z.string(),
  mtls_enabled: z.boolean(),
  observability_enabled: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateServiceMeshConfigSchema = CreateServiceMeshConfigSchema.partial();

// ServiceMeshPolicy
export const CreateServiceMeshPolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  mesh_id: z.string(),
  policy_name: z.string(),
  policy_type: z.string(),
  source_service: z.string(),
  target_service: z.string(),
  rules: z.array(z.string()),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateServiceMeshPolicySchema = CreateServiceMeshPolicySchema.partial();

// ServiceMetrics
export const CreateServiceMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  discovery_id: z.string(),
  requests_per_second: z.number(),
  avg_response_time: z.number(),
  error_rate: z.number(),
  active_instances: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateServiceMetricsSchema = CreateServiceMetricsSchema.partial();

// SSLAudit
export const CreateSSLAuditSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  ssl_id: z.string(),
  action: z.string(),
  user_id: z.string(),
  timestamp: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSSLAuditSchema = CreateSSLAuditSchema.partial();

// SSLCertificate
export const CreateSSLCertificateSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  ssl_id: z.string(),
  certificate_pem: z.string(),
  private_key_pem: z.string(),
  chain_pem: z.string(),
  expires_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSSLCertificateSchema = CreateSSLCertificateSchema.partial();

// SSLCertificateChain
export const CreateSSLCertificateChainSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  certificate_id: z.string(),
  chain_order: z.number(),
  certificate_pem: z.string(),
  issuer: z.string(),
  subject: z.string(),
  expires_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSSLCertificateChainSchema = CreateSSLCertificateChainSchema.partial();

// SSLRenewal
export const CreateSSLRenewalSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  ssl_id: z.string(),
  renewal_type: z.string(),
  status: z.string(),
  scheduled_at: z.string(),
  completed_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateSSLRenewalSchema = CreateSSLRenewalSchema.partial();

// StorageBucket
export const CreateStorageBucketSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  storage_id: z.string(),
  bucket_name: z.string(),
  storage_class: z.string(),
  encryption: z.string(),
  versioning: z.boolean(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateStorageBucketSchema = CreateStorageBucketSchema.partial();

// StorageMetrics
export const CreateStorageMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  storage_id: z.string(),
  total_objects: z.number(),
  total_bytes: z.number(),
  request_count: z.number(),
  error_rate: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateStorageMetricsSchema = CreateStorageMetricsSchema.partial();

// StoragePolicy
export const CreateStoragePolicySchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  storage_id: z.string(),
  lifecycle_days: z.number(),
  transition_days: z.number(),
  expiration_days: z.number(),
  versioning: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateStoragePolicySchema = CreateStoragePolicySchema.partial();

// TenantConfig
export const CreateTenantConfigSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  tenant_name: z.string(),
  isolation: z.string(),
  tier: z.string(),
  max_users: z.number(),
  max_storage_bytes: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateTenantConfigSchema = CreateTenantConfigSchema.partial();

// TraceMetrics
export const CreateTraceMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  tracing_id: z.string(),
  total_traces: z.number(),
  avg_duration: z.number(),
  error_rate: z.number(),
  p99_duration: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateTraceMetricsSchema = CreateTraceMetricsSchema.partial();

// TraceService
export const CreateTraceServiceSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  tracing_id: z.string(),
  service_name: z.string(),
  request_count: z.number(),
  avg_latency: z.number(),
  error_rate: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateTraceServiceSchema = CreateTraceServiceSchema.partial();

// TraceSpan
export const CreateTraceSpanSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  tracing_id: z.string(),
  trace_id: z.string(),
  span_id: z.string(),
  parent_span_id: z.string(),
  operation_name: z.string(),
  service_name: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  duration_ms: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateTraceSpanSchema = CreateTraceSpanSchema.partial();

// TrafficMetrics
export const CreateTrafficMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  traffic_id: z.string(),
  requests_per_second: z.number(),
  avg_latency: z.number(),
  error_rate: z.number(),
  p99_latency: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateTrafficMetricsSchema = CreateTrafficMetricsSchema.partial();

// TrafficMirror
export const CreateTrafficMirrorSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  traffic_id: z.string(),
  source_service: z.string(),
  mirror_service: z.string(),
  percentage: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateTrafficMirrorSchema = CreateTrafficMirrorSchema.partial();

// TrafficRoute
export const CreateTrafficRouteSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  traffic_id: z.string(),
  route_name: z.string(),
  action: z.string(),
  weight: z.number(),
  fault_percentage: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateTrafficRouteSchema = CreateTrafficRouteSchema.partial();

// WorkflowMetrics
export const CreateWorkflowMetricsSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  workflow_id: z.string(),
  total_runs: z.number(),
  success_rate: z.number(),
  avg_duration: z.number(),
  failure_rate: z.number(),
  period: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateWorkflowMetricsSchema = CreateWorkflowMetricsSchema.partial();

// WorkflowRun
export const CreateWorkflowRunSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  workflow_id: z.string(),
  run_number: z.number(),
  status: z.string(),
  started_at: z.string(),
  completed_at: z.string(),
  triggered_by: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateWorkflowRunSchema = CreateWorkflowRunSchema.partial();

// WorkflowStep
export const CreateWorkflowStepSchema = z.object({
  schoolId: z.string().uuid(),
  school_id: z.string(),
  workflow_id: z.string(),
  step_name: z.string(),
  step_order: z.number(),
  step_type: z.string(),
  config: z.record(z.unknown()),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UpdateWorkflowStepSchema = CreateWorkflowStepSchema.partial();


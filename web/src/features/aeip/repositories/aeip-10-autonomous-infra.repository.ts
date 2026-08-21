import { SupabaseClient } from '@supabase/supabase-js';
import { AppError, NotFoundError, ValidationError } from '@educi/errors';
import { CrudRepository, CrudRepositoryImpl, createCrudRepository } from './aeip-base.repository';

// ═══════════════════════════════════════════════════════════════════════
// AEIP-10 AUTONOMOUS INFRASTRUCTURE — Repository
// IT, cloud, réseau, sécurité, devices, monitoring, DevOps, edge
// Table prefix: ain
// ═══════════════════════════════════════════════════════════════════════

// ── Infrastructure Overview ──
export interface AinInfraConfig {
  id: string;
  school_id: string;
  cloud_provider: 'aws' | 'gcp' | 'azure' | 'supabase' | 'hybrid' | 'on_premise';
  region: string;
  environment: 'development' | 'staging' | 'production' | 'disaster_recovery';
  auto_scaling_enabled: boolean;
  auto_healing_enabled: boolean;
  ai_monitoring_enabled: boolean;
  ai_optimization_enabled: boolean;
  compliance_framework: string[];
  encryption_at_rest: boolean;
  encryption_in_transit: boolean;
  backup_strategy: string;
  disaster_recovery_rto_hours: number;
  disaster_recovery_rpo_hours: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinCloudResource {
  id: string;
  school_id: string;
  resource_type: 'compute' | 'storage' | 'database' | 'network' | 'cdn' | 'dns' | 'ssl' | 'queue' | 'function' | 'container';
  provider: string;
  resource_id: string;
  resource_name: string;
  resource_arn: string | null;
  region: string;
  availability_zone: string | null;
  status: 'running' | 'stopped' | 'terminated' | 'error' | 'provisioning' | 'scaling';
  specs: Record<string, unknown>;
  cost_per_hour: number;
  cost_monthly_estimate: number;
  auto_scaling_group: string | null;
  tags: Record<string, string>;
  last_health_check: string;
  ai_optimization_suggestion: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Networking ──
export interface AinNetworkSegment {
  id: string;
  school_id: string;
  segment_name: string;
  cidr_block: string;
  vlan_id: number | null;
  segment_type: 'public' | 'private' | 'dmz' | 'management' | 'iot';
  description: string;
  device_count: number;
  is_trusted: boolean;
  firewall_rules_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinFirewallRule {
  id: string;
  school_id: string;
  rule_name: string;
  rule_type: 'inbound' | 'outbound' | 'internal';
  priority: number;
  source_cidr: string;
  destination_cidr: string;
  protocol: string;
  port_range: string;
  action: 'allow' | 'deny' | 'log';
  description: string;
  is_active: boolean;
  hit_count: number;
  last_hit_at: string | null;
  ai_suggested: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinLoadBalancer {
  id: string;
  school_id: string;
  lb_name: string;
  lb_type: 'application' | 'network' | 'classic';
  scheme: 'internet_facing' | 'internal';
  dns_name: string;
  ip_address: string;
  port: number;
  protocol: string;
  health_check_path: string;
  health_check_interval_seconds: number;
  target_group_count: number;
  active_connections: number;
  request_count_per_second: number;
  ssl_certificates: string[];
  waf_enabled: boolean;
  status: 'active' | 'provisioning' | 'failed';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinCDNConfig {
  id: string;
  school_id: string;
  cdn_provider: string;
  distribution_id: string;
  domain: string;
  origin_type: 's3' | 'custom' | 'alb';
  origin_url: string;
  cache_behaviors: Record<string, unknown>[];
  price_class: string;
  ssl_enabled: boolean;
  compression_enabled: boolean;
  total_requests_30d: number;
  total_bandwidth_bytes_30d: number;
  cache_hit_ratio: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Devices ──
export interface AinDevice {
  id: string;
  school_id: string;
  device_name: string;
  device_type: 'laptop' | 'desktop' | 'tablet' | 'smartphone' | 'printer' | 'projector' | 'server' | 'router' | 'switch' | 'ap' | 'iot_sensor' | 'camera' | 'interactive_board';
  os: string | null;
  os_version: string | null;
  manufacturer: string;
  model: string;
  serial_number: string;
  mac_address: string | null;
  ip_address: string | null;
  location_id: string | null;
  assigned_to_user_id: string | null;
  department: string;
  status: 'active' | 'inactive' | 'maintenance' | 'retired' | 'lost' | 'stolen';
  purchase_date: string;
  warranty_expiry: string | null;
  last_seen_at: string | null;
  inventory_tag: string;
  specs: Record<string, unknown>;
  security_compliant: boolean;
  last_security_scan: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinDeviceHealth {
  id: string;
  school_id: string;
  device_id: string;
  check_time: string;
  cpu_usage_percent: number;
  memory_usage_percent: number;
  disk_usage_percent: number;
  network_latency_ms: number;
  temperature_celsius: number | null;
  battery_percent: number | null;
  uptime_seconds: number;
  process_count: number;
  alerts: string[];
  health_score: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinSoftwareAsset {
  id: string;
  school_id: string;
  software_name: string;
  vendor: string;
  version: string;
  license_type: 'perpetual' | 'subscription' | 'open_source' | 'trial' | 'educational';
  license_count: number;
  licenses_used: number;
  cost_per_license: number;
  expiry_date: string | null;
  auto_renew: boolean;
  installation_ids: string[];
  is_security_patch_current: boolean;
  latest_version: string | null;
  update_available: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Monitoring ──
export interface AinMonitoringAlert {
  id: string;
  school_id: string;
  alert_name: string;
  alert_type: 'cpu' | 'memory' | 'disk' | 'network' | 'application' | 'security' | 'ssl' | 'backup' | 'custom';
  severity: 'info' | 'warning' | 'critical' | 'emergency';
  status: 'active' | 'acknowledged' | 'resolved' | 'silenced';
  resource_id: string | null;
  resource_type: string;
  message: string;
  details: Record<string, unknown>;
  threshold_value: number | null;
  current_value: number | null;
  triggered_at: string;
  acknowledged_at: string | null;
  acknowledged_by: string | null;
  resolved_at: string | null;
  notification_sent: boolean;
  escalation_level: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinUptimeCheck {
  id: string;
  school_id: string;
  check_name: string;
  url: string;
  method: string;
  expected_status: number;
  timeout_seconds: number;
  interval_seconds: number;
  regions: string[];
  status: 'up' | 'down' | 'degraded' | 'unknown';
  uptime_percent_30d: number;
  avg_response_ms: number;
  last_check_at: string;
  last_failure_at: string | null;
  incident_count_30d: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinUptimeEvent {
  id: string;
  school_id: string;
  check_id: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  status: 'down' | 'degraded';
  cause: string | null;
  resolution: string | null;
  affected_users: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinPerformanceMetric {
  id: string;
  school_id: string;
  metric_name: string;
  metric_type: 'counter' | 'gauge' | 'histogram' | 'timer';
  resource_id: string;
  resource_type: string;
  value: number;
  unit: string;
  tags: Record<string, string>;
  timestamp: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinLogEntry {
  id: string;
  school_id: string;
  service: string;
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  message: string;
  trace_id: string | null;
  span_id: string | null;
  resource_id: string | null;
  user_id: string | null;
  ip_address: string;
  user_agent: string;
  metadata: Record<string, unknown>;
  timestamp: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Security ──
export interface AinSecurityScan {
  id: string;
  school_id: string;
  scan_type: 'vulnerability' | 'compliance' | 'penetration' | 'dependency' | 'container' | 'code';
  scan_target: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  started_at: string;
  completed_at: string | null;
  duration_seconds: number | null;
  findings_count: number;
  critical_count: number;
  high_count: number;
  medium_count: number;
  low_count: number;
  findings: Record<string, unknown>[];
  scan_tool: string;
  report_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinSecurityIncident {
  id: string;
  school_id: string;
  incident_id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'malware' | 'phishing' | 'data_breach' | 'ddos' | 'unauthorized_access' | 'insider_threat' | 'configuration';
  status: 'detected' | 'investigating' | 'contained' | 'eradicated' | 'recovered' | 'closed';
  detected_at: string;
  source: string;
  affected_resources: string[];
  affected_users: string[];
  description: string;
  timeline: Record<string, unknown>[];
  containment_actions: Record<string, unknown>[];
  root_cause: string | null;
  remediation_steps: string[];
  lessons_learned: string;
  reported_to_authorities: boolean;
  report_filed_at: string | null;
  resolved_at: string | null;
  resolved_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinCertificate {
  id: string;
  school_id: string;
  domain: string;
  issuer: string;
  serial_number: string;
  not_before: string;
  not_after: string;
  key_size: number;
  algorithm: string;
  san: string[];
  auto_renew: boolean;
  renew_days_before: number;
  status: 'active' | 'expiring_soon' | 'expired' | 'revoked';
  last_checked_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinAccessPolicy {
  id: string;
  school_id: string;
  policy_name: string;
  policy_type: 'rbac' | 'network' | 'device' | 'data' | 'api';
  rules: Record<string, unknown>[];
  target_users: string[];
  target_groups: string[];
  target_resources: string[];
  is_active: boolean;
  enforced: boolean;
  violation_count: number;
  last_violation_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Backup & DR ──
export interface AinBackupJob {
  id: string;
  school_id: string;
  job_name: string;
  backup_type: 'full' | 'incremental' | 'differential' | 'snapshot' | 'log';
  source_type: 'database' | 'file_system' | 'block_storage' | 'configuration';
  source_id: string;
  destination: string;
  schedule: string;
  retention_days: number;
  encryption_enabled: boolean;
  compression_enabled: boolean;
  status: 'scheduled' | 'running' | 'completed' | 'failed' | 'cancelled';
  last_run_at: string | null;
  last_run_status: string | null;
  last_run_size_bytes: number | null;
  last_run_duration_seconds: number | null;
  next_run_at: string;
  total_backups: number;
  total_size_bytes: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinBackupRestore {
  id: string;
  school_id: string;
  backup_job_id: string;
  restore_type: 'full' | 'point_in_time' | 'selective';
  restore_point: string;
  target_environment: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  started_at: string;
  completed_at: string | null;
  duration_seconds: number | null;
  data_restored_bytes: number;
  initiated_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinDisasterRecoveryPlan {
  id: string;
  school_id: string;
  plan_name: string;
  plan_type: 'pilot_light' | 'warm_standby' | 'hot_standby' | 'multi_site';
  rpo_hours: number;
  rto_hours: number;
  priority_services: string[];
  recovery_steps: Record<string, unknown>[];
  last_tested_at: string | null;
  test_result: string | null;
  contacts: Record<string, unknown>[];
  runbook_url: string | null;
  status: 'active' | 'needs_update' | 'in_test';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Edge Computing ──
export interface AinEdgeNode {
  id: string;
  school_id: string;
  node_name: string;
  node_type: 'gateway' | 'compute' | 'storage' | 'hybrid';
  location: string;
  latitude: number | null;
  longitude: number | null;
  ip_address: string;
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  cpu_cores: number;
  memory_gb: number;
  storage_gb: number;
  storage_used_gb: number;
  network_uplink_mbps: number;
  last_heartbeat: string;
  services_running: string[];
  ai_inference_enabled: boolean;
  sync_status: 'synced' | 'syncing' | 'pending' | 'error';
  last_sync_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinEdgeSyncJob {
  id: string;
  school_id: string;
  edge_node_id: string;
  sync_type: 'full' | 'incremental' | 'delta';
  direction: 'cloud_to_edge' | 'edge_to_cloud' | 'bidirectional';
  status: 'queued' | 'syncing' | 'completed' | 'failed' | 'conflict';
  data_size_bytes: number;
  synced_bytes: number;
  conflict_count: number;
  started_at: string;
  completed_at: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinOfflineDataStore {
  id: string;
  school_id: string;
  edge_node_id: string;
  data_type: 'student_records' | 'attendance' | 'grades' | 'content' | 'media' | 'configuration';
  record_count: number;
  size_bytes: number;
  last_updated_at: string;
  sync_pending: boolean;
  conflict_resolution: 'cloud_wins' | 'edge_wins' | 'manual' | 'merge';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── DevOps ──
export interface AinDeployment {
  id: string;
  school_id: string;
  service_name: string;
  version: string;
  environment: string;
  deployment_type: 'blue_green' | 'rolling' | 'canary' | 'recreate';
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'rolled_back';
  trigger: 'manual' | 'ci_cd' | 'auto_scaling' | 'scheduled';
  commit_hash: string;
  image_tag: string;
  started_at: string;
  completed_at: string | null;
  duration_seconds: number | null;
  deployed_by: string;
  rollback_id: string | null;
  health_check_passed: boolean;
  metrics_before: Record<string, unknown>;
  metrics_after: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AinServiceConfig {
  id: string;
  school_id: string;
  service_name: string;
  service_type: 'api' | 'web' | 'worker' | 'scheduler' | 'database' | 'cache' | 'queue' | 'storage';
  image: string;
  replicas_desired: number;
  replicas_running: number;
  cpu_request: string;
  cpu_limit: string;
  memory_request: string;
  memory_limit: string;
  environment_vars: Record<string, string>;
  health_check_path: string;
  health_check_interval: number;
  auto_scaling_min: number;
  auto_scaling_max: number;
  auto_scaling_cpu_threshold: number;
  status: 'running' | 'stopped' | 'error' | 'scaling';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Table Name Map ──
export const AIN_TABLE_NAMES = {
  INFRA_CONFIG: 'ain_infra_configs',
  CLOUD_RESOURCE: 'ain_cloud_resources',
  NETWORK_SEGMENT: 'ain_network_segments',
  FIREWALL_RULE: 'ain_firewall_rules',
  LOAD_BALANCER: 'ain_load_balancers',
  CDN_CONFIG: 'ain_cdn_configs',
  DEVICE: 'ain_devices',
  DEVICE_HEALTH: 'ain_device_healths',
  SOFTWARE_ASSET: 'ain_software_assets',
  MONITORING_ALERT: 'ain_monitoring_alerts',
  UPTIME_CHECK: 'ain_uptime_checks',
  UPTIME_EVENT: 'ain_uptime_events',
  PERFORMANCE_METRIC: 'ain_performance_metrics',
  LOG_ENTRY: 'ain_log_entries',
  SECURITY_SCAN: 'ain_security_scans',
  SECURITY_INCIDENT: 'ain_security_incidents',
  CERTIFICATE: 'ain_certificates',
  ACCESS_POLICY: 'ain_access_policies',
  BACKUP_JOB: 'ain_backup_jobs',
  BACKUP_RESTORE: 'ain_backup_restores',
  DISASTER_RECOVERY_PLAN: 'ain_disaster_recovery_plans',
  EDGE_NODE: 'ain_edge_nodes',
  EDGE_SYNC_JOB: 'ain_edge_sync_jobs',
  OFFLINE_DATA_STORE: 'ain_offline_data_stores',
  DEPLOYMENT: 'ain_deployments',
  SERVICE_CONFIG: 'ain_service_configs',
} as const;

// ── Repository Interface ──
export interface AEIP10Repository {
  infraConfigs: CrudRepository<AinInfraConfig>;
  cloudResources: CrudRepository<AinCloudResource>;
  networkSegments: CrudRepository<AinNetworkSegment>;
  firewallRules: CrudRepository<AinFirewallRule>;
  loadBalancers: CrudRepository<AinLoadBalancer>;
  cdnConfigs: CrudRepository<AinCDNConfig>;
  devices: CrudRepository<AinDevice>;
  deviceHealths: CrudRepository<AinDeviceHealth>;
  softwareAssets: CrudRepository<AinSoftwareAsset>;
  monitoringAlerts: CrudRepository<AinMonitoringAlert>;
  uptimeChecks: CrudRepository<AinUptimeCheck>;
  uptimeEvents: CrudRepository<AinUptimeEvent>;
  performanceMetrics: CrudRepository<AinPerformanceMetric>;
  logEntries: CrudRepository<AinLogEntry>;
  securityScans: CrudRepository<AinSecurityScan>;
  securityIncidents: CrudRepository<AinSecurityIncident>;
  certificates: CrudRepository<AinCertificate>;
  accessPolicies: CrudRepository<AinAccessPolicy>;
  backupJobs: CrudRepository<AinBackupJob>;
  backupRestores: CrudRepository<AinBackupRestore>;
  disasterRecoveryPlans: CrudRepository<AinDisasterRecoveryPlan>;
  edgeNodes: CrudRepository<AinEdgeNode>;
  edgeSyncJobs: CrudRepository<AinEdgeSyncJob>;
  offlineDataStores: CrudRepository<AinOfflineDataStore>;
  deployments: CrudRepository<AinDeployment>;
  serviceConfigs: CrudRepository<AinServiceConfig>;
}

// ── Factory Function ──
export function createAEIP10Repository(supabase: SupabaseClient): AEIP10Repository {
  return {
    infraConfigs: createCrudRepository<AinInfraConfig>(supabase, AIN_TABLE_NAMES.INFRA_CONFIG),
    cloudResources: createCrudRepository<AinCloudResource>(supabase, AIN_TABLE_NAMES.CLOUD_RESOURCE),
    networkSegments: createCrudRepository<AinNetworkSegment>(supabase, AIN_TABLE_NAMES.NETWORK_SEGMENT),
    firewallRules: createCrudRepository<AinFirewallRule>(supabase, AIN_TABLE_NAMES.FIREWALL_RULE),
    loadBalancers: createCrudRepository<AinLoadBalancer>(supabase, AIN_TABLE_NAMES.LOAD_BALANCER),
    cdnConfigs: createCrudRepository<AinCDNConfig>(supabase, AIN_TABLE_NAMES.CDN_CONFIG),
    devices: createCrudRepository<AinDevice>(supabase, AIN_TABLE_NAMES.DEVICE),
    deviceHealths: createCrudRepository<AinDeviceHealth>(supabase, AIN_TABLE_NAMES.DEVICE_HEALTH),
    softwareAssets: createCrudRepository<AinSoftwareAsset>(supabase, AIN_TABLE_NAMES.SOFTWARE_ASSET),
    monitoringAlerts: createCrudRepository<AinMonitoringAlert>(supabase, AIN_TABLE_NAMES.MONITORING_ALERT),
    uptimeChecks: createCrudRepository<AinUptimeCheck>(supabase, AIN_TABLE_NAMES.UPTIME_CHECK),
    uptimeEvents: createCrudRepository<AinUptimeEvent>(supabase, AIN_TABLE_NAMES.UPTIME_EVENT),
    performanceMetrics: createCrudRepository<AinPerformanceMetric>(supabase, AIN_TABLE_NAMES.PERFORMANCE_METRIC),
    logEntries: createCrudRepository<AinLogEntry>(supabase, AIN_TABLE_NAMES.LOG_ENTRY),
    securityScans: createCrudRepository<AinSecurityScan>(supabase, AIN_TABLE_NAMES.SECURITY_SCAN),
    securityIncidents: createCrudRepository<AinSecurityIncident>(supabase, AIN_TABLE_NAMES.SECURITY_INCIDENT),
    certificates: createCrudRepository<AinCertificate>(supabase, AIN_TABLE_NAMES.CERTIFICATE),
    accessPolicies: createCrudRepository<AinAccessPolicy>(supabase, AIN_TABLE_NAMES.ACCESS_POLICY),
    backupJobs: createCrudRepository<AinBackupJob>(supabase, AIN_TABLE_NAMES.BACKUP_JOB),
    backupRestores: createCrudRepository<AinBackupRestore>(supabase, AIN_TABLE_NAMES.BACKUP_RESTORE),
    disasterRecoveryPlans: createCrudRepository<AinDisasterRecoveryPlan>(supabase, AIN_TABLE_NAMES.DISASTER_RECOVERY_PLAN),
    edgeNodes: createCrudRepository<AinEdgeNode>(supabase, AIN_TABLE_NAMES.EDGE_NODE),
    edgeSyncJobs: createCrudRepository<AinEdgeSyncJob>(supabase, AIN_TABLE_NAMES.EDGE_SYNC_JOB),
    offlineDataStores: createCrudRepository<AinOfflineDataStore>(supabase, AIN_TABLE_NAMES.OFFLINE_DATA_STORE),
    deployments: createCrudRepository<AinDeployment>(supabase, AIN_TABLE_NAMES.DEPLOYMENT),
    serviceConfigs: createCrudRepository<AinServiceConfig>(supabase, AIN_TABLE_NAMES.SERVICE_CONFIG),
  };
}

// Enterprise Platform Core Types - Global Admin, Multi-Tenant, Deployment, Observability
// Phase 2.10 - EduCI Platform

// =============================================================================
// DOMAIN 1 - GLOBAL PLATFORM ADMINISTRATION
// =============================================================================

// =============================================================================
// ENUMS
// =============================================================================

export const PlatformStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
} as const;
export type PlatformStatus = (typeof PlatformStatus)[keyof typeof PlatformStatus];

export const PlatformEnvironment = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
  DR: 'dr',
} as const;
export type PlatformEnvironment = (typeof PlatformEnvironment)[keyof typeof PlatformEnvironment];

export const SettingScope = {
  GLOBAL: 'global',
  TENANT: 'tenant',
  MODULE: 'module',
} as const;
export type SettingScope = (typeof SettingScope)[keyof typeof SettingScope];

export const EnvironmentType = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
  QA: 'qa',
  DR: 'dr',
} as const;
export type EnvironmentType = (typeof EnvironmentType)[keyof typeof EnvironmentType];

export const FeatureFlagTarget = {
  ALL: 'all',
  TENANTS: 'tenants',
  USERS: 'users',
  PERCENTAGE: 'percentage',
} as const;
export type FeatureFlagTarget = (typeof FeatureFlagTarget)[keyof typeof FeatureFlagTarget];

export const ModuleStatus = {
  INSTALLED: 'installed',
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  UNINSTALLED: 'uninstalled',
  PENDING: 'pending',
} as const;
export type ModuleStatus = (typeof ModuleStatus)[keyof typeof ModuleStatus];

export const VersionStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  DEPRECATED: 'deprecated',
  ARCHIVED: 'archived',
} as const;
export type VersionStatus = (typeof VersionStatus)[keyof typeof VersionStatus];

export const TenantPlan = {
  FREE: 'free',
  BASIC: 'basic',
  PROFESSIONAL: 'professional',
  ENTERPRISE: 'enterprise',
  CUSTOM: 'custom',
} as const;
export type TenantPlan = (typeof TenantPlan)[keyof typeof TenantPlan];

export const LicenseType = {
  TRIAL: 'trial',
  STANDARD: 'standard',
  PROFESSIONAL: 'professional',
  ENTERPRISE: 'enterprise',
  UNLIMITED: 'unlimited',
} as const;
export type LicenseType = (typeof LicenseType)[keyof typeof LicenseType];

export const DashboardAccessLevel = {
  PUBLIC: 'public',
  INTERNAL: 'internal',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const;
export type DashboardAccessLevel = (typeof DashboardAccessLevel)[keyof typeof DashboardAccessLevel];

export const MetricCategory = {
  PERFORMANCE: 'performance',
  USAGE: 'usage',
  COST: 'cost',
  SECURITY: 'security',
  AVAILABILITY: 'availability',
} as const;
export type MetricCategory = (typeof MetricCategory)[keyof typeof MetricCategory];

export const MetricTrend = {
  UP: 'up',
  DOWN: 'down',
  STABLE: 'stable',
} as const;
export type MetricTrend = (typeof MetricTrend)[keyof typeof MetricTrend];

export const AlertSeverity = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical',
} as const;
export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity];

export const BackupType = {
  FULL: 'full',
  INCREMENTAL: 'incremental',
  DIFFERENTIAL: 'differential',
  SNAPSHOT: 'snapshot',
} as const;
export type BackupType = (typeof BackupType)[keyof typeof BackupType];

export const EventStatus = {
  PENDING: 'pending',
  PROCESSED: 'processed',
  FAILED: 'failed',
  SKIPPED: 'skipped',
} as const;
export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

export const WebhookRetryPolicy = {
  NONE: 'none',
  LINEAR: 'linear',
  EXPONENTIAL: 'exponential',
} as const;
export type WebhookRetryPolicy = (typeof WebhookRetryPolicy)[keyof typeof WebhookRetryPolicy];

// =============================================================================
// ENTITIES
// =============================================================================

export interface GlobalAdministration {
  id: string;
  platform_id: string;
  name: string;
  version: string;
  environment: PlatformEnvironment;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface GlobalAdministrationCreate {
  platform_id: string;
  name: string;
  version: string;
  environment: PlatformEnvironment;
  status: PlatformStatus;
}

export interface GlobalAdministrationUpdate {
  platform_id?: string;
  name?: string;
  version?: string;
  environment?: PlatformEnvironment;
  status?: PlatformStatus;
}

export interface GlobalAdministrationQuery {
  search?: string;
  environment?: PlatformEnvironment;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PlatformSetting {
  id: string;
  category: string;
  key: string;
  value: string;
  description: string;
  scope: SettingScope;
  is_public: boolean;
  created_by: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface PlatformSettingCreate {
  category: string;
  key: string;
  value: string;
  description: string;
  scope: SettingScope;
  is_public: boolean;
  created_by: string;
  status: PlatformStatus;
}

export interface PlatformSettingUpdate {
  category?: string;
  key?: string;
  value?: string;
  description?: string;
  scope?: SettingScope;
  is_public?: boolean;
  created_by?: string;
  status?: PlatformStatus;
}

export interface PlatformSettingQuery {
  search?: string;
  category?: string;
  scope?: SettingScope;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface EnvironmentConfig {
  id: string;
  name: string;
  type: EnvironmentType;
  api_key_encrypted: string;
  database_url_encrypted: string;
  region: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentConfigCreate {
  name: string;
  type: EnvironmentType;
  api_key_encrypted: string;
  database_url_encrypted: string;
  region: string;
  status: PlatformStatus;
}

export interface EnvironmentConfigUpdate {
  name?: string;
  type?: EnvironmentType;
  api_key_encrypted?: string;
  database_url_encrypted?: string;
  region?: string;
  status?: PlatformStatus;
}

export interface EnvironmentConfigQuery {
  search?: string;
  type?: EnvironmentType;
  region?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FeatureFlag {
  id: string;
  name: string;
  code: string;
  description: string;
  percentage: number;
  target_users: string[];
  target_tenants: string[];
  enabled: boolean;
  created_by: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface FeatureFlagCreate {
  name: string;
  code: string;
  description: string;
  percentage: number;
  target_users: string[];
  target_tenants: string[];
  enabled: boolean;
  created_by: string;
  status: PlatformStatus;
}

export interface FeatureFlagUpdate {
  name?: string;
  code?: string;
  description?: string;
  percentage?: number;
  target_users?: string[];
  target_tenants?: string[];
  enabled?: boolean;
  created_by?: string;
  status?: PlatformStatus;
}

export interface FeatureFlagQuery {
  search?: string;
  enabled?: boolean;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface ModuleRegistry {
  id: string;
  name: string;
  version: string;
  description: string;
  dependencies: string[];
  enabled: boolean;
  install_date: string;
  status: ModuleStatus;
  created_at: string;
  updated_at: string;
}

export interface ModuleRegistryCreate {
  name: string;
  version: string;
  description: string;
  dependencies: string[];
  enabled: boolean;
  install_date: string;
  status: ModuleStatus;
}

export interface ModuleRegistryUpdate {
  name?: string;
  version?: string;
  description?: string;
  dependencies?: string[];
  enabled?: boolean;
  install_date?: string;
  status?: ModuleStatus;
}

export interface ModuleRegistryQuery {
  search?: string;
  enabled?: boolean;
  status?: ModuleStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface VersionRegistry {
  id: string;
  version: string;
  release_date: string;
  changelog: string;
  breaking_changes: string[];
  migration_required: boolean;
  status: VersionStatus;
  created_at: string;
  updated_at: string;
}

export interface VersionRegistryCreate {
  version: string;
  release_date: string;
  changelog: string;
  breaking_changes: string[];
  migration_required: boolean;
  status: VersionStatus;
}

export interface VersionRegistryUpdate {
  version?: string;
  release_date?: string;
  changelog?: string;
  breaking_changes?: string[];
  migration_required?: boolean;
  status?: VersionStatus;
}

export interface VersionRegistryQuery {
  search?: string;
  status?: VersionStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantRegistry {
  id: string;
  tenant_id: string;
  name: string;
  plan: TenantPlan;
  region: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantRegistryCreate {
  tenant_id: string;
  name: string;
  plan: TenantPlan;
  region: string;
  status: PlatformStatus;
}

export interface TenantRegistryUpdate {
  tenant_id?: string;
  name?: string;
  plan?: TenantPlan;
  region?: string;
  status?: PlatformStatus;
}

export interface TenantRegistryQuery {
  search?: string;
  plan?: TenantPlan;
  region?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface LicenseRegistry {
  id: string;
  tenant_id: string;
  license_type: LicenseType;
  max_users: number;
  max_schools: number;
  features: string[];
  start_date: string;
  expiry_date: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface LicenseRegistryCreate {
  tenant_id: string;
  license_type: LicenseType;
  max_users: number;
  max_schools: number;
  features: string[];
  start_date: string;
  expiry_date: string;
  status: PlatformStatus;
}

export interface LicenseRegistryUpdate {
  tenant_id?: string;
  license_type?: LicenseType;
  max_users?: number;
  max_schools?: number;
  features?: string[];
  start_date?: string;
  expiry_date?: string;
  status?: PlatformStatus;
}

export interface LicenseRegistryQuery {
  search?: string;
  tenant_id?: string;
  license_type?: LicenseType;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface DeploymentRegistry {
  id: string;
  version: string;
  environment: PlatformEnvironment;
  deployed_by: string;
  deployed_at: string;
  rollback_available: boolean;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface DeploymentRegistryCreate {
  version: string;
  environment: PlatformEnvironment;
  deployed_by: string;
  deployed_at: string;
  rollback_available: boolean;
  status: PlatformStatus;
}

export interface DeploymentRegistryUpdate {
  version?: string;
  environment?: PlatformEnvironment;
  deployed_by?: string;
  deployed_at?: string;
  rollback_available?: boolean;
  status?: PlatformStatus;
}

export interface DeploymentRegistryQuery {
  search?: string;
  environment?: PlatformEnvironment;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PlatformDashboard {
  id: string;
  name: string;
  widgets: Record<string, unknown>[];
  layout: Record<string, unknown>;
  refresh_interval: number;
  access_level: DashboardAccessLevel;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface PlatformDashboardCreate {
  name: string;
  widgets: Record<string, unknown>[];
  layout: Record<string, unknown>;
  refresh_interval: number;
  access_level: DashboardAccessLevel;
  status: PlatformStatus;
}

export interface PlatformDashboardUpdate {
  name?: string;
  widgets?: Record<string, unknown>[];
  layout?: Record<string, unknown>;
  refresh_interval?: number;
  access_level?: DashboardAccessLevel;
  status?: PlatformStatus;
}

export interface PlatformDashboardQuery {
  search?: string;
  access_level?: DashboardAccessLevel;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PlatformMetric {
  id: string;
  name: string;
  category: MetricCategory;
  value: number;
  unit: string;
  period: string;
  trend: MetricTrend;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface PlatformMetricCreate {
  name: string;
  category: MetricCategory;
  value: number;
  unit: string;
  period: string;
  trend: MetricTrend;
  status: PlatformStatus;
}

export interface PlatformMetricUpdate {
  name?: string;
  category?: MetricCategory;
  value?: number;
  unit?: string;
  period?: string;
  trend?: MetricTrend;
  status?: PlatformStatus;
}

export interface PlatformMetricQuery {
  search?: string;
  category?: MetricCategory;
  trend?: MetricTrend;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PlatformAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  source: string;
  acknowledged_by: string;
  acknowledged_at: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface PlatformAlertCreate {
  severity: AlertSeverity;
  title: string;
  message: string;
  source: string;
  acknowledged_by: string;
  acknowledged_at: string;
  status: PlatformStatus;
}

export interface PlatformAlertUpdate {
  severity?: AlertSeverity;
  title?: string;
  message?: string;
  source?: string;
  acknowledged_by?: string;
  acknowledged_at?: string;
  status?: PlatformStatus;
}

export interface PlatformAlertQuery {
  search?: string;
  severity?: AlertSeverity;
  source?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PlatformAudit {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  details: Record<string, unknown>;
  ip_address: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface PlatformAuditCreate {
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  details: Record<string, unknown>;
  ip_address: string;
  status: PlatformStatus;
}

export interface PlatformAuditUpdate {
  action?: string;
  entity_type?: string;
  entity_id?: string;
  user_id?: string;
  details?: Record<string, unknown>;
  ip_address?: string;
  status?: PlatformStatus;
}

export interface PlatformAuditQuery {
  search?: string;
  action?: string;
  entity_type?: string;
  user_id?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PlatformBackup {
  id: string;
  type: BackupType;
  size_bytes: number;
  location: string;
  started_at: string;
  completed_at: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface PlatformBackupCreate {
  type: BackupType;
  size_bytes: number;
  location: string;
  started_at: string;
  completed_at: string;
  status: PlatformStatus;
}

export interface PlatformBackupUpdate {
  type?: BackupType;
  size_bytes?: number;
  location?: string;
  started_at?: string;
  completed_at?: string;
  status?: PlatformStatus;
}

export interface PlatformBackupQuery {
  search?: string;
  type?: BackupType;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PlatformEvent {
  id: string;
  event_type: string;
  source: string;
  payload: Record<string, unknown>;
  processed: boolean;
  processed_at: string;
  status: EventStatus;
  created_at: string;
  updated_at: string;
}

export interface PlatformEventCreate {
  event_type: string;
  source: string;
  payload: Record<string, unknown>;
  processed: boolean;
  processed_at: string;
  status: EventStatus;
}

export interface PlatformEventUpdate {
  event_type?: string;
  source?: string;
  payload?: Record<string, unknown>;
  processed?: boolean;
  processed_at?: string;
  status?: EventStatus;
}

export interface PlatformEventQuery {
  search?: string;
  event_type?: string;
  source?: string;
  status?: EventStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PlatformConfig {
  id: string;
  key: string;
  value: string;
  category: string;
  environment: PlatformEnvironment;
  overridden: boolean;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface PlatformConfigCreate {
  key: string;
  value: string;
  category: string;
  environment: PlatformEnvironment;
  overridden: boolean;
  status: PlatformStatus;
}

export interface PlatformConfigUpdate {
  key?: string;
  value?: string;
  category?: string;
  environment?: PlatformEnvironment;
  overridden?: boolean;
  status?: PlatformStatus;
}

export interface PlatformConfigQuery {
  search?: string;
  category?: string;
  environment?: PlatformEnvironment;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PlatformWebhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  secret: string;
  retry_count: number;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface PlatformWebhookCreate {
  name: string;
  url: string;
  events: string[];
  secret: string;
  retry_count: number;
  status: PlatformStatus;
}

export interface PlatformWebhookUpdate {
  name?: string;
  url?: string;
  events?: string[];
  secret?: string;
  retry_count?: number;
  status?: PlatformStatus;
}

export interface PlatformWebhookQuery {
  search?: string;
  events?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PlatformApiKey {
  id: string;
  name: string;
  key_hash: string;
  permissions: string[];
  expires_at: string;
  last_used_at: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface PlatformApiKeyCreate {
  name: string;
  key_hash: string;
  permissions: string[];
  expires_at: string;
  last_used_at: string;
  status: PlatformStatus;
}

export interface PlatformApiKeyUpdate {
  name?: string;
  key_hash?: string;
  permissions?: string[];
  expires_at?: string;
  last_used_at?: string;
  status?: PlatformStatus;
}

export interface PlatformApiKeyQuery {
  search?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// =============================================================================
// DOMAIN 2 - MULTI-TENANT ENTERPRISE
// =============================================================================

// =============================================================================
// ENUMS
// =============================================================================

export const TenantStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  MIGRATING: 'migrating',
} as const;
export type TenantStatus = (typeof TenantStatus)[keyof typeof TenantStatus];

export const IsolationStrategy = {
  SHARED_SCHEMA: 'shared_schema',
  DEDICATED_SCHEMA: 'dedicated_schema',
  DEDICATED_DATABASE: 'dedicated_database',
  DEDICATED_CLUSTER: 'dedicated_cluster',
} as const;
export type IsolationStrategy = (typeof IsolationStrategy)[keyof typeof IsolationStrategy];

export const MigrationStatus = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  ROLLED_BACK: 'rolled_back',
} as const;
export type MigrationStatus = (typeof MigrationStatus)[keyof typeof MigrationStatus];

export const BackupFrequency = {
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const;
export type BackupFrequency = (typeof BackupFrequency)[keyof typeof BackupFrequency];

export const RestoreStatus = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type RestoreStatus = (typeof RestoreStatus)[keyof typeof RestoreStatus];

export const CloneStatus = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type CloneStatus = (typeof CloneStatus)[keyof typeof CloneStatus];

export const MergeConflictStrategy = {
  SOURCE_WINS: 'source_wins',
  TARGET_WINS: 'target_wins',
  MANUAL: 'manual',
  MERGE: 'merge',
} as const;
export type MergeConflictStrategy = (typeof MergeConflictStrategy)[keyof typeof MergeConflictStrategy];

export const MergeStatus = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CONFLICT: 'conflict',
} as const;
export type MergeStatus = (typeof MergeStatus)[keyof typeof MergeStatus];

export const SplitStrategy = {
  BY_REGION: 'by_region',
  BY_DEPARTMENT: 'by_department',
  BY_MODULE: 'by_module',
  CUSTOM: 'custom',
} as const;
export type SplitStrategy = (typeof SplitStrategy)[keyof typeof SplitStrategy];

export const SplitStatus = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type SplitStatus = (typeof SplitStatus)[keyof typeof SplitStatus];

export const BillingCycle = {
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  ANNUAL: 'annual',
} as const;
export type BillingCycle = (typeof BillingCycle)[keyof typeof BillingCycle];

export const SsoProvider = {
  SAML: 'saml',
  OIDC: 'oidc',
  OAUTH2: 'oauth2',
  LDAP: 'ldap',
} as const;
export type SsoProvider = (typeof SsoProvider)[keyof typeof SsoProvider];

// =============================================================================
// ENTITIES
// =============================================================================

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: TenantPlan;
  region: string;
  primary_domain: string;
  status: TenantStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantCreate {
  name: string;
  slug: string;
  plan: TenantPlan;
  region: string;
  primary_domain: string;
  status: TenantStatus;
}

export interface TenantUpdate {
  name?: string;
  slug?: string;
  plan?: TenantPlan;
  region?: string;
  primary_domain?: string;
  status?: TenantStatus;
}

export interface TenantQuery {
  search?: string;
  plan?: TenantPlan;
  region?: string;
  status?: TenantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantIsolation {
  id: string;
  tenant_id: string;
  strategy: IsolationStrategy;
  schema_name: string;
  database_name: string;
  status: TenantStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantIsolationCreate {
  tenant_id: string;
  strategy: IsolationStrategy;
  schema_name: string;
  database_name: string;
  status: TenantStatus;
}

export interface TenantIsolationUpdate {
  tenant_id?: string;
  strategy?: IsolationStrategy;
  schema_name?: string;
  database_name?: string;
  status?: TenantStatus;
}

export interface TenantIsolationQuery {
  search?: string;
  tenant_id?: string;
  strategy?: IsolationStrategy;
  status?: TenantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantMigration {
  id: string;
  tenant_id: string;
  version: string;
  script_name: string;
  executed_at: string;
  duration_ms: number;
  status: MigrationStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantMigrationCreate {
  tenant_id: string;
  version: string;
  script_name: string;
  executed_at: string;
  duration_ms: number;
  status: MigrationStatus;
}

export interface TenantMigrationUpdate {
  tenant_id?: string;
  version?: string;
  script_name?: string;
  executed_at?: string;
  duration_ms?: number;
  status?: MigrationStatus;
}

export interface TenantMigrationQuery {
  search?: string;
  tenant_id?: string;
  version?: string;
  status?: MigrationStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantBackupConfig {
  id: string;
  tenant_id: string;
  frequency: BackupFrequency;
  retention_days: number;
  last_backup_at: string;
  status: TenantStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantBackupConfigCreate {
  tenant_id: string;
  frequency: BackupFrequency;
  retention_days: number;
  last_backup_at: string;
  status: TenantStatus;
}

export interface TenantBackupConfigUpdate {
  tenant_id?: string;
  frequency?: BackupFrequency;
  retention_days?: number;
  last_backup_at?: string;
  status?: TenantStatus;
}

export interface TenantBackupConfigQuery {
  search?: string;
  tenant_id?: string;
  frequency?: BackupFrequency;
  status?: TenantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantRestore {
  id: string;
  tenant_id: string;
  backup_id: string;
  restore_point: string;
  started_at: string;
  completed_at: string;
  status: RestoreStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantRestoreCreate {
  tenant_id: string;
  backup_id: string;
  restore_point: string;
  started_at: string;
  completed_at: string;
  status: RestoreStatus;
}

export interface TenantRestoreUpdate {
  tenant_id?: string;
  backup_id?: string;
  restore_point?: string;
  started_at?: string;
  completed_at?: string;
  status?: RestoreStatus;
}

export interface TenantRestoreQuery {
  search?: string;
  tenant_id?: string;
  backup_id?: string;
  status?: RestoreStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantArchive {
  id: string;
  tenant_id: string;
  archive_date: string;
  restore_available_until: string;
  size_bytes: number;
  status: TenantStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantArchiveCreate {
  tenant_id: string;
  archive_date: string;
  restore_available_until: string;
  size_bytes: number;
  status: TenantStatus;
}

export interface TenantArchiveUpdate {
  tenant_id?: string;
  archive_date?: string;
  restore_available_until?: string;
  size_bytes?: number;
  status?: TenantStatus;
}

export interface TenantArchiveQuery {
  search?: string;
  tenant_id?: string;
  status?: TenantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantClone {
  id: string;
  source_tenant_id: string;
  target_tenant_id: string;
  data_included: string[];
  started_at: string;
  completed_at: string;
  status: CloneStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantCloneCreate {
  source_tenant_id: string;
  target_tenant_id: string;
  data_included: string[];
  started_at: string;
  completed_at: string;
  status: CloneStatus;
}

export interface TenantCloneUpdate {
  source_tenant_id?: string;
  target_tenant_id?: string;
  data_included?: string[];
  started_at?: string;
  completed_at?: string;
  status?: CloneStatus;
}

export interface TenantCloneQuery {
  search?: string;
  source_tenant_id?: string;
  target_tenant_id?: string;
  status?: CloneStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantMerge {
  id: string;
  source_tenant_id: string;
  target_tenant_id: string;
  conflict_strategy: MergeConflictStrategy;
  started_at: string;
  completed_at: string;
  status: MergeStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantMergeCreate {
  source_tenant_id: string;
  target_tenant_id: string;
  conflict_strategy: MergeConflictStrategy;
  started_at: string;
  completed_at: string;
  status: MergeStatus;
}

export interface TenantMergeUpdate {
  source_tenant_id?: string;
  target_tenant_id?: string;
  conflict_strategy?: MergeConflictStrategy;
  started_at?: string;
  completed_at?: string;
  status?: MergeStatus;
}

export interface TenantMergeQuery {
  search?: string;
  source_tenant_id?: string;
  target_tenant_id?: string;
  status?: MergeStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantSplit {
  id: string;
  source_tenant_id: string;
  target_tenant_ids: string[];
  split_strategy: SplitStrategy;
  started_at: string;
  completed_at: string;
  status: SplitStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantSplitCreate {
  source_tenant_id: string;
  target_tenant_ids: string[];
  split_strategy: SplitStrategy;
  started_at: string;
  completed_at: string;
  status: SplitStatus;
}

export interface TenantSplitUpdate {
  source_tenant_id?: string;
  target_tenant_ids?: string[];
  split_strategy?: SplitStrategy;
  started_at?: string;
  completed_at?: string;
  status?: SplitStatus;
}

export interface TenantSplitQuery {
  search?: string;
  source_tenant_id?: string;
  split_strategy?: SplitStrategy;
  status?: SplitStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantMonitoring {
  id: string;
  tenant_id: string;
  metric_name: string;
  value: number;
  threshold: number;
  alert_enabled: boolean;
  status: TenantStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantMonitoringCreate {
  tenant_id: string;
  metric_name: string;
  value: number;
  threshold: number;
  alert_enabled: boolean;
  status: TenantStatus;
}

export interface TenantMonitoringUpdate {
  tenant_id?: string;
  metric_name?: string;
  value?: number;
  threshold?: number;
  alert_enabled?: boolean;
  status?: TenantStatus;
}

export interface TenantMonitoringQuery {
  search?: string;
  tenant_id?: string;
  metric_name?: string;
  alert_enabled?: boolean;
  status?: TenantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantAnalytics {
  id: string;
  tenant_id: string;
  metric_name: string;
  value: number;
  period: string;
  comparison: string;
  trend: MetricTrend;
  status: TenantStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantAnalyticsCreate {
  tenant_id: string;
  metric_name: string;
  value: number;
  period: string;
  comparison: string;
  trend: MetricTrend;
  status: TenantStatus;
}

export interface TenantAnalyticsUpdate {
  tenant_id?: string;
  metric_name?: string;
  value?: number;
  period?: string;
  comparison?: string;
  trend?: MetricTrend;
  status?: TenantStatus;
}

export interface TenantAnalyticsQuery {
  search?: string;
  tenant_id?: string;
  metric_name?: string;
  trend?: MetricTrend;
  status?: TenantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantQuota {
  id: string;
  tenant_id: string;
  resource: string;
  limit: number;
  used: number;
  period: string;
  status: TenantStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantQuotaCreate {
  tenant_id: string;
  resource: string;
  limit: number;
  used: number;
  period: string;
  status: TenantStatus;
}

export interface TenantQuotaUpdate {
  tenant_id?: string;
  resource?: string;
  limit?: number;
  used?: number;
  period?: string;
  status?: TenantStatus;
}

export interface TenantQuotaQuery {
  search?: string;
  tenant_id?: string;
  resource?: string;
  status?: TenantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantBilling {
  id: string;
  tenant_id: string;
  plan: TenantPlan;
  amount: number;
  currency: string;
  billing_cycle: BillingCycle;
  next_billing_date: string;
  status: TenantStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantBillingCreate {
  tenant_id: string;
  plan: TenantPlan;
  amount: number;
  currency: string;
  billing_cycle: BillingCycle;
  next_billing_date: string;
  status: TenantStatus;
}

export interface TenantBillingUpdate {
  tenant_id?: string;
  plan?: TenantPlan;
  amount?: number;
  currency?: string;
  billing_cycle?: BillingCycle;
  next_billing_date?: string;
  status?: TenantStatus;
}

export interface TenantBillingQuery {
  search?: string;
  tenant_id?: string;
  plan?: TenantPlan;
  billing_cycle?: BillingCycle;
  status?: TenantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantFeature {
  id: string;
  tenant_id: string;
  feature_id: string;
  enabled: boolean;
  configured_at: string;
  status: TenantStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantFeatureCreate {
  tenant_id: string;
  feature_id: string;
  enabled: boolean;
  configured_at: string;
  status: TenantStatus;
}

export interface TenantFeatureUpdate {
  tenant_id?: string;
  feature_id?: string;
  enabled?: boolean;
  configured_at?: string;
  status?: TenantStatus;
}

export interface TenantFeatureQuery {
  search?: string;
  tenant_id?: string;
  feature_id?: string;
  enabled?: boolean;
  status?: TenantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantSso {
  id: string;
  tenant_id: string;
  provider: SsoProvider;
  entity_id: string;
  metadata_url: string;
  certificate: string;
  status: TenantStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantSsoCreate {
  tenant_id: string;
  provider: SsoProvider;
  entity_id: string;
  metadata_url: string;
  certificate: string;
  status: TenantStatus;
}

export interface TenantSsoUpdate {
  tenant_id?: string;
  provider?: SsoProvider;
  entity_id?: string;
  metadata_url?: string;
  certificate?: string;
  status?: TenantStatus;
}

export interface TenantSsoQuery {
  search?: string;
  tenant_id?: string;
  provider?: SsoProvider;
  status?: TenantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TenantCustomDomain {
  id: string;
  tenant_id: string;
  domain: string;
  verified: boolean;
  ssl_enabled: boolean;
  verified_at: string;
  status: TenantStatus;
  created_at: string;
  updated_at: string;
}

export interface TenantCustomDomainCreate {
  tenant_id: string;
  domain: string;
  verified: boolean;
  ssl_enabled: boolean;
  verified_at: string;
  status: TenantStatus;
}

export interface TenantCustomDomainUpdate {
  tenant_id?: string;
  domain?: string;
  verified?: boolean;
  ssl_enabled?: boolean;
  verified_at?: string;
  status?: TenantStatus;
}

export interface TenantCustomDomainQuery {
  search?: string;
  tenant_id?: string;
  verified?: boolean;
  ssl_enabled?: boolean;
  status?: TenantStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// =============================================================================
// DOMAIN 3 - DEPLOYMENT PLATFORM
// =============================================================================

// =============================================================================
// ENUMS
// =============================================================================

export const PipelineStatus = {
  IDLE: 'idle',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;
export type PipelineStatus = (typeof PipelineStatus)[keyof typeof PipelineStatus];

export const PipelineStageType = {
  BUILD: 'build',
  TEST: 'test',
  SECURITY_SCAN: 'security_scan',
  STAGING: 'staging',
  APPROVAL: 'approval',
  DEPLOY: 'deploy',
  VERIFY: 'verify',
} as const;
export type PipelineStageType = (typeof PipelineStageType)[keyof typeof PipelineStageType];

export const PipelineTrigger = {
  MANUAL: 'manual',
  PUSH: 'push',
  SCHEDULE: 'schedule',
  WEBHOOK: 'webhook',
  API: 'api',
} as const;
export type PipelineTrigger = (typeof PipelineTrigger)[keyof typeof PipelineTrigger];

export const DeploymentStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  ROLLED_BACK: 'rolled_back',
  CANCELLED: 'cancelled',
} as const;
export type DeploymentStatus = (typeof DeploymentStatus)[keyof typeof DeploymentStatus];

export const RollbackReason = {
  BUG: 'bug',
  PERFORMANCE: 'performance',
  SECURITY: 'security',
  COMPATIBILITY: 'compatibility',
  MANUAL: 'manual',
} as const;
export type RollbackReason = (typeof RollbackReason)[keyof typeof RollbackReason];

export const MigrationScriptStatus = {
  PENDING: 'pending',
  EXECUTED: 'executed',
  REVERTED: 'reverted',
  FAILED: 'failed',
} as const;
export type MigrationScriptStatus = (typeof MigrationScriptStatus)[keyof typeof MigrationScriptStatus];

export const PromotionStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type PromotionStatus = (typeof PromotionStatus)[keyof typeof PromotionStatus];

export const ApprovalStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CONDITIONAL: 'conditional',
} as const;
export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

// =============================================================================
// ENTITIES
// =============================================================================

export interface ReleasePipeline {
  id: string;
  name: string;
  stages: string[];
  triggers: PipelineTrigger[];
  status: PipelineStatus;
  created_at: string;
  updated_at: string;
}

export interface ReleasePipelineCreate {
  name: string;
  stages: string[];
  triggers: PipelineTrigger[];
  status: PipelineStatus;
}

export interface ReleasePipelineUpdate {
  name?: string;
  stages?: string[];
  triggers?: PipelineTrigger[];
  status?: PipelineStatus;
}

export interface ReleasePipelineQuery {
  search?: string;
  status?: PipelineStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PipelineStage {
  id: string;
  pipeline_id: string;
  name: string;
  order: number;
  type: PipelineStageType;
  config: Record<string, unknown>;
  timeout_seconds: number;
  status: PipelineStatus;
  created_at: string;
  updated_at: string;
}

export interface PipelineStageCreate {
  pipeline_id: string;
  name: string;
  order: number;
  type: PipelineStageType;
  config: Record<string, unknown>;
  timeout_seconds: number;
  status: PipelineStatus;
}

export interface PipelineStageUpdate {
  pipeline_id?: string;
  name?: string;
  order?: number;
  type?: PipelineStageType;
  config?: Record<string, unknown>;
  timeout_seconds?: number;
  status?: PipelineStatus;
}

export interface PipelineStageQuery {
  search?: string;
  pipeline_id?: string;
  type?: PipelineStageType;
  status?: PipelineStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PipelineRun {
  id: string;
  pipeline_id: string;
  trigger: PipelineTrigger;
  started_by: string;
  started_at: string;
  completed_at: string;
  status: PipelineStatus;
  created_at: string;
  updated_at: string;
}

export interface PipelineRunCreate {
  pipeline_id: string;
  trigger: PipelineTrigger;
  started_by: string;
  started_at: string;
  completed_at: string;
  status: PipelineStatus;
}

export interface PipelineRunUpdate {
  pipeline_id?: string;
  trigger?: PipelineTrigger;
  started_by?: string;
  started_at?: string;
  completed_at?: string;
  status?: PipelineStatus;
}

export interface PipelineRunQuery {
  search?: string;
  pipeline_id?: string;
  trigger?: PipelineTrigger;
  status?: PipelineStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface VersionManager {
  id: string;
  name: string;
  current_version: string;
  latest_version: string;
  auto_update: boolean;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface VersionManagerCreate {
  name: string;
  current_version: string;
  latest_version: string;
  auto_update: boolean;
  status: PlatformStatus;
}

export interface VersionManagerUpdate {
  name?: string;
  current_version?: string;
  latest_version?: string;
  auto_update?: boolean;
  status?: PlatformStatus;
}

export interface VersionManagerQuery {
  search?: string;
  auto_update?: boolean;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface BlueGreenDeployment {
  id: string;
  service_name: string;
  active_version: string;
  standby_version: string;
  switch_time: string;
  status: DeploymentStatus;
  created_at: string;
  updated_at: string;
}

export interface BlueGreenDeploymentCreate {
  service_name: string;
  active_version: string;
  standby_version: string;
  switch_time: string;
  status: DeploymentStatus;
}

export interface BlueGreenDeploymentUpdate {
  service_name?: string;
  active_version?: string;
  standby_version?: string;
  switch_time?: string;
  status?: DeploymentStatus;
}

export interface BlueGreenDeploymentQuery {
  search?: string;
  service_name?: string;
  status?: DeploymentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface CanaryDeployment {
  id: string;
  service_name: string;
  version: string;
  percentage: number;
  increment_step: number;
  increment_interval: number;
  status: DeploymentStatus;
  created_at: string;
  updated_at: string;
}

export interface CanaryDeploymentCreate {
  service_name: string;
  version: string;
  percentage: number;
  increment_step: number;
  increment_interval: number;
  status: DeploymentStatus;
}

export interface CanaryDeploymentUpdate {
  service_name?: string;
  version?: string;
  percentage?: number;
  increment_step?: number;
  increment_interval?: number;
  status?: DeploymentStatus;
}

export interface CanaryDeploymentQuery {
  search?: string;
  service_name?: string;
  status?: DeploymentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Rollback {
  id: string;
  deployment_id: string;
  from_version: string;
  to_version: string;
  reason: RollbackReason;
  initiated_by: string;
  status: DeploymentStatus;
  created_at: string;
  updated_at: string;
}

export interface RollbackCreate {
  deployment_id: string;
  from_version: string;
  to_version: string;
  reason: RollbackReason;
  initiated_by: string;
  status: DeploymentStatus;
}

export interface RollbackUpdate {
  deployment_id?: string;
  from_version?: string;
  to_version?: string;
  reason?: RollbackReason;
  initiated_by?: string;
  status?: DeploymentStatus;
}

export interface RollbackQuery {
  search?: string;
  deployment_id?: string;
  reason?: RollbackReason;
  status?: DeploymentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MigrationManager {
  id: string;
  name: string;
  version: string;
  script: string;
  execution_time_ms: number;
  reversible: boolean;
  status: MigrationScriptStatus;
  created_at: string;
  updated_at: string;
}

export interface MigrationManagerCreate {
  name: string;
  version: string;
  script: string;
  execution_time_ms: number;
  reversible: boolean;
  status: MigrationScriptStatus;
}

export interface MigrationManagerUpdate {
  name?: string;
  version?: string;
  script?: string;
  execution_time_ms?: number;
  reversible?: boolean;
  status?: MigrationScriptStatus;
}

export interface MigrationManagerQuery {
  search?: string;
  version?: string;
  reversible?: boolean;
  status?: MigrationScriptStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface EnvironmentPromotion {
  id: string;
  service_name: string;
  from_env: PlatformEnvironment;
  to_env: PlatformEnvironment;
  approved_by: string;
  promoted_at: string;
  status: PromotionStatus;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentPromotionCreate {
  service_name: string;
  from_env: PlatformEnvironment;
  to_env: PlatformEnvironment;
  approved_by: string;
  promoted_at: string;
  status: PromotionStatus;
}

export interface EnvironmentPromotionUpdate {
  service_name?: string;
  from_env?: PlatformEnvironment;
  to_env?: PlatformEnvironment;
  approved_by?: string;
  promoted_at?: string;
  status?: PromotionStatus;
}

export interface EnvironmentPromotionQuery {
  search?: string;
  service_name?: string;
  from_env?: PlatformEnvironment;
  to_env?: PlatformEnvironment;
  status?: PromotionStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface DeploymentHistory {
  id: string;
  service_name: string;
  version: string;
  environment: PlatformEnvironment;
  deployed_by: string;
  deployed_at: string;
  duration_seconds: number;
  status: DeploymentStatus;
  created_at: string;
  updated_at: string;
}

export interface DeploymentHistoryCreate {
  service_name: string;
  version: string;
  environment: PlatformEnvironment;
  deployed_by: string;
  deployed_at: string;
  duration_seconds: number;
  status: DeploymentStatus;
}

export interface DeploymentHistoryUpdate {
  service_name?: string;
  version?: string;
  environment?: PlatformEnvironment;
  deployed_by?: string;
  deployed_at?: string;
  duration_seconds?: number;
  status?: DeploymentStatus;
}

export interface DeploymentHistoryQuery {
  search?: string;
  service_name?: string;
  environment?: PlatformEnvironment;
  status?: DeploymentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FeatureDeployment {
  id: string;
  feature_id: string;
  environment: PlatformEnvironment;
  version: string;
  status: DeploymentStatus;
  created_at: string;
  updated_at: string;
}

export interface FeatureDeploymentCreate {
  feature_id: string;
  environment: PlatformEnvironment;
  version: string;
  status: DeploymentStatus;
}

export interface FeatureDeploymentUpdate {
  feature_id?: string;
  environment?: PlatformEnvironment;
  version?: string;
  status?: DeploymentStatus;
}

export interface FeatureDeploymentQuery {
  search?: string;
  feature_id?: string;
  environment?: PlatformEnvironment;
  status?: DeploymentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface ConfigDeployment {
  id: string;
  config_id: string;
  environment: PlatformEnvironment;
  version: string;
  status: DeploymentStatus;
  created_at: string;
  updated_at: string;
}

export interface ConfigDeploymentCreate {
  config_id: string;
  environment: PlatformEnvironment;
  version: string;
  status: DeploymentStatus;
}

export interface ConfigDeploymentUpdate {
  config_id?: string;
  environment?: PlatformEnvironment;
  version?: string;
  status?: DeploymentStatus;
}

export interface ConfigDeploymentQuery {
  search?: string;
  config_id?: string;
  environment?: PlatformEnvironment;
  status?: DeploymentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface InfrastructureChange {
  id: string;
  resource_type: string;
  resource_id: string;
  change_type: string;
  details: Record<string, unknown>;
  status: DeploymentStatus;
  created_at: string;
  updated_at: string;
}

export interface InfrastructureChangeCreate {
  resource_type: string;
  resource_id: string;
  change_type: string;
  details: Record<string, unknown>;
  status: DeploymentStatus;
}

export interface InfrastructureChangeUpdate {
  resource_type?: string;
  resource_id?: string;
  change_type?: string;
  details?: Record<string, unknown>;
  status?: DeploymentStatus;
}

export interface InfrastructureChangeQuery {
  search?: string;
  resource_type?: string;
  change_type?: string;
  status?: DeploymentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface DeploymentApproval {
  id: string;
  deployment_id: string;
  approver_id: string;
  approved_at: string;
  conditions: string[];
  status: ApprovalStatus;
  created_at: string;
  updated_at: string;
}

export interface DeploymentApprovalCreate {
  deployment_id: string;
  approver_id: string;
  approved_at: string;
  conditions: string[];
  status: ApprovalStatus;
}

export interface DeploymentApprovalUpdate {
  deployment_id?: string;
  approver_id?: string;
  approved_at?: string;
  conditions?: string[];
  status?: ApprovalStatus;
}

export interface DeploymentApprovalQuery {
  search?: string;
  deployment_id?: string;
  approver_id?: string;
  status?: ApprovalStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// =============================================================================
// DOMAIN 4 - OBSERVABILITY
// =============================================================================

// =============================================================================
// ENUMS
// =============================================================================

export const TraceStatus = {
  OK: 'ok',
  ERROR: 'error',
  TIMEOUT: 'timeout',
  CANCELLED: 'cancelled',
} as const;
export type TraceStatus = (typeof TraceStatus)[keyof typeof TraceStatus];

export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  FATAL: 'fatal',
} as const;
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export const MetricType = {
  COUNTER: 'counter',
  GAUGE: 'gauge',
  HISTOGRAM: 'histogram',
  SUMMARY: 'summary',
} as const;
export type MetricType = (typeof MetricType)[keyof typeof MetricType];

export const AggregationType = {
  AVG: 'avg',
  SUM: 'sum',
  MIN: 'min',
  MAX: 'max',
  COUNT: 'count',
  P50: 'p50',
  P90: 'p90',
  P95: 'p95',
  P99: 'p99',
} as const;
export type AggregationType = (typeof AggregationType)[keyof typeof AggregationType];

export const IncidentSeverity = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical',
} as const;
export type IncidentSeverity = (typeof IncidentSeverity)[keyof typeof IncidentSeverity];

export const IncidentStatus = {
  OPEN: 'open',
  ACKNOWLEDGED: 'acknowledged',
  INVESTIGATING: 'investigating',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
} as const;
export type IncidentStatus = (typeof IncidentStatus)[keyof typeof IncidentStatus];

export const ServiceHealthStatus = {
  HEALTHY: 'healthy',
  DEGRADED: 'degraded',
  UNHEALTHY: 'unhealthy',
  UNKNOWN: 'unknown',
} as const;
export type ServiceHealthStatus = (typeof ServiceHealthStatus)[keyof typeof ServiceHealthStatus];

export const NotificationChannel = {
  EMAIL: 'email',
  SMS: 'sms',
  SLACK: 'slack',
  WEBHOOK: 'webhook',
  PAGERDUTY: 'pagerduty',
} as const;
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];

// =============================================================================
// ENTITIES
// =============================================================================

export interface DistributedTrace {
  id: string;
  trace_id: string;
  span_id: string;
  parent_span_id: string;
  service_name: string;
  operation_name: string;
  start_time: string;
  end_time: string;
  duration_ms: number;
  status: TraceStatus;
  created_at: string;
  updated_at: string;
}

export interface DistributedTraceCreate {
  trace_id: string;
  span_id: string;
  parent_span_id: string;
  service_name: string;
  operation_name: string;
  start_time: string;
  end_time: string;
  duration_ms: number;
  status: TraceStatus;
}

export interface DistributedTraceUpdate {
  trace_id?: string;
  span_id?: string;
  parent_span_id?: string;
  service_name?: string;
  operation_name?: string;
  start_time?: string;
  end_time?: string;
  duration_ms?: number;
  status?: TraceStatus;
}

export interface DistributedTraceQuery {
  search?: string;
  trace_id?: string;
  service_name?: string;
  operation_name?: string;
  status?: TraceStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface TraceSpan {
  id: string;
  trace_id: string;
  span_id: string;
  parent_span_id: string;
  service_name: string;
  operation_name: string;
  start_time: string;
  end_time: string;
  duration_ms: number;
  attributes: Record<string, unknown>;
  status: TraceStatus;
  created_at: string;
  updated_at: string;
}

export interface TraceSpanCreate {
  trace_id: string;
  span_id: string;
  parent_span_id: string;
  service_name: string;
  operation_name: string;
  start_time: string;
  end_time: string;
  duration_ms: number;
  attributes: Record<string, unknown>;
  status: TraceStatus;
}

export interface TraceSpanUpdate {
  trace_id?: string;
  span_id?: string;
  parent_span_id?: string;
  service_name?: string;
  operation_name?: string;
  start_time?: string;
  end_time?: string;
  duration_ms?: number;
  attributes?: Record<string, unknown>;
  status?: TraceStatus;
}

export interface TraceSpanQuery {
  search?: string;
  trace_id?: string;
  service_name?: string;
  operation_name?: string;
  status?: TraceStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface StructuredLog {
  id: string;
  timestamp: string;
  level: LogLevel;
  service_name: string;
  message: string;
  trace_id: string;
  span_id: string;
  attributes: Record<string, unknown>;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface StructuredLogCreate {
  timestamp: string;
  level: LogLevel;
  service_name: string;
  message: string;
  trace_id: string;
  span_id: string;
  attributes: Record<string, unknown>;
  status: PlatformStatus;
}

export interface StructuredLogUpdate {
  timestamp?: string;
  level?: LogLevel;
  service_name?: string;
  message?: string;
  trace_id?: string;
  span_id?: string;
  attributes?: Record<string, unknown>;
  status?: PlatformStatus;
}

export interface StructuredLogQuery {
  search?: string;
  level?: LogLevel;
  service_name?: string;
  trace_id?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MetricEntity {
  id: string;
  name: string;
  type: MetricType;
  value: number;
  unit: string;
  tags: Record<string, string>;
  timestamp: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface MetricEntityCreate {
  name: string;
  type: MetricType;
  value: number;
  unit: string;
  tags: Record<string, string>;
  timestamp: string;
  status: PlatformStatus;
}

export interface MetricEntityUpdate {
  name?: string;
  type?: MetricType;
  value?: number;
  unit?: string;
  tags?: Record<string, string>;
  timestamp?: string;
  status?: PlatformStatus;
}

export interface MetricEntityQuery {
  search?: string;
  name?: string;
  type?: MetricType;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PerformanceDashboard {
  id: string;
  name: string;
  widgets: Record<string, unknown>[];
  layout: Record<string, unknown>;
  refresh_interval: number;
  access_level: DashboardAccessLevel;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface PerformanceDashboardCreate {
  name: string;
  widgets: Record<string, unknown>[];
  layout: Record<string, unknown>;
  refresh_interval: number;
  access_level: DashboardAccessLevel;
  status: PlatformStatus;
}

export interface PerformanceDashboardUpdate {
  name?: string;
  widgets?: Record<string, unknown>[];
  layout?: Record<string, unknown>;
  refresh_interval?: number;
  access_level?: DashboardAccessLevel;
  status?: PlatformStatus;
}

export interface PerformanceDashboardQuery {
  search?: string;
  access_level?: DashboardAccessLevel;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface ErrorDashboard {
  id: string;
  name: string;
  filters: Record<string, unknown>;
  time_range: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface ErrorDashboardCreate {
  name: string;
  filters: Record<string, unknown>;
  time_range: string;
  status: PlatformStatus;
}

export interface ErrorDashboardUpdate {
  name?: string;
  filters?: Record<string, unknown>;
  time_range?: string;
  status?: PlatformStatus;
}

export interface ErrorDashboardQuery {
  search?: string;
  time_range?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SlowQuery {
  id: string;
  query_text: string;
  duration_ms: number;
  rows_examined: number;
  database_name: string;
  frequency: number;
  last_seen: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface SlowQueryCreate {
  query_text: string;
  duration_ms: number;
  rows_examined: number;
  database_name: string;
  frequency: number;
  last_seen: string;
  status: PlatformStatus;
}

export interface SlowQueryUpdate {
  query_text?: string;
  duration_ms?: number;
  rows_examined?: number;
  database_name?: string;
  frequency?: number;
  last_seen?: string;
  status?: PlatformStatus;
}

export interface SlowQueryQuery {
  search?: string;
  database_name?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  window_seconds: number;
  notification_channels: NotificationChannel[];
  enabled: boolean;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface AlertRuleCreate {
  name: string;
  condition: string;
  threshold: number;
  window_seconds: number;
  notification_channels: NotificationChannel[];
  enabled: boolean;
  status: PlatformStatus;
}

export interface AlertRuleUpdate {
  name?: string;
  condition?: string;
  threshold?: number;
  window_seconds?: number;
  notification_channels?: NotificationChannel[];
  enabled?: boolean;
  status?: PlatformStatus;
}

export interface AlertRuleQuery {
  search?: string;
  enabled?: boolean;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface AlertIncident {
  id: string;
  rule_id: string;
  severity: IncidentSeverity;
  title: string;
  message: string;
  started_at: string;
  acknowledged_at: string;
  resolved_at: string;
  status: IncidentStatus;
  created_at: string;
  updated_at: string;
}

export interface AlertIncidentCreate {
  rule_id: string;
  severity: IncidentSeverity;
  title: string;
  message: string;
  started_at: string;
  acknowledged_at: string;
  resolved_at: string;
  status: IncidentStatus;
}

export interface AlertIncidentUpdate {
  rule_id?: string;
  severity?: IncidentSeverity;
  title?: string;
  message?: string;
  started_at?: string;
  acknowledged_at?: string;
  resolved_at?: string;
  status?: IncidentStatus;
}

export interface AlertIncidentQuery {
  search?: string;
  rule_id?: string;
  severity?: IncidentSeverity;
  status?: IncidentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SLO {
  id: string;
  name: string;
  description: string;
  target_percentage: number;
  window: string;
  current_percentage: number;
  error_budget_remaining: number;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface SLOCreate {
  name: string;
  description: string;
  target_percentage: number;
  window: string;
  current_percentage: number;
  error_budget_remaining: number;
  status: PlatformStatus;
}

export interface SLOUpdate {
  name?: string;
  description?: string;
  target_percentage?: number;
  window?: string;
  current_percentage?: number;
  error_budget_remaining?: number;
  status?: PlatformStatus;
}

export interface SLOQuery {
  search?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SLA {
  id: string;
  name: string;
  description: string;
  availability_target: number;
  response_time_target: number;
  resolution_time_target: number;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface SLACreate {
  name: string;
  description: string;
  availability_target: number;
  response_time_target: number;
  resolution_time_target: number;
  status: PlatformStatus;
}

export interface SLAUpdate {
  name?: string;
  description?: string;
  availability_target?: number;
  response_time_target?: number;
  resolution_time_target?: number;
  status?: PlatformStatus;
}

export interface SLAQuery {
  search?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface ServiceHealth {
  id: string;
  service_name: string;
  status: ServiceHealthStatus;
  uptime_percentage: number;
  last_incident: string;
  error_rate: number;
  latency_p99: number;
  status2: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface ServiceHealthCreate {
  service_name: string;
  status: ServiceHealthStatus;
  uptime_percentage: number;
  last_incident: string;
  error_rate: number;
  latency_p99: number;
  status2: PlatformStatus;
}

export interface ServiceHealthUpdate {
  service_name?: string;
  status?: ServiceHealthStatus;
  uptime_percentage?: number;
  last_incident?: string;
  error_rate?: number;
  latency_p99?: number;
  status2?: PlatformStatus;
}

export interface ServiceHealthQuery {
  search?: string;
  service_name?: string;
  status?: ServiceHealthStatus;
  status2?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface LogAggregation {
  id: string;
  service_name: string;
  level: LogLevel;
  count: number;
  first_seen: string;
  last_seen: string;
  sample_message: string;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface LogAggregationCreate {
  service_name: string;
  level: LogLevel;
  count: number;
  first_seen: string;
  last_seen: string;
  sample_message: string;
  status: PlatformStatus;
}

export interface LogAggregationUpdate {
  service_name?: string;
  level?: LogLevel;
  count?: number;
  first_seen?: string;
  last_seen?: string;
  sample_message?: string;
  status?: PlatformStatus;
}

export interface LogAggregationQuery {
  search?: string;
  service_name?: string;
  level?: LogLevel;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MetricsAggregation {
  id: string;
  metric_name: string;
  aggregation_type: AggregationType;
  value: number;
  period: string;
  dimensions: Record<string, string>;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface MetricsAggregationCreate {
  metric_name: string;
  aggregation_type: AggregationType;
  value: number;
  period: string;
  dimensions: Record<string, string>;
  status: PlatformStatus;
}

export interface MetricsAggregationUpdate {
  metric_name?: string;
  aggregation_type?: AggregationType;
  value?: number;
  period?: string;
  dimensions?: Record<string, string>;
  status?: PlatformStatus;
}

export interface MetricsAggregationQuery {
  search?: string;
  metric_name?: string;
  aggregation_type?: AggregationType;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface AlertEscalation {
  id: string;
  incident_id: string;
  escalation_level: number;
  notified_at: string;
  acknowledged_by: string;
  status: IncidentStatus;
  created_at: string;
  updated_at: string;
}

export interface AlertEscalationCreate {
  incident_id: string;
  escalation_level: number;
  notified_at: string;
  acknowledged_by: string;
  status: IncidentStatus;
}

export interface AlertEscalationUpdate {
  incident_id?: string;
  escalation_level?: number;
  notified_at?: string;
  acknowledged_by?: string;
  status?: IncidentStatus;
}

export interface AlertEscalationQuery {
  search?: string;
  incident_id?: string;
  status?: IncidentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PerformanceBaseline {
  id: string;
  metric_name: string;
  service_name: string;
  baseline_value: number;
  current_value: number;
  deviation: number;
  status: PlatformStatus;
  created_at: string;
  updated_at: string;
}

export interface PerformanceBaselineCreate {
  metric_name: string;
  service_name: string;
  baseline_value: number;
  current_value: number;
  deviation: number;
  status: PlatformStatus;
}

export interface PerformanceBaselineUpdate {
  metric_name?: string;
  service_name?: string;
  baseline_value?: number;
  current_value?: number;
  deviation?: number;
  status?: PlatformStatus;
}

export interface PerformanceBaselineQuery {
  search?: string;
  metric_name?: string;
  service_name?: string;
  status?: PlatformStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

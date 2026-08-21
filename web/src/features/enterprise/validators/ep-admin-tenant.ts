// Enterprise Platform Validators - Admin & Tenant Management
// Phase 2.10 - EduCI Platform

import { z } from 'zod';

// ============================================================
// Domain 1: Platform Administration
// ============================================================

// --- GlobalAdministration ---
export const globalAdministrationCreateSchema = z.object({
  platformId: z.string().uuid(),
  name: z.string().min(2).max(200),
  version: z.string().min(1).max(50),
  environment: z.enum(['production', 'staging', 'development']),
  status: z.enum(['active', 'inactive', 'maintenance']).default('active'),
});

export const globalAdministrationUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  version: z.string().min(1).max(50).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  status: z.enum(['active', 'inactive', 'maintenance']).optional(),
});

export const globalAdministrationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  status: z.enum(['active', 'inactive', 'maintenance']).optional(),
});

// --- PlatformSetting ---
export const platformSettingCreateSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string().max(5000),
  category: z.enum(['security', 'performance', 'ui', 'notification', 'integration']),
  environment: z.enum(['production', 'staging', 'development']),
  isEncrypted: z.boolean().default(false),
  description: z.string().max(500).optional(),
});

export const platformSettingUpdateSchema = z.object({
  value: z.string().max(5000).optional(),
  category: z.enum(['security', 'performance', 'ui', 'notification', 'integration']).optional(),
  isEncrypted: z.boolean().optional(),
  description: z.string().max(500).optional(),
});

export const platformSettingQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['key', 'category', 'created_at']).default('key'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().max(100).optional(),
  category: z.enum(['security', 'performance', 'ui', 'notification', 'integration']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
});

// --- EnvironmentConfig ---
export const environmentConfigCreateSchema = z.object({
  environment: z.enum(['production', 'staging', 'development', 'testing']),
  variables: z.record(z.string(), z.string()),
  secrets: z.array(z.string().max(200)),
  region: z.string().min(1).max(100),
  isActive: z.boolean().default(true),
});

export const environmentConfigUpdateSchema = z.object({
  variables: z.record(z.string(), z.string()).optional(),
  secrets: z.array(z.string().max(200)).optional(),
  region: z.string().min(1).max(100).optional(),
  isActive: z.boolean().optional(),
});

export const environmentConfigQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['environment', 'region', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  environment: z.enum(['production', 'staging', 'development', 'testing']).optional(),
  region: z.string().max(100).optional(),
});

// --- FeatureFlag ---
export const featureFlagCreateSchema = z.object({
  name: z.string().min(1).max(200),
  key: z.string().min(1).max(100).regex(/^[a-z0-9_]+$/),
  description: z.string().max(500).optional(),
  isEnabled: z.boolean().default(false),
  percentage: z.number().min(0).max(100).default(100),
  environments: z.array(z.enum(['production', 'staging', 'development'])),
  targetingRules: z.array(z.object({
    attribute: z.string().max(100),
    operator: z.enum(['eq', 'neq', 'contains', 'starts_with', 'in']),
    values: z.array(z.string().max(200)),
  })).optional(),
});

export const featureFlagUpdateSchema = z.object({
  description: z.string().max(500).optional(),
  isEnabled: z.boolean().optional(),
  percentage: z.number().min(0).max(100).optional(),
  environments: z.array(z.enum(['production', 'staging', 'development'])).optional(),
  targetingRules: z.array(z.object({
    attribute: z.string().max(100),
    operator: z.enum(['eq', 'neq', 'contains', 'starts_with', 'in']),
    values: z.array(z.string().max(200)),
  })).optional(),
});

export const featureFlagQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'key', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  isEnabled: z.boolean().optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
});

// --- ModuleRegistry ---
export const moduleRegistryCreateSchema = z.object({
  name: z.string().min(2).max(200),
  version: z.string().min(1).max(50),
  type: z.enum(['core', 'extension', 'plugin', 'integration']),
  dependencies: z.array(z.string().max(200)),
  config: z.record(z.string(), z.unknown()),
  isPublic: z.boolean().default(false),
});

export const moduleRegistryUpdateSchema = z.object({
  version: z.string().min(1).max(50).optional(),
  dependencies: z.array(z.string().max(200)).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  isPublic: z.boolean().optional(),
});

export const moduleRegistryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'version', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['core', 'extension', 'plugin', 'integration']).optional(),
});

// --- VersionRegistry ---
export const versionRegistryCreateSchema = z.object({
  moduleId: z.string().uuid(),
  version: z.string().min(1).max(50),
  changelog: z.string().max(5000),
  compatibility: z.array(z.string().max(100)),
  status: z.enum(['draft', 'published', 'deprecated', 'archived']),
  publishedBy: z.string().uuid(),
});

export const versionRegistryUpdateSchema = z.object({
  changelog: z.string().max(5000).optional(),
  compatibility: z.array(z.string().max(100)).optional(),
  status: z.enum(['draft', 'published', 'deprecated', 'archived']).optional(),
});

export const versionRegistryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['version', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  moduleId: z.string().uuid().optional(),
  status: z.enum(['draft', 'published', 'deprecated', 'archived']).optional(),
});

// --- TenantRegistry ---
export const tenantRegistryCreateSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
  plan: z.enum(['free', 'starter', 'professional', 'enterprise']),
  region: z.string().min(1).max(100),
  isolationLevel: z.enum(['shared', 'dedicated', 'isolated']),
  maxUsers: z.number().int().min(1).max(100000),
  maxStorage: z.number().int().min(1).max(10000),
});

export const tenantRegistryUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  plan: z.enum(['free', 'starter', 'professional', 'enterprise']).optional(),
  region: z.string().min(1).max(100).optional(),
  isolationLevel: z.enum(['shared', 'dedicated', 'isolated']).optional(),
  maxUsers: z.number().int().min(1).max(100000).optional(),
  maxStorage: z.number().int().min(1).max(10000).optional(),
});

export const tenantRegistryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'slug', 'plan', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  plan: z.enum(['free', 'starter', 'professional', 'enterprise']).optional(),
  region: z.string().max(100).optional(),
});

// --- LicenseRegistry ---
export const licenseRegistryCreateSchema = z.object({
  tenantId: z.string().uuid(),
  licenseType: z.enum(['trial', 'standard', 'premium', 'enterprise']),
  expiresAt: z.string().datetime(),
  features: z.array(z.string().max(200)),
  maxSeats: z.number().int().min(1).max(100000),
  isActive: z.boolean().default(true),
});

export const licenseRegistryUpdateSchema = z.object({
  licenseType: z.enum(['trial', 'standard', 'premium', 'enterprise']).optional(),
  expiresAt: z.string().datetime().optional(),
  features: z.array(z.string().max(200)).optional(),
  maxSeats: z.number().int().min(1).max(100000).optional(),
  isActive: z.boolean().optional(),
});

export const licenseRegistryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['licenseType', 'expiresAt', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  licenseType: z.enum(['trial', 'standard', 'premium', 'enterprise']).optional(),
  isActive: z.boolean().optional(),
});

// --- DeploymentRegistry ---
export const deploymentRegistryCreateSchema = z.object({
  tenantId: z.string().uuid(),
  environment: z.enum(['production', 'staging', 'development']),
  version: z.string().min(1).max(50),
  status: z.enum(['pending', 'deploying', 'completed', 'failed', 'rolled_back']),
  deployedBy: z.string().uuid(),
  commitHash: z.string().min(1).max(40),
});

export const deploymentRegistryUpdateSchema = z.object({
  status: z.enum(['pending', 'deploying', 'completed', 'failed', 'rolled_back']).optional(),
  commitHash: z.string().min(1).max(40).optional(),
  deployedBy: z.string().uuid().optional(),
});

export const deploymentRegistryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['version', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  status: z.enum(['pending', 'deploying', 'completed', 'failed', 'rolled_back']).optional(),
});

// --- PlatformDashboard ---
export const platformDashboardCreateSchema = z.object({
  name: z.string().min(2).max(200),
  layout: z.array(z.object({
    widgetId: z.string().uuid(),
    position: z.object({ x: z.number().int(), y: z.number().int() }),
    size: z.object({ width: z.number().int().min(1), height: z.number().int().min(1) }),
  })),
  visibility: z.enum(['public', 'private', 'shared']),
  ownerUserId: z.string().uuid(),
  refreshInterval: z.number().int().min(0).max(3600).default(300),
});

export const platformDashboardUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  layout: z.array(z.object({
    widgetId: z.string().uuid(),
    position: z.object({ x: z.number().int(), y: z.number().int() }),
    size: z.object({ width: z.number().int().min(1), height: z.number().int().min(1) }),
  })).optional(),
  visibility: z.enum(['public', 'private', 'shared']).optional(),
  refreshInterval: z.number().int().min(0).max(3600).optional(),
});

export const platformDashboardQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  visibility: z.enum(['public', 'private', 'shared']).optional(),
  ownerUserId: z.string().uuid().optional(),
});

// --- PlatformMetric ---
export const platformMetricCreateSchema = z.object({
  name: z.string().min(1).max(200),
  value: z.number(),
  unit: z.string().min(1).max(50),
  tags: z.record(z.string(), z.string()),
  source: z.string().min(1).max(200),
  timestamp: z.string().datetime(),
});

export const platformMetricUpdateSchema = z.object({
  value: z.number().optional(),
  tags: z.record(z.string(), z.string()).optional(),
});

export const platformMetricQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'timestamp', 'value']).default('timestamp'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  name: z.string().max(200).optional(),
  source: z.string().max(200).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- PlatformAlert ---
export const platformAlertCreateSchema = z.object({
  name: z.string().min(2).max(200),
  severity: z.enum(['info', 'warning', 'critical', 'emergency']),
  source: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
  threshold: z.number().optional(),
  condition: z.enum(['gt', 'lt', 'eq', 'gte', 'lte']).optional(),
  enabled: z.boolean().default(true),
  notifyChannels: z.array(z.enum(['email', 'slack', 'webhook', 'sms'])),
});

export const platformAlertUpdateSchema = z.object({
  severity: z.enum(['info', 'warning', 'critical', 'emergency']).optional(),
  message: z.string().min(1).max(2000).optional(),
  threshold: z.number().optional(),
  condition: z.enum(['gt', 'lt', 'eq', 'gte', 'lte']).optional(),
  enabled: z.boolean().optional(),
  notifyChannels: z.array(z.enum(['email', 'slack', 'webhook', 'sms'])).optional(),
});

export const platformAlertQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'severity', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  severity: z.enum(['info', 'warning', 'critical', 'emergency']).optional(),
  enabled: z.boolean().optional(),
});

// --- PlatformAudit ---
export const platformAuditCreateSchema = z.object({
  action: z.string().min(1).max(200),
  actorId: z.string().uuid(),
  actorType: z.enum(['user', 'system', 'api']),
  resourceType: z.string().min(1).max(200),
  resourceId: z.string().max(200),
  details: z.record(z.string(), z.unknown()),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
});

export const platformAuditUpdateSchema = z.object({
  details: z.record(z.string(), z.unknown()).optional(),
});

export const platformAuditQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['action', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  actorId: z.string().uuid().optional(),
  actorType: z.enum(['user', 'system', 'api']).optional(),
  resourceType: z.string().max(200).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- PlatformBackup ---
export const platformBackupCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(['full', 'incremental', 'differential']),
  scope: z.enum(['platform', 'tenant', 'module']),
  schedule: z.string().max(100).optional(),
  retention: z.number().int().min(1).max(365),
  storageLocation: z.string().min(1).max(500),
  isEncrypted: z.boolean().default(true),
});

export const platformBackupUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  schedule: z.string().max(100).optional(),
  retention: z.number().int().min(1).max(365).optional(),
  storageLocation: z.string().min(1).max(500).optional(),
  isEncrypted: z.boolean().optional(),
});

export const platformBackupQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['full', 'incremental', 'differential']).optional(),
  scope: z.enum(['platform', 'tenant', 'module']).optional(),
});

// --- PlatformEvent ---
export const platformEventCreateSchema = z.object({
  type: z.string().min(1).max(200),
  source: z.string().min(1).max(200),
  payload: z.record(z.string(), z.unknown()),
  severity: z.enum(['info', 'warning', 'error', 'critical']),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const platformEventUpdateSchema = z.object({
  payload: z.record(z.string(), z.unknown()).optional(),
  severity: z.enum(['info', 'warning', 'error', 'critical']).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const platformEventQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['type', 'source', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  type: z.string().max(200).optional(),
  source: z.string().max(200).optional(),
  severity: z.enum(['info', 'warning', 'error', 'critical']).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- PlatformConfig ---
export const platformConfigCreateSchema = z.object({
  namespace: z.string().min(1).max(200),
  key: z.string().min(1).max(200),
  value: z.string().max(10000),
  type: z.enum(['string', 'number', 'boolean', 'json', 'encrypted']),
  scope: z.enum(['global', 'environment', 'tenant']),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  description: z.string().max(500).optional(),
});

export const platformConfigUpdateSchema = z.object({
  value: z.string().max(10000).optional(),
  type: z.enum(['string', 'number', 'boolean', 'json', 'encrypted']).optional(),
  scope: z.enum(['global', 'environment', 'tenant']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  description: z.string().max(500).optional(),
});

export const platformConfigQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['namespace', 'key', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  namespace: z.string().max(200).optional(),
  search: z.string().max(200).optional(),
  scope: z.enum(['global', 'environment', 'tenant']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
});

// --- PlatformWebhook ---
export const platformWebhookCreateSchema = z.object({
  name: z.string().min(2).max(200),
  url: z.string().url().max(2000),
  events: z.array(z.string().max(200)),
  secret: z.string().min(16).max(256),
  isActive: z.boolean().default(true),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
  }).optional(),
  headers: z.record(z.string(), z.string()).optional(),
});

export const platformWebhookUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  url: z.string().url().max(2000).optional(),
  events: z.array(z.string().max(200)).optional(),
  secret: z.string().min(16).max(256).optional(),
  isActive: z.boolean().optional(),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
  }).optional(),
  headers: z.record(z.string(), z.string()).optional(),
});

export const platformWebhookQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  isActive: z.boolean().optional(),
});

// --- PlatformApiKey ---
export const platformApiKeyCreateSchema = z.object({
  name: z.string().min(2).max(200),
  permissions: z.array(z.enum(['read', 'write', 'admin', 'super_admin'])),
  expiresAt: z.string().datetime().optional(),
  rateLimit: z.number().int().min(1).max(100000).default(1000),
  allowedIps: z.array(z.string().ip()).optional(),
  tenantId: z.string().uuid().optional(),
});

export const platformApiKeyUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  permissions: z.array(z.enum(['read', 'write', 'admin', 'super_admin'])).optional(),
  expiresAt: z.string().datetime().optional(),
  rateLimit: z.number().int().min(1).max(100000).optional(),
  allowedIps: z.array(z.string().ip()).optional(),
  isActive: z.boolean().optional(),
});

export const platformApiKeyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at', 'expiresAt']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  tenantId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
});

// ============================================================
// Domain 2: Tenant Management
// ============================================================

// --- Tenant ---
export const tenantCreateSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
  domain: z.string().max(253).optional(),
  plan: z.enum(['free', 'starter', 'professional', 'enterprise']),
  settings: z.record(z.string(), z.unknown()),
  contactEmail: z.string().email().max(200),
  phone: z.string().max(50).optional(),
  address: z.object({
    street: z.string().max(200).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    postalCode: z.string().max(20).optional(),
    country: z.string().max(100).optional(),
  }).optional(),
});

export const tenantUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  domain: z.string().max(253).optional(),
  plan: z.enum(['free', 'starter', 'professional', 'enterprise']).optional(),
  settings: z.record(z.string(), z.unknown()).optional(),
  contactEmail: z.string().email().max(200).optional(),
  phone: z.string().max(50).optional(),
  address: z.object({
    street: z.string().max(200).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    postalCode: z.string().max(20).optional(),
    country: z.string().max(100).optional(),
  }).optional(),
});

export const tenantQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'slug', 'plan', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  plan: z.enum(['free', 'starter', 'professional', 'enterprise']).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
});

// --- TenantIsolation ---
export const tenantIsolationCreateSchema = z.object({
  tenantId: z.string().uuid(),
  strategy: z.enum(['shared_database', 'shared_schema', 'dedicated_database']),
  databaseHost: z.string().max(500).optional(),
  databasePort: z.number().int().min(1).max(65535).optional(),
  schemaName: z.string().max(200).optional(),
  encryptionKey: z.string().max(500).optional(),
  networkPolicy: z.string().max(500).optional(),
});

export const tenantIsolationUpdateSchema = z.object({
  strategy: z.enum(['shared_database', 'shared_schema', 'dedicated_database']).optional(),
  databaseHost: z.string().max(500).optional(),
  databasePort: z.number().int().min(1).max(65535).optional(),
  schemaName: z.string().max(200).optional(),
  encryptionKey: z.string().max(500).optional(),
  networkPolicy: z.string().max(500).optional(),
});

export const tenantIsolationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['tenantId', 'strategy', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  strategy: z.enum(['shared_database', 'shared_schema', 'dedicated_database']).optional(),
});

// --- TenantMigration ---
export const tenantMigrationCreateSchema = z.object({
  tenantId: z.string().uuid(),
  targetVersion: z.string().min(1).max(50),
  migrationType: z.enum(['schema', 'data', 'full']),
  scripts: z.array(z.string().max(1000)),
  dryRun: z.boolean().default(false),
  rollbackPlan: z.string().max(2000).optional(),
});

export const tenantMigrationUpdateSchema = z.object({
  targetVersion: z.string().min(1).max(50).optional(),
  migrationType: z.enum(['schema', 'data', 'full']).optional(),
  scripts: z.array(z.string().max(1000)).optional(),
  dryRun: z.boolean().optional(),
  rollbackPlan: z.string().max(2000).optional(),
  status: z.enum(['pending', 'running', 'completed', 'failed', 'rolled_back']).optional(),
});

export const tenantMigrationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['targetVersion', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  status: z.enum(['pending', 'running', 'completed', 'failed', 'rolled_back']).optional(),
});

// --- TenantBackupConfig ---
export const tenantBackupConfigCreateSchema = z.object({
  tenantId: z.string().uuid(),
  schedule: z.string().min(1).max(100),
  retentionDays: z.number().int().min(1).max(365),
  includeMedia: z.boolean().default(false),
  encryptionEnabled: z.boolean().default(true),
  storageProvider: z.enum(['aws_s3', 'gcp_storage', 'azure_blob', 'local']),
  storageConfig: z.record(z.string(), z.string()),
  notifications: z.array(z.enum(['email', 'slack', 'webhook'])),
});

export const tenantBackupConfigUpdateSchema = z.object({
  schedule: z.string().min(1).max(100).optional(),
  retentionDays: z.number().int().min(1).max(365).optional(),
  includeMedia: z.boolean().optional(),
  encryptionEnabled: z.boolean().optional(),
  storageProvider: z.enum(['aws_s3', 'gcp_storage', 'azure_blob', 'local']).optional(),
  storageConfig: z.record(z.string(), z.string()).optional(),
  notifications: z.array(z.enum(['email', 'slack', 'webhook'])).optional(),
});

export const tenantBackupConfigQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['tenantId', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  storageProvider: z.enum(['aws_s3', 'gcp_storage', 'azure_blob', 'local']).optional(),
});

// --- TenantRestore ---
export const tenantRestoreCreateSchema = z.object({
  tenantId: z.string().uuid(),
  backupId: z.string().uuid(),
  targetEnvironment: z.enum(['production', 'staging', 'development']),
  restoreType: z.enum(['full', 'selective']),
  selectedData: z.array(z.string().max(200)).optional(),
  restorePoint: z.string().datetime().optional(),
  confirmRestore: z.boolean(),
});

export const tenantRestoreUpdateSchema = z.object({
  targetEnvironment: z.enum(['production', 'staging', 'development']).optional(),
  restoreType: z.enum(['full', 'selective']).optional(),
  selectedData: z.array(z.string().max(200)).optional(),
  status: z.enum(['pending', 'running', 'completed', 'failed']).optional(),
});

export const tenantRestoreQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['tenantId', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  status: z.enum(['pending', 'running', 'completed', 'failed']).optional(),
});

// --- TenantArchive ---
export const tenantArchiveCreateSchema = z.object({
  tenantId: z.string().uuid(),
  reason: z.string().min(1).max(500),
  archiveType: z.enum(['soft', 'hard']),
  retainData: z.boolean().default(true),
  dataRetentionPeriod: z.number().int().min(30).max(3650).default(365),
  notifyUsers: z.boolean().default(true),
  transferOwnership: z.string().uuid().optional(),
});

export const tenantArchiveUpdateSchema = z.object({
  reason: z.string().min(1).max(500).optional(),
  archiveType: z.enum(['soft', 'hard']).optional(),
  retainData: z.boolean().optional(),
  dataRetentionPeriod: z.number().int().min(30).max(3650).optional(),
  status: z.enum(['pending', 'archiving', 'archived', 'failed']).optional(),
});

export const tenantArchiveQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['tenantId', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  status: z.enum(['pending', 'archiving', 'archived', 'failed']).optional(),
});

// --- TenantClone ---
export const tenantCloneCreateSchema = z.object({
  sourceTenantId: z.string().uuid(),
  targetName: z.string().min(2).max(200),
  targetSlug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
  cloneOptions: z.object({
    includeUsers: z.boolean().default(true),
    includeSettings: z.boolean().default(true),
    includeData: z.boolean().default(false),
    includeIntegrations: z.boolean().default(false),
    anonymizeData: z.boolean().default(false),
  }),
  targetPlan: z.enum(['free', 'starter', 'professional', 'enterprise']).optional(),
});

export const tenantCloneUpdateSchema = z.object({
  targetName: z.string().min(2).max(200).optional(),
  cloneOptions: z.object({
    includeUsers: z.boolean().default(true),
    includeSettings: z.boolean().default(true),
    includeData: z.boolean().default(false),
    includeIntegrations: z.boolean().default(false),
    anonymizeData: z.boolean().default(false),
  }).optional(),
  status: z.enum(['pending', 'cloning', 'completed', 'failed']).optional(),
});

export const tenantCloneQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['targetName', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  sourceTenantId: z.string().uuid().optional(),
  status: z.enum(['pending', 'cloning', 'completed', 'failed']).optional(),
});

// --- TenantMerge ---
export const tenantMergeCreateSchema = z.object({
  primaryTenantId: z.string().uuid(),
  secondaryTenantId: z.string().uuid(),
  mergeStrategy: z.enum(['keep_primary', 'keep_secondary', 'merge_all']),
  conflictResolution: z.enum(['primary_wins', 'secondary_wins', 'manual', 'rename']),
  dataScope: z.array(z.enum(['users', 'courses', 'grades', 'settings', 'integrations'])),
  archiveSecondary: z.boolean().default(true),
  notifyAffectedUsers: z.boolean().default(true),
});

export const tenantMergeUpdateSchema = z.object({
  mergeStrategy: z.enum(['keep_primary', 'keep_secondary', 'merge_all']).optional(),
  conflictResolution: z.enum(['primary_wins', 'secondary_wins', 'manual', 'rename']).optional(),
  dataScope: z.array(z.enum(['users', 'courses', 'grades', 'settings', 'integrations'])).optional(),
  status: z.enum(['pending', 'merging', 'completed', 'failed', 'rolled_back']).optional(),
});

export const tenantMergeQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['primaryTenantId', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  primaryTenantId: z.string().uuid().optional(),
  secondaryTenantId: z.string().uuid().optional(),
  status: z.enum(['pending', 'merging', 'completed', 'failed', 'rolled_back']).optional(),
});

// --- TenantSplit ---
export const tenantSplitCreateSchema = z.object({
  sourceTenantId: z.string().uuid(),
  splitName: z.string().min(2).max(200),
  splitSlug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
  splitType: z.enum(['by_department', 'by_region', 'by_function', 'custom']),
  criteria: z.record(z.string(), z.unknown()),
  dataDistribution: z.object({
    users: z.array(z.string().uuid()),
    courses: z.array(z.string().uuid()).optional(),
    departments: z.array(z.string().uuid()).optional(),
  }),
  keepOriginal: z.boolean().default(true),
});

export const tenantSplitUpdateSchema = z.object({
  splitName: z.string().min(2).max(200).optional(),
  splitType: z.enum(['by_department', 'by_region', 'by_function', 'custom']).optional(),
  criteria: z.record(z.string(), z.unknown()).optional(),
  dataDistribution: z.object({
    users: z.array(z.string().uuid()),
    courses: z.array(z.string().uuid()).optional(),
    departments: z.array(z.string().uuid()).optional(),
  }).optional(),
  status: z.enum(['pending', 'splitting', 'completed', 'failed']).optional(),
});

export const tenantSplitQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['splitName', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  sourceTenantId: z.string().uuid().optional(),
  status: z.enum(['pending', 'splitting', 'completed', 'failed']).optional(),
});

// --- TenantMonitoring ---
export const tenantMonitoringCreateSchema = z.object({
  tenantId: z.string().uuid(),
  metrics: z.array(z.enum(['cpu', 'memory', 'disk', 'network', 'requests', 'errors'])),
  alertThresholds: z.object({
    cpuPercent: z.number().min(0).max(100).default(80),
    memoryPercent: z.number().min(0).max(100).default(85),
    diskPercent: z.number().min(0).max(100).default(90),
    errorRate: z.number().min(0).max(100).default(5),
    responseTimeMs: z.number().min(0).max(60000).default(2000),
  }),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])),
  retentionDays: z.number().int().min(1).max(365).default(30),
});

export const tenantMonitoringUpdateSchema = z.object({
  metrics: z.array(z.enum(['cpu', 'memory', 'disk', 'network', 'requests', 'errors'])).optional(),
  alertThresholds: z.object({
    cpuPercent: z.number().min(0).max(100).default(80),
    memoryPercent: z.number().min(0).max(100).default(85),
    diskPercent: z.number().min(0).max(100).default(90),
    errorRate: z.number().min(0).max(100).default(5),
    responseTimeMs: z.number().min(0).max(60000).default(2000),
  }).optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])).optional(),
  retentionDays: z.number().int().min(1).max(365).optional(),
  isActive: z.boolean().optional(),
});

export const tenantMonitoringQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['tenantId', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
});

// --- TenantAnalytics ---
export const tenantAnalyticsCreateSchema = z.object({
  tenantId: z.string().uuid(),
  period: z.enum(['hourly', 'daily', 'weekly', 'monthly']),
  metrics: z.object({
    activeUsers: z.number().int().min(0),
    totalSessions: z.number().int().min(0),
    avgSessionDuration: z.number().min(0),
    featureUsage: z.record(z.string(), z.number()),
    apiCalls: z.number().int().min(0),
    storageUsed: z.number().min(0),
    computeUsed: z.number().min(0),
  }),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export const tenantAnalyticsUpdateSchema = z.object({
  metrics: z.object({
    activeUsers: z.number().int().min(0),
    totalSessions: z.number().int().min(0),
    avgSessionDuration: z.number().min(0),
    featureUsage: z.record(z.string(), z.number()),
    apiCalls: z.number().int().min(0),
    storageUsed: z.number().min(0),
    computeUsed: z.number().min(0),
  }).optional(),
});

export const tenantAnalyticsQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['startDate', 'created_at']).default('startDate'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  period: z.enum(['hourly', 'daily', 'weekly', 'monthly']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

// --- TenantQuota ---
export const tenantQuotaCreateSchema = z.object({
  tenantId: z.string().uuid(),
  resource: z.enum(['users', 'storage', 'api_calls', 'compute', 'bandwidth', 'courses']),
  limit: z.number().int().min(-1),
  period: z.enum(['hourly', 'daily', 'weekly', 'monthly', 'yearly', 'unlimited']),
  alertThreshold: z.number().min(0).max(100).default(80),
  actionOnExceed: z.enum(['throttle', 'block', 'notify', 'upgrade']),
  isHardLimit: z.boolean().default(false),
});

export const tenantQuotaUpdateSchema = z.object({
  limit: z.number().int().min(-1).optional(),
  period: z.enum(['hourly', 'daily', 'weekly', 'monthly', 'yearly', 'unlimited']).optional(),
  alertThreshold: z.number().min(0).max(100).optional(),
  actionOnExceed: z.enum(['throttle', 'block', 'notify', 'upgrade']).optional(),
  isHardLimit: z.boolean().optional(),
});

export const tenantQuotaQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['tenantId', 'resource', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  resource: z.enum(['users', 'storage', 'api_calls', 'compute', 'bandwidth', 'courses']).optional(),
});

// --- TenantBilling ---
export const tenantBillingCreateSchema = z.object({
  tenantId: z.string().uuid(),
  billingCycle: z.enum(['monthly', 'quarterly', 'yearly']),
  planPrice: z.number().min(0),
  currency: z.string().length(3).default('USD'),
  paymentMethod: z.enum(['credit_card', 'invoice', 'bank_transfer', 'crypto']),
  billingContact: z.object({
    name: z.string().min(1).max(200),
    email: z.string().email().max(200),
    phone: z.string().max(50).optional(),
    company: z.string().max(200).optional(),
  }),
  taxId: z.string().max(100).optional(),
  poNumber: z.string().max(100).optional(),
});

export const tenantBillingUpdateSchema = z.object({
  billingCycle: z.enum(['monthly', 'quarterly', 'yearly']).optional(),
  planPrice: z.number().min(0).optional(),
  currency: z.string().length(3).optional(),
  paymentMethod: z.enum(['credit_card', 'invoice', 'bank_transfer', 'crypto']).optional(),
  billingContact: z.object({
    name: z.string().min(1).max(200),
    email: z.string().email().max(200),
    phone: z.string().max(50).optional(),
    company: z.string().max(200).optional(),
  }).optional(),
  taxId: z.string().max(100).optional(),
  poNumber: z.string().max(100).optional(),
  status: z.enum(['active', 'past_due', 'cancelled', 'suspended']).optional(),
});

export const tenantBillingQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['tenantId', 'planPrice', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  status: z.enum(['active', 'past_due', 'cancelled', 'suspended']).optional(),
  billingCycle: z.enum(['monthly', 'quarterly', 'yearly']).optional(),
});

// --- TenantFeature ---
export const tenantFeatureCreateSchema = z.object({
  tenantId: z.string().uuid(),
  featureKey: z.string().min(1).max(200).regex(/^[a-z0-9_]+$/),
  enabled: z.boolean().default(true),
  config: z.record(z.string(), z.unknown()),
  quota: z.number().int().min(-1).optional(),
  expiresAt: z.string().datetime().optional(),
  tier: z.enum(['basic', 'standard', 'premium', 'enterprise']).optional(),
});

export const tenantFeatureUpdateSchema = z.object({
  enabled: z.boolean().optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  quota: z.number().int().min(-1).optional(),
  expiresAt: z.string().datetime().optional(),
  tier: z.enum(['basic', 'standard', 'premium', 'enterprise']).optional(),
});

export const tenantFeatureQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['featureKey', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  featureKey: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
  tier: z.enum(['basic', 'standard', 'premium', 'enterprise']).optional(),
});

// --- TenantSso ---
export const tenantSsoCreateSchema = z.object({
  tenantId: z.string().uuid(),
  provider: z.enum(['saml', 'oidc', 'ldap', 'adfs', 'okta', 'azure_ad', 'google_workspace']),
  name: z.string().min(2).max(200),
  metadataUrl: z.string().url().max(2000).optional(),
  metadataXml: z.string().max(50000).optional(),
  entityId: z.string().max(500).optional(),
  ssoUrl: z.string().url().max(2000).optional(),
  certificate: z.string().max(10000).optional(),
  attributeMapping: z.record(z.string(), z.string()),
  enabled: z.boolean().default(true),
  autoProvision: z.boolean().default(false),
  defaultRole: z.string().max(100).optional(),
});

export const tenantSsoUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  metadataUrl: z.string().url().max(2000).optional(),
  metadataXml: z.string().max(50000).optional(),
  entityId: z.string().max(500).optional(),
  ssoUrl: z.string().url().max(2000).optional(),
  certificate: z.string().max(10000).optional(),
  attributeMapping: z.record(z.string(), z.string()).optional(),
  enabled: z.boolean().optional(),
  autoProvision: z.boolean().optional(),
  defaultRole: z.string().max(100).optional(),
});

export const tenantSsoQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'provider', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  provider: z.enum(['saml', 'oidc', 'ldap', 'adfs', 'okta', 'azure_ad', 'google_workspace']).optional(),
  enabled: z.boolean().optional(),
});

// --- TenantCustomDomain ---
export const tenantCustomDomainCreateSchema = z.object({
  tenantId: z.string().uuid(),
  domain: z.string().max(253),
  subdomain: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/).optional(),
  sslEnabled: z.boolean().default(true),
  sslProvider: z.enum(['lets_encrypt', 'aws_acm', 'cloudflare', 'custom']).default('lets_encrypt'),
  dnsVerification: z.boolean().default(true),
  redirectFromPrimary: z.boolean().default(false),
});

export const tenantCustomDomainUpdateSchema = z.object({
  sslEnabled: z.boolean().optional(),
  sslProvider: z.enum(['lets_encrypt', 'aws_acm', 'cloudflare', 'custom']).optional(),
  redirectFromPrimary: z.boolean().optional(),
  status: z.enum(['pending', 'verifying', 'active', 'failed', 'expired']).optional(),
});

export const tenantCustomDomainQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['domain', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  status: z.enum(['pending', 'verifying', 'active', 'failed', 'expired']).optional(),
});

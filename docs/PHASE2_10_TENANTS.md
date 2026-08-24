# Phase 2.10 - Multi-Tenant Enterprise

## Overview

The Multi-Tenant Enterprise module provides comprehensive tenant lifecycle management for the EduCI platform. It handles tenant provisioning, isolation, migration, cloning, merging, archival, SSO integration, custom domains, billing per tenant, backup configuration, monitoring, analytics, feature customization, and tenant-specific quotas. This module ensures complete data isolation and per-tenant configurability at enterprise scale.

```
┌─────────────────────────────────────────────────────────┐
│               MULTI-TENANT ENTERPRISE                    │
├─────────────────────────────────────────────────────────┤
│  Provisioning → Isolation → Migration → Clone/Merge     │
│  SSO → Custom Domains → Billing → Backup Config         │
│  Monitoring → Analytics → Features → Quotas             │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (16):**
- `TenantRegistryRepository` - Tenant registry CRUD + findBySubdomain, findByDomain
- `TenantProvisioningRepository` - Provisioning CRUD + findByStatus, findByTenant
- `TenantIsolationRepository` - Isolation config CRUD + findByTenant, verifyIsolation
- `TenantMigrationRepository` - Migration CRUD + findByTenant, findByStatus
- `TenantCloneRepository` - Clone operation CRUD + findBySource, findByStatus
- `TenantMergeRepository` - Merge operation CRUD + findBySource, findByStatus
- `TenantSSORepository` - SSO config CRUD + findByTenant, findByProvider
- `TenantCustomDomainRepository` - Custom domain CRUD + findByDomain, findByTenant
- `TenantBillingRepository` - Tenant billing CRUD + findByTenant, findByPeriod
- `TenantBackupConfigRepository` - Backup config CRUD + findByTenant, findSchedule
- `TenantMonitoringRepository` - Tenant monitoring CRUD + findByTenant, findAlerts
- `TenantAnalyticsRepository` - Tenant analytics CRUD + findByTenant, findByPeriod
- `TenantFeatureRepository` - Tenant feature customization CRUD + findByTenant
- `TenantQuotaRepository` - Tenant quota CRUD + findByTenant, findByResource
- `TenantArchiveRepository` - Tenant archive CRUD + findByTenant, findArchived
- `TenantRestoreRepository` - Tenant restore CRUD + findByArchive, findByStatus

**Entity Types (64):**
- `TenantRegistry`, `TenantRegistryCreate`, `TenantRegistryUpdate`, `TenantRegistryQuery`
- `TenantProvisioning`, `TenantProvisioningCreate`, `TenantProvisioningUpdate`, `TenantProvisioningQuery`
- `TenantIsolation`, `TenantIsolationCreate`, `TenantIsolationUpdate`, `TenantIsolationQuery`
- `TenantMigration`, `TenantMigrationCreate`, `TenantMigrationUpdate`, `TenantMigrationQuery`
- `TenantClone`, `TenantCloneCreate`, `TenantCloneUpdate`, `TenantCloneQuery`
- `TenantMerge`, `TenantMergeCreate`, `TenantMergeUpdate`, `TenantMergeQuery`
- `TenantSSO`, `TenantSSOCreate`, `TenantSSOUpdate`, `TenantSSOQuery`
- `TenantCustomDomain`, `TenantCustomDomainCreate`, `TenantCustomDomainUpdate`, `TenantCustomDomainQuery`
- `TenantBilling`, `TenantBillingCreate`, `TenantBillingUpdate`, `TenantBillingQuery`
- `TenantBackupConfig`, `TenantBackupConfigCreate`, `TenantBackupConfigUpdate`, `TenantBackupConfigQuery`
- `TenantMonitoring`, `TenantMonitoringCreate`, `TenantMonitoringUpdate`, `TenantMonitoringQuery`
- `TenantAnalytics`, `TenantAnalyticsCreate`, `TenantAnalyticsUpdate`, `TenantAnalyticsQuery`
- `TenantFeature`, `TenantFeatureCreate`, `TenantFeatureUpdate`, `TenantFeatureQuery`
- `TenantQuota`, `TenantQuotaCreate`, `TenantQuotaUpdate`, `TenantQuotaQuery`
- `TenantArchive`, `TenantArchiveCreate`, `TenantArchiveUpdate`, `TenantArchiveQuery`
- `TenantRestore`, `TenantRestoreCreate`, `TenantRestoreUpdate`, `TenantRestoreQuery`

### Validators

**File: `ep-admin-tenant.ts` (1,450 lines)**

| Schema | Purpose |
|--------|---------|
| `tenantRegistryCreateSchema` | Validates tenant creation (name, subdomain, plan) |
| `tenantRegistryUpdateSchema` | Validates tenant updates |
| `tenantRegistryQuerySchema` | Validates tenant list queries |
| `tenantProvisioningCreateSchema` | Validates provisioning creation |
| `tenantProvisioningUpdateSchema` | Validates provisioning updates |
| `tenantIsolationCreateSchema` | Validates isolation config creation |
| `tenantMigrationCreateSchema` | Validates migration creation (source, target, options) |
| `tenantCloneCreateSchema` | Validates clone creation (source, options) |
| `tenantMergeCreateSchema` | Validates merge creation (sources, target) |
| `tenantSSOCreateSchema` | Validates SSO config creation (provider, metadata) |
| `tenantCustomDomainCreateSchema` | Validates custom domain creation |
| `tenantBillingCreateSchema` | Validates billing config creation |
| `tenantBackupConfigCreateSchema` | Validates backup config creation |
| `tenantMonitoringCreateSchema` | Validates monitoring config creation |
| `tenantFeatureCreateSchema` | Validates feature customization creation |
| `tenantQuotaCreateSchema` | Validates quota creation (resource, limit) |
| `tenantArchiveCreateSchema` | Validates archive creation |
| `tenantRestoreCreateSchema` | Validates restore creation |

### Errors

| Error Code | Description |
|------------|-------------|
| `TENANT_NOT_FOUND` | Tenant not found |
| `TENANT_SUBDOMAIN_CONFLICT` | Subdomain already in use |
| `TENANT_DOMAIN_CONFLICT` | Custom domain already in use |
| `TENANT_PROVISIONING_FAILED` | Tenant provisioning failed |
| `TENANT_ISOLATION_BREACH` | Tenant isolation violation detected |
| `TENANT_MIGRATION_FAILED` | Tenant migration failed |
| `TENANT_CLONE_FAILED` | Tenant clone operation failed |
| `TENANT_MERGE_CONFLICT` | Tenant merge conflict detected |
| `TENANT_SSO_CONFIG_INVALID` | SSO configuration invalid |
| `TENANT_DOMAIN_VERIFICATION_FAILED` | Domain verification failed |
| `TENANT_BILLING_OVERDUE` | Tenant billing overdue |
| `TENANT_QUOTA_EXCEEDED` | Tenant quota exceeded |
| `TENANT_ARCHIVE_FAILED` | Tenant archival failed |
| `TENANT_RESTORE_FAILED` | Tenant restore failed |
| `TENANT_DELETION_FORBIDDEN` | Tenant cannot be deleted (active subscriptions) |

### Repository

```typescript
// 16 repository interfaces for multi-tenant management
interface TenantRegistryRepository {
  create(data: TenantRegistryCreate): Promise<TenantRegistry>;
  findById(id: string): Promise<TenantRegistry | null>;
  findBySubdomain(subdomain: string): Promise<TenantRegistry | null>;
  findByDomain(domain: string): Promise<TenantRegistry | null>;
  update(id: string, data: TenantRegistryUpdate): Promise<TenantRegistry>;
  delete(id: string): Promise<void>;
  list(query: TenantRegistryQuery): Promise<TenantRegistry[]>;
  count(query: TenantRegistryQuery): Promise<number>;
  findByStatus(status: string): Promise<TenantRegistry[]>;
  findByPlan(plan: string): Promise<TenantRegistry[]>;
}

interface TenantIsolationRepository {
  create(data: TenantIsolationCreate): Promise<TenantIsolation>;
  findById(id: string): Promise<TenantIsolation | null>;
  findByTenant(tenantId: string): Promise<TenantIsolation>;
  verifyIsolation(tenantId: string): Promise<boolean>;
  update(id: string, data: TenantIsolationUpdate): Promise<TenantIsolation>;
}
```

### Services

| Service | Responsibilities |
|---------|-----------------|
| `TenantRegistryService` | Tenant CRUD and lifecycle management |
| `TenantProvisioningService` | Automated tenant provisioning workflows |
| `TenantIsolationService` | Data isolation verification and enforcement |
| `TenantMigrationService` | Cross-tenant and cross-region migrations |
| `TenantCloneService` | Tenant cloning with data duplication |
| `TenantMergeService` | Tenant merge operations |
| `TenantSSOService` | SSO provider configuration and management |
| `TenantCustomDomainService` | Custom domain setup and verification |
| `TenantBillingService` | Per-tenant billing and invoicing |
| `TenantBackupConfigService` | Per-tenant backup configuration |
| `TenantMonitoringService` | Tenant-specific monitoring and alerts |
| `TenantAnalyticsService` | Tenant usage analytics and reporting |
| `TenantFeatureService` | Per-tenant feature customization |
| `TenantQuotaService` | Tenant resource quota management |
| `TenantArchiveService` | Tenant archival and restoration |
| `TenantRestoreService` | Tenant data restoration |

### Hooks

| Hook | Purpose |
|------|---------|
| `useTenantRegistry` | Tenant CRUD operations |
| `useTenantRegistryList` | Tenant listing and filtering |
| `useTenantProvisioning` | Provisioning workflow management |
| `useTenantIsolation` | Isolation verification |
| `useTenantMigration` | Migration operations |
| `useTenantClone` | Clone operations |
| `useTenantMerge` | Merge operations |
| `useTenantSSO` | SSO configuration |
| `useTenantCustomDomain` | Custom domain management |
| `useTenantBilling` | Billing operations |
| `useTenantBackupConfig` | Backup configuration |
| `useTenantMonitoring` | Monitoring and alerts |
| `useTenantAnalytics` | Analytics viewing |
| `useTenantFeatures` | Feature customization |
| `useTenantQuotas` | Quota management |
| `useTenantArchive` | Archive and restore |

### API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enterprise/tenants` | List tenants |
| POST | `/api/enterprise/tenants` | Create tenant |
| GET | `/api/enterprise/tenants/[id]` | Get tenant |
| PUT | `/api/enterprise/tenants/[id]` | Update tenant |
| DELETE | `/api/enterprise/tenants/[id]` | Delete tenant |
| POST | `/api/enterprise/tenants/[id]/provision` | Provision tenant |
| GET | `/api/enterprise/tenants/[id]/isolation` | Check isolation |
| POST | `/api/enterprise/tenants/[id]/migrate` | Start migration |
| POST | `/api/enterprise/tenants/[id]/clone` | Clone tenant |
| POST | `/api/enterprise/tenants/[id]/merge` | Merge tenants |
| GET | `/api/enterprise/tenants/[id]/sso` | Get SSO config |
| PUT | `/api/enterprise/tenants/[id]/sso` | Update SSO config |
| GET | `/api/enterprise/tenants/[id]/domains` | List custom domains |
| POST | `/api/enterprise/tenants/[id]/domains` | Add custom domain |
| GET | `/api/enterprise/tenants/[id]/billing` | Get billing info |
| PUT | `/api/enterprise/tenants/[id]/billing` | Update billing |
| GET | `/api/enterprise/tenants/[id]/backup-config` | Get backup config |
| PUT | `/api/enterprise/tenants/[id]/backup-config` | Update backup config |
| GET | `/api/enterprise/tenants/[id]/monitoring` | Get monitoring data |
| GET | `/api/enterprise/tenants/[id]/analytics` | Get analytics |
| GET | `/api/enterprise/tenants/[id]/features` | List features |
| PUT | `/api/enterprise/tenants/[id]/features` | Update features |
| GET | `/api/enterprise/tenants/[id]/quotas` | List quotas |
| PUT | `/api/enterprise/tenants/[id]/quotas` | Update quotas |
| POST | `/api/enterprise/tenants/[id]/archive` | Archive tenant |
| POST | `/api/enterprise/tenants/[id]/restore` | Restore tenant |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `TenantListScreen` | List all tenants |
| `TenantDetailScreen` | Tenant detail view |
| `TenantProvisionScreen` | Tenant provisioning form |
| `TenantMigrationScreen` | Migration status and controls |
| `TenantBillingScreen` | Per-tenant billing view |
| `TenantMonitoringScreen` | Tenant health monitoring |
| `TenantAnalyticsScreen` | Tenant usage analytics |
| `TenantQuotaScreen` | Quota management |

## Configuration

```typescript
export const TENANT_CONFIG = {
  limits: {
    maxTenants: 10000,
    maxSubdomainLength: 63,
    maxCustomDomains: 10,
    maxSSOProviders: 5,
    maxFeatures: 200,
    maxQuotas: 50,
  },
  provisioning: {
    timeoutMs: 300000,
    retryCount: 3,
    parallelLimit: 10,
    rollbackEnabled: true,
  },
  isolation: {
    verificationIntervalMs: 3600000,
    alertOnBreach: true,
    autoBlockOnBreach: false,
  },
  migration: {
    batchSize: 1000,
    timeoutMs: 600000,
    maxConcurrent: 3,
    compressionEnabled: true,
  },
  billing: {
    invoiceGenerationDay: 1,
    gracePeriodDays: 7,
    autoSuspendOnOverdue: true,
  },
  backup: {
    defaultSchedule: '0 2 * * *',
    retentionDays: 30,
    maxBackups: 90,
  },
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `tenant_owner` | Full tenant management |
| `tenant_admin` | Tenant config, billing, features |
| `tenant_operator` | Monitoring, analytics, provisioning |
| `tenant_viewer` | Read-only tenant data |
| `platform_admin` | Cross-tenant operations |

## Multi-Tenancy

- Each tenant has isolated data, configuration, and features
- Tenant context propagated through all API calls
- Subdomain-based tenant resolution
- Custom domain support with DNS verification
- Cross-tenant operations restricted to platform admins
- Tenant-specific quotas enforced at API level

## Offline Support

- Tenant registry cached for offline listing
- Tenant configuration available offline
- Provisioning queued and retried on reconnection
- Monitoring data collected offline and synced
- Billing calculations performed offline

## API Reference

### Tenant Registry
- GET /api/enterprise/tenants
- POST /api/enterprise/tenants
- GET /api/enterprise/tenants/[id]
- PUT /api/enterprise/tenants/[id]
- DELETE /api/enterprise/tenants/[id]

### Provisioning
- POST /api/enterprise/tenants/[id]/provision
- GET /api/enterprise/tenants/[id]/provision/status

### Isolation
- GET /api/enterprise/tenants/[id]/isolation
- POST /api/enterprise/tenants/[id]/isolation/verify

### Migration
- POST /api/enterprise/tenants/[id]/migrate
- GET /api/enterprise/tenants/[id]/migrate/status

### Clone & Merge
- POST /api/enterprise/tenants/[id]/clone
- POST /api/enterprise/tenants/[id]/merge

### SSO
- GET /api/enterprise/tenants/[id]/sso
- PUT /api/enterprise/tenants/[id]/sso

### Custom Domains
- GET /api/enterprise/tenants/[id]/domains
- POST /api/enterprise/tenants/[id]/domains
- DELETE /api/enterprise/tenants/[id]/domains/[domainId]

### Billing
- GET /api/enterprise/tenants/[id]/billing
- PUT /api/enterprise/tenants/[id]/billing

### Backup
- GET /api/enterprise/tenants/[id]/backup-config
- PUT /api/enterprise/tenants/[id]/backup-config

### Monitoring
- GET /api/enterprise/tenants/[id]/monitoring
- GET /api/enterprise/tenants/[id]/analytics

### Features
- GET /api/enterprise/tenants/[id]/features
- PUT /api/enterprise/tenants/[id]/features

### Quotas
- GET /api/enterprise/tenants/[id]/quotas
- PUT /api/enterprise/tenants/[id]/quotas

### Archive & Restore
- POST /api/enterprise/tenants/[id]/archive
- POST /api/enterprise/tenants/[id]/restore

## Testing

| Test Category | Coverage |
|---------------|----------|
| Unit Tests | All 16 services and validators |
| Integration Tests | API routes and tenant isolation |
| E2E Tests | Tenant lifecycle workflows |
| Isolation Tests | Cross-tenant data access prevention |
| Migration Tests | Data migration scenarios |

## Security

- Tenant data fully isolated at database level
- Subdomain and domain validation enforced
- SSO configurations encrypted at rest
- Cross-tenant operations require platform admin role
- Tenant backup data encrypted with tenant-specific keys
- All tenant operations logged to audit trail
- Rate limiting enforced per tenant
- Custom domain SSL certificates managed automatically

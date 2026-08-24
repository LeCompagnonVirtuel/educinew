# Phase 2.10 - Global Platform Administration

## Overview

The Global Platform Administration module provides centralized control over the entire EduCI enterprise ecosystem. It manages platform-wide configuration, global settings, system health monitoring, feature gate management, environment orchestration, and cross-cutting administrative concerns. This module serves as the nerve center for platform operations, ensuring consistency and governance across all tenant environments.

```
┌─────────────────────────────────────────────────────────┐
│                GLOBAL PLATFORM ADMIN                     │
├─────────────────────────────────────────────────────────┤
│  Platform Config → Global Settings → Feature Gates      │
│  Environment Orch → System Health → Admin Controls      │
│  Cross-Region Sync → Deployment Pipeline → Diagnostics  │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (10):**
- `PlatformConfigRepository` - CRUD for platform-wide configuration + findByName, findByCategory
- `GlobalSettingsRepository` - Settings CRUD + findByScope, findGlobal
- `FeatureGateRepository` - Feature gate CRUD + findByEnvironment, toggleGate
- `EnvironmentConfigRepository` - Environment CRUD + findByEnvironment, findActive
- `PlatformHealthRepository` - Health check CRUD + findLatest, findHistorical
- `AdminAuditRepository` - Admin action audit CRUD + findByAdmin, findByAction
- `PlatformMetadataRepository` - Metadata CRUD + findByVersion, findLatest
- `DeploymentPipelineRepository` - Pipeline CRUD + findByStatus, findByTrigger
- `SystemDiagnosticsRepository` - Diagnostics CRUD + findByComponent, findLatest
- `GlobalRateLimitRepository` - Rate limit CRUD + findByEndpoint, findByTenant

**Entity Types (48):**
- `PlatformConfig`, `PlatformConfigCreate`, `PlatformConfigUpdate`, `PlatformConfigQuery`
- `GlobalSettings`, `GlobalSettingsCreate`, `GlobalSettingsUpdate`, `GlobalSettingsQuery`
- `FeatureGate`, `FeatureGateCreate`, `FeatureGateUpdate`, `FeatureGateQuery`
- `EnvironmentConfig`, `EnvironmentConfigCreate`, `EnvironmentConfigUpdate`, `EnvironmentConfigQuery`
- `PlatformHealth`, `PlatformHealthCreate`, `PlatformHealthUpdate`, `PlatformHealthQuery`
- `AdminAudit`, `AdminAuditCreate`, `AdminAuditUpdate`, `AdminAuditQuery`
- `PlatformMetadata`, `PlatformMetadataCreate`, `PlatformMetadataUpdate`, `PlatformMetadataQuery`
- `DeploymentPipeline`, `DeploymentPipelineCreate`, `DeploymentPipelineUpdate`, `DeploymentPipelineQuery`
- `SystemDiagnostics`, `SystemDiagnosticsCreate`, `SystemDiagnosticsUpdate`, `SystemDiagnosticsQuery`
- `GlobalRateLimit`, `GlobalRateLimitCreate`, `GlobalRateLimitUpdate`, `GlobalRateLimitQuery`
- `PlatformVersion`, `PlatformVersionCreate`, `PlatformVersionUpdate`, `PlatformVersionQuery`
- `PlatformAnnouncement`, `PlatformAnnouncementCreate`, `PlatformAnnouncementUpdate`, `PlatformAnnouncementQuery`

### Validators

**File: `ep-platform.ts` (1,200 lines)**

| Schema | Purpose |
|--------|---------|
| `platformConfigCreateSchema` | Validates platform config creation (key, value, category, scope) |
| `platformConfigUpdateSchema` | Validates config updates (all fields optional) |
| `platformConfigQuerySchema` | Validates config list queries (pagination, sorting, filters) |
| `globalSettingsCreateSchema` | Validates global settings creation (scope, settings JSON) |
| `globalSettingsUpdateSchema` | Validates settings updates |
| `globalSettingsQuerySchema` | Validates settings queries |
| `featureGateCreateSchema` | Validates feature gate creation (name, environment, enabled) |
| `featureGateUpdateSchema` | Validates gate updates |
| `featureGateToggleSchema` | Validates gate toggle (enabled, percentage, rules) |
| `environmentConfigCreateSchema` | Validates environment creation (name, type, variables) |
| `environmentConfigUpdateSchema` | Validates environment updates |
| `platformHealthCreateSchema` | Validates health check creation |
| `adminAuditCreateSchema` | Validates admin audit creation (action, target, details) |
| `platformMetadataCreateSchema` | Validates metadata creation |
| `deploymentPipelineCreateSchema` | Validates pipeline creation (name, stages, triggers) |
| `systemDiagnosticsCreateSchema` | Validates diagnostics creation |
| `globalRateLimitCreateSchema` | Validates rate limit creation (endpoint, limit, window) |
| `platformVersionCreateSchema` | Validates version creation (version, changes, status) |
| `platformAnnouncementCreateSchema` | Validates announcement creation |

### Errors

| Error Code | Description |
|------------|-------------|
| `PLATFORM_CONFIG_NOT_FOUND` | Platform configuration not found |
| `PLATFORM_CONFIG_DUPLICATE` | Configuration key already exists |
| `FEATURE_GATE_NOT_FOUND` | Feature gate not found |
| `FEATURE_GATE_CONFLICT` | Feature gate conflict with existing rules |
| `ENVIRONMENT_NOT_FOUND` | Environment configuration not found |
| `ENVIRONMENT_ACTIVE` | Cannot delete active environment |
| `HEALTH_CHECK_FAILED` | Platform health check failed |
| `ADMIN_UNAUTHORIZED` | Admin action not authorized |
| `RATE_LIMIT_EXCEEDED` | Rate limit exceeded for endpoint |
| `PIPELINE_NOT_FOUND` | Deployment pipeline not found |
| `PIPELINE_RUNNING` | Pipeline already running |
| `DIAGNOSTICS_UNAVAILABLE` | Diagnostics data unavailable |
| `METADATA_CONFLICT` | Metadata version conflict |
| `ANNOUNCEMENT_INVALID` | Announcement configuration invalid |

### Repository

```typescript
// 10 repository interfaces for platform administration
interface PlatformConfigRepository {
  create(data: PlatformConfigCreate): Promise<PlatformConfig>;
  findById(id: string): Promise<PlatformConfig | null>;
  findByName(name: string): Promise<PlatformConfig | null>;
  findByCategory(category: string): Promise<PlatformConfig[]>;
  update(id: string, data: PlatformConfigUpdate): Promise<PlatformConfig>;
  delete(id: string): Promise<void>;
  list(query: PlatformConfigQuery): Promise<PlatformConfig[]>;
  count(query: PlatformConfigQuery): Promise<number>;
}

interface FeatureGateRepository {
  create(data: FeatureGateCreate): Promise<FeatureGate>;
  findById(id: string): Promise<FeatureGate | null>;
  findByEnvironment(environment: string): Promise<FeatureGate[]>;
  toggleGate(id: string, enabled: boolean): Promise<FeatureGate>;
  update(id: string, data: FeatureGateUpdate): Promise<FeatureGate>;
  delete(id: string): Promise<void>;
  list(query: FeatureGateQuery): Promise<FeatureGate[]>;
  findByFeatureName(name: string): Promise<FeatureGate[]>;
}
```

### Services

| Service | Responsibilities |
|---------|-----------------|
| `PlatformConfigService` | Platform-wide configuration management |
| `GlobalSettingsService` | Global settings CRUD and scope management |
| `FeatureGateService` | Feature flag management and toggling |
| `EnvironmentConfigService` | Environment configuration orchestration |
| `PlatformHealthService` | System health monitoring and reporting |
| `AdminAuditService` | Admin action auditing and tracking |
| `PlatformMetadataService` | Platform version and metadata management |
| `DeploymentPipelineService` | Deployment pipeline orchestration |
| `SystemDiagnosticsService` | System diagnostics collection and analysis |
| `GlobalRateLimitService` | Rate limit configuration and enforcement |

### Hooks

| Hook | Purpose |
|------|---------|
| `usePlatformConfig` | Platform configuration CRUD operations |
| `usePlatformConfigList` | Platform configuration listing and filtering |
| `useGlobalSettings` | Global settings management |
| `useFeatureGates` | Feature gate management |
| `useFeatureGateToggle` | Feature gate toggle operations |
| `useEnvironmentConfigs` | Environment configuration management |
| `usePlatformHealth` | Platform health monitoring |
| `useAdminAudit` | Admin audit log viewing |
| `usePlatformMetadata` | Platform metadata operations |
| `useDeploymentPipelines` | Deployment pipeline management |
| `useSystemDiagnostics` | System diagnostics viewing |
| `useGlobalRateLimits` | Rate limit configuration |

### API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enterprise/platform/config` | List platform configs |
| POST | `/api/enterprise/platform/config` | Create platform config |
| GET | `/api/enterprise/platform/config/[id]` | Get config by ID |
| PUT | `/api/enterprise/platform/config/[id]` | Update config |
| DELETE | `/api/enterprise/platform/config/[id]` | Delete config |
| GET | `/api/enterprise/platform/settings` | Get global settings |
| PUT | `/api/enterprise/platform/settings` | Update global settings |
| GET | `/api/enterprise/platform/feature-gates` | List feature gates |
| POST | `/api/enterprise/platform/feature-gates` | Create feature gate |
| PUT | `/api/enterprise/platform/feature-gates/[id]/toggle` | Toggle feature gate |
| GET | `/api/enterprise/platform/environments` | List environments |
| POST | `/api/enterprise/platform/environments` | Create environment |
| GET | `/api/enterprise/platform/health` | Platform health status |
| GET | `/api/enterprise/platform/health/history` | Health history |
| GET | `/api/enterprise/platform/admin/audit` | Admin audit logs |
| GET | `/api/enterprise/platform/metadata` | Platform metadata |
| GET | `/api/enterprise/platform/pipelines` | List pipelines |
| POST | `/api/enterprise/platform/pipelines` | Create pipeline |
| GET | `/api/enterprise/platform/diagnostics` | System diagnostics |
| GET | `/api/enterprise/platform/rate-limits` | List rate limits |
| POST | `/api/enterprise/platform/rate-limits` | Create rate limit |
| GET | `/api/enterprise/platform/announcements` | List announcements |
| POST | `/api/enterprise/platform/announcements` | Create announcement |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `PlatformDashboardScreen` | Platform overview and key metrics |
| `PlatformConfigScreen` | Configuration management |
| `FeatureGateScreen` | Feature gate management |
| `HealthMonitorScreen` | System health monitoring |
| `AdminAuditScreen` | Admin action audit logs |
| `DiagnosticsScreen` | System diagnostics viewer |

## Configuration

```typescript
export const PLATFORM_ADMIN_CONFIG = {
  limits: {
    maxConfigEntries: 10000,
    maxFeatureGates: 500,
    maxEnvironments: 20,
    maxRateLimitRules: 1000,
    maxAnnouncements: 100,
    maxPipelines: 50,
  },
  health: {
    checkIntervalMs: 30000,
    timeoutMs: 5000,
    retryCount: 3,
    alertThreshold: 0.8,
  },
  audit: {
    retentionDays: 365,
    maxLogsPerQuery: 1000,
    enableRealTime: true,
  },
  rateLimit: {
    defaultWindowMs: 60000,
    defaultLimit: 100,
    burstMultiplier: 2,
  },
  deployment: {
    maxConcurrentPipelines: 5,
    rollbackEnabled: true,
    canaryPercentage: 10,
  },
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `platform_owner` | Full platform access, all operations |
| `platform_admin` | Config, settings, feature gates, health |
| `platform_operator` | Health, diagnostics, rate limits |
| `platform_viewer` | Read-only access to all platform data |
| `devops_engineer` | Pipelines, deployments, diagnostics |
| `security_admin` | Rate limits, audit, security settings |

## Multi-Tenancy

- Platform configs scoped by `scope` field (global, tenant, environment)
- Feature gates support per-tenant overrides
- Rate limits can be set per-tenant or globally
- Health checks aggregate across all tenant environments
- Admin audit trails track cross-tenant operations

## Offline Support

- Platform config cached locally for offline viewing
- Feature gate states cached for offline resolution
- Health check history stored locally
- Admin audit logs queued for sync when online
- Diagnostics data collected offline and synced

## API Reference

### Platform Config
- GET /api/enterprise/platform/config
- POST /api/enterprise/platform/config
- GET /api/enterprise/platform/config/[id]
- PUT /api/enterprise/platform/config/[id]
- DELETE /api/enterprise/platform/config/[id]

### Global Settings
- GET /api/enterprise/platform/settings
- PUT /api/enterprise/platform/settings

### Feature Gates
- GET /api/enterprise/platform/feature-gates
- POST /api/enterprise/platform/feature-gates
- GET /api/enterprise/platform/feature-gates/[id]
- PUT /api/enterprise/platform/feature-gates/[id]
- PUT /api/enterprise/platform/feature-gates/[id]/toggle

### Environments
- GET /api/enterprise/platform/environments
- POST /api/enterprise/platform/environments
- GET /api/enterprise/platform/environments/[id]
- PUT /api/enterprise/platform/environments/[id]

### Health
- GET /api/enterprise/platform/health
- GET /api/enterprise/platform/health/history
- POST /api/enterprise/platform/health/check

### Admin Audit
- GET /api/enterprise/platform/admin/audit
- GET /api/enterprise/platform/admin/audit/[id]

## Testing

| Test Category | Coverage |
|---------------|----------|
| Unit Tests | All services and validators |
| Integration Tests | API routes and repository |
| E2E Tests | Platform admin workflows |
| Health Check Tests | System health scenarios |
| Feature Gate Tests | Toggle and override scenarios |

## Security

- All admin actions logged to audit trail
- Rate limiting enforced on all platform endpoints
- Feature gates require admin authentication
- Environment configs encrypted at rest
- Platform health data access restricted to operators
- Admin session validation on all write operations

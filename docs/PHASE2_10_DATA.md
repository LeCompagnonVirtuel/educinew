# Phase 2.10 - Data Platform

## Overview

The Data Platform module provides comprehensive data management, governance, and analytics infrastructure for the EduCI ecosystem. It implements data pipelines, data quality management, data warehousing, data transformation, data retention policies, data stewardship, data subject management, and data analytics. This module ensures data integrity, compliance, and actionable insights across the platform.

```
┌─────────────────────────────────────────────────────────┐
│                    DATA PLATFORM                         │
├─────────────────────────────────────────────────────────┤
│  Data Pipelines → Data Quality → Data Warehousing        │
│  Data Transformation → Retention → Stewardship           │
│  Data Subjects → Analytics → Governance                  │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (12):**
- `DataPipelineRepository` - Pipeline CRUD + findByName, findByStatus
- `DataPipelineStageRepository` - Stage CRUD + findByPipeline, findByType
- `DataQualityRuleRepository` - Quality rule CRUD + findByEntity, findActive
- `DataQualityIssueRepository` - Issue CRUD + findByRule, findBySeverity
- `DataWarehouseRepository` - Warehouse CRUD + findByName, findByStatus
- `DataTransformRepository` - Transform CRUD + findBySource, findByTarget
- `DataRetentionPolicyRepository` - Retention CRUD + findByEntity, findActive
- `DataStewardshipRepository` - Stewardship CRUD + findByOwner, findByDomain
- `DataSubjectRepository` - Subject CRUD + findByType, findByStatus
- `DataCatalogRepository` - Catalog CRUD + findByName, findByOwner
- `DataLineageRepository` - Lineage CRUD + findBySource, findByTarget
- `DataAnalyticsRepository` - Analytics CRUD + findByDataset, findByPeriod

**Entity Types (48):**
- `DataPipeline`, `DataPipelineCreate`, `DataPipelineUpdate`, `DataPipelineQuery`
- `DataPipelineStage`, `DataPipelineStageCreate`, `DataPipelineStageUpdate`, `DataPipelineStageQuery`
- `DataQualityRule`, `DataQualityRuleCreate`, `DataQualityRuleUpdate`, `DataQualityRuleQuery`
- `DataQualityIssue`, `DataQualityIssueCreate`, `DataQualityIssueUpdate`, `DataQualityIssueQuery`
- `DataWarehouse`, `DataWarehouseCreate`, `DataWarehouseUpdate`, `DataWarehouseQuery`
- `DataTransform`, `DataTransformCreate`, `DataTransformUpdate`, `DataTransformQuery`
- `DataRetentionPolicy`, `DataRetentionPolicyCreate`, `DataRetentionPolicyUpdate`, `DataRetentionPolicyQuery`
- `DataStewardship`, `DataStewardshipCreate`, `DataStewardshipUpdate`, `DataStewardshipQuery`
- `DataSubject`, `DataSubjectCreate`, `DataSubjectUpdate`, `DataSubjectQuery`
- `DataCatalog`, `DataCatalogCreate`, `DataCatalogUpdate`, `DataCatalogQuery`
- `DataLineage`, `DataLineageCreate`, `DataLineageUpdate`, `DataLineageQuery`
- `DataAnalytics`, `DataAnalyticsCreate`, `DataAnalyticsUpdate`, `DataAnalyticsQuery`

### Validators

**File: `ep-ha-data-devops.ts` (1,100 lines)**

| Schema | Purpose |
|--------|---------|
| `dataPipelineCreateSchema` | Validates pipeline creation (name, stages, schedule) |
| `dataPipelineStageCreateSchema` | Validates stage creation (type, config, dependencies) |
| `dataQualityRuleCreateSchema` | Validates rule creation (entity, metric, threshold) |
| `dataQualityIssueCreateSchema` | Validates issue creation (rule, severity, details) |
| `dataWarehouseCreateSchema` | Validates warehouse creation (name, engine, config) |
| `dataTransformCreateSchema` | Validates transform creation (source, target, mapping) |
| `dataRetentionPolicyCreateSchema` | Validates retention creation (entity, period, action) |
| `dataStewardshipCreateSchema` | Validates stewardship creation (domain, owner) |
| `dataSubjectCreateSchema` | Validates subject creation (type, identifier) |
| `dataCatalogCreateSchema` | Validates catalog creation (name, description, schema) |
| `dataLineageCreateSchema` | Validates lineage creation (source, target, transformation) |
| `dataAnalyticsCreateSchema` | Validates analytics creation (dataset, metrics) |

### Errors

| Error Code | Description |
|------------|-------------|
| `DATA_PIPELINE_NOT_FOUND` | Data pipeline not found |
| `DATA_PIPELINE_FAILED` | Pipeline execution failed |
| `DATA_STAGE_FAILED` | Pipeline stage failed |
| `DATA_QUALITY_RULE_INVALID` | Quality rule configuration invalid |
| `DATA_QUALITY_ISSUE_DETECTED` | Data quality issue detected |
| `DATA_WAREHOUSE_UNAVAILABLE` | Data warehouse unavailable |
| `DATA_TRANSFORM_FAILED` | Data transformation failed |
| `DATA_RETENTION_VIOLATED` | Data retention policy violated |
| `DATA_STEWARDSHIP_CONFLICT` | Stewardship assignment conflict |
| `DATA_SUBJECT_NOT_FOUND` | Data subject not found |
| `DATA_CATALOG_CONFLICT` | Catalog entry conflict |
| `DATA_LINEAGE_INCOMPLETE` | Data lineage incomplete |

### Repository

```typescript
// 12 repository interfaces for data platform
interface DataPipelineRepository {
  create(data: DataPipelineCreate): Promise<DataPipeline>;
  findById(id: string): Promise<DataPipeline | null>;
  findByName(name: string): Promise<DataPipeline | null>;
  findByStatus(status: string): Promise<DataPipeline[]>;
  update(id: string, data: DataPipelineUpdate): Promise<DataPipeline>;
  delete(id: string): Promise<void>;
  list(query: DataPipelineQuery): Promise<DataPipeline[]>;
  findActive(): Promise<DataPipeline[]>;
}

interface DataQualityRuleRepository {
  create(data: DataQualityRuleCreate): Promise<DataQualityRule>;
  findById(id: string): Promise<DataQualityRule | null>;
  findByEntity(entity: string): Promise<DataQualityRule[]>;
  findActive(): Promise<DataQualityRule[]>;
  update(id: string, data: DataQualityRuleUpdate): Promise<DataQualityRule>;
  delete(id: string): Promise<void>;
  list(query: DataQualityRuleQuery): Promise<DataQualityRule[]>;
}
```

### Services

| Service | Responsibilities |
|---------|-----------------|
| `DataPipelineService` | Pipeline creation and execution |
| `DataPipelineStageService` | Stage management and execution |
| `DataQualityRuleService` | Quality rule definition and evaluation |
| `DataQualityIssueService` | Issue tracking and resolution |
| `DataWarehouseService` | Warehouse management and queries |
| `DataTransformService` | Data transformation execution |
| `DataRetentionPolicyService` | Retention policy enforcement |
| `DataStewardshipService` | Data ownership and governance |
| `DataSubjectService` | GDPR/CCPA data subject management |
| `DataCatalogService` | Data catalog and discovery |
| `DataLineageService` | Data lineage tracking |
| `DataAnalyticsService` | Data analytics and reporting |

### Hooks

| Hook | Purpose |
|------|---------|
| `useDataPipelines` | Pipeline management |
| `useDataPipelineStages` | Stage management |
| `useDataQualityRules` | Quality rule management |
| `useDataQualityIssues` | Issue tracking |
| `useDataWarehouses` | Warehouse management |
| `useDataTransforms` | Transform operations |
| `useDataRetentionPolicy` | Retention management |
| `useDataStewardship` | Stewardship management |
| `useDataSubjects` | Subject management |
| `useDataCatalog` | Catalog management |
| `useDataLineage` | Lineage tracking |
| `useDataAnalytics` | Analytics viewing |

### API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enterprise/data/pipelines` | List pipelines |
| POST | `/api/enterprise/data/pipelines` | Create pipeline |
| GET | `/api/enterprise/data/pipelines/[id]` | Get pipeline |
| PUT | `/api/enterprise/data/pipelines/[id]` | Update pipeline |
| POST | `/api/enterprise/data/pipelines/[id]/run` | Run pipeline |
| GET | `/api/enterprise/data/pipelines/[id]/stages` | List stages |
| GET | `/api/enterprise/data/quality/rules` | List rules |
| POST | `/api/enterprise/data/quality/rules` | Create rule |
| GET | `/api/enterprise/data/quality/issues` | List issues |
| POST | `/api/enterprise/data/quality/issues` | Create issue |
| PUT | `/api/enterprise/data/quality/issues/[id]` | Update issue |
| GET | `/api/enterprise/data/warehouses` | List warehouses |
| POST | `/api/enterprise/data/warehouses` | Create warehouse |
| GET | `/api/enterprise/data/transforms` | List transforms |
| POST | `/api/enterprise/data/transforms` | Create transform |
| GET | `/api/enterprise/data/retention` | List retention policies |
| POST | `/api/enterprise/data/retention` | Create retention policy |
| GET | `/api/enterprise/data/stewardship` | List stewardship |
| POST | `/api/enterprise/data/stewardship` | Create stewardship |
| GET | `/api/enterprise/data/subjects` | List subjects |
| POST | `/api/enterprise/data/subjects` | Create subject |
| GET | `/api/enterprise/data/catalog` | List catalog entries |
| POST | `/api/enterprise/data/catalog` | Create catalog entry |
| GET | `/api/enterprise/data/lineage` | List lineage |
| GET | `/api/enterprise/data/analytics` | Data analytics |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `DataPlatformDashboardScreen` | Data platform overview |
| `DataPipelineScreen` | Pipeline management |
| `DataQualityScreen` | Quality monitoring |
| `DataWarehouseScreen` | Warehouse status |
| `DataCatalogScreen` | Data discovery |
| `DataLineageScreen` | Lineage visualization |
| `DataSubjectScreen` | GDPR subject management |

## Configuration

```typescript
export const DATA_PLATFORM_CONFIG = {
  limits: {
    maxPipelines: 200,
    maxStagesPerPipeline: 20,
    maxQualityRules: 1000,
    maxWarehouses: 10,
    maxTransforms: 500,
    maxCatalogEntries: 10000,
  },
  pipelines: {
    maxConcurrentRuns: 10,
    timeoutMs: 3600000,
    retryCount: 3,
    checkpointingEnabled: true,
  },
  quality: {
    evaluationIntervalMs: 300000,
    maxIssuesPerRule: 1000,
    autoRemediationEnabled: false,
    alertThreshold: 0.95,
  },
  warehouse: {
    maxQueryTimeoutMs: 300000,
    maxConcurrentQueries: 20,
    cachingEnabled: true,
    compressionEnabled: true,
  },
  retention: {
    evaluationIntervalMs: 86400000,
    deletionBatchSize: 1000,
    archiveBeforeDelete: true,
  },
  catalog: {
    autoDiscoveryEnabled: true,
    refreshIntervalMs: 3600000,
    maxTagsPerEntry: 20,
  },
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `data_admin` | Full data platform management |
| `data_engineer` | Pipeline and transform management |
| `data_analyst` | Analytics and catalog access |
| `data_steward` | Quality and stewardship management |
| `data_subject_manager` | GDPR/CCPA operations |
| `platform_admin` | Cross-tenant data operations |

## Multi-Tenancy

- Data pipelines scoped per tenant
- Quality rules per tenant entity
- Warehouses per tenant cluster
- Catalog entries per tenant domain
- Lineage tracking per tenant
- Retention policies per tenant

## Offline Support

- Pipeline configurations cached locally
- Quality rules cached for offline evaluation
- Catalog entries available offline
- Lineage data cached for offline viewing
- Analytics reports cached

## API Reference

### Pipelines
- GET /api/enterprise/data/pipelines
- POST /api/enterprise/data/pipelines
- GET /api/enterprise/data/pipelines/[id]
- PUT /api/enterprise/data/pipelines/[id]
- POST /api/enterprise/data/pipelines/[id]/run
- GET /api/enterprise/data/pipelines/[id]/stages

### Quality
- GET /api/enterprise/data/quality/rules
- POST /api/enterprise/data/quality/rules
- GET /api/enterprise/data/quality/rules/[id]
- PUT /api/enterprise/data/quality/rules/[id]
- GET /api/enterprise/data/quality/issues
- POST /api/enterprise/data/quality/issues
- PUT /api/enterprise/data/quality/issues/[id]

### Warehouses
- GET /api/enterprise/data/warehouses
- POST /api/enterprise/data/warehouses
- GET /api/enterprise/data/warehouses/[id]
- PUT /api/enterprise/data/warehouses/[id]

### Transforms
- GET /api/enterprise/data/transforms
- POST /api/enterprise/data/transforms
- GET /api/enterprise/data/transforms/[id]
- PUT /api/enterprise/data/transforms/[id]

### Retention
- GET /api/enterprise/data/retention
- POST /api/enterprise/data/retention
- GET /api/enterprise/data/retention/[id]
- PUT /api/enterprise/data/retention/[id]

### Stewardship
- GET /api/enterprise/data/stewardship
- POST /api/enterprise/data/stewardship
- GET /api/enterprise/data/stewardship/[id]
- PUT /api/enterprise/data/stewardship/[id]

### Subjects
- GET /api/enterprise/data/subjects
- POST /api/enterprise/data/subjects
- GET /api/enterprise/data/subjects/[id]
- PUT /api/enterprise/data/subjects/[id]

### Catalog
- GET /api/enterprise/data/catalog
- POST /api/enterprise/data/catalog
- GET /api/enterprise/data/catalog/[id]
- PUT /api/enterprise/data/catalog/[id]

### Lineage
- GET /api/enterprise/data/lineage
- GET /api/enterprise/data/lineage/[id]

### Analytics
- GET /api/enterprise/data/analytics
- GET /api/enterprise/data/analytics/[id]

## Testing

| Test Category | Coverage |
|---------------|----------|
| Unit Tests | All services and validators |
| Integration Tests | Pipeline execution scenarios |
| E2E Tests | Full data platform workflows |
| Quality Tests | Data quality evaluation |
| Retention Tests | Data retention enforcement |

## Security

- Data pipelines authenticated and authorized
- Quality rules access controlled
- Warehouse queries audited
- Transform operations logged
- Retention enforcement compliant with GDPR
- Catalog access controlled by role
- Lineage data integrity verified

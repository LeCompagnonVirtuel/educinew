# GEDKIN Data Fabric Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

The Global Education Data Fabric (Module 1) provides a unified data management layer that organizes, governs, and ensures quality across all educational data domains within EduCI.

---

## Data Model

### GedkinDataDomain

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Domain name (1-200 chars) |
| `description` | string | Domain description (max 2000) |
| `owner` | string | Domain owner |
| `steward` | string | Data steward |
| `status` | enum | DRAFT, PUBLISHED, DEPRECATED, ARCHIVED |
| `qualityLevel` | enum | EXCELLENT, GOOD, FAIR, POOR, CRITICAL |
| `classification` | enum | PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED, TOP_SECRET |
| `visibility` | enum | PRIVATE, INSTITUTIONAL, REGIONAL, NATIONAL, INTERNATIONAL, PUBLIC |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinDataProduct

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `domainId` | UUID | Parent domain |
| `name` | string | Product name (1-200 chars) |
| `description` | string | Product description (max 2000) |
| `type` | string | Product type |
| `version` | string | Semantic version |
| `status` | enum | DRAFT, PUBLISHED, DEPRECATED, ARCHIVED |
| `schema` | JSONB | Product schema definition |
| `lineage` | string[] | Lineage references |
| `contracts` | string[] | Associated contracts |

### GedkinDataContract

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `productId` | UUID | Parent product |
| `name` | string | Contract name (1-200 chars) |
| `description` | string | Contract description (max 2000) |
| `schema` | JSONB | Contract schema |
| `sla` | JSONB | Service level agreement |
| `enforcement` | string | Enforcement mode |

### GedkinDataSource

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `domainId` | UUID | Parent domain |
| `name` | string | Source name (1-200 chars) |
| `type` | string | Source type |
| `connection` | JSONB | Connection parameters |
| `schema` | JSONB | Source schema |
| `refreshInterval` | string | Refresh frequency |
| `lastSyncedAt` | ISO 8601 | Last sync timestamp |
| `status` | string | Connection status |

### GedkinDataLineage

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `sourceId` | UUID | Source entity |
| `targetId` | UUID | Target entity |
| `transformation` | string | Transformation description |
| `direction` | string | Data flow direction |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinDataQuality

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `domainId` | UUID | Domain reference |
| `productId` | UUID | Product reference |
| `completeness` | number | 0-100 score |
| `consistency` | number | 0-100 score |
| `freshness` | number | 0-100 score |
| `accuracy` | number | 0-100 score |
| `overallScore` | number | 0-100 composite score |
| `issues` | string[] | Detected issues |
| `checkedAt` | ISO 8601 | Check timestamp |

---

## Data Domains

| Domain | Description |
|--------|-------------|
| `SCHOOL` | School institution data |
| `STUDENT` | Student records and profiles |
| `TEACHER` | Teacher records and profiles |
| `PARENT` | Parent/guardian records |
| `FINANCE` | Financial transactions and budgets |
| `HR` | Human resources data |
| `EXAMS` | Examination and assessment data |
| `CURRICULUM` | Curriculum and syllabus data |
| `RESEARCH` | Research project data |
| `GOVERNMENT` | Government reporting data |
| `HEALTH` | Health and medical records |
| `INFRASTRUCTURE` | Facility and equipment data |
| `IDENTITY` | Identity and access data |
| `CLOUD` | Cloud infrastructure data |
| `CYBERSECURITY` | Security event data |

---

## Data Quality Scoring

### Composite Score Calculation

```
overallScore = (completeness × 0.25) + (consistency × 0.25) + (freshness × 0.25) + (accuracy × 0.25)
```

### Quality Levels

| Level | Score Range | Action |
|-------|------------|--------|
| EXCELLENT | 90-100 | No action required |
| GOOD | 75-89 | Monitor |
| FAIR | 50-74 | Review recommended |
| POOR | 25-49 | Remediation required |
| CRITICAL | 0-24 | Immediate action required |

---

## Configuration

```typescript
export const gedkinDataFabricConfig = {
  enabled: true,
  maxDomainsPerSchool: 50,
  maxProductsPerDomain: 100,
  maxSourcesPerDomain: 50,
  qualityCheckInterval: 3600,
  lineageTrackingEnabled: true,
  dataProfilingEnabled: true,
  versioningEnabled: true,
  classificationLevels: ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED', 'TOP_SECRET'],
  visibilityLevels: ['PRIVATE', 'INSTITUTIONAL', 'REGIONAL', 'NATIONAL', 'INTERNATIONAL', 'PUBLIC'],
};
```

---

## Zod Validation Schemas

### Create Data Domain

```typescript
z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  owner: z.string().min(1),
  steward: z.string().min(1),
  status: z.nativeEnum(GedkinDataProductStatus),
  qualityLevel: z.nativeEnum(GedkinDataQualityLevel),
  classification: z.nativeEnum(GedkinDataClassification),
  visibility: z.nativeEnum(GedkinDataVisibility),
})
```

### Create Data Product

```typescript
z.object({
  schoolId: z.string().uuid(),
  domainId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
  type: z.string().min(1),
  version: z.string().min(1),
  status: z.nativeEnum(GedkinDataProductStatus),
  schema: z.record(z.unknown()),
  lineage: z.array(z.string()),
  contracts: z.array(z.string()),
})
```

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinDataDomainNotFoundError` | GEDKIN_DATA_DOMAIN_NOT_FOUND | 404 |
| `GedkinDataDomainError` | GEDKIN_DATA_DOMAIN | 500 |
| `GedkinDataDomainConflictError` | GEDKIN_DATA_DOMAIN_CONFLICT | 409 |
| `GedkinDataProductNotFoundError` | GEDKIN_DATA_PRODUCT_NOT_FOUND | 404 |
| `GedkinDataProductError` | GEDKIN_DATA_PRODUCT | 500 |
| `GedkinDataProductConflictError` | GEDKIN_DATA_PRODUCT_CONFLICT | 409 |
| `GedkinDataContractError` | GEDKIN_DATA_CONTRACT | 500 |
| `GedkinDataQualityError` | GEDKIN_DATA_QUALITY | 500 |
| `GedkinDataLineageError` | GEDKIN_DATA_LINEAGE | 500 |
| `GedkinDataSourceNotFoundError` | GEDKIN_DATA_SOURCE_NOT_FOUND | 404 |
| `GedkinDataSourceError` | GEDKIN_DATA_SOURCE | 500 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_API.md](GEDKIN_API.md)
- [GEDKIN_ARCHITECTURE.md](GEDKIN_ARCHITECTURE.md)

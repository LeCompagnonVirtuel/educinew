# GEDKIN Data Marketplace Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

The Data Products & Marketplace (Module 10) enables publishing, discovering, subscribing to, and managing educational data products with licensing, SLAs, reviews, and access control.

---

## Data Model

### GedkinMarketplaceProduct

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Product name (1-200 chars) |
| `description` | string | Product description (max 5000) |
| `type` | enum | Product category |
| `version` | string | Semantic version |
| `status` | enum | DRAFT, PUBLISHED, ARCHIVED |
| `license` | enum | License type |
| `pricing` | JSONB | Pricing configuration |
| `schema` | JSONB | Product schema |
| `documentation` | string | Documentation (max 10000) |
| `rating` | number | 0-5 average rating |
| `downloads` | integer | Download count |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinDataSubscription

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `productId` | UUID | Subscribed product |
| `userId` | UUID | Subscriber user |
| `status` | string | Subscription status |
| `startDate` | ISO 8601 | Start date |
| `endDate` | ISO 8601 | End date |
| `usage` | JSONB | Usage metrics |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinDataAccessLog

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `productId` | UUID | Accessed product |
| `userId` | UUID | Accessing user |
| `action` | string | Access action |
| `timestamp` | ISO 8601 | Access timestamp |
| `details` | JSONB | Access details |

### GedkinProductReview

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `productId` | UUID | Reviewed product |
| `userId` | UUID | Reviewer user |
| `rating` | integer | 1-5 rating |
| `comment` | string | Review comment (max 2000) |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinProductSLA

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `productId` | UUID | SLA product |
| `availability` | number | 0-100 uptime percentage |
| `latency` | number | Max response time (ms) |
| `freshness` | number | Max data age (seconds) |
| `uptime` | number | 0-100 availability |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

---

## Product Types

| Type | Description | Example |
|------|-------------|---------|
| `DATASET` | Structured data | Student performance CSV |
| `INDICATOR` | Calculated metrics | Enrollment rate |
| `DASHBOARD` | Visualization | Analytics dashboard |
| `API` | Data endpoint | REST API access |
| `MODEL` | ML model | Dropout prediction model |
| `EMBEDDING` | Vector embeddings | Concept embeddings |
| `ONTOLOGY` | Knowledge structure | Curriculum ontology |
| `KNOWLEDGE_GRAPH` | Graph data | Education graph |
| `FORECAST` | Predictions | Enrollment forecast |
| `REPORT` | Analysis report | Annual report |

---

## License Types

| Type | Description | Cost |
|------|-------------|------|
| `FREE` | Open access | Free |
| `COMMERCIAL` | Commercial use | Paid |
| `RESEARCH` | Academic research | Free/Discounted |
| `EDUCATIONAL` | Educational use | Discounted |
| `GOVERNMENT` | Government use | Negotiated |

---

## Marketplace Flow

```
Publisher → Create Product → Set License → Publish
                                              ↓
Consumer → Browse → Subscribe → Access → Review
```

---

## SLA Monitoring

### Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Availability | 99.9% | < 99.5% |
| Latency | < 200ms | > 500ms |
| Freshness | < 1 hour | > 4 hours |
| Error Rate | < 0.1% | > 1% |

### SLA Tiers

| Tier | Availability | Latency | Support |
|------|-------------|---------|---------|
| Basic | 99.0% | < 500ms | Email |
| Standard | 99.5% | < 200ms | Email + Chat |
| Premium | 99.9% | < 100ms | 24/7 Phone |

---

## Access Control

### Access Levels

| Level | Description |
|-------|-------------|
| `PUBLIC` | Anyone can view |
| `SUBSCRIBED` | Active subscription required |
| `LICENSED` | License key required |
| `RESTRICTED` | Admin approval required |
| `PRIVATE` | Owner only |

### Access Actions

| Action | Description |
|--------|-------------|
| `VIEW` | View metadata |
| `DOWNLOAD` | Download dataset |
| `QUERY` | Query via API |
| `TRANSFORM` | Apply transformations |
| `REDISTRIBUTE` | Share with others |

---

## Configuration

```typescript
export const gedkinMarketplaceConfig = {
  enabled: true,
  maxProductsPerSchool: 100,
  ratingEnabled: true,
  reviewEnabled: true,
  usageTrackingEnabled: true,
  slaMonitoringEnabled: true,
  licensingEnforcement: true,
  dataContractEnforcement: true,
  downloadTrackingEnabled: true,
  pricingModels: ['FREE', 'COMMERCIAL', 'RESEARCH', 'EDUCATIONAL', 'GOVERNMENT'],
};
```

---

## Zod Validation Schemas

### Create Marketplace Product

```typescript
z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(5000),
  type: z.nativeEnum(GedkinProductType),
  version: z.string().min(1),
  status: z.nativeEnum(GedkinMarketplaceStatus),
  license: z.nativeEnum(GedkinLicenseType),
  pricing: z.record(z.unknown()),
  schema: z.record(z.unknown()),
  documentation: z.string().max(10000),
  rating: z.number().min(0).max(5),
  downloads: z.number().int().nonneg(),
})
```

### Create Product Review

```typescript
z.object({
  schoolId: z.string().uuid(),
  productId: z.string().uuid(),
  userId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(2000),
})
```

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinMarketplaceProductNotFoundError` | GEDKIN_MARKETPLACE_PRODUCT_NOT_FOUND | 404 |
| `GedkinMarketplaceProductError` | GEDKIN_MARKETPLACE_PRODUCT | 500 |
| `GedkinMarketplaceConflictError` | GEDKIN_MARKETPLACE_CONFLICT | 409 |
| `GedkinSubscriptionError` | GEDKIN_SUBSCRIPTION | 500 |
| `GedkinAccessDeniedError` | GEDKIN_ACCESS_DENIED | 403 |
| `GedkinSLAError` | GEDKIN_SLA | 500 |
| `GedkinLicensingError` | GEDKIN_LICENSING | 403 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_DATA.md](GEDKIN_DATA.md)
- [GEDKIN_EXPERIMENTS.md](GEDKIN_EXPERIMENTS.md)

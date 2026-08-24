# GEGIN API Reference

## Phase 4.2 - Global Education Intelligence Network

---

## 1. Overview

Complete API reference for GEGIN network services, including authentication,
endpoints, and integration patterns.

---

## 2. Base Configuration

### 2.1 Base URL

```
Production: https://api.gegin.educi.com/v2
Staging: https://staging-api.gegin.educi.com/v2
```

### 2.2 Authentication

```typescript
// Bearer Token (JWT)
Authorization: Bearer <access_token>

// API Key (service-to-service)
X-API-Key: <api_key>

// Institution Context
X-Institution-ID: <institution_id>
```

---

## 3. Request/Response Format

### 3.1 Headers

| Header | Required | Description |
|--------|----------|-------------|
| Authorization | Yes | Bearer token |
| Content-Type | Yes | application/json |
| X-Institution-ID | Yes | Institution context |
| X-Request-ID | No | Request tracing |
| Accept-Language | No | Response language |

### 3.2 Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| limit | number | Items per page |
| sort | string | Sort field |
| order | asc/desc | Sort direction |
| search | string | Full-text search |

### 3.3 Response Schema

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta: { page: number; limit: number; total: number; totalPages: number };
  links?: { self: string; next?: string; prev?: string };
}
```

---

## 4. Rate Limiting

| Tier | Requests/Min | Requests/Day |
|------|--------------|--------------|
| Free | 60 | 1,000 |
| Standard | 300 | 10,000 |
| Premium | 1,000 | 100,000 |
| Enterprise | 5,000 | Unlimited |

---

## 5. Endpoints: Organizations

```http
GET    /organizations              # List organizations
POST   /organizations              # Create organization
GET    /organizations/:id          # Get organization
PATCH  /organizations/:id          # Update organization
POST   /organizations/:id/relationships  # Create relationship
GET    /organizations/:id/analytics      # Get analytics
```

---

## 6. Endpoints: Identity

```http
POST   /identity/federate          # Initiate SSO
POST   /identity/assertion         # Process assertion
GET    /identity/verify/:userId    # Verify identity
PATCH  /identity/attributes        # Update attributes
POST   /identity/revoke            # Revoke credentials
```

---

## 7. Endpoints: Qualifications

```http
GET    /qualifications             # List qualifications
POST   /qualifications/verify      # Verify credential
POST   /qualifications/transfer    # Request transfer
GET    /qualifications/equivalency # Check equivalency
POST   /qualifications/badge       # Issue badge
```

---

## 8. Endpoints: Mobility

```http
GET    /mobility/programs          # List programs
POST   /mobility/applications      # Submit application
GET    /mobility/applications/:id  # Application status
GET    /mobility/tracking/:id      # Track mobility
POST   /mobility/credits/transfer  # Request credit transfer
```

---

## 9. Endpoints: Research

```http
GET    /research/projects          # List projects
POST   /research/projects          # Create project
POST   /research/data-sharing      # Request data share
GET    /research/outputs           # List publications
POST   /research/outputs           # Register output
```

---

## 10. Endpoints: Analytics

```http
GET    /analytics/dashboard        # Get dashboard data
GET    /analytics/reports          # List reports
POST   /analytics/reports          # Generate report
GET    /analytics/benchmarks       # View benchmarks
POST   /analytics/predictions      # Run prediction
GET    /analytics/alerts           # View alerts
```

---

## 11. Webhooks

### 11.1 Event Types

| Event | Description |
|-------|-------------|
| organization.created | New institution |
| identity.federated | SSO completed |
| qualification.issued | New credential |
| mobility.completed | Program finished |
| research.published | Output released |

### 11.2 Verification

```typescript
const signature = crypto
  .createHmac('sha256', webhookSecret)
  .update(JSON.stringify(payload))
  .digest('hex');
```

---

## 12. SDK Examples

```typescript
import { GEGINClient } from '@gegin/sdk';

const client = new GEGINClient({
  apiKey: process.env.GEGIN_API_KEY,
  institutionId: process.env.INSTITUTION_ID,
});

const org = await client.organizations.get('org_123');
```

---

## 13. Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| AUTH_001 | Invalid token | 401 |
| AUTH_002 | Token expired | 401 |
| AUTH_003 | Insufficient permissions | 403 |
| VAL_001 | Invalid request body | 400 |
| NOT_FOUND | Resource not found | 404 |
| RATE_001 | Rate limit exceeded | 429 |
| SERVER_001 | Internal error | 500 |

---

## 14. Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-08-07 | GEGIN v2 API launch |
| 1.0 | 2025-06-01 | Initial API release |

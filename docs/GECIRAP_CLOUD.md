# GECIRAP — Global Cloud Infrastructure

## Multi-Provider Cloud Management for Education

---

## 1. Vision

GECIRAP Cloud provides unified management of cloud infrastructure across multiple providers, enabling educational institutions to provision, monitor, and optimize their cloud resources through a single pane of glass.

---

## 2. Supported Providers

| Provider | Type | Status | Use Case |
|----------|------|--------|----------|
| AWS | Public Cloud | Supported | Primary production workloads |
| Azure | Public Cloud | Supported | Microsoft ecosystem integration |
| GCP | Public Cloud | Supported | AI/ML workloads, data analytics |
| Oracle | Public Cloud | Supported | Database-intensive workloads |
| Private | Private Cloud | Supported | Sovereign data requirements |
| On-Premise | Hybrid | Supported | Legacy system integration |
| Hybrid | Multi-cloud | Supported | Mixed environments |

---

## 3. Entity Relationships

```
CloudProvider (1) ──── (N) CloudAccount
CloudAccount (1) ──── (N) CloudRegion
CloudRegion (1) ──── (N) CloudResource
CloudEnvironment (1) ──── (N) CloudDeployment
CloudDeployment (N) ──── (N) CloudResource
```

---

## 4. Resource Types

| Type | Description | Examples |
|------|-------------|----------|
| `VM` | Virtual machines | EC2, Azure VM, Compute Engine |
| `CONTAINER` | Container instances | ECS, AKS, GKE |
| `DATABASE` | Managed databases | RDS, Cloud SQL, Cosmos DB |
| `STORAGE` | Object/block storage | S3, Blob Storage, Cloud Storage |
| `NETWORK` | Virtual networks | VPC, VNet, Cloud VPC |
| `LOAD_BALANCER` | Load balancers | ALB, Azure LB, Cloud Load Balancing |
| `CDN` | Content delivery | CloudFront, Azure CDN, Cloud CDN |
| `DNS` | DNS management | Route 53, Azure DNS, Cloud DNS |
| `FIREWALL` | Security groups | Security Groups, NSGs, Firewall Rules |
| `CACHE` | In-memory cache | ElastiCache, Azure Cache, Memorystore |
| `QUEUE` | Message queues | SQS, Service Bus, Pub/Sub |
| `SERVERLESS` | Functions | Lambda, Functions, Cloud Functions |

---

## 5. Resource Lifecycle

```
PROVISIONING → RUNNING → STOPPED → TERMINATED
     │            │         │
     │            ├─────────┤
     │            │   UPDATING
     │            │
     │            └── MIGRATING
     │
     └── ERROR
         SUSPENDED
         DELETING
```

---

## 6. Health Monitoring

| Status | Description | Action |
|--------|-------------|--------|
| `HEALTHY` | All systems operational | None |
| `DEGRADED` | Partial degradation | Alert |
| `UNHEALTHY` | Critical issues | Page on-call |
| `UNKNOWN` | Unable to determine | Investigate |

### Health Check Intervals

| Resource Type | Default Interval |
|---------------|-----------------|
| VM | 60 seconds |
| Container | 30 seconds |
| Database | 60 seconds |
| Load Balancer | 10 seconds |
| CDN | 300 seconds |

---

## 7. Cloud Accounts

### Account Status

| Status | Description |
|--------|-------------|
| `ACTIVE` | Fully operational |
| `INACTIVE` | Temporarily disabled |
| `SUSPENDED` | Suspended by provider |
| `PENDING` | Setup in progress |
| `ERROR` | Credential or config error |
| `CREDENTIALS_EXPIRED` | API keys need rotation |

### Credential Management

- Credentials encrypted with AES-256-GCM
- Stored as JSONB in `cloud_accounts` table
- Never exposed to client-side code
- Rotation recommended every 90 days

---

## 8. Cloud Environments

| Environment | Purpose | Data |
|-------------|---------|------|
| `PRODUCTION` | Live production | Real data |
| `STAGING` | Pre-production testing | Anonymized data |
| `DEVELOPMENT` | Development & debugging | Test data |
| `TESTING` | Automated test suites | Test data |
| `DR` | Disaster recovery standby | Replica data |
| `QA` | Quality assurance | Anonymized data |

---

## 9. Cloud Deployments

### Deployment Strategies

| Strategy | Description | Downtime |
|----------|-------------|----------|
| Rolling Update | Gradual replacement | Zero |
| Blue-Green | Switch traffic | Near-zero |
| Canary | Gradual traffic shift | Zero |
| Recreate | Stop then start | Yes |

### Deployment Status Flow

```
PENDING → IN_PROGRESS → COMPLETED
              │
              ├── FAILED → ROLLED_BACK
              └── CANCELLED
```

---

## 10. Cloud Quotas

Quotas track resource limits per region:

```json
{
  "id": "uuid",
  "regionId": "uuid-region",
  "resource": "instances",
  "limit": 100,
  "used": 45,
  "unit": "count"
}
```

### Quota Alert Thresholds

| Level | Threshold | Action |
|-------|-----------|--------|
| Normal | < 70% | None |
| Warning | 70-85% | Alert |
| Critical | 85-95% | Page |
| Exceeded | > 95% | Block provisioning |

---

## 11. Cost Tracking

Each resource tracks hourly cost:

```typescript
interface GecirapCloudResource {
  cost: number; // Cost per hour in USD
  // ...
}
```

### Cost Aggregation

- Per resource
- Per account
- Per region
- Per provider
- Per environment
- Per school

---

## 12. Tags & Metadata

Resources support key-value tags for organization:

```typescript
interface GecirapCloudResource {
  tags: Record<string, string>;
  // Example: { "environment": "prod", "department": "it", "project": "sis" }
}
```

### Tag Limits

| Constraint | Value |
|------------|-------|
| Max tags per resource | 50 |
| Max key length | 128 characters |
| Max value length | 256 characters |

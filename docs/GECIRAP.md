# GECIRAP — Gestion de l'Infrastructure Cloud, Intelligence et Résilience pour l'Académie Pédagogique

## Phase 4.8 — Enterprise Cloud Intelligence Platform

**Version:** 1.0
**Status:** Production Ready
**Phase:** 4.8

---

## 1. Overview

GECIRAP is EduCI's enterprise-grade cloud infrastructure management platform. It provides unified control over multi-cloud environments, container orchestration, disaster recovery, edge computing, network intelligence, AIOps, FinOps, and infrastructure digital twins — all scoped per educational institution via `school_id`.

The module implements **12 interconnected subsystems** with **80 API endpoints**, following the Page → Hook → Service → Repository → Supabase architecture.

---

## 2. Modules

| # | Module | Description | Endpoints |
|---|--------|-------------|-----------|
| 1 | **Global Cloud Infrastructure** | Multi-provider cloud management (AWS, Azure, GCP, Oracle, Private, On-Premise, Hybrid) | 12 |
| 2 | **Multi-Region & Geo-Distribution** | Geo-distributed deployments, failover, traffic routing, replication | 10 |
| 3 | **Container & Workload Orchestration** | Kubernetes clusters, namespaces, workloads, services, ingress | 8 |
| 4 | **Infrastructure as Code** | Terraform/Pulumi/CloudFormation templates, stacks, drift detection | 7 |
| 5 | **Autoscaling & Capacity Intelligence** | Auto-scaling policies, capacity forecasting, utilization monitoring | 6 |
| 6 | **Disaster Recovery 2.0** | DR plans, recovery strategies, automated recovery, dependency management | 6 |
| 7 | **Multi-Cloud Orchestration** | Placement decisions, cloud migration, load balancing across providers | 5 |
| 8 | **Edge Computing & Offline Education** | Edge nodes, offline packages, sync jobs, edge policies | 7 |
| 9 | **Network & CDN Intelligence** | VPC, load balancers, CDN distributions, DNS, traffic metrics | 8 |
| 10 | **AIOps & Autonomous Operations** | AI agents, event correlation, root cause analysis, remediation | 7 |
| 11 | **FinOps & Cloud Economic Intelligence** | Cost tracking, budgets, forecasting, optimization recommendations | 6 |
| 12 | **Infrastructure Digital Twin** | Virtual replicas, simulations, scenarios, sync | 6 |

**Total: 88 endpoints**

---

## 3. Data Model

Every entity follows the multi-tenant pattern:

```typescript
interface GecirapBaseEntity {
  id: string;           // UUID primary key
  school_id: string;    // FK to schools — tenant isolation
  created_at: string;   // ISO timestamp
  updated_at: string;   // ISO timestamp
  deleted_at?: string;  // Soft delete
}
```

All tables include:
- `school_id UUID NOT NULL REFERENCES schools(id)` — mandatory FK
- `created_at TIMESTAMPTZ DEFAULT now()`
- `updated_at TIMESTAMPTZ DEFAULT now()`
- `deleted_at TIMESTAMPTZ` — soft delete column
- RLS policies per table
- Indexes on `school_id`, status fields, timestamps

---

## 4. Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         GECIRAP Platform                             │
├──────────┬──────────┬──────────┬──────────┬──────────┬──────────────┤
│  Cloud   │  Multi   │Container │   IaC    │Autoscale │    DR 2.0    │
│  Infra   │  Region  │  Orch    │          │  & Cap   │              │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────────┤
│Multi-Cloud│  Edge   │ Network  │  AIOps   │ FinOps   │ Digital Twin │
│  Orch    │Computing│ & CDN    │          │          │              │
├──────────┴──────────┴──────────┴──────────┴──────────┴──────────────┤
│                      BaseGecirapService                              │
│           (validation, auth, audit, pagination)                      │
├─────────────────────────────────────────────────────────────────────┤
│                      BaseGecirapCrudRepository                       │
│           (CRUD, soft delete, restore, count)                        │
├─────────────────────────────────────────────────────────────────────┤
│                        Supabase                                      │
│            (PostgreSQL + RLS + Edge Functions)                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Configuration

All configuration is centralized in `packages/config/src/phase4-8-gecirap.ts`.

| Module | Key Setting | Default |
|--------|-------------|---------|
| Cloud | `maxAccountsPerSchool` | 10 |
| Cloud | `maxResourcesPerAccount` | 10,000 |
| Region | `maxRegionsPerSchool` | 20 |
| Region | `replicationLagThreshold` | 1,000 ms |
| Container | `maxClustersPerSchool` | 10 |
| Container | `maxNodesPerCluster` | 1,000 |
| IaC | `maxStacksPerSchool` | 100 |
| IaC | `driftDetectionInterval` | 3,600 s |
| Autoscaling | `maxPoliciesPerResource` | 10 |
| Autoscaling | `forecastHorizonHours` | 24 |
| DR | `maxPlansPerSchool` | 20 |
| DR | `defaultRTO` | 3,600 s |
| DR | `defaultRPO` | 900 s |
| Multi-Cloud | `maxMigrationsPerSchool` | 5 |
| Edge | `maxEdgeNodesPerSchool` | 100 |
| Edge | `offlineCacheSizeMB` | 1,024 |
| Network | `maxNetworksPerSchool` | 20 |
| AIOps | `maxAgentsPerSchool` | 20 |
| FinOps | `costRetentionDays` | 365 |
| Digital Twin | `maxTwinsPerSchool` | 10 |
| Security | `maxApiRequestsPerMinute` | 1,000 |

---

## 6. File Structure

```
packages/
  types/src/phase4-8-gecirap.ts        # Zod schemas, enums, interfaces
  errors/src/phase4-8-gecirap.ts       # Error classes (70+)
  config/src/phase4-8-gecirap.ts       # Configuration constants

web/src/features/gecirap/
  repositories/
    base-gecirap-repository.ts         # Generic CRUD repository
  services/
    base-gecirap-service.ts            # Base service (validation, auth, pagination)
  hooks/
    use-gecirap-dashboard.ts           # Dashboard hook

web/src/app/api/gecirap/
  cloud/        providers, accounts, resources, environments, deployments
  regions/      geo, policies, health, failover, traffic
  containers/   clusters, workloads, services
  iac/          templates, stacks, provisioning, drift
  scaling/      policies, events, capacity
  disaster-recovery/ plans, executions, tests
  multi-cloud/  placement, migrations, balances
  edge/         nodes, clusters, deployments, sync, offline-packages
  network/      networks, load-balancers, cdn, dns, health, metrics
  aiops/        agents, events, correlations, recommendations, remediation
  finops/       costs, budgets, forecasts, optimization
  digital-twin/ twins, simulations, scenarios
  dashboard/    overview, health
```

---

## 7. Error Handling

70+ error classes extend `AppError` from `@educi/errors`. Error codes follow `GECIRAP_<MODULE>_<ERROR>` pattern.

| Category | Example Codes |
|----------|---------------|
| Cloud | `GECIRAP_CLOUD_PROVIDER`, `GECIRAP_CLOUD_ACCOUNT_NOT_FOUND` |
| Region | `GECIRAP_FAILOVER_FAILED`, `GECIRAP_REPLICATION` |
| Container | `GECIRAP_CLUSTER`, `GECIRAP_WORKLOAD_SCHEDULING` |
| IaC | `GECIRAP_PROVISIONING_FAILED`, `GECIRAP_DRIFT_DETECTED` |
| Autoscaling | `GECIRAP_SCALING_FAILED`, `GECIRAP_CAPACITY_ALERT` |
| DR | `GECIRAP_RTO_NOT_MET`, `GECIRAP_RPO_NOT_MET` |
| Multi-Cloud | `GECIRAP_MIGRATION_FAILED`, `GECIRAP_PLACEMENT` |
| Edge | `GECIRAP_EDGE_SYNC_CONFLICT`, `GECIRAP_OFFLINE_PACKAGE` |
| Network | `GECIRAP_TRAFFIC_ANOMALY`, `GECIRAP_LOAD_BALANCER` |
| AIOps | `GECIRAP_REMEDIATION_FAILED`, `GECIRAP_ROOT_CAUSE` |
| FinOps | `GECIRAP_BUDGET_EXCEEDED`, `GECIRAP_COST_ANOMALY_DETECTED` |
| Digital Twin | `GECIRAP_TWIN_SIMULATION`, `GECIRAP_TWIN_SYNC` |
| Common | `GECIRAP_VALIDATION`, `GECIRAP_NOT_FOUND`, `GECIRAP_RATE_LIMIT` |

---

## 8. Security

- **Authentication:** Supabase JWT required on all endpoints
- **RBAC:** `SUPER_ADMIN` and `ADMIN` roles only
- **Multi-tenancy:** Every query scoped via `school_id`
- **Validation:** Zod schemas on all inputs
- **Audit:** All operations logged
- **Encryption:** AES-256-GCM for data at rest
- **Rate Limiting:** 1,000 requests/minute per user

---

## 9. Deployment

### Prerequisites

1. Supabase project with PostgreSQL
2. Next.js 14+ (App Router)
3. Node.js 18+

### Steps

1. Run database migrations (all `gecirap_*` tables)
2. Enable RLS on every table
3. Create indexes on `school_id`, status, timestamps
4. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy Next.js application

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key |

---

## 10. Related Documentation

| Document | Description |
|----------|-------------|
| [GECIRAP_API.md](./GECIRAP_API.md) | Full API reference (80 endpoints) |
| [GECIRAP_ARCHITECTURE.md](./GECIRAP_ARCHITECTURE.md) | Architecture deep dive |
| [GECIRAP_CLOUD.md](./GECIRAP_CLOUD.md) | Global cloud infrastructure |
| [GECIRAP_MULTI_REGION.md](./GECIRAP_MULTI_REGION.md) | Multi-region & geo-distribution |
| [GECIRAP_KUBERNETES.md](./GECIRAP_KUBERNETES.md) | Container orchestration |
| [GECIRAP_IAC.md](./GECIRAP_IAC.md) | Infrastructure as Code |
| [GECIRAP_AUTOSCALING.md](./GECIRAP_AUTOSCALING.md) | Autoscaling & capacity |
| [GECIRAP_DISASTER_RECOVERY.md](./GECIRAP_DISASTER_RECOVERY.md) | DR & business continuity |
| [GECIRAP_MULTI_CLOUD.md](./GECIRAP_MULTI_CLOUD.md) | Multi-cloud orchestration |
| [GECIRAP_EDGE.md](./GECIRAP_EDGE.md) | Edge computing & offline |
| [GECIRAP_NETWORK.md](./GECIRAP_NETWORK.md) | Network & CDN intelligence |
| [GECIRAP_AIOPS.md](./GECIRAP_AIOPS.md) | AIOps & autonomous ops |
| [GECIRAP_FINOPS.md](./GECIRAP_FINOPS.md) | FinOps & cloud economics |
| [GECIRAP_DIGITAL_TWIN.md](./GECIRAP_DIGITAL_TWIN.md) | Infrastructure digital twin |
| [GECIRAP_SECURITY.md](./GECIRAP_SECURITY.md) | Security & compliance |
| [GECIRAP_RBAC.md](./GECIRAP_RBAC.md) | RBAC/ABAC permissions |
| [GECIRAP_DATA_MESH.md](./GECIRAP_DATA_MESH.md) | Data mesh integration |
| [GECIRAP_OPERATIONS.md](./GECIRAP_OPERATIONS.md) | Operational procedures |
| [GECIRAP_AUDIT.md](./GECIRAP_AUDIT.md) | Audit report template |

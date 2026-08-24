# GECIRAP — API Reference

## Authentication & Authorization

All GECIRAP API endpoints require:

1. **Valid Supabase JWT** in the `Authorization: Bearer <token>` header
2. **Valid `school_id`** — extracted from JWT claims (users table)
3. **RBAC permissions** — `SUPER_ADMIN` or `ADMIN` role required

### Request Headers

```
Authorization: Bearer <supabase_jwt>
Content-Type: application/json
```

### Roles with GECIRAP Access

| Role | Access Level |
|------|-------------|
| `SUPER_ADMIN` | Full access across all schools |
| `ADMIN` | Full access for their school |
| `DIRECTEUR` | Read-only on dashboard endpoints |
| Other roles | No access |

---

## Pagination

All list endpoints support pagination:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | `1` | Page number |
| `limit` | number | `20` | Records per page (max: 100) |

### Response Format

```json
{
  "data": [...],
  "total": 150,
  "page": 1,
  "limit": 20,
  "totalPages": 8
}
```

---

## Error Response Format

```json
{
  "error": "Error message",
  "details": {}
}
```

HTTP Status Codes: `400` (validation), `401` (unauthenticated), `403` (unauthorized), `404` (not found), `409` (conflict), `429` (rate limit), `500` (server error)

---

## Module 1 — Global Cloud Infrastructure (12 endpoints)

### Cloud Providers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/cloud/providers` | List cloud providers |
| `GET` | `/api/gecirap/cloud/providers/:id` | Get provider by ID |
| `POST` | `/api/gecirap/cloud/providers` | Create cloud provider |
| `PUT` | `/api/gecirap/cloud/providers/:id` | Update cloud provider |
| `DELETE` | `/api/gecirap/cloud/providers/:id` | Delete cloud provider |

**Provider Types:** `AWS`, `AZURE`, `GCP`, `OPENSTACK`, `VMWARE`, `OTHER`

#### List Providers — Query Parameters

| Param | Type | Description |
|-------|------|-------------|
| `status` | string | Filter by status |
| `type` | string | Filter by provider type |
| `search` | string | Search by name |

#### Create Provider — Request Body

```json
{
  "name": "AWS Production",
  "type": "AWS",
  "endpoint": "https://ec2.us-east-1.amazonaws.com",
  "region": "us-east-1",
  "credentials": {
    "accessKeyId": "AKIA...",
    "secretAccessKey": "..."
  },
  "config": {},
  "status": "ACTIVE"
}
```

### Cloud Accounts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/cloud/accounts` | List cloud accounts |
| `GET` | `/api/gecirap/cloud/accounts/:id` | Get account by ID |
| `POST` | `/api/gecirap/cloud/accounts` | Create cloud account |
| `PUT` | `/api/gecirap/cloud/accounts/:id` | Update cloud account |
| `DELETE` | `/api/gecirap/cloud/accounts/:id` | Delete cloud account |

### Cloud Resources

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/cloud/resources` | List cloud resources |
| `GET` | `/api/gecirap/cloud/resources/:id` | Get resource by ID |
| `POST` | `/api/gecirap/cloud/resources` | Create cloud resource |
| `PUT` | `/api/gecirap/cloud/resources/:id` | Update cloud resource |
| `DELETE` | `/api/gecirap/cloud/resources/:id` | Delete cloud resource |

**Resource Types:** `VM`, `CONTAINER`, `DATABASE`, `STORAGE`, `NETWORK`, `LOAD_BALANCER`, `CDN`, `DNS`, `FIREWALL`, `CACHE`, `QUEUE`, `SERVERLESS`

**Resource Statuses:** `PROVISIONING`, `RUNNING`, `STOPPED`, `TERMINATED`, `ERROR`, `SUSPENDED`, `MIGRATING`, `UPDATING`, `DELETING`

### Cloud Environments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/cloud/environments` | List environments |
| `GET` | `/api/gecirap/cloud/environments/:id` | Get environment by ID |
| `POST` | `/api/gecirap/cloud/environments` | Create environment |
| `PUT` | `/api/gecirap/cloud/environments/:id` | Update environment |
| `DELETE` | `/api/gecirap/cloud/environments/:id` | Delete environment |

**Environment Types:** `PRODUCTION`, `STAGING`, `DEVELOPMENT`, `TESTING`, `DR`, `QA`

### Cloud Deployments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/cloud/deployments` | List deployments |
| `GET` | `/api/gecirap/cloud/deployments/:id` | Get deployment by ID |
| `POST` | `/api/gecirap/cloud/deployments` | Create deployment |
| `PUT` | `/api/gecirap/cloud/deployments/:id` | Update deployment |
| `DELETE` | `/api/gecirap/cloud/deployments/:id` | Delete deployment |

**Deployment Statuses:** `PENDING`, `IN_PROGRESS`, `COMPLETED`, `FAILED`, `ROLLED_BACK`, `CANCELLED`

---

## Module 2 — Multi-Region & Geo-Distribution (10 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/regions/geo` | List geo-regions |
| `GET` | `/api/gecirap/regions/geo/:id` | Get geo-region by ID |
| `POST` | `/api/gecirap/regions/geo` | Create geo-region |
| `PUT` | `/api/gecirap/regions/geo/:id` | Update geo-region |
| `DELETE` | `/api/gecirap/regions/geo/:id` | Delete geo-region |
| `GET` | `/api/gecirap/regions/policies` | List region policies |
| `GET` | `/api/gecirap/regions/policies/:id` | Get policy by ID |
| `POST` | `/api/gecirap/regions/policies` | Create region policy |
| `PUT` | `/api/gecirap/regions/policies/:id` | Update region policy |
| `DELETE` | `/api/gecirap/regions/policies/:id` | Delete region policy |
| `GET` | `/api/gecirap/regions/health` | Get region health metrics |
| `GET` | `/api/gecirap/regions/failover` | List failover policies |
| `POST` | `/api/gecirap/regions/failover` | Create failover policy |
| `GET` | `/api/gecirap/regions/traffic` | List traffic routes |
| `POST` | `/api/gecirap/regions/traffic` | Create traffic route |

**Region Topologies:** `ACTIVE_ACTIVE`, `ACTIVE_PASSIVE`, `SPINE_LEAF`, `STAR`, `MESH`, `HUB_SPOKE`

**Failover Modes:** `AUTOMATIC`, `MANUAL`, `SEMI_AUTOMATIC`

**Geo Routing Strategies:** `ROUND_ROBIN`, `LATENCY_BASED`, `GEOGRAPHIC`, `WEIGHTED`, `FAILOVER`, `LEAST_CONNECTIONS`

**Replication Modes:** `SYNCHRONOUS`, `ASYNCHRONOUS`, `SEMI_SYNC`

#### Create Geo-Region — Request Body

```json
{
  "name": "West Africa - Abidjan",
  "provider": "AWS",
  "location": "Abidjan, Côte d'Ivoire",
  "lat": 5.3600,
  "lng": -4.0083,
  "topology": "ACTIVE_PASSIVE",
  "capacity": 5000
}
```

#### Create Region Policy — Request Body

```json
{
  "name": "Primary-Secondary Policy",
  "primaryRegionId": "uuid-region-1",
  "secondaryRegionIds": ["uuid-region-2"],
  "failoverMode": "AUTOMATIC",
  "replicationMode": "ASYNCHRONOUS",
  "rto": 3600,
  "rpo": 900,
  "enabled": true
}
```

---

## Module 3 — Container & Workload Orchestration (8 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/containers/clusters` | List clusters |
| `GET` | `/api/gecirap/containers/clusters/:id` | Get cluster by ID |
| `POST` | `/api/gecirap/containers/clusters` | Create cluster |
| `PUT` | `/api/gecirap/containers/clusters/:id` | Update cluster |
| `DELETE` | `/api/gecirap/containers/clusters/:id` | Delete cluster |
| `GET` | `/api/gecirap/containers/workloads` | List workloads |
| `GET` | `/api/gecirap/containers/workloads/:id` | Get workload by ID |
| `POST` | `/api/gecirap/containers/workloads` | Create workload |
| `PUT` | `/api/gecirap/containers/workloads/:id` | Update workload |
| `DELETE` | `/api/gecirap/containers/workloads/:id` | Delete workload |
| `GET` | `/api/gecirap/containers/services` | List services |
| `GET` | `/api/gecirap/containers/services/:id` | Get service by ID |
| `POST` | `/api/gecirap/containers/services` | Create service |
| `PUT` | `/api/gecirap/containers/services/:id` | Update service |
| `DELETE` | `/api/gecirap/containers/services/:id` | Delete service |

**Cluster Statuses:** `PROVISIONING`, `RUNNING`, `SCALING`, `UPDATING`, `DEGRADED`, `TERMINATED`, `ERROR`

**Workload Types:** `DEPLOYMENT`, `STATEFULSET`, `DAEMONSET`, `JOB`, `CRONJOB`, `REPLICASET`

**Deployment Strategies:** `ROLLING_UPDATE`, `RECREATE`, `BLUE_GREEN`, `CANARY`

**Container Statuses:** `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`, `CRASH_LOOP`, `TERMINATED`

#### Create Cluster — Request Body

```json
{
  "name": "prod-cluster-west",
  "provider": "AWS",
  "region": "us-west-2",
  "nodeCount": 3,
  "capacity": { "cpu": 12, "memory": 48 },
  "config": { "kubernetesVersion": "1.28" }
}
```

#### Create Workload — Request Body

```json
{
  "namespaceId": "uuid-namespace",
  "name": "api-gateway",
  "type": "DEPLOYMENT",
  "replicas": 3,
  "strategy": "ROLLING_UPDATE",
  "containers": ["api-gateway:latest"]
}
```

---

## Module 4 — Infrastructure as Code (7 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/iac/templates` | List IaC templates |
| `GET` | `/api/gecirap/iac/templates/:id` | Get template by ID |
| `POST` | `/api/gecirap/iac/templates` | Create IaC template |
| `PUT` | `/api/gecirap/iac/templates/:id` | Update IaC template |
| `DELETE` | `/api/gecirap/iac/templates/:id` | Delete IaC template |
| `GET` | `/api/gecirap/iac/stacks` | List stacks |
| `GET` | `/api/gecirap/iac/stacks/:id` | Get stack by ID |
| `POST` | `/api/gecirap/iac/stacks` | Create stack |
| `PUT` | `/api/gecirap/iac/stacks/:id` | Update stack |
| `DELETE` | `/api/gecirap/iac/stacks/:id` | Delete stack |
| `GET` | `/api/gecirap/iac/provisioning` | List provisioning jobs |
| `GET` | `/api/gecirap/iac/provisioning/:id` | Get provisioning job by ID |
| `POST` | `/api/gecirap/iac/provisioning` | Create provisioning job |
| `GET` | `/api/gecirap/iac/drift` | List drift detections |

**IaC Providers:** `TERRAFORM`, `PULUMI`, `CLOUDFORMATION`, `BICEP`, `CDK`, `CROSSPLANE`

**Stack Statuses:** `PENDING`, `PLANNING`, `APPLYING`, `APPLIED`, `DESTROYING`, `DRIFTED`, `FAILED`, `LOCKED`

**Change Types:** `CREATE`, `UPDATE`, `DELETE`, `REPLACE`, `NO_CHANGE`

**Drift Statuses:** `IN_SYNC`, `DRIFTED`, `UNKNOWN`

**Approval Statuses:** `PENDING`, `APPROVED`, `REJECTED`, `EXPIRED`

#### Create Template — Request Body

```json
{
  "name": "VPC Module",
  "provider": "TERRAFORM",
  "content": "resource \"aws_vpc\" \"main\" { cidr_block = var.cidr }",
  "version": "1.0.0",
  "variables": { "cidr": "10.0.0.0/16" }
}
```

#### Create Stack — Request Body

```json
{
  "templateId": "uuid-template",
  "name": "prod-vpc",
  "environment": "PRODUCTION",
  "variables": { "cidr": "10.0.0.0/16" }
}
```

---

## Module 5 — Autoscaling & Capacity Intelligence (6 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/scaling/policies` | List scaling policies |
| `GET` | `/api/gecirap/scaling/policies/:id` | Get policy by ID |
| `POST` | `/api/gecirap/scaling/policies` | Create scaling policy |
| `PUT` | `/api/gecirap/scaling/policies/:id` | Update scaling policy |
| `DELETE` | `/api/gecirap/scaling/policies/:id` | Delete scaling policy |
| `GET` | `/api/gecirap/scaling/events` | List scaling events |
| `POST` | `/api/gecirap/scaling/events` | Create scaling event |
| `GET` | `/api/gecirap/scaling/capacity` | Get capacity utilization |
| `GET` | `/api/gecirap/scaling/capacity/forecasts` | List capacity forecasts |
| `POST` | `/api/gecirap/scaling/capacity/forecasts` | Create capacity forecast |
| `GET` | `/api/gecirap/scaling/capacity/plans` | List capacity plans |
| `POST` | `/api/gecirap/scaling/capacity/plans` | Create capacity plan |

**Scaling Triggers:** `CPU`, `MEMORY`, `NETWORK`, `CUSTOM_METRIC`, `SCHEDULE`, `QUEUE_DEPTH`, `PREDICTIVE`

**Scaling Directions:** `UP`, `DOWN`, `OUT`, `IN`

**Forecast Models:** `LINEAR`, `POLYNOMIAL`, `ARIMA`, `LSTM`, `PROPHET`

**Capacity Statuses:** `NORMAL`, `HIGH`, `CRITICAL`, `OVER_PROVISIONED`

#### Create Scaling Policy — Request Body

```json
{
  "name": "CPU Auto-Scaler",
  "resourceType": "VM",
  "resourceId": "uuid-resource",
  "trigger": "CPU",
  "minSize": 2,
  "maxSize": 10,
  "cooldown": 300,
  "conditions": [
    { "metric": "cpu_percent", "operator": "GREATER_THAN", "threshold": 70 }
  ],
  "enabled": true
}
```

---

## Module 6 — Disaster Recovery 2.0 (6 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/disaster-recovery/plans` | List DR plans |
| `GET` | `/api/gecirap/disaster-recovery/plans/:id` | Get DR plan by ID |
| `POST` | `/api/gecirap/disaster-recovery/plans` | Create DR plan |
| `PUT` | `/api/gecirap/disaster-recovery/plans/:id` | Update DR plan |
| `DELETE` | `/api/gecirap/disaster-recovery/plans/:id` | Delete DR plan |
| `GET` | `/api/gecirap/disaster-recovery/executions` | List recovery executions |
| `GET` | `/api/gecirap/disaster-recovery/executions/:id` | Get execution by ID |
| `POST` | `/api/gecirap/disaster-recovery/executions` | Start recovery execution |
| `GET` | `/api/gecirap/disaster-recovery/tests` | List DR tests |
| `POST` | `/api/gecirap/disaster-recovery/tests` | Create DR test |

**Recovery Statuses:** `READY`, `IN_PROGRESS`, `COMPLETED`, `FAILED`, `PARTIAL`

**Recovery Types:** `BACKUP_RESTORE`, `SNAPSHOT`, `REPLICATION`, `PILOT_LIGHT`, `WARM_STANDBY`, `MULTI_SITE`

**Test Statuses:** `SCHEDULED`, `RUNNING`, `PASSED`, `FAILED`, `CANCELLED`

**Dependency Types:** `DATABASE`, `STORAGE`, `NETWORK`, `SERVICE`, `CONFIG`, `CREDENTIAL`

#### Create DR Plan — Request Body

```json
{
  "name": "Critical Systems Recovery",
  "description": "Recovery plan for student information system and LMS",
  "strategies": ["uuid-strategy-1"],
  "rtoObjective": 3600,
  "rpoObjective": 900
}
```

---

## Module 7 — Multi-Cloud Orchestration (5 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/multi-cloud/placement` | List placement decisions |
| `POST` | `/api/gecirap/multi-cloud/placement` | Create placement decision |
| `GET` | `/api/gecirap/multi-cloud/migrations` | List cloud migrations |
| `GET` | `/api/gecirap/multi-cloud/migrations/:id` | Get migration by ID |
| `POST` | `/api/gecirap/multi-cloud/migrations` | Create cloud migration |
| `PUT` | `/api/gecirap/multi-cloud/migrations/:id` | Update migration |
| `GET` | `/api/gecirap/multi-cloud/balances` | List cloud balances |
| `POST` | `/api/gecirap/multi-cloud/balances` | Create cloud balance |

**Placement Criteria:** `COST`, `LATENCY`, `COMPLIANCE`, `CAPACITY`, `AVAILABILITY`, `DATA_RESIDENCY`

**Migration Statuses:** `PLANNING`, `IN_PROGRESS`, `PAUSED`, `COMPLETED`, `FAILED`, `ROLLED_BACK`

**Balance Statuses:** `BALANCED`, `UNBALANCED`, `OPTIMIZING`

#### Create Placement Decision — Request Body

```json
{
  "workloadId": "uuid-workload",
  "selectedCloud": "AWS",
  "selectedRegion": "us-east-1",
  "score": 92,
  "criteria": { "cost": 85, "latency": 95, "compliance": 100 },
  "alternatives": [
    { "cloud": "GCP", "region": "us-central1", "score": 87 },
    { "cloud": "AZURE", "region": "eastus", "score": 82 }
  ]
}
```

---

## Module 8 — Edge Computing & Offline Education (7 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/edge/nodes` | List edge nodes |
| `GET` | `/api/gecirap/edge/nodes/:id` | Get edge node by ID |
| `POST` | `/api/gecirap/edge/nodes` | Create edge node |
| `PUT` | `/api/gecirap/edge/nodes/:id` | Update edge node |
| `DELETE` | `/api/gecirap/edge/nodes/:id` | Delete edge node |
| `GET` | `/api/gecirap/edge/clusters` | List edge clusters |
| `POST` | `/api/gecirap/edge/clusters` | Create edge cluster |
| `GET` | `/api/gecirap/edge/deployments` | List edge deployments |
| `POST` | `/api/gecirap/edge/deployments` | Create edge deployment |
| `GET` | `/api/gecirap/edge/sync` | List sync jobs |
| `POST` | `/api/gecirap/edge/sync` | Create sync job |
| `GET` | `/api/gecirap/edge/offline-packages` | List offline packages |
| `POST` | `/api/gecirap/edge/offline-packages` | Create offline package |

**Edge Node Types:** `GATEWAY`, `SERVER`, `RASPBERRY`, `MICRO_DC`, `IOT_HUB`

**Edge Statuses:** `ONLINE`, `OFFLINE`, `DEGRADED`, `MAINTENANCE`

**Sync Statuses:** `SYNCED`, `SYNCING`, `CONFLICT`, `PENDING`, `FAILED`

**Offline Capabilities:** `FULL`, `PARTIAL`, `NONE`

#### Create Edge Node — Request Body

```json
{
  "name": "Rural School Gateway",
  "type": "GATEWAY",
  "location": "Bamako, Mali",
  "capacity": { "cpu": 4, "memory": 8, "storage": 256 }
}
```

---

## Module 9 — Network & CDN Intelligence (8 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/network/networks` | List networks |
| `GET` | `/api/gecirap/network/networks/:id` | Get network by ID |
| `POST` | `/api/gecirap/network/networks` | Create network |
| `PUT` | `/api/gecirap/network/networks/:id` | Update network |
| `DELETE` | `/api/gecirap/network/networks/:id` | Delete network |
| `GET` | `/api/gecirap/network/load-balancers` | List load balancers |
| `POST` | `/api/gecirap/network/load-balancers` | Create load balancer |
| `GET` | `/api/gecirap/network/cdn` | List CDN distributions |
| `POST` | `/api/gecirap/network/cdn` | Create CDN distribution |
| `GET` | `/api/gecirap/network/dns` | List DNS records |
| `POST` | `/api/gecirap/network/dns` | Create DNS record |
| `GET` | `/api/gecirap/network/health` | Get network health |
| `GET` | `/api/gecirap/network/metrics` | Get traffic metrics |

**Network Types:** `VPC`, `SUBNET`, `VPN`, `PEERING`, `DIRECT_CONNECT`

**LB Algorithms:** `ROUND_ROBIN`, `LEAST_CONNECTIONS`, `IP_HASH`, `LEAST_RESPONSE_TIME`, `WEIGHTED`

**CDN Statuses:** `ACTIVE`, `PURGING`, `INVALIDATING`, `ERROR`

#### Create Load Balancer — Request Body

```json
{
  "name": "api-lb",
  "algorithm": "LEAST_CONNECTIONS",
  "backends": [
    { "address": "10.0.1.10", "port": 8080, "weight": 100 },
    { "address": "10.0.1.11", "port": 8080, "weight": 100 }
  ],
  "healthCheck": { "path": "/health", "interval": 10, "timeout": 5 }
}
```

---

## Module 10 — AIOps & Autonomous Operations (7 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/aiops/agents` | List AIOps agents |
| `GET` | `/api/gecirap/aiops/agents/:id` | Get agent by ID |
| `POST` | `/api/gecirap/aiops/agents` | Create AIOps agent |
| `PUT` | `/api/gecirap/aiops/agents/:id` | Update agent |
| `DELETE` | `/api/gecirap/aiops/agents/:id` | Delete agent |
| `GET` | `/api/gecirap/aiops/events` | List infrastructure events |
| `POST` | `/api/gecirap/aiops/events` | Create infrastructure event |
| `GET` | `/api/gecirap/aiops/correlations` | List incident correlations |
| `POST` | `/api/gecirap/aiops/correlations` | Create correlation |
| `GET` | `/api/gecirap/aiops/recommendations` | List recommendations |
| `POST` | `/api/gecirap/aiops/recommendations` | Create recommendation |
| `GET` | `/api/gecirap/aiops/remediation` | List remediation plans |
| `POST` | `/api/gecirap/aiops/remediation` | Create remediation plan |
| `GET` | `/api/gecirap/aiops/remediation/:id` | Get remediation plan by ID |
| `PUT` | `/api/gecirap/aiops/remediation/:id` | Update remediation plan |

**Agent Types:** `MONITORING`, `ANOMALY`, `CORRELATION`, `ROOT_CAUSE`, `REMEDIATION`, `PREDICTIVE`

**Incident Statuses:** `OPEN`, `INVESTIGATING`, `IDENTIFIED`, `MONITORING`, `RESOLVED`, `CLOSED`

**Diagnosis Types:** `PERFORMANCE`, `AVAILABILITY`, `SECURITY`, `COST`, `COMPLIANCE`

**Action Risk Levels:** `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`

**Remediation Statuses:** `PENDING`, `APPROVED`, `EXECUTING`, `COMPLETED`, `FAILED`, `ROLLED_BACK`

#### Create AIOps Agent — Request Body

```json
{
  "type": "ANOMALY",
  "name": "CPU Anomaly Detector",
  "capabilities": ["metric_analysis", "threshold_detection"],
  "config": { "sensitivity": "high", "windowMinutes": 5 }
}
```

---

## Module 11 — FinOps & Cloud Economic Intelligence (6 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/finops/costs` | List cost records |
| `POST` | `/api/gecirap/finops/costs` | Create cost record |
| `GET` | `/api/gecirap/finops/costs/anomalies` | List cost anomalies |
| `POST` | `/api/gecirap/finops/costs/anomalies` | Create cost anomaly |
| `GET` | `/api/gecirap/finops/budgets` | List budgets |
| `GET` | `/api/gecirap/finops/budgets/:id` | Get budget by ID |
| `POST` | `/api/gecirap/finops/budgets` | Create budget |
| `PUT` | `/api/gecirap/finops/budgets/:id` | Update budget |
| `GET` | `/api/gecirap/finops/forecasts` | List cost forecasts |
| `POST` | `/api/gecirap/finops/forecasts` | Create cost forecast |
| `GET` | `/api/gecirap/finops/optimization` | List optimization recommendations |

**Cost Periods:** `HOURLY`, `DAILY`, `WEEKLY`, `MONTHLY`, `QUARTERLY`, `YEARLY`

**Budget Statuses:** `ON_TRACK`, `AT_RISK`, `EXCEEDED`, `FORECAST_EXCEED`

**Anomaly Types:** `COST_SPIKE`, `COST_DROP`, `USAGE_SPIKE`, `USAGE_DROP`, `NEW_SERVICE`, `UNUSUAL_PATTERN`

**Optimization Types:** `RIGHTSIZING`, `RESERVED_CAPACITY`, `SPOT_INSTANCES`, `STORAGE_TIERING`, `NETWORK_OPTIMIZATION`, `IDLE_RESOURCE`

#### Create Budget — Request Body

```json
{
  "name": "Monthly Cloud Budget",
  "amount": 5000,
  "period": "MONTHLY",
  "alertThreshold": 80,
  "status": "ON_TRACK"
}
```

---

## Module 12 — Infrastructure Digital Twin (6 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/digital-twin/twins` | List digital twins |
| `GET` | `/api/gecirap/digital-twin/twins/:id` | Get twin by ID |
| `POST` | `/api/gecirap/digital-twin/twins` | Create digital twin |
| `PUT` | `/api/gecirap/digital-twin/twins/:id` | Update twin |
| `DELETE` | `/api/gecirap/digital-twin/twins/:id` | Delete twin |
| `GET` | `/api/gecirap/digital-twin/simulations` | List simulations |
| `GET` | `/api/gecirap/digital-twin/simulations/:id` | Get simulation by ID |
| `POST` | `/api/gecirap/digital-twin/simulations` | Create simulation |
| `PUT` | `/api/gecirap/digital-twin/simulations/:id` | Update simulation |
| `GET` | `/api/gecirap/digital-twin/scenarios` | List scenarios |
| `POST` | `/api/gecirap/digital-twin/scenarios` | Create scenario |

**Twin Types:** `INFRASTRUCTURE`, `NETWORK`, `APPLICATION`, `DATA_FLOW`, `SECURITY`, `FULL_STACK`

**Twin Statuses:** `SYNCED`, `SYNCING`, `STALE`, `ERROR`, `CREATING`

**Simulation Types:** `CAPACITY`, `FAILURE`, `SCALING`, `MIGRATION`, `COST`, `PERFORMANCE`

**Scenario Statuses:** `DRAFT`, `VALIDATED`, `RUNNING`, `COMPLETED`, `FAILED`

#### Create Digital Twin — Request Body

```json
{
  "name": "Production Environment Twin",
  "type": "FULL_STACK",
  "config": { "syncSource": "cloud_providers" },
  "state": {}
}
```

---

## Dashboard Endpoints (2 endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gecirap/dashboard/overview` | Get aggregated dashboard overview |
| `GET` | `/api/gecirap/dashboard/health` | Get infrastructure health summary |

#### Dashboard Overview — Response

```json
{
  "data": {
    "providers": { "total": 3, "active": 3 },
    "resources": {
      "total": 45,
      "running": 42,
      "stopped": 3,
      "byType": { "VM": 20, "DATABASE": 5, "STORAGE": 10, "NETWORK": 10 }
    },
    "deployments": { "total": 12, "completed": 10, "inProgress": 1, "failed": 1 },
    "clusters": { "total": 2, "active": 2 },
    "edge": { "total": 15, "online": 14, "offline": 1 },
    "networks": { "total": 8, "active": 8 }
  }
}
```

---

## Rate Limiting

- **Default:** 1,000 requests per minute per user
- **Dashboard endpoints:** 100 requests per minute per user
- Rate limit responses return HTTP 429:

```json
{
  "error": "Limite de requêtes atteinte"
}
```

---

## Filtering

List endpoints support filtering via query parameters:

```
GET /api/gecirap/cloud/resources?type=VM&status=RUNNING
GET /api/gecirap/scaling/events?direction=UP
```

Filter keys are validated — empty or undefined values are ignored.

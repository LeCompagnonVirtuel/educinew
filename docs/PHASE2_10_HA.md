# Phase 2.10 - High Availability

## Overview

The High Availability module provides enterprise-grade resilience and fault tolerance for the EduCI ecosystem. It implements cluster management, failover mechanisms, load balancing, circuit breakers, retry policies, health monitoring, capacity planning, and disaster recovery. This module ensures 99.99% uptime through redundant infrastructure and automated failover.

```
┌─────────────────────────────────────────────────────────┐
│                HIGH AVAILABILITY                         │
├─────────────────────────────────────────────────────────┤
│  Cluster Mgmt → Failover → Load Balancing               │
│  Circuit Breakers → Retry Policies → Health Monitoring  │
│  Capacity Planning → Disaster Recovery → SLA Tracking   │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (10):**
- `ClusterRepository` - Cluster CRUD + findByName, findByStatus
- `ClusterNodeRepository` - Node CRUD + findByCluster, findByStatus
- `FailoverRuleRepository` - Failover rule CRUD + findByCluster, findActive
- `LoadBalancerConfigRepository` - Load balancer CRUD + findByService, findActive
- `CircuitBreakerRepository` - Circuit breaker CRUD + findByService, findOpen
- `RetryPolicyRepository` - Retry policy CRUD + findByService, findActive
- `CapacityPlanRepository` - Capacity plan CRUD + findByCluster, findByPeriod
- `HealthCheckConfigRepository` - Health check CRUD + findByService, findActive
- `DisasterRecoveryPlanRepository` - DR plan CRUD + findByCluster, findActive
- `SLATrackerRepository` - SLA CRUD + findByService, findBreached

**Entity Types (40):**
- `Cluster`, `ClusterCreate`, `ClusterUpdate`, `ClusterQuery`
- `ClusterNode`, `ClusterNodeCreate`, `ClusterNodeUpdate`, `ClusterNodeQuery`
- `FailoverRule`, `FailoverRuleCreate`, `FailoverRuleUpdate`, `FailoverRuleQuery`
- `LoadBalancerConfig`, `LoadBalancerConfigCreate`, `LoadBalancerConfigUpdate`, `LoadBalancerConfigQuery`
- `CircuitBreaker`, `CircuitBreakerCreate`, `CircuitBreakerUpdate`, `CircuitBreakerQuery`
- `RetryPolicy`, `RetryPolicyCreate`, `RetryPolicyUpdate`, `RetryPolicyQuery`
- `CapacityPlan`, `CapacityPlanCreate`, `CapacityPlanUpdate`, `CapacityPlanQuery`
- `HealthCheckConfig`, `HealthCheckConfigCreate`, `HealthCheckConfigUpdate`, `HealthCheckConfigQuery`
- `DisasterRecoveryPlan`, `DisasterRecoveryPlanCreate`, `DisasterRecoveryPlanUpdate`, `DisasterRecoveryPlanQuery`
- `SLATracker`, `SLATrackerCreate`, `SLATrackerUpdate`, `SLATrackerQuery`

### Validators

**File: `ep-ha-data-devops.ts` (1,100 lines)**

| Schema | Purpose |
|--------|---------|
| `clusterCreateSchema` | Validates cluster creation (name, nodes, config) |
| `clusterNodeCreateSchema` | Validates node creation (host, port, role) |
| `failoverRuleCreateSchema` | Validates failover rule creation (trigger, action) |
| `loadBalancerConfigCreateSchema` | Validates load balancer creation (algorithm, backends) |
| `circuitBreakerCreateSchema` | Validates circuit breaker creation (threshold, timeout) |
| `retryPolicyCreateSchema` | Validates retry policy creation (attempts, backoff) |
| `capacityPlanCreateSchema` | Validates capacity plan creation (cluster, forecast) |
| `healthCheckConfigCreateSchema` | Validates health check creation (interval, timeout) |
| `disasterRecoveryPlanCreateSchema` | Validates DR plan creation (strategy, rpo, rto) |
| `slaTrackerCreateSchema` | Validates SLA tracker creation (target, metrics) |

### Errors

| Error Code | Description |
|------------|-------------|
| `CLUSTER_NOT_FOUND` | Cluster not found |
| `CLUSTER_UNAVAILABLE` | Cluster unavailable |
| `NODE_NOT_FOUND` | Cluster node not found |
| `NODE_UNHEALTHY` | Cluster node unhealthy |
| `FAILOVER_FAILED` | Failover operation failed |
| `LOAD_BALANCER_UNAVAILABLE` | Load balancer unavailable |
| `CIRCUIT_BREAKER_OPEN` | Circuit breaker is open |
| `RETRY_EXHAUSTED` | Retry attempts exhausted |
| `CAPACITY_EXCEEDED` | Capacity plan exceeded |
| `HEALTH_CHECK_FAILED` | Health check failed |
| `DR_PLAN_INVALID` | Disaster recovery plan invalid |
| `SLA_BREACHED` | SLA target breached |

### Repository

```typescript
// 10 repository interfaces for high availability
interface ClusterRepository {
  create(data: ClusterCreate): Promise<Cluster>;
  findById(id: string): Promise<Cluster | null>;
  findByName(name: string): Promise<Cluster | null>;
  findByStatus(status: string): Promise<Cluster[]>;
  update(id: string, data: ClusterUpdate): Promise<Cluster>;
  delete(id: string): Promise<void>;
  list(query: ClusterQuery): Promise<Cluster[]>;
  findHealthy(): Promise<Cluster[]>;
  getClusterStats(id: string): Promise<ClusterStats>;
}

interface ClusterNodeRepository {
  create(data: ClusterNodeCreate): Promise<ClusterNode>;
  findById(id: string): Promise<ClusterNode | null>;
  findByCluster(clusterId: string): Promise<ClusterNode[]>;
  findByStatus(status: string): Promise<ClusterNode[]>;
  update(id: string, data: ClusterNodeUpdate): Promise<ClusterNode>;
  delete(id: string): Promise<void>;
  list(query: ClusterNodeQuery): Promise<ClusterNode[]>;
  findHealthyByCluster(clusterId: string): Promise<ClusterNode[]>;
}
```

### Services

| Service | Responsibilities |
|---------|-----------------|
| `ClusterService` | Cluster lifecycle management |
| `ClusterNodeService` | Node management and health |
| `FailoverRuleService` | Failover rule definition and execution |
| `LoadBalancerConfigService` | Load balancer configuration |
| `CircuitBreakerService` | Circuit breaker management |
| `RetryPolicyService` | Retry policy configuration |
| `CapacityPlanService` | Capacity planning and forecasting |
| `HealthCheckConfigService` | Health check configuration |
| `DisasterRecoveryPlanService` | DR plan management |
| `SLATrackerService` | SLA tracking and alerting |

### Hooks

| Hook | Purpose |
|------|---------|
| `useClusters` | Cluster management |
| `useClusterNodes` | Node management |
| `useFailoverRules` | Failover rule management |
| `useLoadBalancerConfigs` | Load balancer configuration |
| `useCircuitBreakers` | Circuit breaker management |
| `useRetryPolicies` | Retry policy management |
| `useCapacityPlans` | Capacity planning |
| `useHealthCheckConfigs` | Health check configuration |
| `useDisasterRecoveryPlans` | DR plan management |
| `useSLATrackers` | SLA tracking |

### API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enterprise/ha/clusters` | List clusters |
| POST | `/api/enterprise/ha/clusters` | Create cluster |
| GET | `/api/enterprise/ha/clusters/[id]` | Get cluster |
| PUT | `/api/enterprise/ha/clusters/[id]` | Update cluster |
| GET | `/api/enterprise/ha/clusters/[id]/nodes` | List nodes |
| POST | `/api/enterprise/ha/clusters/[id]/nodes` | Add node |
| GET | `/api/enterprise/ha/clusters/[id]/stats` | Get cluster stats |
| GET | `/api/enterprise/ha/nodes` | List all nodes |
| GET | `/api/enterprise/ha/nodes/[id]` | Get node |
| PUT | `/api/enterprise/ha/nodes/[id]` | Update node |
| GET | `/api/enterprise/ha/failover-rules` | List failover rules |
| POST | `/api/enterprise/ha/failover-rules` | Create failover rule |
| GET | `/api/enterprise/ha/load-balancers` | List load balancers |
| POST | `/api/enterprise/ha/load-balancers` | Create load balancer |
| GET | `/api/enterprise/ha/circuit-breakers` | List circuit breakers |
| POST | `/api/enterprise/ha/circuit-breakers` | Create circuit breaker |
| PUT | `/api/enterprise/ha/circuit-breakers/[id]/reset` | Reset breaker |
| GET | `/api/enterprise/ha/retry-policies` | List retry policies |
| POST | `/api/enterprise/ha/retry-policies` | Create retry policy |
| GET | `/api/enterprise/ha/capacity-plans` | List capacity plans |
| POST | `/api/enterprise/ha/capacity-plans` | Create capacity plan |
| GET | `/api/enterprise/ha/health-checks` | List health checks |
| POST | `/api/enterprise/ha/health-checks` | Create health check |
| GET | `/api/enterprise/ha/dr-plans` | List DR plans |
| POST | `/api/enterprise/ha/dr-plans` | Create DR plan |
| GET | `/api/enterprise/ha/sla-trackers` | List SLA trackers |
| POST | `/api/enterprise/ha/sla-trackers` | Create SLA tracker |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `HADashboardScreen` | HA overview and status |
| `ClusterListScreen` | Cluster listing |
| `ClusterDetailScreen` | Cluster details and nodes |
| `FailoverScreen` | Failover management |
| `LoadBalancerScreen` | Load balancer config |
| `CircuitBreakerScreen` | Circuit breaker status |
| `CapacityPlanScreen` | Capacity planning |
| `SLATrackerScreen` | SLA monitoring |

## Configuration

```typescript
export const HA_CONFIG = {
  limits: {
    maxClusters: 20,
    maxNodesPerCluster: 20,
    maxFailoverRules: 100,
    maxLoadBalancers: 50,
    maxCircuitBreakers: 200,
    maxDRPlans: 20,
  },
  cluster: {
    healthCheckIntervalMs: 10000,
    nodeTimeoutMs: 30000,
    autoFailoverEnabled: true,
    minNodesForQuorum: 2,
  },
  failover: {
    detectionTimeoutMs: 10000,
    failoverTimeoutMs: 60000,
    maxFailoversPerHour: 10,
    cooldownMs: 300000,
  },
  circuitBreaker: {
    failureThreshold: 5,
    recoveryTimeoutMs: 30000,
    halfOpenMaxAttempts: 3,
    monitoringWindowMs: 60000,
  },
  capacity: {
    forecastDays: 30,
    alertThreshold: 0.8,
    autoScaleEnabled: true,
    scaleUpThreshold: 0.7,
    scaleDownThreshold: 0.3,
  },
  sla: {
    defaultTarget: 99.9,
    alertThreshold: 0.99,
    evaluationWindowMs: 86400000,
  },
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `ha_admin` | Full HA management |
| `ha_operator` | Cluster and node management |
| `ha_viewer` | Read-only HA data |
| `sre_engineer` | Failover and DR operations |
| `platform_admin` | Cross-cluster operations |

## Multi-Tenancy

- Clusters shared across tenants with isolation
- Node allocation per tenant tier
- Failover rules per tenant service
- Load balancers per tenant endpoint
- Capacity plans per tenant cluster
- SLA tracking per tenant service

## Offline Support

- Cluster status cached locally
- Node health cached for offline viewing
- Failover rules cached for offline evaluation
- Capacity data buffered for batch upload
- SLA metrics calculated on cached data

## API Reference

### Clusters
- GET /api/enterprise/ha/clusters
- POST /api/enterprise/ha/clusters
- GET /api/enterprise/ha/clusters/[id]
- PUT /api/enterprise/ha/clusters/[id]
- GET /api/enterprise/ha/clusters/[id]/stats

### Nodes
- GET /api/enterprise/ha/clusters/[id]/nodes
- POST /api/enterprise/ha/clusters/[id]/nodes
- GET /api/enterprise/ha/nodes
- GET /api/enterprise/ha/nodes/[id]
- PUT /api/enterprise/ha/nodes/[id]

### Failover Rules
- GET /api/enterprise/ha/failover-rules
- POST /api/enterprise/ha/failover-rules
- GET /api/enterprise/ha/failover-rules/[id]
- PUT /api/enterprise/ha/failover-rules/[id]

### Load Balancers
- GET /api/enterprise/ha/load-balancers
- POST /api/enterprise/ha/load-balancers
- GET /api/enterprise/ha/load-balancers/[id]
- PUT /api/enterprise/ha/load-balancers/[id]

### Circuit Breakers
- GET /api/enterprise/ha/circuit-breakers
- POST /api/enterprise/ha/circuit-breakers
- GET /api/enterprise/ha/circuit-breakers/[id]
- PUT /api/enterprise/ha/circuit-breakers/[id]
- PUT /api/enterprise/ha/circuit-breakers/[id]/reset

### Retry Policies
- GET /api/enterprise/ha/retry-policies
- POST /api/enterprise/ha/retry-policies
- GET /api/enterprise/ha/retry-policies/[id]
- PUT /api/enterprise/ha/retry-policies/[id]

### Capacity Plans
- GET /api/enterprise/ha/capacity-plans
- POST /api/enterprise/ha/capacity-plans
- GET /api/enterprise/ha/capacity-plans/[id]
- PUT /api/enterprise/ha/capacity-plans/[id]

### Health Checks
- GET /api/enterprise/ha/health-checks
- POST /api/enterprise/ha/health-checks
- GET /api/enterprise/ha/health-checks/[id]
- PUT /api/enterprise/ha/health-checks/[id]

### DR Plans
- GET /api/enterprise/ha/dr-plans
- POST /api/enterprise/ha/dr-plans
- GET /api/enterprise/ha/dr-plans/[id]
- PUT /api/enterprise/ha/dr-plans/[id]

### SLA Trackers
- GET /api/enterprise/ha/sla-trackers
- POST /api/enterprise/ha/sla-trackers
- GET /api/enterprise/ha/sla-trackers/[id]
- PUT /api/enterprise/ha/sla-trackers/[id]

## Testing

| Test Category | Coverage |
|---------------|----------|
| Unit Tests | All services and validators |
| Integration Tests | Cluster failover scenarios |
| E2E Tests | Full HA workflows |
| Load Tests | Failover under load |
| DR Tests | Disaster recovery drills |

## Security

- Cluster communication encrypted via mTLS
- Node authentication via certificates
- Failover operations logged to audit
- DR plan access controlled by role
- Capacity data encrypted at rest
- SLA data access restricted
- Health check endpoints secured

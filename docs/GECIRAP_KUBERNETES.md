# GECIRAP — Container & Workload Orchestration

## Kubernetes-Native Container Management

---

## 1. Vision

GECIRAP Containers provides enterprise-grade container orchestration management, enabling educational institutions to deploy, scale, and manage containerized applications across Kubernetes clusters with full observability and control.

---

## 2. Supported Orchestrators

| Orchestrator | Status | Default |
|-------------|--------|---------|
| Kubernetes | Supported | Yes |
| Docker Swarm | Supported | No |
| Nomad | Supported | No |
| ECS | Supported | No |

---

## 3. Entity Hierarchy

```
Cluster (1) ──── (N) Node
Cluster (1) ──── (N) NodePool
Cluster (1) ──── (N) Namespace
Namespace (1) ──── (N) Workload
Namespace (1) ──── (N) Service
Namespace (1) ──── (N) Ingress
Workload (1) ──── (N) Container
```

---

## 4. Cluster Management

### Cluster Status

| Status | Description |
|--------|-------------|
| `PROVISIONING` | Cluster being created |
| `RUNNING` | Fully operational |
| `SCALING` | Node count changing |
| `UPDATING` | Configuration updating |
| `DEGRADED` | Partial failure |
| `TERMINATED` | Shut down |
| `ERROR` | Critical failure |

### Cluster Configuration

```json
{
  "name": "prod-cluster-west",
  "provider": "AWS",
  "region": "us-west-2",
  "nodeCount": 5,
  "capacity": { "cpu": 20, "memory": 80 },
  "config": {
    "kubernetesVersion": "1.28",
    "networkPlugin": "calico",
    "storageClass": "gp3"
  }
}
```

---

## 5. Node Management

### Node Resources

```typescript
interface GecirapNode {
  cpu: { total: number; used: number };    // CPU cores
  memory: { total: number; used: number }; // Memory in GB
  disk: { total: number; used: number };   // Disk in GB
  gpu: { total: number; used: number } | null; // GPU count
  labels: Record<string, string>;          // Node labels
}
```

### Node Pool

| Field | Description |
|-------|-------------|
| `minSize` | Minimum nodes in pool |
| `maxSize` | Maximum nodes in pool |
| `instanceType` | VM instance type |
| `status` | Pool health status |

---

## 6. Namespace Management

Namespaces provide logical isolation within a cluster:

```json
{
  "name": "production",
  "labels": { "env": "prod", "team": "platform" },
  "quotas": {
    "cpu": "10",
    "memory": "40Gi",
    "pods": "100"
  }
}
```

---

## 7. Workload Types

| Type | Description | Use Case |
|------|-------------|----------|
| `DEPLOYMENT` | Stateless applications | Web servers, APIs |
| `STATEFULSET` | Stateful applications | Databases, caches |
| `DAEMONSET` | One per node | Logging, monitoring |
| `JOB` | One-off tasks | Batch processing |
| `CRONJOB` | Scheduled tasks | Backups, reports |
| `REPLICASET` | Replica management | Managed by Deployments |

---

## 8. Deployment Strategies

| Strategy | Downtime | Rollback | Complexity |
|----------|----------|----------|------------|
| `ROLLING_UPDATE` | Zero | Automatic | Low |
| `RECREATE` | Yes | Automatic | Low |
| `BLUE_GREEN` | Near-zero | Instant switch | Medium |
| `CANARY` | Zero | Gradual | High |

### Rolling Update Parameters

```json
{
  "strategy": "ROLLING_UPDATE",
  "config": {
    "maxUnavailable": "25%",
    "maxSurge": "25%"
  }
}
```

---

## 9. Container Configuration

```typescript
interface GecirapContainer {
  name: string;
  image: string;         // Container image (e.g., "nginx:1.24")
  status: GecirapContainerStatus;
  resources: {
    cpu: string;         // e.g., "500m", "2"
    memory: string;      // e.g., "256Mi", "1Gi"
  };
  env: Record<string, string>;
}
```

### Container Statuses

| Status | Description |
|--------|-------------|
| `PENDING` | Waiting to start |
| `RUNNING` | Executing |
| `SUCCEEDED` | Completed successfully |
| `FAILED` | Exited with error |
| `CRASH_LOOP` | Repeatedly crashing |
| `TERMINATED` | Stopped |

---

## 10. Service Types

| Type | Description | Use Case |
|------|-------------|----------|
| `ClusterIP` | Internal only | Service-to-service |
| `NodePort` | Expose on node port | Development |
| `LoadBalancer` | External load balancer | Production |
| `ExternalName` | CNAME alias | External services |

### Service Ports

```json
{
  "ports": [
    { "name": "http", "port": 80, "targetPort": 8080, "protocol": "TCP" },
    { "name": "https", "port": 443, "targetPort": 8443, "protocol": "TCP" }
  ],
  "selector": { "app": "api-gateway" }
}
```

---

## 11. Ingress Configuration

```json
{
  "name": "api-ingress",
  "host": "api.educi.com",
  "paths": [
    {
      "path": "/v1",
      "pathType": "Prefix",
      "backend": { "service": "api-v1", "port": 80 }
    }
  ],
  "tls": [
    { "hosts": ["api.educi.com"], "secretName": "api-tls" }
  ]
}
```

---

## 12. Resource Limits

| Resource | Default | Maximum |
|----------|---------|---------|
| Clusters per school | 10 | 50 |
| Nodes per cluster | 1,000 | 5,000 |
| Workloads per namespace | 500 | 2,000 |
| Containers per workload | 10 | 20 |
| Services per namespace | 100 | 500 |
| Ingresses per namespace | 20 | 100 |

# GECIRAP — Edge Computing & Offline Education

## Distributed Infrastructure for Rural & Low-Connectivity Schools

---

## 1. Vision

GECIRAP Edge extends cloud capabilities to remote and low-connectivity educational environments, enabling offline-first learning with intelligent synchronization, local caching, and edge processing.

---

## 2. Edge Node Types

| Type | Description | Capacity | Use Case |
|------|-------------|----------|----------|
| `GATEWAY` | Network gateway | High | School network hub |
| `SERVER` | Dedicated server | High | Local compute |
| `RASPBERRY` | Raspberry Pi | Low | Single classroom |
| `MICRO_DC` | Micro data center | Medium | Multi-building campus |
| `IOT_HUB` | IoT device hub | Low | Sensor aggregation |

---

## 3. Entity Hierarchy

```
EdgeCluster (1) ──── (N) EdgeNode
EdgeNode (1) ──── (N) EdgeDeployment
EdgeNode (1) ──── (N) EdgeSyncJob
EdgeNode (1) ──── (N) EdgeCache
```

---

## 4. Edge Node Management

### Node Status

| Status | Description |
|--------|-------------|
| `ONLINE` | Connected and operational |
| `OFFLINE` | Not connected |
| `DEGRADED` | Partial functionality |
| `MAINTENANCE` | Under maintenance |

### Node Configuration

```json
{
  "name": "Rural School Gateway",
  "type": "GATEWAY",
  "location": "Bamako, Mali",
  "capacity": { "cpu": 4, "memory": 8, "storage": 256 },
  "syncStatus": "SYNCED",
  "lastSeenAt": "2026-01-15T10:30:00Z"
}
```

---

## 5. Edge Clusters

Edge clusters group nodes for coordinated management:

```json
{
  "name": "Bamako District Cluster",
  "nodes": ["uuid-node-1", "uuid-node-2", "uuid-node-3"],
  "status": "ONLINE",
  "config": { "syncFrequency": 300 }
}
```

---

## 6. Synchronization

### Sync Status

| Status | Description |
|--------|-------------|
| `SYNCED` | All data synchronized |
| `SYNCING` | Synchronization in progress |
| `CONFLICT` | Conflict detected |
| `PENDING` | Waiting to sync |
| `FAILED` | Sync failed |

### Sync Jobs

```json
{
  "edgeNodeId": "uuid-node",
  "type": "full_sync",
  "status": "SYNCED",
  "itemsSynced": 1250,
  "conflictsResolved": 3,
  "error": null
}
```

### Conflict Resolution

| Strategy | Description |
|----------|-------------|
| `last_write_wins` | Most recent change wins |
| `manual` | Operator resolves |
| `merge` | Auto-merge changes |

---

## 7. Offline Packages

Offline packages contain educational content for disconnected use:

```json
{
  "name": "Math Curriculum Grade 6",
  "content": {
    "chapters": [...],
    "exercises": [...],
    "videos": [...]
  },
  "version": "1.0.0",
  "size": 52428800,
  "checksum": "sha256:abc123..."
}
```

### Package Properties

| Property | Description |
|----------|-------------|
| `name` | Package identifier |
| `content` | Educational content |
| `version` | Semantic version |
| `size` | Size in bytes |
| `checksum` | Integrity verification |

---

## 8. Edge Caching

Local cache for frequently accessed data:

```json
{
  "edgeNodeId": "uuid-node",
  "key": "student-grades-batch-2026",
  "value": {...},
  "ttl": 3600,
  "expiresAt": "2026-01-15T11:30:00Z",
  "size": 1024
}
```

### Cache Management

| Operation | Description |
|-----------|-------------|
| Set | Store value with TTL |
| Get | Retrieve cached value |
| Invalidate | Remove specific key |
| Flush | Clear all cache |
| Evict | Remove expired entries |

---

## 9. Edge Policies

```json
{
  "name": "Low Bandwidth Policy",
  "syncFrequency": 600,
  "offlineCap": "FULL",
  "cacheSize": 2048,
  "priority": 1,
  "enabled": true
}
```

### Offline Capabilities

| Level | Description |
|-------|-------------|
| `FULL` | All features available offline |
| `PARTIAL` | Core features available offline |
| `NONE` | Requires connectivity |

---

## 10. Store & Forward

When connectivity is unavailable:

1. Data queued locally on edge node
2. Operations continue offline
3. On reconnection, data syncs to cloud
4. Conflicts resolved per policy
5. Audit trail maintained

### Queue Limits

| Setting | Default |
|---------|---------|
| `offlineCacheSizeMB` | 1,024 |
| `maxOfflinePackages` | 50 |
| `offlineAuthCacheTTL` | 86,400 seconds |

---

## 11. Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `maxEdgeNodesPerSchool` | 100 | Max edge nodes |
| `maxEdgeClusters` | 10 | Max edge clusters |
| `syncInterval` | 300 | Seconds between syncs |
| `conflictResolution` | last_write_wins | Conflict strategy |
| `offlineCacheSizeMB` | 1,024 | Local cache size |
| `maxOfflinePackages` | 50 | Max offline content packages |
| `deltaSyncEnabled` | true | Sync only changes |
| `storeAndForwardEnabled` | true | Queue for later sync |
| `offlineAuthCacheTTL` | 86,400 | Offline auth cache (seconds) |

// Enterprise Platform Validators - Cache, Search & Security
// Phase 2.10 - EduCI Platform

import { z } from 'zod';

// ============================================================
// Domain 5: Cache Management
// ============================================================

// --- RedisCluster ---
export const redisClusterCreateSchema = z.object({
  name: z.string().min(2).max(200),
  hosts: z.array(z.object({
    host: z.string().max(500),
    port: z.number().int().min(1).max(65535),
    role: z.enum(['master', 'replica']),
  })),
  clusterMode: z.boolean().default(false),
  password: z.string().max(256).optional(),
  ssl: z.boolean().default(true),
  maxMemory: z.string().max(20).default('1gb'),
  evictionPolicy: z.enum(['volatile-lru', 'allkeys-lru', 'volatile-ttl', 'allkeys-random', 'noeviction']).default('allkeys-lru'),
  database: z.number().int().min(0).max(15).default(0),
  connectionPoolSize: z.number().int().min(1).max(1000).default(10),
  timeout: z.number().int().min(100).max(30000).default(5000),
  environment: z.enum(['production', 'staging', 'development']),
});

export const redisClusterUpdateSchema = z.object({
  hosts: z.array(z.object({
    host: z.string().max(500),
    port: z.number().int().min(1).max(65535),
    role: z.enum(['master', 'replica']),
  })).optional(),
  clusterMode: z.boolean().optional(),
  password: z.string().max(256).optional(),
  ssl: z.boolean().optional(),
  maxMemory: z.string().max(20).optional(),
  evictionPolicy: z.enum(['volatile-lru', 'allkeys-lru', 'volatile-ttl', 'allkeys-random', 'noeviction']).optional(),
  connectionPoolSize: z.number().int().min(1).max(1000).optional(),
  timeout: z.number().int().min(100).max(30000).optional(),
});

export const redisClusterQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  clusterMode: z.boolean().optional(),
});

// --- CacheLayer ---
export const cacheLayerCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(['memory', 'redis', 'memcached', 'cdn', 'multi_level']),
  backend: z.string().max(200).optional(),
  defaultTtl: z.number().int().min(0).max(604800).default(300),
  maxSize: z.number().int().min(0).max(1000000000).default(10000),
  evictionPolicy: z.enum(['lru', 'lfu', 'fifo', 'random', 'ttl']).default('lru'),
  compression: z.boolean().default(false),
  serializationFormat: z.enum(['json', 'msgpack', 'protobuf', 'binary']).default('json'),
  keyPrefix: z.string().max(50).optional(),
  replication: z.boolean().default(false),
  clusterId: z.string().uuid().optional(),
});

export const cacheLayerUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  defaultTtl: z.number().int().min(0).max(604800).optional(),
  maxSize: z.number().int().min(0).max(1000000000).optional(),
  evictionPolicy: z.enum(['lru', 'lfu', 'fifo', 'random', 'ttl']).optional(),
  compression: z.boolean().optional(),
  serializationFormat: z.enum(['json', 'msgpack', 'protobuf', 'binary']).optional(),
  keyPrefix: z.string().max(50).optional(),
  replication: z.boolean().optional(),
});

export const cacheLayerQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['memory', 'redis', 'memcached', 'cdn', 'multi_level']).optional(),
});

// --- CacheEntry ---
export const cacheEntryCreateSchema = z.object({
  cacheLayerId: z.string().uuid(),
  key: z.string().min(1).max(500),
  value: z.string().max(1000000),
  ttl: z.number().int().min(0).max(604800),
  tags: z.array(z.string().max(200)).optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const cacheEntryUpdateSchema = z.object({
  value: z.string().max(1000000).optional(),
  ttl: z.number().int().min(0).max(604800).optional(),
  tags: z.array(z.string().max(200)).optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const cacheEntryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['key', 'ttl', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  cacheLayerId: z.string().uuid().optional(),
  search: z.string().max(500).optional(),
  tags: z.array(z.string().max(200)).optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).optional(),
});

// --- DistributedCache ---
export const distributedCacheCreateSchema = z.object({
  name: z.string().min(2).max(200),
  strategy: z.enum(['consistent_hash', 'round_robin', 'least_connections', 'random']),
  nodes: z.array(z.object({
    id: z.string().uuid(),
    weight: z.number().int().min(1).max(100).default(1),
    locality: z.string().max(100).optional(),
  })),
  replicationFactor: z.number().int().min(1).max(10).default(3),
  consistencyMode: z.enum(['strong', 'eventual', 'weak']).default('eventual'),
  partitionTolerance: z.boolean().default(true),
  crossRegionSync: z.boolean().default(false),
  syncInterval: z.number().int().min(1).max(3600).default(60),
  enabled: z.boolean().default(true),
});

export const distributedCacheUpdateSchema = z.object({
  strategy: z.enum(['consistent_hash', 'round_robin', 'least_connections', 'random']).optional(),
  nodes: z.array(z.object({
    id: z.string().uuid(),
    weight: z.number().int().min(1).max(100).default(1),
    locality: z.string().max(100).optional(),
  })).optional(),
  replicationFactor: z.number().int().min(1).max(10).optional(),
  consistencyMode: z.enum(['strong', 'eventual', 'weak']).optional(),
  crossRegionSync: z.boolean().optional(),
  syncInterval: z.number().int().min(1).max(3600).optional(),
  enabled: z.boolean().optional(),
});

export const distributedCacheQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  strategy: z.enum(['consistent_hash', 'round_robin', 'least_connections', 'random']).optional(),
  enabled: z.boolean().optional(),
});

// --- QueryCache ---
export const queryCacheCreateSchema = z.object({
  name: z.string().min(2).max(200),
  queryPattern: z.string().min(1).max(5000),
  cacheLayerId: z.string().uuid(),
  ttl: z.number().int().min(0).max(604800).default(300),
  invalidationRules: z.array(z.object({
    trigger: z.enum(['insert', 'update', 'delete', 'manual']),
    tablePattern: z.string().max(200),
    affectedKeys: z.array(z.string().max(500)),
  })).optional(),
  dependencies: z.array(z.string().max(200)).optional(),
  enabled: z.boolean().default(true),
});

export const queryCacheUpdateSchema = z.object({
  queryPattern: z.string().min(1).max(5000).optional(),
  cacheLayerId: z.string().uuid().optional(),
  ttl: z.number().int().min(0).max(604800).optional(),
  invalidationRules: z.array(z.object({
    trigger: z.enum(['insert', 'update', 'delete', 'manual']),
    tablePattern: z.string().max(200),
    affectedKeys: z.array(z.string().max(500)),
  })).optional(),
  dependencies: z.array(z.string().max(200)).optional(),
  enabled: z.boolean().optional(),
});

export const queryCacheQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  cacheLayerId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- ApiCache ---
export const apiCacheCreateSchema = z.object({
  endpoint: z.string().min(1).max(500),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  cacheLayerId: z.string().uuid(),
  ttl: z.number().int().min(0).max(604800).default(60),
  varyBy: z.array(z.enum(['query', 'header', 'body', 'cookie', 'user'])).default(['query']),
  conditions: z.array(z.object({
    type: z.enum(['header', 'query', 'body', 'cookie']),
    field: z.string().max(200),
    operator: z.enum(['eq', 'neq', 'contains', 'exists']),
    value: z.string().max(500),
  })).optional(),
  bypassConditions: z.array(z.object({
    header: z.string().max(200).optional(),
    query: z.string().max(200).optional(),
    value: z.string().max(500),
  })).optional(),
  enabled: z.boolean().default(true),
});

export const apiCacheUpdateSchema = z.object({
  ttl: z.number().int().min(0).max(604800).optional(),
  varyBy: z.array(z.enum(['query', 'header', 'body', 'cookie', 'user'])).optional(),
  conditions: z.array(z.object({
    type: z.enum(['header', 'query', 'body', 'cookie']),
    field: z.string().max(200),
    operator: z.enum(['eq', 'neq', 'contains', 'exists']),
    value: z.string().max(500),
  })).optional(),
  bypassConditions: z.array(z.object({
    header: z.string().max(200).optional(),
    query: z.string().max(200).optional(),
    value: z.string().max(500),
  })).optional(),
  enabled: z.boolean().optional(),
});

export const apiCacheQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['endpoint', 'method', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(500).optional(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional(),
  cacheLayerId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- CacheInvalidation ---
export const cacheInvalidationCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(['tag', 'key', 'pattern', 'time_based', 'event_driven']),
  targets: z.array(z.string().max(500)),
  triggerEvents: z.array(z.enum(['data_change', 'config_update', 'manual', 'schedule'])).optional(),
  cascadeRules: z.array(z.object({
    sourceKey: z.string().max(500),
    dependentKeys: z.array(z.string().max(500)),
    depth: z.number().int().min(1).max(10).default(1),
  })).optional(),
  schedule: z.string().max(100).optional(),
  enabled: z.boolean().default(true),
});

export const cacheInvalidationUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  type: z.enum(['tag', 'key', 'pattern', 'time_based', 'event_driven']).optional(),
  targets: z.array(z.string().max(500)).optional(),
  triggerEvents: z.array(z.enum(['data_change', 'config_update', 'manual', 'schedule'])).optional(),
  cascadeRules: z.array(z.object({
    sourceKey: z.string().max(500),
    dependentKeys: z.array(z.string().max(500)),
    depth: z.number().int().min(1).max(10).default(1),
  })).optional(),
  schedule: z.string().max(100).optional(),
  enabled: z.boolean().optional(),
});

export const cacheInvalidationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['tag', 'key', 'pattern', 'time_based', 'event_driven']).optional(),
  enabled: z.boolean().optional(),
});

// --- CacheMetrics ---
export const cacheMetricsCreateSchema = z.object({
  cacheLayerId: z.string().uuid(),
  timestamp: z.string().datetime(),
  hits: z.number().int().min(0),
  misses: z.number().int().min(0),
  hitRate: z.number().min(0).max(100),
  evictions: z.number().int().min(0),
  memoryUsed: z.number().int().min(0),
  memoryMax: z.number().int().min(0),
  keyCount: z.number().int().min(0),
  connections: z.number().int().min(0),
  operationsPerSecond: z.number().min(0),
  latencyP50: z.number().min(0),
  latencyP95: z.number().min(0),
  latencyP99: z.number().min(0),
});

export const cacheMetricsUpdateSchema = z.object({
  hits: z.number().int().min(0).optional(),
  misses: z.number().int().min(0).optional(),
  hitRate: z.number().min(0).max(100).optional(),
  evictions: z.number().int().min(0).optional(),
  memoryUsed: z.number().int().min(0).optional(),
  keyCount: z.number().int().min(0).optional(),
  connections: z.number().int().min(0).optional(),
  operationsPerSecond: z.number().min(0).optional(),
});

export const cacheMetricsQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['timestamp', 'hitRate', 'memoryUsed']).default('timestamp'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  cacheLayerId: z.string().uuid().optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- CacheWarmer ---
export const cacheWarmerCreateSchema = z.object({
  name: z.string().min(2).max(200),
  cacheLayerId: z.string().uuid(),
  strategy: z.enum(['proactive', 'reactive', 'scheduled', 'predictive']),
  keys: z.array(z.string().max(500)).optional(),
  patterns: z.array(z.string().max(500)).optional(),
  schedule: z.string().max(100).optional(),
  batchSize: z.number().int().min(1).max(10000).default(100),
  concurrency: z.number().int().min(1).max(100).default(10),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
  enabled: z.boolean().default(true),
});

export const cacheWarmerUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  strategy: z.enum(['proactive', 'reactive', 'scheduled', 'predictive']).optional(),
  keys: z.array(z.string().max(500)).optional(),
  patterns: z.array(z.string().max(500)).optional(),
  schedule: z.string().max(100).optional(),
  batchSize: z.number().int().min(1).max(10000).optional(),
  concurrency: z.number().int().min(1).max(100).optional(),
  priority: z.enum(['low', 'normal', 'high']).optional(),
  enabled: z.boolean().optional(),
});

export const cacheWarmerQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'strategy', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  cacheLayerId: z.string().uuid().optional(),
  strategy: z.enum(['proactive', 'reactive', 'scheduled', 'predictive']).optional(),
  enabled: z.boolean().optional(),
});

// --- CacheSnapshot ---
export const cacheSnapshotCreateSchema = z.object({
  cacheLayerId: z.string().uuid(),
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['full', 'incremental', 'differential']),
  compression: z.enum(['none', 'gzip', 'zstd', 'lz4']).default('gzip'),
  encryption: z.boolean().default(true),
  retention: z.number().int().min(1).max(365).default(30),
  schedule: z.string().max(100).optional(),
  storageLocation: z.string().max(500),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const cacheSnapshotUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  compression: z.enum(['none', 'gzip', 'zstd', 'lz4']).optional(),
  encryption: z.boolean().optional(),
  retention: z.number().int().min(1).max(365).optional(),
  schedule: z.string().max(100).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const cacheSnapshotQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  cacheLayerId: z.string().uuid().optional(),
  type: z.enum(['full', 'incremental', 'differential']).optional(),
});

// --- CachePolicy ---
export const cachePolicyCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  scope: z.enum(['global', 'layer', 'key_pattern', 'endpoint']),
  scopeValue: z.string().max(500).optional(),
  rules: z.array(z.object({
    condition: z.string().max(500),
    action: z.enum(['cache', 'bypass', 'invalidate', 'refresh']),
    ttl: z.number().int().min(0).max(604800).optional(),
    priority: z.number().int().min(0).max(1000).default(0),
  })),
  priority: z.number().int().min(0).max(1000).default(0),
  enabled: z.boolean().default(true),
});

export const cachePolicyUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  scopeValue: z.string().max(500).optional(),
  rules: z.array(z.object({
    condition: z.string().max(500),
    action: z.enum(['cache', 'bypass', 'invalidate', 'refresh']),
    ttl: z.number().int().min(0).max(604800).optional(),
    priority: z.number().int().min(0).max(1000).default(0),
  })).optional(),
  priority: z.number().int().min(0).max(1000).optional(),
  enabled: z.boolean().optional(),
});

export const cachePolicyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'priority', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  scope: z.enum(['global', 'layer', 'key_pattern', 'endpoint']).optional(),
  enabled: z.boolean().optional(),
});

// --- CacheCluster ---
export const cacheClusterCreateSchema = z.object({
  name: z.string().min(2).max(200),
  provider: z.enum(['redis', 'memcached', 'custom']),
  nodes: z.array(z.object({
    host: z.string().max(500),
    port: z.number().int().min(1).max(65535),
    role: z.enum(['primary', 'replica', 'sentinel']),
    weight: z.number().int().min(1).max(100).default(1),
  })),
  autoScaling: z.boolean().default(false),
  minNodes: z.number().int().min(1).max(100).default(1),
  maxNodes: z.number().int().min(1).max(100).default(10),
  healthCheckInterval: z.number().int().min(1).max(300).default(30),
  failoverTimeout: z.number().int().min(1).max(60).default(5),
  environment: z.enum(['production', 'staging', 'development']),
});

export const cacheClusterUpdateSchema = z.object({
  nodes: z.array(z.object({
    host: z.string().max(500),
    port: z.number().int().min(1).max(65535),
    role: z.enum(['primary', 'replica', 'sentinel']),
    weight: z.number().int().min(1).max(100).default(1),
  })).optional(),
  autoScaling: z.boolean().optional(),
  minNodes: z.number().int().min(1).max(100).optional(),
  maxNodes: z.number().int().min(1).max(100).optional(),
  healthCheckInterval: z.number().int().min(1).max(300).optional(),
  failoverTimeout: z.number().int().min(1).max(60).optional(),
});

export const cacheClusterQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  provider: z.enum(['redis', 'memcached', 'custom']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
});

// ============================================================
// Domain 6: Search Engine
// ============================================================

// --- SearchIndex ---
export const searchIndexCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(['full_text', 'autocomplete', 'vector', 'geo', 'faceted']),
  source: z.string().min(1).max(200),
  fields: z.array(z.object({
    name: z.string().max(200),
    type: z.enum(['text', 'keyword', 'number', 'date', 'boolean', 'vector', 'geo_point']),
    searchable: z.boolean().default(true),
    filterable: z.boolean().default(false),
    sortable: z.boolean().default(false),
    analyzer: z.string().max(100).optional(),
  })),
  settings: z.object({
    shards: z.number().int().min(1).max(100).default(1),
    replicas: z.number().int().min(0).max(10).default(1),
    refreshInterval: z.string().max(20).default('1s'),
    maxResultWindow: z.number().int().min(1).max(1000000).default(10000),
  }).optional(),
  syncSchedule: z.string().max(100).optional(),
  enabled: z.boolean().default(true),
});

export const searchIndexUpdateSchema = z.object({
  fields: z.array(z.object({
    name: z.string().max(200),
    type: z.enum(['text', 'keyword', 'number', 'date', 'boolean', 'vector', 'geo_point']),
    searchable: z.boolean().default(true),
    filterable: z.boolean().default(false),
    sortable: z.boolean().default(false),
    analyzer: z.string().max(100).optional(),
  })).optional(),
  settings: z.object({
    shards: z.number().int().min(1).max(100).default(1),
    replicas: z.number().int().min(0).max(10).default(1),
    refreshInterval: z.string().max(20).default('1s'),
    maxResultWindow: z.number().int().min(1).max(1000000).default(10000),
  }).optional(),
  syncSchedule: z.string().max(100).optional(),
  enabled: z.boolean().optional(),
});

export const searchIndexQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['full_text', 'autocomplete', 'vector', 'geo', 'faceted']).optional(),
  enabled: z.boolean().optional(),
});

// --- SearchDocument ---
export const searchDocumentCreateSchema = z.object({
  indexId: z.string().uuid(),
  documentId: z.string().max(500),
  data: z.record(z.string(), z.unknown()),
  tenantId: z.string().uuid().optional(),
  boost: z.number().min(0).max(100).default(1),
  tags: z.array(z.string().max(200)).optional(),
});

export const searchDocumentUpdateSchema = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
  boost: z.number().min(0).max(100).optional(),
  tags: z.array(z.string().max(200)).optional(),
});

export const searchDocumentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['documentId', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  indexId: z.string().uuid().optional(),
  tenantId: z.string().uuid().optional(),
  search: z.string().max(500).optional(),
  tags: z.array(z.string().max(200)).optional(),
});

// --- SearchQuery ---
export const searchQueryCreateSchema = z.object({
  indexId: z.string().uuid(),
  query: z.string().min(1).max(5000),
  queryType: z.enum(['match', 'phrase', 'prefix', 'fuzzy', 'boolean', 'range', 'exists']),
  fields: z.array(z.string().max(200)).optional(),
  filters: z.array(z.object({
    field: z.string().max(200),
    operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'contains']),
    value: z.unknown(),
  })).optional(),
  sort: z.array(z.object({
    field: z.string().max(200),
    order: z.enum(['asc', 'desc']),
  })).optional(),
  highlight: z.object({
    fields: z.array(z.string().max(200)),
    preTag: z.string().max(50).default('<em>'),
    postTag: z.string().max(50).default('</em>'),
  }).optional(),
  pagination: z.object({
    offset: z.number().int().min(0).default(0),
    limit: z.number().int().min(1).max(1000).default(20),
  }).optional(),
  facets: z.array(z.string().max(200)).optional(),
  suggest: z.boolean().default(false),
});

export const searchQueryUpdateSchema = z.object({
  query: z.string().min(1).max(5000).optional(),
  queryType: z.enum(['match', 'phrase', 'prefix', 'fuzzy', 'boolean', 'range', 'exists']).optional(),
  fields: z.array(z.string().max(200)).optional(),
  filters: z.array(z.object({
    field: z.string().max(200),
    operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'contains']),
    value: z.unknown(),
  })).optional(),
  sort: z.array(z.object({
    field: z.string().max(200),
    order: z.enum(['asc', 'desc']),
  })).optional(),
});

export const searchQueryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['query', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  indexId: z.string().uuid().optional(),
  queryType: z.enum(['match', 'phrase', 'prefix', 'fuzzy', 'boolean', 'range', 'exists']).optional(),
});

// --- SearchSuggestion ---
export const searchSuggestionCreateSchema = z.object({
  indexId: z.string().uuid(),
  input: z.string().min(1).max(500),
  output: z.array(z.string().max(500)),
  context: z.record(z.string(), z.string()).optional(),
  weight: z.number().int().min(0).max(1000).default(1),
  category: z.string().max(200).optional(),
  enabled: z.boolean().default(true),
});

export const searchSuggestionUpdateSchema = z.object({
  input: z.string().min(1).max(500).optional(),
  output: z.array(z.string().max(500)).optional(),
  context: z.record(z.string(), z.string()).optional(),
  weight: z.number().int().min(0).max(1000).optional(),
  category: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

export const searchSuggestionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['input', 'weight', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  indexId: z.string().uuid().optional(),
  search: z.string().max(500).optional(),
  category: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- SearchAnalytics ---
export const searchAnalyticsCreateSchema = z.object({
  tenantId: z.string().uuid(),
  indexId: z.string().uuid(),
  query: z.string().min(1).max(5000),
  resultsCount: z.number().int().min(0),
  responseTimeMs: z.number().int().min(0),
  clickedResult: z.string().max(500).optional(),
  position: z.number().int().min(0).optional(),
  userId: z.string().uuid().optional(),
  sessionId: z.string().max(200).optional(),
  filters: z.record(z.string(), z.string()).optional(),
  zeroResults: z.boolean().default(false),
});

export const searchAnalyticsUpdateSchema = z.object({
  clickedResult: z.string().max(500).optional(),
  position: z.number().int().min(0).optional(),
});

export const searchAnalyticsQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['query', 'resultsCount', 'responseTimeMs', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  indexId: z.string().uuid().optional(),
  zeroResults: z.boolean().optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- GlobalSearchConfig ---
export const globalSearchConfigCreateSchema = z.object({
  name: z.string().min(2).max(200),
  indexes: z.array(z.string().uuid()),
  defaultIndex: z.string().uuid().optional(),
  settings: z.object({
    maxResults: z.number().int().min(1).max(10000).default(100),
    timeout: z.number().int().min(100).max(30000).default(5000),
    fuzzy: z.boolean().default(true),
    synonyms: z.boolean().default(true),
    stemming: z.boolean().default(true),
    stopWords: z.boolean().default(false),
  }),
  weights: z.record(z.string(), z.number().min(0).max(100)).optional(),
  boostRules: z.array(z.object({
    condition: z.string().max(500),
    boost: z.number().min(0).max(100),
  })).optional(),
  enabled: z.boolean().default(true),
});

export const globalSearchConfigUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  indexes: z.array(z.string().uuid()).optional(),
  defaultIndex: z.string().uuid().optional(),
  settings: z.object({
    maxResults: z.number().int().min(1).max(10000).default(100),
    timeout: z.number().int().min(100).max(30000).default(5000),
    fuzzy: z.boolean().default(true),
    synonyms: z.boolean().default(true),
    stemming: z.boolean().default(true),
    stopWords: z.boolean().default(false),
  }).optional(),
  weights: z.record(z.string(), z.number().min(0).max(100)).optional(),
  boostRules: z.array(z.object({
    condition: z.string().max(500),
    boost: z.number().min(0).max(100),
  })).optional(),
  enabled: z.boolean().optional(),
});

export const globalSearchConfigQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- ElasticCluster ---
export const elasticClusterCreateSchema = z.object({
  name: z.string().min(2).max(200),
  nodes: z.array(z.object({
    host: z.string().max(500),
    port: z.number().int().min(1).max(65535),
    role: z.enum(['master', 'data', 'ingest', 'coordinating']),
  })),
  version: z.string().min(1).max(50),
  ssl: z.boolean().default(true),
  auth: z.boolean().default(true),
  indexTemplates: z.array(z.object({
    name: z.string().max(200),
    pattern: z.string().max(200),
    settings: z.record(z.string(), z.unknown()),
  })).optional(),
  ilmPolicy: z.object({
    hot: z.number().int().min(1).max(365),
    warm: z.number().int().min(0).max(365),
    cold: z.number().int().min(0).max(365),
    delete: z.number().int().min(0).max(365),
  }).optional(),
  environment: z.enum(['production', 'staging', 'development']),
});

export const elasticClusterUpdateSchema = z.object({
  nodes: z.array(z.object({
    host: z.string().max(500),
    port: z.number().int().min(1).max(65535),
    role: z.enum(['master', 'data', 'ingest', 'coordinating']),
  })).optional(),
  ssl: z.boolean().optional(),
  auth: z.boolean().optional(),
  indexTemplates: z.array(z.object({
    name: z.string().max(200),
    pattern: z.string().max(200),
    settings: z.record(z.string(), z.unknown()),
  })).optional(),
  ilmPolicy: z.object({
    hot: z.number().int().min(1).max(365),
    warm: z.number().int().min(0).max(365),
    cold: z.number().int().min(0).max(365),
    delete: z.number().int().min(0).max(365),
  }).optional(),
});

export const elasticClusterQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'version', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
});

// --- IndexBuilder ---
export const indexBuilderCreateSchema = z.object({
  name: z.string().min(2).max(200),
  indexId: z.string().uuid(),
  strategy: z.enum(['full', 'incremental', 'differential']),
  source: z.object({
    type: z.enum(['database', 'api', 'file', 'stream']),
    config: z.record(z.string(), z.string()),
  }),
  mapping: z.record(z.string(), z.string()),
  schedule: z.string().max(100).optional(),
  batchSize: z.number().int().min(1).max(100000).default(1000),
  transform: z.string().max(10000).optional(),
  enabled: z.boolean().default(true),
});

export const indexBuilderUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  source: z.object({
    type: z.enum(['database', 'api', 'file', 'stream']),
    config: z.record(z.string(), z.string()),
  }).optional(),
  mapping: z.record(z.string(), z.string()).optional(),
  schedule: z.string().max(100).optional(),
  batchSize: z.number().int().min(1).max(100000).optional(),
  transform: z.string().max(10000).optional(),
  enabled: z.boolean().optional(),
});

export const indexBuilderQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  indexId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- IncrementalIndex ---
export const incrementalIndexCreateSchema = z.object({
  builderId: z.string().uuid(),
  name: z.string().min(2).max(200),
  lastSyncAt: z.string().datetime(),
  watermark: z.string().max(500),
  syncKey: z.string().max(200),
  conflictResolution: z.enum(['last_write_wins', 'source_wins', 'manual']).default('last_write_wins'),
  deduplication: z.boolean().default(true),
  deduplicationKey: z.string().max(200).optional(),
  enabled: z.boolean().default(true),
});

export const incrementalIndexUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  lastSyncAt: z.string().datetime().optional(),
  watermark: z.string().max(500).optional(),
  conflictResolution: z.enum(['last_write_wins', 'source_wins', 'manual']).optional(),
  deduplication: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const incrementalIndexQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'lastSyncAt', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  builderId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- PeopleSearch ---
export const peopleSearchCreateSchema = z.object({
  name: z.string().min(2).max(200),
  indexId: z.string().uuid(),
  tenantId: z.string().uuid(),
  fields: z.array(z.enum(['name', 'email', 'department', 'role', 'skills', 'courses', 'location'])),
  suggestions: z.boolean().default(true),
  fuzzyMatch: z.boolean().default(true),
  typoTolerance: z.number().int().min(0).max(5).default(2),
  highlightFields: z.array(z.string().max(200)).optional(),
  filters: z.array(z.object({
    field: z.string().max(200),
    type: z.enum(['exact', 'range', 'exists']),
  })).optional(),
  enabled: z.boolean().default(true),
});

export const peopleSearchUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  fields: z.array(z.enum(['name', 'email', 'department', 'role', 'skills', 'courses', 'location'])).optional(),
  suggestions: z.boolean().optional(),
  fuzzyMatch: z.boolean().optional(),
  typoTolerance: z.number().int().min(0).max(5).optional(),
  highlightFields: z.array(z.string().max(200)).optional(),
  filters: z.array(z.object({
    field: z.string().max(200),
    type: z.enum(['exact', 'range', 'exists']),
  })).optional(),
  enabled: z.boolean().optional(),
});

export const peopleSearchQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  tenantId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- SchoolSearch ---
export const schoolSearchCreateSchema = z.object({
  name: z.string().min(2).max(200),
  indexId: z.string().uuid(),
  tenantId: z.string().uuid(),
  fields: z.array(z.enum(['name', 'code', 'address', 'district', 'type', 'programs'])),
  suggestions: z.boolean().default(true),
  fuzzyMatch: z.boolean().default(true),
  geoSearch: z.boolean().default(false),
  geoRadiusKm: z.number().min(0).max(1000).optional(),
  defaultLocation: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }).optional(),
  enabled: z.boolean().default(true),
});

export const schoolSearchUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  fields: z.array(z.enum(['name', 'code', 'address', 'district', 'type', 'programs'])).optional(),
  suggestions: z.boolean().optional(),
  fuzzyMatch: z.boolean().optional(),
  geoSearch: z.boolean().optional(),
  geoRadiusKm: z.number().min(0).max(1000).optional(),
  defaultLocation: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }).optional(),
  enabled: z.boolean().optional(),
});

export const schoolSearchQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  tenantId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- AnalyticsSearch ---
export const analyticsSearchCreateSchema = z.object({
  name: z.string().min(2).max(200),
  indexId: z.string().uuid(),
  tenantId: z.string().uuid(),
  fields: z.array(z.enum(['metric_name', 'dimension', 'value', 'timestamp', 'source'])),
  aggregationTypes: z.array(z.enum(['count', 'sum', 'avg', 'min', 'max', 'percentile'])),
  timeSeries: z.boolean().default(false),
  timeField: z.string().max(200).optional(),
  defaultGranularity: z.enum(['minute', 'hour', 'day', 'week', 'month']).optional(),
  accessControl: z.array(z.enum(['own_tenant', 'own_department', 'all'])).default(['own_tenant']),
  enabled: z.boolean().default(true),
});

export const analyticsSearchUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  fields: z.array(z.enum(['metric_name', 'dimension', 'value', 'timestamp', 'source'])).optional(),
  aggregationTypes: z.array(z.enum(['count', 'sum', 'avg', 'min', 'max', 'percentile'])).optional(),
  timeSeries: z.boolean().optional(),
  timeField: z.string().max(200).optional(),
  defaultGranularity: z.enum(['minute', 'hour', 'day', 'week', 'month']).optional(),
  accessControl: z.array(z.enum(['own_tenant', 'own_department', 'all'])).optional(),
  enabled: z.boolean().optional(),
});

export const analyticsSearchQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  tenantId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- SearchRelevance ---
export const searchRelevanceCreateSchema = z.object({
  name: z.string().min(2).max(200),
  indexId: z.string().uuid(),
  algorithm: z.enum(['tf_idf', 'bm25', 'vector_similarity', 'hybrid']),
  fieldWeights: z.record(z.string(), z.number().min(0).max(100)),
  boostingRules: z.array(z.object({
    type: z.enum(['field_value', 'recency', 'popularity', 'custom']),
    field: z.string().max(200).optional(),
    boost: z.number().min(0).max(100),
    decay: z.number().min(0).max(1).optional(),
  })).optional(),
  minScore: z.number().min(0).max(100).default(0),
  maxResults: z.number().int().min(1).max(10000).default(100),
  enabled: z.boolean().default(true),
});

export const searchRelevanceUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  algorithm: z.enum(['tf_idf', 'bm25', 'vector_similarity', 'hybrid']).optional(),
  fieldWeights: z.record(z.string(), z.number().min(0).max(100)).optional(),
  boostingRules: z.array(z.object({
    type: z.enum(['field_value', 'recency', 'popularity', 'custom']),
    field: z.string().max(200).optional(),
    boost: z.number().min(0).max(100),
    decay: z.number().min(0).max(1).optional(),
  })).optional(),
  minScore: z.number().min(0).max(100).optional(),
  maxResults: z.number().int().min(1).max(10000).optional(),
  enabled: z.boolean().optional(),
});

export const searchRelevanceQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  indexId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- SearchSynonym ---
export const searchSynonymCreateSchema = z.object({
  name: z.string().min(2).max(200),
  indexId: z.string().uuid(),
  synonyms: z.array(z.array(z.string().max(200))),
  type: z.enum(['explicit', 'one_way', 'two_way']),
  analyzer: z.string().max(100).optional(),
  context: z.record(z.string(), z.array(z.string().max(200))).optional(),
  enabled: z.boolean().default(true),
});

export const searchSynonymUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  synonyms: z.array(z.array(z.string().max(200))).optional(),
  type: z.enum(['explicit', 'one_way', 'two_way']).optional(),
  analyzer: z.string().max(100).optional(),
  context: z.record(z.string(), z.array(z.string().max(200))).optional(),
  enabled: z.boolean().optional(),
});

export const searchSynonymQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  indexId: z.string().uuid().optional(),
  type: z.enum(['explicit', 'one_way', 'two_way']).optional(),
  enabled: z.boolean().optional(),
});

// ============================================================
// Domain 7: Security
// ============================================================

// --- ZeroTrustPolicy ---
export const zeroTrustPolicyCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  scope: z.enum(['global', 'tenant', 'service', 'endpoint']),
  scopeValue: z.string().max(500).optional(),
  rules: z.array(z.object({
    name: z.string().max(200),
    condition: z.string().max(1000),
    action: z.enum(['allow', 'deny', 'challenge', 'log']),
    priority: z.number().int().min(0).max(1000),
    expiresAt: z.string().datetime().optional(),
  })),
  requireMfa: z.boolean().default(false),
  deviceTrust: z.boolean().default(false),
  networkSegmentation: z.boolean().default(false),
  enabled: z.boolean().default(true),
});

export const zeroTrustPolicyUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  scopeValue: z.string().max(500).optional(),
  rules: z.array(z.object({
    name: z.string().max(200),
    condition: z.string().max(1000),
    action: z.enum(['allow', 'deny', 'challenge', 'log']),
    priority: z.number().int().min(0).max(1000),
    expiresAt: z.string().datetime().optional(),
  })).optional(),
  requireMfa: z.boolean().optional(),
  deviceTrust: z.boolean().optional(),
  networkSegmentation: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const zeroTrustPolicyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  scope: z.enum(['global', 'tenant', 'service', 'endpoint']).optional(),
  enabled: z.boolean().optional(),
});

// --- AccessPolicy ---
export const accessPolicyCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['rbac', 'abac', 'acl', 'hybrid']),
  resources: z.array(z.string().max(200)),
  actions: z.array(z.enum(['read', 'write', 'delete', 'execute', 'admin'])),
  conditions: z.array(z.object({
    attribute: z.string().max(200),
    operator: z.enum(['eq', 'neq', 'contains', 'in', 'gt', 'lt', 'gte', 'lte']),
    value: z.unknown(),
  })).optional(),
  effect: z.enum(['allow', 'deny']),
  priority: z.number().int().min(0).max(1000).default(0),
  expiry: z.string().datetime().optional(),
  enabled: z.boolean().default(true),
});

export const accessPolicyUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['rbac', 'abac', 'acl', 'hybrid']).optional(),
  resources: z.array(z.string().max(200)).optional(),
  actions: z.array(z.enum(['read', 'write', 'delete', 'execute', 'admin'])).optional(),
  conditions: z.array(z.object({
    attribute: z.string().max(200),
    operator: z.enum(['eq', 'neq', 'contains', 'in', 'gt', 'lt', 'gte', 'lte']),
    value: z.unknown(),
  })).optional(),
  effect: z.enum(['allow', 'deny']).optional(),
  priority: z.number().int().min(0).max(1000).optional(),
  expiry: z.string().datetime().optional(),
  enabled: z.boolean().optional(),
});

export const accessPolicyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'priority', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['rbac', 'abac', 'acl', 'hybrid']).optional(),
  effect: z.enum(['allow', 'deny']).optional(),
  enabled: z.boolean().optional(),
});

// --- Role ---
export const roleCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  tenantId: z.string().uuid().optional(),
  type: z.enum(['system', 'custom', 'temporary']),
  permissions: z.array(z.string().uuid()),
  parentRoleId: z.string().uuid().optional(),
  maxAssignments: z.number().int().min(-1).max(100000).default(-1),
  expiresAt: z.string().datetime().optional(),
  enabled: z.boolean().default(true),
});

export const roleUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['system', 'custom', 'temporary']).optional(),
  permissions: z.array(z.string().uuid()).optional(),
  parentRoleId: z.string().uuid().optional(),
  maxAssignments: z.number().int().min(-1).max(100000).optional(),
  expiresAt: z.string().datetime().optional(),
  enabled: z.boolean().optional(),
});

export const roleQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  tenantId: z.string().uuid().optional(),
  type: z.enum(['system', 'custom', 'temporary']).optional(),
  enabled: z.boolean().optional(),
});

// --- Permission ---
export const permissionCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  resource: z.string().min(1).max(200),
  action: z.enum(['create', 'read', 'update', 'delete', 'execute', 'admin']),
  scope: z.enum(['global', 'tenant', 'own', 'department']).default('own'),
  conditions: z.array(z.object({
    attribute: z.string().max(200),
    operator: z.enum(['eq', 'neq', 'contains', 'in']),
    value: z.unknown(),
  })).optional(),
  category: z.string().max(200).optional(),
  enabled: z.boolean().default(true),
});

export const permissionUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  resource: z.string().min(1).max(200).optional(),
  action: z.enum(['create', 'read', 'update', 'delete', 'execute', 'admin']).optional(),
  scope: z.enum(['global', 'tenant', 'own', 'department']).optional(),
  conditions: z.array(z.object({
    attribute: z.string().max(200),
    operator: z.enum(['eq', 'neq', 'contains', 'in']),
    value: z.unknown(),
  })).optional(),
  category: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

export const permissionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'resource', 'action', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  resource: z.string().max(200).optional(),
  action: z.enum(['create', 'read', 'update', 'delete', 'execute', 'admin']).optional(),
  category: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- AbacPolicy ---
export const abacPolicyCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  target: z.array(z.string().max(200)),
  effect: z.enum(['permit', 'deny']),
  obligation: z.array(z.object({
    type: z.enum(['encrypt', 'mask', 'audit', 'notify']),
    config: z.record(z.string(), z.unknown()),
  })).optional(),
  advice: z.array(z.string().max(500)).optional(),
  combiningAlgorithm: z.enum(['deny_overrides', 'permit_overrides', 'first_applicable']).default('deny_overrides'),
  condition: z.string().max(2000),
  enabled: z.boolean().default(true),
});

export const abacPolicyUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  target: z.array(z.string().max(200)).optional(),
  effect: z.enum(['permit', 'deny']).optional(),
  obligation: z.array(z.object({
    type: z.enum(['encrypt', 'mask', 'audit', 'notify']),
    config: z.record(z.string(), z.unknown()),
  })).optional(),
  advice: z.array(z.string().max(500)).optional(),
  combiningAlgorithm: z.enum(['deny_overrides', 'permit_overrides', 'first_applicable']).optional(),
  condition: z.string().max(2000).optional(),
  enabled: z.boolean().optional(),
});

export const abacPolicyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'effect', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  effect: z.enum(['permit', 'deny']).optional(),
  enabled: z.boolean().optional(),
});

// --- PolicyEvaluation ---
export const policyEvaluationCreateSchema = z.object({
  subject: z.string().min(1).max(200),
  resource: z.string().min(1).max(200),
  action: z.string().min(1).max(200),
  context: z.record(z.string(), z.unknown()),
  result: z.enum(['permit', 'deny', 'not_applicable', 'indeterminate']),
  matchedPolicies: z.array(z.string().uuid()),
  evaluationTimeMs: z.number().int().min(0),
  cached: z.boolean().default(false),
});

export const policyEvaluationUpdateSchema = z.object({
  result: z.enum(['permit', 'deny', 'not_applicable', 'indeterminate']).optional(),
  matchedPolicies: z.array(z.string().uuid()).optional(),
  evaluationTimeMs: z.number().int().min(0).optional(),
});

export const policyEvaluationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['subject', 'resource', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  subject: z.string().max(200).optional(),
  resource: z.string().max(200).optional(),
  result: z.enum(['permit', 'deny', 'not_applicable', 'indeterminate']).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- SecretRotation ---
export const secretRotationCreateSchema = z.object({
  name: z.string().min(2).max(200),
  secretType: z.enum(['password', 'api_key', 'certificate', 'token', 'encryption_key']),
  provider: z.enum(['aws_secrets_manager', 'azure_key_vault', 'gcp_secret_manager', 'hashicorp_vault', 'custom']),
  rotationInterval: z.number().int().min(3600).max(31536000),
  secretPath: z.string().max(500),
  secretKey: z.string().max(200),
  rotationScript: z.string().max(10000).optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])),
  enabled: z.boolean().default(true),
});

export const secretRotationUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  rotationInterval: z.number().int().min(3600).max(31536000).optional(),
  secretPath: z.string().max(500).optional(),
  secretKey: z.string().max(200).optional(),
  rotationScript: z.string().max(10000).optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])).optional(),
  enabled: z.boolean().optional(),
});

export const secretRotationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'secretType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  secretType: z.enum(['password', 'api_key', 'certificate', 'token', 'encryption_key']).optional(),
  provider: z.enum(['aws_secrets_manager', 'azure_key_vault', 'gcp_secret_manager', 'hashicorp_vault', 'custom']).optional(),
  enabled: z.boolean().optional(),
});

// --- SecurityCenter ---
export const securityCenterCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  scanTypes: z.array(z.enum(['vulnerability', 'compliance', 'secret', 'dependency', 'container', 'infrastructure'])),
  schedule: z.string().max(100).optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook', 'jira'])),
  severityThreshold: z.enum(['info', 'low', 'medium', 'high', 'critical']).default('medium'),
  autoRemediate: z.boolean().default(false),
  enabled: z.boolean().default(true),
});

export const securityCenterUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  scanTypes: z.array(z.enum(['vulnerability', 'compliance', 'secret', 'dependency', 'container', 'infrastructure'])).optional(),
  schedule: z.string().max(100).optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook', 'jira'])).optional(),
  severityThreshold: z.enum(['info', 'low', 'medium', 'high', 'critical']).optional(),
  autoRemediate: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const securityCenterQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- ThreatDetection ---
export const threatDetectionCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(['anomaly', 'signature', 'behavioral', 'ml_based', 'rule_based']),
  dataSources: z.array(z.enum(['logs', 'network', 'endpoints', 'cloud', 'identity', 'email'])),
  rules: z.array(z.object({
    name: z.string().max(200),
    condition: z.string().max(1000),
    severity: z.enum(['info', 'low', 'medium', 'high', 'critical']),
    enabled: z.boolean().default(true),
  })),
  responseActions: z.array(z.enum(['alert', 'block', 'isolate', 'quarantine', 'notify'])),
  mlModelId: z.string().uuid().optional(),
  sensitivityThreshold: z.number().min(0).max(100).default(50),
  enabled: z.boolean().default(true),
});

export const threatDetectionUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  type: z.enum(['anomaly', 'signature', 'behavioral', 'ml_based', 'rule_based']).optional(),
  dataSources: z.array(z.enum(['logs', 'network', 'endpoints', 'cloud', 'identity', 'email'])).optional(),
  rules: z.array(z.object({
    name: z.string().max(200),
    condition: z.string().max(1000),
    severity: z.enum(['info', 'low', 'medium', 'high', 'critical']),
    enabled: z.boolean().default(true),
  })).optional(),
  responseActions: z.array(z.enum(['alert', 'block', 'isolate', 'quarantine', 'notify'])).optional(),
  sensitivityThreshold: z.number().min(0).max(100).optional(),
  enabled: z.boolean().optional(),
});

export const threatDetectionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['anomaly', 'signature', 'behavioral', 'ml_based', 'rule_based']).optional(),
  enabled: z.boolean().optional(),
});

// --- SecurityAudit ---
export const securityAuditCreateSchema = z.object({
  name: z.string().min(2).max(200),
  scope: z.enum(['full', 'focused', 'compliance', 'penetration']),
  targets: z.array(z.string().max(200)),
  standards: z.array(z.enum(['owasp', 'nist', 'iso27001', 'soc2', 'gdpr', 'hipaa', 'ferpa'])),
  frequency: z.enum(['continuous', 'daily', 'weekly', 'monthly', 'quarterly']),
  autoScan: z.boolean().default(true),
  reporting: z.object({
    format: z.enum(['pdf', 'html', 'json', 'csv']),
    recipients: z.array(z.string().email()),
    schedule: z.string().max(100).optional(),
  }),
  enabled: z.boolean().default(true),
});

export const securityAuditUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  scope: z.enum(['full', 'focused', 'compliance', 'penetration']).optional(),
  targets: z.array(z.string().max(200)).optional(),
  standards: z.array(z.enum(['owasp', 'nist', 'iso27001', 'soc2', 'gdpr', 'hipaa', 'ferpa'])).optional(),
  frequency: z.enum(['continuous', 'daily', 'weekly', 'monthly', 'quarterly']).optional(),
  autoScan: z.boolean().optional(),
  reporting: z.object({
    format: z.enum(['pdf', 'html', 'json', 'csv']),
    recipients: z.array(z.string().email()),
    schedule: z.string().max(100).optional(),
  }).optional(),
  enabled: z.boolean().optional(),
});

export const securityAuditQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'scope', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  scope: z.enum(['full', 'focused', 'compliance', 'penetration']).optional(),
  enabled: z.boolean().optional(),
});

// --- FirewallRule ---
export const firewallRuleCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  direction: z.enum(['inbound', 'outbound', 'both']),
  priority: z.number().int().min(0).max(65535).default(1000),
  protocol: z.enum(['tcp', 'udp', 'icmp', 'any']),
  sourceIp: z.string().max(50),
  destinationIp: z.string().max(50),
  sourcePort: z.string().max(50).optional(),
  destinationPort: z.string().max(50),
  action: z.enum(['allow', 'deny', 'log']),
  logging: z.boolean().default(false),
  enabled: z.boolean().default(true),
});

export const firewallRuleUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  direction: z.enum(['inbound', 'outbound', 'both']).optional(),
  priority: z.number().int().min(0).max(65535).optional(),
  protocol: z.enum(['tcp', 'udp', 'icmp', 'any']).optional(),
  sourceIp: z.string().max(50).optional(),
  destinationIp: z.string().max(50).optional(),
  sourcePort: z.string().max(50).optional(),
  destinationPort: z.string().max(50).optional(),
  action: z.enum(['allow', 'deny', 'log']).optional(),
  logging: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const firewallRuleQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'priority', 'created_at']).default('priority'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().max(200).optional(),
  direction: z.enum(['inbound', 'outbound', 'both']).optional(),
  action: z.enum(['allow', 'deny', 'log']).optional(),
  enabled: z.boolean().optional(),
});

// --- IpWhitelist ---
export const ipWhitelistCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  entries: z.array(z.object({
    ip: z.string().max(50),
    cidr: z.number().int().min(0).max(32).optional(),
    description: z.string().max(200).optional(),
  })),
  scope: z.enum(['global', 'service', 'endpoint']),
  scopeValue: z.string().max(500).optional(),
  action: z.enum(['allow', 'block']),
  expiresAt: z.string().datetime().optional(),
  enabled: z.boolean().default(true),
});

export const ipWhitelistUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  entries: z.array(z.object({
    ip: z.string().max(50),
    cidr: z.number().int().min(0).max(32).optional(),
    description: z.string().max(200).optional(),
  })).optional(),
  scopeValue: z.string().max(500).optional(),
  action: z.enum(['allow', 'block']).optional(),
  expiresAt: z.string().datetime().optional(),
  enabled: z.boolean().optional(),
});

export const ipWhitelistQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  scope: z.enum(['global', 'service', 'endpoint']).optional(),
  action: z.enum(['allow', 'block']).optional(),
  enabled: z.boolean().optional(),
});

// --- EncryptionKey ---
export const encryptionKeyCreateSchema = z.object({
  name: z.string().min(2).max(200),
  algorithm: z.enum(['aes_256', 'aes_128', 'rsa_2048', 'rsa_4096', 'ecdsa_p256', 'ecdsa_p384']),
  purpose: z.enum(['data_at_rest', 'data_in_transit', 'api_signing', 'token_generation', 'backup']),
  keyLength: z.number().int().min(128).max(4096),
  rotationIntervalDays: z.number().int().min(1).max(365),
  autoRotate: z.boolean().default(true),
  exportable: z.boolean().default(false),
  usageCount: z.number().int().min(0).max(1000000).default(0),
  maxUsageCount: z.number().int().min(-1).max(1000000).default(-1),
  enabled: z.boolean().default(true),
});

export const encryptionKeyUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  rotationIntervalDays: z.number().int().min(1).max(365).optional(),
  autoRotate: z.boolean().optional(),
  exportable: z.boolean().optional(),
  maxUsageCount: z.number().int().min(-1).max(1000000).optional(),
  enabled: z.boolean().optional(),
});

export const encryptionKeyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'algorithm', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  algorithm: z.enum(['aes_256', 'aes_128', 'rsa_2048', 'rsa_4096', 'ecdsa_p256', 'ecdsa_p384']).optional(),
  purpose: z.enum(['data_at_rest', 'data_in_transit', 'api_signing', 'token_generation', 'backup']).optional(),
  enabled: z.boolean().optional(),
});

// --- SecurityIncident ---
export const securityIncidentCreateSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(1).max(5000),
  severity: z.enum(['info', 'low', 'medium', 'high', 'critical']),
  category: z.enum(['data_breach', 'malware', 'phishing', 'unauthorized_access', 'ddos', 'insider_threat', 'supply_chain']),
  status: z.enum(['open', 'investigating', 'contained', 'eradicated', 'recovered', 'closed']),
  assignedTo: z.string().uuid().optional(),
  affectedAssets: z.array(z.string().max(200)),
  timeline: z.array(z.object({
    timestamp: z.string().datetime(),
    action: z.string().max(500),
    actor: z.string().max(200),
  })),
  evidence: z.array(z.object({
    type: z.enum(['log', 'screenshot', 'file', 'network_capture']),
    url: z.string().max(2000),
    description: z.string().max(500),
  })).optional(),
  notifications: z.array(z.enum(['management', 'legal', 'regulatory', 'affected_users'])),
});

export const securityIncidentUpdateSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().min(1).max(5000).optional(),
  severity: z.enum(['info', 'low', 'medium', 'high', 'critical']).optional(),
  status: z.enum(['open', 'investigating', 'contained', 'eradicated', 'recovered', 'closed']).optional(),
  assignedTo: z.string().uuid().optional(),
  affectedAssets: z.array(z.string().max(200)).optional(),
  timeline: z.array(z.object({
    timestamp: z.string().datetime(),
    action: z.string().max(500),
    actor: z.string().max(200),
  })).optional(),
  resolution: z.string().max(2000).optional(),
  postmortem: z.string().max(5000).optional(),
});

export const securityIncidentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'severity', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  severity: z.enum(['info', 'low', 'medium', 'high', 'critical']).optional(),
  status: z.enum(['open', 'investigating', 'contained', 'eradicated', 'recovered', 'closed']).optional(),
  category: z.enum(['data_breach', 'malware', 'phishing', 'unauthorized_access', 'ddos', 'insider_threat', 'supply_chain']).optional(),
  assignedTo: z.string().uuid().optional(),
});

// --- VulnerabilityScan ---
export const vulnerabilityScanCreateSchema = z.object({
  name: z.string().min(2).max(200),
  targets: z.array(z.string().max(500)),
  scanType: z.enum(['network', 'web_app', 'container', 'dependency', 'secret', 'config']),
  schedule: z.string().max(100).optional(),
  severityThreshold: z.enum(['info', 'low', 'medium', 'high', 'critical']).default('medium'),
  excludePaths: z.array(z.string().max(500)).optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook', 'jira'])),
  autoScan: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

export const vulnerabilityScanUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  targets: z.array(z.string().max(500)).optional(),
  scanType: z.enum(['network', 'web_app', 'container', 'dependency', 'secret', 'config']).optional(),
  schedule: z.string().max(100).optional(),
  severityThreshold: z.enum(['info', 'low', 'medium', 'high', 'critical']).optional(),
  excludePaths: z.array(z.string().max(500)).optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook', 'jira'])).optional(),
  autoScan: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const vulnerabilityScanQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'scanType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  scanType: z.enum(['network', 'web_app', 'container', 'dependency', 'secret', 'config']).optional(),
  enabled: z.boolean().optional(),
});

// --- AccessLog ---
export const accessLogCreateSchema = z.object({
  userId: z.string().uuid(),
  tenantId: z.string().uuid().optional(),
  resource: z.string().min(1).max(500),
  action: z.enum(['login', 'logout', 'create', 'read', 'update', 'delete', 'export', 'share']),
  status: z.enum(['success', 'failure', 'denied']),
  ipAddress: z.string().ip(),
  userAgent: z.string().max(500).optional(),
  sessionId: z.string().max(200).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  riskScore: z.number().int().min(0).max(100).optional(),
});

export const accessLogUpdateSchema = z.object({
  metadata: z.record(z.string(), z.unknown()).optional(),
  riskScore: z.number().int().min(0).max(100).optional(),
});

export const accessLogQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['resource', 'action', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  userId: z.string().uuid().optional(),
  tenantId: z.string().uuid().optional(),
  resource: z.string().max(500).optional(),
  action: z.enum(['login', 'logout', 'create', 'read', 'update', 'delete', 'export', 'share']).optional(),
  status: z.enum(['success', 'failure', 'denied']).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  minRiskScore: z.number().int().min(0).max(100).optional(),
});

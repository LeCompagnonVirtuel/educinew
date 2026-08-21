// Enterprise Platform Types - Cache, Search, Security, High Availability
// Phase 2.10 - EduCI Platform

// =============================================================================
// Enums
// =============================================================================

export const SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

export const CacheStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  ERROR: 'error',
} as const;
export type CacheStatus = (typeof CacheStatus)[keyof typeof CacheStatus];

export const CacheLayerType = {
  REDIS: 'redis',
  MEMCACHED: 'memcached',
  IN_MEMORY: 'in_memory',
  HYBRID: 'hybrid',
} as const;
export type CacheLayerType = (typeof CacheLayerType)[keyof typeof CacheLayerType];

export const EvictionPolicy = {
  LRU: 'lru',
  LFU: 'lfu',
  FIFO: 'fifo',
  RANDOM: 'random',
  TTL: 'ttl',
} as const;
export type EvictionPolicy = (typeof EvictionPolicy)[keyof typeof EvictionPolicy];

export const CacheStrategy = {
  CONSISTENT_HASHING: 'consistent_hashing',
  ROUND_ROBIN: 'round_robin',
  RANDOM: 'random',
  WEIGHTED: 'weighted',
} as const;
export type CacheStrategy = (typeof CacheStrategy)[keyof typeof CacheStrategy];

export const ConsistencyLevel = {
  STRONG: 'strong',
  EVENTUAL: 'eventual',
  WEAK: 'weak',
} as const;
export type ConsistencyLevel = (typeof ConsistencyLevel)[keyof typeof ConsistencyLevel];

export const CacheType = {
  QUERY: 'query',
  API: 'api',
  SESSION: 'session',
  STATIC: 'static',
  CDN: 'cdn',
} as const;
export type CacheType = (typeof CacheType)[keyof typeof CacheType];

export const CacheTrigger = {
  MANUAL: 'manual',
  SCHEDULED: 'scheduled',
  DEPENDENCY: 'dependency',
  EVENT: 'event',
} as const;
export type CacheTrigger = (typeof CacheTrigger)[keyof typeof CacheTrigger];

export const InvalidationStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type InvalidationStatus = (typeof InvalidationStatus)[keyof typeof InvalidationStatus];

export const CacheEntryStatus = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  EVICTED: 'evicted',
  DELETED: 'deleted',
} as const;
export type CacheEntryStatus = (typeof CacheEntryStatus)[keyof typeof CacheEntryStatus];

export const IndexType = {
  FULL_TEXT: 'full_text',
  VECTOR: 'vector',
  GEO: 'geo',
  TIME_SERIES: 'time_series',
  HYBRID: 'hybrid',
} as const;
export type IndexType = (typeof IndexType)[keyof typeof IndexType];

export const SearchStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ERROR: 'error',
  REBUILDING: 'rebuilding',
} as const;
export type SearchStatus = (typeof SearchStatus)[keyof typeof SearchStatus];

export const DocumentStatus = {
  INDEXED: 'indexed',
  PENDING: 'pending',
  FAILED: 'failed',
  DELETED: 'deleted',
} as const;
export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus];

export const ClusterStatus = {
  GREEN: 'green',
  YELLOW: 'yellow',
  RED: 'red',
} as const;
export type ClusterStatus = (typeof ClusterStatus)[keyof typeof ClusterStatus];

export const BuildStatus = {
  PENDING: 'pending',
  BUILDING: 'building',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type BuildStatus = (typeof BuildStatus)[keyof typeof BuildStatus];

export const SyncStatus = {
  SYNCED: 'synced',
  SYNCING: 'syncing',
  ERROR: 'error',
  IDLE: 'idle',
} as const;
export type SyncStatus = (typeof SyncStatus)[keyof typeof SyncStatus];

export const PolicyStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const;
export type PolicyStatus = (typeof PolicyStatus)[keyof typeof PolicyStatus];

export const PolicyEffect = {
  ALLOW: 'allow',
  DENY: 'deny',
} as const;
export type PolicyEffect = (typeof PolicyEffect)[keyof typeof PolicyEffect];

export const RoleStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
} as const;
export type RoleStatus = (typeof RoleStatus)[keyof typeof RoleStatus];

export const PermissionStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  REVOKED: 'revoked',
} as const;
export type PermissionStatus = (typeof PermissionStatus)[keyof typeof PermissionStatus];

export const EvaluationResult = {
  ALLOW: 'allow',
  DENY: 'deny',
  NOT_APPLICABLE: 'not_applicable',
} as const;
export type EvaluationResult = (typeof EvaluationResult)[keyof typeof EvaluationResult];

export const RotationStatus = {
  ACTIVE: 'active',
  PENDING: 'pending',
  FAILED: 'failed',
  DISABLED: 'disabled',
} as const;
export type RotationStatus = (typeof RotationStatus)[keyof typeof RotationStatus];

export const SecurityStatus = {
  SECURE: 'secure',
  WARNING: 'warning',
  CRITICAL: 'critical',
  UNKNOWN: 'unknown',
} as const;
export type SecurityStatus = (typeof SecurityStatus)[keyof typeof SecurityStatus];

export const ThreatSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;
export type ThreatSeverity = (typeof ThreatSeverity)[keyof typeof ThreatSeverity];

export const ThreatStatus = {
  DETECTED: 'detected',
  INVESTIGATING: 'investigating',
  MITIGATED: 'mitigated',
  RESOLVED: 'resolved',
  FALSE_POSITIVE: 'false_positive',
} as const;
export type ThreatStatus = (typeof ThreatStatus)[keyof typeof ThreatStatus];

export const ThreatType = {
  MALWARE: 'malware',
  INTRUSION: 'intrusion',
  DATA_LEAK: 'data_leak',
  BRUTE_FORCE: 'brute_force',
  DDOS: 'ddos',
  PHISHING: 'phishing',
} as const;
export type ThreatType = (typeof ThreatType)[keyof typeof ThreatType];

export const AuditStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type AuditStatus = (typeof AuditStatus)[keyof typeof AuditStatus];

export const AuditScope = {
  GLOBAL: 'global',
  TENANT: 'tenant',
  USER: 'user',
  RESOURCE: 'resource',
} as const;
export type AuditScope = (typeof AuditScope)[keyof typeof AuditScope];

export const FirewallAction = {
  ALLOW: 'allow',
  DENY: 'deny',
  LOG: 'log',
  REDIRECT: 'redirect',
} as const;
export type FirewallAction = (typeof FirewallAction)[keyof typeof FirewallAction];

export const FirewallStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const;
export type FirewallStatus = (typeof FirewallStatus)[keyof typeof FirewallStatus];

export const WhitelistStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
} as const;
export type WhitelistStatus = (typeof WhitelistStatus)[keyof typeof WhitelistStatus];

export const KeyStatus = {
  ACTIVE: 'active',
  ROTATED: 'rotated',
  REVOKED: 'revoked',
  EXPIRED: 'expired',
  PENDING: 'pending',
} as const;
export type KeyStatus = (typeof KeyStatus)[keyof typeof KeyStatus];

export const IncidentSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;
export type IncidentSeverity = (typeof IncidentSeverity)[keyof typeof IncidentSeverity];

export const IncidentStatus = {
  OPEN: 'open',
  INVESTIGATING: 'investigating',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
} as const;
export type IncidentStatus = (typeof IncidentStatus)[keyof typeof IncidentStatus];

export const IncidentType = {
  SECURITY: 'security',
  AVAILABILITY: 'availability',
  PERFORMANCE: 'performance',
  DATA: 'data',
} as const;
export type IncidentType = (typeof IncidentType)[keyof typeof IncidentType];

export const ScanType = {
  VULNERABILITY: 'vulnerability',
  PENETRATION: 'penetration',
  COMPLIANCE: 'compliance',
  CONFIGURATION: 'configuration',
} as const;
export type ScanType = (typeof ScanType)[keyof typeof ScanType];

export const ScanStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type ScanStatus = (typeof ScanStatus)[keyof typeof ScanStatus];

export const AccessLogStatus = {
  GRANTED: 'granted',
  DENIED: 'denied',
  ERROR: 'error',
} as const;
export type AccessLogStatus = (typeof AccessLogStatus)[keyof typeof AccessLogStatus];

export const FailoverStrategy = {
  AUTOMATIC: 'automatic',
  MANUAL: 'manual',
  SEMI_AUTOMATIC: 'semi_automatic',
} as const;
export type FailoverStrategy = (typeof FailoverStrategy)[keyof typeof FailoverStrategy];

export const FailoverStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  TESTING: 'testing',
} as const;
export type FailoverStatus = (typeof FailoverStatus)[keyof typeof FailoverStatus];

export const FailoverEventStatus = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in_progress',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;
export type FailoverEventStatus = (typeof FailoverEventStatus)[keyof typeof FailoverEventStatus];

export const ReplicationType = {
  SYNCHRONOUS: 'synchronous',
  ASYNCHRONOUS: 'asynchronous',
  SEMI_SYNCHRONOUS: 'semi_synchronous',
} as const;
export type ReplicationType = (typeof ReplicationType)[keyof typeof ReplicationType];

export const ReplicationStatus = {
  ACTIVE: 'active',
  LAGGING: 'lagging',
  STOPPED: 'stopped',
  ERROR: 'error',
} as const;
export type ReplicationStatus = (typeof ReplicationStatus)[keyof typeof ReplicationStatus];

export const SyncMode = {
  ASYNC: 'async',
  SYNC: 'sync',
  NEAR_REAL_TIME: 'near_real_time',
} as const;
export type SyncMode = (typeof SyncMode)[keyof typeof SyncMode];

export const HealthStatus = {
  HEALTHY: 'healthy',
  DEGRADED: 'degraded',
  UNHEALTHY: 'unhealthy',
} as const;
export type HealthStatus = (typeof HealthStatus)[keyof typeof HealthStatus];

export const StatusCode = {
  HEALTHY: 'healthy',
  DEGRADED: 'degraded',
  UNHEALTHY: 'unhealthy',
  UNKNOWN: 'unknown',
} as const;
export type StatusCode = (typeof StatusCode)[keyof typeof StatusCode];

export const RecoveryAction = {
  RESTART: 'restart',
  FAILOVER: 'failover',
  SCALE_UP: 'scale_up',
  NOTIFY: 'notify',
  ROLLBACK: 'rollback',
} as const;
export type RecoveryAction = (typeof RecoveryAction)[keyof typeof RecoveryAction];

export const RecoveryStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISABLED: 'disabled',
} as const;
export type RecoveryStatus = (typeof RecoveryStatus)[keyof typeof RecoveryStatus];

export const BackupType = {
  FULL: 'full',
  INCREMENTAL: 'incremental',
  DIFFERENTIAL: 'differential',
  SNAPSHOT: 'snapshot',
} as const;
export type BackupType = (typeof BackupType)[keyof typeof BackupType];

export const BackupStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;
export type BackupStatus = (typeof BackupStatus)[keyof typeof BackupStatus];

export const DRStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  TESTED: 'tested',
  ARCHIVED: 'archived',
} as const;
export type DRStatus = (typeof DRStatus)[keyof typeof DRStatus];

export const RegionStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
} as const;
export type RegionStatus = (typeof RegionStatus)[keyof typeof RegionStatus];

export const LoadBalancerStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAINING: 'draining',
} as const;
export type LoadBalancerStatus = (typeof LoadBalancerStatus)[keyof typeof LoadBalancerStatus];

export const CacheHitStatus = {
  HIT: 'hit',
  MISS: 'miss',
} as const;
export type CacheHitStatus = (typeof CacheHitStatus)[keyof typeof CacheHitStatus];

export const QueryCacheStatus = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  DISABLED: 'disabled',
} as const;
export type QueryCacheStatus = (typeof QueryCacheStatus)[keyof typeof QueryCacheStatus];

export const ApiCacheStatus = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  DISABLED: 'disabled',
} as const;
export type ApiCacheStatus = (typeof ApiCacheStatus)[keyof typeof ApiCacheStatus];

export const CacheWarmerStatus = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  FAILED: 'failed',
} as const;
export type CacheWarmerStatus = (typeof CacheWarmerStatus)[keyof typeof CacheWarmerStatus];

export const CacheSnapshotStatus = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  CORRUPTED: 'corrupted',
} as const;
export type CacheSnapshotStatus = (typeof CacheSnapshotStatus)[keyof typeof CacheSnapshotStatus];

export const CachePolicyStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
} as const;
export type CachePolicyStatus = (typeof CachePolicyStatus)[keyof typeof CachePolicyStatus];

export const CacheClusterStatus = {
  ACTIVE: 'active',
  DEGRADED: 'degraded',
  OFFLINE: 'offline',
} as const;
export type CacheClusterStatus = (typeof CacheClusterStatus)[keyof typeof CacheClusterStatus];

export const SearchSuggestionStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const;
export type SearchSuggestionStatus = (typeof SearchSuggestionStatus)[keyof typeof SearchSuggestionStatus];

export const SearchAnalyticsStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;
export type SearchAnalyticsStatus = (typeof SearchAnalyticsStatus)[keyof typeof SearchAnalyticsStatus];

export const SearchRelevanceStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;
export type SearchRelevanceStatus = (typeof SearchRelevanceStatus)[keyof typeof SearchRelevanceStatus];

export const SearchSynonymStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const;
export type SearchSynonymStatus = (typeof SearchSynonymStatus)[keyof typeof SearchSynonymStatus];

export const PeopleSearchStatus = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type PeopleSearchStatus = (typeof PeopleSearchStatus)[keyof typeof PeopleSearchStatus];

export const SchoolSearchStatus = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type SchoolSearchStatus = (typeof SchoolSearchStatus)[keyof typeof SchoolSearchStatus];

export const AnalyticsSearchStatus = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type AnalyticsSearchStatus = (typeof AnalyticsSearchStatus)[keyof typeof AnalyticsSearchStatus];

export const AccessStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  REVOKED: 'revoked',
} as const;
export type AccessStatus = (typeof AccessStatus)[keyof typeof AccessStatus];

export const ZeroTrustStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
} as const;
export type ZeroTrustStatus = (typeof ZeroTrustStatus)[keyof typeof ZeroTrustStatus];

// =============================================================================
// Domain 5 - Cache Platform
// =============================================================================

export interface RedisCluster {
  id: string;
  name: string;
  endpoint: string;
  port: number;
  memory_mb: number;
  status: CacheStatus;
  created_at: string;
  updated_at: string;
}

export interface RedisClusterCreate {
  name: string;
  endpoint: string;
  port: number;
  memory_mb: number;
  status: CacheStatus;
}

export interface RedisClusterUpdate {
  name?: string;
  endpoint?: string;
  port?: number;
  memory_mb?: number;
  status?: CacheStatus;
}

export interface RedisClusterQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface CacheLayer {
  id: string;
  name: string;
  type: CacheLayerType;
  ttl_seconds: number;
  max_entries: number;
  eviction_policy: EvictionPolicy;
  status: CacheStatus;
  created_at: string;
  updated_at: string;
}

export interface CacheLayerCreate {
  name: string;
  type: CacheLayerType;
  ttl_seconds: number;
  max_entries: number;
  eviction_policy: EvictionPolicy;
  status: CacheStatus;
}

export interface CacheLayerUpdate {
  name?: string;
  type?: CacheLayerType;
  ttl_seconds?: number;
  max_entries?: number;
  eviction_policy?: EvictionPolicy;
  status?: CacheStatus;
}

export interface CacheLayerQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface CacheEntry {
  id: string;
  layer_id: string;
  key: string;
  value_hash: string;
  size_bytes: number;
  ttl_seconds: number;
  hits: number;
  status: CacheEntryStatus;
  created_at: string;
  updated_at: string;
}

export interface CacheEntryCreate {
  layer_id: string;
  key: string;
  value_hash: string;
  size_bytes: number;
  ttl_seconds: number;
  hits: number;
  status: CacheEntryStatus;
}

export interface CacheEntryUpdate {
  layer_id?: string;
  key?: string;
  value_hash?: string;
  size_bytes?: number;
  ttl_seconds?: number;
  hits?: number;
  status?: CacheEntryStatus;
}

export interface CacheEntryQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface DistributedCache {
  id: string;
  name: string;
  strategy: CacheStrategy;
  replication_factor: number;
  consistency_level: ConsistencyLevel;
  status: CacheStatus;
  created_at: string;
  updated_at: string;
}

export interface DistributedCacheCreate {
  name: string;
  strategy: CacheStrategy;
  replication_factor: number;
  consistency_level: ConsistencyLevel;
  status: CacheStatus;
}

export interface DistributedCacheUpdate {
  name?: string;
  strategy?: CacheStrategy;
  replication_factor?: number;
  consistency_level?: ConsistencyLevel;
  status?: CacheStatus;
}

export interface DistributedCacheQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface QueryCache {
  id: string;
  query_hash: string;
  result_hash: string;
  duration_ms: number;
  hit_count: number;
  miss_count: number;
  status: QueryCacheStatus;
  created_at: string;
  updated_at: string;
}

export interface QueryCacheCreate {
  query_hash: string;
  result_hash: string;
  duration_ms: number;
  hit_count: number;
  miss_count: number;
  status: QueryCacheStatus;
}

export interface QueryCacheUpdate {
  query_hash?: string;
  result_hash?: string;
  duration_ms?: number;
  hit_count?: number;
  miss_count?: number;
  status?: QueryCacheStatus;
}

export interface QueryCacheQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface ApiCache {
  id: string;
  endpoint: string;
  method: string;
  response_hash: string;
  ttl_seconds: number;
  hit_count: number;
  status: ApiCacheStatus;
  created_at: string;
  updated_at: string;
}

export interface ApiCacheCreate {
  endpoint: string;
  method: string;
  response_hash: string;
  ttl_seconds: number;
  hit_count: number;
  status: ApiCacheStatus;
}

export interface ApiCacheUpdate {
  endpoint?: string;
  method?: string;
  response_hash?: string;
  ttl_seconds?: number;
  hit_count?: number;
  status?: ApiCacheStatus;
}

export interface ApiCacheQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface CacheInvalidation {
  id: string;
  cache_type: CacheType;
  keys: string;
  pattern: string;
  triggered_by: CacheTrigger;
  status: InvalidationStatus;
  created_at: string;
  updated_at: string;
}

export interface CacheInvalidationCreate {
  cache_type: CacheType;
  keys: string;
  pattern: string;
  triggered_by: CacheTrigger;
  status: InvalidationStatus;
}

export interface CacheInvalidationUpdate {
  cache_type?: CacheType;
  keys?: string;
  pattern?: string;
  triggered_by?: CacheTrigger;
  status?: InvalidationStatus;
}

export interface CacheInvalidationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface CacheMetrics {
  id: string;
  layer_id: string;
  hit_rate: number;
  miss_rate: number;
  eviction_count: number;
  memory_usage: number;
  period: string;
  status: CacheStatus;
  created_at: string;
  updated_at: string;
}

export interface CacheMetricsCreate {
  layer_id: string;
  hit_rate: number;
  miss_rate: number;
  eviction_count: number;
  memory_usage: number;
  period: string;
  status: CacheStatus;
}

export interface CacheMetricsUpdate {
  layer_id?: string;
  hit_rate?: number;
  miss_rate?: number;
  eviction_count?: number;
  memory_usage?: number;
  period?: string;
  status?: CacheStatus;
}

export interface CacheMetricsQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface CacheWarmer {
  id: string;
  name: string;
  schedule: string;
  keys_pattern: string;
  source_query: string;
  status: CacheWarmerStatus;
  created_at: string;
  updated_at: string;
}

export interface CacheWarmerCreate {
  name: string;
  schedule: string;
  keys_pattern: string;
  source_query: string;
  status: CacheWarmerStatus;
}

export interface CacheWarmerUpdate {
  name?: string;
  schedule?: string;
  keys_pattern?: string;
  source_query?: string;
  status?: CacheWarmerStatus;
}

export interface CacheWarmerQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface CacheSnapshot {
  id: string;
  layer_id: string;
  size_bytes: number;
  entries_count: number;
  created_at: string;
  restored_at: string;
  status: CacheSnapshotStatus;
  created_at2: string;
  updated_at: string;
}

export interface CacheSnapshotCreate {
  layer_id: string;
  size_bytes: number;
  entries_count: number;
  created_at: string;
  restored_at: string;
  status: CacheSnapshotStatus;
  created_at2: string;
}

export interface CacheSnapshotUpdate {
  layer_id?: string;
  size_bytes?: number;
  entries_count?: number;
  created_at?: string;
  restored_at?: string;
  status?: CacheSnapshotStatus;
  created_at2?: string;
}

export interface CacheSnapshotQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface CachePolicy {
  id: string;
  name: string;
  rules: string;
  priority: number;
  enabled: boolean;
  status: CachePolicyStatus;
  created_at: string;
  updated_at: string;
}

export interface CachePolicyCreate {
  name: string;
  rules: string;
  priority: number;
  enabled: boolean;
  status: CachePolicyStatus;
}

export interface CachePolicyUpdate {
  name?: string;
  rules?: string;
  priority?: number;
  enabled?: boolean;
  status?: CachePolicyStatus;
}

export interface CachePolicyQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface CacheCluster {
  id: string;
  name: string;
  nodes: string;
  primary_node_id: string;
  status: CacheClusterStatus;
  created_at: string;
  updated_at: string;
}

export interface CacheClusterCreate {
  name: string;
  nodes: string;
  primary_node_id: string;
  status: CacheClusterStatus;
}

export interface CacheClusterUpdate {
  name?: string;
  nodes?: string;
  primary_node_id?: string;
  status?: CacheClusterStatus;
}

export interface CacheClusterQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

// =============================================================================
// Domain 6 - Search Platform
// =============================================================================

export interface SearchIndex {
  id: string;
  name: string;
  type: IndexType;
  schema: string;
  status: SearchStatus;
  created_at: string;
  updated_at: string;
}

export interface SearchIndexCreate {
  name: string;
  type: IndexType;
  schema: string;
  status: SearchStatus;
}

export interface SearchIndexUpdate {
  name?: string;
  type?: IndexType;
  schema?: string;
  status?: SearchStatus;
}

export interface SearchIndexQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface SearchDocument {
  id: string;
  index_id: string;
  document_type: string;
  document_id: string;
  content: string;
  metadata: string;
  status: DocumentStatus;
  created_at: string;
  updated_at: string;
}

export interface SearchDocumentCreate {
  index_id: string;
  document_type: string;
  document_id: string;
  content: string;
  metadata: string;
  status: DocumentStatus;
}

export interface SearchDocumentUpdate {
  index_id?: string;
  document_type?: string;
  document_id?: string;
  content?: string;
  metadata?: string;
  status?: DocumentStatus;
}

export interface SearchDocumentQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface SearchQuery {
  id: string;
  index_id: string;
  query_text: string;
  filters: string;
  sort: string;
  page: number;
  limit: number;
  duration_ms: number;
  result_count: number;
  status: SearchStatus;
  created_at: string;
  updated_at: string;
}

export interface SearchQueryCreate {
  index_id: string;
  query_text: string;
  filters: string;
  sort: string;
  page: number;
  limit: number;
  duration_ms: number;
  result_count: number;
  status: SearchStatus;
}

export interface SearchQueryUpdate {
  index_id?: string;
  query_text?: string;
  filters?: string;
  sort?: string;
  page?: number;
  limit?: number;
  duration_ms?: number;
  result_count?: number;
  status?: SearchStatus;
}

export interface SearchQueryQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface SearchSuggestion {
  id: string;
  index_id: string;
  term: string;
  frequency: number;
  score: number;
  status: SearchSuggestionStatus;
  created_at: string;
  updated_at: string;
}

export interface SearchSuggestionCreate {
  index_id: string;
  term: string;
  frequency: number;
  score: number;
  status: SearchSuggestionStatus;
}

export interface SearchSuggestionUpdate {
  index_id?: string;
  term?: string;
  frequency?: number;
  score?: number;
  status?: SearchSuggestionStatus;
}

export interface SearchSuggestionQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface SearchAnalytics {
  id: string;
  index_id: string;
  query_text: string;
  clicks: number;
  impressions: number;
  ctr: number;
  status: SearchAnalyticsStatus;
  created_at: string;
  updated_at: string;
}

export interface SearchAnalyticsCreate {
  index_id: string;
  query_text: string;
  clicks: number;
  impressions: number;
  ctr: number;
  status: SearchAnalyticsStatus;
}

export interface SearchAnalyticsUpdate {
  index_id?: string;
  query_text?: string;
  clicks?: number;
  impressions?: number;
  ctr?: number;
  status?: SearchAnalyticsStatus;
}

export interface SearchAnalyticsQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface GlobalSearchConfig {
  id: string;
  name: string;
  indices: string;
  settings: string;
  status: SearchStatus;
  created_at: string;
  updated_at: string;
}

export interface GlobalSearchConfigCreate {
  name: string;
  indices: string;
  settings: string;
  status: SearchStatus;
}

export interface GlobalSearchConfigUpdate {
  name?: string;
  indices?: string;
  settings?: string;
  status?: SearchStatus;
}

export interface GlobalSearchConfigQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface ElasticCluster {
  id: string;
  name: string;
  nodes: string;
  endpoint: string;
  status: ClusterStatus;
  created_at: string;
  updated_at: string;
}

export interface ElasticClusterCreate {
  name: string;
  nodes: string;
  endpoint: string;
  status: ClusterStatus;
}

export interface ElasticClusterUpdate {
  name?: string;
  nodes?: string;
  endpoint?: string;
  status?: ClusterStatus;
}

export interface ElasticClusterQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface IndexBuilder {
  id: string;
  index_id: string;
  source_type: string;
  mapping: string;
  pipeline: string;
  status: BuildStatus;
  created_at: string;
  updated_at: string;
}

export interface IndexBuilderCreate {
  index_id: string;
  source_type: string;
  mapping: string;
  pipeline: string;
  status: BuildStatus;
}

export interface IndexBuilderUpdate {
  index_id?: string;
  source_type?: string;
  mapping?: string;
  pipeline?: string;
  status?: BuildStatus;
}

export interface IndexBuilderQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface IncrementalIndex {
  id: string;
  index_id: string;
  last_synced_id: string;
  batch_size: number;
  sync_interval: number;
  status: SyncStatus;
  created_at: string;
  updated_at: string;
}

export interface IncrementalIndexCreate {
  index_id: string;
  last_synced_id: string;
  batch_size: number;
  sync_interval: number;
  status: SyncStatus;
}

export interface IncrementalIndexUpdate {
  index_id?: string;
  last_synced_id?: string;
  batch_size?: number;
  sync_interval?: number;
  status?: SyncStatus;
}

export interface IncrementalIndexQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface PeopleSearch {
  id: string;
  school_id: string;
  query_text: string;
  filters: string;
  result_count: number;
  status: PeopleSearchStatus;
  created_at: string;
  updated_at: string;
}

export interface PeopleSearchCreate {
  school_id: string;
  query_text: string;
  filters: string;
  result_count: number;
  status: PeopleSearchStatus;
}

export interface PeopleSearchUpdate {
  school_id?: string;
  query_text?: string;
  filters?: string;
  result_count?: number;
  status?: PeopleSearchStatus;
}

export interface PeopleSearchQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface SchoolSearch {
  id: string;
  region_id: string;
  query_text: string;
  filters: string;
  result_count: number;
  status: SchoolSearchStatus;
  created_at: string;
  updated_at: string;
}

export interface SchoolSearchCreate {
  region_id: string;
  query_text: string;
  filters: string;
  result_count: number;
  status: SchoolSearchStatus;
}

export interface SchoolSearchUpdate {
  region_id?: string;
  query_text?: string;
  filters?: string;
  result_count?: number;
  status?: SchoolSearchStatus;
}

export interface SchoolSearchQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface AnalyticsSearch {
  id: string;
  query_text: string;
  date_range: string;
  filters: string;
  result_count: number;
  status: AnalyticsSearchStatus;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsSearchCreate {
  query_text: string;
  date_range: string;
  filters: string;
  result_count: number;
  status: AnalyticsSearchStatus;
}

export interface AnalyticsSearchUpdate {
  query_text?: string;
  date_range?: string;
  filters?: string;
  result_count?: number;
  status?: AnalyticsSearchStatus;
}

export interface AnalyticsSearchQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface SearchRelevance {
  id: string;
  index_id: string;
  query_text: string;
  document_id: string;
  score: number;
  feedback: string;
  status: SearchRelevanceStatus;
  created_at: string;
  updated_at: string;
}

export interface SearchRelevanceCreate {
  index_id: string;
  query_text: string;
  document_id: string;
  score: number;
  feedback: string;
  status: SearchRelevanceStatus;
}

export interface SearchRelevanceUpdate {
  index_id?: string;
  query_text?: string;
  document_id?: string;
  score?: number;
  feedback?: string;
  status?: SearchRelevanceStatus;
}

export interface SearchRelevanceQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface SearchSynonym {
  id: string;
  index_id: string;
  term: string;
  synonyms: string;
  status: SearchSynonymStatus;
  created_at: string;
  updated_at: string;
}

export interface SearchSynonymCreate {
  index_id: string;
  term: string;
  synonyms: string;
  status: SearchSynonymStatus;
}

export interface SearchSynonymUpdate {
  index_id?: string;
  term?: string;
  synonyms?: string;
  status?: SearchSynonymStatus;
}

export interface SearchSynonymQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

// =============================================================================
// Domain 7 - Security Enterprise
// =============================================================================

export interface ZeroTrustPolicy {
  id: string;
  name: string;
  description: string;
  conditions: string;
  actions: string;
  priority: number;
  enabled: boolean;
  status: ZeroTrustStatus;
  created_at: string;
  updated_at: string;
}

export interface ZeroTrustPolicyCreate {
  name: string;
  description: string;
  conditions: string;
  actions: string;
  priority: number;
  enabled: boolean;
  status: ZeroTrustStatus;
}

export interface ZeroTrustPolicyUpdate {
  name?: string;
  description?: string;
  conditions?: string;
  actions?: string;
  priority?: number;
  enabled?: boolean;
  status?: ZeroTrustStatus;
}

export interface ZeroTrustPolicyQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface AccessPolicy {
  id: string;
  name: string;
  description: string;
  effect: PolicyEffect;
  principals: string;
  resources: string;
  conditions: string;
  priority: number;
  status: PolicyStatus;
  created_at: string;
  updated_at: string;
}

export interface AccessPolicyCreate {
  name: string;
  description: string;
  effect: PolicyEffect;
  principals: string;
  resources: string;
  conditions: string;
  priority: number;
  status: PolicyStatus;
}

export interface AccessPolicyUpdate {
  name?: string;
  description?: string;
  effect?: PolicyEffect;
  principals?: string;
  resources?: string;
  conditions?: string;
  priority?: number;
  status?: PolicyStatus;
}

export interface AccessPolicyQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string;
  inherits_from: string;
  is_system: boolean;
  status: RoleStatus;
  created_at: string;
  updated_at: string;
}

export interface RoleCreate {
  name: string;
  description: string;
  permissions: string;
  inherits_from: string;
  is_system: boolean;
  status: RoleStatus;
}

export interface RoleUpdate {
  name?: string;
  description?: string;
  permissions?: string;
  inherits_from?: string;
  is_system?: boolean;
  status?: RoleStatus;
}

export interface RoleQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  conditions: string;
  status: PermissionStatus;
  created_at: string;
  updated_at: string;
}

export interface PermissionCreate {
  name: string;
  description: string;
  resource: string;
  action: string;
  conditions: string;
  status: PermissionStatus;
}

export interface PermissionUpdate {
  name?: string;
  description?: string;
  resource?: string;
  action?: string;
  conditions?: string;
  status?: PermissionStatus;
}

export interface PermissionQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface AbacPolicy {
  id: string;
  name: string;
  description: string;
  attribute_conditions: string;
  effect: PolicyEffect;
  priority: number;
  enabled: boolean;
  status: PolicyStatus;
  created_at: string;
  updated_at: string;
}

export interface AbacPolicyCreate {
  name: string;
  description: string;
  attribute_conditions: string;
  effect: PolicyEffect;
  priority: number;
  enabled: boolean;
  status: PolicyStatus;
}

export interface AbacPolicyUpdate {
  name?: string;
  description?: string;
  attribute_conditions?: string;
  effect?: PolicyEffect;
  priority?: number;
  enabled?: boolean;
  status?: PolicyStatus;
}

export interface AbacPolicyQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface PolicyEvaluation {
  id: string;
  policy_id: string;
  principal: string;
  resource: string;
  action: string;
  result: EvaluationResult;
  evaluated_at: string;
  status: PolicyStatus;
  created_at: string;
  updated_at: string;
}

export interface PolicyEvaluationCreate {
  policy_id: string;
  principal: string;
  resource: string;
  action: string;
  result: EvaluationResult;
  evaluated_at: string;
  status: PolicyStatus;
}

export interface PolicyEvaluationUpdate {
  policy_id?: string;
  principal?: string;
  resource?: string;
  action?: string;
  result?: EvaluationResult;
  evaluated_at?: string;
  status?: PolicyStatus;
}

export interface PolicyEvaluationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface SecretRotation {
  id: string;
  secret_type: string;
  secret_name: string;
  rotation_interval_days: number;
  last_rotated_at: string;
  next_rotation_at: string;
  status: RotationStatus;
  created_at: string;
  updated_at: string;
}

export interface SecretRotationCreate {
  secret_type: string;
  secret_name: string;
  rotation_interval_days: number;
  last_rotated_at: string;
  next_rotation_at: string;
  status: RotationStatus;
}

export interface SecretRotationUpdate {
  secret_type?: string;
  secret_name?: string;
  rotation_interval_days?: number;
  last_rotated_at?: string;
  next_rotation_at?: string;
  status?: RotationStatus;
}

export interface SecretRotationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface SecurityCenter {
  id: string;
  name: string;
  score: number;
  threats_detected: number;
  vulnerabilities_found: number;
  last_scan_at: string;
  status: SecurityStatus;
  created_at: string;
  updated_at: string;
}

export interface SecurityCenterCreate {
  name: string;
  score: number;
  threats_detected: number;
  vulnerabilities_found: number;
  last_scan_at: string;
  status: SecurityStatus;
}

export interface SecurityCenterUpdate {
  name?: string;
  score?: number;
  threats_detected?: number;
  vulnerabilities_found?: number;
  last_scan_at?: string;
  status?: SecurityStatus;
}

export interface SecurityCenterQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface ThreatDetection {
  id: string;
  threat_type: ThreatType;
  severity: ThreatSeverity;
  source_ip: string;
  target: string;
  description: string;
  detected_at: string;
  status: ThreatStatus;
  created_at: string;
  updated_at: string;
}

export interface ThreatDetectionCreate {
  threat_type: ThreatType;
  severity: ThreatSeverity;
  source_ip: string;
  target: string;
  description: string;
  detected_at: string;
  status: ThreatStatus;
}

export interface ThreatDetectionUpdate {
  threat_type?: ThreatType;
  severity?: ThreatSeverity;
  source_ip?: string;
  target?: string;
  description?: string;
  detected_at?: string;
  status?: ThreatStatus;
}

export interface ThreatDetectionQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface SecurityAudit {
  id: string;
  audit_type: string;
  scope: AuditScope;
  findings_count: number;
  score: number;
  completed_at: string;
  status: AuditStatus;
  created_at: string;
  updated_at: string;
}

export interface SecurityAuditCreate {
  audit_type: string;
  scope: AuditScope;
  findings_count: number;
  score: number;
  completed_at: string;
  status: AuditStatus;
}

export interface SecurityAuditUpdate {
  audit_type?: string;
  scope?: AuditScope;
  findings_count?: number;
  score?: number;
  completed_at?: string;
  status?: AuditStatus;
}

export interface SecurityAuditQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface FirewallRule {
  id: string;
  name: string;
  source_cidr: string;
  destination_port: number;
  protocol: string;
  action: FirewallAction;
  priority: number;
  enabled: boolean;
  status: FirewallStatus;
  created_at: string;
  updated_at: string;
}

export interface FirewallRuleCreate {
  name: string;
  source_cidr: string;
  destination_port: number;
  protocol: string;
  action: FirewallAction;
  priority: number;
  enabled: boolean;
  status: FirewallStatus;
}

export interface FirewallRuleUpdate {
  name?: string;
  source_cidr?: string;
  destination_port?: number;
  protocol?: string;
  action?: FirewallAction;
  priority?: number;
  enabled?: boolean;
  status?: FirewallStatus;
}

export interface FirewallRuleQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface IpWhitelist {
  id: string;
  ip_address: string;
  cidr: string;
  description: string;
  enabled: boolean;
  expires_at: string;
  status: WhitelistStatus;
  created_at: string;
  updated_at: string;
}

export interface IpWhitelistCreate {
  ip_address: string;
  cidr: string;
  description: string;
  enabled: boolean;
  expires_at: string;
  status: WhitelistStatus;
}

export interface IpWhitelistUpdate {
  ip_address?: string;
  cidr?: string;
  description?: string;
  enabled?: boolean;
  expires_at?: string;
  status?: WhitelistStatus;
}

export interface IpWhitelistQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface EncryptionKey {
  id: string;
  name: string;
  algorithm: string;
  key_size: number;
  rotated_at: string;
  expires_at: string;
  status: KeyStatus;
  created_at: string;
  updated_at: string;
}

export interface EncryptionKeyCreate {
  name: string;
  algorithm: string;
  key_size: number;
  rotated_at: string;
  expires_at: string;
  status: KeyStatus;
}

export interface EncryptionKeyUpdate {
  name?: string;
  algorithm?: string;
  key_size?: number;
  rotated_at?: string;
  expires_at?: string;
  status?: KeyStatus;
}

export interface EncryptionKeyQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface SecurityIncident {
  id: string;
  severity: IncidentSeverity;
  title: string;
  description: string;
  affected_tenants: string;
  detected_at: string;
  resolved_at: string;
  status: IncidentStatus;
  created_at: string;
  updated_at: string;
}

export interface SecurityIncidentCreate {
  severity: IncidentSeverity;
  title: string;
  description: string;
  affected_tenants: string;
  detected_at: string;
  resolved_at: string;
  status: IncidentStatus;
}

export interface SecurityIncidentUpdate {
  severity?: IncidentSeverity;
  title?: string;
  description?: string;
  affected_tenants?: string;
  detected_at?: string;
  resolved_at?: string;
  status?: IncidentStatus;
}

export interface SecurityIncidentQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface VulnerabilityScan {
  id: string;
  scan_type: ScanType;
  target: string;
  findings_count: number;
  critical_count: number;
  high_count: number;
  medium_count: number;
  scanned_at: string;
  status: ScanStatus;
  created_at: string;
  updated_at: string;
}

export interface VulnerabilityScanCreate {
  scan_type: ScanType;
  target: string;
  findings_count: number;
  critical_count: number;
  high_count: number;
  medium_count: number;
  scanned_at: string;
  status: ScanStatus;
}

export interface VulnerabilityScanUpdate {
  scan_type?: ScanType;
  target?: string;
  findings_count?: number;
  critical_count?: number;
  high_count?: number;
  medium_count?: number;
  scanned_at?: string;
  status?: ScanStatus;
}

export interface VulnerabilityScanQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface AccessLog {
  id: string;
  user_id: string;
  action: string;
  resource: string;
  ip_address: string;
  user_agent: string;
  granted: boolean;
  timestamp: string;
  status: AccessLogStatus;
  created_at: string;
  updated_at: string;
}

export interface AccessLogCreate {
  user_id: string;
  action: string;
  resource: string;
  ip_address: string;
  user_agent: string;
  granted: boolean;
  timestamp: string;
  status: AccessLogStatus;
}

export interface AccessLogUpdate {
  user_id?: string;
  action?: string;
  resource?: string;
  ip_address?: string;
  user_agent?: string;
  granted?: boolean;
  timestamp?: string;
  status?: AccessLogStatus;
}

export interface AccessLogQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

// =============================================================================
// Domain 8 - High Availability
// =============================================================================

export interface FailoverConfig {
  id: string;
  service_name: string;
  primary_region: string;
  secondary_region: string;
  failover_strategy: FailoverStrategy;
  status: FailoverStatus;
  created_at: string;
  updated_at: string;
}

export interface FailoverConfigCreate {
  service_name: string;
  primary_region: string;
  secondary_region: string;
  failover_strategy: FailoverStrategy;
  status: FailoverStatus;
}

export interface FailoverConfigUpdate {
  service_name?: string;
  primary_region?: string;
  secondary_region?: string;
  failover_strategy?: FailoverStrategy;
  status?: FailoverStatus;
}

export interface FailoverConfigQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface FailoverEvent {
  id: string;
  config_id: string;
  from_region: string;
  to_region: string;
  reason: string;
  duration_ms: number;
  status: FailoverEventStatus;
  created_at: string;
  updated_at: string;
}

export interface FailoverEventCreate {
  config_id: string;
  from_region: string;
  to_region: string;
  reason: string;
  duration_ms: number;
  status: FailoverEventStatus;
}

export interface FailoverEventUpdate {
  config_id?: string;
  from_region?: string;
  to_region?: string;
  reason?: string;
  duration_ms?: number;
  status?: FailoverEventStatus;
}

export interface FailoverEventQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface Replication {
  id: string;
  source_db: string;
  target_db: string;
  replication_type: ReplicationType;
  lag_ms: number;
  status: ReplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface ReplicationCreate {
  source_db: string;
  target_db: string;
  replication_type: ReplicationType;
  lag_ms: number;
  status: ReplicationStatus;
}

export interface ReplicationUpdate {
  source_db?: string;
  target_db?: string;
  replication_type?: ReplicationType;
  lag_ms?: number;
  status?: ReplicationStatus;
}

export interface ReplicationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface GeoReplication {
  id: string;
  source_region: string;
  target_regions: string;
  sync_mode: SyncMode;
  lag_ms: number;
  status: ReplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface GeoReplicationCreate {
  source_region: string;
  target_regions: string;
  sync_mode: SyncMode;
  lag_ms: number;
  status: ReplicationStatus;
}

export interface GeoReplicationUpdate {
  source_region?: string;
  target_regions?: string;
  sync_mode?: SyncMode;
  lag_ms?: number;
  status?: ReplicationStatus;
}

export interface GeoReplicationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface HealthCheck {
  id: string;
  service_name: string;
  endpoint: string;
  interval_seconds: number;
  timeout_seconds: number;
  status: HealthStatus;
  created_at: string;
  updated_at: string;
}

export interface HealthCheckCreate {
  service_name: string;
  endpoint: string;
  interval_seconds: number;
  timeout_seconds: number;
  status: HealthStatus;
}

export interface HealthCheckUpdate {
  service_name?: string;
  endpoint?: string;
  interval_seconds?: number;
  timeout_seconds?: number;
  status?: HealthStatus;
}

export interface HealthCheckQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface HealthStatusEntity {
  id: string;
  service_name: string;
  status_code: StatusCode;
  response_time_ms: number;
  last_checked: string;
  message: string;
  status: HealthStatus;
  created_at: string;
  updated_at: string;
}

export interface HealthStatusEntityCreate {
  service_name: string;
  status_code: StatusCode;
  response_time_ms: number;
  last_checked: string;
  message: string;
  status: HealthStatus;
}

export interface HealthStatusEntityUpdate {
  service_name?: string;
  status_code?: StatusCode;
  response_time_ms?: number;
  last_checked?: string;
  message?: string;
  status?: HealthStatus;
}

export interface HealthStatusEntityQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface AutoRecovery {
  id: string;
  service_name: string;
  trigger_condition: string;
  recovery_action: RecoveryAction;
  max_attempts: number;
  status: RecoveryStatus;
  created_at: string;
  updated_at: string;
}

export interface AutoRecoveryCreate {
  service_name: string;
  trigger_condition: string;
  recovery_action: RecoveryAction;
  max_attempts: number;
  status: RecoveryStatus;
}

export interface AutoRecoveryUpdate {
  service_name?: string;
  trigger_condition?: string;
  recovery_action?: RecoveryAction;
  max_attempts?: number;
  status?: RecoveryStatus;
}

export interface AutoRecoveryQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface RecoveryAttempt {
  id: string;
  recovery_id: string;
  attempt_number: number;
  started_at: string;
  completed_at: string;
  success: boolean;
  error_message: string;
  status: RecoveryStatus;
  created_at: string;
  updated_at: string;
}

export interface RecoveryAttemptCreate {
  recovery_id: string;
  attempt_number: number;
  started_at: string;
  completed_at: string;
  success: boolean;
  error_message: string;
  status: RecoveryStatus;
}

export interface RecoveryAttemptUpdate {
  recovery_id?: string;
  attempt_number?: number;
  started_at?: string;
  completed_at?: string;
  success?: boolean;
  error_message?: string;
  status?: RecoveryStatus;
}

export interface RecoveryAttemptQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface BackupSchedule {
  id: string;
  name: string;
  backup_type: BackupType;
  frequency: string;
  retention_days: number;
  next_run_at: string;
  status: BackupStatus;
  created_at: string;
  updated_at: string;
}

export interface BackupScheduleCreate {
  name: string;
  backup_type: BackupType;
  frequency: string;
  retention_days: number;
  next_run_at: string;
  status: BackupStatus;
}

export interface BackupScheduleUpdate {
  name?: string;
  backup_type?: BackupType;
  frequency?: string;
  retention_days?: number;
  next_run_at?: string;
  status?: BackupStatus;
}

export interface BackupScheduleQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface BackupJob {
  id: string;
  schedule_id: string;
  started_at: string;
  completed_at: string;
  size_bytes: number;
  status: BackupStatus;
  created_at: string;
  updated_at: string;
}

export interface BackupJobCreate {
  schedule_id: string;
  started_at: string;
  completed_at: string;
  size_bytes: number;
  status: BackupStatus;
}

export interface BackupJobUpdate {
  schedule_id?: string;
  started_at?: string;
  completed_at?: string;
  size_bytes?: number;
  status?: BackupStatus;
}

export interface BackupJobQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface DisasterRecoveryPlan {
  id: string;
  name: string;
  description: string;
  rto_minutes: number;
  rpo_minutes: number;
  steps: string;
  last_tested_at: string;
  status: DRStatus;
  created_at: string;
  updated_at: string;
}

export interface DisasterRecoveryPlanCreate {
  name: string;
  description: string;
  rto_minutes: number;
  rpo_minutes: number;
  steps: string;
  last_tested_at: string;
  status: DRStatus;
}

export interface DisasterRecoveryPlanUpdate {
  name?: string;
  description?: string;
  rto_minutes?: number;
  rpo_minutes?: number;
  steps?: string;
  last_tested_at?: string;
  status?: DRStatus;
}

export interface DisasterRecoveryPlanQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface DisasterRecoveryTest {
  id: string;
  plan_id: string;
  started_at: string;
  completed_at: string;
  rto_achieved: number;
  rpo_achieved: number;
  issues_found: number;
  status: DRStatus;
  created_at: string;
  updated_at: string;
}

export interface DisasterRecoveryTestCreate {
  plan_id: string;
  started_at: string;
  completed_at: string;
  rto_achieved: number;
  rpo_achieved: number;
  issues_found: number;
  status: DRStatus;
}

export interface DisasterRecoveryTestUpdate {
  plan_id?: string;
  started_at?: string;
  completed_at?: string;
  rto_achieved?: number;
  rpo_achieved?: number;
  issues_found?: number;
  status?: DRStatus;
}

export interface DisasterRecoveryTestQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface RegionConfig {
  id: string;
  name: string;
  provider: string;
  endpoint: string;
  status: RegionStatus;
  created_at: string;
  updated_at: string;
}

export interface RegionConfigCreate {
  name: string;
  provider: string;
  endpoint: string;
  status: RegionStatus;
}

export interface RegionConfigUpdate {
  name?: string;
  provider?: string;
  endpoint?: string;
  status?: RegionStatus;
}

export interface RegionConfigQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

export interface LoadBalancer {
  id: string;
  name: string;
  algorithm: string;
  backends: string;
  health_check_path: string;
  status: LoadBalancerStatus;
  created_at: string;
  updated_at: string;
}

export interface LoadBalancerCreate {
  name: string;
  algorithm: string;
  backends: string;
  health_check_path: string;
  status: LoadBalancerStatus;
}

export interface LoadBalancerUpdate {
  name?: string;
  algorithm?: string;
  backends?: string;
  health_check_path?: string;
  status?: LoadBalancerStatus;
}

export interface LoadBalancerQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: SortOrder;
  search: string;
}

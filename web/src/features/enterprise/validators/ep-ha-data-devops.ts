// Enterprise Platform Validators - HA, Data & DevOps
// Phase 2.10 - EduCI Platform

import { z } from 'zod';

// ============================================================
// Domain 8: High Availability
// ============================================================

// --- FailoverConfig ---
export const failoverConfigCreateSchema = z.object({
  name: z.string().min(2).max(200),
  serviceId: z.string().uuid(),
  serviceName: z.string().min(2).max(200),
  strategy: z.enum(['active_passive', 'active_active', 'n_plus_one', 'active_standby']),
  primaryEndpoint: z.string().url().max(2000),
  secondaryEndpoints: z.array(z.object({
    endpoint: z.string().url().max(2000),
    priority: z.number().int().min(0),
    weight: z.number().int().min(1).max(100).default(1),
  })),
  healthCheck: z.object({
    type: z.enum(['http', 'tcp', 'dns', 'custom']),
    endpoint: z.string().url().max(2000).optional(),
    interval: z.number().int().min(1).max(300).default(10),
    timeout: z.number().int().min(1).max(60).default(5),
    healthyThreshold: z.number().int().min(1).max(10).default(3),
    unhealthyThreshold: z.number().int().min(1).max(10).default(3),
  }),
  failoverTimeout: z.number().int().min(1).max(300).default(30),
  autoFailover: z.boolean().default(true),
  autoRecovery: z.boolean().default(true),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])),
  enabled: z.boolean().default(true),
});

export const failoverConfigUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  strategy: z.enum(['active_passive', 'active_active', 'n_plus_one', 'active_standby']).optional(),
  primaryEndpoint: z.string().url().max(2000).optional(),
  secondaryEndpoints: z.array(z.object({
    endpoint: z.string().url().max(2000),
    priority: z.number().int().min(0),
    weight: z.number().int().min(1).max(100).default(1),
  })).optional(),
  healthCheck: z.object({
    type: z.enum(['http', 'tcp', 'dns', 'custom']),
    endpoint: z.string().url().max(2000).optional(),
    interval: z.number().int().min(1).max(300).default(10),
    timeout: z.number().int().min(1).max(60).default(5),
    healthyThreshold: z.number().int().min(1).max(10).default(3),
    unhealthyThreshold: z.number().int().min(1).max(10).default(3),
  }).optional(),
  failoverTimeout: z.number().int().min(1).max(300).optional(),
  autoFailover: z.boolean().optional(),
  autoRecovery: z.boolean().optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])).optional(),
  enabled: z.boolean().optional(),
});

export const failoverConfigQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'serviceName', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  serviceId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- FailoverEvent ---
export const failoverEventCreateSchema = z.object({
  configId: z.string().uuid(),
  serviceName: z.string().min(2).max(200),
  type: z.enum(['failover', 'failback', 'health_check_failed', 'recovery']),
  fromEndpoint: z.string().url().max(2000),
  toEndpoint: z.string().url().max(2000),
  reason: z.string().min(1).max(1000),
  duration: z.number().int().min(0),
  dataLoss: z.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const failoverEventUpdateSchema = z.object({
  duration: z.number().int().min(0).optional(),
  dataLoss: z.boolean().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  resolvedAt: z.string().datetime().optional(),
});

export const failoverEventQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['serviceName', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  configId: z.string().uuid().optional(),
  serviceName: z.string().max(200).optional(),
  type: z.enum(['failover', 'failback', 'health_check_failed', 'recovery']).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- Replication ---
export const replicationCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(['sync', 'async', 'semi_sync']),
  source: z.object({
    type: z.enum(['database', 'cache', 'file_system', 'message_queue']),
    connection: z.string().max(500),
    database: z.string().max(200).optional(),
  }),
  target: z.object({
    type: z.enum(['database', 'cache', 'file_system', 'message_queue']),
    connection: z.string().max(500),
    database: z.string().max(200).optional(),
  }),
  tables: z.array(z.string().max(200)).optional(),
  filters: z.array(z.object({
    table: z.string().max(200),
    condition: z.string().max(500),
  })).optional(),
  lagThresholdMs: z.number().int().min(0).max(60000).default(1000),
  conflictResolution: z.enum(['source_wins', 'target_wins', 'manual', 'timestamp']).default('source_wins'),
  monitoring: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

export const replicationUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  type: z.enum(['sync', 'async', 'semi_sync']).optional(),
  tables: z.array(z.string().max(200)).optional(),
  filters: z.array(z.object({
    table: z.string().max(200),
    condition: z.string().max(500),
  })).optional(),
  lagThresholdMs: z.number().int().min(0).max(60000).optional(),
  conflictResolution: z.enum(['source_wins', 'target_wins', 'manual', 'timestamp']).optional(),
  enabled: z.boolean().optional(),
});

export const replicationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['sync', 'async', 'semi_sync']).optional(),
  enabled: z.boolean().optional(),
});

// --- GeoReplication ---
export const geoReplicationCreateSchema = z.object({
  name: z.string().min(2).max(200),
  replicationId: z.string().uuid(),
  regions: z.array(z.object({
    regionId: z.string().max(100),
    endpoint: z.string().url().max(2000),
    priority: z.number().int().min(0),
    isPrimary: z.boolean().default(false),
  })),
  routingStrategy: z.enum(['nearest', 'weighted', 'priority', 'failover']),
  consistencyMode: z.enum(['strong', 'eventual', 'causal']),
  conflictResolution: z.enum(['last_write_wins', 'source_wins', 'manual']),
  autoFailoverRegions: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

export const geoReplicationUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  regions: z.array(z.object({
    regionId: z.string().max(100),
    endpoint: z.string().url().max(2000),
    priority: z.number().int().min(0),
    isPrimary: z.boolean().default(false),
  })).optional(),
  routingStrategy: z.enum(['nearest', 'weighted', 'priority', 'failover']).optional(),
  consistencyMode: z.enum(['strong', 'eventual', 'causal']).optional(),
  conflictResolution: z.enum(['last_write_wins', 'source_wins', 'manual']).optional(),
  autoFailoverRegions: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const geoReplicationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  replicationId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- HealthCheck ---
export const healthCheckCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(['http', 'tcp', 'dns', 'database', 'custom_script']),
  endpoint: z.string().max(2000),
  method: z.enum(['GET', 'POST', 'HEAD']).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  body: z.string().max(5000).optional(),
  expectedStatus: z.number().int().min(100).max(599).default(200),
  expectedBody: z.string().max(1000).optional(),
  interval: z.number().int().min(1).max(3600).default(30),
  timeout: z.number().int().min(1).max(300).default(10),
  retries: z.number().int().min(0).max(10).default(3),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])),
  enabled: z.boolean().default(true),
});

export const healthCheckUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  endpoint: z.string().max(2000).optional(),
  method: z.enum(['GET', 'POST', 'HEAD']).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  body: z.string().max(5000).optional(),
  expectedStatus: z.number().int().min(100).max(599).optional(),
  expectedBody: z.string().max(1000).optional(),
  interval: z.number().int().min(1).max(3600).optional(),
  timeout: z.number().int().min(1).max(300).optional(),
  retries: z.number().int().min(0).max(10).optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])).optional(),
  enabled: z.boolean().optional(),
});

export const healthCheckQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['http', 'tcp', 'dns', 'database', 'custom_script']).optional(),
  enabled: z.boolean().optional(),
});

// --- HealthStatus ---
export const healthStatusCreateSchema = z.object({
  serviceName: z.string().min(2).max(200),
  status: z.enum(['healthy', 'degraded', 'unhealthy', 'unknown']),
  uptime: z.number().min(0).max(100),
  responseTimeMs: z.number().int().min(0),
  components: z.array(z.object({
    name: z.string().max(200),
    status: z.enum(['healthy', 'degraded', 'unhealthy']),
    latencyMs: z.number().int().min(0),
    message: z.string().max(500).optional(),
  })),
  version: z.string().max(50).optional(),
  environment: z.enum(['production', 'staging', 'development']),
});

export const healthStatusUpdateSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'unhealthy', 'unknown']).optional(),
  uptime: z.number().min(0).max(100).optional(),
  responseTimeMs: z.number().int().min(0).optional(),
  components: z.array(z.object({
    name: z.string().max(200),
    status: z.enum(['healthy', 'degraded', 'unhealthy']),
    latencyMs: z.number().int().min(0),
    message: z.string().max(500).optional(),
  })).optional(),
  version: z.string().max(50).optional(),
});

export const healthStatusQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['serviceName', 'status', 'uptime']).default('serviceName'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().max(200).optional(),
  status: z.enum(['healthy', 'degraded', 'unhealthy', 'unknown']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
});

// --- AutoRecovery ---
export const autoRecoveryCreateSchema = z.object({
  name: z.string().min(2).max(200),
  serviceId: z.string().uuid(),
  serviceName: z.string().min(2).max(200),
  triggerConditions: z.array(z.object({
    type: z.enum(['health_check_fail', 'error_rate', 'latency', 'resource_usage']),
    threshold: z.number(),
    duration: z.number().int().min(1).max(300),
  })),
  recoveryActions: z.array(z.object({
    order: z.number().int().min(0),
    type: z.enum(['restart', 'scale_up', 'failover', 'rollback', 'circuit_break']),
    config: z.record(z.string(), z.unknown()),
    timeout: z.number().int().min(1).max(300),
  })),
  maxRecoveryAttempts: z.number().int().min(1).max(10).default(3),
  cooldownPeriod: z.number().int().min(60).max(86400).default(300),
  enabled: z.boolean().default(true),
});

export const autoRecoveryUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  triggerConditions: z.array(z.object({
    type: z.enum(['health_check_fail', 'error_rate', 'latency', 'resource_usage']),
    threshold: z.number(),
    duration: z.number().int().min(1).max(300),
  })).optional(),
  recoveryActions: z.array(z.object({
    order: z.number().int().min(0),
    type: z.enum(['restart', 'scale_up', 'failover', 'rollback', 'circuit_break']),
    config: z.record(z.string(), z.unknown()),
    timeout: z.number().int().min(1).max(300),
  })).optional(),
  maxRecoveryAttempts: z.number().int().min(1).max(10).optional(),
  cooldownPeriod: z.number().int().min(60).max(86400).optional(),
  enabled: z.boolean().optional(),
});

export const autoRecoveryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'serviceName', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  serviceId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- RecoveryAttempt ---
export const recoveryAttemptCreateSchema = z.object({
  recoveryId: z.string().uuid(),
  serviceName: z.string().min(2).max(200),
  attemptNumber: z.number().int().min(1),
  triggerReason: z.string().min(1).max(1000),
  actions: z.array(z.object({
    type: z.enum(['restart', 'scale_up', 'failover', 'rollback', 'circuit_break']),
    status: z.enum(['pending', 'running', 'completed', 'failed', 'skipped']),
    startedAt: z.string().datetime().optional(),
    completedAt: z.string().datetime().optional(),
    output: z.string().max(5000).optional(),
  })),
  result: z.enum(['success', 'partial_success', 'failed']),
  duration: z.number().int().min(0),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const recoveryAttemptUpdateSchema = z.object({
  actions: z.array(z.object({
    type: z.enum(['restart', 'scale_up', 'failover', 'rollback', 'circuit_break']),
    status: z.enum(['pending', 'running', 'completed', 'failed', 'skipped']),
    startedAt: z.string().datetime().optional(),
    completedAt: z.string().datetime().optional(),
    output: z.string().max(5000).optional(),
  })).optional(),
  result: z.enum(['success', 'partial_success', 'failed']).optional(),
  duration: z.number().int().min(0).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const recoveryAttemptQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['serviceName', 'attemptNumber', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  recoveryId: z.string().uuid().optional(),
  serviceName: z.string().max(200).optional(),
  result: z.enum(['success', 'partial_success', 'failed']).optional(),
});

// --- BackupSchedule ---
export const backupScheduleCreateSchema = z.object({
  name: z.string().min(2).max(200),
  resourceType: z.enum(['database', 'file_system', 'configuration', 'full_stack']),
  resourceIds: z.array(z.string().uuid()),
  cronExpression: z.string().max(100),
  timezone: z.string().max(50).default('UTC'),
  type: z.enum(['full', 'incremental', 'differential']),
  retention: z.object({
    count: z.number().int().min(1).max(1000),
    days: z.number().int().min(1).max(3650),
  }),
  storage: z.enum(['local', 's3', 'gcs', 'azure_blob', 'tape']),
  encryption: z.boolean().default(true),
  compression: z.boolean().default(true),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])),
  enabled: z.boolean().default(true),
});

export const backupScheduleUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  cronExpression: z.string().max(100).optional(),
  timezone: z.string().max(50).optional(),
  type: z.enum(['full', 'incremental', 'differential']).optional(),
  retention: z.object({
    count: z.number().int().min(1).max(1000),
    days: z.number().int().min(1).max(3650),
  }).optional(),
  storage: z.enum(['local', 's3', 'gcs', 'azure_blob', 'tape']).optional(),
  encryption: z.boolean().optional(),
  compression: z.boolean().optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])).optional(),
  enabled: z.boolean().optional(),
});

export const backupScheduleQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'resourceType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  resourceType: z.enum(['database', 'file_system', 'configuration', 'full_stack']).optional(),
  enabled: z.boolean().optional(),
});

// --- BackupJob ---
export const backupJobCreateSchema = z.object({
  scheduleId: z.string().uuid(),
  name: z.string().min(2).max(200),
  status: z.enum(['pending', 'running', 'completed', 'failed', 'cancelled']),
  type: z.enum(['full', 'incremental', 'differential']),
  resourceType: z.enum(['database', 'file_system', 'configuration', 'full_stack']),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
  size: z.number().int().min(0).optional(),
  location: z.string().max(500),
  checksum: z.string().max(256).optional(),
  logs: z.string().max(50000).optional(),
  triggeredBy: z.enum(['schedule', 'manual', 'api', 'event']),
});

export const backupJobUpdateSchema = z.object({
  status: z.enum(['pending', 'running', 'completed', 'failed', 'cancelled']).optional(),
  completedAt: z.string().datetime().optional(),
  size: z.number().int().min(0).optional(),
  checksum: z.string().max(256).optional(),
  logs: z.string().max(50000).optional(),
});

export const backupJobQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'status', 'startedAt']).default('startedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  scheduleId: z.string().uuid().optional(),
  status: z.enum(['pending', 'running', 'completed', 'failed', 'cancelled']).optional(),
  type: z.enum(['full', 'incremental', 'differential']).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- DisasterRecoveryPlan ---
export const disasterRecoveryPlanCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  services: z.array(z.object({
    serviceId: z.string().uuid(),
    serviceName: z.string().max(200),
    priority: z.enum(['critical', 'high', 'medium', 'low']),
    rto: z.number().int().min(0),
    rpo: z.number().int().min(0),
  })),
  recoverySite: z.object({
    type: z.enum(['hot', 'warm', 'cold', 'cloud']),
    region: z.string().max(100),
    endpoint: z.string().url().max(2000).optional(),
  }),
  steps: z.array(z.object({
    order: z.number().int().min(0),
    description: z.string().max(500),
    automationScript: z.string().max(5000).optional(),
    manualSteps: z.array(z.string().max(500)).optional(),
    timeout: z.number().int().min(1).max(86400).default(300),
  })),
  contacts: z.array(z.object({
    role: z.string().max(100),
    name: z.string().max(200),
    phone: z.string().max(50),
    email: z.string().email().max(200),
  })),
  testFrequency: z.enum(['weekly', 'monthly', 'quarterly', 'yearly']),
  lastTestedAt: z.string().datetime().optional(),
  enabled: z.boolean().default(true),
});

export const disasterRecoveryPlanUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(2000).optional(),
  services: z.array(z.object({
    serviceId: z.string().uuid(),
    serviceName: z.string().max(200),
    priority: z.enum(['critical', 'high', 'medium', 'low']),
    rto: z.number().int().min(0),
    rpo: z.number().int().min(0),
  })).optional(),
  recoverySite: z.object({
    type: z.enum(['hot', 'warm', 'cold', 'cloud']),
    region: z.string().max(100),
    endpoint: z.string().url().max(2000).optional(),
  }).optional(),
  steps: z.array(z.object({
    order: z.number().int().min(0),
    description: z.string().max(500),
    automationScript: z.string().max(5000).optional(),
    manualSteps: z.array(z.string().max(500)).optional(),
    timeout: z.number().int().min(1).max(86400).default(300),
  })).optional(),
  contacts: z.array(z.object({
    role: z.string().max(100),
    name: z.string().max(200),
    phone: z.string().max(50),
    email: z.string().email().max(200),
  })).optional(),
  testFrequency: z.enum(['weekly', 'monthly', 'quarterly', 'yearly']).optional(),
  enabled: z.boolean().optional(),
});

export const disasterRecoveryPlanQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'testFrequency', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- DisasterRecoveryTest ---
export const disasterRecoveryTestCreateSchema = z.object({
  planId: z.string().uuid(),
  name: z.string().min(2).max(200),
  type: z.enum(['tabletop', 'parallel', 'full_simulation']),
  executedBy: z.string().uuid(),
  scheduledAt: z.string().datetime(),
  scope: z.array(z.string().max(200)),
  participants: z.array(z.object({
    userId: z.string().uuid(),
    role: z.string().max(100),
    attended: z.boolean().default(false),
  })).optional(),
  objectives: z.array(z.string().max(500)),
});

export const disasterRecoveryTestUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  type: z.enum(['tabletop', 'parallel', 'full_simulation']).optional(),
  participants: z.array(z.object({
    userId: z.string().uuid(),
    role: z.string().max(100),
    attended: z.boolean().default(false),
  })).optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).optional(),
  results: z.object({
    rtoAchieved: z.number().int().min(0).optional(),
    rpoAchieved: z.number().int().min(0).optional(),
    issues: z.array(z.string().max(500)).optional(),
    score: z.number().min(0).max(100).optional(),
  }).optional(),
  completedAt: z.string().datetime().optional(),
});

export const disasterRecoveryTestQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'scheduledAt', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  planId: z.string().uuid().optional(),
  type: z.enum(['tabletop', 'parallel', 'full_simulation']).optional(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).optional(),
});

// --- RegionConfig ---
export const regionConfigCreateSchema = z.object({
  name: z.string().min(2).max(200),
  code: z.string().min(2).max(10).regex(/^[A-Z]{2,10}$/),
  provider: z.enum(['aws', 'gcp', 'azure', 'on_premise']),
  endpoint: z.string().url().max(2000),
  availabilityZones: z.array(z.string().max(100)),
  latencyMs: z.number().int().min(0).max(5000).default(0),
  capacity: z.object({
    maxInstances: z.number().int().min(1).max(10000),
    currentInstances: z.number().int().min(0).max(10000),
    storageLimit: z.number().int().min(0),
  }),
  compliance: z.array(z.enum(['gdpr', 'hipaa', 'soc2', 'iso27001', 'fedramp'])),
  enabled: z.boolean().default(true),
});

export const regionConfigUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  endpoint: z.string().url().max(2000).optional(),
  availabilityZones: z.array(z.string().max(100)).optional(),
  latencyMs: z.number().int().min(0).max(5000).optional(),
  capacity: z.object({
    maxInstances: z.number().int().min(1).max(10000),
    currentInstances: z.number().int().min(0).max(10000),
    storageLimit: z.number().int().min(0),
  }).optional(),
  compliance: z.array(z.enum(['gdpr', 'hipaa', 'soc2', 'iso27001', 'fedramp'])).optional(),
  enabled: z.boolean().optional(),
});

export const regionConfigQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'code', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  provider: z.enum(['aws', 'gcp', 'azure', 'on_premise']).optional(),
  enabled: z.boolean().optional(),
});

// --- LoadBalancer ---
export const loadBalancerCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(['application', 'network', 'global']),
  algorithm: z.enum(['round_robin', 'least_connections', 'ip_hash', 'weighted', 'least_response_time']),
  healthCheck: z.object({
    endpoint: z.string().url().max(2000),
    interval: z.number().int().min(1).max(300).default(30),
    timeout: z.number().int().min(1).max(60).default(5),
    healthyThreshold: z.number().int().min(1).max(10).default(3),
    unhealthyThreshold: z.number().int().min(1).max(10).default(3),
  }),
  targets: z.array(z.object({
    host: z.string().max(500),
    port: z.number().int().min(1).max(65535),
    weight: z.number().int().min(1).max(100).default(1),
    healthStatus: z.enum(['healthy', 'unhealthy', 'draining']).default('healthy'),
  })),
  ssl: z.boolean().default(false),
  sslCertificateId: z.string().uuid().optional(),
  stickySession: z.boolean().default(false),
  crossZone: z.boolean().default(true),
  environment: z.enum(['production', 'staging', 'development']),
  enabled: z.boolean().default(true),
});

export const loadBalancerUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  type: z.enum(['application', 'network', 'global']).optional(),
  algorithm: z.enum(['round_robin', 'least_connections', 'ip_hash', 'weighted', 'least_response_time']).optional(),
  healthCheck: z.object({
    endpoint: z.string().url().max(2000),
    interval: z.number().int().min(1).max(300).default(30),
    timeout: z.number().int().min(1).max(60).default(5),
    healthyThreshold: z.number().int().min(1).max(10).default(3),
    unhealthyThreshold: z.number().int().min(1).max(10).default(3),
  }).optional(),
  targets: z.array(z.object({
    host: z.string().max(500),
    port: z.number().int().min(1).max(65535),
    weight: z.number().int().min(1).max(100).default(1),
    healthStatus: z.enum(['healthy', 'unhealthy', 'draining']).default('healthy'),
  })).optional(),
  ssl: z.boolean().optional(),
  sslCertificateId: z.string().uuid().optional(),
  stickySession: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const loadBalancerQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['application', 'network', 'global']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  enabled: z.boolean().optional(),
});

// ============================================================
// Domain 9: Data Management
// ============================================================

// --- DataLake ---
export const dataLakeCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  storageType: z.enum(['s3', 'gcs', 'azure_blob', 'hdfs', 'local']),
  endpoint: z.string().url().max(2000).optional(),
  bucket: z.string().max(500).optional(),
  path: z.string().max(500).default('/'),
  format: z.enum(['parquet', 'avro', 'orc', 'json', 'csv', 'delta_lake']),
  compression: z.enum(['none', 'gzip', 'snappy', 'zstd', 'lz4']).default('snappy'),
  partitioning: z.array(z.string().max(200)).optional(),
  schemaRegistry: z.string().url().max(2000).optional(),
  retentionDays: z.number().int().min(1).max(3650).default(365),
  encryption: z.boolean().default(true),
  environment: z.enum(['production', 'staging', 'development']),
  enabled: z.boolean().default(true),
});

export const dataLakeUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  format: z.enum(['parquet', 'avro', 'orc', 'json', 'csv', 'delta_lake']).optional(),
  compression: z.enum(['none', 'gzip', 'snappy', 'zstd', 'lz4']).optional(),
  partitioning: z.array(z.string().max(200)).optional(),
  retentionDays: z.number().int().min(1).max(3650).optional(),
  encryption: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const dataLakeQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'storageType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  storageType: z.enum(['s3', 'gcs', 'azure_blob', 'hdfs', 'local']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  enabled: z.boolean().optional(),
});

// --- DataLakeDataset ---
export const dataLakeDatasetCreateSchema = z.object({
  dataLakeId: z.string().uuid(),
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  source: z.object({
    type: z.enum(['database', 'api', 'file', 'stream', 'webhook']),
    config: z.record(z.string(), z.string()),
  }),
  schema: z.array(z.object({
    name: z.string().max(200),
    type: z.enum(['string', 'integer', 'float', 'boolean', 'timestamp', 'array', 'object']),
    nullable: z.boolean().default(true),
    description: z.string().max(500).optional(),
  })),
  refreshSchedule: z.string().max(100).optional(),
  qualityRules: z.array(z.object({
    name: z.string().max(200),
    type: z.enum(['not_null', 'unique', 'range', 'regex', 'custom']),
    config: z.record(z.string(), z.unknown()),
  })).optional(),
  tags: z.array(z.string().max(200)).optional(),
  enabled: z.boolean().default(true),
});

export const dataLakeDatasetUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  source: z.object({
    type: z.enum(['database', 'api', 'file', 'stream', 'webhook']),
    config: z.record(z.string(), z.string()),
  }).optional(),
  schema: z.array(z.object({
    name: z.string().max(200),
    type: z.enum(['string', 'integer', 'float', 'boolean', 'timestamp', 'array', 'object']),
    nullable: z.boolean().default(true),
    description: z.string().max(500).optional(),
  })).optional(),
  refreshSchedule: z.string().max(100).optional(),
  qualityRules: z.array(z.object({
    name: z.string().max(200),
    type: z.enum(['not_null', 'unique', 'range', 'regex', 'custom']),
    config: z.record(z.string(), z.unknown()),
  })).optional(),
  tags: z.array(z.string().max(200)).optional(),
  enabled: z.boolean().optional(),
});

export const dataLakeDatasetQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  dataLakeId: z.string().uuid().optional(),
  tags: z.array(z.string().max(200)).optional(),
  enabled: z.boolean().optional(),
});

// --- DataArchive ---
export const dataArchiveCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  sourceType: z.enum(['database', 'file_system', 'application']),
  sourceConfig: z.record(z.string(), z.string()),
  archiveType: z.enum(['full', 'incremental', 'differential']),
  schedule: z.string().max(100).optional(),
  retention: z.number().int().min(30).max(36500),
  storage: z.enum(['s3', 'gcs', 'azure_blob', 'tape', 'glacier']),
  compression: z.enum(['none', 'gzip', 'zstd', 'lz4']).default('gzip'),
  encryption: z.boolean().default(true),
  indexEnabled: z.boolean().default(true),
  restorationSlaHours: z.number().int().min(1).max(168).default(24),
  enabled: z.boolean().default(true),
});

export const dataArchiveUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  archiveType: z.enum(['full', 'incremental', 'differential']).optional(),
  schedule: z.string().max(100).optional(),
  retention: z.number().int().min(30).max(36500).optional(),
  compression: z.enum(['none', 'gzip', 'zstd', 'lz4']).optional(),
  encryption: z.boolean().optional(),
  indexEnabled: z.boolean().optional(),
  restorationSlaHours: z.number().int().min(1).max(168).optional(),
  enabled: z.boolean().optional(),
});

export const dataArchiveQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'retention', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  sourceType: z.enum(['database', 'file_system', 'application']).optional(),
  storage: z.enum(['s3', 'gcs', 'azure_blob', 'tape', 'glacier']).optional(),
  enabled: z.boolean().optional(),
});

// --- DataSnapshot ---
export const dataSnapshotCreateSchema = z.object({
  name: z.string().min(2).max(200),
  sourceType: z.enum(['database', 'file_system', 'data_lake', 'application']),
  sourceId: z.string().uuid(),
  type: z.enum(['full', 'partial']),
  tables: z.array(z.string().max(200)).optional(),
  pointInTime: z.string().datetime().optional(),
  compression: z.enum(['none', 'gzip', 'zstd', 'lz4']).default('gzip'),
  encryption: z.boolean().default(true),
  location: z.string().max(500),
  size: z.number().int().min(0).optional(),
  retention: z.number().int().min(1).max(3650).default(30),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const dataSnapshotUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  tables: z.array(z.string().max(200)).optional(),
  compression: z.enum(['none', 'gzip', 'zstd', 'lz4']).optional(),
  encryption: z.boolean().optional(),
  retention: z.number().int().min(1).max(3650).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const dataSnapshotQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'size', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  sourceType: z.enum(['database', 'file_system', 'data_lake', 'application']).optional(),
  sourceId: z.string().uuid().optional(),
  type: z.enum(['full', 'partial']).optional(),
});

// --- HistoricalStorage ---
export const historicalStorageCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  sourceType: z.enum(['database', 'event_stream', 'log', 'metric']),
  sourceId: z.string().uuid().optional(),
  retentionPolicy: z.object({
    hotDays: z.number().int().min(1).max(365).default(90),
    warmDays: z.number().int().min(0).max(365).default(180),
    coldDays: z.number().int().min(0).max(365).default(365),
    archiveDays: z.number().int().min(0).max(3650).default(0),
  }),
  storageClasses: z.array(z.object({
    class: z.enum(['hot', 'warm', 'cold', 'archive']),
    storage: z.enum(['s3', 'gcs', 'azure_blob', 'glacier']),
    location: z.string().max(500),
  })),
  compression: z.boolean().default(true),
  encryption: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

export const historicalStorageUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  retentionPolicy: z.object({
    hotDays: z.number().int().min(1).max(365).default(90),
    warmDays: z.number().int().min(0).max(365).default(180),
    coldDays: z.number().int().min(0).max(365).default(365),
    archiveDays: z.number().int().min(0).max(3650).default(0),
  }).optional(),
  storageClasses: z.array(z.object({
    class: z.enum(['hot', 'warm', 'cold', 'archive']),
    storage: z.enum(['s3', 'gcs', 'azure_blob', 'glacier']),
    location: z.string().max(500),
  })).optional(),
  enabled: z.boolean().optional(),
});

export const historicalStorageQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  sourceType: z.enum(['database', 'event_stream', 'log', 'metric']).optional(),
  enabled: z.boolean().optional(),
});

// --- DataGovernance ---
export const dataGovernanceCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  domain: z.string().min(1).max(200),
  owner: z.string().uuid(),
  classification: z.enum(['public', 'internal', 'confidential', 'restricted']),
  accessLevel: z.enum(['open', 'restricted', 'controlled', 'confidential']),
  policies: z.array(z.object({
    type: z.enum(['retention', 'quality', 'access', 'compliance', 'lineage']),
    rules: z.array(z.string().max(500)),
  })),
  compliance: z.array(z.enum(['gdpr', 'hipaa', 'ferpa', 'soc2', 'iso27001'])),
  steward: z.string().uuid().optional(),
  enabled: z.boolean().default(true),
});

export const dataGovernanceUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  domain: z.string().min(1).max(200).optional(),
  owner: z.string().uuid().optional(),
  classification: z.enum(['public', 'internal', 'confidential', 'restricted']).optional(),
  accessLevel: z.enum(['open', 'restricted', 'controlled', 'confidential']).optional(),
  policies: z.array(z.object({
    type: z.enum(['retention', 'quality', 'access', 'compliance', 'lineage']),
    rules: z.array(z.string().max(500)),
  })).optional(),
  compliance: z.array(z.enum(['gdpr', 'hipaa', 'ferpa', 'soc2', 'iso27001'])).optional(),
  steward: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

export const dataGovernanceQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'domain', 'classification', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  classification: z.enum(['public', 'internal', 'confidential', 'restricted']).optional(),
  enabled: z.boolean().optional(),
});

// --- DataLineage ---
export const dataLineageCreateSchema = z.object({
  name: z.string().min(2).max(200),
  source: z.object({
    type: z.enum(['database', 'api', 'file', 'stream']),
    id: z.string().max(200),
    field: z.string().max(200).optional(),
  }),
  target: z.object({
    type: z.enum(['database', 'api', 'file', 'stream']),
    id: z.string().max(200),
    field: z.string().max(200).optional(),
  }),
  transformation: z.string().max(2000).optional(),
  process: z.string().max(200),
  frequency: z.enum(['real_time', 'batch', 'on_demand']),
  qualityChecks: z.array(z.string().max(500)).optional(),
  enabled: z.boolean().default(true),
});

export const dataLineageUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  source: z.object({
    type: z.enum(['database', 'api', 'file', 'stream']),
    id: z.string().max(200),
    field: z.string().max(200).optional(),
  }).optional(),
  target: z.object({
    type: z.enum(['database', 'api', 'file', 'stream']),
    id: z.string().max(200),
    field: z.string().max(200).optional(),
  }).optional(),
  transformation: z.string().max(2000).optional(),
  process: z.string().max(200).optional(),
  frequency: z.enum(['real_time', 'batch', 'on_demand']).optional(),
  qualityChecks: z.array(z.string().max(500)).optional(),
  enabled: z.boolean().optional(),
});

export const dataLineageQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'process', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  process: z.string().max(200).optional(),
  frequency: z.enum(['real_time', 'batch', 'on_demand']).optional(),
  enabled: z.boolean().optional(),
});

// --- MetadataCatalog ---
export const metadataCatalogCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['table', 'view', 'api', 'file', 'stream', 'dashboard']),
  source: z.string().max(200),
  schema: z.array(z.object({
    name: z.string().max(200),
    type: z.string().max(100),
    description: z.string().max(500).optional(),
    pii: z.boolean().default(false),
    sensitivity: z.enum(['none', 'low', 'medium', 'high', 'critical']).default('none'),
  })).optional(),
  owner: z.string().uuid(),
  tags: z.array(z.string().max(200)).optional(),
  classification: z.enum(['public', 'internal', 'confidential', 'restricted']).default('internal'),
  documentation: z.string().max(10000).optional(),
  enabled: z.boolean().default(true),
});

export const metadataCatalogUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  schema: z.array(z.object({
    name: z.string().max(200),
    type: z.string().max(100),
    description: z.string().max(500).optional(),
    pii: z.boolean().default(false),
    sensitivity: z.enum(['none', 'low', 'medium', 'high', 'critical']).default('none'),
  })).optional(),
  owner: z.string().uuid().optional(),
  tags: z.array(z.string().max(200)).optional(),
  classification: z.enum(['public', 'internal', 'confidential', 'restricted']).optional(),
  documentation: z.string().max(10000).optional(),
  enabled: z.boolean().optional(),
});

export const metadataCatalogQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'source', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['table', 'view', 'api', 'file', 'stream', 'dashboard']).optional(),
  classification: z.enum(['public', 'internal', 'confidential', 'restricted']).optional(),
  tags: z.array(z.string().max(200)).optional(),
  enabled: z.boolean().optional(),
});

// --- DataQuality ---
export const dataQualityCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  datasetId: z.string().uuid(),
  rules: z.array(z.object({
    name: z.string().max(200),
    type: z.enum(['completeness', 'accuracy', 'consistency', 'timeliness', 'uniqueness', 'validity']),
    field: z.string().max(200).optional(),
    threshold: z.number().min(0).max(100),
    severity: z.enum(['info', 'warning', 'error', 'critical']),
    config: z.record(z.string(), z.unknown()).optional(),
  })),
  schedule: z.string().max(100).optional(),
  alertThreshold: z.number().min(0).max(100).default(80),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])),
  enabled: z.boolean().default(true),
});

export const dataQualityUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  rules: z.array(z.object({
    name: z.string().max(200),
    type: z.enum(['completeness', 'accuracy', 'consistency', 'timeliness', 'uniqueness', 'validity']),
    field: z.string().max(200).optional(),
    threshold: z.number().min(0).max(100),
    severity: z.enum(['info', 'warning', 'error', 'critical']),
    config: z.record(z.string(), z.unknown()).optional(),
  })).optional(),
  schedule: z.string().max(100).optional(),
  alertThreshold: z.number().min(0).max(100).optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])).optional(),
  enabled: z.boolean().optional(),
});

export const dataQualityQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  datasetId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- DataPipeline ---
export const dataPipelineCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['batch', 'stream', 'hybrid']),
  source: z.object({
    type: z.enum(['database', 'api', 'file', 'stream', 'webhook']),
    config: z.record(z.string(), z.string()),
  }),
  destination: z.object({
    type: z.enum(['database', 'data_lake', 'search_index', 'cache', 'api']),
    config: z.record(z.string(), z.string()),
  }),
  transformations: z.array(z.object({
    order: z.number().int().min(0),
    type: z.enum(['filter', 'map', 'aggregate', 'join', 'enrich', 'validate', 'custom']),
    config: z.record(z.string(), z.unknown()),
  })).optional(),
  schedule: z.string().max(100).optional(),
  errorHandling: z.enum(['skip', 'retry', 'fail', 'dead_letter']).default('retry'),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
  }).optional(),
  monitoring: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

export const dataPipelineUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['batch', 'stream', 'hybrid']).optional(),
  source: z.object({
    type: z.enum(['database', 'api', 'file', 'stream', 'webhook']),
    config: z.record(z.string(), z.string()),
  }).optional(),
  destination: z.object({
    type: z.enum(['database', 'data_lake', 'search_index', 'cache', 'api']),
    config: z.record(z.string(), z.string()),
  }).optional(),
  transformations: z.array(z.object({
    order: z.number().int().min(0),
    type: z.enum(['filter', 'map', 'aggregate', 'join', 'enrich', 'validate', 'custom']),
    config: z.record(z.string(), z.unknown()),
  })).optional(),
  schedule: z.string().max(100).optional(),
  errorHandling: z.enum(['skip', 'retry', 'fail', 'dead_letter']).optional(),
  enabled: z.boolean().optional(),
});

export const dataPipelineQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['batch', 'stream', 'hybrid']).optional(),
  enabled: z.boolean().optional(),
});

// --- DataRetention ---
export const dataRetentionCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  dataType: z.enum(['user_data', 'logs', 'metrics', 'backups', 'analytics', 'compliance']),
  retentionPeriod: z.number().int().min(1).max(3650),
  retentionUnit: z.enum(['days', 'months', 'years']),
  action: z.enum(['delete', 'archive', 'anonymize', 'encrypt']),
  archiveConfig: z.object({
    storage: z.enum(['s3', 'gcs', 'azure_blob', 'glacier']),
    location: z.string().max(500),
    compression: z.boolean().default(true),
  }).optional(),
  scope: z.object({
    tenantId: z.string().uuid().optional(),
    dataTypes: z.array(z.string().max(200)).optional(),
  }).optional(),
  legalBasis: z.string().max(500).optional(),
  exceptions: z.array(z.string().max(500)).optional(),
  enabled: z.boolean().default(true),
});

export const dataRetentionUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  retentionPeriod: z.number().int().min(1).max(3650).optional(),
  retentionUnit: z.enum(['days', 'months', 'years']).optional(),
  action: z.enum(['delete', 'archive', 'anonymize', 'encrypt']).optional(),
  archiveConfig: z.object({
    storage: z.enum(['s3', 'gcs', 'azure_blob', 'glacier']),
    location: z.string().max(500),
    compression: z.boolean().default(true),
  }).optional(),
  legalBasis: z.string().max(500).optional(),
  exceptions: z.array(z.string().max(500)).optional(),
  enabled: z.boolean().optional(),
});

export const dataRetentionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'retentionPeriod', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  dataType: z.enum(['user_data', 'logs', 'metrics', 'backups', 'analytics', 'compliance']).optional(),
  enabled: z.boolean().optional(),
});

// --- DataClassification ---
export const dataClassificationCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  level: z.enum(['public', 'internal', 'confidential', 'restricted']),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  icon: z.string().max(100),
  requirements: z.array(z.object({
    type: z.enum(['encryption', 'access_control', 'audit', 'masking', 'dlp']),
    config: z.record(z.string(), z.unknown()),
  })),
  compliance: z.array(z.enum(['gdpr', 'hipaa', 'ferpa', 'soc2', 'pci_dss'])),
  handlingInstructions: z.string().max(2000),
  enabled: z.boolean().default(true),
});

export const dataClassificationUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  level: z.enum(['public', 'internal', 'confidential', 'restricted']).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  icon: z.string().max(100).optional(),
  requirements: z.array(z.object({
    type: z.enum(['encryption', 'access_control', 'audit', 'masking', 'dlp']),
    config: z.record(z.string(), z.unknown()),
  })).optional(),
  compliance: z.array(z.enum(['gdpr', 'hipaa', 'ferpa', 'soc2', 'pci_dss'])).optional(),
  handlingInstructions: z.string().max(2000).optional(),
  enabled: z.boolean().optional(),
});

export const dataClassificationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'level', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  level: z.enum(['public', 'internal', 'confidential', 'restricted']).optional(),
  enabled: z.boolean().optional(),
});

// --- DataEncryption ---
export const dataEncryptionCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  scope: z.enum(['column', 'table', 'database', 'file', 'backup']),
  scopeValue: z.string().max(500),
  algorithm: z.enum(['aes_256_gcm', 'aes_256_cbc', 'chacha20', 'rsa_oaep']),
  keyId: z.string().uuid(),
  encryptionMode: z.enum(['at_rest', 'in_transit', 'both']),
  masking: z.object({
    enabled: z.boolean().default(false),
    format: z.enum(['full', 'partial', 'hash', 'token']).optional(),
    preserveFormat: z.boolean().default(false),
  }).optional(),
  enabled: z.boolean().default(true),
});

export const dataEncryptionUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  algorithm: z.enum(['aes_256_gcm', 'aes_256_cbc', 'chacha20', 'rsa_oaep']).optional(),
  keyId: z.string().uuid().optional(),
  encryptionMode: z.enum(['at_rest', 'in_transit', 'both']).optional(),
  masking: z.object({
    enabled: z.boolean().default(false),
    format: z.enum(['full', 'partial', 'hash', 'token']).optional(),
    preserveFormat: z.boolean().default(false),
  }).optional(),
  enabled: z.boolean().optional(),
});

export const dataEncryptionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'scope', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  scope: z.enum(['column', 'table', 'database', 'file', 'backup']).optional(),
  enabled: z.boolean().optional(),
});

// --- DataAccessPolicy ---
export const dataAccessPolicyCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  dataResource: z.string().min(1).max(200),
  dataType: z.enum(['database', 'file', 'api', 'stream', 'dashboard']),
  accessType: z.enum(['read', 'write', 'admin', 'export']),
  subjects: z.array(z.object({
    type: z.enum(['role', 'user', 'group', 'department', 'tenant']),
    value: z.string().max(200),
  })),
  conditions: z.array(z.object({
    type: z.enum(['time_based', 'ip_based', 'device_based', 'context_based']),
    config: z.record(z.string(), z.unknown()),
  })).optional(),
  effect: z.enum(['allow', 'deny']),
  auditLevel: z.enum(['none', 'basic', 'detailed', 'full']).default('basic'),
  enabled: z.boolean().default(true),
});

export const dataAccessPolicyUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  dataResource: z.string().min(1).max(200).optional(),
  accessType: z.enum(['read', 'write', 'admin', 'export']).optional(),
  subjects: z.array(z.object({
    type: z.enum(['role', 'user', 'group', 'department', 'tenant']),
    value: z.string().max(200),
  })).optional(),
  conditions: z.array(z.object({
    type: z.enum(['time_based', 'ip_based', 'device_based', 'context_based']),
    config: z.record(z.string(), z.unknown()),
  })).optional(),
  effect: z.enum(['allow', 'deny']).optional(),
  auditLevel: z.enum(['none', 'basic', 'detailed', 'full']).optional(),
  enabled: z.boolean().optional(),
});

export const dataAccessPolicyQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'dataType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  dataType: z.enum(['database', 'file', 'api', 'stream', 'dashboard']).optional(),
  effect: z.enum(['allow', 'deny']).optional(),
  enabled: z.boolean().optional(),
});

// ============================================================
// Domain 10: DevOps
// ============================================================

// --- CIPipeline ---
export const ciPipelineCreateSchema = z.object({
  name: z.string().min(2).max(200),
  repositoryUrl: z.string().url().max(2000),
  branch: z.string().max(200).default('main'),
  stages: z.array(z.object({
    name: z.string().min(1).max(200),
    type: z.enum(['checkout', 'build', 'test', 'lint', 'security_scan', 'package', 'deploy']),
    commands: z.array(z.string().max(1000)),
    timeout: z.number().int().min(1).max(1440).default(30),
    parallel: z.boolean().default(false),
  })),
  triggers: z.array(z.enum(['push', 'pull_request', 'schedule', 'manual', 'tag'])),
  environment: z.enum(['production', 'staging', 'development']),
  cacheConfig: z.object({
    enabled: z.boolean().default(true),
    paths: z.array(z.string().max(500)).optional(),
    key: z.string().max(200).optional(),
  }).optional(),
  notifications: z.array(z.enum(['email', 'slack', 'webhook'])).optional(),
  enabled: z.boolean().default(true),
});

export const ciPipelineUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  branch: z.string().max(200).optional(),
  stages: z.array(z.object({
    name: z.string().min(1).max(200),
    type: z.enum(['checkout', 'build', 'test', 'lint', 'security_scan', 'package', 'deploy']),
    commands: z.array(z.string().max(1000)),
    timeout: z.number().int().min(1).max(1440).default(30),
    parallel: z.boolean().default(false),
  })).optional(),
  triggers: z.array(z.enum(['push', 'pull_request', 'schedule', 'manual', 'tag'])).optional(),
  cacheConfig: z.object({
    enabled: z.boolean().default(true),
    paths: z.array(z.string().max(500)).optional(),
    key: z.string().max(200).optional(),
  }).optional(),
  enabled: z.boolean().optional(),
});

export const ciPipelineQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  enabled: z.boolean().optional(),
});

// --- CIRun ---
export const ciRunCreateSchema = z.object({
  pipelineId: z.string().uuid(),
  branch: z.string().max(200),
  commitHash: z.string().min(1).max(40),
  commitMessage: z.string().max(1000),
  triggeredBy: z.enum(['push', 'pull_request', 'schedule', 'manual', 'tag']),
  variables: z.record(z.string(), z.string()).optional(),
});

export const ciRunUpdateSchema = z.object({
  status: z.enum(['queued', 'running', 'success', 'failed', 'cancelled', 'timeout']).optional(),
  completedAt: z.string().datetime().optional(),
  stages: z.array(z.object({
    name: z.string().max(200),
    status: z.enum(['pending', 'running', 'success', 'failed', 'skipped']),
    startedAt: z.string().datetime().optional(),
    completedAt: z.string().datetime().optional(),
    logs: z.string().max(100000).optional(),
  })).optional(),
  artifacts: z.array(z.object({
    name: z.string().max(200),
    path: z.string().max(500),
    size: z.number().int().min(0),
  })).optional(),
});

export const ciRunQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['branch', 'commitHash', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  pipelineId: z.string().uuid().optional(),
  status: z.enum(['queued', 'running', 'success', 'failed', 'cancelled', 'timeout']).optional(),
  branch: z.string().max(200).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- QualityGate ---
export const qualityGateCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  conditions: z.array(z.object({
    metric: z.enum(['coverage', 'duplications', 'bugs', 'vulnerabilities', 'code_smells', 'security_hotspots']),
    operator: z.enum(['gt', 'lt', 'gte', 'lte', 'eq']),
    threshold: z.number(),
    severity: z.enum(['info', 'warning', 'error', 'critical']),
  })),
  projectScope: z.array(z.string().max(200)).optional(),
  enforceOnMerge: z.boolean().default(true),
  blockOnFailure: z.boolean().default(false),
  enabled: z.boolean().default(true),
});

export const qualityGateUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  conditions: z.array(z.object({
    metric: z.enum(['coverage', 'duplications', 'bugs', 'vulnerabilities', 'code_smells', 'security_hotspots']),
    operator: z.enum(['gt', 'lt', 'gte', 'lte', 'eq']),
    threshold: z.number(),
    severity: z.enum(['info', 'warning', 'error', 'critical']),
  })).optional(),
  projectScope: z.array(z.string().max(200)).optional(),
  enforceOnMerge: z.boolean().optional(),
  blockOnFailure: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const qualityGateQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- QualityGateResult ---
export const qualityGateResultCreateSchema = z.object({
  gateId: z.string().uuid(),
  runId: z.string().uuid(),
  status: z.enum(['passed', 'failed', 'warning', 'error']),
  conditions: z.array(z.object({
    metric: z.enum(['coverage', 'duplications', 'bugs', 'vulnerabilities', 'code_smells', 'security_hotspots']),
    expectedValue: z.number(),
    actualValue: z.number(),
    passed: z.boolean(),
  })),
  overallScore: z.number().min(0).max(100),
  executedAt: z.string().datetime(),
  duration: z.number().int().min(0),
});

export const qualityGateResultUpdateSchema = z.object({
  status: z.enum(['passed', 'failed', 'warning', 'error']).optional(),
  conditions: z.array(z.object({
    metric: z.enum(['coverage', 'duplications', 'bugs', 'vulnerabilities', 'code_smells', 'security_hotspots']),
    expectedValue: z.number(),
    actualValue: z.number(),
    passed: z.boolean(),
  })).optional(),
  overallScore: z.number().min(0).max(100).optional(),
});

export const qualityGateResultQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['overallScore', 'executedAt', 'created_at']).default('executedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  gateId: z.string().uuid().optional(),
  runId: z.string().uuid().optional(),
  status: z.enum(['passed', 'failed', 'warning', 'error']).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- ReleaseNote ---
export const releaseNoteCreateSchema = z.object({
  version: z.string().min(1).max(50),
  title: z.string().min(2).max(200),
  date: z.string().datetime(),
  type: z.enum(['major', 'minor', 'patch', 'hotfix', 'breaking']),
  changes: z.array(z.object({
    category: z.enum(['added', 'changed', 'deprecated', 'removed', 'fixed', 'security']),
    description: z.string().min(1).max(1000),
    issueRef: z.string().max(200).optional(),
  })),
  breakingChanges: z.array(z.object({
    description: z.string().max(1000),
    migrationGuide: z.string().max(2000).optional(),
    affectedComponents: z.array(z.string().max(200)),
  })).optional(),
  dependencies: z.array(z.object({
    name: z.string().max(200),
    previousVersion: z.string().max(50),
    newVersion: z.string().max(50),
    breaking: z.boolean().default(false),
  })).optional(),
  publishedAt: z.string().datetime().optional(),
});

export const releaseNoteUpdateSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  changes: z.array(z.object({
    category: z.enum(['added', 'changed', 'deprecated', 'removed', 'fixed', 'security']),
    description: z.string().min(1).max(1000),
    issueRef: z.string().max(200).optional(),
  })).optional(),
  breakingChanges: z.array(z.object({
    description: z.string().max(1000),
    migrationGuide: z.string().max(2000).optional(),
    affectedComponents: z.array(z.string().max(200)),
  })).optional(),
  dependencies: z.array(z.object({
    name: z.string().max(200),
    previousVersion: z.string().max(50),
    newVersion: z.string().max(50),
    breaking: z.boolean().default(false),
  })).optional(),
  publishedAt: z.string().datetime().optional(),
});

export const releaseNoteQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['version', 'date', 'created_at']).default('date'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['major', 'minor', 'patch', 'hotfix', 'breaking']).optional(),
  publishedOnly: z.boolean().default(false),
});

// --- BuildDashboard ---
export const buildDashboardCreateSchema = z.object({
  name: z.string().min(2).max(200),
  repositoryUrl: z.string().url().max(2000),
  pipelines: z.array(z.string().uuid()),
  metrics: z.array(z.enum([
    'build_count', 'success_rate', 'avg_duration', 'failure_rate',
    'queue_time', 'test_coverage', 'deploy_frequency', 'lead_time',
  ])),
  timeRange: z.enum(['24h', '7d', '30d', '90d']),
  refreshInterval: z.number().int().min(5).max(3600).default(60),
  visibility: z.enum(['public', 'private', 'team']).default('team'),
  enabled: z.boolean().default(true),
});

export const buildDashboardUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  pipelines: z.array(z.string().uuid()).optional(),
  metrics: z.array(z.enum([
    'build_count', 'success_rate', 'avg_duration', 'failure_rate',
    'queue_time', 'test_coverage', 'deploy_frequency', 'lead_time',
  ])).optional(),
  timeRange: z.enum(['24h', '7d', '30d', '90d']).optional(),
  refreshInterval: z.number().int().min(5).max(3600).optional(),
  visibility: z.enum(['public', 'private', 'team']).optional(),
  enabled: z.boolean().optional(),
});

export const buildDashboardQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  repositoryUrl: z.string().url().max(2000).optional(),
  enabled: z.boolean().optional(),
});

// --- TestDashboard ---
export const testDashboardCreateSchema = z.object({
  name: z.string().min(2).max(200),
  project: z.string().min(1).max(200),
  testTypes: z.array(z.enum(['unit', 'integration', 'e2e', 'performance', 'security', 'accessibility'])),
  metrics: z.array(z.enum([
    'total_tests', 'pass_rate', 'fail_rate', 'skip_rate',
    'avg_duration', 'flaky_tests', 'coverage', 'mutation_score',
  ])),
  timeRange: z.enum(['24h', '7d', '30d', '90d']),
  flakyTestThreshold: z.number().int().min(1).max(100).default(3),
  coverageThreshold: z.number().min(0).max(100).default(80),
  enabled: z.boolean().default(true),
});

export const testDashboardUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  testTypes: z.array(z.enum(['unit', 'integration', 'e2e', 'performance', 'security', 'accessibility'])).optional(),
  metrics: z.array(z.enum([
    'total_tests', 'pass_rate', 'fail_rate', 'skip_rate',
    'avg_duration', 'flaky_tests', 'coverage', 'mutation_score',
  ])).optional(),
  timeRange: z.enum(['24h', '7d', '30d', '90d']).optional(),
  flakyTestThreshold: z.number().int().min(1).max(100).optional(),
  coverageThreshold: z.number().min(0).max(100).optional(),
  enabled: z.boolean().optional(),
});

export const testDashboardQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'project', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- CoverageDashboard ---
export const coverageDashboardCreateSchema = z.object({
  name: z.string().min(2).max(200),
  project: z.string().min(1).max(200),
  coverageTypes: z.array(z.enum(['line', 'branch', 'function', 'statement', 'mutation'])),
  thresholds: z.array(z.enum(['total', 'new_code', 'changed_code'])),
  minCoverage: z.number().min(0).max(100).default(80),
  trendPeriod: z.enum(['7d', '30d', '90d']),
  alertOnRegression: z.boolean().default(true),
  regressionThreshold: z.number().min(0).max(100).default(5),
  enabled: z.boolean().default(true),
});

export const coverageDashboardUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  coverageTypes: z.array(z.enum(['line', 'branch', 'function', 'statement', 'mutation'])).optional(),
  thresholds: z.array(z.enum(['total', 'new_code', 'changed_code'])).optional(),
  minCoverage: z.number().min(0).max(100).optional(),
  trendPeriod: z.enum(['7d', '30d', '90d']).optional(),
  alertOnRegression: z.boolean().optional(),
  regressionThreshold: z.number().min(0).max(100).optional(),
  enabled: z.boolean().optional(),
});

export const coverageDashboardQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'project', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- CodeReview ---
export const codeReviewCreateSchema = z.object({
  pullRequestId: z.string().uuid(),
  repositoryUrl: z.string().url().max(2000),
  title: z.string().min(2).max(500),
  author: z.string().uuid(),
  reviewers: z.array(z.string().uuid()),
  status: z.enum(['pending', 'in_review', 'approved', 'changes_requested', 'merged', 'closed']),
  labels: z.array(z.string().max(100)).optional(),
  checks: z.array(z.object({
    name: z.string().max(200),
    status: z.enum(['pending', 'running', 'success', 'failed', 'cancelled']),
    url: z.string().url().max(2000).optional(),
  })).optional(),
  mergeStrategy: z.enum(['merge_commit', 'squash', 'rebase']).default('squash'),
  autoMerge: z.boolean().default(false),
  requireApproval: z.boolean().default(true),
  minApprovals: z.number().int().min(1).max(10).default(1),
});

export const codeReviewUpdateSchema = z.object({
  title: z.string().min(2).max(500).optional(),
  reviewers: z.array(z.string().uuid()).optional(),
  status: z.enum(['pending', 'in_review', 'approved', 'changes_requested', 'merged', 'closed']).optional(),
  labels: z.array(z.string().max(100)).optional(),
  checks: z.array(z.object({
    name: z.string().max(200),
    status: z.enum(['pending', 'running', 'success', 'failed', 'cancelled']),
    url: z.string().url().max(2000).optional(),
  })).optional(),
  autoMerge: z.boolean().optional(),
});

export const codeReviewQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  repositoryUrl: z.string().url().max(2000).optional(),
  author: z.string().uuid().optional(),
  status: z.enum(['pending', 'in_review', 'approved', 'changes_requested', 'merged', 'closed']).optional(),
  labels: z.array(z.string().max(100)).optional(),
});

// --- SecurityScan ---
export const securityScanCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(['sast', 'dast', 'sca', 'secret', 'container', 'iac']),
  target: z.string().min(1).max(500),
  targetType: z.enum(['repository', 'container_image', 'url', 'file', 'infrastructure']),
  schedule: z.string().max(100).optional(),
  severityThreshold: z.enum(['info', 'low', 'medium', 'high', 'critical']).default('medium'),
  excludePatterns: z.array(z.string().max(500)).optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])),
  autoScan: z.boolean().default(true),
  blockOnCritical: z.boolean().default(false),
  enabled: z.boolean().default(true),
});

export const securityScanUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  type: z.enum(['sast', 'dast', 'sca', 'secret', 'container', 'iac']).optional(),
  target: z.string().min(1).max(500).optional(),
  schedule: z.string().max(100).optional(),
  severityThreshold: z.enum(['info', 'low', 'medium', 'high', 'critical']).optional(),
  excludePatterns: z.array(z.string().max(500)).optional(),
  notificationChannels: z.array(z.enum(['email', 'slack', 'webhook'])).optional(),
  autoScan: z.boolean().optional(),
  blockOnCritical: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const securityScanQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['sast', 'dast', 'sca', 'secret', 'container', 'iac']).optional(),
  enabled: z.boolean().optional(),
});

// --- DependencyScan ---
export const dependencyScanCreateSchema = z.object({
  name: z.string().min(2).max(200),
  projectUrl: z.string().url().max(2000),
  manifestFiles: z.array(z.string().max(500)),
  scanType: z.enum(['npm', 'pip', 'maven', 'nuget', 'go', 'ruby', 'cargo', 'mixed']),
  excludeDev: z.boolean().default(false),
  excludeOptional: z.boolean().default(true),
  vulnerabilityDb: z.array(z.enum(['nvd', 'github', 'snyk', 'osv', 'custom'])),
  severityThreshold: z.enum(['info', 'low', 'medium', 'high', 'critical']).default('medium'),
  autoFix: z.boolean().default(false),
  autoFixTypes: z.array(z.enum(['patch', 'minor', 'major'])).optional(),
  schedule: z.string().max(100).optional(),
  enabled: z.boolean().default(true),
});

export const dependencyScanUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  manifestFiles: z.array(z.string().max(500)).optional(),
  scanType: z.enum(['npm', 'pip', 'maven', 'nuget', 'go', 'ruby', 'cargo', 'mixed']).optional(),
  excludeDev: z.boolean().optional(),
  excludeOptional: z.boolean().optional(),
  vulnerabilityDb: z.array(z.enum(['nvd', 'github', 'snyk', 'osv', 'custom'])).optional(),
  severityThreshold: z.enum(['info', 'low', 'medium', 'high', 'critical']).optional(),
  autoFix: z.boolean().optional(),
  autoFixTypes: z.array(z.enum(['patch', 'minor', 'major'])).optional(),
  schedule: z.string().max(100).optional(),
  enabled: z.boolean().optional(),
});

export const dependencyScanQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'scanType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  scanType: z.enum(['npm', 'pip', 'maven', 'nuget', 'go', 'ruby', 'cargo', 'mixed']).optional(),
  enabled: z.boolean().optional(),
});

// --- InfrastructureCode ---
export const infrastructureCodeCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: z.enum(['terraform', 'ansible', 'cloudformation', 'pulumi', 'helm', 'custom']),
  repositoryUrl: z.string().url().max(2000),
  branch: z.string().max(200).default('main'),
  environment: z.enum(['production', 'staging', 'development']),
  variables: z.record(z.string(), z.string()).optional(),
  secrets: z.array(z.string().max(200)).optional(),
  driftDetection: z.boolean().default(true),
  autoApply: z.boolean().default(false),
  approvalRequired: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

export const infrastructureCodeUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  type: z.enum(['terraform', 'ansible', 'cloudformation', 'pulumi', 'helm', 'custom']).optional(),
  branch: z.string().max(200).optional(),
  variables: z.record(z.string(), z.string()).optional(),
  secrets: z.array(z.string().max(200)).optional(),
  driftDetection: z.boolean().optional(),
  autoApply: z.boolean().optional(),
  approvalRequired: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const infrastructureCodeQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['terraform', 'ansible', 'cloudformation', 'pulumi', 'helm', 'custom']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  enabled: z.boolean().optional(),
});

// --- ContainerImage ---
export const containerImageCreateSchema = z.object({
  name: z.string().min(2).max(200),
  registry: z.string().url().max(2000),
  repository: z.string().min(1).max(500),
  tag: z.string().min(1).max(200),
  digest: z.string().max(256).optional(),
  baseImage: z.string().max(500).optional(),
  size: z.number().int().min(0).optional(),
  platforms: z.array(z.string().max(100)).default(['linux/amd64']),
  labels: z.record(z.string(), z.string()).optional(),
  vulnerabilities: z.object({
    critical: z.number().int().min(0).default(0),
    high: z.number().int().min(0).default(0),
    medium: z.number().int().min(0).default(0),
    low: z.number().int().min(0).default(0),
  }).optional(),
  signed: z.boolean().default(false),
  scanned: z.boolean().default(false),
});

export const containerImageUpdateSchema = z.object({
  tag: z.string().min(1).max(200).optional(),
  digest: z.string().max(256).optional(),
  labels: z.record(z.string(), z.string()).optional(),
  vulnerabilities: z.object({
    critical: z.number().int().min(0).default(0),
    high: z.number().int().min(0).default(0),
    medium: z.number().int().min(0).default(0),
    low: z.number().int().min(0).default(0),
  }).optional(),
  signed: z.boolean().optional(),
  scanned: z.boolean().optional(),
});

export const containerImageQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'tag', 'size', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  registry: z.string().url().max(2000).optional(),
  signed: z.boolean().optional(),
  scanned: z.boolean().optional(),
});

// --- HelmChart ---
export const helmChartCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  repository: z.string().url().max(2000),
  chart: z.string().min(1).max(200),
  version: z.string().min(1).max(100),
  appVersion: z.string().max(100).optional(),
  values: z.record(z.string(), z.unknown()).optional(),
  overrides: z.record(z.string(), z.unknown()).optional(),
  namespace: z.string().max(200).optional(),
  releaseName: z.string().max(200).optional(),
  atomic: z.boolean().default(true),
  wait: z.boolean().default(true),
  timeout: z.number().int().min(1).max(3600).default(300),
  environment: z.enum(['production', 'staging', 'development']),
  enabled: z.boolean().default(true),
});

export const helmChartUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  version: z.string().min(1).max(100).optional(),
  appVersion: z.string().max(100).optional(),
  values: z.record(z.string(), z.unknown()).optional(),
  overrides: z.record(z.string(), z.unknown()).optional(),
  namespace: z.string().max(200).optional(),
  releaseName: z.string().max(200).optional(),
  atomic: z.boolean().optional(),
  wait: z.boolean().optional(),
  timeout: z.number().int().min(1).max(3600).optional(),
  enabled: z.boolean().optional(),
});

export const helmChartQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'version', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  enabled: z.boolean().optional(),
});

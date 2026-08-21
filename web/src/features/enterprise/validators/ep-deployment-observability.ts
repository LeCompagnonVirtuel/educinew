// Enterprise Platform Validators - Deployment & Observability
// Phase 2.10 - EduCI Platform

import { z } from 'zod';

// ============================================================
// Domain 3: Deployment Pipeline
// ============================================================

// --- ReleasePipeline ---
export const releasePipelineCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  stages: z.array(z.string().min(1).max(200)),
  trigger: z.enum(['manual', 'push', 'schedule', 'webhook']),
  environment: z.enum(['production', 'staging', 'development']),
  repositoryUrl: z.string().url().max(2000).optional(),
  branch: z.string().max(200).default('main'),
  isActive: z.boolean().default(true),
  maxRetries: z.number().int().min(0).max(5).default(0),
  timeoutMinutes: z.number().int().min(1).max(1440).default(60),
});

export const releasePipelineUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  stages: z.array(z.string().min(1).max(200)).optional(),
  trigger: z.enum(['manual', 'push', 'schedule', 'webhook']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  branch: z.string().max(200).optional(),
  isActive: z.boolean().optional(),
  maxRetries: z.number().int().min(0).max(5).optional(),
  timeoutMinutes: z.number().int().min(1).max(1440).optional(),
});

export const releasePipelineQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'environment', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  isActive: z.boolean().optional(),
});

// --- PipelineStage ---
export const pipelineStageCreateSchema = z.object({
  pipelineId: z.string().uuid(),
  name: z.string().min(1).max(200),
  type: z.enum(['build', 'test', 'security', 'approval', 'deploy', 'rollback', 'notification']),
  order: z.number().int().min(0),
  config: z.record(z.string(), z.unknown()),
  required: z.boolean().default(true),
  timeoutMinutes: z.number().int().min(1).max(1440).default(30),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  conditions: z.array(z.object({
    type: z.enum(['branch', 'tag', 'variable', 'manual']),
    value: z.string().max(500),
  })).optional(),
});

export const pipelineStageUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  type: z.enum(['build', 'test', 'security', 'approval', 'deploy', 'rollback', 'notification']).optional(),
  order: z.number().int().min(0).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  required: z.boolean().optional(),
  timeoutMinutes: z.number().int().min(1).max(1440).optional(),
  conditions: z.array(z.object({
    type: z.enum(['branch', 'tag', 'variable', 'manual']),
    value: z.string().max(500),
  })).optional(),
});

export const pipelineStageQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'order', 'created_at']).default('order'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  pipelineId: z.string().uuid().optional(),
  type: z.enum(['build', 'test', 'security', 'approval', 'deploy', 'rollback', 'notification']).optional(),
});

// --- PipelineRun ---
export const pipelineRunCreateSchema = z.object({
  pipelineId: z.string().uuid(),
  trigger: z.enum(['manual', 'push', 'schedule', 'webhook', 'api']),
  commitHash: z.string().min(1).max(40),
  branch: z.string().max(200),
  metadata: z.record(z.string(), z.string()).optional(),
  variables: z.record(z.string(), z.string()).optional(),
});

export const pipelineRunUpdateSchema = z.object({
  status: z.enum(['queued', 'running', 'success', 'failed', 'cancelled', 'timeout']).optional(),
  completedAt: z.string().datetime().optional(),
  artifacts: z.array(z.object({
    name: z.string().max(200),
    url: z.string().url().max(2000),
    size: z.number().int().min(0),
  })).optional(),
  logs: z.string().max(100000).optional(),
});

export const pipelineRunQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['created_at', 'completedAt', 'status']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  pipelineId: z.string().uuid().optional(),
  status: z.enum(['queued', 'running', 'success', 'failed', 'cancelled', 'timeout']).optional(),
  branch: z.string().max(200).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- VersionManager ---
export const versionManagerCreateSchema = z.object({
  projectName: z.string().min(1).max(200),
  currentVersion: z.string().min(1).max(50),
  versioningScheme: z.enum(['semver', 'calver', 'sequential', 'custom']),
  preReleaseTag: z.string().max(50).optional(),
  changelogFormat: z.enum(['conventional', 'keepachangelog', 'custom']).default('conventional'),
  autoIncrement: z.boolean().default(false),
  tagPrefix: z.string().max(50).default('v'),
  releaseBranchPattern: z.string().max(200).default('release/*'),
});

export const versionManagerUpdateSchema = z.object({
  currentVersion: z.string().min(1).max(50).optional(),
  versioningScheme: z.enum(['semver', 'calver', 'sequential', 'custom']).optional(),
  preReleaseTag: z.string().max(50).optional(),
  changelogFormat: z.enum(['conventional', 'keepachangelog', 'custom']).optional(),
  autoIncrement: z.boolean().optional(),
  tagPrefix: z.string().max(50).optional(),
  releaseBranchPattern: z.string().max(200).optional(),
});

export const versionManagerQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['projectName', 'currentVersion', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  versioningScheme: z.enum(['semver', 'calver', 'sequential', 'custom']).optional(),
});

// --- BlueGreenDeployment ---
export const blueGreenDeploymentCreateSchema = z.object({
  serviceId: z.string().uuid(),
  serviceName: z.string().min(2).max(200),
  activeSlot: z.enum(['blue', 'green']),
  newVersion: z.string().min(1).max(50),
  healthCheckUrl: z.string().url().max(2000),
  healthCheckInterval: z.number().int().min(1).max(300).default(30),
  healthCheckThreshold: z.number().int().min(1).max(100).default(3),
  switchTimeout: z.number().int().min(1).max(3600).default(300),
  rollbackOnFailure: z.boolean().default(true),
});

export const blueGreenDeploymentUpdateSchema = z.object({
  activeSlot: z.enum(['blue', 'green']).optional(),
  newVersion: z.string().min(1).max(50).optional(),
  healthCheckUrl: z.string().url().max(2000).optional(),
  healthCheckInterval: z.number().int().min(1).max(300).optional(),
  healthCheckThreshold: z.number().int().min(1).max(100).optional(),
  switchTimeout: z.number().int().min(1).max(3600).optional(),
  status: z.enum(['pending', 'deploying', 'switching', 'completed', 'failed', 'rolled_back']).optional(),
});

export const blueGreenDeploymentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['serviceName', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  serviceId: z.string().uuid().optional(),
  status: z.enum(['pending', 'deploying', 'switching', 'completed', 'failed', 'rolled_back']).optional(),
});

// --- CanaryDeployment ---
export const canaryDeploymentCreateSchema = z.object({
  serviceId: z.string().uuid(),
  serviceName: z.string().min(2).max(200),
  newVersion: z.string().min(1).max(50),
  canaryPercentage: z.number().min(0).max(100).default(5),
  incrementPercentage: z.number().min(0).max(50).default(5),
  incrementInterval: z.number().int().min(60).max(86400).default(300),
  metricsThreshold: z.object({
    errorRate: z.number().min(0).max(100).default(1),
    p95Latency: z.number().min(0).max(60000).default(500),
    cpuUsage: z.number().min(0).max(100).default(80),
    memoryUsage: z.number().min(0).max(100).default(85),
  }),
  autoPromote: z.boolean().default(false),
  autoRollback: z.boolean().default(true),
});

export const canaryDeploymentUpdateSchema = z.object({
  newVersion: z.string().min(1).max(50).optional(),
  canaryPercentage: z.number().min(0).max(100).optional(),
  incrementPercentage: z.number().min(0).max(50).optional(),
  incrementInterval: z.number().int().min(60).max(86400).optional(),
  metricsThreshold: z.object({
    errorRate: z.number().min(0).max(100).default(1),
    p95Latency: z.number().min(0).max(60000).default(500),
    cpuUsage: z.number().min(0).max(100).default(80),
    memoryUsage: z.number().min(0).max(100).default(85),
  }).optional(),
  status: z.enum(['pending', 'canary', 'promoting', 'completed', 'failed', 'rolled_back']).optional(),
});

export const canaryDeploymentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['serviceName', 'canaryPercentage', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  serviceId: z.string().uuid().optional(),
  status: z.enum(['pending', 'canary', 'promoting', 'completed', 'failed', 'rolled_back']).optional(),
});

// --- Rollback ---
export const rollbackCreateSchema = z.object({
  deploymentId: z.string().uuid(),
  targetVersion: z.string().min(1).max(50),
  reason: z.string().min(1).max(2000),
  type: z.enum(['manual', 'automatic', 'scheduled']),
  preserveData: z.boolean().default(false),
  notifyStakeholders: z.boolean().default(true),
  verificationChecks: z.array(z.enum(['health_check', 'smoke_test', 'load_test', 'manual_verify'])),
});

export const rollbackUpdateSchema = z.object({
  reason: z.string().min(1).max(2000).optional(),
  status: z.enum(['pending', 'executing', 'completed', 'failed']).optional(),
  verificationChecks: z.array(z.enum(['health_check', 'smoke_test', 'load_test', 'manual_verify'])).optional(),
  completedAt: z.string().datetime().optional(),
});

export const rollbackQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['targetVersion', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  deploymentId: z.string().uuid().optional(),
  type: z.enum(['manual', 'automatic', 'scheduled']).optional(),
  status: z.enum(['pending', 'executing', 'completed', 'failed']).optional(),
});

// --- MigrationManager ---
export const migrationManagerCreateSchema = z.object({
  tenantId: z.string().uuid(),
  fromVersion: z.string().min(1).max(50),
  toVersion: z.string().min(1).max(50),
  migrationSteps: z.array(z.object({
    order: z.number().int().min(0),
    type: z.enum(['schema', 'data', 'config', 'index']),
    description: z.string().max(500),
    sql: z.string().max(10000).optional(),
    reversible: z.boolean().default(true),
  })),
  estimatedDuration: z.number().int().min(0),
  requiresDowntime: z.boolean().default(false),
  preMigrationChecks: z.array(z.string().max(500)),
  postMigrationChecks: z.array(z.string().max(500)),
});

export const migrationManagerUpdateSchema = z.object({
  toVersion: z.string().min(1).max(50).optional(),
  migrationSteps: z.array(z.object({
    order: z.number().int().min(0),
    type: z.enum(['schema', 'data', 'config', 'index']),
    description: z.string().max(500),
    sql: z.string().max(10000).optional(),
    reversible: z.boolean().default(true),
  })).optional(),
  status: z.enum(['pending', 'running', 'completed', 'failed', 'rolled_back']).optional(),
});

export const migrationManagerQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['fromVersion', 'toVersion', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  tenantId: z.string().uuid().optional(),
  status: z.enum(['pending', 'running', 'completed', 'failed', 'rolled_back']).optional(),
});

// --- EnvironmentPromotion ---
export const environmentPromotionCreateSchema = z.object({
  serviceId: z.string().uuid(),
  serviceName: z.string().min(2).max(200),
  fromEnvironment: z.enum(['development', 'staging', 'production']),
  toEnvironment: z.enum(['development', 'staging', 'production']),
  version: z.string().min(1).max(50),
  approvalRequired: z.boolean().default(true),
  approvers: z.array(z.string().uuid()),
  promotionCriteria: z.array(z.enum(['tests_pass', 'security_scan', 'performance_check', 'manual_approval'])),
  autoPromote: z.boolean().default(false),
  scheduleAt: z.string().datetime().optional(),
});

export const environmentPromotionUpdateSchema = z.object({
  version: z.string().min(1).max(50).optional(),
  approvalRequired: z.boolean().optional(),
  approvers: z.array(z.string().uuid()).optional(),
  promotionCriteria: z.array(z.enum(['tests_pass', 'security_scan', 'performance_check', 'manual_approval'])).optional(),
  status: z.enum(['pending', 'approved', 'promoting', 'completed', 'failed', 'rejected']).optional(),
});

export const environmentPromotionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['serviceName', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  serviceId: z.string().uuid().optional(),
  fromEnvironment: z.enum(['development', 'staging', 'production']).optional(),
  toEnvironment: z.enum(['development', 'staging', 'production']).optional(),
  status: z.enum(['pending', 'approved', 'promoting', 'completed', 'failed', 'rejected']).optional(),
});

// --- DeploymentHistory ---
export const deploymentHistoryCreateSchema = z.object({
  deploymentId: z.string().uuid(),
  serviceId: z.string().uuid(),
  serviceName: z.string().min(2).max(200),
  version: z.string().min(1).max(50),
  environment: z.enum(['production', 'staging', 'development']),
  action: z.enum(['deploy', 'rollback', 'promote', 'scale', 'config_change']),
  status: z.enum(['success', 'failed', 'cancelled', 'rolled_back']),
  deployedBy: z.string().uuid(),
  metadata: z.record(z.string(), z.unknown()),
});

export const deploymentHistoryUpdateSchema = z.object({
  status: z.enum(['success', 'failed', 'cancelled', 'rolled_back']).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  completedAt: z.string().datetime().optional(),
});

export const deploymentHistoryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['serviceName', 'version', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  serviceId: z.string().uuid().optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  action: z.enum(['deploy', 'rollback', 'promote', 'scale', 'config_change']).optional(),
  status: z.enum(['success', 'failed', 'cancelled', 'rolled_back']).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- FeatureDeployment ---
export const featureDeploymentCreateSchema = z.object({
  featureFlagId: z.string().uuid(),
  featureName: z.string().min(2).max(200),
  targetEnvironments: z.array(z.enum(['production', 'staging', 'development'])),
  rolloutStrategy: z.enum(['percentage', 'user_segment', 'geographic', 'time_based']),
  rolloutConfig: z.record(z.string(), z.unknown()),
  monitoringMetrics: z.array(z.enum(['error_rate', 'latency', 'conversion', 'engagement'])),
  autoRollbackOnError: z.boolean().default(true),
  scheduledAt: z.string().datetime().optional(),
});

export const featureDeploymentUpdateSchema = z.object({
  rolloutStrategy: z.enum(['percentage', 'user_segment', 'geographic', 'time_based']).optional(),
  rolloutConfig: z.record(z.string(), z.unknown()).optional(),
  monitoringMetrics: z.array(z.enum(['error_rate', 'latency', 'conversion', 'engagement'])).optional(),
  status: z.enum(['pending', 'rolling_out', 'completed', 'failed', 'rolled_back']).optional(),
});

export const featureDeploymentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['featureName', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  featureFlagId: z.string().uuid().optional(),
  status: z.enum(['pending', 'rolling_out', 'completed', 'failed', 'rolled_back']).optional(),
});

// --- ConfigDeployment ---
export const configDeploymentCreateSchema = z.object({
  configKey: z.string().min(1).max(200),
  environment: z.enum(['production', 'staging', 'development']),
  value: z.string().max(10000),
  encrypted: z.boolean().default(false),
  version: z.string().min(1).max(50),
  deployedBy: z.string().uuid(),
  changeReason: z.string().min(1).max(500),
  dependencies: z.array(z.string().max(200)).optional(),
});

export const configDeploymentUpdateSchema = z.object({
  value: z.string().max(10000).optional(),
  encrypted: z.boolean().optional(),
  changeReason: z.string().min(1).max(500).optional(),
  status: z.enum(['pending', 'deploying', 'completed', 'failed', 'rolled_back']).optional(),
});

export const configDeploymentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['configKey', 'version', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  configKey: z.string().max(200).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  status: z.enum(['pending', 'deploying', 'completed', 'failed', 'rolled_back']).optional(),
});

// --- InfrastructureChange ---
export const infrastructureChangeCreateSchema = z.object({
  type: z.enum(['server', 'network', 'storage', 'database', 'cdn', 'dns']),
  action: z.enum(['create', 'update', 'delete', 'scale', 'migrate']),
  resource: z.string().min(1).max(200),
  specification: z.record(z.string(), z.unknown()),
  environment: z.enum(['production', 'staging', 'development']),
  changeRequest: z.string().max(2000).optional(),
  impactAssessment: z.string().max(2000).optional(),
  rollbackPlan: z.string().max(2000).optional(),
  approvalRequired: z.boolean().default(true),
});

export const infrastructureChangeUpdateSchema = z.object({
  specification: z.record(z.string(), z.unknown()).optional(),
  changeRequest: z.string().max(2000).optional(),
  impactAssessment: z.string().max(2000).optional(),
  rollbackPlan: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'executing', 'completed', 'failed', 'rolled_back']).optional(),
});

export const infrastructureChangeQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['resource', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  type: z.enum(['server', 'network', 'storage', 'database', 'cdn', 'dns']).optional(),
  action: z.enum(['create', 'update', 'delete', 'scale', 'migrate']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  status: z.enum(['pending', 'approved', 'executing', 'completed', 'failed', 'rolled_back']).optional(),
});

// --- DeploymentApproval ---
export const deploymentApprovalCreateSchema = z.object({
  deploymentId: z.string().uuid(),
  deploymentType: z.enum(['release', 'rollback', 'config', 'feature', 'infrastructure']),
  environment: z.enum(['production', 'staging', 'development']),
  requestedBy: z.string().uuid(),
  approvers: z.array(z.object({
    userId: z.string().uuid(),
    required: z.boolean().default(true),
  })),
  changeDescription: z.string().min(1).max(2000),
  riskLevel: z.enum(['low', 'medium', 'high', 'critical']),
  expiresAt: z.string().datetime(),
});

export const deploymentApprovalUpdateSchema = z.object({
  approvers: z.array(z.object({
    userId: z.string().uuid(),
    required: z.boolean().default(true),
  })).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'expired']).optional(),
  comment: z.string().max(1000).optional(),
});

export const deploymentApprovalQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['deploymentType', 'riskLevel', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  deploymentId: z.string().uuid().optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'expired']).optional(),
  riskLevel: z.enum(['low', 'medium', 'high', 'critical']).optional(),
});

// ============================================================
// Domain 4: Observability
// ============================================================

// --- DistributedTrace ---
export const distributedTraceCreateSchema = z.object({
  traceId: z.string().max(64),
  serviceName: z.string().min(1).max(200),
  operationName: z.string().min(1).max(500),
  startTime: z.string().datetime(),
  durationMs: z.number().int().min(0),
  status: z.enum(['ok', 'error', 'timeout', 'cancelled']),
  tags: z.record(z.string(), z.string()),
  environment: z.enum(['production', 'staging', 'development']),
  sampled: z.boolean().default(true),
});

export const distributedTraceUpdateSchema = z.object({
  durationMs: z.number().int().min(0).optional(),
  status: z.enum(['ok', 'error', 'timeout', 'cancelled']).optional(),
  tags: z.record(z.string(), z.string()).optional(),
});

export const distributedTraceQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['startTime', 'durationMs', 'created_at']).default('startTime'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  traceId: z.string().max(64).optional(),
  serviceName: z.string().max(200).optional(),
  operationName: z.string().max(500).optional(),
  status: z.enum(['ok', 'error', 'timeout', 'cancelled']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  minDuration: z.number().int().min(0).optional(),
  maxDuration: z.number().int().min(0).optional(),
});

// --- TraceSpan ---
export const traceSpanCreateSchema = z.object({
  traceId: z.string().max(64),
  spanId: z.string().max(32),
  parentSpanId: z.string().max(32).optional(),
  serviceName: z.string().min(1).max(200),
  operationName: z.string().min(1).max(500),
  startTime: z.string().datetime(),
  durationMs: z.number().int().min(0),
  status: z.enum(['ok', 'error', 'timeout', 'cancelled']),
  tags: z.record(z.string(), z.string()),
  logs: z.array(z.object({
    timestamp: z.string().datetime(),
    fields: z.record(z.string(), z.string()),
  })).optional(),
});

export const traceSpanUpdateSchema = z.object({
  durationMs: z.number().int().min(0).optional(),
  status: z.enum(['ok', 'error', 'timeout', 'cancelled']).optional(),
  tags: z.record(z.string(), z.string()).optional(),
  logs: z.array(z.object({
    timestamp: z.string().datetime(),
    fields: z.record(z.string(), z.string()),
  })).optional(),
});

export const traceSpanQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['startTime', 'durationMs']).default('startTime'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  traceId: z.string().max(64).optional(),
  serviceName: z.string().max(200).optional(),
  operationName: z.string().max(500).optional(),
  status: z.enum(['ok', 'error', 'timeout', 'cancelled']).optional(),
  minDuration: z.number().int().min(0).optional(),
  maxDuration: z.number().int().min(0).optional(),
});

// --- StructuredLog ---
export const structuredLogCreateSchema = z.object({
  level: z.enum(['debug', 'info', 'warn', 'error', 'fatal']),
  message: z.string().min(1).max(10000),
  serviceName: z.string().min(1).max(200),
  traceId: z.string().max(64).optional(),
  spanId: z.string().max(32).optional(),
  fields: z.record(z.string(), z.unknown()),
  environment: z.enum(['production', 'staging', 'development']),
  timestamp: z.string().datetime(),
  source: z.string().max(200).optional(),
});

export const structuredLogUpdateSchema = z.object({
  fields: z.record(z.string(), z.unknown()).optional(),
});

export const structuredLogQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['timestamp', 'level', 'created_at']).default('timestamp'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  level: z.enum(['debug', 'info', 'warn', 'error', 'fatal']).optional(),
  serviceName: z.string().max(200).optional(),
  message: z.string().max(10000).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  traceId: z.string().max(64).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- Metric ---
export const metricCreateSchema = z.object({
  name: z.string().min(1).max(200),
  type: z.enum(['counter', 'gauge', 'histogram', 'summary']),
  value: z.number(),
  labels: z.record(z.string(), z.string()),
  serviceName: z.string().min(1).max(200),
  environment: z.enum(['production', 'staging', 'development']),
  timestamp: z.string().datetime(),
  unit: z.string().max(50).optional(),
  description: z.string().max(500).optional(),
});

export const metricUpdateSchema = z.object({
  value: z.number().optional(),
  labels: z.record(z.string(), z.string()).optional(),
});

export const metricQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'value', 'timestamp']).default('timestamp'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  name: z.string().max(200).optional(),
  type: z.enum(['counter', 'gauge', 'histogram', 'summary']).optional(),
  serviceName: z.string().max(200).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- PerformanceDashboard ---
export const performanceDashboardCreateSchema = z.object({
  name: z.string().min(2).max(200),
  services: z.array(z.string().min(1).max(200)),
  metrics: z.array(z.enum([
    'response_time', 'throughput', 'error_rate', 'cpu_usage', 'memory_usage',
    'disk_io', 'network_io', 'queue_depth', 'connection_pool', 'gc_time',
  ])),
  timeRange: z.enum(['1h', '6h', '12h', '24h', '7d', '30d']),
  refreshInterval: z.number().int().min(5).max(3600).default(30),
  alerts: z.array(z.object({
    metric: z.string().max(200),
    threshold: z.number(),
    operator: z.enum(['gt', 'lt', 'eq', 'gte', 'lte']),
    severity: z.enum(['info', 'warning', 'critical']),
  })).optional(),
  visibility: z.enum(['public', 'private', 'team']).default('private'),
});

export const performanceDashboardUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  services: z.array(z.string().min(1).max(200)).optional(),
  metrics: z.array(z.enum([
    'response_time', 'throughput', 'error_rate', 'cpu_usage', 'memory_usage',
    'disk_io', 'network_io', 'queue_depth', 'connection_pool', 'gc_time',
  ])).optional(),
  timeRange: z.enum(['1h', '6h', '12h', '24h', '7d', '30d']).optional(),
  refreshInterval: z.number().int().min(5).max(3600).optional(),
  alerts: z.array(z.object({
    metric: z.string().max(200),
    threshold: z.number(),
    operator: z.enum(['gt', 'lt', 'eq', 'gte', 'lte']),
    severity: z.enum(['info', 'warning', 'critical']),
  })).optional(),
  visibility: z.enum(['public', 'private', 'team']).optional(),
});

export const performanceDashboardQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  visibility: z.enum(['public', 'private', 'team']).optional(),
});

// --- ErrorDashboard ---
export const errorDashboardCreateSchema = z.object({
  name: z.string().min(2).max(200),
  services: z.array(z.string().min(1).max(200)),
  errorCategories: z.array(z.enum([
    'client_error', 'server_error', 'timeout', 'rate_limit',
    'authentication', 'authorization', 'validation', 'external',
  ])),
  groupBy: z.enum(['error_type', 'service', 'endpoint', 'user_agent']),
  timeRange: z.enum(['1h', '6h', '12h', '24h', '7d', '30d']),
  refreshInterval: z.number().int().min(5).max(3600).default(60),
  topErrorsCount: z.number().int().min(1).max(100).default(20),
  includeResolved: z.boolean().default(false),
});

export const errorDashboardUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  services: z.array(z.string().min(1).max(200)).optional(),
  errorCategories: z.array(z.enum([
    'client_error', 'server_error', 'timeout', 'rate_limit',
    'authentication', 'authorization', 'validation', 'external',
  ])).optional(),
  groupBy: z.enum(['error_type', 'service', 'endpoint', 'user_agent']).optional(),
  timeRange: z.enum(['1h', '6h', '12h', '24h', '7d', '30d']).optional(),
  topErrorsCount: z.number().int().min(1).max(100).optional(),
  includeResolved: z.boolean().optional(),
});

export const errorDashboardQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  groupBy: z.enum(['error_type', 'service', 'endpoint', 'user_agent']).optional(),
});

// --- SlowQuery ---
export const slowQueryCreateSchema = z.object({
  queryHash: z.string().min(1).max(64),
  queryText: z.string().min(1).max(50000),
  database: z.string().min(1).max(200),
  averageDurationMs: z.number().min(0),
  maxDurationMs: z.number().min(0),
  executionCount: z.number().int().min(0),
  lastSeen: z.string().datetime(),
  firstSeen: z.string().datetime(),
  tables: z.array(z.string().max(200)),
  indexes: z.array(z.string().max(200)),
  suggestions: z.array(z.string().max(500)),
  severity: z.enum(['info', 'warning', 'critical']),
});

export const slowQueryUpdateSchema = z.object({
  averageDurationMs: z.number().min(0).optional(),
  maxDurationMs: z.number().min(0).optional(),
  executionCount: z.number().int().min(0).optional(),
  lastSeen: z.string().datetime().optional(),
  suggestions: z.array(z.string().max(500)).optional(),
  severity: z.enum(['info', 'warning', 'critical']).optional(),
});

export const slowQueryQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['averageDurationMs', 'executionCount', 'lastSeen']).default('lastSeen'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  database: z.string().max(200).optional(),
  severity: z.enum(['info', 'warning', 'critical']).optional(),
  minDuration: z.number().min(0).optional(),
  maxDuration: z.number().min(0).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- AlertRule ---
export const alertRuleCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  query: z.string().min(1).max(5000),
  condition: z.enum(['gt', 'lt', 'eq', 'gte', 'lte']),
  threshold: z.number(),
  for: z.string().max(50),
  severity: z.enum(['info', 'warning', 'critical', 'emergency']),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()).optional(),
  notifyChannels: z.array(z.enum(['email', 'slack', 'webhook', 'pagerduty', 'sms'])),
  enabled: z.boolean().default(true),
  environment: z.enum(['production', 'staging', 'development']),
});

export const alertRuleUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  query: z.string().min(1).max(5000).optional(),
  condition: z.enum(['gt', 'lt', 'eq', 'gte', 'lte']).optional(),
  threshold: z.number().optional(),
  for: z.string().max(50).optional(),
  severity: z.enum(['info', 'warning', 'critical', 'emergency']).optional(),
  labels: z.record(z.string(), z.string()).optional(),
  annotations: z.record(z.string(), z.string()).optional(),
  notifyChannels: z.array(z.enum(['email', 'slack', 'webhook', 'pagerduty', 'sms'])).optional(),
  enabled: z.boolean().optional(),
});

export const alertRuleQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'severity', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  severity: z.enum(['info', 'warning', 'critical', 'emergency']).optional(),
  enabled: z.boolean().optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
});

// --- AlertIncident ---
export const alertIncidentCreateSchema = z.object({
  ruleId: z.string().uuid(),
  ruleName: z.string().min(2).max(200),
  severity: z.enum(['info', 'warning', 'critical', 'emergency']),
  status: z.enum(['firing', 'acknowledged', 'resolved', 'silenced']),
  startedAt: z.string().datetime(),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  value: z.number(),
  environment: z.enum(['production', 'staging', 'development']),
  assignee: z.string().uuid().optional(),
  escalationPolicy: z.string().max(200).optional(),
});

export const alertIncidentUpdateSchema = z.object({
  status: z.enum(['firing', 'acknowledged', 'resolved', 'silenced']).optional(),
  assignee: z.string().uuid().optional(),
  resolvedAt: z.string().datetime().optional(),
  resolution: z.string().max(2000).optional(),
  notes: z.array(z.object({
    author: z.string().uuid(),
    content: z.string().min(1).max(2000),
    timestamp: z.string().datetime(),
  })).optional(),
});

export const alertIncidentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['startedAt', 'severity', 'status']).default('startedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  ruleId: z.string().uuid().optional(),
  severity: z.enum(['info', 'warning', 'critical', 'emergency']).optional(),
  status: z.enum(['firing', 'acknowledged', 'resolved', 'silenced']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  assignee: z.string().uuid().optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

// --- SLO ---
export const sloCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  serviceId: z.string().uuid(),
  serviceName: z.string().min(2).max(200),
  objective: z.number().min(0).max(100),
  metricType: z.enum(['availability', 'latency', 'error_rate', 'throughput']),
  metricQuery: z.string().min(1).max(5000),
  targetPercentage: z.number().min(0).max(100),
  timeWindow: z.enum(['rolling_28d', 'calendar_month', 'rolling_7d']),
  burnRateThreshold: z.number().min(0).max(100).default(10),
  errorBudgetPolicy: z.enum(['alert_only', 'throttle', 'block_deploy', 'auto_rollback']),
  enabled: z.boolean().default(true),
});

export const sloUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  objective: z.number().min(0).max(100).optional(),
  metricQuery: z.string().min(1).max(5000).optional(),
  targetPercentage: z.number().min(0).max(100).optional(),
  burnRateThreshold: z.number().min(0).max(100).optional(),
  errorBudgetPolicy: z.enum(['alert_only', 'throttle', 'block_deploy', 'auto_rollback']).optional(),
  enabled: z.boolean().optional(),
});

export const sloQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'objective', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  serviceId: z.string().uuid().optional(),
  metricType: z.enum(['availability', 'latency', 'error_rate', 'throughput']).optional(),
  enabled: z.boolean().optional(),
});

// --- SLA ---
export const slaCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  serviceId: z.string().uuid(),
  serviceName: z.string().min(2).max(200),
  availability: z.number().min(0).max(100),
  responseTimeMs: z.number().int().min(0),
  resolutionTimeMinutes: z.number().int().min(0),
  penalties: z.array(z.object({
    metric: z.string().max(200),
    threshold: z.number(),
    penalty: z.string().max(500),
  })),
  supportHours: z.object({
    timezone: z.string().max(100),
    hours: z.array(z.object({
      day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
      start: z.string().regex(/^\d{2}:\d{2}$/),
      end: z.string().regex(/^\d{2}:\d{2}$/),
    })),
  }),
  effectiveFrom: z.string().datetime(),
  effectiveTo: z.string().datetime().optional(),
  enabled: z.boolean().default(true),
});

export const slaUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  availability: z.number().min(0).max(100).optional(),
  responseTimeMs: z.number().int().min(0).optional(),
  resolutionTimeMinutes: z.number().int().min(0).optional(),
  penalties: z.array(z.object({
    metric: z.string().max(200),
    threshold: z.number(),
    penalty: z.string().max(500),
  })).optional(),
  supportHours: z.object({
    timezone: z.string().max(100),
    hours: z.array(z.object({
      day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
      start: z.string().regex(/^\d{2}:\d{2}$/),
      end: z.string().regex(/^\d{2}:\d{2}$/),
    })),
  }).optional(),
  effectiveTo: z.string().datetime().optional(),
  enabled: z.boolean().optional(),
});

export const slaQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'availability', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  serviceId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- ServiceHealth ---
export const serviceHealthCreateSchema = z.object({
  serviceName: z.string().min(2).max(200),
  status: z.enum(['healthy', 'degraded', 'unhealthy', 'unknown']),
  checks: z.array(z.object({
    name: z.string().max(200),
    status: z.enum(['passing', 'failing', 'warning']),
    message: z.string().max(500).optional(),
    lastChecked: z.string().datetime(),
    durationMs: z.number().int().min(0),
  })),
  environment: z.enum(['production', 'staging', 'development']),
  uptime: z.number().min(0).max(100),
  lastIncidentAt: z.string().datetime().optional(),
  version: z.string().max(50).optional(),
});

export const serviceHealthUpdateSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'unhealthy', 'unknown']).optional(),
  checks: z.array(z.object({
    name: z.string().max(200),
    status: z.enum(['passing', 'failing', 'warning']),
    message: z.string().max(500).optional(),
    lastChecked: z.string().datetime(),
    durationMs: z.number().int().min(0),
  })).optional(),
  uptime: z.number().min(0).max(100).optional(),
  lastIncidentAt: z.string().datetime().optional(),
  version: z.string().max(50).optional(),
});

export const serviceHealthQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['serviceName', 'status', 'uptime']).default('serviceName'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().max(200).optional(),
  status: z.enum(['healthy', 'degraded', 'unhealthy', 'unknown']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
});

// --- LogAggregation ---
export const logAggregationCreateSchema = z.object({
  name: z.string().min(2).max(200),
  sources: z.array(z.object({
    type: z.enum(['file', 'syslog', 'journald', 'cloudwatch', 'stackdriver']),
    config: z.record(z.string(), z.string()),
  })),
  filters: z.array(z.object({
    field: z.string().max(200),
    operator: z.enum(['eq', 'neq', 'contains', 'regex', 'gt', 'lt']),
    value: z.string().max(500),
  })).optional(),
  retention: z.number().int().min(1).max(3650),
  storage: z.enum(['local', 's3', 'gcs', 'azure_blob', 'elasticsearch']),
  compression: z.enum(['none', 'gzip', 'zstd', 'lz4']).default('gzip'),
  sampling: z.number().min(0).max(100).default(100),
  enabled: z.boolean().default(true),
});

export const logAggregationUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  sources: z.array(z.object({
    type: z.enum(['file', 'syslog', 'journald', 'cloudwatch', 'stackdriver']),
    config: z.record(z.string(), z.string()),
  })).optional(),
  filters: z.array(z.object({
    field: z.string().max(200),
    operator: z.enum(['eq', 'neq', 'contains', 'regex', 'gt', 'lt']),
    value: z.string().max(500),
  })).optional(),
  retention: z.number().int().min(1).max(3650).optional(),
  storage: z.enum(['local', 's3', 'gcs', 'azure_blob', 'elasticsearch']).optional(),
  compression: z.enum(['none', 'gzip', 'zstd', 'lz4']).optional(),
  sampling: z.number().min(0).max(100).optional(),
  enabled: z.boolean().optional(),
});

export const logAggregationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  storage: z.enum(['local', 's3', 'gcs', 'azure_blob', 'elasticsearch']).optional(),
  enabled: z.boolean().optional(),
});

// --- MetricsAggregation ---
export const metricsAggregationCreateSchema = z.object({
  name: z.string().min(2).max(200),
  query: z.string().min(1).max(5000),
  aggregationType: z.enum(['avg', 'sum', 'min', 'max', 'count', 'percentile', 'rate']),
  aggregationWindow: z.enum(['1m', '5m', '15m', '30m', '1h', '6h', '24h', '7d']),
  groupBy: z.array(z.string().max(200)),
  filters: z.record(z.string(), z.string()).optional(),
  outputFormat: z.enum(['timeseries', 'scalar', 'table']).default('timeseries'),
  enabled: z.boolean().default(true),
  environment: z.enum(['production', 'staging', 'development']),
});

export const metricsAggregationUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  query: z.string().min(1).max(5000).optional(),
  aggregationType: z.enum(['avg', 'sum', 'min', 'max', 'count', 'percentile', 'rate']).optional(),
  aggregationWindow: z.enum(['1m', '5m', '15m', '30m', '1h', '6h', '24h', '7d']).optional(),
  groupBy: z.array(z.string().max(200)).optional(),
  filters: z.record(z.string(), z.string()).optional(),
  enabled: z.boolean().optional(),
});

export const metricsAggregationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  aggregationType: z.enum(['avg', 'sum', 'min', 'max', 'count', 'percentile', 'rate']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  enabled: z.boolean().optional(),
});

// --- AlertEscalation ---
export const alertEscalationCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  severity: z.enum(['warning', 'critical', 'emergency']),
  levels: z.array(z.object({
    level: z.number().int().min(1),
    timeoutMinutes: z.number().int().min(1),
    targets: z.array(z.enum(['email', 'slack', 'sms', 'phone', 'webhook'])),
    targetUsers: z.array(z.string().uuid()),
    repeat: z.boolean().default(false),
    repeatIntervalMinutes: z.number().int().min(1).max(1440).optional(),
  })),
  enabled: z.boolean().default(true),
  environment: z.enum(['production', 'staging', 'development']),
});

export const alertEscalationUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  severity: z.enum(['warning', 'critical', 'emergency']).optional(),
  levels: z.array(z.object({
    level: z.number().int().min(1),
    timeoutMinutes: z.number().int().min(1),
    targets: z.array(z.enum(['email', 'slack', 'sms', 'phone', 'webhook'])),
    targetUsers: z.array(z.string().uuid()),
    repeat: z.boolean().default(false),
    repeatIntervalMinutes: z.number().int().min(1).max(1440).optional(),
  })).optional(),
  enabled: z.boolean().optional(),
});

export const alertEscalationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'severity', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  severity: z.enum(['warning', 'critical', 'emergency']).optional(),
  enabled: z.boolean().optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
});

// --- PerformanceBaseline ---
export const performanceBaselineCreateSchema = z.object({
  serviceName: z.string().min(2).max(200),
  metricName: z.string().min(1).max(200),
  environment: z.enum(['production', 'staging', 'development']),
  baselineType: z.enum(['percentile', 'average', 'median', 'p95', 'p99']),
  values: z.record(z.string(), z.number()),
  window: z.enum(['hourly', 'daily', 'weekly', 'monthly']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  confidence: z.number().min(0).max(100).default(95),
  anomalyThreshold: z.number().min(0).max(10).default(2),
  enabled: z.boolean().default(true),
});

export const performanceBaselineUpdateSchema = z.object({
  baselineType: z.enum(['percentile', 'average', 'median', 'p95', 'p99']).optional(),
  values: z.record(z.string(), z.number()).optional(),
  window: z.enum(['hourly', 'daily', 'weekly', 'monthly']).optional(),
  endDate: z.string().datetime().optional(),
  confidence: z.number().min(0).max(100).optional(),
  anomalyThreshold: z.number().min(0).max(10).optional(),
  enabled: z.boolean().optional(),
});

export const performanceBaselineQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['serviceName', 'metricName', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  serviceName: z.string().max(200).optional(),
  metricName: z.string().max(200).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  enabled: z.boolean().optional(),
});

export enum SyncMode {
  REAL_TIME = 'REAL_TIME',
  NEAR_REAL_TIME = 'NEAR_REAL_TIME',
  SCHEDULED = 'SCHEDULED',
  ON_DEMAND = 'ON_DEMAND',
  EVENT_DRIVEN = 'EVENT_DRIVEN',
  POLLING = 'POLLING',
  PUSH = 'PUSH',
  PULL = 'PULL',
  BIDIRECTIONAL = 'BIDIRECTIONAL',
  UNIDIRECTIONAL = 'UNIDIRECTIONAL',
  INCREMENTAL = 'INCREMENTAL',
  FULL = 'FULL',
  DELTA = 'DELTA',
  DIFF = 'DIFF',
  SNAPSHOT = 'SNAPSHOT',
  CDC = 'CDC',
  BULK = 'BULK',
  STREAMING = 'STREAMING',
  BATCH = 'BATCH',
  MICRO_BATCH = 'MICRO_BATCH',
  ONE_WAY = 'ONE_WAY',
  TWO_WAY = 'TWO_WAY',
  MULTI_WAY = 'MULTI_WAY',
  FAN_OUT = 'FAN_OUT',
  FAN_IN = 'FAN_IN',
  PIPELINE = 'PIPELINE',
  CHAIN = 'CHAIN',
  ORCHESTRATED = 'ORCHESTRATED',
  PARALLEL = 'PARALLEL',
  SEQUENTIAL = 'SEQUENTIAL',
  OTHER = 'OTHER'
}

export enum SyncStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  TIMEOUT = 'TIMEOUT',
  RETRYING = 'RETRYING',
  CONFLICT = 'CONFLICT',
  PARTIAL = 'PARTIAL',
  SKIPPED = 'SKIPPED',
  QUEUED = 'QUEUED',
  INITIALIZING = 'INITIALIZING',
  FINALIZING = 'FINALIZING',
  ROLLING_BACK = 'ROLLING_BACK',
  ROLLED_BACK = 'ROLLED_BACK',
  UNKNOWN = 'UNKNOWN'
}

export enum SyncDirection {
  SOURCE_TO_TARGET = 'SOURCE_TO_TARGET',
  TARGET_TO_SOURCE = 'TARGET_TO_SOURCE',
  BIDIRECTIONAL = 'BIDIRECTIONAL',
  ONE_WAY = 'ONE_WAY',
  TWO_WAY = 'TWO_WAY',
  MULTI_WAY = 'MULTI_WAY',
  CUSTOM = 'CUSTOM'
}

export enum ConflictStrategy {
  SOURCE_PRIORITY = 'SOURCE_PRIORITY',
  TARGET_PRIORITY = 'TARGET_PRIORITY',
  TIMESTAMP = 'TIMESTAMP',
  VERSION_NUMBER = 'VERSION_NUMBER',
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
  LAST_WRITE = 'LAST_WRITE',
  FIRST_WRITE = 'FIRST_WRITE',
  HIGHER_VERSION = 'HIGHER_VERSION',
  MERGE = 'MERGE',
  CUSTOM = 'CUSTOM'
}

export enum ConflictStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  UNRESOLVED = 'UNRESOLVED',
  IGNORED = 'IGNORED',
  ESCALATED = 'ESCALATED',
  AUTO_RESOLVED = 'AUTO_RESOLVED',
  MANUAL_RESOLVED = 'MANUAL_RESOLVED',
  FAILED = 'FAILED',
  UNKNOWN = 'UNKNOWN'
}

export enum CheckpointStatus {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  ROLLED_BACK = 'ROLLED_BACK',
  EXPIRED = 'EXPIRED',
  UNKNOWN = 'UNKNOWN'
}

export enum ReconciliationStrategy {
  FULL = 'FULL',
  INCREMENTAL = 'INCREMENTAL',
  SAMPLE = 'SAMPLE',
  PARITY = 'PARITY',
  HASH = 'HASH',
  CUSTOM = 'CUSTOM'
}

export enum ReconciliationStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  PARTIAL = 'PARTIAL',
  UNKNOWN = 'UNKNOWN'
}

export enum SyncTrigger {
  SCHEDULE = 'SCHEDULE',
  EVENT = 'EVENT',
  MANUAL = 'MANUAL',
  API = 'API',
  WEBHOOK = 'WEBHOOK',
  FILE_CHANGE = 'FILE_CHANGE',
  DATABASE_CHANGE = 'DATABASE_CHANGE',
  QUEUE_MESSAGE = 'QUEUE_MESSAGE',
  CUSTOM = 'CUSTOM'
}

export enum SyncLockType {
  NONE = 'NONE',
  SHARED = 'SHARED',
  EXCLUSIVE = 'EXCLUSIVE',
  ADVISORY = 'ADVISORY',
  DISTRIBUTED = 'DISTRIBUTED',
  CUSTOM = 'CUSTOM'
}

export enum SyncLockStatus {
  ACQUIRED = 'ACQUIRED',
  RELEASED = 'RELEASED',
  EXPIRED = 'EXPIRED',
  FAILED = 'FAILED',
  UNKNOWN = 'UNKNOWN'
}

export enum SyncFieldAction {
  IGNORE = 'IGNORE',
  RENAME = 'RENAME',
  CONVERT = 'CONVERT',
  DEFAULT = 'DEFAULT',
  CONCATENATE = 'CONCATENATE',
  SPLIT = 'SPLIT',
  LOOKUP = 'LOOKUP',
  CALCULATE = 'CALCULATE',
  AGGREGATE = 'AGGREGATE',
  CUSTOM = 'CUSTOM'
}

export enum SyncDataType {
  STRING = 'STRING',
  INTEGER = 'INTEGER',
  FLOAT = 'FLOAT',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  DATETIME = 'DATETIME',
  TIMESTAMP = 'TIMESTAMP',
  JSON = 'JSON',
  ARRAY = 'ARRAY',
  OBJECT = 'OBJECT',
  BINARY = 'BINARY',
  UUID = 'UUID',
  EMAIL = 'EMAIL',
  URL = 'URL',
  PHONE = 'PHONE',
  ADDRESS = 'ADDRESS',
  CURRENCY = 'CURRENCY',
  PERCENTAGE = 'PERCENTAGE',
  CUSTOM = 'CUSTOM'
}

export enum SyncBatchStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  PARTIAL = 'PARTIAL',
  RETRYING = 'RETRYING',
  UNKNOWN = 'UNKNOWN'
}

export enum SyncQueueStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DRAINING = 'DRAINING',
  STOPPED = 'STOPPED',
  UNKNOWN = 'UNKNOWN'
}

export enum SyncPriority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  BACKGROUND = 'BACKGROUND',
  CUSTOM = 'CUSTOM'
}

export enum SyncRecordStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED',
  DUPLICATE = 'DUPLICATE',
  CONFLICT = 'CONFLICT',
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
  UNCHANGED = 'UNCHANGED',
  UNKNOWN = 'UNKNOWN'
}

export enum SyncErrorType {
  VALIDATION = 'VALIDATION',
  TRANSFORMATION = 'TRANSFORMATION',
  MAPPING = 'MAPPING',
  NETWORK = 'NETWORK',
  TIMEOUT = 'TIMEOUT',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  RATE_LIMIT = 'RATE_LIMIT',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  CONFLICT = 'CONFLICT',
  DATA_INTEGRITY = 'DATA_INTEGRITY',
  SCHEMA_MISMATCH = 'SCHEMA_MISMATCH',
  CUSTOM = 'CUSTOM'
}

export interface SyncJob {
  id: string;
  name: string;
  description?: string;
  mode: SyncMode;
  direction: SyncDirection;
  status: SyncStatus;
  priority: SyncPriority;
  schoolId: string;
  sourceId: string;
  targetType: string;
  targetId: string;
  config: SyncConfig;
  mapping?: SyncMapping;
  schedule?: SyncSchedule;
  checkpoint?: SyncCheckpoint;
  conflicts?: SyncConflict[];
  deadLetters?: SyncDeadLetter[];
  audit?: SyncAudit[];
  metrics?: SyncMetric[];
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  lastRunAt?: string;
  nextRunAt?: string;
  runCount?: number;
  errorCount?: number;
  recordsProcessed?: number;
  recordsCreated?: number;
  recordsUpdated?: number;
  recordsDeleted?: number;
  recordsSkipped?: number;
  recordsFailed?: number;
  bytesTransferred?: number;
  error?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncConfig {
  id: string;
  name: string;
  description?: string;
  schoolId: string;
  source: SyncDataSource;
  target: SyncDataSource;
  mode: SyncMode;
  direction: SyncDirection;
  conflictStrategy: ConflictStrategy;
  enabled: boolean;
  retry?: SyncRetryConfig;
  checkpoint?: SyncCheckpointConfig;
  deadLetter?: SyncDeadLetterConfig;
  reconciliation?: SyncReconciliationConfig;
  batchSize?: number;
  batchTimeout?: number;
  parallelism?: number;
  timeout?: number;
  lockType?: SyncLockType;
  lockTimeout?: number;
  compression?: boolean;
  encryption?: boolean;
  validation?: SyncValidationConfig;
  transformation?: SyncTransformationConfig;
  filtering?: SyncFilterConfig;
  monitoring?: SyncMonitoringConfig;
  logging?: SyncLoggingConfig;
  security?: SyncSecurityConfig;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncDataSource {
  id: string;
  type: string;
  name: string;
  connection?: SyncConnection;
  query?: string;
  table?: string;
  collection?: string;
  endpoint?: string;
  format?: string;
  schema?: SyncSchema;
  credentials?: SyncCredentials;
  options?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface SyncConnection {
  type: string;
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  ssl?: boolean;
  certificate?: string;
  privateKey?: string;
  passphrase?: string;
  url?: string;
  pool?: SyncConnectionPool;
  timeout?: number;
  options?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface SyncConnectionPool {
  min?: number;
  max?: number;
  idle?: number;
  acquire?: number;
  evict?: number;
  reap?: number;
  metadata?: Record<string, unknown>;
}

export interface SyncSchema {
  id: string;
  name: string;
  version: string;
  fields: SyncSchemaField[];
  indexes?: SyncSchemaIndex[];
  constraints?: SyncSchemaConstraint[];
  metadata?: Record<string, unknown>;
}

export interface SyncSchemaField {
  name: string;
  type: SyncDataType;
  nullable?: boolean;
  primaryKey?: boolean;
  foreignKey?: string;
  unique?: boolean;
  indexed?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  defaultValue?: unknown;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncSchemaIndex {
  name: string;
  fields: string[];
  unique?: boolean;
  type?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncSchemaConstraint {
  name: string;
  type: string;
  fields: string[];
  reference?: { table: string; fields: string[] };
  condition?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncCredentials {
  type: string;
  username?: string;
  password?: string;
  token?: string;
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  certificate?: string;
  privateKey?: string;
  custom?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface SyncMapping {
  id: string;
  name: string;
  description?: string;
  sourceSchema: string;
  targetSchema: string;
  fields: SyncFieldMapping[];
  transformations?: SyncTransformation[];
  validations?: SyncValidation[];
  version?: string;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface SyncFieldMapping {
  id: string;
  sourceField: string;
  targetField: string;
  action: SyncFieldAction;
  dataType?: SyncDataType;
  nullable?: boolean;
  defaultValue?: unknown;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: string;
  transform?: string;
  lookup?: string;
  lookupField?: string;
  lookupDefault?: string;
  concatFields?: string[];
  splitDelimiter?: string;
  splitIndex?: number;
  customTransform?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncTransformation {
  id: string;
  name: string;
  type: string;
  expression?: string;
  function?: string;
  params?: Record<string, unknown>;
  sourceFields?: string[];
  targetField?: string;
  order?: number;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface SyncValidation {
  id: string;
  name: string;
  type: string;
  field?: string;
  expression?: string;
  function?: string;
  params?: Record<string, unknown>;
  message?: string;
  severity?: string;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface SyncCheckpoint {
  id: string;
  jobId: string;
  status: CheckpointStatus;
  position: string;
  offset?: number;
  timestamp: string;
  recordsProcessed: number;
  recordsCreated?: number;
  recordsUpdated?: number;
  recordsDeleted?: number;
  recordsFailed?: number;
  bytesTransferred?: number;
  state?: Record<string, unknown>;
  snapshot?: Record<string, unknown>;
  createdAt: string;
  completedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncCheckpointConfig {
  enabled: boolean;
  interval?: number;
  intervalUnit?: string;
  strategy?: string;
  retention?: number;
  retentionUnit?: string;
  maxCheckpoints?: number;
  autoRestore?: boolean;
  metadata?: Record<string, unknown>;
}

export interface SyncConflict {
  id: string;
  jobId: string;
  sourceRecord: Record<string, unknown>;
  targetRecord: Record<string, unknown>;
  conflictFields: string[];
  conflictType: string;
  status: ConflictStatus;
  strategy: ConflictStrategy;
  resolution?: ConflictResolution;
  sourceVersion?: number;
  targetVersion?: number;
  sourceTimestamp?: string;
  targetTimestamp?: string;
  detectedAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface ConflictResolution {
  id: string;
  conflictId: string;
  strategy: ConflictStrategy;
  resolvedRecord: Record<string, unknown>;
  resolvedAt: string;
  resolvedBy: string;
  changeLog?: ConflictChangeLog[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface ConflictChangeLog {
  field: string;
  sourceValue: unknown;
  targetValue: unknown;
  resolvedValue: unknown;
  action: string;
  metadata?: Record<string, unknown>;
}

export interface SyncRetry {
  id: string;
  jobId: string;
  recordId?: string;
  operation: string;
  strategy: SyncRetryStrategy;
  maxAttempts: number;
  currentAttempt: number;
  nextAttemptAt?: string;
  lastAttemptAt?: string;
  delay?: number;
  backoffMultiplier?: number;
  maxDelay?: number;
  jitter?: boolean;
  jitterType?: string;
  status: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

export enum SyncRetryStrategy {
  NONE = 'NONE',
  FIXED_INTERVAL = 'FIXED_INTERVAL',
  EXPONENTIAL_BACKOFF = 'EXPONENTIAL_BACKOFF',
  LINEAR_BACKOFF = 'LINEAR_BACKOFF',
  FIBONACCI = 'FIBONACCI',
  CUSTOM = 'CUSTOM'
}

export interface SyncRetryConfig {
  strategy: SyncRetryStrategy;
  maxAttempts: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  jitter?: boolean;
  jitterType?: string;
  retryableErrors?: string[];
  metadata?: Record<string, unknown>;
}

export interface SyncDeadLetter {
  id: string;
  jobId: string;
  recordId: string;
  record: Record<string, unknown>;
  error: string;
  errorType: SyncErrorType;
  attempts: number;
  lastAttemptAt: string;
  addedAt: string;
  processedAt?: string;
  processedBy?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncDeadLetterConfig {
  enabled: boolean;
  queue: string;
  retention: number;
  retentionUnit: string;
  maxRetries?: number;
  processingEnabled?: boolean;
  processingEndpoint?: string;
  alertingEnabled?: boolean;
  alertingThreshold?: number;
  metadata?: Record<string, unknown>;
}

export interface SyncReconciliation {
  id: string;
  jobId: string;
  strategy: ReconciliationStrategy;
  status: ReconciliationStatus;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  sourceCount?: number;
  targetCount?: number;
  matchedCount?: number;
  mismatchedCount?: number;
  missingInTarget?: number;
  missingInSource?: number;
  duplicateCount?: number;
  checksum?: string;
  mismatchedRecords?: SyncReconciliationMismatch[];
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncReconciliationMismatch {
  recordId: string;
  sourceRecord: Record<string, unknown>;
  targetRecord: Record<string, unknown>;
  mismatchedFields: string[];
  mismatchType: string;
  metadata?: Record<string, unknown>;
}

export interface SyncReconciliationConfig {
  enabled: boolean;
  strategy: ReconciliationStrategy;
  interval?: number;
  intervalUnit?: string;
  sampleSize?: number;
  checksumEnabled?: boolean;
  autoResolve?: boolean;
  alertingEnabled?: boolean;
  alertingThreshold?: number;
  metadata?: Record<string, unknown>;
}

export interface SyncAudit {
  id: string;
  jobId: string;
  action: string;
  performedBy: string;
  performedAt: string;
  recordId?: string;
  changes?: Record<string, { before: unknown; after: unknown }>;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncMetric {
  id: string;
  jobId: string;
  name: string;
  type: string;
  value: number;
  unit?: string;
  timestamp: string;
  labels?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface SyncMetrics {
  jobId: string;
  period: string;
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  averageDuration: number;
  minDuration: number;
  maxDuration: number;
  totalRecordsProcessed: number;
  totalRecordsCreated: number;
  totalRecordsUpdated: number;
  totalRecordsDeleted: number;
  totalRecordsSkipped: number;
  totalRecordsFailed: number;
  totalBytesTransferred: number;
  throughput: number;
  errorRate: number;
  successRate: number;
  conflictRate: number;
  averageLatency: number;
  p50Latency: number;
  p90Latency: number;
  p95Latency: number;
  p99Latency: number;
  metrics?: SyncMetric[];
  metadata?: Record<string, unknown>;
}

export interface SyncSchedule {
  id: string;
  jobId: string;
  type: string;
  expression?: string;
  interval?: number;
  intervalUnit?: string;
  startTime?: string;
  endTime?: string;
  timezone?: string;
  enabled: boolean;
  nextRunAt?: string;
  lastRunAt?: string;
  runCount?: number;
  maxRuns?: number;
  metadata?: Record<string, unknown>;
}

export interface SyncVersion {
  id: string;
  jobId: string;
  version: number;
  config: SyncConfig;
  mapping?: SyncMapping;
  createdAt: string;
  createdBy?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncLock {
  id: string;
  jobId: string;
  type: SyncLockType;
  status: SyncLockStatus;
  acquiredAt: string;
  expiresAt?: string;
  releasedAt?: string;
  owner?: string;
  resource?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncState {
  id: string;
  jobId: string;
  key: string;
  value: unknown;
  type: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

export interface SyncBatch {
  id: string;
  jobId: string;
  batchNumber: number;
  totalBatches: number;
  status: SyncBatchStatus;
  records: SyncBatchRecord[];
  startedAt: string;
  completedAt?: string;
  processedRecords?: number;
  failedRecords?: number;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncBatchRecord {
  id: string;
  operation: string;
  data: Record<string, unknown>;
  status: SyncRecordStatus;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncQueue {
  id: string;
  name: string;
  jobId: string;
  status: SyncQueueStatus;
  depth: number;
  processing: number;
  completed: number;
  failed: number;
  averageProcessingTime: number;
  metadata?: Record<string, unknown>;
}

export interface SyncRecord {
  id: string;
  jobId: string;
  sourceId: string;
  targetId?: string;
  operation: string;
  data: Record<string, unknown>;
  status: SyncRecordStatus;
  checksum?: string;
  version?: number;
  timestamp?: string;
  error?: string;
  retries?: number;
  metadata?: Record<string, unknown>;
}

export interface SyncError {
  id: string;
  jobId: string;
  recordId?: string;
  batchId?: string;
  type: SyncErrorType;
  message: string;
  code?: string;
  field?: string;
  details?: Record<string, unknown>;
  timestamp: string;
  retryable: boolean;
  metadata?: Record<string, unknown>;
}

export interface SyncValidationConfig {
  enabled: boolean;
  strictMode?: boolean;
  rules: SyncValidationRule[];
  customValidators?: string[];
  failOnError?: boolean;
  metadata?: Record<string, unknown>;
}

export interface SyncValidationRule {
  id: string;
  name: string;
  type: string;
  field?: string;
  params?: Record<string, unknown>;
  message?: string;
  severity?: string;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface SyncTransformationConfig {
  enabled: boolean;
  rules: SyncTransformationRule[];
  customTransformations?: string[];
  metadata?: Record<string, unknown>;
}

export interface SyncTransformationRule {
  id: string;
  name: string;
  sourceField: string;
  targetField: string;
  type: string;
  params?: Record<string, unknown>;
  condition?: string;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface SyncFilterConfig {
  enabled: boolean;
  sourceFilters?: SyncFilter[];
  targetFilters?: SyncFilter[];
  metadata?: Record<string, unknown>;
}

export interface SyncFilter {
  id: string;
  name: string;
  field: string;
  type: string;
  value?: unknown;
  values?: unknown[];
  pattern?: string;
  negate?: boolean;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface SyncMonitoringConfig {
  enabled: boolean;
  healthCheckEnabled?: boolean;
  healthCheckInterval?: number;
  metricsEnabled?: boolean;
  metricsInterval?: number;
  loggingEnabled?: boolean;
  loggingLevel?: string;
  alertingEnabled?: boolean;
  alertingRules?: SyncAlertingRule[];
  dashboardEnabled?: boolean;
  dashboardUrl?: string;
  customMonitoring?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface SyncAlertingRule {
  id: string;
  name: string;
  metric: string;
  condition: string;
  threshold: number;
  duration?: number;
  severity: string;
  enabled?: boolean;
  channels?: string[];
  metadata?: Record<string, unknown>;
}

export interface SyncLoggingConfig {
  enabled: boolean;
  level: string;
  destination: string;
  format: string;
  retention?: number;
  rotation?: boolean;
  customFields?: string[];
  excludeFields?: string[];
  metadata?: Record<string, unknown>;
}

export interface SyncSecurityConfig {
  enabled: boolean;
  encryption?: boolean;
  encryptionAlgorithm?: string;
  encryptionKey?: string;
  authentication?: boolean;
  authorization?: boolean;
  auditLogging?: boolean;
  ipRestriction?: boolean;
  allowedIps?: string[];
  customSecurity?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface SyncTemplate {
  id: string;
  name: string;
  description?: string;
  mode: SyncMode;
  direction: SyncDirection;
  config: Partial<SyncConfig>;
  mapping?: Partial<SyncMapping>;
  schedule?: Partial<SyncSchedule>;
  retry?: Partial<SyncRetryConfig>;
  deadLetter?: Partial<SyncDeadLetterConfig>;
  reconciliation?: Partial<SyncReconciliationConfig>;
  tags?: string[];
  category?: string;
  author?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncTestResult {
  success: boolean;
  message: string;
  duration?: number;
  recordsProcessed?: number;
  recordsCreated?: number;
  recordsUpdated?: number;
  recordsDeleted?: number;
  recordsSkipped?: number;
  recordsFailed?: number;
  errors?: SyncError[];
  warnings?: SyncWarning[];
  metadata?: Record<string, unknown>;
}

export interface SyncWarning {
  id: string;
  jobId: string;
  recordId?: string;
  batchId?: string;
  type: string;
  message: string;
  code?: string;
  field?: string;
  details?: Record<string, unknown>;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface SyncSearch {
  query?: string;
  filters?: Record<string, unknown>;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  status?: SyncStatus[];
  mode?: SyncMode[];
  startTime?: string;
  endTime?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncSearchResult {
  items: SyncJob[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
  metadata?: Record<string, unknown>;
}

export interface SyncBulkOperation {
  id: string;
  operation: string;
  jobIds: string[];
  status: string;
  startedAt: string;
  completedAt?: string;
  succeeded?: number;
  failed?: number;
  errors?: SyncError[];
  metadata?: Record<string, unknown>;
}

export interface SyncList {
  items: SyncJob[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface SyncFilter {
  status?: SyncStatus;
  mode?: SyncMode;
  direction?: SyncDirection;
  schoolId?: string;
  sourceId?: string;
  targetId?: string;
  tags?: string[];
  search?: string;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  metadata?: Record<string, unknown>;
}

export interface SyncReport {
  id: string;
  jobId: string;
  name: string;
  type: string;
  period: string;
  startDate: string;
  endDate: string;
  data: Record<string, unknown>;
  format?: string;
  fileUrl?: string;
  generatedAt: string;
  metadata?: Record<string, unknown>;
}

export interface SyncNotification {
  id: string;
  jobId: string;
  type: string;
  title: string;
  message: string;
  severity: string;
  channel: string;
  recipients?: string[];
  readAt?: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncDependency {
  id: string;
  jobId: string;
  dependsOnJobId: string;
  type: string;
  status: string;
  metadata?: Record<string, unknown>;
}

export interface SyncHealth {
  id: string;
  jobId: string;
  status: string;
  checkedAt: string;
  responseTime?: number;
  checks?: SyncHealthCheck[];
  uptime?: number;
  availability?: number;
  metadata?: Record<string, unknown>;
}

export interface SyncHealthCheck {
  name: string;
  status: string;
  message?: string;
  responseTime?: number;
  checkedAt: string;
  details?: Record<string, unknown>;
}

export interface SyncLockConfig {
  enabled: boolean;
  type: SyncLockType;
  timeout?: number;
  retryOnConflict?: boolean;
  retryDelay?: number;
  maxRetries?: number;
  metadata?: Record<string, unknown>;
}

export interface SyncRateLimit {
  id: string;
  jobId: string;
  limit: number;
  window: number;
  current: number;
  remaining: number;
  resetAt: string;
  policy?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncThrottle {
  id: string;
  jobId: string;
  maxConcurrent: number;
  maxPerSecond: number;
  maxPerMinute: number;
  maxPerHour: number;
  current: number;
  waitTime?: number;
  metadata?: Record<string, unknown>;
}

export interface SyncProgress {
  jobId: string;
  phase: string;
  totalRecords: number;
  processedRecords: number;
  percentage: number;
  estimatedTimeRemaining?: number;
  throughput?: number;
  startTime: string;
  lastUpdatedAt: string;
  metadata?: Record<string, unknown>;
}

export interface SyncSnapshot {
  id: string;
  jobId: string;
  timestamp: string;
  sourceSnapshot: Record<string, unknown>;
  targetSnapshot: Record<string, unknown>;
  checksum: string;
  metadata?: Record<string, unknown>;
}

export interface SyncDiff {
  id: string;
  jobId: string;
  snapshotId: string;
  added: Record<string, unknown>[];
  modified: Record<string, unknown>[];
  deleted: Record<string, unknown>[];
  unchanged: number;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface SyncPlan {
  id: string;
  jobId: string;
  steps: SyncPlanStep[];
  estimatedDuration: number;
  estimatedRecords: number;
  dependencies?: string[];
  metadata?: Record<string, unknown>;
}

export interface SyncPlanStep {
  id: string;
  name: string;
  type: string;
  order: number;
  duration?: number;
  records?: number;
  dependencies?: string[];
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface SyncContext {
  jobId: string;
  runId: string;
  schoolId: string;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  correlationId?: string;
  source: SyncDataSource;
  target: SyncDataSource;
  mapping: SyncMapping;
  config: SyncConfig;
  metadata?: Record<string, unknown>;
}

export interface SyncTransaction {
  id: string;
  jobId: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  operations: SyncTransactionOperation[];
  rollbackAvailable: boolean;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncTransactionOperation {
  id: string;
  type: string;
  recordId: string;
  data: Record<string, unknown>;
  status: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncRollback {
  id: string;
  jobId: string;
  transactionId: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  operations: SyncRollbackOperation[];
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncRollbackOperation {
  id: string;
  type: string;
  recordId: string;
  originalData: Record<string, unknown>;
  status: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface SyncMetricsSummary {
  totalJobs: number;
  activeJobs: number;
  completedJobs: number;
  failedJobs: number;
  averageDuration: number;
  totalRecordsProcessed: number;
  totalBytesTransferred: number;
  overallThroughput: number;
  overallErrorRate: number;
  overallSuccessRate: number;
  period: string;
  metadata?: Record<string, unknown>;
}

export interface SyncDashboard {
  id: string;
  name: string;
  schoolId: string;
  widgets: SyncDashboardWidget[];
  layout?: Record<string, unknown>;
  refreshInterval?: number;
  metadata?: Record<string, unknown>;
}

export interface SyncDashboardWidget {
  id: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  position?: { x: number; y: number; width: number; height: number };
  metadata?: Record<string, unknown>;
}

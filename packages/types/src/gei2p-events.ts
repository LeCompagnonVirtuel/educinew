export enum EventType {
  STUDENT_CREATED = 'STUDENT_CREATED',
  STUDENT_UPDATED = 'STUDENT_UPDATED',
  STUDENT_DELETED = 'STUDENT_DELETED',
  STUDENT_SUSPENDED = 'STUDENT_SUSPENDED',
  STUDENT_REINSTATED = 'STUDENT_REINSTATED',
  STUDENT_GRADUATED = 'STUDENT_GRADUATED',
  ENROLLMENT_CREATED = 'ENROLLMENT_CREATED',
  ENROLLMENT_UPDATED = 'ENROLLMENT_UPDATED',
  ENROLLMENT_CANCELLED = 'ENROLLMENT_CANCELLED',
  ENROLLMENT_COMPLETED = 'ENROLLMENT_COMPLETED',
  GRADE_CREATED = 'GRADE_CREATED',
  GRADE_UPDATED = 'GRADE_UPDATED',
  GRADE_DELETED = 'GRADE_DELETED',
  GRADE_PUBLISHED = 'GRADE_PUBLISHED',
  EXAM_CREATED = 'EXAM_CREATED',
  EXAM_UPDATED = 'EXAM_UPDATED',
  EXAM_COMPLETED = 'EXAM_COMPLETED',
  EXAM_PUBLISHED = 'EXAM_PUBLISHED',
  EXAM_CANCELLED = 'EXAM_CANCELLED',
  EXAM_RESCHEDULED = 'EXAM_RESCHEDULED',
  DIPLOMA_ISSUED = 'DIPLOMA_ISSUED',
  DIPLOMA_REVOKED = 'DIPLOMA_REVOKED',
  DIPLOMA_VERIFIED = 'DIPLOMA_VERIFIED',
  CREDENTIAL_ISSUED = 'CREDENTIAL_ISSUED',
  CREDENTIAL_REVOKED = 'CREDENTIAL_REVOKED',
  CREDENTIAL_VERIFIED = 'CREDENTIAL_VERIFIED',
  CREDENTIAL_EXPIRED = 'CREDENTIAL_EXPIRED',
  CERTIFICATION_ISSUED = 'CERTIFICATION_ISSUED',
  CERTIFICATION_REVOKED = 'CERTIFICATION_REVOKED',
  CERTIFICATION_VERIFIED = 'CERTIFICATION_VERIFIED',
  TEACHER_CREATED = 'TEACHER_CREATED',
  TEACHER_UPDATED = 'TEACHER_UPDATED',
  TEACHER_DELETED = 'TEACHER_DELETED',
  TEACHER_ASSIGNED = 'TEACHER_ASSIGNED',
  TEACHER_UNASSIGNED = 'TEACHER_UNASSIGNED',
  INSTITUTION_CREATED = 'INSTITUTION_CREATED',
  INSTITUTION_UPDATED = 'INSTITUTION_UPDATED',
  INSTITUTION_DELETED = 'INSTITUTION_DELETED',
  INSTITUTION_ACCREDITED = 'INSTITUTION_ACCREDITED',
  INSTITUTION_SUSPENDED = 'INSTITUTION_SUSPENDED',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_REFUNDED = 'PAYMENT_REFUNDED',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAYMENT_CANCELLED = 'PAYMENT_CANCELLED',
  ATTENDANCE_RECORDED = 'ATTENDANCE_RECORDED',
  ATTENDANCE_UPDATED = 'ATTENDANCE_UPDATED',
  ATTENDANCE_ABSENT = 'ATTENDANCE_ABSENT',
  ATTENDANCE_LATE = 'ATTENDANCE_LATE',
  MOBILITY_STARTED = 'MOBILITY_STARTED',
  MOBILITY_COMPLETED = 'MOBILITY_COMPLETED',
  MOBILITY_CANCELLED = 'MOBILITY_CANCELLED',
  MOBILITY_APPROVED = 'MOBILITY_APPROVED',
  RESEARCH_PUBLISHED = 'RESEARCH_PUBLISHED',
  RESEARCH_SUBMITTED = 'RESEARCH_SUBMITTED',
  RESEARCH_REVIEWED = 'RESEARCH_REVIEWED',
  RESEARCH_APPROVED = 'RESEARCH_APPROVED',
  EMPLOYMENT_STARTED = 'EMPLOYMENT_STARTED',
  EMPLOYMENT_COMPLETED = 'EMPLOYMENT_COMPLETED',
  EMPLOYMENT_TERMINATED = 'EMPLOYMENT_TERMINATED',
  EMPLOYMENT_OFFERED = 'EMPLOYMENT_OFFERED',
  TRANSPORT_SCHEDULED = 'TRANSPORT_SCHEDULED',
  TRANSPORT_COMPLETED = 'TRANSPORT_COMPLETED',
  TRANSPORT_CANCELLED = 'TRANSPORT_CANCELLED',
  LIBRARY_BOOK_BORROWED = 'LIBRARY_BOOK_BORROWED',
  LIBRARY_BOOK_RETURNED = 'LIBRARY_BOOK_RETURNED',
  LIBRARY_BOOK_OVERDUE = 'LIBRARY_BOOK_OVERDUE',
  HEALTH_RECORD_CREATED = 'HEALTH_RECORD_CREATED',
  HEALTH_RECORD_UPDATED = 'HEALTH_RECORD_UPDATED',
  DISCIPLINE_INCIDENT = 'DISCIPLINE_INCIDENT',
  DISCIPLINE_ACTION = 'DISCIPLINE_ACTION',
  DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED',
  DOCUMENT_VERIFIED = 'DOCUMENT_VERIFIED',
  DOCUMENT_EXPIRED = 'DOCUMENT_EXPIRED',
  COMMUNICATION_SENT = 'COMMUNICATION_SENT',
  COMMUNICATION_DELIVERED = 'COMMUNICATION_DELIVERED',
  COMMUNICATION_READ = 'COMMUNICATION_READ',
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_PASSWORD_CHANGED = 'USER_PASSWORD_CHANGED',
  USER_MFA_ENABLED = 'USER_MFA_ENABLED',
  USER_MFA_DISABLED = 'USER_MFA_DISABLED',
  SESSION_CREATED = 'SESSION_CREATED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  SESSION_REVOKED = 'SESSION_REVOKED',
  SYNC_STARTED = 'SYNC_STARTED',
  SYNC_COMPLETED = 'SYNC_COMPLETED',
  SYNC_FAILED = 'SYNC_FAILED',
  CONNECTOR_CONNECTED = 'CONNECTOR_CONNECTED',
  CONNECTOR_DISCONNECTED = 'CONNECTOR_DISCONNECTED',
  API_CALL = 'API_CALL',
  API_ERROR = 'API_ERROR',
  WEBHOOK_RECEIVED = 'WEBHOOK_RECEIVED',
  WEBHOOK_PROCESSED = 'WEBHOOK_PROCESSED',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  SYSTEM_WARNING = 'SYSTEM_WARNING',
  SYSTEM_MAINTENANCE = 'SYSTEM_MAINTENANCE',
  CUSTOM = 'CUSTOM'
}

export enum EventStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
  RETRYING = 'RETRYING',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  DEAD_LETTER = 'DEAD_LETTER',
  DELIVERED = 'DELIVERED',
  DELIVERY_FAILED = 'DELIVERY_FAILED',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  UNACKNOWLEDGED = 'UNACKNOWLEDGED',
  UNKNOWN = 'UNKNOWN'
}

export enum EventPriority {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  BACKGROUND = 'BACKGROUND',
  SYSTEM = 'SYSTEM',
  CUSTOM = 'CUSTOM'
}

export enum SchemaVersion {
  V1 = 'V1',
  V2 = 'V2',
  V3 = 'V3',
  LATEST = 'LATEST',
  CUSTOM = 'CUSTOM'
}

export enum DeliveryStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  FAILED = 'FAILED',
  RETRYING = 'RETRYING',
  DEAD_LETTER = 'DEAD_LETTER',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  UNKNOWN = 'UNKNOWN'
}

export enum RetryStrategy {
  NONE = 'NONE',
  FIXED_INTERVAL = 'FIXED_INTERVAL',
  EXPONENTIAL_BACKOFF = 'EXPONENTIAL_BACKOFF',
  LINEAR_BACKOFF = 'LINEAR_BACKOFF',
  FIBONACCI = 'FIBONACCI',
  DECORRELATED_JITTER = 'DECORRELATED_JITTER',
  FULL_JITTER = 'FULL_JITTER',
  EQUAL_JITTER = 'EQUAL_JITTER',
  ADAPTIVE = 'ADAPTIVE',
  CUSTOM = 'CUSTOM'
}

export enum FilterType {
  EXACT = 'EXACT',
  CONTAINS = 'CONTAINS',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  REGEX = 'REGEX',
  GLOB = 'GLOB',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  GT = 'GT',
  GTE = 'GTE',
  LT = 'LT',
  LTE = 'LTE',
  BETWEEN = 'BETWEEN',
  IS_NULL = 'IS_NULL',
  IS_NOT_NULL = 'IS_NOT_NULL',
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  CUSTOM = 'CUSTOM'
}

export enum RoutingType {
  DIRECT = 'DIRECT',
  TOPIC = 'TOPIC',
  QUEUE = 'QUEUE',
  FAN_OUT = 'FAN_OUT',
  FAN_IN = 'FAN_IN',
  CONTENT_BASED = 'CONTENT_BASED',
  HEADER_BASED = 'HEADER_BASED',
  CUSTOM = 'CUSTOM'
}

export enum SignatureAlgorithm {
  HMAC_SHA256 = 'HMAC_SHA256',
  HMAC_SHA384 = 'HMAC_SHA384',
  HMAC_SHA512 = 'HMAC_SHA512',
  RSA_SHA256 = 'RSA_SHA256',
  RSA_SHA384 = 'RSA_SHA384',
  RSA_SHA512 = 'RSA_SHA512',
  ECDSA_SHA256 = 'ECDSA_SHA256',
  ECDSA_SHA384 = 'ECDSA_SHA384',
  ECDSA_SHA512 = 'ECDSA_SHA512',
  ED25519 = 'ED25519',
  CUSTOM = 'CUSTOM'
}

export enum EventFormat {
  JSON = 'JSON',
  XML = 'XML',
  PROTOBUF = 'PROTOBUF',
  AVRO = 'AVRO',
  CBOR = 'CBOR',
  BINARY = 'BINARY',
  TEXT = 'TEXT',
  CUSTOM = 'CUSTOM'
}

export enum EventTransport {
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
  WEBSOCKET = 'WEBSOCKET',
  WSS = 'WSS',
  KAFKA = 'KAFKA',
  RABBITMQ = 'RABBITMQ',
  REDIS = 'REDIS',
  AWS_SQS = 'AWS_SQS',
  AWS_SNS = 'AWS_SNS',
  AZURE_SERVICE_BUS = 'AZURE_SERVICE_BUS',
  GOOGLE_PUBSUB = 'GOOGLE_PUBSUB',
  MQTT = 'MQTT',
  AMQP = 'AMQP',
  NATS = 'NATS',
  CUSTOM = 'CUSTOM'
}

export enum EventPattern {
  EXACT = 'EXACT',
  WILDCARD = 'WILDCARD',
  REGEX = 'REGEX',
  PREFIX = 'PREFIX',
  SUFFIX = 'SUFFIX',
  CUSTOM = 'CUSTOM'
}

export enum DeadLetterReason {
  MAX_RETRIES = 'MAX_RETRIES',
  EXPIRED = 'EXPIRED',
  INVALID = 'INVALID',
  UNDELIVERABLE = 'UNDELIVERABLE',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  RATE_LIMITED = 'RATE_LIMITED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  CUSTOM = 'CUSTOM'
}

export enum ReplayStrategy {
  NONE = 'NONE',
  FROM_BEGINNING = 'FROM_BEGINNING',
  FROM_TIMESTAMP = 'FROM_TIMESTAMP',
  FROM_OFFSET = 'FROM_OFFSET',
  FROM_EVENT = 'FROM_EVENT',
  CUSTOM = 'CUSTOM'
}

export enum EventArchivalStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  PURGED = 'PURGED',
  UNKNOWN = 'UNKNOWN'
}

export enum EventCorrelationStrategy {
  NONE = 'NONE',
  CORRELATION_ID = 'CORRELATION_ID',
  CAUSATION_ID = 'CAUSATION_ID',
  CHAIN = 'CHAIN',
  TREE = 'TREE',
  CUSTOM = 'CUSTOM'
}

export enum EventTypeMapping {
  EXACT = 'EXACT',
  TRANSFORM = 'TRANSFORM',
  AGGREGATE = 'AGGREGATE',
  SPLIT = 'SPLIT',
  MERGE = 'MERGE',
  FILTER = 'FILTER',
  CUSTOM = 'CUSTOM'
}

export enum EventValidationLevel {
  NONE = 'NONE',
  SCHEMA = 'SCHEMA',
  SEMANTIC = 'SEMANTIC',
  BUSINESS = 'BUSINESS',
  CUSTOM = 'CUSTOM'
}

export enum EventEncryptionType {
  NONE = 'NONE',
  AES_256_GCM = 'AES_256_GCM',
  AES_128_GCM = 'AES_128_GCM',
  RSA_OAEP = 'RSA_OAEP',
  RSA_PKCS1 = 'RSA_PKCS1',
  CUSTOM = 'CUSTOM'
}

export enum EventCompressType {
  NONE = 'NONE',
  GZIP = 'GZIP',
  DEFLATE = 'DEFLATE',
  BROTLI = 'BROTLI',
  SNAPPY = 'SNAPPY',
  LZ4 = 'LZ4',
  ZSTD = 'ZSTD',
  CUSTOM = 'CUSTOM'
}

export enum EventSerializationFormat {
  JSON = 'JSON',
  MSGPACK = 'MSGPACK',
  PROTOBUF = 'PROTOBUF',
  AVRO = 'AVRO',
  CBOR = 'CBOR',
  BINARY = 'BINARY',
  CUSTOM = 'CUSTOM'
}

export interface EducationEvent {
  id: string;
  type: EventType;
  version: SchemaVersion;
  timestamp: string;
  schoolId: string;
  source: string;
  subject?: string;
  data: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  correlationId?: string;
  causationId?: string;
  traceId?: string;
  spanId?: string;
  priority?: EventPriority;
  ttl?: number;
  expiresAt?: string;
  signature?: EventSignature;
  partitionKey?: string;
  headers?: Record<string, string>;
  tags?: string[];
  labels?: Record<string, string>;
  createdAt?: string;
}

export interface EventSchema {
  id: string;
  name: string;
  description?: string;
  version: SchemaVersion;
  eventType: EventType;
  format: EventFormat;
  schema: Record<string, unknown>;
  example?: Record<string, unknown>;
  validation?: EventValidation;
  transforms?: EventTransform[];
  mappings?: EventTypeMappingConfig[];
  compatibility?: SchemaCompatibility;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  metadata?: Record<string, unknown>;
}

export interface EventValidation {
  enabled: boolean;
  level: EventValidationLevel;
  rules?: EventValidationRule[];
  customValidators?: string[];
  metadata?: Record<string, unknown>;
}

export interface EventValidationRule {
  id: string;
  name: string;
  type: string;
  params?: Record<string, unknown>;
  message?: string;
  severity?: string;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventTransform {
  id: string;
  name: string;
  type: string;
  expression?: string;
  function?: string;
  params?: Record<string, unknown>;
  sourceFields?: string[];
  targetFields?: string[];
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventTypeMappingConfig {
  sourceType: EventType;
  targetType: EventType;
  strategy: EventTypeMapping;
  transform?: string;
  params?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface SchemaCompatibility {
  backward: boolean;
  forward: boolean;
  full: boolean;
  transitive: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventRegistry {
  id: string;
  name: string;
  description?: string;
  schoolId: string;
  schemas: EventSchema[];
  subscriptions: EventSubscription[];
  routes: EventRoute[];
  filters: EventFilterConfig[];
  policies: EventPolicy[];
  config: EventConfig;
  metrics?: EventMetrics;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface EventSubscription {
  id: string;
  name: string;
  description?: string;
  eventType: EventType;
  filter?: EventFilterConfig;
  routing?: EventRoutingConfig;
  delivery: EventDeliveryConfig;
  retry?: EventRetryConfig;
  deadLetter?: EventDeadLetterConfig;
  replay?: EventReplayConfig;
  status: DeliveryStatus;
  active: boolean;
  schoolId: string;
  subscriberId: string;
  subscriberType: string;
  endpoint: string;
  transport: EventTransport;
  format: EventFormat;
  auth?: EventAuthConfig;
  monitoring?: EventMonitoringConfig;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: string;
}

export interface EventPublish {
  id: string;
  eventId: string;
  type: EventType;
  topic: string;
  partitionKey?: string;
  status: EventStatus;
  timestamp: string;
  publishedAt?: string;
  deliveredAt?: string;
  acknowledgedAt?: string;
  error?: string;
  retries?: number;
  metadata?: Record<string, unknown>;
}

export interface EventDelivery {
  id: string;
  eventId: string;
  subscriptionId: string;
  status: DeliveryStatus;
  endpoint: string;
  transport: EventTransport;
  attempts: number;
  maxAttempts: number;
  lastAttemptAt?: string;
  nextAttemptAt?: string;
  deliveredAt?: string;
  acknowledgedAt?: string;
  error?: string;
  responseCode?: number;
  responseTime?: number;
  metadata?: Record<string, unknown>;
}

export interface EventRetry {
  id: string;
  eventId: string;
  subscriptionId: string;
  strategy: RetryStrategy;
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

export interface EventDeadLetter {
  id: string;
  eventId: string;
  subscriptionId: string;
  reason: DeadLetterReason;
  error?: string;
  lastAttemptAt?: string;
  attempts: number;
  message: Record<string, unknown>;
  addedAt: string;
  processedAt?: string;
  processedBy?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

export interface EventReplay {
  id: string;
  subscriptionId: string;
  strategy: ReplayStrategy;
  startTimestamp?: string;
  endTimestamp?: string;
  startOffset?: number;
  endOffset?: number;
  startEventId?: string;
  endEventId?: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  eventsReplayed?: number;
  errors?: number;
  metadata?: Record<string, unknown>;
}

export interface EventFilter {
  id: string;
  name: string;
  description?: string;
  field: string;
  type: FilterType;
  value?: unknown;
  values?: unknown[];
  pattern?: string;
  caseSensitive?: boolean;
  negate?: boolean;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventFilterConfig {
  id: string;
  name: string;
  filters: EventFilter[];
  logic: string;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventRouting {
  id: string;
  name: string;
  description?: string;
  type: RoutingType;
  source: string;
  destination: string;
  conditions?: EventRoutingCondition[];
  transformations?: EventTransform[];
  priority?: number;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventRoutingCondition {
  field: string;
  type: FilterType;
  value?: unknown;
  values?: unknown[];
  pattern?: string;
  metadata?: Record<string, unknown>;
}

export interface EventRoutingConfig {
  type: RoutingType;
  routes: EventRoute[];
  defaultRoute?: string;
  metadata?: Record<string, unknown>;
}

export interface EventRoute {
  id: string;
  name: string;
  source: string;
  destination: string;
  type: RoutingType;
  conditions?: EventRoutingCondition[];
  priority?: number;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventTracking {
  id: string;
  eventId: string;
  correlationId?: string;
  causationId?: string;
  traceId?: string;
  spanId?: string;
  parentSpanId?: string;
  source: string;
  destination?: string;
  transport: EventTransport;
  status: DeliveryStatus;
  publishedAt: string;
  deliveredAt?: string;
  acknowledgedAt?: string;
  failedAt?: string;
  processingTime?: number;
  deliveryTime?: number;
  totalTime?: number;
  attempts?: number;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface EventSignature {
  algorithm: SignatureAlgorithm;
  keyId: string;
  signature: string;
  timestamp: string;
  nonce?: string;
  publicKey?: string;
  metadata?: Record<string, unknown>;
}

export interface EventConfig {
  id: string;
  name: string;
  description?: string;
  schoolId: string;
  enabled: boolean;
  retention: number;
  retentionUnit: string;
  maxEventSize: number;
  maxBatchSize: number;
  defaultTransport: EventTransport;
  defaultFormat: EventFormat;
  defaultPriority: EventPriority;
  defaultTtl: number;
  compression: EventCompressType;
  encryption: EventEncryptionType;
  serialization: EventSerializationFormat;
  validation: EventValidation;
  signing: EventSigningConfig;
  correlation: EventCorrelationStrategy;
  archival: EventArchivalConfig;
  monitoring: EventMonitoringConfig;
  logging: EventLoggingConfig;
  security: EventSecurityConfig;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface EventSigningConfig {
  enabled: boolean;
  algorithm: SignatureAlgorithm;
  keyId?: string;
  keyRotation?: boolean;
  keyRotationInterval?: number;
  metadata?: Record<string, unknown>;
}

export interface EventArchivalConfig {
  enabled: boolean;
  retention: number;
  retentionUnit: string;
  destination: string;
  format: EventFormat;
  compression?: EventCompressType;
  encryption?: EventEncryptionType;
  metadata?: Record<string, unknown>;
}

export interface EventMonitoringConfig {
  enabled: boolean;
  metricsEnabled?: boolean;
  metricsInterval?: number;
  loggingEnabled?: boolean;
  loggingLevel?: string;
  alertingEnabled?: boolean;
  alertingRules?: EventAlertingRule[];
  dashboardEnabled?: boolean;
  dashboardUrl?: string;
  customMonitoring?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface EventAlertingRule {
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

export interface EventLoggingConfig {
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

export interface EventSecurityConfig {
  enabled: boolean;
  authentication?: boolean;
  authorization?: boolean;
  encryption?: EventEncryptionType;
  signing?: EventSigningConfig;
  validation?: EventValidation;
  rateLimiting?: boolean;
  rateLimit?: number;
  rateLimitWindow?: number;
  ipRestriction?: boolean;
  allowedIps?: string[];
  customSecurity?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface EventAuthConfig {
  type: string;
  credentials?: Record<string, string>;
  token?: string;
  headers?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface EventMetrics {
  id: string;
  period: string;
  totalEvents: number;
  publishedEvents: number;
  deliveredEvents: number;
  failedEvents: number;
  retriedEvents: number;
  deadLetterEvents: number;
  averageDeliveryTime: number;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  p50DeliveryTime: number;
  p90DeliveryTime: number;
  p95DeliveryTime: number;
  p99DeliveryTime: number;
  throughput: number;
  errorRate: number;
  successRate: number;
  eventsByType?: Record<string, number>;
  eventsByPriority?: Record<string, number>;
  eventsByStatus?: Record<string, number>;
  topSubscriptions?: EventUsageRanking[];
  topEventTypes?: EventUsageRanking[];
  metrics?: EventMetric[];
  metadata?: Record<string, unknown>;
}

export interface EventMetric {
  id: string;
  name: string;
  type: string;
  value: number;
  unit?: string;
  timestamp: string;
  labels?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface EventUsageRanking {
  id: string;
  name: string;
  count: number;
  percentage: number;
}

export interface EventBatch {
  id: string;
  events: EducationEvent[];
  size: number;
  status: string;
  createdAt: string;
  publishedAt?: string;
  completedAt?: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface EventEnvelope {
  id: string;
  type: EventType;
  version: SchemaVersion;
  timestamp: string;
  source: string;
  subject?: string;
  data: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  correlationId?: string;
  causationId?: string;
  traceId?: string;
  spanId?: string;
  priority?: EventPriority;
  ttl?: number;
  expiresAt?: string;
  signature?: EventSignature;
  partitionKey?: string;
  headers?: Record<string, string>;
  tags?: string[];
  labels?: Record<string, string>;
}

export interface EventFilterResult {
  matched: boolean;
  reason?: string;
  filters?: EventFilterMatch[];
  metadata?: Record<string, unknown>;
}

export interface EventFilterMatch {
  filterId: string;
  filterName: string;
  matched: boolean;
  field: string;
  type: FilterType;
  value?: unknown;
  metadata?: Record<string, unknown>;
}

export interface EventDeliveryResult {
  success: boolean;
  statusCode?: number;
  responseTime?: number;
  error?: string;
  retryable?: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventAcknowledge {
  eventId: string;
  subscriptionId: string;
  status: string;
  timestamp: string;
  processingTime?: number;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface EventNack {
  eventId: string;
  subscriptionId: string;
  reason: string;
  timestamp: string;
  retryable: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventCorrelation {
  eventId: string;
  correlationId: string;
  causationId?: string;
  chain?: string[];
  tree?: EventCorrelationTree;
  metadata?: Record<string, unknown>;
}

export interface EventCorrelationTree {
  rootId: string;
  children: EventCorrelationNode[];
  metadata?: Record<string, unknown>;
}

export interface EventCorrelationNode {
  eventId: string;
  parentId?: string;
  children?: string[];
  metadata?: Record<string, unknown>;
}

export interface EventTrace {
  traceId: string;
  spans: EventSpan[];
  startTime: string;
  endTime?: string;
  duration?: number;
  status?: string;
  metadata?: Record<string, unknown>;
}

export interface EventSpan {
  spanId: string;
  parentSpanId?: string;
  name: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  status?: string;
  attributes?: Record<string, unknown>;
  events?: EventSpanEvent[];
  metadata?: Record<string, unknown>;
}

export interface EventSpanEvent {
  name: string;
  timestamp: string;
  attributes?: Record<string, unknown>;
}

export interface EventContext {
  schoolId: string;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  correlationId?: string;
  causationId?: string;
  traceId?: string;
  spanId?: string;
  source: string;
  environment?: string;
  version?: string;
  metadata?: Record<string, unknown>;
}

export interface EventFilterExpression {
  operator: string;
  conditions: EventFilterCondition[];
  expressions?: EventFilterExpression[];
  metadata?: Record<string, unknown>;
}

export interface EventFilterCondition {
  field: string;
  type: FilterType;
  value?: unknown;
  values?: unknown[];
  pattern?: string;
  caseSensitive?: boolean;
  negate?: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventPolicy {
  id: string;
  name: string;
  description?: string;
  type: string;
  conditions: EventFilterExpression[];
  actions: EventPolicyAction[];
  priority?: number;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventPolicyAction {
  type: string;
  params?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface EventDeadLetterConfig {
  enabled: boolean;
  topic: string;
  retention: number;
  retentionUnit: string;
  maxRetries?: number;
  processingEnabled?: boolean;
  processingEndpoint?: string;
  metadata?: Record<string, unknown>;
}

export interface EventRetryConfig {
  strategy: RetryStrategy;
  maxAttempts: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  jitter?: boolean;
  jitterType?: string;
  retryableErrors?: string[];
  metadata?: Record<string, unknown>;
}

export interface EventDeliveryConfig {
  transport: EventTransport;
  endpoint: string;
  format: EventFormat;
  compression?: EventCompressType;
  encryption?: EventEncryptionType;
  timeout?: number;
  batchSize?: number;
  batchInterval?: number;
  async?: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventTemplate {
  id: string;
  name: string;
  description?: string;
  eventType: EventType;
  schema?: Partial<EventSchema>;
  subscription?: Partial<EventSubscription>;
  delivery?: Partial<EventDeliveryConfig>;
  retry?: Partial<EventRetryConfig>;
  deadLetter?: Partial<EventDeadLetterConfig>;
  tags?: string[];
  category?: string;
  author?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface EventSearch {
  query?: string;
  filters?: Record<string, unknown>;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  startTime?: string;
  endTime?: string;
  eventTypes?: EventType[];
  status?: EventStatus[];
  priority?: EventPriority[];
  metadata?: Record<string, unknown>;
}

export interface EventSearchResult {
  items: EducationEvent[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
  metadata?: Record<string, unknown>;
}

export interface EventAudit {
  id: string;
  eventId: string;
  action: string;
  performedBy: string;
  performedAt: string;
  changes?: Record<string, { before: unknown; after: unknown }>;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export interface EventList {
  items: EducationEvent[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface EventFilter {
  type?: EventType;
  status?: EventStatus;
  priority?: EventPriority;
  schoolId?: string;
  source?: string;
  startTime?: string;
  endTime?: string;
  correlationId?: string;
  tags?: string[];
  search?: string;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  metadata?: Record<string, unknown>;
}

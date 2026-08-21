export enum ConnectorType {
  LMS = 'LMS',
  LXP = 'LXP',
  ERP = 'ERP',
  SIS = 'SIS',
  HRIS = 'HRIS',
  EXAM_SYSTEM = 'EXAM_SYSTEM',
  UNIVERSITY_SYSTEM = 'UNIVERSITY_SYSTEM',
  GOVERNMENT_SYSTEM = 'GOVERNMENT_SYSTEM',
  PAYMENT_SYSTEM = 'PAYMENT_SYSTEM',
  IDENTITY_PROVIDER = 'IDENTITY_PROVIDER',
  RESEARCH_PLATFORM = 'RESEARCH_PLATFORM',
  EMPLOYMENT_PLATFORM = 'EMPLOYMENT_PLATFORM',
  CUSTOM = 'CUSTOM',
  WEBHOOK = 'WEBHOOK',
  REST_API = 'REST_API',
  SOAP = 'SOAP',
  GRAPHQL = 'GRAPHQL',
  FTP = 'FTP',
  SFTP = 'SFTP',
  FILE_IMPORT = 'FILE_IMPORT',
  DATABASE = 'DATABASE',
  MESSAGE_QUEUE = 'MESSAGE_QUEUE',
  EVENT_BUS = 'EVENT_BUS',
  DATA_WAREHOUSE = 'DATA_WAREHOUSE',
  BI_TOOL = 'BI_TOOL',
  SCORM_PLAYER = 'SCORM_PLAYER',
  XAPI_ACTIVITY = 'XAPI_ACTIVITY',
  CALIPER = 'CALIPER',
  OPENID = 'OPENID',
  SAML = 'SAML',
  LDAP = 'LDAP',
  OAUTH2 = 'OAUTH2',
  API_KEY = 'API_KEY',
  BASIC_AUTH = 'BASIC_AUTH',
  CLIENT_CERT = 'CLIENT_CERT',
  JWT = 'JWT',
  HMAC = 'HMAC',
  MTLS = 'MTLS',
  WEBHOOK_HMAC = 'WEBHOOK_HMAC',
  SIGNATURE = 'SIGNATURE',
  CREDENTIAL_STORE = 'CREDENTIAL_STORE',
  VAULT = 'VAULT',
  ENVIRONMENT = 'ENVIRONMENT',
  FILE_BASED = 'FILE_BASED',
  IN_MEMORY = 'IN_MEMORY',
  CACHED = 'CACHED',
  PROXIED = 'PROXIED',
  GATEWAY = 'GATEWAY',
  AGGREGATOR = 'AGGREGATOR',
  ROUTER = 'ROUTER',
  TRANSFORMER = 'TRANSFORMER',
  ENRICHER = 'ENRICHER',
  FILTER = 'FILTER',
  VALIDATOR = 'VALIDATOR',
  ENCODER = 'ENCODER',
  DECODER = 'DECODER',
  COMPRESSION = 'COMPRESSION',
  ENCRYPTION = 'ENCRYPTION',
  SIGNING = 'SIGNING',
  VERIFICATION = 'VERIFICATION',
  LOGGING = 'LOGGING',
  MONITORING = 'MONITORING',
  ALERTING = 'ALERTING',
  AUDIT = 'AUDIT',
  REPORTING = 'REPORTING',
  ANALYTICS = 'ANALYTICS',
  CACHING = 'CACHING',
  QUEUE = 'QUEUE',
  STREAM = 'STREAM',
  BATCH = 'BATCH',
  REALTIME = 'REALTIME',
  POLLING = 'POLLING',
  PUSH = 'PUSH',
  PULL = 'PULL',
  SUBSCRIBE = 'SUBSCRIBE',
  NOTIFY = 'NOTIFY',
  BROADCAST = 'BROADCAST',
  MULTICAST = 'MULTICAST',
  UNICAST = 'UNICAST',
  OTHER = 'OTHER'
}

export enum ConnectorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  FAILED = 'FAILED',
  DEGRADED = 'DEGRADED',
  MAINTENANCE = 'MAINTENANCE',
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  RECONNECTING = 'RECONNECTING',
  PENDING = 'PENDING',
  CONFIGURING = 'CONFIGURING',
  PROVISIONING = 'PROVISIONING',
  DEPROVISIONING = 'DEPROVISIONING',
  UPDATING = 'UPDATING',
  ROLLING_BACK = 'ROLLING_BACK',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  READY = 'READY',
  NOT_READY = 'NOT_READY',
  INITIALIZING = 'INITIALIZING',
  STOPPING = 'STOPPING',
  STOPPED = 'STOPPED',
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  RESUMED = 'RESUMED',
  CANCELLED = 'CANCELLED',
  TIMEOUT = 'TIMEOUT',
  RATE_LIMITED = 'RATE_LIMITED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  UNKNOWN = 'UNKNOWN'
}

export enum ConnectorProtocol {
  REST = 'REST',
  SOAP = 'SOAP',
  GRAPHQL = 'GRAPHQL',
  GRPC = 'GRPC',
  WEBSOCKET = 'WEBSOCKET',
  FTP = 'FTP',
  SFTP = 'SFTP',
  SMTP = 'SMTP',
  AMQP = 'AMQP',
  MQTT = 'MQTT',
  KAFKA = 'KAFKA',
  NATS = 'NATS',
  REDIS = 'REDIS',
  TCP = 'TCP',
  UDP = 'UDP',
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
  SSH = 'SSH',
  SSL = 'SSL',
  TLS = 'TLS',
  WSS = 'WSS',
  WS = 'WS',
  COAP = 'COAP',
  WEBDAV = 'WEBDAV',
  LDAP = 'LDAP',
  LDAPS = 'LDAPS',
  RADIUS = 'RADIUS',
  DIAMETER = 'DIAMETER',
  SIP = 'SIP',
  SRTP = 'SRTP',
  ZMQ = 'ZMQ',
  THRIFT = 'THRIFT',
  MARSHAL = 'MARSHAL',
  XMLRPC = 'XMLRPC',
  JSONRPC = 'JSONRPC',
  CORBA = 'CORBA',
  DCOM = 'DCOM',
  JMS = 'JMS',
  RABBITMQ = 'RABBITMQ',
  CELERIO = 'CELERIO',
  ODATA = 'ODATA',
  SCIM = 'SCIM',
  SAML2 = 'SAML2',
  CAS = 'CAS',
  OPENID_CONNECT = 'OPENID_CONNECT',
  OTHER = 'OTHER'
}

export enum AuthMethod {
  API_KEY = 'API_KEY',
  BASIC_AUTH = 'BASIC_AUTH',
  OAUTH2 = 'OAUTH2',
  OAUTH2_CLIENT_CREDENTIALS = 'OAUTH2_CLIENT_CREDENTIALS',
  OAUTH2_PASSWORD = 'OAUTH2_PASSWORD',
  OAUTH2_AUTHORIZATION_CODE = 'OAUTH2_AUTHORIZATION_CODE',
  OAUTH2_IMPLICIT = 'OAUTH2_IMPLICIT',
  OAUTH2_PKCE = 'OAUTH2_PKCE',
  JWT = 'JWT',
  JWT_BEARER = 'JWT_BEARER',
  HMAC = 'HMAC',
  SIGNATURE = 'SIGNATURE',
  CLIENT_CERT = 'CLIENT_CERT',
  MTLS = 'MTLS',
  SAML = 'SAML',
  SAML2 = 'SAML2',
  OPENID = 'OPENID',
  OPENID_CONNECT = 'OPENID_CONNECT',
  LDAP = 'LDAP',
  LDAP_SIMPLE = 'LDAP_SIMPLE',
  LDAP_SASL = 'LDAP_SASL',
  NTLM = 'NTLM',
  KERBEROS = 'KERBEROS',
  NEGOTIATE = 'NEGOTIATE',
  DIGEST = 'DIGEST',
  BEARER = 'BEARER',
  TOKEN = 'TOKEN',
  SESSION = 'SESSION',
  COOKIE = 'COOKIE',
  IP_WHITE_LIST = 'IP_WHITE_LIST',
  IP_RESTRICTION = 'IP_RESTRICTION',
  GEO_RESTRICTION = 'GEO_RESTRICTION',
  MFA = 'MFA',
  TOTP = 'TOTP',
  HOTP = 'HOTP',
  WEBAUTHN = 'WEBAUTHN',
  FIDO2 = 'FIDO2',
  BIOMETRIC = 'BIOMETRIC',
  CERTIFICATE_PINNING = 'CERTIFICATE_PINNING',
  PUBLIC_KEY = 'PUBLIC_KEY',
  PRIVATE_KEY = 'PRIVATE_KEY',
  ASYMMETRIC = 'ASYMMETRIC',
  SYMMETRIC = 'SYMMETRIC',
  CUSTOM = 'CUSTOM',
  NONE = 'NONE',
  MULTI = 'MULTI',
  CHAINED = 'CHAINED',
  CACHED = 'CACHED',
  REFRESHABLE = 'REFRESHABLE'
}

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

export enum HealthStatus {
  HEALTHY = 'HEALTHY',
  UNHEALTHY = 'UNHEALTHY',
  DEGRADED = 'DEGRADED',
  UNKNOWN = 'UNKNOWN',
  PENDING = 'PENDING',
  MAINTENANCE = 'MAINTENANCE',
  IMPAIRED = 'IMPAIRED',
  CRITICAL = 'CRITICAL',
  WARNING = 'WARNING',
  OK = 'OK',
  ERROR = 'ERROR',
  TIMEOUT = 'TIMEOUT',
  UNREACHABLE = 'UNREACHABLE',
  PARTIAL = 'PARTIAL',
  FULL = 'FULL',
  EMPTY = 'EMPTY',
  STALE = 'STALE',
  FRESH = 'FRESH',
  EXPIRED = 'EXPIRED',
  VALID = 'VALID',
  INVALID = 'INVALID',
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED',
  NOT_CONFIGURED = 'NOT_CONFIGURED',
  CONFIGURED = 'CONFIGURED',
  READY = 'READY',
  NOT_READY = 'NOT_READY',
  BUSY = 'BUSY',
  IDLE = 'IDLE'
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
  CIRCUIT_BREAKER = 'CIRCUIT_BREAKER',
  BULKHEAD = 'BULKHEAD',
  FALLBACK = 'FALLBACK',
  RETRY_WITH_TIMEOUT = 'RETRY_WITH_TIMEOUT',
  RETRY_WITH_CONTEXT = 'RETRY_WITH_CONTEXT',
  RETRY_WITH_STATE = 'RETRY_WITH_STATE',
  RETRY_WITH_COMPENSATION = 'RETRY_WITH_COMPENSATION',
  CUSTOM = 'CUSTOM'
}

export enum MappingType {
  DIRECT = 'DIRECT',
  TRANSFORM = 'TRANSFORM',
  AGGREGATE = 'AGGREGATE',
  SPLIT = 'SPLIT',
  MERGE = 'MERGE',
  FILTER = 'FILTER',
  ENRICH = 'ENRICH',
  VALIDATE = 'VALIDATE',
  DENORMALIZE = 'DENORMALIZE',
  NORMALIZE = 'NORMALIZE',
  FLATTEN = 'FLATTEN',
  NEST = 'NEST',
  CONVERT = 'CONVERT',
  CAST = 'CAST',
  FORMAT = 'FORMAT',
  ENCODE = 'ENCODE',
  DECODE = 'DECODE',
  COMPRESS = 'COMPRESS',
  DECOMPRESS = 'DECOMPRESS',
  ENCRYPT = 'ENCRYPT',
  DECRYPT = 'DECRYPT',
  SIGN = 'SIGN',
  VERIFY = 'VERIFY',
  HASH = 'HASH',
  TOKENIZE = 'TOKENIZE',
  DETOKENIZE = 'DETOKENIZE',
  CUSTOM = 'CUSTOM'
}

export enum SecretType {
  API_KEY = 'API_KEY',
  API_SECRET = 'API_SECRET',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  PRIVATE_KEY = 'PRIVATE_KEY',
  PUBLIC_KEY = 'PUBLIC_KEY',
  CERTIFICATE = 'CERTIFICATE',
  PASSWORD = 'PASSWORD',
  PASSPHRASE = 'PASSPHRASE',
  CLIENT_SECRET = 'CLIENT_SECRET',
  ENCRYPTION_KEY = 'ENCRYPTION_KEY',
  SIGNING_KEY = 'SIGNING_KEY',
  WEBHOOK_SECRET = 'WEBHOOK_SECRET',
  DATABASE_URL = 'DATABASE_URL',
  CONNECTION_STRING = 'CONNECTION_STRING',
  SSH_KEY = 'SSH_KEY',
  SSH_PASSPHRASE = 'SSH_PASSPHRASE',
  OAUTH_TOKEN = 'OAUTH_TOKEN',
  JWT_SECRET = 'JWT_SECRET',
  SAML_CERT = 'SAML_CERT',
  LDAP_BIND_PASSWORD = 'LDAP_BIND_PASSWORD',
  CUSTOM = 'CUSTOM'
}

export enum VersionStrategy {
  FIXED = 'FIXED',
  LATEST = 'LATEST',
  STABLE = 'STABLE',
  BETA = 'BETA',
  CANARY = 'CANARY',
  STAGED_ROLLOUT = 'STAGED_ROLLOUT',
  BLUE_GREEN = 'BLUE_GREEN',
  CANARY_RELEASE = 'CANARY_RELEASE',
  AB_TESTING = 'AB_TESTING',
  FEATURE_FLAG = 'FEATURE_FLAG',
  CUSTOM = 'CUSTOM'
}

export enum ConnectorEvent {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  RECONNECTED = 'RECONNECTED',
  SYNC_STARTED = 'SYNC_STARTED',
  SYNC_COMPLETED = 'SYNC_COMPLETED',
  SYNC_FAILED = 'SYNC_FAILED',
  SYNC_PROGRESS = 'SYNC_PROGRESS',
  SYNC_CANCELLED = 'SYNC_CANCELLED',
  HEALTH_CHECK_PASSED = 'HEALTH_CHECK_PASSED',
  HEALTH_CHECK_FAILED = 'HEALTH_CHECK_FAILED',
  HEALTH_CHECK_DEGRADED = 'HEALTH_CHECK_DEGRADED',
  CONFIG_UPDATED = 'CONFIG_UPDATED',
  CONFIG_VALIDATED = 'CONFIG_VALIDATED',
  CONFIG_INVALID = 'CONFIG_INVALID',
  CREDENTIAL_ROTATED = 'CREDENTIAL_ROTATED',
  CREDENTIAL_EXPIRED = 'CREDENTIAL_EXPIRED',
  CREDENTIAL_INVALID = 'CREDENTIAL_INVALID',
  RATE_LIMITED = 'RATE_LIMITED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  THROTTLED = 'THROTTLED',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  TRACE = 'TRACE',
  DATA_RECEIVED = 'DATA_RECEIVED',
  DATA_SENT = 'DATA_SENT',
  DATA_TRANSFORMED = 'DATA_TRANSFORMED',
  DATA_MAPPED = 'DATA_MAPPED',
  DATA_VALIDATED = 'DATA_VALIDATED',
  DATA_REJECTED = 'DATA_REJECTED',
  DATA_DUPLICATE = 'DATA_DUPLICATE',
  DATA_CONFLICT = 'DATA_CONFLICT',
  WEBHOOK_RECEIVED = 'WEBHOOK_RECEIVED',
  WEBHOOK_PROCESSED = 'WEBHOOK_PROCESSED',
  WEBHOOK_FAILED = 'WEBHOOK_FAILED',
  WEBHOOK_RETRY = 'WEBHOOK_RETRY',
  VERSION_UPGRADED = 'VERSION_UPGRADED',
  VERSION_DOWNGRADED = 'VERSION_DOWNGRADED',
  SCHEMA_CHANGED = 'SCHEMA_CHANGED',
  BACKUP_STARTED = 'BACKUP_STARTED',
  BACKUP_COMPLETED = 'BACKUP_COMPLETED',
  BACKUP_FAILED = 'BACKUP_FAILED',
  RESTORE_STARTED = 'RESTORE_STARTED',
  RESTORE_COMPLETED = 'RESTORE_COMPLETED',
  RESTORE_FAILED = 'RESTORE_FAILED',
  MAINTENANCE_STARTED = 'MAINTENANCE_STARTED',
  MAINTENANCE_COMPLETED = 'MAINTENANCE_COMPLETED',
  OTHER = 'OTHER'
}

export enum ConnectorPermission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  ADMIN = 'ADMIN',
  SYNC = 'SYNC',
  EXPORT = 'EXPORT',
  IMPORT = 'IMPORT',
  CONFIGURE = 'CONFIGURE',
  MONITOR = 'MONITOR',
  LOG = 'LOG',
  SECRET = 'SECRET',
  WEBHOOK = 'WEBHOOK',
  METRICS = 'METRICS',
  HEALTH = 'HEALTH',
  RETRY = 'RETRY',
  MAPPING = 'MAPPING',
  VERSION = 'VERSION',
  DEPLOY = 'DEPLOY',
  ROLLBACK = 'ROLLBACK',
  PAUSE = 'PAUSE',
  RESUME = 'RESUME',
  CANCEL = 'CANCEL',
  RESET = 'RESET',
  CLONE = 'CLONE',
  SHARE = 'SHARE',
  UNSHARE = 'UNSHARE',
  LOCK = 'LOCK',
  UNLOCK = 'UNLOCK',
  ARCHIVE = 'ARCHIVE',
  RESTORE_ARCHIVE = 'RESTORE_ARCHIVE',
  OTHER = 'OTHER'
}

export enum ConnectorLogLevel {
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF'
}

export enum ConnectorMetricType {
  COUNTER = 'COUNTER',
  GAUGE = 'GAUGE',
  HISTOGRAM = 'HISTOGRAM',
  SUMMARY = 'SUMMARY',
  TIMER = 'TIMER',
  RATE = 'RATE',
  PERCENTAGE = 'PERCENTAGE',
  COUNT = 'COUNT',
  AMOUNT = 'AMOUNT',
  DURATION = 'DURATION',
  SIZE = 'SIZE',
  LATENCY = 'LATENCY',
  THROUGHPUT = 'THROUGHPUT',
  ERROR_RATE = 'ERROR_RATE',
  SUCCESS_RATE = 'SUCCESS_RATE',
  AVAILABILITY = 'AVAILABILITY',
  UPTIME = 'UPTIME',
  DOWNTIME = 'DOWNTIME',
  OTHER = 'OTHER'
}

export enum ConnectorMapFieldAction {
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

export interface ConnectorConfig {
  id: string;
  name: string;
  description?: string;
  type: ConnectorType;
  protocol: ConnectorProtocol;
  baseUrl: string;
  apiVersion?: string;
  timeout?: number;
  retryStrategy?: RetryStrategy;
  maxRetries?: number;
  retryDelay?: number;
  rateLimit?: number;
  rateLimitWindow?: number;
  bulkSize?: number;
  parallelism?: number;
  compression?: boolean;
  encryption?: boolean;
  signing?: boolean;
  signatureAlgorithm?: string;
  customHeaders?: Record<string, string>;
  customParams?: Record<string, string>;
  customConfig?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  tags?: string[];
  environment?: string;
  region?: string;
  cluster?: string;
  namespace?: string;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  version?: string;
  enabled?: boolean;
  status?: ConnectorStatus;
  healthCheckUrl?: string;
  healthCheckInterval?: number;
  healthCheckTimeout?: number;
  syncUrl?: string;
  syncInterval?: number;
  syncMode?: SyncMode;
  syncDirection?: string;
  webhookUrl?: string;
  webhookSecret?: string;
  webhookEvents?: string[];
  webhookRetry?: boolean;
  webhookTimeout?: number;
  mappingConfig?: ConnectorMappingConfig;
  validationConfig?: ConnectorValidationConfig;
  transformationConfig?: ConnectorTransformationConfig;
  exportConfig?: ConnectorExportConfig;
  importConfig?: ConnectorImportConfig;
  monitoringConfig?: ConnectorMonitoringConfig;
  loggingConfig?: ConnectorLoggingConfig;
  securityConfig?: ConnectorSecurityConfig;
  credentialConfig?: ConnectorCredentialConfig;
  versionConfig?: ConnectorVersionConfig;
  deploymentConfig?: ConnectorDeploymentConfig;
}

export interface ConnectorAuth {
  id: string;
  connectorId: string;
  method: AuthMethod;
  credentials: ConnectorCredentials;
  expiresAt?: string;
  refreshAt?: string;
  tokenUrl?: string;
  authorizeUrl?: string;
  callbackUrl?: string;
  scopes?: string[];
  audience?: string;
  issuer?: string;
  subject?: string;
  claims?: Record<string, unknown>;
  headers?: Record<string, string>;
  params?: Record<string, string>;
 证书?: string;
  privateKey?: string;
  passphrase?: string;
  fingerprint?: string;
  algorithm?: string;
  keyId?: string;
  keyVersion?: string;
  rotationEnabled?: boolean;
  rotationInterval?: number;
  lastRotatedAt?: string;
  nextRotationAt?: string;
  metadata?: Record<string, unknown>;
}

export interface ConnectorCredentials {
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  username?: string;
  password?: string;
  token?: string;
  secret?: string;
  certificate?: string;
  privateKey?: string;
  publicKey?: string;
  passphrase?: string;
  bearerToken?: string;
  basicAuth?: string;
  digestAuth?: string;
  ntlmAuth?: string;
  kerberosAuth?: string;
  samlAssertion?: string;
  samlResponse?: string;
  oidcToken?: string;
  idToken?: string;
  custom?: Record<string, string>;
}

export interface ConnectorHealth {
  id: string;
  connectorId: string;
  status: HealthStatus;
  checkedAt: string;
  responseTime?: number;
  statusCode?: number;
  message?: string;
  details?: Record<string, unknown>;
  checks?: ConnectorHealthCheck[];
  uptime?: number;
  downtime?: number;
  lastFailure?: string;
  lastSuccess?: string;
  consecutiveFailures?: number;
  consecutiveSuccesses?: number;
  availability?: number;
  latency?: ConnectorLatencyMetrics;
  throughput?: ConnectorThroughputMetrics;
  errorRate?: number;
  metadata?: Record<string, unknown>;
}

export interface ConnectorHealthCheck {
  name: string;
  status: HealthStatus;
  message?: string;
  responseTime?: number;
  checkedAt: string;
  details?: Record<string, unknown>;
}

export interface ConnectorLatencyMetrics {
  min?: number;
  max?: number;
  avg?: number;
  p50?: number;
  p90?: number;
  p95?: number;
  p99?: number;
  count?: number;
}

export interface ConnectorThroughputMetrics {
  requestsPerSecond?: number;
  requestsPerMinute?: number;
  requestsPerHour?: number;
  bytesPerSecond?: number;
  bytesPerMinute?: number;
  bytesPerHour?: number;
  recordsPerSecond?: number;
  recordsPerMinute?: number;
  recordsPerHour?: number;
}

export interface ConnectorSync {
  id: string;
  connectorId: string;
  jobId: string;
  mode: SyncMode;
  direction?: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  recordsProcessed?: number;
  recordsCreated?: number;
  recordsUpdated?: number;
  recordsDeleted?: number;
  recordsSkipped?: number;
  recordsFailed?: number;
  bytesTransferred?: number;
  errors?: ConnectorSyncError[];
  warnings?: ConnectorSyncWarning[];
  metadata?: Record<string, unknown>;
}

export interface ConnectorSyncError {
  code: string;
  message: string;
  field?: string;
  record?: Record<string, unknown>;
  timestamp?: string;
  retryable?: boolean;
}

export interface ConnectorSyncWarning {
  code: string;
  message: string;
  field?: string;
  record?: Record<string, unknown>;
  timestamp?: string;
}

export interface ConnectorImport {
  id: string;
  connectorId: string;
  jobId: string;
  format: string;
  source: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  totalRecords?: number;
  processedRecords?: number;
  createdRecords?: number;
  updatedRecords?: number;
  deletedRecords?: number;
  skippedRecords?: number;
  failedRecords?: number;
  errors?: ConnectorSyncError[];
  warnings?: ConnectorSyncWarning[];
  metadata?: Record<string, unknown>;
}

export interface ConnectorExport {
  id: string;
  connectorId: string;
  jobId: string;
  format: string;
  destination: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  totalRecords?: number;
  exportedRecords?: number;
  failedRecords?: number;
  fileSize?: number;
  fileUrl?: string;
  errors?: ConnectorSyncError[];
  warnings?: ConnectorSyncWarning[];
  metadata?: Record<string, unknown>;
}

export interface ConnectorWebhook {
  id: string;
  connectorId: string;
  url: string;
  secret?: string;
  events: string[];
  active: boolean;
  format?: string;
  method?: string;
  headers?: Record<string, string>;
  timeout?: number;
  retryStrategy?: RetryStrategy;
  maxRetries?: number;
  retryDelay?: number;
  lastTriggeredAt?: string;
  lastStatus?: string;
  totalTriggered?: number;
  totalSucceeded?: number;
  totalFailed?: number;
  metadata?: Record<string, unknown>;
}

export interface ConnectorRetry {
  id: string;
  connectorId: string;
  operationId: string;
  operationType: string;
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

export interface ConnectorLog {
  id: string;
  connectorId: string;
  level: ConnectorLogLevel;
  message: string;
  timestamp: string;
  operationId?: string;
  operationType?: string;
  duration?: number;
  statusCode?: number;
  error?: string;
  stack?: string;
  context?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorMetric {
  id: string;
  connectorId: string;
  name: string;
  type: ConnectorMetricType;
  value: number;
  unit?: string;
  timestamp: string;
  labels?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorMetrics {
  connectorId: string;
  period: string;
  totalRequests?: number;
  successfulRequests?: number;
  failedRequests?: number;
  averageResponseTime?: number;
  minResponseTime?: number;
  maxResponseTime?: number;
  p50ResponseTime?: number;
  p90ResponseTime?: number;
  p95ResponseTime?: number;
  p99ResponseTime?: number;
  throughput?: number;
  errorRate?: number;
  successRate?: number;
  availability?: number;
  uptime?: number;
  downtime?: number;
  dataTransferred?: number;
  recordsProcessed?: number;
  syncCount?: number;
  importCount?: number;
  exportCount?: number;
  webhookCount?: number;
  retryCount?: number;
  healthCheckCount?: number;
  metrics?: ConnectorMetric[];
  metadata?: Record<string, unknown>;
}

export interface ConnectorMapping {
  id: string;
  connectorId: string;
  name: string;
  description?: string;
  type: MappingType;
  sourceSchema?: string;
  targetSchema?: string;
  fields: ConnectorMappingField[];
  transformations?: ConnectorMappingTransformation[];
  validations?: ConnectorMappingValidation[];
  enabled?: boolean;
  version?: string;
  metadata?: Record<string, unknown>;
}

export interface ConnectorMappingField {
  id: string;
  sourceField: string;
  targetField: string;
  action: ConnectorMapFieldAction;
  dataType?: string;
  defaultValue?: string;
  required?: boolean;
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

export interface ConnectorMappingTransformation {
  id: string;
  type: string;
  expression?: string;
  function?: string;
  params?: Record<string, unknown>;
  order?: number;
  metadata?: Record<string, unknown>;
}

export interface ConnectorMappingValidation {
  id: string;
  type: string;
  expression?: string;
  function?: string;
  params?: Record<string, unknown>;
  message?: string;
  severity?: string;
  metadata?: Record<string, unknown>;
}

export interface ConnectorMappingConfig {
  mappings: ConnectorMapping[];
  strictMode?: boolean;
  ignoreUnmapped?: boolean;
  failOnValidationError?: boolean;
  defaultValues?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorValidationConfig {
  enabled: boolean;
  strictMode?: boolean;
  rules: ConnectorValidationRule[];
  customValidators?: string[];
  metadata?: Record<string, unknown>;
}

export interface ConnectorValidationRule {
  id: string;
  field: string;
  type: string;
  params?: Record<string, unknown>;
  message?: string;
  severity?: string;
  metadata?: Record<string, unknown>;
}

export interface ConnectorTransformationConfig {
  enabled: boolean;
  rules: ConnectorTransformationRule[];
  customTransformations?: string[];
  metadata?: Record<string, unknown>;
}

export interface ConnectorTransformationRule {
  id: string;
  sourceField: string;
  targetField: string;
  type: string;
  params?: Record<string, unknown>;
  condition?: string;
  metadata?: Record<string, unknown>;
}

export interface ConnectorExportConfig {
  enabled: boolean;
  format: string;
  destination: string;
  compression?: boolean;
  encryption?: boolean;
  splitting?: boolean;
  maxFileSize?: number;
  maxRecords?: number;
  customOptions?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorImportConfig {
  enabled: boolean;
  format: string;
  source: string;
  compression?: boolean;
  encryption?: boolean;
  deduplication?: boolean;
  validation?: boolean;
  transformation?: boolean;
  mapping?: boolean;
  customOptions?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorMonitoringConfig {
  enabled: boolean;
  healthCheckEnabled?: boolean;
  healthCheckInterval?: number;
  metricsEnabled?: boolean;
  metricsInterval?: number;
  loggingEnabled?: boolean;
  loggingLevel?: ConnectorLogLevel;
  alertingEnabled?: boolean;
  alertingRules?: ConnectorAlertingRule[];
  dashboardEnabled?: boolean;
  dashboardUrl?: string;
  customMonitoring?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorAlertingRule {
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

export interface ConnectorLoggingConfig {
  enabled: boolean;
  level: ConnectorLogLevel;
  destination: string;
  format?: string;
  retention?: number;
  rotation?: boolean;
  rotationInterval?: number;
  maxFileSize?: number;
  maxFiles?: number;
  compression?: boolean;
  encryption?: boolean;
  customFields?: string[];
  excludeFields?: string[];
  metadata?: Record<string, unknown>;
}

export interface ConnectorSecurityConfig {
  enabled: boolean;
  tlsEnabled?: boolean;
  tlsVersion?: string;
  certificateValidation?: boolean;
  hostnameVerification?: boolean;
  ipRestriction?: boolean;
  allowedIps?: string[];
  geoRestriction?: boolean;
  allowedRegions?: string[];
  corsEnabled?: boolean;
  corsOrigins?: string[];
  cspEnabled?: boolean;
  cspPolicy?: string;
  rateLimiting?: boolean;
  rateLimit?: number;
  rateLimitWindow?: number;
  ddosProtection?: boolean;
  encryptionAtRest?: boolean;
  encryptionAlgorithm?: string;
  keyRotation?: boolean;
  keyRotationInterval?: number;
  secretsManagement?: boolean;
  secretsBackend?: string;
  auditLogging?: boolean;
  customSecurity?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorCredentialConfig {
  enabled: boolean;
  secretsBackend: string;
  rotationEnabled?: boolean;
  rotationInterval?: number;
  lastRotatedAt?: string;
  nextRotationAt?: string;
  expirationEnabled?: boolean;
  expirationWarning?: number;
  backupEnabled?: boolean;
  backupLocation?: string;
  customConfig?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorVersionConfig {
  currentVersion: string;
  strategy: VersionStrategy;
  versions?: ConnectorVersionInfo[];
  rollbackEnabled?: boolean;
  rollbackVersions?: number;
  canaryEnabled?: boolean;
  canaryPercentage?: number;
  featureFlags?: Record<string, boolean>;
  customConfig?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorVersionInfo {
  version: string;
  releasedAt: string;
  status: string;
  changelog?: string;
  breaking?: boolean;
  deprecated?: boolean;
  supported?: boolean;
  metadata?: Record<string, unknown>;
}

export interface ConnectorDeploymentConfig {
  enabled: boolean;
  strategy?: string;
  environment?: string;
  region?: string;
  replicas?: number;
  autoscaling?: boolean;
  minReplicas?: number;
  maxReplicas?: number;
  resources?: ConnectorResourceConfig;
  networking?: ConnectorNetworkingConfig;
  storage?: ConnectorStorageConfig;
  customConfig?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorResourceConfig {
  cpu?: string;
  memory?: string;
  gpu?: string;
  disk?: string;
  network?: string;
  custom?: Record<string, string>;
}

export interface ConnectorNetworkingConfig {
  ingress?: boolean;
  egress?: boolean;
  proxy?: boolean;
  proxyUrl?: string;
  proxyAuth?: string;
  loadBalancer?: boolean;
  serviceMesh?: boolean;
  custom?: Record<string, unknown>;
}

export interface ConnectorStorageConfig {
  type?: string;
  size?: string;
  class?: string;
  path?: string;
  persistent?: boolean;
  encryption?: boolean;
  replication?: boolean;
  custom?: Record<string, unknown>;
}

export interface ConnectorConfigValidation {
  valid: boolean;
  errors: ConnectorValidationError[];
  warnings: ConnectorValidationWarning[];
}

export interface ConnectorValidationError {
  field: string;
  message: string;
  code: string;
  severity: string;
}

export interface ConnectorValidationWarning {
  field: string;
  message: string;
  code: string;
  severity: string;
}

export interface ConnectorTemplate {
  id: string;
  name: string;
  description?: string;
  type: ConnectorType;
  protocol: ConnectorProtocol;
  config: Partial<ConnectorConfig>;
  auth?: Partial<ConnectorAuth>;
  mapping?: Partial<ConnectorMappingConfig>;
  validation?: Partial<ConnectorValidationConfig>;
  transformation?: Partial<ConnectorTransformationConfig>;
  export?: Partial<ConnectorExportConfig>;
  import?: Partial<ConnectorImportConfig>;
  monitoring?: Partial<ConnectorMonitoringConfig>;
  logging?: Partial<ConnectorLoggingConfig>;
  security?: Partial<ConnectorSecurityConfig>;
  credential?: Partial<ConnectorCredentialConfig>;
  version?: Partial<ConnectorVersionConfig>;
  deployment?: Partial<ConnectorDeploymentConfig>;
  tags?: string[];
  category?: string;
  author?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface ConnectorAudit {
  id: string;
  connectorId: string;
  action: string;
  performedBy: string;
  performedAt: string;
  changes?: Record<string, { before: unknown; after: unknown }>;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export interface ConnectorRateLimit {
  id: string;
  connectorId: string;
  limit: number;
  window: number;
  current: number;
  remaining: number;
  resetAt: string;
  policy?: string;
  headers?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorSecret {
  id: string;
  connectorId: string;
  name: string;
  type: SecretType;
  value: string;
  encrypted: boolean;
  expiresAt?: string;
  rotatedAt?: string;
  rotationEnabled?: boolean;
  rotationInterval?: number;
  metadata?: Record<string, unknown>;
}

export interface ConnectorEventPayload {
  id: string;
  connectorId: string;
  event: ConnectorEvent;
  timestamp: string;
  data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorCallback {
  id: string;
  connectorId: string;
  event: string;
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  timeout?: number;
  retryStrategy?: RetryStrategy;
  maxRetries?: number;
  enabled: boolean;
  metadata?: Record<string, unknown>;
}

export interface ConnectorBatch {
  id: string;
  connectorId: string;
  jobId: string;
  batchNumber: number;
  totalBatches: number;
  records: Record<string, unknown>[];
  status: string;
  startedAt: string;
  completedAt?: string;
  processedRecords?: number;
  failedRecords?: number;
  errors?: ConnectorSyncError[];
  metadata?: Record<string, unknown>;
}

export interface ConnectorCheckpoint {
  id: string;
  connectorId: string;
  jobId: string;
  position: string;
  timestamp: string;
  recordsProcessed: number;
  metadata?: Record<string, unknown>;
}

export interface ConnectorTransformation {
  id: string;
  name: string;
  description?: string;
  type: string;
  expression?: string;
  function?: string;
  params?: Record<string, unknown>;
  inputFields?: string[];
  outputFields?: string[];
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface ConnectorNotification {
  id: string;
  connectorId: string;
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

export interface ConnectorReport {
  id: string;
  connectorId: string;
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

export interface ConnectorSearch {
  query?: string;
  filters?: Record<string, unknown>;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  fields?: string[];
  metadata?: Record<string, unknown>;
}

export interface ConnectorSearchResult {
  items: DataConnector[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
  metadata?: Record<string, unknown>;
}

export interface ConnectorBulkOperation {
  id: string;
  operation: string;
  connectorIds: string[];
  status: string;
  startedAt: string;
  completedAt?: string;
  succeeded?: number;
  failed?: number;
  errors?: ConnectorSyncError[];
  metadata?: Record<string, unknown>;
}

export interface ConnectorCapability {
  name: string;
  description?: string;
  supported: boolean;
  version?: string;
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ConnectorSchema {
  id: string;
  name: string;
  version: string;
  format: string;
  schema: Record<string, unknown>;
  source?: string;
  metadata?: Record<string, unknown>;
}

export interface ConnectorTestResult {
  success: boolean;
  message: string;
  responseTime?: number;
  statusCode?: number;
  data?: Record<string, unknown>;
  errors?: ConnectorSyncError[];
  warnings?: ConnectorSyncWarning[];
  metadata?: Record<string, unknown>;
}

export interface ConnectorProfile {
  id: string;
  name: string;
  description?: string;
  type: ConnectorType;
  protocol: ConnectorProtocol;
  capabilities: ConnectorCapability[];
  config?: Partial<ConnectorConfig>;
  auth?: Partial<ConnectorAuth>;
  mapping?: Partial<ConnectorMappingConfig>;
  validation?: Partial<ConnectorValidationConfig>;
  transformation?: Partial<ConnectorTransformationConfig>;
  export?: Partial<ConnectorExportConfig>;
  import?: Partial<ConnectorImportConfig>;
  monitoring?: Partial<ConnectorMonitoringConfig>;
  logging?: Partial<ConnectorLoggingConfig>;
  security?: Partial<ConnectorSecurityConfig>;
  credential?: Partial<ConnectorCredentialConfig>;
  version?: Partial<ConnectorVersionConfig>;
  deployment?: Partial<ConnectorDeploymentConfig>;
  tags?: string[];
  category?: string;
  author?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface DataConnector {
  id: string;
  name: string;
  description?: string;
  type: ConnectorType;
  protocol: ConnectorProtocol;
  status: ConnectorStatus;
  schoolId: string;
  config: ConnectorConfig;
  auth?: ConnectorAuth;
  health?: ConnectorHealth;
  sync?: ConnectorSync;
  import?: ConnectorImport;
  export?: ConnectorExport;
  webhooks?: ConnectorWebhook[];
  retries?: ConnectorRetry[];
  logs?: ConnectorLog[];
  metrics?: ConnectorMetrics;
  mappings?: ConnectorMapping[];
  versions?: ConnectorVersionInfo[];
  secrets?: ConnectorSecret[];
  rateLimit?: ConnectorRateLimit;
  audit?: ConnectorAudit[];
  callbacks?: ConnectorCallback[];
  batches?: ConnectorBatch[];
  checkpoints?: ConnectorCheckpoint[];
  transformations?: ConnectorTransformation[];
  notifications?: ConnectorNotification[];
  reports?: ConnectorReport[];
  capabilities?: ConnectorCapability[];
  schemas?: ConnectorSchema[];
  profiles?: ConnectorProfile[];
  templates?: ConnectorTemplate[];
  tags?: string[];
  category?: string;
  environment?: string;
  region?: string;
  cluster?: string;
  namespace?: string;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  version?: string;
  enabled?: boolean;
  deletedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface ConnectorList {
  items: DataConnector[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ConnectorFilter {
  type?: ConnectorType;
  protocol?: ConnectorProtocol;
  status?: ConnectorStatus;
  schoolId?: string;
  tags?: string[];
  category?: string;
  environment?: string;
  region?: string;
  enabled?: boolean;
  search?: string;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// ENUMS
// ============================================================================

export enum StandardType {
  UNESCO = "UNESCO",
  UNICEF = "UNICEF",
  OCDE = "OCDE",
  WORLD_BANK = "WORLD_BANK",
  OPEN_BADGES = "OPEN_BADGES",
  EUROPASS = "EUROPASS",
  SCORM = "SCORM",
  XAPI = "XAPI",
  LTI = "LTI",
  IMS_GLOBAL = "IMS_GLOBAL",
  ED_FI = "ED_FI",
  EMIS = "EMIS",
  ONE_ROSTER = "ONE_ROSTER",
  OPENID_CONNECT = "OPENID_CONNECT",
  OAUTH2 = "OAUTH2",
  SAML = "SAML",
  LDAP = "LDAP",
  SCIM = "SCIM",
}

export enum ConnectorStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ERROR = "ERROR",
  SYNCING = "SYNCING",
  CONFIGURING = "CONFIGURING",
  DEPRECATED = "DEPRECATED",
}

export enum SyncDirection {
  INBOUND = "INBOUND",
  OUTBOUND = "OUTBOUND",
  BIDIRECTIONAL = "BIDIRECTIONAL",
}

export enum SyncMode {
  REALTIME = "REALTIME",
  PERIODIC = "PERIODIC",
  ON_DEMAND = "ON_DEMAND",
  EVENT_DRIVEN = "EVENT_DRIVEN",
  BATCH = "BATCH",
  WEBHOOK = "WEBHOOK",
}

export enum AuthProtocol {
  OAUTH2 = "OAUTH2",
  SAML = "SAML",
  OPENID_CONNECT = "OPENID_CONNECT",
  LDAP = "LDAP",
  API_KEY = "API_KEY",
  JWT = "JWT",
  MUTUAL_TLS = "MUTUAL_TLS",
  BASIC = "BASIC",
}

export enum DataFormat {
  JSON = "JSON",
  XML = "XML",
  CSV = "CSV",
  RDF = "RDF",
  SCORM = "SCORM",
  XAPI = "XAPI",
  LTI = "LTI",
  CUSTOM = "CUSTOM",
}

export enum MappingStrategy {
  DIRECT = "DIRECT",
  TRANSFORM = "TRANSFORM",
  AGGREGATE = "AGGREGATE",
  SPLIT = "SPLIT",
  FILTER = "FILTER",
  ENRICH = "ENRICH",
}

export enum ValidationLevel {
  STRICT = "STRICT",
  MODERATE = "MODERATE",
  LENIENT = "LENIENT",
  SKIP = "SKIP",
}

export enum ConflictResolution {
  LAST_WRITE = "LAST_WRITE",
  FIRST_WRITE = "FIRST_WRITE",
  MANUAL = "MANUAL",
  MERGE = "MERGE",
  REJECT = "REJECT",
  LOG = "LOG",
}

export enum RetryStrategy {
  NONE = "NONE",
  FIXED = "FIXED",
  EXPONENTIAL = "EXPONENTIAL",
  LINEAR = "LINEAR",
  CUSTOM = "CUSTOM",
}

export enum ErrorHandling {
  SKIP = "SKIP",
  RETRY = "RETRY",
  DEAD_LETTER = "DEAD_LETTER",
  ALERT = "ALERT",
  FAIL_FAST = "FAIL_FAST",
}

export enum ComplianceLevel {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  MINIMAL = "MINIMAL",
  CUSTOM = "CUSTOM",
}

export enum InteroperabilityLevel {
  L0_UNCONNECTED = "L0_UNCONNECTED",
  L1_CONNECTED = "L1_CONNECTED",
  L2_INTEGRATED = "L2_INTEGRATED",
  L3_INTEROPERABLE = "L3_INTEROPERABLE",
  L4_SEAMLESS = "L4_SEAMLESS",
}

export enum StandardVersion {
  V1 = "V1",
  V2 = "V2",
  V3 = "V3",
  LATEST = "LATEST",
  CUSTOM = "CUSTOM",
}

export enum TransformationType {
  MAP = "MAP",
  FILTER = "FILTER",
  AGGREGATE = "AGGREGATE",
  SPLIT = "SPLIT",
  ENRICH = "ENRICH",
  VALIDATE = "VALIDATE",
  ENCRYPT = "ENCRYPT",
  DECRYPT = "DECRYPT",
}

export enum ConnectorType {
  ADAPTER = "ADAPTER",
  BRIDGE = "BRIDGE",
  GATEWAY = "GATEWAY",
  PROXY = "PROXY",
  AGGREGATOR = "AGGREGATOR",
  ROUTER = "ROUTER",
}

export enum ProtocolType {
  REST = "REST",
  SOAP = "SOAP",
  GRAPHQL = "GRAPHQL",
  GRPC = "GRPC",
  WEBSOCKET = "WEBSOCKET",
  MQTT = "MQTT",
  AMQP = "AMQP",
  JMS = "JMS",
}

export enum SecurityLevel {
  NONE = "NONE",
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  HIGH = "HIGH",
  MAXIMUM = "MAXIMUM",
}

export enum CertificationStatus {
  CERTIFIED = "CERTIFIED",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  NOT_APPLICABLE = "NOT_APPLICABLE",
}

export enum InteropHealth {
  HEALTHY = "HEALTHY",
  DEGRADED = "DEGRADED",
  CRITICAL = "CRITICAL",
  OFFLINE = "OFFLINE",
  MAINTENANCE = "MAINTENANCE",
}

export enum DataMappingStatus {
  MAPPED = "MAPPED",
  PARTIAL = "PARTIAL",
  UNMAPPED = "UNMAPPED",
  ERROR = "ERROR",
  DEPRECATED = "DEPRECATED",
}

export enum SchemaVersion {
  V1 = "V1",
  V2 = "V2",
  V3 = "V3",
  LATEST = "LATEST",
  CUSTOM = "CUSTOM",
}

export enum ConnectorMode {
  PUSH = "PUSH",
  PULL = "PULL",
  PUB_SUB = "PUB_SUB",
  REQUEST_RESPONSE = "REQUEST_RESPONSE",
  STREAM = "STREAM",
}

export enum SyncFrequency {
  REALTIME = "REALTIME",
  EVERY_5_MIN = "EVERY_5_MIN",
  EVERY_15_MIN = "EVERY_15_MIN",
  EVERY_HOUR = "EVERY_HOUR",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export enum BatchSize {
  SMALL_100 = "SMALL_100",
  MEDIUM_1000 = "MEDIUM_1000",
  LARGE_10000 = "LARGE_10000",
  UNLIMITED = "UNLIMITED",
}

export enum CompressionType {
  NONE = "NONE",
  GZIP = "GZIP",
  ZIP = "ZIP",
  BROTLI = "BROTLI",
}

export enum EncryptionStandard {
  AES256 = "AES256",
  RSA2048 = "RSA2048",
  CUSTOM = "CUSTOM",
}

export enum AuthenticationLevel {
  ANONYMOUS = "ANONYMOUS",
  BASIC = "BASIC",
  MFA = "MFA",
  CERTIFICATE = "CERTIFICATE",
  HARDWARE_TOKEN = "HARDWARE_TOKEN",
}

export enum DataClassification {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
  TOP_SECRET = "TOP_SECRET",
}

export enum AuditLevel {
  NONE = "NONE",
  BASIC = "BASIC",
  DETAILED = "DETAILED",
  COMPREHENSIVE = "COMPREHENSIVE",
}

export enum MonitoringLevel {
  NONE = "NONE",
  BASIC = "BASIC",
  DETAILED = "DETAILED",
  COMPREHENSIVE = "COMPREHENSIVE",
  REAL_TIME = "REAL_TIME",
}

export enum AlertSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY",
}

export enum RateLimitUnit {
  PER_SECOND = "PER_SECOND",
  PER_MINUTE = "PER_MINUTE",
  PER_HOUR = "PER_HOUR",
  PER_DAY = "PER_DAY",
  PER_MONTH = "PER_MONTH",
}

export enum CacheStrategy {
  NONE = "NONE",
  IN_MEMORY = "IN_MEMORY",
  REDIS = "REDIS",
  MEMCACHED = "MEMCACHED",
  CDN = "CDN",
  HYBRID = "HYBRID",
}

export enum FallbackStrategy {
  NONE = "NONE",
  CACHE = "CACHE",
  STUB = "STUB",
  QUEUE = "QUEUE",
  REDIRECT = "REDIRECT",
}

export enum LoadBalancing {
  ROUND_ROBIN = "ROUND_ROBIN",
  LEAST_CONNECTIONS = "LEAST_CONNECTIONS",
  WEIGHTED = "WEIGHTED",
  IP_HASH = "IP_HASH",
  GEO = "GEO",
}

export enum HealthCheckType {
  HTTP = "HTTP",
  TCP = "TCP",
  GRPC = "GRPC",
  SCRIPT = "SCRIPT",
  PLUGIN = "PLUGIN",
}

export enum FailoverMode {
  NONE = "NONE",
  AUTOMATIC = "AUTOMATIC",
  MANUAL = "MANUAL",
  HYBRID = "HYBRID",
}

export enum VersionStrategy {
  HEADER = "HEADER",
  QUERY = "QUERY",
  PATH = "PATH",
  CONTENT_NEGOTIATION = "CONTENT_NEGOTIATION",
}

// ============================================================================
// INTERFACES
// ============================================================================

export interface UNESCOConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.UNESCO;
  status: ConnectorStatus;
  apiEndpoint: string;
  apiKey: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface UNICEFConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.UNICEF;
  status: ConnectorStatus;
  apiEndpoint: string;
  apiKey: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface OCDEConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.OCDE;
  status: ConnectorStatus;
  apiEndpoint: string;
  apiKey: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface WorldBankConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.WORLD_BANK;
  status: ConnectorStatus;
  apiEndpoint: string;
  apiKey: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface OpenBadgesConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.OPEN_BADGES;
  status: ConnectorStatus;
  issuerUrl: string;
  badgeClassUrl: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface EuropassConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.EUROPASS;
  status: ConnectorStatus;
  apiEndpoint: string;
  credentials: EuropassCredentials;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface SCORMConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.SCORM;
  status: ConnectorStatus;
  version: string;
  manifestUrl: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface XAPIConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.XAPI;
  status: ConnectorStatus;
  lrsEndpoint: string;
  lrsAuth: AuthConfig;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface LTIConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.LTI;
  status: ConnectorStatus;
  issuer: string;
  clientId: string;
  deploymentId: string;
  keySetUrl: string;
  authTokenUrl: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface IMSGlobalConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.IMS_GLOBAL;
  status: ConnectorStatus;
  certificationId: string;
  apiEndpoint: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface EdFiConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.ED_FI;
  status: ConnectorStatus;
  odsUrl: string;
  clientKey: string;
  clientSecret: string;
  namespace: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface EMISConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.EMIS;
  status: ConnectorStatus;
  apiEndpoint: string;
  countryCode: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface OneRosterConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.ONE_ROSTER;
  status: ConnectorStatus;
  apiEndpoint: string;
  clientId: string;
  clientSecret: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface OpenIDConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.OPENID_CONNECT;
  status: ConnectorStatus;
  issuer: string;
  clientId: string;
  clientSecret: string;
  discoveryUrl: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface OAuth2Connector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.OAUTH2;
  status: ConnectorStatus;
  authorizationUrl: string;
  tokenUrl: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface SAMLConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.SAML;
  status: ConnectorStatus;
  idpMetadataUrl: string;
  spEntityId: string;
  acsUrl: string;
  certificate: string;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface LDAPConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.LDAP;
  status: ConnectorStatus;
  host: string;
  port: number;
  baseDn: string;
  bindDn: string;
  bindPassword: string;
  useSsl: boolean;
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface SCIMConnector {
  id: string;
  schoolId: string;
  name: string;
  standard: StandardType.SCIM;
  status: ConnectorStatus;
  apiEndpoint: string;
  bearerToken: string;
  supportedSchemas: string[];
  dataMapping: DataMapping[];
  syncConfig: SyncConfig;
  metadata: ConnectorMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectorConfig {
  id: string;
  connectorId: string;
  schoolId: string;
  protocol: ProtocolType;
  endpoint: string;
  authentication: AuthConfig;
  security: SecurityConfig;
  retry: RetryConfig;
  timeout: TimeoutConfig;
  rateLimit: RateLimitConfig;
  cache: CacheConfig;
  compression: CompressionType;
  version: string;
  customHeaders: Record<string, string>;
  customParams: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectorState {
  id: string;
  connectorId: string;
  status: ConnectorStatus;
  health: InteropHealth;
  lastSyncAt: string | null;
  nextSyncAt: string | null;
  syncCount: number;
  errorCount: number;
  recordCount: number;
  uptime: number;
  version: string;
  metadata: Record<string, unknown>;
  updatedAt: string;
}

export interface ConnectorHealth {
  id: string;
  connectorId: string;
  status: InteropHealth;
  latencyMs: number;
  throughputPerSec: number;
  errorRate: number;
  lastCheckAt: string;
  details: HealthCheckDetail[];
  metadata: Record<string, unknown>;
}

export interface HealthCheckDetail {
  name: string;
  type: HealthCheckType;
  status: InteropHealth;
  latencyMs: number;
  message: string;
  lastCheckedAt: string;
}

export interface ConnectorMetrics {
  id: string;
  connectorId: string;
  schoolId: string;
  totalSyncs: number;
  successfulSyncs: number;
  failedSyncs: number;
  avgSyncDurationMs: number;
  totalRecordsSynced: number;
  totalErrors: number;
  uptimePercent: number;
  avgLatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  dataVolumeBytes: number;
  period: string;
  recordedAt: string;
}

export interface SyncJob {
  id: string;
  connectorId: string;
  schoolId: string;
  direction: SyncDirection;
  mode: SyncMode;
  status: ConnectorStatus;
  startedAt: string;
  completedAt: string | null;
  durationMs: number | null;
  recordsProcessed: number;
  recordsCreated: number;
  recordsUpdated: number;
  recordsDeleted: number;
  recordsSkipped: number;
  errorCount: number;
  errors: SyncError[];
  metadata: Record<string, unknown>;
}

export interface SyncError {
  code: string;
  message: string;
  recordId: string | null;
  field: string | null;
  severity: AlertSeverity;
  timestamp: string;
}

export interface SyncStatus {
  connectorId: string;
  lastSyncAt: string | null;
  nextSyncAt: string | null;
  isRunning: boolean;
  currentJobId: string | null;
  queueLength: number;
  avgDurationMs: number;
  successRate: number;
}

export interface SyncLog {
  id: string;
  connectorId: string;
  jobId: string;
  level: AlertSeverity;
  message: string;
  details: Record<string, unknown>;
  timestamp: string;
}

export interface SyncMapping {
  id: string;
  connectorId: string;
  sourceField: string;
  targetField: string;
  strategy: MappingStrategy;
  transform: DataTransform | null;
  defaultValue: string | null;
  isRequired: boolean;
  validation: DataValidation | null;
  createdAt: string;
  updatedAt: string;
}

export interface SyncConfig {
  direction: SyncDirection;
  mode: SyncMode;
  frequency: SyncFrequency;
  batchSize: BatchSize;
  conflictResolution: ConflictResolution;
  retryStrategy: RetryStrategy;
  errorHandling: ErrorHandling;
  mappings: SyncMapping[];
  filters: SyncFilter[];
  schedule: string | null;
  enabled: boolean;
}

export interface SyncFilter {
  field: string;
  operator: string;
  value: string;
  logicalOperator: "AND" | "OR";
}

export interface DataMapping {
  id: string;
  connectorId: string;
  sourceField: string;
  targetField: string;
  dataType: string;
  strategy: MappingStrategy;
  transform: DataTransform | null;
  defaultValue: string | null;
  isRequired: boolean;
  status: DataMappingStatus;
  validation: DataValidation | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DataTransform {
  id: string;
  mappingId: string;
  type: TransformationType;
  expression: string;
  parameters: Record<string, unknown>;
  outputType: string;
  description: string;
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface DataValidation {
  id: string;
  mappingId: string;
  level: ValidationLevel;
  rules: ValidationRule[];
  customValidator: string | null;
  onError: ErrorHandling;
  createdAt: string;
  updatedAt: string;
}

export interface ValidationRule {
  name: string;
  type: string;
  parameters: Record<string, unknown>;
  message: string;
  severity: AlertSeverity;
}

export interface DataEnrichment {
  id: string;
  connectorId: string;
  sourceField: string;
  enrichmentType: string;
  provider: string;
  config: Record<string, unknown>;
  outputField: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthConfig {
  protocol: AuthProtocol;
  credentials: AuthCredentials;
  tokenEndpoint: string | null;
  refreshToken: string | null;
  tokenExpiry: number | null;
  scopes: string[];
  clientId: string | null;
  clientSecret: string | null;
  certificate: string | null;
  customHeaders: Record<string, string>;
}

export interface AuthCredentials {
  type: AuthProtocol;
  apiKey: string | null;
  username: string | null;
  password: string | null;
  bearerToken: string | null;
  clientCert: string | null;
  clientKey: string | null;
}

export interface AuthToken {
  id: string;
  connectorId: string;
  tokenType: string;
  accessToken: string;
  refreshToken: string | null;
  expiresAt: string;
  scopes: string[];
  issuedAt: string;
  isRevoked: boolean;
}

export interface AuthAudit {
  id: string;
  connectorId: string;
  event: string;
  protocol: AuthProtocol;
  success: boolean;
  ipAddress: string;
  userAgent: string;
  details: Record<string, unknown>;
  timestamp: string;
}

export interface AuthRefresh {
  id: string;
  connectorId: string;
  tokenId: string;
  status: string;
  attempts: number;
  lastAttemptAt: string;
  nextAttemptAt: string | null;
  error: string | null;
}

export interface WebhookConfig {
  id: string;
  connectorId: string;
  schoolId: string;
  url: string;
  secret: string;
  events: string[];
  headers: Record<string, string>;
  retryStrategy: RetryStrategy;
  maxRetries: number;
  timeoutMs: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookEvent {
  id: string;
  webhookId: string;
  type: string;
  payload: Record<string, unknown>;
  source: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface WebhookDelivery {
  id: string;
  eventId: string;
  webhookId: string;
  status: ConnectorStatus;
  attempt: number;
  requestHeaders: Record<string, string>;
  requestBody: string;
  responseStatus: number | null;
  responseBody: string | null;
  durationMs: number;
  error: string | null;
  createdAt: string;
}

export interface WebhookRetry {
  id: string;
  deliveryId: string;
  attempt: number;
  status: ConnectorStatus;
  scheduledAt: string;
  executedAt: string | null;
  error: string | null;
}

export interface SchemaMapping {
  id: string;
  connectorId: string;
  sourceSchema: DataSchema;
  targetSchema: DataSchema;
  fieldMappings: FieldMapping[];
  transforms: DataTransform[];
  createdAt: string;
  updatedAt: string;
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  sourceType: string;
  targetType: string;
  strategy: MappingStrategy;
  transform: DataTransform | null;
  isRequired: boolean;
}

export interface SchemaValidation {
  id: string;
  schemaId: string;
  level: ValidationLevel;
  rules: ValidationRule[];
  enabled: boolean;
}

export interface SchemaTransform {
  id: string;
  sourceSchemaId: string;
  targetSchemaId: string;
  type: TransformationType;
  expression: string;
  parameters: Record<string, unknown>;
}

export interface SchemaVersionEntry {
  id: string;
  schemaId: string;
  version: string;
  schema: DataSchema;
  changelog: string;
  createdBy: string;
  createdAt: string;
}

export interface ConnectorPipeline {
  id: string;
  connectorId: string;
  schoolId: string;
  name: string;
  stages: ConnectorStage[];
  status: ConnectorStatus;
  currentStage: number;
  startedAt: string;
  completedAt: string | null;
  metadata: Record<string, unknown>;
}

export interface ConnectorStage {
  id: string;
  pipelineId: string;
  name: string;
  type: string;
  order: number;
  status: ConnectorStatus;
  config: Record<string, unknown>;
  inputSchema: string | null;
  outputSchema: string | null;
  startedAt: string;
  completedAt: string | null;
  durationMs: number | null;
}

export interface ConnectorRun {
  id: string;
  connectorId: string;
  pipelineId: string | null;
  status: ConnectorStatus;
  trigger: string;
  startedAt: string;
  completedAt: string | null;
  durationMs: number | null;
  inputCount: number;
  outputCount: number;
  errorCount: number;
  errors: SyncError[];
  metadata: Record<string, unknown>;
}

export interface ConnectorMetric {
  id: string;
  connectorId: string;
  name: string;
  value: number;
  unit: string;
  tags: Record<string, string>;
  timestamp: string;
}

export interface InteropAudit {
  id: string;
  schoolId: string;
  connectorId: string | null;
  action: string;
  actor: string;
  actorRole: string;
  resource: string;
  resourceId: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  outcome: string;
  timestamp: string;
}

export interface InteropCompliance {
  id: string;
  schoolId: string;
  connectorId: string;
  standard: StandardType;
  level: ComplianceLevel;
  certificationStatus: CertificationStatus;
  certificationId: string | null;
  certifiedAt: string | null;
  expiresAt: string | null;
  requirements: ComplianceRequirement[];
  score: number;
  lastAuditAt: string;
  nextAuditAt: string;
  metadata: Record<string, unknown>;
}

export interface ComplianceRequirement {
  name: string;
  description: string;
  status: string;
  evidence: string | null;
  assessedAt: string | null;
}

export interface InteropSecurity {
  id: string;
  connectorId: string;
  schoolId: string;
  securityLevel: SecurityLevel;
  encryptionStandard: EncryptionStandard;
  authenticationLevel: AuthenticationLevel;
  dataClassification: DataClassification;
  certificates: SecurityCertificate[];
  lastSecurityScanAt: string;
  vulnerabilities: SecurityVulnerability[];
  complianceStatus: string;
  metadata: Record<string, unknown>;
}

export interface SecurityCertificate {
  id: string;
  type: string;
  fingerprint: string;
  issuedAt: string;
  expiresAt: string;
  issuer: string;
  isRevoked: boolean;
}

export interface SecurityVulnerability {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  cveId: string | null;
  detectedAt: string;
  resolvedAt: string | null;
  status: string;
}

export interface InteropHealthCheck {
  id: string;
  connectorId: string;
  schoolId: string;
  status: InteropHealth;
  latencyMs: number;
  throughputPerSec: number;
  errorRate: number;
  checks: HealthCheckDetail[];
  lastCheckedAt: string;
  metadata: Record<string, unknown>;
}

export interface ConnectorTemplate {
  id: string;
  name: string;
  standard: StandardType;
  connectorType: ConnectorType;
  protocol: ProtocolType;
  description: string;
  version: string;
  config: Record<string, unknown>;
  defaultMappings: DataMapping[];
  requiredFields: string[];
  optionalFields: string[];
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectorPreset {
  id: string;
  templateId: string;
  name: string;
  description: string;
  config: ConnectorPresetConfig;
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectorPresetConfig {
  protocol: ProtocolType;
  auth: AuthConfig;
  sync: SyncConfig;
  security: SecurityConfig;
  rateLimit: RateLimitConfig;
  retry: RetryConfig;
  timeout: TimeoutConfig;
  cache: CacheConfig;
  compression: CompressionType;
  customSettings: Record<string, unknown>;
}

export interface ConnectorHistory {
  id: string;
  connectorId: string;
  action: string;
  changes: Record<string, { old: unknown; new: unknown }>;
  performedBy: string;
  performedAt: string;
  reason: string | null;
}

export interface APIContract {
  id: string;
  connectorId: string;
  name: string;
  version: string;
  protocol: ProtocolType;
  endpoints: APIEndpoint[];
  schemas: APISchema[];
  security: SecurityConfig;
  rateLimit: RateLimitConfig;
  createdAt: string;
  updatedAt: string;
}

export interface APIEndpoint {
  id: string;
  contractId: string;
  path: string;
  method: string;
  description: string;
  parameters: APIParameter[];
  requestBody: APISchema | null;
  responses: APIResponse[];
  security: SecurityLevel;
  rateLimit: RateLimitConfig | null;
  deprecated: boolean;
}

export interface APIParameter {
  name: string;
  in: string;
  type: string;
  required: boolean;
  description: string;
  schema: Record<string, unknown>;
}

export interface APIResponse {
  statusCode: number;
  description: string;
  schema: APISchema | null;
}

export interface APISchema {
  id: string;
  name: string;
  version: string;
  type: string;
  schema: Record<string, unknown>;
  examples: Record<string, unknown>[];
}

export interface APIVersionEntry {
  id: string;
  contractId: string;
  version: string;
  status: string;
  changelog: string;
  releasedAt: string;
  deprecatedAt: string | null;
  sunsetAt: string | null;
}

export interface DataContract {
  id: string;
  connectorId: string;
  name: string;
  description: string;
  version: string;
  schemas: DataSchema[];
  validations: DataValidation[];
  quality: DataQuality;
  createdAt: string;
  updatedAt: string;
}

export interface DataSchema {
  id: string;
  name: string;
  version: string;
  type: string;
  fields: DataSchemaField[];
  relationships: DataSchemaRelationship[];
  indexes: string[];
  constraints: Record<string, unknown>;
}

export interface DataSchemaField {
  name: string;
  type: string;
  required: boolean;
  nullable: boolean;
  defaultValue: unknown;
  description: string;
  format: string | null;
  constraints: Record<string, unknown>;
}

export interface DataSchemaRelationship {
  type: string;
  target: string;
  foreignKey: string;
  onDelete: string;
}

export interface DataQuality {
  score: number;
  completeness: number;
  accuracy: number;
  consistency: number;
  timeliness: number;
  validity: number;
  lastAssessedAt: string;
  issues: DataQualityIssue[];
}

export interface DataQualityIssue {
  field: string;
  type: string;
  severity: AlertSeverity;
  count: number;
  description: string;
  detectedAt: string;
}

export interface FederationConfig {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: string;
  participants: FederationParticipant[];
  mappings: FederationMapping[];
  syncConfig: SyncConfig;
  security: SecurityConfig;
  status: ConnectorStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FederationParticipant {
  id: string;
  name: string;
  connectorId: string;
  role: string;
  status: ConnectorStatus;
  joinedAt: string;
  metadata: Record<string, unknown>;
}

export interface FederationMapping {
  id: string;
  federationId: string;
  sourceParticipantId: string;
  targetParticipantId: string;
  sourceField: string;
  targetField: string;
  strategy: MappingStrategy;
  transform: DataTransform | null;
  createdAt: string;
  updatedAt: string;
}

export interface FederationSync {
  id: string;
  federationId: string;
  status: ConnectorStatus;
  startedAt: string;
  completedAt: string | null;
  participantsSynced: number;
  totalParticipants: number;
  recordsProcessed: number;
  errors: SyncError[];
}

export interface FederationAudit {
  id: string;
  federationId: string;
  action: string;
  actor: string;
  participantId: string | null;
  details: Record<string, unknown>;
  timestamp: string;
}

export interface ConnectorPlugin {
  id: string;
  name: string;
  version: string;
  description: string;
  connectorType: ConnectorType;
  entryPoint: string;
  config: Record<string, unknown>;
  dependencies: string[];
  enabled: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectorExtension {
  id: string;
  pluginId: string;
  name: string;
  type: string;
  hook: string;
  handler: string;
  priority: number;
  config: Record<string, unknown>;
  enabled: boolean;
}

export interface ConnectorMiddleware {
  id: string;
  connectorId: string;
  name: string;
  type: string;
  position: "PRE" | "POST" | "ERROR";
  handler: string;
  config: Record<string, unknown>;
  enabled: boolean;
  order: number;
}

export interface RateLimitConfig {
  enabled: boolean;
  maxRequests: number;
  windowMs: number;
  unit: RateLimitUnit;
  strategy: string;
  keyExtractor: string | null;
  onLimitReached: ErrorHandling;
  burstSize: number | null;
}

export interface CacheConfig {
  strategy: CacheStrategy;
  ttlMs: number;
  maxSize: number | null;
  keyPrefix: string;
  invalidateOn: string[];
  compression: CompressionType;
  serializer: string;
}

export interface RetryConfig {
  strategy: RetryStrategy;
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  retryableErrors: string[];
  jitter: boolean;
}

export interface TimeoutConfig {
  connectionMs: number;
  requestMs: number;
  responseMs: number;
  idleMs: number;
  onTimeout: ErrorHandling;
}

export interface FailoverConfig {
  mode: FailoverMode;
  primaryConnectorId: string;
  fallbackConnectorIds: string[];
  healthCheckIntervalMs: number;
  failureThreshold: number;
  recoveryThreshold: number;
  cooldownMs: number;
}

export interface CircuitBreakerConfig {
  enabled: boolean;
  failureThreshold: number;
  successThreshold: number;
  timeoutMs: number;
  halfOpenMaxAttempts: number;
  onOpen: ErrorHandling;
}

export interface BulkheadConfig {
  enabled: boolean;
  maxConcurrent: number;
  maxQueued: number;
  queueTimeoutMs: number;
  onReject: ErrorHandling;
}

export interface MonitoringConfig {
  level: MonitoringLevel;
  metricsEnabled: boolean;
  metricsIntervalMs: number;
  tracingEnabled: boolean;
  tracingSampleRate: number;
  healthCheckEnabled: boolean;
  healthCheckIntervalMs: number;
  dashboardEnabled: boolean;
  alertsEnabled: boolean;
}

export interface AlertingConfig {
  enabled: boolean;
  channels: AlertChannel[];
  rules: AlertRule[];
  escalationPolicy: EscalationPolicy;
  cooldownMs: number;
  aggregationWindowMs: number;
}

export interface AlertChannel {
  id: string;
  type: string;
  name: string;
  config: Record<string, unknown>;
  enabled: boolean;
}

export interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: string;
  threshold: number;
  severity: AlertSeverity;
  duration: number;
  channels: string[];
  enabled: boolean;
}

export interface EscalationPolicy {
  id: string;
  name: string;
  steps: EscalationStep[];
}

export interface EscalationStep {
  delayMs: number;
  channels: string[];
  repeatUntilAck: boolean;
}

export interface LoggingConfig {
  level: string;
  format: string;
  output: string[];
  rotationEnabled: boolean;
  maxSizeMb: number;
  maxFiles: number;
  sensitiveFields: string[];
}

export interface TracingConfig {
  enabled: boolean;
  samplerType: string;
  samplerParam: number;
  propagator: string;
  exporterEndpoint: string;
  attributes: Record<string, string>;
}

export interface ComplianceConfig {
  level: ComplianceLevel;
  standards: StandardType[];
  auditFrequency: string;
  retentionDays: number;
  requireEncryption: boolean;
  requireAuthentication: boolean;
  dataResidency: string;
  gdprCompliant: boolean;
  ferpaCompliant: boolean;
  coppaCompliant: boolean;
}

export interface AuditConfig {
  level: AuditLevel;
  events: string[];
  retentionDays: number;
  storage: string;
  encryptAuditLogs: boolean;
  realTimeStreaming: boolean;
  includeRequestBody: boolean;
  includeResponseBody: boolean;
}

export interface SecurityConfig {
  level: SecurityLevel;
  encryption: EncryptionStandard;
  authentication: AuthenticationLevel;
  dataClassification: DataClassification;
  tlsVersion: string;
  certificatePinning: boolean;
  ipWhitelist: string[];
  corsOrigins: string[];
  csrfProtection: boolean;
  xssProtection: boolean;
  contentSecurityPolicy: string;
}

export interface EncryptionConfig {
  standard: EncryptionStandard;
  keyId: string;
  keyRotationDays: number;
  encryptAtRest: boolean;
  encryptInTransit: boolean;
  envelopeEncryption: boolean;
  kmsEndpoint: string | null;
}

export interface TransformationConfig {
  type: TransformationType;
  engine: string;
  expressionLanguage: string;
  maxExecutionMs: number;
  memoryLimitMb: number;
  loggingEnabled: boolean;
  metricsEnabled: boolean;
}

export interface MappingConfig {
  strategy: MappingStrategy;
  autoDetect: boolean;
  caseSensitive: boolean;
  defaultNullValue: string | null;
  maxDepth: number;
  flattenArrays: boolean;
  preserveUnknown: boolean;
}

export interface EnrichmentConfig {
  providers: EnrichmentProvider[];
  batchSize: number;
  cacheEnabled: boolean;
  cacheTtlMs: number;
  fallbackOnFailure: boolean;
}

export interface EnrichmentProvider {
  name: string;
  type: string;
  endpoint: string;
  auth: AuthConfig;
  fields: string[];
  priority: number;
}

export interface ConnectorDashboard {
  id: string;
  schoolId: string;
  name: string;
  widgets: DashboardWidget[];
  layout: DashboardLayout;
  refreshIntervalMs: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardWidget {
  id: string;
  dashboardId: string;
  type: string;
  title: string;
  query: string;
  config: Record<string, unknown>;
  position: WidgetPosition;
  size: WidgetSize;
}

export interface WidgetPosition {
  x: number;
  y: number;
  col: number;
  row: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}

export interface DashboardLayout {
  columns: number;
  rowHeight: number;
  padding: number;
  compactMode: boolean;
}

export interface ConnectorReport {
  id: string;
  schoolId: string;
  type: string;
  title: string;
  period: string;
  data: ReportData;
  generatedAt: string;
  generatedBy: string;
  format: string;
  fileUrl: string | null;
}

export interface ReportData {
  summary: ReportSummary;
  details: ReportDetail[];
  charts: ReportChart[];
}

export interface ReportSummary {
  totalConnectors: number;
  activeConnectors: number;
  failedConnectors: number;
  totalSyncs: number;
  successRate: number;
  avgLatencyMs: number;
  totalRecordsSynced: number;
  totalErrors: number;
}

export interface ReportDetail {
  connectorId: string;
  connectorName: string;
  standard: StandardType;
  status: ConnectorStatus;
  syncs: number;
  records: number;
  errors: number;
  latencyMs: number;
}

export interface ReportChart {
  type: string;
  title: string;
  data: Record<string, unknown>;
}

export interface ConnectorAnalytics {
  id: string;
  schoolId: string;
  connectorId: string | null;
  period: string;
  metrics: AnalyticsMetrics;
  trends: AnalyticsTrend[];
  insights: AnalyticsInsight[];
  generatedAt: string;
}

export interface AnalyticsMetrics {
  totalSyncs: number;
  successfulSyncs: number;
  failedSyncs: number;
  avgDurationMs: number;
  p50DurationMs: number;
  p95DurationMs: number;
  p99DurationMs: number;
  totalRecords: number;
  dataVolumeBytes: number;
  errorRate: number;
  uptimePercent: number;
}

export interface AnalyticsTrend {
  metric: string;
  direction: string;
  changePercent: number;
  period: string;
}

export interface AnalyticsInsight {
  type: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  recommendation: string;
  detectedAt: string;
}

export interface ConnectorAI {
  id: string;
  connectorId: string;
  schoolId: string;
  modelId: string;
  status: string;
  config: ConnectorAIConfig;
  lastRunAt: string;
  nextRunAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectorAIConfig {
  task: string;
  inputFields: string[];
  outputField: string;
  parameters: Record<string, unknown>;
  schedule: string | null;
  autoApply: boolean;
}

export interface ConnectorAIModel {
  id: string;
  name: string;
  provider: string;
  version: string;
  type: string;
  capabilities: string[];
  costPer1kTokens: number;
  maxTokens: number;
  contextWindow: number;
  enabled: boolean;
}

export interface ConnectorAIInsight {
  id: string;
  aiId: string;
  type: string;
  title: string;
  description: string;
  confidence: number;
  impact: AlertSeverity;
  recommendation: string;
  autoImplementable: boolean;
  createdAt: string;
}

export interface ConnectorEvent {
  id: string;
  connectorId: string;
  schoolId: string;
  type: ConnectorEventType;
  source: ConnectorEventSource;
  payload: Record<string, unknown>;
  severity: AlertSeverity;
  processed: boolean;
  processedAt: string | null;
  createdAt: string;
}

export enum ConnectorEventType {
  SYNC_STARTED = "SYNC_STARTED",
  SYNC_COMPLETED = "SYNC_COMPLETED",
  SYNC_FAILED = "SYNC_FAILED",
  CONFIG_CHANGED = "CONFIG_CHANGED",
  STATUS_CHANGED = "STATUS_CHANGED",
  HEALTH_CHECK = "HEALTH_CHECK",
  ALERT_TRIGGERED = "ALERT_TRIGGERED",
  DATA_RECEIVED = "DATA_RECEIVED",
  DATA_SENT = "DATA_SENT",
  ERROR_OCCURRED = "ERROR_OCCURRED",
  AUTH_EXPIRED = "AUTH_EXPIRED",
  RATE_LIMITED = "RATE_LIMITED",
  SCHEMA_CHANGED = "SCHEMA_CHANGED",
  CERTIFICATE_EXPIRING = "CERTIFICATE_EXPIRING",
}

export enum ConnectorEventSource {
  CONNECTOR = "CONNECTOR",
  SYNC_ENGINE = "SYNC_ENGINE",
  MONITORING = "MONITORING",
  SCHEDULER = "SCHEDULER",
  WEBHOOK = "WEBHOOK",
  API = "API",
  USER = "USER",
  SYSTEM = "SYSTEM",
}

export interface EuropassCredentials {
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  scope: string[];
}

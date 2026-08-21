export enum APIStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DEPRECATED = 'DEPRECATED',
  RETIRED = 'RETIRED',
  BETA = 'BETA',
  ALPHA = 'ALPHA',
  DRAFT = 'DRAFT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
  ARCHIVED = 'ARCHIVED',
  SUSPENDED = 'SUSPENDED',
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED',
  RATE_LIMITED = 'RATE_LIMITED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  MAINTENANCE = 'MAINTENANCE',
  ERROR = 'ERROR',
  UNKNOWN = 'UNKNOWN'
}

export enum APIVersionStatus {
  ACTIVE = 'ACTIVE',
  DEPRECATED = 'DEPRECATED',
  RETIRED = 'RETIRED',
  SUNSET = 'SUNSET',
  BETA = 'BETA',
  ALPHA = 'ALPHA',
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  UNKNOWN = 'UNKNOWN'
}

export enum APIProtocol {
  REST = 'REST',
  SOAP = 'SOAP',
  GRAPHQL = 'GRAPHQL',
  GRPC = 'GRPC',
  WEBSOCKET = 'WEBSOCKET',
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
  ODATA = 'ODATA',
  SCIM = 'SCIM',
  WEBHOOK = 'WEBHOOK',
  EVENT = 'EVENT',
  MESSAGE_QUEUE = 'MESSAGE_QUEUE',
  STREAM = 'STREAM',
  BATCH = 'BATCH',
  OTHER = 'OTHER'
}

export enum ConsumerType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
  PARTNER = 'PARTNER',
  PUBLIC = 'PUBLIC',
  CONFIDENTIAL = 'CONFIDENTIAL',
  RESTRICTED = 'RESTRICTED',
  INSTITUTION = 'INSTITUTION',
  GOVERNMENT = 'GOVERNMENT',
  VENDOR = 'VENDOR',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  ADMIN = 'ADMIN',
  SYSTEM = 'SYSTEM',
  CUSTOM = 'CUSTOM'
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  SUSPENDED_BY_PROVIDER = 'SUSPENDED_BY_PROVIDER',
  SUSPENDED_BY_CONSUMER = 'SUSPENDED_BY_CONSUMER',
  RATE_LIMITED = 'RATE_LIMITED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  REVOKED = 'REVOKED',
  UNKNOWN = 'UNKNOWN'
}

export enum KeyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  SUSPENDED = 'SUSPENDED',
  COMPROMISED = 'COMPROMISED',
  ROTATED = 'ROTATED',
  PENDING_ROTATION = 'PENDING_ROTATION',
  UNKNOWN = 'UNKNOWN'
}

export enum OAuthStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
  REVOKED = 'REVOKED',
  EXPIRED = 'EXPIRED',
  UNKNOWN = 'UNKNOWN'
}

export enum ScopeType {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  ADMIN = 'ADMIN',
  EXECUTE = 'EXECUTE',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  READ_WRITE = 'READ_WRITE',
  FULL_ACCESS = 'FULL_ACCESS',
  CUSTOM = 'CUSTOM'
}

export enum QuotaType {
  REQUESTS = 'REQUESTS',
  RECORDS = 'RECORDS',
  BYTES = 'BYTES',
  USERS = 'USERS',
  INSTITUTIONS = 'INSTITUTIONS',
  STORAGE = 'STORAGE',
  BANDWIDTH = 'BANDWIDTH',
  COMPUTE = 'COMPUTE',
  API_CALLS = 'API_CALLS',
  WEBHOOKS = 'WEBHOOKS',
  JOBS = 'JOBS',
  CONCURRENT = 'CONCURRENT',
  CUSTOM = 'CUSTOM'
}

export enum RateLimitType {
  FIXED_WINDOW = 'FIXED_WINDOW',
  SLIDING_WINDOW = 'SLIDING_WINDOW',
  TOKEN_BUCKET = 'TOKEN_BUCKET',
  LEAKY_BUCKET = 'LEAKY_BUCKET',
  CONCURRENT = 'CONCURRENT',
  PER_USER = 'PER_USER',
  PER_IP = 'PER_IP',
  PER_API_KEY = 'PER_API_KEY',
  PER_ENDPOINT = 'PER_ENDPOINT',
  CUSTOM = 'CUSTOM'
}

export enum APIHealthStatus {
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
  OTHER = 'OTHER'
}

export enum DocumentationFormat {
  OPENAPI = 'OPENAPI',
  SWAGGER = 'SWAGGER',
  RAML = 'RAML',
  API_BLUEPRINT = 'API_BLUEPRINT',
  WSDL = 'WSDL',
  GRAPHQL_SDL = 'GRAPHQL_SDL',
  MARKDOWN = 'MARKDOWN',
  HTML = 'HTML',
  PDF = 'PDF',
  POSTMAN = 'POSTMAN',
  INSOMNIA = 'INSOMNIA',
  CUSTOM = 'CUSTOM'
}

export enum DiscoveryStatus {
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
  DRAFT = 'DRAFT',
  DEPRECATED = 'DEPRECATED',
  RETIRED = 'RETIRED',
  BETA = 'BETA',
  ALPHA = 'ALPHA',
  RESTRICTED = 'RESTRICTED',
  INTERNAL = 'INTERNAL',
  UNKNOWN = 'UNKNOWN'
}

export enum APIKeyType {
  PRODUCTION = 'PRODUCTION',
  SANDBOX = 'SANDBOX',
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  STAGING = 'STAGING',
  PREVIEW = 'PREVIEW',
  CUSTOM = 'CUSTOM'
}

export enum OAuthGrantType {
  AUTHORIZATION_CODE = 'AUTHORIZATION_CODE',
  CLIENT_CREDENTIALS = 'CLIENT_CREDENTIALS',
  IMPLICIT = 'IMPLICIT',
  PASSWORD = 'PASSWORD',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  DEVICE_CODE = 'DEVICE_CODE',
  CUSTOM = 'CUSTOM'
}

export enum OAuthResponseType {
  CODE = 'CODE',
  TOKEN = 'TOKEN',
  ID_TOKEN = 'ID_TOKEN',
  CUSTOM = 'CUSTOM'
}

export enum APICategory {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  ADMIN = 'ADMIN',
  INSTITUTION = 'INSTITUTION',
  ACADEMIC = 'ACADEMIC',
  ENROLLMENT = 'ENROLLMENT',
  GRADES = 'GRADES',
  ATTENDANCE = 'ATTENDANCE',
  EXAMS = 'EXAMS',
  PAYMENTS = 'PAYMENTS',
  REPORTS = 'REPORTS',
  COMMUNICATION = 'COMMUNICATION',
  DOCUMENTS = 'DOCUMENTS',
  TRANSPORT = 'TRANSPORT',
  LIBRARY = 'LIBRARY',
  HEALTH = 'HEALTH',
  DISCIPLINE = 'DISCIPLINE',
  CERTIFICATIONS = 'CERTIFICATIONS',
  CREDENTIALS = 'CREDENTIALS',
  MOBILITY = 'MOBILITY',
  RESEARCH = 'RESEARCH',
  EMPLOYMENT = 'EMPLOYMENT',
  ANALYTICS = 'ANALYTICS',
  IDENTITY = 'IDENTITY',
  SECURITY = 'SECURITY',
  SYSTEM = 'SYSTEM',
  CUSTOM = 'CUSTOM'
}

export enum APIEnvironment {
  PRODUCTION = 'PRODUCTION',
  STAGING = 'STAGING',
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  SANDBOX = 'SANDBOX',
  PREVIEW = 'PREVIEW',
  LOCAL = 'LOCAL',
  CUSTOM = 'CUSTOM'
}

export enum APIAuthType {
  NONE = 'NONE',
  API_KEY = 'API_KEY',
  BASIC = 'BASIC',
  BEARER = 'BEARER',
  OAUTH2 = 'OAUTH2',
  JWT = 'JWT',
  HMAC = 'HMAC',
  CLIENT_CERT = 'CLIENT_CERT',
  CUSTOM = 'CUSTOM'
}

export enum APIThrottlingType {
  NONE = 'NONE',
  PER_SECOND = 'PER_SECOND',
  PER_MINUTE = 'PER_MINUTE',
  PER_HOUR = 'PER_HOUR',
  PER_DAY = 'PER_DAY',
  PER_WEEK = 'PER_WEEK',
  PER_MONTH = 'PER_MONTH',
  CUSTOM = 'CUSTOM'
}

export enum APICacheStrategy {
  NONE = 'NONE',
  IN_MEMORY = 'IN_MEMORY',
  REDIS = 'REDIS',
  MEMCACHED = 'MEMCACHED',
  CDN = 'CDN',
  DATABASE = 'DATABASE',
  FILE = 'FILE',
  CUSTOM = 'CUSTOM'
}

export enum APILogFormat {
  JSON = 'JSON',
  TEXT = 'TEXT',
  CSV = 'CSV',
  SYSLOG = 'SYSLOG',
  CUSTOM = 'CUSTOM'
}

export enum APIMetricType {
  REQUESTS = 'REQUESTS',
  LATENCY = 'LATENCY',
  ERRORS = 'ERRORS',
  THROUGHPUT = 'THROUGHPUT',
  AVAILABILITY = 'AVAILABILITY',
  CACHE_HIT = 'CACHE_HIT',
  CACHE_MISS = 'CACHE_MISS',
  RATE_LIMIT = 'RATE_LIMIT',
  QUOTA = 'QUOTA',
  CUSTOM = 'CUSTOM'
}

export enum APILifecycleStage {
  DESIGN = 'DESIGN',
  DEVELOP = 'DEVELOP',
  TEST = 'TEST',
  DEPLOY = 'DEPLOY',
  PUBLISH = 'PUBLISH',
  OPERATE = 'OPERATE',
  RETIRE = 'RETIRE',
  CUSTOM = 'CUSTOM'
}

export enum APIGovernanceRule {
  NAMING_CONVENTION = 'NAMING_CONVENTION',
  VERSIONING = 'VERSIONING',
  DEPRECATION = 'DEPRECATION',
  SECURITY = 'SECURITY',
  PERFORMANCE = 'PERFORMANCE',
  DOCUMENTATION = 'DOCUMENTATION',
  TESTING = 'TESTING',
  MONITORING = 'MONITORING',
  COMPLIANCE = 'COMPLIANCE',
  CUSTOM = 'CUSTOM'
}

export enum APIDependencyType {
  REQUIRED = 'REQUIRED',
  OPTIONAL = 'OPTIONAL',
  INCOMPATIBLE = 'INCOMPATIBLE',
  DEPRECATED = 'DEPRECATED',
  CUSTOM = 'CUSTOM'
}

export enum APIEventType {
  DEPLOYED = 'DEPLOYED',
  UNDEPLOYED = 'UNDEPLOYED',
  UPDATED = 'UPDATED',
  DEPRECATED = 'DEPRECATED',
  RETIRED = 'RETIRED',
  SUSPENDED = 'SUSPENDED',
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
  CUSTOM = 'CUSTOM'
}

export enum APITransformType {
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
  ERROR = 'ERROR',
  HEADER = 'HEADER',
  QUERY = 'QUERY',
  PATH = 'PATH',
  BODY = 'BODY',
  CUSTOM = 'CUSTOM'
}

export interface APIRegistry {
  id: string;
  name: string;
  description?: string;
  version?: string;
  baseUrl: string;
  environment: APIEnvironment;
  status: APIStatus;
  schoolId: string;
  apis: APICatalog[];
  providers: APIProvider[];
  consumers: APIConsumer[];
  subscriptions: APISubscription[];
  apiKeys: APIKey[];
  oauthApps: OAuthApplication[];
  scopes: OAuthScope[];
  permissions: APIPermission[];
  quotas: APIQuota[];
  rateLimits: APIRateLimit[];
  usages: APIUsage[];
  analytics: APIAnalytics[];
  health: APIHealth[];
  documentation: APIDocumentation[];
  discovery: APIDiscovery[];
  config: APIHubConfig;
  metrics?: APIHubMetrics;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface APICatalog {
  id: string;
  name: string;
  description?: string;
  version: string;
  baseUrl: string;
  protocol: APIProtocol;
  status: APIStatus;
  category: APICategory;
  tags?: string[];
  owner?: string;
  contact?: APIContact;
  license?: APILicense;
  termsOfService?: string;
  openapiUrl?: string;
  documentationUrl?: string;
  supportUrl?: string;
  changelogUrl?: string;
  healthUrl?: string;
  metricsUrl?: string;
  authType: APIAuthType;
  protocols?: string[];
  contentTypes?: string[];
  operations?: APIOperation[];
  schemas?: APISchema[];
  examples?: APIExample[];
  dependencies?: APIDependency[];
  lifecycle?: APILifecycle;
  governance?: APIGovernance;
  security?: APISecurityConfig;
  throttling?: APIThrottling;
  caching?: APICacheConfig;
  transformation?: APITransformConfig;
  monitoring?: APIMonitoringConfig;
  logging?: APILoggingConfig;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface APIContact {
  name?: string;
  email?: string;
  url?: string;
}

export interface APILicense {
  name: string;
  url?: string;
  identifier?: string;
}

export interface APIOperation {
  id: string;
  method: string;
  path: string;
  summary?: string;
  description?: string;
  operationId?: string;
  tags?: string[];
  parameters?: APIParameter[];
  requestBody?: APIRequestBody;
  responses?: APIResponse[];
  security?: APISecurityRequirement[];
  deprecated?: boolean;
  summary?: string;
  metadata?: Record<string, unknown>;
}

export interface APIParameter {
  name: string;
  in: string;
  required?: boolean;
  description?: string;
  type?: string;
  format?: string;
  default?: unknown;
  enum?: unknown[];
  example?: unknown;
  schema?: APISchemaReference;
  metadata?: Record<string, unknown>;
}

export interface APIRequestBody {
  description?: string;
  required?: boolean;
  content?: Record<string, APIContentType>;
  metadata?: Record<string, unknown>;
}

export interface APIContentType {
  schema?: APISchemaReference;
  example?: unknown;
  examples?: Record<string, unknown>;
  encoding?: Record<string, unknown>;
}

export interface APIResponse {
  statusCode: string;
  description?: string;
  headers?: Record<string, APIHeader>;
  content?: Record<string, APIContentType>;
  links?: Record<string, APILink>;
  metadata?: Record<string, unknown>;
}

export interface APIHeader {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: APISchemaReference;
  example?: unknown;
}

export interface APILink {
  operationRef?: string;
  parameters?: Record<string, unknown>;
  description?: string;
  server?: APIServer;
}

export interface APIServer {
  url: string;
  description?: string;
  variables?: Record<string, APIServerVariable>;
}

export interface APIServerVariable {
  enum?: string[];
  default: string;
  description?: string;
}

export interface APISchema {
  id: string;
  name: string;
  description?: string;
  type: string;
  format?: string;
  properties?: Record<string, APISchemaProperty>;
  required?: string[];
  allOf?: APISchemaReference[];
  oneOf?: APISchemaReference[];
  anyOf?: APISchemaReference[];
  not?: APISchemaReference;
  definitions?: Record<string, APISchema>;
  example?: unknown;
  metadata?: Record<string, unknown>;
}

export interface APISchemaProperty {
  type?: string;
  format?: string;
  description?: string;
  default?: unknown;
  enum?: unknown[];
  example?: unknown;
  properties?: Record<string, APISchemaProperty>;
  items?: APISchemaReference;
  nullable?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  metadata?: Record<string, unknown>;
}

export interface APISchemaReference {
  $ref?: string;
  type?: string;
  format?: string;
  description?: string;
  allOf?: APISchemaReference[];
  oneOf?: APISchemaReference[];
  anyOf?: APISchemaReference[];
}

export interface APIExample {
  name: string;
  summary?: string;
  description?: string;
  value?: unknown;
  externalValue?: string;
}

export interface APIDependency {
  id: string;
  name: string;
  version: string;
  type: APIDependencyType;
  description?: string;
  url?: string;
  compatibleVersions?: string[];
  metadata?: Record<string, unknown>;
}

export interface APILifecycle {
  stage: APILifecycleStage;
  startDate?: string;
  endDate?: string;
  retirementDate?: string;
  sunsetDate?: string;
  events?: APILifecycleEvent[];
  metadata?: Record<string, unknown>;
}

export interface APILifecycleEvent {
  id: string;
  type: APIEventType;
  date: string;
  description?: string;
  performedBy?: string;
  metadata?: Record<string, unknown>;
}

export interface APIGovernance {
  rules: APIGovernanceRuleConfig[];
  enabled: boolean;
  enforcementLevel: string;
  exceptions?: APIGovernanceException[];
  metadata?: Record<string, unknown>;
}

export interface APIGovernanceRuleConfig {
  rule: APIGovernanceRule;
  enabled: boolean;
  params?: Record<string, unknown>;
  severity?: string;
  message?: string;
  metadata?: Record<string, unknown>;
}

export interface APIGovernanceException {
  rule: APIGovernanceRule;
  reason: string;
  expiresAt?: string;
  approvedBy?: string;
  metadata?: Record<string, unknown>;
}

export interface APISecurityConfig {
  authentication: APIAuthType;
  authorization?: string[];
  cors?: APICorsConfig;
  csp?: string;
  rateLimiting?: boolean;
  ipRestriction?: boolean;
  allowedIps?: string[];
  geoRestriction?: boolean;
  allowedRegions?: string[];
  encryption?: APIEncryptionConfig;
  signing?: boolean;
  signatureAlgorithm?: string;
  customSecurity?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface APICorsConfig {
  enabled: boolean;
  origins?: string[];
  methods?: string[];
  headers?: string[];
  credentials?: boolean;
  maxAge?: number;
  exposeHeaders?: string[];
}

export interface APIEncryptionConfig {
  atRest?: boolean;
  inTransit?: boolean;
  algorithm?: string;
  keyLength?: number;
  keyRotation?: boolean;
}

export interface APIThrottling {
  enabled: boolean;
  type: APIThrottlingType;
  limit: number;
  window: number;
  burst?: number;
  perUser?: boolean;
  perApiKey?: boolean;
  perIp?: boolean;
  customPolicies?: APIThrottlingPolicy[];
  metadata?: Record<string, unknown>;
}

export interface APIThrottlingPolicy {
  id: string;
  name: string;
  type: APIThrottlingType;
  limit: number;
  window: number;
  conditions?: APICondition[];
  priority?: number;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface APICondition {
  type: string;
  field: string;
  operator: string;
  value: unknown;
  metadata?: Record<string, unknown>;
}

export interface APICacheConfig {
  enabled: boolean;
  strategy: APICacheStrategy;
  ttl?: number;
  maxAge?: number;
  varyBy?: string[];
  invalidateOn?: string[];
  customConfig?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface APITransformConfig {
  enabled: boolean;
  transforms: APITransform[];
  customTransforms?: string[];
  metadata?: Record<string, unknown>;
}

export interface APITransform {
  id: string;
  type: APITransformType;
  name: string;
  description?: string;
  expression?: string;
  function?: string;
  params?: Record<string, unknown>;
  condition?: string;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface APIMonitoringConfig {
  enabled: boolean;
  healthCheckEnabled?: boolean;
  healthCheckInterval?: number;
  metricsEnabled?: boolean;
  metricsInterval?: number;
  alertingEnabled?: boolean;
  alertingRules?: APIAlertingRule[];
  dashboardEnabled?: boolean;
  dashboardUrl?: string;
  customMonitoring?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface APIAlertingRule {
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

export interface APILoggingConfig {
  enabled: boolean;
  level: string;
  destination: string;
  format: APILogFormat;
  retention?: number;
  rotation?: boolean;
  customFields?: string[];
  excludeFields?: string[];
  metadata?: Record<string, unknown>;
}

export interface APIVersion {
  id: string;
  apiId: string;
  version: string;
  status: APIVersionStatus;
  baseUrl?: string;
  changelog?: string;
  deprecatedAt?: string;
  retirementDate?: string;
  sunsetDate?: string;
  supportedUntil?: string;
  breaking?: boolean;
  backwardCompatible?: boolean;
  forwardCompatible?: boolean;
  operations?: APIOperation[];
  schemas?: APISchema[];
  examples?: APIExample[];
  dependencies?: APIDependency[];
  documentation?: APIDocumentation[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  metadata?: Record<string, unknown>;
}

export interface APIConsumer {
  id: string;
  name: string;
  description?: string;
  type: ConsumerType;
  status: SubscriptionStatus;
  schoolId?: string;
  contact?: APIContact;
  applications?: APIApplication[];
  subscriptions?: APISubscription[];
  apiKeys?: APIKey[];
  oauthApps?: OAuthApplication[];
  quotas?: APIQuota[];
  usage?: APIUsage[];
  ipAddresses?: string[];
  allowedOrigins?: string[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface APIApplication {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: string;
  consumerId: string;
  apiKeys?: APIKey[];
  oauthApps?: OAuthApplication[];
  redirectUris?: string[];
  logoUrl?: string;
  website?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface APIProvider {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: string;
  schoolId?: string;
  contact?: APIContact;
  apis?: APICatalog[];
  webhooks?: APIWebhook[];
  documentation?: APIDocumentation[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface APISubscription {
  id: string;
  apiId: string;
  consumerId: string;
  status: SubscriptionStatus;
  plan?: string;
  tier?: string;
  quota?: APIQuota;
  rateLimit?: APIRateLimit;
  startDate?: string;
  endDate?: string;
  autoRenew?: boolean;
  approvedAt?: string;
  approvedBy?: string;
  suspendedAt?: string;
  suspendedReason?: string;
  cancelledAt?: string;
  cancelledReason?: string;
  usage?: APIUsage;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface APIKey {
  id: string;
  name: string;
  type: APIKeyType;
  key: string;
  secret?: string;
  consumerId: string;
  applicationId?: string;
  apiId?: string;
  status: KeyStatus;
  scopes?: string[];
  permissions?: string[];
  ipAddresses?: string[];
  allowedOrigins?: string[];
  expiresAt?: string;
  lastUsedAt?: string;
  usageCount?: number;
  rateLimit?: APIRateLimit;
  quota?: APIQuota;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
  revokedAt?: string;
  revokedBy?: string;
  revokedReason?: string;
}

export interface OAuthApplication {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: OAuthStatus;
  clientId: string;
  clientSecret?: string;
  consumerId: string;
  redirectUris: string[];
  grantTypes: OAuthGrantType[];
  responseTypes: OAuthResponseType[];
  scopes?: string[];
  allowedOrigins?: string[];
  logoUrl?: string;
  website?: string;
  tosUrl?: string;
  policyUrl?: string;
  contacts?: APIContact[];
  tokenEndpointAuthMethod?: string;
  jwksUri?: string;
  jwks?: Record<string, unknown>;
  contacts?: APIContact[];
  createdAt?: string;
  updatedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  revokedAt?: string;
  revokedBy?: string;
  metadata?: Record<string, unknown>;
}

export interface OAuthScope {
  id: string;
  name: string;
  description?: string;
  type: ScopeType;
  apiId?: string;
  resource?: string;
  actions?: string[];
  dataScope?: string;
  conditions?: Record<string, unknown>;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface APIPermission {
  id: string;
  name: string;
  description?: string;
  type: string;
  resource: string;
  actions: string[];
  conditions?: Record<string, unknown>;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface APIQuota {
  id: string;
  name: string;
  type: QuotaType;
  limit: number;
  window: number;
  current: number;
  remaining: number;
  resetAt: string;
  consumerId?: string;
  apiId?: string;
  subscriptionId?: string;
  overageAllowed?: boolean;
  overageLimit?: number;
  overageRate?: number;
  metadata?: Record<string, unknown>;
}

export interface APIRateLimit {
  id: string;
  name: string;
  type: RateLimitType;
  limit: number;
  window: number;
  burst?: number;
  current: number;
  remaining: number;
  resetAt: string;
  consumerId?: string;
  apiId?: string;
  subscriptionId?: string;
  policy?: string;
  headers?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface APIUsage {
  id: string;
  consumerId: string;
  apiId: string;
  subscriptionId?: string;
  period: string;
  requests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  p50ResponseTime: number;
  p90ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  bytesTransferred: number;
  cacheHits: number;
  cacheMisses: number;
  rateLimited: number;
  quotaExceeded: number;
  errors: APIUsageError[];
  metadata?: Record<string, unknown>;
}

export interface APIUsageError {
  statusCode: string;
  count: number;
  message?: string;
  lastOccurrence?: string;
}

export interface APIAnalytics {
  id: string;
  name: string;
  type: APIMetricType;
  period: string;
  startDate: string;
  endDate: string;
  data: Record<string, unknown>;
  charts?: APIChart[];
  summary?: APIAnalyticsSummary;
  metadata?: Record<string, unknown>;
}

export interface APIChart {
  id: string;
  type: string;
  title: string;
  data: Record<string, unknown>;
  config?: Record<string, unknown>;
}

export interface APIAnalyticsSummary {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errorRate: number;
  availability: number;
  totalConsumers: number;
  activeConsumers: number;
  topApis?: APIUsageRanking[];
  topConsumers?: APIUsageRanking[];
  topErrors?: APIErrorRanking[];
}

export interface APIUsageRanking {
  id: string;
  name: string;
  requests: number;
  percentage: number;
}

export interface APIErrorRanking {
  statusCode: string;
  message: string;
  count: number;
  percentage: number;
}

export interface APIHealth {
  id: string;
  apiId: string;
  status: APIHealthStatus;
  checkedAt: string;
  responseTime?: number;
  statusCode?: number;
  message?: string;
  checks?: APIHealthCheck[];
  uptime?: number;
  availability?: number;
  latency?: APILatencyMetrics;
  metadata?: Record<string, unknown>;
}

export interface APIHealthCheck {
  name: string;
  status: APIHealthStatus;
  message?: string;
  responseTime?: number;
  checkedAt: string;
  details?: Record<string, unknown>;
}

export interface APILatencyMetrics {
  min?: number;
  max?: number;
  avg?: number;
  p50?: number;
  p90?: number;
  p95?: number;
  p99?: number;
  count?: number;
}

export interface APIDocumentation {
  id: string;
  apiId: string;
  version?: string;
  format: DocumentationFormat;
  url?: string;
  content?: string;
  openapi?: Record<string, unknown>;
  swagger?: Record<string, unknown>;
  examples?: APIExample[];
  tutorials?: APITutorial[];
  guides?: APIGuide[];
  faqs?: APIFAQ[];
  changelog?: APIChangelog[];
  metadata?: Record<string, unknown>;
}

export interface APITutorial {
  id: string;
  title: string;
  description?: string;
  content: string;
  difficulty?: string;
  duration?: string;
  prerequisites?: string[];
  steps?: APITutorialStep[];
  metadata?: Record<string, unknown>;
}

export interface APITutorialStep {
  id: string;
  title: string;
  description: string;
  code?: string;
  language?: string;
  example?: unknown;
  metadata?: Record<string, unknown>;
}

export interface APIGuide {
  id: string;
  title: string;
  description?: string;
  content: string;
  category?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface APIFAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
  helpful?: number;
  notHelpful?: number;
  metadata?: Record<string, unknown>;
}

export interface APIChangelog {
  version: string;
  date: string;
  changes: APIChangelogEntry[];
  metadata?: Record<string, unknown>;
}

export interface APIChangelogEntry {
  type: string;
  description: string;
  breaking?: boolean;
  deprecated?: boolean;
  removed?: boolean;
  added?: boolean;
  fixed?: boolean;
  security?: boolean;
  metadata?: Record<string, unknown>;
}

export interface APIDiscovery {
  id: string;
  apiId: string;
  status: DiscoveryStatus;
  visibility: string;
  tags?: string[];
  categories?: APICategory[];
  searchIndex?: Record<string, unknown>;
  publishedAt?: string;
  unpublishedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface APIWebhook {
  id: string;
  name: string;
  url: string;
  secret?: string;
  events: string[];
  active: boolean;
  format?: string;
  method?: string;
  headers?: Record<string, string>;
  timeout?: number;
  retryStrategy?: string;
  maxRetries?: number;
  retryDelay?: number;
  lastTriggeredAt?: string;
  lastStatus?: string;
  totalTriggered?: number;
  totalSucceeded?: number;
  totalFailed?: number;
  metadata?: Record<string, unknown>;
}

export interface APIHubConfig {
  id: string;
  name: string;
  description?: string;
  baseUrl: string;
  environment: APIEnvironment;
  version?: string;
  rateLimit?: APIRateLimit;
  quota?: APIQuota;
  security?: APISecurityConfig;
  monitoring?: APIMonitoringConfig;
  logging?: APILoggingConfig;
  caching?: APICacheConfig;
  throttling?: APIThrottling;
  transformation?: APITransformConfig;
  documentation?: APIDocumentation;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface APIHubMetrics {
  id: string;
  period: string;
  totalApis: number;
  activeApis: number;
  totalConsumers: number;
  activeConsumers: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errorRate: number;
  availability: number;
  uptime: number;
  downtime: number;
  dataTransferred: number;
  cacheHitRate: number;
  rateLimitedRequests: number;
  quotaExceededRequests: number;
  topApis?: APIUsageRanking[];
  topConsumers?: APIUsageRanking[];
  topErrors?: APIErrorRanking[];
  metrics?: APIMetric[];
  metadata?: Record<string, unknown>;
}

export interface APIMetric {
  id: string;
  name: string;
  type: APIMetricType;
  value: number;
  unit?: string;
  timestamp: string;
  labels?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface APIAudit {
  id: string;
  apiId: string;
  action: string;
  performedBy: string;
  performedAt: string;
  changes?: Record<string, { before: unknown; after: unknown }>;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export interface APIConfigValidation {
  valid: boolean;
  errors: APIValidationError[];
  warnings: APIValidationWarning[];
}

export interface APIValidationError {
  field: string;
  message: string;
  code: string;
  severity: string;
}

export interface APIValidationWarning {
  field: string;
  message: string;
  code: string;
  severity: string;
}

export interface APITemplate {
  id: string;
  name: string;
  description?: string;
  type: APIProtocol;
  config: Partial<APIHubConfig>;
  documentation?: Partial<APIDocumentation>;
  security?: Partial<APISecurityConfig>;
  monitoring?: Partial<APIMonitoringConfig>;
  tags?: string[];
  category?: string;
  author?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface APITestResult {
  success: boolean;
  message: string;
  responseTime?: number;
  statusCode?: number;
  data?: Record<string, unknown>;
  errors?: APIValidationError[];
  warnings?: APIValidationWarning[];
  metadata?: Record<string, unknown>;
}

export interface APISearch {
  query?: string;
  filters?: Record<string, unknown>;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  fields?: string[];
  metadata?: Record<string, unknown>;
}

export interface APISearchResult {
  items: APICatalog[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
  metadata?: Record<string, unknown>;
}

export interface APIBulkOperation {
  id: string;
  operation: string;
  apiIds: string[];
  status: string;
  startedAt: string;
  completedAt?: string;
  succeeded?: number;
  failed?: number;
  errors?: APIValidationError[];
  metadata?: Record<string, unknown>;
}

export interface APIList {
  items: APICatalog[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface APIFilter {
  status?: APIStatus;
  protocol?: APIProtocol;
  category?: APICategory;
  environment?: APIEnvironment;
  authType?: APIAuthType;
  tags?: string[];
  search?: string;
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  metadata?: Record<string, unknown>;
}

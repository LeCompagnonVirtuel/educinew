export const IntegrationProvider = {
  GoogleWorkspace: 'google_workspace',
  Microsoft365: 'microsoft_365',
  Zoom: 'zoom',
  Slack: 'slack',
  Discord: 'discord',
  Telegram: 'telegram',
  WhatsAppBusiness: 'whatsapp_business',
  Twilio: 'twilio',
  Stripe: 'stripe',
  PayPal: 'paypal',
  Flutterwave: 'flutterwave',
  Paystack: 'paystack',
  OrangeMoney: 'orange_money',
  MTNMoney: 'mtn_money',
  Wave: 'wave',
  OpenAI: 'openai',
  Anthropic: 'anthropic',
  Gemini: 'gemini',
  GitHub: 'github',
  GitLab: 'gitlab',
  Jira: 'jira',
  Trello: 'trello',
  Notion: 'notion',
  Firebase: 'firebase',
  Supabase: 'supabase',
  AWS: 'aws',
  Azure: 'azure',
  Cloudflare: 'cloudflare',
  LDAP: 'ldap',
  ActiveDirectory: 'active_directory',
  SAML: 'saml',
} as const;
export type IntegrationProvider = (typeof IntegrationProvider)[keyof typeof IntegrationProvider];

export const IntegrationStatus = {
  Active: 'active',
  Inactive: 'inactive',
  Pending: 'pending',
  Error: 'error',
  RateLimited: 'rate_limited',
  Suspended: 'suspended',
  Expired: 'expired',
} as const;
export type IntegrationStatus = (typeof IntegrationStatus)[keyof typeof IntegrationStatus];

export const GatewayProtocol = {
  REST: 'rest',
  GraphQL: 'graphql',
  gRPC: 'grpc',
  WebSocket: 'websocket',
  SOAP: 'soap',
  OData: 'odata',
} as const;
export type GatewayProtocol = (typeof GatewayProtocol)[keyof typeof GatewayProtocol];

export const AuthMethod = {
  APIKey: 'api_key',
  OAuth2: 'oauth2',
  JWT: 'jwt',
  OpenIDConnect: 'openid_connect',
  Basic: 'basic',
  Bearer: 'bearer',
  HMAC: 'hmac',
  mTLS: 'mtls',
} as const;
export type AuthMethod = (typeof AuthMethod)[keyof typeof AuthMethod];

export const RateLimitTier = {
  Free: 'free',
  Basic: 'basic',
  Standard: 'standard',
  Premium: 'premium',
  Enterprise: 'enterprise',
} as const;
export type RateLimitTier = (typeof RateLimitTier)[keyof typeof RateLimitTier];

export const APIKeyStatus = {
  Active: 'active',
  Revoked: 'revoked',
  Expired: 'expired',
  Pending: 'pending',
} as const;
export type APIKeyStatus = (typeof APIKeyStatus)[keyof typeof APIKeyStatus];

export const OAuthGrantType = {
  AuthorizationCode: 'authorization_code',
  ClientCredentials: 'client_credentials',
  RefreshToken: 'refresh_token',
  Implicit: 'implicit',
  Password: 'password',
} as const;
export type OAuthGrantType = (typeof OAuthGrantType)[keyof typeof OAuthGrantType];

export const APIVersionStatus = {
  Current: 'current',
  Deprecated: 'deprecated',
  Sunset: 'sunset',
  Beta: 'beta',
  Alpha: 'alpha',
} as const;
export type APIVersionStatus = (typeof APIVersionStatus)[keyof typeof APIVersionStatus];

export const WebhookStatus = {
  Active: 'active',
  Inactive: 'inactive',
  Paused: 'paused',
  Failed: 'failed',
} as const;
export type WebhookStatus = (typeof WebhookStatus)[keyof typeof WebhookStatus];

export const WebhookTriggerType = {
  Event: 'event',
  Schedule: 'schedule',
  Manual: 'manual',
  Threshold: 'threshold',
} as const;
export type WebhookTriggerType = (typeof WebhookTriggerType)[keyof typeof WebhookTriggerType];

export const WebhookRetryPolicy = {
  None: 'none',
  Linear: 'linear',
  Exponential: 'exponential',
  Fixed: 'fixed',
} as const;
export type WebhookRetryPolicy = (typeof WebhookRetryPolicy)[keyof typeof WebhookRetryPolicy];

export const WebhookDeliveryStatus = {
  Pending: 'pending',
  Delivered: 'delivered',
  Failed: 'failed',
  Retrying: 'retrying',
  DeadLetter: 'dead_letter',
} as const;
export type WebhookDeliveryStatus = (typeof WebhookDeliveryStatus)[keyof typeof WebhookDeliveryStatus];

export const WebhookSigningAlgorithm = {
  HMACSHA256: 'hmac_sha256',
  HMACSHA512: 'hmac_sha512',
  RSASHA256: 'rsa_sha256',
  Ed25519: 'ed25519',
} as const;
export type WebhookSigningAlgorithm = (typeof WebhookSigningAlgorithm)[keyof typeof WebhookSigningAlgorithm];

export const EventType = {
  Created: 'created',
  Updated: 'updated',
  Deleted: 'deleted',
  Archived: 'archived',
  Restored: 'restored',
  Published: 'published',
  Approved: 'approved',
  Rejected: 'rejected',
  Exported: 'exported',
  Imported: 'imported',
  Triggered: 'triggered',
  Completed: 'completed',
  Failed: 'failed',
  Timeout: 'timeout',
} as const;
export type EventType = (typeof EventType)[keyof typeof EventType];

export const EventPriority = {
  Critical: 'critical',
  High: 'high',
  Medium: 'medium',
  Low: 'low',
  Background: 'background',
} as const;
export type EventPriority = (typeof EventPriority)[keyof typeof EventPriority];

export interface RateLimitConfig {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit: number;
  tier: RateLimitTier;
  customLimits: Record<string, number>;
}

export interface EndpointStat {
  path: string;
  method: string;
  count: number;
  averageDuration: number;
  errorRate: number;
}

export interface ErrorStat {
  code: string;
  message: string;
  count: number;
  lastOccurrence: string;
}

export interface ParameterDef {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue: string;
  enum: string[];
}

export interface ResponseDef {
  statusCode: number;
  description: string;
  schema: Record<string, unknown>;
}

export interface EventFilterAction {
  type: string;
  target: string;
  config: Record<string, unknown>;
}

export interface Integration {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  provider: IntegrationProvider;
  status: IntegrationStatus;
  protocol: GatewayProtocol;
  baseUrl: string;
  authMethod: AuthMethod;
  authConfig: Record<string, unknown>;
  config: Record<string, unknown>;
  rateLimitConfig: RateLimitConfig;
  healthCheckUrl: string;
  healthCheckInterval: number;
  lastHealthCheck: string;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface APIKey {
  id: string;
  schoolId: string;
  integrationId: string;
  name: string;
  keyHash: string;
  keyPrefix: string;
  scopes: string[];
  tier: RateLimitTier;
  status: APIKeyStatus;
  expiresAt: string;
  lastUsedAt: string;
  usageCount: number;
  requestLimit: number;
  requestsUsed: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface OAuthToken {
  id: string;
  schoolId: string;
  integrationId: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: string;
  scope: string;
  tokenHash: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface OAuthConfig {
  id: string;
  schoolId: string;
  integrationId: string;
  clientId: string;
  clientSecret: string;
  authorizationUrl: string;
  tokenUrl: string;
  redirectUri: string;
  scopes: string[];
  grantType: OAuthGrantType;
  metadata: Record<string, unknown>;
}

export interface RateLimitUsage {
  integrationId: string;
  window: string;
  requestCount: number;
  lastRequestAt: string;
  blockedUntil: string;
  metadata: Record<string, unknown>;
}

export interface APILog {
  id: string;
  schoolId: string;
  integrationId: string;
  method: string;
  path: string;
  statusCode: number;
  requestHeaders: Record<string, string>;
  requestBody: Record<string, unknown>;
  responseBody: Record<string, unknown>;
  duration: number;
  ipAddress: string;
  userId: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface APIAnalytics {
  schoolId: string;
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errorRate: number;
  topEndpoints: EndpointStat[];
  topErrors: ErrorStat[];
  period: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface APIVersion {
  id: string;
  schoolId: string;
  integrationId: string;
  version: string;
  status: APIVersionStatus;
  changelog: string;
  deprecationDate: string;
  sunsetDate: string;
  documentation: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SDKGenerator {
  id: string;
  name: string;
  language: string;
  version: string;
  templateUrl: string;
  generatedAt: string;
  checksum: string;
  metadata: Record<string, unknown>;
}

export interface APIEndpoint {
  id: string;
  integrationId: string;
  method: string;
  path: string;
  description: string;
  parameters: ParameterDef[];
  requestBody: Record<string, unknown>;
  responses: ResponseDef[];
  rateLimit: RateLimitConfig;
  authentication: AuthMethod;
  metadata: Record<string, unknown>;
}

export interface Webhook {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  url: string;
  secret: string;
  signingAlgorithm: WebhookSigningAlgorithm;
  status: WebhookStatus;
  triggerType: WebhookTriggerType;
  events: string[];
  retryPolicy: WebhookRetryPolicy;
  maxRetries: number;
  retryDelay: number;
  timeout: number;
  headers: Record<string, string>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface WebhookEvent {
  id: string;
  webhookId: string;
  schoolId: string;
  eventType: EventType;
  payload: Record<string, unknown>;
  status: WebhookDeliveryStatus;
  attempts: number;
  maxAttempts: number;
  lastAttemptAt: string;
  nextRetryAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  eventId: string;
  schoolId: string;
  status: WebhookDeliveryStatus;
  statusCode: number;
  requestHeaders: Record<string, string>;
  requestBody: Record<string, unknown>;
  responseHeaders: Record<string, string>;
  responseBody: Record<string, unknown>;
  duration: number;
  attempt: number;
  error: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface WebhookTemplate {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  eventType: EventType;
  payloadTemplate: Record<string, unknown>;
  headers: Record<string, string>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface WebhookSecret {
  id: string;
  schoolId: string;
  webhookId: string;
  secretHash: string;
  algorithm: string;
  expiresAt: string;
  rotatedAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DeadLetterQueue {
  id: string;
  schoolId: string;
  webhookId: string;
  eventId: string;
  payload: Record<string, unknown>;
  error: string;
  retryCount: number;
  maxRetries: number;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  expiresAt: string;
}

export interface Event {
  id: string;
  schoolId: string;
  type: EventType;
  priority: EventPriority;
  source: string;
  subject: string;
  payload: Record<string, unknown>;
  correlationId: string;
  causationId: string;
  metadata: Record<string, unknown>;
  publishedAt: string;
  processedAt: string;
  createdAt: string;
}

export interface Topic {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  schema: Record<string, unknown>;
  retention: number;
  partitions: number;
  replicationFactor: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface EventSubscription {
  id: string;
  schoolId: string;
  topicId: string;
  subscriberId: string;
  subscriberType: string;
  filter: string;
  status: string;
  maxDeliveryAttempts: number;
  deadLetterEnabled: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface EventConsumer {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: string;
  config: Record<string, unknown>;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface EventProducer {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: string;
  config: Record<string, unknown>;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PriorityQueue {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  topicId: string;
  priorities: Record<string, number>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DelayedEvent {
  id: string;
  schoolId: string;
  eventId: string;
  scheduledFor: string;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface EventMetrics {
  schoolId: string;
  topicId: string;
  publishedCount: number;
  deliveredCount: number;
  failedCount: number;
  averageLatency: number;
  pendingCount: number;
  deadLetterCount: number;
  period: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface CorrelationChain {
  id: string;
  schoolId: string;
  correlationId: string;
  events: Event[];
  startTime: string;
  endTime: string;
  status: string;
  metadata: Record<string, unknown>;
}

export interface SagaStep {
  id: string;
  sagaId: string;
  name: string;
  action: string;
  compensateAction: string;
  status: string;
  timeout: number;
  metadata: Record<string, unknown>;
}

export interface SagaDefinition {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  steps: SagaStep[];
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SagaExecution {
  id: string;
  sagaId: string;
  schoolId: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  status: string;
  currentStep: string;
  error: string;
  metadata: Record<string, unknown>;
  startedAt: string;
  completedAt: string;
}

export interface DomainEvent {
  id: string;
  schoolId: string;
  aggregateType: string;
  aggregateId: string;
  eventType: string;
  payload: Record<string, unknown>;
  metadata: Record<string, unknown>;
  version: number;
  createdAt: string;
}

export interface StreamingConfig {
  id: string;
  schoolId: string;
  topicId: string;
  consumerGroup: string;
  offsetPolicy: string;
  autoCommit: boolean;
  batchSize: number;
  pollInterval: number;
  metadata: Record<string, unknown>;
}

export interface EventFilter {
  id: string;
  schoolId: string;
  topicId: string;
  expression: string;
  actions: EventFilterAction[];
  status: string;
  metadata: Record<string, unknown>;
}

export interface IntegrationHealth {
  id: string;
  schoolId: string;
  integrationId: string;
  status: string;
  responseTime: number;
  uptime: number;
  lastCheck: string;
  errorRate: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface IntegrationMetrics {
  integrationId: string;
  schoolId: string;
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  errorRate: number;
  period: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface GatewayConfig {
  id: string;
  schoolId: string;
  baseUrl: string;
  corsOrigins: string[];
  defaultRateLimit: number;
  authentication: Record<string, unknown>;
  logging: Record<string, unknown>;
  monitoring: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

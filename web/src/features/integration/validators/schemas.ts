import { z } from 'zod';

const sanitizeString = z.string().trim();

// ============================================================================
// SHARED
// ============================================================================

export const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: sanitizeString.max(100).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export type PaginationInput = z.infer<typeof PaginationSchema>;

export const DateRangeSchema = z.object({
  startDate: z.string().datetime().or(z.date()),
  endDate: z.string().datetime().or(z.date()),
}).refine((data) => new Date(data.startDate) < new Date(data.endDate), {
  message: 'La date de fin doit être après la date de début',
});

export type DateRangeInput = z.infer<typeof DateRangeSchema>;

export const SchoolIdSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
});

export type SchoolIdInput = z.infer<typeof SchoolIdSchema>;

export const ExportSchema = z.object({
  format: z.enum(['csv', 'json', 'xlsx', 'pdf']),
  dateRange: DateRangeSchema.optional(),
  filters: z.record(z.string(), z.any()).optional(),
});

export type ExportInput = z.infer<typeof ExportSchema>;

export const BulkOperationSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'Au moins un identifiant requis').max(100),
  action: z.enum(['enable', 'disable', 'delete', 'archive']),
  confirmation: z.literal(true, { error_map: () => ({ message: 'Confirmation requise' }) }),
});

export type BulkOperationInput = z.infer<typeof BulkOperationSchema>;

// ============================================================================
// API GATEWAY
// ============================================================================

export const CreateIntegrationSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  type: z.enum(['rest', 'graphql', 'soap', 'webhook']),
  baseUrl: z.string().url('URL de base invalide'),
  authType: z.enum(['api_key', 'oauth2', 'basic', 'bearer', 'none']),
  headers: z.record(z.string(), z.string()).optional(),
  timeout: z.number().int().min(1000).max(30000).default(5000),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(5).default(3),
    backoffMs: z.number().int().min(100).max(10000).default(1000),
  }).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
});

export type CreateIntegrationInput = z.infer<typeof CreateIntegrationSchema>;

export const UpdateIntegrationSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  description: sanitizeString.max(500).optional(),
  baseUrl: z.string().url('URL de base invalide').optional(),
  authType: z.enum(['api_key', 'oauth2', 'basic', 'bearer', 'none']).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  timeout: z.number().int().min(1000).max(30000).optional(),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(5).default(3),
    backoffMs: z.number().int().min(100).max(10000).default(1000),
  }).optional(),
  status: z.enum(['active', 'inactive', 'error']).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
});

export type UpdateIntegrationInput = z.infer<typeof UpdateIntegrationSchema>;

export const IntegrationFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  type: z.enum(['rest', 'graphql', 'soap', 'webhook']).optional(),
  status: z.enum(['active', 'inactive', 'error']).optional(),
  authType: z.enum(['api_key', 'oauth2', 'basic', 'bearer', 'none']).optional(),
  search: sanitizeString.max(100).optional(),
  tags: z.array(sanitizeString.max(50)).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export type IntegrationFilterInput = z.infer<typeof IntegrationFilterSchema>;

export const CreateAPIKeySchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  integrationId: z.string().uuid('Identifiant d\'intégration invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  permissions: z.array(z.enum(['read', 'write', 'admin'])).min(1, 'Au moins une permission requise'),
  expiresAt: z.string().datetime().optional(),
  rateLimit: z.number().int().min(1).max(10000).optional(),
  ipWhitelist: z.array(z.string().ip()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateAPIKeyInput = z.infer<typeof CreateAPIKeySchema>;

export const UpdateAPIKeySchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  permissions: z.array(z.enum(['read', 'write', 'admin'])).min(1).optional(),
  expiresAt: z.string().datetime().optional(),
  rateLimit: z.number().int().min(1).max(10000).optional(),
  ipWhitelist: z.array(z.string().ip()).optional(),
  status: z.enum(['active', 'revoked', 'expired']).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateAPIKeyInput = z.infer<typeof UpdateAPIKeySchema>;

export const APIKeyFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  integrationId: z.string().uuid().optional(),
  status: z.enum(['active', 'revoked', 'expired']).optional(),
  search: sanitizeString.max(100).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export type APIKeyFilterInput = z.infer<typeof APIKeyFilterSchema>;

export const CreateOAuthConfigSchema = z.object({
  integrationId: z.string().uuid('Identifiant d\'intégration invalide'),
  provider: sanitizeString.min(1, 'Fournisseur requis').max(50),
  clientId: sanitizeString.min(1, 'Client ID requis').max(255),
  clientSecret: sanitizeString.min(1, 'Secret client requis').max(255),
  authorizationUrl: z.string().url('URL d\'autorisation invalide'),
  tokenUrl: z.string().url('URL de token invalide'),
  scopes: z.array(sanitizeString.max(100)).min(1, 'Au moins un scope requis'),
  redirectUri: z.string().url('URI de redirection invalide').optional(),
  grantType: z.enum(['authorization_code', 'client_credentials', 'refresh_token']),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateOAuthConfigInput = z.infer<typeof CreateOAuthConfigSchema>;

export const UpdateOAuthConfigSchema = z.object({
  clientId: sanitizeString.min(1).max(255).optional(),
  clientSecret: sanitizeString.min(1).max(255).optional(),
  authorizationUrl: z.string().url('URL d\'autorisation invalide').optional(),
  tokenUrl: z.string().url('URL de token invalide').optional(),
  scopes: z.array(sanitizeString.max(100)).min(1).optional(),
  redirectUri: z.string().url('URI de redirection invalide').optional(),
  grantType: z.enum(['authorization_code', 'client_credentials', 'refresh_token']).optional(),
  status: z.enum(['active', 'inactive', 'expired']).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateOAuthConfigInput = z.infer<typeof UpdateOAuthConfigSchema>;

export const CreateRateLimitSchema = z.object({
  integrationId: z.string().uuid('Identifiant d\'intégration invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  requestsPerSecond: z.number().int().min(1).max(10000),
  requestsPerMinute: z.number().int().min(1).max(100000).optional(),
  requestsPerHour: z.number().int().min(1).max(10000000).optional(),
  burstSize: z.number().int().min(1).max(1000).optional(),
  penaltyDuration: z.number().int().min(1).max(3600).default(60),
  whitelist: z.array(z.string().ip()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateRateLimitInput = z.infer<typeof CreateRateLimitSchema>;

export const UpdateRateLimitSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  requestsPerSecond: z.number().int().min(1).max(10000).optional(),
  requestsPerMinute: z.number().int().min(1).max(100000).optional(),
  requestsPerHour: z.number().int().min(1).max(10000000).optional(),
  burstSize: z.number().int().min(1).max(1000).optional(),
  penaltyDuration: z.number().int().min(1).max(3600).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  whitelist: z.array(z.string().ip()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateRateLimitInput = z.infer<typeof UpdateRateLimitSchema>;

export const CreateAPIVersionSchema = z.object({
  integrationId: z.string().uuid('Identifiant d\'intégration invalide'),
  version: sanitizeString.min(1, 'Version requise').max(20).regex(/^\d+\.\d+\.\d+$/, 'Format de version invalide (x.y.z)'),
  status: z.enum(['active', 'deprecated', 'sunset']).default('active'),
  changelog: sanitizeString.max(2000).optional(),
  deprecationDate: z.string().datetime().optional(),
  sunsetDate: z.string().datetime().optional(),
  migrationGuide: sanitizeString.max(5000).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateAPIVersionInput = z.infer<typeof CreateAPIVersionSchema>;

export const UpdateAPIVersionSchema = z.object({
  status: z.enum(['active', 'deprecated', 'sunset']).optional(),
  changelog: sanitizeString.max(2000).optional(),
  deprecationDate: z.string().datetime().optional(),
  sunsetDate: z.string().datetime().optional(),
  migrationGuide: sanitizeString.max(5000).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateAPIVersionInput = z.infer<typeof UpdateAPIVersionSchema>;

export const APIAnalyticsQuerySchema = PaginationSchema.extend({
  integrationId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  groupBy: z.enum(['hour', 'day', 'week', 'month']).default('day'),
  metrics: z.array(z.enum(['requests', 'errors', 'latency', 'bandwidth', 'unique_users'])).optional(),
  endpoints: z.array(sanitizeString.max(200)).optional(),
  statusCodes: z.array(z.number().int().min(100).max(599)).optional(),
});

export type APIAnalyticsQueryInput = z.infer<typeof APIAnalyticsQuerySchema>;

export const APILogFilterSchema = PaginationSchema.extend({
  integrationId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).optional(),
  statusCode: z.number().int().min(100).max(599).optional(),
  minLatency: z.number().int().min(0).optional(),
  maxLatency: z.number().int().min(0).optional(),
  search: sanitizeString.max(200).optional(),
  hasError: z.boolean().optional(),
});

export type APILogFilterInput = z.infer<typeof APILogFilterSchema>;

export const SDKGeneratorSchema = z.object({
  integrationId: z.string().uuid('Identifiant d\'intégration invalide'),
  language: z.enum(['javascript', 'typescript', 'python', 'java', 'go', 'ruby', 'php', 'csharp']),
  packageName: sanitizeString.min(1, 'Nom du package requis').max(100).regex(/^[a-z][a-z0-9_-]*$/, 'Format de nom de package invalide'),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Format de version invalide').default('1.0.0'),
  includeExamples: z.boolean().default(false),
  includeTests: z.boolean().default(false),
  outputFormat: z.enum(['npm', 'pypi', 'maven', 'custom']).default('npm'),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type SDKGeneratorInput = z.infer<typeof SDKGeneratorSchema>;

export const CreateEndpointSchema = z.object({
  integrationId: z.string().uuid('Identifiant d\'intégration invalide'),
  path: sanitizeString.min(1, 'Chemin requis').max(200).regex(/^\//, 'Le chemin doit commencer par /'),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  description: sanitizeString.max(500).optional(),
  requestSchema: z.record(z.string(), z.any()).optional(),
  responseSchema: z.record(z.string(), z.any()).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  queryParameters: z.array(z.object({
    name: sanitizeString.max(100),
    type: z.enum(['string', 'number', 'boolean', 'array']),
    required: z.boolean().default(false),
    description: sanitizeString.max(200).optional(),
  })).optional(),
  rateLimit: z.number().int().min(1).max(10000).optional(),
  timeout: z.number().int().min(1000).max(30000).optional(),
  cacheTtl: z.number().int().min(0).max(86400).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateEndpointInput = z.infer<typeof CreateEndpointSchema>;

export const UpdateEndpointSchema = z.object({
  path: sanitizeString.min(1).max(200).regex(/^\//).optional(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).optional(),
  description: sanitizeString.max(500).optional(),
  requestSchema: z.record(z.string(), z.any()).optional(),
  responseSchema: z.record(z.string(), z.any()).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  queryParameters: z.array(z.object({
    name: sanitizeString.max(100),
    type: z.enum(['string', 'number', 'boolean', 'array']),
    required: z.boolean().default(false),
    description: sanitizeString.max(200).optional(),
  })).optional(),
  rateLimit: z.number().int().min(1).max(10000).optional(),
  timeout: z.number().int().min(1000).max(30000).optional(),
  cacheTtl: z.number().int().min(0).max(86400).optional(),
  status: z.enum(['active', 'inactive', 'deprecated']).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateEndpointInput = z.infer<typeof UpdateEndpointSchema>;

export const GatewayConfigSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  baseUrl: z.string().url('URL de base invalide'),
  corsOrigins: z.array(z.string().url()).optional(),
  defaultTimeout: z.number().int().min(1000).max(60000).default(10000),
  maxRequestSize: z.number().int().min(1024).max(10485760).default(1048576),
  enableLogging: z.boolean().default(true),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  enableMetrics: z.boolean().default(true),
  enableTracing: z.boolean().default(false),
  security: z.object({
    enableWaf: z.boolean().default(false),
    enableRateLimit: z.boolean().default(true),
    globalRateLimit: z.number().int().min(1).max(100000).default(1000),
    enableIpFiltering: z.boolean().default(false),
    trustedProxies: z.array(z.string().ip()).optional(),
  }).optional(),
  caching: z.object({
    enabled: z.boolean().default(false),
    ttl: z.number().int().min(60).max(86400).default(300),
    maxSize: z.number().int().min(100).max(1000000).default(10000),
  }).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type GatewayConfigInput = z.infer<typeof GatewayConfigSchema>;

// ============================================================================
// WEBHOOKS
// ============================================================================

export const CreateWebhookSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  url: z.string().url('URL du webhook invalide'),
  events: z.array(sanitizeString.max(100)).min(1, 'Au moins un événement requis'),
  secret: sanitizeString.max(255).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(30000).default(1000),
  }).optional(),
  timeout: z.number().int().min(1000).max(30000).default(5000),
  active: z.boolean().default(true),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateWebhookInput = z.infer<typeof CreateWebhookSchema>;

export const UpdateWebhookSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  url: z.string().url('URL du webhook invalide').optional(),
  events: z.array(sanitizeString.max(100)).min(1).optional(),
  secret: sanitizeString.max(255).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(30000).default(1000),
  }).optional(),
  timeout: z.number().int().min(1000).max(30000).optional(),
  active: z.boolean().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateWebhookInput = z.infer<typeof UpdateWebhookSchema>;

export const WebhookFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  events: z.array(sanitizeString.max(100)).optional(),
  active: z.boolean().optional(),
  search: sanitizeString.max(100).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export type WebhookFilterInput = z.infer<typeof WebhookFilterSchema>;

export const CreateWebhookEventSchema = z.object({
  webhookId: z.string().uuid('Identifiant du webhook invalide'),
  eventType: sanitizeString.min(1, 'Type d\'événement requis').max(100),
  payload: z.record(z.string(), z.any()),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
  scheduledAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateWebhookEventInput = z.infer<typeof CreateWebhookEventSchema>;

export const WebhookEventFilterSchema = PaginationSchema.extend({
  webhookId: z.string().uuid().optional(),
  eventType: sanitizeString.max(100).optional(),
  status: z.enum(['pending', 'processing', 'delivered', 'failed', 'expired']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).optional(),
});

export type WebhookEventFilterInput = z.infer<typeof WebhookEventFilterSchema>;

export const WebhookDeliveryFilterSchema = PaginationSchema.extend({
  webhookId: z.string().uuid().optional(),
  eventId: z.string().uuid().optional(),
  status: z.enum(['success', 'failed', 'pending', 'retrying']).optional(),
  statusCode: z.number().int().min(100).max(599).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minLatency: z.number().int().min(0).optional(),
  maxLatency: z.number().int().min(0).optional(),
});

export type WebhookDeliveryFilterInput = z.infer<typeof WebhookDeliveryFilterSchema>;

export const CreateWebhookTemplateSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  eventType: sanitizeString.min(1, 'Type d\'événement requis').max(100),
  urlTemplate: sanitizeString.min(1, 'URL template requise').max(500),
  headersTemplate: z.record(z.string(), z.string()).optional(),
  payloadTemplate: z.record(z.string(), z.any()),
  variables: z.array(z.object({
    name: sanitizeString.max(100),
    type: z.enum(['string', 'number', 'boolean', 'array', 'object']),
    required: z.boolean().default(false),
    defaultValue: z.any().optional(),
    description: sanitizeString.max(200).optional(),
  })).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateWebhookTemplateInput = z.infer<typeof CreateWebhookTemplateSchema>;

export const UpdateWebhookTemplateSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  description: sanitizeString.max(500).optional(),
  eventType: sanitizeString.min(1).max(100).optional(),
  urlTemplate: sanitizeString.min(1).max(500).optional(),
  headersTemplate: z.record(z.string(), z.string()).optional(),
  payloadTemplate: z.record(z.string(), z.any()).optional(),
  variables: z.array(z.object({
    name: sanitizeString.max(100),
    type: z.enum(['string', 'number', 'boolean', 'array', 'object']),
    required: z.boolean().default(false),
    defaultValue: z.any().optional(),
    description: sanitizeString.max(200).optional(),
  })).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateWebhookTemplateInput = z.infer<typeof UpdateWebhookTemplateSchema>;

export const WebhookTestSchema = z.object({
  webhookId: z.string().uuid('Identifiant du webhook invalide'),
  eventType: sanitizeString.min(1, 'Type d\'événement requis').max(100),
  payload: z.record(z.string(), z.any()).default({}),
  expectStatusCode: z.number().int().min(100).max(599).optional(),
  timeout: z.number().int().min(1000).max(30000).default(10000),
});

export type WebhookTestInput = z.infer<typeof WebhookTestSchema>;

export const WebhookReplaySchema = z.object({
  webhookId: z.string().uuid('Identifiant du webhook invalide'),
  eventIds: z.array(z.string().uuid()).min(1, 'Au moins un identifiant d\'événement requis').max(50),
  overwriteUrl: z.string().url('URL de remplacement invalide').optional(),
  dryRun: z.boolean().default(false),
});

export type WebhookReplayInput = z.infer<typeof WebhookReplaySchema>;

export const WebhookSecretRotateSchema = z.object({
  webhookId: z.string().uuid('Identifiant du webhook invalide'),
  newSecret: sanitizeString.min(16, 'Le secret doit contenir au moins 16 caractères').max(255),
  gracePeriod: z.number().int().min(0).max(86400).default(3600),
  notifyUrl: z.string().url().optional(),
});

export type WebhookSecretRotateInput = z.infer<typeof WebhookSecretRotateSchema>;

export const DeadLetterFilterSchema = PaginationSchema.extend({
  webhookId: z.string().uuid().optional(),
  eventType: sanitizeString.max(100).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  errorType: sanitizeString.max(100).optional(),
  maxRetries: z.number().int().min(0).optional(),
});

export type DeadLetterFilterInput = z.infer<typeof DeadLetterFilterSchema>;

export const DeadLetterRetrySchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'Au moins un identifiant requis').max(100),
  overrideUrl: z.string().url('URL de remplacement invalide').optional(),
  overrideHeaders: z.record(z.string(), z.string()).optional(),
  dryRun: z.boolean().default(false),
});

export type DeadLetterRetryInput = z.infer<typeof DeadLetterRetrySchema>;

export const WebhookBatchSchema = z.object({
  webhookId: z.string().uuid('Identifiant du webhook invalide'),
  events: z.array(z.object({
    eventType: sanitizeString.min(1, 'Type d\'événement requis').max(100),
    payload: z.record(z.string(), z.any()),
    priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
    scheduledAt: z.string().datetime().optional(),
  })).min(1, 'Au moins un événement requis').max(100),
  executeAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type WebhookBatchInput = z.infer<typeof WebhookBatchSchema>;

// ============================================================================
// EVENT BUS
// ============================================================================

export const PublishEventSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  topic: sanitizeString.min(1, 'Sujet requis').max(100),
  eventType: sanitizeString.min(1, 'Type d\'événement requis').max(100),
  payload: z.record(z.string(), z.any()),
  correlationId: z.string().uuid().optional(),
  source: sanitizeString.max(100).optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
  ttl: z.number().int().min(60).max(604800).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type PublishEventInput = z.infer<typeof PublishEventSchema>;

export const EventFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  topic: sanitizeString.max(100).optional(),
  eventType: sanitizeString.max(100).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  source: sanitizeString.max(100).optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).optional(),
  correlationId: z.string().uuid().optional(),
});

export type EventFilterInput = z.infer<typeof EventFilterSchema>;

export const CreateTopicSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100).regex(/^[a-zA-Z0-9._-]+$/, 'Format de nom invalide'),
  description: sanitizeString.max(500).optional(),
  partitions: z.number().int().min(1).max(100).default(1),
  retentionMs: z.number().int().min(60000).max(604800000).default(86400000),
  replicationFactor: z.number().int().min(1).max(10).default(1),
  maxMessageSize: z.number().int().min(1024).max(10485760).default(1048576),
  allowWildcardSubscriptions: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateTopicInput = z.infer<typeof CreateTopicSchema>;

export const UpdateTopicSchema = z.object({
  description: sanitizeString.max(500).optional(),
  retentionMs: z.number().int().min(60000).max(604800000).optional(),
  maxMessageSize: z.number().int().min(1024).max(10485760).optional(),
  status: z.enum(['active', 'inactive', 'paused']).optional(),
  allowWildcardSubscriptions: z.boolean().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateTopicInput = z.infer<typeof UpdateTopicSchema>;

export const CreateSubscriptionSchema = z.object({
  topicId: z.string().uuid('Identifiant du sujet invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  type: z.enum(['queue', 'broadcast', 'partitioned']),
  filter: z.record(z.string(), z.any()).optional(),
  deadLetterTopic: z.string().uuid().optional(),
  maxRetries: z.number().int().min(0).max(10).default(3),
  retryDelay: z.number().int().min(100).max(60000).default(1000),
  ackTimeout: z.number().int().min(1000).max(300000).default(30000),
  maxInFlight: z.number().int().min(1).max(1000).default(100),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateSubscriptionInput = z.infer<typeof CreateSubscriptionSchema>;

export const UpdateSubscriptionSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  filter: z.record(z.string(), z.any()).optional(),
  deadLetterTopic: z.string().uuid().optional(),
  maxRetries: z.number().int().min(0).max(10).optional(),
  retryDelay: z.number().int().min(100).max(60000).optional(),
  ackTimeout: z.number().int().min(1000).max(300000).optional(),
  maxInFlight: z.number().int().min(1).max(1000).optional(),
  status: z.enum(['active', 'paused', 'draining']).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateSubscriptionInput = z.infer<typeof UpdateSubscriptionSchema>;

export const CreateConsumerSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  subscriptionId: z.string().uuid('Identifiant d\'abonnement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  type: z.enum(['pull', 'push']),
  batchSize: z.number().int().min(1).max(1000).default(10),
  processingTimeout: z.number().int().min(1000).max(300000).default(30000),
  concurrency: z.number().int().min(1).max(100).default(1),
  checkpointInterval: z.number().int().min(1000).max(60000).default(5000),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateConsumerInput = z.infer<typeof CreateConsumerSchema>;

export const CreateProducerSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  topicId: z.string().uuid('Identifiant du sujet invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  type: z.enum(['sync', 'async']),
  batchSize: z.number().int().min(1).max(1000).default(100),
  lingerMs: z.number().int().min(0).max(1000).default(5),
  compression: z.enum(['none', 'gzip', 'snappy', 'lz4']).default('none'),
  maxRetries: z.number().int().min(0).max(10).default(3),
  acks: z.enum(['none', 'leader', 'all']).default('all'),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateProducerInput = z.infer<typeof CreateProducerSchema>;

export const SagaCreateSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  sagaType: z.enum(['choreography', 'orchestration']),
  compensationStrategy: z.enum(['backward', 'forward', 'mixed']).default('backward'),
  timeout: z.number().int().min(60000).max(86400000).default(3600000),
  maxRetries: z.number().int().min(0).max(10).default(3),
  steps: z.array(z.object({
    name: sanitizeString.min(1).max(100),
    topic: sanitizeString.min(1).max(100),
    eventType: sanitizeString.min(1).max(100),
    compensationTopic: sanitizeString.min(1).max(100).optional(),
    compensationEventType: sanitizeString.min(1).max(100).optional(),
    timeout: z.number().int().min(1000).max(300000).default(30000),
    maxRetries: z.number().int().min(0).max(5).default(3),
    condition: z.record(z.string(), z.any()).optional(),
  })).min(1, 'Au moins une étape requise'),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type SagaCreateInput = z.infer<typeof SagaCreateSchema>;

export const SagaStepSchema = z.object({
  sagaId: z.string().uuid('Identifiant du saga invalide'),
  stepIndex: z.number().int().min(0).max(100),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  topic: sanitizeString.min(1, 'Sujet requis').max(100),
  eventType: sanitizeString.min(1, 'Type d\'événement requis').max(100),
  compensationTopic: sanitizeString.min(1).max(100).optional(),
  compensationEventType: sanitizeString.min(1).max(100).optional(),
  timeout: z.number().int().min(1000).max(300000).default(30000),
  maxRetries: z.number().int().min(0).max(5).default(3),
  condition: z.record(z.string(), z.any()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type SagaStepInput = z.infer<typeof SagaStepSchema>;

export const StreamingConfigSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  sourceTopic: sanitizeString.min(1, 'Sujet source requis').max(100),
  destinationTopic: sanitizeString.min(1, 'Sujet destination requis').max(100),
  windowType: z.enum(['tumbling', 'sliding', 'session', 'global']),
  windowSizeMs: z.number().int().min(1000).max(86400000).default(60000),
  windowSlideMs: z.number().int().min(1000).max(86400000).optional(),
  watermarkDelay: z.number().int().min(0).max(300000).default(5000),
  aggregation: z.enum(['count', 'sum', 'avg', 'min', 'max', 'custom']).optional(),
  aggregationKey: sanitizeString.max(100).optional(),
  outputType: z.enum(['append', 'update', 'delete']).default('append'),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type StreamingConfigInput = z.infer<typeof StreamingConfigSchema>;

export const EventMetricsSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide').optional(),
  topic: sanitizeString.max(100).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  groupBy: z.enum(['minute', 'hour', 'day']).default('hour'),
  metrics: z.array(z.enum(['publish_count', 'consume_count', 'error_count', 'latency_avg', 'lag'])).optional(),
});

export type EventMetricsInput = z.infer<typeof EventMetricsSchema>;

// ============================================================================
// AUTOMATION
// ============================================================================

export const CreateAutomationSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  triggerType: z.enum(['event', 'schedule', 'manual', 'webhook']),
  triggerConfig: z.record(z.string(), z.any()),
  steps: z.array(z.object({
    name: sanitizeString.min(1).max(100),
    type: z.enum(['action', 'condition', 'delay', 'loop', 'parallel']),
    config: z.record(z.string(), z.any()),
    nextStepId: z.string().uuid().optional(),
    errorHandling: z.enum(['skip', 'retry', 'stop', 'fallback']).default('stop'),
    metadata: z.record(z.string(), z.any()).optional(),
  })).min(1, 'Au moins une étape requise'),
  enabled: z.boolean().default(true),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateAutomationInput = z.infer<typeof CreateAutomationSchema>;

export const UpdateAutomationSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  description: sanitizeString.max(500).optional(),
  triggerType: z.enum(['event', 'schedule', 'manual', 'webhook']).optional(),
  triggerConfig: z.record(z.string(), z.any()).optional(),
  steps: z.array(z.object({
    name: sanitizeString.min(1).max(100),
    type: z.enum(['action', 'condition', 'delay', 'loop', 'parallel']),
    config: z.record(z.string(), z.any()),
    nextStepId: z.string().uuid().optional(),
    errorHandling: z.enum(['skip', 'retry', 'stop', 'fallback']).default('stop'),
    metadata: z.record(z.string(), z.any()).optional(),
  })).optional(),
  enabled: z.boolean().optional(),
  status: z.enum(['active', 'inactive', 'draft']).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateAutomationInput = z.infer<typeof UpdateAutomationSchema>;

export const AutomationFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  triggerType: z.enum(['event', 'schedule', 'manual', 'webhook']).optional(),
  status: z.enum(['active', 'inactive', 'draft']).optional(),
  enabled: z.boolean().optional(),
  search: sanitizeString.max(100).optional(),
  tags: z.array(sanitizeString.max(50)).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export type AutomationFilterInput = z.infer<typeof AutomationFilterSchema>;

export const AutomationStepSchema = z.object({
  automationId: z.string().uuid('Identifiant d\'automatisation invalide'),
  stepIndex: z.number().int().min(0).max(100),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  type: z.enum(['action', 'condition', 'delay', 'loop', 'parallel']),
  config: z.record(z.string(), z.any()),
  nextStepId: z.string().uuid().optional(),
  errorHandling: z.enum(['skip', 'retry', 'stop', 'fallback']).default('stop'),
  retryCount: z.number().int().min(0).max(10).default(3),
  retryDelay: z.number().int().min(100).max(60000).default(1000),
  timeout: z.number().int().min(1000).max(300000).default(30000),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AutomationStepInput = z.infer<typeof AutomationStepSchema>;

export const AutomationConditionSchema = z.object({
  automationId: z.string().uuid('Identifiant d\'automatisation invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  type: z.enum(['and', 'or', 'not', 'compare', 'exists', 'regex']),
  conditions: z.array(z.object({
    field: sanitizeString.min(1).max(200),
    operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'contains', 'startsWith', 'endsWith', 'regex']),
    value: z.any(),
    type: z.enum(['string', 'number', 'boolean', 'array', 'object']).optional(),
  })).optional(),
  field: sanitizeString.max(200).optional(),
  operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'contains', 'startsWith', 'endsWith', 'regex']).optional(),
  value: z.any().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AutomationConditionInput = z.infer<typeof AutomationConditionSchema>;

export const CreateWorkflowSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  type: z.enum(['sequential', 'parallel', 'state_machine', 'dag']),
  steps: z.array(z.object({
    id: z.string().uuid(),
    name: sanitizeString.min(1).max(100),
    type: z.enum(['task', 'decision', 'fork', 'join', 'end']),
    config: z.record(z.string(), z.any()),
    nextSteps: z.array(z.string().uuid()).optional(),
    conditions: z.array(z.object({
      field: sanitizeString.max(200),
      operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte']),
      value: z.any(),
      targetStepId: z.string().uuid(),
    })).optional(),
    timeout: z.number().int().min(1000).max(300000).default(30000),
    metadata: z.record(z.string(), z.any()).optional(),
  })).min(1, 'Au moins une étape requise'),
  variables: z.record(z.any()).optional(),
  enabled: z.boolean().default(true),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateWorkflowInput = z.infer<typeof CreateWorkflowSchema>;

export const UpdateWorkflowSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  description: sanitizeString.max(500).optional(),
  type: z.enum(['sequential', 'parallel', 'state_machine', 'dag']).optional(),
  steps: z.array(z.object({
    id: z.string().uuid(),
    name: sanitizeString.min(1).max(100),
    type: z.enum(['task', 'decision', 'fork', 'join', 'end']),
    config: z.record(z.string(), z.any()),
    nextSteps: z.array(z.string().uuid()).optional(),
    conditions: z.array(z.object({
      field: sanitizeString.max(200),
      operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte']),
      value: z.any(),
      targetStepId: z.string().uuid(),
    })).optional(),
    timeout: z.number().int().min(1000).max(300000).optional(),
    metadata: z.record(z.string(), z.any()).optional(),
  })).optional(),
  variables: z.record(z.any()).optional(),
  enabled: z.boolean().optional(),
  status: z.enum(['active', 'inactive', 'draft']).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateWorkflowInput = z.infer<typeof UpdateWorkflowSchema>;

export const WorkflowFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  type: z.enum(['sequential', 'parallel', 'state_machine', 'dag']).optional(),
  status: z.enum(['active', 'inactive', 'draft']).optional(),
  enabled: z.boolean().optional(),
  search: sanitizeString.max(100).optional(),
  tags: z.array(sanitizeString.max(50)).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export type WorkflowFilterInput = z.infer<typeof WorkflowFilterSchema>;

export const WorkflowStepSchema = z.object({
  workflowId: z.string().uuid('Identifiant du workflow invalide'),
  stepId: z.string().uuid(),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  type: z.enum(['task', 'decision', 'fork', 'join', 'end']),
  config: z.record(z.string(), z.any()),
  nextSteps: z.array(z.string().uuid()).optional(),
  conditions: z.array(z.object({
    field: sanitizeString.max(200),
    operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte']),
    value: z.any(),
    targetStepId: z.string().uuid(),
  })).optional(),
  timeout: z.number().int().min(1000).max(300000).default(30000),
  retryCount: z.number().int().min(0).max(10).default(3),
  retryDelay: z.number().int().min(100).max(60000).default(1000),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type WorkflowStepInput = z.infer<typeof WorkflowStepSchema>;

export const WorkflowVersionSchema = z.object({
  workflowId: z.string().uuid('Identifiant du workflow invalide'),
  version: sanitizeString.min(1, 'Version requise').max(20).regex(/^\d+\.\d+\.\d+$/, 'Format de version invalide'),
  description: sanitizeString.max(500).optional(),
  steps: z.array(z.object({
    id: z.string().uuid(),
    name: sanitizeString.min(1).max(100),
    type: z.enum(['task', 'decision', 'fork', 'join', 'end']),
    config: z.record(z.string(), z.any()),
    nextSteps: z.array(z.string().uuid()).optional(),
    conditions: z.array(z.object({
      field: sanitizeString.max(200),
      operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte']),
      value: z.any(),
      targetStepId: z.string().uuid(),
    })).optional(),
    timeout: z.number().int().min(1000).max(300000).default(30000),
    metadata: z.record(z.string(), z.any()).optional(),
  })).min(1),
  variables: z.record(z.any()).optional(),
  isActive: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type WorkflowVersionInput = z.infer<typeof WorkflowVersionSchema>;

export const ApprovalRequestSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  workflowId: z.string().uuid('Identifiant du workflow invalide'),
  stepId: z.string().uuid(),
  requesterId: z.string().uuid('Identifiant du demandeur invalide'),
  approvers: z.array(z.string().uuid()).min(1, 'Au moins un approbateur requis').max(10),
  approvalType: z.enum(['any', 'all', 'majority']),
  title: sanitizeString.min(1, 'Titre requis').max(200),
  description: sanitizeString.max(2000).optional(),
  context: z.record(z.string(), z.any()).optional(),
  expiresAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type ApprovalRequestInput = z.infer<typeof ApprovalRequestSchema>;

export const ApprovalResponseSchema = z.object({
  requestId: z.string().uuid('Identifiant de la demande invalide'),
  approverId: z.string().uuid('Identifiant de l\'approbateur invalide'),
  decision: z.enum(['approved', 'rejected', 'abstained']),
  comment: sanitizeString.max(1000).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type ApprovalResponseInput = z.infer<typeof ApprovalResponseSchema>;

export const AutomationScheduleSchema = z.object({
  automationId: z.string().uuid('Identifiant d\'automatisation invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  cronExpression: sanitizeString.min(1, 'Expression cron requise').max(100).regex(/^[\d\s\*\/\-\,]+$/, 'Expression cron invalide'),
  timezone: sanitizeString.max(50).default('Europe/Paris'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  enabled: z.boolean().default(true),
  maxConcurrentRuns: z.number().int().min(1).max(10).default(1),
  catchUp: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AutomationScheduleInput = z.infer<typeof AutomationScheduleSchema>;

export const AutomationTemplateSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  category: z.enum(['notification', 'reporting', 'sync', 'cleanup', 'custom']),
  triggerType: z.enum(['event', 'schedule', 'manual', 'webhook']),
  triggerConfig: z.record(z.string(), z.any()),
  steps: z.array(z.object({
    name: sanitizeString.min(1).max(100),
    type: z.enum(['action', 'condition', 'delay', 'loop', 'parallel']),
    config: z.record(z.string(), z.any()),
    nextStepId: z.string().uuid().optional(),
    errorHandling: z.enum(['skip', 'retry', 'stop', 'fallback']).default('stop'),
    metadata: z.record(z.string(), z.any()).optional(),
  })).min(1),
  parameters: z.array(z.object({
    name: sanitizeString.max(100),
    type: z.enum(['string', 'number', 'boolean', 'array', 'object']),
    required: z.boolean().default(false),
    defaultValue: z.any().optional(),
    description: sanitizeString.max(200).optional(),
  })).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AutomationTemplateInput = z.infer<typeof AutomationTemplateSchema>;

// ============================================================================
// CONNECTORS
// ============================================================================

export const CreateConnectorSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  type: z.enum(['erp', 'lms', 'sso', 'mail', 'storage', 'crm', 'custom']),
  provider: sanitizeString.min(1, 'Fournisseur requis').max(100),
  description: sanitizeString.max(500).optional(),
  config: z.record(z.string(), z.any()),
  credentials: z.record(z.string(), z.any()),
  syncFrequency: z.number().int().min(60).max(86400).default(3600),
  enabled: z.boolean().default(true),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateConnectorInput = z.infer<typeof CreateConnectorSchema>;

export const UpdateConnectorSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  description: sanitizeString.max(500).optional(),
  config: z.record(z.string(), z.any()).optional(),
  credentials: z.record(z.string(), z.any()).optional(),
  syncFrequency: z.number().int().min(60).max(86400).optional(),
  enabled: z.boolean().optional(),
  status: z.enum(['active', 'inactive', 'error', 'syncing']).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateConnectorInput = z.infer<typeof UpdateConnectorSchema>;

export const ConnectorFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  type: z.enum(['erp', 'lms', 'sso', 'mail', 'storage', 'crm', 'custom']).optional(),
  provider: sanitizeString.max(100).optional(),
  status: z.enum(['active', 'inactive', 'error', 'syncing']).optional(),
  enabled: z.boolean().optional(),
  search: sanitizeString.max(100).optional(),
  tags: z.array(sanitizeString.max(50)).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export type ConnectorFilterInput = z.infer<typeof ConnectorFilterSchema>;

export const ConnectorConfigSchema = z.object({
  connectorId: z.string().uuid('Identifiant du connecteur invalide'),
  config: z.record(z.string(), z.any()),
  validateConnection: z.boolean().default(true),
  timeout: z.number().int().min(1000).max(30000).default(10000),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type ConnectorConfigInput = z.infer<typeof ConnectorConfigSchema>;

export const ConnectorMappingSchema = z.object({
  connectorId: z.string().uuid('Identifiant du connecteur invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  sourceEntity: sanitizeString.min(1, 'Entité source requise').max(100),
  targetEntity: sanitizeString.min(1, 'Entité cible requise').max(100),
  fields: z.array(z.object({
    source: sanitizeString.max(200),
    target: sanitizeString.max(200),
    transform: z.enum(['direct', 'lowercase', 'uppercase', 'trim', 'custom']).default('direct'),
    transformConfig: z.record(z.string(), z.any()).optional(),
    required: z.boolean().default(false),
    defaultValue: z.any().optional(),
  })).min(1, 'Au moins un mappage de champ requis'),
  filters: z.record(z.string(), z.any()).optional(),
  syncMode: z.enum(['full', 'incremental', 'realtime']).default('full'),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type ConnectorMappingInput = z.infer<typeof ConnectorMappingSchema>;

export const ConnectorSyncSchema = z.object({
  connectorId: z.string().uuid('Identifiant du connecteur invalide'),
  direction: z.enum(['inbound', 'outbound', 'bidirectional']),
  entities: z.array(sanitizeString.max(100)).min(1, 'Au moins une entité requise'),
  mode: z.enum(['full', 'incremental']),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  dryRun: z.boolean().default(false),
  batchSize: z.number().int().min(1).max(10000).default(100),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type ConnectorSyncInput = z.infer<typeof ConnectorSyncSchema>;

export const ConnectorBatchSchema = z.object({
  connectorId: z.string().uuid('Identifiant du connecteur invalide'),
  operations: z.array(z.object({
    entity: sanitizeString.min(1).max(100),
    action: z.enum(['create', 'update', 'delete']),
    data: z.record(z.string(), z.any()),
    externalId: sanitizeString.max(200).optional(),
  })).min(1, 'Au moins une opération requise').max(1000),
  atomic: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type ConnectorBatchInput = z.infer<typeof ConnectorBatchSchema>;

export const ConnectorHealthSchema = z.object({
  connectorId: z.string().uuid('Identifiant du connecteur invalide'),
  includeMetrics: z.boolean().default(true),
  includeRecentErrors: z.boolean().default(true),
  timeRange: z.number().int().min(300).max(604800).default(3600),
});

export type ConnectorHealthInput = z.infer<typeof ConnectorHealthSchema>;

export const GoogleWorkspaceConfigSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  domain: sanitizeString.min(1, 'Domaine requis').max(100),
  serviceAccountKey: sanitizeString.min(1, 'Clé de compte de service requise'),
  delegatedUser: z.string().email('Email utilisateur délégué invalide'),
  scopes: z.array(sanitizeString.max(100)).min(1, 'Au moins un scope requis'),
  syncUsers: z.boolean().default(true),
  syncGroups: z.boolean().default(true),
  syncCalendars: z.boolean().default(false),
  syncClassrooms: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type GoogleWorkspaceConfigInput = z.infer<typeof GoogleWorkspaceConfigSchema>;

export const Microsoft365ConfigSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  tenantId: z.string().uuid('ID de tenant invalide'),
  clientId: z.string().uuid('ID client invalide'),
  clientSecret: sanitizeString.min(1, 'Secret client requis').max(255),
  scopes: z.array(sanitizeString.max(100)).min(1, 'Au moins un scope requis'),
  syncUsers: z.boolean().default(true),
  syncGroups: z.boolean().default(true),
  syncTeams: z.boolean().default(false),
  syncSharePoint: z.boolean().default(false),
  syncOneDrive: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type Microsoft365ConfigInput = z.infer<typeof Microsoft365ConfigSchema>;

export const ZoomConfigSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  accountId: sanitizeString.min(1, 'ID de compte requis').max(100),
  clientId: sanitizeString.min(1, 'ID client requis').max(255),
  clientSecret: sanitizeString.min(1, 'Secret client requis').max(255),
  webhookSecret: sanitizeString.max(255).optional(),
  syncMeetings: z.boolean().default(true),
  syncRecordings: z.boolean().default(false),
  syncWebinars: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type ZoomConfigInput = z.infer<typeof ZoomConfigSchema>;

export const SlackConfigSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  workspaceId: sanitizeString.min(1, 'ID d\'espace de travail requis').max(100),
  botToken: sanitizeString.min(1, 'Token du bot requis').max(255),
  appToken: sanitizeString.max(255).optional(),
  signingSecret: sanitizeString.max(255).optional(),
  syncChannels: z.boolean().default(true),
  syncUsers: z.boolean().default(true),
  syncMessages: z.boolean().default(false),
  defaultChannel: sanitizeString.max(100).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type SlackConfigInput = z.infer<typeof SlackConfigSchema>;

export const TwilioConfigSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  accountSid: sanitizeString.min(1, 'SID de compte requis').max(100),
  authToken: sanitizeString.min(1, 'Token d\'authentification requis').max(255),
  phoneNumber: sanitizeString.min(1, 'Numéro de téléphone requis').max(20).regex(/^\+[1-9]\d{1,14}$/, 'Format de numéro de téléphone invalide'),
  messagingServiceSid: sanitizeString.max(100).optional(),
  webhookUrl: z.string().url('URL webhook invalide').optional(),
  statusCallbackUrl: z.string().url('URL de callback invalide').optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type TwilioConfigInput = z.infer<typeof TwilioConfigSchema>;

export const StripeConfigSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  secretKey: sanitizeString.min(1, 'Clé secrète requise').max(255),
  publishableKey: sanitizeString.min(1, 'Clé publique requise').max(255),
  webhookSecret: sanitizeString.max(255).optional(),
  apiVersion: sanitizeString.max(20).default('2023-10-16'),
  currency: z.string().length(3, 'Code de devise invalide').default('EUR'),
  enableBilling: z.boolean().default(true),
  enableSubscriptions: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type StripeConfigInput = z.infer<typeof StripeConfigSchema>;

// ============================================================================
// AI
// ============================================================================

export const CreateAIModelSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  provider: z.enum(['openai', 'anthropic', 'google', 'azure', 'aws', 'local', 'custom']),
  modelId: sanitizeString.min(1, 'ID du modèle requis').max(100),
  description: sanitizeString.max(500).optional(),
  config: z.object({
    temperature: z.number().min(0).max(2).default(0.7),
    maxTokens: z.number().int().min(1).max(128000).default(4096),
    topP: z.number().min(0).max(1).default(1),
    frequencyPenalty: z.number().min(-2).max(2).default(0),
    presencePenalty: z.number().min(-2).max(2).default(0),
    stopSequences: z.array(z.string().max(50)).optional(),
  }).optional(),
  credentials: z.record(z.string(), z.any()).optional(),
  rateLimit: z.number().int().min(1).max(10000).optional(),
  costPer1kTokens: z.number().min(0).optional(),
  enabled: z.boolean().default(true),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateAIModelInput = z.infer<typeof CreateAIModelSchema>;

export const AIModelFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  provider: z.enum(['openai', 'anthropic', 'google', 'azure', 'aws', 'local', 'custom']).optional(),
  enabled: z.boolean().optional(),
  search: sanitizeString.max(100).optional(),
  tags: z.array(sanitizeString.max(50)).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export type AIModelFilterInput = z.infer<typeof AIModelFilterSchema>;

export const CreateAIAgentSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  modelId: z.string().uuid('Identifiant du modèle invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  systemPrompt: sanitizeString.min(1, 'Prompt système requis').max(10000),
  tools: z.array(z.object({
    name: sanitizeString.min(1).max(100),
    type: z.enum(['function', 'api', 'database', 'file']),
    config: z.record(z.string(), z.any()),
    description: sanitizeString.max(500).optional(),
  })).optional(),
  memoryConfig: z.object({
    type: z.enum(['none', 'buffer', 'summary', 'vector']),
    maxTokens: z.number().int().min(100).max(100000).default(4000),
    embeddingModel: sanitizeString.max(100).optional(),
  }).optional(),
  guardrails: z.array(z.object({
    type: z.enum(['content_filter', 'output_validator', 'rate_limiter', 'custom']),
    config: z.record(z.string(), z.any()),
  })).optional(),
  enabled: z.boolean().default(true),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateAIAgentInput = z.infer<typeof CreateAIAgentSchema>;

export const UpdateAIAgentSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  description: sanitizeString.max(500).optional(),
  systemPrompt: sanitizeString.min(1).max(10000).optional(),
  tools: z.array(z.object({
    name: sanitizeString.min(1).max(100),
    type: z.enum(['function', 'api', 'database', 'file']),
    config: z.record(z.string(), z.any()),
    description: sanitizeString.max(500).optional(),
  })).optional(),
  memoryConfig: z.object({
    type: z.enum(['none', 'buffer', 'summary', 'vector']),
    maxTokens: z.number().int().min(100).max(100000).default(4000),
    embeddingModel: sanitizeString.max(100).optional(),
  }).optional(),
  guardrails: z.array(z.object({
    type: z.enum(['content_filter', 'output_validator', 'rate_limiter', 'custom']),
    config: z.record(z.string(), z.any()),
  })).optional(),
  enabled: z.boolean().optional(),
  status: z.enum(['active', 'inactive', 'training']).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateAIAgentInput = z.infer<typeof UpdateAIAgentSchema>;

export const AITaskSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  agentId: z.string().uuid('Identifiant de l\'agent invalide'),
  type: z.enum(['generation', 'classification', 'extraction', 'translation', 'summarization', 'embedding', 'custom']),
  input: z.record(z.string(), z.any()),
  config: z.record(z.string(), z.any()).optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
  timeout: z.number().int().min(1000).max(300000).default(60000),
  retryCount: z.number().int().min(0).max(5).default(3),
  callbackUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AITaskInput = z.infer<typeof AITaskSchema>;

export const AIPromptSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  template: sanitizeString.min(1, 'Modèle requis').max(50000),
  variables: z.array(z.object({
    name: sanitizeString.max(100),
    type: z.enum(['string', 'number', 'boolean', 'array', 'object']),
    required: z.boolean().default(false),
    defaultValue: z.any().optional(),
    description: sanitizeString.max(200).optional(),
  })).optional(),
  category: sanitizeString.max(100).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AIPromptInput = z.infer<typeof AIPromptSchema>;

export const AIPromptVersionSchema = z.object({
  promptId: z.string().uuid('Identifiant du prompt invalide'),
  version: sanitizeString.min(1, 'Version requise').max(20).regex(/^\d+\.\d+\.\d+$/, 'Format de version invalide'),
  template: sanitizeString.min(1, 'Modèle requis').max(50000),
  variables: z.array(z.object({
    name: sanitizeString.max(100),
    type: z.enum(['string', 'number', 'boolean', 'array', 'object']),
    required: z.boolean().default(false),
    defaultValue: z.any().optional(),
    description: sanitizeString.max(200).optional(),
  })).optional(),
  changelog: sanitizeString.max(1000).optional(),
  isActive: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AIPromptVersionInput = z.infer<typeof AIPromptVersionSchema>;

export const CreateKnowledgeBaseSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  embeddingModel: sanitizeString.min(1, 'Modèle d\'embedding requis').max(100),
  chunkSize: z.number().int().min(100).max(10000).default(1000),
  chunkOverlap: z.number().int().min(0).max(1000).default(200),
  similarityThreshold: z.number().min(0).max(1).default(0.7),
  maxResults: z.number().int().min(1).max(100).default(10),
  sources: z.array(z.enum(['upload', 'url', 'api', 'database'])).optional(),
  accessControl: z.object({
    public: z.boolean().default(false),
    allowedSchools: z.array(z.string().uuid()).optional(),
    allowedUsers: z.array(z.string().uuid()).optional(),
  }).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateKnowledgeBaseInput = z.infer<typeof CreateKnowledgeBaseSchema>;

export const UpdateKnowledgeBaseSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  description: sanitizeString.max(500).optional(),
  embeddingModel: sanitizeString.min(1).max(100).optional(),
  chunkSize: z.number().int().min(100).max(10000).optional(),
  chunkOverlap: z.number().int().min(0).max(1000).optional(),
  similarityThreshold: z.number().min(0).max(1).optional(),
  maxResults: z.number().int().min(1).max(100).optional(),
  status: z.enum(['active', 'inactive', 'indexing']).optional(),
  accessControl: z.object({
    public: z.boolean().default(false),
    allowedSchools: z.array(z.string().uuid()).optional(),
    allowedUsers: z.array(z.string().uuid()).optional(),
  }).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateKnowledgeBaseInput = z.infer<typeof UpdateKnowledgeBaseSchema>;

export const KnowledgeDocumentSchema = z.object({
  knowledgeBaseId: z.string().uuid('Identifiant de la base de connaissances invalide'),
  title: sanitizeString.min(1, 'Titre requis').max(200),
  content: sanitizeString.min(1, 'Contenu requis').max(1000000),
  source: z.enum(['upload', 'url', 'api', 'manual']),
  sourceUrl: z.string().url().optional(),
  mimeType: z.string().max(100).default('text/plain'),
  tags: z.array(sanitizeString.max(50)).max(20).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  chunkingStrategy: z.enum(['fixed', 'semantic', 'recursive']).default('recursive'),
  language: z.string().length(2).default('fr'),
});

export type KnowledgeDocumentInput = z.infer<typeof KnowledgeDocumentSchema>;

export const SemanticSearchSchema = z.object({
  knowledgeBaseId: z.string().uuid('Identifiant de la base de connaissances invalide'),
  query: sanitizeString.min(1, 'Requête requise').max(1000),
  maxResults: z.number().int().min(1).max(100).default(10),
  threshold: z.number().min(0).max(1).default(0.7),
  includeMetadata: z.boolean().default(true),
  includeHighlights: z.boolean().default(false),
  filter: z.record(z.string(), z.any()).optional(),
  rerank: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type SemanticSearchInput = z.infer<typeof SemanticSearchSchema>;

export const RAGExecutionSchema = z.object({
  knowledgeBaseId: z.string().uuid('Identifiant de la base de connaissances invalide'),
  modelId: z.string().uuid('Identifiant du modèle invalide'),
  query: sanitizeString.min(1, 'Requête requise').max(5000),
  systemPrompt: sanitizeString.max(10000).optional(),
  maxContextDocuments: z.number().int().min(1).max(20).default(5),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().min(1).max(32000).default(4096),
  stream: z.boolean().default(false),
  citationStyle: z.enum(['inline', 'footnote', 'none']).default('inline'),
  guardrails: z.array(z.object({
    type: z.enum(['content_filter', 'output_validator', 'custom']),
    config: z.record(z.string(), z.any()),
  })).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type RAGExecutionInput = z.infer<typeof RAGExecutionSchema>;

export const AIClassificationSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  modelId: z.string().uuid('Identifiant du modèle invalide'),
  text: sanitizeString.min(1, 'Texte requis').max(50000),
  categories: z.array(sanitizeString.max(100)).min(2, 'Au moins deux catégories requises').max(50),
  multiLabel: z.boolean().default(false),
  confidenceThreshold: z.number().min(0).max(1).default(0.5),
  context: sanitizeString.max(1000).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AIClassificationInput = z.infer<typeof AIClassificationSchema>;

export const AISummarizationSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  modelId: z.string().uuid('Identifiant du modèle invalide'),
  text: sanitizeString.min(1, 'Texte requis').max(100000),
  maxLength: z.number().int().min(50).max(5000).default(500),
  minLength: z.number().int().min(10).max(2000).optional(),
  style: z.enum(['bullet', 'paragraph', 'executive', 'technical']).default('paragraph'),
  language: z.string().length(2).default('fr'),
  focusAreas: z.array(sanitizeString.max(100)).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AISummarizationInput = z.infer<typeof AISummarizationSchema>;

export const AIOCRSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  imageUrl: z.string().url('URL de l\'image invalide'),
  imageBase64: sanitizeString.optional(),
  language: z.string().length(2).default('fr'),
  outputFormat: z.enum(['text', 'structured', 'markdown']).default('text'),
  extractTables: z.boolean().default(false),
  extractMetadata: z.boolean().default(false),
  preprocessImage: z.boolean().default(true),
  metadata: z.record(z.string(), z.any()).optional(),
}).refine((data) => data.imageUrl || data.imageBase64, {
  message: 'URL de l\'image ou base64 requis',
});

export type AIOCRInput = z.infer<typeof AIOCRSchema>;

export const AITranslationSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  modelId: z.string().uuid('Identifiant du modèle invalide').optional(),
  text: sanitizeString.min(1, 'Texte requis').max(50000),
  sourceLanguage: z.string().length(2, 'Code de langue source invalide'),
  targetLanguage: z.string().length(2, 'Code de langue cible invalide'),
  context: sanitizeString.max(1000).optional(),
  glossaryId: z.string().uuid().optional(),
  preserveFormatting: z.boolean().default(true),
  formal: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
}).refine((data) => data.sourceLanguage !== data.targetLanguage, {
  message: 'Les langues source et cible doivent être différentes',
});

export type AITranslationInput = z.infer<typeof AITranslationSchema>;

export const AIRecommendationSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  userId: z.string().uuid('Identifiant utilisateur invalide'),
  type: z.enum(['content', 'course', 'resource', 'peer', 'path']),
  context: z.record(z.string(), z.any()).optional(),
  maxResults: z.number().int().min(1).max(50).default(10),
  diversityFactor: z.number().min(0).max(1).default(0.3),
  excludeIds: z.array(z.string().uuid()).optional(),
  filters: z.record(z.string(), z.any()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AIRecommendationInput = z.infer<typeof AIRecommendationSchema>;

export const AIModerationSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  content: sanitizeString.min(1, 'Contenu requis').max(50000),
  contentType: z.enum(['text', 'image', 'audio', 'video']),
  categories: z.array(z.enum(['hate', 'harassment', 'violence', 'sexual', 'spam', 'self_harm', 'custom'])).optional(),
  threshold: z.number().min(0).max(1).default(0.7),
  customCategories: z.array(z.object({
    name: sanitizeString.max(100),
    keywords: z.array(z.string().max(100)),
    threshold: z.number().min(0).max(1).default(0.7),
  })).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AIModerationInput = z.infer<typeof AIModerationSchema>;

export const AIEvaluationSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  modelId: z.string().uuid('Identifiant du modèle invalide'),
  testCases: z.array(z.object({
    input: z.record(z.string(), z.any()),
    expectedOutput: z.record(z.string(), z.any()),
    tags: z.array(sanitizeString.max(50)).optional(),
  })).min(1, 'Au moins un cas de test requis').max(1000),
  metrics: z.array(z.enum(['accuracy', 'precision', 'recall', 'f1', 'latency', 'cost', 'toxicity'])),
  parallelExecution: z.boolean().default(false),
  sampleSize: z.number().int().min(1).max(10000).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type AIEvaluationInput = z.infer<typeof AIEvaluationSchema>;

// ============================================================================
// MARKETPLACE
// ============================================================================

export const CreateMarketplaceItemSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.min(1, 'Description requise').max(2000),
  type: z.enum(['plugin', 'extension', 'template', 'connector', 'integration']),
  category: sanitizeString.min(1, 'Catégorie requise').max(100),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Format de version invalide').default('1.0.0'),
  pricing: z.enum(['free', 'freemium', 'paid']),
  price: z.number().min(0).optional(),
  currency: z.string().length(3).default('EUR'),
  icon: z.string().url().optional(),
  screenshots: z.array(z.string().url()).max(10).optional(),
  documentation: z.string().url().optional(),
  repository: z.string().url().optional(),
  license: sanitizeString.max(100).optional(),
  tags: z.array(sanitizeString.max(50)).max(20).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
}).refine((data) => {
  if (data.pricing === 'paid') return data.price !== undefined && data.price > 0;
  return true;
}, {
  message: 'Le prix est requis pour les éléments payants',
  path: ['price'],
});

export type CreateMarketplaceItemInput = z.infer<typeof CreateMarketplaceItemSchema>;

export const UpdateMarketplaceItemSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  description: sanitizeString.min(1).max(2000).optional(),
  category: sanitizeString.min(1).max(100).optional(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Format de version invalide').optional(),
  pricing: z.enum(['free', 'freemium', 'paid']).optional(),
  price: z.number().min(0).optional(),
  currency: z.string().length(3).optional(),
  icon: z.string().url().optional(),
  screenshots: z.array(z.string().url()).max(10).optional(),
  documentation: z.string().url().optional(),
  repository: z.string().url().optional(),
  license: sanitizeString.max(100).optional(),
  status: z.enum(['draft', 'pending', 'approved', 'rejected', 'suspended']).optional(),
  tags: z.array(sanitizeString.max(50)).max(20).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateMarketplaceItemInput = z.infer<typeof UpdateMarketplaceItemSchema>;

export const MarketplaceFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  type: z.enum(['plugin', 'extension', 'template', 'connector', 'integration']).optional(),
  category: sanitizeString.max(100).optional(),
  pricing: z.enum(['free', 'freemium', 'paid']).optional(),
  status: z.enum(['draft', 'pending', 'approved', 'rejected', 'suspended']).optional(),
  search: sanitizeString.max(100).optional(),
  tags: z.array(sanitizeString.max(50)).optional(),
  minRating: z.number().min(0).max(5).optional(),
  maxPrice: z.number().min(0).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export type MarketplaceFilterInput = z.infer<typeof MarketplaceFilterSchema>;

export const MarketplaceReviewSchema = z.object({
  itemId: z.string().uuid('Identifiant de l\'élément invalide'),
  userId: z.string().uuid('Identifiant utilisateur invalide'),
  rating: z.number().int().min(1, 'Note minimale : 1').max(5, 'Note maximale : 5'),
  title: sanitizeString.min(1, 'Titre requis').max(200),
  content: sanitizeString.min(10, 'Contenu trop court').max(2000),
  pros: z.array(sanitizeString.max(200)).max(5).optional(),
  cons: z.array(sanitizeString.max(200)).max(5).optional(),
  wouldRecommend: z.boolean().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type MarketplaceReviewInput = z.infer<typeof MarketplaceReviewSchema>;

export const MarketplaceSubscriptionSchema = z.object({
  itemId: z.string().uuid('Identifiant de l\'élément invalide'),
  userId: z.string().uuid('Identifiant utilisateur invalide'),
  plan: z.enum(['free', 'starter', 'professional', 'enterprise']),
  billingCycle: z.enum(['monthly', 'yearly', 'one_time']),
  autoRenew: z.boolean().default(true),
  paymentMethodId: sanitizeString.max(255).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type MarketplaceSubscriptionInput = z.infer<typeof MarketplaceSubscriptionSchema>;

export const PluginInstallSchema = z.object({
  itemId: z.string().uuid('Identifiant de l\'élément invalide'),
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Format de version invalide').optional(),
  config: z.record(z.string(), z.any()).optional(),
  autoUpdate: z.boolean().default(false),
  permissions: z.array(z.enum(['read', 'write', 'admin', 'network', 'storage'])).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type PluginInstallInput = z.infer<typeof PluginInstallSchema>;

export const PluginConfigSchema = z.object({
  pluginId: z.string().uuid('Identifiant du plugin invalide'),
  config: z.record(z.string(), z.any()),
  validateSchema: z.boolean().default(true),
  restartRequired: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type PluginConfigInput = z.infer<typeof PluginConfigSchema>;

export const ExtensionInstallSchema = z.object({
  itemId: z.string().uuid('Identifiant de l\'élément invalide'),
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  targetEntity: z.enum(['dashboard', 'page', 'sidebar', 'modal', 'widget']),
  position: z.number().int().min(0).max(100).default(0),
  config: z.record(z.string(), z.any()).optional(),
  permissions: z.array(z.enum(['read', 'write', 'admin'])).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type ExtensionInstallInput = z.infer<typeof ExtensionInstallSchema>;

export const CreateDeveloperAppSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  website: z.string().url().optional(),
  redirectUris: z.array(z.string().url()).min(1, 'Au moins un URI de redirection requis'),
  allowedScopes: z.array(sanitizeString.max(100)).min(1, 'Au moins un scope autorisé requis'),
  logoUrl: z.string().url().optional(),
  contactEmail: z.string().email('Email de contact invalide'),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateDeveloperAppInput = z.infer<typeof CreateDeveloperAppSchema>;

export const UpdateDeveloperAppSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  description: sanitizeString.max(500).optional(),
  website: z.string().url().optional(),
  redirectUris: z.array(z.string().url()).min(1).optional(),
  allowedScopes: z.array(sanitizeString.max(100)).min(1).optional(),
  logoUrl: z.string().url().optional(),
  contactEmail: z.string().email('Email de contact invalide').optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateDeveloperAppInput = z.infer<typeof UpdateDeveloperAppSchema>;

export const DeveloperAppFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  search: sanitizeString.max(100).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export type DeveloperAppFilterInput = z.infer<typeof DeveloperAppFilterSchema>;

export const DeveloperSecretSchema = z.object({
  appId: z.string().uuid('Identifiant de l\'application invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  scopes: z.array(sanitizeString.max(100)).min(1, 'Au moins un scope requis'),
  expiresAt: z.string().datetime().optional(),
  ipWhitelist: z.array(z.string().ip()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type DeveloperSecretInput = z.infer<typeof DeveloperSecretSchema>;

export const SDKDownloadSchema = z.object({
  language: z.enum(['javascript', 'typescript', 'python', 'java', 'go', 'ruby', 'php', 'csharp']),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Format de version invalide').optional(),
  includeTypes: z.boolean().default(true),
  includeExamples: z.boolean().default(false),
  outputFormat: z.enum(['npm', 'pypi', 'maven', 'custom']).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type SDKDownloadInput = z.infer<typeof SDKDownloadSchema>;

export const CodeSampleSchema = z.object({
  language: z.enum(['javascript', 'typescript', 'python', 'java', 'go', 'ruby', 'php', 'csharp']),
  useCase: sanitizeString.min(1, 'Cas d\'utilisation requis').max(100),
  code: sanitizeString.min(1, 'Code requis').max(50000),
  description: sanitizeString.max(500).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CodeSampleInput = z.infer<typeof CodeSampleSchema>;

// ============================================================================
// OBSERVABILITY
// ============================================================================

export const MetricQuerySchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide').optional(),
  metricName: sanitizeString.min(1, 'Nom de la métrique requis').max(100),
  aggregation: z.enum(['avg', 'sum', 'min', 'max', 'count', 'percentile']),
  groupBy: z.array(sanitizeString.max(100)).optional(),
  filters: z.record(z.string(), z.any()).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  interval: z.enum(['1m', '5m', '15m', '1h', '1d']).default('1h'),
  percentile: z.number().min(0).max(100).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type MetricQueryInput = z.infer<typeof MetricQuerySchema>;

export const MetricFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  category: z.enum(['system', 'application', 'business', 'custom']).optional(),
  search: sanitizeString.max(100).optional(),
  tags: z.array(sanitizeString.max(50)).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export type MetricFilterInput = z.infer<typeof MetricFilterSchema>;

export const TraceFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  operationName: sanitizeString.max(200).optional(),
  minDuration: z.number().int().min(0).optional(),
  maxDuration: z.number().int().min(0).optional(),
  hasError: z.boolean().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  traceId: sanitizeString.max(100).optional(),
  spanId: sanitizeString.max(100).optional(),
  tags: z.record(z.string(), z.any()).optional(),
});

export type TraceFilterInput = z.infer<typeof TraceFilterSchema>;

export const LogFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  level: z.enum(['debug', 'info', 'warn', 'error', 'fatal']).optional(),
  search: sanitizeString.max(200).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  hasException: z.boolean().optional(),
  traceId: sanitizeString.max(100).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type LogFilterInput = z.infer<typeof LogFilterSchema>;

export const CreateAlertSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  type: z.enum(['threshold', 'anomaly', 'composite', 'slo']),
  metric: sanitizeString.min(1, 'Métrique requise').max(100),
  condition: z.object({
    operator: z.enum(['gt', 'gte', 'lt', 'lte', 'eq', 'neq']),
    threshold: z.number(),
    duration: z.number().int().min(60).max(86400).default(300),
    aggregation: z.enum(['avg', 'sum', 'min', 'max', 'count']).default('avg'),
  }),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  channels: z.array(z.object({
    type: z.enum(['email', 'sms', 'webhook', 'slack', 'teams']),
    config: z.record(z.string(), z.any()),
    enabled: z.boolean().default(true),
  })).min(1, 'Au moins un canal de notification requis'),
  schedule: z.object({
    timezone: sanitizeString.max(50).default('Europe/Paris'),
    activeHours: z.object({
      start: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM invalide'),
      end: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM invalide'),
    }).optional(),
    daysOfWeek: z.array(z.number().int().min(0).max(6)).optional(),
  }).optional(),
  enabled: z.boolean().default(true),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateAlertInput = z.infer<typeof CreateAlertSchema>;

export const UpdateAlertSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  description: sanitizeString.max(500).optional(),
  type: z.enum(['threshold', 'anomaly', 'composite', 'slo']).optional(),
  metric: sanitizeString.min(1).max(100).optional(),
  condition: z.object({
    operator: z.enum(['gt', 'gte', 'lt', 'lte', 'eq', 'neq']),
    threshold: z.number(),
    duration: z.number().int().min(60).max(86400).default(300),
    aggregation: z.enum(['avg', 'sum', 'min', 'max', 'count']).default('avg'),
  }).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  channels: z.array(z.object({
    type: z.enum(['email', 'sms', 'webhook', 'slack', 'teams']),
    config: z.record(z.string(), z.any()),
    enabled: z.boolean().default(true),
  })).optional(),
  schedule: z.object({
    timezone: sanitizeString.max(50).default('Europe/Paris'),
    activeHours: z.object({
      start: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM invalide'),
      end: z.string().regex(/^\d{2}:\d{2}$/, 'Format HH:MM invalide'),
    }).optional(),
    daysOfWeek: z.array(z.number().int().min(0).max(6)).optional(),
  }).optional(),
  enabled: z.boolean().optional(),
  status: z.enum(['active', 'inactive', 'muted']).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateAlertInput = z.infer<typeof UpdateAlertSchema>;

export const AlertFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  type: z.enum(['threshold', 'anomaly', 'composite', 'slo']).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  status: z.enum(['active', 'inactive', 'muted']).optional(),
  enabled: z.boolean().optional(),
  search: sanitizeString.max(100).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export type AlertFilterInput = z.infer<typeof AlertFilterSchema>;

export const CreateHealthCheckSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  type: z.enum(['http', 'tcp', 'dns', 'database', 'custom']),
  config: z.record(z.string(), z.any()),
  interval: z.number().int().min(10).max(3600).default(60),
  timeout: z.number().int().min(1000).max(30000).default(5000),
  retries: z.number().int().min(1).max(10).default(3),
  alertOnFailure: z.boolean().default(true),
  alertChannels: z.array(z.enum(['email', 'sms', 'webhook', 'slack'])).optional(),
  enabled: z.boolean().default(true),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateHealthCheckInput = z.infer<typeof CreateHealthCheckSchema>;

export const UpdateHealthCheckSchema = z.object({
  name: sanitizeString.min(1).max(100).optional(),
  type: z.enum(['http', 'tcp', 'dns', 'database', 'custom']).optional(),
  config: z.record(z.string(), z.any()).optional(),
  interval: z.number().int().min(10).max(3600).optional(),
  timeout: z.number().int().min(1000).max(30000).optional(),
  retries: z.number().int().min(1).max(10).optional(),
  alertOnFailure: z.boolean().optional(),
  alertChannels: z.array(z.enum(['email', 'sms', 'webhook', 'slack'])).optional(),
  enabled: z.boolean().optional(),
  status: z.enum(['healthy', 'unhealthy', 'unknown']).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type UpdateHealthCheckInput = z.infer<typeof UpdateHealthCheckSchema>;

export const DashboardCreateSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  layout: z.enum(['grid', 'freeform']).default('grid'),
  refreshInterval: z.number().int().min(0).max(3600).default(0),
  isDefault: z.boolean().default(false),
  isPublic: z.boolean().default(false),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type DashboardCreateInput = z.infer<typeof DashboardCreateSchema>;

export const DashboardWidgetSchema = z.object({
  dashboardId: z.string().uuid('Identifiant du tableau de bord invalide'),
  type: z.enum(['line', 'bar', 'pie', 'gauge', 'table', 'text', 'heatmap', 'scatter']),
  title: sanitizeString.min(1, 'Titre requis').max(100),
  position: z.object({
    x: z.number().int().min(0),
    y: z.number().int().min(0),
    width: z.number().int().min(1).max(24),
    height: z.number().int().min(1).max(24),
  }),
  config: z.record(z.string(), z.any()),
  dataSource: z.object({
    type: z.enum(['metric', 'log', 'trace', 'api', 'static']),
    query: sanitizeString.max(5000).optional(),
    refreshInterval: z.number().int().min(0).max(3600).default(0),
  }),
  thresholds: z.array(z.object({
    value: z.number(),
    color: z.string().max(20),
    label: sanitizeString.max(50).optional(),
  })).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type DashboardWidgetInput = z.infer<typeof DashboardWidgetSchema>;

export const CronMonitorSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  cronExpression: sanitizeString.min(1, 'Expression cron requise').max(100),
  timezone: sanitizeString.max(50).default('Europe/Paris'),
  expectedDuration: z.number().int().min(1000).max(86400000).default(60000),
  maxDelay: z.number().int().min(1000).max(86400000).default(300000),
  alertOnMiss: z.boolean().default(true),
  alertOnLate: z.boolean().default(true),
  alertChannels: z.array(z.enum(['email', 'sms', 'webhook', 'slack'])).optional(),
  enabled: z.boolean().default(true),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CronMonitorInput = z.infer<typeof CronMonitorSchema>;

export const QueueMonitorSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  queueType: z.enum(['rabbitmq', 'redis', 'kafka', 'sqs', 'custom']),
  config: z.record(z.string(), z.any()),
  thresholds: z.object({
    maxDepth: z.number().int().min(1).max(1000000).default(1000),
    maxAge: z.number().int().min(1000).max(86400000).default(300000),
    minConsumers: z.number().int().min(0).max(100).default(1),
    maxConsumers: z.number().int().min(1).max(1000).default(10),
  }),
  alertChannels: z.array(z.enum(['email', 'sms', 'webhook', 'slack'])).optional(),
  enabled: z.boolean().default(true),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type QueueMonitorInput = z.infer<typeof QueueMonitorSchema>;

export const PerformanceQuerySchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide').optional(),
  serviceId: z.string().uuid().optional(),
  metric: z.enum(['response_time', 'throughput', 'error_rate', 'cpu', 'memory', 'disk', 'network']),
  aggregation: z.enum(['avg', 'p50', 'p90', 'p95', 'p99', 'max', 'min']),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  interval: z.enum(['1m', '5m', '15m', '1h', '1d']).default('1h'),
  groupBy: z.array(sanitizeString.max(100)).optional(),
  filters: z.record(z.string(), z.any()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type PerformanceQueryInput = z.infer<typeof PerformanceQuerySchema>;

// ============================================================================
// SECURITY
// ============================================================================

export const CreateSecretSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100).regex(/^[a-zA-Z0-9._-]+$/, 'Format de nom invalide'),
  description: sanitizeString.max(500).optional(),
  type: z.enum(['api_key', 'password', 'token', 'certificate', 'encryption_key', 'custom']),
  value: sanitizeString.min(1, 'Valeur requise').max(10000),
  metadata: z.record(z.string(), z.any()).optional(),
  rotationPolicy: z.object({
    enabled: z.boolean().default(false),
    intervalDays: z.number().int().min(1).max(365).default(90),
    notificationDays: z.number().int().min(1).max(30).default(7),
  }).optional(),
  accessControl: z.object({
    allowedUsers: z.array(z.string().uuid()).optional(),
    allowedRoles: z.array(z.string().max(50)).optional(),
    allowedIps: z.array(z.string().ip()).optional(),
  }).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
});

export type CreateSecretInput = z.infer<typeof CreateSecretSchema>;

export const UpdateSecretSchema = z.object({
  name: sanitizeString.min(1).max(100).regex(/^[a-zA-Z0-9._-]+$/).optional(),
  description: sanitizeString.max(500).optional(),
  value: sanitizeString.min(1).max(10000).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  rotationPolicy: z.object({
    enabled: z.boolean().default(false),
    intervalDays: z.number().int().min(1).max(365).default(90),
    notificationDays: z.number().int().min(1).max(30).default(7),
  }).optional(),
  accessControl: z.object({
    allowedUsers: z.array(z.string().uuid()).optional(),
    allowedRoles: z.array(z.string().max(50)).optional(),
    allowedIps: z.array(z.string().ip()).optional(),
  }).optional(),
  status: z.enum(['active', 'inactive', 'rotating']).optional(),
  tags: z.array(sanitizeString.max(50)).max(10).optional(),
});

export type UpdateSecretInput = z.infer<typeof UpdateSecretSchema>;

export const SecretFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  type: z.enum(['api_key', 'password', 'token', 'certificate', 'encryption_key', 'custom']).optional(),
  status: z.enum(['active', 'inactive', 'rotating']).optional(),
  search: sanitizeString.max(100).optional(),
  tags: z.array(sanitizeString.max(50)).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
  expiresBefore: z.string().datetime().optional(),
});

export type SecretFilterInput = z.infer<typeof SecretFilterSchema>;

export const CreateEncryptionKeySchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  algorithm: z.enum(['AES-128', 'AES-256', 'RSA-2048', 'RSA-4096', 'ECDSA-P256', 'ECDSA-P384']),
  purpose: z.enum(['encryption', 'signing', 'tls', 'backup']),
  size: z.number().int().min(128).max(4096).optional(),
  exportable: z.boolean().default(false),
  extractable: z.boolean().default(false),
  rotationPolicy: z.object({
    enabled: z.boolean().default(true),
    intervalDays: z.number().int().min(1).max(365).default(365),
    notificationDays: z.number().int().min(1).max(30).default(30),
  }).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateEncryptionKeyInput = z.infer<typeof CreateEncryptionKeySchema>;

export const KeyRotationSchema = z.object({
  keyId: z.string().uuid('Identifiant de la clé invalide'),
  newAlgorithm: z.enum(['AES-128', 'AES-256', 'RSA-2048', 'RSA-4096', 'ECDSA-P256', 'ECDSA-P384']).optional(),
  newSize: z.number().int().min(128).max(4096).optional(),
  backupOldKey: z.boolean().default(true),
  reEncryptData: z.boolean().default(false),
  scheduledAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type KeyRotationInput = z.infer<typeof KeyRotationSchema>;

export const AuditFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  action: sanitizeString.max(100).optional(),
  resourceType: sanitizeString.max(100).optional(),
  resourceId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  outcome: z.enum(['success', 'failure', 'partial']).optional(),
  ipAddress: z.string().ip().optional(),
  search: sanitizeString.max(200).optional(),
});

export type AuditFilterInput = z.infer<typeof AuditFilterSchema>;

export const AuditExportSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  format: z.enum(['csv', 'json', 'xlsx']),
  dateRange: DateRangeSchema,
  filters: z.object({
    userId: z.string().uuid().optional(),
    action: sanitizeString.max(100).optional(),
    resourceType: sanitizeString.max(100).optional(),
    outcome: z.enum(['success', 'failure', 'partial']).optional(),
  }).optional(),
  includeMetadata: z.boolean().default(true),
  compression: z.enum(['none', 'gzip', 'zip']).default('none'),
});

export type AuditExportInput = z.infer<typeof AuditExportSchema>;

export const CreateFirewallRuleSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  priority: z.number().int().min(1).max(65535).default(1000),
  action: z.enum(['allow', 'deny', 'log']),
  direction: z.enum(['inbound', 'outbound', 'both']),
  protocol: z.enum(['tcp', 'udp', 'icmp', 'any']),
  sourceIp: z.string().ip().or(z.literal('*')).default('*'),
  destinationIp: z.string().ip().or(z.literal('*')).default('*'),
  sourcePort: z.number().int().min(1).max(65535).or(z.literal('*')).default('*'),
  destinationPort: z.number().int().min(1).max(65535).or(z.literal('*')).default('*'),
  enabled: z.boolean().default(true),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateFirewallRuleInput = z.infer<typeof CreateFirewallRuleSchema>;

export const FirewallConditionSchema = z.object({
  ruleId: z.string().uuid('Identifiant de la règle invalide'),
  conditions: z.array(z.object({
    field: z.enum(['source_ip', 'destination_ip', 'source_port', 'destination_port', 'protocol', 'user_agent', 'geo_country']),
    operator: z.enum(['eq', 'neq', 'in', 'nin', 'contains', 'regex', 'gt', 'lt', 'gte', 'lte']),
    value: z.any(),
    negate: z.boolean().default(false),
  })).min(1, 'Au moins une condition requise'),
  logic: z.enum(['and', 'or']).default('and'),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type FirewallConditionInput = z.infer<typeof FirewallConditionSchema>;

export const IPAllowlistSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  entries: z.array(z.object({
    ip: z.string().ip('Adresse IP invalide'),
    cidr: z.number().int().min(0).max(32).optional(),
    description: sanitizeString.max(200).optional(),
    expiresAt: z.string().datetime().optional(),
  })).min(1, 'Au moins une entrée requise').max(1000),
  global: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type IPAllowlistInput = z.infer<typeof IPAllowlistSchema>;

export const IPBlocklistSchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  entries: z.array(z.object({
    ip: z.string().ip('Adresse IP invalide'),
    cidr: z.number().int().min(0).max(32).optional(),
    reason: sanitizeString.max(500).optional(),
    expiresAt: z.string().datetime().optional(),
    threatType: z.enum(['brute_force', 'ddos', 'malware', 'phishing', 'scanner', 'other']).optional(),
  })).min(1, 'Au moins une entrée requise').max(10000),
  global: z.boolean().default(false),
  autoExpireDays: z.number().int().min(1).max(365).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type IPBlocklistInput = z.infer<typeof IPBlocklistSchema>;

export const SecurityPolicySchema = z.object({
  schoolId: z.string().uuid('Identifiant d\'établissement invalide'),
  name: sanitizeString.min(1, 'Nom requis').max(100),
  description: sanitizeString.max(500).optional(),
  type: z.enum(['password', 'session', 'access_control', 'data_protection', 'network', 'compliance']),
  rules: z.array(z.object({
    name: sanitizeString.min(1).max(100),
    description: sanitizeString.max(200).optional(),
    config: z.record(z.string(), z.any()),
    enabled: z.boolean().default(true),
    severity: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  })).min(1, 'Au moins une règle requise'),
  enforcementLevel: z.enum(['audit', 'warn', 'enforce']).default('warn'),
  exceptions: z.array(z.object({
    userId: z.string().uuid().optional(),
    roleId: sanitizeString.max(50).optional(),
    resourceType: sanitizeString.max(100).optional(),
    reason: sanitizeString.max(500),
    expiresAt: z.string().datetime().optional(),
  })).optional(),
  enabled: z.boolean().default(true),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type SecurityPolicyInput = z.infer<typeof SecurityPolicySchema>;

export const ComplianceFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  framework: z.enum(['rgpd', 'ferpa', 'coppa', 'hipaa', 'iso27001', 'soc2', 'custom']).optional(),
  status: z.enum(['compliant', 'non_compliant', 'partial', 'not_applicable']).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  resourceType: sanitizeString.max(100).optional(),
  search: sanitizeString.max(100).optional(),
  lastCheckedAfter: z.string().datetime().optional(),
  lastCheckedBefore: z.string().datetime().optional(),
});

export type ComplianceFilterInput = z.infer<typeof ComplianceFilterSchema>;

export const ThreatDetectionFilterSchema = PaginationSchema.extend({
  schoolId: z.string().uuid().optional(),
  threatType: z.enum(['brute_force', 'ddos', 'malware', 'phishing', 'injection', 'exfiltration', 'privilege_escalation', 'other']).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  status: z.enum(['detected', 'investigating', 'mitigated', 'resolved', 'false_positive']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  sourceIp: z.string().ip().optional(),
  targetResource: sanitizeString.max(200).optional(),
  search: sanitizeString.max(100).optional(),
});

export type ThreatDetectionFilterInput = z.infer<typeof ThreatDetectionFilterSchema>;

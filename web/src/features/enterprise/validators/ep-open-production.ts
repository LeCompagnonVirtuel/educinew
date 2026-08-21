
// ============================================================
// Domain 11: Open API Platform
// ============================================================

// --- SDK ---
export const sdkCreateSchema = z.object({
  name: z.string().min(2).max(200),
  language: z.enum(['javascript', 'typescript', 'python', 'java', 'go', 'ruby', 'csharp', 'php', 'swift', 'kotlin']),
  version: z.string().min(1).max(50),
  description: z.string().max(1000).optional(),
  repositoryUrl: z.string().url().max(2000),
  documentationUrl: z.string().url().max(2000).optional(),
  packageName: z.string().max(200).optional(),
  features: z.array(z.string().max(200)),
  compatibility: z.object({
    minApiVersion: z.string().max(50),
    maxApiVersion: z.string().max(50),
  }),
  examples: z.array(z.object({
    name: z.string().max(200),
    description: z.string().max(500),
    language: z.string().max(50),
    code: z.string().max(10000),
  })).optional(),
  enabled: z.boolean().default(true),
});

export const sdkUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  version: z.string().min(1).max(50).optional(),
  description: z.string().max(1000).optional(),
  repositoryUrl: z.string().url().max(2000).optional(),
  documentationUrl: z.string().url().max(2000).optional(),
  features: z.array(z.string().max(200)).optional(),
  compatibility: z.object({
    minApiVersion: z.string().max(50),
    maxApiVersion: z.string().max(50),
  }).optional(),
  enabled: z.boolean().optional(),
});

export const sdkQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'language', 'version', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  language: z.enum(['javascript', 'typescript', 'python', 'java', 'go', 'ruby', 'csharp', 'php', 'swift', 'kotlin']).optional(),
  enabled: z.boolean().optional(),
});

// --- SDKRelease ---
export const sdkReleaseCreateSchema = z.object({
  sdkId: z.string().uuid(),
  version: z.string().min(1).max(50),
  changelog: z.string().min(1).max(10000),
  releaseType: z.enum(['stable', 'beta', 'alpha', 'rc', 'deprecated']),
  assets: z.array(z.object({
    name: z.string().max(200),
    url: z.string().url().max(2000),
    type: z.enum(['source', 'binary', 'documentation', 'example']),
    size: z.number().int().min(0),
    sha256: z.string().max(64),
  })),
  breakingChanges: z.array(z.object({
    description: z.string().max(1000),
    migrationGuide: z.string().max(2000).optional(),
  })).optional(),
  publishedAt: z.string().datetime().optional(),
});

export const sdkReleaseUpdateSchema = z.object({
  changelog: z.string().min(1).max(10000).optional(),
  releaseType: z.enum(['stable', 'beta', 'alpha', 'rc', 'deprecated']).optional(),
  assets: z.array(z.object({
    name: z.string().max(200),
    url: z.string().url().max(2000),
    type: z.enum(['source', 'binary', 'documentation', 'example']),
    size: z.number().int().min(0),
    sha256: z.string().max(64),
  })).optional(),
  publishedAt: z.string().datetime().optional(),
});

export const sdkReleaseQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['version', 'releaseType', 'publishedAt', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  sdkId: z.string().uuid().optional(),
  releaseType: z.enum(['stable', 'beta', 'alpha', 'rc', 'deprecated']).optional(),
});

// --- CLI ---
export const cliCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  version: z.string().min(1).max(50),
  binaryName: z.string().min(1).max(100),
  platforms: z.array(z.enum(['linux_amd64', 'linux_arm64', 'darwin_amd64', 'darwin_arm64', 'windows_amd64'])),
  installMethods: z.array(z.enum(['curl', 'brew', 'npm', 'pip', 'download', 'docker'])),
  commands: z.array(z.object({
    name: z.string().max(200),
    description: z.string().max(500),
    alias: z.string().max(10).optional(),
    options: z.array(z.object({
      flag: z.string().max(50),
      description: z.string().max(200),
      required: z.boolean().default(false),
      type: z.enum(['string', 'number', 'boolean', 'array']),
      default: z.string().max(200).optional(),
    })).optional(),
  })),
  autoUpdate: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

export const cliUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  version: z.string().min(1).max(50).optional(),
  platforms: z.array(z.enum(['linux_amd64', 'linux_arm64', 'darwin_amd64', 'darwin_arm64', 'windows_amd64'])).optional(),
  installMethods: z.array(z.enum(['curl', 'brew', 'npm', 'pip', 'download', 'docker'])).optional(),
  commands: z.array(z.object({
    name: z.string().max(200),
    description: z.string().max(500),
    alias: z.string().max(10).optional(),
    options: z.array(z.object({
      flag: z.string().max(50),
      description: z.string().max(200),
      required: z.boolean().default(false),
      type: z.enum(['string', 'number', 'boolean', 'array']),
      default: z.string().max(200).optional(),
    })).optional(),
  })).optional(),
  autoUpdate: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const cliQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'version', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- APIDocumentation ---
export const apiDocumentationCreateSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().max(5000).optional(),
  version: z.string().min(1).max(50),
  baseUrl: z.string().url().max(2000),
  specType: z.enum(['openapi_3', 'openapi_3_1', 'graphql', 'grpc', 'custom']),
  specUrl: z.string().url().max(2000).optional(),
  specContent: z.string().max(100000).optional(),
  authentication: z.array(z.enum(['api_key', 'oauth2', 'bearer', 'basic', 'none'])),
  rateLimit: z.object({
    requests: z.number().int().min(1),
    window: z.enum(['second', 'minute', 'hour', 'day']),
  }).optional(),
  contact: z.object({
    name: z.string().max(200).optional(),
    email: z.string().email().max(200).optional(),
    url: z.string().url().max(2000).optional(),
  }).optional(),
  tags: z.array(z.string().max(200)).optional(),
  enabled: z.boolean().default(true),
});

export const apiDocumentationUpdateSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().max(5000).optional(),
  version: z.string().min(1).max(50).optional(),
  baseUrl: z.string().url().max(2000).optional(),
  specUrl: z.string().url().max(2000).optional(),
  specContent: z.string().max(100000).optional(),
  authentication: z.array(z.enum(['api_key', 'oauth2', 'bearer', 'basic', 'none'])).optional(),
  rateLimit: z.object({
    requests: z.number().int().min(1),
    window: z.enum(['second', 'minute', 'hour', 'day']),
  }).optional(),
  tags: z.array(z.string().max(200)).optional(),
  enabled: z.boolean().optional(),
});

export const apiDocumentationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'version', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  specType: z.enum(['openapi_3', 'openapi_3_1', 'graphql', 'grpc', 'custom']).optional(),
  enabled: z.boolean().optional(),
});

// --- OpenAPISpec ---
export const openApiSpecCreateSchema = z.object({
  name: z.string().min(2).max(200),
  version: z.string().min(1).max(50),
  spec: z.record(z.string(), z.unknown()),
  format: z.enum(['json', 'yaml', 'both']),
  validation: z.object({
    strict: z.boolean().default(true),
    linting: z.boolean().default(true),
    rules: z.array(z.string().max(200)).optional(),
  }),
  endpoints: z.number().int().min(0).optional(),
  schemas: z.number().int().min(0).optional(),
  publishedAt: z.string().datetime().optional(),
  enabled: z.boolean().default(true),
});

export const openApiSpecUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  version: z.string().min(1).max(50).optional(),
  spec: z.record(z.string(), z.unknown()).optional(),
  format: z.enum(['json', 'yaml', 'both']).optional(),
  validation: z.object({
    strict: z.boolean().default(true),
    linting: z.boolean().default(true),
    rules: z.array(z.string().max(200)).optional(),
  }).optional(),
  publishedAt: z.string().datetime().optional(),
  enabled: z.boolean().optional(),
});

export const openApiSpecQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'version', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  format: z.enum(['json', 'yaml', 'both']).optional(),
  enabled: z.boolean().optional(),
});

// --- GraphQLSchema ---
export const graphQLSchemaCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  sdl: z.string().min(1).max(100000),
  endpoint: z.string().url().max(2000),
  introspection: z.boolean().default(true),
  depthLimit: z.number().int().min(1).max(20).default(10),
  complexityLimit: z.number().int().min(1).max(10000).default(1000),
  queryTimeout: z.number().int().min(100).max(30000).default(5000),
  persistedQueries: z.boolean().default(false),
  subscriptions: z.boolean().default(false),
  playground: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

export const graphQLSchemaUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  sdl: z.string().min(1).max(100000).optional(),
  endpoint: z.string().url().max(2000).optional(),
  introspection: z.boolean().optional(),
  depthLimit: z.number().int().min(1).max(20).optional(),
  complexityLimit: z.number().int().min(1).max(10000).optional(),
  queryTimeout: z.number().int().min(100).max(30000).optional(),
  persistedQueries: z.boolean().optional(),
  subscriptions: z.boolean().optional(),
  playground: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const graphQLSchemaQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- DeveloperPortal ---
export const developerPortalCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  domain: z.string().max(253),
  branding: z.object({
    logo: z.string().url().max(2000).optional(),
    primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
    favicon: z.string().url().max(2000).optional(),
  }).optional(),
  sections: z.array(z.enum(['getting_started', 'api_reference', 'sdks', 'tutorials', 'changelog', 'support'])),
  authentication: z.object({
    selfService: z.boolean().default(true),
    approvalRequired: z.boolean().default(false),
    sso: z.boolean().default(false),
  }),
  analytics: z.boolean().default(true),
  feedback: z.boolean().default(true),
  customPages: z.array(z.object({
    title: z.string().max(200),
    slug: z.string().max(200),
    content: z.string().max(50000),
    published: z.boolean().default(false),
  })).optional(),
  enabled: z.boolean().default(true),
});

export const developerPortalUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  domain: z.string().max(253).optional(),
  branding: z.object({
    logo: z.string().url().max(2000).optional(),
    primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
    favicon: z.string().url().max(2000).optional(),
  }).optional(),
  sections: z.array(z.enum(['getting_started', 'api_reference', 'sdks', 'tutorials', 'changelog', 'support'])).optional(),
  authentication: z.object({
    selfService: z.boolean().default(true),
    approvalRequired: z.boolean().default(false),
    sso: z.boolean().default(false),
  }).optional(),
  analytics: z.boolean().optional(),
  feedback: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const developerPortalQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'domain', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- DeveloperApp ---
export const developerAppCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  developerId: z.string().uuid(),
  website: z.string().url().max(2000).optional(),
  redirectUris: z.array(z.string().url().max(2000)),
  scopes: z.array(z.string().max(200)),
  grantTypes: z.array(z.enum(['authorization_code', 'client_credentials', 'refresh_token', 'implicit'])),
  rateLimit: z.number().int().min(1).max(100000).default(1000),
  logo: z.string().url().max(2000).optional(),
  privacyPolicy: z.string().url().max(2000).optional(),
  termsOfService: z.string().url().max(2000).optional(),
  enabled: z.boolean().default(true),
});

export const developerAppUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  website: z.string().url().max(2000).optional(),
  redirectUris: z.array(z.string().url().max(2000)).optional(),
  scopes: z.array(z.string().max(200)).optional(),
  grantTypes: z.array(z.enum(['authorization_code', 'client_credentials', 'refresh_token', 'implicit'])).optional(),
  rateLimit: z.number().int().min(1).max(100000).optional(),
  logo: z.string().url().max(2000).optional(),
  privacyPolicy: z.string().url().max(2000).optional(),
  termsOfService: z.string().url().max(2000).optional(),
  enabled: z.boolean().optional(),
});

export const developerAppQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  developerId: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
});

// --- Sandbox ---
export const sandboxCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  baseUrl: z.string().url().max(2000),
  type: z.enum(['mock', 'stub', 'record_replay', 'passthrough']),
  dataMode: z.enum(['seed', 'realistic', 'random', 'empty']),
  seedData: z.record(z.string(), z.unknown()).optional(),
  maxDuration: z.number().int().min(60).max(86400).default(3600),
  autoReset: z.boolean().default(true),
  resetInterval: z.number().int().min(60).max(86400).optional(),
  rateLimit: z.number().int().min(1).max(100000).default(100),
  logging: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

export const sandboxUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['mock', 'stub', 'record_replay', 'passthrough']).optional(),
  dataMode: z.enum(['seed', 'realistic', 'random', 'empty']).optional(),
  seedData: z.record(z.string(), z.unknown()).optional(),
  maxDuration: z.number().int().min(60).max(86400).optional(),
  autoReset: z.boolean().optional(),
  resetInterval: z.number().int().min(60).max(86400).optional(),
  rateLimit: z.number().int().min(1).max(100000).optional(),
  logging: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const sandboxQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['mock', 'stub', 'record_replay', 'passthrough']).optional(),
  enabled: z.boolean().optional(),
});

// --- SandboxInstance ---
export const sandboxInstanceCreateSchema = z.object({
  sandboxId: z.string().uuid(),
  name: z.string().min(2).max(200),
  status: z.enum(['creating', 'running', 'paused', 'stopped', 'expired', 'error']),
  environment: z.enum(['production', 'staging', 'development']),
  ttl: z.number().int().min(60).max(86400).default(3600),
  endpoint: z.string().url().max(2000).optional(),
  apiKey: z.string().max(500).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const sandboxInstanceUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  status: z.enum(['creating', 'running', 'paused', 'stopped', 'expired', 'error']).optional(),
  ttl: z.number().int().min(60).max(86400).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const sandboxInstanceQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  sandboxId: z.string().uuid().optional(),
  status: z.enum(['creating', 'running', 'paused', 'stopped', 'expired', 'error']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
});

// --- APIUsage ---
export const apiUsageCreateSchema = z.object({
  appId: z.string().uuid(),
  endpoint: z.string().min(1).max(500),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  timestamp: z.string().datetime(),
  responseTimeMs: z.number().int().min(0),
  statusCode: z.number().int().min(100).max(599),
  requestSize: z.number().int().min(0).optional(),
  responseSize: z.number().int().min(0).optional(),
  userId: z.string().uuid().optional(),
  tenantId: z.string().uuid().optional(),
  region: z.string().max(100).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const apiUsageUpdateSchema = z.object({
  metadata: z.record(z.string(), z.string()).optional(),
});

export const apiUsageQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['endpoint', 'responseTimeMs', 'statusCode', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  appId: z.string().uuid().optional(),
  endpoint: z.string().max(500).optional(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional(),
  statusCode: z.number().int().min(100).max(599).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  tenantId: z.string().uuid().optional(),
});

// --- Webhook ---
export const webhookCreateSchema = z.object({
  name: z.string().min(2).max(200),
  url: z.string().url().max(2000),
  events: z.array(z.string().max(200)),
  secret: z.string().min(16).max(256),
  headers: z.record(z.string(), z.string()).optional(),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
  }).optional(),
  filtering: z.object({
    includePaths: z.array(z.string().max(200)).optional(),
    excludePaths: z.array(z.string().max(200)).optional(),
    includeStatuses: z.array(z.number().int().min(100).max(599)).optional(),
  }).optional(),
  enabled: z.boolean().default(true),
});

export const webhookUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  url: z.string().url().max(2000).optional(),
  events: z.array(z.string().max(200)).optional(),
  secret: z.string().min(16).max(256).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
  }).optional(),
  filtering: z.object({
    includePaths: z.array(z.string().max(200)).optional(),
    excludePaths: z.array(z.string().max(200)).optional(),
    includeStatuses: z.array(z.number().int().min(100).max(599)).optional(),
  }).optional(),
  enabled: z.boolean().optional(),
});

export const webhookQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- DeveloperDocumentation ---
export const developerDocumentationCreateSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  content: z.string().min(1).max(100000),
  format: z.enum(['markdown', 'html', 'mdx']),
  category: z.enum(['guide', 'tutorial', 'reference', 'how_to', 'faq', 'changelog', 'migration']),
  tags: z.array(z.string().max(200)).optional(),
  visibility: z.enum(['public', 'private', 'beta']).default('public'),
  order: z.number().int().min(0).default(0),
  author: z.string().uuid(),
  lastReviewedAt: z.string().datetime().optional(),
  enabled: z.boolean().default(true),
});

export const developerDocumentationUpdateSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/).optional(),
  content: z.string().min(1).max(100000).optional(),
  format: z.enum(['markdown', 'html', 'mdx']).optional(),
  category: z.enum(['guide', 'tutorial', 'reference', 'how_to', 'faq', 'changelog', 'migration']).optional(),
  tags: z.array(z.string().max(200)).optional(),
  visibility: z.enum(['public', 'private', 'beta']).optional(),
  order: z.number().int().min(0).optional(),
  lastReviewedAt: z.string().datetime().optional(),
  enabled: z.boolean().optional(),
});

export const developerDocumentationQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'order', 'created_at']).default('order'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().max(200).optional(),
  category: z.enum(['guide', 'tutorial', 'reference', 'how_to', 'faq', 'changelog', 'migration']).optional(),
  visibility: z.enum(['public', 'private', 'beta']).optional(),
  tags: z.array(z.string().max(200)).optional(),
  enabled: z.boolean().optional(),
});

// --- SDKExample ---
export const sdkExampleCreateSchema = z.object({
  sdkId: z.string().uuid(),
  title: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  language: z.string().min(1).max(50),
  category: z.enum(['getting_started', 'authentication', 'crud', 'pagination', 'error_handling', 'webhooks', 'custom']),
  code: z.string().min(1).max(50000),
  expectedOutput: z.string().max(10000).optional(),
  prerequisites: z.array(z.string().max(500)).optional(),
  dependencies: z.array(z.string().max(200)).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  order: z.number().int().min(0).default(0),
  enabled: z.boolean().default(true),
});

export const sdkExampleUpdateSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  language: z.string().min(1).max(50).optional(),
  category: z.enum(['getting_started', 'authentication', 'crud', 'pagination', 'error_handling', 'webhooks', 'custom']).optional(),
  code: z.string().min(1).max(50000).optional(),
  expectedOutput: z.string().max(10000).optional(),
  prerequisites: z.array(z.string().max(500)).optional(),
  dependencies: z.array(z.string().max(200)).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  order: z.number().int().min(0).optional(),
  enabled: z.boolean().optional(),
});

export const sdkExampleQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'difficulty', 'order', 'created_at']).default('order'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().max(200).optional(),
  sdkId: z.string().uuid().optional(),
  language: z.string().max(50).optional(),
  category: z.enum(['getting_started', 'authentication', 'crud', 'pagination', 'error_handling', 'webhooks', 'custom']).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  enabled: z.boolean().optional(),
});

// --- RateLimit ---
export const rateLimitCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  scope: z.enum(['global', 'per_app', 'per_user', 'per_endpoint', 'per_tenant']),
  limits: z.array(z.object({
    window: z.enum(['second', 'minute', 'hour', 'day']),
    maxRequests: z.number().int().min(1),
    burst: z.number().int().min(1).optional(),
  })),
  responseHeaders: z.object({
    remaining: z.boolean().default(true),
    limit: z.boolean().default(true),
    reset: z.boolean().default(true),
    retryAfter: z.boolean().default(true),
  }).optional(),
  action: z.enum(['throttle', 'reject', 'queue']),
  retryAfter: z.number().int().min(1).max(300).default(60),
  whitelistedIps: z.array(z.string().ip()).optional(),
  enabled: z.boolean().default(true),
});

export const rateLimitUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  scope: z.enum(['global', 'per_app', 'per_user', 'per_endpoint', 'per_tenant']).optional(),
  limits: z.array(z.object({
    window: z.enum(['second', 'minute', 'hour', 'day']),
    maxRequests: z.number().int().min(1),
    burst: z.number().int().min(1).optional(),
  })).optional(),
  action: z.enum(['throttle', 'reject', 'queue']).optional(),
  retryAfter: z.number().int().min(1).max(300).optional(),
  whitelistedIps: z.array(z.string().ip()).optional(),
  enabled: z.boolean().optional(),
});

export const rateLimitQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'scope', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  scope: z.enum(['global', 'per_app', 'per_user', 'per_endpoint', 'per_tenant']).optional(),
  enabled: z.boolean().optional(),
});

// --- OAuthApp ---
export const oauthAppCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  website: z.string().url().max(2000).optional(),
  logoUrl: z.string().url().max(2000).optional(),
  redirectUris: z.array(z.string().url().max(2000)),
  allowedGrantTypes: z.array(z.enum(['authorization_code', 'client_credentials', 'refresh_token', 'implicit', 'password'])),
  allowedScopes: z.array(z.string().max(200)),
  tokenEndpointAuthMethod: z.enum(['client_secret_basic', 'client_secret_post', 'none']).default('client_secret_basic'),
  accessTokenType: z.enum(['bearer', 'jwt']).default('bearer'),
  accessTokenLifetime: z.number().int().min(60).max(86400).default(3600),
  refreshTokenLifetime: z.number().int().min(60).max(2592000).default(86400),
  enabled: z.boolean().default(true),
});

export const oauthAppUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  website: z.string().url().max(2000).optional(),
  logoUrl: z.string().url().max(2000).optional(),
  redirectUris: z.array(z.string().url().max(2000)).optional(),
  allowedGrantTypes: z.array(z.enum(['authorization_code', 'client_credentials', 'refresh_token', 'implicit', 'password'])).optional(),
  allowedScopes: z.array(z.string().max(200)).optional(),
  tokenEndpointAuthMethod: z.enum(['client_secret_basic', 'client_secret_post', 'none']).optional(),
  accessTokenType: z.enum(['bearer', 'jwt']).optional(),
  accessTokenLifetime: z.number().int().min(60).max(86400).optional(),
  refreshTokenLifetime: z.number().int().min(60).max(2592000).optional(),
  enabled: z.boolean().optional(),
});

export const oauthAppQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// ============================================================
// Domain 12: Production Operations
// ============================================================

// --- ProductionHealthCheck ---
export const productionHealthCheckCreateSchema = z.object({
  name: z.string().min(2).max(200),
  serviceUrl: z.string().url().max(2000),
  checkType: z.enum(['http', 'tcp', 'dns', 'ssl', 'custom']),
  interval: z.number().int().min(1).max(3600).default(30),
  timeout: z.number().int().min(1).max(300).default(10),
  expectedStatus: z.number().int().min(100).max(599).default(200),
  expectedBody: z.string().max(1000).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  retries: z.number().int().min(0).max(10).default(3),
  alertChannels: z.array(z.enum(['email', 'slack', 'webhook', 'pagerduty'])),
  sla: z.object({
    uptime: z.number().min(0).max(100).default(99.9),
    responseTime: z.number().int().min(0).max(30000).default(5000),
  }).optional(),
  enabled: z.boolean().default(true),
});

export const productionHealthCheckUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  serviceUrl: z.string().url().max(2000).optional(),
  interval: z.number().int().min(1).max(3600).optional(),
  timeout: z.number().int().min(1).max(300).optional(),
  expectedStatus: z.number().int().min(100).max(599).optional(),
  expectedBody: z.string().max(1000).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  retries: z.number().int().min(0).max(10).optional(),
  alertChannels: z.array(z.enum(['email', 'slack', 'webhook', 'pagerduty'])).optional(),
  enabled: z.boolean().optional(),
});

export const productionHealthCheckQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'checkType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  checkType: z.enum(['http', 'tcp', 'dns', 'ssl', 'custom']).optional(),
  enabled: z.boolean().optional(),
});

// --- DiagnosticRun ---
export const diagnosticRunCreateSchema = z.object({
  name: z.string().min(2).max(200),
  target: z.string().min(1).max(200),
  targetType: z.enum(['service', 'database', 'cache', 'network', 'storage', 'full_stack']),
  checks: z.array(z.enum([
    'connectivity', 'dns_resolution', 'ssl_certificate', 'disk_space',
    'memory_usage', 'cpu_usage', 'network_latency', 'database_pool',
    'cache_hit_rate', 'queue_depth', 'log_rotation', 'file_permissions',
  ])),
  environment: z.enum(['production', 'staging', 'development']),
  scheduledAt: z.string().datetime().optional(),
  notifyChannels: z.array(z.enum(['email', 'slack', 'webhook'])),
  enabled: z.boolean().default(true),
});

export const diagnosticRunUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  checks: z.array(z.enum([
    'connectivity', 'dns_resolution', 'ssl_certificate', 'disk_space',
    'memory_usage', 'cpu_usage', 'network_latency', 'database_pool',
    'cache_hit_rate', 'queue_depth', 'log_rotation', 'file_permissions',
  ])).optional(),
  scheduledAt: z.string().datetime().optional(),
  enabled: z.boolean().optional(),
});

export const diagnosticRunQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'target', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  targetType: z.enum(['service', 'database', 'cache', 'network', 'storage', 'full_stack']).optional(),
  environment: z.enum(['production', 'staging', 'development']).optional(),
  enabled: z.boolean().optional(),
});

// --- ProductionAudit ---
export const productionAuditCreateSchema = z.object({
  name: z.string().min(2).max(200),
  scope: z.enum(['infrastructure', 'security', 'compliance', 'performance', 'cost', 'full']),
  targets: z.array(z.string().max(200)),
  standards: z.array(z.enum(['iso27001', 'soc2', 'gdpr', 'hipaa', 'pci_dss', 'custom'])),
  schedule: z.string().max(100).optional(),
  autoExecute: z.boolean().default(false),
  reportFormat: z.enum(['pdf', 'html', 'json', 'csv']).default('pdf'),
  recipients: z.array(z.string().email()),
  enabled: z.boolean().default(true),
});

export const productionAuditUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  scope: z.enum(['infrastructure', 'security', 'compliance', 'performance', 'cost', 'full']).optional(),
  targets: z.array(z.string().max(200)).optional(),
  standards: z.array(z.enum(['iso27001', 'soc2', 'gdpr', 'hipaa', 'pci_dss', 'custom'])).optional(),
  schedule: z.string().max(100).optional(),
  autoExecute: z.boolean().optional(),
  reportFormat: z.enum(['pdf', 'html', 'json', 'csv']).optional(),
  recipients: z.array(z.string().email()).optional(),
  enabled: z.boolean().optional(),
});

export const productionAuditQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'scope', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  scope: z.enum(['infrastructure', 'security', 'compliance', 'performance', 'cost', 'full']).optional(),
  enabled: z.boolean().optional(),
});

// --- PerformanceBenchmark ---
export const performanceBenchmarkCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  targetUrl: z.string().url().max(2000),
  benchmarkType: z.enum(['response_time', 'throughput', 'concurrent_users', 'stress', 'endurance']),
  config: z.object({
    duration: z.number().int().min(1).max(86400),
    concurrency: z.number().int().min(1).max(10000),
    rampUp: z.number().int().min(0).max(3600).default(0),
    requestsPerSecond: z.number().int().min(1).max(100000).optional(),
  }),
  thresholds: z.object({
    avgResponseTime: z.number().int().min(0).max(60000),
    p95ResponseTime: z.number().int().min(0).max(60000),
    p99ResponseTime: z.number().int().min(0).max(60000),
    errorRate: z.number().min(0).max(100),
    throughput: z.number().min(0),
  }),
  schedule: z.string().max(100).optional(),
  enabled: z.boolean().default(true),
});

export const performanceBenchmarkUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  targetUrl: z.string().url().max(2000).optional(),
  benchmarkType: z.enum(['response_time', 'throughput', 'concurrent_users', 'stress', 'endurance']).optional(),
  config: z.object({
    duration: z.number().int().min(1).max(86400),
    concurrency: z.number().int().min(1).max(10000),
    rampUp: z.number().int().min(0).max(3600).default(0),
    requestsPerSecond: z.number().int().min(1).max(100000).optional(),
  }).optional(),
  thresholds: z.object({
    avgResponseTime: z.number().int().min(0).max(60000),
    p95ResponseTime: z.number().int().min(0).max(60000),
    p99ResponseTime: z.number().int().min(0).max(60000),
    errorRate: z.number().min(0).max(100),
    throughput: z.number().min(0),
  }).optional(),
  schedule: z.string().max(100).optional(),
  enabled: z.boolean().optional(),
});

export const performanceBenchmarkQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'benchmarkType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  benchmarkType: z.enum(['response_time', 'throughput', 'concurrent_users', 'stress', 'endurance']).optional(),
  enabled: z.boolean().optional(),
});

// --- SecurityBenchmark ---
export const securityBenchmarkCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  target: z.string().min(1).max(500),
  targetType: z.enum(['url', 'ip', 'domain', 'container', 'infrastructure']),
  checks: z.array(z.enum([
    'ssl_grade', 'headers', 'vulnerabilities', 'cipher_suites',
    'certificate_chain', 'hsts', 'csp', 'xss_protection',
  ])),
  schedule: z.string().max(100).optional(),
  thresholds: z.object({
    minGrade: z.enum(['A+', 'A', 'A-', 'B', 'C', 'D', 'F']),
    maxVulnerabilities: z.number().int().min(0).max(1000).default(0),
  }).optional(),
  enabled: z.boolean().default(true),
});

export const securityBenchmarkUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  target: z.string().min(1).max(500).optional(),
  checks: z.array(z.enum([
    'ssl_grade', 'headers', 'vulnerabilities', 'cipher_suites',
    'certificate_chain', 'hsts', 'csp', 'xss_protection',
  ])).optional(),
  schedule: z.string().max(100).optional(),
  thresholds: z.object({
    minGrade: z.enum(['A+', 'A', 'A-', 'B', 'C', 'D', 'F']),
    maxVulnerabilities: z.number().int().min(0).max(1000).default(0),
  }).optional(),
  enabled: z.boolean().optional(),
});

export const securityBenchmarkQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'target', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  targetType: z.enum(['url', 'ip', 'domain', 'container', 'infrastructure']).optional(),
  enabled: z.boolean().optional(),
});

// --- ScalabilityBenchmark ---
export const scalabilityBenchmarkCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  targetUrl: z.string().url().max(2000),
  scenarios: z.array(z.object({
    name: z.string().max(200),
    concurrency: z.number().int().min(1).max(100000),
    duration: z.number().int().min(1).max(86400),
    rampUp: z.number().int().min(0).max(3600),
  })),
  metrics: z.array(z.enum(['response_time', 'throughput', 'error_rate', 'cpu', 'memory', 'connections'])),
  breakingPoint: z.object({
    maxErrorRate: z.number().min(0).max(100).default(5),
    maxResponseTime: z.number().int().min(0).max(60000).default(5000),
  }),
  enabled: z.boolean().default(true),
});

export const scalabilityBenchmarkUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  targetUrl: z.string().url().max(2000).optional(),
  scenarios: z.array(z.object({
    name: z.string().max(200),
    concurrency: z.number().int().min(1).max(100000),
    duration: z.number().int().min(1).max(86400),
    rampUp: z.number().int().min(0).max(3600),
  })).optional(),
  metrics: z.array(z.enum(['response_time', 'throughput', 'error_rate', 'cpu', 'memory', 'connections'])).optional(),
  breakingPoint: z.object({
    maxErrorRate: z.number().min(0).max(100).default(5),
    maxResponseTime: z.number().int().min(0).max(60000).default(5000),
  }).optional(),
  enabled: z.boolean().optional(),
});

export const scalabilityBenchmarkQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- CompatibilityMatrix ---
export const compatibilityMatrixCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  product: z.string().min(1).max(200),
  matrix: z.array(z.object({
    category: z.enum(['browser', 'os', 'device', 'api_version', 'database', 'runtime']),
    name: z.string().max(200),
    versions: z.array(z.string().max(100)),
    status: z.enum(['supported', 'deprecated', 'unsupported', 'experimental']),
  })),
  testCases: z.number().int().min(0).default(0),
  lastUpdated: z.string().datetime().optional(),
  enabled: z.boolean().default(true),
});

export const compatibilityMatrixUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  matrix: z.array(z.object({
    category: z.enum(['browser', 'os', 'device', 'api_version', 'database', 'runtime']),
    name: z.string().max(200),
    versions: z.array(z.string().max(100)),
    status: z.enum(['supported', 'deprecated', 'unsupported', 'experimental']),
  })).optional(),
  lastUpdated: z.string().datetime().optional(),
  enabled: z.boolean().optional(),
});

export const compatibilityMatrixQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'product', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- ProductionCertificate ---
export const productionCertificateCreateSchema = z.object({
  name: z.string().min(2).max(200),
  domain: z.string().min(1).max(253),
  type: z.enum(['lets_encrypt', 'self_signed', 'commercial', 'wildcard', 'san']),
  autoRenew: z.boolean().default(true),
  renewBeforeDays: z.number().int().min(1).max(90).default(30),
  provider: z.enum(['lets_encrypt', 'aws_acm', 'cloudflare', 'digicert', 'custom']),
  status: z.enum(['pending', 'active', 'expired', 'revoked']),
  autoDeploy: z.boolean().default(true),
  deployTargets: z.array(z.string().max(200)).optional(),
  notifyChannels: z.array(z.enum(['email', 'slack', 'webhook'])),
  enabled: z.boolean().default(true),
});

export const productionCertificateUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  autoRenew: z.boolean().optional(),
  renewBeforeDays: z.number().int().min(1).max(90).optional(),
  autoDeploy: z.boolean().optional(),
  deployTargets: z.array(z.string().max(200)).optional(),
  notifyChannels: z.array(z.enum(['email', 'slack', 'webhook'])).optional(),
  enabled: z.boolean().optional(),
});

export const productionCertificateQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'domain', 'status', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['lets_encrypt', 'self_signed', 'commercial', 'wildcard', 'san']).optional(),
  status: z.enum(['pending', 'active', 'expired', 'revoked']).optional(),
  enabled: z.boolean().optional(),
});

// --- LoadTest ---
export const loadTestCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  targetUrl: z.string().url().max(2000),
  testType: z.enum(['constant', 'ramping', 'spike', 'soak', 'step']),
  config: z.object({
    duration: z.number().int().min(1).max(86400),
    concurrency: z.number().int().min(1).max(100000),
    rampUp: z.number().int().min(0).max(3600).optional(),
    rampDown: z.number().int().min(0).max(3600).optional(),
    targetRps: z.number().int().min(1).max(1000000).optional(),
  }),
  scenarios: z.array(z.object({
    name: z.string().max(200),
    weight: z.number().int().min(1).max(100),
    requests: z.array(z.object({
      method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
      path: z.string().max(500),
      headers: z.record(z.string(), z.string()).optional(),
      body: z.string().max(50000).optional(),
    })),
  })),
  thresholds: z.object({
    avgResponseTime: z.number().int().min(0).max(60000).default(2000),
    p95ResponseTime: z.number().int().min(0).max(60000).default(5000),
    errorRate: z.number().min(0).max(100).default(1),
  }),
  enabled: z.boolean().default(true),
});

export const loadTestUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  targetUrl: z.string().url().max(2000).optional(),
  testType: z.enum(['constant', 'ramping', 'spike', 'soak', 'step']).optional(),
  config: z.object({
    duration: z.number().int().min(1).max(86400),
    concurrency: z.number().int().min(1).max(100000),
    rampUp: z.number().int().min(0).max(3600).optional(),
    rampDown: z.number().int().min(0).max(3600).optional(),
    targetRps: z.number().int().min(1).max(1000000).optional(),
  }).optional(),
  scenarios: z.array(z.object({
    name: z.string().max(200),
    weight: z.number().int().min(1).max(100),
    requests: z.array(z.object({
      method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
      path: z.string().max(500),
      headers: z.record(z.string(), z.string()).optional(),
      body: z.string().max(50000).optional(),
    })),
  })).optional(),
  thresholds: z.object({
    avgResponseTime: z.number().int().min(0).max(60000).default(2000),
    p95ResponseTime: z.number().int().min(0).max(60000).default(5000),
    errorRate: z.number().min(0).max(100).default(1),
  }).optional(),
  enabled: z.boolean().optional(),
});

export const loadTestQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'testType', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  testType: z.enum(['constant', 'ramping', 'spike', 'soak', 'step']).optional(),
  enabled: z.boolean().optional(),
});

// --- StressTest ---
export const stressTestCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  targetUrl: z.string().url().max(2000),
  config: z.object({
    startConcurrency: z.number().int().min(1).max(1000),
    maxConcurrency: z.number().int().min(1).max(100000),
    stepSize: z.number().int().min(1).max(10000),
    stepDuration: z.number().int().min(1).max(3600),
    duration: z.number().int().min(1).max(86400),
  }),
  thresholds: z.object({
    maxErrorRate: z.number().min(0).max(100).default(10),
    maxResponseTime: z.number().int().min(0).max(60000).default(10000),
    breakingPointConcurrency: z.number().int().min(1).max(100000).optional(),
  }),
  enabled: z.boolean().default(true),
});

export const stressTestUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  targetUrl: z.string().url().max(2000).optional(),
  config: z.object({
    startConcurrency: z.number().int().min(1).max(1000),
    maxConcurrency: z.number().int().min(1).max(100000),
    stepSize: z.number().int().min(1).max(10000),
    stepDuration: z.number().int().min(1).max(3600),
    duration: z.number().int().min(1).max(86400),
  }).optional(),
  thresholds: z.object({
    maxErrorRate: z.number().min(0).max(100).default(10),
    maxResponseTime: z.number().int().min(0).max(60000).default(10000),
    breakingPointConcurrency: z.number().int().min(1).max(100000).optional(),
  }).optional(),
  enabled: z.boolean().optional(),
});

export const stressTestQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- EnduranceTest ---
export const enduranceTestCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  targetUrl: z.string().url().max(2000),
  config: z.object({
    duration: z.number().int().min(60).max(259200),
    concurrency: z.number().int().min(1).max(100000),
    rampUp: z.number().int().min(0).max(3600).default(0),
    steadyStateDuration: z.number().int().min(60).max(259200),
  }),
  thresholds: z.object({
    avgResponseTime: z.number().int().min(0).max(60000).default(2000),
    maxMemoryGrowth: z.number().min(0).max(100).default(10),
    maxErrorRate: z.number().min(0).max(100).default(1),
    maxCpuUsage: z.number().min(0).max(100).default(80),
  }),
  samplesPerMinute: z.number().int().min(1).max(1000).default(10),
  enabled: z.boolean().default(true),
});

export const enduranceTestUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  targetUrl: z.string().url().max(2000).optional(),
  config: z.object({
    duration: z.number().int().min(60).max(259200),
    concurrency: z.number().int().min(1).max(100000),
    rampUp: z.number().int().min(0).max(3600).default(0),
    steadyStateDuration: z.number().int().min(60).max(259200),
  }).optional(),
  thresholds: z.object({
    avgResponseTime: z.number().int().min(0).max(60000).default(2000),
    maxMemoryGrowth: z.number().min(0).max(100).default(10),
    maxErrorRate: z.number().min(0).max(100).default(1),
    maxCpuUsage: z.number().min(0).max(100).default(80),
  }).optional(),
  enabled: z.boolean().optional(),
});

export const enduranceTestQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  enabled: z.boolean().optional(),
});

// --- CapacityPlan ---
export const capacityPlanCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  resource: z.enum(['compute', 'storage', 'database', 'cache', 'network', 'cdn']),
  currentCapacity: z.number().int().min(0),
  projectedGrowth: z.array(z.object({
    period: z.string().max(100),
    growthPercent: z.number().min(-100).max(1000),
    confidence: z.number().min(0).max(100),
  })),
  thresholds: z.object({
    warningPercent: z.number().min(0).max(100).default(75),
    criticalPercent: z.number().min(0).max(100).default(90),
  }),
  autoScale: z.boolean().default(false),
  scaleFactor: z.number().min(1).max(10).default(2),
  schedule: z.string().max(100).optional(),
  enabled: z.boolean().default(true),
});

export const capacityPlanUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  resource: z.enum(['compute', 'storage', 'database', 'cache', 'network', 'cdn']).optional(),
  currentCapacity: z.number().int().min(0).optional(),
  projectedGrowth: z.array(z.object({
    period: z.string().max(100),
    growthPercent: z.number().min(-100).max(1000),
    confidence: z.number().min(0).max(100),
  })).optional(),
  thresholds: z.object({
    warningPercent: z.number().min(0).max(100).default(75),
    criticalPercent: z.number().min(0).max(100).default(90),
  }).optional(),
  autoScale: z.boolean().optional(),
  scaleFactor: z.number().min(1).max(10).optional(),
  schedule: z.string().max(100).optional(),
  enabled: z.boolean().optional(),
});

export const capacityPlanQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'resource', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  resource: z.enum(['compute', 'storage', 'database', 'cache', 'network', 'cdn']).optional(),
  enabled: z.boolean().optional(),
});

// --- ProductionRunbook ---
export const productionRunbookCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  category: z.enum(['incident_response', 'deployment', 'rollback', 'maintenance', 'disaster_recovery', 'scaling']),
  serviceScope: z.array(z.string().max(200)),
  steps: z.array(z.object({
    order: z.number().int().min(0),
    title: z.string().max(200),
    description: z.string().max(2000),
    command: z.string().max(5000).optional(),
    timeout: z.number().int().min(1).max(3600).optional(),
    rollbackStep: z.number().int().min(0).optional(),
    requiredApproval: z.boolean().default(false),
  })),
  escalation: z.array(z.object({
    level: z.number().int().min(1),
    contacts: z.array(z.string().max(200)),
    timeoutMinutes: z.number().int().min(1).max(1440),
  })),
  lastTestedAt: z.string().datetime().optional(),
  lastUpdatedBy: z.string().uuid(),
  enabled: z.boolean().default(true),
});

export const productionRunbookUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  category: z.enum(['incident_response', 'deployment', 'rollback', 'maintenance', 'disaster_recovery', 'scaling']).optional(),
  serviceScope: z.array(z.string().max(200)).optional(),
  steps: z.array(z.object({
    order: z.number().int().min(0),
    title: z.string().max(200),
    description: z.string().max(2000),
    command: z.string().max(5000).optional(),
    timeout: z.number().int().min(1).max(3600).optional(),
    rollbackStep: z.number().int().min(0).optional(),
    requiredApproval: z.boolean().default(false),
  })).optional(),
  escalation: z.array(z.object({
    level: z.number().int().min(1),
    contacts: z.array(z.string().max(200)),
    timeoutMinutes: z.number().int().min(1).max(1440),
  })).optional(),
  lastTestedAt: z.string().datetime().optional(),
  enabled: z.boolean().optional(),
});

export const productionRunbookQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'category', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  category: z.enum(['incident_response', 'deployment', 'rollback', 'maintenance', 'disaster_recovery', 'scaling']).optional(),
  enabled: z.boolean().optional(),
});

// --- IncidentPostmortem ---
export const incidentPostmortemCreateSchema = z.object({
  title: z.string().min(2).max(200),
  incidentId: z.string().uuid(),
  severity: z.enum(['sev1', 'sev2', 'sev3', 'sev4']),
  summary: z.string().min(1).max(5000),
  timeline: z.array(z.object({
    timestamp: z.string().datetime(),
    event: z.string().max(500),
  })),
  rootCause: z.string().min(1).max(5000),
  impact: z.object({
    duration: z.number().int().min(0),
    affectedUsers: z.number().int().min(0).default(0),
    affectedServices: z.array(z.string().max(200)),
    revenueImpact: z.number().default(0),
  }),
  remediation: z.array(z.object({
    action: z.string().min(1).max(1000),
    owner: z.string().uuid(),
    dueDate: z.string().datetime(),
    status: z.enum(['pending', 'in_progress', 'completed']),
  })),
  lessons: z.array(z.string().min(1).max(500)),
  actionItems: z.array(z.object({
    description: z.string().min(1).max(500),
    owner: z.string().uuid(),
    priority: z.enum(['low', 'medium', 'high', 'critical']),
    dueDate: z.string().datetime().optional(),
  })),
  reviewRequired: z.boolean().default(true),
  reviewers: z.array(z.string().uuid()),
  publishedAt: z.string().datetime().optional(),
});

export const incidentPostmortemUpdateSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  summary: z.string().min(1).max(5000).optional(),
  timeline: z.array(z.object({
    timestamp: z.string().datetime(),
    event: z.string().max(500),
  })).optional(),
  rootCause: z.string().min(1).max(5000).optional(),
  impact: z.object({
    duration: z.number().int().min(0),
    affectedUsers: z.number().int().min(0).default(0),
    affectedServices: z.array(z.string().max(200)),
    revenueImpact: z.number().default(0),
  }).optional(),
  remediation: z.array(z.object({
    action: z.string().min(1).max(1000),
    owner: z.string().uuid(),
    dueDate: z.string().datetime(),
    status: z.enum(['pending', 'in_progress', 'completed']),
  })).optional(),
  lessons: z.array(z.string().min(1).max(500)).optional(),
  actionItems: z.array(z.object({
    description: z.string().min(1).max(500),
    owner: z.string().uuid(),
    priority: z.enum(['low', 'medium', 'high', 'critical']),
    dueDate: z.string().datetime().optional(),
  })).optional(),
  reviewers: z.array(z.string().uuid()).optional(),
  publishedAt: z.string().datetime().optional(),
});

export const incidentPostmortemQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['title', 'severity', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  severity: z.enum(['sev1', 'sev2', 'sev3', 'sev4']).optional(),
  incidentId: z.string().uuid().optional(),
});

// --- ProductionChecklist ---
export const productionChecklistCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['pre_deploy', 'post_deploy', 'pre_release', 'pre_maintenance', 'pre_go_live']),
  items: z.array(z.object({
    order: z.number().int().min(0),
    category: z.string().max(200),
    description: z.string().min(1).max(1000),
    required: z.boolean().default(true),
    automatable: z.boolean().default(false),
    automationScript: z.string().max(5000).optional(),
    evidenceRequired: z.boolean().default(false),
  })),
  applicableServices: z.array(z.string().max(200)).optional(),
  enforceOnDeploy: z.boolean().default(false),
  enabled: z.boolean().default(true),
});

export const productionChecklistUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(['pre_deploy', 'post_deploy', 'pre_release', 'pre_maintenance', 'pre_go_live']).optional(),
  items: z.array(z.object({
    order: z.number().int().min(0),
    category: z.string().max(200),
    description: z.string().min(1).max(1000),
    required: z.boolean().default(true),
    automatable: z.boolean().default(false),
    automationScript: z.string().max(5000).optional(),
    evidenceRequired: z.boolean().default(false),
  })).optional(),
  applicableServices: z.array(z.string().max(200)).optional(),
  enforceOnDeploy: z.boolean().optional(),
  enabled: z.boolean().optional(),
});

export const productionChecklistQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'type', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  type: z.enum(['pre_deploy', 'post_deploy', 'pre_release', 'pre_maintenance', 'pre_go_live']).optional(),
  enabled: z.boolean().optional(),
});

// --- GoLiveApproval ---
export const goLiveApprovalCreateSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  serviceId: z.string().uuid(),
  serviceName: z.string().min(2).max(200),
  version: z.string().min(1).max(50),
  environment: z.enum(['production', 'staging']),
  approvals: z.array(z.object({
    role: z.string().max(200),
    userId: z.string().uuid().optional(),
    required: z.boolean().default(true),
    approved: z.boolean().default(false),
    approvedAt: z.string().datetime().optional(),
    comment: z.string().max(1000).optional(),
  })),
  checklist: z.array(z.object({
    description: z.string().max(500),
    completed: z.boolean().default(false),
    completedAt: z.string().datetime().optional(),
    completedBy: z.string().uuid().optional(),
  })),
  scheduledAt: z.string().datetime(),
  rollbackPlan: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'deployed', 'cancelled']),
});

export const goLiveApprovalUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  description: z.string().max(1000).optional(),
  version: z.string().min(1).max(50).optional(),
  approvals: z.array(z.object({
    role: z.string().max(200),
    userId: z.string().uuid().optional(),
    required: z.boolean().default(true),
    approved: z.boolean().default(false),
    approvedAt: z.string().datetime().optional(),
    comment: z.string().max(1000).optional(),
  })).optional(),
  checklist: z.array(z.object({
    description: z.string().max(500),
    completed: z.boolean().default(false),
    completedAt: z.string().datetime().optional(),
    completedBy: z.string().uuid().optional(),
  })).optional(),
  scheduledAt: z.string().datetime().optional(),
  rollbackPlan: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'deployed', 'cancelled']).optional(),
});

export const goLiveApprovalQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'serviceName', 'scheduledAt', 'created_at']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().max(200).optional(),
  serviceId: z.string().uuid().optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'deployed', 'cancelled']).optional(),
  environment: z.enum(['production', 'staging']).optional(),
});

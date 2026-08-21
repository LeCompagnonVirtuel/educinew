import { z } from 'zod';

const schoolId = z.string().uuid();

// =============================================================================
// UNESCO Connector
// =============================================================================

export const CreateUNESCOConnectorSchema = z.object({
  schoolId,
  name: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ERROR', 'SYNCING', 'CONFIGURING', 'DEPRECATED']),
  apiEndpoint: z.string().url(),
  apiKey: z.string().min(1),
  syncConfig: z.object({
    direction: z.enum(['INBOUND', 'OUTBOUND', 'BIDIRECTIONAL']),
    mode: z.enum(['REALTIME', 'PERIODIC', 'ON_DEMAND', 'EVENT_DRIVEN', 'BATCH', 'WEBHOOK']),
    frequency: z.enum(['REALTIME', 'EVERY_5_MIN', 'EVERY_15_MIN', 'EVERY_HOUR', 'DAILY', 'WEEKLY', 'MONTHLY']),
    batchSize: z.enum(['SMALL_100', 'MEDIUM_1000', 'LARGE_10000', 'UNLIMITED']),
    conflictResolution: z.enum(['LAST_WRITE', 'FIRST_WRITE', 'MANUAL', 'MERGE', 'REJECT', 'LOG']),
    retryStrategy: z.enum(['NONE', 'FIXED', 'EXPONENTIAL', 'LINEAR', 'CUSTOM']),
    errorHandling: z.enum(['SKIP', 'RETRY', 'DEAD_LETTER', 'ALERT', 'FAIL_FAST']),
    enabled: z.boolean(),
  }),
});

export const UpdateUNESCOConnectorSchema = CreateUNESCOConnectorSchema.partial();

// =============================================================================
// Connector Config
// =============================================================================

export const CreateConnectorConfigSchema = z.object({
  connectorId: z.string().uuid(),
  schoolId,
  protocol: z.enum(['REST', 'SOAP', 'GRAPHQL', 'GRPC', 'WEBSOCKET', 'MQTT', 'AMQP', 'JMS']),
  endpoint: z.string().url(),
  authentication: z.object({
    protocol: z.enum(['OAUTH2', 'SAML', 'OPENID_CONNECT', 'LDAP', 'API_KEY', 'JWT', 'MUTUAL_TLS', 'BASIC']),
    scopes: z.array(z.string()),
  }),
  security: z.object({
    level: z.enum(['NONE', 'BASIC', 'STANDARD', 'HIGH', 'MAXIMUM']),
    encryption: z.enum(['AES256', 'RSA2048', 'CUSTOM']),
    authentication: z.enum(['ANONYMOUS', 'BASIC', 'MFA', 'CERTIFICATE', 'HARDWARE_TOKEN']),
    dataClassification: z.enum(['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED', 'TOP_SECRET']),
    tlsVersion: z.string().min(1),
    certificatePinning: z.boolean(),
    corsOrigins: z.array(z.string()),
    csrfProtection: z.boolean(),
    xssProtection: z.boolean(),
    contentSecurityPolicy: z.string().min(1),
  }),
  retry: z.object({
    strategy: z.enum(['NONE', 'FIXED', 'EXPONENTIAL', 'LINEAR', 'CUSTOM']),
    maxRetries: z.number().int().min(0),
    initialDelayMs: z.number().int().min(0),
    maxDelayMs: z.number().int().min(0),
    backoffMultiplier: z.number().min(1),
    jitter: z.boolean(),
  }),
  timeout: z.object({
    connectionMs: z.number().int().min(0),
    requestMs: z.number().int().min(0),
    responseMs: z.number().int().min(0),
    idleMs: z.number().int().min(0),
    onTimeout: z.enum(['SKIP', 'RETRY', 'DEAD_LETTER', 'ALERT', 'FAIL_FAST']),
  }),
  rateLimit: z.object({
    enabled: z.boolean(),
    maxRequests: z.number().int().min(1),
    windowMs: z.number().int().min(1),
    unit: z.enum(['PER_SECOND', 'PER_MINUTE', 'PER_HOUR', 'PER_DAY', 'PER_MONTH']),
    strategy: z.string().min(1),
    burstSize: z.number().int().min(0).nullable().optional(),
  }),
  compression: z.enum(['NONE', 'GZIP', 'ZIP', 'BROTLI']),
  version: z.string().min(1),
  customHeaders: z.record(z.string()),
  customParams: z.record(z.string()),
});

export const UpdateConnectorConfigSchema = CreateConnectorConfigSchema.partial();

// =============================================================================
// Data Mapping
// =============================================================================

export const CreateDataMappingSchema = z.object({
  connectorId: z.string().uuid(),
  sourceField: z.string().min(1),
  targetField: z.string().min(1),
  dataType: z.string().min(1),
  strategy: z.enum(['DIRECT', 'TRANSFORM', 'AGGREGATE', 'SPLIT', 'FILTER', 'ENRICH']),
  transform: z.object({
    type: z.enum(['MAP', 'FILTER', 'AGGREGATE', 'SPLIT', 'ENRICH', 'VALIDATE', 'ENCRYPT', 'DECRYPT']),
    expression: z.string().min(1),
    parameters: z.record(z.unknown()),
    outputType: z.string().min(1),
    description: z.string().min(1),
    version: z.string().min(1),
  }).optional(),
  defaultValue: z.string().nullable().optional(),
  isRequired: z.boolean(),
  status: z.enum(['MAPPED', 'PARTIAL', 'UNMAPPED', 'ERROR', 'DEPRECATED']),
  validation: z.object({
    level: z.enum(['STRICT', 'MODERATE', 'LENIENT', 'SKIP']),
    rules: z.array(z.object({
      name: z.string().min(1),
      type: z.string().min(1),
      parameters: z.record(z.unknown()),
      message: z.string().min(1),
      severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL', 'EMERGENCY']),
    })),
    customValidator: z.string().nullable().optional(),
    onError: z.enum(['SKIP', 'RETRY', 'DEAD_LETTER', 'ALERT', 'FAIL_FAST']),
  }).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateDataMappingSchema = CreateDataMappingSchema.partial();

// =============================================================================
// Sync Mapping
// =============================================================================

export const CreateSyncMappingSchema = z.object({
  connectorId: z.string().uuid(),
  sourceField: z.string().min(1),
  targetField: z.string().min(1),
  strategy: z.enum(['DIRECT', 'TRANSFORM', 'AGGREGATE', 'SPLIT', 'FILTER', 'ENRICH']),
  transform: z.object({
    type: z.enum(['MAP', 'FILTER', 'AGGREGATE', 'SPLIT', 'ENRICH', 'VALIDATE', 'ENCRYPT', 'DECRYPT']),
    expression: z.string().min(1),
    parameters: z.record(z.unknown()),
    outputType: z.string().min(1),
    description: z.string().min(1),
    version: z.string().min(1),
  }).optional(),
  defaultValue: z.string().nullable().optional(),
  isRequired: z.boolean(),
  validation: z.object({
    level: z.enum(['STRICT', 'MODERATE', 'LENIENT', 'SKIP']),
    rules: z.array(z.object({
      name: z.string().min(1),
      type: z.string().min(1),
      parameters: z.record(z.unknown()),
      message: z.string().min(1),
      severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL', 'EMERGENCY']),
    })),
    customValidator: z.string().nullable().optional(),
    onError: z.enum(['SKIP', 'RETRY', 'DEAD_LETTER', 'ALERT', 'FAIL_FAST']),
  }).optional(),
});

export const UpdateSyncMappingSchema = CreateSyncMappingSchema.partial();

// =============================================================================
// Webhook Config
// =============================================================================

export const CreateWebhookConfigSchema = z.object({
  connectorId: z.string().uuid(),
  schoolId,
  url: z.string().url(),
  secret: z.string().min(1),
  events: z.array(z.string()),
  headers: z.record(z.string()),
  retryStrategy: z.enum(['NONE', 'FIXED', 'EXPONENTIAL', 'LINEAR', 'CUSTOM']),
  maxRetries: z.number().int().min(0),
  timeoutMs: z.number().int().min(1),
  enabled: z.boolean(),
});

export const UpdateWebhookConfigSchema = CreateWebhookConfigSchema.partial();

// =============================================================================
// Connector Pipeline
// =============================================================================

export const CreateConnectorPipelineSchema = z.object({
  connectorId: z.string().uuid(),
  schoolId,
  name: z.string().min(1),
  stages: z.array(z.object({
    id: z.string().uuid(),
    pipelineId: z.string().uuid(),
    name: z.string().min(1),
    type: z.string().min(1),
    order: z.number().int().min(0),
    config: z.record(z.unknown()),
    inputSchema: z.string().nullable().optional(),
    outputSchema: z.string().nullable().optional(),
  })),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ERROR', 'SYNCING', 'CONFIGURING', 'DEPRECATED']),
  currentStage: z.number().int().min(0),
  startedAt: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const UpdateConnectorPipelineSchema = CreateConnectorPipelineSchema.partial();

// =============================================================================
// API Contract
// =============================================================================

export const CreateAPIContractSchema = z.object({
  connectorId: z.string().uuid(),
  name: z.string().min(1),
  version: z.string().min(1),
  protocol: z.enum(['REST', 'SOAP', 'GRAPHQL', 'GRPC', 'WEBSOCKET', 'MQTT', 'AMQP', 'JMS']),
  endpoints: z.array(z.object({
    id: z.string().uuid(),
    contractId: z.string().uuid(),
    path: z.string().min(1),
    method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
    description: z.string().min(1),
    parameters: z.array(z.object({
      name: z.string().min(1),
      in: z.enum(['path', 'query', 'header', 'cookie']),
      type: z.string().min(1),
      required: z.boolean(),
      description: z.string().min(1),
      schema: z.record(z.unknown()),
    })),
    responses: z.array(z.object({
      statusCode: z.number().int().min(100).max(599),
      description: z.string().min(1),
    })),
    security: z.enum(['NONE', 'BASIC', 'STANDARD', 'HIGH', 'MAXIMUM']),
    deprecated: z.boolean(),
  })),
  schemas: z.array(z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    version: z.string().min(1),
    type: z.string().min(1),
    schema: z.record(z.unknown()),
    examples: z.array(z.record(z.unknown())),
  })),
  security: z.object({
    level: z.enum(['NONE', 'BASIC', 'STANDARD', 'HIGH', 'MAXIMUM']),
    encryption: z.enum(['AES256', 'RSA2048', 'CUSTOM']),
    authentication: z.enum(['ANONYMOUS', 'BASIC', 'MFA', 'CERTIFICATE', 'HARDWARE_TOKEN']),
    dataClassification: z.enum(['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED', 'TOP_SECRET']),
    tlsVersion: z.string().min(1),
    certificatePinning: z.boolean(),
    corsOrigins: z.array(z.string()),
    csrfProtection: z.boolean(),
    xssProtection: z.boolean(),
    contentSecurityPolicy: z.string().min(1),
  }),
  rateLimit: z.object({
    enabled: z.boolean(),
    maxRequests: z.number().int().min(1),
    windowMs: z.number().int().min(1),
    unit: z.enum(['PER_SECOND', 'PER_MINUTE', 'PER_HOUR', 'PER_DAY', 'PER_MONTH']),
    strategy: z.string().min(1),
    burstSize: z.number().int().min(0).nullable().optional(),
  }),
});

export const UpdateAPIContractSchema = CreateAPIContractSchema.partial();

// =============================================================================
// Data Contract
// =============================================================================

export const CreateDataContractSchema = z.object({
  connectorId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  version: z.string().min(1),
  schemas: z.array(z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    version: z.string().min(1),
    type: z.string().min(1),
    fields: z.array(z.object({
      name: z.string().min(1),
      type: z.string().min(1),
      required: z.boolean(),
      nullable: z.boolean(),
      defaultValue: z.unknown().optional(),
      description: z.string().min(1),
      format: z.string().nullable().optional(),
      constraints: z.record(z.unknown()),
    })),
    relationships: z.array(z.object({
      type: z.string().min(1),
      target: z.string().min(1),
      foreignKey: z.string().min(1),
      onDelete: z.enum(['CASCADE', 'SET NULL', 'RESTRICT', 'NO ACTION']),
    })),
    indexes: z.array(z.string()),
    constraints: z.record(z.unknown()),
  })),
  validations: z.array(z.object({
    id: z.string().uuid(),
    mappingId: z.string().uuid(),
    level: z.enum(['STRICT', 'MODERATE', 'LENIENT', 'SKIP']),
    rules: z.array(z.object({
      name: z.string().min(1),
      type: z.string().min(1),
      parameters: z.record(z.unknown()),
      message: z.string().min(1),
      severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL', 'EMERGENCY']),
    })),
    customValidator: z.string().nullable().optional(),
    onError: z.enum(['SKIP', 'RETRY', 'DEAD_LETTER', 'ALERT', 'FAIL_FAST']),
  })),
  quality: z.object({
    score: z.number().min(0).max(100),
    completeness: z.number().min(0).max(100),
    accuracy: z.number().min(0).max(100),
    consistency: z.number().min(0).max(100),
    timeliness: z.number().min(0).max(100),
    validity: z.number().min(0).max(100),
    lastAssessedAt: z.string(),
    issues: z.array(z.object({
      field: z.string().min(1),
      type: z.string().min(1),
      severity: z.enum(['INFO', 'WARNING', 'ERROR', 'CRITICAL', 'EMERGENCY']),
      count: z.number().int().min(0),
      description: z.string().min(1),
      detectedAt: z.string(),
    })),
  }),
});

export const UpdateDataContractSchema = CreateDataContractSchema.partial();

// =============================================================================
// Federation Config
// =============================================================================

export const CreateFederationConfigSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.string().min(1),
  participants: z.array(z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    connectorId: z.string().uuid(),
    role: z.string().min(1),
    status: z.enum(['ACTIVE', 'INACTIVE', 'ERROR', 'SYNCING', 'CONFIGURING', 'DEPRECATED']),
    joinedAt: z.string(),
    metadata: z.record(z.unknown()),
  })),
  syncConfig: z.object({
    direction: z.enum(['INBOUND', 'OUTBOUND', 'BIDIRECTIONAL']),
    mode: z.enum(['REALTIME', 'PERIODIC', 'ON_DEMAND', 'EVENT_DRIVEN', 'BATCH', 'WEBHOOK']),
    frequency: z.enum(['REALTIME', 'EVERY_5_MIN', 'EVERY_15_MIN', 'EVERY_HOUR', 'DAILY', 'WEEKLY', 'MONTHLY']),
    batchSize: z.enum(['SMALL_100', 'MEDIUM_1000', 'LARGE_10000', 'UNLIMITED']),
    conflictResolution: z.enum(['LAST_WRITE', 'FIRST_WRITE', 'MANUAL', 'MERGE', 'REJECT', 'LOG']),
    retryStrategy: z.enum(['NONE', 'FIXED', 'EXPONENTIAL', 'LINEAR', 'CUSTOM']),
    errorHandling: z.enum(['SKIP', 'RETRY', 'DEAD_LETTER', 'ALERT', 'FAIL_FAST']),
    enabled: z.boolean(),
  }),
  security: z.object({
    level: z.enum(['NONE', 'BASIC', 'STANDARD', 'HIGH', 'MAXIMUM']),
    encryption: z.enum(['AES256', 'RSA2048', 'CUSTOM']),
    authentication: z.enum(['ANONYMOUS', 'BASIC', 'MFA', 'CERTIFICATE', 'HARDWARE_TOKEN']),
    dataClassification: z.enum(['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED', 'TOP_SECRET']),
    tlsVersion: z.string().min(1),
    certificatePinning: z.boolean(),
    corsOrigins: z.array(z.string()),
    csrfProtection: z.boolean(),
    xssProtection: z.boolean(),
    contentSecurityPolicy: z.string().min(1),
  }),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ERROR', 'SYNCING', 'CONFIGURING', 'DEPRECATED']),
});

export const UpdateFederationConfigSchema = CreateFederationConfigSchema.partial();

// =============================================================================
// Connector Template
// =============================================================================

export const CreateConnectorTemplateSchema = z.object({
  name: z.string().min(1),
  standard: z.enum(['UNESCO', 'UNICEF', 'OCDE', 'WORLD_BANK', 'OPEN_BADGES', 'EUROPASS', 'SCORM', 'XAPI', 'LTI', 'IMS_GLOBAL', 'ED_FI', 'EMIS', 'ONE_ROSTER', 'OPENID_CONNECT', 'OAUTH2', 'SAML', 'LDAP', 'SCIM']),
  connectorType: z.enum(['ADAPTER', 'BRIDGE', 'GATEWAY', 'PROXY', 'AGGREGATOR', 'ROUTER']),
  protocol: z.enum(['REST', 'SOAP', 'GRAPHQL', 'GRPC', 'WEBSOCKET', 'MQTT', 'AMQP', 'JMS']),
  description: z.string().min(1),
  version: z.string().min(1),
  config: z.record(z.unknown()),
  defaultMappings: z.array(z.object({
    id: z.string().uuid(),
    connectorId: z.string().uuid(),
    sourceField: z.string().min(1),
    targetField: z.string().min(1),
    dataType: z.string().min(1),
    strategy: z.enum(['DIRECT', 'TRANSFORM', 'AGGREGATE', 'SPLIT', 'FILTER', 'ENRICH']),
    isRequired: z.boolean(),
    status: z.enum(['MAPPED', 'PARTIAL', 'UNMAPPED', 'ERROR', 'DEPRECATED']),
    metadata: z.record(z.unknown()),
  })),
  requiredFields: z.array(z.string()),
  optionalFields: z.array(z.string()),
  tags: z.array(z.string()),
  createdBy: z.string().uuid(),
});

export const UpdateConnectorTemplateSchema = CreateConnectorTemplateSchema.partial();

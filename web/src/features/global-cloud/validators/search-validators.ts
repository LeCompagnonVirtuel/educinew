import { z } from 'zod';

const schoolId = z.string().uuid();

// =============================================================================
// Global Search
// =============================================================================

export const CreateGlobalSearchSchema = z.object({
  schoolId,
  query: z.string().min(1),
  scope: z.enum(['GLOBAL', 'SCHOOL', 'REGIONAL', 'NATIONAL', 'INTERNATIONAL', 'TENANT', 'MODULE', 'COLLECTION']),
  types: z.array(z.enum(['KEYWORD', 'SEMANTIC', 'OCR', 'VOICE', 'IMAGE', 'KNOWLEDGE', 'FEDERATED', 'CROSS_TENANT', 'NATURAL_LANGUAGE', 'HYBRID', 'BOOLEAN', 'FUZZY', 'PHONETIC', 'WILDCARD', 'REGEX'])),
  filters: z.array(z.object({
    field: z.string().min(1),
    type: z.enum(['TERM', 'RANGE', 'EXISTS', 'BOOL', 'NESTED', 'GEO', 'DATE', 'CATEGORY']),
    value: z.union([z.string(), z.number(), z.boolean()]),
    operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'exists', 'wildcard', 'regex', 'geo', 'range']),
    boost: z.number().optional(),
    negated: z.boolean().optional(),
    nested: z.array(z.any()).optional(),
  })),
  facets: z.array(z.object({
    field: z.string().min(1),
    type: z.enum(['TEXT', 'DATE_RANGE', 'NUMERIC', 'BOOLEAN', 'HIERARCHICAL', 'GEO', 'TAG']),
    label: z.string().min(1),
    size: z.number().int().min(1).optional(),
    order: z.enum(['RELEVANCE', 'DATE', 'POPULARITY', 'RATING', 'DISTANCE', 'CUSTOM']).optional(),
    minCount: z.number().int().min(0).optional(),
  })),
  sort: z.enum(['RELEVANCE', 'DATE', 'POPULARITY', 'RATING', 'DISTANCE', 'CUSTOM']),
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1).max(100),
  maxResults: z.number().int().min(1),
  timeout: z.number().int().min(1000),
  userId: z.string().uuid(),
  sessionId: z.string().uuid(),
});

export const UpdateGlobalSearchSchema = CreateGlobalSearchSchema.partial();

// =============================================================================
// Semantic Search
// =============================================================================

export const CreateSemanticSearchSchema = z.object({
  schoolId,
  query: z.string().min(1),
  embedding: z.array(z.number()),
  model: z.enum(['OPENAI', 'HUGGINGFACE', 'COHERE', 'CUSTOM', 'LOCAL']),
  threshold: z.number().min(0).max(1),
  maxResults: z.number().int().min(1),
  scope: z.enum(['GLOBAL', 'SCHOOL', 'REGIONAL', 'NATIONAL', 'INTERNATIONAL', 'TENANT', 'MODULE', 'COLLECTION']),
  filters: z.array(z.object({
    field: z.string().min(1),
    type: z.enum(['TERM', 'RANGE', 'EXISTS', 'BOOL', 'NESTED', 'GEO', 'DATE', 'CATEGORY']),
    value: z.union([z.string(), z.number(), z.boolean()]),
    operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'exists', 'wildcard', 'regex', 'geo', 'range']),
  })),
  language: z.string().min(2).max(5),
  context: z.string().min(1),
  userId: z.string().uuid(),
});

export const UpdateSemanticSearchSchema = CreateSemanticSearchSchema.partial();

// =============================================================================
// OCR Search
// =============================================================================

export const CreateOCRSearchSchema = z.object({
  schoolId,
  documentId: z.string().uuid(),
  imageUrl: z.string().url(),
  language: z.string().min(2).max(5),
});

export const UpdateOCRSearchSchema = CreateOCRSearchSchema.partial();

// =============================================================================
// Voice Search
// =============================================================================

export const CreateVoiceSearchSchema = z.object({
  schoolId,
  audioUrl: z.string().url(),
  language: z.string().min(2).max(5),
  userId: z.string().uuid(),
});

export const UpdateVoiceSearchSchema = CreateVoiceSearchSchema.partial();

// =============================================================================
// Image Search
// =============================================================================

export const CreateImageSearchSchema = z.object({
  schoolId,
  imageUrl: z.string().url(),
  userId: z.string().uuid(),
});

export const UpdateImageSearchSchema = CreateImageSearchSchema.partial();

// =============================================================================
// Knowledge Search
// =============================================================================

export const CreateKnowledgeSearchSchema = z.object({
  schoolId,
  query: z.string().min(1),
  knowledgeBase: z.string().min(1),
  topK: z.number().int().min(1).max(100),
  threshold: z.number().min(0).max(1),
  context: z.string().min(1),
  userId: z.string().uuid(),
});

export const UpdateKnowledgeSearchSchema = CreateKnowledgeSearchSchema.partial();

// =============================================================================
// Federated Search
// =============================================================================

export const CreateFederatedSearchSchema = z.object({
  schoolId,
  query: z.string().min(1),
  sources: z.array(z.enum(['DATABASE', 'API', 'FILE_SYSTEM', 'CLOUD_STORAGE', 'EXTERNAL_SERVICE'])),
  config: z.object({
    sources: z.array(z.object({
      type: z.enum(['DATABASE', 'API', 'FILE_SYSTEM', 'CLOUD_STORAGE', 'EXTERNAL_SERVICE']),
      name: z.string().min(1),
      endpoint: z.string().url(),
      apiKey: z.string().min(1),
      timeout: z.number().int().min(1000),
      retries: z.number().int().min(0),
      enabled: z.boolean(),
      priority: z.number().int().min(0),
      headers: z.record(z.string()),
      mappings: z.record(z.string()),
      settings: z.record(z.unknown()),
    })),
    mergeStrategy: z.enum(['concat', 'merge', 'rank']),
    timeout: z.number().int().min(1000),
    maxResults: z.number().int().min(1),
    deduplication: z.enum(['NONE', 'EXACT', 'FUZZY', 'SEMANTIC', 'ML_BASED']),
  }),
  userId: z.string().uuid(),
});

export const UpdateFederatedSearchSchema = CreateFederatedSearchSchema.partial();

// =============================================================================
// Cross-Tenant Search
// =============================================================================

export const CreateCrossTenantSearchSchema = z.object({
  query: z.string().min(1),
  mode: z.enum(['SHARED', 'ISOLATED', 'FILTERED', 'AGGREGATED', 'ANONYMIZED']),
  tenantIds: z.array(z.string().uuid()),
  filters: z.array(z.object({
    field: z.string().min(1),
    type: z.enum(['TERM', 'RANGE', 'EXISTS', 'BOOL', 'NESTED', 'GEO', 'DATE', 'CATEGORY']),
    value: z.union([z.string(), z.number(), z.boolean()]),
    operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'exists', 'wildcard', 'regex', 'geo', 'range']),
  })),
  userId: z.string().uuid(),
});

export const UpdateCrossTenantSearchSchema = CreateCrossTenantSearchSchema.partial();

// =============================================================================
// Natural Language Search
// =============================================================================

export const CreateNaturalLanguageSearchSchema = z.object({
  schoolId,
  query: z.string().min(1),
  processor: z.enum(['STANDARD', 'ADVANCED', 'AI_POWERED', 'CUSTOM']),
  userId: z.string().uuid(),
});

export const UpdateNaturalLanguageSearchSchema = CreateNaturalLanguageSearchSchema.partial();

// =============================================================================
// Search Index
// =============================================================================

export const CreateSearchIndexSchema = z.object({
  schoolId,
  name: z.string().min(1),
  alias: z.string().min(1),
  type: z.enum(['STUDENTS', 'TEACHERS', 'COURSES', 'DOCUMENTS', 'RESOURCES', 'ASSESSMENTS', 'EVENTS', 'NOTIFICATIONS', 'MESSAGES', 'POLICIES', 'REPORTS', 'ANALYTICS']),
  fields: z.array(z.object({
    name: z.string().min(1),
    type: z.enum(['TEXT', 'KEYWORD', 'LONG', 'DOUBLE', 'BOOLEAN', 'DATE', 'NESTED', 'VECTOR', 'GEO_POINT']),
    analyzer: z.string().min(1),
    searchable: z.boolean(),
    sortable: z.boolean(),
    facetable: z.boolean(),
    stored: z.boolean(),
    indexed: z.boolean(),
    boost: z.number().min(0),
    nullValue: z.string().optional(),
    copyTo: z.array(z.string()).optional(),
  })),
  schema: z.object({
    version: z.number().int().min(1),
    fields: z.array(z.any()),
    relations: z.record(z.string()),
    metadata: z.record(z.unknown()),
  }),
  mappings: z.array(z.object({
    sourceField: z.string().min(1),
    targetField: z.string().min(1),
    transform: z.string().min(1),
    condition: z.string().min(1),
    priority: z.number().int().min(0),
  })),
  analyzers: z.array(z.object({
    name: z.string().min(1),
    type: z.enum(['STANDARD', 'SIMPLE', 'WHITESPACE', 'PATTERN', 'CUSTOM', 'LANGUAGE', 'STEMMING', 'STOP_WORDS']),
    tokenizer: z.object({
      type: z.string().min(1),
      pattern: z.string().optional(),
      maxTokenLength: z.number().int().min(1).optional(),
      minGram: z.number().int().min(1).optional(),
      maxGram: z.number().int().min(1).optional(),
    }),
    tokenFilters: z.array(z.object({
      type: z.enum(['LOWERCASE', 'UPPERCASE', 'STEM', 'SYNONYM', 'STOP_WORDS', 'NGRAM', 'EDGE_NGRAM', 'PHONETIC', 'DECOMPOUND', 'WORD_DELIMITER']),
      name: z.string().min(1),
      config: z.record(z.unknown()),
    })),
    charFilters: z.array(z.string()),
    language: z.string().min(2).max(5),
  })),
  refreshFrequency: z.enum(['REALTIME', 'NEAR_REALTIME', 'PERIODIC', 'ON_DEMAND', 'MANUAL']),
});

export const UpdateSearchIndexSchema = CreateSearchIndexSchema.partial();

// =============================================================================
// Search Config
// =============================================================================

export const CreateSearchConfigSchema = z.object({
  schoolId,
  provider: z.enum(['ELASTICSEARCH', 'OPENSEARCH', 'SOLR', 'MEILISEARCH', 'TYPESENSE', 'ALGOLIA', 'CUSTOM']),
  vectorStore: z.enum(['PINECONE', 'WEAVIATE', 'QDRANT', 'MILVUS', 'CHROMA', 'FAISS', 'PGVECTOR', 'CUSTOM']),
  embeddingModel: z.enum(['OPENAI', 'HUGGINGFACE', 'COHERE', 'CUSTOM', 'LOCAL']),
  security: z.enum(['NONE', 'RBAC', 'ACL', 'TENANT_ISOLATION', 'ENCRYPTED']),
  cacheStrategy: z.enum(['NONE', 'IN_MEMORY', 'REDIS', 'CDN', 'HYBRID']),
  analytics: z.array(z.enum(['CLICKS', 'IMPRESSIONS', 'QUERIES', 'REFORMULATIONS', 'ZERO_RESULTS', 'TIME_SPENT'])),
  settings: z.record(z.unknown()).optional(),
});

export const UpdateSearchConfigSchema = CreateSearchConfigSchema.partial();

// =============================================================================
// Search Template
// =============================================================================

export const CreateSearchTemplateSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  query: z.string().min(1),
  filters: z.array(z.object({
    field: z.string().min(1),
    type: z.enum(['TERM', 'RANGE', 'EXISTS', 'BOOL', 'NESTED', 'GEO', 'DATE', 'CATEGORY']),
    value: z.union([z.string(), z.number(), z.boolean()]),
    operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'exists', 'wildcard', 'regex', 'geo', 'range']),
  })),
  facets: z.array(z.object({
    field: z.string().min(1),
    type: z.enum(['TEXT', 'DATE_RANGE', 'NUMERIC', 'BOOLEAN', 'HIERARCHICAL', 'GEO', 'TAG']),
    label: z.string().min(1),
  })),
  sort: z.enum(['RELEVANCE', 'DATE', 'POPULARITY', 'RATING', 'DISTANCE', 'CUSTOM']),
  format: z.enum(['LIST', 'CARD', 'TABLE', 'MAP', 'TIMELINE', 'GRAPH', 'SNIPPET', 'HIGHLIGHTED']),
  parameters: z.array(z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    required: z.boolean(),
    defaultValue: z.string(),
    description: z.string().min(1),
  })),
  createdBy: z.string().uuid(),
  isPublic: z.boolean(),
});

export const UpdateSearchTemplateSchema = CreateSearchTemplateSchema.partial();

// =============================================================================
// Search Preset
// =============================================================================

export const CreateSearchPresetSchema = z.object({
  schoolId,
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['KEYWORD', 'SEMANTIC', 'OCR', 'VOICE', 'IMAGE', 'KNOWLEDGE', 'FEDERATED', 'CROSS_TENANT', 'NATURAL_LANGUAGE', 'HYBRID', 'BOOLEAN', 'FUZZY', 'PHONETIC', 'WILDCARD', 'REGEX']),
  scope: z.enum(['GLOBAL', 'SCHOOL', 'REGIONAL', 'NATIONAL', 'INTERNATIONAL', 'TENANT', 'MODULE', 'COLLECTION']),
  filters: z.array(z.object({
    field: z.string().min(1),
    type: z.enum(['TERM', 'RANGE', 'EXISTS', 'BOOL', 'NESTED', 'GEO', 'DATE', 'CATEGORY']),
    value: z.union([z.string(), z.number(), z.boolean()]),
    operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'exists', 'wildcard', 'regex', 'geo', 'range']),
  })),
  sort: z.enum(['RELEVANCE', 'DATE', 'POPULARITY', 'RATING', 'DISTANCE', 'CUSTOM']),
  format: z.enum(['LIST', 'CARD', 'TABLE', 'MAP', 'TIMELINE', 'GRAPH', 'SNIPPET', 'HIGHLIGHTED']),
  icon: z.string().min(1),
  color: z.string().min(1),
  order: z.number().int().min(0),
  isDefault: z.boolean(),
  createdBy: z.string().uuid(),
});

export const UpdateSearchPresetSchema = CreateSearchPresetSchema.partial();

// =============================================================================
// Search Alert
// =============================================================================

export const CreateSearchAlertSchema = z.object({
  schoolId,
  userId: z.string().uuid(),
  query: z.string().min(1),
  type: z.enum(['NEW_RESULTS', 'PRICE_CHANGE', 'AVAILABILITY', 'UPDATE', 'CUSTOM']),
  filters: z.array(z.object({
    field: z.string().min(1),
    type: z.enum(['TERM', 'RANGE', 'EXISTS', 'BOOL', 'NESTED', 'GEO', 'DATE', 'CATEGORY']),
    value: z.union([z.string(), z.number(), z.boolean()]),
    operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'exists', 'wildcard', 'regex', 'geo', 'range']),
  })),
  frequency: z.enum(['realtime', 'daily', 'weekly', 'monthly']),
  channel: z.enum(['email', 'push', 'sms', 'webhook']),
  active: z.boolean(),
});

export const UpdateSearchAlertSchema = CreateSearchAlertSchema.partial();

// =============================================================================
// Search Personalization
// =============================================================================

export const CreateSearchPersonalizationSchema = z.object({
  schoolId,
  userId: z.string().uuid(),
  mode: z.enum(['NONE', 'HISTORY', 'ROLE', 'PREFERENCES', 'AI', 'COLLABORATIVE']),
  historyWeight: z.number().min(0).max(1),
  roleWeight: z.number().min(0).max(1),
  preferenceWeight: z.number().min(0).max(1),
  aiWeight: z.number().min(0).max(1),
  collaborativeWeight: z.number().min(0).max(1),
  contextWindow: z.number().int().min(1),
  enabled: z.boolean(),
});

export const UpdateSearchPersonalizationSchema = CreateSearchPersonalizationSchema.partial();

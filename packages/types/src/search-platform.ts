export enum SearchType {
  KEYWORD = 'KEYWORD',
  SEMANTIC = 'SEMANTIC',
  OCR = 'OCR',
  VOICE = 'VOICE',
  IMAGE = 'IMAGE',
  KNOWLEDGE = 'KNOWLEDGE',
  FEDERATED = 'FEDERATED',
  CROSS_TENANT = 'CROSS_TENANT',
  NATURAL_LANGUAGE = 'NATURAL_LANGUAGE',
  HYBRID = 'HYBRID',
  BOOLEAN = 'BOOLEAN',
  FUZZY = 'FUZZY',
  PHONETIC = 'PHONETIC',
  WILDCARD = 'WILDCARD',
  REGEX = 'REGEX',
}

export enum SearchScope {
  GLOBAL = 'GLOBAL',
  SCHOOL = 'SCHOOL',
  REGIONAL = 'REGIONAL',
  NATIONAL = 'NATIONAL',
  INTERNATIONAL = 'INTERNATIONAL',
  TENANT = 'TENANT',
  MODULE = 'MODULE',
  COLLECTION = 'COLLECTION',
}

export enum SearchIndexType {
  STUDENTS = 'STUDENTS',
  TEACHERS = 'TEACHERS',
  COURSES = 'COURSES',
  DOCUMENTS = 'DOCUMENTS',
  RESOURCES = 'RESOURCES',
  ASSESSMENTS = 'ASSESSMENTS',
  EVENTS = 'EVENTS',
  NOTIFICATIONS = 'NOTIFICATIONS',
  MESSAGES = 'MESSAGES',
  POLICIES = 'POLICIES',
  REPORTS = 'REPORTS',
  ANALYTICS = 'ANALYTICS',
}

export enum SearchStatus {
  INDEXING = 'INDEXING',
  READY = 'READY',
  UPDATING = 'UPDATING',
  ERROR = 'ERROR',
  MAINTENANCE = 'MAINTENANCE',
  REBUILDING = 'REBUILDING',
}

export enum QueryLanguage {
  NATURAL_LANGUAGE = 'NATURAL_LANGUAGE',
  BOOLEAN = 'BOOLEAN',
  LUCENE = 'LUCENE',
  SQL = 'SQL',
  CYPHER = 'CYPHER',
  CUSTOM = 'CUSTOM',
}

export enum ResultFormat {
  LIST = 'LIST',
  CARD = 'CARD',
  TABLE = 'TABLE',
  MAP = 'MAP',
  TIMELINE = 'TIMELINE',
  GRAPH = 'GRAPH',
  SNIPPET = 'SNIPPET',
  HIGHLIGHTED = 'HIGHLIGHTED',
}

export enum SortRelevance {
  RELEVANCE = 'RELEVANCE',
  DATE = 'DATE',
  POPULARITY = 'POPULARITY',
  RATING = 'RATING',
  DISTANCE = 'DISTANCE',
  CUSTOM = 'CUSTOM',
}

export enum FacetType {
  TEXT = 'TEXT',
  DATE_RANGE = 'DATE_RANGE',
  NUMERIC = 'NUMERIC',
  BOOLEAN = 'BOOLEAN',
  HIERARCHICAL = 'HIERARCHICAL',
  GEO = 'GEO',
  TAG = 'TAG',
}

export enum HighlightMode {
  NONE = 'NONE',
  SIMPLE = 'SIMPLE',
  UNIQUE = 'UNIQUE',
  DETAILED = 'DETAILED',
  SNIPPET = 'SNIPPET',
}

export enum SpellCheckMode {
  NONE = 'NONE',
  SUGGEST = 'SUGGEST',
  AUTO_CORRECT = 'AUTO_CORRECT',
  CONFIRM = 'CONFIRM',
}

export enum AutoCompleteType {
  PREFIX = 'PREFIX',
  FUZZY = 'FUZZY',
  SEMANTIC = 'SEMANTIC',
  POPULAR = 'POPULAR',
  RECENT = 'RECENT',
  PERSONALIZED = 'PERSONALIZED',
}

export enum SearchFilterType {
  TERM = 'TERM',
  RANGE = 'RANGE',
  EXISTS = 'EXISTS',
  BOOL = 'BOOL',
  NESTED = 'NESTED',
  GEO = 'GEO',
  DATE = 'DATE',
  CATEGORY = 'CATEGORY',
}

export enum IndexFieldType {
  TEXT = 'TEXT',
  KEYWORD = 'KEYWORD',
  LONG = 'LONG',
  DOUBLE = 'DOUBLE',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  NESTED = 'NESTED',
  VECTOR = 'VECTOR',
  GEO_POINT = 'GEO_POINT',
}

export enum AnalyzerType {
  STANDARD = 'STANDARD',
  SIMPLE = 'SIMPLE',
  WHITESPACE = 'WHITESPACE',
  PATTERN = 'PATTERN',
  CUSTOM = 'CUSTOM',
  LANGUAGE = 'LANGUAGE',
  STEMMING = 'STEMMING',
  STOP_WORDS = 'STOP_WORDS',
}

export enum TokenFilterType {
  LOWERCASE = 'LOWERCASE',
  UPPERCASE = 'UPPERCASE',
  STEM = 'STEM',
  SYNONYM = 'SYNONYM',
  STOP_WORDS = 'STOP_WORDS',
  NGRAM = 'NGRAM',
  EDGE_NGRAM = 'EDGE_NGRAM',
  PHONETIC = 'PHONETIC',
  DECOMPOUND = 'DECOMPOUND',
  WORD_DELIMITER = 'WORD_DELIMITER',
}

export enum SearchMode {
  INTERACTIVE = 'INTERACTIVE',
  BATCH = 'BATCH',
  REAL_TIME = 'REAL_TIME',
  SCHEDULED = 'SCHEDULED',
  ON_DEMAND = 'ON_DEMAND',
}

export enum OCRStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  UNSUPPORTED = 'UNSUPPORTED',
}

export enum VoiceStatus {
  LISTENING = 'LISTENING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum ImageStatus {
  UPLOADING = 'UPLOADING',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum SearchProvider {
  ELASTICSEARCH = 'ELASTICSEARCH',
  OPENSEARCH = 'OPENSEARCH',
  SOLR = 'SOLR',
  MEILISEARCH = 'MEILISEARCH',
  TYPESENSE = 'TYPESENSE',
  ALGOLIA = 'ALGOLIA',
  CUSTOM = 'CUSTOM',
}

export enum VectorStore {
  PINECONE = 'PINECONE',
  WEAVIATE = 'WEAVIATE',
  QDRANT = 'QDRANT',
  MILVUS = 'MILVUS',
  CHROMA = 'CHROMA',
  FAISS = 'FAISS',
  PGVECTOR = 'PGVECTOR',
  CUSTOM = 'CUSTOM',
}

export enum EmbeddingModel {
  OPENAI = 'OPENAI',
  HUGGINGFACE = 'HUGGINGFACE',
  COHERE = 'COHERE',
  CUSTOM = 'CUSTOM',
  LOCAL = 'LOCAL',
}

export enum SearchSecurity {
  NONE = 'NONE',
  RBAC = 'RBAC',
  ACL = 'ACL',
  TENANT_ISOLATION = 'TENANT_ISOLATION',
  ENCRYPTED = 'ENCRYPTED',
}

export enum SearchAnalyticsType {
  CLICKS = 'CLICKS',
  IMPRESSIONS = 'IMPRESSIONS',
  QUERIES = 'QUERIES',
  REFORMULATIONS = 'REFORMULATIONS',
  ZERO_RESULTS = 'ZERO_RESULTS',
  TIME_SPENT = 'TIME_SPENT',
}

export enum QueryIntent {
  INFORMATIONAL = 'INFORMATIONAL',
  NAVIGATIONAL = 'NAVIGATIONAL',
  TRANSACTIONAL = 'TRANSACTIONAL',
  EXPLORATORY = 'EXPLORATORY',
  COMPARATIVE = 'COMPARATIVE',
}

export enum SearchResultAction {
  VIEW = 'VIEW',
  DOWNLOAD = 'DOWNLOAD',
  SHARE = 'SHARE',
  BOOKMARK = 'BOOKMARK',
  PRINT = 'PRINT',
  EXPORT = 'EXPORT',
}

export enum SearchPersonalization {
  NONE = 'NONE',
  HISTORY = 'HISTORY',
  ROLE = 'ROLE',
  PREFERENCES = 'PREFERENCES',
  AI = 'AI',
  COLLABORATIVE = 'COLLABORATIVE',
}

export enum FederatedSource {
  DATABASE = 'DATABASE',
  API = 'API',
  FILE_SYSTEM = 'FILE_SYSTEM',
  CLOUD_STORAGE = 'CLOUD_STORAGE',
  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE',
}

export enum CrossTenantMode {
  SHARED = 'SHARED',
  ISOLATED = 'ISOLATED',
  FILTERED = 'FILTERED',
  AGGREGATED = 'AGGREGATED',
  ANONYMIZED = 'ANONYMIZED',
}

export enum NaturalLanguageProcessor {
  STANDARD = 'STANDARD',
  ADVANCED = 'ADVANCED',
  AI_POWERED = 'AI_POWERED',
  CUSTOM = 'CUSTOM',
}

export enum SearchPerformanceLevel {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  AVERAGE = 'AVERAGE',
  POOR = 'POOR',
  CRITICAL = 'CRITICAL',
}

export enum CacheStrategy {
  NONE = 'NONE',
  IN_MEMORY = 'IN_MEMORY',
  REDIS = 'REDIS',
  CDN = 'CDN',
  HYBRID = 'HYBRID',
}

export enum IndexRefreshFrequency {
  REALTIME = 'REALTIME',
  NEAR_REALTIME = 'NEAR_REALTIME',
  PERIODIC = 'PERIODIC',
  ON_DEMAND = 'ON_DEMAND',
  MANUAL = 'MANUAL',
}

export enum SearchAlertType {
  NEW_RESULTS = 'NEW_RESULTS',
  PRICE_CHANGE = 'PRICE_CHANGE',
  AVAILABILITY = 'AVAILABILITY',
  UPDATE = 'UPDATE',
  CUSTOM = 'CUSTOM',
}

export enum DataEnrichment {
  NONE = 'NONE',
  AUTO_CLASSIFY = 'AUTO_CLASSIFY',
  TAG = 'TAG',
  SUMMARIZE = 'SUMMARIZE',
  TRANSLATE = 'TRANSLATE',
  EXTRACT = 'EXTRACT',
}

export enum SearchQualityLevel {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  UNCERTAIN = 'UNCERTAIN',
}

export enum DuplicateDetection {
  NONE = 'NONE',
  EXACT = 'EXACT',
  FUZZY = 'FUZZY',
  SEMANTIC = 'SEMANTIC',
  ML_BASED = 'ML_BASED',
}

export enum ResultConfidence {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  EXACT = 'EXACT',
}

export interface GlobalSearch {
  id: string;
  schoolId: string;
  query: string;
  scope: SearchScope;
  types: SearchType[];
  filters: SearchFilter[];
  facets: SearchFacet[];
  sort: SortRelevance;
  page: number;
  pageSize: number;
  maxResults: number;
  timeout: number;
  userId: string;
  sessionId: string;
  timestamp: Date;
  status: SearchStatus;
  resultCount: number;
  durationMs: number;
}

export interface SemanticSearch {
  id: string;
  schoolId: string;
  query: string;
  embedding: number[];
  model: EmbeddingModel;
  threshold: number;
  maxResults: number;
  scope: SearchScope;
  filters: SearchFilter[];
  language: string;
  context: string;
  userId: string;
  timestamp: Date;
  durationMs: number;
}

export interface OCRSearch {
  id: string;
  schoolId: string;
  documentId: string;
  imageUrl: string;
  status: OCRStatus;
  extractedText: string;
  confidence: ResultConfidence;
  fields: OCRField[];
  pages: OCRPage[];
  language: string;
  processingTimeMs: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceSearch {
  id: string;
  schoolId: string;
  audioUrl: string;
  status: VoiceStatus;
  transcription: VoiceTranscription;
  query: string;
  language: string;
  confidence: number;
  commands: VoiceCommand[];
  userId: string;
  timestamp: Date;
  durationMs: number;
}

export interface ImageSearch {
  id: string;
  schoolId: string;
  imageUrl: string;
  status: ImageStatus;
  analysis: ImageAnalysis;
  tags: ImageTag[];
  similarResults: SearchResultItem[];
  userId: string;
  timestamp: Date;
  durationMs: number;
}

export interface KnowledgeSearch {
  id: string;
  schoolId: string;
  query: string;
  knowledgeBase: string;
  topK: number;
  threshold: number;
  context: string;
  answer: string;
  sources: SearchResultItem[];
  confidence: ResultConfidence;
  userId: string;
  timestamp: Date;
}

export interface FederatedSearch {
  id: string;
  schoolId: string;
  query: string;
  sources: FederatedSource[];
  config: FederatedConfig;
  results: FederatedResult[];
  totalResults: number;
  durationMs: number;
  status: SearchStatus;
  userId: string;
  timestamp: Date;
}

export interface CrossTenantSearch {
  id: string;
  query: string;
  mode: CrossTenantMode;
  tenantIds: string[];
  filters: SearchFilter[];
  results: CrossTenantResult[];
  totalResults: number;
  aggregated: boolean;
  anonymized: boolean;
  userId: string;
  timestamp: Date;
}

export interface NaturalLanguageSearch {
  id: string;
  schoolId: string;
  query: string;
  processor: NaturalLanguageProcessor;
  intent: QueryIntent;
  entities: Record<string, string>[];
  translatedQuery: string;
  results: SearchResult[];
  confidence: ResultConfidence;
  userId: string;
  timestamp: Date;
}

export interface SearchQuery {
  id: string;
  schoolId: string;
  raw: string;
  parsed: string;
  type: SearchType;
  language: QueryLanguage;
  scope: SearchScope;
  filters: SearchFilter[];
  facets: SearchFacet[];
  sort: SortRelevance;
  page: number;
  pageSize: number;
  highlight: SearchHighlight;
  explain: boolean;
  trackScores: boolean;
  userId: string;
  sessionId: string;
  timestamp: Date;
}

export interface SearchFilter {
  id: string;
  field: string;
  type: SearchFilterType;
  value: string | number | boolean | Date;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'exists' | 'wildcard' | 'regex' | 'geo' | 'range';
  boost: number;
  negated: boolean;
  nested: SearchFilter[];
}

export interface SearchFacet {
  id: string;
  field: string;
  type: FacetType;
  label: string;
  size: number;
  order: SortRelevance;
  minCount: number;
  missing: boolean;
  allTerms: boolean;
  ranges: SearchFacetRange[];
  aggregations: Record<string, number>;
}

export interface SearchFacetRange {
  from: number;
  to: number;
  label: string;
  count: number;
}

export interface SearchHighlight {
  enabled: boolean;
  mode: HighlightMode;
  fields: string[];
  preTag: string;
  postTag: string;
  fragmentSize: number;
  fragmentCount: number;
  numberofFragments: number;
  requireFieldMatch: boolean;
}

export interface SearchIndex {
  id: string;
  schoolId: string;
  name: string;
  alias: string;
  status: SearchStatus;
  type: SearchIndexType;
  fields: SearchField[];
  schema: SearchSchema;
  mappings: SearchMapping[];
  analyzers: SearchAnalyzer[];
  documentCount: number;
  sizeBytes: number;
  refreshFrequency: IndexRefreshFrequency;
  lastRefreshedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchDocument {
  id: string;
  indexId: string;
  schoolId: string;
  type: SearchIndex;
  sourceId: string;
  sourceType: string;
  fields: Record<string, unknown>;
  embedding: number[];
  tags: string[];
  metadata: Record<string, unknown>;
  version: number;
  indexedAt: Date;
  updatedAt: Date;
}

export interface SearchField {
  name: string;
  type: IndexFieldType;
  analyzer: string;
  searchable: boolean;
  sortable: boolean;
  facetable: boolean;
  stored: boolean;
  indexed: boolean;
  boost: number;
  nullValue: string;
  copyTo: string[];
  properties: Record<string, SearchField>;
}

export interface SearchSchema {
  version: number;
  fields: SearchField[];
  relations: Record<string, string>;
  metadata: Record<string, unknown>;
}

export interface SearchMapping {
  id: string;
  indexId: string;
  sourceField: string;
  targetField: string;
  transform: string;
  condition: string;
  priority: number;
}

export interface SearchAnalyzer {
  id: string;
  name: string;
  type: AnalyzerType;
  tokenizer: SearchTokenizer;
  tokenFilters: SearchTokenFilter[];
  charFilters: string[];
  language: string;
}

export interface SearchTokenizer {
  type: string;
  pattern: string;
  maxTokenLength: number;
  minGram: number;
  maxGram: number;
}

export interface SearchTokenFilter {
  type: TokenFilterType;
  name: string;
  config: Record<string, unknown>;
}

export interface SearchConfig {
  id: string;
  schoolId: string;
  provider: SearchProvider;
  vectorStore: VectorStore;
  embeddingModel: EmbeddingModel;
  security: SearchSecurity;
  cacheStrategy: CacheStrategy;
  analytics: SearchAnalyticsType[];
  settings: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchSecurityConfig {
  id: string;
  schoolId: string;
  mode: SearchSecurity;
  rbacEnabled: boolean;
  aclEnabled: boolean;
  tenantIsolation: boolean;
  encryptedFields: string[];
  allowedRoles: string[];
  deniedRoles: string[];
  ipWhitelist: string[];
  rateLimit: number;
}

export interface SearchPerformanceMetrics {
  id: string;
  schoolId: string;
  avgQueryTimeMs: number;
  p50QueryTimeMs: number;
  p90QueryTimeMs: number;
  p95QueryTimeMs: number;
  p99QueryTimeMs: number;
  totalQueries: number;
  queriesPerSecond: number;
  indexSize: number;
  cacheHitRate: number;
  errorRate: number;
  uptime: number;
  level: SearchPerformanceLevel;
  measuredAt: Date;
}

export interface SearchAnalyticsData {
  id: string;
  schoolId: string;
  date: Date;
  totalQueries: number;
  uniqueUsers: number;
  avgResults: number;
  zeroResultRate: number;
  avgClickPosition: number;
  clickThroughRate: number;
  topQueries: SearchAnalyticsEntry[];
  topNoResults: string[];
  reformulations: number;
  sessions: number;
  avgSessionDuration: number;
}

export interface SearchAnalyticsEntry {
  query: string;
  count: number;
  avgResults: number;
  clickRate: number;
  position: number;
}

export interface SearchResult {
  id: string;
  queryId: string;
  schoolId: string;
  totalResults: number;
  page: number;
  pageSize: number;
  totalPages: number;
  items: SearchResultItem[];
  groups: SearchResultGroup[];
  facets: SearchFacet[];
  suggestions: SearchSuggestion[];
  spelling: SearchSpellCheck;
  highlights: SearchHighlight[];
  durationMs: number;
  status: SearchStatus;
  timestamp: Date;
}

export interface SearchResultItem {
  id: string;
  indexId: string;
  documentId: string;
  type: SearchIndex;
  title: string;
  description: string;
  snippet: string;
  url: string;
  score: number;
  rank: number;
  fields: Record<string, unknown>;
  highlights: Record<string, string[]>;
  metadata: Record<string, unknown>;
  confidence: ResultConfidence;
  actions: SearchResultAction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResultGroup {
  id: string;
  key: string;
  label: string;
  count: number;
  items: SearchResultItem[];
  aggregations: Record<string, number>;
}

export interface SearchResultSnippet {
  field: string;
  text: string;
  highlights: string[];
  startOffset: number;
  endOffset: number;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type: AutoCompleteType;
  score: number;
  count: number;
  metadata: Record<string, unknown>;
}

export interface SearchAutoComplete {
  id: string;
  schoolId: string;
  query: string;
  type: AutoCompleteType;
  maxSuggestions: number;
  suggestions: SearchSuggestion[];
  durationMs: number;
  userId: string;
  timestamp: Date;
}

export interface SearchSpellCheck {
  originalQuery: string;
  suggestedQuery: string;
  mode: SpellCheckMode;
  confidence: number;
  corrections: SearchSpellCorrection[];
}

export interface SearchSpellCorrection {
  original: string;
  corrected: string;
  position: number;
  confidence: number;
}

export interface SearchHistory {
  id: string;
  schoolId: string;
  userId: string;
  query: string;
  type: SearchType;
  scope: SearchScope;
  resultCount: number;
  clickedResults: string[];
  timestamp: Date;
}

export interface SearchBookmark {
  id: string;
  schoolId: string;
  userId: string;
  resultId: string;
  documentId: string;
  title: string;
  url: string;
  notes: string;
  tags: string[];
  folder: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchAlert {
  id: string;
  schoolId: string;
  userId: string;
  query: string;
  type: SearchAlertType;
  filters: SearchFilter[];
  frequency: 'realtime' | 'daily' | 'weekly' | 'monthly';
  channel: 'email' | 'push' | 'sms' | 'webhook';
  lastTriggeredAt: Date;
  nextTriggerAt: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchNotification {
  id: string;
  schoolId: string;
  userId: string;
  alertId: string;
  title: string;
  message: string;
  data: Record<string, unknown>;
  read: boolean;
  channel: string;
  sentAt: Date;
  readAt: Date;
}

export interface SearchPipeline {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  stages: SearchStage[];
  status: SearchStatus;
  version: number;
  config: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchStage {
  id: string;
  pipelineId: string;
  name: string;
  type: string;
  order: number;
  config: Record<string, unknown>;
  condition: string;
  timeout: number;
  retries: number;
}

export interface SearchRun {
  id: string;
  pipelineId: string;
  schoolId: string;
  status: SearchStatus;
  startedAt: Date;
  completedAt: Date;
  durationMs: number;
  recordsProcessed: number;
  recordsFailed: number;
  metrics: Record<string, number>;
  errors: string[];
}

export interface SearchMetric {
  id: string;
  schoolId: string;
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  dimensions: Record<string, string>;
}

export interface SearchTemplate {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  query: string;
  filters: SearchFilter[];
  facets: SearchFacet[];
  sort: SortRelevance;
  format: ResultFormat;
  parameters: SearchTemplateParameter[];
  createdBy: string;
  isPublic: boolean;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchTemplateParameter {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string;
  description: string;
}

export interface SearchPreset {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: SearchType;
  scope: SearchScope;
  filters: SearchFilter[];
  sort: SortRelevance;
  format: ResultFormat;
  icon: string;
  color: string;
  order: number;
  isDefault: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchExport {
  id: string;
  schoolId: string;
  queryId: string;
  format: 'csv' | 'json' | 'xlsx' | 'pdf' | 'xml';
  status: SearchStatus;
  fileUrl: string;
  fileSizeBytes: number;
  recordCount: number;
  requestedBy: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface SearchAI {
  id: string;
  schoolId: string;
  model: EmbeddingModel;
  enabled: boolean;
  config: Record<string, unknown>;
  usageCount: number;
  avgLatencyMs: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchAIModel {
  id: string;
  name: string;
  provider: EmbeddingModel;
  version: string;
  dimensions: number;
  maxTokens: number;
  costPer1kTokens: number;
  languages: string[];
  capabilities: string[];
}

export interface SearchAIInsight {
  id: string;
  schoolId: string;
  type: string;
  title: string;
  description: string;
  data: Record<string, unknown>;
  confidence: ResultConfidence;
  actionable: boolean;
  generatedAt: Date;
}

export interface SearchAIQuery {
  id: string;
  schoolId: string;
  originalQuery: string;
  enhancedQuery: string;
  intent: QueryIntent;
  entities: Record<string, string>[];
  suggestions: string[];
  confidence: ResultConfidence;
  processingTimeMs: number;
  timestamp: Date;
}

export interface VectorEmbedding {
  id: string;
  schoolId: string;
  documentId: string;
  model: EmbeddingModel;
  vector: number[];
  dimensions: number;
  content: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export interface VectorSearch {
  id: string;
  schoolId: string;
  query: string;
  queryVector: number[];
  model: EmbeddingModel;
  store: VectorStore;
  topK: number;
  threshold: number;
  filter: Record<string, unknown>;
  results: VectorSearchResult[];
  durationMs: number;
  timestamp: Date;
}

export interface VectorSearchResult {
  id: string;
  documentId: string;
  score: number;
  vector: number[];
  content: string;
  metadata: Record<string, unknown>;
}

export interface VectorIndex {
  id: string;
  schoolId: string;
  name: string;
  store: VectorStore;
  dimensions: number;
  metric: 'cosine' | 'euclidean' | 'dot_product';
  vectorCount: number;
  sizeBytes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VectorStoreConfig {
  id: string;
  type: VectorStore;
  host: string;
  port: number;
  apiKey: string;
  namespace: string;
  collections: string[];
  settings: Record<string, unknown>;
}

export interface OCRDocument {
  id: string;
  schoolId: string;
  fileUrl: string;
  fileName: string;
  mimeType: string;
  status: OCRStatus;
  pages: OCRPage[];
  extractedText: string;
  fields: OCRField[];
  confidence: ResultConfidence;
  processingTimeMs: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OCRResult {
  documentId: string;
  text: string;
  confidence: number;
  blocks: OCRBlock[];
  tables: OCRTable[];
  metadata: Record<string, unknown>;
}

export interface OCRPage {
  pageNumber: number;
  imageUrl: string;
  text: string;
  confidence: number;
  width: number;
  height: number;
  blocks: OCRBlock[];
}

export interface OCRBlock {
  id: string;
  type: 'text' | 'heading' | 'paragraph' | 'table' | 'list' | 'image';
  text: string;
  confidence: number;
  boundingBox: { x: number; y: number; width: number; height: number };
  children: OCRBlock[];
}

export interface OCRTable {
  rows: number;
  columns: number;
  cells: OCRTableCell[][];
}

export interface OCRTableCell {
  text: string;
  rowSpan: number;
  colSpan: number;
  confidence: number;
}

export interface OCRField {
  name: string;
  value: string;
  confidence: number;
  type: string;
  position: { x: number; y: number };
}

export interface VoiceQuery {
  id: string;
  schoolId: string;
  audioUrl: string;
  durationMs: number;
  language: string;
  status: VoiceStatus;
  userId: string;
  timestamp: Date;
}

export interface VoiceResult {
  queryId: string;
  transcription: VoiceTranscription;
  query: string;
  intent: QueryIntent;
  confidence: number;
  alternatives: string[];
}

export interface VoiceTranscription {
  text: string;
  confidence: number;
  words: VoiceWord[];
  language: string;
  durationMs: number;
}

export interface VoiceWord {
  word: string;
  startMs: number;
  endMs: number;
  confidence: number;
}

export interface VoiceCommand {
  id: string;
  name: string;
  pattern: string;
  action: string;
  parameters: Record<string, string>;
  enabled: boolean;
}

export interface ImageQuery {
  id: string;
  schoolId: string;
  imageUrl: string;
  mimeType: string;
  fileSizeBytes: number;
  status: ImageStatus;
  userId: string;
  timestamp: Date;
}

export interface ImageResult {
  queryId: string;
  analysis: ImageAnalysis;
  tags: ImageTag[];
  similarImages: SearchResultItem[];
  ocrText: string;
  confidence: number;
}

export interface ImageAnalysis {
  width: number;
  height: number;
  format: string;
  colorSpace: string;
  dominantColors: string[];
  objects: ImageObject[];
  faces: ImageFace[];
  text: string;
  description: string;
}

export interface ImageObject {
  label: string;
  confidence: number;
  boundingBox: { x: number; y: number; width: number; height: number };
}

export interface ImageFace {
  confidence: number;
  boundingBox: { x: number; y: number; width: number; height: number };
  age: number;
  gender: string;
  emotion: string;
}

export interface ImageTag {
  name: string;
  confidence: number;
  source: string;
}

export interface FederatedSourceConfig {
  id: string;
  type: FederatedSource;
  name: string;
  endpoint: string;
  apiKey: string;
  timeout: number;
  retries: number;
  enabled: boolean;
  priority: number;
  headers: Record<string, string>;
  mappings: Record<string, string>;
  settings: Record<string, unknown>;
}

export interface FederatedQuery {
  id: string;
  query: string;
  sources: string[];
  timeout: number;
  mergeStrategy: 'concat' | 'merge' | 'rank';
  filters: SearchFilter[];
}

export interface FederatedResult {
  sourceId: string;
  sourceName: string;
  items: SearchResultItem[];
  totalResults: number;
  durationMs: number;
  success: boolean;
  error: string;
}

export interface FederatedConfig {
  sources: FederatedSourceConfig[];
  mergeStrategy: 'concat' | 'merge' | 'rank';
  timeout: number;
  maxResults: number;
  deduplication: DuplicateDetection;
}

export interface CrossTenantQuery {
  id: string;
  query: string;
  mode: CrossTenantMode;
  tenantIds: string[];
  filters: SearchFilter[];
  anonymize: boolean;
  aggregate: boolean;
}

export interface CrossTenantResult {
  tenantId: string;
  tenantName: string;
  items: SearchResultItem[];
  totalResults: number;
  durationMs: number;
}

export interface CrossTenantConfig {
  modes: CrossTenantMode[];
  allowedTenants: string[];
  deniedTenants: string[];
  anonymizeFields: string[];
  aggregationRules: Record<string, unknown>;
}

export interface SearchDashboard {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  widgets: SearchDashboardWidget[];
  layout: Record<string, unknown>[];
  isDefault: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchDashboardWidget {
  id: string;
  type: 'chart' | 'table' | 'metric' | 'list';
  title: string;
  query: string;
  config: Record<string, unknown>;
  position: { x: number; y: number; width: number; height: number };
}

export interface SearchReport {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  dateRange: { start: Date; end: Date };
  metrics: Record<string, number>;
  insights: SearchInsight[];
  generatedAt: Date;
  fileUrl: string;
}

export interface SearchInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  metric: string;
  value: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  actionable: boolean;
}

export interface SearchEvent {
  id: string;
  schoolId: string;
  type: SearchEventType;
  source: SearchEventSource;
  userId: string;
  query: string;
  resultId: string;
  data: Record<string, unknown>;
  timestamp: Date;
}

export enum SearchEventType {
  QUERY = 'QUERY',
  CLICK = 'CLICK',
  IMPRESSION = 'IMPRESSION',
  REFORMULATION = 'REFORMULATION',
  PAGINATION = 'PAGINATION',
  FILTER = 'FILTER',
  SORT = 'SORT',
  BOOKMARK = 'BOOKMARK',
  SHARE = 'SHARE',
  EXPORT = 'EXPORT',
}

export enum SearchEventSource {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  API = 'API',
  WEBHOOK = 'WEBHOOK',
  SCHEDULED = 'SCHEDULED',
}

export interface SearchQualityAssessment {
  id: string;
  schoolId: string;
  queryId: string;
  level: SearchQualityLevel;
  score: number;
  relevance: number;
  freshness: number;
  authority: number;
  diversity: number;
  metrics: Record<string, number>;
  feedback: string;
  assessedAt: Date;
}

export interface SearchRelevance {
  id: string;
  schoolId: string;
  query: string;
  documentId: string;
  score: number;
  humanScore: number;
  ndcg: number;
  mrr: number;
  precision: number;
  recall: number;
  f1: number;
  assessedAt: Date;
}

export interface SearchRanking {
  id: string;
  schoolId: string;
  model: string;
  version: string;
  weights: Record<string, number>;
  features: string[];
  accuracy: number;
  trainedAt: Date;
  active: boolean;
}

export interface SearchPersonalizationConfig {
  id: string;
  schoolId: string;
  mode: SearchPersonalization;
  userId: string;
  historyWeight: number;
  roleWeight: number;
  preferenceWeight: number;
  aiWeight: number;
  collaborativeWeight: number;
  contextWindow: number;
  enabled: boolean;
}

export interface SearchRecommendation {
  id: string;
  schoolId: string;
  userId: string;
  type: string;
  query: string;
  results: SearchResultItem[];
  reason: string;
  score: number;
  generatedAt: Date;
}

export interface SearchContext {
  id: string;
  schoolId: string;
  userId: string;
  sessionId: string;
  previousQueries: string[];
  clickedDocuments: string[];
  userRole: string;
  department: string;
  location: string;
  device: string;
  language: string;
  timestamp: Date;
}

export interface SearchVersion {
  id: string;
  schoolId: string;
  version: string;
  schemaVersion: number;
  indexVersion: number;
  changes: string[];
  breaking: boolean;
  createdAt: Date;
  appliedAt: Date;
}

export interface SearchMigration {
  id: string;
  schoolId: string;
  fromVersion: string;
  toVersion: string;
  steps: SearchMigrationStep[];
  status: SearchStatus;
  startedAt: Date;
  completedAt: Date;
  errors: string[];
}

export interface SearchMigrationStep {
  id: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  status: SearchStatus;
  startedAt: Date;
  completedAt: Date;
  error: string;
}

export interface SearchAuditLog {
  id: string;
  schoolId: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  changes: Record<string, { old: unknown; new: unknown }>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

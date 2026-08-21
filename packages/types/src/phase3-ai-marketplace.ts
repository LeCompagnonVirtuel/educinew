// Phase 3: AI Automation + Marketplace + Developer Portal Types

// ============================================================================
// ENUMS
// ============================================================================

export const AIProvider = {
  OpenAI: 'openai',
  Anthropic: 'anthropic',
  Gemini: 'gemini',
  Mistral: 'mistral',
  DeepSeek: 'deepseek',
  Custom: 'custom',
} as const;
export type AIProvider = (typeof AIProvider)[keyof typeof AIProvider];

export const AIModelType = {
  Chat: 'chat',
  Completion: 'completion',
  Embedding: 'embedding',
  Image: 'image',
  Audio: 'audio',
  Multimodal: 'multimodal',
  Code: 'code',
} as const;
export type AIModelType = (typeof AIModelType)[keyof typeof AIModelType];

export const AIAgentType = {
  Assistant: 'assistant',
  Classifier: 'classifier',
  Extractor: 'extractor',
  Translator: 'translator',
  Summarizer: 'summarizer',
  Moderator: 'moderator',
  Evaluator: 'evaluator',
  Custom: 'custom',
} as const;
export type AIAgentType = (typeof AIAgentType)[keyof typeof AIAgentType];

export const AITaskStatus = {
  Pending: 'pending',
  Processing: 'processing',
  Completed: 'completed',
  Failed: 'failed',
  Cancelled: 'cancelled',
  Timeout: 'timeout',
} as const;
export type AITaskStatus = (typeof AITaskStatus)[keyof typeof AITaskStatus];

export const PromptCategory = {
  Education: 'education',
  Communication: 'communication',
  Assessment: 'assessment',
  Analytics: 'analytics',
  Admin: 'admin',
  Custom: 'custom',
} as const;
export type PromptCategory = (typeof PromptCategory)[keyof typeof PromptCategory];

export const KnowledgeBaseStatus = {
  Active: 'active',
  Indexing: 'indexing',
  Error: 'error',
  Archived: 'archived',
} as const;
export type KnowledgeBaseStatus = (typeof KnowledgeBaseStatus)[keyof typeof KnowledgeBaseStatus];

export const EmbeddingModel = {
  TextEmbedding3Small: 'textembedding3_small',
  TextEmbedding3Large: 'textembedding3_large',
  Voyage: 'voyage',
  Custom: 'custom',
} as const;
export type EmbeddingModel = (typeof EmbeddingModel)[keyof typeof EmbeddingModel];

export const RAGStrategy = {
  Similarity: 'similarity',
  Hybrid: 'hybrid',
  Keyword: 'keyword',
  Contextual: 'contextual',
  Reranked: 'reranked',
} as const;
export type RAGStrategy = (typeof RAGStrategy)[keyof typeof RAGStrategy];

export const MarketplaceItemType = {
  Plugin: 'plugin',
  Extension: 'extension',
  Connector: 'connector',
  Template: 'template',
  Theme: 'theme',
  Integration: 'integration',
} as const;
export type MarketplaceItemType = (typeof MarketplaceItemType)[keyof typeof MarketplaceItemType];

export const MarketplaceItemStatus = {
  Draft: 'draft',
  Review: 'review',
  Published: 'published',
  Rejected: 'rejected',
  Deprecated: 'deprecated',
  Archived: 'archived',
} as const;
export type MarketplaceItemStatus = (typeof MarketplaceItemStatus)[keyof typeof MarketplaceItemStatus];

export const SubscriptionTier = {
  Free: 'free',
  Starter: 'starter',
  Professional: 'professional',
  Enterprise: 'enterprise',
} as const;
export type SubscriptionTier = (typeof SubscriptionTier)[keyof typeof SubscriptionTier];

export const LicenseType = {
  MIT: 'mit',
  Apache2: 'apache2',
  Proprietary: 'proprietary',
  GPL: 'gpl',
  AGPL: 'agpl',
  Custom: 'custom',
} as const;
export type LicenseType = (typeof LicenseType)[keyof typeof LicenseType];

export const DeveloperAppStatus = {
  Draft: 'draft',
  PendingReview: 'pending_review',
  Approved: 'approved',
  Rejected: 'rejected',
  Suspended: 'suspended',
} as const;
export type DeveloperAppStatus = (typeof DeveloperAppStatus)[keyof typeof DeveloperAppStatus];

export const APIKeyTier = {
  Sandbox: 'sandbox',
  Development: 'development',
  Production: 'production',
  Enterprise: 'enterprise',
} as const;
export type APIKeyTier = (typeof APIKeyTier)[keyof typeof APIKeyTier];

export const SDKLanguage = {
  TypeScript: 'typescript',
  Python: 'python',
  Java: 'java',
  Go: 'go',
  Ruby: 'ruby',
  PHP: 'php',
  Swift: 'swift',
  Kotlin: 'kotlin',
  CSharp: 'csharp',
} as const;
export type SDKLanguage = (typeof SDKLanguage)[keyof typeof SDKLanguage];

export const HealthStatus = {
  Healthy: 'healthy',
  Degraded: 'degraded',
  Unhealthy: 'unhealthy',
  Unknown: 'unknown',
} as const;
export type HealthStatus = (typeof HealthStatus)[keyof typeof HealthStatus];

export const AlertSeverity = {
  Critical: 'critical',
  Warning: 'warning',
  Info: 'info',
  Debug: 'debug',
} as const;
export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity];

export const SecurityPolicyType = {
  RateLimit: 'rate_limit',
  IPAllowlist: 'ip_allowlist',
  IPBlocklist: 'ip_blocklist',
  Encryption: 'encryption',
  AuthRequirement: 'auth_requirement',
  DataRetention: 'data_retention',
  Audit: 'audit',
} as const;
export type SecurityPolicyType = (typeof SecurityPolicyType)[keyof typeof SecurityPolicyType];

// ============================================================================
// INTERFACES
// ============================================================================

export interface AIModel {
  id: string;
  schoolId: string;
  provider: AIProvider;
  modelId: string;
  type: AIModelType;
  name: string;
  description: string;
  maxTokens: number;
  costPer1kTokens: number;
  capabilities: string[];
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIAgent {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: AIAgentType;
  modelId: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  tools: AITool[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  handler: string;
  metadata: Record<string, unknown>;
}

export interface AITask {
  id: string;
  schoolId: string;
  agentId: string;
  input: string;
  output: string;
  status: AITaskStatus;
  tokenUsage: TokenUsage;
  duration: number;
  error: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  completedAt: string;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number;
}

export interface AIPrompt {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  category: PromptCategory;
  content: string;
  variables: string[];
  model: string;
  temperature: number;
  maxTokens: number;
  version: number;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface AIPromptVersion {
  id: string;
  promptId: string;
  version: number;
  content: string;
  variables: string[];
  model: string;
  changelog: string;
  publishedAt: string;
  publishedBy: string;
  metadata: Record<string, unknown>;
}

export interface AIKnowledgeBase {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: KnowledgeBaseStatus;
  documentCount: number;
  chunkCount: number;
  embeddingModel: EmbeddingModel;
  embeddingDimension: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIKnowledgeDocument {
  id: string;
  knowledgeBaseId: string;
  schoolId: string;
  title: string;
  content: string;
  contentType: string;
  chunkCount: number;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  indexedAt: string;
}

export interface AIKnowledgeChunk {
  id: string;
  documentId: string;
  content: string;
  embedding: number[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AISemanticSearch {
  id: string;
  schoolId: string;
  query: string;
  results: SearchResult[];
  embeddingModel: EmbeddingModel;
  filters: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SearchResult {
  documentId: string;
  chunkId: string;
  content: string;
  score: number;
  metadata: Record<string, unknown>;
}

export interface AIRAGExecution {
  id: string;
  schoolId: string;
  query: string;
  strategy: RAGStrategy;
  context: string;
  results: SearchResult[];
  prompt: string;
  response: string;
  model: string;
  tokenUsage: TokenUsage;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIAssistant {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  agentId: string;
  knowledgeBaseIds: string[];
  welcomeMessage: string;
  suggestedQuestions: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIAssistantConversation {
  id: string;
  assistantId: string;
  schoolId: string;
  userId: string;
  messages: AIMessage[];
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIMessage {
  role: string;
  content: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIClassification {
  id: string;
  schoolId: string;
  input: string;
  categories: string[];
  result: string;
  confidence: number;
  model: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AISummarization {
  id: string;
  schoolId: string;
  input: string;
  output: string;
  strategy: string;
  model: string;
  tokenUsage: TokenUsage;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIOCRExecution {
  id: string;
  schoolId: string;
  fileUrl: string;
  mimeType: string;
  result: Record<string, unknown>;
  confidence: number;
  model: string;
  duration: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AITranslationExecution {
  id: string;
  schoolId: string;
  input: string;
  output: string;
  sourceLanguage: string;
  targetLanguage: string;
  model: string;
  tokenUsage: TokenUsage;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIRecommendation {
  id: string;
  schoolId: string;
  entityType: string;
  entityId: string;
  userId: string;
  recommendations: RecommendationItem[];
  model: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface RecommendationItem {
  entityId: string;
  entityType: string;
  score: number;
  reason: string;
  metadata: Record<string, unknown>;
}

export interface AIModeration {
  id: string;
  schoolId: string;
  content: string;
  contentType: string;
  results: ModerationResult[];
  model: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface ModerationResult {
  category: string;
  flagged: boolean;
  confidence: number;
  severity: string;
}

export interface AIEvaluation {
  id: string;
  schoolId: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  scores: EvaluationScore[];
  model: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface EvaluationScore {
  metric: string;
  score: number;
  weight: number;
  details: string;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  type: MarketplaceItemType;
  category: string;
  status: MarketplaceItemStatus;
  author: string;
  version: string;
  price: number;
  subscriptionTier: SubscriptionTier;
  license: LicenseType;
  icon: string;
  screenshots: string[];
  tags: string[];
  downloads: number;
  rating: number;
  reviewCount: number;
  dependencies: string[];
  compatibility: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  parentId: string;
  itemCount: number;
  metadata: Record<string, unknown>;
}

export interface MarketplaceReview {
  id: string;
  itemId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface MarketplaceSubscription {
  id: string;
  schoolId: string;
  itemId: string;
  tier: SubscriptionTier;
  status: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface MarketplaceLicense {
  id: string;
  schoolId: string;
  itemId: string;
  licenseKey: string;
  licenseType: LicenseType;
  expiresAt: string;
  maxUsers: number;
  usedUsers: number;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface Plugin {
  id: string;
  marketplaceId: string;
  name: string;
  description: string;
  version: string;
  entryPoint: string;
  hooks: PluginHook[];
  config: Record<string, unknown>;
  permissions: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface PluginHook {
  name: string;
  type: string;
  handler: string;
  description: string;
  metadata: Record<string, unknown>;
}

export interface Extension {
  id: string;
  marketplaceId: string;
  name: string;
  description: string;
  version: string;
  type: string;
  target: string;
  config: Record<string, unknown>;
  permissions: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DeveloperApp {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  status: DeveloperAppStatus;
  clientId: string;
  redirectUris: string[];
  scopes: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface DeveloperSecret {
  id: string;
  appId: string;
  secretHash: string;
  description: string;
  expiresAt: string;
  lastUsedAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface SDKDownload {
  id: string;
  language: SDKLanguage;
  version: string;
  url: string;
  checksum: string;
  size: number;
  changelog: string;
  metadata: Record<string, unknown>;
  publishedAt: string;
}

export interface CodeSample {
  id: string;
  title: string;
  description: string;
  language: SDKLanguage;
  category: string;
  code: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface APIExplorer {
  id: string;
  schoolId: string;
  integrationId: string;
  endpoints: APIEndpointDef[];
  collections: APICollection[];
  metadata: Record<string, unknown>;
}

export interface APIEndpointDef {
  method: string;
  path: string;
  summary: string;
  description: string;
  parameters: Record<string, unknown>[];
  requestBody: Record<string, unknown>;
  responses: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface APICollection {
  id: string;
  name: string;
  description: string;
  endpoints: APIEndpointDef[];
  metadata: Record<string, unknown>;
}

export interface DeveloperLog {
  id: string;
  schoolId: string;
  appId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  duration: number;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface DeveloperUsage {
  id: string;
  schoolId: string;
  appId: string;
  period: string;
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  topEndpoints: Record<string, unknown>[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface DeveloperDashboard {
  id: string;
  schoolId: string;
  apps: DeveloperApp[];
  totalRequests: number;
  activeKeys: number;
  webhooks: number;
  recentLogs: DeveloperLog[];
  metadata: Record<string, unknown>;
}

export interface MarketplaceSearchResult {
  items: MarketplaceItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  facets: Record<string, unknown>;
}

export interface PluginInstallation {
  id: string;
  schoolId: string;
  pluginId: string;
  version: string;
  status: string;
  config: Record<string, unknown>;
  metadata: Record<string, unknown>;
  installedAt: string;
  updatedAt: string;
}

export interface ExtensionInstallation {
  id: string;
  schoolId: string;
  extensionId: string;
  version: string;
  status: string;
  config: Record<string, unknown>;
  metadata: Record<string, unknown>;
  installedAt: string;
}

export interface MarketplaceAnalytics {
  itemId: string;
  downloads: number;
  installs: number;
  activeUsers: number;
  rating: number;
  revenue: number;
  period: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIPipeline {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  steps: AIPipelineStep[];
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIPipelineStep {
  id: string;
  name: string;
  type: string;
  modelId: string;
  config: Record<string, unknown>;
  inputMapping: Record<string, string>;
  metadata: Record<string, unknown>;
}

export interface AIPipelineExecution {
  id: string;
  pipelineId: string;
  schoolId: string;
  input: string;
  output: string;
  status: string;
  stepResults: Record<string, unknown>;
  duration: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIEmbedding {
  id: string;
  schoolId: string;
  content: string;
  model: EmbeddingModel;
  dimensions: number;
  vector: number[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIVectorStore {
  id: string;
  schoolId: string;
  name: string;
  dimensions: number;
  model: EmbeddingModel;
  vectorCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIVectorRecord {
  id: string;
  storeId: string;
  content: string;
  vector: number[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIWebhookEvent {
  id: string;
  schoolId: string;
  eventType: string;
  payload: Record<string, unknown>;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

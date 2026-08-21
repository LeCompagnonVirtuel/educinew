// Phase 2.6: AI Core Platform Types for EduCI

// ============================================================================
// ENUMS
// ============================================================================

export const AIModelProvider = {
  OpenAI: 'openai',
  Anthropic: 'anthropic',
  Gemini: 'gemini',
  Mistral: 'mistral',
  DeepSeek: 'deepseek',
  Llama: 'llama',
  Qwen: 'qwen',
  Cohere: 'cohere',
  AzureOpenAI: 'azure_openai',
  Ollama: 'ollama',
  VLLM: 'vllm',
  LiteLLM: 'litellm',
  Local: 'local',
} as const;
export type AIModelProvider = (typeof AIModelProvider)[keyof typeof AIModelProvider];

export const AIModelCapability = {
  TextCompletion: 'text_completion',
  Chat: 'chat',
  Embedding: 'embedding',
  ImageGeneration: 'image_generation',
  ImageAnalysis: 'image_analysis',
  AudioTranscription: 'audio_transcription',
  AudioSpeech: 'audio_speech',
  CodeGeneration: 'code_generation',
  Reasoning: 'reasoning',
  FunctionCalling: 'function_calling',
  Vision: 'vision',
  Video: 'video',
} as const;
export type AIModelCapability = (typeof AIModelCapability)[keyof typeof AIModelCapability];

export const AIModelStatus = {
  Active: 'active',
  Inactive: 'inactive',
  Deprecated: 'deprecated',
  RateLimited: 'rate_limited',
  Error: 'error',
  Maintenance: 'maintenance',
} as const;
export type AIModelStatus = (typeof AIModelStatus)[keyof typeof AIModelStatus];

export const AISessionStatus = {
  Active: 'active',
  Paused: 'paused',
  Completed: 'completed',
  Failed: 'failed',
  Expired: 'expired',
} as const;
export type AISessionStatus = (typeof AISessionStatus)[keyof typeof AISessionStatus];

export const AIPromptType = {
  System: 'system',
  User: 'user',
  Assistant: 'assistant',
  Function: 'function',
  Template: 'template',
} as const;
export type AIPromptType = (typeof AIPromptType)[keyof typeof AIPromptType];

export const AITemperatureProfile = {
  Deterministic: 'deterministic',
  Precise: 'precise',
  Balanced: 'balanced',
  Creative: 'creative',
  VeryCreative: 'very_creative',
} as const;
export type AITemperatureProfile = (typeof AITemperatureProfile)[keyof typeof AITemperatureProfile];

export const AIStreamFormat = {
  Text: 'text',
  JSON: 'json',
  JSONL: 'jsonl',
  SSE: 'sse',
} as const;
export type AIStreamFormat = (typeof AIStreamFormat)[keyof typeof AIStreamFormat];

export const AIReasoningMode = {
  ChainOfThought: 'chain_of_thought',
  StepByStep: 'step_by_step',
  TreeOfThought: 'tree_of_thought',
  Reflection: 'reflection',
  SelfCritique: 'self_critique',
} as const;
export type AIReasoningMode = (typeof AIReasoningMode)[keyof typeof AIReasoningMode];

export const AIRoutingStrategy = {
  CostOptimized: 'cost_optimized',
  LatencyOptimized: 'latency_optimized',
  QualityOptimized: 'quality_optimized',
  Balanced: 'balanced',
  RoundRobin: 'round_robin',
  FallbackChain: 'fallback_chain',
} as const;
export type AIRoutingStrategy = (typeof AIRoutingStrategy)[keyof typeof AIRoutingStrategy];

export const AIFallbackPolicy = {
  RetrySame: 'retry_same',
  RetryDifferent: 'retry_different',
  Cascade: 'cascade',
  FailFast: 'fail_fast',
  Queue: 'queue',
} as const;
export type AIFallbackPolicy = (typeof AIFallbackPolicy)[keyof typeof AIFallbackPolicy];

export const AIBudgetPeriod = {
  Hourly: 'hourly',
  Daily: 'daily',
  Weekly: 'weekly',
  Monthly: 'monthly',
  Yearly: 'yearly',
} as const;
export type AIBudgetPeriod = (typeof AIBudgetPeriod)[keyof typeof AIBudgetPeriod];

export const AITokenType = {
  Input: 'input',
  Output: 'output',
  CachedInput: 'cached_input',
  Embedding: 'embedding',
  Image: 'image',
} as const;
export type AITokenType = (typeof AITokenType)[keyof typeof AITokenType];

export const AIConversationRole = {
  User: 'user',
  Assistant: 'assistant',
  System: 'system',
  Function: 'function',
  Tool: 'tool',
} as const;
export type AIConversationRole = (typeof AIConversationRole)[keyof typeof AIConversationRole];

export const AIConversationStatus = {
  Active: 'active',
  Archived: 'archived',
  Deleted: 'deleted',
} as const;
export type AIConversationStatus = (typeof AIConversationStatus)[keyof typeof AIConversationStatus];

export const AIMessageStatus = {
  Pending: 'pending',
  Streaming: 'streaming',
  Completed: 'completed',
  Failed: 'failed',
  Cancelled: 'cancelled',
} as const;
export type AIMessageStatus = (typeof AIMessageStatus)[keyof typeof AIMessageStatus];

export const AIFunctionCallStatus = {
  Pending: 'pending',
  Executing: 'executing',
  Completed: 'completed',
  Failed: 'failed',
} as const;
export type AIFunctionCallStatus = (typeof AIFunctionCallStatus)[keyof typeof AIFunctionCallStatus];

export const AIModelTier = {
  Free: 'free',
  Basic: 'basic',
  Standard: 'standard',
  Premium: 'premium',
  Enterprise: 'enterprise',
} as const;
export type AIModelTier = (typeof AIModelTier)[keyof typeof AIModelTier];

export const AIAccessLevel = {
  Public: 'public',
  School: 'school',
  Restricted: 'restricted',
  Private: 'private',
} as const;
export type AIAccessLevel = (typeof AIAccessLevel)[keyof typeof AIAccessLevel];

export const AICacheStrategy = {
  None: 'none',
  Exact: 'exact',
  Semantic: 'semantic',
  Session: 'session',
} as const;
export type AICacheStrategy = (typeof AICacheStrategy)[keyof typeof AICacheStrategy];

export const AIPriority = {
  Critical: 'critical',
  High: 'high',
  Normal: 'normal',
  Low: 'low',
  Background: 'background',
} as const;
export type AIPriority = (typeof AIPriority)[keyof typeof AIPriority];

// ============================================================================
// AI MODELS (15)
// ============================================================================

export interface AIModel {
  id: string;
  schoolId?: string;
  provider: AIModelProvider;
  modelId: string;
  name: string;
  description: string;
  capabilities: AIModelCapability[];
  tier: AIModelTier;
  status: AIModelStatus;
  maxTokens: number;
  contextWindow: number;
  inputCostPer1k: number;
  outputCostPer1k: number;
  embeddingCostPer1k: number;
  rateLimitRpm: number;
  rateLimitTpm: number;
  features: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIModelConfig {
  id: string;
  modelId: string;
  schoolId?: string;
  temperature: number;
  topP: number;
  topK: number;
  maxTokens: number;
  stopSequences: string[];
  presencePenalty: number;
  frequencyPenalty: number;
  responseFormat: string;
  seed: number;
  metadata: Record<string, unknown>;
}

export interface AIModelRoute {
  id: string;
  schoolId: string;
  strategy: AIRoutingStrategy;
  routes: ModelRouteEntry[];
  fallbackModelIds: string[];
  metadata: Record<string, unknown>;
}

export interface ModelRouteEntry {
  modelId: string;
  weight: number;
  maxLatency: number;
  maxCost: number;
  conditions: Record<string, unknown>;
}

export interface AIModelHealth {
  id: string;
  modelId: string;
  provider: AIModelProvider;
  status: AIModelStatus;
  latencyP50: number;
  latencyP95: number;
  latencyP99: number;
  errorRate: number;
  uptime: number;
  lastCheck: string;
  metadata: Record<string, unknown>;
}

export interface AIModelUsage {
  id: string;
  modelId: string;
  schoolId: string;
  period: string;
  requestCount: number;
  tokenCount: TokenUsage;
  cost: number;
  avgLatency: number;
  errorCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cachedTokens: number;
  embeddingTokens: number;
  imageTokens: number;
  cost: number;
}

export interface AITemperatureProfileConfig {
  profile: AITemperatureProfile;
  temperature: number;
  topP: number;
  topK: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface AIStreamingConfig {
  enabled: boolean;
  format: AIStreamFormat;
  chunkSize: number;
  bufferSize: number;
  timeout: number;
  metadata: Record<string, unknown>;
}

export interface AIModelBenchmark {
  id: string;
  modelId: string;
  benchmark: string;
  score: number;
  category: string;
  evaluatedAt: string;
  metadata: Record<string, unknown>;
}

export interface AIFallbackModel {
  id: string;
  schoolId: string;
  primaryModelId: string;
  fallbackModelId: string;
  priority: number;
  conditions: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface AIModelFilter {
  id: string;
  schoolId?: string;
  providers: AIModelProvider[];
  capabilities: AIModelCapability[];
  tier: AIModelTier;
  status: AIModelStatus;
}

export interface AICostBudget {
  id: string;
  schoolId: string;
  name: string;
  amount: number;
  period: AIBudgetPeriod;
  modelIds: string[];
  alertThreshold: number;
  hardLimit: number;
  currentUsage: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  expiresAt: string;
}

export interface AICostBreakdown {
  period: string;
  totalCost: number;
  byProvider: Record<string, number>;
  byModel: Record<string, number>;
  bySchool: Record<string, number>;
  byUser: Record<string, number>;
}

export interface AIUsageQuota {
  id: string;
  schoolId: string;
  userId?: string;
  tokenLimit: number;
  usedTokens: number;
  resetAt: string;
  metadata: Record<string, unknown>;
}

// ============================================================================
// AI SESSIONS & CONVERSATIONS (15)
// ============================================================================

export interface AISession {
  id: string;
  schoolId: string;
  userId: string;
  modelId: string;
  status: AISessionStatus;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  totalTokens: TokenUsage;
  cost: number;
  messageCount: number;
  lastMessageAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export interface AIConversation {
  id: string;
  schoolId: string;
  sessionId: string;
  userId: string;
  title: string;
  status: AIConversationStatus;
  modelId: string;
  tokenCount: number;
  messageCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
}

export interface AIMessage {
  id: string;
  conversationId: string;
  role: AIConversationRole;
  content: string;
  tokenCount: number;
  modelId: string;
  latency: number;
  functionCalls: AIFunctionCall[];
  toolCalls: AIToolCall[];
  status: AIMessageStatus;
  parentMessageId?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIFunctionCall {
  id: string;
  messageId: string;
  functionName: string;
  arguments: Record<string, unknown>;
  result?: Record<string, unknown>;
  status: AIFunctionCallStatus;
  duration: number;
  error?: string;
  metadata: Record<string, unknown>;
}

export interface AIToolCall {
  id: string;
  messageId: string;
  toolType: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: string;
  duration: number;
  metadata: Record<string, unknown>;
}

export interface AIContextWindow {
  id: string;
  sessionId: string;
  messages: AIMessage[];
  tokenCount: number;
  maxTokens: number;
  truncated: boolean;
  metadata: Record<string, unknown>;
}

export interface AIConversationMemory {
  id: string;
  conversationId: string;
  type: string;
  content: string;
  embedding?: number[];
  relevanceScore: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  expiresAt: string;
}

export interface AIConversationSummary {
  id: string;
  conversationId: string;
  summary: string;
  keyPoints: string[];
  tokenCount: number;
  generatedAt: string;
  metadata: Record<string, unknown>;
}

export interface AISessionAnalytics {
  id: string;
  sessionId: string;
  totalTokens: TokenUsage;
  totalCost: number;
  messageCount: number;
  avgLatency: number;
  userSatisfaction: number;
  metadata: Record<string, unknown>;
}

export interface AIPromptTemplate {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  content: string;
  variables: PromptVariable[];
  category: string;
  tags: string[];
  version: number;
  isPublic: boolean;
  usageCount: number;
  rating: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface PromptVariable {
  name: string;
  type: string;
  description: string;
  defaultValue: string;
  required: boolean;
  options?: string[];
}

export interface AIPromptVersion {
  id: string;
  promptId: string;
  version: number;
  content: string;
  variables: PromptVariable[];
  changelog: string;
  performance: PromptPerformance;
  metadata: Record<string, unknown>;
  publishedAt: string;
  publishedBy: string;
}

export interface PromptPerformance {
  avgQuality: number;
  avgLatency: number;
  avgCost: number;
  usageCount: number;
  rating: number;
}

export interface AIPromptExecution {
  id: string;
  promptId: string;
  schoolId: string;
  userId: string;
  variables: Record<string, unknown>;
  input: string;
  output: string;
  modelId: string;
  tokenCount: TokenUsage;
  latency: number;
  cost: number;
  quality: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIPromptCategory {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  icon: string;
  parentId: string;
  itemCount: number;
  metadata: Record<string, unknown>;
}

// ============================================================================
// CONTEXT ENGINE (10)
// ============================================================================

export interface AIContext {
  id: string;
  schoolId: string;
  sessionId: string;
  type: string;
  content: string;
  source: string;
  relevanceScore: number;
  tokenCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  expiresAt: string;
}

export interface AIContextSource {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  status: string;
  refreshInterval: number;
  lastRefreshed: string;
  metadata: Record<string, unknown>;
}

export interface AIContextInjection {
  id: string;
  contextId: string;
  sessionId: string;
  position: number;
  priority: number;
  tokenBudget: number;
  metadata: Record<string, unknown>;
}

export interface AIEvaluation {
  id: string;
  promptId: string;
  modelId: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  scores: EvaluationScore[];
  metadata: Record<string, unknown>;
  evaluatedAt: string;
}

export interface EvaluationScore {
  metric: string;
  score: number;
  weight: number;
  details: string;
}

export interface AIModelEvaluation {
  id: string;
  modelId: string;
  benchmark: string;
  scores: EvaluationScore[];
  evaluator: string;
  evaluatedAt: string;
  metadata: Record<string, unknown>;
}

export interface AITokenUsageByDay {
  date: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  requestCount: number;
}

export interface AITokenUsageByModel {
  modelId: string;
  provider: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  requestCount: number;
}

export interface AITokenUsageByUser {
  userId: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  requestCount: number;
}

export interface AITokenUsageBySchool {
  schoolId: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  requestCount: number;
}

// ============================================================================
// AI PREFERENCES & SETTINGS (10)
// ============================================================================

export interface AISchoolConfig {
  id: string;
  schoolId: string;
  defaultModelId: string;
  fallbackModelId: string;
  maxTokensPerRequest: number;
  dailyTokenBudget: number;
  monthlyCostBudget: number;
  streamingEnabled: boolean;
  safetyLevel: string;
  allowedProviders: AIModelProvider[];
  allowedCapabilities: AIModelCapability[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIUserPreference {
  id: string;
  schoolId: string;
  userId: string;
  preferredModelId: string;
  temperature: number;
  language: string;
  theme: string;
  notifications: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIAccessControl {
  id: string;
  schoolId: string;
  userId?: string;
  role?: string;
  modelIds: string[];
  capabilities: AIModelCapability[];
  maxTokens: number;
  maxDailyRequests: number;
  allowed: boolean;
  metadata: Record<string, unknown>;
}

export interface AIFeatureFlag {
  id: string;
  schoolId: string;
  feature: string;
  enabled: boolean;
  rolloutPercentage: number;
  allowedRoles: string[];
  metadata: Record<string, unknown>;
}

export interface AIBillingConfig {
  id: string;
  schoolId: string;
  billingModel: string;
  creditsRemaining: number;
  creditsTotal: number;
  alertThreshold: number;
  metadata: Record<string, unknown>;
}

export interface AIAuditEntry {
  id: string;
  schoolId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  details: Record<string, unknown>;
  ipAddress: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIPerformanceMetrics {
  id: string;
  schoolId: string;
  modelId: string;
  period: string;
  avgLatencyP50: number;
  avgLatencyP95: number;
  avgLatencyP99: number;
  successRate: number;
  throughput: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIDailyUsage {
  id: string;
  schoolId: string;
  date: string;
  totalRequests: number;
  totalTokens: TokenUsage;
  totalCost: number;
  activeUsers: number;
  metadata: Record<string, unknown>;
}

export interface AIConversationAnalytics {
  id: string;
  schoolId: string;
  period: string;
  totalConversations: number;
  avgMessagesPerConversation: number;
  avgTokensPerConversation: number;
  avgDuration: number;
  satisfactionScore: number;
  metadata: Record<string, unknown>;
}

export interface AIRateLimitConfig {
  id: string;
  schoolId: string;
  userId?: string;
  modelId?: string;
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  tokensPerMinute: number;
  tokensPerDay: number;
  metadata: Record<string, unknown>;
}

// ============================================================================
// AI CONTEXT ENGINE (CONTINUED)
// ============================================================================

export interface AIFunctionDefinition {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  requiredPermissions: string[];
  metadata: Record<string, unknown>;
}

export interface AIFunctionExecution {
  id: string;
  functionId: string;
  userId: string;
  schoolId: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: AIFunctionCallStatus;
  duration: number;
  error?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AICacheEntry {
  id: string;
  schoolId: string;
  cacheKey: string;
  content: string;
  embedding?: number[];
  strategy: AICacheStrategy;
  hitCount: number;
  tokenCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  expiresAt: string;
}

export interface AISafetyFilter {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  rules: Record<string, unknown>[];
  enabled: boolean;
  priority: number;
  metadata: Record<string, unknown>;
}

export interface AIAutoScaling {
  id: string;
  schoolId: string;
  modelId: string;
  minInstances: number;
  maxInstances: number;
  currentInstances: number;
  scaleUpThreshold: number;
  scaleDownThreshold: number;
  cooldownPeriod: number;
  metadata: Record<string, unknown>;
}

export interface AIOptimizationSuggestion {
  id: string;
  schoolId: string;
  type: string;
  description: string;
  potentialSavings: number;
  implementationEffort: string;
  priority: AIPriority;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AITrainingDataset {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  type: string;
  size: number;
  recordCount: number;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AITrainingJob {
  id: string;
  schoolId: string;
  datasetId: string;
  modelId: string;
  status: string;
  progress: number;
  config: Record<string, unknown>;
  metrics: Record<string, number>;
  metadata: Record<string, unknown>;
  createdAt: string;
  completedAt: string;
}

export interface AICustomModel {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  baseModel: string;
  trainingJobId: string;
  status: string;
  version: number;
  metrics: Record<string, number>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AILanguageSupport {
  id: string;
  languageCode: string;
  languageName: string;
  supportedModels: string[];
  features: string[];
  quality: number;
  metadata: Record<string, unknown>;
}

export interface AITranslationConfig {
  id: string;
  schoolId: string;
  sourceLanguage: string;
  targetLanguages: string[];
  modelId: string;
  preserveFormatting: boolean;
  metadata: Record<string, unknown>;
}

export interface AINotificationConfig {
  id: string;
  schoolId: string;
  userId: string;
  type: string;
  channel: string;
  enabled: boolean;
  threshold: number;
  metadata: Record<string, unknown>;
}

export interface AIWebhook {
  id: string;
  schoolId: string;
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
  lastTriggered: string;
  failureCount: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIIntegration {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  status: string;
  lastSynced: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIPlugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  capabilities: AIModelCapability[];
  config: Record<string, unknown>;
  enabled: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIDeploymentConfig {
  id: string;
  schoolId: string;
  environment: string;
  region: string;
  replicas: number;
  resources: Record<string, unknown>;
  scaling: AIAutoScaling;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AILogsEntry {
  id: string;
  schoolId: string;
  level: string;
  message: string;
  source: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}

export interface AIPerformanceBenchmark {
  id: string;
  modelId: string;
  benchmarkType: string;
  score: number;
  latency: number;
  throughput: number;
  evaluatedAt: string;
  metadata: Record<string, unknown>;
}

export interface AICostForecast {
  id: string;
  schoolId: string;
  period: string;
  predictedCost: number;
  confidence: number;
  factors: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIOptimizationRule {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  conditions: Record<string, unknown>[];
  actions: Record<string, unknown>[];
  enabled: boolean;
  priority: number;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIQualityMetric {
  id: string;
  schoolId: string;
  modelId: string;
  metricType: string;
  value: number;
  benchmark: number;
  measuredAt: string;
  metadata: Record<string, unknown>;
}

export interface AISecurityPolicy {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  rules: Record<string, unknown>[];
  enabled: boolean;
  enforcementLevel: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIAccessToken {
  id: string;
  schoolId: string;
  userId: string;
  token: string;
  permissions: string[];
  expiresAt: string;
  lastUsedAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIApiKey {
  id: string;
  schoolId: string;
  name: string;
  key: string;
  permissions: string[];
  rateLimit: number;
  expiresAt: string;
  lastUsedAt: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIModelVersion {
  id: string;
  modelId: string;
  version: string;
  changelog: string;
  status: string;
  performance: PromptPerformance;
  metadata: Record<string, unknown>;
  publishedAt: string;
  publishedBy: string;
}

export interface AIABTest {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  variants: Record<string, unknown>[];
  status: string;
  startDate: string;
  endDate: string;
  results: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface AIFeedback {
  id: string;
  schoolId: string;
  userId: string;
  messageId: string;
  rating: number;
  comment: string;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIInsight {
  id: string;
  schoolId: string;
  type: string;
  title: string;
  description: string;
  data: Record<string, unknown>;
  priority: AIPriority;
  actionable: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIRecommendation {
  id: string;
  schoolId: string;
  userId?: string;
  type: string;
  title: string;
  description: string;
  confidence: number;
  reason: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  expiresAt: string;
}

export interface AIAuditLog {
  id: string;
  schoolId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValues: Record<string, unknown>;
  newValues: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIBillingTransaction {
  id: string;
  schoolId: string;
  type: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AISubscription {
  id: string;
  schoolId: string;
  plan: string;
  status: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  features: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIQuotaAlert {
  id: string;
  schoolId: string;
  userId?: string;
  quotaType: string;
  threshold: number;
  currentValue: number;
  notifiedAt: string;
  metadata: Record<string, unknown>;
}

export interface AIBatchJob {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  status: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  progress: number;
  error?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  completedAt: string;
}

export interface AICacheInvalidation {
  id: string;
  schoolId: string;
  cacheKey: string;
  reason: string;
  invalidatedAt: string;
  metadata: Record<string, unknown>;
}

export interface AILoadBalancer {
  id: string;
  schoolId: string;
  name: string;
  strategy: AIRoutingStrategy;
  targets: Record<string, unknown>[];
  healthCheck: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIModelEndpoint {
  id: string;
  modelId: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  timeout: number;
  retries: number;
  metadata: Record<string, unknown>;
}

export interface AIDocumentProcessing {
  id: string;
  schoolId: string;
  documentType: string;
  modelId: string;
  inputFormat: string;
  outputFormat: string;
  config: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIVoiceConfig {
  id: string;
  schoolId: string;
  modelId: string;
  voice: string;
  speed: number;
  pitch: number;
  volume: number;
  metadata: Record<string, unknown>;
}

export interface AIVideoProcessing {
  id: string;
  schoolId: string;
  modelId: string;
  inputFormat: string;
  outputFormat: string;
  resolution: string;
  fps: number;
  config: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIGenerationConfig {
  id: string;
  schoolId: string;
  modelId: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  topK: number;
  stopSequences: string[];
  presencePenalty: number;
  frequencyPenalty: number;
  metadata: Record<string, unknown>;
}

export interface AIEvaluationCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  minValue: number;
  maxValue: number;
  metadata: Record<string, unknown>;
}

export interface AIBenchmarkSuite {
  id: string;
  name: string;
  description: string;
  criteria: AIEvaluationCriteria[];
  models: string[];
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIBenchmarkResult {
  id: string;
  suiteId: string;
  modelId: string;
  scores: EvaluationScore[];
  overallScore: number;
  evaluatedAt: string;
  metadata: Record<string, unknown>;
}

export interface AIOptimizationResult {
  id: string;
  schoolId: string;
  type: string;
  originalCost: number;
  optimizedCost: number;
  savings: number;
  recommendations: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIModelComparison {
  id: string;
  schoolId: string;
  modelIds: string[];
  criteria: string[];
  results: Record<string, unknown>;
  metadata: Record<string, unknown>;
  comparedAt: string;
}

export interface AIPromptOptimization {
  id: string;
  promptId: string;
  originalContent: string;
  optimizedContent: string;
  improvementScore: number;
  changes: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AITokenEstimation {
  id: string;
  content: string;
  modelId: string;
  estimatedTokens: number;
  confidence: number;
  metadata: Record<string, unknown>;
}

export interface AILatencyBudget {
  id: string;
  schoolId: string;
  modelId: string;
  maxLatency: number;
  currentLatency: number;
  utilization: number;
  metadata: Record<string, unknown>;
  measuredAt: string;
}

export interface AIThroughputConfig {
  id: string;
  schoolId: string;
  modelId: string;
  maxConcurrent: number;
  queueSize: number;
  timeout: number;
  metadata: Record<string, unknown>;
}

export interface AICircuitBreaker {
  id: string;
  schoolId: string;
  modelId: string;
  state: string;
  failureCount: number;
  threshold: number;
  resetTimeout: number;
  lastStateChange: string;
  metadata: Record<string, unknown>;
}

export interface AILoggingConfig {
  id: string;
  schoolId: string;
  level: string;
  destinations: string[];
  retentionDays: number;
  samplingRate: number;
  metadata: Record<string, unknown>;
}

export interface AITracingConfig {
  id: string;
  schoolId: string;
  enabled: boolean;
  sampleRate: number;
  exporters: string[];
  metadata: Record<string, unknown>;
}

export interface AIPrometheusMetrics {
  id: string;
  schoolId: string;
  metricName: string;
  metricType: string;
  labels: Record<string, string>;
  value: number;
  timestamp: string;
}

export interface AIGrafanaDashboard {
  id: string;
  schoolId: string;
  name: string;
  panels: Record<string, unknown>[];
  refreshInterval: number;
  timeRange: string;
  metadata: Record<string, unknown>;
}

export interface AIAlertRule {
  id: string;
  schoolId: string;
  name: string;
  condition: string;
  threshold: number;
  severity: string;
  enabled: boolean;
  notificationChannels: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIOperatorConfig {
  id: string;
  schoolId: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  status: string;
  lastSynced: string;
  metadata: Record<string, unknown>;
}

export interface AIPipelineStep {
  id: string;
  pipelineId: string;
  name: string;
  type: string;
  config: Record<string, unknown>;
  order: number;
  dependencies: string[];
  metadata: Record<string, unknown>;
}

export interface AIPipeline {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  steps: AIPipelineStep[];
  status: string;
  schedule?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIDataFlow {
  id: string;
  schoolId: string;
  name: string;
  source: string;
  destination: string;
  transform: Record<string, unknown>;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AIBackupConfig {
  id: string;
  schoolId: string;
  frequency: string;
  retention: number;
  destinations: string[];
  encrypted: boolean;
  metadata: Record<string, unknown>;
  lastBackup: string;
}

export interface AIDisasterRecovery {
  id: string;
  schoolId: string;
  strategy: string;
  rto: number;
  rpo: number;
  lastTested: string;
  status: string;
  metadata: Record<string, unknown>;
}

export interface AICostAllocation {
  id: string;
  schoolId: string;
  departmentId: string;
  projectId: string;
  allocatedBudget: number;
  usedBudget: number;
  period: string;
  metadata: Record<string, unknown>;
}

export interface AIFeatureUsage {
  id: string;
  schoolId: string;
  feature: string;
  usageCount: number;
  uniqueUsers: number;
  lastUsed: string;
  metadata: Record<string, unknown>;
}

export interface AIPerformanceBaseline {
  id: string;
  schoolId: string;
  modelId: string;
  metric: string;
  baselineValue: number;
  currentValue: number;
  deviation: number;
  measuredAt: string;
  metadata: Record<string, unknown>;
}

export interface AISlaConfig {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  uptime: number;
  latencyTarget: number;
  errorRateTarget: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface AISlaViolation {
  id: string;
  slaId: string;
  schoolId: string;
  violationType: string;
  actualValue: number;
  expectedValue: number;
  duration: number;
  impact: string;
  metadata: Record<string, unknown>;
  detectedAt: string;
}

export interface AIComplianceCheck {
  id: string;
  schoolId: string;
  checkType: string;
  status: string;
  details: Record<string, unknown>;
  lastChecked: string;
  nextCheck: string;
  metadata: Record<string, unknown>;
}

export interface AIPrivacyConfig {
  id: string;
  schoolId: string;
  dataRetentionDays: number;
  anonymizeData: boolean;
  encryptAtRest: boolean;
  encryptInTransit: boolean;
  complianceFrameworks: string[];
  metadata: Record<string, unknown>;
}

export interface AIDataGovernance {
  id: string;
  schoolId: string;
  policy: string;
  owner: string;
  classification: string;
  accessControls: string[];
  retentionPolicy: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

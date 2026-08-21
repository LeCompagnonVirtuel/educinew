import { z } from "zod";

// ============================================================
// AI Models
// ============================================================

export const createAiModelSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  provider: z.enum(["openai", "anthropic", "google", "meta", "mistral", "local"]),
  modelId: z.string().min(1).max(255),
  version: z.string().min(1).max(50),
  capabilities: z.array(z.string()).min(1),
  maxTokens: z.number().int().min(1).max(1000000),
  temperature: z.number().min(0).max(2),
  topP: z.number().min(0).max(1),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
  stopSequences: z.array(z.string()).optional(),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const updateAiModelSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  version: z.string().min(1).max(50).optional(),
  capabilities: z.array(z.string()).min(1).optional(),
  maxTokens: z.number().int().min(1).max(1000000).optional(),
  temperature: z.number().min(0).max(2).optional(),
  topP: z.number().min(0).max(1).optional(),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
  stopSequences: z.array(z.string()).optional(),
  isDefault: z.boolean().optional(),
  isActive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const aiModelQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  search: z.string().max(255).optional(),
  provider: z.enum(["openai", "anthropic", "google", "meta", "mistral", "local"]).optional(),
  isActive: z.boolean().optional(),
  capability: z.string().optional(),
  sortBy: z.enum(["name", "createdAt", "updatedAt", "version"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const aiModelFilterSchema = z.object({
  providers: z.array(z.enum(["openai", "anthropic", "google", "meta", "mistral", "local"])).optional(),
  capabilities: z.array(z.string()).optional(),
  minTokens: z.number().int().min(0).optional(),
  maxTokens: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

// ============================================================
// AI Prompts
// ============================================================

export const createPromptTemplateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  content: z.string().min(1),
  category: z.enum(["system", "user", "assistant", "function", "tool"]),
  variables: z.array(z.object({
    name: z.string().min(1).max(100),
    type: z.enum(["string", "number", "boolean", "array", "object"]),
    required: z.boolean().default(true),
    defaultValue: z.unknown().optional(),
    description: z.string().max(500).optional(),
  })).optional(),
  modelId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const updatePromptTemplateSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  content: z.string().min(1).optional(),
  category: z.enum(["system", "user", "assistant", "function", "tool"]).optional(),
  variables: z.array(z.object({
    name: z.string().min(1).max(100),
    type: z.enum(["string", "number", "boolean", "array", "object"]),
    required: z.boolean().default(true),
    defaultValue: z.unknown().optional(),
    description: z.string().max(500).optional(),
  })).optional(),
  modelId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const promptTemplateQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  search: z.string().max(255).optional(),
  category: z.enum(["system", "user", "assistant", "function", "tool"]).optional(),
  modelId: z.string().uuid().optional(),
  isPublic: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z.enum(["name", "createdAt", "updatedAt", "category"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const promptTemplateVersionSchema = z.object({
  templateId: z.string().uuid(),
  version: z.string().min(1).max(50),
  content: z.string().min(1),
  changelog: z.string().max(1000).optional(),
  variables: z.array(z.object({
    name: z.string().min(1).max(100),
    type: z.enum(["string", "number", "boolean", "array", "object"]),
    required: z.boolean().default(true),
    defaultValue: z.unknown().optional(),
    description: z.string().max(500).optional(),
  })).optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const promptTestSchema = z.object({
  templateId: z.string().uuid(),
  variables: z.record(z.string(), z.unknown()),
  modelId: z.string().uuid().optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().int().min(1).max(100000).optional(),
  stream: z.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// ============================================================
// AI Sessions
// ============================================================

export const createSessionSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  modelId: z.string().uuid().optional(),
  systemPrompt: z.string().optional(),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().min(1).max(100000).default(4096),
  contextWindow: z.number().int().min(1).max(1000000).default(128000),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const updateSessionSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  modelId: z.string().uuid().optional(),
  systemPrompt: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().int().min(1).max(100000).optional(),
  contextWindow: z.number().int().min(1).max(1000000).optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  isArchived: z.boolean().optional(),
});

export const sessionQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  search: z.string().max(255).optional(),
  modelId: z.string().uuid().optional(),
  isArchived: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z.enum(["title", "createdAt", "updatedAt", "messageCount"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export const sessionMessageSchema = z.object({
  sessionId: z.string().uuid(),
  role: z.enum(["system", "user", "assistant", "function", "tool"]),
  content: z.string().min(1),
  name: z.string().max(255).optional(),
  functionCall: z.object({
    name: z.string().min(1),
    arguments: z.string(),
  }).optional(),
  toolCalls: z.array(z.object({
    id: z.string().uuid(),
    type: z.enum(["function"]),
    function: z.object({
      name: z.string().min(1),
      arguments: z.string(),
    }),
  })).optional(),
  toolCallId: z.string().uuid().optional(),
  tokens: z.number().int().min(0).optional(),
  model: z.string().max(255).optional(),
  finishReason: z.enum(["stop", "length", "tool_calls", "content_filter"]).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const sessionBookmarkSchema = z.object({
  sessionId: z.string().uuid(),
  messageId: z.string().uuid(),
  title: z.string().min(1).max(255).optional(),
  notes: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
});

export const sessionExportSchema = z.object({
  sessionId: z.string().uuid(),
  format: z.enum(["json", "markdown", "pdf", "html", "csv"]),
  includeMetadata: z.boolean().default(true),
  includeSystemMessages: z.boolean().default(false),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }).optional(),
  messageIds: z.array(z.string().uuid()).optional(),
});

export const sessionSearchSchema = z.object({
  query: z.string().min(1).max(500),
  sessionId: z.string().uuid().optional(),
  role: z.enum(["user", "assistant"]).optional(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  highlightMatches: z.boolean().default(true),
});

export const sessionTemplateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  systemPrompt: z.string().min(1),
  modelId: z.string().uuid().optional(),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().min(1).max(100000).default(4096),
  initialMessages: z.array(z.object({
    role: z.enum(["system", "user", "assistant"]),
    content: z.string().min(1),
  })).optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().default(false),
});

// ============================================================
// AI Context Engine
// ============================================================

export const contextQuerySchema = z.object({
  query: z.string().min(1).max(500),
  contextType: z.enum(["document", "conversation", "knowledge", "hybrid"]),
  maxTokens: z.number().int().min(1).max(100000).optional(),
  filter: z.object({
    sources: z.array(z.string()).optional(),
    dateRange: z.object({
      start: z.string().datetime(),
      end: z.string().datetime(),
    }).optional(),
    tags: z.array(z.string()).optional(),
    minRelevance: z.number().min(0).max(1).optional(),
  }).optional(),
  includeMetadata: z.boolean().default(true),
  deduplication: z.boolean().default(true),
});

export const contextChunkSchema = z.object({
  documentId: z.string().uuid(),
  content: z.string().min(1).max(50000),
  chunkIndex: z.number().int().min(0),
  startOffset: z.number().int().min(0),
  endOffset: z.number().int().min(0),
  metadata: z.object({
    pageNumber: z.number().int().min(1).optional(),
    section: z.string().max(255).optional(),
    heading: z.string().max(255).optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
  embeddingId: z.string().uuid().optional(),
});

export const contextEmbedSchema = z.object({
  chunks: z.array(z.object({
    id: z.string().uuid(),
    content: z.string().min(1),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })).min(1),
  model: z.string().min(1).max(255).optional(),
  dimensions: z.number().int().min(64).max(4096).default(1536),
  batchId: z.string().uuid().optional(),
});

export const contextSearchSchema = z.object({
  query: z.string().min(1).max(500),
  index: z.string().min(1).max(255),
  topK: z.number().int().min(1).max(100).default(10),
  minScore: z.number().min(0).max(1).default(0.5),
  filter: z.record(z.string(), z.unknown()).optional(),
  includeContent: z.boolean().default(true),
  includeMetadata: z.boolean().default(true),
  rerank: z.boolean().default(false),
  hybridAlpha: z.number().min(0).max(1).optional(),
});

export const contextRerankSchema = z.object({
  query: z.string().min(1).max(500),
  documents: z.array(z.object({
    id: z.string().uuid(),
    content: z.string().min(1),
    score: z.number().min(0).max(1),
  })).min(1).max(100),
  topK: z.number().int().min(1).max(50).default(10),
  model: z.string().min(1).max(255).optional(),
  metadataFields: z.array(z.string()).optional(),
});

export const documentSummarySchema = z.object({
  documentId: z.string().uuid(),
  maxLength: z.number().int().min(50).max(10000).default(1000),
  style: z.enum(["brief", "detailed", "bullet", "academic", "casual"]).default("brief"),
  includeKeyPoints: z.boolean().default(true),
  includeMetadata: z.boolean().default(false),
  language: z.string().min(2).max(5).default("en"),
});

export const multiHopQuerySchema = z.object({
  query: z.string().min(1).max(500),
  maxHops: z.number().int().min(1).max(10).default(3),
  maxResults: z.number().int().min(1).max(50).default(20),
  confidenceThreshold: z.number().min(0).max(1).default(0.6),
  includeReasoning: z.boolean().default(true),
  graphTypes: z.array(z.enum(["causal", "temporal", "semantic", "hierarchical"])).optional(),
  sources: z.array(z.string()).optional(),
});

// ============================================================
// AI Preferences
// ============================================================

export const updatePreferencesSchema = z.object({
  userId: z.string().uuid(),
  theme: z.object({
    mode: z.enum(["light", "dark", "system"]).default("system"),
    primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    fontSize: z.enum(["small", "medium", "large"]).default("medium"),
    fontFamily: z.string().max(100).optional(),
    compactMode: z.boolean().default(false),
  }).optional(),
  language: z.object({
    primary: z.string().min(2).max(5).default("en"),
    fallback: z.string().min(2).max(5).default("en"),
    autoDetect: z.boolean().default(true),
  }).optional(),
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(true),
    sms: z.boolean().default(false),
    inApp: z.boolean().default(true),
    digest: z.enum(["daily", "weekly", "none"]).default("daily"),
  }).optional(),
  accessibility: z.object({
    highContrast: z.boolean().default(false),
    reducedMotion: z.boolean().default(false),
    screenReader: z.boolean().default(false),
    keyboardNavigation: z.boolean().default(true),
  }).optional(),
});

export const themeSchema = z.object({
  mode: z.enum(["light", "dark", "system"]),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  textColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  fontSize: z.enum(["small", "medium", "large", "extra-large"]),
  fontFamily: z.string().max(100),
  borderRadius: z.enum(["none", "small", "medium", "large"]),
  spacing: z.enum(["compact", "comfortable", "spacious"]),
  compactMode: z.boolean(),
});

export const languageSchema = z.object({
  primary: z.string().min(2).max(5),
  fallback: z.string().min(2).max(5),
  autoDetect: z.boolean(),
  supportedLanguages: z.array(z.string().min(2).max(5)).min(1),
  rtl: z.boolean().default(false),
});

export const notificationPreferenceSchema = z.object({
  userId: z.string().uuid(),
  channel: z.enum(["email", "push", "sms", "in-app", "webhook"]),
  events: z.array(z.enum([
    "message_received", "session_completed", "achievement_earned",
    "report_ready", "system_alert", "assignment_due",
    "grade_posted", "announcement", "reminder", "security_alert",
  ])),
  enabled: z.boolean().default(true),
  schedule: z.object({
    quietHoursStart: z.string().regex(/^\d{2}:\d{2}$/).optional(),
    quietHoursEnd: z.string().regex(/^\d{2}:\d{2}$/).optional(),
    timezone: z.string().max(50).optional(),
  }).optional(),
});

export const personalizationSchema = z.object({
  userId: z.string().uuid(),
  learningStyle: z.enum(["visual", "auditory", "reading", "kinesthetic"]).optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced", "adaptive"]).default("adaptive"),
  interests: z.array(z.string().max(100)).max(20).optional(),
  goals: z.array(z.string().max(500)).max(10).optional(),
  studyReminders: z.boolean().default(true),
  spacedRepetition: z.boolean().default(true),
  collaborativeLearning: z.boolean().default(false),
  gamification: z.boolean().default(true),
});

export const preferenceFeedbackSchema = z.object({
  userId: z.string().uuid(),
  targetType: z.enum(["response", "feature", "ui", "performance", "content"]),
  targetId: z.string().uuid().optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
  category: z.enum(["bug", "suggestion", "praise", "question"]).optional(),
  screenshots: z.array(z.string().url()).max(5).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const experimentSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  type: z.enum(["ab_test", "multivariate", "bucket_test"]),
  variants: z.array(z.object({
    name: z.string().min(1).max(100),
    weight: z.number().min(0).max(1),
    config: z.record(z.string(), z.unknown()),
  })).min(2),
  targetAudience: z.object({
    userSegment: z.string().max(100).optional(),
    minAge: z.number().int().min(0).max(150).optional(),
    maxAge: z.number().int().min(0).max(150).optional(),
    roles: z.array(z.string()).optional(),
  }).optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
});

// ============================================================
// AI Agents
// ============================================================

export const createAgentSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  type: z.enum(["chat", "task", "autonomous", "hybrid"]),
  modelId: z.string().uuid().optional(),
  systemPrompt: z.string().min(1),
  tools: z.array(z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    parameters: z.record(z.string(), z.unknown()).optional(),
  })).optional(),
  maxTokens: z.number().int().min(1).max(100000).default(4096),
  temperature: z.number().min(0).max(2).default(0.7),
  capabilities: z.array(z.string()).min(1),
  restrictions: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const updateAgentSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  type: z.enum(["chat", "task", "autonomous", "hybrid"]).optional(),
  modelId: z.string().uuid().optional(),
  systemPrompt: z.string().min(1).optional(),
  tools: z.array(z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    parameters: z.record(z.string(), z.unknown()).optional(),
  })).optional(),
  maxTokens: z.number().int().min(1).max(100000).optional(),
  temperature: z.number().min(0).max(2).optional(),
  capabilities: z.array(z.string()).min(1).optional(),
  restrictions: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const agentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  search: z.string().max(255).optional(),
  type: z.enum(["chat", "task", "autonomous", "hybrid"]).optional(),
  isActive: z.boolean().optional(),
  capability: z.string().optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z.enum(["name", "createdAt", "updatedAt", "executionCount"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const agentTaskSchema = z.object({
  agentId: z.string().uuid(),
  input: z.string().min(1),
  context: z.record(z.string(), z.unknown()).optional(),
  tools: z.array(z.string()).optional(),
  maxSteps: z.number().int().min(1).max(100).default(10),
  timeout: z.number().int().min(1000).max(300000).default(30000),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  callbackUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const agentHandoffSchema = z.object({
  fromAgentId: z.string().uuid(),
  toAgentId: z.string().uuid(),
  sessionId: z.string().uuid(),
  reason: z.string().min(1).max(500),
  context: z.record(z.string(), z.unknown()).optional(),
  messageHistory: z.boolean().default(true),
  preserveState: z.boolean().default(true),
});

export const agentEscalationSchema = z.object({
  agentId: z.string().uuid(),
  sessionId: z.string().uuid(),
  reason: z.enum(["unclear_request", "safety_concern", "technical_limit", "user_request", "policy_violation"]),
  description: z.string().min(1).max(2000),
  severity: z.enum(["low", "medium", "high", "critical"]),
  suggestedAction: z.string().max(1000).optional(),
  notifyAdmin: z.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const agentCollaborationSchema = z.object({
  agentIds: z.array(z.string().uuid()).min(2).max(10),
  task: z.string().min(1).max(2000),
  strategy: z.enum(["sequential", "parallel", "consensus", "delegation"]),
  maxRounds: z.number().int().min(1).max(50).default(10),
  timeout: z.number().int().min(1000).max(600000).default(60000),
  requireConsensus: z.boolean().default(false),
  consensusThreshold: z.number().min(0).max(1).default(0.7),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const agentTemplateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  type: z.enum(["chat", "task", "autonomous", "hybrid"]),
  systemPrompt: z.string().min(1),
  tools: z.array(z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
  })).optional(),
  capabilities: z.array(z.string()).min(1),
  config: z.record(z.string(), z.unknown()).optional(),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
});

// ============================================================
// AI Student Assistant
// ============================================================

export const studentQuerySchema = z.object({
  studentId: z.string().uuid(),
  query: z.string().min(1).max(2000),
  context: z.enum(["study", "homework", "exam_prep", "concept", "general"]),
  subject: z.string().max(255).optional(),
  gradeLevel: z.number().int().min(1).max(12).optional(),
  includeExplanations: z.boolean().default(true),
  includeExamples: z.boolean().default(true),
  difficulty: z.enum(["simplified", "standard", "detailed"]).default("standard"),
});

export const studyPlanSchema = z.object({
  studentId: z.string().uuid(),
  subjects: z.array(z.string().min(1).max(255)).min(1),
  goal: z.string().min(1).max(500),
  timeframe: z.enum(["1_week", "2_weeks", "1_month", "3_months", "6_months", "1_year"]),
  hoursPerWeek: z.number().int().min(1).max(40),
  startDate: z.string().datetime(),
  preferences: z.object({
    studyTimes: z.array(z.enum(["morning", "afternoon", "evening", "night"])).optional(),
    sessionLength: z.number().int().min(15).max(240).default(45),
    breakDuration: z.number().int().min(5).max(60).default(10),
    includeBreaks: z.boolean().default(true),
  }).optional(),
  includePracticeTests: z.boolean().default(true),
  adaptiveDifficulty: z.boolean().default(true),
});

export const quizSchema = z.object({
  studentId: z.string().uuid(),
  subject: z.string().min(1).max(255),
  topic: z.string().max(255).optional(),
  difficulty: z.enum(["easy", "medium", "hard", "adaptive"]),
  questionCount: z.number().int().min(1).max(100).default(10),
  questionTypes: z.array(z.enum(["multiple_choice", "true_false", "short_answer", "essay", "matching"])).min(1),
  timeLimit: z.number().int().min(0).max(7200).default(0),
  shuffleQuestions: z.boolean().default(true),
  showExplanations: z.boolean().default(true),
  passingScore: z.number().int().min(0).max(100).optional(),
});

export const exerciseSchema = z.object({
  studentId: z.string().uuid(),
  subject: z.string().min(1).max(255),
  topic: z.string().max(255).optional(),
  type: z.enum(["practice", "drill", "challenge", "review"]),
  difficulty: z.enum(["easy", "medium", "hard", "adaptive"]),
  questionCount: z.number().int().min(1).max(100).default(10),
  timeLimit: z.number().int().min(0).max(7200).optional(),
  hintsAllowed: z.boolean().default(true),
  showSolutions: z.boolean().default(true),
  retryAllowed: z.boolean().default(true),
});

export const flashcardSchema = z.object({
  studentId: z.string().uuid(),
  subject: z.string().min(1).max(255),
  topic: z.string().max(255).optional(),
  cards: z.array(z.object({
    front: z.string().min(1).max(1000),
    back: z.string().min(1).max(2000),
    tags: z.array(z.string()).optional(),
    difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
  })).min(1).max(200),
  algorithm: z.enum(["sm2", "leitner", "simple"]).default("sm2"),
  sessionLength: z.number().int().min(5).max(60).default(15),
});

export const progressReportSchema = z.object({
  studentId: z.string().uuid(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  subjects: z.array(z.string()).optional(),
  includeComparisons: z.boolean().default(true),
  includeRecommendations: z.boolean().default(true),
  includeCharts: z.boolean().default(true),
  format: z.enum(["detailed", "summary", "visual"]).default("detailed"),
});

export const achievementSchema = z.object({
  studentId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(1000),
  category: z.enum(["academic", "participation", "improvement", "special", "streak"]),
  points: z.number().int().min(1).max(10000),
  level: z.number().int().min(1).max(100),
  requirements: z.object({
    type: z.enum(["score", "streak", "completion", "time", "count"]),
    threshold: z.number(),
    subject: z.string().optional(),
  }).optional(),
  badgeUrl: z.string().url().optional(),
  rarity: z.enum(["common", "uncommon", "rare", "epic", "legendary"]).default("common"),
});

export const leaderboardQuerySchema = z.object({
  subject: z.string().min(1).max(255).optional(),
  timeframe: z.enum(["daily", "weekly", "monthly", "all_time"]).default("weekly"),
  metric: z.enum(["points", "accuracy", "streak", "completion", "improvement"]).default("points"),
  gradeLevel: z.number().int().min(1).max(12).optional(),
  limit: z.number().int().min(1).max(100).default(20),
  includeAnonymous: z.boolean().default(false),
});

// ============================================================
// AI Teacher Assistant
// ============================================================

export const lessonPlanSchema = z.object({
  teacherId: z.string().uuid(),
  title: z.string().min(1).max(255),
  subject: z.string().min(1).max(255),
  gradeLevel: z.number().int().min(1).max(12),
  duration: z.number().int().min(5).max(480),
  objectives: z.array(z.string().min(1).max(500)).min(1),
  standards: z.array(z.string().max(100)).optional(),
  materials: z.array(z.string().max(255)).optional(),
  activities: z.array(z.object({
    name: z.string().min(1).max(255),
    type: z.enum(["introduction", "direct_instruction", "guided_practice", "independent_practice", "closure"]),
    duration: z.number().int().min(1),
    description: z.string().min(1).max(2000),
    resources: z.array(z.string()).optional(),
  })).min(1),
  assessment: z.object({
    type: z.enum(["formative", "summative", "diagnostic"]),
    method: z.array(z.string().max(255)),
    rubric: z.string().max(2000).optional(),
  }).optional(),
  differentiation: z.object({
    modifications: z.array(z.string().max(500)).optional(),
    accommodations: z.array(z.string().max(500)).optional(),
    extensions: z.array(z.string().max(500)).optional(),
  }).optional(),
  tags: z.array(z.string()).optional(),
});

export const assessmentSchema = z.object({
  teacherId: z.string().uuid(),
  title: z.string().min(1).max(255),
  type: z.enum(["quiz", "test", "exam", "project", "presentation", "portfolio"]),
  subject: z.string().min(1).max(255),
  gradeLevel: z.number().int().min(1).max(12),
  totalPoints: z.number().int().min(1).max(10000),
  passingScore: z.number().int().min(0).max(100),
  timeLimit: z.number().int().min(0).max(7200).optional(),
  questions: z.array(z.object({
    id: z.string().uuid(),
    type: z.enum(["multiple_choice", "true_false", "short_answer", "essay", "matching", "fill_blank"]),
    content: z.string().min(1).max(5000),
    points: z.number().int().min(1).max(100),
    options: z.array(z.string().max(500)).optional(),
    correctAnswer: z.string().optional(),
    explanation: z.string().max(2000).optional(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    tags: z.array(z.string()).optional(),
  })).min(1),
  instructions: z.string().max(5000).optional(),
  allowLateSubmission: z.boolean().default(false),
  shuffleQuestions: z.boolean().default(false),
});

export const rubricSchema = z.object({
  teacherId: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  criteria: z.array(z.object({
    name: z.string().min(1).max(255),
    description: z.string().max(500),
    weight: z.number().min(0).max(1),
    levels: z.array(z.object({
      name: z.string().min(1).max(100),
      description: z.string().min(1).max(500),
      points: z.number().int().min(0).max(100),
    })).min(2),
  })).min(1),
  totalPoints: z.number().int().min(1).max(10000),
  type: z.enum(["analytic", "holistic"]).default("analytic"),
});

export const teacherFeedbackSchema = z.object({
  teacherId: z.string().uuid(),
  studentId: z.string().uuid(),
  assignmentId: z.string().uuid().optional(),
  type: z.enum(["grade", "comment", "correction", "praise", "suggestion"]),
  content: z.string().min(1).max(5000),
  visibility: z.enum(["private", "student_only", "class"]).default("student_only"),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
  attachments: z.array(z.string().url()).max(5).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const correctionSchema = z.object({
  teacherId: z.string().uuid(),
  studentId: z.string().uuid(),
  assignmentId: z.string().uuid(),
  corrections: z.array(z.object({
    questionId: z.string().uuid(),
    studentAnswer: z.string().max(5000),
    correctAnswer: z.string().max(5000),
    isCorrect: z.boolean(),
    pointsAwarded: z.number().int().min(0),
    pointsPossible: z.number().int().min(1),
    feedback: z.string().max(2000).optional(),
    autoGraded: z.boolean().default(false),
  })),
  totalPointsAwarded: z.number().int().min(0),
  totalPointsPossible: z.number().int().min(1),
  overallFeedback: z.string().max(2000).optional(),
});

export const classAnalyticsSchema = z.object({
  teacherId: z.string().uuid(),
  classId: z.string().uuid(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  metrics: z.array(z.enum([
    "average_score", "score_distribution", "improvement_rate",
    "engagement_rate", "participation_rate", "completion_rate",
    "attendance_rate", "assignment_trends",
  ])),
  groupBy: z.enum(["student", "assignment", "date", "topic"]).optional(),
  includeComparisons: z.boolean().default(false),
  includeRecommendations: z.boolean().default(true),
});

export const individualAnalyticsSchema = z.object({
  teacherId: z.string().uuid(),
  studentId: z.string().uuid(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  metrics: z.array(z.enum([
    "scores", "progress", "strengths", "weaknesses",
    "engagement", "attendance", "behavior", "social",
  ])),
  includeComparisons: z.boolean().default(true),
  comparisonType: z.enum(["class_average", "grade_level", "previous_period"]).optional(),
  includeRecommendations: z.boolean().default(true),
});

export const meetingSchema = z.object({
  teacherId: z.string().uuid(),
  title: z.string().min(1).max(255),
  type: z.enum(["parent_conference", "student_meeting", "staff_meeting", "department", "other"]),
  participants: z.array(z.string().uuid()).min(1),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  location: z.string().max(255).optional(),
  isVirtual: z.boolean().default(false),
  meetingUrl: z.string().url().optional(),
  agenda: z.array(z.string().max(500)).optional(),
  notes: z.string().max(5000).optional(),
  recurring: z.object({
    frequency: z.enum(["daily", "weekly", "biweekly", "monthly"]),
    endDate: z.string().datetime().optional(),
  }).optional(),
});

export const reportSchema = z.object({
  teacherId: z.string().uuid(),
  type: z.enum(["progress", "report_card", "behavior", "attendance", "custom"]),
  studentId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  includeGrades: z.boolean().default(true),
  includeComments: z.boolean().default(true),
  includeAttendance: z.boolean().default(false),
  includeBehavior: z.boolean().default(false),
  customSections: z.array(z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(5000),
  })).optional(),
  format: z.enum(["text", "html", "pdf"]).default("text"),
});

// ============================================================
// AI Parent Assistant
// ============================================================

export const parentNotificationSchema = z.object({
  parentId: z.string().uuid(),
  type: z.enum(["grade_update", "attendance", "behavior", "assignment", "event", "emergency", "message"]),
  title: z.string().min(1).max(255),
  message: z.string().min(1).max(2000),
  studentId: z.string().uuid().optional(),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  channels: z.array(z.enum(["email", "push", "sms", "in-app"])).min(1),
  actionUrl: z.string().url().optional(),
  expiresAt: z.string().datetime().optional(),
  read: z.boolean().default(false),
});

export const meetingRequestSchema = z.object({
  parentId: z.string().uuid(),
  teacherId: z.string().uuid(),
  studentId: z.string().uuid(),
  preferredTimes: z.array(z.string().datetime()).min(1).max(5),
  duration: z.number().int().min(15).max(120).default(30),
  topic: z.string().min(1).max(255),
  notes: z.string().max(2000).optional(),
  isVirtual: z.boolean().default(true),
  urgency: z.enum(["low", "normal", "high"]).default("normal"),
});

export const homeworkQuerySchema = z.object({
  parentId: z.string().uuid(),
  studentId: z.string().uuid().optional(),
  subject: z.string().max(255).optional(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }).optional(),
  status: z.enum(["pending", "completed", "overdue", "all"]).default("all"),
  sortBy: z.enum(["due_date", "subject", "priority", "status"]).default("due_date"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export const studyTimeSchema = z.object({
  parentId: z.string().uuid(),
  studentId: z.string().uuid(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  includeBreakdown: z.boolean().default(true),
  includeComparisons: z.boolean().default(true),
  comparisonType: z.enum(["class_average", "grade_level", "previous_period"]).optional(),
  metrics: z.array(z.enum(["total_time", "daily_average", "subject_breakdown", "consistency", "peak_hours"])).optional(),
});

export const progressVisualizationSchema = z.object({
  parentId: z.string().uuid(),
  studentId: z.string().uuid(),
  type: z.enum(["chart", "graph", "heatmap", "timeline", "comparison"]),
  subject: z.string().max(255).optional(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  metrics: z.array(z.string()).min(1),
  compareWith: z.enum(["none", "class_average", "grade_level", "previous_period"]).default("none"),
  includeTrend: z.boolean().default(true),
});

export const behaviorReportSchema = z.object({
  parentId: z.string().uuid(),
  studentId: z.string().uuid(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  categories: z.array(z.enum(["participation", "conduct", "attendance", "homework", "social", "other"])).optional(),
  includeDetails: z.boolean().default(true),
  includeTrends: z.boolean().default(true),
  includeRecommendations: z.boolean().default(true),
});

export const eventCalendarSchema = z.object({
  parentId: z.string().uuid(),
  studentId: z.string().uuid().optional(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  eventTypes: z.array(z.enum(["academic", "sports", "cultural", "parent", "holiday", "exam", "project"])).optional(),
  includeRecurring: z.boolean().default(true),
  format: z.enum(["list", "calendar", "timeline"]).default("calendar"),
});

export const parentFeedbackSchema = z.object({
  parentId: z.string().uuid(),
  targetType: z.enum(["teacher", "school", "platform", "event"]),
  targetId: z.string().uuid().optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
  category: z.enum(["communication", "academic", "behavior", "safety", "satisfaction"]).optional(),
  followUpRequested: z.boolean().default(false),
});

// ============================================================
// AI Admin Assistant
// ============================================================

export const adminDashboardSchema = z.object({
  adminId: z.string().uuid(),
  dashboardType: z.enum(["overview", "academic", "financial", "hr", "operations"]),
  widgets: z.array(z.string()).optional(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }).optional(),
  refreshInterval: z.number().int().min(0).max(86400).default(300),
  isPublic: z.boolean().default(false),
  layout: z.record(z.string(), z.unknown()).optional(),
});

export const adminReportSchema = z.object({
  adminId: z.string().uuid(),
  type: z.enum(["enrollment", "academic", "financial", "staff", "attendance", "behavior", "custom"]),
  title: z.string().min(1).max(255),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  filters: z.record(z.string(), z.unknown()).optional(),
  groupBy: z.array(z.string()).optional(),
  includeCharts: z.boolean().default(true),
  includeRecommendations: z.boolean().default(false),
  format: z.enum(["html", "pdf", "csv", "json"]).default("html"),
  recipients: z.array(z.string().email()).optional(),
});

export const financialReportSchema = z.object({
  adminId: z.string().uuid(),
  reportType: z.enum(["revenue", "expenses", "budget", "forecast", "variance"]),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  departments: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  includeProjections: z.boolean().default(false),
  compareWithPrevious: z.boolean().default(true),
  format: z.enum(["detailed", "summary", "executive"]).default("detailed"),
});

export const enrollmentSchema = z.object({
  adminId: z.string().uuid(),
  studentId: z.string().uuid().optional(),
  action: z.enum(["enroll", "withdraw", "transfer", "update"]),
  gradeLevel: z.number().int().min(1).max(12).optional(),
  classId: z.string().uuid().optional(),
  enrollmentDate: z.string().datetime().optional(),
  academicYear: z.string().min(4).max(9).optional(),
  documents: z.array(z.object({
    type: z.enum(["birth_certificate", "report_card", "medical", "immunization", "other"]),
    name: z.string().min(1).max(255),
    url: z.string().url(),
    verified: z.boolean().default(false),
  })).optional(),
  guardianInfo: z.object({
    name: z.string().min(1).max(255),
    relationship: z.enum(["parent", "guardian", "other"]),
    phone: z.string().min(10).max(20),
    email: z.string().email(),
    address: z.string().max(500).optional(),
  }).optional(),
  specialNeeds: z.string().max(1000).optional(),
  notes: z.string().max(2000).optional(),
});

export const staffManagementSchema = z.object({
  adminId: z.string().uuid(),
  staffId: z.string().uuid().optional(),
  action: z.enum(["hire", "update", "suspend", "terminate", "transfer"]),
  personalInfo: z.object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().min(10).max(20),
    dateOfBirth: z.string().datetime().optional(),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  }).optional(),
  role: z.enum(["teacher", "admin", "counselor", "librarian", "coach", "support"]).optional(),
  department: z.string().max(255).optional(),
  salary: z.number().min(0).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  qualifications: z.array(z.object({
    degree: z.string().min(1).max(255),
    institution: z.string().min(1).max(255),
    year: z.number().int().min(1900).max(2100),
  })).optional(),
  documents: z.array(z.string().url()).optional(),
});

export const inventorySchema = z.object({
  adminId: z.string().uuid(),
  action: z.enum(["add", "update", "remove", "audit", "restock"]),
  category: z.enum(["textbooks", "supplies", "technology", "furniture", "lab", "sports", "other"]),
  items: z.array(z.object({
    name: z.string().min(1).max(255),
    description: z.string().max(1000).optional(),
    quantity: z.number().int().min(0),
    unitPrice: z.number().min(0).optional(),
    location: z.string().max(255).optional(),
    condition: z.enum(["new", "good", "fair", "poor", "damaged"]).default("new"),
    barcode: z.string().max(100).optional(),
  })),
  supplier: z.object({
    name: z.string().min(1).max(255),
    contact: z.string().max(255).optional(),
    email: z.string().email().optional(),
  }).optional(),
});

export const maintenanceSchema = z.object({
  adminId: z.string().uuid(),
  action: z.enum(["request", "schedule", "complete", "cancel"]),
  requestType: z.enum(["repair", "cleaning", "inspection", "installation", "emergency"]),
  priority: z.enum(["low", "normal", "high", "urgent"]),
  location: z.string().min(1).max(255),
  description: z.string().min(1).max(2000),
  scheduledDate: z.string().datetime().optional(),
  assignedTo: z.string().uuid().optional(),
  estimatedCost: z.number().min(0).optional(),
  attachments: z.array(z.string().url()).max(5).optional(),
});

export const transportSchema = z.object({
  adminId: z.string().uuid(),
  action: z.enum(["add_route", "update_route", "assign_bus", "update_schedule", "track"]),
  routeId: z.string().uuid().optional(),
  routeName: z.string().min(1).max(255).optional(),
  stops: z.array(z.object({
    name: z.string().min(1).max(255),
    address: z.string().min(1).max(500),
    time: z.string().regex(/^\d{2}:\d{2}$/),
    coordinates: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }).optional(),
  })).optional(),
  busId: z.string().uuid().optional(),
  capacity: z.number().int().min(1).max(100).optional(),
  driverId: z.string().uuid().optional(),
  schedule: z.object({
    departureTime: z.string().regex(/^\d{2}:\d{2}$/),
    returnTime: z.string().regex(/^\d{2}:\d{2}$/),
    operatingDays: z.array(z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"])),
  }).optional(),
});

export const cafeteriaSchema = z.object({
  adminId: z.string().uuid(),
  action: z.enum(["add_menu", "update_menu", "manage_suppliers", "track_waste", "set_prices"]),
  menuDate: z.string().datetime().optional(),
  meals: z.array(z.object({
    name: z.string().min(1).max(255),
    type: z.enum(["breakfast", "lunch", "dinner", "snack"]),
    items: z.array(z.object({
      name: z.string().min(1).max(255),
      category: z.enum(["main", "side", "beverage", "dessert"]),
      price: z.number().min(0),
      nutritionInfo: z.object({
        calories: z.number().int().min(0),
        protein: z.number().min(0).optional(),
        carbs: z.number().min(0).optional(),
        fat: z.number().min(0).optional(),
        allergens: z.array(z.string()).optional(),
      }).optional(),
      isVegetarian: z.boolean().default(false),
      isVegan: z.boolean().default(false),
      isGlutenFree: z.boolean().default(false),
    })),
  })).optional(),
  wasteTracking: z.object({
    date: z.string().datetime(),
    items: z.array(z.object({
      name: z.string().min(1).max(255),
      quantityWasted: z.number().int().min(0),
      reason: z.enum(["overcooked", "expired", "surplus", "damaged"]),
    })),
  }).optional(),
});

export const librarySchema = z.object({
  adminId: z.string().uuid(),
  action: z.enum(["add_book", "update_record", "check_out", "check_in", "manage_reservations"]),
  book: z.object({
    isbn: z.string().min(10).max(13),
    title: z.string().min(1).max(500),
    author: z.string().min(1).max(255),
    publisher: z.string().max(255).optional(),
    publishYear: z.number().int().min(1900).max(2100).optional(),
    category: z.string().max(255).optional(),
    copies: z.number().int().min(1).default(1),
    location: z.string().max(255).optional(),
    condition: z.enum(["new", "good", "fair", "poor"]).default("new"),
  }).optional(),
  checkout: z.object({
    bookId: z.string().uuid(),
    memberId: z.string().uuid(),
    dueDate: z.string().datetime(),
  }).optional(),
});

// ============================================================
// AI Curriculum Expert
// ============================================================

export const curriculumQuerySchema = z.object({
  query: z.string().min(1).max(2000),
  subject: z.string().min(1).max(255),
  gradeLevel: z.number().int().min(1).max(12),
  context: z.enum(["planning", "alignment", "gaps", "resources", "assessment"]),
  standards: z.array(z.string()).optional(),
  includeReferences: z.boolean().default(true),
  depth: z.enum(["overview", "detailed", "comprehensive"]).default("detailed"),
});

export const learningObjectiveSchema = z.object({
  curriculumId: z.string().uuid(),
  code: z.string().min(1).max(50),
  description: z.string().min(1).max(1000),
  subject: z.string().min(1).max(255),
  gradeLevel: z.number().int().min(1).max(12),
  domain: z.string().max(255).optional(),
  standard: z.string().max(255).optional(),
  cognitiveLevel: z.enum(["remember", "understand", "apply", "analyze", "evaluate", "create"]),
  prerequisites: z.array(z.string()).optional(),
  duration: z.number().int().min(1).optional(),
  assessmentMethods: z.array(z.enum(["quiz", "test", "project", "portfolio", "observation", "presentation"])).optional(),
});

export const scopeSequenceSchema = z.object({
  curriculumId: z.string().uuid(),
  subject: z.string().min(1).max(255),
  gradeLevel: z.number().int().min(1).max(12),
  academicYear: z.string().min(4).max(9),
  units: z.array(z.object({
    title: z.string().min(1).max(255),
    description: z.string().max(1000).optional(),
    objectives: z.array(z.string().uuid()).min(1),
    duration: z.number().int().min(1),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    prerequisites: z.array(z.string()).optional(),
    assessments: z.array(z.string().uuid()).optional(),
  })).min(1),
  standards: z.array(z.string()).optional(),
  totalDuration: z.number().int().min(1),
});

export const lessonPlanTemplateSchema = z.object({
  curriculumId: z.string().uuid(),
  title: z.string().min(1).max(255),
  subject: z.string().min(1).max(255),
  gradeLevel: z.number().int().min(1).max(12),
  duration: z.number().int().min(5).max(480),
  objectives: z.array(z.string().min(1).max(500)).min(1),
  standards: z.array(z.string()).optional(),
  materials: z.array(z.string().max(255)).optional(),
  warmUp: z.string().max(2000).optional(),
  instruction: z.string().min(1).max(5000),
  practice: z.string().max(5000).optional(),
  assessment: z.string().max(2000).optional(),
  closure: z.string().max(2000).optional(),
  differentiation: z.object({
    forStruggling: z.string().max(1000).optional(),
    forAdvanced: z.string().max(1000).optional(),
    forELL: z.string().max(1000).optional(),
  }).optional(),
  tags: z.array(z.string()).optional(),
});

export const assessmentAlignmentSchema = z.object({
  curriculumId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  objectives: z.array(z.string().uuid()).min(1),
  alignmentLevel: z.enum(["full", "partial", "minimal"]),
  gaps: z.array(z.string().max(500)).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
});

export const resourceRecommendationSchema = z.object({
  curriculumId: z.string().uuid(),
  objectiveId: z.string().uuid().optional(),
  subject: z.string().min(1).max(255),
  gradeLevel: z.number().int().min(1).max(12),
  resourceType: z.array(z.enum(["textbook", "video", "simulation", "worksheet", "lab", "game", "article"])).optional(),
  budget: z.number().min(0).optional(),
  maxResults: z.number().int().min(1).max(50).default(10),
  includeFreeOnly: z.boolean().default(false),
});

export const competencyFrameworkSchema = z.object({
  curriculumId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  subject: z.string().min(1).max(255),
  gradeLevel: z.number().int().min(1).max(12),
  competencies: z.array(z.object({
    code: z.string().min(1).max(50),
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(1000),
    level: z.enum(["foundational", "intermediate", "advanced", "expert"]),
    subCompetencies: z.array(z.object({
      code: z.string().min(1).max(50),
      name: z.string().min(1).max(255),
      description: z.string().min(1).max(1000),
    })).optional(),
  })).min(1),
  assessmentCriteria: z.array(z.string().max(500)).optional(),
});

export const gapAnalysisSchema = z.object({
  curriculumId: z.string().uuid(),
  currentStandards: z.array(z.string()).min(1),
  targetStandards: z.array(z.string()).min(1),
  subject: z.string().min(1).max(255),
  gradeLevel: z.number().int().min(1).max(12),
  includeRemediation: z.boolean().default(true),
  includeEnrichment: z.boolean().default(false),
  prioritizationMethod: z.enum(["importance", "difficulty", "prerequisite", "balanced"]).default("balanced"),
});

// ============================================================
// AI Document Processing
// ============================================================

export const documentUploadSchema = z.object({
  fileName: z.string().min(1).max(255),
  fileSize: z.number().int().min(1).max(104857600),
  mimeType: z.enum([
    "application/pdf", "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain", "text/html", "image/png", "image/jpeg", "image/gif", "image/webp",
  ]),
  folderId: z.string().uuid().optional(),
  tags: z.array(z.string().max(100)).max(20).optional(),
  description: z.string().max(1000).optional(),
  isPublic: z.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const documentQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  search: z.string().max(255).optional(),
  folderId: z.string().uuid().optional(),
  mimeType: z.string().max(100).optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z.enum(["name", "createdAt", "updatedAt", "size"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  createdAfter: z.string().datetime().optional(),
  createdBefore: z.string().datetime().optional(),
});

export const documentAnnotationSchema = z.object({
  documentId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(["highlight", "comment", "note", "drawing", "stamp"]),
  content: z.string().max(5000).optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number().optional(),
    height: z.number().optional(),
    page: z.number().int().min(1).optional(),
  }),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  isPublic: z.boolean().default(false),
  replyTo: z.string().uuid().optional(),
});

export const documentExportSchema = z.object({
  documentId: z.string().uuid(),
  format: z.enum(["pdf", "docx", "html", "markdown", "txt"]),
  includeAnnotations: z.boolean().default(false),
  includeMetadata: z.boolean().default(true),
  pageRange: z.object({
    start: z.number().int().min(1),
    end: z.number().int().min(1),
  }).optional(),
  watermark: z.string().max(255).optional(),
  password: z.string().min(8).max(128).optional(),
});

export const documentShareSchema = z.object({
  documentId: z.string().uuid(),
  shareWith: z.array(z.string().uuid()).min(1),
  permission: z.enum(["view", "comment", "edit"]),
  expiresAt: z.string().datetime().optional(),
  notifyRecipients: z.boolean().default(true),
  message: z.string().max(1000).optional(),
  password: z.string().min(8).max(128).optional(),
  allowDownload: z.boolean().default(true),
});

export const documentVersionSchema = z.object({
  documentId: z.string().uuid(),
  version: z.string().min(1).max(50),
  changeDescription: z.string().max(1000).optional(),
  isMajor: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const documentOcrSchema = z.object({
  documentId: z.string().uuid().optional(),
  imageUrl: z.string().url().optional(),
  language: z.string().min(2).max(5).default("en"),
  outputFormat: z.enum(["text", "structured", "markdown"]).default("text"),
  enhanceImage: z.boolean().default(true),
  detectTables: z.boolean().default(true),
  detectHandwriting: z.boolean().default(false),
  confidenceThreshold: z.number().min(0).max(1).default(0.7),
});

export const documentSummarizationSchema = z.object({
  content: z.string().min(1).max(500000),
  contentType: z.enum(["text", "document", "url"]),
  maxLength: z.number().int().min(50).max(10000).default(1000),
  style: z.enum(["brief", "detailed", "bullet", "academic", "casual", "executive"]),
  includeKeyPoints: z.boolean().default(true),
  includeActionItems: z.boolean().default(false),
  includeQuestions: z.boolean().default(false),
  language: z.string().min(2).max(5).default("en"),
});

export const documentTranslationSchema = z.object({
  content: z.string().min(1).max(100000),
  sourceLanguage: z.string().min(2).max(5),
  targetLanguage: z.string().min(2).max(5),
  context: z.string().max(500).optional(),
  formality: z.enum(["formal", "informal", "neutral"]).default("neutral"),
  preserveFormatting: z.boolean().default(true),
  glossaryId: z.string().uuid().optional(),
});

// ============================================================
// AI Quality Assurance
// ============================================================

export const qualityCheckSchema = z.object({
  content: z.string().min(1).max(100000),
  contentType: z.enum(["text", "code", "math", "essay", "technical"]),
  checks: z.array(z.enum([
    "grammar", "spelling", "style", "factuality", "bias",
    "plagiarism", "readability", "grading", "citation", "completeness", "coherence",
  ])).min(1),
  language: z.string().min(2).max(5).default("en"),
  strictMode: z.boolean().default(false),
  threshold: z.number().min(0).max(1).default(0.8),
});

export const grammarCheckSchema = z.object({
  content: z.string().min(1).max(100000),
  language: z.string().min(2).max(5).default("en"),
  rules: z.object({
    styleGuide: z.enum(["academic", "business", "casual", "technical"]).optional(),
    customRules: z.array(z.object({
      pattern: z.string().min(1),
      replacement: z.string().optional(),
      message: z.string().min(1),
      severity: z.enum(["error", "warning", "info"]).default("warning"),
    })).optional(),
  }).optional(),
  autoFix: z.boolean().default(false),
  ignorePatterns: z.array(z.string()).optional(),
});

export const styleCheckSchema = z.object({
  content: z.string().min(1).max(100000),
  styleGuide: z.enum(["apa", "mla", "chicago", "harvard", "ieee", "custom"]),
  language: z.string().min(2).max(5).default("en"),
  checks: z.array(z.enum(["tone", "clarity", "conciseness", "consistency", "formality", "inclusive_language"])).optional(),
  targetAudience: z.enum(["academic", "general", "technical", "children"]).optional(),
  readabilityLevel: z.enum(["elementary", "middle_school", "high_school", "college", "graduate"]).optional(),
});

export const factualityCheckSchema = z.object({
  content: z.string().min(1).max(100000),
  claims: z.array(z.object({
    text: z.string().min(1).max(1000),
    context: z.string().max(500).optional(),
  })).optional(),
  sources: z.array(z.string().url()).optional(),
  confidenceThreshold: z.number().min(0).max(1).default(0.7),
  includeEvidence: z.boolean().default(true),
  flagContradictions: z.boolean().default(true),
});

export const qualityBiasCheckSchema = z.object({
  content: z.string().min(1).max(100000),
  biasTypes: z.array(z.enum([
    "gender", "racial", "age", "disability", "socioeconomic",
    "political", "cultural", "religious", "confirmation",
  ])).optional(),
  sensitivity: z.enum(["low", "medium", "high"]).default("medium"),
  includeExamples: z.boolean().default(true),
  suggestAlternatives: z.boolean().default(true),
  language: z.string().min(2).max(5).default("en"),
});

export const plagiarismCheckSchema = z.object({
  content: z.string().min(1).max(100000),
  sources: z.array(z.enum(["web", "academic", "internal", "all"])).default(["all"]),
  ignoreQuotes: z.boolean().default(true),
  ignoreReferences: z.boolean().default(true),
  similarityThreshold: z.number().min(0).max(1).default(0.15),
  includeSources: z.boolean().default(true),
  deepScan: z.boolean().default(false),
});

export const readabilityCheckSchema = z.object({
  content: z.string().min(1).max(100000),
  metrics: z.array(z.enum([
    "flesch_kincaid", "coleman_liau", "automated_readability",
    "dale_chall", "gunning_fog", "smog", "consensus",
  ])).optional(),
  targetGradeLevel: z.number().int().min(1).max(20).optional(),
  includeSuggestions: z.boolean().default(true),
  language: z.string().min(2).max(5).default("en"),
});

export const gradingCheckSchema = z.object({
  content: z.string().min(1).max(100000),
  rubric: z.object({
    criteria: z.array(z.object({
      name: z.string().min(1).max(255),
      description: z.string().max(500),
      weight: z.number().min(0).max(1),
      levels: z.array(z.object({
        name: z.string().min(1).max(100),
        description: z.string().min(1).max(500),
        points: z.number().int().min(0).max(100),
      })).min(2),
    })).min(1),
  }),
  subject: z.string().min(1).max(255),
  gradeLevel: z.number().int().min(1).max(12).optional(),
  assignmentType: z.enum(["essay", "short_answer", "project", "lab", "presentation"]).optional(),
  includeFeedback: z.boolean().default(true),
  detailedScoring: z.boolean().default(true),
});

export const citationCheckSchema = z.object({
  content: z.string().min(1).max(100000),
  citationStyle: z.enum(["apa", "mla", "chicago", "harvard", "ieee", "vancouver"]),
  checkInText: z.boolean().default(true),
  checkBibliography: z.boolean().default(true),
  flagMissing: z.boolean().default(true),
  flagUnused: z.boolean().default(true),
  flagIncorrect: z.boolean().default(true),
  suggestCorrections: z.boolean().default(true),
});

// ============================================================
// AI Voice Processing
// ============================================================

export const speechToTextSchema = z.object({
  audioUrl: z.string().url().optional(),
  audioBase64: z.string().optional(),
  language: z.string().min(2).max(5).default("en"),
  model: z.enum(["whisper", "wav2vec", "conformer"]).default("whisper"),
  format: z.enum(["wav", "mp3", "ogg", "flac", "webm"]),
  sampleRate: z.number().int().min(8000).max(48000).default(16000),
  enableTimestamps: z.boolean().default(false),
  enablePunctuation: z.boolean().default(true),
  enableWordTimestamps: z.boolean().default(false),
  vocabulary: z.array(z.string()).optional(),
  profanityFilter: z.boolean().default(false),
});

export const textToSpeechSchema = z.object({
  text: z.string().min(1).max(10000),
  voiceId: z.string().min(1).max(255),
  language: z.string().min(2).max(5).default("en"),
  speed: z.number().min(0.5).max(2).default(1),
  pitch: z.number().min(-1).max(1).default(0),
  volume: z.number().min(0).max(2).default(1),
  emotion: z.enum(["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"]).optional(),
  outputFormat: z.enum(["mp3", "wav", "ogg", "flac"]).default("mp3"),
  sampleRate: z.number().int().min(8000).max(48000).default(22050),
});

export const voiceCloneSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  audioSamples: z.array(z.object({
    url: z.string().url(),
    duration: z.number().int().min(30).max(600),
    format: z.enum(["wav", "mp3", "ogg", "flac"]),
  })).min(3).max(20),
  language: z.string().min(2).max(5).default("en"),
  consentVerified: z.boolean(),
  isPublic: z.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const transcriptionSchema = z.object({
  audioUrl: z.string().url(),
  language: z.string().min(2).max(5).default("en"),
  model: z.enum(["whisper", "wav2vec", "conformer"]).default("whisper"),
  outputFormat: z.enum(["text", "json", "srt", "vtt", "tsv"]),
  enableTimestamps: z.boolean().default(true),
  enableWordTimestamps: z.boolean().default(true),
  enableSpeakerDiarization: z.boolean().default(false),
  maxSpeakers: z.number().int().min(2).max(10).optional(),
  enablePunctuation: z.boolean().default(true),
  enableCapitalization: z.boolean().default(true),
  customVocabulary: z.array(z.string()).optional(),
  filterProfanity: z.boolean().default(false),
});

export const voiceTranslationSchema = z.object({
  audioUrl: z.string().url(),
  sourceLanguage: z.string().min(2).max(5),
  targetLanguage: z.string().min(2).max(5),
  preserveVoice: z.boolean().default(true),
  outputFormat: z.enum(["mp3", "wav", "ogg"]).default("mp3"),
  speed: z.number().min(0.5).max(2).default(1),
  includeTranscription: z.boolean().default(true),
});

export const voiceAuthenticationSchema = z.object({
  userId: z.string().uuid(),
  audioUrl: z.string().url(),
  action: z.enum(["enroll", "verify", "identify"]),
  enrollmentId: z.string().uuid().optional(),
  language: z.string().min(2).max(5).default("en"),
  confidenceThreshold: z.number().min(0).max(1).default(0.85),
  antiSpoofing: z.boolean().default(true),
  maxDuration: z.number().int().min(3).max(30).default(10),
});

// ============================================================
// AI Vision Processing
// ============================================================

export const imageAnalysisSchema = z.object({
  imageUrl: z.string().url().optional(),
  imageBase64: z.string().optional(),
  analysisType: z.array(z.enum(["objects", "faces", "text", "scene", "colors", "quality"])).min(1),
  maxResults: z.number().int().min(1).max(100).default(50),
  confidenceThreshold: z.number().min(0).max(1).default(0.5),
  includeMetadata: z.boolean().default(true),
  language: z.string().min(2).max(5).default("en"),
});

export const objectDetectionSchema = z.object({
  imageUrl: z.string().url().optional(),
  imageBase64: z.string().optional(),
  model: z.enum(["yolo", "faster_rcnn", "ssd", "efficientdet"]).default("yolo"),
  confidenceThreshold: z.number().min(0).max(1).default(0.5),
  maxObjects: z.number().int().min(1).max(200).default(50),
  classes: z.array(z.string()).optional(),
  includeBoundingBoxes: z.boolean().default(true),
  includeLabels: z.boolean().default(true),
});

export const faceDetectionSchema = z.object({
  imageUrl: z.string().url().optional(),
  imageBase64: z.string().optional(),
  detectAttributes: z.boolean().default(true),
  detectEmotions: z.boolean().default(true),
  detectLandmarks: z.boolean().default(false),
  detectAge: z.boolean().default(false),
  detectGender: z.boolean().default(false),
  confidenceThreshold: z.number().min(0).max(1).default(0.5),
  maxFaces: z.number().int().min(1).max(100).default(20),
});

export const visionOcrSchema = z.object({
  imageUrl: z.string().url().optional(),
  imageBase64: z.string().optional(),
  language: z.string().min(2).max(5).default("en"),
  outputFormat: z.enum(["text", "structured", "markdown", "hocr"]).default("text"),
  enhanceImage: z.boolean().default(true),
  detectTables: z.boolean().default(true),
  detectHandwriting: z.boolean().default(false),
  confidenceThreshold: z.number().min(0).max(1).default(0.7),
  pageSegmentationMode: z.number().int().min(0).max(13).optional(),
});

export const textDetectionSchema = z.object({
  imageUrl: z.string().url().optional(),
  imageBase64: z.string().optional(),
  mode: z.enum(["printed", "handwritten", "both"]).default("both"),
  languages: z.array(z.string().min(2).max(5)).default(["en"]),
  orientationDetection: z.boolean().default(true),
  scriptDetection: z.boolean().default(true),
  confidenceThreshold: z.number().min(0).max(1).default(0.6),
});

export const handwritingRecognitionSchema = z.object({
  imageUrl: z.string().url().optional(),
  imageBase64: z.string().optional(),
  language: z.string().min(2).max(5).default("en"),
  context: z.string().max(255).optional(),
  outputFormat: z.enum(["text", "structured"]).default("text"),
  confidenceThreshold: z.number().min(0).max(1).default(0.6),
  enableLayoutAnalysis: z.boolean().default(true),
});

export const diagramAnalysisSchema = z.object({
  imageUrl: z.string().url().optional(),
  imageBase64: z.string().optional(),
  diagramType: z.enum(["flowchart", "er", "sequence", "class", "state", "architecture", "unknown"]),
  extractElements: z.boolean().default(true),
  extractRelationships: z.boolean().default(true),
  extractText: z.boolean().default(true),
  outputFormat: z.enum(["json", "mermaid", "plantuml", "svg"]).default("json"),
  includePositioning: z.boolean().default(false),
});

export const visualQASchema = z.object({
  imageUrl: z.string().url().optional(),
  imageBase64: z.string().optional(),
  question: z.string().min(1).max(1000),
  context: z.string().max(2000).optional(),
  model: z.string().max(255).optional(),
  maxTokens: z.number().int().min(1).max(4096).default(1024),
  includeConfidence: z.boolean().default(true),
  chainOfThought: z.boolean().default(false),
});

export const imageCaptionSchema = z.object({
  imageUrl: z.string().url().optional(),
  imageBase64: z.string().optional(),
  style: z.enum(["concise", "detailed", "creative", "technical"]).default("detailed"),
  maxLength: z.number().int().min(10).max(500).default(150),
  includeObjects: z.boolean().default(false),
  includeScene: z.boolean().default(false),
  includeMood: z.boolean().default(false),
  language: z.string().min(2).max(5).default("en"),
});

export const videoAnalysisSchema = z.object({
  videoUrl: z.string().url(),
  analysisType: z.array(z.enum(["scenes", "objects", "faces", "text", "audio", "transcript"])).min(1),
  frameInterval: z.number().int().min(1).max(300).default(30),
  maxDuration: z.number().int().min(1).max(3600).optional(),
  confidenceThreshold: z.number().min(0).max(1).default(0.5),
  includeTimestamps: z.boolean().default(true),
  language: z.string().min(2).max(5).default("en"),
});

// ============================================================
// AI Safety
// ============================================================

export const contentFilterSchema = z.object({
  content: z.string().min(1).max(100000),
  categories: z.array(z.enum([
    "hate_speech", "harassment", "violence", "self_harm", "sexual",
    "illegal", "spam", "misinformation", "dangerous", "adult",
  ])).min(1),
  severity: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  context: z.string().max(1000).optional(),
  platform: z.enum(["general", "educational", "child_friendly"]).default("educational"),
  language: z.string().min(2).max(5).default("en"),
});

export const piiDetectionSchema = z.object({
  content: z.string().min(1).max(500000),
  piiTypes: z.array(z.enum([
    "name", "email", "phone", "address", "ssn", "credit_card",
    "date_of_birth", "medical_record", "financial_account",
    "biometric", "location", "ip_address",
  ])).min(1),
  action: z.enum(["detect", "redact", "mask", "tokenize"]),
  language: z.string().min(2).max(5).default("en"),
  context: z.string().max(500).optional(),
  confidenceThreshold: z.number().min(0).max(1).default(0.8),
});

export const jailbreakDetectionSchema = z.object({
  content: z.string().min(1).max(100000),
  context: z.string().max(2000).optional(),
  model: z.string().max(255).optional(),
  sensitivity: z.enum(["low", "medium", "high"]).default("medium"),
  includePatterns: z.boolean().default(true),
  includeSuggestions: z.boolean().default(true),
  language: z.string().min(2).max(5).default("en"),
});

export const promptInjectionSchema = z.object({
  content: z.string().min(1).max(100000),
  systemPrompt: z.string().max(10000).optional(),
  context: z.string().max(2000).optional(),
  sensitivity: z.enum(["low", "medium", "high"]).default("high"),
  checkDirectInjection: z.boolean().default(true),
  checkIndirectInjection: z.boolean().default(true),
  checkEncoding: z.boolean().default(true),
  language: z.string().min(2).max(5).default("en"),
});

export const biasDetectionSchema = z.object({
  content: z.string().min(1).max(100000),
  biasCategories: z.array(z.enum([
    "gender", "racial", "age", "disability", "socioeconomic",
    "political", "cultural", "religious", "nationality", "sexual_orientation",
  ])).min(1),
  sensitivity: z.enum(["low", "medium", "high"]).default("medium"),
  context: z.string().max(1000).optional(),
  language: z.string().min(2).max(5).default("en"),
  includeAlternatives: z.boolean().default(true),
  scoreThreshold: z.number().min(0).max(1).default(0.5),
});

export const safetyClassificationSchema = z.object({
  content: z.string().min(1).max(100000),
  classificationType: z.enum(["binary", "multilabel", "severity"]),
  categories: z.array(z.string()).min(1),
  context: z.string().max(2000).optional(),
  model: z.string().max(255).optional(),
  confidenceThreshold: z.number().min(0).max(1).default(0.7),
  language: z.string().min(2).max(5).default("en"),
  includeReasoning: z.boolean().default(false),
});

export const incidentReportSchema = z.object({
  reporterId: z.string().uuid(),
  type: z.enum(["safety", "bias", "harassment", "misinformation", "privacy", "technical", "other"]),
  severity: z.enum(["low", "medium", "high", "critical"]),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(5000),
  evidence: z.array(z.object({
    type: z.enum(["text", "screenshot", "log", "url"]),
    content: z.string().min(1).max(10000),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })).optional(),
  affectedUsers: z.array(z.string().uuid()).optional(),
  sessionId: z.string().uuid().optional(),
  messageId: z.string().uuid().optional(),
  autoResolve: z.boolean().default(false),
  notifyAdmin: z.boolean().default(true),
});

export const ageVerificationSchema = z.object({
  dateOfBirth: z.string().datetime().optional(),
  age: z.number().int().min(0).max(150).optional(),
  verificationMethod: z.enum(["self_report", "document", "parental_consent", "third_party"]),
  parentalConsent: z.boolean().optional(),
  parentId: z.string().uuid().optional(),
  requiredAge: z.number().int().min(0).max(18).default(13),
  country: z.string().min(2).max(2).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// ============================================================
// AI Moderation
// ============================================================

export const moderationQueueSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  status: z.enum(["pending", "in_review", "resolved", "escalated", "all"]).default("pending"),
  type: z.enum(["content", "behavior", "report", "appeal", "all"]).optional(),
  priority: z.enum(["low", "normal", "high", "urgent", "all"]).default("all"),
  assignedTo: z.string().uuid().optional(),
  sortBy: z.enum(["createdAt", "priority", "status", "type"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const moderationActionSchema = z.object({
  moderatorId: z.string().uuid(),
  targetType: z.enum(["message", "user", "session", "content"]),
  targetId: z.string().uuid(),
  action: z.enum(["warn", "mute", "suspend", "ban", "remove", "restore", "flag", "escalate"]),
  reason: z.string().min(1).max(2000),
  duration: z.number().int().min(0).max(31536000).optional(),
  notifyUser: z.boolean().default(true),
  evidence: z.array(z.string().max(500)).optional(),
  notes: z.string().max(2000).optional(),
  overridePrevious: z.boolean().default(false),
});

export const userReportSchema = z.object({
  reporterId: z.string().uuid(),
  targetType: z.enum(["user", "message", "content", "session"]),
  targetId: z.string().uuid(),
  reason: z.enum([
    "spam", "harassment", "hate_speech", "violence", "inappropriate",
    "misinformation", "copyright", "privacy_violation", "impersonation", "other",
  ]),
  description: z.string().min(1).max(2000),
  evidence: z.array(z.object({
    type: z.enum(["text", "screenshot", "url"]),
    content: z.string().max(5000),
  })).max(5).optional(),
  anonymous: z.boolean().default(false),
  contactEmail: z.string().email().optional(),
});

export const appealSchema = z.object({
  userId: z.string().uuid(),
  actionId: z.string().uuid(),
  reason: z.string().min(1).max(5000),
  evidence: z.array(z.object({
    type: z.enum(["text", "screenshot", "url", "document"]),
    content: z.string().max(5000),
  })).max(10).optional(),
  additionalContext: z.string().max(2000).optional(),
  contactPreference: z.enum(["email", "in_app", "phone"]).default("email"),
});

export const shadowBanSchema = z.object({
  moderatorId: z.string().uuid(),
  userId: z.string().uuid(),
  reason: z.string().min(1).max(2000),
  duration: z.number().int().min(3600).max(31536000),
  affectedFeatures: z.array(z.enum(["chat", "forums", "reviews", "comments", "profile"])).min(1),
  notifyUser: z.boolean().default(false),
  evidence: z.array(z.string().max(500)).optional(),
});

// ============================================================
// AI Ethics
// ============================================================

export const ethicsCheckSchema = z.object({
  content: z.string().min(1).max(100000),
  context: z.enum(["educational", "research", "general", "commercial"]),
  checks: z.array(z.enum([
    "fairness", "transparency", "accountability", "privacy",
    "safety", "inclusivity", "sustainability", "honesty",
  ])).min(1),
  guidelines: z.string().max(5000).optional(),
  includeRecommendations: z.boolean().default(true),
  severity: z.enum(["advisory", "warning", "violation"]).default("advisory"),
});

export const biasMitigationSchema = z.object({
  content: z.string().min(1).max(100000),
  biasType: z.enum(["gender", "racial", "age", "disability", "socioeconomic", "cultural", "other"]),
  mitigationStrategy: z.enum(["rewrite", "augment", "balance", "filter", "custom"]),
  customStrategy: z.string().max(5000).optional(),
  preserveMeaning: z.boolean().default(true),
  language: z.string().min(2).max(5).default("en"),
  includeExplanation: z.boolean().default(true),
});

export const fairnessCheckSchema = z.object({
  content: z.string().min(1).max(100000),
  protectedAttributes: z.array(z.enum(["gender", "race", "age", "disability", "religion", "nationality"])).min(1),
  fairnessMetric: z.enum(["demographic_parity", "equal_opportunity", "predictive_parity", "calibration"]),
  threshold: z.number().min(0).max(1).default(0.8),
  context: z.string().max(1000).optional(),
  includeAnalysis: z.boolean().default(true),
  suggestCorrections: z.boolean().default(true),
});

export const modelCardSchema = z.object({
  modelId: z.string().uuid(),
  name: z.string().min(1).max(255),
  version: z.string().min(1).max(50),
  description: z.string().max(5000),
  intendedUse: z.string().max(2000),
  limitations: z.array(z.string().max(500)).min(1),
  trainingData: z.object({
    source: z.string().min(1).max(255),
    size: z.string().max(100),
    dateRange: z.string().max(100).optional(),
    demographics: z.record(z.string(), z.string()).optional(),
  }).optional(),
  performanceMetrics: z.array(z.object({
    name: z.string().min(1).max(255),
    value: z.number(),
    description: z.string().max(500).optional(),
  })).optional(),
  ethicalConsiderations: z.string().max(3000).optional(),
  environmentalImpact: z.string().max(1000).optional(),
  contactInformation: z.string().max(500).optional(),
});

export const consentSchema = z.object({
  userId: z.string().uuid(),
  consentType: z.enum(["data_collection", "data_sharing", "marketing", "research", "ai_training"]),
  granted: z.boolean(),
  version: z.string().min(1).max(50),
  timestamp: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().max(500).optional(),
  granular: z.record(z.string(), z.object({
    granted: z.boolean(),
    timestamp: z.string().datetime(),
  })).optional(),
});

// ============================================================
// AI Analytics
// ============================================================

export const usageAnalyticsSchema = z.object({
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  metrics: z.array(z.enum([
    "total_requests", "unique_users", "active_sessions",
    "avg_response_time", "token_usage", "error_rate", "satisfaction_score",
  ])),
  groupBy: z.enum(["hour", "day", "week", "month"]).default("day"),
  filters: z.object({
    models: z.array(z.string()).optional(),
    endpoints: z.array(z.string()).optional(),
    userSegments: z.array(z.string()).optional(),
  }).optional(),
  includeComparisons: z.boolean().default(false),
});

export const performanceAnalyticsSchema = z.object({
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  metrics: z.array(z.enum([
    "latency_p50", "latency_p90", "latency_p99", "throughput",
    "error_rate", "availability", "cpu_usage", "memory_usage",
  ])),
  modelId: z.string().uuid().optional(),
  endpoint: z.string().max(255).optional(),
  granularity: z.enum(["minute", "hour", "day"]).default("hour"),
  includePercentiles: z.boolean().default(true),
});

export const qualityAnalyticsSchema = z.object({
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  metrics: z.array(z.enum([
    "accuracy", "relevance", "coherence", "factuality",
    "safety_score", "user_satisfaction", "response_quality",
  ])),
  modelId: z.string().uuid().optional(),
  category: z.string().max(255).optional(),
  sampleSize: z.number().int().min(1).max(10000).default(1000),
  confidenceLevel: z.number().min(0.9).max(0.99).default(0.95),
});

export const costAnalyticsSchema = z.object({
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  metrics: z.array(z.enum([
    "total_cost", "cost_per_request", "cost_per_token",
    "cost_by_model", "cost_by_user", "budget_utilization",
  ])),
  groupBy: z.enum(["day", "week", "month"]).default("day"),
  currency: z.enum(["USD", "EUR", "GBP", "CAD", "AUD"]).default("USD"),
  includeProjections: z.boolean().default(false),
  budgetLimit: z.number().min(0).optional(),
});

export const cohortSchema = z.object({
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  cohortType: z.enum(["acquisition", "behavior", "engagement", "retention"]),
  cohortBy: z.enum(["date", "week", "month"]),
  segments: z.array(z.string()).optional(),
  metrics: z.array(z.string()).min(1),
  retentionPeriods: z.number().int().min(1).max(52).optional(),
  compareWith: z.array(z.string()).optional(),
});

export const funnelSchema = z.object({
  name: z.string().min(1).max(255),
  steps: z.array(z.object({
    name: z.string().min(1).max(255),
    event: z.string().min(1).max(255),
    filters: z.record(z.string(), z.unknown()).optional(),
  })).min(2).max(20),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  groupBy: z.enum(["none", "source", "device", "user_segment"]).default("none"),
  conversionWindow: z.number().int().min(1).max(30).default(7),
});

export const heatmapSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(["click", "scroll", "attention", "activity"]),
  pageUrl: z.string().url().optional(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  resolution: z.enum(["pixel", "grid", "element"]).default("grid"),
  gridSize: z.number().int().min(10).max(200).default(50),
  colorScale: z.enum(["thermal", "spectrum", "grayscale"]).default("thermal"),
  includeScrollDepth: z.boolean().default(false),
});

// ============================================================
// AI Dashboard
// ============================================================

export const dashboardSchema = z.object({
  ownerId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  layout: z.array(z.object({
    widgetId: z.string().uuid(),
    x: z.number().int().min(0),
    y: z.number().int().min(0),
    w: z.number().int().min(1),
    h: z.number().int().min(1),
  })),
  isDefault: z.boolean().default(false),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  refreshInterval: z.number().int().min(0).max(86400).default(300),
  theme: z.enum(["light", "dark", "auto"]).default("auto"),
});

export const widgetSchema = z.object({
  dashboardId: z.string().uuid(),
  type: z.enum(["chart", "table", "metric", "list", "text", "iframe", "custom"]),
  title: z.string().min(1).max(255),
  config: z.record(z.string(), z.unknown()),
  dataSource: z.object({
    type: z.enum(["api", "query", "static"]),
    endpoint: z.string().max(500).optional(),
    query: z.string().max(5000).optional(),
    refreshInterval: z.number().int().min(0).max(3600).optional(),
  }).optional(),
  size: z.object({
    minW: z.number().int().min(1).optional(),
    minH: z.number().int().min(1).optional(),
    maxW: z.number().int().min(1).optional(),
    maxH: z.number().int().min(1).optional(),
  }).optional(),
  visibility: z.enum(["always", "when_data", "never"]).default("always"),
});

export const dashboardShareSchema = z.object({
  dashboardId: z.string().uuid(),
  shareWith: z.array(z.string().uuid()).min(1),
  permission: z.enum(["view", "edit", "admin"]),
  expiresAt: z.string().datetime().optional(),
  notifyRecipients: z.boolean().default(true),
  includeData: z.boolean().default(true),
  password: z.string().min(8).max(128).optional(),
});

export const dashboardTemplateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  category: z.enum(["academic", "financial", "operational", "hr", "custom"]),
  widgets: z.array(z.object({
    type: z.enum(["chart", "table", "metric", "list"]),
    title: z.string().min(1).max(255),
    config: z.record(z.string(), z.unknown()),
  })),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  previewUrl: z.string().url().optional(),
});

export const dashboardAlertSchema = z.object({
  dashboardId: z.string().uuid(),
  widgetId: z.string().uuid().optional(),
  name: z.string().min(1).max(255),
  condition: z.object({
    metric: z.string().min(1).max(255),
    operator: z.enum(["gt", "lt", "gte", "lte", "eq", "neq"]),
    threshold: z.number(),
    timeWindow: z.number().int().min(1).max(86400).optional(),
  }),
  severity: z.enum(["info", "warning", "critical"]),
  channels: z.array(z.enum(["email", "push", "sms", "webhook"])).min(1),
  enabled: z.boolean().default(true),
  cooldown: z.number().int().min(60).max(86400).default(3600),
});

// ============================================================
// AI Insights
// ============================================================

export const trendSchema = z.object({
  name: z.string().min(1).max(255),
  metric: z.string().min(1).max(255),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  direction: z.enum(["up", "down", "stable", "volatile"]),
  magnitude: z.number().min(0),
  confidence: z.number().min(0).max(1),
  seasonality: z.object({
    detected: z.boolean(),
    period: z.string().max(50).optional(),
    strength: z.number().min(0).max(1).optional(),
  }).optional(),
  dataPoints: z.array(z.object({
    date: z.string().datetime(),
    value: z.number(),
  })).optional(),
  forecast: z.array(z.object({
    date: z.string().datetime(),
    value: z.number(),
    lowerBound: z.number().optional(),
    upperBound: z.number().optional(),
  })).optional(),
});

export const anomalySchema = z.object({
  metric: z.string().min(1).max(255),
  timestamp: z.string().datetime(),
  value: z.number(),
  expectedValue: z.number(),
  deviation: z.number(),
  severity: z.enum(["low", "medium", "high", "critical"]),
  type: z.enum(["spike", "dip", "shift", "trend_change"]),
  context: z.record(z.string(), z.unknown()).optional(),
  possibleCauses: z.array(z.string().max(500)).optional(),
  recommendedActions: z.array(z.string().max(500)).optional(),
});

export const correlationSchema = z.object({
  metricA: z.string().min(1).max(255),
  metricB: z.string().min(1).max(255),
  correlationCoefficient: z.number().min(-1).max(1),
  pValue: z.number().min(0).max(1),
  significance: z.enum(["not_significant", "weak", "moderate", "strong", "very_strong"]),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  lag: z.number().int().optional(),
  dataPoints: z.array(z.object({
    date: z.string().datetime(),
    valueA: z.number(),
    valueB: z.number(),
  })).optional(),
});

export const insightPredictionSchema = z.object({
  metric: z.string().min(1).max(255),
  predictions: z.array(z.object({
    date: z.string().datetime(),
    value: z.number(),
    lowerBound: z.number(),
    upperBound: z.number(),
    confidence: z.number().min(0).max(1),
  })),
  model: z.string().max(255),
  accuracy: z.number().min(0).max(1),
  horizon: z.number().int().min(1),
  horizonUnit: z.enum(["hours", "days", "weeks", "months"]),
  factors: z.array(z.object({
    name: z.string().max(255),
    importance: z.number().min(0).max(1),
  })).optional(),
});

export const insightRecommendationSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(["content", "action", "resource", "study_plan", "improvement"]),
  items: z.array(z.object({
    id: z.string().uuid(),
    title: z.string().min(1).max(255),
    description: z.string().max(1000),
    score: z.number().min(0).max(1),
    reason: z.string().max(500),
    category: z.string().max(100),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })),
  context: z.object({
    subject: z.string().max(255).optional(),
    gradeLevel: z.number().int().min(1).max(12).optional(),
    learningStyle: z.string().max(100).optional(),
    recentActivity: z.array(z.string()).optional(),
  }).optional(),
  maxResults: z.number().int().min(1).max(50).default(10),
});

export const insightDistributionSchema = z.object({
  insightType: z.enum(["trend", "anomaly", "correlation", "prediction", "recommendation"]),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  groupBy: z.enum(["day", "week", "month", "quarter"]),
  dimensions: z.array(z.string()).optional(),
  metrics: z.array(z.string()).min(1),
  includePercentiles: z.boolean().default(true),
});

// ============================================================
// AI Predictions
// ============================================================

export const predictionRequestSchema = z.object({
  modelId: z.string().uuid(),
  input: z.record(z.string(), z.unknown()),
  features: z.array(z.string()).optional(),
  predictionType: z.enum(["regression", "classification", "clustering", "timeseries"]),
  outputFields: z.array(z.string()).optional(),
  confidenceInterval: z.boolean().default(false),
  confidenceLevel: z.number().min(0.9).max(0.99).default(0.95),
  maxPredictions: z.number().int().min(1).max(1000).default(1),
});

export const predictionConfigSchema = z.object({
  modelId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  inputSchema: z.record(z.string(), z.unknown()),
  outputSchema: z.record(z.string(), z.unknown()),
  preprocessing: z.array(z.object({
    type: z.enum(["normalize", "standardize", "encode", "impute", "remove_outliers"]),
    params: z.record(z.string(), z.unknown()).optional(),
  })).optional(),
  postprocessing: z.array(z.object({
    type: z.enum(["threshold", "clip", "round", "decode"]),
    params: z.record(z.string(), z.unknown()).optional(),
  })).optional(),
  caching: z.object({
    enabled: z.boolean().default(false),
    ttl: z.number().int().min(0).max(86400).optional(),
  }).optional(),
});

export const backtestSchema = z.object({
  modelId: z.string().uuid(),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  metrics: z.array(z.enum(["accuracy", "precision", "recall", "f1", "rmse", "mae", "mape"])).min(1),
  trainTestSplit: z.number().min(0.5).max(0.9).default(0.8),
  crossValidation: z.object({
    enabled: z.boolean().default(false),
    folds: z.number().int().min(2).max(20).default(5),
  }).optional(),
  compareWithBaseline: z.boolean().default(true),
  baselineModelId: z.string().uuid().optional(),
});

export const ensembleSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  modelIds: z.array(z.string().uuid()).min(2).max(10),
  strategy: z.enum(["weighted_average", "voting", "stacking", "boosting"]),
  weights: z.array(z.number().min(0).max(1)).optional(),
  metaModelId: z.string().uuid().optional(),
  optimizationTarget: z.enum(["accuracy", "precision", "recall", "f1", "latency"]).default("accuracy"),
});

export const driftDetectionSchema = z.object({
  modelId: z.string().uuid(),
  referenceData: z.array(z.record(z.string(), z.unknown())).min(100),
  currentData: z.array(z.record(z.string(), z.unknown())).min(100),
  metrics: z.array(z.enum(["psi", "ks", "chi_squared", "jensen_shannon", "wasserstein"])).min(1),
  threshold: z.number().min(0).max(1).default(0.1),
  significanceLevel: z.number().min(0.01).max(0.1).default(0.05),
  includeVisualization: z.boolean().default(true),
});

// ============================================================
// AI Recommendations
// ============================================================

export const recommendationRequestSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(["content", "course", "resource", "peer", "tutor"]),
  context: z.object({
    subject: z.string().max(255).optional(),
    topic: z.string().max(255).optional(),
    gradeLevel: z.number().int().min(1).max(12).optional(),
    learningStyle: z.enum(["visual", "auditory", "reading", "kinesthetic"]).optional(),
    difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  }).optional(),
  excludeIds: z.array(z.string().uuid()).optional(),
  maxResults: z.number().int().min(1).max(50).default(10),
  diversify: z.boolean().default(true),
  explainReasoning: z.boolean().default(true),
});

export const recommendationFeedbackSchema = z.object({
  userId: z.string().uuid(),
  recommendationId: z.string().uuid(),
  action: z.enum(["viewed", "clicked", "completed", "dismissed", "rated"]),
  rating: z.number().int().min(1).max(5).optional(),
  feedback: z.string().max(1000).optional(),
  timeSpent: z.number().int().min(0).optional(),
  completed: z.boolean().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const knowledgeGraphSchema = z.object({
  query: z.string().min(1).max(500),
  entityTypes: z.array(z.enum(["concept", "person", "organization", "event", "resource"])).optional(),
  relationshipTypes: z.array(z.enum(["prerequisite", "related", "part_of", "contradicts", "supports"])).optional(),
  maxDepth: z.number().int().min(1).max(5).default(2),
  maxResults: z.number().int().min(1).max(100).default(50),
  includeProperties: z.boolean().default(true),
  algorithm: z.enum(["pagerank", "betweenness", "closeness", "louvain"]).optional(),
});

export const contextAwareRecommendationSchema = z.object({
  userId: z.string().uuid(),
  query: z.string().min(1).max(2000),
  context: z.object({
    sessionId: z.string().uuid().optional(),
    currentPage: z.string().max(500).optional(),
    recentActions: z.array(z.object({
      type: z.string().max(100),
      timestamp: z.string().datetime(),
      metadata: z.record(z.string(), z.unknown()).optional(),
    })).optional(),
    device: z.enum(["desktop", "tablet", "mobile"]).optional(),
    timeOfDay: z.enum(["morning", "afternoon", "evening", "night"]).optional(),
    location: z.string().max(255).optional(),
  }),
  maxResults: z.number().int().min(1).max(20).default(10),
  personalize: z.boolean().default(true),
});

// ============================================================
// AI Automation
// ============================================================

export const automationWorkflowSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  trigger: z.object({
    type: z.enum(["manual", "schedule", "event", "webhook", "api"]),
    config: z.record(z.string(), z.unknown()),
  }),
  steps: z.array(z.object({
    id: z.string().uuid(),
    type: z.enum(["action", "condition", "loop", "parallel", "delay", "notification"]),
    config: z.record(z.string(), z.unknown()),
    nextStepId: z.string().uuid().optional(),
  })).min(1),
  enabled: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
    backoffMultiplier: z.number().min(1).max(10).default(2),
  }).optional(),
});

export const automationTriggerSchema = z.object({
  workflowId: z.string().uuid(),
  name: z.string().min(1).max(255),
  type: z.enum(["cron", "event", "webhook", "file", "message", "custom"]),
  config: z.record(z.string(), z.unknown()),
  enabled: z.boolean().default(true),
  conditions: z.array(z.object({
    field: z.string().min(1).max(255),
    operator: z.enum(["eq", "neq", "gt", "lt", "gte", "lte", "contains", "regex"]),
    value: z.unknown(),
  })).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const scheduledExecutionSchema = z.object({
  workflowId: z.string().uuid(),
  schedule: z.string().min(1).max(100),
  timezone: z.string().max(50).default("UTC"),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  maxExecutions: z.number().int().min(1).max(10000).optional(),
  parameters: z.record(z.string(), z.unknown()).optional(),
  enabled: z.boolean().default(true),
  notificationOnFailure: z.boolean().default(true),
});

export const eventListenerSchema = z.object({
  workflowId: z.string().uuid(),
  eventType: z.enum(["user_created", "user_updated", "message_sent", "document_uploaded", "grade_posted", "custom"]),
  eventSource: z.string().max(255).optional(),
  filter: z.object({
    conditions: z.array(z.object({
      field: z.string().min(1).max(255),
      operator: z.enum(["eq", "neq", "gt", "lt", "contains"]),
      value: z.unknown(),
    })),
    logic: z.enum(["and", "or"]).default("and"),
  }).optional(),
  enabled: z.boolean().default(true),
  priority: z.number().int().min(0).max(100).default(50),
});

export const automationWebhookSchema = z.object({
  name: z.string().min(1).max(255),
  url: z.string().url(),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]).default("POST"),
  headers: z.record(z.string(), z.string()).optional(),
  secret: z.string().min(16).max(256).optional(),
  events: z.array(z.string().min(1).max(255)).min(1),
  enabled: z.boolean().default(true),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
  }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const automationWorkflowTemplateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  category: z.enum(["onboarding", "notification", "reporting", "integration", "custom"]),
  trigger: z.object({
    type: z.enum(["manual", "schedule", "event", "webhook"]),
    config: z.record(z.string(), z.unknown()),
  }),
  steps: z.array(z.object({
    type: z.enum(["action", "condition", "loop", "parallel", "delay", "notification"]),
    config: z.record(z.string(), z.unknown()),
  })).min(1),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
});

// ============================================================
// AI Workflow
// ============================================================

export const workflowStepSchema = z.object({
  workflowId: z.string().uuid(),
  name: z.string().min(1).max(255),
  type: z.enum(["action", "condition", "loop", "parallel", "delay", "transform", "aggregate"]),
  config: z.record(z.string(), z.unknown()),
  dependencies: z.array(z.string().uuid()).optional(),
  timeout: z.number().int().min(1000).max(300000).default(30000),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
  }).optional(),
  onError: z.enum(["fail", "skip", "retry", "fallback"]).default("fail"),
  fallbackStepId: z.string().uuid().optional(),
});

export const actionStepSchema = z.object({
  workflowId: z.string().uuid(),
  stepId: z.string().uuid(),
  type: z.enum(["api_call", "database", "email", "notification", "transform", "validate", "custom"]),
  config: z.record(z.string(), z.unknown()),
  inputMapping: z.record(z.string(), z.string()).optional(),
  outputMapping: z.record(z.string(), z.string()).optional(),
  timeout: z.number().int().min(1000).max(300000).default(30000),
  retryable: z.boolean().default(true),
  idempotent: z.boolean().default(false),
});

export const conditionStepSchema = z.object({
  workflowId: z.string().uuid(),
  stepId: z.string().uuid(),
  expressions: z.array(z.object({
    field: z.string().min(1).max(255),
    operator: z.enum(["eq", "neq", "gt", "lt", "gte", "lte", "contains", "exists", "empty"]),
    value: z.unknown().optional(),
  })).min(1),
  logic: z.enum(["and", "or"]).default("and"),
  trueBranch: z.string().uuid(),
  falseBranch: z.string().uuid().optional(),
  invert: z.boolean().default(false),
});

export const loopStepSchema = z.object({
  workflowId: z.string().uuid(),
  stepId: z.string().uuid(),
  type: z.enum(["for", "while", "foreach"]),
  config: z.object({
    collection: z.string().max(255).optional(),
    itemVariable: z.string().max(100).optional(),
    condition: z.string().max(500).optional(),
    maxIterations: z.number().int().min(1).max(1000).default(100),
    breakCondition: z.string().max(500).optional(),
  }),
  bodyStepId: z.string().uuid(),
  outputVariable: z.string().max(100).optional(),
});

export const parallelStepSchema = z.object({
  workflowId: z.string().uuid(),
  stepId: z.string().uuid(),
  branches: z.array(z.string().uuid()).min(2).max(20),
  waitStrategy: z.enum(["all", "any", "majority"]).default("all"),
  mergeResults: z.boolean().default(true),
  mergeStrategy: z.enum(["concat", "merge", "custom"]).default("concat"),
  timeout: z.number().int().min(1000).max(600000).default(60000),
  onError: z.enum(["fail_all", "fail_branch", "ignore"]).default("fail_all"),
});

export const workflowExecutionSchema = z.object({
  workflowId: z.string().uuid(),
  triggerData: z.record(z.string(), z.unknown()).optional(),
  parameters: z.record(z.string(), z.unknown()).optional(),
  idempotencyKey: z.string().uuid().optional(),
  callbackUrl: z.string().url().optional(),
  timeout: z.number().int().min(1000).max(3600000).optional(),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  dryRun: z.boolean().default(false),
});

export const workflowRollbackSchema = z.object({
  executionId: z.string().uuid(),
  reason: z.string().min(1).max(2000),
  stepsToRollback: z.array(z.string().uuid()).optional(),
  rollbackAll: z.boolean().default(false),
  notifyOnComplete: z.boolean().default(true),
  timeout: z.number().int().min(1000).max(600000).default(60000),
  force: z.boolean().default(false),
});

// ============================================================
// AI Scheduling
// ============================================================

export const scheduleSchema = z.object({
  ownerId: z.string().uuid(),
  ownerType: z.enum(["student", "teacher", "class", "school"]),
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  recurrence: z.object({
    frequency: z.enum(["daily", "weekly", "biweekly", "monthly"]),
    daysOfWeek: z.array(z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"])).optional(),
    endDate: z.string().datetime().optional(),
    count: z.number().int().min(1).max(365).optional(),
  }).optional(),
  location: z.string().max(255).optional(),
  isVirtual: z.boolean().default(false),
  meetingUrl: z.string().url().optional(),
  participants: z.array(z.string().uuid()).optional(),
  reminders: z.array(z.object({
    minutesBefore: z.number().int().min(0).max(1440),
    method: z.enum(["push", "email", "sms"]),
  })).optional(),
  tags: z.array(z.string()).optional(),
});

export const conflictResolutionSchema = z.object({
  schedules: z.array(z.string().uuid()).min(2),
  strategy: z.enum(["reschedule", "merge", "cancel", "notify", "auto"]),
  preferences: z.object({
    preferredTimes: z.array(z.string().regex(/^\d{2}:\d{2}$/)).optional(),
    avoidTimes: z.array(z.string().regex(/^\d{2}:\d{2}$/)).optional(),
    maxDailyEvents: z.number().int().min(1).max(20).optional(),
    bufferMinutes: z.number().int().min(0).max(120).default(15),
  }).optional(),
  notifyParticipants: z.boolean().default(true),
  autoResolve: z.boolean().default(false),
});

export const optimizationSchema = z.object({
  scheduleIds: z.array(z.string().uuid()).min(1),
  objectives: z.array(z.enum(["minimize_gaps", "minimize_travel", "balance_load", "maximize_utilization"])).min(1),
  constraints: z.array(z.object({
    type: z.enum(["capacity", "time", "resource", "preference"]),
    params: z.record(z.string(), z.unknown()),
  })).optional(),
  maxIterations: z.number().int().min(100).max(10000).default(1000),
  improvementThreshold: z.number().min(0).max(1).default(0.01),
});

export const scheduleTemplateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  category: z.enum(["class", "exam", "event", "meeting", "custom"]),
  events: z.array(z.object({
    title: z.string().min(1).max(255),
    dayOfWeek: z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
    location: z.string().max(255).optional(),
    recurrence: z.enum(["weekly", "biweekly", "monthly"]).default("weekly"),
  })).min(1),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
});

export const publicationSchema = z.object({
  scheduleId: z.string().uuid(),
  action: z.enum(["publish", "unpublish", "update"]),
  audience: z.enum(["students", "teachers", "parents", "all"]),
  notifyEmail: z.boolean().default(true),
  notifyPush: z.boolean().default(true),
  message: z.string().max(1000).optional(),
  effectiveDate: z.string().datetime().optional(),
});

export const reminderSchema = z.object({
  scheduleId: z.string().uuid(),
  type: z.enum(["before_event", "recurring", "custom"]),
  minutesBefore: z.number().int().min(0).max(1440).optional(),
  cronExpression: z.string().max(100).optional(),
  message: z.string().min(1).max(500),
  channels: z.array(z.enum(["push", "email", "sms", "in_app"])).min(1),
  enabled: z.boolean().default(true),
  repeatCount: z.number().int().min(1).max(10).optional(),
  repeatIntervalMinutes: z.number().int().min(1).max(1440).optional(),
});

export const calendarSyncSchema = z.object({
  userId: z.string().uuid(),
  provider: z.enum(["google", "outlook", "apple", "caldav"]),
  accessToken: z.string().min(1),
  refreshToken: z.string().optional(),
  syncDirection: z.enum(["pull", "push", "bidirectional"]).default("bidirectional"),
  calendarId: z.string().max(255).optional(),
  syncFrequency: z.number().int().min(5).max(1440).default(30),
  lastSyncAt: z.string().datetime().optional(),
  syncEvents: z.boolean().default(true),
  syncReminders: z.boolean().default(true),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// ============================================================
// AI Notification
// ============================================================

export const notificationSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum([
    "info", "warning", "error", "success", "reminder",
    "alert", "achievement", "message", "update",
  ]),
  title: z.string().min(1).max(255),
  message: z.string().min(1).max(2000),
  actionUrl: z.string().url().optional(),
  actionLabel: z.string().max(100).optional(),
  icon: z.string().max(255).optional(),
  channels: z.array(z.enum(["push", "email", "sms", "in_app"])).min(1),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  expiresAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  groupKey: z.string().max(255).optional(),
});

export const notificationBatchSchema = z.object({
  notifications: z.array(z.object({
    userId: z.string().uuid(),
    type: z.enum(["info", "warning", "error", "success", "reminder", "alert"]),
    title: z.string().min(1).max(255),
    message: z.string().min(1).max(2000),
    actionUrl: z.string().url().optional(),
    priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  })).min(1).max(1000),
  channels: z.array(z.enum(["push", "email", "sms", "in_app"])).min(1),
  scheduledAt: z.string().datetime().optional(),
  batchName: z.string().max(255).optional(),
});

export const notificationTemplateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  type: z.enum(["info", "warning", "error", "success", "reminder", "alert"]),
  channel: z.enum(["push", "email", "sms", "in_app"]),
  subject: z.string().min(1).max(255).optional(),
  body: z.string().min(1).max(5000),
  variables: z.array(z.object({
    name: z.string().min(1).max(100),
    type: z.enum(["string", "number", "boolean", "date"]),
    required: z.boolean().default(true),
    defaultValue: z.string().optional(),
  })).optional(),
  isActive: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
});

export const notificationPreferencesSchema = z.object({
  userId: z.string().uuid(),
  channels: z.object({
    push: z.object({
      enabled: z.boolean().default(true),
      sound: z.boolean().default(true),
      vibration: z.boolean().default(true),
    }).optional(),
    email: z.object({
      enabled: z.boolean().default(true),
      frequency: z.enum(["immediate", "hourly", "daily", "weekly"]).default("immediate"),
    }).optional(),
    sms: z.object({
      enabled: z.boolean().default(false),
      phone: z.string().min(10).max(20).optional(),
    }).optional(),
    inApp: z.object({
      enabled: z.boolean().default(true),
      showBadges: z.boolean().default(true),
    }).optional(),
  }),
  quietHours: z.object({
    enabled: z.boolean().default(false),
    start: z.string().regex(/^\d{2}:\d{2}$/),
    end: z.string().regex(/^\d{2}:\d{2}$/),
    timezone: z.string().max(50).default("UTC"),
  }).optional(),
  categories: z.record(z.string(), z.object({
    push: z.boolean().optional(),
    email: z.boolean().optional(),
    sms: z.boolean().optional(),
    inApp: z.boolean().optional(),
  })).optional(),
});

export const notificationDigestSchema = z.object({
  userId: z.string().uuid(),
  frequency: z.enum(["daily", "weekly", "biweekly"]),
  deliveryTime: z.string().regex(/^\d{2}:\d{2}$/),
  timezone: z.string().max(50).default("UTC"),
  categories: z.array(z.string()).optional(),
  includeSummary: z.boolean().default(true),
  includeActionItems: z.boolean().default(true),
  maxItems: z.number().int().min(1).max(100).default(20),
  enabled: z.boolean().default(true),
});

// ============================================================
// AI Integration
// ============================================================

export const integrationSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  type: z.enum(["api", "webhook", "oauth", "saml", "ldap", "custom"]),
  provider: z.string().min(1).max(255),
  version: z.string().min(1).max(50),
  config: z.record(z.string(), z.unknown()),
  credentials: z.object({
    type: z.enum(["api_key", "oauth2", "basic", "bearer", "custom"]),
    data: z.record(z.string(), z.string()),
  }).optional(),
  enabled: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const integrationWebhookSchema = z.object({
  integrationId: z.string().uuid(),
  url: z.string().url(),
  secret: z.string().min(16).max(256).optional(),
  events: z.array(z.string().min(1).max(255)).min(1),
  headers: z.record(z.string(), z.string()).optional(),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
  }).optional(),
  enabled: z.boolean().default(true),
});

export const integrationApiKeySchema = z.object({
  integrationId: z.string().uuid(),
  name: z.string().min(1).max(255),
  scopes: z.array(z.string().min(1).max(100)).min(1),
  expiresAt: z.string().datetime().optional(),
  rateLimit: z.number().int().min(1).max(100000).optional(),
  ipWhitelist: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const oauth2Schema = z.object({
  clientId: z.string().min(1).max(255),
  clientSecret: z.string().min(1).max(255),
  redirectUri: z.string().url(),
  scopes: z.array(z.string().min(1).max(100)).min(1),
  authorizationUrl: z.string().url(),
  tokenUrl: z.string().url(),
  refreshUrl: z.string().url().optional(),
  state: z.string().max(255).optional(),
  codeChallenge: z.string().max(255).optional(),
  codeChallengeMethod: z.enum(["S256", "plain"]).optional(),
});

export const integrationVersioningSchema = z.object({
  integrationId: z.string().uuid(),
  version: z.string().min(1).max(50),
  changelog: z.string().max(2000).optional(),
  breaking: z.boolean().default(false),
  deprecated: z.boolean().default(false),
  sunsetDate: z.string().datetime().optional(),
  migrationGuide: z.string().max(5000).optional(),
});

// ============================================================
// AI API Management
// ============================================================

export const apiGatewaySchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  baseUrl: z.string().url(),
  routes: z.array(z.object({
    path: z.string().min(1).max(500),
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    target: z.string().min(1).max(500),
    auth: z.boolean().default(true),
    rateLimit: z.number().int().min(1).max(100000).optional(),
    cache: z.boolean().default(false),
    timeout: z.number().int().min(1000).max(60000).default(30000),
  })).min(1),
  cors: z.object({
    origins: z.array(z.string()).default(["*"]),
    methods: z.array(z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"])).default(["GET", "POST"]),
    headers: z.array(z.string()).default(["Content-Type", "Authorization"]),
    credentials: z.boolean().default(false),
  }).optional(),
  enabled: z.boolean().default(true),
});

export const rateLimitConfigSchema = z.object({
  name: z.string().min(1).max(255),
  rules: z.array(z.object({
    scope: z.enum(["global", "per_user", "per_ip", "per_endpoint", "per_api_key"]),
    maxRequests: z.number().int().min(1).max(1000000),
    windowMs: z.number().int().min(1000).max(86400000),
    burst: z.number().int().min(1).max(10000).optional(),
  })).min(1),
  responseHeaders: z.boolean().default(true),
  skipSuccessfulRequests: z.boolean().default(false),
  skipFailedRequests: z.boolean().default(false),
  keyGenerator: z.enum(["ip", "user_id", "api_key", "custom"]).default("ip"),
});

export const keyManagementSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(["encryption", "signing", "api", "oauth"]),
  algorithm: z.enum(["RSA", "ECDSA", "HMAC", "AES"]).optional(),
  keySize: z.number().int().min(128).max(4096).optional(),
  expiresAt: z.string().datetime().optional(),
  rotationEnabled: z.boolean().default(false),
  rotationIntervalDays: z.number().int().min(1).max(365).optional(),
  backupEnabled: z.boolean().default(false),
  accessControl: z.array(z.enum(["read", "write", "rotate", "delete"])).default(["read"]),
});

export const requestValidationSchema = z.object({
  gatewayId: z.string().uuid(),
  routeId: z.string().uuid().optional(),
  rules: z.array(z.object({
    type: z.enum(["header", "query", "body", "path"]),
    field: z.string().min(1).max(255),
    required: z.boolean().default(true),
    schema: z.record(z.string(), z.unknown()).optional(),
    pattern: z.string().max(500).optional(),
    minLength: z.number().int().min(0).optional(),
    maxLength: z.number().int().min(0).optional(),
  })).min(1),
  customMessages: z.record(z.string(), z.string()).optional(),
});

export const circuitBreakerSchema = z.object({
  name: z.string().min(1).max(255),
  failureThreshold: z.number().int().min(1).max(100).default(5),
  successThreshold: z.number().int().min(1).max(100).default(3),
  timeout: z.number().int().min(1000).max(60000).default(30000),
  resetTimeout: z.number().int().min(1000).max(300000).default(60000),
  monitoringPeriod: z.number().int().min(1000).max(60000).default(10000),
  fallbackFn: z.string().max(255).optional(),
  enabled: z.boolean().default(true),
});

// ============================================================
// AI Rate Limiting
// ============================================================

export const rateLimitEndpointSchema = z.object({
  endpoint: z.string().min(1).max(500),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  maxRequests: z.number().int().min(1).max(1000000),
  windowMs: z.number().int().min(1000).max(86400000),
  burst: z.number().int().min(1).max(10000).optional(),
  priority: z.number().int().min(0).max(100).default(50),
  enabled: z.boolean().default(true),
});

export const rateLimitUserSchema = z.object({
  userId: z.string().uuid(),
  maxRequests: z.number().int().min(1).max(1000000),
  windowMs: z.number().int().min(1000).max(86400000),
  burst: z.number().int().min(1).max(10000).optional(),
  tier: z.enum(["free", "basic", "pro", "enterprise"]).default("free"),
  overrides: z.array(z.object({
    endpoint: z.string().min(1).max(500),
    maxRequests: z.number().int().min(1),
    windowMs: z.number().int().min(1000),
  })).optional(),
});

export const penaltyBoxSchema = z.object({
  userId: z.string().uuid(),
  reason: z.string().min(1).max(500),
  duration: z.number().int().min(60).max(604800),
  affectedEndpoints: z.array(z.string()).optional(),
  escalateOnRepeat: z.boolean().default(true),
  notifyUser: z.boolean().default(true),
  adminNotes: z.string().max(1000).optional(),
});

export const distributedRateLimitSchema = z.object({
  name: z.string().min(1).max(255),
  strategy: z.enum(["sliding_window", "token_bucket", "fixed_window", "leaky_bucket"]),
  maxRequests: z.number().int().min(1).max(1000000),
  windowMs: z.number().int().min(1000).max(86400000),
  nodes: z.number().int().min(1).max(100).default(3),
  syncInterval: z.number().int().min(100).max(10000).default(1000),
  fallbackToLocal: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

// ============================================================
// AI Caching
// ============================================================

export const cacheConfigSchema = z.object({
  name: z.string().min(1).max(255),
  driver: z.enum(["memory", "redis", "memcached", "file", "database"]),
  ttl: z.number().int().min(0).max(86400000).default(3600),
  prefix: z.string().max(100).optional(),
  serializer: z.enum(["json", "msgpack", "custom"]).default("json"),
  compression: z.enum(["none", "gzip", "lz4", "snappy"]).default("none"),
  maxEntries: z.number().int().min(1).max(1000000).optional(),
  maxMemory: z.number().int().min(1024).max(1073741824).optional(),
  evictionPolicy: z.enum(["lru", "lfu", "fifo", "random"]).default("lru"),
  enabled: z.boolean().default(true),
});

export const cacheNamespaceSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(500).optional(),
  ttl: z.number().int().min(0).max(86400000).default(3600),
  tags: z.array(z.string()).optional(),
  maxSize: z.number().int().min(1).max(1000000).optional(),
  warmup: z.boolean().default(false),
  warmupQuery: z.string().max(5000).optional(),
  enabled: z.boolean().default(true),
});

export const cacheWarmingSchema = z.object({
  namespace: z.string().min(1).max(255),
  strategy: z.enum(["scheduled", "on_startup", "on_demand", "predictive"]),
  schedule: z.string().max(100).optional(),
  queries: z.array(z.object({
    key: z.string().min(1).max(255),
    query: z.string().min(1).max(5000),
    params: z.record(z.string(), z.unknown()).optional(),
    ttl: z.number().int().min(0).max(86400000).optional(),
  })).min(1),
  parallel: z.boolean().default(false),
  retryOnFailure: z.boolean().default(true),
  maxRetries: z.number().int().min(0).max(10).default(3),
});

export const cacheInvalidationSchema = z.object({
  strategy: z.enum(["ttl", "event", "manual", "tag", "pattern"]),
  patterns: z.array(z.string().max(255)).optional(),
  tags: z.array(z.string().max(100)).optional(),
  events: z.array(z.enum([
    "record_updated", "record_deleted", "record_created",
    "bulk_operation", "deployment", "manual",
  ])).optional(),
  cascade: z.boolean().default(false),
  delayMs: z.number().int().min(0).max(60000).default(0),
  notify: z.boolean().default(false),
});

// ============================================================
// AI Storage
// ============================================================

export const storageConfigSchema = z.object({
  driver: z.enum(["local", "s3", "gcs", "azure", "minio", "custom"]),
  bucket: z.string().min(1).max(255).optional(),
  region: z.string().max(100).optional(),
  endpoint: z.string().url().optional(),
  accessKey: z.string().max(255).optional(),
  secretKey: z.string().max(255).optional(),
  pathPrefix: z.string().max(255).optional(),
  publicUrl: z.string().url().optional(),
  maxFileSize: z.number().int().min(1).max(10737418240).default(104857600),
  allowedMimeTypes: z.array(z.string().max(100)).optional(),
  encryption: z.boolean().default(false),
  versioning: z.boolean().default(false),
});

export const fileUploadSchema = z.object({
  fileName: z.string().min(1).max(255),
  fileSize: z.number().int().min(1).max(10737418240),
  mimeType: z.string().min(1).max(100),
  folder: z.string().max(500).optional(),
  tags: z.array(z.string().max(100)).max(20).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  isPublic: z.boolean().default(false),
  overwrite: z.boolean().default(false),
  path: z.string().max(500).optional(),
});

export const fileShareSchema = z.object({
  fileId: z.string().uuid(),
  shareWith: z.array(z.string().uuid()).min(1),
  permission: z.enum(["view", "comment", "edit", "admin"]),
  expiresAt: z.string().datetime().optional(),
  password: z.string().min(8).max(128).optional(),
  downloadLimit: z.number().int().min(1).max(10000).optional(),
  allowDownload: z.boolean().default(true),
  notifyRecipients: z.boolean().default(true),
  message: z.string().max(1000).optional(),
});

export const quotaSchema = z.object({
  userId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  maxStorageBytes: z.number().int().min(0).max(1099511627776),
  maxFileCount: z.number().int().min(0).max(1000000).optional(),
  maxFileSize: z.number().int().min(1).max(10737418240).optional(),
  maxBandwidthBytes: z.number().int().min(0).max(1099511627776).optional(),
  currentUsageBytes: z.number().int().min(0).default(0),
  currentFileCount: z.number().int().min(0).default(0),
  warningThreshold: z.number().min(0).max(1).default(0.8),
  hardLimit: z.boolean().default(true),
});

export const backupSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  source: z.object({
    type: z.enum(["files", "database", "full"]),
    paths: z.array(z.string().max(500)).optional(),
    databases: z.array(z.string().max(255)).optional(),
  }),
  destination: z.object({
    type: z.enum(["local", "s3", "gcs", "azure"]),
    path: z.string().min(1).max(500),
  }),
  schedule: z.string().max(100).optional(),
  retention: z.object({
    count: z.number().int().min(1).max(365).optional(),
    days: z.number().int().min(1).max(3650).optional(),
  }).optional(),
  compression: z.boolean().default(true),
  encryption: z.boolean().default(false),
  enabled: z.boolean().default(true),
});

// ============================================================
// AI Logging
// ============================================================

export const loggingConfigSchema = z.object({
  level: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).default("info"),
  format: z.enum(["json", "text", "structured"]).default("json"),
  destination: z.enum(["console", "file", "remote", "all"]).default("console"),
  filePath: z.string().max(500).optional(),
  maxSize: z.number().int().min(1024).max(1073741824).default(10485760),
  maxFiles: z.number().int().min(1).max(100).default(5),
  compress: z.boolean().default(false),
  sanitize: z.boolean().default(true),
  redactFields: z.array(z.string().max(255)).optional(),
  remoteEndpoint: z.string().url().optional(),
  batchSize: z.number().int().min(1).max(1000).default(100),
  flushInterval: z.number().int().min(100).max(60000).default(5000),
});

export const logEntrySchema = z.object({
  level: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]),
  message: z.string().min(1).max(10000),
  source: z.string().max(255).optional(),
  requestId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  sessionId: z.string().uuid().optional(),
  duration: z.number().int().min(0).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  error: z.object({
    name: z.string().max(255).optional(),
    message: z.string().max(5000),
    stack: z.string().max(50000).optional(),
    code: z.string().max(100).optional(),
  }).optional(),
  tags: z.array(z.string().max(100)).optional(),
});

export const remoteLogSchema = z.object({
  endpoint: z.string().url(),
  apiKey: z.string().min(1).max(255).optional(),
  format: z.enum(["json", "jsonl", "protobuf"]).default("json"),
  batchSize: z.number().int().min(1).max(10000).default(100),
  flushInterval: z.number().int().min(100).max(60000).default(5000),
  maxRetries: z.number().int().min(0).max(10).default(3),
  timeout: z.number().int().min(1000).max(60000).default(10000),
  compression: z.enum(["none", "gzip", "lz4"]).default("none"),
  enabled: z.boolean().default(true),
});

export const auditLogSchema = z.object({
  actor: z.string().min(1).max(255),
  actorType: z.enum(["user", "system", "api", "admin"]),
  action: z.string().min(1).max(255),
  resourceType: z.string().min(1).max(255),
  resourceId: z.string().max(255).optional(),
  outcome: z.enum(["success", "failure", "partial"]),
  details: z.record(z.string(), z.unknown()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().max(500).optional(),
  timestamp: z.string().datetime(),
  requestId: z.string().uuid().optional(),
  sessionId: z.string().uuid().optional(),
});

// ============================================================
// AI Monitoring
// ============================================================

export const healthCheckSchema = z.object({
  service: z.string().min(1).max(255),
  status: z.enum(["healthy", "degraded", "unhealthy"]),
  timestamp: z.string().datetime(),
  uptime: z.number().int().min(0),
  version: z.string().min(1).max(50),
  dependencies: z.array(z.object({
    name: z.string().min(1).max(255),
    status: z.enum(["healthy", "degraded", "unhealthy", "unknown"]),
    latency: z.number().int().min(0).optional(),
    message: z.string().max(500).optional(),
  })).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const performanceMetricSchema = z.object({
  name: z.string().min(1).max(255),
  value: z.number(),
  unit: z.string().max(50).optional(),
  timestamp: z.string().datetime(),
  tags: z.record(z.string(), z.string()).optional(),
  dimensions: z.record(z.string(), z.string()).optional(),
  sampleCount: z.number().int().min(1).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  p50: z.number().optional(),
  p90: z.number().optional(),
  p99: z.number().optional(),
});

export const availabilityCheckSchema = z.object({
  service: z.string().min(1).max(255),
  endpoint: z.string().url(),
  method: z.enum(["GET", "POST", "PUT", "HEAD"]).default("GET"),
  expectedStatus: z.number().int().min(100).max(599).default(200),
  timeout: z.number().int().min(1000).max(60000).default(5000),
  interval: z.number().int().min(1000).max(86400000).default(60000),
  retries: z.number().int().min(0).max(10).default(3),
  headers: z.record(z.string(), z.string()).optional(),
  body: z.string().max(10000).optional(),
  followRedirects: z.boolean().default(true),
  verifySsl: z.boolean().default(true),
});

export const securityMetricSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(["counter", "gauge", "histogram", "summary"]),
  value: z.number(),
  labels: z.record(z.string(), z.string()).optional(),
  timestamp: z.string().datetime(),
  description: z.string().max(500).optional(),
});

export const resourceMetricSchema = z.object({
  resourceType: z.enum(["cpu", "memory", "disk", "network", "gpu"]),
  utilization: z.number().min(0).max(100),
  total: z.number().int().min(0).optional(),
  used: z.number().int().min(0).optional(),
  available: z.number().int().min(0).optional(),
  timestamp: z.string().datetime(),
  host: z.string().max(255).optional(),
  container: z.string().max(255).optional(),
  warningThreshold: z.number().min(0).max(100).optional(),
  criticalThreshold: z.number().min(0).max(100).optional(),
});

// ============================================================
// AI Alerting
// ============================================================

export const alertSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  severity: z.enum(["info", "warning", "critical"]),
  source: z.string().min(1).max(255),
  condition: z.object({
    metric: z.string().min(1).max(255),
    operator: z.enum(["gt", "lt", "gte", "lte", "eq", "neq"]),
    threshold: z.number(),
    duration: z.number().int().min(0).max(3600).optional(),
  }),
  channels: z.array(z.enum(["email", "slack", "pagerduty", "webhook", "sms"])).min(1),
  recipients: z.array(z.string().max(255)).min(1),
  cooldown: z.number().int().min(60).max(86400).default(3600),
  enabled: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const alertEscalationSchema = z.object({
  alertId: z.string().uuid(),
  level: z.number().int().min(1).max(10),
  recipients: z.array(z.string().min(1).max(255)).min(1),
  delay: z.number().int().min(60).max(86400),
  channels: z.array(z.enum(["email", "slack", "pagerduty", "webhook", "sms"])).min(1),
  autoAcknowledge: z.boolean().default(false),
  requireAcknowledge: z.boolean().default(true),
  acknowledgeTimeout: z.number().int().min(60).max(86400).optional(),
});

export const alertTemplateSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  severity: z.enum(["info", "warning", "critical"]),
  subject: z.string().min(1).max(255),
  body: z.string().min(1).max(5000),
  variables: z.array(z.object({
    name: z.string().min(1).max(100),
    type: z.enum(["string", "number", "boolean"]),
    required: z.boolean().default(true),
    defaultValue: z.string().optional(),
  })).optional(),
  channels: z.array(z.enum(["email", "slack", "pagerduty", "webhook", "sms"])).min(1),
  isActive: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
});

export const alertSuppressionSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  matchRules: z.array(z.object({
    field: z.enum(["name", "source", "severity", "tag"]),
    operator: z.enum(["eq", "neq", "contains", "regex"]),
    value: z.string(),
  })).min(1),
  duration: z.number().int().min(60).max(604800),
  schedule: z.string().max(100).optional(),
  notifySuppressed: z.boolean().default(false),
  enabled: z.boolean().default(true),
});

// ============================================================
// AI Health Check
// ============================================================

export const healthCheckEndpointSchema = z.object({
  name: z.string().min(1).max(255),
  path: z.string().min(1).max(500),
  method: z.enum(["GET", "POST"]).default("GET"),
  expectedStatus: z.number().int().min(100).max(599).default(200),
  timeout: z.number().int().min(1000).max(60000).default(5000),
  interval: z.number().int().min(1000).max(86400000).default(30000),
  retries: z.number().int().min(0).max(10).default(3),
  headers: z.record(z.string(), z.string()).optional(),
  authentication: z.object({
    type: z.enum(["none", "bearer", "basic", "api_key"]),
    token: z.string().max(255).optional(),
    username: z.string().max(255).optional(),
    password: z.string().max(255).optional(),
    apiKeyHeader: z.string().max(255).optional(),
    apiKeyValue: z.string().max(255).optional(),
  }).optional(),
  enabled: z.boolean().default(true),
});

export const componentCheckSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(["database", "cache", "queue", "storage", "external_api", "custom"]),
  checkFn: z.string().max(255).optional(),
  timeout: z.number().int().min(1000).max(60000).default(10000),
  critical: z.boolean().default(true),
  config: z.record(z.string(), z.unknown()).optional(),
  recoverySuggestions: z.array(z.string().max(500)).optional(),
});

export const deepCheckSchema = z.object({
  service: z.string().min(1).max(255),
  checks: z.array(z.object({
    name: z.string().min(1).max(255),
    type: z.enum(["connectivity", "latency", "data_integrity", "capacity", "security"]),
    config: z.record(z.string(), z.unknown()).optional(),
  })).min(1),
  parallel: z.boolean().default(false),
  timeout: z.number().int().min(1000).max(120000).default(30000),
  includeDetails: z.boolean().default(true),
});

export const readinessSchema = z.object({
  service: z.string().min(1).max(255),
  version: z.string().min(1).max(50),
  dependencies: z.array(z.string().min(1).max(255)).min(1),
  minInstances: z.number().int().min(1).max(100).default(1),
  startupTimeout: z.number().int().min(1000).max(300000).default(30000),
  warmupRequired: z.boolean().default(false),
  warmupTimeout: z.number().int().min(1000).max(300000).optional(),
});

export const livenessSchema = z.object({
  service: z.string().min(1).max(255),
  path: z.string().min(1).max(500).default("/healthz"),
  interval: z.number().int().min(1000).max(60000).default(10000),
  timeout: z.number().int().min(1000).max(30000).default(5000),
  failureThreshold: z.number().int().min(1).max(10).default(3),
  successThreshold: z.number().int().min(1).max(10).default(1),
  restartOnFailure: z.boolean().default(true),
});

// ============================================================
// AI Load Balancing
// ============================================================

export const loadBalancerSchema = z.object({
  name: z.string().min(1).max(255),
  algorithm: z.enum(["round_robin", "least_connections", "ip_hash", "random", "weighted"]),
  healthCheck: z.object({
    path: z.string().min(1).max(500).default("/health"),
    interval: z.number().int().min(1000).max(60000).default(30000),
    timeout: z.number().int().min(1000).max(30000).default(5000),
    healthyThreshold: z.number().int().min(1).max(10).default(2),
    unhealthyThreshold: z.number().int().min(1).max(10).default(3),
  }).optional(),
  backends: z.array(z.object({
    host: z.string().min(1).max(255),
    port: z.number().int().min(1).max(65535),
    weight: z.number().int().min(1).max(100).default(1),
    maxConnections: z.number().int().min(1).max(100000).optional(),
    drainTimeout: z.number().int().min(0).max(300000).default(30000),
  })).min(1),
  stickySession: z.boolean().default(false),
  sessionCookie: z.string().max(255).optional(),
  sessionTimeout: z.number().int().min(60).max(86400).default(3600),
  enabled: z.boolean().default(true),
});

export const stickySessionSchema = z.object({
  name: z.string().min(1).max(255),
  method: z.enum(["cookie", "ip", "header", "session_id"]),
  cookieName: z.string().max(255).optional(),
  cookieDuration: z.number().int().min(60).max(604800).default(86400),
  cookieSecure: z.boolean().default(true),
  cookieHttpOnly: z.boolean().default(true),
  cookieSameSite: z.enum(["strict", "lax", "none"]).default("lax"),
  headerName: z.string().max(255).optional(),
  fallback: z.enum(["none", "round_robin", "least_connections"]).default("round_robin"),
  enabled: z.boolean().default(true),
});

export const lbCircuitBreakerSchema = z.object({
  name: z.string().min(1).max(255),
  failureThreshold: z.number().int().min(1).max(100).default(5),
  successThreshold: z.number().int().min(1).max(100).default(3),
  timeout: z.number().int().min(1000).max(60000).default(30000),
  halfOpenRequests: z.number().int().min(1).max(100).default(5),
  monitorInterval: z.number().int().min(1000).max(60000).default(10000),
  fallbackResponse: z.object({
    statusCode: z.number().int().min(200).max(599).default(503),
    body: z.string().max(10000).optional(),
    headers: z.record(z.string(), z.string()).optional(),
  }).optional(),
  enabled: z.boolean().default(true),
});

// ============================================================
// AI Scaling
// ============================================================

export const scalingConfigSchema = z.object({
  service: z.string().min(1).max(255),
  minInstances: z.number().int().min(1).max(100).default(1),
  maxInstances: z.number().int().min(1).max(1000).default(10),
  targetCpuUtilization: z.number().min(10).max(90).default(70),
  targetMemoryUtilization: z.number().min(10).max(90).default(80),
  scaleUpCooldown: z.number().int().min(60).max(3600).default(300),
  scaleDownCooldown: z.number().int().min(60).max(3600).default(600),
  metrics: z.array(z.enum(["cpu", "memory", "requests", "latency", "queue_depth", "custom"])).default(["cpu", "memory"]),
  customMetrics: z.array(z.object({
    name: z.string().min(1).max(255),
    target: z.number(),
    type: z.enum(["average", "sum", "max"]),
  })).optional(),
  enabled: z.boolean().default(true),
});

export const predictiveScalingSchema = z.object({
  service: z.string().min(1).max(255),
  forecastHorizon: z.number().int().min(3600).max(86400).default(3600),
  confidenceThreshold: z.number().min(0).max(1).default(0.8),
  seasonalityPeriod: z.enum(["hourly", "daily", "weekly", "monthly"]),
  modelType: z.enum(["linear", "arima", "prophet", "lstm"]).default("prophet"),
  trainingWindow: z.number().int().min(86400).max(7776000).default(2592000),
  cooldown: z.number().int().min(60).max(3600).default(300),
  minInstances: z.number().int().min(1).max(100).default(1),
  maxInstances: z.number().int().min(1).max(1000).default(10),
  enabled: z.boolean().default(true),
});

export const scheduledScalingSchema = z.object({
  service: z.string().min(1).max(255),
  schedule: z.array(z.object({
    cron: z.string().min(1).max(100),
    timezone: z.string().max(50).default("UTC"),
    instances: z.number().int().min(1).max(1000),
    duration: z.number().int().min(300).max(86400).optional(),
  })).min(1),
  enabled: z.boolean().default(true),
  description: z.string().max(500).optional(),
});

export const metricScalingSchema = z.object({
  service: z.string().min(1).max(255),
  metrics: z.array(z.object({
    name: z.string().min(1).max(255),
    type: z.enum(["gauge", "counter", "histogram"]),
    target: z.number(),
    operator: z.enum(["gt", "lt", "gte", "lte"]),
    weight: z.number().min(0).max(1).default(1),
  })).min(1),
  aggregation: z.enum(["avg", "sum", "max", "min", "p90", "p99"]).default("avg"),
  evaluationPeriod: z.number().int().min(10).max(300).default(60),
  breachDuration: z.number().int().min(30).max(600).default(120),
  cooldown: z.number().int().min(60).max(3600).default(300),
  minInstances: z.number().int().min(1).max(100).default(1),
  maxInstances: z.number().int().min(1).max(1000).default(10),
  enabled: z.boolean().default(true),
});

// ============================================================
// AI Security
// ============================================================

export const authenticationSchema = z.object({
  method: z.enum(["password", "magic_link", "social", "saml", "certificate", "biometric"]),
  provider: z.string().max(255).optional(),
  clientId: z.string().max(255).optional(),
  redirectUri: z.string().url().optional(),
  scopes: z.array(z.string().max(100)).optional(),
  state: z.string().max(255).optional(),
  codeChallenge: z.string().max(255).optional(),
  codeChallengeMethod: z.enum(["S256", "plain"]).optional(),
  rememberDevice: z.boolean().default(false),
  sessionDuration: z.number().int().min(300).max(2592000).default(86400),
});

export const authorizationSchema = z.object({
  userId: z.string().uuid(),
  resource: z.string().min(1).max(255),
  action: z.string().min(1).max(255),
  context: z.record(z.string(), z.unknown()).optional(),
  checkOwnership: z.boolean().default(true),
  requireMfa: z.boolean().default(false),
 ipRestriction: z.array(z.string()).optional(),
});

export const csrfSchema = z.object({
  token: z.string().min(32).max(256),
  secret: z.string().min(32).max(256).optional(),
  cookieName: z.string().max(255).default("csrf_token"),
  headerName: z.string().max(255).default("x-csrf-token"),
  sameSite: z.enum(["strict", "lax", "none"]).default("lax"),
  secure: z.boolean().default(true),
  httpOnly: z.boolean().default(true),
  ttl: z.number().int().min(300).max(86400).default(3600),
  ignoreMethods: z.array(z.enum(["GET", "HEAD", "OPTIONS"])).default(["GET", "HEAD", "OPTIONS"]),
});

export const cspSchema = z.object({
  directives: z.object({
    defaultSrc: z.array(z.string()).optional(),
    scriptSrc: z.array(z.string()).optional(),
    styleSrc: z.array(z.string()).optional(),
    imgSrc: z.array(z.string()).optional(),
    fontSrc: z.array(z.string()).optional(),
    connectSrc: z.array(z.string()).optional(),
    frameSrc: z.array(z.string()).optional(),
    objectSrc: z.array(z.string()).optional(),
    mediaSrc: z.array(z.string()).optional(),
    childSrc: z.array(z.string()).optional(),
    formAction: z.array(z.string()).optional(),
    frameAncestors: z.array(z.string()).optional(),
    baseUri: z.array(z.string()).optional(),
    upgradeInsecureRequests: z.boolean().optional(),
  }),
  reportOnly: z.boolean().default(false),
  reportUri: z.string().url().optional(),
});

export const passwordPolicySchema = z.object({
  minLength: z.number().int().min(8).max(128).default(12),
  maxLength: z.number().int().min(32).max(1024).default(128),
  requireUppercase: z.boolean().default(true),
  requireLowercase: z.boolean().default(true),
  requireNumbers: z.boolean().default(true),
  requireSpecialChars: z.boolean().default(true),
  allowedSpecialChars: z.string().max(50).default("!@#$%^&*()_+-=[]{}|;:,.<>?"),
  maxConsecutiveChars: z.number().int().min(2).max(10).default(3),
  preventReuse: z.number().int().min(0).max(24).default(5),
  maxAge: z.number().int().min(0).max(365).default(90),
  lockoutAttempts: z.number().int().min(3).max(100).default(5),
  lockoutDuration: z.number().int().min(300).max(86400).default(1800),
});

export const twoFactorSchema = z.object({
  userId: z.string().uuid(),
  method: z.enum(["totp", "sms", "email", "hardware_key", "backup_codes"]),
  secret: z.string().optional(),
  phoneNumber: z.string().min(10).max(20).optional(),
  email: z.string().email().optional(),
  backupCodes: z.array(z.string().min(8).max(12)).optional(),
  trustedDevices: z.array(z.object({
    deviceId: z.string().max(255),
    name: z.string().max(255),
    lastUsed: z.string().datetime(),
    expiresAt: z.string().datetime(),
  })).optional(),
  enabled: z.boolean().default(true),
});

export const accountLockoutSchema = z.object({
  userId: z.string().uuid(),
  reason: z.enum(["failed_password", "failed_2fa", "suspicious_activity", "admin_action"]),
  failedAttempts: z.number().int().min(0),
  lockoutDuration: z.number().int().min(300).max(604800),
  unlockAt: z.string().datetime(),
  notifyUser: z.boolean().default(true),
  notifyAdmin: z.boolean().default(false),
  requirePasswordReset: z.boolean().default(false),
  ipAddresses: z.array(z.string()).optional(),
});

export const captchaSchema = z.object({
  provider: z.enum(["recaptcha", "hcaptcha", "turnstile", "custom"]),
  siteKey: z.string().min(1).max(255),
  secretKey: z.string().min(1).max(255),
  action: z.string().max(255).optional(),
  scoreThreshold: z.number().min(0).max(1).optional(),
  timeout: z.number().int().min(1000).max(60000).default(10000),
  enabled: z.boolean().default(true),
});

// ============================================================
// AI Encryption
// ============================================================

export const encryptionConfigSchema = z.object({
  algorithm: z.enum(["AES-256-GCM", "AES-256-CBC", "ChaCha20-Poly1305", "RSA-OAEP"]),
  keySize: z.number().int().min(128).max(4096).default(256),
  mode: z.enum(["gcm", "cbc", "ctr", "stream"]).default("gcm"),
  padding: z.enum(["pkcs7", "oaep", "none"]).default("pkcs7"),
  ivSize: z.number().int().min(64).max(256).default(128),
  tagSize: z.number().int().min(64).max(128).default(128),
  keyRotationEnabled: z.boolean().default(false),
  keyRotationIntervalDays: z.number().int().min(1).max(365).default(90),
  compressionBeforeEncryption: z.boolean().default(false),
  enabled: z.boolean().default(true),
});

export const fieldEncryptionSchema = z.object({
  tableName: z.string().min(1).max(255),
  fields: z.array(z.object({
    name: z.string().min(1).max(255),
    algorithm: z.enum(["AES-256-GCM", "AES-256-CBC", "ChaCha20-Poly1305"]).optional(),
    searchable: z.boolean().default(false),
    nullable: z.boolean().default(true),
  })).min(1),
  keyId: z.string().uuid().optional(),
  compressionEnabled: z.boolean().default(false),
  versioningEnabled: z.boolean().default(true),
  enabled: z.boolean().default(true),
});

export const certificateSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(["self_signed", "ca_signed", "let_encrypt", "wildcard", "san"]),
  domain: z.string().min(1).max(255),
  sanDomains: z.array(z.string().max(255)).optional(),
  organization: z.string().max(255).optional(),
  validFrom: z.string().datetime(),
  validTo: z.string().datetime(),
  issuer: z.string().max(255).optional(),
  serialNumber: z.string().max(255).optional(),
  autoRenew: z.boolean().default(false),
  renewalDaysBefore: z.number().int().min(1).max(365).default(30),
  notifications: z.array(z.enum(["email", "webhook", "slack"])).default(["email"]),
  enabled: z.boolean().default(true),
});

// ============================================================
// AI Authorization
// ============================================================

export const rbacSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  roles: z.array(z.object({
    name: z.string().min(1).max(255),
    description: z.string().max(500).optional(),
    permissions: z.array(z.string().min(1).max(255)).min(1),
    inherits: z.array(z.string().max(255)).optional(),
    isSystem: z.boolean().default(false),
  })).min(1),
  assignments: z.array(z.object({
    userId: z.string().uuid(),
    roles: z.array(z.string().min(1).max(255)).min(1),
    scope: z.record(z.string(), z.unknown()).optional(),
    expiresAt: z.string().datetime().optional(),
  })).optional(),
  policies: z.array(z.object({
    name: z.string().min(1).max(255),
    effect: z.enum(["allow", "deny"]),
    resources: z.array(z.string().min(1).max(255)).min(1),
    actions: z.array(z.string().min(1).max(255)).min(1),
    conditions: z.record(z.string(), z.unknown()).optional(),
  })).optional(),
});

export const permissionSchema = z.object({
  resource: z.string().min(1).max(255),
  action: z.enum(["create", "read", "update", "delete", "list", "export", "import", "manage"]),
  scope: z.enum(["own", "team", "department", "organization", "global"]).default("own"),
  conditions: z.array(z.object({
    field: z.string().min(1).max(255),
    operator: z.enum(["eq", "neq", "gt", "lt", "in", "contains"]),
    value: z.unknown(),
  })).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const rolePermissionMatrixSchema = z.object({
  roles: z.array(z.string().min(1).max(255)).min(1),
  resources: z.array(z.string().min(1).max(255)).min(1),
  matrix: z.record(z.string(), z.record(z.string(), z.array(z.enum(["create", "read", "update", "delete", "list", "export"])))),
  inheritedRoles: z.record(z.string(), z.array(z.string().max(255))).optional(),
});

export const policySchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  effect: z.enum(["allow", "deny"]),
  principals: z.array(z.object({
    type: z.enum(["user", "role", "group", "service"]),
    value: z.string().min(1).max(255),
  })).min(1),
  resources: z.array(z.string().min(1).max(255)).min(1),
  actions: z.array(z.string().min(1).max(255)).min(1),
  conditions: z.array(z.object({
    type: z.enum(["string_equals", "numeric_equals", "bool", "date", "ip", "custom"]),
    key: z.string().min(1).max(255),
    value: z.unknown(),
    operator: z.enum(["eq", "neq", "gt", "lt", "gte", "lte", "in", "not_in"]).optional(),
  })).optional(),
  priority: z.number().int().min(0).max(1000).default(0),
  enabled: z.boolean().default(true),
  expiresAt: z.string().datetime().optional(),
});

export const contextAuthorizationSchema = z.object({
  userId: z.string().uuid(),
  resource: z.string().min(1).max(255),
  action: z.string().min(1).max(255),
  context: z.object({
    resourceId: z.string().uuid().optional(),
    ownership: z.boolean().optional(),
    teamId: z.string().uuid().optional(),
    departmentId: z.string().uuid().optional(),
    organizationId: z.string().uuid().optional(),
    ipAddress: z.string().optional(),
    userAgent: z.string().max(500).optional(),
    timestamp: z.string().datetime().optional(),
    sessionId: z.string().uuid().optional(),
  }).optional(),
  bypassCache: z.boolean().default(false),
  auditLog: z.boolean().default(true),
});

// ============================================================
// AI Audit
// ============================================================

export const auditEventSchema = z.object({
  id: z.string().uuid().optional(),
  timestamp: z.string().datetime(),
  actor: z.object({
    id: z.string().uuid(),
    type: z.enum(["user", "system", "api", "service"]),
    name: z.string().max(255).optional(),
    email: z.string().email().optional(),
  }),
  action: z.string().min(1).max(255),
  resource: z.object({
    type: z.string().min(1).max(255),
    id: z.string().max(255).optional(),
    name: z.string().max(255).optional(),
    parentId: z.string().uuid().optional(),
  }),
  outcome: z.enum(["success", "failure", "partial", "denied"]),
  details: z.record(z.string(), z.unknown()).optional(),
  context: z.object({
    ipAddress: z.string().optional(),
    userAgent: z.string().max(500).optional(),
    requestId: z.string().uuid().optional(),
    sessionId: z.string().uuid().optional(),
    location: z.string().max(255).optional(),
  }).optional(),
  tags: z.array(z.string().max(100)).optional(),
});

export const auditQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  actorId: z.string().uuid().optional(),
  actorType: z.enum(["user", "system", "api", "service"]).optional(),
  action: z.string().max(255).optional(),
  resourceType: z.string().max(255).optional(),
  resourceId: z.string().max(255).optional(),
  outcome: z.enum(["success", "failure", "partial", "denied"]).optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z.enum(["timestamp", "action", "resourceType"]).default("timestamp"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().max(255).optional(),
});

export const auditReportSchema = z.object({
  title: z.string().min(1).max(255),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  reportType: z.enum(["summary", "detailed", "compliance", "security", "access"]),
  filters: z.object({
    actorTypes: z.array(z.enum(["user", "system", "api", "service"])).optional(),
    actions: z.array(z.string().max(255)).optional(),
    resourceTypes: z.array(z.string().max(255)).optional(),
    outcomes: z.array(z.enum(["success", "failure", "partial", "denied"])).optional(),
  }).optional(),
  groupBy: z.array(z.enum(["actor", "action", "resource", "outcome", "hour", "day"])).optional(),
  includeCharts: z.boolean().default(true),
  includeRecommendations: z.boolean().default(false),
  format: z.enum(["html", "pdf", "csv", "json"]).default("html"),
  recipients: z.array(z.string().email()).optional(),
});

export const complianceSchema = z.object({
  name: z.string().min(1).max(255),
  framework: z.enum(["gdpr", "ccpa", "hipaa", "sox", "ferpa", "coppa", "custom"]),
  requirements: z.array(z.object({
    id: z.string().min(1).max(100),
    description: z.string().min(1).max(1000),
    category: z.string().max(255).optional(),
    status: z.enum(["compliant", "non_compliant", "partial", "not_applicable"]),
    evidence: z.array(z.string().max(500)).optional(),
    remediation: z.string().max(1000).optional(),
    dueDate: z.string().datetime().optional(),
  })).min(1),
  auditDate: z.string().datetime(),
  nextAuditDate: z.string().datetime().optional(),
  responsibleParty: z.string().max(255).optional(),
  notes: z.string().max(5000).optional(),
});

// ============================================================
// AI Compliance
// ============================================================

export const complianceCheckSchema = z.object({
  framework: z.enum(["gdpr", "ccpa", "hipaa", "sox", "ferpa", "coppa", "custom"]),
  scope: z.enum(["full", "partial", "targeted"]),
  resources: z.array(z.string().max(255)).optional(),
  checks: z.array(z.enum([
    "data_encryption", "access_control", "audit_logging", "data_retention",
    "consent_management", "data_minimization", "right_to_erasure",
    "breach_notification", "privacy_policy", "cookie_consent",
  ])).min(1),
  includeRemediation: z.boolean().default(true),
  generateReport: z.boolean().default(true),
  reportFormat: z.enum(["html", "pdf", "json"]).default("html"),
});

export const consentManagementSchema = z.object({
  userId: z.string().uuid().optional(),
  consentType: z.enum([
    "terms_of_service", "privacy_policy", "marketing",
    "analytics", "third_party_sharing", "ai_training",
    "data_collection", "cookies", "location",
  ]),
  granted: z.boolean(),
  version: z.string().min(1).max(50),
  timestamp: z.string().datetime(),
  source: z.enum(["web", "mobile", "api", "email", "paper"]).default("web"),
  ipAddress: z.string().optional(),
  userAgent: z.string().max(500).optional(),
  granularConsents: z.record(z.string(), z.boolean()).optional(),
  expiresAt: z.string().datetime().optional(),
  withdrawable: z.boolean().default(true),
  parentIdConsent: z.string().uuid().optional(),
});

export const dataProtectionSchema = z.object({
  dataCategory: z.enum(["personal", "sensitive", "financial", "health", "children", "biometric", "public"]),
  processingBasis: z.enum(["consent", "contract", "legal_obligation", "vital_interests", "public_task", "legitimate_interest"]),
  dataSubjects: z.array(z.enum(["students", "teachers", "parents", "staff", "visitors", "minors"])),
  retentionPeriod: z.number().int().min(1).max(3650),
  retentionUnit: z.enum(["days", "months", "years"]).default("days"),
  encryptionRequired: z.boolean().default(true),
  anonymizationRequired: z.boolean().default(false),
  accessControls: z.array(z.enum(["role_based", "need_to_know", "time_limited", "location_based"])),
  transferRestrictions: z.array(z.enum(["no_transfer", "adequate_countries", "safeguards_required", "consent_required"])).optional(),
  dpoRequired: z.boolean().default(false),
  dpiaRequired: z.boolean().default(false),
});

export const breachNotificationSchema = z.object({
  incidentId: z.string().uuid(),
  severity: z.enum(["low", "medium", "high", "critical"]),
  dataCategory: z.array(z.enum(["personal", "sensitive", "financial", "health", "children"])).min(1),
  affectedCount: z.number().int().min(1),
  discoveryDate: z.string().datetime(),
  containmentDate: z.string().datetime().optional(),
  description: z.string().min(1).max(5000),
  cause: z.string().max(2000).optional(),
  dataFields: z.array(z.string().max(255)).optional(),
  notificationRequired: z.object({
    supervisoryAuthority: z.boolean().default(true),
    dataSubjects: z.boolean().default(true),
    lawEnforcement: z.boolean().default(false),
    media: z.boolean().default(false),
  }),
  notificationDeadline: z.string().datetime(),
  remediationSteps: z.array(z.string().max(500)).optional(),
  contacts: z.array(z.object({
    name: z.string().min(1).max(255),
    role: z.string().max(255),
    email: z.string().email(),
    phone: z.string().max(20).optional(),
  })).min(1),
});

export const piaSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  processingActivity: z.string().min(1).max(500),
  dataController: z.string().min(1).max(255),
  dataProcessor: z.string().max(255).optional(),
  legalBasis: z.enum(["consent", "contract", "legal_obligation", "vital_interests", "public_task", "legitimate_interest"]),
  dataCategories: z.array(z.enum(["personal", "sensitive", "financial", "health", "children", "biometric"])).min(1),
  dataSubjects: z.array(z.enum(["students", "teachers", "parents", "staff", "visitors", "minors"])).min(1),
  purposes: z.array(z.string().min(1).max(500)).min(1),
  risks: z.array(z.object({
    description: z.string().min(1).max(1000),
    likelihood: z.enum(["low", "medium", "high"]),
    impact: z.enum(["low", "medium", "high"]),
    mitigation: z.string().min(1).max(1000),
  })).min(1),
  reviewDate: z.string().datetime(),
  approvedBy: z.string().max(255).optional(),
});

// ============================================================
// AI Privacy
// ============================================================

export const dataClassificationSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  level: z.enum(["public", "internal", "confidential", "secret", "top_secret"]),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  handlingRequirements: z.object({
    encryptionRequired: z.boolean().default(true),
    accessLogging: z.boolean().default(true),
    retentionDays: z.number().int().min(1).max(3650).optional(),
    transferRestrictions: z.array(z.enum(["no_external", "encrypted_only", "signed_only", "no_transfer"])).optional(),
    disposalMethod: z.enum(["secure_delete", "crypto_shred", "physical_destroy", "anonymize"]).optional(),
  }),
  complianceFrameworks: z.array(z.enum(["gdpr", "ccpa", "hipaa", "ferpa", "coppa"])).optional(),
  label: z.string().min(1).max(100),
  examples: z.array(z.string().max(255)).optional(),
});

export const privacyConfigSchema = z.object({
  dataMinimization: z.boolean().default(true),
  purposeLimitation: z.boolean().default(true),
  storageMinimization: z.boolean().default(true),
  anonymization: z.object({
    enabled: z.boolean().default(false),
    method: z.enum(["k_anonymity", "l_diversity", "t_closeness", "differential_privacy", "pseudonymization"]).optional(),
    kValue: z.number().int().min(2).max(100).optional(),
    epsilon: z.number().min(0).max(10).optional(),
  }).optional(),
  rightToErasure: z.object({
    enabled: z.boolean().default(true),
    retentionAfterRequest: z.number().int().min(0).max(365).default(30),
    notifyDownstream: z.boolean().default(true),
  }).optional(),
  dataPortability: z.object({
    enabled: z.boolean().default(true),
    formats: z.array(z.enum(["json", "csv", "xml", "pdf"])).default(["json"]),
    includeMetadata: z.boolean().default(true),
  }).optional(),
  consentManagement: z.object({
    required: z.boolean().default(true),
    granular: z.boolean().default(true),
    withdrawable: z.boolean().default(true),
    renewalPeriodDays: z.number().int().min(30).max(365).optional(),
  }).optional(),
});

export const dataTransferSchema = z.object({
  sourceRegion: z.string().min(2).max(10),
  destinationRegion: z.string().min(2).max(10),
  transferType: z.enum(["intra_org", "third_party", "cross_border"]),
  legalBasis: z.enum(["adequacy_decision", "standard_contractual_clauses", "binding_corporate_rules", "consent", "derogation"]),
  dataCategories: z.array(z.enum(["personal", "sensitive", "financial", "health", "children"])).min(1),
  safeguards: z.array(z.enum(["encryption", "pseudonymization", "contractual", "certification"])).optional(),
  dataSubjectCount: z.number().int().min(1).optional(),
  retentionPeriod: z.number().int().min(1).max(3650).optional(),
  purpose: z.string().min(1).max(500),
  notificationRequired: z.boolean().default(false),
});

export const privacyByDesignSchema = z.object({
  projectName: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  dataFlows: z.array(z.object({
    name: z.string().min(1).max(255),
    source: z.string().min(1).max(255),
    destination: z.string().min(1).max(255),
    dataCategories: z.array(z.string().max(100)).min(1),
    legalBasis: z.string().max(255),
    safeguards: z.array(z.string().max(255)).optional(),
  })).min(1),
  privacyRisks: z.array(z.object({
    description: z.string().min(1).max(1000),
    likelihood: z.enum(["low", "medium", "high"]),
    impact: z.enum(["low", "medium", "high"]),
    mitigation: z.string().min(1).max(1000),
    residualRisk: z.enum(["low", "medium", "high"]),
  })).min(1),
  reviewDate: z.string().datetime(),
  approvedBy: z.string().max(255).optional(),
});

// ============================================================
// AI Data Retention
// ============================================================

export const retentionPolicySchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  dataCategories: z.array(z.enum(["personal", "sensitive", "financial", "health", "children", "biometric", "public", "operational"])).min(1),
  retentionPeriod: z.number().int().min(1),
  retentionUnit: z.enum(["days", "months", "years"]),
  deletionMethod: z.enum(["secure_delete", "crypto_shred", "anonymize", "physical_destroy"]),
  legalBasis: z.string().min(1).max(255),
  archiveBeforeDeletion: z.boolean().default(false),
  archiveRetentionPeriod: z.number().int().min(1).optional(),
  notifyBeforeDeletion: z.boolean().default(true),
  notificationDays: z.number().int().min(1).max(365).default(30),
  exceptions: z.array(z.object({
    condition: z.string().min(1).max(500),
    extendedRetention: z.number().int().min(1).max(3650).optional(),
    reason: z.string().min(1).max(500),
  })).optional(),
  enabled: z.boolean().default(true),
});

export const deletionSchema = z.object({
  policyId: z.string().uuid().optional(),
  dataType: z.array(z.enum(["personal", "sensitive", "operational", "all"])).min(1),
  scope: z.enum(["user", "record", "table", "database", "all"]),
  targetId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  reason: z.enum(["retention_expired", "user_request", "legal_hold_expired", "consent_withdrawn", "other"]),
  method: z.enum(["secure_delete", "crypto_shred", "anonymize"]),
  verifyDeletion: z.boolean().default(true),
  notifyAffectedUsers: z.boolean().default(false),
  auditLog: z.boolean().default(true),
  backupExclusion: z.boolean().default(false),
});

export const archivalSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  sourceData: z.object({
    categories: z.array(z.enum(["personal", "sensitive", "operational", "all"])).min(1),
    dateRange: z.object({
      start: z.string().datetime(),
      end: z.string().datetime(),
    }).optional(),
    filters: z.record(z.string(), z.unknown()).optional(),
  }),
  destination: z.object({
    type: z.enum(["cold_storage", "tape", "cloud_archive", "offline"]),
    location: z.string().min(1).max(500),
    encryption: z.boolean().default(true),
    compression: z.boolean().default(true),
    format: z.enum(["json", "csv", "parquet", "avro"]).default("json"),
  }),
  retention: z.object({
    period: z.number().int().min(1),
    unit: z.enum(["months", "years"]),
    autoDelete: z.boolean().default(false),
  }),
  indexFields: z.array(z.string().max(255)).optional(),
  enabled: z.boolean().default(true),
});

export const legalHoldSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(2000),
  caseReference: z.string().max(255).optional(),
  custodian: z.string().min(1).max(255),
  legalCounsel: z.string().max(255).optional(),
  dataScope: z.object({
    categories: z.array(z.enum(["personal", "sensitive", "financial", "operational", "all"])).min(1),
    dateRange: z.object({
      start: z.string().datetime(),
      end: z.string().datetime(),
    }).optional(),
    custodians: z.array(z.string().max(255)).optional(),
    keywords: z.array(z.string().max(255)).optional(),
    fileTypes: z.array(z.string().max(50)).optional(),
  }),
  preservationActions: z.array(z.enum(["preserve", "snapshot", "lock", "flag"])),
  notifyCustodians: z.boolean().default(true),
  reviewSchedule: z.enum(["weekly", "monthly", "quarterly"]).default("monthly"),
  estimatedDuration: z.number().int().min(1).max(3650).optional(),
  status: z.enum(["active", "released", "expired"]).default("active"),
  releasedAt: z.string().datetime().optional(),
  releasedBy: z.string().max(255).optional(),
  releaseReason: z.string().max(1000).optional(),
});

// ============================================================
// AI Mobile
// ============================================================

export const mobileConfigSchema = z.object({
  platform: z.enum(["ios", "android", "both"]),
  pushProvider: z.enum(["fcm", "apns", "firebase", "onesignal", "custom"]),
  deepLinking: z.object({
    enabled: z.boolean().default(true),
    scheme: z.string().max(100).default("educi"),
    domains: z.array(z.string().max(255)).optional(),
  }).optional(),
  biometric: z.object({
    enabled: z.boolean().default(false),
    types: z.array(z.enum(["fingerprint", "face_id", "iris", "voice"])).optional(),
    fallbackToPin: z.boolean().default(true),
    maxAttempts: z.number().int().min(1).max(10).default(3),
  }).optional(),
  offline: z.object({
    enabled: z.boolean().default(false),
    syncInterval: z.number().int().min(60).max(86400).default(300),
    maxCacheSize: z.number().int().min(1048576).max(1073741824).default(52428800),
  }).optional(),
  security: z.object({
    certificatePinning: z.boolean().default(false),
    jailbreakDetection: z.boolean().default(true),
    screenshotBlocking: z.boolean().default(false),
    clipboardBlocking: z.boolean().default(false),
  }).optional(),
});

export const pushNotificationSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1).max(255),
  body: z.string().min(1).max(1000),
  icon: z.string().max(255).optional(),
  image: z.string().url().optional(),
  badge: z.number().int().min(0).optional(),
  sound: z.string().max(255).optional(),
  data: z.record(z.string(), z.unknown()).optional(),
  actions: z.array(z.object({
    id: z.string().max(100),
    title: z.string().min(1).max(100),
    icon: z.string().max(255).optional(),
    destructive: z.boolean().default(false),
    authenticationRequired: z.boolean().default(false),
  })).optional(),
  collapseKey: z.string().max(255).optional(),
  ttl: z.number().int().min(0).max(604800).default(86400),
  priority: z.enum(["normal", "high"]).default("normal"),
  channels: z.array(z.enum(["default", "urgent", "social", "updates"])).default(["default"]),
});

export const biometricAuthSchema = z.object({
  userId: z.string().uuid(),
  action: z.enum(["enroll", "verify", "remove"]),
  biometricType: z.enum(["fingerprint", "face_id", "iris", "voice"]),
  deviceInfo: z.object({
    platform: z.enum(["ios", "android"]),
    model: z.string().max(255).optional(),
    osVersion: z.string().max(50).optional(),
    biometricHardware: z.boolean().default(true),
    secureEnclave: z.boolean().optional(),
  }).optional(),
  fallbackToPin: z.boolean().default(true),
  maxAttempts: z.number().int().min(1).max(10).default(3),
  lockoutDuration: z.number().int().min(60).max(86400).default(300),
});

export const deviceManagementSchema = z.object({
  userId: z.string().uuid(),
  action: z.enum(["register", "update", "remove", "revoke", "list"]),
  deviceId: z.string().max(255).optional(),
  deviceInfo: z.object({
    platform: z.enum(["ios", "android", "web"]),
    model: z.string().max(255).optional(),
    osVersion: z.string().max(50).optional(),
    appVersion: z.string().max(50).optional(),
    pushToken: z.string().max(500).optional(),
  }).optional(),
  trusted: z.boolean().default(false),
  lastActiveAt: z.string().datetime().optional(),
  revokeAllSessions: z.boolean().default(false),
  notifyUser: z.boolean().default(true),
});

export const deepLinkSchema = z.object({
  url: z.string().url(),
  platform: z.enum(["ios", "android", "web", "all"]),
  route: z.string().min(1).max(500),
  params: z.record(z.string(), z.unknown()).optional(),
  expiresAt: z.string().datetime().optional(),
  oneTimeUse: z.boolean().default(false),
  fallbackUrl: z.string().url().optional(),
  campaignId: z.string().max(255).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// ============================================================
// AI Offline
// ============================================================

export const offlineConfigSchema = z.object({
  enabled: z.boolean().default(false),
  syncInterval: z.number().int().min(60).max(86400).default(300),
  maxCacheSize: z.number().int().min(1048576).max(1073741824).default(52428800),
  cacheStrategy: z.enum(["cache_first", "network_first", "cache_only", "network_only"]).default("cache_first"),
  retryOnReconnect: z.boolean().default(true),
  maxRetries: z.number().int().min(0).max(10).default(3),
  conflictResolution: z.enum(["last_write_wins", "server_wins", "client_wins", "manual"]).default("last_write_wins"),
  compression: z.boolean().default(true),
  encryption: z.boolean().default(true),
  storageQuota: z.number().int().min(1048576).max(10737418240).optional(),
  supportedFeatures: z.array(z.enum(["read", "write", "search", "upload", "notification"])).default(["read"]),
});

export const offlineSyncSchema = z.object({
  entityType: z.enum(["message", "document", "progress", "settings", "quiz", "flashcard"]),
  entityId: z.string().uuid().optional(),
  action: z.enum(["create", "update", "delete", "read"]),
  data: z.record(z.string(), z.unknown()).optional(),
  version: z.number().int().min(1).default(1),
  timestamp: z.string().datetime(),
  checksum: z.string().max(255).optional(),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
  retryCount: z.number().int().min(0).max(10).default(0),
  status: z.enum(["pending", "synced", "conflict", "failed"]).default("pending"),
  conflictData: z.record(z.string(), z.unknown()).optional(),
});

export const offlineQueueSchema = z.object({
  userId: z.string().uuid(),
  operations: z.array(z.object({
    id: z.string().uuid(),
    type: z.enum(["create", "update", "delete"]),
    entityType: z.string().min(1).max(255),
    entityId: z.string().uuid(),
    data: z.record(z.string(), z.unknown()).optional(),
    timestamp: z.string().datetime(),
    priority: z.enum(["low", "normal", "high"]).default("normal"),
    status: z.enum(["pending", "processing", "completed", "failed"]).default("pending"),
    error: z.string().max(1000).optional(),
    retries: z.number().int().min(0).max(10).default(0),
  })).min(1),
  syncOnReconnect: z.boolean().default(true),
  maxQueueSize: z.number().int().min(1).max(10000).default(1000),
  processingTimeout: z.number().int().min(1000).max(60000).default(5000),
});

// ============================================================
// AI Sync
// ============================================================

export const syncConfigSchema = z.object({
  entityType: z.enum(["user", "message", "document", "settings", "progress", "notification"]),
  direction: z.enum(["push", "pull", "bidirectional"]),
  frequency: z.number().int().min(1).max(86400).default(300),
  conflictResolution: z.enum(["last_write_wins", "server_wins", "client_wins", "manual", "merge"]),
  retryPolicy: z.object({
    maxRetries: z.number().int().min(0).max(10).default(3),
    backoffMs: z.number().int().min(100).max(60000).default(1000),
    backoffMultiplier: z.number().min(1).max(10).default(2),
  }).optional(),
  batchSize: z.number().int().min(1).max(1000).default(50),
  compression: z.boolean().default(true),
  encryption: z.boolean().default(false),
  deduplication: z.boolean().default(true),
  mergeStrategy: z.enum(["shallow", "deep", "custom"]).default("deep"),
  enabled: z.boolean().default(true),
});

export const syncConflictResolutionSchema = z.object({
  conflictId: z.string().uuid(),
  entityType: z.string().min(1).max(255),
  entityId: z.string().uuid(),
  localVersion: z.object({
    data: z.record(z.string(), z.unknown()),
    timestamp: z.string().datetime(),
    device: z.string().max(255).optional(),
  }),
  remoteVersion: z.object({
    data: z.record(z.string(), z.unknown()),
    timestamp: z.string().datetime(),
    device: z.string().max(255).optional(),
  }),
  resolution: z.enum(["local", "remote", "merge", "manual"]),
  mergedData: z.record(z.string(), z.unknown()).optional(),
  resolvedBy: z.string().max(255).optional(),
  resolvedAt: z.string().datetime().optional(),
  autoResolved: z.boolean().default(false),
});

export const batchSyncSchema = z.object({
  entityType: z.enum(["messages", "documents", "progress", "settings", "notifications"]),
  items: z.array(z.object({
    id: z.string().uuid(),
    action: z.enum(["create", "update", "delete"]),
    data: z.record(z.string(), z.unknown()).optional(),
    version: z.number().int().min(1).optional(),
    timestamp: z.string().datetime(),
  })).min(1).max(1000),
  conflictResolution: z.enum(["last_write_wins", "server_wins", "client_wins", "manual"]).default("last_write_wins"),
  dryRun: z.boolean().default(false),
  callbackUrl: z.string().url().optional(),
  idempotencyKey: z.string().uuid().optional(),
  atomic: z.boolean().default(false),
});

// ============================================================
// AI Notification Policy
// ============================================================

export const notificationPolicySchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  entityType: z.enum(["message", "assignment", "grade", "event", "system", "reminder"]),
  triggers: z.array(z.enum([
    "created", "updated", "deleted", "due_soon", "overdue",
    "completed", "failed", "approved", "rejected", "scheduled",
  ])).min(1),
  channels: z.array(z.object({
    type: z.enum(["email", "push", "sms", "in_app", "webhook"]),
    enabled: z.boolean().default(true),
    priority: z.enum(["low", "normal", "high"]).default("normal"),
    template: z.string().max(255).optional(),
  })).min(1),
  recipients: z.object({
    roles: z.array(z.enum(["student", "teacher", "parent", "admin"])).optional(),
    users: z.array(z.string().uuid()).optional(),
    custom: z.array(z.string().max(255)).optional(),
  }),
  conditions: z.array(z.object({
    field: z.string().min(1).max(255),
    operator: z.enum(["eq", "neq", "gt", "lt", "contains"]),
    value: z.unknown(),
  })).optional(),
  quietHours: z.object({
    enabled: z.boolean().default(true),
    start: z.string().regex(/^\d{2}:\d{2}$/),
    end: z.string().regex(/^\d{2}:\d{2}$/),
    timezone: z.string().max(50).default("UTC"),
    action: z.enum(["queue", "discard", "send_urgent_only"]).default("queue"),
  }).optional(),
  rateLimit: z.object({
    maxPerHour: z.number().int().min(1).max(100).default(10),
    maxPerDay: z.number().int().min(1).max(1000).default(50),
    deduplicationWindow: z.number().int().min(60).max(86400).default(3600),
  }).optional(),
  enabled: z.boolean().default(true),
});

export const channelConfigSchema = z.object({
  channel: z.enum(["email", "push", "sms", "in_app", "webhook"]),
  enabled: z.boolean().default(true),
  provider: z.string().max(255).optional(),
  config: z.object({
    email: z.object({
      fromAddress: z.string().email().optional(),
      fromName: z.string().max(255).optional(),
      replyTo: z.string().email().optional(),
      templates: z.record(z.string(), z.string().max(255)).optional(),
    }).optional(),
    push: z.object({
      provider: z.enum(["fcm", "apns", "firebase", "onesignal"]).optional(),
      projectId: z.string().max(255).optional(),
      serviceAccountKey: z.string().max(500).optional(),
    }).optional(),
    sms: z.object({
      provider: z.enum(["twilio", "aws_sns", "vonage", "custom"]).optional(),
      fromNumber: z.string().max(20).optional(),
      apiKey: z.string().max(255).optional(),
    }).optional(),
    webhook: z.object({
      url: z.string().url().optional(),
      secret: z.string().max(256).optional(),
      headers: z.record(z.string(), z.string()).optional(),
      retries: z.number().int().min(0).max(10).default(3),
    }).optional(),
  }).optional(),
  rateLimit: z.object({
    maxPerMinute: z.number().int().min(1).max(1000).default(60),
    maxPerHour: z.number().int().min(1).max(10000).default(1000),
  }).optional(),
});

export const priorityConfigSchema = z.object({
  priority: z.enum(["low", "normal", "high", "urgent"]),
  label: z.string().min(1).max(100),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  channels: z.array(z.enum(["email", "push", "sms", "in_app", "webhook"])),
  escalation: z.object({
    enabled: z.boolean().default(false),
    afterMinutes: z.number().int().min(1).max(1440),
    escalateTo: z.array(z.string().max(255)),
    channels: z.array(z.enum(["email", "push", "sms", "webhook"])),
  }).optional(),
  quietHoursOverride: z.boolean().default(false),
  maxPerHour: z.number().int().min(1).max(100).optional(),
  maxPerDay: z.number().int().min(1).max(1000).optional(),
});

export const digestConfigSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  frequency: z.enum(["daily", "weekly", "biweekly", "monthly"]),
  deliveryTime: z.string().regex(/^\d{2}:\d{2}$/),
  timezone: z.string().max(50).default("UTC"),
  categories: z.array(z.string().max(255)).optional(),
  maxItems: z.number().int().min(1).max(100).default(20),
  includeSummary: z.boolean().default(true),
  includeActionItems: z.boolean().default(true),
  includeStats: z.boolean().default(false),
  template: z.string().max(255).optional(),
  channels: z.array(z.enum(["email", "push", "in_app"])).default(["email"]),
  enabled: z.boolean().default(true),
  recipients: z.object({
    roles: z.array(z.enum(["student", "teacher", "parent", "admin"])).optional(),
    users: z.array(z.string().uuid()).optional(),
  }).optional(),
});

// ============================================================
// Barrel Export
// ============================================================

export const schemas = {
  // AI Models
  createAiModel: createAiModelSchema,
  updateAiModel: updateAiModelSchema,
  aiModelQuery: aiModelQuerySchema,
  aiModelFilter: aiModelFilterSchema,

  // AI Prompts
  createPromptTemplate: createPromptTemplateSchema,
  updatePromptTemplate: updatePromptTemplateSchema,
  promptTemplateQuery: promptTemplateQuerySchema,
  promptTemplateVersion: promptTemplateVersionSchema,
  promptTest: promptTestSchema,

  // AI Sessions
  createSession: createSessionSchema,
  updateSession: updateSessionSchema,
  sessionQuery: sessionQuerySchema,
  sessionMessage: sessionMessageSchema,
  sessionBookmark: sessionBookmarkSchema,
  sessionExport: sessionExportSchema,
  sessionSearch: sessionSearchSchema,
  sessionTemplate: sessionTemplateSchema,

  // AI Context Engine
  contextQuery: contextQuerySchema,
  contextChunk: contextChunkSchema,
  contextEmbed: contextEmbedSchema,
  contextSearch: contextSearchSchema,
  contextRerank: contextRerankSchema,
  documentSummary: documentSummarySchema,
  multiHopQuery: multiHopQuerySchema,

  // AI Preferences
  updatePreferences: updatePreferencesSchema,
  theme: themeSchema,
  language: languageSchema,
  notificationPreference: notificationPreferenceSchema,
  personalization: personalizationSchema,
  preferenceFeedback: preferenceFeedbackSchema,
  experiment: experimentSchema,

  // AI Agents
  createAgent: createAgentSchema,
  updateAgent: updateAgentSchema,
  agentQuery: agentQuerySchema,
  agentTask: agentTaskSchema,
  agentHandoff: agentHandoffSchema,
  agentEscalation: agentEscalationSchema,
  agentCollaboration: agentCollaborationSchema,
  agentTemplate: agentTemplateSchema,

  // AI Student Assistant
  studentQuery: studentQuerySchema,
  studyPlan: studyPlanSchema,
  quiz: quizSchema,
  exercise: exerciseSchema,
  flashcard: flashcardSchema,
  progressReport: progressReportSchema,
  achievement: achievementSchema,
  leaderboardQuery: leaderboardQuerySchema,

  // AI Teacher Assistant
  lessonPlan: lessonPlanSchema,
  assessment: assessmentSchema,
  rubric: rubricSchema,
  teacherFeedback: teacherFeedbackSchema,
  correction: correctionSchema,
  classAnalytics: classAnalyticsSchema,
  individualAnalytics: individualAnalyticsSchema,
  meeting: meetingSchema,
  report: reportSchema,

  // AI Parent Assistant
  parentNotification: parentNotificationSchema,
  meetingRequest: meetingRequestSchema,
  homeworkQuery: homeworkQuerySchema,
  studyTime: studyTimeSchema,
  progressVisualization: progressVisualizationSchema,
  behaviorReport: behaviorReportSchema,
  eventCalendar: eventCalendarSchema,
  parentFeedback: parentFeedbackSchema,

  // AI Admin Assistant
  adminDashboard: adminDashboardSchema,
  adminReport: adminReportSchema,
  financialReport: financialReportSchema,
  enrollment: enrollmentSchema,
  staffManagement: staffManagementSchema,
  inventory: inventorySchema,
  maintenance: maintenanceSchema,
  transport: transportSchema,
  cafeteria: cafeteriaSchema,
  library: librarySchema,

  // AI Curriculum Expert
  curriculumQuery: curriculumQuerySchema,
  learningObjective: learningObjectiveSchema,
  scopeSequence: scopeSequenceSchema,
  lessonPlanTemplate: lessonPlanTemplateSchema,
  assessmentAlignment: assessmentAlignmentSchema,
  resourceRecommendation: resourceRecommendationSchema,
  competencyFramework: competencyFrameworkSchema,
  gapAnalysis: gapAnalysisSchema,

  // AI Document Processing
  documentUpload: documentUploadSchema,
  documentQuery: documentQuerySchema,
  documentAnnotation: documentAnnotationSchema,
  documentExport: documentExportSchema,
  documentShare: documentShareSchema,
  documentVersion: documentVersionSchema,
  documentOcr: documentOcrSchema,
  documentSummarization: documentSummarizationSchema,
  documentTranslation: documentTranslationSchema,

  // AI Quality Assurance
  qualityCheck: qualityCheckSchema,
  grammarCheck: grammarCheckSchema,
  styleCheck: styleCheckSchema,
  factualityCheck: factualityCheckSchema,
  qualityBiasCheck: qualityBiasCheckSchema,
  plagiarismCheck: plagiarismCheckSchema,
  readabilityCheck: readabilityCheckSchema,
  gradingCheck: gradingCheckSchema,
  citationCheck: citationCheckSchema,

  // AI Voice Processing
  speechToText: speechToTextSchema,
  textToSpeech: textToSpeechSchema,
  voiceClone: voiceCloneSchema,
  transcription: transcriptionSchema,
  voiceTranslation: voiceTranslationSchema,
  voiceAuthentication: voiceAuthenticationSchema,

  // AI Vision Processing
  imageAnalysis: imageAnalysisSchema,
  objectDetection: objectDetectionSchema,
  faceDetection: faceDetectionSchema,
  visionOcr: visionOcrSchema,
  textDetection: textDetectionSchema,
  handwritingRecognition: handwritingRecognitionSchema,
  diagramAnalysis: diagramAnalysisSchema,
  visualQA: visualQASchema,
  imageCaption: imageCaptionSchema,
  videoAnalysis: videoAnalysisSchema,

  // AI Safety
  contentFilter: contentFilterSchema,
  piiDetection: piiDetectionSchema,
  jailbreakDetection: jailbreakDetectionSchema,
  promptInjection: promptInjectionSchema,
  biasDetection: biasDetectionSchema,
  safetyClassification: safetyClassificationSchema,
  incidentReport: incidentReportSchema,
  ageVerification: ageVerificationSchema,

  // AI Moderation
  moderationQueue: moderationQueueSchema,
  moderationAction: moderationActionSchema,
  userReport: userReportSchema,
  appeal: appealSchema,
  shadowBan: shadowBanSchema,

  // AI Ethics
  ethicsCheck: ethicsCheckSchema,
  biasMitigation: biasMitigationSchema,
  fairnessCheck: fairnessCheckSchema,
  modelCard: modelCardSchema,
  consent: consentSchema,

  // AI Analytics
  usageAnalytics: usageAnalyticsSchema,
  performanceAnalytics: performanceAnalyticsSchema,
  qualityAnalytics: qualityAnalyticsSchema,
  costAnalytics: costAnalyticsSchema,
  cohort: cohortSchema,
  funnel: funnelSchema,
  heatmap: heatmapSchema,

  // AI Dashboard
  dashboard: dashboardSchema,
  widget: widgetSchema,
  dashboardShare: dashboardShareSchema,
  dashboardTemplate: dashboardTemplateSchema,
  dashboardAlert: dashboardAlertSchema,

  // AI Insights
  trend: trendSchema,
  anomaly: anomalySchema,
  correlation: correlationSchema,
  insightPrediction: insightPredictionSchema,
  insightRecommendation: insightRecommendationSchema,
  insightDistribution: insightDistributionSchema,

  // AI Predictions
  predictionRequest: predictionRequestSchema,
  predictionConfig: predictionConfigSchema,
  backtest: backtestSchema,
  ensemble: ensembleSchema,
  driftDetection: driftDetectionSchema,

  // AI Recommendations
  recommendationRequest: recommendationRequestSchema,
  recommendationFeedback: recommendationFeedbackSchema,
  knowledgeGraph: knowledgeGraphSchema,
  contextAwareRecommendation: contextAwareRecommendationSchema,

  // AI Automation
  automationWorkflow: automationWorkflowSchema,
  automationTrigger: automationTriggerSchema,
  scheduledExecution: scheduledExecutionSchema,
  eventListener: eventListenerSchema,
  automationWebhook: automationWebhookSchema,
  automationWorkflowTemplate: automationWorkflowTemplateSchema,

  // AI Workflow
  workflowStep: workflowStepSchema,
  actionStep: actionStepSchema,
  conditionStep: conditionStepSchema,
  loopStep: loopStepSchema,
  parallelStep: parallelStepSchema,
  workflowExecution: workflowExecutionSchema,
  workflowRollback: workflowRollbackSchema,

  // AI Scheduling
  schedule: scheduleSchema,
  conflictResolution: conflictResolutionSchema,
  optimization: optimizationSchema,
  scheduleTemplate: scheduleTemplateSchema,
  publication: publicationSchema,
  reminder: reminderSchema,
  calendarSync: calendarSyncSchema,

  // AI Notification
  notification: notificationSchema,
  notificationBatch: notificationBatchSchema,
  notificationTemplate: notificationTemplateSchema,
  notificationPreferences: notificationPreferencesSchema,
  notificationDigest: notificationDigestSchema,

  // AI Integration
  integration: integrationSchema,
  integrationWebhook: integrationWebhookSchema,
  integrationApiKey: integrationApiKeySchema,
  oauth2: oauth2Schema,
  integrationVersioning: integrationVersioningSchema,

  // AI API Management
  apiGateway: apiGatewaySchema,
  rateLimitConfig: rateLimitConfigSchema,
  keyManagement: keyManagementSchema,
  requestValidation: requestValidationSchema,
  circuitBreaker: circuitBreakerSchema,

  // AI Rate Limiting
  rateLimitEndpoint: rateLimitEndpointSchema,
  rateLimitUser: rateLimitUserSchema,
  penaltyBox: penaltyBoxSchema,
  distributedRateLimit: distributedRateLimitSchema,

  // AI Caching
  cacheConfig: cacheConfigSchema,
  cacheNamespace: cacheNamespaceSchema,
  cacheWarming: cacheWarmingSchema,
  cacheInvalidation: cacheInvalidationSchema,

  // AI Storage
  storageConfig: storageConfigSchema,
  fileUpload: fileUploadSchema,
  fileShare: fileShareSchema,
  quota: quotaSchema,
  backup: backupSchema,

  // AI Logging
  loggingConfig: loggingConfigSchema,
  logEntry: logEntrySchema,
  remoteLog: remoteLogSchema,
  auditLog: auditLogSchema,

  // AI Monitoring
  healthCheck: healthCheckSchema,
  performanceMetric: performanceMetricSchema,
  availabilityCheck: availabilityCheckSchema,
  securityMetric: securityMetricSchema,
  resourceMetric: resourceMetricSchema,

  // AI Alerting
  alert: alertSchema,
  alertEscalation: alertEscalationSchema,
  alertTemplate: alertTemplateSchema,
  alertSuppression: alertSuppressionSchema,

  // AI Health Check
  healthCheckEndpoint: healthCheckEndpointSchema,
  componentCheck: componentCheckSchema,
  deepCheck: deepCheckSchema,
  readiness: readinessSchema,
  liveness: livenessSchema,

  // AI Load Balancing
  loadBalancer: loadBalancerSchema,
  stickySession: stickySessionSchema,
  lbCircuitBreaker: lbCircuitBreakerSchema,

  // AI Scaling
  scalingConfig: scalingConfigSchema,
  predictiveScaling: predictiveScalingSchema,
  scheduledScaling: scheduledScalingSchema,
  metricScaling: metricScalingSchema,

  // AI Security
  authentication: authenticationSchema,
  authorization: authorizationSchema,
  csrf: csrfSchema,
  csp: cspSchema,
  passwordPolicy: passwordPolicySchema,
  twoFactor: twoFactorSchema,
  accountLockout: accountLockoutSchema,
  captcha: captchaSchema,

  // AI Encryption
  encryptionConfig: encryptionConfigSchema,
  fieldEncryption: fieldEncryptionSchema,
  certificate: certificateSchema,

  // AI Authorization
  rbac: rbacSchema,
  permission: permissionSchema,
  rolePermissionMatrix: rolePermissionMatrixSchema,
  policy: policySchema,
  contextAuthorization: contextAuthorizationSchema,

  // AI Audit
  auditEvent: auditEventSchema,
  auditQuery: auditQuerySchema,
  auditReport: auditReportSchema,
  compliance: complianceSchema,

  // AI Compliance
  complianceCheck: complianceCheckSchema,
  consentManagement: consentManagementSchema,
  dataProtection: dataProtectionSchema,
  breachNotification: breachNotificationSchema,
  pia: piaSchema,

  // AI Privacy
  dataClassification: dataClassificationSchema,
  privacyConfig: privacyConfigSchema,
  dataTransfer: dataTransferSchema,
  privacyByDesign: privacyByDesignSchema,

  // AI Data Retention
  retentionPolicy: retentionPolicySchema,
  deletion: deletionSchema,
  archival: archivalSchema,
  legalHold: legalHoldSchema,

  // AI Mobile
  mobileConfig: mobileConfigSchema,
  pushNotification: pushNotificationSchema,
  biometricAuth: biometricAuthSchema,
  deviceManagement: deviceManagementSchema,
  deepLink: deepLinkSchema,

  // AI Offline
  offlineConfig: offlineConfigSchema,
  offlineSync: offlineSyncSchema,
  offlineQueue: offlineQueueSchema,

  // AI Sync
  syncConfig: syncConfigSchema,
  syncConflictResolution: syncConflictResolutionSchema,
  batchSync: batchSyncSchema,

  // AI Notification Policy
  notificationPolicy: notificationPolicySchema,
  channelConfig: channelConfigSchema,
  priorityConfig: priorityConfigSchema,
  digestConfig: digestConfigSchema,
};

// ============================================================
// Additional AI Domain Schemas
// ============================================================

export const aiConfigSchema = z.object({
  serviceName: z.string().min(1).max(255),
  version: z.string().min(1).max(50),
  environment: z.enum(["development", "staging", "production", "test"]),
  logLevel: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).default("info"),
  enableTelemetry: z.boolean().default(true),
  enableMetrics: z.boolean().default(true),
  enableTracing: z.boolean().default(true),
  defaultModel: z.string().max(255).optional(),
  maxConcurrentRequests: z.number().int().min(1).max(10000).default(100),
  requestTimeout: z.number().int().min(1000).max(300000).default(30000),
  retryAttempts: z.number().int().min(0).max(10).default(3),
  cacheEnabled: z.boolean().default(true),
  cacheTtl: z.number().int().min(0).max(86400).default(3600),
  corsOrigins: z.array(z.string().max(255)).default(["*"]),
  rateLimitEnabled: z.boolean().default(true),
  maintenanceMode: z.boolean().default(false),
  features: z.record(z.string(), z.boolean()).optional(),
});

export const aiModelMetricSchema = z.object({
  modelId: z.string().uuid(),
  timestamp: z.string().datetime(),
  requestCount: z.number().int().min(0),
  successCount: z.number().int().min(0),
  errorCount: z.number().int().min(0),
  avgLatencyMs: z.number().min(0),
  p50LatencyMs: z.number().min(0),
  p90LatencyMs: z.number().min(0),
  p99LatencyMs: z.number().min(0),
  totalTokens: z.number().int().min(0),
  avgTokensPerRequest: z.number().min(0),
  costUsd: z.number().min(0),
  errorRate: z.number().min(0).max(1),
  availability: z.number().min(0).max(1),
});

export const aiUserSessionMetricSchema = z.object({
  sessionId: z.string().uuid(),
  userId: z.string().uuid(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  messageCount: z.number().int().min(0),
  totalTokens: z.number().int().min(0),
  models: z.array(z.string().max(255)),
  avgResponseTime: z.number().min(0),
  userSatisfaction: z.number().int().min(1).max(5).optional(),
  topic: z.string().max(255).optional(),
  completed: z.boolean().default(false),
});

export const aiDeploymentSchema = z.object({
  version: z.string().min(1).max(50),
  environment: z.enum(["development", "staging", "production"]),
  status: z.enum(["pending", "deploying", "deployed", "failed", "rolled_back"]),
  strategy: z.enum(["blue_green", "canary", "rolling", "recreate"]).default("rolling"),
  canaryPercentage: z.number().int().min(1).max(100).optional(),
  rollbackOnFailure: z.boolean().default(true),
  healthCheckUrl: z.string().url().optional(),
  healthCheckTimeout: z.number().int().min(1000).max(60000).default(30000),
  deployer: z.string().max(255).optional(),
  notes: z.string().max(2000).optional(),
  tags: z.array(z.string()).optional(),
});

export const aiCacheEntrySchema = z.object({
  key: z.string().min(1).max(500),
  value: z.unknown(),
  ttl: z.number().int().min(0).max(86400).default(3600),
  tags: z.array(z.string().max(100)).optional(),
  namespace: z.string().max(100).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const aiBatchRequestSchema = z.object({
  requests: z.array(z.object({
    id: z.string().uuid(),
    endpoint: z.string().min(1).max(500),
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    body: z.record(z.string(), z.unknown()).optional(),
    headers: z.record(z.string(), z.string()).optional(),
    timeout: z.number().int().min(1000).max(60000).optional(),
  })).min(1).max(100),
  parallel: z.boolean().default(false),
  stopOnError: z.boolean().default(false),
  callbackUrl: z.string().url().optional(),
  idempotencyKey: z.string().uuid().optional(),
});

export const aiFeatureFlagSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  enabled: z.boolean().default(false),
  type: z.enum(["boolean", "percentage", "user_segment", "variant"]),
  percentage: z.number().min(0).max(100).optional(),
  variants: z.array(z.object({
    name: z.string().min(1).max(100),
    weight: z.number().min(0).max(1),
    config: z.record(z.string(), z.unknown()).optional(),
  })).optional(),
  userSegments: z.array(z.string().max(255)).optional(),
  rules: z.array(z.object({
    condition: z.string().min(1).max(500),
    value: z.boolean().optional(),
    variant: z.string().max(100).optional(),
  })).optional(),
  killSwitch: z.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const aiRateLimitKeySchema = z.object({
  key: z.string().min(1).max(255),
  type: z.enum(["api_key", "user_id", "ip", "custom"]),
  maxRequests: z.number().int().min(1).max(1000000),
  windowMs: z.number().int().min(1000).max(86400000),
  currentUsage: z.number().int().min(0).default(0),
  resetAt: z.string().datetime().optional(),
  blocked: z.boolean().default(false),
  blockedUntil: z.string().datetime().optional(),
  tier: z.enum(["free", "basic", "pro", "enterprise"]).default("free"),
});

export const aiCircuitBreakerStateSchema = z.object({
  name: z.string().min(1).max(255),
  state: z.enum(["closed", "open", "half_open"]),
  failureCount: z.number().int().min(0),
  successCount: z.number().int().min(0),
  lastFailureAt: z.string().datetime().optional(),
  lastSuccessAt: z.string().datetime().optional(),
  nextAttemptAt: z.string().datetime().optional(),
  totalRequests: z.number().int().min(0),
  totalFailures: z.number().int().min(0),
  totalSuccesses: z.number().int().min(0),
});

export const aiRequestContextSchema = z.object({
  requestId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  sessionId: z.string().uuid().optional(),
  traceId: z.string().uuid().optional(),
  spanId: z.string().uuid().optional(),
  source: z.enum(["api", "web", "mobile", "webhook", "internal"]),
  ipAddress: z.string().optional(),
  userAgent: z.string().max(500).optional(),
  startTime: z.string().datetime(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const aiRetryConfigSchema = z.object({
  maxRetries: z.number().int().min(0).max(10).default(3),
  initialDelay: z.number().int().min(100).max(10000).default(1000),
  maxDelay: z.number().int().min(1000).max(60000).default(30000),
  backoffMultiplier: z.number().min(1).max(10).default(2),
  retryableErrors: z.array(z.number().int().min(400).max(599)).optional(),
  retryableStatusCodes: z.array(z.number().int().min(400).max(599)).optional(),
  jitter: z.boolean().default(true),
  jitterMaxMs: z.number().int().min(100).max(10000).default(1000),
});

export const aiHealthMetricsSchema = z.object({
  timestamp: z.string().datetime(),
  cpu: z.number().min(0).max(100),
  memory: z.number().min(0).max(100),
  disk: z.number().min(0).max(100),
  network: z.object({
    bytesIn: z.number().int().min(0),
    bytesOut: z.number().int().min(0),
    connections: z.number().int().min(0),
  }),
  requests: z.object({
    active: z.number().int().min(0),
    queued: z.number().int().min(0),
    completed: z.number().int().min(0),
    failed: z.number().int().min(0),
  }),
  uptime: z.number().int().min(0),
  version: z.string().min(1).max(50),
});

export const aiWebhookDeliverySchema = z.object({
  webhookId: z.string().uuid(),
  event: z.string().min(1).max(255),
  payload: z.record(z.string(), z.unknown()),
  status: z.enum(["pending", "delivered", "failed", "retrying"]),
  attempts: z.number().int().min(0).max(10),
  lastAttemptAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  responseCode: z.number().int().min(100).max(599).optional(),
  responseBody: z.string().max(10000).optional(),
  nextRetryAt: z.string().datetime().optional(),
  error: z.string().max(1000).optional(),
});

export const aiIdempotencyKeySchema = z.object({
  key: z.string().min(1).max(255),
  endpoint: z.string().min(1).max(500),
  requestHash: z.string().max(255),
  response: z.record(z.string(), z.unknown()).optional(),
  statusCode: z.number().int().min(100).max(599).optional(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
});

export const aiVersionInfoSchema = z.object({
  service: z.string().min(1).max(255),
  version: z.string().min(1).max(50),
  buildId: z.string().max(255).optional(),
  commitHash: z.string().max(40).optional(),
  buildDate: z.string().datetime().optional(),
  environment: z.enum(["development", "staging", "production"]),
  gitBranch: z.string().max(255).optional(),
  dependencies: z.record(z.string(), z.string()).optional(),
  features: z.array(z.string().max(255)).optional(),
});

export const aiErrorSchema = z.object({
  code: z.string().min(1).max(100),
  message: z.string().min(1).max(2000),
  details: z.record(z.string(), z.unknown()).optional(),
  stack: z.string().max(50000).optional(),
  requestId: z.string().uuid().optional(),
  timestamp: z.string().datetime(),
  severity: z.enum(["low", "medium", "high", "critical"]),
  category: z.enum(["validation", "authentication", "authorization", "not_found", "conflict", "rate_limit", "internal", "external"]),
  retryable: z.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const aiPaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.string().max(255).optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().max(255).optional(),
  fields: z.array(z.string().max(255)).optional(),
  include: z.array(z.string().max(255)).optional(),
});

export const aiBulkOperationSchema = z.object({
  operation: z.enum(["create", "update", "delete", "upsert"]),
  entityType: z.string().min(1).max(255),
  items: z.array(z.object({
    id: z.string().uuid().optional(),
    data: z.record(z.string(), z.unknown()),
  })).min(1).max(1000),
  validateOnly: z.boolean().default(false),
  atomic: z.boolean().default(false),
  idempotencyKey: z.string().uuid().optional(),
  callbackUrl: z.string().url().optional(),
});

export const aiExportJobSchema = z.object({
  entityType: z.string().min(1).max(255),
  format: z.enum(["csv", "json", "xlsx", "pdf"]),
  filters: z.record(z.string(), z.unknown()).optional(),
  fields: z.array(z.string().max(255)).optional(),
  sort: z.object({
    field: z.string().min(1).max(255),
    order: z.enum(["asc", "desc"]),
  }).optional(),
  maxRows: z.number().int().min(1).max(1000000).optional(),
  compression: z.enum(["none", "gzip", "zip"]).default("none"),
  notifyEmail: z.string().email().optional(),
  callbackUrl: z.string().url().optional(),
});

export const aiImportJobSchema = z.object({
  entityType: z.string().min(1).max(255),
  source: z.object({
    type: z.enum(["file", "url", "paste"]),
    url: z.string().url().optional(),
    fileName: z.string().max(255).optional(),
    content: z.string().max(10000000).optional(),
    mimeType: z.string().max(100).optional(),
  }),
  format: z.enum(["csv", "json", "xlsx"]),
  mapping: z.record(z.string(), z.string()).optional(),
  options: z.object({
    hasHeader: z.boolean().default(true),
    delimiter: z.string().max(5).default(","),
    encoding: z.enum(["utf8", "latin1", "utf16"]).default("utf8"),
    skipRows: z.number().int().min(0).default(0),
    maxRows: z.number().int().min(1).max(1000000).optional(),
    dryRun: z.boolean().default(false),
    overwrite: z.boolean().default(false),
  }).optional(),
  validateOnly: z.boolean().default(false),
  callbackUrl: z.string().url().optional(),
});

export const aiStorageQuotaAlertSchema = z.object({
  userId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  currentUsageBytes: z.number().int().min(0),
  maxStorageBytes: z.number().int().min(1),
  usagePercentage: z.number().min(0).max(100),
  threshold: z.number().min(0).max(100).default(80),
  alertChannels: z.array(z.enum(["email", "push", "webhook"])).min(1),
  recipients: z.array(z.string().max(255)).min(1),
  enabled: z.boolean().default(true),
});

export const aiMaintenanceWindowSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  services: z.array(z.string().min(1).max(255)).min(1),
  type: z.enum(["scheduled", "emergency", "rolling"]),
  notifyUsers: z.boolean().default(true),
  notifyChannels: z.array(z.enum(["email", "push", "sms", "in_app"])).default(["email", "push"]),
  autoExtend: z.boolean().default(false),
  maxExtensionMinutes: z.number().int().min(0).max(480).default(60),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled"),
});

export const aiChangeLogSchema = z.object({
  version: z.string().min(1).max(50),
  date: z.string().datetime(),
  changes: z.array(z.object({
    type: z.enum(["added", "changed", "deprecated", "removed", "fixed", "security"]),
    description: z.string().min(1).max(1000),
    breaking: z.boolean().default(false),
    affectedEndpoints: z.array(z.string().max(500)).optional(),
  })).min(1),
  author: z.string().max(255).optional(),
  migrationGuide: z.string().max(5000).optional(),
});

// ============================================================
// Additional Exports
// ============================================================

Object.assign(schemas, {
  // Additional Schemas
  aiConfig: aiConfigSchema,
  aiModelMetric: aiModelMetricSchema,
  aiUserSessionMetric: aiUserSessionMetricSchema,
  aiDeployment: aiDeploymentSchema,
  aiCacheEntry: aiCacheEntrySchema,
  aiBatchRequest: aiBatchRequestSchema,
  aiFeatureFlag: aiFeatureFlagSchema,
  aiRateLimitKey: aiRateLimitKeySchema,
  aiCircuitBreakerState: aiCircuitBreakerStateSchema,
  aiRequestContext: aiRequestContextSchema,
  aiRetryConfig: aiRetryConfigSchema,
  aiHealthMetrics: aiHealthMetricsSchema,
  aiWebhookDelivery: aiWebhookDeliverySchema,
  aiIdempotencyKey: aiIdempotencyKeySchema,
  aiVersionInfo: aiVersionInfoSchema,
  aiError: aiErrorSchema,
  aiPagination: aiPaginationSchema,
  aiBulkOperation: aiBulkOperationSchema,
  aiExportJob: aiExportJobSchema,
  aiImportJob: aiImportJobSchema,
  aiStorageQuotaAlert: aiStorageQuotaAlertSchema,
  aiMaintenanceWindow: aiMaintenanceWindowSchema,
  aiChangeLog: aiChangeLogSchema,
});

import { SupabaseClient } from '@supabase/supabase-js';

import type {
  // AI Core types
  AIModel,
  AIModelConfig,
  AIModelRoute,
  AIModelHealth,
  AIModelUsage,
  AIModelBenchmark,
  AIFallbackModel,
  AIModelFilter,
  AICostBudget,
  AICostBreakdown,
  AIUsageQuota,
  AITemperatureProfileConfig,
  AIStreamingConfig,
  AIModelVersion,
  AIABTest,
  AIFeedback,
  AIInsight,
  AIRecommendation,
  AIAuditLog,
  AIBillingTransaction,
  AISubscription,
  AIQuotaAlert,
  AIBatchJob,
  AICacheEntry,
  AICacheInvalidation,
  AILoadBalancer,
  AIModelEndpoint,
  AIDocumentProcessing,
  AIVoiceConfig,
  AIVideoProcessing,
  AIGenerationConfig,
  AIEvaluationCriteria,
  AIBenchmarkSuite,
  AIBenchmarkResult,
  AIOptimizationResult,
  AIModelComparison,
  AIPromptOptimization,
  AITokenEstimation,
  AILatencyBudget,
  AIThroughputConfig,
  AICircuitBreaker,
  AILoggingConfig,
  AITracingConfig,
  AIPrometheusMetrics,
  AIGrafanaDashboard,
  AIAlertRule,
  AIOperatorConfig,
  AIPipelineStep,
  AIPipeline,
  AIDataFlow,
  AIBackupConfig,
  AIDisasterRecovery,
  AICostAllocation,
  AIFeatureUsage,
  AIPerformanceBaseline,
  AISlaConfig,
  AISlaViolation,
  AIComplianceCheck,
  AIPrivacyConfig,
  AIDataGovernance,
  // Enums
  AIModelProvider,
  AIModelCapability,
  AIModelStatus,
  AISessionStatus,
  AIPromptType,
  AITemperatureProfile,
  AIStreamFormat,
  AIReasoningMode,
  AIRoutingStrategy,
  AIFallbackPolicy,
  AIBudgetPeriod,
  AITokenType,
  AIConversationRole,
  AIConversationStatus,
  AIMessageStatus,
  AIFunctionCallStatus,
  AIModelTier,
  AIAccessLevel,
  AICacheStrategy,
  AIPriority,
  // Session & Conversation
  AISession,
  AIConversation,
  AIMessage,
  AIFunctionCall,
  AIToolCall,
  AIContextWindow,
  AIConversationMemory,
  AIConversationSummary,
  AISessionAnalytics,
  // Prompt
  AIPromptTemplate,
  AIPromptVersion,
  AIPromptExecution,
  AIPromptCategory,
  PromptVariable,
  PromptPerformance,
  // Context
  AIContext,
  AIContextSource,
  AIContextInjection,
  AIEvaluation,
  EvaluationScore,
  AIModelEvaluation,
  // Preferences
  AISchoolConfig,
  AIUserPreference,
  AIAccessControl,
  AIFeatureFlag,
  AIBillingConfig,
  AIAuditEntry,
  AIPerformanceMetrics,
  AIDailyUsage,
  AIConversationAnalytics,
  AIRateLimitConfig,
  // Functions
  AIFunctionDefinition,
  AIFunctionExecution,
  // Safety
  AISafetyFilter,
  // Scaling
  AIAutoScaling,
  AIOptimizationSuggestion,
  // Training
  AITrainingDataset,
  AITrainingJob,
  AICustomModel,
  // Language
  AILanguageSupport,
  AITranslationConfig,
  // Notification
  AINotificationConfig,
  // Webhook
  AIWebhook,
  // Integration
  AIIntegration,
  AIPlugin,
  AIDeploymentConfig,
  // Logging
  AILogsEntry,
  // Performance
  AIPerformanceBenchmark,
  AICostForecast,
  AIOptimizationRule,
  AIQualityMetric,
  // Security
  AISecurityPolicy,
  AIAccessToken,
  AIApiKey,
  // Usage
  AITokenUsageByDay,
  AITokenUsageByModel,
  AITokenUsageByUser,
  AITokenUsageBySchool,
  TokenUsage,

  // AI Agents & Education
  AIAgent,
  AIAgentTool,
  AgentMemoryConfig,
  AIAgentExecution,
  AIAgentMessage,
  AIAgentDelegation,
  AIAgentPermission,
  AIAgentMemory,
  AIAgentConfig,
  AIAgentAnalytics,
  AIAgentTemplate,
  AIAgentConversation,
  AIAgentSkill,
  AIAgentTrigger,
  AgentCollaboration,
  AgentCollaborationStep,
  AIAgentLog,
  AIAgentVersion,
  AIAgentFeedback,
  AgentWorkflowBinding,
  // Education
  LessonPlan,
  LessonActivity,
  CourseContent,
  CourseModule,
  ExamPaper,
  ExamQuestion,
  QuizSet,
  QuizQuestion,
  HomeworkAssignment,
  HomeworkQuestion,
  CorrectionResult,
  CorrectedAnswer,
  RubricScore,
  RubricTemplate,
  RubricCriterion,
  RubricLevel,
  BulletinComment,
  ReportCard,
  ReportSubject,
  CurriculumStructure,
  CurriculumLevel,
  CurriculumSubject,
  CompetencyMap,
  Competency,
  LearningObjective,
  BloomDistribution,
  // Student AI
  TutorSession,
  TutorMessage,
  LearningCoachPlan,
  CoachActivity,
  RevisionPlan,
  RevisionSubject,
  RevisionSchedule,
  FlashcardDeck,
  Flashcard,
  AdaptivePath,
  AdaptiveNode,
  WeaknessReport,
  Weakness,
  StudentRecommendation,
  StudySchedule,
  StudySlot,
  ExamPreparation,
  PrepTopic,
  PrepPlan,
  // Teacher AI
  TeachingAssistantSession,
  AssistantMessage,
  AssistantAction,
  ContentImprovement,
  ContentChange,
  ExerciseSet,
  Exercise,
  ClassInsight,
  LessonSummary,
  AutoFeedback,
  ClassroomRecommendation,
  StudentInsight,
  // Document AI
  OCRResult,
  OCRPage,
  BoundingBox,
  DocumentClassification,
  AutoTag,
  Tag,
  EntityExtraction,
  ExtractedEntity,
  DocumentSummary,
  DocumentTranslation,
  DocumentQA,
  SemanticSearchResult,
  SearchResultItem,
  // Knowledge Base
  KnowledgeSource,
  KnowledgeDocument,
  KnowledgeChunk,
  KnowledgeIndex,
  VectorStore,
  RetrievalQuery,
  RetrievalResult,
  RAGExecution,
  CitationEntry,
  KnowledgePermission,

  // Safety & Analytics
  ContentModerationResult,
  ModerationCategory,
  PIIDetectionResult,
  PIIDetectedEntity,
  BiasDetectionResult,
  BiasDetected,
  HallucinationDetection,
  HallucinatedClaim,
  InjectionDetection,
  OutputValidation,
  ValidationResult,
  SafetyPolicy,
  SafetyRule,
  SafetyIncident,
  ComplianceReport,
  ComplianceFinding,
  SafetyAuditEntry,
  ContentFilterConfig,
  PromptInjectionLog,
  SafetyDashboard,
  // Analytics
  TokenUsageAnalytics,
  CostAnalytics,
  CostAlert,
  LatencyAnalytics,
  LatencyStats,
  SuccessRateAnalytics,
  ModelPerformanceAnalytics,
  PromptPerformanceAnalytics,
  UserSatisfactionAnalytics,
  UserFeedback,
  ConversationAnalytics,
  ROIMetrics,
  AdoptionMetrics,
  AIUsageReport,
  AnalyticsDashboard,
  AnalyticsWidget,
  AnalyticsExport,
  AnalyticsAlert,
  AIInsightCategory,
  // Prompt Management
  PromptLibraryEntry,
  PromptTestResult,
  PromptTestSuite,
  PromptTestCase,
  PromptVersion,
  PromptSharing,
  PromptAnalytics,
  PromptTemplate,
  PromptEvaluation,
  PromptChain,
  PromptChainStep,
  PromptDependency,
  PromptUsageLog,
  PromptMarketplaceEntry,
  // Automation
  AIWorkflow,
  AIWorkflowTrigger,
  AIWorkflowStep,
  AIWorkflowExecution,
  AISuggestion,
  AIDecision,
  DecisionOption,
  AIApprovalRequest,
  HumanInTheLoop,
  AIFeedbackLoop,
  // Voice & Vision
  VoiceSession,
  VoiceTranscript,
  VoiceTimestamp,
  VoiceCommand,
  VoiceResponse,
  VisionAnalysis,
  VisionResult,
  VisionLabel,
  VisionObject,
  ImageAnalysis,
  VideoAnalysis,
  VideoKeyframe,
  AudioAnalysis,
  AudioSpeaker,
  AudioSegment,
  // Mobile AI
  MobileAIChat,
  MobileChatMessage,
  MobileVoiceAssistant,
  MobileAIRecommendation,
  MobileAIInsight,
  MobileStudentTutor,
  TutorProgress,
  MobileTeacherCopilot,

  // Safety Enums
  ContentFilterCategory,
  PIIDetectionType,
  HallucinationType,
  InjectionType,
  OutputValidationType,
  ComplianceFramework,
  AIContentType,
  SafetyAction,
  AuditEventType,
  SatisfactionRating,
  ROIIndicator,
  AdoptionStage,
  AnalyticsGranularity,
  VoiceMode,
  VoiceLanguage,
  VoiceGender,
  TranscriptionQuality,
  AISuggestionType,
  // Agent Enums
  AIAgentType,
  AIAgentStatus,
  AIAgentCapability,
  AIAgentExecutionMode,
  AIDelegationStatus,
  EducationAILessonType,
  BloomTaxonomyLevel,
  CompetencyLevel,
  LearningPathStatus,
  StudentAIActionType,
  TeacherAIServiceType,
  DocumentAIAction,
  KnowledgeSourceType,
  IndexingStatus,
  RetrievalStrategy,
  PromptLibraryCategory,
  PromptTestStatus,
  AISafetyLevel,
  ContentFilterType,
  BiasType as EducationBiasType,
} from '@educi/types';

// ============================================================================
// Helper Types
// ============================================================================

export interface QueryResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DateRange {
  from: string;
  to: string;
}

export interface AiQuery {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// 1. AiModelRepository (35 methods)
// ============================================================================

export interface AiModelRepository {
  findById(schoolId: string, id: string): Promise<AIModel | null>;
  findByIdentifier(modelId: string): Promise<AIModel | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIModel>>;
  findByProvider(schoolId: string, provider: AIModelProvider): Promise<AIModel[]>;
  findByCapability(schoolId: string, capability: AIModelCapability): Promise<AIModel[]>;
  findByTier(schoolId: string, tier: AIModelTier): Promise<AIModel[]>;
  findByStatus(schoolId: string, status: AIModelStatus): Promise<AIModel[]>;
  findActiveModels(schoolId: string): Promise<AIModel[]>;
  findDeprecatedModels(schoolId: string): Promise<AIModel[]>;
  findMaintenanceModels(schoolId: string): Promise<AIModel[]>;
  findRateLimitedModels(schoolId: string): Promise<AIModel[]>;
  findErrorModels(schoolId: string): Promise<AIModel[]>;
  findPublicModels(schoolId: string): Promise<AIModel[]>;
  findSchoolModels(schoolId: string): Promise<AIModel[]>;
  create(schoolId: string, data: Partial<AIModel>): Promise<AIModel>;
  update(schoolId: string, id: string, data: Partial<AIModel>): Promise<AIModel>;
  delete(schoolId: string, id: string): Promise<void>;
  activateModel(schoolId: string, id: string): Promise<AIModel>;
  deactivateModel(schoolId: string, id: string): Promise<AIModel>;
  deprecateModel(schoolId: string, id: string): Promise<AIModel>;
  setMaintenanceMode(schoolId: string, id: string): Promise<AIModel>;
  getModelConfig(schoolId: string, modelId: string): Promise<AIModelConfig | null>;
  updateModelConfig(schoolId: string, modelId: string, config: Partial<AIModelConfig>): Promise<AIModelConfig>;
  getModelHealth(schoolId: string, modelId: string): Promise<AIModelHealth | null>;
  getModelHealthHistory(schoolId: string, modelId: string, dateRange: DateRange): Promise<AIModelHealth[]>;
  getModelUsage(schoolId: string, modelId: string, period: string): Promise<AIModelUsage | null>;
  getModelUsageHistory(schoolId: string, modelId: string, dateRange: DateRange): Promise<AIModelUsage[]>;
  getModelBenchmark(schoolId: string, modelId: string): Promise<AIModelBenchmark[]>;
  getModelRoutes(schoolId: string): Promise<AIModelRoute[]>;
  getDefaultModel(schoolId: string): Promise<AIModel | null>;
  setDefaultModel(schoolId: string, modelId: string): Promise<void>;
  getCostBreakdown(schoolId: string, dateRange: DateRange): Promise<AICostBreakdown>;
  getUsageQuota(schoolId: string, userId?: string): Promise<AIUsageQuota | null>;
  compareModels(schoolId: string, modelIds: string[], criteria: string[]): Promise<AIModelComparison>;
  getFilteredModels(schoolId: string, filter: AIModelFilter): Promise<AIModel[]>;
}

// ============================================================================
// 2. AiPromptTemplateRepository (35 methods)
// ============================================================================

export interface AiPromptTemplateRepository {
  findById(schoolId: string, id: string): Promise<AIPromptTemplate | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIPromptTemplate>>;
  findByCategory(schoolId: string, category: string): Promise<AIPromptTemplate[]>;
  findByName(schoolId: string, name: string): Promise<AIPromptTemplate | null>;
  findByTags(schoolId: string, tags: string[]): Promise<AIPromptTemplate[]>;
  findPublicTemplates(schoolId: string): Promise<AIPromptTemplate[]>;
  findSchoolTemplates(schoolId: string): Promise<AIPromptTemplate[]>;
  findMostUsed(schoolId: string, limit: number): Promise<AIPromptTemplate[]>;
  findHighestRated(schoolId: string, limit: number): Promise<AIPromptTemplate[]>;
  findRecentlyCreated(schoolId: string, limit: number): Promise<AIPromptTemplate[]>;
  findRecentlyUpdated(schoolId: string, limit: number): Promise<AIPromptTemplate[]>;
  create(schoolId: string, data: Partial<AIPromptTemplate>): Promise<AIPromptTemplate>;
  update(schoolId: string, id: string, data: Partial<AIPromptTemplate>): Promise<AIPromptTemplate>;
  delete(schoolId: string, id: string): Promise<void>;
  duplicate(schoolId: string, id: string, newName: string): Promise<AIPromptTemplate>;
  incrementUsageCount(schoolId: string, id: string): Promise<void>;
  updateRating(schoolId: string, id: string, rating: number): Promise<void>;
  publish(schoolId: string, id: string): Promise<AIPromptTemplate>;
  unpublish(schoolId: string, id: string): Promise<AIPromptTemplate>;
  share(schoolId: string, id: string, sharedWith: string[]): Promise<void>;
  unshare(schoolId: string, id: string, userId: string): Promise<void>;
  getSharedWith(schoolId: string, id: string): Promise<string[]>;
  getVariables(schoolId: string, id: string): Promise<PromptVariable[]>;
  updateVariables(schoolId: string, id: string, variables: PromptVariable[]): Promise<AIPromptTemplate>;
  getVersions(schoolId: string, promptId: string): Promise<AIPromptVersion[]>;
  getCurrentVersion(schoolId: string, promptId: string): Promise<AIPromptVersion | null>;
  rollbackVersion(schoolId: string, promptId: string, version: number): Promise<AIPromptTemplate>;
  getPerformance(schoolId: string, promptId: string): Promise<PromptPerformance | null>;
  getAnalytics(schoolId: string, promptId: string, period: string): Promise<PromptPerformanceAnalytics | null>;
  getExecutionHistory(schoolId: string, promptId: string, dateRange: DateRange): Promise<AIPromptExecution[]>;
  validate(schoolId: string, id: string): Promise<boolean>;
  searchByContent(schoolId: string, query: string): Promise<AIPromptTemplate[]>;
  exportTemplates(schoolId: string, ids: string[]): Promise<AIPromptTemplate[]>;
  importTemplates(schoolId: string, templates: Partial<AIPromptTemplate>[]): Promise<AIPromptTemplate[]>;
  bulkDelete(schoolId: string, ids: string[]): Promise<void>;
}

// ============================================================================
// 3. AiPromptVersionRepository (30 methods)
// ============================================================================

export interface AiPromptVersionRepository {
  findById(schoolId: string, id: string): Promise<AIPromptVersion | null>;
  findByPromptId(schoolId: string, promptId: string): Promise<AIPromptVersion[]>;
  findLatestVersion(schoolId: string, promptId: string): Promise<AIPromptVersion | null>;
  findVersion(schoolId: string, promptId: string, version: number): Promise<AIPromptVersion | null>;
  findPublishedVersions(schoolId: string, promptId: string): Promise<AIPromptVersion[]>;
  create(schoolId: string, data: Partial<AIPromptVersion>): Promise<AIPromptVersion>;
  update(schoolId: string, id: string, data: Partial<AIPromptVersion>): Promise<AIPromptVersion>;
  delete(schoolId: string, id: string): Promise<void>;
  publish(schoolId: string, id: string): Promise<AIPromptVersion>;
  unpublish(schoolId: string, id: string): Promise<AIPromptVersion>;
  getLatestByPromptId(schoolId: string, promptId: string): Promise<AIPromptVersion>;
  compareVersions(schoolId: string, promptId: string, versionA: number, versionB: number): Promise<AIPromptVersion[]>;
  getVersionHistory(schoolId: string, promptId: string): Promise<AIPromptVersion[]>;
  getRecentVersions(schoolId: string, promptId: string, limit: number): Promise<AIPromptVersion[]>;
  duplicateVersion(schoolId: string, versionId: string, newVersion: number): Promise<AIPromptVersion>;
  archiveVersion(schoolId: string, id: string): Promise<AIPromptVersion>;
  restoreVersion(schoolId: string, id: string): Promise<AIPromptVersion>;
  getPerformanceMetrics(schoolId: string, promptId: string): Promise<PromptPerformance[]>;
  getPerformanceMetricsByVersion(schoolId: string, versionId: string): Promise<PromptPerformance | null>;
  recordExecution(schoolId: string, versionId: string, execution: Partial<AIPromptExecution>): Promise<void>;
  getExecutions(schoolId: string, versionId: string, dateRange: DateRange): Promise<AIPromptExecution[]>;
  getExecutionsByPrompt(schoolId: string, promptId: string, dateRange: DateRange): Promise<AIPromptExecution[]>;
  getTestResults(schoolId: string, versionId: string): Promise<PromptTestResult[]>;
  runTests(schoolId: string, versionId: string): Promise<PromptTestResult[]>;
  getQualityScores(schoolId: string, promptId: string): Promise<EvaluationScore[]>;
  getAverageQuality(schoolId: string, promptId: string): Promise<number>;
  getAverageLatency(schoolId: string, promptId: string): Promise<number>;
  getAverageCost(schoolId: string, promptId: string): Promise<number>;
  getTotalUsageCount(schoolId: string, promptId: string): Promise<number>;
  getVersionsWithPerformance(schoolId: string, promptId: string): Promise<(AIPromptVersion & { performance: PromptPerformance })[]>;
}

// ============================================================================
// 4. AiSessionRepository (35 methods)
// ============================================================================

export interface AiSessionRepository {
  findById(schoolId: string, id: string): Promise<AISession | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AISession>>;
  findByUserId(schoolId: string, userId: string): Promise<AISession[]>;
  findByModelId(schoolId: string, modelId: string): Promise<AISession[]>;
  findByStatus(schoolId: string, status: AISessionStatus): Promise<AISession[]>;
  findActiveSessions(schoolId: string): Promise<AISession[]>;
  findCompletedSessions(schoolId: string): Promise<AISession[]>;
  findFailedSessions(schoolId: string): Promise<AISession[]>;
  findExpiredSessions(schoolId: string): Promise<AISession[]>;
  findPausedSessions(schoolId: string): Promise<AISession[]>;
  create(schoolId: string, data: Partial<AISession>): Promise<AISession>;
  update(schoolId: string, id: string, data: Partial<AISession>): Promise<AISession>;
  delete(schoolId: string, id: string): Promise<void>;
  pause(schoolId: string, id: string): Promise<AISession>;
  resume(schoolId: string, id: string): Promise<AISession>;
  complete(schoolId: string, id: string): Promise<AISession>;
  fail(schoolId: string, id: string, error: string): Promise<AISession>;
  expire(schoolId: string, id: string): Promise<AISession>;
  getSessionAnalytics(schoolId: string, id: string): Promise<AISessionAnalytics | null>;
  getSessionTokens(schoolId: string, id: string): Promise<TokenUsage | null>;
  getSessionCost(schoolId: string, id: string): Promise<number>;
  updateSessionTokens(schoolId: string, id: string, tokens: TokenUsage): Promise<void>;
  incrementMessageCount(schoolId: string, id: string): Promise<void>;
  updateLastMessageAt(schoolId: string, id: string): Promise<void>;
  getActiveSessionsByUser(schoolId: string, userId: string): Promise<AISession[]>;
  getRecentSessions(schoolId: string, userId: string, limit: number): Promise<AISession[]>;
  getSessionsByDateRange(schoolId: string, dateRange: DateRange): Promise<AISession[]>;
  getSessionsByUserAndDateRange(schoolId: string, userId: string, dateRange: DateRange): Promise<AISession[]>;
  getTotalCostByUser(schoolId: string, userId: string, dateRange: DateRange): Promise<number>;
  getTotalCostByModel(schoolId: string, modelId: string, dateRange: DateRange): Promise<number>;
  getAverageSessionDuration(schoolId: string, dateRange: DateRange): Promise<number>;
  getAverageTokensPerSession(schoolId: string, dateRange: DateRange): Promise<number>;
  terminateInactiveSessions(schoolId: string, inactiveMinutes: number): Promise<number>;
  bulkDelete(schoolId: string, ids: string[]): Promise<void>;
  getSessionsByModelAndStatus(schoolId: string, modelId: string, status: AISessionStatus): Promise<AISession[]>;
}

// ============================================================================
// 5. AiMessageRepository (35 methods)
// ============================================================================

export interface AiMessageRepository {
  findById(schoolId: string, id: string): Promise<AIMessage | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIMessage>>;
  findByConversationId(schoolId: string, conversationId: string): Promise<AIMessage[]>;
  findBySessionId(schoolId: string, sessionId: string): Promise<AIMessage[]>;
  findByRole(schoolId: string, role: AIConversationRole): Promise<AIMessage[]>;
  findByModelId(schoolId: string, modelId: string): Promise<AIMessage[]>;
  findByStatus(schoolId: string, status: AIMessageStatus): Promise<AIMessage[]>;
  findPendingMessages(schoolId: string): Promise<AIMessage[]>;
  findStreamingMessages(schoolId: string): Promise<AIMessage[]>;
  findCompletedMessages(schoolId: string): Promise<AIMessage[]>;
  findFailedMessages(schoolId: string): Promise<AIMessage[]>;
  findCancelledMessages(schoolId: string): Promise<AIMessage[]>;
  create(schoolId: string, data: Partial<AIMessage>): Promise<AIMessage>;
  update(schoolId: string, id: string, data: Partial<AIMessage>): Promise<AIMessage>;
  delete(schoolId: string, id: string): Promise<void>;
  markAsCompleted(schoolId: string, id: string): Promise<AIMessage>;
  markAsFailed(schoolId: string, id: string, error: string): Promise<AIMessage>;
  markAsCancelled(schoolId: string, id: string): Promise<AIMessage>;
  markAsStreaming(schoolId: string, id: string): Promise<AIMessage>;
  getMessageTokens(schoolId: string, id: string): Promise<number>;
  getMessageLatency(schoolId: string, id: string): Promise<number>;
  getMessageCost(schoolId: string, id: string): Promise<number>;
  getConversationMessages(schoolId: string, conversationId: string, limit: number): Promise<AIMessage[]>;
  getRecentMessages(schoolId: string, conversationId: string, limit: number): Promise<AIMessage[]>;
  getMessageHistory(schoolId: string, conversationId: string, dateRange: DateRange): Promise<AIMessage[]>;
  getMessageCountByConversation(schoolId: string, conversationId: string): Promise<number>;
  getMessageCountByUser(schoolId: string, userId: string, dateRange: DateRange): Promise<number>;
  getMessageCountByModel(schoolId: string, modelId: string, dateRange: DateRange): Promise<number>;
  getAverageMessageLatency(schoolId: string, modelId: string, dateRange: DateRange): Promise<number>;
  getAverageMessageTokens(schoolId: string, modelId: string, dateRange: DateRange): Promise<number>;
  getMessageTokensByRole(schoolId: string, conversationId: string): Promise<Record<AIConversationRole, number>>;
  getMessageTokensByModel(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  getMessageTokensByUser(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  searchMessages(schoolId: string, query: string, conversationId?: string): Promise<AIMessage[]>;
  bulkDelete(schoolId: string, ids: string[]): Promise<void>;
}

// ============================================================================
// 6. AiContextRepository (35 methods)
// ============================================================================

export interface AiContextRepository {
  findById(schoolId: string, id: string): Promise<AIContext | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIContext>>;
  findBySessionId(schoolId: string, sessionId: string): Promise<AIContext[]>;
  findByType(schoolId: string, type: string): Promise<AIContext[]>;
  findBySource(schoolId: string, source: string): Promise<AIContext[]>;
  findByRelevanceScore(schoolId: string, minScore: number): Promise<AIContext[]>;
  findByTokenCount(schoolId: string, maxTokens: number): Promise<AIContext[]>;
  create(schoolId: string, data: Partial<AIContext>): Promise<AIContext>;
  update(schoolId: string, id: string, data: Partial<AIContext>): Promise<AIContext>;
  delete(schoolId: string, id: string): Promise<void>;
  deleteBySessionId(schoolId: string, sessionId: string): Promise<void>;
  deleteExpired(schoolId: string): Promise<number>;
  getExpiredContexts(schoolId: string): Promise<AIContext[]>;
  getActiveContexts(schoolId: string, sessionId: string): Promise<AIContext[]>;
  getContextWindow(schoolId: string, sessionId: string): Promise<AIContextWindow | null>;
  buildContextWindow(schoolId: string, sessionId: string, maxTokens: number): Promise<AIContextWindow>;
  trimContextWindow(schoolId: string, sessionId: string, targetTokens: number): Promise<AIContextWindow>;
  injectContext(schoolId: string, contextId: string, sessionId: string, position: number): Promise<void>;
  removeContextInjection(schoolId: string, contextId: string, sessionId: string): Promise<void>;
  getContextInjections(schoolId: string, sessionId: string): Promise<AIContextInjection[]>;
  reorderInjections(schoolId: string, sessionId: string, order: string[]): Promise<void>;
  getTotalTokenCount(schoolId: string, sessionId: string): Promise<number>;
  searchContexts(schoolId: string, query: string, sessionId?: string): Promise<AIContext[]>;
  getContextByPriority(schoolId: string, sessionId: string, limit: number): Promise<AIContext[]>;
  getRecentContexts(schoolId: string, sessionId: string, limit: number): Promise<AIContext[]>;
  getContextsByDateRange(schoolId: string, dateRange: DateRange): Promise<AIContext[]>;
  getContextSummary(schoolId: string, sessionId: string): Promise<string>;
  archiveContext(schoolId: string, id: string): Promise<AIContext>;
  restoreContext(schoolId: string, id: string): Promise<AIContext>;
  getContextStats(schoolId: string, sessionId: string): Promise<{ total: number; totalTokens: number; avgRelevance: number }>;
  getContextSources(schoolId: string): Promise<AIContextSource[]>;
  createContextSource(schoolId: string, data: Partial<AIContextSource>): Promise<AIContextSource>;
  updateContextSource(schoolId: string, id: string, data: Partial<AIContextSource>): Promise<AIContextSource>;
  deleteContextSource(schoolId: string, id: string): Promise<void>;
}

// ============================================================================
// 7. AiPreferenceRepository (25 methods)
// ============================================================================

export interface AiPreferenceRepository {
  getSchoolConfig(schoolId: string): Promise<AISchoolConfig | null>;
  createSchoolConfig(schoolId: string, data: Partial<AISchoolConfig>): Promise<AISchoolConfig>;
  updateSchoolConfig(schoolId: string, data: Partial<AISchoolConfig>): Promise<AISchoolConfig>;
  deleteSchoolConfig(schoolId: string): Promise<void>;
  getUserPreference(schoolId: string, userId: string): Promise<AIUserPreference | null>;
  createUserPreference(schoolId: string, userId: string, data: Partial<AIUserPreference>): Promise<AIUserPreference>;
  updateUserPreference(schoolId: string, userId: string, data: Partial<AIUserPreference>): Promise<AIUserPreference>;
  deleteUserPreference(schoolId: string, userId: string): Promise<void>;
  getAccessControl(schoolId: string, userId?: string, role?: string): Promise<AIAccessControl | null>;
  createAccessControl(schoolId: string, data: Partial<AIAccessControl>): Promise<AIAccessControl>;
  updateAccessControl(schoolId: string, id: string, data: Partial<AIAccessControl>): Promise<AIAccessControl>;
  deleteAccessControl(schoolId: string, id: string): Promise<void>;
  getAccessControlsBySchool(schoolId: string): Promise<AIAccessControl[]>;
  getAccessControlsByUser(schoolId: string, userId: string): Promise<AIAccessControl[]>;
  getAccessControlsByRole(schoolId: string, role: string): Promise<AIAccessControl[]>;
  getFeatureFlag(schoolId: string, feature: string): Promise<AIFeatureFlag | null>;
  getFeatureFlags(schoolId: string): Promise<AIFeatureFlag[]>;
  createFeatureFlag(schoolId: string, data: Partial<AIFeatureFlag>): Promise<AIFeatureFlag>;
  updateFeatureFlag(schoolId: string, id: string, data: Partial<AIFeatureFlag>): Promise<AIFeatureFlag>;
  deleteFeatureFlag(schoolId: string, id: string): Promise<void>;
  toggleFeatureFlag(schoolId: string, id: string): Promise<AIFeatureFlag>;
  getBillingConfig(schoolId: string): Promise<AIBillingConfig | null>;
  updateBillingConfig(schoolId: string, data: Partial<AIBillingConfig>): Promise<AIBillingConfig>;
  getAuditEntries(schoolId: string, query: AiQuery): Promise<QueryResult<AIAuditEntry>>;
  getAuditEntriesByUser(schoolId: string, userId: string): Promise<AIAuditEntry[]>;
}

// ============================================================================
// 8. AiAgentRepository (35 methods)
// ============================================================================

export interface AiAgentRepository {
  findById(schoolId: string, id: string): Promise<AIAgent | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIAgent>>;
  findByType(schoolId: string, type: AIAgentType): Promise<AIAgent[]>;
  findByStatus(schoolId: string, status: AIAgentStatus): Promise<AIAgent[]>;
  findByName(schoolId: string, name: string): Promise<AIAgent | null>;
  findActiveAgents(schoolId: string): Promise<AIAgent[]>;
  findInactiveAgents(schoolId: string): Promise<AIAgent[]>;
  findTrainingAgents(schoolId: string): Promise<AIAgent[]>;
  findErrorAgents(schoolId: string): Promise<AIAgent[]>;
  findByModelId(schoolId: string, modelId: string): Promise<AIAgent[]>;
  findByCapability(schoolId: string, capability: AIAgentCapability): Promise<AIAgent[]>;
  create(schoolId: string, data: Partial<AIAgent>): Promise<AIAgent>;
  update(schoolId: string, id: string, data: Partial<AIAgent>): Promise<AIAgent>;
  delete(schoolId: string, id: string): Promise<void>;
  activate(schoolId: string, id: string): Promise<AIAgent>;
  deactivate(schoolId: string, id: string): Promise<AIAgent>;
  setMaintenanceMode(schoolId: string, id: string): Promise<AIAgent>;
  getAgentTools(schoolId: string, agentId: string): Promise<AIAgentTool[]>;
  addTool(schoolId: string, agentId: string, tool: Partial<AIAgentTool>): Promise<AIAgentTool>;
  updateTool(schoolId: string, toolId: string, data: Partial<AIAgentTool>): Promise<AIAgentTool>;
  removeTool(schoolId: string, toolId: string): Promise<void>;
  getAgentConfig(schoolId: string, agentId: string): Promise<AIAgentConfig | null>;
  updateAgentConfig(schoolId: string, agentId: string, config: Partial<AIAgentConfig>): Promise<AIAgentConfig>;
  getAgentAnalytics(schoolId: string, agentId: string, period: string): Promise<AIAgentAnalytics | null>;
  getAgentAnalyticsHistory(schoolId: string, agentId: string, dateRange: DateRange): Promise<AIAgentAnalytics[]>;
  getAgentPermissions(schoolId: string, agentId: string): Promise<AIAgentPermission[]>;
  addPermission(schoolId: string, agentId: string, permission: Partial<AIAgentPermission>): Promise<AIAgentPermission>;
  updatePermission(schoolId: string, permissionId: string, data: Partial<AIAgentPermission>): Promise<AIAgentPermission>;
  removePermission(schoolId: string, permissionId: string): Promise<void>;
  getAgentMemory(schoolId: string, agentId: string): Promise<AIAgentMemory[]>;
  addMemory(schoolId: string, agentId: string, memory: Partial<AIAgentMemory>): Promise<AIAgentMemory>;
  clearMemory(schoolId: string, agentId: string): Promise<void>;
  getAgentVersion(schoolId: string, agentId: string): Promise<AIAgentVersion | null>;
  getAgentVersions(schoolId: string, agentId: string): Promise<AIAgentVersion[]>;
}

// ============================================================================
// 9. AiAgentTaskRepository (30 methods)
// ============================================================================

export interface AiAgentTaskRepository {
  findById(schoolId: string, id: string): Promise<AIAgentExecution | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIAgentExecution>>;
  findByAgentId(schoolId: string, agentId: string): Promise<AIAgentExecution[]>;
  findByUserId(schoolId: string, userId: string): Promise<AIAgentExecution[]>;
  findByStatus(schoolId: string, status: string): Promise<AIAgentExecution[]>;
  findPendingTasks(schoolId: string): Promise<AIAgentExecution[]>;
  findRunningTasks(schoolId: string): Promise<AIAgentExecution[]>;
  findCompletedTasks(schoolId: string): Promise<AIAgentExecution[]>;
  findFailedTasks(schoolId: string): Promise<AIAgentExecution[]>;
  create(schoolId: string, data: Partial<AIAgentExecution>): Promise<AIAgentExecution>;
  update(schoolId: string, id: string, data: Partial<AIAgentExecution>): Promise<AIAgentExecution>;
  delete(schoolId: string, id: string): Promise<void>;
  startTask(schoolId: string, id: string): Promise<AIAgentExecution>;
  completeTask(schoolId: string, id: string, output: string): Promise<AIAgentExecution>;
  failTask(schoolId: string, id: string, error: string): Promise<AIAgentExecution>;
  cancelTask(schoolId: string, id: string): Promise<AIAgentExecution>;
  retryTask(schoolId: string, id: string): Promise<AIAgentExecution>;
  getTaskMessages(schoolId: string, executionId: string): Promise<AIAgentMessage[]>;
  addTaskMessage(schoolId: string, executionId: string, message: Partial<AIAgentMessage>): Promise<AIAgentMessage>;
  getTaskCost(schoolId: string, executionId: string): Promise<number>;
  getTaskDuration(schoolId: string, executionId: string): Promise<number>;
  getAgentTasksByDateRange(schoolId: string, agentId: string, dateRange: DateRange): Promise<AIAgentExecution[]>;
  getAgentTaskStats(schoolId: string, agentId: string, dateRange: DateRange): Promise<{ total: number; completed: number; failed: number; avgDuration: number }>;
  getAgentTaskCost(schoolId: string, agentId: string, dateRange: DateRange): Promise<number>;
  getUserTasks(schoolId: string, userId: string, dateRange: DateRange): Promise<AIAgentExecution[]>;
  getRecentTasks(schoolId: string, agentId: string, limit: number): Promise<AIAgentExecution[]>;
  getLongRunningTasks(schoolId: string, thresholdMs: number): Promise<AIAgentExecution[]>;
  bulkUpdateStatus(schoolId: string, ids: string[], status: string): Promise<void>;
  bulkDelete(schoolId: string, ids: string[]): Promise<void>;
  getTaskDelegations(schoolId: string, executionId: string): Promise<AIAgentDelegation[]>;
}

// ============================================================================
// 10. AiStudentAssistantRepository (35 methods)
// ============================================================================

export interface AiStudentAssistantRepository {
  findTutorSession(schoolId: string, id: string): Promise<TutorSession | null>;
  findTutorSessions(schoolId: string, studentId: string): Promise<TutorSession[]>;
  findTutorSessionsBySubject(schoolId: string, studentId: string, subjectId: string): Promise<TutorSession[]>;
  createTutorSession(schoolId: string, data: Partial<TutorSession>): Promise<TutorSession>;
  updateTutorSession(schoolId: string, id: string, data: Partial<TutorSession>): Promise<TutorSession>;
  deleteTutorSession(schoolId: string, id: string): Promise<void>;
  completeTutorSession(schoolId: string, id: string): Promise<TutorSession>;
  getTutorMessages(schoolId: string, sessionId: string): Promise<TutorMessage[]>;
  addTutorMessage(schoolId: string, sessionId: string, message: Partial<TutorMessage>): Promise<TutorMessage>;
  findLearningPlan(schoolId: string, id: string): Promise<LearningCoachPlan | null>;
  findLearningPlansByStudent(schoolId: string, studentId: string): Promise<LearningCoachPlan[]>;
  createLearningPlan(schoolId: string, data: Partial<LearningCoachPlan>): Promise<LearningCoachPlan>;
  updateLearningPlan(schoolId: string, id: string, data: Partial<LearningCoachPlan>): Promise<LearningCoachPlan>;
  deleteLearningPlan(schoolId: string, id: string): Promise<void>;
  findRevisionPlan(schoolId: string, id: string): Promise<RevisionPlan | null>;
  findRevisionPlansByStudent(schoolId: string, studentId: string): Promise<RevisionPlan[]>;
  createRevisionPlan(schoolId: string, data: Partial<RevisionPlan>): Promise<RevisionPlan>;
  updateRevisionPlan(schoolId: string, id: string, data: Partial<RevisionPlan>): Promise<RevisionPlan>;
  deleteRevisionPlan(schoolId: string, id: string): Promise<void>;
  findFlashcardDeck(schoolId: string, id: string): Promise<FlashcardDeck | null>;
  findFlashcardDecks(schoolId: string, studentId: string): Promise<FlashcardDeck[]>;
  createFlashcardDeck(schoolId: string, data: Partial<FlashcardDeck>): Promise<FlashcardDeck>;
  updateFlashcardDeck(schoolId: string, id: string, data: Partial<FlashcardDeck>): Promise<FlashcardDeck>;
  deleteFlashcardDeck(schoolId: string, id: string): Promise<void>;
  findAdaptivePath(schoolId: string, id: string): Promise<AdaptivePath | null>;
  findAdaptivePathsByStudent(schoolId: string, studentId: string): Promise<AdaptivePath[]>;
  createAdaptivePath(schoolId: string, data: Partial<AdaptivePath>): Promise<AdaptivePath>;
  updateAdaptivePath(schoolId: string, id: string, data: Partial<AdaptivePath>): Promise<AdaptivePath>;
  deleteAdaptivePath(schoolId: string, id: string): Promise<void>;
  findWeaknessReport(schoolId: string, id: string): Promise<WeaknessReport | null>;
  findWeaknessReportsByStudent(schoolId: string, studentId: string): Promise<WeaknessReport[]>;
  createWeaknessReport(schoolId: string, data: Partial<WeaknessReport>): Promise<WeaknessReport>;
  findStudySchedule(schoolId: string, id: string): Promise<StudySchedule | null>;
  findStudySchedulesByStudent(schoolId: string, studentId: string): Promise<StudySchedule[]>;
  createStudySchedule(schoolId: string, data: Partial<StudySchedule>): Promise<StudySchedule>;
}

// ============================================================================
// 11. AiTeacherAssistantRepository (35 methods)
// ============================================================================

export interface AiTeacherAssistantRepository {
  findTeachingSession(schoolId: string, id: string): Promise<TeachingAssistantSession | null>;
  findTeachingSessions(schoolId: string, teacherId: string): Promise<TeachingAssistantSession[]>;
  findTeachingSessionsByClass(schoolId: string, teacherId: string, classId: string): Promise<TeachingAssistantSession[]>;
  createTeachingSession(schoolId: string, data: Partial<TeachingAssistantSession>): Promise<TeachingAssistantSession>;
  updateTeachingSession(schoolId: string, id: string, data: Partial<TeachingAssistantSession>): Promise<TeachingAssistantSession>;
  deleteTeachingSession(schoolId: string, id: string): Promise<void>;
  completeTeachingSession(schoolId: string, id: string): Promise<TeachingAssistantSession>;
  getTeachingMessages(schoolId: string, sessionId: string): Promise<AssistantMessage[]>;
  addTeachingMessage(schoolId: string, sessionId: string, message: Partial<AssistantMessage>): Promise<AssistantMessage>;
  findContentImprovement(schoolId: string, id: string): Promise<ContentImprovement | null>;
  findContentImprovementsByTeacher(schoolId: string, teacherId: string): Promise<ContentImprovement[]>;
  createContentImprovement(schoolId: string, data: Partial<ContentImprovement>): Promise<ContentImprovement>;
  findExerciseSet(schoolId: string, id: string): Promise<ExerciseSet | null>;
  findExerciseSets(schoolId: string, teacherId: string): Promise<ExerciseSet[]>;
  findExerciseSetsBySubject(schoolId: string, teacherId: string, subjectId: string): Promise<ExerciseSet[]>;
  createExerciseSet(schoolId: string, data: Partial<ExerciseSet>): Promise<ExerciseSet>;
  updateExerciseSet(schoolId: string, id: string, data: Partial<ExerciseSet>): Promise<ExerciseSet>;
  deleteExerciseSet(schoolId: string, id: string): Promise<void>;
  findClassInsight(schoolId: string, id: string): Promise<ClassInsight | null>;
  findClassInsightsByTeacher(schoolId: string, teacherId: string): Promise<ClassInsight[]>;
  findClassInsightsByClass(schoolId: string, classId: string): Promise<ClassInsight[]>;
  createClassInsight(schoolId: string, data: Partial<ClassInsight>): Promise<ClassInsight>;
  findLessonSummary(schoolId: string, id: string): Promise<LessonSummary | null>;
  findLessonSummaries(schoolId: string, teacherId: string): Promise<LessonSummary[]>;
  createLessonSummary(schoolId: string, data: Partial<LessonSummary>): Promise<LessonSummary>;
  findAutoFeedback(schoolId: string, id: string): Promise<AutoFeedback | null>;
  findAutoFeedbacksByTeacher(schoolId: string, teacherId: string): Promise<AutoFeedback[]>;
  createAutoFeedback(schoolId: string, data: Partial<AutoFeedback>): Promise<AutoFeedback>;
  findClassroomRecommendation(schoolId: string, id: string): Promise<ClassroomRecommendation | null>;
  findClassroomRecommendations(schoolId: string, classId: string): Promise<ClassroomRecommendation[]>;
  createClassroomRecommendation(schoolId: string, data: Partial<ClassroomRecommendation>): Promise<ClassroomRecommendation>;
  findStudentInsight(schoolId: string, id: string): Promise<StudentInsight | null>;
  findStudentInsightsByTeacher(schoolId: string, teacherId: string): Promise<StudentInsight[]>;
  findStudentInsightsByStudent(schoolId: string, studentId: string): Promise<StudentInsight[]>;
}

// ============================================================================
// 12. AiParentAssistantRepository (30 methods)
// ============================================================================

export interface AiParentAssistantRepository {
  findParentInsight(schoolId: string, id: string): Promise<AIInsight | null>;
  findParentInsights(schoolId: string, userId: string): Promise<AIInsight[]>;
  createParentInsight(schoolId: string, data: Partial<AIInsight>): Promise<AIInsight>;
  findParentRecommendation(schoolId: string, id: string): Promise<AIRecommendation | null>;
  findParentRecommendations(schoolId: string, userId: string): Promise<AIRecommendation[]>;
  createParentRecommendation(schoolId: string, data: Partial<AIRecommendation>): Promise<AIRecommendation>;
  getChildProgress(schoolId: string, parentId: string, studentId: string): Promise<Record<string, unknown> | null>;
  getChildAttendanceSummary(schoolId: string, parentId: string, studentId: string): Promise<Record<string, unknown> | null>;
  getChildGradeSummary(schoolId: string, parentId: string, studentId: string): Promise<Record<string, unknown> | null>;
  getChildBehaviorReport(schoolId: string, parentId: string, studentId: string): Promise<Record<string, unknown> | null>;
  getParentNotificationConfig(schoolId: string, userId: string): Promise<AINotificationConfig | null>;
  updateParentNotificationConfig(schoolId: string, userId: string, config: Partial<AINotificationConfig>): Promise<AINotificationConfig>;
  getParentFeedback(schoolId: string, userId: string): Promise<AIFeedback[]>;
  createParentFeedback(schoolId: string, data: Partial<AIFeedback>): Promise<AIFeedback>;
  getParentConversationHistory(schoolId: string, userId: string, studentId: string): Promise<AIConversation[]>;
  getParentMeetingSuggestions(schoolId: string, userId: string, studentId: string): Promise<Record<string, unknown>[]>;
  getParentResourceRecommendations(schoolId: string, userId: string, studentId: string): Promise<AIRecommendation[]>;
  getParentCommunicationPreference(schoolId: string, userId: string): Promise<AIUserPreference | null>;
  updateParentCommunicationPreference(schoolId: string, userId: string, preference: Partial<AIUserPreference>): Promise<AIUserPreference>;
  getParentActivityLog(schoolId: string, userId: string, dateRange: DateRange): Promise<AIAuditEntry[]>;
  getParentStudentComparison(schoolId: string, parentId: string, studentIds: string[]): Promise<Record<string, unknown>>;
  getParentActionItems(schoolId: string, userId: string): Promise<Record<string, unknown>[]>;
  getParentAlerts(schoolId: string, userId: string): Promise<AIInsight[]>;
  createParentAlert(schoolId: string, data: Partial<AIInsight>): Promise<AIInsight>;
  dismissParentAlert(schoolId: string, alertId: string): Promise<void>;
  getParentSupportTicket(schoolId: string, userId: string): Promise<Record<string, unknown>[]>;
  createParentSupportTicket(schoolId: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
  getParentSatisfactionScore(schoolId: string, userId: string): Promise<number>;
  getParentEngagementMetrics(schoolId: string, userId: string): Promise<Record<string, unknown>>;
  getParentDashboardData(schoolId: string, userId: string): Promise<Record<string, unknown>>;
}

// ============================================================================
// 13. AiAdminAssistantRepository (35 methods)
// ============================================================================

export interface AiAdminAssistantRepository {
  findAdminInsight(schoolId: string, id: string): Promise<AIInsight | null>;
  findAdminInsights(schoolId: string, query: AiQuery): Promise<QueryResult<AIInsight>>;
  createAdminInsight(schoolId: string, data: Partial<AIInsight>): Promise<AIInsight>;
  findAdminRecommendation(schoolId: string, id: string): Promise<AIRecommendation | null>;
  findAdminRecommendations(schoolId: string, query: AiQuery): Promise<QueryResult<AIRecommendation>>;
  createAdminRecommendation(schoolId: string, data: Partial<AIRecommendation>): Promise<AIRecommendation>;
  getSchoolPerformanceMetrics(schoolId: string): Promise<Record<string, unknown>>;
  getStaffPerformanceMetrics(schoolId: string): Promise<Record<string, unknown>>;
  getStudentPerformanceMetrics(schoolId: string): Promise<Record<string, unknown>>;
  getFinancialMetrics(schoolId: string): Promise<Record<string, unknown>>;
  getOperationalMetrics(schoolId: string): Promise<Record<string, unknown>>;
  getEnrollmentTrends(schoolId: string): Promise<Record<string, unknown>[]>;
  getAttendanceTrends(schoolId: string): Promise<Record<string, unknown>[]>;
  getGradeTrends(schoolId: string): Promise<Record<string, unknown>[]>;
  getRetentionRates(schoolId: string): Promise<Record<string, unknown>>;
  getBudgetForecast(schoolId: string): Promise<Record<string, unknown>>;
  getCostOptimizationSuggestions(schoolId: string): Promise<AIOptimizationSuggestion[]>;
  getRiskAssessment(schoolId: string): Promise<Record<string, unknown>>;
  getComplianceStatus(schoolId: string): Promise<Record<string, unknown>>;
  getAuditSummary(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  generateReport(schoolId: string, reportType: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getPredictiveAnalytics(schoolId: string, metric: string): Promise<Record<string, unknown>>;
  getBenchmarkComparison(schoolId: string): Promise<Record<string, unknown>>;
  getImprovementPlan(schoolId: string, area: string): Promise<Record<string, unknown>>;
  getTaskList(schoolId: string, userId: string): Promise<Record<string, unknown>[]>;
  createTask(schoolId: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
  updateTask(schoolId: string, taskId: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
  deleteTask(schoolId: string, taskId: string): Promise<void>;
  getStrategicPlan(schoolId: string): Promise<Record<string, unknown>>;
  updateStrategicPlan(schoolId: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
  getKPIDashboard(schoolId: string): Promise<Record<string, unknown>>;
  getNotificationDigest(schoolId: string, userId: string): Promise<Record<string, unknown>>;
  getAnnouncementSuggestions(schoolId: string): Promise<Record<string, unknown>[]>;
  getCommunicationTemplates(schoolId: string): Promise<Record<string, unknown>[]>;
  createCommunicationTemplate(schoolId: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
}

// ============================================================================
// 14. AiCurriculumRepository (35 methods)
// ============================================================================

export interface AiCurriculumRepository {
  findCurriculumStructure(schoolId: string, id: string): Promise<CurriculumStructure | null>;
  findCurriculumStructures(schoolId: string): Promise<CurriculumStructure[]>;
  createCurriculumStructure(schoolId: string, data: Partial<CurriculumStructure>): Promise<CurriculumStructure>;
  updateCurriculumStructure(schoolId: string, id: string, data: Partial<CurriculumStructure>): Promise<CurriculumStructure>;
  deleteCurriculumStructure(schoolId: string, id: string): Promise<void>;
  findCompetencyMap(schoolId: string, id: string): Promise<CompetencyMap | null>;
  findCompetencyMaps(schoolId: string, subjectId?: string): Promise<CompetencyMap[]>;
  createCompetencyMap(schoolId: string, data: Partial<CompetencyMap>): Promise<CompetencyMap>;
  updateCompetencyMap(schoolId: string, id: string, data: Partial<CompetencyMap>): Promise<CompetencyMap>;
  deleteCompetencyMap(schoolId: string, id: string): Promise<void>;
  findLearningObjective(schoolId: string, id: string): Promise<LearningObjective | null>;
  findLearningObjectives(schoolId: string, subjectId: string): Promise<LearningObjective[]>;
  createLearningObjective(schoolId: string, data: Partial<LearningObjective>): Promise<LearningObjective>;
  updateLearningObjective(schoolId: string, id: string, data: Partial<LearningObjective>): Promise<LearningObjective>;
  deleteLearningObjective(schoolId: string, id: string): Promise<void>;
  findLessonPlan(schoolId: string, id: string): Promise<LessonPlan | null>;
  findLessonPlans(schoolId: string, teacherId?: string, classId?: string): Promise<LessonPlan[]>;
  createLessonPlan(schoolId: string, data: Partial<LessonPlan>): Promise<LessonPlan>;
  updateLessonPlan(schoolId: string, id: string, data: Partial<LessonPlan>): Promise<LessonPlan>;
  deleteLessonPlan(schoolId: string, id: string): Promise<void>;
  findCourseContent(schoolId: string, id: string): Promise<CourseContent | null>;
  findCourseContents(schoolId: string, subjectId?: string): Promise<CourseContent[]>;
  createCourseContent(schoolId: string, data: Partial<CourseContent>): Promise<CourseContent>;
  updateCourseContent(schoolId: string, id: string, data: Partial<CourseContent>): Promise<CourseContent>;
  deleteCourseContent(schoolId: string, id: string): Promise<void>;
  findBloomDistribution(schoolId: string, id: string): Promise<BloomDistribution | null>;
  findBloomDistributions(schoolId: string, examId?: string): Promise<BloomDistribution[]>;
  createBloomDistribution(schoolId: string, data: Partial<BloomDistribution>): Promise<BloomDistribution>;
  findExamPaper(schoolId: string, id: string): Promise<ExamPaper | null>;
  findExamPapers(schoolId: string, subjectId?: string, classId?: string): Promise<ExamPaper[]>;
  createExamPaper(schoolId: string, data: Partial<ExamPaper>): Promise<ExamPaper>;
  updateExamPaper(schoolId: string, id: string, data: Partial<ExamPaper>): Promise<ExamPaper>;
  deleteExamPaper(schoolId: string, id: string): Promise<void>;
  generateExamFromCompetencies(schoolId: string, subjectId: string, competencies: string[]): Promise<ExamPaper>;
}

// ============================================================================
// 15. AiDocumentProcessingRepository (35 methods)
// ============================================================================

export interface AiDocumentProcessingRepository {
  findOCRResult(schoolId: string, id: string): Promise<OCRResult | null>;
  findOCRResults(schoolId: string, fileId?: string): Promise<OCRResult[]>;
  createOCRResult(schoolId: string, data: Partial<OCRResult>): Promise<OCRResult>;
  deleteOCRResult(schoolId: string, id: string): Promise<void>;
  findDocumentClassification(schoolId: string, id: string): Promise<DocumentClassification | null>;
  findDocumentClassifications(schoolId: string, fileId?: string): Promise<DocumentClassification[]>;
  createDocumentClassification(schoolId: string, data: Partial<DocumentClassification>): Promise<DocumentClassification>;
  findAutoTag(schoolId: string, id: string): Promise<AutoTag | null>;
  findAutoTags(schoolId: string, fileId?: string): Promise<AutoTag[]>;
  createAutoTag(schoolId: string, data: Partial<AutoTag>): Promise<AutoTag>;
  findEntityExtraction(schoolId: string, id: string): Promise<EntityExtraction | null>;
  findEntityExtractions(schoolId: string, fileId?: string): Promise<EntityExtraction[]>;
  createEntityExtraction(schoolId: string, data: Partial<EntityExtraction>): Promise<EntityExtraction>;
  findDocumentSummary(schoolId: string, id: string): Promise<DocumentSummary | null>;
  findDocumentSummaries(schoolId: string, fileId?: string): Promise<DocumentSummary[]>;
  createDocumentSummary(schoolId: string, data: Partial<DocumentSummary>): Promise<DocumentSummary>;
  findDocumentTranslation(schoolId: string, id: string): Promise<DocumentTranslation | null>;
  findDocumentTranslations(schoolId: string, fileId?: string): Promise<DocumentTranslation[]>;
  createDocumentTranslation(schoolId: string, data: Partial<DocumentTranslation>): Promise<DocumentTranslation>;
  findDocumentQA(schoolId: string, id: string): Promise<DocumentQA | null>;
  findDocumentQAs(schoolId: string, fileId?: string): Promise<DocumentQA[]>;
  createDocumentQA(schoolId: string, data: Partial<DocumentQA>): Promise<DocumentQA>;
  findSemanticSearchResult(schoolId: string, id: string): Promise<SemanticSearchResult | null>;
  createSemanticSearchResult(schoolId: string, data: Partial<SemanticSearchResult>): Promise<SemanticSearchResult>;
  findDocumentProcessingConfig(schoolId: string, id: string): Promise<AIDocumentProcessing | null>;
  findDocumentProcessingConfigs(schoolId: string): Promise<AIDocumentProcessing[]>;
  createDocumentProcessingConfig(schoolId: string, data: Partial<AIDocumentProcessing>): Promise<AIDocumentProcessing>;
  updateDocumentProcessingConfig(schoolId: string, id: string, data: Partial<AIDocumentProcessing>): Promise<AIDocumentProcessing>;
  deleteDocumentProcessingConfig(schoolId: string, id: string): Promise<void>;
  getDocumentProcessingHistory(schoolId: string, fileId: string): Promise<Record<string, unknown>[]>;
  processDocument(schoolId: string, fileId: string, action: DocumentAIAction): Promise<Record<string, unknown>>;
  batchProcessDocuments(schoolId: string, fileIds: string[], action: DocumentAIAction): Promise<AIBatchJob>;
  getDocumentProcessingStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  searchDocuments(schoolId: string, query: string): Promise<SearchResultItem[]>;
}

// ============================================================================
// 16. AiQualityAssuranceRepository (30 methods)
// ============================================================================

export interface AiQualityAssuranceRepository {
  findQualityMetric(schoolId: string, id: string): Promise<AIQualityMetric | null>;
  findQualityMetrics(schoolId: string, modelId?: string): Promise<AIQualityMetric[]>;
  createQualityMetric(schoolId: string, data: Partial<AIQualityMetric>): Promise<AIQualityMetric>;
  deleteQualityMetric(schoolId: string, id: string): Promise<void>;
  findBenchmarkSuite(schoolId: string, id: string): Promise<AIBenchmarkSuite | null>;
  findBenchmarkSuites(schoolId: string): Promise<AIBenchmarkSuite[]>;
  createBenchmarkSuite(schoolId: string, data: Partial<AIBenchmarkSuite>): Promise<AIBenchmarkSuite>;
  updateBenchmarkSuite(schoolId: string, id: string, data: Partial<AIBenchmarkSuite>): Promise<AIBenchmarkSuite>;
  deleteBenchmarkSuite(schoolId: string, id: string): Promise<void>;
  findBenchmarkResult(schoolId: string, id: string): Promise<AIBenchmarkResult | null>;
  findBenchmarkResults(schoolId: string, suiteId?: string): Promise<AIBenchmarkResult[]>;
  createBenchmarkResult(schoolId: string, data: Partial<AIBenchmarkResult>): Promise<AIBenchmarkResult>;
  runBenchmark(schoolId: string, suiteId: string, modelId: string): Promise<AIBenchmarkResult>;
  getBenchmarkHistory(schoolId: string, modelId: string): Promise<AIBenchmarkResult[]>;
  findEvaluationCriteria(schoolId: string, id: string): Promise<AIEvaluationCriteria | null>;
  findEvaluationCriterias(schoolId: string): Promise<AIEvaluationCriteria[]>;
  createEvaluationCriteria(schoolId: string, data: Partial<AIEvaluationCriteria>): Promise<AIEvaluationCriteria>;
  updateEvaluationCriteria(schoolId: string, id: string, data: Partial<AIEvaluationCriteria>): Promise<AIEvaluationCriteria>;
  deleteEvaluationCriteria(schoolId: string, id: string): Promise<void>;
  findOptimizationRule(schoolId: string, id: string): Promise<AIOptimizationRule | null>;
  findOptimizationRules(schoolId: string): Promise<AIOptimizationRule[]>;
  createOptimizationRule(schoolId: string, data: Partial<AIOptimizationRule>): Promise<AIOptimizationRule>;
  updateOptimizationRule(schoolId: string, id: string, data: Partial<AIOptimizationRule>): Promise<AIOptimizationRule>;
  deleteOptimizationRule(schoolId: string, id: string): Promise<void>;
  findPerformanceBaseline(schoolId: string, id: string): Promise<AIPerformanceBaseline | null>;
  findPerformanceBaselines(schoolId: string, modelId?: string): Promise<AIPerformanceBaseline[]>;
  createPerformanceBaseline(schoolId: string, data: Partial<AIPerformanceBaseline>): Promise<AIPerformanceBaseline>;
  getQualityReport(schoolId: string, modelId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getModelQualityTrend(schoolId: string, modelId: string, metric: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
}

// ============================================================================
// 17. AiVoiceProcessingRepository (30 methods)
// ============================================================================

export interface AiVoiceProcessingRepository {
  findVoiceSession(schoolId: string, id: string): Promise<VoiceSession | null>;
  findVoiceSessions(schoolId: string, userId?: string): Promise<VoiceSession[]>;
  createVoiceSession(schoolId: string, data: Partial<VoiceSession>): Promise<VoiceSession>;
  updateVoiceSession(schoolId: string, id: string, data: Partial<VoiceSession>): Promise<VoiceSession>;
  deleteVoiceSession(schoolId: string, id: string): Promise<void>;
  endVoiceSession(schoolId: string, id: string): Promise<VoiceSession>;
  findVoiceTranscript(schoolId: string, id: string): Promise<VoiceTranscript | null>;
  findVoiceTranscripts(schoolId: string, sessionId: string): Promise<VoiceTranscript[]>;
  createVoiceTranscript(schoolId: string, data: Partial<VoiceTranscript>): Promise<VoiceTranscript>;
  deleteVoiceTranscript(schoolId: string, id: string): Promise<void>;
  findVoiceCommand(schoolId: string, id: string): Promise<VoiceCommand | null>;
  findVoiceCommands(schoolId: string, sessionId: string): Promise<VoiceCommand[]>;
  createVoiceCommand(schoolId: string, data: Partial<VoiceCommand>): Promise<VoiceCommand>;
  findVoiceResponse(schoolId: string, id: string): Promise<VoiceResponse | null>;
  findVoiceResponses(schoolId: string, sessionId: string): Promise<VoiceResponse[]>;
  createVoiceResponse(schoolId: string, data: Partial<VoiceResponse>): Promise<VoiceResponse>;
  findVoiceConfig(schoolId: string, id: string): Promise<AIVoiceConfig | null>;
  findVoiceConfigs(schoolId: string): Promise<AIVoiceConfig[]>;
  createVoiceConfig(schoolId: string, data: Partial<AIVoiceConfig>): Promise<AIVoiceConfig>;
  updateVoiceConfig(schoolId: string, id: string, data: Partial<AIVoiceConfig>): Promise<AIVoiceConfig>;
  deleteVoiceConfig(schoolId: string, id: string): Promise<void>;
  transcribeAudio(schoolId: string, audioUrl: string, language: VoiceLanguage): Promise<VoiceTranscript>;
  synthesizeSpeech(schoolId: string, text: string, configId: string): Promise<VoiceResponse>;
  getVoiceSessionsByDateRange(schoolId: string, dateRange: DateRange): Promise<VoiceSession[]>;
  getVoiceUsageStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getVoiceTranscriptionStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  findVoiceProcessingConfig(schoolId: string): Promise<AIVoiceConfig | null>;
  updateVoiceProcessingConfig(schoolId: string, config: Partial<AIVoiceConfig>): Promise<AIVoiceConfig>;
  getVoiceCommandStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getVoiceCommandIntents(schoolId: string): Promise<string[]>;
}

// ============================================================================
// 18. AiVisionProcessingRepository (30 methods)
// ============================================================================

export interface AiVisionProcessingRepository {
  findVisionAnalysis(schoolId: string, id: string): Promise<VisionAnalysis | null>;
  findVisionAnalyses(schoolId: string, imageUrl?: string): Promise<VisionAnalysis[]>;
  createVisionAnalysis(schoolId: string, data: Partial<VisionAnalysis>): Promise<VisionAnalysis>;
  deleteVisionAnalysis(schoolId: string, id: string): Promise<void>;
  findImageAnalysis(schoolId: string, id: string): Promise<ImageAnalysis | null>;
  findImageAnalyses(schoolId: string, imageUrl?: string): Promise<ImageAnalysis[]>;
  createImageAnalysis(schoolId: string, data: Partial<ImageAnalysis>): Promise<ImageAnalysis>;
  deleteImageAnalysis(schoolId: string, id: string): Promise<void>;
  findVideoAnalysis(schoolId: string, id: string): Promise<VideoAnalysis | null>;
  findVideoAnalyses(schoolId: string, videoUrl?: string): Promise<VideoAnalysis[]>;
  createVideoAnalysis(schoolId: string, data: Partial<VideoAnalysis>): Promise<VideoAnalysis>;
  deleteVideoAnalysis(schoolId: string, id: string): Promise<void>;
  findAudioAnalysis(schoolId: string, id: string): Promise<AudioAnalysis | null>;
  findAudioAnalyses(schoolId: string, audioUrl?: string): Promise<AudioAnalysis[]>;
  createAudioAnalysis(schoolId: string, data: Partial<AudioAnalysis>): Promise<AudioAnalysis>;
  deleteAudioAnalysis(schoolId: string, id: string): Promise<void>;
  analyzeImage(schoolId: string, imageUrl: string, mimeType: string): Promise<VisionAnalysis>;
  analyzeVideo(schoolId: string, videoUrl: string): Promise<VideoAnalysis>;
  analyzeAudio(schoolId: string, audioUrl: string): Promise<AudioAnalysis>;
  extractTextFromImage(schoolId: string, imageUrl: string): Promise<string>;
  detectObjects(schoolId: string, imageUrl: string): Promise<VisionObject[]>;
  classifyImage(schoolId: string, imageUrl: string): Promise<VisionLabel[]>;
  getVisionProcessingStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getImageProcessingHistory(schoolId: string, dateRange: DateRange): Promise<ImageAnalysis[]>;
  getVideoProcessingHistory(schoolId: string, dateRange: DateRange): Promise<VideoAnalysis[]>;
  getAudioProcessingHistory(schoolId: string, dateRange: DateRange): Promise<AudioAnalysis[]>;
  batchAnalyzeImages(schoolId: string, imageUrls: string[]): Promise<AIBatchJob>;
  findVideoProcessingConfig(schoolId: string): Promise<AIVideoProcessing | null>;
  updateVideoProcessingConfig(schoolId: string, config: Partial<AIVideoProcessing>): Promise<AIVideoProcessing>;
}

// ============================================================================
// 19. AiSafetyRepository (35 methods)
// ============================================================================

export interface AiSafetyRepository {
  findContentModerationResult(schoolId: string, id: string): Promise<ContentModerationResult | null>;
  findContentModerationResults(schoolId: string, query: AiQuery): Promise<QueryResult<ContentModerationResult>>;
  createContentModerationResult(schoolId: string, data: Partial<ContentModerationResult>): Promise<ContentModerationResult>;
  deleteContentModerationResult(schoolId: string, id: string): Promise<void>;
  findPIIDetectionResult(schoolId: string, id: string): Promise<PIIDetectionResult | null>;
  findPIIDetectionResults(schoolId: string, query: AiQuery): Promise<QueryResult<PIIDetectionResult>>;
  createPIIDetectionResult(schoolId: string, data: Partial<PIIDetectionResult>): Promise<PIIDetectionResult>;
  findBiasDetectionResult(schoolId: string, id: string): Promise<BiasDetectionResult | null>;
  findBiasDetectionResults(schoolId: string, query: AiQuery): Promise<QueryResult<BiasDetectionResult>>;
  createBiasDetectionResult(schoolId: string, data: Partial<BiasDetectionResult>): Promise<BiasDetectionResult>;
  findHallucinationDetection(schoolId: string, id: string): Promise<HallucinationDetection | null>;
  findHallucinationDetections(schoolId: string, query: AiQuery): Promise<QueryResult<HallucinationDetection>>;
  createHallucinationDetection(schoolId: string, data: Partial<HallucinationDetection>): Promise<HallucinationDetection>;
  findInjectionDetection(schoolId: string, id: string): Promise<InjectionDetection | null>;
  findInjectionDetections(schoolId: string, query: AiQuery): Promise<QueryResult<InjectionDetection>>;
  createInjectionDetection(schoolId: string, data: Partial<InjectionDetection>): Promise<InjectionDetection>;
  findOutputValidation(schoolId: string, id: string): Promise<OutputValidation | null>;
  findOutputValidations(schoolId: string, query: AiQuery): Promise<QueryResult<OutputValidation>>;
  createOutputValidation(schoolId: string, data: Partial<OutputValidation>): Promise<OutputValidation>;
  findSafetyPolicy(schoolId: string, id: string): Promise<SafetyPolicy | null>;
  findSafetyPolicies(schoolId: string): Promise<SafetyPolicy[]>;
  createSafetyPolicy(schoolId: string, data: Partial<SafetyPolicy>): Promise<SafetyPolicy>;
  updateSafetyPolicy(schoolId: string, id: string, data: Partial<SafetyPolicy>): Promise<SafetyPolicy>;
  deleteSafetyPolicy(schoolId: string, id: string): Promise<void>;
  findSafetyIncident(schoolId: string, id: string): Promise<SafetyIncident | null>;
  findSafetyIncidents(schoolId: string, query: AiQuery): Promise<QueryResult<SafetyIncident>>;
  createSafetyIncident(schoolId: string, data: Partial<SafetyIncident>): Promise<SafetyIncident>;
  resolveSafetyIncident(schoolId: string, id: string): Promise<SafetyIncident>;
  findSafetyFilter(schoolId: string, id: string): Promise<AISafetyFilter | null>;
  findSafetyFilters(schoolId: string): Promise<AISafetyFilter[]>;
  createSafetyFilter(schoolId: string, data: Partial<AISafetyFilter>): Promise<AISafetyFilter>;
  updateSafetyFilter(schoolId: string, id: string, data: Partial<AISafetyFilter>): Promise<AISafetyFilter>;
  deleteSafetyFilter(schoolId: string, id: string): Promise<void>;
  moderateContent(schoolId: string, content: string, contentType: AIContentType): Promise<ContentModerationResult>;
  detectPII(schoolId: string, content: string): Promise<PIIDetectionResult>;
}

// ============================================================================
// 20. AiModerationRepository (30 methods)
// ============================================================================

export interface AiModerationRepository {
  findContentFilterConfig(schoolId: string, id: string): Promise<ContentFilterConfig | null>;
  findContentFilterConfigs(schoolId: string): Promise<ContentFilterConfig[]>;
  createContentFilterConfig(schoolId: string, data: Partial<ContentFilterConfig>): Promise<ContentFilterConfig>;
  updateContentFilterConfig(schoolId: string, id: string, data: Partial<ContentFilterConfig>): Promise<ContentFilterConfig>;
  deleteContentFilterConfig(schoolId: string, id: string): Promise<void>;
  findPromptInjectionLog(schoolId: string, id: string): Promise<PromptInjectionLog | null>;
  findPromptInjectionLogs(schoolId: string, query: AiQuery): Promise<QueryResult<PromptInjectionLog>>;
  createPromptInjectionLog(schoolId: string, data: Partial<PromptInjectionLog>): Promise<PromptInjectionLog>;
  deletePromptInjectionLog(schoolId: string, id: string): Promise<void>;
  findSafetyDashboard(schoolId: string, id: string): Promise<SafetyDashboard | null>;
  getSafetyDashboard(schoolId: string, period: string): Promise<SafetyDashboard>;
  createSafetyDashboard(schoolId: string, data: Partial<SafetyDashboard>): Promise<SafetyDashboard>;
  findSafetyAuditEntry(schoolId: string, id: string): Promise<SafetyAuditEntry | null>;
  findSafetyAuditEntries(schoolId: string, query: AiQuery): Promise<QueryResult<SafetyAuditEntry>>;
  createSafetyAuditEntry(schoolId: string, data: Partial<SafetyAuditEntry>): Promise<SafetyAuditEntry>;
  getSafetyAuditByEventType(schoolId: string, eventType: AuditEventType): Promise<SafetyAuditEntry[]>;
  getSafetyAuditByEntityType(schoolId: string, entityType: string): Promise<SafetyAuditEntry[]>;
  getSafetyAuditByDateRange(schoolId: string, dateRange: DateRange): Promise<SafetyAuditEntry[]>;
  getSafetyMetrics(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getBlockedContentStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getFlaggedContentStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getContentModerationStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getInjectionDetectionStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getPIIDetectionStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getBiasDetectionStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getHallucinationStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getSafetyTrend(schoolId: string, metric: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getTopSafetyIssues(schoolId: string, limit: number): Promise<Record<string, unknown>[]>;
  getModerationQueue(schoolId: string): Promise<ContentModerationResult[]>;
  resolveModerationItem(schoolId: string, id: string, action: SafetyAction): Promise<ContentModerationResult>;
}

// ============================================================================
// 21. AiEthicsRepository (25 methods)
// ============================================================================

export interface AiEthicsRepository {
  findBiasDetection(schoolId: string, id: string): Promise<BiasDetectionResult | null>;
  findBiasDetections(schoolId: string, query: AiQuery): Promise<QueryResult<BiasDetectionResult>>;
  createBiasDetection(schoolId: string, data: Partial<BiasDetectionResult>): Promise<BiasDetectionResult>;
  getBiasReport(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getBiasTrend(schoolId: string, biasType: EducationBiasType, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  findComplianceReport(schoolId: string, id: string): Promise<ComplianceReport | null>;
  findComplianceReports(schoolId: string, framework?: ComplianceFramework): Promise<ComplianceReport[]>;
  createComplianceReport(schoolId: string, data: Partial<ComplianceReport>): Promise<ComplianceReport>;
  findComplianceFinding(schoolId: string, reportId: string): Promise<ComplianceFinding | null>;
  getComplianceStatus(schoolId: string, framework: ComplianceFramework): Promise<Record<string, unknown>>;
  getComplianceTrend(schoolId: string, framework: ComplianceFramework, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  findEthicsPolicy(schoolId: string, id: string): Promise<SafetyPolicy | null>;
  findEthicsPolicies(schoolId: string): Promise<SafetyPolicy[]>;
  createEthicsPolicy(schoolId: string, data: Partial<SafetyPolicy>): Promise<SafetyPolicy>;
  updateEthicsPolicy(schoolId: string, id: string, data: Partial<SafetyPolicy>): Promise<SafetyPolicy>;
  deleteEthicsPolicy(schoolId: string, id: string): Promise<void>;
  getEthicsAuditLog(schoolId: string, dateRange: DateRange): Promise<SafetyAuditEntry[]>;
  getEthicsMetrics(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getFairnessMetrics(schoolId: string, modelId: string): Promise<Record<string, unknown>>;
  getTransparencyReport(schoolId: string, modelId: string): Promise<Record<string, unknown>>;
  getAccountabilityReport(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getEthicsViolationStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getEthicsIncidentCount(schoolId: string, dateRange: DateRange): Promise<number>;
  getEthicsRecommendations(schoolId: string): Promise<Record<string, unknown>[]>;
  getEthicsDashboard(schoolId: string): Promise<Record<string, unknown>>;
}

// ============================================================================
// 22. AiAnalyticsRepository (30 methods)
// ============================================================================

export interface AiAnalyticsRepository {
  findTokenUsageAnalytics(schoolId: string, id: string): Promise<TokenUsageAnalytics | null>;
  getTokenUsageAnalytics(schoolId: string, period: string): Promise<TokenUsageAnalytics>;
  createTokenUsageAnalytics(schoolId: string, data: Partial<TokenUsageAnalytics>): Promise<TokenUsageAnalytics>;
  findCostAnalytics(schoolId: string, id: string): Promise<CostAnalytics | null>;
  getCostAnalytics(schoolId: string, period: string): Promise<CostAnalytics>;
  createCostAnalytics(schoolId: string, data: Partial<CostAnalytics>): Promise<CostAnalytics>;
  findLatencyAnalytics(schoolId: string, id: string): Promise<LatencyAnalytics | null>;
  getLatencyAnalytics(schoolId: string, period: string): Promise<LatencyAnalytics>;
  createLatencyAnalytics(schoolId: string, data: Partial<LatencyAnalytics>): Promise<LatencyAnalytics>;
  findSuccessRateAnalytics(schoolId: string, id: string): Promise<SuccessRateAnalytics | null>;
  getSuccessRateAnalytics(schoolId: string, period: string): Promise<SuccessRateAnalytics>;
  createSuccessRateAnalytics(schoolId: string, data: Partial<SuccessRateAnalytics>): Promise<SuccessRateAnalytics>;
  findModelPerformanceAnalytics(schoolId: string, id: string): Promise<ModelPerformanceAnalytics | null>;
  getModelPerformanceAnalytics(schoolId: string, modelId: string, period: string): Promise<ModelPerformanceAnalytics>;
  createModelPerformanceAnalytics(schoolId: string, data: Partial<ModelPerformanceAnalytics>): Promise<ModelPerformanceAnalytics>;
  findPromptPerformanceAnalytics(schoolId: string, id: string): Promise<PromptPerformanceAnalytics | null>;
  getPromptPerformanceAnalytics(schoolId: string, promptId: string, period: string): Promise<PromptPerformanceAnalytics>;
  createPromptPerformanceAnalytics(schoolId: string, data: Partial<PromptPerformanceAnalytics>): Promise<PromptPerformanceAnalytics>;
  findUserSatisfactionAnalytics(schoolId: string, id: string): Promise<UserSatisfactionAnalytics | null>;
  getUserSatisfactionAnalytics(schoolId: string, period: string): Promise<UserSatisfactionAnalytics>;
  createUserSatisfactionAnalytics(schoolId: string, data: Partial<UserSatisfactionAnalytics>): Promise<UserSatisfactionAnalytics>;
  findConversationAnalytics(schoolId: string, id: string): Promise<ConversationAnalytics | null>;
  getConversationAnalytics(schoolId: string, period: string): Promise<ConversationAnalytics>;
  createConversationAnalytics(schoolId: string, data: Partial<ConversationAnalytics>): Promise<ConversationAnalytics>;
  findROIMetrics(schoolId: string, id: string): Promise<ROIMetrics | null>;
  getROIMetrics(schoolId: string, period: string): Promise<ROIMetrics>;
  createROIMetrics(schoolId: string, data: Partial<ROIMetrics>): Promise<ROIMetrics>;
  findAdoptionMetrics(schoolId: string, id: string): Promise<AdoptionMetrics | null>;
  getAdoptionMetrics(schoolId: string, period: string): Promise<AdoptionMetrics>;
}

// ============================================================================
// 23. AiDashboardRepository (25 methods)
// ============================================================================

export interface AiDashboardRepository {
  findAnalyticsDashboard(schoolId: string, id: string): Promise<AnalyticsDashboard | null>;
  findAnalyticsDashboards(schoolId: string): Promise<AnalyticsDashboard[]>;
  createAnalyticsDashboard(schoolId: string, data: Partial<AnalyticsDashboard>): Promise<AnalyticsDashboard>;
  updateAnalyticsDashboard(schoolId: string, id: string, data: Partial<AnalyticsDashboard>): Promise<AnalyticsDashboard>;
  deleteAnalyticsDashboard(schoolId: string, id: string): Promise<void>;
  findAnalyticsWidget(schoolId: string, id: string): Promise<AnalyticsWidget | null>;
  findAnalyticsWidgets(schoolId: string, dashboardId?: string): Promise<AnalyticsWidget[]>;
  createAnalyticsWidget(schoolId: string, data: Partial<AnalyticsWidget>): Promise<AnalyticsWidget>;
  updateAnalyticsWidget(schoolId: string, id: string, data: Partial<AnalyticsWidget>): Promise<AnalyticsWidget>;
  deleteAnalyticsWidget(schoolId: string, id: string): Promise<void>;
  findAnalyticsExport(schoolId: string, id: string): Promise<AnalyticsExport | null>;
  findAnalyticsExports(schoolId: string): Promise<AnalyticsExport[]>;
  createAnalyticsExport(schoolId: string, data: Partial<AnalyticsExport>): Promise<AnalyticsExport>;
  deleteAnalyticsExport(schoolId: string, id: string): Promise<void>;
  findAnalyticsAlert(schoolId: string, id: string): Promise<AnalyticsAlert | null>;
  findAnalyticsAlerts(schoolId: string): Promise<AnalyticsAlert[]>;
  createAnalyticsAlert(schoolId: string, data: Partial<AnalyticsAlert>): Promise<AnalyticsAlert>;
  updateAnalyticsAlert(schoolId: string, id: string, data: Partial<AnalyticsAlert>): Promise<AnalyticsAlert>;
  deleteAnalyticsAlert(schoolId: string, id: string): Promise<void>;
  toggleAnalyticsAlert(schoolId: string, id: string): Promise<AnalyticsAlert>;
  getDashboardData(schoolId: string, dashboardId: string): Promise<Record<string, unknown>>;
  getWidgetData(schoolId: string, widgetId: string): Promise<Record<string, unknown>>;
  exportDashboard(schoolId: string, dashboardId: string, format: string): Promise<AnalyticsExport>;
  getDashboardLayout(schoolId: string, dashboardId: string): Promise<Record<string, unknown>>;
  updateDashboardLayout(schoolId: string, dashboardId: string, layout: Record<string, unknown>): Promise<void>;
}

// ============================================================================
// 24. AiInsightRepository (30 methods)
// ============================================================================

export interface AiInsightRepository {
  findById(schoolId: string, id: string): Promise<AIInsight | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIInsight>>;
  findByType(schoolId: string, type: string): Promise<AIInsight[]>;
  findByPriority(schoolId: string, priority: AIPriority): Promise<AIInsight[]>;
  findByDateRange(schoolId: string, dateRange: DateRange): Promise<AIInsight[]>;
  findActionable(schoolId: string): Promise<AIInsight[]>;
  findRecent(schoolId: string, limit: number): Promise<AIInsight[]>;
  create(schoolId: string, data: Partial<AIInsight>): Promise<AIInsight>;
  update(schoolId: string, id: string, data: Partial<AIInsight>): Promise<AIInsight>;
  delete(schoolId: string, id: string): Promise<void>;
  markAsActionable(schoolId: string, id: string): Promise<AIInsight>;
  markAsNonActionable(schoolId: string, id: string): Promise<AIInsight>;
  findInsightCategory(schoolId: string, id: string): Promise<AIInsightCategory | null>;
  findInsightCategories(schoolId: string): Promise<AIInsightCategory[]>;
  createInsightCategory(schoolId: string, data: Partial<AIInsightCategory>): Promise<AIInsightCategory>;
  updateInsightCategory(schoolId: string, id: string, data: Partial<AIInsightCategory>): Promise<AIInsightCategory>;
  deleteInsightCategory(schoolId: string, id: string): Promise<void>;
  getInsightsByCategory(schoolId: string, categoryId: string): Promise<AIInsight[]>;
  getInsightsByImpact(schoolId: string, impact: string): Promise<AIInsight[]>;
  getInsightStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getInsightTrend(schoolId: string, type: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getTopInsights(schoolId: string, limit: number): Promise<AIInsight[]>;
  getInsightCount(schoolId: string, dateRange: DateRange): Promise<number>;
  getInsightCountByType(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  getInsightCountByPriority(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  bulkDelete(schoolId: string, ids: string[]): Promise<void>;
  searchInsights(schoolId: string, query: string): Promise<AIInsight[]>;
  getInsightsByModel(schoolId: string, modelId: string): Promise<AIInsight[]>;
  getInsightsByUser(schoolId: string, userId: string): Promise<AIInsight[]>;
}

// ============================================================================
// 25. AiPredictionRepository (30 methods)
// ============================================================================

export interface AiPredictionRepository {
  findById(schoolId: string, id: string): Promise<AICostForecast | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AICostForecast>>;
  findByType(schoolId: string, type: string): Promise<AICostForecast[]>;
  create(schoolId: string, data: Partial<AICostForecast>): Promise<AICostForecast>;
  update(schoolId: string, id: string, data: Partial<AICostForecast>): Promise<AICostForecast>;
  delete(schoolId: string, id: string): Promise<void>;
  predictCost(schoolId: string, period: string): Promise<AICostForecast>;
  predictUsage(schoolId: string, metric: string, periods: number): Promise<Record<string, unknown>[]>;
  predictEnrollment(schoolId: string, periods: number): Promise<Record<string, unknown>[]>;
  predictPerformance(schoolId: string, modelId: string, periods: number): Promise<Record<string, unknown>[]>;
  predictLatency(schoolId: string, modelId: string, periods: number): Promise<Record<string, unknown>[]>;
  predictErrors(schoolId: string, modelId: string, periods: number): Promise<Record<string, unknown>[]>;
  predictTokenUsage(schoolId: string, modelId: string, periods: number): Promise<Record<string, unknown>[]>;
  predictBudget(schoolId: string, budgetId: string, periods: number): Promise<Record<string, unknown>[]>;
  predictAnomalies(schoolId: string, metric: string): Promise<Record<string, unknown>[]>;
  predictStudentPerformance(schoolId: string, studentId: string): Promise<Record<string, unknown>>;
  predictAttendance(schoolId: string, studentId: string): Promise<Record<string, unknown>>;
  predictRetention(schoolId: string): Promise<Record<string, unknown>>;
  predictDropout(schoolId: string, studentId: string): Promise<Record<string, unknown>>;
  predictGraduation(schoolId: string, studentId: string): Promise<Record<string, unknown>>;
  getPredictionAccuracy(schoolId: string, type: string): Promise<Record<string, unknown>>;
  getPredictionHistory(schoolId: string, type: string): Promise<AICostForecast[]>;
  getModelPredictions(schoolId: string, modelId: string): Promise<AICostForecast[]>;
  getSchoolPredictions(schoolId: string): Promise<AICostForecast[]>;
  getPredictionConfidence(schoolId: string, type: string): Promise<number>;
  getPredictionFactors(schoolId: string, type: string): Promise<Record<string, unknown>[]>;
  validatePrediction(schoolId: string, id: string, actual: number): Promise<Record<string, unknown>>;
  getPredictionTrend(schoolId: string, type: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getForecastSummary(schoolId: string): Promise<Record<string, unknown>>;
}

// ============================================================================
// 26. AiRecommendationRepository (30 methods)
// ============================================================================

export interface AiRecommendationRepository {
  findById(schoolId: string, id: string): Promise<AIRecommendation | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIRecommendation>>;
  findByType(schoolId: string, type: string): Promise<AIRecommendation[]>;
  findByUserId(schoolId: string, userId: string): Promise<AIRecommendation[]>;
  findByConfidence(schoolId: string, minConfidence: number): Promise<AIRecommendation[]>;
  findActive(schoolId: string): Promise<AIRecommendation[]>;
  findExpired(schoolId: string): Promise<AIRecommendation[]>;
  create(schoolId: string, data: Partial<AIRecommendation>): Promise<AIRecommendation>;
  update(schoolId: string, id: string, data: Partial<AIRecommendation>): Promise<AIRecommendation>;
  delete(schoolId: string, id: string): Promise<void>;
  dismiss(schoolId: string, id: string): Promise<void>;
  accept(schoolId: string, id: string): Promise<void>;
  getRecommendationsByStudent(schoolId: string, studentId: string): Promise<AIRecommendation[]>;
  getRecommendationsByTeacher(schoolId: string, teacherId: string): Promise<AIRecommendation[]>;
  getRecommendationsByParent(schoolId: string, parentId: string): Promise<AIRecommendation[]>;
  getRecommendationsBySubject(schoolId: string, subjectId: string): Promise<AIRecommendation[]>;
  getRecommendationsByClass(schoolId: string, classId: string): Promise<AIRecommendation[]>;
  getRecommendationStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getRecommendationTrend(schoolId: string, type: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getTopRecommendations(schoolId: string, limit: number): Promise<AIRecommendation[]>;
  getRecommendationCount(schoolId: string, dateRange: DateRange): Promise<number>;
  getRecommendationCountByType(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  getRecommendationAcceptanceRate(schoolId: string, dateRange: DateRange): Promise<number>;
  getRecommendationImpact(schoolId: string, type: string): Promise<Record<string, unknown>>;
  generateRecommendation(schoolId: string, userId: string, type: string): Promise<AIRecommendation>;
  bulkDelete(schoolId: string, ids: string[]): Promise<void>;
  searchRecommendations(schoolId: string, query: string): Promise<AIRecommendation[]>;
  getRecommendationsByModel(schoolId: string, modelId: string): Promise<AIRecommendation[]>;
  getRecommendationFeedback(schoolId: string, id: string): Promise<AIFeedback | null>;
  createRecommendationFeedback(schoolId: string, recommendationId: string, data: Partial<AIFeedback>): Promise<AIFeedback>;
}

// ============================================================================
// 27. AiAutomationRepository (30 methods)
// ============================================================================

export interface AiAutomationRepository {
  findById(schoolId: string, id: string): Promise<AIWorkflow | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIWorkflow>>;
  findByStatus(schoolId: string, status: string): Promise<AIWorkflow[]>;
  findByName(schoolId: string, name: string): Promise<AIWorkflow | null>;
  create(schoolId: string, data: Partial<AIWorkflow>): Promise<AIWorkflow>;
  update(schoolId: string, id: string, data: Partial<AIWorkflow>): Promise<AIWorkflow>;
  delete(schoolId: string, id: string): Promise<void>;
  activate(schoolId: string, id: string): Promise<AIWorkflow>;
  deactivate(schoolId: string, id: string): Promise<AIWorkflow>;
  duplicate(schoolId: string, id: string, newName: string): Promise<AIWorkflow>;
  getWorkflowTriggers(schoolId: string, workflowId: string): Promise<AIWorkflowTrigger[]>;
  addTrigger(schoolId: string, workflowId: string, trigger: Partial<AIWorkflowTrigger>): Promise<AIWorkflowTrigger>;
  updateTrigger(schoolId: string, triggerId: string, data: Partial<AIWorkflowTrigger>): Promise<AIWorkflowTrigger>;
  removeTrigger(schoolId: string, triggerId: string): Promise<void>;
  getWorkflowSteps(schoolId: string, workflowId: string): Promise<AIWorkflowStep[]>;
  addStep(schoolId: string, workflowId: string, step: Partial<AIWorkflowStep>): Promise<AIWorkflowStep>;
  updateStep(schoolId: string, stepId: string, data: Partial<AIWorkflowStep>): Promise<AIWorkflowStep>;
  removeStep(schoolId: string, stepId: string): Promise<void>;
  reorderSteps(schoolId: string, workflowId: string, order: string[]): Promise<void>;
  executeWorkflow(schoolId: string, workflowId: string, input: Record<string, unknown>): Promise<AIWorkflowExecution>;
  getWorkflowExecutions(schoolId: string, workflowId: string): Promise<AIWorkflowExecution[]>;
  getWorkflowExecution(schoolId: string, executionId: string): Promise<AIWorkflowExecution | null>;
  cancelExecution(schoolId: string, executionId: string): Promise<AIWorkflowExecution>;
  retryExecution(schoolId: string, executionId: string): Promise<AIWorkflowExecution>;
  getWorkflowStats(schoolId: string, workflowId: string): Promise<Record<string, unknown>>;
  getWorkflowExecutionStats(schoolId: string, workflowId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getRecentExecutions(schoolId: string, workflowId: string, limit: number): Promise<AIWorkflowExecution[]>;
  getRunningExecutions(schoolId: string, workflowId: string): Promise<AIWorkflowExecution[]>;
  searchWorkflows(schoolId: string, query: string): Promise<AIWorkflow[]>;
}

// ============================================================================
// 28. AiWorkflowRepository (35 methods)
// ============================================================================

export interface AiWorkflowRepository {
  findById(schoolId: string, id: string): Promise<AIWorkflow | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIWorkflow>>;
  findByCreatedBy(schoolId: string, userId: string): Promise<AIWorkflow[]>;
  findByVersion(schoolId: string, workflowId: string, version: number): Promise<AIWorkflow | null>;
  getVersionHistory(schoolId: string, workflowId: string): Promise<AIWorkflow[]>;
  create(schoolId: string, data: Partial<AIWorkflow>): Promise<AIWorkflow>;
  update(schoolId: string, id: string, data: Partial<AIWorkflow>): Promise<AIWorkflow>;
  delete(schoolId: string, id: string): Promise<void>;
  publish(schoolId: string, id: string): Promise<AIWorkflow>;
  unpublish(schoolId: string, id: string): Promise<AIWorkflow>;
  archive(schoolId: string, id: string): Promise<AIWorkflow>;
  restore(schoolId: string, id: string): Promise<AIWorkflow>;
  duplicate(schoolId: string, id: string, newName: string): Promise<AIWorkflow>;
  validate(schoolId: string, id: string): Promise<Record<string, unknown>>;
  getWorkflowVariables(schoolId: string, workflowId: string): Promise<Record<string, unknown>>;
  updateWorkflowVariables(schoolId: string, workflowId: string, variables: Record<string, unknown>): Promise<AIWorkflow>;
  getTriggerCount(schoolId: string, workflowId: string): Promise<number>;
  getStepCount(schoolId: string, workflowId: string): Promise<number>;
  getWorkflowByTrigger(schoolId: string, triggerType: string): Promise<AIWorkflow[]>;
  getActiveWorkflows(schoolId: string): Promise<AIWorkflow[]>;
  getDraftWorkflows(schoolId: string): Promise<AIWorkflow[]>;
  getArchivedWorkflows(schoolId: string): Promise<AIWorkflow[]>;
  getRecentWorkflows(schoolId: string, limit: number): Promise<AIWorkflow[]>;
  getWorkflowStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getWorkflowExecutionHistory(schoolId: string, workflowId: string, dateRange: DateRange): Promise<AIWorkflowExecution[]>;
  getWorkflowPerformance(schoolId: string, workflowId: string): Promise<Record<string, unknown>>;
  getWorkflowCost(schoolId: string, workflowId: string, dateRange: DateRange): Promise<number>;
  getWorkflowDuration(schoolId: string, workflowId: string): Promise<Record<string, unknown>>;
  getWorkflowErrors(schoolId: string, workflowId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  searchWorkflows(schoolId: string, query: string): Promise<AIWorkflow[]>;
  bulkDelete(schoolId: string, ids: string[]): Promise<void>;
  bulkActivate(schoolId: string, ids: string[]): Promise<void>;
  bulkDeactivate(schoolId: string, ids: string[]): Promise<void>;
  exportWorkflow(schoolId: string, id: string): Promise<Record<string, unknown>>;
}

// ============================================================================
// 29. AiScheduleRepository (30 methods)
// ============================================================================

export interface AiScheduleRepository {
  findById(schoolId: string, id: string): Promise<StudySchedule | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<StudySchedule>>;
  findByStudentId(schoolId: string, studentId: string): Promise<StudySchedule[]>;
  findByName(schoolId: string, name: string): Promise<StudySchedule | null>;
  create(schoolId: string, data: Partial<StudySchedule>): Promise<StudySchedule>;
  update(schoolId: string, id: string, data: Partial<StudySchedule>): Promise<StudySchedule>;
  delete(schoolId: string, id: string): Promise<void>;
  getScheduleSlots(schoolId: string, scheduleId: string): Promise<StudySlot[]>;
  addSlot(schoolId: string, scheduleId: string, slot: Partial<StudySlot>): Promise<StudySlot>;
  updateSlot(schoolId: string, slotId: string, data: Partial<StudySlot>): Promise<StudySlot>;
  removeSlot(schoolId: string, slotId: string): Promise<void>;
  reorderSlots(schoolId: string, scheduleId: string, order: string[]): Promise<void>;
  markSlotComplete(schoolId: string, slotId: string): Promise<StudySlot>;
  markSlotIncomplete(schoolId: string, slotId: string): Promise<StudySlot>;
  getScheduleByDay(schoolId: string, scheduleId: string, dayOfWeek: string): Promise<StudySlot[]>;
  getScheduleBySubject(schoolId: string, scheduleId: string, subjectId: string): Promise<StudySlot[]>;
  getScheduleCompletionRate(schoolId: string, scheduleId: string): Promise<number>;
  getScheduleStats(schoolId: string, scheduleId: string): Promise<Record<string, unknown>>;
  generateSchedule(schoolId: string, studentId: string, preferences: Record<string, unknown>): Promise<StudySchedule>;
  optimizeSchedule(schoolId: string, scheduleId: string): Promise<StudySchedule>;
  getAvailableSlots(schoolId: string, studentId: string, dateRange: DateRange): Promise<StudySlot[]>;
  getOverdueSlots(schoolId: string, studentId: string): Promise<StudySlot[]>;
  getUpcomingSlots(schoolId: string, studentId: string, limit: number): Promise<StudySlot[]>;
  getScheduleHistory(schoolId: string, studentId: string): Promise<StudySchedule[]>;
  getScheduleRecommendations(schoolId: string, studentId: string): Promise<Record<string, unknown>[]>;
  copySchedule(schoolId: string, scheduleId: string, newName: string): Promise<StudySchedule>;
  archiveSchedule(schoolId: string, id: string): Promise<StudySchedule>;
  getStudentScheduleStats(schoolId: string, studentId: string): Promise<Record<string, unknown>>;
  searchSchedules(schoolId: string, query: string): Promise<StudySchedule[]>;
}

// ============================================================================
// 30. AiNotificationRepository (30 methods)
// ============================================================================

export interface AiNotificationRepository {
  findById(schoolId: string, id: string): Promise<AINotificationConfig | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AINotificationConfig>>;
  findByUserId(schoolId: string, userId: string): Promise<AINotificationConfig[]>;
  findByType(schoolId: string, type: string): Promise<AINotificationConfig[]>;
  create(schoolId: string, data: Partial<AINotificationConfig>): Promise<AINotificationConfig>;
  update(schoolId: string, id: string, data: Partial<AINotificationConfig>): Promise<AINotificationConfig>;
  delete(schoolId: string, id: string): Promise<void>;
  toggleNotification(schoolId: string, id: string): Promise<AINotificationConfig>;
  findByChannel(schoolId: string, channel: string): Promise<AINotificationConfig[]>;
  findByThreshold(schoolId: string, minThreshold: number): Promise<AINotificationConfig[]>;
  sendNotification(schoolId: string, userId: string, type: string, message: string): Promise<void>;
  sendBulkNotification(schoolId: string, userIds: string[], type: string, message: string): Promise<void>;
  getNotificationHistory(schoolId: string, userId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getNotificationStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getNotificationCount(schoolId: string, userId: string, dateRange: DateRange): Promise<number>;
  getNotificationCountByType(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  getUnreadNotificationCount(schoolId: string, userId: string): Promise<number>;
  markAsRead(schoolId: string, notificationId: string): Promise<void>;
  markAllAsRead(schoolId: string, userId: string): Promise<void>;
  deleteNotification(schoolId: string, notificationId: string): Promise<void>;
  deleteAllNotifications(schoolId: string, userId: string): Promise<void>;
  getNotificationPreferences(schoolId: string, userId: string): Promise<AINotificationConfig[]>;
  updateNotificationPreferences(schoolId: string, userId: string, preferences: Partial<AINotificationConfig>[]): Promise<void>;
  getNotificationTemplates(schoolId: string): Promise<Record<string, unknown>[]>;
  createNotificationTemplate(schoolId: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
  updateNotificationTemplate(schoolId: string, templateId: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
  deleteNotificationTemplate(schoolId: string, templateId: string): Promise<void>;
  getNotificationDeliveryStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getNotificationEngagementStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
}

// ============================================================================
// 31. AiIntegrationRepository (25 methods)
// ============================================================================

export interface AiIntegrationRepository {
  findById(schoolId: string, id: string): Promise<AIIntegration | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIIntegration>>;
  findByType(schoolId: string, type: string): Promise<AIIntegration[]>;
  findByName(schoolId: string, name: string): Promise<AIIntegration | null>;
  findByStatus(schoolId: string, status: string): Promise<AIIntegration[]>;
  findActive(schoolId: string): Promise<AIIntegration[]>;
  findInactive(schoolId: string): Promise<AIIntegration[]>;
  create(schoolId: string, data: Partial<AIIntegration>): Promise<AIIntegration>;
  update(schoolId: string, id: string, data: Partial<AIIntegration>): Promise<AIIntegration>;
  delete(schoolId: string, id: string): Promise<void>;
  activate(schoolId: string, id: string): Promise<AIIntegration>;
  deactivate(schoolId: string, id: string): Promise<AIIntegration>;
  sync(schoolId: string, id: string): Promise<void>;
  testConnection(schoolId: string, id: string): Promise<Record<string, unknown>>;
  getIntegrationConfig(schoolId: string, id: string): Promise<Record<string, unknown>>;
  updateIntegrationConfig(schoolId: string, id: string, config: Record<string, unknown>): Promise<void>;
  getWebhooks(schoolId: string): Promise<AIWebhook[]>;
  createWebhook(schoolId: string, data: Partial<AIWebhook>): Promise<AIWebhook>;
  updateWebhook(schoolId: string, id: string, data: Partial<AIWebhook>): Promise<AIWebhook>;
  deleteWebhook(schoolId: string, id: string): Promise<void>;
  testWebhook(schoolId: string, id: string): Promise<Record<string, unknown>>;
  getPlugins(schoolId: string): Promise<AIPlugin[]>;
  installPlugin(schoolId: string, pluginId: string): Promise<void>;
  uninstallPlugin(schoolId: string, pluginId: string): Promise<void>;
}

// ============================================================================
// 32. AiApiKeyRepository (25 methods)
// ============================================================================

export interface AiApiKeyRepository {
  findById(schoolId: string, id: string): Promise<AIApiKey | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIApiKey>>;
  findByName(schoolId: string, name: string): Promise<AIApiKey | null>;
  findByKey(schoolId: string, key: string): Promise<AIApiKey | null>;
  create(schoolId: string, data: Partial<AIApiKey>): Promise<AIApiKey>;
  update(schoolId: string, id: string, data: Partial<AIApiKey>): Promise<AIApiKey>;
  delete(schoolId: string, id: string): Promise<void>;
  revoke(schoolId: string, id: string): Promise<void>;
  regenerate(schoolId: string, id: string): Promise<AIApiKey>;
  validateKey(schoolId: string, key: string): Promise<boolean>;
  updateLastUsedAt(schoolId: string, id: string): Promise<void>;
  getActiveKeys(schoolId: string): Promise<AIApiKey[]>;
  getExpiredKeys(schoolId: string): Promise<AIApiKey[]>;
  getKeyPermissions(schoolId: string, id: string): Promise<string[]>;
  updateKeyPermissions(schoolId: string, id: string, permissions: string[]): Promise<AIApiKey>;
  getKeyRateLimit(schoolId: string, id: string): Promise<number>;
  updateKeyRateLimit(schoolId: string, id: string, rateLimit: number): Promise<AIApiKey>;
  getKeyUsageStats(schoolId: string, id: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getKeyUsageHistory(schoolId: string, id: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getKeysByPermission(schoolId: string, permission: string): Promise<AIApiKey[]>;
  getKeyCount(schoolId: string): Promise<number>;
  searchKeys(schoolId: string, query: string): Promise<AIApiKey[]>;
  bulkRevoke(schoolId: string, ids: string[]): Promise<void>;
  getKeyAuditLog(schoolId: string, id: string): Promise<AIAuditEntry[]>;
}

// ============================================================================
// 33. AiRateLimitRepository (20 methods)
// ============================================================================

export interface AiRateLimitRepository {
  findById(schoolId: string, id: string): Promise<AIRateLimitConfig | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIRateLimitConfig>>;
  findByUserId(schoolId: string, userId: string): Promise<AIRateLimitConfig | null>;
  findByModelId(schoolId: string, modelId: string): Promise<AIRateLimitConfig | null>;
  create(schoolId: string, data: Partial<AIRateLimitConfig>): Promise<AIRateLimitConfig>;
  update(schoolId: string, id: string, data: Partial<AIRateLimitConfig>): Promise<AIRateLimitConfig>;
  delete(schoolId: string, id: string): Promise<void>;
  checkRateLimit(schoolId: string, userId: string, modelId: string): Promise<boolean>;
  incrementRequestCount(schoolId: string, userId: string, modelId: string): Promise<void>;
  resetRequestCount(schoolId: string, userId: string): Promise<void>;
  getUsageCount(schoolId: string, userId: string, modelId: string): Promise<number>;
  getRemainingQuota(schoolId: string, userId: string, modelId: string): Promise<number>;
  getRateLimitStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getRateLimitViolations(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getRateLimitByUser(schoolId: string, userId: string): Promise<AIRateLimitConfig[]>;
  getRateLimitByModel(schoolId: string, modelId: string): Promise<AIRateLimitConfig[]>;
  setGlobalRateLimit(schoolId: string, config: Partial<AIRateLimitConfig>): Promise<AIRateLimitConfig>;
  getGlobalRateLimit(schoolId: string): Promise<AIRateLimitConfig | null>;
  bulkUpdateRateLimits(schoolId: string, configs: Partial<AIRateLimitConfig>[]): Promise<void>;
}

// ============================================================================
// 34. AiCacheRepository (20 methods)
// ============================================================================

export interface AiCacheRepository {
  findById(schoolId: string, id: string): Promise<AICacheEntry | null>;
  findByCacheKey(schoolId: string, cacheKey: string): Promise<AICacheEntry | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AICacheEntry>>;
  findByStrategy(schoolId: string, strategy: AICacheStrategy): Promise<AICacheEntry[]>;
  create(schoolId: string, data: Partial<AICacheEntry>): Promise<AICacheEntry>;
  update(schoolId: string, id: string, data: Partial<AICacheEntry>): Promise<AICacheEntry>;
  delete(schoolId: string, id: string): Promise<void>;
  deleteByCacheKey(schoolId: string, cacheKey: string): Promise<void>;
  deleteExpired(schoolId: string): Promise<number>;
  incrementHitCount(schoolId: string, id: string): Promise<void>;
  getHitCount(schoolId: string, id: string): Promise<number>;
  getCacheStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getCacheHitRate(schoolId: string, dateRange: DateRange): Promise<number>;
  getCacheSize(schoolId: string): Promise<number>;
  clearCache(schoolId: string): Promise<void>;
  getTopCachedEntries(schoolId: string, limit: number): Promise<AICacheEntry[]>;
  findCacheInvalidation(schoolId: string, id: string): Promise<AICacheInvalidation | null>;
  createCacheInvalidation(schoolId: string, data: Partial<AICacheInvalidation>): Promise<AICacheInvalidation>;
  getCacheInvalidations(schoolId: string, cacheKey: string): Promise<AICacheInvalidation[]>;
}

// ============================================================================
// 35. AiStorageRepository (25 methods)
// ============================================================================

export interface AiStorageRepository {
  findById(schoolId: string, id: string): Promise<AIBatchJob | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIBatchJob>>;
  findByName(schoolId: string, name: string): Promise<AIBatchJob | null>;
  findByType(schoolId: string, type: string): Promise<AIBatchJob[]>;
  findByStatus(schoolId: string, status: string): Promise<AIBatchJob[]>;
  create(schoolId: string, data: Partial<AIBatchJob>): Promise<AIBatchJob>;
  update(schoolId: string, id: string, data: Partial<AIBatchJob>): Promise<AIBatchJob>;
  delete(schoolId: string, id: string): Promise<void>;
  startJob(schoolId: string, id: string): Promise<AIBatchJob>;
  completeJob(schoolId: string, id: string): Promise<AIBatchJob>;
  failJob(schoolId: string, id: string, error: string): Promise<AIBatchJob>;
  cancelJob(schoolId: string, id: string): Promise<AIBatchJob>;
  getJobProgress(schoolId: string, id: string): Promise<number>;
  updateJobProgress(schoolId: string, id: string, progress: number): Promise<void>;
  getJobOutput(schoolId: string, id: string): Promise<Record<string, unknown> | null>;
  getJobError(schoolId: string, id: string): Promise<string | null>;
  getRunningJobs(schoolId: string): Promise<AIBatchJob[]>;
  getPendingJobs(schoolId: string): Promise<AIBatchJob[]>;
  getCompletedJobs(schoolId: string, dateRange: DateRange): Promise<AIBatchJob[]>;
  getFailedJobs(schoolId: string, dateRange: DateRange): Promise<AIBatchJob[]>;
  getJobStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getJobDuration(schoolId: string, id: string): Promise<number>;
  retryJob(schoolId: string, id: string): Promise<AIBatchJob>;
  searchJobs(schoolId: string, query: string): Promise<AIBatchJob[]>;
  bulkDelete(schoolId: string, ids: string[]): Promise<void>;
}

// ============================================================================
// 36. AiLogRepository (20 methods)
// ============================================================================

export interface AiLogRepository {
  findById(schoolId: string, id: string): Promise<AILogsEntry | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AILogsEntry>>;
  findByLevel(schoolId: string, level: string): Promise<AILogsEntry[]>;
  findBySource(schoolId: string, source: string): Promise<AILogsEntry[]>;
  findByDateRange(schoolId: string, dateRange: DateRange): Promise<AILogsEntry[]>;
  create(schoolId: string, data: Partial<AILogsEntry>): Promise<AILogsEntry>;
  delete(schoolId: string, id: string): Promise<void>;
  deleteByDateRange(schoolId: string, dateRange: DateRange): Promise<number>;
  getLogsByLevel(schoolId: string, level: string, dateRange: DateRange): Promise<AILogsEntry[]>;
  getLogsBySource(schoolId: string, source: string, dateRange: DateRange): Promise<AILogsEntry[]>;
  getLogStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getLogLevelDistribution(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  getLogSourceDistribution(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  getErrorLogs(schoolId: string, dateRange: DateRange): Promise<AILogsEntry[]>;
  getWarningLogs(schoolId: string, dateRange: DateRange): Promise<AILogsEntry[]>;
  getInfoLogs(schoolId: string, dateRange: DateRange): Promise<AILogsEntry[]>;
  searchLogs(schoolId: string, query: string, dateRange: DateRange): Promise<AILogsEntry[]>;
  getRecentLogs(schoolId: string, limit: number): Promise<AILogsEntry[]>;
  clearLogs(schoolId: string, dateRange: DateRange): Promise<void>;
}

// ============================================================================
// 37. AiMonitorRepository (25 methods)
// ============================================================================

export interface AiMonitorRepository {
  findById(schoolId: string, id: string): Promise<AIPerformanceMetrics | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIPerformanceMetrics>>;
  findByModelId(schoolId: string, modelId: string): Promise<AIPerformanceMetrics[]>;
  findByPeriod(schoolId: string, period: string): Promise<AIPerformanceMetrics[]>;
  create(schoolId: string, data: Partial<AIPerformanceMetrics>): Promise<AIPerformanceMetrics>;
  update(schoolId: string, id: string, data: Partial<AIPerformanceMetrics>): Promise<AIPerformanceMetrics>;
  delete(schoolId: string, id: string): Promise<void>;
  getPerformanceMetrics(schoolId: string, modelId: string, period: string): Promise<AIPerformanceMetrics>;
  getPerformanceTrend(schoolId: string, modelId: string, metric: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getLatencyStats(schoolId: string, modelId: string, dateRange: DateRange): Promise<LatencyStats>;
  getThroughputStats(schoolId: string, modelId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getErrorRateStats(schoolId: string, modelId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getUptimeStats(schoolId: string, modelId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getPerformanceComparison(schoolId: string, modelIds: string[], metric: string): Promise<Record<string, unknown>>;
  getPerformanceAlerts(schoolId: string, dateRange: DateRange): Promise<AIAlertRule[]>;
  createPerformanceAlert(schoolId: string, data: Partial<AIAlertRule>): Promise<AIAlertRule>;
  updatePerformanceAlert(schoolId: string, id: string, data: Partial<AIAlertRule>): Promise<AIAlertRule>;
  deletePerformanceAlert(schoolId: string, id: string): Promise<void>;
  getPerformanceBaseline(schoolId: string, modelId: string, metric: string): Promise<AIPerformanceBaseline | null>;
  createPerformanceBaseline(schoolId: string, data: Partial<AIPerformanceBaseline>): Promise<AIPerformanceBaseline>;
  getPerformanceHealth(schoolId: string, modelId: string): Promise<Record<string, unknown>>;
  getSystemHealth(schoolId: string): Promise<Record<string, unknown>>;
  getPerformanceReport(schoolId: string, modelId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getPerformanceSummary(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
}

// ============================================================================
// 38. AiAlertRepository (25 methods)
// ============================================================================

export interface AiAlertRepository {
  findById(schoolId: string, id: string): Promise<AIAlertRule | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIAlertRule>>;
  findBySeverity(schoolId: string, severity: string): Promise<AIAlertRule[]>;
  findByName(schoolId: string, name: string): Promise<AIAlertRule | null>;
  findEnabled(schoolId: string): Promise<AIAlertRule[]>;
  findDisabled(schoolId: string): Promise<AIAlertRule[]>;
  create(schoolId: string, data: Partial<AIAlertRule>): Promise<AIAlertRule>;
  update(schoolId: string, id: string, data: Partial<AIAlertRule>): Promise<AIAlertRule>;
  delete(schoolId: string, id: string): Promise<void>;
  enable(schoolId: string, id: string): Promise<AIAlertRule>;
  disable(schoolId: string, id: string): Promise<AIAlertRule>;
  toggleAlert(schoolId: string, id: string): Promise<AIAlertRule>;
  triggerAlert(schoolId: string, id: string): Promise<void>;
  resolveAlert(schoolId: string, id: string): Promise<void>;
  getAlertHistory(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getAlertStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getAlertCount(schoolId: string, dateRange: DateRange): Promise<number>;
  getAlertCountBySeverity(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  getRecentAlerts(schoolId: string, limit: number): Promise<AIAlertRule[]>;
  getUnresolvedAlerts(schoolId: string): Promise<AIAlertRule[]>;
  getAlertTrend(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getAlertByMetric(schoolId: string, metric: string): Promise<AIAlertRule[]>;
  searchAlerts(schoolId: string, query: string): Promise<AIAlertRule[]>;
  bulkDelete(schoolId: string, ids: string[]): Promise<void>;
  bulkEnable(schoolId: string, ids: string[]): Promise<void>;
}

// ============================================================================
// 39. AiHealthCheckRepository (20 methods)
// ============================================================================

export interface AiHealthCheckRepository {
  findById(schoolId: string, id: string): Promise<AIModelHealth | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIModelHealth>>;
  findByModelId(schoolId: string, modelId: string): Promise<AIModelHealth[]>;
  findByStatus(schoolId: string, status: AIModelStatus): Promise<AIModelHealth[]>;
  create(schoolId: string, data: Partial<AIModelHealth>): Promise<AIModelHealth>;
  update(schoolId: string, id: string, data: Partial<AIModelHealth>): Promise<AIModelHealth>;
  delete(schoolId: string, id: string): Promise<void>;
  getLatestHealthCheck(schoolId: string, modelId: string): Promise<AIModelHealth | null>;
  getHealthCheckHistory(schoolId: string, modelId: string, dateRange: DateRange): Promise<AIModelHealth[]>;
  runHealthCheck(schoolId: string, modelId: string): Promise<AIModelHealth>;
  runAllHealthChecks(schoolId: string): Promise<AIModelHealth[]>;
  getSystemHealth(schoolId: string): Promise<Record<string, unknown>>;
  getModelHealth(schoolId: string, modelId: string): Promise<Record<string, unknown>>;
  getHealthCheckStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getUnhealthyModels(schoolId: string): Promise<AIModelHealth[]>;
  getHealthyModels(schoolId: string): Promise<AIModelHealth[]>;
  getHealthTrend(schoolId: string, modelId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getSLACompliance(schoolId: string, modelId: string, dateRange: DateRange): Promise<number>;
  getHealthCheckByProvider(schoolId: string, provider: AIModelProvider): Promise<AIModelHealth[]>;
  createHealthCheckAlert(schoolId: string, modelId: string, threshold: number): Promise<AIAlertRule>;
}

// ============================================================================
// 40. AiLoadBalancerRepository (20 methods)
// ============================================================================

export interface AiLoadBalancerRepository {
  findById(schoolId: string, id: string): Promise<AILoadBalancer | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AILoadBalancer>>;
  findByName(schoolId: string, name: string): Promise<AILoadBalancer | null>;
  findByStrategy(schoolId: string, strategy: AIRoutingStrategy): Promise<AILoadBalancer[]>;
  create(schoolId: string, data: Partial<AILoadBalancer>): Promise<AILoadBalancer>;
  update(schoolId: string, id: string, data: Partial<AILoadBalancer>): Promise<AILoadBalancer>;
  delete(schoolId: string, id: string): Promise<void>;
  getLoadBalancerTargets(schoolId: string, id: string): Promise<Record<string, unknown>[]>;
  addTarget(schoolId: string, id: string, target: Record<string, unknown>): Promise<void>;
  removeTarget(schoolId: string, id: string, targetId: string): Promise<void>;
  getTargetHealth(schoolId: string, id: string): Promise<Record<string, unknown>[]>;
  getLoadBalancerStats(schoolId: string, id: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getRoutingStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  updateHealthCheck(schoolId: string, id: string, config: Record<string, unknown>): Promise<void>;
  getHealthCheckStatus(schoolId: string, id: string): Promise<Record<string, unknown>>;
  getLoadBalancerByModel(schoolId: string, modelId: string): Promise<AILoadBalancer | null>;
  getLoadBalancerPerformance(schoolId: string, id: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getLoadBalancerErrors(schoolId: string, id: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getLoadBalancerLatency(schoolId: string, id: string, dateRange: DateRange): Promise<Record<string, unknown>>;
}

// ============================================================================
// 41. AiScalingRepository (20 methods)
// ============================================================================

export interface AiScalingRepository {
  findById(schoolId: string, id: string): Promise<AIAutoScaling | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIAutoScaling>>;
  findByModelId(schoolId: string, modelId: string): Promise<AIAutoScaling | null>;
  create(schoolId: string, data: Partial<AIAutoScaling>): Promise<AIAutoScaling>;
  update(schoolId: string, id: string, data: Partial<AIAutoScaling>): Promise<AIAutoScaling>;
  delete(schoolId: string, id: string): Promise<void>;
  scaleUp(schoolId: string, id: string): Promise<AIAutoScaling>;
  scaleDown(schoolId: string, id: string): Promise<AIAutoScaling>;
  setInstances(schoolId: string, id: string, count: number): Promise<AIAutoScaling>;
  getCurrentInstances(schoolId: string, id: string): Promise<number>;
  getScalingHistory(schoolId: string, id: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getScalingStats(schoolId: string, id: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  checkScalingThresholds(schoolId: string, id: string): Promise<Record<string, unknown>>;
  getScalingRecommendations(schoolId: string): Promise<Record<string, unknown>[]>;
  getScalingCost(schoolId: string, id: string, dateRange: DateRange): Promise<number>;
  getScalingPerformance(schoolId: string, id: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getScalingAlerts(schoolId: string, id: string): Promise<AIAlertRule[]>;
  createScalingAlert(schoolId: string, id: string, threshold: number): Promise<AIAlertRule>;
  updateScalingThresholds(schoolId: string, id: string, scaleUp: number, scaleDown: number): Promise<AIAutoScaling>;
  getScalingCapacity(schoolId: string, id: string): Promise<Record<string, unknown>>;
}

// ============================================================================
// 42. AiSecurityRepository (25 methods)
// ============================================================================

export interface AiSecurityRepository {
  findById(schoolId: string, id: string): Promise<AISecurityPolicy | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AISecurityPolicy>>;
  findByName(schoolId: string, name: string): Promise<AISecurityPolicy | null>;
  findEnabled(schoolId: string): Promise<AISecurityPolicy[]>;
  create(schoolId: string, data: Partial<AISecurityPolicy>): Promise<AISecurityPolicy>;
  update(schoolId: string, id: string, data: Partial<AISecurityPolicy>): Promise<AISecurityPolicy>;
  delete(schoolId: string, id: string): Promise<void>;
  enable(schoolId: string, id: string): Promise<AISecurityPolicy>;
  disable(schoolId: string, id: string): Promise<AISecurityPolicy>;
  getAccessToken(schoolId: string, id: string): Promise<AIAccessToken | null>;
  getAccessTokens(schoolId: string, userId?: string): Promise<AIAccessToken[]>;
  createAccessToken(schoolId: string, data: Partial<AIAccessToken>): Promise<AIAccessToken>;
  revokeAccessToken(schoolId: string, id: string): Promise<void>;
  validateAccessToken(schoolId: string, token: string): Promise<boolean>;
  getSecurityIncidents(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getSecurityStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getFailedAccessAttempts(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getActiveSessions(schoolId: string): Promise<Record<string, unknown>[]>;
  terminateSession(schoolId: string, sessionId: string): Promise<void>;
  getSecurityAuditLog(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getSecurityPolicies(schoolId: string): Promise<AISecurityPolicy[]>;
  createSecurityPolicy(schoolId: string, data: Partial<AISecurityPolicy>): Promise<AISecurityPolicy>;
  updateSecurityPolicy(schoolId: string, id: string, data: Partial<AISecurityPolicy>): Promise<AISecurityPolicy>;
  getSecurityHealth(schoolId: string): Promise<Record<string, unknown>>;
}

// ============================================================================
// 43. AiEncryptionRepository (20 methods)
// ============================================================================

export interface AiEncryptionRepository {
  findById(schoolId: string, id: string): Promise<Record<string, unknown> | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<Record<string, unknown>>>;
  encrypt(schoolId: string, data: string, algorithm: string): Promise<string>;
  decrypt(schoolId: string, encryptedData: string, algorithm: string): Promise<string>;
  hash(schoolId: string, data: string, algorithm: string): Promise<string>;
  verifyHash(schoolId: string, data: string, hash: string, algorithm: string): Promise<boolean>;
  generateKey(schoolId: string, algorithm: string, keySize: number): Promise<string>;
  rotateKey(schoolId: string, keyId: string): Promise<string>;
  getEncryptionKeys(schoolId: string): Promise<Record<string, unknown>[]>;
  revokeEncryptionKey(schoolId: string, keyId: string): Promise<void>;
  getEncryptionStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getEncryptionAuditLog(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getEncryptedDataCount(schoolId: string): Promise<number>;
  getDecryptionCount(schoolId: string, dateRange: DateRange): Promise<number>;
  getEncryptionPerformance(schoolId: string): Promise<Record<string, unknown>>;
  getSupportedAlgorithms(schoolId: string): Promise<string[]>;
  validateEncryption(schoolId: string, encryptedData: string): Promise<boolean>;
  getEncryptionHealth(schoolId: string): Promise<Record<string, unknown>>;
  createEncryptionPolicy(schoolId: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
}

// ============================================================================
// 44. AiAuthorizationRepository (25 methods)
// ============================================================================

export interface AiAuthorizationRepository {
  findById(schoolId: string, id: string): Promise<AIAccessControl | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIAccessControl>>;
  findByUserId(schoolId: string, userId: string): Promise<AIAccessControl | null>;
  findByRole(schoolId: string, role: string): Promise<AIAccessControl[]>;
  create(schoolId: string, data: Partial<AIAccessControl>): Promise<AIAccessControl>;
  update(schoolId: string, id: string, data: Partial<AIAccessControl>): Promise<AIAccessControl>;
  delete(schoolId: string, id: string): Promise<void>;
  checkAccess(schoolId: string, userId: string, resource: string, action: string): Promise<boolean>;
  grantAccess(schoolId: string, userId: string, resource: string, actions: string[]): Promise<void>;
  revokeAccess(schoolId: string, userId: string, resource: string, actions: string[]): Promise<void>;
  getUserPermissions(schoolId: string, userId: string): Promise<string[]>;
  getRolePermissions(schoolId: string, role: string): Promise<string[]>;
  updateRolePermissions(schoolId: string, role: string, permissions: string[]): Promise<void>;
  getAuthorizedUsers(schoolId: string, resource: string, action: string): Promise<string[]>;
  getAuthorizationStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getAuthorizationAuditLog(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getAccessByResource(schoolId: string, resource: string): Promise<AIAccessControl[]>;
  getAccessByUser(schoolId: string, userId: string): Promise<AIAccessControl[]>;
  getAccessByRole(schoolId: string, role: string): Promise<AIAccessControl[]>;
  validateAccessControl(schoolId: string, id: string): Promise<boolean>;
  getAccessControlStats(schoolId: string): Promise<Record<string, unknown>>;
  getAccessControlHistory(schoolId: string, id: string): Promise<Record<string, unknown>[]>;
  bulkUpdateAccessControl(schoolId: string, configs: Partial<AIAccessControl>[]): Promise<void>;
  searchAccessControls(schoolId: string, query: string): Promise<AIAccessControl[]>;
}

// ============================================================================
// 45. AiAuditRepository (25 methods)
// ============================================================================

export interface AiAuditRepository {
  findById(schoolId: string, id: string): Promise<AIAuditLog | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIAuditLog>>;
  findByUserId(schoolId: string, userId: string): Promise<AIAuditLog[]>;
  findByAction(schoolId: string, action: string): Promise<AIAuditLog[]>;
  findByEntityType(schoolId: string, entityType: string): Promise<AIAuditLog[]>;
  findByDateRange(schoolId: string, dateRange: DateRange): Promise<AIAuditLog[]>;
  create(schoolId: string, data: Partial<AIAuditLog>): Promise<AIAuditLog>;
  delete(schoolId: string, id: string): Promise<void>;
  getAuditStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getAuditByAction(schoolId: string, action: string, dateRange: DateRange): Promise<AIAuditLog[]>;
  getAuditByEntityType(schoolId: string, entityType: string, dateRange: DateRange): Promise<AIAuditLog[]>;
  getAuditByUser(schoolId: string, userId: string, dateRange: DateRange): Promise<AIAuditLog[]>;
  getAuditTrend(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getAuditCount(schoolId: string, dateRange: DateRange): Promise<number>;
  getAuditCountByAction(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  getAuditCountByEntityType(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  getAuditCountByUser(schoolId: string, dateRange: DateRange): Promise<Record<string, number>>;
  getRecentAuditLogs(schoolId: string, limit: number): Promise<AIAuditLog[]>;
  searchAuditLogs(schoolId: string, query: string, dateRange: DateRange): Promise<AIAuditLog[]>;
  exportAuditLogs(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getAuditByIP(schoolId: string, ipAddress: string): Promise<AIAuditLog[]>;
  getAuditByEntityId(schoolId: string, entityId: string): Promise<AIAuditLog[]>;
  getAuditChanges(schoolId: string, id: string): Promise<Record<string, unknown>>;
  bulkDelete(schoolId: string, ids: string[]): Promise<void>;
  clearAuditLogs(schoolId: string, dateRange: DateRange): Promise<void>;
}

// ============================================================================
// 46. AiComplianceRepository (25 methods)
// ============================================================================

export interface AiComplianceRepository {
  findById(schoolId: string, id: string): Promise<AIComplianceCheck | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<AIComplianceCheck>>;
  findByFramework(schoolId: string, framework: ComplianceFramework): Promise<AIComplianceCheck[]>;
  findByStatus(schoolId: string, status: string): Promise<AIComplianceCheck[]>;
  create(schoolId: string, data: Partial<AIComplianceCheck>): Promise<AIComplianceCheck>;
  update(schoolId: string, id: string, data: Partial<AIComplianceCheck>): Promise<AIComplianceCheck>;
  delete(schoolId: string, id: string): Promise<void>;
  runComplianceCheck(schoolId: string, framework: ComplianceFramework): Promise<AIComplianceCheck>;
  runAllComplianceChecks(schoolId: string): Promise<AIComplianceCheck[]>;
  getComplianceStatus(schoolId: string, framework: ComplianceFramework): Promise<Record<string, unknown>>;
  getComplianceReport(schoolId: string, framework: ComplianceFramework): Promise<ComplianceReport>;
  getComplianceReports(schoolId: string, framework?: ComplianceFramework): Promise<ComplianceReport[]>;
  createComplianceReport(schoolId: string, data: Partial<ComplianceReport>): Promise<ComplianceReport>;
  getComplianceTrend(schoolId: string, framework: ComplianceFramework, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getComplianceScore(schoolId: string, framework: ComplianceFramework): Promise<number>;
  getComplianceViolations(schoolId: string, framework: ComplianceFramework, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getComplianceStats(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
  getComplianceAuditLog(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getComplianceRemediations(schoolId: string, framework: ComplianceFramework): Promise<Record<string, unknown>[]>;
  getComplianceTimeline(schoolId: string, framework: ComplianceFramework): Promise<Record<string, unknown>[]>;
  getComplianceDashboard(schoolId: string): Promise<Record<string, unknown>>;
  getComplianceAlerts(schoolId: string, framework: ComplianceFramework): Promise<AIAlertRule[]>;
  createComplianceAlert(schoolId: string, framework: ComplianceFramework, threshold: number): Promise<AIAlertRule>;
  getComplianceHistory(schoolId: string, framework: ComplianceFramework): Promise<Record<string, unknown>[]>;
}

// ============================================================================
// 47. AiPrivacyRepository (25 methods)
// ============================================================================

export interface AiPrivacyRepository {
  findById(schoolId: string, id: string): Promise<AIPrivacyConfig | null>;
  findBySchoolId(schoolId: string): Promise<AIPrivacyConfig | null>;
  create(schoolId: string, data: Partial<AIPrivacyConfig>): Promise<AIPrivacyConfig>;
  update(schoolId: string, id: string, data: Partial<AIPrivacyConfig>): Promise<AIPrivacyConfig>;
  delete(schoolId: string, id: string): Promise<void>;
  getPrivacySettings(schoolId: string): Promise<AIPrivacyConfig>;
  updatePrivacySettings(schoolId: string, settings: Partial<AIPrivacyConfig>): Promise<AIPrivacyConfig>;
  getPrivacyAuditLog(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getDataAccessLog(schoolId: string, userId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getDataExportRequests(schoolId: string): Promise<Record<string, unknown>[]>;
  createDataExportRequest(schoolId: string, userId: string): Promise<Record<string, unknown>>;
  processDataExportRequest(schoolId: string, requestId: string): Promise<Record<string, unknown>>;
  getDataDeletionRequests(schoolId: string): Promise<Record<string, unknown>[]>;
  createDataDeletionRequest(schoolId: string, userId: string): Promise<Record<string, unknown>>;
  processDataDeletionRequest(schoolId: string, requestId: string): Promise<Record<string, unknown>>;
  getDataRetentionStats(schoolId: string): Promise<Record<string, unknown>>;
  getPrivacyComplianceStatus(schoolId: string): Promise<Record<string, unknown>>;
  getDataEncryptionStatus(schoolId: string): Promise<Record<string, unknown>>;
  getAnonymizationStats(schoolId: string): Promise<Record<string, unknown>>;
  getConsentRecords(schoolId: string, userId: string): Promise<Record<string, unknown>[]>;
  createConsentRecord(schoolId: string, userId: string, consentType: string): Promise<Record<string, unknown>>;
  revokeConsent(schoolId: string, userId: string, consentType: string): Promise<void>;
  getDataBreachNotifications(schoolId: string): Promise<Record<string, unknown>[]>;
  createDataBreachNotification(schoolId: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
  getPrivacyDashboard(schoolId: string): Promise<Record<string, unknown>>;
}

// ============================================================================
// 48. AiDataRetentionRepository (20 methods)
// ============================================================================

export interface AiDataRetentionRepository {
  findById(schoolId: string, id: string): Promise<Record<string, unknown> | null>;
  findAll(schoolId: string, query: AiQuery): Promise<QueryResult<Record<string, unknown>>>;
  create(schoolId: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
  update(schoolId: string, id: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
  delete(schoolId: string, id: string): Promise<void>;
  getDataRetentionPolicies(schoolId: string): Promise<Record<string, unknown>[]>;
  createDataRetentionPolicy(schoolId: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
  updateDataRetentionPolicy(schoolId: string, id: string, data: Partial<Record<string, unknown>>): Promise<Record<string, unknown>>;
  deleteDataRetentionPolicy(schoolId: string, id: string): Promise<void>;
  getDataRetentionPolicy(schoolId: string, entityType: string): Promise<Record<string, unknown> | null>;
  enforceDataRetention(schoolId: string): Promise<Record<string, unknown>>;
  getDataRetentionStats(schoolId: string): Promise<Record<string, unknown>>;
  getDataRetentionAuditLog(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getDataDeletionLog(schoolId: string, dateRange: DateRange): Promise<Record<string, unknown>[]>;
  getArchivedDataStats(schoolId: string): Promise<Record<string, unknown>>;
  restoreArchivedData(schoolId: string, archiveId: string): Promise<Record<string, unknown>>;
  getRetentionComplianceStatus(schoolId: string): Promise<Record<string, unknown>>;
  getRetentionSchedule(schoolId: string): Promise<Record<string, unknown>[]>;
  getDataRetentionHealth(schoolId: string): Promise<Record<string, unknown>>;
}

// ============================================================================
// 49. AiMobileRepository (20 methods)
// ============================================================================

export interface AiMobileRepository {
  findMobileChat(schoolId: string, id: string): Promise<MobileAIChat | null>;
  findMobileChats(schoolId: string, userId: string): Promise<MobileAIChat[]>;
  createMobileChat(schoolId: string, data: Partial<MobileAIChat>): Promise<MobileAIChat>;
  updateMobileChat(schoolId: string, id: string, data: Partial<MobileAIChat>): Promise<MobileAIChat>;
  deleteMobileChat(schoolId: string, id: string): Promise<void>;
  getMobileChatMessages(schoolId: string, chatId: string): Promise<MobileChatMessage[]>;
  addMobileChatMessage(schoolId: string, chatId: string, message: Partial<MobileChatMessage>): Promise<MobileChatMessage>;
  findMobileVoiceAssistant(schoolId: string, id: string): Promise<MobileVoiceAssistant | null>;
  findMobileVoiceAssistants(schoolId: string, userId: string): Promise<MobileVoiceAssistant[]>;
  createMobileVoiceAssistant(schoolId: string, data: Partial<MobileVoiceAssistant>): Promise<MobileVoiceAssistant>;
  findMobileAIRecommendation(schoolId: string, id: string): Promise<MobileAIRecommendation | null>;
  findMobileAIRecommendations(schoolId: string, userId: string): Promise<MobileAIRecommendation[]>;
  createMobileAIRecommendation(schoolId: string, data: Partial<MobileAIRecommendation>): Promise<MobileAIRecommendation>;
  findMobileAIInsight(schoolId: string, id: string): Promise<MobileAIInsight | null>;
  findMobileAIInsights(schoolId: string, userId: string): Promise<MobileAIInsight[]>;
  createMobileAIInsight(schoolId: string, data: Partial<MobileAIInsight>): Promise<MobileAIInsight>;
  getMobileStudentTutor(schoolId: string, studentId: string): Promise<MobileStudentTutor | null>;
  getMobileTeacherCopilot(schoolId: string, teacherId: string): Promise<MobileTeacherCopilot | null>;
  getMobileAIStats(schoolId: string, userId: string, dateRange: DateRange): Promise<Record<string, unknown>>;
}

// ============================================================================
// 50. AiOfflineRepository (15 methods)
// ============================================================================

export interface AiOfflineRepository {
  getOfflineData(schoolId: string, userId: string): Promise<Record<string, unknown>>;
  syncOfflineData(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Record<string, unknown>>;
  getOfflineCache(schoolId: string, userId: string): Promise<Record<string, unknown>>;
  setOfflineCache(schoolId: string, userId: string, data: Record<string, unknown>): Promise<void>;
  clearOfflineCache(schoolId: string, userId: string): Promise<void>;
  getOfflineSyncStatus(schoolId: string, userId: string): Promise<Record<string, unknown>>;
  resolveOfflineConflicts(schoolId: string, userId: string, conflicts: Record<string, unknown>[]): Promise<Record<string, unknown>[]>;
  getOfflineQueue(schoolId: string, userId: string): Promise<Record<string, unknown>[]>;
  processOfflineQueue(schoolId: string, userId: string): Promise<Record<string, unknown>>;
  getOfflineStorageUsage(schoolId: string, userId: string): Promise<Record<string, unknown>>;
  getOfflineModels(schoolId: string): Promise<Record<string, unknown>[]>;
  downloadForOffline(schoolId: string, modelId: string): Promise<Record<string, unknown>>;
  removeOfflineModel(schoolId: string, modelId: string): Promise<void>;
  getOfflineSyncStats(schoolId: string): Promise<Record<string, unknown>>;
  getOfflineModeStatus(schoolId: string): Promise<Record<string, unknown>>;
}

import type {
  Integration,
  IntegrationStatus,
  APIKey,
  APIKeyStatus,
  OAuthToken,
  OAuthConfig,
  RateLimitConfig,
  APILog,
  APIAnalytics,
  APIVersion,
  SDKGenerator,
  APIEndpoint,
  Webhook,
  WebhookEvent,
  WebhookDelivery,
  WebhookTemplate,
  WebhookSecret,
  DeadLetterQueue,
  Event,
  Topic,
  EventSubscription,
  EventConsumer,
  EventProducer,
  PriorityQueue,
  DelayedEvent,
  EventMetrics,
  CorrelationChain,
  SagaDefinition,
  SagaExecution,
  DomainEvent,
  StreamingConfig,
  EventFilter,
  IntegrationHealth,
  IntegrationMetrics,
  GatewayConfig,
  Automation,
  AutomationStep,
  AutomationCondition,
  AutomationExecution,
  AutomationLog,
  AutomationTemplate,
  AutomationSchedule,
  Workflow,
  WorkflowStep,
  WorkflowExecution,
  WorkflowVersion,
  HumanApproval,
  Connector,
  ConnectorConfig,
  ConnectorMapping,
  ConnectorSync,
  ConnectorLog,
  ConnectorHealth,
  ConnectorMetrics,
  AIModel,
  AIAgent,
  AITool,
  AITask,
  AIPrompt,
  AIPromptVersion,
  AIKnowledgeBase,
  AIKnowledgeDocument,
  AISemanticSearch,
  AIRAGExecution,
  AIAssistant,
  AIAssistantConversation,
  AIClassification,
  AISummarization,
  AIOCRExecution,
  AITranslationExecution,
  AIRecommendation,
  AIModeration,
  AIEvaluation,
  MarketplaceItem,
  MarketplaceReview,
  MarketplaceSubscription,
  MarketplaceLicense,
  Plugin,
  Extension,
  DeveloperApp,
  DeveloperSecret,
  SDKDownload,
  CodeSample,
  APIExplorer,
  DeveloperLog,
  DeveloperUsage,
  DeveloperDashboard,
  MarketplaceSearchResult,
  PluginInstallation,
  ExtensionInstallation,
  MarketplaceAnalytics,
  AIPipeline,
  AIPipelineExecution,
  Metric,
  MetricSeries,
  Trace,
  Span,
  DistributedLog,
  PerformanceMetric,
  Alert,
  HealthCheck,
  HealthCheckResult,
  MonitoringDashboard,
  CronMonitor,
  QueueMonitor,
  APIMonitor,
  DatabaseMonitor,
  SecretVault,
  EncryptionKey,
  KeyRotation,
  AuditTrail,
  APIFirewall,
  FirewallRule,
  IPAllowlist,
  IPBlocklist,
  BotProtection,
  ThreatDetection,
  SecurityPolicy,
  ComplianceReport,
  SecurityEvent,
  DataClassification,
  AccessControl,
  SessionLog,
  ThreatIntelligence,
  IncidentResponse,
  SecurityScan,
  SecurityFinding,
  ComplianceCheck,
  AuditExport,
  SecurityDashboard,
  DataEncryption,
  BackupStatus,
  DisasterRecoveryPlan,
  AITaskStatus,
  AITokenUsage,
  SearchResult,
  ModerationResult,
  EvaluationScore,
  PluginHook,
  APIEndpointDef,
  APICollection,
  DashboardWidget,
} from '@educi/types';

export interface EnterpriseIntegrationRepository {
  // === INTEGRATION ===
  getIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<Integration[]>;
  getIntegration(integrationId: string): Promise<Integration>;
  createIntegration(data: Partial<Integration>, schoolId: string): Promise<Integration>;
  updateIntegration(integrationId: string, data: Partial<Integration>): Promise<Integration>;
  deleteIntegration(integrationId: string): Promise<void>;
  searchIntegrations(schoolId: string, query: string): Promise<Integration[]>;
  getIntegrationsByStatus(schoolId: string, status: IntegrationStatus): Promise<Integration[]>;
  getIntegrationsByType(schoolId: string, type: string): Promise<Integration[]>;
  activateIntegration(integrationId: string): Promise<Integration>;
  deactivateIntegration(integrationId: string): Promise<Integration>;
  testIntegrationConnection(integrationId: string): Promise<{ connected: boolean; message: string }>;
  getIntegrationHealth(integrationId: string): Promise<IntegrationHealth>;
  getIntegrationMetrics(integrationId: string, dateFrom?: string, dateTo?: string): Promise<IntegrationMetrics>;
  getRecentIntegrations(schoolId: string, limit?: number): Promise<Integration[]>;
  duplicateIntegration(integrationId: string, schoolId: string): Promise<Integration>;
  getIntegrationLogs(integrationId: string, limit?: number): Promise<APILog[]>;
  exportIntegrationConfig(integrationId: string): Promise<Record<string, unknown>>;
  importIntegrationConfig(schoolId: string, config: Record<string, unknown>): Promise<Integration>;
  getActiveIntegrations(schoolId: string): Promise<Integration[]>;
  pauseIntegration(integrationId: string): Promise<Integration>;
  resumeIntegration(integrationId: string): Promise<Integration>;

  // === API KEY ===
  getAPIKeys(schoolId: string, filters?: Record<string, unknown>): Promise<APIKey[]>;
  getAPIKey(apiKeyId: string): Promise<APIKey>;
  createAPIKey(data: Partial<APIKey>, schoolId: string): Promise<APIKey>;
  updateAPIKey(apiKeyId: string, data: Partial<APIKey>): Promise<APIKey>;
  deleteAPIKey(apiKeyId: string): Promise<void>;
  searchAPIKeys(schoolId: string, query: string): Promise<APIKey[]>;
  getAPIKeysByStatus(schoolId: string, status: APIKeyStatus): Promise<APIKey[]>;
  revokeAPIKey(apiKeyId: string): Promise<void>;
  rotateAPIKey(apiKeyId: string): Promise<APIKey>;
  validateAPIKey(key: string): Promise<boolean>;
  getAPIKeyUsage(apiKeyId: string, dateFrom?: string, dateTo?: string): Promise<APIAnalytics>;
  getAPIKeyByPrefix(schoolId: string, prefix: string): Promise<APIKey>;
  getActiveAPIKeys(schoolId: string): Promise<APIKey[]>;
  getExpiredAPIKeys(schoolId: string): Promise<APIKey[]>;
  bulkRevokeAPIKeys(apiKeyIds: string[]): Promise<void>;
  getAPIKeyPermissions(apiKeyId: string): Promise<string[]>;
  updateAPIKeyPermissions(apiKeyId: string, permissions: string[]): Promise<APIKey>;

  // === OAUTH ===
  getOAuthConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<OAuthConfig[]>;
  getOAuthConfig(configId: string): Promise<OAuthConfig>;
  createOAuthConfig(data: Partial<OAuthConfig>, schoolId: string): Promise<OAuthConfig>;
  updateOAuthConfig(configId: string, data: Partial<OAuthConfig>): Promise<OAuthConfig>;
  deleteOAuthConfig(configId: string): Promise<void>;
  searchOAuthConfigs(schoolId: string, query: string): Promise<OAuthConfig[]>;
  getOAuthTokens(configId: string): Promise<OAuthToken[]>;
  refreshOAuthToken(tokenId: string): Promise<OAuthToken>;
  revokeOAuthToken(tokenId: string): Promise<void>;
  getOAuthTokenByProvider(configId: string, provider: string): Promise<OAuthToken>;
  validateOAuthConfig(configId: string): Promise<boolean>;
  getOAuthAuthorizationUrl(configId: string, redirectUri: string): Promise<string>;
  exchangeOAuthCode(configId: string, code: string, redirectUri: string): Promise<OAuthToken>;

  // === RATE LIMIT ===
  getRateLimitConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<RateLimitConfig[]>;
  getRateLimitConfig(configId: string): Promise<RateLimitConfig>;
  createRateLimitConfig(data: Partial<RateLimitConfig>, schoolId: string): Promise<RateLimitConfig>;
  updateRateLimitConfig(configId: string, data: Partial<RateLimitConfig>): Promise<RateLimitConfig>;
  deleteRateLimitConfig(configId: string): Promise<void>;
  searchRateLimitConfigs(schoolId: string, query: string): Promise<RateLimitConfig[]>;
  getRateLimitByEndpoint(schoolId: string, endpoint: string): Promise<RateLimitConfig>;
  testRateLimit(apiKeyId: string): Promise<{ allowed: boolean; remaining: number; resetAt: string }>;
  getRateLimitUsage(apiKeyId: string, dateFrom?: string, dateTo?: string): Promise<Record<string, unknown>>;

  // === API LOG ===
  getAPILogs(schoolId: string, filters?: Record<string, unknown>): Promise<APILog[]>;
  getAPILog(logId: string): Promise<APILog>;
  createAPILog(data: Partial<APILog>, schoolId: string): Promise<APILog>;
  deleteAPILog(logId: string): Promise<void>;
  searchAPILogs(schoolId: string, query: string): Promise<APILog[]>;
  getAPILogsByEndpoint(schoolId: string, endpoint: string): Promise<APILog[]>;
  getAPILogsByStatus(schoolId: string, status: number): Promise<APILog[]>;
  getAPILogsByDateRange(schoolId: string, dateFrom: string, dateTo: string): Promise<APILog[]>;
  getRecentAPILogs(schoolId: string, limit?: number): Promise<APILog[]>;
  getAPILogsByAPIKey(schoolId: string, apiKeyId: string): Promise<APILog[]>;
  getErrorAPILogs(schoolId: string): Promise<APILog[]>;
  getSlowAPILogs(schoolId: string, thresholdMs?: number): Promise<APILog[]>;
  getAPILogStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<APIAnalytics>;
  deleteOldAPILogs(schoolId: string, olderThanDays: number): Promise<number>;

  // === API VERSION ===
  getAPIVersions(schoolId: string, filters?: Record<string, unknown>): Promise<APIVersion[]>;
  getAPIVersion(versionId: string): Promise<APIVersion>;
  createAPIVersion(data: Partial<APIVersion>, schoolId: string): Promise<APIVersion>;
  updateAPIVersion(versionId: string, data: Partial<APIVersion>): Promise<APIVersion>;
  deleteAPIVersion(versionId: string): Promise<void>;
  searchAPIVersions(schoolId: string, query: string): Promise<APIVersion[]>;
  getActiveAPIVersion(schoolId: string): Promise<APIVersion>;
  getAPIVersionByNumber(schoolId: string, versionNumber: string): Promise<APIVersion>;
  deprecateAPIVersion(versionId: string): Promise<APIVersion>;
  getAPIVersionEndpoints(versionId: string): Promise<APIEndpoint[]>;
  getDefaultAPIVersion(schoolId: string): Promise<APIVersion>;
  setDefaultAPIVersion(versionId: string): Promise<void>;

  // === SDK ===
  getSDKGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<SDKGenerator[]>;
  getSDKGenerator(generatorId: string): Promise<SDKGenerator>;
  createSDKGenerator(data: Partial<SDKGenerator>, schoolId: string): Promise<SDKGenerator>;
  updateSDKGenerator(generatorId: string, data: Partial<SDKGenerator>): Promise<SDKGenerator>;
  deleteSDKGenerator(generatorId: string): Promise<void>;
  searchSDKGenerators(schoolId: string, query: string): Promise<SDKGenerator[]>;
  generateSDK(generatorId: string, options: Record<string, unknown>): Promise<SDKDownload>;
  getSDKDownloads(generatorId: string): Promise<SDKDownload[]>;
  getSDKGeneratorByLanguage(schoolId: string, language: string): Promise<SDKGenerator>;
  getRecentSDKDownloads(schoolId: string, limit?: number): Promise<SDKDownload[]>;

  // === API ENDPOINT ===
  getAPIEndpoints(schoolId: string, filters?: Record<string, unknown>): Promise<APIEndpoint[]>;
  getAPIEndpoint(endpointId: string): Promise<APIEndpoint>;
  createAPIEndpoint(data: Partial<APIEndpoint>, schoolId: string): Promise<APIEndpoint>;
  updateAPIEndpoint(endpointId: string, data: Partial<APIEndpoint>): Promise<APIEndpoint>;
  deleteAPIEndpoint(endpointId: string): Promise<void>;
  searchAPIEndpoints(schoolId: string, query: string): Promise<APIEndpoint[]>;
  getAPIEndpointsByMethod(schoolId: string, method: string): Promise<APIEndpoint[]>;
  getAPIEndpointsByPath(schoolId: string, path: string): Promise<APIEndpoint[]>;
  getAPIEndpointsByTag(schoolId: string, tag: string): Promise<APIEndpoint[]>;
  testAPIEndpoint(endpointId: string, testData: Record<string, unknown>): Promise<Record<string, unknown>>;
  getAPIEndpointStats(endpointId: string, dateFrom?: string, dateTo?: string): Promise<APIAnalytics>;
  getDeprecatedEndpoints(schoolId: string): Promise<APIEndpoint[]>;
  getPublicEndpoints(schoolId: string): Promise<APIEndpoint[]>;
  getPrivateEndpoints(schoolId: string): Promise<APIEndpoint[]>;
  bulkCreateAPIEndpoints(endpoints: Partial<APIEndpoint>[], schoolId: string): Promise<APIEndpoint[]>;

  // === WEBHOOK ===
  getWebhooks(schoolId: string, filters?: Record<string, unknown>): Promise<Webhook[]>;
  getWebhook(webhookId: string): Promise<Webhook>;
  createWebhook(data: Partial<Webhook>, schoolId: string): Promise<Webhook>;
  updateWebhook(webhookId: string, data: Partial<Webhook>): Promise<Webhook>;
  deleteWebhook(webhookId: string): Promise<void>;
  searchWebhooks(schoolId: string, query: string): Promise<Webhook[]>;
  getWebhooksByEvent(schoolId: string, event: WebhookEvent): Promise<Webhook[]>;
  activateWebhook(webhookId: string): Promise<Webhook>;
  deactivateWebhook(webhookId: string): Promise<Webhook>;
  testWebhook(webhookId: string, payload?: Record<string, unknown>): Promise<WebhookDelivery>;
  getWebhookDeliveries(webhookId: string, limit?: number): Promise<WebhookDelivery[]>;
  getWebhookDelivery(deliveryId: string): Promise<WebhookDelivery>;
  retryWebhookDelivery(deliveryId: string): Promise<WebhookDelivery>;
  getFailedDeliveries(webhookId: string): Promise<WebhookDelivery[]>;
  getWebhookTemplates(schoolId: string): Promise<WebhookTemplate[]>;
  createWebhookTemplate(data: Partial<WebhookTemplate>, schoolId: string): Promise<WebhookTemplate>;
  updateWebhookTemplate(templateId: string, data: Partial<WebhookTemplate>): Promise<WebhookTemplate>;
  deleteWebhookTemplate(templateId: string): Promise<void>;
  getWebhookSecrets(webhookId: string): Promise<WebhookSecret[]>;
  createWebhookSecret(webhookId: string): Promise<WebhookSecret>;
  revokeWebhookSecret(secretId: string): Promise<void>;
  getActiveWebhooks(schoolId: string): Promise<Webhook[]>;
  getWebhookEvents(schoolId: string): Promise<WebhookEvent[]>;
  getWebhookStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<WebhookStats>;

  // === DEAD LETTER QUEUE ===
  getDeadLetterQueues(schoolId: string, filters?: Record<string, unknown>): Promise<DeadLetterQueue[]>;
  getDeadLetterQueueItem(itemId: string): Promise<DeadLetterQueue>;
  retryDeadLetterQueueItem(itemId: string): Promise<void>;
  deleteDeadLetterQueueItem(itemId: string): Promise<void>;
  purgeDeadLetterQueue(schoolId: string): Promise<number>;
  getDeadLetterQueueStats(schoolId: string): Promise<{ total: number; byType: Record<string, number>; oldestAge: number }>;
  getDeadLetterQueueBySource(schoolId: string, source: string): Promise<DeadLetterQueue[]>;

  // === EVENT ===
  getEvents(schoolId: string, filters?: Record<string, unknown>): Promise<Event[]>;
  getEvent(eventId: string): Promise<Event>;
  createEvent(data: Partial<Event>, schoolId: string): Promise<Event>;
  updateEvent(eventId: string, data: Partial<Event>): Promise<Event>;
  deleteEvent(eventId: string): Promise<void>;
  searchEvents(schoolId: string, query: string): Promise<Event[]>;
  getEventsByTopic(schoolId: string, topicId: string): Promise<Event[]>;
  getEventsByType(schoolId: string, eventType: string): Promise<Event[]>;
  getRecentEvents(schoolId: string, limit?: number): Promise<Event[]>;
  getEventTimeline(schoolId: string, dateFrom: string, dateTo: string): Promise<Event[]>;
  getEventStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<EventMetrics>;

  // === TOPIC ===
  getTopics(schoolId: string, filters?: Record<string, unknown>): Promise<Topic[]>;
  getTopic(topicId: string): Promise<Topic>;
  createTopic(data: Partial<Topic>, schoolId: string): Promise<Topic>;
  updateTopic(topicId: string, data: Partial<Topic>): Promise<Topic>;
  deleteTopic(topicId: string): Promise<void>;
  searchTopics(schoolId: string, query: string): Promise<Topic[]>;
  getTopicSubscribers(topicId: string): Promise<EventSubscription[]>;
  getTopicEvents(topicId: string, limit?: number): Promise<Event[]>;
  getTopicStats(topicId: string): Promise<{ totalEvents: number; totalSubscribers: number; lastEventAt: string | null }>;
  getActiveTopics(schoolId: string): Promise<Topic[]>;
  subscribeToTopic(topicId: string, subscriberId: string): Promise<EventSubscription>;
  unsubscribeFromTopic(topicId: string, subscriberId: string): Promise<void>;

  // === EVENT SUBSCRIPTION ===
  getEventSubscriptions(schoolId: string, filters?: Record<string, unknown>): Promise<EventSubscription[]>;
  getEventSubscription(subscriptionId: string): Promise<EventSubscription>;
  createEventSubscription(data: Partial<EventSubscription>, schoolId: string): Promise<EventSubscription>;
  updateEventSubscription(subscriptionId: string, data: Partial<EventSubscription>): Promise<EventSubscription>;
  deleteEventSubscription(subscriptionId: string): Promise<void>;
  searchEventSubscriptions(schoolId: string, query: string): Promise<EventSubscription[]>;
  getEventSubscriptionsByTopic(schoolId: string, topicId: string): Promise<EventSubscription[]>;
  getActiveEventSubscriptions(schoolId: string): Promise<EventSubscription[]>;
  pauseEventSubscription(subscriptionId: string): Promise<EventSubscription>;
  resumeEventSubscription(subscriptionId: string): Promise<EventSubscription>;
  getEventSubscriptionStats(schoolId: string): Promise<{ total: number; active: number; paused: number; byTopic: Record<string, number> }>;

  // === EVENT CONSUMER ===
  getEventConsumers(schoolId: string, filters?: Record<string, unknown>): Promise<EventConsumer[]>;
  getEventConsumer(consumerId: string): Promise<EventConsumer>;
  createEventConsumer(data: Partial<EventConsumer>, schoolId: string): Promise<EventConsumer>;
  updateEventConsumer(consumerId: string, data: Partial<EventConsumer>): Promise<EventConsumer>;
  deleteEventConsumer(consumerId: string): Promise<void>;
  searchEventConsumers(schoolId: string, query: string): Promise<EventConsumer[]>;
  startEventConsumer(consumerId: string): Promise<EventConsumer>;
  stopEventConsumer(consumerId: string): Promise<EventConsumer>;
  getEventConsumerStats(consumerId: string): Promise<{ processed: number; failed: number; pending: number; avgProcessingTimeMs: number }>;
  getActiveEventConsumers(schoolId: string): Promise<EventConsumer[]>;

  // === EVENT PRODUCER ===
  getEventProducers(schoolId: string, filters?: Record<string, unknown>): Promise<EventProducer[]>;
  getEventProducer(producerId: string): Promise<EventProducer>;
  createEventProducer(data: Partial<EventProducer>, schoolId: string): Promise<EventProducer>;
  updateEventProducer(producerId: string, data: Partial<EventProducer>): Promise<EventProducer>;
  deleteEventProducer(producerId: string): Promise<void>;
  searchEventProducers(schoolId: string, query: string): Promise<EventProducer[]>;
  getEventProducersByType(schoolId: string, producerType: string): Promise<EventProducer[]>;
  getEventProducerStats(producerId: string): Promise<{ produced: number; failed: number; avgLatencyMs: number }>;
  getActiveEventProducers(schoolId: string): Promise<EventProducer[]>;

  // === PRIORITY QUEUE ===
  getPriorityQueues(schoolId: string, filters?: Record<string, unknown>): Promise<PriorityQueue[]>;
  getPriorityQueue(queueId: string): Promise<PriorityQueue>;
  createPriorityQueue(data: Partial<PriorityQueue>, schoolId: string): Promise<PriorityQueue>;
  updatePriorityQueue(queueId: string, data: Partial<PriorityQueue>): Promise<PriorityQueue>;
  deletePriorityQueue(queueId: string): Promise<void>;
  searchPriorityQueues(schoolId: string, query: string): Promise<PriorityQueue[]>;
  getPriorityQueueItems(queueId: string): Promise<Record<string, unknown>[]>;
  enqueueItem(queueId: string, item: Record<string, unknown>, priority?: number): Promise<Record<string, unknown>>;
  dequeueItem(queueId: string): Promise<Record<string, unknown>>;
  getPriorityQueueStats(queueId: string): Promise<{ totalItems: number; byPriority: Record<string, number>; avgWaitTimeMs: number }>;
  getActivePriorityQueues(schoolId: string): Promise<PriorityQueue[]>;
  purgePriorityQueue(queueId: string): Promise<number>;

  // === DELAYED EVENT ===
  getDelayedEvents(schoolId: string, filters?: Record<string, unknown>): Promise<DelayedEvent[]>;
  getDelayedEvent(eventId: string): Promise<DelayedEvent>;
  createDelayedEvent(data: Partial<DelayedEvent>, schoolId: string): Promise<DelayedEvent>;
  updateDelayedEvent(eventId: string, data: Partial<DelayedEvent>): Promise<DelayedEvent>;
  deleteDelayedEvent(eventId: string): Promise<void>;
  searchDelayedEvents(schoolId: string, query: string): Promise<DelayedEvent[]>;
  cancelDelayedEvent(eventId: string): Promise<void>;
  getPendingDelayedEvents(schoolId: string): Promise<DelayedEvent[]>;
  getDelayedEventsByTime(schoolId: string, from: string, to: string): Promise<DelayedEvent[]>;
  getDelayedEventStats(schoolId: string): Promise<{ total: number; pending: number; delivered: number; cancelled: number }>;

  // === CORRELATION CHAIN ===
  getCorrelationChains(schoolId: string, filters?: Record<string, unknown>): Promise<CorrelationChain[]>;
  getCorrelationChain(chainId: string): Promise<CorrelationChain>;
  createCorrelationChain(data: Partial<CorrelationChain>, schoolId: string): Promise<CorrelationChain>;
  updateCorrelationChain(chainId: string, data: Partial<CorrelationChain>): Promise<CorrelationChain>;
  deleteCorrelationChain(chainId: string): Promise<void>;
  searchCorrelationChains(schoolId: string, query: string): Promise<CorrelationChain[]>;
  getCorrelationChainByCorrelationId(correlationId: string): Promise<CorrelationChain>;
  getCorrelationChainEvents(chainId: string): Promise<Event[]>;
  getActiveCorrelationChains(schoolId: string): Promise<CorrelationChain[]>;

  // === SAGA ===
  getSagaDefinitions(schoolId: string, filters?: Record<string, unknown>): Promise<SagaDefinition[]>;
  getSagaDefinition(sagaId: string): Promise<SagaDefinition>;
  createSagaDefinition(data: Partial<SagaDefinition>, schoolId: string): Promise<SagaDefinition>;
  updateSagaDefinition(sagaId: string, data: Partial<SagaDefinition>): Promise<SagaDefinition>;
  deleteSagaDefinition(sagaId: string): Promise<void>;
  searchSagaDefinitions(schoolId: string, query: string): Promise<SagaDefinition[]>;
  executeSaga(sagaId: string, inputData: Record<string, unknown>): Promise<SagaExecution>;
  getSagaExecutions(sagaId: string): Promise<SagaExecution[]>;
  getSagaExecution(executionId: string): Promise<SagaExecution>;
  compensateSaga(executionId: string): Promise<SagaExecution>;
  getSagaExecutionStats(sagaId: string): Promise<{ total: number; succeeded: number; failed: number; compensating: number }>;
  getActiveSagaDefinitions(schoolId: string): Promise<SagaDefinition[]>;

  // === DOMAIN EVENT ===
  getDomainEvents(schoolId: string, filters?: Record<string, unknown>): Promise<DomainEvent[]>;
  getDomainEvent(eventId: string): Promise<DomainEvent>;
  createDomainEvent(data: Partial<DomainEvent>, schoolId: string): Promise<DomainEvent>;
  updateDomainEvent(eventId: string, data: Partial<DomainEvent>): Promise<DomainEvent>;
  deleteDomainEvent(eventId: string): Promise<void>;
  searchDomainEvents(schoolId: string, query: string): Promise<DomainEvent[]>;
  getDomainEventsByAggregate(aggregateType: string, aggregateId: string): Promise<DomainEvent[]>;
  getRecentDomainEvents(schoolId: string, limit?: number): Promise<DomainEvent[]>;
  getDomainEventStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; byAggregate: Record<string, number>; byType: Record<string, number> }>;

  // === STREAMING CONFIG ===
  getStreamingConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<StreamingConfig[]>;
  getStreamingConfig(configId: string): Promise<StreamingConfig>;
  createStreamingConfig(data: Partial<StreamingConfig>, schoolId: string): Promise<StreamingConfig>;
  updateStreamingConfig(configId: string, data: Partial<StreamingConfig>): Promise<StreamingConfig>;
  deleteStreamingConfig(configId: string): Promise<void>;
  searchStreamingConfigs(schoolId: string, query: string): Promise<StreamingConfig[]>;
  startStreaming(configId: string): Promise<StreamingConfig>;
  stopStreaming(configId: string): Promise<StreamingConfig>;
  getActiveStreamingConfigs(schoolId: string): Promise<StreamingConfig[]>;
  testStreamingConnection(configId: string): Promise<{ connected: boolean; message: string }>;

  // === EVENT FILTER ===
  getEventFilters(schoolId: string, filters?: Record<string, unknown>): Promise<EventFilter[]>;
  getEventFilter(filterId: string): Promise<EventFilter>;
  createEventFilter(data: Partial<EventFilter>, schoolId: string): Promise<EventFilter>;
  updateEventFilter(filterId: string, data: Partial<EventFilter>): Promise<EventFilter>;
  deleteEventFilter(filterId: string): Promise<void>;
  searchEventFilters(schoolId: string, query: string): Promise<EventFilter[]>;
  testEventFilter(filterId: string, eventData: Record<string, unknown>): Promise<boolean>;
  getActiveEventFilters(schoolId: string): Promise<EventFilter[]>;

  // === GATEWAY CONFIG ===
  getGatewayConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<GatewayConfig[]>;
  getGatewayConfig(configId: string): Promise<GatewayConfig>;
  createGatewayConfig(data: Partial<GatewayConfig>, schoolId: string): Promise<GatewayConfig>;
  updateGatewayConfig(configId: string, data: Partial<GatewayConfig>): Promise<GatewayConfig>;
  deleteGatewayConfig(configId: string): Promise<void>;
  searchGatewayConfigs(schoolId: string, query: string): Promise<GatewayConfig[]>;
  activateGatewayConfig(configId: string): Promise<GatewayConfig>;
  deactivateGatewayConfig(configId: string): Promise<GatewayConfig>;
  getActiveGatewayConfigs(schoolId: string): Promise<GatewayConfig[]>;
  testGatewayConfig(configId: string): Promise<{ connected: boolean; message: string }>;

  // === AUTOMATION ===
  getAutomations(schoolId: string, filters?: Record<string, unknown>): Promise<Automation[]>;
  getAutomation(automationId: string): Promise<Automation>;
  createAutomation(data: Partial<Automation>, schoolId: string): Promise<Automation>;
  updateAutomation(automationId: string, data: Partial<Automation>): Promise<Automation>;
  deleteAutomation(automationId: string): Promise<void>;
  searchAutomations(schoolId: string, query: string): Promise<Automation[]>;
  activateAutomation(automationId: string): Promise<Automation>;
  deactivateAutomation(automationId: string): Promise<Automation>;
  executeAutomation(automationId: string, inputData: Record<string, unknown>): Promise<AutomationExecution>;
  getAutomationSteps(automationId: string): Promise<AutomationStep[]>;
  getAutomationConditions(automationId: string): Promise<AutomationCondition[]>;
  getAutomationExecutions(automationId: string): Promise<AutomationExecution[]>;
  getAutomationExecution(executionId: string): Promise<AutomationExecution>;
  cancelAutomationExecution(executionId: string): Promise<void>;
  getAutomationLogs(automationId: string): Promise<AutomationLog[]>;
  getAutomationTemplates(schoolId: string): Promise<AutomationTemplate[]>;
  createAutomationTemplate(data: Partial<AutomationTemplate>, schoolId: string): Promise<AutomationTemplate>;
  updateAutomationTemplate(templateId: string, data: Partial<AutomationTemplate>): Promise<AutomationTemplate>;
  deleteAutomationTemplate(templateId: string): Promise<void>;
  getAutomationSchedules(schoolId: string): Promise<AutomationSchedule[]>;
  createAutomationSchedule(data: Partial<AutomationSchedule>, schoolId: string): Promise<AutomationSchedule>;
  updateAutomationSchedule(scheduleId: string, data: Partial<AutomationSchedule>): Promise<AutomationSchedule>;
  deleteAutomationSchedule(scheduleId: string): Promise<void>;
  getActiveAutomations(schoolId: string): Promise<Automation[]>;
  getAutomationStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<AutomationStats>;
  duplicateAutomation(automationId: string, schoolId: string): Promise<Automation>;

  // === WORKFLOW ===
  getWorkflows(schoolId: string, filters?: Record<string, unknown>): Promise<Workflow[]>;
  getWorkflow(workflowId: string): Promise<Workflow>;
  createWorkflow(data: Partial<Workflow>, schoolId: string): Promise<Workflow>;
  updateWorkflow(workflowId: string, data: Partial<Workflow>): Promise<Workflow>;
  deleteWorkflow(workflowId: string): Promise<void>;
  searchWorkflows(schoolId: string, query: string): Promise<Workflow[]>;
  executeWorkflow(workflowId: string, inputData: Record<string, unknown>): Promise<WorkflowExecution>;
  getWorkflowSteps(workflowId: string): Promise<WorkflowStep[]>;
  getWorkflowExecutions(workflowId: string): Promise<WorkflowExecution[]>;
  getWorkflowExecution(executionId: string): Promise<WorkflowExecution>;
  cancelWorkflowExecution(executionId: string): Promise<void>;
  retryWorkflowExecution(executionId: string): Promise<WorkflowExecution>;
  getWorkflowVersions(workflowId: string): Promise<WorkflowVersion[]>;
  createWorkflowVersion(workflowId: string, data: Partial<WorkflowVersion>): Promise<WorkflowVersion>;
  getWorkflowVersion(versionId: string): Promise<WorkflowVersion>;
  restoreWorkflowVersion(versionId: string): Promise<Workflow>;
  getActiveWorkflows(schoolId: string): Promise<Workflow[]>;
  getPendingHumanApprovals(schoolId: string): Promise<HumanApproval[]>;
  approveHumanStep(approvalId: string, approverId: string, comment?: string): Promise<HumanApproval>;
  rejectHumanStep(approvalId: string, approverId: string, reason?: string): Promise<HumanApproval>;
  getWorkflowStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; active: number; completed: number; failed: number; avgCompletionTimeMs: number }>;
  duplicateWorkflow(workflowId: string, schoolId: string): Promise<Workflow>;

  // === CONNECTOR ===
  getConnectors(schoolId: string, filters?: Record<string, unknown>): Promise<Connector[]>;
  getConnector(connectorId: string): Promise<Connector>;
  createConnector(data: Partial<Connector>, schoolId: string): Promise<Connector>;
  updateConnector(connectorId: string, data: Partial<Connector>): Promise<Connector>;
  deleteConnector(connectorId: string): Promise<void>;
  searchConnectors(schoolId: string, query: string): Promise<Connector[]>;
  activateConnector(connectorId: string): Promise<Connector>;
  deactivateConnector(connectorId: string): Promise<Connector>;
  testConnectorConnection(connectorId: string): Promise<{ connected: boolean; message: string }>;
  getConnectorConfigs(connectorId: string): Promise<ConnectorConfig[]>;
  createConnectorConfig(data: Partial<ConnectorConfig>, schoolId: string): Promise<ConnectorConfig>;
  updateConnectorConfig(configId: string, data: Partial<ConnectorConfig>): Promise<ConnectorConfig>;
  deleteConnectorConfig(configId: string): Promise<void>;
  getConnectorMappings(connectorId: string): Promise<ConnectorMapping[]>;
  createConnectorMapping(data: Partial<ConnectorMapping>, schoolId: string): Promise<ConnectorMapping>;
  updateConnectorMapping(mappingId: string, data: Partial<ConnectorMapping>): Promise<ConnectorMapping>;
  deleteConnectorMapping(mappingId: string): Promise<void>;
  syncConnector(connectorId: string, options?: Record<string, unknown>): Promise<ConnectorSync>;
  getConnectorSyncs(connectorId: string): Promise<ConnectorSync[]>;
  getConnectorSync(syncId: string): Promise<ConnectorSync>;
  cancelConnectorSync(syncId: string): Promise<void>;
  getConnectorLogs(connectorId: string, limit?: number): Promise<ConnectorLog[]>;
  getConnectorHealth(connectorId: string): Promise<ConnectorHealth>;
  getConnectorMetrics(connectorId: string, dateFrom?: string, dateTo?: string): Promise<ConnectorMetrics>;
  getActiveConnectors(schoolId: string): Promise<Connector[]>;
  getConnectorStats(schoolId: string): Promise<ConnectorStats>;
  getConnectorsByType(schoolId: string, connectorType: string): Promise<Connector[]>;

  // === AI MODEL ===
  getAIModels(schoolId: string, filters?: Record<string, unknown>): Promise<AIModel[]>;
  getAIModel(modelId: string): Promise<AIModel>;
  createAIModel(data: Partial<AIModel>, schoolId: string): Promise<AIModel>;
  updateAIModel(modelId: string, data: Partial<AIModel>): Promise<AIModel>;
  deleteAIModel(modelId: string): Promise<void>;
  searchAIModels(schoolId: string, query: string): Promise<AIModel[]>;
  getAIModelsByProvider(schoolId: string, provider: string): Promise<AIModel[]>;
  getAIModelsByCapability(schoolId: string, capability: string): Promise<AIModel[]>;
  getActiveAIModels(schoolId: string): Promise<AIModel[]>;
  testAIModel(modelId: string, testData: Record<string, unknown>): Promise<Record<string, unknown>>;

  // === AI AGENT ===
  getAIAgents(schoolId: string, filters?: Record<string, unknown>): Promise<AIAgent[]>;
  getAIAgent(agentId: string): Promise<AIAgent>;
  createAIAgent(data: Partial<AIAgent>, schoolId: string): Promise<AIAgent>;
  updateAIAgent(agentId: string, data: Partial<AIAgent>): Promise<AIAgent>;
  deleteAIAgent(agentId: string): Promise<void>;
  searchAIAgents(schoolId: string, query: string): Promise<AIAgent[]>;
  activateAIAgent(agentId: string): Promise<AIAgent>;
  deactivateAIAgent(agentId: string): Promise<AIAgent>;
  executeAIAgent(agentId: string, inputData: Record<string, unknown>): Promise<Record<string, unknown>>;
  getAIAgentTools(agentId: string): Promise<AITool[]>;
  getActiveAIAgents(schoolId: string): Promise<AIAgent[]>;
  getAIAgentStats(agentId: string): Promise<{ executions: number; successes: number; failures: number; avgResponseTimeMs: number }>;

  // === AI TOOL ===
  getAITools(schoolId: string, filters?: Record<string, unknown>): Promise<AITool[]>;
  getAITool(toolId: string): Promise<AITool>;
  createAITool(data: Partial<AITool>, schoolId: string): Promise<AITool>;
  updateAITool(toolId: string, data: Partial<AITool>): Promise<AITool>;
  deleteAITool(toolId: string): Promise<void>;
  searchAITools(schoolId: string, query: string): Promise<AITool[]>;
  getAIToolsByType(schoolId: string, toolType: string): Promise<AITool[]>;
  testAITool(toolId: string, inputData: Record<string, unknown>): Promise<Record<string, unknown>>;
  getActiveAITools(schoolId: string): Promise<AITool[]>;

  // === AI TASK ===
  getAITasks(schoolId: string, filters?: Record<string, unknown>): Promise<AITask[]>;
  getAITask(taskId: string): Promise<AITask>;
  createAITask(data: Partial<AITask>, schoolId: string): Promise<AITask>;
  updateAITask(taskId: string, data: Partial<AITask>): Promise<AITask>;
  deleteAITask(taskId: string): Promise<void>;
  searchAITasks(schoolId: string, query: string): Promise<AITask[]>;
  getAITasksByStatus(schoolId: string, status: AITaskStatus): Promise<AITask[]>;
  getAITaskResult(taskId: string): Promise<Record<string, unknown>>;
  cancelAITask(taskId: string): Promise<void>;
  retryAITask(taskId: string): Promise<AITask>;
  getPendingAITasks(schoolId: string): Promise<AITask[]>;
  getAITaskStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; pending: number; completed: number; failed: number; avgDurationMs: number }>;

  // === AI PROMPT ===
  getAIPrompts(schoolId: string, filters?: Record<string, unknown>): Promise<AIPrompt[]>;
  getAIPrompt(promptId: string): Promise<AIPrompt>;
  createAIPrompt(data: Partial<AIPrompt>, schoolId: string): Promise<AIPrompt>;
  updateAIPrompt(promptId: string, data: Partial<AIPrompt>): Promise<AIPrompt>;
  deleteAIPrompt(promptId: string): Promise<void>;
  searchAIPrompts(schoolId: string, query: string): Promise<AIPrompt[]>;
  getAIPromptVersions(promptId: string): Promise<AIPromptVersion[]>;
  createAIPromptVersion(promptId: string, data: Partial<AIPromptVersion>): Promise<AIPromptVersion>;
  getAIPromptVersion(versionId: string): Promise<AIPromptVersion>;
  getDefaultAIPromptVersion(promptId: string): Promise<AIPromptVersion>;
  setDefaultAIPromptVersion(promptId: string, versionId: string): Promise<void>;
  getAIPromptsByCategory(schoolId: string, category: string): Promise<AIPrompt[]>;
  duplicateAIPrompt(promptId: string, schoolId: string): Promise<AIPrompt>;

  // === AI KNOWLEDGE BASE ===
  getAIKnowledgeBases(schoolId: string, filters?: Record<string, unknown>): Promise<AIKnowledgeBase[]>;
  getAIKnowledgeBase(kbId: string): Promise<AIKnowledgeBase>;
  createAIKnowledgeBase(data: Partial<AIKnowledgeBase>, schoolId: string): Promise<AIKnowledgeBase>;
  updateAIKnowledgeBase(kbId: string, data: Partial<AIKnowledgeBase>): Promise<AIKnowledgeBase>;
  deleteAIKnowledgeBase(kbId: string): Promise<void>;
  searchAIKnowledgeBases(schoolId: string, query: string): Promise<AIKnowledgeBase[]>;
  getAIKnowledgeDocuments(kbId: string): Promise<AIKnowledgeDocument[]>;
  addAIKnowledgeDocument(kbId: string, data: Partial<AIKnowledgeDocument>): Promise<AIKnowledgeDocument>;
  updateAIKnowledgeDocument(docId: string, data: Partial<AIKnowledgeDocument>): Promise<AIKnowledgeDocument>;
  deleteAIKnowledgeDocument(docId: string): Promise<void>;
  getAISemanticSearch(kbId: string, query: string): Promise<AISemanticSearch>;
  executeAIRAG(kbId: string, query: string, options?: Record<string, unknown>): Promise<AIRAGExecution>;
  getActiveAIKnowledgeBases(schoolId: string): Promise<AIKnowledgeBase[]>;
  getAIKnowledgeBaseStats(kbId: string): Promise<{ totalDocuments: number; totalChunks: number; indexSize: number; lastIndexedAt: string | null }>;

  // === AI ASSISTANT ===
  getAIAssistants(schoolId: string, filters?: Record<string, unknown>): Promise<AIAssistant[]>;
  getAIAssistant(assistantId: string): Promise<AIAssistant>;
  createAIAssistant(data: Partial<AIAssistant>, schoolId: string): Promise<AIAssistant>;
  updateAIAssistant(assistantId: string, data: Partial<AIAssistant>): Promise<AIAssistant>;
  deleteAIAssistant(assistantId: string): Promise<void>;
  searchAIAssistants(schoolId: string, query: string): Promise<AIAssistant[]>;
  getAIAssistantConversations(assistantId: string): Promise<AIAssistantConversation[]>;
  createAIAssistantConversation(assistantId: string, userId: string): Promise<AIAssistantConversation>;
  sendMessage(conversationId: string, message: string): Promise<AIAssistantConversation>;
  getConversationHistory(conversationId: string): Promise<Record<string, unknown>[]>;
  getActiveAIAssistants(schoolId: string): Promise<AIAssistant[]>;
  getAIAssistantStats(assistantId: string): Promise<{ totalConversations: number; totalMessages: number; avgResponseTimeMs: number; satisfactionScore: number }>;

  // === AI CLASSIFICATION ===
  getAIClassifications(schoolId: string, filters?: Record<string, unknown>): Promise<AIClassification[]>;
  getAIClassification(classificationId: string): Promise<AIClassification>;
  createAIClassification(data: Partial<AIClassification>, schoolId: string): Promise<AIClassification>;
  updateAIClassification(classificationId: string, data: Partial<AIClassification>): Promise<AIClassification>;
  deleteAIClassification(classificationId: string): Promise<void>;
  classifyContent(content: string, options?: Record<string, unknown>): Promise<AIClassification>;
  getAIClassificationsByType(schoolId: string, classificationType: string): Promise<AIClassification[]>;

  // === AI SUMMARIZATION ===
  getAISummaries(schoolId: string, filters?: Record<string, unknown>): Promise<AISummarization[]>;
  getAISummary(summaryId: string): Promise<AISummarization>;
  createAISummary(data: Partial<AISummarization>, schoolId: string): Promise<AISummarization>;
  updateAISummary(summaryId: string, data: Partial<AISummarization>): Promise<AISummarization>;
  deleteAISummary(summaryId: string): Promise<void>;
  summarizeContent(content: string, options?: Record<string, unknown>): Promise<AISummarization>;
  getAISummariesByEntity(entityType: string, entityId: string): Promise<AISummarization[]>;

  // === AI OCR ===
  getAIOCRExecutions(schoolId: string, filters?: Record<string, unknown>): Promise<AIOCRExecution[]>;
  getAIOCRExecution(executionId: string): Promise<AIOCRExecution>;
  executeAIOCR(documentId: string, options?: Record<string, unknown>): Promise<AIOCRExecution>;
  updateAIOCRExecution(executionId: string, data: Partial<AIOCRExecution>): Promise<AIOCRExecution>;
  deleteAIOCRExecution(executionId: string): Promise<void>;
  getAIOCRExecutionsByDocument(documentId: string): Promise<AIOCRExecution[]>;
  getPendingAIOCRExecutions(schoolId: string): Promise<AIOCRExecution[]>;

  // === AI TRANSLATION ===
  getAITranslationExecutions(schoolId: string, filters?: Record<string, unknown>): Promise<AITranslationExecution[]>;
  getAITranslationExecution(executionId: string): Promise<AITranslationExecution>;
  executeAITranslation(content: string, sourceLang: string, targetLang: string, options?: Record<string, unknown>): Promise<AITranslationExecution>;
  updateAITranslationExecution(executionId: string, data: Partial<AITranslationExecution>): Promise<AITranslationExecution>;
  deleteAITranslationExecution(executionId: string): Promise<void>;
  getAITranslationByEntity(entityType: string, entityId: string): Promise<AITranslationExecution[]>;

  // === AI RECOMMENDATION ===
  getAIRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<AIRecommendation[]>;
  getAIRecommendation(recommendationId: string): Promise<AIRecommendation>;
  generateAIRecommendations(userId: string, context: Record<string, unknown>): Promise<AIRecommendation[]>;
  updateAIRecommendation(recommendationId: string, data: Partial<AIRecommendation>): Promise<AIRecommendation>;
  deleteAIRecommendation(recommendationId: string): Promise<void>;
  getAIRecommendationsByUser(userId: string): Promise<AIRecommendation[]>;
  markAIRecommendationUsed(recommendationId: string): Promise<void>;
  getAIRecommendationsByType(schoolId: string, recommendationType: string): Promise<AIRecommendation[]>;

  // === AI MODERATION ===
  getAIModerations(schoolId: string, filters?: Record<string, unknown>): Promise<AIModeration[]>;
  getAIModeration(moderationId: string): Promise<AIModeration>;
  moderateContent(content: string, options?: Record<string, unknown>): Promise<ModerationResult>;
  updateAIModeration(moderationId: string, data: Partial<AIModeration>): Promise<AIModeration>;
  deleteAIModeration(moderationId: string): Promise<void>;
  getAIModerationsByStatus(schoolId: string, status: string): Promise<AIModeration[]>;
  approveModeratedContent(moderationId: string, approvedBy: string): Promise<void>;
  rejectModeratedContent(moderationId: string, rejectedBy: string, reason?: string): Promise<void>;

  // === AI EVALUATION ===
  getAIEvaluations(schoolId: string, filters?: Record<string, unknown>): Promise<AIEvaluation[]>;
  getAIEvaluation(evaluationId: string): Promise<AIEvaluation>;
  evaluateContent(content: string, criteria: Record<string, unknown>): Promise<EvaluationScore>;
  updateAIEvaluation(evaluationId: string, data: Partial<AIEvaluation>): Promise<AIEvaluation>;
  deleteAIEvaluation(evaluationId: string): Promise<void>;
  getAIEvaluationsByEntity(entityType: string, entityId: string): Promise<AIEvaluation[]>;
  getAIEvaluationStats(schoolId: string): Promise<{ total: number; avgScore: number; byCategory: Record<string, number> }>;

  // === AI PIPELINE ===
  getAIPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<AIPipeline[]>;
  getAIPipeline(pipelineId: string): Promise<AIPipeline>;
  createAIPipeline(data: Partial<AIPipeline>, schoolId: string): Promise<AIPipeline>;
  updateAIPipeline(pipelineId: string, data: Partial<AIPipeline>): Promise<AIPipeline>;
  deleteAIPipeline(pipelineId: string): Promise<void>;
  searchAIPipelines(schoolId: string, query: string): Promise<AIPipeline[]>;
  executeAIPipeline(pipelineId: string, inputData: Record<string, unknown>): Promise<AIPipelineExecution>;
  getAIPipelineExecutions(pipelineId: string): Promise<AIPipelineExecution[]>;
  getAIPipelineExecution(executionId: string): Promise<AIPipelineExecution>;
  cancelAIPipelineExecution(executionId: string): Promise<void>;
  getActiveAIPipelines(schoolId: string): Promise<AIPipeline[]>;
  duplicateAIPipeline(pipelineId: string, schoolId: string): Promise<AIPipeline>;
  getAIPipelineStats(pipelineId: string): Promise<{ total: number; succeeded: number; failed: number; avgDurationMs: number }>;

  // === MARKETPLACE ITEM ===
  getMarketplaceItems(schoolId: string, filters?: Record<string, unknown>): Promise<MarketplaceItem[]>;
  getMarketplaceItem(itemId: string): Promise<MarketplaceItem>;
  createMarketplaceItem(data: Partial<MarketplaceItem>, schoolId: string): Promise<MarketplaceItem>;
  updateMarketplaceItem(itemId: string, data: Partial<MarketplaceItem>): Promise<MarketplaceItem>;
  deleteMarketplaceItem(itemId: string): Promise<void>;
  searchMarketplaceItems(schoolId: string, query: string): Promise<MarketplaceSearchResult[]>;
  getMarketplaceItemsByCategory(schoolId: string, category: string): Promise<MarketplaceItem[]>;
  getMarketplaceItemsByType(schoolId: string, itemType: string): Promise<MarketplaceItem[]>;
  getFeaturedMarketplaceItems(schoolId: string): Promise<MarketplaceItem[]>;
  getPopularMarketplaceItems(schoolId: string): Promise<MarketplaceItem[]>;
  getMarketplaceReviews(itemId: string): Promise<MarketplaceReview[]>;
  createMarketplaceReview(data: Partial<MarketplaceReview>, schoolId: string): Promise<MarketplaceReview>;
  updateMarketplaceReview(reviewId: string, data: Partial<MarketplaceReview>): Promise<MarketplaceReview>;
  deleteMarketplaceReview(reviewId: string): Promise<void>;
  getMarketplaceSubscriptions(schoolId: string): Promise<MarketplaceSubscription[]>;
  createMarketplaceSubscription(data: Partial<MarketplaceSubscription>, schoolId: string): Promise<MarketplaceSubscription>;
  cancelMarketplaceSubscription(subscriptionId: string): Promise<void>;
  getMarketplaceLicenses(schoolId: string): Promise<MarketplaceLicense[]>;
  validateMarketplaceLicense(licenseKey: string): Promise<boolean>;
  getMarketplaceAnalytics(schoolId: string): Promise<MarketplaceAnalytics>;
  installMarketplaceItem(itemId: string, schoolId: string): Promise<PluginInstallation | ExtensionInstallation>;
  uninstallMarketplaceItem(installationId: string): Promise<void>;
  getMarketplaceStats(schoolId: string): Promise<MarketplaceStats>;

  // === PLUGIN ===
  getPlugins(schoolId: string, filters?: Record<string, unknown>): Promise<Plugin[]>;
  getPlugin(pluginId: string): Promise<Plugin>;
  createPlugin(data: Partial<Plugin>, schoolId: string): Promise<Plugin>;
  updatePlugin(pluginId: string, data: Partial<Plugin>): Promise<Plugin>;
  deletePlugin(pluginId: string): Promise<void>;
  searchPlugins(schoolId: string, query: string): Promise<Plugin[]>;
  installPlugin(pluginId: string, schoolId: string): Promise<PluginInstallation>;
  uninstallPlugin(installationId: string): Promise<void>;
  activatePlugin(pluginId: string): Promise<Plugin>;
  deactivatePlugin(pluginId: string): Promise<Plugin>;
  getPluginHooks(pluginId: string): Promise<PluginHook[]>;
  getPluginConfig(pluginId: string): Promise<Record<string, unknown>>;
  updatePluginConfig(pluginId: string, config: Record<string, unknown>): Promise<void>;
  getInstalledPlugins(schoolId: string): Promise<Plugin[]>;
  getActivePlugins(schoolId: string): Promise<Plugin[]>;
  getPluginStats(pluginId: string): Promise<{ installs: number; activeInstalls: number; rating: number; downloads: number }>;

  // === EXTENSION ===
  getExtensions(schoolId: string, filters?: Record<string, unknown>): Promise<Extension[]>;
  getExtension(extensionId: string): Promise<Extension>;
  createExtension(data: Partial<Extension>, schoolId: string): Promise<Extension>;
  updateExtension(extensionId: string, data: Partial<Extension>): Promise<Extension>;
  deleteExtension(extensionId: string): Promise<void>;
  searchExtensions(schoolId: string, query: string): Promise<Extension[]>;
  installExtension(extensionId: string, schoolId: string): Promise<ExtensionInstallation>;
  uninstallExtension(installationId: string): Promise<void>;
  activateExtension(extensionId: string): Promise<Extension>;
  deactivateExtension(extensionId: string): Promise<Extension>;
  getInstalledExtensions(schoolId: string): Promise<Extension[]>;
  getActiveExtensions(schoolId: string): Promise<Extension[]>;
  getExtensionStats(extensionId: string): Promise<{ installs: number; activeInstalls: number; rating: number; downloads: number }>;

  // === DEVELOPER ===
  getDeveloperApps(schoolId: string, filters?: Record<string, unknown>): Promise<DeveloperApp[]>;
  getDeveloperApp(appId: string): Promise<DeveloperApp>;
  createDeveloperApp(data: Partial<DeveloperApp>, schoolId: string): Promise<DeveloperApp>;
  updateDeveloperApp(appId: string, data: Partial<DeveloperApp>): Promise<DeveloperApp>;
  deleteDeveloperApp(appId: string): Promise<void>;
  searchDeveloperApps(schoolId: string, query: string): Promise<DeveloperApp[]>;
  getDeveloperSecrets(appId: string): Promise<DeveloperSecret[]>;
  createDeveloperSecret(appId: string): Promise<DeveloperSecret>;
  revokeDeveloperSecret(secretId: string): Promise<void>;
  getSDKDownloads(schoolId: string): Promise<SDKDownload[]>;
  getCodeSamples(schoolId: string): Promise<CodeSample[]>;
  createCodeSample(data: Partial<CodeSample>, schoolId: string): Promise<CodeSample>;
  updateCodeSample(sampleId: string, data: Partial<CodeSample>): Promise<CodeSample>;
  deleteCodeSample(sampleId: string): Promise<void>;
  getAPIExplorers(schoolId: string): Promise<APIExplorer[]>;
  getDeveloperLogs(schoolId: string, filters?: Record<string, unknown>): Promise<DeveloperLog[]>;
  getDeveloperUsage(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DeveloperUsage>;
  getDeveloperDashboard(schoolId: string): Promise<DeveloperDashboard>;
  getDeveloperStats(schoolId: string): Promise<DeveloperStats>;

  // === METRIC ===
  getMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<Metric[]>;
  getMetric(metricId: string): Promise<Metric>;
  recordMetric(data: Partial<Metric>, schoolId: string): Promise<Metric>;
  getMetricSeries(metricId: string, dateFrom: string, dateTo: string): Promise<MetricSeries>;
  searchMetrics(schoolId: string, query: string): Promise<Metric[]>;
  getMetricsByType(schoolId: string, metricType: string): Promise<Metric[]>;
  getMetricStats(schoolId: string, metricName: string, dateFrom?: string, dateTo?: string): Promise<{ min: number; max: number; avg: number; sum: number; count: number }>;
  getRecentMetrics(schoolId: string, metricName: string, limit?: number): Promise<Metric[]>;
  deleteOldMetrics(schoolId: string, olderThanDays: number): Promise<number>;

  // === TRACE ===
  getTraces(schoolId: string, filters?: Record<string, unknown>): Promise<Trace[]>;
  getTrace(traceId: string): Promise<Trace>;
  createTrace(data: Partial<Trace>, schoolId: string): Promise<Trace>;
  deleteTrace(traceId: string): Promise<void>;
  searchTraces(schoolId: string, query: string): Promise<Trace[]>;
  getTracesByService(schoolId: string, serviceName: string): Promise<Trace[]>;
  getTracesByStatus(schoolId: string, status: string): Promise<Trace[]>;
  getTraceSpans(traceId: string): Promise<Span[]>;
  getSpan(spanId: string): Promise<Span>;
  getRecentTraces(schoolId: string, limit?: number): Promise<Trace[]>;
  getSlowTraces(schoolId: string, thresholdMs: number): Promise<Trace[]>;
  getErrorTraces(schoolId: string): Promise<Trace[]>;
  getTraceStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; errors: number; avgDurationMs: number; p95DurationMs: number }>;

  // === DISTRIBUTED LOG ===
  getDistributedLogs(schoolId: string, filters?: Record<string, unknown>): Promise<DistributedLog[]>;
  getDistributedLog(logId: string): Promise<DistributedLog>;
  createDistributedLog(data: Partial<DistributedLog>, schoolId: string): Promise<DistributedLog>;
  deleteDistributedLog(logId: string): Promise<void>;
  searchDistributedLogs(schoolId: string, query: string): Promise<DistributedLog[]>;
  getDistributedLogsByLevel(schoolId: string, level: string): Promise<DistributedLog[]>;
  getDistributedLogsByService(schoolId: string, serviceName: string): Promise<DistributedLog[]>;
  getRecentDistributedLogs(schoolId: string, limit?: number): Promise<DistributedLog[]>;
  getDistributedLogsByDateRange(schoolId: string, dateFrom: string, dateTo: string): Promise<DistributedLog[]>;
  getDistributedLogStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; byLevel: Record<string, number>; byService: Record<string, number> }>;
  deleteOldDistributedLogs(schoolId: string, olderThanDays: number): Promise<number>;

  // === PERFORMANCE METRIC ===
  getPerformanceMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<PerformanceMetric[]>;
  getPerformanceMetric(metricId: string): Promise<PerformanceMetric>;
  recordPerformanceMetric(data: Partial<PerformanceMetric>, schoolId: string): Promise<PerformanceMetric>;
  getPerformanceMetricTrend(metricId: string, dateFrom: string, dateTo: string): Promise<PerformanceMetric[]>;
  getPerformanceMetricsByName(schoolId: string, metricName: string): Promise<PerformanceMetric[]>;
  getPerformanceMetricsByService(schoolId: string, serviceName: string): Promise<PerformanceMetric[]>;
  getPerformanceStats(schoolId: string, metricName: string, dateFrom?: string, dateTo?: string): Promise<{ min: number; max: number; avg: number; p50: number; p95: number; p99: number }>;

  // === ALERT ===
  getAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<Alert[]>;
  getAlert(alertId: string): Promise<Alert>;
  createAlert(data: Partial<Alert>, schoolId: string): Promise<Alert>;
  updateAlert(alertId: string, data: Partial<Alert>): Promise<Alert>;
  deleteAlert(alertId: string): Promise<void>;
  searchAlerts(schoolId: string, query: string): Promise<Alert[]>;
  getAlertsBySeverity(schoolId: string, severity: string): Promise<Alert[]>;
  getAlertsByStatus(schoolId: string, status: string): Promise<Alert[]>;
  acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<Alert>;
  resolveAlert(alertId: string, resolvedBy: string): Promise<Alert>;
  muteAlert(alertId: string, mutedUntil: string): Promise<Alert>;
  getActiveAlerts(schoolId: string): Promise<Alert[]>;
  getRecentAlerts(schoolId: string, limit?: number): Promise<Alert[]>;
  getAlertStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; active: number; acknowledged: number; resolved: number; bySeverity: Record<string, number> }>;

  // === HEALTH CHECK ===
  getHealthChecks(schoolId: string, filters?: Record<string, unknown>): Promise<HealthCheck[]>;
  getHealthCheck(checkId: string): Promise<HealthCheck>;
  createHealthCheck(data: Partial<HealthCheck>, schoolId: string): Promise<HealthCheck>;
  updateHealthCheck(checkId: string, data: Partial<HealthCheck>): Promise<HealthCheck>;
  deleteHealthCheck(checkId: string): Promise<void>;
  executeHealthCheck(checkId: string): Promise<HealthCheckResult>;
  getHealthCheckResults(checkId: string): Promise<HealthCheckResult[]>;
  getLatestHealthCheckResult(checkId: string): Promise<HealthCheckResult>;
  getHealthChecksByStatus(schoolId: string, status: string): Promise<HealthCheck[]>;
  getActiveHealthChecks(schoolId: string): Promise<HealthCheck[]>;
  getSystemHealthStatus(schoolId: string): Promise<{ overall: string; components: Array<{ name: string; status: string; latencyMs: number }> }>;

  // === MONITORING DASHBOARD ===
  getMonitoringDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<MonitoringDashboard[]>;
  getMonitoringDashboard(dashboardId: string): Promise<MonitoringDashboard>;
  createMonitoringDashboard(data: Partial<MonitoringDashboard>, schoolId: string): Promise<MonitoringDashboard>;
  updateMonitoringDashboard(dashboardId: string, data: Partial<MonitoringDashboard>): Promise<MonitoringDashboard>;
  deleteMonitoringDashboard(dashboardId: string): Promise<void>;
  searchMonitoringDashboards(schoolId: string, query: string): Promise<MonitoringDashboard[]>;
  getDashboardWidgets(dashboardId: string): Promise<DashboardWidget[]>;
  addDashboardWidget(dashboardId: string, widget: Partial<DashboardWidget>): Promise<DashboardWidget>;
  updateDashboardWidget(dashboardId: string, widgetId: string, data: Partial<DashboardWidget>): Promise<DashboardWidget>;
  removeDashboardWidget(dashboardId: string, widgetId: string): Promise<void>;
  getPublicDashboards(schoolId: string): Promise<MonitoringDashboard[]>;
  getDefaultDashboard(schoolId: string): Promise<MonitoringDashboard>;

  // === CRON MONITOR ===
  getCronMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<CronMonitor[]>;
  getCronMonitor(monitorId: string): Promise<CronMonitor>;
  createCronMonitor(data: Partial<CronMonitor>, schoolId: string): Promise<CronMonitor>;
  updateCronMonitor(monitorId: string, data: Partial<CronMonitor>): Promise<CronMonitor>;
  deleteCronMonitor(monitorId: string): Promise<void>;
  activateCronMonitor(monitorId: string): Promise<CronMonitor>;
  deactivateCronMonitor(monitorId: string): Promise<CronMonitor>;
  getCronMonitorHistory(monitorId: string): Promise<Record<string, unknown>[]>;
  getActiveCronMonitors(schoolId: string): Promise<CronMonitor[]>;
  getCronMonitorStats(monitorId: string): Promise<{ totalRuns: number; successfulRuns: number; failedRuns: number; avgDurationMs: number; lastRunAt: string | null }>;

  // === QUEUE MONITOR ===
  getQueueMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<QueueMonitor[]>;
  getQueueMonitor(monitorId: string): Promise<QueueMonitor>;
  createQueueMonitor(data: Partial<QueueMonitor>, schoolId: string): Promise<QueueMonitor>;
  updateQueueMonitor(monitorId: string, data: Partial<QueueMonitor>): Promise<QueueMonitor>;
  deleteQueueMonitor(monitorId: string): Promise<void>;
  getQueueMonitorStats(queueName: string): Promise<{ depth: number; processingRate: number; avgWaitTimeMs: number; consumers: number }>;
  getActiveQueueMonitors(schoolId: string): Promise<QueueMonitor[]>;
  getQueueMonitorHistory(monitorId: string, dateFrom: string, dateTo: string): Promise<Record<string, unknown>[]>;

  // === API MONITOR ===
  getAPIMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<APIMonitor[]>;
  getAPIMonitor(monitorId: string): Promise<APIMonitor>;
  createAPIMonitor(data: Partial<APIMonitor>, schoolId: string): Promise<APIMonitor>;
  updateAPIMonitor(monitorId: string, data: Partial<APIMonitor>): Promise<APIMonitor>;
  deleteAPIMonitor(monitorId: string): Promise<void>;
  activateAPIMonitor(monitorId: string): Promise<APIMonitor>;
  deactivateAPIMonitor(monitorId: string): Promise<APIMonitor>;
  getAPIMonitorHistory(monitorId: string, dateFrom: string, dateTo: string): Promise<Record<string, unknown>[]>;
  getActiveAPIMonitors(schoolId: string): Promise<APIMonitor[]>;
  getAPIMonitorStats(monitorId: string): Promise<{ totalRequests: number; errorRate: number; avgResponseTimeMs: number; uptimePercent: number }>;

  // === DATABASE MONITOR ===
  getDatabaseMonitors(schoolId: string, filters?: Record<string, unknown>): Promise<DatabaseMonitor[]>;
  getDatabaseMonitor(monitorId: string): Promise<DatabaseMonitor>;
  createDatabaseMonitor(data: Partial<DatabaseMonitor>, schoolId: string): Promise<DatabaseMonitor>;
  updateDatabaseMonitor(monitorId: string, data: Partial<DatabaseMonitor>): Promise<DatabaseMonitor>;
  deleteDatabaseMonitor(monitorId: string): Promise<void>;
  getDatabaseMonitorStats(monitorId: string): Promise<{ connectionCount: number; queryCount: number; avgQueryTimeMs: number; slowQueries: number; replicationLag: number }>;
  getActiveDatabaseMonitors(schoolId: string): Promise<DatabaseMonitor[]>;
  getDatabaseMonitorHistory(monitorId: string, dateFrom: string, dateTo: string): Promise<Record<string, unknown>[]>;

  // === SECRET VAULT ===
  getSecretVaults(schoolId: string, filters?: Record<string, unknown>): Promise<SecretVault[]>;
  getSecretVault(vaultId: string): Promise<SecretVault>;
  createSecretVault(data: Partial<SecretVault>, schoolId: string): Promise<SecretVault>;
  updateSecretVault(vaultId: string, data: Partial<SecretVault>): Promise<SecretVault>;
  deleteSecretVault(vaultId: string): Promise<void>;
  searchSecretVaults(schoolId: string, query: string): Promise<SecretVault[]>;
  getSecretVaultsByType(schoolId: string, vaultType: string): Promise<SecretVault[]>;
  getActiveSecretVaults(schoolId: string): Promise<SecretVault[]>;
  getSecretVaultStats(schoolId: string): Promise<{ total: number; byType: Record<string, number>; totalSecrets: number }>;

  // === ENCRYPTION KEY ===
  getEncryptionKeys(schoolId: string, filters?: Record<string, unknown>): Promise<EncryptionKey[]>;
  getEncryptionKey(keyId: string): Promise<EncryptionKey>;
  createEncryptionKey(data: Partial<EncryptionKey>, schoolId: string): Promise<EncryptionKey>;
  updateEncryptionKey(keyId: string, data: Partial<EncryptionKey>): Promise<EncryptionKey>;
  deleteEncryptionKey(keyId: string): Promise<void>;
  rotateEncryptionKey(keyId: string): Promise<KeyRotation>;
  getEncryptionKeyRotations(keyId: string): Promise<KeyRotation[]>;
  getActiveEncryptionKeys(schoolId: string): Promise<EncryptionKey[]>;
  getEncryptionKeyStats(schoolId: string): Promise<{ total: number; active: number; rotated: number; pendingRotation: number }>;

  // === AUDIT TRAIL ===
  getAuditTrails(schoolId: string, filters?: Record<string, unknown>): Promise<AuditTrail[]>;
  getAuditTrail(trailId: string): Promise<AuditTrail>;
  createAuditTrail(data: Partial<AuditTrail>, schoolId: string): Promise<AuditTrail>;
  deleteAuditTrail(trailId: string): Promise<void>;
  searchAuditTrails(schoolId: string, query: string): Promise<AuditTrail[]>;
  getAuditTrailsByAction(schoolId: string, action: string): Promise<AuditTrail[]>;
  getAuditTrailsByUser(schoolId: string, userId: string): Promise<AuditTrail[]>;
  getAuditTrailsByDateRange(schoolId: string, dateFrom: string, dateTo: string): Promise<AuditTrail[]>;
  getRecentAuditTrails(schoolId: string, limit?: number): Promise<AuditTrail[]>;
  getAuditTrailStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; byAction: Record<string, number>; byUser: Record<string, number> }>;
  exportAuditTrails(schoolId: string, dateFrom: string, dateTo: string): Promise<AuditExport>;

  // === API FIREWALL ===
  getAPIFirewalls(schoolId: string, filters?: Record<string, unknown>): Promise<APIFirewall[]>;
  getAPIFirewall(firewallId: string): Promise<APIFirewall>;
  createAPIFirewall(data: Partial<APIFirewall>, schoolId: string): Promise<APIFirewall>;
  updateAPIFirewall(firewallId: string, data: Partial<APIFirewall>): Promise<APIFirewall>;
  deleteAPIFirewall(firewallId: string): Promise<void>;
  activateAPIFirewall(firewallId: string): Promise<APIFirewall>;
  deactivateAPIFirewall(firewallId: string): Promise<APIFirewall>;
  getAPIFirewallRules(firewallId: string): Promise<FirewallRule[]>;
  createFirewallRule(data: Partial<FirewallRule>, schoolId: string): Promise<FirewallRule>;
  updateFirewallRule(ruleId: string, data: Partial<FirewallRule>): Promise<FirewallRule>;
  deleteFirewallRule(ruleId: string): Promise<void>;
  getActiveAPIFirewalls(schoolId: string): Promise<APIFirewall[]>;
  getAPIFirewallStats(firewallId: string): Promise<{ blockedRequests: number; allowedRequests: number; totalRules: number; activeRules: number }>;

  // === IP ALLOWLIST / BLOCKLIST ===
  getIPAllowlists(schoolId: string, filters?: Record<string, unknown>): Promise<IPAllowlist[]>;
  getIPAllowlist(listId: string): Promise<IPAllowlist>;
  createIPAllowlist(data: Partial<IPAllowlist>, schoolId: string): Promise<IPAllowlist>;
  updateIPAllowlist(listId: string, data: Partial<IPAllowlist>): Promise<IPAllowlist>;
  deleteIPAllowlist(listId: string): Promise<void>;
  addIPToAllowlist(listId: string, ip: string, description?: string): Promise<void>;
  removeIPFromAllowlist(listId: string, ip: string): Promise<void>;
  getIPBlocklists(schoolId: string, filters?: Record<string, unknown>): Promise<IPBlocklist[]>;
  getIPBlocklist(listId: string): Promise<IPBlocklist>;
  createIPBlocklist(data: Partial<IPBlocklist>, schoolId: string): Promise<IPBlocklist>;
  updateIPBlocklist(listId: string, data: Partial<IPBlocklist>): Promise<IPBlocklist>;
  deleteIPBlocklist(listId: string): Promise<void>;
  addIPToBlocklist(listId: string, ip: string, reason?: string): Promise<void>;
  removeIPFromBlocklist(listId: string, ip: string): Promise<void>;
  checkIPAccess(schoolId: string, ip: string): Promise<{ allowed: boolean; reason: string }>;

  // === BOT PROTECTION ===
  getBotProtections(schoolId: string, filters?: Record<string, unknown>): Promise<BotProtection[]>;
  getBotProtection(protectionId: string): Promise<BotProtection>;
  createBotProtection(data: Partial<BotProtection>, schoolId: string): Promise<BotProtection>;
  updateBotProtection(protectionId: string, data: Partial<BotProtection>): Promise<BotProtection>;
  deleteBotProtection(protectionId: string): Promise<void>;
  activateBotProtection(protectionId: string): Promise<BotProtection>;
  deactivateBotProtection(protectionId: string): Promise<BotProtection>;
  getActiveBotProtections(schoolId: string): Promise<BotProtection[]>;
  testBotProtection(protectionId: string, request: Record<string, unknown>): Promise<{ blocked: boolean; confidence: number; reason: string }>;
  getBotProtectionStats(protectionId: string): Promise<{ totalRequests: number; blockedRequests: number; falsePositives: number; accuracy: number }>;

  // === THREAT DETECTION ===
  getThreatDetections(schoolId: string, filters?: Record<string, unknown>): Promise<ThreatDetection[]>;
  getThreatDetection(detectionId: string): Promise<ThreatDetection>;
  createThreatDetection(data: Partial<ThreatDetection>, schoolId: string): Promise<ThreatDetection>;
  updateThreatDetection(detectionId: string, data: Partial<ThreatDetection>): Promise<ThreatDetection>;
  deleteThreatDetection(detectionId: string): Promise<void>;
  getThreatDetectionsBySeverity(schoolId: string, severity: string): Promise<ThreatDetection[]>;
  getActiveThreatDetections(schoolId: string): Promise<ThreatDetection[]>;
  acknowledgeThreat(detectionId: string, acknowledgedBy: string): Promise<ThreatDetection>;
  mitigateThreat(detectionId: string, mitigatedBy: string, notes?: string): Promise<ThreatDetection>;
  getThreatDetectionStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; active: number; mitigated: number; byType: Record<string, number>; bySeverity: Record<string, number> }>;

  // === SECURITY POLICY ===
  getSecurityPolicies(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityPolicy[]>;
  getSecurityPolicy(policyId: string): Promise<SecurityPolicy>;
  createSecurityPolicy(data: Partial<SecurityPolicy>, schoolId: string): Promise<SecurityPolicy>;
  updateSecurityPolicy(policyId: string, data: Partial<SecurityPolicy>): Promise<SecurityPolicy>;
  deleteSecurityPolicy(policyId: string): Promise<void>;
  searchSecurityPolicies(schoolId: string, query: string): Promise<SecurityPolicy[]>;
  activateSecurityPolicy(policyId: string): Promise<SecurityPolicy>;
  deactivateSecurityPolicy(policyId: string): Promise<SecurityPolicy>;
  getActiveSecurityPolicies(schoolId: string): Promise<SecurityPolicy[]>;
  validateSecurityPolicy(policyId: string): Promise<{ valid: boolean; violations: string[] }>;

  // === COMPLIANCE REPORT ===
  getComplianceReports(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceReport[]>;
  getComplianceReport(reportId: string): Promise<ComplianceReport>;
  generateComplianceReport(schoolId: string, options: Record<string, unknown>): Promise<ComplianceReport>;
  updateComplianceReport(reportId: string, data: Partial<ComplianceReport>): Promise<ComplianceReport>;
  deleteComplianceReport(reportId: string): Promise<void>;
  getComplianceReportsByType(schoolId: string, reportType: string): Promise<ComplianceReport[]>;
  exportComplianceReport(reportId: string, format: string): Promise<{ url: string; expiresAt: string }>;
  getComplianceReportStats(schoolId: string): Promise<{ total: number; byFramework: Record<string, number>; complianceScore: number }>;

  // === SECURITY EVENT ===
  getSecurityEvents(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityEvent[]>;
  getSecurityEvent(eventId: string): Promise<SecurityEvent>;
  createSecurityEvent(data: Partial<SecurityEvent>, schoolId: string): Promise<SecurityEvent>;
  updateSecurityEvent(eventId: string, data: Partial<SecurityEvent>): Promise<SecurityEvent>;
  deleteSecurityEvent(eventId: string): Promise<void>;
  searchSecurityEvents(schoolId: string, query: string): Promise<SecurityEvent[]>;
  getSecurityEventsByType(schoolId: string, eventType: string): Promise<SecurityEvent[]>;
  getSecurityEventsBySeverity(schoolId: string, severity: string): Promise<SecurityEvent[]>;
  getRecentSecurityEvents(schoolId: string, limit?: number): Promise<SecurityEvent[]>;
  getActiveSecurityEvents(schoolId: string): Promise<SecurityEvent[]>;
  getSecurityEventStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; byType: Record<string, number>; bySeverity: Record<string, number>; resolved: number; unresolved: number }>;

  // === DATA CLASSIFICATION ===
  getDataClassifications(schoolId: string, filters?: Record<string, unknown>): Promise<DataClassification[]>;
  getDataClassification(classificationId: string): Promise<DataClassification>;
  createDataClassification(data: Partial<DataClassification>, schoolId: string): Promise<DataClassification>;
  updateDataClassification(classificationId: string, data: Partial<DataClassification>): Promise<DataClassification>;
  deleteDataClassification(classificationId: string): Promise<void>;
  classifyData(entityType: string, entityId: string, classificationId: string): Promise<void>;
  getDataClassificationsByLevel(schoolId: string, level: string): Promise<DataClassification[]>;
  getDataClassificationStats(schoolId: string): Promise<{ total: number; byLevel: Record<string, number>; classifiedEntities: number; unclassifiedEntities: number }>;

  // === ACCESS CONTROL ===
  getAccessControls(schoolId: string, filters?: Record<string, unknown>): Promise<AccessControl[]>;
  getAccessControl(controlId: string): Promise<AccessControl>;
  createAccessControl(data: Partial<AccessControl>, schoolId: string): Promise<AccessControl>;
  updateAccessControl(controlId: string, data: Partial<AccessControl>): Promise<AccessControl>;
  deleteAccessControl(controlId: string): Promise<void>;
  searchAccessControls(schoolId: string, query: string): Promise<AccessControl[]>;
  getAccessControlsByResource(schoolId: string, resourceType: string, resourceId: string): Promise<AccessControl[]>;
  getAccessControlsByUser(schoolId: string, userId: string): Promise<AccessControl[]>;
  checkAccess(userId: string, resourceType: string, resourceId: string, action: string): Promise<{ allowed: boolean; reason: string }>;
  getAccessControlStats(schoolId: string): Promise<{ total: number; byResourceType: Record<string, number>; byAction: Record<string, number> }>;

  // === SESSION LOG ===
  getSessionLogs(schoolId: string, filters?: Record<string, unknown>): Promise<SessionLog[]>;
  getSessionLog(logId: string): Promise<SessionLog>;
  createSessionLog(data: Partial<SessionLog>, schoolId: string): Promise<SessionLog>;
  deleteSessionLog(logId: string): Promise<void>;
  searchSessionLogs(schoolId: string, query: string): Promise<SessionLog[]>;
  getSessionLogsByUser(schoolId: string, userId: string): Promise<SessionLog[]>;
  getSessionLogsByStatus(schoolId: string, status: string): Promise<SessionLog[]>;
  getRecentSessionLogs(schoolId: string, limit?: number): Promise<SessionLog[]>;
  terminateSession(sessionId: string): Promise<void>;
  getActiveSessionLogs(schoolId: string): Promise<SessionLog[]>;
  getSessionLogStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; active: number; terminated: number; byStatus: Record<string, number> }>;

  // === THREAT INTELLIGENCE ===
  getThreatIntelligence(schoolId: string, filters?: Record<string, unknown>): Promise<ThreatIntelligence[]>;
  getThreatIntel(intelId: string): Promise<ThreatIntelligence>;
  createThreatIntel(data: Partial<ThreatIntelligence>, schoolId: string): Promise<ThreatIntelligence>;
  updateThreatIntel(intelId: string, data: Partial<ThreatIntelligence>): Promise<ThreatIntelligence>;
  deleteThreatIntel(intelId: string): Promise<void>;
  searchThreatIntelligence(schoolId: string, query: string): Promise<ThreatIntelligence[]>;
  getThreatIntelByType(schoolId: string, intelType: string): Promise<ThreatIntelligence[]>;
  getActiveThreatIntelligence(schoolId: string): Promise<ThreatIntelligence[]>;
  correlateThreatIntel(indicator: string): Promise<ThreatIntelligence[]>;
  getThreatIntelStats(schoolId: string): Promise<{ total: number; byType: Record<string, number>; active: number; expired: number }>;

  // === INCIDENT RESPONSE ===
  getIncidentResponses(schoolId: string, filters?: Record<string, unknown>): Promise<IncidentResponse[]>;
  getIncidentResponse(incidentId: string): Promise<IncidentResponse>;
  createIncidentResponse(data: Partial<IncidentResponse>, schoolId: string): Promise<IncidentResponse>;
  updateIncidentResponse(incidentId: string, data: Partial<IncidentResponse>): Promise<IncidentResponse>;
  deleteIncidentResponse(incidentId: string): Promise<void>;
  searchIncidentResponses(schoolId: string, query: string): Promise<IncidentResponse[]>;
  getIncidentResponsesByStatus(schoolId: string, status: string): Promise<IncidentResponse[]>;
  getIncidentResponsesBySeverity(schoolId: string, severity: string): Promise<IncidentResponse[]>;
  escalateIncident(incidentId: string, escalatedTo: string): Promise<IncidentResponse>;
  resolveIncident(incidentId: string, resolvedBy: string, resolution: string): Promise<IncidentResponse>;
  getActiveIncidents(schoolId: string): Promise<IncidentResponse[]>;
  getIncidentResponseStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; active: number; resolved: number; avgResolutionTimeMs: number; bySeverity: Record<string, number> }>;

  // === SECURITY SCAN ===
  getSecurityScans(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityScan[]>;
  getSecurityScan(scanId: string): Promise<SecurityScan>;
  runSecurityScan(schoolId: string, options?: Record<string, unknown>): Promise<SecurityScan>;
  updateSecurityScan(scanId: string, data: Partial<SecurityScan>): Promise<SecurityScan>;
  deleteSecurityScan(scanId: string): Promise<void>;
  getSecurityScanFindings(scanId: string): Promise<SecurityFinding[]>;
  getSecurityScansByType(schoolId: string, scanType: string): Promise<SecurityScan[]>;
  getRecentSecurityScans(schoolId: string, limit?: number): Promise<SecurityScan[]>;
  getSecurityScanStats(schoolId: string): Promise<{ total: number; lastScanAt: string | null; findingsBySeverity: Record<string, number> }>;

  // === COMPLIANCE CHECK ===
  getComplianceChecks(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceCheck[]>;
  getComplianceCheck(checkId: string): Promise<ComplianceCheck>;
  runComplianceCheck(schoolId: string, framework: string, options?: Record<string, unknown>): Promise<ComplianceCheck>;
  updateComplianceCheck(checkId: string, data: Partial<ComplianceCheck>): Promise<ComplianceCheck>;
  deleteComplianceCheck(checkId: string): Promise<void>;
  getComplianceCheckResults(checkId: string): Promise<Record<string, unknown>[]>;
  getComplianceChecksByFramework(schoolId: string, framework: string): Promise<ComplianceCheck[]>;
  getRecentComplianceChecks(schoolId: string, limit?: number): Promise<ComplianceCheck[]>;
  getComplianceCheckStats(schoolId: string): Promise<{ total: number; passed: number; failed: number; warnings: number; byFramework: Record<string, number> }>;

  // === SECURITY DASHBOARD ===
  getSecurityDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityDashboard[]>;
  getSecurityDashboard(dashboardId: string): Promise<SecurityDashboard>;
  createSecurityDashboard(data: Partial<SecurityDashboard>, schoolId: string): Promise<SecurityDashboard>;
  updateSecurityDashboard(dashboardId: string, data: Partial<SecurityDashboard>): Promise<SecurityDashboard>;
  deleteSecurityDashboard(dashboardId: string): Promise<void>;
  getSecurityDashboardSummary(schoolId: string): Promise<{ overallScore: number; activeThreats: number; openIncidents: number; complianceScore: number; recentEvents: number }>;
  getDefaultSecurityDashboard(schoolId: string): Promise<SecurityDashboard>;

  // === DATA ENCRYPTION ===
  getDataEncryptions(schoolId: string, filters?: Record<string, unknown>): Promise<DataEncryption[]>;
  getDataEncryption(encryptionId: string): Promise<DataEncryption>;
  createDataEncryption(data: Partial<DataEncryption>, schoolId: string): Promise<DataEncryption>;
  updateDataEncryption(encryptionId: string, data: Partial<DataEncryption>): Promise<DataEncryption>;
  deleteDataEncryption(encryptionId: string): Promise<void>;
  getDataEncryptionsByEntity(entityType: string, entityId: string): Promise<DataEncryption[]>;
  getDataEncryptionStats(schoolId: string): Promise<{ total: number; byAlgorithm: Record<string, number>; encryptedEntities: number }>;

  // === BACKUP STATUS ===
  getBackupStatuses(schoolId: string, filters?: Record<string, unknown>): Promise<BackupStatus[]>;
  getBackupStatus(statusId: string): Promise<BackupStatus>;
  createBackupStatus(data: Partial<BackupStatus>, schoolId: string): Promise<BackupStatus>;
  updateBackupStatus(statusId: string, data: Partial<BackupStatus>): Promise<BackupStatus>;
  deleteBackupStatus(statusId: string): Promise<void>;
  getBackupStatusesByType(schoolId: string, backupType: string): Promise<BackupStatus[]>;
  getRecentBackupStatuses(schoolId: string, limit?: number): Promise<BackupStatus[]>;
  getBackupStatusStats(schoolId: string): Promise<{ total: number; successful: number; failed: number; inProgress: number; lastBackupAt: string | null }>;

  // === DISASTER RECOVERY ===
  getDisasterRecoveryPlans(schoolId: string, filters?: Record<string, unknown>): Promise<DisasterRecoveryPlan[]>;
  getDisasterRecoveryPlan(planId: string): Promise<DisasterRecoveryPlan>;
  createDisasterRecoveryPlan(data: Partial<DisasterRecoveryPlan>, schoolId: string): Promise<DisasterRecoveryPlan>;
  updateDisasterRecoveryPlan(planId: string, data: Partial<DisasterRecoveryPlan>): Promise<DisasterRecoveryPlan>;
  deleteDisasterRecoveryPlan(planId: string): Promise<void>;
  testDisasterRecoveryPlan(planId: string): Promise<Record<string, unknown>>;
  getActiveDisasterRecoveryPlans(schoolId: string): Promise<DisasterRecoveryPlan[]>;
  getDisasterRecoveryPlanTests(planId: string): Promise<Record<string, unknown>[]>;

  // === AI TOKEN USAGE ===
  getAITokenUsages(schoolId: string, filters?: Record<string, unknown>): Promise<AITokenUsage[]>;
  getAITokenUsage(usageId: string): Promise<AITokenUsage>;
  recordAITokenUsage(data: Partial<AITokenUsage>, schoolId: string): Promise<AITokenUsage>;
  getAITokenUsageByModel(schoolId: string, modelId: string): Promise<AITokenUsage[]>;
  getAITokenUsageByUser(schoolId: string, userId: string): Promise<AITokenUsage[]>;
  getAITokenUsageStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ totalTokens: number; totalCost: number; byModel: Record<string, number>; byUser: Record<string, number> }>;

  // === SEARCH RESULT ===
  getSearchResults(schoolId: string, filters?: Record<string, unknown>): Promise<SearchResult[]>;
  performSearch(schoolId: string, query: string, options?: Record<string, unknown>): Promise<SearchResult[]>;
  getSearchResult(resultId: string): Promise<SearchResult>;
  getRecentSearches(schoolId: string, userId: string): Promise<SearchResult[]>;
  getSearchStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<{ total: number; uniqueQueries: number; avgResultCount: number; avgResponseTimeMs: number }>;

  // === PLUGIN HOOK ===
  getPluginHooks(schoolId: string, filters?: Record<string, unknown>): Promise<PluginHook[]>;
  getPluginHook(hookId: string): Promise<PluginHook>;
  createPluginHook(data: Partial<PluginHook>, schoolId: string): Promise<PluginHook>;
  updatePluginHook(hookId: string, data: Partial<PluginHook>): Promise<PluginHook>;
  deletePluginHook(hookId: string): Promise<void>;
  getPluginHooksByEvent(schoolId: string, eventName: string): Promise<PluginHook[]>;
  getPluginHooksByPlugin(schoolId: string, pluginId: string): Promise<PluginHook[]>;
  executePluginHook(hookId: string, eventData: Record<string, unknown>): Promise<Record<string, unknown>>;
  getActivePluginHooks(schoolId: string): Promise<PluginHook[]>;

  // === API ENDPOINT DEF ===
  getAPIEndpointDefs(schoolId: string, filters?: Record<string, unknown>): Promise<APIEndpointDef[]>;
  getAPIEndpointDef(defId: string): Promise<APIEndpointDef>;
  createAPIEndpointDef(data: Partial<APIEndpointDef>, schoolId: string): Promise<APIEndpointDef>;
  updateAPIEndpointDef(defId: string, data: Partial<APIEndpointDef>): Promise<APIEndpointDef>;
  deleteAPIEndpointDef(defId: string): Promise<void>;
  searchAPIEndpointDefs(schoolId: string, query: string): Promise<APIEndpointDef[]>;
  getAPIEndpointDefsByCollection(collectionId: string): Promise<APIEndpointDef[]>;

  // === API COLLECTION ===
  getAPICollections(schoolId: string, filters?: Record<string, unknown>): Promise<APICollection[]>;
  getAPICollection(collectionId: string): Promise<APICollection>;
  createAPICollection(data: Partial<APICollection>, schoolId: string): Promise<APICollection>;
  updateAPICollection(collectionId: string, data: Partial<APICollection>): Promise<APICollection>;
  deleteAPICollection(collectionId: string): Promise<void>;
  searchAPICollections(schoolId: string, query: string): Promise<APICollection[]>;
  getAPICollectionEndpoints(collectionId: string): Promise<APIEndpointDef[]>;

  // === DASHBOARD WIDGET ===
  getDashboardWidgets(schoolId: string, filters?: Record<string, unknown>): Promise<DashboardWidget[]>;
  getDashboardWidget(widgetId: string): Promise<DashboardWidget>;
  createDashboardWidget(data: Partial<DashboardWidget>, schoolId: string): Promise<DashboardWidget>;
  updateDashboardWidget(widgetId: string, data: Partial<DashboardWidget>): Promise<DashboardWidget>;
  deleteDashboardWidget(widgetId: string): Promise<void>;
  searchDashboardWidgets(schoolId: string, query: string): Promise<DashboardWidget[]>;
  getDashboardWidgetsByType(schoolId: string, widgetType: string): Promise<DashboardWidget[]>;
  getActiveDashboardWidgets(schoolId: string): Promise<DashboardWidget[]>;
}

// === STATS INTERFACES ===

export interface IntegrationDashboardStats {
  totalIntegrations: number;
  activeIntegrations: number;
  inactiveIntegrations: number;
  errorIntegrations: number;
  integrationsLast24h: number;
  integrationsLast7d: number;
  integrationsLast30d: number;
  avgResponseTimeMs: number;
  totalAPICalls: number;
  apiCallsLast24h: number;
  apiCallsLast7d: number;
  apiCallsLast30d: number;
  errorRate: number;
  uptimePercent: number;
  totalWebhooks: number;
  activeWebhooks: number;
  failedWebhookDeliveries: number;
  webhookDeliveryRate: number;
  totalAPIKeys: number;
  activeAPIKeys: number;
  expiredAPIKeys: number;
  integrationsByType: Record<string, number>;
  integrationsByStatus: Record<string, number>;
  topIntegrations: Array<{ id: string; name: string; calls: number }>;
  recentAlerts: number;
  healthScore: number;
}

export interface WebhookStats {
  totalWebhooks: number;
  activeWebhooks: number;
  inactiveWebhooks: number;
  failedWebhooks: number;
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  pendingDeliveries: number;
  deliveriesLast24h: number;
  deliveriesLast7d: number;
  deliveriesLast30d: number;
  avgDeliveryTimeMs: number;
  retryCount: number;
  webhookByEvent: Record<string, number>;
  webhookByStatus: Record<string, number>;
  topWebhooks: Array<{ id: string; url: string; deliveries: number; successRate: number }>;
  deadLetterQueueSize: number;
  avgRetrySuccessRate: number;
  deliverySuccessRate: number;
}

export interface EventBusStats {
  totalEvents: number;
  eventsLast24h: number;
  eventsLast7d: number;
  eventsLast30d: number;
  totalTopics: number;
  activeTopics: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalConsumers: number;
  activeConsumers: number;
  totalProducers: number;
  activeProducers: number;
  avgEventLatencyMs: number;
  eventsByType: Record<string, number>;
  eventsByTopic: Record<string, number>;
  topicThroughput: Record<string, number>;
  failedEvents: number;
  deadLetterQueueSize: number;
  eventRetentionHours: number;
  avgEventsPerSecond: number;
  peakEventsPerSecond: number;
}

export interface AutomationStats {
  totalAutomations: number;
  activeAutomations: number;
  inactiveAutomations: number;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  runningExecutions: number;
  executionsLast24h: number;
  executionsLast7d: number;
  executionsLast30d: number;
  avgExecutionTimeMs: number;
  avgStepsPerAutomation: number;
  totalTemplates: number;
  activeTemplates: number;
  totalSchedules: number;
  activeSchedules: number;
  automationsByType: Record<string, number>;
  automationsByStatus: Record<string, number>;
  topAutomations: Array<{ id: string; name: string; executions: number; successRate: number }>;
  executionSuccessRate: number;
  avgAutomationDurationMs: number;
}

export interface ConnectorStats {
  totalConnectors: number;
  activeConnectors: number;
  inactiveConnectors: number;
  errorConnectors: number;
  totalConfigs: number;
  activeConfigs: number;
  totalMappings: number;
  activeMappings: number;
  totalSyncs: number;
  successfulSyncs: number;
  failedSyncs: number;
  syncsLast24h: number;
  syncsLast7d: number;
  syncsLast30d: number;
  avgSyncTimeMs: number;
  avgSyncSuccessRate: number;
  connectorsByType: Record<string, number>;
  connectorsByStatus: Record<string, number>;
  topConnectors: Array<{ id: string; name: string; syncs: number; successRate: number }>;
  totalDataSyncedBytes: number;
  avgRecordsPerSync: number;
}

export interface AIStats {
  totalModels: number;
  activeModels: number;
  totalAgents: number;
  activeAgents: number;
  totalTools: number;
  activeTools: number;
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  failedTasks: number;
  totalPrompts: number;
  activePrompts: number;
  totalKnowledgeBases: number;
  activeKnowledgeBases: number;
  totalAssistants: number;
  activeAssistants: number;
  totalPipelines: number;
  activePipelines: number;
  tasksLast24h: number;
  tasksLast7d: number;
  tasksLast30d: number;
  avgTaskDurationMs: number;
  totalTokensUsed: number;
  tokensUsedLast24h: number;
  tokensUsedLast7d: number;
  tokensUsedLast30d: number;
  totalCost: number;
  costLast24h: number;
  costLast7d: number;
  costLast30d: number;
  modelsByProvider: Record<string, number>;
  modelsByCapability: Record<string, number>;
  tasksByStatus: Record<string, number>;
  tasksByType: Record<string, number>;
  avgModelResponseTimeMs: number;
  modelAccuracy: Record<string, number>;
  knowledgeBaseIndexSize: number;
  totalConversations: number;
  conversationsLast24h: number;
  avgConversationLength: number;
}

export interface MarketplaceStats {
  totalItems: number;
  activeItems: number;
  totalReviews: number;
  avgRating: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalLicenses: number;
  activeLicenses: number;
  totalInstalls: number;
  installsLast24h: number;
  installsLast7d: number;
  installsLast30d: number;
  totalUninstalls: number;
  itemsByCategory: Record<string, number>;
  itemsByType: Record<string, number>;
  itemsByPricing: Record<string, number>;
  topItems: Array<{ id: string; name: string; installs: number; rating: number }>;
  topCategories: Array<{ category: string; count: number; installs: number }>;
  avgInstallRate: number;
  avgUninstallRate: number;
  totalRevenue: number;
  revenueLast30d: number;
  reviewsByRating: Record<string, number>;
}

export interface DeveloperStats {
  totalApps: number;
  activeApps: number;
  totalSecrets: number;
  activeSecrets: number;
  totalSDKDownloads: number;
  sdkDownloadsLast24h: number;
  sdkDownloadsLast7d: number;
  sdkDownloadsLast30d: number;
  totalCodeSamples: number;
  totalAPIExplorers: number;
  totalLogs: number;
  logsLast24h: number;
  logsLast7d: number;
  logsLast30d: number;
  avgResponseTimeMs: number;
  totalAPICalls: number;
  apiCallsLast24h: number;
  apiCallsLast7d: number;
  apiCallsLast30d: number;
  appsByStatus: Record<string, number>;
  appsByType: Record<string, number>;
  topApps: Array<{ id: string; name: string; calls: number }>;
  sdkDownloadsByLanguage: Record<string, number>;
  avgRequestsPerApp: number;
  peakConcurrentRequests: number;
  totalDevelopers: number;
  activeDevelopersLast30d: number;
}

export interface ObservabilityStats {
  totalMetrics: number;
  metricsLast24h: number;
  metricsLast7d: number;
  metricsLast30d: number;
  totalTraces: number;
  tracesLast24h: number;
  tracesLast7d: number;
  tracesLast30d: number;
  avgTraceDurationMs: number;
  traceErrorRate: number;
  totalLogs: number;
  logsLast24h: number;
  logsLast7d: number;
  logsLast30d: number;
  logsByLevel: Record<string, number>;
  totalPerformanceMetrics: number;
  performanceMetricsLast24h: number;
  avgResponseTimeMs: number;
  p95ResponseTimeMs: number;
  p99ResponseTimeMs: number;
  totalAlerts: number;
  activeAlerts: number;
  acknowledgedAlerts: number;
  resolvedAlerts: number;
  alertsBySeverity: Record<string, number>;
  alertsByType: Record<string, number>;
  totalHealthChecks: number;
  healthyChecks: number;
  unhealthyChecks: number;
  degradedChecks: number;
  avgHealthCheckLatencyMs: number;
  totalDashboards: number;
  publicDashboards: number;
  totalCronMonitors: number;
  activeCronMonitors: number;
  failedCronJobs: number;
  totalQueueMonitors: number;
  activeQueueMonitors: number;
  avgQueueDepth: number;
  totalAPIMonitors: number;
  activeAPIMonitors: number;
  apiUptimePercent: number;
  totalDatabaseMonitors: number;
  activeDatabaseMonitors: number;
  avgQueryTimeMs: number;
  slowQueriesCount: number;
}

export interface SecurityStats {
  totalFirewalls: number;
  activeFirewalls: number;
  totalFirewallRules: number;
  activeFirewallRules: number;
  blockedRequests: number;
  allowedRequests: number;
  totalIPAllowlists: number;
  totalIPBlocklists: number;
  blockedIPs: number;
  allowedIPs: number;
  totalBotProtections: number;
  activeBotProtections: number;
  botBlockedRequests: number;
  botDetectionAccuracy: number;
  totalThreatDetections: number;
  activeThreats: number;
  mitigatedThreats: number;
  threatsByType: Record<string, number>;
  threatsBySeverity: Record<string, number>;
  totalSecurityPolicies: number;
  activeSecurityPolicies: number;
  complianceScore: number;
  totalComplianceReports: number;
  complianceReportsLast30d: number;
  totalSecurityEvents: number;
  securityEventsLast24h: number;
  securityEventsLast7d: number;
  securityEventsLast30d: number;
  securityEventsByType: Record<string, number>;
  securityEventsBySeverity: Record<string, number>;
  unresolvedSecurityEvents: number;
  totalDataClassifications: number;
  classifiedEntities: number;
  unclassifiedEntities: number;
  dataClassificationByLevel: Record<string, number>;
  totalAccessControls: number;
  accessControlsByResourceType: Record<string, number>;
  totalSessionLogs: number;
  activeSessions: number;
  terminatedSessions: number;
  totalThreatIntelligence: number;
  activeThreatIntel: number;
  threatIntelByType: Record<string, number>;
  totalIncidents: number;
  activeIncidents: number;
  resolvedIncidents: number;
  avgIncidentResolutionTimeMs: number;
  incidentsBySeverity: Record<string, number>;
  totalSecurityScans: number;
  lastScanAt: string | null;
  scanFindingsBySeverity: Record<string, number>;
  totalEncryptionKeys: number;
  activeEncryptionKeys: number;
  pendingKeyRotations: number;
  totalAuditTrails: number;
  auditTrailsLast24h: number;
  auditTrailsLast7d: number;
  auditTrailsLast30d: number;
  totalSecretVaults: number;
  totalSecrets: number;
  totalDataEncryptions: number;
  encryptedEntities: number;
  totalBackupStatuses: number;
  successfulBackups: number;
  failedBackups: number;
  lastBackupAt: string | null;
  totalDisasterRecoveryPlans: number;
  activeDRPlans: number;
  lastDRTestAt: string | null;
  overallSecurityScore: number;
}

export type {
  Integration,
  IntegrationStatus,
  APIKey,
  APIKeyStatus,
  OAuthToken,
  OAuthConfig,
  RateLimitConfig,
  APILog,
  APIAnalytics,
  APIVersion,
  SDKGenerator,
  APIEndpoint,
  Webhook,
  WebhookEvent,
  WebhookDelivery,
  WebhookTemplate,
  WebhookSecret,
  DeadLetterQueue,
  Event,
  Topic,
  EventSubscription,
  EventConsumer,
  EventProducer,
  PriorityQueue,
  DelayedEvent,
  EventMetrics,
  CorrelationChain,
  SagaDefinition,
  SagaExecution,
  DomainEvent,
  StreamingConfig,
  EventFilter,
  IntegrationHealth,
  IntegrationMetrics,
  GatewayConfig,
  Automation,
  AutomationStep,
  AutomationCondition,
  AutomationExecution,
  AutomationLog,
  AutomationTemplate,
  AutomationSchedule,
  Workflow,
  WorkflowStep,
  WorkflowExecution,
  WorkflowVersion,
  HumanApproval,
  Connector,
  ConnectorConfig,
  ConnectorMapping,
  ConnectorSync,
  ConnectorLog,
  ConnectorHealth,
  ConnectorMetrics,
  AIModel,
  AIAgent,
  AITool,
  AITask,
  AIPrompt,
  AIPromptVersion,
  AIKnowledgeBase,
  AIKnowledgeDocument,
  AISemanticSearch,
  AIRAGExecution,
  AIAssistant,
  AIAssistantConversation,
  AIClassification,
  AISummarization,
  AIOCRExecution,
  AITranslationExecution,
  AIRecommendation,
  AIModeration,
  AIEvaluation,
  MarketplaceItem,
  MarketplaceReview,
  MarketplaceSubscription,
  MarketplaceLicense,
  Plugin,
  Extension,
  DeveloperApp,
  DeveloperSecret,
  SDKDownload,
  CodeSample,
  APIExplorer,
  DeveloperLog,
  DeveloperUsage,
  DeveloperDashboard,
  MarketplaceSearchResult,
  PluginInstallation,
  ExtensionInstallation,
  MarketplaceAnalytics,
  AIPipeline,
  AIPipelineExecution,
  Metric,
  MetricSeries,
  Trace,
  Span,
  DistributedLog,
  PerformanceMetric,
  Alert,
  HealthCheck,
  HealthCheckResult,
  MonitoringDashboard,
  CronMonitor,
  QueueMonitor,
  APIMonitor,
  DatabaseMonitor,
  SecretVault,
  EncryptionKey,
  KeyRotation,
  AuditTrail,
  APIFirewall,
  FirewallRule,
  IPAllowlist,
  IPBlocklist,
  BotProtection,
  ThreatDetection,
  SecurityPolicy,
  ComplianceReport,
  SecurityEvent,
  DataClassification,
  AccessControl,
  SessionLog,
  ThreatIntelligence,
  IncidentResponse,
  SecurityScan,
  SecurityFinding,
  ComplianceCheck,
  AuditExport,
  SecurityDashboard,
  DataEncryption,
  BackupStatus,
  DisasterRecoveryPlan,
  AITaskStatus,
  AITokenUsage,
  SearchResult,
  ModerationResult,
  EvaluationScore,
  PluginHook,
  APIEndpointDef,
  APICollection,
  DashboardWidget,
};

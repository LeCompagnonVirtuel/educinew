export const gedkinDataFabricConfig = {
  enabled: true,
  maxDomainsPerSchool: 50,
  maxProductsPerDomain: 100,
  maxSourcesPerDomain: 50,
  qualityCheckInterval: 3600,
  lineageTrackingEnabled: true,
  dataProfilingEnabled: true,
  versioningEnabled: true,
  classificationLevels: ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED', 'TOP_SECRET'],
  visibilityLevels: ['PRIVATE', 'INSTITUTIONAL', 'REGIONAL', 'NATIONAL', 'INTERNATIONAL', 'PUBLIC'],
};

export const gedkinKnowledgeGraphConfig = {
  enabled: true,
  maxEntitiesPerSchool: 100000,
  maxRelationsPerSchool: 500000,
  embeddingDimensions: 1536,
  graphTraversalMaxDepth: 5,
  entityResolutionThreshold: 0.85,
  snapshotRetentionDays: 90,
  autoIndexEnabled: true,
};

export const gedkinSemanticConfig = {
  enabled: true,
  supportedLanguages: ['fr', 'en', 'es', 'ar', 'pt'],
  defaultLanguage: 'fr',
  embeddingModel: 'MULTILINGUAL_E5',
  vectorSearchTopK: 10,
  hybridSearchEnabled: true,
  ontologyMaxConcepts: 10000,
  taxonomyMaxDepth: 10,
  synonymResolutionEnabled: true,
};

export const gedkinResearchConfig = {
  enabled: true,
  maxProjectsPerSchool: 200,
  maxPublicationsPerProject: 50,
  citationTrackingEnabled: true,
  trendAnalysisEnabled: true,
  collaborationNetworkEnabled: true,
  impactCalculationEnabled: true,
  openAccessPriority: true,
};

export const gedkinObservatoryConfig = {
  enabled: true,
  indicatorCategories: ['ENROLLMENT', 'LITERACY', 'GRADUATION', 'DROPOUT', 'ATTENDANCE', 'TEACHER_RATIO', 'SPENDING', 'INFRASTRUCTURE', 'DIGITAL_ACCESS', 'LEARNING_OUTCOMES', 'GENDER_PARITY', 'INCLUSION', 'EMPLOYMENT', 'SKILLS', 'MOBILITY'],
  defaultFrequency: 'ANNUAL',
  benchmarkingEnabled: true,
  sdgAlignmentEnabled: true,
  rankingEnabled: true,
  historicalDataRetentionYears: 10,
  crossCountryComparisonEnabled: true,
};

export const gedkinPolicyConfig = {
  enabled: true,
  maxPoliciesPerSchool: 100,
  simulationEnabled: true,
  impactAnalysisEnabled: true,
  whatIfAnalysisEnabled: true,
  costBenefitAnalysisEnabled: true,
  policyComparisonEnabled: true,
  recommendationEngineEnabled: true,
  humanApprovalRequired: true,
};

export const gedkinForecastConfig = {
  enabled: true,
  supportedModels: ['LINEAR_REGRESSION', 'ARIMA', 'PROPHET', 'LSTM', 'ENSEMBLE', 'TRANSFORMER'],
  defaultModel: 'ENSEMBLE',
  maxForecastsPerSchool: 100,
  maxHorizonDays: 365,
  confidenceLevel: 0.95,
  driftDetectionEnabled: true,
  modelRegistryEnabled: true,
  explainabilityRequired: true,
  predictionDisclaimerEstimate: true,
};

export const gedkinAgentConfig = {
  enabled: true,
  supportedAgentTypes: ['RESEARCH', 'DATA_ANALYST', 'POLICY', 'CURRICULUM', 'STUDENT_INTELLIGENCE', 'TEACHER_INTELLIGENCE', 'FINANCE_INTELLIGENCE', 'INFRASTRUCTURE', 'GOVERNMENT', 'COMPLIANCE', 'GLOBAL_EDUCATION', 'KNOWLEDGE_GRAPH', 'FORECASTING', 'OBSERVATORY'],
  maxAgentsPerSchool: 20,
  maxConcurrentTasks: 10,
  taskTimeoutSeconds: 300,
  humanInTheLoopRequired: true,
  confidenceThreshold: 0.7,
  memoryTtlSeconds: 3600,
  auditAllAgentActions: true,
  toolAuthorizationRequired: true,
};

export const gedkinExperimentConfig = {
  enabled: true,
  maxExperimentsPerSchool: 50,
  maxDatasetsPerSchool: 200,
  maxModelsPerExperiment: 10,
  reproducibilityRequired: true,
  artifactRetentionDays: 365,
  benchmarkingEnabled: true,
  versionControlEnabled: true,
};

export const gedkinMarketplaceConfig = {
  enabled: true,
  maxProductsPerSchool: 100,
  ratingEnabled: true,
  reviewEnabled: true,
  usageTrackingEnabled: true,
  slaMonitoringEnabled: true,
  licensingEnforcement: true,
  dataContractEnforcement: true,
  downloadTrackingEnabled: true,
  pricingModels: ['FREE', 'COMMERCIAL', 'RESEARCH', 'EDUCATIONAL', 'GOVERNMENT'],
};

export const gedkinSimulationConfig = {
  enabled: true,
  maxSimulationsPerSchool: 50,
  maxScenariosPerSimulation: 20,
  maxRunsPerScenario: 100,
  monteCarloEnabled: true,
  monteCarloDefaultRuns: 1000,
  sensitivityAnalysisEnabled: true,
  comparisonEnabled: true,
  simulationTimeoutSeconds: 600,
  resultRetentionDays: 365,
};

export const gedkinCopilotConfig = {
  enabled: true,
  maxQueriesPerUser: 100,
  maxConversationLength: 50,
  sqlGenerationEnabled: true,
  sqlReadOnlyByDefault: true,
  sqlValidationRequired: true,
  sqlInjectionProtection: true,
  chartGenerationEnabled: true,
  tableGenerationEnabled: true,
  reportGenerationEnabled: true,
  citationRequired: true,
  confidenceScoreRequired: true,
  humanApprovalForCritical: true,
  conversationRetentionDays: 90,
  supportedLanguages: ['fr', 'en', 'es', 'ar', 'pt'],
};

export const gedkinAIConfig = {
  enabled: true,
  explainabilityRequired: true,
  biasMonitoringEnabled: true,
  hallucinationMitigation: true,
  promptInjectionProtection: true,
  outputValidationRequired: true,
  auditAllAIResponses: true,
  sourceAttributionRequired: true,
  maxTokensPerResponse: 4096,
  temperature: 0.7,
  modelVersionTracking: true,
  rollbackEnabled: true,
};

export const gedkinSecurityConfig = {
  enabled: true,
  rbacEnforcement: true,
  abacEnforcement: true,
  tenantIsolationStrict: true,
  zeroTrustEnabled: true,
  leastPrivilege: true,
  encryptionRequired: true,
  auditAllAccess: true,
  dataMinimization: true,
  anonymizationEnabled: true,
  pseudonymizationEnabled: true,
  dataResidencyEnforcement: true,
  consentRequired: true,
  retentionEnforcement: true,
};

export const gedkinPerformanceConfig = {
  enabled: true,
  cachingEnabled: true,
  cacheTtlSeconds: 300,
  vectorIndexEnabled: true,
  graphIndexEnabled: true,
  paginationDefault: 20,
  paginationMax: 100,
  lazyLoadingEnabled: true,
  backgroundJobEnabled: true,
  asyncProcessingEnabled: true,
  streamingEnabled: true,
  queryOptimizationEnabled: true,
};

export const gedkinConfig = {
  dataFabric: gedkinDataFabricConfig,
  knowledgeGraph: gedkinKnowledgeGraphConfig,
  semantic: gedkinSemanticConfig,
  research: gedkinResearchConfig,
  observatory: gedkinObservatoryConfig,
  policy: gedkinPolicyConfig,
  forecast: gedkinForecastConfig,
  agent: gedkinAgentConfig,
  experiment: gedkinExperimentConfig,
  marketplace: gedkinMarketplaceConfig,
  simulation: gedkinSimulationConfig,
  copilot: gedkinCopilotConfig,
  ai: gedkinAIConfig,
  security: gedkinSecurityConfig,
  performance: gedkinPerformanceConfig,
};

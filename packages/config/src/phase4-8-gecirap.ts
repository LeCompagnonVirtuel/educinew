export const gecirapCloudConfig = {
  enabled: true,
  defaultProvider: 'aws',
  supportedProviders: ['aws', 'azure', 'gcp', 'oracle', 'private', 'on_premise', 'hybrid'],
  healthCheckInterval: 60,
  resourceInventoryRefresh: 300,
  maxAccountsPerSchool: 10,
  maxResourcesPerAccount: 10000,
  tagLimits: { maxTags: 50, maxKeyLength: 128, maxValueLength: 256 },
};

export const gecirapRegionConfig = {
  enabled: true,
  defaultTopology: 'ACTIVE_PASSIVE',
  healthCheckInterval: 30,
  failoverTimeout: 60,
  maxRegionsPerSchool: 20,
  replicationLagThreshold: 1000,
  latencyThresholds: { excellent: 50, good: 100, acceptable: 200, poor: 500 },
};

export const gecirapMultiRegionConfig = {
  enabled: true,
  defaultMode: 'ACTIVE_PASSIVE',
  geoRoutingEnabled: true,
  latencyBasedRouting: true,
  healthBasedRouting: true,
  dataResidencyEnforcement: true,
  maxTrafficRoutes: 100,
};

export const gecirapContainerConfig = {
  enabled: true,
  supportedOrchestrators: ['kubernetes', 'docker_swarm', 'nomad', 'ecs'],
  defaultOrchestrator: 'kubernetes',
  maxClustersPerSchool: 10,
  maxNodesPerCluster: 1000,
  maxWorkloadsPerNamespace: 500,
  healthCheckInterval: 15,
  deploymentStrategies: ['rolling', 'blue_green', 'canary', 'a_b', 'shadow'],
  defaultDeploymentStrategy: 'rolling',
};

export const gecirapIaCConfig = {
  enabled: true,
  supportedProviders: ['terraform', 'pulumi', 'cloudformation', 'arm', 'bicep', 'custom'],
  defaultProvider: 'terraform',
  maxStacksPerSchool: 100,
  stateBackend: 'remote',
  driftDetectionInterval: 3600,
  destroyProtection: true,
  approvalRequired: true,
  maxTemplates: 500,
  auditAllOperations: true,
};

export const gecirapAutoscalingConfig = {
  enabled: true,
  defaultCooldown: 300,
  maxPoliciesPerResource: 10,
  minScaleStep: 1,
  maxScaleStep: 10,
  predictiveScalingEnabled: true,
  scheduledScalingEnabled: true,
  forecastHorizonHours: 24,
  capacityAlertThresholds: { warning: 70, critical: 85, emergency: 95 },
};

export const gecirapDRConfig = {
  enabled: true,
  defaultRTO: 3600,
  defaultRPO: 900,
  maxPlansPerSchool: 20,
  automatedRecoveryEnabled: false,
  testFrequencyDays: 30,
  crossRegionRecovery: true,
  dependencyOrdering: true,
  verificationRequired: true,
  maxRecoverySteps: 100,
};

export const gecirapMultiCloudConfig = {
  enabled: true,
  placementEngineEnabled: true,
  migrationEnabled: true,
  maxMigrationsPerSchool: 5,
  costAwarePlacement: true,
  latencyAwarePlacement: true,
  complianceAwarePlacement: true,
  maxProvidersPerSchool: 5,
  balanceCheckInterval: 3600,
};

export const gecirapEdgeConfig = {
  enabled: true,
  maxEdgeNodesPerSchool: 100,
  maxEdgeClusters: 10,
  syncInterval: 300,
  conflictResolution: 'last_write_wins',
  offlineCacheSizeMB: 1024,
  maxOfflinePackages: 50,
  deltaSyncEnabled: true,
  storeAndForwardEnabled: true,
  offlineAuthCacheTTL: 86400,
};

export const gecirapNetworkConfig = {
  enabled: true,
  maxNetworksPerSchool: 20,
  maxRoutesPerNetwork: 100,
  loadBalancerAlgorithms: ['round_robin', 'least_connections', 'ip_hash', 'weighted', 'geo'],
  defaultLBAlgorithm: 'round_robin',
  healthCheckInterval: 10,
  cdnProviders: ['cloudflare', 'akamai', 'aws_cloudfront', 'azure_cdn', 'fastly'],
  dnsProvider: 'cloudflare',
  anomalyDetectionEnabled: true,
  maxTrafficMetricsRetention: 90,
};

export const gecirapAIOpsConfig = {
  enabled: true,
  agentTypes: ['infrastructure_monitor', 'capacity', 'cost', 'reliability', 'network', 'database', 'deployment', 'disaster_recovery', 'security_operations'],
  maxAgentsPerSchool: 20,
  incidentCorrelationWindow: 300,
  rootCauseAnalysisEnabled: true,
  automatedRemediationEnabled: false,
  humanInTheLoopRequired: true,
  recommendationRetentionDays: 90,
  maxRemediationSteps: 50,
  riskLevels: {
    LOW: { autoExecute: true, requireApproval: false },
    MEDIUM: { autoExecute: true, requireApproval: false },
    HIGH: { autoExecute: false, requireApproval: true },
    CRITICAL: { autoExecute: false, requireApproval: true, requireDoubleApproval: true },
  },
};

export const gecirapFinOpsConfig = {
  enabled: true,
  costRetentionDays: 365,
  maxCostCentersPerSchool: 50,
  maxBudgetsPerSchool: 100,
  anomalyDetectionEnabled: true,
  anomalyThresholdPercent: 20,
  forecastModelEnabled: true,
  optimizationRecommendationsEnabled: true,
  maxReservedCapacities: 50,
  budgetAlertThresholds: [50, 75, 90, 100],
  costAllocationGranularity: 'daily',
};

export const gecirapDigitalTwinConfig = {
  enabled: true,
  maxTwinsPerSchool: 10,
  maxSimulationsPerTwin: 100,
  maxScenariosPerTwin: 50,
  syncInterval: 60,
  simulationTimeout: 3600,
  maxConcurrentSimulations: 5,
  scenarioTypes: ['failure', 'overload', 'migration', 'failover', 'cost', 'scaling', 'catastrophe', 'multi_cloud'],
  resultRetentionDays: 365,
};

export const gecirapSecurityConfig = {
  enabled: true,
  auditAllOperations: true,
  sensitiveOperationLogging: true,
  encryptionRequired: true,
  rbacEnforcement: true,
  abacEnforcement: true,
  rateLimitingEnabled: true,
  maxApiRequestsPerMinute: 1000,
  secretRotationDays: 90,
  accessReviewDays: 30,
};

export const gecirapObservabilityConfig = {
  enabled: true,
  metricsRetentionDays: 90,
  logsRetentionDays: 30,
  tracesRetentionDays: 7,
  eventsRetentionDays: 365,
  alertingEnabled: true,
  dashboardsEnabled: true,
  maxDashboardsPerSchool: 20,
  correlationEnabled: true,
};

export const gecirapConfig = {
  cloud: gecirapCloudConfig,
  region: gecirapRegionConfig,
  multiRegion: gecirapMultiRegionConfig,
  container: gecirapContainerConfig,
  iac: gecirapIaCConfig,
  autoscaling: gecirapAutoscalingConfig,
  dr: gecirapDRConfig,
  multiCloud: gecirapMultiCloudConfig,
  edge: gecirapEdgeConfig,
  network: gecirapNetworkConfig,
  aiops: gecirapAIOpsConfig,
  finops: gecirapFinOpsConfig,
  digitalTwin: gecirapDigitalTwinConfig,
  security: gecirapSecurityConfig,
  observability: gecirapObservabilityConfig,
};

// ============================================================================
// Base
// ============================================================================
export {
  GecirapBaseEntity,
  PaginatedResult,
  PaginationParams,
  FilterParams,
  GecirapCrudRepository,
  GecirapCrudRepositoryImpl,
  createGecirapCrudRepository,
} from './base-gecirap-repository';

// ============================================================================
// Cloud Infrastructure
// ============================================================================
export {
  GecirapCloudProvider,
  GecirapCloudAccount,
  GecirapCloudRegion,
  GecirapCloudResource,
  GecirapCloudEnvironment,
  GecirapCloudDeployment,
  GecirapCloudQuota,
  CloudProviderRepository,
  CloudAccountRepository,
  CloudRegionRepository,
  CloudResourceRepository,
  CloudEnvironmentRepository,
  CloudDeploymentRepository,
  CloudQuotaRepository,
} from './cloud-infrastructure-repository';

// ============================================================================
// Multi-Region
// ============================================================================
export {
  GecirapGeoRegion,
  GecirapRegionPolicy,
  GecirapRegionHealth,
  GecirapFailoverPolicy,
  GecirapTrafficRoute,
  GecirapRegionalDeployment,
  GeoRegionRepository,
  RegionPolicyRepository,
  RegionHealthRepository,
  FailoverPolicyRepository,
  TrafficRouteRepository,
  RegionalDeploymentRepository,
} from './multi-region-repository';

// ============================================================================
// Container Orchestration
// ============================================================================
export {
  GecirapCluster,
  GecirapNode,
  GecirapNodePool,
  GecirapNamespace,
  GecirapWorkload,
  GecirapContainer,
  GecirapService,
  GecirapIngress,
  ClusterRepository,
  NodeRepository,
  NodePoolRepository,
  NamespaceRepository,
  WorkloadRepository,
  ContainerRepository,
  ServiceRepository,
  IngressRepository,
} from './container-orchestration-repository';

// ============================================================================
// Infrastructure as Code
// ============================================================================
export {
  GecirapInfrastructureTemplate,
  GecirapInfrastructureStack,
  GecirapProvisioningJob,
  GecirapResourceChange,
  GecirapDriftDetection,
  GecirapInfrastructurePolicy,
  InfrastructureTemplateRepository,
  InfrastructureStackRepository,
  ProvisioningJobRepository,
  ResourceChangeRepository,
  DriftDetectionRepository,
  InfrastructurePolicyRepository,
} from './infrastructure-as-code-repository';

// ============================================================================
// Autoscaling
// ============================================================================
export {
  GecirapScalingPolicy,
  GecirapScalingEvent,
  GecirapCapacityForecast,
  GecirapCapacityPlan,
  GecirapResourceUtilization,
  GecirapCapacityAlert,
  ScalingPolicyRepository,
  ScalingEventRepository,
  CapacityForecastRepository,
  CapacityPlanRepository,
  ResourceUtilizationRepository,
  CapacityAlertRepository,
} from './autoscaling-repository';

// ============================================================================
// Disaster Recovery
// ============================================================================
export {
  GecirapDisasterRecoveryPlan,
  GecirapRecoveryStrategy,
  GecirapRecoveryExecution,
  GecirapRecoveryTest,
  GecirapRecoveryDependency,
  DisasterRecoveryPlanRepository,
  RecoveryStrategyRepository,
  RecoveryExecutionRepository,
  RecoveryTestRepository,
  RecoveryDependencyRepository,
} from './disaster-recovery-repository';

// ============================================================================
// Multi-Cloud
// ============================================================================
export {
  GecirapCloudPlacementDecision,
  GecirapCloudMigration,
  GecirapCloudBalance,
  GecirapProviderCapability,
  CloudPlacementDecisionRepository,
  CloudMigrationRepository,
  CloudBalanceRepository,
  ProviderCapabilityRepository,
} from './multi-cloud-repository';

// ============================================================================
// Edge Computing
// ============================================================================
export {
  GecirapEdgeNode,
  GecirapEdgeCluster,
  GecirapEdgeDeployment,
  GecirapEdgeSyncJob,
  GecirapEdgeCache,
  GecirapEdgePolicy,
  GecirapOfflinePackage,
  EdgeNodeRepository,
  EdgeClusterRepository,
  EdgeDeploymentRepository,
  EdgeSyncJobRepository,
  EdgeCacheRepository,
  EdgePolicyRepository,
  OfflinePackageRepository,
} from './edge-computing-repository';

// ============================================================================
// Network
// ============================================================================
export {
  GecirapNetwork,
  GecirapNetworkRoute,
  GecirapLoadBalancer,
  GecirapCDNDistribution,
  GecirapDNSRecord,
  GecirapNetworkHealth,
  GecirapTrafficMetric,
  NetworkRepository,
  NetworkRouteRepository,
  LoadBalancerRepository,
  CDNDistributionRepository,
  DNSRecordRepository,
  NetworkHealthRepository,
  TrafficMetricRepository,
} from './network-repository';

// ============================================================================
// AIOps
// ============================================================================
export {
  GecirapAIOpsAgent,
  GecirapInfrastructureEvent,
  GecirapIncidentCorrelation,
  GecirapRootCauseAnalysis,
  GecirapRecommendation,
  GecirapAutomatedAction,
  GecirapRemediationPlan,
  AIOpsAgentRepository,
  InfrastructureEventRepository,
  IncidentCorrelationRepository,
  RootCauseAnalysisRepository,
  RecommendationRepository,
  AutomatedActionRepository,
  RemediationPlanRepository,
} from './aiops-repository';

// ============================================================================
// FinOps
// ============================================================================
export {
  GecirapCloudCost,
  GecirapCostAllocation,
  GecirapCostCenter,
  GecirapBudget,
  GecirapCostForecast,
  GecirapCostAnomaly,
  GecirapOptimizationRecommendation,
  GecirapReservedCapacity,
  CloudCostRepository,
  CostAllocationRepository,
  CostCenterRepository,
  BudgetRepository,
  CostForecastRepository,
  CostAnomalyRepository,
  OptimizationRecommendationRepository,
  ReservedCapacityRepository,
} from './finops-repository';

// ============================================================================
// Digital Twin
// ============================================================================
export {
  GecirapInfrastructureTwin,
  GecirapTwinSimulation,
  GecirapTwinScenario,
  GecirapTwinResult,
  GecirapTwinSync,
  InfrastructureTwinRepository,
  TwinSimulationRepository,
  TwinScenarioRepository,
  TwinResultRepository,
  TwinSyncRepository,
} from './digital-twin-repository';

import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudAPIGatewayError, EduCloudAPILimitError, EduCloudAPIRouteError, EduCloudBackupJobError, EduCloudBackupPolicyError, EduCloudBackupRestoreError, EduCloudBackupVaultError, EduCloudCDNAnalyticsError, EduCloudCDNCacheError, EduCloudCDNDistributionError, EduCloudCDNPolicyError, EduCloudCertificateRenewalError, EduCloudCloudAPIError, EduCloudCloudCertificateError, EduCloudCloudClusterError, EduCloudCloudComplianceError, EduCloudCloudCostError, EduCloudCloudIdentityError, EduCloudCloudMonitorError, EduCloudCloudNetworkError, EduCloudCloudNodeError, EduCloudCloudPipelineError, EduCloudCloudSecretError, EduCloudCloudSecurityError, EduCloudCloudStorageError, EduCloudCloudZoneError, EduCloudComplianceAuditError, EduCloudComplianceReportError, EduCloudComplianceScanError, EduCloudCostAlertError, EduCloudCostBudgetError, EduCloudCostOptimizationError, EduCloudCountryComplianceError, EduCloudCountryDataResidencyError, EduCloudCountryError, EduCloudDatabaseHealthError, EduCloudDatabaseMetricsError, EduCloudDatabaseRouteError, EduCloudDatabaseRouterError, EduCloudDisasterRecoveryMetricsError, EduCloudDisasterRecoveryPlanError, EduCloudDisasterRecoveryRunbookError, EduCloudDisasterRecoveryTestError, EduCloudEdgeCacheError, EduCloudEdgeDeploymentError, EduCloudEdgeFunctionError, EduCloudEdgeNodeError, EduCloudEnvironmentError, EduCloudFederationError, EduCloudFederationMappingError, EduCloudFederationSyncError, EduCloudGeoAnalyticsError, EduCloudGeoFailoverError, EduCloudGeoPolicyError, EduCloudGeoRouteError, EduCloudGlobalError, EduCloudGovernmentComplianceError, EduCloudGovernmentError, EduCloudGovernmentPolicyError, EduCloudIdentityAuditError, EduCloudIdentityFederationError, EduCloudIdentityProviderError, EduCloudLoadBalancerError, EduCloudLoadBalancerHealthError, EduCloudLoadBalancerPolicyError, EduCloudLoadBalancerPoolError, EduCloudMinistryAnalyticsError, EduCloudMinistryDashboardError, EduCloudMinistryError, EduCloudMonitorAlertError, EduCloudMonitorDashboardError, EduCloudMonitorMetricError, EduCloudMultiCountryError, EduCloudMultiGovernmentError, EduCloudMultiMinistryError, EduCloudMultiRegionError, EduCloudNetworkFirewallError, EduCloudNetworkSubnetError, EduCloudNetworkVPCError, EduCloudPipelineMetricError, EduCloudPipelineRunError, EduCloudPipelineStageError, EduCloudRegionalError, EduCloudRegionDeploymentError, EduCloudRegionError, EduCloudRegionFailoverError, EduCloudReplicationJobError, EduCloudReplicationMetricsError, EduCloudReplicationPolicyError, EduCloudReplicationStatusDetailError, EduCloudSecretAuditError, EduCloudSecretRotationError, EduCloudSecretVersionError, EduCloudSecurityAuditError, EduCloudSecurityIncidentError, EduCloudSecurityPolicyError, EduCloudStorageBucketError, EduCloudStorageMetricsError, EduCloudStoragePolicyError, EduCloudTenantError, EduCloudTenantFederationError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface CloudModuleRepository {

  // =============================================================================
  // CLOUD-GLOBAL
  // =============================================================================
  getMultiCountry(schoolId: string, id: string): Promise<any | null>;
  listMultiCountry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMultiCountry(schoolId: string, data: any): Promise<any>;
  updateMultiCountry(schoolId: string, id: string, data: any): Promise<any>;
  deleteMultiCountry(schoolId: string, id: string): Promise<void>;

  getCountryConfig(schoolId: string, id: string): Promise<any | null>;
  listCountryConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCountryConfig(schoolId: string, data: any): Promise<any>;
  updateCountryConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteCountryConfig(schoolId: string, id: string): Promise<void>;

  getCountryCompliance(schoolId: string, id: string): Promise<any | null>;
  listCountryCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCountryCompliance(schoolId: string, data: any): Promise<any>;
  updateCountryCompliance(schoolId: string, id: string, data: any): Promise<any>;
  deleteCountryCompliance(schoolId: string, id: string): Promise<void>;

  getCountryDataResidency(schoolId: string, id: string): Promise<any | null>;
  listCountryDataResidency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCountryDataResidency(schoolId: string, data: any): Promise<any>;
  updateCountryDataResidency(schoolId: string, id: string, data: any): Promise<any>;
  deleteCountryDataResidency(schoolId: string, id: string): Promise<void>;

  getMultiRegion(schoolId: string, id: string): Promise<any | null>;
  listMultiRegion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMultiRegion(schoolId: string, data: any): Promise<any>;
  updateMultiRegion(schoolId: string, id: string, data: any): Promise<any>;
  deleteMultiRegion(schoolId: string, id: string): Promise<void>;

  getRegionConfig(schoolId: string, id: string): Promise<any | null>;
  listRegionConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRegionConfig(schoolId: string, data: any): Promise<any>;
  updateRegionConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteRegionConfig(schoolId: string, id: string): Promise<void>;

  getRegionDeployment(schoolId: string, id: string): Promise<any | null>;
  listRegionDeployment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRegionDeployment(schoolId: string, data: any): Promise<any>;
  updateRegionDeployment(schoolId: string, id: string, data: any): Promise<any>;
  deleteRegionDeployment(schoolId: string, id: string): Promise<void>;

  getRegionFailover(schoolId: string, id: string): Promise<any | null>;
  listRegionFailover(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRegionFailover(schoolId: string, data: any): Promise<any>;
  updateRegionFailover(schoolId: string, id: string, data: any): Promise<any>;
  deleteRegionFailover(schoolId: string, id: string): Promise<void>;

  getMultiGovernment(schoolId: string, id: string): Promise<any | null>;
  listMultiGovernment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMultiGovernment(schoolId: string, data: any): Promise<any>;
  updateMultiGovernment(schoolId: string, id: string, data: any): Promise<any>;
  deleteMultiGovernment(schoolId: string, id: string): Promise<void>;

  getGovernmentConfig(schoolId: string, id: string): Promise<any | null>;
  listGovernmentConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernmentConfig(schoolId: string, data: any): Promise<any>;
  updateGovernmentConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernmentConfig(schoolId: string, id: string): Promise<void>;

  getGovernmentPolicy(schoolId: string, id: string): Promise<any | null>;
  listGovernmentPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernmentPolicy(schoolId: string, data: any): Promise<any>;
  updateGovernmentPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernmentPolicy(schoolId: string, id: string): Promise<void>;

  getGovernmentCompliance(schoolId: string, id: string): Promise<any | null>;
  listGovernmentCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernmentCompliance(schoolId: string, data: any): Promise<any>;
  updateGovernmentCompliance(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernmentCompliance(schoolId: string, id: string): Promise<void>;

  getMultiMinistry(schoolId: string, id: string): Promise<any | null>;
  listMultiMinistry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMultiMinistry(schoolId: string, data: any): Promise<any>;
  updateMultiMinistry(schoolId: string, id: string, data: any): Promise<any>;
  deleteMultiMinistry(schoolId: string, id: string): Promise<void>;

  getMinistryConfig(schoolId: string, id: string): Promise<any | null>;
  listMinistryConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMinistryConfig(schoolId: string, data: any): Promise<any>;
  updateMinistryConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteMinistryConfig(schoolId: string, id: string): Promise<void>;

  getMinistryDashboard(schoolId: string, id: string): Promise<any | null>;
  listMinistryDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMinistryDashboard(schoolId: string, data: any): Promise<any>;
  updateMinistryDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteMinistryDashboard(schoolId: string, id: string): Promise<void>;

  getMinistryAnalytics(schoolId: string, id: string): Promise<any | null>;
  listMinistryAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMinistryAnalytics(schoolId: string, data: any): Promise<any>;
  updateMinistryAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deleteMinistryAnalytics(schoolId: string, id: string): Promise<void>;

  getTenantFederation(schoolId: string, id: string): Promise<any | null>;
  listTenantFederation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTenantFederation(schoolId: string, data: any): Promise<any>;
  updateTenantFederation(schoolId: string, id: string, data: any): Promise<any>;
  deleteTenantFederation(schoolId: string, id: string): Promise<void>;

  getFederationConfig(schoolId: string, id: string): Promise<any | null>;
  listFederationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFederationConfig(schoolId: string, data: any): Promise<any>;
  updateFederationConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteFederationConfig(schoolId: string, id: string): Promise<void>;

  getFederationMapping(schoolId: string, id: string): Promise<any | null>;
  listFederationMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFederationMapping(schoolId: string, data: any): Promise<any>;
  updateFederationMapping(schoolId: string, id: string, data: any): Promise<any>;
  deleteFederationMapping(schoolId: string, id: string): Promise<void>;

  getFederationSync(schoolId: string, id: string): Promise<any | null>;
  listFederationSync(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFederationSync(schoolId: string, data: any): Promise<any>;
  updateFederationSync(schoolId: string, id: string, data: any): Promise<any>;
  deleteFederationSync(schoolId: string, id: string): Promise<void>;

  getEdgeNode(schoolId: string, id: string): Promise<any | null>;
  listEdgeNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEdgeNode(schoolId: string, data: any): Promise<any>;
  updateEdgeNode(schoolId: string, id: string, data: any): Promise<any>;
  deleteEdgeNode(schoolId: string, id: string): Promise<void>;

  getEdgeDeployment(schoolId: string, id: string): Promise<any | null>;
  listEdgeDeployment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEdgeDeployment(schoolId: string, data: any): Promise<any>;
  updateEdgeDeployment(schoolId: string, id: string, data: any): Promise<any>;
  deleteEdgeDeployment(schoolId: string, id: string): Promise<void>;

  getEdgeCache(schoolId: string, id: string): Promise<any | null>;
  listEdgeCache(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEdgeCache(schoolId: string, data: any): Promise<any>;
  updateEdgeCache(schoolId: string, id: string, data: any): Promise<any>;
  deleteEdgeCache(schoolId: string, id: string): Promise<void>;

  getEdgeFunction(schoolId: string, id: string): Promise<any | null>;
  listEdgeFunction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEdgeFunction(schoolId: string, data: any): Promise<any>;
  updateEdgeFunction(schoolId: string, id: string, data: any): Promise<any>;
  deleteEdgeFunction(schoolId: string, id: string): Promise<void>;

  getCDNDistribution(schoolId: string, id: string): Promise<any | null>;
  listCDNDistribution(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCDNDistribution(schoolId: string, data: any): Promise<any>;
  updateCDNDistribution(schoolId: string, id: string, data: any): Promise<any>;
  deleteCDNDistribution(schoolId: string, id: string): Promise<void>;

  getCDNPolicy(schoolId: string, id: string): Promise<any | null>;
  listCDNPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCDNPolicy(schoolId: string, data: any): Promise<any>;
  updateCDNPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteCDNPolicy(schoolId: string, id: string): Promise<void>;

  getCDNAnalytics(schoolId: string, id: string): Promise<any | null>;
  listCDNAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCDNAnalytics(schoolId: string, data: any): Promise<any>;
  updateCDNAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deleteCDNAnalytics(schoolId: string, id: string): Promise<void>;

  getCDNCache(schoolId: string, id: string): Promise<any | null>;
  listCDNCache(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCDNCache(schoolId: string, data: any): Promise<any>;
  updateCDNCache(schoolId: string, id: string, data: any): Promise<any>;
  deleteCDNCache(schoolId: string, id: string): Promise<void>;

  getCloudZone(schoolId: string, id: string): Promise<any | null>;
  listCloudZone(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudZone(schoolId: string, data: any): Promise<any>;
  updateCloudZone(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudZone(schoolId: string, id: string): Promise<void>;

  getCloudCluster(schoolId: string, id: string): Promise<any | null>;
  listCloudCluster(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudCluster(schoolId: string, data: any): Promise<any>;
  updateCloudCluster(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudCluster(schoolId: string, id: string): Promise<void>;

  getCloudNode(schoolId: string, id: string): Promise<any | null>;
  listCloudNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudNode(schoolId: string, data: any): Promise<any>;
  updateCloudNode(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudNode(schoolId: string, id: string): Promise<void>;

  getGeoRoute(schoolId: string, id: string): Promise<any | null>;
  listGeoRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGeoRoute(schoolId: string, data: any): Promise<any>;
  updateGeoRoute(schoolId: string, id: string, data: any): Promise<any>;
  deleteGeoRoute(schoolId: string, id: string): Promise<void>;

  getGeoPolicy(schoolId: string, id: string): Promise<any | null>;
  listGeoPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGeoPolicy(schoolId: string, data: any): Promise<any>;
  updateGeoPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteGeoPolicy(schoolId: string, id: string): Promise<void>;

  getGeoFailover(schoolId: string, id: string): Promise<any | null>;
  listGeoFailover(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGeoFailover(schoolId: string, data: any): Promise<any>;
  updateGeoFailover(schoolId: string, id: string, data: any): Promise<any>;
  deleteGeoFailover(schoolId: string, id: string): Promise<void>;

  getGeoAnalytics(schoolId: string, id: string): Promise<any | null>;
  listGeoAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGeoAnalytics(schoolId: string, data: any): Promise<any>;
  updateGeoAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deleteGeoAnalytics(schoolId: string, id: string): Promise<void>;

  getLoadBalancer(schoolId: string, id: string): Promise<any | null>;
  listLoadBalancer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLoadBalancer(schoolId: string, data: any): Promise<any>;
  updateLoadBalancer(schoolId: string, id: string, data: any): Promise<any>;
  deleteLoadBalancer(schoolId: string, id: string): Promise<void>;

  getLoadBalancerPool(schoolId: string, id: string): Promise<any | null>;
  listLoadBalancerPool(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLoadBalancerPool(schoolId: string, data: any): Promise<any>;
  updateLoadBalancerPool(schoolId: string, id: string, data: any): Promise<any>;
  deleteLoadBalancerPool(schoolId: string, id: string): Promise<void>;

  getLoadBalancerHealth(schoolId: string, id: string): Promise<any | null>;
  listLoadBalancerHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLoadBalancerHealth(schoolId: string, data: any): Promise<any>;
  updateLoadBalancerHealth(schoolId: string, id: string, data: any): Promise<any>;
  deleteLoadBalancerHealth(schoolId: string, id: string): Promise<void>;

  getLoadBalancerPolicy(schoolId: string, id: string): Promise<any | null>;
  listLoadBalancerPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLoadBalancerPolicy(schoolId: string, data: any): Promise<any>;
  updateLoadBalancerPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteLoadBalancerPolicy(schoolId: string, id: string): Promise<void>;

  getDisasterRecoveryPlan(schoolId: string, id: string): Promise<any | null>;
  listDisasterRecoveryPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDisasterRecoveryPlan(schoolId: string, data: any): Promise<any>;
  updateDisasterRecoveryPlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteDisasterRecoveryPlan(schoolId: string, id: string): Promise<void>;

  getDisasterRecoveryRunbook(schoolId: string, id: string): Promise<any | null>;
  listDisasterRecoveryRunbook(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDisasterRecoveryRunbook(schoolId: string, data: any): Promise<any>;
  updateDisasterRecoveryRunbook(schoolId: string, id: string, data: any): Promise<any>;
  deleteDisasterRecoveryRunbook(schoolId: string, id: string): Promise<void>;

  getDisasterRecoveryTest(schoolId: string, id: string): Promise<any | null>;
  listDisasterRecoveryTest(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDisasterRecoveryTest(schoolId: string, data: any): Promise<any>;
  updateDisasterRecoveryTest(schoolId: string, id: string, data: any): Promise<any>;
  deleteDisasterRecoveryTest(schoolId: string, id: string): Promise<void>;

  getDisasterRecoveryMetrics(schoolId: string, id: string): Promise<any | null>;
  listDisasterRecoveryMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDisasterRecoveryMetrics(schoolId: string, data: any): Promise<any>;
  updateDisasterRecoveryMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteDisasterRecoveryMetrics(schoolId: string, id: string): Promise<void>;

  getBackupPolicy(schoolId: string, id: string): Promise<any | null>;
  listBackupPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBackupPolicy(schoolId: string, data: any): Promise<any>;
  updateBackupPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteBackupPolicy(schoolId: string, id: string): Promise<void>;

  getBackupVault(schoolId: string, id: string): Promise<any | null>;
  listBackupVault(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBackupVault(schoolId: string, data: any): Promise<any>;
  updateBackupVault(schoolId: string, id: string, data: any): Promise<any>;
  deleteBackupVault(schoolId: string, id: string): Promise<void>;

  getBackupJob(schoolId: string, id: string): Promise<any | null>;
  listBackupJob(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBackupJob(schoolId: string, data: any): Promise<any>;
  updateBackupJob(schoolId: string, id: string, data: any): Promise<any>;
  deleteBackupJob(schoolId: string, id: string): Promise<void>;

  getBackupRestore(schoolId: string, id: string): Promise<any | null>;
  listBackupRestore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBackupRestore(schoolId: string, data: any): Promise<any>;
  updateBackupRestore(schoolId: string, id: string, data: any): Promise<any>;
  deleteBackupRestore(schoolId: string, id: string): Promise<void>;

  getReplicationPolicy(schoolId: string, id: string): Promise<any | null>;
  listReplicationPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createReplicationPolicy(schoolId: string, data: any): Promise<any>;
  updateReplicationPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteReplicationPolicy(schoolId: string, id: string): Promise<void>;

  getReplicationJob(schoolId: string, id: string): Promise<any | null>;
  listReplicationJob(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createReplicationJob(schoolId: string, data: any): Promise<any>;
  updateReplicationJob(schoolId: string, id: string, data: any): Promise<any>;
  deleteReplicationJob(schoolId: string, id: string): Promise<void>;

  getReplicationStatusDetail(schoolId: string, id: string): Promise<any | null>;
  listReplicationStatusDetail(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createReplicationStatusDetail(schoolId: string, data: any): Promise<any>;
  updateReplicationStatusDetail(schoolId: string, id: string, data: any): Promise<any>;
  deleteReplicationStatusDetail(schoolId: string, id: string): Promise<void>;

  getReplicationMetrics(schoolId: string, id: string): Promise<any | null>;
  listReplicationMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createReplicationMetrics(schoolId: string, data: any): Promise<any>;
  updateReplicationMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteReplicationMetrics(schoolId: string, id: string): Promise<void>;

  getDatabaseRouter(schoolId: string, id: string): Promise<any | null>;
  listDatabaseRouter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDatabaseRouter(schoolId: string, data: any): Promise<any>;
  updateDatabaseRouter(schoolId: string, id: string, data: any): Promise<any>;
  deleteDatabaseRouter(schoolId: string, id: string): Promise<void>;

  getDatabaseRoute(schoolId: string, id: string): Promise<any | null>;
  listDatabaseRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDatabaseRoute(schoolId: string, data: any): Promise<any>;
  updateDatabaseRoute(schoolId: string, id: string, data: any): Promise<any>;
  deleteDatabaseRoute(schoolId: string, id: string): Promise<void>;

  getDatabaseHealth(schoolId: string, id: string): Promise<any | null>;
  listDatabaseHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDatabaseHealth(schoolId: string, data: any): Promise<any>;
  updateDatabaseHealth(schoolId: string, id: string, data: any): Promise<any>;
  deleteDatabaseHealth(schoolId: string, id: string): Promise<void>;

  getDatabaseMetrics(schoolId: string, id: string): Promise<any | null>;
  listDatabaseMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDatabaseMetrics(schoolId: string, data: any): Promise<any>;
  updateDatabaseMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteDatabaseMetrics(schoolId: string, id: string): Promise<void>;

  getCloudStorage(schoolId: string, id: string): Promise<any | null>;
  listCloudStorage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudStorage(schoolId: string, data: any): Promise<any>;
  updateCloudStorage(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudStorage(schoolId: string, id: string): Promise<void>;

  getStorageBucket(schoolId: string, id: string): Promise<any | null>;
  listStorageBucket(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStorageBucket(schoolId: string, data: any): Promise<any>;
  updateStorageBucket(schoolId: string, id: string, data: any): Promise<any>;
  deleteStorageBucket(schoolId: string, id: string): Promise<void>;

  getStoragePolicy(schoolId: string, id: string): Promise<any | null>;
  listStoragePolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStoragePolicy(schoolId: string, data: any): Promise<any>;
  updateStoragePolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteStoragePolicy(schoolId: string, id: string): Promise<void>;

  getStorageMetrics(schoolId: string, id: string): Promise<any | null>;
  listStorageMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStorageMetrics(schoolId: string, data: any): Promise<any>;
  updateStorageMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteStorageMetrics(schoolId: string, id: string): Promise<void>;

  getCloudMonitor(schoolId: string, id: string): Promise<any | null>;
  listCloudMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudMonitor(schoolId: string, data: any): Promise<any>;
  updateCloudMonitor(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudMonitor(schoolId: string, id: string): Promise<void>;

  getMonitorAlert(schoolId: string, id: string): Promise<any | null>;
  listMonitorAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMonitorAlert(schoolId: string, data: any): Promise<any>;
  updateMonitorAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteMonitorAlert(schoolId: string, id: string): Promise<void>;

  getMonitorDashboard(schoolId: string, id: string): Promise<any | null>;
  listMonitorDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMonitorDashboard(schoolId: string, data: any): Promise<any>;
  updateMonitorDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteMonitorDashboard(schoolId: string, id: string): Promise<void>;

  getMonitorMetric(schoolId: string, id: string): Promise<any | null>;
  listMonitorMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMonitorMetric(schoolId: string, data: any): Promise<any>;
  updateMonitorMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteMonitorMetric(schoolId: string, id: string): Promise<void>;

  getGlobalConfig(schoolId: string, id: string): Promise<any | null>;
  listGlobalConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGlobalConfig(schoolId: string, data: any): Promise<any>;
  updateGlobalConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGlobalConfig(schoolId: string, id: string): Promise<void>;

  getRegionalConfig(schoolId: string, id: string): Promise<any | null>;
  listRegionalConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRegionalConfig(schoolId: string, data: any): Promise<any>;
  updateRegionalConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteRegionalConfig(schoolId: string, id: string): Promise<void>;

  getTenantConfig(schoolId: string, id: string): Promise<any | null>;
  listTenantConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTenantConfig(schoolId: string, data: any): Promise<any>;
  updateTenantConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteTenantConfig(schoolId: string, id: string): Promise<void>;

  getEnvironmentConfig(schoolId: string, id: string): Promise<any | null>;
  listEnvironmentConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnvironmentConfig(schoolId: string, data: any): Promise<any>;
  updateEnvironmentConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnvironmentConfig(schoolId: string, id: string): Promise<void>;

  getCloudNetwork(schoolId: string, id: string): Promise<any | null>;
  listCloudNetwork(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudNetwork(schoolId: string, data: any): Promise<any>;
  updateCloudNetwork(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudNetwork(schoolId: string, id: string): Promise<void>;

  getNetworkVPC(schoolId: string, id: string): Promise<any | null>;
  listNetworkVPC(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNetworkVPC(schoolId: string, data: any): Promise<any>;
  updateNetworkVPC(schoolId: string, id: string, data: any): Promise<any>;
  deleteNetworkVPC(schoolId: string, id: string): Promise<void>;

  getNetworkSubnet(schoolId: string, id: string): Promise<any | null>;
  listNetworkSubnet(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNetworkSubnet(schoolId: string, data: any): Promise<any>;
  updateNetworkSubnet(schoolId: string, id: string, data: any): Promise<any>;
  deleteNetworkSubnet(schoolId: string, id: string): Promise<void>;

  getNetworkFirewall(schoolId: string, id: string): Promise<any | null>;
  listNetworkFirewall(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNetworkFirewall(schoolId: string, data: any): Promise<any>;
  updateNetworkFirewall(schoolId: string, id: string, data: any): Promise<any>;
  deleteNetworkFirewall(schoolId: string, id: string): Promise<void>;

  getCloudSecurity(schoolId: string, id: string): Promise<any | null>;
  listCloudSecurity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudSecurity(schoolId: string, data: any): Promise<any>;
  updateCloudSecurity(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudSecurity(schoolId: string, id: string): Promise<void>;

  getSecurityPolicy(schoolId: string, id: string): Promise<any | null>;
  listSecurityPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecurityPolicy(schoolId: string, data: any): Promise<any>;
  updateSecurityPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecurityPolicy(schoolId: string, id: string): Promise<void>;

  getSecurityAudit(schoolId: string, id: string): Promise<any | null>;
  listSecurityAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecurityAudit(schoolId: string, data: any): Promise<any>;
  updateSecurityAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecurityAudit(schoolId: string, id: string): Promise<void>;

  getSecurityIncident(schoolId: string, id: string): Promise<any | null>;
  listSecurityIncident(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecurityIncident(schoolId: string, data: any): Promise<any>;
  updateSecurityIncident(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecurityIncident(schoolId: string, id: string): Promise<void>;

  getCloudCompliance(schoolId: string, id: string): Promise<any | null>;
  listCloudCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudCompliance(schoolId: string, data: any): Promise<any>;
  updateCloudCompliance(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudCompliance(schoolId: string, id: string): Promise<void>;

  getComplianceScan(schoolId: string, id: string): Promise<any | null>;
  listComplianceScan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComplianceScan(schoolId: string, data: any): Promise<any>;
  updateComplianceScan(schoolId: string, id: string, data: any): Promise<any>;
  deleteComplianceScan(schoolId: string, id: string): Promise<void>;

  getComplianceReport(schoolId: string, id: string): Promise<any | null>;
  listComplianceReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComplianceReport(schoolId: string, data: any): Promise<any>;
  updateComplianceReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteComplianceReport(schoolId: string, id: string): Promise<void>;

  getComplianceAudit(schoolId: string, id: string): Promise<any | null>;
  listComplianceAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComplianceAudit(schoolId: string, data: any): Promise<any>;
  updateComplianceAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteComplianceAudit(schoolId: string, id: string): Promise<void>;

  getCloudCost(schoolId: string, id: string): Promise<any | null>;
  listCloudCost(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudCost(schoolId: string, data: any): Promise<any>;
  updateCloudCost(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudCost(schoolId: string, id: string): Promise<void>;

  getCostBudget(schoolId: string, id: string): Promise<any | null>;
  listCostBudget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCostBudget(schoolId: string, data: any): Promise<any>;
  updateCostBudget(schoolId: string, id: string, data: any): Promise<any>;
  deleteCostBudget(schoolId: string, id: string): Promise<void>;

  getCostAlert(schoolId: string, id: string): Promise<any | null>;
  listCostAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCostAlert(schoolId: string, data: any): Promise<any>;
  updateCostAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteCostAlert(schoolId: string, id: string): Promise<void>;

  getCostOptimization(schoolId: string, id: string): Promise<any | null>;
  listCostOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCostOptimization(schoolId: string, data: any): Promise<any>;
  updateCostOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteCostOptimization(schoolId: string, id: string): Promise<void>;

  getCloudIdentity(schoolId: string, id: string): Promise<any | null>;
  listCloudIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudIdentity(schoolId: string, data: any): Promise<any>;
  updateCloudIdentity(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudIdentity(schoolId: string, id: string): Promise<void>;

  getIdentityProvider(schoolId: string, id: string): Promise<any | null>;
  listIdentityProvider(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createIdentityProvider(schoolId: string, data: any): Promise<any>;
  updateIdentityProvider(schoolId: string, id: string, data: any): Promise<any>;
  deleteIdentityProvider(schoolId: string, id: string): Promise<void>;

  getIdentityFederation(schoolId: string, id: string): Promise<any | null>;
  listIdentityFederation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createIdentityFederation(schoolId: string, data: any): Promise<any>;
  updateIdentityFederation(schoolId: string, id: string, data: any): Promise<any>;
  deleteIdentityFederation(schoolId: string, id: string): Promise<void>;

  getIdentityAudit(schoolId: string, id: string): Promise<any | null>;
  listIdentityAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createIdentityAudit(schoolId: string, data: any): Promise<any>;
  updateIdentityAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteIdentityAudit(schoolId: string, id: string): Promise<void>;

  getCloudAPI(schoolId: string, id: string): Promise<any | null>;
  listCloudAPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudAPI(schoolId: string, data: any): Promise<any>;
  updateCloudAPI(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudAPI(schoolId: string, id: string): Promise<void>;

  getAPIGateway(schoolId: string, id: string): Promise<any | null>;
  listAPIGateway(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAPIGateway(schoolId: string, data: any): Promise<any>;
  updateAPIGateway(schoolId: string, id: string, data: any): Promise<any>;
  deleteAPIGateway(schoolId: string, id: string): Promise<void>;

  getAPIRoute(schoolId: string, id: string): Promise<any | null>;
  listAPIRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAPIRoute(schoolId: string, data: any): Promise<any>;
  updateAPIRoute(schoolId: string, id: string, data: any): Promise<any>;
  deleteAPIRoute(schoolId: string, id: string): Promise<void>;

  getAPILimit(schoolId: string, id: string): Promise<any | null>;
  listAPILimit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAPILimit(schoolId: string, data: any): Promise<any>;
  updateAPILimit(schoolId: string, id: string, data: any): Promise<any>;
  deleteAPILimit(schoolId: string, id: string): Promise<void>;

  getCloudPipeline(schoolId: string, id: string): Promise<any | null>;
  listCloudPipeline(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudPipeline(schoolId: string, data: any): Promise<any>;
  updateCloudPipeline(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudPipeline(schoolId: string, id: string): Promise<void>;

  getPipelineStage(schoolId: string, id: string): Promise<any | null>;
  listPipelineStage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPipelineStage(schoolId: string, data: any): Promise<any>;
  updatePipelineStage(schoolId: string, id: string, data: any): Promise<any>;
  deletePipelineStage(schoolId: string, id: string): Promise<void>;

  getPipelineRun(schoolId: string, id: string): Promise<any | null>;
  listPipelineRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPipelineRun(schoolId: string, data: any): Promise<any>;
  updatePipelineRun(schoolId: string, id: string, data: any): Promise<any>;
  deletePipelineRun(schoolId: string, id: string): Promise<void>;

  getPipelineMetric(schoolId: string, id: string): Promise<any | null>;
  listPipelineMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPipelineMetric(schoolId: string, data: any): Promise<any>;
  updatePipelineMetric(schoolId: string, id: string, data: any): Promise<any>;
  deletePipelineMetric(schoolId: string, id: string): Promise<void>;

  getCloudSecret(schoolId: string, id: string): Promise<any | null>;
  listCloudSecret(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudSecret(schoolId: string, data: any): Promise<any>;
  updateCloudSecret(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudSecret(schoolId: string, id: string): Promise<void>;

  getSecretVersion(schoolId: string, id: string): Promise<any | null>;
  listSecretVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecretVersion(schoolId: string, data: any): Promise<any>;
  updateSecretVersion(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecretVersion(schoolId: string, id: string): Promise<void>;

  getSecretRotation(schoolId: string, id: string): Promise<any | null>;
  listSecretRotation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecretRotation(schoolId: string, data: any): Promise<any>;
  updateSecretRotation(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecretRotation(schoolId: string, id: string): Promise<void>;

  getSecretAudit(schoolId: string, id: string): Promise<any | null>;
  listSecretAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecretAudit(schoolId: string, data: any): Promise<any>;
  updateSecretAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecretAudit(schoolId: string, id: string): Promise<void>;

  getCloudCertificate(schoolId: string, id: string): Promise<any | null>;
  listCloudCertificate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudCertificate(schoolId: string, data: any): Promise<any>;
  updateCloudCertificate(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudCertificate(schoolId: string, id: string): Promise<void>;

  getCertificateRenewal(schoolId: string, id: string): Promise<any | null>;
  listCertificateRenewal(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCertificateRenewal(schoolId: string, data: any): Promise<any>;
  updateCertificateRenewal(schoolId: string, id: string, data: any): Promise<any>;
  deleteCertificateRenewal(schoolId: string, id: string): Promise<void>;

}

class CloudModuleRepositoryImpl implements CloudModuleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new Error('GlobalCloud entity not found');
  }

  // =============================================================================
  // CLOUD-GLOBAL
  // =============================================================================
  async getMultiCountry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('multi_countrys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMultiCountry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('multi_countrys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMultiCountryError(error.message);
    return data ?? [];
  }

  async createMultiCountry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('multi_countrys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMultiCountryError(error.message);
    return result;
  }

  async updateMultiCountry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('multi_countrys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMultiCountryError(error.message);
    return result;
  }

  async deleteMultiCountry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('multi_countrys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMultiCountryError(error.message);
  }

  async getCountryConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('countrys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCountryConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('countrys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCountryError(error.message);
    return data ?? [];
  }

  async createCountryConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('countrys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCountryError(error.message);
    return result;
  }

  async updateCountryConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('countrys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCountryError(error.message);
    return result;
  }

  async deleteCountryConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('countrys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCountryError(error.message);
  }

  async getCountryCompliance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('country_compliances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCountryCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('country_compliances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCountryComplianceError(error.message);
    return data ?? [];
  }

  async createCountryCompliance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('country_compliances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCountryComplianceError(error.message);
    return result;
  }

  async updateCountryCompliance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('country_compliances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCountryComplianceError(error.message);
    return result;
  }

  async deleteCountryCompliance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('country_compliances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCountryComplianceError(error.message);
  }

  async getCountryDataResidency(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('country_data_residencys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCountryDataResidency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('country_data_residencys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCountryDataResidencyError(error.message);
    return data ?? [];
  }

  async createCountryDataResidency(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('country_data_residencys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCountryDataResidencyError(error.message);
    return result;
  }

  async updateCountryDataResidency(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('country_data_residencys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCountryDataResidencyError(error.message);
    return result;
  }

  async deleteCountryDataResidency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('country_data_residencys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCountryDataResidencyError(error.message);
  }

  async getMultiRegion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('multi_regioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMultiRegion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('multi_regioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMultiRegionError(error.message);
    return data ?? [];
  }

  async createMultiRegion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('multi_regioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMultiRegionError(error.message);
    return result;
  }

  async updateMultiRegion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('multi_regioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMultiRegionError(error.message);
    return result;
  }

  async deleteMultiRegion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('multi_regioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMultiRegionError(error.message);
  }

  async getRegionConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('regioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRegionConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('regioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRegionError(error.message);
    return data ?? [];
  }

  async createRegionConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('regioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRegionError(error.message);
    return result;
  }

  async updateRegionConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('regioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRegionError(error.message);
    return result;
  }

  async deleteRegionConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('regioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRegionError(error.message);
  }

  async getRegionDeployment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('region_deployments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRegionDeployment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('region_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRegionDeploymentError(error.message);
    return data ?? [];
  }

  async createRegionDeployment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('region_deployments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRegionDeploymentError(error.message);
    return result;
  }

  async updateRegionDeployment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('region_deployments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRegionDeploymentError(error.message);
    return result;
  }

  async deleteRegionDeployment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('region_deployments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRegionDeploymentError(error.message);
  }

  async getRegionFailover(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('region_failovers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRegionFailover(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('region_failovers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRegionFailoverError(error.message);
    return data ?? [];
  }

  async createRegionFailover(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('region_failovers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRegionFailoverError(error.message);
    return result;
  }

  async updateRegionFailover(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('region_failovers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRegionFailoverError(error.message);
    return result;
  }

  async deleteRegionFailover(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('region_failovers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRegionFailoverError(error.message);
  }

  async getMultiGovernment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('multi_governments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMultiGovernment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('multi_governments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMultiGovernmentError(error.message);
    return data ?? [];
  }

  async createMultiGovernment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('multi_governments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMultiGovernmentError(error.message);
    return result;
  }

  async updateMultiGovernment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('multi_governments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMultiGovernmentError(error.message);
    return result;
  }

  async deleteMultiGovernment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('multi_governments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMultiGovernmentError(error.message);
  }

  async getGovernmentConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('governments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernmentConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('governments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernmentError(error.message);
    return data ?? [];
  }

  async createGovernmentConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('governments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernmentError(error.message);
    return result;
  }

  async updateGovernmentConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('governments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernmentError(error.message);
    return result;
  }

  async deleteGovernmentConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('governments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernmentError(error.message);
  }

  async getGovernmentPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('government_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernmentPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('government_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernmentPolicyError(error.message);
    return data ?? [];
  }

  async createGovernmentPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('government_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernmentPolicyError(error.message);
    return result;
  }

  async updateGovernmentPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('government_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernmentPolicyError(error.message);
    return result;
  }

  async deleteGovernmentPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('government_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernmentPolicyError(error.message);
  }

  async getGovernmentCompliance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('government_compliances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernmentCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('government_compliances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernmentComplianceError(error.message);
    return data ?? [];
  }

  async createGovernmentCompliance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('government_compliances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernmentComplianceError(error.message);
    return result;
  }

  async updateGovernmentCompliance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('government_compliances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernmentComplianceError(error.message);
    return result;
  }

  async deleteGovernmentCompliance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('government_compliances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernmentComplianceError(error.message);
  }

  async getMultiMinistry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('multi_ministrys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMultiMinistry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('multi_ministrys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMultiMinistryError(error.message);
    return data ?? [];
  }

  async createMultiMinistry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('multi_ministrys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMultiMinistryError(error.message);
    return result;
  }

  async updateMultiMinistry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('multi_ministrys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMultiMinistryError(error.message);
    return result;
  }

  async deleteMultiMinistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('multi_ministrys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMultiMinistryError(error.message);
  }

  async getMinistryConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ministrys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMinistryConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ministrys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMinistryError(error.message);
    return data ?? [];
  }

  async createMinistryConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ministrys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMinistryError(error.message);
    return result;
  }

  async updateMinistryConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ministrys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMinistryError(error.message);
    return result;
  }

  async deleteMinistryConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ministrys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMinistryError(error.message);
  }

  async getMinistryDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ministry_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMinistryDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ministry_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMinistryDashboardError(error.message);
    return data ?? [];
  }

  async createMinistryDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ministry_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMinistryDashboardError(error.message);
    return result;
  }

  async updateMinistryDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ministry_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMinistryDashboardError(error.message);
    return result;
  }

  async deleteMinistryDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ministry_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMinistryDashboardError(error.message);
  }

  async getMinistryAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ministry_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMinistryAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ministry_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMinistryAnalyticsError(error.message);
    return data ?? [];
  }

  async createMinistryAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ministry_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMinistryAnalyticsError(error.message);
    return result;
  }

  async updateMinistryAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ministry_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMinistryAnalyticsError(error.message);
    return result;
  }

  async deleteMinistryAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ministry_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMinistryAnalyticsError(error.message);
  }

  async getTenantFederation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('tenant_federatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTenantFederation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('tenant_federatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTenantFederationError(error.message);
    return data ?? [];
  }

  async createTenantFederation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('tenant_federatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTenantFederationError(error.message);
    return result;
  }

  async updateTenantFederation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('tenant_federatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTenantFederationError(error.message);
    return result;
  }

  async deleteTenantFederation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('tenant_federatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTenantFederationError(error.message);
  }

  async getFederationConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('federatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFederationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('federatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFederationError(error.message);
    return data ?? [];
  }

  async createFederationConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('federatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFederationError(error.message);
    return result;
  }

  async updateFederationConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('federatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFederationError(error.message);
    return result;
  }

  async deleteFederationConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('federatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFederationError(error.message);
  }

  async getFederationMapping(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('federation_mappings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFederationMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('federation_mappings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFederationMappingError(error.message);
    return data ?? [];
  }

  async createFederationMapping(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('federation_mappings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFederationMappingError(error.message);
    return result;
  }

  async updateFederationMapping(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('federation_mappings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFederationMappingError(error.message);
    return result;
  }

  async deleteFederationMapping(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('federation_mappings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFederationMappingError(error.message);
  }

  async getFederationSync(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('federation_syncs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFederationSync(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('federation_syncs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFederationSyncError(error.message);
    return data ?? [];
  }

  async createFederationSync(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('federation_syncs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFederationSyncError(error.message);
    return result;
  }

  async updateFederationSync(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('federation_syncs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFederationSyncError(error.message);
    return result;
  }

  async deleteFederationSync(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('federation_syncs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFederationSyncError(error.message);
  }

  async getEdgeNode(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('edge_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEdgeNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('edge_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEdgeNodeError(error.message);
    return data ?? [];
  }

  async createEdgeNode(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('edge_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEdgeNodeError(error.message);
    return result;
  }

  async updateEdgeNode(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('edge_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEdgeNodeError(error.message);
    return result;
  }

  async deleteEdgeNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('edge_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEdgeNodeError(error.message);
  }

  async getEdgeDeployment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('edge_deployments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEdgeDeployment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('edge_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEdgeDeploymentError(error.message);
    return data ?? [];
  }

  async createEdgeDeployment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('edge_deployments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEdgeDeploymentError(error.message);
    return result;
  }

  async updateEdgeDeployment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('edge_deployments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEdgeDeploymentError(error.message);
    return result;
  }

  async deleteEdgeDeployment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('edge_deployments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEdgeDeploymentError(error.message);
  }

  async getEdgeCache(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('edge_caches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEdgeCache(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('edge_caches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEdgeCacheError(error.message);
    return data ?? [];
  }

  async createEdgeCache(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('edge_caches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEdgeCacheError(error.message);
    return result;
  }

  async updateEdgeCache(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('edge_caches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEdgeCacheError(error.message);
    return result;
  }

  async deleteEdgeCache(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('edge_caches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEdgeCacheError(error.message);
  }

  async getEdgeFunction(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('edge_functioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEdgeFunction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('edge_functioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEdgeFunctionError(error.message);
    return data ?? [];
  }

  async createEdgeFunction(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('edge_functioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEdgeFunctionError(error.message);
    return result;
  }

  async updateEdgeFunction(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('edge_functioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEdgeFunctionError(error.message);
    return result;
  }

  async deleteEdgeFunction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('edge_functioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEdgeFunctionError(error.message);
  }

  async getCDNDistribution(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cdndistributioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCDNDistribution(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cdndistributioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCDNDistributionError(error.message);
    return data ?? [];
  }

  async createCDNDistribution(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cdndistributioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCDNDistributionError(error.message);
    return result;
  }

  async updateCDNDistribution(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cdndistributioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCDNDistributionError(error.message);
    return result;
  }

  async deleteCDNDistribution(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cdndistributioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCDNDistributionError(error.message);
  }

  async getCDNPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cdnpolicys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCDNPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cdnpolicys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCDNPolicyError(error.message);
    return data ?? [];
  }

  async createCDNPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cdnpolicys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCDNPolicyError(error.message);
    return result;
  }

  async updateCDNPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cdnpolicys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCDNPolicyError(error.message);
    return result;
  }

  async deleteCDNPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cdnpolicys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCDNPolicyError(error.message);
  }

  async getCDNAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cdnanalyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCDNAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cdnanalyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCDNAnalyticsError(error.message);
    return data ?? [];
  }

  async createCDNAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cdnanalyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCDNAnalyticsError(error.message);
    return result;
  }

  async updateCDNAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cdnanalyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCDNAnalyticsError(error.message);
    return result;
  }

  async deleteCDNAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cdnanalyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCDNAnalyticsError(error.message);
  }

  async getCDNCache(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cdncaches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCDNCache(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cdncaches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCDNCacheError(error.message);
    return data ?? [];
  }

  async createCDNCache(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cdncaches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCDNCacheError(error.message);
    return result;
  }

  async updateCDNCache(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cdncaches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCDNCacheError(error.message);
    return result;
  }

  async deleteCDNCache(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cdncaches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCDNCacheError(error.message);
  }

  async getCloudZone(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_zones')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudZone(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_zones').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudZoneError(error.message);
    return data ?? [];
  }

  async createCloudZone(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_zones')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudZoneError(error.message);
    return result;
  }

  async updateCloudZone(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_zones')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudZoneError(error.message);
    return result;
  }

  async deleteCloudZone(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_zones')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudZoneError(error.message);
  }

  async getCloudCluster(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_clusters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudCluster(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudClusterError(error.message);
    return data ?? [];
  }

  async createCloudCluster(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_clusters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudClusterError(error.message);
    return result;
  }

  async updateCloudCluster(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_clusters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudClusterError(error.message);
    return result;
  }

  async deleteCloudCluster(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_clusters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudClusterError(error.message);
  }

  async getCloudNode(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudNodeError(error.message);
    return data ?? [];
  }

  async createCloudNode(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudNodeError(error.message);
    return result;
  }

  async updateCloudNode(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudNodeError(error.message);
    return result;
  }

  async deleteCloudNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudNodeError(error.message);
  }

  async getGeoRoute(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('geo_routes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGeoRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('geo_routes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGeoRouteError(error.message);
    return data ?? [];
  }

  async createGeoRoute(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('geo_routes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGeoRouteError(error.message);
    return result;
  }

  async updateGeoRoute(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('geo_routes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGeoRouteError(error.message);
    return result;
  }

  async deleteGeoRoute(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('geo_routes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGeoRouteError(error.message);
  }

  async getGeoPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('geo_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGeoPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('geo_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGeoPolicyError(error.message);
    return data ?? [];
  }

  async createGeoPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('geo_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGeoPolicyError(error.message);
    return result;
  }

  async updateGeoPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('geo_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGeoPolicyError(error.message);
    return result;
  }

  async deleteGeoPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('geo_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGeoPolicyError(error.message);
  }

  async getGeoFailover(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('geo_failovers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGeoFailover(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('geo_failovers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGeoFailoverError(error.message);
    return data ?? [];
  }

  async createGeoFailover(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('geo_failovers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGeoFailoverError(error.message);
    return result;
  }

  async updateGeoFailover(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('geo_failovers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGeoFailoverError(error.message);
    return result;
  }

  async deleteGeoFailover(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('geo_failovers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGeoFailoverError(error.message);
  }

  async getGeoAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('geo_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGeoAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('geo_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGeoAnalyticsError(error.message);
    return data ?? [];
  }

  async createGeoAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('geo_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGeoAnalyticsError(error.message);
    return result;
  }

  async updateGeoAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('geo_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGeoAnalyticsError(error.message);
    return result;
  }

  async deleteGeoAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('geo_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGeoAnalyticsError(error.message);
  }

  async getLoadBalancer(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('load_balancers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLoadBalancer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('load_balancers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLoadBalancerError(error.message);
    return data ?? [];
  }

  async createLoadBalancer(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('load_balancers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLoadBalancerError(error.message);
    return result;
  }

  async updateLoadBalancer(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('load_balancers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLoadBalancerError(error.message);
    return result;
  }

  async deleteLoadBalancer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('load_balancers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLoadBalancerError(error.message);
  }

  async getLoadBalancerPool(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('load_balancer_pools')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLoadBalancerPool(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('load_balancer_pools').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLoadBalancerPoolError(error.message);
    return data ?? [];
  }

  async createLoadBalancerPool(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('load_balancer_pools')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLoadBalancerPoolError(error.message);
    return result;
  }

  async updateLoadBalancerPool(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('load_balancer_pools')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLoadBalancerPoolError(error.message);
    return result;
  }

  async deleteLoadBalancerPool(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('load_balancer_pools')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLoadBalancerPoolError(error.message);
  }

  async getLoadBalancerHealth(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('load_balancer_healths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLoadBalancerHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('load_balancer_healths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLoadBalancerHealthError(error.message);
    return data ?? [];
  }

  async createLoadBalancerHealth(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('load_balancer_healths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLoadBalancerHealthError(error.message);
    return result;
  }

  async updateLoadBalancerHealth(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('load_balancer_healths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLoadBalancerHealthError(error.message);
    return result;
  }

  async deleteLoadBalancerHealth(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('load_balancer_healths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLoadBalancerHealthError(error.message);
  }

  async getLoadBalancerPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('load_balancer_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLoadBalancerPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('load_balancer_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLoadBalancerPolicyError(error.message);
    return data ?? [];
  }

  async createLoadBalancerPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('load_balancer_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLoadBalancerPolicyError(error.message);
    return result;
  }

  async updateLoadBalancerPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('load_balancer_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLoadBalancerPolicyError(error.message);
    return result;
  }

  async deleteLoadBalancerPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('load_balancer_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLoadBalancerPolicyError(error.message);
  }

  async getDisasterRecoveryPlan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('disaster_recovery_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDisasterRecoveryPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('disaster_recovery_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDisasterRecoveryPlanError(error.message);
    return data ?? [];
  }

  async createDisasterRecoveryPlan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('disaster_recovery_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDisasterRecoveryPlanError(error.message);
    return result;
  }

  async updateDisasterRecoveryPlan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('disaster_recovery_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDisasterRecoveryPlanError(error.message);
    return result;
  }

  async deleteDisasterRecoveryPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('disaster_recovery_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDisasterRecoveryPlanError(error.message);
  }

  async getDisasterRecoveryRunbook(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('disaster_recovery_runbooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDisasterRecoveryRunbook(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('disaster_recovery_runbooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDisasterRecoveryRunbookError(error.message);
    return data ?? [];
  }

  async createDisasterRecoveryRunbook(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('disaster_recovery_runbooks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDisasterRecoveryRunbookError(error.message);
    return result;
  }

  async updateDisasterRecoveryRunbook(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('disaster_recovery_runbooks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDisasterRecoveryRunbookError(error.message);
    return result;
  }

  async deleteDisasterRecoveryRunbook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('disaster_recovery_runbooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDisasterRecoveryRunbookError(error.message);
  }

  async getDisasterRecoveryTest(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('disaster_recovery_tests')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDisasterRecoveryTest(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('disaster_recovery_tests').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDisasterRecoveryTestError(error.message);
    return data ?? [];
  }

  async createDisasterRecoveryTest(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('disaster_recovery_tests')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDisasterRecoveryTestError(error.message);
    return result;
  }

  async updateDisasterRecoveryTest(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('disaster_recovery_tests')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDisasterRecoveryTestError(error.message);
    return result;
  }

  async deleteDisasterRecoveryTest(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('disaster_recovery_tests')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDisasterRecoveryTestError(error.message);
  }

  async getDisasterRecoveryMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('disaster_recovery_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDisasterRecoveryMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('disaster_recovery_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDisasterRecoveryMetricsError(error.message);
    return data ?? [];
  }

  async createDisasterRecoveryMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('disaster_recovery_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDisasterRecoveryMetricsError(error.message);
    return result;
  }

  async updateDisasterRecoveryMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('disaster_recovery_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDisasterRecoveryMetricsError(error.message);
    return result;
  }

  async deleteDisasterRecoveryMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('disaster_recovery_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDisasterRecoveryMetricsError(error.message);
  }

  async getBackupPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('backup_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBackupPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('backup_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBackupPolicyError(error.message);
    return data ?? [];
  }

  async createBackupPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('backup_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBackupPolicyError(error.message);
    return result;
  }

  async updateBackupPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('backup_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBackupPolicyError(error.message);
    return result;
  }

  async deleteBackupPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('backup_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBackupPolicyError(error.message);
  }

  async getBackupVault(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('backup_vaults')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBackupVault(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('backup_vaults').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBackupVaultError(error.message);
    return data ?? [];
  }

  async createBackupVault(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('backup_vaults')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBackupVaultError(error.message);
    return result;
  }

  async updateBackupVault(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('backup_vaults')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBackupVaultError(error.message);
    return result;
  }

  async deleteBackupVault(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('backup_vaults')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBackupVaultError(error.message);
  }

  async getBackupJob(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('backup_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBackupJob(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('backup_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBackupJobError(error.message);
    return data ?? [];
  }

  async createBackupJob(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('backup_jobs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBackupJobError(error.message);
    return result;
  }

  async updateBackupJob(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('backup_jobs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBackupJobError(error.message);
    return result;
  }

  async deleteBackupJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('backup_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBackupJobError(error.message);
  }

  async getBackupRestore(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('backup_restores')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBackupRestore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('backup_restores').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBackupRestoreError(error.message);
    return data ?? [];
  }

  async createBackupRestore(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('backup_restores')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBackupRestoreError(error.message);
    return result;
  }

  async updateBackupRestore(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('backup_restores')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBackupRestoreError(error.message);
    return result;
  }

  async deleteBackupRestore(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('backup_restores')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBackupRestoreError(error.message);
  }

  async getReplicationPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('replication_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listReplicationPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('replication_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudReplicationPolicyError(error.message);
    return data ?? [];
  }

  async createReplicationPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('replication_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudReplicationPolicyError(error.message);
    return result;
  }

  async updateReplicationPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('replication_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudReplicationPolicyError(error.message);
    return result;
  }

  async deleteReplicationPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('replication_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudReplicationPolicyError(error.message);
  }

  async getReplicationJob(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('replication_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listReplicationJob(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('replication_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudReplicationJobError(error.message);
    return data ?? [];
  }

  async createReplicationJob(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('replication_jobs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudReplicationJobError(error.message);
    return result;
  }

  async updateReplicationJob(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('replication_jobs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudReplicationJobError(error.message);
    return result;
  }

  async deleteReplicationJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('replication_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudReplicationJobError(error.message);
  }

  async getReplicationStatusDetail(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('replication_status_details')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listReplicationStatusDetail(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('replication_status_details').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudReplicationStatusDetailError(error.message);
    return data ?? [];
  }

  async createReplicationStatusDetail(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('replication_status_details')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudReplicationStatusDetailError(error.message);
    return result;
  }

  async updateReplicationStatusDetail(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('replication_status_details')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudReplicationStatusDetailError(error.message);
    return result;
  }

  async deleteReplicationStatusDetail(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('replication_status_details')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudReplicationStatusDetailError(error.message);
  }

  async getReplicationMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('replication_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listReplicationMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('replication_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudReplicationMetricsError(error.message);
    return data ?? [];
  }

  async createReplicationMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('replication_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudReplicationMetricsError(error.message);
    return result;
  }

  async updateReplicationMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('replication_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudReplicationMetricsError(error.message);
    return result;
  }

  async deleteReplicationMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('replication_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudReplicationMetricsError(error.message);
  }

  async getDatabaseRouter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('database_routers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDatabaseRouter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('database_routers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDatabaseRouterError(error.message);
    return data ?? [];
  }

  async createDatabaseRouter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('database_routers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDatabaseRouterError(error.message);
    return result;
  }

  async updateDatabaseRouter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('database_routers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDatabaseRouterError(error.message);
    return result;
  }

  async deleteDatabaseRouter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('database_routers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDatabaseRouterError(error.message);
  }

  async getDatabaseRoute(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('database_routes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDatabaseRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('database_routes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDatabaseRouteError(error.message);
    return data ?? [];
  }

  async createDatabaseRoute(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('database_routes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDatabaseRouteError(error.message);
    return result;
  }

  async updateDatabaseRoute(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('database_routes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDatabaseRouteError(error.message);
    return result;
  }

  async deleteDatabaseRoute(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('database_routes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDatabaseRouteError(error.message);
  }

  async getDatabaseHealth(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('database_healths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDatabaseHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('database_healths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDatabaseHealthError(error.message);
    return data ?? [];
  }

  async createDatabaseHealth(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('database_healths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDatabaseHealthError(error.message);
    return result;
  }

  async updateDatabaseHealth(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('database_healths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDatabaseHealthError(error.message);
    return result;
  }

  async deleteDatabaseHealth(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('database_healths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDatabaseHealthError(error.message);
  }

  async getDatabaseMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('database_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDatabaseMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('database_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDatabaseMetricsError(error.message);
    return data ?? [];
  }

  async createDatabaseMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('database_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDatabaseMetricsError(error.message);
    return result;
  }

  async updateDatabaseMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('database_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDatabaseMetricsError(error.message);
    return result;
  }

  async deleteDatabaseMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('database_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDatabaseMetricsError(error.message);
  }

  async getCloudStorage(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_storages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudStorage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_storages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudStorageError(error.message);
    return data ?? [];
  }

  async createCloudStorage(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_storages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudStorageError(error.message);
    return result;
  }

  async updateCloudStorage(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_storages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudStorageError(error.message);
    return result;
  }

  async deleteCloudStorage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_storages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudStorageError(error.message);
  }

  async getStorageBucket(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('storage_buckets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStorageBucket(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('storage_buckets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStorageBucketError(error.message);
    return data ?? [];
  }

  async createStorageBucket(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('storage_buckets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStorageBucketError(error.message);
    return result;
  }

  async updateStorageBucket(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('storage_buckets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStorageBucketError(error.message);
    return result;
  }

  async deleteStorageBucket(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('storage_buckets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStorageBucketError(error.message);
  }

  async getStoragePolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('storage_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStoragePolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('storage_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStoragePolicyError(error.message);
    return data ?? [];
  }

  async createStoragePolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('storage_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStoragePolicyError(error.message);
    return result;
  }

  async updateStoragePolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('storage_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStoragePolicyError(error.message);
    return result;
  }

  async deleteStoragePolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('storage_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStoragePolicyError(error.message);
  }

  async getStorageMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('storage_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStorageMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('storage_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStorageMetricsError(error.message);
    return data ?? [];
  }

  async createStorageMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('storage_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStorageMetricsError(error.message);
    return result;
  }

  async updateStorageMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('storage_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStorageMetricsError(error.message);
    return result;
  }

  async deleteStorageMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('storage_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStorageMetricsError(error.message);
  }

  async getCloudMonitor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_monitors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_monitors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudMonitorError(error.message);
    return data ?? [];
  }

  async createCloudMonitor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_monitors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudMonitorError(error.message);
    return result;
  }

  async updateCloudMonitor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_monitors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudMonitorError(error.message);
    return result;
  }

  async deleteCloudMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_monitors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudMonitorError(error.message);
  }

  async getMonitorAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('monitor_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMonitorAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('monitor_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMonitorAlertError(error.message);
    return data ?? [];
  }

  async createMonitorAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('monitor_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMonitorAlertError(error.message);
    return result;
  }

  async updateMonitorAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('monitor_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMonitorAlertError(error.message);
    return result;
  }

  async deleteMonitorAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('monitor_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMonitorAlertError(error.message);
  }

  async getMonitorDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('monitor_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMonitorDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('monitor_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMonitorDashboardError(error.message);
    return data ?? [];
  }

  async createMonitorDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('monitor_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMonitorDashboardError(error.message);
    return result;
  }

  async updateMonitorDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('monitor_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMonitorDashboardError(error.message);
    return result;
  }

  async deleteMonitorDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('monitor_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMonitorDashboardError(error.message);
  }

  async getMonitorMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('monitor_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMonitorMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('monitor_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMonitorMetricError(error.message);
    return data ?? [];
  }

  async createMonitorMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('monitor_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMonitorMetricError(error.message);
    return result;
  }

  async updateMonitorMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('monitor_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMonitorMetricError(error.message);
    return result;
  }

  async deleteMonitorMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('monitor_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMonitorMetricError(error.message);
  }

  async getGlobalConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('globals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGlobalConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('globals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGlobalError(error.message);
    return data ?? [];
  }

  async createGlobalConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('globals')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGlobalError(error.message);
    return result;
  }

  async updateGlobalConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('globals')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGlobalError(error.message);
    return result;
  }

  async deleteGlobalConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('globals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGlobalError(error.message);
  }

  async getRegionalConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('regionals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRegionalConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('regionals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRegionalError(error.message);
    return data ?? [];
  }

  async createRegionalConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('regionals')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRegionalError(error.message);
    return result;
  }

  async updateRegionalConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('regionals')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRegionalError(error.message);
    return result;
  }

  async deleteRegionalConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('regionals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRegionalError(error.message);
  }

  async getTenantConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('tenants')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTenantConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('tenants').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTenantError(error.message);
    return data ?? [];
  }

  async createTenantConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('tenants')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTenantError(error.message);
    return result;
  }

  async updateTenantConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('tenants')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTenantError(error.message);
    return result;
  }

  async deleteTenantConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('tenants')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTenantError(error.message);
  }

  async getEnvironmentConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('environments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnvironmentConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('environments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnvironmentError(error.message);
    return data ?? [];
  }

  async createEnvironmentConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('environments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentError(error.message);
    return result;
  }

  async updateEnvironmentConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('environments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentError(error.message);
    return result;
  }

  async deleteEnvironmentConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('environments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnvironmentError(error.message);
  }

  async getCloudNetwork(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_networks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudNetwork(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_networks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudNetworkError(error.message);
    return data ?? [];
  }

  async createCloudNetwork(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_networks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudNetworkError(error.message);
    return result;
  }

  async updateCloudNetwork(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_networks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudNetworkError(error.message);
    return result;
  }

  async deleteCloudNetwork(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_networks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudNetworkError(error.message);
  }

  async getNetworkVPC(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('network_vpcs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNetworkVPC(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('network_vpcs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNetworkVPCError(error.message);
    return data ?? [];
  }

  async createNetworkVPC(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('network_vpcs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNetworkVPCError(error.message);
    return result;
  }

  async updateNetworkVPC(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('network_vpcs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNetworkVPCError(error.message);
    return result;
  }

  async deleteNetworkVPC(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('network_vpcs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNetworkVPCError(error.message);
  }

  async getNetworkSubnet(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('network_subnets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNetworkSubnet(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('network_subnets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNetworkSubnetError(error.message);
    return data ?? [];
  }

  async createNetworkSubnet(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('network_subnets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNetworkSubnetError(error.message);
    return result;
  }

  async updateNetworkSubnet(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('network_subnets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNetworkSubnetError(error.message);
    return result;
  }

  async deleteNetworkSubnet(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('network_subnets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNetworkSubnetError(error.message);
  }

  async getNetworkFirewall(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('network_firewalls')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNetworkFirewall(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('network_firewalls').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNetworkFirewallError(error.message);
    return data ?? [];
  }

  async createNetworkFirewall(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('network_firewalls')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNetworkFirewallError(error.message);
    return result;
  }

  async updateNetworkFirewall(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('network_firewalls')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNetworkFirewallError(error.message);
    return result;
  }

  async deleteNetworkFirewall(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('network_firewalls')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNetworkFirewallError(error.message);
  }

  async getCloudSecurity(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_securitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudSecurity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_securitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudSecurityError(error.message);
    return data ?? [];
  }

  async createCloudSecurity(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_securitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudSecurityError(error.message);
    return result;
  }

  async updateCloudSecurity(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_securitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudSecurityError(error.message);
    return result;
  }

  async deleteCloudSecurity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_securitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudSecurityError(error.message);
  }

  async getSecurityPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('security_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecurityPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('security_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecurityPolicyError(error.message);
    return data ?? [];
  }

  async createSecurityPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('security_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecurityPolicyError(error.message);
    return result;
  }

  async updateSecurityPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('security_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecurityPolicyError(error.message);
    return result;
  }

  async deleteSecurityPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('security_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecurityPolicyError(error.message);
  }

  async getSecurityAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('security_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecurityAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('security_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecurityAuditError(error.message);
    return data ?? [];
  }

  async createSecurityAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('security_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecurityAuditError(error.message);
    return result;
  }

  async updateSecurityAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('security_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecurityAuditError(error.message);
    return result;
  }

  async deleteSecurityAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('security_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecurityAuditError(error.message);
  }

  async getSecurityIncident(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('security_incidents')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecurityIncident(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('security_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecurityIncidentError(error.message);
    return data ?? [];
  }

  async createSecurityIncident(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('security_incidents')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecurityIncidentError(error.message);
    return result;
  }

  async updateSecurityIncident(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('security_incidents')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecurityIncidentError(error.message);
    return result;
  }

  async deleteSecurityIncident(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('security_incidents')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecurityIncidentError(error.message);
  }

  async getCloudCompliance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_compliances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_compliances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudComplianceError(error.message);
    return data ?? [];
  }

  async createCloudCompliance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_compliances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudComplianceError(error.message);
    return result;
  }

  async updateCloudCompliance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_compliances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudComplianceError(error.message);
    return result;
  }

  async deleteCloudCompliance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_compliances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudComplianceError(error.message);
  }

  async getComplianceScan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('compliance_scans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComplianceScan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('compliance_scans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComplianceScanError(error.message);
    return data ?? [];
  }

  async createComplianceScan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('compliance_scans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComplianceScanError(error.message);
    return result;
  }

  async updateComplianceScan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('compliance_scans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComplianceScanError(error.message);
    return result;
  }

  async deleteComplianceScan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('compliance_scans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComplianceScanError(error.message);
  }

  async getComplianceReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('compliance_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComplianceReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('compliance_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComplianceReportError(error.message);
    return data ?? [];
  }

  async createComplianceReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('compliance_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComplianceReportError(error.message);
    return result;
  }

  async updateComplianceReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('compliance_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComplianceReportError(error.message);
    return result;
  }

  async deleteComplianceReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('compliance_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComplianceReportError(error.message);
  }

  async getComplianceAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('compliance_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComplianceAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('compliance_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComplianceAuditError(error.message);
    return data ?? [];
  }

  async createComplianceAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('compliance_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComplianceAuditError(error.message);
    return result;
  }

  async updateComplianceAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('compliance_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComplianceAuditError(error.message);
    return result;
  }

  async deleteComplianceAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('compliance_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComplianceAuditError(error.message);
  }

  async getCloudCost(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_costs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudCost(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_costs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudCostError(error.message);
    return data ?? [];
  }

  async createCloudCost(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_costs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudCostError(error.message);
    return result;
  }

  async updateCloudCost(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_costs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudCostError(error.message);
    return result;
  }

  async deleteCloudCost(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_costs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudCostError(error.message);
  }

  async getCostBudget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cost_budgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCostBudget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cost_budgets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCostBudgetError(error.message);
    return data ?? [];
  }

  async createCostBudget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cost_budgets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCostBudgetError(error.message);
    return result;
  }

  async updateCostBudget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cost_budgets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCostBudgetError(error.message);
    return result;
  }

  async deleteCostBudget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cost_budgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCostBudgetError(error.message);
  }

  async getCostAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cost_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCostAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cost_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCostAlertError(error.message);
    return data ?? [];
  }

  async createCostAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cost_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCostAlertError(error.message);
    return result;
  }

  async updateCostAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cost_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCostAlertError(error.message);
    return result;
  }

  async deleteCostAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cost_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCostAlertError(error.message);
  }

  async getCostOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cost_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCostOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cost_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCostOptimizationError(error.message);
    return data ?? [];
  }

  async createCostOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cost_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCostOptimizationError(error.message);
    return result;
  }

  async updateCostOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cost_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCostOptimizationError(error.message);
    return result;
  }

  async deleteCostOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cost_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCostOptimizationError(error.message);
  }

  async getCloudIdentity(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_identitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudIdentity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_identitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudIdentityError(error.message);
    return data ?? [];
  }

  async createCloudIdentity(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_identitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudIdentityError(error.message);
    return result;
  }

  async updateCloudIdentity(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_identitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudIdentityError(error.message);
    return result;
  }

  async deleteCloudIdentity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_identitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudIdentityError(error.message);
  }

  async getIdentityProvider(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('identity_providers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listIdentityProvider(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('identity_providers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudIdentityProviderError(error.message);
    return data ?? [];
  }

  async createIdentityProvider(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('identity_providers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudIdentityProviderError(error.message);
    return result;
  }

  async updateIdentityProvider(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('identity_providers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudIdentityProviderError(error.message);
    return result;
  }

  async deleteIdentityProvider(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('identity_providers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudIdentityProviderError(error.message);
  }

  async getIdentityFederation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('identity_federatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listIdentityFederation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('identity_federatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudIdentityFederationError(error.message);
    return data ?? [];
  }

  async createIdentityFederation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('identity_federatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudIdentityFederationError(error.message);
    return result;
  }

  async updateIdentityFederation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('identity_federatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudIdentityFederationError(error.message);
    return result;
  }

  async deleteIdentityFederation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('identity_federatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudIdentityFederationError(error.message);
  }

  async getIdentityAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('identity_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listIdentityAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('identity_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudIdentityAuditError(error.message);
    return data ?? [];
  }

  async createIdentityAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('identity_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudIdentityAuditError(error.message);
    return result;
  }

  async updateIdentityAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('identity_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudIdentityAuditError(error.message);
    return result;
  }

  async deleteIdentityAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('identity_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudIdentityAuditError(error.message);
  }

  async getCloudAPI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_apis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudAPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_apis').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudAPIError(error.message);
    return data ?? [];
  }

  async createCloudAPI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_apis')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudAPIError(error.message);
    return result;
  }

  async updateCloudAPI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_apis')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudAPIError(error.message);
    return result;
  }

  async deleteCloudAPI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_apis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudAPIError(error.message);
  }

  async getAPIGateway(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('apigatewaies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAPIGateway(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('apigatewaies').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAPIGatewayError(error.message);
    return data ?? [];
  }

  async createAPIGateway(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('apigatewaies')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAPIGatewayError(error.message);
    return result;
  }

  async updateAPIGateway(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('apigatewaies')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAPIGatewayError(error.message);
    return result;
  }

  async deleteAPIGateway(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('apigatewaies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAPIGatewayError(error.message);
  }

  async getAPIRoute(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('apiroutes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAPIRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('apiroutes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAPIRouteError(error.message);
    return data ?? [];
  }

  async createAPIRoute(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('apiroutes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAPIRouteError(error.message);
    return result;
  }

  async updateAPIRoute(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('apiroutes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAPIRouteError(error.message);
    return result;
  }

  async deleteAPIRoute(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('apiroutes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAPIRouteError(error.message);
  }

  async getAPILimit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('apilimits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAPILimit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('apilimits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAPILimitError(error.message);
    return data ?? [];
  }

  async createAPILimit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('apilimits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAPILimitError(error.message);
    return result;
  }

  async updateAPILimit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('apilimits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAPILimitError(error.message);
    return result;
  }

  async deleteAPILimit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('apilimits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAPILimitError(error.message);
  }

  async getCloudPipeline(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_pipelines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudPipeline(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudPipelineError(error.message);
    return data ?? [];
  }

  async createCloudPipeline(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_pipelines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudPipelineError(error.message);
    return result;
  }

  async updateCloudPipeline(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_pipelines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudPipelineError(error.message);
    return result;
  }

  async deleteCloudPipeline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_pipelines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudPipelineError(error.message);
  }

  async getPipelineStage(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('pipeline_stages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPipelineStage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('pipeline_stages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPipelineStageError(error.message);
    return data ?? [];
  }

  async createPipelineStage(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('pipeline_stages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPipelineStageError(error.message);
    return result;
  }

  async updatePipelineStage(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('pipeline_stages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPipelineStageError(error.message);
    return result;
  }

  async deletePipelineStage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('pipeline_stages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPipelineStageError(error.message);
  }

  async getPipelineRun(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('pipeline_runs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPipelineRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('pipeline_runs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPipelineRunError(error.message);
    return data ?? [];
  }

  async createPipelineRun(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('pipeline_runs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPipelineRunError(error.message);
    return result;
  }

  async updatePipelineRun(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('pipeline_runs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPipelineRunError(error.message);
    return result;
  }

  async deletePipelineRun(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('pipeline_runs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPipelineRunError(error.message);
  }

  async getPipelineMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('pipeline_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPipelineMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('pipeline_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPipelineMetricError(error.message);
    return data ?? [];
  }

  async createPipelineMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('pipeline_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPipelineMetricError(error.message);
    return result;
  }

  async updatePipelineMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('pipeline_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPipelineMetricError(error.message);
    return result;
  }

  async deletePipelineMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('pipeline_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPipelineMetricError(error.message);
  }

  async getCloudSecret(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_secrets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudSecret(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_secrets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudSecretError(error.message);
    return data ?? [];
  }

  async createCloudSecret(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_secrets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudSecretError(error.message);
    return result;
  }

  async updateCloudSecret(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_secrets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudSecretError(error.message);
    return result;
  }

  async deleteCloudSecret(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_secrets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudSecretError(error.message);
  }

  async getSecretVersion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('secret_versioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecretVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('secret_versioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecretVersionError(error.message);
    return data ?? [];
  }

  async createSecretVersion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('secret_versioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecretVersionError(error.message);
    return result;
  }

  async updateSecretVersion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('secret_versioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecretVersionError(error.message);
    return result;
  }

  async deleteSecretVersion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('secret_versioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecretVersionError(error.message);
  }

  async getSecretRotation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('secret_rotatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecretRotation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('secret_rotatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecretRotationError(error.message);
    return data ?? [];
  }

  async createSecretRotation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('secret_rotatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecretRotationError(error.message);
    return result;
  }

  async updateSecretRotation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('secret_rotatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecretRotationError(error.message);
    return result;
  }

  async deleteSecretRotation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('secret_rotatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecretRotationError(error.message);
  }

  async getSecretAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('secret_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecretAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('secret_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecretAuditError(error.message);
    return data ?? [];
  }

  async createSecretAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('secret_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecretAuditError(error.message);
    return result;
  }

  async updateSecretAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('secret_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecretAuditError(error.message);
    return result;
  }

  async deleteSecretAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('secret_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecretAuditError(error.message);
  }

  async getCloudCertificate(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_certificates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudCertificate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_certificates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudCertificateError(error.message);
    return data ?? [];
  }

  async createCloudCertificate(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_certificates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudCertificateError(error.message);
    return result;
  }

  async updateCloudCertificate(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_certificates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudCertificateError(error.message);
    return result;
  }

  async deleteCloudCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_certificates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudCertificateError(error.message);
  }

  async getCertificateRenewal(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('certificate_renewals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCertificateRenewal(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('certificate_renewals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCertificateRenewalError(error.message);
    return data ?? [];
  }

  async createCertificateRenewal(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('certificate_renewals')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCertificateRenewalError(error.message);
    return result;
  }

  async updateCertificateRenewal(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('certificate_renewals')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCertificateRenewalError(error.message);
    return result;
  }

  async deleteCertificateRenewal(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificate_renewals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCertificateRenewalError(error.message);
  }

}

export function createCloudModuleRepository(supabase: SupabaseClient): CloudModuleRepository {
  return new CloudModuleRepositoryImpl(supabase);
}


import { SupabaseClient } from '@supabase/supabase-js';
// Enterprise Ecosystem - Repository Types
// Phase 2.10 - EduCI Platform

// ═══════════════════════════════════════════════════════════════════════════════
// Module 1: Global Administration
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntGlobalAdministration, EntGlobalAdministrationCreate, EntGlobalAdministrationUpdate, EntGlobalAdministrationQuery,
  EntPlatformSetting, EntPlatformSettingCreate, EntPlatformSettingUpdate, EntPlatformSettingQuery,
  EntEnvironmentConfig, EntEnvironmentConfigCreate, EntEnvironmentConfigUpdate, EntEnvironmentConfigQuery,
  EntFeatureFlag, EntFeatureFlagCreate, EntFeatureFlagUpdate, EntFeatureFlagQuery,
  EntModuleRegistry, EntModuleRegistryCreate, EntModuleRegistryUpdate, EntModuleRegistryQuery,
  EntVersionRegistry, EntVersionRegistryCreate, EntVersionRegistryUpdate, EntVersionRegistryQuery,
  EntTenantRegistry, EntTenantRegistryCreate, EntTenantRegistryUpdate, EntTenantRegistryQuery,
  EntLicenseRegistry, EntLicenseRegistryCreate, EntLicenseRegistryUpdate, EntLicenseRegistryQuery,
  EntDeploymentRegistry, EntDeploymentRegistryCreate, EntDeploymentRegistryUpdate, EntDeploymentRegistryQuery,
  EntPlatformDashboard, EntPlatformDashboardCreate, EntPlatformDashboardUpdate, EntPlatformDashboardQuery,
  EntPlatformMetric, EntPlatformMetricCreate, EntPlatformMetricUpdate, EntPlatformMetricQuery,
  EntPlatformAlert, EntPlatformAlertCreate, EntPlatformAlertUpdate, EntPlatformAlertQuery,
  EntPlatformAudit, EntPlatformAuditCreate, EntPlatformAuditUpdate, EntPlatformAuditQuery,
  EntPlatformBackup, EntPlatformBackupCreate, EntPlatformBackupUpdate, EntPlatformBackupQuery,
  EntPlatformEvent, EntPlatformEventCreate, EntPlatformEventUpdate, EntPlatformEventQuery,
  EntPlatformConfig, EntPlatformConfigCreate, EntPlatformConfigUpdate, EntPlatformConfigQuery,
  EntPlatformWebhook, EntPlatformWebhookCreate, EntPlatformWebhookUpdate, EntPlatformWebhookQuery,
  EntPlatformApiKey, EntPlatformApiKeyCreate, EntPlatformApiKeyUpdate, EntPlatformApiKeyQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 2: Tenant Management
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntTenant, EntTenantCreate, EntTenantUpdate, EntTenantQuery,
  EntTenantIsolation, EntTenantIsolationCreate, EntTenantIsolationUpdate, EntTenantIsolationQuery,
  EntTenantMigration, EntTenantMigrationCreate, EntTenantMigrationUpdate, EntTenantMigrationQuery,
  EntTenantBackupConfig, EntTenantBackupConfigCreate, EntTenantBackupConfigUpdate, EntTenantBackupConfigQuery,
  EntTenantRestore, EntTenantRestoreCreate, EntTenantRestoreUpdate, EntTenantRestoreQuery,
  EntTenantArchive, EntTenantArchiveCreate, EntTenantArchiveUpdate, EntTenantArchiveQuery,
  EntTenantClone, EntTenantCloneCreate, EntTenantCloneUpdate, EntTenantCloneQuery,
  EntTenantMerge, EntTenantMergeCreate, EntTenantMergeUpdate, EntTenantMergeQuery,
  EntTenantSplit, EntTenantSplitCreate, EntTenantSplitUpdate, EntTenantSplitQuery,
  EntTenantMonitoring, EntTenantMonitoringCreate, EntTenantMonitoringUpdate, EntTenantMonitoringQuery,
  EntTenantAnalytics, EntTenantAnalyticsCreate, EntTenantAnalyticsUpdate, EntTenantAnalyticsQuery,
  EntTenantQuota, EntTenantQuotaCreate, EntTenantQuotaUpdate, EntTenantQuotaQuery,
  EntTenantBilling, EntTenantBillingCreate, EntTenantBillingUpdate, EntTenantBillingQuery,
  EntTenantFeature, EntTenantFeatureCreate, EntTenantFeatureUpdate, EntTenantFeatureQuery,
  EntTenantSso, EntTenantSsoCreate, EntTenantSsoUpdate, EntTenantSsoQuery,
  EntTenantCustomDomain, EntTenantCustomDomainCreate, EntTenantCustomDomainUpdate, EntTenantCustomDomainQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 3: Release Engineering
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntReleasePipeline, EntReleasePipelineCreate, EntReleasePipelineUpdate, EntReleasePipelineQuery,
  EntPipelineStage, EntPipelineStageCreate, EntPipelineStageUpdate, EntPipelineStageQuery,
  EntPipelineRun, EntPipelineRunCreate, EntPipelineRunUpdate, EntPipelineRunQuery,
  EntVersionManager, EntVersionManagerCreate, EntVersionManagerUpdate, EntVersionManagerQuery,
  EntBlueGreenDeployment, EntBlueGreenDeploymentCreate, EntBlueGreenDeploymentUpdate, EntBlueGreenDeploymentQuery,
  EntCanaryDeployment, EntCanaryDeploymentCreate, EntCanaryDeploymentUpdate, EntCanaryDeploymentQuery,
  EntRollback, EntRollbackCreate, EntRollbackUpdate, EntRollbackQuery,
  EntMigrationManager, EntMigrationManagerCreate, EntMigrationManagerUpdate, EntMigrationManagerQuery,
  EntEnvironmentPromotion, EntEnvironmentPromotionCreate, EntEnvironmentPromotionUpdate, EntEnvironmentPromotionQuery,
  EntDeploymentHistory, EntDeploymentHistoryCreate, EntDeploymentHistoryUpdate, EntDeploymentHistoryQuery,
  EntFeatureDeployment, EntFeatureDeploymentCreate, EntFeatureDeploymentUpdate, EntFeatureDeploymentQuery,
  EntConfigDeployment, EntConfigDeploymentCreate, EntConfigDeploymentUpdate, EntConfigDeploymentQuery,
  EntInfrastructureChange, EntInfrastructureChangeCreate, EntInfrastructureChangeUpdate, EntInfrastructureChangeQuery,
  EntDeploymentApproval, EntDeploymentApprovalCreate, EntDeploymentApprovalUpdate, EntDeploymentApprovalQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 4: Observability
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntDistributedTrace, EntDistributedTraceCreate, EntDistributedTraceUpdate, EntDistributedTraceQuery,
  EntTraceSpan, EntTraceSpanCreate, EntTraceSpanUpdate, EntTraceSpanQuery,
  EntStructuredLog, EntStructuredLogCreate, EntStructuredLogUpdate, EntStructuredLogQuery,
  EntMetric, EntMetricCreate, EntMetricUpdate, EntMetricQuery,
  EntPerformanceDashboard, EntPerformanceDashboardCreate, EntPerformanceDashboardUpdate, EntPerformanceDashboardQuery,
  EntErrorDashboard, EntErrorDashboardCreate, EntErrorDashboardUpdate, EntErrorDashboardQuery,
  EntSlowQuery, EntSlowQueryCreate, EntSlowQueryUpdate, EntSlowQueryQuery,
  EntAlertRule, EntAlertRuleCreate, EntAlertRuleUpdate, EntAlertRuleQuery,
  EntAlertIncident, EntAlertIncidentCreate, EntAlertIncidentUpdate, EntAlertIncidentQuery,
  EntSlo, EntSloCreate, EntSloUpdate, EntSloQuery,
  EntSla, EntSlaCreate, EntSlaUpdate, EntSlaQuery,
  EntServiceHealth, EntServiceHealthCreate, EntServiceHealthUpdate, EntServiceHealthQuery,
  EntLogAggregation, EntLogAggregationCreate, EntLogAggregationUpdate, EntLogAggregationQuery,
  EntMetricsAggregation, EntMetricsAggregationCreate, EntMetricsAggregationUpdate, EntMetricsAggregationQuery,
  EntAlertEscalation, EntAlertEscalationCreate, EntAlertEscalationUpdate, EntAlertEscalationQuery,
  EntPerformanceBaseline, EntPerformanceBaselineCreate, EntPerformanceBaselineUpdate, EntPerformanceBaselineQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 5: Cache & Performance
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntRedisCluster, EntRedisClusterCreate, EntRedisClusterUpdate, EntRedisClusterQuery,
  EntCacheLayer, EntCacheLayerCreate, EntCacheLayerUpdate, EntCacheLayerQuery,
  EntCacheEntry, EntCacheEntryCreate, EntCacheEntryUpdate, EntCacheEntryQuery,
  EntDistributedCache, EntDistributedCacheCreate, EntDistributedCacheUpdate, EntDistributedCacheQuery,
  EntQueryCache, EntQueryCacheCreate, EntQueryCacheUpdate, EntQueryCacheQuery,
  EntApiCache, EntApiCacheCreate, EntApiCacheUpdate, EntApiCacheQuery,
  EntCacheInvalidation, EntCacheInvalidationCreate, EntCacheInvalidationUpdate, EntCacheInvalidationQuery,
  EntCacheMetrics, EntCacheMetricsCreate, EntCacheMetricsUpdate, EntCacheMetricsQuery,
  EntCacheWarmer, EntCacheWarmerCreate, EntCacheWarmerUpdate, EntCacheWarmerQuery,
  EntCacheSnapshot, EntCacheSnapshotCreate, EntCacheSnapshotUpdate, EntCacheSnapshotQuery,
  EntCachePolicy, EntCachePolicyCreate, EntCachePolicyUpdate, EntCachePolicyQuery,
  EntCacheCluster, EntCacheClusterCreate, EntCacheClusterUpdate, EntCacheClusterQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 6: Search Infrastructure
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntSearchIndex, EntSearchIndexCreate, EntSearchIndexUpdate, EntSearchIndexQuery,
  EntSearchDocument, EntSearchDocumentCreate, EntSearchDocumentUpdate, EntSearchDocumentQuery,
  EntSearchQuery, EntSearchQueryCreate, EntSearchQueryUpdate, EntSearchQueryQuery,
  EntSearchSuggestion, EntSearchSuggestionCreate, EntSearchSuggestionUpdate, EntSearchSuggestionQuery,
  EntSearchAnalytics, EntSearchAnalyticsCreate, EntSearchAnalyticsUpdate, EntSearchAnalyticsQuery,
  EntGlobalSearchConfig, EntGlobalSearchConfigCreate, EntGlobalSearchConfigUpdate, EntGlobalSearchConfigQuery,
  EntElasticCluster, EntElasticClusterCreate, EntElasticClusterUpdate, EntElasticClusterQuery,
  EntIndexBuilder, EntIndexBuilderCreate, EntIndexBuilderUpdate, EntIndexBuilderQuery,
  EntIncrementalIndex, EntIncrementalIndexCreate, EntIncrementalIndexUpdate, EntIncrementalIndexQuery,
  EntPeopleSearch, EntPeopleSearchCreate, EntPeopleSearchUpdate, EntPeopleSearchQuery,
  EntSchoolSearch, EntSchoolSearchCreate, EntSchoolSearchUpdate, EntSchoolSearchQuery,
  EntAnalyticsSearch, EntAnalyticsSearchCreate, EntAnalyticsSearchUpdate, EntAnalyticsSearchQuery,
  EntSearchRelevance, EntSearchRelevanceCreate, EntSearchRelevanceUpdate, EntSearchRelevanceQuery,
  EntSearchSynonym, EntSearchSynonymCreate, EntSearchSynonymUpdate, EntSearchSynonymQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 7: Security & Zero Trust
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntZeroTrustPolicy, EntZeroTrustPolicyCreate, EntZeroTrustPolicyUpdate, EntZeroTrustPolicyQuery,
  EntAccessPolicy, EntAccessPolicyCreate, EntAccessPolicyUpdate, EntAccessPolicyQuery,
  EntRole, EntRoleCreate, EntRoleUpdate, EntRoleQuery,
  EntPermission, EntPermissionCreate, EntPermissionUpdate, EntPermissionQuery,
  EntAbacPolicy, EntAbacPolicyCreate, EntAbacPolicyUpdate, EntAbacPolicyQuery,
  EntPolicyEvaluation, EntPolicyEvaluationCreate, EntPolicyEvaluationUpdate, EntPolicyEvaluationQuery,
  EntSecretRotation, EntSecretRotationCreate, EntSecretRotationUpdate, EntSecretRotationQuery,
  EntSecurityCenter, EntSecurityCenterCreate, EntSecurityCenterUpdate, EntSecurityCenterQuery,
  EntThreatDetection, EntThreatDetectionCreate, EntThreatDetectionUpdate, EntThreatDetectionQuery,
  EntSecurityAudit, EntSecurityAuditCreate, EntSecurityAuditUpdate, EntSecurityAuditQuery,
  EntFirewallRule, EntFirewallRuleCreate, EntFirewallRuleUpdate, EntFirewallRuleQuery,
  EntIpWhitelist, EntIpWhitelistCreate, EntIpWhitelistUpdate, EntIpWhitelistQuery,
  EntEncryptionKey, EntEncryptionKeyCreate, EntEncryptionKeyUpdate, EntEncryptionKeyQuery,
  EntSecurityIncident, EntSecurityIncidentCreate, EntSecurityIncidentUpdate, EntSecurityIncidentQuery,
  EntVulnerabilityScan, EntVulnerabilityScanCreate, EntVulnerabilityScanUpdate, EntVulnerabilityScanQuery,
  EntAccessLog, EntAccessLogCreate, EntAccessLogUpdate, EntAccessLogQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 8: High Availability & Disaster Recovery
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntFailoverConfig, EntFailoverConfigCreate, EntFailoverConfigUpdate, EntFailoverConfigQuery,
  EntFailoverEvent, EntFailoverEventCreate, EntFailoverEventUpdate, EntFailoverEventQuery,
  EntReplication, EntReplicationCreate, EntReplicationUpdate, EntReplicationQuery,
  EntGeoReplication, EntGeoReplicationCreate, EntGeoReplicationUpdate, EntGeoReplicationQuery,
  EntHealthCheck, EntHealthCheckCreate, EntHealthCheckUpdate, EntHealthCheckQuery,
  EntHealthStatus, EntHealthStatusCreate, EntHealthStatusUpdate, EntHealthStatusQuery,
  EntAutoRecovery, EntAutoRecoveryCreate, EntAutoRecoveryUpdate, EntAutoRecoveryQuery,
  EntRecoveryAttempt, EntRecoveryAttemptCreate, EntRecoveryAttemptUpdate, EntRecoveryAttemptQuery,
  EntBackupSchedule, EntBackupScheduleCreate, EntBackupScheduleUpdate, EntBackupScheduleQuery,
  EntBackupJob, EntBackupJobCreate, EntBackupJobUpdate, EntBackupJobQuery,
  EntDisasterRecoveryPlan, EntDisasterRecoveryPlanCreate, EntDisasterRecoveryPlanUpdate, EntDisasterRecoveryPlanQuery,
  EntDisasterRecoveryTest, EntDisasterRecoveryTestCreate, EntDisasterRecoveryTestUpdate, EntDisasterRecoveryTestQuery,
  EntRegionConfig, EntRegionConfigCreate, EntRegionConfigUpdate, EntRegionConfigQuery,
  EntLoadBalancer, EntLoadBalancerCreate, EntLoadBalancerUpdate, EntLoadBalancerQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 9: Data Lake & Governance
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntDataLake, EntDataLakeCreate, EntDataLakeUpdate, EntDataLakeQuery,
  EntDataLakeDataset, EntDataLakeDatasetCreate, EntDataLakeDatasetUpdate, EntDataLakeDatasetQuery,
  EntDataArchive, EntDataArchiveCreate, EntDataArchiveUpdate, EntDataArchiveQuery,
  EntDataSnapshot, EntDataSnapshotCreate, EntDataSnapshotUpdate, EntDataSnapshotQuery,
  EntHistoricalStorage, EntHistoricalStorageCreate, EntHistoricalStorageUpdate, EntHistoricalStorageQuery,
  EntDataGovernance, EntDataGovernanceCreate, EntDataGovernanceUpdate, EntDataGovernanceQuery,
  EntDataLineage, EntDataLineageCreate, EntDataLineageUpdate, EntDataLineageQuery,
  EntMetadataCatalog, EntMetadataCatalogCreate, EntMetadataCatalogUpdate, EntMetadataCatalogQuery,
  EntDataQuality, EntDataQualityCreate, EntDataQualityUpdate, EntDataQualityQuery,
  EntDataPipeline, EntDataPipelineCreate, EntDataPipelineUpdate, EntDataPipelineQuery,
  EntDataRetention, EntDataRetentionCreate, EntDataRetentionUpdate, EntDataRetentionQuery,
  EntDataClassification, EntDataClassificationCreate, EntDataClassificationUpdate, EntDataClassificationQuery,
  EntDataEncryption, EntDataEncryptionCreate, EntDataEncryptionUpdate, EntDataEncryptionQuery,
  EntDataAccessPolicy, EntDataAccessPolicyCreate, EntDataAccessPolicyUpdate, EntDataAccessPolicyQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 10: CI/CD & DevOps
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntCiPipeline, EntCiPipelineCreate, EntCiPipelineUpdate, EntCiPipelineQuery,
  EntCiRun, EntCiRunCreate, EntCiRunUpdate, EntCiRunQuery,
  EntQualityGate, EntQualityGateCreate, EntQualityGateUpdate, EntQualityGateQuery,
  EntQualityGateResult, EntQualityGateResultCreate, EntQualityGateResultUpdate, EntQualityGateResultQuery,
  EntReleaseNote, EntReleaseNoteCreate, EntReleaseNoteUpdate, EntReleaseNoteQuery,
  EntBuildDashboard, EntBuildDashboardCreate, EntBuildDashboardUpdate, EntBuildDashboardQuery,
  EntTestDashboard, EntTestDashboardCreate, EntTestDashboardUpdate, EntTestDashboardQuery,
  EntCoverageDashboard, EntCoverageDashboardCreate, EntCoverageDashboardUpdate, EntCoverageDashboardQuery,
  EntCodeReview, EntCodeReviewCreate, EntCodeReviewUpdate, EntCodeReviewQuery,
  EntSecurityScan, EntSecurityScanCreate, EntSecurityScanUpdate, EntSecurityScanQuery,
  EntDependencyScan, EntDependencyScanCreate, EntDependencyScanUpdate, EntDependencyScanQuery,
  EntInfrastructureCode, EntInfrastructureCodeCreate, EntInfrastructureCodeUpdate, EntInfrastructureCodeQuery,
  EntContainerImage, EntContainerImageCreate, EntContainerImageUpdate, EntContainerImageQuery,
  EntHelmChart, EntHelmChartCreate, EntHelmChartUpdate, EntHelmChartQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 11: SDK & Developer Platform
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntSdk, EntSdkCreate, EntSdkUpdate, EntSdkQuery,
  EntSdkRelease, EntSdkReleaseCreate, EntSdkReleaseUpdate, EntSdkReleaseQuery,
  EntCli, EntCliCreate, EntCliUpdate, EntCliQuery,
  EntApiDocumentation, EntApiDocumentationCreate, EntApiDocumentationUpdate, EntApiDocumentationQuery,
  EntOpenApiSpec, EntOpenApiSpecCreate, EntOpenApiSpecUpdate, EntOpenApiSpecQuery,
  EntGraphqlSchema, EntGraphqlSchemaCreate, EntGraphqlSchemaUpdate, EntGraphqlSchemaQuery,
  EntDeveloperPortal, EntDeveloperPortalCreate, EntDeveloperPortalUpdate, EntDeveloperPortalQuery,
  EntDeveloperApp, EntDeveloperAppCreate, EntDeveloperAppUpdate, EntDeveloperAppQuery,
  EntSandbox, EntSandboxCreate, EntSandboxUpdate, EntSandboxQuery,
  EntSandboxInstance, EntSandboxInstanceCreate, EntSandboxInstanceUpdate, EntSandboxInstanceQuery,
  EntApiUsage, EntApiUsageCreate, EntApiUsageUpdate, EntApiUsageQuery,
  EntWebhook, EntWebhookCreate, EntWebhookUpdate, EntWebhookQuery,
  EntDeveloperDocumentation, EntDeveloperDocumentationCreate, EntDeveloperDocumentationUpdate, EntDeveloperDocumentationQuery,
  EntSdkExample, EntSdkExampleCreate, EntSdkExampleUpdate, EntSdkExampleQuery,
  EntRateLimit, EntRateLimitCreate, EntRateLimitUpdate, EntRateLimitQuery,
  EntOauthApp, EntOauthAppCreate, EntOauthAppUpdate, EntOauthAppQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 12: Production Readiness
// ═══════════════════════════════════════════════════════════════════════════════
import type {
  EntProductionHealthCheck, EntProductionHealthCheckCreate, EntProductionHealthCheckUpdate, EntProductionHealthCheckQuery,
  EntDiagnosticRun, EntDiagnosticRunCreate, EntDiagnosticRunUpdate, EntDiagnosticRunQuery,
  EntProductionAudit, EntProductionAuditCreate, EntProductionAuditUpdate, EntProductionAuditQuery,
  EntPerformanceBenchmark, EntPerformanceBenchmarkCreate, EntPerformanceBenchmarkUpdate, EntPerformanceBenchmarkQuery,
  EntSecurityBenchmark, EntSecurityBenchmarkCreate, EntSecurityBenchmarkUpdate, EntSecurityBenchmarkQuery,
  EntScalabilityBenchmark, EntScalabilityBenchmarkCreate, EntScalabilityBenchmarkUpdate, EntScalabilityBenchmarkQuery,
  EntCompatibilityMatrix, EntCompatibilityMatrixCreate, EntCompatibilityMatrixUpdate, EntCompatibilityMatrixQuery,
  EntProductionCertificate, EntProductionCertificateCreate, EntProductionCertificateUpdate, EntProductionCertificateQuery,
  EntLoadTest, EntLoadTestCreate, EntLoadTestUpdate, EntLoadTestQuery,
  EntStressTest, EntStressTestCreate, EntStressTestUpdate, EntStressTestQuery,
  EntEnduranceTest, EntEnduranceTestCreate, EntEnduranceTestUpdate, EntEnduranceTestQuery,
  EntCapacityPlan, EntCapacityPlanCreate, EntCapacityPlanUpdate, EntCapacityPlanQuery,
  EntProductionRunbook, EntProductionRunbookCreate, EntProductionRunbookUpdate, EntProductionRunbookQuery,
  EntIncidentPostmortem, EntIncidentPostmortemCreate, EntIncidentPostmortemUpdate, EntIncidentPostmortemQuery,
  EntProductionChecklist, EntProductionChecklistCreate, EntProductionChecklistUpdate, EntProductionChecklistQuery,
  EntGoLiveApproval, EntGoLiveApprovalCreate, EntGoLiveApprovalUpdate, EntGoLiveApprovalQuery,
} from '@educi/types';

// ═══════════════════════════════════════════════════════════════════════════════
// Module 1: Global Administration - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntGlobalAdministrationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntGlobalAdministration | null>;
  findAll(schoolId: string, query?: EntGlobalAdministrationQuery): Promise<EntGlobalAdministration[]>;
  create(schoolId: string, data: EntGlobalAdministrationCreate): Promise<EntGlobalAdministration>;
  update(schoolId: string, id: string, data: EntGlobalAdministrationUpdate): Promise<EntGlobalAdministration>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntGlobalAdministrationQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntGlobalAdministration | null>;
  findActive(schoolId: string): Promise<EntGlobalAdministration[]>;
  findByStatus(schoolId: string, status: string): Promise<EntGlobalAdministration[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<EntGlobalAdministration>;
}

export interface EntPlatformSettingRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPlatformSetting | null>;
  findAll(schoolId: string, query?: EntPlatformSettingQuery): Promise<EntPlatformSetting[]>;
  create(schoolId: string, data: EntPlatformSettingCreate): Promise<EntPlatformSetting>;
  update(schoolId: string, id: string, data: EntPlatformSettingUpdate): Promise<EntPlatformSetting>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPlatformSettingQuery): Promise<number>;
  findByKey(schoolId: string, key: string): Promise<EntPlatformSetting | null>;
  findPublic(schoolId: string): Promise<EntPlatformSetting[]>;
  findByCategory(schoolId: string, category: string): Promise<EntPlatformSetting[]>;
  upsertByKey(schoolId: string, key: string, value: string): Promise<EntPlatformSetting>;
}

export interface EntEnvironmentConfigRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntEnvironmentConfig | null>;
  findAll(schoolId: string, query?: EntEnvironmentConfigQuery): Promise<EntEnvironmentConfig[]>;
  create(schoolId: string, data: EntEnvironmentConfigCreate): Promise<EntEnvironmentConfig>;
  update(schoolId: string, id: string, data: EntEnvironmentConfigUpdate): Promise<EntEnvironmentConfig>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntEnvironmentConfigQuery): Promise<number>;
  findByEnvironment(schoolId: string, environment: string): Promise<EntEnvironmentConfig[]>;
  findActive(schoolId: string): Promise<EntEnvironmentConfig[]>;
  findByKey(schoolId: string, key: string): Promise<EntEnvironmentConfig | null>;
  promote(schoolId: string, id: string, targetEnvironment: string): Promise<EntEnvironmentConfig>;
}

export interface EntFeatureFlagRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntFeatureFlag | null>;
  findAll(schoolId: string, query?: EntFeatureFlagQuery): Promise<EntFeatureFlag[]>;
  create(schoolId: string, data: EntFeatureFlagCreate): Promise<EntFeatureFlag>;
  update(schoolId: string, id: string, data: EntFeatureFlagUpdate): Promise<EntFeatureFlag>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntFeatureFlagQuery): Promise<number>;
  findByKey(schoolId: string, key: string): Promise<EntFeatureFlag | null>;
  findEnabled(schoolId: string): Promise<EntFeatureFlag[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<EntFeatureFlag>;
  findByTenant(schoolId: string, tenantId: string): Promise<EntFeatureFlag[]>;
}

export interface EntModuleRegistryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntModuleRegistry | null>;
  findAll(schoolId: string, query?: EntModuleRegistryQuery): Promise<EntModuleRegistry[]>;
  create(schoolId: string, data: EntModuleRegistryCreate): Promise<EntModuleRegistry>;
  update(schoolId: string, id: string, data: EntModuleRegistryUpdate): Promise<EntModuleRegistry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntModuleRegistryQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntModuleRegistry | null>;
  findActive(schoolId: string): Promise<EntModuleRegistry[]>;
  findByCategory(schoolId: string, category: string): Promise<EntModuleRegistry[]>;
  enable(schoolId: string, id: string): Promise<EntModuleRegistry>;
}

export interface EntVersionRegistryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntVersionRegistry | null>;
  findAll(schoolId: string, query?: EntVersionRegistryQuery): Promise<EntVersionRegistry[]>;
  create(schoolId: string, data: EntVersionRegistryCreate): Promise<EntVersionRegistry>;
  update(schoolId: string, id: string, data: EntVersionRegistryUpdate): Promise<EntVersionRegistry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntVersionRegistryQuery): Promise<number>;
  findByVersion(schoolId: string, version: string): Promise<EntVersionRegistry | null>;
  findLatest(schoolId: string): Promise<EntVersionRegistry | null>;
  findByModule(schoolId: string, moduleId: string): Promise<EntVersionRegistry[]>;
  setLatest(schoolId: string, id: string): Promise<void>;
}

export interface EntTenantRegistryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantRegistry | null>;
  findAll(schoolId: string, query?: EntTenantRegistryQuery): Promise<EntTenantRegistry[]>;
  create(schoolId: string, data: EntTenantRegistryCreate): Promise<EntTenantRegistry>;
  update(schoolId: string, id: string, data: EntTenantRegistryUpdate): Promise<EntTenantRegistry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantRegistryQuery): Promise<number>;
  findBySubdomain(schoolId: string, subdomain: string): Promise<EntTenantRegistry | null>;
  findActive(schoolId: string): Promise<EntTenantRegistry[]>;
  findByPlan(schoolId: string, plan: string): Promise<EntTenantRegistry[]>;
  suspend(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface EntLicenseRegistryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntLicenseRegistry | null>;
  findAll(schoolId: string, query?: EntLicenseRegistryQuery): Promise<EntLicenseRegistry[]>;
  create(schoolId: string, data: EntLicenseRegistryCreate): Promise<EntLicenseRegistry>;
  update(schoolId: string, id: string, data: EntLicenseRegistryUpdate): Promise<EntLicenseRegistry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntLicenseRegistryQuery): Promise<number>;
  findByKey(schoolId: string, key: string): Promise<EntLicenseRegistry | null>;
  findActive(schoolId: string): Promise<EntLicenseRegistry[]>;
  findByTenant(schoolId: string, tenantId: string): Promise<EntLicenseRegistry[]>;
  revoke(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface EntDeploymentRegistryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDeploymentRegistry | null>;
  findAll(schoolId: string, query?: EntDeploymentRegistryQuery): Promise<EntDeploymentRegistry[]>;
  create(schoolId: string, data: EntDeploymentRegistryCreate): Promise<EntDeploymentRegistry>;
  update(schoolId: string, id: string, data: EntDeploymentRegistryUpdate): Promise<EntDeploymentRegistry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDeploymentRegistryQuery): Promise<number>;
  findByVersion(schoolId: string, version: string): Promise<EntDeploymentRegistry | null>;
  findActive(schoolId: string): Promise<EntDeploymentRegistry[]>;
  findByEnvironment(schoolId: string, environment: string): Promise<EntDeploymentRegistry[]>;
  rollback(schoolId: string, id: string): Promise<void>;
}

export interface EntPlatformDashboardRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPlatformDashboard | null>;
  findAll(schoolId: string, query?: EntPlatformDashboardQuery): Promise<EntPlatformDashboard[]>;
  create(schoolId: string, data: EntPlatformDashboardCreate): Promise<EntPlatformDashboard>;
  update(schoolId: string, id: string, data: EntPlatformDashboardUpdate): Promise<EntPlatformDashboard>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPlatformDashboardQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntPlatformDashboard | null>;
  findDefault(schoolId: string): Promise<EntPlatformDashboard | null>;
  findByOwner(schoolId: string, ownerId: string): Promise<EntPlatformDashboard[]>;
  setDefault(schoolId: string, id: string): Promise<void>;
}

export interface EntPlatformMetricRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPlatformMetric | null>;
  findAll(schoolId: string, query?: EntPlatformMetricQuery): Promise<EntPlatformMetric[]>;
  create(schoolId: string, data: EntPlatformMetricCreate): Promise<EntPlatformMetric>;
  update(schoolId: string, id: string, data: EntPlatformMetricUpdate): Promise<EntPlatformMetric>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPlatformMetricQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntPlatformMetric | null>;
  findByCategory(schoolId: string, category: string): Promise<EntPlatformMetric[]>;
  findLatest(schoolId: string, name: string): Promise<EntPlatformMetric | null>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntPlatformMetric[]>;
}

export interface EntPlatformAlertRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPlatformAlert | null>;
  findAll(schoolId: string, query?: EntPlatformAlertQuery): Promise<EntPlatformAlert[]>;
  create(schoolId: string, data: EntPlatformAlertCreate): Promise<EntPlatformAlert>;
  update(schoolId: string, id: string, data: EntPlatformAlertUpdate): Promise<EntPlatformAlert>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPlatformAlertQuery): Promise<number>;
  findActive(schoolId: string): Promise<EntPlatformAlert[]>;
  findBySeverity(schoolId: string, severity: string): Promise<EntPlatformAlert[]>;
  acknowledge(schoolId: string, id: string, userId: string): Promise<void>;
  resolve(schoolId: string, id: string): Promise<void>;
}

export interface EntPlatformAuditRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPlatformAudit | null>;
  findAll(schoolId: string, query?: EntPlatformAuditQuery): Promise<EntPlatformAudit[]>;
  create(schoolId: string, data: EntPlatformAuditCreate): Promise<EntPlatformAudit>;
  update(schoolId: string, id: string, data: EntPlatformAuditUpdate): Promise<EntPlatformAudit>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPlatformAuditQuery): Promise<number>;
  findByAction(schoolId: string, action: string): Promise<EntPlatformAudit[]>;
  findByEntityType(schoolId: string, entityType: string): Promise<EntPlatformAudit[]>;
  findByUser(schoolId: string, userId: string): Promise<EntPlatformAudit[]>;
  findByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformAudit[]>;
}

export interface EntPlatformBackupRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPlatformBackup | null>;
  findAll(schoolId: string, query?: EntPlatformBackupQuery): Promise<EntPlatformBackup[]>;
  create(schoolId: string, data: EntPlatformBackupCreate): Promise<EntPlatformBackup>;
  update(schoolId: string, id: string, data: EntPlatformBackupUpdate): Promise<EntPlatformBackup>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPlatformBackupQuery): Promise<number>;
  findLatest(schoolId: string): Promise<EntPlatformBackup | null>;
  findByStatus(schoolId: string, status: string): Promise<EntPlatformBackup[]>;
  restore(schoolId: string, id: string): Promise<void>;
  schedule(schoolId: string, cronExpression: string): Promise<EntPlatformBackup>;
}

export interface EntPlatformEventRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPlatformEvent | null>;
  findAll(schoolId: string, query?: EntPlatformEventQuery): Promise<EntPlatformEvent[]>;
  create(schoolId: string, data: EntPlatformEventCreate): Promise<EntPlatformEvent>;
  update(schoolId: string, id: string, data: EntPlatformEventUpdate): Promise<EntPlatformEvent>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPlatformEventQuery): Promise<number>;
  findByType(schoolId: string, type: string): Promise<EntPlatformEvent[]>;
  findBySource(schoolId: string, source: string): Promise<EntPlatformEvent[]>;
  findByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformEvent[]>;
  findRecent(schoolId: string, limit: number): Promise<EntPlatformEvent[]>;
}

export interface EntPlatformConfigRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPlatformConfig | null>;
  findAll(schoolId: string, query?: EntPlatformConfigQuery): Promise<EntPlatformConfig[]>;
  create(schoolId: string, data: EntPlatformConfigCreate): Promise<EntPlatformConfig>;
  update(schoolId: string, id: string, data: EntPlatformConfigUpdate): Promise<EntPlatformConfig>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPlatformConfigQuery): Promise<number>;
  findByKey(schoolId: string, key: string): Promise<EntPlatformConfig | null>;
  findByNamespace(schoolId: string, namespace: string): Promise<EntPlatformConfig[]>;
  findActive(schoolId: string): Promise<EntPlatformConfig[]>;
  upsertByKey(schoolId: string, key: string, value: string): Promise<EntPlatformConfig>;
}

export interface EntPlatformWebhookRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPlatformWebhook | null>;
  findAll(schoolId: string, query?: EntPlatformWebhookQuery): Promise<EntPlatformWebhook[]>;
  create(schoolId: string, data: EntPlatformWebhookCreate): Promise<EntPlatformWebhook>;
  update(schoolId: string, id: string, data: EntPlatformWebhookUpdate): Promise<EntPlatformWebhook>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPlatformWebhookQuery): Promise<number>;
  findByEvent(schoolId: string, event: string): Promise<EntPlatformWebhook[]>;
  findActive(schoolId: string): Promise<EntPlatformWebhook[]>;
  findByUrl(schoolId: string, url: string): Promise<EntPlatformWebhook | null>;
  toggle(schoolId: string, id: string, active: boolean): Promise<EntPlatformWebhook>;
}

export interface EntPlatformApiKeyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPlatformApiKey | null>;
  findAll(schoolId: string, query?: EntPlatformApiKeyQuery): Promise<EntPlatformApiKey[]>;
  create(schoolId: string, data: EntPlatformApiKeyCreate): Promise<EntPlatformApiKey>;
  update(schoolId: string, id: string, data: EntPlatformApiKeyUpdate): Promise<EntPlatformApiKey>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPlatformApiKeyQuery): Promise<number>;
  findByKey(schoolId: string, key: string): Promise<EntPlatformApiKey | null>;
  findActive(schoolId: string): Promise<EntPlatformApiKey[]>;
  findByOwner(schoolId: string, ownerId: string): Promise<EntPlatformApiKey[]>;
  revoke(schoolId: string, id: string): Promise<void>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 2: Tenant Management - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntTenantRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenant | null>;
  findAll(schoolId: string, query?: EntTenantQuery): Promise<EntTenant[]>;
  create(schoolId: string, data: EntTenantCreate): Promise<EntTenant>;
  update(schoolId: string, id: string, data: EntTenantUpdate): Promise<EntTenant>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantQuery): Promise<number>;
  findBySubdomain(schoolId: string, subdomain: string): Promise<EntTenant | null>;
  findActive(schoolId: string): Promise<EntTenant[]>;
  findByPlan(schoolId: string, plan: string): Promise<EntTenant[]>;
  suspend(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface EntTenantIsolationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantIsolation | null>;
  findAll(schoolId: string, query?: EntTenantIsolationQuery): Promise<EntTenantIsolation[]>;
  create(schoolId: string, data: EntTenantIsolationCreate): Promise<EntTenantIsolation>;
  update(schoolId: string, id: string, data: EntTenantIsolationUpdate): Promise<EntTenantIsolation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantIsolationQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantIsolation | null>;
  findByType(schoolId: string, type: string): Promise<EntTenantIsolation[]>;
  findActive(schoolId: string): Promise<EntTenantIsolation[]>;
  validate(schoolId: string, id: string): Promise<boolean>;
}

export interface EntTenantMigrationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantMigration | null>;
  findAll(schoolId: string, query?: EntTenantMigrationQuery): Promise<EntTenantMigration[]>;
  create(schoolId: string, data: EntTenantMigrationCreate): Promise<EntTenantMigration>;
  update(schoolId: string, id: string, data: EntTenantMigrationUpdate): Promise<EntTenantMigration>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantMigrationQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantMigration[]>;
  findRunning(schoolId: string): Promise<EntTenantMigration[]>;
  findByStatus(schoolId: string, status: string): Promise<EntTenantMigration[]>;
  cancel(schoolId: string, id: string): Promise<void>;
}

export interface EntTenantBackupConfigRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantBackupConfig | null>;
  findAll(schoolId: string, query?: EntTenantBackupConfigQuery): Promise<EntTenantBackupConfig[]>;
  create(schoolId: string, data: EntTenantBackupConfigCreate): Promise<EntTenantBackupConfig>;
  update(schoolId: string, id: string, data: EntTenantBackupConfigUpdate): Promise<EntTenantBackupConfig>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantBackupConfigQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantBackupConfig | null>;
  findActive(schoolId: string): Promise<EntTenantBackupConfig[]>;
  findBySchedule(schoolId: string, schedule: string): Promise<EntTenantBackupConfig[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<EntTenantBackupConfig>;
}

export interface EntTenantRestoreRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantRestore | null>;
  findAll(schoolId: string, query?: EntTenantRestoreQuery): Promise<EntTenantRestore[]>;
  create(schoolId: string, data: EntTenantRestoreCreate): Promise<EntTenantRestore>;
  update(schoolId: string, id: string, data: EntTenantRestoreUpdate): Promise<EntTenantRestore>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantRestoreQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantRestore[]>;
  findRunning(schoolId: string): Promise<EntTenantRestore[]>;
  findByStatus(schoolId: string, status: string): Promise<EntTenantRestore[]>;
  cancel(schoolId: string, id: string): Promise<void>;
}

export interface EntTenantArchiveRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantArchive | null>;
  findAll(schoolId: string, query?: EntTenantArchiveQuery): Promise<EntTenantArchive[]>;
  create(schoolId: string, data: EntTenantArchiveCreate): Promise<EntTenantArchive>;
  update(schoolId: string, id: string, data: EntTenantArchiveUpdate): Promise<EntTenantArchive>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantArchiveQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantArchive | null>;
  findExpired(schoolId: string): Promise<EntTenantArchive[]>;
  restore(schoolId: string, id: string): Promise<void>;
  findByStatus(schoolId: string, status: string): Promise<EntTenantArchive[]>;
}

export interface EntTenantCloneRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantClone | null>;
  findAll(schoolId: string, query?: EntTenantCloneQuery): Promise<EntTenantClone[]>;
  create(schoolId: string, data: EntTenantCloneCreate): Promise<EntTenantClone>;
  update(schoolId: string, id: string, data: EntTenantCloneUpdate): Promise<EntTenantClone>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantCloneQuery): Promise<number>;
  findBySourceTenant(schoolId: string, sourceTenantId: string): Promise<EntTenantClone[]>;
  findRunning(schoolId: string): Promise<EntTenantClone[]>;
  findByStatus(schoolId: string, status: string): Promise<EntTenantClone[]>;
  cancel(schoolId: string, id: string): Promise<void>;
}

export interface EntTenantMergeRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantMerge | null>;
  findAll(schoolId: string, query?: EntTenantMergeQuery): Promise<EntTenantMerge[]>;
  create(schoolId: string, data: EntTenantMergeCreate): Promise<EntTenantMerge>;
  update(schoolId: string, id: string, data: EntTenantMergeUpdate): Promise<EntTenantMerge>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantMergeQuery): Promise<number>;
  findByTargetTenant(schoolId: string, targetTenantId: string): Promise<EntTenantMerge[]>;
  findRunning(schoolId: string): Promise<EntTenantMerge[]>;
  findByStatus(schoolId: string, status: string): Promise<EntTenantMerge[]>;
  cancel(schoolId: string, id: string): Promise<void>;
}

export interface EntTenantSplitRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantSplit | null>;
  findAll(schoolId: string, query?: EntTenantSplitQuery): Promise<EntTenantSplit[]>;
  create(schoolId: string, data: EntTenantSplitCreate): Promise<EntTenantSplit>;
  update(schoolId: string, id: string, data: EntTenantSplitUpdate): Promise<EntTenantSplit>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantSplitQuery): Promise<number>;
  findBySourceTenant(schoolId: string, sourceTenantId: string): Promise<EntTenantSplit[]>;
  findRunning(schoolId: string): Promise<EntTenantSplit[]>;
  findByStatus(schoolId: string, status: string): Promise<EntTenantSplit[]>;
  cancel(schoolId: string, id: string): Promise<void>;
}

export interface EntTenantMonitoringRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantMonitoring | null>;
  findAll(schoolId: string, query?: EntTenantMonitoringQuery): Promise<EntTenantMonitoring[]>;
  create(schoolId: string, data: EntTenantMonitoringCreate): Promise<EntTenantMonitoring>;
  update(schoolId: string, id: string, data: EntTenantMonitoringUpdate): Promise<EntTenantMonitoring>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantMonitoringQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantMonitoring | null>;
  findActive(schoolId: string): Promise<EntTenantMonitoring[]>;
  findByMetric(schoolId: string, metric: string): Promise<EntTenantMonitoring[]>;
  findAlerts(schoolId: string, tenantId: string): Promise<EntTenantMonitoring[]>;
}

export interface EntTenantAnalyticsRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantAnalytics | null>;
  findAll(schoolId: string, query?: EntTenantAnalyticsQuery): Promise<EntTenantAnalytics[]>;
  create(schoolId: string, data: EntTenantAnalyticsCreate): Promise<EntTenantAnalytics>;
  update(schoolId: string, id: string, data: EntTenantAnalyticsUpdate): Promise<EntTenantAnalytics>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantAnalyticsQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantAnalytics | null>;
  findByPeriod(schoolId: string, period: string): Promise<EntTenantAnalytics[]>;
  findLatest(schoolId: string, tenantId: string): Promise<EntTenantAnalytics | null>;
  findByMetric(schoolId: string, metric: string): Promise<EntTenantAnalytics[]>;
}

export interface EntTenantQuotaRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantQuota | null>;
  findAll(schoolId: string, query?: EntTenantQuotaQuery): Promise<EntTenantQuota[]>;
  create(schoolId: string, data: EntTenantQuotaCreate): Promise<EntTenantQuota>;
  update(schoolId: string, id: string, data: EntTenantQuotaUpdate): Promise<EntTenantQuota>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantQuotaQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantQuota[]>;
  findByType(schoolId: string, type: string): Promise<EntTenantQuota | null>;
  incrementUsage(schoolId: string, id: string, amount: number): Promise<void>;
  checkLimit(schoolId: string, tenantId: string, type: string): Promise<boolean>;
}

export interface EntTenantBillingRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantBilling | null>;
  findAll(schoolId: string, query?: EntTenantBillingQuery): Promise<EntTenantBilling[]>;
  create(schoolId: string, data: EntTenantBillingCreate): Promise<EntTenantBilling>;
  update(schoolId: string, id: string, data: EntTenantBillingUpdate): Promise<EntTenantBilling>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantBillingQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantBilling | null>;
  findPending(schoolId: string): Promise<EntTenantBilling[]>;
  markPaid(schoolId: string, id: string): Promise<void>;
  findByPeriod(schoolId: string, period: string): Promise<EntTenantBilling[]>;
}

export interface EntTenantFeatureRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantFeature | null>;
  findAll(schoolId: string, query?: EntTenantFeatureQuery): Promise<EntTenantFeature[]>;
  create(schoolId: string, data: EntTenantFeatureCreate): Promise<EntTenantFeature>;
  update(schoolId: string, id: string, data: EntTenantFeatureUpdate): Promise<EntTenantFeature>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantFeatureQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantFeature[]>;
  findByFeatureKey(schoolId: string, featureKey: string): Promise<EntTenantFeature[]>;
  isEnabled(schoolId: string, tenantId: string, featureKey: string): Promise<boolean>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
}

export interface EntTenantSsoRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantSso | null>;
  findAll(schoolId: string, query?: EntTenantSsoQuery): Promise<EntTenantSso[]>;
  create(schoolId: string, data: EntTenantSsoCreate): Promise<EntTenantSso>;
  update(schoolId: string, id: string, data: EntTenantSsoUpdate): Promise<EntTenantSso>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantSsoQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantSso | null>;
  findByProvider(schoolId: string, provider: string): Promise<EntTenantSso | null>;
  findActive(schoolId: string): Promise<EntTenantSso[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
}

export interface EntTenantCustomDomainRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTenantCustomDomain | null>;
  findAll(schoolId: string, query?: EntTenantCustomDomainQuery): Promise<EntTenantCustomDomain[]>;
  create(schoolId: string, data: EntTenantCustomDomainCreate): Promise<EntTenantCustomDomain>;
  update(schoolId: string, id: string, data: EntTenantCustomDomainUpdate): Promise<EntTenantCustomDomain>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTenantCustomDomainQuery): Promise<number>;
  findByDomain(schoolId: string, domain: string): Promise<EntTenantCustomDomain | null>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntTenantCustomDomain | null>;
  verify(schoolId: string, id: string): Promise<void>;
  findPending(schoolId: string): Promise<EntTenantCustomDomain[]>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 3: Release Engineering - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntReleasePipelineRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntReleasePipeline | null>;
  findAll(schoolId: string, query?: EntReleasePipelineQuery): Promise<EntReleasePipeline[]>;
  create(schoolId: string, data: EntReleasePipelineCreate): Promise<EntReleasePipeline>;
  update(schoolId: string, id: string, data: EntReleasePipelineUpdate): Promise<EntReleasePipeline>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntReleasePipelineQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntReleasePipeline | null>;
  findActive(schoolId: string): Promise<EntReleasePipeline[]>;
  trigger(schoolId: string, id: string, branch: string): Promise<void>;
  findByEnvironment(schoolId: string, environment: string): Promise<EntReleasePipeline[]>;
}

export interface EntPipelineStageRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPipelineStage | null>;
  findAll(schoolId: string, query?: EntPipelineStageQuery): Promise<EntPipelineStage[]>;
  create(schoolId: string, data: EntPipelineStageCreate): Promise<EntPipelineStage>;
  update(schoolId: string, id: string, data: EntPipelineStageUpdate): Promise<EntPipelineStage>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPipelineStageQuery): Promise<number>;
  findByPipelineId(schoolId: string, pipelineId: string): Promise<EntPipelineStage[]>;
  findActive(schoolId: string): Promise<EntPipelineStage[]>;
  findByType(schoolId: string, type: string): Promise<EntPipelineStage[]>;
  reorder(schoolId: string, pipelineId: string, stageIds: string[]): Promise<void>;
}

export interface EntPipelineRunRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPipelineRun | null>;
  findAll(schoolId: string, query?: EntPipelineRunQuery): Promise<EntPipelineRun[]>;
  create(schoolId: string, data: EntPipelineRunCreate): Promise<EntPipelineRun>;
  update(schoolId: string, id: string, data: EntPipelineRunUpdate): Promise<EntPipelineRun>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPipelineRunQuery): Promise<number>;
  findByPipelineId(schoolId: string, pipelineId: string): Promise<EntPipelineRun[]>;
  findRunning(schoolId: string): Promise<EntPipelineRun[]>;
  findByStatus(schoolId: string, status: string): Promise<EntPipelineRun[]>;
  cancel(schoolId: string, id: string): Promise<void>;
}

export interface EntVersionManagerRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntVersionManager | null>;
  findAll(schoolId: string, query?: EntVersionManagerQuery): Promise<EntVersionManager[]>;
  create(schoolId: string, data: EntVersionManagerCreate): Promise<EntVersionManager>;
  update(schoolId: string, id: string, data: EntVersionManagerUpdate): Promise<EntVersionManager>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntVersionManagerQuery): Promise<number>;
  findByVersion(schoolId: string, version: string): Promise<EntVersionManager | null>;
  findLatest(schoolId: string): Promise<EntVersionManager | null>;
  findByModule(schoolId: string, module: string): Promise<EntVersionManager[]>;
  setLatest(schoolId: string, id: string): Promise<void>;
}

export interface EntBlueGreenDeploymentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntBlueGreenDeployment | null>;
  findAll(schoolId: string, query?: EntBlueGreenDeploymentQuery): Promise<EntBlueGreenDeployment[]>;
  create(schoolId: string, data: EntBlueGreenDeploymentCreate): Promise<EntBlueGreenDeployment>;
  update(schoolId: string, id: string, data: EntBlueGreenDeploymentUpdate): Promise<EntBlueGreenDeployment>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntBlueGreenDeploymentQuery): Promise<number>;
  findActive(schoolId: string): Promise<EntBlueGreenDeployment | null>;
  swap(schoolId: string, id: string): Promise<void>;
  rollback(schoolId: string, id: string): Promise<void>;
  findByStatus(schoolId: string, status: string): Promise<EntBlueGreenDeployment[]>;
}

export interface EntCanaryDeploymentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCanaryDeployment | null>;
  findAll(schoolId: string, query?: EntCanaryDeploymentQuery): Promise<EntCanaryDeployment[]>;
  create(schoolId: string, data: EntCanaryDeploymentCreate): Promise<EntCanaryDeployment>;
  update(schoolId: string, id: string, data: EntCanaryDeploymentUpdate): Promise<EntCanaryDeployment>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCanaryDeploymentQuery): Promise<number>;
  findActive(schoolId: string): Promise<EntCanaryDeployment | null>;
  increaseTraffic(schoolId: string, id: string, percentage: number): Promise<void>;
  rollback(schoolId: string, id: string): Promise<void>;
  findByStatus(schoolId: string, status: string): Promise<EntCanaryDeployment[]>;
}

export interface EntRollbackRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntRollback | null>;
  findAll(schoolId: string, query?: EntRollbackQuery): Promise<EntRollback[]>;
  create(schoolId: string, data: EntRollbackCreate): Promise<EntRollback>;
  update(schoolId: string, id: string, data: EntRollbackUpdate): Promise<EntRollback>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntRollbackQuery): Promise<number>;
  findByDeploymentId(schoolId: string, deploymentId: string): Promise<EntRollback[]>;
  findLatest(schoolId: string): Promise<EntRollback | null>;
  findByStatus(schoolId: string, status: string): Promise<EntRollback[]>;
  execute(schoolId: string, id: string): Promise<void>;
}

export interface EntMigrationManagerRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntMigrationManager | null>;
  findAll(schoolId: string, query?: EntMigrationManagerQuery): Promise<EntMigrationManager[]>;
  create(schoolId: string, data: EntMigrationManagerCreate): Promise<EntMigrationManager>;
  update(schoolId: string, id: string, data: EntMigrationManagerUpdate): Promise<EntMigrationManager>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntMigrationManagerQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntMigrationManager | null>;
  findPending(schoolId: string): Promise<EntMigrationManager[]>;
  findByStatus(schoolId: string, status: string): Promise<EntMigrationManager[]>;
  execute(schoolId: string, id: string): Promise<void>;
}

export interface EntEnvironmentPromotionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntEnvironmentPromotion | null>;
  findAll(schoolId: string, query?: EntEnvironmentPromotionQuery): Promise<EntEnvironmentPromotion[]>;
  create(schoolId: string, data: EntEnvironmentPromotionCreate): Promise<EntEnvironmentPromotion>;
  update(schoolId: string, id: string, data: EntEnvironmentPromotionUpdate): Promise<EntEnvironmentPromotion>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntEnvironmentPromotionQuery): Promise<number>;
  findBySourceEnvironment(schoolId: string, source: string): Promise<EntEnvironmentPromotion[]>;
  findPending(schoolId: string): Promise<EntEnvironmentPromotion[]>;
  approve(schoolId: string, id: string, userId: string): Promise<void>;
  execute(schoolId: string, id: string): Promise<void>;
}

export interface EntDeploymentHistoryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDeploymentHistory | null>;
  findAll(schoolId: string, query?: EntDeploymentHistoryQuery): Promise<EntDeploymentHistory[]>;
  create(schoolId: string, data: EntDeploymentHistoryCreate): Promise<EntDeploymentHistory>;
  update(schoolId: string, id: string, data: EntDeploymentHistoryUpdate): Promise<EntDeploymentHistory>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDeploymentHistoryQuery): Promise<number>;
  findByEnvironment(schoolId: string, environment: string): Promise<EntDeploymentHistory[]>;
  findLatest(schoolId: string, environment: string): Promise<EntDeploymentHistory | null>;
  findByVersion(schoolId: string, version: string): Promise<EntDeploymentHistory[]>;
  findByDateRange(schoolId: string, start: string, end: string): Promise<EntDeploymentHistory[]>;
}

export interface EntFeatureDeploymentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntFeatureDeployment | null>;
  findAll(schoolId: string, query?: EntFeatureDeploymentQuery): Promise<EntFeatureDeployment[]>;
  create(schoolId: string, data: EntFeatureDeploymentCreate): Promise<EntFeatureDeployment>;
  update(schoolId: string, id: string, data: EntFeatureDeploymentUpdate): Promise<EntFeatureDeployment>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntFeatureDeploymentQuery): Promise<number>;
  findByFeatureKey(schoolId: string, featureKey: string): Promise<EntFeatureDeployment[]>;
  findActive(schoolId: string): Promise<EntFeatureDeployment[]>;
  findByEnvironment(schoolId: string, environment: string): Promise<EntFeatureDeployment[]>;
  promote(schoolId: string, id: string, targetEnvironment: string): Promise<void>;
}

export interface EntConfigDeploymentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntConfigDeployment | null>;
  findAll(schoolId: string, query?: EntConfigDeploymentQuery): Promise<EntConfigDeployment[]>;
  create(schoolId: string, data: EntConfigDeploymentCreate): Promise<EntConfigDeployment>;
  update(schoolId: string, id: string, data: EntConfigDeploymentUpdate): Promise<EntConfigDeployment>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntConfigDeploymentQuery): Promise<number>;
  findByNamespace(schoolId: string, namespace: string): Promise<EntConfigDeployment[]>;
  findPending(schoolId: string): Promise<EntConfigDeployment[]>;
  approve(schoolId: string, id: string, userId: string): Promise<void>;
  rollback(schoolId: string, id: string): Promise<void>;
}

export interface EntInfrastructureChangeRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntInfrastructureChange | null>;
  findAll(schoolId: string, query?: EntInfrastructureChangeQuery): Promise<EntInfrastructureChange[]>;
  create(schoolId: string, data: EntInfrastructureChangeCreate): Promise<EntInfrastructureChange>;
  update(schoolId: string, id: string, data: EntInfrastructureChangeUpdate): Promise<EntInfrastructureChange>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntInfrastructureChangeQuery): Promise<number>;
  findByResource(schoolId: string, resource: string): Promise<EntInfrastructureChange[]>;
  findPending(schoolId: string): Promise<EntInfrastructureChange[]>;
  approve(schoolId: string, id: string, userId: string): Promise<void>;
  findByStatus(schoolId: string, status: string): Promise<EntInfrastructureChange[]>;
}

export interface EntDeploymentApprovalRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDeploymentApproval | null>;
  findAll(schoolId: string, query?: EntDeploymentApprovalQuery): Promise<EntDeploymentApproval[]>;
  create(schoolId: string, data: EntDeploymentApprovalCreate): Promise<EntDeploymentApproval>;
  update(schoolId: string, id: string, data: EntDeploymentApprovalUpdate): Promise<EntDeploymentApproval>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDeploymentApprovalQuery): Promise<number>;
  findByDeploymentId(schoolId: string, deploymentId: string): Promise<EntDeploymentApproval[]>;
  findPending(schoolId: string): Promise<EntDeploymentApproval[]>;
  approve(schoolId: string, id: string, userId: string): Promise<void>;
  reject(schoolId: string, id: string, userId: string, reason: string): Promise<void>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 4: Observability - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntDistributedTraceRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDistributedTrace | null>;
  findAll(schoolId: string, query?: EntDistributedTraceQuery): Promise<EntDistributedTrace[]>;
  create(schoolId: string, data: EntDistributedTraceCreate): Promise<EntDistributedTrace>;
  update(schoolId: string, id: string, data: EntDistributedTraceUpdate): Promise<EntDistributedTrace>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDistributedTraceQuery): Promise<number>;
  findByTraceId(schoolId: string, traceId: string): Promise<EntDistributedTrace | null>;
  findByService(schoolId: string, service: string): Promise<EntDistributedTrace[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntDistributedTrace[]>;
  findSlow(schoolId: string, thresholdMs: number): Promise<EntDistributedTrace[]>;
}

export interface EntTraceSpanRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTraceSpan | null>;
  findAll(schoolId: string, query?: EntTraceSpanQuery): Promise<EntTraceSpan[]>;
  create(schoolId: string, data: EntTraceSpanCreate): Promise<EntTraceSpan>;
  update(schoolId: string, id: string, data: EntTraceSpanUpdate): Promise<EntTraceSpan>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTraceSpanQuery): Promise<number>;
  findByTraceId(schoolId: string, traceId: string): Promise<EntTraceSpan[]>;
  findByService(schoolId: string, service: string): Promise<EntTraceSpan[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntTraceSpan[]>;
  findErrors(schoolId: string): Promise<EntTraceSpan[]>;
}

export interface EntStructuredLogRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntStructuredLog | null>;
  findAll(schoolId: string, query?: EntStructuredLogQuery): Promise<EntStructuredLog[]>;
  create(schoolId: string, data: EntStructuredLogCreate): Promise<EntStructuredLog>;
  update(schoolId: string, id: string, data: EntStructuredLogUpdate): Promise<EntStructuredLog>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntStructuredLogQuery): Promise<number>;
  findByLevel(schoolId: string, level: string): Promise<EntStructuredLog[]>;
  findByService(schoolId: string, service: string): Promise<EntStructuredLog[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntStructuredLog[]>;
  search(schoolId: string, searchTerm: string): Promise<EntStructuredLog[]>;
}

export interface EntMetricRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntMetric | null>;
  findAll(schoolId: string, query?: EntMetricQuery): Promise<EntMetric[]>;
  create(schoolId: string, data: EntMetricCreate): Promise<EntMetric>;
  update(schoolId: string, id: string, data: EntMetricUpdate): Promise<EntMetric>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntMetricQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntMetric | null>;
  findByService(schoolId: string, service: string): Promise<EntMetric[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntMetric[]>;
  findLatest(schoolId: string, name: string): Promise<EntMetric | null>;
}

export interface EntPerformanceDashboardRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPerformanceDashboard | null>;
  findAll(schoolId: string, query?: EntPerformanceDashboardQuery): Promise<EntPerformanceDashboard[]>;
  create(schoolId: string, data: EntPerformanceDashboardCreate): Promise<EntPerformanceDashboard>;
  update(schoolId: string, id: string, data: EntPerformanceDashboardUpdate): Promise<EntPerformanceDashboard>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPerformanceDashboardQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntPerformanceDashboard | null>;
  findDefault(schoolId: string): Promise<EntPerformanceDashboard | null>;
  findByOwner(schoolId: string, ownerId: string): Promise<EntPerformanceDashboard[]>;
  setDefault(schoolId: string, id: string): Promise<void>;
}

export interface EntErrorDashboardRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntErrorDashboard | null>;
  findAll(schoolId: string, query?: EntErrorDashboardQuery): Promise<EntErrorDashboard[]>;
  create(schoolId: string, data: EntErrorDashboardCreate): Promise<EntErrorDashboard>;
  update(schoolId: string, id: string, data: EntErrorDashboardUpdate): Promise<EntErrorDashboard>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntErrorDashboardQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntErrorDashboard | null>;
  findByService(schoolId: string, service: string): Promise<EntErrorDashboard[]>;
  findTopErrors(schoolId: string, limit: number): Promise<EntErrorDashboard[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntErrorDashboard[]>;
}

export interface EntSlowQueryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSlowQuery | null>;
  findAll(schoolId: string, query?: EntSlowQueryQuery): Promise<EntSlowQuery[]>;
  create(schoolId: string, data: EntSlowQueryCreate): Promise<EntSlowQuery>;
  update(schoolId: string, id: string, data: EntSlowQueryUpdate): Promise<EntSlowQuery>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSlowQueryQuery): Promise<number>;
  findByDatabase(schoolId: string, database: string): Promise<EntSlowQuery[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntSlowQuery[]>;
  findTopSlow(schoolId: string, limit: number): Promise<EntSlowQuery[]>;
  findByStatus(schoolId: string, status: string): Promise<EntSlowQuery[]>;
}

export interface EntAlertRuleRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntAlertRule | null>;
  findAll(schoolId: string, query?: EntAlertRuleQuery): Promise<EntAlertRule[]>;
  create(schoolId: string, data: EntAlertRuleCreate): Promise<EntAlertRule>;
  update(schoolId: string, id: string, data: EntAlertRuleUpdate): Promise<EntAlertRule>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntAlertRuleQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntAlertRule | null>;
  findActive(schoolId: string): Promise<EntAlertRule[]>;
  findBySeverity(schoolId: string, severity: string): Promise<EntAlertRule[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
}

export interface EntAlertIncidentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntAlertIncident | null>;
  findAll(schoolId: string, query?: EntAlertIncidentQuery): Promise<EntAlertIncident[]>;
  create(schoolId: string, data: EntAlertIncidentCreate): Promise<EntAlertIncident>;
  update(schoolId: string, id: string, data: EntAlertIncidentUpdate): Promise<EntAlertIncident>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntAlertIncidentQuery): Promise<number>;
  findByRuleId(schoolId: string, ruleId: string): Promise<EntAlertIncident[]>;
  findActive(schoolId: string): Promise<EntAlertIncident[]>;
  acknowledge(schoolId: string, id: string, userId: string): Promise<void>;
  resolve(schoolId: string, id: string): Promise<void>;
}

export interface EntSloRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSlo | null>;
  findAll(schoolId: string, query?: EntSloQuery): Promise<EntSlo[]>;
  create(schoolId: string, data: EntSloCreate): Promise<EntSlo>;
  update(schoolId: string, id: string, data: EntSloUpdate): Promise<EntSlo>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSloQuery): Promise<number>;
  findByService(schoolId: string, service: string): Promise<EntSlo[]>;
  findActive(schoolId: string): Promise<EntSlo[]>;
  findBreached(schoolId: string): Promise<EntSlo[]>;
  updateBurnRate(schoolId: string, id: string, burnRate: number): Promise<void>;
}

export interface EntSlaRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSla | null>;
  findAll(schoolId: string, query?: EntSlaQuery): Promise<EntSla[]>;
  create(schoolId: string, data: EntSlaCreate): Promise<EntSla>;
  update(schoolId: string, id: string, data: EntSlaUpdate): Promise<EntSla>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSlaQuery): Promise<number>;
  findByTenantId(schoolId: string, tenantId: string): Promise<EntSla[]>;
  findActive(schoolId: string): Promise<EntSla[]>;
  findBreached(schoolId: string): Promise<EntSla[]>;
  updateCompliance(schoolId: string, id: string, compliance: number): Promise<void>;
}

export interface EntServiceHealthRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntServiceHealth | null>;
  findAll(schoolId: string, query?: EntServiceHealthQuery): Promise<EntServiceHealth[]>;
  create(schoolId: string, data: EntServiceHealthCreate): Promise<EntServiceHealth>;
  update(schoolId: string, id: string, data: EntServiceHealthUpdate): Promise<EntServiceHealth>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntServiceHealthQuery): Promise<number>;
  findByService(schoolId: string, service: string): Promise<EntServiceHealth | null>;
  findUnhealthy(schoolId: string): Promise<EntServiceHealth[]>;
  findRecent(schoolId: string, service: string, limit: number): Promise<EntServiceHealth[]>;
  updateStatus(schoolId: string, service: string, status: string): Promise<void>;
}

export interface EntLogAggregationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntLogAggregation | null>;
  findAll(schoolId: string, query?: EntLogAggregationQuery): Promise<EntLogAggregation[]>;
  create(schoolId: string, data: EntLogAggregationCreate): Promise<EntLogAggregation>;
  update(schoolId: string, id: string, data: EntLogAggregationUpdate): Promise<EntLogAggregation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntLogAggregationQuery): Promise<number>;
  findByService(schoolId: string, service: string): Promise<EntLogAggregation[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntLogAggregation[]>;
  findTopPatterns(schoolId: string, limit: number): Promise<EntLogAggregation[]>;
  aggregate(schoolId: string, service: string, start: string, end: string): Promise<void>;
}

export interface EntMetricsAggregationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntMetricsAggregation | null>;
  findAll(schoolId: string, query?: EntMetricsAggregationQuery): Promise<EntMetricsAggregation[]>;
  create(schoolId: string, data: EntMetricsAggregationCreate): Promise<EntMetricsAggregation>;
  update(schoolId: string, id: string, data: EntMetricsAggregationUpdate): Promise<EntMetricsAggregation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntMetricsAggregationQuery): Promise<number>;
  findByService(schoolId: string, service: string): Promise<EntMetricsAggregation[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntMetricsAggregation[]>;
  findByName(schoolId: string, name: string): Promise<EntMetricsAggregation | null>;
  aggregate(schoolId: string, name: string, start: string, end: string): Promise<void>;
}

export interface EntAlertEscalationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntAlertEscalation | null>;
  findAll(schoolId: string, query?: EntAlertEscalationQuery): Promise<EntAlertEscalation[]>;
  create(schoolId: string, data: EntAlertEscalationCreate): Promise<EntAlertEscalation>;
  update(schoolId: string, id: string, data: EntAlertEscalationUpdate): Promise<EntAlertEscalation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntAlertEscalationQuery): Promise<number>;
  findByIncidentId(schoolId: string, incidentId: string): Promise<EntAlertEscalation[]>;
  findPending(schoolId: string): Promise<EntAlertEscalation[]>;
  findByLevel(schoolId: string, level: number): Promise<EntAlertEscalation[]>;
  escalate(schoolId: string, id: string): Promise<void>;
}

export interface EntPerformanceBaselineRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPerformanceBaseline | null>;
  findAll(schoolId: string, query?: EntPerformanceBaselineQuery): Promise<EntPerformanceBaseline[]>;
  create(schoolId: string, data: EntPerformanceBaselineCreate): Promise<EntPerformanceBaseline>;
  update(schoolId: string, id: string, data: EntPerformanceBaselineUpdate): Promise<EntPerformanceBaseline>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPerformanceBaselineQuery): Promise<number>;
  findByService(schoolId: string, service: string): Promise<EntPerformanceBaseline | null>;
  findActive(schoolId: string): Promise<EntPerformanceBaseline[]>;
  updateBaseline(schoolId: string, id: string, values: Record<string, number>): Promise<void>;
  compareTo(schoolId: string, id: string, values: Record<string, number>): Promise<Record<string, number>>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 5: Cache & Performance - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntRedisClusterRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntRedisCluster | null>;
  findAll(schoolId: string, query?: EntRedisClusterQuery): Promise<EntRedisCluster[]>;
  create(schoolId: string, data: EntRedisClusterCreate): Promise<EntRedisCluster>;
  update(schoolId: string, id: string, data: EntRedisClusterUpdate): Promise<EntRedisCluster>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntRedisClusterQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntRedisCluster | null>;
  findActive(schoolId: string): Promise<EntRedisCluster[]>;
  findByRegion(schoolId: string, region: string): Promise<EntRedisCluster[]>;
  getStats(schoolId: string, id: string): Promise<Record<string, unknown>>;
}

export interface EntCacheLayerRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCacheLayer | null>;
  findAll(schoolId: string, query?: EntCacheLayerQuery): Promise<EntCacheLayer[]>;
  create(schoolId: string, data: EntCacheLayerCreate): Promise<EntCacheLayer>;
  update(schoolId: string, id: string, data: EntCacheLayerUpdate): Promise<EntCacheLayer>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCacheLayerQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntCacheLayer | null>;
  findActive(schoolId: string): Promise<EntCacheLayer[]>;
  findByType(schoolId: string, type: string): Promise<EntCacheLayer[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
}

export interface EntCacheEntryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCacheEntry | null>;
  findAll(schoolId: string, query?: EntCacheEntryQuery): Promise<EntCacheEntry[]>;
  create(schoolId: string, data: EntCacheEntryCreate): Promise<EntCacheEntry>;
  update(schoolId: string, id: string, data: EntCacheEntryUpdate): Promise<EntCacheEntry>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCacheEntryQuery): Promise<number>;
  findByKey(schoolId: string, key: string): Promise<EntCacheEntry | null>;
  findByLayer(schoolId: string, layerId: string): Promise<EntCacheEntry[]>;
  findExpired(schoolId: string): Promise<EntCacheEntry[]>;
  touch(schoolId: string, id: string): Promise<void>;
}

export interface EntDistributedCacheRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDistributedCache | null>;
  findAll(schoolId: string, query?: EntDistributedCacheQuery): Promise<EntDistributedCache[]>;
  create(schoolId: string, data: EntDistributedCacheCreate): Promise<EntDistributedCache>;
  update(schoolId: string, id: string, data: EntDistributedCacheUpdate): Promise<EntDistributedCache>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDistributedCacheQuery): Promise<number>;
  findByKey(schoolId: string, key: string): Promise<EntDistributedCache | null>;
  findByCluster(schoolId: string, clusterId: string): Promise<EntDistributedCache[]>;
  findHot(schoolId: string, limit: number): Promise<EntDistributedCache[]>;
  invalidate(schoolId: string, key: string): Promise<void>;
}

export interface EntQueryCacheRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntQueryCache | null>;
  findAll(schoolId: string, query?: EntQueryCacheQuery): Promise<EntQueryCache[]>;
  create(schoolId: string, data: EntQueryCacheCreate): Promise<EntQueryCache>;
  update(schoolId: string, id: string, data: EntQueryCacheUpdate): Promise<EntQueryCache>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntQueryCacheQuery): Promise<number>;
  findByQueryHash(schoolId: string, queryHash: string): Promise<EntQueryCache | null>;
  findExpired(schoolId: string): Promise<EntQueryCache[]>;
  invalidateByPattern(schoolId: string, pattern: string): Promise<number>;
  getHitRate(schoolId: string, service: string): Promise<number>;
}

export interface EntApiCacheRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntApiCache | null>;
  findAll(schoolId: string, query?: EntApiCacheQuery): Promise<EntApiCache[]>;
  create(schoolId: string, data: EntApiCacheCreate): Promise<EntApiCache>;
  update(schoolId: string, id: string, data: EntApiCacheUpdate): Promise<EntApiCache>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntApiCacheQuery): Promise<number>;
  findByEndpoint(schoolId: string, endpoint: string): Promise<EntApiCache | null>;
  findActive(schoolId: string): Promise<EntApiCache[]>;
  findByMethod(schoolId: string, method: string): Promise<EntApiCache[]>;
  invalidateEndpoint(schoolId: string, endpoint: string): Promise<void>;
}

export interface EntCacheInvalidationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCacheInvalidation | null>;
  findAll(schoolId: string, query?: EntCacheInvalidationQuery): Promise<EntCacheInvalidation[]>;
  create(schoolId: string, data: EntCacheInvalidationCreate): Promise<EntCacheInvalidation>;
  update(schoolId: string, id: string, data: EntCacheInvalidationUpdate): Promise<EntCacheInvalidation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCacheInvalidationQuery): Promise<number>;
  findByKey(schoolId: string, key: string): Promise<EntCacheInvalidation | null>;
  findPending(schoolId: string): Promise<EntCacheInvalidation[]>;
  findByStatus(schoolId: string, status: string): Promise<EntCacheInvalidation[]>;
  process(schoolId: string, id: string): Promise<void>;
}

export interface EntCacheMetricsRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCacheMetrics | null>;
  findAll(schoolId: string, query?: EntCacheMetricsQuery): Promise<EntCacheMetrics[]>;
  create(schoolId: string, data: EntCacheMetricsCreate): Promise<EntCacheMetrics>;
  update(schoolId: string, id: string, data: EntCacheMetricsUpdate): Promise<EntCacheMetrics>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCacheMetricsQuery): Promise<number>;
  findByService(schoolId: string, service: string): Promise<EntCacheMetrics | null>;
  findLatest(schoolId: string, service: string): Promise<EntCacheMetrics | null>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntCacheMetrics[]>;
  aggregate(schoolId: string, service: string, start: string, end: string): Promise<void>;
}

export interface EntCacheWarmerRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCacheWarmer | null>;
  findAll(schoolId: string, query?: EntCacheWarmerQuery): Promise<EntCacheWarmer[]>;
  create(schoolId: string, data: EntCacheWarmerCreate): Promise<EntCacheWarmer>;
  update(schoolId: string, id: string, data: EntCacheWarmerUpdate): Promise<EntCacheWarmer>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCacheWarmerQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntCacheWarmer | null>;
  findActive(schoolId: string): Promise<EntCacheWarmer[]>;
  findBySchedule(schoolId: string, schedule: string): Promise<EntCacheWarmer[]>;
  trigger(schoolId: string, id: string): Promise<void>;
}

export interface EntCacheSnapshotRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCacheSnapshot | null>;
  findAll(schoolId: string, query?: EntCacheSnapshotQuery): Promise<EntCacheSnapshot[]>;
  create(schoolId: string, data: EntCacheSnapshotCreate): Promise<EntCacheSnapshot>;
  update(schoolId: string, id: string, data: EntCacheSnapshotUpdate): Promise<EntCacheSnapshot>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCacheSnapshotQuery): Promise<number>;
  findLatest(schoolId: string, service: string): Promise<EntCacheSnapshot | null>;
  findByService(schoolId: string, service: string): Promise<EntCacheSnapshot[]>;
  restore(schoolId: string, id: string): Promise<void>;
  findExpired(schoolId: string): Promise<EntCacheSnapshot[]>;
}

export interface EntCachePolicyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCachePolicy | null>;
  findAll(schoolId: string, query?: EntCachePolicyQuery): Promise<EntCachePolicy[]>;
  create(schoolId: string, data: EntCachePolicyCreate): Promise<EntCachePolicy>;
  update(schoolId: string, id: string, data: EntCachePolicyUpdate): Promise<EntCachePolicy>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCachePolicyQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntCachePolicy | null>;
  findActive(schoolId: string): Promise<EntCachePolicy[]>;
  findByService(schoolId: string, service: string): Promise<EntCachePolicy | null>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
}

export interface EntCacheClusterRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCacheCluster | null>;
  findAll(schoolId: string, query?: EntCacheClusterQuery): Promise<EntCacheCluster[]>;
  create(schoolId: string, data: EntCacheClusterCreate): Promise<EntCacheCluster>;
  update(schoolId: string, id: string, data: EntCacheClusterUpdate): Promise<EntCacheCluster>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCacheClusterQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntCacheCluster | null>;
  findActive(schoolId: string): Promise<EntCacheCluster[]>;
  findByRegion(schoolId: string, region: string): Promise<EntCacheCluster[]>;
  getNodes(schoolId: string, id: string): Promise<Record<string, unknown>[]>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 6: Search Infrastructure - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntSearchIndexRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSearchIndex | null>;
  findAll(schoolId: string, query?: EntSearchIndexQuery): Promise<EntSearchIndex[]>;
  create(schoolId: string, data: EntSearchIndexCreate): Promise<EntSearchIndex>;
  update(schoolId: string, id: string, data: EntSearchIndexUpdate): Promise<EntSearchIndex>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSearchIndexQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntSearchIndex | null>;
  findActive(schoolId: string): Promise<EntSearchIndex[]>;
  rebuild(schoolId: string, id: string): Promise<void>;
  getStats(schoolId: string, id: string): Promise<Record<string, unknown>>;
}

export interface EntSearchDocumentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSearchDocument | null>;
  findAll(schoolId: string, query?: EntSearchDocumentQuery): Promise<EntSearchDocument[]>;
  create(schoolId: string, data: EntSearchDocumentCreate): Promise<EntSearchDocument>;
  update(schoolId: string, id: string, data: EntSearchDocumentUpdate): Promise<EntSearchDocument>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSearchDocumentQuery): Promise<number>;
  findByIndex(schoolId: string, indexId: string): Promise<EntSearchDocument[]>;
  findByExternalId(schoolId: string, externalId: string): Promise<EntSearchDocument | null>;
  index(schoolId: string, id: string): Promise<void>;
  reindexAll(schoolId: string, indexId: string): Promise<void>;
}

export interface EntSearchQueryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSearchQuery | null>;
  findAll(schoolId: string, query?: EntSearchQueryQuery): Promise<EntSearchQuery[]>;
  create(schoolId: string, data: EntSearchQueryCreate): Promise<EntSearchQuery>;
  update(schoolId: string, id: string, data: EntSearchQueryUpdate): Promise<EntSearchQuery>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSearchQueryQuery): Promise<number>;
  findRecent(schoolId: string, limit: number): Promise<EntSearchQuery[]>;
  findPopular(schoolId: string, limit: number): Promise<EntSearchQuery[]>;
  findByUser(schoolId: string, userId: string): Promise<EntSearchQuery[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntSearchQuery[]>;
}

export interface EntSearchSuggestionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSearchSuggestion | null>;
  findAll(schoolId: string, query?: EntSearchSuggestionQuery): Promise<EntSearchSuggestion[]>;
  create(schoolId: string, data: EntSearchSuggestionCreate): Promise<EntSearchSuggestion>;
  update(schoolId: string, id: string, data: EntSearchSuggestionUpdate): Promise<EntSearchSuggestion>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSearchSuggestionQuery): Promise<number>;
  findByPrefix(schoolId: string, prefix: string): Promise<EntSearchSuggestion[]>;
  findTop(schoolId: string, limit: number): Promise<EntSearchSuggestion[]>;
  incrementUsage(schoolId: string, id: string): Promise<void>;
  findByCategory(schoolId: string, category: string): Promise<EntSearchSuggestion[]>;
}

export interface EntSearchAnalyticsRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSearchAnalytics | null>;
  findAll(schoolId: string, query?: EntSearchAnalyticsQuery): Promise<EntSearchAnalytics[]>;
  create(schoolId: string, data: EntSearchAnalyticsCreate): Promise<EntSearchAnalytics>;
  update(schoolId: string, id: string, data: EntSearchAnalyticsUpdate): Promise<EntSearchAnalytics>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSearchAnalyticsQuery): Promise<number>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntSearchAnalytics[]>;
  findTopQueries(schoolId: string, limit: number): Promise<EntSearchAnalytics[]>;
  getConversionRate(schoolId: string, start: string, end: string): Promise<number>;
  aggregate(schoolId: string, start: string, end: string): Promise<void>;
}

export interface EntGlobalSearchConfigRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntGlobalSearchConfig | null>;
  findAll(schoolId: string, query?: EntGlobalSearchConfigQuery): Promise<EntGlobalSearchConfig[]>;
  create(schoolId: string, data: EntGlobalSearchConfigCreate): Promise<EntGlobalSearchConfig>;
  update(schoolId: string, id: string, data: EntGlobalSearchConfigUpdate): Promise<EntGlobalSearchConfig>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntGlobalSearchConfigQuery): Promise<number>;
  findActive(schoolId: string): Promise<EntGlobalSearchConfig | null>;
  findByIndex(schoolId: string, indexId: string): Promise<EntGlobalSearchConfig | null>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
  updateBoost(schoolId: string, id: string, boosts: Record<string, number>): Promise<void>;
}

export interface EntElasticClusterRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntElasticCluster | null>;
  findAll(schoolId: string, query?: EntElasticClusterQuery): Promise<EntElasticCluster[]>;
  create(schoolId: string, data: EntElasticClusterCreate): Promise<EntElasticCluster>;
  update(schoolId: string, id: string, data: EntElasticClusterUpdate): Promise<EntElasticCluster>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntElasticClusterQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntElasticCluster | null>;
  findActive(schoolId: string): Promise<EntElasticCluster[]>;
  getStats(schoolId: string, id: string): Promise<Record<string, unknown>>;
  health(schoolId: string, id: string): Promise<string>;
}

export interface EntIndexBuilderRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntIndexBuilder | null>;
  findAll(schoolId: string, query?: EntIndexBuilderQuery): Promise<EntIndexBuilder[]>;
  create(schoolId: string, data: EntIndexBuilderCreate): Promise<EntIndexBuilder>;
  update(schoolId: string, id: string, data: EntIndexBuilderUpdate): Promise<EntIndexBuilder>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntIndexBuilderQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntIndexBuilder | null>;
  findActive(schoolId: string): Promise<EntIndexBuilder[]>;
  trigger(schoolId: string, id: string): Promise<void>;
  findRunning(schoolId: string): Promise<EntIndexBuilder[]>;
}

export interface EntIncrementalIndexRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntIncrementalIndex | null>;
  findAll(schoolId: string, query?: EntIncrementalIndexQuery): Promise<EntIncrementalIndex[]>;
  create(schoolId: string, data: EntIncrementalIndexCreate): Promise<EntIncrementalIndex>;
  update(schoolId: string, id: string, data: EntIncrementalIndexUpdate): Promise<EntIncrementalIndex>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntIncrementalIndexQuery): Promise<number>;
  findByIndexId(schoolId: string, indexId: string): Promise<EntIncrementalIndex | null>;
  findPending(schoolId: string): Promise<EntIncrementalIndex[]>;
  findByStatus(schoolId: string, status: string): Promise<EntIncrementalIndex[]>;
  process(schoolId: string, id: string): Promise<void>;
}

export interface EntPeopleSearchRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPeopleSearch | null>;
  findAll(schoolId: string, query?: EntPeopleSearchQuery): Promise<EntPeopleSearch[]>;
  create(schoolId: string, data: EntPeopleSearchCreate): Promise<EntPeopleSearch>;
  update(schoolId: string, id: string, data: EntPeopleSearchUpdate): Promise<EntPeopleSearch>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPeopleSearchQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntPeopleSearch[]>;
  findByDepartment(schoolId: string, department: string): Promise<EntPeopleSearch[]>;
  findByRole(schoolId: string, role: string): Promise<EntPeopleSearch[]>;
  findRecent(schoolId: string, limit: number): Promise<EntPeopleSearch[]>;
}

export interface EntSchoolSearchRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSchoolSearch | null>;
  findAll(schoolId: string, query?: EntSchoolSearchQuery): Promise<EntSchoolSearch[]>;
  create(schoolId: string, data: EntSchoolSearchCreate): Promise<EntSchoolSearch>;
  update(schoolId: string, id: string, data: EntSchoolSearchUpdate): Promise<EntSchoolSearch>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSchoolSearchQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntSchoolSearch[]>;
  findByType(schoolId: string, type: string): Promise<EntSchoolSearch[]>;
  findByLocation(schoolId: string, location: string): Promise<EntSchoolSearch[]>;
  findFeatured(schoolId: string): Promise<EntSchoolSearch[]>;
}

export interface EntAnalyticsSearchRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntAnalyticsSearch | null>;
  findAll(schoolId: string, query?: EntAnalyticsSearchQuery): Promise<EntAnalyticsSearch[]>;
  create(schoolId: string, data: EntAnalyticsSearchCreate): Promise<EntAnalyticsSearch>;
  update(schoolId: string, id: string, data: EntAnalyticsSearchUpdate): Promise<EntAnalyticsSearch>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntAnalyticsSearchQuery): Promise<number>;
  findByMetric(schoolId: string, metric: string): Promise<EntAnalyticsSearch | null>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntAnalyticsSearch[]>;
  findTopResults(schoolId: string, limit: number): Promise<EntAnalyticsSearch[]>;
  aggregate(schoolId: string, start: string, end: string): Promise<void>;
}

export interface EntSearchRelevanceRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSearchRelevance | null>;
  findAll(schoolId: string, query?: EntSearchRelevanceQuery): Promise<EntSearchRelevance[]>;
  create(schoolId: string, data: EntSearchRelevanceCreate): Promise<EntSearchRelevance>;
  update(schoolId: string, id: string, data: EntSearchRelevanceUpdate): Promise<EntSearchRelevance>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSearchRelevanceQuery): Promise<number>;
  findByIndex(schoolId: string, indexId: string): Promise<EntSearchRelevance[]>;
  findActive(schoolId: string): Promise<EntSearchRelevance[]>;
  findByQuery(schoolId: string, query: string): Promise<EntSearchRelevance | null>;
  updateScore(schoolId: string, id: string, score: number): Promise<void>;
}

export interface EntSearchSynonymRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSearchSynonym | null>;
  findAll(schoolId: string, query?: EntSearchSynonymQuery): Promise<EntSearchSynonym[]>;
  create(schoolId: string, data: EntSearchSynonymCreate): Promise<EntSearchSynonym>;
  update(schoolId: string, id: string, data: EntSearchSynonymUpdate): Promise<EntSearchSynonym>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSearchSynonymQuery): Promise<number>;
  findByTerm(schoolId: string, term: string): Promise<EntSearchSynonym | null>;
  findActive(schoolId: string): Promise<EntSearchSynonym[]>;
  findByCategory(schoolId: string, category: string): Promise<EntSearchSynonym[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 7: Security & Zero Trust - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntZeroTrustPolicyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntZeroTrustPolicy | null>;
  findAll(schoolId: string, query?: EntZeroTrustPolicyQuery): Promise<EntZeroTrustPolicy[]>;
  create(schoolId: string, data: EntZeroTrustPolicyCreate): Promise<EntZeroTrustPolicy>;
  update(schoolId: string, id: string, data: EntZeroTrustPolicyUpdate): Promise<EntZeroTrustPolicy>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntZeroTrustPolicyQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntZeroTrustPolicy | null>;
  findActive(schoolId: string): Promise<EntZeroTrustPolicy[]>;
  findByType(schoolId: string, type: string): Promise<EntZeroTrustPolicy[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
}

export interface EntAccessPolicyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntAccessPolicy | null>;
  findAll(schoolId: string, query?: EntAccessPolicyQuery): Promise<EntAccessPolicy[]>;
  create(schoolId: string, data: EntAccessPolicyCreate): Promise<EntAccessPolicy>;
  update(schoolId: string, id: string, data: EntAccessPolicyUpdate): Promise<EntAccessPolicy>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntAccessPolicyQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntAccessPolicy | null>;
  findActive(schoolId: string): Promise<EntAccessPolicy[]>;
  findByRole(schoolId: string, role: string): Promise<EntAccessPolicy[]>;
  evaluate(schoolId: string, userId: string, resource: string, action: string): Promise<boolean>;
}

export interface EntRoleRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntRole | null>;
  findAll(schoolId: string, query?: EntRoleQuery): Promise<EntRole[]>;
  create(schoolId: string, data: EntRoleCreate): Promise<EntRole>;
  update(schoolId: string, id: string, data: EntRoleUpdate): Promise<EntRole>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntRoleQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntRole | null>;
  findActive(schoolId: string): Promise<EntRole[]>;
  findByType(schoolId: string, type: string): Promise<EntRole[]>;
  assignPermission(schoolId: string, roleId: string, permissionId: string): Promise<void>;
}

export interface EntPermissionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPermission | null>;
  findAll(schoolId: string, query?: EntPermissionQuery): Promise<EntPermission[]>;
  create(schoolId: string, data: EntPermissionCreate): Promise<EntPermission>;
  update(schoolId: string, id: string, data: EntPermissionUpdate): Promise<EntPermission>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPermissionQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntPermission | null>;
  findByResource(schoolId: string, resource: string): Promise<EntPermission[]>;
  findByAction(schoolId: string, action: string): Promise<EntPermission[]>;
  findByRole(schoolId: string, roleId: string): Promise<EntPermission[]>;
}

export interface EntAbacPolicyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntAbacPolicy | null>;
  findAll(schoolId: string, query?: EntAbacPolicyQuery): Promise<EntAbacPolicy[]>;
  create(schoolId: string, data: EntAbacPolicyCreate): Promise<EntAbacPolicy>;
  update(schoolId: string, id: string, data: EntAbacPolicyUpdate): Promise<EntAbacPolicy>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntAbacPolicyQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntAbacPolicy | null>;
  findActive(schoolId: string): Promise<EntAbacPolicy[]>;
  findByResource(schoolId: string, resource: string): Promise<EntAbacPolicy[]>;
  evaluate(schoolId: string, subject: string, resource: string, action: string, context: Record<string, unknown>): Promise<boolean>;
}

export interface EntPolicyEvaluationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPolicyEvaluation | null>;
  findAll(schoolId: string, query?: EntPolicyEvaluationQuery): Promise<EntPolicyEvaluation[]>;
  create(schoolId: string, data: EntPolicyEvaluationCreate): Promise<EntPolicyEvaluation>;
  update(schoolId: string, id: string, data: EntPolicyEvaluationUpdate): Promise<EntPolicyEvaluation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPolicyEvaluationQuery): Promise<number>;
  findByPolicyId(schoolId: string, policyId: string): Promise<EntPolicyEvaluation[]>;
  findDenied(schoolId: string): Promise<EntPolicyEvaluation[]>;
  findByUser(schoolId: string, userId: string): Promise<EntPolicyEvaluation[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntPolicyEvaluation[]>;
}

export interface EntSecretRotationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSecretRotation | null>;
  findAll(schoolId: string, query?: EntSecretRotationQuery): Promise<EntSecretRotation[]>;
  create(schoolId: string, data: EntSecretRotationCreate): Promise<EntSecretRotation>;
  update(schoolId: string, id: string, data: EntSecretRotationUpdate): Promise<EntSecretRotation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSecretRotationQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntSecretRotation | null>;
  findActive(schoolId: string): Promise<EntSecretRotation[]>;
  findDue(schoolId: string): Promise<EntSecretRotation[]>;
  rotate(schoolId: string, id: string): Promise<void>;
}

export interface EntSecurityCenterRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSecurityCenter | null>;
  findAll(schoolId: string, query?: EntSecurityCenterQuery): Promise<EntSecurityCenter[]>;
  create(schoolId: string, data: EntSecurityCenterCreate): Promise<EntSecurityCenter>;
  update(schoolId: string, id: string, data: EntSecurityCenterUpdate): Promise<EntSecurityCenter>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSecurityCenterQuery): Promise<number>;
  getDashboard(schoolId: string): Promise<Record<string, unknown>>;
  findRecentAlerts(schoolId: string, limit: number): Promise<EntSecurityCenter[]>;
  getScore(schoolId: string): Promise<number>;
  findBySeverity(schoolId: string, severity: string): Promise<EntSecurityCenter[]>;
}

export interface EntThreatDetectionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntThreatDetection | null>;
  findAll(schoolId: string, query?: EntThreatDetectionQuery): Promise<EntThreatDetection[]>;
  create(schoolId: string, data: EntThreatDetectionCreate): Promise<EntThreatDetection>;
  update(schoolId: string, id: string, data: EntThreatDetectionUpdate): Promise<EntThreatDetection>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntThreatDetectionQuery): Promise<number>;
  findActive(schoolId: string): Promise<EntThreatDetection[]>;
  findBySeverity(schoolId: string, severity: string): Promise<EntThreatDetection[]>;
  findByType(schoolId: string, type: string): Promise<EntThreatDetection[]>;
  acknowledge(schoolId: string, id: string, userId: string): Promise<void>;
}

export interface EntSecurityAuditRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSecurityAudit | null>;
  findAll(schoolId: string, query?: EntSecurityAuditQuery): Promise<EntSecurityAudit[]>;
  create(schoolId: string, data: EntSecurityAuditCreate): Promise<EntSecurityAudit>;
  update(schoolId: string, id: string, data: EntSecurityAuditUpdate): Promise<EntSecurityAudit>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSecurityAuditQuery): Promise<number>;
  findByAction(schoolId: string, action: string): Promise<EntSecurityAudit[]>;
  findByUser(schoolId: string, userId: string): Promise<EntSecurityAudit[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntSecurityAudit[]>;
  findFailed(schoolId: string): Promise<EntSecurityAudit[]>;
}

export interface EntFirewallRuleRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntFirewallRule | null>;
  findAll(schoolId: string, query?: EntFirewallRuleQuery): Promise<EntFirewallRule[]>;
  create(schoolId: string, data: EntFirewallRuleCreate): Promise<EntFirewallRule>;
  update(schoolId: string, id: string, data: EntFirewallRuleUpdate): Promise<EntFirewallRule>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntFirewallRuleQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntFirewallRule | null>;
  findActive(schoolId: string): Promise<EntFirewallRule[]>;
  findByPort(schoolId: string, port: number): Promise<EntFirewallRule[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
}

export interface EntIpWhitelistRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntIpWhitelist | null>;
  findAll(schoolId: string, query?: EntIpWhitelistQuery): Promise<EntIpWhitelist[]>;
  create(schoolId: string, data: EntIpWhitelistCreate): Promise<EntIpWhitelist>;
  update(schoolId: string, id: string, data: EntIpWhitelistUpdate): Promise<EntIpWhitelist>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntIpWhitelistQuery): Promise<number>;
  findByIpAddress(schoolId: string, ipAddress: string): Promise<EntIpWhitelist | null>;
  findActive(schoolId: string): Promise<EntIpWhitelist[]>;
  isWhitelisted(schoolId: string, ipAddress: string): Promise<boolean>;
  findByLabel(schoolId: string, label: string): Promise<EntIpWhitelist[]>;
}

export interface EntEncryptionKeyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntEncryptionKey | null>;
  findAll(schoolId: string, query?: EntEncryptionKeyQuery): Promise<EntEncryptionKey[]>;
  create(schoolId: string, data: EntEncryptionKeyCreate): Promise<EntEncryptionKey>;
  update(schoolId: string, id: string, data: EntEncryptionKeyUpdate): Promise<EntEncryptionKey>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntEncryptionKeyQuery): Promise<number>;
  findActive(schoolId: string): Promise<EntEncryptionKey | null>;
  findByName(schoolId: string, name: string): Promise<EntEncryptionKey | null>;
  rotate(schoolId: string, id: string): Promise<void>;
  findDue(schoolId: string): Promise<EntEncryptionKey[]>;
}

export interface EntSecurityIncidentRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSecurityIncident | null>;
  findAll(schoolId: string, query?: EntSecurityIncidentQuery): Promise<EntSecurityIncident[]>;
  create(schoolId: string, data: EntSecurityIncidentCreate): Promise<EntSecurityIncident>;
  update(schoolId: string, id: string, data: EntSecurityIncidentUpdate): Promise<EntSecurityIncident>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSecurityIncidentQuery): Promise<number>;
  findActive(schoolId: string): Promise<EntSecurityIncident[]>;
  findBySeverity(schoolId: string, severity: string): Promise<EntSecurityIncident[]>;
  acknowledge(schoolId: string, id: string, userId: string): Promise<void>;
  resolve(schoolId: string, id: string): Promise<void>;
}

export interface EntVulnerabilityScanRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntVulnerabilityScan | null>;
  findAll(schoolId: string, query?: EntVulnerabilityScanQuery): Promise<EntVulnerabilityScan[]>;
  create(schoolId: string, data: EntVulnerabilityScanCreate): Promise<EntVulnerabilityScan>;
  update(schoolId: string, id: string, data: EntVulnerabilityScanUpdate): Promise<EntVulnerabilityScan>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntVulnerabilityScanQuery): Promise<number>;
  findLatest(schoolId: string): Promise<EntVulnerabilityScan | null>;
  findRunning(schoolId: string): Promise<EntVulnerabilityScan[]>;
  trigger(schoolId: string, target: string): Promise<void>;
  findBySeverity(schoolId: string, severity: string): Promise<EntVulnerabilityScan[]>;
}

export interface EntAccessLogRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntAccessLog | null>;
  findAll(schoolId: string, query?: EntAccessLogQuery): Promise<EntAccessLog[]>;
  create(schoolId: string, data: EntAccessLogCreate): Promise<EntAccessLog>;
  update(schoolId: string, id: string, data: EntAccessLogUpdate): Promise<EntAccessLog>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntAccessLogQuery): Promise<number>;
  findByUser(schoolId: string, userId: string): Promise<EntAccessLog[]>;
  findByResource(schoolId: string, resource: string): Promise<EntAccessLog[]>;
  findFailed(schoolId: string): Promise<EntAccessLog[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntAccessLog[]>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 8: High Availability & Disaster Recovery - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntFailoverConfigRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntFailoverConfig | null>;
  findAll(schoolId: string, query?: EntFailoverConfigQuery): Promise<EntFailoverConfig[]>;
  create(schoolId: string, data: EntFailoverConfigCreate): Promise<EntFailoverConfig>;
  update(schoolId: string, id: string, data: EntFailoverConfigUpdate): Promise<EntFailoverConfig>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntFailoverConfigQuery): Promise<number>;
  findByService(schoolId: string, service: string): Promise<EntFailoverConfig | null>;
  findActive(schoolId: string): Promise<EntFailoverConfig[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
  test(schoolId: string, id: string): Promise<void>;
}

export interface EntFailoverEventRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntFailoverEvent | null>;
  findAll(schoolId: string, query?: EntFailoverEventQuery): Promise<EntFailoverEvent[]>;
  create(schoolId: string, data: EntFailoverEventCreate): Promise<EntFailoverEvent>;
  update(schoolId: string, id: string, data: EntFailoverEventUpdate): Promise<EntFailoverEvent>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntFailoverEventQuery): Promise<number>;
  findByService(schoolId: string, service: string): Promise<EntFailoverEvent[]>;
  findRecent(schoolId: string, limit: number): Promise<EntFailoverEvent[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntFailoverEvent[]>;
  findByStatus(schoolId: string, status: string): Promise<EntFailoverEvent[]>;
}

export interface EntReplicationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntReplication | null>;
  findAll(schoolId: string, query?: EntReplicationQuery): Promise<EntReplication[]>;
  create(schoolId: string, data: EntReplicationCreate): Promise<EntReplication>;
  update(schoolId: string, id: string, data: EntReplicationUpdate): Promise<EntReplication>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntReplicationQuery): Promise<number>;
  findBySource(schoolId: string, source: string): Promise<EntReplication | null>;
  findActive(schoolId: string): Promise<EntReplication[]>;
  findLagging(schoolId: string, thresholdMs: number): Promise<EntReplication[]>;
  getLag(schoolId: string, id: string): Promise<number>;
}

export interface EntGeoReplicationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntGeoReplication | null>;
  findAll(schoolId: string, query?: EntGeoReplicationQuery): Promise<EntGeoReplication[]>;
  create(schoolId: string, data: EntGeoReplicationCreate): Promise<EntGeoReplication>;
  update(schoolId: string, id: string, data: EntGeoReplicationUpdate): Promise<EntGeoReplication>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntGeoReplicationQuery): Promise<number>;
  findBySourceRegion(schoolId: string, sourceRegion: string): Promise<EntGeoReplication[]>;
  findActive(schoolId: string): Promise<EntGeoReplication[]>;
  findByTargetRegion(schoolId: string, targetRegion: string): Promise<EntGeoReplication[]>;
  getLag(schoolId: string, id: string): Promise<number>;
}

export interface EntHealthCheckRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntHealthCheck | null>;
  findAll(schoolId: string, query?: EntHealthCheckQuery): Promise<EntHealthCheck[]>;
  create(schoolId: string, data: EntHealthCheckCreate): Promise<EntHealthCheck>;
  update(schoolId: string, id: string, data: EntHealthCheckUpdate): Promise<EntHealthCheck>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntHealthCheckQuery): Promise<number>;
  findByService(schoolId: string, service: string): Promise<EntHealthCheck | null>;
  findUnhealthy(schoolId: string): Promise<EntHealthCheck[]>;
  findRecent(schoolId: string, service: string, limit: number): Promise<EntHealthCheck[]>;
  runCheck(schoolId: string, service: string): Promise<void>;
}

export interface EntHealthStatusRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntHealthStatus | null>;
  findAll(schoolId: string, query?: EntHealthStatusQuery): Promise<EntHealthStatus[]>;
  create(schoolId: string, data: EntHealthStatusCreate): Promise<EntHealthStatus>;
  update(schoolId: string, id: string, data: EntHealthStatusUpdate): Promise<EntHealthStatus>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntHealthStatusQuery): Promise<number>;
  findCurrent(schoolId: string): Promise<EntHealthStatus | null>;
  findByService(schoolId: string, service: string): Promise<EntHealthStatus | null>;
  findDegraded(schoolId: string): Promise<EntHealthStatus[]>;
  getOverview(schoolId: string): Promise<Record<string, unknown>>;
}

export interface EntAutoRecoveryRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntAutoRecovery | null>;
  findAll(schoolId: string, query?: EntAutoRecoveryQuery): Promise<EntAutoRecovery[]>;
  create(schoolId: string, data: EntAutoRecoveryCreate): Promise<EntAutoRecovery>;
  update(schoolId: string, id: string, data: EntAutoRecoveryUpdate): Promise<EntAutoRecovery>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntAutoRecoveryQuery): Promise<number>;
  findActive(schoolId: string): Promise<EntAutoRecovery[]>;
  findByService(schoolId: string, service: string): Promise<EntAutoRecovery | null>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
  trigger(schoolId: string, id: string): Promise<void>;
}

export interface EntRecoveryAttemptRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntRecoveryAttempt | null>;
  findAll(schoolId: string, query?: EntRecoveryAttemptQuery): Promise<EntRecoveryAttempt[]>;
  create(schoolId: string, data: EntRecoveryAttemptCreate): Promise<EntRecoveryAttempt>;
  update(schoolId: string, id: string, data: EntRecoveryAttemptUpdate): Promise<EntRecoveryAttempt>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntRecoveryAttemptQuery): Promise<number>;
  findByService(schoolId: string, service: string): Promise<EntRecoveryAttempt[]>;
  findRunning(schoolId: string): Promise<EntRecoveryAttempt[]>;
  findByStatus(schoolId: string, status: string): Promise<EntRecoveryAttempt[]>;
  findRecent(schoolId: string, limit: number): Promise<EntRecoveryAttempt[]>;
}

export interface EntBackupScheduleRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntBackupSchedule | null>;
  findAll(schoolId: string, query?: EntBackupScheduleQuery): Promise<EntBackupSchedule[]>;
  create(schoolId: string, data: EntBackupScheduleCreate): Promise<EntBackupSchedule>;
  update(schoolId: string, id: string, data: EntBackupScheduleUpdate): Promise<EntBackupSchedule>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntBackupScheduleQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntBackupSchedule | null>;
  findActive(schoolId: string): Promise<EntBackupSchedule[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
  triggerNow(schoolId: string, id: string): Promise<void>;
}

export interface EntBackupJobRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntBackupJob | null>;
  findAll(schoolId: string, query?: EntBackupJobQuery): Promise<EntBackupJob[]>;
  create(schoolId: string, data: EntBackupJobCreate): Promise<EntBackupJob>;
  update(schoolId: string, id: string, data: EntBackupJobUpdate): Promise<EntBackupJob>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntBackupJobQuery): Promise<number>;
  findRunning(schoolId: string): Promise<EntBackupJob[]>;
  findBySchedule(schoolId: string, scheduleId: string): Promise<EntBackupJob[]>;
  findByStatus(schoolId: string, status: string): Promise<EntBackupJob[]>;
  findLatest(schoolId: string, scheduleId: string): Promise<EntBackupJob | null>;
}

export interface EntDisasterRecoveryPlanRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDisasterRecoveryPlan | null>;
  findAll(schoolId: string, query?: EntDisasterRecoveryPlanQuery): Promise<EntDisasterRecoveryPlan[]>;
  create(schoolId: string, data: EntDisasterRecoveryPlanCreate): Promise<EntDisasterRecoveryPlan>;
  update(schoolId: string, id: string, data: EntDisasterRecoveryPlanUpdate): Promise<EntDisasterRecoveryPlan>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDisasterRecoveryPlanQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntDisasterRecoveryPlan | null>;
  findActive(schoolId: string): Promise<EntDisasterRecoveryPlan[]>;
  findByPriority(schoolId: string, priority: string): Promise<EntDisasterRecoveryPlan[]>;
  approve(schoolId: string, id: string, userId: string): Promise<void>;
}

export interface EntDisasterRecoveryTestRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDisasterRecoveryTest | null>;
  findAll(schoolId: string, query?: EntDisasterRecoveryTestQuery): Promise<EntDisasterRecoveryTest[]>;
  create(schoolId: string, data: EntDisasterRecoveryTestCreate): Promise<EntDisasterRecoveryTest>;
  update(schoolId: string, id: string, data: EntDisasterRecoveryTestUpdate): Promise<EntDisasterRecoveryTest>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDisasterRecoveryTestQuery): Promise<number>;
  findByPlanId(schoolId: string, planId: string): Promise<EntDisasterRecoveryTest[]>;
  findRunning(schoolId: string): Promise<EntDisasterRecoveryTest[]>;
  findByStatus(schoolId: string, status: string): Promise<EntDisasterRecoveryTest[]>;
  trigger(schoolId: string, planId: string): Promise<void>;
}

export interface EntRegionConfigRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntRegionConfig | null>;
  findAll(schoolId: string, query?: EntRegionConfigQuery): Promise<EntRegionConfig[]>;
  create(schoolId: string, data: EntRegionConfigCreate): Promise<EntRegionConfig>;
  update(schoolId: string, id: string, data: EntRegionConfigUpdate): Promise<EntRegionConfig>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntRegionConfigQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntRegionConfig | null>;
  findActive(schoolId: string): Promise<EntRegionConfig[]>;
  findByProvider(schoolId: string, provider: string): Promise<EntRegionConfig[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
}

export interface EntLoadBalancerRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntLoadBalancer | null>;
  findAll(schoolId: string, query?: EntLoadBalancerQuery): Promise<EntLoadBalancer[]>;
  create(schoolId: string, data: EntLoadBalancerCreate): Promise<EntLoadBalancer>;
  update(schoolId: string, id: string, data: EntLoadBalancerUpdate): Promise<EntLoadBalancer>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntLoadBalancerQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntLoadBalancer | null>;
  findActive(schoolId: string): Promise<EntLoadBalancer[]>;
  findByType(schoolId: string, type: string): Promise<EntLoadBalancer[]>;
  getStats(schoolId: string, id: string): Promise<Record<string, unknown>>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 9: Data Lake & Governance - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntDataLakeRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataLake | null>;
  findAll(schoolId: string, query?: EntDataLakeQuery): Promise<EntDataLake[]>;
  create(schoolId: string, data: EntDataLakeCreate): Promise<EntDataLake>;
  update(schoolId: string, id: string, data: EntDataLakeUpdate): Promise<EntDataLake>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataLakeQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntDataLake | null>;
  findActive(schoolId: string): Promise<EntDataLake[]>;
  getStats(schoolId: string, id: string): Promise<Record<string, unknown>>;
  health(schoolId: string, id: string): Promise<string>;
}

export interface EntDataLakeDatasetRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataLakeDataset | null>;
  findAll(schoolId: string, query?: EntDataLakeDatasetQuery): Promise<EntDataLakeDataset[]>;
  create(schoolId: string, data: EntDataLakeDatasetCreate): Promise<EntDataLakeDataset>;
  update(schoolId: string, id: string, data: EntDataLakeDatasetUpdate): Promise<EntDataLakeDataset>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataLakeDatasetQuery): Promise<number>;
  findByLakeId(schoolId: string, lakeId: string): Promise<EntDataLakeDataset[]>;
  findByName(schoolId: string, name: string): Promise<EntDataLakeDataset | null>;
  findActive(schoolId: string): Promise<EntDataLakeDataset[]>;
  getStats(schoolId: string, id: string): Promise<Record<string, unknown>>;
}

export interface EntDataArchiveRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataArchive | null>;
  findAll(schoolId: string, query?: EntDataArchiveQuery): Promise<EntDataArchive[]>;
  create(schoolId: string, data: EntDataArchiveCreate): Promise<EntDataArchive>;
  update(schoolId: string, id: string, data: EntDataArchiveUpdate): Promise<EntDataArchive>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataArchiveQuery): Promise<number>;
  findBySource(schoolId: string, source: string): Promise<EntDataArchive[]>;
  findExpired(schoolId: string): Promise<EntDataArchive[]>;
  restore(schoolId: string, id: string): Promise<void>;
  findByStatus(schoolId: string, status: string): Promise<EntDataArchive[]>;
}

export interface EntDataSnapshotRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataSnapshot | null>;
  findAll(schoolId: string, query?: EntDataSnapshotQuery): Promise<EntDataSnapshot[]>;
  create(schoolId: string, data: EntDataSnapshotCreate): Promise<EntDataSnapshot>;
  update(schoolId: string, id: string, data: EntDataSnapshotUpdate): Promise<EntDataSnapshot>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataSnapshotQuery): Promise<number>;
  findLatest(schoolId: string, source: string): Promise<EntDataSnapshot | null>;
  findBySource(schoolId: string, source: string): Promise<EntDataSnapshot[]>;
  restore(schoolId: string, id: string): Promise<void>;
  findExpired(schoolId: string): Promise<EntDataSnapshot[]>;
}

export interface EntHistoricalStorageRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntHistoricalStorage | null>;
  findAll(schoolId: string, query?: EntHistoricalStorageQuery): Promise<EntHistoricalStorage[]>;
  create(schoolId: string, data: EntHistoricalStorageCreate): Promise<EntHistoricalStorage>;
  update(schoolId: string, id: string, data: EntHistoricalStorageUpdate): Promise<EntHistoricalStorage>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntHistoricalStorageQuery): Promise<number>;
  findByEntity(schoolId: string, entityType: string): Promise<EntHistoricalStorage[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntHistoricalStorage[]>;
  getStats(schoolId: string): Promise<Record<string, unknown>>;
  compact(schoolId: string, entityType: string): Promise<void>;
}

export interface EntDataGovernanceRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataGovernance | null>;
  findAll(schoolId: string, query?: EntDataGovernanceQuery): Promise<EntDataGovernance[]>;
  create(schoolId: string, data: EntDataGovernanceCreate): Promise<EntDataGovernance>;
  update(schoolId: string, id: string, data: EntDataGovernanceUpdate): Promise<EntDataGovernance>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataGovernanceQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntDataGovernance | null>;
  findActive(schoolId: string): Promise<EntDataGovernance[]>;
  findByDomain(schoolId: string, domain: string): Promise<EntDataGovernance[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
}

export interface EntDataLineageRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataLineage | null>;
  findAll(schoolId: string, query?: EntDataLineageQuery): Promise<EntDataLineage[]>;
  create(schoolId: string, data: EntDataLineageCreate): Promise<EntDataLineage>;
  update(schoolId: string, id: string, data: EntDataLineageUpdate): Promise<EntDataLineage>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataLineageQuery): Promise<number>;
  findBySource(schoolId: string, source: string): Promise<EntDataLineage[]>;
  findByTarget(schoolId: string, target: string): Promise<EntDataLineage[]>;
  getGraph(schoolId: string, entity: string): Promise<Record<string, unknown>>;
  findByType(schoolId: string, type: string): Promise<EntDataLineage[]>;
}

export interface EntMetadataCatalogRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntMetadataCatalog | null>;
  findAll(schoolId: string, query?: EntMetadataCatalogQuery): Promise<EntMetadataCatalog[]>;
  create(schoolId: string, data: EntMetadataCatalogCreate): Promise<EntMetadataCatalog>;
  update(schoolId: string, id: string, data: EntMetadataCatalogUpdate): Promise<EntMetadataCatalog>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntMetadataCatalogQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntMetadataCatalog | null>;
  findByDomain(schoolId: string, domain: string): Promise<EntMetadataCatalog[]>;
  findActive(schoolId: string): Promise<EntMetadataCatalog[]>;
  search(schoolId: string, term: string): Promise<EntMetadataCatalog[]>;
}

export interface EntDataQualityRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataQuality | null>;
  findAll(schoolId: string, query?: EntDataQualityQuery): Promise<EntDataQuality[]>;
  create(schoolId: string, data: EntDataQualityCreate): Promise<EntDataQuality>;
  update(schoolId: string, id: string, data: EntDataQualityUpdate): Promise<EntDataQuality>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataQualityQuery): Promise<number>;
  findByDataset(schoolId: string, datasetId: string): Promise<EntDataQuality | null>;
  findFailed(schoolId: string): Promise<EntDataQuality[]>;
  runCheck(schoolId: string, datasetId: string): Promise<void>;
  getScore(schoolId: string, datasetId: string): Promise<number>;
}

export interface EntDataPipelineRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataPipeline | null>;
  findAll(schoolId: string, query?: EntDataPipelineQuery): Promise<EntDataPipeline[]>;
  create(schoolId: string, data: EntDataPipelineCreate): Promise<EntDataPipeline>;
  update(schoolId: string, id: string, data: EntDataPipelineUpdate): Promise<EntDataPipeline>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataPipelineQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntDataPipeline | null>;
  findActive(schoolId: string): Promise<EntDataPipeline[]>;
  findRunning(schoolId: string): Promise<EntDataPipeline[]>;
  trigger(schoolId: string, id: string): Promise<void>;
}

export interface EntDataRetentionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataRetention | null>;
  findAll(schoolId: string, query?: EntDataRetentionQuery): Promise<EntDataRetention[]>;
  create(schoolId: string, data: EntDataRetentionCreate): Promise<EntDataRetention>;
  update(schoolId: string, id: string, data: EntDataRetentionUpdate): Promise<EntDataRetention>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataRetentionQuery): Promise<number>;
  findByEntity(schoolId: string, entityType: string): Promise<EntDataRetention | null>;
  findActive(schoolId: string): Promise<EntDataRetention[]>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
  enforce(schoolId: string, id: string): Promise<void>;
}

export interface EntDataClassificationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataClassification | null>;
  findAll(schoolId: string, query?: EntDataClassificationQuery): Promise<EntDataClassification[]>;
  create(schoolId: string, data: EntDataClassificationCreate): Promise<EntDataClassification>;
  update(schoolId: string, id: string, data: EntDataClassificationUpdate): Promise<EntDataClassification>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataClassificationQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntDataClassification | null>;
  findByLevel(schoolId: string, level: string): Promise<EntDataClassification[]>;
  findActive(schoolId: string): Promise<EntDataClassification[]>;
  classify(schoolId: string, entityId: string, classificationId: string): Promise<void>;
}

export interface EntDataEncryptionRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataEncryption | null>;
  findAll(schoolId: string, query?: EntDataEncryptionQuery): Promise<EntDataEncryption[]>;
  create(schoolId: string, data: EntDataEncryptionCreate): Promise<EntDataEncryption>;
  update(schoolId: string, id: string, data: EntDataEncryptionUpdate): Promise<EntDataEncryption>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataEncryptionQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntDataEncryption | null>;
  findActive(schoolId: string): Promise<EntDataEncryption[]>;
  findByAlgorithm(schoolId: string, algorithm: string): Promise<EntDataEncryption[]>;
  rotate(schoolId: string, id: string): Promise<void>;
}

export interface EntDataAccessPolicyRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDataAccessPolicy | null>;
  findAll(schoolId: string, query?: EntDataAccessPolicyQuery): Promise<EntDataAccessPolicy[]>;
  create(schoolId: string, data: EntDataAccessPolicyCreate): Promise<EntDataAccessPolicy>;
  update(schoolId: string, id: string, data: EntDataAccessPolicyUpdate): Promise<EntDataAccessPolicy>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDataAccessPolicyQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntDataAccessPolicy | null>;
  findActive(schoolId: string): Promise<EntDataAccessPolicy[]>;
  findByResource(schoolId: string, resource: string): Promise<EntDataAccessPolicy[]>;
  evaluate(schoolId: string, userId: string, resource: string): Promise<boolean>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 10: CI/CD & DevOps - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntCiPipelineRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCiPipeline | null>;
  findAll(schoolId: string, query?: EntCiPipelineQuery): Promise<EntCiPipeline[]>;
  create(schoolId: string, data: EntCiPipelineCreate): Promise<EntCiPipeline>;
  update(schoolId: string, id: string, data: EntCiPipelineUpdate): Promise<EntCiPipeline>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCiPipelineQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntCiPipeline | null>;
  findActive(schoolId: string): Promise<EntCiPipeline[]>;
  trigger(schoolId: string, id: string, branch: string): Promise<void>;
  findByRepo(schoolId: string, repoUrl: string): Promise<EntCiPipeline[]>;
}

export interface EntCiRunRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCiRun | null>;
  findAll(schoolId: string, query?: EntCiRunQuery): Promise<EntCiRun[]>;
  create(schoolId: string, data: EntCiRunCreate): Promise<EntCiRun>;
  update(schoolId: string, id: string, data: EntCiRunUpdate): Promise<EntCiRun>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCiRunQuery): Promise<number>;
  findByPipelineId(schoolId: string, pipelineId: string): Promise<EntCiRun[]>;
  findRunning(schoolId: string): Promise<EntCiRun[]>;
  findByStatus(schoolId: string, status: string): Promise<EntCiRun[]>;
  cancel(schoolId: string, id: string): Promise<void>;
}

export interface EntQualityGateRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntQualityGate | null>;
  findAll(schoolId: string, query?: EntQualityGateQuery): Promise<EntQualityGate[]>;
  create(schoolId: string, data: EntQualityGateCreate): Promise<EntQualityGate>;
  update(schoolId: string, id: string, data: EntQualityGateUpdate): Promise<EntQualityGate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntQualityGateQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntQualityGate | null>;
  findActive(schoolId: string): Promise<EntQualityGate[]>;
  findByStage(schoolId: string, stage: string): Promise<EntQualityGate[]>;
  evaluate(schoolId: string, id: string, results: Record<string, unknown>): Promise<boolean>;
}

export interface EntQualityGateResultRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntQualityGateResult | null>;
  findAll(schoolId: string, query?: EntQualityGateResultQuery): Promise<EntQualityGateResult[]>;
  create(schoolId: string, data: EntQualityGateResultCreate): Promise<EntQualityGateResult>;
  update(schoolId: string, id: string, data: EntQualityGateResultUpdate): Promise<EntQualityGateResult>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntQualityGateResultQuery): Promise<number>;
  findByGateId(schoolId: string, gateId: string): Promise<EntQualityGateResult[]>;
  findByRunId(schoolId: string, runId: string): Promise<EntQualityGateResult[]>;
  findFailed(schoolId: string): Promise<EntQualityGateResult[]>;
  findByStatus(schoolId: string, status: string): Promise<EntQualityGateResult[]>;
}

export interface EntReleaseNoteRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntReleaseNote | null>;
  findAll(schoolId: string, query?: EntReleaseNoteQuery): Promise<EntReleaseNote[]>;
  create(schoolId: string, data: EntReleaseNoteCreate): Promise<EntReleaseNote>;
  update(schoolId: string, id: string, data: EntReleaseNoteUpdate): Promise<EntReleaseNote>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntReleaseNoteQuery): Promise<number>;
  findByVersion(schoolId: string, version: string): Promise<EntReleaseNote | null>;
  findPublished(schoolId: string): Promise<EntReleaseNote[]>;
  publish(schoolId: string, id: string): Promise<void>;
  findLatest(schoolId: string): Promise<EntReleaseNote | null>;
}

export interface EntBuildDashboardRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntBuildDashboard | null>;
  findAll(schoolId: string, query?: EntBuildDashboardQuery): Promise<EntBuildDashboard[]>;
  create(schoolId: string, data: EntBuildDashboardCreate): Promise<EntBuildDashboard>;
  update(schoolId: string, id: string, data: EntBuildDashboardUpdate): Promise<EntBuildDashboard>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntBuildDashboardQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntBuildDashboard | null>;
  findDefault(schoolId: string): Promise<EntBuildDashboard | null>;
  setDefault(schoolId: string, id: string): Promise<void>;
  getStats(schoolId: string, id: string): Promise<Record<string, unknown>>;
}

export interface EntTestDashboardRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntTestDashboard | null>;
  findAll(schoolId: string, query?: EntTestDashboardQuery): Promise<EntTestDashboard[]>;
  create(schoolId: string, data: EntTestDashboardCreate): Promise<EntTestDashboard>;
  update(schoolId: string, id: string, data: EntTestDashboardUpdate): Promise<EntTestDashboard>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntTestDashboardQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntTestDashboard | null>;
  findDefault(schoolId: string): Promise<EntTestDashboard | null>;
  setDefault(schoolId: string, id: string): Promise<void>;
  getStats(schoolId: string, id: string): Promise<Record<string, unknown>>;
}

export interface EntCoverageDashboardRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCoverageDashboard | null>;
  findAll(schoolId: string, query?: EntCoverageDashboardQuery): Promise<EntCoverageDashboard[]>;
  create(schoolId: string, data: EntCoverageDashboardCreate): Promise<EntCoverageDashboard>;
  update(schoolId: string, id: string, data: EntCoverageDashboardUpdate): Promise<EntCoverageDashboard>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCoverageDashboardQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntCoverageDashboard | null>;
  findDefault(schoolId: string): Promise<EntCoverageDashboard | null>;
  setDefault(schoolId: string, id: string): Promise<void>;
  getStats(schoolId: string, id: string): Promise<Record<string, unknown>>;
}

export interface EntCodeReviewRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCodeReview | null>;
  findAll(schoolId: string, query?: EntCodeReviewQuery): Promise<EntCodeReview[]>;
  create(schoolId: string, data: EntCodeReviewCreate): Promise<EntCodeReview>;
  update(schoolId: string, id: string, data: EntCodeReviewUpdate): Promise<EntCodeReview>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCodeReviewQuery): Promise<number>;
  findByPrNumber(schoolId: string, prNumber: number): Promise<EntCodeReview | null>;
  findPending(schoolId: string): Promise<EntCodeReview[]>;
  findByStatus(schoolId: string, status: string): Promise<EntCodeReview[]>;
  approve(schoolId: string, id: string, userId: string): Promise<void>;
}

export interface EntSecurityScanRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSecurityScan | null>;
  findAll(schoolId: string, query?: EntSecurityScanQuery): Promise<EntSecurityScan[]>;
  create(schoolId: string, data: EntSecurityScanCreate): Promise<EntSecurityScan>;
  update(schoolId: string, id: string, data: EntSecurityScanUpdate): Promise<EntSecurityScan>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSecurityScanQuery): Promise<number>;
  findLatest(schoolId: string): Promise<EntSecurityScan | null>;
  findRunning(schoolId: string): Promise<EntSecurityScan[]>;
  trigger(schoolId: string, target: string): Promise<void>;
  findBySeverity(schoolId: string, severity: string): Promise<EntSecurityScan[]>;
}

export interface EntDependencyScanRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDependencyScan | null>;
  findAll(schoolId: string, query?: EntDependencyScanQuery): Promise<EntDependencyScan[]>;
  create(schoolId: string, data: EntDependencyScanCreate): Promise<EntDependencyScan>;
  update(schoolId: string, id: string, data: EntDependencyScanUpdate): Promise<EntDependencyScan>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDependencyScanQuery): Promise<number>;
  findLatest(schoolId: string): Promise<EntDependencyScan | null>;
  findVulnerable(schoolId: string): Promise<EntDependencyScan[]>;
  trigger(schoolId: string, target: string): Promise<void>;
  findBySeverity(schoolId: string, severity: string): Promise<EntDependencyScan[]>;
}

export interface EntInfrastructureCodeRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntInfrastructureCode | null>;
  findAll(schoolId: string, query?: EntInfrastructureCodeQuery): Promise<EntInfrastructureCode[]>;
  create(schoolId: string, data: EntInfrastructureCodeCreate): Promise<EntInfrastructureCode>;
  update(schoolId: string, id: string, data: EntInfrastructureCodeUpdate): Promise<EntInfrastructureCode>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntInfrastructureCodeQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntInfrastructureCode | null>;
  findActive(schoolId: string): Promise<EntInfrastructureCode[]>;
  findByProvider(schoolId: string, provider: string): Promise<EntInfrastructureCode[]>;
  plan(schoolId: string, id: string): Promise<void>;
}

export interface EntContainerImageRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntContainerImage | null>;
  findAll(schoolId: string, query?: EntContainerImageQuery): Promise<EntContainerImage[]>;
  create(schoolId: string, data: EntContainerImageCreate): Promise<EntContainerImage>;
  update(schoolId: string, id: string, data: EntContainerImageUpdate): Promise<EntContainerImage>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntContainerImageQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntContainerImage | null>;
  findLatest(schoolId: string, repository: string): Promise<EntContainerImage | null>;
  findByRepository(schoolId: string, repository: string): Promise<EntContainerImage[]>;
  prune(schoolId: string, repository: string, keepLatest: number): Promise<void>;
}

export interface EntHelmChartRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntHelmChart | null>;
  findAll(schoolId: string, query?: EntHelmChartQuery): Promise<EntHelmChart[]>;
  create(schoolId: string, data: EntHelmChartCreate): Promise<EntHelmChart>;
  update(schoolId: string, id: string, data: EntHelmChartUpdate): Promise<EntHelmChart>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntHelmChartQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntHelmChart | null>;
  findLatest(schoolId: string, chartName: string): Promise<EntHelmChart | null>;
  findByRepo(schoolId: string, repoUrl: string): Promise<EntHelmChart[]>;
  lint(schoolId: string, id: string): Promise<void>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 11: SDK & Developer Platform - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntSdkRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSdk | null>;
  findAll(schoolId: string, query?: EntSdkQuery): Promise<EntSdk[]>;
  create(schoolId: string, data: EntSdkCreate): Promise<EntSdk>;
  update(schoolId: string, id: string, data: EntSdkUpdate): Promise<EntSdk>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSdkQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntSdk | null>;
  findByLanguage(schoolId: string, language: string): Promise<EntSdk[]>;
  findActive(schoolId: string): Promise<EntSdk[]>;
  findLatest(schoolId: string, sdkId: string): Promise<EntSdkRelease | null>;
}

export interface EntSdkReleaseRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSdkRelease | null>;
  findAll(schoolId: string, query?: EntSdkReleaseQuery): Promise<EntSdkRelease[]>;
  create(schoolId: string, data: EntSdkReleaseCreate): Promise<EntSdkRelease>;
  update(schoolId: string, id: string, data: EntSdkReleaseUpdate): Promise<EntSdkRelease>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSdkReleaseQuery): Promise<number>;
  findBySdkId(schoolId: string, sdkId: string): Promise<EntSdkRelease[]>;
  findByVersion(schoolId: string, sdkId: string, version: string): Promise<EntSdkRelease | null>;
  findLatest(schoolId: string, sdkId: string): Promise<EntSdkRelease | null>;
  deprecate(schoolId: string, id: string): Promise<void>;
}

export interface EntCliRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCli | null>;
  findAll(schoolId: string, query?: EntCliQuery): Promise<EntCli[]>;
  create(schoolId: string, data: EntCliCreate): Promise<EntCli>;
  update(schoolId: string, id: string, data: EntCliUpdate): Promise<EntCli>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCliQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntCli | null>;
  findLatest(schoolId: string): Promise<EntCli | null>;
  findByPlatform(schoolId: string, platform: string): Promise<EntCli[]>;
  deprecate(schoolId: string, id: string): Promise<void>;
}

export interface EntApiDocumentationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntApiDocumentation | null>;
  findAll(schoolId: string, query?: EntApiDocumentationQuery): Promise<EntApiDocumentation[]>;
  create(schoolId: string, data: EntApiDocumentationCreate): Promise<EntApiDocumentation>;
  update(schoolId: string, id: string, data: EntApiDocumentationUpdate): Promise<EntApiDocumentation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntApiDocumentationQuery): Promise<number>;
  findByVersion(schoolId: string, version: string): Promise<EntApiDocumentation | null>;
  findPublished(schoolId: string): Promise<EntApiDocumentation[]>;
  publish(schoolId: string, id: string): Promise<void>;
  findLatest(schoolId: string): Promise<EntApiDocumentation | null>;
}

export interface EntOpenApiSpecRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntOpenApiSpec | null>;
  findAll(schoolId: string, query?: EntOpenApiSpecQuery): Promise<EntOpenApiSpec[]>;
  create(schoolId: string, data: EntOpenApiSpecCreate): Promise<EntOpenApiSpec>;
  update(schoolId: string, id: string, data: EntOpenApiSpecUpdate): Promise<EntOpenApiSpec>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntOpenApiSpecQuery): Promise<number>;
  findLatest(schoolId: string): Promise<EntOpenApiSpec | null>;
  findByVersion(schoolId: string, version: string): Promise<EntOpenApiSpec | null>;
  validate(schoolId: string, id: string): Promise<boolean>;
  publish(schoolId: string, id: string): Promise<void>;
}

export interface EntGraphqlSchemaRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntGraphqlSchema | null>;
  findAll(schoolId: string, query?: EntGraphqlSchemaQuery): Promise<EntGraphqlSchema[]>;
  create(schoolId: string, data: EntGraphqlSchemaCreate): Promise<EntGraphqlSchema>;
  update(schoolId: string, id: string, data: EntGraphqlSchemaUpdate): Promise<EntGraphqlSchema>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntGraphqlSchemaQuery): Promise<number>;
  findLatest(schoolId: string): Promise<EntGraphqlSchema | null>;
  validate(schoolId: string, id: string): Promise<boolean>;
  publish(schoolId: string, id: string): Promise<void>;
  findByVersion(schoolId: string, version: string): Promise<EntGraphqlSchema | null>;
}

export interface EntDeveloperPortalRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDeveloperPortal | null>;
  findAll(schoolId: string, query?: EntDeveloperPortalQuery): Promise<EntDeveloperPortal[]>;
  create(schoolId: string, data: EntDeveloperPortalCreate): Promise<EntDeveloperPortal>;
  update(schoolId: string, id: string, data: EntDeveloperPortalUpdate): Promise<EntDeveloperPortal>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDeveloperPortalQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntDeveloperPortal | null>;
  findActive(schoolId: string): Promise<EntDeveloperPortal[]>;
  getStats(schoolId: string, id: string): Promise<Record<string, unknown>>;
  toggle(schoolId: string, id: string, enabled: boolean): Promise<void>;
}

export interface EntDeveloperAppRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDeveloperApp | null>;
  findAll(schoolId: string, query?: EntDeveloperAppQuery): Promise<EntDeveloperApp[]>;
  create(schoolId: string, data: EntDeveloperAppCreate): Promise<EntDeveloperApp>;
  update(schoolId: string, id: string, data: EntDeveloperAppUpdate): Promise<EntDeveloperApp>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDeveloperAppQuery): Promise<number>;
  findByOwnerId(schoolId: string, ownerId: string): Promise<EntDeveloperApp[]>;
  findByApiKey(schoolId: string, apiKey: string): Promise<EntDeveloperApp | null>;
  findActive(schoolId: string): Promise<EntDeveloperApp[]>;
  rotateKey(schoolId: string, id: string): Promise<string>;
}

export interface EntSandboxRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSandbox | null>;
  findAll(schoolId: string, query?: EntSandboxQuery): Promise<EntSandbox[]>;
  create(schoolId: string, data: EntSandboxCreate): Promise<EntSandbox>;
  update(schoolId: string, id: string, data: EntSandboxUpdate): Promise<EntSandbox>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSandboxQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntSandbox | null>;
  findActive(schoolId: string): Promise<EntSandbox[]>;
  findByTemplate(schoolId: string, template: string): Promise<EntSandbox[]>;
  reset(schoolId: string, id: string): Promise<void>;
}

export interface EntSandboxInstanceRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSandboxInstance | null>;
  findAll(schoolId: string, query?: EntSandboxInstanceQuery): Promise<EntSandboxInstance[]>;
  create(schoolId: string, data: EntSandboxInstanceCreate): Promise<EntSandboxInstance>;
  update(schoolId: string, id: string, data: EntSandboxInstanceUpdate): Promise<EntSandboxInstance>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSandboxInstanceQuery): Promise<number>;
  findBySandboxId(schoolId: string, sandboxId: string): Promise<EntSandboxInstance[]>;
  findRunning(schoolId: string): Promise<EntSandboxInstance[]>;
  findByStatus(schoolId: string, status: string): Promise<EntSandboxInstance[]>;
  stop(schoolId: string, id: string): Promise<void>;
}

export interface EntApiUsageRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntApiUsage | null>;
  findAll(schoolId: string, query?: EntApiUsageQuery): Promise<EntApiUsage[]>;
  create(schoolId: string, data: EntApiUsageCreate): Promise<EntApiUsage>;
  update(schoolId: string, id: string, data: EntApiUsageUpdate): Promise<EntApiUsage>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntApiUsageQuery): Promise<number>;
  findByAppId(schoolId: string, appId: string): Promise<EntApiUsage[]>;
  findByEndpoint(schoolId: string, endpoint: string): Promise<EntApiUsage[]>;
  findByTimeRange(schoolId: string, start: string, end: string): Promise<EntApiUsage[]>;
  getStats(schoolId: string, appId: string): Promise<Record<string, unknown>>;
}

export interface EntWebhookRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntWebhook | null>;
  findAll(schoolId: string, query?: EntWebhookQuery): Promise<EntWebhook[]>;
  create(schoolId: string, data: EntWebhookCreate): Promise<EntWebhook>;
  update(schoolId: string, id: string, data: EntWebhookUpdate): Promise<EntWebhook>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntWebhookQuery): Promise<number>;
  findByEvent(schoolId: string, event: string): Promise<EntWebhook[]>;
  findActive(schoolId: string): Promise<EntWebhook[]>;
  findByUrl(schoolId: string, url: string): Promise<EntWebhook | null>;
  toggle(schoolId: string, id: string, active: boolean): Promise<void>;
}

export interface EntDeveloperDocumentationRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDeveloperDocumentation | null>;
  findAll(schoolId: string, query?: EntDeveloperDocumentationQuery): Promise<EntDeveloperDocumentation[]>;
  create(schoolId: string, data: EntDeveloperDocumentationCreate): Promise<EntDeveloperDocumentation>;
  update(schoolId: string, id: string, data: EntDeveloperDocumentationUpdate): Promise<EntDeveloperDocumentation>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDeveloperDocumentationQuery): Promise<number>;
  findBySlug(schoolId: string, slug: string): Promise<EntDeveloperDocumentation | null>;
  findByCategory(schoolId: string, category: string): Promise<EntDeveloperDocumentation[]>;
  findPublished(schoolId: string): Promise<EntDeveloperDocumentation[]>;
  publish(schoolId: string, id: string): Promise<void>;
}

export interface EntSdkExampleRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSdkExample | null>;
  findAll(schoolId: string, query?: EntSdkExampleQuery): Promise<EntSdkExample[]>;
  create(schoolId: string, data: EntSdkExampleCreate): Promise<EntSdkExample>;
  update(schoolId: string, id: string, data: EntSdkExampleUpdate): Promise<EntSdkExample>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSdkExampleQuery): Promise<number>;
  findBySdkId(schoolId: string, sdkId: string): Promise<EntSdkExample[]>;
  findByLanguage(schoolId: string, language: string): Promise<EntSdkExample[]>;
  findByCategory(schoolId: string, category: string): Promise<EntSdkExample[]>;
  findFeatured(schoolId: string): Promise<EntSdkExample[]>;
}

export interface EntRateLimitRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntRateLimit | null>;
  findAll(schoolId: string, query?: EntRateLimitQuery): Promise<EntRateLimit[]>;
  create(schoolId: string, data: EntRateLimitCreate): Promise<EntRateLimit>;
  update(schoolId: string, id: string, data: EntRateLimitUpdate): Promise<EntRateLimit>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntRateLimitQuery): Promise<number>;
  findByEndpoint(schoolId: string, endpoint: string): Promise<EntRateLimit | null>;
  findActive(schoolId: string): Promise<EntRateLimit[]>;
  findByAppId(schoolId: string, appId: string): Promise<EntRateLimit[]>;
  checkLimit(schoolId: string, appId: string, endpoint: string): Promise<boolean>;
}

export interface EntOauthAppRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntOauthApp | null>;
  findAll(schoolId: string, query?: EntOauthAppQuery): Promise<EntOauthApp[]>;
  create(schoolId: string, data: EntOauthAppCreate): Promise<EntOauthApp>;
  update(schoolId: string, id: string, data: EntOauthAppUpdate): Promise<EntOauthApp>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntOauthAppQuery): Promise<number>;
  findByClientId(schoolId: string, clientId: string): Promise<EntOauthApp | null>;
  findByOwnerId(schoolId: string, ownerId: string): Promise<EntOauthApp[]>;
  findActive(schoolId: string): Promise<EntOauthApp[]>;
  rotateSecret(schoolId: string, id: string): Promise<string>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Module 12: Production Readiness - Repository Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

export interface EntProductionHealthCheckRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntProductionHealthCheck | null>;
  findAll(schoolId: string, query?: EntProductionHealthCheckQuery): Promise<EntProductionHealthCheck[]>;
  create(schoolId: string, data: EntProductionHealthCheckCreate): Promise<EntProductionHealthCheck>;
  update(schoolId: string, id: string, data: EntProductionHealthCheckUpdate): Promise<EntProductionHealthCheck>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntProductionHealthCheckQuery): Promise<number>;
  findLatest(schoolId: string): Promise<EntProductionHealthCheck | null>;
  findFailed(schoolId: string): Promise<EntProductionHealthCheck[]>;
  runAll(schoolId: string): Promise<void>;
  getScore(schoolId: string): Promise<number>;
}

export interface EntDiagnosticRunRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntDiagnosticRun | null>;
  findAll(schoolId: string, query?: EntDiagnosticRunQuery): Promise<EntDiagnosticRun[]>;
  create(schoolId: string, data: EntDiagnosticRunCreate): Promise<EntDiagnosticRun>;
  update(schoolId: string, id: string, data: EntDiagnosticRunUpdate): Promise<EntDiagnosticRun>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntDiagnosticRunQuery): Promise<number>;
  findRunning(schoolId: string): Promise<EntDiagnosticRun[]>;
  findByStatus(schoolId: string, status: string): Promise<EntDiagnosticRun[]>;
  trigger(schoolId: string, type: string): Promise<void>;
  findLatest(schoolId: string): Promise<EntDiagnosticRun | null>;
}

export interface EntProductionAuditRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntProductionAudit | null>;
  findAll(schoolId: string, query?: EntProductionAuditQuery): Promise<EntProductionAudit[]>;
  create(schoolId: string, data: EntProductionAuditCreate): Promise<EntProductionAudit>;
  update(schoolId: string, id: string, data: EntProductionAuditUpdate): Promise<EntProductionAudit>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntProductionAuditQuery): Promise<number>;
  findLatest(schoolId: string): Promise<EntProductionAudit | null>;
  findByStatus(schoolId: string, status: string): Promise<EntProductionAudit[]>;
  trigger(schoolId: string): Promise<void>;
  getScore(schoolId: string): Promise<number>;
}

export interface EntPerformanceBenchmarkRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntPerformanceBenchmark | null>;
  findAll(schoolId: string, query?: EntPerformanceBenchmarkQuery): Promise<EntPerformanceBenchmark[]>;
  create(schoolId: string, data: EntPerformanceBenchmarkCreate): Promise<EntPerformanceBenchmark>;
  update(schoolId: string, id: string, data: EntPerformanceBenchmarkUpdate): Promise<EntPerformanceBenchmark>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntPerformanceBenchmarkQuery): Promise<number>;
  findLatest(schoolId: string): Promise<EntPerformanceBenchmark | null>;
  findByService(schoolId: string, service: string): Promise<EntPerformanceBenchmark[]>;
  trigger(schoolId: string, service: string): Promise<void>;
  compareToBaseline(schoolId: string, id: string): Promise<Record<string, unknown>>;
}

export interface EntSecurityBenchmarkRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntSecurityBenchmark | null>;
  findAll(schoolId: string, query?: EntSecurityBenchmarkQuery): Promise<EntSecurityBenchmark[]>;
  create(schoolId: string, data: EntSecurityBenchmarkCreate): Promise<EntSecurityBenchmark>;
  update(schoolId: string, id: string, data: EntSecurityBenchmarkUpdate): Promise<EntSecurityBenchmark>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntSecurityBenchmarkQuery): Promise<number>;
  findLatest(schoolId: string): Promise<EntSecurityBenchmark | null>;
  findFailed(schoolId: string): Promise<EntSecurityBenchmark[]>;
  trigger(schoolId: string): Promise<void>;
  getScore(schoolId: string): Promise<number>;
}

export interface EntScalabilityBenchmarkRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntScalabilityBenchmark | null>;
  findAll(schoolId: string, query?: EntScalabilityBenchmarkQuery): Promise<EntScalabilityBenchmark[]>;
  create(schoolId: string, data: EntScalabilityBenchmarkCreate): Promise<EntScalabilityBenchmark>;
  update(schoolId: string, id: string, data: EntScalabilityBenchmarkUpdate): Promise<EntScalabilityBenchmark>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntScalabilityBenchmarkQuery): Promise<number>;
  findLatest(schoolId: string): Promise<EntScalabilityBenchmark | null>;
  findByService(schoolId: string, service: string): Promise<EntScalabilityBenchmark[]>;
  trigger(schoolId: string, service: string): Promise<void>;
  getRecommendations(schoolId: string, id: string): Promise<Record<string, unknown>>;
}

export interface EntCompatibilityMatrixRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCompatibilityMatrix | null>;
  findAll(schoolId: string, query?: EntCompatibilityMatrixQuery): Promise<EntCompatibilityMatrix[]>;
  create(schoolId: string, data: EntCompatibilityMatrixCreate): Promise<EntCompatibilityMatrix>;
  update(schoolId: string, id: string, data: EntCompatibilityMatrixUpdate): Promise<EntCompatibilityMatrix>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCompatibilityMatrixQuery): Promise<number>;
  findByComponent(schoolId: string, component: string): Promise<EntCompatibilityMatrix | null>;
  findIncompatible(schoolId: string): Promise<EntCompatibilityMatrix[]>;
  verify(schoolId: string, id: string): Promise<boolean>;
  findActive(schoolId: string): Promise<EntCompatibilityMatrix[]>;
}

export interface EntProductionCertificateRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntProductionCertificate | null>;
  findAll(schoolId: string, query?: EntProductionCertificateQuery): Promise<EntProductionCertificate[]>;
  create(schoolId: string, data: EntProductionCertificateCreate): Promise<EntProductionCertificate>;
  update(schoolId: string, id: string, data: EntProductionCertificateUpdate): Promise<EntProductionCertificate>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntProductionCertificateQuery): Promise<number>;
  findByDomain(schoolId: string, domain: string): Promise<EntProductionCertificate | null>;
  findExpiring(schoolId: string, withinDays: number): Promise<EntProductionCertificate[]>;
  renew(schoolId: string, id: string): Promise<void>;
  findActive(schoolId: string): Promise<EntProductionCertificate[]>;
}

export interface EntLoadTestRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntLoadTest | null>;
  findAll(schoolId: string, query?: EntLoadTestQuery): Promise<EntLoadTest[]>;
  create(schoolId: string, data: EntLoadTestCreate): Promise<EntLoadTest>;
  update(schoolId: string, id: string, data: EntLoadTestUpdate): Promise<EntLoadTest>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntLoadTestQuery): Promise<number>;
  findRunning(schoolId: string): Promise<EntLoadTest[]>;
  findByStatus(schoolId: string, status: string): Promise<EntLoadTest[]>;
  trigger(schoolId: string, config: Record<string, unknown>): Promise<void>;
  findLatest(schoolId: string): Promise<EntLoadTest | null>;
}

export interface EntStressTestRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntStressTest | null>;
  findAll(schoolId: string, query?: EntStressTestQuery): Promise<EntStressTest[]>;
  create(schoolId: string, data: EntStressTestCreate): Promise<EntStressTest>;
  update(schoolId: string, id: string, data: EntStressTestUpdate): Promise<EntStressTest>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntStressTestQuery): Promise<number>;
  findRunning(schoolId: string): Promise<EntStressTest[]>;
  findByStatus(schoolId: string, status: string): Promise<EntStressTest[]>;
  trigger(schoolId: string, config: Record<string, unknown>): Promise<void>;
  findLatest(schoolId: string): Promise<EntStressTest | null>;
}

export interface EntEnduranceTestRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntEnduranceTest | null>;
  findAll(schoolId: string, query?: EntEnduranceTestQuery): Promise<EntEnduranceTest[]>;
  create(schoolId: string, data: EntEnduranceTestCreate): Promise<EntEnduranceTest>;
  update(schoolId: string, id: string, data: EntEnduranceTestUpdate): Promise<EntEnduranceTest>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntEnduranceTestQuery): Promise<number>;
  findRunning(schoolId: string): Promise<EntEnduranceTest[]>;
  findByStatus(schoolId: string, status: string): Promise<EntEnduranceTest[]>;
  trigger(schoolId: string, config: Record<string, unknown>): Promise<void>;
  findLatest(schoolId: string): Promise<EntEnduranceTest | null>;
}

export interface EntCapacityPlanRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntCapacityPlan | null>;
  findAll(schoolId: string, query?: EntCapacityPlanQuery): Promise<EntCapacityPlan[]>;
  create(schoolId: string, data: EntCapacityPlanCreate): Promise<EntCapacityPlan>;
  update(schoolId: string, id: string, data: EntCapacityPlanUpdate): Promise<EntCapacityPlan>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntCapacityPlanQuery): Promise<number>;
  findByService(schoolId: string, service: string): Promise<EntCapacityPlan | null>;
  findActive(schoolId: string): Promise<EntCapacityPlan[]>;
  getProjections(schoolId: string, id: string): Promise<Record<string, unknown>>;
  approve(schoolId: string, id: string, userId: string): Promise<void>;
}

export interface EntProductionRunbookRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntProductionRunbook | null>;
  findAll(schoolId: string, query?: EntProductionRunbookQuery): Promise<EntProductionRunbook[]>;
  create(schoolId: string, data: EntProductionRunbookCreate): Promise<EntProductionRunbook>;
  update(schoolId: string, id: string, data: EntProductionRunbookUpdate): Promise<EntProductionRunbook>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntProductionRunbookQuery): Promise<number>;
  findByTitle(schoolId: string, title: string): Promise<EntProductionRunbook | null>;
  findByScenario(schoolId: string, scenario: string): Promise<EntProductionRunbook[]>;
  findPublished(schoolId: string): Promise<EntProductionRunbook[]>;
  publish(schoolId: string, id: string): Promise<void>;
}

export interface EntIncidentPostmortemRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntIncidentPostmortem | null>;
  findAll(schoolId: string, query?: EntIncidentPostmortemQuery): Promise<EntIncidentPostmortem[]>;
  create(schoolId: string, data: EntIncidentPostmortemCreate): Promise<EntIncidentPostmortem>;
  update(schoolId: string, id: string, data: EntIncidentPostmortemUpdate): Promise<EntIncidentPostmortem>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntIncidentPostmortemQuery): Promise<number>;
  findByIncidentId(schoolId: string, incidentId: string): Promise<EntIncidentPostmortem | null>;
  findPublished(schoolId: string): Promise<EntIncidentPostmortem[]>;
  publish(schoolId: string, id: string): Promise<void>;
  findBySeverity(schoolId: string, severity: string): Promise<EntIncidentPostmortem[]>;
}

export interface EntProductionChecklistRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntProductionChecklist | null>;
  findAll(schoolId: string, query?: EntProductionChecklistQuery): Promise<EntProductionChecklist[]>;
  create(schoolId: string, data: EntProductionChecklistCreate): Promise<EntProductionChecklist>;
  update(schoolId: string, id: string, data: EntProductionChecklistUpdate): Promise<EntProductionChecklist>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntProductionChecklistQuery): Promise<number>;
  findByName(schoolId: string, name: string): Promise<EntProductionChecklist | null>;
  findActive(schoolId: string): Promise<EntProductionChecklist[]>;
  completeItem(schoolId: string, id: string, itemId: string): Promise<void>;
  getCompletionRate(schoolId: string, id: string): Promise<number>;
}

export interface EntGoLiveApprovalRepository {
  client: SupabaseClient;
  findById(schoolId: string, id: string): Promise<EntGoLiveApproval | null>;
  findAll(schoolId: string, query?: EntGoLiveApprovalQuery): Promise<EntGoLiveApproval[]>;
  create(schoolId: string, data: EntGoLiveApprovalCreate): Promise<EntGoLiveApproval>;
  update(schoolId: string, id: string, data: EntGoLiveApprovalUpdate): Promise<EntGoLiveApproval>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string, query?: EntGoLiveApprovalQuery): Promise<number>;
  findPending(schoolId: string): Promise<EntGoLiveApproval[]>;
  findByStatus(schoolId: string, status: string): Promise<EntGoLiveApproval[]>;
  approve(schoolId: string, id: string, userId: string): Promise<void>;
  reject(schoolId: string, id: string, userId: string, reason: string): Promise<void>;
}

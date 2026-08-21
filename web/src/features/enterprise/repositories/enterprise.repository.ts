import { SupabaseClient } from '@supabase/supabase-js';
// Enterprise Ecosystem - Platform Repository
// Phase 2.10 - EduCI Platform
import type {
  EntGlobalAdministration, EntGlobalAdministrationCreate, EntGlobalAdministrationUpdate,
  EntPlatformSetting, EntPlatformSettingCreate, EntPlatformSettingUpdate,
  EntEnvironmentConfig, EntEnvironmentConfigCreate, EntEnvironmentConfigUpdate,
  EntFeatureFlag, EntFeatureFlagCreate, EntFeatureFlagUpdate,
  EntModuleRegistry, EntModuleRegistryCreate, EntModuleRegistryUpdate,
  EntVersionRegistry, EntVersionRegistryCreate, EntVersionRegistryUpdate,
  EntTenantRegistry, EntTenantRegistryCreate, EntTenantRegistryUpdate,
  EntLicenseRegistry, EntLicenseRegistryCreate, EntLicenseRegistryUpdate,
  EntDeploymentRegistry, EntDeploymentRegistryCreate, EntDeploymentRegistryUpdate,
  EntPlatformDashboard, EntPlatformDashboardCreate, EntPlatformDashboardUpdate,
  EntPlatformMetric, EntPlatformMetricCreate, EntPlatformMetricUpdate,
  EntPlatformAlert, EntPlatformAlertCreate, EntPlatformAlertUpdate,
  EntPlatformAudit, EntPlatformAuditCreate, EntPlatformAuditUpdate,
  EntPlatformBackup, EntPlatformBackupCreate, EntPlatformBackupUpdate,
  EntPlatformEvent, EntPlatformEventCreate, EntPlatformEventUpdate,
  EntPlatformConfig, EntPlatformConfigCreate, EntPlatformConfigUpdate,
  EntPlatformWebhook, EntPlatformWebhookCreate, EntPlatformWebhookUpdate,
  EntPlatformApiKey, EntPlatformApiKeyCreate, EntPlatformApiKeyUpdate,
  EntTenant, EntTenantCreate, EntTenantUpdate,
  EntTenantIsolation, EntTenantIsolationCreate, EntTenantIsolationUpdate,
  EntTenantMigration, EntTenantMigrationCreate, EntTenantMigrationUpdate,
  EntTenantBackupConfig, EntTenantBackupConfigCreate, EntTenantBackupConfigUpdate,
  EntTenantRestore, EntTenantRestoreCreate, EntTenantRestoreUpdate,
  EntTenantArchive, EntTenantArchiveCreate, EntTenantArchiveUpdate,
  EntTenantClone, EntTenantCloneCreate, EntTenantCloneUpdate,
  EntTenantMerge, EntTenantMergeCreate, EntTenantMergeUpdate,
  EntTenantSplit, EntTenantSplitCreate, EntTenantSplitUpdate,
  EntTenantMonitoring, EntTenantMonitoringCreate, EntTenantMonitoringUpdate,
  EntTenantAnalytics, EntTenantAnalyticsCreate, EntTenantAnalyticsUpdate,
  EntTenantQuota, EntTenantQuotaCreate, EntTenantQuotaUpdate,
  EntTenantBilling, EntTenantBillingCreate, EntTenantBillingUpdate,
  EntTenantFeature, EntTenantFeatureCreate, EntTenantFeatureUpdate,
  EntTenantSso, EntTenantSsoCreate, EntTenantSsoUpdate,
  EntTenantCustomDomain, EntTenantCustomDomainCreate, EntTenantCustomDomainUpdate,
  EntReleasePipeline, EntReleasePipelineCreate, EntReleasePipelineUpdate,
  EntPipelineStage, EntPipelineStageCreate, EntPipelineStageUpdate,
  EntPipelineRun, EntPipelineRunCreate, EntPipelineRunUpdate,
  EntVersionManager, EntVersionManagerCreate, EntVersionManagerUpdate,
  EntBlueGreenDeployment, EntBlueGreenDeploymentCreate, EntBlueGreenDeploymentUpdate,
  EntCanaryDeployment, EntCanaryDeploymentCreate, EntCanaryDeploymentUpdate,
  EntRollback, EntRollbackCreate, EntRollbackUpdate,
  EntMigrationManager, EntMigrationManagerCreate, EntMigrationManagerUpdate,
  EntEnvironmentPromotion, EntEnvironmentPromotionCreate, EntEnvironmentPromotionUpdate,
  EntDeploymentHistory, EntDeploymentHistoryCreate, EntDeploymentHistoryUpdate,
  EntFeatureDeployment, EntFeatureDeploymentCreate, EntFeatureDeploymentUpdate,
  EntConfigDeployment, EntConfigDeploymentCreate, EntConfigDeploymentUpdate,
  EntInfrastructureChange, EntInfrastructureChangeCreate, EntInfrastructureChangeUpdate,
  EntDeploymentApproval, EntDeploymentApprovalCreate, EntDeploymentApprovalUpdate,
  EntDistributedTrace, EntDistributedTraceCreate, EntDistributedTraceUpdate,
  EntTraceSpan, EntTraceSpanCreate, EntTraceSpanUpdate,
  EntStructuredLog, EntStructuredLogCreate, EntStructuredLogUpdate,
  EntMetric, EntMetricCreate, EntMetricUpdate,
  EntPerformanceDashboard, EntPerformanceDashboardCreate, EntPerformanceDashboardUpdate,
  EntErrorDashboard, EntErrorDashboardCreate, EntErrorDashboardUpdate,
  EntSlowQuery, EntSlowQueryCreate, EntSlowQueryUpdate,
  EntAlertRule, EntAlertRuleCreate, EntAlertRuleUpdate,
  EntAlertIncident, EntAlertIncidentCreate, EntAlertIncidentUpdate,
  EntSlo, EntSloCreate, EntSloUpdate,
  EntSla, EntSlaCreate, EntSlaUpdate,
  EntServiceHealth, EntServiceHealthCreate, EntServiceHealthUpdate,
  EntLogAggregation, EntLogAggregationCreate, EntLogAggregationUpdate,
  EntMetricsAggregation, EntMetricsAggregationCreate, EntMetricsAggregationUpdate,
  EntAlertEscalation, EntAlertEscalationCreate, EntAlertEscalationUpdate,
  EntPerformanceBaseline, EntPerformanceBaselineCreate, EntPerformanceBaselineUpdate,
  EntRedisCluster, EntRedisClusterCreate, EntRedisClusterUpdate,
  EntCacheLayer, EntCacheLayerCreate, EntCacheLayerUpdate,
  EntCacheEntry, EntCacheEntryCreate, EntCacheEntryUpdate,
  EntDistributedCache, EntDistributedCacheCreate, EntDistributedCacheUpdate,
  EntQueryCache, EntQueryCacheCreate, EntQueryCacheUpdate,
  EntApiCache, EntApiCacheCreate, EntApiCacheUpdate,
  EntCacheInvalidation, EntCacheInvalidationCreate, EntCacheInvalidationUpdate,
  EntCacheMetrics, EntCacheMetricsCreate, EntCacheMetricsUpdate,
  EntCacheWarmer, EntCacheWarmerCreate, EntCacheWarmerUpdate,
  EntCacheSnapshot, EntCacheSnapshotCreate, EntCacheSnapshotUpdate,
  EntCachePolicy, EntCachePolicyCreate, EntCachePolicyUpdate,
  EntCacheCluster, EntCacheClusterCreate, EntCacheClusterUpdate,
  EntSearchIndex, EntSearchIndexCreate, EntSearchIndexUpdate,
  EntSearchDocument, EntSearchDocumentCreate, EntSearchDocumentUpdate,
  EntSearchQuery, EntSearchQueryCreate, EntSearchQueryUpdate,
  EntSearchSuggestion, EntSearchSuggestionCreate, EntSearchSuggestionUpdate,
  EntSearchAnalytics, EntSearchAnalyticsCreate, EntSearchAnalyticsUpdate,
  EntGlobalSearchConfig, EntGlobalSearchConfigCreate, EntGlobalSearchConfigUpdate,
  EntElasticCluster, EntElasticClusterCreate, EntElasticClusterUpdate,
  EntIndexBuilder, EntIndexBuilderCreate, EntIndexBuilderUpdate,
  EntIncrementalIndex, EntIncrementalIndexCreate, EntIncrementalIndexUpdate,
  EntPeopleSearch, EntPeopleSearchCreate, EntPeopleSearchUpdate,
  EntSchoolSearch, EntSchoolSearchCreate, EntSchoolSearchUpdate,
  EntAnalyticsSearch, EntAnalyticsSearchCreate, EntAnalyticsSearchUpdate,
  EntSearchRelevance, EntSearchRelevanceCreate, EntSearchRelevanceUpdate,
  EntSearchSynonym, EntSearchSynonymCreate, EntSearchSynonymUpdate,
  EntZeroTrustPolicy, EntZeroTrustPolicyCreate, EntZeroTrustPolicyUpdate,
  EntAccessPolicy, EntAccessPolicyCreate, EntAccessPolicyUpdate,
  EntRole, EntRoleCreate, EntRoleUpdate,
  EntPermission, EntPermissionCreate, EntPermissionUpdate,
  EntAbacPolicy, EntAbacPolicyCreate, EntAbacPolicyUpdate,
  EntPolicyEvaluation, EntPolicyEvaluationCreate, EntPolicyEvaluationUpdate,
  EntSecretRotation, EntSecretRotationCreate, EntSecretRotationUpdate,
  EntSecurityCenter, EntSecurityCenterCreate, EntSecurityCenterUpdate,
  EntThreatDetection, EntThreatDetectionCreate, EntThreatDetectionUpdate,
  EntSecurityAudit, EntSecurityAuditCreate, EntSecurityAuditUpdate,
  EntFirewallRule, EntFirewallRuleCreate, EntFirewallRuleUpdate,
  EntIpWhitelist, EntIpWhitelistCreate, EntIpWhitelistUpdate,
  EntEncryptionKey, EntEncryptionKeyCreate, EntEncryptionKeyUpdate,
  EntSecurityIncident, EntSecurityIncidentCreate, EntSecurityIncidentUpdate,
  EntVulnerabilityScan, EntVulnerabilityScanCreate, EntVulnerabilityScanUpdate,
  EntAccessLog, EntAccessLogCreate, EntAccessLogUpdate,
  EntFailoverConfig, EntFailoverConfigCreate, EntFailoverConfigUpdate,
  EntFailoverEvent, EntFailoverEventCreate, EntFailoverEventUpdate,
  EntReplication, EntReplicationCreate, EntReplicationUpdate,
  EntGeoReplication, EntGeoReplicationCreate, EntGeoReplicationUpdate,
  EntHealthCheck, EntHealthCheckCreate, EntHealthCheckUpdate,
  EntHealthStatus, EntHealthStatusCreate, EntHealthStatusUpdate,
  EntAutoRecovery, EntAutoRecoveryCreate, EntAutoRecoveryUpdate,
  EntRecoveryAttempt, EntRecoveryAttemptCreate, EntRecoveryAttemptUpdate,
  EntBackupSchedule, EntBackupScheduleCreate, EntBackupScheduleUpdate,
  EntBackupJob, EntBackupJobCreate, EntBackupJobUpdate,
  EntDisasterRecoveryPlan, EntDisasterRecoveryPlanCreate, EntDisasterRecoveryPlanUpdate,
  EntDisasterRecoveryTest, EntDisasterRecoveryTestCreate, EntDisasterRecoveryTestUpdate,
  EntRegionConfig, EntRegionConfigCreate, EntRegionConfigUpdate,
  EntLoadBalancer, EntLoadBalancerCreate, EntLoadBalancerUpdate,
  EntDataLake, EntDataLakeCreate, EntDataLakeUpdate,
  EntDataLakeDataset, EntDataLakeDatasetCreate, EntDataLakeDatasetUpdate,
  EntDataArchive, EntDataArchiveCreate, EntDataArchiveUpdate,
  EntDataSnapshot, EntDataSnapshotCreate, EntDataSnapshotUpdate,
  EntHistoricalStorage, EntHistoricalStorageCreate, EntHistoricalStorageUpdate,
  EntDataGovernance, EntDataGovernanceCreate, EntDataGovernanceUpdate,
  EntDataLineage, EntDataLineageCreate, EntDataLineageUpdate,
  EntMetadataCatalog, EntMetadataCatalogCreate, EntMetadataCatalogUpdate,
  EntDataQuality, EntDataQualityCreate, EntDataQualityUpdate,
  EntDataPipeline, EntDataPipelineCreate, EntDataPipelineUpdate,
  EntDataRetention, EntDataRetentionCreate, EntDataRetentionUpdate,
  EntDataClassification, EntDataClassificationCreate, EntDataClassificationUpdate,
  EntDataEncryption, EntDataEncryptionCreate, EntDataEncryptionUpdate,
  EntDataAccessPolicy, EntDataAccessPolicyCreate, EntDataAccessPolicyUpdate,
  EntCiPipeline, EntCiPipelineCreate, EntCiPipelineUpdate,
  EntCiRun, EntCiRunCreate, EntCiRunUpdate,
  EntQualityGate, EntQualityGateCreate, EntQualityGateUpdate,
  EntQualityGateResult, EntQualityGateResultCreate, EntQualityGateResultUpdate,
  EntReleaseNote, EntReleaseNoteCreate, EntReleaseNoteUpdate,
  EntBuildDashboard, EntBuildDashboardCreate, EntBuildDashboardUpdate,
  EntTestDashboard, EntTestDashboardCreate, EntTestDashboardUpdate,
  EntCoverageDashboard, EntCoverageDashboardCreate, EntCoverageDashboardUpdate,
  EntCodeReview, EntCodeReviewCreate, EntCodeReviewUpdate,
  EntSecurityScan, EntSecurityScanCreate, EntSecurityScanUpdate,
  EntDependencyScan, EntDependencyScanCreate, EntDependencyScanUpdate,
  EntInfrastructureCode, EntInfrastructureCodeCreate, EntInfrastructureCodeUpdate,
  EntContainerImage, EntContainerImageCreate, EntContainerImageUpdate,
  EntHelmChart, EntHelmChartCreate, EntHelmChartUpdate,
  EntSdk, EntSdkCreate, EntSdkUpdate,
  EntSdkRelease, EntSdkReleaseCreate, EntSdkReleaseUpdate,
  EntCli, EntCliCreate, EntCliUpdate,
  EntApiDocumentation, EntApiDocumentationCreate, EntApiDocumentationUpdate,
  EntOpenApiSpec, EntOpenApiSpecCreate, EntOpenApiSpecUpdate,
  EntGraphqlSchema, EntGraphqlSchemaCreate, EntGraphqlSchemaUpdate,
  EntDeveloperPortal, EntDeveloperPortalCreate, EntDeveloperPortalUpdate,
  EntDeveloperApp, EntDeveloperAppCreate, EntDeveloperAppUpdate,
  EntSandbox, EntSandboxCreate, EntSandboxUpdate,
  EntSandboxInstance, EntSandboxInstanceCreate, EntSandboxInstanceUpdate,
  EntApiUsage, EntApiUsageCreate, EntApiUsageUpdate,
  EntWebhook, EntWebhookCreate, EntWebhookUpdate,
  EntDeveloperDocumentation, EntDeveloperDocumentationCreate, EntDeveloperDocumentationUpdate,
  EntSdkExample, EntSdkExampleCreate, EntSdkExampleUpdate,
  EntRateLimit, EntRateLimitCreate, EntRateLimitUpdate,
  EntOauthApp, EntOauthAppCreate, EntOauthAppUpdate,
  EntProductionHealthCheck, EntProductionHealthCheckCreate, EntProductionHealthCheckUpdate,
  EntDiagnosticRun, EntDiagnosticRunCreate, EntDiagnosticRunUpdate,
  EntProductionAudit, EntProductionAuditCreate, EntProductionAuditUpdate,
  EntPerformanceBenchmark, EntPerformanceBenchmarkCreate, EntPerformanceBenchmarkUpdate,
  EntSecurityBenchmark, EntSecurityBenchmarkCreate, EntSecurityBenchmarkUpdate,
  EntScalabilityBenchmark, EntScalabilityBenchmarkCreate, EntScalabilityBenchmarkUpdate,
  EntCompatibilityMatrix, EntCompatibilityMatrixCreate, EntCompatibilityMatrixUpdate,
  EntProductionCertificate, EntProductionCertificateCreate, EntProductionCertificateUpdate,
  EntLoadTest, EntLoadTestCreate, EntLoadTestUpdate,
  EntStressTest, EntStressTestCreate, EntStressTestUpdate,
  EntEnduranceTest, EntEnduranceTestCreate, EntEnduranceTestUpdate,
  EntCapacityPlan, EntCapacityPlanCreate, EntCapacityPlanUpdate,
  EntProductionRunbook, EntProductionRunbookCreate, EntProductionRunbookUpdate,
  EntIncidentPostmortem, EntIncidentPostmortemCreate, EntIncidentPostmortemUpdate,
  EntProductionChecklist, EntProductionChecklistCreate, EntProductionChecklistUpdate,
  EntGoLiveApproval, EntGoLiveApprovalCreate, EntGoLiveApprovalUpdate,
} from '@educi/types';

import {
  EntGlobalAdministrationNotFoundError,
  EntPlatformSettingNotFoundError,
  EntEnvironmentConfigNotFoundError,
  EntFeatureFlagNotFoundError,
  EntModuleRegistryNotFoundError,
  EntVersionRegistryNotFoundError,
  EntTenantRegistryNotFoundError,
  EntLicenseRegistryNotFoundError,
  EntDeploymentRegistryNotFoundError,
  EntPlatformDashboardNotFoundError,
  EntPlatformMetricNotFoundError,
  EntPlatformAlertNotFoundError,
  EntPlatformAuditNotFoundError,
  EntPlatformBackupNotFoundError,
  EntPlatformEventNotFoundError,
  EntPlatformConfigNotFoundError,
  EntPlatformWebhookNotFoundError,
  EntPlatformApiKeyNotFoundError,
  EntTenantNotFoundError,
  EntTenantIsolationNotFoundError,
  EntTenantMigrationNotFoundError,
  EntTenantBackupConfigNotFoundError,
  EntTenantRestoreNotFoundError,
  EntTenantArchiveNotFoundError,
  EntTenantCloneNotFoundError,
  EntTenantMergeNotFoundError,
  EntTenantSplitNotFoundError,
  EntTenantMonitoringNotFoundError,
  EntTenantAnalyticsNotFoundError,
  EntTenantQuotaNotFoundError,
  EntTenantBillingNotFoundError,
  EntTenantFeatureNotFoundError,
  EntTenantSsoNotFoundError,
  EntTenantCustomDomainNotFoundError,
  EntReleasePipelineNotFoundError,
  EntPipelineStageNotFoundError,
  EntPipelineRunNotFoundError,
  EntVersionManagerNotFoundError,
  EntBlueGreenDeploymentNotFoundError,
  EntCanaryDeploymentNotFoundError,
  EntRollbackNotFoundError,
  EntMigrationManagerNotFoundError,
  EntEnvironmentPromotionNotFoundError,
  EntDeploymentHistoryNotFoundError,
  EntFeatureDeploymentNotFoundError,
  EntConfigDeploymentNotFoundError,
  EntInfrastructureChangeNotFoundError,
  EntDeploymentApprovalNotFoundError,
  EntDistributedTraceNotFoundError,
  EntTraceSpanNotFoundError,
  EntStructuredLogNotFoundError,
  EntMetricNotFoundError,
  EntPerformanceDashboardNotFoundError,
  EntErrorDashboardNotFoundError,
  EntSlowQueryNotFoundError,
  EntAlertRuleNotFoundError,
  EntAlertIncidentNotFoundError,
  EntSloNotFoundError,
  EntSlaNotFoundError,
  EntServiceHealthNotFoundError,
  EntLogAggregationNotFoundError,
  EntMetricsAggregationNotFoundError,
  EntAlertEscalationNotFoundError,
  EntPerformanceBaselineNotFoundError,
  EntRedisClusterNotFoundError,
  EntCacheLayerNotFoundError,
  EntCacheEntryNotFoundError,
  EntDistributedCacheNotFoundError,
  EntQueryCacheNotFoundError,
  EntApiCacheNotFoundError,
  EntCacheInvalidationNotFoundError,
  EntCacheMetricsNotFoundError,
  EntCacheWarmerNotFoundError,
  EntCacheSnapshotNotFoundError,
  EntCachePolicyNotFoundError,
  EntCacheClusterNotFoundError,
  EntSearchIndexNotFoundError,
  EntSearchDocumentNotFoundError,
  EntSearchQueryNotFoundError,
  EntSearchSuggestionNotFoundError,
  EntSearchAnalyticsNotFoundError,
  EntGlobalSearchConfigNotFoundError,
  EntElasticClusterNotFoundError,
  EntIndexBuilderNotFoundError,
  EntIncrementalIndexNotFoundError,
  EntPeopleSearchNotFoundError,
  EntSchoolSearchNotFoundError,
  EntAnalyticsSearchNotFoundError,
  EntSearchRelevanceNotFoundError,
  EntSearchSynonymNotFoundError,
  EntZeroTrustPolicyNotFoundError,
  EntAccessPolicyNotFoundError,
  EntRoleNotFoundError,
  EntPermissionNotFoundError,
  EntAbacPolicyNotFoundError,
  EntPolicyEvaluationNotFoundError,
  EntSecretRotationNotFoundError,
  EntSecurityCenterNotFoundError,
  EntThreatDetectionNotFoundError,
  EntSecurityAuditNotFoundError,
  EntFirewallRuleNotFoundError,
  EntIpWhitelistNotFoundError,
  EntEncryptionKeyNotFoundError,
  EntSecurityIncidentNotFoundError,
  EntVulnerabilityScanNotFoundError,
  EntAccessLogNotFoundError,
  EntFailoverConfigNotFoundError,
  EntFailoverEventNotFoundError,
  EntReplicationNotFoundError,
  EntGeoReplicationNotFoundError,
  EntHealthCheckNotFoundError,
  EntHealthStatusNotFoundError,
  EntAutoRecoveryNotFoundError,
  EntRecoveryAttemptNotFoundError,
  EntBackupScheduleNotFoundError,
  EntBackupJobNotFoundError,
  EntDisasterRecoveryPlanNotFoundError,
  EntDisasterRecoveryTestNotFoundError,
  EntRegionConfigNotFoundError,
  EntLoadBalancerNotFoundError,
  EntDataLakeNotFoundError,
  EntDataLakeDatasetNotFoundError,
  EntDataArchiveNotFoundError,
  EntDataSnapshotNotFoundError,
  EntHistoricalStorageNotFoundError,
  EntDataGovernanceNotFoundError,
  EntDataLineageNotFoundError,
  EntMetadataCatalogNotFoundError,
  EntDataQualityNotFoundError,
  EntDataPipelineNotFoundError,
  EntDataRetentionNotFoundError,
  EntDataClassificationNotFoundError,
  EntDataEncryptionNotFoundError,
  EntDataAccessPolicyNotFoundError,
  EntCiPipelineNotFoundError,
  EntCiRunNotFoundError,
  EntQualityGateNotFoundError,
  EntQualityGateResultNotFoundError,
  EntReleaseNoteNotFoundError,
  EntBuildDashboardNotFoundError,
  EntTestDashboardNotFoundError,
  EntCoverageDashboardNotFoundError,
  EntCodeReviewNotFoundError,
  EntSecurityScanNotFoundError,
  EntDependencyScanNotFoundError,
  EntInfrastructureCodeNotFoundError,
  EntContainerImageNotFoundError,
  EntHelmChartNotFoundError,
  EntSdkNotFoundError,
  EntSdkReleaseNotFoundError,
  EntCliNotFoundError,
  EntApiDocumentationNotFoundError,
  EntOpenApiSpecNotFoundError,
  EntGraphqlSchemaNotFoundError,
  EntDeveloperPortalNotFoundError,
  EntDeveloperAppNotFoundError,
  EntSandboxNotFoundError,
  EntSandboxInstanceNotFoundError,
  EntApiUsageNotFoundError,
  EntWebhookNotFoundError,
  EntDeveloperDocumentationNotFoundError,
  EntSdkExampleNotFoundError,
  EntRateLimitNotFoundError,
  EntOauthAppNotFoundError,
  EntProductionHealthCheckNotFoundError,
  EntDiagnosticRunNotFoundError,
  EntProductionAuditNotFoundError,
  EntPerformanceBenchmarkNotFoundError,
  EntSecurityBenchmarkNotFoundError,
  EntScalabilityBenchmarkNotFoundError,
  EntCompatibilityMatrixNotFoundError,
  EntProductionCertificateNotFoundError,
  EntLoadTestNotFoundError,
  EntStressTestNotFoundError,
  EntEnduranceTestNotFoundError,
  EntCapacityPlanNotFoundError,
  EntProductionRunbookNotFoundError,
  EntIncidentPostmortemNotFoundError,
  EntProductionChecklistNotFoundError,
  EntGoLiveApprovalNotFoundError,
} from '@educi/errors';

export class EnterprisePlatformRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  // --- GlobalAdministration -----------------------------------------------------
  async findGlobalAdministrationById(schoolId: string, id: string): Promise<EntGlobalAdministration> {
    const { data, error } = await this.supabase.from('ent_global_administrations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntGlobalAdministrationNotFoundError(id);
    return data;
  }

  async findAllGlobalAdministrations(schoolId: string): Promise<EntGlobalAdministration[]> {
    const { data, error } = await this.supabase.from('ent_global_administrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createGlobalAdministration(schoolId: string, data: EntGlobalAdministrationCreate): Promise<EntGlobalAdministration> {
    const { data: result, error } = await this.supabase.from('ent_global_administrations').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateGlobalAdministration(schoolId: string, id: string, data: EntGlobalAdministrationUpdate): Promise<EntGlobalAdministration> {
    const { data: result, error } = await this.supabase.from('ent_global_administrations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntGlobalAdministrationNotFoundError(id);
    return result;
  }

  async deleteGlobalAdministration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_global_administrations').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countGlobalAdministrations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_global_administrations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findGlobalAdministrationByStatus(schoolId: string, status: string): Promise<EntGlobalAdministration[]> {
    const { data, error } = await this.supabase.from('ent_global_administrations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveGlobalAdministrations(schoolId: string): Promise<EntGlobalAdministration[]> {
    const { data, error } = await this.supabase.from('ent_global_administrations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findGlobalAdministrationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntGlobalAdministration[]> {
    const { data, error } = await this.supabase.from('ent_global_administrations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findGlobalAdministrationByDateRange(schoolId: string, start: string, end: string): Promise<EntGlobalAdministration[]> {
    const { data, error } = await this.supabase.from('ent_global_administrations').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PlatformSetting -----------------------------------------------------
  async findPlatformSettingById(schoolId: string, id: string): Promise<EntPlatformSetting> {
    const { data, error } = await this.supabase.from('ent_platform_settings').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPlatformSettingNotFoundError(id);
    return data;
  }

  async findAllPlatformSettings(schoolId: string): Promise<EntPlatformSetting[]> {
    const { data, error } = await this.supabase.from('ent_platform_settings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPlatformSetting(schoolId: string, data: EntPlatformSettingCreate): Promise<EntPlatformSetting> {
    const { data: result, error } = await this.supabase.from('ent_platform_settings').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePlatformSetting(schoolId: string, id: string, data: EntPlatformSettingUpdate): Promise<EntPlatformSetting> {
    const { data: result, error } = await this.supabase.from('ent_platform_settings').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPlatformSettingNotFoundError(id);
    return result;
  }

  async deletePlatformSetting(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_platform_settings').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPlatformSettings(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_platform_settings').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPlatformSettingByStatus(schoolId: string, status: string): Promise<EntPlatformSetting[]> {
    const { data, error } = await this.supabase.from('ent_platform_settings').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePlatformSettings(schoolId: string): Promise<EntPlatformSetting[]> {
    const { data, error } = await this.supabase.from('ent_platform_settings').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformSettingBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPlatformSetting[]> {
    const { data, error } = await this.supabase.from('ent_platform_settings').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformSettingByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformSetting[]> {
    const { data, error } = await this.supabase.from('ent_platform_settings').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- EnvironmentConfig -----------------------------------------------------
  async findEnvironmentConfigById(schoolId: string, id: string): Promise<EntEnvironmentConfig> {
    const { data, error } = await this.supabase.from('ent_environment_configs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntEnvironmentConfigNotFoundError(id);
    return data;
  }

  async findAllEnvironmentConfigs(schoolId: string): Promise<EntEnvironmentConfig[]> {
    const { data, error } = await this.supabase.from('ent_environment_configs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createEnvironmentConfig(schoolId: string, data: EntEnvironmentConfigCreate): Promise<EntEnvironmentConfig> {
    const { data: result, error } = await this.supabase.from('ent_environment_configs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateEnvironmentConfig(schoolId: string, id: string, data: EntEnvironmentConfigUpdate): Promise<EntEnvironmentConfig> {
    const { data: result, error } = await this.supabase.from('ent_environment_configs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntEnvironmentConfigNotFoundError(id);
    return result;
  }

  async deleteEnvironmentConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_environment_configs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEnvironmentConfigs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_environment_configs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findEnvironmentConfigByStatus(schoolId: string, status: string): Promise<EntEnvironmentConfig[]> {
    const { data, error } = await this.supabase.from('ent_environment_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveEnvironmentConfigs(schoolId: string): Promise<EntEnvironmentConfig[]> {
    const { data, error } = await this.supabase.from('ent_environment_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findEnvironmentConfigBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntEnvironmentConfig[]> {
    const { data, error } = await this.supabase.from('ent_environment_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findEnvironmentConfigByDateRange(schoolId: string, start: string, end: string): Promise<EntEnvironmentConfig[]> {
    const { data, error } = await this.supabase.from('ent_environment_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- FeatureFlag -----------------------------------------------------
  async findFeatureFlagById(schoolId: string, id: string): Promise<EntFeatureFlag> {
    const { data, error } = await this.supabase.from('ent_feature_flags').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntFeatureFlagNotFoundError(id);
    return data;
  }

  async findAllFeatureFlags(schoolId: string): Promise<EntFeatureFlag[]> {
    const { data, error } = await this.supabase.from('ent_feature_flags').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createFeatureFlag(schoolId: string, data: EntFeatureFlagCreate): Promise<EntFeatureFlag> {
    const { data: result, error } = await this.supabase.from('ent_feature_flags').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateFeatureFlag(schoolId: string, id: string, data: EntFeatureFlagUpdate): Promise<EntFeatureFlag> {
    const { data: result, error } = await this.supabase.from('ent_feature_flags').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntFeatureFlagNotFoundError(id);
    return result;
  }

  async deleteFeatureFlag(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_feature_flags').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countFeatureFlags(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_feature_flags').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findFeatureFlagByStatus(schoolId: string, status: string): Promise<EntFeatureFlag[]> {
    const { data, error } = await this.supabase.from('ent_feature_flags').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveFeatureFlags(schoolId: string): Promise<EntFeatureFlag[]> {
    const { data, error } = await this.supabase.from('ent_feature_flags').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findFeatureFlagBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntFeatureFlag[]> {
    const { data, error } = await this.supabase.from('ent_feature_flags').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findFeatureFlagByDateRange(schoolId: string, start: string, end: string): Promise<EntFeatureFlag[]> {
    const { data, error } = await this.supabase.from('ent_feature_flags').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ModuleRegistry -----------------------------------------------------
  async findModuleRegistryById(schoolId: string, id: string): Promise<EntModuleRegistry> {
    const { data, error } = await this.supabase.from('ent_module_registries').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntModuleRegistryNotFoundError(id);
    return data;
  }

  async findAllModuleRegistrys(schoolId: string): Promise<EntModuleRegistry[]> {
    const { data, error } = await this.supabase.from('ent_module_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createModuleRegistry(schoolId: string, data: EntModuleRegistryCreate): Promise<EntModuleRegistry> {
    const { data: result, error } = await this.supabase.from('ent_module_registries').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateModuleRegistry(schoolId: string, id: string, data: EntModuleRegistryUpdate): Promise<EntModuleRegistry> {
    const { data: result, error } = await this.supabase.from('ent_module_registries').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntModuleRegistryNotFoundError(id);
    return result;
  }

  async deleteModuleRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_module_registries').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countModuleRegistrys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_module_registries').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findModuleRegistryByStatus(schoolId: string, status: string): Promise<EntModuleRegistry[]> {
    const { data, error } = await this.supabase.from('ent_module_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveModuleRegistrys(schoolId: string): Promise<EntModuleRegistry[]> {
    const { data, error } = await this.supabase.from('ent_module_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findModuleRegistryBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntModuleRegistry[]> {
    const { data, error } = await this.supabase.from('ent_module_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findModuleRegistryByDateRange(schoolId: string, start: string, end: string): Promise<EntModuleRegistry[]> {
    const { data, error } = await this.supabase.from('ent_module_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- VersionRegistry -----------------------------------------------------
  async findVersionRegistryById(schoolId: string, id: string): Promise<EntVersionRegistry> {
    const { data, error } = await this.supabase.from('ent_version_registries').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntVersionRegistryNotFoundError(id);
    return data;
  }

  async findAllVersionRegistrys(schoolId: string): Promise<EntVersionRegistry[]> {
    const { data, error } = await this.supabase.from('ent_version_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createVersionRegistry(schoolId: string, data: EntVersionRegistryCreate): Promise<EntVersionRegistry> {
    const { data: result, error } = await this.supabase.from('ent_version_registries').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateVersionRegistry(schoolId: string, id: string, data: EntVersionRegistryUpdate): Promise<EntVersionRegistry> {
    const { data: result, error } = await this.supabase.from('ent_version_registries').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntVersionRegistryNotFoundError(id);
    return result;
  }

  async deleteVersionRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_version_registries').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countVersionRegistrys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_version_registries').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findVersionRegistryByStatus(schoolId: string, status: string): Promise<EntVersionRegistry[]> {
    const { data, error } = await this.supabase.from('ent_version_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveVersionRegistrys(schoolId: string): Promise<EntVersionRegistry[]> {
    const { data, error } = await this.supabase.from('ent_version_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findVersionRegistryBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntVersionRegistry[]> {
    const { data, error } = await this.supabase.from('ent_version_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findVersionRegistryByDateRange(schoolId: string, start: string, end: string): Promise<EntVersionRegistry[]> {
    const { data, error } = await this.supabase.from('ent_version_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantRegistry -----------------------------------------------------
  async findTenantRegistryById(schoolId: string, id: string): Promise<EntTenantRegistry> {
    const { data, error } = await this.supabase.from('ent_tenant_registries').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantRegistryNotFoundError(id);
    return data;
  }

  async findAllTenantRegistrys(schoolId: string): Promise<EntTenantRegistry[]> {
    const { data, error } = await this.supabase.from('ent_tenant_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantRegistry(schoolId: string, data: EntTenantRegistryCreate): Promise<EntTenantRegistry> {
    const { data: result, error } = await this.supabase.from('ent_tenant_registries').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantRegistry(schoolId: string, id: string, data: EntTenantRegistryUpdate): Promise<EntTenantRegistry> {
    const { data: result, error } = await this.supabase.from('ent_tenant_registries').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantRegistryNotFoundError(id);
    return result;
  }

  async deleteTenantRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_registries').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantRegistrys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_registries').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantRegistryByStatus(schoolId: string, status: string): Promise<EntTenantRegistry[]> {
    const { data, error } = await this.supabase.from('ent_tenant_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantRegistrys(schoolId: string): Promise<EntTenantRegistry[]> {
    const { data, error } = await this.supabase.from('ent_tenant_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantRegistryBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantRegistry[]> {
    const { data, error } = await this.supabase.from('ent_tenant_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantRegistryByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantRegistry[]> {
    const { data, error } = await this.supabase.from('ent_tenant_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- LicenseRegistry -----------------------------------------------------
  async findLicenseRegistryById(schoolId: string, id: string): Promise<EntLicenseRegistry> {
    const { data, error } = await this.supabase.from('ent_license_registries').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntLicenseRegistryNotFoundError(id);
    return data;
  }

  async findAllLicenseRegistrys(schoolId: string): Promise<EntLicenseRegistry[]> {
    const { data, error } = await this.supabase.from('ent_license_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createLicenseRegistry(schoolId: string, data: EntLicenseRegistryCreate): Promise<EntLicenseRegistry> {
    const { data: result, error } = await this.supabase.from('ent_license_registries').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateLicenseRegistry(schoolId: string, id: string, data: EntLicenseRegistryUpdate): Promise<EntLicenseRegistry> {
    const { data: result, error } = await this.supabase.from('ent_license_registries').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntLicenseRegistryNotFoundError(id);
    return result;
  }

  async deleteLicenseRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_license_registries').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countLicenseRegistrys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_license_registries').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findLicenseRegistryByStatus(schoolId: string, status: string): Promise<EntLicenseRegistry[]> {
    const { data, error } = await this.supabase.from('ent_license_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveLicenseRegistrys(schoolId: string): Promise<EntLicenseRegistry[]> {
    const { data, error } = await this.supabase.from('ent_license_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findLicenseRegistryBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntLicenseRegistry[]> {
    const { data, error } = await this.supabase.from('ent_license_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findLicenseRegistryByDateRange(schoolId: string, start: string, end: string): Promise<EntLicenseRegistry[]> {
    const { data, error } = await this.supabase.from('ent_license_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DeploymentRegistry -----------------------------------------------------
  async findDeploymentRegistryById(schoolId: string, id: string): Promise<EntDeploymentRegistry> {
    const { data, error } = await this.supabase.from('ent_deployment_registries').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDeploymentRegistryNotFoundError(id);
    return data;
  }

  async findAllDeploymentRegistrys(schoolId: string): Promise<EntDeploymentRegistry[]> {
    const { data, error } = await this.supabase.from('ent_deployment_registries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDeploymentRegistry(schoolId: string, data: EntDeploymentRegistryCreate): Promise<EntDeploymentRegistry> {
    const { data: result, error } = await this.supabase.from('ent_deployment_registries').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDeploymentRegistry(schoolId: string, id: string, data: EntDeploymentRegistryUpdate): Promise<EntDeploymentRegistry> {
    const { data: result, error } = await this.supabase.from('ent_deployment_registries').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDeploymentRegistryNotFoundError(id);
    return result;
  }

  async deleteDeploymentRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_deployment_registries').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDeploymentRegistrys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_deployment_registries').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDeploymentRegistryByStatus(schoolId: string, status: string): Promise<EntDeploymentRegistry[]> {
    const { data, error } = await this.supabase.from('ent_deployment_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDeploymentRegistrys(schoolId: string): Promise<EntDeploymentRegistry[]> {
    const { data, error } = await this.supabase.from('ent_deployment_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDeploymentRegistryBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDeploymentRegistry[]> {
    const { data, error } = await this.supabase.from('ent_deployment_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDeploymentRegistryByDateRange(schoolId: string, start: string, end: string): Promise<EntDeploymentRegistry[]> {
    const { data, error } = await this.supabase.from('ent_deployment_registries').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PlatformDashboard -----------------------------------------------------
  async findPlatformDashboardById(schoolId: string, id: string): Promise<EntPlatformDashboard> {
    const { data, error } = await this.supabase.from('ent_platform_dashboards').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPlatformDashboardNotFoundError(id);
    return data;
  }

  async findAllPlatformDashboards(schoolId: string): Promise<EntPlatformDashboard[]> {
    const { data, error } = await this.supabase.from('ent_platform_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPlatformDashboard(schoolId: string, data: EntPlatformDashboardCreate): Promise<EntPlatformDashboard> {
    const { data: result, error } = await this.supabase.from('ent_platform_dashboards').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePlatformDashboard(schoolId: string, id: string, data: EntPlatformDashboardUpdate): Promise<EntPlatformDashboard> {
    const { data: result, error } = await this.supabase.from('ent_platform_dashboards').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPlatformDashboardNotFoundError(id);
    return result;
  }

  async deletePlatformDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_platform_dashboards').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPlatformDashboards(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_platform_dashboards').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPlatformDashboardByStatus(schoolId: string, status: string): Promise<EntPlatformDashboard[]> {
    const { data, error } = await this.supabase.from('ent_platform_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePlatformDashboards(schoolId: string): Promise<EntPlatformDashboard[]> {
    const { data, error } = await this.supabase.from('ent_platform_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformDashboardBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPlatformDashboard[]> {
    const { data, error } = await this.supabase.from('ent_platform_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformDashboardByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformDashboard[]> {
    const { data, error } = await this.supabase.from('ent_platform_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PlatformMetric -----------------------------------------------------
  async findPlatformMetricById(schoolId: string, id: string): Promise<EntPlatformMetric> {
    const { data, error } = await this.supabase.from('ent_platform_metrics').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPlatformMetricNotFoundError(id);
    return data;
  }

  async findAllPlatformMetrics(schoolId: string): Promise<EntPlatformMetric[]> {
    const { data, error } = await this.supabase.from('ent_platform_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPlatformMetric(schoolId: string, data: EntPlatformMetricCreate): Promise<EntPlatformMetric> {
    const { data: result, error } = await this.supabase.from('ent_platform_metrics').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePlatformMetric(schoolId: string, id: string, data: EntPlatformMetricUpdate): Promise<EntPlatformMetric> {
    const { data: result, error } = await this.supabase.from('ent_platform_metrics').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPlatformMetricNotFoundError(id);
    return result;
  }

  async deletePlatformMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_platform_metrics').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPlatformMetrics(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_platform_metrics').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPlatformMetricByStatus(schoolId: string, status: string): Promise<EntPlatformMetric[]> {
    const { data, error } = await this.supabase.from('ent_platform_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePlatformMetrics(schoolId: string): Promise<EntPlatformMetric[]> {
    const { data, error } = await this.supabase.from('ent_platform_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformMetricBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPlatformMetric[]> {
    const { data, error } = await this.supabase.from('ent_platform_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformMetricByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformMetric[]> {
    const { data, error } = await this.supabase.from('ent_platform_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PlatformAlert -----------------------------------------------------
  async findPlatformAlertById(schoolId: string, id: string): Promise<EntPlatformAlert> {
    const { data, error } = await this.supabase.from('ent_platform_alerts').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPlatformAlertNotFoundError(id);
    return data;
  }

  async findAllPlatformAlerts(schoolId: string): Promise<EntPlatformAlert[]> {
    const { data, error } = await this.supabase.from('ent_platform_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPlatformAlert(schoolId: string, data: EntPlatformAlertCreate): Promise<EntPlatformAlert> {
    const { data: result, error } = await this.supabase.from('ent_platform_alerts').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePlatformAlert(schoolId: string, id: string, data: EntPlatformAlertUpdate): Promise<EntPlatformAlert> {
    const { data: result, error } = await this.supabase.from('ent_platform_alerts').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPlatformAlertNotFoundError(id);
    return result;
  }

  async deletePlatformAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_platform_alerts').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPlatformAlerts(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_platform_alerts').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPlatformAlertByStatus(schoolId: string, status: string): Promise<EntPlatformAlert[]> {
    const { data, error } = await this.supabase.from('ent_platform_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePlatformAlerts(schoolId: string): Promise<EntPlatformAlert[]> {
    const { data, error } = await this.supabase.from('ent_platform_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformAlertBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPlatformAlert[]> {
    const { data, error } = await this.supabase.from('ent_platform_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformAlertByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformAlert[]> {
    const { data, error } = await this.supabase.from('ent_platform_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PlatformAudit -----------------------------------------------------
  async findPlatformAuditById(schoolId: string, id: string): Promise<EntPlatformAudit> {
    const { data, error } = await this.supabase.from('ent_platform_audits').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPlatformAuditNotFoundError(id);
    return data;
  }

  async findAllPlatformAudits(schoolId: string): Promise<EntPlatformAudit[]> {
    const { data, error } = await this.supabase.from('ent_platform_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPlatformAudit(schoolId: string, data: EntPlatformAuditCreate): Promise<EntPlatformAudit> {
    const { data: result, error } = await this.supabase.from('ent_platform_audits').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePlatformAudit(schoolId: string, id: string, data: EntPlatformAuditUpdate): Promise<EntPlatformAudit> {
    const { data: result, error } = await this.supabase.from('ent_platform_audits').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPlatformAuditNotFoundError(id);
    return result;
  }

  async deletePlatformAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_platform_audits').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPlatformAudits(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_platform_audits').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPlatformAuditByStatus(schoolId: string, status: string): Promise<EntPlatformAudit[]> {
    const { data, error } = await this.supabase.from('ent_platform_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePlatformAudits(schoolId: string): Promise<EntPlatformAudit[]> {
    const { data, error } = await this.supabase.from('ent_platform_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformAuditBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPlatformAudit[]> {
    const { data, error } = await this.supabase.from('ent_platform_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformAuditByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformAudit[]> {
    const { data, error } = await this.supabase.from('ent_platform_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PlatformBackup -----------------------------------------------------
  async findPlatformBackupById(schoolId: string, id: string): Promise<EntPlatformBackup> {
    const { data, error } = await this.supabase.from('ent_platform_backups').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPlatformBackupNotFoundError(id);
    return data;
  }

  async findAllPlatformBackups(schoolId: string): Promise<EntPlatformBackup[]> {
    const { data, error } = await this.supabase.from('ent_platform_backups').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPlatformBackup(schoolId: string, data: EntPlatformBackupCreate): Promise<EntPlatformBackup> {
    const { data: result, error } = await this.supabase.from('ent_platform_backups').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePlatformBackup(schoolId: string, id: string, data: EntPlatformBackupUpdate): Promise<EntPlatformBackup> {
    const { data: result, error } = await this.supabase.from('ent_platform_backups').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPlatformBackupNotFoundError(id);
    return result;
  }

  async deletePlatformBackup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_platform_backups').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPlatformBackups(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_platform_backups').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPlatformBackupByStatus(schoolId: string, status: string): Promise<EntPlatformBackup[]> {
    const { data, error } = await this.supabase.from('ent_platform_backups').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePlatformBackups(schoolId: string): Promise<EntPlatformBackup[]> {
    const { data, error } = await this.supabase.from('ent_platform_backups').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformBackupBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPlatformBackup[]> {
    const { data, error } = await this.supabase.from('ent_platform_backups').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformBackupByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformBackup[]> {
    const { data, error } = await this.supabase.from('ent_platform_backups').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PlatformEvent -----------------------------------------------------
  async findPlatformEventById(schoolId: string, id: string): Promise<EntPlatformEvent> {
    const { data, error } = await this.supabase.from('ent_platform_events').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPlatformEventNotFoundError(id);
    return data;
  }

  async findAllPlatformEvents(schoolId: string): Promise<EntPlatformEvent[]> {
    const { data, error } = await this.supabase.from('ent_platform_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPlatformEvent(schoolId: string, data: EntPlatformEventCreate): Promise<EntPlatformEvent> {
    const { data: result, error } = await this.supabase.from('ent_platform_events').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePlatformEvent(schoolId: string, id: string, data: EntPlatformEventUpdate): Promise<EntPlatformEvent> {
    const { data: result, error } = await this.supabase.from('ent_platform_events').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPlatformEventNotFoundError(id);
    return result;
  }

  async deletePlatformEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_platform_events').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPlatformEvents(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_platform_events').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPlatformEventByStatus(schoolId: string, status: string): Promise<EntPlatformEvent[]> {
    const { data, error } = await this.supabase.from('ent_platform_events').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePlatformEvents(schoolId: string): Promise<EntPlatformEvent[]> {
    const { data, error } = await this.supabase.from('ent_platform_events').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformEventBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPlatformEvent[]> {
    const { data, error } = await this.supabase.from('ent_platform_events').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformEventByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformEvent[]> {
    const { data, error } = await this.supabase.from('ent_platform_events').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PlatformConfig -----------------------------------------------------
  async findPlatformConfigById(schoolId: string, id: string): Promise<EntPlatformConfig> {
    const { data, error } = await this.supabase.from('ent_platform_configs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPlatformConfigNotFoundError(id);
    return data;
  }

  async findAllPlatformConfigs(schoolId: string): Promise<EntPlatformConfig[]> {
    const { data, error } = await this.supabase.from('ent_platform_configs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPlatformConfig(schoolId: string, data: EntPlatformConfigCreate): Promise<EntPlatformConfig> {
    const { data: result, error } = await this.supabase.from('ent_platform_configs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePlatformConfig(schoolId: string, id: string, data: EntPlatformConfigUpdate): Promise<EntPlatformConfig> {
    const { data: result, error } = await this.supabase.from('ent_platform_configs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPlatformConfigNotFoundError(id);
    return result;
  }

  async deletePlatformConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_platform_configs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPlatformConfigs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_platform_configs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPlatformConfigByStatus(schoolId: string, status: string): Promise<EntPlatformConfig[]> {
    const { data, error } = await this.supabase.from('ent_platform_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePlatformConfigs(schoolId: string): Promise<EntPlatformConfig[]> {
    const { data, error } = await this.supabase.from('ent_platform_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformConfigBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPlatformConfig[]> {
    const { data, error } = await this.supabase.from('ent_platform_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformConfigByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformConfig[]> {
    const { data, error } = await this.supabase.from('ent_platform_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PlatformWebhook -----------------------------------------------------
  async findPlatformWebhookById(schoolId: string, id: string): Promise<EntPlatformWebhook> {
    const { data, error } = await this.supabase.from('ent_platform_webhooks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPlatformWebhookNotFoundError(id);
    return data;
  }

  async findAllPlatformWebhooks(schoolId: string): Promise<EntPlatformWebhook[]> {
    const { data, error } = await this.supabase.from('ent_platform_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPlatformWebhook(schoolId: string, data: EntPlatformWebhookCreate): Promise<EntPlatformWebhook> {
    const { data: result, error } = await this.supabase.from('ent_platform_webhooks').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePlatformWebhook(schoolId: string, id: string, data: EntPlatformWebhookUpdate): Promise<EntPlatformWebhook> {
    const { data: result, error } = await this.supabase.from('ent_platform_webhooks').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPlatformWebhookNotFoundError(id);
    return result;
  }

  async deletePlatformWebhook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_platform_webhooks').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPlatformWebhooks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_platform_webhooks').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPlatformWebhookByStatus(schoolId: string, status: string): Promise<EntPlatformWebhook[]> {
    const { data, error } = await this.supabase.from('ent_platform_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePlatformWebhooks(schoolId: string): Promise<EntPlatformWebhook[]> {
    const { data, error } = await this.supabase.from('ent_platform_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformWebhookBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPlatformWebhook[]> {
    const { data, error } = await this.supabase.from('ent_platform_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformWebhookByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformWebhook[]> {
    const { data, error } = await this.supabase.from('ent_platform_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PlatformApiKey -----------------------------------------------------
  async findPlatformApiKeyById(schoolId: string, id: string): Promise<EntPlatformApiKey> {
    const { data, error } = await this.supabase.from('ent_platform_api_keys').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPlatformApiKeyNotFoundError(id);
    return data;
  }

  async findAllPlatformApiKeys(schoolId: string): Promise<EntPlatformApiKey[]> {
    const { data, error } = await this.supabase.from('ent_platform_api_keys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPlatformApiKey(schoolId: string, data: EntPlatformApiKeyCreate): Promise<EntPlatformApiKey> {
    const { data: result, error } = await this.supabase.from('ent_platform_api_keys').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePlatformApiKey(schoolId: string, id: string, data: EntPlatformApiKeyUpdate): Promise<EntPlatformApiKey> {
    const { data: result, error } = await this.supabase.from('ent_platform_api_keys').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPlatformApiKeyNotFoundError(id);
    return result;
  }

  async deletePlatformApiKey(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_platform_api_keys').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPlatformApiKeys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_platform_api_keys').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPlatformApiKeyByStatus(schoolId: string, status: string): Promise<EntPlatformApiKey[]> {
    const { data, error } = await this.supabase.from('ent_platform_api_keys').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePlatformApiKeys(schoolId: string): Promise<EntPlatformApiKey[]> {
    const { data, error } = await this.supabase.from('ent_platform_api_keys').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformApiKeyBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPlatformApiKey[]> {
    const { data, error } = await this.supabase.from('ent_platform_api_keys').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPlatformApiKeyByDateRange(schoolId: string, start: string, end: string): Promise<EntPlatformApiKey[]> {
    const { data, error } = await this.supabase.from('ent_platform_api_keys').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Tenant -----------------------------------------------------
  async findTenantById(schoolId: string, id: string): Promise<EntTenant> {
    const { data, error } = await this.supabase.from('ent_tenants').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantNotFoundError(id);
    return data;
  }

  async findAllTenants(schoolId: string): Promise<EntTenant[]> {
    const { data, error } = await this.supabase.from('ent_tenants').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenant(schoolId: string, data: EntTenantCreate): Promise<EntTenant> {
    const { data: result, error } = await this.supabase.from('ent_tenants').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenant(schoolId: string, id: string, data: EntTenantUpdate): Promise<EntTenant> {
    const { data: result, error } = await this.supabase.from('ent_tenants').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantNotFoundError(id);
    return result;
  }

  async deleteTenant(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenants').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenants(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenants').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantByStatus(schoolId: string, status: string): Promise<EntTenant[]> {
    const { data, error } = await this.supabase.from('ent_tenants').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenants(schoolId: string): Promise<EntTenant[]> {
    const { data, error } = await this.supabase.from('ent_tenants').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenant[]> {
    const { data, error } = await this.supabase.from('ent_tenants').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantByDateRange(schoolId: string, start: string, end: string): Promise<EntTenant[]> {
    const { data, error } = await this.supabase.from('ent_tenants').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantIsolation -----------------------------------------------------
  async findTenantIsolationById(schoolId: string, id: string): Promise<EntTenantIsolation> {
    const { data, error } = await this.supabase.from('ent_tenant_isolations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantIsolationNotFoundError(id);
    return data;
  }

  async findAllTenantIsolations(schoolId: string): Promise<EntTenantIsolation[]> {
    const { data, error } = await this.supabase.from('ent_tenant_isolations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantIsolation(schoolId: string, data: EntTenantIsolationCreate): Promise<EntTenantIsolation> {
    const { data: result, error } = await this.supabase.from('ent_tenant_isolations').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantIsolation(schoolId: string, id: string, data: EntTenantIsolationUpdate): Promise<EntTenantIsolation> {
    const { data: result, error } = await this.supabase.from('ent_tenant_isolations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantIsolationNotFoundError(id);
    return result;
  }

  async deleteTenantIsolation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_isolations').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantIsolations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_isolations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantIsolationByStatus(schoolId: string, status: string): Promise<EntTenantIsolation[]> {
    const { data, error } = await this.supabase.from('ent_tenant_isolations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantIsolations(schoolId: string): Promise<EntTenantIsolation[]> {
    const { data, error } = await this.supabase.from('ent_tenant_isolations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantIsolationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantIsolation[]> {
    const { data, error } = await this.supabase.from('ent_tenant_isolations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantIsolationByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantIsolation[]> {
    const { data, error } = await this.supabase.from('ent_tenant_isolations').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantMigration -----------------------------------------------------
  async findTenantMigrationById(schoolId: string, id: string): Promise<EntTenantMigration> {
    const { data, error } = await this.supabase.from('ent_tenant_migrations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantMigrationNotFoundError(id);
    return data;
  }

  async findAllTenantMigrations(schoolId: string): Promise<EntTenantMigration[]> {
    const { data, error } = await this.supabase.from('ent_tenant_migrations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantMigration(schoolId: string, data: EntTenantMigrationCreate): Promise<EntTenantMigration> {
    const { data: result, error } = await this.supabase.from('ent_tenant_migrations').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantMigration(schoolId: string, id: string, data: EntTenantMigrationUpdate): Promise<EntTenantMigration> {
    const { data: result, error } = await this.supabase.from('ent_tenant_migrations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantMigrationNotFoundError(id);
    return result;
  }

  async deleteTenantMigration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_migrations').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantMigrations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_migrations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantMigrationByStatus(schoolId: string, status: string): Promise<EntTenantMigration[]> {
    const { data, error } = await this.supabase.from('ent_tenant_migrations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantMigrations(schoolId: string): Promise<EntTenantMigration[]> {
    const { data, error } = await this.supabase.from('ent_tenant_migrations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantMigrationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantMigration[]> {
    const { data, error } = await this.supabase.from('ent_tenant_migrations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantMigrationByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantMigration[]> {
    const { data, error } = await this.supabase.from('ent_tenant_migrations').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantBackupConfig -----------------------------------------------------
  async findTenantBackupConfigById(schoolId: string, id: string): Promise<EntTenantBackupConfig> {
    const { data, error } = await this.supabase.from('ent_tenant_backup_configs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantBackupConfigNotFoundError(id);
    return data;
  }

  async findAllTenantBackupConfigs(schoolId: string): Promise<EntTenantBackupConfig[]> {
    const { data, error } = await this.supabase.from('ent_tenant_backup_configs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantBackupConfig(schoolId: string, data: EntTenantBackupConfigCreate): Promise<EntTenantBackupConfig> {
    const { data: result, error } = await this.supabase.from('ent_tenant_backup_configs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantBackupConfig(schoolId: string, id: string, data: EntTenantBackupConfigUpdate): Promise<EntTenantBackupConfig> {
    const { data: result, error } = await this.supabase.from('ent_tenant_backup_configs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantBackupConfigNotFoundError(id);
    return result;
  }

  async deleteTenantBackupConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_backup_configs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantBackupConfigs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_backup_configs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantBackupConfigByStatus(schoolId: string, status: string): Promise<EntTenantBackupConfig[]> {
    const { data, error } = await this.supabase.from('ent_tenant_backup_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantBackupConfigs(schoolId: string): Promise<EntTenantBackupConfig[]> {
    const { data, error } = await this.supabase.from('ent_tenant_backup_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantBackupConfigBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantBackupConfig[]> {
    const { data, error } = await this.supabase.from('ent_tenant_backup_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantBackupConfigByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantBackupConfig[]> {
    const { data, error } = await this.supabase.from('ent_tenant_backup_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantRestore -----------------------------------------------------
  async findTenantRestoreById(schoolId: string, id: string): Promise<EntTenantRestore> {
    const { data, error } = await this.supabase.from('ent_tenant_restores').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantRestoreNotFoundError(id);
    return data;
  }

  async findAllTenantRestores(schoolId: string): Promise<EntTenantRestore[]> {
    const { data, error } = await this.supabase.from('ent_tenant_restores').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantRestore(schoolId: string, data: EntTenantRestoreCreate): Promise<EntTenantRestore> {
    const { data: result, error } = await this.supabase.from('ent_tenant_restores').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantRestore(schoolId: string, id: string, data: EntTenantRestoreUpdate): Promise<EntTenantRestore> {
    const { data: result, error } = await this.supabase.from('ent_tenant_restores').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantRestoreNotFoundError(id);
    return result;
  }

  async deleteTenantRestore(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_restores').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantRestores(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_restores').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantRestoreByStatus(schoolId: string, status: string): Promise<EntTenantRestore[]> {
    const { data, error } = await this.supabase.from('ent_tenant_restores').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantRestores(schoolId: string): Promise<EntTenantRestore[]> {
    const { data, error } = await this.supabase.from('ent_tenant_restores').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantRestoreBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantRestore[]> {
    const { data, error } = await this.supabase.from('ent_tenant_restores').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantRestoreByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantRestore[]> {
    const { data, error } = await this.supabase.from('ent_tenant_restores').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantArchive -----------------------------------------------------
  async findTenantArchiveById(schoolId: string, id: string): Promise<EntTenantArchive> {
    const { data, error } = await this.supabase.from('ent_tenant_archives').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantArchiveNotFoundError(id);
    return data;
  }

  async findAllTenantArchives(schoolId: string): Promise<EntTenantArchive[]> {
    const { data, error } = await this.supabase.from('ent_tenant_archives').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantArchive(schoolId: string, data: EntTenantArchiveCreate): Promise<EntTenantArchive> {
    const { data: result, error } = await this.supabase.from('ent_tenant_archives').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantArchive(schoolId: string, id: string, data: EntTenantArchiveUpdate): Promise<EntTenantArchive> {
    const { data: result, error } = await this.supabase.from('ent_tenant_archives').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantArchiveNotFoundError(id);
    return result;
  }

  async deleteTenantArchive(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_archives').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantArchives(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_archives').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantArchiveByStatus(schoolId: string, status: string): Promise<EntTenantArchive[]> {
    const { data, error } = await this.supabase.from('ent_tenant_archives').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantArchives(schoolId: string): Promise<EntTenantArchive[]> {
    const { data, error } = await this.supabase.from('ent_tenant_archives').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantArchiveBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantArchive[]> {
    const { data, error } = await this.supabase.from('ent_tenant_archives').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantArchiveByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantArchive[]> {
    const { data, error } = await this.supabase.from('ent_tenant_archives').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantClone -----------------------------------------------------
  async findTenantCloneById(schoolId: string, id: string): Promise<EntTenantClone> {
    const { data, error } = await this.supabase.from('ent_tenant_clones').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantCloneNotFoundError(id);
    return data;
  }

  async findAllTenantClones(schoolId: string): Promise<EntTenantClone[]> {
    const { data, error } = await this.supabase.from('ent_tenant_clones').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantClone(schoolId: string, data: EntTenantCloneCreate): Promise<EntTenantClone> {
    const { data: result, error } = await this.supabase.from('ent_tenant_clones').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantClone(schoolId: string, id: string, data: EntTenantCloneUpdate): Promise<EntTenantClone> {
    const { data: result, error } = await this.supabase.from('ent_tenant_clones').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantCloneNotFoundError(id);
    return result;
  }

  async deleteTenantClone(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_clones').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantClones(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_clones').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantCloneByStatus(schoolId: string, status: string): Promise<EntTenantClone[]> {
    const { data, error } = await this.supabase.from('ent_tenant_clones').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantClones(schoolId: string): Promise<EntTenantClone[]> {
    const { data, error } = await this.supabase.from('ent_tenant_clones').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantCloneBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantClone[]> {
    const { data, error } = await this.supabase.from('ent_tenant_clones').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantCloneByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantClone[]> {
    const { data, error } = await this.supabase.from('ent_tenant_clones').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantMerge -----------------------------------------------------
  async findTenantMergeById(schoolId: string, id: string): Promise<EntTenantMerge> {
    const { data, error } = await this.supabase.from('ent_tenant_merges').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantMergeNotFoundError(id);
    return data;
  }

  async findAllTenantMerges(schoolId: string): Promise<EntTenantMerge[]> {
    const { data, error } = await this.supabase.from('ent_tenant_merges').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantMerge(schoolId: string, data: EntTenantMergeCreate): Promise<EntTenantMerge> {
    const { data: result, error } = await this.supabase.from('ent_tenant_merges').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantMerge(schoolId: string, id: string, data: EntTenantMergeUpdate): Promise<EntTenantMerge> {
    const { data: result, error } = await this.supabase.from('ent_tenant_merges').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantMergeNotFoundError(id);
    return result;
  }

  async deleteTenantMerge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_merges').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantMerges(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_merges').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantMergeByStatus(schoolId: string, status: string): Promise<EntTenantMerge[]> {
    const { data, error } = await this.supabase.from('ent_tenant_merges').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantMerges(schoolId: string): Promise<EntTenantMerge[]> {
    const { data, error } = await this.supabase.from('ent_tenant_merges').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantMergeBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantMerge[]> {
    const { data, error } = await this.supabase.from('ent_tenant_merges').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantMergeByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantMerge[]> {
    const { data, error } = await this.supabase.from('ent_tenant_merges').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantSplit -----------------------------------------------------
  async findTenantSplitById(schoolId: string, id: string): Promise<EntTenantSplit> {
    const { data, error } = await this.supabase.from('ent_tenant_splits').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantSplitNotFoundError(id);
    return data;
  }

  async findAllTenantSplits(schoolId: string): Promise<EntTenantSplit[]> {
    const { data, error } = await this.supabase.from('ent_tenant_splits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantSplit(schoolId: string, data: EntTenantSplitCreate): Promise<EntTenantSplit> {
    const { data: result, error } = await this.supabase.from('ent_tenant_splits').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantSplit(schoolId: string, id: string, data: EntTenantSplitUpdate): Promise<EntTenantSplit> {
    const { data: result, error } = await this.supabase.from('ent_tenant_splits').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantSplitNotFoundError(id);
    return result;
  }

  async deleteTenantSplit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_splits').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantSplits(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_splits').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantSplitByStatus(schoolId: string, status: string): Promise<EntTenantSplit[]> {
    const { data, error } = await this.supabase.from('ent_tenant_splits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantSplits(schoolId: string): Promise<EntTenantSplit[]> {
    const { data, error } = await this.supabase.from('ent_tenant_splits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantSplitBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantSplit[]> {
    const { data, error } = await this.supabase.from('ent_tenant_splits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantSplitByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantSplit[]> {
    const { data, error } = await this.supabase.from('ent_tenant_splits').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantMonitoring -----------------------------------------------------
  async findTenantMonitoringById(schoolId: string, id: string): Promise<EntTenantMonitoring> {
    const { data, error } = await this.supabase.from('ent_tenant_monitorings').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantMonitoringNotFoundError(id);
    return data;
  }

  async findAllTenantMonitorings(schoolId: string): Promise<EntTenantMonitoring[]> {
    const { data, error } = await this.supabase.from('ent_tenant_monitorings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantMonitoring(schoolId: string, data: EntTenantMonitoringCreate): Promise<EntTenantMonitoring> {
    const { data: result, error } = await this.supabase.from('ent_tenant_monitorings').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantMonitoring(schoolId: string, id: string, data: EntTenantMonitoringUpdate): Promise<EntTenantMonitoring> {
    const { data: result, error } = await this.supabase.from('ent_tenant_monitorings').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantMonitoringNotFoundError(id);
    return result;
  }

  async deleteTenantMonitoring(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_monitorings').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantMonitorings(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_monitorings').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantMonitoringByStatus(schoolId: string, status: string): Promise<EntTenantMonitoring[]> {
    const { data, error } = await this.supabase.from('ent_tenant_monitorings').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantMonitorings(schoolId: string): Promise<EntTenantMonitoring[]> {
    const { data, error } = await this.supabase.from('ent_tenant_monitorings').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantMonitoringBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantMonitoring[]> {
    const { data, error } = await this.supabase.from('ent_tenant_monitorings').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantMonitoringByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantMonitoring[]> {
    const { data, error } = await this.supabase.from('ent_tenant_monitorings').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantAnalytics -----------------------------------------------------
  async findTenantAnalyticsById(schoolId: string, id: string): Promise<EntTenantAnalytics> {
    const { data, error } = await this.supabase.from('ent_tenant_analytics').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantAnalyticsNotFoundError(id);
    return data;
  }

  async findAllTenantAnalyticss(schoolId: string): Promise<EntTenantAnalytics[]> {
    const { data, error } = await this.supabase.from('ent_tenant_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantAnalytics(schoolId: string, data: EntTenantAnalyticsCreate): Promise<EntTenantAnalytics> {
    const { data: result, error } = await this.supabase.from('ent_tenant_analytics').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantAnalytics(schoolId: string, id: string, data: EntTenantAnalyticsUpdate): Promise<EntTenantAnalytics> {
    const { data: result, error } = await this.supabase.from('ent_tenant_analytics').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantAnalyticsNotFoundError(id);
    return result;
  }

  async deleteTenantAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_analytics').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantAnalyticss(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_analytics').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantAnalyticsByStatus(schoolId: string, status: string): Promise<EntTenantAnalytics[]> {
    const { data, error } = await this.supabase.from('ent_tenant_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantAnalyticss(schoolId: string): Promise<EntTenantAnalytics[]> {
    const { data, error } = await this.supabase.from('ent_tenant_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantAnalyticsBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantAnalytics[]> {
    const { data, error } = await this.supabase.from('ent_tenant_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantAnalyticsByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantAnalytics[]> {
    const { data, error } = await this.supabase.from('ent_tenant_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantQuota -----------------------------------------------------
  async findTenantQuotaById(schoolId: string, id: string): Promise<EntTenantQuota> {
    const { data, error } = await this.supabase.from('ent_tenant_quotas').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantQuotaNotFoundError(id);
    return data;
  }

  async findAllTenantQuotas(schoolId: string): Promise<EntTenantQuota[]> {
    const { data, error } = await this.supabase.from('ent_tenant_quotas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantQuota(schoolId: string, data: EntTenantQuotaCreate): Promise<EntTenantQuota> {
    const { data: result, error } = await this.supabase.from('ent_tenant_quotas').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantQuota(schoolId: string, id: string, data: EntTenantQuotaUpdate): Promise<EntTenantQuota> {
    const { data: result, error } = await this.supabase.from('ent_tenant_quotas').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantQuotaNotFoundError(id);
    return result;
  }

  async deleteTenantQuota(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_quotas').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantQuotas(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_quotas').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantQuotaByStatus(schoolId: string, status: string): Promise<EntTenantQuota[]> {
    const { data, error } = await this.supabase.from('ent_tenant_quotas').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantQuotas(schoolId: string): Promise<EntTenantQuota[]> {
    const { data, error } = await this.supabase.from('ent_tenant_quotas').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantQuotaBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantQuota[]> {
    const { data, error } = await this.supabase.from('ent_tenant_quotas').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantQuotaByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantQuota[]> {
    const { data, error } = await this.supabase.from('ent_tenant_quotas').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantBilling -----------------------------------------------------
  async findTenantBillingById(schoolId: string, id: string): Promise<EntTenantBilling> {
    const { data, error } = await this.supabase.from('ent_tenant_billings').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantBillingNotFoundError(id);
    return data;
  }

  async findAllTenantBillings(schoolId: string): Promise<EntTenantBilling[]> {
    const { data, error } = await this.supabase.from('ent_tenant_billings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantBilling(schoolId: string, data: EntTenantBillingCreate): Promise<EntTenantBilling> {
    const { data: result, error } = await this.supabase.from('ent_tenant_billings').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantBilling(schoolId: string, id: string, data: EntTenantBillingUpdate): Promise<EntTenantBilling> {
    const { data: result, error } = await this.supabase.from('ent_tenant_billings').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantBillingNotFoundError(id);
    return result;
  }

  async deleteTenantBilling(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_billings').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantBillings(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_billings').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantBillingByStatus(schoolId: string, status: string): Promise<EntTenantBilling[]> {
    const { data, error } = await this.supabase.from('ent_tenant_billings').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantBillings(schoolId: string): Promise<EntTenantBilling[]> {
    const { data, error } = await this.supabase.from('ent_tenant_billings').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantBillingBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantBilling[]> {
    const { data, error } = await this.supabase.from('ent_tenant_billings').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantBillingByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantBilling[]> {
    const { data, error } = await this.supabase.from('ent_tenant_billings').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantFeature -----------------------------------------------------
  async findTenantFeatureById(schoolId: string, id: string): Promise<EntTenantFeature> {
    const { data, error } = await this.supabase.from('ent_tenant_features').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantFeatureNotFoundError(id);
    return data;
  }

  async findAllTenantFeatures(schoolId: string): Promise<EntTenantFeature[]> {
    const { data, error } = await this.supabase.from('ent_tenant_features').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantFeature(schoolId: string, data: EntTenantFeatureCreate): Promise<EntTenantFeature> {
    const { data: result, error } = await this.supabase.from('ent_tenant_features').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantFeature(schoolId: string, id: string, data: EntTenantFeatureUpdate): Promise<EntTenantFeature> {
    const { data: result, error } = await this.supabase.from('ent_tenant_features').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantFeatureNotFoundError(id);
    return result;
  }

  async deleteTenantFeature(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_features').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantFeatures(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_features').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantFeatureByStatus(schoolId: string, status: string): Promise<EntTenantFeature[]> {
    const { data, error } = await this.supabase.from('ent_tenant_features').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantFeatures(schoolId: string): Promise<EntTenantFeature[]> {
    const { data, error } = await this.supabase.from('ent_tenant_features').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantFeatureBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantFeature[]> {
    const { data, error } = await this.supabase.from('ent_tenant_features').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantFeatureByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantFeature[]> {
    const { data, error } = await this.supabase.from('ent_tenant_features').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantSso -----------------------------------------------------
  async findTenantSsoById(schoolId: string, id: string): Promise<EntTenantSso> {
    const { data, error } = await this.supabase.from('ent_tenant_ssos').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantSsoNotFoundError(id);
    return data;
  }

  async findAllTenantSsos(schoolId: string): Promise<EntTenantSso[]> {
    const { data, error } = await this.supabase.from('ent_tenant_ssos').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantSso(schoolId: string, data: EntTenantSsoCreate): Promise<EntTenantSso> {
    const { data: result, error } = await this.supabase.from('ent_tenant_ssos').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantSso(schoolId: string, id: string, data: EntTenantSsoUpdate): Promise<EntTenantSso> {
    const { data: result, error } = await this.supabase.from('ent_tenant_ssos').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantSsoNotFoundError(id);
    return result;
  }

  async deleteTenantSso(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_ssos').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantSsos(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_ssos').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantSsoByStatus(schoolId: string, status: string): Promise<EntTenantSso[]> {
    const { data, error } = await this.supabase.from('ent_tenant_ssos').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantSsos(schoolId: string): Promise<EntTenantSso[]> {
    const { data, error } = await this.supabase.from('ent_tenant_ssos').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantSsoBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantSso[]> {
    const { data, error } = await this.supabase.from('ent_tenant_ssos').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantSsoByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantSso[]> {
    const { data, error } = await this.supabase.from('ent_tenant_ssos').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TenantCustomDomain -----------------------------------------------------
  async findTenantCustomDomainById(schoolId: string, id: string): Promise<EntTenantCustomDomain> {
    const { data, error } = await this.supabase.from('ent_tenant_custom_domains').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTenantCustomDomainNotFoundError(id);
    return data;
  }

  async findAllTenantCustomDomains(schoolId: string): Promise<EntTenantCustomDomain[]> {
    const { data, error } = await this.supabase.from('ent_tenant_custom_domains').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTenantCustomDomain(schoolId: string, data: EntTenantCustomDomainCreate): Promise<EntTenantCustomDomain> {
    const { data: result, error } = await this.supabase.from('ent_tenant_custom_domains').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTenantCustomDomain(schoolId: string, id: string, data: EntTenantCustomDomainUpdate): Promise<EntTenantCustomDomain> {
    const { data: result, error } = await this.supabase.from('ent_tenant_custom_domains').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTenantCustomDomainNotFoundError(id);
    return result;
  }

  async deleteTenantCustomDomain(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_tenant_custom_domains').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTenantCustomDomains(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_tenant_custom_domains').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTenantCustomDomainByStatus(schoolId: string, status: string): Promise<EntTenantCustomDomain[]> {
    const { data, error } = await this.supabase.from('ent_tenant_custom_domains').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTenantCustomDomains(schoolId: string): Promise<EntTenantCustomDomain[]> {
    const { data, error } = await this.supabase.from('ent_tenant_custom_domains').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTenantCustomDomainBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTenantCustomDomain[]> {
    const { data, error } = await this.supabase.from('ent_tenant_custom_domains').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTenantCustomDomainByDateRange(schoolId: string, start: string, end: string): Promise<EntTenantCustomDomain[]> {
    const { data, error } = await this.supabase.from('ent_tenant_custom_domains').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ReleasePipeline -----------------------------------------------------
  async findReleasePipelineById(schoolId: string, id: string): Promise<EntReleasePipeline> {
    const { data, error } = await this.supabase.from('ent_release_pipelines').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntReleasePipelineNotFoundError(id);
    return data;
  }

  async findAllReleasePipelines(schoolId: string): Promise<EntReleasePipeline[]> {
    const { data, error } = await this.supabase.from('ent_release_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createReleasePipeline(schoolId: string, data: EntReleasePipelineCreate): Promise<EntReleasePipeline> {
    const { data: result, error } = await this.supabase.from('ent_release_pipelines').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateReleasePipeline(schoolId: string, id: string, data: EntReleasePipelineUpdate): Promise<EntReleasePipeline> {
    const { data: result, error } = await this.supabase.from('ent_release_pipelines').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntReleasePipelineNotFoundError(id);
    return result;
  }

  async deleteReleasePipeline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_release_pipelines').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countReleasePipelines(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_release_pipelines').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findReleasePipelineByStatus(schoolId: string, status: string): Promise<EntReleasePipeline[]> {
    const { data, error } = await this.supabase.from('ent_release_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveReleasePipelines(schoolId: string): Promise<EntReleasePipeline[]> {
    const { data, error } = await this.supabase.from('ent_release_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findReleasePipelineBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntReleasePipeline[]> {
    const { data, error } = await this.supabase.from('ent_release_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findReleasePipelineByDateRange(schoolId: string, start: string, end: string): Promise<EntReleasePipeline[]> {
    const { data, error } = await this.supabase.from('ent_release_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PipelineStage -----------------------------------------------------
  async findPipelineStageById(schoolId: string, id: string): Promise<EntPipelineStage> {
    const { data, error } = await this.supabase.from('ent_pipeline_stages').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPipelineStageNotFoundError(id);
    return data;
  }

  async findAllPipelineStages(schoolId: string): Promise<EntPipelineStage[]> {
    const { data, error } = await this.supabase.from('ent_pipeline_stages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPipelineStage(schoolId: string, data: EntPipelineStageCreate): Promise<EntPipelineStage> {
    const { data: result, error } = await this.supabase.from('ent_pipeline_stages').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePipelineStage(schoolId: string, id: string, data: EntPipelineStageUpdate): Promise<EntPipelineStage> {
    const { data: result, error } = await this.supabase.from('ent_pipeline_stages').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPipelineStageNotFoundError(id);
    return result;
  }

  async deletePipelineStage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_pipeline_stages').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPipelineStages(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_pipeline_stages').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPipelineStageByStatus(schoolId: string, status: string): Promise<EntPipelineStage[]> {
    const { data, error } = await this.supabase.from('ent_pipeline_stages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePipelineStages(schoolId: string): Promise<EntPipelineStage[]> {
    const { data, error } = await this.supabase.from('ent_pipeline_stages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPipelineStageBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPipelineStage[]> {
    const { data, error } = await this.supabase.from('ent_pipeline_stages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPipelineStageByDateRange(schoolId: string, start: string, end: string): Promise<EntPipelineStage[]> {
    const { data, error } = await this.supabase.from('ent_pipeline_stages').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PipelineRun -----------------------------------------------------
  async findPipelineRunById(schoolId: string, id: string): Promise<EntPipelineRun> {
    const { data, error } = await this.supabase.from('ent_pipeline_runs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPipelineRunNotFoundError(id);
    return data;
  }

  async findAllPipelineRuns(schoolId: string): Promise<EntPipelineRun[]> {
    const { data, error } = await this.supabase.from('ent_pipeline_runs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPipelineRun(schoolId: string, data: EntPipelineRunCreate): Promise<EntPipelineRun> {
    const { data: result, error } = await this.supabase.from('ent_pipeline_runs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePipelineRun(schoolId: string, id: string, data: EntPipelineRunUpdate): Promise<EntPipelineRun> {
    const { data: result, error } = await this.supabase.from('ent_pipeline_runs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPipelineRunNotFoundError(id);
    return result;
  }

  async deletePipelineRun(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_pipeline_runs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPipelineRuns(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_pipeline_runs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPipelineRunByStatus(schoolId: string, status: string): Promise<EntPipelineRun[]> {
    const { data, error } = await this.supabase.from('ent_pipeline_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePipelineRuns(schoolId: string): Promise<EntPipelineRun[]> {
    const { data, error } = await this.supabase.from('ent_pipeline_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPipelineRunBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPipelineRun[]> {
    const { data, error } = await this.supabase.from('ent_pipeline_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPipelineRunByDateRange(schoolId: string, start: string, end: string): Promise<EntPipelineRun[]> {
    const { data, error } = await this.supabase.from('ent_pipeline_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- VersionManager -----------------------------------------------------
  async findVersionManagerById(schoolId: string, id: string): Promise<EntVersionManager> {
    const { data, error } = await this.supabase.from('ent_version_managers').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntVersionManagerNotFoundError(id);
    return data;
  }

  async findAllVersionManagers(schoolId: string): Promise<EntVersionManager[]> {
    const { data, error } = await this.supabase.from('ent_version_managers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createVersionManager(schoolId: string, data: EntVersionManagerCreate): Promise<EntVersionManager> {
    const { data: result, error } = await this.supabase.from('ent_version_managers').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateVersionManager(schoolId: string, id: string, data: EntVersionManagerUpdate): Promise<EntVersionManager> {
    const { data: result, error } = await this.supabase.from('ent_version_managers').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntVersionManagerNotFoundError(id);
    return result;
  }

  async deleteVersionManager(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_version_managers').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countVersionManagers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_version_managers').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findVersionManagerByStatus(schoolId: string, status: string): Promise<EntVersionManager[]> {
    const { data, error } = await this.supabase.from('ent_version_managers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveVersionManagers(schoolId: string): Promise<EntVersionManager[]> {
    const { data, error } = await this.supabase.from('ent_version_managers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findVersionManagerBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntVersionManager[]> {
    const { data, error } = await this.supabase.from('ent_version_managers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findVersionManagerByDateRange(schoolId: string, start: string, end: string): Promise<EntVersionManager[]> {
    const { data, error } = await this.supabase.from('ent_version_managers').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- BlueGreenDeployment -----------------------------------------------------
  async findBlueGreenDeploymentById(schoolId: string, id: string): Promise<EntBlueGreenDeployment> {
    const { data, error } = await this.supabase.from('ent_blue_green_deployments').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntBlueGreenDeploymentNotFoundError(id);
    return data;
  }

  async findAllBlueGreenDeployments(schoolId: string): Promise<EntBlueGreenDeployment[]> {
    const { data, error } = await this.supabase.from('ent_blue_green_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createBlueGreenDeployment(schoolId: string, data: EntBlueGreenDeploymentCreate): Promise<EntBlueGreenDeployment> {
    const { data: result, error } = await this.supabase.from('ent_blue_green_deployments').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateBlueGreenDeployment(schoolId: string, id: string, data: EntBlueGreenDeploymentUpdate): Promise<EntBlueGreenDeployment> {
    const { data: result, error } = await this.supabase.from('ent_blue_green_deployments').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntBlueGreenDeploymentNotFoundError(id);
    return result;
  }

  async deleteBlueGreenDeployment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_blue_green_deployments').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countBlueGreenDeployments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_blue_green_deployments').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findBlueGreenDeploymentByStatus(schoolId: string, status: string): Promise<EntBlueGreenDeployment[]> {
    const { data, error } = await this.supabase.from('ent_blue_green_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveBlueGreenDeployments(schoolId: string): Promise<EntBlueGreenDeployment[]> {
    const { data, error } = await this.supabase.from('ent_blue_green_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findBlueGreenDeploymentBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntBlueGreenDeployment[]> {
    const { data, error } = await this.supabase.from('ent_blue_green_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findBlueGreenDeploymentByDateRange(schoolId: string, start: string, end: string): Promise<EntBlueGreenDeployment[]> {
    const { data, error } = await this.supabase.from('ent_blue_green_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CanaryDeployment -----------------------------------------------------
  async findCanaryDeploymentById(schoolId: string, id: string): Promise<EntCanaryDeployment> {
    const { data, error } = await this.supabase.from('ent_canary_deployments').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCanaryDeploymentNotFoundError(id);
    return data;
  }

  async findAllCanaryDeployments(schoolId: string): Promise<EntCanaryDeployment[]> {
    const { data, error } = await this.supabase.from('ent_canary_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCanaryDeployment(schoolId: string, data: EntCanaryDeploymentCreate): Promise<EntCanaryDeployment> {
    const { data: result, error } = await this.supabase.from('ent_canary_deployments').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCanaryDeployment(schoolId: string, id: string, data: EntCanaryDeploymentUpdate): Promise<EntCanaryDeployment> {
    const { data: result, error } = await this.supabase.from('ent_canary_deployments').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCanaryDeploymentNotFoundError(id);
    return result;
  }

  async deleteCanaryDeployment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_canary_deployments').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCanaryDeployments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_canary_deployments').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCanaryDeploymentByStatus(schoolId: string, status: string): Promise<EntCanaryDeployment[]> {
    const { data, error } = await this.supabase.from('ent_canary_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCanaryDeployments(schoolId: string): Promise<EntCanaryDeployment[]> {
    const { data, error } = await this.supabase.from('ent_canary_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCanaryDeploymentBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCanaryDeployment[]> {
    const { data, error } = await this.supabase.from('ent_canary_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCanaryDeploymentByDateRange(schoolId: string, start: string, end: string): Promise<EntCanaryDeployment[]> {
    const { data, error } = await this.supabase.from('ent_canary_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Rollback -----------------------------------------------------
  async findRollbackById(schoolId: string, id: string): Promise<EntRollback> {
    const { data, error } = await this.supabase.from('ent_rollbacks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntRollbackNotFoundError(id);
    return data;
  }

  async findAllRollbacks(schoolId: string): Promise<EntRollback[]> {
    const { data, error } = await this.supabase.from('ent_rollbacks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createRollback(schoolId: string, data: EntRollbackCreate): Promise<EntRollback> {
    const { data: result, error } = await this.supabase.from('ent_rollbacks').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateRollback(schoolId: string, id: string, data: EntRollbackUpdate): Promise<EntRollback> {
    const { data: result, error } = await this.supabase.from('ent_rollbacks').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntRollbackNotFoundError(id);
    return result;
  }

  async deleteRollback(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_rollbacks').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRollbacks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_rollbacks').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findRollbackByStatus(schoolId: string, status: string): Promise<EntRollback[]> {
    const { data, error } = await this.supabase.from('ent_rollbacks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRollbacks(schoolId: string): Promise<EntRollback[]> {
    const { data, error } = await this.supabase.from('ent_rollbacks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRollbackBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntRollback[]> {
    const { data, error } = await this.supabase.from('ent_rollbacks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findRollbackByDateRange(schoolId: string, start: string, end: string): Promise<EntRollback[]> {
    const { data, error } = await this.supabase.from('ent_rollbacks').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- MigrationManager -----------------------------------------------------
  async findMigrationManagerById(schoolId: string, id: string): Promise<EntMigrationManager> {
    const { data, error } = await this.supabase.from('ent_migration_managers').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntMigrationManagerNotFoundError(id);
    return data;
  }

  async findAllMigrationManagers(schoolId: string): Promise<EntMigrationManager[]> {
    const { data, error } = await this.supabase.from('ent_migration_managers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createMigrationManager(schoolId: string, data: EntMigrationManagerCreate): Promise<EntMigrationManager> {
    const { data: result, error } = await this.supabase.from('ent_migration_managers').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateMigrationManager(schoolId: string, id: string, data: EntMigrationManagerUpdate): Promise<EntMigrationManager> {
    const { data: result, error } = await this.supabase.from('ent_migration_managers').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntMigrationManagerNotFoundError(id);
    return result;
  }

  async deleteMigrationManager(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_migration_managers').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countMigrationManagers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_migration_managers').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findMigrationManagerByStatus(schoolId: string, status: string): Promise<EntMigrationManager[]> {
    const { data, error } = await this.supabase.from('ent_migration_managers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveMigrationManagers(schoolId: string): Promise<EntMigrationManager[]> {
    const { data, error } = await this.supabase.from('ent_migration_managers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findMigrationManagerBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntMigrationManager[]> {
    const { data, error } = await this.supabase.from('ent_migration_managers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findMigrationManagerByDateRange(schoolId: string, start: string, end: string): Promise<EntMigrationManager[]> {
    const { data, error } = await this.supabase.from('ent_migration_managers').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- EnvironmentPromotion -----------------------------------------------------
  async findEnvironmentPromotionById(schoolId: string, id: string): Promise<EntEnvironmentPromotion> {
    const { data, error } = await this.supabase.from('ent_environment_promotions').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntEnvironmentPromotionNotFoundError(id);
    return data;
  }

  async findAllEnvironmentPromotions(schoolId: string): Promise<EntEnvironmentPromotion[]> {
    const { data, error } = await this.supabase.from('ent_environment_promotions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createEnvironmentPromotion(schoolId: string, data: EntEnvironmentPromotionCreate): Promise<EntEnvironmentPromotion> {
    const { data: result, error } = await this.supabase.from('ent_environment_promotions').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateEnvironmentPromotion(schoolId: string, id: string, data: EntEnvironmentPromotionUpdate): Promise<EntEnvironmentPromotion> {
    const { data: result, error } = await this.supabase.from('ent_environment_promotions').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntEnvironmentPromotionNotFoundError(id);
    return result;
  }

  async deleteEnvironmentPromotion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_environment_promotions').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEnvironmentPromotions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_environment_promotions').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findEnvironmentPromotionByStatus(schoolId: string, status: string): Promise<EntEnvironmentPromotion[]> {
    const { data, error } = await this.supabase.from('ent_environment_promotions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveEnvironmentPromotions(schoolId: string): Promise<EntEnvironmentPromotion[]> {
    const { data, error } = await this.supabase.from('ent_environment_promotions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findEnvironmentPromotionBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntEnvironmentPromotion[]> {
    const { data, error } = await this.supabase.from('ent_environment_promotions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findEnvironmentPromotionByDateRange(schoolId: string, start: string, end: string): Promise<EntEnvironmentPromotion[]> {
    const { data, error } = await this.supabase.from('ent_environment_promotions').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DeploymentHistory -----------------------------------------------------
  async findDeploymentHistoryById(schoolId: string, id: string): Promise<EntDeploymentHistory> {
    const { data, error } = await this.supabase.from('ent_deployment_histories').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDeploymentHistoryNotFoundError(id);
    return data;
  }

  async findAllDeploymentHistorys(schoolId: string): Promise<EntDeploymentHistory[]> {
    const { data, error } = await this.supabase.from('ent_deployment_histories').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDeploymentHistory(schoolId: string, data: EntDeploymentHistoryCreate): Promise<EntDeploymentHistory> {
    const { data: result, error } = await this.supabase.from('ent_deployment_histories').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDeploymentHistory(schoolId: string, id: string, data: EntDeploymentHistoryUpdate): Promise<EntDeploymentHistory> {
    const { data: result, error } = await this.supabase.from('ent_deployment_histories').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDeploymentHistoryNotFoundError(id);
    return result;
  }

  async deleteDeploymentHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_deployment_histories').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDeploymentHistorys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_deployment_histories').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDeploymentHistoryByStatus(schoolId: string, status: string): Promise<EntDeploymentHistory[]> {
    const { data, error } = await this.supabase.from('ent_deployment_histories').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDeploymentHistorys(schoolId: string): Promise<EntDeploymentHistory[]> {
    const { data, error } = await this.supabase.from('ent_deployment_histories').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDeploymentHistoryBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDeploymentHistory[]> {
    const { data, error } = await this.supabase.from('ent_deployment_histories').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDeploymentHistoryByDateRange(schoolId: string, start: string, end: string): Promise<EntDeploymentHistory[]> {
    const { data, error } = await this.supabase.from('ent_deployment_histories').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- FeatureDeployment -----------------------------------------------------
  async findFeatureDeploymentById(schoolId: string, id: string): Promise<EntFeatureDeployment> {
    const { data, error } = await this.supabase.from('ent_feature_deployments').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntFeatureDeploymentNotFoundError(id);
    return data;
  }

  async findAllFeatureDeployments(schoolId: string): Promise<EntFeatureDeployment[]> {
    const { data, error } = await this.supabase.from('ent_feature_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createFeatureDeployment(schoolId: string, data: EntFeatureDeploymentCreate): Promise<EntFeatureDeployment> {
    const { data: result, error } = await this.supabase.from('ent_feature_deployments').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateFeatureDeployment(schoolId: string, id: string, data: EntFeatureDeploymentUpdate): Promise<EntFeatureDeployment> {
    const { data: result, error } = await this.supabase.from('ent_feature_deployments').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntFeatureDeploymentNotFoundError(id);
    return result;
  }

  async deleteFeatureDeployment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_feature_deployments').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countFeatureDeployments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_feature_deployments').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findFeatureDeploymentByStatus(schoolId: string, status: string): Promise<EntFeatureDeployment[]> {
    const { data, error } = await this.supabase.from('ent_feature_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveFeatureDeployments(schoolId: string): Promise<EntFeatureDeployment[]> {
    const { data, error } = await this.supabase.from('ent_feature_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findFeatureDeploymentBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntFeatureDeployment[]> {
    const { data, error } = await this.supabase.from('ent_feature_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findFeatureDeploymentByDateRange(schoolId: string, start: string, end: string): Promise<EntFeatureDeployment[]> {
    const { data, error } = await this.supabase.from('ent_feature_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ConfigDeployment -----------------------------------------------------
  async findConfigDeploymentById(schoolId: string, id: string): Promise<EntConfigDeployment> {
    const { data, error } = await this.supabase.from('ent_config_deployments').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntConfigDeploymentNotFoundError(id);
    return data;
  }

  async findAllConfigDeployments(schoolId: string): Promise<EntConfigDeployment[]> {
    const { data, error } = await this.supabase.from('ent_config_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createConfigDeployment(schoolId: string, data: EntConfigDeploymentCreate): Promise<EntConfigDeployment> {
    const { data: result, error } = await this.supabase.from('ent_config_deployments').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateConfigDeployment(schoolId: string, id: string, data: EntConfigDeploymentUpdate): Promise<EntConfigDeployment> {
    const { data: result, error } = await this.supabase.from('ent_config_deployments').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntConfigDeploymentNotFoundError(id);
    return result;
  }

  async deleteConfigDeployment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_config_deployments').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countConfigDeployments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_config_deployments').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findConfigDeploymentByStatus(schoolId: string, status: string): Promise<EntConfigDeployment[]> {
    const { data, error } = await this.supabase.from('ent_config_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveConfigDeployments(schoolId: string): Promise<EntConfigDeployment[]> {
    const { data, error } = await this.supabase.from('ent_config_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findConfigDeploymentBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntConfigDeployment[]> {
    const { data, error } = await this.supabase.from('ent_config_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findConfigDeploymentByDateRange(schoolId: string, start: string, end: string): Promise<EntConfigDeployment[]> {
    const { data, error } = await this.supabase.from('ent_config_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- InfrastructureChange -----------------------------------------------------
  async findInfrastructureChangeById(schoolId: string, id: string): Promise<EntInfrastructureChange> {
    const { data, error } = await this.supabase.from('ent_infrastructure_changes').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntInfrastructureChangeNotFoundError(id);
    return data;
  }

  async findAllInfrastructureChanges(schoolId: string): Promise<EntInfrastructureChange[]> {
    const { data, error } = await this.supabase.from('ent_infrastructure_changes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createInfrastructureChange(schoolId: string, data: EntInfrastructureChangeCreate): Promise<EntInfrastructureChange> {
    const { data: result, error } = await this.supabase.from('ent_infrastructure_changes').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateInfrastructureChange(schoolId: string, id: string, data: EntInfrastructureChangeUpdate): Promise<EntInfrastructureChange> {
    const { data: result, error } = await this.supabase.from('ent_infrastructure_changes').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntInfrastructureChangeNotFoundError(id);
    return result;
  }

  async deleteInfrastructureChange(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_infrastructure_changes').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInfrastructureChanges(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_infrastructure_changes').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findInfrastructureChangeByStatus(schoolId: string, status: string): Promise<EntInfrastructureChange[]> {
    const { data, error } = await this.supabase.from('ent_infrastructure_changes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveInfrastructureChanges(schoolId: string): Promise<EntInfrastructureChange[]> {
    const { data, error } = await this.supabase.from('ent_infrastructure_changes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findInfrastructureChangeBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntInfrastructureChange[]> {
    const { data, error } = await this.supabase.from('ent_infrastructure_changes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findInfrastructureChangeByDateRange(schoolId: string, start: string, end: string): Promise<EntInfrastructureChange[]> {
    const { data, error } = await this.supabase.from('ent_infrastructure_changes').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DeploymentApproval -----------------------------------------------------
  async findDeploymentApprovalById(schoolId: string, id: string): Promise<EntDeploymentApproval> {
    const { data, error } = await this.supabase.from('ent_deployment_approvals').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDeploymentApprovalNotFoundError(id);
    return data;
  }

  async findAllDeploymentApprovals(schoolId: string): Promise<EntDeploymentApproval[]> {
    const { data, error } = await this.supabase.from('ent_deployment_approvals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDeploymentApproval(schoolId: string, data: EntDeploymentApprovalCreate): Promise<EntDeploymentApproval> {
    const { data: result, error } = await this.supabase.from('ent_deployment_approvals').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDeploymentApproval(schoolId: string, id: string, data: EntDeploymentApprovalUpdate): Promise<EntDeploymentApproval> {
    const { data: result, error } = await this.supabase.from('ent_deployment_approvals').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDeploymentApprovalNotFoundError(id);
    return result;
  }

  async deleteDeploymentApproval(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_deployment_approvals').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDeploymentApprovals(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_deployment_approvals').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDeploymentApprovalByStatus(schoolId: string, status: string): Promise<EntDeploymentApproval[]> {
    const { data, error } = await this.supabase.from('ent_deployment_approvals').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDeploymentApprovals(schoolId: string): Promise<EntDeploymentApproval[]> {
    const { data, error } = await this.supabase.from('ent_deployment_approvals').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDeploymentApprovalBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDeploymentApproval[]> {
    const { data, error } = await this.supabase.from('ent_deployment_approvals').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDeploymentApprovalByDateRange(schoolId: string, start: string, end: string): Promise<EntDeploymentApproval[]> {
    const { data, error } = await this.supabase.from('ent_deployment_approvals').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DistributedTrace -----------------------------------------------------
  async findDistributedTraceById(schoolId: string, id: string): Promise<EntDistributedTrace> {
    const { data, error } = await this.supabase.from('ent_distributed_traces').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDistributedTraceNotFoundError(id);
    return data;
  }

  async findAllDistributedTraces(schoolId: string): Promise<EntDistributedTrace[]> {
    const { data, error } = await this.supabase.from('ent_distributed_traces').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDistributedTrace(schoolId: string, data: EntDistributedTraceCreate): Promise<EntDistributedTrace> {
    const { data: result, error } = await this.supabase.from('ent_distributed_traces').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDistributedTrace(schoolId: string, id: string, data: EntDistributedTraceUpdate): Promise<EntDistributedTrace> {
    const { data: result, error } = await this.supabase.from('ent_distributed_traces').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDistributedTraceNotFoundError(id);
    return result;
  }

  async deleteDistributedTrace(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_distributed_traces').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDistributedTraces(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_distributed_traces').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDistributedTraceByStatus(schoolId: string, status: string): Promise<EntDistributedTrace[]> {
    const { data, error } = await this.supabase.from('ent_distributed_traces').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDistributedTraces(schoolId: string): Promise<EntDistributedTrace[]> {
    const { data, error } = await this.supabase.from('ent_distributed_traces').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDistributedTraceBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDistributedTrace[]> {
    const { data, error } = await this.supabase.from('ent_distributed_traces').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDistributedTraceByDateRange(schoolId: string, start: string, end: string): Promise<EntDistributedTrace[]> {
    const { data, error } = await this.supabase.from('ent_distributed_traces').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TraceSpan -----------------------------------------------------
  async findTraceSpanById(schoolId: string, id: string): Promise<EntTraceSpan> {
    const { data, error } = await this.supabase.from('ent_trace_spans').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTraceSpanNotFoundError(id);
    return data;
  }

  async findAllTraceSpans(schoolId: string): Promise<EntTraceSpan[]> {
    const { data, error } = await this.supabase.from('ent_trace_spans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTraceSpan(schoolId: string, data: EntTraceSpanCreate): Promise<EntTraceSpan> {
    const { data: result, error } = await this.supabase.from('ent_trace_spans').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTraceSpan(schoolId: string, id: string, data: EntTraceSpanUpdate): Promise<EntTraceSpan> {
    const { data: result, error } = await this.supabase.from('ent_trace_spans').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTraceSpanNotFoundError(id);
    return result;
  }

  async deleteTraceSpan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_trace_spans').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTraceSpans(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_trace_spans').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTraceSpanByStatus(schoolId: string, status: string): Promise<EntTraceSpan[]> {
    const { data, error } = await this.supabase.from('ent_trace_spans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTraceSpans(schoolId: string): Promise<EntTraceSpan[]> {
    const { data, error } = await this.supabase.from('ent_trace_spans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTraceSpanBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTraceSpan[]> {
    const { data, error } = await this.supabase.from('ent_trace_spans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTraceSpanByDateRange(schoolId: string, start: string, end: string): Promise<EntTraceSpan[]> {
    const { data, error } = await this.supabase.from('ent_trace_spans').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- StructuredLog -----------------------------------------------------
  async findStructuredLogById(schoolId: string, id: string): Promise<EntStructuredLog> {
    const { data, error } = await this.supabase.from('ent_structured_logs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntStructuredLogNotFoundError(id);
    return data;
  }

  async findAllStructuredLogs(schoolId: string): Promise<EntStructuredLog[]> {
    const { data, error } = await this.supabase.from('ent_structured_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createStructuredLog(schoolId: string, data: EntStructuredLogCreate): Promise<EntStructuredLog> {
    const { data: result, error } = await this.supabase.from('ent_structured_logs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateStructuredLog(schoolId: string, id: string, data: EntStructuredLogUpdate): Promise<EntStructuredLog> {
    const { data: result, error } = await this.supabase.from('ent_structured_logs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntStructuredLogNotFoundError(id);
    return result;
  }

  async deleteStructuredLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_structured_logs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countStructuredLogs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_structured_logs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findStructuredLogByStatus(schoolId: string, status: string): Promise<EntStructuredLog[]> {
    const { data, error } = await this.supabase.from('ent_structured_logs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveStructuredLogs(schoolId: string): Promise<EntStructuredLog[]> {
    const { data, error } = await this.supabase.from('ent_structured_logs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findStructuredLogBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntStructuredLog[]> {
    const { data, error } = await this.supabase.from('ent_structured_logs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findStructuredLogByDateRange(schoolId: string, start: string, end: string): Promise<EntStructuredLog[]> {
    const { data, error } = await this.supabase.from('ent_structured_logs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Metric -----------------------------------------------------
  async findMetricById(schoolId: string, id: string): Promise<EntMetric> {
    const { data, error } = await this.supabase.from('ent_metrics').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntMetricNotFoundError(id);
    return data;
  }

  async findAllMetrics(schoolId: string): Promise<EntMetric[]> {
    const { data, error } = await this.supabase.from('ent_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createMetric(schoolId: string, data: EntMetricCreate): Promise<EntMetric> {
    const { data: result, error } = await this.supabase.from('ent_metrics').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateMetric(schoolId: string, id: string, data: EntMetricUpdate): Promise<EntMetric> {
    const { data: result, error } = await this.supabase.from('ent_metrics').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntMetricNotFoundError(id);
    return result;
  }

  async deleteMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_metrics').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countMetrics(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_metrics').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findMetricByStatus(schoolId: string, status: string): Promise<EntMetric[]> {
    const { data, error } = await this.supabase.from('ent_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveMetrics(schoolId: string): Promise<EntMetric[]> {
    const { data, error } = await this.supabase.from('ent_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findMetricBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntMetric[]> {
    const { data, error } = await this.supabase.from('ent_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findMetricByDateRange(schoolId: string, start: string, end: string): Promise<EntMetric[]> {
    const { data, error } = await this.supabase.from('ent_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PerformanceDashboard -----------------------------------------------------
  async findPerformanceDashboardById(schoolId: string, id: string): Promise<EntPerformanceDashboard> {
    const { data, error } = await this.supabase.from('ent_performance_dashboards').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPerformanceDashboardNotFoundError(id);
    return data;
  }

  async findAllPerformanceDashboards(schoolId: string): Promise<EntPerformanceDashboard[]> {
    const { data, error } = await this.supabase.from('ent_performance_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPerformanceDashboard(schoolId: string, data: EntPerformanceDashboardCreate): Promise<EntPerformanceDashboard> {
    const { data: result, error } = await this.supabase.from('ent_performance_dashboards').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePerformanceDashboard(schoolId: string, id: string, data: EntPerformanceDashboardUpdate): Promise<EntPerformanceDashboard> {
    const { data: result, error } = await this.supabase.from('ent_performance_dashboards').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPerformanceDashboardNotFoundError(id);
    return result;
  }

  async deletePerformanceDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_performance_dashboards').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPerformanceDashboards(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_performance_dashboards').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPerformanceDashboardByStatus(schoolId: string, status: string): Promise<EntPerformanceDashboard[]> {
    const { data, error } = await this.supabase.from('ent_performance_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePerformanceDashboards(schoolId: string): Promise<EntPerformanceDashboard[]> {
    const { data, error } = await this.supabase.from('ent_performance_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPerformanceDashboardBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPerformanceDashboard[]> {
    const { data, error } = await this.supabase.from('ent_performance_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPerformanceDashboardByDateRange(schoolId: string, start: string, end: string): Promise<EntPerformanceDashboard[]> {
    const { data, error } = await this.supabase.from('ent_performance_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ErrorDashboard -----------------------------------------------------
  async findErrorDashboardById(schoolId: string, id: string): Promise<EntErrorDashboard> {
    const { data, error } = await this.supabase.from('ent_error_dashboards').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntErrorDashboardNotFoundError(id);
    return data;
  }

  async findAllErrorDashboards(schoolId: string): Promise<EntErrorDashboard[]> {
    const { data, error } = await this.supabase.from('ent_error_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createErrorDashboard(schoolId: string, data: EntErrorDashboardCreate): Promise<EntErrorDashboard> {
    const { data: result, error } = await this.supabase.from('ent_error_dashboards').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateErrorDashboard(schoolId: string, id: string, data: EntErrorDashboardUpdate): Promise<EntErrorDashboard> {
    const { data: result, error } = await this.supabase.from('ent_error_dashboards').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntErrorDashboardNotFoundError(id);
    return result;
  }

  async deleteErrorDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_error_dashboards').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countErrorDashboards(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_error_dashboards').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findErrorDashboardByStatus(schoolId: string, status: string): Promise<EntErrorDashboard[]> {
    const { data, error } = await this.supabase.from('ent_error_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveErrorDashboards(schoolId: string): Promise<EntErrorDashboard[]> {
    const { data, error } = await this.supabase.from('ent_error_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findErrorDashboardBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntErrorDashboard[]> {
    const { data, error } = await this.supabase.from('ent_error_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findErrorDashboardByDateRange(schoolId: string, start: string, end: string): Promise<EntErrorDashboard[]> {
    const { data, error } = await this.supabase.from('ent_error_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SlowQuery -----------------------------------------------------
  async findSlowQueryById(schoolId: string, id: string): Promise<EntSlowQuery> {
    const { data, error } = await this.supabase.from('ent_slow_queries').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSlowQueryNotFoundError(id);
    return data;
  }

  async findAllSlowQuerys(schoolId: string): Promise<EntSlowQuery[]> {
    const { data, error } = await this.supabase.from('ent_slow_queries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSlowQuery(schoolId: string, data: EntSlowQueryCreate): Promise<EntSlowQuery> {
    const { data: result, error } = await this.supabase.from('ent_slow_queries').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSlowQuery(schoolId: string, id: string, data: EntSlowQueryUpdate): Promise<EntSlowQuery> {
    const { data: result, error } = await this.supabase.from('ent_slow_queries').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSlowQueryNotFoundError(id);
    return result;
  }

  async deleteSlowQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_slow_queries').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSlowQuerys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_slow_queries').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSlowQueryByStatus(schoolId: string, status: string): Promise<EntSlowQuery[]> {
    const { data, error } = await this.supabase.from('ent_slow_queries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSlowQuerys(schoolId: string): Promise<EntSlowQuery[]> {
    const { data, error } = await this.supabase.from('ent_slow_queries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSlowQueryBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSlowQuery[]> {
    const { data, error } = await this.supabase.from('ent_slow_queries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSlowQueryByDateRange(schoolId: string, start: string, end: string): Promise<EntSlowQuery[]> {
    const { data, error } = await this.supabase.from('ent_slow_queries').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- AlertRule -----------------------------------------------------
  async findAlertRuleById(schoolId: string, id: string): Promise<EntAlertRule> {
    const { data, error } = await this.supabase.from('ent_alert_rules').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntAlertRuleNotFoundError(id);
    return data;
  }

  async findAllAlertRules(schoolId: string): Promise<EntAlertRule[]> {
    const { data, error } = await this.supabase.from('ent_alert_rules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createAlertRule(schoolId: string, data: EntAlertRuleCreate): Promise<EntAlertRule> {
    const { data: result, error } = await this.supabase.from('ent_alert_rules').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateAlertRule(schoolId: string, id: string, data: EntAlertRuleUpdate): Promise<EntAlertRule> {
    const { data: result, error } = await this.supabase.from('ent_alert_rules').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntAlertRuleNotFoundError(id);
    return result;
  }

  async deleteAlertRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_alert_rules').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAlertRules(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_alert_rules').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findAlertRuleByStatus(schoolId: string, status: string): Promise<EntAlertRule[]> {
    const { data, error } = await this.supabase.from('ent_alert_rules').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAlertRules(schoolId: string): Promise<EntAlertRule[]> {
    const { data, error } = await this.supabase.from('ent_alert_rules').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAlertRuleBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntAlertRule[]> {
    const { data, error } = await this.supabase.from('ent_alert_rules').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAlertRuleByDateRange(schoolId: string, start: string, end: string): Promise<EntAlertRule[]> {
    const { data, error } = await this.supabase.from('ent_alert_rules').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- AlertIncident -----------------------------------------------------
  async findAlertIncidentById(schoolId: string, id: string): Promise<EntAlertIncident> {
    const { data, error } = await this.supabase.from('ent_alert_incidents').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntAlertIncidentNotFoundError(id);
    return data;
  }

  async findAllAlertIncidents(schoolId: string): Promise<EntAlertIncident[]> {
    const { data, error } = await this.supabase.from('ent_alert_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createAlertIncident(schoolId: string, data: EntAlertIncidentCreate): Promise<EntAlertIncident> {
    const { data: result, error } = await this.supabase.from('ent_alert_incidents').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateAlertIncident(schoolId: string, id: string, data: EntAlertIncidentUpdate): Promise<EntAlertIncident> {
    const { data: result, error } = await this.supabase.from('ent_alert_incidents').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntAlertIncidentNotFoundError(id);
    return result;
  }

  async deleteAlertIncident(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_alert_incidents').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAlertIncidents(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_alert_incidents').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findAlertIncidentByStatus(schoolId: string, status: string): Promise<EntAlertIncident[]> {
    const { data, error } = await this.supabase.from('ent_alert_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAlertIncidents(schoolId: string): Promise<EntAlertIncident[]> {
    const { data, error } = await this.supabase.from('ent_alert_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAlertIncidentBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntAlertIncident[]> {
    const { data, error } = await this.supabase.from('ent_alert_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAlertIncidentByDateRange(schoolId: string, start: string, end: string): Promise<EntAlertIncident[]> {
    const { data, error } = await this.supabase.from('ent_alert_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Slo -----------------------------------------------------
  async findSloById(schoolId: string, id: string): Promise<EntSlo> {
    const { data, error } = await this.supabase.from('ent_slos').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSloNotFoundError(id);
    return data;
  }

  async findAllSlos(schoolId: string): Promise<EntSlo[]> {
    const { data, error } = await this.supabase.from('ent_slos').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSlo(schoolId: string, data: EntSloCreate): Promise<EntSlo> {
    const { data: result, error } = await this.supabase.from('ent_slos').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSlo(schoolId: string, id: string, data: EntSloUpdate): Promise<EntSlo> {
    const { data: result, error } = await this.supabase.from('ent_slos').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSloNotFoundError(id);
    return result;
  }

  async deleteSlo(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_slos').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSlos(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_slos').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSloByStatus(schoolId: string, status: string): Promise<EntSlo[]> {
    const { data, error } = await this.supabase.from('ent_slos').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSlos(schoolId: string): Promise<EntSlo[]> {
    const { data, error } = await this.supabase.from('ent_slos').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSloBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSlo[]> {
    const { data, error } = await this.supabase.from('ent_slos').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSloByDateRange(schoolId: string, start: string, end: string): Promise<EntSlo[]> {
    const { data, error } = await this.supabase.from('ent_slos').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Sla -----------------------------------------------------
  async findSlaById(schoolId: string, id: string): Promise<EntSla> {
    const { data, error } = await this.supabase.from('ent_slas').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSlaNotFoundError(id);
    return data;
  }

  async findAllSlas(schoolId: string): Promise<EntSla[]> {
    const { data, error } = await this.supabase.from('ent_slas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSla(schoolId: string, data: EntSlaCreate): Promise<EntSla> {
    const { data: result, error } = await this.supabase.from('ent_slas').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSla(schoolId: string, id: string, data: EntSlaUpdate): Promise<EntSla> {
    const { data: result, error } = await this.supabase.from('ent_slas').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSlaNotFoundError(id);
    return result;
  }

  async deleteSla(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_slas').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSlas(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_slas').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSlaByStatus(schoolId: string, status: string): Promise<EntSla[]> {
    const { data, error } = await this.supabase.from('ent_slas').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSlas(schoolId: string): Promise<EntSla[]> {
    const { data, error } = await this.supabase.from('ent_slas').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSlaBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSla[]> {
    const { data, error } = await this.supabase.from('ent_slas').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSlaByDateRange(schoolId: string, start: string, end: string): Promise<EntSla[]> {
    const { data, error } = await this.supabase.from('ent_slas').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ServiceHealth -----------------------------------------------------
  async findServiceHealthById(schoolId: string, id: string): Promise<EntServiceHealth> {
    const { data, error } = await this.supabase.from('ent_service_healths').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntServiceHealthNotFoundError(id);
    return data;
  }

  async findAllServiceHealths(schoolId: string): Promise<EntServiceHealth[]> {
    const { data, error } = await this.supabase.from('ent_service_healths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createServiceHealth(schoolId: string, data: EntServiceHealthCreate): Promise<EntServiceHealth> {
    const { data: result, error } = await this.supabase.from('ent_service_healths').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateServiceHealth(schoolId: string, id: string, data: EntServiceHealthUpdate): Promise<EntServiceHealth> {
    const { data: result, error } = await this.supabase.from('ent_service_healths').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntServiceHealthNotFoundError(id);
    return result;
  }

  async deleteServiceHealth(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_service_healths').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countServiceHealths(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_service_healths').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findServiceHealthByStatus(schoolId: string, status: string): Promise<EntServiceHealth[]> {
    const { data, error } = await this.supabase.from('ent_service_healths').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveServiceHealths(schoolId: string): Promise<EntServiceHealth[]> {
    const { data, error } = await this.supabase.from('ent_service_healths').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findServiceHealthBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntServiceHealth[]> {
    const { data, error } = await this.supabase.from('ent_service_healths').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findServiceHealthByDateRange(schoolId: string, start: string, end: string): Promise<EntServiceHealth[]> {
    const { data, error } = await this.supabase.from('ent_service_healths').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- LogAggregation -----------------------------------------------------
  async findLogAggregationById(schoolId: string, id: string): Promise<EntLogAggregation> {
    const { data, error } = await this.supabase.from('ent_log_aggregations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntLogAggregationNotFoundError(id);
    return data;
  }

  async findAllLogAggregations(schoolId: string): Promise<EntLogAggregation[]> {
    const { data, error } = await this.supabase.from('ent_log_aggregations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createLogAggregation(schoolId: string, data: EntLogAggregationCreate): Promise<EntLogAggregation> {
    const { data: result, error } = await this.supabase.from('ent_log_aggregations').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateLogAggregation(schoolId: string, id: string, data: EntLogAggregationUpdate): Promise<EntLogAggregation> {
    const { data: result, error } = await this.supabase.from('ent_log_aggregations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntLogAggregationNotFoundError(id);
    return result;
  }

  async deleteLogAggregation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_log_aggregations').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countLogAggregations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_log_aggregations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findLogAggregationByStatus(schoolId: string, status: string): Promise<EntLogAggregation[]> {
    const { data, error } = await this.supabase.from('ent_log_aggregations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveLogAggregations(schoolId: string): Promise<EntLogAggregation[]> {
    const { data, error } = await this.supabase.from('ent_log_aggregations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findLogAggregationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntLogAggregation[]> {
    const { data, error } = await this.supabase.from('ent_log_aggregations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findLogAggregationByDateRange(schoolId: string, start: string, end: string): Promise<EntLogAggregation[]> {
    const { data, error } = await this.supabase.from('ent_log_aggregations').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- MetricsAggregation -----------------------------------------------------
  async findMetricsAggregationById(schoolId: string, id: string): Promise<EntMetricsAggregation> {
    const { data, error } = await this.supabase.from('ent_metrics_aggregations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntMetricsAggregationNotFoundError(id);
    return data;
  }

  async findAllMetricsAggregations(schoolId: string): Promise<EntMetricsAggregation[]> {
    const { data, error } = await this.supabase.from('ent_metrics_aggregations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createMetricsAggregation(schoolId: string, data: EntMetricsAggregationCreate): Promise<EntMetricsAggregation> {
    const { data: result, error } = await this.supabase.from('ent_metrics_aggregations').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateMetricsAggregation(schoolId: string, id: string, data: EntMetricsAggregationUpdate): Promise<EntMetricsAggregation> {
    const { data: result, error } = await this.supabase.from('ent_metrics_aggregations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntMetricsAggregationNotFoundError(id);
    return result;
  }

  async deleteMetricsAggregation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_metrics_aggregations').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countMetricsAggregations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_metrics_aggregations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findMetricsAggregationByStatus(schoolId: string, status: string): Promise<EntMetricsAggregation[]> {
    const { data, error } = await this.supabase.from('ent_metrics_aggregations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveMetricsAggregations(schoolId: string): Promise<EntMetricsAggregation[]> {
    const { data, error } = await this.supabase.from('ent_metrics_aggregations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findMetricsAggregationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntMetricsAggregation[]> {
    const { data, error } = await this.supabase.from('ent_metrics_aggregations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findMetricsAggregationByDateRange(schoolId: string, start: string, end: string): Promise<EntMetricsAggregation[]> {
    const { data, error } = await this.supabase.from('ent_metrics_aggregations').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- AlertEscalation -----------------------------------------------------
  async findAlertEscalationById(schoolId: string, id: string): Promise<EntAlertEscalation> {
    const { data, error } = await this.supabase.from('ent_alert_escalations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntAlertEscalationNotFoundError(id);
    return data;
  }

  async findAllAlertEscalations(schoolId: string): Promise<EntAlertEscalation[]> {
    const { data, error } = await this.supabase.from('ent_alert_escalations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createAlertEscalation(schoolId: string, data: EntAlertEscalationCreate): Promise<EntAlertEscalation> {
    const { data: result, error } = await this.supabase.from('ent_alert_escalations').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateAlertEscalation(schoolId: string, id: string, data: EntAlertEscalationUpdate): Promise<EntAlertEscalation> {
    const { data: result, error } = await this.supabase.from('ent_alert_escalations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntAlertEscalationNotFoundError(id);
    return result;
  }

  async deleteAlertEscalation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_alert_escalations').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAlertEscalations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_alert_escalations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findAlertEscalationByStatus(schoolId: string, status: string): Promise<EntAlertEscalation[]> {
    const { data, error } = await this.supabase.from('ent_alert_escalations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAlertEscalations(schoolId: string): Promise<EntAlertEscalation[]> {
    const { data, error } = await this.supabase.from('ent_alert_escalations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAlertEscalationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntAlertEscalation[]> {
    const { data, error } = await this.supabase.from('ent_alert_escalations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAlertEscalationByDateRange(schoolId: string, start: string, end: string): Promise<EntAlertEscalation[]> {
    const { data, error } = await this.supabase.from('ent_alert_escalations').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PerformanceBaseline -----------------------------------------------------
  async findPerformanceBaselineById(schoolId: string, id: string): Promise<EntPerformanceBaseline> {
    const { data, error } = await this.supabase.from('ent_performance_baselines').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPerformanceBaselineNotFoundError(id);
    return data;
  }

  async findAllPerformanceBaselines(schoolId: string): Promise<EntPerformanceBaseline[]> {
    const { data, error } = await this.supabase.from('ent_performance_baselines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPerformanceBaseline(schoolId: string, data: EntPerformanceBaselineCreate): Promise<EntPerformanceBaseline> {
    const { data: result, error } = await this.supabase.from('ent_performance_baselines').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePerformanceBaseline(schoolId: string, id: string, data: EntPerformanceBaselineUpdate): Promise<EntPerformanceBaseline> {
    const { data: result, error } = await this.supabase.from('ent_performance_baselines').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPerformanceBaselineNotFoundError(id);
    return result;
  }

  async deletePerformanceBaseline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_performance_baselines').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPerformanceBaselines(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_performance_baselines').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPerformanceBaselineByStatus(schoolId: string, status: string): Promise<EntPerformanceBaseline[]> {
    const { data, error } = await this.supabase.from('ent_performance_baselines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePerformanceBaselines(schoolId: string): Promise<EntPerformanceBaseline[]> {
    const { data, error } = await this.supabase.from('ent_performance_baselines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPerformanceBaselineBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPerformanceBaseline[]> {
    const { data, error } = await this.supabase.from('ent_performance_baselines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPerformanceBaselineByDateRange(schoolId: string, start: string, end: string): Promise<EntPerformanceBaseline[]> {
    const { data, error } = await this.supabase.from('ent_performance_baselines').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- RedisCluster -----------------------------------------------------
  async findRedisClusterById(schoolId: string, id: string): Promise<EntRedisCluster> {
    const { data, error } = await this.supabase.from('ent_redis_clusters').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntRedisClusterNotFoundError(id);
    return data;
  }

  async findAllRedisClusters(schoolId: string): Promise<EntRedisCluster[]> {
    const { data, error } = await this.supabase.from('ent_redis_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createRedisCluster(schoolId: string, data: EntRedisClusterCreate): Promise<EntRedisCluster> {
    const { data: result, error } = await this.supabase.from('ent_redis_clusters').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateRedisCluster(schoolId: string, id: string, data: EntRedisClusterUpdate): Promise<EntRedisCluster> {
    const { data: result, error } = await this.supabase.from('ent_redis_clusters').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntRedisClusterNotFoundError(id);
    return result;
  }

  async deleteRedisCluster(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_redis_clusters').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRedisClusters(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_redis_clusters').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findRedisClusterByStatus(schoolId: string, status: string): Promise<EntRedisCluster[]> {
    const { data, error } = await this.supabase.from('ent_redis_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRedisClusters(schoolId: string): Promise<EntRedisCluster[]> {
    const { data, error } = await this.supabase.from('ent_redis_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRedisClusterBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntRedisCluster[]> {
    const { data, error } = await this.supabase.from('ent_redis_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findRedisClusterByDateRange(schoolId: string, start: string, end: string): Promise<EntRedisCluster[]> {
    const { data, error } = await this.supabase.from('ent_redis_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CacheLayer -----------------------------------------------------
  async findCacheLayerById(schoolId: string, id: string): Promise<EntCacheLayer> {
    const { data, error } = await this.supabase.from('ent_cache_layers').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCacheLayerNotFoundError(id);
    return data;
  }

  async findAllCacheLayers(schoolId: string): Promise<EntCacheLayer[]> {
    const { data, error } = await this.supabase.from('ent_cache_layers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCacheLayer(schoolId: string, data: EntCacheLayerCreate): Promise<EntCacheLayer> {
    const { data: result, error } = await this.supabase.from('ent_cache_layers').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCacheLayer(schoolId: string, id: string, data: EntCacheLayerUpdate): Promise<EntCacheLayer> {
    const { data: result, error } = await this.supabase.from('ent_cache_layers').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCacheLayerNotFoundError(id);
    return result;
  }

  async deleteCacheLayer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_cache_layers').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCacheLayers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_cache_layers').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCacheLayerByStatus(schoolId: string, status: string): Promise<EntCacheLayer[]> {
    const { data, error } = await this.supabase.from('ent_cache_layers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCacheLayers(schoolId: string): Promise<EntCacheLayer[]> {
    const { data, error } = await this.supabase.from('ent_cache_layers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCacheLayerBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCacheLayer[]> {
    const { data, error } = await this.supabase.from('ent_cache_layers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCacheLayerByDateRange(schoolId: string, start: string, end: string): Promise<EntCacheLayer[]> {
    const { data, error } = await this.supabase.from('ent_cache_layers').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CacheEntry -----------------------------------------------------
  async findCacheEntryById(schoolId: string, id: string): Promise<EntCacheEntry> {
    const { data, error } = await this.supabase.from('ent_cache_entries').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCacheEntryNotFoundError(id);
    return data;
  }

  async findAllCacheEntrys(schoolId: string): Promise<EntCacheEntry[]> {
    const { data, error } = await this.supabase.from('ent_cache_entries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCacheEntry(schoolId: string, data: EntCacheEntryCreate): Promise<EntCacheEntry> {
    const { data: result, error } = await this.supabase.from('ent_cache_entries').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCacheEntry(schoolId: string, id: string, data: EntCacheEntryUpdate): Promise<EntCacheEntry> {
    const { data: result, error } = await this.supabase.from('ent_cache_entries').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCacheEntryNotFoundError(id);
    return result;
  }

  async deleteCacheEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_cache_entries').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCacheEntrys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_cache_entries').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCacheEntryByStatus(schoolId: string, status: string): Promise<EntCacheEntry[]> {
    const { data, error } = await this.supabase.from('ent_cache_entries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCacheEntrys(schoolId: string): Promise<EntCacheEntry[]> {
    const { data, error } = await this.supabase.from('ent_cache_entries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCacheEntryBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCacheEntry[]> {
    const { data, error } = await this.supabase.from('ent_cache_entries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCacheEntryByDateRange(schoolId: string, start: string, end: string): Promise<EntCacheEntry[]> {
    const { data, error } = await this.supabase.from('ent_cache_entries').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DistributedCache -----------------------------------------------------
  async findDistributedCacheById(schoolId: string, id: string): Promise<EntDistributedCache> {
    const { data, error } = await this.supabase.from('ent_distributed_caches').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDistributedCacheNotFoundError(id);
    return data;
  }

  async findAllDistributedCaches(schoolId: string): Promise<EntDistributedCache[]> {
    const { data, error } = await this.supabase.from('ent_distributed_caches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDistributedCache(schoolId: string, data: EntDistributedCacheCreate): Promise<EntDistributedCache> {
    const { data: result, error } = await this.supabase.from('ent_distributed_caches').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDistributedCache(schoolId: string, id: string, data: EntDistributedCacheUpdate): Promise<EntDistributedCache> {
    const { data: result, error } = await this.supabase.from('ent_distributed_caches').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDistributedCacheNotFoundError(id);
    return result;
  }

  async deleteDistributedCache(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_distributed_caches').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDistributedCaches(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_distributed_caches').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDistributedCacheByStatus(schoolId: string, status: string): Promise<EntDistributedCache[]> {
    const { data, error } = await this.supabase.from('ent_distributed_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDistributedCaches(schoolId: string): Promise<EntDistributedCache[]> {
    const { data, error } = await this.supabase.from('ent_distributed_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDistributedCacheBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDistributedCache[]> {
    const { data, error } = await this.supabase.from('ent_distributed_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDistributedCacheByDateRange(schoolId: string, start: string, end: string): Promise<EntDistributedCache[]> {
    const { data, error } = await this.supabase.from('ent_distributed_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- QueryCache -----------------------------------------------------
  async findQueryCacheById(schoolId: string, id: string): Promise<EntQueryCache> {
    const { data, error } = await this.supabase.from('ent_query_caches').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntQueryCacheNotFoundError(id);
    return data;
  }

  async findAllQueryCaches(schoolId: string): Promise<EntQueryCache[]> {
    const { data, error } = await this.supabase.from('ent_query_caches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createQueryCache(schoolId: string, data: EntQueryCacheCreate): Promise<EntQueryCache> {
    const { data: result, error } = await this.supabase.from('ent_query_caches').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateQueryCache(schoolId: string, id: string, data: EntQueryCacheUpdate): Promise<EntQueryCache> {
    const { data: result, error } = await this.supabase.from('ent_query_caches').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntQueryCacheNotFoundError(id);
    return result;
  }

  async deleteQueryCache(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_query_caches').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countQueryCaches(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_query_caches').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findQueryCacheByStatus(schoolId: string, status: string): Promise<EntQueryCache[]> {
    const { data, error } = await this.supabase.from('ent_query_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveQueryCaches(schoolId: string): Promise<EntQueryCache[]> {
    const { data, error } = await this.supabase.from('ent_query_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findQueryCacheBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntQueryCache[]> {
    const { data, error } = await this.supabase.from('ent_query_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findQueryCacheByDateRange(schoolId: string, start: string, end: string): Promise<EntQueryCache[]> {
    const { data, error } = await this.supabase.from('ent_query_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ApiCache -----------------------------------------------------
  async findApiCacheById(schoolId: string, id: string): Promise<EntApiCache> {
    const { data, error } = await this.supabase.from('ent_api_caches').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntApiCacheNotFoundError(id);
    return data;
  }

  async findAllApiCaches(schoolId: string): Promise<EntApiCache[]> {
    const { data, error } = await this.supabase.from('ent_api_caches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createApiCache(schoolId: string, data: EntApiCacheCreate): Promise<EntApiCache> {
    const { data: result, error } = await this.supabase.from('ent_api_caches').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateApiCache(schoolId: string, id: string, data: EntApiCacheUpdate): Promise<EntApiCache> {
    const { data: result, error } = await this.supabase.from('ent_api_caches').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntApiCacheNotFoundError(id);
    return result;
  }

  async deleteApiCache(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_api_caches').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countApiCaches(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_api_caches').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findApiCacheByStatus(schoolId: string, status: string): Promise<EntApiCache[]> {
    const { data, error } = await this.supabase.from('ent_api_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveApiCaches(schoolId: string): Promise<EntApiCache[]> {
    const { data, error } = await this.supabase.from('ent_api_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findApiCacheBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntApiCache[]> {
    const { data, error } = await this.supabase.from('ent_api_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findApiCacheByDateRange(schoolId: string, start: string, end: string): Promise<EntApiCache[]> {
    const { data, error } = await this.supabase.from('ent_api_caches').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CacheInvalidation -----------------------------------------------------
  async findCacheInvalidationById(schoolId: string, id: string): Promise<EntCacheInvalidation> {
    const { data, error } = await this.supabase.from('ent_cache_invalidations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCacheInvalidationNotFoundError(id);
    return data;
  }

  async findAllCacheInvalidations(schoolId: string): Promise<EntCacheInvalidation[]> {
    const { data, error } = await this.supabase.from('ent_cache_invalidations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCacheInvalidation(schoolId: string, data: EntCacheInvalidationCreate): Promise<EntCacheInvalidation> {
    const { data: result, error } = await this.supabase.from('ent_cache_invalidations').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCacheInvalidation(schoolId: string, id: string, data: EntCacheInvalidationUpdate): Promise<EntCacheInvalidation> {
    const { data: result, error } = await this.supabase.from('ent_cache_invalidations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCacheInvalidationNotFoundError(id);
    return result;
  }

  async deleteCacheInvalidation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_cache_invalidations').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCacheInvalidations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_cache_invalidations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCacheInvalidationByStatus(schoolId: string, status: string): Promise<EntCacheInvalidation[]> {
    const { data, error } = await this.supabase.from('ent_cache_invalidations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCacheInvalidations(schoolId: string): Promise<EntCacheInvalidation[]> {
    const { data, error } = await this.supabase.from('ent_cache_invalidations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCacheInvalidationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCacheInvalidation[]> {
    const { data, error } = await this.supabase.from('ent_cache_invalidations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCacheInvalidationByDateRange(schoolId: string, start: string, end: string): Promise<EntCacheInvalidation[]> {
    const { data, error } = await this.supabase.from('ent_cache_invalidations').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CacheMetrics -----------------------------------------------------
  async findCacheMetricsById(schoolId: string, id: string): Promise<EntCacheMetrics> {
    const { data, error } = await this.supabase.from('ent_cache_metrics').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCacheMetricsNotFoundError(id);
    return data;
  }

  async findAllCacheMetricss(schoolId: string): Promise<EntCacheMetrics[]> {
    const { data, error } = await this.supabase.from('ent_cache_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCacheMetrics(schoolId: string, data: EntCacheMetricsCreate): Promise<EntCacheMetrics> {
    const { data: result, error } = await this.supabase.from('ent_cache_metrics').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCacheMetrics(schoolId: string, id: string, data: EntCacheMetricsUpdate): Promise<EntCacheMetrics> {
    const { data: result, error } = await this.supabase.from('ent_cache_metrics').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCacheMetricsNotFoundError(id);
    return result;
  }

  async deleteCacheMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_cache_metrics').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCacheMetricss(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_cache_metrics').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCacheMetricsByStatus(schoolId: string, status: string): Promise<EntCacheMetrics[]> {
    const { data, error } = await this.supabase.from('ent_cache_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCacheMetricss(schoolId: string): Promise<EntCacheMetrics[]> {
    const { data, error } = await this.supabase.from('ent_cache_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCacheMetricsBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCacheMetrics[]> {
    const { data, error } = await this.supabase.from('ent_cache_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCacheMetricsByDateRange(schoolId: string, start: string, end: string): Promise<EntCacheMetrics[]> {
    const { data, error } = await this.supabase.from('ent_cache_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CacheWarmer -----------------------------------------------------
  async findCacheWarmerById(schoolId: string, id: string): Promise<EntCacheWarmer> {
    const { data, error } = await this.supabase.from('ent_cache_warmers').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCacheWarmerNotFoundError(id);
    return data;
  }

  async findAllCacheWarmers(schoolId: string): Promise<EntCacheWarmer[]> {
    const { data, error } = await this.supabase.from('ent_cache_warmers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCacheWarmer(schoolId: string, data: EntCacheWarmerCreate): Promise<EntCacheWarmer> {
    const { data: result, error } = await this.supabase.from('ent_cache_warmers').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCacheWarmer(schoolId: string, id: string, data: EntCacheWarmerUpdate): Promise<EntCacheWarmer> {
    const { data: result, error } = await this.supabase.from('ent_cache_warmers').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCacheWarmerNotFoundError(id);
    return result;
  }

  async deleteCacheWarmer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_cache_warmers').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCacheWarmers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_cache_warmers').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCacheWarmerByStatus(schoolId: string, status: string): Promise<EntCacheWarmer[]> {
    const { data, error } = await this.supabase.from('ent_cache_warmers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCacheWarmers(schoolId: string): Promise<EntCacheWarmer[]> {
    const { data, error } = await this.supabase.from('ent_cache_warmers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCacheWarmerBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCacheWarmer[]> {
    const { data, error } = await this.supabase.from('ent_cache_warmers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCacheWarmerByDateRange(schoolId: string, start: string, end: string): Promise<EntCacheWarmer[]> {
    const { data, error } = await this.supabase.from('ent_cache_warmers').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CacheSnapshot -----------------------------------------------------
  async findCacheSnapshotById(schoolId: string, id: string): Promise<EntCacheSnapshot> {
    const { data, error } = await this.supabase.from('ent_cache_snapshots').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCacheSnapshotNotFoundError(id);
    return data;
  }

  async findAllCacheSnapshots(schoolId: string): Promise<EntCacheSnapshot[]> {
    const { data, error } = await this.supabase.from('ent_cache_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCacheSnapshot(schoolId: string, data: EntCacheSnapshotCreate): Promise<EntCacheSnapshot> {
    const { data: result, error } = await this.supabase.from('ent_cache_snapshots').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCacheSnapshot(schoolId: string, id: string, data: EntCacheSnapshotUpdate): Promise<EntCacheSnapshot> {
    const { data: result, error } = await this.supabase.from('ent_cache_snapshots').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCacheSnapshotNotFoundError(id);
    return result;
  }

  async deleteCacheSnapshot(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_cache_snapshots').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCacheSnapshots(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_cache_snapshots').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCacheSnapshotByStatus(schoolId: string, status: string): Promise<EntCacheSnapshot[]> {
    const { data, error } = await this.supabase.from('ent_cache_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCacheSnapshots(schoolId: string): Promise<EntCacheSnapshot[]> {
    const { data, error } = await this.supabase.from('ent_cache_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCacheSnapshotBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCacheSnapshot[]> {
    const { data, error } = await this.supabase.from('ent_cache_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCacheSnapshotByDateRange(schoolId: string, start: string, end: string): Promise<EntCacheSnapshot[]> {
    const { data, error } = await this.supabase.from('ent_cache_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CachePolicy -----------------------------------------------------
  async findCachePolicyById(schoolId: string, id: string): Promise<EntCachePolicy> {
    const { data, error } = await this.supabase.from('ent_cache_policies').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCachePolicyNotFoundError(id);
    return data;
  }

  async findAllCachePolicys(schoolId: string): Promise<EntCachePolicy[]> {
    const { data, error } = await this.supabase.from('ent_cache_policies').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCachePolicy(schoolId: string, data: EntCachePolicyCreate): Promise<EntCachePolicy> {
    const { data: result, error } = await this.supabase.from('ent_cache_policies').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCachePolicy(schoolId: string, id: string, data: EntCachePolicyUpdate): Promise<EntCachePolicy> {
    const { data: result, error } = await this.supabase.from('ent_cache_policies').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCachePolicyNotFoundError(id);
    return result;
  }

  async deleteCachePolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_cache_policies').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCachePolicys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_cache_policies').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCachePolicyByStatus(schoolId: string, status: string): Promise<EntCachePolicy[]> {
    const { data, error } = await this.supabase.from('ent_cache_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCachePolicys(schoolId: string): Promise<EntCachePolicy[]> {
    const { data, error } = await this.supabase.from('ent_cache_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCachePolicyBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCachePolicy[]> {
    const { data, error } = await this.supabase.from('ent_cache_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCachePolicyByDateRange(schoolId: string, start: string, end: string): Promise<EntCachePolicy[]> {
    const { data, error } = await this.supabase.from('ent_cache_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CacheCluster -----------------------------------------------------
  async findCacheClusterById(schoolId: string, id: string): Promise<EntCacheCluster> {
    const { data, error } = await this.supabase.from('ent_cache_clusters').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCacheClusterNotFoundError(id);
    return data;
  }

  async findAllCacheClusters(schoolId: string): Promise<EntCacheCluster[]> {
    const { data, error } = await this.supabase.from('ent_cache_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCacheCluster(schoolId: string, data: EntCacheClusterCreate): Promise<EntCacheCluster> {
    const { data: result, error } = await this.supabase.from('ent_cache_clusters').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCacheCluster(schoolId: string, id: string, data: EntCacheClusterUpdate): Promise<EntCacheCluster> {
    const { data: result, error } = await this.supabase.from('ent_cache_clusters').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCacheClusterNotFoundError(id);
    return result;
  }

  async deleteCacheCluster(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_cache_clusters').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCacheClusters(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_cache_clusters').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCacheClusterByStatus(schoolId: string, status: string): Promise<EntCacheCluster[]> {
    const { data, error } = await this.supabase.from('ent_cache_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCacheClusters(schoolId: string): Promise<EntCacheCluster[]> {
    const { data, error } = await this.supabase.from('ent_cache_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCacheClusterBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCacheCluster[]> {
    const { data, error } = await this.supabase.from('ent_cache_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCacheClusterByDateRange(schoolId: string, start: string, end: string): Promise<EntCacheCluster[]> {
    const { data, error } = await this.supabase.from('ent_cache_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SearchIndex -----------------------------------------------------
  async findSearchIndexById(schoolId: string, id: string): Promise<EntSearchIndex> {
    const { data, error } = await this.supabase.from('ent_search_indexes').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSearchIndexNotFoundError(id);
    return data;
  }

  async findAllSearchIndexs(schoolId: string): Promise<EntSearchIndex[]> {
    const { data, error } = await this.supabase.from('ent_search_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSearchIndex(schoolId: string, data: EntSearchIndexCreate): Promise<EntSearchIndex> {
    const { data: result, error } = await this.supabase.from('ent_search_indexes').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSearchIndex(schoolId: string, id: string, data: EntSearchIndexUpdate): Promise<EntSearchIndex> {
    const { data: result, error } = await this.supabase.from('ent_search_indexes').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSearchIndexNotFoundError(id);
    return result;
  }

  async deleteSearchIndex(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_search_indexes').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSearchIndexs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_search_indexes').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSearchIndexByStatus(schoolId: string, status: string): Promise<EntSearchIndex[]> {
    const { data, error } = await this.supabase.from('ent_search_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSearchIndexs(schoolId: string): Promise<EntSearchIndex[]> {
    const { data, error } = await this.supabase.from('ent_search_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSearchIndexBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSearchIndex[]> {
    const { data, error } = await this.supabase.from('ent_search_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSearchIndexByDateRange(schoolId: string, start: string, end: string): Promise<EntSearchIndex[]> {
    const { data, error } = await this.supabase.from('ent_search_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SearchDocument -----------------------------------------------------
  async findSearchDocumentById(schoolId: string, id: string): Promise<EntSearchDocument> {
    const { data, error } = await this.supabase.from('ent_search_documents').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSearchDocumentNotFoundError(id);
    return data;
  }

  async findAllSearchDocuments(schoolId: string): Promise<EntSearchDocument[]> {
    const { data, error } = await this.supabase.from('ent_search_documents').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSearchDocument(schoolId: string, data: EntSearchDocumentCreate): Promise<EntSearchDocument> {
    const { data: result, error } = await this.supabase.from('ent_search_documents').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSearchDocument(schoolId: string, id: string, data: EntSearchDocumentUpdate): Promise<EntSearchDocument> {
    const { data: result, error } = await this.supabase.from('ent_search_documents').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSearchDocumentNotFoundError(id);
    return result;
  }

  async deleteSearchDocument(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_search_documents').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSearchDocuments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_search_documents').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSearchDocumentByStatus(schoolId: string, status: string): Promise<EntSearchDocument[]> {
    const { data, error } = await this.supabase.from('ent_search_documents').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSearchDocuments(schoolId: string): Promise<EntSearchDocument[]> {
    const { data, error } = await this.supabase.from('ent_search_documents').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSearchDocumentBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSearchDocument[]> {
    const { data, error } = await this.supabase.from('ent_search_documents').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSearchDocumentByDateRange(schoolId: string, start: string, end: string): Promise<EntSearchDocument[]> {
    const { data, error } = await this.supabase.from('ent_search_documents').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SearchQuery -----------------------------------------------------
  async findSearchQueryById(schoolId: string, id: string): Promise<EntSearchQuery> {
    const { data, error } = await this.supabase.from('ent_search_queries').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSearchQueryNotFoundError(id);
    return data;
  }

  async findAllSearchQuerys(schoolId: string): Promise<EntSearchQuery[]> {
    const { data, error } = await this.supabase.from('ent_search_queries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSearchQuery(schoolId: string, data: EntSearchQueryCreate): Promise<EntSearchQuery> {
    const { data: result, error } = await this.supabase.from('ent_search_queries').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSearchQuery(schoolId: string, id: string, data: EntSearchQueryUpdate): Promise<EntSearchQuery> {
    const { data: result, error } = await this.supabase.from('ent_search_queries').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSearchQueryNotFoundError(id);
    return result;
  }

  async deleteSearchQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_search_queries').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSearchQuerys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_search_queries').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSearchQueryByStatus(schoolId: string, status: string): Promise<EntSearchQuery[]> {
    const { data, error } = await this.supabase.from('ent_search_queries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSearchQuerys(schoolId: string): Promise<EntSearchQuery[]> {
    const { data, error } = await this.supabase.from('ent_search_queries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSearchQueryBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSearchQuery[]> {
    const { data, error } = await this.supabase.from('ent_search_queries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSearchQueryByDateRange(schoolId: string, start: string, end: string): Promise<EntSearchQuery[]> {
    const { data, error } = await this.supabase.from('ent_search_queries').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SearchSuggestion -----------------------------------------------------
  async findSearchSuggestionById(schoolId: string, id: string): Promise<EntSearchSuggestion> {
    const { data, error } = await this.supabase.from('ent_search_suggestions').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSearchSuggestionNotFoundError(id);
    return data;
  }

  async findAllSearchSuggestions(schoolId: string): Promise<EntSearchSuggestion[]> {
    const { data, error } = await this.supabase.from('ent_search_suggestions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSearchSuggestion(schoolId: string, data: EntSearchSuggestionCreate): Promise<EntSearchSuggestion> {
    const { data: result, error } = await this.supabase.from('ent_search_suggestions').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSearchSuggestion(schoolId: string, id: string, data: EntSearchSuggestionUpdate): Promise<EntSearchSuggestion> {
    const { data: result, error } = await this.supabase.from('ent_search_suggestions').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSearchSuggestionNotFoundError(id);
    return result;
  }

  async deleteSearchSuggestion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_search_suggestions').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSearchSuggestions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_search_suggestions').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSearchSuggestionByStatus(schoolId: string, status: string): Promise<EntSearchSuggestion[]> {
    const { data, error } = await this.supabase.from('ent_search_suggestions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSearchSuggestions(schoolId: string): Promise<EntSearchSuggestion[]> {
    const { data, error } = await this.supabase.from('ent_search_suggestions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSearchSuggestionBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSearchSuggestion[]> {
    const { data, error } = await this.supabase.from('ent_search_suggestions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSearchSuggestionByDateRange(schoolId: string, start: string, end: string): Promise<EntSearchSuggestion[]> {
    const { data, error } = await this.supabase.from('ent_search_suggestions').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SearchAnalytics -----------------------------------------------------
  async findSearchAnalyticsById(schoolId: string, id: string): Promise<EntSearchAnalytics> {
    const { data, error } = await this.supabase.from('ent_search_analytics').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSearchAnalyticsNotFoundError(id);
    return data;
  }

  async findAllSearchAnalyticss(schoolId: string): Promise<EntSearchAnalytics[]> {
    const { data, error } = await this.supabase.from('ent_search_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSearchAnalytics(schoolId: string, data: EntSearchAnalyticsCreate): Promise<EntSearchAnalytics> {
    const { data: result, error } = await this.supabase.from('ent_search_analytics').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSearchAnalytics(schoolId: string, id: string, data: EntSearchAnalyticsUpdate): Promise<EntSearchAnalytics> {
    const { data: result, error } = await this.supabase.from('ent_search_analytics').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSearchAnalyticsNotFoundError(id);
    return result;
  }

  async deleteSearchAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_search_analytics').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSearchAnalyticss(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_search_analytics').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSearchAnalyticsByStatus(schoolId: string, status: string): Promise<EntSearchAnalytics[]> {
    const { data, error } = await this.supabase.from('ent_search_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSearchAnalyticss(schoolId: string): Promise<EntSearchAnalytics[]> {
    const { data, error } = await this.supabase.from('ent_search_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSearchAnalyticsBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSearchAnalytics[]> {
    const { data, error } = await this.supabase.from('ent_search_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSearchAnalyticsByDateRange(schoolId: string, start: string, end: string): Promise<EntSearchAnalytics[]> {
    const { data, error } = await this.supabase.from('ent_search_analytics').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- GlobalSearchConfig -----------------------------------------------------
  async findGlobalSearchConfigById(schoolId: string, id: string): Promise<EntGlobalSearchConfig> {
    const { data, error } = await this.supabase.from('ent_global_search_configs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntGlobalSearchConfigNotFoundError(id);
    return data;
  }

  async findAllGlobalSearchConfigs(schoolId: string): Promise<EntGlobalSearchConfig[]> {
    const { data, error } = await this.supabase.from('ent_global_search_configs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createGlobalSearchConfig(schoolId: string, data: EntGlobalSearchConfigCreate): Promise<EntGlobalSearchConfig> {
    const { data: result, error } = await this.supabase.from('ent_global_search_configs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateGlobalSearchConfig(schoolId: string, id: string, data: EntGlobalSearchConfigUpdate): Promise<EntGlobalSearchConfig> {
    const { data: result, error } = await this.supabase.from('ent_global_search_configs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntGlobalSearchConfigNotFoundError(id);
    return result;
  }

  async deleteGlobalSearchConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_global_search_configs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countGlobalSearchConfigs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_global_search_configs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findGlobalSearchConfigByStatus(schoolId: string, status: string): Promise<EntGlobalSearchConfig[]> {
    const { data, error } = await this.supabase.from('ent_global_search_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveGlobalSearchConfigs(schoolId: string): Promise<EntGlobalSearchConfig[]> {
    const { data, error } = await this.supabase.from('ent_global_search_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findGlobalSearchConfigBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntGlobalSearchConfig[]> {
    const { data, error } = await this.supabase.from('ent_global_search_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findGlobalSearchConfigByDateRange(schoolId: string, start: string, end: string): Promise<EntGlobalSearchConfig[]> {
    const { data, error } = await this.supabase.from('ent_global_search_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ElasticCluster -----------------------------------------------------
  async findElasticClusterById(schoolId: string, id: string): Promise<EntElasticCluster> {
    const { data, error } = await this.supabase.from('ent_elastic_clusters').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntElasticClusterNotFoundError(id);
    return data;
  }

  async findAllElasticClusters(schoolId: string): Promise<EntElasticCluster[]> {
    const { data, error } = await this.supabase.from('ent_elastic_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createElasticCluster(schoolId: string, data: EntElasticClusterCreate): Promise<EntElasticCluster> {
    const { data: result, error } = await this.supabase.from('ent_elastic_clusters').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateElasticCluster(schoolId: string, id: string, data: EntElasticClusterUpdate): Promise<EntElasticCluster> {
    const { data: result, error } = await this.supabase.from('ent_elastic_clusters').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntElasticClusterNotFoundError(id);
    return result;
  }

  async deleteElasticCluster(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_elastic_clusters').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countElasticClusters(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_elastic_clusters').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findElasticClusterByStatus(schoolId: string, status: string): Promise<EntElasticCluster[]> {
    const { data, error } = await this.supabase.from('ent_elastic_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveElasticClusters(schoolId: string): Promise<EntElasticCluster[]> {
    const { data, error } = await this.supabase.from('ent_elastic_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findElasticClusterBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntElasticCluster[]> {
    const { data, error } = await this.supabase.from('ent_elastic_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findElasticClusterByDateRange(schoolId: string, start: string, end: string): Promise<EntElasticCluster[]> {
    const { data, error } = await this.supabase.from('ent_elastic_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- IndexBuilder -----------------------------------------------------
  async findIndexBuilderById(schoolId: string, id: string): Promise<EntIndexBuilder> {
    const { data, error } = await this.supabase.from('ent_index_builders').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntIndexBuilderNotFoundError(id);
    return data;
  }

  async findAllIndexBuilders(schoolId: string): Promise<EntIndexBuilder[]> {
    const { data, error } = await this.supabase.from('ent_index_builders').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createIndexBuilder(schoolId: string, data: EntIndexBuilderCreate): Promise<EntIndexBuilder> {
    const { data: result, error } = await this.supabase.from('ent_index_builders').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateIndexBuilder(schoolId: string, id: string, data: EntIndexBuilderUpdate): Promise<EntIndexBuilder> {
    const { data: result, error } = await this.supabase.from('ent_index_builders').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntIndexBuilderNotFoundError(id);
    return result;
  }

  async deleteIndexBuilder(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_index_builders').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countIndexBuilders(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_index_builders').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findIndexBuilderByStatus(schoolId: string, status: string): Promise<EntIndexBuilder[]> {
    const { data, error } = await this.supabase.from('ent_index_builders').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveIndexBuilders(schoolId: string): Promise<EntIndexBuilder[]> {
    const { data, error } = await this.supabase.from('ent_index_builders').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findIndexBuilderBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntIndexBuilder[]> {
    const { data, error } = await this.supabase.from('ent_index_builders').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findIndexBuilderByDateRange(schoolId: string, start: string, end: string): Promise<EntIndexBuilder[]> {
    const { data, error } = await this.supabase.from('ent_index_builders').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- IncrementalIndex -----------------------------------------------------
  async findIncrementalIndexById(schoolId: string, id: string): Promise<EntIncrementalIndex> {
    const { data, error } = await this.supabase.from('ent_incremental_indexes').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntIncrementalIndexNotFoundError(id);
    return data;
  }

  async findAllIncrementalIndexs(schoolId: string): Promise<EntIncrementalIndex[]> {
    const { data, error } = await this.supabase.from('ent_incremental_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createIncrementalIndex(schoolId: string, data: EntIncrementalIndexCreate): Promise<EntIncrementalIndex> {
    const { data: result, error } = await this.supabase.from('ent_incremental_indexes').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateIncrementalIndex(schoolId: string, id: string, data: EntIncrementalIndexUpdate): Promise<EntIncrementalIndex> {
    const { data: result, error } = await this.supabase.from('ent_incremental_indexes').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntIncrementalIndexNotFoundError(id);
    return result;
  }

  async deleteIncrementalIndex(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_incremental_indexes').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countIncrementalIndexs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_incremental_indexes').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findIncrementalIndexByStatus(schoolId: string, status: string): Promise<EntIncrementalIndex[]> {
    const { data, error } = await this.supabase.from('ent_incremental_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveIncrementalIndexs(schoolId: string): Promise<EntIncrementalIndex[]> {
    const { data, error } = await this.supabase.from('ent_incremental_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findIncrementalIndexBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntIncrementalIndex[]> {
    const { data, error } = await this.supabase.from('ent_incremental_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findIncrementalIndexByDateRange(schoolId: string, start: string, end: string): Promise<EntIncrementalIndex[]> {
    const { data, error } = await this.supabase.from('ent_incremental_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PeopleSearch -----------------------------------------------------
  async findPeopleSearchById(schoolId: string, id: string): Promise<EntPeopleSearch> {
    const { data, error } = await this.supabase.from('ent_people_searches').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPeopleSearchNotFoundError(id);
    return data;
  }

  async findAllPeopleSearchs(schoolId: string): Promise<EntPeopleSearch[]> {
    const { data, error } = await this.supabase.from('ent_people_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPeopleSearch(schoolId: string, data: EntPeopleSearchCreate): Promise<EntPeopleSearch> {
    const { data: result, error } = await this.supabase.from('ent_people_searches').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePeopleSearch(schoolId: string, id: string, data: EntPeopleSearchUpdate): Promise<EntPeopleSearch> {
    const { data: result, error } = await this.supabase.from('ent_people_searches').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPeopleSearchNotFoundError(id);
    return result;
  }

  async deletePeopleSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_people_searches').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPeopleSearchs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_people_searches').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPeopleSearchByStatus(schoolId: string, status: string): Promise<EntPeopleSearch[]> {
    const { data, error } = await this.supabase.from('ent_people_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePeopleSearchs(schoolId: string): Promise<EntPeopleSearch[]> {
    const { data, error } = await this.supabase.from('ent_people_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPeopleSearchBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPeopleSearch[]> {
    const { data, error } = await this.supabase.from('ent_people_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPeopleSearchByDateRange(schoolId: string, start: string, end: string): Promise<EntPeopleSearch[]> {
    const { data, error } = await this.supabase.from('ent_people_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SchoolSearch -----------------------------------------------------
  async findSchoolSearchById(schoolId: string, id: string): Promise<EntSchoolSearch> {
    const { data, error } = await this.supabase.from('ent_school_searches').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSchoolSearchNotFoundError(id);
    return data;
  }

  async findAllSchoolSearchs(schoolId: string): Promise<EntSchoolSearch[]> {
    const { data, error } = await this.supabase.from('ent_school_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSchoolSearch(schoolId: string, data: EntSchoolSearchCreate): Promise<EntSchoolSearch> {
    const { data: result, error } = await this.supabase.from('ent_school_searches').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSchoolSearch(schoolId: string, id: string, data: EntSchoolSearchUpdate): Promise<EntSchoolSearch> {
    const { data: result, error } = await this.supabase.from('ent_school_searches').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSchoolSearchNotFoundError(id);
    return result;
  }

  async deleteSchoolSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_school_searches').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSchoolSearchs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_school_searches').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSchoolSearchByStatus(schoolId: string, status: string): Promise<EntSchoolSearch[]> {
    const { data, error } = await this.supabase.from('ent_school_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSchoolSearchs(schoolId: string): Promise<EntSchoolSearch[]> {
    const { data, error } = await this.supabase.from('ent_school_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSchoolSearchBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSchoolSearch[]> {
    const { data, error } = await this.supabase.from('ent_school_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSchoolSearchByDateRange(schoolId: string, start: string, end: string): Promise<EntSchoolSearch[]> {
    const { data, error } = await this.supabase.from('ent_school_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- AnalyticsSearch -----------------------------------------------------
  async findAnalyticsSearchById(schoolId: string, id: string): Promise<EntAnalyticsSearch> {
    const { data, error } = await this.supabase.from('ent_analytics_searches').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntAnalyticsSearchNotFoundError(id);
    return data;
  }

  async findAllAnalyticsSearchs(schoolId: string): Promise<EntAnalyticsSearch[]> {
    const { data, error } = await this.supabase.from('ent_analytics_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createAnalyticsSearch(schoolId: string, data: EntAnalyticsSearchCreate): Promise<EntAnalyticsSearch> {
    const { data: result, error } = await this.supabase.from('ent_analytics_searches').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateAnalyticsSearch(schoolId: string, id: string, data: EntAnalyticsSearchUpdate): Promise<EntAnalyticsSearch> {
    const { data: result, error } = await this.supabase.from('ent_analytics_searches').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntAnalyticsSearchNotFoundError(id);
    return result;
  }

  async deleteAnalyticsSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_analytics_searches').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAnalyticsSearchs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_analytics_searches').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findAnalyticsSearchByStatus(schoolId: string, status: string): Promise<EntAnalyticsSearch[]> {
    const { data, error } = await this.supabase.from('ent_analytics_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAnalyticsSearchs(schoolId: string): Promise<EntAnalyticsSearch[]> {
    const { data, error } = await this.supabase.from('ent_analytics_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAnalyticsSearchBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntAnalyticsSearch[]> {
    const { data, error } = await this.supabase.from('ent_analytics_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAnalyticsSearchByDateRange(schoolId: string, start: string, end: string): Promise<EntAnalyticsSearch[]> {
    const { data, error } = await this.supabase.from('ent_analytics_searches').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SearchRelevance -----------------------------------------------------
  async findSearchRelevanceById(schoolId: string, id: string): Promise<EntSearchRelevance> {
    const { data, error } = await this.supabase.from('ent_search_relevances').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSearchRelevanceNotFoundError(id);
    return data;
  }

  async findAllSearchRelevances(schoolId: string): Promise<EntSearchRelevance[]> {
    const { data, error } = await this.supabase.from('ent_search_relevances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSearchRelevance(schoolId: string, data: EntSearchRelevanceCreate): Promise<EntSearchRelevance> {
    const { data: result, error } = await this.supabase.from('ent_search_relevances').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSearchRelevance(schoolId: string, id: string, data: EntSearchRelevanceUpdate): Promise<EntSearchRelevance> {
    const { data: result, error } = await this.supabase.from('ent_search_relevances').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSearchRelevanceNotFoundError(id);
    return result;
  }

  async deleteSearchRelevance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_search_relevances').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSearchRelevances(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_search_relevances').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSearchRelevanceByStatus(schoolId: string, status: string): Promise<EntSearchRelevance[]> {
    const { data, error } = await this.supabase.from('ent_search_relevances').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSearchRelevances(schoolId: string): Promise<EntSearchRelevance[]> {
    const { data, error } = await this.supabase.from('ent_search_relevances').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSearchRelevanceBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSearchRelevance[]> {
    const { data, error } = await this.supabase.from('ent_search_relevances').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSearchRelevanceByDateRange(schoolId: string, start: string, end: string): Promise<EntSearchRelevance[]> {
    const { data, error } = await this.supabase.from('ent_search_relevances').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SearchSynonym -----------------------------------------------------
  async findSearchSynonymById(schoolId: string, id: string): Promise<EntSearchSynonym> {
    const { data, error } = await this.supabase.from('ent_search_synonyms').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSearchSynonymNotFoundError(id);
    return data;
  }

  async findAllSearchSynonyms(schoolId: string): Promise<EntSearchSynonym[]> {
    const { data, error } = await this.supabase.from('ent_search_synonyms').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSearchSynonym(schoolId: string, data: EntSearchSynonymCreate): Promise<EntSearchSynonym> {
    const { data: result, error } = await this.supabase.from('ent_search_synonyms').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSearchSynonym(schoolId: string, id: string, data: EntSearchSynonymUpdate): Promise<EntSearchSynonym> {
    const { data: result, error } = await this.supabase.from('ent_search_synonyms').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSearchSynonymNotFoundError(id);
    return result;
  }

  async deleteSearchSynonym(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_search_synonyms').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSearchSynonyms(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_search_synonyms').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSearchSynonymByStatus(schoolId: string, status: string): Promise<EntSearchSynonym[]> {
    const { data, error } = await this.supabase.from('ent_search_synonyms').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSearchSynonyms(schoolId: string): Promise<EntSearchSynonym[]> {
    const { data, error } = await this.supabase.from('ent_search_synonyms').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSearchSynonymBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSearchSynonym[]> {
    const { data, error } = await this.supabase.from('ent_search_synonyms').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSearchSynonymByDateRange(schoolId: string, start: string, end: string): Promise<EntSearchSynonym[]> {
    const { data, error } = await this.supabase.from('ent_search_synonyms').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ZeroTrustPolicy -----------------------------------------------------
  async findZeroTrustPolicyById(schoolId: string, id: string): Promise<EntZeroTrustPolicy> {
    const { data, error } = await this.supabase.from('ent_zero_trust_policies').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntZeroTrustPolicyNotFoundError(id);
    return data;
  }

  async findAllZeroTrustPolicys(schoolId: string): Promise<EntZeroTrustPolicy[]> {
    const { data, error } = await this.supabase.from('ent_zero_trust_policies').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createZeroTrustPolicy(schoolId: string, data: EntZeroTrustPolicyCreate): Promise<EntZeroTrustPolicy> {
    const { data: result, error } = await this.supabase.from('ent_zero_trust_policies').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateZeroTrustPolicy(schoolId: string, id: string, data: EntZeroTrustPolicyUpdate): Promise<EntZeroTrustPolicy> {
    const { data: result, error } = await this.supabase.from('ent_zero_trust_policies').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntZeroTrustPolicyNotFoundError(id);
    return result;
  }

  async deleteZeroTrustPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_zero_trust_policies').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countZeroTrustPolicys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_zero_trust_policies').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findZeroTrustPolicyByStatus(schoolId: string, status: string): Promise<EntZeroTrustPolicy[]> {
    const { data, error } = await this.supabase.from('ent_zero_trust_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveZeroTrustPolicys(schoolId: string): Promise<EntZeroTrustPolicy[]> {
    const { data, error } = await this.supabase.from('ent_zero_trust_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findZeroTrustPolicyBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntZeroTrustPolicy[]> {
    const { data, error } = await this.supabase.from('ent_zero_trust_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findZeroTrustPolicyByDateRange(schoolId: string, start: string, end: string): Promise<EntZeroTrustPolicy[]> {
    const { data, error } = await this.supabase.from('ent_zero_trust_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- AccessPolicy -----------------------------------------------------
  async findAccessPolicyById(schoolId: string, id: string): Promise<EntAccessPolicy> {
    const { data, error } = await this.supabase.from('ent_access_policies').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntAccessPolicyNotFoundError(id);
    return data;
  }

  async findAllAccessPolicys(schoolId: string): Promise<EntAccessPolicy[]> {
    const { data, error } = await this.supabase.from('ent_access_policies').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createAccessPolicy(schoolId: string, data: EntAccessPolicyCreate): Promise<EntAccessPolicy> {
    const { data: result, error } = await this.supabase.from('ent_access_policies').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateAccessPolicy(schoolId: string, id: string, data: EntAccessPolicyUpdate): Promise<EntAccessPolicy> {
    const { data: result, error } = await this.supabase.from('ent_access_policies').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntAccessPolicyNotFoundError(id);
    return result;
  }

  async deleteAccessPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_access_policies').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAccessPolicys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_access_policies').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findAccessPolicyByStatus(schoolId: string, status: string): Promise<EntAccessPolicy[]> {
    const { data, error } = await this.supabase.from('ent_access_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAccessPolicys(schoolId: string): Promise<EntAccessPolicy[]> {
    const { data, error } = await this.supabase.from('ent_access_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAccessPolicyBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntAccessPolicy[]> {
    const { data, error } = await this.supabase.from('ent_access_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAccessPolicyByDateRange(schoolId: string, start: string, end: string): Promise<EntAccessPolicy[]> {
    const { data, error } = await this.supabase.from('ent_access_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Role -----------------------------------------------------
  async findRoleById(schoolId: string, id: string): Promise<EntRole> {
    const { data, error } = await this.supabase.from('ent_roles').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntRoleNotFoundError(id);
    return data;
  }

  async findAllRoles(schoolId: string): Promise<EntRole[]> {
    const { data, error } = await this.supabase.from('ent_roles').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createRole(schoolId: string, data: EntRoleCreate): Promise<EntRole> {
    const { data: result, error } = await this.supabase.from('ent_roles').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateRole(schoolId: string, id: string, data: EntRoleUpdate): Promise<EntRole> {
    const { data: result, error } = await this.supabase.from('ent_roles').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntRoleNotFoundError(id);
    return result;
  }

  async deleteRole(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_roles').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRoles(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_roles').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findRoleByStatus(schoolId: string, status: string): Promise<EntRole[]> {
    const { data, error } = await this.supabase.from('ent_roles').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRoles(schoolId: string): Promise<EntRole[]> {
    const { data, error } = await this.supabase.from('ent_roles').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRoleBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntRole[]> {
    const { data, error } = await this.supabase.from('ent_roles').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findRoleByDateRange(schoolId: string, start: string, end: string): Promise<EntRole[]> {
    const { data, error } = await this.supabase.from('ent_roles').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Permission -----------------------------------------------------
  async findPermissionById(schoolId: string, id: string): Promise<EntPermission> {
    const { data, error } = await this.supabase.from('ent_permissions').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPermissionNotFoundError(id);
    return data;
  }

  async findAllPermissions(schoolId: string): Promise<EntPermission[]> {
    const { data, error } = await this.supabase.from('ent_permissions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPermission(schoolId: string, data: EntPermissionCreate): Promise<EntPermission> {
    const { data: result, error } = await this.supabase.from('ent_permissions').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePermission(schoolId: string, id: string, data: EntPermissionUpdate): Promise<EntPermission> {
    const { data: result, error } = await this.supabase.from('ent_permissions').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPermissionNotFoundError(id);
    return result;
  }

  async deletePermission(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_permissions').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPermissions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_permissions').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPermissionByStatus(schoolId: string, status: string): Promise<EntPermission[]> {
    const { data, error } = await this.supabase.from('ent_permissions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePermissions(schoolId: string): Promise<EntPermission[]> {
    const { data, error } = await this.supabase.from('ent_permissions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPermissionBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPermission[]> {
    const { data, error } = await this.supabase.from('ent_permissions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPermissionByDateRange(schoolId: string, start: string, end: string): Promise<EntPermission[]> {
    const { data, error } = await this.supabase.from('ent_permissions').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- AbacPolicy -----------------------------------------------------
  async findAbacPolicyById(schoolId: string, id: string): Promise<EntAbacPolicy> {
    const { data, error } = await this.supabase.from('ent_abac_policies').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntAbacPolicyNotFoundError(id);
    return data;
  }

  async findAllAbacPolicys(schoolId: string): Promise<EntAbacPolicy[]> {
    const { data, error } = await this.supabase.from('ent_abac_policies').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createAbacPolicy(schoolId: string, data: EntAbacPolicyCreate): Promise<EntAbacPolicy> {
    const { data: result, error } = await this.supabase.from('ent_abac_policies').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateAbacPolicy(schoolId: string, id: string, data: EntAbacPolicyUpdate): Promise<EntAbacPolicy> {
    const { data: result, error } = await this.supabase.from('ent_abac_policies').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntAbacPolicyNotFoundError(id);
    return result;
  }

  async deleteAbacPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_abac_policies').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAbacPolicys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_abac_policies').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findAbacPolicyByStatus(schoolId: string, status: string): Promise<EntAbacPolicy[]> {
    const { data, error } = await this.supabase.from('ent_abac_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAbacPolicys(schoolId: string): Promise<EntAbacPolicy[]> {
    const { data, error } = await this.supabase.from('ent_abac_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAbacPolicyBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntAbacPolicy[]> {
    const { data, error } = await this.supabase.from('ent_abac_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAbacPolicyByDateRange(schoolId: string, start: string, end: string): Promise<EntAbacPolicy[]> {
    const { data, error } = await this.supabase.from('ent_abac_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PolicyEvaluation -----------------------------------------------------
  async findPolicyEvaluationById(schoolId: string, id: string): Promise<EntPolicyEvaluation> {
    const { data, error } = await this.supabase.from('ent_policy_evaluations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPolicyEvaluationNotFoundError(id);
    return data;
  }

  async findAllPolicyEvaluations(schoolId: string): Promise<EntPolicyEvaluation[]> {
    const { data, error } = await this.supabase.from('ent_policy_evaluations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPolicyEvaluation(schoolId: string, data: EntPolicyEvaluationCreate): Promise<EntPolicyEvaluation> {
    const { data: result, error } = await this.supabase.from('ent_policy_evaluations').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePolicyEvaluation(schoolId: string, id: string, data: EntPolicyEvaluationUpdate): Promise<EntPolicyEvaluation> {
    const { data: result, error } = await this.supabase.from('ent_policy_evaluations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPolicyEvaluationNotFoundError(id);
    return result;
  }

  async deletePolicyEvaluation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_policy_evaluations').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPolicyEvaluations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_policy_evaluations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPolicyEvaluationByStatus(schoolId: string, status: string): Promise<EntPolicyEvaluation[]> {
    const { data, error } = await this.supabase.from('ent_policy_evaluations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePolicyEvaluations(schoolId: string): Promise<EntPolicyEvaluation[]> {
    const { data, error } = await this.supabase.from('ent_policy_evaluations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPolicyEvaluationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPolicyEvaluation[]> {
    const { data, error } = await this.supabase.from('ent_policy_evaluations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPolicyEvaluationByDateRange(schoolId: string, start: string, end: string): Promise<EntPolicyEvaluation[]> {
    const { data, error } = await this.supabase.from('ent_policy_evaluations').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SecretRotation -----------------------------------------------------
  async findSecretRotationById(schoolId: string, id: string): Promise<EntSecretRotation> {
    const { data, error } = await this.supabase.from('ent_secret_rotations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSecretRotationNotFoundError(id);
    return data;
  }

  async findAllSecretRotations(schoolId: string): Promise<EntSecretRotation[]> {
    const { data, error } = await this.supabase.from('ent_secret_rotations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSecretRotation(schoolId: string, data: EntSecretRotationCreate): Promise<EntSecretRotation> {
    const { data: result, error } = await this.supabase.from('ent_secret_rotations').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSecretRotation(schoolId: string, id: string, data: EntSecretRotationUpdate): Promise<EntSecretRotation> {
    const { data: result, error } = await this.supabase.from('ent_secret_rotations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSecretRotationNotFoundError(id);
    return result;
  }

  async deleteSecretRotation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_secret_rotations').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSecretRotations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_secret_rotations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSecretRotationByStatus(schoolId: string, status: string): Promise<EntSecretRotation[]> {
    const { data, error } = await this.supabase.from('ent_secret_rotations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSecretRotations(schoolId: string): Promise<EntSecretRotation[]> {
    const { data, error } = await this.supabase.from('ent_secret_rotations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSecretRotationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSecretRotation[]> {
    const { data, error } = await this.supabase.from('ent_secret_rotations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSecretRotationByDateRange(schoolId: string, start: string, end: string): Promise<EntSecretRotation[]> {
    const { data, error } = await this.supabase.from('ent_secret_rotations').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SecurityCenter -----------------------------------------------------
  async findSecurityCenterById(schoolId: string, id: string): Promise<EntSecurityCenter> {
    const { data, error } = await this.supabase.from('ent_security_centers').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSecurityCenterNotFoundError(id);
    return data;
  }

  async findAllSecurityCenters(schoolId: string): Promise<EntSecurityCenter[]> {
    const { data, error } = await this.supabase.from('ent_security_centers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSecurityCenter(schoolId: string, data: EntSecurityCenterCreate): Promise<EntSecurityCenter> {
    const { data: result, error } = await this.supabase.from('ent_security_centers').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSecurityCenter(schoolId: string, id: string, data: EntSecurityCenterUpdate): Promise<EntSecurityCenter> {
    const { data: result, error } = await this.supabase.from('ent_security_centers').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSecurityCenterNotFoundError(id);
    return result;
  }

  async deleteSecurityCenter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_security_centers').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSecurityCenters(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_security_centers').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSecurityCenterByStatus(schoolId: string, status: string): Promise<EntSecurityCenter[]> {
    const { data, error } = await this.supabase.from('ent_security_centers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSecurityCenters(schoolId: string): Promise<EntSecurityCenter[]> {
    const { data, error } = await this.supabase.from('ent_security_centers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSecurityCenterBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSecurityCenter[]> {
    const { data, error } = await this.supabase.from('ent_security_centers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSecurityCenterByDateRange(schoolId: string, start: string, end: string): Promise<EntSecurityCenter[]> {
    const { data, error } = await this.supabase.from('ent_security_centers').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ThreatDetection -----------------------------------------------------
  async findThreatDetectionById(schoolId: string, id: string): Promise<EntThreatDetection> {
    const { data, error } = await this.supabase.from('ent_threat_detections').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntThreatDetectionNotFoundError(id);
    return data;
  }

  async findAllThreatDetections(schoolId: string): Promise<EntThreatDetection[]> {
    const { data, error } = await this.supabase.from('ent_threat_detections').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createThreatDetection(schoolId: string, data: EntThreatDetectionCreate): Promise<EntThreatDetection> {
    const { data: result, error } = await this.supabase.from('ent_threat_detections').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateThreatDetection(schoolId: string, id: string, data: EntThreatDetectionUpdate): Promise<EntThreatDetection> {
    const { data: result, error } = await this.supabase.from('ent_threat_detections').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntThreatDetectionNotFoundError(id);
    return result;
  }

  async deleteThreatDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_threat_detections').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countThreatDetections(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_threat_detections').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findThreatDetectionByStatus(schoolId: string, status: string): Promise<EntThreatDetection[]> {
    const { data, error } = await this.supabase.from('ent_threat_detections').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveThreatDetections(schoolId: string): Promise<EntThreatDetection[]> {
    const { data, error } = await this.supabase.from('ent_threat_detections').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findThreatDetectionBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntThreatDetection[]> {
    const { data, error } = await this.supabase.from('ent_threat_detections').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findThreatDetectionByDateRange(schoolId: string, start: string, end: string): Promise<EntThreatDetection[]> {
    const { data, error } = await this.supabase.from('ent_threat_detections').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SecurityAudit -----------------------------------------------------
  async findSecurityAuditById(schoolId: string, id: string): Promise<EntSecurityAudit> {
    const { data, error } = await this.supabase.from('ent_security_audits').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSecurityAuditNotFoundError(id);
    return data;
  }

  async findAllSecurityAudits(schoolId: string): Promise<EntSecurityAudit[]> {
    const { data, error } = await this.supabase.from('ent_security_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSecurityAudit(schoolId: string, data: EntSecurityAuditCreate): Promise<EntSecurityAudit> {
    const { data: result, error } = await this.supabase.from('ent_security_audits').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSecurityAudit(schoolId: string, id: string, data: EntSecurityAuditUpdate): Promise<EntSecurityAudit> {
    const { data: result, error } = await this.supabase.from('ent_security_audits').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSecurityAuditNotFoundError(id);
    return result;
  }

  async deleteSecurityAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_security_audits').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSecurityAudits(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_security_audits').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSecurityAuditByStatus(schoolId: string, status: string): Promise<EntSecurityAudit[]> {
    const { data, error } = await this.supabase.from('ent_security_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSecurityAudits(schoolId: string): Promise<EntSecurityAudit[]> {
    const { data, error } = await this.supabase.from('ent_security_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSecurityAuditBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSecurityAudit[]> {
    const { data, error } = await this.supabase.from('ent_security_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSecurityAuditByDateRange(schoolId: string, start: string, end: string): Promise<EntSecurityAudit[]> {
    const { data, error } = await this.supabase.from('ent_security_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- FirewallRule -----------------------------------------------------
  async findFirewallRuleById(schoolId: string, id: string): Promise<EntFirewallRule> {
    const { data, error } = await this.supabase.from('ent_firewall_rules').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntFirewallRuleNotFoundError(id);
    return data;
  }

  async findAllFirewallRules(schoolId: string): Promise<EntFirewallRule[]> {
    const { data, error } = await this.supabase.from('ent_firewall_rules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createFirewallRule(schoolId: string, data: EntFirewallRuleCreate): Promise<EntFirewallRule> {
    const { data: result, error } = await this.supabase.from('ent_firewall_rules').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateFirewallRule(schoolId: string, id: string, data: EntFirewallRuleUpdate): Promise<EntFirewallRule> {
    const { data: result, error } = await this.supabase.from('ent_firewall_rules').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntFirewallRuleNotFoundError(id);
    return result;
  }

  async deleteFirewallRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_firewall_rules').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countFirewallRules(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_firewall_rules').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findFirewallRuleByStatus(schoolId: string, status: string): Promise<EntFirewallRule[]> {
    const { data, error } = await this.supabase.from('ent_firewall_rules').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveFirewallRules(schoolId: string): Promise<EntFirewallRule[]> {
    const { data, error } = await this.supabase.from('ent_firewall_rules').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findFirewallRuleBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntFirewallRule[]> {
    const { data, error } = await this.supabase.from('ent_firewall_rules').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findFirewallRuleByDateRange(schoolId: string, start: string, end: string): Promise<EntFirewallRule[]> {
    const { data, error } = await this.supabase.from('ent_firewall_rules').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- IpWhitelist -----------------------------------------------------
  async findIpWhitelistById(schoolId: string, id: string): Promise<EntIpWhitelist> {
    const { data, error } = await this.supabase.from('ent_ip_whitelists').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntIpWhitelistNotFoundError(id);
    return data;
  }

  async findAllIpWhitelists(schoolId: string): Promise<EntIpWhitelist[]> {
    const { data, error } = await this.supabase.from('ent_ip_whitelists').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createIpWhitelist(schoolId: string, data: EntIpWhitelistCreate): Promise<EntIpWhitelist> {
    const { data: result, error } = await this.supabase.from('ent_ip_whitelists').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateIpWhitelist(schoolId: string, id: string, data: EntIpWhitelistUpdate): Promise<EntIpWhitelist> {
    const { data: result, error } = await this.supabase.from('ent_ip_whitelists').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntIpWhitelistNotFoundError(id);
    return result;
  }

  async deleteIpWhitelist(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_ip_whitelists').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countIpWhitelists(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_ip_whitelists').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findIpWhitelistByStatus(schoolId: string, status: string): Promise<EntIpWhitelist[]> {
    const { data, error } = await this.supabase.from('ent_ip_whitelists').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveIpWhitelists(schoolId: string): Promise<EntIpWhitelist[]> {
    const { data, error } = await this.supabase.from('ent_ip_whitelists').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findIpWhitelistBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntIpWhitelist[]> {
    const { data, error } = await this.supabase.from('ent_ip_whitelists').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findIpWhitelistByDateRange(schoolId: string, start: string, end: string): Promise<EntIpWhitelist[]> {
    const { data, error } = await this.supabase.from('ent_ip_whitelists').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- EncryptionKey -----------------------------------------------------
  async findEncryptionKeyById(schoolId: string, id: string): Promise<EntEncryptionKey> {
    const { data, error } = await this.supabase.from('ent_encryption_keys').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntEncryptionKeyNotFoundError(id);
    return data;
  }

  async findAllEncryptionKeys(schoolId: string): Promise<EntEncryptionKey[]> {
    const { data, error } = await this.supabase.from('ent_encryption_keys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createEncryptionKey(schoolId: string, data: EntEncryptionKeyCreate): Promise<EntEncryptionKey> {
    const { data: result, error } = await this.supabase.from('ent_encryption_keys').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateEncryptionKey(schoolId: string, id: string, data: EntEncryptionKeyUpdate): Promise<EntEncryptionKey> {
    const { data: result, error } = await this.supabase.from('ent_encryption_keys').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntEncryptionKeyNotFoundError(id);
    return result;
  }

  async deleteEncryptionKey(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_encryption_keys').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEncryptionKeys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_encryption_keys').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findEncryptionKeyByStatus(schoolId: string, status: string): Promise<EntEncryptionKey[]> {
    const { data, error } = await this.supabase.from('ent_encryption_keys').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveEncryptionKeys(schoolId: string): Promise<EntEncryptionKey[]> {
    const { data, error } = await this.supabase.from('ent_encryption_keys').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findEncryptionKeyBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntEncryptionKey[]> {
    const { data, error } = await this.supabase.from('ent_encryption_keys').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findEncryptionKeyByDateRange(schoolId: string, start: string, end: string): Promise<EntEncryptionKey[]> {
    const { data, error } = await this.supabase.from('ent_encryption_keys').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SecurityIncident -----------------------------------------------------
  async findSecurityIncidentById(schoolId: string, id: string): Promise<EntSecurityIncident> {
    const { data, error } = await this.supabase.from('ent_security_incidents').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSecurityIncidentNotFoundError(id);
    return data;
  }

  async findAllSecurityIncidents(schoolId: string): Promise<EntSecurityIncident[]> {
    const { data, error } = await this.supabase.from('ent_security_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSecurityIncident(schoolId: string, data: EntSecurityIncidentCreate): Promise<EntSecurityIncident> {
    const { data: result, error } = await this.supabase.from('ent_security_incidents').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSecurityIncident(schoolId: string, id: string, data: EntSecurityIncidentUpdate): Promise<EntSecurityIncident> {
    const { data: result, error } = await this.supabase.from('ent_security_incidents').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSecurityIncidentNotFoundError(id);
    return result;
  }

  async deleteSecurityIncident(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_security_incidents').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSecurityIncidents(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_security_incidents').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSecurityIncidentByStatus(schoolId: string, status: string): Promise<EntSecurityIncident[]> {
    const { data, error } = await this.supabase.from('ent_security_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSecurityIncidents(schoolId: string): Promise<EntSecurityIncident[]> {
    const { data, error } = await this.supabase.from('ent_security_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSecurityIncidentBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSecurityIncident[]> {
    const { data, error } = await this.supabase.from('ent_security_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSecurityIncidentByDateRange(schoolId: string, start: string, end: string): Promise<EntSecurityIncident[]> {
    const { data, error } = await this.supabase.from('ent_security_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- VulnerabilityScan -----------------------------------------------------
  async findVulnerabilityScanById(schoolId: string, id: string): Promise<EntVulnerabilityScan> {
    const { data, error } = await this.supabase.from('ent_vulnerability_scans').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntVulnerabilityScanNotFoundError(id);
    return data;
  }

  async findAllVulnerabilityScans(schoolId: string): Promise<EntVulnerabilityScan[]> {
    const { data, error } = await this.supabase.from('ent_vulnerability_scans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createVulnerabilityScan(schoolId: string, data: EntVulnerabilityScanCreate): Promise<EntVulnerabilityScan> {
    const { data: result, error } = await this.supabase.from('ent_vulnerability_scans').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateVulnerabilityScan(schoolId: string, id: string, data: EntVulnerabilityScanUpdate): Promise<EntVulnerabilityScan> {
    const { data: result, error } = await this.supabase.from('ent_vulnerability_scans').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntVulnerabilityScanNotFoundError(id);
    return result;
  }

  async deleteVulnerabilityScan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_vulnerability_scans').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countVulnerabilityScans(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_vulnerability_scans').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findVulnerabilityScanByStatus(schoolId: string, status: string): Promise<EntVulnerabilityScan[]> {
    const { data, error } = await this.supabase.from('ent_vulnerability_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveVulnerabilityScans(schoolId: string): Promise<EntVulnerabilityScan[]> {
    const { data, error } = await this.supabase.from('ent_vulnerability_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findVulnerabilityScanBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntVulnerabilityScan[]> {
    const { data, error } = await this.supabase.from('ent_vulnerability_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findVulnerabilityScanByDateRange(schoolId: string, start: string, end: string): Promise<EntVulnerabilityScan[]> {
    const { data, error } = await this.supabase.from('ent_vulnerability_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- AccessLog -----------------------------------------------------
  async findAccessLogById(schoolId: string, id: string): Promise<EntAccessLog> {
    const { data, error } = await this.supabase.from('ent_access_logs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntAccessLogNotFoundError(id);
    return data;
  }

  async findAllAccessLogs(schoolId: string): Promise<EntAccessLog[]> {
    const { data, error } = await this.supabase.from('ent_access_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createAccessLog(schoolId: string, data: EntAccessLogCreate): Promise<EntAccessLog> {
    const { data: result, error } = await this.supabase.from('ent_access_logs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateAccessLog(schoolId: string, id: string, data: EntAccessLogUpdate): Promise<EntAccessLog> {
    const { data: result, error } = await this.supabase.from('ent_access_logs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntAccessLogNotFoundError(id);
    return result;
  }

  async deleteAccessLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_access_logs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAccessLogs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_access_logs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findAccessLogByStatus(schoolId: string, status: string): Promise<EntAccessLog[]> {
    const { data, error } = await this.supabase.from('ent_access_logs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAccessLogs(schoolId: string): Promise<EntAccessLog[]> {
    const { data, error } = await this.supabase.from('ent_access_logs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAccessLogBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntAccessLog[]> {
    const { data, error } = await this.supabase.from('ent_access_logs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAccessLogByDateRange(schoolId: string, start: string, end: string): Promise<EntAccessLog[]> {
    const { data, error } = await this.supabase.from('ent_access_logs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- FailoverConfig -----------------------------------------------------
  async findFailoverConfigById(schoolId: string, id: string): Promise<EntFailoverConfig> {
    const { data, error } = await this.supabase.from('ent_failover_configs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntFailoverConfigNotFoundError(id);
    return data;
  }

  async findAllFailoverConfigs(schoolId: string): Promise<EntFailoverConfig[]> {
    const { data, error } = await this.supabase.from('ent_failover_configs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createFailoverConfig(schoolId: string, data: EntFailoverConfigCreate): Promise<EntFailoverConfig> {
    const { data: result, error } = await this.supabase.from('ent_failover_configs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateFailoverConfig(schoolId: string, id: string, data: EntFailoverConfigUpdate): Promise<EntFailoverConfig> {
    const { data: result, error } = await this.supabase.from('ent_failover_configs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntFailoverConfigNotFoundError(id);
    return result;
  }

  async deleteFailoverConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_failover_configs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countFailoverConfigs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_failover_configs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findFailoverConfigByStatus(schoolId: string, status: string): Promise<EntFailoverConfig[]> {
    const { data, error } = await this.supabase.from('ent_failover_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveFailoverConfigs(schoolId: string): Promise<EntFailoverConfig[]> {
    const { data, error } = await this.supabase.from('ent_failover_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findFailoverConfigBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntFailoverConfig[]> {
    const { data, error } = await this.supabase.from('ent_failover_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findFailoverConfigByDateRange(schoolId: string, start: string, end: string): Promise<EntFailoverConfig[]> {
    const { data, error } = await this.supabase.from('ent_failover_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- FailoverEvent -----------------------------------------------------
  async findFailoverEventById(schoolId: string, id: string): Promise<EntFailoverEvent> {
    const { data, error } = await this.supabase.from('ent_failover_events').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntFailoverEventNotFoundError(id);
    return data;
  }

  async findAllFailoverEvents(schoolId: string): Promise<EntFailoverEvent[]> {
    const { data, error } = await this.supabase.from('ent_failover_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createFailoverEvent(schoolId: string, data: EntFailoverEventCreate): Promise<EntFailoverEvent> {
    const { data: result, error } = await this.supabase.from('ent_failover_events').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateFailoverEvent(schoolId: string, id: string, data: EntFailoverEventUpdate): Promise<EntFailoverEvent> {
    const { data: result, error } = await this.supabase.from('ent_failover_events').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntFailoverEventNotFoundError(id);
    return result;
  }

  async deleteFailoverEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_failover_events').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countFailoverEvents(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_failover_events').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findFailoverEventByStatus(schoolId: string, status: string): Promise<EntFailoverEvent[]> {
    const { data, error } = await this.supabase.from('ent_failover_events').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveFailoverEvents(schoolId: string): Promise<EntFailoverEvent[]> {
    const { data, error } = await this.supabase.from('ent_failover_events').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findFailoverEventBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntFailoverEvent[]> {
    const { data, error } = await this.supabase.from('ent_failover_events').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findFailoverEventByDateRange(schoolId: string, start: string, end: string): Promise<EntFailoverEvent[]> {
    const { data, error } = await this.supabase.from('ent_failover_events').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Replication -----------------------------------------------------
  async findReplicationById(schoolId: string, id: string): Promise<EntReplication> {
    const { data, error } = await this.supabase.from('ent_replications').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntReplicationNotFoundError(id);
    return data;
  }

  async findAllReplications(schoolId: string): Promise<EntReplication[]> {
    const { data, error } = await this.supabase.from('ent_replications').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createReplication(schoolId: string, data: EntReplicationCreate): Promise<EntReplication> {
    const { data: result, error } = await this.supabase.from('ent_replications').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateReplication(schoolId: string, id: string, data: EntReplicationUpdate): Promise<EntReplication> {
    const { data: result, error } = await this.supabase.from('ent_replications').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntReplicationNotFoundError(id);
    return result;
  }

  async deleteReplication(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_replications').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countReplications(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_replications').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findReplicationByStatus(schoolId: string, status: string): Promise<EntReplication[]> {
    const { data, error } = await this.supabase.from('ent_replications').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveReplications(schoolId: string): Promise<EntReplication[]> {
    const { data, error } = await this.supabase.from('ent_replications').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findReplicationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntReplication[]> {
    const { data, error } = await this.supabase.from('ent_replications').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findReplicationByDateRange(schoolId: string, start: string, end: string): Promise<EntReplication[]> {
    const { data, error } = await this.supabase.from('ent_replications').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- GeoReplication -----------------------------------------------------
  async findGeoReplicationById(schoolId: string, id: string): Promise<EntGeoReplication> {
    const { data, error } = await this.supabase.from('ent_geo_replications').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntGeoReplicationNotFoundError(id);
    return data;
  }

  async findAllGeoReplications(schoolId: string): Promise<EntGeoReplication[]> {
    const { data, error } = await this.supabase.from('ent_geo_replications').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createGeoReplication(schoolId: string, data: EntGeoReplicationCreate): Promise<EntGeoReplication> {
    const { data: result, error } = await this.supabase.from('ent_geo_replications').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateGeoReplication(schoolId: string, id: string, data: EntGeoReplicationUpdate): Promise<EntGeoReplication> {
    const { data: result, error } = await this.supabase.from('ent_geo_replications').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntGeoReplicationNotFoundError(id);
    return result;
  }

  async deleteGeoReplication(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_geo_replications').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countGeoReplications(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_geo_replications').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findGeoReplicationByStatus(schoolId: string, status: string): Promise<EntGeoReplication[]> {
    const { data, error } = await this.supabase.from('ent_geo_replications').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveGeoReplications(schoolId: string): Promise<EntGeoReplication[]> {
    const { data, error } = await this.supabase.from('ent_geo_replications').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findGeoReplicationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntGeoReplication[]> {
    const { data, error } = await this.supabase.from('ent_geo_replications').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findGeoReplicationByDateRange(schoolId: string, start: string, end: string): Promise<EntGeoReplication[]> {
    const { data, error } = await this.supabase.from('ent_geo_replications').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- HealthCheck -----------------------------------------------------
  async findHealthCheckById(schoolId: string, id: string): Promise<EntHealthCheck> {
    const { data, error } = await this.supabase.from('ent_health_checks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntHealthCheckNotFoundError(id);
    return data;
  }

  async findAllHealthChecks(schoolId: string): Promise<EntHealthCheck[]> {
    const { data, error } = await this.supabase.from('ent_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createHealthCheck(schoolId: string, data: EntHealthCheckCreate): Promise<EntHealthCheck> {
    const { data: result, error } = await this.supabase.from('ent_health_checks').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateHealthCheck(schoolId: string, id: string, data: EntHealthCheckUpdate): Promise<EntHealthCheck> {
    const { data: result, error } = await this.supabase.from('ent_health_checks').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntHealthCheckNotFoundError(id);
    return result;
  }

  async deleteHealthCheck(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_health_checks').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countHealthChecks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_health_checks').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findHealthCheckByStatus(schoolId: string, status: string): Promise<EntHealthCheck[]> {
    const { data, error } = await this.supabase.from('ent_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveHealthChecks(schoolId: string): Promise<EntHealthCheck[]> {
    const { data, error } = await this.supabase.from('ent_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findHealthCheckBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntHealthCheck[]> {
    const { data, error } = await this.supabase.from('ent_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findHealthCheckByDateRange(schoolId: string, start: string, end: string): Promise<EntHealthCheck[]> {
    const { data, error } = await this.supabase.from('ent_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- HealthStatus -----------------------------------------------------
  async findHealthStatusById(schoolId: string, id: string): Promise<EntHealthStatus> {
    const { data, error } = await this.supabase.from('ent_health_statuses').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntHealthStatusNotFoundError(id);
    return data;
  }

  async findAllHealthStatuss(schoolId: string): Promise<EntHealthStatus[]> {
    const { data, error } = await this.supabase.from('ent_health_statuses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createHealthStatus(schoolId: string, data: EntHealthStatusCreate): Promise<EntHealthStatus> {
    const { data: result, error } = await this.supabase.from('ent_health_statuses').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateHealthStatus(schoolId: string, id: string, data: EntHealthStatusUpdate): Promise<EntHealthStatus> {
    const { data: result, error } = await this.supabase.from('ent_health_statuses').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntHealthStatusNotFoundError(id);
    return result;
  }

  async deleteHealthStatus(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_health_statuses').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countHealthStatuss(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_health_statuses').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findHealthStatusByStatus(schoolId: string, status: string): Promise<EntHealthStatus[]> {
    const { data, error } = await this.supabase.from('ent_health_statuses').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveHealthStatuss(schoolId: string): Promise<EntHealthStatus[]> {
    const { data, error } = await this.supabase.from('ent_health_statuses').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findHealthStatusBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntHealthStatus[]> {
    const { data, error } = await this.supabase.from('ent_health_statuses').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findHealthStatusByDateRange(schoolId: string, start: string, end: string): Promise<EntHealthStatus[]> {
    const { data, error } = await this.supabase.from('ent_health_statuses').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- AutoRecovery -----------------------------------------------------
  async findAutoRecoveryById(schoolId: string, id: string): Promise<EntAutoRecovery> {
    const { data, error } = await this.supabase.from('ent_auto_recoveries').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntAutoRecoveryNotFoundError(id);
    return data;
  }

  async findAllAutoRecoverys(schoolId: string): Promise<EntAutoRecovery[]> {
    const { data, error } = await this.supabase.from('ent_auto_recoveries').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createAutoRecovery(schoolId: string, data: EntAutoRecoveryCreate): Promise<EntAutoRecovery> {
    const { data: result, error } = await this.supabase.from('ent_auto_recoveries').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateAutoRecovery(schoolId: string, id: string, data: EntAutoRecoveryUpdate): Promise<EntAutoRecovery> {
    const { data: result, error } = await this.supabase.from('ent_auto_recoveries').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntAutoRecoveryNotFoundError(id);
    return result;
  }

  async deleteAutoRecovery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_auto_recoveries').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countAutoRecoverys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_auto_recoveries').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findAutoRecoveryByStatus(schoolId: string, status: string): Promise<EntAutoRecovery[]> {
    const { data, error } = await this.supabase.from('ent_auto_recoveries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAutoRecoverys(schoolId: string): Promise<EntAutoRecovery[]> {
    const { data, error } = await this.supabase.from('ent_auto_recoveries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAutoRecoveryBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntAutoRecovery[]> {
    const { data, error } = await this.supabase.from('ent_auto_recoveries').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAutoRecoveryByDateRange(schoolId: string, start: string, end: string): Promise<EntAutoRecovery[]> {
    const { data, error } = await this.supabase.from('ent_auto_recoveries').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- RecoveryAttempt -----------------------------------------------------
  async findRecoveryAttemptById(schoolId: string, id: string): Promise<EntRecoveryAttempt> {
    const { data, error } = await this.supabase.from('ent_recovery_attempts').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntRecoveryAttemptNotFoundError(id);
    return data;
  }

  async findAllRecoveryAttempts(schoolId: string): Promise<EntRecoveryAttempt[]> {
    const { data, error } = await this.supabase.from('ent_recovery_attempts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createRecoveryAttempt(schoolId: string, data: EntRecoveryAttemptCreate): Promise<EntRecoveryAttempt> {
    const { data: result, error } = await this.supabase.from('ent_recovery_attempts').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateRecoveryAttempt(schoolId: string, id: string, data: EntRecoveryAttemptUpdate): Promise<EntRecoveryAttempt> {
    const { data: result, error } = await this.supabase.from('ent_recovery_attempts').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntRecoveryAttemptNotFoundError(id);
    return result;
  }

  async deleteRecoveryAttempt(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_recovery_attempts').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRecoveryAttempts(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_recovery_attempts').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findRecoveryAttemptByStatus(schoolId: string, status: string): Promise<EntRecoveryAttempt[]> {
    const { data, error } = await this.supabase.from('ent_recovery_attempts').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRecoveryAttempts(schoolId: string): Promise<EntRecoveryAttempt[]> {
    const { data, error } = await this.supabase.from('ent_recovery_attempts').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRecoveryAttemptBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntRecoveryAttempt[]> {
    const { data, error } = await this.supabase.from('ent_recovery_attempts').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findRecoveryAttemptByDateRange(schoolId: string, start: string, end: string): Promise<EntRecoveryAttempt[]> {
    const { data, error } = await this.supabase.from('ent_recovery_attempts').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- BackupSchedule -----------------------------------------------------
  async findBackupScheduleById(schoolId: string, id: string): Promise<EntBackupSchedule> {
    const { data, error } = await this.supabase.from('ent_backup_schedules').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntBackupScheduleNotFoundError(id);
    return data;
  }

  async findAllBackupSchedules(schoolId: string): Promise<EntBackupSchedule[]> {
    const { data, error } = await this.supabase.from('ent_backup_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createBackupSchedule(schoolId: string, data: EntBackupScheduleCreate): Promise<EntBackupSchedule> {
    const { data: result, error } = await this.supabase.from('ent_backup_schedules').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateBackupSchedule(schoolId: string, id: string, data: EntBackupScheduleUpdate): Promise<EntBackupSchedule> {
    const { data: result, error } = await this.supabase.from('ent_backup_schedules').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntBackupScheduleNotFoundError(id);
    return result;
  }

  async deleteBackupSchedule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_backup_schedules').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countBackupSchedules(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_backup_schedules').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findBackupScheduleByStatus(schoolId: string, status: string): Promise<EntBackupSchedule[]> {
    const { data, error } = await this.supabase.from('ent_backup_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveBackupSchedules(schoolId: string): Promise<EntBackupSchedule[]> {
    const { data, error } = await this.supabase.from('ent_backup_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findBackupScheduleBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntBackupSchedule[]> {
    const { data, error } = await this.supabase.from('ent_backup_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findBackupScheduleByDateRange(schoolId: string, start: string, end: string): Promise<EntBackupSchedule[]> {
    const { data, error } = await this.supabase.from('ent_backup_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- BackupJob -----------------------------------------------------
  async findBackupJobById(schoolId: string, id: string): Promise<EntBackupJob> {
    const { data, error } = await this.supabase.from('ent_backup_jobs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntBackupJobNotFoundError(id);
    return data;
  }

  async findAllBackupJobs(schoolId: string): Promise<EntBackupJob[]> {
    const { data, error } = await this.supabase.from('ent_backup_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createBackupJob(schoolId: string, data: EntBackupJobCreate): Promise<EntBackupJob> {
    const { data: result, error } = await this.supabase.from('ent_backup_jobs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateBackupJob(schoolId: string, id: string, data: EntBackupJobUpdate): Promise<EntBackupJob> {
    const { data: result, error } = await this.supabase.from('ent_backup_jobs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntBackupJobNotFoundError(id);
    return result;
  }

  async deleteBackupJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_backup_jobs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countBackupJobs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_backup_jobs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findBackupJobByStatus(schoolId: string, status: string): Promise<EntBackupJob[]> {
    const { data, error } = await this.supabase.from('ent_backup_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveBackupJobs(schoolId: string): Promise<EntBackupJob[]> {
    const { data, error } = await this.supabase.from('ent_backup_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findBackupJobBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntBackupJob[]> {
    const { data, error } = await this.supabase.from('ent_backup_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findBackupJobByDateRange(schoolId: string, start: string, end: string): Promise<EntBackupJob[]> {
    const { data, error } = await this.supabase.from('ent_backup_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DisasterRecoveryPlan -----------------------------------------------------
  async findDisasterRecoveryPlanById(schoolId: string, id: string): Promise<EntDisasterRecoveryPlan> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_plans').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDisasterRecoveryPlanNotFoundError(id);
    return data;
  }

  async findAllDisasterRecoveryPlans(schoolId: string): Promise<EntDisasterRecoveryPlan[]> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDisasterRecoveryPlan(schoolId: string, data: EntDisasterRecoveryPlanCreate): Promise<EntDisasterRecoveryPlan> {
    const { data: result, error } = await this.supabase.from('ent_disaster_recovery_plans').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDisasterRecoveryPlan(schoolId: string, id: string, data: EntDisasterRecoveryPlanUpdate): Promise<EntDisasterRecoveryPlan> {
    const { data: result, error } = await this.supabase.from('ent_disaster_recovery_plans').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDisasterRecoveryPlanNotFoundError(id);
    return result;
  }

  async deleteDisasterRecoveryPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_disaster_recovery_plans').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDisasterRecoveryPlans(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_disaster_recovery_plans').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDisasterRecoveryPlanByStatus(schoolId: string, status: string): Promise<EntDisasterRecoveryPlan[]> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_plans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDisasterRecoveryPlans(schoolId: string): Promise<EntDisasterRecoveryPlan[]> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_plans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDisasterRecoveryPlanBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDisasterRecoveryPlan[]> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_plans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDisasterRecoveryPlanByDateRange(schoolId: string, start: string, end: string): Promise<EntDisasterRecoveryPlan[]> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_plans').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DisasterRecoveryTest -----------------------------------------------------
  async findDisasterRecoveryTestById(schoolId: string, id: string): Promise<EntDisasterRecoveryTest> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_tests').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDisasterRecoveryTestNotFoundError(id);
    return data;
  }

  async findAllDisasterRecoveryTests(schoolId: string): Promise<EntDisasterRecoveryTest[]> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_tests').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDisasterRecoveryTest(schoolId: string, data: EntDisasterRecoveryTestCreate): Promise<EntDisasterRecoveryTest> {
    const { data: result, error } = await this.supabase.from('ent_disaster_recovery_tests').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDisasterRecoveryTest(schoolId: string, id: string, data: EntDisasterRecoveryTestUpdate): Promise<EntDisasterRecoveryTest> {
    const { data: result, error } = await this.supabase.from('ent_disaster_recovery_tests').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDisasterRecoveryTestNotFoundError(id);
    return result;
  }

  async deleteDisasterRecoveryTest(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_disaster_recovery_tests').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDisasterRecoveryTests(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_disaster_recovery_tests').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDisasterRecoveryTestByStatus(schoolId: string, status: string): Promise<EntDisasterRecoveryTest[]> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDisasterRecoveryTests(schoolId: string): Promise<EntDisasterRecoveryTest[]> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDisasterRecoveryTestBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDisasterRecoveryTest[]> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDisasterRecoveryTestByDateRange(schoolId: string, start: string, end: string): Promise<EntDisasterRecoveryTest[]> {
    const { data, error } = await this.supabase.from('ent_disaster_recovery_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- RegionConfig -----------------------------------------------------
  async findRegionConfigById(schoolId: string, id: string): Promise<EntRegionConfig> {
    const { data, error } = await this.supabase.from('ent_region_configs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntRegionConfigNotFoundError(id);
    return data;
  }

  async findAllRegionConfigs(schoolId: string): Promise<EntRegionConfig[]> {
    const { data, error } = await this.supabase.from('ent_region_configs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createRegionConfig(schoolId: string, data: EntRegionConfigCreate): Promise<EntRegionConfig> {
    const { data: result, error } = await this.supabase.from('ent_region_configs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateRegionConfig(schoolId: string, id: string, data: EntRegionConfigUpdate): Promise<EntRegionConfig> {
    const { data: result, error } = await this.supabase.from('ent_region_configs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntRegionConfigNotFoundError(id);
    return result;
  }

  async deleteRegionConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_region_configs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRegionConfigs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_region_configs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findRegionConfigByStatus(schoolId: string, status: string): Promise<EntRegionConfig[]> {
    const { data, error } = await this.supabase.from('ent_region_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRegionConfigs(schoolId: string): Promise<EntRegionConfig[]> {
    const { data, error } = await this.supabase.from('ent_region_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRegionConfigBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntRegionConfig[]> {
    const { data, error } = await this.supabase.from('ent_region_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findRegionConfigByDateRange(schoolId: string, start: string, end: string): Promise<EntRegionConfig[]> {
    const { data, error } = await this.supabase.from('ent_region_configs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- LoadBalancer -----------------------------------------------------
  async findLoadBalancerById(schoolId: string, id: string): Promise<EntLoadBalancer> {
    const { data, error } = await this.supabase.from('ent_load_balancers').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntLoadBalancerNotFoundError(id);
    return data;
  }

  async findAllLoadBalancers(schoolId: string): Promise<EntLoadBalancer[]> {
    const { data, error } = await this.supabase.from('ent_load_balancers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createLoadBalancer(schoolId: string, data: EntLoadBalancerCreate): Promise<EntLoadBalancer> {
    const { data: result, error } = await this.supabase.from('ent_load_balancers').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateLoadBalancer(schoolId: string, id: string, data: EntLoadBalancerUpdate): Promise<EntLoadBalancer> {
    const { data: result, error } = await this.supabase.from('ent_load_balancers').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntLoadBalancerNotFoundError(id);
    return result;
  }

  async deleteLoadBalancer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_load_balancers').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countLoadBalancers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_load_balancers').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findLoadBalancerByStatus(schoolId: string, status: string): Promise<EntLoadBalancer[]> {
    const { data, error } = await this.supabase.from('ent_load_balancers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveLoadBalancers(schoolId: string): Promise<EntLoadBalancer[]> {
    const { data, error } = await this.supabase.from('ent_load_balancers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findLoadBalancerBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntLoadBalancer[]> {
    const { data, error } = await this.supabase.from('ent_load_balancers').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findLoadBalancerByDateRange(schoolId: string, start: string, end: string): Promise<EntLoadBalancer[]> {
    const { data, error } = await this.supabase.from('ent_load_balancers').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataLake -----------------------------------------------------
  async findDataLakeById(schoolId: string, id: string): Promise<EntDataLake> {
    const { data, error } = await this.supabase.from('ent_data_lakes').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataLakeNotFoundError(id);
    return data;
  }

  async findAllDataLakes(schoolId: string): Promise<EntDataLake[]> {
    const { data, error } = await this.supabase.from('ent_data_lakes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataLake(schoolId: string, data: EntDataLakeCreate): Promise<EntDataLake> {
    const { data: result, error } = await this.supabase.from('ent_data_lakes').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataLake(schoolId: string, id: string, data: EntDataLakeUpdate): Promise<EntDataLake> {
    const { data: result, error } = await this.supabase.from('ent_data_lakes').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataLakeNotFoundError(id);
    return result;
  }

  async deleteDataLake(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_lakes').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataLakes(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_lakes').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataLakeByStatus(schoolId: string, status: string): Promise<EntDataLake[]> {
    const { data, error } = await this.supabase.from('ent_data_lakes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataLakes(schoolId: string): Promise<EntDataLake[]> {
    const { data, error } = await this.supabase.from('ent_data_lakes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataLakeBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataLake[]> {
    const { data, error } = await this.supabase.from('ent_data_lakes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataLakeByDateRange(schoolId: string, start: string, end: string): Promise<EntDataLake[]> {
    const { data, error } = await this.supabase.from('ent_data_lakes').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataLakeDataset -----------------------------------------------------
  async findDataLakeDatasetById(schoolId: string, id: string): Promise<EntDataLakeDataset> {
    const { data, error } = await this.supabase.from('ent_data_lake_datasets').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataLakeDatasetNotFoundError(id);
    return data;
  }

  async findAllDataLakeDatasets(schoolId: string): Promise<EntDataLakeDataset[]> {
    const { data, error } = await this.supabase.from('ent_data_lake_datasets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataLakeDataset(schoolId: string, data: EntDataLakeDatasetCreate): Promise<EntDataLakeDataset> {
    const { data: result, error } = await this.supabase.from('ent_data_lake_datasets').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataLakeDataset(schoolId: string, id: string, data: EntDataLakeDatasetUpdate): Promise<EntDataLakeDataset> {
    const { data: result, error } = await this.supabase.from('ent_data_lake_datasets').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataLakeDatasetNotFoundError(id);
    return result;
  }

  async deleteDataLakeDataset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_lake_datasets').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataLakeDatasets(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_lake_datasets').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataLakeDatasetByStatus(schoolId: string, status: string): Promise<EntDataLakeDataset[]> {
    const { data, error } = await this.supabase.from('ent_data_lake_datasets').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataLakeDatasets(schoolId: string): Promise<EntDataLakeDataset[]> {
    const { data, error } = await this.supabase.from('ent_data_lake_datasets').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataLakeDatasetBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataLakeDataset[]> {
    const { data, error } = await this.supabase.from('ent_data_lake_datasets').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataLakeDatasetByDateRange(schoolId: string, start: string, end: string): Promise<EntDataLakeDataset[]> {
    const { data, error } = await this.supabase.from('ent_data_lake_datasets').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataArchive -----------------------------------------------------
  async findDataArchiveById(schoolId: string, id: string): Promise<EntDataArchive> {
    const { data, error } = await this.supabase.from('ent_data_archives').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataArchiveNotFoundError(id);
    return data;
  }

  async findAllDataArchives(schoolId: string): Promise<EntDataArchive[]> {
    const { data, error } = await this.supabase.from('ent_data_archives').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataArchive(schoolId: string, data: EntDataArchiveCreate): Promise<EntDataArchive> {
    const { data: result, error } = await this.supabase.from('ent_data_archives').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataArchive(schoolId: string, id: string, data: EntDataArchiveUpdate): Promise<EntDataArchive> {
    const { data: result, error } = await this.supabase.from('ent_data_archives').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataArchiveNotFoundError(id);
    return result;
  }

  async deleteDataArchive(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_archives').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataArchives(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_archives').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataArchiveByStatus(schoolId: string, status: string): Promise<EntDataArchive[]> {
    const { data, error } = await this.supabase.from('ent_data_archives').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataArchives(schoolId: string): Promise<EntDataArchive[]> {
    const { data, error } = await this.supabase.from('ent_data_archives').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataArchiveBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataArchive[]> {
    const { data, error } = await this.supabase.from('ent_data_archives').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataArchiveByDateRange(schoolId: string, start: string, end: string): Promise<EntDataArchive[]> {
    const { data, error } = await this.supabase.from('ent_data_archives').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataSnapshot -----------------------------------------------------
  async findDataSnapshotById(schoolId: string, id: string): Promise<EntDataSnapshot> {
    const { data, error } = await this.supabase.from('ent_data_snapshots').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataSnapshotNotFoundError(id);
    return data;
  }

  async findAllDataSnapshots(schoolId: string): Promise<EntDataSnapshot[]> {
    const { data, error } = await this.supabase.from('ent_data_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataSnapshot(schoolId: string, data: EntDataSnapshotCreate): Promise<EntDataSnapshot> {
    const { data: result, error } = await this.supabase.from('ent_data_snapshots').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataSnapshot(schoolId: string, id: string, data: EntDataSnapshotUpdate): Promise<EntDataSnapshot> {
    const { data: result, error } = await this.supabase.from('ent_data_snapshots').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataSnapshotNotFoundError(id);
    return result;
  }

  async deleteDataSnapshot(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_snapshots').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataSnapshots(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_snapshots').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataSnapshotByStatus(schoolId: string, status: string): Promise<EntDataSnapshot[]> {
    const { data, error } = await this.supabase.from('ent_data_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataSnapshots(schoolId: string): Promise<EntDataSnapshot[]> {
    const { data, error } = await this.supabase.from('ent_data_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataSnapshotBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataSnapshot[]> {
    const { data, error } = await this.supabase.from('ent_data_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataSnapshotByDateRange(schoolId: string, start: string, end: string): Promise<EntDataSnapshot[]> {
    const { data, error } = await this.supabase.from('ent_data_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- HistoricalStorage -----------------------------------------------------
  async findHistoricalStorageById(schoolId: string, id: string): Promise<EntHistoricalStorage> {
    const { data, error } = await this.supabase.from('ent_historical_storages').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntHistoricalStorageNotFoundError(id);
    return data;
  }

  async findAllHistoricalStorages(schoolId: string): Promise<EntHistoricalStorage[]> {
    const { data, error } = await this.supabase.from('ent_historical_storages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createHistoricalStorage(schoolId: string, data: EntHistoricalStorageCreate): Promise<EntHistoricalStorage> {
    const { data: result, error } = await this.supabase.from('ent_historical_storages').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateHistoricalStorage(schoolId: string, id: string, data: EntHistoricalStorageUpdate): Promise<EntHistoricalStorage> {
    const { data: result, error } = await this.supabase.from('ent_historical_storages').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntHistoricalStorageNotFoundError(id);
    return result;
  }

  async deleteHistoricalStorage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_historical_storages').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countHistoricalStorages(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_historical_storages').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findHistoricalStorageByStatus(schoolId: string, status: string): Promise<EntHistoricalStorage[]> {
    const { data, error } = await this.supabase.from('ent_historical_storages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveHistoricalStorages(schoolId: string): Promise<EntHistoricalStorage[]> {
    const { data, error } = await this.supabase.from('ent_historical_storages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findHistoricalStorageBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntHistoricalStorage[]> {
    const { data, error } = await this.supabase.from('ent_historical_storages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findHistoricalStorageByDateRange(schoolId: string, start: string, end: string): Promise<EntHistoricalStorage[]> {
    const { data, error } = await this.supabase.from('ent_historical_storages').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataGovernance -----------------------------------------------------
  async findDataGovernanceById(schoolId: string, id: string): Promise<EntDataGovernance> {
    const { data, error } = await this.supabase.from('ent_data_governances').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataGovernanceNotFoundError(id);
    return data;
  }

  async findAllDataGovernances(schoolId: string): Promise<EntDataGovernance[]> {
    const { data, error } = await this.supabase.from('ent_data_governances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataGovernance(schoolId: string, data: EntDataGovernanceCreate): Promise<EntDataGovernance> {
    const { data: result, error } = await this.supabase.from('ent_data_governances').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataGovernance(schoolId: string, id: string, data: EntDataGovernanceUpdate): Promise<EntDataGovernance> {
    const { data: result, error } = await this.supabase.from('ent_data_governances').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataGovernanceNotFoundError(id);
    return result;
  }

  async deleteDataGovernance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_governances').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataGovernances(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_governances').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataGovernanceByStatus(schoolId: string, status: string): Promise<EntDataGovernance[]> {
    const { data, error } = await this.supabase.from('ent_data_governances').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataGovernances(schoolId: string): Promise<EntDataGovernance[]> {
    const { data, error } = await this.supabase.from('ent_data_governances').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataGovernanceBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataGovernance[]> {
    const { data, error } = await this.supabase.from('ent_data_governances').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataGovernanceByDateRange(schoolId: string, start: string, end: string): Promise<EntDataGovernance[]> {
    const { data, error } = await this.supabase.from('ent_data_governances').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataLineage -----------------------------------------------------
  async findDataLineageById(schoolId: string, id: string): Promise<EntDataLineage> {
    const { data, error } = await this.supabase.from('ent_data_lineages').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataLineageNotFoundError(id);
    return data;
  }

  async findAllDataLineages(schoolId: string): Promise<EntDataLineage[]> {
    const { data, error } = await this.supabase.from('ent_data_lineages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataLineage(schoolId: string, data: EntDataLineageCreate): Promise<EntDataLineage> {
    const { data: result, error } = await this.supabase.from('ent_data_lineages').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataLineage(schoolId: string, id: string, data: EntDataLineageUpdate): Promise<EntDataLineage> {
    const { data: result, error } = await this.supabase.from('ent_data_lineages').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataLineageNotFoundError(id);
    return result;
  }

  async deleteDataLineage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_lineages').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataLineages(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_lineages').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataLineageByStatus(schoolId: string, status: string): Promise<EntDataLineage[]> {
    const { data, error } = await this.supabase.from('ent_data_lineages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataLineages(schoolId: string): Promise<EntDataLineage[]> {
    const { data, error } = await this.supabase.from('ent_data_lineages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataLineageBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataLineage[]> {
    const { data, error } = await this.supabase.from('ent_data_lineages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataLineageByDateRange(schoolId: string, start: string, end: string): Promise<EntDataLineage[]> {
    const { data, error } = await this.supabase.from('ent_data_lineages').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- MetadataCatalog -----------------------------------------------------
  async findMetadataCatalogById(schoolId: string, id: string): Promise<EntMetadataCatalog> {
    const { data, error } = await this.supabase.from('ent_metadata_catalogs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntMetadataCatalogNotFoundError(id);
    return data;
  }

  async findAllMetadataCatalogs(schoolId: string): Promise<EntMetadataCatalog[]> {
    const { data, error } = await this.supabase.from('ent_metadata_catalogs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createMetadataCatalog(schoolId: string, data: EntMetadataCatalogCreate): Promise<EntMetadataCatalog> {
    const { data: result, error } = await this.supabase.from('ent_metadata_catalogs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateMetadataCatalog(schoolId: string, id: string, data: EntMetadataCatalogUpdate): Promise<EntMetadataCatalog> {
    const { data: result, error } = await this.supabase.from('ent_metadata_catalogs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntMetadataCatalogNotFoundError(id);
    return result;
  }

  async deleteMetadataCatalog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_metadata_catalogs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countMetadataCatalogs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_metadata_catalogs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findMetadataCatalogByStatus(schoolId: string, status: string): Promise<EntMetadataCatalog[]> {
    const { data, error } = await this.supabase.from('ent_metadata_catalogs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveMetadataCatalogs(schoolId: string): Promise<EntMetadataCatalog[]> {
    const { data, error } = await this.supabase.from('ent_metadata_catalogs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findMetadataCatalogBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntMetadataCatalog[]> {
    const { data, error } = await this.supabase.from('ent_metadata_catalogs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findMetadataCatalogByDateRange(schoolId: string, start: string, end: string): Promise<EntMetadataCatalog[]> {
    const { data, error } = await this.supabase.from('ent_metadata_catalogs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataQuality -----------------------------------------------------
  async findDataQualityById(schoolId: string, id: string): Promise<EntDataQuality> {
    const { data, error } = await this.supabase.from('ent_data_qualities').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataQualityNotFoundError(id);
    return data;
  }

  async findAllDataQualitys(schoolId: string): Promise<EntDataQuality[]> {
    const { data, error } = await this.supabase.from('ent_data_qualities').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataQuality(schoolId: string, data: EntDataQualityCreate): Promise<EntDataQuality> {
    const { data: result, error } = await this.supabase.from('ent_data_qualities').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataQuality(schoolId: string, id: string, data: EntDataQualityUpdate): Promise<EntDataQuality> {
    const { data: result, error } = await this.supabase.from('ent_data_qualities').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataQualityNotFoundError(id);
    return result;
  }

  async deleteDataQuality(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_qualities').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataQualitys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_qualities').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataQualityByStatus(schoolId: string, status: string): Promise<EntDataQuality[]> {
    const { data, error } = await this.supabase.from('ent_data_qualities').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataQualitys(schoolId: string): Promise<EntDataQuality[]> {
    const { data, error } = await this.supabase.from('ent_data_qualities').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataQualityBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataQuality[]> {
    const { data, error } = await this.supabase.from('ent_data_qualities').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataQualityByDateRange(schoolId: string, start: string, end: string): Promise<EntDataQuality[]> {
    const { data, error } = await this.supabase.from('ent_data_qualities').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataPipeline -----------------------------------------------------
  async findDataPipelineById(schoolId: string, id: string): Promise<EntDataPipeline> {
    const { data, error } = await this.supabase.from('ent_data_pipelines').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataPipelineNotFoundError(id);
    return data;
  }

  async findAllDataPipelines(schoolId: string): Promise<EntDataPipeline[]> {
    const { data, error } = await this.supabase.from('ent_data_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataPipeline(schoolId: string, data: EntDataPipelineCreate): Promise<EntDataPipeline> {
    const { data: result, error } = await this.supabase.from('ent_data_pipelines').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataPipeline(schoolId: string, id: string, data: EntDataPipelineUpdate): Promise<EntDataPipeline> {
    const { data: result, error } = await this.supabase.from('ent_data_pipelines').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataPipelineNotFoundError(id);
    return result;
  }

  async deleteDataPipeline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_pipelines').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataPipelines(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_pipelines').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataPipelineByStatus(schoolId: string, status: string): Promise<EntDataPipeline[]> {
    const { data, error } = await this.supabase.from('ent_data_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataPipelines(schoolId: string): Promise<EntDataPipeline[]> {
    const { data, error } = await this.supabase.from('ent_data_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataPipelineBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataPipeline[]> {
    const { data, error } = await this.supabase.from('ent_data_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataPipelineByDateRange(schoolId: string, start: string, end: string): Promise<EntDataPipeline[]> {
    const { data, error } = await this.supabase.from('ent_data_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataRetention -----------------------------------------------------
  async findDataRetentionById(schoolId: string, id: string): Promise<EntDataRetention> {
    const { data, error } = await this.supabase.from('ent_data_retentions').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataRetentionNotFoundError(id);
    return data;
  }

  async findAllDataRetentions(schoolId: string): Promise<EntDataRetention[]> {
    const { data, error } = await this.supabase.from('ent_data_retentions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataRetention(schoolId: string, data: EntDataRetentionCreate): Promise<EntDataRetention> {
    const { data: result, error } = await this.supabase.from('ent_data_retentions').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataRetention(schoolId: string, id: string, data: EntDataRetentionUpdate): Promise<EntDataRetention> {
    const { data: result, error } = await this.supabase.from('ent_data_retentions').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataRetentionNotFoundError(id);
    return result;
  }

  async deleteDataRetention(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_retentions').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataRetentions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_retentions').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataRetentionByStatus(schoolId: string, status: string): Promise<EntDataRetention[]> {
    const { data, error } = await this.supabase.from('ent_data_retentions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataRetentions(schoolId: string): Promise<EntDataRetention[]> {
    const { data, error } = await this.supabase.from('ent_data_retentions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataRetentionBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataRetention[]> {
    const { data, error } = await this.supabase.from('ent_data_retentions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataRetentionByDateRange(schoolId: string, start: string, end: string): Promise<EntDataRetention[]> {
    const { data, error } = await this.supabase.from('ent_data_retentions').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataClassification -----------------------------------------------------
  async findDataClassificationById(schoolId: string, id: string): Promise<EntDataClassification> {
    const { data, error } = await this.supabase.from('ent_data_classifications').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataClassificationNotFoundError(id);
    return data;
  }

  async findAllDataClassifications(schoolId: string): Promise<EntDataClassification[]> {
    const { data, error } = await this.supabase.from('ent_data_classifications').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataClassification(schoolId: string, data: EntDataClassificationCreate): Promise<EntDataClassification> {
    const { data: result, error } = await this.supabase.from('ent_data_classifications').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataClassification(schoolId: string, id: string, data: EntDataClassificationUpdate): Promise<EntDataClassification> {
    const { data: result, error } = await this.supabase.from('ent_data_classifications').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataClassificationNotFoundError(id);
    return result;
  }

  async deleteDataClassification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_classifications').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataClassifications(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_classifications').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataClassificationByStatus(schoolId: string, status: string): Promise<EntDataClassification[]> {
    const { data, error } = await this.supabase.from('ent_data_classifications').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataClassifications(schoolId: string): Promise<EntDataClassification[]> {
    const { data, error } = await this.supabase.from('ent_data_classifications').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataClassificationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataClassification[]> {
    const { data, error } = await this.supabase.from('ent_data_classifications').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataClassificationByDateRange(schoolId: string, start: string, end: string): Promise<EntDataClassification[]> {
    const { data, error } = await this.supabase.from('ent_data_classifications').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataEncryption -----------------------------------------------------
  async findDataEncryptionById(schoolId: string, id: string): Promise<EntDataEncryption> {
    const { data, error } = await this.supabase.from('ent_data_encryptions').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataEncryptionNotFoundError(id);
    return data;
  }

  async findAllDataEncryptions(schoolId: string): Promise<EntDataEncryption[]> {
    const { data, error } = await this.supabase.from('ent_data_encryptions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataEncryption(schoolId: string, data: EntDataEncryptionCreate): Promise<EntDataEncryption> {
    const { data: result, error } = await this.supabase.from('ent_data_encryptions').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataEncryption(schoolId: string, id: string, data: EntDataEncryptionUpdate): Promise<EntDataEncryption> {
    const { data: result, error } = await this.supabase.from('ent_data_encryptions').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataEncryptionNotFoundError(id);
    return result;
  }

  async deleteDataEncryption(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_encryptions').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataEncryptions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_encryptions').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataEncryptionByStatus(schoolId: string, status: string): Promise<EntDataEncryption[]> {
    const { data, error } = await this.supabase.from('ent_data_encryptions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataEncryptions(schoolId: string): Promise<EntDataEncryption[]> {
    const { data, error } = await this.supabase.from('ent_data_encryptions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataEncryptionBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataEncryption[]> {
    const { data, error } = await this.supabase.from('ent_data_encryptions').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataEncryptionByDateRange(schoolId: string, start: string, end: string): Promise<EntDataEncryption[]> {
    const { data, error } = await this.supabase.from('ent_data_encryptions').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DataAccessPolicy -----------------------------------------------------
  async findDataAccessPolicyById(schoolId: string, id: string): Promise<EntDataAccessPolicy> {
    const { data, error } = await this.supabase.from('ent_data_access_policies').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDataAccessPolicyNotFoundError(id);
    return data;
  }

  async findAllDataAccessPolicys(schoolId: string): Promise<EntDataAccessPolicy[]> {
    const { data, error } = await this.supabase.from('ent_data_access_policies').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDataAccessPolicy(schoolId: string, data: EntDataAccessPolicyCreate): Promise<EntDataAccessPolicy> {
    const { data: result, error } = await this.supabase.from('ent_data_access_policies').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDataAccessPolicy(schoolId: string, id: string, data: EntDataAccessPolicyUpdate): Promise<EntDataAccessPolicy> {
    const { data: result, error } = await this.supabase.from('ent_data_access_policies').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDataAccessPolicyNotFoundError(id);
    return result;
  }

  async deleteDataAccessPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_data_access_policies').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDataAccessPolicys(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_data_access_policies').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDataAccessPolicyByStatus(schoolId: string, status: string): Promise<EntDataAccessPolicy[]> {
    const { data, error } = await this.supabase.from('ent_data_access_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDataAccessPolicys(schoolId: string): Promise<EntDataAccessPolicy[]> {
    const { data, error } = await this.supabase.from('ent_data_access_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDataAccessPolicyBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDataAccessPolicy[]> {
    const { data, error } = await this.supabase.from('ent_data_access_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDataAccessPolicyByDateRange(schoolId: string, start: string, end: string): Promise<EntDataAccessPolicy[]> {
    const { data, error } = await this.supabase.from('ent_data_access_policies').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CiPipeline -----------------------------------------------------
  async findCiPipelineById(schoolId: string, id: string): Promise<EntCiPipeline> {
    const { data, error } = await this.supabase.from('ent_ci_pipelines').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCiPipelineNotFoundError(id);
    return data;
  }

  async findAllCiPipelines(schoolId: string): Promise<EntCiPipeline[]> {
    const { data, error } = await this.supabase.from('ent_ci_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCiPipeline(schoolId: string, data: EntCiPipelineCreate): Promise<EntCiPipeline> {
    const { data: result, error } = await this.supabase.from('ent_ci_pipelines').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCiPipeline(schoolId: string, id: string, data: EntCiPipelineUpdate): Promise<EntCiPipeline> {
    const { data: result, error } = await this.supabase.from('ent_ci_pipelines').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCiPipelineNotFoundError(id);
    return result;
  }

  async deleteCiPipeline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_ci_pipelines').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCiPipelines(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_ci_pipelines').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCiPipelineByStatus(schoolId: string, status: string): Promise<EntCiPipeline[]> {
    const { data, error } = await this.supabase.from('ent_ci_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCiPipelines(schoolId: string): Promise<EntCiPipeline[]> {
    const { data, error } = await this.supabase.from('ent_ci_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCiPipelineBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCiPipeline[]> {
    const { data, error } = await this.supabase.from('ent_ci_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCiPipelineByDateRange(schoolId: string, start: string, end: string): Promise<EntCiPipeline[]> {
    const { data, error } = await this.supabase.from('ent_ci_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CiRun -----------------------------------------------------
  async findCiRunById(schoolId: string, id: string): Promise<EntCiRun> {
    const { data, error } = await this.supabase.from('ent_ci_runs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCiRunNotFoundError(id);
    return data;
  }

  async findAllCiRuns(schoolId: string): Promise<EntCiRun[]> {
    const { data, error } = await this.supabase.from('ent_ci_runs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCiRun(schoolId: string, data: EntCiRunCreate): Promise<EntCiRun> {
    const { data: result, error } = await this.supabase.from('ent_ci_runs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCiRun(schoolId: string, id: string, data: EntCiRunUpdate): Promise<EntCiRun> {
    const { data: result, error } = await this.supabase.from('ent_ci_runs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCiRunNotFoundError(id);
    return result;
  }

  async deleteCiRun(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_ci_runs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCiRuns(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_ci_runs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCiRunByStatus(schoolId: string, status: string): Promise<EntCiRun[]> {
    const { data, error } = await this.supabase.from('ent_ci_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCiRuns(schoolId: string): Promise<EntCiRun[]> {
    const { data, error } = await this.supabase.from('ent_ci_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCiRunBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCiRun[]> {
    const { data, error } = await this.supabase.from('ent_ci_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCiRunByDateRange(schoolId: string, start: string, end: string): Promise<EntCiRun[]> {
    const { data, error } = await this.supabase.from('ent_ci_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- QualityGate -----------------------------------------------------
  async findQualityGateById(schoolId: string, id: string): Promise<EntQualityGate> {
    const { data, error } = await this.supabase.from('ent_quality_gates').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntQualityGateNotFoundError(id);
    return data;
  }

  async findAllQualityGates(schoolId: string): Promise<EntQualityGate[]> {
    const { data, error } = await this.supabase.from('ent_quality_gates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createQualityGate(schoolId: string, data: EntQualityGateCreate): Promise<EntQualityGate> {
    const { data: result, error } = await this.supabase.from('ent_quality_gates').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateQualityGate(schoolId: string, id: string, data: EntQualityGateUpdate): Promise<EntQualityGate> {
    const { data: result, error } = await this.supabase.from('ent_quality_gates').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntQualityGateNotFoundError(id);
    return result;
  }

  async deleteQualityGate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_quality_gates').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countQualityGates(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_quality_gates').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findQualityGateByStatus(schoolId: string, status: string): Promise<EntQualityGate[]> {
    const { data, error } = await this.supabase.from('ent_quality_gates').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveQualityGates(schoolId: string): Promise<EntQualityGate[]> {
    const { data, error } = await this.supabase.from('ent_quality_gates').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findQualityGateBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntQualityGate[]> {
    const { data, error } = await this.supabase.from('ent_quality_gates').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findQualityGateByDateRange(schoolId: string, start: string, end: string): Promise<EntQualityGate[]> {
    const { data, error } = await this.supabase.from('ent_quality_gates').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- QualityGateResult -----------------------------------------------------
  async findQualityGateResultById(schoolId: string, id: string): Promise<EntQualityGateResult> {
    const { data, error } = await this.supabase.from('ent_quality_gate_results').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntQualityGateResultNotFoundError(id);
    return data;
  }

  async findAllQualityGateResults(schoolId: string): Promise<EntQualityGateResult[]> {
    const { data, error } = await this.supabase.from('ent_quality_gate_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createQualityGateResult(schoolId: string, data: EntQualityGateResultCreate): Promise<EntQualityGateResult> {
    const { data: result, error } = await this.supabase.from('ent_quality_gate_results').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateQualityGateResult(schoolId: string, id: string, data: EntQualityGateResultUpdate): Promise<EntQualityGateResult> {
    const { data: result, error } = await this.supabase.from('ent_quality_gate_results').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntQualityGateResultNotFoundError(id);
    return result;
  }

  async deleteQualityGateResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_quality_gate_results').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countQualityGateResults(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_quality_gate_results').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findQualityGateResultByStatus(schoolId: string, status: string): Promise<EntQualityGateResult[]> {
    const { data, error } = await this.supabase.from('ent_quality_gate_results').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveQualityGateResults(schoolId: string): Promise<EntQualityGateResult[]> {
    const { data, error } = await this.supabase.from('ent_quality_gate_results').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findQualityGateResultBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntQualityGateResult[]> {
    const { data, error } = await this.supabase.from('ent_quality_gate_results').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findQualityGateResultByDateRange(schoolId: string, start: string, end: string): Promise<EntQualityGateResult[]> {
    const { data, error } = await this.supabase.from('ent_quality_gate_results').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ReleaseNote -----------------------------------------------------
  async findReleaseNoteById(schoolId: string, id: string): Promise<EntReleaseNote> {
    const { data, error } = await this.supabase.from('ent_release_notes').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntReleaseNoteNotFoundError(id);
    return data;
  }

  async findAllReleaseNotes(schoolId: string): Promise<EntReleaseNote[]> {
    const { data, error } = await this.supabase.from('ent_release_notes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createReleaseNote(schoolId: string, data: EntReleaseNoteCreate): Promise<EntReleaseNote> {
    const { data: result, error } = await this.supabase.from('ent_release_notes').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateReleaseNote(schoolId: string, id: string, data: EntReleaseNoteUpdate): Promise<EntReleaseNote> {
    const { data: result, error } = await this.supabase.from('ent_release_notes').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntReleaseNoteNotFoundError(id);
    return result;
  }

  async deleteReleaseNote(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_release_notes').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countReleaseNotes(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_release_notes').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findReleaseNoteByStatus(schoolId: string, status: string): Promise<EntReleaseNote[]> {
    const { data, error } = await this.supabase.from('ent_release_notes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveReleaseNotes(schoolId: string): Promise<EntReleaseNote[]> {
    const { data, error } = await this.supabase.from('ent_release_notes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findReleaseNoteBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntReleaseNote[]> {
    const { data, error } = await this.supabase.from('ent_release_notes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findReleaseNoteByDateRange(schoolId: string, start: string, end: string): Promise<EntReleaseNote[]> {
    const { data, error } = await this.supabase.from('ent_release_notes').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- BuildDashboard -----------------------------------------------------
  async findBuildDashboardById(schoolId: string, id: string): Promise<EntBuildDashboard> {
    const { data, error } = await this.supabase.from('ent_build_dashboards').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntBuildDashboardNotFoundError(id);
    return data;
  }

  async findAllBuildDashboards(schoolId: string): Promise<EntBuildDashboard[]> {
    const { data, error } = await this.supabase.from('ent_build_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createBuildDashboard(schoolId: string, data: EntBuildDashboardCreate): Promise<EntBuildDashboard> {
    const { data: result, error } = await this.supabase.from('ent_build_dashboards').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateBuildDashboard(schoolId: string, id: string, data: EntBuildDashboardUpdate): Promise<EntBuildDashboard> {
    const { data: result, error } = await this.supabase.from('ent_build_dashboards').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntBuildDashboardNotFoundError(id);
    return result;
  }

  async deleteBuildDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_build_dashboards').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countBuildDashboards(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_build_dashboards').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findBuildDashboardByStatus(schoolId: string, status: string): Promise<EntBuildDashboard[]> {
    const { data, error } = await this.supabase.from('ent_build_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveBuildDashboards(schoolId: string): Promise<EntBuildDashboard[]> {
    const { data, error } = await this.supabase.from('ent_build_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findBuildDashboardBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntBuildDashboard[]> {
    const { data, error } = await this.supabase.from('ent_build_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findBuildDashboardByDateRange(schoolId: string, start: string, end: string): Promise<EntBuildDashboard[]> {
    const { data, error } = await this.supabase.from('ent_build_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- TestDashboard -----------------------------------------------------
  async findTestDashboardById(schoolId: string, id: string): Promise<EntTestDashboard> {
    const { data, error } = await this.supabase.from('ent_test_dashboards').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntTestDashboardNotFoundError(id);
    return data;
  }

  async findAllTestDashboards(schoolId: string): Promise<EntTestDashboard[]> {
    const { data, error } = await this.supabase.from('ent_test_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createTestDashboard(schoolId: string, data: EntTestDashboardCreate): Promise<EntTestDashboard> {
    const { data: result, error } = await this.supabase.from('ent_test_dashboards').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTestDashboard(schoolId: string, id: string, data: EntTestDashboardUpdate): Promise<EntTestDashboard> {
    const { data: result, error } = await this.supabase.from('ent_test_dashboards').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntTestDashboardNotFoundError(id);
    return result;
  }

  async deleteTestDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_test_dashboards').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countTestDashboards(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_test_dashboards').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findTestDashboardByStatus(schoolId: string, status: string): Promise<EntTestDashboard[]> {
    const { data, error } = await this.supabase.from('ent_test_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveTestDashboards(schoolId: string): Promise<EntTestDashboard[]> {
    const { data, error } = await this.supabase.from('ent_test_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findTestDashboardBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntTestDashboard[]> {
    const { data, error } = await this.supabase.from('ent_test_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findTestDashboardByDateRange(schoolId: string, start: string, end: string): Promise<EntTestDashboard[]> {
    const { data, error } = await this.supabase.from('ent_test_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CoverageDashboard -----------------------------------------------------
  async findCoverageDashboardById(schoolId: string, id: string): Promise<EntCoverageDashboard> {
    const { data, error } = await this.supabase.from('ent_coverage_dashboards').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCoverageDashboardNotFoundError(id);
    return data;
  }

  async findAllCoverageDashboards(schoolId: string): Promise<EntCoverageDashboard[]> {
    const { data, error } = await this.supabase.from('ent_coverage_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCoverageDashboard(schoolId: string, data: EntCoverageDashboardCreate): Promise<EntCoverageDashboard> {
    const { data: result, error } = await this.supabase.from('ent_coverage_dashboards').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCoverageDashboard(schoolId: string, id: string, data: EntCoverageDashboardUpdate): Promise<EntCoverageDashboard> {
    const { data: result, error } = await this.supabase.from('ent_coverage_dashboards').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCoverageDashboardNotFoundError(id);
    return result;
  }

  async deleteCoverageDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_coverage_dashboards').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCoverageDashboards(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_coverage_dashboards').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCoverageDashboardByStatus(schoolId: string, status: string): Promise<EntCoverageDashboard[]> {
    const { data, error } = await this.supabase.from('ent_coverage_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCoverageDashboards(schoolId: string): Promise<EntCoverageDashboard[]> {
    const { data, error } = await this.supabase.from('ent_coverage_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCoverageDashboardBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCoverageDashboard[]> {
    const { data, error } = await this.supabase.from('ent_coverage_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCoverageDashboardByDateRange(schoolId: string, start: string, end: string): Promise<EntCoverageDashboard[]> {
    const { data, error } = await this.supabase.from('ent_coverage_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CodeReview -----------------------------------------------------
  async findCodeReviewById(schoolId: string, id: string): Promise<EntCodeReview> {
    const { data, error } = await this.supabase.from('ent_code_reviews').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCodeReviewNotFoundError(id);
    return data;
  }

  async findAllCodeReviews(schoolId: string): Promise<EntCodeReview[]> {
    const { data, error } = await this.supabase.from('ent_code_reviews').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCodeReview(schoolId: string, data: EntCodeReviewCreate): Promise<EntCodeReview> {
    const { data: result, error } = await this.supabase.from('ent_code_reviews').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCodeReview(schoolId: string, id: string, data: EntCodeReviewUpdate): Promise<EntCodeReview> {
    const { data: result, error } = await this.supabase.from('ent_code_reviews').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCodeReviewNotFoundError(id);
    return result;
  }

  async deleteCodeReview(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_code_reviews').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCodeReviews(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_code_reviews').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCodeReviewByStatus(schoolId: string, status: string): Promise<EntCodeReview[]> {
    const { data, error } = await this.supabase.from('ent_code_reviews').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCodeReviews(schoolId: string): Promise<EntCodeReview[]> {
    const { data, error } = await this.supabase.from('ent_code_reviews').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCodeReviewBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCodeReview[]> {
    const { data, error } = await this.supabase.from('ent_code_reviews').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCodeReviewByDateRange(schoolId: string, start: string, end: string): Promise<EntCodeReview[]> {
    const { data, error } = await this.supabase.from('ent_code_reviews').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SecurityScan -----------------------------------------------------
  async findSecurityScanById(schoolId: string, id: string): Promise<EntSecurityScan> {
    const { data, error } = await this.supabase.from('ent_security_scans').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSecurityScanNotFoundError(id);
    return data;
  }

  async findAllSecurityScans(schoolId: string): Promise<EntSecurityScan[]> {
    const { data, error } = await this.supabase.from('ent_security_scans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSecurityScan(schoolId: string, data: EntSecurityScanCreate): Promise<EntSecurityScan> {
    const { data: result, error } = await this.supabase.from('ent_security_scans').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSecurityScan(schoolId: string, id: string, data: EntSecurityScanUpdate): Promise<EntSecurityScan> {
    const { data: result, error } = await this.supabase.from('ent_security_scans').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSecurityScanNotFoundError(id);
    return result;
  }

  async deleteSecurityScan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_security_scans').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSecurityScans(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_security_scans').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSecurityScanByStatus(schoolId: string, status: string): Promise<EntSecurityScan[]> {
    const { data, error } = await this.supabase.from('ent_security_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSecurityScans(schoolId: string): Promise<EntSecurityScan[]> {
    const { data, error } = await this.supabase.from('ent_security_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSecurityScanBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSecurityScan[]> {
    const { data, error } = await this.supabase.from('ent_security_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSecurityScanByDateRange(schoolId: string, start: string, end: string): Promise<EntSecurityScan[]> {
    const { data, error } = await this.supabase.from('ent_security_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DependencyScan -----------------------------------------------------
  async findDependencyScanById(schoolId: string, id: string): Promise<EntDependencyScan> {
    const { data, error } = await this.supabase.from('ent_dependency_scans').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDependencyScanNotFoundError(id);
    return data;
  }

  async findAllDependencyScans(schoolId: string): Promise<EntDependencyScan[]> {
    const { data, error } = await this.supabase.from('ent_dependency_scans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDependencyScan(schoolId: string, data: EntDependencyScanCreate): Promise<EntDependencyScan> {
    const { data: result, error } = await this.supabase.from('ent_dependency_scans').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDependencyScan(schoolId: string, id: string, data: EntDependencyScanUpdate): Promise<EntDependencyScan> {
    const { data: result, error } = await this.supabase.from('ent_dependency_scans').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDependencyScanNotFoundError(id);
    return result;
  }

  async deleteDependencyScan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_dependency_scans').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDependencyScans(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_dependency_scans').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDependencyScanByStatus(schoolId: string, status: string): Promise<EntDependencyScan[]> {
    const { data, error } = await this.supabase.from('ent_dependency_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDependencyScans(schoolId: string): Promise<EntDependencyScan[]> {
    const { data, error } = await this.supabase.from('ent_dependency_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDependencyScanBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDependencyScan[]> {
    const { data, error } = await this.supabase.from('ent_dependency_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDependencyScanByDateRange(schoolId: string, start: string, end: string): Promise<EntDependencyScan[]> {
    const { data, error } = await this.supabase.from('ent_dependency_scans').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- InfrastructureCode -----------------------------------------------------
  async findInfrastructureCodeById(schoolId: string, id: string): Promise<EntInfrastructureCode> {
    const { data, error } = await this.supabase.from('ent_infrastructure_codes').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntInfrastructureCodeNotFoundError(id);
    return data;
  }

  async findAllInfrastructureCodes(schoolId: string): Promise<EntInfrastructureCode[]> {
    const { data, error } = await this.supabase.from('ent_infrastructure_codes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createInfrastructureCode(schoolId: string, data: EntInfrastructureCodeCreate): Promise<EntInfrastructureCode> {
    const { data: result, error } = await this.supabase.from('ent_infrastructure_codes').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateInfrastructureCode(schoolId: string, id: string, data: EntInfrastructureCodeUpdate): Promise<EntInfrastructureCode> {
    const { data: result, error } = await this.supabase.from('ent_infrastructure_codes').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntInfrastructureCodeNotFoundError(id);
    return result;
  }

  async deleteInfrastructureCode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_infrastructure_codes').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countInfrastructureCodes(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_infrastructure_codes').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findInfrastructureCodeByStatus(schoolId: string, status: string): Promise<EntInfrastructureCode[]> {
    const { data, error } = await this.supabase.from('ent_infrastructure_codes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveInfrastructureCodes(schoolId: string): Promise<EntInfrastructureCode[]> {
    const { data, error } = await this.supabase.from('ent_infrastructure_codes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findInfrastructureCodeBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntInfrastructureCode[]> {
    const { data, error } = await this.supabase.from('ent_infrastructure_codes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findInfrastructureCodeByDateRange(schoolId: string, start: string, end: string): Promise<EntInfrastructureCode[]> {
    const { data, error } = await this.supabase.from('ent_infrastructure_codes').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ContainerImage -----------------------------------------------------
  async findContainerImageById(schoolId: string, id: string): Promise<EntContainerImage> {
    const { data, error } = await this.supabase.from('ent_container_images').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntContainerImageNotFoundError(id);
    return data;
  }

  async findAllContainerImages(schoolId: string): Promise<EntContainerImage[]> {
    const { data, error } = await this.supabase.from('ent_container_images').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createContainerImage(schoolId: string, data: EntContainerImageCreate): Promise<EntContainerImage> {
    const { data: result, error } = await this.supabase.from('ent_container_images').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateContainerImage(schoolId: string, id: string, data: EntContainerImageUpdate): Promise<EntContainerImage> {
    const { data: result, error } = await this.supabase.from('ent_container_images').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntContainerImageNotFoundError(id);
    return result;
  }

  async deleteContainerImage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_container_images').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countContainerImages(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_container_images').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findContainerImageByStatus(schoolId: string, status: string): Promise<EntContainerImage[]> {
    const { data, error } = await this.supabase.from('ent_container_images').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveContainerImages(schoolId: string): Promise<EntContainerImage[]> {
    const { data, error } = await this.supabase.from('ent_container_images').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findContainerImageBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntContainerImage[]> {
    const { data, error } = await this.supabase.from('ent_container_images').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findContainerImageByDateRange(schoolId: string, start: string, end: string): Promise<EntContainerImage[]> {
    const { data, error } = await this.supabase.from('ent_container_images').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- HelmChart -----------------------------------------------------
  async findHelmChartById(schoolId: string, id: string): Promise<EntHelmChart> {
    const { data, error } = await this.supabase.from('ent_helm_charts').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntHelmChartNotFoundError(id);
    return data;
  }

  async findAllHelmCharts(schoolId: string): Promise<EntHelmChart[]> {
    const { data, error } = await this.supabase.from('ent_helm_charts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createHelmChart(schoolId: string, data: EntHelmChartCreate): Promise<EntHelmChart> {
    const { data: result, error } = await this.supabase.from('ent_helm_charts').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateHelmChart(schoolId: string, id: string, data: EntHelmChartUpdate): Promise<EntHelmChart> {
    const { data: result, error } = await this.supabase.from('ent_helm_charts').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntHelmChartNotFoundError(id);
    return result;
  }

  async deleteHelmChart(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_helm_charts').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countHelmCharts(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_helm_charts').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findHelmChartByStatus(schoolId: string, status: string): Promise<EntHelmChart[]> {
    const { data, error } = await this.supabase.from('ent_helm_charts').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveHelmCharts(schoolId: string): Promise<EntHelmChart[]> {
    const { data, error } = await this.supabase.from('ent_helm_charts').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findHelmChartBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntHelmChart[]> {
    const { data, error } = await this.supabase.from('ent_helm_charts').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findHelmChartByDateRange(schoolId: string, start: string, end: string): Promise<EntHelmChart[]> {
    const { data, error } = await this.supabase.from('ent_helm_charts').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Sdk -----------------------------------------------------
  async findSdkById(schoolId: string, id: string): Promise<EntSdk> {
    const { data, error } = await this.supabase.from('ent_sdks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSdkNotFoundError(id);
    return data;
  }

  async findAllSdks(schoolId: string): Promise<EntSdk[]> {
    const { data, error } = await this.supabase.from('ent_sdks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSdk(schoolId: string, data: EntSdkCreate): Promise<EntSdk> {
    const { data: result, error } = await this.supabase.from('ent_sdks').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSdk(schoolId: string, id: string, data: EntSdkUpdate): Promise<EntSdk> {
    const { data: result, error } = await this.supabase.from('ent_sdks').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSdkNotFoundError(id);
    return result;
  }

  async deleteSdk(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_sdks').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSdks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_sdks').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSdkByStatus(schoolId: string, status: string): Promise<EntSdk[]> {
    const { data, error } = await this.supabase.from('ent_sdks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSdks(schoolId: string): Promise<EntSdk[]> {
    const { data, error } = await this.supabase.from('ent_sdks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSdkBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSdk[]> {
    const { data, error } = await this.supabase.from('ent_sdks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSdkByDateRange(schoolId: string, start: string, end: string): Promise<EntSdk[]> {
    const { data, error } = await this.supabase.from('ent_sdks').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SdkRelease -----------------------------------------------------
  async findSdkReleaseById(schoolId: string, id: string): Promise<EntSdkRelease> {
    const { data, error } = await this.supabase.from('ent_sdk_releases').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSdkReleaseNotFoundError(id);
    return data;
  }

  async findAllSdkReleases(schoolId: string): Promise<EntSdkRelease[]> {
    const { data, error } = await this.supabase.from('ent_sdk_releases').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSdkRelease(schoolId: string, data: EntSdkReleaseCreate): Promise<EntSdkRelease> {
    const { data: result, error } = await this.supabase.from('ent_sdk_releases').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSdkRelease(schoolId: string, id: string, data: EntSdkReleaseUpdate): Promise<EntSdkRelease> {
    const { data: result, error } = await this.supabase.from('ent_sdk_releases').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSdkReleaseNotFoundError(id);
    return result;
  }

  async deleteSdkRelease(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_sdk_releases').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSdkReleases(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_sdk_releases').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSdkReleaseByStatus(schoolId: string, status: string): Promise<EntSdkRelease[]> {
    const { data, error } = await this.supabase.from('ent_sdk_releases').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSdkReleases(schoolId: string): Promise<EntSdkRelease[]> {
    const { data, error } = await this.supabase.from('ent_sdk_releases').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSdkReleaseBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSdkRelease[]> {
    const { data, error } = await this.supabase.from('ent_sdk_releases').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSdkReleaseByDateRange(schoolId: string, start: string, end: string): Promise<EntSdkRelease[]> {
    const { data, error } = await this.supabase.from('ent_sdk_releases').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Cli -----------------------------------------------------
  async findCliById(schoolId: string, id: string): Promise<EntCli> {
    const { data, error } = await this.supabase.from('ent_clis').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCliNotFoundError(id);
    return data;
  }

  async findAllClis(schoolId: string): Promise<EntCli[]> {
    const { data, error } = await this.supabase.from('ent_clis').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCli(schoolId: string, data: EntCliCreate): Promise<EntCli> {
    const { data: result, error } = await this.supabase.from('ent_clis').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCli(schoolId: string, id: string, data: EntCliUpdate): Promise<EntCli> {
    const { data: result, error } = await this.supabase.from('ent_clis').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCliNotFoundError(id);
    return result;
  }

  async deleteCli(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_clis').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countClis(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_clis').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCliByStatus(schoolId: string, status: string): Promise<EntCli[]> {
    const { data, error } = await this.supabase.from('ent_clis').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveClis(schoolId: string): Promise<EntCli[]> {
    const { data, error } = await this.supabase.from('ent_clis').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCliBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCli[]> {
    const { data, error } = await this.supabase.from('ent_clis').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCliByDateRange(schoolId: string, start: string, end: string): Promise<EntCli[]> {
    const { data, error } = await this.supabase.from('ent_clis').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ApiDocumentation -----------------------------------------------------
  async findApiDocumentationById(schoolId: string, id: string): Promise<EntApiDocumentation> {
    const { data, error } = await this.supabase.from('ent_api_documentations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntApiDocumentationNotFoundError(id);
    return data;
  }

  async findAllApiDocumentations(schoolId: string): Promise<EntApiDocumentation[]> {
    const { data, error } = await this.supabase.from('ent_api_documentations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createApiDocumentation(schoolId: string, data: EntApiDocumentationCreate): Promise<EntApiDocumentation> {
    const { data: result, error } = await this.supabase.from('ent_api_documentations').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateApiDocumentation(schoolId: string, id: string, data: EntApiDocumentationUpdate): Promise<EntApiDocumentation> {
    const { data: result, error } = await this.supabase.from('ent_api_documentations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntApiDocumentationNotFoundError(id);
    return result;
  }

  async deleteApiDocumentation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_api_documentations').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countApiDocumentations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_api_documentations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findApiDocumentationByStatus(schoolId: string, status: string): Promise<EntApiDocumentation[]> {
    const { data, error } = await this.supabase.from('ent_api_documentations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveApiDocumentations(schoolId: string): Promise<EntApiDocumentation[]> {
    const { data, error } = await this.supabase.from('ent_api_documentations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findApiDocumentationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntApiDocumentation[]> {
    const { data, error } = await this.supabase.from('ent_api_documentations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findApiDocumentationByDateRange(schoolId: string, start: string, end: string): Promise<EntApiDocumentation[]> {
    const { data, error } = await this.supabase.from('ent_api_documentations').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- OpenApiSpec -----------------------------------------------------
  async findOpenApiSpecById(schoolId: string, id: string): Promise<EntOpenApiSpec> {
    const { data, error } = await this.supabase.from('ent_open_api_specs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntOpenApiSpecNotFoundError(id);
    return data;
  }

  async findAllOpenApiSpecs(schoolId: string): Promise<EntOpenApiSpec[]> {
    const { data, error } = await this.supabase.from('ent_open_api_specs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createOpenApiSpec(schoolId: string, data: EntOpenApiSpecCreate): Promise<EntOpenApiSpec> {
    const { data: result, error } = await this.supabase.from('ent_open_api_specs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateOpenApiSpec(schoolId: string, id: string, data: EntOpenApiSpecUpdate): Promise<EntOpenApiSpec> {
    const { data: result, error } = await this.supabase.from('ent_open_api_specs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntOpenApiSpecNotFoundError(id);
    return result;
  }

  async deleteOpenApiSpec(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_open_api_specs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countOpenApiSpecs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_open_api_specs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findOpenApiSpecByStatus(schoolId: string, status: string): Promise<EntOpenApiSpec[]> {
    const { data, error } = await this.supabase.from('ent_open_api_specs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveOpenApiSpecs(schoolId: string): Promise<EntOpenApiSpec[]> {
    const { data, error } = await this.supabase.from('ent_open_api_specs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findOpenApiSpecBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntOpenApiSpec[]> {
    const { data, error } = await this.supabase.from('ent_open_api_specs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findOpenApiSpecByDateRange(schoolId: string, start: string, end: string): Promise<EntOpenApiSpec[]> {
    const { data, error } = await this.supabase.from('ent_open_api_specs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- GraphqlSchema -----------------------------------------------------
  async findGraphqlSchemaById(schoolId: string, id: string): Promise<EntGraphqlSchema> {
    const { data, error } = await this.supabase.from('ent_graphql_schemas').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntGraphqlSchemaNotFoundError(id);
    return data;
  }

  async findAllGraphqlSchemas(schoolId: string): Promise<EntGraphqlSchema[]> {
    const { data, error } = await this.supabase.from('ent_graphql_schemas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createGraphqlSchema(schoolId: string, data: EntGraphqlSchemaCreate): Promise<EntGraphqlSchema> {
    const { data: result, error } = await this.supabase.from('ent_graphql_schemas').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateGraphqlSchema(schoolId: string, id: string, data: EntGraphqlSchemaUpdate): Promise<EntGraphqlSchema> {
    const { data: result, error } = await this.supabase.from('ent_graphql_schemas').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntGraphqlSchemaNotFoundError(id);
    return result;
  }

  async deleteGraphqlSchema(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_graphql_schemas').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countGraphqlSchemas(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_graphql_schemas').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findGraphqlSchemaByStatus(schoolId: string, status: string): Promise<EntGraphqlSchema[]> {
    const { data, error } = await this.supabase.from('ent_graphql_schemas').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveGraphqlSchemas(schoolId: string): Promise<EntGraphqlSchema[]> {
    const { data, error } = await this.supabase.from('ent_graphql_schemas').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findGraphqlSchemaBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntGraphqlSchema[]> {
    const { data, error } = await this.supabase.from('ent_graphql_schemas').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findGraphqlSchemaByDateRange(schoolId: string, start: string, end: string): Promise<EntGraphqlSchema[]> {
    const { data, error } = await this.supabase.from('ent_graphql_schemas').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DeveloperPortal -----------------------------------------------------
  async findDeveloperPortalById(schoolId: string, id: string): Promise<EntDeveloperPortal> {
    const { data, error } = await this.supabase.from('ent_developer_portals').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDeveloperPortalNotFoundError(id);
    return data;
  }

  async findAllDeveloperPortals(schoolId: string): Promise<EntDeveloperPortal[]> {
    const { data, error } = await this.supabase.from('ent_developer_portals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDeveloperPortal(schoolId: string, data: EntDeveloperPortalCreate): Promise<EntDeveloperPortal> {
    const { data: result, error } = await this.supabase.from('ent_developer_portals').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDeveloperPortal(schoolId: string, id: string, data: EntDeveloperPortalUpdate): Promise<EntDeveloperPortal> {
    const { data: result, error } = await this.supabase.from('ent_developer_portals').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDeveloperPortalNotFoundError(id);
    return result;
  }

  async deleteDeveloperPortal(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_developer_portals').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDeveloperPortals(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_developer_portals').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDeveloperPortalByStatus(schoolId: string, status: string): Promise<EntDeveloperPortal[]> {
    const { data, error } = await this.supabase.from('ent_developer_portals').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDeveloperPortals(schoolId: string): Promise<EntDeveloperPortal[]> {
    const { data, error } = await this.supabase.from('ent_developer_portals').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDeveloperPortalBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDeveloperPortal[]> {
    const { data, error } = await this.supabase.from('ent_developer_portals').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDeveloperPortalByDateRange(schoolId: string, start: string, end: string): Promise<EntDeveloperPortal[]> {
    const { data, error } = await this.supabase.from('ent_developer_portals').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DeveloperApp -----------------------------------------------------
  async findDeveloperAppById(schoolId: string, id: string): Promise<EntDeveloperApp> {
    const { data, error } = await this.supabase.from('ent_developer_apps').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDeveloperAppNotFoundError(id);
    return data;
  }

  async findAllDeveloperApps(schoolId: string): Promise<EntDeveloperApp[]> {
    const { data, error } = await this.supabase.from('ent_developer_apps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDeveloperApp(schoolId: string, data: EntDeveloperAppCreate): Promise<EntDeveloperApp> {
    const { data: result, error } = await this.supabase.from('ent_developer_apps').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDeveloperApp(schoolId: string, id: string, data: EntDeveloperAppUpdate): Promise<EntDeveloperApp> {
    const { data: result, error } = await this.supabase.from('ent_developer_apps').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDeveloperAppNotFoundError(id);
    return result;
  }

  async deleteDeveloperApp(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_developer_apps').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDeveloperApps(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_developer_apps').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDeveloperAppByStatus(schoolId: string, status: string): Promise<EntDeveloperApp[]> {
    const { data, error } = await this.supabase.from('ent_developer_apps').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDeveloperApps(schoolId: string): Promise<EntDeveloperApp[]> {
    const { data, error } = await this.supabase.from('ent_developer_apps').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDeveloperAppBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDeveloperApp[]> {
    const { data, error } = await this.supabase.from('ent_developer_apps').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDeveloperAppByDateRange(schoolId: string, start: string, end: string): Promise<EntDeveloperApp[]> {
    const { data, error } = await this.supabase.from('ent_developer_apps').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Sandbox -----------------------------------------------------
  async findSandboxById(schoolId: string, id: string): Promise<EntSandbox> {
    const { data, error } = await this.supabase.from('ent_sandboxes').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSandboxNotFoundError(id);
    return data;
  }

  async findAllSandboxs(schoolId: string): Promise<EntSandbox[]> {
    const { data, error } = await this.supabase.from('ent_sandboxes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSandbox(schoolId: string, data: EntSandboxCreate): Promise<EntSandbox> {
    const { data: result, error } = await this.supabase.from('ent_sandboxes').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSandbox(schoolId: string, id: string, data: EntSandboxUpdate): Promise<EntSandbox> {
    const { data: result, error } = await this.supabase.from('ent_sandboxes').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSandboxNotFoundError(id);
    return result;
  }

  async deleteSandbox(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_sandboxes').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSandboxs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_sandboxes').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSandboxByStatus(schoolId: string, status: string): Promise<EntSandbox[]> {
    const { data, error } = await this.supabase.from('ent_sandboxes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSandboxs(schoolId: string): Promise<EntSandbox[]> {
    const { data, error } = await this.supabase.from('ent_sandboxes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSandboxBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSandbox[]> {
    const { data, error } = await this.supabase.from('ent_sandboxes').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSandboxByDateRange(schoolId: string, start: string, end: string): Promise<EntSandbox[]> {
    const { data, error } = await this.supabase.from('ent_sandboxes').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SandboxInstance -----------------------------------------------------
  async findSandboxInstanceById(schoolId: string, id: string): Promise<EntSandboxInstance> {
    const { data, error } = await this.supabase.from('ent_sandbox_instances').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSandboxInstanceNotFoundError(id);
    return data;
  }

  async findAllSandboxInstances(schoolId: string): Promise<EntSandboxInstance[]> {
    const { data, error } = await this.supabase.from('ent_sandbox_instances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSandboxInstance(schoolId: string, data: EntSandboxInstanceCreate): Promise<EntSandboxInstance> {
    const { data: result, error } = await this.supabase.from('ent_sandbox_instances').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSandboxInstance(schoolId: string, id: string, data: EntSandboxInstanceUpdate): Promise<EntSandboxInstance> {
    const { data: result, error } = await this.supabase.from('ent_sandbox_instances').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSandboxInstanceNotFoundError(id);
    return result;
  }

  async deleteSandboxInstance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_sandbox_instances').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSandboxInstances(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_sandbox_instances').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSandboxInstanceByStatus(schoolId: string, status: string): Promise<EntSandboxInstance[]> {
    const { data, error } = await this.supabase.from('ent_sandbox_instances').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSandboxInstances(schoolId: string): Promise<EntSandboxInstance[]> {
    const { data, error } = await this.supabase.from('ent_sandbox_instances').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSandboxInstanceBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSandboxInstance[]> {
    const { data, error } = await this.supabase.from('ent_sandbox_instances').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSandboxInstanceByDateRange(schoolId: string, start: string, end: string): Promise<EntSandboxInstance[]> {
    const { data, error } = await this.supabase.from('ent_sandbox_instances').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ApiUsage -----------------------------------------------------
  async findApiUsageById(schoolId: string, id: string): Promise<EntApiUsage> {
    const { data, error } = await this.supabase.from('ent_api_usages').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntApiUsageNotFoundError(id);
    return data;
  }

  async findAllApiUsages(schoolId: string): Promise<EntApiUsage[]> {
    const { data, error } = await this.supabase.from('ent_api_usages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createApiUsage(schoolId: string, data: EntApiUsageCreate): Promise<EntApiUsage> {
    const { data: result, error } = await this.supabase.from('ent_api_usages').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateApiUsage(schoolId: string, id: string, data: EntApiUsageUpdate): Promise<EntApiUsage> {
    const { data: result, error } = await this.supabase.from('ent_api_usages').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntApiUsageNotFoundError(id);
    return result;
  }

  async deleteApiUsage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_api_usages').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countApiUsages(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_api_usages').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findApiUsageByStatus(schoolId: string, status: string): Promise<EntApiUsage[]> {
    const { data, error } = await this.supabase.from('ent_api_usages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveApiUsages(schoolId: string): Promise<EntApiUsage[]> {
    const { data, error } = await this.supabase.from('ent_api_usages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findApiUsageBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntApiUsage[]> {
    const { data, error } = await this.supabase.from('ent_api_usages').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findApiUsageByDateRange(schoolId: string, start: string, end: string): Promise<EntApiUsage[]> {
    const { data, error } = await this.supabase.from('ent_api_usages').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- Webhook -----------------------------------------------------
  async findWebhookById(schoolId: string, id: string): Promise<EntWebhook> {
    const { data, error } = await this.supabase.from('ent_webhooks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntWebhookNotFoundError(id);
    return data;
  }

  async findAllWebhooks(schoolId: string): Promise<EntWebhook[]> {
    const { data, error } = await this.supabase.from('ent_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createWebhook(schoolId: string, data: EntWebhookCreate): Promise<EntWebhook> {
    const { data: result, error } = await this.supabase.from('ent_webhooks').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateWebhook(schoolId: string, id: string, data: EntWebhookUpdate): Promise<EntWebhook> {
    const { data: result, error } = await this.supabase.from('ent_webhooks').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntWebhookNotFoundError(id);
    return result;
  }

  async deleteWebhook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_webhooks').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countWebhooks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_webhooks').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findWebhookByStatus(schoolId: string, status: string): Promise<EntWebhook[]> {
    const { data, error } = await this.supabase.from('ent_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveWebhooks(schoolId: string): Promise<EntWebhook[]> {
    const { data, error } = await this.supabase.from('ent_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findWebhookBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntWebhook[]> {
    const { data, error } = await this.supabase.from('ent_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findWebhookByDateRange(schoolId: string, start: string, end: string): Promise<EntWebhook[]> {
    const { data, error } = await this.supabase.from('ent_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DeveloperDocumentation -----------------------------------------------------
  async findDeveloperDocumentationById(schoolId: string, id: string): Promise<EntDeveloperDocumentation> {
    const { data, error } = await this.supabase.from('ent_developer_documentations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDeveloperDocumentationNotFoundError(id);
    return data;
  }

  async findAllDeveloperDocumentations(schoolId: string): Promise<EntDeveloperDocumentation[]> {
    const { data, error } = await this.supabase.from('ent_developer_documentations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDeveloperDocumentation(schoolId: string, data: EntDeveloperDocumentationCreate): Promise<EntDeveloperDocumentation> {
    const { data: result, error } = await this.supabase.from('ent_developer_documentations').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDeveloperDocumentation(schoolId: string, id: string, data: EntDeveloperDocumentationUpdate): Promise<EntDeveloperDocumentation> {
    const { data: result, error } = await this.supabase.from('ent_developer_documentations').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDeveloperDocumentationNotFoundError(id);
    return result;
  }

  async deleteDeveloperDocumentation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_developer_documentations').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDeveloperDocumentations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_developer_documentations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDeveloperDocumentationByStatus(schoolId: string, status: string): Promise<EntDeveloperDocumentation[]> {
    const { data, error } = await this.supabase.from('ent_developer_documentations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDeveloperDocumentations(schoolId: string): Promise<EntDeveloperDocumentation[]> {
    const { data, error } = await this.supabase.from('ent_developer_documentations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDeveloperDocumentationBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDeveloperDocumentation[]> {
    const { data, error } = await this.supabase.from('ent_developer_documentations').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDeveloperDocumentationByDateRange(schoolId: string, start: string, end: string): Promise<EntDeveloperDocumentation[]> {
    const { data, error } = await this.supabase.from('ent_developer_documentations').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SdkExample -----------------------------------------------------
  async findSdkExampleById(schoolId: string, id: string): Promise<EntSdkExample> {
    const { data, error } = await this.supabase.from('ent_sdk_examples').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSdkExampleNotFoundError(id);
    return data;
  }

  async findAllSdkExamples(schoolId: string): Promise<EntSdkExample[]> {
    const { data, error } = await this.supabase.from('ent_sdk_examples').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSdkExample(schoolId: string, data: EntSdkExampleCreate): Promise<EntSdkExample> {
    const { data: result, error } = await this.supabase.from('ent_sdk_examples').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSdkExample(schoolId: string, id: string, data: EntSdkExampleUpdate): Promise<EntSdkExample> {
    const { data: result, error } = await this.supabase.from('ent_sdk_examples').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSdkExampleNotFoundError(id);
    return result;
  }

  async deleteSdkExample(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_sdk_examples').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSdkExamples(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_sdk_examples').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSdkExampleByStatus(schoolId: string, status: string): Promise<EntSdkExample[]> {
    const { data, error } = await this.supabase.from('ent_sdk_examples').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSdkExamples(schoolId: string): Promise<EntSdkExample[]> {
    const { data, error } = await this.supabase.from('ent_sdk_examples').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSdkExampleBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSdkExample[]> {
    const { data, error } = await this.supabase.from('ent_sdk_examples').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSdkExampleByDateRange(schoolId: string, start: string, end: string): Promise<EntSdkExample[]> {
    const { data, error } = await this.supabase.from('ent_sdk_examples').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- RateLimit -----------------------------------------------------
  async findRateLimitById(schoolId: string, id: string): Promise<EntRateLimit> {
    const { data, error } = await this.supabase.from('ent_rate_limits').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntRateLimitNotFoundError(id);
    return data;
  }

  async findAllRateLimits(schoolId: string): Promise<EntRateLimit[]> {
    const { data, error } = await this.supabase.from('ent_rate_limits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createRateLimit(schoolId: string, data: EntRateLimitCreate): Promise<EntRateLimit> {
    const { data: result, error } = await this.supabase.from('ent_rate_limits').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateRateLimit(schoolId: string, id: string, data: EntRateLimitUpdate): Promise<EntRateLimit> {
    const { data: result, error } = await this.supabase.from('ent_rate_limits').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntRateLimitNotFoundError(id);
    return result;
  }

  async deleteRateLimit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_rate_limits').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countRateLimits(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_rate_limits').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findRateLimitByStatus(schoolId: string, status: string): Promise<EntRateLimit[]> {
    const { data, error } = await this.supabase.from('ent_rate_limits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRateLimits(schoolId: string): Promise<EntRateLimit[]> {
    const { data, error } = await this.supabase.from('ent_rate_limits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRateLimitBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntRateLimit[]> {
    const { data, error } = await this.supabase.from('ent_rate_limits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findRateLimitByDateRange(schoolId: string, start: string, end: string): Promise<EntRateLimit[]> {
    const { data, error } = await this.supabase.from('ent_rate_limits').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- OauthApp -----------------------------------------------------
  async findOauthAppById(schoolId: string, id: string): Promise<EntOauthApp> {
    const { data, error } = await this.supabase.from('ent_oauth_apps').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntOauthAppNotFoundError(id);
    return data;
  }

  async findAllOauthApps(schoolId: string): Promise<EntOauthApp[]> {
    const { data, error } = await this.supabase.from('ent_oauth_apps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createOauthApp(schoolId: string, data: EntOauthAppCreate): Promise<EntOauthApp> {
    const { data: result, error } = await this.supabase.from('ent_oauth_apps').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateOauthApp(schoolId: string, id: string, data: EntOauthAppUpdate): Promise<EntOauthApp> {
    const { data: result, error } = await this.supabase.from('ent_oauth_apps').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntOauthAppNotFoundError(id);
    return result;
  }

  async deleteOauthApp(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_oauth_apps').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countOauthApps(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_oauth_apps').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findOauthAppByStatus(schoolId: string, status: string): Promise<EntOauthApp[]> {
    const { data, error } = await this.supabase.from('ent_oauth_apps').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveOauthApps(schoolId: string): Promise<EntOauthApp[]> {
    const { data, error } = await this.supabase.from('ent_oauth_apps').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findOauthAppBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntOauthApp[]> {
    const { data, error } = await this.supabase.from('ent_oauth_apps').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findOauthAppByDateRange(schoolId: string, start: string, end: string): Promise<EntOauthApp[]> {
    const { data, error } = await this.supabase.from('ent_oauth_apps').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ProductionHealthCheck -----------------------------------------------------
  async findProductionHealthCheckById(schoolId: string, id: string): Promise<EntProductionHealthCheck> {
    const { data, error } = await this.supabase.from('ent_production_health_checks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntProductionHealthCheckNotFoundError(id);
    return data;
  }

  async findAllProductionHealthChecks(schoolId: string): Promise<EntProductionHealthCheck[]> {
    const { data, error } = await this.supabase.from('ent_production_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createProductionHealthCheck(schoolId: string, data: EntProductionHealthCheckCreate): Promise<EntProductionHealthCheck> {
    const { data: result, error } = await this.supabase.from('ent_production_health_checks').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateProductionHealthCheck(schoolId: string, id: string, data: EntProductionHealthCheckUpdate): Promise<EntProductionHealthCheck> {
    const { data: result, error } = await this.supabase.from('ent_production_health_checks').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntProductionHealthCheckNotFoundError(id);
    return result;
  }

  async deleteProductionHealthCheck(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_production_health_checks').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countProductionHealthChecks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_production_health_checks').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findProductionHealthCheckByStatus(schoolId: string, status: string): Promise<EntProductionHealthCheck[]> {
    const { data, error } = await this.supabase.from('ent_production_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveProductionHealthChecks(schoolId: string): Promise<EntProductionHealthCheck[]> {
    const { data, error } = await this.supabase.from('ent_production_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findProductionHealthCheckBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntProductionHealthCheck[]> {
    const { data, error } = await this.supabase.from('ent_production_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findProductionHealthCheckByDateRange(schoolId: string, start: string, end: string): Promise<EntProductionHealthCheck[]> {
    const { data, error } = await this.supabase.from('ent_production_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- DiagnosticRun -----------------------------------------------------
  async findDiagnosticRunById(schoolId: string, id: string): Promise<EntDiagnosticRun> {
    const { data, error } = await this.supabase.from('ent_diagnostic_runs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntDiagnosticRunNotFoundError(id);
    return data;
  }

  async findAllDiagnosticRuns(schoolId: string): Promise<EntDiagnosticRun[]> {
    const { data, error } = await this.supabase.from('ent_diagnostic_runs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createDiagnosticRun(schoolId: string, data: EntDiagnosticRunCreate): Promise<EntDiagnosticRun> {
    const { data: result, error } = await this.supabase.from('ent_diagnostic_runs').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDiagnosticRun(schoolId: string, id: string, data: EntDiagnosticRunUpdate): Promise<EntDiagnosticRun> {
    const { data: result, error } = await this.supabase.from('ent_diagnostic_runs').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntDiagnosticRunNotFoundError(id);
    return result;
  }

  async deleteDiagnosticRun(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_diagnostic_runs').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countDiagnosticRuns(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_diagnostic_runs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findDiagnosticRunByStatus(schoolId: string, status: string): Promise<EntDiagnosticRun[]> {
    const { data, error } = await this.supabase.from('ent_diagnostic_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveDiagnosticRuns(schoolId: string): Promise<EntDiagnosticRun[]> {
    const { data, error } = await this.supabase.from('ent_diagnostic_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findDiagnosticRunBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntDiagnosticRun[]> {
    const { data, error } = await this.supabase.from('ent_diagnostic_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findDiagnosticRunByDateRange(schoolId: string, start: string, end: string): Promise<EntDiagnosticRun[]> {
    const { data, error } = await this.supabase.from('ent_diagnostic_runs').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ProductionAudit -----------------------------------------------------
  async findProductionAuditById(schoolId: string, id: string): Promise<EntProductionAudit> {
    const { data, error } = await this.supabase.from('ent_production_audits').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntProductionAuditNotFoundError(id);
    return data;
  }

  async findAllProductionAudits(schoolId: string): Promise<EntProductionAudit[]> {
    const { data, error } = await this.supabase.from('ent_production_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createProductionAudit(schoolId: string, data: EntProductionAuditCreate): Promise<EntProductionAudit> {
    const { data: result, error } = await this.supabase.from('ent_production_audits').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateProductionAudit(schoolId: string, id: string, data: EntProductionAuditUpdate): Promise<EntProductionAudit> {
    const { data: result, error } = await this.supabase.from('ent_production_audits').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntProductionAuditNotFoundError(id);
    return result;
  }

  async deleteProductionAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_production_audits').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countProductionAudits(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_production_audits').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findProductionAuditByStatus(schoolId: string, status: string): Promise<EntProductionAudit[]> {
    const { data, error } = await this.supabase.from('ent_production_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveProductionAudits(schoolId: string): Promise<EntProductionAudit[]> {
    const { data, error } = await this.supabase.from('ent_production_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findProductionAuditBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntProductionAudit[]> {
    const { data, error } = await this.supabase.from('ent_production_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findProductionAuditByDateRange(schoolId: string, start: string, end: string): Promise<EntProductionAudit[]> {
    const { data, error } = await this.supabase.from('ent_production_audits').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- PerformanceBenchmark -----------------------------------------------------
  async findPerformanceBenchmarkById(schoolId: string, id: string): Promise<EntPerformanceBenchmark> {
    const { data, error } = await this.supabase.from('ent_performance_benchmarks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntPerformanceBenchmarkNotFoundError(id);
    return data;
  }

  async findAllPerformanceBenchmarks(schoolId: string): Promise<EntPerformanceBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_performance_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createPerformanceBenchmark(schoolId: string, data: EntPerformanceBenchmarkCreate): Promise<EntPerformanceBenchmark> {
    const { data: result, error } = await this.supabase.from('ent_performance_benchmarks').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePerformanceBenchmark(schoolId: string, id: string, data: EntPerformanceBenchmarkUpdate): Promise<EntPerformanceBenchmark> {
    const { data: result, error } = await this.supabase.from('ent_performance_benchmarks').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntPerformanceBenchmarkNotFoundError(id);
    return result;
  }

  async deletePerformanceBenchmark(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_performance_benchmarks').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countPerformanceBenchmarks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_performance_benchmarks').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findPerformanceBenchmarkByStatus(schoolId: string, status: string): Promise<EntPerformanceBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_performance_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActivePerformanceBenchmarks(schoolId: string): Promise<EntPerformanceBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_performance_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findPerformanceBenchmarkBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntPerformanceBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_performance_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findPerformanceBenchmarkByDateRange(schoolId: string, start: string, end: string): Promise<EntPerformanceBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_performance_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- SecurityBenchmark -----------------------------------------------------
  async findSecurityBenchmarkById(schoolId: string, id: string): Promise<EntSecurityBenchmark> {
    const { data, error } = await this.supabase.from('ent_security_benchmarks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntSecurityBenchmarkNotFoundError(id);
    return data;
  }

  async findAllSecurityBenchmarks(schoolId: string): Promise<EntSecurityBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_security_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createSecurityBenchmark(schoolId: string, data: EntSecurityBenchmarkCreate): Promise<EntSecurityBenchmark> {
    const { data: result, error } = await this.supabase.from('ent_security_benchmarks').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSecurityBenchmark(schoolId: string, id: string, data: EntSecurityBenchmarkUpdate): Promise<EntSecurityBenchmark> {
    const { data: result, error } = await this.supabase.from('ent_security_benchmarks').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntSecurityBenchmarkNotFoundError(id);
    return result;
  }

  async deleteSecurityBenchmark(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_security_benchmarks').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countSecurityBenchmarks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_security_benchmarks').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findSecurityBenchmarkByStatus(schoolId: string, status: string): Promise<EntSecurityBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_security_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveSecurityBenchmarks(schoolId: string): Promise<EntSecurityBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_security_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSecurityBenchmarkBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntSecurityBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_security_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findSecurityBenchmarkByDateRange(schoolId: string, start: string, end: string): Promise<EntSecurityBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_security_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ScalabilityBenchmark -----------------------------------------------------
  async findScalabilityBenchmarkById(schoolId: string, id: string): Promise<EntScalabilityBenchmark> {
    const { data, error } = await this.supabase.from('ent_scalability_benchmarks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntScalabilityBenchmarkNotFoundError(id);
    return data;
  }

  async findAllScalabilityBenchmarks(schoolId: string): Promise<EntScalabilityBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_scalability_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createScalabilityBenchmark(schoolId: string, data: EntScalabilityBenchmarkCreate): Promise<EntScalabilityBenchmark> {
    const { data: result, error } = await this.supabase.from('ent_scalability_benchmarks').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateScalabilityBenchmark(schoolId: string, id: string, data: EntScalabilityBenchmarkUpdate): Promise<EntScalabilityBenchmark> {
    const { data: result, error } = await this.supabase.from('ent_scalability_benchmarks').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntScalabilityBenchmarkNotFoundError(id);
    return result;
  }

  async deleteScalabilityBenchmark(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_scalability_benchmarks').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countScalabilityBenchmarks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_scalability_benchmarks').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findScalabilityBenchmarkByStatus(schoolId: string, status: string): Promise<EntScalabilityBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_scalability_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveScalabilityBenchmarks(schoolId: string): Promise<EntScalabilityBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_scalability_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findScalabilityBenchmarkBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntScalabilityBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_scalability_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findScalabilityBenchmarkByDateRange(schoolId: string, start: string, end: string): Promise<EntScalabilityBenchmark[]> {
    const { data, error } = await this.supabase.from('ent_scalability_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CompatibilityMatrix -----------------------------------------------------
  async findCompatibilityMatrixById(schoolId: string, id: string): Promise<EntCompatibilityMatrix> {
    const { data, error } = await this.supabase.from('ent_compatibility_matrices').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCompatibilityMatrixNotFoundError(id);
    return data;
  }

  async findAllCompatibilityMatrixs(schoolId: string): Promise<EntCompatibilityMatrix[]> {
    const { data, error } = await this.supabase.from('ent_compatibility_matrices').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCompatibilityMatrix(schoolId: string, data: EntCompatibilityMatrixCreate): Promise<EntCompatibilityMatrix> {
    const { data: result, error } = await this.supabase.from('ent_compatibility_matrices').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCompatibilityMatrix(schoolId: string, id: string, data: EntCompatibilityMatrixUpdate): Promise<EntCompatibilityMatrix> {
    const { data: result, error } = await this.supabase.from('ent_compatibility_matrices').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCompatibilityMatrixNotFoundError(id);
    return result;
  }

  async deleteCompatibilityMatrix(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_compatibility_matrices').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCompatibilityMatrixs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_compatibility_matrices').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCompatibilityMatrixByStatus(schoolId: string, status: string): Promise<EntCompatibilityMatrix[]> {
    const { data, error } = await this.supabase.from('ent_compatibility_matrices').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCompatibilityMatrixs(schoolId: string): Promise<EntCompatibilityMatrix[]> {
    const { data, error } = await this.supabase.from('ent_compatibility_matrices').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCompatibilityMatrixBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCompatibilityMatrix[]> {
    const { data, error } = await this.supabase.from('ent_compatibility_matrices').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCompatibilityMatrixByDateRange(schoolId: string, start: string, end: string): Promise<EntCompatibilityMatrix[]> {
    const { data, error } = await this.supabase.from('ent_compatibility_matrices').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ProductionCertificate -----------------------------------------------------
  async findProductionCertificateById(schoolId: string, id: string): Promise<EntProductionCertificate> {
    const { data, error } = await this.supabase.from('ent_production_certificates').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntProductionCertificateNotFoundError(id);
    return data;
  }

  async findAllProductionCertificates(schoolId: string): Promise<EntProductionCertificate[]> {
    const { data, error } = await this.supabase.from('ent_production_certificates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createProductionCertificate(schoolId: string, data: EntProductionCertificateCreate): Promise<EntProductionCertificate> {
    const { data: result, error } = await this.supabase.from('ent_production_certificates').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateProductionCertificate(schoolId: string, id: string, data: EntProductionCertificateUpdate): Promise<EntProductionCertificate> {
    const { data: result, error } = await this.supabase.from('ent_production_certificates').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntProductionCertificateNotFoundError(id);
    return result;
  }

  async deleteProductionCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_production_certificates').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countProductionCertificates(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_production_certificates').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findProductionCertificateByStatus(schoolId: string, status: string): Promise<EntProductionCertificate[]> {
    const { data, error } = await this.supabase.from('ent_production_certificates').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveProductionCertificates(schoolId: string): Promise<EntProductionCertificate[]> {
    const { data, error } = await this.supabase.from('ent_production_certificates').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findProductionCertificateBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntProductionCertificate[]> {
    const { data, error } = await this.supabase.from('ent_production_certificates').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findProductionCertificateByDateRange(schoolId: string, start: string, end: string): Promise<EntProductionCertificate[]> {
    const { data, error } = await this.supabase.from('ent_production_certificates').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- LoadTest -----------------------------------------------------
  async findLoadTestById(schoolId: string, id: string): Promise<EntLoadTest> {
    const { data, error } = await this.supabase.from('ent_load_tests').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntLoadTestNotFoundError(id);
    return data;
  }

  async findAllLoadTests(schoolId: string): Promise<EntLoadTest[]> {
    const { data, error } = await this.supabase.from('ent_load_tests').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createLoadTest(schoolId: string, data: EntLoadTestCreate): Promise<EntLoadTest> {
    const { data: result, error } = await this.supabase.from('ent_load_tests').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateLoadTest(schoolId: string, id: string, data: EntLoadTestUpdate): Promise<EntLoadTest> {
    const { data: result, error } = await this.supabase.from('ent_load_tests').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntLoadTestNotFoundError(id);
    return result;
  }

  async deleteLoadTest(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_load_tests').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countLoadTests(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_load_tests').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findLoadTestByStatus(schoolId: string, status: string): Promise<EntLoadTest[]> {
    const { data, error } = await this.supabase.from('ent_load_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveLoadTests(schoolId: string): Promise<EntLoadTest[]> {
    const { data, error } = await this.supabase.from('ent_load_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findLoadTestBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntLoadTest[]> {
    const { data, error } = await this.supabase.from('ent_load_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findLoadTestByDateRange(schoolId: string, start: string, end: string): Promise<EntLoadTest[]> {
    const { data, error } = await this.supabase.from('ent_load_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- StressTest -----------------------------------------------------
  async findStressTestById(schoolId: string, id: string): Promise<EntStressTest> {
    const { data, error } = await this.supabase.from('ent_stress_tests').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntStressTestNotFoundError(id);
    return data;
  }

  async findAllStressTests(schoolId: string): Promise<EntStressTest[]> {
    const { data, error } = await this.supabase.from('ent_stress_tests').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createStressTest(schoolId: string, data: EntStressTestCreate): Promise<EntStressTest> {
    const { data: result, error } = await this.supabase.from('ent_stress_tests').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateStressTest(schoolId: string, id: string, data: EntStressTestUpdate): Promise<EntStressTest> {
    const { data: result, error } = await this.supabase.from('ent_stress_tests').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntStressTestNotFoundError(id);
    return result;
  }

  async deleteStressTest(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_stress_tests').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countStressTests(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_stress_tests').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findStressTestByStatus(schoolId: string, status: string): Promise<EntStressTest[]> {
    const { data, error } = await this.supabase.from('ent_stress_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveStressTests(schoolId: string): Promise<EntStressTest[]> {
    const { data, error } = await this.supabase.from('ent_stress_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findStressTestBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntStressTest[]> {
    const { data, error } = await this.supabase.from('ent_stress_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findStressTestByDateRange(schoolId: string, start: string, end: string): Promise<EntStressTest[]> {
    const { data, error } = await this.supabase.from('ent_stress_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- EnduranceTest -----------------------------------------------------
  async findEnduranceTestById(schoolId: string, id: string): Promise<EntEnduranceTest> {
    const { data, error } = await this.supabase.from('ent_endurance_tests').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntEnduranceTestNotFoundError(id);
    return data;
  }

  async findAllEnduranceTests(schoolId: string): Promise<EntEnduranceTest[]> {
    const { data, error } = await this.supabase.from('ent_endurance_tests').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createEnduranceTest(schoolId: string, data: EntEnduranceTestCreate): Promise<EntEnduranceTest> {
    const { data: result, error } = await this.supabase.from('ent_endurance_tests').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateEnduranceTest(schoolId: string, id: string, data: EntEnduranceTestUpdate): Promise<EntEnduranceTest> {
    const { data: result, error } = await this.supabase.from('ent_endurance_tests').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntEnduranceTestNotFoundError(id);
    return result;
  }

  async deleteEnduranceTest(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_endurance_tests').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countEnduranceTests(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_endurance_tests').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findEnduranceTestByStatus(schoolId: string, status: string): Promise<EntEnduranceTest[]> {
    const { data, error } = await this.supabase.from('ent_endurance_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveEnduranceTests(schoolId: string): Promise<EntEnduranceTest[]> {
    const { data, error } = await this.supabase.from('ent_endurance_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findEnduranceTestBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntEnduranceTest[]> {
    const { data, error } = await this.supabase.from('ent_endurance_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findEnduranceTestByDateRange(schoolId: string, start: string, end: string): Promise<EntEnduranceTest[]> {
    const { data, error } = await this.supabase.from('ent_endurance_tests').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- CapacityPlan -----------------------------------------------------
  async findCapacityPlanById(schoolId: string, id: string): Promise<EntCapacityPlan> {
    const { data, error } = await this.supabase.from('ent_capacity_plans').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntCapacityPlanNotFoundError(id);
    return data;
  }

  async findAllCapacityPlans(schoolId: string): Promise<EntCapacityPlan[]> {
    const { data, error } = await this.supabase.from('ent_capacity_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createCapacityPlan(schoolId: string, data: EntCapacityPlanCreate): Promise<EntCapacityPlan> {
    const { data: result, error } = await this.supabase.from('ent_capacity_plans').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCapacityPlan(schoolId: string, id: string, data: EntCapacityPlanUpdate): Promise<EntCapacityPlan> {
    const { data: result, error } = await this.supabase.from('ent_capacity_plans').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntCapacityPlanNotFoundError(id);
    return result;
  }

  async deleteCapacityPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_capacity_plans').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countCapacityPlans(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_capacity_plans').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findCapacityPlanByStatus(schoolId: string, status: string): Promise<EntCapacityPlan[]> {
    const { data, error } = await this.supabase.from('ent_capacity_plans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveCapacityPlans(schoolId: string): Promise<EntCapacityPlan[]> {
    const { data, error } = await this.supabase.from('ent_capacity_plans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findCapacityPlanBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntCapacityPlan[]> {
    const { data, error } = await this.supabase.from('ent_capacity_plans').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCapacityPlanByDateRange(schoolId: string, start: string, end: string): Promise<EntCapacityPlan[]> {
    const { data, error } = await this.supabase.from('ent_capacity_plans').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ProductionRunbook -----------------------------------------------------
  async findProductionRunbookById(schoolId: string, id: string): Promise<EntProductionRunbook> {
    const { data, error } = await this.supabase.from('ent_production_runbooks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntProductionRunbookNotFoundError(id);
    return data;
  }

  async findAllProductionRunbooks(schoolId: string): Promise<EntProductionRunbook[]> {
    const { data, error } = await this.supabase.from('ent_production_runbooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createProductionRunbook(schoolId: string, data: EntProductionRunbookCreate): Promise<EntProductionRunbook> {
    const { data: result, error } = await this.supabase.from('ent_production_runbooks').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateProductionRunbook(schoolId: string, id: string, data: EntProductionRunbookUpdate): Promise<EntProductionRunbook> {
    const { data: result, error } = await this.supabase.from('ent_production_runbooks').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntProductionRunbookNotFoundError(id);
    return result;
  }

  async deleteProductionRunbook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_production_runbooks').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countProductionRunbooks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_production_runbooks').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findProductionRunbookByStatus(schoolId: string, status: string): Promise<EntProductionRunbook[]> {
    const { data, error } = await this.supabase.from('ent_production_runbooks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveProductionRunbooks(schoolId: string): Promise<EntProductionRunbook[]> {
    const { data, error } = await this.supabase.from('ent_production_runbooks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findProductionRunbookBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntProductionRunbook[]> {
    const { data, error } = await this.supabase.from('ent_production_runbooks').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findProductionRunbookByDateRange(schoolId: string, start: string, end: string): Promise<EntProductionRunbook[]> {
    const { data, error } = await this.supabase.from('ent_production_runbooks').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- IncidentPostmortem -----------------------------------------------------
  async findIncidentPostmortemById(schoolId: string, id: string): Promise<EntIncidentPostmortem> {
    const { data, error } = await this.supabase.from('ent_incident_postmortems').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntIncidentPostmortemNotFoundError(id);
    return data;
  }

  async findAllIncidentPostmortems(schoolId: string): Promise<EntIncidentPostmortem[]> {
    const { data, error } = await this.supabase.from('ent_incident_postmortems').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createIncidentPostmortem(schoolId: string, data: EntIncidentPostmortemCreate): Promise<EntIncidentPostmortem> {
    const { data: result, error } = await this.supabase.from('ent_incident_postmortems').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateIncidentPostmortem(schoolId: string, id: string, data: EntIncidentPostmortemUpdate): Promise<EntIncidentPostmortem> {
    const { data: result, error } = await this.supabase.from('ent_incident_postmortems').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntIncidentPostmortemNotFoundError(id);
    return result;
  }

  async deleteIncidentPostmortem(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_incident_postmortems').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countIncidentPostmortems(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_incident_postmortems').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findIncidentPostmortemByStatus(schoolId: string, status: string): Promise<EntIncidentPostmortem[]> {
    const { data, error } = await this.supabase.from('ent_incident_postmortems').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveIncidentPostmortems(schoolId: string): Promise<EntIncidentPostmortem[]> {
    const { data, error } = await this.supabase.from('ent_incident_postmortems').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findIncidentPostmortemBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntIncidentPostmortem[]> {
    const { data, error } = await this.supabase.from('ent_incident_postmortems').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findIncidentPostmortemByDateRange(schoolId: string, start: string, end: string): Promise<EntIncidentPostmortem[]> {
    const { data, error } = await this.supabase.from('ent_incident_postmortems').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- ProductionChecklist -----------------------------------------------------
  async findProductionChecklistById(schoolId: string, id: string): Promise<EntProductionChecklist> {
    const { data, error } = await this.supabase.from('ent_production_checklists').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntProductionChecklistNotFoundError(id);
    return data;
  }

  async findAllProductionChecklists(schoolId: string): Promise<EntProductionChecklist[]> {
    const { data, error } = await this.supabase.from('ent_production_checklists').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createProductionChecklist(schoolId: string, data: EntProductionChecklistCreate): Promise<EntProductionChecklist> {
    const { data: result, error } = await this.supabase.from('ent_production_checklists').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateProductionChecklist(schoolId: string, id: string, data: EntProductionChecklistUpdate): Promise<EntProductionChecklist> {
    const { data: result, error } = await this.supabase.from('ent_production_checklists').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntProductionChecklistNotFoundError(id);
    return result;
  }

  async deleteProductionChecklist(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_production_checklists').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countProductionChecklists(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_production_checklists').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findProductionChecklistByStatus(schoolId: string, status: string): Promise<EntProductionChecklist[]> {
    const { data, error } = await this.supabase.from('ent_production_checklists').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveProductionChecklists(schoolId: string): Promise<EntProductionChecklist[]> {
    const { data, error } = await this.supabase.from('ent_production_checklists').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findProductionChecklistBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntProductionChecklist[]> {
    const { data, error } = await this.supabase.from('ent_production_checklists').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findProductionChecklistByDateRange(schoolId: string, start: string, end: string): Promise<EntProductionChecklist[]> {
    const { data, error } = await this.supabase.from('ent_production_checklists').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }

  // --- GoLiveApproval -----------------------------------------------------
  async findGoLiveApprovalById(schoolId: string, id: string): Promise<EntGoLiveApproval> {
    const { data, error } = await this.supabase.from('ent_go_live_approvals').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new EntGoLiveApprovalNotFoundError(id);
    return data;
  }

  async findAllGoLiveApprovals(schoolId: string): Promise<EntGoLiveApproval[]> {
    const { data, error } = await this.supabase.from('ent_go_live_approvals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return data ?? [];
  }

  async createGoLiveApproval(schoolId: string, data: EntGoLiveApprovalCreate): Promise<EntGoLiveApproval> {
    const { data: result, error } = await this.supabase.from('ent_go_live_approvals').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateGoLiveApproval(schoolId: string, id: string, data: EntGoLiveApprovalUpdate): Promise<EntGoLiveApproval> {
    const { data: result, error } = await this.supabase.from('ent_go_live_approvals').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new EntGoLiveApprovalNotFoundError(id);
    return result;
  }

  async deleteGoLiveApproval(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('ent_go_live_approvals').update({ deleted_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async countGoLiveApprovals(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('ent_go_live_approvals').select('*', { count: 'exact', head: true }).eq('school_id', schoolId).is('deleted_at', null);
    if (error) throw error;
    return count ?? 0;
  }

  async findGoLiveApprovalByStatus(schoolId: string, status: string): Promise<EntGoLiveApproval[]> {
    const { data, error } = await this.supabase.from('ent_go_live_approvals').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveGoLiveApprovals(schoolId: string): Promise<EntGoLiveApproval[]> {
    const { data, error } = await this.supabase.from('ent_go_live_approvals').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findGoLiveApprovalBySchoolId(schoolId: string, targetSchoolId: string): Promise<EntGoLiveApproval[]> {
    const { data, error } = await this.supabase.from('ent_go_live_approvals').select('*').eq('school_id', schoolId).is('deleted_at', null).eq('target_school_id', targetSchoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findGoLiveApprovalByDateRange(schoolId: string, start: string, end: string): Promise<EntGoLiveApproval[]> {
    const { data, error } = await this.supabase.from('ent_go_live_approvals').select('*').eq('school_id', schoolId).is('deleted_at', null).gte('created_at', start).lte('created_at', end);
    if (error) throw error;
    return data ?? [];
  }
}

export function createEnterpriseRepository(supabase: SupabaseClient): EnterprisePlatformRepository {
  return new EnterprisePlatformRepository(supabase);
}

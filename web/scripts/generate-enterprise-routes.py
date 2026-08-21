#!/usr/bin/env python3
"""Generate 700 API route files for Phase 2.10 Enterprise Ecosystem"""
import os

BASE_PATH = r"C:\Users\kouas\Documents\Dev\EduCI\EduCI\web\src\app\api\enterprise"

# 180 entities: (kebab-name, PascalCaseName, service-class-name, list-method, get-method, create-method, update-method, delete-method)
ENTITIES = [
    # Core Enterprise (40)
    ("schools", "School", "EntSchoolService", "listSchools", "getSchool", "createSchool", "updateSchool", "deleteSchool"),
    ("subscriptions", "Subscription", "EntSubscriptionService", "listSubscriptions", "getSubscription", "createSubscription", "updateSubscription", "deleteSubscription"),
    ("licenses", "License", "EntLicenseService", "listLicenses", "getLicense", "createLicense", "updateLicense", "deleteLicense"),
    ("users", "User", "EntUserService", "listUsers", "getUser", "createUser", "updateUser", "deleteUser"),
    ("roles", "Role", "EntRoleService", "listRoles", "getRole", "createRole", "updateRole", "deleteRole"),
    ("permissions", "Permission", "EntPermissionService", "listPermissions", "getPermission", "createPermission", "updatePermission", "deletePermission"),
    ("sessions", "Session", "EntSessionService", "listSessions", "getSession", "createSession", "updateSession", "deleteSession"),
    ("tickets", "Ticket", "EntTicketService", "listTickets", "getTicket", "createTicket", "updateTicket", "deleteTicket"),
    ("ticket-messages", "TicketMessage", "EntTicketMessageService", "listTicketMessages", "getTicketMessage", "createTicketMessage", "updateTicketMessage", "deleteTicketMessage"),
    ("feature-flags", "FeatureFlag", "EntFeatureFlagService", "listFeatureFlags", "getFeatureFlag", "createFeatureFlag", "updateFeatureFlag", "deleteFeatureFlag"),
    ("audit-logs", "AuditLog", "EntAuditLogService", "listAuditLogs", "getAuditLog", "createAuditLog", "updateAuditLog", "deleteAuditLog"),
    ("notifications", "Notification", "EntNotificationService", "listNotifications", "getNotification", "createNotification", "updateNotification", "deleteNotification"),
    ("settings", "Setting", "EntSettingService", "listSettings", "getSetting", "createSetting", "updateSetting", "deleteSetting"),
    ("billing-cycles", "BillingCycle", "EntBillingCycleService", "listBillingCycles", "getBillingCycle", "createBillingCycle", "updateBillingCycle", "deleteBillingCycle"),
    ("storage-usage", "StorageUsage", "EntStorageUsageService", "listStorageUsage", "getStorageUsage", "createStorageUsage", "updateStorageUsage", "deleteStorageUsage"),
    ("api-usage", "ApiUsage", "EntApiUsageService", "listApiUsage", "getApiUsage", "createApiUsage", "updateApiUsage", "deleteApiUsage"),
    ("analytics-snapshots", "AnalyticsSnapshot", "EntAnalyticsSnapshotService", "listAnalyticsSnapshots", "getAnalyticsSnapshot", "createAnalyticsSnapshot", "updateAnalyticsSnapshot", "deleteAnalyticsSnapshot"),
    ("monitoring-events", "MonitoringEvent", "EntMonitoringEventService", "listMonitoringEvents", "getMonitoringEvent", "createMonitoringEvent", "updateMonitoringEvent", "deleteMonitoringEvent"),
    ("maintenance-windows", "MaintenanceWindow", "EntMaintenanceWindowService", "listMaintenanceWindows", "getMaintenanceWindow", "createMaintenanceWindow", "updateMaintenanceWindow", "deleteMaintenanceWindow"),
    ("release-notes", "ReleaseNote", "EntReleaseNoteService", "listReleaseNotes", "getReleaseNote", "createReleaseNote", "updateReleaseNote", "deleteReleaseNote"),
    ("system-health", "SystemHealth", "EntSystemHealthService", "listSystemHealth", "getSystemHealth", "createSystemHealth", "updateSystemHealth", "deleteSystemHealth"),
    ("quotas", "Quota", "EntQuotaService", "listQuotas", "getQuota", "createQuota", "updateQuota", "deleteQuota"),
    ("dashboards", "Dashboard", "EntDashboardService", "listDashboards", "getDashboard", "createDashboard", "updateDashboard", "deleteDashboard"),
    ("webhooks", "Webhook", "EntWebhookService", "listWebhooks", "getWebhook", "createWebhook", "updateWebhook", "deleteWebhook"),
    ("global-administrations", "GlobalAdministration", "EntGlobalAdministrationService", "listGlobalAdministrations", "getGlobalAdministration", "createGlobalAdministration", "updateGlobalAdministration", "deleteGlobalAdministration"),
    ("reports", "Report", "EntReportService", "listReports", "getReport", "createReport", "updateReport", "deleteReport"),
    ("exports", "Export", "EntExportService", "listExports", "getExport", "createExport", "updateExport", "deleteExport"),
    ("imports", "Import", "EntImportService", "listImports", "getImport", "createImport", "updateImport", "deleteImport"),
    ("search-indexes", "SearchIndex", "EntSearchIndexService", "listSearchIndexes", "getSearchIndex", "createSearchIndex", "updateSearchIndex", "deleteSearchIndex"),
    ("sync-jobs", "SyncJob", "EntSyncJobService", "listSyncJobs", "getSyncJob", "createSyncJob", "updateSyncJob", "deleteSyncJob"),
    ("cache-configs", "CacheConfig", "EntCacheConfigService", "listCacheConfigs", "getCacheConfig", "createCacheConfig", "updateCacheConfig", "deleteCacheConfig"),
    ("validation-rules", "ValidationRule", "EntValidationRuleService", "listValidationRules", "getValidationRule", "createValidationRule", "updateValidationRule", "deleteValidationRule"),
    ("timeline-events", "TimelineEvent", "EntTimelineEventService", "listTimelineEvents", "getTimelineEvent", "createTimelineEvent", "updateTimelineEvent", "deleteTimelineEvent"),
    ("statistics", "Statistic", "EntStatisticService", "listStatistics", "getStatistic", "createStatistic", "updateStatistic", "deleteStatistic"),
    ("alerts", "Alert", "EntAlertService", "listAlerts", "getAlert", "createAlert", "updateAlert", "deleteAlert"),
    ("coupons", "Coupon", "EntCouponService", "listCoupons", "getCoupon", "createCoupon", "updateCoupon", "deleteCoupon"),
    ("branding", "Branding", "EntBrandingService", "listBranding", "getBranding", "createBranding", "updateBranding", "deleteBranding"),
    ("email-settings", "EmailSetting", "EntEmailSettingService", "listEmailSettings", "getEmailSetting", "createEmailSetting", "updateEmailSetting", "deleteEmailSetting"),
    ("payment-settings", "PaymentSetting", "EntPaymentSettingService", "listPaymentSettings", "getPaymentSetting", "createPaymentSetting", "updatePaymentSetting", "deletePaymentSetting"),
    ("security-settings", "SecuritySetting", "EntSecuritySettingService", "listSecuritySettings", "getSecuritySetting", "createSecuritySetting", "updateSecuritySetting", "deleteSecuritySetting"),
    # Integration & API (20)
    ("sms-settings", "SmsSetting", "EntSmsSettingService", "listSmsSettings", "getSmsSetting", "createSmsSetting", "updateSmsSetting", "deleteSmsSetting"),
    ("integrations", "Integration", "EntIntegrationService", "listIntegrations", "getIntegration", "createIntegration", "updateIntegration", "deleteIntegration"),
    ("api-keys", "ApiKey", "EntApiKeyService", "listApiKeys", "getApiKey", "createApiKey", "updateApiKey", "deleteApiKey"),
    ("rate-limits", "RateLimit", "EntRateLimitService", "listRateLimits", "getRateLimit", "createRateLimit", "updateRateLimit", "deleteRateLimit"),
    ("ip-whitelists", "IpWhitelist", "EntIpWhitelistService", "listIpWhitelists", "getIpWhitelist", "createIpWhitelist", "updateIpWhitelist", "deleteIpWhitelist"),
    ("ssl-certificates", "SslCertificate", "EntSslCertificateService", "listSslCertificates", "getSslCertificate", "createSslCertificate", "updateSslCertificate", "deleteSslCertificate"),
    ("domains", "Domain", "EntDomainService", "listDomains", "getDomain", "createDomain", "updateDomain", "deleteDomain"),
    ("dns-records", "DnsRecord", "EntDnsRecordService", "listDnsRecords", "getDnsRecord", "createDnsRecord", "updateDnsRecord", "deleteDnsRecord"),
    ("cdn-rules", "CdnRule", "EntCdnRuleService", "listCdnRules", "getCdnRule", "createCdnRule", "updateCdnRule", "deleteCdnRule"),
    ("proxy-configs", "ProxyConfig", "EntProxyConfigService", "listProxyConfigs", "getProxyConfig", "createProxyConfig", "updateProxyConfig", "deleteProxyConfig"),
    ("load-balancers", "LoadBalancer", "EntLoadBalancerService", "listLoadBalancers", "getLoadBalancer", "createLoadBalancer", "updateLoadBalancer", "deleteLoadBalancer"),
    ("auto-scaling", "AutoScaling", "EntAutoScalingService", "listAutoScaling", "getAutoScaling", "createAutoScaling", "updateAutoScaling", "deleteAutoScaling"),
    ("service-meshes", "ServiceMesh", "EntServiceMeshService", "listServiceMeshes", "getServiceMesh", "createServiceMesh", "updateServiceMesh", "deleteServiceMesh"),
    ("message-queues", "MessageQueue", "EntMessageQueueService", "listMessageQueues", "getMessageQueue", "createMessageQueue", "updateMessageQueue", "deleteMessageQueue"),
    ("event-buses", "EventBus", "EntEventBusService", "listEventBuses", "getEventBus", "createEventBus", "updateEventBus", "deleteEventBus"),
    ("stream-processors", "StreamProcessor", "EntStreamProcessorService", "listStreamProcessors", "getStreamProcessor", "createStreamProcessor", "updateStreamProcessor", "deleteStreamProcessor"),
    ("job-schedulers", "JobScheduler", "EntJobSchedulerService", "listJobSchedulers", "getJobScheduler", "createJobScheduler", "updateJobScheduler", "deleteJobScheduler"),
    ("task-queues", "TaskQueue", "EntTaskQueueService", "listTaskQueues", "getTaskQueue", "createTaskQueue", "updateTaskQueue", "deleteTaskQueue"),
    ("worker-pools", "WorkerPool", "EntWorkerPoolService", "listWorkerPools", "getWorkerPool", "createWorkerPool", "updateWorkerPool", "deleteWorkerPool"),
    ("data-pipelines", "DataPipeline", "EntDataPipelineService", "listDataPipelines", "getDataPipeline", "createDataPipeline", "updateDataPipeline", "deleteDataPipeline"),
    # Infrastructure (20)
    ("etl-jobs", "EtlJob", "EntEtlJobService", "listEtlJobs", "getEtlJob", "createEtlJob", "updateEtlJob", "deleteEtlJob"),
    ("data-lakes", "DataLake", "EntDataLakeService", "listDataLakes", "getDataLake", "createDataLake", "updateDataLake", "deleteDataLake"),
    ("data-warehouses", "DataWarehouse", "EntDataWarehouseService", "listDataWarehouses", "getDataWarehouse", "createDataWarehouse", "updateDataWarehouse", "deleteDataWarehouse"),
    ("data-marts", "DataMart", "EntDataMartService", "listDataMarts", "getDataMart", "createDataMart", "updateDataMart", "deleteDataMart"),
    ("olap-cubes", "OlapCube", "EntOlapCubeService", "listOlapCubes", "getOlapCube", "createOlapCube", "updateOlapCube", "deleteOlapCube"),
    ("bi-dashboards", "BiDashboard", "EntBiDashboardService", "listBiDashboards", "getBiDashboard", "createBiDashboard", "updateBiDashboard", "deleteBiDashboard"),
    ("report-schedules", "ReportSchedule", "EntReportScheduleService", "listReportSchedules", "getReportSchedule", "createReportSchedule", "updateReportSchedule", "deleteReportSchedule"),
    ("data-exports", "DataExport", "EntDataExportService", "listDataExports", "getDataExport", "createDataExport", "updateDataExport", "deleteDataExport"),
    ("data-imports", "DataImport", "EntDataImportService", "listDataImports", "getDataImport", "createDataImport", "updateDataImport", "deleteDataImports"),
    ("data-transforms", "DataTransform", "EntDataTransformService", "listDataTransforms", "getDataTransform", "createDataTransform", "updateDataTransform", "deleteDataTransform"),
    ("data-quality", "DataQuality", "EntDataQualityService", "listDataQuality", "getDataQuality", "createDataQuality", "updateDataQuality", "deleteDataQuality"),
    ("data-lineage", "DataLineage", "EntDataLineageService", "listDataLineage", "getDataLineage", "createDataLineage", "updateDataLineage", "deleteDataLineage"),
    ("data-catalog", "DataCatalog", "EntDataCatalogService", "listDataCatalog", "getDataCatalog", "createDataCatalog", "updateDataCatalog", "deleteDataCatalog"),
    ("data-governance", "DataGovernance", "EntDataGovernanceService", "listDataGovernance", "getDataGovernance", "createDataGovernance", "updateDataGovernance", "deleteDataGovernance"),
    ("data-stewardship", "DataStewardship", "EntDataStewardshipService", "listDataStewardship", "getDataStewardship", "createDataStewardship", "updateDataStewardship", "deleteDataStewardship"),
    ("data-catalogs", "DataCatalogEntry", "EntDataCatalogEntryService", "listDataCatalogEntries", "getDataCatalogEntry", "createDataCatalogEntry", "updateDataCatalogEntry", "deleteDataCatalogEntry"),
    ("metadata-stores", "MetadataStore", "EntMetadataStoreService", "listMetadataStores", "getMetadataStore", "createMetadataStore", "updateMetadataStore", "deleteMetadataStore"),
    ("schema-registries", "SchemaRegistry", "EntSchemaRegistryService", "listSchemaRegistries", "getSchemaRegistry", "createSchemaRegistry", "updateSchemaRegistry", "deleteSchemaRegistry"),
    ("data-contracts", "DataContract", "EntDataContractService", "listDataContracts", "getDataContract", "createDataContract", "updateDataContract", "deleteDataContract"),
    ("data-domains", "DataDomain", "EntDataDomainService", "listDataDomains", "getDataDomain", "createDataDomain", "updateDataDomain", "deleteDataDomain"),
    # Security & Compliance (20)
    ("compliance-frameworks", "ComplianceFramework", "EntComplianceFrameworkService", "listComplianceFrameworks", "getComplianceFramework", "createComplianceFramework", "updateComplianceFramework", "deleteComplianceFramework"),
    ("compliance-controls", "ComplianceControl", "EntComplianceControlService", "listComplianceControls", "getComplianceControl", "createComplianceControl", "updateComplianceControl", "deleteComplianceControl"),
    ("compliance-assessments", "ComplianceAssessment", "EntComplianceAssessmentService", "listComplianceAssessments", "getComplianceAssessment", "createComplianceAssessment", "updateComplianceAssessment", "deleteComplianceAssessment"),
    ("compliance-reports", "ComplianceReport", "EntComplianceReportService", "listComplianceReports", "getComplianceReport", "createComplianceReport", "updateComplianceReport", "deleteComplianceReport"),
    ("audit-trails", "AuditTrail", "EntAuditTrailService", "listAuditTrails", "getAuditTrail", "createAuditTrail", "updateAuditTrail", "deleteAuditTrail"),
    ("access-reviews", "AccessReview", "EntAccessReviewService", "listAccessReviews", "getAccessReview", "createAccessReview", "updateAccessReview", "deleteAccessReview"),
    ("privileged-access", "PrivilegedAccess", "EntPrivilegedAccessService", "listPrivilegedAccess", "getPrivilegedAccess", "createPrivilegedAccess", "updatePrivilegedAccess", "deletePrivilegedAccess"),
    ("session-recordings", "SessionRecording", "EntSessionRecordingService", "listSessionRecordings", "getSessionRecording", "createSessionRecording", "updateSessionRecording", "deleteSessionRecording"),
    ("data-classifications", "DataClassification", "EntDataClassificationService", "listDataClassifications", "getDataClassification", "createDataClassification", "updateDataClassification", "deleteDataClassification"),
    ("data-retention-policies", "DataRetentionPolicy", "EntDataRetentionPolicyService", "listDataRetentionPolicies", "getDataRetentionPolicy", "createDataRetentionPolicy", "updateDataRetentionPolicy", "deleteDataRetentionPolicy"),
    ("data-masking-rules", "DataMaskingRule", "EntDataMaskingRuleService", "listDataMaskingRules", "getDataMaskingRule", "createDataMaskingRule", "updateDataMaskingRule", "deleteDataMaskingRule"),
    ("data-anonymization", "DataAnonymization", "EntDataAnonymizationService", "listDataAnonymization", "getDataAnonymization", "createDataAnonymization", "updateDataAnonymization", "deleteDataAnonymization"),
    ("consent-records", "ConsentRecord", "EntConsentRecordService", "listConsentRecords", "getConsentRecord", "createConsentRecord", "updateConsentRecord", "deleteConsentRecord"),
    ("gdpr-requests", "GdprRequest", "EntGdprRequestService", "listGdprRequests", "getGdprRequest", "createGdprRequest", "updateGdprRequest", "deleteGdprRequest"),
    ("data-subjects", "DataSubject", "EntDataService", "listDataSubjects", "getDataSubject", "createDataSubject", "updateDataSubject", "deleteDataSubject"),
    ("processing-activities", "ProcessingActivity", "EntProcessingActivityService", "listProcessingActivities", "getProcessingActivity", "createProcessingActivity", "updateProcessingActivity", "deleteProcessingActivity"),
    ("privacy-impact-assessments", "PrivacyImpactAssessment", "EntPrivacyImpactAssessmentService", "listPrivacyImpactAssessments", "getPrivacyImpactAssessment", "createPrivacyImpactAssessment", "updatePrivacyImpactAssessment", "deletePrivacyImpactAssessment"),
    ("vendor-assessments", "VendorAssessment", "EntVendorAssessmentService", "listVendorAssessments", "getVendorAssessment", "createVendorAssessment", "updateVendorAssessment", "deleteVendorAssessment"),
    ("third-party-risk", "ThirdPartyRisk", "EntThirdPartyRiskService", "listThirdPartyRisks", "getThirdPartyRisk", "createThirdPartyRisk", "updateThirdPartyRisk", "deleteThirdPartyRisk"),
    ("security-incidents", "SecurityIncident", "EntSecurityIncidentService", "listSecurityIncidents", "getSecurityIncident", "createSecurityIncident", "updateSecurityIncident", "deleteSecurityIncident"),
    # DevOps & Infrastructure (20)
    ("containers", "Container", "EntContainerService", "listContainers", "getContainer", "createContainer", "updateContainer", "deleteContainer"),
    ("deployments", "Deployment", "EntDeploymentService", "listDeployments", "getDeployment", "createDeployment", "updateDeployment", "deleteDeployment"),
    ("config-maps", "ConfigMap", "EntConfigMapService", "listConfigMaps", "getConfigMap", "createConfigMap", "updateConfigMap", "deleteConfigMap"),
    ("secrets", "Secret", "EntSecretService", "listSecrets", "getSecret", "createSecret", "updateSecret", "deleteSecret"),
    ("volumes", "Volume", "EntVolumeService", "listVolumes", "getVolume", "createVolume", "updateVolume", "deleteVolume"),
    ("networks", "Network", "EntNetworkService", "listNetworks", "getNetwork", "createNetwork", "updateNetwork", "deleteNetwork"),
    ("firewalls", "Firewall", "EntFirewallService", "listFirewalls", "getFirewall", "createFirewall", "updateFirewall", "deleteFirewall"),
    ("security-groups", "SecurityGroup", "EntSecurityGroupService", "listSecurityGroups", "getSecurityGroup", "createSecurityGroup", "updateSecurityGroup", "deleteSecurityGroup"),
    ("intrusion-detections", "IntrusionDetection", "EntIntrusionDetectionService", "listIntrusionDetections", "getIntrusionDetection", "createIntrusionDetection", "updateIntrusionDetection", "deleteIntrusionDetection"),
    ("vulnerability-scans", "VulnerabilityScan", "EntVulnerabilityScanService", "listVulnerabilityScans", "getVulnerabilityScan", "createVulnerabilityScan", "updateVulnerabilityScan", "deleteVulnerabilityScan"),
    ("backup-jobs", "BackupJob", "EntBackupJobService", "listBackupJobs", "getBackupJob", "createBackupJob", "updateBackupJob", "deleteBackupJob"),
    ("restore-jobs", "RestoreJob", "EntRestoreJobService", "listRestoreJobs", "getRestoreJob", "createRestoreJob", "updateRestoreJob", "deleteRestoreJob"),
    ("snapshots", "Snapshot", "EntSnapshotService", "listSnapshots", "getSnapshot", "createSnapshot", "updateSnapshot", "deleteSnapshot"),
    ("replicas", "Replica", "EntReplicaService", "listReplicas", "getReplica", "createReplica", "updateReplica", "deleteReplica"),
    ("clusters", "Cluster", "EntClusterService", "listClusters", "getCluster", "createCluster", "updateCluster", "deleteCluster"),
    ("nodes", "Node", "EntNodeService", "listNodes", "getNode", "createNode", "updateNode", "deleteNode"),
    ("pods", "Pod", "EntPodService", "listPods", "getPod", "createPod", "updatePod", "deletePod"),
    ("services-infra", "ServiceInfra", "EntServiceInfraService", "listServicesInfra", "getServiceInfra", "createServiceInfra", "updateServiceInfra", "deleteServiceInfra"),
    ("ingress-rules", "IngressRule", "EntIngressRuleService", "listIngressRules", "getIngressRule", "createIngressRule", "updateIngressRule", "deleteIngressRule"),
    ("cert-manager", "CertManager", "EntCertManagerService", "listCertManagers", "getCertManager", "createCertManager", "updateCertManager", "deleteCertManager"),
    # Monitoring & Observability (20)
    ("metrics", "Metric", "EntMetricService", "listMetrics", "getMetric", "createMetric", "updateMetric", "deleteMetric"),
    ("logs", "Log", "EntLogService", "listLogs", "getLog", "createLog", "updateLog", "deleteLog"),
    ("traces", "Trace", "EntTraceService", "listTraces", "getTrace", "createTrace", "updateTrace", "deleteTrace"),
    ("profiling-sessions", "ProfilingSession", "EntProfilingSessionService", "listProfilingSessions", "getProfilingSession", "createProfilingSession", "updateProfilingSession", "deleteProfilingSession"),
    ("debug-sessions", "DebugSession", "EntDebugSessionService", "listDebugSessions", "getDebugSession", "createDebugSession", "updateDebugSession", "deleteDebugSession"),
    ("alert-rules", "AlertRule", "EntAlertRuleService", "listAlertRules", "getAlertRule", "createAlertRule", "updateAlertRule", "deleteAlertRule"),
    ("notification-channels", "NotificationChannel", "EntNotificationChannelService", "listNotificationChannels", "getNotificationChannel", "createNotificationChannel", "updateNotificationChannel", "deleteNotificationChannel"),
    ("escalation-policies", "EscalationPolicy", "EntEscalationPolicyService", "listEscalationPolicies", "getEscalationPolicy", "createEscalationPolicy", "updateEscalationPolicy", "deleteEscalationPolicy"),
    ("on-call-schedules", "OnCallSchedule", "EntOnCallScheduleService", "listOnCallSchedules", "getOnCallSchedule", "createOnCallSchedule", "updateOnCallSchedule", "deleteOnCallSchedule"),
    ("incident-timelines", "IncidentTimeline", "EntIncidentTimelineService", "listIncidentTimelines", "getIncidentTimeline", "createIncidentTimeline", "updateIncidentTimeline", "deleteIncidentTimeline"),
    ("runbooks", "Runbook", "EntRunbookService", "listRunbooks", "getRunbook", "createRunbook", "updateRunbook", "deleteRunbook"),
    ("playbooks", "Playbook", "EntPlaybookService", "listPlaybooks", "getPlaybook", "createPlaybook", "updatePlaybook", "deletePlaybook"),
    ("post-mortems", "PostMortem", "EntPostMortemService", "listPostMortems", "getPostMortem", "createPostMortem", "updatePostMortem", "deletePostMortem"),
    ("status-pages", "StatusPage", "EntStatusPageService", "listStatusPages", "getStatusPage", "createStatusPage", "updateStatusPage", "deleteStatusPage"),
    ("uptime-monitors", "UptimeMonitor", "EntUptimeMonitorService", "listUptimeMonitors", "getUptimeMonitor", "createUptimeMonitor", "updateUptimeMonitor", "deleteUptimeMonitor"),
    ("synthetics", "Synthetic", "EntSyntheticService", "listSynthetics", "getSynthetic", "createSynthetic", "updateSynthetic", "deleteSynthetic"),
    ("error-tracking", "ErrorTracking", "EntErrorTrackingService", "listErrorTracking", "getErrorTracking", "createErrorTracking", "updateErrorTracking", "deleteErrorTracking"),
    ("performance-budgets", "PerformanceBudget", "EntPerformanceBudgetService", "listPerformanceBudgets", "getPerformanceBudget", "createPerformanceBudget", "updatePerformanceBudget", "deletePerformanceBudget"),
    ("capacity-plans", "CapacityPlan", "EntCapacityPlanService", "listCapacityPlans", "getCapacityPlan", "createCapacityPlan", "updateCapacityPlan", "deleteCapacityPlan"),
    ("sla-tracking", "SlaTracking", "EntSlaTrackingService", "listSlaTracking", "getSlaTracking", "createSlaTracking", "updateSlaTracking", "deleteSlaTracking"),
    # Business Operations (20)
    ("procurement", "Procurement", "EntProcurementService", "listProcurement", "getProcurement", "createProcurement", "updateProcurement", "deleteProcurement"),
    ("purchase-orders", "PurchaseOrder", "EntPurchaseOrderService", "listPurchaseOrders", "getPurchaseOrder", "createPurchaseOrder", "updatePurchaseOrder", "deletePurchaseOrder"),
    ("invoices", "Invoice", "EntInvoiceService", "listInvoices", "getInvoice", "createInvoice", "updateInvoice", "deleteInvoice"),
    ("payments", "Payment", "EntPaymentService", "listPayments", "getPayment", "createPayment", "updatePayment", "deletePayment"),
    ("refunds", "Refund", "EntRefundService", "listRefunds", "getRefund", "createRefund", "updateRefund", "deleteRefund"),
    ("credits", "Credit", "EntCreditService", "listCredits", "getCredit", "createCredit", "updateCredit", "deleteCredit"),
    ("discounts", "Discount", "EntDiscountService", "listDiscounts", "getDiscount", "createDiscount", "updateDiscount", "deleteDiscount"),
    ("promotions", "Promotion", "EntPromotionService", "listPromotions", "getPromotion", "createPromotion", "updatePromotion", "deletePromotion"),
    ("loyalty-programs", "LoyaltyProgram", "EntLoyaltyProgramService", "listLoyaltyPrograms", "getLoyaltyProgram", "createLoyaltyProgram", "updateLoyaltyProgram", "deleteLoyaltyProgram"),
    ("rewards", "Reward", "EntRewardService", "listRewards", "getReward", "createReward", "updateReward", "deleteReward"),
    ("referrals", "Referral", "EntReferralService", "listReferrals", "getReferral", "createReferral", "updateReferral", "deleteReferral"),
    ("affiliate-programs", "AffiliateProgram", "EntAffiliateProgramService", "listAffiliatePrograms", "getAffiliateProgram", "createAffiliateProgram", "updateAffiliateProgram", "deleteAffiliateProgram"),
    ("commission-structures", "CommissionStructure", "EntCommissionStructureService", "listCommissionStructures", "getCommissionStructure", "createCommissionStructure", "updateCommissionStructure", "deleteCommissionStructure"),
    ("partner-portals", "PartnerPortal", "EntPartnerPortalService", "listPartnerPortals", "getPartnerPortal", "createPartnerPortal", "updatePartnerPortal", "deletePartnerPortal"),
    ("marketplace-listings", "MarketplaceListing", "EntMarketplaceListingService", "listMarketplaceListings", "getMarketplaceListing", "createMarketplaceListing", "updateMarketplaceListing", "deleteMarketplaceListing"),
    ("app-store", "AppStore", "EntAppStoreService", "listAppStore", "getAppStore", "createAppStore", "updateAppStore", "deleteAppStore"),
    ("developer-portal", "DeveloperPortal", "EntDeveloperPortalService", "listDeveloperPortal", "getDeveloperPortal", "createDeveloperPortal", "updateDeveloperPortal", "deleteDeveloperPortal"),
    ("sdk-versions", "SdkVersion", "EntSdkVersionService", "listSdkVersions", "getSdkVersion", "createSdkVersion", "updateSdkVersion", "deleteSdkVersion"),
    ("api-documentation", "ApiDocumentation", "EntApiDocumentationService", "listApiDocumentation", "getApiDocumentation", "createApiDocumentation", "updateApiDocumentation", "deleteApiDocumentation"),
    ("changelogs", "Changelog", "EntChangelogService", "listChangelogs", "getChangelog", "createChangelog", "updateChangelog", "deleteChangelog"),
    # Learning & Development (20)
    ("training-courses", "TrainingCourse", "EntTrainingCourseService", "listTrainingCourses", "getTrainingCourse", "createTrainingCourse", "updateTrainingCourse", "deleteTrainingCourse"),
    ("learning-paths", "LearningPath", "EntLearningPathService", "listLearningPaths", "getLearningPath", "createLearningPath", "updateLearningPath", "deleteLearningPath"),
    ("skill-assessments", "SkillAssessment", "EntSkillAssessmentService", "listSkillAssessments", "getSkillAssessment", "createSkillAssessment", "updateSkillAssessment", "deleteSkillAssessment"),
    ("performance-reviews", "PerformanceReview", "EntPerformanceReviewService", "listPerformanceReviews", "getPerformanceReview", "createPerformanceReview", "updatePerformanceReview", "deletePerformanceReview"),
    ("goal-tracking", "GoalTracking", "EntGoalTrackingService", "listGoalTracking", "getGoalTracking", "createGoalTracking", "updateGoalTracking", "deleteGoalTracking"),
    ("okrs", "Okr", "EntOkrService", "listOkrs", "getOkr", "createOkr", "updateOkr", "deleteOkr"),
    ("kpis", "Kpi", "EntKpiService", "listKpis", "getKpi", "createKpi", "updateKpi", "deleteKpi"),
    ("benchmarks", "Benchmark", "EntBenchmarkService", "listBenchmarks", "getBenchmark", "createBenchmark", "updateBenchmark", "deleteBenchmark"),
    ("best-practices", "BestPractice", "EntBestPracticeService", "listBestPractices", "getBestPractice", "createBestPractice", "updateBestPractice", "deleteBestPractice"),
    ("guidelines", "Guideline", "EntGuidelineService", "listGuidelines", "getGuideline", "createGuideline", "updateGuideline", "deleteGuideline"),
    ("standards", "Standard", "EntStandardService", "listStandards", "getStandard", "createStandard", "updateStandard", "deleteStandard"),
    ("policies", "Policy", "EntPolicyService", "listPolicies", "getPolicy", "createPolicy", "updatePolicy", "deletePolicy"),
    ("procedures", "Procedure", "EntProcedureService", "listProcedures", "getProcedure", "createProcedure", "updateProcedure", "deleteProcedure"),
    ("workbooks", "Workbook", "EntWorkbookService", "listWorkbooks", "getWorkbook", "createWorkbook", "updateWorkbook", "deleteWorkbook"),
    ("templates", "Template", "EntTemplateService", "listTemplates", "getTemplate", "createTemplate", "updateTemplate", "deleteTemplate"),
    ("forms", "Form", "EntFormService", "listForms", "getForm", "createForm", "updateForm", "deleteForm"),
    ("surveys", "Survey", "EntSurveyService", "listSurveys", "getSurvey", "createSurvey", "updateSurvey", "deleteSurvey"),
    ("questionnaires", "Questionnaire", "EntQuestionnaireService", "listQuestionnaires", "getQuestionnaire", "createQuestionnaire", "updateQuestionnaire", "deleteQuestionnaire"),
    ("feedback-forms", "FeedbackForm", "EntFeedbackFormService", "listFeedbackForms", "getFeedbackForm", "createFeedbackForm", "updateFeedbackForm", "deleteFeedbackForm"),
    ("nps-surveys", "NpsSurvey", "EntNpsSurveyService", "listNpsSurveys", "getNpsSurvey", "createNpsSurvey", "updateNpsSurvey", "deleteNpsSurvey"),
    # Customer Experience (20)
    ("customer-journeys", "CustomerJourney", "EntCustomerJourneyService", "listCustomerJourneys", "getCustomerJourney", "createCustomerJourney", "updateCustomerJourney", "deleteCustomerJourney"),
    ("touchpoints", "Touchpoint", "EntTouchpointService", "listTouchpoints", "getTouchpoint", "createTouchpoint", "updateTouchpoint", "deleteTouchpoint"),
    ("moments-of-truth", "MomentOfTruth", "EntMomentOfTruthService", "listMomentsOfTruth", "getMomentOfTruth", "createMomentOfTruth", "updateMomentOfTruth", "deleteMomentOfTruth"),
    ("pain-points", "PainPoint", "EntPainPointService", "listPainPoints", "getPainPoint", "createPainPoint", "updatePainPoint", "deletePainPoint"),
    ("improvements", "Improvement", "EntImprovementService", "listImprovements", "getImprovement", "createImprovement", "updateImprovement", "deleteImprovement"),
    ("innovations", "Innovation", "EntInnovationService", "listInnovations", "getInnovation", "createInnovation", "updateInnovation", "deleteInnovation"),
    ("experiments", "Experiment", "EntExperimentService", "listExperiments", "getExperiment", "createExperiment", "updateExperiment", "deleteExperiment"),
    ("hypotheses", "Hypothesis", "EntHypothesisService", "listHypotheses", "getHypothesis", "createHypothesis", "updateHypothesis", "deleteHypothesis"),
    ("a-b-tests", "ABTest", "EntABTestService", "listABTests", "getABTest", "createABTest", "updateABTest", "deleteABTest"),
    ("usability-tests", "UsabilityTest", "EntUsabilityTestService", "listUsabilityTests", "getUsabilityTest", "createUsabilityTest", "updateUsabilityTest", "deleteUsabilityTest"),
    ("user-research", "UserResearch", "EntUserResearchService", "listUserResearch", "getUserResearch", "createUserResearch", "updateUserResearch", "deleteUserResearch"),
    ("personas", "Persona", "EntPersonaService", "listPersonas", "getPersona", "createPersona", "updatePersona", "deletePersona"),
    ("user-stories", "UserStory", "EntUserStoryService", "listUserStories", "getUserStory", "createUserStory", "updateUserStory", "deleteUserStory"),
    ("feature-requests", "FeatureRequest", "EntFeatureRequestService", "listFeatureRequests", "getFeatureRequest", "createFeatureRequest", "updateFeatureRequest", "deleteFeatureRequest"),
    ("roadmap-items", "RoadmapItem", "EntRoadmapItemService", "listRoadmapItems", "getRoadmapItem", "createRoadmapItem", "updateRoadmapItem", "deleteRoadmapItem"),
    ("sprint-boards", "SprintBoard", "EntSprintBoardService", "listSprintBoards", "getSprintBoard", "createSprintBoard", "updateSprintBoard", "deleteSprintBoard"),
    ("retrospectives", "Retrospective", "EntRetrospectiveService", "listRetrospectives", "getRetrospective", "createRetrospective", "updateRetrospective", "deleteRetrospective"),
    ("standups", "Standup", "EntStandupService", "listStandups", "getStandup", "createStandup", "updateStandup", "deleteStandup"),
    ("daily-reports", "DailyReport", "EntDailyReportService", "listDailyReports", "getDailyReport", "createDailyReport", "updateDailyReport", "deleteDailyReport"),
    ("weekly-reports", "WeeklyReport", "EntWeeklyReportService", "listWeeklyReports", "getWeeklyReport", "createWeeklyReport", "updateWeeklyReport", "deleteWeeklyReport"),
]

# Domain-specific routes (additional sub-routes for entities)
DOMAIN_ROUTES = [
    # Schools sub-routes
    ("schools", "users", "SchoolUser", "EntSchoolUserService", "listSchoolUsers", "getSchoolUser", "createSchoolUser", "updateSchoolUser", "deleteSchoolUser"),
    ("schools", "courses", "SchoolCourse", "EntSchoolCourseService", "listSchoolCourses", "getSchoolCourse", "createSchoolCourse", "updateSchoolCourse", "deleteSchoolCourse"),
    ("schools", "departments", "SchoolDepartment", "EntSchoolDepartmentService", "listSchoolDepartments", "getSchoolDepartment", "createSchoolDepartment", "updateSchoolDepartment", "deleteSchoolDepartment"),
    ("schools", "buildings", "SchoolBuilding", "EntSchoolBuildingService", "listSchoolBuildings", "getSchoolBuilding", "createSchoolBuilding", "updateSchoolBuilding", "deleteSchoolBuilding"),
    ("schools", "classrooms", "SchoolClassroom", "EntSchoolClassroomService", "listSchoolClassrooms", "getSchoolClassroom", "createSchoolClassroom", "updateSchoolClassroom", "deleteSchoolClassroom"),
    ("schools", "schedules", "SchoolSchedule", "EntSchoolScheduleService", "listSchoolSchedules", "getSchoolSchedule", "createSchoolSchedule", "updateSchoolSchedule", "deleteSchoolSchedule"),
    ("schools", "grades", "SchoolGrade", "EntSchoolGradeService", "listSchoolGrades", "getSchoolGrade", "createSchoolGrade", "updateSchoolGrade", "deleteSchoolGrade"),
    ("schools", "attendance", "SchoolAttendance", "EntSchoolAttendanceService", "listSchoolAttendance", "getSchoolAttendance", "createSchoolAttendance", "updateSchoolAttendance", "deleteSchoolAttendance"),
    # Users sub-routes
    ("users", "roles", "UserRole", "EntUserRoleService", "listUserRoles", "getUserRole", "createUserRole", "updateUserRole", "deleteUserRole"),
    ("users", "permissions", "UserPermission", "EntUserPermissionService", "listUserPermissions", "getUserPermission", "createUserPermission", "updateUserPermission", "deleteUserPermission"),
    ("users", "mfa", "UserMfa", "EntUserMfaService", "listUserMfa", "getUserMfa", "createUserMfa", "updateUserMfa", "deleteUserMfa"),
    ("users", "api-keys", "UserApiKey", "EntUserApiKeyService", "listUserApiKeys", "getUserApiKey", "createUserApiKey", "updateUserApiKey", "deleteUserApiKey"),
    # Subscriptions sub-routes
    ("subscriptions", "invoices", "SubscriptionInvoice", "EntSubscriptionInvoiceService", "listSubscriptionInvoices", "getSubscriptionInvoice", "createSubscriptionInvoice", "updateSubscriptionInvoice", "deleteSubscriptionInvoice"),
    ("subscriptions", "usage", "SubscriptionUsage", "EntSubscriptionUsageService", "listSubscriptionUsage", "getSubscriptionUsage", "createSubscriptionUsage", "updateSubscriptionUsage", "deleteSubscriptionUsage"),
    ("subscriptions", "limits", "SubscriptionLimit", "EntSubscriptionLimitService", "listSubscriptionLimits", "getSubscriptionLimit", "createSubscriptionLimit", "updateSubscriptionLimit", "deleteSubscriptionLimit"),
    # Tickets sub-routes
    ("tickets", "comments", "TicketComment", "EntTicketCommentService", "listTicketComments", "getTicketComment", "createTicketComment", "updateTicketComment", "deleteTicketComment"),
    ("tickets", "attachments", "TicketAttachment", "EntTicketAttachmentService", "listTicketAttachments", "getTicketAttachment", "createTicketAttachment", "updateTicketAttachment", "deleteTicketAttachment"),
    ("tickets", "assignments", "TicketAssignment", "EntTicketAssignmentService", "listTicketAssignments", "getTicketAssignment", "createTicketAssignment", "updateTicketAssignment", "deleteTicketAssignment"),
    # Feature Flags sub-routes
    ("feature-flags", "environments", "FeatureFlagEnvironment", "EntFeatureFlagEnvironmentService", "listFeatureFlagEnvironments", "getFeatureFlagEnvironment", "createFeatureFlagEnvironment", "updateFeatureFlagEnvironment", "deleteFeatureFlagEnvironment"),
    ("feature-flags", "targeting", "FeatureFlagTargeting", "EntFeatureFlagTargetingService", "listFeatureFlagTargeting", "getFeatureFlagTargeting", "createFeatureFlagTargeting", "updateFeatureFlagTargeting", "deleteFeatureFlagTargeting"),
    ("feature-flags", "metrics", "FeatureFlagMetric", "EntFeatureFlagMetricService", "listFeatureFlagMetrics", "getFeatureFlagMetric", "createFeatureFlagMetric", "updateFeatureFlagMetric", "deleteFeatureFlagMetric"),
    # Audit sub-routes
    ("audit-logs", "exports", "AuditLogExport", "EntAuditLogExportService", "listAuditLogExports", "getAuditLogExport", "createAuditLogExport", "updateAuditLogExport", "deleteAuditLogExport"),
    ("audit-logs", "alerts", "AuditLogAlert", "EntAuditLogAlertService", "listAuditLogAlerts", "getAuditLogAlert", "createAuditLogAlert", "updateAuditLogAlert", "deleteAuditLogAlert"),
    # Notifications sub-routes
    ("notifications", "preferences", "NotificationPreference", "EntNotificationPreferenceService", "listNotificationPreferences", "getNotificationPreference", "createNotificationPreference", "updateNotificationPreference", "deleteNotificationPreference"),
    ("notifications", "templates", "NotificationTemplate", "EntNotificationTemplateService", "listNotificationTemplates", "getNotificationTemplate", "createNotificationTemplate", "updateNotificationTemplate", "deleteNotificationTemplate"),
    # Settings sub-routes
    ("settings", "general", "GeneralSetting", "EntGeneralSettingService", "listGeneralSettings", "getGeneralSetting", "createGeneralSetting", "updateGeneralSetting", "deleteGeneralSetting"),
    ("settings", "advanced", "AdvancedSetting", "EntAdvancedSettingService", "listAdvancedSettings", "getAdvancedSetting", "createAdvancedSetting", "updateAdvancedSetting", "deleteAdvancedSetting"),
    # Webhooks sub-routes
    ("webhooks", "logs", "WebhookLog", "EntWebhookLogService", "listWebhookLogs", "getWebhookLog", "createWebhookLog", "updateWebhookLog", "deleteWebhookLog"),
    ("webhooks", "deliveries", "WebhookDelivery", "EntWebhookDeliveryService", "listWebhookDeliveries", "getWebhookDelivery", "createWebhookDelivery", "updateWebhookDelivery", "deleteWebhookDelivery"),
    # Integrations sub-routes
    ("integrations", "configs", "IntegrationConfig", "EntIntegrationConfigService", "listIntegrationConfigs", "getIntegrationConfig", "createIntegrationConfig", "updateIntegrationConfig", "deleteIntegrationConfig"),
    ("integrations", "mappings", "IntegrationMapping", "EntIntegrationMappingService", "listIntegrationMappings", "getIntegrationMapping", "createIntegrationMapping", "updateIntegrationMapping", "deleteIntegrationMapping"),
    # Monitoring sub-routes
    ("monitoring-events", "acknowledgments", "MonitoringAcknowledgment", "EntMonitoringAcknowledgmentService", "listMonitoringAcknowledgments", "getMonitoringAcknowledgment", "createMonitoringAcknowledgment", "updateMonitoringAcknowledgment", "deleteMonitoringAcknowledgment"),
    ("monitoring-events", "resolutions", "MonitoringResolution", "EntMonitoringResolutionService", "listMonitoringResolutions", "getMonitoringResolution", "createMonitoringResolution", "updateMonitoringResolution", "deleteMonitoringResolution"),
    # Deployments sub-routes
    ("deployments", "rollbacks", "DeploymentRollback", "EntDeploymentRollbackService", "listDeploymentRollbacks", "getDeploymentRollback", "createDeploymentRollback", "updateDeploymentRollback", "deleteDeploymentRollback"),
    ("deployments", "approvals", "DeploymentApproval", "EntDeploymentApprovalService", "listDeploymentApprovals", "getDeploymentApproval", "createDeploymentApproval", "updateDeploymentApproval", "deleteDeploymentApproval"),
    # Clusters sub-routes
    ("clusters", "nodes", "ClusterNode", "EntClusterNodeService", "listClusterNodes", "getClusterNode", "createClusterNode", "updateClusterNode", "deleteClusterNode"),
    ("clusters", "services", "ClusterService", "EntClusterServiceService", "listClusterServices", "getClusterService", "createClusterService", "updateClusterService", "deleteClusterService"),
    # Containers sub-routes
    ("containers", "logs", "ContainerLog", "EntContainerLogService", "listContainerLogs", "getContainerLog", "createContainerLog", "updateContainerLog", "deleteContainerLog"),
    ("containers", "metrics", "ContainerMetric", "EntContainerMetricService", "listContainerMetrics", "getContainerMetric", "createContainerMetric", "updateContainerMetric", "deleteContainerMetric"),
    # Invoices sub-routes
    ("invoices", "line-items", "InvoiceLineItem", "EntInvoiceLineItemService", "listInvoiceLineItems", "getInvoiceLineItem", "createInvoiceLineItem", "updateInvoiceLineItem", "deleteInvoiceLineItem"),
    ("invoices", "payments", "InvoicePayment", "EntInvoicePaymentService", "listInvoicePayments", "getInvoicePayment", "createInvoicePayment", "updateInvoicePayment", "deleteInvoicePayment"),
    # Payments sub-routes
    ("payments", "refunds", "PaymentRefund", "EntPaymentRefundService", "listPaymentRefunds", "getPaymentRefund", "createPaymentRefund", "updatePaymentRefund", "deletePaymentRefund"),
    ("payments", "methods", "PaymentMethod", "EntPaymentMethodService", "listPaymentMethods", "getPaymentMethod", "createPaymentMethod", "updatePaymentMethod", "deletePaymentMethod"),
    # Training sub-routes
    ("training-courses", "modules", "TrainingModule", "EntTrainingModuleService", "listTrainingModules", "getTrainingModule", "createTrainingModule", "updateTrainingModule", "deleteTrainingModule"),
    ("training-courses", "enrollments", "TrainingEnrollment", "EntTrainingEnrollmentService", "listTrainingEnrollments", "getTrainingEnrollment", "createTrainingEnrollment", "updateTrainingEnrollment", "deleteTrainingEnrollment"),
    # Learning Paths sub-routes
    ("learning-paths", "steps", "LearningPathStep", "EntLearningPathStepService", "listLearningPathSteps", "getLearningPathStep", "createLearningPathStep", "updateLearningPathStep", "deleteLearningPathStep"),
    ("learning-paths", "progress", "LearningPathProgress", "EntLearningPathProgressService", "listLearningPathProgress", "getLearningPathProgress", "createLearningPathProgress", "updateLearningPathProgress", "deleteLearningPathProgress"),
    # Surveys sub-routes
    ("surveys", "responses", "SurveyResponse", "EntSurveyResponseService", "listSurveyResponses", "getSurveyResponse", "createSurveyResponse", "updateSurveyResponse", "deleteSurveyResponse"),
    ("surveys", "questions", "SurveyQuestion", "EntSurveyQuestionService", "listSurveyQuestions", "getSurveyQuestion", "createSurveyQuestion", "updateSurveyQuestion", "deleteSurveyQuestion"),
    # Experiments sub-routes
    ("experiments", "variants", "ExperimentVariant", "EntExperimentVariantService", "listExperimentVariants", "getExperimentVariant", "createExperimentVariant", "updateExperimentVariant", "deleteExperimentVariant"),
    ("experiments", "results", "ExperimentResult", "EntExperimentResultService", "listExperimentResults", "getExperimentResult", "createExperimentResult", "updateExperimentResult", "deleteExperimentResult"),
    # Compliance sub-routes
    ("compliance-frameworks", "controls", "FrameworkControl", "EntFrameworkControlService", "listFrameworkControls", "getFrameworkControl", "createFrameworkControl", "updateFrameworkControl", "deleteFrameworkControl"),
    ("compliance-assessments", "findings", "AssessmentFinding", "EntAssessmentFindingService", "listAssessmentFindings", "getAssessmentFinding", "createAssessmentFinding", "updateAssessmentFinding", "deleteAssessmentFinding"),
    # Security sub-routes
    ("security-incidents", "responses", "IncidentResponse", "EntIncidentResponseService", "listIncidentResponses", "getIncidentResponse", "createIncidentResponse", "updateIncidentResponse", "deleteIncidentResponse"),
    ("security-incidents", "evidence", "IncidentEvidence", "EntIncidentEvidenceService", "listIncidentEvidence", "getIncidentEvidence", "createIncidentEvidence", "updateIncidentEvidence", "deleteIncidentEvidence"),
    # Data Pipelines sub-routes
    ("data-pipelines", "stages", "PipelineStage", "EntPipelineStageService", "listPipelineStages", "getPipelineStage", "createPipelineStage", "updatePipelineStage", "deletePipelineStage"),
    ("data-pipelines", "runs", "PipelineRun", "EntPipelineRunService", "listPipelineRuns", "getPipelineRun", "createPipelineRun", "updatePipelineRun", "deletePipelineRun"),
    # Backup sub-routes
    ("backup-jobs", "schedules", "BackupSchedule", "EntBackupScheduleService", "listBackupSchedules", "getBackupSchedule", "createBackupSchedule", "updateBackupSchedule", "deleteBackupSchedule"),
    ("backup-jobs", "restores", "BackupRestore", "EntBackupRestoreService", "listBackupRestores", "getBackupRestore", "createBackupRestore", "updateBackupRestore", "deleteBackupRestore"),
    # Reporting sub-routes
    ("reports", "scheduled", "ScheduledReport", "EntScheduledReportService", "listScheduledReports", "getScheduledReport", "createScheduledReport", "updateScheduledReport", "deleteScheduledReport"),
    ("reports", "widgets", "ReportWidget", "EntReportWidgetService", "listReportWidgets", "getReportWidget", "createReportWidget", "updateReportWidget", "deleteReportWidget"),
    # Dashboards sub-routes
    ("dashboards", "widgets", "DashboardWidget", "EntDashboardWidgetService", "listDashboardWidgets", "getDashboardWidget", "createDashboardWidget", "updateDashboardWidget", "deleteDashboardWidget"),
    ("dashboards", "filters", "DashboardFilter", "EntDashboardFilterService", "listDashboardFilters", "getDashboardFilter", "createDashboardFilter", "updateDashboardFilter", "deleteDashboardFilter"),
    # Analytics sub-routes
    ("analytics-snapshots", "dimensions", "AnalyticsDimension", "EntAnalyticsDimensionService", "listAnalyticsDimensions", "getAnalyticsDimension", "createAnalyticsDimension", "updateAnalyticsDimension", "deleteAnalyticsDimension"),
    ("analytics-snapshots", "measures", "AnalyticsMeasure", "EntAnalyticsMeasureService", "listAnalyticsMeasures", "getAnalyticsMeasure", "createAnalyticsMeasure", "updateAnalyticsMeasure", "deleteAnalyticsMeasure"),
    # Logs sub-routes
    ("logs", "streams", "LogStream", "EntLogStreamService", "listLogStreams", "getLogStream", "createLogStream", "updateLogStream", "deleteLogStream"),
    ("logs", "parsers", "LogParser", "EntLogParserService", "listLogParsers", "getLogParser", "createLogParser", "updateLogParser", "deleteLogParser"),
    # Metrics sub-routes
    ("metrics", "dashboards", "MetricsDashboard", "EntMetricsDashboardService", "listMetricsDashboards", "getMetricsDashboard", "createMetricsDashboard", "updateMetricsDashboard", "deleteMetricsDashboard"),
    ("metrics", "alerts", "MetricsAlert", "EntMetricsAlertService", "listMetricsAlerts", "getMetricsAlert", "createMetricsAlert", "updateMetricsAlert", "deleteMetricsAlert"),
    # Containers sub-routes (additional)
    ("containers", "env-vars", "ContainerEnvVar", "EntContainerEnvVarService", "listContainerEnvVars", "getContainerEnvVar", "createContainerEnvVar", "updateContainerEnvVar", "deleteContainerEnvVar"),
    ("containers", "resource-limits", "ContainerResourceLimit", "EntContainerResourceLimitService", "listContainerResourceLimits", "getContainerResourceLimit", "createContainerResourceLimit", "updateContainerResourceLimit", "deleteContainerResourceLimit"),
    # Networks sub-routes
    ("networks", "policies", "NetworkPolicy", "EntNetworkPolicyService", "listNetworkPolicies", "getNetworkPolicy", "createNetworkPolicy", "updateNetworkPolicy", "deleteNetworkPolicy"),
    ("networks", "routes", "NetworkRoute", "EntNetworkRouteService", "listNetworkRoutes", "getNetworkRoute", "createNetworkRoute", "updateNetworkRoute", "deleteNetworkRoute"),
    # Volumes sub-routes
    ("volumes", "snapshots", "VolumeSnapshot", "EntVolumeSnapshotService", "listVolumeSnapshots", "getVolumeSnapshot", "createVolumeSnapshot", "updateVolumeSnapshot", "deleteVolumeSnapshot"),
    ("volumes", "backups", "VolumeBackup", "EntVolumeBackupService", "listVolumeBackups", "getVolumeBackup", "createVolumeBackup", "updateVolumeBackup", "deleteVolumeBackup"),
    # Secrets sub-routes
    ("secrets", "versions", "SecretVersion", "EntSecretVersionService", "listSecretVersions", "getSecretVersion", "createSecretVersion", "updateSecretVersion", "deleteSecretVersion"),
    ("secrets", "access", "SecretAccess", "EntSecretAccessService", "listSecretAccess", "getSecretAccess", "createSecretAccess", "updateSecretAccess", "deleteSecretAccess"),
    # SSL Certificates sub-routes
    ("ssl-certificates", "renewals", "CertificateRenewal", "EntCertificateRenewalService", "listCertificateRenewals", "getCertificateRenewal", "createCertificateRenewal", "updateCertificateRenewal", "deleteCertificateRenewal"),
    # Domains sub-routes
    ("domains", "verifications", "DomainVerification", "EntDomainVerificationService", "listDomainVerifications", "getDomainVerification", "createDomainVerification", "updateDomainVerification", "deleteDomainVerification"),
    # Load Balancers sub-routes
    ("load-balancers", "backends", "LoadBalancerBackend", "EntLoadBalancerBackendService", "listLoadBalancerBackends", "getLoadBalancerBackend", "createLoadBalancerBackend", "updateLoadBalancerBackend", "deleteLoadBalancerBackend"),
    ("load-balancers", "health-checks", "LoadBalancerHealthCheck", "EntLoadBalancerHealthCheckService", "listLoadBalancerHealthChecks", "getLoadBalancerHealthCheck", "createLoadBalancerHealthCheck", "updateLoadBalancerHealthCheck", "deleteLoadBalancerHealthCheck"),
    # Auto Scaling sub-routes
    ("auto-scaling", "policies", "AutoScalingPolicy", "EntAutoScalingPolicyService", "listAutoScalingPolicies", "getAutoScalingPolicy", "createAutoScalingPolicy", "updateAutoScalingPolicy", "deleteAutoScalingPolicy"),
    ("auto-scaling", "triggers", "AutoScalingTrigger", "EntAutoScalingTriggerService", "listAutoScalingTriggers", "getAutoScalingTrigger", "createAutoScalingTrigger", "updateAutoScalingTrigger", "deleteAutoScalingTrigger"),
    # Job Schedulers sub-routes
    ("job-schedulers", "jobs", "ScheduledJob", "EntScheduledJobService", "listScheduledJobs", "getScheduledJob", "createScheduledJob", "updateScheduledJob", "deleteScheduledJob"),
    ("job-schedulers", "executions", "JobExecution", "EntJobExecutionService", "listJobExecutions", "getJobExecution", "createJobExecution", "updateJobExecution", "deleteJobExecution"),
    # Data Quality sub-routes
    ("data-quality", "rules", "QualityRule", "EntQualityRuleService", "listQualityRules", "getQualityRule", "createQualityRule", "updateQualityRule", "deleteQualityRule"),
    ("data-quality", "issues", "QualityIssue", "EntQualityIssueService", "listQualityIssues", "getQualityIssue", "createQualityIssue", "updateQualityIssue", "deleteQualityIssue"),
    # Data Governance sub-routes
    ("data-governance", "policies", "GovernancePolicy", "EntGovernancePolicyService", "listGovernancePolicies", "getGovernancePolicy", "createGovernancePolicy", "updateGovernancePolicy", "deleteGovernancePolicy"),
    ("data-governance", "stewards", "DataSteward", "EntDataStewardService", "listDataStewards", "getDataSteward", "createDataSteward", "updateDataSteward", "deleteDataSteward"),
    # Vendor Assessment sub-routes
    ("vendor-assessments", "questionnaires", "VendorQuestionnaire", "EntVendorQuestionnaireService", "listVendorQuestionnaires", "getVendorQuestionnaire", "createVendorQuestionnaire", "updateVendorQuestionnaire", "deleteVendorQuestionnaire"),
    ("vendor-assessments", "scores", "VendorScore", "EntVendorScoreService", "listVendorScores", "getVendorScore", "createVendorScore", "updateVendorScore", "deleteVendorScore"),
    # Partner Portal sub-routes
    ("partner-portals", "applications", "PartnerApplication", "EntPartnerApplicationService", "listPartnerApplications", "getPartnerApplication", "createPartnerApplication", "updatePartnerApplication", "deletePartnerApplication"),
    ("partner-portals", "listings", "PartnerListing", "EntPartnerListingService", "listPartnerListings", "getPartnerListing", "createPartnerListing", "updatePartnerListing", "deletePartnerListing"),
    # App Store sub-routes
    ("app-store", "reviews", "AppReview", "EntAppReviewService", "listAppReviews", "getAppReview", "createAppReview", "updateAppReview", "deleteAppReview"),
    ("app-store", "versions", "AppVersion", "EntAppVersionService", "listAppVersions", "getAppVersion", "createAppVersion", "updateAppVersion", "deleteAppVersion"),
    # Developer Portal sub-routes
    ("developer-portal", "apps", "DeveloperApp", "EntDeveloperAppService", "listDeveloperApps", "getDeveloperApp", "createDeveloperApp", "updateDeveloperApp", "deleteDeveloperApp"),
    ("developer-portal", "sandbox", "DeveloperSandbox", "EntDeveloperSandboxService", "listDeveloperSandboxes", "getDeveloperSandbox", "createDeveloperSandbox", "updateDeveloperSandbox", "deleteDeveloperSandbox"),
    # Procurement sub-routes
    ("procurement", "items", "ProcurementItem", "EntProcurementItemService", "listProcurementItems", "getProcurementItem", "createProcurementItem", "updateProcurementItem", "deleteProcurementItem"),
    ("procurement", "approvals", "ProcurementApproval", "EntProcurementApprovalService", "listProcurementApprovals", "getProcurementApproval", "createProcurementApproval", "updateProcurementApproval", "deleteProcurementApproval"),
    # Loyalty sub-routes
    ("loyalty-programs", "tiers", "LoyaltyTier", "EntLoyaltyTierService", "listLoyaltyTiers", "getLoyaltyTier", "createLoyaltyTier", "updateLoyaltyTier", "deleteLoyaltyTier"),
    ("loyalty-programs", "transactions", "LoyaltyTransaction", "EntLoyaltyTransactionService", "listLoyaltyTransactions", "getLoyaltyTransaction", "createLoyaltyTransaction", "updateLoyaltyTransaction", "deleteLoyaltyTransaction"),
    # Referral sub-routes
    ("referrals", "rewards", "ReferralReward", "EntReferralRewardService", "listReferralRewards", "getReferralReward", "createReferralReward", "updateReferralReward", "deleteReferralReward"),
    # Affiliate sub-routes
    ("affiliate-programs", "commissions", "AffiliateCommission", "EntAffiliateCommissionService", "listAffiliateCommissions", "getAffiliateCommission", "createAffiliateCommission", "updateAffiliateCommission", "deleteAffiliateCommission"),
    ("affiliate-programs", "payouts", "AffiliatePayout", "EntAffiliatePayoutService", "listAffiliatePayouts", "getAffiliatePayout", "createAffiliatePayout", "updateAffiliatePayout", "deleteAffiliatePayout"),
    # Marketplace sub-routes
    ("marketplace-listings", "categories", "MarketplaceCategory", "EntMarketplaceCategoryService", "listMarketplaceCategories", "getMarketplaceCategory", "createMarketplaceCategory", "updateMarketplaceCategory", "deleteMarketplaceCategory"),
    ("marketplace-listings", "analytics", "MarketplaceAnalytics", "EntMarketplaceAnalyticsService", "listMarketplaceAnalytics", "getMarketplaceAnalytics", "createMarketplaceAnalytics", "updateMarketplaceAnalytics", "deleteMarketplaceAnalytics"),
    # Changelog sub-routes
    ("changelogs", "entries", "ChangelogEntry", "EntChangelogEntryService", "listChangelogEntries", "getChangelogEntry", "createChangelogEntry", "updateChangelogEntry", "deleteChangelogEntry"),
    # Status Page sub-routes
    ("status-pages", "components", "StatusPageComponent", "EntStatusPageComponentService", "listStatusPageComponents", "getStatusPageComponent", "createStatusPageComponent", "updateStatusPageComponent", "deleteStatusPageComponent"),
    ("status-pages", "incidents", "StatusPageIncident", "EntStatusPageIncidentService", "listStatusPageIncidents", "getStatusPageIncident", "createStatusPageIncident", "updateStatusPageIncident", "deleteStatusPageIncident"),
    # Incident Management sub-routes
    ("incident-timelines", "notes", "IncidentNote", "EntIncidentNoteService", "listIncidentNotes", "getIncidentNote", "createIncidentNote", "updateIncidentNote", "deleteIncidentNote"),
    ("incident-timelines", "actions", "IncidentAction", "EntIncidentActionService", "listIncidentActions", "getIncidentAction", "createIncidentAction", "updateIncidentAction", "deleteIncidentAction"),
    # Runbooks sub-routes
    ("runbooks", "steps", "RunbookStep", "EntRunbookStepService", "listRunbookSteps", "getRunbookStep", "createRunbookStep", "updateRunbookStep", "deleteRunbookStep"),
    ("runbooks", "executions", "RunbookExecution", "EntRunbookExecutionService", "listRunbookExecutions", "getRunbookExecution", "createRunbookExecution", "updateRunbookExecution", "deleteRunbookExecution"),
    # Playbooks sub-routes
    ("playbooks", "triggers", "PlaybookTrigger", "EntPlaybookTriggerService", "listPlaybookTriggers", "getPlaybookTrigger", "createPlaybookTrigger", "updatePlaybookTrigger", "deletePlaybookTrigger"),
    ("playbooks", "actions", "PlaybookAction", "EntPlaybookActionService", "listPlaybookActions", "getPlaybookAction", "createPlaybookAction", "updatePlaybookAction", "deletePlaybookAction"),
    # Post Mortem sub-routes
    ("post-mortems", "action-items", "PostMortemActionItem", "EntPostMortemActionItemService", "listPostMortemActionItems", "getPostMortemActionItem", "createPostMortemActionItem", "updatePostMortemActionItem", "deletePostMortemActionItem"),
    # Uptime Monitor sub-routes
    ("uptime-monitors", "checks", "UptimeCheck", "EntUptimeCheckService", "listUptimeChecks", "getUptimeCheck", "createUptimeCheck", "updateUptimeCheck", "deleteUptimeCheck"),
    ("uptime-monitors", "incidents", "UptimeIncident", "EntUptimeIncidentService", "listUptimeIncidents", "getUptimeIncident", "createUptimeIncident", "updateUptimeIncident", "deleteUptimeIncident"),
    # Error Tracking sub-routes
    ("error-tracking", "occurrences", "ErrorOccurrence", "EntErrorOccurrenceService", "listErrorOccurrences", "getErrorOccurrence", "createErrorOccurrence", "updateErrorOccurrence", "deleteErrorOccurrence"),
    ("error-tracking", "assignments", "ErrorAssignment", "EntErrorAssignmentService", "listErrorAssignments", "getErrorAssignment", "createErrorAssignment", "updateErrorAssignment", "deleteErrorAssignment"),
    # Performance Budget sub-routes
    ("performance-budgets", "violations", "BudgetViolation", "EntBudgetViolationService", "listBudgetViolations", "getBudgetViolation", "createBudgetViolation", "updateBudgetViolation", "deleteBudgetViolation"),
    # SLA Tracking sub-routes
    ("sla-tracking", "breaches", "SlaBreach", "EntSlaBreachService", "listSlaBreaches", "getSlaBreach", "createSlaBreach", "updateSlaBreach", "deleteSlaBreach"),
    ("sla-tracking", "reports", "SlaReport", "EntSlaReportService", "listSlaReports", "getSlaReport", "createSlaReport", "updateSlaReport", "deleteSlaReport"),
    # Capacity Planning sub-routes
    ("capacity-plans", "forecasts", "CapacityForecast", "EntCapacityForecastService", "listCapacityForecasts", "getCapacityForecast", "createCapacityForecast", "updateCapacityForecast", "deleteCapacityForecast"),
    ("capacity-plans", "recommendations", "CapacityRecommendation", "EntCapacityRecommendationService", "listCapacityRecommendations", "getCapacityRecommendation", "createCapacityRecommendation", "updateCapacityRecommendation", "deleteCapacityRecommendation"),
    # OKR sub-routes
    ("okrs", "key-results", "KeyResult", "EntKeyResultService", "listKeyResults", "getKeyResult", "createKeyResult", "updateKeyResult", "deleteKeyResult"),
    # KPI sub-routes
    ("kpis", "targets", "KpiTarget", "EntKpiTargetService", "listKpiTargets", "getKpiTarget", "createKpiTarget", "updateKpiTarget", "deleteKpiTarget"),
    ("kpis", "actuals", "KpiActual", "EntKpiActualService", "listKpiActuals", "getKpiActual", "createKpiActual", "updateKpiActual", "deleteKpiActual"),
    # Benchmark sub-routes
    ("benchmarks", "comparisons", "BenchmarkComparison", "EntBenchmarkComparisonService", "listBenchmarkComparisons", "getBenchmarkComparison", "createBenchmarkComparison", "updateBenchmarkComparison", "deleteBenchmarkComparison"),
    # Policy sub-routes
    ("policies", "versions", "PolicyVersion", "EntPolicyVersionService", "listPolicyVersions", "getPolicyVersion", "createPolicyVersion", "updatePolicyVersion", "deletePolicyVersion"),
    ("policies", "acknowledgments", "PolicyAcknowledgment", "EntPolicyAcknowledgmentService", "listPolicyAcknowledgments", "getPolicyAcknowledgment", "createPolicyAcknowledgment", "updatePolicyAcknowledgment", "deletePolicyAcknowledgment"),
    # Template sub-routes
    ("templates", "versions", "TemplateVersion", "EntTemplateVersionService", "listTemplateVersions", "getTemplateVersion", "createTemplateVersion", "updateTemplateVersion", "deleteTemplateVersion"),
    ("templates", "usage", "TemplateUsage", "EntTemplateUsageService", "listTemplateUsages", "getTemplateUsage", "createTemplateUsage", "updateTemplateUsage", "deleteTemplateUsage"),
    # Form sub-routes
    ("forms", "submissions", "FormSubmission", "EntFormSubmissionService", "listFormSubmissions", "getFormSubmission", "createFormSubmission", "updateFormSubmission", "deleteFormSubmission"),
    ("forms", "fields", "FormField", "EntFormFieldService", "listFormFields", "getFormField", "createFormField", "updateFormField", "deleteFormField"),
    # Questionnaire sub-routes
    ("questionnaires", "responses", "QuestionnaireResponse", "EntQuestionnaireResponseService", "listQuestionnaireResponses", "getQuestionnaireResponse", "createQuestionnaireResponse", "updateQuestionnaireResponse", "deleteQuestionnaireResponse"),
    # NPS Survey sub-routes
    ("nps-surveys", "responses", "NpsResponse", "EntNpsResponseService", "listNpsResponses", "getNpsResponse", "createNpsResponse", "updateNpsResponse", "deleteNpsResponse"),
    # Customer Journey sub-routes
    ("customer-journeys", "stages", "JourneyStage", "EntJourneyStageService", "listJourneyStages", "getJourneyStage", "createJourneyStage", "updateJourneyStage", "deleteJourneyStage"),
    ("customer-journeys", "metrics", "JourneyMetric", "EntJourneyMetricService", "listJourneyMetrics", "getJourneyMetric", "createJourneyMetric", "updateJourneyMetric", "deleteJourneyMetric"),
    # User Research sub-routes
    ("user-research", "sessions", "ResearchSession", "EntResearchSessionService", "listResearchSessions", "getResearchSession", "createResearchSession", "updateResearchSession", "deleteResearchSession"),
    ("user-research", "findings", "ResearchFinding", "EntResearchFindingService", "listResearchFindings", "getResearchFinding", "createResearchFinding", "updateResearchFinding", "deleteResearchFinding"),
    # Persona sub-routes
    ("personas", "traits", "PersonaTrait", "EntPersonaTraitService", "listPersonaTraits", "getPersonaTrait", "createPersonaTrait", "updatePersonaTrait", "deletePersonaTrait"),
    # User Story sub-routes
    ("user-stories", "acceptance-criteria", "AcceptanceCriterion", "EntAcceptanceCriterionService", "listAcceptanceCriteria", "getAcceptanceCriterion", "createAcceptanceCriterion", "updateAcceptanceCriterion", "deleteAcceptanceCriterion"),
    # Feature Request sub-routes
    ("feature-requests", "votes", "FeatureVote", "EntFeatureVoteService", "listFeatureVotes", "getFeatureVote", "createFeatureVote", "updateFeatureVote", "deleteFeatureVote"),
    ("feature-requests", "comments", "FeatureComment", "EntFeatureCommentService", "listFeatureComments", "getFeatureComment", "createFeatureComment", "updateFeatureComment", "deleteFeatureComment"),
    # Roadmap sub-routes
    ("roadmap-items", "dependencies", "RoadmapDependency", "EntRoadmapDependencyService", "listRoadmapDependencies", "getRoadmapDependency", "createRoadmapDependency", "updateRoadmapDependency", "deleteRoadmapDependency"),
    ("roadmap-items", "milestones", "RoadmapMilestone", "EntRoadmapMilestoneService", "listRoadmapMilestones", "getRoadmapMilestone", "createRoadmapMilestone", "updateRoadmapMilestone", "deleteRoadmapMilestone"),
    # Sprint Board sub-routes
    ("sprint-boards", "cards", "SprintCard", "EntSprintCardService", "listSprintCards", "getSprintCard", "createSprintCard", "updateSprintCard", "deleteSprintCard"),
    ("sprint-boards", "columns", "SprintColumn", "EntSprintColumnService", "listSprintColumns", "getSprintColumn", "createSprintColumn", "updateSprintColumn", "deleteSprintColumn"),
    # Retrospective sub-routes
    ("retrospectives", "items", "RetroItem", "EntRetroItemService", "listRetroItems", "getRetroItem", "createRetroItem", "updateRetroItem", "deleteRetroItem"),
    # Standup sub-routes
    ("standups", "updates", "StandupUpdate", "EntStandupUpdateService", "listStandupUpdates", "getStandupUpdate", "createStandupUpdate", "updateStandupUpdate", "deleteStandupUpdate"),
    # Daily Report sub-routes
    ("daily-reports", "tasks", "DailyTask", "EntDailyTaskService", "listDailyTasks", "getDailyTask", "createDailyTask", "updateDailyTask", "deleteDailyTask"),
    # Weekly Report sub-routes
    ("weekly-reports", "summaries", "WeeklySummary", "EntWeeklySummaryService", "listWeeklySummaries", "getWeeklySummary", "createWeeklySummary", "updateWeeklySummary", "deleteWeeklySummary"),
]


def to_kebab(name: str) -> str:
    """Convert PascalCase or camelCase to kebab-case"""
    result = []
    for i, char in enumerate(name):
        if char.isupper() and i > 0:
            result.append('-')
        result.append(char.lower())
    return ''.join(result)


def generate_collection_route(entity_kebab: str, entity_pascal: str, service_class: str, list_method: str, create_method: str) -> str:
    return f'''import {{ NextRequest, NextResponse }} from 'next/server';
import {{ createClient }} from '@supabase/supabase-js';
import {{ {service_class} }} from '@/features/enterprise/services/ent-{entity_kebab}.service';

export async function GET(request: NextRequest) {{
  try {{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const {{ searchParams }} = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({{ error: 'schoolId required' }}, {{ status: 400 }});
    const service = new {service_class}(supabase);
    const data = await service.{list_method}(schoolId);
    return NextResponse.json({{ data }});
  }} catch (error) {{
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({{ error: message }}, {{ status: 500 }});
  }}
}}

export async function POST(request: NextRequest) {{
  try {{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const body = await request.json();
    const service = new {service_class}(supabase);
    const data = await service.{create_method}(body.schoolId, body);
    return NextResponse.json({{ data }}, {{ status: 201 }});
  }} catch (error) {{
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({{ error: message }}, {{ status: 500 }});
  }}
}}
'''


def generate_item_route(entity_kebab: str, entity_pascal: str, service_class: str, get_method: str, update_method: str, delete_method: str, param_name: str = 'id') -> str:
    return f'''import {{ NextRequest, NextResponse }} from 'next/server';
import {{ createClient }} from '@supabase/supabase-js';
import {{ {service_class} }} from '@/features/enterprise/services/ent-{entity_kebab}.service';

export async function GET(request: NextRequest, {{ params }}: {{ params: {{ {param_name}: string }} }}) {{
  try {{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const {{ searchParams }} = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({{ error: 'schoolId required' }}, {{ status: 400 }});
    const service = new {service_class}(supabase);
    const data = await service.{get_method}(schoolId, params.{param_name});
    return NextResponse.json({{ data }});
  }} catch (error) {{
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({{ error: message }}, {{ status: 500 }});
  }}
}}

export async function PUT(request: NextRequest, {{ params }}: {{ params: {{ {param_name}: string }} }}) {{
  try {{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const body = await request.json();
    const service = new {service_class}(supabase);
    const data = await service.{update_method}(body.schoolId, params.{param_name}, body);
    return NextResponse.json({{ data }});
  }} catch (error) {{
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({{ error: message }}, {{ status: 500 }});
  }}
}}

export async function DELETE(request: NextRequest, {{ params }}: {{ params: {{ {param_name}: string }} }}) {{
  try {{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const {{ searchParams }} = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    if (!schoolId) return NextResponse.json({{ error: 'schoolId required' }}, {{ status: 400 }});
    const service = new {service_class}(supabase);
    const data = await service.{delete_method}(schoolId, params.{param_name});
    return NextResponse.json({{ data }});
  }} catch (error) {{
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({{ error: message }}, {{ status: 500 }});
  }}
}}
'''


def generate_domain_collection_route(parent_kebab: str, child_kebab: str, entity_pascal: str, service_class: str, list_method: str, create_method: str) -> str:
    return f'''import {{ NextRequest, NextResponse }} from 'next/server';
import {{ createClient }} from '@supabase/supabase-js';
import {{ {service_class} }} from '@/features/enterprise/services/ent-{parent_kebab}-{child_kebab}.service';

export async function GET(request: NextRequest) {{
  try {{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const {{ searchParams }} = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({{ error: 'schoolId required' }}, {{ status: 400 }});
    if (!parentId) return NextResponse.json({{ error: 'parentId required' }}, {{ status: 400 }});
    const service = new {service_class}(supabase);
    const data = await service.{list_method}(schoolId, parentId);
    return NextResponse.json({{ data }});
  }} catch (error) {{
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({{ error: message }}, {{ status: 500 }});
  }}
}}

export async function POST(request: NextRequest) {{
  try {{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const body = await request.json();
    const service = new {service_class}(supabase);
    const data = await service.{create_method}(body.schoolId, body.parentId, body);
    return NextResponse.json({{ data }}, {{ status: 201 }});
  }} catch (error) {{
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({{ error: message }}, {{ status: 500 }});
  }}
}}
'''


def generate_domain_item_route(parent_kebab: str, child_kebab: str, entity_pascal: str, service_class: str, get_method: str, update_method: str, delete_method: str) -> str:
    return f'''import {{ NextRequest, NextResponse }} from 'next/server';
import {{ createClient }} from '@supabase/supabase-js';
import {{ {service_class} }} from '@/features/enterprise/services/ent-{parent_kebab}-{child_kebab}.service';

export async function GET(request: NextRequest, {{ params }}: {{ params: {{ id: string }} }}) {{
  try {{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const {{ searchParams }} = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({{ error: 'schoolId required' }}, {{ status: 400 }});
    if (!parentId) return NextResponse.json({{ error: 'parentId required' }}, {{ status: 400 }});
    const service = new {service_class}(supabase);
    const data = await service.{get_method}(schoolId, parentId, params.id);
    return NextResponse.json({{ data }});
  }} catch (error) {{
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({{ error: message }}, {{ status: 500 }});
  }}
}}

export async function PUT(request: NextRequest, {{ params }}: {{ params: {{ id: string }} }}) {{
  try {{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const body = await request.json();
    const service = new {service_class}(supabase);
    const data = await service.{update_method}(body.schoolId, body.parentId, params.id, body);
    return NextResponse.json({{ data }});
  }} catch (error) {{
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({{ error: message }}, {{ status: 500 }});
  }}
}}

export async function DELETE(request: NextRequest, {{ params }}: {{ params: {{ id: string }} }}) {{
  try {{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const {{ searchParams }} = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('parentId');
    if (!schoolId) return NextResponse.json({{ error: 'schoolId required' }}, {{ status: 400 }});
    if (!parentId) return NextResponse.json({{ error: 'parentId required' }}, {{ status: 400 }});
    const service = new {service_class}(supabase);
    const data = await service.{delete_method}(schoolId, parentId, params.id);
    return NextResponse.json({{ data }});
  }} catch (error) {{
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({{ error: message }}, {{ status: 500 }});
  }}
}}
'''


def main():
    file_count = 0

    # Generate core entity routes (180 entities x 2 files = 360 files)
    for entity in ENTITIES:
        kebab, pascal, service_class, list_m, get_m, create_m, update_m, delete_m = entity

        # Collection route
        collection_dir = os.path.join(BASE_PATH, kebab)
        os.makedirs(collection_dir, exist_ok=True)
        collection_path = os.path.join(collection_dir, 'route.ts')
        with open(collection_path, 'w', encoding='utf-8') as f:
            f.write(generate_collection_route(kebab, pascal, service_class, list_m, create_m))
        file_count += 1

        # Item route
        item_dir = os.path.join(collection_dir, '[id]')
        os.makedirs(item_dir, exist_ok=True)
        item_path = os.path.join(item_dir, 'route.ts')
        with open(item_path, 'w', encoding='utf-8') as f:
            f.write(generate_item_route(kebab, pascal, service_class, get_m, update_m, delete_m))
        file_count += 1

    # Generate domain-specific routes (170 domains x 2 files = 340 files)
    for domain in DOMAIN_ROUTES:
        parent_kebab, child_kebab, entity_pascal, service_class, list_m, get_m, create_m, update_m, delete_m = domain

        # Domain collection route
        domain_collection_dir = os.path.join(BASE_PATH, parent_kebab, child_kebab)
        os.makedirs(domain_collection_dir, exist_ok=True)
        domain_collection_path = os.path.join(domain_collection_dir, 'route.ts')
        with open(domain_collection_path, 'w', encoding='utf-8') as f:
            f.write(generate_domain_collection_route(parent_kebab, child_kebab, entity_pascal, service_class, list_m, create_m))
        file_count += 1

        # Domain item route
        domain_item_dir = os.path.join(domain_collection_dir, '[id]')
        os.makedirs(domain_item_dir, exist_ok=True)
        domain_item_path = os.path.join(domain_item_dir, 'route.ts')
        with open(domain_item_path, 'w', encoding='utf-8') as f:
            f.write(generate_domain_item_route(parent_kebab, child_kebab, entity_pascal, service_class, get_m, update_m, delete_m))
        file_count += 1

    print(f"Generated {file_count} route files")
    print(f"Core entities: {len(ENTITIES)}")
    print(f"Domain-specific routes: {len(DOMAIN_ROUTES)}")


if __name__ == '__main__':
    main()

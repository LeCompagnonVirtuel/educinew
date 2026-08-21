import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudAlertChannelError, EduCloudAlertingError, EduCloudAlertRuleError, EduCloudAnalyticsInsightError, EduCloudAnalyticsMetricsError, EduCloudAnalyticsTrendError, EduCloudAPIContractError, EduCloudAPIEndpointError, EduCloudAPIParameterError, EduCloudAPIResponseError, EduCloudAPISchemaError, EduCloudAPIVersionError, EduCloudAuditError, EduCloudAuthAuditError, EduCloudAuthCredentialsError, EduCloudAuthError, EduCloudAuthRefreshError, EduCloudAuthTokenError, EduCloudBulkheadError, EduCloudCacheError, EduCloudCircuitBreakerError, EduCloudComplianceError, EduCloudComplianceRequirementError, EduCloudConnectorAIError, EduCloudConnectorAIInsightError, EduCloudConnectorAIModelError, EduCloudConnectorAnalyticsError, EduCloudConnectorDashboardError, EduCloudConnectorError, EduCloudConnectorEventError, EduCloudConnectorExtensionError, EduCloudConnectorHealthError, EduCloudConnectorHistoryError, EduCloudConnectorMetricError, EduCloudConnectorMetricsError, EduCloudConnectorMiddlewareError, EduCloudConnectorPipelineError, EduCloudConnectorPluginError, EduCloudConnectorPresetError, EduCloudConnectorReportError, EduCloudConnectorRunError, EduCloudConnectorStageError, EduCloudConnectorStateError, EduCloudConnectorTemplateError, EduCloudDashboardLayoutError, EduCloudDashboardWidgetError, EduCloudDataContractError, EduCloudDataEnrichmentError, EduCloudDataMappingError, EduCloudDataQualityError, EduCloudDataQualityIssueError, EduCloudDataSchemaError, EduCloudDataSchemaFieldError, EduCloudDataSchemaRelationshipError, EduCloudDataTransformError, EduCloudDataValidationError, EduCloudEdFiConnectorError, EduCloudEMISConnectorError, EduCloudEncryptionError, EduCloudEnrichmentError, EduCloudEnrichmentProviderError, EduCloudEscalationPolicyError, EduCloudEscalationStepError, EduCloudEuropassConnectorError, EduCloudEuropassCredentialsError, EduCloudFailoverError, EduCloudFederationAuditError, EduCloudFederationError, EduCloudFederationMappingError, EduCloudFederationParticipantError, EduCloudFederationSyncError, EduCloudFieldMappingError, EduCloudHealthCheckDetailError, EduCloudIMSGlobalConnectorError, EduCloudInteropAuditError, EduCloudInteropComplianceError, EduCloudInteropHealthCheckError, EduCloudInteropSecurityError, EduCloudLDAPConnectorError, EduCloudLoggingError, EduCloudLTIConnectorError, EduCloudMappingError, EduCloudMonitoringError, EduCloudOAuth2ConnectorError, EduCloudOCDEConnectorError, EduCloudOneRosterConnectorError, EduCloudOpenBadgesConnectorError, EduCloudOpenIDConnectorError, EduCloudRateLimitError, EduCloudReportChartError, EduCloudReportDataError, EduCloudReportDetailError, EduCloudReportSummaryError, EduCloudRetryError, EduCloudSAMLConnectorError, EduCloudSchemaMappingError, EduCloudSchemaTransformError, EduCloudSchemaValidationError, EduCloudSchemaVersionError, EduCloudSCIMConnectorError, EduCloudSCORMConnectorError, EduCloudSecurityCertificateError, EduCloudSecurityError, EduCloudSecurityVulnerabilityError, EduCloudSyncError, EduCloudSyncErrorError, EduCloudSyncFilterError, EduCloudSyncJobError, EduCloudSyncLogError, EduCloudSyncMappingError, EduCloudSyncStatusError, EduCloudTimeoutError, EduCloudTracingError, EduCloudTransformationError, EduCloudUNESCOConnectorError, EduCloudUNICEFConnectorError, EduCloudValidationRuleError, EduCloudWebhookDeliveryError, EduCloudWebhookError, EduCloudWebhookEventError, EduCloudWebhookRetryError, EduCloudWidgetPositionError, EduCloudWidgetSizeError, EduCloudWorldBankConnectorError, EduCloudXAPIConnectorError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface SearchModuleRepository {

  // =============================================================================
  // INTEROPERABILITY-INTERNATIONAL
  // =============================================================================
  getUNESCOConnector(schoolId: string, id: string): Promise<any | null>;
  listUNESCOConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createUNESCOConnector(schoolId: string, data: any): Promise<any>;
  updateUNESCOConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteUNESCOConnector(schoolId: string, id: string): Promise<void>;

  getUNICEFConnector(schoolId: string, id: string): Promise<any | null>;
  listUNICEFConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createUNICEFConnector(schoolId: string, data: any): Promise<any>;
  updateUNICEFConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteUNICEFConnector(schoolId: string, id: string): Promise<void>;

  getOCDEConnector(schoolId: string, id: string): Promise<any | null>;
  listOCDEConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOCDEConnector(schoolId: string, data: any): Promise<any>;
  updateOCDEConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteOCDEConnector(schoolId: string, id: string): Promise<void>;

  getWorldBankConnector(schoolId: string, id: string): Promise<any | null>;
  listWorldBankConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWorldBankConnector(schoolId: string, data: any): Promise<any>;
  updateWorldBankConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteWorldBankConnector(schoolId: string, id: string): Promise<void>;

  getOpenBadgesConnector(schoolId: string, id: string): Promise<any | null>;
  listOpenBadgesConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOpenBadgesConnector(schoolId: string, data: any): Promise<any>;
  updateOpenBadgesConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteOpenBadgesConnector(schoolId: string, id: string): Promise<void>;

  getEuropassConnector(schoolId: string, id: string): Promise<any | null>;
  listEuropassConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEuropassConnector(schoolId: string, data: any): Promise<any>;
  updateEuropassConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteEuropassConnector(schoolId: string, id: string): Promise<void>;

  getSCORMConnector(schoolId: string, id: string): Promise<any | null>;
  listSCORMConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSCORMConnector(schoolId: string, data: any): Promise<any>;
  updateSCORMConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteSCORMConnector(schoolId: string, id: string): Promise<void>;

  getXAPIConnector(schoolId: string, id: string): Promise<any | null>;
  listXAPIConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createXAPIConnector(schoolId: string, data: any): Promise<any>;
  updateXAPIConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteXAPIConnector(schoolId: string, id: string): Promise<void>;

  getLTIConnector(schoolId: string, id: string): Promise<any | null>;
  listLTIConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLTIConnector(schoolId: string, data: any): Promise<any>;
  updateLTIConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteLTIConnector(schoolId: string, id: string): Promise<void>;

  getIMSGlobalConnector(schoolId: string, id: string): Promise<any | null>;
  listIMSGlobalConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createIMSGlobalConnector(schoolId: string, data: any): Promise<any>;
  updateIMSGlobalConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteIMSGlobalConnector(schoolId: string, id: string): Promise<void>;

  getEdFiConnector(schoolId: string, id: string): Promise<any | null>;
  listEdFiConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEdFiConnector(schoolId: string, data: any): Promise<any>;
  updateEdFiConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteEdFiConnector(schoolId: string, id: string): Promise<void>;

  getEMISConnector(schoolId: string, id: string): Promise<any | null>;
  listEMISConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEMISConnector(schoolId: string, data: any): Promise<any>;
  updateEMISConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteEMISConnector(schoolId: string, id: string): Promise<void>;

  getOneRosterConnector(schoolId: string, id: string): Promise<any | null>;
  listOneRosterConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOneRosterConnector(schoolId: string, data: any): Promise<any>;
  updateOneRosterConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteOneRosterConnector(schoolId: string, id: string): Promise<void>;

  getOpenIDConnector(schoolId: string, id: string): Promise<any | null>;
  listOpenIDConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOpenIDConnector(schoolId: string, data: any): Promise<any>;
  updateOpenIDConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteOpenIDConnector(schoolId: string, id: string): Promise<void>;

  getOAuth2Connector(schoolId: string, id: string): Promise<any | null>;
  listOAuth2Connector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOAuth2Connector(schoolId: string, data: any): Promise<any>;
  updateOAuth2Connector(schoolId: string, id: string, data: any): Promise<any>;
  deleteOAuth2Connector(schoolId: string, id: string): Promise<void>;

  getSAMLConnector(schoolId: string, id: string): Promise<any | null>;
  listSAMLConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSAMLConnector(schoolId: string, data: any): Promise<any>;
  updateSAMLConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteSAMLConnector(schoolId: string, id: string): Promise<void>;

  getLDAPConnector(schoolId: string, id: string): Promise<any | null>;
  listLDAPConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLDAPConnector(schoolId: string, data: any): Promise<any>;
  updateLDAPConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteLDAPConnector(schoolId: string, id: string): Promise<void>;

  getSCIMConnector(schoolId: string, id: string): Promise<any | null>;
  listSCIMConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSCIMConnector(schoolId: string, data: any): Promise<any>;
  updateSCIMConnector(schoolId: string, id: string, data: any): Promise<any>;
  deleteSCIMConnector(schoolId: string, id: string): Promise<void>;

  getConnectorConfig(schoolId: string, id: string): Promise<any | null>;
  listConnectorConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorConfig(schoolId: string, data: any): Promise<any>;
  updateConnectorConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorConfig(schoolId: string, id: string): Promise<void>;

  getConnectorState(schoolId: string, id: string): Promise<any | null>;
  listConnectorState(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorState(schoolId: string, data: any): Promise<any>;
  updateConnectorState(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorState(schoolId: string, id: string): Promise<void>;

  getConnectorHealth(schoolId: string, id: string): Promise<any | null>;
  listConnectorHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorHealth(schoolId: string, data: any): Promise<any>;
  updateConnectorHealth(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorHealth(schoolId: string, id: string): Promise<void>;

  getHealthCheckDetail(schoolId: string, id: string): Promise<any | null>;
  listHealthCheckDetail(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createHealthCheckDetail(schoolId: string, data: any): Promise<any>;
  updateHealthCheckDetail(schoolId: string, id: string, data: any): Promise<any>;
  deleteHealthCheckDetail(schoolId: string, id: string): Promise<void>;

  getConnectorMetrics(schoolId: string, id: string): Promise<any | null>;
  listConnectorMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorMetrics(schoolId: string, data: any): Promise<any>;
  updateConnectorMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorMetrics(schoolId: string, id: string): Promise<void>;

  getSyncJob(schoolId: string, id: string): Promise<any | null>;
  listSyncJob(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSyncJob(schoolId: string, data: any): Promise<any>;
  updateSyncJob(schoolId: string, id: string, data: any): Promise<any>;
  deleteSyncJob(schoolId: string, id: string): Promise<void>;

  getSyncError(schoolId: string, id: string): Promise<any | null>;
  listSyncError(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSyncError(schoolId: string, data: any): Promise<any>;
  updateSyncError(schoolId: string, id: string, data: any): Promise<any>;
  deleteSyncError(schoolId: string, id: string): Promise<void>;

  getSyncStatus(schoolId: string, id: string): Promise<any | null>;
  listSyncStatus(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSyncStatus(schoolId: string, data: any): Promise<any>;
  updateSyncStatus(schoolId: string, id: string, data: any): Promise<any>;
  deleteSyncStatus(schoolId: string, id: string): Promise<void>;

  getSyncLog(schoolId: string, id: string): Promise<any | null>;
  listSyncLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSyncLog(schoolId: string, data: any): Promise<any>;
  updateSyncLog(schoolId: string, id: string, data: any): Promise<any>;
  deleteSyncLog(schoolId: string, id: string): Promise<void>;

  getSyncMapping(schoolId: string, id: string): Promise<any | null>;
  listSyncMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSyncMapping(schoolId: string, data: any): Promise<any>;
  updateSyncMapping(schoolId: string, id: string, data: any): Promise<any>;
  deleteSyncMapping(schoolId: string, id: string): Promise<void>;

  getSyncConfig(schoolId: string, id: string): Promise<any | null>;
  listSyncConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSyncConfig(schoolId: string, data: any): Promise<any>;
  updateSyncConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteSyncConfig(schoolId: string, id: string): Promise<void>;

  getSyncFilter(schoolId: string, id: string): Promise<any | null>;
  listSyncFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSyncFilter(schoolId: string, data: any): Promise<any>;
  updateSyncFilter(schoolId: string, id: string, data: any): Promise<any>;
  deleteSyncFilter(schoolId: string, id: string): Promise<void>;

  getDataMapping(schoolId: string, id: string): Promise<any | null>;
  listDataMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataMapping(schoolId: string, data: any): Promise<any>;
  updateDataMapping(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataMapping(schoolId: string, id: string): Promise<void>;

  getDataTransform(schoolId: string, id: string): Promise<any | null>;
  listDataTransform(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataTransform(schoolId: string, data: any): Promise<any>;
  updateDataTransform(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataTransform(schoolId: string, id: string): Promise<void>;

  getDataValidation(schoolId: string, id: string): Promise<any | null>;
  listDataValidation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataValidation(schoolId: string, data: any): Promise<any>;
  updateDataValidation(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataValidation(schoolId: string, id: string): Promise<void>;

  getValidationRule(schoolId: string, id: string): Promise<any | null>;
  listValidationRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createValidationRule(schoolId: string, data: any): Promise<any>;
  updateValidationRule(schoolId: string, id: string, data: any): Promise<any>;
  deleteValidationRule(schoolId: string, id: string): Promise<void>;

  getDataEnrichment(schoolId: string, id: string): Promise<any | null>;
  listDataEnrichment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataEnrichment(schoolId: string, data: any): Promise<any>;
  updateDataEnrichment(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataEnrichment(schoolId: string, id: string): Promise<void>;

  getAuthConfig(schoolId: string, id: string): Promise<any | null>;
  listAuthConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAuthConfig(schoolId: string, data: any): Promise<any>;
  updateAuthConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteAuthConfig(schoolId: string, id: string): Promise<void>;

  getAuthCredentials(schoolId: string, id: string): Promise<any | null>;
  listAuthCredentials(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAuthCredentials(schoolId: string, data: any): Promise<any>;
  updateAuthCredentials(schoolId: string, id: string, data: any): Promise<any>;
  deleteAuthCredentials(schoolId: string, id: string): Promise<void>;

  getAuthToken(schoolId: string, id: string): Promise<any | null>;
  listAuthToken(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAuthToken(schoolId: string, data: any): Promise<any>;
  updateAuthToken(schoolId: string, id: string, data: any): Promise<any>;
  deleteAuthToken(schoolId: string, id: string): Promise<void>;

  getAuthAudit(schoolId: string, id: string): Promise<any | null>;
  listAuthAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAuthAudit(schoolId: string, data: any): Promise<any>;
  updateAuthAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteAuthAudit(schoolId: string, id: string): Promise<void>;

  getAuthRefresh(schoolId: string, id: string): Promise<any | null>;
  listAuthRefresh(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAuthRefresh(schoolId: string, data: any): Promise<any>;
  updateAuthRefresh(schoolId: string, id: string, data: any): Promise<any>;
  deleteAuthRefresh(schoolId: string, id: string): Promise<void>;

  getWebhookConfig(schoolId: string, id: string): Promise<any | null>;
  listWebhookConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWebhookConfig(schoolId: string, data: any): Promise<any>;
  updateWebhookConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteWebhookConfig(schoolId: string, id: string): Promise<void>;

  getWebhookEvent(schoolId: string, id: string): Promise<any | null>;
  listWebhookEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWebhookEvent(schoolId: string, data: any): Promise<any>;
  updateWebhookEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteWebhookEvent(schoolId: string, id: string): Promise<void>;

  getWebhookDelivery(schoolId: string, id: string): Promise<any | null>;
  listWebhookDelivery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWebhookDelivery(schoolId: string, data: any): Promise<any>;
  updateWebhookDelivery(schoolId: string, id: string, data: any): Promise<any>;
  deleteWebhookDelivery(schoolId: string, id: string): Promise<void>;

  getWebhookRetry(schoolId: string, id: string): Promise<any | null>;
  listWebhookRetry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWebhookRetry(schoolId: string, data: any): Promise<any>;
  updateWebhookRetry(schoolId: string, id: string, data: any): Promise<any>;
  deleteWebhookRetry(schoolId: string, id: string): Promise<void>;

  getSchemaMapping(schoolId: string, id: string): Promise<any | null>;
  listSchemaMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchemaMapping(schoolId: string, data: any): Promise<any>;
  updateSchemaMapping(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchemaMapping(schoolId: string, id: string): Promise<void>;

  getFieldMapping(schoolId: string, id: string): Promise<any | null>;
  listFieldMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFieldMapping(schoolId: string, data: any): Promise<any>;
  updateFieldMapping(schoolId: string, id: string, data: any): Promise<any>;
  deleteFieldMapping(schoolId: string, id: string): Promise<void>;

  getSchemaValidation(schoolId: string, id: string): Promise<any | null>;
  listSchemaValidation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchemaValidation(schoolId: string, data: any): Promise<any>;
  updateSchemaValidation(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchemaValidation(schoolId: string, id: string): Promise<void>;

  getSchemaTransform(schoolId: string, id: string): Promise<any | null>;
  listSchemaTransform(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchemaTransform(schoolId: string, data: any): Promise<any>;
  updateSchemaTransform(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchemaTransform(schoolId: string, id: string): Promise<void>;

  getSchemaVersionEntry(schoolId: string, id: string): Promise<any | null>;
  listSchemaVersionEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchemaVersionEntry(schoolId: string, data: any): Promise<any>;
  updateSchemaVersionEntry(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchemaVersionEntry(schoolId: string, id: string): Promise<void>;

  getConnectorPipeline(schoolId: string, id: string): Promise<any | null>;
  listConnectorPipeline(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorPipeline(schoolId: string, data: any): Promise<any>;
  updateConnectorPipeline(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorPipeline(schoolId: string, id: string): Promise<void>;

  getConnectorStage(schoolId: string, id: string): Promise<any | null>;
  listConnectorStage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorStage(schoolId: string, data: any): Promise<any>;
  updateConnectorStage(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorStage(schoolId: string, id: string): Promise<void>;

  getConnectorRun(schoolId: string, id: string): Promise<any | null>;
  listConnectorRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorRun(schoolId: string, data: any): Promise<any>;
  updateConnectorRun(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorRun(schoolId: string, id: string): Promise<void>;

  getConnectorMetric(schoolId: string, id: string): Promise<any | null>;
  listConnectorMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorMetric(schoolId: string, data: any): Promise<any>;
  updateConnectorMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorMetric(schoolId: string, id: string): Promise<void>;

  getInteropAudit(schoolId: string, id: string): Promise<any | null>;
  listInteropAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInteropAudit(schoolId: string, data: any): Promise<any>;
  updateInteropAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteInteropAudit(schoolId: string, id: string): Promise<void>;

  getInteropCompliance(schoolId: string, id: string): Promise<any | null>;
  listInteropCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInteropCompliance(schoolId: string, data: any): Promise<any>;
  updateInteropCompliance(schoolId: string, id: string, data: any): Promise<any>;
  deleteInteropCompliance(schoolId: string, id: string): Promise<void>;

  getComplianceRequirement(schoolId: string, id: string): Promise<any | null>;
  listComplianceRequirement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComplianceRequirement(schoolId: string, data: any): Promise<any>;
  updateComplianceRequirement(schoolId: string, id: string, data: any): Promise<any>;
  deleteComplianceRequirement(schoolId: string, id: string): Promise<void>;

  getInteropSecurity(schoolId: string, id: string): Promise<any | null>;
  listInteropSecurity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInteropSecurity(schoolId: string, data: any): Promise<any>;
  updateInteropSecurity(schoolId: string, id: string, data: any): Promise<any>;
  deleteInteropSecurity(schoolId: string, id: string): Promise<void>;

  getSecurityCertificate(schoolId: string, id: string): Promise<any | null>;
  listSecurityCertificate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecurityCertificate(schoolId: string, data: any): Promise<any>;
  updateSecurityCertificate(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecurityCertificate(schoolId: string, id: string): Promise<void>;

  getSecurityVulnerability(schoolId: string, id: string): Promise<any | null>;
  listSecurityVulnerability(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecurityVulnerability(schoolId: string, data: any): Promise<any>;
  updateSecurityVulnerability(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecurityVulnerability(schoolId: string, id: string): Promise<void>;

  getInteropHealthCheck(schoolId: string, id: string): Promise<any | null>;
  listInteropHealthCheck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInteropHealthCheck(schoolId: string, data: any): Promise<any>;
  updateInteropHealthCheck(schoolId: string, id: string, data: any): Promise<any>;
  deleteInteropHealthCheck(schoolId: string, id: string): Promise<void>;

  getConnectorTemplate(schoolId: string, id: string): Promise<any | null>;
  listConnectorTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorTemplate(schoolId: string, data: any): Promise<any>;
  updateConnectorTemplate(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorTemplate(schoolId: string, id: string): Promise<void>;

  getConnectorPreset(schoolId: string, id: string): Promise<any | null>;
  listConnectorPreset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorPreset(schoolId: string, data: any): Promise<any>;
  updateConnectorPreset(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorPreset(schoolId: string, id: string): Promise<void>;

  getConnectorPresetConfig(schoolId: string, id: string): Promise<any | null>;
  listConnectorPresetConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorPresetConfig(schoolId: string, data: any): Promise<any>;
  updateConnectorPresetConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorPresetConfig(schoolId: string, id: string): Promise<void>;

  getConnectorHistory(schoolId: string, id: string): Promise<any | null>;
  listConnectorHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorHistory(schoolId: string, data: any): Promise<any>;
  updateConnectorHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorHistory(schoolId: string, id: string): Promise<void>;

  getAPIContract(schoolId: string, id: string): Promise<any | null>;
  listAPIContract(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAPIContract(schoolId: string, data: any): Promise<any>;
  updateAPIContract(schoolId: string, id: string, data: any): Promise<any>;
  deleteAPIContract(schoolId: string, id: string): Promise<void>;

  getAPIEndpoint(schoolId: string, id: string): Promise<any | null>;
  listAPIEndpoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAPIEndpoint(schoolId: string, data: any): Promise<any>;
  updateAPIEndpoint(schoolId: string, id: string, data: any): Promise<any>;
  deleteAPIEndpoint(schoolId: string, id: string): Promise<void>;

  getAPIParameter(schoolId: string, id: string): Promise<any | null>;
  listAPIParameter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAPIParameter(schoolId: string, data: any): Promise<any>;
  updateAPIParameter(schoolId: string, id: string, data: any): Promise<any>;
  deleteAPIParameter(schoolId: string, id: string): Promise<void>;

  getAPIResponse(schoolId: string, id: string): Promise<any | null>;
  listAPIResponse(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAPIResponse(schoolId: string, data: any): Promise<any>;
  updateAPIResponse(schoolId: string, id: string, data: any): Promise<any>;
  deleteAPIResponse(schoolId: string, id: string): Promise<void>;

  getAPISchema(schoolId: string, id: string): Promise<any | null>;
  listAPISchema(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAPISchema(schoolId: string, data: any): Promise<any>;
  updateAPISchema(schoolId: string, id: string, data: any): Promise<any>;
  deleteAPISchema(schoolId: string, id: string): Promise<void>;

  getAPIVersionEntry(schoolId: string, id: string): Promise<any | null>;
  listAPIVersionEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAPIVersionEntry(schoolId: string, data: any): Promise<any>;
  updateAPIVersionEntry(schoolId: string, id: string, data: any): Promise<any>;
  deleteAPIVersionEntry(schoolId: string, id: string): Promise<void>;

  getDataContract(schoolId: string, id: string): Promise<any | null>;
  listDataContract(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataContract(schoolId: string, data: any): Promise<any>;
  updateDataContract(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataContract(schoolId: string, id: string): Promise<void>;

  getDataSchema(schoolId: string, id: string): Promise<any | null>;
  listDataSchema(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataSchema(schoolId: string, data: any): Promise<any>;
  updateDataSchema(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataSchema(schoolId: string, id: string): Promise<void>;

  getDataSchemaField(schoolId: string, id: string): Promise<any | null>;
  listDataSchemaField(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataSchemaField(schoolId: string, data: any): Promise<any>;
  updateDataSchemaField(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataSchemaField(schoolId: string, id: string): Promise<void>;

  getDataSchemaRelationship(schoolId: string, id: string): Promise<any | null>;
  listDataSchemaRelationship(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataSchemaRelationship(schoolId: string, data: any): Promise<any>;
  updateDataSchemaRelationship(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataSchemaRelationship(schoolId: string, id: string): Promise<void>;

  getDataQuality(schoolId: string, id: string): Promise<any | null>;
  listDataQuality(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataQuality(schoolId: string, data: any): Promise<any>;
  updateDataQuality(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataQuality(schoolId: string, id: string): Promise<void>;

  getDataQualityIssue(schoolId: string, id: string): Promise<any | null>;
  listDataQualityIssue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataQualityIssue(schoolId: string, data: any): Promise<any>;
  updateDataQualityIssue(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataQualityIssue(schoolId: string, id: string): Promise<void>;

  getFederationConfig(schoolId: string, id: string): Promise<any | null>;
  listFederationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFederationConfig(schoolId: string, data: any): Promise<any>;
  updateFederationConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteFederationConfig(schoolId: string, id: string): Promise<void>;

  getFederationParticipant(schoolId: string, id: string): Promise<any | null>;
  listFederationParticipant(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFederationParticipant(schoolId: string, data: any): Promise<any>;
  updateFederationParticipant(schoolId: string, id: string, data: any): Promise<any>;
  deleteFederationParticipant(schoolId: string, id: string): Promise<void>;

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

  getFederationAudit(schoolId: string, id: string): Promise<any | null>;
  listFederationAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFederationAudit(schoolId: string, data: any): Promise<any>;
  updateFederationAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteFederationAudit(schoolId: string, id: string): Promise<void>;

  getConnectorPlugin(schoolId: string, id: string): Promise<any | null>;
  listConnectorPlugin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorPlugin(schoolId: string, data: any): Promise<any>;
  updateConnectorPlugin(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorPlugin(schoolId: string, id: string): Promise<void>;

  getConnectorExtension(schoolId: string, id: string): Promise<any | null>;
  listConnectorExtension(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorExtension(schoolId: string, data: any): Promise<any>;
  updateConnectorExtension(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorExtension(schoolId: string, id: string): Promise<void>;

  getConnectorMiddleware(schoolId: string, id: string): Promise<any | null>;
  listConnectorMiddleware(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorMiddleware(schoolId: string, data: any): Promise<any>;
  updateConnectorMiddleware(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorMiddleware(schoolId: string, id: string): Promise<void>;

  getRateLimitConfig(schoolId: string, id: string): Promise<any | null>;
  listRateLimitConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRateLimitConfig(schoolId: string, data: any): Promise<any>;
  updateRateLimitConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteRateLimitConfig(schoolId: string, id: string): Promise<void>;

  getCacheConfig(schoolId: string, id: string): Promise<any | null>;
  listCacheConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCacheConfig(schoolId: string, data: any): Promise<any>;
  updateCacheConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteCacheConfig(schoolId: string, id: string): Promise<void>;

  getRetryConfig(schoolId: string, id: string): Promise<any | null>;
  listRetryConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRetryConfig(schoolId: string, data: any): Promise<any>;
  updateRetryConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteRetryConfig(schoolId: string, id: string): Promise<void>;

  getTimeoutConfig(schoolId: string, id: string): Promise<any | null>;
  listTimeoutConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTimeoutConfig(schoolId: string, data: any): Promise<any>;
  updateTimeoutConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteTimeoutConfig(schoolId: string, id: string): Promise<void>;

  getFailoverConfig(schoolId: string, id: string): Promise<any | null>;
  listFailoverConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFailoverConfig(schoolId: string, data: any): Promise<any>;
  updateFailoverConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteFailoverConfig(schoolId: string, id: string): Promise<void>;

  getCircuitBreakerConfig(schoolId: string, id: string): Promise<any | null>;
  listCircuitBreakerConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCircuitBreakerConfig(schoolId: string, data: any): Promise<any>;
  updateCircuitBreakerConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteCircuitBreakerConfig(schoolId: string, id: string): Promise<void>;

  getBulkheadConfig(schoolId: string, id: string): Promise<any | null>;
  listBulkheadConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBulkheadConfig(schoolId: string, data: any): Promise<any>;
  updateBulkheadConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteBulkheadConfig(schoolId: string, id: string): Promise<void>;

  getMonitoringConfig(schoolId: string, id: string): Promise<any | null>;
  listMonitoringConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMonitoringConfig(schoolId: string, data: any): Promise<any>;
  updateMonitoringConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteMonitoringConfig(schoolId: string, id: string): Promise<void>;

  getAlertingConfig(schoolId: string, id: string): Promise<any | null>;
  listAlertingConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlertingConfig(schoolId: string, data: any): Promise<any>;
  updateAlertingConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlertingConfig(schoolId: string, id: string): Promise<void>;

  getAlertChannel(schoolId: string, id: string): Promise<any | null>;
  listAlertChannel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlertChannel(schoolId: string, data: any): Promise<any>;
  updateAlertChannel(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlertChannel(schoolId: string, id: string): Promise<void>;

  getAlertRule(schoolId: string, id: string): Promise<any | null>;
  listAlertRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlertRule(schoolId: string, data: any): Promise<any>;
  updateAlertRule(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlertRule(schoolId: string, id: string): Promise<void>;

  getEscalationPolicy(schoolId: string, id: string): Promise<any | null>;
  listEscalationPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEscalationPolicy(schoolId: string, data: any): Promise<any>;
  updateEscalationPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteEscalationPolicy(schoolId: string, id: string): Promise<void>;

  getEscalationStep(schoolId: string, id: string): Promise<any | null>;
  listEscalationStep(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEscalationStep(schoolId: string, data: any): Promise<any>;
  updateEscalationStep(schoolId: string, id: string, data: any): Promise<any>;
  deleteEscalationStep(schoolId: string, id: string): Promise<void>;

  getLoggingConfig(schoolId: string, id: string): Promise<any | null>;
  listLoggingConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLoggingConfig(schoolId: string, data: any): Promise<any>;
  updateLoggingConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteLoggingConfig(schoolId: string, id: string): Promise<void>;

  getTracingConfig(schoolId: string, id: string): Promise<any | null>;
  listTracingConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTracingConfig(schoolId: string, data: any): Promise<any>;
  updateTracingConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteTracingConfig(schoolId: string, id: string): Promise<void>;

  getComplianceConfig(schoolId: string, id: string): Promise<any | null>;
  listComplianceConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComplianceConfig(schoolId: string, data: any): Promise<any>;
  updateComplianceConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteComplianceConfig(schoolId: string, id: string): Promise<void>;

  getAuditConfig(schoolId: string, id: string): Promise<any | null>;
  listAuditConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAuditConfig(schoolId: string, data: any): Promise<any>;
  updateAuditConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteAuditConfig(schoolId: string, id: string): Promise<void>;

  getSecurityConfig(schoolId: string, id: string): Promise<any | null>;
  listSecurityConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecurityConfig(schoolId: string, data: any): Promise<any>;
  updateSecurityConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecurityConfig(schoolId: string, id: string): Promise<void>;

  getEncryptionConfig(schoolId: string, id: string): Promise<any | null>;
  listEncryptionConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEncryptionConfig(schoolId: string, data: any): Promise<any>;
  updateEncryptionConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteEncryptionConfig(schoolId: string, id: string): Promise<void>;

  getTransformationConfig(schoolId: string, id: string): Promise<any | null>;
  listTransformationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTransformationConfig(schoolId: string, data: any): Promise<any>;
  updateTransformationConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteTransformationConfig(schoolId: string, id: string): Promise<void>;

  getMappingConfig(schoolId: string, id: string): Promise<any | null>;
  listMappingConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMappingConfig(schoolId: string, data: any): Promise<any>;
  updateMappingConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteMappingConfig(schoolId: string, id: string): Promise<void>;

  getEnrichmentConfig(schoolId: string, id: string): Promise<any | null>;
  listEnrichmentConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnrichmentConfig(schoolId: string, data: any): Promise<any>;
  updateEnrichmentConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnrichmentConfig(schoolId: string, id: string): Promise<void>;

  getEnrichmentProvider(schoolId: string, id: string): Promise<any | null>;
  listEnrichmentProvider(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnrichmentProvider(schoolId: string, data: any): Promise<any>;
  updateEnrichmentProvider(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnrichmentProvider(schoolId: string, id: string): Promise<void>;

  getConnectorDashboard(schoolId: string, id: string): Promise<any | null>;
  listConnectorDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorDashboard(schoolId: string, data: any): Promise<any>;
  updateConnectorDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorDashboard(schoolId: string, id: string): Promise<void>;

  getDashboardWidget(schoolId: string, id: string): Promise<any | null>;
  listDashboardWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDashboardWidget(schoolId: string, data: any): Promise<any>;
  updateDashboardWidget(schoolId: string, id: string, data: any): Promise<any>;
  deleteDashboardWidget(schoolId: string, id: string): Promise<void>;

  getWidgetPosition(schoolId: string, id: string): Promise<any | null>;
  listWidgetPosition(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWidgetPosition(schoolId: string, data: any): Promise<any>;
  updateWidgetPosition(schoolId: string, id: string, data: any): Promise<any>;
  deleteWidgetPosition(schoolId: string, id: string): Promise<void>;

  getWidgetSize(schoolId: string, id: string): Promise<any | null>;
  listWidgetSize(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWidgetSize(schoolId: string, data: any): Promise<any>;
  updateWidgetSize(schoolId: string, id: string, data: any): Promise<any>;
  deleteWidgetSize(schoolId: string, id: string): Promise<void>;

  getDashboardLayout(schoolId: string, id: string): Promise<any | null>;
  listDashboardLayout(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDashboardLayout(schoolId: string, data: any): Promise<any>;
  updateDashboardLayout(schoolId: string, id: string, data: any): Promise<any>;
  deleteDashboardLayout(schoolId: string, id: string): Promise<void>;

  getConnectorReport(schoolId: string, id: string): Promise<any | null>;
  listConnectorReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorReport(schoolId: string, data: any): Promise<any>;
  updateConnectorReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorReport(schoolId: string, id: string): Promise<void>;

  getReportData(schoolId: string, id: string): Promise<any | null>;
  listReportData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createReportData(schoolId: string, data: any): Promise<any>;
  updateReportData(schoolId: string, id: string, data: any): Promise<any>;
  deleteReportData(schoolId: string, id: string): Promise<void>;

  getReportSummary(schoolId: string, id: string): Promise<any | null>;
  listReportSummary(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createReportSummary(schoolId: string, data: any): Promise<any>;
  updateReportSummary(schoolId: string, id: string, data: any): Promise<any>;
  deleteReportSummary(schoolId: string, id: string): Promise<void>;

  getReportDetail(schoolId: string, id: string): Promise<any | null>;
  listReportDetail(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createReportDetail(schoolId: string, data: any): Promise<any>;
  updateReportDetail(schoolId: string, id: string, data: any): Promise<any>;
  deleteReportDetail(schoolId: string, id: string): Promise<void>;

  getReportChart(schoolId: string, id: string): Promise<any | null>;
  listReportChart(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createReportChart(schoolId: string, data: any): Promise<any>;
  updateReportChart(schoolId: string, id: string, data: any): Promise<any>;
  deleteReportChart(schoolId: string, id: string): Promise<void>;

  getConnectorAnalytics(schoolId: string, id: string): Promise<any | null>;
  listConnectorAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorAnalytics(schoolId: string, data: any): Promise<any>;
  updateConnectorAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorAnalytics(schoolId: string, id: string): Promise<void>;

  getAnalyticsMetrics(schoolId: string, id: string): Promise<any | null>;
  listAnalyticsMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAnalyticsMetrics(schoolId: string, data: any): Promise<any>;
  updateAnalyticsMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteAnalyticsMetrics(schoolId: string, id: string): Promise<void>;

  getAnalyticsTrend(schoolId: string, id: string): Promise<any | null>;
  listAnalyticsTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAnalyticsTrend(schoolId: string, data: any): Promise<any>;
  updateAnalyticsTrend(schoolId: string, id: string, data: any): Promise<any>;
  deleteAnalyticsTrend(schoolId: string, id: string): Promise<void>;

  getAnalyticsInsight(schoolId: string, id: string): Promise<any | null>;
  listAnalyticsInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAnalyticsInsight(schoolId: string, data: any): Promise<any>;
  updateAnalyticsInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteAnalyticsInsight(schoolId: string, id: string): Promise<void>;

  getConnectorAI(schoolId: string, id: string): Promise<any | null>;
  listConnectorAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorAI(schoolId: string, data: any): Promise<any>;
  updateConnectorAI(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorAI(schoolId: string, id: string): Promise<void>;

  getConnectorAIConfig(schoolId: string, id: string): Promise<any | null>;
  listConnectorAIConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorAIConfig(schoolId: string, data: any): Promise<any>;
  updateConnectorAIConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorAIConfig(schoolId: string, id: string): Promise<void>;

  getConnectorAIModel(schoolId: string, id: string): Promise<any | null>;
  listConnectorAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorAIModel(schoolId: string, data: any): Promise<any>;
  updateConnectorAIModel(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorAIModel(schoolId: string, id: string): Promise<void>;

  getConnectorAIInsight(schoolId: string, id: string): Promise<any | null>;
  listConnectorAIInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorAIInsight(schoolId: string, data: any): Promise<any>;
  updateConnectorAIInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorAIInsight(schoolId: string, id: string): Promise<void>;

  getConnectorEvent(schoolId: string, id: string): Promise<any | null>;
  listConnectorEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConnectorEvent(schoolId: string, data: any): Promise<any>;
  updateConnectorEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteConnectorEvent(schoolId: string, id: string): Promise<void>;

  getEuropassCredentials(schoolId: string, id: string): Promise<any | null>;
  listEuropassCredentials(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEuropassCredentials(schoolId: string, data: any): Promise<any>;
  updateEuropassCredentials(schoolId: string, id: string, data: any): Promise<any>;
  deleteEuropassCredentials(schoolId: string, id: string): Promise<void>;

}

class SearchModuleRepositoryImpl implements SearchModuleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new Error('GlobalCloud entity not found');
  }

  // =============================================================================
  // INTEROPERABILITY-INTERNATIONAL
  // =============================================================================
  async getUNESCOConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('unescoconnectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listUNESCOConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('unescoconnectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudUNESCOConnectorError(error.message);
    return data ?? [];
  }

  async createUNESCOConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('unescoconnectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudUNESCOConnectorError(error.message);
    return result;
  }

  async updateUNESCOConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('unescoconnectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudUNESCOConnectorError(error.message);
    return result;
  }

  async deleteUNESCOConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('unescoconnectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudUNESCOConnectorError(error.message);
  }

  async getUNICEFConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('unicefconnectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listUNICEFConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('unicefconnectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudUNICEFConnectorError(error.message);
    return data ?? [];
  }

  async createUNICEFConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('unicefconnectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudUNICEFConnectorError(error.message);
    return result;
  }

  async updateUNICEFConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('unicefconnectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudUNICEFConnectorError(error.message);
    return result;
  }

  async deleteUNICEFConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('unicefconnectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudUNICEFConnectorError(error.message);
  }

  async getOCDEConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ocdeconnectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOCDEConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ocdeconnectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOCDEConnectorError(error.message);
    return data ?? [];
  }

  async createOCDEConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ocdeconnectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOCDEConnectorError(error.message);
    return result;
  }

  async updateOCDEConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ocdeconnectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOCDEConnectorError(error.message);
    return result;
  }

  async deleteOCDEConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ocdeconnectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOCDEConnectorError(error.message);
  }

  async getWorldBankConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('world_bank_connectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWorldBankConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('world_bank_connectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWorldBankConnectorError(error.message);
    return data ?? [];
  }

  async createWorldBankConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('world_bank_connectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWorldBankConnectorError(error.message);
    return result;
  }

  async updateWorldBankConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('world_bank_connectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWorldBankConnectorError(error.message);
    return result;
  }

  async deleteWorldBankConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('world_bank_connectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWorldBankConnectorError(error.message);
  }

  async getOpenBadgesConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('open_badges_connectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOpenBadgesConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('open_badges_connectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOpenBadgesConnectorError(error.message);
    return data ?? [];
  }

  async createOpenBadgesConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('open_badges_connectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOpenBadgesConnectorError(error.message);
    return result;
  }

  async updateOpenBadgesConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('open_badges_connectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOpenBadgesConnectorError(error.message);
    return result;
  }

  async deleteOpenBadgesConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('open_badges_connectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOpenBadgesConnectorError(error.message);
  }

  async getEuropassConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('europass_connectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEuropassConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('europass_connectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEuropassConnectorError(error.message);
    return data ?? [];
  }

  async createEuropassConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('europass_connectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEuropassConnectorError(error.message);
    return result;
  }

  async updateEuropassConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('europass_connectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEuropassConnectorError(error.message);
    return result;
  }

  async deleteEuropassConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('europass_connectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEuropassConnectorError(error.message);
  }

  async getSCORMConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scormconnectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSCORMConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scormconnectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSCORMConnectorError(error.message);
    return data ?? [];
  }

  async createSCORMConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scormconnectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSCORMConnectorError(error.message);
    return result;
  }

  async updateSCORMConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scormconnectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSCORMConnectorError(error.message);
    return result;
  }

  async deleteSCORMConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scormconnectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSCORMConnectorError(error.message);
  }

  async getXAPIConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('xapiconnectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listXAPIConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('xapiconnectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudXAPIConnectorError(error.message);
    return data ?? [];
  }

  async createXAPIConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('xapiconnectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudXAPIConnectorError(error.message);
    return result;
  }

  async updateXAPIConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('xapiconnectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudXAPIConnectorError(error.message);
    return result;
  }

  async deleteXAPIConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('xapiconnectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudXAPIConnectorError(error.message);
  }

  async getLTIConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('lticonnectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLTIConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('lticonnectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLTIConnectorError(error.message);
    return data ?? [];
  }

  async createLTIConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('lticonnectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLTIConnectorError(error.message);
    return result;
  }

  async updateLTIConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('lticonnectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLTIConnectorError(error.message);
    return result;
  }

  async deleteLTIConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('lticonnectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLTIConnectorError(error.message);
  }

  async getIMSGlobalConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('imsglobal_connectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listIMSGlobalConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('imsglobal_connectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudIMSGlobalConnectorError(error.message);
    return data ?? [];
  }

  async createIMSGlobalConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('imsglobal_connectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudIMSGlobalConnectorError(error.message);
    return result;
  }

  async updateIMSGlobalConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('imsglobal_connectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudIMSGlobalConnectorError(error.message);
    return result;
  }

  async deleteIMSGlobalConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('imsglobal_connectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudIMSGlobalConnectorError(error.message);
  }

  async getEdFiConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ed_fi_connectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEdFiConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ed_fi_connectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEdFiConnectorError(error.message);
    return data ?? [];
  }

  async createEdFiConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ed_fi_connectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEdFiConnectorError(error.message);
    return result;
  }

  async updateEdFiConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ed_fi_connectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEdFiConnectorError(error.message);
    return result;
  }

  async deleteEdFiConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ed_fi_connectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEdFiConnectorError(error.message);
  }

  async getEMISConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('emisconnectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEMISConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('emisconnectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEMISConnectorError(error.message);
    return data ?? [];
  }

  async createEMISConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('emisconnectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEMISConnectorError(error.message);
    return result;
  }

  async updateEMISConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('emisconnectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEMISConnectorError(error.message);
    return result;
  }

  async deleteEMISConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('emisconnectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEMISConnectorError(error.message);
  }

  async getOneRosterConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('one_roster_connectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOneRosterConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('one_roster_connectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOneRosterConnectorError(error.message);
    return data ?? [];
  }

  async createOneRosterConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('one_roster_connectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOneRosterConnectorError(error.message);
    return result;
  }

  async updateOneRosterConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('one_roster_connectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOneRosterConnectorError(error.message);
    return result;
  }

  async deleteOneRosterConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('one_roster_connectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOneRosterConnectorError(error.message);
  }

  async getOpenIDConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('open_idconnectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOpenIDConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('open_idconnectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOpenIDConnectorError(error.message);
    return data ?? [];
  }

  async createOpenIDConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('open_idconnectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOpenIDConnectorError(error.message);
    return result;
  }

  async updateOpenIDConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('open_idconnectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOpenIDConnectorError(error.message);
    return result;
  }

  async deleteOpenIDConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('open_idconnectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOpenIDConnectorError(error.message);
  }

  async getOAuth2Connector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('oauth2_connectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOAuth2Connector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('oauth2_connectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOAuth2ConnectorError(error.message);
    return data ?? [];
  }

  async createOAuth2Connector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('oauth2_connectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOAuth2ConnectorError(error.message);
    return result;
  }

  async updateOAuth2Connector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('oauth2_connectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOAuth2ConnectorError(error.message);
    return result;
  }

  async deleteOAuth2Connector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('oauth2_connectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOAuth2ConnectorError(error.message);
  }

  async getSAMLConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('samlconnectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSAMLConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('samlconnectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSAMLConnectorError(error.message);
    return data ?? [];
  }

  async createSAMLConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('samlconnectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSAMLConnectorError(error.message);
    return result;
  }

  async updateSAMLConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('samlconnectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSAMLConnectorError(error.message);
    return result;
  }

  async deleteSAMLConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('samlconnectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSAMLConnectorError(error.message);
  }

  async getLDAPConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ldapconnectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLDAPConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ldapconnectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLDAPConnectorError(error.message);
    return data ?? [];
  }

  async createLDAPConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ldapconnectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLDAPConnectorError(error.message);
    return result;
  }

  async updateLDAPConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ldapconnectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLDAPConnectorError(error.message);
    return result;
  }

  async deleteLDAPConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ldapconnectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLDAPConnectorError(error.message);
  }

  async getSCIMConnector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scimconnectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSCIMConnector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scimconnectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSCIMConnectorError(error.message);
    return data ?? [];
  }

  async createSCIMConnector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scimconnectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSCIMConnectorError(error.message);
    return result;
  }

  async updateSCIMConnector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scimconnectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSCIMConnectorError(error.message);
    return result;
  }

  async deleteSCIMConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scimconnectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSCIMConnectorError(error.message);
  }

  async getConnectorConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorError(error.message);
    return data ?? [];
  }

  async createConnectorConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorError(error.message);
    return result;
  }

  async updateConnectorConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorError(error.message);
    return result;
  }

  async deleteConnectorConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorError(error.message);
  }

  async getConnectorState(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_states')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorState(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_states').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorStateError(error.message);
    return data ?? [];
  }

  async createConnectorState(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_states')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorStateError(error.message);
    return result;
  }

  async updateConnectorState(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_states')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorStateError(error.message);
    return result;
  }

  async deleteConnectorState(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_states')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorStateError(error.message);
  }

  async getConnectorHealth(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_healths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_healths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorHealthError(error.message);
    return data ?? [];
  }

  async createConnectorHealth(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_healths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorHealthError(error.message);
    return result;
  }

  async updateConnectorHealth(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_healths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorHealthError(error.message);
    return result;
  }

  async deleteConnectorHealth(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_healths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorHealthError(error.message);
  }

  async getHealthCheckDetail(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('health_check_details')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listHealthCheckDetail(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('health_check_details').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudHealthCheckDetailError(error.message);
    return data ?? [];
  }

  async createHealthCheckDetail(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('health_check_details')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudHealthCheckDetailError(error.message);
    return result;
  }

  async updateHealthCheckDetail(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('health_check_details')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudHealthCheckDetailError(error.message);
    return result;
  }

  async deleteHealthCheckDetail(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('health_check_details')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudHealthCheckDetailError(error.message);
  }

  async getConnectorMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorMetricsError(error.message);
    return data ?? [];
  }

  async createConnectorMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorMetricsError(error.message);
    return result;
  }

  async updateConnectorMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorMetricsError(error.message);
    return result;
  }

  async deleteConnectorMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorMetricsError(error.message);
  }

  async getSyncJob(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sync_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSyncJob(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sync_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSyncJobError(error.message);
    return data ?? [];
  }

  async createSyncJob(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sync_jobs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSyncJobError(error.message);
    return result;
  }

  async updateSyncJob(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sync_jobs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSyncJobError(error.message);
    return result;
  }

  async deleteSyncJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sync_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSyncJobError(error.message);
  }

  async getSyncError(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sync_errors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSyncError(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sync_errors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSyncErrorError(error.message);
    return data ?? [];
  }

  async createSyncError(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sync_errors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSyncErrorError(error.message);
    return result;
  }

  async updateSyncError(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sync_errors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSyncErrorError(error.message);
    return result;
  }

  async deleteSyncError(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sync_errors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSyncErrorError(error.message);
  }

  async getSyncStatus(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sync_statuses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSyncStatus(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sync_statuses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSyncStatusError(error.message);
    return data ?? [];
  }

  async createSyncStatus(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sync_statuses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSyncStatusError(error.message);
    return result;
  }

  async updateSyncStatus(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sync_statuses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSyncStatusError(error.message);
    return result;
  }

  async deleteSyncStatus(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sync_statuses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSyncStatusError(error.message);
  }

  async getSyncLog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sync_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSyncLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sync_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSyncLogError(error.message);
    return data ?? [];
  }

  async createSyncLog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sync_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSyncLogError(error.message);
    return result;
  }

  async updateSyncLog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sync_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSyncLogError(error.message);
    return result;
  }

  async deleteSyncLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sync_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSyncLogError(error.message);
  }

  async getSyncMapping(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sync_mappings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSyncMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sync_mappings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSyncMappingError(error.message);
    return data ?? [];
  }

  async createSyncMapping(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sync_mappings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSyncMappingError(error.message);
    return result;
  }

  async updateSyncMapping(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sync_mappings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSyncMappingError(error.message);
    return result;
  }

  async deleteSyncMapping(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sync_mappings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSyncMappingError(error.message);
  }

  async getSyncConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('syncs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSyncConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('syncs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSyncError(error.message);
    return data ?? [];
  }

  async createSyncConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('syncs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSyncError(error.message);
    return result;
  }

  async updateSyncConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('syncs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSyncError(error.message);
    return result;
  }

  async deleteSyncConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('syncs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSyncError(error.message);
  }

  async getSyncFilter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sync_filters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSyncFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sync_filters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSyncFilterError(error.message);
    return data ?? [];
  }

  async createSyncFilter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sync_filters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSyncFilterError(error.message);
    return result;
  }

  async updateSyncFilter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sync_filters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSyncFilterError(error.message);
    return result;
  }

  async deleteSyncFilter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sync_filters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSyncFilterError(error.message);
  }

  async getDataMapping(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_mappings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_mappings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataMappingError(error.message);
    return data ?? [];
  }

  async createDataMapping(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_mappings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataMappingError(error.message);
    return result;
  }

  async updateDataMapping(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_mappings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataMappingError(error.message);
    return result;
  }

  async deleteDataMapping(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_mappings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataMappingError(error.message);
  }

  async getDataTransform(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_transforms')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataTransform(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_transforms').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataTransformError(error.message);
    return data ?? [];
  }

  async createDataTransform(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_transforms')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataTransformError(error.message);
    return result;
  }

  async updateDataTransform(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_transforms')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataTransformError(error.message);
    return result;
  }

  async deleteDataTransform(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_transforms')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataTransformError(error.message);
  }

  async getDataValidation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_validatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataValidation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_validatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataValidationError(error.message);
    return data ?? [];
  }

  async createDataValidation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_validatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataValidationError(error.message);
    return result;
  }

  async updateDataValidation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_validatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataValidationError(error.message);
    return result;
  }

  async deleteDataValidation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_validatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataValidationError(error.message);
  }

  async getValidationRule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('validation_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listValidationRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('validation_rules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudValidationRuleError(error.message);
    return data ?? [];
  }

  async createValidationRule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('validation_rules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudValidationRuleError(error.message);
    return result;
  }

  async updateValidationRule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('validation_rules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudValidationRuleError(error.message);
    return result;
  }

  async deleteValidationRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('validation_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudValidationRuleError(error.message);
  }

  async getDataEnrichment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_enrichments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataEnrichment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_enrichments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataEnrichmentError(error.message);
    return data ?? [];
  }

  async createDataEnrichment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_enrichments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataEnrichmentError(error.message);
    return result;
  }

  async updateDataEnrichment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_enrichments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataEnrichmentError(error.message);
    return result;
  }

  async deleteDataEnrichment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_enrichments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataEnrichmentError(error.message);
  }

  async getAuthConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('auths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAuthConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('auths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAuthError(error.message);
    return data ?? [];
  }

  async createAuthConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('auths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAuthError(error.message);
    return result;
  }

  async updateAuthConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('auths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAuthError(error.message);
    return result;
  }

  async deleteAuthConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('auths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAuthError(error.message);
  }

  async getAuthCredentials(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('auth_credentialses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAuthCredentials(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('auth_credentialses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAuthCredentialsError(error.message);
    return data ?? [];
  }

  async createAuthCredentials(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('auth_credentialses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAuthCredentialsError(error.message);
    return result;
  }

  async updateAuthCredentials(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('auth_credentialses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAuthCredentialsError(error.message);
    return result;
  }

  async deleteAuthCredentials(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('auth_credentialses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAuthCredentialsError(error.message);
  }

  async getAuthToken(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('auth_tokens')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAuthToken(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('auth_tokens').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAuthTokenError(error.message);
    return data ?? [];
  }

  async createAuthToken(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('auth_tokens')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAuthTokenError(error.message);
    return result;
  }

  async updateAuthToken(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('auth_tokens')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAuthTokenError(error.message);
    return result;
  }

  async deleteAuthToken(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('auth_tokens')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAuthTokenError(error.message);
  }

  async getAuthAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('auth_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAuthAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('auth_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAuthAuditError(error.message);
    return data ?? [];
  }

  async createAuthAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('auth_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAuthAuditError(error.message);
    return result;
  }

  async updateAuthAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('auth_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAuthAuditError(error.message);
    return result;
  }

  async deleteAuthAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('auth_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAuthAuditError(error.message);
  }

  async getAuthRefresh(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('auth_refreshes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAuthRefresh(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('auth_refreshes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAuthRefreshError(error.message);
    return data ?? [];
  }

  async createAuthRefresh(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('auth_refreshes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAuthRefreshError(error.message);
    return result;
  }

  async updateAuthRefresh(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('auth_refreshes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAuthRefreshError(error.message);
    return result;
  }

  async deleteAuthRefresh(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('auth_refreshes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAuthRefreshError(error.message);
  }

  async getWebhookConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('webhooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWebhookConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWebhookError(error.message);
    return data ?? [];
  }

  async createWebhookConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('webhooks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWebhookError(error.message);
    return result;
  }

  async updateWebhookConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('webhooks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWebhookError(error.message);
    return result;
  }

  async deleteWebhookConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('webhooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWebhookError(error.message);
  }

  async getWebhookEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('webhook_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWebhookEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('webhook_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWebhookEventError(error.message);
    return data ?? [];
  }

  async createWebhookEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('webhook_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWebhookEventError(error.message);
    return result;
  }

  async updateWebhookEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('webhook_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWebhookEventError(error.message);
    return result;
  }

  async deleteWebhookEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('webhook_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWebhookEventError(error.message);
  }

  async getWebhookDelivery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('webhook_deliverys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWebhookDelivery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('webhook_deliverys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWebhookDeliveryError(error.message);
    return data ?? [];
  }

  async createWebhookDelivery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('webhook_deliverys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWebhookDeliveryError(error.message);
    return result;
  }

  async updateWebhookDelivery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('webhook_deliverys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWebhookDeliveryError(error.message);
    return result;
  }

  async deleteWebhookDelivery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('webhook_deliverys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWebhookDeliveryError(error.message);
  }

  async getWebhookRetry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('webhook_retrys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWebhookRetry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('webhook_retrys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWebhookRetryError(error.message);
    return data ?? [];
  }

  async createWebhookRetry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('webhook_retrys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWebhookRetryError(error.message);
    return result;
  }

  async updateWebhookRetry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('webhook_retrys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWebhookRetryError(error.message);
    return result;
  }

  async deleteWebhookRetry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('webhook_retrys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWebhookRetryError(error.message);
  }

  async getSchemaMapping(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('schema_mappings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchemaMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('schema_mappings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchemaMappingError(error.message);
    return data ?? [];
  }

  async createSchemaMapping(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('schema_mappings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchemaMappingError(error.message);
    return result;
  }

  async updateSchemaMapping(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('schema_mappings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchemaMappingError(error.message);
    return result;
  }

  async deleteSchemaMapping(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('schema_mappings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchemaMappingError(error.message);
  }

  async getFieldMapping(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('field_mappings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFieldMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('field_mappings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFieldMappingError(error.message);
    return data ?? [];
  }

  async createFieldMapping(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('field_mappings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFieldMappingError(error.message);
    return result;
  }

  async updateFieldMapping(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('field_mappings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFieldMappingError(error.message);
    return result;
  }

  async deleteFieldMapping(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('field_mappings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFieldMappingError(error.message);
  }

  async getSchemaValidation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('schema_validatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchemaValidation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('schema_validatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchemaValidationError(error.message);
    return data ?? [];
  }

  async createSchemaValidation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('schema_validatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchemaValidationError(error.message);
    return result;
  }

  async updateSchemaValidation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('schema_validatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchemaValidationError(error.message);
    return result;
  }

  async deleteSchemaValidation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('schema_validatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchemaValidationError(error.message);
  }

  async getSchemaTransform(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('schema_transforms')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchemaTransform(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('schema_transforms').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchemaTransformError(error.message);
    return data ?? [];
  }

  async createSchemaTransform(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('schema_transforms')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchemaTransformError(error.message);
    return result;
  }

  async updateSchemaTransform(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('schema_transforms')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchemaTransformError(error.message);
    return result;
  }

  async deleteSchemaTransform(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('schema_transforms')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchemaTransformError(error.message);
  }

  async getSchemaVersionEntry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('schema_versioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchemaVersionEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('schema_versioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchemaVersionError(error.message);
    return data ?? [];
  }

  async createSchemaVersionEntry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('schema_versioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchemaVersionError(error.message);
    return result;
  }

  async updateSchemaVersionEntry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('schema_versioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchemaVersionError(error.message);
    return result;
  }

  async deleteSchemaVersionEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('schema_versioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchemaVersionError(error.message);
  }

  async getConnectorPipeline(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_pipelines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorPipeline(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorPipelineError(error.message);
    return data ?? [];
  }

  async createConnectorPipeline(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_pipelines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorPipelineError(error.message);
    return result;
  }

  async updateConnectorPipeline(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_pipelines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorPipelineError(error.message);
    return result;
  }

  async deleteConnectorPipeline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_pipelines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorPipelineError(error.message);
  }

  async getConnectorStage(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_stages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorStage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_stages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorStageError(error.message);
    return data ?? [];
  }

  async createConnectorStage(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_stages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorStageError(error.message);
    return result;
  }

  async updateConnectorStage(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_stages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorStageError(error.message);
    return result;
  }

  async deleteConnectorStage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_stages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorStageError(error.message);
  }

  async getConnectorRun(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_runs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_runs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorRunError(error.message);
    return data ?? [];
  }

  async createConnectorRun(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_runs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorRunError(error.message);
    return result;
  }

  async updateConnectorRun(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_runs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorRunError(error.message);
    return result;
  }

  async deleteConnectorRun(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_runs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorRunError(error.message);
  }

  async getConnectorMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorMetricError(error.message);
    return data ?? [];
  }

  async createConnectorMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorMetricError(error.message);
    return result;
  }

  async updateConnectorMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorMetricError(error.message);
    return result;
  }

  async deleteConnectorMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorMetricError(error.message);
  }

  async getInteropAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('interop_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInteropAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('interop_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInteropAuditError(error.message);
    return data ?? [];
  }

  async createInteropAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('interop_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInteropAuditError(error.message);
    return result;
  }

  async updateInteropAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('interop_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInteropAuditError(error.message);
    return result;
  }

  async deleteInteropAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('interop_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInteropAuditError(error.message);
  }

  async getInteropCompliance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('interop_compliances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInteropCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('interop_compliances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInteropComplianceError(error.message);
    return data ?? [];
  }

  async createInteropCompliance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('interop_compliances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInteropComplianceError(error.message);
    return result;
  }

  async updateInteropCompliance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('interop_compliances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInteropComplianceError(error.message);
    return result;
  }

  async deleteInteropCompliance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('interop_compliances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInteropComplianceError(error.message);
  }

  async getComplianceRequirement(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('compliance_requirements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComplianceRequirement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('compliance_requirements').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComplianceRequirementError(error.message);
    return data ?? [];
  }

  async createComplianceRequirement(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('compliance_requirements')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComplianceRequirementError(error.message);
    return result;
  }

  async updateComplianceRequirement(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('compliance_requirements')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComplianceRequirementError(error.message);
    return result;
  }

  async deleteComplianceRequirement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('compliance_requirements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComplianceRequirementError(error.message);
  }

  async getInteropSecurity(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('interop_securitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInteropSecurity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('interop_securitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInteropSecurityError(error.message);
    return data ?? [];
  }

  async createInteropSecurity(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('interop_securitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInteropSecurityError(error.message);
    return result;
  }

  async updateInteropSecurity(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('interop_securitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInteropSecurityError(error.message);
    return result;
  }

  async deleteInteropSecurity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('interop_securitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInteropSecurityError(error.message);
  }

  async getSecurityCertificate(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('security_certificates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecurityCertificate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('security_certificates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecurityCertificateError(error.message);
    return data ?? [];
  }

  async createSecurityCertificate(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('security_certificates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecurityCertificateError(error.message);
    return result;
  }

  async updateSecurityCertificate(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('security_certificates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecurityCertificateError(error.message);
    return result;
  }

  async deleteSecurityCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('security_certificates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecurityCertificateError(error.message);
  }

  async getSecurityVulnerability(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('security_vulnerabilitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecurityVulnerability(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('security_vulnerabilitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecurityVulnerabilityError(error.message);
    return data ?? [];
  }

  async createSecurityVulnerability(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('security_vulnerabilitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecurityVulnerabilityError(error.message);
    return result;
  }

  async updateSecurityVulnerability(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('security_vulnerabilitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecurityVulnerabilityError(error.message);
    return result;
  }

  async deleteSecurityVulnerability(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('security_vulnerabilitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecurityVulnerabilityError(error.message);
  }

  async getInteropHealthCheck(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('interop_health_checks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInteropHealthCheck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('interop_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInteropHealthCheckError(error.message);
    return data ?? [];
  }

  async createInteropHealthCheck(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('interop_health_checks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInteropHealthCheckError(error.message);
    return result;
  }

  async updateInteropHealthCheck(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('interop_health_checks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInteropHealthCheckError(error.message);
    return result;
  }

  async deleteInteropHealthCheck(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('interop_health_checks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInteropHealthCheckError(error.message);
  }

  async getConnectorTemplate(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_templates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorTemplateError(error.message);
    return data ?? [];
  }

  async createConnectorTemplate(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorTemplateError(error.message);
    return result;
  }

  async updateConnectorTemplate(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorTemplateError(error.message);
    return result;
  }

  async deleteConnectorTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorTemplateError(error.message);
  }

  async getConnectorPreset(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_presets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorPreset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_presets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorPresetError(error.message);
    return data ?? [];
  }

  async createConnectorPreset(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_presets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorPresetError(error.message);
    return result;
  }

  async updateConnectorPreset(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_presets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorPresetError(error.message);
    return result;
  }

  async deleteConnectorPreset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_presets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorPresetError(error.message);
  }

  async getConnectorPresetConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_presets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorPresetConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_presets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorPresetError(error.message);
    return data ?? [];
  }

  async createConnectorPresetConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_presets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorPresetError(error.message);
    return result;
  }

  async updateConnectorPresetConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_presets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorPresetError(error.message);
    return result;
  }

  async deleteConnectorPresetConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_presets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorPresetError(error.message);
  }

  async getConnectorHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorHistoryError(error.message);
    return data ?? [];
  }

  async createConnectorHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorHistoryError(error.message);
    return result;
  }

  async updateConnectorHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorHistoryError(error.message);
    return result;
  }

  async deleteConnectorHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorHistoryError(error.message);
  }

  async getAPIContract(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('apicontracts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAPIContract(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('apicontracts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAPIContractError(error.message);
    return data ?? [];
  }

  async createAPIContract(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('apicontracts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAPIContractError(error.message);
    return result;
  }

  async updateAPIContract(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('apicontracts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAPIContractError(error.message);
    return result;
  }

  async deleteAPIContract(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('apicontracts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAPIContractError(error.message);
  }

  async getAPIEndpoint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('apiendpoints')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAPIEndpoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('apiendpoints').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAPIEndpointError(error.message);
    return data ?? [];
  }

  async createAPIEndpoint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('apiendpoints')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAPIEndpointError(error.message);
    return result;
  }

  async updateAPIEndpoint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('apiendpoints')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAPIEndpointError(error.message);
    return result;
  }

  async deleteAPIEndpoint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('apiendpoints')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAPIEndpointError(error.message);
  }

  async getAPIParameter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('apiparameters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAPIParameter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('apiparameters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAPIParameterError(error.message);
    return data ?? [];
  }

  async createAPIParameter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('apiparameters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAPIParameterError(error.message);
    return result;
  }

  async updateAPIParameter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('apiparameters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAPIParameterError(error.message);
    return result;
  }

  async deleteAPIParameter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('apiparameters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAPIParameterError(error.message);
  }

  async getAPIResponse(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('apiresponses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAPIResponse(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('apiresponses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAPIResponseError(error.message);
    return data ?? [];
  }

  async createAPIResponse(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('apiresponses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAPIResponseError(error.message);
    return result;
  }

  async updateAPIResponse(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('apiresponses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAPIResponseError(error.message);
    return result;
  }

  async deleteAPIResponse(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('apiresponses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAPIResponseError(error.message);
  }

  async getAPISchema(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('apischemas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAPISchema(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('apischemas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAPISchemaError(error.message);
    return data ?? [];
  }

  async createAPISchema(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('apischemas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAPISchemaError(error.message);
    return result;
  }

  async updateAPISchema(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('apischemas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAPISchemaError(error.message);
    return result;
  }

  async deleteAPISchema(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('apischemas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAPISchemaError(error.message);
  }

  async getAPIVersionEntry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('apiversioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAPIVersionEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('apiversioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAPIVersionError(error.message);
    return data ?? [];
  }

  async createAPIVersionEntry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('apiversioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAPIVersionError(error.message);
    return result;
  }

  async updateAPIVersionEntry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('apiversioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAPIVersionError(error.message);
    return result;
  }

  async deleteAPIVersionEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('apiversioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAPIVersionError(error.message);
  }

  async getDataContract(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_contracts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataContract(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_contracts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataContractError(error.message);
    return data ?? [];
  }

  async createDataContract(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_contracts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataContractError(error.message);
    return result;
  }

  async updateDataContract(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_contracts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataContractError(error.message);
    return result;
  }

  async deleteDataContract(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_contracts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataContractError(error.message);
  }

  async getDataSchema(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_schemas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataSchema(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_schemas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataSchemaError(error.message);
    return data ?? [];
  }

  async createDataSchema(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_schemas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataSchemaError(error.message);
    return result;
  }

  async updateDataSchema(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_schemas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataSchemaError(error.message);
    return result;
  }

  async deleteDataSchema(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_schemas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataSchemaError(error.message);
  }

  async getDataSchemaField(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_schema_fields')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataSchemaField(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_schema_fields').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataSchemaFieldError(error.message);
    return data ?? [];
  }

  async createDataSchemaField(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_schema_fields')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataSchemaFieldError(error.message);
    return result;
  }

  async updateDataSchemaField(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_schema_fields')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataSchemaFieldError(error.message);
    return result;
  }

  async deleteDataSchemaField(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_schema_fields')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataSchemaFieldError(error.message);
  }

  async getDataSchemaRelationship(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_schema_relationships')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataSchemaRelationship(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_schema_relationships').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataSchemaRelationshipError(error.message);
    return data ?? [];
  }

  async createDataSchemaRelationship(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_schema_relationships')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataSchemaRelationshipError(error.message);
    return result;
  }

  async updateDataSchemaRelationship(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_schema_relationships')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataSchemaRelationshipError(error.message);
    return result;
  }

  async deleteDataSchemaRelationship(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_schema_relationships')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataSchemaRelationshipError(error.message);
  }

  async getDataQuality(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_qualitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataQuality(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_qualitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataQualityError(error.message);
    return data ?? [];
  }

  async createDataQuality(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_qualitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataQualityError(error.message);
    return result;
  }

  async updateDataQuality(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_qualitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataQualityError(error.message);
    return result;
  }

  async deleteDataQuality(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_qualitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataQualityError(error.message);
  }

  async getDataQualityIssue(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_quality_issues')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataQualityIssue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_quality_issues').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataQualityIssueError(error.message);
    return data ?? [];
  }

  async createDataQualityIssue(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_quality_issues')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataQualityIssueError(error.message);
    return result;
  }

  async updateDataQualityIssue(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_quality_issues')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataQualityIssueError(error.message);
    return result;
  }

  async deleteDataQualityIssue(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_quality_issues')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataQualityIssueError(error.message);
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

  async getFederationParticipant(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('federation_participants')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFederationParticipant(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('federation_participants').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFederationParticipantError(error.message);
    return data ?? [];
  }

  async createFederationParticipant(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('federation_participants')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFederationParticipantError(error.message);
    return result;
  }

  async updateFederationParticipant(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('federation_participants')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFederationParticipantError(error.message);
    return result;
  }

  async deleteFederationParticipant(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('federation_participants')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFederationParticipantError(error.message);
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

  async getFederationAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('federation_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFederationAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('federation_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFederationAuditError(error.message);
    return data ?? [];
  }

  async createFederationAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('federation_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFederationAuditError(error.message);
    return result;
  }

  async updateFederationAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('federation_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFederationAuditError(error.message);
    return result;
  }

  async deleteFederationAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('federation_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFederationAuditError(error.message);
  }

  async getConnectorPlugin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_plugins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorPlugin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_plugins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorPluginError(error.message);
    return data ?? [];
  }

  async createConnectorPlugin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_plugins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorPluginError(error.message);
    return result;
  }

  async updateConnectorPlugin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_plugins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorPluginError(error.message);
    return result;
  }

  async deleteConnectorPlugin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_plugins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorPluginError(error.message);
  }

  async getConnectorExtension(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_extensioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorExtension(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_extensioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorExtensionError(error.message);
    return data ?? [];
  }

  async createConnectorExtension(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_extensioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorExtensionError(error.message);
    return result;
  }

  async updateConnectorExtension(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_extensioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorExtensionError(error.message);
    return result;
  }

  async deleteConnectorExtension(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_extensioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorExtensionError(error.message);
  }

  async getConnectorMiddleware(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_middlewares')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorMiddleware(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_middlewares').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorMiddlewareError(error.message);
    return data ?? [];
  }

  async createConnectorMiddleware(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_middlewares')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorMiddlewareError(error.message);
    return result;
  }

  async updateConnectorMiddleware(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_middlewares')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorMiddlewareError(error.message);
    return result;
  }

  async deleteConnectorMiddleware(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_middlewares')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorMiddlewareError(error.message);
  }

  async getRateLimitConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('rate_limits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRateLimitConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('rate_limits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRateLimitError(error.message);
    return data ?? [];
  }

  async createRateLimitConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('rate_limits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRateLimitError(error.message);
    return result;
  }

  async updateRateLimitConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('rate_limits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRateLimitError(error.message);
    return result;
  }

  async deleteRateLimitConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('rate_limits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRateLimitError(error.message);
  }

  async getCacheConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('caches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCacheConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('caches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCacheError(error.message);
    return data ?? [];
  }

  async createCacheConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('caches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCacheError(error.message);
    return result;
  }

  async updateCacheConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('caches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCacheError(error.message);
    return result;
  }

  async deleteCacheConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('caches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCacheError(error.message);
  }

  async getRetryConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('retrys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRetryConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('retrys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRetryError(error.message);
    return data ?? [];
  }

  async createRetryConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('retrys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRetryError(error.message);
    return result;
  }

  async updateRetryConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('retrys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRetryError(error.message);
    return result;
  }

  async deleteRetryConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('retrys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRetryError(error.message);
  }

  async getTimeoutConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('timeouts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTimeoutConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('timeouts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTimeoutError(error.message);
    return data ?? [];
  }

  async createTimeoutConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('timeouts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTimeoutError(error.message);
    return result;
  }

  async updateTimeoutConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('timeouts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTimeoutError(error.message);
    return result;
  }

  async deleteTimeoutConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('timeouts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTimeoutError(error.message);
  }

  async getFailoverConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('failovers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFailoverConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('failovers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFailoverError(error.message);
    return data ?? [];
  }

  async createFailoverConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('failovers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFailoverError(error.message);
    return result;
  }

  async updateFailoverConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('failovers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFailoverError(error.message);
    return result;
  }

  async deleteFailoverConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('failovers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFailoverError(error.message);
  }

  async getCircuitBreakerConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('circuit_breakers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCircuitBreakerConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('circuit_breakers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCircuitBreakerError(error.message);
    return data ?? [];
  }

  async createCircuitBreakerConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('circuit_breakers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCircuitBreakerError(error.message);
    return result;
  }

  async updateCircuitBreakerConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('circuit_breakers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCircuitBreakerError(error.message);
    return result;
  }

  async deleteCircuitBreakerConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('circuit_breakers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCircuitBreakerError(error.message);
  }

  async getBulkheadConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('bulkheads')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBulkheadConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('bulkheads').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBulkheadError(error.message);
    return data ?? [];
  }

  async createBulkheadConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('bulkheads')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBulkheadError(error.message);
    return result;
  }

  async updateBulkheadConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('bulkheads')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBulkheadError(error.message);
    return result;
  }

  async deleteBulkheadConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('bulkheads')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBulkheadError(error.message);
  }

  async getMonitoringConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('monitorings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMonitoringConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('monitorings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMonitoringError(error.message);
    return data ?? [];
  }

  async createMonitoringConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('monitorings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMonitoringError(error.message);
    return result;
  }

  async updateMonitoringConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('monitorings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMonitoringError(error.message);
    return result;
  }

  async deleteMonitoringConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('monitorings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMonitoringError(error.message);
  }

  async getAlertingConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('alertings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAlertingConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('alertings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAlertingError(error.message);
    return data ?? [];
  }

  async createAlertingConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('alertings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAlertingError(error.message);
    return result;
  }

  async updateAlertingConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('alertings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAlertingError(error.message);
    return result;
  }

  async deleteAlertingConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('alertings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAlertingError(error.message);
  }

  async getAlertChannel(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('alert_channels')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAlertChannel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('alert_channels').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAlertChannelError(error.message);
    return data ?? [];
  }

  async createAlertChannel(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('alert_channels')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAlertChannelError(error.message);
    return result;
  }

  async updateAlertChannel(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('alert_channels')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAlertChannelError(error.message);
    return result;
  }

  async deleteAlertChannel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('alert_channels')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAlertChannelError(error.message);
  }

  async getAlertRule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('alert_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAlertRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('alert_rules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAlertRuleError(error.message);
    return data ?? [];
  }

  async createAlertRule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('alert_rules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAlertRuleError(error.message);
    return result;
  }

  async updateAlertRule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('alert_rules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAlertRuleError(error.message);
    return result;
  }

  async deleteAlertRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('alert_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAlertRuleError(error.message);
  }

  async getEscalationPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('escalation_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEscalationPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('escalation_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEscalationPolicyError(error.message);
    return data ?? [];
  }

  async createEscalationPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('escalation_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEscalationPolicyError(error.message);
    return result;
  }

  async updateEscalationPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('escalation_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEscalationPolicyError(error.message);
    return result;
  }

  async deleteEscalationPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('escalation_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEscalationPolicyError(error.message);
  }

  async getEscalationStep(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('escalation_steps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEscalationStep(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('escalation_steps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEscalationStepError(error.message);
    return data ?? [];
  }

  async createEscalationStep(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('escalation_steps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEscalationStepError(error.message);
    return result;
  }

  async updateEscalationStep(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('escalation_steps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEscalationStepError(error.message);
    return result;
  }

  async deleteEscalationStep(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('escalation_steps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEscalationStepError(error.message);
  }

  async getLoggingConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('loggings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLoggingConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('loggings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLoggingError(error.message);
    return data ?? [];
  }

  async createLoggingConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('loggings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLoggingError(error.message);
    return result;
  }

  async updateLoggingConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('loggings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLoggingError(error.message);
    return result;
  }

  async deleteLoggingConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('loggings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLoggingError(error.message);
  }

  async getTracingConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('tracings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTracingConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('tracings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTracingError(error.message);
    return data ?? [];
  }

  async createTracingConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('tracings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTracingError(error.message);
    return result;
  }

  async updateTracingConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('tracings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTracingError(error.message);
    return result;
  }

  async deleteTracingConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('tracings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTracingError(error.message);
  }

  async getComplianceConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('compliances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComplianceConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('compliances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComplianceError(error.message);
    return data ?? [];
  }

  async createComplianceConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('compliances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComplianceError(error.message);
    return result;
  }

  async updateComplianceConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('compliances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComplianceError(error.message);
    return result;
  }

  async deleteComplianceConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('compliances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComplianceError(error.message);
  }

  async getAuditConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAuditConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAuditError(error.message);
    return data ?? [];
  }

  async createAuditConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAuditError(error.message);
    return result;
  }

  async updateAuditConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAuditError(error.message);
    return result;
  }

  async deleteAuditConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAuditError(error.message);
  }

  async getSecurityConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('securitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecurityConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('securitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecurityError(error.message);
    return data ?? [];
  }

  async createSecurityConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('securitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecurityError(error.message);
    return result;
  }

  async updateSecurityConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('securitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecurityError(error.message);
    return result;
  }

  async deleteSecurityConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('securitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecurityError(error.message);
  }

  async getEncryptionConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('encryptioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEncryptionConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('encryptioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEncryptionError(error.message);
    return data ?? [];
  }

  async createEncryptionConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('encryptioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEncryptionError(error.message);
    return result;
  }

  async updateEncryptionConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('encryptioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEncryptionError(error.message);
    return result;
  }

  async deleteEncryptionConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('encryptioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEncryptionError(error.message);
  }

  async getTransformationConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('transformatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTransformationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('transformatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTransformationError(error.message);
    return data ?? [];
  }

  async createTransformationConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('transformatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTransformationError(error.message);
    return result;
  }

  async updateTransformationConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('transformatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTransformationError(error.message);
    return result;
  }

  async deleteTransformationConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('transformatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTransformationError(error.message);
  }

  async getMappingConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('mappings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMappingConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('mappings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMappingError(error.message);
    return data ?? [];
  }

  async createMappingConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('mappings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMappingError(error.message);
    return result;
  }

  async updateMappingConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('mappings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMappingError(error.message);
    return result;
  }

  async deleteMappingConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('mappings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMappingError(error.message);
  }

  async getEnrichmentConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('enrichments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnrichmentConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('enrichments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnrichmentError(error.message);
    return data ?? [];
  }

  async createEnrichmentConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('enrichments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnrichmentError(error.message);
    return result;
  }

  async updateEnrichmentConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('enrichments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnrichmentError(error.message);
    return result;
  }

  async deleteEnrichmentConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('enrichments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnrichmentError(error.message);
  }

  async getEnrichmentProvider(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('enrichment_providers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnrichmentProvider(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('enrichment_providers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnrichmentProviderError(error.message);
    return data ?? [];
  }

  async createEnrichmentProvider(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('enrichment_providers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnrichmentProviderError(error.message);
    return result;
  }

  async updateEnrichmentProvider(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('enrichment_providers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnrichmentProviderError(error.message);
    return result;
  }

  async deleteEnrichmentProvider(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('enrichment_providers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnrichmentProviderError(error.message);
  }

  async getConnectorDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorDashboardError(error.message);
    return data ?? [];
  }

  async createConnectorDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorDashboardError(error.message);
    return result;
  }

  async updateConnectorDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorDashboardError(error.message);
    return result;
  }

  async deleteConnectorDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorDashboardError(error.message);
  }

  async getDashboardWidget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('dashboard_widgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDashboardWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('dashboard_widgets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDashboardWidgetError(error.message);
    return data ?? [];
  }

  async createDashboardWidget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dashboard_widgets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDashboardWidgetError(error.message);
    return result;
  }

  async updateDashboardWidget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('dashboard_widgets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDashboardWidgetError(error.message);
    return result;
  }

  async deleteDashboardWidget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dashboard_widgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDashboardWidgetError(error.message);
  }

  async getWidgetPosition(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('widget_positioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWidgetPosition(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('widget_positioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWidgetPositionError(error.message);
    return data ?? [];
  }

  async createWidgetPosition(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('widget_positioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWidgetPositionError(error.message);
    return result;
  }

  async updateWidgetPosition(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('widget_positioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWidgetPositionError(error.message);
    return result;
  }

  async deleteWidgetPosition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('widget_positioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWidgetPositionError(error.message);
  }

  async getWidgetSize(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('widget_sizes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWidgetSize(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('widget_sizes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWidgetSizeError(error.message);
    return data ?? [];
  }

  async createWidgetSize(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('widget_sizes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWidgetSizeError(error.message);
    return result;
  }

  async updateWidgetSize(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('widget_sizes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWidgetSizeError(error.message);
    return result;
  }

  async deleteWidgetSize(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('widget_sizes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWidgetSizeError(error.message);
  }

  async getDashboardLayout(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('dashboard_layouts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDashboardLayout(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('dashboard_layouts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDashboardLayoutError(error.message);
    return data ?? [];
  }

  async createDashboardLayout(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dashboard_layouts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDashboardLayoutError(error.message);
    return result;
  }

  async updateDashboardLayout(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('dashboard_layouts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDashboardLayoutError(error.message);
    return result;
  }

  async deleteDashboardLayout(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dashboard_layouts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDashboardLayoutError(error.message);
  }

  async getConnectorReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorReportError(error.message);
    return data ?? [];
  }

  async createConnectorReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorReportError(error.message);
    return result;
  }

  async updateConnectorReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorReportError(error.message);
    return result;
  }

  async deleteConnectorReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorReportError(error.message);
  }

  async getReportData(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('report_datas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listReportData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('report_datas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudReportDataError(error.message);
    return data ?? [];
  }

  async createReportData(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('report_datas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudReportDataError(error.message);
    return result;
  }

  async updateReportData(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('report_datas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudReportDataError(error.message);
    return result;
  }

  async deleteReportData(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('report_datas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudReportDataError(error.message);
  }

  async getReportSummary(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('report_summarys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listReportSummary(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('report_summarys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudReportSummaryError(error.message);
    return data ?? [];
  }

  async createReportSummary(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('report_summarys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudReportSummaryError(error.message);
    return result;
  }

  async updateReportSummary(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('report_summarys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudReportSummaryError(error.message);
    return result;
  }

  async deleteReportSummary(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('report_summarys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudReportSummaryError(error.message);
  }

  async getReportDetail(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('report_details')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listReportDetail(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('report_details').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudReportDetailError(error.message);
    return data ?? [];
  }

  async createReportDetail(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('report_details')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudReportDetailError(error.message);
    return result;
  }

  async updateReportDetail(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('report_details')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudReportDetailError(error.message);
    return result;
  }

  async deleteReportDetail(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('report_details')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudReportDetailError(error.message);
  }

  async getReportChart(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('report_charts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listReportChart(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('report_charts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudReportChartError(error.message);
    return data ?? [];
  }

  async createReportChart(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('report_charts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudReportChartError(error.message);
    return result;
  }

  async updateReportChart(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('report_charts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudReportChartError(error.message);
    return result;
  }

  async deleteReportChart(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('report_charts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudReportChartError(error.message);
  }

  async getConnectorAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorAnalyticsError(error.message);
    return data ?? [];
  }

  async createConnectorAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorAnalyticsError(error.message);
    return result;
  }

  async updateConnectorAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorAnalyticsError(error.message);
    return result;
  }

  async deleteConnectorAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorAnalyticsError(error.message);
  }

  async getAnalyticsMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('analytics_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAnalyticsMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('analytics_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAnalyticsMetricsError(error.message);
    return data ?? [];
  }

  async createAnalyticsMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('analytics_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsMetricsError(error.message);
    return result;
  }

  async updateAnalyticsMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('analytics_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsMetricsError(error.message);
    return result;
  }

  async deleteAnalyticsMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('analytics_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAnalyticsMetricsError(error.message);
  }

  async getAnalyticsTrend(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('analytics_trends')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAnalyticsTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('analytics_trends').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAnalyticsTrendError(error.message);
    return data ?? [];
  }

  async createAnalyticsTrend(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('analytics_trends')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsTrendError(error.message);
    return result;
  }

  async updateAnalyticsTrend(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('analytics_trends')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsTrendError(error.message);
    return result;
  }

  async deleteAnalyticsTrend(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('analytics_trends')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAnalyticsTrendError(error.message);
  }

  async getAnalyticsInsight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('analytics_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAnalyticsInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('analytics_insights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAnalyticsInsightError(error.message);
    return data ?? [];
  }

  async createAnalyticsInsight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('analytics_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsInsightError(error.message);
    return result;
  }

  async updateAnalyticsInsight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('analytics_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsInsightError(error.message);
    return result;
  }

  async deleteAnalyticsInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('analytics_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAnalyticsInsightError(error.message);
  }

  async getConnectorAI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_ais')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_ais').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorAIError(error.message);
    return data ?? [];
  }

  async createConnectorAI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_ais')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorAIError(error.message);
    return result;
  }

  async updateConnectorAI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_ais')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorAIError(error.message);
    return result;
  }

  async deleteConnectorAI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_ais')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorAIError(error.message);
  }

  async getConnectorAIConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_ais')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorAIConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_ais').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorAIError(error.message);
    return data ?? [];
  }

  async createConnectorAIConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_ais')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorAIError(error.message);
    return result;
  }

  async updateConnectorAIConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_ais')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorAIError(error.message);
    return result;
  }

  async deleteConnectorAIConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_ais')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorAIError(error.message);
  }

  async getConnectorAIModel(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_aimodels')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_aimodels').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorAIModelError(error.message);
    return data ?? [];
  }

  async createConnectorAIModel(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_aimodels')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorAIModelError(error.message);
    return result;
  }

  async updateConnectorAIModel(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_aimodels')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorAIModelError(error.message);
    return result;
  }

  async deleteConnectorAIModel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_aimodels')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorAIModelError(error.message);
  }

  async getConnectorAIInsight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_aiinsights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorAIInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_aiinsights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorAIInsightError(error.message);
    return data ?? [];
  }

  async createConnectorAIInsight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_aiinsights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorAIInsightError(error.message);
    return result;
  }

  async updateConnectorAIInsight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_aiinsights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorAIInsightError(error.message);
    return result;
  }

  async deleteConnectorAIInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_aiinsights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorAIInsightError(error.message);
  }

  async getConnectorEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('connector_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConnectorEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('connector_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConnectorEventError(error.message);
    return data ?? [];
  }

  async createConnectorEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('connector_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConnectorEventError(error.message);
    return result;
  }

  async updateConnectorEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('connector_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConnectorEventError(error.message);
    return result;
  }

  async deleteConnectorEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('connector_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConnectorEventError(error.message);
  }

  async getEuropassCredentials(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('europass_credentialses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEuropassCredentials(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('europass_credentialses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEuropassCredentialsError(error.message);
    return data ?? [];
  }

  async createEuropassCredentials(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('europass_credentialses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEuropassCredentialsError(error.message);
    return result;
  }

  async updateEuropassCredentials(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('europass_credentialses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEuropassCredentialsError(error.message);
    return result;
  }

  async deleteEuropassCredentials(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('europass_credentialses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEuropassCredentialsError(error.message);
  }

}

export function createSearchModuleRepository(supabase: SupabaseClient): SearchModuleRepository {
  return new SearchModuleRepositoryImpl(supabase);
}


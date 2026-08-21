import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudAlertEscalationError, EduCloudAlertIncidentError, EduCloudAlertRuleError, EduCloudCacheError, EduCloudCacheMetricsError, EduCloudCachePolicyError, EduCloudCapacityAlertError, EduCloudCapacityForecastError, EduCloudCapacityPlanError, EduCloudCertificateAuditError, EduCloudCircuitBreakerError, EduCloudCircuitBreakerEventError, EduCloudCircuitBreakerMetricsError, EduCloudCircuitBreakerStateHistoryError, EduCloudCloudAlertingError, EduCloudCloudCacheError, EduCloudCloudCapacityError, EduCloudCloudDeploymentError, EduCloudCloudDNSError, EduCloudCloudEventError, EduCloudCloudFeatureError, EduCloudCloudFirewallError, EduCloudCloudGovernanceError, EduCloudCloudLoggingError, EduCloudCloudObservabilityError, EduCloudCloudPluginError, EduCloudCloudProxyError, EduCloudCloudQueueError, EduCloudCloudScalingError, EduCloudCloudSchedulerError, EduCloudCloudSearchError, EduCloudCloudServiceDiscoveryError, EduCloudCloudSSLError, EduCloudCloudTracingError, EduCloudCloudTrafficError, EduCloudCloudWorkflowError, EduCloudContainerDeploymentError, EduCloudContainerImageError, EduCloudContainerRegistryError, EduCloudDeploymentMetricsError, EduCloudDeploymentPlanError, EduCloudDeploymentRunError, EduCloudDNSError, EduCloudDNSMetricsError, EduCloudDNSTransferError, EduCloudDNSZoneError, EduCloudEventMetricsError, EduCloudEventSourceError, EduCloudEventTargetError, EduCloudFeatureFlagError, EduCloudFeatureMetricsError, EduCloudFeatureTargetError, EduCloudFirewallAuditError, EduCloudFirewallLogError, EduCloudFirewallPolicyError, EduCloudFirewallRuleError, EduCloudGovernanceAuditError, EduCloudGovernancePolicyError, EduCloudLogError, EduCloudLogQueryError, EduCloudMeshServiceError, EduCloudMeshTrafficError, EduCloudNetworkInterfaceError, EduCloudObservabilityAlertError, EduCloudObservabilityError, EduCloudObservabilityMetricError, EduCloudPluginError, EduCloudPluginMetricsError, EduCloudPluginVersionError, EduCloudProxyConnectionError, EduCloudProxyMetricsError, EduCloudProxyPolicyError, EduCloudProxyRouteError, EduCloudQueueConsumerError, EduCloudQueueMessageError, EduCloudQueueMetricsError, EduCloudScalingEventError, EduCloudScalingMetricsError, EduCloudSchedulerJobError, EduCloudSchedulerRunError, EduCloudSearchIndexError, EduCloudSearchMetricsError, EduCloudSearchQueryError, EduCloudServiceHealthError, EduCloudServiceInstanceError, EduCloudServiceMeshError, EduCloudServiceMeshPolicyError, EduCloudServiceMetricsError, EduCloudSSLAuditError, EduCloudSSLCertificateChainError, EduCloudSSLCertificateError, EduCloudSSLRenewalError, EduCloudTraceMetricsError, EduCloudTraceServiceError, EduCloudTraceSpanError, EduCloudTrafficMetricsError, EduCloudTrafficMirrorError, EduCloudTrafficRouteError, EduCloudWorkflowMetricsError, EduCloudWorkflowRunError, EduCloudWorkflowStepError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface TwinModuleRepository {

  // =============================================================================
  // CLOUD-GLOBAL
  // =============================================================================
  getCertificateAudit(schoolId: string, id: string): Promise<any | null>;
  listCertificateAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCertificateAudit(schoolId: string, data: any): Promise<any>;
  updateCertificateAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteCertificateAudit(schoolId: string, id: string): Promise<void>;

  getCloudDNS(schoolId: string, id: string): Promise<any | null>;
  listCloudDNS(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudDNS(schoolId: string, data: any): Promise<any>;
  updateCloudDNS(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudDNS(schoolId: string, id: string): Promise<void>;

  getDNSZone(schoolId: string, id: string): Promise<any | null>;
  listDNSZone(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDNSZone(schoolId: string, data: any): Promise<any>;
  updateDNSZone(schoolId: string, id: string, data: any): Promise<any>;
  deleteDNSZone(schoolId: string, id: string): Promise<void>;

  getDNSRecord(schoolId: string, id: string): Promise<any | null>;
  listDNSRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDNSRecord(schoolId: string, data: any): Promise<any>;
  updateDNSRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteDNSRecord(schoolId: string, id: string): Promise<void>;

  getDNSMetrics(schoolId: string, id: string): Promise<any | null>;
  listDNSMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDNSMetrics(schoolId: string, data: any): Promise<any>;
  updateDNSMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteDNSMetrics(schoolId: string, id: string): Promise<void>;

  getCloudSSL(schoolId: string, id: string): Promise<any | null>;
  listCloudSSL(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudSSL(schoolId: string, data: any): Promise<any>;
  updateCloudSSL(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudSSL(schoolId: string, id: string): Promise<void>;

  getSSLCertificate(schoolId: string, id: string): Promise<any | null>;
  listSSLCertificate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSSLCertificate(schoolId: string, data: any): Promise<any>;
  updateSSLCertificate(schoolId: string, id: string, data: any): Promise<any>;
  deleteSSLCertificate(schoolId: string, id: string): Promise<void>;

  getSSLRenewal(schoolId: string, id: string): Promise<any | null>;
  listSSLRenewal(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSSLRenewal(schoolId: string, data: any): Promise<any>;
  updateSSLRenewal(schoolId: string, id: string, data: any): Promise<any>;
  deleteSSLRenewal(schoolId: string, id: string): Promise<void>;

  getSSLAudit(schoolId: string, id: string): Promise<any | null>;
  listSSLAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSSLAudit(schoolId: string, data: any): Promise<any>;
  updateSSLAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteSSLAudit(schoolId: string, id: string): Promise<void>;

  getCloudProxy(schoolId: string, id: string): Promise<any | null>;
  listCloudProxy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudProxy(schoolId: string, data: any): Promise<any>;
  updateCloudProxy(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudProxy(schoolId: string, id: string): Promise<void>;

  getProxyRoute(schoolId: string, id: string): Promise<any | null>;
  listProxyRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createProxyRoute(schoolId: string, data: any): Promise<any>;
  updateProxyRoute(schoolId: string, id: string, data: any): Promise<any>;
  deleteProxyRoute(schoolId: string, id: string): Promise<void>;

  getProxyPolicy(schoolId: string, id: string): Promise<any | null>;
  listProxyPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createProxyPolicy(schoolId: string, data: any): Promise<any>;
  updateProxyPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteProxyPolicy(schoolId: string, id: string): Promise<void>;

  getProxyMetrics(schoolId: string, id: string): Promise<any | null>;
  listProxyMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createProxyMetrics(schoolId: string, data: any): Promise<any>;
  updateProxyMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteProxyMetrics(schoolId: string, id: string): Promise<void>;

  getCloudFirewall(schoolId: string, id: string): Promise<any | null>;
  listCloudFirewall(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudFirewall(schoolId: string, data: any): Promise<any>;
  updateCloudFirewall(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudFirewall(schoolId: string, id: string): Promise<void>;

  getFirewallRule(schoolId: string, id: string): Promise<any | null>;
  listFirewallRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFirewallRule(schoolId: string, data: any): Promise<any>;
  updateFirewallRule(schoolId: string, id: string, data: any): Promise<any>;
  deleteFirewallRule(schoolId: string, id: string): Promise<void>;

  getFirewallPolicy(schoolId: string, id: string): Promise<any | null>;
  listFirewallPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFirewallPolicy(schoolId: string, data: any): Promise<any>;
  updateFirewallPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteFirewallPolicy(schoolId: string, id: string): Promise<void>;

  getFirewallAudit(schoolId: string, id: string): Promise<any | null>;
  listFirewallAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFirewallAudit(schoolId: string, data: any): Promise<any>;
  updateFirewallAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteFirewallAudit(schoolId: string, id: string): Promise<void>;

  getCloudTraffic(schoolId: string, id: string): Promise<any | null>;
  listCloudTraffic(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudTraffic(schoolId: string, data: any): Promise<any>;
  updateCloudTraffic(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudTraffic(schoolId: string, id: string): Promise<void>;

  getTrafficRoute(schoolId: string, id: string): Promise<any | null>;
  listTrafficRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTrafficRoute(schoolId: string, data: any): Promise<any>;
  updateTrafficRoute(schoolId: string, id: string, data: any): Promise<any>;
  deleteTrafficRoute(schoolId: string, id: string): Promise<void>;

  getTrafficMetrics(schoolId: string, id: string): Promise<any | null>;
  listTrafficMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTrafficMetrics(schoolId: string, data: any): Promise<any>;
  updateTrafficMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteTrafficMetrics(schoolId: string, id: string): Promise<void>;

  getCloudServiceDiscovery(schoolId: string, id: string): Promise<any | null>;
  listCloudServiceDiscovery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudServiceDiscovery(schoolId: string, data: any): Promise<any>;
  updateCloudServiceDiscovery(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudServiceDiscovery(schoolId: string, id: string): Promise<void>;

  getServiceInstance(schoolId: string, id: string): Promise<any | null>;
  listServiceInstance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createServiceInstance(schoolId: string, data: any): Promise<any>;
  updateServiceInstance(schoolId: string, id: string, data: any): Promise<any>;
  deleteServiceInstance(schoolId: string, id: string): Promise<void>;

  getServiceHealth(schoolId: string, id: string): Promise<any | null>;
  listServiceHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createServiceHealth(schoolId: string, data: any): Promise<any>;
  updateServiceHealth(schoolId: string, id: string, data: any): Promise<any>;
  deleteServiceHealth(schoolId: string, id: string): Promise<void>;

  getServiceMetrics(schoolId: string, id: string): Promise<any | null>;
  listServiceMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createServiceMetrics(schoolId: string, data: any): Promise<any>;
  updateServiceMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteServiceMetrics(schoolId: string, id: string): Promise<void>;

  getCloudCapacity(schoolId: string, id: string): Promise<any | null>;
  listCloudCapacity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudCapacity(schoolId: string, data: any): Promise<any>;
  updateCloudCapacity(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudCapacity(schoolId: string, id: string): Promise<void>;

  getCapacityPlan(schoolId: string, id: string): Promise<any | null>;
  listCapacityPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityPlan(schoolId: string, data: any): Promise<any>;
  updateCapacityPlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityPlan(schoolId: string, id: string): Promise<void>;

  getCapacityAlert(schoolId: string, id: string): Promise<any | null>;
  listCapacityAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityAlert(schoolId: string, data: any): Promise<any>;
  updateCapacityAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityAlert(schoolId: string, id: string): Promise<void>;

  getCapacityForecast(schoolId: string, id: string): Promise<any | null>;
  listCapacityForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityForecast(schoolId: string, data: any): Promise<any>;
  updateCapacityForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityForecast(schoolId: string, id: string): Promise<void>;

  getCloudDeployment(schoolId: string, id: string): Promise<any | null>;
  listCloudDeployment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudDeployment(schoolId: string, data: any): Promise<any>;
  updateCloudDeployment(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudDeployment(schoolId: string, id: string): Promise<void>;

  getDeploymentPlan(schoolId: string, id: string): Promise<any | null>;
  listDeploymentPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDeploymentPlan(schoolId: string, data: any): Promise<any>;
  updateDeploymentPlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteDeploymentPlan(schoolId: string, id: string): Promise<void>;

  getDeploymentRun(schoolId: string, id: string): Promise<any | null>;
  listDeploymentRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDeploymentRun(schoolId: string, data: any): Promise<any>;
  updateDeploymentRun(schoolId: string, id: string, data: any): Promise<any>;
  deleteDeploymentRun(schoolId: string, id: string): Promise<void>;

  getDeploymentMetrics(schoolId: string, id: string): Promise<any | null>;
  listDeploymentMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDeploymentMetrics(schoolId: string, data: any): Promise<any>;
  updateDeploymentMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteDeploymentMetrics(schoolId: string, id: string): Promise<void>;

  getCloudFeature(schoolId: string, id: string): Promise<any | null>;
  listCloudFeature(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudFeature(schoolId: string, data: any): Promise<any>;
  updateCloudFeature(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudFeature(schoolId: string, id: string): Promise<void>;

  getFeatureFlag(schoolId: string, id: string): Promise<any | null>;
  listFeatureFlag(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFeatureFlag(schoolId: string, data: any): Promise<any>;
  updateFeatureFlag(schoolId: string, id: string, data: any): Promise<any>;
  deleteFeatureFlag(schoolId: string, id: string): Promise<void>;

  getFeatureTarget(schoolId: string, id: string): Promise<any | null>;
  listFeatureTarget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFeatureTarget(schoolId: string, data: any): Promise<any>;
  updateFeatureTarget(schoolId: string, id: string, data: any): Promise<any>;
  deleteFeatureTarget(schoolId: string, id: string): Promise<void>;

  getFeatureMetrics(schoolId: string, id: string): Promise<any | null>;
  listFeatureMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFeatureMetrics(schoolId: string, data: any): Promise<any>;
  updateFeatureMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteFeatureMetrics(schoolId: string, id: string): Promise<void>;

  getCloudObservability(schoolId: string, id: string): Promise<any | null>;
  listCloudObservability(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudObservability(schoolId: string, data: any): Promise<any>;
  updateCloudObservability(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudObservability(schoolId: string, id: string): Promise<void>;

  getObservabilityConfig(schoolId: string, id: string): Promise<any | null>;
  listObservabilityConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createObservabilityConfig(schoolId: string, data: any): Promise<any>;
  updateObservabilityConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteObservabilityConfig(schoolId: string, id: string): Promise<void>;

  getObservabilityMetric(schoolId: string, id: string): Promise<any | null>;
  listObservabilityMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createObservabilityMetric(schoolId: string, data: any): Promise<any>;
  updateObservabilityMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteObservabilityMetric(schoolId: string, id: string): Promise<void>;

  getObservabilityAlert(schoolId: string, id: string): Promise<any | null>;
  listObservabilityAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createObservabilityAlert(schoolId: string, data: any): Promise<any>;
  updateObservabilityAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteObservabilityAlert(schoolId: string, id: string): Promise<void>;

  getCloudTracing(schoolId: string, id: string): Promise<any | null>;
  listCloudTracing(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudTracing(schoolId: string, data: any): Promise<any>;
  updateCloudTracing(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudTracing(schoolId: string, id: string): Promise<void>;

  getTraceSpan(schoolId: string, id: string): Promise<any | null>;
  listTraceSpan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTraceSpan(schoolId: string, data: any): Promise<any>;
  updateTraceSpan(schoolId: string, id: string, data: any): Promise<any>;
  deleteTraceSpan(schoolId: string, id: string): Promise<void>;

  getTraceService(schoolId: string, id: string): Promise<any | null>;
  listTraceService(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTraceService(schoolId: string, data: any): Promise<any>;
  updateTraceService(schoolId: string, id: string, data: any): Promise<any>;
  deleteTraceService(schoolId: string, id: string): Promise<void>;

  getTraceMetrics(schoolId: string, id: string): Promise<any | null>;
  listTraceMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTraceMetrics(schoolId: string, data: any): Promise<any>;
  updateTraceMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteTraceMetrics(schoolId: string, id: string): Promise<void>;

  getCloudAlerting(schoolId: string, id: string): Promise<any | null>;
  listCloudAlerting(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudAlerting(schoolId: string, data: any): Promise<any>;
  updateCloudAlerting(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudAlerting(schoolId: string, id: string): Promise<void>;

  getAlertRule(schoolId: string, id: string): Promise<any | null>;
  listAlertRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlertRule(schoolId: string, data: any): Promise<any>;
  updateAlertRule(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlertRule(schoolId: string, id: string): Promise<void>;

  getAlertIncident(schoolId: string, id: string): Promise<any | null>;
  listAlertIncident(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlertIncident(schoolId: string, data: any): Promise<any>;
  updateAlertIncident(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlertIncident(schoolId: string, id: string): Promise<void>;

  getAlertEscalation(schoolId: string, id: string): Promise<any | null>;
  listAlertEscalation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlertEscalation(schoolId: string, data: any): Promise<any>;
  updateAlertEscalation(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlertEscalation(schoolId: string, id: string): Promise<void>;

  getCloudScaling(schoolId: string, id: string): Promise<any | null>;
  listCloudScaling(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudScaling(schoolId: string, data: any): Promise<any>;
  updateCloudScaling(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudScaling(schoolId: string, id: string): Promise<void>;

  getScalingEvent(schoolId: string, id: string): Promise<any | null>;
  listScalingEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createScalingEvent(schoolId: string, data: any): Promise<any>;
  updateScalingEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteScalingEvent(schoolId: string, id: string): Promise<void>;

  getScalingMetrics(schoolId: string, id: string): Promise<any | null>;
  listScalingMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createScalingMetrics(schoolId: string, data: any): Promise<any>;
  updateScalingMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteScalingMetrics(schoolId: string, id: string): Promise<void>;

  getCloudQueue(schoolId: string, id: string): Promise<any | null>;
  listCloudQueue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudQueue(schoolId: string, data: any): Promise<any>;
  updateCloudQueue(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudQueue(schoolId: string, id: string): Promise<void>;

  getQueueMessage(schoolId: string, id: string): Promise<any | null>;
  listQueueMessage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createQueueMessage(schoolId: string, data: any): Promise<any>;
  updateQueueMessage(schoolId: string, id: string, data: any): Promise<any>;
  deleteQueueMessage(schoolId: string, id: string): Promise<void>;

  getQueueConsumer(schoolId: string, id: string): Promise<any | null>;
  listQueueConsumer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createQueueConsumer(schoolId: string, data: any): Promise<any>;
  updateQueueConsumer(schoolId: string, id: string, data: any): Promise<any>;
  deleteQueueConsumer(schoolId: string, id: string): Promise<void>;

  getQueueMetrics(schoolId: string, id: string): Promise<any | null>;
  listQueueMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createQueueMetrics(schoolId: string, data: any): Promise<any>;
  updateQueueMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteQueueMetrics(schoolId: string, id: string): Promise<void>;

  getCloudCache(schoolId: string, id: string): Promise<any | null>;
  listCloudCache(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudCache(schoolId: string, data: any): Promise<any>;
  updateCloudCache(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudCache(schoolId: string, id: string): Promise<void>;

  getCacheEntry(schoolId: string, id: string): Promise<any | null>;
  listCacheEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCacheEntry(schoolId: string, data: any): Promise<any>;
  updateCacheEntry(schoolId: string, id: string, data: any): Promise<any>;
  deleteCacheEntry(schoolId: string, id: string): Promise<void>;

  getCachePolicy(schoolId: string, id: string): Promise<any | null>;
  listCachePolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCachePolicy(schoolId: string, data: any): Promise<any>;
  updateCachePolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteCachePolicy(schoolId: string, id: string): Promise<void>;

  getCacheMetrics(schoolId: string, id: string): Promise<any | null>;
  listCacheMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCacheMetrics(schoolId: string, data: any): Promise<any>;
  updateCacheMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteCacheMetrics(schoolId: string, id: string): Promise<void>;

  getCloudSearch(schoolId: string, id: string): Promise<any | null>;
  listCloudSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudSearch(schoolId: string, data: any): Promise<any>;
  updateCloudSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudSearch(schoolId: string, id: string): Promise<void>;

  getSearchIndex(schoolId: string, id: string): Promise<any | null>;
  listSearchIndex(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchIndex(schoolId: string, data: any): Promise<any>;
  updateSearchIndex(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchIndex(schoolId: string, id: string): Promise<void>;

  getSearchQuery(schoolId: string, id: string): Promise<any | null>;
  listSearchQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchQuery(schoolId: string, data: any): Promise<any>;
  updateSearchQuery(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchQuery(schoolId: string, id: string): Promise<void>;

  getSearchMetrics(schoolId: string, id: string): Promise<any | null>;
  listSearchMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchMetrics(schoolId: string, data: any): Promise<any>;
  updateSearchMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchMetrics(schoolId: string, id: string): Promise<void>;

  getCloudEvent(schoolId: string, id: string): Promise<any | null>;
  listCloudEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudEvent(schoolId: string, data: any): Promise<any>;
  updateCloudEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudEvent(schoolId: string, id: string): Promise<void>;

  getEventSource(schoolId: string, id: string): Promise<any | null>;
  listEventSource(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEventSource(schoolId: string, data: any): Promise<any>;
  updateEventSource(schoolId: string, id: string, data: any): Promise<any>;
  deleteEventSource(schoolId: string, id: string): Promise<void>;

  getEventTarget(schoolId: string, id: string): Promise<any | null>;
  listEventTarget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEventTarget(schoolId: string, data: any): Promise<any>;
  updateEventTarget(schoolId: string, id: string, data: any): Promise<any>;
  deleteEventTarget(schoolId: string, id: string): Promise<void>;

  getEventMetrics(schoolId: string, id: string): Promise<any | null>;
  listEventMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEventMetrics(schoolId: string, data: any): Promise<any>;
  updateEventMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteEventMetrics(schoolId: string, id: string): Promise<void>;

  getCloudWorkflow(schoolId: string, id: string): Promise<any | null>;
  listCloudWorkflow(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudWorkflow(schoolId: string, data: any): Promise<any>;
  updateCloudWorkflow(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudWorkflow(schoolId: string, id: string): Promise<void>;

  getWorkflowStep(schoolId: string, id: string): Promise<any | null>;
  listWorkflowStep(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWorkflowStep(schoolId: string, data: any): Promise<any>;
  updateWorkflowStep(schoolId: string, id: string, data: any): Promise<any>;
  deleteWorkflowStep(schoolId: string, id: string): Promise<void>;

  getWorkflowRun(schoolId: string, id: string): Promise<any | null>;
  listWorkflowRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWorkflowRun(schoolId: string, data: any): Promise<any>;
  updateWorkflowRun(schoolId: string, id: string, data: any): Promise<any>;
  deleteWorkflowRun(schoolId: string, id: string): Promise<void>;

  getWorkflowMetrics(schoolId: string, id: string): Promise<any | null>;
  listWorkflowMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWorkflowMetrics(schoolId: string, data: any): Promise<any>;
  updateWorkflowMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteWorkflowMetrics(schoolId: string, id: string): Promise<void>;

  getCloudPlugin(schoolId: string, id: string): Promise<any | null>;
  listCloudPlugin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudPlugin(schoolId: string, data: any): Promise<any>;
  updateCloudPlugin(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudPlugin(schoolId: string, id: string): Promise<void>;

  getPluginConfig(schoolId: string, id: string): Promise<any | null>;
  listPluginConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPluginConfig(schoolId: string, data: any): Promise<any>;
  updatePluginConfig(schoolId: string, id: string, data: any): Promise<any>;
  deletePluginConfig(schoolId: string, id: string): Promise<void>;

  getPluginVersion(schoolId: string, id: string): Promise<any | null>;
  listPluginVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPluginVersion(schoolId: string, data: any): Promise<any>;
  updatePluginVersion(schoolId: string, id: string, data: any): Promise<any>;
  deletePluginVersion(schoolId: string, id: string): Promise<void>;

  getPluginMetrics(schoolId: string, id: string): Promise<any | null>;
  listPluginMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPluginMetrics(schoolId: string, data: any): Promise<any>;
  updatePluginMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deletePluginMetrics(schoolId: string, id: string): Promise<void>;

  getCircuitBreaker(schoolId: string, id: string): Promise<any | null>;
  listCircuitBreaker(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCircuitBreaker(schoolId: string, data: any): Promise<any>;
  updateCircuitBreaker(schoolId: string, id: string, data: any): Promise<any>;
  deleteCircuitBreaker(schoolId: string, id: string): Promise<void>;

  getCircuitBreakerEvent(schoolId: string, id: string): Promise<any | null>;
  listCircuitBreakerEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCircuitBreakerEvent(schoolId: string, data: any): Promise<any>;
  updateCircuitBreakerEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteCircuitBreakerEvent(schoolId: string, id: string): Promise<void>;

  getCircuitBreakerMetrics(schoolId: string, id: string): Promise<any | null>;
  listCircuitBreakerMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCircuitBreakerMetrics(schoolId: string, data: any): Promise<any>;
  updateCircuitBreakerMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteCircuitBreakerMetrics(schoolId: string, id: string): Promise<void>;

  getServiceMeshConfig(schoolId: string, id: string): Promise<any | null>;
  listServiceMeshConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createServiceMeshConfig(schoolId: string, data: any): Promise<any>;
  updateServiceMeshConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteServiceMeshConfig(schoolId: string, id: string): Promise<void>;

  getMeshService(schoolId: string, id: string): Promise<any | null>;
  listMeshService(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMeshService(schoolId: string, data: any): Promise<any>;
  updateMeshService(schoolId: string, id: string, data: any): Promise<any>;
  deleteMeshService(schoolId: string, id: string): Promise<void>;

  getMeshTraffic(schoolId: string, id: string): Promise<any | null>;
  listMeshTraffic(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMeshTraffic(schoolId: string, data: any): Promise<any>;
  updateMeshTraffic(schoolId: string, id: string, data: any): Promise<any>;
  deleteMeshTraffic(schoolId: string, id: string): Promise<void>;

  getContainerRegistry(schoolId: string, id: string): Promise<any | null>;
  listContainerRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createContainerRegistry(schoolId: string, data: any): Promise<any>;
  updateContainerRegistry(schoolId: string, id: string, data: any): Promise<any>;
  deleteContainerRegistry(schoolId: string, id: string): Promise<void>;

  getContainerImage(schoolId: string, id: string): Promise<any | null>;
  listContainerImage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createContainerImage(schoolId: string, data: any): Promise<any>;
  updateContainerImage(schoolId: string, id: string, data: any): Promise<any>;
  deleteContainerImage(schoolId: string, id: string): Promise<void>;

  getContainerDeployment(schoolId: string, id: string): Promise<any | null>;
  listContainerDeployment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createContainerDeployment(schoolId: string, data: any): Promise<any>;
  updateContainerDeployment(schoolId: string, id: string, data: any): Promise<any>;
  deleteContainerDeployment(schoolId: string, id: string): Promise<void>;

  getCloudScheduler(schoolId: string, id: string): Promise<any | null>;
  listCloudScheduler(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudScheduler(schoolId: string, data: any): Promise<any>;
  updateCloudScheduler(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudScheduler(schoolId: string, id: string): Promise<void>;

  getSchedulerJob(schoolId: string, id: string): Promise<any | null>;
  listSchedulerJob(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchedulerJob(schoolId: string, data: any): Promise<any>;
  updateSchedulerJob(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchedulerJob(schoolId: string, id: string): Promise<void>;

  getSchedulerRun(schoolId: string, id: string): Promise<any | null>;
  listSchedulerRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchedulerRun(schoolId: string, data: any): Promise<any>;
  updateSchedulerRun(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchedulerRun(schoolId: string, id: string): Promise<void>;

  getCloudLogging(schoolId: string, id: string): Promise<any | null>;
  listCloudLogging(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudLogging(schoolId: string, data: any): Promise<any>;
  updateCloudLogging(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudLogging(schoolId: string, id: string): Promise<void>;

  getLogEntry(schoolId: string, id: string): Promise<any | null>;
  listLogEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLogEntry(schoolId: string, data: any): Promise<any>;
  updateLogEntry(schoolId: string, id: string, data: any): Promise<any>;
  deleteLogEntry(schoolId: string, id: string): Promise<void>;

  getLogQuery(schoolId: string, id: string): Promise<any | null>;
  listLogQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLogQuery(schoolId: string, data: any): Promise<any>;
  updateLogQuery(schoolId: string, id: string, data: any): Promise<any>;
  deleteLogQuery(schoolId: string, id: string): Promise<void>;

  getCircuitBreakerStateHistory(schoolId: string, id: string): Promise<any | null>;
  listCircuitBreakerStateHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCircuitBreakerStateHistory(schoolId: string, data: any): Promise<any>;
  updateCircuitBreakerStateHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteCircuitBreakerStateHistory(schoolId: string, id: string): Promise<void>;

  getNetworkInterface(schoolId: string, id: string): Promise<any | null>;
  listNetworkInterface(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNetworkInterface(schoolId: string, data: any): Promise<any>;
  updateNetworkInterface(schoolId: string, id: string, data: any): Promise<any>;
  deleteNetworkInterface(schoolId: string, id: string): Promise<void>;

  getSSLCertificateChain(schoolId: string, id: string): Promise<any | null>;
  listSSLCertificateChain(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSSLCertificateChain(schoolId: string, data: any): Promise<any>;
  updateSSLCertificateChain(schoolId: string, id: string, data: any): Promise<any>;
  deleteSSLCertificateChain(schoolId: string, id: string): Promise<void>;

  getDNSTransfer(schoolId: string, id: string): Promise<any | null>;
  listDNSTransfer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDNSTransfer(schoolId: string, data: any): Promise<any>;
  updateDNSTransfer(schoolId: string, id: string, data: any): Promise<any>;
  deleteDNSTransfer(schoolId: string, id: string): Promise<void>;

  getProxyConnection(schoolId: string, id: string): Promise<any | null>;
  listProxyConnection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createProxyConnection(schoolId: string, data: any): Promise<any>;
  updateProxyConnection(schoolId: string, id: string, data: any): Promise<any>;
  deleteProxyConnection(schoolId: string, id: string): Promise<void>;

  getFirewallLog(schoolId: string, id: string): Promise<any | null>;
  listFirewallLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFirewallLog(schoolId: string, data: any): Promise<any>;
  updateFirewallLog(schoolId: string, id: string, data: any): Promise<any>;
  deleteFirewallLog(schoolId: string, id: string): Promise<void>;

  getTrafficMirror(schoolId: string, id: string): Promise<any | null>;
  listTrafficMirror(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTrafficMirror(schoolId: string, data: any): Promise<any>;
  updateTrafficMirror(schoolId: string, id: string, data: any): Promise<any>;
  deleteTrafficMirror(schoolId: string, id: string): Promise<void>;

  getServiceMeshPolicy(schoolId: string, id: string): Promise<any | null>;
  listServiceMeshPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createServiceMeshPolicy(schoolId: string, data: any): Promise<any>;
  updateServiceMeshPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteServiceMeshPolicy(schoolId: string, id: string): Promise<void>;

  getCloudGovernance(schoolId: string, id: string): Promise<any | null>;
  listCloudGovernance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCloudGovernance(schoolId: string, data: any): Promise<any>;
  updateCloudGovernance(schoolId: string, id: string, data: any): Promise<any>;
  deleteCloudGovernance(schoolId: string, id: string): Promise<void>;

  getGovernancePolicy(schoolId: string, id: string): Promise<any | null>;
  listGovernancePolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernancePolicy(schoolId: string, data: any): Promise<any>;
  updateGovernancePolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernancePolicy(schoolId: string, id: string): Promise<void>;

  getGovernanceAudit(schoolId: string, id: string): Promise<any | null>;
  listGovernanceAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernanceAudit(schoolId: string, data: any): Promise<any>;
  updateGovernanceAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernanceAudit(schoolId: string, id: string): Promise<void>;

}

class TwinModuleRepositoryImpl implements TwinModuleRepository {
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
  async getCertificateAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('certificate_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCertificateAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('certificate_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCertificateAuditError(error.message);
    return data ?? [];
  }

  async createCertificateAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('certificate_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCertificateAuditError(error.message);
    return result;
  }

  async updateCertificateAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('certificate_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCertificateAuditError(error.message);
    return result;
  }

  async deleteCertificateAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('certificate_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCertificateAuditError(error.message);
  }

  async getCloudDNS(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_dnses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudDNS(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_dnses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudDNSError(error.message);
    return data ?? [];
  }

  async createCloudDNS(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_dnses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudDNSError(error.message);
    return result;
  }

  async updateCloudDNS(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_dnses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudDNSError(error.message);
    return result;
  }

  async deleteCloudDNS(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_dnses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudDNSError(error.message);
  }

  async getDNSZone(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('dnszones')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDNSZone(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('dnszones').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDNSZoneError(error.message);
    return data ?? [];
  }

  async createDNSZone(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dnszones')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDNSZoneError(error.message);
    return result;
  }

  async updateDNSZone(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('dnszones')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDNSZoneError(error.message);
    return result;
  }

  async deleteDNSZone(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dnszones')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDNSZoneError(error.message);
  }

  async getDNSRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('dnses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDNSRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('dnses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDNSError(error.message);
    return data ?? [];
  }

  async createDNSRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dnses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDNSError(error.message);
    return result;
  }

  async updateDNSRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('dnses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDNSError(error.message);
    return result;
  }

  async deleteDNSRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dnses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDNSError(error.message);
  }

  async getDNSMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('dnsmetricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDNSMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('dnsmetricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDNSMetricsError(error.message);
    return data ?? [];
  }

  async createDNSMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dnsmetricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDNSMetricsError(error.message);
    return result;
  }

  async updateDNSMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('dnsmetricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDNSMetricsError(error.message);
    return result;
  }

  async deleteDNSMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dnsmetricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDNSMetricsError(error.message);
  }

  async getCloudSSL(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_ssls')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudSSL(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_ssls').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudSSLError(error.message);
    return data ?? [];
  }

  async createCloudSSL(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_ssls')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudSSLError(error.message);
    return result;
  }

  async updateCloudSSL(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_ssls')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudSSLError(error.message);
    return result;
  }

  async deleteCloudSSL(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_ssls')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudSSLError(error.message);
  }

  async getSSLCertificate(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sslcertificates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSSLCertificate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sslcertificates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSSLCertificateError(error.message);
    return data ?? [];
  }

  async createSSLCertificate(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sslcertificates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSSLCertificateError(error.message);
    return result;
  }

  async updateSSLCertificate(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sslcertificates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSSLCertificateError(error.message);
    return result;
  }

  async deleteSSLCertificate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sslcertificates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSSLCertificateError(error.message);
  }

  async getSSLRenewal(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sslrenewals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSSLRenewal(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sslrenewals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSSLRenewalError(error.message);
    return data ?? [];
  }

  async createSSLRenewal(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sslrenewals')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSSLRenewalError(error.message);
    return result;
  }

  async updateSSLRenewal(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sslrenewals')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSSLRenewalError(error.message);
    return result;
  }

  async deleteSSLRenewal(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sslrenewals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSSLRenewalError(error.message);
  }

  async getSSLAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sslaudits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSSLAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sslaudits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSSLAuditError(error.message);
    return data ?? [];
  }

  async createSSLAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sslaudits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSSLAuditError(error.message);
    return result;
  }

  async updateSSLAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sslaudits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSSLAuditError(error.message);
    return result;
  }

  async deleteSSLAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sslaudits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSSLAuditError(error.message);
  }

  async getCloudProxy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_proxys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudProxy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_proxys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudProxyError(error.message);
    return data ?? [];
  }

  async createCloudProxy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_proxys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudProxyError(error.message);
    return result;
  }

  async updateCloudProxy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_proxys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudProxyError(error.message);
    return result;
  }

  async deleteCloudProxy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_proxys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudProxyError(error.message);
  }

  async getProxyRoute(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('proxy_routes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listProxyRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('proxy_routes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudProxyRouteError(error.message);
    return data ?? [];
  }

  async createProxyRoute(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('proxy_routes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudProxyRouteError(error.message);
    return result;
  }

  async updateProxyRoute(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('proxy_routes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudProxyRouteError(error.message);
    return result;
  }

  async deleteProxyRoute(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('proxy_routes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudProxyRouteError(error.message);
  }

  async getProxyPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('proxy_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listProxyPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('proxy_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudProxyPolicyError(error.message);
    return data ?? [];
  }

  async createProxyPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('proxy_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudProxyPolicyError(error.message);
    return result;
  }

  async updateProxyPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('proxy_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudProxyPolicyError(error.message);
    return result;
  }

  async deleteProxyPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('proxy_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudProxyPolicyError(error.message);
  }

  async getProxyMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('proxy_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listProxyMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('proxy_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudProxyMetricsError(error.message);
    return data ?? [];
  }

  async createProxyMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('proxy_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudProxyMetricsError(error.message);
    return result;
  }

  async updateProxyMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('proxy_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudProxyMetricsError(error.message);
    return result;
  }

  async deleteProxyMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('proxy_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudProxyMetricsError(error.message);
  }

  async getCloudFirewall(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_firewalls')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudFirewall(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_firewalls').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudFirewallError(error.message);
    return data ?? [];
  }

  async createCloudFirewall(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_firewalls')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudFirewallError(error.message);
    return result;
  }

  async updateCloudFirewall(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_firewalls')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudFirewallError(error.message);
    return result;
  }

  async deleteCloudFirewall(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_firewalls')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudFirewallError(error.message);
  }

  async getFirewallRule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('firewall_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFirewallRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('firewall_rules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFirewallRuleError(error.message);
    return data ?? [];
  }

  async createFirewallRule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('firewall_rules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFirewallRuleError(error.message);
    return result;
  }

  async updateFirewallRule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('firewall_rules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFirewallRuleError(error.message);
    return result;
  }

  async deleteFirewallRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('firewall_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFirewallRuleError(error.message);
  }

  async getFirewallPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('firewall_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFirewallPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('firewall_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFirewallPolicyError(error.message);
    return data ?? [];
  }

  async createFirewallPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('firewall_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFirewallPolicyError(error.message);
    return result;
  }

  async updateFirewallPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('firewall_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFirewallPolicyError(error.message);
    return result;
  }

  async deleteFirewallPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('firewall_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFirewallPolicyError(error.message);
  }

  async getFirewallAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('firewall_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFirewallAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('firewall_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFirewallAuditError(error.message);
    return data ?? [];
  }

  async createFirewallAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('firewall_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFirewallAuditError(error.message);
    return result;
  }

  async updateFirewallAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('firewall_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFirewallAuditError(error.message);
    return result;
  }

  async deleteFirewallAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('firewall_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFirewallAuditError(error.message);
  }

  async getCloudTraffic(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_traffics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudTraffic(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_traffics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudTrafficError(error.message);
    return data ?? [];
  }

  async createCloudTraffic(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_traffics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudTrafficError(error.message);
    return result;
  }

  async updateCloudTraffic(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_traffics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudTrafficError(error.message);
    return result;
  }

  async deleteCloudTraffic(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_traffics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudTrafficError(error.message);
  }

  async getTrafficRoute(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('traffic_routes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTrafficRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('traffic_routes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTrafficRouteError(error.message);
    return data ?? [];
  }

  async createTrafficRoute(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('traffic_routes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTrafficRouteError(error.message);
    return result;
  }

  async updateTrafficRoute(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('traffic_routes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTrafficRouteError(error.message);
    return result;
  }

  async deleteTrafficRoute(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('traffic_routes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTrafficRouteError(error.message);
  }

  async getTrafficMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('traffic_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTrafficMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('traffic_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTrafficMetricsError(error.message);
    return data ?? [];
  }

  async createTrafficMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('traffic_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTrafficMetricsError(error.message);
    return result;
  }

  async updateTrafficMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('traffic_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTrafficMetricsError(error.message);
    return result;
  }

  async deleteTrafficMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('traffic_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTrafficMetricsError(error.message);
  }

  async getCloudServiceDiscovery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_service_discoverys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudServiceDiscovery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_service_discoverys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudServiceDiscoveryError(error.message);
    return data ?? [];
  }

  async createCloudServiceDiscovery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_service_discoverys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudServiceDiscoveryError(error.message);
    return result;
  }

  async updateCloudServiceDiscovery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_service_discoverys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudServiceDiscoveryError(error.message);
    return result;
  }

  async deleteCloudServiceDiscovery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_service_discoverys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudServiceDiscoveryError(error.message);
  }

  async getServiceInstance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('service_instances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listServiceInstance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('service_instances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudServiceInstanceError(error.message);
    return data ?? [];
  }

  async createServiceInstance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('service_instances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudServiceInstanceError(error.message);
    return result;
  }

  async updateServiceInstance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('service_instances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudServiceInstanceError(error.message);
    return result;
  }

  async deleteServiceInstance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('service_instances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudServiceInstanceError(error.message);
  }

  async getServiceHealth(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('service_healths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listServiceHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('service_healths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudServiceHealthError(error.message);
    return data ?? [];
  }

  async createServiceHealth(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('service_healths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudServiceHealthError(error.message);
    return result;
  }

  async updateServiceHealth(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('service_healths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudServiceHealthError(error.message);
    return result;
  }

  async deleteServiceHealth(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('service_healths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudServiceHealthError(error.message);
  }

  async getServiceMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('service_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listServiceMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('service_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudServiceMetricsError(error.message);
    return data ?? [];
  }

  async createServiceMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('service_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudServiceMetricsError(error.message);
    return result;
  }

  async updateServiceMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('service_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudServiceMetricsError(error.message);
    return result;
  }

  async deleteServiceMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('service_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudServiceMetricsError(error.message);
  }

  async getCloudCapacity(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_capacitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudCapacity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_capacitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudCapacityError(error.message);
    return data ?? [];
  }

  async createCloudCapacity(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_capacitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudCapacityError(error.message);
    return result;
  }

  async updateCloudCapacity(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_capacitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudCapacityError(error.message);
    return result;
  }

  async deleteCloudCapacity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_capacitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudCapacityError(error.message);
  }

  async getCapacityPlan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('capacity_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCapacityPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('capacity_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCapacityPlanError(error.message);
    return data ?? [];
  }

  async createCapacityPlan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('capacity_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCapacityPlanError(error.message);
    return result;
  }

  async updateCapacityPlan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('capacity_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCapacityPlanError(error.message);
    return result;
  }

  async deleteCapacityPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('capacity_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCapacityPlanError(error.message);
  }

  async getCapacityAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('capacity_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCapacityAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('capacity_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCapacityAlertError(error.message);
    return data ?? [];
  }

  async createCapacityAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('capacity_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCapacityAlertError(error.message);
    return result;
  }

  async updateCapacityAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('capacity_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCapacityAlertError(error.message);
    return result;
  }

  async deleteCapacityAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('capacity_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCapacityAlertError(error.message);
  }

  async getCapacityForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('capacity_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCapacityForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('capacity_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCapacityForecastError(error.message);
    return data ?? [];
  }

  async createCapacityForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('capacity_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCapacityForecastError(error.message);
    return result;
  }

  async updateCapacityForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('capacity_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCapacityForecastError(error.message);
    return result;
  }

  async deleteCapacityForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('capacity_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCapacityForecastError(error.message);
  }

  async getCloudDeployment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_deployments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudDeployment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudDeploymentError(error.message);
    return data ?? [];
  }

  async createCloudDeployment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_deployments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudDeploymentError(error.message);
    return result;
  }

  async updateCloudDeployment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_deployments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudDeploymentError(error.message);
    return result;
  }

  async deleteCloudDeployment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_deployments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudDeploymentError(error.message);
  }

  async getDeploymentPlan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('deployment_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDeploymentPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('deployment_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDeploymentPlanError(error.message);
    return data ?? [];
  }

  async createDeploymentPlan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('deployment_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDeploymentPlanError(error.message);
    return result;
  }

  async updateDeploymentPlan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('deployment_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDeploymentPlanError(error.message);
    return result;
  }

  async deleteDeploymentPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('deployment_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDeploymentPlanError(error.message);
  }

  async getDeploymentRun(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('deployment_runs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDeploymentRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('deployment_runs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDeploymentRunError(error.message);
    return data ?? [];
  }

  async createDeploymentRun(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('deployment_runs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDeploymentRunError(error.message);
    return result;
  }

  async updateDeploymentRun(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('deployment_runs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDeploymentRunError(error.message);
    return result;
  }

  async deleteDeploymentRun(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('deployment_runs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDeploymentRunError(error.message);
  }

  async getDeploymentMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('deployment_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDeploymentMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('deployment_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDeploymentMetricsError(error.message);
    return data ?? [];
  }

  async createDeploymentMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('deployment_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDeploymentMetricsError(error.message);
    return result;
  }

  async updateDeploymentMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('deployment_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDeploymentMetricsError(error.message);
    return result;
  }

  async deleteDeploymentMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('deployment_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDeploymentMetricsError(error.message);
  }

  async getCloudFeature(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_features')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudFeature(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_features').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudFeatureError(error.message);
    return data ?? [];
  }

  async createCloudFeature(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_features')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudFeatureError(error.message);
    return result;
  }

  async updateCloudFeature(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_features')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudFeatureError(error.message);
    return result;
  }

  async deleteCloudFeature(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_features')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudFeatureError(error.message);
  }

  async getFeatureFlag(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('feature_flags')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFeatureFlag(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('feature_flags').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFeatureFlagError(error.message);
    return data ?? [];
  }

  async createFeatureFlag(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('feature_flags')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFeatureFlagError(error.message);
    return result;
  }

  async updateFeatureFlag(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('feature_flags')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFeatureFlagError(error.message);
    return result;
  }

  async deleteFeatureFlag(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('feature_flags')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFeatureFlagError(error.message);
  }

  async getFeatureTarget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('feature_targets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFeatureTarget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('feature_targets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFeatureTargetError(error.message);
    return data ?? [];
  }

  async createFeatureTarget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('feature_targets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFeatureTargetError(error.message);
    return result;
  }

  async updateFeatureTarget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('feature_targets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFeatureTargetError(error.message);
    return result;
  }

  async deleteFeatureTarget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('feature_targets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFeatureTargetError(error.message);
  }

  async getFeatureMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('feature_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFeatureMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('feature_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFeatureMetricsError(error.message);
    return data ?? [];
  }

  async createFeatureMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('feature_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFeatureMetricsError(error.message);
    return result;
  }

  async updateFeatureMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('feature_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFeatureMetricsError(error.message);
    return result;
  }

  async deleteFeatureMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('feature_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFeatureMetricsError(error.message);
  }

  async getCloudObservability(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_observabilitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudObservability(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_observabilitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudObservabilityError(error.message);
    return data ?? [];
  }

  async createCloudObservability(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_observabilitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudObservabilityError(error.message);
    return result;
  }

  async updateCloudObservability(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_observabilitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudObservabilityError(error.message);
    return result;
  }

  async deleteCloudObservability(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_observabilitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudObservabilityError(error.message);
  }

  async getObservabilityConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('observabilitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listObservabilityConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('observabilitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudObservabilityError(error.message);
    return data ?? [];
  }

  async createObservabilityConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('observabilitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudObservabilityError(error.message);
    return result;
  }

  async updateObservabilityConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('observabilitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudObservabilityError(error.message);
    return result;
  }

  async deleteObservabilityConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('observabilitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudObservabilityError(error.message);
  }

  async getObservabilityMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('observability_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listObservabilityMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('observability_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudObservabilityMetricError(error.message);
    return data ?? [];
  }

  async createObservabilityMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('observability_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudObservabilityMetricError(error.message);
    return result;
  }

  async updateObservabilityMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('observability_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudObservabilityMetricError(error.message);
    return result;
  }

  async deleteObservabilityMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('observability_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudObservabilityMetricError(error.message);
  }

  async getObservabilityAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('observability_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listObservabilityAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('observability_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudObservabilityAlertError(error.message);
    return data ?? [];
  }

  async createObservabilityAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('observability_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudObservabilityAlertError(error.message);
    return result;
  }

  async updateObservabilityAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('observability_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudObservabilityAlertError(error.message);
    return result;
  }

  async deleteObservabilityAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('observability_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudObservabilityAlertError(error.message);
  }

  async getCloudTracing(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_tracings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudTracing(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_tracings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudTracingError(error.message);
    return data ?? [];
  }

  async createCloudTracing(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_tracings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudTracingError(error.message);
    return result;
  }

  async updateCloudTracing(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_tracings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudTracingError(error.message);
    return result;
  }

  async deleteCloudTracing(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_tracings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudTracingError(error.message);
  }

  async getTraceSpan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('trace_spans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTraceSpan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('trace_spans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTraceSpanError(error.message);
    return data ?? [];
  }

  async createTraceSpan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('trace_spans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTraceSpanError(error.message);
    return result;
  }

  async updateTraceSpan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('trace_spans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTraceSpanError(error.message);
    return result;
  }

  async deleteTraceSpan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('trace_spans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTraceSpanError(error.message);
  }

  async getTraceService(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('trace_services')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTraceService(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('trace_services').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTraceServiceError(error.message);
    return data ?? [];
  }

  async createTraceService(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('trace_services')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTraceServiceError(error.message);
    return result;
  }

  async updateTraceService(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('trace_services')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTraceServiceError(error.message);
    return result;
  }

  async deleteTraceService(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('trace_services')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTraceServiceError(error.message);
  }

  async getTraceMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('trace_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTraceMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('trace_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTraceMetricsError(error.message);
    return data ?? [];
  }

  async createTraceMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('trace_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTraceMetricsError(error.message);
    return result;
  }

  async updateTraceMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('trace_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTraceMetricsError(error.message);
    return result;
  }

  async deleteTraceMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('trace_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTraceMetricsError(error.message);
  }

  async getCloudAlerting(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_alertings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudAlerting(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_alertings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudAlertingError(error.message);
    return data ?? [];
  }

  async createCloudAlerting(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_alertings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudAlertingError(error.message);
    return result;
  }

  async updateCloudAlerting(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_alertings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudAlertingError(error.message);
    return result;
  }

  async deleteCloudAlerting(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_alertings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudAlertingError(error.message);
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

  async getAlertIncident(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('alert_incidents')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAlertIncident(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('alert_incidents').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAlertIncidentError(error.message);
    return data ?? [];
  }

  async createAlertIncident(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('alert_incidents')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAlertIncidentError(error.message);
    return result;
  }

  async updateAlertIncident(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('alert_incidents')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAlertIncidentError(error.message);
    return result;
  }

  async deleteAlertIncident(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('alert_incidents')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAlertIncidentError(error.message);
  }

  async getAlertEscalation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('alert_escalatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAlertEscalation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('alert_escalatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAlertEscalationError(error.message);
    return data ?? [];
  }

  async createAlertEscalation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('alert_escalatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAlertEscalationError(error.message);
    return result;
  }

  async updateAlertEscalation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('alert_escalatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAlertEscalationError(error.message);
    return result;
  }

  async deleteAlertEscalation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('alert_escalatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAlertEscalationError(error.message);
  }

  async getCloudScaling(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_scalings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudScaling(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_scalings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudScalingError(error.message);
    return data ?? [];
  }

  async createCloudScaling(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_scalings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudScalingError(error.message);
    return result;
  }

  async updateCloudScaling(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_scalings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudScalingError(error.message);
    return result;
  }

  async deleteCloudScaling(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_scalings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudScalingError(error.message);
  }

  async getScalingEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scaling_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listScalingEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scaling_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudScalingEventError(error.message);
    return data ?? [];
  }

  async createScalingEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scaling_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudScalingEventError(error.message);
    return result;
  }

  async updateScalingEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scaling_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudScalingEventError(error.message);
    return result;
  }

  async deleteScalingEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scaling_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudScalingEventError(error.message);
  }

  async getScalingMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scaling_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listScalingMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scaling_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudScalingMetricsError(error.message);
    return data ?? [];
  }

  async createScalingMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scaling_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudScalingMetricsError(error.message);
    return result;
  }

  async updateScalingMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scaling_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudScalingMetricsError(error.message);
    return result;
  }

  async deleteScalingMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scaling_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudScalingMetricsError(error.message);
  }

  async getCloudQueue(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_queues')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudQueue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_queues').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudQueueError(error.message);
    return data ?? [];
  }

  async createCloudQueue(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_queues')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudQueueError(error.message);
    return result;
  }

  async updateCloudQueue(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_queues')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudQueueError(error.message);
    return result;
  }

  async deleteCloudQueue(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_queues')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudQueueError(error.message);
  }

  async getQueueMessage(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('queue_messages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listQueueMessage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('queue_messages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudQueueMessageError(error.message);
    return data ?? [];
  }

  async createQueueMessage(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('queue_messages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudQueueMessageError(error.message);
    return result;
  }

  async updateQueueMessage(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('queue_messages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudQueueMessageError(error.message);
    return result;
  }

  async deleteQueueMessage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('queue_messages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudQueueMessageError(error.message);
  }

  async getQueueConsumer(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('queue_consumers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listQueueConsumer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('queue_consumers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudQueueConsumerError(error.message);
    return data ?? [];
  }

  async createQueueConsumer(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('queue_consumers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudQueueConsumerError(error.message);
    return result;
  }

  async updateQueueConsumer(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('queue_consumers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudQueueConsumerError(error.message);
    return result;
  }

  async deleteQueueConsumer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('queue_consumers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudQueueConsumerError(error.message);
  }

  async getQueueMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('queue_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listQueueMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('queue_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudQueueMetricsError(error.message);
    return data ?? [];
  }

  async createQueueMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('queue_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudQueueMetricsError(error.message);
    return result;
  }

  async updateQueueMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('queue_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudQueueMetricsError(error.message);
    return result;
  }

  async deleteQueueMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('queue_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudQueueMetricsError(error.message);
  }

  async getCloudCache(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_caches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudCache(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_caches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudCacheError(error.message);
    return data ?? [];
  }

  async createCloudCache(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_caches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudCacheError(error.message);
    return result;
  }

  async updateCloudCache(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_caches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudCacheError(error.message);
    return result;
  }

  async deleteCloudCache(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_caches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudCacheError(error.message);
  }

  async getCacheEntry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('caches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCacheEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createCacheEntry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('caches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCacheError(error.message);
    return result;
  }

  async updateCacheEntry(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteCacheEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('caches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCacheError(error.message);
  }

  async getCachePolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cache_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCachePolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cache_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCachePolicyError(error.message);
    return data ?? [];
  }

  async createCachePolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cache_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCachePolicyError(error.message);
    return result;
  }

  async updateCachePolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cache_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCachePolicyError(error.message);
    return result;
  }

  async deleteCachePolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cache_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCachePolicyError(error.message);
  }

  async getCacheMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cache_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCacheMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cache_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCacheMetricsError(error.message);
    return data ?? [];
  }

  async createCacheMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cache_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCacheMetricsError(error.message);
    return result;
  }

  async updateCacheMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cache_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCacheMetricsError(error.message);
    return result;
  }

  async deleteCacheMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cache_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCacheMetricsError(error.message);
  }

  async getCloudSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudSearchError(error.message);
    return data ?? [];
  }

  async createCloudSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudSearchError(error.message);
    return result;
  }

  async updateCloudSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudSearchError(error.message);
    return result;
  }

  async deleteCloudSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudSearchError(error.message);
  }

  async getSearchIndex(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_indexes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchIndex(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchIndexError(error.message);
    return data ?? [];
  }

  async createSearchIndex(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_indexes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchIndexError(error.message);
    return result;
  }

  async updateSearchIndex(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_indexes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchIndexError(error.message);
    return result;
  }

  async deleteSearchIndex(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_indexes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchIndexError(error.message);
  }

  async getSearchQuery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_querys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_querys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchQueryError(error.message);
    return data ?? [];
  }

  async createSearchQuery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_querys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchQueryError(error.message);
    return result;
  }

  async updateSearchQuery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_querys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchQueryError(error.message);
    return result;
  }

  async deleteSearchQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_querys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchQueryError(error.message);
  }

  async getSearchMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchMetricsError(error.message);
    return data ?? [];
  }

  async createSearchMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchMetricsError(error.message);
    return result;
  }

  async updateSearchMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchMetricsError(error.message);
    return result;
  }

  async deleteSearchMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchMetricsError(error.message);
  }

  async getCloudEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudEventError(error.message);
    return data ?? [];
  }

  async createCloudEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudEventError(error.message);
    return result;
  }

  async updateCloudEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudEventError(error.message);
    return result;
  }

  async deleteCloudEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudEventError(error.message);
  }

  async getEventSource(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('event_sources')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEventSource(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('event_sources').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEventSourceError(error.message);
    return data ?? [];
  }

  async createEventSource(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('event_sources')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEventSourceError(error.message);
    return result;
  }

  async updateEventSource(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('event_sources')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEventSourceError(error.message);
    return result;
  }

  async deleteEventSource(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('event_sources')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEventSourceError(error.message);
  }

  async getEventTarget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('event_targets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEventTarget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('event_targets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEventTargetError(error.message);
    return data ?? [];
  }

  async createEventTarget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('event_targets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEventTargetError(error.message);
    return result;
  }

  async updateEventTarget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('event_targets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEventTargetError(error.message);
    return result;
  }

  async deleteEventTarget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('event_targets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEventTargetError(error.message);
  }

  async getEventMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('event_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEventMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('event_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEventMetricsError(error.message);
    return data ?? [];
  }

  async createEventMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('event_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEventMetricsError(error.message);
    return result;
  }

  async updateEventMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('event_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEventMetricsError(error.message);
    return result;
  }

  async deleteEventMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('event_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEventMetricsError(error.message);
  }

  async getCloudWorkflow(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_workflows')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudWorkflow(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_workflows').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudWorkflowError(error.message);
    return data ?? [];
  }

  async createCloudWorkflow(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_workflows')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudWorkflowError(error.message);
    return result;
  }

  async updateCloudWorkflow(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_workflows')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudWorkflowError(error.message);
    return result;
  }

  async deleteCloudWorkflow(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_workflows')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudWorkflowError(error.message);
  }

  async getWorkflowStep(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('workflow_steps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWorkflowStep(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('workflow_steps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWorkflowStepError(error.message);
    return data ?? [];
  }

  async createWorkflowStep(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_steps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWorkflowStepError(error.message);
    return result;
  }

  async updateWorkflowStep(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('workflow_steps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWorkflowStepError(error.message);
    return result;
  }

  async deleteWorkflowStep(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_steps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWorkflowStepError(error.message);
  }

  async getWorkflowRun(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('workflow_runs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWorkflowRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('workflow_runs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWorkflowRunError(error.message);
    return data ?? [];
  }

  async createWorkflowRun(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_runs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWorkflowRunError(error.message);
    return result;
  }

  async updateWorkflowRun(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('workflow_runs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWorkflowRunError(error.message);
    return result;
  }

  async deleteWorkflowRun(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_runs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWorkflowRunError(error.message);
  }

  async getWorkflowMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('workflow_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWorkflowMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('workflow_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWorkflowMetricsError(error.message);
    return data ?? [];
  }

  async createWorkflowMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('workflow_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWorkflowMetricsError(error.message);
    return result;
  }

  async updateWorkflowMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('workflow_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWorkflowMetricsError(error.message);
    return result;
  }

  async deleteWorkflowMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('workflow_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWorkflowMetricsError(error.message);
  }

  async getCloudPlugin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_plugins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudPlugin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_plugins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudPluginError(error.message);
    return data ?? [];
  }

  async createCloudPlugin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_plugins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudPluginError(error.message);
    return result;
  }

  async updateCloudPlugin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_plugins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudPluginError(error.message);
    return result;
  }

  async deleteCloudPlugin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_plugins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudPluginError(error.message);
  }

  async getPluginConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('plugins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPluginConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('plugins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPluginError(error.message);
    return data ?? [];
  }

  async createPluginConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('plugins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPluginError(error.message);
    return result;
  }

  async updatePluginConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('plugins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPluginError(error.message);
    return result;
  }

  async deletePluginConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('plugins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPluginError(error.message);
  }

  async getPluginVersion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('plugin_versioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPluginVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('plugin_versioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPluginVersionError(error.message);
    return data ?? [];
  }

  async createPluginVersion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('plugin_versioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPluginVersionError(error.message);
    return result;
  }

  async updatePluginVersion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('plugin_versioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPluginVersionError(error.message);
    return result;
  }

  async deletePluginVersion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('plugin_versioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPluginVersionError(error.message);
  }

  async getPluginMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('plugin_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPluginMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('plugin_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPluginMetricsError(error.message);
    return data ?? [];
  }

  async createPluginMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('plugin_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPluginMetricsError(error.message);
    return result;
  }

  async updatePluginMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('plugin_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPluginMetricsError(error.message);
    return result;
  }

  async deletePluginMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('plugin_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPluginMetricsError(error.message);
  }

  async getCircuitBreaker(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('circuit_breakers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCircuitBreaker(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createCircuitBreaker(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('circuit_breakers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCircuitBreakerError(error.message);
    return result;
  }

  async updateCircuitBreaker(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteCircuitBreaker(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('circuit_breakers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCircuitBreakerError(error.message);
  }

  async getCircuitBreakerEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('circuit_breaker_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCircuitBreakerEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('circuit_breaker_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCircuitBreakerEventError(error.message);
    return data ?? [];
  }

  async createCircuitBreakerEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('circuit_breaker_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCircuitBreakerEventError(error.message);
    return result;
  }

  async updateCircuitBreakerEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('circuit_breaker_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCircuitBreakerEventError(error.message);
    return result;
  }

  async deleteCircuitBreakerEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('circuit_breaker_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCircuitBreakerEventError(error.message);
  }

  async getCircuitBreakerMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('circuit_breaker_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCircuitBreakerMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('circuit_breaker_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCircuitBreakerMetricsError(error.message);
    return data ?? [];
  }

  async createCircuitBreakerMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('circuit_breaker_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCircuitBreakerMetricsError(error.message);
    return result;
  }

  async updateCircuitBreakerMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('circuit_breaker_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCircuitBreakerMetricsError(error.message);
    return result;
  }

  async deleteCircuitBreakerMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('circuit_breaker_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCircuitBreakerMetricsError(error.message);
  }

  async getServiceMeshConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('service_meshes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listServiceMeshConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('service_meshes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudServiceMeshError(error.message);
    return data ?? [];
  }

  async createServiceMeshConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('service_meshes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudServiceMeshError(error.message);
    return result;
  }

  async updateServiceMeshConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('service_meshes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudServiceMeshError(error.message);
    return result;
  }

  async deleteServiceMeshConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('service_meshes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudServiceMeshError(error.message);
  }

  async getMeshService(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('mesh_services')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMeshService(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('mesh_services').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMeshServiceError(error.message);
    return data ?? [];
  }

  async createMeshService(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('mesh_services')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMeshServiceError(error.message);
    return result;
  }

  async updateMeshService(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('mesh_services')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMeshServiceError(error.message);
    return result;
  }

  async deleteMeshService(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('mesh_services')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMeshServiceError(error.message);
  }

  async getMeshTraffic(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('mesh_traffics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMeshTraffic(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('mesh_traffics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMeshTrafficError(error.message);
    return data ?? [];
  }

  async createMeshTraffic(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('mesh_traffics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMeshTrafficError(error.message);
    return result;
  }

  async updateMeshTraffic(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('mesh_traffics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMeshTrafficError(error.message);
    return result;
  }

  async deleteMeshTraffic(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('mesh_traffics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMeshTrafficError(error.message);
  }

  async getContainerRegistry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('container_registrys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listContainerRegistry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('container_registrys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudContainerRegistryError(error.message);
    return data ?? [];
  }

  async createContainerRegistry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('container_registrys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudContainerRegistryError(error.message);
    return result;
  }

  async updateContainerRegistry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('container_registrys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudContainerRegistryError(error.message);
    return result;
  }

  async deleteContainerRegistry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('container_registrys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudContainerRegistryError(error.message);
  }

  async getContainerImage(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('container_images')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listContainerImage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('container_images').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudContainerImageError(error.message);
    return data ?? [];
  }

  async createContainerImage(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('container_images')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudContainerImageError(error.message);
    return result;
  }

  async updateContainerImage(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('container_images')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudContainerImageError(error.message);
    return result;
  }

  async deleteContainerImage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('container_images')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudContainerImageError(error.message);
  }

  async getContainerDeployment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('container_deployments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listContainerDeployment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('container_deployments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudContainerDeploymentError(error.message);
    return data ?? [];
  }

  async createContainerDeployment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('container_deployments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudContainerDeploymentError(error.message);
    return result;
  }

  async updateContainerDeployment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('container_deployments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudContainerDeploymentError(error.message);
    return result;
  }

  async deleteContainerDeployment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('container_deployments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudContainerDeploymentError(error.message);
  }

  async getCloudScheduler(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_schedulers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudScheduler(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_schedulers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudSchedulerError(error.message);
    return data ?? [];
  }

  async createCloudScheduler(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_schedulers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudSchedulerError(error.message);
    return result;
  }

  async updateCloudScheduler(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_schedulers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudSchedulerError(error.message);
    return result;
  }

  async deleteCloudScheduler(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_schedulers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudSchedulerError(error.message);
  }

  async getSchedulerJob(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scheduler_jobs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchedulerJob(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scheduler_jobs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchedulerJobError(error.message);
    return data ?? [];
  }

  async createSchedulerJob(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scheduler_jobs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchedulerJobError(error.message);
    return result;
  }

  async updateSchedulerJob(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scheduler_jobs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchedulerJobError(error.message);
    return result;
  }

  async deleteSchedulerJob(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scheduler_jobs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchedulerJobError(error.message);
  }

  async getSchedulerRun(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scheduler_runs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchedulerRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scheduler_runs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchedulerRunError(error.message);
    return data ?? [];
  }

  async createSchedulerRun(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scheduler_runs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchedulerRunError(error.message);
    return result;
  }

  async updateSchedulerRun(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scheduler_runs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchedulerRunError(error.message);
    return result;
  }

  async deleteSchedulerRun(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scheduler_runs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchedulerRunError(error.message);
  }

  async getCloudLogging(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_loggings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudLogging(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_loggings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudLoggingError(error.message);
    return data ?? [];
  }

  async createCloudLogging(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_loggings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudLoggingError(error.message);
    return result;
  }

  async updateCloudLogging(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_loggings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudLoggingError(error.message);
    return result;
  }

  async deleteCloudLogging(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_loggings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudLoggingError(error.message);
  }

  async getLogEntry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLogEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLogError(error.message);
    return data ?? [];
  }

  async createLogEntry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLogError(error.message);
    return result;
  }

  async updateLogEntry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLogError(error.message);
    return result;
  }

  async deleteLogEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLogError(error.message);
  }

  async getLogQuery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('log_querys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLogQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('log_querys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLogQueryError(error.message);
    return data ?? [];
  }

  async createLogQuery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('log_querys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLogQueryError(error.message);
    return result;
  }

  async updateLogQuery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('log_querys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLogQueryError(error.message);
    return result;
  }

  async deleteLogQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('log_querys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLogQueryError(error.message);
  }

  async getCircuitBreakerStateHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('circuit_breaker_state_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCircuitBreakerStateHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('circuit_breaker_state_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCircuitBreakerStateHistoryError(error.message);
    return data ?? [];
  }

  async createCircuitBreakerStateHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('circuit_breaker_state_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCircuitBreakerStateHistoryError(error.message);
    return result;
  }

  async updateCircuitBreakerStateHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('circuit_breaker_state_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCircuitBreakerStateHistoryError(error.message);
    return result;
  }

  async deleteCircuitBreakerStateHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('circuit_breaker_state_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCircuitBreakerStateHistoryError(error.message);
  }

  async getNetworkInterface(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('network_interfaces')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNetworkInterface(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('network_interfaces').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNetworkInterfaceError(error.message);
    return data ?? [];
  }

  async createNetworkInterface(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('network_interfaces')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNetworkInterfaceError(error.message);
    return result;
  }

  async updateNetworkInterface(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('network_interfaces')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNetworkInterfaceError(error.message);
    return result;
  }

  async deleteNetworkInterface(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('network_interfaces')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNetworkInterfaceError(error.message);
  }

  async getSSLCertificateChain(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sslcertificate_chains')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSSLCertificateChain(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sslcertificate_chains').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSSLCertificateChainError(error.message);
    return data ?? [];
  }

  async createSSLCertificateChain(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sslcertificate_chains')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSSLCertificateChainError(error.message);
    return result;
  }

  async updateSSLCertificateChain(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sslcertificate_chains')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSSLCertificateChainError(error.message);
    return result;
  }

  async deleteSSLCertificateChain(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sslcertificate_chains')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSSLCertificateChainError(error.message);
  }

  async getDNSTransfer(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('dnstransfers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDNSTransfer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('dnstransfers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDNSTransferError(error.message);
    return data ?? [];
  }

  async createDNSTransfer(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dnstransfers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDNSTransferError(error.message);
    return result;
  }

  async updateDNSTransfer(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('dnstransfers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDNSTransferError(error.message);
    return result;
  }

  async deleteDNSTransfer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dnstransfers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDNSTransferError(error.message);
  }

  async getProxyConnection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('proxy_connectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listProxyConnection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('proxy_connectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudProxyConnectionError(error.message);
    return data ?? [];
  }

  async createProxyConnection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('proxy_connectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudProxyConnectionError(error.message);
    return result;
  }

  async updateProxyConnection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('proxy_connectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudProxyConnectionError(error.message);
    return result;
  }

  async deleteProxyConnection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('proxy_connectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudProxyConnectionError(error.message);
  }

  async getFirewallLog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('firewall_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFirewallLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('firewall_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFirewallLogError(error.message);
    return data ?? [];
  }

  async createFirewallLog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('firewall_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFirewallLogError(error.message);
    return result;
  }

  async updateFirewallLog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('firewall_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFirewallLogError(error.message);
    return result;
  }

  async deleteFirewallLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('firewall_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFirewallLogError(error.message);
  }

  async getTrafficMirror(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('traffic_mirrors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTrafficMirror(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('traffic_mirrors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTrafficMirrorError(error.message);
    return data ?? [];
  }

  async createTrafficMirror(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('traffic_mirrors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTrafficMirrorError(error.message);
    return result;
  }

  async updateTrafficMirror(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('traffic_mirrors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTrafficMirrorError(error.message);
    return result;
  }

  async deleteTrafficMirror(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('traffic_mirrors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTrafficMirrorError(error.message);
  }

  async getServiceMeshPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('service_mesh_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listServiceMeshPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('service_mesh_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudServiceMeshPolicyError(error.message);
    return data ?? [];
  }

  async createServiceMeshPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('service_mesh_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudServiceMeshPolicyError(error.message);
    return result;
  }

  async updateServiceMeshPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('service_mesh_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudServiceMeshPolicyError(error.message);
    return result;
  }

  async deleteServiceMeshPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('service_mesh_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudServiceMeshPolicyError(error.message);
  }

  async getCloudGovernance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cloud_governances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCloudGovernance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cloud_governances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCloudGovernanceError(error.message);
    return data ?? [];
  }

  async createCloudGovernance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cloud_governances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCloudGovernanceError(error.message);
    return result;
  }

  async updateCloudGovernance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cloud_governances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCloudGovernanceError(error.message);
    return result;
  }

  async deleteCloudGovernance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cloud_governances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCloudGovernanceError(error.message);
  }

  async getGovernancePolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('governance_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernancePolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('governance_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernancePolicyError(error.message);
    return data ?? [];
  }

  async createGovernancePolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('governance_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernancePolicyError(error.message);
    return result;
  }

  async updateGovernancePolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('governance_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernancePolicyError(error.message);
    return result;
  }

  async deleteGovernancePolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('governance_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernancePolicyError(error.message);
  }

  async getGovernanceAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('governance_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernanceAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('governance_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernanceAuditError(error.message);
    return data ?? [];
  }

  async createGovernanceAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('governance_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernanceAuditError(error.message);
    return result;
  }

  async updateGovernanceAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('governance_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernanceAuditError(error.message);
    return result;
  }

  async deleteGovernanceAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('governance_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernanceAuditError(error.message);
  }

}

export function createTwinModuleRepository(supabase: SupabaseClient): TwinModuleRepository {
  return new TwinModuleRepositoryImpl(supabase);
}


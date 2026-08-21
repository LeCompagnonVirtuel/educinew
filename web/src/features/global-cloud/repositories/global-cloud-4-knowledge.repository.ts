import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudAccessPermissionError, EduCloudBenchmarkMetricError, EduCloudCapacityExpansionError, EduCloudCapacityProjectionError, EduCloudCapacityThresholdError, EduCloudCarbonHistoryError, EduCloudComparisonMetricError, EduCloudComparisonValueError, EduCloudCostBreakdownItemError, EduCloudDataTransformationError, EduCloudDependencyGraphEdgeError, EduCloudDependencyGraphNodeError, EduCloudEnergyHistoryError, EduCloudEnergySourceError, EduCloudEscalationLevelError, EduCloudEscalationPolicyError, EduCloudGovernanceComplianceError, EduCloudGovernancePolicyError, EduCloudGovernanceRuleError, EduCloudGovernanceViolationError, EduCloudImportErrorError, EduCloudOptimizationRecommendationError, EduCloudProjectionValueError, EduCloudSecurityVulnerabilityError, EduCloudSimulationObjectiveError, EduCloudSimulationScenarioVariableError, EduCloudSLAHistoryError, EduCloudSLAPenaltyError, EduCloudSyncErrorError, EduCloudTimeSeriesDataPointError, EduCloudTwinAccessError, EduCloudTwinAggregationError, EduCloudTwinAIError, EduCloudTwinAIInsightError, EduCloudTwinAlertError, EduCloudTwinAnomalyError, EduCloudTwinAPIKeyError, EduCloudTwinAuditLogError, EduCloudTwinBackupError, EduCloudTwinBenchmarkError, EduCloudTwinCacheError, EduCloudTwinCapacityPlanError, EduCloudTwinCarbonError, EduCloudTwinChangeLogError, EduCloudTwinComparisonError, EduCloudTwinComputeMetricsError, EduCloudTwinConstraintError, EduCloudTwinCorrelationError, EduCloudTwinCostAnalysisError, EduCloudTwinDataFlowError, EduCloudTwinDataLineageError, EduCloudTwinDependencyGraphError, EduCloudTwinEdgeNodeError, EduCloudTwinEnergyError, EduCloudTwinError, EduCloudTwinEventSourceError, EduCloudTwinEventTypeError, EduCloudTwinExportError, EduCloudTwinGovernanceError, EduCloudTwinHealthComponentError, EduCloudTwinHealthError, EduCloudTwinImportError, EduCloudTwinIntegrationError, EduCloudTwinLatencyError, EduCloudTwinLifecycleEventError, EduCloudTwinLogError, EduCloudTwinMappingError, EduCloudTwinMetadataError, EduCloudTwinNetworkMetricsError, EduCloudTwinNotificationError, EduCloudTwinOptimizationError, EduCloudTwinPluginError, EduCloudTwinPluginMetricsError, EduCloudTwinPluginVersionError, EduCloudTwinProjectionError, EduCloudTwinRateLimitError, EduCloudTwinRealtimeStreamError, EduCloudTwinRestoreError, EduCloudTwinRiskAssessmentError, EduCloudTwinScheduleError, EduCloudTwinSearchError, EduCloudTwinSearchFilterError, EduCloudTwinSearchResultError, EduCloudTwinSecurityError, EduCloudTwinSimulationScenarioError, EduCloudTwinSLAError, EduCloudTwinStorageMetricsError, EduCloudTwinSyncError, EduCloudTwinTagError, EduCloudTwinTemplateError, EduCloudTwinThroughputError, EduCloudTwinTimeSeriesError, EduCloudTwinTopologyEdgeError, EduCloudTwinTopologyError, EduCloudTwinTopologyLayerError, EduCloudTwinTopologyNodeError, EduCloudTwinUtilizationError, EduCloudTwinVersionError, EduCloudTwinWasteError, EduCloudTwinWaterError, EduCloudTwinWebhookError, EduCloudWasteHistoryError, EduCloudWaterHistoryError, EduCloudWaterSourceError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface KnowledgeModuleRepository {

  // =============================================================================
  // DIGITAL-TWIN
  // =============================================================================
  getCapacityThreshold(schoolId: string, id: string): Promise<any | null>;
  listCapacityThreshold(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityThreshold(schoolId: string, data: any): Promise<any>;
  updateCapacityThreshold(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityThreshold(schoolId: string, id: string): Promise<void>;

  getCapacityProjection(schoolId: string, id: string): Promise<any | null>;
  listCapacityProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityProjection(schoolId: string, data: any): Promise<any>;
  updateCapacityProjection(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityProjection(schoolId: string, id: string): Promise<void>;

  getTwinUtilization(schoolId: string, id: string): Promise<any | null>;
  listTwinUtilization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinUtilization(schoolId: string, data: any): Promise<any>;
  updateTwinUtilization(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinUtilization(schoolId: string, id: string): Promise<void>;

  getTwinEnergy(schoolId: string, id: string): Promise<any | null>;
  listTwinEnergy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinEnergy(schoolId: string, data: any): Promise<any>;
  updateTwinEnergy(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinEnergy(schoolId: string, id: string): Promise<void>;

  getEnergySource(schoolId: string, id: string): Promise<any | null>;
  listEnergySource(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnergySource(schoolId: string, data: any): Promise<any>;
  updateEnergySource(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnergySource(schoolId: string, id: string): Promise<void>;

  getEnergyHistory(schoolId: string, id: string): Promise<any | null>;
  listEnergyHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnergyHistory(schoolId: string, data: any): Promise<any>;
  updateEnergyHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnergyHistory(schoolId: string, id: string): Promise<void>;

  getTwinWater(schoolId: string, id: string): Promise<any | null>;
  listTwinWater(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinWater(schoolId: string, data: any): Promise<any>;
  updateTwinWater(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinWater(schoolId: string, id: string): Promise<void>;

  getWaterSource(schoolId: string, id: string): Promise<any | null>;
  listWaterSource(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWaterSource(schoolId: string, data: any): Promise<any>;
  updateWaterSource(schoolId: string, id: string, data: any): Promise<any>;
  deleteWaterSource(schoolId: string, id: string): Promise<void>;

  getWaterHistory(schoolId: string, id: string): Promise<any | null>;
  listWaterHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWaterHistory(schoolId: string, data: any): Promise<any>;
  updateWaterHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteWaterHistory(schoolId: string, id: string): Promise<void>;

  getTwinWaste(schoolId: string, id: string): Promise<any | null>;
  listTwinWaste(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinWaste(schoolId: string, data: any): Promise<any>;
  updateTwinWaste(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinWaste(schoolId: string, id: string): Promise<void>;

  getWasteHistory(schoolId: string, id: string): Promise<any | null>;
  listWasteHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWasteHistory(schoolId: string, data: any): Promise<any>;
  updateWasteHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteWasteHistory(schoolId: string, id: string): Promise<void>;

  getTwinCarbon(schoolId: string, id: string): Promise<any | null>;
  listTwinCarbon(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinCarbon(schoolId: string, data: any): Promise<any>;
  updateTwinCarbon(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinCarbon(schoolId: string, id: string): Promise<void>;

  getCarbonHistory(schoolId: string, id: string): Promise<any | null>;
  listCarbonHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCarbonHistory(schoolId: string, data: any): Promise<any>;
  updateCarbonHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteCarbonHistory(schoolId: string, id: string): Promise<void>;

  getTwinSecurity(schoolId: string, id: string): Promise<any | null>;
  listTwinSecurity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSecurity(schoolId: string, data: any): Promise<any>;
  updateTwinSecurity(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSecurity(schoolId: string, id: string): Promise<void>;

  getSecurityVulnerability(schoolId: string, id: string): Promise<any | null>;
  listSecurityVulnerability(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecurityVulnerability(schoolId: string, data: any): Promise<any>;
  updateSecurityVulnerability(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecurityVulnerability(schoolId: string, id: string): Promise<void>;

  getTwinAccess(schoolId: string, id: string): Promise<any | null>;
  listTwinAccess(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAccess(schoolId: string, data: any): Promise<any>;
  updateTwinAccess(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAccess(schoolId: string, id: string): Promise<void>;

  getAccessPermission(schoolId: string, id: string): Promise<any | null>;
  listAccessPermission(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAccessPermission(schoolId: string, data: any): Promise<any>;
  updateAccessPermission(schoolId: string, id: string, data: any): Promise<any>;
  deleteAccessPermission(schoolId: string, id: string): Promise<void>;

  getTwinAuditLog(schoolId: string, id: string): Promise<any | null>;
  listTwinAuditLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAuditLog(schoolId: string, data: any): Promise<any>;
  updateTwinAuditLog(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAuditLog(schoolId: string, id: string): Promise<void>;

  getTwinIntegration(schoolId: string, id: string): Promise<any | null>;
  listTwinIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinIntegration(schoolId: string, data: any): Promise<any>;
  updateTwinIntegration(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinIntegration(schoolId: string, id: string): Promise<void>;

  getTwinSync(schoolId: string, id: string): Promise<any | null>;
  listTwinSync(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSync(schoolId: string, data: any): Promise<any>;
  updateTwinSync(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSync(schoolId: string, id: string): Promise<void>;

  getSyncError(schoolId: string, id: string): Promise<any | null>;
  listSyncError(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSyncError(schoolId: string, data: any): Promise<any>;
  updateSyncError(schoolId: string, id: string, data: any): Promise<any>;
  deleteSyncError(schoolId: string, id: string): Promise<void>;

  getTwinMapping(schoolId: string, id: string): Promise<any | null>;
  listTwinMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinMapping(schoolId: string, data: any): Promise<any>;
  updateTwinMapping(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinMapping(schoolId: string, id: string): Promise<void>;

  getTwinTemplateRecord(schoolId: string, id: string): Promise<any | null>;
  listTwinTemplateRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinTemplateRecord(schoolId: string, data: any): Promise<any>;
  updateTwinTemplateRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinTemplateRecord(schoolId: string, id: string): Promise<void>;

  getTwinPlugin(schoolId: string, id: string): Promise<any | null>;
  listTwinPlugin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinPlugin(schoolId: string, data: any): Promise<any>;
  updateTwinPlugin(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinPlugin(schoolId: string, id: string): Promise<void>;

  getTwinPluginConfig(schoolId: string, id: string): Promise<any | null>;
  listTwinPluginConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinPluginConfig(schoolId: string, data: any): Promise<any>;
  updateTwinPluginConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinPluginConfig(schoolId: string, id: string): Promise<void>;

  getTwinPluginMetrics(schoolId: string, id: string): Promise<any | null>;
  listTwinPluginMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinPluginMetrics(schoolId: string, data: any): Promise<any>;
  updateTwinPluginMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinPluginMetrics(schoolId: string, id: string): Promise<void>;

  getTwinPluginVersion(schoolId: string, id: string): Promise<any | null>;
  listTwinPluginVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinPluginVersion(schoolId: string, data: any): Promise<any>;
  updateTwinPluginVersion(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinPluginVersion(schoolId: string, id: string): Promise<void>;

  getTwinEventTypeRecord(schoolId: string, id: string): Promise<any | null>;
  listTwinEventTypeRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinEventTypeRecord(schoolId: string, data: any): Promise<any>;
  updateTwinEventTypeRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinEventTypeRecord(schoolId: string, id: string): Promise<void>;

  getEscalationPolicy(schoolId: string, id: string): Promise<any | null>;
  listEscalationPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEscalationPolicy(schoolId: string, data: any): Promise<any>;
  updateEscalationPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteEscalationPolicy(schoolId: string, id: string): Promise<void>;

  getEscalationLevel(schoolId: string, id: string): Promise<any | null>;
  listEscalationLevel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEscalationLevel(schoolId: string, data: any): Promise<any>;
  updateEscalationLevel(schoolId: string, id: string, data: any): Promise<any>;
  deleteEscalationLevel(schoolId: string, id: string): Promise<void>;

  getTwinEventSource(schoolId: string, id: string): Promise<any | null>;
  listTwinEventSource(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinEventSource(schoolId: string, data: any): Promise<any>;
  updateTwinEventSource(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinEventSource(schoolId: string, id: string): Promise<void>;

  getTwinConfig(schoolId: string, id: string): Promise<any | null>;
  listTwinConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinConfig(schoolId: string, data: any): Promise<any>;
  updateTwinConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinConfig(schoolId: string, id: string): Promise<void>;

  getTwinAlertConfig(schoolId: string, id: string): Promise<any | null>;
  listTwinAlertConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAlertConfig(schoolId: string, data: any): Promise<any>;
  updateTwinAlertConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAlertConfig(schoolId: string, id: string): Promise<void>;

  getTwinChangeLog(schoolId: string, id: string): Promise<any | null>;
  listTwinChangeLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinChangeLog(schoolId: string, data: any): Promise<any>;
  updateTwinChangeLog(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinChangeLog(schoolId: string, id: string): Promise<void>;

  getTwinDataFlow(schoolId: string, id: string): Promise<any | null>;
  listTwinDataFlow(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinDataFlow(schoolId: string, data: any): Promise<any>;
  updateTwinDataFlow(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinDataFlow(schoolId: string, id: string): Promise<void>;

  getTwinHealth(schoolId: string, id: string): Promise<any | null>;
  listTwinHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinHealth(schoolId: string, data: any): Promise<any>;
  updateTwinHealth(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinHealth(schoolId: string, id: string): Promise<void>;

  getTwinHealthComponent(schoolId: string, id: string): Promise<any | null>;
  listTwinHealthComponent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinHealthComponent(schoolId: string, data: any): Promise<any>;
  updateTwinHealthComponent(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinHealthComponent(schoolId: string, id: string): Promise<void>;

  getTwinAnomaly(schoolId: string, id: string): Promise<any | null>;
  listTwinAnomaly(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAnomaly(schoolId: string, data: any): Promise<any>;
  updateTwinAnomaly(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAnomaly(schoolId: string, id: string): Promise<void>;

  getTwinOptimization(schoolId: string, id: string): Promise<any | null>;
  listTwinOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinOptimization(schoolId: string, data: any): Promise<any>;
  updateTwinOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinOptimization(schoolId: string, id: string): Promise<void>;

  getOptimizationRecommendation(schoolId: string, id: string): Promise<any | null>;
  listOptimizationRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOptimizationRecommendation(schoolId: string, data: any): Promise<any>;
  updateOptimizationRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deleteOptimizationRecommendation(schoolId: string, id: string): Promise<void>;

  getTwinNotification(schoolId: string, id: string): Promise<any | null>;
  listTwinNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinNotification(schoolId: string, data: any): Promise<any>;
  updateTwinNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinNotification(schoolId: string, id: string): Promise<void>;

  getTwinAggregation(schoolId: string, id: string): Promise<any | null>;
  listTwinAggregation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAggregation(schoolId: string, data: any): Promise<any>;
  updateTwinAggregation(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAggregation(schoolId: string, id: string): Promise<void>;

  getTwinTimeSeries(schoolId: string, id: string): Promise<any | null>;
  listTwinTimeSeries(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinTimeSeries(schoolId: string, data: any): Promise<any>;
  updateTwinTimeSeries(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinTimeSeries(schoolId: string, id: string): Promise<void>;

  getTimeSeriesDataPoint(schoolId: string, id: string): Promise<any | null>;
  listTimeSeriesDataPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTimeSeriesDataPoint(schoolId: string, data: any): Promise<any>;
  updateTimeSeriesDataPoint(schoolId: string, id: string, data: any): Promise<any>;
  deleteTimeSeriesDataPoint(schoolId: string, id: string): Promise<void>;

  getTwinCorrelation(schoolId: string, id: string): Promise<any | null>;
  listTwinCorrelation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinCorrelation(schoolId: string, data: any): Promise<any>;
  updateTwinCorrelation(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinCorrelation(schoolId: string, id: string): Promise<void>;

  getTwinBenchmark(schoolId: string, id: string): Promise<any | null>;
  listTwinBenchmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinBenchmark(schoolId: string, data: any): Promise<any>;
  updateTwinBenchmark(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinBenchmark(schoolId: string, id: string): Promise<void>;

  getBenchmarkMetric(schoolId: string, id: string): Promise<any | null>;
  listBenchmarkMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBenchmarkMetric(schoolId: string, data: any): Promise<any>;
  updateBenchmarkMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteBenchmarkMetric(schoolId: string, id: string): Promise<void>;

  getTwinProjection(schoolId: string, id: string): Promise<any | null>;
  listTwinProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinProjection(schoolId: string, data: any): Promise<any>;
  updateTwinProjection(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinProjection(schoolId: string, id: string): Promise<void>;

  getProjectionValue(schoolId: string, id: string): Promise<any | null>;
  listProjectionValue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createProjectionValue(schoolId: string, data: any): Promise<any>;
  updateProjectionValue(schoolId: string, id: string, data: any): Promise<any>;
  deleteProjectionValue(schoolId: string, id: string): Promise<void>;

  getTwinConstraint(schoolId: string, id: string): Promise<any | null>;
  listTwinConstraint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinConstraint(schoolId: string, data: any): Promise<any>;
  updateTwinConstraint(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinConstraint(schoolId: string, id: string): Promise<void>;

  getTwinDependencyGraph(schoolId: string, id: string): Promise<any | null>;
  listTwinDependencyGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinDependencyGraph(schoolId: string, data: any): Promise<any>;
  updateTwinDependencyGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinDependencyGraph(schoolId: string, id: string): Promise<void>;

  getDependencyGraphNode(schoolId: string, id: string): Promise<any | null>;
  listDependencyGraphNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDependencyGraphNode(schoolId: string, data: any): Promise<any>;
  updateDependencyGraphNode(schoolId: string, id: string, data: any): Promise<any>;
  deleteDependencyGraphNode(schoolId: string, id: string): Promise<void>;

  getDependencyGraphEdge(schoolId: string, id: string): Promise<any | null>;
  listDependencyGraphEdge(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDependencyGraphEdge(schoolId: string, data: any): Promise<any>;
  updateDependencyGraphEdge(schoolId: string, id: string, data: any): Promise<any>;
  deleteDependencyGraphEdge(schoolId: string, id: string): Promise<void>;

  getTwinGovernance(schoolId: string, id: string): Promise<any | null>;
  listTwinGovernance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinGovernance(schoolId: string, data: any): Promise<any>;
  updateTwinGovernance(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinGovernance(schoolId: string, id: string): Promise<void>;

  getGovernancePolicy(schoolId: string, id: string): Promise<any | null>;
  listGovernancePolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernancePolicy(schoolId: string, data: any): Promise<any>;
  updateGovernancePolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernancePolicy(schoolId: string, id: string): Promise<void>;

  getGovernanceRule(schoolId: string, id: string): Promise<any | null>;
  listGovernanceRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernanceRule(schoolId: string, data: any): Promise<any>;
  updateGovernanceRule(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernanceRule(schoolId: string, id: string): Promise<void>;

  getGovernanceCompliance(schoolId: string, id: string): Promise<any | null>;
  listGovernanceCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernanceCompliance(schoolId: string, data: any): Promise<any>;
  updateGovernanceCompliance(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernanceCompliance(schoolId: string, id: string): Promise<void>;

  getGovernanceViolation(schoolId: string, id: string): Promise<any | null>;
  listGovernanceViolation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernanceViolation(schoolId: string, data: any): Promise<any>;
  updateGovernanceViolation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernanceViolation(schoolId: string, id: string): Promise<void>;

  getTwinLifecycleEvent(schoolId: string, id: string): Promise<any | null>;
  listTwinLifecycleEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinLifecycleEvent(schoolId: string, data: any): Promise<any>;
  updateTwinLifecycleEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinLifecycleEvent(schoolId: string, id: string): Promise<void>;

  getTwinMetadata(schoolId: string, id: string): Promise<any | null>;
  listTwinMetadata(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinMetadata(schoolId: string, data: any): Promise<any>;
  updateTwinMetadata(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinMetadata(schoolId: string, id: string): Promise<void>;

  getTwinVersion(schoolId: string, id: string): Promise<any | null>;
  listTwinVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinVersion(schoolId: string, data: any): Promise<any>;
  updateTwinVersion(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinVersion(schoolId: string, id: string): Promise<void>;

  getTwinExport(schoolId: string, id: string): Promise<any | null>;
  listTwinExport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinExport(schoolId: string, data: any): Promise<any>;
  updateTwinExport(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinExport(schoolId: string, id: string): Promise<void>;

  getTwinImport(schoolId: string, id: string): Promise<any | null>;
  listTwinImport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinImport(schoolId: string, data: any): Promise<any>;
  updateTwinImport(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinImport(schoolId: string, id: string): Promise<void>;

  getImportError(schoolId: string, id: string): Promise<any | null>;
  listImportError(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createImportError(schoolId: string, data: any): Promise<any>;
  updateImportError(schoolId: string, id: string, data: any): Promise<any>;
  deleteImportError(schoolId: string, id: string): Promise<void>;

  getTwinTag(schoolId: string, id: string): Promise<any | null>;
  listTwinTag(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinTag(schoolId: string, data: any): Promise<any>;
  updateTwinTag(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinTag(schoolId: string, id: string): Promise<void>;

  getTwinSearch(schoolId: string, id: string): Promise<any | null>;
  listTwinSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSearch(schoolId: string, data: any): Promise<any>;
  updateTwinSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSearch(schoolId: string, id: string): Promise<void>;

  getTwinSearchFilter(schoolId: string, id: string): Promise<any | null>;
  listTwinSearchFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSearchFilter(schoolId: string, data: any): Promise<any>;
  updateTwinSearchFilter(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSearchFilter(schoolId: string, id: string): Promise<void>;

  getTwinSearchResult(schoolId: string, id: string): Promise<any | null>;
  listTwinSearchResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSearchResult(schoolId: string, data: any): Promise<any>;
  updateTwinSearchResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSearchResult(schoolId: string, id: string): Promise<void>;

  getTwinComparison(schoolId: string, id: string): Promise<any | null>;
  listTwinComparison(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinComparison(schoolId: string, data: any): Promise<any>;
  updateTwinComparison(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinComparison(schoolId: string, id: string): Promise<void>;

  getComparisonMetric(schoolId: string, id: string): Promise<any | null>;
  listComparisonMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComparisonMetric(schoolId: string, data: any): Promise<any>;
  updateComparisonMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteComparisonMetric(schoolId: string, id: string): Promise<void>;

  getComparisonValue(schoolId: string, id: string): Promise<any | null>;
  listComparisonValue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComparisonValue(schoolId: string, data: any): Promise<any>;
  updateComparisonValue(schoolId: string, id: string, data: any): Promise<any>;
  deleteComparisonValue(schoolId: string, id: string): Promise<void>;

  getTwinSimulationScenario(schoolId: string, id: string): Promise<any | null>;
  listTwinSimulationScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSimulationScenario(schoolId: string, data: any): Promise<any>;
  updateTwinSimulationScenario(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSimulationScenario(schoolId: string, id: string): Promise<void>;

  getSimulationScenarioVariable(schoolId: string, id: string): Promise<any | null>;
  listSimulationScenarioVariable(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationScenarioVariable(schoolId: string, data: any): Promise<any>;
  updateSimulationScenarioVariable(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationScenarioVariable(schoolId: string, id: string): Promise<void>;

  getSimulationObjective(schoolId: string, id: string): Promise<any | null>;
  listSimulationObjective(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationObjective(schoolId: string, data: any): Promise<any>;
  updateSimulationObjective(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationObjective(schoolId: string, id: string): Promise<void>;

  getTwinAIInsight(schoolId: string, id: string): Promise<any | null>;
  listTwinAIInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAIInsight(schoolId: string, data: any): Promise<any>;
  updateTwinAIInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAIInsight(schoolId: string, id: string): Promise<void>;

  getTwinAIConfig(schoolId: string, id: string): Promise<any | null>;
  listTwinAIConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAIConfig(schoolId: string, data: any): Promise<any>;
  updateTwinAIConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAIConfig(schoolId: string, id: string): Promise<void>;

  getTwinRealtimeStream(schoolId: string, id: string): Promise<any | null>;
  listTwinRealtimeStream(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinRealtimeStream(schoolId: string, data: any): Promise<any>;
  updateTwinRealtimeStream(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinRealtimeStream(schoolId: string, id: string): Promise<void>;

  getTwinCache(schoolId: string, id: string): Promise<any | null>;
  listTwinCache(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinCache(schoolId: string, data: any): Promise<any>;
  updateTwinCache(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinCache(schoolId: string, id: string): Promise<void>;

  getTwinRateLimit(schoolId: string, id: string): Promise<any | null>;
  listTwinRateLimit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinRateLimit(schoolId: string, data: any): Promise<any>;
  updateTwinRateLimit(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinRateLimit(schoolId: string, id: string): Promise<void>;

  getTwinWebhook(schoolId: string, id: string): Promise<any | null>;
  listTwinWebhook(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinWebhook(schoolId: string, data: any): Promise<any>;
  updateTwinWebhook(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinWebhook(schoolId: string, id: string): Promise<void>;

  getTwinAPIKey(schoolId: string, id: string): Promise<any | null>;
  listTwinAPIKey(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAPIKey(schoolId: string, data: any): Promise<any>;
  updateTwinAPIKey(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAPIKey(schoolId: string, id: string): Promise<void>;

  getTwinBackup(schoolId: string, id: string): Promise<any | null>;
  listTwinBackup(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinBackup(schoolId: string, data: any): Promise<any>;
  updateTwinBackup(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinBackup(schoolId: string, id: string): Promise<void>;

  getTwinRestore(schoolId: string, id: string): Promise<any | null>;
  listTwinRestore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinRestore(schoolId: string, data: any): Promise<any>;
  updateTwinRestore(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinRestore(schoolId: string, id: string): Promise<void>;

  getTwinCostAnalysis(schoolId: string, id: string): Promise<any | null>;
  listTwinCostAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinCostAnalysis(schoolId: string, data: any): Promise<any>;
  updateTwinCostAnalysis(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinCostAnalysis(schoolId: string, id: string): Promise<void>;

  getCostBreakdownItem(schoolId: string, id: string): Promise<any | null>;
  listCostBreakdownItem(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCostBreakdownItem(schoolId: string, data: any): Promise<any>;
  updateCostBreakdownItem(schoolId: string, id: string, data: any): Promise<any>;
  deleteCostBreakdownItem(schoolId: string, id: string): Promise<void>;

  getTwinRiskAssessment(schoolId: string, id: string): Promise<any | null>;
  listTwinRiskAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinRiskAssessment(schoolId: string, data: any): Promise<any>;
  updateTwinRiskAssessment(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinRiskAssessment(schoolId: string, id: string): Promise<void>;

  getTwinSLA(schoolId: string, id: string): Promise<any | null>;
  listTwinSLA(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSLA(schoolId: string, data: any): Promise<any>;
  updateTwinSLA(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSLA(schoolId: string, id: string): Promise<void>;

  getSLAHistory(schoolId: string, id: string): Promise<any | null>;
  listSLAHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSLAHistory(schoolId: string, data: any): Promise<any>;
  updateSLAHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteSLAHistory(schoolId: string, id: string): Promise<void>;

  getSLAPenalty(schoolId: string, id: string): Promise<any | null>;
  listSLAPenalty(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSLAPenalty(schoolId: string, data: any): Promise<any>;
  updateSLAPenalty(schoolId: string, id: string, data: any): Promise<any>;
  deleteSLAPenalty(schoolId: string, id: string): Promise<void>;

  getTwinCapacityPlan(schoolId: string, id: string): Promise<any | null>;
  listTwinCapacityPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinCapacityPlan(schoolId: string, data: any): Promise<any>;
  updateTwinCapacityPlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinCapacityPlan(schoolId: string, id: string): Promise<void>;

  getCapacityExpansion(schoolId: string, id: string): Promise<any | null>;
  listCapacityExpansion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityExpansion(schoolId: string, data: any): Promise<any>;
  updateCapacityExpansion(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityExpansion(schoolId: string, id: string): Promise<void>;

  getTwinSchedule(schoolId: string, id: string): Promise<any | null>;
  listTwinSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSchedule(schoolId: string, data: any): Promise<any>;
  updateTwinSchedule(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSchedule(schoolId: string, id: string): Promise<void>;

  getTwinLog(schoolId: string, id: string): Promise<any | null>;
  listTwinLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinLog(schoolId: string, data: any): Promise<any>;
  updateTwinLog(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinLog(schoolId: string, id: string): Promise<void>;

  getTwinLatency(schoolId: string, id: string): Promise<any | null>;
  listTwinLatency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinLatency(schoolId: string, data: any): Promise<any>;
  updateTwinLatency(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinLatency(schoolId: string, id: string): Promise<void>;

  getTwinThroughput(schoolId: string, id: string): Promise<any | null>;
  listTwinThroughput(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinThroughput(schoolId: string, data: any): Promise<any>;
  updateTwinThroughput(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinThroughput(schoolId: string, id: string): Promise<void>;

  getTwinStorageMetrics(schoolId: string, id: string): Promise<any | null>;
  listTwinStorageMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinStorageMetrics(schoolId: string, data: any): Promise<any>;
  updateTwinStorageMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinStorageMetrics(schoolId: string, id: string): Promise<void>;

  getTwinNetworkMetrics(schoolId: string, id: string): Promise<any | null>;
  listTwinNetworkMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinNetworkMetrics(schoolId: string, data: any): Promise<any>;
  updateTwinNetworkMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinNetworkMetrics(schoolId: string, id: string): Promise<void>;

  getTwinComputeMetrics(schoolId: string, id: string): Promise<any | null>;
  listTwinComputeMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinComputeMetrics(schoolId: string, data: any): Promise<any>;
  updateTwinComputeMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinComputeMetrics(schoolId: string, id: string): Promise<void>;

  getTwinEdgeNode(schoolId: string, id: string): Promise<any | null>;
  listTwinEdgeNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinEdgeNode(schoolId: string, data: any): Promise<any>;
  updateTwinEdgeNode(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinEdgeNode(schoolId: string, id: string): Promise<void>;

  getTwinTopology(schoolId: string, id: string): Promise<any | null>;
  listTwinTopology(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinTopology(schoolId: string, data: any): Promise<any>;
  updateTwinTopology(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinTopology(schoolId: string, id: string): Promise<void>;

  getTwinTopologyNode(schoolId: string, id: string): Promise<any | null>;
  listTwinTopologyNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinTopologyNode(schoolId: string, data: any): Promise<any>;
  updateTwinTopologyNode(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinTopologyNode(schoolId: string, id: string): Promise<void>;

  getTwinTopologyEdge(schoolId: string, id: string): Promise<any | null>;
  listTwinTopologyEdge(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinTopologyEdge(schoolId: string, data: any): Promise<any>;
  updateTwinTopologyEdge(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinTopologyEdge(schoolId: string, id: string): Promise<void>;

  getTwinTopologyLayer(schoolId: string, id: string): Promise<any | null>;
  listTwinTopologyLayer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinTopologyLayer(schoolId: string, data: any): Promise<any>;
  updateTwinTopologyLayer(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinTopologyLayer(schoolId: string, id: string): Promise<void>;

  getTwinDataLineage(schoolId: string, id: string): Promise<any | null>;
  listTwinDataLineage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinDataLineage(schoolId: string, data: any): Promise<any>;
  updateTwinDataLineage(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinDataLineage(schoolId: string, id: string): Promise<void>;

  getDataTransformation(schoolId: string, id: string): Promise<any | null>;
  listDataTransformation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataTransformation(schoolId: string, data: any): Promise<any>;
  updateDataTransformation(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataTransformation(schoolId: string, id: string): Promise<void>;

}

class KnowledgeModuleRepositoryImpl implements KnowledgeModuleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new Error('GlobalCloud entity not found');
  }

  // =============================================================================
  // DIGITAL-TWIN
  // =============================================================================
  async getCapacityThreshold(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('capacity_thresholds')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCapacityThreshold(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('capacity_thresholds').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCapacityThresholdError(error.message);
    return data ?? [];
  }

  async createCapacityThreshold(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('capacity_thresholds')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCapacityThresholdError(error.message);
    return result;
  }

  async updateCapacityThreshold(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('capacity_thresholds')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCapacityThresholdError(error.message);
    return result;
  }

  async deleteCapacityThreshold(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('capacity_thresholds')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCapacityThresholdError(error.message);
  }

  async getCapacityProjection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('capacity_projectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCapacityProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('capacity_projectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCapacityProjectionError(error.message);
    return data ?? [];
  }

  async createCapacityProjection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('capacity_projectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCapacityProjectionError(error.message);
    return result;
  }

  async updateCapacityProjection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('capacity_projectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCapacityProjectionError(error.message);
    return result;
  }

  async deleteCapacityProjection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('capacity_projectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCapacityProjectionError(error.message);
  }

  async getTwinUtilization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_utilizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinUtilization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_utilizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinUtilizationError(error.message);
    return data ?? [];
  }

  async createTwinUtilization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_utilizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinUtilizationError(error.message);
    return result;
  }

  async updateTwinUtilization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_utilizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinUtilizationError(error.message);
    return result;
  }

  async deleteTwinUtilization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_utilizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinUtilizationError(error.message);
  }

  async getTwinEnergy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_energys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinEnergy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_energys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinEnergyError(error.message);
    return data ?? [];
  }

  async createTwinEnergy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_energys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinEnergyError(error.message);
    return result;
  }

  async updateTwinEnergy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_energys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinEnergyError(error.message);
    return result;
  }

  async deleteTwinEnergy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_energys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinEnergyError(error.message);
  }

  async getEnergySource(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('energy_sources')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnergySource(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('energy_sources').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnergySourceError(error.message);
    return data ?? [];
  }

  async createEnergySource(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('energy_sources')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnergySourceError(error.message);
    return result;
  }

  async updateEnergySource(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('energy_sources')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnergySourceError(error.message);
    return result;
  }

  async deleteEnergySource(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('energy_sources')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnergySourceError(error.message);
  }

  async getEnergyHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('energy_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnergyHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('energy_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnergyHistoryError(error.message);
    return data ?? [];
  }

  async createEnergyHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('energy_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnergyHistoryError(error.message);
    return result;
  }

  async updateEnergyHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('energy_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnergyHistoryError(error.message);
    return result;
  }

  async deleteEnergyHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('energy_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnergyHistoryError(error.message);
  }

  async getTwinWater(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_waters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinWater(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_waters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinWaterError(error.message);
    return data ?? [];
  }

  async createTwinWater(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_waters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinWaterError(error.message);
    return result;
  }

  async updateTwinWater(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_waters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinWaterError(error.message);
    return result;
  }

  async deleteTwinWater(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_waters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinWaterError(error.message);
  }

  async getWaterSource(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('water_sources')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWaterSource(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('water_sources').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWaterSourceError(error.message);
    return data ?? [];
  }

  async createWaterSource(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('water_sources')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWaterSourceError(error.message);
    return result;
  }

  async updateWaterSource(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('water_sources')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWaterSourceError(error.message);
    return result;
  }

  async deleteWaterSource(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('water_sources')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWaterSourceError(error.message);
  }

  async getWaterHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('water_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWaterHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('water_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWaterHistoryError(error.message);
    return data ?? [];
  }

  async createWaterHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('water_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWaterHistoryError(error.message);
    return result;
  }

  async updateWaterHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('water_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWaterHistoryError(error.message);
    return result;
  }

  async deleteWaterHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('water_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWaterHistoryError(error.message);
  }

  async getTwinWaste(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_wastes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinWaste(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_wastes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinWasteError(error.message);
    return data ?? [];
  }

  async createTwinWaste(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_wastes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinWasteError(error.message);
    return result;
  }

  async updateTwinWaste(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_wastes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinWasteError(error.message);
    return result;
  }

  async deleteTwinWaste(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_wastes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinWasteError(error.message);
  }

  async getWasteHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('waste_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWasteHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('waste_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWasteHistoryError(error.message);
    return data ?? [];
  }

  async createWasteHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('waste_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWasteHistoryError(error.message);
    return result;
  }

  async updateWasteHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('waste_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWasteHistoryError(error.message);
    return result;
  }

  async deleteWasteHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('waste_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWasteHistoryError(error.message);
  }

  async getTwinCarbon(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_carboa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinCarbon(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_carboa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinCarbonError(error.message);
    return data ?? [];
  }

  async createTwinCarbon(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_carboa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinCarbonError(error.message);
    return result;
  }

  async updateTwinCarbon(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_carboa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinCarbonError(error.message);
    return result;
  }

  async deleteTwinCarbon(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_carboa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinCarbonError(error.message);
  }

  async getCarbonHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('carbon_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCarbonHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('carbon_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCarbonHistoryError(error.message);
    return data ?? [];
  }

  async createCarbonHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('carbon_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCarbonHistoryError(error.message);
    return result;
  }

  async updateCarbonHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('carbon_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCarbonHistoryError(error.message);
    return result;
  }

  async deleteCarbonHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('carbon_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCarbonHistoryError(error.message);
  }

  async getTwinSecurity(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_securitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSecurity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_securitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinSecurityError(error.message);
    return data ?? [];
  }

  async createTwinSecurity(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_securitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinSecurityError(error.message);
    return result;
  }

  async updateTwinSecurity(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_securitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinSecurityError(error.message);
    return result;
  }

  async deleteTwinSecurity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_securitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinSecurityError(error.message);
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

  async getTwinAccess(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_accesses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAccess(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_accesses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAccessError(error.message);
    return data ?? [];
  }

  async createTwinAccess(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_accesses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAccessError(error.message);
    return result;
  }

  async updateTwinAccess(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_accesses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAccessError(error.message);
    return result;
  }

  async deleteTwinAccess(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_accesses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAccessError(error.message);
  }

  async getAccessPermission(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('access_permissioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAccessPermission(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('access_permissioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAccessPermissionError(error.message);
    return data ?? [];
  }

  async createAccessPermission(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('access_permissioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAccessPermissionError(error.message);
    return result;
  }

  async updateAccessPermission(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('access_permissioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAccessPermissionError(error.message);
    return result;
  }

  async deleteAccessPermission(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('access_permissioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAccessPermissionError(error.message);
  }

  async getTwinAuditLog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_audit_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAuditLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_audit_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAuditLogError(error.message);
    return data ?? [];
  }

  async createTwinAuditLog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_audit_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAuditLogError(error.message);
    return result;
  }

  async updateTwinAuditLog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_audit_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAuditLogError(error.message);
    return result;
  }

  async deleteTwinAuditLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_audit_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAuditLogError(error.message);
  }

  async getTwinIntegration(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_integratioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_integratioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinIntegrationError(error.message);
    return data ?? [];
  }

  async createTwinIntegration(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_integratioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinIntegrationError(error.message);
    return result;
  }

  async updateTwinIntegration(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_integratioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinIntegrationError(error.message);
    return result;
  }

  async deleteTwinIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_integratioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinIntegrationError(error.message);
  }

  async getTwinSync(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_syncs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSync(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_syncs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinSyncError(error.message);
    return data ?? [];
  }

  async createTwinSync(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_syncs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinSyncError(error.message);
    return result;
  }

  async updateTwinSync(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_syncs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinSyncError(error.message);
    return result;
  }

  async deleteTwinSync(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_syncs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinSyncError(error.message);
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

  async getTwinMapping(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_mappings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_mappings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinMappingError(error.message);
    return data ?? [];
  }

  async createTwinMapping(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_mappings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinMappingError(error.message);
    return result;
  }

  async updateTwinMapping(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_mappings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinMappingError(error.message);
    return result;
  }

  async deleteTwinMapping(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_mappings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinMappingError(error.message);
  }

  async getTwinTemplateRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinTemplateRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_templates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinTemplateError(error.message);
    return data ?? [];
  }

  async createTwinTemplateRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinTemplateError(error.message);
    return result;
  }

  async updateTwinTemplateRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinTemplateError(error.message);
    return result;
  }

  async deleteTwinTemplateRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinTemplateError(error.message);
  }

  async getTwinPlugin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_plugins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinPlugin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_plugins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinPluginError(error.message);
    return data ?? [];
  }

  async createTwinPlugin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_plugins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinPluginError(error.message);
    return result;
  }

  async updateTwinPlugin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_plugins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinPluginError(error.message);
    return result;
  }

  async deleteTwinPlugin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_plugins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinPluginError(error.message);
  }

  async getTwinPluginConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_plugins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinPluginConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_plugins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinPluginError(error.message);
    return data ?? [];
  }

  async createTwinPluginConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_plugins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinPluginError(error.message);
    return result;
  }

  async updateTwinPluginConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_plugins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinPluginError(error.message);
    return result;
  }

  async deleteTwinPluginConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_plugins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinPluginError(error.message);
  }

  async getTwinPluginMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_plugin_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinPluginMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_plugin_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinPluginMetricsError(error.message);
    return data ?? [];
  }

  async createTwinPluginMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_plugin_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinPluginMetricsError(error.message);
    return result;
  }

  async updateTwinPluginMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_plugin_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinPluginMetricsError(error.message);
    return result;
  }

  async deleteTwinPluginMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_plugin_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinPluginMetricsError(error.message);
  }

  async getTwinPluginVersion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_plugin_versioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinPluginVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_plugin_versioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinPluginVersionError(error.message);
    return data ?? [];
  }

  async createTwinPluginVersion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_plugin_versioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinPluginVersionError(error.message);
    return result;
  }

  async updateTwinPluginVersion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_plugin_versioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinPluginVersionError(error.message);
    return result;
  }

  async deleteTwinPluginVersion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_plugin_versioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinPluginVersionError(error.message);
  }

  async getTwinEventTypeRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_event_types')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinEventTypeRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_event_types').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinEventTypeError(error.message);
    return data ?? [];
  }

  async createTwinEventTypeRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_event_types')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinEventTypeError(error.message);
    return result;
  }

  async updateTwinEventTypeRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_event_types')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinEventTypeError(error.message);
    return result;
  }

  async deleteTwinEventTypeRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_event_types')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinEventTypeError(error.message);
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

  async getEscalationLevel(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('escalation_levels')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEscalationLevel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('escalation_levels').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEscalationLevelError(error.message);
    return data ?? [];
  }

  async createEscalationLevel(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('escalation_levels')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEscalationLevelError(error.message);
    return result;
  }

  async updateEscalationLevel(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('escalation_levels')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEscalationLevelError(error.message);
    return result;
  }

  async deleteEscalationLevel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('escalation_levels')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEscalationLevelError(error.message);
  }

  async getTwinEventSource(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_event_sources')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinEventSource(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_event_sources').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinEventSourceError(error.message);
    return data ?? [];
  }

  async createTwinEventSource(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_event_sources')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinEventSourceError(error.message);
    return result;
  }

  async updateTwinEventSource(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_event_sources')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinEventSourceError(error.message);
    return result;
  }

  async deleteTwinEventSource(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_event_sources')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinEventSourceError(error.message);
  }

  async getTwinConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinError(error.message);
    return data ?? [];
  }

  async createTwinConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinError(error.message);
    return result;
  }

  async updateTwinConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinError(error.message);
    return result;
  }

  async deleteTwinConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinError(error.message);
  }

  async getTwinAlertConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAlertConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAlertError(error.message);
    return data ?? [];
  }

  async createTwinAlertConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAlertError(error.message);
    return result;
  }

  async updateTwinAlertConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAlertError(error.message);
    return result;
  }

  async deleteTwinAlertConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAlertError(error.message);
  }

  async getTwinChangeLog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_change_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinChangeLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_change_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinChangeLogError(error.message);
    return data ?? [];
  }

  async createTwinChangeLog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_change_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinChangeLogError(error.message);
    return result;
  }

  async updateTwinChangeLog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_change_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinChangeLogError(error.message);
    return result;
  }

  async deleteTwinChangeLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_change_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinChangeLogError(error.message);
  }

  async getTwinDataFlow(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_data_flows')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinDataFlow(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_data_flows').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinDataFlowError(error.message);
    return data ?? [];
  }

  async createTwinDataFlow(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_data_flows')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinDataFlowError(error.message);
    return result;
  }

  async updateTwinDataFlow(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_data_flows')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinDataFlowError(error.message);
    return result;
  }

  async deleteTwinDataFlow(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_data_flows')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinDataFlowError(error.message);
  }

  async getTwinHealth(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_healths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_healths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinHealthError(error.message);
    return data ?? [];
  }

  async createTwinHealth(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_healths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinHealthError(error.message);
    return result;
  }

  async updateTwinHealth(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_healths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinHealthError(error.message);
    return result;
  }

  async deleteTwinHealth(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_healths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinHealthError(error.message);
  }

  async getTwinHealthComponent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_health_components')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinHealthComponent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_health_components').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinHealthComponentError(error.message);
    return data ?? [];
  }

  async createTwinHealthComponent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_health_components')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinHealthComponentError(error.message);
    return result;
  }

  async updateTwinHealthComponent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_health_components')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinHealthComponentError(error.message);
    return result;
  }

  async deleteTwinHealthComponent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_health_components')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinHealthComponentError(error.message);
  }

  async getTwinAnomaly(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_anomalys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAnomaly(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_anomalys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAnomalyError(error.message);
    return data ?? [];
  }

  async createTwinAnomaly(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_anomalys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAnomalyError(error.message);
    return result;
  }

  async updateTwinAnomaly(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_anomalys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAnomalyError(error.message);
    return result;
  }

  async deleteTwinAnomaly(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_anomalys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAnomalyError(error.message);
  }

  async getTwinOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinOptimizationError(error.message);
    return data ?? [];
  }

  async createTwinOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinOptimizationError(error.message);
    return result;
  }

  async updateTwinOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinOptimizationError(error.message);
    return result;
  }

  async deleteTwinOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinOptimizationError(error.message);
  }

  async getOptimizationRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('optimization_recommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOptimizationRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('optimization_recommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOptimizationRecommendationError(error.message);
    return data ?? [];
  }

  async createOptimizationRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('optimization_recommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOptimizationRecommendationError(error.message);
    return result;
  }

  async updateOptimizationRecommendation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('optimization_recommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOptimizationRecommendationError(error.message);
    return result;
  }

  async deleteOptimizationRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('optimization_recommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOptimizationRecommendationError(error.message);
  }

  async getTwinNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinNotificationError(error.message);
    return data ?? [];
  }

  async createTwinNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinNotificationError(error.message);
    return result;
  }

  async updateTwinNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinNotificationError(error.message);
    return result;
  }

  async deleteTwinNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinNotificationError(error.message);
  }

  async getTwinAggregation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_aggregatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAggregation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_aggregatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAggregationError(error.message);
    return data ?? [];
  }

  async createTwinAggregation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_aggregatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAggregationError(error.message);
    return result;
  }

  async updateTwinAggregation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_aggregatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAggregationError(error.message);
    return result;
  }

  async deleteTwinAggregation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_aggregatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAggregationError(error.message);
  }

  async getTwinTimeSeries(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_time_serieses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinTimeSeries(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_time_serieses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinTimeSeriesError(error.message);
    return data ?? [];
  }

  async createTwinTimeSeries(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_time_serieses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinTimeSeriesError(error.message);
    return result;
  }

  async updateTwinTimeSeries(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_time_serieses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinTimeSeriesError(error.message);
    return result;
  }

  async deleteTwinTimeSeries(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_time_serieses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinTimeSeriesError(error.message);
  }

  async getTimeSeriesDataPoint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('time_series_data_points')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTimeSeriesDataPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('time_series_data_points').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTimeSeriesDataPointError(error.message);
    return data ?? [];
  }

  async createTimeSeriesDataPoint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('time_series_data_points')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTimeSeriesDataPointError(error.message);
    return result;
  }

  async updateTimeSeriesDataPoint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('time_series_data_points')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTimeSeriesDataPointError(error.message);
    return result;
  }

  async deleteTimeSeriesDataPoint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('time_series_data_points')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTimeSeriesDataPointError(error.message);
  }

  async getTwinCorrelation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_correlatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinCorrelation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_correlatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinCorrelationError(error.message);
    return data ?? [];
  }

  async createTwinCorrelation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_correlatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinCorrelationError(error.message);
    return result;
  }

  async updateTwinCorrelation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_correlatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinCorrelationError(error.message);
    return result;
  }

  async deleteTwinCorrelation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_correlatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinCorrelationError(error.message);
  }

  async getTwinBenchmark(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_benchmarks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinBenchmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinBenchmarkError(error.message);
    return data ?? [];
  }

  async createTwinBenchmark(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_benchmarks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinBenchmarkError(error.message);
    return result;
  }

  async updateTwinBenchmark(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_benchmarks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinBenchmarkError(error.message);
    return result;
  }

  async deleteTwinBenchmark(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_benchmarks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinBenchmarkError(error.message);
  }

  async getBenchmarkMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('benchmark_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBenchmarkMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('benchmark_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBenchmarkMetricError(error.message);
    return data ?? [];
  }

  async createBenchmarkMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('benchmark_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBenchmarkMetricError(error.message);
    return result;
  }

  async updateBenchmarkMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('benchmark_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBenchmarkMetricError(error.message);
    return result;
  }

  async deleteBenchmarkMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('benchmark_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBenchmarkMetricError(error.message);
  }

  async getTwinProjection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_projectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_projectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinProjectionError(error.message);
    return data ?? [];
  }

  async createTwinProjection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_projectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinProjectionError(error.message);
    return result;
  }

  async updateTwinProjection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_projectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinProjectionError(error.message);
    return result;
  }

  async deleteTwinProjection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_projectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinProjectionError(error.message);
  }

  async getProjectionValue(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('projection_values')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listProjectionValue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('projection_values').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudProjectionValueError(error.message);
    return data ?? [];
  }

  async createProjectionValue(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('projection_values')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudProjectionValueError(error.message);
    return result;
  }

  async updateProjectionValue(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('projection_values')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudProjectionValueError(error.message);
    return result;
  }

  async deleteProjectionValue(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('projection_values')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudProjectionValueError(error.message);
  }

  async getTwinConstraint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_constraints')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinConstraint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_constraints').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinConstraintError(error.message);
    return data ?? [];
  }

  async createTwinConstraint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_constraints')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinConstraintError(error.message);
    return result;
  }

  async updateTwinConstraint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_constraints')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinConstraintError(error.message);
    return result;
  }

  async deleteTwinConstraint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_constraints')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinConstraintError(error.message);
  }

  async getTwinDependencyGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_dependency_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinDependencyGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_dependency_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinDependencyGraphError(error.message);
    return data ?? [];
  }

  async createTwinDependencyGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_dependency_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinDependencyGraphError(error.message);
    return result;
  }

  async updateTwinDependencyGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_dependency_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinDependencyGraphError(error.message);
    return result;
  }

  async deleteTwinDependencyGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_dependency_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinDependencyGraphError(error.message);
  }

  async getDependencyGraphNode(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('dependency_graph_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDependencyGraphNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('dependency_graph_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDependencyGraphNodeError(error.message);
    return data ?? [];
  }

  async createDependencyGraphNode(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dependency_graph_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDependencyGraphNodeError(error.message);
    return result;
  }

  async updateDependencyGraphNode(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('dependency_graph_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDependencyGraphNodeError(error.message);
    return result;
  }

  async deleteDependencyGraphNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dependency_graph_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDependencyGraphNodeError(error.message);
  }

  async getDependencyGraphEdge(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('dependency_graph_edges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDependencyGraphEdge(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('dependency_graph_edges').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDependencyGraphEdgeError(error.message);
    return data ?? [];
  }

  async createDependencyGraphEdge(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dependency_graph_edges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDependencyGraphEdgeError(error.message);
    return result;
  }

  async updateDependencyGraphEdge(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('dependency_graph_edges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDependencyGraphEdgeError(error.message);
    return result;
  }

  async deleteDependencyGraphEdge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dependency_graph_edges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDependencyGraphEdgeError(error.message);
  }

  async getTwinGovernance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_governances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinGovernance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_governances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinGovernanceError(error.message);
    return data ?? [];
  }

  async createTwinGovernance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_governances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinGovernanceError(error.message);
    return result;
  }

  async updateTwinGovernance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_governances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinGovernanceError(error.message);
    return result;
  }

  async deleteTwinGovernance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_governances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinGovernanceError(error.message);
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

  async getGovernanceRule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('governance_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernanceRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('governance_rules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernanceRuleError(error.message);
    return data ?? [];
  }

  async createGovernanceRule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('governance_rules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernanceRuleError(error.message);
    return result;
  }

  async updateGovernanceRule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('governance_rules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernanceRuleError(error.message);
    return result;
  }

  async deleteGovernanceRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('governance_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernanceRuleError(error.message);
  }

  async getGovernanceCompliance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('governance_compliances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernanceCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('governance_compliances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernanceComplianceError(error.message);
    return data ?? [];
  }

  async createGovernanceCompliance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('governance_compliances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernanceComplianceError(error.message);
    return result;
  }

  async updateGovernanceCompliance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('governance_compliances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernanceComplianceError(error.message);
    return result;
  }

  async deleteGovernanceCompliance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('governance_compliances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernanceComplianceError(error.message);
  }

  async getGovernanceViolation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('governance_violatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernanceViolation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('governance_violatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernanceViolationError(error.message);
    return data ?? [];
  }

  async createGovernanceViolation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('governance_violatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernanceViolationError(error.message);
    return result;
  }

  async updateGovernanceViolation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('governance_violatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernanceViolationError(error.message);
    return result;
  }

  async deleteGovernanceViolation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('governance_violatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernanceViolationError(error.message);
  }

  async getTwinLifecycleEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_lifecycle_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinLifecycleEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_lifecycle_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinLifecycleEventError(error.message);
    return data ?? [];
  }

  async createTwinLifecycleEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_lifecycle_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinLifecycleEventError(error.message);
    return result;
  }

  async updateTwinLifecycleEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_lifecycle_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinLifecycleEventError(error.message);
    return result;
  }

  async deleteTwinLifecycleEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_lifecycle_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinLifecycleEventError(error.message);
  }

  async getTwinMetadata(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_metadatas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinMetadata(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_metadatas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinMetadataError(error.message);
    return data ?? [];
  }

  async createTwinMetadata(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_metadatas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinMetadataError(error.message);
    return result;
  }

  async updateTwinMetadata(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_metadatas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinMetadataError(error.message);
    return result;
  }

  async deleteTwinMetadata(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_metadatas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinMetadataError(error.message);
  }

  async getTwinVersion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_versioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_versioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinVersionError(error.message);
    return data ?? [];
  }

  async createTwinVersion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_versioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinVersionError(error.message);
    return result;
  }

  async updateTwinVersion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_versioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinVersionError(error.message);
    return result;
  }

  async deleteTwinVersion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_versioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinVersionError(error.message);
  }

  async getTwinExport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_exports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinExport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_exports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinExportError(error.message);
    return data ?? [];
  }

  async createTwinExport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_exports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinExportError(error.message);
    return result;
  }

  async updateTwinExport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_exports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinExportError(error.message);
    return result;
  }

  async deleteTwinExport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_exports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinExportError(error.message);
  }

  async getTwinImport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_imports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinImport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_imports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinImportError(error.message);
    return data ?? [];
  }

  async createTwinImport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_imports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinImportError(error.message);
    return result;
  }

  async updateTwinImport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_imports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinImportError(error.message);
    return result;
  }

  async deleteTwinImport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_imports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinImportError(error.message);
  }

  async getImportError(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('import_errors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listImportError(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('import_errors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudImportErrorError(error.message);
    return data ?? [];
  }

  async createImportError(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('import_errors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudImportErrorError(error.message);
    return result;
  }

  async updateImportError(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('import_errors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudImportErrorError(error.message);
    return result;
  }

  async deleteImportError(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('import_errors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudImportErrorError(error.message);
  }

  async getTwinTag(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_tags')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinTag(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_tags').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinTagError(error.message);
    return data ?? [];
  }

  async createTwinTag(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_tags')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinTagError(error.message);
    return result;
  }

  async updateTwinTag(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_tags')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinTagError(error.message);
    return result;
  }

  async deleteTwinTag(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_tags')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinTagError(error.message);
  }

  async getTwinSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinSearchError(error.message);
    return data ?? [];
  }

  async createTwinSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinSearchError(error.message);
    return result;
  }

  async updateTwinSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinSearchError(error.message);
    return result;
  }

  async deleteTwinSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinSearchError(error.message);
  }

  async getTwinSearchFilter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_search_filters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSearchFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_search_filters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinSearchFilterError(error.message);
    return data ?? [];
  }

  async createTwinSearchFilter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_search_filters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinSearchFilterError(error.message);
    return result;
  }

  async updateTwinSearchFilter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_search_filters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinSearchFilterError(error.message);
    return result;
  }

  async deleteTwinSearchFilter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_search_filters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinSearchFilterError(error.message);
  }

  async getTwinSearchResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_search_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSearchResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_search_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinSearchResultError(error.message);
    return data ?? [];
  }

  async createTwinSearchResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_search_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinSearchResultError(error.message);
    return result;
  }

  async updateTwinSearchResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_search_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinSearchResultError(error.message);
    return result;
  }

  async deleteTwinSearchResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_search_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinSearchResultError(error.message);
  }

  async getTwinComparison(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_comparisoa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinComparison(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_comparisoa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinComparisonError(error.message);
    return data ?? [];
  }

  async createTwinComparison(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_comparisoa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinComparisonError(error.message);
    return result;
  }

  async updateTwinComparison(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_comparisoa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinComparisonError(error.message);
    return result;
  }

  async deleteTwinComparison(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_comparisoa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinComparisonError(error.message);
  }

  async getComparisonMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('comparison_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComparisonMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('comparison_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComparisonMetricError(error.message);
    return data ?? [];
  }

  async createComparisonMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('comparison_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComparisonMetricError(error.message);
    return result;
  }

  async updateComparisonMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('comparison_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComparisonMetricError(error.message);
    return result;
  }

  async deleteComparisonMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('comparison_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComparisonMetricError(error.message);
  }

  async getComparisonValue(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('comparison_values')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComparisonValue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('comparison_values').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComparisonValueError(error.message);
    return data ?? [];
  }

  async createComparisonValue(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('comparison_values')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComparisonValueError(error.message);
    return result;
  }

  async updateComparisonValue(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('comparison_values')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComparisonValueError(error.message);
    return result;
  }

  async deleteComparisonValue(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('comparison_values')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComparisonValueError(error.message);
  }

  async getTwinSimulationScenario(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_simulation_scenarios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSimulationScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_simulation_scenarios').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinSimulationScenarioError(error.message);
    return data ?? [];
  }

  async createTwinSimulationScenario(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_simulation_scenarios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinSimulationScenarioError(error.message);
    return result;
  }

  async updateTwinSimulationScenario(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_simulation_scenarios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinSimulationScenarioError(error.message);
    return result;
  }

  async deleteTwinSimulationScenario(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_simulation_scenarios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinSimulationScenarioError(error.message);
  }

  async getSimulationScenarioVariable(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_scenario_variables')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationScenarioVariable(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_scenario_variables').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationScenarioVariableError(error.message);
    return data ?? [];
  }

  async createSimulationScenarioVariable(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_scenario_variables')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationScenarioVariableError(error.message);
    return result;
  }

  async updateSimulationScenarioVariable(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_scenario_variables')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationScenarioVariableError(error.message);
    return result;
  }

  async deleteSimulationScenarioVariable(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_scenario_variables')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationScenarioVariableError(error.message);
  }

  async getSimulationObjective(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_objectives')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationObjective(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_objectives').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationObjectiveError(error.message);
    return data ?? [];
  }

  async createSimulationObjective(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_objectives')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationObjectiveError(error.message);
    return result;
  }

  async updateSimulationObjective(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_objectives')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationObjectiveError(error.message);
    return result;
  }

  async deleteSimulationObjective(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_objectives')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationObjectiveError(error.message);
  }

  async getTwinAIInsight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_aiinsights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAIInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_aiinsights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAIInsightError(error.message);
    return data ?? [];
  }

  async createTwinAIInsight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_aiinsights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAIInsightError(error.message);
    return result;
  }

  async updateTwinAIInsight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_aiinsights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAIInsightError(error.message);
    return result;
  }

  async deleteTwinAIInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_aiinsights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAIInsightError(error.message);
  }

  async getTwinAIConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_ais')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAIConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_ais').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAIError(error.message);
    return data ?? [];
  }

  async createTwinAIConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_ais')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAIError(error.message);
    return result;
  }

  async updateTwinAIConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_ais')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAIError(error.message);
    return result;
  }

  async deleteTwinAIConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_ais')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAIError(error.message);
  }

  async getTwinRealtimeStream(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_realtime_streams')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinRealtimeStream(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_realtime_streams').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinRealtimeStreamError(error.message);
    return data ?? [];
  }

  async createTwinRealtimeStream(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_realtime_streams')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinRealtimeStreamError(error.message);
    return result;
  }

  async updateTwinRealtimeStream(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_realtime_streams')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinRealtimeStreamError(error.message);
    return result;
  }

  async deleteTwinRealtimeStream(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_realtime_streams')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinRealtimeStreamError(error.message);
  }

  async getTwinCache(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_caches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinCache(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_caches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinCacheError(error.message);
    return data ?? [];
  }

  async createTwinCache(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_caches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinCacheError(error.message);
    return result;
  }

  async updateTwinCache(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_caches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinCacheError(error.message);
    return result;
  }

  async deleteTwinCache(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_caches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinCacheError(error.message);
  }

  async getTwinRateLimit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_rate_limits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinRateLimit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_rate_limits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinRateLimitError(error.message);
    return data ?? [];
  }

  async createTwinRateLimit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_rate_limits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinRateLimitError(error.message);
    return result;
  }

  async updateTwinRateLimit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_rate_limits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinRateLimitError(error.message);
    return result;
  }

  async deleteTwinRateLimit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_rate_limits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinRateLimitError(error.message);
  }

  async getTwinWebhook(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_webhooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinWebhook(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinWebhookError(error.message);
    return data ?? [];
  }

  async createTwinWebhook(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_webhooks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinWebhookError(error.message);
    return result;
  }

  async updateTwinWebhook(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_webhooks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinWebhookError(error.message);
    return result;
  }

  async deleteTwinWebhook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_webhooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinWebhookError(error.message);
  }

  async getTwinAPIKey(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_apikeies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAPIKey(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_apikeies').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAPIKeyError(error.message);
    return data ?? [];
  }

  async createTwinAPIKey(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_apikeies')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAPIKeyError(error.message);
    return result;
  }

  async updateTwinAPIKey(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_apikeies')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAPIKeyError(error.message);
    return result;
  }

  async deleteTwinAPIKey(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_apikeies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAPIKeyError(error.message);
  }

  async getTwinBackup(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_backups')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinBackup(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_backups').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinBackupError(error.message);
    return data ?? [];
  }

  async createTwinBackup(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_backups')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinBackupError(error.message);
    return result;
  }

  async updateTwinBackup(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_backups')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinBackupError(error.message);
    return result;
  }

  async deleteTwinBackup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_backups')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinBackupError(error.message);
  }

  async getTwinRestore(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_restores')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinRestore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_restores').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinRestoreError(error.message);
    return data ?? [];
  }

  async createTwinRestore(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_restores')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinRestoreError(error.message);
    return result;
  }

  async updateTwinRestore(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_restores')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinRestoreError(error.message);
    return result;
  }

  async deleteTwinRestore(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_restores')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinRestoreError(error.message);
  }

  async getTwinCostAnalysis(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_cost_analysises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinCostAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_cost_analysises').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinCostAnalysisError(error.message);
    return data ?? [];
  }

  async createTwinCostAnalysis(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_cost_analysises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinCostAnalysisError(error.message);
    return result;
  }

  async updateTwinCostAnalysis(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_cost_analysises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinCostAnalysisError(error.message);
    return result;
  }

  async deleteTwinCostAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_cost_analysises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinCostAnalysisError(error.message);
  }

  async getCostBreakdownItem(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cost_breakdown_items')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCostBreakdownItem(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cost_breakdown_items').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCostBreakdownItemError(error.message);
    return data ?? [];
  }

  async createCostBreakdownItem(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cost_breakdown_items')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCostBreakdownItemError(error.message);
    return result;
  }

  async updateCostBreakdownItem(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cost_breakdown_items')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCostBreakdownItemError(error.message);
    return result;
  }

  async deleteCostBreakdownItem(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cost_breakdown_items')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCostBreakdownItemError(error.message);
  }

  async getTwinRiskAssessment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_risk_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinRiskAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_risk_assessments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinRiskAssessmentError(error.message);
    return data ?? [];
  }

  async createTwinRiskAssessment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_risk_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinRiskAssessmentError(error.message);
    return result;
  }

  async updateTwinRiskAssessment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_risk_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinRiskAssessmentError(error.message);
    return result;
  }

  async deleteTwinRiskAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_risk_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinRiskAssessmentError(error.message);
  }

  async getTwinSLA(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_slas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSLA(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_slas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinSLAError(error.message);
    return data ?? [];
  }

  async createTwinSLA(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_slas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinSLAError(error.message);
    return result;
  }

  async updateTwinSLA(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_slas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinSLAError(error.message);
    return result;
  }

  async deleteTwinSLA(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_slas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinSLAError(error.message);
  }

  async getSLAHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('slahistorys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSLAHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('slahistorys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSLAHistoryError(error.message);
    return data ?? [];
  }

  async createSLAHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('slahistorys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSLAHistoryError(error.message);
    return result;
  }

  async updateSLAHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('slahistorys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSLAHistoryError(error.message);
    return result;
  }

  async deleteSLAHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('slahistorys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSLAHistoryError(error.message);
  }

  async getSLAPenalty(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('slapenaltys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSLAPenalty(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('slapenaltys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSLAPenaltyError(error.message);
    return data ?? [];
  }

  async createSLAPenalty(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('slapenaltys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSLAPenaltyError(error.message);
    return result;
  }

  async updateSLAPenalty(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('slapenaltys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSLAPenaltyError(error.message);
    return result;
  }

  async deleteSLAPenalty(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('slapenaltys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSLAPenaltyError(error.message);
  }

  async getTwinCapacityPlan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_capacity_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinCapacityPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_capacity_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinCapacityPlanError(error.message);
    return data ?? [];
  }

  async createTwinCapacityPlan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_capacity_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinCapacityPlanError(error.message);
    return result;
  }

  async updateTwinCapacityPlan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_capacity_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinCapacityPlanError(error.message);
    return result;
  }

  async deleteTwinCapacityPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_capacity_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinCapacityPlanError(error.message);
  }

  async getCapacityExpansion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('capacity_expansioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCapacityExpansion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('capacity_expansioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCapacityExpansionError(error.message);
    return data ?? [];
  }

  async createCapacityExpansion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('capacity_expansioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCapacityExpansionError(error.message);
    return result;
  }

  async updateCapacityExpansion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('capacity_expansioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCapacityExpansionError(error.message);
    return result;
  }

  async deleteCapacityExpansion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('capacity_expansioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCapacityExpansionError(error.message);
  }

  async getTwinSchedule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_schedules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinScheduleError(error.message);
    return data ?? [];
  }

  async createTwinSchedule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_schedules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinScheduleError(error.message);
    return result;
  }

  async updateTwinSchedule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_schedules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinScheduleError(error.message);
    return result;
  }

  async deleteTwinSchedule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_schedules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinScheduleError(error.message);
  }

  async getTwinLog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinLogError(error.message);
    return data ?? [];
  }

  async createTwinLog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinLogError(error.message);
    return result;
  }

  async updateTwinLog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinLogError(error.message);
    return result;
  }

  async deleteTwinLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinLogError(error.message);
  }

  async getTwinLatency(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_latencys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinLatency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_latencys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinLatencyError(error.message);
    return data ?? [];
  }

  async createTwinLatency(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_latencys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinLatencyError(error.message);
    return result;
  }

  async updateTwinLatency(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_latencys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinLatencyError(error.message);
    return result;
  }

  async deleteTwinLatency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_latencys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinLatencyError(error.message);
  }

  async getTwinThroughput(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_throughputs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinThroughput(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_throughputs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinThroughputError(error.message);
    return data ?? [];
  }

  async createTwinThroughput(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_throughputs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinThroughputError(error.message);
    return result;
  }

  async updateTwinThroughput(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_throughputs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinThroughputError(error.message);
    return result;
  }

  async deleteTwinThroughput(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_throughputs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinThroughputError(error.message);
  }

  async getTwinStorageMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_storage_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinStorageMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_storage_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinStorageMetricsError(error.message);
    return data ?? [];
  }

  async createTwinStorageMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_storage_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinStorageMetricsError(error.message);
    return result;
  }

  async updateTwinStorageMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_storage_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinStorageMetricsError(error.message);
    return result;
  }

  async deleteTwinStorageMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_storage_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinStorageMetricsError(error.message);
  }

  async getTwinNetworkMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_network_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinNetworkMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_network_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinNetworkMetricsError(error.message);
    return data ?? [];
  }

  async createTwinNetworkMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_network_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinNetworkMetricsError(error.message);
    return result;
  }

  async updateTwinNetworkMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_network_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinNetworkMetricsError(error.message);
    return result;
  }

  async deleteTwinNetworkMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_network_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinNetworkMetricsError(error.message);
  }

  async getTwinComputeMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_compute_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinComputeMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_compute_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinComputeMetricsError(error.message);
    return data ?? [];
  }

  async createTwinComputeMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_compute_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinComputeMetricsError(error.message);
    return result;
  }

  async updateTwinComputeMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_compute_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinComputeMetricsError(error.message);
    return result;
  }

  async deleteTwinComputeMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_compute_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinComputeMetricsError(error.message);
  }

  async getTwinEdgeNode(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_edge_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinEdgeNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_edge_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinEdgeNodeError(error.message);
    return data ?? [];
  }

  async createTwinEdgeNode(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_edge_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinEdgeNodeError(error.message);
    return result;
  }

  async updateTwinEdgeNode(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_edge_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinEdgeNodeError(error.message);
    return result;
  }

  async deleteTwinEdgeNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_edge_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinEdgeNodeError(error.message);
  }

  async getTwinTopology(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_topologys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinTopology(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_topologys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinTopologyError(error.message);
    return data ?? [];
  }

  async createTwinTopology(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_topologys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinTopologyError(error.message);
    return result;
  }

  async updateTwinTopology(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_topologys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinTopologyError(error.message);
    return result;
  }

  async deleteTwinTopology(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_topologys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinTopologyError(error.message);
  }

  async getTwinTopologyNode(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_topology_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinTopologyNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_topology_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinTopologyNodeError(error.message);
    return data ?? [];
  }

  async createTwinTopologyNode(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_topology_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinTopologyNodeError(error.message);
    return result;
  }

  async updateTwinTopologyNode(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_topology_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinTopologyNodeError(error.message);
    return result;
  }

  async deleteTwinTopologyNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_topology_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinTopologyNodeError(error.message);
  }

  async getTwinTopologyEdge(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_topology_edges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinTopologyEdge(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_topology_edges').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinTopologyEdgeError(error.message);
    return data ?? [];
  }

  async createTwinTopologyEdge(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_topology_edges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinTopologyEdgeError(error.message);
    return result;
  }

  async updateTwinTopologyEdge(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_topology_edges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinTopologyEdgeError(error.message);
    return result;
  }

  async deleteTwinTopologyEdge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_topology_edges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinTopologyEdgeError(error.message);
  }

  async getTwinTopologyLayer(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_topology_layers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinTopologyLayer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_topology_layers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinTopologyLayerError(error.message);
    return data ?? [];
  }

  async createTwinTopologyLayer(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_topology_layers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinTopologyLayerError(error.message);
    return result;
  }

  async updateTwinTopologyLayer(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_topology_layers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinTopologyLayerError(error.message);
    return result;
  }

  async deleteTwinTopologyLayer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_topology_layers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinTopologyLayerError(error.message);
  }

  async getTwinDataLineage(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_data_lineages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinDataLineage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_data_lineages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinDataLineageError(error.message);
    return data ?? [];
  }

  async createTwinDataLineage(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_data_lineages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinDataLineageError(error.message);
    return result;
  }

  async updateTwinDataLineage(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_data_lineages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinDataLineageError(error.message);
    return result;
  }

  async deleteTwinDataLineage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_data_lineages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinDataLineageError(error.message);
  }

  async getDataTransformation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_transformatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataTransformation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_transformatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataTransformationError(error.message);
    return data ?? [];
  }

  async createDataTransformation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_transformatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataTransformationError(error.message);
    return result;
  }

  async updateDataTransformation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_transformatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataTransformationError(error.message);
    return result;
  }

  async deleteDataTransformation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_transformatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataTransformationError(error.message);
  }

}

export function createKnowledgeModuleRepository(supabase: SupabaseClient): KnowledgeModuleRepository {
  return new KnowledgeModuleRepositoryImpl(supabase);
}


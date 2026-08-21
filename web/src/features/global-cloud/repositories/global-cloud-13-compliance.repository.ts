import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudAlertAcknowledgementError, EduCloudAlertEscalationError, EduCloudAlertIncidentError, EduCloudAlertRuleError, EduCloudAnomalyDetectorError, EduCloudAnomalyError, EduCloudBusinessMonitorError, EduCloudCapacityForecastError, EduCloudCapacityMetricError, EduCloudChangeRequestError, EduCloudCorrelationEngineError, EduCloudCorrelationError, EduCloudCostAlertError, EduCloudCostBreakdownError, EduCloudCostMonitorError, EduCloudDeploymentError, EduCloudDigitalTwinMonitorError, EduCloudDigitalTwinPredictionError, EduCloudDistributedTraceError, EduCloudErrorBudgetError, EduCloudEventCorrelationError, EduCloudEventError, EduCloudFeatureFlagError, EduCloudFeatureFlagRuleError, EduCloudHealthCheckError, EduCloudHealthCheckResultError, EduCloudIncidentError, EduCloudIncidentTimelineError, EduCloudInfrastructureMetricError, EduCloudInfrastructureMonitorError, EduCloudLogAggregationError, EduCloudLogError, EduCloudMaintenanceWindowError, EduCloudMetricAlertError, EduCloudMetricDataPointError, EduCloudMetricError, EduCloudMetricSeriesError, EduCloudObservabilityDashboardError, EduCloudObservabilityReportError, EduCloudObservabilityWidgetError, EduCloudOnCallOverrideError, EduCloudOnCallRotationError, EduCloudOnCallScheduleError, EduCloudPerformanceBaselineError, EduCloudPerformanceBaselineMetricError, EduCloudPerformanceLatencyError, EduCloudPerformanceReportError, EduCloudPerformanceServiceReportError, EduCloudPostMortemActionItemError, EduCloudPostMortemError, EduCloudPostMortemImpactError, EduCloudPostMortemTimelineError, EduCloudPredictiveAlertError, EduCloudReportMetricError, EduCloudRunbookError, EduCloudRunbookStepError, EduCloudSLAMonitorError, EduCloudSLOTargetError, EduCloudSpanLogError, EduCloudTraceSpanError, EduCloudWidgetPositionError, EduCloudWidgetSizeError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface ComplianceModuleRepository {

  // =============================================================================
  // ENTERPRISE-OBSERVABILITY
  // =============================================================================
  getDistributedTrace(schoolId: string, id: string): Promise<any | null>;
  listDistributedTrace(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDistributedTrace(schoolId: string, data: any): Promise<any>;
  updateDistributedTrace(schoolId: string, id: string, data: any): Promise<any>;
  deleteDistributedTrace(schoolId: string, id: string): Promise<void>;

  getTraceSpan(schoolId: string, id: string): Promise<any | null>;
  listTraceSpan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTraceSpan(schoolId: string, data: any): Promise<any>;
  updateTraceSpan(schoolId: string, id: string, data: any): Promise<any>;
  deleteTraceSpan(schoolId: string, id: string): Promise<void>;

  getSpanLog(schoolId: string, id: string): Promise<any | null>;
  listSpanLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSpanLog(schoolId: string, data: any): Promise<any>;
  updateSpanLog(schoolId: string, id: string, data: any): Promise<any>;
  deleteSpanLog(schoolId: string, id: string): Promise<void>;

  getMetric(schoolId: string, id: string): Promise<any | null>;
  listMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMetric(schoolId: string, data: any): Promise<any>;
  updateMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteMetric(schoolId: string, id: string): Promise<void>;

  getMetricSeries(schoolId: string, id: string): Promise<any | null>;
  listMetricSeries(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMetricSeries(schoolId: string, data: any): Promise<any>;
  updateMetricSeries(schoolId: string, id: string, data: any): Promise<any>;
  deleteMetricSeries(schoolId: string, id: string): Promise<void>;

  getMetricDataPoint(schoolId: string, id: string): Promise<any | null>;
  listMetricDataPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMetricDataPoint(schoolId: string, data: any): Promise<any>;
  updateMetricDataPoint(schoolId: string, id: string, data: any): Promise<any>;
  deleteMetricDataPoint(schoolId: string, id: string): Promise<void>;

  getMetricAlert(schoolId: string, id: string): Promise<any | null>;
  listMetricAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMetricAlert(schoolId: string, data: any): Promise<any>;
  updateMetricAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteMetricAlert(schoolId: string, id: string): Promise<void>;

  getLogEntry(schoolId: string, id: string): Promise<any | null>;
  listLogEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLogEntry(schoolId: string, data: any): Promise<any>;
  updateLogEntry(schoolId: string, id: string, data: any): Promise<any>;
  deleteLogEntry(schoolId: string, id: string): Promise<void>;

  getLogAggregationRecord(schoolId: string, id: string): Promise<any | null>;
  listLogAggregationRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLogAggregationRecord(schoolId: string, data: any): Promise<any>;
  updateLogAggregationRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteLogAggregationRecord(schoolId: string, id: string): Promise<void>;

  getEvent(schoolId: string, id: string): Promise<any | null>;
  listEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEvent(schoolId: string, data: any): Promise<any>;
  updateEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteEvent(schoolId: string, id: string): Promise<void>;

  getEventCorrelation(schoolId: string, id: string): Promise<any | null>;
  listEventCorrelation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEventCorrelation(schoolId: string, data: any): Promise<any>;
  updateEventCorrelation(schoolId: string, id: string, data: any): Promise<any>;
  deleteEventCorrelation(schoolId: string, id: string): Promise<void>;

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

  getAlertAcknowledgement(schoolId: string, id: string): Promise<any | null>;
  listAlertAcknowledgement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlertAcknowledgement(schoolId: string, data: any): Promise<any>;
  updateAlertAcknowledgement(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlertAcknowledgement(schoolId: string, id: string): Promise<void>;

  getAlertEscalationRecord(schoolId: string, id: string): Promise<any | null>;
  listAlertEscalationRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlertEscalationRecord(schoolId: string, data: any): Promise<any>;
  updateAlertEscalationRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlertEscalationRecord(schoolId: string, id: string): Promise<void>;

  getSLAMonitor(schoolId: string, id: string): Promise<any | null>;
  listSLAMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSLAMonitor(schoolId: string, data: any): Promise<any>;
  updateSLAMonitor(schoolId: string, id: string, data: any): Promise<any>;
  deleteSLAMonitor(schoolId: string, id: string): Promise<void>;

  getSLOTarget(schoolId: string, id: string): Promise<any | null>;
  listSLOTarget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSLOTarget(schoolId: string, data: any): Promise<any>;
  updateSLOTarget(schoolId: string, id: string, data: any): Promise<any>;
  deleteSLOTarget(schoolId: string, id: string): Promise<void>;

  getErrorBudgetRecord(schoolId: string, id: string): Promise<any | null>;
  listErrorBudgetRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createErrorBudgetRecord(schoolId: string, data: any): Promise<any>;
  updateErrorBudgetRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteErrorBudgetRecord(schoolId: string, id: string): Promise<void>;

  getCostMonitor(schoolId: string, id: string): Promise<any | null>;
  listCostMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCostMonitor(schoolId: string, data: any): Promise<any>;
  updateCostMonitor(schoolId: string, id: string, data: any): Promise<any>;
  deleteCostMonitor(schoolId: string, id: string): Promise<void>;

  getCostBreakdown(schoolId: string, id: string): Promise<any | null>;
  listCostBreakdown(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCostBreakdown(schoolId: string, data: any): Promise<any>;
  updateCostBreakdown(schoolId: string, id: string, data: any): Promise<any>;
  deleteCostBreakdown(schoolId: string, id: string): Promise<void>;

  getCostAlert(schoolId: string, id: string): Promise<any | null>;
  listCostAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCostAlert(schoolId: string, data: any): Promise<any>;
  updateCostAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteCostAlert(schoolId: string, id: string): Promise<void>;

  getBusinessMonitor(schoolId: string, id: string): Promise<any | null>;
  listBusinessMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBusinessMonitor(schoolId: string, data: any): Promise<any>;
  updateBusinessMonitor(schoolId: string, id: string, data: any): Promise<any>;
  deleteBusinessMonitor(schoolId: string, id: string): Promise<void>;

  getInfrastructureMonitor(schoolId: string, id: string): Promise<any | null>;
  listInfrastructureMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInfrastructureMonitor(schoolId: string, data: any): Promise<any>;
  updateInfrastructureMonitor(schoolId: string, id: string, data: any): Promise<any>;
  deleteInfrastructureMonitor(schoolId: string, id: string): Promise<void>;

  getInfrastructureMetricRecord(schoolId: string, id: string): Promise<any | null>;
  listInfrastructureMetricRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInfrastructureMetricRecord(schoolId: string, data: any): Promise<any>;
  updateInfrastructureMetricRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteInfrastructureMetricRecord(schoolId: string, id: string): Promise<void>;

  getDigitalTwinMonitor(schoolId: string, id: string): Promise<any | null>;
  listDigitalTwinMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDigitalTwinMonitor(schoolId: string, data: any): Promise<any>;
  updateDigitalTwinMonitor(schoolId: string, id: string, data: any): Promise<any>;
  deleteDigitalTwinMonitor(schoolId: string, id: string): Promise<void>;

  getDigitalTwinPrediction(schoolId: string, id: string): Promise<any | null>;
  listDigitalTwinPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDigitalTwinPrediction(schoolId: string, data: any): Promise<any>;
  updateDigitalTwinPrediction(schoolId: string, id: string, data: any): Promise<any>;
  deleteDigitalTwinPrediction(schoolId: string, id: string): Promise<void>;

  getPredictiveAlert(schoolId: string, id: string): Promise<any | null>;
  listPredictiveAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPredictiveAlert(schoolId: string, data: any): Promise<any>;
  updatePredictiveAlert(schoolId: string, id: string, data: any): Promise<any>;
  deletePredictiveAlert(schoolId: string, id: string): Promise<void>;

  getAnomalyDetector(schoolId: string, id: string): Promise<any | null>;
  listAnomalyDetector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAnomalyDetector(schoolId: string, data: any): Promise<any>;
  updateAnomalyDetector(schoolId: string, id: string, data: any): Promise<any>;
  deleteAnomalyDetector(schoolId: string, id: string): Promise<void>;

  getAnomaly(schoolId: string, id: string): Promise<any | null>;
  listAnomaly(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAnomaly(schoolId: string, data: any): Promise<any>;
  updateAnomaly(schoolId: string, id: string, data: any): Promise<any>;
  deleteAnomaly(schoolId: string, id: string): Promise<void>;

  getCorrelationEngine(schoolId: string, id: string): Promise<any | null>;
  listCorrelationEngine(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCorrelationEngine(schoolId: string, data: any): Promise<any>;
  updateCorrelationEngine(schoolId: string, id: string, data: any): Promise<any>;
  deleteCorrelationEngine(schoolId: string, id: string): Promise<void>;

  getCorrelation(schoolId: string, id: string): Promise<any | null>;
  listCorrelation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCorrelation(schoolId: string, data: any): Promise<any>;
  updateCorrelation(schoolId: string, id: string, data: any): Promise<any>;
  deleteCorrelation(schoolId: string, id: string): Promise<void>;

  getObservabilityDashboard(schoolId: string, id: string): Promise<any | null>;
  listObservabilityDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createObservabilityDashboard(schoolId: string, data: any): Promise<any>;
  updateObservabilityDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteObservabilityDashboard(schoolId: string, id: string): Promise<void>;

  getObservabilityWidget(schoolId: string, id: string): Promise<any | null>;
  listObservabilityWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createObservabilityWidget(schoolId: string, data: any): Promise<any>;
  updateObservabilityWidget(schoolId: string, id: string, data: any): Promise<any>;
  deleteObservabilityWidget(schoolId: string, id: string): Promise<void>;

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

  getObservabilityReport(schoolId: string, id: string): Promise<any | null>;
  listObservabilityReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createObservabilityReport(schoolId: string, data: any): Promise<any>;
  updateObservabilityReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteObservabilityReport(schoolId: string, id: string): Promise<void>;

  getReportMetric(schoolId: string, id: string): Promise<any | null>;
  listReportMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createReportMetric(schoolId: string, data: any): Promise<any>;
  updateReportMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteReportMetric(schoolId: string, id: string): Promise<void>;

  getRunbook(schoolId: string, id: string): Promise<any | null>;
  listRunbook(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRunbook(schoolId: string, data: any): Promise<any>;
  updateRunbook(schoolId: string, id: string, data: any): Promise<any>;
  deleteRunbook(schoolId: string, id: string): Promise<void>;

  getRunbookStep(schoolId: string, id: string): Promise<any | null>;
  listRunbookStep(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRunbookStep(schoolId: string, data: any): Promise<any>;
  updateRunbookStep(schoolId: string, id: string, data: any): Promise<any>;
  deleteRunbookStep(schoolId: string, id: string): Promise<void>;

  getIncident(schoolId: string, id: string): Promise<any | null>;
  listIncident(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createIncident(schoolId: string, data: any): Promise<any>;
  updateIncident(schoolId: string, id: string, data: any): Promise<any>;
  deleteIncident(schoolId: string, id: string): Promise<void>;

  getIncidentTimelineEntry(schoolId: string, id: string): Promise<any | null>;
  listIncidentTimelineEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createIncidentTimelineEntry(schoolId: string, data: any): Promise<any>;
  updateIncidentTimelineEntry(schoolId: string, id: string, data: any): Promise<any>;
  deleteIncidentTimelineEntry(schoolId: string, id: string): Promise<void>;

  getPostMortem(schoolId: string, id: string): Promise<any | null>;
  listPostMortem(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPostMortem(schoolId: string, data: any): Promise<any>;
  updatePostMortem(schoolId: string, id: string, data: any): Promise<any>;
  deletePostMortem(schoolId: string, id: string): Promise<void>;

  getPostMortemTimelineEntry(schoolId: string, id: string): Promise<any | null>;
  listPostMortemTimelineEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPostMortemTimelineEntry(schoolId: string, data: any): Promise<any>;
  updatePostMortemTimelineEntry(schoolId: string, id: string, data: any): Promise<any>;
  deletePostMortemTimelineEntry(schoolId: string, id: string): Promise<void>;

  getPostMortemImpact(schoolId: string, id: string): Promise<any | null>;
  listPostMortemImpact(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPostMortemImpact(schoolId: string, data: any): Promise<any>;
  updatePostMortemImpact(schoolId: string, id: string, data: any): Promise<any>;
  deletePostMortemImpact(schoolId: string, id: string): Promise<void>;

  getPostMortemActionItem(schoolId: string, id: string): Promise<any | null>;
  listPostMortemActionItem(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPostMortemActionItem(schoolId: string, data: any): Promise<any>;
  updatePostMortemActionItem(schoolId: string, id: string, data: any): Promise<any>;
  deletePostMortemActionItem(schoolId: string, id: string): Promise<void>;

  getOnCallSchedule(schoolId: string, id: string): Promise<any | null>;
  listOnCallSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOnCallSchedule(schoolId: string, data: any): Promise<any>;
  updateOnCallSchedule(schoolId: string, id: string, data: any): Promise<any>;
  deleteOnCallSchedule(schoolId: string, id: string): Promise<void>;

  getOnCallRotationEntry(schoolId: string, id: string): Promise<any | null>;
  listOnCallRotationEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOnCallRotationEntry(schoolId: string, data: any): Promise<any>;
  updateOnCallRotationEntry(schoolId: string, id: string, data: any): Promise<any>;
  deleteOnCallRotationEntry(schoolId: string, id: string): Promise<void>;

  getOnCallOverride(schoolId: string, id: string): Promise<any | null>;
  listOnCallOverride(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOnCallOverride(schoolId: string, data: any): Promise<any>;
  updateOnCallOverride(schoolId: string, id: string, data: any): Promise<any>;
  deleteOnCallOverride(schoolId: string, id: string): Promise<void>;

  getMaintenanceWindowRecord(schoolId: string, id: string): Promise<any | null>;
  listMaintenanceWindowRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMaintenanceWindowRecord(schoolId: string, data: any): Promise<any>;
  updateMaintenanceWindowRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteMaintenanceWindowRecord(schoolId: string, id: string): Promise<void>;

  getChangeRequest(schoolId: string, id: string): Promise<any | null>;
  listChangeRequest(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createChangeRequest(schoolId: string, data: any): Promise<any>;
  updateChangeRequest(schoolId: string, id: string, data: any): Promise<any>;
  deleteChangeRequest(schoolId: string, id: string): Promise<void>;

  getDeployment(schoolId: string, id: string): Promise<any | null>;
  listDeployment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDeployment(schoolId: string, data: any): Promise<any>;
  updateDeployment(schoolId: string, id: string, data: any): Promise<any>;
  deleteDeployment(schoolId: string, id: string): Promise<void>;

  getFeatureFlagRecord(schoolId: string, id: string): Promise<any | null>;
  listFeatureFlagRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFeatureFlagRecord(schoolId: string, data: any): Promise<any>;
  updateFeatureFlagRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteFeatureFlagRecord(schoolId: string, id: string): Promise<void>;

  getFeatureFlagRule(schoolId: string, id: string): Promise<any | null>;
  listFeatureFlagRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFeatureFlagRule(schoolId: string, data: any): Promise<any>;
  updateFeatureFlagRule(schoolId: string, id: string, data: any): Promise<any>;
  deleteFeatureFlagRule(schoolId: string, id: string): Promise<void>;

  getHealthCheck(schoolId: string, id: string): Promise<any | null>;
  listHealthCheck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createHealthCheck(schoolId: string, data: any): Promise<any>;
  updateHealthCheck(schoolId: string, id: string, data: any): Promise<any>;
  deleteHealthCheck(schoolId: string, id: string): Promise<void>;

  getHealthCheckResult(schoolId: string, id: string): Promise<any | null>;
  listHealthCheckResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createHealthCheckResult(schoolId: string, data: any): Promise<any>;
  updateHealthCheckResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteHealthCheckResult(schoolId: string, id: string): Promise<void>;

  getCapacityMetricRecord(schoolId: string, id: string): Promise<any | null>;
  listCapacityMetricRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityMetricRecord(schoolId: string, data: any): Promise<any>;
  updateCapacityMetricRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityMetricRecord(schoolId: string, id: string): Promise<void>;

  getCapacityForecast(schoolId: string, id: string): Promise<any | null>;
  listCapacityForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityForecast(schoolId: string, data: any): Promise<any>;
  updateCapacityForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityForecast(schoolId: string, id: string): Promise<void>;

  getPerformanceBaseline(schoolId: string, id: string): Promise<any | null>;
  listPerformanceBaseline(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPerformanceBaseline(schoolId: string, data: any): Promise<any>;
  updatePerformanceBaseline(schoolId: string, id: string, data: any): Promise<any>;
  deletePerformanceBaseline(schoolId: string, id: string): Promise<void>;

  getPerformanceBaselineMetric(schoolId: string, id: string): Promise<any | null>;
  listPerformanceBaselineMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPerformanceBaselineMetric(schoolId: string, data: any): Promise<any>;
  updatePerformanceBaselineMetric(schoolId: string, id: string, data: any): Promise<any>;
  deletePerformanceBaselineMetric(schoolId: string, id: string): Promise<void>;

  getPerformanceReport(schoolId: string, id: string): Promise<any | null>;
  listPerformanceReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPerformanceReport(schoolId: string, data: any): Promise<any>;
  updatePerformanceReport(schoolId: string, id: string, data: any): Promise<any>;
  deletePerformanceReport(schoolId: string, id: string): Promise<void>;

  getPerformanceServiceReport(schoolId: string, id: string): Promise<any | null>;
  listPerformanceServiceReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPerformanceServiceReport(schoolId: string, data: any): Promise<any>;
  updatePerformanceServiceReport(schoolId: string, id: string, data: any): Promise<any>;
  deletePerformanceServiceReport(schoolId: string, id: string): Promise<void>;

  getPerformanceLatency(schoolId: string, id: string): Promise<any | null>;
  listPerformanceLatency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPerformanceLatency(schoolId: string, data: any): Promise<any>;
  updatePerformanceLatency(schoolId: string, id: string, data: any): Promise<any>;
  deletePerformanceLatency(schoolId: string, id: string): Promise<void>;

}

class ComplianceModuleRepositoryImpl implements ComplianceModuleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new Error('GlobalCloud entity not found');
  }

  // =============================================================================
  // ENTERPRISE-OBSERVABILITY
  // =============================================================================
  async getDistributedTrace(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('distributed_traces')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDistributedTrace(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('distributed_traces').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDistributedTraceError(error.message);
    return data ?? [];
  }

  async createDistributedTrace(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('distributed_traces')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDistributedTraceError(error.message);
    return result;
  }

  async updateDistributedTrace(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('distributed_traces')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDistributedTraceError(error.message);
    return result;
  }

  async deleteDistributedTrace(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('distributed_traces')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDistributedTraceError(error.message);
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

  async getSpanLog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('span_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSpanLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('span_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSpanLogError(error.message);
    return data ?? [];
  }

  async createSpanLog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('span_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSpanLogError(error.message);
    return result;
  }

  async updateSpanLog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('span_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSpanLogError(error.message);
    return result;
  }

  async deleteSpanLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('span_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSpanLogError(error.message);
  }

  async getMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMetricError(error.message);
    return data ?? [];
  }

  async createMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMetricError(error.message);
    return result;
  }

  async updateMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMetricError(error.message);
    return result;
  }

  async deleteMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMetricError(error.message);
  }

  async getMetricSeries(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('metric_serieses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMetricSeries(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('metric_serieses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMetricSeriesError(error.message);
    return data ?? [];
  }

  async createMetricSeries(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('metric_serieses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMetricSeriesError(error.message);
    return result;
  }

  async updateMetricSeries(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('metric_serieses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMetricSeriesError(error.message);
    return result;
  }

  async deleteMetricSeries(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('metric_serieses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMetricSeriesError(error.message);
  }

  async getMetricDataPoint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('metric_data_points')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMetricDataPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('metric_data_points').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMetricDataPointError(error.message);
    return data ?? [];
  }

  async createMetricDataPoint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('metric_data_points')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMetricDataPointError(error.message);
    return result;
  }

  async updateMetricDataPoint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('metric_data_points')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMetricDataPointError(error.message);
    return result;
  }

  async deleteMetricDataPoint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('metric_data_points')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMetricDataPointError(error.message);
  }

  async getMetricAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('metric_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMetricAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('metric_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMetricAlertError(error.message);
    return data ?? [];
  }

  async createMetricAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('metric_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMetricAlertError(error.message);
    return result;
  }

  async updateMetricAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('metric_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMetricAlertError(error.message);
    return result;
  }

  async deleteMetricAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('metric_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMetricAlertError(error.message);
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

  async getLogAggregationRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('log_aggregatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLogAggregationRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('log_aggregatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLogAggregationError(error.message);
    return data ?? [];
  }

  async createLogAggregationRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('log_aggregatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLogAggregationError(error.message);
    return result;
  }

  async updateLogAggregationRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('log_aggregatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLogAggregationError(error.message);
    return result;
  }

  async deleteLogAggregationRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('log_aggregatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLogAggregationError(error.message);
  }

  async getEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEventError(error.message);
    return data ?? [];
  }

  async createEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEventError(error.message);
    return result;
  }

  async updateEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEventError(error.message);
    return result;
  }

  async deleteEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEventError(error.message);
  }

  async getEventCorrelation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('event_correlatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEventCorrelation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('event_correlatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEventCorrelationError(error.message);
    return data ?? [];
  }

  async createEventCorrelation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('event_correlatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEventCorrelationError(error.message);
    return result;
  }

  async updateEventCorrelation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('event_correlatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEventCorrelationError(error.message);
    return result;
  }

  async deleteEventCorrelation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('event_correlatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEventCorrelationError(error.message);
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

  async getAlertAcknowledgement(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('alert_acknowledgements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAlertAcknowledgement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('alert_acknowledgements').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAlertAcknowledgementError(error.message);
    return data ?? [];
  }

  async createAlertAcknowledgement(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('alert_acknowledgements')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAlertAcknowledgementError(error.message);
    return result;
  }

  async updateAlertAcknowledgement(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('alert_acknowledgements')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAlertAcknowledgementError(error.message);
    return result;
  }

  async deleteAlertAcknowledgement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('alert_acknowledgements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAlertAcknowledgementError(error.message);
  }

  async getAlertEscalationRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('alert_escalatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAlertEscalationRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createAlertEscalationRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('alert_escalatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAlertEscalationError(error.message);
    return result;
  }

  async updateAlertEscalationRecord(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteAlertEscalationRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('alert_escalatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAlertEscalationError(error.message);
  }

  async getSLAMonitor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('slamonitors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSLAMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('slamonitors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSLAMonitorError(error.message);
    return data ?? [];
  }

  async createSLAMonitor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('slamonitors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSLAMonitorError(error.message);
    return result;
  }

  async updateSLAMonitor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('slamonitors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSLAMonitorError(error.message);
    return result;
  }

  async deleteSLAMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('slamonitors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSLAMonitorError(error.message);
  }

  async getSLOTarget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('slotargets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSLOTarget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('slotargets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSLOTargetError(error.message);
    return data ?? [];
  }

  async createSLOTarget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('slotargets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSLOTargetError(error.message);
    return result;
  }

  async updateSLOTarget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('slotargets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSLOTargetError(error.message);
    return result;
  }

  async deleteSLOTarget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('slotargets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSLOTargetError(error.message);
  }

  async getErrorBudgetRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('error_budgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listErrorBudgetRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('error_budgets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudErrorBudgetError(error.message);
    return data ?? [];
  }

  async createErrorBudgetRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('error_budgets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudErrorBudgetError(error.message);
    return result;
  }

  async updateErrorBudgetRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('error_budgets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudErrorBudgetError(error.message);
    return result;
  }

  async deleteErrorBudgetRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('error_budgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudErrorBudgetError(error.message);
  }

  async getCostMonitor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cost_monitors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCostMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cost_monitors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCostMonitorError(error.message);
    return data ?? [];
  }

  async createCostMonitor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cost_monitors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCostMonitorError(error.message);
    return result;
  }

  async updateCostMonitor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cost_monitors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCostMonitorError(error.message);
    return result;
  }

  async deleteCostMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cost_monitors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCostMonitorError(error.message);
  }

  async getCostBreakdown(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cost_breakdowns')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCostBreakdown(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cost_breakdowns').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCostBreakdownError(error.message);
    return data ?? [];
  }

  async createCostBreakdown(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cost_breakdowns')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCostBreakdownError(error.message);
    return result;
  }

  async updateCostBreakdown(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cost_breakdowns')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCostBreakdownError(error.message);
    return result;
  }

  async deleteCostBreakdown(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cost_breakdowns')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCostBreakdownError(error.message);
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

  async getBusinessMonitor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('business_monitors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBusinessMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('business_monitors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBusinessMonitorError(error.message);
    return data ?? [];
  }

  async createBusinessMonitor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('business_monitors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBusinessMonitorError(error.message);
    return result;
  }

  async updateBusinessMonitor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('business_monitors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBusinessMonitorError(error.message);
    return result;
  }

  async deleteBusinessMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('business_monitors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBusinessMonitorError(error.message);
  }

  async getInfrastructureMonitor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('infrastructure_monitors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInfrastructureMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('infrastructure_monitors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInfrastructureMonitorError(error.message);
    return data ?? [];
  }

  async createInfrastructureMonitor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('infrastructure_monitors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureMonitorError(error.message);
    return result;
  }

  async updateInfrastructureMonitor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('infrastructure_monitors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureMonitorError(error.message);
    return result;
  }

  async deleteInfrastructureMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('infrastructure_monitors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInfrastructureMonitorError(error.message);
  }

  async getInfrastructureMetricRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('infrastructure_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInfrastructureMetricRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('infrastructure_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInfrastructureMetricError(error.message);
    return data ?? [];
  }

  async createInfrastructureMetricRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('infrastructure_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureMetricError(error.message);
    return result;
  }

  async updateInfrastructureMetricRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('infrastructure_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureMetricError(error.message);
    return result;
  }

  async deleteInfrastructureMetricRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('infrastructure_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInfrastructureMetricError(error.message);
  }

  async getDigitalTwinMonitor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('digital_twin_monitors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDigitalTwinMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('digital_twin_monitors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDigitalTwinMonitorError(error.message);
    return data ?? [];
  }

  async createDigitalTwinMonitor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('digital_twin_monitors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDigitalTwinMonitorError(error.message);
    return result;
  }

  async updateDigitalTwinMonitor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('digital_twin_monitors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDigitalTwinMonitorError(error.message);
    return result;
  }

  async deleteDigitalTwinMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('digital_twin_monitors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDigitalTwinMonitorError(error.message);
  }

  async getDigitalTwinPrediction(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('digital_twin_predictioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDigitalTwinPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('digital_twin_predictioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDigitalTwinPredictionError(error.message);
    return data ?? [];
  }

  async createDigitalTwinPrediction(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('digital_twin_predictioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDigitalTwinPredictionError(error.message);
    return result;
  }

  async updateDigitalTwinPrediction(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('digital_twin_predictioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDigitalTwinPredictionError(error.message);
    return result;
  }

  async deleteDigitalTwinPrediction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('digital_twin_predictioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDigitalTwinPredictionError(error.message);
  }

  async getPredictiveAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('predictive_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPredictiveAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('predictive_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPredictiveAlertError(error.message);
    return data ?? [];
  }

  async createPredictiveAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('predictive_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPredictiveAlertError(error.message);
    return result;
  }

  async updatePredictiveAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('predictive_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPredictiveAlertError(error.message);
    return result;
  }

  async deletePredictiveAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('predictive_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPredictiveAlertError(error.message);
  }

  async getAnomalyDetector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('anomaly_detectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAnomalyDetector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('anomaly_detectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAnomalyDetectorError(error.message);
    return data ?? [];
  }

  async createAnomalyDetector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('anomaly_detectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAnomalyDetectorError(error.message);
    return result;
  }

  async updateAnomalyDetector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('anomaly_detectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAnomalyDetectorError(error.message);
    return result;
  }

  async deleteAnomalyDetector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('anomaly_detectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAnomalyDetectorError(error.message);
  }

  async getAnomaly(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('anomalys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAnomaly(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('anomalys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAnomalyError(error.message);
    return data ?? [];
  }

  async createAnomaly(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('anomalys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAnomalyError(error.message);
    return result;
  }

  async updateAnomaly(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('anomalys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAnomalyError(error.message);
    return result;
  }

  async deleteAnomaly(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('anomalys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAnomalyError(error.message);
  }

  async getCorrelationEngine(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('correlation_engines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCorrelationEngine(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('correlation_engines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCorrelationEngineError(error.message);
    return data ?? [];
  }

  async createCorrelationEngine(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('correlation_engines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCorrelationEngineError(error.message);
    return result;
  }

  async updateCorrelationEngine(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('correlation_engines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCorrelationEngineError(error.message);
    return result;
  }

  async deleteCorrelationEngine(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('correlation_engines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCorrelationEngineError(error.message);
  }

  async getCorrelation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('correlatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCorrelation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('correlatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCorrelationError(error.message);
    return data ?? [];
  }

  async createCorrelation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('correlatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCorrelationError(error.message);
    return result;
  }

  async updateCorrelation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('correlatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCorrelationError(error.message);
    return result;
  }

  async deleteCorrelation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('correlatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCorrelationError(error.message);
  }

  async getObservabilityDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('observability_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listObservabilityDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('observability_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudObservabilityDashboardError(error.message);
    return data ?? [];
  }

  async createObservabilityDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('observability_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudObservabilityDashboardError(error.message);
    return result;
  }

  async updateObservabilityDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('observability_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudObservabilityDashboardError(error.message);
    return result;
  }

  async deleteObservabilityDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('observability_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudObservabilityDashboardError(error.message);
  }

  async getObservabilityWidget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('observability_widgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listObservabilityWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('observability_widgets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudObservabilityWidgetError(error.message);
    return data ?? [];
  }

  async createObservabilityWidget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('observability_widgets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudObservabilityWidgetError(error.message);
    return result;
  }

  async updateObservabilityWidget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('observability_widgets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudObservabilityWidgetError(error.message);
    return result;
  }

  async deleteObservabilityWidget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('observability_widgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudObservabilityWidgetError(error.message);
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

  async getObservabilityReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('observability_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listObservabilityReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('observability_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudObservabilityReportError(error.message);
    return data ?? [];
  }

  async createObservabilityReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('observability_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudObservabilityReportError(error.message);
    return result;
  }

  async updateObservabilityReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('observability_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudObservabilityReportError(error.message);
    return result;
  }

  async deleteObservabilityReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('observability_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudObservabilityReportError(error.message);
  }

  async getReportMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('report_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listReportMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('report_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudReportMetricError(error.message);
    return data ?? [];
  }

  async createReportMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('report_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudReportMetricError(error.message);
    return result;
  }

  async updateReportMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('report_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudReportMetricError(error.message);
    return result;
  }

  async deleteReportMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('report_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudReportMetricError(error.message);
  }

  async getRunbook(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('runbooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRunbook(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('runbooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRunbookError(error.message);
    return data ?? [];
  }

  async createRunbook(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('runbooks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRunbookError(error.message);
    return result;
  }

  async updateRunbook(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('runbooks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRunbookError(error.message);
    return result;
  }

  async deleteRunbook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('runbooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRunbookError(error.message);
  }

  async getRunbookStep(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('runbook_steps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRunbookStep(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('runbook_steps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRunbookStepError(error.message);
    return data ?? [];
  }

  async createRunbookStep(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('runbook_steps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRunbookStepError(error.message);
    return result;
  }

  async updateRunbookStep(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('runbook_steps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRunbookStepError(error.message);
    return result;
  }

  async deleteRunbookStep(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('runbook_steps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRunbookStepError(error.message);
  }

  async getIncident(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('incidents')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listIncident(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('incidents').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudIncidentError(error.message);
    return data ?? [];
  }

  async createIncident(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('incidents')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudIncidentError(error.message);
    return result;
  }

  async updateIncident(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('incidents')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudIncidentError(error.message);
    return result;
  }

  async deleteIncident(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('incidents')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudIncidentError(error.message);
  }

  async getIncidentTimelineEntry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('incident_timelines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listIncidentTimelineEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('incident_timelines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudIncidentTimelineError(error.message);
    return data ?? [];
  }

  async createIncidentTimelineEntry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('incident_timelines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudIncidentTimelineError(error.message);
    return result;
  }

  async updateIncidentTimelineEntry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('incident_timelines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudIncidentTimelineError(error.message);
    return result;
  }

  async deleteIncidentTimelineEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('incident_timelines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudIncidentTimelineError(error.message);
  }

  async getPostMortem(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('post_mortems')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPostMortem(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('post_mortems').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPostMortemError(error.message);
    return data ?? [];
  }

  async createPostMortem(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('post_mortems')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPostMortemError(error.message);
    return result;
  }

  async updatePostMortem(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('post_mortems')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPostMortemError(error.message);
    return result;
  }

  async deletePostMortem(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('post_mortems')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPostMortemError(error.message);
  }

  async getPostMortemTimelineEntry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('post_mortem_timelines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPostMortemTimelineEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('post_mortem_timelines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPostMortemTimelineError(error.message);
    return data ?? [];
  }

  async createPostMortemTimelineEntry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('post_mortem_timelines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPostMortemTimelineError(error.message);
    return result;
  }

  async updatePostMortemTimelineEntry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('post_mortem_timelines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPostMortemTimelineError(error.message);
    return result;
  }

  async deletePostMortemTimelineEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('post_mortem_timelines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPostMortemTimelineError(error.message);
  }

  async getPostMortemImpact(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('post_mortem_impacts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPostMortemImpact(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('post_mortem_impacts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPostMortemImpactError(error.message);
    return data ?? [];
  }

  async createPostMortemImpact(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('post_mortem_impacts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPostMortemImpactError(error.message);
    return result;
  }

  async updatePostMortemImpact(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('post_mortem_impacts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPostMortemImpactError(error.message);
    return result;
  }

  async deletePostMortemImpact(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('post_mortem_impacts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPostMortemImpactError(error.message);
  }

  async getPostMortemActionItem(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('post_mortem_action_items')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPostMortemActionItem(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('post_mortem_action_items').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPostMortemActionItemError(error.message);
    return data ?? [];
  }

  async createPostMortemActionItem(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('post_mortem_action_items')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPostMortemActionItemError(error.message);
    return result;
  }

  async updatePostMortemActionItem(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('post_mortem_action_items')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPostMortemActionItemError(error.message);
    return result;
  }

  async deletePostMortemActionItem(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('post_mortem_action_items')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPostMortemActionItemError(error.message);
  }

  async getOnCallSchedule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('on_call_schedules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOnCallSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('on_call_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOnCallScheduleError(error.message);
    return data ?? [];
  }

  async createOnCallSchedule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('on_call_schedules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOnCallScheduleError(error.message);
    return result;
  }

  async updateOnCallSchedule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('on_call_schedules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOnCallScheduleError(error.message);
    return result;
  }

  async deleteOnCallSchedule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('on_call_schedules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOnCallScheduleError(error.message);
  }

  async getOnCallRotationEntry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('on_call_rotatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOnCallRotationEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('on_call_rotatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOnCallRotationError(error.message);
    return data ?? [];
  }

  async createOnCallRotationEntry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('on_call_rotatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOnCallRotationError(error.message);
    return result;
  }

  async updateOnCallRotationEntry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('on_call_rotatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOnCallRotationError(error.message);
    return result;
  }

  async deleteOnCallRotationEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('on_call_rotatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOnCallRotationError(error.message);
  }

  async getOnCallOverride(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('on_call_overrides')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOnCallOverride(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('on_call_overrides').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOnCallOverrideError(error.message);
    return data ?? [];
  }

  async createOnCallOverride(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('on_call_overrides')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOnCallOverrideError(error.message);
    return result;
  }

  async updateOnCallOverride(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('on_call_overrides')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOnCallOverrideError(error.message);
    return result;
  }

  async deleteOnCallOverride(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('on_call_overrides')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOnCallOverrideError(error.message);
  }

  async getMaintenanceWindowRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('maintenance_windows')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMaintenanceWindowRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('maintenance_windows').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMaintenanceWindowError(error.message);
    return data ?? [];
  }

  async createMaintenanceWindowRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('maintenance_windows')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceWindowError(error.message);
    return result;
  }

  async updateMaintenanceWindowRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('maintenance_windows')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceWindowError(error.message);
    return result;
  }

  async deleteMaintenanceWindowRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('maintenance_windows')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMaintenanceWindowError(error.message);
  }

  async getChangeRequest(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('change_requests')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listChangeRequest(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('change_requests').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudChangeRequestError(error.message);
    return data ?? [];
  }

  async createChangeRequest(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('change_requests')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudChangeRequestError(error.message);
    return result;
  }

  async updateChangeRequest(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('change_requests')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudChangeRequestError(error.message);
    return result;
  }

  async deleteChangeRequest(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('change_requests')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudChangeRequestError(error.message);
  }

  async getDeployment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('deployments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDeployment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('deployments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDeploymentError(error.message);
    return data ?? [];
  }

  async createDeployment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('deployments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDeploymentError(error.message);
    return result;
  }

  async updateDeployment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('deployments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDeploymentError(error.message);
    return result;
  }

  async deleteDeployment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('deployments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDeploymentError(error.message);
  }

  async getFeatureFlagRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('feature_flags')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFeatureFlagRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createFeatureFlagRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('feature_flags')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFeatureFlagError(error.message);
    return result;
  }

  async updateFeatureFlagRecord(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteFeatureFlagRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('feature_flags')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFeatureFlagError(error.message);
  }

  async getFeatureFlagRule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('feature_flag_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFeatureFlagRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('feature_flag_rules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFeatureFlagRuleError(error.message);
    return data ?? [];
  }

  async createFeatureFlagRule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('feature_flag_rules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFeatureFlagRuleError(error.message);
    return result;
  }

  async updateFeatureFlagRule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('feature_flag_rules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFeatureFlagRuleError(error.message);
    return result;
  }

  async deleteFeatureFlagRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('feature_flag_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFeatureFlagRuleError(error.message);
  }

  async getHealthCheck(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('health_checks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listHealthCheck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudHealthCheckError(error.message);
    return data ?? [];
  }

  async createHealthCheck(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('health_checks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudHealthCheckError(error.message);
    return result;
  }

  async updateHealthCheck(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('health_checks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudHealthCheckError(error.message);
    return result;
  }

  async deleteHealthCheck(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('health_checks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudHealthCheckError(error.message);
  }

  async getHealthCheckResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('health_check_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listHealthCheckResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('health_check_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudHealthCheckResultError(error.message);
    return data ?? [];
  }

  async createHealthCheckResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('health_check_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudHealthCheckResultError(error.message);
    return result;
  }

  async updateHealthCheckResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('health_check_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudHealthCheckResultError(error.message);
    return result;
  }

  async deleteHealthCheckResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('health_check_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudHealthCheckResultError(error.message);
  }

  async getCapacityMetricRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('capacity_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCapacityMetricRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('capacity_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCapacityMetricError(error.message);
    return data ?? [];
  }

  async createCapacityMetricRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('capacity_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCapacityMetricError(error.message);
    return result;
  }

  async updateCapacityMetricRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('capacity_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCapacityMetricError(error.message);
    return result;
  }

  async deleteCapacityMetricRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('capacity_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCapacityMetricError(error.message);
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

  async getPerformanceBaseline(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('performance_baselines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPerformanceBaseline(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('performance_baselines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPerformanceBaselineError(error.message);
    return data ?? [];
  }

  async createPerformanceBaseline(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('performance_baselines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPerformanceBaselineError(error.message);
    return result;
  }

  async updatePerformanceBaseline(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('performance_baselines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPerformanceBaselineError(error.message);
    return result;
  }

  async deletePerformanceBaseline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('performance_baselines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPerformanceBaselineError(error.message);
  }

  async getPerformanceBaselineMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('performance_baseline_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPerformanceBaselineMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('performance_baseline_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPerformanceBaselineMetricError(error.message);
    return data ?? [];
  }

  async createPerformanceBaselineMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('performance_baseline_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPerformanceBaselineMetricError(error.message);
    return result;
  }

  async updatePerformanceBaselineMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('performance_baseline_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPerformanceBaselineMetricError(error.message);
    return result;
  }

  async deletePerformanceBaselineMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('performance_baseline_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPerformanceBaselineMetricError(error.message);
  }

  async getPerformanceReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('performance_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPerformanceReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('performance_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPerformanceReportError(error.message);
    return data ?? [];
  }

  async createPerformanceReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('performance_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPerformanceReportError(error.message);
    return result;
  }

  async updatePerformanceReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('performance_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPerformanceReportError(error.message);
    return result;
  }

  async deletePerformanceReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('performance_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPerformanceReportError(error.message);
  }

  async getPerformanceServiceReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('performance_service_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPerformanceServiceReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('performance_service_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPerformanceServiceReportError(error.message);
    return data ?? [];
  }

  async createPerformanceServiceReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('performance_service_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPerformanceServiceReportError(error.message);
    return result;
  }

  async updatePerformanceServiceReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('performance_service_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPerformanceServiceReportError(error.message);
    return result;
  }

  async deletePerformanceServiceReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('performance_service_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPerformanceServiceReportError(error.message);
  }

  async getPerformanceLatency(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('performance_latencys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPerformanceLatency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('performance_latencys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPerformanceLatencyError(error.message);
    return data ?? [];
  }

  async createPerformanceLatency(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('performance_latencys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPerformanceLatencyError(error.message);
    return result;
  }

  async updatePerformanceLatency(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('performance_latencys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPerformanceLatencyError(error.message);
    return result;
  }

  async deletePerformanceLatency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('performance_latencys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPerformanceLatencyError(error.message);
  }

}

export function createComplianceModuleRepository(supabase: SupabaseClient): ComplianceModuleRepository {
  return new ComplianceModuleRepositoryImpl(supabase);
}


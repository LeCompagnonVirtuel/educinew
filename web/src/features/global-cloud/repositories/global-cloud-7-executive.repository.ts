import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudGraphActivityLogError, EduCloudGraphAnalyticsDashboardError, EduCloudGraphAnnotationError, EduCloudGraphAnomalyDetectionError, EduCloudGraphAnomalyError, EduCloudGraphApiEndpointError, EduCloudGraphBackupError, EduCloudGraphBenchmarkError, EduCloudGraphBookmarkError, EduCloudGraphCacheError, EduCloudGraphCatalogError, EduCloudGraphCentralityError, EduCloudGraphChartError, EduCloudGraphCircularDependencyError, EduCloudGraphClusterError, EduCloudGraphClusteringError, EduCloudGraphCommunityError, EduCloudGraphComparisonError, EduCloudGraphComplianceError, EduCloudGraphConsolidationError, EduCloudGraphCorrelationError, EduCloudGraphCostAnalysisError, EduCloudGraphDataLineageError, EduCloudGraphDataQualityIssueError, EduCloudGraphDataQualityReportError, EduCloudGraphDeduplicationError, EduCloudGraphDependencyError, EduCloudGraphDiffError, EduCloudGraphDocumentationError, EduCloudGraphEmbeddingError, EduCloudGraphEmbeddingModelError, EduCloudGraphEnrichmentError, EduCloudGraphEvolutionError, EduCloudGraphExportError, EduCloudGraphFeedbackError, EduCloudGraphGlossaryError, EduCloudGraphGovernanceError, EduCloudGraphHealthCheckError, EduCloudGraphImpactAnalysisError, EduCloudGraphImpactScoreError, EduCloudGraphImportError, EduCloudGraphIntegrationError, EduCloudGraphLineageError, EduCloudGraphLineageNodeError, EduCloudGraphLinkPredictionError, EduCloudGraphMigrationError, EduCloudGraphMilestoneError, EduCloudGraphNodeClassificationError, EduCloudGraphNotificationError, EduCloudGraphOptimizationError, EduCloudGraphPartitionError, EduCloudGraphPerformanceMetricsError, EduCloudGraphPermissionError, EduCloudGraphPredictionError, EduCloudGraphQueryError, EduCloudGraphRateLimitError, EduCloudGraphRecommendationError, EduCloudGraphRecoveryError, EduCloudGraphReplicaError, EduCloudGraphReportSectionError, EduCloudGraphReportTemplateError, EduCloudGraphRiskAssessmentError, EduCloudGraphROIError, EduCloudGraphScenarioError, EduCloudGraphSchemaErrorError, EduCloudGraphSchemaValidationError, EduCloudGraphSchemaWarningError, EduCloudGraphSearchError, EduCloudGraphShardError, EduCloudGraphShareError, EduCloudGraphSimilarityResultError, EduCloudGraphSimilaritySearchError, EduCloudGraphSimulationError, EduCloudGraphStewardshipError, EduCloudGraphSubscriptionError, EduCloudGraphTagError, EduCloudGraphTemporalIndexError, EduCloudGraphTimeSeriesError, EduCloudGraphTimeSeriesPointError, EduCloudGraphTransformError, EduCloudGraphTraversalOptionsError, EduCloudGraphUsageStatisticsError, EduCloudGraphValidationError, EduCloudGraphVersionError, EduCloudGraphVisualization3DError, EduCloudGraphWebhookError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface ExecutiveModuleRepository {

  // =============================================================================
  // KNOWLEDGE-GRAPH-EDUCATION
  // =============================================================================
  getGraphTraversalOptions(schoolId: string, id: string): Promise<any | null>;
  listGraphTraversalOptions(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphTraversalOptions(schoolId: string, data: any): Promise<any>;
  updateGraphTraversalOptions(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphTraversalOptions(schoolId: string, id: string): Promise<void>;

  getGraphCommunityConfig(schoolId: string, id: string): Promise<any | null>;
  listGraphCommunityConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCommunityConfig(schoolId: string, data: any): Promise<any>;
  updateGraphCommunityConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCommunityConfig(schoolId: string, id: string): Promise<void>;

  getGraphCentralityConfig(schoolId: string, id: string): Promise<any | null>;
  listGraphCentralityConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCentralityConfig(schoolId: string, data: any): Promise<any>;
  updateGraphCentralityConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCentralityConfig(schoolId: string, id: string): Promise<void>;

  getGraphSearchConfig(schoolId: string, id: string): Promise<any | null>;
  listGraphSearchConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSearchConfig(schoolId: string, data: any): Promise<any>;
  updateGraphSearchConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSearchConfig(schoolId: string, id: string): Promise<void>;

  getGraphQueryConfig(schoolId: string, id: string): Promise<any | null>;
  listGraphQueryConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphQueryConfig(schoolId: string, data: any): Promise<any>;
  updateGraphQueryConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphQueryConfig(schoolId: string, id: string): Promise<void>;

  getGraphRecommendationConfig(schoolId: string, id: string): Promise<any | null>;
  listGraphRecommendationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphRecommendationConfig(schoolId: string, data: any): Promise<any>;
  updateGraphRecommendationConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphRecommendationConfig(schoolId: string, id: string): Promise<void>;

  getGraphVisualization3D(schoolId: string, id: string): Promise<any | null>;
  listGraphVisualization3D(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphVisualization3D(schoolId: string, data: any): Promise<any>;
  updateGraphVisualization3D(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphVisualization3D(schoolId: string, id: string): Promise<void>;

  getGraphExportConfig(schoolId: string, id: string): Promise<any | null>;
  listGraphExportConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphExportConfig(schoolId: string, data: any): Promise<any>;
  updateGraphExportConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphExportConfig(schoolId: string, id: string): Promise<void>;

  getGraphImportConfig(schoolId: string, id: string): Promise<any | null>;
  listGraphImportConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphImportConfig(schoolId: string, data: any): Promise<any>;
  updateGraphImportConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphImportConfig(schoolId: string, id: string): Promise<void>;

  getGraphSchemaValidation(schoolId: string, id: string): Promise<any | null>;
  listGraphSchemaValidation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSchemaValidation(schoolId: string, data: any): Promise<any>;
  updateGraphSchemaValidation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSchemaValidation(schoolId: string, id: string): Promise<void>;

  getGraphSchemaError(schoolId: string, id: string): Promise<any | null>;
  listGraphSchemaError(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSchemaError(schoolId: string, data: any): Promise<any>;
  updateGraphSchemaError(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSchemaError(schoolId: string, id: string): Promise<void>;

  getGraphSchemaWarning(schoolId: string, id: string): Promise<any | null>;
  listGraphSchemaWarning(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSchemaWarning(schoolId: string, data: any): Promise<any>;
  updateGraphSchemaWarning(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSchemaWarning(schoolId: string, id: string): Promise<void>;

  getGraphTemporalIndex(schoolId: string, id: string): Promise<any | null>;
  listGraphTemporalIndex(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphTemporalIndex(schoolId: string, data: any): Promise<any>;
  updateGraphTemporalIndex(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphTemporalIndex(schoolId: string, id: string): Promise<void>;

  getGraphTimeSeries(schoolId: string, id: string): Promise<any | null>;
  listGraphTimeSeries(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphTimeSeries(schoolId: string, data: any): Promise<any>;
  updateGraphTimeSeries(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphTimeSeries(schoolId: string, id: string): Promise<void>;

  getGraphTimeSeriesPoint(schoolId: string, id: string): Promise<any | null>;
  listGraphTimeSeriesPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphTimeSeriesPoint(schoolId: string, data: any): Promise<any>;
  updateGraphTimeSeriesPoint(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphTimeSeriesPoint(schoolId: string, id: string): Promise<void>;

  getGraphComparison(schoolId: string, id: string): Promise<any | null>;
  listGraphComparison(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphComparison(schoolId: string, data: any): Promise<any>;
  updateGraphComparison(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphComparison(schoolId: string, id: string): Promise<void>;

  getGraphDiff(schoolId: string, id: string): Promise<any | null>;
  listGraphDiff(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphDiff(schoolId: string, data: any): Promise<any>;
  updateGraphDiff(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphDiff(schoolId: string, id: string): Promise<void>;

  getGraphAnomaly(schoolId: string, id: string): Promise<any | null>;
  listGraphAnomaly(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphAnomaly(schoolId: string, data: any): Promise<any>;
  updateGraphAnomaly(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphAnomaly(schoolId: string, id: string): Promise<void>;

  getGraphCorrelation(schoolId: string, id: string): Promise<any | null>;
  listGraphCorrelation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCorrelation(schoolId: string, data: any): Promise<any>;
  updateGraphCorrelation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCorrelation(schoolId: string, id: string): Promise<void>;

  getGraphPrediction(schoolId: string, id: string): Promise<any | null>;
  listGraphPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphPrediction(schoolId: string, data: any): Promise<any>;
  updateGraphPrediction(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphPrediction(schoolId: string, id: string): Promise<void>;

  getGraphSimulation(schoolId: string, id: string): Promise<any | null>;
  listGraphSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSimulation(schoolId: string, data: any): Promise<any>;
  updateGraphSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSimulation(schoolId: string, id: string): Promise<void>;

  getGraphScenario(schoolId: string, id: string): Promise<any | null>;
  listGraphScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphScenario(schoolId: string, data: any): Promise<any>;
  updateGraphScenario(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphScenario(schoolId: string, id: string): Promise<void>;

  getGraphVersion(schoolId: string, id: string): Promise<any | null>;
  listGraphVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphVersion(schoolId: string, data: any): Promise<any>;
  updateGraphVersion(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphVersion(schoolId: string, id: string): Promise<void>;

  getGraphBackup(schoolId: string, id: string): Promise<any | null>;
  listGraphBackup(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphBackup(schoolId: string, data: any): Promise<any>;
  updateGraphBackup(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphBackup(schoolId: string, id: string): Promise<void>;

  getGraphPermission(schoolId: string, id: string): Promise<any | null>;
  listGraphPermission(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphPermission(schoolId: string, data: any): Promise<any>;
  updateGraphPermission(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphPermission(schoolId: string, id: string): Promise<void>;

  getGraphShare(schoolId: string, id: string): Promise<any | null>;
  listGraphShare(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphShare(schoolId: string, data: any): Promise<any>;
  updateGraphShare(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphShare(schoolId: string, id: string): Promise<void>;

  getGraphNotification(schoolId: string, id: string): Promise<any | null>;
  listGraphNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphNotification(schoolId: string, data: any): Promise<any>;
  updateGraphNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphNotification(schoolId: string, id: string): Promise<void>;

  getGraphSubscription(schoolId: string, id: string): Promise<any | null>;
  listGraphSubscription(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSubscription(schoolId: string, data: any): Promise<any>;
  updateGraphSubscription(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSubscription(schoolId: string, id: string): Promise<void>;

  getGraphAnalyticsDashboard(schoolId: string, id: string): Promise<any | null>;
  listGraphAnalyticsDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphAnalyticsDashboard(schoolId: string, data: any): Promise<any>;
  updateGraphAnalyticsDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphAnalyticsDashboard(schoolId: string, id: string): Promise<void>;

  getGraphChart(schoolId: string, id: string): Promise<any | null>;
  listGraphChart(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphChart(schoolId: string, data: any): Promise<any>;
  updateGraphChart(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphChart(schoolId: string, id: string): Promise<void>;

  getGraphReportTemplate(schoolId: string, id: string): Promise<any | null>;
  listGraphReportTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphReportTemplate(schoolId: string, data: any): Promise<any>;
  updateGraphReportTemplate(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphReportTemplate(schoolId: string, id: string): Promise<void>;

  getGraphReportSection(schoolId: string, id: string): Promise<any | null>;
  listGraphReportSection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphReportSection(schoolId: string, data: any): Promise<any>;
  updateGraphReportSection(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphReportSection(schoolId: string, id: string): Promise<void>;

  getGraphDataQualityReport(schoolId: string, id: string): Promise<any | null>;
  listGraphDataQualityReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphDataQualityReport(schoolId: string, data: any): Promise<any>;
  updateGraphDataQualityReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphDataQualityReport(schoolId: string, id: string): Promise<void>;

  getGraphDataQualityIssue(schoolId: string, id: string): Promise<any | null>;
  listGraphDataQualityIssue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphDataQualityIssue(schoolId: string, data: any): Promise<any>;
  updateGraphDataQualityIssue(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphDataQualityIssue(schoolId: string, id: string): Promise<void>;

  getGraphPerformanceMetrics(schoolId: string, id: string): Promise<any | null>;
  listGraphPerformanceMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphPerformanceMetrics(schoolId: string, data: any): Promise<any>;
  updateGraphPerformanceMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphPerformanceMetrics(schoolId: string, id: string): Promise<void>;

  getGraphOptimization(schoolId: string, id: string): Promise<any | null>;
  listGraphOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphOptimization(schoolId: string, data: any): Promise<any>;
  updateGraphOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphOptimization(schoolId: string, id: string): Promise<void>;

  getGraphMigration(schoolId: string, id: string): Promise<any | null>;
  listGraphMigration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphMigration(schoolId: string, data: any): Promise<any>;
  updateGraphMigration(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphMigration(schoolId: string, id: string): Promise<void>;

  getGraphConsolidation(schoolId: string, id: string): Promise<any | null>;
  listGraphConsolidation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphConsolidation(schoolId: string, data: any): Promise<any>;
  updateGraphConsolidation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphConsolidation(schoolId: string, id: string): Promise<void>;

  getGraphDeduplication(schoolId: string, id: string): Promise<any | null>;
  listGraphDeduplication(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphDeduplication(schoolId: string, data: any): Promise<any>;
  updateGraphDeduplication(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphDeduplication(schoolId: string, id: string): Promise<void>;

  getGraphEnrichment(schoolId: string, id: string): Promise<any | null>;
  listGraphEnrichment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphEnrichment(schoolId: string, data: any): Promise<any>;
  updateGraphEnrichment(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphEnrichment(schoolId: string, id: string): Promise<void>;

  getGraphAnnotation(schoolId: string, id: string): Promise<any | null>;
  listGraphAnnotation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphAnnotation(schoolId: string, data: any): Promise<any>;
  updateGraphAnnotation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphAnnotation(schoolId: string, id: string): Promise<void>;

  getGraphTag(schoolId: string, id: string): Promise<any | null>;
  listGraphTag(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphTag(schoolId: string, data: any): Promise<any>;
  updateGraphTag(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphTag(schoolId: string, id: string): Promise<void>;

  getGraphBookmark(schoolId: string, id: string): Promise<any | null>;
  listGraphBookmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphBookmark(schoolId: string, data: any): Promise<any>;
  updateGraphBookmark(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphBookmark(schoolId: string, id: string): Promise<void>;

  getGraphActivityLog(schoolId: string, id: string): Promise<any | null>;
  listGraphActivityLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphActivityLog(schoolId: string, data: any): Promise<any>;
  updateGraphActivityLog(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphActivityLog(schoolId: string, id: string): Promise<void>;

  getGraphUsageStatistics(schoolId: string, id: string): Promise<any | null>;
  listGraphUsageStatistics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphUsageStatistics(schoolId: string, data: any): Promise<any>;
  updateGraphUsageStatistics(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphUsageStatistics(schoolId: string, id: string): Promise<void>;

  getGraphFeedback(schoolId: string, id: string): Promise<any | null>;
  listGraphFeedback(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphFeedback(schoolId: string, data: any): Promise<any>;
  updateGraphFeedback(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphFeedback(schoolId: string, id: string): Promise<void>;

  getGraphDocumentation(schoolId: string, id: string): Promise<any | null>;
  listGraphDocumentation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphDocumentation(schoolId: string, data: any): Promise<any>;
  updateGraphDocumentation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphDocumentation(schoolId: string, id: string): Promise<void>;

  getGraphGlossary(schoolId: string, id: string): Promise<any | null>;
  listGraphGlossary(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphGlossary(schoolId: string, data: any): Promise<any>;
  updateGraphGlossary(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphGlossary(schoolId: string, id: string): Promise<void>;

  getGraphLineage(schoolId: string, id: string): Promise<any | null>;
  listGraphLineage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphLineage(schoolId: string, data: any): Promise<any>;
  updateGraphLineage(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphLineage(schoolId: string, id: string): Promise<void>;

  getGraphImpactAnalysis(schoolId: string, id: string): Promise<any | null>;
  listGraphImpactAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphImpactAnalysis(schoolId: string, data: any): Promise<any>;
  updateGraphImpactAnalysis(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphImpactAnalysis(schoolId: string, id: string): Promise<void>;

  getGraphDependency(schoolId: string, id: string): Promise<any | null>;
  listGraphDependency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphDependency(schoolId: string, data: any): Promise<any>;
  updateGraphDependency(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphDependency(schoolId: string, id: string): Promise<void>;

  getGraphCircularDependency(schoolId: string, id: string): Promise<any | null>;
  listGraphCircularDependency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCircularDependency(schoolId: string, data: any): Promise<any>;
  updateGraphCircularDependency(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCircularDependency(schoolId: string, id: string): Promise<void>;

  getGraphClustering(schoolId: string, id: string): Promise<any | null>;
  listGraphClustering(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphClustering(schoolId: string, data: any): Promise<any>;
  updateGraphClustering(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphClustering(schoolId: string, id: string): Promise<void>;

  getGraphCluster(schoolId: string, id: string): Promise<any | null>;
  listGraphCluster(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCluster(schoolId: string, data: any): Promise<any>;
  updateGraphCluster(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCluster(schoolId: string, id: string): Promise<void>;

  getGraphEmbeddingModel(schoolId: string, id: string): Promise<any | null>;
  listGraphEmbeddingModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphEmbeddingModel(schoolId: string, data: any): Promise<any>;
  updateGraphEmbeddingModel(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphEmbeddingModel(schoolId: string, id: string): Promise<void>;

  getGraphEmbeddingConfig(schoolId: string, id: string): Promise<any | null>;
  listGraphEmbeddingConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphEmbeddingConfig(schoolId: string, data: any): Promise<any>;
  updateGraphEmbeddingConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphEmbeddingConfig(schoolId: string, id: string): Promise<void>;

  getGraphSimilaritySearch(schoolId: string, id: string): Promise<any | null>;
  listGraphSimilaritySearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSimilaritySearch(schoolId: string, data: any): Promise<any>;
  updateGraphSimilaritySearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSimilaritySearch(schoolId: string, id: string): Promise<void>;

  getGraphSimilarityResult(schoolId: string, id: string): Promise<any | null>;
  listGraphSimilarityResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSimilarityResult(schoolId: string, data: any): Promise<any>;
  updateGraphSimilarityResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSimilarityResult(schoolId: string, id: string): Promise<void>;

  getGraphLinkPrediction(schoolId: string, id: string): Promise<any | null>;
  listGraphLinkPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphLinkPrediction(schoolId: string, data: any): Promise<any>;
  updateGraphLinkPrediction(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphLinkPrediction(schoolId: string, id: string): Promise<void>;

  getGraphNodeClassification(schoolId: string, id: string): Promise<any | null>;
  listGraphNodeClassification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphNodeClassification(schoolId: string, data: any): Promise<any>;
  updateGraphNodeClassification(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphNodeClassification(schoolId: string, id: string): Promise<void>;

  getGraphAnomalyDetection(schoolId: string, id: string): Promise<any | null>;
  listGraphAnomalyDetection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphAnomalyDetection(schoolId: string, data: any): Promise<any>;
  updateGraphAnomalyDetection(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphAnomalyDetection(schoolId: string, id: string): Promise<void>;

  getGraphEvolution(schoolId: string, id: string): Promise<any | null>;
  listGraphEvolution(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphEvolution(schoolId: string, data: any): Promise<any>;
  updateGraphEvolution(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphEvolution(schoolId: string, id: string): Promise<void>;

  getGraphMilestone(schoolId: string, id: string): Promise<any | null>;
  listGraphMilestone(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphMilestone(schoolId: string, data: any): Promise<any>;
  updateGraphMilestone(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphMilestone(schoolId: string, id: string): Promise<void>;

  getGraphBenchmark(schoolId: string, id: string): Promise<any | null>;
  listGraphBenchmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphBenchmark(schoolId: string, data: any): Promise<any>;
  updateGraphBenchmark(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphBenchmark(schoolId: string, id: string): Promise<void>;

  getGraphHealthCheck(schoolId: string, id: string): Promise<any | null>;
  listGraphHealthCheck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphHealthCheck(schoolId: string, data: any): Promise<any>;
  updateGraphHealthCheck(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphHealthCheck(schoolId: string, id: string): Promise<void>;

  getGraphRecovery(schoolId: string, id: string): Promise<any | null>;
  listGraphRecovery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphRecovery(schoolId: string, data: any): Promise<any>;
  updateGraphRecovery(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphRecovery(schoolId: string, id: string): Promise<void>;

  getGraphPartition(schoolId: string, id: string): Promise<any | null>;
  listGraphPartition(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphPartition(schoolId: string, data: any): Promise<any>;
  updateGraphPartition(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphPartition(schoolId: string, id: string): Promise<void>;

  getGraphShard(schoolId: string, id: string): Promise<any | null>;
  listGraphShard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphShard(schoolId: string, data: any): Promise<any>;
  updateGraphShard(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphShard(schoolId: string, id: string): Promise<void>;

  getGraphReplica(schoolId: string, id: string): Promise<any | null>;
  listGraphReplica(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphReplica(schoolId: string, data: any): Promise<any>;
  updateGraphReplica(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphReplica(schoolId: string, id: string): Promise<void>;

  getGraphCacheConfig(schoolId: string, id: string): Promise<any | null>;
  listGraphCacheConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCacheConfig(schoolId: string, data: any): Promise<any>;
  updateGraphCacheConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCacheConfig(schoolId: string, id: string): Promise<void>;

  getGraphRateLimit(schoolId: string, id: string): Promise<any | null>;
  listGraphRateLimit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphRateLimit(schoolId: string, data: any): Promise<any>;
  updateGraphRateLimit(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphRateLimit(schoolId: string, id: string): Promise<void>;

  getGraphApiEndpoint(schoolId: string, id: string): Promise<any | null>;
  listGraphApiEndpoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphApiEndpoint(schoolId: string, data: any): Promise<any>;
  updateGraphApiEndpoint(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphApiEndpoint(schoolId: string, id: string): Promise<void>;

  getGraphWebhook(schoolId: string, id: string): Promise<any | null>;
  listGraphWebhook(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphWebhook(schoolId: string, data: any): Promise<any>;
  updateGraphWebhook(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphWebhook(schoolId: string, id: string): Promise<void>;

  getGraphIntegration(schoolId: string, id: string): Promise<any | null>;
  listGraphIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphIntegration(schoolId: string, data: any): Promise<any>;
  updateGraphIntegration(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphIntegration(schoolId: string, id: string): Promise<void>;

  getGraphTransform(schoolId: string, id: string): Promise<any | null>;
  listGraphTransform(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphTransform(schoolId: string, data: any): Promise<any>;
  updateGraphTransform(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphTransform(schoolId: string, id: string): Promise<void>;

  getGraphValidation(schoolId: string, id: string): Promise<any | null>;
  listGraphValidation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphValidation(schoolId: string, data: any): Promise<any>;
  updateGraphValidation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphValidation(schoolId: string, id: string): Promise<void>;

  getGraphCompliance(schoolId: string, id: string): Promise<any | null>;
  listGraphCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCompliance(schoolId: string, data: any): Promise<any>;
  updateGraphCompliance(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCompliance(schoolId: string, id: string): Promise<void>;

  getGraphGovernance(schoolId: string, id: string): Promise<any | null>;
  listGraphGovernance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphGovernance(schoolId: string, data: any): Promise<any>;
  updateGraphGovernance(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphGovernance(schoolId: string, id: string): Promise<void>;

  getGraphStewardship(schoolId: string, id: string): Promise<any | null>;
  listGraphStewardship(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphStewardship(schoolId: string, data: any): Promise<any>;
  updateGraphStewardship(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphStewardship(schoolId: string, id: string): Promise<void>;

  getGraphCatalog(schoolId: string, id: string): Promise<any | null>;
  listGraphCatalog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCatalog(schoolId: string, data: any): Promise<any>;
  updateGraphCatalog(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCatalog(schoolId: string, id: string): Promise<void>;

  getGraphCatalogEntry(schoolId: string, id: string): Promise<any | null>;
  listGraphCatalogEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCatalogEntry(schoolId: string, data: any): Promise<any>;
  updateGraphCatalogEntry(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCatalogEntry(schoolId: string, id: string): Promise<void>;

  getGraphDataLineage(schoolId: string, id: string): Promise<any | null>;
  listGraphDataLineage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphDataLineage(schoolId: string, data: any): Promise<any>;
  updateGraphDataLineage(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphDataLineage(schoolId: string, id: string): Promise<void>;

  getGraphLineageNode(schoolId: string, id: string): Promise<any | null>;
  listGraphLineageNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphLineageNode(schoolId: string, data: any): Promise<any>;
  updateGraphLineageNode(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphLineageNode(schoolId: string, id: string): Promise<void>;

  getGraphImpactScore(schoolId: string, id: string): Promise<any | null>;
  listGraphImpactScore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphImpactScore(schoolId: string, data: any): Promise<any>;
  updateGraphImpactScore(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphImpactScore(schoolId: string, id: string): Promise<void>;

  getGraphRiskAssessment(schoolId: string, id: string): Promise<any | null>;
  listGraphRiskAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphRiskAssessment(schoolId: string, data: any): Promise<any>;
  updateGraphRiskAssessment(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphRiskAssessment(schoolId: string, id: string): Promise<void>;

  getGraphCostAnalysis(schoolId: string, id: string): Promise<any | null>;
  listGraphCostAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCostAnalysis(schoolId: string, data: any): Promise<any>;
  updateGraphCostAnalysis(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCostAnalysis(schoolId: string, id: string): Promise<void>;

  getGraphROI(schoolId: string, id: string): Promise<any | null>;
  listGraphROI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphROI(schoolId: string, data: any): Promise<any>;
  updateGraphROI(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphROI(schoolId: string, id: string): Promise<void>;

}

class ExecutiveModuleRepositoryImpl implements ExecutiveModuleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new Error('GlobalCloud entity not found');
  }

  // =============================================================================
  // KNOWLEDGE-GRAPH-EDUCATION
  // =============================================================================
  async getGraphTraversalOptions(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_traversal_optionses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphTraversalOptions(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_traversal_optionses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphTraversalOptionsError(error.message);
    return data ?? [];
  }

  async createGraphTraversalOptions(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_traversal_optionses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphTraversalOptionsError(error.message);
    return result;
  }

  async updateGraphTraversalOptions(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_traversal_optionses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphTraversalOptionsError(error.message);
    return result;
  }

  async deleteGraphTraversalOptions(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_traversal_optionses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphTraversalOptionsError(error.message);
  }

  async getGraphCommunityConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_communitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCommunityConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_communitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphCommunityError(error.message);
    return data ?? [];
  }

  async createGraphCommunityConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_communitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphCommunityError(error.message);
    return result;
  }

  async updateGraphCommunityConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_communitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphCommunityError(error.message);
    return result;
  }

  async deleteGraphCommunityConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_communitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphCommunityError(error.message);
  }

  async getGraphCentralityConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_centralitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCentralityConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_centralitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphCentralityError(error.message);
    return data ?? [];
  }

  async createGraphCentralityConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_centralitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphCentralityError(error.message);
    return result;
  }

  async updateGraphCentralityConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_centralitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphCentralityError(error.message);
    return result;
  }

  async deleteGraphCentralityConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_centralitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphCentralityError(error.message);
  }

  async getGraphSearchConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSearchConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphSearchError(error.message);
    return data ?? [];
  }

  async createGraphSearchConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSearchError(error.message);
    return result;
  }

  async updateGraphSearchConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphSearchError(error.message);
    return result;
  }

  async deleteGraphSearchConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSearchError(error.message);
  }

  async getGraphQueryConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_querys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphQueryConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_querys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphQueryError(error.message);
    return data ?? [];
  }

  async createGraphQueryConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_querys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphQueryError(error.message);
    return result;
  }

  async updateGraphQueryConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_querys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphQueryError(error.message);
    return result;
  }

  async deleteGraphQueryConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_querys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphQueryError(error.message);
  }

  async getGraphRecommendationConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_recommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphRecommendationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_recommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphRecommendationError(error.message);
    return data ?? [];
  }

  async createGraphRecommendationConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_recommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphRecommendationError(error.message);
    return result;
  }

  async updateGraphRecommendationConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_recommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphRecommendationError(error.message);
    return result;
  }

  async deleteGraphRecommendationConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_recommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphRecommendationError(error.message);
  }

  async getGraphVisualization3D(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_visualization3_ds')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphVisualization3D(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_visualization3_ds').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphVisualization3DError(error.message);
    return data ?? [];
  }

  async createGraphVisualization3D(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_visualization3_ds')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphVisualization3DError(error.message);
    return result;
  }

  async updateGraphVisualization3D(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_visualization3_ds')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphVisualization3DError(error.message);
    return result;
  }

  async deleteGraphVisualization3D(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_visualization3_ds')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphVisualization3DError(error.message);
  }

  async getGraphExportConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_exports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphExportConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_exports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphExportError(error.message);
    return data ?? [];
  }

  async createGraphExportConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_exports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphExportError(error.message);
    return result;
  }

  async updateGraphExportConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_exports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphExportError(error.message);
    return result;
  }

  async deleteGraphExportConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_exports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphExportError(error.message);
  }

  async getGraphImportConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_imports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphImportConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_imports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphImportError(error.message);
    return data ?? [];
  }

  async createGraphImportConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_imports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphImportError(error.message);
    return result;
  }

  async updateGraphImportConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_imports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphImportError(error.message);
    return result;
  }

  async deleteGraphImportConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_imports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphImportError(error.message);
  }

  async getGraphSchemaValidation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_schema_validatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSchemaValidation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_schema_validatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphSchemaValidationError(error.message);
    return data ?? [];
  }

  async createGraphSchemaValidation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_schema_validatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSchemaValidationError(error.message);
    return result;
  }

  async updateGraphSchemaValidation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_schema_validatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphSchemaValidationError(error.message);
    return result;
  }

  async deleteGraphSchemaValidation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_schema_validatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSchemaValidationError(error.message);
  }

  async getGraphSchemaError(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_schema_errors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSchemaError(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_schema_errors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphSchemaErrorError(error.message);
    return data ?? [];
  }

  async createGraphSchemaError(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_schema_errors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSchemaErrorError(error.message);
    return result;
  }

  async updateGraphSchemaError(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_schema_errors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphSchemaErrorError(error.message);
    return result;
  }

  async deleteGraphSchemaError(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_schema_errors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSchemaErrorError(error.message);
  }

  async getGraphSchemaWarning(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_schema_warnings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSchemaWarning(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_schema_warnings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphSchemaWarningError(error.message);
    return data ?? [];
  }

  async createGraphSchemaWarning(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_schema_warnings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSchemaWarningError(error.message);
    return result;
  }

  async updateGraphSchemaWarning(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_schema_warnings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphSchemaWarningError(error.message);
    return result;
  }

  async deleteGraphSchemaWarning(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_schema_warnings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSchemaWarningError(error.message);
  }

  async getGraphTemporalIndex(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_temporal_indexes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphTemporalIndex(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_temporal_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphTemporalIndexError(error.message);
    return data ?? [];
  }

  async createGraphTemporalIndex(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_temporal_indexes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphTemporalIndexError(error.message);
    return result;
  }

  async updateGraphTemporalIndex(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_temporal_indexes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphTemporalIndexError(error.message);
    return result;
  }

  async deleteGraphTemporalIndex(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_temporal_indexes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphTemporalIndexError(error.message);
  }

  async getGraphTimeSeries(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_time_serieses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphTimeSeries(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_time_serieses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphTimeSeriesError(error.message);
    return data ?? [];
  }

  async createGraphTimeSeries(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_time_serieses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphTimeSeriesError(error.message);
    return result;
  }

  async updateGraphTimeSeries(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_time_serieses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphTimeSeriesError(error.message);
    return result;
  }

  async deleteGraphTimeSeries(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_time_serieses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphTimeSeriesError(error.message);
  }

  async getGraphTimeSeriesPoint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_time_series_points')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphTimeSeriesPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_time_series_points').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphTimeSeriesPointError(error.message);
    return data ?? [];
  }

  async createGraphTimeSeriesPoint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_time_series_points')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphTimeSeriesPointError(error.message);
    return result;
  }

  async updateGraphTimeSeriesPoint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_time_series_points')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphTimeSeriesPointError(error.message);
    return result;
  }

  async deleteGraphTimeSeriesPoint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_time_series_points')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphTimeSeriesPointError(error.message);
  }

  async getGraphComparison(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_comparisoa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphComparison(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_comparisoa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphComparisonError(error.message);
    return data ?? [];
  }

  async createGraphComparison(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_comparisoa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphComparisonError(error.message);
    return result;
  }

  async updateGraphComparison(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_comparisoa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphComparisonError(error.message);
    return result;
  }

  async deleteGraphComparison(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_comparisoa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphComparisonError(error.message);
  }

  async getGraphDiff(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_diffs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphDiff(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_diffs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphDiffError(error.message);
    return data ?? [];
  }

  async createGraphDiff(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_diffs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphDiffError(error.message);
    return result;
  }

  async updateGraphDiff(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_diffs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphDiffError(error.message);
    return result;
  }

  async deleteGraphDiff(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_diffs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphDiffError(error.message);
  }

  async getGraphAnomaly(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_anomalys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphAnomaly(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_anomalys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphAnomalyError(error.message);
    return data ?? [];
  }

  async createGraphAnomaly(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_anomalys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphAnomalyError(error.message);
    return result;
  }

  async updateGraphAnomaly(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_anomalys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphAnomalyError(error.message);
    return result;
  }

  async deleteGraphAnomaly(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_anomalys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphAnomalyError(error.message);
  }

  async getGraphCorrelation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_correlatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCorrelation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_correlatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphCorrelationError(error.message);
    return data ?? [];
  }

  async createGraphCorrelation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_correlatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphCorrelationError(error.message);
    return result;
  }

  async updateGraphCorrelation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_correlatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphCorrelationError(error.message);
    return result;
  }

  async deleteGraphCorrelation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_correlatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphCorrelationError(error.message);
  }

  async getGraphPrediction(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_predictioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_predictioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphPredictionError(error.message);
    return data ?? [];
  }

  async createGraphPrediction(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_predictioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphPredictionError(error.message);
    return result;
  }

  async updateGraphPrediction(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_predictioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphPredictionError(error.message);
    return result;
  }

  async deleteGraphPrediction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_predictioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphPredictionError(error.message);
  }

  async getGraphSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphSimulationError(error.message);
    return data ?? [];
  }

  async createGraphSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSimulationError(error.message);
    return result;
  }

  async updateGraphSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphSimulationError(error.message);
    return result;
  }

  async deleteGraphSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSimulationError(error.message);
  }

  async getGraphScenario(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_scenarios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_scenarios').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphScenarioError(error.message);
    return data ?? [];
  }

  async createGraphScenario(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_scenarios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphScenarioError(error.message);
    return result;
  }

  async updateGraphScenario(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_scenarios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphScenarioError(error.message);
    return result;
  }

  async deleteGraphScenario(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_scenarios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphScenarioError(error.message);
  }

  async getGraphVersion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_versioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_versioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphVersionError(error.message);
    return data ?? [];
  }

  async createGraphVersion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_versioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphVersionError(error.message);
    return result;
  }

  async updateGraphVersion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_versioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphVersionError(error.message);
    return result;
  }

  async deleteGraphVersion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_versioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphVersionError(error.message);
  }

  async getGraphBackup(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_backups')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphBackup(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_backups').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphBackupError(error.message);
    return data ?? [];
  }

  async createGraphBackup(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_backups')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphBackupError(error.message);
    return result;
  }

  async updateGraphBackup(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_backups')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphBackupError(error.message);
    return result;
  }

  async deleteGraphBackup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_backups')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphBackupError(error.message);
  }

  async getGraphPermission(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_permissioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphPermission(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_permissioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphPermissionError(error.message);
    return data ?? [];
  }

  async createGraphPermission(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_permissioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphPermissionError(error.message);
    return result;
  }

  async updateGraphPermission(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_permissioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphPermissionError(error.message);
    return result;
  }

  async deleteGraphPermission(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_permissioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphPermissionError(error.message);
  }

  async getGraphShare(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_shares')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphShare(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_shares').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphShareError(error.message);
    return data ?? [];
  }

  async createGraphShare(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_shares')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphShareError(error.message);
    return result;
  }

  async updateGraphShare(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_shares')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphShareError(error.message);
    return result;
  }

  async deleteGraphShare(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_shares')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphShareError(error.message);
  }

  async getGraphNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphNotificationError(error.message);
    return data ?? [];
  }

  async createGraphNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphNotificationError(error.message);
    return result;
  }

  async updateGraphNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphNotificationError(error.message);
    return result;
  }

  async deleteGraphNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphNotificationError(error.message);
  }

  async getGraphSubscription(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_subscriptioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSubscription(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_subscriptioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphSubscriptionError(error.message);
    return data ?? [];
  }

  async createGraphSubscription(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_subscriptioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSubscriptionError(error.message);
    return result;
  }

  async updateGraphSubscription(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_subscriptioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphSubscriptionError(error.message);
    return result;
  }

  async deleteGraphSubscription(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_subscriptioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSubscriptionError(error.message);
  }

  async getGraphAnalyticsDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_analytics_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphAnalyticsDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_analytics_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphAnalyticsDashboardError(error.message);
    return data ?? [];
  }

  async createGraphAnalyticsDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_analytics_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphAnalyticsDashboardError(error.message);
    return result;
  }

  async updateGraphAnalyticsDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_analytics_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphAnalyticsDashboardError(error.message);
    return result;
  }

  async deleteGraphAnalyticsDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_analytics_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphAnalyticsDashboardError(error.message);
  }

  async getGraphChart(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_charts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphChart(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_charts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphChartError(error.message);
    return data ?? [];
  }

  async createGraphChart(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_charts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphChartError(error.message);
    return result;
  }

  async updateGraphChart(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_charts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphChartError(error.message);
    return result;
  }

  async deleteGraphChart(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_charts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphChartError(error.message);
  }

  async getGraphReportTemplate(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_report_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphReportTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_report_templates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphReportTemplateError(error.message);
    return data ?? [];
  }

  async createGraphReportTemplate(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_report_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphReportTemplateError(error.message);
    return result;
  }

  async updateGraphReportTemplate(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_report_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphReportTemplateError(error.message);
    return result;
  }

  async deleteGraphReportTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_report_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphReportTemplateError(error.message);
  }

  async getGraphReportSection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_report_sectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphReportSection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_report_sectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphReportSectionError(error.message);
    return data ?? [];
  }

  async createGraphReportSection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_report_sectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphReportSectionError(error.message);
    return result;
  }

  async updateGraphReportSection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_report_sectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphReportSectionError(error.message);
    return result;
  }

  async deleteGraphReportSection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_report_sectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphReportSectionError(error.message);
  }

  async getGraphDataQualityReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_data_quality_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphDataQualityReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_data_quality_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphDataQualityReportError(error.message);
    return data ?? [];
  }

  async createGraphDataQualityReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_data_quality_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphDataQualityReportError(error.message);
    return result;
  }

  async updateGraphDataQualityReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_data_quality_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphDataQualityReportError(error.message);
    return result;
  }

  async deleteGraphDataQualityReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_data_quality_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphDataQualityReportError(error.message);
  }

  async getGraphDataQualityIssue(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_data_quality_issues')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphDataQualityIssue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_data_quality_issues').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphDataQualityIssueError(error.message);
    return data ?? [];
  }

  async createGraphDataQualityIssue(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_data_quality_issues')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphDataQualityIssueError(error.message);
    return result;
  }

  async updateGraphDataQualityIssue(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_data_quality_issues')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphDataQualityIssueError(error.message);
    return result;
  }

  async deleteGraphDataQualityIssue(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_data_quality_issues')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphDataQualityIssueError(error.message);
  }

  async getGraphPerformanceMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_performance_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphPerformanceMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_performance_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphPerformanceMetricsError(error.message);
    return data ?? [];
  }

  async createGraphPerformanceMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_performance_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphPerformanceMetricsError(error.message);
    return result;
  }

  async updateGraphPerformanceMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_performance_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphPerformanceMetricsError(error.message);
    return result;
  }

  async deleteGraphPerformanceMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_performance_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphPerformanceMetricsError(error.message);
  }

  async getGraphOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphOptimizationError(error.message);
    return data ?? [];
  }

  async createGraphOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphOptimizationError(error.message);
    return result;
  }

  async updateGraphOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphOptimizationError(error.message);
    return result;
  }

  async deleteGraphOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphOptimizationError(error.message);
  }

  async getGraphMigration(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_migratioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphMigration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_migratioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphMigrationError(error.message);
    return data ?? [];
  }

  async createGraphMigration(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_migratioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphMigrationError(error.message);
    return result;
  }

  async updateGraphMigration(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_migratioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphMigrationError(error.message);
    return result;
  }

  async deleteGraphMigration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_migratioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphMigrationError(error.message);
  }

  async getGraphConsolidation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_consolidatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphConsolidation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_consolidatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphConsolidationError(error.message);
    return data ?? [];
  }

  async createGraphConsolidation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_consolidatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphConsolidationError(error.message);
    return result;
  }

  async updateGraphConsolidation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_consolidatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphConsolidationError(error.message);
    return result;
  }

  async deleteGraphConsolidation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_consolidatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphConsolidationError(error.message);
  }

  async getGraphDeduplication(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_deduplicatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphDeduplication(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_deduplicatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphDeduplicationError(error.message);
    return data ?? [];
  }

  async createGraphDeduplication(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_deduplicatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphDeduplicationError(error.message);
    return result;
  }

  async updateGraphDeduplication(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_deduplicatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphDeduplicationError(error.message);
    return result;
  }

  async deleteGraphDeduplication(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_deduplicatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphDeduplicationError(error.message);
  }

  async getGraphEnrichment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_enrichments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphEnrichment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_enrichments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphEnrichmentError(error.message);
    return data ?? [];
  }

  async createGraphEnrichment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_enrichments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphEnrichmentError(error.message);
    return result;
  }

  async updateGraphEnrichment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_enrichments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphEnrichmentError(error.message);
    return result;
  }

  async deleteGraphEnrichment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_enrichments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphEnrichmentError(error.message);
  }

  async getGraphAnnotation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_annotatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphAnnotation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_annotatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphAnnotationError(error.message);
    return data ?? [];
  }

  async createGraphAnnotation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_annotatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphAnnotationError(error.message);
    return result;
  }

  async updateGraphAnnotation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_annotatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphAnnotationError(error.message);
    return result;
  }

  async deleteGraphAnnotation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_annotatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphAnnotationError(error.message);
  }

  async getGraphTag(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_tags')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphTag(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_tags').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphTagError(error.message);
    return data ?? [];
  }

  async createGraphTag(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_tags')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphTagError(error.message);
    return result;
  }

  async updateGraphTag(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_tags')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphTagError(error.message);
    return result;
  }

  async deleteGraphTag(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_tags')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphTagError(error.message);
  }

  async getGraphBookmark(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_bookmarks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphBookmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_bookmarks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphBookmarkError(error.message);
    return data ?? [];
  }

  async createGraphBookmark(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_bookmarks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphBookmarkError(error.message);
    return result;
  }

  async updateGraphBookmark(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_bookmarks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphBookmarkError(error.message);
    return result;
  }

  async deleteGraphBookmark(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_bookmarks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphBookmarkError(error.message);
  }

  async getGraphActivityLog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_activity_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphActivityLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_activity_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphActivityLogError(error.message);
    return data ?? [];
  }

  async createGraphActivityLog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_activity_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphActivityLogError(error.message);
    return result;
  }

  async updateGraphActivityLog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_activity_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphActivityLogError(error.message);
    return result;
  }

  async deleteGraphActivityLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_activity_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphActivityLogError(error.message);
  }

  async getGraphUsageStatistics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_usage_statisticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphUsageStatistics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_usage_statisticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphUsageStatisticsError(error.message);
    return data ?? [];
  }

  async createGraphUsageStatistics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_usage_statisticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphUsageStatisticsError(error.message);
    return result;
  }

  async updateGraphUsageStatistics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_usage_statisticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphUsageStatisticsError(error.message);
    return result;
  }

  async deleteGraphUsageStatistics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_usage_statisticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphUsageStatisticsError(error.message);
  }

  async getGraphFeedback(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_feedbacks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphFeedback(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_feedbacks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphFeedbackError(error.message);
    return data ?? [];
  }

  async createGraphFeedback(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_feedbacks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphFeedbackError(error.message);
    return result;
  }

  async updateGraphFeedback(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_feedbacks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphFeedbackError(error.message);
    return result;
  }

  async deleteGraphFeedback(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_feedbacks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphFeedbackError(error.message);
  }

  async getGraphDocumentation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_documentatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphDocumentation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_documentatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphDocumentationError(error.message);
    return data ?? [];
  }

  async createGraphDocumentation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_documentatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphDocumentationError(error.message);
    return result;
  }

  async updateGraphDocumentation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_documentatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphDocumentationError(error.message);
    return result;
  }

  async deleteGraphDocumentation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_documentatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphDocumentationError(error.message);
  }

  async getGraphGlossary(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_glossarys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphGlossary(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_glossarys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphGlossaryError(error.message);
    return data ?? [];
  }

  async createGraphGlossary(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_glossarys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphGlossaryError(error.message);
    return result;
  }

  async updateGraphGlossary(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_glossarys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphGlossaryError(error.message);
    return result;
  }

  async deleteGraphGlossary(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_glossarys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphGlossaryError(error.message);
  }

  async getGraphLineage(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_lineages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphLineage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_lineages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphLineageError(error.message);
    return data ?? [];
  }

  async createGraphLineage(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_lineages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphLineageError(error.message);
    return result;
  }

  async updateGraphLineage(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_lineages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphLineageError(error.message);
    return result;
  }

  async deleteGraphLineage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_lineages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphLineageError(error.message);
  }

  async getGraphImpactAnalysis(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_impact_analysises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphImpactAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_impact_analysises').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphImpactAnalysisError(error.message);
    return data ?? [];
  }

  async createGraphImpactAnalysis(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_impact_analysises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphImpactAnalysisError(error.message);
    return result;
  }

  async updateGraphImpactAnalysis(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_impact_analysises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphImpactAnalysisError(error.message);
    return result;
  }

  async deleteGraphImpactAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_impact_analysises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphImpactAnalysisError(error.message);
  }

  async getGraphDependency(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_dependencys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphDependency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_dependencys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphDependencyError(error.message);
    return data ?? [];
  }

  async createGraphDependency(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_dependencys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphDependencyError(error.message);
    return result;
  }

  async updateGraphDependency(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_dependencys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphDependencyError(error.message);
    return result;
  }

  async deleteGraphDependency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_dependencys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphDependencyError(error.message);
  }

  async getGraphCircularDependency(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_circular_dependencys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCircularDependency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_circular_dependencys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphCircularDependencyError(error.message);
    return data ?? [];
  }

  async createGraphCircularDependency(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_circular_dependencys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphCircularDependencyError(error.message);
    return result;
  }

  async updateGraphCircularDependency(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_circular_dependencys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphCircularDependencyError(error.message);
    return result;
  }

  async deleteGraphCircularDependency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_circular_dependencys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphCircularDependencyError(error.message);
  }

  async getGraphClustering(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_clusterings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphClustering(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_clusterings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphClusteringError(error.message);
    return data ?? [];
  }

  async createGraphClustering(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_clusterings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphClusteringError(error.message);
    return result;
  }

  async updateGraphClustering(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_clusterings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphClusteringError(error.message);
    return result;
  }

  async deleteGraphClustering(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_clusterings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphClusteringError(error.message);
  }

  async getGraphCluster(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_clusters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCluster(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphClusterError(error.message);
    return data ?? [];
  }

  async createGraphCluster(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_clusters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphClusterError(error.message);
    return result;
  }

  async updateGraphCluster(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_clusters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphClusterError(error.message);
    return result;
  }

  async deleteGraphCluster(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_clusters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphClusterError(error.message);
  }

  async getGraphEmbeddingModel(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_embedding_models')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphEmbeddingModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_embedding_models').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphEmbeddingModelError(error.message);
    return data ?? [];
  }

  async createGraphEmbeddingModel(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_embedding_models')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphEmbeddingModelError(error.message);
    return result;
  }

  async updateGraphEmbeddingModel(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_embedding_models')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphEmbeddingModelError(error.message);
    return result;
  }

  async deleteGraphEmbeddingModel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_embedding_models')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphEmbeddingModelError(error.message);
  }

  async getGraphEmbeddingConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_embeddings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphEmbeddingConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_embeddings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphEmbeddingError(error.message);
    return data ?? [];
  }

  async createGraphEmbeddingConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_embeddings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphEmbeddingError(error.message);
    return result;
  }

  async updateGraphEmbeddingConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_embeddings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphEmbeddingError(error.message);
    return result;
  }

  async deleteGraphEmbeddingConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_embeddings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphEmbeddingError(error.message);
  }

  async getGraphSimilaritySearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_similarity_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSimilaritySearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_similarity_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphSimilaritySearchError(error.message);
    return data ?? [];
  }

  async createGraphSimilaritySearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_similarity_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSimilaritySearchError(error.message);
    return result;
  }

  async updateGraphSimilaritySearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_similarity_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphSimilaritySearchError(error.message);
    return result;
  }

  async deleteGraphSimilaritySearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_similarity_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSimilaritySearchError(error.message);
  }

  async getGraphSimilarityResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_similarity_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSimilarityResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_similarity_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphSimilarityResultError(error.message);
    return data ?? [];
  }

  async createGraphSimilarityResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_similarity_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSimilarityResultError(error.message);
    return result;
  }

  async updateGraphSimilarityResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_similarity_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphSimilarityResultError(error.message);
    return result;
  }

  async deleteGraphSimilarityResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_similarity_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSimilarityResultError(error.message);
  }

  async getGraphLinkPrediction(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_link_predictioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphLinkPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_link_predictioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphLinkPredictionError(error.message);
    return data ?? [];
  }

  async createGraphLinkPrediction(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_link_predictioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphLinkPredictionError(error.message);
    return result;
  }

  async updateGraphLinkPrediction(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_link_predictioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphLinkPredictionError(error.message);
    return result;
  }

  async deleteGraphLinkPrediction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_link_predictioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphLinkPredictionError(error.message);
  }

  async getGraphNodeClassification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_node_classificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphNodeClassification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_node_classificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphNodeClassificationError(error.message);
    return data ?? [];
  }

  async createGraphNodeClassification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_node_classificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphNodeClassificationError(error.message);
    return result;
  }

  async updateGraphNodeClassification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_node_classificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphNodeClassificationError(error.message);
    return result;
  }

  async deleteGraphNodeClassification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_node_classificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphNodeClassificationError(error.message);
  }

  async getGraphAnomalyDetection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_anomaly_detectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphAnomalyDetection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_anomaly_detectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphAnomalyDetectionError(error.message);
    return data ?? [];
  }

  async createGraphAnomalyDetection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_anomaly_detectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphAnomalyDetectionError(error.message);
    return result;
  }

  async updateGraphAnomalyDetection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_anomaly_detectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphAnomalyDetectionError(error.message);
    return result;
  }

  async deleteGraphAnomalyDetection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_anomaly_detectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphAnomalyDetectionError(error.message);
  }

  async getGraphEvolution(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_evolutioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphEvolution(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_evolutioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphEvolutionError(error.message);
    return data ?? [];
  }

  async createGraphEvolution(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_evolutioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphEvolutionError(error.message);
    return result;
  }

  async updateGraphEvolution(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_evolutioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphEvolutionError(error.message);
    return result;
  }

  async deleteGraphEvolution(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_evolutioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphEvolutionError(error.message);
  }

  async getGraphMilestone(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_milestones')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphMilestone(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_milestones').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphMilestoneError(error.message);
    return data ?? [];
  }

  async createGraphMilestone(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_milestones')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphMilestoneError(error.message);
    return result;
  }

  async updateGraphMilestone(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_milestones')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphMilestoneError(error.message);
    return result;
  }

  async deleteGraphMilestone(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_milestones')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphMilestoneError(error.message);
  }

  async getGraphBenchmark(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_benchmarks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphBenchmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphBenchmarkError(error.message);
    return data ?? [];
  }

  async createGraphBenchmark(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_benchmarks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphBenchmarkError(error.message);
    return result;
  }

  async updateGraphBenchmark(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_benchmarks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphBenchmarkError(error.message);
    return result;
  }

  async deleteGraphBenchmark(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_benchmarks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphBenchmarkError(error.message);
  }

  async getGraphHealthCheck(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_health_checks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphHealthCheck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_health_checks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphHealthCheckError(error.message);
    return data ?? [];
  }

  async createGraphHealthCheck(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_health_checks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphHealthCheckError(error.message);
    return result;
  }

  async updateGraphHealthCheck(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_health_checks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphHealthCheckError(error.message);
    return result;
  }

  async deleteGraphHealthCheck(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_health_checks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphHealthCheckError(error.message);
  }

  async getGraphRecovery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_recoverys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphRecovery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_recoverys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphRecoveryError(error.message);
    return data ?? [];
  }

  async createGraphRecovery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_recoverys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphRecoveryError(error.message);
    return result;
  }

  async updateGraphRecovery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_recoverys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphRecoveryError(error.message);
    return result;
  }

  async deleteGraphRecovery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_recoverys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphRecoveryError(error.message);
  }

  async getGraphPartition(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_partitioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphPartition(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_partitioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphPartitionError(error.message);
    return data ?? [];
  }

  async createGraphPartition(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_partitioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphPartitionError(error.message);
    return result;
  }

  async updateGraphPartition(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_partitioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphPartitionError(error.message);
    return result;
  }

  async deleteGraphPartition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_partitioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphPartitionError(error.message);
  }

  async getGraphShard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_shards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphShard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_shards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphShardError(error.message);
    return data ?? [];
  }

  async createGraphShard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_shards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphShardError(error.message);
    return result;
  }

  async updateGraphShard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_shards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphShardError(error.message);
    return result;
  }

  async deleteGraphShard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_shards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphShardError(error.message);
  }

  async getGraphReplica(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_replicas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphReplica(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_replicas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphReplicaError(error.message);
    return data ?? [];
  }

  async createGraphReplica(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_replicas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphReplicaError(error.message);
    return result;
  }

  async updateGraphReplica(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_replicas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphReplicaError(error.message);
    return result;
  }

  async deleteGraphReplica(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_replicas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphReplicaError(error.message);
  }

  async getGraphCacheConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_caches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCacheConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_caches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphCacheError(error.message);
    return data ?? [];
  }

  async createGraphCacheConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_caches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphCacheError(error.message);
    return result;
  }

  async updateGraphCacheConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_caches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphCacheError(error.message);
    return result;
  }

  async deleteGraphCacheConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_caches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphCacheError(error.message);
  }

  async getGraphRateLimit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_rate_limits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphRateLimit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_rate_limits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphRateLimitError(error.message);
    return data ?? [];
  }

  async createGraphRateLimit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_rate_limits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphRateLimitError(error.message);
    return result;
  }

  async updateGraphRateLimit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_rate_limits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphRateLimitError(error.message);
    return result;
  }

  async deleteGraphRateLimit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_rate_limits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphRateLimitError(error.message);
  }

  async getGraphApiEndpoint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_api_endpoints')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphApiEndpoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_api_endpoints').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphApiEndpointError(error.message);
    return data ?? [];
  }

  async createGraphApiEndpoint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_api_endpoints')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphApiEndpointError(error.message);
    return result;
  }

  async updateGraphApiEndpoint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_api_endpoints')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphApiEndpointError(error.message);
    return result;
  }

  async deleteGraphApiEndpoint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_api_endpoints')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphApiEndpointError(error.message);
  }

  async getGraphWebhook(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_webhooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphWebhook(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_webhooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphWebhookError(error.message);
    return data ?? [];
  }

  async createGraphWebhook(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_webhooks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphWebhookError(error.message);
    return result;
  }

  async updateGraphWebhook(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_webhooks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphWebhookError(error.message);
    return result;
  }

  async deleteGraphWebhook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_webhooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphWebhookError(error.message);
  }

  async getGraphIntegration(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_integratioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphIntegration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_integratioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphIntegrationError(error.message);
    return data ?? [];
  }

  async createGraphIntegration(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_integratioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphIntegrationError(error.message);
    return result;
  }

  async updateGraphIntegration(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_integratioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphIntegrationError(error.message);
    return result;
  }

  async deleteGraphIntegration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_integratioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphIntegrationError(error.message);
  }

  async getGraphTransform(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_transforms')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphTransform(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_transforms').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphTransformError(error.message);
    return data ?? [];
  }

  async createGraphTransform(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_transforms')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphTransformError(error.message);
    return result;
  }

  async updateGraphTransform(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_transforms')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphTransformError(error.message);
    return result;
  }

  async deleteGraphTransform(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_transforms')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphTransformError(error.message);
  }

  async getGraphValidation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_validatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphValidation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_validatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphValidationError(error.message);
    return data ?? [];
  }

  async createGraphValidation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_validatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphValidationError(error.message);
    return result;
  }

  async updateGraphValidation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_validatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphValidationError(error.message);
    return result;
  }

  async deleteGraphValidation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_validatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphValidationError(error.message);
  }

  async getGraphCompliance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_compliances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCompliance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_compliances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphComplianceError(error.message);
    return data ?? [];
  }

  async createGraphCompliance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_compliances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphComplianceError(error.message);
    return result;
  }

  async updateGraphCompliance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_compliances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphComplianceError(error.message);
    return result;
  }

  async deleteGraphCompliance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_compliances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphComplianceError(error.message);
  }

  async getGraphGovernance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_governances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphGovernance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_governances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphGovernanceError(error.message);
    return data ?? [];
  }

  async createGraphGovernance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_governances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphGovernanceError(error.message);
    return result;
  }

  async updateGraphGovernance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_governances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphGovernanceError(error.message);
    return result;
  }

  async deleteGraphGovernance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_governances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphGovernanceError(error.message);
  }

  async getGraphStewardship(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_stewardships')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphStewardship(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_stewardships').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphStewardshipError(error.message);
    return data ?? [];
  }

  async createGraphStewardship(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_stewardships')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphStewardshipError(error.message);
    return result;
  }

  async updateGraphStewardship(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_stewardships')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphStewardshipError(error.message);
    return result;
  }

  async deleteGraphStewardship(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_stewardships')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphStewardshipError(error.message);
  }

  async getGraphCatalog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_catalogs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCatalog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_catalogs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphCatalogError(error.message);
    return data ?? [];
  }

  async createGraphCatalog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_catalogs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphCatalogError(error.message);
    return result;
  }

  async updateGraphCatalog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_catalogs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphCatalogError(error.message);
    return result;
  }

  async deleteGraphCatalog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_catalogs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphCatalogError(error.message);
  }

  async getGraphCatalogEntry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_catalogs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCatalogEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_catalogs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphCatalogError(error.message);
    return data ?? [];
  }

  async createGraphCatalogEntry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_catalogs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphCatalogError(error.message);
    return result;
  }

  async updateGraphCatalogEntry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_catalogs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphCatalogError(error.message);
    return result;
  }

  async deleteGraphCatalogEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_catalogs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphCatalogError(error.message);
  }

  async getGraphDataLineage(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_data_lineages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphDataLineage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_data_lineages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphDataLineageError(error.message);
    return data ?? [];
  }

  async createGraphDataLineage(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_data_lineages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphDataLineageError(error.message);
    return result;
  }

  async updateGraphDataLineage(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_data_lineages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphDataLineageError(error.message);
    return result;
  }

  async deleteGraphDataLineage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_data_lineages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphDataLineageError(error.message);
  }

  async getGraphLineageNode(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_lineage_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphLineageNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_lineage_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphLineageNodeError(error.message);
    return data ?? [];
  }

  async createGraphLineageNode(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_lineage_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphLineageNodeError(error.message);
    return result;
  }

  async updateGraphLineageNode(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_lineage_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphLineageNodeError(error.message);
    return result;
  }

  async deleteGraphLineageNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_lineage_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphLineageNodeError(error.message);
  }

  async getGraphImpactScore(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_impact_scores')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphImpactScore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_impact_scores').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphImpactScoreError(error.message);
    return data ?? [];
  }

  async createGraphImpactScore(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_impact_scores')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphImpactScoreError(error.message);
    return result;
  }

  async updateGraphImpactScore(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_impact_scores')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphImpactScoreError(error.message);
    return result;
  }

  async deleteGraphImpactScore(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_impact_scores')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphImpactScoreError(error.message);
  }

  async getGraphRiskAssessment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_risk_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphRiskAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_risk_assessments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphRiskAssessmentError(error.message);
    return data ?? [];
  }

  async createGraphRiskAssessment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_risk_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphRiskAssessmentError(error.message);
    return result;
  }

  async updateGraphRiskAssessment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_risk_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphRiskAssessmentError(error.message);
    return result;
  }

  async deleteGraphRiskAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_risk_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphRiskAssessmentError(error.message);
  }

  async getGraphCostAnalysis(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_cost_analysises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCostAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_cost_analysises').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphCostAnalysisError(error.message);
    return data ?? [];
  }

  async createGraphCostAnalysis(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_cost_analysises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphCostAnalysisError(error.message);
    return result;
  }

  async updateGraphCostAnalysis(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_cost_analysises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphCostAnalysisError(error.message);
    return result;
  }

  async deleteGraphCostAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_cost_analysises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphCostAnalysisError(error.message);
  }

  async getGraphROI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_rois')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphROI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_rois').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphROIError(error.message);
    return data ?? [];
  }

  async createGraphROI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_rois')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphROIError(error.message);
    return result;
  }

  async updateGraphROI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_rois')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphROIError(error.message);
    return result;
  }

  async deleteGraphROI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_rois')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphROIError(error.message);
  }

}

export function createExecutiveModuleRepository(supabase: SupabaseClient): ExecutiveModuleRepository {
  return new ExecutiveModuleRepositoryImpl(supabase);
}


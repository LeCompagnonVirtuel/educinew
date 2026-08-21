import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudAIGraphError, EduCloudAlumniContributionError, EduCloudAlumniEventError, EduCloudAlumniGraphError, EduCloudAlumniNetworkError, EduCloudCompetencyError, EduCloudCompetencyGraphError, EduCloudCompetencyMapError, EduCloudCompetencyPathError, EduCloudCompetencyProgressError, EduCloudCompetencyStepError, EduCloudConceptGraphError, EduCloudCurriculumGraphError, EduCloudEmploymentGraphError, EduCloudEmploymentMatchError, EduCloudEmploymentPathError, EduCloudEmploymentPositionError, EduCloudEmploymentTrendError, EduCloudGraphAIError, EduCloudGraphAIInsightError, EduCloudGraphAIModelError, EduCloudGraphAIPredictionError, EduCloudGraphAlertError, EduCloudGraphAnalyticsError, EduCloudGraphAuditError, EduCloudGraphCentralityError, EduCloudGraphCommunityError, EduCloudGraphConstraintError, EduCloudGraphDashboardError, EduCloudGraphDashboardWidgetError, EduCloudGraphEdgeError, EduCloudGraphEmbeddingError, EduCloudGraphExportError, EduCloudGraphHealthStatusError, EduCloudGraphHistoryError, EduCloudGraphImportError, EduCloudGraphIndexError, EduCloudGraphInsightError, EduCloudGraphMetricError, EduCloudGraphNodeError, EduCloudGraphPathError, EduCloudGraphPatternError, EduCloudGraphPresetError, EduCloudGraphQueryError, EduCloudGraphRecommendationError, EduCloudGraphReportError, EduCloudGraphSchemaError, EduCloudGraphSearchError, EduCloudGraphSearchResultError, EduCloudGraphSyncError, EduCloudGraphTemplateError, EduCloudGraphTraversalError, EduCloudGraphTraversalResultError, EduCloudGraphUpdateError, EduCloudGraphVectorError, EduCloudGraphVisualizationError, EduCloudKnowledgeClusterError, EduCloudKnowledgeEdgeError, EduCloudKnowledgeNodeError, EduCloudKnowledgePathError, EduCloudLearningGraphError, EduCloudLearningModuleError, EduCloudLearningOutcomeError, EduCloudLearningPathError, EduCloudRecommendationGraphError, EduCloudRecommendationPathError, EduCloudRecommendationScoreError, EduCloudRelationshipDiscoveryError, EduCloudRelationshipPatternError, EduCloudRelationshipStrengthScoreError, EduCloudResearchCollaborationError, EduCloudResearchGraphError, EduCloudResearchImpactError, EduCloudResearchTrendError, EduCloudResourceGraphError, EduCloudSchoolGraphError, EduCloudSemanticQueryError, EduCloudSemanticResultError, EduCloudSemanticSearchError, EduCloudSkillForecastError, EduCloudSkillGapError, EduCloudSkillMatchError, EduCloudSkillsGraphError, EduCloudSkillTrendError, EduCloudStudentGraphError, EduCloudTeacherGraphError, EduCloudTopicGraphError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface GovernmentModuleRepository {

  // =============================================================================
  // KNOWLEDGE-GRAPH-EDUCATION
  // =============================================================================
  getGraphNode(schoolId: string, id: string): Promise<any | null>;
  listGraphNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphNode(schoolId: string, data: any): Promise<any>;
  updateGraphNode(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphNode(schoolId: string, id: string): Promise<void>;

  getGraphEdge(schoolId: string, id: string): Promise<any | null>;
  listGraphEdge(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphEdge(schoolId: string, data: any): Promise<any>;
  updateGraphEdge(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphEdge(schoolId: string, id: string): Promise<void>;

  getGraphPath(schoolId: string, id: string): Promise<any | null>;
  listGraphPath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphPath(schoolId: string, data: any): Promise<any>;
  updateGraphPath(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphPath(schoolId: string, id: string): Promise<void>;

  getGraphCommunity(schoolId: string, id: string): Promise<any | null>;
  listGraphCommunity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCommunity(schoolId: string, data: any): Promise<any>;
  updateGraphCommunity(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCommunity(schoolId: string, id: string): Promise<void>;

  getGraphQuery(schoolId: string, id: string): Promise<any | null>;
  listGraphQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphQuery(schoolId: string, data: any): Promise<any>;
  updateGraphQuery(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphQuery(schoolId: string, id: string): Promise<void>;

  getGraphSearch(schoolId: string, id: string): Promise<any | null>;
  listGraphSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSearch(schoolId: string, data: any): Promise<any>;
  updateGraphSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSearch(schoolId: string, id: string): Promise<void>;

  getGraphSearchResult(schoolId: string, id: string): Promise<any | null>;
  listGraphSearchResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSearchResult(schoolId: string, data: any): Promise<any>;
  updateGraphSearchResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSearchResult(schoolId: string, id: string): Promise<void>;

  getGraphTraversalResult(schoolId: string, id: string): Promise<any | null>;
  listGraphTraversalResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphTraversalResult(schoolId: string, data: any): Promise<any>;
  updateGraphTraversalResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphTraversalResult(schoolId: string, id: string): Promise<void>;

  getGraphAnalytics(schoolId: string, id: string): Promise<any | null>;
  listGraphAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphAnalytics(schoolId: string, data: any): Promise<any>;
  updateGraphAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphAnalytics(schoolId: string, id: string): Promise<void>;

  getGraphCentrality(schoolId: string, id: string): Promise<any | null>;
  listGraphCentrality(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphCentrality(schoolId: string, data: any): Promise<any>;
  updateGraphCentrality(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphCentrality(schoolId: string, id: string): Promise<void>;

  getGraphRecommendation(schoolId: string, id: string): Promise<any | null>;
  listGraphRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphRecommendation(schoolId: string, data: any): Promise<any>;
  updateGraphRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphRecommendation(schoolId: string, id: string): Promise<void>;

  getGraphInsight(schoolId: string, id: string): Promise<any | null>;
  listGraphInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphInsight(schoolId: string, data: any): Promise<any>;
  updateGraphInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphInsight(schoolId: string, id: string): Promise<void>;

  getGraphPattern(schoolId: string, id: string): Promise<any | null>;
  listGraphPattern(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphPattern(schoolId: string, data: any): Promise<any>;
  updateGraphPattern(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphPattern(schoolId: string, id: string): Promise<void>;

  getGraphEmbedding(schoolId: string, id: string): Promise<any | null>;
  listGraphEmbedding(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphEmbedding(schoolId: string, data: any): Promise<any>;
  updateGraphEmbedding(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphEmbedding(schoolId: string, id: string): Promise<void>;

  getGraphVector(schoolId: string, id: string): Promise<any | null>;
  listGraphVector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphVector(schoolId: string, data: any): Promise<any>;
  updateGraphVector(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphVector(schoolId: string, id: string): Promise<void>;

  getGraphIndex(schoolId: string, id: string): Promise<any | null>;
  listGraphIndex(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphIndex(schoolId: string, data: any): Promise<any>;
  updateGraphIndex(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphIndex(schoolId: string, id: string): Promise<void>;

  getGraphSchema(schoolId: string, id: string): Promise<any | null>;
  listGraphSchema(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSchema(schoolId: string, data: any): Promise<any>;
  updateGraphSchema(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSchema(schoolId: string, id: string): Promise<void>;

  getGraphConstraint(schoolId: string, id: string): Promise<any | null>;
  listGraphConstraint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphConstraint(schoolId: string, data: any): Promise<any>;
  updateGraphConstraint(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphConstraint(schoolId: string, id: string): Promise<void>;

  getGraphUpdate(schoolId: string, id: string): Promise<any | null>;
  listGraphUpdate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphUpdate(schoolId: string, data: any): Promise<any>;
  updateGraphUpdate(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphUpdate(schoolId: string, id: string): Promise<void>;

  getGraphSync(schoolId: string, id: string): Promise<any | null>;
  listGraphSync(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphSync(schoolId: string, data: any): Promise<any>;
  updateGraphSync(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphSync(schoolId: string, id: string): Promise<void>;

  getGraphExport(schoolId: string, id: string): Promise<any | null>;
  listGraphExport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphExport(schoolId: string, data: any): Promise<any>;
  updateGraphExport(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphExport(schoolId: string, id: string): Promise<void>;

  getGraphImport(schoolId: string, id: string): Promise<any | null>;
  listGraphImport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphImport(schoolId: string, data: any): Promise<any>;
  updateGraphImport(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphImport(schoolId: string, id: string): Promise<void>;

  getGraphVisualization(schoolId: string, id: string): Promise<any | null>;
  listGraphVisualization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphVisualization(schoolId: string, data: any): Promise<any>;
  updateGraphVisualization(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphVisualization(schoolId: string, id: string): Promise<void>;

  getGraphVisualizationConfig(schoolId: string, id: string): Promise<any | null>;
  listGraphVisualizationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphVisualizationConfig(schoolId: string, data: any): Promise<any>;
  updateGraphVisualizationConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphVisualizationConfig(schoolId: string, id: string): Promise<void>;

  getGraphDashboard(schoolId: string, id: string): Promise<any | null>;
  listGraphDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphDashboard(schoolId: string, data: any): Promise<any>;
  updateGraphDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphDashboard(schoolId: string, id: string): Promise<void>;

  getGraphDashboardWidget(schoolId: string, id: string): Promise<any | null>;
  listGraphDashboardWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphDashboardWidget(schoolId: string, data: any): Promise<any>;
  updateGraphDashboardWidget(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphDashboardWidget(schoolId: string, id: string): Promise<void>;

  getGraphReport(schoolId: string, id: string): Promise<any | null>;
  listGraphReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphReport(schoolId: string, data: any): Promise<any>;
  updateGraphReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphReport(schoolId: string, id: string): Promise<void>;

  getGraphAI(schoolId: string, id: string): Promise<any | null>;
  listGraphAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphAI(schoolId: string, data: any): Promise<any>;
  updateGraphAI(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphAI(schoolId: string, id: string): Promise<void>;

  getGraphAIModel(schoolId: string, id: string): Promise<any | null>;
  listGraphAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphAIModel(schoolId: string, data: any): Promise<any>;
  updateGraphAIModel(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphAIModel(schoolId: string, id: string): Promise<void>;

  getGraphAIPrediction(schoolId: string, id: string): Promise<any | null>;
  listGraphAIPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphAIPrediction(schoolId: string, data: any): Promise<any>;
  updateGraphAIPrediction(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphAIPrediction(schoolId: string, id: string): Promise<void>;

  getGraphAIInsight(schoolId: string, id: string): Promise<any | null>;
  listGraphAIInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphAIInsight(schoolId: string, data: any): Promise<any>;
  updateGraphAIInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphAIInsight(schoolId: string, id: string): Promise<void>;

  getGraphHealthStatus(schoolId: string, id: string): Promise<any | null>;
  listGraphHealthStatus(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphHealthStatus(schoolId: string, data: any): Promise<any>;
  updateGraphHealthStatus(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphHealthStatus(schoolId: string, id: string): Promise<void>;

  getGraphMetric(schoolId: string, id: string): Promise<any | null>;
  listGraphMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphMetric(schoolId: string, data: any): Promise<any>;
  updateGraphMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphMetric(schoolId: string, id: string): Promise<void>;

  getGraphAlert(schoolId: string, id: string): Promise<any | null>;
  listGraphAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphAlert(schoolId: string, data: any): Promise<any>;
  updateGraphAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphAlert(schoolId: string, id: string): Promise<void>;

  getGraphAudit(schoolId: string, id: string): Promise<any | null>;
  listGraphAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphAudit(schoolId: string, data: any): Promise<any>;
  updateGraphAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphAudit(schoolId: string, id: string): Promise<void>;

  getGraphTemplate(schoolId: string, id: string): Promise<any | null>;
  listGraphTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphTemplate(schoolId: string, data: any): Promise<any>;
  updateGraphTemplate(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphTemplate(schoolId: string, id: string): Promise<void>;

  getGraphPreset(schoolId: string, id: string): Promise<any | null>;
  listGraphPreset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphPreset(schoolId: string, data: any): Promise<any>;
  updateGraphPreset(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphPreset(schoolId: string, id: string): Promise<void>;

  getGraphHistory(schoolId: string, id: string): Promise<any | null>;
  listGraphHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphHistory(schoolId: string, data: any): Promise<any>;
  updateGraphHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphHistory(schoolId: string, id: string): Promise<void>;

  getSemanticSearch(schoolId: string, id: string): Promise<any | null>;
  listSemanticSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSemanticSearch(schoolId: string, data: any): Promise<any>;
  updateSemanticSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteSemanticSearch(schoolId: string, id: string): Promise<void>;

  getSemanticQuery(schoolId: string, id: string): Promise<any | null>;
  listSemanticQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSemanticQuery(schoolId: string, data: any): Promise<any>;
  updateSemanticQuery(schoolId: string, id: string, data: any): Promise<any>;
  deleteSemanticQuery(schoolId: string, id: string): Promise<void>;

  getSemanticResult(schoolId: string, id: string): Promise<any | null>;
  listSemanticResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSemanticResult(schoolId: string, data: any): Promise<any>;
  updateSemanticResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteSemanticResult(schoolId: string, id: string): Promise<void>;

  getRecommendationGraph(schoolId: string, id: string): Promise<any | null>;
  listRecommendationGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRecommendationGraph(schoolId: string, data: any): Promise<any>;
  updateRecommendationGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteRecommendationGraph(schoolId: string, id: string): Promise<void>;

  getRecommendationPath(schoolId: string, id: string): Promise<any | null>;
  listRecommendationPath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRecommendationPath(schoolId: string, data: any): Promise<any>;
  updateRecommendationPath(schoolId: string, id: string, data: any): Promise<any>;
  deleteRecommendationPath(schoolId: string, id: string): Promise<void>;

  getRecommendationScore(schoolId: string, id: string): Promise<any | null>;
  listRecommendationScore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRecommendationScore(schoolId: string, data: any): Promise<any>;
  updateRecommendationScore(schoolId: string, id: string, data: any): Promise<any>;
  deleteRecommendationScore(schoolId: string, id: string): Promise<void>;

  getRelationshipDiscovery(schoolId: string, id: string): Promise<any | null>;
  listRelationshipDiscovery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRelationshipDiscovery(schoolId: string, data: any): Promise<any>;
  updateRelationshipDiscovery(schoolId: string, id: string, data: any): Promise<any>;
  deleteRelationshipDiscovery(schoolId: string, id: string): Promise<void>;

  getRelationshipPattern(schoolId: string, id: string): Promise<any | null>;
  listRelationshipPattern(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRelationshipPattern(schoolId: string, data: any): Promise<any>;
  updateRelationshipPattern(schoolId: string, id: string, data: any): Promise<any>;
  deleteRelationshipPattern(schoolId: string, id: string): Promise<void>;

  getRelationshipStrengthScore(schoolId: string, id: string): Promise<any | null>;
  listRelationshipStrengthScore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRelationshipStrengthScore(schoolId: string, data: any): Promise<any>;
  updateRelationshipStrengthScore(schoolId: string, id: string, data: any): Promise<any>;
  deleteRelationshipStrengthScore(schoolId: string, id: string): Promise<void>;

  getKnowledgeNode(schoolId: string, id: string): Promise<any | null>;
  listKnowledgeNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createKnowledgeNode(schoolId: string, data: any): Promise<any>;
  updateKnowledgeNode(schoolId: string, id: string, data: any): Promise<any>;
  deleteKnowledgeNode(schoolId: string, id: string): Promise<void>;

  getKnowledgeEdge(schoolId: string, id: string): Promise<any | null>;
  listKnowledgeEdge(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createKnowledgeEdge(schoolId: string, data: any): Promise<any>;
  updateKnowledgeEdge(schoolId: string, id: string, data: any): Promise<any>;
  deleteKnowledgeEdge(schoolId: string, id: string): Promise<void>;

  getKnowledgePath(schoolId: string, id: string): Promise<any | null>;
  listKnowledgePath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createKnowledgePath(schoolId: string, data: any): Promise<any>;
  updateKnowledgePath(schoolId: string, id: string, data: any): Promise<any>;
  deleteKnowledgePath(schoolId: string, id: string): Promise<void>;

  getKnowledgeCluster(schoolId: string, id: string): Promise<any | null>;
  listKnowledgeCluster(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createKnowledgeCluster(schoolId: string, data: any): Promise<any>;
  updateKnowledgeCluster(schoolId: string, id: string, data: any): Promise<any>;
  deleteKnowledgeCluster(schoolId: string, id: string): Promise<void>;

  getSkillGap(schoolId: string, id: string): Promise<any | null>;
  listSkillGap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSkillGap(schoolId: string, data: any): Promise<any>;
  updateSkillGap(schoolId: string, id: string, data: any): Promise<any>;
  deleteSkillGap(schoolId: string, id: string): Promise<void>;

  getSkillMatch(schoolId: string, id: string): Promise<any | null>;
  listSkillMatch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSkillMatch(schoolId: string, data: any): Promise<any>;
  updateSkillMatch(schoolId: string, id: string, data: any): Promise<any>;
  deleteSkillMatch(schoolId: string, id: string): Promise<void>;

  getSkillTrend(schoolId: string, id: string): Promise<any | null>;
  listSkillTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSkillTrend(schoolId: string, data: any): Promise<any>;
  updateSkillTrend(schoolId: string, id: string, data: any): Promise<any>;
  deleteSkillTrend(schoolId: string, id: string): Promise<void>;

  getSkillForecast(schoolId: string, id: string): Promise<any | null>;
  listSkillForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSkillForecast(schoolId: string, data: any): Promise<any>;
  updateSkillForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteSkillForecast(schoolId: string, id: string): Promise<void>;

  getCompetencyMap(schoolId: string, id: string): Promise<any | null>;
  listCompetencyMap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCompetencyMap(schoolId: string, data: any): Promise<any>;
  updateCompetencyMap(schoolId: string, id: string, data: any): Promise<any>;
  deleteCompetencyMap(schoolId: string, id: string): Promise<void>;

  getCompetencyEntry(schoolId: string, id: string): Promise<any | null>;
  listCompetencyEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCompetencyEntry(schoolId: string, data: any): Promise<any>;
  updateCompetencyEntry(schoolId: string, id: string, data: any): Promise<any>;
  deleteCompetencyEntry(schoolId: string, id: string): Promise<void>;

  getCompetencyPath(schoolId: string, id: string): Promise<any | null>;
  listCompetencyPath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCompetencyPath(schoolId: string, data: any): Promise<any>;
  updateCompetencyPath(schoolId: string, id: string, data: any): Promise<any>;
  deleteCompetencyPath(schoolId: string, id: string): Promise<void>;

  getCompetencyStep(schoolId: string, id: string): Promise<any | null>;
  listCompetencyStep(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCompetencyStep(schoolId: string, data: any): Promise<any>;
  updateCompetencyStep(schoolId: string, id: string, data: any): Promise<any>;
  deleteCompetencyStep(schoolId: string, id: string): Promise<void>;

  getCompetencyProgress(schoolId: string, id: string): Promise<any | null>;
  listCompetencyProgress(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCompetencyProgress(schoolId: string, data: any): Promise<any>;
  updateCompetencyProgress(schoolId: string, id: string, data: any): Promise<any>;
  deleteCompetencyProgress(schoolId: string, id: string): Promise<void>;

  getLearningPath(schoolId: string, id: string): Promise<any | null>;
  listLearningPath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLearningPath(schoolId: string, data: any): Promise<any>;
  updateLearningPath(schoolId: string, id: string, data: any): Promise<any>;
  deleteLearningPath(schoolId: string, id: string): Promise<void>;

  getLearningModule(schoolId: string, id: string): Promise<any | null>;
  listLearningModule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLearningModule(schoolId: string, data: any): Promise<any>;
  updateLearningModule(schoolId: string, id: string, data: any): Promise<any>;
  deleteLearningModule(schoolId: string, id: string): Promise<void>;

  getLearningOutcome(schoolId: string, id: string): Promise<any | null>;
  listLearningOutcome(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLearningOutcome(schoolId: string, data: any): Promise<any>;
  updateLearningOutcome(schoolId: string, id: string, data: any): Promise<any>;
  deleteLearningOutcome(schoolId: string, id: string): Promise<void>;

  getAlumniNetwork(schoolId: string, id: string): Promise<any | null>;
  listAlumniNetwork(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlumniNetwork(schoolId: string, data: any): Promise<any>;
  updateAlumniNetwork(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlumniNetwork(schoolId: string, id: string): Promise<void>;

  getAlumniEvent(schoolId: string, id: string): Promise<any | null>;
  listAlumniEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlumniEvent(schoolId: string, data: any): Promise<any>;
  updateAlumniEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlumniEvent(schoolId: string, id: string): Promise<void>;

  getAlumniContribution(schoolId: string, id: string): Promise<any | null>;
  listAlumniContribution(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlumniContribution(schoolId: string, data: any): Promise<any>;
  updateAlumniContribution(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlumniContribution(schoolId: string, id: string): Promise<void>;

  getResearchCollaboration(schoolId: string, id: string): Promise<any | null>;
  listResearchCollaboration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createResearchCollaboration(schoolId: string, data: any): Promise<any>;
  updateResearchCollaboration(schoolId: string, id: string, data: any): Promise<any>;
  deleteResearchCollaboration(schoolId: string, id: string): Promise<void>;

  getResearchImpact(schoolId: string, id: string): Promise<any | null>;
  listResearchImpact(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createResearchImpact(schoolId: string, data: any): Promise<any>;
  updateResearchImpact(schoolId: string, id: string, data: any): Promise<any>;
  deleteResearchImpact(schoolId: string, id: string): Promise<void>;

  getResearchTrend(schoolId: string, id: string): Promise<any | null>;
  listResearchTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createResearchTrend(schoolId: string, data: any): Promise<any>;
  updateResearchTrend(schoolId: string, id: string, data: any): Promise<any>;
  deleteResearchTrend(schoolId: string, id: string): Promise<void>;

  getEmploymentPath(schoolId: string, id: string): Promise<any | null>;
  listEmploymentPath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmploymentPath(schoolId: string, data: any): Promise<any>;
  updateEmploymentPath(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmploymentPath(schoolId: string, id: string): Promise<void>;

  getEmploymentPosition(schoolId: string, id: string): Promise<any | null>;
  listEmploymentPosition(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmploymentPosition(schoolId: string, data: any): Promise<any>;
  updateEmploymentPosition(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmploymentPosition(schoolId: string, id: string): Promise<void>;

  getEmploymentTrend(schoolId: string, id: string): Promise<any | null>;
  listEmploymentTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmploymentTrend(schoolId: string, data: any): Promise<any>;
  updateEmploymentTrend(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmploymentTrend(schoolId: string, id: string): Promise<void>;

  getEmploymentMatch(schoolId: string, id: string): Promise<any | null>;
  listEmploymentMatch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmploymentMatch(schoolId: string, data: any): Promise<any>;
  updateEmploymentMatch(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmploymentMatch(schoolId: string, id: string): Promise<void>;

  getStudentGraph(schoolId: string, id: string): Promise<any | null>;
  listStudentGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStudentGraph(schoolId: string, data: any): Promise<any>;
  updateStudentGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteStudentGraph(schoolId: string, id: string): Promise<void>;

  getTeacherGraph(schoolId: string, id: string): Promise<any | null>;
  listTeacherGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherGraph(schoolId: string, data: any): Promise<any>;
  updateTeacherGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherGraph(schoolId: string, id: string): Promise<void>;

  getSchoolGraph(schoolId: string, id: string): Promise<any | null>;
  listSchoolGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchoolGraph(schoolId: string, data: any): Promise<any>;
  updateSchoolGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchoolGraph(schoolId: string, id: string): Promise<void>;

  getCurriculumGraph(schoolId: string, id: string): Promise<any | null>;
  listCurriculumGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCurriculumGraph(schoolId: string, data: any): Promise<any>;
  updateCurriculumGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteCurriculumGraph(schoolId: string, id: string): Promise<void>;

  getSkillsGraph(schoolId: string, id: string): Promise<any | null>;
  listSkillsGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSkillsGraph(schoolId: string, data: any): Promise<any>;
  updateSkillsGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteSkillsGraph(schoolId: string, id: string): Promise<void>;

  getCompetencyGraph(schoolId: string, id: string): Promise<any | null>;
  listCompetencyGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCompetencyGraph(schoolId: string, data: any): Promise<any>;
  updateCompetencyGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteCompetencyGraph(schoolId: string, id: string): Promise<void>;

  getEmploymentGraph(schoolId: string, id: string): Promise<any | null>;
  listEmploymentGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmploymentGraph(schoolId: string, data: any): Promise<any>;
  updateEmploymentGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmploymentGraph(schoolId: string, id: string): Promise<void>;

  getAlumniGraph(schoolId: string, id: string): Promise<any | null>;
  listAlumniGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAlumniGraph(schoolId: string, data: any): Promise<any>;
  updateAlumniGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteAlumniGraph(schoolId: string, id: string): Promise<void>;

  getResearchGraph(schoolId: string, id: string): Promise<any | null>;
  listResearchGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createResearchGraph(schoolId: string, data: any): Promise<any>;
  updateResearchGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteResearchGraph(schoolId: string, id: string): Promise<void>;

  getLearningGraph(schoolId: string, id: string): Promise<any | null>;
  listLearningGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLearningGraph(schoolId: string, data: any): Promise<any>;
  updateLearningGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteLearningGraph(schoolId: string, id: string): Promise<void>;

  getAIGraph(schoolId: string, id: string): Promise<any | null>;
  listAIGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAIGraph(schoolId: string, data: any): Promise<any>;
  updateAIGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteAIGraph(schoolId: string, id: string): Promise<void>;

  getConceptGraph(schoolId: string, id: string): Promise<any | null>;
  listConceptGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createConceptGraph(schoolId: string, data: any): Promise<any>;
  updateConceptGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteConceptGraph(schoolId: string, id: string): Promise<void>;

  getTopicGraph(schoolId: string, id: string): Promise<any | null>;
  listTopicGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTopicGraph(schoolId: string, data: any): Promise<any>;
  updateTopicGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteTopicGraph(schoolId: string, id: string): Promise<void>;

  getResourceGraph(schoolId: string, id: string): Promise<any | null>;
  listResourceGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createResourceGraph(schoolId: string, data: any): Promise<any>;
  updateResourceGraph(schoolId: string, id: string, data: any): Promise<any>;
  deleteResourceGraph(schoolId: string, id: string): Promise<void>;

  getGraphTraversalConfig(schoolId: string, id: string): Promise<any | null>;
  listGraphTraversalConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGraphTraversalConfig(schoolId: string, data: any): Promise<any>;
  updateGraphTraversalConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteGraphTraversalConfig(schoolId: string, id: string): Promise<void>;

}

class GovernmentModuleRepositoryImpl implements GovernmentModuleRepository {
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
  async getGraphNode(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphNodeError(error.message);
    return data ?? [];
  }

  async createGraphNode(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphNodeError(error.message);
    return result;
  }

  async updateGraphNode(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphNodeError(error.message);
    return result;
  }

  async deleteGraphNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphNodeError(error.message);
  }

  async getGraphEdge(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_edges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphEdge(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_edges').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphEdgeError(error.message);
    return data ?? [];
  }

  async createGraphEdge(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_edges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphEdgeError(error.message);
    return result;
  }

  async updateGraphEdge(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_edges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphEdgeError(error.message);
    return result;
  }

  async deleteGraphEdge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_edges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphEdgeError(error.message);
  }

  async getGraphPath(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_paths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphPath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_paths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphPathError(error.message);
    return data ?? [];
  }

  async createGraphPath(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_paths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphPathError(error.message);
    return result;
  }

  async updateGraphPath(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_paths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphPathError(error.message);
    return result;
  }

  async deleteGraphPath(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_paths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphPathError(error.message);
  }

  async getGraphCommunity(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_communitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCommunity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createGraphCommunity(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_communitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphCommunityError(error.message);
    return result;
  }

  async updateGraphCommunity(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteGraphCommunity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_communitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphCommunityError(error.message);
  }

  async getGraphQuery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_querys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createGraphQuery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_querys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphQueryError(error.message);
    return result;
  }

  async updateGraphQuery(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteGraphQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_querys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphQueryError(error.message);
  }

  async getGraphSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createGraphSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSearchError(error.message);
    return result;
  }

  async updateGraphSearch(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteGraphSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSearchError(error.message);
  }

  async getGraphSearchResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_search_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSearchResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_search_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphSearchResultError(error.message);
    return data ?? [];
  }

  async createGraphSearchResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_search_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSearchResultError(error.message);
    return result;
  }

  async updateGraphSearchResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_search_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphSearchResultError(error.message);
    return result;
  }

  async deleteGraphSearchResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_search_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSearchResultError(error.message);
  }

  async getGraphTraversalResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_traversal_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphTraversalResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_traversal_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphTraversalResultError(error.message);
    return data ?? [];
  }

  async createGraphTraversalResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_traversal_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphTraversalResultError(error.message);
    return result;
  }

  async updateGraphTraversalResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_traversal_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphTraversalResultError(error.message);
    return result;
  }

  async deleteGraphTraversalResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_traversal_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphTraversalResultError(error.message);
  }

  async getGraphAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphAnalyticsError(error.message);
    return data ?? [];
  }

  async createGraphAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphAnalyticsError(error.message);
    return result;
  }

  async updateGraphAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphAnalyticsError(error.message);
    return result;
  }

  async deleteGraphAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphAnalyticsError(error.message);
  }

  async getGraphCentrality(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_centralitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphCentrality(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createGraphCentrality(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_centralitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphCentralityError(error.message);
    return result;
  }

  async updateGraphCentrality(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteGraphCentrality(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_centralitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphCentralityError(error.message);
  }

  async getGraphRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_recommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createGraphRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_recommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphRecommendationError(error.message);
    return result;
  }

  async updateGraphRecommendation(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteGraphRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_recommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphRecommendationError(error.message);
  }

  async getGraphInsight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_insights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphInsightError(error.message);
    return data ?? [];
  }

  async createGraphInsight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphInsightError(error.message);
    return result;
  }

  async updateGraphInsight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphInsightError(error.message);
    return result;
  }

  async deleteGraphInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphInsightError(error.message);
  }

  async getGraphPattern(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_patterns')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphPattern(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_patterns').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphPatternError(error.message);
    return data ?? [];
  }

  async createGraphPattern(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_patterns')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphPatternError(error.message);
    return result;
  }

  async updateGraphPattern(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_patterns')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphPatternError(error.message);
    return result;
  }

  async deleteGraphPattern(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_patterns')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphPatternError(error.message);
  }

  async getGraphEmbedding(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_embeddings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphEmbedding(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createGraphEmbedding(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_embeddings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphEmbeddingError(error.message);
    return result;
  }

  async updateGraphEmbedding(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteGraphEmbedding(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_embeddings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphEmbeddingError(error.message);
  }

  async getGraphVector(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_vectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphVector(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_vectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphVectorError(error.message);
    return data ?? [];
  }

  async createGraphVector(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_vectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphVectorError(error.message);
    return result;
  }

  async updateGraphVector(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_vectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphVectorError(error.message);
    return result;
  }

  async deleteGraphVector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_vectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphVectorError(error.message);
  }

  async getGraphIndex(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_indexes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphIndex(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphIndexError(error.message);
    return data ?? [];
  }

  async createGraphIndex(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_indexes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphIndexError(error.message);
    return result;
  }

  async updateGraphIndex(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_indexes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphIndexError(error.message);
    return result;
  }

  async deleteGraphIndex(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_indexes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphIndexError(error.message);
  }

  async getGraphSchema(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_schemas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSchema(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_schemas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphSchemaError(error.message);
    return data ?? [];
  }

  async createGraphSchema(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_schemas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSchemaError(error.message);
    return result;
  }

  async updateGraphSchema(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_schemas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphSchemaError(error.message);
    return result;
  }

  async deleteGraphSchema(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_schemas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSchemaError(error.message);
  }

  async getGraphConstraint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_constraints')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphConstraint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_constraints').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphConstraintError(error.message);
    return data ?? [];
  }

  async createGraphConstraint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_constraints')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphConstraintError(error.message);
    return result;
  }

  async updateGraphConstraint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_constraints')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphConstraintError(error.message);
    return result;
  }

  async deleteGraphConstraint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_constraints')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphConstraintError(error.message);
  }

  async getGraphUpdate(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_updates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphUpdate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_updates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphUpdateError(error.message);
    return data ?? [];
  }

  async createGraphUpdate(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_updates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphUpdateError(error.message);
    return result;
  }

  async updateGraphUpdate(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_updates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphUpdateError(error.message);
    return result;
  }

  async deleteGraphUpdate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_updates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphUpdateError(error.message);
  }

  async getGraphSync(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_syncs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphSync(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_syncs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphSyncError(error.message);
    return data ?? [];
  }

  async createGraphSync(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_syncs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphSyncError(error.message);
    return result;
  }

  async updateGraphSync(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_syncs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphSyncError(error.message);
    return result;
  }

  async deleteGraphSync(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_syncs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphSyncError(error.message);
  }

  async getGraphExport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_exports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphExport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createGraphExport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_exports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphExportError(error.message);
    return result;
  }

  async updateGraphExport(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteGraphExport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_exports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphExportError(error.message);
  }

  async getGraphImport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_imports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphImport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createGraphImport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_imports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphImportError(error.message);
    return result;
  }

  async updateGraphImport(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteGraphImport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_imports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphImportError(error.message);
  }

  async getGraphVisualization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_visualizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphVisualization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_visualizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphVisualizationError(error.message);
    return data ?? [];
  }

  async createGraphVisualization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_visualizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphVisualizationError(error.message);
    return result;
  }

  async updateGraphVisualization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_visualizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphVisualizationError(error.message);
    return result;
  }

  async deleteGraphVisualization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_visualizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphVisualizationError(error.message);
  }

  async getGraphVisualizationConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_visualizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphVisualizationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_visualizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphVisualizationError(error.message);
    return data ?? [];
  }

  async createGraphVisualizationConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_visualizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphVisualizationError(error.message);
    return result;
  }

  async updateGraphVisualizationConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_visualizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphVisualizationError(error.message);
    return result;
  }

  async deleteGraphVisualizationConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_visualizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphVisualizationError(error.message);
  }

  async getGraphDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphDashboardError(error.message);
    return data ?? [];
  }

  async createGraphDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphDashboardError(error.message);
    return result;
  }

  async updateGraphDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphDashboardError(error.message);
    return result;
  }

  async deleteGraphDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphDashboardError(error.message);
  }

  async getGraphDashboardWidget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_dashboard_widgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphDashboardWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_dashboard_widgets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphDashboardWidgetError(error.message);
    return data ?? [];
  }

  async createGraphDashboardWidget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_dashboard_widgets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphDashboardWidgetError(error.message);
    return result;
  }

  async updateGraphDashboardWidget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_dashboard_widgets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphDashboardWidgetError(error.message);
    return result;
  }

  async deleteGraphDashboardWidget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_dashboard_widgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphDashboardWidgetError(error.message);
  }

  async getGraphReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphReportError(error.message);
    return data ?? [];
  }

  async createGraphReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphReportError(error.message);
    return result;
  }

  async updateGraphReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphReportError(error.message);
    return result;
  }

  async deleteGraphReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphReportError(error.message);
  }

  async getGraphAI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_ais')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_ais').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphAIError(error.message);
    return data ?? [];
  }

  async createGraphAI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_ais')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphAIError(error.message);
    return result;
  }

  async updateGraphAI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_ais')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphAIError(error.message);
    return result;
  }

  async deleteGraphAI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_ais')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphAIError(error.message);
  }

  async getGraphAIModel(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_aimodels')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_aimodels').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphAIModelError(error.message);
    return data ?? [];
  }

  async createGraphAIModel(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_aimodels')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphAIModelError(error.message);
    return result;
  }

  async updateGraphAIModel(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_aimodels')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphAIModelError(error.message);
    return result;
  }

  async deleteGraphAIModel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_aimodels')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphAIModelError(error.message);
  }

  async getGraphAIPrediction(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_aipredictioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphAIPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_aipredictioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphAIPredictionError(error.message);
    return data ?? [];
  }

  async createGraphAIPrediction(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_aipredictioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphAIPredictionError(error.message);
    return result;
  }

  async updateGraphAIPrediction(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_aipredictioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphAIPredictionError(error.message);
    return result;
  }

  async deleteGraphAIPrediction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_aipredictioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphAIPredictionError(error.message);
  }

  async getGraphAIInsight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_aiinsights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphAIInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_aiinsights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphAIInsightError(error.message);
    return data ?? [];
  }

  async createGraphAIInsight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_aiinsights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphAIInsightError(error.message);
    return result;
  }

  async updateGraphAIInsight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_aiinsights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphAIInsightError(error.message);
    return result;
  }

  async deleteGraphAIInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_aiinsights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphAIInsightError(error.message);
  }

  async getGraphHealthStatus(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_health_statuses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphHealthStatus(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_health_statuses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphHealthStatusError(error.message);
    return data ?? [];
  }

  async createGraphHealthStatus(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_health_statuses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphHealthStatusError(error.message);
    return result;
  }

  async updateGraphHealthStatus(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_health_statuses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphHealthStatusError(error.message);
    return result;
  }

  async deleteGraphHealthStatus(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_health_statuses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphHealthStatusError(error.message);
  }

  async getGraphMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphMetricError(error.message);
    return data ?? [];
  }

  async createGraphMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphMetricError(error.message);
    return result;
  }

  async updateGraphMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphMetricError(error.message);
    return result;
  }

  async deleteGraphMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphMetricError(error.message);
  }

  async getGraphAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphAlertError(error.message);
    return data ?? [];
  }

  async createGraphAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphAlertError(error.message);
    return result;
  }

  async updateGraphAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphAlertError(error.message);
    return result;
  }

  async deleteGraphAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphAlertError(error.message);
  }

  async getGraphAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphAuditError(error.message);
    return data ?? [];
  }

  async createGraphAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphAuditError(error.message);
    return result;
  }

  async updateGraphAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphAuditError(error.message);
    return result;
  }

  async deleteGraphAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphAuditError(error.message);
  }

  async getGraphTemplate(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_templates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphTemplateError(error.message);
    return data ?? [];
  }

  async createGraphTemplate(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphTemplateError(error.message);
    return result;
  }

  async updateGraphTemplate(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphTemplateError(error.message);
    return result;
  }

  async deleteGraphTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphTemplateError(error.message);
  }

  async getGraphPreset(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_presets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphPreset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_presets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphPresetError(error.message);
    return data ?? [];
  }

  async createGraphPreset(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_presets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphPresetError(error.message);
    return result;
  }

  async updateGraphPreset(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_presets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphPresetError(error.message);
    return result;
  }

  async deleteGraphPreset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_presets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphPresetError(error.message);
  }

  async getGraphHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphHistoryError(error.message);
    return data ?? [];
  }

  async createGraphHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphHistoryError(error.message);
    return result;
  }

  async updateGraphHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphHistoryError(error.message);
    return result;
  }

  async deleteGraphHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphHistoryError(error.message);
  }

  async getSemanticSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('semantic_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSemanticSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('semantic_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSemanticSearchError(error.message);
    return data ?? [];
  }

  async createSemanticSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('semantic_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSemanticSearchError(error.message);
    return result;
  }

  async updateSemanticSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('semantic_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSemanticSearchError(error.message);
    return result;
  }

  async deleteSemanticSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('semantic_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSemanticSearchError(error.message);
  }

  async getSemanticQuery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('semantic_querys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSemanticQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('semantic_querys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSemanticQueryError(error.message);
    return data ?? [];
  }

  async createSemanticQuery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('semantic_querys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSemanticQueryError(error.message);
    return result;
  }

  async updateSemanticQuery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('semantic_querys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSemanticQueryError(error.message);
    return result;
  }

  async deleteSemanticQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('semantic_querys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSemanticQueryError(error.message);
  }

  async getSemanticResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('semantic_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSemanticResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('semantic_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSemanticResultError(error.message);
    return data ?? [];
  }

  async createSemanticResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('semantic_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSemanticResultError(error.message);
    return result;
  }

  async updateSemanticResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('semantic_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSemanticResultError(error.message);
    return result;
  }

  async deleteSemanticResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('semantic_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSemanticResultError(error.message);
  }

  async getRecommendationGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('recommendation_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRecommendationGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('recommendation_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRecommendationGraphError(error.message);
    return data ?? [];
  }

  async createRecommendationGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('recommendation_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRecommendationGraphError(error.message);
    return result;
  }

  async updateRecommendationGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('recommendation_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRecommendationGraphError(error.message);
    return result;
  }

  async deleteRecommendationGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recommendation_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRecommendationGraphError(error.message);
  }

  async getRecommendationPath(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('recommendation_paths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRecommendationPath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('recommendation_paths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRecommendationPathError(error.message);
    return data ?? [];
  }

  async createRecommendationPath(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('recommendation_paths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRecommendationPathError(error.message);
    return result;
  }

  async updateRecommendationPath(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('recommendation_paths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRecommendationPathError(error.message);
    return result;
  }

  async deleteRecommendationPath(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recommendation_paths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRecommendationPathError(error.message);
  }

  async getRecommendationScore(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('recommendation_scores')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRecommendationScore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('recommendation_scores').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRecommendationScoreError(error.message);
    return data ?? [];
  }

  async createRecommendationScore(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('recommendation_scores')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRecommendationScoreError(error.message);
    return result;
  }

  async updateRecommendationScore(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('recommendation_scores')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRecommendationScoreError(error.message);
    return result;
  }

  async deleteRecommendationScore(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recommendation_scores')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRecommendationScoreError(error.message);
  }

  async getRelationshipDiscovery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('relationship_discoverys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRelationshipDiscovery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('relationship_discoverys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRelationshipDiscoveryError(error.message);
    return data ?? [];
  }

  async createRelationshipDiscovery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('relationship_discoverys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRelationshipDiscoveryError(error.message);
    return result;
  }

  async updateRelationshipDiscovery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('relationship_discoverys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRelationshipDiscoveryError(error.message);
    return result;
  }

  async deleteRelationshipDiscovery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('relationship_discoverys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRelationshipDiscoveryError(error.message);
  }

  async getRelationshipPattern(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('relationship_patterns')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRelationshipPattern(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('relationship_patterns').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRelationshipPatternError(error.message);
    return data ?? [];
  }

  async createRelationshipPattern(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('relationship_patterns')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRelationshipPatternError(error.message);
    return result;
  }

  async updateRelationshipPattern(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('relationship_patterns')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRelationshipPatternError(error.message);
    return result;
  }

  async deleteRelationshipPattern(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('relationship_patterns')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRelationshipPatternError(error.message);
  }

  async getRelationshipStrengthScore(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('relationship_strength_scores')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRelationshipStrengthScore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('relationship_strength_scores').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRelationshipStrengthScoreError(error.message);
    return data ?? [];
  }

  async createRelationshipStrengthScore(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('relationship_strength_scores')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRelationshipStrengthScoreError(error.message);
    return result;
  }

  async updateRelationshipStrengthScore(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('relationship_strength_scores')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRelationshipStrengthScoreError(error.message);
    return result;
  }

  async deleteRelationshipStrengthScore(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('relationship_strength_scores')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRelationshipStrengthScoreError(error.message);
  }

  async getKnowledgeNode(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('knowledge_nodes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listKnowledgeNode(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('knowledge_nodes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudKnowledgeNodeError(error.message);
    return data ?? [];
  }

  async createKnowledgeNode(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('knowledge_nodes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudKnowledgeNodeError(error.message);
    return result;
  }

  async updateKnowledgeNode(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('knowledge_nodes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudKnowledgeNodeError(error.message);
    return result;
  }

  async deleteKnowledgeNode(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('knowledge_nodes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudKnowledgeNodeError(error.message);
  }

  async getKnowledgeEdge(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('knowledge_edges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listKnowledgeEdge(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('knowledge_edges').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudKnowledgeEdgeError(error.message);
    return data ?? [];
  }

  async createKnowledgeEdge(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('knowledge_edges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudKnowledgeEdgeError(error.message);
    return result;
  }

  async updateKnowledgeEdge(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('knowledge_edges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudKnowledgeEdgeError(error.message);
    return result;
  }

  async deleteKnowledgeEdge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('knowledge_edges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudKnowledgeEdgeError(error.message);
  }

  async getKnowledgePath(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('knowledge_paths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listKnowledgePath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('knowledge_paths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudKnowledgePathError(error.message);
    return data ?? [];
  }

  async createKnowledgePath(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('knowledge_paths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudKnowledgePathError(error.message);
    return result;
  }

  async updateKnowledgePath(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('knowledge_paths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudKnowledgePathError(error.message);
    return result;
  }

  async deleteKnowledgePath(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('knowledge_paths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudKnowledgePathError(error.message);
  }

  async getKnowledgeCluster(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('knowledge_clusters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listKnowledgeCluster(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('knowledge_clusters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudKnowledgeClusterError(error.message);
    return data ?? [];
  }

  async createKnowledgeCluster(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('knowledge_clusters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudKnowledgeClusterError(error.message);
    return result;
  }

  async updateKnowledgeCluster(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('knowledge_clusters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudKnowledgeClusterError(error.message);
    return result;
  }

  async deleteKnowledgeCluster(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('knowledge_clusters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudKnowledgeClusterError(error.message);
  }

  async getSkillGap(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('skill_gaps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSkillGap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('skill_gaps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSkillGapError(error.message);
    return data ?? [];
  }

  async createSkillGap(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('skill_gaps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSkillGapError(error.message);
    return result;
  }

  async updateSkillGap(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('skill_gaps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSkillGapError(error.message);
    return result;
  }

  async deleteSkillGap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('skill_gaps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSkillGapError(error.message);
  }

  async getSkillMatch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('skill_matches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSkillMatch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('skill_matches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSkillMatchError(error.message);
    return data ?? [];
  }

  async createSkillMatch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('skill_matches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSkillMatchError(error.message);
    return result;
  }

  async updateSkillMatch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('skill_matches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSkillMatchError(error.message);
    return result;
  }

  async deleteSkillMatch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('skill_matches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSkillMatchError(error.message);
  }

  async getSkillTrend(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('skill_trends')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSkillTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('skill_trends').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSkillTrendError(error.message);
    return data ?? [];
  }

  async createSkillTrend(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('skill_trends')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSkillTrendError(error.message);
    return result;
  }

  async updateSkillTrend(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('skill_trends')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSkillTrendError(error.message);
    return result;
  }

  async deleteSkillTrend(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('skill_trends')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSkillTrendError(error.message);
  }

  async getSkillForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('skill_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSkillForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('skill_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSkillForecastError(error.message);
    return data ?? [];
  }

  async createSkillForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('skill_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSkillForecastError(error.message);
    return result;
  }

  async updateSkillForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('skill_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSkillForecastError(error.message);
    return result;
  }

  async deleteSkillForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('skill_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSkillForecastError(error.message);
  }

  async getCompetencyMap(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('competency_maps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCompetencyMap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('competency_maps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCompetencyMapError(error.message);
    return data ?? [];
  }

  async createCompetencyMap(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('competency_maps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCompetencyMapError(error.message);
    return result;
  }

  async updateCompetencyMap(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('competency_maps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCompetencyMapError(error.message);
    return result;
  }

  async deleteCompetencyMap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_maps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCompetencyMapError(error.message);
  }

  async getCompetencyEntry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('competencys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCompetencyEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('competencys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCompetencyError(error.message);
    return data ?? [];
  }

  async createCompetencyEntry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('competencys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCompetencyError(error.message);
    return result;
  }

  async updateCompetencyEntry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('competencys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCompetencyError(error.message);
    return result;
  }

  async deleteCompetencyEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competencys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCompetencyError(error.message);
  }

  async getCompetencyPath(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('competency_paths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCompetencyPath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('competency_paths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCompetencyPathError(error.message);
    return data ?? [];
  }

  async createCompetencyPath(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('competency_paths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCompetencyPathError(error.message);
    return result;
  }

  async updateCompetencyPath(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('competency_paths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCompetencyPathError(error.message);
    return result;
  }

  async deleteCompetencyPath(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_paths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCompetencyPathError(error.message);
  }

  async getCompetencyStep(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('competency_steps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCompetencyStep(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('competency_steps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCompetencyStepError(error.message);
    return data ?? [];
  }

  async createCompetencyStep(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('competency_steps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCompetencyStepError(error.message);
    return result;
  }

  async updateCompetencyStep(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('competency_steps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCompetencyStepError(error.message);
    return result;
  }

  async deleteCompetencyStep(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_steps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCompetencyStepError(error.message);
  }

  async getCompetencyProgress(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('competency_progresses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCompetencyProgress(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('competency_progresses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCompetencyProgressError(error.message);
    return data ?? [];
  }

  async createCompetencyProgress(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('competency_progresses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCompetencyProgressError(error.message);
    return result;
  }

  async updateCompetencyProgress(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('competency_progresses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCompetencyProgressError(error.message);
    return result;
  }

  async deleteCompetencyProgress(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_progresses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCompetencyProgressError(error.message);
  }

  async getLearningPath(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('learning_paths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLearningPath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('learning_paths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLearningPathError(error.message);
    return data ?? [];
  }

  async createLearningPath(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('learning_paths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLearningPathError(error.message);
    return result;
  }

  async updateLearningPath(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('learning_paths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLearningPathError(error.message);
    return result;
  }

  async deleteLearningPath(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_paths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLearningPathError(error.message);
  }

  async getLearningModule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('learning_modules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLearningModule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('learning_modules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLearningModuleError(error.message);
    return data ?? [];
  }

  async createLearningModule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('learning_modules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLearningModuleError(error.message);
    return result;
  }

  async updateLearningModule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('learning_modules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLearningModuleError(error.message);
    return result;
  }

  async deleteLearningModule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_modules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLearningModuleError(error.message);
  }

  async getLearningOutcome(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('learning_outcomes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLearningOutcome(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('learning_outcomes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLearningOutcomeError(error.message);
    return data ?? [];
  }

  async createLearningOutcome(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('learning_outcomes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLearningOutcomeError(error.message);
    return result;
  }

  async updateLearningOutcome(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('learning_outcomes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLearningOutcomeError(error.message);
    return result;
  }

  async deleteLearningOutcome(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_outcomes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLearningOutcomeError(error.message);
  }

  async getAlumniNetwork(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('alumni_networks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAlumniNetwork(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('alumni_networks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAlumniNetworkError(error.message);
    return data ?? [];
  }

  async createAlumniNetwork(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('alumni_networks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAlumniNetworkError(error.message);
    return result;
  }

  async updateAlumniNetwork(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('alumni_networks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAlumniNetworkError(error.message);
    return result;
  }

  async deleteAlumniNetwork(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('alumni_networks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAlumniNetworkError(error.message);
  }

  async getAlumniEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('alumni_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAlumniEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('alumni_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAlumniEventError(error.message);
    return data ?? [];
  }

  async createAlumniEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('alumni_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAlumniEventError(error.message);
    return result;
  }

  async updateAlumniEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('alumni_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAlumniEventError(error.message);
    return result;
  }

  async deleteAlumniEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('alumni_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAlumniEventError(error.message);
  }

  async getAlumniContribution(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('alumni_contributioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAlumniContribution(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('alumni_contributioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAlumniContributionError(error.message);
    return data ?? [];
  }

  async createAlumniContribution(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('alumni_contributioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAlumniContributionError(error.message);
    return result;
  }

  async updateAlumniContribution(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('alumni_contributioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAlumniContributionError(error.message);
    return result;
  }

  async deleteAlumniContribution(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('alumni_contributioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAlumniContributionError(error.message);
  }

  async getResearchCollaboration(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('research_collaboratioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listResearchCollaboration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('research_collaboratioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudResearchCollaborationError(error.message);
    return data ?? [];
  }

  async createResearchCollaboration(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('research_collaboratioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudResearchCollaborationError(error.message);
    return result;
  }

  async updateResearchCollaboration(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('research_collaboratioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudResearchCollaborationError(error.message);
    return result;
  }

  async deleteResearchCollaboration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_collaboratioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudResearchCollaborationError(error.message);
  }

  async getResearchImpact(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('research_impacts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listResearchImpact(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('research_impacts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudResearchImpactError(error.message);
    return data ?? [];
  }

  async createResearchImpact(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('research_impacts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudResearchImpactError(error.message);
    return result;
  }

  async updateResearchImpact(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('research_impacts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudResearchImpactError(error.message);
    return result;
  }

  async deleteResearchImpact(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_impacts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudResearchImpactError(error.message);
  }

  async getResearchTrend(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('research_trends')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listResearchTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('research_trends').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudResearchTrendError(error.message);
    return data ?? [];
  }

  async createResearchTrend(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('research_trends')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudResearchTrendError(error.message);
    return result;
  }

  async updateResearchTrend(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('research_trends')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudResearchTrendError(error.message);
    return result;
  }

  async deleteResearchTrend(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_trends')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudResearchTrendError(error.message);
  }

  async getEmploymentPath(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('employment_paths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmploymentPath(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('employment_paths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmploymentPathError(error.message);
    return data ?? [];
  }

  async createEmploymentPath(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employment_paths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmploymentPathError(error.message);
    return result;
  }

  async updateEmploymentPath(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('employment_paths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmploymentPathError(error.message);
    return result;
  }

  async deleteEmploymentPath(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employment_paths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmploymentPathError(error.message);
  }

  async getEmploymentPosition(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('employment_positioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmploymentPosition(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('employment_positioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmploymentPositionError(error.message);
    return data ?? [];
  }

  async createEmploymentPosition(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employment_positioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmploymentPositionError(error.message);
    return result;
  }

  async updateEmploymentPosition(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('employment_positioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmploymentPositionError(error.message);
    return result;
  }

  async deleteEmploymentPosition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employment_positioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmploymentPositionError(error.message);
  }

  async getEmploymentTrend(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('employment_trends')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmploymentTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('employment_trends').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmploymentTrendError(error.message);
    return data ?? [];
  }

  async createEmploymentTrend(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employment_trends')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmploymentTrendError(error.message);
    return result;
  }

  async updateEmploymentTrend(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('employment_trends')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmploymentTrendError(error.message);
    return result;
  }

  async deleteEmploymentTrend(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employment_trends')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmploymentTrendError(error.message);
  }

  async getEmploymentMatch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('employment_matches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmploymentMatch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('employment_matches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmploymentMatchError(error.message);
    return data ?? [];
  }

  async createEmploymentMatch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employment_matches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmploymentMatchError(error.message);
    return result;
  }

  async updateEmploymentMatch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('employment_matches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmploymentMatchError(error.message);
    return result;
  }

  async deleteEmploymentMatch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employment_matches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmploymentMatchError(error.message);
  }

  async getStudentGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('student_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStudentGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('student_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStudentGraphError(error.message);
    return data ?? [];
  }

  async createStudentGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStudentGraphError(error.message);
    return result;
  }

  async updateStudentGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('student_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStudentGraphError(error.message);
    return result;
  }

  async deleteStudentGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStudentGraphError(error.message);
  }

  async getTeacherGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherGraphError(error.message);
    return data ?? [];
  }

  async createTeacherGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherGraphError(error.message);
    return result;
  }

  async updateTeacherGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherGraphError(error.message);
    return result;
  }

  async deleteTeacherGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherGraphError(error.message);
  }

  async getSchoolGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('school_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchoolGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('school_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchoolGraphError(error.message);
    return data ?? [];
  }

  async createSchoolGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('school_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchoolGraphError(error.message);
    return result;
  }

  async updateSchoolGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('school_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchoolGraphError(error.message);
    return result;
  }

  async deleteSchoolGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchoolGraphError(error.message);
  }

  async getCurriculumGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('curriculum_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCurriculumGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('curriculum_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCurriculumGraphError(error.message);
    return data ?? [];
  }

  async createCurriculumGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('curriculum_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCurriculumGraphError(error.message);
    return result;
  }

  async updateCurriculumGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('curriculum_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCurriculumGraphError(error.message);
    return result;
  }

  async deleteCurriculumGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('curriculum_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCurriculumGraphError(error.message);
  }

  async getSkillsGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('skills_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSkillsGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('skills_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSkillsGraphError(error.message);
    return data ?? [];
  }

  async createSkillsGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('skills_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSkillsGraphError(error.message);
    return result;
  }

  async updateSkillsGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('skills_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSkillsGraphError(error.message);
    return result;
  }

  async deleteSkillsGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('skills_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSkillsGraphError(error.message);
  }

  async getCompetencyGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('competency_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCompetencyGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('competency_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCompetencyGraphError(error.message);
    return data ?? [];
  }

  async createCompetencyGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('competency_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCompetencyGraphError(error.message);
    return result;
  }

  async updateCompetencyGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('competency_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCompetencyGraphError(error.message);
    return result;
  }

  async deleteCompetencyGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('competency_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCompetencyGraphError(error.message);
  }

  async getEmploymentGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('employment_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmploymentGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('employment_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmploymentGraphError(error.message);
    return data ?? [];
  }

  async createEmploymentGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employment_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmploymentGraphError(error.message);
    return result;
  }

  async updateEmploymentGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('employment_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmploymentGraphError(error.message);
    return result;
  }

  async deleteEmploymentGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employment_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmploymentGraphError(error.message);
  }

  async getAlumniGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('alumni_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAlumniGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('alumni_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAlumniGraphError(error.message);
    return data ?? [];
  }

  async createAlumniGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('alumni_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAlumniGraphError(error.message);
    return result;
  }

  async updateAlumniGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('alumni_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAlumniGraphError(error.message);
    return result;
  }

  async deleteAlumniGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('alumni_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAlumniGraphError(error.message);
  }

  async getResearchGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('research_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listResearchGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('research_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudResearchGraphError(error.message);
    return data ?? [];
  }

  async createResearchGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('research_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudResearchGraphError(error.message);
    return result;
  }

  async updateResearchGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('research_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudResearchGraphError(error.message);
    return result;
  }

  async deleteResearchGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('research_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudResearchGraphError(error.message);
  }

  async getLearningGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('learning_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLearningGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('learning_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLearningGraphError(error.message);
    return data ?? [];
  }

  async createLearningGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('learning_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLearningGraphError(error.message);
    return result;
  }

  async updateLearningGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('learning_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLearningGraphError(error.message);
    return result;
  }

  async deleteLearningGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('learning_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLearningGraphError(error.message);
  }

  async getAIGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('aigraphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAIGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('aigraphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAIGraphError(error.message);
    return data ?? [];
  }

  async createAIGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('aigraphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAIGraphError(error.message);
    return result;
  }

  async updateAIGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('aigraphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAIGraphError(error.message);
    return result;
  }

  async deleteAIGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('aigraphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAIGraphError(error.message);
  }

  async getConceptGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('concept_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listConceptGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('concept_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudConceptGraphError(error.message);
    return data ?? [];
  }

  async createConceptGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('concept_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudConceptGraphError(error.message);
    return result;
  }

  async updateConceptGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('concept_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudConceptGraphError(error.message);
    return result;
  }

  async deleteConceptGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('concept_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudConceptGraphError(error.message);
  }

  async getTopicGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('topic_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTopicGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('topic_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTopicGraphError(error.message);
    return data ?? [];
  }

  async createTopicGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('topic_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTopicGraphError(error.message);
    return result;
  }

  async updateTopicGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('topic_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTopicGraphError(error.message);
    return result;
  }

  async deleteTopicGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('topic_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTopicGraphError(error.message);
  }

  async getResourceGraph(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('resource_graphs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listResourceGraph(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('resource_graphs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudResourceGraphError(error.message);
    return data ?? [];
  }

  async createResourceGraph(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('resource_graphs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudResourceGraphError(error.message);
    return result;
  }

  async updateResourceGraph(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('resource_graphs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudResourceGraphError(error.message);
    return result;
  }

  async deleteResourceGraph(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('resource_graphs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudResourceGraphError(error.message);
  }

  async getGraphTraversalConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('graph_traversals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGraphTraversalConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('graph_traversals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGraphTraversalError(error.message);
    return data ?? [];
  }

  async createGraphTraversalConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('graph_traversals')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGraphTraversalError(error.message);
    return result;
  }

  async updateGraphTraversalConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('graph_traversals')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGraphTraversalError(error.message);
    return result;
  }

  async deleteGraphTraversalConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('graph_traversals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGraphTraversalError(error.message);
  }

}

export function createGovernmentModuleRepository(supabase: SupabaseClient): GovernmentModuleRepository {
  return new GovernmentModuleRepositoryImpl(supabase);
}


import type {
  IntelligenceEngine, IntelligenceEngineCreate, IntelligenceEngineUpdate,
  DataSource, DataSourceCreate, DataSourceUpdate,
  IntelligencePipeline, IntelligencePipelineCreate, IntelligencePipelineUpdate,
  AIModel, AIModelCreate, AIModelUpdate,
  IntelligenceScore, IntelligenceScoreCreate, IntelligenceScoreUpdate,
  AIAlert, AIAlertCreate, AIAlertUpdate,
  Recommendation, RecommendationCreate, RecommendationUpdate,
  IntelligenceDashboard, IntelligenceDashboardCreate, IntelligenceDashboardUpdate,
  IntelligenceWidget, IntelligenceWidgetCreate, IntelligenceWidgetUpdate,
  IntelligenceKPI, IntelligenceKPICreate, IntelligenceKPIUpdate,
  IntelligenceInsight, IntelligenceInsightCreate, IntelligenceInsightUpdate,
  IntelligenceAction, IntelligenceActionCreate, IntelligenceActionUpdate,
  PredictiveModel, PredictiveModelCreate, PredictiveModelUpdate,
  StudentRiskAssessment, StudentRiskAssessmentCreate, StudentRiskAssessmentUpdate,
  EarlyWarning, EarlyWarningCreate, EarlyWarningUpdate,
  StudentOutlook, StudentOutlookCreate, StudentOutlookUpdate,
  Scenario, ScenarioCreate, ScenarioUpdate,
  KnowledgeBaseArticle, KnowledgeBaseArticleCreate, KnowledgeBaseArticleUpdate,
  NLPTask, NLPTaskCreate, NLPTaskUpdate,
  SentimentAnalysis, SentimentAnalysisCreate, SentimentAnalysisUpdate,
  AutoClassification, AutoClassificationCreate, AutoClassificationUpdate,
  TextSummarization, TextSummarizationCreate, TextSummarizationUpdate,
  DocumentAnalysis, DocumentAnalysisCreate, DocumentAnalysisUpdate,
  Benchmark, BenchmarkCreate, BenchmarkUpdate,
  AIInsight, AIInsightCreate, AIInsightUpdate,
  AnalyticsReport, AnalyticsReportCreate, AnalyticsReportUpdate,
  Visualization, VisualizationCreate, VisualizationUpdate,
  IntelligenceConnector, IntelligenceConnectorCreate, IntelligenceConnectorUpdate,
  IntelligenceDataSync, IntelligenceDataSyncCreate, IntelligenceDataSyncUpdate,
  IntelligenceAPI, IntelligenceAPICreate, IntelligenceAPIUpdate,
  IntelligenceSecurity, IntelligenceSecurityCreate, IntelligenceSecurityUpdate,
  IntelligenceMonitoring, IntelligenceMonitoringCreate, IntelligenceMonitoringUpdate,
} from '@educi/types';

export interface IntelligenceRepository {
  // Engine
  createEngine(data: IntelligenceEngineCreate): Promise<IntelligenceEngine>;
  getEngine(id: string, schoolId: string): Promise<IntelligenceEngine | null>;
  updateEngine(id: string, schoolId: string, data: IntelligenceEngineUpdate): Promise<IntelligenceEngine>;
  deleteEngine(id: string, schoolId: string): Promise<void>;
  listEngines(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceEngine[]>;

  // Data Sources
  createDataSource(data: DataSourceCreate): Promise<DataSource>;
  getDataSource(id: string, schoolId: string): Promise<DataSource | null>;
  updateDataSource(id: string, schoolId: string, data: DataSourceUpdate): Promise<DataSource>;
  deleteDataSource(id: string, schoolId: string): Promise<void>;
  listDataSources(schoolId: string, engineId?: string): Promise<DataSource[]>;

  // Pipelines
  createPipeline(data: IntelligencePipelineCreate): Promise<IntelligencePipeline>;
  getPipeline(id: string, schoolId: string): Promise<IntelligencePipeline | null>;
  updatePipeline(id: string, schoolId: string, data: IntelligencePipelineUpdate): Promise<IntelligencePipeline>;
  deletePipeline(id: string, schoolId: string): Promise<void>;
  listPipelines(schoolId: string, engineId?: string): Promise<IntelligencePipeline[]>;

  // Models
  createModel(data: AIModelCreate): Promise<AIModel>;
  getModel(id: string, schoolId: string): Promise<AIModel | null>;
  updateModel(id: string, schoolId: string, data: AIModelUpdate): Promise<AIModel>;
  deleteModel(id: string, schoolId: string): Promise<void>;
  listModels(schoolId: string, engineId?: string): Promise<AIModel[]>;

  // Scores
  createScore(data: IntelligenceScoreCreate): Promise<IntelligenceScore>;
  getScore(id: string, schoolId: string): Promise<IntelligenceScore | null>;
  updateScore(id: string, schoolId: string, data: IntelligenceScoreUpdate): Promise<IntelligenceScore>;
  deleteScore(id: string, schoolId: string): Promise<void>;
  listScores(schoolId: string, engineId?: string, type?: string): Promise<IntelligenceScore[]>;

  // Alerts
  createAlert(data: AIAlertCreate): Promise<AIAlert>;
  getAlert(id: string, schoolId: string): Promise<AIAlert | null>;
  updateAlert(id: string, schoolId: string, data: AIAlertUpdate): Promise<AIAlert>;
  deleteAlert(id: string, schoolId: string): Promise<void>;
  listAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<AIAlert[]>;

  // Recommendations
  createRecommendation(data: RecommendationCreate): Promise<Recommendation>;
  getRecommendation(id: string, schoolId: string): Promise<Recommendation | null>;
  updateRecommendation(id: string, schoolId: string, data: RecommendationUpdate): Promise<Recommendation>;
  deleteRecommendation(id: string, schoolId: string): Promise<void>;
  listRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<Recommendation[]>;

  // Dashboards
  createDashboard(data: IntelligenceDashboardCreate): Promise<IntelligenceDashboard>;
  getDashboard(id: string, schoolId: string): Promise<IntelligenceDashboard | null>;
  updateDashboard(id: string, schoolId: string, data: IntelligenceDashboardUpdate): Promise<IntelligenceDashboard>;
  deleteDashboard(id: string, schoolId: string): Promise<void>;
  listDashboards(schoolId: string, userId?: string): Promise<IntelligenceDashboard[]>;

  // Widgets
  createWidget(data: IntelligenceWidgetCreate): Promise<IntelligenceWidget>;
  getWidget(id: string, schoolId: string): Promise<IntelligenceWidget | null>;
  updateWidget(id: string, schoolId: string, data: IntelligenceWidgetUpdate): Promise<IntelligenceWidget>;
  deleteWidget(id: string, schoolId: string): Promise<void>;
  listWidgets(schoolId: string, dashboardId?: string): Promise<IntelligenceWidget[]>;

  // KPIs
  createKPI(data: IntelligenceKPICreate): Promise<IntelligenceKPI>;
  getKPI(id: string, schoolId: string): Promise<IntelligenceKPI | null>;
  updateKPI(id: string, schoolId: string, data: IntelligenceKPIUpdate): Promise<IntelligenceKPI>;
  deleteKPI(id: string, schoolId: string): Promise<void>;
  listKPIs(schoolId: string, dashboardId?: string): Promise<IntelligenceKPI[]>;

  // Insights
  createInsight(data: IntelligenceInsightCreate): Promise<IntelligenceInsight>;
  getInsight(id: string, schoolId: string): Promise<IntelligenceInsight | null>;
  updateInsight(id: string, schoolId: string, data: IntelligenceInsightUpdate): Promise<IntelligenceInsight>;
  deleteInsight(id: string, schoolId: string): Promise<void>;
  listInsights(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceInsight[]>;

  // Actions
  createAction(data: IntelligenceActionCreate): Promise<IntelligenceAction>;
  getAction(id: string, schoolId: string): Promise<IntelligenceAction | null>;
  updateAction(id: string, schoolId: string, data: IntelligenceActionUpdate): Promise<IntelligenceAction>;
  deleteAction(id: string, schoolId: string): Promise<void>;
  listActions(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceAction[]>;

  // Predictive Models
  createPredictiveModel(data: PredictiveModelCreate): Promise<PredictiveModel>;
  getPredictiveModel(id: string, schoolId: string): Promise<PredictiveModel | null>;
  updatePredictiveModel(id: string, schoolId: string, data: PredictiveModelUpdate): Promise<PredictiveModel>;
  deletePredictiveModel(id: string, schoolId: string): Promise<void>;
  listPredictiveModels(schoolId: string, type?: string): Promise<PredictiveModel[]>;

  // Student Risk
  createStudentRiskAssessment(data: StudentRiskAssessmentCreate): Promise<StudentRiskAssessment>;
  getStudentRiskAssessment(id: string, schoolId: string): Promise<StudentRiskAssessment | null>;
  updateStudentRiskAssessment(id: string, schoolId: string, data: StudentRiskAssessmentUpdate): Promise<StudentRiskAssessment>;
  deleteStudentRiskAssessment(id: string, schoolId: string): Promise<void>;
  listStudentRiskAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<StudentRiskAssessment[]>;

  // Early Warnings
  createEarlyWarning(data: EarlyWarningCreate): Promise<EarlyWarning>;
  getEarlyWarning(id: string, schoolId: string): Promise<EarlyWarning | null>;
  updateEarlyWarning(id: string, schoolId: string, data: EarlyWarningUpdate): Promise<EarlyWarning>;
  deleteEarlyWarning(id: string, schoolId: string): Promise<void>;
  listEarlyWarnings(schoolId: string, filters?: Record<string, unknown>): Promise<EarlyWarning[]>;

  // Outlooks
  createStudentOutlook(data: StudentOutlookCreate): Promise<StudentOutlook>;
  getStudentOutlook(id: string, schoolId: string): Promise<StudentOutlook | null>;
  updateStudentOutlook(id: string, schoolId: string, data: StudentOutlookUpdate): Promise<StudentOutlook>;
  deleteStudentOutlook(id: string, schoolId: string): Promise<void>;
  listStudentOutlooks(schoolId: string, studentId?: string): Promise<StudentOutlook[]>;

  // Scenarios
  createScenario(data: ScenarioCreate): Promise<Scenario>;
  getScenario(id: string, schoolId: string): Promise<Scenario | null>;
  updateScenario(id: string, schoolId: string, data: ScenarioUpdate): Promise<Scenario>;
  deleteScenario(id: string, schoolId: string): Promise<void>;
  listScenarios(schoolId: string, modelId?: string): Promise<Scenario[]>;

  // Knowledge Base
  createKnowledgeBaseArticle(data: KnowledgeBaseArticleCreate): Promise<KnowledgeBaseArticle>;
  getKnowledgeBaseArticle(id: string, schoolId: string): Promise<KnowledgeBaseArticle | null>;
  updateKnowledgeBaseArticle(id: string, schoolId: string, data: KnowledgeBaseArticleUpdate): Promise<KnowledgeBaseArticle>;
  deleteKnowledgeBaseArticle(id: string, schoolId: string): Promise<void>;
  listKnowledgeBaseArticles(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeBaseArticle[]>;

  // NLP Tasks
  createNLPTask(data: NLPTaskCreate): Promise<NLPTask>;
  getNLPTask(id: string, schoolId: string): Promise<NLPTask | null>;
  updateNLPTask(id: string, schoolId: string, data: NLPTaskUpdate): Promise<NLPTask>;
  deleteNLPTask(id: string, schoolId: string): Promise<void>;
  listNLPTasks(schoolId: string, filters?: Record<string, unknown>): Promise<NLPTask[]>;

  // Sentiment Analysis
  createSentimentAnalysis(data: SentimentAnalysisCreate): Promise<SentimentAnalysis>;
  getSentimentAnalysis(id: string, schoolId: string): Promise<SentimentAnalysis | null>;
  updateSentimentAnalysis(id: string, schoolId: string, data: SentimentAnalysisUpdate): Promise<SentimentAnalysis>;
  deleteSentimentAnalysis(id: string, schoolId: string): Promise<void>;
  listSentimentAnalyses(schoolId: string, filters?: Record<string, unknown>): Promise<SentimentAnalysis[]>;

  // Auto Classification
  createAutoClassification(data: AutoClassificationCreate): Promise<AutoClassification>;
  getAutoClassification(id: string, schoolId: string): Promise<AutoClassification | null>;
  updateAutoClassification(id: string, schoolId: string, data: AutoClassificationUpdate): Promise<AutoClassification>;
  deleteAutoClassification(id: string, schoolId: string): Promise<void>;
  listAutoClassifications(schoolId: string, filters?: Record<string, unknown>): Promise<AutoClassification[]>;

  // Text Summarization
  createTextSummarization(data: TextSummarizationCreate): Promise<TextSummarization>;
  getTextSummarization(id: string, schoolId: string): Promise<TextSummarization | null>;
  updateTextSummarization(id: string, schoolId: string, data: TextSummarizationUpdate): Promise<TextSummarization>;
  deleteTextSummarization(id: string, schoolId: string): Promise<void>;
  listTextSummarizations(schoolId: string, filters?: Record<string, unknown>): Promise<TextSummarization[]>;

  // Document Analysis
  createDocumentAnalysis(data: DocumentAnalysisCreate): Promise<DocumentAnalysis>;
  getDocumentAnalysis(id: string, schoolId: string): Promise<DocumentAnalysis | null>;
  updateDocumentAnalysis(id: string, schoolId: string, data: DocumentAnalysisUpdate): Promise<DocumentAnalysis>;
  deleteDocumentAnalysis(id: string, schoolId: string): Promise<void>;
  listDocumentAnalyses(schoolId: string, filters?: Record<string, unknown>): Promise<DocumentAnalysis[]>;

  // Benchmarks
  createBenchmark(data: BenchmarkCreate): Promise<Benchmark>;
  getBenchmark(id: string, schoolId: string): Promise<Benchmark | null>;
  updateBenchmark(id: string, schoolId: string, data: BenchmarkUpdate): Promise<Benchmark>;
  deleteBenchmark(id: string, schoolId: string): Promise<void>;
  listBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<Benchmark[]>;

  // AI Insights (Knowledge)
  createAIInsight(data: AIInsightCreate): Promise<AIInsight>;
  getAIInsight(id: string, schoolId: string): Promise<AIInsight | null>;
  updateAIInsight(id: string, schoolId: string, data: AIInsightUpdate): Promise<AIInsight>;
  deleteAIInsight(id: string, schoolId: string): Promise<void>;
  listAIInsights(schoolId: string, filters?: Record<string, unknown>): Promise<AIInsight[]>;

  // Analytics Reports
  createAnalyticsReport(data: AnalyticsReportCreate): Promise<AnalyticsReport>;
  getAnalyticsReport(id: string, schoolId: string): Promise<AnalyticsReport | null>;
  updateAnalyticsReport(id: string, schoolId: string, data: AnalyticsReportUpdate): Promise<AnalyticsReport>;
  deleteAnalyticsReport(id: string, schoolId: string): Promise<void>;
  listAnalyticsReports(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsReport[]>;

  // Visualizations
  createVisualization(data: VisualizationCreate): Promise<Visualization>;
  getVisualization(id: string, schoolId: string): Promise<Visualization | null>;
  updateVisualization(id: string, schoolId: string, data: VisualizationUpdate): Promise<Visualization>;
  deleteVisualization(id: string, schoolId: string): Promise<void>;
  listVisualizations(schoolId: string, filters?: Record<string, unknown>): Promise<Visualization[]>;

  // Connectors
  createConnector(data: IntelligenceConnectorCreate): Promise<IntelligenceConnector>;
  getConnector(id: string, schoolId: string): Promise<IntelligenceConnector | null>;
  updateConnector(id: string, schoolId: string, data: IntelligenceConnectorUpdate): Promise<IntelligenceConnector>;
  deleteConnector(id: string, schoolId: string): Promise<void>;
  listConnectors(schoolId: string, type?: string): Promise<IntelligenceConnector[]>;

  // Data Sync
  createDataSync(data: IntelligenceDataSyncCreate): Promise<IntelligenceDataSync>;
  getDataSync(id: string, schoolId: string): Promise<IntelligenceDataSync | null>;
  updateDataSync(id: string, schoolId: string, data: IntelligenceDataSyncUpdate): Promise<IntelligenceDataSync>;
  deleteDataSync(id: string, schoolId: string): Promise<void>;
  listDataSyncs(schoolId: string, connectorId?: string): Promise<IntelligenceDataSync[]>;

  // API
  createAPI(data: IntelligenceAPICreate): Promise<IntelligenceAPI>;
  getAPI(id: string, schoolId: string): Promise<IntelligenceAPI | null>;
  updateAPI(id: string, schoolId: string, data: IntelligenceAPIUpdate): Promise<IntelligenceAPI>;
  deleteAPI(id: string, schoolId: string): Promise<void>;
  listAPIs(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceAPI[]>;

  // Security
  createSecurity(data: IntelligenceSecurityCreate): Promise<IntelligenceSecurity>;
  getSecurity(id: string, schoolId: string): Promise<IntelligenceSecurity | null>;
  updateSecurity(id: string, schoolId: string, data: IntelligenceSecurityUpdate): Promise<IntelligenceSecurity>;
  deleteSecurity(id: string, schoolId: string): Promise<void>;
  listSecurities(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceSecurity[]>;

  // Monitoring
  createMonitoring(data: IntelligenceMonitoringCreate): Promise<IntelligenceMonitoring>;
  getMonitoring(id: string, schoolId: string): Promise<IntelligenceMonitoring | null>;
  updateMonitoring(id: string, schoolId: string, data: IntelligenceMonitoringUpdate): Promise<IntelligenceMonitoring>;
  deleteMonitoring(id: string, schoolId: string): Promise<void>;
  listMonitorings(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceMonitoring[]>;
}

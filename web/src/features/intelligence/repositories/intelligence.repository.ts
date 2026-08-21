import { SupabaseClient } from '@supabase/supabase-js';
import { AppError } from '@educi/errors';
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

const now = () => new Date().toISOString();

export interface IntelligenceRepository {
  createEngine(schoolId: string, data: IntelligenceEngineCreate): Promise<IntelligenceEngine>;
  getEngine(schoolId: string, id: string): Promise<IntelligenceEngine | null>;
  updateEngine(schoolId: string, id: string, data: IntelligenceEngineUpdate): Promise<IntelligenceEngine>;
  deleteEngine(schoolId: string, id: string): Promise<void>;
  listEngines(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceEngine[]>;
  createDataSource(schoolId: string, data: DataSourceCreate): Promise<DataSource>;
  getDataSource(schoolId: string, id: string): Promise<DataSource | null>;
  updateDataSource(schoolId: string, id: string, data: DataSourceUpdate): Promise<DataSource>;
  deleteDataSource(schoolId: string, id: string): Promise<void>;
  listDataSources(schoolId: string, filters?: Record<string, unknown>): Promise<DataSource[]>;
  createPipeline(schoolId: string, data: IntelligencePipelineCreate): Promise<IntelligencePipeline>;
  getPipeline(schoolId: string, id: string): Promise<IntelligencePipeline | null>;
  updatePipeline(schoolId: string, id: string, data: IntelligencePipelineUpdate): Promise<IntelligencePipeline>;
  deletePipeline(schoolId: string, id: string): Promise<void>;
  listPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligencePipeline[]>;
  createModel(schoolId: string, data: AIModelCreate): Promise<AIModel>;
  getModel(schoolId: string, id: string): Promise<AIModel | null>;
  updateModel(schoolId: string, id: string, data: AIModelUpdate): Promise<AIModel>;
  deleteModel(schoolId: string, id: string): Promise<void>;
  listModels(schoolId: string, filters?: Record<string, unknown>): Promise<AIModel[]>;
  createScore(schoolId: string, data: IntelligenceScoreCreate): Promise<IntelligenceScore>;
  getScore(schoolId: string, id: string): Promise<IntelligenceScore | null>;
  updateScore(schoolId: string, id: string, data: IntelligenceScoreUpdate): Promise<IntelligenceScore>;
  deleteScore(schoolId: string, id: string): Promise<void>;
  listScores(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceScore[]>;
  createAlert(schoolId: string, data: AIAlertCreate): Promise<AIAlert>;
  getAlert(schoolId: string, id: string): Promise<AIAlert | null>;
  updateAlert(schoolId: string, id: string, data: AIAlertUpdate): Promise<AIAlert>;
  deleteAlert(schoolId: string, id: string): Promise<void>;
  listAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<AIAlert[]>;
  createRecommendation(schoolId: string, data: RecommendationCreate): Promise<Recommendation>;
  getRecommendation(schoolId: string, id: string): Promise<Recommendation | null>;
  updateRecommendation(schoolId: string, id: string, data: RecommendationUpdate): Promise<Recommendation>;
  deleteRecommendation(schoolId: string, id: string): Promise<void>;
  listRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<Recommendation[]>;
  createDashboard(schoolId: string, data: IntelligenceDashboardCreate): Promise<IntelligenceDashboard>;
  getDashboard(schoolId: string, id: string): Promise<IntelligenceDashboard | null>;
  updateDashboard(schoolId: string, id: string, data: IntelligenceDashboardUpdate): Promise<IntelligenceDashboard>;
  deleteDashboard(schoolId: string, id: string): Promise<void>;
  listDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceDashboard[]>;
  createWidget(schoolId: string, data: IntelligenceWidgetCreate): Promise<IntelligenceWidget>;
  getWidget(schoolId: string, id: string): Promise<IntelligenceWidget | null>;
  updateWidget(schoolId: string, id: string, data: IntelligenceWidgetUpdate): Promise<IntelligenceWidget>;
  deleteWidget(schoolId: string, id: string): Promise<void>;
  listWidgets(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceWidget[]>;
  createKPI(schoolId: string, data: IntelligenceKPICreate): Promise<IntelligenceKPI>;
  getKPI(schoolId: string, id: string): Promise<IntelligenceKPI | null>;
  updateKPI(schoolId: string, id: string, data: IntelligenceKPIUpdate): Promise<IntelligenceKPI>;
  deleteKPI(schoolId: string, id: string): Promise<void>;
  listKPIs(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceKPI[]>;
  createInsight(schoolId: string, data: IntelligenceInsightCreate): Promise<IntelligenceInsight>;
  getInsight(schoolId: string, id: string): Promise<IntelligenceInsight | null>;
  updateInsight(schoolId: string, id: string, data: IntelligenceInsightUpdate): Promise<IntelligenceInsight>;
  deleteInsight(schoolId: string, id: string): Promise<void>;
  listInsights(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceInsight[]>;
  createAction(schoolId: string, data: IntelligenceActionCreate): Promise<IntelligenceAction>;
  getAction(schoolId: string, id: string): Promise<IntelligenceAction | null>;
  updateAction(schoolId: string, id: string, data: IntelligenceActionUpdate): Promise<IntelligenceAction>;
  deleteAction(schoolId: string, id: string): Promise<void>;
  listActions(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceAction[]>;
  createPredictiveModel(schoolId: string, data: PredictiveModelCreate): Promise<PredictiveModel>;
  getPredictiveModel(schoolId: string, id: string): Promise<PredictiveModel | null>;
  updatePredictiveModel(schoolId: string, id: string, data: PredictiveModelUpdate): Promise<PredictiveModel>;
  deletePredictiveModel(schoolId: string, id: string): Promise<void>;
  listPredictiveModels(schoolId: string, filters?: Record<string, unknown>): Promise<PredictiveModel[]>;
  createStudentRiskAssessment(schoolId: string, data: StudentRiskAssessmentCreate): Promise<StudentRiskAssessment>;
  getStudentRiskAssessment(schoolId: string, id: string): Promise<StudentRiskAssessment | null>;
  updateStudentRiskAssessment(schoolId: string, id: string, data: StudentRiskAssessmentUpdate): Promise<StudentRiskAssessment>;
  deleteStudentRiskAssessment(schoolId: string, id: string): Promise<void>;
  listStudentRiskAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<StudentRiskAssessment[]>;
  createEarlyWarning(schoolId: string, data: EarlyWarningCreate): Promise<EarlyWarning>;
  getEarlyWarning(schoolId: string, id: string): Promise<EarlyWarning | null>;
  updateEarlyWarning(schoolId: string, id: string, data: EarlyWarningUpdate): Promise<EarlyWarning>;
  deleteEarlyWarning(schoolId: string, id: string): Promise<void>;
  listEarlyWarnings(schoolId: string, filters?: Record<string, unknown>): Promise<EarlyWarning[]>;
  createStudentOutlook(schoolId: string, data: StudentOutlookCreate): Promise<StudentOutlook>;
  getStudentOutlook(schoolId: string, id: string): Promise<StudentOutlook | null>;
  updateStudentOutlook(schoolId: string, id: string, data: StudentOutlookUpdate): Promise<StudentOutlook>;
  deleteStudentOutlook(schoolId: string, id: string): Promise<void>;
  listStudentOutlooks(schoolId: string, filters?: Record<string, unknown>): Promise<StudentOutlook[]>;
  createScenario(schoolId: string, data: ScenarioCreate): Promise<Scenario>;
  getScenario(schoolId: string, id: string): Promise<Scenario | null>;
  updateScenario(schoolId: string, id: string, data: ScenarioUpdate): Promise<Scenario>;
  deleteScenario(schoolId: string, id: string): Promise<void>;
  listScenarios(schoolId: string, filters?: Record<string, unknown>): Promise<Scenario[]>;
  createKnowledgeBaseArticle(schoolId: string, data: KnowledgeBaseArticleCreate): Promise<KnowledgeBaseArticle>;
  getKnowledgeBaseArticle(schoolId: string, id: string): Promise<KnowledgeBaseArticle | null>;
  updateKnowledgeBaseArticle(schoolId: string, id: string, data: KnowledgeBaseArticleUpdate): Promise<KnowledgeBaseArticle>;
  deleteKnowledgeBaseArticle(schoolId: string, id: string): Promise<void>;
  listKnowledgeBaseArticles(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeBaseArticle[]>;
  createNLPTask(schoolId: string, data: NLPTaskCreate): Promise<NLPTask>;
  getNLPTask(schoolId: string, id: string): Promise<NLPTask | null>;
  updateNLPTask(schoolId: string, id: string, data: NLPTaskUpdate): Promise<NLPTask>;
  deleteNLPTask(schoolId: string, id: string): Promise<void>;
  listNLPTasks(schoolId: string, filters?: Record<string, unknown>): Promise<NLPTask[]>;
  createSentimentAnalysis(schoolId: string, data: SentimentAnalysisCreate): Promise<SentimentAnalysis>;
  getSentimentAnalysis(schoolId: string, id: string): Promise<SentimentAnalysis | null>;
  updateSentimentAnalysis(schoolId: string, id: string, data: SentimentAnalysisUpdate): Promise<SentimentAnalysis>;
  deleteSentimentAnalysis(schoolId: string, id: string): Promise<void>;
  listSentimentAnalyses(schoolId: string, filters?: Record<string, unknown>): Promise<SentimentAnalysis[]>;
  createAutoClassification(schoolId: string, data: AutoClassificationCreate): Promise<AutoClassification>;
  getAutoClassification(schoolId: string, id: string): Promise<AutoClassification | null>;
  updateAutoClassification(schoolId: string, id: string, data: AutoClassificationUpdate): Promise<AutoClassification>;
  deleteAutoClassification(schoolId: string, id: string): Promise<void>;
  listAutoClassifications(schoolId: string, filters?: Record<string, unknown>): Promise<AutoClassification[]>;
  createTextSummarization(schoolId: string, data: TextSummarizationCreate): Promise<TextSummarization>;
  getTextSummarization(schoolId: string, id: string): Promise<TextSummarization | null>;
  updateTextSummarization(schoolId: string, id: string, data: TextSummarizationUpdate): Promise<TextSummarization>;
  deleteTextSummarization(schoolId: string, id: string): Promise<void>;
  listTextSummarizations(schoolId: string, filters?: Record<string, unknown>): Promise<TextSummarization[]>;
  createDocumentAnalysis(schoolId: string, data: DocumentAnalysisCreate): Promise<DocumentAnalysis>;
  getDocumentAnalysis(schoolId: string, id: string): Promise<DocumentAnalysis | null>;
  updateDocumentAnalysis(schoolId: string, id: string, data: DocumentAnalysisUpdate): Promise<DocumentAnalysis>;
  deleteDocumentAnalysis(schoolId: string, id: string): Promise<void>;
  listDocumentAnalyses(schoolId: string, filters?: Record<string, unknown>): Promise<DocumentAnalysis[]>;
  createBenchmark(schoolId: string, data: BenchmarkCreate): Promise<Benchmark>;
  getBenchmark(schoolId: string, id: string): Promise<Benchmark | null>;
  updateBenchmark(schoolId: string, id: string, data: BenchmarkUpdate): Promise<Benchmark>;
  deleteBenchmark(schoolId: string, id: string): Promise<void>;
  listBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<Benchmark[]>;
  createAIInsight(schoolId: string, data: AIInsightCreate): Promise<AIInsight>;
  getAIInsight(schoolId: string, id: string): Promise<AIInsight | null>;
  updateAIInsight(schoolId: string, id: string, data: AIInsightUpdate): Promise<AIInsight>;
  deleteAIInsight(schoolId: string, id: string): Promise<void>;
  listAIInsights(schoolId: string, filters?: Record<string, unknown>): Promise<AIInsight[]>;
  createAnalyticsReport(schoolId: string, data: AnalyticsReportCreate): Promise<AnalyticsReport>;
  getAnalyticsReport(schoolId: string, id: string): Promise<AnalyticsReport | null>;
  updateAnalyticsReport(schoolId: string, id: string, data: AnalyticsReportUpdate): Promise<AnalyticsReport>;
  deleteAnalyticsReport(schoolId: string, id: string): Promise<void>;
  listAnalyticsReports(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsReport[]>;
  createVisualization(schoolId: string, data: VisualizationCreate): Promise<Visualization>;
  getVisualization(schoolId: string, id: string): Promise<Visualization | null>;
  updateVisualization(schoolId: string, id: string, data: VisualizationUpdate): Promise<Visualization>;
  deleteVisualization(schoolId: string, id: string): Promise<void>;
  listVisualizations(schoolId: string, filters?: Record<string, unknown>): Promise<Visualization[]>;
  createConnector(schoolId: string, data: IntelligenceConnectorCreate): Promise<IntelligenceConnector>;
  getConnector(schoolId: string, id: string): Promise<IntelligenceConnector | null>;
  updateConnector(schoolId: string, id: string, data: IntelligenceConnectorUpdate): Promise<IntelligenceConnector>;
  deleteConnector(schoolId: string, id: string): Promise<void>;
  listConnectors(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceConnector[]>;
  createDataSync(schoolId: string, data: IntelligenceDataSyncCreate): Promise<IntelligenceDataSync>;
  getDataSync(schoolId: string, id: string): Promise<IntelligenceDataSync | null>;
  updateDataSync(schoolId: string, id: string, data: IntelligenceDataSyncUpdate): Promise<IntelligenceDataSync>;
  deleteDataSync(schoolId: string, id: string): Promise<void>;
  listDataSyncs(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceDataSync[]>;
  createAPI(schoolId: string, data: IntelligenceAPICreate): Promise<IntelligenceAPI>;
  getAPI(schoolId: string, id: string): Promise<IntelligenceAPI | null>;
  updateAPI(schoolId: string, id: string, data: IntelligenceAPIUpdate): Promise<IntelligenceAPI>;
  deleteAPI(schoolId: string, id: string): Promise<void>;
  listAPIs(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceAPI[]>;
  createSecurity(schoolId: string, data: IntelligenceSecurityCreate): Promise<IntelligenceSecurity>;
  getSecurity(schoolId: string, id: string): Promise<IntelligenceSecurity | null>;
  updateSecurity(schoolId: string, id: string, data: IntelligenceSecurityUpdate): Promise<IntelligenceSecurity>;
  deleteSecurity(schoolId: string, id: string): Promise<void>;
  listSecurity(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceSecurity[]>;
  createMonitoring(schoolId: string, data: IntelligenceMonitoringCreate): Promise<IntelligenceMonitoring>;
  getMonitoring(schoolId: string, id: string): Promise<IntelligenceMonitoring | null>;
  updateMonitoring(schoolId: string, id: string, data: IntelligenceMonitoringUpdate): Promise<IntelligenceMonitoring>;
  deleteMonitoring(schoolId: string, id: string): Promise<void>;
  listMonitoring(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceMonitoring[]>;
}

export class IntelligenceRepositoryImpl implements IntelligenceRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new AppError(`Intelligence entity not found: ${id}`, 'INT_ENTITY_NOT_FOUND', 404);
  }

  // --- IntelligenceEngine ---------------------------------------------------
  async createEngine(schoolId: string, data: IntelligenceEngineCreate): Promise<IntelligenceEngine> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_engines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_ENGINE_CREATE_FAILED', 500);
    return result;
  }

  async getEngine(schoolId: string, id: string): Promise<IntelligenceEngine | null> {
    const { data, error } = await this.supabase
      .from('intelligence_engines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateEngine(schoolId: string, id: string, data: IntelligenceEngineUpdate): Promise<IntelligenceEngine> {
    const { data: result, error } = await this.supabase
      .from('intelligence_engines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_ENGINE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteEngine(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_engines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_ENGINE_DELETE_FAILED', 500);
  }

  async listEngines(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceEngine[]> {
    let query = this.supabase.from('intelligence_engines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_ENGINE_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- DataSource -----------------------------------------------------------
  async createDataSource(schoolId: string, data: DataSourceCreate): Promise<DataSource> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_data_sources')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_DATA_SOURCE_CREATE_FAILED', 500);
    return result;
  }

  async getDataSource(schoolId: string, id: string): Promise<DataSource | null> {
    const { data, error } = await this.supabase
      .from('intelligence_data_sources')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataSource(schoolId: string, id: string, data: DataSourceUpdate): Promise<DataSource> {
    const { data: result, error } = await this.supabase
      .from('intelligence_data_sources')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_DATA_SOURCE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDataSource(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_data_sources')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_DATA_SOURCE_DELETE_FAILED', 500);
  }

  async listDataSources(schoolId: string, filters?: Record<string, unknown>): Promise<DataSource[]> {
    let query = this.supabase.from('intelligence_data_sources').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_DATA_SOURCE_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligencePipeline -------------------------------------------------
  async createPipeline(schoolId: string, data: IntelligencePipelineCreate): Promise<IntelligencePipeline> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_pipelines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_PIPELINE_CREATE_FAILED', 500);
    return result;
  }

  async getPipeline(schoolId: string, id: string): Promise<IntelligencePipeline | null> {
    const { data, error } = await this.supabase
      .from('intelligence_pipelines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePipeline(schoolId: string, id: string, data: IntelligencePipelineUpdate): Promise<IntelligencePipeline> {
    const { data: result, error } = await this.supabase
      .from('intelligence_pipelines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_PIPELINE_UPDATE_FAILED', 500);
    return result;
  }

  async deletePipeline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_pipelines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_PIPELINE_DELETE_FAILED', 500);
  }

  async listPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligencePipeline[]> {
    let query = this.supabase.from('intelligence_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_PIPELINE_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- AIModel --------------------------------------------------------------
  async createModel(schoolId: string, data: AIModelCreate): Promise<AIModel> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_models')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_MODEL_CREATE_FAILED', 500);
    return result;
  }

  async getModel(schoolId: string, id: string): Promise<AIModel | null> {
    const { data, error } = await this.supabase
      .from('intelligence_models')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateModel(schoolId: string, id: string, data: AIModelUpdate): Promise<AIModel> {
    const { data: result, error } = await this.supabase
      .from('intelligence_models')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_MODEL_UPDATE_FAILED', 500);
    return result;
  }

  async deleteModel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_models')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_MODEL_DELETE_FAILED', 500);
  }

  async listModels(schoolId: string, filters?: Record<string, unknown>): Promise<AIModel[]> {
    let query = this.supabase.from('intelligence_models').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_MODEL_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligenceScore ----------------------------------------------------
  async createScore(schoolId: string, data: IntelligenceScoreCreate): Promise<IntelligenceScore> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_scores')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_SCORE_CREATE_FAILED', 500);
    return result;
  }

  async getScore(schoolId: string, id: string): Promise<IntelligenceScore | null> {
    const { data, error } = await this.supabase
      .from('intelligence_scores')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateScore(schoolId: string, id: string, data: IntelligenceScoreUpdate): Promise<IntelligenceScore> {
    const { data: result, error } = await this.supabase
      .from('intelligence_scores')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_SCORE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteScore(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_scores')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_SCORE_DELETE_FAILED', 500);
  }

  async listScores(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceScore[]> {
    let query = this.supabase.from('intelligence_scores').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_SCORE_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- AIAlert --------------------------------------------------------------
  async createAlert(schoolId: string, data: AIAlertCreate): Promise<AIAlert> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_ALERT_CREATE_FAILED', 500);
    return result;
  }

  async getAlert(schoolId: string, id: string): Promise<AIAlert | null> {
    const { data, error } = await this.supabase
      .from('intelligence_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAlert(schoolId: string, id: string, data: AIAlertUpdate): Promise<AIAlert> {
    const { data: result, error } = await this.supabase
      .from('intelligence_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_ALERT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_ALERT_DELETE_FAILED', 500);
  }

  async listAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<AIAlert[]> {
    let query = this.supabase.from('intelligence_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_ALERT_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- Recommendation -------------------------------------------------------
  async createRecommendation(schoolId: string, data: RecommendationCreate): Promise<Recommendation> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_recommendations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_RECOMMENDATION_CREATE_FAILED', 500);
    return result;
  }

  async getRecommendation(schoolId: string, id: string): Promise<Recommendation | null> {
    const { data, error } = await this.supabase
      .from('intelligence_recommendations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateRecommendation(schoolId: string, id: string, data: RecommendationUpdate): Promise<Recommendation> {
    const { data: result, error } = await this.supabase
      .from('intelligence_recommendations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_RECOMMENDATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_recommendations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_RECOMMENDATION_DELETE_FAILED', 500);
  }

  async listRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<Recommendation[]> {
    let query = this.supabase.from('intelligence_recommendations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_RECOMMENDATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligenceDashboard ------------------------------------------------
  async createDashboard(schoolId: string, data: IntelligenceDashboardCreate): Promise<IntelligenceDashboard> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_DASHBOARD_CREATE_FAILED', 500);
    return result;
  }

  async getDashboard(schoolId: string, id: string): Promise<IntelligenceDashboard | null> {
    const { data, error } = await this.supabase
      .from('intelligence_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDashboard(schoolId: string, id: string, data: IntelligenceDashboardUpdate): Promise<IntelligenceDashboard> {
    const { data: result, error } = await this.supabase
      .from('intelligence_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_DASHBOARD_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_DASHBOARD_DELETE_FAILED', 500);
  }

  async listDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceDashboard[]> {
    let query = this.supabase.from('intelligence_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_DASHBOARD_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligenceWidget ---------------------------------------------------
  async createWidget(schoolId: string, data: IntelligenceWidgetCreate): Promise<IntelligenceWidget> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_widgets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_WIDGET_CREATE_FAILED', 500);
    return result;
  }

  async getWidget(schoolId: string, id: string): Promise<IntelligenceWidget | null> {
    const { data, error } = await this.supabase
      .from('intelligence_widgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateWidget(schoolId: string, id: string, data: IntelligenceWidgetUpdate): Promise<IntelligenceWidget> {
    const { data: result, error } = await this.supabase
      .from('intelligence_widgets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_WIDGET_UPDATE_FAILED', 500);
    return result;
  }

  async deleteWidget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_widgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_WIDGET_DELETE_FAILED', 500);
  }

  async listWidgets(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceWidget[]> {
    let query = this.supabase.from('intelligence_widgets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_WIDGET_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligenceKPI ------------------------------------------------------
  async createKPI(schoolId: string, data: IntelligenceKPICreate): Promise<IntelligenceKPI> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_kpis')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_KPI_CREATE_FAILED', 500);
    return result;
  }

  async getKPI(schoolId: string, id: string): Promise<IntelligenceKPI | null> {
    const { data, error } = await this.supabase
      .from('intelligence_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateKPI(schoolId: string, id: string, data: IntelligenceKPIUpdate): Promise<IntelligenceKPI> {
    const { data: result, error } = await this.supabase
      .from('intelligence_kpis')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_KPI_UPDATE_FAILED', 500);
    return result;
  }

  async deleteKPI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_KPI_DELETE_FAILED', 500);
  }

  async listKPIs(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceKPI[]> {
    let query = this.supabase.from('intelligence_kpis').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_KPI_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligenceInsight --------------------------------------------------
  async createInsight(schoolId: string, data: IntelligenceInsightCreate): Promise<IntelligenceInsight> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_INSIGHT_CREATE_FAILED', 500);
    return result;
  }

  async getInsight(schoolId: string, id: string): Promise<IntelligenceInsight | null> {
    const { data, error } = await this.supabase
      .from('intelligence_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateInsight(schoolId: string, id: string, data: IntelligenceInsightUpdate): Promise<IntelligenceInsight> {
    const { data: result, error } = await this.supabase
      .from('intelligence_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_INSIGHT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_INSIGHT_DELETE_FAILED', 500);
  }

  async listInsights(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceInsight[]> {
    let query = this.supabase.from('intelligence_insights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_INSIGHT_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligenceAction ---------------------------------------------------
  async createAction(schoolId: string, data: IntelligenceActionCreate): Promise<IntelligenceAction> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_actions')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_ACTION_CREATE_FAILED', 500);
    return result;
  }

  async getAction(schoolId: string, id: string): Promise<IntelligenceAction | null> {
    const { data, error } = await this.supabase
      .from('intelligence_actions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAction(schoolId: string, id: string, data: IntelligenceActionUpdate): Promise<IntelligenceAction> {
    const { data: result, error } = await this.supabase
      .from('intelligence_actions')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_ACTION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_actions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_ACTION_DELETE_FAILED', 500);
  }

  async listActions(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceAction[]> {
    let query = this.supabase.from('intelligence_actions').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_ACTION_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- PredictiveModel ------------------------------------------------------
  async createPredictiveModel(schoolId: string, data: PredictiveModelCreate): Promise<PredictiveModel> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_predictive_models')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_PREDICTIVE_MODEL_CREATE_FAILED', 500);
    return result;
  }

  async getPredictiveModel(schoolId: string, id: string): Promise<PredictiveModel | null> {
    const { data, error } = await this.supabase
      .from('intelligence_predictive_models')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updatePredictiveModel(schoolId: string, id: string, data: PredictiveModelUpdate): Promise<PredictiveModel> {
    const { data: result, error } = await this.supabase
      .from('intelligence_predictive_models')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_PREDICTIVE_MODEL_UPDATE_FAILED', 500);
    return result;
  }

  async deletePredictiveModel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_predictive_models')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_PREDICTIVE_MODEL_DELETE_FAILED', 500);
  }

  async listPredictiveModels(schoolId: string, filters?: Record<string, unknown>): Promise<PredictiveModel[]> {
    let query = this.supabase.from('intelligence_predictive_models').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_PREDICTIVE_MODEL_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- StudentRiskAssessment ------------------------------------------------
  async createStudentRiskAssessment(schoolId: string, data: StudentRiskAssessmentCreate): Promise<StudentRiskAssessment> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_student_risk')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_STUDENT_RISK_CREATE_FAILED', 500);
    return result;
  }

  async getStudentRiskAssessment(schoolId: string, id: string): Promise<StudentRiskAssessment | null> {
    const { data, error } = await this.supabase
      .from('intelligence_student_risk')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateStudentRiskAssessment(schoolId: string, id: string, data: StudentRiskAssessmentUpdate): Promise<StudentRiskAssessment> {
    const { data: result, error } = await this.supabase
      .from('intelligence_student_risk')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_STUDENT_RISK_UPDATE_FAILED', 500);
    return result;
  }

  async deleteStudentRiskAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_student_risk')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_STUDENT_RISK_DELETE_FAILED', 500);
  }

  async listStudentRiskAssessments(schoolId: string, filters?: Record<string, unknown>): Promise<StudentRiskAssessment[]> {
    let query = this.supabase.from('intelligence_student_risk').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_STUDENT_RISK_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- EarlyWarning ---------------------------------------------------------
  async createEarlyWarning(schoolId: string, data: EarlyWarningCreate): Promise<EarlyWarning> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_early_warnings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_EARLY_WARNING_CREATE_FAILED', 500);
    return result;
  }

  async getEarlyWarning(schoolId: string, id: string): Promise<EarlyWarning | null> {
    const { data, error } = await this.supabase
      .from('intelligence_early_warnings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateEarlyWarning(schoolId: string, id: string, data: EarlyWarningUpdate): Promise<EarlyWarning> {
    const { data: result, error } = await this.supabase
      .from('intelligence_early_warnings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_EARLY_WARNING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteEarlyWarning(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_early_warnings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_EARLY_WARNING_DELETE_FAILED', 500);
  }

  async listEarlyWarnings(schoolId: string, filters?: Record<string, unknown>): Promise<EarlyWarning[]> {
    let query = this.supabase.from('intelligence_early_warnings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_EARLY_WARNING_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- StudentOutlook -------------------------------------------------------
  async createStudentOutlook(schoolId: string, data: StudentOutlookCreate): Promise<StudentOutlook> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_student_outlooks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_STUDENT_OUTLOOK_CREATE_FAILED', 500);
    return result;
  }

  async getStudentOutlook(schoolId: string, id: string): Promise<StudentOutlook | null> {
    const { data, error } = await this.supabase
      .from('intelligence_student_outlooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateStudentOutlook(schoolId: string, id: string, data: StudentOutlookUpdate): Promise<StudentOutlook> {
    const { data: result, error } = await this.supabase
      .from('intelligence_student_outlooks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_STUDENT_OUTLOOK_UPDATE_FAILED', 500);
    return result;
  }

  async deleteStudentOutlook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_student_outlooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_STUDENT_OUTLOOK_DELETE_FAILED', 500);
  }

  async listStudentOutlooks(schoolId: string, filters?: Record<string, unknown>): Promise<StudentOutlook[]> {
    let query = this.supabase.from('intelligence_student_outlooks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_STUDENT_OUTLOOK_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- Scenario -------------------------------------------------------------
  async createScenario(schoolId: string, data: ScenarioCreate): Promise<Scenario> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_scenarios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_SCENARIO_CREATE_FAILED', 500);
    return result;
  }

  async getScenario(schoolId: string, id: string): Promise<Scenario | null> {
    const { data, error } = await this.supabase
      .from('intelligence_scenarios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateScenario(schoolId: string, id: string, data: ScenarioUpdate): Promise<Scenario> {
    const { data: result, error } = await this.supabase
      .from('intelligence_scenarios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_SCENARIO_UPDATE_FAILED', 500);
    return result;
  }

  async deleteScenario(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_scenarios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_SCENARIO_DELETE_FAILED', 500);
  }

  async listScenarios(schoolId: string, filters?: Record<string, unknown>): Promise<Scenario[]> {
    let query = this.supabase.from('intelligence_scenarios').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_SCENARIO_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- KnowledgeBaseArticle -------------------------------------------------
  async createKnowledgeBaseArticle(schoolId: string, data: KnowledgeBaseArticleCreate): Promise<KnowledgeBaseArticle> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_knowledge_base')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_KNOWLEDGE_BASE_CREATE_FAILED', 500);
    return result;
  }

  async getKnowledgeBaseArticle(schoolId: string, id: string): Promise<KnowledgeBaseArticle | null> {
    const { data, error } = await this.supabase
      .from('intelligence_knowledge_base')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateKnowledgeBaseArticle(schoolId: string, id: string, data: KnowledgeBaseArticleUpdate): Promise<KnowledgeBaseArticle> {
    const { data: result, error } = await this.supabase
      .from('intelligence_knowledge_base')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_KNOWLEDGE_BASE_UPDATE_FAILED', 500);
    return result;
  }

  async deleteKnowledgeBaseArticle(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_knowledge_base')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_KNOWLEDGE_BASE_DELETE_FAILED', 500);
  }

  async listKnowledgeBaseArticles(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeBaseArticle[]> {
    let query = this.supabase.from('intelligence_knowledge_base').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_KNOWLEDGE_BASE_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- NLPTask --------------------------------------------------------------
  async createNLPTask(schoolId: string, data: NLPTaskCreate): Promise<NLPTask> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_nlp_tasks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_NLP_TASK_CREATE_FAILED', 500);
    return result;
  }

  async getNLPTask(schoolId: string, id: string): Promise<NLPTask | null> {
    const { data, error } = await this.supabase
      .from('intelligence_nlp_tasks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateNLPTask(schoolId: string, id: string, data: NLPTaskUpdate): Promise<NLPTask> {
    const { data: result, error } = await this.supabase
      .from('intelligence_nlp_tasks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_NLP_TASK_UPDATE_FAILED', 500);
    return result;
  }

  async deleteNLPTask(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_nlp_tasks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_NLP_TASK_DELETE_FAILED', 500);
  }

  async listNLPTasks(schoolId: string, filters?: Record<string, unknown>): Promise<NLPTask[]> {
    let query = this.supabase.from('intelligence_nlp_tasks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_NLP_TASK_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- SentimentAnalysis ----------------------------------------------------
  async createSentimentAnalysis(schoolId: string, data: SentimentAnalysisCreate): Promise<SentimentAnalysis> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_sentiment_analyses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_SENTIMENT_ANALYSIS_CREATE_FAILED', 500);
    return result;
  }

  async getSentimentAnalysis(schoolId: string, id: string): Promise<SentimentAnalysis | null> {
    const { data, error } = await this.supabase
      .from('intelligence_sentiment_analyses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSentimentAnalysis(schoolId: string, id: string, data: SentimentAnalysisUpdate): Promise<SentimentAnalysis> {
    const { data: result, error } = await this.supabase
      .from('intelligence_sentiment_analyses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_SENTIMENT_ANALYSIS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSentimentAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_sentiment_analyses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_SENTIMENT_ANALYSIS_DELETE_FAILED', 500);
  }

  async listSentimentAnalyses(schoolId: string, filters?: Record<string, unknown>): Promise<SentimentAnalysis[]> {
    let query = this.supabase.from('intelligence_sentiment_analyses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_SENTIMENT_ANALYSIS_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- AutoClassification ---------------------------------------------------
  async createAutoClassification(schoolId: string, data: AutoClassificationCreate): Promise<AutoClassification> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_auto_classifications')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_AUTO_CLASSIFICATION_CREATE_FAILED', 500);
    return result;
  }

  async getAutoClassification(schoolId: string, id: string): Promise<AutoClassification | null> {
    const { data, error } = await this.supabase
      .from('intelligence_auto_classifications')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAutoClassification(schoolId: string, id: string, data: AutoClassificationUpdate): Promise<AutoClassification> {
    const { data: result, error } = await this.supabase
      .from('intelligence_auto_classifications')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_AUTO_CLASSIFICATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAutoClassification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_auto_classifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_AUTO_CLASSIFICATION_DELETE_FAILED', 500);
  }

  async listAutoClassifications(schoolId: string, filters?: Record<string, unknown>): Promise<AutoClassification[]> {
    let query = this.supabase.from('intelligence_auto_classifications').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_AUTO_CLASSIFICATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- TextSummarization ----------------------------------------------------
  async createTextSummarization(schoolId: string, data: TextSummarizationCreate): Promise<TextSummarization> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_text_summarizations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_TEXT_SUMMARIZATION_CREATE_FAILED', 500);
    return result;
  }

  async getTextSummarization(schoolId: string, id: string): Promise<TextSummarization | null> {
    const { data, error } = await this.supabase
      .from('intelligence_text_summarizations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateTextSummarization(schoolId: string, id: string, data: TextSummarizationUpdate): Promise<TextSummarization> {
    const { data: result, error } = await this.supabase
      .from('intelligence_text_summarizations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_TEXT_SUMMARIZATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteTextSummarization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_text_summarizations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_TEXT_SUMMARIZATION_DELETE_FAILED', 500);
  }

  async listTextSummarizations(schoolId: string, filters?: Record<string, unknown>): Promise<TextSummarization[]> {
    let query = this.supabase.from('intelligence_text_summarizations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_TEXT_SUMMARIZATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- DocumentAnalysis -----------------------------------------------------
  async createDocumentAnalysis(schoolId: string, data: DocumentAnalysisCreate): Promise<DocumentAnalysis> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_document_analyses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_DOCUMENT_ANALYSIS_CREATE_FAILED', 500);
    return result;
  }

  async getDocumentAnalysis(schoolId: string, id: string): Promise<DocumentAnalysis | null> {
    const { data, error } = await this.supabase
      .from('intelligence_document_analyses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDocumentAnalysis(schoolId: string, id: string, data: DocumentAnalysisUpdate): Promise<DocumentAnalysis> {
    const { data: result, error } = await this.supabase
      .from('intelligence_document_analyses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_DOCUMENT_ANALYSIS_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDocumentAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_document_analyses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_DOCUMENT_ANALYSIS_DELETE_FAILED', 500);
  }

  async listDocumentAnalyses(schoolId: string, filters?: Record<string, unknown>): Promise<DocumentAnalysis[]> {
    let query = this.supabase.from('intelligence_document_analyses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_DOCUMENT_ANALYSIS_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- Benchmark ------------------------------------------------------------
  async createBenchmark(schoolId: string, data: BenchmarkCreate): Promise<Benchmark> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_benchmarks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_BENCHMARK_CREATE_FAILED', 500);
    return result;
  }

  async getBenchmark(schoolId: string, id: string): Promise<Benchmark | null> {
    const { data, error } = await this.supabase
      .from('intelligence_benchmarks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateBenchmark(schoolId: string, id: string, data: BenchmarkUpdate): Promise<Benchmark> {
    const { data: result, error } = await this.supabase
      .from('intelligence_benchmarks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_BENCHMARK_UPDATE_FAILED', 500);
    return result;
  }

  async deleteBenchmark(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_benchmarks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_BENCHMARK_DELETE_FAILED', 500);
  }

  async listBenchmarks(schoolId: string, filters?: Record<string, unknown>): Promise<Benchmark[]> {
    let query = this.supabase.from('intelligence_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_BENCHMARK_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- AIInsight ------------------------------------------------------------
  async createAIInsight(schoolId: string, data: AIInsightCreate): Promise<AIInsight> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_ai_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_AI_INSIGHT_CREATE_FAILED', 500);
    return result;
  }

  async getAIInsight(schoolId: string, id: string): Promise<AIInsight | null> {
    const { data, error } = await this.supabase
      .from('intelligence_ai_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAIInsight(schoolId: string, id: string, data: AIInsightUpdate): Promise<AIInsight> {
    const { data: result, error } = await this.supabase
      .from('intelligence_ai_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_AI_INSIGHT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAIInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_ai_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_AI_INSIGHT_DELETE_FAILED', 500);
  }

  async listAIInsights(schoolId: string, filters?: Record<string, unknown>): Promise<AIInsight[]> {
    let query = this.supabase.from('intelligence_ai_insights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_AI_INSIGHT_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- AnalyticsReport ------------------------------------------------------
  async createAnalyticsReport(schoolId: string, data: AnalyticsReportCreate): Promise<AnalyticsReport> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_analytics_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_ANALYTICS_REPORT_CREATE_FAILED', 500);
    return result;
  }

  async getAnalyticsReport(schoolId: string, id: string): Promise<AnalyticsReport | null> {
    const { data, error } = await this.supabase
      .from('intelligence_analytics_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAnalyticsReport(schoolId: string, id: string, data: AnalyticsReportUpdate): Promise<AnalyticsReport> {
    const { data: result, error } = await this.supabase
      .from('intelligence_analytics_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_ANALYTICS_REPORT_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAnalyticsReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_analytics_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_ANALYTICS_REPORT_DELETE_FAILED', 500);
  }

  async listAnalyticsReports(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsReport[]> {
    let query = this.supabase.from('intelligence_analytics_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_ANALYTICS_REPORT_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- Visualization --------------------------------------------------------
  async createVisualization(schoolId: string, data: VisualizationCreate): Promise<Visualization> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_visualizations')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_VISUALIZATION_CREATE_FAILED', 500);
    return result;
  }

  async getVisualization(schoolId: string, id: string): Promise<Visualization | null> {
    const { data, error } = await this.supabase
      .from('intelligence_visualizations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateVisualization(schoolId: string, id: string, data: VisualizationUpdate): Promise<Visualization> {
    const { data: result, error } = await this.supabase
      .from('intelligence_visualizations')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_VISUALIZATION_UPDATE_FAILED', 500);
    return result;
  }

  async deleteVisualization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_visualizations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_VISUALIZATION_DELETE_FAILED', 500);
  }

  async listVisualizations(schoolId: string, filters?: Record<string, unknown>): Promise<Visualization[]> {
    let query = this.supabase.from('intelligence_visualizations').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_VISUALIZATION_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligenceConnector ------------------------------------------------
  async createConnector(schoolId: string, data: IntelligenceConnectorCreate): Promise<IntelligenceConnector> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_connectors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_CONNECTOR_CREATE_FAILED', 500);
    return result;
  }

  async getConnector(schoolId: string, id: string): Promise<IntelligenceConnector | null> {
    const { data, error } = await this.supabase
      .from('intelligence_connectors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateConnector(schoolId: string, id: string, data: IntelligenceConnectorUpdate): Promise<IntelligenceConnector> {
    const { data: result, error } = await this.supabase
      .from('intelligence_connectors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_CONNECTOR_UPDATE_FAILED', 500);
    return result;
  }

  async deleteConnector(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_connectors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_CONNECTOR_DELETE_FAILED', 500);
  }

  async listConnectors(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceConnector[]> {
    let query = this.supabase.from('intelligence_connectors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_CONNECTOR_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligenceDataSync -------------------------------------------------
  async createDataSync(schoolId: string, data: IntelligenceDataSyncCreate): Promise<IntelligenceDataSync> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_data_syncs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_DATA_SYNC_CREATE_FAILED', 500);
    return result;
  }

  async getDataSync(schoolId: string, id: string): Promise<IntelligenceDataSync | null> {
    const { data, error } = await this.supabase
      .from('intelligence_data_syncs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateDataSync(schoolId: string, id: string, data: IntelligenceDataSyncUpdate): Promise<IntelligenceDataSync> {
    const { data: result, error } = await this.supabase
      .from('intelligence_data_syncs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_DATA_SYNC_UPDATE_FAILED', 500);
    return result;
  }

  async deleteDataSync(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_data_syncs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_DATA_SYNC_DELETE_FAILED', 500);
  }

  async listDataSyncs(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceDataSync[]> {
    let query = this.supabase.from('intelligence_data_syncs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_DATA_SYNC_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligenceAPI ------------------------------------------------------
  async createAPI(schoolId: string, data: IntelligenceAPICreate): Promise<IntelligenceAPI> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_apis')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_API_CREATE_FAILED', 500);
    return result;
  }

  async getAPI(schoolId: string, id: string): Promise<IntelligenceAPI | null> {
    const { data, error } = await this.supabase
      .from('intelligence_apis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateAPI(schoolId: string, id: string, data: IntelligenceAPIUpdate): Promise<IntelligenceAPI> {
    const { data: result, error } = await this.supabase
      .from('intelligence_apis')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_API_UPDATE_FAILED', 500);
    return result;
  }

  async deleteAPI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_apis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_API_DELETE_FAILED', 500);
  }

  async listAPIs(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceAPI[]> {
    let query = this.supabase.from('intelligence_apis').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_API_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligenceSecurity -------------------------------------------------
  async createSecurity(schoolId: string, data: IntelligenceSecurityCreate): Promise<IntelligenceSecurity> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_security')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_SECURITY_CREATE_FAILED', 500);
    return result;
  }

  async getSecurity(schoolId: string, id: string): Promise<IntelligenceSecurity | null> {
    const { data, error } = await this.supabase
      .from('intelligence_security')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateSecurity(schoolId: string, id: string, data: IntelligenceSecurityUpdate): Promise<IntelligenceSecurity> {
    const { data: result, error } = await this.supabase
      .from('intelligence_security')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_SECURITY_UPDATE_FAILED', 500);
    return result;
  }

  async deleteSecurity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_security')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_SECURITY_DELETE_FAILED', 500);
  }

  async listSecurity(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceSecurity[]> {
    let query = this.supabase.from('intelligence_security').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_SECURITY_LIST_FAILED', 500);
    return data ?? [];
  }

  // --- IntelligenceMonitoring -----------------------------------------------
  async createMonitoring(schoolId: string, data: IntelligenceMonitoringCreate): Promise<IntelligenceMonitoring> {
    const timestamp = now();
    const { data: result, error } = await this.supabase
      .from('intelligence_monitoring')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_MONITORING_CREATE_FAILED', 500);
    return result;
  }

  async getMonitoring(schoolId: string, id: string): Promise<IntelligenceMonitoring | null> {
    const { data, error } = await this.supabase
      .from('intelligence_monitoring')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async updateMonitoring(schoolId: string, id: string, data: IntelligenceMonitoringUpdate): Promise<IntelligenceMonitoring> {
    const { data: result, error } = await this.supabase
      .from('intelligence_monitoring')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AppError(error.message, 'INT_MONITORING_UPDATE_FAILED', 500);
    return result;
  }

  async deleteMonitoring(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('intelligence_monitoring')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AppError(error.message, 'INT_MONITORING_DELETE_FAILED', 500);
  }

  async listMonitoring(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceMonitoring[]> {
    let query = this.supabase.from('intelligence_monitoring').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new AppError(error.message, 'INT_MONITORING_LIST_FAILED', 500);
    return data ?? [];
  }
}

export function createIntelligenceRepository(supabase: SupabaseClient): IntelligenceRepository {
  return new IntelligenceRepositoryImpl(supabase);
}

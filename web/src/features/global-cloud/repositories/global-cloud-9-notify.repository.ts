import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudAIDecisionSupportError, EduCloudAIForecastError, EduCloudAIInsightError, EduCloudAIPredictionError, EduCloudAIRecommendationError, EduCloudAuditReportError, EduCloudAuditTrailError, EduCloudBaseError, EduCloudBudgetAllocationError, EduCloudBudgetForecastError, EduCloudBudgetIntelligenceError, EduCloudBudgetOptimizationError, EduCloudCognitiveAnalyticsError, EduCloudCognitiveInsightError, EduCloudCognitivePatternError, EduCloudComparativeHeatmapError, EduCloudComplianceAuditError, EduCloudComplianceReportError, EduCloudCrisisCenterError, EduCloudDecisionHistoryError, EduCloudDecisionImpactError, EduCloudDecisionRecommendationError, EduCloudDistrictKPIError, EduCloudDistrictPolicyError, EduCloudEducationPlanError, EduCloudEducationProgramError, EduCloudEducationStrategyError, EduCloudEmploymentForecastError, EduCloudEmploymentIntelligenceError, EduCloudEmploymentMapError, EduCloudEmploymentTrendError, EduCloudExecutiveBriefError, EduCloudExecutiveDashboardError, EduCloudExecutiveFilterError, EduCloudExecutiveReportError, EduCloudExecutiveSummaryError, EduCloudExecutiveWarRoomError, EduCloudExecutiveWidgetError, EduCloudGeoLocationError, EduCloudGovernmentAlertError, EduCloudGovernmentAnalyticsError, EduCloudGovernmentBroadcastError, EduCloudGovernmentInsightError, EduCloudGovernmentNotificationError, EduCloudGovernmentReportError, EduCloudInfrastructureForecastError, EduCloudInfrastructureIntelligenceError, EduCloudInfrastructureMapError, EduCloudInvestmentAnalysisError, EduCloudInvestmentReturnError, EduCloudInvestmentRiskError, EduCloudLiveMonitorError, EduCloudMetricAlertError, EduCloudMetricForecastError, EduCloudMetricTrendError, EduCloudMetricValueError, EduCloudMinistryDashboardError, EduCloudNationalDashboardError, EduCloudNationalForecastError, EduCloudNationalHeatmapError, EduCloudNationalKPIError, EduCloudNationalPolicyError, EduCloudPartnershipAnalysisError, EduCloudPartnershipMapError, EduCloudPartnershipMetricError, EduCloudPerformanceBenchmarkError, EduCloudPerformanceComparisonError, EduCloudPerformanceTrendError, EduCloudPolicyAnalysisError, EduCloudPolicyDashboardError, EduCloudPolicyImpactEntityError, EduCloudPolicyRecommendationError, EduCloudPredictiveAnalyticsError, EduCloudPredictiveModelError, EduCloudPredictiveResultError, EduCloudPrescriptiveAnalyticsError, EduCloudPrescriptiveRecommendationError, EduCloudRealTimeMetricError, EduCloudRegionalDashboardError, EduCloudRegionalForecastError, EduCloudRegionalHeatmapError, EduCloudRegionalKPIError, EduCloudRegionalPolicyError, EduCloudRiskAssessmentError, EduCloudRiskMitigationError, EduCloudRiskMonitorError, EduCloudScenarioBuilderError, EduCloudScenarioComparisonError, EduCloudScenarioResultError, EduCloudSchoolKPIError, EduCloudSectorForecastError, EduCloudStakeholderAnalysisError, EduCloudStakeholderEngagementError, EduCloudStakeholderMapError, EduCloudStrategicGoalEntityError, EduCloudStrategicKPIError, EduCloudStrategicPlanError, EduCloudStrategicReportError, EduCloudStudentDistributionError, EduCloudStudentForecastError, EduCloudStudentIntelligenceError, EduCloudStudentOutcomeError, EduCloudTeacherDistributionError, EduCloudTeacherForecastError, EduCloudTeacherIntelligenceError, EduCloudTeacherOptimizationError, EduCloudTimeRangeError, EduCloudWhatIfAnalysisError, EduCloudWhatIfRecommendationError, EduCloudWhatIfResultError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface NotifyModuleRepository {

  // =============================================================================
  // GOVERNMENT-INTELLIGENCE
  // =============================================================================
  getBase(schoolId: string, id: string): Promise<any | null>;
  listBase(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBase(schoolId: string, data: any): Promise<any>;
  updateBase(schoolId: string, id: string, data: any): Promise<any>;
  deleteBase(schoolId: string, id: string): Promise<void>;

  getGeoLocation(schoolId: string, id: string): Promise<any | null>;
  listGeoLocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGeoLocation(schoolId: string, data: any): Promise<any>;
  updateGeoLocation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGeoLocation(schoolId: string, id: string): Promise<void>;

  getTimeRange(schoolId: string, id: string): Promise<any | null>;
  listTimeRange(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTimeRange(schoolId: string, data: any): Promise<any>;
  updateTimeRange(schoolId: string, id: string, data: any): Promise<any>;
  deleteTimeRange(schoolId: string, id: string): Promise<void>;

  getMetricValue(schoolId: string, id: string): Promise<any | null>;
  listMetricValue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMetricValue(schoolId: string, data: any): Promise<any>;
  updateMetricValue(schoolId: string, id: string, data: any): Promise<any>;
  deleteMetricValue(schoolId: string, id: string): Promise<void>;

  getNationalDashboard(schoolId: string, id: string): Promise<any | null>;
  listNationalDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNationalDashboard(schoolId: string, data: any): Promise<any>;
  updateNationalDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteNationalDashboard(schoolId: string, id: string): Promise<void>;

  getMinistryDashboard(schoolId: string, id: string): Promise<any | null>;
  listMinistryDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMinistryDashboard(schoolId: string, data: any): Promise<any>;
  updateMinistryDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteMinistryDashboard(schoolId: string, id: string): Promise<void>;

  getRegionalDashboard(schoolId: string, id: string): Promise<any | null>;
  listRegionalDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRegionalDashboard(schoolId: string, data: any): Promise<any>;
  updateRegionalDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteRegionalDashboard(schoolId: string, id: string): Promise<void>;

  getPolicyDashboard(schoolId: string, id: string): Promise<any | null>;
  listPolicyDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPolicyDashboard(schoolId: string, data: any): Promise<any>;
  updatePolicyDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deletePolicyDashboard(schoolId: string, id: string): Promise<void>;

  getExecutiveDashboard(schoolId: string, id: string): Promise<any | null>;
  listExecutiveDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createExecutiveDashboard(schoolId: string, data: any): Promise<any>;
  updateExecutiveDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteExecutiveDashboard(schoolId: string, id: string): Promise<void>;

  getNationalKPI(schoolId: string, id: string): Promise<any | null>;
  listNationalKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNationalKPI(schoolId: string, data: any): Promise<any>;
  updateNationalKPI(schoolId: string, id: string, data: any): Promise<any>;
  deleteNationalKPI(schoolId: string, id: string): Promise<void>;

  getRegionalKPI(schoolId: string, id: string): Promise<any | null>;
  listRegionalKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRegionalKPI(schoolId: string, data: any): Promise<any>;
  updateRegionalKPI(schoolId: string, id: string, data: any): Promise<any>;
  deleteRegionalKPI(schoolId: string, id: string): Promise<void>;

  getDistrictKPI(schoolId: string, id: string): Promise<any | null>;
  listDistrictKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDistrictKPI(schoolId: string, data: any): Promise<any>;
  updateDistrictKPI(schoolId: string, id: string, data: any): Promise<any>;
  deleteDistrictKPI(schoolId: string, id: string): Promise<void>;

  getSchoolKPI(schoolId: string, id: string): Promise<any | null>;
  listSchoolKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchoolKPI(schoolId: string, data: any): Promise<any>;
  updateSchoolKPI(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchoolKPI(schoolId: string, id: string): Promise<void>;

  getBudgetIntelligence(schoolId: string, id: string): Promise<any | null>;
  listBudgetIntelligence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBudgetIntelligence(schoolId: string, data: any): Promise<any>;
  updateBudgetIntelligence(schoolId: string, id: string, data: any): Promise<any>;
  deleteBudgetIntelligence(schoolId: string, id: string): Promise<void>;

  getBudgetAllocation(schoolId: string, id: string): Promise<any | null>;
  listBudgetAllocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBudgetAllocation(schoolId: string, data: any): Promise<any>;
  updateBudgetAllocation(schoolId: string, id: string, data: any): Promise<any>;
  deleteBudgetAllocation(schoolId: string, id: string): Promise<void>;

  getBudgetForecast(schoolId: string, id: string): Promise<any | null>;
  listBudgetForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBudgetForecast(schoolId: string, data: any): Promise<any>;
  updateBudgetForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteBudgetForecast(schoolId: string, id: string): Promise<void>;

  getBudgetOptimization(schoolId: string, id: string): Promise<any | null>;
  listBudgetOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBudgetOptimization(schoolId: string, data: any): Promise<any>;
  updateBudgetOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteBudgetOptimization(schoolId: string, id: string): Promise<void>;

  getTeacherIntelligence(schoolId: string, id: string): Promise<any | null>;
  listTeacherIntelligence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherIntelligence(schoolId: string, data: any): Promise<any>;
  updateTeacherIntelligence(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherIntelligence(schoolId: string, id: string): Promise<void>;

  getTeacherDistribution(schoolId: string, id: string): Promise<any | null>;
  listTeacherDistribution(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherDistribution(schoolId: string, data: any): Promise<any>;
  updateTeacherDistribution(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherDistribution(schoolId: string, id: string): Promise<void>;

  getTeacherForecast(schoolId: string, id: string): Promise<any | null>;
  listTeacherForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherForecast(schoolId: string, data: any): Promise<any>;
  updateTeacherForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherForecast(schoolId: string, id: string): Promise<void>;

  getTeacherOptimization(schoolId: string, id: string): Promise<any | null>;
  listTeacherOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherOptimization(schoolId: string, data: any): Promise<any>;
  updateTeacherOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherOptimization(schoolId: string, id: string): Promise<void>;

  getInfrastructureIntelligence(schoolId: string, id: string): Promise<any | null>;
  listInfrastructureIntelligence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInfrastructureIntelligence(schoolId: string, data: any): Promise<any>;
  updateInfrastructureIntelligence(schoolId: string, id: string, data: any): Promise<any>;
  deleteInfrastructureIntelligence(schoolId: string, id: string): Promise<void>;

  getInfrastructureMap(schoolId: string, id: string): Promise<any | null>;
  listInfrastructureMap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInfrastructureMap(schoolId: string, data: any): Promise<any>;
  updateInfrastructureMap(schoolId: string, id: string, data: any): Promise<any>;
  deleteInfrastructureMap(schoolId: string, id: string): Promise<void>;

  getInfrastructureForecast(schoolId: string, id: string): Promise<any | null>;
  listInfrastructureForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInfrastructureForecast(schoolId: string, data: any): Promise<any>;
  updateInfrastructureForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteInfrastructureForecast(schoolId: string, id: string): Promise<void>;

  getStudentIntelligence(schoolId: string, id: string): Promise<any | null>;
  listStudentIntelligence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStudentIntelligence(schoolId: string, data: any): Promise<any>;
  updateStudentIntelligence(schoolId: string, id: string, data: any): Promise<any>;
  deleteStudentIntelligence(schoolId: string, id: string): Promise<void>;

  getStudentDistribution(schoolId: string, id: string): Promise<any | null>;
  listStudentDistribution(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStudentDistribution(schoolId: string, data: any): Promise<any>;
  updateStudentDistribution(schoolId: string, id: string, data: any): Promise<any>;
  deleteStudentDistribution(schoolId: string, id: string): Promise<void>;

  getStudentForecast(schoolId: string, id: string): Promise<any | null>;
  listStudentForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStudentForecast(schoolId: string, data: any): Promise<any>;
  updateStudentForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteStudentForecast(schoolId: string, id: string): Promise<void>;

  getStudentOutcome(schoolId: string, id: string): Promise<any | null>;
  listStudentOutcome(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStudentOutcome(schoolId: string, data: any): Promise<any>;
  updateStudentOutcome(schoolId: string, id: string, data: any): Promise<any>;
  deleteStudentOutcome(schoolId: string, id: string): Promise<void>;

  getEmploymentIntelligence(schoolId: string, id: string): Promise<any | null>;
  listEmploymentIntelligence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmploymentIntelligence(schoolId: string, data: any): Promise<any>;
  updateEmploymentIntelligence(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmploymentIntelligence(schoolId: string, id: string): Promise<void>;

  getEmploymentMap(schoolId: string, id: string): Promise<any | null>;
  listEmploymentMap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmploymentMap(schoolId: string, data: any): Promise<any>;
  updateEmploymentMap(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmploymentMap(schoolId: string, id: string): Promise<void>;

  getEmploymentForecast(schoolId: string, id: string): Promise<any | null>;
  listEmploymentForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmploymentForecast(schoolId: string, data: any): Promise<any>;
  updateEmploymentForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmploymentForecast(schoolId: string, id: string): Promise<void>;

  getEmploymentTrend(schoolId: string, id: string): Promise<any | null>;
  listEmploymentTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmploymentTrend(schoolId: string, data: any): Promise<any>;
  updateEmploymentTrend(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmploymentTrend(schoolId: string, id: string): Promise<void>;

  getAIRecommendation(schoolId: string, id: string): Promise<any | null>;
  listAIRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAIRecommendation(schoolId: string, data: any): Promise<any>;
  updateAIRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deleteAIRecommendation(schoolId: string, id: string): Promise<void>;

  getAIInsight(schoolId: string, id: string): Promise<any | null>;
  listAIInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAIInsight(schoolId: string, data: any): Promise<any>;
  updateAIInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteAIInsight(schoolId: string, id: string): Promise<void>;

  getAIPrediction(schoolId: string, id: string): Promise<any | null>;
  listAIPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAIPrediction(schoolId: string, data: any): Promise<any>;
  updateAIPrediction(schoolId: string, id: string, data: any): Promise<any>;
  deleteAIPrediction(schoolId: string, id: string): Promise<void>;

  getAIForecast(schoolId: string, id: string): Promise<any | null>;
  listAIForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAIForecast(schoolId: string, data: any): Promise<any>;
  updateAIForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteAIForecast(schoolId: string, id: string): Promise<void>;

  getNationalForecast(schoolId: string, id: string): Promise<any | null>;
  listNationalForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNationalForecast(schoolId: string, data: any): Promise<any>;
  updateNationalForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteNationalForecast(schoolId: string, id: string): Promise<void>;

  getRegionalForecast(schoolId: string, id: string): Promise<any | null>;
  listRegionalForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRegionalForecast(schoolId: string, data: any): Promise<any>;
  updateRegionalForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteRegionalForecast(schoolId: string, id: string): Promise<void>;

  getSectorForecast(schoolId: string, id: string): Promise<any | null>;
  listSectorForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSectorForecast(schoolId: string, data: any): Promise<any>;
  updateSectorForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteSectorForecast(schoolId: string, id: string): Promise<void>;

  getExecutiveWarRoom(schoolId: string, id: string): Promise<any | null>;
  listExecutiveWarRoom(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createExecutiveWarRoom(schoolId: string, data: any): Promise<any>;
  updateExecutiveWarRoom(schoolId: string, id: string, data: any): Promise<any>;
  deleteExecutiveWarRoom(schoolId: string, id: string): Promise<void>;

  getCrisisCenter(schoolId: string, id: string): Promise<any | null>;
  listCrisisCenter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCrisisCenter(schoolId: string, data: any): Promise<any>;
  updateCrisisCenter(schoolId: string, id: string, data: any): Promise<any>;
  deleteCrisisCenter(schoolId: string, id: string): Promise<void>;

  getLiveMonitor(schoolId: string, id: string): Promise<any | null>;
  listLiveMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLiveMonitor(schoolId: string, data: any): Promise<any>;
  updateLiveMonitor(schoolId: string, id: string, data: any): Promise<any>;
  deleteLiveMonitor(schoolId: string, id: string): Promise<void>;

  getStrategicKPI(schoolId: string, id: string): Promise<any | null>;
  listStrategicKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStrategicKPI(schoolId: string, data: any): Promise<any>;
  updateStrategicKPI(schoolId: string, id: string, data: any): Promise<any>;
  deleteStrategicKPI(schoolId: string, id: string): Promise<void>;

  getStrategicGoalEntity(schoolId: string, id: string): Promise<any | null>;
  listStrategicGoalEntity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStrategicGoalEntity(schoolId: string, data: any): Promise<any>;
  updateStrategicGoalEntity(schoolId: string, id: string, data: any): Promise<any>;
  deleteStrategicGoalEntity(schoolId: string, id: string): Promise<void>;

  getStrategicPlan(schoolId: string, id: string): Promise<any | null>;
  listStrategicPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStrategicPlan(schoolId: string, data: any): Promise<any>;
  updateStrategicPlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteStrategicPlan(schoolId: string, id: string): Promise<void>;

  getStrategicReport(schoolId: string, id: string): Promise<any | null>;
  listStrategicReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStrategicReport(schoolId: string, data: any): Promise<any>;
  updateStrategicReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteStrategicReport(schoolId: string, id: string): Promise<void>;

  getNationalHeatmap(schoolId: string, id: string): Promise<any | null>;
  listNationalHeatmap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNationalHeatmap(schoolId: string, data: any): Promise<any>;
  updateNationalHeatmap(schoolId: string, id: string, data: any): Promise<any>;
  deleteNationalHeatmap(schoolId: string, id: string): Promise<void>;

  getRegionalHeatmap(schoolId: string, id: string): Promise<any | null>;
  listRegionalHeatmap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRegionalHeatmap(schoolId: string, data: any): Promise<any>;
  updateRegionalHeatmap(schoolId: string, id: string, data: any): Promise<any>;
  deleteRegionalHeatmap(schoolId: string, id: string): Promise<void>;

  getComparativeHeatmap(schoolId: string, id: string): Promise<any | null>;
  listComparativeHeatmap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComparativeHeatmap(schoolId: string, data: any): Promise<any>;
  updateComparativeHeatmap(schoolId: string, id: string, data: any): Promise<any>;
  deleteComparativeHeatmap(schoolId: string, id: string): Promise<void>;

  getScenarioBuilder(schoolId: string, id: string): Promise<any | null>;
  listScenarioBuilder(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createScenarioBuilder(schoolId: string, data: any): Promise<any>;
  updateScenarioBuilder(schoolId: string, id: string, data: any): Promise<any>;
  deleteScenarioBuilder(schoolId: string, id: string): Promise<void>;

  getScenarioResult(schoolId: string, id: string): Promise<any | null>;
  listScenarioResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createScenarioResult(schoolId: string, data: any): Promise<any>;
  updateScenarioResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteScenarioResult(schoolId: string, id: string): Promise<void>;

  getScenarioComparison(schoolId: string, id: string): Promise<any | null>;
  listScenarioComparison(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createScenarioComparison(schoolId: string, data: any): Promise<any>;
  updateScenarioComparison(schoolId: string, id: string, data: any): Promise<any>;
  deleteScenarioComparison(schoolId: string, id: string): Promise<void>;

  getWhatIfAnalysis(schoolId: string, id: string): Promise<any | null>;
  listWhatIfAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWhatIfAnalysis(schoolId: string, data: any): Promise<any>;
  updateWhatIfAnalysis(schoolId: string, id: string, data: any): Promise<any>;
  deleteWhatIfAnalysis(schoolId: string, id: string): Promise<void>;

  getWhatIfResult(schoolId: string, id: string): Promise<any | null>;
  listWhatIfResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWhatIfResult(schoolId: string, data: any): Promise<any>;
  updateWhatIfResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteWhatIfResult(schoolId: string, id: string): Promise<void>;

  getWhatIfRecommendation(schoolId: string, id: string): Promise<any | null>;
  listWhatIfRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWhatIfRecommendation(schoolId: string, data: any): Promise<any>;
  updateWhatIfRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deleteWhatIfRecommendation(schoolId: string, id: string): Promise<void>;

  getDecisionRecommendation(schoolId: string, id: string): Promise<any | null>;
  listDecisionRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDecisionRecommendation(schoolId: string, data: any): Promise<any>;
  updateDecisionRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deleteDecisionRecommendation(schoolId: string, id: string): Promise<void>;

  getDecisionImpact(schoolId: string, id: string): Promise<any | null>;
  listDecisionImpact(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDecisionImpact(schoolId: string, data: any): Promise<any>;
  updateDecisionImpact(schoolId: string, id: string, data: any): Promise<any>;
  deleteDecisionImpact(schoolId: string, id: string): Promise<void>;

  getDecisionHistory(schoolId: string, id: string): Promise<any | null>;
  listDecisionHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDecisionHistory(schoolId: string, data: any): Promise<any>;
  updateDecisionHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteDecisionHistory(schoolId: string, id: string): Promise<void>;

  getExecutiveReport(schoolId: string, id: string): Promise<any | null>;
  listExecutiveReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createExecutiveReport(schoolId: string, data: any): Promise<any>;
  updateExecutiveReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteExecutiveReport(schoolId: string, id: string): Promise<void>;

  getExecutiveSummary(schoolId: string, id: string): Promise<any | null>;
  listExecutiveSummary(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createExecutiveSummary(schoolId: string, data: any): Promise<any>;
  updateExecutiveSummary(schoolId: string, id: string, data: any): Promise<any>;
  deleteExecutiveSummary(schoolId: string, id: string): Promise<void>;

  getExecutiveBrief(schoolId: string, id: string): Promise<any | null>;
  listExecutiveBrief(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createExecutiveBrief(schoolId: string, data: any): Promise<any>;
  updateExecutiveBrief(schoolId: string, id: string, data: any): Promise<any>;
  deleteExecutiveBrief(schoolId: string, id: string): Promise<void>;

  getAIDecisionSupport(schoolId: string, id: string): Promise<any | null>;
  listAIDecisionSupport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAIDecisionSupport(schoolId: string, data: any): Promise<any>;
  updateAIDecisionSupport(schoolId: string, id: string, data: any): Promise<any>;
  deleteAIDecisionSupport(schoolId: string, id: string): Promise<void>;

  getPolicyAnalysis(schoolId: string, id: string): Promise<any | null>;
  listPolicyAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPolicyAnalysis(schoolId: string, data: any): Promise<any>;
  updatePolicyAnalysis(schoolId: string, id: string, data: any): Promise<any>;
  deletePolicyAnalysis(schoolId: string, id: string): Promise<void>;

  getPolicyImpactEntity(schoolId: string, id: string): Promise<any | null>;
  listPolicyImpactEntity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPolicyImpactEntity(schoolId: string, data: any): Promise<any>;
  updatePolicyImpactEntity(schoolId: string, id: string, data: any): Promise<any>;
  deletePolicyImpactEntity(schoolId: string, id: string): Promise<void>;

  getPolicyRecommendation(schoolId: string, id: string): Promise<any | null>;
  listPolicyRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPolicyRecommendation(schoolId: string, data: any): Promise<any>;
  updatePolicyRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deletePolicyRecommendation(schoolId: string, id: string): Promise<void>;

  getNationalPolicy(schoolId: string, id: string): Promise<any | null>;
  listNationalPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNationalPolicy(schoolId: string, data: any): Promise<any>;
  updateNationalPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteNationalPolicy(schoolId: string, id: string): Promise<void>;

  getRegionalPolicy(schoolId: string, id: string): Promise<any | null>;
  listRegionalPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRegionalPolicy(schoolId: string, data: any): Promise<any>;
  updateRegionalPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteRegionalPolicy(schoolId: string, id: string): Promise<void>;

  getDistrictPolicy(schoolId: string, id: string): Promise<any | null>;
  listDistrictPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDistrictPolicy(schoolId: string, data: any): Promise<any>;
  updateDistrictPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteDistrictPolicy(schoolId: string, id: string): Promise<void>;

  getGovernmentAlert(schoolId: string, id: string): Promise<any | null>;
  listGovernmentAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernmentAlert(schoolId: string, data: any): Promise<any>;
  updateGovernmentAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernmentAlert(schoolId: string, id: string): Promise<void>;

  getGovernmentNotification(schoolId: string, id: string): Promise<any | null>;
  listGovernmentNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernmentNotification(schoolId: string, data: any): Promise<any>;
  updateGovernmentNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernmentNotification(schoolId: string, id: string): Promise<void>;

  getGovernmentBroadcast(schoolId: string, id: string): Promise<any | null>;
  listGovernmentBroadcast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernmentBroadcast(schoolId: string, data: any): Promise<any>;
  updateGovernmentBroadcast(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernmentBroadcast(schoolId: string, id: string): Promise<void>;

  getAuditTrail(schoolId: string, id: string): Promise<any | null>;
  listAuditTrail(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAuditTrail(schoolId: string, data: any): Promise<any>;
  updateAuditTrail(schoolId: string, id: string, data: any): Promise<any>;
  deleteAuditTrail(schoolId: string, id: string): Promise<void>;

  getAuditReport(schoolId: string, id: string): Promise<any | null>;
  listAuditReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAuditReport(schoolId: string, data: any): Promise<any>;
  updateAuditReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteAuditReport(schoolId: string, id: string): Promise<void>;

  getComplianceReport(schoolId: string, id: string): Promise<any | null>;
  listComplianceReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComplianceReport(schoolId: string, data: any): Promise<any>;
  updateComplianceReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteComplianceReport(schoolId: string, id: string): Promise<void>;

  getComplianceAudit(schoolId: string, id: string): Promise<any | null>;
  listComplianceAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComplianceAudit(schoolId: string, data: any): Promise<any>;
  updateComplianceAudit(schoolId: string, id: string, data: any): Promise<any>;
  deleteComplianceAudit(schoolId: string, id: string): Promise<void>;

  getRiskAssessment(schoolId: string, id: string): Promise<any | null>;
  listRiskAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRiskAssessment(schoolId: string, data: any): Promise<any>;
  updateRiskAssessment(schoolId: string, id: string, data: any): Promise<any>;
  deleteRiskAssessment(schoolId: string, id: string): Promise<void>;

  getRiskMitigation(schoolId: string, id: string): Promise<any | null>;
  listRiskMitigation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRiskMitigation(schoolId: string, data: any): Promise<any>;
  updateRiskMitigation(schoolId: string, id: string, data: any): Promise<any>;
  deleteRiskMitigation(schoolId: string, id: string): Promise<void>;

  getRiskMonitor(schoolId: string, id: string): Promise<any | null>;
  listRiskMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRiskMonitor(schoolId: string, data: any): Promise<any>;
  updateRiskMonitor(schoolId: string, id: string, data: any): Promise<any>;
  deleteRiskMonitor(schoolId: string, id: string): Promise<void>;

  getStakeholderMap(schoolId: string, id: string): Promise<any | null>;
  listStakeholderMap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStakeholderMap(schoolId: string, data: any): Promise<any>;
  updateStakeholderMap(schoolId: string, id: string, data: any): Promise<any>;
  deleteStakeholderMap(schoolId: string, id: string): Promise<void>;

  getStakeholderAnalysis(schoolId: string, id: string): Promise<any | null>;
  listStakeholderAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStakeholderAnalysis(schoolId: string, data: any): Promise<any>;
  updateStakeholderAnalysis(schoolId: string, id: string, data: any): Promise<any>;
  deleteStakeholderAnalysis(schoolId: string, id: string): Promise<void>;

  getStakeholderEngagement(schoolId: string, id: string): Promise<any | null>;
  listStakeholderEngagement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStakeholderEngagement(schoolId: string, data: any): Promise<any>;
  updateStakeholderEngagement(schoolId: string, id: string, data: any): Promise<any>;
  deleteStakeholderEngagement(schoolId: string, id: string): Promise<void>;

  getPerformanceBenchmark(schoolId: string, id: string): Promise<any | null>;
  listPerformanceBenchmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPerformanceBenchmark(schoolId: string, data: any): Promise<any>;
  updatePerformanceBenchmark(schoolId: string, id: string, data: any): Promise<any>;
  deletePerformanceBenchmark(schoolId: string, id: string): Promise<void>;

  getPerformanceComparison(schoolId: string, id: string): Promise<any | null>;
  listPerformanceComparison(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPerformanceComparison(schoolId: string, data: any): Promise<any>;
  updatePerformanceComparison(schoolId: string, id: string, data: any): Promise<any>;
  deletePerformanceComparison(schoolId: string, id: string): Promise<void>;

  getPerformanceTrend(schoolId: string, id: string): Promise<any | null>;
  listPerformanceTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPerformanceTrend(schoolId: string, data: any): Promise<any>;
  updatePerformanceTrend(schoolId: string, id: string, data: any): Promise<any>;
  deletePerformanceTrend(schoolId: string, id: string): Promise<void>;

  getPredictiveAnalytics(schoolId: string, id: string): Promise<any | null>;
  listPredictiveAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPredictiveAnalytics(schoolId: string, data: any): Promise<any>;
  updatePredictiveAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deletePredictiveAnalytics(schoolId: string, id: string): Promise<void>;

  getPredictiveModel(schoolId: string, id: string): Promise<any | null>;
  listPredictiveModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPredictiveModel(schoolId: string, data: any): Promise<any>;
  updatePredictiveModel(schoolId: string, id: string, data: any): Promise<any>;
  deletePredictiveModel(schoolId: string, id: string): Promise<void>;

  getPredictiveResult(schoolId: string, id: string): Promise<any | null>;
  listPredictiveResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPredictiveResult(schoolId: string, data: any): Promise<any>;
  updatePredictiveResult(schoolId: string, id: string, data: any): Promise<any>;
  deletePredictiveResult(schoolId: string, id: string): Promise<void>;

  getPrescriptiveAnalytics(schoolId: string, id: string): Promise<any | null>;
  listPrescriptiveAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPrescriptiveAnalytics(schoolId: string, data: any): Promise<any>;
  updatePrescriptiveAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deletePrescriptiveAnalytics(schoolId: string, id: string): Promise<void>;

  getPrescriptiveRecommendation(schoolId: string, id: string): Promise<any | null>;
  listPrescriptiveRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPrescriptiveRecommendation(schoolId: string, data: any): Promise<any>;
  updatePrescriptiveRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deletePrescriptiveRecommendation(schoolId: string, id: string): Promise<void>;

  getCognitiveAnalytics(schoolId: string, id: string): Promise<any | null>;
  listCognitiveAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCognitiveAnalytics(schoolId: string, data: any): Promise<any>;
  updateCognitiveAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deleteCognitiveAnalytics(schoolId: string, id: string): Promise<void>;

  getCognitiveInsight(schoolId: string, id: string): Promise<any | null>;
  listCognitiveInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCognitiveInsight(schoolId: string, data: any): Promise<any>;
  updateCognitiveInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteCognitiveInsight(schoolId: string, id: string): Promise<void>;

  getCognitivePattern(schoolId: string, id: string): Promise<any | null>;
  listCognitivePattern(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCognitivePattern(schoolId: string, data: any): Promise<any>;
  updateCognitivePattern(schoolId: string, id: string, data: any): Promise<any>;
  deleteCognitivePattern(schoolId: string, id: string): Promise<void>;

  getRealTimeMetric(schoolId: string, id: string): Promise<any | null>;
  listRealTimeMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRealTimeMetric(schoolId: string, data: any): Promise<any>;
  updateRealTimeMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteRealTimeMetric(schoolId: string, id: string): Promise<void>;

  getMetricAlert(schoolId: string, id: string): Promise<any | null>;
  listMetricAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMetricAlert(schoolId: string, data: any): Promise<any>;
  updateMetricAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteMetricAlert(schoolId: string, id: string): Promise<void>;

  getMetricTrend(schoolId: string, id: string): Promise<any | null>;
  listMetricTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMetricTrend(schoolId: string, data: any): Promise<any>;
  updateMetricTrend(schoolId: string, id: string, data: any): Promise<any>;
  deleteMetricTrend(schoolId: string, id: string): Promise<void>;

  getMetricForecast(schoolId: string, id: string): Promise<any | null>;
  listMetricForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMetricForecast(schoolId: string, data: any): Promise<any>;
  updateMetricForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteMetricForecast(schoolId: string, id: string): Promise<void>;

  getExecutiveWidget(schoolId: string, id: string): Promise<any | null>;
  listExecutiveWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createExecutiveWidget(schoolId: string, data: any): Promise<any>;
  updateExecutiveWidget(schoolId: string, id: string, data: any): Promise<any>;
  deleteExecutiveWidget(schoolId: string, id: string): Promise<void>;

  getExecutiveFilter(schoolId: string, id: string): Promise<any | null>;
  listExecutiveFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createExecutiveFilter(schoolId: string, data: any): Promise<any>;
  updateExecutiveFilter(schoolId: string, id: string, data: any): Promise<any>;
  deleteExecutiveFilter(schoolId: string, id: string): Promise<void>;

  getGovernmentReport(schoolId: string, id: string): Promise<any | null>;
  listGovernmentReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernmentReport(schoolId: string, data: any): Promise<any>;
  updateGovernmentReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernmentReport(schoolId: string, id: string): Promise<void>;

  getGovernmentAnalytics(schoolId: string, id: string): Promise<any | null>;
  listGovernmentAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernmentAnalytics(schoolId: string, data: any): Promise<any>;
  updateGovernmentAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernmentAnalytics(schoolId: string, id: string): Promise<void>;

  getGovernmentInsight(schoolId: string, id: string): Promise<any | null>;
  listGovernmentInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGovernmentInsight(schoolId: string, data: any): Promise<any>;
  updateGovernmentInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteGovernmentInsight(schoolId: string, id: string): Promise<void>;

  getEducationStrategy(schoolId: string, id: string): Promise<any | null>;
  listEducationStrategy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEducationStrategy(schoolId: string, data: any): Promise<any>;
  updateEducationStrategy(schoolId: string, id: string, data: any): Promise<any>;
  deleteEducationStrategy(schoolId: string, id: string): Promise<void>;

  getEducationPlan(schoolId: string, id: string): Promise<any | null>;
  listEducationPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEducationPlan(schoolId: string, data: any): Promise<any>;
  updateEducationPlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteEducationPlan(schoolId: string, id: string): Promise<void>;

  getEducationProgram(schoolId: string, id: string): Promise<any | null>;
  listEducationProgram(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEducationProgram(schoolId: string, data: any): Promise<any>;
  updateEducationProgram(schoolId: string, id: string, data: any): Promise<any>;
  deleteEducationProgram(schoolId: string, id: string): Promise<void>;

  getPartnershipMap(schoolId: string, id: string): Promise<any | null>;
  listPartnershipMap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPartnershipMap(schoolId: string, data: any): Promise<any>;
  updatePartnershipMap(schoolId: string, id: string, data: any): Promise<any>;
  deletePartnershipMap(schoolId: string, id: string): Promise<void>;

  getPartnershipAnalysis(schoolId: string, id: string): Promise<any | null>;
  listPartnershipAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPartnershipAnalysis(schoolId: string, data: any): Promise<any>;
  updatePartnershipAnalysis(schoolId: string, id: string, data: any): Promise<any>;
  deletePartnershipAnalysis(schoolId: string, id: string): Promise<void>;

  getPartnershipMetric(schoolId: string, id: string): Promise<any | null>;
  listPartnershipMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPartnershipMetric(schoolId: string, data: any): Promise<any>;
  updatePartnershipMetric(schoolId: string, id: string, data: any): Promise<any>;
  deletePartnershipMetric(schoolId: string, id: string): Promise<void>;

  getInvestmentAnalysis(schoolId: string, id: string): Promise<any | null>;
  listInvestmentAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInvestmentAnalysis(schoolId: string, data: any): Promise<any>;
  updateInvestmentAnalysis(schoolId: string, id: string, data: any): Promise<any>;
  deleteInvestmentAnalysis(schoolId: string, id: string): Promise<void>;

  getInvestmentReturn(schoolId: string, id: string): Promise<any | null>;
  listInvestmentReturn(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInvestmentReturn(schoolId: string, data: any): Promise<any>;
  updateInvestmentReturn(schoolId: string, id: string, data: any): Promise<any>;
  deleteInvestmentReturn(schoolId: string, id: string): Promise<void>;

  getInvestmentRisk(schoolId: string, id: string): Promise<any | null>;
  listInvestmentRisk(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInvestmentRisk(schoolId: string, data: any): Promise<any>;
  updateInvestmentRisk(schoolId: string, id: string, data: any): Promise<any>;
  deleteInvestmentRisk(schoolId: string, id: string): Promise<void>;

}

class NotifyModuleRepositoryImpl implements NotifyModuleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new Error('GlobalCloud entity not found');
  }

  // =============================================================================
  // GOVERNMENT-INTELLIGENCE
  // =============================================================================
  async getBase(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('bases')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBase(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('bases').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBaseError(error.message);
    return data ?? [];
  }

  async createBase(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('bases')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBaseError(error.message);
    return result;
  }

  async updateBase(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('bases')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBaseError(error.message);
    return result;
  }

  async deleteBase(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('bases')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBaseError(error.message);
  }

  async getGeoLocation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('geo_locatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGeoLocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('geo_locatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGeoLocationError(error.message);
    return data ?? [];
  }

  async createGeoLocation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('geo_locatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGeoLocationError(error.message);
    return result;
  }

  async updateGeoLocation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('geo_locatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGeoLocationError(error.message);
    return result;
  }

  async deleteGeoLocation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('geo_locatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGeoLocationError(error.message);
  }

  async getTimeRange(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('time_ranges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTimeRange(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('time_ranges').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTimeRangeError(error.message);
    return data ?? [];
  }

  async createTimeRange(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('time_ranges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTimeRangeError(error.message);
    return result;
  }

  async updateTimeRange(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('time_ranges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTimeRangeError(error.message);
    return result;
  }

  async deleteTimeRange(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('time_ranges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTimeRangeError(error.message);
  }

  async getMetricValue(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('metric_values')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMetricValue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('metric_values').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMetricValueError(error.message);
    return data ?? [];
  }

  async createMetricValue(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('metric_values')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMetricValueError(error.message);
    return result;
  }

  async updateMetricValue(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('metric_values')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMetricValueError(error.message);
    return result;
  }

  async deleteMetricValue(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('metric_values')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMetricValueError(error.message);
  }

  async getNationalDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('national_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNationalDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('national_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNationalDashboardError(error.message);
    return data ?? [];
  }

  async createNationalDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('national_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNationalDashboardError(error.message);
    return result;
  }

  async updateNationalDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('national_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNationalDashboardError(error.message);
    return result;
  }

  async deleteNationalDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('national_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNationalDashboardError(error.message);
  }

  async getMinistryDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ministry_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMinistryDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ministry_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMinistryDashboardError(error.message);
    return data ?? [];
  }

  async createMinistryDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ministry_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMinistryDashboardError(error.message);
    return result;
  }

  async updateMinistryDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ministry_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMinistryDashboardError(error.message);
    return result;
  }

  async deleteMinistryDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ministry_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMinistryDashboardError(error.message);
  }

  async getRegionalDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('regional_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRegionalDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('regional_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRegionalDashboardError(error.message);
    return data ?? [];
  }

  async createRegionalDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('regional_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRegionalDashboardError(error.message);
    return result;
  }

  async updateRegionalDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('regional_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRegionalDashboardError(error.message);
    return result;
  }

  async deleteRegionalDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('regional_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRegionalDashboardError(error.message);
  }

  async getPolicyDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('policy_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPolicyDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('policy_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPolicyDashboardError(error.message);
    return data ?? [];
  }

  async createPolicyDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('policy_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPolicyDashboardError(error.message);
    return result;
  }

  async updatePolicyDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('policy_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPolicyDashboardError(error.message);
    return result;
  }

  async deletePolicyDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('policy_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPolicyDashboardError(error.message);
  }

  async getExecutiveDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('executive_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listExecutiveDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('executive_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudExecutiveDashboardError(error.message);
    return data ?? [];
  }

  async createExecutiveDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('executive_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudExecutiveDashboardError(error.message);
    return result;
  }

  async updateExecutiveDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('executive_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudExecutiveDashboardError(error.message);
    return result;
  }

  async deleteExecutiveDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('executive_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudExecutiveDashboardError(error.message);
  }

  async getNationalKPI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('national_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNationalKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('national_kpis').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNationalKPIError(error.message);
    return data ?? [];
  }

  async createNationalKPI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('national_kpis')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNationalKPIError(error.message);
    return result;
  }

  async updateNationalKPI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('national_kpis')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNationalKPIError(error.message);
    return result;
  }

  async deleteNationalKPI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('national_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNationalKPIError(error.message);
  }

  async getRegionalKPI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('regional_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRegionalKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('regional_kpis').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRegionalKPIError(error.message);
    return data ?? [];
  }

  async createRegionalKPI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('regional_kpis')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRegionalKPIError(error.message);
    return result;
  }

  async updateRegionalKPI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('regional_kpis')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRegionalKPIError(error.message);
    return result;
  }

  async deleteRegionalKPI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('regional_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRegionalKPIError(error.message);
  }

  async getDistrictKPI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('district_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDistrictKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('district_kpis').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDistrictKPIError(error.message);
    return data ?? [];
  }

  async createDistrictKPI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('district_kpis')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDistrictKPIError(error.message);
    return result;
  }

  async updateDistrictKPI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('district_kpis')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDistrictKPIError(error.message);
    return result;
  }

  async deleteDistrictKPI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('district_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDistrictKPIError(error.message);
  }

  async getSchoolKPI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('school_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchoolKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('school_kpis').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchoolKPIError(error.message);
    return data ?? [];
  }

  async createSchoolKPI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('school_kpis')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchoolKPIError(error.message);
    return result;
  }

  async updateSchoolKPI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('school_kpis')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchoolKPIError(error.message);
    return result;
  }

  async deleteSchoolKPI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchoolKPIError(error.message);
  }

  async getBudgetIntelligence(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('budget_intelligences')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBudgetIntelligence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('budget_intelligences').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBudgetIntelligenceError(error.message);
    return data ?? [];
  }

  async createBudgetIntelligence(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('budget_intelligences')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBudgetIntelligenceError(error.message);
    return result;
  }

  async updateBudgetIntelligence(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('budget_intelligences')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBudgetIntelligenceError(error.message);
    return result;
  }

  async deleteBudgetIntelligence(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('budget_intelligences')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBudgetIntelligenceError(error.message);
  }

  async getBudgetAllocation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('budget_allocatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBudgetAllocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('budget_allocatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBudgetAllocationError(error.message);
    return data ?? [];
  }

  async createBudgetAllocation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('budget_allocatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBudgetAllocationError(error.message);
    return result;
  }

  async updateBudgetAllocation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('budget_allocatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBudgetAllocationError(error.message);
    return result;
  }

  async deleteBudgetAllocation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('budget_allocatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBudgetAllocationError(error.message);
  }

  async getBudgetForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('budget_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBudgetForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('budget_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBudgetForecastError(error.message);
    return data ?? [];
  }

  async createBudgetForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('budget_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBudgetForecastError(error.message);
    return result;
  }

  async updateBudgetForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('budget_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBudgetForecastError(error.message);
    return result;
  }

  async deleteBudgetForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('budget_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBudgetForecastError(error.message);
  }

  async getBudgetOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('budget_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBudgetOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('budget_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBudgetOptimizationError(error.message);
    return data ?? [];
  }

  async createBudgetOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('budget_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBudgetOptimizationError(error.message);
    return result;
  }

  async updateBudgetOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('budget_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBudgetOptimizationError(error.message);
    return result;
  }

  async deleteBudgetOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('budget_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBudgetOptimizationError(error.message);
  }

  async getTeacherIntelligence(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_intelligences')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherIntelligence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_intelligences').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherIntelligenceError(error.message);
    return data ?? [];
  }

  async createTeacherIntelligence(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_intelligences')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherIntelligenceError(error.message);
    return result;
  }

  async updateTeacherIntelligence(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_intelligences')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherIntelligenceError(error.message);
    return result;
  }

  async deleteTeacherIntelligence(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_intelligences')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherIntelligenceError(error.message);
  }

  async getTeacherDistribution(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_distributioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherDistribution(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_distributioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherDistributionError(error.message);
    return data ?? [];
  }

  async createTeacherDistribution(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_distributioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherDistributionError(error.message);
    return result;
  }

  async updateTeacherDistribution(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_distributioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherDistributionError(error.message);
    return result;
  }

  async deleteTeacherDistribution(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_distributioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherDistributionError(error.message);
  }

  async getTeacherForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherForecastError(error.message);
    return data ?? [];
  }

  async createTeacherForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherForecastError(error.message);
    return result;
  }

  async updateTeacherForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherForecastError(error.message);
    return result;
  }

  async deleteTeacherForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherForecastError(error.message);
  }

  async getTeacherOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherOptimizationError(error.message);
    return data ?? [];
  }

  async createTeacherOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherOptimizationError(error.message);
    return result;
  }

  async updateTeacherOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherOptimizationError(error.message);
    return result;
  }

  async deleteTeacherOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherOptimizationError(error.message);
  }

  async getInfrastructureIntelligence(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('infrastructure_intelligences')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInfrastructureIntelligence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('infrastructure_intelligences').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInfrastructureIntelligenceError(error.message);
    return data ?? [];
  }

  async createInfrastructureIntelligence(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('infrastructure_intelligences')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureIntelligenceError(error.message);
    return result;
  }

  async updateInfrastructureIntelligence(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('infrastructure_intelligences')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureIntelligenceError(error.message);
    return result;
  }

  async deleteInfrastructureIntelligence(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('infrastructure_intelligences')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInfrastructureIntelligenceError(error.message);
  }

  async getInfrastructureMap(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('infrastructure_maps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInfrastructureMap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('infrastructure_maps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInfrastructureMapError(error.message);
    return data ?? [];
  }

  async createInfrastructureMap(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('infrastructure_maps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureMapError(error.message);
    return result;
  }

  async updateInfrastructureMap(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('infrastructure_maps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureMapError(error.message);
    return result;
  }

  async deleteInfrastructureMap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('infrastructure_maps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInfrastructureMapError(error.message);
  }

  async getInfrastructureForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('infrastructure_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInfrastructureForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('infrastructure_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInfrastructureForecastError(error.message);
    return data ?? [];
  }

  async createInfrastructureForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('infrastructure_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureForecastError(error.message);
    return result;
  }

  async updateInfrastructureForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('infrastructure_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureForecastError(error.message);
    return result;
  }

  async deleteInfrastructureForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('infrastructure_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInfrastructureForecastError(error.message);
  }

  async getStudentIntelligence(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('student_intelligences')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStudentIntelligence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('student_intelligences').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStudentIntelligenceError(error.message);
    return data ?? [];
  }

  async createStudentIntelligence(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_intelligences')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStudentIntelligenceError(error.message);
    return result;
  }

  async updateStudentIntelligence(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('student_intelligences')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStudentIntelligenceError(error.message);
    return result;
  }

  async deleteStudentIntelligence(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_intelligences')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStudentIntelligenceError(error.message);
  }

  async getStudentDistribution(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('student_distributioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStudentDistribution(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('student_distributioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStudentDistributionError(error.message);
    return data ?? [];
  }

  async createStudentDistribution(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_distributioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStudentDistributionError(error.message);
    return result;
  }

  async updateStudentDistribution(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('student_distributioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStudentDistributionError(error.message);
    return result;
  }

  async deleteStudentDistribution(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_distributioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStudentDistributionError(error.message);
  }

  async getStudentForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('student_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStudentForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('student_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStudentForecastError(error.message);
    return data ?? [];
  }

  async createStudentForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStudentForecastError(error.message);
    return result;
  }

  async updateStudentForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('student_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStudentForecastError(error.message);
    return result;
  }

  async deleteStudentForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStudentForecastError(error.message);
  }

  async getStudentOutcome(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('student_outcomes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStudentOutcome(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('student_outcomes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStudentOutcomeError(error.message);
    return data ?? [];
  }

  async createStudentOutcome(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_outcomes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStudentOutcomeError(error.message);
    return result;
  }

  async updateStudentOutcome(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('student_outcomes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStudentOutcomeError(error.message);
    return result;
  }

  async deleteStudentOutcome(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_outcomes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStudentOutcomeError(error.message);
  }

  async getEmploymentIntelligence(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('employment_intelligences')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmploymentIntelligence(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('employment_intelligences').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmploymentIntelligenceError(error.message);
    return data ?? [];
  }

  async createEmploymentIntelligence(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employment_intelligences')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmploymentIntelligenceError(error.message);
    return result;
  }

  async updateEmploymentIntelligence(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('employment_intelligences')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmploymentIntelligenceError(error.message);
    return result;
  }

  async deleteEmploymentIntelligence(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employment_intelligences')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmploymentIntelligenceError(error.message);
  }

  async getEmploymentMap(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('employment_maps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmploymentMap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('employment_maps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmploymentMapError(error.message);
    return data ?? [];
  }

  async createEmploymentMap(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employment_maps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmploymentMapError(error.message);
    return result;
  }

  async updateEmploymentMap(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('employment_maps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmploymentMapError(error.message);
    return result;
  }

  async deleteEmploymentMap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employment_maps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmploymentMapError(error.message);
  }

  async getEmploymentForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('employment_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmploymentForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('employment_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmploymentForecastError(error.message);
    return data ?? [];
  }

  async createEmploymentForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employment_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmploymentForecastError(error.message);
    return result;
  }

  async updateEmploymentForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('employment_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmploymentForecastError(error.message);
    return result;
  }

  async deleteEmploymentForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employment_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmploymentForecastError(error.message);
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

  async getAIRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('airecommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAIRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('airecommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAIRecommendationError(error.message);
    return data ?? [];
  }

  async createAIRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('airecommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAIRecommendationError(error.message);
    return result;
  }

  async updateAIRecommendation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('airecommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAIRecommendationError(error.message);
    return result;
  }

  async deleteAIRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('airecommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAIRecommendationError(error.message);
  }

  async getAIInsight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('aiinsights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAIInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('aiinsights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAIInsightError(error.message);
    return data ?? [];
  }

  async createAIInsight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('aiinsights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAIInsightError(error.message);
    return result;
  }

  async updateAIInsight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('aiinsights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAIInsightError(error.message);
    return result;
  }

  async deleteAIInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('aiinsights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAIInsightError(error.message);
  }

  async getAIPrediction(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('aipredictioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAIPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('aipredictioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAIPredictionError(error.message);
    return data ?? [];
  }

  async createAIPrediction(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('aipredictioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAIPredictionError(error.message);
    return result;
  }

  async updateAIPrediction(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('aipredictioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAIPredictionError(error.message);
    return result;
  }

  async deleteAIPrediction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('aipredictioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAIPredictionError(error.message);
  }

  async getAIForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('aiforecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAIForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('aiforecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAIForecastError(error.message);
    return data ?? [];
  }

  async createAIForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('aiforecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAIForecastError(error.message);
    return result;
  }

  async updateAIForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('aiforecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAIForecastError(error.message);
    return result;
  }

  async deleteAIForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('aiforecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAIForecastError(error.message);
  }

  async getNationalForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('national_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNationalForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('national_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNationalForecastError(error.message);
    return data ?? [];
  }

  async createNationalForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('national_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNationalForecastError(error.message);
    return result;
  }

  async updateNationalForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('national_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNationalForecastError(error.message);
    return result;
  }

  async deleteNationalForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('national_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNationalForecastError(error.message);
  }

  async getRegionalForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('regional_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRegionalForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('regional_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRegionalForecastError(error.message);
    return data ?? [];
  }

  async createRegionalForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('regional_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRegionalForecastError(error.message);
    return result;
  }

  async updateRegionalForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('regional_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRegionalForecastError(error.message);
    return result;
  }

  async deleteRegionalForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('regional_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRegionalForecastError(error.message);
  }

  async getSectorForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sector_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSectorForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sector_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSectorForecastError(error.message);
    return data ?? [];
  }

  async createSectorForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sector_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSectorForecastError(error.message);
    return result;
  }

  async updateSectorForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sector_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSectorForecastError(error.message);
    return result;
  }

  async deleteSectorForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sector_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSectorForecastError(error.message);
  }

  async getExecutiveWarRoom(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('executive_war_rooms')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listExecutiveWarRoom(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('executive_war_rooms').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudExecutiveWarRoomError(error.message);
    return data ?? [];
  }

  async createExecutiveWarRoom(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('executive_war_rooms')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudExecutiveWarRoomError(error.message);
    return result;
  }

  async updateExecutiveWarRoom(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('executive_war_rooms')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudExecutiveWarRoomError(error.message);
    return result;
  }

  async deleteExecutiveWarRoom(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('executive_war_rooms')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudExecutiveWarRoomError(error.message);
  }

  async getCrisisCenter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('crisis_centers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCrisisCenter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('crisis_centers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCrisisCenterError(error.message);
    return data ?? [];
  }

  async createCrisisCenter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('crisis_centers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCrisisCenterError(error.message);
    return result;
  }

  async updateCrisisCenter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('crisis_centers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCrisisCenterError(error.message);
    return result;
  }

  async deleteCrisisCenter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('crisis_centers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCrisisCenterError(error.message);
  }

  async getLiveMonitor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('live_monitors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLiveMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('live_monitors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLiveMonitorError(error.message);
    return data ?? [];
  }

  async createLiveMonitor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('live_monitors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLiveMonitorError(error.message);
    return result;
  }

  async updateLiveMonitor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('live_monitors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLiveMonitorError(error.message);
    return result;
  }

  async deleteLiveMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('live_monitors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLiveMonitorError(error.message);
  }

  async getStrategicKPI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('strategic_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStrategicKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('strategic_kpis').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStrategicKPIError(error.message);
    return data ?? [];
  }

  async createStrategicKPI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('strategic_kpis')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStrategicKPIError(error.message);
    return result;
  }

  async updateStrategicKPI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('strategic_kpis')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStrategicKPIError(error.message);
    return result;
  }

  async deleteStrategicKPI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('strategic_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStrategicKPIError(error.message);
  }

  async getStrategicGoalEntity(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('strategic_goal_entitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStrategicGoalEntity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('strategic_goal_entitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStrategicGoalEntityError(error.message);
    return data ?? [];
  }

  async createStrategicGoalEntity(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('strategic_goal_entitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStrategicGoalEntityError(error.message);
    return result;
  }

  async updateStrategicGoalEntity(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('strategic_goal_entitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStrategicGoalEntityError(error.message);
    return result;
  }

  async deleteStrategicGoalEntity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('strategic_goal_entitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStrategicGoalEntityError(error.message);
  }

  async getStrategicPlan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('strategic_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStrategicPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('strategic_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStrategicPlanError(error.message);
    return data ?? [];
  }

  async createStrategicPlan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('strategic_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStrategicPlanError(error.message);
    return result;
  }

  async updateStrategicPlan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('strategic_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStrategicPlanError(error.message);
    return result;
  }

  async deleteStrategicPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('strategic_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStrategicPlanError(error.message);
  }

  async getStrategicReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('strategic_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStrategicReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('strategic_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStrategicReportError(error.message);
    return data ?? [];
  }

  async createStrategicReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('strategic_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStrategicReportError(error.message);
    return result;
  }

  async updateStrategicReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('strategic_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStrategicReportError(error.message);
    return result;
  }

  async deleteStrategicReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('strategic_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStrategicReportError(error.message);
  }

  async getNationalHeatmap(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('national_heatmaps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNationalHeatmap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('national_heatmaps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNationalHeatmapError(error.message);
    return data ?? [];
  }

  async createNationalHeatmap(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('national_heatmaps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNationalHeatmapError(error.message);
    return result;
  }

  async updateNationalHeatmap(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('national_heatmaps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNationalHeatmapError(error.message);
    return result;
  }

  async deleteNationalHeatmap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('national_heatmaps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNationalHeatmapError(error.message);
  }

  async getRegionalHeatmap(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('regional_heatmaps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRegionalHeatmap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('regional_heatmaps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRegionalHeatmapError(error.message);
    return data ?? [];
  }

  async createRegionalHeatmap(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('regional_heatmaps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRegionalHeatmapError(error.message);
    return result;
  }

  async updateRegionalHeatmap(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('regional_heatmaps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRegionalHeatmapError(error.message);
    return result;
  }

  async deleteRegionalHeatmap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('regional_heatmaps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRegionalHeatmapError(error.message);
  }

  async getComparativeHeatmap(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('comparative_heatmaps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComparativeHeatmap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('comparative_heatmaps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComparativeHeatmapError(error.message);
    return data ?? [];
  }

  async createComparativeHeatmap(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('comparative_heatmaps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComparativeHeatmapError(error.message);
    return result;
  }

  async updateComparativeHeatmap(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('comparative_heatmaps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComparativeHeatmapError(error.message);
    return result;
  }

  async deleteComparativeHeatmap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('comparative_heatmaps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComparativeHeatmapError(error.message);
  }

  async getScenarioBuilder(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scenario_builders')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listScenarioBuilder(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scenario_builders').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudScenarioBuilderError(error.message);
    return data ?? [];
  }

  async createScenarioBuilder(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scenario_builders')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudScenarioBuilderError(error.message);
    return result;
  }

  async updateScenarioBuilder(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scenario_builders')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudScenarioBuilderError(error.message);
    return result;
  }

  async deleteScenarioBuilder(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scenario_builders')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudScenarioBuilderError(error.message);
  }

  async getScenarioResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scenario_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listScenarioResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scenario_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudScenarioResultError(error.message);
    return data ?? [];
  }

  async createScenarioResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scenario_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudScenarioResultError(error.message);
    return result;
  }

  async updateScenarioResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scenario_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudScenarioResultError(error.message);
    return result;
  }

  async deleteScenarioResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scenario_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudScenarioResultError(error.message);
  }

  async getScenarioComparison(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scenario_comparisoa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listScenarioComparison(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scenario_comparisoa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudScenarioComparisonError(error.message);
    return data ?? [];
  }

  async createScenarioComparison(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scenario_comparisoa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudScenarioComparisonError(error.message);
    return result;
  }

  async updateScenarioComparison(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scenario_comparisoa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudScenarioComparisonError(error.message);
    return result;
  }

  async deleteScenarioComparison(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scenario_comparisoa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudScenarioComparisonError(error.message);
  }

  async getWhatIfAnalysis(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('what_if_analysises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWhatIfAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('what_if_analysises').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWhatIfAnalysisError(error.message);
    return data ?? [];
  }

  async createWhatIfAnalysis(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('what_if_analysises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWhatIfAnalysisError(error.message);
    return result;
  }

  async updateWhatIfAnalysis(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('what_if_analysises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWhatIfAnalysisError(error.message);
    return result;
  }

  async deleteWhatIfAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('what_if_analysises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWhatIfAnalysisError(error.message);
  }

  async getWhatIfResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('what_if_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWhatIfResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('what_if_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWhatIfResultError(error.message);
    return data ?? [];
  }

  async createWhatIfResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('what_if_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWhatIfResultError(error.message);
    return result;
  }

  async updateWhatIfResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('what_if_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWhatIfResultError(error.message);
    return result;
  }

  async deleteWhatIfResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('what_if_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWhatIfResultError(error.message);
  }

  async getWhatIfRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('what_if_recommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWhatIfRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('what_if_recommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWhatIfRecommendationError(error.message);
    return data ?? [];
  }

  async createWhatIfRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('what_if_recommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWhatIfRecommendationError(error.message);
    return result;
  }

  async updateWhatIfRecommendation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('what_if_recommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWhatIfRecommendationError(error.message);
    return result;
  }

  async deleteWhatIfRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('what_if_recommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWhatIfRecommendationError(error.message);
  }

  async getDecisionRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('decision_recommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDecisionRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('decision_recommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDecisionRecommendationError(error.message);
    return data ?? [];
  }

  async createDecisionRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('decision_recommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDecisionRecommendationError(error.message);
    return result;
  }

  async updateDecisionRecommendation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('decision_recommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDecisionRecommendationError(error.message);
    return result;
  }

  async deleteDecisionRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('decision_recommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDecisionRecommendationError(error.message);
  }

  async getDecisionImpact(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('decision_impacts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDecisionImpact(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('decision_impacts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDecisionImpactError(error.message);
    return data ?? [];
  }

  async createDecisionImpact(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('decision_impacts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDecisionImpactError(error.message);
    return result;
  }

  async updateDecisionImpact(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('decision_impacts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDecisionImpactError(error.message);
    return result;
  }

  async deleteDecisionImpact(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('decision_impacts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDecisionImpactError(error.message);
  }

  async getDecisionHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('decision_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDecisionHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('decision_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDecisionHistoryError(error.message);
    return data ?? [];
  }

  async createDecisionHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('decision_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDecisionHistoryError(error.message);
    return result;
  }

  async updateDecisionHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('decision_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDecisionHistoryError(error.message);
    return result;
  }

  async deleteDecisionHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('decision_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDecisionHistoryError(error.message);
  }

  async getExecutiveReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('executive_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listExecutiveReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('executive_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudExecutiveReportError(error.message);
    return data ?? [];
  }

  async createExecutiveReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('executive_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudExecutiveReportError(error.message);
    return result;
  }

  async updateExecutiveReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('executive_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudExecutiveReportError(error.message);
    return result;
  }

  async deleteExecutiveReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('executive_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudExecutiveReportError(error.message);
  }

  async getExecutiveSummary(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('executive_summarys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listExecutiveSummary(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('executive_summarys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudExecutiveSummaryError(error.message);
    return data ?? [];
  }

  async createExecutiveSummary(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('executive_summarys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudExecutiveSummaryError(error.message);
    return result;
  }

  async updateExecutiveSummary(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('executive_summarys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudExecutiveSummaryError(error.message);
    return result;
  }

  async deleteExecutiveSummary(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('executive_summarys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudExecutiveSummaryError(error.message);
  }

  async getExecutiveBrief(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('executive_briefs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listExecutiveBrief(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('executive_briefs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudExecutiveBriefError(error.message);
    return data ?? [];
  }

  async createExecutiveBrief(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('executive_briefs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudExecutiveBriefError(error.message);
    return result;
  }

  async updateExecutiveBrief(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('executive_briefs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudExecutiveBriefError(error.message);
    return result;
  }

  async deleteExecutiveBrief(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('executive_briefs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudExecutiveBriefError(error.message);
  }

  async getAIDecisionSupport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('aidecision_supports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAIDecisionSupport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('aidecision_supports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAIDecisionSupportError(error.message);
    return data ?? [];
  }

  async createAIDecisionSupport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('aidecision_supports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAIDecisionSupportError(error.message);
    return result;
  }

  async updateAIDecisionSupport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('aidecision_supports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAIDecisionSupportError(error.message);
    return result;
  }

  async deleteAIDecisionSupport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('aidecision_supports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAIDecisionSupportError(error.message);
  }

  async getPolicyAnalysis(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('policy_analysises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPolicyAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('policy_analysises').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPolicyAnalysisError(error.message);
    return data ?? [];
  }

  async createPolicyAnalysis(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('policy_analysises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPolicyAnalysisError(error.message);
    return result;
  }

  async updatePolicyAnalysis(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('policy_analysises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPolicyAnalysisError(error.message);
    return result;
  }

  async deletePolicyAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('policy_analysises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPolicyAnalysisError(error.message);
  }

  async getPolicyImpactEntity(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('policy_impact_entitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPolicyImpactEntity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('policy_impact_entitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPolicyImpactEntityError(error.message);
    return data ?? [];
  }

  async createPolicyImpactEntity(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('policy_impact_entitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPolicyImpactEntityError(error.message);
    return result;
  }

  async updatePolicyImpactEntity(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('policy_impact_entitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPolicyImpactEntityError(error.message);
    return result;
  }

  async deletePolicyImpactEntity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('policy_impact_entitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPolicyImpactEntityError(error.message);
  }

  async getPolicyRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('policy_recommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPolicyRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('policy_recommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPolicyRecommendationError(error.message);
    return data ?? [];
  }

  async createPolicyRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('policy_recommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPolicyRecommendationError(error.message);
    return result;
  }

  async updatePolicyRecommendation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('policy_recommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPolicyRecommendationError(error.message);
    return result;
  }

  async deletePolicyRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('policy_recommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPolicyRecommendationError(error.message);
  }

  async getNationalPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('national_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNationalPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('national_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNationalPolicyError(error.message);
    return data ?? [];
  }

  async createNationalPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('national_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNationalPolicyError(error.message);
    return result;
  }

  async updateNationalPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('national_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNationalPolicyError(error.message);
    return result;
  }

  async deleteNationalPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('national_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNationalPolicyError(error.message);
  }

  async getRegionalPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('regional_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRegionalPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('regional_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRegionalPolicyError(error.message);
    return data ?? [];
  }

  async createRegionalPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('regional_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRegionalPolicyError(error.message);
    return result;
  }

  async updateRegionalPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('regional_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRegionalPolicyError(error.message);
    return result;
  }

  async deleteRegionalPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('regional_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRegionalPolicyError(error.message);
  }

  async getDistrictPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('district_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDistrictPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('district_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDistrictPolicyError(error.message);
    return data ?? [];
  }

  async createDistrictPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('district_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDistrictPolicyError(error.message);
    return result;
  }

  async updateDistrictPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('district_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDistrictPolicyError(error.message);
    return result;
  }

  async deleteDistrictPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('district_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDistrictPolicyError(error.message);
  }

  async getGovernmentAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('government_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernmentAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('government_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernmentAlertError(error.message);
    return data ?? [];
  }

  async createGovernmentAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('government_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernmentAlertError(error.message);
    return result;
  }

  async updateGovernmentAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('government_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernmentAlertError(error.message);
    return result;
  }

  async deleteGovernmentAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('government_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernmentAlertError(error.message);
  }

  async getGovernmentNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('government_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernmentNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('government_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernmentNotificationError(error.message);
    return data ?? [];
  }

  async createGovernmentNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('government_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernmentNotificationError(error.message);
    return result;
  }

  async updateGovernmentNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('government_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernmentNotificationError(error.message);
    return result;
  }

  async deleteGovernmentNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('government_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernmentNotificationError(error.message);
  }

  async getGovernmentBroadcast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('government_broadcasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernmentBroadcast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('government_broadcasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernmentBroadcastError(error.message);
    return data ?? [];
  }

  async createGovernmentBroadcast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('government_broadcasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernmentBroadcastError(error.message);
    return result;
  }

  async updateGovernmentBroadcast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('government_broadcasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernmentBroadcastError(error.message);
    return result;
  }

  async deleteGovernmentBroadcast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('government_broadcasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernmentBroadcastError(error.message);
  }

  async getAuditTrail(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('audit_trails')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAuditTrail(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('audit_trails').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAuditTrailError(error.message);
    return data ?? [];
  }

  async createAuditTrail(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('audit_trails')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAuditTrailError(error.message);
    return result;
  }

  async updateAuditTrail(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('audit_trails')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAuditTrailError(error.message);
    return result;
  }

  async deleteAuditTrail(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('audit_trails')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAuditTrailError(error.message);
  }

  async getAuditReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('audit_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAuditReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('audit_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAuditReportError(error.message);
    return data ?? [];
  }

  async createAuditReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('audit_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAuditReportError(error.message);
    return result;
  }

  async updateAuditReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('audit_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAuditReportError(error.message);
    return result;
  }

  async deleteAuditReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('audit_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAuditReportError(error.message);
  }

  async getComplianceReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('compliance_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComplianceReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('compliance_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComplianceReportError(error.message);
    return data ?? [];
  }

  async createComplianceReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('compliance_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComplianceReportError(error.message);
    return result;
  }

  async updateComplianceReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('compliance_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComplianceReportError(error.message);
    return result;
  }

  async deleteComplianceReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('compliance_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComplianceReportError(error.message);
  }

  async getComplianceAudit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('compliance_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComplianceAudit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('compliance_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComplianceAuditError(error.message);
    return data ?? [];
  }

  async createComplianceAudit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('compliance_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComplianceAuditError(error.message);
    return result;
  }

  async updateComplianceAudit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('compliance_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComplianceAuditError(error.message);
    return result;
  }

  async deleteComplianceAudit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('compliance_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComplianceAuditError(error.message);
  }

  async getRiskAssessment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('risk_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRiskAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('risk_assessments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRiskAssessmentError(error.message);
    return data ?? [];
  }

  async createRiskAssessment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('risk_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRiskAssessmentError(error.message);
    return result;
  }

  async updateRiskAssessment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('risk_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRiskAssessmentError(error.message);
    return result;
  }

  async deleteRiskAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('risk_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRiskAssessmentError(error.message);
  }

  async getRiskMitigation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('risk_mitigatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRiskMitigation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('risk_mitigatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRiskMitigationError(error.message);
    return data ?? [];
  }

  async createRiskMitigation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('risk_mitigatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRiskMitigationError(error.message);
    return result;
  }

  async updateRiskMitigation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('risk_mitigatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRiskMitigationError(error.message);
    return result;
  }

  async deleteRiskMitigation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('risk_mitigatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRiskMitigationError(error.message);
  }

  async getRiskMonitor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('risk_monitors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRiskMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('risk_monitors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRiskMonitorError(error.message);
    return data ?? [];
  }

  async createRiskMonitor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('risk_monitors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRiskMonitorError(error.message);
    return result;
  }

  async updateRiskMonitor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('risk_monitors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRiskMonitorError(error.message);
    return result;
  }

  async deleteRiskMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('risk_monitors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRiskMonitorError(error.message);
  }

  async getStakeholderMap(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('stakeholder_maps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStakeholderMap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('stakeholder_maps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStakeholderMapError(error.message);
    return data ?? [];
  }

  async createStakeholderMap(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('stakeholder_maps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStakeholderMapError(error.message);
    return result;
  }

  async updateStakeholderMap(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('stakeholder_maps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStakeholderMapError(error.message);
    return result;
  }

  async deleteStakeholderMap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('stakeholder_maps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStakeholderMapError(error.message);
  }

  async getStakeholderAnalysis(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('stakeholder_analysises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStakeholderAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('stakeholder_analysises').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStakeholderAnalysisError(error.message);
    return data ?? [];
  }

  async createStakeholderAnalysis(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('stakeholder_analysises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStakeholderAnalysisError(error.message);
    return result;
  }

  async updateStakeholderAnalysis(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('stakeholder_analysises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStakeholderAnalysisError(error.message);
    return result;
  }

  async deleteStakeholderAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('stakeholder_analysises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStakeholderAnalysisError(error.message);
  }

  async getStakeholderEngagement(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('stakeholder_engagements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStakeholderEngagement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('stakeholder_engagements').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStakeholderEngagementError(error.message);
    return data ?? [];
  }

  async createStakeholderEngagement(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('stakeholder_engagements')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStakeholderEngagementError(error.message);
    return result;
  }

  async updateStakeholderEngagement(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('stakeholder_engagements')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStakeholderEngagementError(error.message);
    return result;
  }

  async deleteStakeholderEngagement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('stakeholder_engagements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStakeholderEngagementError(error.message);
  }

  async getPerformanceBenchmark(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('performance_benchmarks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPerformanceBenchmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('performance_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPerformanceBenchmarkError(error.message);
    return data ?? [];
  }

  async createPerformanceBenchmark(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('performance_benchmarks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPerformanceBenchmarkError(error.message);
    return result;
  }

  async updatePerformanceBenchmark(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('performance_benchmarks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPerformanceBenchmarkError(error.message);
    return result;
  }

  async deletePerformanceBenchmark(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('performance_benchmarks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPerformanceBenchmarkError(error.message);
  }

  async getPerformanceComparison(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('performance_comparisoa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPerformanceComparison(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('performance_comparisoa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPerformanceComparisonError(error.message);
    return data ?? [];
  }

  async createPerformanceComparison(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('performance_comparisoa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPerformanceComparisonError(error.message);
    return result;
  }

  async updatePerformanceComparison(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('performance_comparisoa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPerformanceComparisonError(error.message);
    return result;
  }

  async deletePerformanceComparison(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('performance_comparisoa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPerformanceComparisonError(error.message);
  }

  async getPerformanceTrend(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('performance_trends')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPerformanceTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('performance_trends').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPerformanceTrendError(error.message);
    return data ?? [];
  }

  async createPerformanceTrend(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('performance_trends')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPerformanceTrendError(error.message);
    return result;
  }

  async updatePerformanceTrend(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('performance_trends')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPerformanceTrendError(error.message);
    return result;
  }

  async deletePerformanceTrend(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('performance_trends')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPerformanceTrendError(error.message);
  }

  async getPredictiveAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('predictive_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPredictiveAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('predictive_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPredictiveAnalyticsError(error.message);
    return data ?? [];
  }

  async createPredictiveAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('predictive_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPredictiveAnalyticsError(error.message);
    return result;
  }

  async updatePredictiveAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('predictive_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPredictiveAnalyticsError(error.message);
    return result;
  }

  async deletePredictiveAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('predictive_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPredictiveAnalyticsError(error.message);
  }

  async getPredictiveModel(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('predictive_models')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPredictiveModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('predictive_models').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPredictiveModelError(error.message);
    return data ?? [];
  }

  async createPredictiveModel(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('predictive_models')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPredictiveModelError(error.message);
    return result;
  }

  async updatePredictiveModel(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('predictive_models')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPredictiveModelError(error.message);
    return result;
  }

  async deletePredictiveModel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('predictive_models')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPredictiveModelError(error.message);
  }

  async getPredictiveResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('predictive_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPredictiveResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('predictive_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPredictiveResultError(error.message);
    return data ?? [];
  }

  async createPredictiveResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('predictive_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPredictiveResultError(error.message);
    return result;
  }

  async updatePredictiveResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('predictive_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPredictiveResultError(error.message);
    return result;
  }

  async deletePredictiveResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('predictive_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPredictiveResultError(error.message);
  }

  async getPrescriptiveAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('prescriptive_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPrescriptiveAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('prescriptive_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPrescriptiveAnalyticsError(error.message);
    return data ?? [];
  }

  async createPrescriptiveAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('prescriptive_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPrescriptiveAnalyticsError(error.message);
    return result;
  }

  async updatePrescriptiveAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('prescriptive_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPrescriptiveAnalyticsError(error.message);
    return result;
  }

  async deletePrescriptiveAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('prescriptive_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPrescriptiveAnalyticsError(error.message);
  }

  async getPrescriptiveRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('prescriptive_recommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPrescriptiveRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('prescriptive_recommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPrescriptiveRecommendationError(error.message);
    return data ?? [];
  }

  async createPrescriptiveRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('prescriptive_recommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPrescriptiveRecommendationError(error.message);
    return result;
  }

  async updatePrescriptiveRecommendation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('prescriptive_recommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPrescriptiveRecommendationError(error.message);
    return result;
  }

  async deletePrescriptiveRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('prescriptive_recommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPrescriptiveRecommendationError(error.message);
  }

  async getCognitiveAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cognitive_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCognitiveAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cognitive_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCognitiveAnalyticsError(error.message);
    return data ?? [];
  }

  async createCognitiveAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cognitive_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCognitiveAnalyticsError(error.message);
    return result;
  }

  async updateCognitiveAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cognitive_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCognitiveAnalyticsError(error.message);
    return result;
  }

  async deleteCognitiveAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cognitive_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCognitiveAnalyticsError(error.message);
  }

  async getCognitiveInsight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cognitive_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCognitiveInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cognitive_insights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCognitiveInsightError(error.message);
    return data ?? [];
  }

  async createCognitiveInsight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cognitive_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCognitiveInsightError(error.message);
    return result;
  }

  async updateCognitiveInsight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cognitive_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCognitiveInsightError(error.message);
    return result;
  }

  async deleteCognitiveInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cognitive_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCognitiveInsightError(error.message);
  }

  async getCognitivePattern(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cognitive_patterns')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCognitivePattern(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cognitive_patterns').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCognitivePatternError(error.message);
    return data ?? [];
  }

  async createCognitivePattern(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cognitive_patterns')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCognitivePatternError(error.message);
    return result;
  }

  async updateCognitivePattern(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cognitive_patterns')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCognitivePatternError(error.message);
    return result;
  }

  async deleteCognitivePattern(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cognitive_patterns')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCognitivePatternError(error.message);
  }

  async getRealTimeMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('real_time_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRealTimeMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('real_time_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRealTimeMetricError(error.message);
    return data ?? [];
  }

  async createRealTimeMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('real_time_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRealTimeMetricError(error.message);
    return result;
  }

  async updateRealTimeMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('real_time_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRealTimeMetricError(error.message);
    return result;
  }

  async deleteRealTimeMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('real_time_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRealTimeMetricError(error.message);
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

  async getMetricTrend(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('metric_trends')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMetricTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('metric_trends').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMetricTrendError(error.message);
    return data ?? [];
  }

  async createMetricTrend(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('metric_trends')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMetricTrendError(error.message);
    return result;
  }

  async updateMetricTrend(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('metric_trends')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMetricTrendError(error.message);
    return result;
  }

  async deleteMetricTrend(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('metric_trends')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMetricTrendError(error.message);
  }

  async getMetricForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('metric_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMetricForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('metric_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMetricForecastError(error.message);
    return data ?? [];
  }

  async createMetricForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('metric_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMetricForecastError(error.message);
    return result;
  }

  async updateMetricForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('metric_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMetricForecastError(error.message);
    return result;
  }

  async deleteMetricForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('metric_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMetricForecastError(error.message);
  }

  async getExecutiveWidget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('executive_widgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listExecutiveWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('executive_widgets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudExecutiveWidgetError(error.message);
    return data ?? [];
  }

  async createExecutiveWidget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('executive_widgets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudExecutiveWidgetError(error.message);
    return result;
  }

  async updateExecutiveWidget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('executive_widgets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudExecutiveWidgetError(error.message);
    return result;
  }

  async deleteExecutiveWidget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('executive_widgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudExecutiveWidgetError(error.message);
  }

  async getExecutiveFilter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('executive_filters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listExecutiveFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('executive_filters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudExecutiveFilterError(error.message);
    return data ?? [];
  }

  async createExecutiveFilter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('executive_filters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudExecutiveFilterError(error.message);
    return result;
  }

  async updateExecutiveFilter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('executive_filters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudExecutiveFilterError(error.message);
    return result;
  }

  async deleteExecutiveFilter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('executive_filters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudExecutiveFilterError(error.message);
  }

  async getGovernmentReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('government_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernmentReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('government_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernmentReportError(error.message);
    return data ?? [];
  }

  async createGovernmentReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('government_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernmentReportError(error.message);
    return result;
  }

  async updateGovernmentReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('government_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernmentReportError(error.message);
    return result;
  }

  async deleteGovernmentReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('government_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernmentReportError(error.message);
  }

  async getGovernmentAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('government_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernmentAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('government_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernmentAnalyticsError(error.message);
    return data ?? [];
  }

  async createGovernmentAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('government_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernmentAnalyticsError(error.message);
    return result;
  }

  async updateGovernmentAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('government_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernmentAnalyticsError(error.message);
    return result;
  }

  async deleteGovernmentAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('government_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernmentAnalyticsError(error.message);
  }

  async getGovernmentInsight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('government_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGovernmentInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('government_insights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGovernmentInsightError(error.message);
    return data ?? [];
  }

  async createGovernmentInsight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('government_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGovernmentInsightError(error.message);
    return result;
  }

  async updateGovernmentInsight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('government_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGovernmentInsightError(error.message);
    return result;
  }

  async deleteGovernmentInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('government_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGovernmentInsightError(error.message);
  }

  async getEducationStrategy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('education_strategys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEducationStrategy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('education_strategys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEducationStrategyError(error.message);
    return data ?? [];
  }

  async createEducationStrategy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('education_strategys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEducationStrategyError(error.message);
    return result;
  }

  async updateEducationStrategy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('education_strategys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEducationStrategyError(error.message);
    return result;
  }

  async deleteEducationStrategy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('education_strategys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEducationStrategyError(error.message);
  }

  async getEducationPlan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('education_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEducationPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('education_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEducationPlanError(error.message);
    return data ?? [];
  }

  async createEducationPlan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('education_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEducationPlanError(error.message);
    return result;
  }

  async updateEducationPlan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('education_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEducationPlanError(error.message);
    return result;
  }

  async deleteEducationPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('education_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEducationPlanError(error.message);
  }

  async getEducationProgram(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('education_programs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEducationProgram(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('education_programs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEducationProgramError(error.message);
    return data ?? [];
  }

  async createEducationProgram(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('education_programs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEducationProgramError(error.message);
    return result;
  }

  async updateEducationProgram(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('education_programs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEducationProgramError(error.message);
    return result;
  }

  async deleteEducationProgram(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('education_programs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEducationProgramError(error.message);
  }

  async getPartnershipMap(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('partnership_maps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPartnershipMap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('partnership_maps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPartnershipMapError(error.message);
    return data ?? [];
  }

  async createPartnershipMap(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('partnership_maps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPartnershipMapError(error.message);
    return result;
  }

  async updatePartnershipMap(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('partnership_maps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPartnershipMapError(error.message);
    return result;
  }

  async deletePartnershipMap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('partnership_maps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPartnershipMapError(error.message);
  }

  async getPartnershipAnalysis(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('partnership_analysises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPartnershipAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('partnership_analysises').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPartnershipAnalysisError(error.message);
    return data ?? [];
  }

  async createPartnershipAnalysis(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('partnership_analysises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPartnershipAnalysisError(error.message);
    return result;
  }

  async updatePartnershipAnalysis(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('partnership_analysises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPartnershipAnalysisError(error.message);
    return result;
  }

  async deletePartnershipAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('partnership_analysises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPartnershipAnalysisError(error.message);
  }

  async getPartnershipMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('partnership_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPartnershipMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('partnership_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPartnershipMetricError(error.message);
    return data ?? [];
  }

  async createPartnershipMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('partnership_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPartnershipMetricError(error.message);
    return result;
  }

  async updatePartnershipMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('partnership_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPartnershipMetricError(error.message);
    return result;
  }

  async deletePartnershipMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('partnership_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPartnershipMetricError(error.message);
  }

  async getInvestmentAnalysis(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('investment_analysises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInvestmentAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('investment_analysises').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInvestmentAnalysisError(error.message);
    return data ?? [];
  }

  async createInvestmentAnalysis(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('investment_analysises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInvestmentAnalysisError(error.message);
    return result;
  }

  async updateInvestmentAnalysis(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('investment_analysises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInvestmentAnalysisError(error.message);
    return result;
  }

  async deleteInvestmentAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('investment_analysises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInvestmentAnalysisError(error.message);
  }

  async getInvestmentReturn(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('investment_returns')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInvestmentReturn(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('investment_returns').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInvestmentReturnError(error.message);
    return data ?? [];
  }

  async createInvestmentReturn(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('investment_returns')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInvestmentReturnError(error.message);
    return result;
  }

  async updateInvestmentReturn(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('investment_returns')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInvestmentReturnError(error.message);
    return result;
  }

  async deleteInvestmentReturn(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('investment_returns')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInvestmentReturnError(error.message);
  }

  async getInvestmentRisk(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('investment_risks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInvestmentRisk(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('investment_risks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInvestmentRiskError(error.message);
    return data ?? [];
  }

  async createInvestmentRisk(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('investment_risks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInvestmentRiskError(error.message);
    return result;
  }

  async updateInvestmentRisk(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('investment_risks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInvestmentRiskError(error.message);
    return result;
  }

  async deleteInvestmentRisk(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('investment_risks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInvestmentRiskError(error.message);
  }

}

export function createNotifyModuleRepository(supabase: SupabaseClient): NotifyModuleRepository {
  return new NotifyModuleRepositoryImpl(supabase);
}

